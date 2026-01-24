# Squeleton

[![Version](https://img.shields.io/badge/version-4.1.6-blue.svg)](https://squeleton.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://squeleton.dev/#guia)
[![CSS Framework](https://img.shields.io/badge/framework-CSS-1572B6.svg)](https://squeleton.dev/)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E.svg)](https://squeleton.dev/)
[![HTMX](https://img.shields.io/badge/powered%20by-HTMX-3366CC.svg)](https://htmx.org/)
[![VanJS](https://img.shields.io/badge/reactive-VanJS-00ADD8.svg)](https://vanjs.org/)

Boilerplate leve e moderno que combina o melhor do CSS utilitário, grid responsivo, animações elegantes e bibliotecas JavaScript essenciais para criar interfaces rápidas, intuitivas e com manutenção simplificada.

## Características Principais

- **Hybrid-First**: Abordagem única - Grid mobile-first + Utilitários desktop-first
- **Grid Flexível**: 12 colunas com containers responsivos
- **Utilitários Completos**: Mais de 400 classes para espaçamento, grids, flex, design e layouts
- **Bibliotecas Vanilla**: 9 micro-bibliotecas integradas (HTMX, VanJS, Embla, VenoBox, a11y-dialog, Toastify, Wow2 Animation, Counter-Up2, js-cookie)
- **Animações Suaves**: 30+ efeitos com controle de exibição e repetição
- **Kit de Ícones**: 300+ ícones vetoriais customizados com IcoMoon
- **Performance**: Otimizado para 99+ no PageSpeed Insights
- **Zero Configuração**: Adicione via CDN e comece a usar imediatamente
- **IA-Ready**: Skill dedicada para desenvolvimento com Claude Code e outras IAs
- **Bricks Builder**: Conversor Squeleton2Bricks para integração com WordPress

## Documentação

- **[Documentação Web](https://squeleton.dev/)** - Guias interativos e exemplos
- **[Guias de Referência](squeleton-skill/SKILL.md)** - 15 guias detalhados para Skill sobre cada recurso
- **[Biblioteca de Ícones](https://squeleton.dev/icones/)** - Lista de ícones disponíveis
- **[Squeleton2Bricks](https://squeleton.dev/bricks/)** - Conversor de código Squeleton para JSON do Bricks Builder
- **[squeleton-skill.zip](https://github.com/HiperWP/squeleton/raw/refs/heads/main/skills/squeleton-skill.zip)** - Arquivo Skill em formato .zip para desenvolvimento com Claude Code e outras IAs

## Instalação Via CDN

```html
<!-- CSS (Head) -->
<link rel="stylesheet" href="https://cdn.squeleton.dev/squeleton.v4.min.css">

<!-- JavaScript (Head) -->
<script src="https://cdn.squeleton.dev/squeleton-main.v4.min.js"></script>

<!-- JavaScript (Footer) -->
<script src="https://cdn.squeleton.dev/squeleton-scripts.v4.min.js"></script>
```

### Arquivos para Download

- [squeleton.v4.css](https://cdn.squeleton.dev/squeleton.v4.css) – Versão completa para desenvolvimento (~35KB gzip)
- [squeleton.v4.min.css](https://cdn.squeleton.dev/squeleton.v4.min.css) – Versão minificada para produção (~25KB gzip)
- [squeleton-main.v4.min.js](https://cdn.squeleton.dev/squeleton-main.v4.min.js) – JavaScript principal (~12KB gzip)
- [squeleton-scripts.v4.min.js](https://cdn.squeleton.dev/squeleton-scripts.v4.min.js) – JavaScript secundário (~18KB gzip)

### Sistema Responsivo Híbrido

O Squeleton adota uma **abordagem híbrida única** que oferece o equilíbrio ideal de desenvolvimento entre duas técnicas:

**Grid (Colunas) → Mobile-First** (`min-width`)
- Comece com `c-xs-12` e expanda: `c-xs-12 c-md-6 c-lg-4`
- Grids naturalmente empilham em mobile e dividem em desktop
- Suporta 4 breakpoints: `xs-`, `sm-`, `md-`, `lg-`

**Classes Utilitárias → Desktop-First** (`max-width`)
- Escreva para desktop primeiro, ajuste para mobile: `p-60-tb xs-p-30-tb`
- Estilização direta no ambiente de desenvolvimento, com ajustes responsivos pontuais
- Suporta 3 breakpoints: `xs-`, `sm-`, `md-`

| Breakpoint | Grid (min-width) | Utilitários (max-width) |
|-----------|------------------|------------------------|
| Extra Small | `c-xs-` (base) | `xs-` (≤639px) |
| Small | `c-sm-` (≥640px) | `sm-` (≤991px) |
| Medium | `c-md-` (≥992px) | `md-` (≤1199px) |
| Large | `c-lg-` (≥1200px) | — (desktop é padrão) |

### Micro-bibliotecas JavaScript

Todas as bibliotecas estão integradas, pré-configuradas e otimizadas. Consulte a documentação específica de cada uma para casos de uso avançados.

| Biblioteca | Descrição |
|-----------|-----------|
| HTMX | Biblioteca que oferece acesso a AJAX, CSS Transitions, WebSockets e Server Sent Events diretamente no HTML usando atributos, permitindo interfaces modernas com a simplicidade do hypertext. |
| VanJS | O menor framework de interface de usuário reativo do mundo. Incrivelmente poderoso, absurdamente pequeno. |
| Embla Carousel | Biblioteca de carrossel minimalista com movimento fluido e precisão de swipe excepcional. |
| VenoBox 2 | Biblioteca JavaScript Lightbox para imagens, vídeos, galerias e iFrames. *Auto-inicializado* para `.open-gallery`, `.open-video`, `.open-iframe`. |
| a11y-dialog | Biblioteca leve e flexível para criação de janelas de diálogo intuitivas. *Scroll lock auto-inicializado* para `.modal-dialog`. |
| Toastify-js | Biblioteca JavaScript para mensagens de notificação aprimoradas. |
| Wow2 Animation | Fork otimizado próprio baseado no wow.js para animações on-scroll performáticas. *Auto-inicializado* para classe `.wow`. |
| Counter-Up2 | Biblioteca leve que conta até um número alvo quando o número se torna visível. |
| js-cookie | Biblioteca JavaScript simples e leve para gerenciamento de cookies do navegador. |

### Template HTML Básico

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Site - Squeleton</title>
    <link rel="stylesheet" href="https://cdn.squeleton.dev/squeleton.v4.min.css">
    <script src="https://cdn.squeleton.dev/squeleton-main.v4.min.js"></script>
</head>
<body>
    <section class="p-80-tb">          <!-- Section Flex -->
        <div class="container">        <!-- Container responsivo -->
            <div class="row">          <!-- Linha Flex -->
                <div class="c-xs-12 c-md-8">
                    Conteúdo Principal
                </div>
                <div class="c-xs-12 c-md-4">
                    Sidebar
                </div>
            </div>
        </div>
    </section>
    <script src="https://cdn.squeleton.dev/squeleton-scripts.v4.min.js"></script>
</body>
</html>
```

## Exemplos Básicos

**Grid de Cards** - Container + Row + Colunas responsivas:

```html
<section class="p-60-tb xs-p-30-tb">
    <div class="container">
        <h2 class="fs-12 fw-600 m-40-b">Recursos</h2>
        <div class="row gap-20 text-center">
            <div class="c-xs-12 c-md-6 c-lg-4">
                <div class="border-all border-rd-10 p-25-all h-100 wow fadeInUp">
                    <i class="iccon-rocket-1 fs-13 m-15-b d-block"></i>
                    <h3 class="fs-10 fw-600 m-10-b">Performance</h3>
                    <p class="fs-7">Otimizado para 99+ no PageSpeed</p>
                </div>
            </div>
            <div class="c-xs-12 c-md-6 c-lg-4">
                <div class="border-all border-rd-10 p-25-all h-100 wow fadeInUp">
                    <i class="iccon-layer-1 fs-13 m-15-b d-block"></i>
                    <h3 class="fs-10 fw-600 m-10-b">400+ Classes</h3>
                    <p class="fs-7">Grid, spacing, flexbox e mais</p>
                </div>
            </div>
            <div class="c-xs-12 c-md-6 c-lg-4">
                <div class="border-all border-rd-10 p-25-all h-100 wow fadeInUp">
                    <i class="iccon-speed-1 fs-13 m-15-b d-block"></i>
                    <h3 class="fs-10 fw-600 m-10-b">Zero Build</h3>
                    <p class="fs-7">CDN e pronto para usar</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Hero Section** - Tipografia fluida + Centralização + Animações:

```html
<section class="p-30-tb f-justify-center h-100vh">
  <div class="container">
    <div class="row gap-15">
      <div class="c-xs-12 c-sm-9 c-md-6 c-center">
        <div class="f-grid f-items-center f-justify-center">
          <i class="fs-12 iccon-rocket-1 p-15-r animated delay-800 floatIn"></i>
          <h1 class="fs-16 m-25-tb fw-700 animated slideIn">Squeleton</h1>
          <div class="fs-3 m-10-l p-5-lr border-rd-4 border-all animated magnetIn delay-800">v4.1.6</div>
        </div>
        <p class="fs-10 p-20-tb text-center animated delay-500 fadeInUp">Boilerplate leve e moderno que combina o melhor do CSS utilitário, grid responsivo, animações elegantes e bibliotecas JavaScript essenciais para criar interfaces rápidas e intuitivas.</p>
      </div>
    </div>
  </div>
</section>
```

**Footer** - Flexbox com distribuição:

```html
<footer class="p-30-tb border-t">
    <div class="container">
        <div class="d-flex f-justify-between f-items-center xs-f-col xs-f-gap-15">
            <p class="fs-6 opacity-7">© 2026 Meu Projeto</p>
            <div class="d-flex f-gap-20">
                <a href="#"><i class="iccon-instagram-1 fs-9"></i></a>
                <a href="#"><i class="iccon-linkedin-1 fs-9"></i></a>
                <a href="#"><i class="iccon-github-1 fs-9"></i></a>
            </div>
        </div>
    </div>
</footer>
```

## FAQ - Perguntas Frequentes

<details>
<summary><strong>Por que o Squeleton foi criado?</strong></summary>

O Squeleton nasceu da necessidade de simplificar o desenvolvimento web, evitando problemas comuns dos frameworks modernos: atualizações que quebram compatibilidade, necessidade de build constante, abandono de versões legadas e complexidade desnecessária. Focado em sites institucionais, landing pages e portais, prioriza manutenção simplificada, estabilidade de código e performance, usando apenas CSS e JavaScript Vanilla.

</details>

<details>
<summary><strong>Como o Squeleton se compara com outros Frameworks CSS?</strong></summary>

O Squeleton foi projetado como um **boilerplate** — uma base estrutural leve e pronta para uso — diferente dos frameworks CSS tradicionais que impõem padrões visuais. Ele não define cores, fontes ou componentes estilizados, fornecendo apenas a estrutura essencial e integrando bibliotecas JavaScript curadas de terceiros sem necessidade de build.

Ainda assim, devido à sua composição de grids, breakpoints e classes utilitárias únicas, o Squeleton também pode ser comparado tecnicamente com frameworks como Bootstrap, Tailwind, Bulma e Pico. [Consulte o estudo comparativo](docs/comparativo/README.md) que analisa tamanhos, funcionalidades e abordagens responsivas.

</details>

<details>
<summary><strong>Como personalizar a paleta de cores e família de fontes?</strong></summary>

O Squeleton é intencionalmente neutro. Crie uma folha de estilos separada com variáveis CSS customizadas no `:root`:

```css
:root {
	--text-color: #111;
	--bg-color: #fff;
	--font-family: 'Inter Tight', sans-serif;
}

body {
	color: var(--text-color);
	background-color: var(--bg-color);
	font-family: var(--font-family);
}
```

Esta separação garante que atualizações futuras não afetem suas personalizações.

</details>

<details>
<summary><strong>Como criar animações personalizadas?</strong></summary>

Siga o padrão das animações existentes:

```css
@keyframes minha-animacao {
    0% { opacity: 0; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1); }
}

.anima-personalizada {
    animation-name: minha-animacao;
    animation-duration: 0.5s;
    animation-fill-mode: both;
}
```

Use com WOW para ativar no scroll: `<div class="wow anima-personalizada">Conteúdo</div>`

</details>

<details>
<summary><strong>Por que não há sistema de build/compilação?</strong></summary>

Decisão deliberada baseada em simplicidade: todo o Squeleton (~55KB gzip) é menor que uma imagem JPG média. Arquivos unificados facilitam manutenção, otimizam cache em navegação multi-página e eliminam complexidade de ferramentas de build.

</details>

<details>
<summary><strong>Como descobrir todas as classes e possibilidades?</strong></summary>

Com mais de 400 classes utilitárias, a melhor forma é explorar:
- **Código-fonte**: Examine o [CSS não-minificado](https://cdn.squeleton.dev/squeleton.v4.css) para descobrir padrões
- **Documentações originais**: HTMX, a11y-dialog, Embla Carousel têm recursos avançados
- **Experimentação**: Classes foram projetadas para funcionar em conjunto

O Squeleton segue padrões intuitivos que facilitam a descoberta durante o uso.

</details>

<details>
<summary><strong>Posso usar o Squeleton com Claude Code, GPT Codex ou outras IAs?</strong></summary>

**Sim!** Foi desenvolvida uma **Skill** específica para desenvolvimento com IA chamada **squeleton-skill**.

### O que são Skills no contexto de IA?

Skills (ou "habilidades") são pacotes de conhecimento especializados que você pode adicionar a assistentes de IA como Claude Code, GitHub Copilot ou outros agentes de código. Funcionam como "plugins de conhecimento" que ensinam a IA sobre frameworks, bibliotecas ou padrões específicos do seu projeto.

### Por que usar a squeleton-skill?

Ao instalar esta skill, a IA ganha:
- **Conhecimento completo** das 400+ classes utilitárias do Squeleton
- **Referências detalhadas** de grid, espaçamento, flexbox, animações e ícones
- **Padrões de uso** e boas práticas específicas do framework
- **Integração com bibliotecas JS** (HTMX, VanJS, Embla, VenoBox, etc.)
- **Exemplos práticos** para hero sections, cards, modais, carrosséis e mais

### Como usar?

1. **Baixe a skill**: [squeleton-skill.zip](https://github.com/HiperWP/squeleton/raw/refs/heads/main/skills/squeleton-skill.zip)
2. **Instale no seu IDE** (Claude for VSCode, Cursor, Windsurf, etc.) seguindo a documentação da ferramenta
3. **Desenvolva com IA**: A IA agora conhece todo o Squeleton e priorizará suas classes e componentes ao invés de criar CSS e JS personalizado

Para mais detalhes sobre Skills, consulte a [documentação do Claude Agent SDK](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) ou do seu assistente de IA preferido.

</details>

<details>
<summary><strong>Como usar Squeleton no WordPress e manter a edição visual?</strong></summary>

Para essa finalidade foi desenvolvido o **[Squeleton2Bricks](https://squeleton.dev/bricks/)**, um conversor online que transforma HTML com classes Squeleton em JSON pronto para colar no Bricks Builder, o melhor editor de páginas do WordPress!

### Fluxo de trabalho

1. Crie seu layout com Squeleton (manualmente ou via IA com squeleton-skill)
2. Cole o código no conversor
3. Copie o JSON gerado e cole no Bricks Builder
4. Continue editando visualmente no WordPress

### Recursos do conversor

| Recurso | Descrição |
|---------|-----------|
| Conversão instantânea | Cole HTML e obtenha JSON imediatamente |
| Painel de camadas | Reordene e renomeie elementos com drag-and-drop |
| Sincronização tripla | Clique na pré-visualização para destacar no código |
| Edição de CSS | Botão direito nas camadas para editar estilos |
| Nomeação automática | Camadas nomeadas com base em classes e IDs |

</details>

## Licença

Este projeto está licenciado sob a Licença MIT, podendo ser usado tanto em projetos pessoais quanto comerciais. Você pode modificar, distribuir e usar o código livremente, inclusive em projetos pagos ou proprietários.

---

**Desenvolvido por HiperWP 🚀**
