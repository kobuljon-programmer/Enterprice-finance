# ahost.uz Deployment Roadmap

This guide walks you through deploying the Nuxt 3 + Nitro project to an ahost.uz hosting account (cPanel).

## Prerequisites

- ahost.uz cPanel account (shared hosting or VPS with cPanel)
- Domain name pointing to your ahost.uz server (or ready to point)
- Local build of the project (tested locally)
- FTP/SFTP credentials or File Manager access (cPanel provides both)
- SSH access (optional but recommended — ask ahost.uz to enable if needed)

## Phase 1: Local Build & Preparation

### 1.1 Build the project locally (with backend enabled)

```bash
NUXT_BACKEND=true npm run build
```

This generates `.output/public` (static files) and `.output/server` (Node.js server code).

### 1.2 Verify build output

- Check that `.output/public/` contains your static assets
- Check that `.output/server/` contains the compiled server code
- Confirm `.output/.env` does NOT exist (env vars will be set on the server)

### 1.3 Create a deployment archive (optional, for upload)

```bash
tar -czf enterprise-finance-build.tar.gz .output node_modules package.json package-lock.json
```

## Phase 2: Server Setup on ahost.uz

### 2.1 SSH into your ahost.uz server

```bash
ssh user@your-ahost-ip-or-domain
```

### 2.2 Install Node.js (if not installed)

```bash
# Check if Node is installed
node -v npm -v

# If not, install Node.js via nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
node -v
npm -v
```

### 2.3 Create a project directory

```bash
mkdir -p ~/projects/enterprise-finance
cd ~/projects/enterprise-finance
```

### 2.4 Upload project files

**Option A: Using SCP (command line)**

```bash
scp -r .output node_modules package.json package-lock.json user@your-server:~/projects/enterprise-finance/
```

**Option B: Using SFTP (FileZilla, WinSCP, etc.)**

- Connect to your server via SFTP
- Navigate to `~/projects/enterprise-finance`
- Upload `.output`, `node_modules`, `package.json`, `package-lock.json`

**Option C: Git (if repo is on GitHub)**

```bash
cd ~/projects/enterprise-finance
git clone https://github.com/your-repo.git .
npm install
NUXT_BACKEND=true npm run build
```

### 2.5 Install PM2 (process manager)

```bash
npm install -g pm2
```

## Phase 3: Environment Variables & Configuration

### 3.1 Create `.env` file on server

```bash
cd ~/projects/enterprise-finance
cat > .env << 'EOF'
NUXT_BACKEND=true
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
GOOGLE_SHEETS_TAB_NAME=Leads
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQI...\n-----END PRIVATE KEY-----\n"
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
EOF
```

**Important**: Replace placeholders with your actual values. Keep the private key in a single line with `\n` escape sequences (not multi-line).

### 3.2 Verify `.env` permissions

```bash
chmod 600 .env  # Only owner can read/write
```

## Phase 4: Start Application with PM2

### 4.1 Create PM2 startup script

```bash
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'enterprise-finance',
      script: './.output/server/index.mjs',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_file: '.env',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
EOF
```

### 4.2 Create logs directory

```bash
mkdir -p logs
```

### 4.3 Start the app with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
```

### 4.4 Set PM2 to restart on server reboot

```bash
pm2 startup
# Copy and run the command shown in the output
pm2 save
```

### 4.5 Check app status

```bash
pm2 status
pm2 logs enterprise-finance
```

## Phase 5: Nginx Reverse Proxy Setup

### 5.1 Install Nginx (if not installed)

```bash
# On Ubuntu/Debian
sudo apt update
sudo apt install nginx -y

# On CentOS
sudo yum install nginx -y

# Start nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 5.2 Create nginx config

```bash
sudo nano /etc/nginx/sites-available/enterprise-finance
```

Paste the following (replace `your-domain.com`):

```nginx
upstream nuxt_backend {
  server 127.0.0.1:3000;
  keepalive 32;
}

server {
  listen 80;
  server_name your-domain.com www.your-domain.com;

  # Redirect HTTP to HTTPS (optional, recommended)
  # return 301 https://$server_name$request_uri;

  location / {
    proxy_pass http://nuxt_backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_redirect off;
  }

  # Static assets cache (optional)
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
  }
}
```

