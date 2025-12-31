# Flexbox Reference

## Container Flex

```
d-flex
f-grid (display: flex + flex-wrap: wrap + flex-direction: row)
```

## Direção

```
f-row
f-row-reverse
f-col
f-col-reverse
```

Responsivos:
```
xs-f-row, xs-f-col, xs-f-row-reverse, xs-f-col-reverse
sm-f-row, sm-f-col, sm-f-row-reverse, sm-f-col-reverse
md-f-row, md-f-col, md-f-row-reverse, md-f-col-reverse
lg-f-row, lg-f-col, lg-f-row-reverse, lg-f-col-reverse
```

## Wrap

```
f-wrap
f-nowrap
f-wrap-reverse
```

Responsivos:
```
xs-f-wrap, xs-f-nowrap
sm-f-wrap, sm-f-nowrap
md-f-wrap, md-f-nowrap
lg-f-wrap, lg-f-nowrap
```

## Align Items (eixo cruzado)

```
f-items-start
f-items-end
f-items-end-safe
f-items-center
f-items-center-safe
f-items-baseline
f-items-baseline-last
f-items-stretch
```

Responsivos:
```
xs-f-items-start, xs-f-items-end, xs-f-items-center, xs-f-items-stretch
sm-f-items-start, sm-f-items-end, sm-f-items-center, sm-f-items-stretch
md-f-items-start, md-f-items-end, md-f-items-center, md-f-items-stretch
lg-f-items-start, lg-f-items-end, lg-f-items-center, lg-f-items-stretch
```

## Justify Content (eixo principal)

```
f-justify-start
f-justify-end
f-justify-end-safe
f-justify-center
f-justify-center-safe
f-justify-between
f-justify-around
f-justify-evenly
f-justify-stretch
f-justify-baseline
f-justify-normal
```

Responsivos:
```
xs-f-justify-start, xs-f-justify-end, xs-f-justify-center, xs-f-justify-between
sm-f-justify-start, sm-f-justify-end, sm-f-justify-center, sm-f-justify-between
md-f-justify-start, md-f-justify-end, md-f-justify-center, md-f-justify-between
lg-f-justify-start, lg-f-justify-end, lg-f-justify-center, lg-f-justify-between
```

## Align Self (item individual)

```
f-self-auto
f-self-start
f-self-end
f-self-center
f-self-center-safe
f-self-stretch
f-self-baseline
```

## Flex Grow

```
f-grow-1
f-grow-2
f-grow-3
```

## Flex Shrink

```
f-shrink-0
f-shrink-1
f-shrink-2
```

## Flex Basis

```
f-basis-0
f-basis-auto
```

## Flex Shorthand

```
f-auto-max (flex: 1 1 auto)
f-auto-min (flex: 0 1 auto)
f-none (flex: none)
```

## Gap (espaçamento entre itens)

```
f-gap-5
f-gap-10
f-gap-15
f-gap-20
f-gap-25
f-gap-30
```

Responsivos:
```
xs-f-gap-5, xs-f-gap-10, xs-f-gap-15, xs-f-gap-20, xs-f-gap-25, xs-f-gap-30
sm-f-gap-5, sm-f-gap-10, sm-f-gap-15, sm-f-gap-20, sm-f-gap-25, sm-f-gap-30
md-f-gap-5, md-f-gap-10, md-f-gap-15, md-f-gap-20, md-f-gap-25, md-f-gap-30
lg-f-gap-5, lg-f-gap-10, lg-f-gap-15, lg-f-gap-20, lg-f-gap-25, lg-f-gap-30
```

## Exemplos de Uso

```html
<!-- Centralizar conteúdo vertical e horizontal -->
<div class="d-flex f-items-center f-justify-center h-100vh">
    Centralizado
</div>

<!-- Header com logo e menu -->
<header class="d-flex f-items-center f-justify-between">
    <div class="logo">Logo</div>
    <nav class="d-flex f-gap-20">Links</nav>
</header>

<!-- Grid flexível com gap -->
<div class="f-grid f-gap-15">
    <div class="f-grow-1">Item 1</div>
    <div class="f-grow-1">Item 2</div>
    <div class="f-grow-1">Item 3</div>
</div>

<!-- Coluna no mobile, linha no desktop -->
<div class="d-flex xs-f-col md-f-row f-gap-20">
    <div>Sidebar</div>
    <div class="f-grow-1">Conteúdo</div>
</div>

<!-- Item que não encolhe -->
<div class="d-flex">
    <div class="f-shrink-0 w-200px">Fixo</div>
    <div class="f-grow-1">Flexível</div>
</div>
```
