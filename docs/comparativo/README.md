# Squeleton: Estudo Comparativo com Frameworks CSS

## Introdução

Este documento apresenta uma análise comparativa do Squeleton em relação aos principais frameworks CSS utilizados no desenvolvimento de interfaces web: Bootstrap, Tailwind CSS, Pico CSS e Bulma. O estudo avalia aspectos técnicos como tamanho de arquivos, dependências, arquitetura de grid, funcionalidades inclusas e casos de uso.

Os dados apresentados foram coletados a partir da documentação oficial de cada projeto e medições de tamanho de arquivo em formato gzip, padrão de transferência utilizado por CDNs. O objetivo é fornecer informações objetivas para auxiliar na escolha de ferramentas adequadas a diferentes contextos de desenvolvimento.

### Metodologia

- **Tamanho dos arquivos**: medido em formato gzip (compressão padrão de CDNs)
- **Funcionalidades**: catalogadas a partir da documentação oficial de cada projeto
- **Arquitetura técnica**: analisada através do código-fonte disponível publicamente

---

## Visão Geral Comparativa

| Aspecto | Bootstrap | Bulma | Tailwind | Pico | Squeleton |
|---------|-----------|-------|----------|------|-----------|
| **Lançamento** | 2011 | 2016 | 2017 | 2021 | 2025 |
| **Tamanho (gzip)** | ~70KB (CSS) + ~60KB (JS) | ~25KB | ~30KB* | ~10KB | ~55KB (CSS+JS) |
| **Build step** | Opcional | Não requer | Recomendado | Não requer | Não requer |
| **Filosofia** | Components + Vanilla JS | Components | Utility-first | Classless/Semantic | Utility + Vanilla JS |
| **Grid** | 12 colunas, margens negativas | 12 colunas | Flex/Grid utilities | CSS Grid básico (limitado) | 12 colunas, flexbox gap |
| **JS incluso** | Componentes próprios | Não inclui | Não inclui | Não inclui | 9 micro-bibliotecas |
| **Customização** | Sass variables | Sass variables | Config + purge | CSS variables | CSS variables externo |

*\*Tailwind após purge/minificação; sem processamento, o arquivo completo ultrapassa 3MB*

---

## Bootstrap

**Lançamento:** 2011 | **Licença:** MIT

Bootstrap é o framework CSS mais utilizado globalmente, com ampla documentação e ecossistema de temas e plugins.

| Característica | Observação |
|----------------|------------|
| Tamanho CSS | ~70KB gzip |
| Tamanho JS | ~60KB gzip |
| Sistema de grid | 12 colunas com margens negativas, gap via `.g-0` a `.g-5` (6 valores) |
| Componentes visuais | Inclusos e estilizados (botões, cards, modais, navegação) |
| Design visual (cores/fontes) | Tema padrão incluso, customizável via Sass |
| Tipografia | `.fs-1` a `.fs-6` (6 tamanhos fixos), `.fw-bold`, `.fw-light`, `.lh-1` a `.lh-lg` |
| Margin/Padding | `.p-{0-5}`, `.m-{0-5}` (6 valores), direções: `t`, `b`, `s`, `e`, `x`, `y` |
| Pré-processador | Sass (opcional) |
| Atualizações | Versões maiores frequentemente introduzem breaking changes |

## Bulma

**Lançamento:** 2016 | **Licença:** MIT

Bulma oferece componentes visuais prontos com nomenclatura legível, sem dependência de JavaScript.

| Característica | Observação |
|----------------|------------|
| Tamanho | ~25KB gzip |
| Sistema de grid | 12 colunas flexbox, gap via variável `$column-gap` (Sass) |
| JavaScript | Não inclui |
| Componentes visuais | Inclusos e estilizados (botões, cards, navegação) |
| Design visual (cores/fontes) | Tema padrão incluso, customizável via Sass |
| Tipografia | `.is-size-1` a `.is-size-7` (7 tamanhos fixos), `.has-text-weight-*` |
| Margin/Padding | `.p-{0-6}`, `.m-{0-6}` (7 valores), direções: `t`, `b`, `l`, `r` |
| Interatividade | Requer JavaScript adicional para componentes dinâmicos |

## Tailwind CSS

**Lançamento:** 2017 | **Licença:** MIT

Tailwind popularizou a abordagem utility-first, onde estilos são aplicados através de classes atômicas diretamente no HTML.

| Característica | Observação |
|----------------|------------|
| Tamanho (após purge) | ~30KB gzip |
| Tamanho (sem purge) | ~3MB+ |
| Sistema de grid | Classes utilitárias flex/grid, gap via `gap-0` a `gap-96` |
| Componentes visuais | Via composição de utilitários |
| Design visual (cores/fontes) | Configurável via `tailwind.config.js` |
| Tipografia | `.text-xs` a `.text-9xl`, `.font-thin` a `.font-black`, `.tracking-*`, `.leading-*` |
| Margin/Padding | `.p-{0-96}`, `.m-{0-96}` (30+ valores), direções: `t`, `b`, `l`, `r`, `x`, `y` |
| Build step | Recomendado para remoção de classes não utilizadas |
| Verbosidade | Classes múltiplas por elemento (ex: `flex items-center justify-between px-4 py-2`) |

