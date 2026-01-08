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
```

## Flex Shorthand

```
f-auto-max (flex: 1 1 auto)
f-auto-min (flex: 0 1 auto)
```

## Align Content (múltiplas linhas com wrap)

Controla espaçamento entre **linhas** quando `flex-wrap: wrap` cria múltiplas linhas. Diferente de `align-items` que alinha itens **dentro** de cada linha.

```
f-content-start (flex-start - linhas no início)
f-content-end (flex-end - linhas no final)
f-content-center (center - linhas centralizadas)
f-content-between (space-between - espaço entre linhas)
f-content-around (space-around - espaço ao redor das linhas)
f-content-stretch (stretch - linhas esticam para preencher - padrão)
```

**Quando usar:**
- Container com `f-wrap` ou `f-grid` (que já tem wrap)
- Container tem altura definida (`h-400px`, `h-100vh`, etc.)
- Itens quebram em múltiplas linhas

**Exemplos práticos:**

```html
<!-- Grid com múltiplas linhas - espaçar verticalmente -->
<div class="f-grid f-content-between h-400px">
    <div class="w-50">Item 1</div>
    <div class="w-50">Item 2</div>
    <div class="w-50">Item 3</div> <!-- Linha 1 fica no topo -->
    <div class="w-50">Item 4</div> <!-- Linha 2 fica no bottom -->
</div>

<!-- Galeria de cards - centralizar linhas verticalmente -->
<div class="f-grid f-content-center f-gap-20 h-600px">
    <div class="w-30">Card 1</div>
    <div class="w-30">Card 2</div>
    <div class="w-30">Card 3</div>
    <!-- Linhas ficam centralizadas verticalmente -->
</div>

<!-- Tags que quebram - espaçamento igual entre linhas -->
<div class="d-flex f-wrap f-content-around h-200px">
    <span class="tag">Tag 1</span>
    <span class="tag">Tag 2</span>
    <span class="tag">Tag 3</span>
    <!-- Espaço igual ao redor de cada linha -->
</div>
```

## Gap (espaçamento entre itens)

```
f-gap-0 (sem gap)
f-gap-5 (5px)
f-gap-10 (10px)
f-gap-15 (15px)
f-gap-20 (20px)
f-gap-25 (25px)
f-gap-30 (30px)
f-gap-35 (35px)
f-gap-40 (40px)
f-gap-45 (45px)
f-gap-50 (50px)
```

Responsivos:
```
xs-f-gap-{0-50} (intervalo de 5)
sm-f-gap-{0-50} (intervalo de 5)
md-f-gap-{0-50} (intervalo de 5)
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
