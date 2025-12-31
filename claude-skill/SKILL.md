---
name: squeleton
description: Squeleton é um boilerplate CSS/JS leve e moderno para criação de interfaces web. Use este skill quando precisar criar layouts HTML responsivos, aplicar espaçamentos, trabalhar com flexbox, criar modais, carrosséis, animações ou usar qualquer recurso de interface nos projetos HiperWP/G4. O Squeleton já está integrado nos projetos - prefira usar suas classes utilitárias e bibliotecas integradas ao invés de criar CSS/JS novo sem necessidade.
---

# Squeleton

Boilerplate leve que combina CSS utilitário, grid responsivo de 12 colunas, animações e bibliotecas JavaScript essenciais. Filosofia: usar classes utilitárias existentes ao invés de criar estilos novos.

## Princípio Fundamental

**Sempre prefira classes do Squeleton a criar CSS/JS novo.** Se existe no Squeleton, use. O nome "esqueleto" reflete seu propósito: fornecer a estrutura base dos layouts sem opinar sobre cores ou tipografia.

## Breakpoints (Mobile-First)

| Prefixo | Nome | Dimensão |
|---------|------|----------|
| `xs-` | Extra Small | ≤ 639px |
| `sm-` | Small | ≥ 640px |
| `md-` | Medium | ≥ 992px |
| `lg-` | Large | ≥ 1200px |

**Importante**: Breakpoints são usados como **prefixo** nas classes utilitárias (`xs-p-20px-all`), exceto nas colunas onde são **sufixo** (`c-xs-12`).

## Grid System (12 Colunas)

```html
<div class="container">      <!-- max-width: 1250px, centralizado -->
    <div class="row">        <!-- display: flex, flex-wrap: wrap -->
        <div class="c-xs-12 c-md-8">Conteúdo</div>
        <div class="c-xs-12 c-md-4">Sidebar</div>
    </div>
</div>
```

### Colunas
- Padrão: `c-xs-{1-12}`, `c-sm-{1-12}`, `c-md-{1-12}`, `c-lg-{1-12}`
- Auto: `c-auto` (flex: 1 1 0%)
- Centralizar: `c-center` (margin: 0 auto)

### Containers
- `.container` - max-width: 1250px, centralizado
- `.container-fluid` - width: 100%

### Gaps (espaçamento entre colunas)
- Padrão: 15px (sem classe)
- `.gap-10` - 10px
- `.gap-5` - 5px  
- `.gap-0` - sem gap
- Responsivos: `xs-gap-5`, `sm-gap-10`

## Classes Utilitárias

### Padding (p-) e Margin (m-)
**Padrão**: `{p|m}-{valor}{unidade}-{direção}`

| Direção | Aplicação |
|---------|-----------|
| `-all` | Todos os lados |
| `-t` | Top |
| `-b` | Bottom |
| `-l` | Left |
| `-r` | Right |
| `-tb` | Top + Bottom |
| `-lr` | Left + Right |

**Valores em pixels**: 0, 5, 10, 15, 20, 25, 30... até 100 (intervalo de 5)
```html
<div class="p-20px-tb m-10px-lr">...</div>
<div class="xs-p-10px-all md-p-30px-all">Responsivo</div>
```

**Valores em percentual**: 1 até 25
```html
<div class="p-5-all m-2-tb">...</div>
```

### Width (w-) e Height (h-)
**Pixels**: 0-100 (de 5 em 5), depois 150, 200, 250... até 700 (de 50 em 50)
```html
<div class="w-200px h-150px">...</div>
```

**Percentual**: `w-{N}` onde N = 5, 10, 15... até 100
```html
<div class="w-50 xs-w-100">50% desktop, 100% mobile</div>
```

**Especiais**:
- `w-auto`, `h-auto`
- `h-100` (min-height: 100%)
- `h-100vh` (min-height: 100vh)
- `w-max-{400-900}px` (max-width)

### Display (d-)
```html
<div class="d-none">Oculto</div>
<div class="d-block">Block</div>
<div class="d-inline-block">Inline-block</div>
<div class="d-flex">Flex</div>
<div class="xs-d-none md-d-block">Oculto mobile, visível desktop</div>
```

### Flexbox (f-)
**Container**:
- `.f-grid` - display: flex + wrap + row (ideal para layouts)
- `.d-flex` - display: flex
- `.f-row`, `.f-col` - direção
- `.f-wrap`, `.f-nowrap` - quebra de linha

