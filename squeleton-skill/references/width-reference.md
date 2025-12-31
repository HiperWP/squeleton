# Width Reference

## Width - Pixels

Padrão: `{breakpoint-}w-{valor}px`

### Valores 5-100 (intervalo de 5)

```
w-5px, w-10px, w-15px, w-20px, w-25px
w-30px, w-35px, w-40px, w-50px, w-55px
w-60px, w-65px, w-70px, w-75px, w-80px
w-85px, w-90px, w-100px
```

Nota: `w-45px` e `w-95px` não existem.

### Valores acima de 100

```
w-120px, w-130px, w-150px, w-180px
w-200px, w-220px, w-230px, w-250px
w-300px, w-350px, w-400px, w-450px
w-500px, w-550px, w-600px, w-650px, w-700px
```

### Responsivos

```
xs-w-50px, xs-w-70px, xs-w-75px, xs-w-80px, xs-w-85px, xs-w-90px, xs-w-95px, xs-w-100px
xs-w-120px, xs-w-130px, xs-w-150px, xs-w-180px, xs-w-200px, xs-w-220px, xs-w-250px
xs-w-300px, xs-w-350px, xs-w-400px, xs-w-450px, xs-w-500px

sm-w-{valor}px (mesmo padrão)
md-w-{valor}px (mesmo padrão)
lg-w-{valor}px (mesmo padrão)
```

## Width - Percentual

Padrão: `{breakpoint-}w-{valor}`

```
w-5, w-10, w-15, w-20, w-25
w-30, w-35, w-40, w-45, w-50
w-55, w-60, w-65, w-70, w-75
w-80, w-85, w-90, w-95, w-100
```

### Responsivos

```
xs-w-5, xs-w-10, xs-w-15, xs-w-20, xs-w-25, xs-w-30, xs-w-35, xs-w-40, xs-w-45, xs-w-50
xs-w-55, xs-w-60, xs-w-65, xs-w-70, xs-w-75, xs-w-80, xs-w-85, xs-w-90, xs-w-95, xs-w-100

sm-w-{valor} (mesmo padrão)
md-w-{valor} (mesmo padrão)
lg-w-{valor} (mesmo padrão)
```

## Width - Auto

```
w-auto
xs-w-auto, sm-w-auto, md-w-auto, lg-w-auto
```

## Max-Width

```
w-max-400px
w-max-450px
w-max-500px
w-max-550px
w-max-600px
w-max-650px
w-max-700px
w-max-750px
w-max-800px
w-max-850px
w-max-900px
```

## Exemplos de Uso

```html
<!-- Largura fixa -->
<div class="w-300px">300px de largura</div>

<!-- Largura percentual -->
<div class="w-50">50% de largura</div>

<!-- Largura responsiva -->
<div class="xs-w-100 md-w-50">100% no mobile, 50% no desktop</div>

<!-- Modal com largura máxima -->
<div class="w-max-600px">Conteúdo do modal</div>

<!-- Sidebar fixa -->
<aside class="w-250px f-shrink-0">Sidebar</aside>
```
