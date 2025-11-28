# FilterDropdown Component

Componente de dropdown de filtro com suporte a seleção múltipla, comportamento responsivo (dropdown no desktop, modal fullscreen no mobile) e integração com variáveis CSS do sistema de design.

## Uso Básico

```tsx
import { FilterDropdown } from '@/components/shared/Repository-Toolbar/Filter-Dropdown';

const [filter, setFilter] = useState(['all']);

<FilterDropdown
  label="Type"
  value={filter}
  options={[
    { value: 'sources', label: 'Sources' },
    { value: 'forks', label: 'Forks' },
    { value: 'archived', label: 'Archived' },
  ]}
  onChange={setFilter}
/>
```

## Comportamento de Seleção

O componente suporta seleção múltipla com lógica especial para o valor `'all'`:

- Quando `'all'` está selecionado, todos os outros filtros são desmarcados
- Selecionar qualquer opção remove `'all'` automaticamente
- Se todas as opções forem desmarcadas, `'all'` é automaticamente selecionado
- O label do botão mostra a contagem quando há filtros ativos: `"Type (2)"`

```tsx
// Estado inicial
const [filter, setFilter] = useState(['all']);

// Após selecionar "Sources" e "Forks"
// filter = ['sources', 'forks']
// Botão mostra: "Type (2)"

// Ao desmarcar todos
// filter = ['all']
// Botão mostra: "Type"
```

## Comportamento Responsivo

### Desktop/Tablet
- Dropdown tradicional posicionado abaixo do botão
- Overlay escuro ao clicar
- Fecha ao clicar fora ou em uma opção

### Mobile
- Modal fullscreen com header e botão de fechar
- Título exibido no header
- Botão de fechar usa cor `--close-button-color` (#FE354D)
- Background usa variável `--dropdown-bg`

## Props

| Prop      | Type                              | Default | Descrição                                    |
| --------- | --------------------------------- | ------- | -------------------------------------------- |
| `label`   | `string`                          | -       | Label do botão (obrigatório)                 |
| `value`   | `string[]`                        | `[]`    | Array de valores selecionados                |
| `options` | `{ value: string; label: string }[]` | `[]` | Opções disponíveis para seleção              |
| `onChange` | `(value: string[]) => void`   | -       | Callback chamado quando a seleção muda       |

## Variáveis CSS Utilizadas

O componente usa as seguintes variáveis CSS do sistema de design:

- `--dropdown-bg`: Background do dropdown/modal
- `--dropdown-border`: Borda do dropdown (desktop)
- `--dropdown-hover`: Cor de hover dos itens
- `--close-button-color`: Cor do botão de fechar (mobile)

## Exemplos de Uso Real

### Filtro de Tipo de Repositório

```tsx
const [typeFilter, setTypeFilter] = useState(['all']);

<FilterDropdown
  label="Type"
  value={typeFilter}
  options={[
    { value: 'sources', label: 'Sources' },
    { value: 'forks', label: 'Forks' },
    { value: 'archived', label: 'Archived' },
    { value: 'mirrors', label: 'Mirrors' },
  ]}
  onChange={setTypeFilter}
/>
```

### Filtro de Linguagem

```tsx
const [languageFilter, setLanguageFilter] = useState(['all']);
const languages = [
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'Python', label: 'Python' },
];

<FilterDropdown
  label="Language"
  value={languageFilter}
  options={languages}
  onChange={setLanguageFilter}
/>
```

## Integração com RepositoryToolbar

O `FilterDropdown` é tipicamente usado dentro do `RepositoryToolbar`:

```tsx
<RepositoryToolbar
  showFilters={true}
  typeLabel="Type"
  typeFilter={typeFilter}
  onTypeFilterChange={setTypeFilter}
  typeOptions={typeOptions}
  languageLabel="Language"
  languageFilter={languageFilter}
  onLanguageFilterChange={setLanguageFilter}
  languageOptions={languageOptions}
/>
```