**Alinhamento**:
- `.f-items-center`, `.f-items-start`, `.f-items-end` - align-items
- `.f-justify-center`, `.f-justify-between`, `.f-justify-evenly` - justify-content
- `.f-self-center`, `.f-self-start`, `.f-self-end` - align-self individual

**Crescimento**:
- `.f-grow-1`, `.f-grow-2`, `.f-grow-3`
- `.f-shrink-0`, `.f-shrink-1`
- `.f-auto-max` (flex: 1 1 auto)
- `.f-auto-min` (flex: 0 1 auto)

**Gaps flex**: `.f-gap-{0-30}` (intervalo de 5)

```html
<!-- Centralizar conteúdo -->
<div class="d-flex f-items-center f-justify-center h-100vh">
    Centralizado
</div>

<!-- Header com logo e menu -->
<header class="d-flex f-items-center f-justify-between p-20px-tb">
    <div class="logo">Logo</div>
    <nav class="d-flex f-gap-20">...</nav>
</header>
```

### Border Radius
- `.border-rd-{1-20}` - 1px a 20px
- `.border-rd-50`, `.border-rd-100` - circular (50%)
- `.border-rd-{4|8|10}-t` - só cantos superiores
- `.border-rd-{4|8|10}-b` - só cantos inferiores

### Opacity
`.opacity-{1-9}` onde 1 = 0.15 e 9 = 0.9

### Tipografia
- `.font-wg-{300-900}` - font-weight
- `.letter-sp-{0-5}` - letter-spacing positivo
- `.letter-sp-minus-{025|05|1|2|3}` - letter-spacing negativo
- `.minus-{10-30}` - font-size menor (75-90%)
- `.more-{10-50}` - font-size maior (110-150%)
- `.text-left`, `.text-center`, `.text-right`
- `.text-uppercase`, `.text-lowercase`
- `.line-h-1e{0-9}` - line-height (1.0 a 1.9)

### Alertas
```html
<div class="alert-success">Sucesso</div>
<div class="alert-info">Informação</div>
<div class="alert-warning">Aviso</div>
<div class="alert-danger">Erro</div>
```

### Posicionamento
- `.ps-relative`, `.ps-absolute`, `.ps-fixed`, `.ps-sticky`
- `.z-index-{0-5}`, `.z-index-111`, `.z-index-1111`
- `.absolute-xy` - centraliza absoluto (transform translate -50%)

## Animações

### Com WOW (ativa ao entrar no viewport)
```html
<div class="wow fadeInUp">Anima ao scroll</div>
<div class="wow bounceIn" data-wow-delay="0.2s">Com delay</div>
<div class="wow pulse" data-wow-iteration="3">3 vezes</div>
```

### Com Animated (ativa imediatamente)
```html
<div class="animated fadeIn">Imediato</div>
<div class="animated pulse infinite">Loop infinito</div>
<div class="animated zoomIn delay-500 duration-2000">Com delay e duração</div>
```

**Animações disponíveis**: fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight, fadeOut, bounceIn, zoomIn, zoomOut, rotateIn, backInDown, backInLeft, backInRight, backInUp, flipIn, glowIn, slideIn, popIn, liquidIn, magnetIn, floatIn, waveIn, flash, pulse, shakeX, swing, tada

**Classes auxiliares**:
- `.delay-{100-5000}` (100, 200, 250, 300... 1000, 1250, 1500...)
- `.duration-{500-3000}`
- `.repeat-{2-5}`, `.infinite`
- `.reverse`, `.alternate`

**Animações contínuas prontas**: `.anima-pulse`, `.anima-shake`, `.anima-heart`, `.anima-skeleton`

## Bibliotecas JavaScript

O Squeleton integra 9 bibliotecas JavaScript otimizadas e pré-configuradas. Use-as conforme a documentação oficial de cada uma:

| Biblioteca | Finalidade | Documentação |
|------------|------------|--------------|
| **HTMX** | AJAX, transições, WebSockets via atributos HTML | htmx.org |
| **VanJS** | Framework reativo minimalista (1KB) | vanjs.org |
| **Embla Carousel** | Carrossel com swipe fluido | embla-carousel.com |
| **VenoBox 2** | Lightbox para imagens, vídeos, iframes | veno.es/venobox |
| **a11y-dialog** | Modais acessíveis | a11y-dialog.netlify.app |
| **Toastify** | Notificações toast | apvarun.github.io/toastify-js |
| **Balloon.css** | Tooltips em CSS puro | kazzkiq.github.io/balloon.css |
| **Counter-Up2** | Animação de contagem numérica | github.com/bfintal/Counter-Up2 |
| **js-cookie** | Gerenciamento de cookies | github.com/js-cookie/js-cookie |

