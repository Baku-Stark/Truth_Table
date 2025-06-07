# Truth Table Generator

Uma aplicação web para gerar tabelas verdade, desenvolvida com Vue.js.

- **[Configuração do Projeto](https://github.com/Baku-Stark/Truth_Table/issues/3)**

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/truth-table.git
```

```bash
cd truth-table
```

# Backend

> [!NOTE]
>
> Para saber mais, veja a ISSUE **[Backend - Sistema Lógico](https://github.com/Baku-Stark/Truth_Table/issues/2)**.

O backend é responsável por interpretar e avaliar expressões booleanas fornecidas pelo usuário. Ele gera dinamicamente a tabela verdade com base nas variáveis identificadas na expressão.

### [✨] Funcionalidades

- **Parser de expressões booleanas personalizadas**

  * Suporta operadores como:
    * `and`, `^` → `&&` **(conjunção)**
    * `or`, `||` → `||` **(disjunção)**
    * `not`, `¬`, `!` → `!` **(negação)**
    * `->`, `⇒` **(condicional)**
    * `<->`, `⇔`, `↔` **(bicondicional)**

- **Geração automática da tabela verdade**
  * Todas as combinações possíveis de variáveis são avaliadas

- **Expressões compostas e agrupadas com parênteses**
- **Escrito em TypeScript**

### [🧠] Exemplo de expressão suportada:

```txt
(p ∧ q) -> ¬r
```

### [🧪] Estrutura básica do backend (exemplo):

```ts
normalizeExpression("(p and q) -> not r")
// retorna: "(p && q) ⇒ !r"

generateTruthTable("(p && q) ⇒ !r")
// retorna: [
//   { p: false, q: false, r: false, resultado: true },
//   { p: false, q: true,  r: true,  resultado: true },
//   ...
// ]
```

> [!NOTE]
> A lógica do backend pode, futuramente, ser exposta via API para integrar com outras interfaces ou aplicações.

# Criadores

| Backend  | Frontend |
|:---:|:---:|
|  <img height="80"  src="https://avatars.githubusercontent.com/u/103138773?v=4" />  <br> [`Wallace "Baku-Stark"`](https://github.com/Baku-Stark)  |  <img height="80"  src="https://avatars.githubusercontent.com/u/163025588?v=4" />  <br> [`Maria Izabel "Izzy"`](https://github.com/sparklezzy) |