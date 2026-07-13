# 22Cowork Website - Mini PC Setup Instructions

**Instruções completas para configuração inicial no Mini PC Ubuntu.**

---

## 📋 Informações de Configuração

| Item | Valor |
|------|-------|
| **Usuário** | `greatprotect` |
| **IP Tailscale** | `100.79.171.86` (admin apenas) |
| **Domínio Produção** | `22cowork.pt` |
| **Domínio Staging** | `staging.22cowork.pt` |
| **Email SSL** | `team@22cowork.pt` |
| **Diretório Projeto** | `/opt/22cowork/website` |
| **Rede Docker** | `root_default` |
| **Caddy** | Container existente (não alterar) |

---

## 🚀 Instalação em Uma Única Execução

Execute **APENAS ESTE BLOCO** uma única vez no Mini PC como usuário `greatprotect`:

```bash
#!/bin/bash
set -euo pipefail

# 22Cowork Website - Mini PC Installation
# Execute como: bash install-minipc.sh

MINIPC_USER="greatprotect"
PROJECT_DIR="/opt/22cowork/website"
GITHUB_REPO="https://github.com/22cowork/22cowork-website.git"
GITHUB_BRANCH="main"
DOCKER_NETWORK="root_default"

echo "🚀 22Cowork Website - Instalação Mini PC"
echo "=========================================="
echo ""

# Verificar usuário
if [ "$(whoami)" != "$MINIPC_USER" ]; then
    echo "❌ Erro: Execute como usuário '$MINIPC_USER'"
    exit 1
fi

# Verificar pré-requisitos
echo "✓ Verificando pré-requisitos..."
command -v docker >/dev/null 2>&1 || { echo "❌ Docker não instalado"; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "❌ Docker Compose não instalado"; exit 1; }
command -v git >/dev/null 2>&1 || { echo "❌ Git não instalado"; exit 1; }
docker network inspect $DOCKER_NETWORK >/dev/null 2>&1 || { echo "❌ Rede Docker '$DOCKER_NETWORK' não existe"; exit 1; }
echo "✓ Todos os pré-requisitos OK"
echo ""

# Criar estrutura
echo "📁 Criando estrutura de diretórios..."
mkdir -p "$PROJECT_DIR"/{app,config,backups,logs}
echo "✓ Diretórios criados em $PROJECT_DIR"
echo ""

# Clonar/atualizar repositório
echo "📥 Clonando/atualizando repositório..."
if [ -d "$PROJECT_DIR/app/.git" ]; then
    cd "$PROJECT_DIR/app"
    git fetch origin
    git checkout $GITHUB_BRANCH
    git pull origin $GITHUB_BRANCH
else
    git clone -b $GITHUB_BRANCH "$GITHUB_REPO" "$PROJECT_DIR/app"
fi
echo "✓ Repositório atualizado"
echo ""

# Copiar configurações
echo "⚙️  Configurando Docker Compose..."
cp "$PROJECT_DIR/app/docker-compose.yml" "$PROJECT_DIR/config/"
echo "✓ Docker Compose configurado"
echo ""

# Construir imagem
echo "🔨 Construindo imagem Docker..."
cd "$PROJECT_DIR/app"
docker build -t 22cowork-website:latest .
echo "✓ Imagem construída"
echo ""

# Iniciar container
echo "🚀 Iniciando container de produção..."
docker-compose up -d 22cowork-website-prod
echo "✓ Container iniciado"
echo ""

# Health check
echo "⏳ Aguardando health check (máx 30s)..."
for i in {1..30}; do
    if docker exec 22cowork-website-prod wget --no-verbose --tries=1 --spider http://localhost:8080/ >/dev/null 2>&1; then
        echo "✓ Container saudável"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Container não ficou saudável"
        docker logs 22cowork-website-prod
        exit 1
    fi
    sleep 1
done
echo ""

# Verificar Caddy
echo "🔍 Verificando Caddy..."
if docker ps | grep -q "caddy"; then
    echo "✓ Caddy está rodando"
else
    echo "❌ Caddy não está rodando"
    exit 1
fi
echo ""

# Exibir próximos passos
echo "=========================================="
echo "✅ INSTALAÇÃO CONCLUÍDA COM SUCESSO!"
echo "=========================================="
echo ""
echo "📋 PRÓXIMO PASSO: Adicionar bloco Caddy"
echo ""
echo "1. Edite o Caddyfile no host:"
echo "   sudo nano /root/Caddyfile"
echo ""
echo "2. Copie e cole o bloco abaixo ao FINAL do arquivo:"
echo ""
cat "$PROJECT_DIR/app/CADDYFILE_BLOCK.txt"
echo ""
echo "3. Recarregue o Caddy:"
echo "   docker exec caddy caddy reload -c /etc/caddy/Caddyfile"
echo ""
echo "4. Teste os domínios:"
echo "   curl -I https://22cowork.pt/"
echo "   curl -I https://staging.22cowork.pt/"
echo ""
echo "=========================================="
echo "📊 Status:"
echo "  Produção: https://22cowork.pt"
echo "  Staging:  https://staging.22cowork.pt"
echo "  Código:   $PROJECT_DIR/app"
echo "  Backups:  $PROJECT_DIR/backups"
echo "  Logs:     $PROJECT_DIR/logs"
echo "=========================================="
```

