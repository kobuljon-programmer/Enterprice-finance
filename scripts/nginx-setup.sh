#!/bin/bash
# nginx-setup.sh - Configure nginx as reverse proxy (run on ahost.uz server with sudo)

set -e

DOMAIN="${1:?Usage: ./nginx-setup.sh your-domain.com}"

echo "🔧 Setting up nginx for $DOMAIN..."

# Create nginx config
sudo tee /etc/nginx/sites-available/enterprise-finance > /dev/null << EOF
upstream nuxt_backend {
  server 127.0.0.1:3000;
  keepalive 32;
}

server {
  listen 80;
  server_name $DOMAIN www.$DOMAIN;

  location / {
    proxy_pass http://nuxt_backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_redirect off;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
  }
}
EOF

echo "✅ nginx config created"

echo "🔗 Enabling site..."
sudo ln -sf /etc/nginx/sites-available/enterprise-finance /etc/nginx/sites-enabled/

echo "✔️  Testing nginx config..."
sudo nginx -t

echo "🚀 Reloading nginx..."
sudo systemctl reload nginx

echo ""
echo "✅ nginx setup complete!"
echo ""
echo "🔒 Next steps:"
echo "1. Install SSL: sudo certbot certonly --nginx -d $DOMAIN -d www.$DOMAIN"
echo "2. Update nginx config with SSL (see AHOST_DEPLOY.md Phase 6)"
echo "3. Point DNS A record to server IP"
echo "4. Test: curl http://$DOMAIN"
