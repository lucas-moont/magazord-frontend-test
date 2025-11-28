# Button Component

Componente de botão flexível e reutilizável com suporte a variantes, tamanhos, ícones e estilos customizados.

## Uso Básico

```tsx
import { Button } from '@/components/shared/Button';

// Botão simples
<Button>Click me</Button>

// Com variantes
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Com tamanhos
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## Com Ícones

```tsx
import { Button } from '@/components/shared/Button';
import { ChevronIcon } from '@/components/shared/ChevronIcon';

// Ícone à direita (padrão)
<Button icon={<ChevronIcon />}>
  Dropdown
</Button>

// Ícone à esquerda
<Button icon={<PlusIcon />} iconPosition="left">
  Add Item
</Button>

// Com ícone SVG customizado
<Button
  icon={
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  }
>
  Confirm
</Button>
```

## Props

| Prop           | Type                                               | Default     | Descrição                                        |
| -------------- | -------------------------------------------------- | ----------- | ------------------------------------------------ |
| `children`     | `ReactNode`                                        | -           | Conteúdo do botão (obrigatório)                  |
| `variant`      | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Estilo visual do botão                           |
| `size`         | `'sm' \| 'md' \| 'lg'`                             | `'md'`      | Tamanho do botão                                 |
| `icon`         | `ReactNode`                                        | -           | Ícone a ser exibido                              |
| `iconPosition` | `'left' \| 'right'`                                | `'right'`   | Posição do ícone                                 |
| `fullWidth`    | `boolean`                                          | `false`     | Se o botão deve ocupar toda a largura disponível |
| `className`    | `string`                                           | -           | Classes CSS adicionais                           |

Além disso, aceita todas as props nativas de `HTMLButtonElement` como `onClick`, `disabled`, `type`, etc.

## Exemplos de Uso Real

### Dropdown Button

```tsx
<Button onClick={() => setIsOpen(!isOpen)} icon={<ChevronIcon isOpen={isOpen} />}>
  Filter Options
</Button>
```

### Action Button

```tsx
<Button variant="secondary" size="sm" onClick={handleSave}>
  Save Changes
</Button>
```

### Full Width Button

```tsx
<Button fullWidth variant="primary">
  Submit Form
</Button>
```