## Pico CSS

**Lançamento:** 2021 | **Licença:** MIT

Pico adota abordagem classless/semantic, onde elementos HTML recebem estilos automaticamente sem necessidade de classes.

| Característica | Observação |
|----------------|------------|
| Tamanho | ~10KB gzip |
| Sistema de grid | CSS Grid básico (auto-layout apenas, sem breakpoints ou colunas definidas) |
| JavaScript | Não inclui |
| Componentes visuais | Estilização automática de elementos semânticos |
| Design visual (cores/fontes) | Tema padrão incluso, customizável via CSS variables |
| Tipografia | Automático por elemento semântico |
| Margin/Padding | Automático por elemento semântico |
| Controle fino | Limitado pela natureza classless |

*A documentação oficial do Pico recomenda o uso de bibliotecas externas como Bootstrap Grid ou Flexbox Grid para layouts complexos.*

## Squeleton

**Lançamento:** 2025 | **Licença:** MIT

Squeleton combina classes utilitárias com bibliotecas JavaScript vanilla integradas, focando em manutenção de longo prazo e ausência de build step.

| Característica | Observação |
|----------------|------------|
| Tamanho total | ~55KB gzip (CSS + JS) |
| Sistema de grid | 12 colunas com flexbox gap nativo, `.gap-0` a `.gap-50` (11 valores, intervalo de 5px) |
| JavaScript | 9 micro-bibliotecas integradas |
| Build step | Não requer |
| Componentes visuais | Via composição de utilitários |
| Design visual (cores/fontes) | Agnóstico (definido externamente via CSS variables) |
| Tipografia | `.fs-1` a `.fs-16` (6 fixos + 10 fluidos com `clamp()`), `.fw-*`, `.ls-*`, `.lh-*` |
| Margin/Padding | `.p-{5-100}-{dir}`, `.m-{5-100}-{dir}` (valores em pixels), direções: `t`, `b`, `l`, `r`, `tb`, `lr`, `all` |

---

## Comparativo Técnico: Abordagem Responsiva

| Framework | Abordagem | Implementação |
|-----------|-----------|---------------|
| Bootstrap | Mobile-first | `min-width` media queries |
| Tailwind | Mobile-first | `min-width` media queries |
| Bulma | Mobile-first | `min-width` media queries |
| Pico | Mobile-first | `min-width` media queries |
| Squeleton | Híbrida | Grid: `min-width` / Utilities: `max-width` |

O Squeleton utiliza uma abordagem híbrida: o sistema de grid segue mobile-first (`min-width`), enquanto classes utilitárias seguem desktop-first (`max-width`). Esta combinação é única entre os frameworks analisados. Essa abordagem é justificada por permitir praticidade no desenvolvimento, onde naturalmente grids empilham no mobile e utilitários são ajustados apenas onde necessário para telas menores.

---

## Bibliotecas JavaScript Integradas

Apenas Bootstrap e Squeleton incluem JavaScript como parte do pacote padrão.

### Bootstrap JS (~60KB gzip)

Componentes próprios para: modais, dropdowns, tooltips, popovers, collapse, carousel, offcanvas, tabs, toasts, scrollspy.

### Squeleton JS (~30KB gzip)

9 micro-bibliotecas de terceiros integradas:

| Biblioteca | Função | Tamanho aproximado |
|------------|--------|-------------------|
| HTMX | Requisições AJAX via atributos HTML | ~10KB |
| VanJS | Reatividade minimalista | ~1KB |
| Embla Carousel | Carrossel com suporte a touch | ~7KB |
| a11y-dialog | Modais acessíveis (WCAG) | ~2KB |
| VenoBox 2 | Lightbox para mídia | ~5KB |
| Toastify | Notificações toast | ~2KB |
| Counter-Up2 | Animação de contagem numérica | ~1KB |
| js-cookie | Gerenciamento de cookies | ~1KB |
| WOW2 | Animações acionadas por scroll | ~2KB |

### Comparativo de Funcionalidades JS

| Funcionalidade | Bootstrap | Squeleton | Tailwind/Bulma/Pico |
|----------------|-----------|-----------|---------------------|
| Modais | Incluído | Incluído (a11y-dialog) | Não incluído |
| Carrossel | Incluído | Incluído (Embla) | Não incluído |
| AJAX declarativo | Não incluído | Incluído (HTMX) | Não incluído |
| Reatividade | Não incluído | Incluído (VanJS) | Não incluído |
| Lightbox | Não incluído | Incluído (VenoBox) | Não incluído |
| Toasts | Incluído | Incluído (Toastify) | Não incluído |

---

## Elementos de Design Incorporados

