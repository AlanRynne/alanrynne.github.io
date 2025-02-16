<script setup lang="ts">
defineProps({
  tags: {
    type: Array<string>,
    required: true
  }
})
</script>

<template>
<div class="flex justify-start align-middle text-sm font-light">
  <p class="py-0.5 px-2 rounded-2xl bg-amber-400 text-amber-800 not-last:mr-2" v-for="(tag, index) in tags" :key="index">{{tag}}</p>
</div>
</template>

<style scoped>

</style>
