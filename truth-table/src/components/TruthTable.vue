<template>
  <div class="overflow-x-auto p-4 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
    <table class="min-w-full text-sm text-center text-gray-900 dark:text-white">
      <thead>
        <tr>
          <th v-for="v in table.vars" :key="v" class="px-4 py-2 border-b dark:border-gray-600">{{ v }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in table.rows" :key="i">
          <td v-for="v in table.vars" :key="v" class="px-4 py-2">
            {{ row[v] ? 1 : 0 }}
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
