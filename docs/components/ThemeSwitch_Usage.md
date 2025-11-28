# ThemeSwitch Component

Componente de toggle para alternar entre temas claro e escuro, com suporte a dois modos de exibição: header (padrão) e floating (mobile). Usa Framer Motion para animações suaves e sincroniza estado via `next-themes`.

## Uso Básico

### No Header (Desktop/Tablet)

```tsx
import { ThemeSwitch } from '@/components/shared/Header/Theme-Switch';

<ThemeSwitch />
// ou explicitamente
<ThemeSwitch floating={false} />
```

### Floating (Mobile)

```tsx
<ThemeSwitch floating={true} />
```

## Comportamento Responsivo

### Header Mode (floating={false})
- Exibido no header da aplicação
- Visível apenas em desktop/tablet (`md:` breakpoint)
- Oculto no mobile

### Floating Mode (floating={true})
- Posicionado fixo no canto inferior direito
- Visível apenas no mobile (`md:hidden`)
- Z-index alto (`z-50`) para ficar acima de outros elementos
- Shadow para destaque

## Sincronização

Ambos os switches (header e floating) compartilham o mesmo estado via `next-themes`, então:
- Alterar o tema em um switch atualiza o outro automaticamente
- O estado persiste entre sessões
- Suporta `system` theme (detecta preferência do sistema)

## Props

| Prop       | Type      | Default | Descrição                                    |
| ---------- | --------- | ------- | -------------------------------------------- |
| `floating` | `boolean` | `false` | Se o switch deve ser exibido como floating  |
| `className` | `string` | -       | Classes CSS adicionais                       |

## Animações

O componente usa Framer Motion para animar o toggle:
- Transição suave do círculo interno
- Animação tipo `spring` com `stiffness: 500` e `damping: 30`
- Ícones de sol/lua com transição de opacidade

## Estados Visuais

### Light Mode
- Background: `bg-gray-300`
- Ícone: Sol amarelo (`text-yellow-500`)
- Posição do toggle: Esquerda (`x: 4`)

### Dark Mode
- Background: `bg-gray-800`
- Ícone: Lua (`text-gray-800`)
- Posição do toggle: Direita (`x: 36`)

## Exemplos de Uso Real

### Layout com Header e Floating

```tsx
// app/[locale]/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header /> {/* Contém ThemeSwitch floating={false} */}
        {children}
        <ThemeSwitch floating={true} /> {/* Para mobile */}
      </body>
    </html>
  );
}
```

### Apenas Header

```tsx
<header>
  <ThemeSwitch />
</header>
```

### Apenas Floating

```tsx
<div>
  {children}
  <ThemeSwitch floating={true} />
</div>
```

## Notas de Implementação

- O componente usa `startTransition` para evitar bloqueios durante a hidratação
- Renderiza um placeholder durante o mount para evitar flash de conteúdo incorreto
- O floating switch requer `padding-bottom` no conteúdo principal para não cobrir elementos