---

## 🔧 Configuração do Caddy (Após Instalação)

### 1. Editar Caddyfile

```bash
sudo nano /root/Caddyfile
```

### 2. Adicionar Bloco (ao final do arquivo)

```caddy
# 22Cowork Website - Production
22cowork.pt {
    reverse_proxy 22cowork-website-prod:8080 {
        header_uri -X-Forwarded-For
        header_uri -X-Forwarded-Proto
    }
    
    # Security headers
    header X-Content-Type-Options "nosniff"
    header X-Frame-Options "SAMEORIGIN"
    header X-XSS-Protection "1; mode=block"
    header Referrer-Policy "strict-origin-when-cross-origin"
    
    # Compression
    encode gzip
    
    # Cache control for static assets
    @static {
        path /assets/*
        path /favicon.ico
    }
    header @static Cache-Control "public, max-age=31536000, immutable"
    
    # Cache control for HTML
    @html {
        path_regexp ^.*\.html$
    }
    header @html Cache-Control "public, max-age=3600, must-revalidate"
    
    # Default cache for everything else
    header Cache-Control "public, max-age=3600"
}

# 22Cowork Website - Staging
staging.22cowork.pt {
    reverse_proxy 22cowork-website-staging:8081 {
        header_uri -X-Forwarded-For
        header_uri -X-Forwarded-Proto
    }
    
    # Security headers
    header X-Content-Type-Options "nosniff"
    header X-Frame-Options "SAMEORIGIN"
    header X-XSS-Protection "1; mode=block"
    header Referrer-Policy "strict-origin-when-cross-origin"
    
    # Compression
    encode gzip
    
    # No caching for staging
    header Cache-Control "no-cache, no-store, must-revalidate"
}
```

### 3. Recarregar Caddy

```bash
docker exec caddy caddy reload -c /etc/caddy/Caddyfile
```

### 4. Verificar

```bash
# Testar produção
curl -I https://22cowork.pt/

# Testar staging
curl -I https://staging.22cowork.pt/

# Ver logs do Caddy
docker logs -f caddy
```

---

## 📊 Verificar Status

```bash
# Ver containers
docker ps | grep 22cowork

# Ver logs de produção
docker logs -f 22cowork-website-prod

# Ver logs de staging
docker logs -f 22cowork-website-staging

# Health check manual
docker exec 22cowork-website-prod wget --no-verbose --tries=1 --spider http://localhost:8080/
```

---

## 🔄 Operações Diárias

### Atualizar Código

```bash
cd /opt/22cowork/website/app
git pull origin main
docker-compose build 22cowork-website-prod
docker-compose up -d 22cowork-website-prod
```

### Reiniciar Container

```bash
docker-compose -f /opt/22cowork/website/app/docker-compose.yml restart 22cowork-website-prod
```

### Ver Logs

```bash
docker logs --tail 100 -f 22cowork-website-prod
```

---

## 🤖 GitHub Actions Runner (Opcional)

Para deploy automático via GitHub Actions:

### 1. Gerar Token

1. Ir para https://github.com/settings/tokens
2. Clicar "Generate new token (classic)"
3. Selecionar: `repo`, `workflow`, `admin:org_hook`
4. Copiar token

### 2. Instalar Runner

```bash
cd /opt/22cowork/website/config
bash runner-setup.sh <GITHUB_TOKEN> minipc-prod
```

---

## ⚠️ Restrições Importantes

**NÃO ALTERAR SEM AUTORIZAÇÃO:**

- ❌ Home Assistant
- ❌ ESPHome
- ❌ Grafana
- ❌ InfluxDB
- ❌ Mosquitto
- ❌ Netmaker
- ❌ Caddy (apenas adicionar bloco)
- ❌ Redes Docker existentes
- ❌ Firewall
- ❌ Tailscale
- ❌ Configurações do router
- ❌ DNS

---

## 🐛 Troubleshooting

### Container não inicia

```bash
docker logs 22cowork-website-prod
docker-compose -f /opt/22cowork/website/app/docker-compose.yml down 22cowork-website-prod
docker-compose -f /opt/22cowork/website/app/docker-compose.yml up -d 22cowork-website-prod
```

### Caddy não consegue acessar container

```bash
docker exec caddy ping 22cowork-website-prod
docker network inspect root_default | grep 22cowork
```

### Site não responde

```bash
# Verificar recursos
docker stats 22cowork-website-prod

# Verificar espaço
df -h /opt/22cowork/

# Limpar logs
docker exec 22cowork-website-prod sh -c 'rm -rf /var/log/22cowork/*'
```

---

## 📞 Suporte

Documentação completa: `/opt/22cowork/website/app/DEPLOYMENT.md`

---

**Última atualização**: 13 de julho de 2026  
**Versão**: 1.0.0
