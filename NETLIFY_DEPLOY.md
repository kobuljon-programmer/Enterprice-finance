Netlify deployment

This project supports both static builds and server endpoints using Nuxt/Nitro. Below are recommended settings to deploy to Netlify.

1. Build settings

- Build command: `npx nuxi build`
- Publish directory: `.output/public`

2. How the project decides server mode

- `NUXT_BACKEND` (set to `"true"`) — enables server mode in the app (SSR + server endpoints).
- Netlify sets `NETLIFY=true` during builds; the config detects it and will use Nitro's `netlify` preset when `NUXT_BACKEND` is `true`.

3. Deployment scenarios

- Static site (no server/api): leave `NUXT_BACKEND` unset or not `"true"`. The build will produce a static site.
- Netlify Functions (server endpoints): set `NUXT_BACKEND` = `true` in Netlify environment variables. Nitro will use the `netlify` preset and Netlify Functions will host your `server/api/*` routes.
- Self-hosted Node server: set `NUXT_BACKEND` = `true` and deploy using `node-server` preset (used when not on Netlify).

4. Required environment variables (set these in Netlify dashboard > Site settings > Build & deploy > Environment)

- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SHEETS_TAB_NAME` (optional depending on usage)
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` (server-only)
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (server-only)
- `TELEGRAM_BOT_TOKEN` (server-only)
- `TELEGRAM_CHAT_ID` (server-only)
- `NUXT_BACKEND` = `true` (if you want server endpoints on Netlify)

Notes

- Keep sensitive keys (service account private key, Telegram token) as server-only env vars — these are placed in `runtimeConfig` so they're not sent to the browser. If you need to expose any values to the client, move them into `runtimeConfig.public` explicitly.
- If you rely on server endpoints from client code, make sure `NUXT_BACKEND=true` is set in Netlify; otherwise those endpoints will not exist in static mode.

Example Netlify build settings summary:

- Build command: `npx nuxi build`
- Publish directory: `.output/public`
- Environment variables: add the keys listed above

If you want, I can also update the project's `README.md` to link to this file and add a short example of common Netlify env var values (non-sensitive).
