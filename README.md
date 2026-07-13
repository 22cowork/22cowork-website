# 22Cowork Website - Astro

Website oficial de 22Cowork, o espaço de trabalho mais inteligente da Europa.

Construído com **Astro**, **TypeScript**, **Tailwind CSS** e **Framer Motion**.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm ou pnpm

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Visite `http://localhost:3000` para ver o site em desenvolvimento.

### Build

```bash
npm run build
```

Gera um build otimizado em `dist/`.

### Preview

```bash
npm run preview
```

Visualiza o build de produção localmente.

## 📁 Estrutura do Projeto

```
src/
├── pages/              # Páginas Astro (file-based routing)
│   ├── index.astro    # Home
│   ├── space.astro    # O Espaço
│   ├── intelligence.astro
│   ├── memberships.astro
│   ├── community.astro
│   └── book.astro     # Agendar Visita
├── components/         # Componentes Astro e React
│   ├── Navigation.astro
│   ├── Footer.astro
│   ├── RevealSection.jsx  # React (animações)
│   ├── BookForm.jsx       # React (formulário)
│   ├── YouTubeEmbed.jsx   # React (vídeo)
│   └── PhotoGallery.jsx   # React (galeria)
├── layouts/           # Layouts Astro
│   └── Layout.astro   # Layout principal
├── config/            # Configuração
│   ├── content.ts     # Conteúdo de todas as páginas
│   ├── colors.ts      # Design tokens
│   └── constants.ts   # Constantes
├── assets/            # Imagens e recursos
└── styles/            # CSS global
```

## 🎨 Design System

### Cores

- **Background**: `oklch(0.05 0 0)` (Preto profundo)
- **Foreground**: `oklch(0.97 0 0)` (Branco)
- **Primary**: `oklch(0.94 0.21 112)` (Acid Lime)
- **Card**: `oklch(0.09 0 0)` (Cinzento escuro)

### Tipografia

- **Display**: Space Grotesk (títulos)
- **Body**: Inter (corpo)
- **Mono**: JetBrains Mono (código)

## 📝 Conteúdo

Todo o conteúdo do website está centralizado em `src/config/content.ts`. Para atualizar:

1. Edite `src/config/content.ts`
2. As mudanças aparecem automaticamente no site

## 🎬 Adicionar Vídeo YouTube

No componente `YouTubeEmbed.jsx`, configure o `videoId`:

```jsx
<YouTubeEmbed videoId="dQw4w9WgXcQ" title="Tour 22Cowork" client:load />
```

## 📸 Adicionar Galeria de Fotos

No componente `PhotoGallery.jsx`, passe um array de fotos:

```jsx
const photos = [
  { src: '/assets/photo1.jpg', alt: 'Descrição' },
  { src: '/assets/photo2.jpg', alt: 'Descrição' },
];

<PhotoGallery photos={photos} client:load />
```

## 🔧 Configuração Tailwind

Veja `tailwind.config.mjs` para customizar:

- Cores
- Tipografia
- Espaçamento
- Breakpoints

## 📦 Dependências Principais

- **astro**: Framework estático
- **react**: Para componentes interativos
- **framer-motion**: Animações
- **tailwindcss**: Styling
- **typescript**: Type safety

## 🚢 Deploy

### Docker

```bash
docker build -t 22cowork-website .
docker run -p 80:80 22cowork-website
```

### Vercel

```bash
vercel deploy
```

### Netlify

```bash
netlify deploy --prod --dir=dist
```

## 📋 Checklist de Desenvolvimento

- [ ] Conteúdo atualizado em `src/config/content.ts`
- [ ] Imagens otimizadas em `src/assets/`
- [ ] Vídeo YouTube configurado
- [ ] Galeria de fotos adicionada
- [ ] Formulário de contacto testado
- [ ] Build sem erros: `npm run build`
- [ ] Preview local: `npm run preview`

## 🐛 Troubleshooting

### Build falha

```bash
rm -rf node_modules dist .astro
npm install
npm run build
```

### Estilos não aplicados

Verifique se `src/styles/global.css` está importado em `src/layouts/Layout.astro`.

### Componentes React não renderizam

Certifique-se de adicionar `client:load` ao componente Astro:

```astro
<RevealSection client:load>
  Conteúdo
</RevealSection>
```

## 📚 Recursos

- [Documentação Astro](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [React](https://react.dev)

## 📄 Licença

Propriedade de 22Cowork. Todos os direitos reservados.
