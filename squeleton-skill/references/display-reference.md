# Display Reference

Padrão: `{breakpoint-}d-{valor}`

## Classes Base - Global

```
d-none
d-block
d-inline
d-inline-block
d-flex
d-table
d-table-cell
```

## Responsivo - MD (≤1199px)

```
md-d-none
md-d-block
md-d-inline
md-d-inline-block
md-d-flex
```

## Responsivo - SM (≤991px)

```
sm-d-none
sm-d-block
sm-d-inline
sm-d-inline-block
sm-d-flex
```

## Responsivo - XS (≤639px)

```
xs-d-none
xs-d-block
xs-d-inline
xs-d-inline-block
xs-d-flex
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
```

## Position

```
ps-relative
ps-absolute
ps-fixed
ps-sticky
ps-static
md-ps-relative, md-ps-absolute, md-ps-fixed, md-ps-sticky
sm-ps-relative, sm-ps-absolute, sm-ps-fixed, sm-ps-sticky
xs-ps-relative, xs-ps-absolute, xs-ps-fixed, xs-ps-sticky
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
