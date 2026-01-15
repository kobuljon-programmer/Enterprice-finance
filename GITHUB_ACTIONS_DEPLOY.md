# GitHub Deployment Options

## Quick Comparison

| Option                          | Best For                        | Supports Backend? | Cost                |
| ------------------------------- | ------------------------------- | ----------------- | ------------------- |
| **GitHub Pages**                | Static sites only               | ❌ No             | Free                |
| **GitHub Actions + SSH Deploy** | Auto-deploy to ahost.uz on push | ✅ Yes            | Free                |
| **Netlify**                     | Static + Netlify Functions      | ✅ Yes (limited)  | Free tier available |
| **Self-hosted ahost.uz**        | Full Node.js backend            | ✅ Yes            | Already renting     |

## Your Best Option: GitHub Actions + SSH to ahost.uz

Since you have a **Node.js backend** (`/api/lead`, `/api/ping`), you can't use GitHub Pages (static only). Instead, use **GitHub Actions** to:

1. **On every push** to main branch:
   - Build your project locally
   - Deploy to ahost.uz via SSH
   - Restart the Node app

This gives you the same **auto-deploy experience as Netlify** but to your own ahost.uz server.

## Setup Steps

### 1. Add your SSH private key to GitHub Secrets

On your local machine, get your SSH private key:

```bash
# If you have an SSH key already
cat ~/.ssh/id_rsa

# Or create one if needed
ssh-keygen -t rsa -b 4096 -f ~/.ssh/ahost_deploy -N ""
cat ~/.ssh/ahost_deploy
```

In GitHub:

1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Name: `AHOST_SSH_KEY`
4. Value: paste your private SSH key (the entire content including `-----BEGIN PRIVATE KEY-----`)
5. Click **Add secret**

Also add these secrets for your environment variables:

- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SHEETS_TAB_NAME`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `AHOST_USER` (your cPanel username)
- `AHOST_HOST` (your server IP or domain)

### 2. Create GitHub Actions workflow file

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to ahost.uz

on:
  push:
    branches:
      - main # Deploy on every push to main branch

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm install

      - name: Build project
        env:
          NUXT_BACKEND: "true"
        run: npm run build

      - name: Deploy to ahost.uz
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.AHOST_HOST }}
          username: ${{ secrets.AHOST_USER }}
          key: ${{ secrets.AHOST_SSH_KEY }}
          script: |
            cd ~/public_html/enterprise-finance

            # Stop the app
            pm2 stop enterprise-finance || true

            # Remove old build and node_modules
            rm -rf .output node_modules

            # Download and extract new build from GitHub
            # This step requires you to upload build to GitHub releases or use git
            # For now, we'll use git to pull latest code
            git pull origin main
            npm install --production
            npm run build

            # Restart the app
            pm2 restart enterprise-finance || pm2 start .output/server/index.mjs --name enterprise-finance --env-file .env

      - name: Notify on success
        run: echo "✅ Deployment to ahost.uz successful!"

      - name: Notify on failure
        if: failure()
        run: echo "❌ Deployment failed"
```

### 3. Alternative: Upload build artifacts to GitHub

If you prefer not to build on the server, you can upload to GitHub Releases and download there:

```yaml
name: Deploy to ahost.uz (with artifacts)

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "20"
      - run: npm install
      - run: npm run build
        env:
          NUXT_BACKEND: "true"

      - name: Create artifact
        run: tar -czf build.tar.gz .output node_modules package.json package-lock.json

      - name: Upload to GitHub releases
        uses: softprops/action-gh-release@v1
        with:
          files: build.tar.gz
          tag_name: v${{ github.run_number }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to ahost.uz
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.AHOST_HOST }}
          username: ${{ secrets.AHOST_USER }}
          key: ${{ secrets.AHOST_SSH_KEY }}
          script: |
            cd ~/public_html/enterprise-finance

            pm2 stop enterprise-finance || true
            rm -rf .output node_modules

            # Download latest release
            wget -qO build.tar.gz https://github.com/${{ github.repository }}/releases/download/v${{ github.run_number }}/build.tar.gz
            tar -xzf build.tar.gz
            rm build.tar.gz

            # Restart app
            pm2 restart enterprise-finance || pm2 start .output/server/index.mjs --name enterprise-finance --env-file .env
```

## Setup Checklist

- [ ] Push your code to GitHub (create repo if needed)
- [ ] Add SSH private key to GitHub Secrets → `AHOST_SSH_KEY`
- [ ] Add environment variables to GitHub Secrets:
  - `AHOST_USER`, `AHOST_HOST`
  - `GOOGLE_SHEETS_SPREADSHEET_ID`, etc.
- [ ] Create `.github/workflows/deploy.yml` file in your repo
- [ ] Make sure ahost.uz has Node.js + PM2 already set up
- [ ] Push to main branch
- [ ] Watch GitHub Actions tab for automatic deployment

## How it works

1. You push code to GitHub `main` branch
2. GitHub Actions automatically:
   - Checks out your code
   - Installs dependencies
   - Builds the project
   - Connects to ahost.uz via SSH
   - Stops old app, deploys new build
   - Restarts the app
3. Your site is live!

## Monitoring

- View deployment status: GitHub repo → **Actions** tab
- View app logs on ahost.uz:
  ```bash
  ssh your-user@your-ahost-server
  cd public_html/enterprise-finance
  pm2 logs enterprise-finance
  ```

---

**Choose one approach:**

- **Simple**: Use `.github/workflows/deploy.yml` with git pull (requires server to have git installed)
- **Safer**: Use release artifacts (no git needed on server, but slightly slower)
- **Easiest**: Keep using Netlify for frontend, ahost.uz for API (no GitHub CI/CD needed)

Which would you prefer?
