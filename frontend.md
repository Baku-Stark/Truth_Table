# 🧠 Truth Table Frontend

Interface web interativa para criação e visualização de **tabelas-verdade**, desenvolvida com **Vue.js** e **Tailwind CSS**.

> Desenvolvido por: **Maria Izabel** (`Izzy`)

---

## ✨ Funcionalidades

- ✅ Inserção de expressões booleanas
- ✅ Geração automática da tabela-verdade
- ✅ Avaliação e visualização lógica passo a passo
- ✅ Interface clara, rápida e responsiva

---

## ⚙️ Tecnologias Utilizadas

- Vue.js 3
- Tailwind CSS
- JavaScript / TypeScript
- Vue CLI

---

## 📁 Estrutura do Projeto

- `src/components/` → Componentes Vue reutilizáveis  
- `src/views/` → Telas principais  
- `src/assets/` → Ícones e imagens  
- `App.vue` → Componente raiz  
- `main.ts` → Ponto de entrada da aplicação  

---

## ✅ Pré-requisitos

- Node.js versão 16 ou superior
- NPM versão 8 ou superior

---

## 🚀 Como Rodar o Projeto Localmente

1. Clone o repositório.
2. Instale as dependências.
3. Inicie o servidor de desenvolvimento.

---

# 📘 Configuração Vue 3 + Tailwind CSS (Webpack)

Guia para configurar corretamente o Tailwind CSS em projetos Vue 3 com Webpack, resolvendo o erro de PostCSS.

---

## ❗️ Erro Encontrado

Durante a configuração, foi identificado o seguinte erro:

**Mensagem:**
"Trying to use 'tailwindcss' directly as a PostCSS plugin. This is not supported."

---

## 🔍 Causa

O erro foi causado por uma configuração incorreta do PostCSS no projeto.  
O pacote `@tailwindcss/postcss` foi utilizado de forma equivocada ou as dependências do projeto estavam corrompidas.

---

## ✅ Solução Aplicada

- Realizada limpeza das dependências antigas do projeto.
- Reinstalação completa das dependências.
- Correção da configuração do PostCSS para garantir compatibilidade com o Tailwind CSS.
- Garantido que o pacote `@tailwindcss/postcss` não fosse utilizado.

Após esses passos, o erro foi resolvido e o Tailwind CSS passou a funcionar corretamente no projeto Vue 3.

---

## 🚀 Execução Final

Após a configuração correta, o projeto funciona normalmente e o Tailwind CSS está integrado sem erros.

---

> Desenvolvido com 💻 por **Maria Izabel (Izzy)**
