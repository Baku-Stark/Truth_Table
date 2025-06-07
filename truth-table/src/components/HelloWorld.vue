<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { generateTruthTable } from '../utils/truthTable';

const expression = 'A <-> B';
const table = generateTruthTable(expression);

console.log(table.headers); // exemplo: ['A', 'B', '(A and B)']
console.table(table.rows);

// define a prop
defineProps<{
  message: string
}>();

const count = ref(0);
const increment = () => count.value++;
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <p>{{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>