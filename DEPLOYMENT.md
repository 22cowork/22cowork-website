# 22Cowork Website - Deployment Guide

Guia completo para deployment do website 22Cowork no Mini PC Ubuntu com Docker, Caddy e GitHub Actions.

## 📋 Índice

1. [Arquitetura](#arquitetura)
2. [Pré-requisitos](#pré-requisitos)
3. [Instalação Inicial](#instalação-inicial)
4. [Configuração Caddy](#configuração-caddy)
5. [GitHub Actions Runner](#github-actions-runner)
6. [Operações Diárias](#operações-diárias)
7. [Troubleshooting](#troubleshooting)
8. [Rollback](#rollback)
9. [Backups](#backups)

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     Internet (HTTPS)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │   Caddy (Reverse Proxy)        │
        │   Portas: 80, 443              │
        │   Container: caddy             │
        └────────────┬───────────────────┘
                     │
        ┌────────────┴──────────────────────────┐
        │                                       │
        ▼                                       ▼
┌──────────────────────┐          ┌──────────────────────┐
│   Produção           │          │   Staging            │
│   22cowork.pt        │          │   staging.22cowork.pt│
│   Port: 8080         │          │   Port: 8081         │
│   Container: prod    │          │   Container: staging │
└──────────────────────┘          └──────────────────────┘
        │                                       │
        └────────────┬──────────────────────────┘
                     │
        ┌────────────▼──────────────┐
        │   Docker Network          │
        │   root_default            │
        └───────────────────────────┘
```

## ✅ Pré-requisitos

Antes de começar, certifique-se de que:

- [ ] Mini PC Ubuntu 20.04+ rodando
- [ ] Docker 20.10+ instalado
- [ ] Docker Compose 2.0+ instalado
- [ ] Git instalado
- [ ] Usuário `greatprotect` com acesso a Docker
- [ ] Rede Docker `root_default` existente
- [ ] Caddy 2.8.4 rodando em portas 80/443
- [ ] Domínios DNS configurados:
  - `22cowork.pt` → IP público do Mini PC
  - `staging.22cowork.pt` → IP público do Mini PC
- [ ] Certificados SSL Let's Encrypt configurados

## 🚀 Instalação Inicial

### 1. Executar Script de Instalação

```bash
# No Mini PC, como usuário 'greatprotect'
cd /tmp
curl -O https://raw.githubusercontent.com/22cowork/22cowork-website/main/install-minipc.sh
bash install-minipc.sh
```

**O que o script faz:**

✓ Cria estrutura de diretórios em `/opt/22cowork/website/`  
✓ Clona repositório GitHub  
✓ Constrói imagem Docker  
✓ Inicia container de produção  
✓ Verifica health check  
✓ Gera arquivos de configuração  

### 2. Estrutura Criada

```
/opt/22cowork/website/
├── app/                 # Código-fonte (git clone)
├── config/              # Configurações (docker-compose, overrides)
├── backups/             # Backups automáticos
└── logs/                # Logs dos containers
```

## 🔧 Configuração Caddy

### 1. Editar Caddyfile

```bash
sudo nano /root/Caddyfile
```

### 2. Adicionar Bloco 22Cowork

Copie o conteúdo de `/opt/22cowork/website/app/CADDYFILE_BLOCK.txt` e adicione ao final do Caddyfile:

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
    
    # Compression
    encode gzip
    
    # Cache control
    @static {
        path /assets/*
    }
    header @static Cache-Control "public, max-age=31536000"
}

# 22Cowork Website - Staging
staging.22cowork.pt {
    reverse_proxy 22cowork-website-staging:8081 {
        header_uri -X-Forwarded-For
        header_uri -X-Forwarded-Proto
    }
    
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
```

## 🤖 GitHub Actions Runner

### 1. Gerar Token de Acesso Pessoal

1. Ir para https://github.com/settings/tokens
2. Clicar "Generate new token (classic)"
3. Selecionar escopos: `repo`, `workflow`, `admin:org_hook`
4. Copiar token (vai ser usado uma única vez)

### 2. Configurar Runner

```bash
# No Mini PC
cd /opt/22cowork/website/config
bash runner-setup.sh <GITHUB_TOKEN> minipc-prod
```

### 3. Verificar Status

```bash
# Listar runners
curl -H "Authorization: token <GITHUB_TOKEN>" \
  https://api.github.com/repos/22cowork/22cowork-website/actions/runners

# Ver logs do runner
sudo journalctl -u actions.runner.* -f
```

## 📊 Operações Diárias

### Ver Status dos Containers

```bash
docker ps | grep 22cowork
```

### Ver Logs

```bash
# Produção
docker logs -f 22cowork-website-prod

# Staging
docker logs -f 22cowork-website-staging

# Últimas 100 linhas
docker logs --tail 100 22cowork-website-prod
```

### Reiniciar Container

```bash
# Produção
docker-compose -f /opt/22cowork/website/app/docker-compose.yml restart 22cowork-website-prod

# Staging
docker-compose -f /opt/22cowork/website/app/docker-compose.yml restart 22cowork-website-staging
```

### Atualizar Código

```bash
cd /opt/22cowork/website/app
git pull origin main
docker-compose build 22cowork-website-prod
docker-compose up -d 22cowork-website-prod
```

### Atualizar Conteúdo

1. Editar `src/config/content.ts` no repositório
2. Fazer commit e push para `main`
3. GitHub Actions constrói e faz deploy automaticamente

## 🐛 Troubleshooting

### Container não inicia

```bash
# Ver erro
docker logs 22cowork-website-prod

# Verificar se porta está em uso
sudo netstat -tulpn | grep 8080

# Remover container antigo
docker-compose -f /opt/22cowork/website/app/docker-compose.yml down 22cowork-website-prod

# Reiniciar
docker-compose -f /opt/22cowork/website/app/docker-compose.yml up -d 22cowork-website-prod
```

### Health check falha

```bash
# Testar manualmente
docker exec 22cowork-website-prod wget --no-verbose --tries=1 --spider http://localhost:8080/

# Se falhar, ver logs
docker logs 22cowork-website-prod
```

### Caddy não consegue acessar container

```bash
# Verificar conectividade
docker exec caddy ping 22cowork-website-prod

# Verificar rede
docker network inspect root_default | grep 22cowork

# Se não estiver na rede, adicionar:
docker network connect root_default 22cowork-website-prod
```

### Site lento ou não responde

```bash
# Verificar recursos
docker stats 22cowork-website-prod

# Verificar espaço em disco
df -h /opt/22cowork/

# Limpar logs antigos
docker exec 22cowork-website-prod sh -c 'rm -rf /var/log/22cowork/*'
```

### Certificado SSL expirado

```bash
# Caddy renova automaticamente, mas se precisar forçar:
docker exec caddy caddy reload -c /etc/caddy/Caddyfile

# Verificar certificado
openssl s_client -connect 22cowork.pt:443 -servername 22cowork.pt
```

## 🔄 Rollback

### Rollback Manual

```bash
# Listar backups
ls -la /opt/22cowork/website/backups/

# Restaurar backup específico
BACKUP_NAME="backup-20240713-150000"
docker cp /opt/22cowork/website/backups/$BACKUP_NAME/. 22cowork-website-prod:/app/dist

# Reiniciar container
docker-compose -f /opt/22cowork/website/app/docker-compose.yml restart 22cowork-website-prod

# Verificar
curl -I https://22cowork.pt/
```

### Rollback Automático (GitHub Actions)

Se o health check falhar após deploy, o GitHub Actions:

1. Detecta falha
2. Restaura backup mais recente
3. Reinicia container
4. Verifica novamente
5. Notifica em caso de falha persistente

## 💾 Backups

### Backup Manual

```bash
# Criar backup
BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S)"
docker cp 22cowork-website-prod:/app/dist /opt/22cowork/website/backups/$BACKUP_NAME

# Comprimir
tar -czf /opt/22cowork/website/backups/$BACKUP_NAME.tar.gz /opt/22cowork/website/backups/$BACKUP_NAME
```

### Backup Automático

Backups são criados automaticamente antes de cada deploy via GitHub Actions.

Retenção: Últimos 10 backups (configurável em `.github/workflows/deploy.yml`)

### Restaurar Backup

```bash
# Listar backups
ls -la /opt/22cowork/website/backups/

# Restaurar
BACKUP_NAME="backup-20240713-150000"
docker cp /opt/22cowork/website/backups/$BACKUP_NAME/. 22cowork-website-prod:/app/dist
docker-compose -f /opt/22cowork/website/app/docker-compose.yml restart 22cowork-website-prod
```

## 📝 Monitoramento

### Health Check

```bash
# Testar endpoint
curl -I https://22cowork.pt/

# Verificar status do container
docker inspect --format='{{.State.Health.Status}}' 22cowork-website-prod

# Ver histórico de health checks
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' 22cowork-website-prod
```

### Métricas

```bash
# CPU e memória
docker stats 22cowork-website-prod

# Espaço em disco
du -sh /opt/22cowork/website/*

# Conexões
docker exec 22cowork-website-prod netstat -an | grep ESTABLISHED | wc -l
```

## 🔐 Segurança

### Verificar Permissões

```bash
# Arquivo Caddyfile
ls -la /root/Caddyfile

# Diretórios do projeto
ls -la /opt/22cowork/website/
```

### Atualizar Imagem Docker

```bash
# Verificar atualizações
docker pull 22cowork-website:latest

# Reconstruir
cd /opt/22cowork/website/app
docker build -t 22cowork-website:latest .

# Reimplantar
docker-compose up -d 22cowork-website-prod
```

## 📞 Suporte

Para problemas ou dúvidas:

1. Verificar logs: `docker logs 22cowork-website-prod`
2. Consultar troubleshooting acima
3. Contactar team@22cowork.pt

---

**Última atualização**: 13 de julho de 2026  
**Versão**: 1.0.0  
**Ambiente**: Mini PC Ubuntu 20.04+ com Docker
