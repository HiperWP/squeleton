# Carousel Reference (Embla)

Carrossel com movimento fluido e suporte a swipe.

Documentação oficial: https://www.embla-carousel.com

## Estrutura Básica

```html
<div class="slide">
    <div class="slide__viewport">
        <div class="slide__row">
            <div class="slide__item">Slide 1</div>
            <div class="slide__item">Slide 2</div>
            <div class="slide__item">Slide 3</div>
        </div>
    </div>
</div>
```

## Classes Estruturais

```
slide (container principal)
slide__viewport (área visível, overflow hidden)
slide__row (container flex dos slides)
slide__item (cada slide individual)
slide__dots (container para indicadores)
```

## Slides Responsivos com Colunas

Use classes de coluna (`c-xs-*`, `c-sm-*`, etc.) nos items:

```html
<!-- 2 slides no mobile, 3 no tablet, 4 no desktop -->
<div class="slide">
    <div class="slide__viewport">
        <div class="slide__row">
            <div class="slide__item c-xs-6 c-sm-4 c-lg-3">Slide 1</div>
            <div class="slide__item c-xs-6 c-sm-4 c-lg-3">Slide 2</div>
            <div class="slide__item c-xs-6 c-sm-4 c-lg-3">Slide 3</div>
            <div class="slide__item c-xs-6 c-sm-4 c-lg-3">Slide 4</div>
        </div>
    </div>
</div>
```

## Gap entre Slides

Aplique gap no `slide__row`:

```html
<div class="slide__row gap-10">...</div>
<div class="slide__row gap-5">...</div>
<div class="slide__row gap-0">...</div>
```

## Com Navegação (Setas)

```html
<div class="slide">
    <div class="slide__viewport">
        <div class="slide__row">
            <div class="slide__item c-xs-12">Slide 1</div>
            <div class="slide__item c-xs-12">Slide 2</div>
        </div>
    </div>
    <button class="slide__prev">
        <span class="iccon-arrow-left-1"></span>
    </button>
    <button class="slide__next">
        <span class="iccon-arrow-right-1"></span>
    </button>
</div>
```

## Com Indicadores (Dots)

```html
<div class="slide">
    <div class="slide__viewport">
        <div class="slide__row">
            <div class="slide__item c-xs-12">Slide 1</div>
            <div class="slide__item c-xs-12">Slide 2</div>
            <div class="slide__item c-xs-12">Slide 3</div>
        </div>
    </div>
    <div class="slide__dots"></div>
</div>
```

## Exemplos Práticos

### Carrossel de Cards

```html
<div class="slide">
    <div class="slide__viewport">
        <div class="slide__row gap-10">
            <div class="slide__item c-xs-12 c-sm-6 c-md-4">
                <div class="border-all border-rd-8 p-20px-all">
                    <h4>Card 1</h4>
                    <p>Descrição do card</p>
                </div>
            </div>
            <div class="slide__item c-xs-12 c-sm-6 c-md-4">
                <div class="border-all border-rd-8 p-20px-all">
                    <h4>Card 2</h4>
                    <p>Descrição do card</p>
                </div>
            </div>
            <div class="slide__item c-xs-12 c-sm-6 c-md-4">
                <div class="border-all border-rd-8 p-20px-all">
                    <h4>Card 3</h4>
                    <p>Descrição do card</p>
                </div>
            </div>
        </div>
    </div>
    <div class="slide__dots m-20px-t"></div>
</div>
```

### Hero Slider (Full Width)

```html
<div class="slide">
    <div class="slide__viewport">
        <div class="slide__row">
            <div class="slide__item c-xs-12">
                <div class="h-500px bg-cover" style="background-image: url('slide1.jpg')">
                    <div class="container h-100 d-flex f-items-center">
                        <h1>Título Slide 1</h1>
                    </div>
                </div>
            </div>
            <div class="slide__item c-xs-12">
                <div class="h-500px bg-cover" style="background-image: url('slide2.jpg')">
                    <div class="container h-100 d-flex f-items-center">
                        <h1>Título Slide 2</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button class="slide__prev"><span class="iccon-arrow-left-1"></span></button>
    <button class="slide__next"><span class="iccon-arrow-right-1"></span></button>
    <div class="slide__dots"></div>
</div>
```

### Galeria de Logos

```html
<div class="slide">
    <div class="slide__viewport">
        <div class="slide__row gap-10 f-items-center">
            <div class="slide__item c-xs-4 c-sm-3 c-md-2">
                <img src="logo1.png" class="w-100">
            </div>
            <div class="slide__item c-xs-4 c-sm-3 c-md-2">
                <img src="logo2.png" class="w-100">
            </div>
            <div class="slide__item c-xs-4 c-sm-3 c-md-2">
                <img src="logo3.png" class="w-100">
            </div>
            <div class="slide__item c-xs-4 c-sm-3 c-md-2">
                <img src="logo4.png" class="w-100">
            </div>
            <div class="slide__item c-xs-4 c-sm-3 c-md-2">
                <img src="logo5.png" class="w-100">
            </div>
        </div>
    </div>
</div>
```
