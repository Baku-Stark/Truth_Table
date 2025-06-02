<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: {
    message: String
  }
})
export default class HelloWorld extends Vue {
  count = 0;

  increment() {
    this.count++;
  }
}
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <p>{{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>