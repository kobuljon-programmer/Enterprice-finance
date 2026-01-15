# How to Access ahost.uz Server Terminal

You have two options to access your server and run commands:

## Option 1: cPanel Terminal (Easiest, No Setup)

**Steps:**

1. Log into cPanel: `https://your-ahost-domain.com:2083` (or ask ahost.uz for URL)
2. Search for **"Terminal"** in the search bar at top
3. Click **Terminal** (if not visible, ask ahost.uz support to enable it)
4. A terminal window opens in your browser

**Now you can run commands directly:**

```bash
cd public_html/enterprise-finance
git pull origin main
npm install
NUXT_BACKEND=true npm run build
pm2 start .output/server/index.mjs --name enterprise-finance --env-file .env
pm2 status
```

**Common commands in Terminal:**

```bash
# Check current directory
pwd

# List files
ls -la

# Navigate to project
cd public_html/enterprise-finance

# Check if Node.js is installed
node -v
npm -v

# Check if PM2 is installed
pm2 -v

# View app logs
pm2 logs enterprise-finance

# Stop app
pm2 stop enterprise-finance

# Restart app
pm2 restart enterprise-finance

# Rebuld and restart
npm run build && pm2 restart enterprise-finance
```

---

## Option 2: SSH (More Powerful, Requires Setup)

### 2a. Find your SSH credentials

**From cPanel:**

1. Log into cPanel
2. Look for **"Account Information"** or **"SSH Access"**
3. Find:
   - **SSH hostname/address** (example: `rasuljon.uz` or `1.2.3.4`)
   - **SSH port** (usually `22`)
   - **Username** (your cPanel username, probably `rasuljson` from your Git info)

**Or ask ahost.uz support:** "How do I enable SSH for my account? What's my SSH hostname and port?"

### 2b. Connect via SSH (on your Mac)

```bash
# Basic connection
ssh your-username@your-ahost-hostname

# Example (replace with your actual credentials)
ssh rasuljson@rasuljon.uz

# If using custom port (ask ahost.uz if port is not 22)
ssh -p 2222 rasuljson@rasuljon.uz
```

**First time connecting**, you'll see:

```
The authenticity of host can't be established. Continue? (yes/no)
```

Type `yes` and press Enter.

Then enter your **cPanel password** (same as cPanel login).

### 2c. Once connected via SSH

```bash
# Navigate to your project
cd public_html/enterprise-finance

# Or if you named it differently, list what's there
ls public_html/

# View your Git repository (from cPanel screenshots)
cd /home/rasuljson/repositories/Enterprise-finance
git status
git pull origin main
```

---

## Step-by-Step: Deploy using Terminal/SSH

### Example workflow:

```bash
# 1. Connect (cPanel Terminal or SSH)
ssh rasuljson@rasuljon.uz
# Enter cPanel password

# 2. Go to project folder
cd public_html/enterprise-finance

# 3. Pull latest code from GitHub
git pull origin main

# 4. Install/update dependencies
npm install --production

# 5. Build the project
NUXT_BACKEND=true npm run build

# 6. Create .env file if it doesn't exist (one time only)
nano .env
# Paste your environment variables:
# NUXT_BACKEND=true
# GOOGLE_SHEETS_SPREADSHEET_ID=...
# etc.
# Save: Ctrl+O, Enter, Ctrl+X

# 7. Start/restart the app
pm2 restart enterprise-finance || pm2 start .output/server/index.mjs --name enterprise-finance --env-file .env

# 8. Check status
pm2 status

# 9. View logs
pm2 logs enterprise-finance

# 10. Exit
exit
```

---

## Troubleshooting Access Issues

| Problem                          | Solution                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| **SSH Connection Refused**       | SSH might not be enabled. Ask ahost.uz support: "Can you enable SSH for my account?" |
| **Permission Denied (password)** | Using wrong password. Use your **cPanel password**                                   |
| **No Terminal in cPanel**        | Ask ahost.uz support: "Can you enable Terminal access in cPanel?"                    |
| **Command not found: pm2**       | PM2 not installed globally. Run: `npm install -g pm2` first                          |
| **Permission denied for .env**   | Run: `chmod 600 .env` to make it readable                                            |

---

## Quick Test

Once connected, run this to verify everything is set up:

```bash
node -v          # Should show Node.js version
npm -v           # Should show npm version
pm2 -v           # Should show PM2 version
cd public_html/enterprise-finance && ls -la  # Should show .output, node_modules, .env
```

---

## Which one should I use?

- **cPanel Terminal** = Easy, browser-based, no setup
- **SSH** = More powerful, works with Git, better for scripts

**I recommend:** Start with **cPanel Terminal** for quick testing, then learn SSH for more control.

**What's your ahost.uz hostname and port?** (You can find this in cPanel or from ahost.uz welcome email)