### 5.3 Enable the nginx config

```bash
sudo ln -s /etc/nginx/sites-available/enterprise-finance /etc/nginx/sites-enabled/
sudo nginx -t  # Test config
sudo systemctl reload nginx
```

## Phase 6: SSL Certificate (HTTPS)

### 6.1 Install Let's Encrypt Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 6.2 Generate certificate

```bash
sudo certbot certonly --nginx -d your-domain.com -d www.your-domain.com
```

### 6.3 Update nginx config for HTTPS

```bash
sudo nano /etc/nginx/sites-available/enterprise-finance
```

Replace with:

```nginx
upstream nuxt_backend {
  server 127.0.0.1:3000;
  keepalive 32;
}

server {
  listen 80;
  server_name your-domain.com www.your-domain.com;
  return 301 https://$server_name$request_uri;  # Redirect HTTP to HTTPS
}

server {
  listen 443 ssl http2;
  server_name your-domain.com www.your-domain.com;

  ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;

  location / {
    proxy_pass http://nuxt_backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_redirect off;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
  }
}
```

### 6.4 Reload nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 6.5 Auto-renew certificates

```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

## Phase 7: DNS & Domain Pointing

### 7.1 Point your domain to ahost.uz server

- Log into your domain registrar (e.g., namecheap.uz, nic.uz)
- Update DNS A record to point to your ahost.uz server IP
- Example: `A record: your-domain.com → 1.2.3.4` (replace with your server IP)

### 7.2 Wait for DNS propagation (5 min to 24 hrs)

```bash
nslookup your-domain.com
# Should show your ahost.uz server IP
```

## Phase 8: Verification & Testing

### 8.1 Test the site

```bash
curl -v https://your-domain.com
curl -v https://your-domain.com/api/ping
curl -X POST https://your-domain.com/api/lead -H "Content-Type: application/json" \
  -d '{"fullName":"Test","phone":"+998901234567","amount":300000000,"productLabel":"Test","locale":"uz"}'
```

### 8.2 Monitor logs

```bash
# App logs
pm2 logs enterprise-finance

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### 8.3 Check PM2 status

```bash
pm2 status
pm2 monit
```

## Phase 9: Updates & Maintenance

### 9.1 Deploy updates

```bash
# On your local machine
NUXT_BACKEND=true npm run build
tar -czf enterprise-finance-build.tar.gz .output

# Upload to server
scp enterprise-finance-build.tar.gz user@server:~/projects/enterprise-finance/

# On server
cd ~/projects/enterprise-finance
tar -xzf enterprise-finance-build.tar.gz
pm2 restart enterprise-finance
```

### 9.2 Monitor Telegram/Google Sheets access

- Ensure service account has appropriate scopes and permissions
- Test `/api/lead` periodically to catch failures early

### 9.3 SSL certificate renewal (automatic)

```bash
sudo certbot renew --dry-run  # Test
sudo certbot renew            # Actual renewal
```

## Troubleshooting

| Issue                          | Solution                                                                   |
| ------------------------------ | -------------------------------------------------------------------------- |
| 502 Bad Gateway                | Check `pm2 logs`, verify app is running on port 3000                       |
| 404 on `/api/lead`             | Ensure `NUXT_BACKEND=true` was set during build, check Nitro preset        |
| DNS not resolving              | Wait for propagation, check A record in registrar                          |
| SSL certificate issues         | Run `sudo certbot certificates`, check expiration                          |
| PM2 crashes on reboot          | Run `pm2 startup` and `pm2 save` again                                     |
| Environment variables not read | Check `.env` file exists, check PM2 `env_file` line in ecosystem.config.js |

## Summary Checklist

- [ ] Build project locally: `NUXT_BACKEND=true npm run build`
- [ ] Upload `.output`, `node_modules`, `package.json` to server
- [ ] Install Node.js on server (check with `node -v`)
- [ ] Create `.env` file with all secrets on server
- [ ] Install PM2 globally and start app
- [ ] Configure nginx as reverse proxy
- [ ] Set up SSL with Let's Encrypt
- [ ] Point domain DNS to server IP
- [ ] Test `/api/ping` and `/api/lead`
- [ ] Monitor PM2 and nginx logs
- [ ] Set up auto-renewal for SSL
