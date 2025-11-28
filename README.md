# GitHub Profile

![GitHub Profile Screenshot](/screenshots/profile-page.png)

> _Screenshot: Página principal do perfil_

## 📋 Sobre o Projeto

Interface de perfil do GitHub, desenvolvido como teste técnico. O projeto carrega dados dinâmicamente da GitHub API, permitindo visualizar repositórios, favoritos, realizar buscas e aplicar filtros.

**Usuário utilizado**: [lucas-moont](https://github.com/lucas-moont)

> **Nota**: Para alterar o usuário visualizado, edite a constante `GITHUB_USERNAME` no arquivo `domain/github/const.ts`.

## ✨ Funcionalidades Principais

### 🔍 Busca e Filtros Avançados

- **Busca em tempo real** de repositórios por nome/descrição
- **Filtros múltiplos**:
  - Por tipo: Sources, Forks, Archived, Mirrors
  - Por linguagem de programação (seleção múltipla)
- Interface de filtros com checkboxes e overlay visual

### 📄 Paginação Inteligente

- **10 repositórios por página** para melhor performance
- Navegação com botões anterior/próximo
- Números de página com ellipsis (...) para grandes listas
- Reset automático ao trocar filtros ou realizar buscas
- Estado de paginação gerenciado globalmente

### 🌍 Internacionalização (i18n)

- Suporte a **3 idiomas**: Português, Inglês e Espanhol
- Detecção automática do idioma do navegador
- Todas as strings traduzidas (UI, mensagens, labels)

### 🎨 Interface Responsiva

- Design adaptável para desktop, tablet e mobile
- Componentes reutilizáveis e acessíveis
- Ícones via Iconify

## 🚀 Tecnologias Utilizadas

- **Framework**: Next.js 16+ (App Router)
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS 4
- **Gerenciamento de Estado**: Zustand
- **Cache e Data Fetching**: React Query (@tanstack/react-query)
- **Internacionalização**: next-intl
- **Tema**: next-themes
- **Animações**: Framer Motion
- **HTTP Client**: Axios
- **Testes**: Vitest + Testing Library
- **Deploy**: Vercel

## 🏗️ Arquitetura

O projeto implementa uma **arquitetura em camadas (Layered Architecture)** com forte inspiração em **Clean Architecture** e **Domain-Driven Design (DDD)**, adaptada para o ecossistema React/Next.js.

### 🎯 Metodologia e Inspirações

A arquitetura combina os melhores aspectos de:

1. **Clean Architecture (Uncle Bob)**
   - Separação clara de responsabilidades
   - Regras de negócio isoladas de frameworks React
   - Domain prioriza testabilidade e organização

2. **Hexagonal Architecture (Ports & Adapters)**
   - Domain isolado de detalhes de infraestrutura web
   - Adapters (mappers, hooks) conectam o core ao mundo externo
   - Fácil substituição de dependências externas (HTTP client, stores)

3. **Domain-Driven Design (DDD)**
   - Linguagem ubíqua (tipos refletem o domínio)
   - Use cases representam casos de uso do negócio
   - Separação entre domain models e DTOs

### 📐 Camadas da Aplicação

```
┌─────────────────────────────────────────────────┐
│              Pages (App Router)                 │  ← Orquestração
│  - Side effects de UI (toasts, navegação)       │
│  - Composição de hooks e componentes            │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              Components Layer                   │  ← Apresentação
│  - Componentes puros de UI                      │
│  - Sem lógica de negócio                        │
│  - Padrão de composição                         │
└─────────────────────────────────────────────────┘
                      ↓
┌──────────────────┬──────────────────────────────┐
│   Hooks Layer    │      Store Layer             │  ← Estado
│  - Data fetching │  - Zustand stores            │
│    (React Query) │  - Estado de UI              │
│  - Usa Mappers   │  - Hooks seletores           │
│  - Store wrappers│                              │
└──────────────────┴──────────────────────────────┘
            ↓                    ↓
    ┌───────────────┐   ┌───────────────┐
    │  Domain Layer │   │ Mappers Layer │  ← Core Business
    │  - Use Cases  │   │  - DTO →      │     & Adaptação
    │  - Retorna    │   │    Domain     │
    │    DTOs       │   │    Model      │
    └───────────────┘   └───────────────┘
            ↓                    ↑
    ┌─────────────────────────────────┐
    │         Types Layer             │  ← Definições
    │  - Tipos de domínio             │
    │  - Interfaces compartilhadas    │
    └─────────────────────────────────┘
```

### 1️⃣ Types Layer (`@types/`)

**Responsabilidade**: Definir tipos e interfaces compartilhadas entre camadas.

**Características**:

- ✅ Tipos de domínio puros (User, Repository, etc.)
- ✅ Interfaces de filtros e configurações
- ✅ Zero dependências externas
- ✅ Usado por Domain, Hooks, Mappers e Components

**Benefício**: Centraliza as definições de tipos, garantindo consistência em toda a aplicação.

### 2️⃣ Domain Layer (`domain/`)

**Responsabilidade**: Lógica de negócio e orquestração de casos de uso.

**Características**:

- ✅ Funções assíncronas puras (use cases)
- ✅ Zero dependências do React ou frameworks web
- ✅ Retorna DTOs puros da API (sem transformação)
- ✅ Testável com mocks de HTTP client
- ❌ Sem conhecimento de mappers ou transformação de dados
- ❌ Sem side effects de UI
- ❌ Sem conhecimento de cache ou estado do React

**Princípio Clean Architecture**: O domain layer é completamente isolado e retorna apenas dados brutos da API. A transformação de DTOs para domain models acontece na camada de hooks, mantendo o domain puro e testável.

**Exemplo**:

```typescript
// domain/github/fetch-user.use-case.ts
export async function fetchUser(httpClient: AxiosInstance): Promise<GitHubUserDTO> {
  const response = await httpClient.get(`/users/${GITHUB_USERNAME}`);
  return response.data;
}
```

### 3️⃣ Mappers Layer (`mappers/`)

**Responsabilidade**: Transformar DTOs da API em modelos de domínio.

**Características**:

- ✅ Conversão de dados externos para tipos internos
- ✅ Validação e normalização
- ✅ Separado do domain (SRP - Single Responsibility)
- ❌ Sem lógica de negócio

**Benefício**: Se a API mudar, apenas os mappers precisam ser atualizados.

### 4️⃣ Hooks Layer (`hooks/`)

**Responsabilidade**: Orquestrar data fetching e expor estado de stores.

A camada de hooks possui dois tipos distintos:

#### 4.1 Hooks de Data Fetching (`hooks/features/github/`)

- ✅ Wrappers finos ao redor dos use cases
- ✅ Integração com React Query (cache, refetch, etc.)
- ✅ Transformam DTOs em domain models (usando mappers)
- ✅ Aplicam filtros quando necessário
- ✅ Retornam apenas dados e estados (loading, error)
- ❌ Sem lógica de negócio complexa
- ❌ Sem side effects de UI

**Exemplo**:

```typescript
// hooks/features/github/use-fetch-user.hook.ts
export function useFetchUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const dto = await fetchUser(httpClient);
      return GitHubMapper.toUser(dto);
    },
  });
}
```

#### 4.2 Hooks de Store (`hooks/features/profile/`, `hooks/features/repositories/`)

- ✅ Wrappers ao redor de Zustand stores
- ✅ Expõem seletores granulares para evitar re-renders
- ✅ Interface simplificada para componentes
- ❌ Sem data fetching

**Exemplo**:

```typescript
// hooks/features/profile/use-profile-view.hook.ts
export function useProfileView() {
  const activeTab = useProfileViewStore((state) => state.activeTab);
  const setActiveTab = useProfileViewStore((state) => state.setActiveTab);
  return { activeTab, setActiveTab };
}
```

### 5️⃣ Store Layer (`lib/stores/`)

**Responsabilidade**: Gerenciar estado da interface do usuário.

**Características**:

- ✅ Zustand stores para estado local/global de UI
- ✅ Hooks seletores granulares (evita re-renders)
- ✅ Estado efêmero (filtros, tabs, modais)
- ❌ Sem data fetching (isso é responsabilidade dos hooks)
- ❌ Sem lógica de negócio

**Exemplo**:

```typescript
// lib/stores/features/profile/profile-view.store.ts
export const useProfileViewStore = create<ProfileViewState>((set) => ({
  activeTab: 'repositories',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
```

### 6️⃣ Components Layer (`components/`)

**Responsabilidade**: Renderização pura de UI.

**Características**:

- ✅ Componentes de apresentação (dumb components)
- ✅ Recebem dados via props
- ✅ Padrão de composição (compound components)
- ❌ Sem lógica de negócio
- ❌ Sem data fetching direto
- ❌ Sem side effects

#### Organização dos Componentes

A estrutura de componentes segue uma organização baseada na complexidade e evolução esperada:

**Componentes com Pastas Próprias** (`components/shared/Component-Name/`):

- Componentes que podem evoluir ou se expandir no futuro
- Componentes que utilizam outros componentes internos (compound components)
- Componentes com múltiplos arquivos relacionados (ex: `index.tsx`, `Component-Item.tsx`)
- Exemplos: `Repository-List/`, `Repository-Toolbar/`, `User-Profile/`, `Profile-Tabs/`

**Componentes como Arquivos Únicos** (`components/shared/Component-Name.tsx`):

- Componentes generalistas e simplistas
- Componentes atômicos que não dependem de outros componentes internos
- Componentes que dificilmente precisarão de expansão
- Exemplos: `Button.tsx`, `Badge.tsx`, `Additional-Info.tsx`, `Checkbox.tsx`

**Benefícios desta organização**:

- **Escalabilidade**: Componentes complexos têm espaço para crescer sem poluir a estrutura
- **Clareza**: A estrutura indica a complexidade esperada do componente
- **Manutenibilidade**: Fácil identificar onde adicionar novos arquivos relacionados
- **Consistência**: Padrão previsível facilita o onboarding de novos desenvolvedores

### 7️⃣ Pages Layer (`app/`)

**Responsabilidade**: Orquestração e side effects de UI.

**Características**:

- ✅ Conecta hooks, stores e componentes
- ✅ Gerencia side effects (toasts, navegação, modais)
- ✅ Lógica de apresentação (quando mostrar o quê)
- ❌ Sem lógica de negócio
- ❌ Sem transformação de dados (isso é no mapper)

**Exemplo**:

```typescript
// app/[locale]/page.tsx
export default function ProfilePage() {
  const { data: user } = useFetchUser();
  const { activeTab, setActiveTab } = useProfileView();

  return (
    <>
      <Header />
      <UserProfile user={user} />
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
}
```

---

### ✨ Benefícios da Arquitetura

#### 1. **Testabilidade**

- Domain layer testável sem mocks complexos
- Componentes testáveis isoladamente
- Stores testáveis sem React

#### 2. **Manutenibilidade**

- Mudanças localizadas (princípio de responsabilidade única)
- Fácil encontrar onde está cada tipo de lógica
- Refatoração segura

#### 3. **Escalabilidade**

- Fácil adicionar novos use cases
- Componentes reutilizáveis
- Stores independentes

#### 4. **Substituibilidade**

- Trocar React Query por SWR? Apenas os hooks mudam
- Trocar Zustand por Redux? Apenas os stores mudam
- Trocar GitHub API por outra? Apenas mappers e use cases mudam

#### 5. **Onboarding**

- Estrutura clara e previsível
- Desenvolvedores sabem onde colocar cada tipo de código
- Documentação implícita na estrutura

---

### 🔒 Regras de Dependência

```
Pages → Components, Hooks, Stores
Components → (nada, apenas props)
Hooks → Domain, Mappers
Stores → (nada, estado puro)
Mappers → Domain (types)
Domain → (nada, core isolado)
```

**Princípio**: Dependências sempre apontam para dentro. O domain é o centro e não conhece nada externo.

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Passo a Passo

1. Clone o repositório:

```bash
git clone https://github.com/lucas-moont/magazord-test.git
cd magazord-test
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite .env.local se necessário (valores padrão já funcionam)
```

**Variáveis disponíveis:**

- `NEXT_PUBLIC_GITHUB_API_URL`: URL base da API do GitHub (padrão: `https://api.github.com`)

4. Rode o projeto em desenvolvimento:

```bash
npm run dev
```

5. Acesse no navegador:

```
http://localhost:3000
```

## 🧪 Testes

Execute os testes unitários:

```bash
npm run test
```

Execute com cobertura:

```bash
npm run test:coverage
```

![Test Coverage](/screenshots/test-coverage.png)

> _Screenshot: Cobertura de testes_

## 🌐 Internacionalização

O projeto suporta 3 idiomas:

- 🇧🇷 Português (pt)
- 🇺🇸 Inglês (en)
- 🇪🇸 Espanhol (es)

O sistema detecta automaticamente a preferência do navegador e usa inglês como fallback.

Para testar diferentes idiomas, acesse:

- Português: `http://localhost:3002/pt`
- Inglês: `http://localhost:3002/en`
- Espanhol: `http://localhost:3002/es`

## 🎨 Padrões de Código

### Utilitário `cn` - Gerenciamento de Classes Tailwind

O projeto utiliza o utilitário `cn` (localizado em `lib/utils/cn.ts`) que combina `clsx` e `tailwind-merge` para gerenciamento inteligente de classes CSS.

#### Por que usar `cn`?

**Problema comum com Tailwind:**

```tsx
// ❌ Classes conflitantes - qual ganha?
<div className="bg-red-500 bg-blue-500">  // Resultado imprevisível
```

**Solução com `cn`:**

```tsx
// ✅ Conflitos resolvidos automaticamente
<div className={cn("bg-red-500", condition && "bg-blue-500")}>  // blue-500 ganha
```

#### Benefícios

1. **Resolução Automática de Conflitos**
   - `tailwind-merge` identifica e resolve classes conflitantes
   - Última classe sempre ganha (comportamento esperado)
   - Suporta prefixos responsivos, estados (hover, focus), valores arbitrários

2. **Classes Condicionais Limpas**
   - `clsx` simplifica lógica condicional
   - Ignora valores falsy automaticamente
   - Código mais legível e manutenível

3. **Componentes Reutilizáveis**
   - Permite sobrescrever estilos sem conflitos
   - Ideal para design systems e bibliotecas de componentes

4. **Performance**
   - Bibliotecas leves (bundle size negligível)
   - Zero impacto em runtime
   - Type-safe com TypeScript

#### Exemplos de Uso

```tsx
import { cn } from '@/lib/utils/cn';

// Condicional simples
<button className={cn(
  "px-4 py-2 rounded",
  isActive && "bg-blue-500",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>

// Sobrescrita de props
function Button({ className, ...props }) {
  return (
    <button
      className={cn("px-4 py-2 bg-blue-500", className)}
      {...props}
    />
  );
}

// Múltiplas condições
<div className={cn(
  "text-base",
  size === "sm" && "text-sm",
  size === "lg" && "text-lg",
  variant === "primary" && "bg-blue-500 text-white",
  variant === "secondary" && "bg-gray-200 text-gray-900"
)}>
```

#### Referências

- [clsx Documentation](https://github.com/lukeed/clsx)
- [tailwind-merge Documentation](https://github.com/dcastil/tailwind-merge)
- [cn() - Every Tailwind Developer Needs It](https://www.youtube.com/watch?v=re2JFITR7TI)

## 🌓 Dark Mode

O projeto implementa um sistema completo de dark mode com suporte a detecção automática da preferência do sistema, persistência da escolha do usuário e transições suaves entre os temas.

### Arquitetura do Sistema

O dark mode é construído sobre três pilares principais:

1. **Variáveis CSS Customizadas** - Sistema de tokens de cores baseado em HSL
2. **next-themes** - Gerenciamento de estado e persistência do tema
3. **Framer Motion** - Animações fluidas no componente de alternância

### Configuração do Tailwind CSS

O projeto utiliza **Tailwind CSS 4** com configuração baseada em variáveis CSS. O sistema de cores é definido no arquivo `app/globals.css` através de variáveis CSS customizadas:

```css
@layer base {
  :root {
    /* Light Mode - HSL values without hsl() */
    --background: 0 0% 100%;
    --foreground: 0 0% 9%;
    --primary: 221.2 83.2% 53.3%;
    /* ... outras cores */

    /* Custom grays from Figma */
    --gray-950: 210 11% 15%;
    --gray-c5: 0 0% 86%;
    --gray-bg: 0 0% 97%;
    --gray-c3: 0 0% 60%;
  }

  .dark {
    /* Dark Mode - HSL values without hsl() */
    --background: 0 0% 9%;
    --foreground: 0 0% 98%;
    --primary: 217.2 91.2% 59.8%;
    /* ... outras cores */

    /* Custom grays for dark mode */
    --gray-950: 0 0% 98%;
    --gray-c5: 0 0% 40%;
    --gray-bg: 0 0% 22%;
    --gray-c3: 0 0% 70%;
  }
}
```

**Por que HSL sem a função `hsl()`?**

O Tailwind CSS 4 requer que as variáveis CSS contenham apenas os valores HSL (sem a função `hsl()`), permitindo que o framework construa as cores dinamicamente. Isso oferece maior flexibilidade para manipulação de transparência e variações de cor.

### Mapeamento de Cores no Tailwind

As variáveis CSS são mapeadas para classes Tailwind através do `@theme inline`:

```css
@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-gray-950: hsl(var(--gray-950));
  --color-gray-c5: hsl(var(--gray-c5));
  --color-gray-bg: hsl(var(--gray-bg));
  --color-gray-c3: hsl(var(--gray-c3));
  /* ... */
}
```

Isso permite usar as cores diretamente nas classes Tailwind:

```tsx
<div className="bg-background text-foreground">
<div className="bg-gray-bg border-gray-c5 text-gray-c3">
```

### Gerenciamento de Estado com next-themes

O `next-themes` é responsável por:

- **Detecção automática** da preferência do sistema operacional
- **Persistência** da escolha do usuário (localStorage)
- **Prevenção de flash** de conteúdo incorreto durante a hidratação
- **Sincronização** entre abas do navegador

**Configuração no Layout:**

```tsx
// app/[locale]/layout.tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
  {children}
</ThemeProvider>
```

**Configurações importantes:**

- `attribute="class"`: Aplica a classe `.dark` no elemento raiz
- `defaultTheme="system"`: Respeita a preferência do sistema por padrão
- `enableSystem`: Habilita detecção automática
- `disableTransitionOnChange`: Desabilita transições durante mudança de tema (evita flashes)

### Componente ThemeSwitch

O componente de alternância (`components/shared/header/theme-switch.tsx`) utiliza **Framer Motion** para animações suaves:

```tsx
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils/cn';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      <motion.div
        initial={false}
        animate={{ x: isDark ? 36 : 4 }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Ícone da bolinha */}
      </motion.div>
    </button>
  );
}
```

**Características da animação:**

- **Tipo Spring**: Movimento natural com física realista
- **Stiffness: 500**: Rigidez alta para resposta rápida
- **Damping: 30**: Amortecimento moderado para suavidade
- **initial={false}**: Evita animação na primeira renderização

### Uso de Classes Dark Mode no Tailwind

Para aplicar estilos diferentes em dark mode, use o prefixo `dark:`:

```tsx
// Exemplo básico
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">

// Com utilitário cn
<div className={cn(
  "bg-gray-100 text-gray-900",
  "dark:bg-gray-800 dark:text-gray-100"
)}>

// Classes condicionais
<button className={cn(
  "px-4 py-2 rounded",
  isActive && "bg-blue-500 dark:bg-blue-600",
  "hover:bg-blue-600 dark:hover:bg-blue-700"
)}>
```

### Variáveis CSS Customizadas

O projeto define variáveis customizadas para cores específicas do design:

| Variável     | Light Mode    | Dark Mode  | Uso                    |
| ------------ | ------------- | ---------- | ---------------------- |
| `--gray-950` | `210 11% 15%` | `0 0% 98%` | Header (sempre escuro) |
| `--gray-bg`  | `0 0% 97%`    | `0 0% 22%` | Fundos de badges/tags  |
| `--gray-c5`  | `0 0% 86%`    | `0 0% 40%` | Bordas                 |
| `--gray-c3`  | `0 0% 60%`    | `0 0% 70%` | Texto secundário       |

**Exemplo de uso:**

```tsx
// Badge com cores que mudam no dark mode
<span className="bg-gray-bg border-gray-c5 text-gray-c3">{count}</span>
```

### Elementos com Cores Fixas

Alguns elementos mantêm cores fixas independente do tema:

```tsx
// Header sempre com fundo escuro
<header className="bg-[hsl(210,11%,15%)]">{/* Cores fixas usando valores HSL diretos */}</header>
```

Isso é útil quando um elemento deve manter a mesma aparência em ambos os temas.

### Boas Práticas

1. **Sempre use `cn` para classes condicionais:**

   ```tsx
   // ✅ Correto
   className={cn("base-class", isDark && "dark-class")}

   // ❌ Evitar
   className={`base-class ${isDark ? "dark-class" : ""}`}
   ```

2. **Prefira variáveis CSS para cores semânticas:**

   ```tsx
   // ✅ Correto - usa sistema de tokens
   className = 'bg-background text-foreground';

   // ⚠️ Use apenas quando necessário
   className = 'bg-[hsl(210,11%,15%)]';
   ```

3. **Teste em ambos os temas:**
   - Verifique contraste de cores
   - Garanta legibilidade em dark mode
   - Teste transições suaves

4. **Evite flashes de conteúdo:**
   - Use `suppressHydrationWarning` no `<html>`
   - Implemente estado `mounted` no ThemeSwitch
   - Use `startTransition` para atualizações de estado

### Bibliotecas Utilizadas

- **next-themes** (`^0.4.6`): Gerenciamento de tema e persistência
- **framer-motion**: Animações fluidas no componente de alternância

### Referências

- [next-themes Documentation](https://github.com/pacocoursey/next-themes)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

## 💻 Funcionalidades

### ✅ Implementadas

- [x] Carregamento dinâmico de dados da GitHub API
- [x] Visualização de perfil do usuário
- [x] Listagem de repositórios do usuário
- [x] Aba de repositórios favoritados (starred)
- [x] Busca de repositórios com Enter
- [x] Filtros por tipo de repositório
- [x] Filtros por linguagem de programação
- [x] Internacionalização (pt, en, es)
- [x] Design responsivo
- [x] Dark mode com animações suaves
- [x] Testes unitários

### 🎨 Alterações em Relação ao Design Original

Algumas melhorias foram implementadas para aprimorar a experiência do usuário:

- **Linguagem sempre visível**: A linguagem principal do repositório agora é exibida diretamente no card do repositório, facilitando a identificação rápida
- **Cores das linguagens**: Implementado sistema de cores baseado nas cores oficiais do GitHub para cada linguagem de programação, proporcionando reconhecimento visual imediato
- **Dark mode**: Adicionado suporte completo a dark mode com botão de alternância no header em desktop e flutuante no mobile, melhorando a experiência em ambientes com pouca luz (desculpa, galera, light mode deixa o dev cego)

![Repository List](/screenshots/repository-list.png)

> _Screenshot: Lista de repositórios com filtros_

![Starred Repositories](/screenshots/starred-repos.png)

> _Screenshot: Repositórios favoritados_

![Search Feature](/screenshots/search.png)

> _Screenshot: Busca de repositórios_

![Filters](/screenshots/filters.png)

> _Screenshot: Filtros por tipo e linguagem_

## 🎨 Build e Deploy

### Build de Produção

```bash
npm run build
npm run start
```

### Deploy na Vercel

1. Faça push do código para o GitHub
2. Importe o projeto na [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_GITHUB_API_URL`: `https://api.github.com` (opcional, já é o padrão)
4. Deploy automático!

**Nota**: As variáveis de ambiente são opcionais. O projeto funciona com os valores padrão.

## 🛠️ Estrutura do Projeto

```
├── @types/                 # Tipos compartilhados entre camadas
│   └── github/
│       ├── user.ts
│       ├── repository.ts
│       ├── repository-filters.ts
│       ├── search-repository-filters.ts
│       └── index.ts        # Barrel export
├── app/
│   ├── [locale]/           # Rotas com suporte a i18n
│   │   ├── layout.tsx      # Layout principal
│   │   └── page.tsx        # Página de perfil
│   └── globals.css         # Estilos globais
├── components/
│   └── shared/             # Componentes reutilizáveis
│       ├── Additional-Info/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Checkbox.tsx
│       ├── ChevronIcon.tsx
│       ├── Dropdown-Menu/
│       ├── Header/
│       ├── Pagination/
│       ├── Profile-Tabs/
│       ├── Repository-List/    # Inclui Repository-Card.tsx
│       ├── Repository-Toolbar/ # Inclui Filter-Dropdown e Search-Bar
│       ├── ThemeSwitch.tsx
│       └── User-Profile/
├── consts/
│   └── pagination.ts       # Constantes de paginação
├── domain/
│   ├── errors.ts           # Erros do domínio
│   └── github/             # Lógica de negócio (use cases)
│       ├── const.ts        # Constantes do domínio
│       ├── fetch-user.use-case.ts
│       ├── fetch-repositories.use-case.ts
│       ├── fetch-starred.use-case.ts
│       ├── search-repositories.use-case.ts
│       └── index.ts        # Barrel export
├── hooks/
│   └── features/
│       ├── github/         # Data fetching hooks
│       │   ├── use-fetch-user.hook.ts
│       │   ├── use-fetch-repositories.hook.ts
│       │   ├── use-fetch-starred.hook.ts
│       │   ├── use-search-repositories.hook.ts
│       │   └── index.ts    # Barrel export
│       ├── profile/        # Store wrapper hooks
│       │   └── use-profile-view.hook.ts
│       └── repositories/   # Store wrapper hooks
│           └── use-repository-filters.hook.ts
├── i18n/
│   ├── config.ts           # Configuração de locales
│   ├── dicionary/          # Traduções
│   │   ├── pt.json         # Português
│   │   ├── en.json         # Inglês
│   │   └── es.json         # Espanhol
│   └── request.ts          # Carregamento de mensagens
├── interfaces/             # DTOs da API
│   └── github/
│       ├── repository.dto.ts
│       ├── user.dto.ts
│       └── index.ts        # Barrel export
├── lib/
│   ├── http.ts             # Cliente HTTP (Axios)
│   ├── logger.ts           # Utilitário de logging
│   ├── providers/
│   │   └── query-provider.tsx  # React Query Provider
│   ├── stores/             # Zustand stores
│   │   └── features/
│   │       ├── profile/
│   │       └── repositories/
│   └── utils/              # Utilitários
│       ├── cn.ts           # Merge de classes Tailwind
│       ├── filter-repositories.ts
│       ├── pagination-calculator.ts
│       ├── calculate-repository-counts.ts
│       ├── extract-available-languages.ts
│       └── get-displayed-repositories.ts
├── mappers/
│   ├── github.mapper.ts    # Transformação de DTOs
│   └── index.ts            # Barrel export
├── public/
│   └── assets/
│       ├── images/         # Imagens (logos, etc)
│       └── icons/          # Ícones SVG
├── docs/                   # Documentação adicional
│   └── components/         # Docs de componentes
├── middleware.ts           # Next.js middleware para i18n
├── .env.example            # Exemplo de variáveis de ambiente
└── .env.local              # Variáveis de ambiente locais (não commitado)
```

## 🧗 Desafios e Decisões Técnicas

Como o objetivo deste teste é avaliar também a capacidade de liderança técnica e arquitetura, os principais desafios giraram em torno do equilíbrio entre complexidade e valor:

### 1. Over-engineering vs. Escalabilidade

O maior desafio foi encontrar o equilíbrio entre demonstrar conhecimento de arquiteturas robustas (Clean Architecture, DDD) e manter a simplicidade necessária para uma aplicação deste porte (KISS).

- **Decisão**: Optei por uma estrutura em camadas explícita. Embora possa parecer _over-engineering_ para um projeto pequeno, ela serve como "prova de conceito" de como eu estruturaria um projeto real de larga escala para garantir que o time possa trabalhar de forma paralela e organizada.

### 2. Legibilidade e Onboarding

Pensando como Tech Lead, o código deve servir como ferramenta de ensino para o time.

- **Desafio**: Evitar abstrações "inteligentes demais" que dificultam o entendimento por desenvolvedores menos experientes.
- **Solução**: Priorizei a clareza sobre a brevidade. Uso de nomes descritivos, separação clara de responsabilidades (SRP) e padrões consistentes. O objetivo foi criar uma base de código onde um desenvolvedor Júnior/Pleno pudesse contribuir no primeiro dia sem fricção.

### 3. Gestão de Estado: Server vs. Client

- **Desafio**: Gerenciar o estado da aplicação sem criar acoplamento excessivo ou prop-drilling.
- **Solução**: Separação estrita entre **Server State** (React Query) e **UI State** (Zustand). Isso demonstra a maturidade em entender que dados da API têm ciclo de vida diferente de estados de interface (como filtros e tabs), evitando a complexidade de tentar gerenciar cache manualmente em stores globais.

### 4. Idioma dos Comentários no Código

Em um contexto de globalização e pensando em times distribuídos internacionalmente, a escolha do idioma para comentários no código torna-se uma decisão estratégica.

- **Decisão**: Comentários no código estão em inglês, seguindo uma prática comum na indústria e facilitando a colaboração com desenvolvedores de diferentes nacionalidades e backgrounds.
- **Obs.:**: Esta é uma decisão que, acredito, deve ser discutida e alinhada com o time. O ideal é termos uma política clara e documentada sobre padrões de código, incluindo idioma de comentários.

## 💡 O que eu faria com mais tempo / num projeto maior

### Performance

- Adicionar skeleton loaders durante carregamento
- Otimizar imagens com next/image de forma mais agressiva

### Estrutura

- Adicionar Storybook para documentação de componentes
- Criar mais componentes compound para melhor composição

### Funcionalidades

- Visualização detalhada de repositório individual
- Gráficos de atividade do usuário
- Filtros adicionais (por data, tamanho, etc.)
- Suporte a autenticação GitHub (aumentar rate limit)
- Favoritar/desfavoritar repositórios
- Compartilhamento de perfil
- Implementar toasts de sucesso e erro

### Padrões

- Implementar error boundaries
- Adicionar logging estruturado
- Melhorar acessibilidade (WCAG AAA)
- Adicionar animações e transições suaves
- Implementar feedback visual mais rico

## 📝 Commits

Os commits seguem o padrão Conventional Commits:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `refactor`: Refatoração de código
- `test`: Adição de testes
- `chore`: Tarefas de manutenção
