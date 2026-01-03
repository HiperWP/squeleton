# Grid Reference

Sistema de grid de 12 colunas baseado em Flexbox.

## Containers

```
container (max-width: 1250px, centralizado)
container-fluid (width: 100%)
```

## Row

```
row (display: flex, flex-wrap: wrap, margin: -15px)
```

## Colunas

Padrão: `c-{breakpoint}-{1-12}`

**Nota**: Nas colunas, o breakpoint é **sufixo** (diferente das outras classes utilitárias).

### XS (≤639px) - Base mobile

```
c-xs-1 (8.33%)
c-xs-2 (16.67%)
c-xs-3 (25%)
c-xs-4 (33.33%)
c-xs-5 (41.67%)
c-xs-6 (50%)
c-xs-7 (58.33%)
c-xs-8 (66.67%)
c-xs-9 (75%)
c-xs-10 (83.33%)
c-xs-11 (91.67%)
c-xs-12 (100%)
```

### SM (≥640px)

```
c-sm-1 (8.33%)
c-sm-2 (16.67%)
c-sm-3 (25%)
c-sm-4 (33.33%)
c-sm-5 (41.67%)
c-sm-6 (50%)
c-sm-7 (58.33%)
c-sm-8 (66.67%)
c-sm-9 (75%)
c-sm-10 (83.33%)
c-sm-11 (91.67%)
c-sm-12 (100%)
```

### MD (≥992px)

```
c-md-1 (8.33%)
c-md-2 (16.67%)
c-md-3 (25%)
c-md-4 (33.33%)
c-md-5 (41.67%)
c-md-6 (50%)
c-md-7 (58.33%)
c-md-8 (66.67%)
c-md-9 (75%)
c-md-10 (83.33%)
c-md-11 (91.67%)
c-md-12 (100%)
```

### LG (≥1200px)

```
c-lg-1 (8.33%)
c-lg-2 (16.67%)
c-lg-3 (25%)
c-lg-4 (33.33%)
c-lg-5 (41.67%)
c-lg-6 (50%)
c-lg-7 (58.33%)
c-lg-8 (66.67%)
c-lg-9 (75%)
c-lg-10 (83.33%)
c-lg-11 (91.67%)
c-lg-12 (100%)
```

## Colunas Especiais

```
c-auto (flex: 1 1 0% - ocupa espaço disponível)
c-center (margin: 0 auto - centraliza a coluna)
md-c-center (responsivo ≤1199px)
sm-c-center (responsivo ≤991px)
xs-c-center (responsivo ≤639px)
```

## Gap (espaçamento entre colunas)

```
gap-0 (0px)
gap-5 (5px)
gap-10 (10px)
gap-15 (padrão, sem classe necessária)
```

Responsivos (apenas xs, sm, md - gaps são classes utilitárias):
```
xs-gap-0, xs-gap-5, xs-gap-10
sm-gap-0, sm-gap-5, sm-gap-10
md-gap-0, md-gap-5, md-gap-10
```

## Exemplos de Uso

```html
<!-- Layout básico 2 colunas -->
<div class="container">
    <div class="row">
        <div class="c-xs-12 c-md-8">Conteúdo principal</div>
        <div class="c-xs-12 c-md-4">Sidebar</div>
    </div>
</div>

<!-- Grid de 3 colunas com gap reduzido -->
<div class="container">
    <div class="row gap-10">
        <div class="c-xs-12 c-sm-6 c-md-4">Card 1</div>
        <div class="c-xs-12 c-sm-6 c-md-4">Card 2</div>
        <div class="c-xs-12 c-sm-6 c-md-4">Card 3</div>
    </div>
</div>

<!-- Grid de 4 colunas -->
<div class="container">
    <div class="row">
        <div class="c-xs-6 c-sm-4 c-lg-3">Item 1</div>
        <div class="c-xs-6 c-sm-4 c-lg-3">Item 2</div>
        <div class="c-xs-6 c-sm-4 c-lg-3">Item 3</div>
        <div class="c-xs-6 c-sm-4 c-lg-3">Item 4</div>
    </div>
</div>

<!-- Coluna centralizada -->
<div class="container">
    <div class="row">
        <div class="c-xs-12 c-md-8 c-center">Conteúdo centralizado</div>
    </div>
</div>

<!-- Container fluido (100% largura) -->
<div class="container-fluid">
    <div class="row">
        <div class="c-xs-12">Full width</div>
    </div>
</div>

<!-- Sem gap entre colunas -->
<div class="row gap-0">
    <div class="c-xs-6">Sem espaço</div>
    <div class="c-xs-6">Entre colunas</div>
</div>
```

