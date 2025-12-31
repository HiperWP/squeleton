# Typography Reference

## Text Align

```
text-left
text-center
text-right
text-justify
```

Responsivos:
```
xs-text-left, xs-text-center, xs-text-right
sm-text-left, sm-text-center, sm-text-right
md-text-left, md-text-center, md-text-right
lg-text-left, lg-text-center, lg-text-right
```

## Text Transform

```
text-lowercase
text-uppercase
text-capitalize
```

## Text Decoration

```
text-decoration-underline
text-decoration-line-through
```

## Font Weight

```
font-wg-300
font-wg-400
font-wg-500
font-wg-600
font-wg-700
font-wg-800
font-wg-900
```

## Font Size - Redução

```
minus-10 (font-size: 90%)
minus-15 (font-size: 85%)
minus-20 (font-size: 80%)
minus-25 (font-size: 75%)
minus-30 (font-size: 70%)
```

## Font Size - Ampliação

```
more-10 (font-size: 110%)
more-15 (font-size: 115%)
more-20 (font-size: 120%)
more-25 (font-size: 125%)
more-30 (font-size: 130%)
more-35 (font-size: 135%)
more-40 (font-size: 140%)
more-45 (font-size: 145%)
more-50 (font-size: 150%)
```

## Letter Spacing - Positivo

```
letter-sp-0 (0)
letter-sp-1 (1px)
letter-sp-2 (2px)
letter-sp-3 (3px)
letter-sp-4 (4px)
letter-sp-5 (5px)
```

## Letter Spacing - Negativo

```
letter-sp-minus-025 (-0.25px)
letter-sp-minus-05 (-0.5px)
letter-sp-minus-1 (-1px)
letter-sp-minus-2 (-2px)
letter-sp-minus-3 (-3px)
```

## Line Height

```
line-h-1e0 (1.0)
line-h-1e1 (1.1)
line-h-1e2 (1.2)
line-h-1e3 (1.3)
line-h-1e4 (1.4)
line-h-1e5 (1.5)
line-h-1e6 (1.6)
line-h-1e7 (1.7)
line-h-1e8 (1.8)
line-h-1e9 (1.9)
```

## White Space

```
text-nowrap (white-space: nowrap)
word-wrap (word-wrap: break-word)
```

## Tamanhos de Texto Auxiliar

```
small, .small (font-size: 75%)
```

## Vertical Align

```
v-align-top
v-align-middle
v-align-bottom
```

## Exemplos de Uso

```html
<!-- Título com peso e espaçamento -->
<h1 class="font-wg-700 letter-sp-minus-1">Título Principal</h1>

<!-- Texto menor com line-height ajustado -->
<p class="minus-10 line-h-1e6">Texto secundário</p>

<!-- Label uppercase com espaçamento -->
<span class="text-uppercase letter-sp-2 font-wg-600 minus-20">Label</span>

<!-- Preço grande -->
<span class="more-50 font-wg-700">R$ 99,90</span>

<!-- Alinhamento responsivo -->
<p class="xs-text-center md-text-left">
    Centralizado no mobile, esquerda no desktop
</p>
```
