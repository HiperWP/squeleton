# VanJS Persistent State Helpers

Funções auxiliares para gerenciar estado persistente no VanJS, mantendo valores automaticamente sincronizados com localStorage/sessionStorage.

### `persistentItem(key, defaultValue, options)`

Cria um estado reativo do VanJS que persiste automaticamente no storage.

**Parâmetros:**
- `key` (string): Chave única para armazenar o valor
- `defaultValue` (any): Valor padrão caso não exista no storage
- `options` (object): Configurações opcionais

**Opções disponíveis:**
```javascript
{
  storage: localStorage,        // ou sessionStorage
  serialize: JSON.stringify,     // função de serialização
  deserialize: JSON.parse,       // função de deserialização
  validate: null,                // função de validação (value) => boolean
  onError: console.error         // handler de erros
}
```

**Retorna:** Um estado VanJS com método `.clear()` adicional

---

### `persistentGroup(prefix, defaults, options)`

Cria um grupo de estados persistentes relacionados com um prefixo comum.

**Parâmetros:**
- `prefix` (string): Prefixo para as chaves (será adicionado como `prefix_key`)
- `defaults` (object): Objeto com pares chave/valor padrão
- `options` (object): Mesmas opções do `persistentItem`

**Retorna:** Objeto com estados e método `.clearAll()`

**Quando usar cada função:**
- Use `persistentItem` para valores únicos (contador, flag, array de itens, etc.)
- Use `persistentGroup` quando precisar acessar múltiplos valores separadamente (formulário, configurações, etc.)

## Exemplos de Uso

### Exemplo Básico

```javascript
// Criar um contador persistente
const counter = persistentItem('myCounter', 0)

// Usar no componente
const CounterApp = () => div(
  button({ onclick: () => counter.val++ }, '➕'),
  span(` Contador: ${counter.val} `),
  button({ onclick: () => counter.val-- }, '➖'),
  button({ onclick: () => counter.clear() }, '🗑️ Limpar')
)
```

### Exemplo com Like e Deslike

```javascript
// Contadores independentes de Like e Deslike
const counters = persistentGroup('counters', {
  likes: 0,
  deslikes: 0
})

const LikeDislikeApp = () => span(
  '👍 ', counters.likes, ' ',
  button({onclick: () => ++counters.likes.val}, '➕'),
  ' | ',
  '👎 ', counters.deslikes, ' ',
  button({onclick: () => ++counters.deslikes.val}, '➕'),
  ' ',
  button({onclick: () => counters.clearAll()}, '🗑️')
)
```

### Exemplo com Validação

```javascript
// Idade que só aceita valores entre 0 e 120
const age = persistentItem('userAge', 18, {
  validate: (value) => typeof value === 'number' && value >= 0 && value <= 120,
  onError: (msg, error) => {
    console.warn('Valor inválido detectado:', msg)
    // Aqui você pode mostrar uma notificação ao usuário
  }
})
```

### Exemplo com Configurações de Tema

```javascript
// Configurações de tema (use persistentGroup para acessar propriedades separadamente)
const theme = persistentGroup('theme', {
  mode: 'light',
  primaryColor: '#3b82f6',
  fontSize: 16
})

// Atualizar propriedades individuais é mais fácil
button({
  onclick: () => {
    theme.mode.val = theme.mode.val === 'light' ? 'dark' : 'light'
  }
}, 'Alternar Tema')
```

### Exemplo com SessionStorage

```javascript
// Contador temporário que será limpo ao fechar o navegador
const tempCounter = persistentItem('tempCounter', 0, {
  storage: sessionStorage
})

// Ou para múltiplos valores temporários
const sessionData = persistentGroup('session', {
  visitCount: 0,
  lastAction: ''
}, {
  storage: sessionStorage
})
```

### Exemplo com Grupo de Estados

```javascript
// Formulário de usuário com múltiplos campos
const userForm = persistentGroup('userForm', {
  name: '',
  email: '',
  age: 0,
  newsletter: false
})

// Usar no componente
const FormApp = () => div(
  input({
    value: userForm.name.val,
    oninput: e => userForm.name.val = e.target.value,
    placeholder: 'Nome'
  }),
  input({
    value: userForm.email.val,
    oninput: e => userForm.email.val = e.target.value,
    placeholder: 'Email'
  }),
  input({
    type: 'number',
    value: userForm.age.val,
    oninput: e => userForm.age.val = parseInt(e.target.value) || 0,
    placeholder: 'Idade'
  }),
  label(
    input({
      type: 'checkbox',
      checked: userForm.newsletter.val,
      onchange: e => userForm.newsletter.val = e.target.checked
    }),
    ' Receber newsletter'
  ),
  button({ onclick: () => userForm.clearAll() }, 'Limpar Tudo')
)
```

