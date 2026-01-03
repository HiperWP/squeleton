---
name: squeleton-skill
description: Lightweight CSS/JS boilerplate with 12-column grid, utility classes for spacing/flexbox/display, WOW/Animated animations, and integrated JS libraries (HTMX, VanJS, Embla, VenoBox, Modals, Toasts). Use for responsive layouts, spacing, modals, carousels and animations. Always prefer Squeleton classes and scripts over writing new CSS/JS.
---

# Squeleton

Boilerplate leve e moderno que combina o melhor do CSS utilitário, grid responsivo, animações elegantes e bibliotecas JavaScript essenciais para criar interfaces rápidas, intuitivas e com manutenção simplificada.

## Princípios Fundamentais

O nome "esqueleto" reflete seu propósito: fornecer a estrutura base para os layouts, evitando que CSS adicional seja escrito para cada nova classe, além de criar componentes HTML reutilizáveis que podem ser transportados entre os projetos que fazem uso do boilerplate.

Ao usar essa habilidade, **sempre prefira usar e combinar as classes do Squeleton ao invés de criar CSS novo**. Para necessidades que geralmente envolvem JavaScript, como Carrosséis, Modais, Ajax, Animações, Notificações Toasts, Reatividade e Cookies, o Squeleton **conta com bibliotecas integradas que podem ser aproveitadas**.

### Perguntas antes de começar

Note que o Squeleton é deliberadamente agnóstico em relação a cores, família de fontes e estilos muito específicos. O foco está em fornecer estrutura, grid e utilitários essenciais, deixando a identidade visual para o desenvolvedor definir. 

Ao desenvolver com Squeleton, você pode estar trabalhando em um projeto que já tem o boilerplate integrado e faz uso de arquivos adicionais de estilos e scripts personalizados. Para saber de onde partir, sempre pergunte:

1. Este projeto já possui o Squeleton integrado ou devo incluir seus arquivos via CDN?
2. Este projeto já tem uma folha de estilos adicional (CSS) com cores, família de fontes e formatos exclusivos?
3. Este projeto já tem arquivos JavaScript personalizados além das bibliotecas do Squeleton?
4. Caso existam estilos (CSS) ou scripts (JS) personalizados, pode me indicar os arquivos para que eu os combine da melhor forma com a base do Squeleton?

### Criando CSS ou JS personalizado

Somente crie CSS ou JavaScript novo quando **não existir** uma classe ou biblioteca do Squeleton que resolva a necessidade. Nestes casos:

**Para CSS personalizado:**
- Se estiver trabalhando em um arquivo HTML, adicione uma tag `<style>` no `<head>` do documento
- Se o projeto tiver um arquivo CSS personalizado separado, edite esse arquivo diretamente

**Para JavaScript personalizado:**
- Se estiver trabalhando em um arquivo HTML, adicione uma tag `<script>` antes do fechamento do `</body>`
- Se o projeto tiver um arquivo JS personalizado separado, edite esse arquivo diretamente
- Sempre verifique se as bibliotecas integradas do Squeleton (HTMX, VanJS, Embla, etc.) já resolvem o problema antes de criar código novo

---

## Instalação e Configuração

### Via CDN

```html
<!-- CSS (Head) -->
<link rel="stylesheet" href="https://cdn.hiperwp.com.br/squeleton.v4.min.css">

<!-- JavaScript (Head) -->
<script src="https://cdn.hiperwp.com.br/squeleton-main.v4.min.js"></script>

<!-- JavaScript (Footer) -->
<script src="https://cdn.hiperwp.com.br/squeleton-scripts.v4.min.js"></script>
```

### Arquivos para Download