## Otimização de Performance - Content Visibility

Classes para lazy rendering de listas e grids longos usando `content-visibility: auto`. Melhora performance de initial render em 5-7x para listas com 20+ itens.

### Classes Base (Variantes de Tamanho)

```
render-auto        (500px - cards médios padrão)
render-auto-250px  (250px - cards pequenos/compactos)
render-auto-800px  (800px - cards grandes/hero sections)
```

### Classes Responsivas (Breakpoints)

```
md-render-auto     (450px em ≤1199px - tablet)
sm-render-auto     (400px em ≤991px - mobile médio)
xs-render-auto     (300px em ≤639px - mobile compacto)
```

### Quando Usar

Use em elementos repetidos dentro de listas/grids longos:
- Listas de produtos com 20+ itens
- Feeds de posts/artigos
- Galerias de imagens extensas
- Tabelas com muitas linhas

**Não use** em:
- Elementos únicos
- Conteúdo above-the-fold (primeira tela)
- Elementos com altura dinâmica crítica

### Como Escolher a Classe

**Variantes de Tamanho** (`render-auto-250px`, `render-auto`, `render-auto-800px`):
- Use baseado na altura **natural** do elemento
- `.render-auto-250px` → Cards compactos (250px)
- `.render-auto` → Cards médios (500px)
- `.render-auto-800px` → Cards grandes/hero (800px)

**Variantes Responsivas** (`md-render-auto`, `sm-render-auto`, `xs-render-auto`):
- Use quando o layout **empilha verticalmente** em breakpoints menores
- Elementos ficam mais altos quando colunas viram linhas
- `.md-render-auto` → Tablet (≤1199px) - 450px
- `.sm-render-auto` → Mobile médio (≤991px) - 400px
- `.xs-render-auto` → Mobile compacto (≤639px) - 300px

### Exemplos de Uso

```html
<!-- Lista de produtos (cards médios) -->
<div class="row">
    <div class="c-xs-12 c-sm-6 c-md-4 render-auto">
        <div class="card">Produto 1</div>
    </div>
    <div class="c-xs-12 c-sm-6 c-md-4 render-auto">
        <div class="card">Produto 2</div>
    </div>
    <!-- ... 20+ itens ... -->
</div>

<!-- Lista compacta (tags, avatares) -->
<div class="row">
    <div class="c-xs-6 c-sm-4 c-md-3 render-auto-250px">
        <div class="tag">Tag 1</div>
    </div>
    <!-- ... -->
</div>

<!-- Hero sections em grid -->
<div class="row">
    <div class="c-xs-12 c-md-6 render-auto-800px">
        <section class="hero">Hero 1</section>
    </div>
    <!-- ... -->
</div>

<!-- Cards que empilham em mobile (usa responsivo) -->
<div class="row">
    <div class="c-xs-12 c-md-6 sm-render-auto">
        <div class="card">
            <!-- Em desktop: lado a lado (menor altura)
                 Em mobile: empilhado (maior altura) -->
        </div>
    </div>
</div>

<!-- Feed de posts (responsivo para mobile compacto) -->
<div class="row">
    <div class="c-xs-12 c-md-8 xs-render-auto">
        <article>Post completo</article>
    </div>
</div>
```

### Performance Esperada

Com `render-auto` aplicado a 50+ elementos:
- **Initial render**: 5-7x mais rápido
- **Scroll performance**: Melhor FPS (elementos renderizam sob demanda)
- **Memória**: Redução de 30-50% no uso inicial

**Observações**:
- Valores `contain-intrinsic-size` são estimativas, não precisam ser exatos
- Browser corrige a altura após primeiro render do elemento
- Funciona automaticamente com scroll (lazy rendering nativo)
```
