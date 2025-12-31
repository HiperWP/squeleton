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
xs-c-center, sm-c-center, md-c-center, lg-c-center
```

## Gap (espaçamento entre colunas)

```
gap-0 (0px)
gap-5 (5px)
gap-10 (10px)
gap-15 (padrão, sem classe necessária)
```

Responsivos:
```
xs-gap-0, xs-gap-5, xs-gap-10
sm-gap-0, sm-gap-5, sm-gap-10
md-gap-0, md-gap-5, md-gap-10
lg-gap-0, lg-gap-5, lg-gap-10
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
