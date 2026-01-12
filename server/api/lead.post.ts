import { google } from "googleapis";
import { z } from "zod";

const LeadSchema = z.object({
  fullName: z.string().min(3),
  phone: z.string().min(7),
  amount: z.number().min(300_000_000).max(1_000_000_000),
  productLabel: z.string().min(1), // localized
  locale: z.string().optional(),
  page: z.string().optional(),
  website: z.string().optional(), // honeypot
});

function getClientIp(event: any) {
  const xf = event.node.req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  return event.node.req.socket?.remoteAddress || "";
}

async function appendToSheet(opts: {
  spreadsheetId: string;
  tabName: string;
  serviceAccountEmail: string;
  privateKey: string;
  row: any[];
}) {
  const jwt = new google.auth.JWT({
    email: opts.serviceAccountEmail,
    key: opts.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth: jwt });

  await sheets.spreadsheets.values.append({
    spreadsheetId: opts.spreadsheetId,
    range: `${opts.tabName}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [opts.row] },
  });
}

async function sendTelegram(token: string, chatId: string, text: string) {
  await $fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    body: { chat_id: chatId, text, disable_web_page_preview: true },
  });
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parsed = LeadSchema.safeParse(body);

  if (!parsed.success) {
    setResponseStatus(event, 400);
    return { ok: false, message: "Invalid data", issues: parsed.error.issues };
  }

  const data = parsed.data;

  // Honeypot: bots fill hidden field
  if (data.website && data.website.trim().length > 0) {
    return { ok: true };
  }

  // Simple rate limit: 1 request / 30s per IP
  const ip = getClientIp(event);
  const storage = useStorage("cache");
  const rlKey = `lead_rl_${ip}`;
  const last = await storage.getItem<number>(rlKey);
  const now = Date.now();
  if (last && now - last < 30_000) {
    setResponseStatus(event, 429);
    return { ok: false, message: "Too many requests" };
  }
  await storage.setItem(rlKey, now);

  const config = useRuntimeConfig();

  const spreadsheetId = config.GOOGLE_SHEETS_SPREADSHEET_ID;
  const tabName = config.GOOGLE_SHEETS_TAB_NAME;
  const saEmail = config.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = config.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  const tgToken = config.TELEGRAM_BOT_TOKEN;
  const tgChatId = config.TELEGRAM_CHAT_ID;

  if (!spreadsheetId || !tabName || !saEmail || !privateKeyRaw) {
    setResponseStatus(event, 500);
    return { ok: false, message: "Server not configured (Google Sheets)" };
  }

  // Handle various formats of the private key from env
  let privateKey = String(privateKeyRaw);
  // Remove surrounding quotes if present
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
  if (privateKey.startsWith("'") && privateKey.endsWith("'")) {
    privateKey = privateKey.slice(1, -1);
  }
  // Convert literal \n to actual newlines
  privateKey = privateKey.replace(/\\n/g, "\n");
  const timestamp = new Date().toISOString();
  // Try to append to Google Sheets and notify Telegram; surface helpful errors
  try {
    await appendToSheet({
      spreadsheetId,
      tabName,
      serviceAccountEmail: saEmail,
      privateKey,
      row: [
        timestamp,
        data.fullName,
        data.phone,
        data.amount,
        data.productLabel,
        data.locale || "",
        data.page || "",
        ip,
      ],
    });
  } catch (e: any) {
    // log for server console
    console.error("appendToSheet failed:", e && e.message ? e.message : e);
    setResponseStatus(event, 500);
    return {
      ok: false,
      message: "Failed to save to Google Sheets",
      error: e?.message || String(e),
    };
  }

  if (tgToken && tgChatId) {
    const text =
      "🆕 New lead\n\n" +
      `👤 ${data.fullName}\n` +
      `📞 ${data.phone}\n` +
      `💰 ${data.amount}\n` +
      `📦 ${data.productLabel}\n` +
      `🌐 ${data.page || "-"}`;

    try {
      await sendTelegram(String(tgToken), String(tgChatId), text);
    } catch (e: any) {
      console.error("sendTelegram failed:", e && e.message ? e.message : e);
      // don't fail the whole request if telegram fails
    }
  }

  return { ok: true };
});
