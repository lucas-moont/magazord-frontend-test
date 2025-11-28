# RepositoryToolbar Component

Componente composto que orquestra a barra de busca e os filtros de repositórios, com layout responsivo complexo que se adapta a mobile, tablet e desktop.

## Uso Básico

```tsx
import { RepositoryToolbar } from '@/components/shared/Repository-Toolbar';

<RepositoryToolbar
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
  onSearchSubmit={handleSearch}
  searchPlaceholder="Search repositories..."
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

## Layout Responsivo

### Mobile
- Filtros e search bar em linha horizontal
- Filtros à esquerda, search bar à direita
- Background cinza claro (`bg-gray-bg`) no wrapper
- Padding e border-radius aplicados

### Tablet (md)
- Layout em coluna
- Filtros acima do search bar
- Sem background no wrapper
- Search bar ocupa toda a largura

### Desktop (lg)
- Layout em linha horizontal
- Search bar à esquerda, filtros à direita
- Sem background no wrapper

## Props

### Search (Obrigatórias)

| Prop              | Type                        | Descrição                          |
| ----------------- | --------------------------- | ---------------------------------- |
| `searchQuery`     | `string`                    | Valor atual da busca               |
| `onSearchChange`  | `(value: string) => void`   | Callback quando o valor muda        |
| `onSearchSubmit`  | `(value: string) => void`   | Callback quando Enter é pressionado |
| `searchPlaceholder` | `string`                 | Placeholder do input de busca      |

### Filters (Opcionais)

| Prop                    | Type                              | Default | Descrição                        |
| ----------------------- | --------------------------------- | ------- | -------------------------------- |
| `showFilters`           | `boolean`                         | `false` | Se os filtros devem ser exibidos |
| `typeLabel`             | `string`                         | -       | Label do filtro de tipo          |
| `typeFilter`            | `string[]`                       | -       | Valores selecionados do tipo     |
| `onTypeFilterChange`    | `(value: string[]) => void`      | -       | Callback de mudança do tipo      |
| `typeOptions`           | `{ value: string; label: string }[]` | `[]` | Opções do filtro de tipo         |
| `languageLabel`         | `string`                         | -       | Label do filtro de linguagem     |
| `languageFilter`        | `string[]`                       | -       | Valores selecionados de linguagem|
| `onLanguageFilterChange` | `(value: string[]) => void`     | -       | Callback de mudança de linguagem |
| `languageOptions`       | `{ value: string; label: string }[]` | `[]` | Opções do filtro de linguagem    |

### Outras

| Prop        | Type     | Descrição                    |
| ----------- | -------- | ---------------------------- |
| `className` | `string` | Classes CSS adicionais       |

## Exemplos de Uso Real

### Com Filtros

```tsx
const [searchQuery, setSearchQuery] = useState('');
const [typeFilter, setTypeFilter] = useState(['all']);
const [languageFilter, setLanguageFilter] = useState(['all']);

const typeOptions = [
  { value: 'sources', label: 'Sources' },
  { value: 'forks', label: 'Forks' },
  { value: 'archived', label: 'Archived' },
];

const languageOptions = [
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'JavaScript', label: 'JavaScript' },
];

<RepositoryToolbar
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
  onSearchSubmit={(query) => handleSearch(query)}
  searchPlaceholder="Search repositories..."
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

### Apenas Busca (Sem Filtros)

```tsx
<RepositoryToolbar
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
  onSearchSubmit={handleSearch}
  searchPlaceholder="Search..."
  showFilters={false}
/>
```

## Variáveis CSS Utilizadas

- `--gray-bg`: Background do wrapper no mobile (`0 0% 97.25%`)

## Comportamento do SearchBar

O `SearchBar` interno se adapta ao layout:
- **Mobile**: Ícone à direita, placeholder menor (`text-sm`)
- **Desktop/Tablet**: Ícone à esquerda, placeholder maior (`md:text-lg`)

