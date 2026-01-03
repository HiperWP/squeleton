# Border Reference

## Border Completo

```
border-all (border: 1px solid)
```

## Border por Lado

```
border-t (border-t: 1px solid)
border-b (border-b: 1px solid)
border-l (border-l: 1px solid)
border-r (border-r: 1px solid)
border-lr (border-l + border-r: 1px solid)
border-tb (border-t + border-b: 1px solid)
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
border-transparent
```

## Remover Border

```
border-0-t
border-0-b
border-0-l
border-0-r
border-0-all
```

Responsivos:
```
xs-border-0-t, xs-border-0-b, xs-border-0-l, xs-border-0-r, xs-border-0-all
sm-border-0-t, sm-border-0-b, sm-border-0-l, sm-border-0-r, sm-border-0-all
md-border-0-t, md-border-0-b, md-border-0-l, md-border-0-r, md-border-0-all
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
border-rd-11 (11px)
border-rd-12 (12px)
border-rd-13 (13px)
border-rd-14 (14px)
border-rd-15 (15px)
border-rd-16 (16px)
border-rd-17 (17px)
border-rd-18 (18px)
border-rd-19 (19px)
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
border-rd-4-t (top-l + top-r: 4px)
border-rd-6-t (top-l + top-r: 6px)
border-rd-8-t (top-l + top-r: 8px)
border-rd-10-t (top-l + top-r: 10px)
border-rd-12-t (top-l + top-r: 16px)
```

### Cantos Específicos - Bottom

```
border-rd-4-b (bottom-l + bottom-r: 4px)
border-rd-6-b (bottom-l + bottom-r: 6px)
border-rd-8-b (bottom-l + bottom-r: 8px)
border-rd-10-b (bottom-l + bottom-r: 10px)
border-rd-12-b (bottom-l + bottom-r: 12px)
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
z-index-minus-2 (-2)
```

## Exemplos de Uso

```html
<!-- Card com borda e radius -->
<div class="border-all border-rd-8 p-20px-all">
    Card content
</div>

<!-- Borda inferior destacada -->
<div class="border-b border-w-2">
    Seção
</div>

<!-- Avatar circular -->
<img src="avatar.jpg" class="border-rd-50 w-50px h-50px">

<!-- Tab com radius só em cima -->
<div class="border-rd-8-t border-all border-0-b">
    Tab ativa
</div>

<!-- Overlay escuro sobre imagem -->
<div class="ps-relative">
    <img src="bg.jpg">
    <div class="opacity-bg-3 bg-black"></div>
</div>
```
