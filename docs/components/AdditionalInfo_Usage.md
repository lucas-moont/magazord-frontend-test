# AdditionalInfo Component

Componente colapsável para exibir informações adicionais, com comportamento específico para mobile (colapsável) e desktop (sempre visível). Usa variáveis CSS customizadas para adaptação ao dark mode.

## Uso Básico

```tsx
import { AdditionalInfo } from '@/components/shared/Additional-Info';

<AdditionalInfo>
  <div>Informação adicional 1</div>
  <div>Informação adicional 2</div>
</AdditionalInfo>;
```

## Comportamento Responsivo

### Desktop/Tablet

- Sempre visível e expandido
- Sem botão de toggle
- Sem background especial

### Mobile

- Inicialmente oculto (colapsado)
- Botão de toggle com chevron animado
- Ao expandir, mostra background `--additional-info-bg`
- Padding e border-radius quando expandido

## Props

| Prop                  | Type        | Default | Descrição                                                 |
| --------------------- | ----------- | ------- | --------------------------------------------------------- |
| `children`            | `ReactNode` | -       | Conteúdo a ser exibido (obrigatório)                      |
| `title`               | `string`    | -       | Título do botão de toggle (usa tradução se não fornecido) |
| `defaultOpen`         | `boolean`   | `false` | Se o componente deve iniciar expandido no mobile          |
| `collapsibleOnMobile` | `boolean`   | `true`  | Se o componente deve ser colapsável no mobile             |
| `className`           | `string`    | -       | Classes CSS adicionais                                    |

## Variáveis CSS Utilizadas

- `--additional-info-bg`: Background quando expandido no mobile
  - Light mode: `#F8F8F8`
  - Dark mode: `#2d2d2d`

## Exemplos de Uso Real

### Informações do Perfil

```tsx
<AdditionalInfo>
  {user.company && (
    <a href={`https://github.com/${user.company.replace('@', '')}`}>
      <Icon icon="lucide:building-2" />
      <span>{user.company}</span>
    </a>
  )}
  {user.location && (
    <div>
      <Icon icon="lucide:map-pin" />
      <span>{user.location}</span>
    </div>
  )}
  {user.blog && (
    <a href={user.blog}>
      <Icon icon="lucide:link" />
      <span>{user.blog}</span>
    </a>
  )}
</AdditionalInfo>
```

### Com Título Customizado

```tsx
<AdditionalInfo title="Detalhes Adicionais">
  <div>Conteúdo customizado</div>
</AdditionalInfo>
```

### Sempre Visível (Não Colapsável)

```tsx
<AdditionalInfo collapsibleOnMobile={false}>
  <div>Conteúdo sempre visível</div>
</AdditionalInfo>
```

### Iniciar Expandido no Mobile

```tsx
<AdditionalInfo defaultOpen={true}>
  <div>Conteúdo que inicia expandido</div>
</AdditionalInfo>
```