### Ícones

| Framework | Ícones inclusos | Observação |
|-----------|-----------------|------------|
| Bootstrap | Não (Bootstrap Icons separado) | Pacote adicional ~80KB |
| Tailwind | Não (Heroicons separado) | Pacote adicional |
| Bulma | Não | Requer biblioteca externa |
| Pico | Não | Requer biblioteca externa |
| Squeleton | 300+ ícones integrados | Via classes CSS (`iccon-*`) |

### Animações

| Framework | Animações inclusas | Observação |
|-----------|-------------------|------------|
| Bootstrap | Transições básicas | Fade, collapse |
| Tailwind | Classes de transição | Requer configuração |
| Bulma | Não | Requer biblioteca externa |
| Pico | Não | Requer biblioteca externa |
| Squeleton | 30+ animações | Integração com WOW.js pattern |

### Tooltips

| Framework | Tooltips | Implementação |
|-----------|----------|---------------|
| Bootstrap | JavaScript | Requer inicialização |
| Tailwind | Não incluído | Requer biblioteca externa |
| Bulma | Não incluído | Requer biblioteca externa |
| Pico | Não incluído | Requer biblioteca externa |
| Squeleton | CSS puro | Balloon.css integrado |

---

## Origens e Influências Técnicas

A análise do código-fonte e documentação do Squeleton revela influências de diferentes frameworks:

| Origem | Elemento incorporado | Implementação no Squeleton |
|--------|---------------------|---------------------------|
| Bootstrap | Grid de 12 colunas | Classes `c-xs-*`, `c-sm-*`, `c-md-*`, `c-lg-*` |
| Bootstrap | Estrutura container/row | `.container`, `.row` |
| Bootstrap | Classes de display | `d-flex`, `d-block`, `d-none` |
| Tailwind | Filosofia utility-first | Classes atômicas de espaçamento e layout |
| Tailwind | Nomenclatura descritiva | Valor na classe reflete pixels (`p-20-all` = 20px) |
| Pico | Reset semântico | Elementos `body`, `main`, `section` pré-estilizados |
| Pico | Agnosticismo visual | Sem cores ou fontes impostas |
| Bulma | Nomenclatura legível | Classes autodescritivas (`border-rd-8`, `fw-700`) |
| Animate.css | Nomes de animação | `fadeIn`, `fadeInUp`, `bounceIn`, `zoomIn` |
| HTMX | Filosofia hypermedia | Integração direta da biblioteca |

---

## Diferenciadores Técnicos do Squeleton

### Sistema Responsivo Híbrido

Único entre os frameworks analisados a combinar:
- Grid com media queries `min-width` (mobile-first)
- Utilities com media queries `max-width` (desktop-first)

### Nomenclatura de Espaçamento

| Tailwind | Squeleton | Resultado |
|----------|-----------|-----------|
| `pt-4 pb-4` | `p-20-tb` | padding top e bottom |
| `px-4` | `p-20-lr` | padding left e right |
| `p-4` | `p-20-all` | padding todos os lados |
| `mt-4` | `m-20-t` | margin top |

O Squeleton utiliza valores em pixels diretamente na classe, enquanto Tailwind usa escala numérica abstrata.

### Escala Tipográfica

- Classes `fs-1` a `fs-6`: valores fixos (10px a 15px)
- Classes `fs-7` a `fs-16`: valores fluidos com `clamp()`

### Elementos Base Pré-configurados

Os elementos `body`, `main` e `section` são definidos como flex containers com `flex-direction: column`, reduzindo declarações repetitivas.

---

## Comparativo de Tamanho: Stack Equivalente

Para atingir funcionalidades equivalentes às oferecidas pelo Squeleton (CSS + Grid + Modais + Carrossel + Interatividade Reativa + Toasts + Lightbox), seria necessário:

| Componente | Alternativa comum | Tamanho aproximado |
|------------|-------------------|-------------------|
| Framework CSS | Tailwind (purged) | ~30KB |
| Modais | Micromodal | ~2KB |
| Carrossel | Swiper | ~40KB |
| Interatividade/AJAX | React ou Vue | ~45KB (React) / ~33KB (Vue) |
| Toasts | Notyf | ~3KB |
| Lightbox | GLightbox | ~10KB |
| **Total** | | **~130KB+ (com React)** |

| Componente | Squeleton | Tamanho |
|------------|-----------|---------|
| Pacote completo | CSS + JS | **~55KB** |

---

## Fontes

- Bootstrap: https://getbootstrap.com/docs/
- Tailwind CSS: https://tailwindcss.com/docs/
- Pico CSS: https://picocss.com/docs/
- Bulma: https://bulma.io/documentation/
- Squeleton: https://squeleton.dev/
- HTMX: https://htmx.org/docs/
- VanJS: https://vanjs.org/
- Embla Carousel: https://www.embla-carousel.com/
- a11y-dialog: https://a11y-dialog.netlify.app/
