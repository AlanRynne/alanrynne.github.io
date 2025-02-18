<script setup lang="ts">
import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <div class="flex h-full justify-center items-center">
    <div
      class="bg-warning border border-gray-800 dark:border-gray-100 rounded-lg overflow-hidden min-w-[50%] shadow-black dark:shadow-gray-100 shadow-2xs"
    >
      <div
        class="mt-3 w-full bg-gray-100 dark:bg-gray-900 border-t flex flex-col justify-center items-center p-10"
      >
        <FontAwesomeIcon class="text-[60pt] pb-4" :icon="faWarning" />
        <h1 class="text-xl font-light">New site coming Soon!</h1>
      </div>
    </div>
  </div>
</template>

<style>
.bg-warning {
  background-color: var(--color-amber-400);
  background: repeating-linear-gradient(
    45deg,
    var(--color-amber-400),
    var(--color-amber-400) 15px,
    var(--color-gray-800) 15px,
    var(--color-gray-800) 30px
  );
}
</style>
