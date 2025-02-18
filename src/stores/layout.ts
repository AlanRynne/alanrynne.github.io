import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isWide: false,
  }),
  actions: {
    setWideLayout(wide: boolean) {
      this.isWide = wide
    },
  },
})
