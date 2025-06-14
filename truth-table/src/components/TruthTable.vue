<template>
  <div class="p-6 space-y-4">
    <h1 class="text-3xl font-bold">Tabela Verdade</h1>
    <input
      v-model="expression"
      class="border px-3 py-2 rounded w-96 dark:bg-gray-800 dark:border-gray-600"
      placeholder="Digite a expressão lógica. Ex: (A ∧ ¬B) ∨ C"
    />
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
            v-for="(value, j) in row"
            :key="j"
            class="border px-4 py-2 text-center"
          >
            {{ value ? '✔️' : '❌' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTruthTable } from '../composables/useTruthTable'

const expression = ref('(A ∧ ¬B) ∨ C')
const headers = ref<string[]>([])
const truthTable = ref<any[][]>([])

const updateTable = () => {
  try {
    const { headers: h, truthTable: t } = useTruthTable(expression.value)
    headers.value = h.value
    truthTable.value = t.value
  } catch (e) {
    // Se a expressão for inválida, limpa a tabela
    headers.value = []
    truthTable.value = []
  }
}

watch(expression, updateTable, { immediate: true })
</script>