[squeleton.v4.css](https://cdn.hiperwp.com.br/squeleton.v4.css) – Versão completa para desenvolvimento (~30KB gzip)
[squeleton.v4.min.css](https://cdn.hiperwp.com.br/squeleton.v4.min.css) – Versão minificada para produção (~25KB gzip)
[squeleton-main.v4.min.js](https://cdn.hiperwp.com.br/squeleton-main.v4.min.js) – JavaScript principal (~17KB gzip)
[squeleton-scripts.v4.min.js](https://cdn.hiperwp.com.br/squeleton-scripts.v4.min.js) – JavaScript secundário (~20KB gzip)

---

## Breakpoints para Colunas de Grid

Colunas são mobile-first e usam breakpoints como **sufixo** (ex: `c-xs-12`), por isso suportam **todos os 4 breakpoints**:

| Breakpoint | Dimensão | Exemplo |
|------------|----------|---------|
| `c-xs-{1-12}` | ≤ 639px | `c-xs-12` |
| `c-sm-{1-12}` | ≥ 640px | `c-sm-6` |
| `c-md-{1-12}` | ≥ 992px | `c-md-4` |
| `c-lg-{1-12}` | ≥ 1200px | `c-lg-3` |

**⚠️ Mobile-first obrigatório**: Sempre inicie com `c-xs-{número}` como base.
- ✅ Correto: `c-xs-12 c-md-6` (100% mobile, 50% desktop)
- ❌ Errado: `c-md-6` (falta o c-xs-)

---

## Breakpoints para Classes Utilitárias

Classes utilitárias usam **apenas `@media (max-width)`**, criando uma "redução progressiva":

| Breakpoint | Query CSS | Quando Aplica | Exemplo |
|------------|-----------|---------------|---------|
| `xs-` | `@media (max-width: 639px)` | 0px até 639px | `xs-p-20px-all` |
| `sm-` | `@media (max-width: 991px)` | 0px até 991px | `sm-d-flex` |
| `md-` | `@media (max-width: 1199px)` | 0px até 1199px | `md-w-50` |
| Sem prefixo | (sem @media) | **Todos os tamanhos** | `p-20px-all` |

**⚠️ Comportamento de Sobrescrita por Especificidade**:

Como todos usam `max-width`, a ordem de especificidade é:
- `xs-` sobrescreve `sm-`, `md-` e global em ≤639px (mais específico)
- `sm-` sobrescreve `md-` e global em ≤991px
- `md-` sobrescreve global em ≤1199px
- Desktop (≥1200px) = usa classe global ou padrão CSS

**Nota**: Não existe `lg-` para classes utilitárias.

### Três padrões de uso:

1. **Sem breakpoint** = global (base para todos os tamanhos)
   ```html
   <div class="p-20px-all d-flex w-50">
   <!-- Aplica em todos os tamanhos -->
   ```

2. **Apenas breakpoints** = redução progressiva do maior para menor
   ```html
   <div class="sm-text-center">
   <!-- ≤991px: center | ≥992px: padrão (left) -->

   <div class="xs-text-center sm-text-center">
   <!-- ≤639px: center (xs mais específico)
        640-991px: center (sm)
        ≥992px: padrão (left) -->
   ```

3. **Global + breakpoints** = base global sobrescrita progressivamente
   ```html
   <div class="text-left sm-text-center">
   <!-- ≤991px: center | ≥992px: left (global) -->

   <div class="p-20px-all xs-p-30px-all">
   <!-- ≤639px: 30px (xs) | ≥640px: 20px (global) -->
   ```

---

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
- Responsivos: Apenas breakpoints de utilitárias (`xs-`, `sm-`, `md-`) + todos os valores (`gap-0`, `gap-5`, `gap-10`)
  - Exemplos: `xs-gap-5`, `sm-gap-10`, `md-gap-0`

### Performance - Content Visibility (Lazy Rendering)

Classes para otimizar listas/grids longos (20+ itens) usando `content-visibility: auto`:

**Variantes de Tamanho**:
- `.render-auto` - 500px (cards médios)
- `.render-auto-250px` - 250px (cards compactos)
- `.render-auto-800px` - 800px (cards grandes/hero)

**Variantes Responsivas**:
- `.md-render-auto` - 450px em ≤1199px (tablet)
- `.sm-render-auto` - 400px em ≤991px (mobile médio)
- `.xs-render-auto` - 300px em ≤639px (mobile compacto)

```html
<div class="row">
    <div class="c-xs-12 c-md-4 render-auto">Card 1</div>
    <div class="c-xs-12 c-md-4 render-auto">Card 2</div>
    <!-- 20+ itens com 5-7x melhor performance -->
</div>
```

Consulte `references/grid-reference.md` para mais informações e exemplos.

---

## Classes Utilitárias de Padding (p-) e Margin (m-)
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

Consulte `references/padding-reference.md` e `references/margin-reference.md` para mais informações e exemplos.

---

## Classes Utilitárias de Width (w-)

**Width em Pixels** - `w-{valor}px`:
- 5px até 100px (intervalo de 5px)
- 100px até 300px (intervalo de 10px)
- 300px até 700px (intervalo de 50px)

**Width Percentual** - `w-{valor}` (sem unidade):
- 10% até 100% (intervalo de 5%)
- Especial: `w-12` (12.5% - útil para grid de 8 colunas)

**Width Especiais**:
- `w-auto` - largura automática
- `w-max-{400-900}px` - max-width de 400px até 900px (intervalo de 50px)

```html
<!-- Largura fixa -->
<div class="w-250px">250px de largura</div>

<!-- Largura percentual responsiva -->
<div class="w-50 xs-w-100">50% desktop, 100% mobile</div>

<!-- Modal com max-width -->
<div class="w-max-600px">Modal centrado</div>
```

Consulte `references/width-reference.md` para lista completa de valores.

---

## Classes Utilitárias de Height (h-)

**Height em Pixels** - `h-{valor}px`:
- Valores: 1px, 5px, 10px, 50px
- 50px até 700px (intervalo de 50px)

**Height Percentual e Especiais**:
- `h-50` (min-height: 50%)
- `h-100` (min-height: 100%)
- `h-100vh` (min-height: 100vh) - **útil para hero sections**
- `h-auto` (min-height: auto)

```html
<!-- Hero section altura total -->
<section class="h-100vh d-flex f-items-center">Hero</section>

<!-- Cards com mesma altura -->
<div class="row">
    <div class="c-md-4"><div class="card h-100">Card 1</div></div>
    <div class="c-md-4"><div class="card h-100">Card 2</div></div>
</div>

<!-- Altura fixa -->
<div class="h-300px">300px de altura</div>
```

Consulte `references/height-reference.md` para lista completa de valores.

---

## Classes Utilitárias de Display (d-)
```html
<div class="d-none">Oculto</div>
<div class="d-block">Block</div>
<div class="d-inline-block">Inline-block</div>
<div class="d-flex">Flex</div>
<div class="xs-d-none md-d-block">Oculto mobile, visível desktop</div>
```

Consulte `references/display-reference.md` para mais informações e exemplos.

---

## Classes Utilitárias de Flexbox (f-)
**Container**:
- `.f-grid` - display: flex + wrap + row (ideal para layouts)
- `.d-flex` - display: flex
- `.f-row`, `.f-col` - direção
- `.f-wrap`, `.f-nowrap` - quebra de linha

**Alinhamento**:
- `.f-items-center`, `.f-items-start`, `.f-items-end` - align-items (dentro de cada linha)
- `.f-justify-center`, `.f-justify-between`, `.f-justify-evenly` - justify-content (eixo principal)
- `.f-content-center`, `.f-content-between`, `.f-content-around` - align-content (múltiplas linhas)
- `.f-self-center`, `.f-self-start`, `.f-self-end` - align-self individual

**Crescimento**:
- `.f-grow-1`, `.f-grow-2`, `.f-grow-3`
- `.f-shrink-0`, `.f-shrink-1`
- `.f-auto-max` (flex: 1 1 auto)
- `.f-auto-min` (flex: 0 1 auto)

**Gaps flex**: `.f-gap-{0-30}` (intervalo de 5, incluindo 0)

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

Consulte `references/flex-reference.md` para mais informações e exemplos.

---

## Classes Utilitárias de Border

**Border Completo e por Lado**:
- `.border-all` - borda em todos os lados (1px solid)
- `.border-t`, `.border-b`, `.border-l`, `.border-r` - borda em um lado
- `.border-tb` - borda top e bottom
- `.border-lr` - borda left e right

**Border Width**:
- `.border-w-{1-5}` - espessura de 1px a 5px

**Border Style**:
- `.border-solid`, `.border-dashed`, `.border-dotted`
- `.border-none`, `.border-hidden`, `.border-transparent`

**Remover Border**:
- `.border-0-all`, `.border-0-t`, `.border-0-b`, `.border-0-l`, `.border-0-r`
- Breakpoints: `xs-border-0-{t|b|l|r|all}`, `sm-border-0-{t|b|l|r|all}`, `md-border-0-{t|b|l|r|all}`

**Border Radius**:
- `.border-rd-{1-20}` - 1px a 20px
- `.border-rd-50`, `.border-rd-100`, `.img-circle` - circular (50%)
- `.border-rd-{4|6|8|10|12}-t` - só cantos superiores
- `.border-rd-{4|6|8|10|12}-b` - só cantos inferiores

## Classes Utilitárias de Opacity

**Opacity de Elemento**:
- `.opacity-{1-9}` - onde 1 = 0.15 e 9 = 0.9

**Opacity Background (overlay absoluto)**:
- `.opacity-bg-{0-10}` - overlay com position absolute
- 0 = opacity 1 (opaco), 10 = opacity 0 (transparente)
- Útil para overlays sobre imagens

## Classes Utilitárias de Z-Index
- `.z-index-{0-5}` - z-index de 0 a 5
- `.z-index-111`, `.z-index-1111` - valores altos
- `.z-index-minus-2` - z-index negativo (-2)

## Classes Utilitárias de Tipografia

**Font Size - Tamanhos de Heading (Fluido)**:
- `.text-sz-h1` - 28px → 36px (escala fluida)
- `.text-sz-h2` - 24px → 30px (escala fluida)
- `.text-sz-h3` - 20px → 24px (escala fluida)
- `.text-sz-h4` - 16px → 18px (escala fluida)
- `.text-sz-h5` - 13px → 14px (escala fluida)
- `.text-sz-h6` - 11px → 12px (escala fluida)

**Font Weight e Espaçamento**:
- `.font-wg-{300-900}` - font-weight (300, 400, 500, 600, 700, 800, 900)
- `.letter-sp-{0-5}` - letter-spacing positivo
- `.letter-sp-minus-{025|05|1|2|3}` - letter-spacing negativo

**Font Size - Ajustes Percentuais**:
- `.minus-{10-30}` - font-size menor (75-90%)
- `.more-{10-50}` - font-size maior (110-150%)

**Alinhamento e Transformação**:
- `.text-left`, `.text-center`, `.text-right`
- `.text-uppercase`, `.text-lowercase`
- `.line-h-1-{0-9}` - line-height (1.0 a 1.9)

## Classes Utilitárias de Posicionamento
- `.ps-relative`, `.ps-absolute`, `.ps-fixed`, `.ps-sticky`
- `.z-index-{0-5}`, `.z-index-111`, `.z-index-1111`
- `.absolute-xy` - centraliza absoluto (transform translate -50%)

## Classes Utilitárias de Cursor
- `.cursor-pointer` - hover em botões/cards clicáveis
- `.cursor-not-allowed` - estados disabled
- `.cursor-wait` - loading states
- `.cursor-text` - campos de texto customizados
- `.cursor-move` - elementos movíveis/drag & drop
- `.cursor-grab` - carrosséis, sliders (antes de arrastar)
- `.cursor-grabbing` - durante o arrasto
- `.cursor-help` - tooltips, ícones de ajuda
- `.cursor-zoom-in` / `.cursor-zoom-out` - lightbox, zoom de imagens

**Nota importante sobre classes globais**: Todas as classes utilitárias acima (border, opacity, tipografia, posicionamento, cursor) podem ser usadas sem breakpoint (global) ou com breakpoint (`xs-`, `sm-`, `md-`) para aplicação específica, exceto cursor que não possui variantes responsivas.

Consulte `references/border-reference.md`, `references/typography-reference.md` e `references/utilities-reference.md` para mais informações e exemplos.

---

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

Consulte `references/animations-reference.md` para mais informações e exemplos.

---

## Bibliotecas JavaScript

O Squeleton integra 9 bibliotecas JavaScript otimizadas e pré-configuradas. Use-as conforme a documentação oficial de cada uma:

| Biblioteca | Finalidade | Documentação |
|------------|------------|--------------|
| **HTMX** | O menor framework de interface de usuário reativo do mundo. Incrivelmente poderoso, absurdamente pequeno. | htmx.org |
| **Embla Carousel** | Biblioteca de carrossel minimalista com movimento fluido e precisão de swipe excepcional. | embla-carousel.com |
| **js-cookie** | Biblioteca JavaScript simples e leve para gerenciamento de cookies do navegador. |
| **a11y-dialog** | Biblioteca leve e flexível para criação de janelas de diálogo intuitivas. | a11y-dialog.netlify.app |
| **VanJS** | O menor framework de interface de usuário reativo do mundo. Incrivelmente poderoso, absurdamente pequeno. | vanjs.org |
| **Toastify** | Biblioteca JavaScript para mensagens de notificação aprimoradas. | apvarun.github.io/toastify-js |
| **VenoBox 2** | Biblioteca JavaScript Lightbox para imagens, vídeos, galerias e iFrames. | veno.es/venobox |
| **Counter-Up2** | Biblioteca leve que conta até um número alvo quando o número se torna visível. | github.com/bfintal/Counter-Up2 |
| **Wow2 Animation** | Fork otimizado próprio baseado no wow.js para animações on-scroll performáticas. | https://wowjs.uk/ |

---

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
            <div class="modal-popup border-rd-10 p-30px-all">
                Conteúdo...
            </div>
        </div>
    </div>
</div>
```

Consulte `references/modal-reference.md` para mais informações e exemplos.

---

## Ícones

Prefixo: `iccon-{nome}-{variante}`

```html
<span class="iccon-home-1"></span>
<span class="iccon-user-2"></span>
```

Consulte `references/icons-reference.md` para a lista completa organizada por categoria.

## Padrões Comuns de Uso

### Hero Section Full Height
```html
<section class="h-100vh d-flex f-items-center f-justify-center text-center p-30px-all">
    <div class="w-max-600px">
        <h1 class="text-sz-h1 font-wg-700 m-20px-b">Título Principal</h1>
        <p class="text-sz-h4 opacity-8">Subtítulo descritivo</p>
    </div>
</section>
```

### Grid de Cards Responsivo (Padrão E-commerce)
```html
<div class="container p-60px-tb xs-p-30px-tb">
    <div class="row gap-10">
        <div class="c-xs-12 c-sm-6 c-lg-3 render-auto">
            <div class="border-all border-rd-8 p-20px-all cursor-pointer">
                <img src="produto.jpg" class="w-100 border-rd-4 m-15px-b">
                <h4 class="text-sz-h5 m-10px-b">Nome do Produto</h4>
                <p class="text-sz-h4 font-wg-700">R$ 99,90</p>
            </div>
        </div>
        <!-- Repetir para 20+ produtos -->
    </div>
</div>
```

### Header com Logo e Menu
```html
<header class="p-20px-tb border-b">
    <div class="container">
        <div class="d-flex f-items-center f-justify-between">
            <div class="logo">
                <img src="logo.svg" class="h-40px">
            </div>
            <nav class="d-flex f-gap-20 xs-d-none">
                <a href="#" class="cursor-pointer">Home</a>
                <a href="#" class="cursor-pointer">Sobre</a>
                <a href="#" class="cursor-pointer">Contato</a>
            </nav>
        </div>
    </div>
</header>
```

### Modal Centralizado
```html
<!-- Trigger -->
<button data-modal-show="exemplo-modal" class="cursor-pointer">Abrir Modal</button>

<!-- Modal -->
<div data-modal="exemplo-modal" class="modal-dialog" aria-hidden="true">
    <div class="dialog-content">
        <div class="dialog-backdrop" data-modal-hide></div>
        <div class="dialog-inline w-max-500px">
            <button class="dialog-close" data-modal-hide></button>
            <div class="modal-popup border-rd-10 p-30px-all">
                <h3 class="text-sz-h3 m-20px-b">Título do Modal</h3>
                <p>Conteúdo...</p>
            </div>
        </div>
    </div>
</div>
```

### Carrossel com Embla
```html
<div class="slide__viewport">
    <div class="slide__row cursor-grab">
        <div class="slide__item c-xs-12 c-sm-6 c-md-4">
            <img src="slide1.jpg" class="w-100">
        </div>
        <div class="slide__item c-xs-12 c-sm-6 c-md-4">
            <img src="slide2.jpg" class="w-100">
        </div>
        <div class="slide__item c-xs-12 c-sm-6 c-md-4">
            <img src="slide3.jpg" class="w-100">
        </div>
    </div>
</div>
```

---

## Arquivos de Referência

Para lista completa de todas as classes disponíveis, consulte os arquivos em [references/](references/):

- [grid-reference.md](references/grid-reference.md) - Sistema de grid de 12 colunas
- [display-reference.md](references/display-reference.md) - Classes de display, overflow e position
- [flex-reference.md](references/flex-reference.md) - Flexbox completo
- [padding-reference.md](references/padding-reference.md) - Todas as classes de padding
- [margin-reference.md](references/margin-reference.md) - Todas as classes de margin
- [width-reference.md](references/width-reference.md) - Largura e max-width
- [height-reference.md](references/height-reference.md) - Altura e min-height
- [typography-reference.md](references/typography-reference.md) - Tipografia e texto
- [border-reference.md](references/border-reference.md) - Bordas, radius, opacity e z-index
- [utilities-reference.md](references/utilities-reference.md) - Position, visibility, float, background
- [animations-reference.md](references/animations-reference.md) - Animações WOW e Animated
- [icons-reference.md](references/icons-reference.md) - Todos os ícones organizados por categoria
- [modal-reference.md](references/modal-reference.md) - Modal (a11y-dialog)
- [carousel-reference.md](references/carousel-reference.md) - Carrossel (Embla)
- [venobox-reference.md](references/venobox-reference.md) - Lightbox (VenoBox)
- [tooltips-reference.md](references/tooltips-reference.md) - Tooltips (Balloon.css)
