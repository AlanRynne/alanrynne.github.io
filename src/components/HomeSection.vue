<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
    default: null,
  },
  icon: { type: Object, required: true },
})
</script>

<template>
  <div class="not-last:mb-10">
    <div class="flex mb-3">
      <font-awesome-icon :icon="icon as IconDefinition" class="text-2xl w-8 mr-2 pt-1" />
      <div class="flex flex-col">
        <h1 class="font-bold text-2xl">{{ title }}</h1>
        <h2 class="pl-2 font-light italic">{{ subtitle }}</h2>
      </div>
    </div>
    <div class="pl-10">
      <slot></slot>
    </div>
  </div>
</template>
