# Width Reference

## Width - Pixels

Padrão: `{breakpoint-}w-{valor}px`

### 5px até 100px (intervalo de 5px)

```
w-5px, w-10px, w-15px, w-20px, w-25px
w-30px, w-35px, w-40px, w-45px, w-50px
w-55px, w-60px, w-65px, w-70px, w-75px
w-80px, w-85px, w-90px, w-95px, w-100px
```

### 100px até 300px (intervalo de 10px)

```
w-110px, w-120px, w-130px, w-140px, w-150px
w-160px, w-170px, w-180px, w-190px, w-200px
w-210px, w-220px, w-230px, w-240px, w-250px
w-260px, w-270px, w-280px, w-290px, w-300px
```

### 300px até 700px (intervalo de 50px)

```
w-350px, w-400px, w-450px, w-500px
w-550px, w-600px, w-650px, w-700px
```

### Responsivos

```
md-w-{valor}px (mesmo padrão)
sm-w-{valor}px (mesmo padrão)
xs-w-{valor}px (mesmo padrão)
```

## Width - Percentual

Padrão: `{breakpoint-}w-{valor}` (sem unidade = porcentagem)

### 10% até 100% (intervalo de 5%)

```
w-10, w-15, w-20, w-25, w-30
w-35, w-40, w-45, w-50, w-55
w-60, w-65, w-70, w-75, w-80
w-85, w-90, w-95, w-100
```

### Responsivos

```
md-w-{valor} (mesmo padrão)
sm-w-{valor} (mesmo padrão)
xs-w-{valor} (mesmo padrão)
```

## Width - Auto

```
w-auto
md-w-auto
sm-w-auto
xs-w-auto
```

## Max-Width

### 5px até 100px (intervalo de 5px)

```
w-max-5px, w-max-10px, w-max-15px, w-max-20px, w-max-25px
w-max-30px, w-max-35px, w-max-40px, w-max-50px
w-max-55px, w-max-60px, w-max-65px, w-max-70px, w-max-75px
w-max-80px, w-max-85px, w-max-90px, w-max-95px, w-max-100px
```

### 100px até 300px (intervalo de 10px)

```
w-max-110px, w-max-120px, w-max-130px, w-max-140px, w-max-150px
w-max-160px, w-max-170px, w-max-180px, w-max-190px, w-max-200px
w-max-210px, w-max-220px, w-max-230px, w-max-240px, w-max-250px
w-max-260px, w-max-270px, w-max-280px, w-max-290px, w-max-300px
```

### 300px até 900px (intervalo de 50px)

```
w-max-350px, w-max-400px, w-max-450px, w-max-500px
w-max-550px, w-max-600px, w-max-650px, w-max-700px
w-max-750px, w-max-800px, w-max-850px, w-max-900px
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