### Adaptações do Squeleton

**a11y-dialog**: Os atributos originais `data-a11y-dialog-*` foram renomeados para `data-modal-*`:

| Original | Squeleton |
|----------|-----------|
| `data-a11y-dialog` | `data-modal` |
| `data-a11y-dialog-show` | `data-modal-show` |
| `data-a11y-dialog-hide` | `data-modal-hide` |

```html
<!-- Trigger -->
<a data-modal-show="meu-modal" href="#">Abrir</a>

<!-- Modal -->
<div data-modal="meu-modal" class="modal-dialog" aria-modal="true" role="dialog" aria-hidden="true" tabindex="-1">
    <div class="dialog-content">
        <div class="dialog-backdrop" data-modal-hide></div>
        <div class="dialog-inline w-max-500px">
            <button class="dialog-close" aria-label="Fechar" data-modal-hide></button>
            <div class="modal-popup bg-white border-rd-10 p-30px-all">
                Conteúdo...
            </div>
        </div>
    </div>
</div>
```

## Ícones

Prefixo: `iccon-{nome}-{variante}`

```html
<span class="iccon-home-1"></span>
<span class="iccon-user-2"></span>
```

Consulte `references/icons-reference.md` para a lista completa organizada por categoria.

## Exemplos Práticos

### Layout de Página
```html
<header class="p-20px-tb">
    <div class="container">
        <div class="row f-items-center f-justify-between">
            <div class="logo">Logo</div>
            <nav class="d-flex f-gap-20 xs-d-none md-d-flex">
                <a href="#">Link</a>
            </nav>
        </div>
    </div>
</header>

<main class="p-60px-tb xs-p-30px-tb">
    <div class="container">
        <div class="row">
            <div class="c-xs-12 c-lg-8">Conteúdo</div>
            <div class="c-xs-12 c-lg-4 xs-p-30px-t lg-p-0-t">Sidebar</div>
        </div>
    </div>
</main>
```

### Card Responsivo
```html
<div class="row gap-10">
    <div class="c-xs-12 c-sm-6 c-md-4 m-20px-b">
        <div class="border-all border-rd-8 p-20px-all h-100">
            <h4 class="m-10px-b">Título</h4>
            <p class="opacity-7">Descrição...</p>
        </div>
    </div>
</div>
```

### Grid de Cards com Flex
```html
<div class="f-grid f-gap-15">
    <div class="f-basis-0 f-grow-1">Card 1</div>
    <div class="f-basis-0 f-grow-1">Card 2</div>
    <div class="f-basis-0 f-grow-1">Card 3</div>
</div>
```

## Regras Importantes

1. **Sempre comece mobile-first**: Use `c-xs-12` como base e adicione breakpoints maiores
2. **Não crie CSS para o que já existe**: Verifique se há classe utilitária antes de escrever CSS
3. **Combine classes livremente**: `class="p-20px-tb m-10px-b border-rd-8 d-flex f-items-center"`
4. **Use breakpoints consistentemente**: `xs-` (mobile), `sm-` (tablet), `md-` (desktop), `lg-` (large desktop)
5. **Squeleton é agnóstico a cores**: Defina cores no CSS do projeto, não espere do Squeleton

## Arquivos de Referência

Para lista completa de todas as classes disponíveis, consulte os arquivos em `references/`:

- `grid-reference.md` - Sistema de grid de 12 colunas
- `display-reference.md` - Classes de display, overflow e position
- `flex-reference.md` - Flexbox completo
- `padding-reference.md` - Todas as classes de padding
- `margin-reference.md` - Todas as classes de margin
- `width-reference.md` - Largura e max-width
- `height-reference.md` - Altura e min-height
- `typography-reference.md` - Tipografia e texto
- `border-reference.md` - Bordas, radius, opacity e z-index
- `utilities-reference.md` - Position, visibility, float, background
- `animations-reference.md` - Animações WOW e Animated
- `icons-reference.md` - Todos os ícones organizados por categoria
- `modal-reference.md` - Modal (a11y-dialog)
- `carousel-reference.md` - Carrossel (Embla)
- `venobox-reference.md` - Lightbox (VenoBox)
- `tooltips-reference.md` - Tooltips (Balloon.css)
