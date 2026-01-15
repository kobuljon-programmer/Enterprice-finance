#!/bin/bash
# deploy-local-build.sh - Build the project for ahost.uz deployment

set -e

echo "🔨 Building Nuxt project with backend enabled..."
NUXT_BACKEND=true npm run build

echo "✅ Build complete!"
echo ""
echo "📦 Output location: .output/"
echo "   - .output/public/     → static files"
echo "   - .output/server/     → Node.js server code"
echo ""
echo "🚀 Next steps:"
echo "1. Create deployment archive: tar -czf enterprise-finance-build.tar.gz .output node_modules package.json package-lock.json"
echo "2. Upload to server via SCP: scp enterprise-finance-build.tar.gz user@your-server:~/projects/enterprise-finance/"
echo "3. SSH into server and extract: tar -xzf enterprise-finance-build.tar.gz"
echo "4. Follow AHOST_DEPLOY.md Phase 3-4 to set up .env and start PM2"
