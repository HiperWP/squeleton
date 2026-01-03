# Utilities Reference

Classes utilitárias diversas para posicionamento, visibilidade, cursor, float e outras propriedades.

## Position

```
ps-relative
ps-absolute
ps-fixed
ps-sticky
ps-inherit
```

Responsivos:
```
md-ps-relative, md-ps-absolute, md-ps-fixed, md-ps-sticky
sm-ps-relative, sm-ps-absolute, sm-ps-fixed, sm-ps-sticky
xs-ps-relative, xs-ps-absolute, xs-ps-fixed, xs-ps-sticky
```

## Position Values

```
top-0
top-auto
bottom-0
bottom-auto
left-0
left-auto
right-0
right-auto
```

## Centralização Absoluta

```
absolute-x (left: 50%, transform: translateX(-50%))
absolute-y (top: 50%, transform: translateY(-50%))
absolute-xy (left: 50%, top: 50%, transform: translate(-50%, -50%))
```

## Visibility

```
vs-visible (visibility: visible)
vs-hidden (visibility: hidden)
hidden (display: none)
```

## Visibilidade por Breakpoint

```
visible-xs, visible-sm, visible-md, visible-lg (display: none por padrão, visível no breakpoint)
```

Nota: Essas classes ficam ocultas por padrão e são exibidas apenas no breakpoint específico via media query.

## Cursor

Classes utilitárias para modificar o cursor em elementos interativos.

```
cursor-pointer       (hover em botões/cards clicáveis)
cursor-not-allowed   (estados disabled)
cursor-wait          (loading states)
cursor-text          (campos de texto customizados)
cursor-move          (elementos movíveis/drag & drop)
cursor-grab          (carrosséis, sliders - antes de arrastar)
cursor-grabbing      (durante o arrasto)
cursor-help          (tooltips, ícones de ajuda)
cursor-zoom-in       (lightbox, zoom de imagens)
cursor-zoom-out      (lightbox em zoom)
```

**Nota**: Classes de cursor não possuem variantes responsivas, pois o comportamento do cursor não depende do tamanho da tela.

**Exemplos**:
```html
<!-- Botão disabled -->
<button class="cursor-not-allowed opacity-5" disabled>Indisponível</button>

<!-- Card clicável -->
<div class="cursor-pointer" onclick="openDetail()">Card interativo</div>

<!-- Carrossel com drag -->
<div class="slide__row cursor-grab">
  <div class="slide__item">Slide 1</div>
</div>

<!-- Durante arrasto (via JavaScript) -->
<div class="slide__row cursor-grabbing">Arrastando...</div>

<!-- Loading -->
<div class="cursor-wait">Processando...</div>

<!-- Zoom de imagem -->
<img class="cursor-zoom-in" onclick="openLightbox()">

<!-- Help icon -->
<i class="icon-help cursor-help" title="Ajuda"></i>
```

## Overflow

```
ov-hidden (overflow: hidden)
ov-visible (overflow: visible)
ov-auto (overflow: auto)
```

Responsivos:
```
md-ov-hidden, md-ov-auto
sm-ov-hidden, sm-ov-auto
xs-ov-hidden, xs-ov-auto
```

## Float

```
float-left, pull-left
float-right, pull-right
float-none
clear-both
xs-clear-both
```

## Clear

```
clear-both
xs-clear-both
```

## Vertical Align

```
v-align-top
v-align-middle
v-align-bottom
```

## Background

```
bg-cover (background-size: cover, background-position: center)
bg-parallax (background-attachment: fixed)
bg-ps-left (background-position: left center)
bg-ps-left-bottom (background-position: left bottom)
bg-ps-right (background-position: right center)
bg-ps-top (background-position: center top)
bg-ps-bottom (background-position: center bottom)
bg-ps-x-50 (background-position-x: 50%)
```

## Embed Responsivo

```html
<div class="embed-responsive embed-responsive-16by9">
    <iframe src="..."></iframe>
</div>

<div class="embed-responsive embed-responsive-4by3">
    <iframe src="..."></iframe>
</div>
```

## Video Responsivo

```html
<div class="video-responsive">
    <iframe src="..."></iframe>
</div>
```

## Outros

```
line-break (display: block - força quebra de linha)
divider-full (width: 100%, height: 1px, display: inline-block)
img-circle (border-radius: 50%)
```

## HTMX Indicator

```html
<!-- Elemento que aparece durante requisição HTMX -->
<div class="htmx-indicator">Carregando...</div>
```

## Exemplos de Uso

```html
<!-- Elemento fixo no canto -->
<div class="ps-fixed top-0 right-0 p-20px-all">
    Fixo no canto
</div>

<!-- Centralizar absolutamente -->
<div class="ps-relative h-300px">
    <div class="absolute-xy">Centralizado</div>
</div>

<!-- Background cover -->
<div class="bg-cover h-400px" style="background-image: url('imagem.jpg')">
    Conteúdo sobre imagem
</div>

<!-- Vídeo responsivo 16:9 -->
<div class="video-responsive">
    <iframe src="https://youtube.com/embed/xxx"></iframe>
</div>

<!-- Esconder overflow no mobile -->
<div class="xs-ov-hidden md-ov-auto">
    Conteúdo
</div>
```
