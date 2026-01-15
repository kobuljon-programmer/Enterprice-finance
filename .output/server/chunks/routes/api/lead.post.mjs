import { d as defineEventHandler, r as readBody, s as setResponseStatus, u as useStorage, a as useRuntimeConfig } from '../../runtime.mjs';
import { google } from 'googleapis';
import { z } from 'zod';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

const LeadSchema = z.object({
  fullName: z.string().min(3),
  phone: z.string().min(7),
  amount: z.number().min(3e8).max(1e9),
  productLabel: z.string().min(1),
  // localized
  locale: z.string().optional(),
  page: z.string().optional(),
  website: z.string().optional()
  // honeypot
});
function getClientIp(event) {
  var _a;
  const xf = event.node.req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length)
    return xf.split(",")[0].trim();
  return ((_a = event.node.req.socket) == null ? void 0 : _a.remoteAddress) || "";
}
async function appendToSheet(opts) {
  const jwt = new google.auth.JWT({
    email: opts.serviceAccountEmail,
    key: opts.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
  const sheets = google.sheets({ version: "v4", auth: jwt });
  await sheets.spreadsheets.values.append({
    spreadsheetId: opts.spreadsheetId,
    range: `${opts.tabName}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [opts.row] }
  });
}
async function sendTelegram(token, chatId, text) {
  await $fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    body: { chat_id: chatId, text, disable_web_page_preview: true }
  });
}
const lead_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    setResponseStatus(event, 400);
    return { ok: false, message: "Invalid data", issues: parsed.error.issues };
  }
  const data = parsed.data;
  if (data.website && data.website.trim().length > 0) {
    return { ok: true };
  }
  const ip = getClientIp(event);
  const storage = useStorage("cache");
  const rlKey = `lead_rl_${ip}`;
  const last = await storage.getItem(rlKey);
  const now = Date.now();
  if (last && now - last < 3e4) {
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
  let privateKey = String(privateKeyRaw);
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
  if (privateKey.startsWith("'") && privateKey.endsWith("'")) {
    privateKey = privateKey.slice(1, -1);
  }
  privateKey = privateKey.replace(/\\n/g, "\n");
  const currentDate = /* @__PURE__ */ new Date();
  const timestamp = currentDate.toLocaleString("uz-UZ", {
    timeZone: "Asia/Tashkent",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const phoneText = "'" + data.phone;
  const formattedAmount = data.amount.toLocaleString("ru-RU").replace(/\s/g, " ");
  try {
    await appendToSheet({
      spreadsheetId,
      tabName,
      serviceAccountEmail: saEmail,
      privateKey,
      row: [
        timestamp,
        data.fullName,
        phoneText,
        formattedAmount,
        data.productLabel,
        data.locale || "",
        data.page || "",
        ip
      ]
    });
  } catch (e) {
    console.error("appendToSheet failed:", e && e.message ? e.message : e);
    setResponseStatus(event, 500);
    return {
      ok: false,
      message: "Failed to save to Google Sheets",
      error: (e == null ? void 0 : e.message) || String(e)
    };
  }
  if (tgToken && tgChatId) {
    const text = `\u{1F195} New lead

\u{1F464} ${data.fullName}
\u{1F4DE} ${data.phone}
\u{1F4B0} ${formattedAmount} UZS
\u{1F4E6} ${data.productLabel}
\u{1F310} ${data.page || "-"}`;
    try {
      await sendTelegram(String(tgToken), String(tgChatId), text);
    } catch (e) {
      console.error("sendTelegram failed:", e && e.message ? e.message : e);
    }
  }
  return { ok: true };
});

export { lead_post as default };
//# sourceMappingURL=lead.post.mjs.map
