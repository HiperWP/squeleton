# Display Reference

Padrão: `{breakpoint-}d-{valor}`

## Classes Base

```
d-none
d-block
d-inline
d-inline-block
d-flex
d-table
d-table-cell
```

## Responsivo - XS (≤639px)

```
xs-d-none
xs-d-block
xs-d-inline
xs-d-inline-block
xs-d-flex
```

## Responsivo - SM (≥640px)

```
sm-d-none
sm-d-block
sm-d-inline
sm-d-inline-block
sm-d-flex
```

## Responsivo - MD (≥992px)

```
md-d-none
md-d-block
md-d-inline
md-d-inline-block
md-d-flex
```

## Responsivo - LG (≥1200px)

```
lg-d-none
lg-d-block
lg-d-inline
lg-d-inline-block
lg-d-flex
```

## Overflow

```
ov-hidden
ov-visible
ov-auto
ov-scroll
xs-ov-hidden, xs-ov-auto
sm-ov-hidden, sm-ov-auto
md-ov-hidden, md-ov-auto
lg-ov-hidden, lg-ov-auto
```

## Position

```
ps-relative
ps-absolute
ps-fixed
ps-sticky
ps-static
xs-ps-relative, xs-ps-absolute, xs-ps-fixed, xs-ps-sticky, xs-ps-inherit
sm-ps-relative, sm-ps-absolute, sm-ps-fixed, sm-ps-sticky
md-ps-relative, md-ps-absolute, md-ps-fixed, md-ps-sticky
lg-ps-relative, lg-ps-absolute, lg-ps-fixed, lg-ps-sticky
```

## Visibility

```
hidden-print (oculto na impressão)
```

## Exemplos de Uso

```html
<!-- Ocultar no mobile, mostrar no desktop -->
<div class="xs-d-none md-d-block">Visível apenas no desktop</div>

<!-- Mostrar no mobile, ocultar no desktop -->
<div class="d-block md-d-none">Visível apenas no mobile</div>

<!-- Flex no desktop, block no mobile -->
<div class="xs-d-block md-d-flex">Layout adaptativo</div>
```
