<template>
  <div class="p-6 space-y-4 flex column flex-col content-center">
    <h1 class="text-3xl font-bold">Truth Table</h1>

    <p>
      Type a logic formulas
    </p>
    <p class="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
      Example: <code>(A and B) or not C</code>
    </p>


    <input
      v-model="expression"
      class="border px-3 py-2 rounded w-96 dark:bg-gray-800 dark:border-gray-600"
      placeholder="Insert a logic expression"
    />

    <!-- MOSTRAR UMA MENSAGEM DE ERRO CASO A EXPRESSÃO LÓGICA NÃO ESTEJA CORRETA -->
    <p v-if="error" class="text-red-600 text-sm">
      {{ error }}
    </p>


    <table class="border-collapse">
      <thead>
        <tr>
          <th
            v-for="(header, i) in headers"
            :key="i"
            class="border px-4 py-2 bg-gray-200 dark:bg-gray-700"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in truthTable" :key="i">
          <td
            v-for="(header, j) in headers"
            :key="j"
            class="border px-4 py-2 text-center"
          >
            {{ row[header] === 'T' ? '✔️' : '❌' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { generateTruthTable, type TruthRow } from '@/utils/truthTable'

const expression = ref('')

const headers = ref<string[]>([])
const truthTable = ref<TruthRow[]>([])
const error = ref<string | null>(null)

const updateTable = () => {
  try {
    const table = generateTruthTable(expression.value);

    // Mostrar a tabela no console
    console.log(table.headers);
    console.table(table.rows);


    headers.value = table.headers
    truthTable.value = table.rows
    error.value = null // Limpa o erro se tudo estiver certo
  } catch (e: unknown) {
    error.value = `Invalid logical expression. Please check the syntax: ${expression.value}`
    headers.value = []
    truthTable.value = []
  }
}

watch(expression, updateTable, { immediate: true })
</script>