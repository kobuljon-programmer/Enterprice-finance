# ahost.uz cPanel Deployment - Quick Start Guide

Step-by-step instructions for uploading and running your Nuxt app on ahost.uz (cPanel-based hosting).

## Step 1: Local Build (on your machine)

```bash
cd /Users/kobuljonrasuljonov/EnterPriceFinanceForClaude

# Build with backend enabled
NUXT_BACKEND=true npm run build

# Verify build output exists
ls -la .output/
ls -la .output/public/
ls -la .output/server/
```

## Step 2: Prepare files for upload

```bash
# Option A: Create a compressed archive (easiest for cPanel upload)
tar -czf enterprise-finance.tar.gz .output node_modules package.json package-lock.json

# Option B: Keep folders separate and upload individually
# (you choose based on your connection speed)
```

## Step 3: Log into cPanel

1. Go to `https://your-ahost-domain.com:2083` (or ask ahost.uz for the cPanel URL)
2. Enter your **cPanel username** and **password** (from ahost.uz welcome email)
3. Click **File Manager** on the left sidebar

## Step 4: Create project folder in cPanel

1. In File Manager, navigate to `/home/your-username/public_html`
2. Right-click → **Create New Folder** → name it `enterprise-finance`
3. Double-click to enter the folder

## Step 5: Upload files to cPanel (via File Manager)

**If using compressed archive (.tar.gz):**

1. Click **Upload** button
2. Select `enterprise-finance.tar.gz` from your machine
3. Wait for upload to complete
4. Right-click the file → **Extract**
5. Confirm extraction (should create `.output/`, `node_modules/`, `package.json`, etc.)
6. Delete the `.tar.gz` file (no longer needed)

**If uploading folders individually:**

1. Click **Upload** button → upload each folder:
   - `.output/` (should be smaller, ~100MB+)
   - `node_modules/` (largest, ~300MB+)
   - `package.json`
   - `package-lock.json`

## Step 6: Create `.env` file in cPanel

1. In File Manager, inside `enterprise-finance/` folder, right-click → **Create New File** → name it `.env`
2. Right-click `.env` → **Edit**
3. Paste your environment variables:

```
NUXT_BACKEND=true
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
GOOGLE_SHEETS_TAB_NAME=Leads
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQI...\n-----END PRIVATE KEY-----\n
TELEGRAM_BOT_TOKEN=your-telegram-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
```

4. Click **Save** and close

## Step 7: Enable Node.js (if available in cPanel)

1. Go back to cPanel home
2. Look for **"Node.js"** or **"Software Collections"**
3. If found:

   - Click **Node.js**
   - Create new app:
     - **App name**: `enterprise-finance`
     - **App domain**: `your-domain.com` (or subdomain)
     - **App path**: `/enterprise-finance`
     - **Node.js version**: 20.x (or latest stable)
     - **App startup file**: `.output/server/index.mjs`
     - Click **Create**

4. If Node.js not available in cPanel:
   - You'll need SSH access (see Step 8 alternative)

## Step 8: Alternative - Use SSH (if available)

If Node.js is not in cPanel, ask ahost.uz support to enable SSH for your account.

Once SSH is enabled:

```bash
# SSH into your server
ssh your-cpanel-username@your-ahost-server-ip

# Navigate to app folder
cd public_html/enterprise-finance

# Check if Node is installed
node -v npm -v

# If Node not installed, install via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 20
nvm use 20

# Install PM2 globally
npm install -g pm2

# Start app
pm2 start .output/server/index.mjs --name enterprise-finance --env-file .env

# Save PM2 config
pm2 save

# Auto-restart on server reboot
pm2 startup
# Copy and run the command shown
pm2 save
```

## Step 9: Point your domain to ahost.uz

1. Go to your domain registrar (namecheap.uz, nic.uz, etc.)
2. Update DNS **A record** to point to your ahost.uz server IP:
   - **Host**: `@` (or your domain name)
   - **Type**: A
   - **Value**: `your-ahost-server-ip` (ask ahost.uz for the IP)
3. Wait 5 minutes to 24 hours for DNS to propagate

## Step 10: Set up SSL (HTTPS) in cPanel

1. Go back to cPanel home
2. Look for **"AutoSSL"** or **"Let's Encrypt"** section
3. Click to enable/install SSL for your domain
4. Wait a few minutes for certificate to be issued
5. Your site should now be accessible via `https://your-domain.com`

## Step 11: Test your app

Once DNS propagates and domain points to server:

```bash
# Test the main page
curl -v https://your-domain.com

# Test the API ping endpoint
curl -v https://your-domain.com/api/ping
# Expected response: {"ok":true,"message":"Nitro backend is working"}

# Test form submission
curl -X POST https://your-domain.com/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "phone": "+998901234567",
    "amount": 300000000,
    "productLabel": "Test Product",
    "locale": "uz"
  }'
```

## Step 12: Monitor and troubleshoot

**If site shows blank or error:**

1. Check cPanel File Manager for:

   - `.output/` folder exists
   - `.output/public/` has index.html
   - `.output/server/` has index.mjs
   - `node_modules/` exists
   - `.env` file exists

2. If using Node.js from cPanel:

   - Go to Node.js section → View logs
   - Look for error messages

3. If using SSH/PM2:

   ```bash
   ssh your-cpanel-username@your-ahost-server-ip
   cd public_html/enterprise-finance
   pm2 logs enterprise-finance
   ```

4. Check cPanel error logs:
   - Go to cPanel → **Error Log**
   - Look for app startup errors

**Common issues:**

| Problem                  | Solution                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------- |
| 502 Bad Gateway          | Node app not running. Check logs, restart from cPanel or PM2                       |
| 404 on pages             | `.output/public/` missing or not served. Verify build output                       |
| .env file not found      | Check file is in `/enterprise-finance/.env`, make sure it's readable               |
| Port 3000 not accessible | cPanel may block custom ports. Use Node.js section in cPanel instead of manual PM2 |
| API returns 404          | Ensure `NUXT_BACKEND=true` in `.env`, restart Node app                             |

## Step 13: Redeploy updates

When you update the code locally and want to deploy:

```bash
# On your local machine
NUXT_BACKEND=true npm run build
tar -czf enterprise-finance.tar.gz .output node_modules

# Upload via cPanel File Manager
# - Upload the new .tar.gz
# - Delete old .output and node_modules folders
# - Extract the new .tar.gz
# - Restart the app from cPanel Node.js section or PM2 (via SSH)
```

---

**Questions? Contact ahost.uz support or refer to AHOST_DEPLOY.md for more detailed information.**