### Exemplo com Lista de Tarefas

```javascript
const todos = persistentItem('todoList', [])

const TodoApp = () => {
  const newTodo = van.state('')
  
  const addTodo = () => {
    if (newTodo.val.trim()) {
      todos.val = [...todos.val, {
        id: Date.now(),
        text: newTodo.val,
        done: false
      }]
      newTodo.val = ''
    }
  }
  
  const toggleTodo = (id) => {
    todos.val = todos.val.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
  }
  
  const removeTodo = (id) => {
    todos.val = todos.val.filter(todo => todo.id !== id)
  }
  
  return div(
    input({
      value: newTodo.val,
      oninput: e => newTodo.val = e.target.value,
      placeholder: 'Nova tarefa...'
    }),
    button({ onclick: addTodo }, 'Adicionar'),
    ul(
      todos.val.map(todo => 
        li(
          input({
            type: 'checkbox',
            checked: todo.done,
            onchange: () => toggleTodo(todo.id)
          }),
          span({
            style: () => todo.done ? 'text-decoration: line-through' : ''
          }, todo.text),
          button({ onclick: () => removeTodo(todo.id) }, '❌')
        )
      )
    ),
    todos.val.length > 0 && button({ onclick: () => todos.clear() }, 'Limpar Todas')
  )
}
```

### Exemplo com Carrinho de Compras

```javascript
const cart = persistentGroup('shoppingCart', {
  items: [],
  total: 0,
  coupon: ''
})

const addToCart = (product) => {
  cart.items.val = [...cart.items.val, product]
  cart.total.val = cart.items.val.reduce((sum, item) => sum + item.price, 0)
}

const CartApp = () => div(
  h2('Carrinho de Compras'),
  div(`Itens: ${cart.items.val.length}`),
  div(`Total: R$ ${cart.total.val.toFixed(2)}`),
  button({ onclick: () => cart.clearAll() }, 'Esvaziar Carrinho')
)
```

### Exemplo com Preferências de UI

```javascript
const uiPrefs = persistentGroup('ui', {
  sidebarOpen: true,
  darkMode: false,
  fontSize: 16,
  language: 'pt-BR'
})

// Aplicar preferências automaticamente
van.derive(() => {
  document.documentElement.style.fontSize = `${uiPrefs.fontSize.val}px`
  document.documentElement.classList.toggle('dark', uiPrefs.darkMode.val)
  document.documentElement.lang = uiPrefs.language.val
})

const SettingsPanel = () => div(
  label(
    input({
      type: 'checkbox',
      checked: uiPrefs.darkMode.val,
      onchange: e => uiPrefs.darkMode.val = e.target.checked
    }),
    ' Modo Escuro'
  ),
  label(
    'Tamanho da Fonte: ',
    input({
      type: 'range',
      min: 12,
      max: 24,
      value: uiPrefs.fontSize.val,
      oninput: e => uiPrefs.fontSize.val = parseInt(e.target.value)
    }),
    ` ${uiPrefs.fontSize.val}px`
  )
)
```

## Métodos Adicionais

### `.clear()`

Remove o item do storage e restaura o valor padrão:

```javascript
const counter = persistentItem('count', 0)
counter.val = 10
counter.clear()  // Remove do localStorage e volta para 0
```

### `.clearAll()`

Remove todos os itens de um grupo:

```javascript
const formData = persistentGroup('form', { name: '', email: '' })
formData.clearAll()  // Limpa todos os campos
```

## Tratamento de Erros

As funções lidam automaticamente com erros comuns:

- **Storage cheio:** O callback `onError` será chamado
- **Dados corrompidos:** O item será removido e o valor padrão usado
- **Validação falha:** O valor armazenado será descartado

```javascript
const counter = persistentItem('myCounter', 0, {
  onError: (message, error) => {
    console.error('Erro no estado persistente:', message, error)
    // Mostrar notificação ao usuário
    showNotification('Erro ao salvar dados', 'error')
  }
})
```

## Limitações do LocalStorage

- **Tamanho:** ~5-10MB por domínio
- **Sincronização:** Apenas strings (JSON.stringify é usado automaticamente)
- **Segurança:** Não use para dados sensíveis (tokens, senhas, etc.)
- **Performance:** Operações síncronas podem bloquear a UI com dados muito grandes
