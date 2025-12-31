# Border Reference

## Border Completo

```
border-all (border: 1px solid #ededed)
```

## Border por Lado

```
border-top (border-top: 1px solid)
border-bottom (border-bottom: 1px solid)
border-left (border-left: 1px solid)
border-right (border-right: 1px solid)
border-lr (border-left + border-right: 1px solid)
border-tb (border-top + border-bottom: 1px solid)
```

## Border Width

```
border-w-1 (1px)
border-w-2 (2px)
border-w-3 (3px)
border-w-4 (4px)
border-w-5 (5px)
```

## Border Style

```
border-solid
border-dashed
border-dotted
border-none
border-hidden
```

## Border Color

```
border-c-white (#fff)
border-c-black (#0f1419)
border-c-extra-dark-gray (#232323)
border-c-medium-dark-gray (#363636)
border-c-dark-gray (#939393)
border-c-extra-medium-gray (#dbdbdb)
border-c-medium-gray (#e4e4e4)
border-c-extra-light-gray (#ededed)
border-c-light-gray (#f5f5f5)
border-transparent
```

## Remover Border

```
no-border-top
no-border-bottom
no-border-left
no-border-right
```

Responsivos:
```
xs-no-border-top, xs-no-border-bottom, xs-no-border-left, xs-no-border-right, xs-no-border
sm-no-border-top, sm-no-border-bottom, sm-no-border-left, sm-no-border-right
md-no-border-top, md-no-border-bottom, md-no-border-left, md-no-border-right
lg-no-border-top, lg-no-border-bottom, lg-no-border-left, lg-no-border-right
```

## Border Radius

### Valores 1-20

```
border-rd-1 (1px)
border-rd-2 (2px)
border-rd-3 (3px)
border-rd-4 (4px)
border-rd-5 (5px)
border-rd-6 (6px)
border-rd-7 (7px)
border-rd-8 (8px)
border-rd-9 (9px)
border-rd-10 (10px)
border-rd-12 (12px)
border-rd-14 (14px)
border-rd-15 (15px)
border-rd-20 (20px)
```

### Circular

```
border-rd-50 (50%)
border-rd-100 (50%)
img-circle (50%)
```

### Cantos Específicos - Top

```
border-rd-4-t (top-left + top-right: 4px)
border-rd-8-t (top-left + top-right: 8px)
border-rd-10-t (top-left + top-right: 10px)
```

### Cantos Específicos - Bottom

```
border-rd-4-b (bottom-left + bottom-right: 4px)
border-rd-8-b (bottom-left + bottom-right: 8px)
border-rd-10-b (bottom-left + bottom-right: 10px)
```

## Opacity

```
opacity-1 (0.15)
opacity-2 (0.25)
opacity-3 (0.35)
opacity-4 (0.45)
opacity-5 (0.55)
opacity-6 (0.65)
opacity-7 (0.75)
opacity-8 (0.85)
opacity-9 (0.9)
```

## Opacity Background (overlay absoluto)

```
opacity-bg-0 (1)
opacity-bg-1 (0.9)
opacity-bg-2 (0.85)
opacity-bg-3 (0.75)
opacity-bg-4 (0.65)
opacity-bg-5 (0.55)
opacity-bg-6 (0.45)
opacity-bg-7 (0.35)
opacity-bg-8 (0.25)
opacity-bg-9 (0.15)
opacity-bg-10 (0)
```

## Z-Index

```
z-index-0
z-index-1
z-index-2
z-index-3
z-index-4
z-index-5
z-index-111
z-index-1111
z-index-minus2 (-2)
```

## Exemplos de Uso

```html
<!-- Card com borda e radius -->
<div class="border-all border-rd-8 p-20px-all">
    Card content
</div>

<!-- Borda inferior destacada -->
<div class="border-bottom border-w-2 border-c-dark-gray">
    Seção
</div>

<!-- Avatar circular -->
<img src="avatar.jpg" class="border-rd-100 w-50px h-50px">

<!-- Tab com radius só em cima -->
<div class="border-rd-8-t border-all no-border-bottom">
    Tab ativa
</div>

<!-- Overlay escuro sobre imagem -->
<div class="ps-relative">
    <img src="bg.jpg">
    <div class="opacity-bg-3 bg-black"></div>
</div>
```
