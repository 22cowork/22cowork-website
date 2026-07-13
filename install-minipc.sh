#!/bin/bash

################################################################################
# 22Cowork Website - Mini PC Installation Script
# 
# Este script configura o ambiente de produção e staging no Mini PC Ubuntu.
# Deve ser executado uma única vez como usuário 'greatprotect'.
#
# Uso: bash install-minipc.sh
#
# IMPORTANTE:
# - Este script é idempotente (seguro executar múltiplas vezes)
# - Não altera serviços existentes (Home Assistant, Grafana, etc.)
# - Não modifica o Caddy existente
# - Cria apenas o container 22cowork-website
################################################################################

set -euo pipefail

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuração
MINIPC_USER="greatprotect"
PROJECT_DIR="/opt/22cowork/website"
GITHUB_REPO="https://github.com/22cowork/22cowork-website.git"
GITHUB_BRANCH="main"
DOCKER_NETWORK="root_default"

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  22Cowork Website - Mini PC Installation${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Verificar se está sendo executado como o usuário correto
if [ "$(whoami)" != "$MINIPC_USER" ]; then
    echo -e "${RED}✗ Este script deve ser executado como usuário '$MINIPC_USER'${NC}"
    echo -e "${YELLOW}  Tente: sudo -u $MINIPC_USER bash install-minipc.sh${NC}"
    exit 1
fi

echo -e "${YELLOW}Verificando pré-requisitos...${NC}"

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker não está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker instalado${NC}"

# Verificar Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}✗ Docker Compose não está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker Compose instalado${NC}"

# Verificar Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}✗ Git não está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Git instalado${NC}"

# Verificar se rede Docker existe
if ! docker network inspect $DOCKER_NETWORK > /dev/null 2>&1; then
    echo -e "${RED}✗ Rede Docker '$DOCKER_NETWORK' não existe${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Rede Docker '$DOCKER_NETWORK' existe${NC}"

echo ""
echo -e "${YELLOW}Criando estrutura de diretórios...${NC}"

# Criar diretórios
mkdir -p "$PROJECT_DIR"/{app,config,backups,logs}
echo -e "${GREEN}✓ Diretórios criados em $PROJECT_DIR${NC}"

# Clonar ou atualizar repositório
if [ -d "$PROJECT_DIR/app/.git" ]; then
    echo -e "${YELLOW}Atualizando repositório...${NC}"
    cd "$PROJECT_DIR/app"
    git fetch origin
    git checkout $GITHUB_BRANCH
    git pull origin $GITHUB_BRANCH
else
    echo -e "${YELLOW}Clonando repositório...${NC}"
    git clone -b $GITHUB_BRANCH "$GITHUB_REPO" "$PROJECT_DIR/app"
fi
echo -e "${GREEN}✓ Repositório atualizado${NC}"

# Copiar docker-compose para diretório de configuração
echo -e "${YELLOW}Configurando Docker Compose...${NC}"
cp "$PROJECT_DIR/app/docker-compose.yml" "$PROJECT_DIR/config/"
echo -e "${GREEN}✓ Docker Compose configurado${NC}"

# Criar arquivo de configuração de logs
echo -e "${YELLOW}Configurando logging...${NC}"
cat > "$PROJECT_DIR/config/docker-compose.override.yml" << 'EOF'
version: '3.8'

services:
  22cowork-website-prod:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        labels: "com.22cowork.service=website"
    volumes:
      - /opt/22cowork/website/logs:/var/log/22cowork

  22cowork-website-staging:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        labels: "com.22cowork.service=website-staging"
    volumes:
      - /opt/22cowork/website/logs:/var/log/22cowork
EOF
echo -e "${GREEN}✓ Logging configurado${NC}"

# Construir imagem Docker
echo -e "${YELLOW}Construindo imagem Docker...${NC}"
cd "$PROJECT_DIR/app"
docker build -t 22cowork-website:latest .
echo -e "${GREEN}✓ Imagem Docker construída${NC}"

# Iniciar containers
echo -e "${YELLOW}Iniciando containers...${NC}"
cd "$PROJECT_DIR/app"
docker-compose up -d 22cowork-website-prod
echo -e "${GREEN}✓ Container de produção iniciado${NC}"

# Aguardar health check
echo -e "${YELLOW}Aguardando health check...${NC}"
for i in {1..30}; do
    if docker exec 22cowork-website-prod wget --no-verbose --tries=1 --spider http://localhost:8080/ > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Container saudável${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}✗ Container não ficou saudável após 30 segundos${NC}"
        docker logs 22cowork-website-prod
        exit 1
    fi
    echo "  Tentativa $i/30..."
    sleep 1
done

echo ""
echo -e "${YELLOW}Verificando Caddy...${NC}"

# Verificar se Caddy está rodando
if docker ps | grep -q "caddy"; then
    echo -e "${GREEN}✓ Caddy está rodando${NC}"
    
    # Mostrar instruções para adicionar bloco Caddy
    echo ""
    echo -e "${YELLOW}PRÓXIMO PASSO: Adicionar bloco Caddy${NC}"
    echo ""
    echo -e "  1. Edite o arquivo Caddyfile no host:"
    echo -e "     ${BLUE}sudo nano /root/Caddyfile${NC}"
    echo ""
    echo -e "  2. Adicione o seguinte bloco ao final do arquivo:"
    echo -e "     ${BLUE}(copiar conteúdo de $PROJECT_DIR/app/CADDYFILE_BLOCK.txt)${NC}"
    echo ""
    echo -e "  3. Recarregue o Caddy:"
    echo -e "     ${BLUE}docker exec caddy caddy reload -c /etc/caddy/Caddyfile${NC}"
    echo ""
else
    echo -e "${RED}✗ Caddy não está rodando${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Criando arquivo de configuração do runner...${NC}"

# Criar arquivo de configuração para GitHub Actions runner
cat > "$PROJECT_DIR/config/runner-setup.sh" << 'EOF'
#!/bin/bash
# Script para configurar GitHub Actions self-hosted runner
# Execute como: bash runner-setup.sh <GITHUB_TOKEN> <RUNNER_NAME>

GITHUB_TOKEN=$1
RUNNER_NAME=${2:-"minipc-prod"}
RUNNER_DIR="/opt/22cowork/runner"

mkdir -p $RUNNER_DIR
cd $RUNNER_DIR

# Download runner
curl -o actions-runner-linux-x64.tar.gz -L https://github.com/actions/runner/releases/download/v2.315.0/actions-runner-linux-x64-2.315.0.tar.gz
tar xzf actions-runner-linux-x64.tar.gz

# Configure runner
./config.sh --url https://github.com/22cowork/22cowork-website --token $GITHUB_TOKEN --name $RUNNER_NAME --labels production

# Install as service
sudo ./svc.sh install

# Start service
sudo ./svc.sh start
EOF
chmod +x "$PROJECT_DIR/config/runner-setup.sh"
echo -e "${GREEN}✓ Script do runner criado${NC}"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Instalação concluída com sucesso!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Status do deployment:${NC}"
echo ""
echo -e "  Produção:"
echo -e "    Container: ${GREEN}22cowork-website-prod${NC}"
echo -e "    Status: $(docker ps | grep -q 22cowork-website-prod && echo -e "${GREEN}✓ Rodando${NC}" || echo -e "${RED}✗ Parado${NC}")"
echo -e "    URL: ${BLUE}https://22cowork.pt${NC}"
echo ""
echo -e "  Staging:"
echo -e "    Container: ${GREEN}22cowork-website-staging${NC}"
echo -e "    Status: $(docker ps | grep -q 22cowork-website-staging && echo -e "${GREEN}✓ Rodando${NC}" || echo -e "${YELLOW}⊘ Não iniciado${NC}")"
echo -e "    URL: ${BLUE}https://staging.22cowork.pt${NC}"
echo ""
echo -e "${YELLOW}Diretórios:${NC}"
echo -e "  Código: ${BLUE}$PROJECT_DIR/app${NC}"
echo -e "  Backups: ${BLUE}$PROJECT_DIR/backups${NC}"
echo -e "  Logs: ${BLUE}$PROJECT_DIR/logs${NC}"
echo ""
echo -e "${YELLOW}Próximos passos:${NC}"
echo ""
echo -e "  1. Adicionar bloco Caddy (ver instruções acima)"
echo -e "  2. Configurar GitHub Actions runner (opcional)"
echo -e "  3. Testar acesso ao site"
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
