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
            {{ value ? 'V' : 'F' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useTruthTable } from '@/composables/useTruthTable'
const table = useTruthTable(['A', 'B'])
</script>
