import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userLightModeStore = defineStore('lightMode', () => {
  const isLightMode = ref(true)

  function toggleLightMode() {
    isLightMode.value = !isLightMode.value
  }

  return {
    isLightMode,
    toggleLightMode
  }
})
