<script setup lang="ts">
import TagList from '@/components/TagList.vue'

function getDisplayDate(date?: Date): string {
  return date ? `${date.getMonth()}/${date.getFullYear()}` : 'Present'
}

defineProps({
  from: {
    type: Date,
    required: true,
  },
  to: Date,
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  achievements: {
    type: Array<string>,
    required: true,
  },
  tags: {
    type: Array<string>,
    required: true,
  },
})
</script>

<template>
  <div
    class="grid grid-cols-[10em_auto] gap-4 p-2 border border-solid border-b-gray-500 rounded-sm hover:bg-gray-300 group hover:transition-colors"
  >
    <div class="font-bold italic">{{ getDisplayDate(from) }} — {{ getDisplayDate(to) }}</div>
    <div>
      <h1 class="group-hover:text-white group-hover:transition-colors">{{ title }}</h1>
      <h2 class="italic mb-2">{{ company }}</h2>
      <ul class="list-disc list-inside text-sm font-light mb-2">
        <li v-for="(achievement, index) in achievements" :key="index">{{ achievement }}</li>
      </ul>
      <tag-list v-if="tags" :tags="tags" />
    </div>
  </div>
</template>

<style scoped></style>
