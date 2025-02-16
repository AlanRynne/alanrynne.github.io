<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout'
import { computed } from 'vue'

const layoutStore = useLayoutStore()
const isWideLayout = computed(() => layoutStore.isWide)
</script>

<template>
  <div class="flex flex-col gap-3 lg:gap-10">
    <h1 class="transition-all" :class="{ 'text-2xl': !isWideLayout }">Alan Rynne Vidal</h1>
    <font-awesome-icon />
    <transition
      enter-active-class="transition-opacity transition-height transition-margin"
      leave-active-class="transition-opacity transition-height transition-margin"
      enter-class="opacity-0 h-0 m-0"
      enter-to-class="opacity-100 h-auto"
      leave-to-class="opacity-0 h-0 m-0"
    >
      <div v-if="!isWideLayout">
        <h2 class="italic font-light text-sm">Geometry nerd 🤓 and coding wizard 🧙🏼‍♂️</h2>
        <h2 class="italic font-light text-sm">Building 🏗️ and software 🖥️ engineer</h2>
        <h2 class="italic font-light text-sm">Open Source enthusiast 📖</h2>
      </div>
    </transition>
    <h2 v-if="!isWideLayout" class="text-sm italic">
      "I love creating tools that enhance other people's workflows, as well as teaching how to
      create them."
    </h2>
  </div>
</template>

<style scoped></style>
