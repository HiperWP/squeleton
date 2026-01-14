# Counter-Up2 Reference

Efeito de contagem animada que exibe números aumentando gradualmente até um valor final. Ideal para estatísticas, metas ou resultados.

## Marcação HTML

```html
<div id="view-counter">
    <!-- Viewport da Contagem -->
    <div class="stat-card p-25-all border-rd-8 text-center h-100">
        <div class="animated-number">400+</div> <!-- Inicia Contagem -->
        <div>Classes Utilitárias</div>
    </div>
    <div class="stat-card p-25-all border-rd-8 text-center h-100">
        <div class="animated-number">300+</div> <!-- Inicia Contagem -->
        <div>Ícones Vetoriais</div>
    </div>
</div>
```

## O que podemos contar?

- **Flutuadores**: 1.234
- **Inteiros**: 1234
- **Com vírgulas**: 1,234.56
- **Vírgulas e pontos**: 12.345,67
- **Com caracteres não numéricos**: $1,234.56
- **Vários valores contáveis**: 168 horas de 10.080 minutos com 604.800 segundos

## JS de configuração

```html
<script>
    var viewCounter = document.getElementById('view-counter');
    if (viewCounter) {
        const counterUp = window.counterUp.default;
        const counterCall = entries => {
            entries.forEach(entry => {
                const el = entry.target
                if (entry.isIntersecting && !el.classList.contains('is-visible')) {
                    for (const counter of counters) {
                        counterUp(counter, {
                            duration: 1000,
                            delay: 16,
                        })
                        el.classList.add('is-visible')
                    }
                }
            })
        }

        // Get all animated numbers
        const counters = document.querySelectorAll('.animated-number');

        // Intersection Observer
        const IO = new IntersectionObserver(counterCall, { threshold: 1 });
        IO.observe(viewCounter);
    }
</script>
```

## Opções

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `duration` | number | 1000 | Duração da animação em ms |
| `delay` | number | 16 | Delay entre cada frame |

## Exemplo Completo

```html
<!-- Container com ID para o observer -->
<div id="stats-section" class="f-grid f-gap-20">
    <div class="w-25 sm-w-50 xs-w-100">
        <div class="text-center">
            <div class="animated-number text-4xl font-bold">1500+</div>
            <div>Clientes Satisfeitos</div>
        </div>
    </div>
    <div class="w-25 sm-w-50 xs-w-100">
        <div class="text-center">
            <div class="animated-number text-4xl font-bold">99.9%</div>
            <div>Uptime</div>
        </div>
    </div>
</div>

<script>
    var statsSection = document.getElementById('stats-section');
    if (statsSection) {
        const counterUp = window.counterUp.default;
        const counters = document.querySelectorAll('.animated-number');

        const counterCall = entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('is-visible')) {
                    for (const counter of counters) {
                        counterUp(counter, { duration: 1000, delay: 16 })
                    }
                    entry.target.classList.add('is-visible')
                }
            })
        }

        const IO = new IntersectionObserver(counterCall, { threshold: 1 });
        IO.observe(statsSection);
    }
</script>
```
