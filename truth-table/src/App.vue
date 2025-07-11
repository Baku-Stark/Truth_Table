<template>
  <div
    id="app"
    class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col"
  >
    <!-- Header com botão no canto superior direito -->
    <header class="flex justify-end p-4">
      <button
        @click="toggleTheme"
        class="px-4 py-2 bg-blue-600 dark:bg-blue-400 text-white rounded shadow hover:opacity-90 transition"
      >
        {{ isDark ? 'Modo Claro' : 'Modo Escuro' }}
      </button>
    </header>

    <!-- Conteúdo centralizado -->
    <main class="flex-1 flex flex-col justify-center items-center">
      <img alt="Vue logo" src="./assets/logo.png" class="w-32 mb-4" />
      <TruthTable /> <!-- ✅ Aqui usamos o componente -->
    </main>

    <footer class="bg-gray-100 dark:bg-gray-900 text-center py-4 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700">
      <p>Copyright © {{ new Date().getFullYear() }}</p>
      <p>
        Desenvolvedores:
        <a href="https://github.com/Baku-Stark" class="text-blue-600 dark:text-blue-400 hover:underline">Baku-Stark</a>
        |
        <a href="https://github.com/sparklezzy" class="text-blue-600 dark:text-blue-400 hover:underline">Sparklezzy</a>
      </p>
  </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TruthTable from './components/TruthTable.vue' // ✅ Importado corretamente
import { useTheme } from './composables/useTheme'

export default defineComponent({
  components: { TruthTable },
  setup() {
    const { isDark, toggleTheme } = useTheme();

    return {
      isDark,
      toggleTheme
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
