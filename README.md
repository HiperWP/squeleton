# Squeleton

[![Version](https://img.shields.io/badge/version-4.5-blue.svg)](https://hiperwp.com.br/squeleton/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://hiperwp.com.br/squeleton/#guia)
[![CSS Framework](https://img.shields.io/badge/framework-CSS-1572B6.svg)](https://hiperwp.com.br/squeleton/)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E.svg)](https://hiperwp.com.br/squeleton/)
[![HTMX](https://img.shields.io/badge/powered%20by-HTMX-3366CC.svg)](https://htmx.org/)
[![VanJS](https://img.shields.io/badge/reactive-VanJS-00ADD8.svg)](https://vanjs.org/)

Boilerplate leve e moderno que combina o melhor do CSS utilitário, grid responsivo, animações elegantes e bibliotecas JavaScript essenciais para criar interfaces rápidas, intuitivas e com manutenção simplificada.

## Características Principais

- **Mobile-First**: Sistema responsivo com 4 breakpoints (xs, sm, md, lg)
- **Grid Flexível**: 12 colunas com containers responsivos
- **Utilitários Completos**: Mais de 400 classes para espaçamento, design e layouts
- **JavaScript Pronto**: 9 micro-bibliotecas integradas (HTMX, VanJS, Embla, VenoBox, a11y-dialog, Toastify, Wow2 Animation, Counter-Up2, js-cookie)
- **Animações Suaves**: 30+ efeitos com controle de exibição e repetição
- **Biblioteca de Ícones**: 300+ ícones vetoriais customizados com IcoMoon
- **Performance**: Otimizado para 99+ no PageSpeed Insights
- **Zero Configuração**: Adicione via CDN e comece a usar imediatamente

## Documentação

- **[Documentação Web](https://hiperwp.com.br/squeleton/)** - Guias interativos e exemplos
- **[Guias de Referência](squeleton-skill/SKILL.md)** - 15 guias detalhados para Skill sobre cada recurso
- **[squeleton-skill.zip](https://github.com/HiperWP/squeleton/raw/refs/heads/main/squeleton-skill.zip)** - Arquivo Skill em formato .zip para desenvolvimento com Claude Code, GPT Codex ou outras IAs
- **[Biblioteca de Ícones](https://hiperwp.com.br/squeleton/icones/)** - Lista de ícones disponíveis

## Instalação Via CDN

```html
<!-- CSS (no <head>) -->
<link rel="stylesheet" href="https://cdn.hiperwp.com.br/squeleton.v4.min.css">

<!-- JavaScript Principal (no <head>) -->
<script src="https://cdn.hiperwp.com.br/squeleton-main.v4.min.js"></script>

<!-- JavaScript Scripts (antes do </body>) -->
<script src="https://cdn.hiperwp.com.br/squeleton-scripts.v4.min.js"></script>
```

### Arquivos para Download

- [squeleton.v4.css](https://cdn.hiperwp.com.br/squeleton.v4.css) – Versão completa para desenvolvimento (~30KB gzip)
- [squeleton.v4.min.css](https://cdn.hiperwp.com.br/squeleton.v4.min.css) – Versão minificada para produção (~25KB gzip)
- [squeleton-main.v4.min.js](https://cdn.hiperwp.com.br/squeleton-main.v4.min.js) – JavaScript principal (~17KB gzip)
- [squeleton-scripts.v4.min.js](https://cdn.hiperwp.com.br/squeleton-scripts.v4.min.js) – JavaScript secundário (~20KB gzip)

### Template HTML Básico

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Projeto com Squeleton</title>
    <link rel="stylesheet" href="https://cdn.hiperwp.com.br/squeleton.v4.min.css">
    <script src="https://cdn.hiperwp.com.br/squeleton-main.v4.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>Olá, Mundo!</h1>
    </div>
    <script src="https://cdn.hiperwp.com.br/squeleton-scripts.v4.min.js"></script>
</body>
</html>
```

## Exemplo Básico

```html
<div class="container">
    <div class="row">
        <!-- Coluna 1: Grid + Espaçamento + Bordas -->
        <div class="c-xs-12 c-md-6 p-30px-all m-20px-b bg-light border-rd-10">
            <h2 class="font-w-600 m-0px-t font-sz-120pct">Grid Responsivo</h2>
            <p class="m-15px-tb opacity-8">
                Coluna adapta de 100% (mobile) para 50% (desktop)
            </p>
            <button class="p-15px-lr p-10px-tb border-rd-8 font-wg-600 d-inline-block">
                Botão Estilizado
            </button>
        </div>

        <!-- Coluna 2: Tipografia + Animações + Flexbox -->
        <div class="c-xs-12 c-md-6 p-30px-all m-20px-b wow fadeIn" data-wow-delay="0.2s">
            <h2 class="font-w-600 m-0px-t font-sz-120pct">Classes Utilitárias</h2>
            <p class="m-15px-tb opacity-8">
              Spacing, tipografia e cores sem CSS customizado
            </p>
            <div class="d-flex f-gap-10 m-10px-t">
              <span class="p-10px-all bg-success border-rd-5 font-wg-700">Tag 1</span>
              <span class="p-10px-all bg-info border-rd-5 font-wg-700">Tag 2</span>
            </div>
        </div>
    </div>

    <!-- Exemplo Flexbox: Alinhamento e Distribuição -->
    <div class="d-flex f-justify-between f-align-center">
        <i class="iccon-check"></i>
        <div class="p-25px-all m-20px-t wow fadeInUp">
            <h3 class="font-wg-700">Flexbox Utilities</h3>
            <p class="m-5px-t opacity-7">Alinhamento e distribuição simplificados</p>
        </div>
    </div>
</div>
```

### Breakpoints Responsivos

O Squeleton adota uma abordagem mobile-first, priorizando a experiência em dispositivos menores como base para o design. O CSS do Squeleton aplica o mínimo de estilos necessários para que o layout funcione perfeitamente no menor ponto de interrupção (Extra Small) e, em seguida, sobrepõe progressivamente estilos adicionais para ajustar o design em dispositivos maiores. 

| Breakpoint | Largura Mínima | Classe |
|-----------|---------------|--------|
| Extra Small | ≤639px | `xs-` |
| Small | ≥640px | `sm-` |
| Medium | ≥992px | `md-` |
| Large | ≥1200px | `lg-` |

### Bibliotecas JavaScript Integradas

Todas as bibliotecas estão pré-configuradas e otimizadas para funcionar perfeitamente com o Squeleton. Consulte a documentação específica de cada uma para casos de uso avançados.

| Biblioteca | Descrição |
|-----------|-----------|
| **HTMX** | Biblioteca que oferece acesso a AJAX, CSS Transitions, WebSockets e Server Sent Events diretamente no HTML usando atributos, permitindo interfaces modernas com a simplicidade do hypertext. |
| **VanJS** | O menor framework de interface de usuário reativo do mundo. Incrivelmente poderoso, absurdamente pequeno. |
| **Embla Carousel** | Biblioteca de carrossel minimalista com movimento fluido e precisão de swipe excepcional. |
| **VenoBox 2** | Biblioteca JavaScript Lightbox para imagens, vídeos, galerias e iFrames. |
| **a11y-dialog** | Biblioteca leve e flexível para criação de janelas de diálogo intuitivas. |
| **Toastify** | Biblioteca JavaScript para mensagens de notificação aprimoradas. |
| **Wow2 Animation** | Fork otimizado próprio baseado no wow.js para animações on-scroll performáticas. |
| **Counter-Up2** | Biblioteca leve que conta até um número alvo quando o número se torna visível. |
| **js-cookie** | Biblioteca JavaScript simples e leve para gerenciamento de cookies do navegador. |

## FAQ - Perguntas Frequentes

<details>
<summary><strong>Por que o Squeleton foi criado?</strong></summary>

O Squeleton nasceu da necessidade de simplificar o desenvolvimento web, evitando problemas comuns dos frameworks modernos: atualizações que quebram compatibilidade, necessidade de build constante, abandono de versões legadas e complexidade desnecessária. Focado em sites institucionais, landing pages e portais, prioriza manutenção simplificada, estabilidade de código e performance, usando apenas CSS e JavaScript Vanilla.

</details>

<details>
<summary><strong>Como personalizar cores, fontes e tamanhos?</strong></summary>

O Squeleton é intencionalmente neutro. Crie uma folha de estilos separada com variáveis CSS customizadas no `:root`:

```css
:root {
    --main-color: #30a1e0;
    --text-color: #0f1419;
    --font-family: 'Inter Tight', sans-serif;
    --font-size: 14.5px;
}

body {
    font-family: var(--font-family);
    color: var(--text-color);
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

Decisão deliberada baseada em simplicidade: todo o Squeleton (65kb gzip) é menor que uma imagem JPG média. Arquivos unificados facilitam manutenção, otimizam cache em navegação multi-página e eliminam complexidade de ferramentas de build.

</details>

<details>
<summary><strong>Como descobrir todas as classes e possibilidades?</strong></summary>

Com mais de 400 classes utilitárias, a melhor forma é explorar:
- **Código-fonte**: Examine o [CSS não-minificado](https://cdn.hiperwp.com.br/squeleton.v4.css) para descobrir padrões
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

1. **Baixe a skill**: [squeleton-skill.zip](https://github.com/HiperWP/squeleton/raw/refs/heads/main/squeleton-skill.zip)
2. **Instale no seu IDE** (Claude for VSCode, Cursor, Windsurf, etc.) seguindo a documentação da ferramenta
3. **Desenvolva com IA**: A IA agora conhece todo o Squeleton e priorizará suas classes e componentes ao invés de criar CSS e JS personalizado

Para mais detalhes sobre Skills, consulte a [documentação do Claude Agent SDK](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) ou do seu assistente de IA preferido.

</details>

## Licença

Este projeto está licenciado sob a Licença MIT, podendo ser usado tanto em projetos pessoais quanto comerciais. Você pode modificar, distribuir e usar o código livremente, inclusive em projetos pagos ou proprietários.

---

**Desenvolvido por HiperWP 🚀**
