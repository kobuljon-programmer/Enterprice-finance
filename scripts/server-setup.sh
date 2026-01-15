#!/bin/bash
# server-setup.sh - Quick server setup script (run on ahost.uz server after uploading files)

set -e

PROJECT_DIR="$HOME/projects/enterprise-finance"

echo "📁 Creating project directory..."
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

echo "🔍 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "⚠️  Node.js not found. Installing via nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install 20
else
    echo "✅ Node.js $(node -v) found"
fi

echo "📦 Installing PM2..."
npm install -g pm2

echo "📝 Creating .env file..."
echo "Enter environment variables (one per line, format: KEY=VALUE). Press Ctrl+D when done:"
cat > .env

chmod 600 .env
echo "✅ .env created (permissions: 600)"

echo "📂 Creating logs directory..."
mkdir -p logs

echo "⚙️  Creating PM2 ecosystem config..."
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

echo "🚀 Starting app with PM2..."
pm2 start ecosystem.config.js

echo "💾 Saving PM2 config..."
pm2 save

echo "⏰ Setting up PM2 auto-restart on server reboot..."
pm2 startup
echo "⚠️  Copy and run the command above if prompted"

echo ""
echo "✅ Server setup complete!"
echo ""
echo "📊 Check app status: pm2 status"
echo "📋 View logs: pm2 logs enterprise-finance"
echo ""
echo "🔗 Next steps: Configure nginx reverse proxy (see AHOST_DEPLOY.md Phase 5)"
