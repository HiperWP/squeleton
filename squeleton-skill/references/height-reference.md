# Height Reference

## Height - Pixels

Padrão: `{breakpoint-}h-{valor}px`

### Valores pequenos

```
h-1px, h-5px, h-10px, h-50px
```

### 50px até 700px (intervalo de 50px)

```
h-50px, h-100px, h-150px, h-200px, h-250px
h-300px, h-350px, h-400px, h-450px, h-500px
h-550px, h-600px, h-650px, h-700px
```

### Responsivos

```
xs-h-{valor}px (mesmo padrão)
sm-h-{valor}px (mesmo padrão)
md-h-{valor}px (mesmo padrão)
```

## Height - Percentual e Especiais

**Importante**: Todas as classes de height percentual usam `min-height` (não `height`) para melhor compatibilidade.

```
h-50 (min-height: 50%)
h-100 (min-height: 100%)
h-100vh (min-height: 100vh) - altura total da viewport
h-auto (min-height: auto) - remove min-height
```

### Responsivos

```
md-h-50, md-h-100, md-h-auto
sm-h-50, sm-h-100, sm-h-auto
xs-h-50, xs-h-100, xs-h-auto
```

## Exemplos de Uso

```html
<!-- Altura fixa -->
<div class="h-300px">300px de altura</div>

<!-- Altura 100vh para seção hero -->
<section class="h-100vh d-flex f-items-center">
    Hero Section
</section>

<!-- Altura 100% do container -->
<div class="h-100">Preenche o container</div>

<!-- Altura responsiva -->
<div class="xs-h-200px md-h-400px">Altura adaptativa</div>

<!-- Equalizar altura de cards -->
<div class="min-line-3">Título do card com altura mínima</div>
```
