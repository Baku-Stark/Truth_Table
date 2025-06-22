<template>
  <div class="overflow-x-auto p-4 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
    <table class="min-w-full text-sm text-center text-gray-900 dark:text-white">
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

// Desestruturando a resposta
const { headers, truthTable } = useTruthTable("¬A ∨ B")
</script>