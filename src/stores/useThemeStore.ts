// stores/theme.ts
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: localStorage.getItem('theme') === 'dark',
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      // Update DOM for Tailwind dark mode
      if (this.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      // Optionally save preference to localStorage
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },
    initTheme() {
      // Check for saved preference
      const savedTheme = localStorage.getItem('theme')
      this.isDark = savedTheme === 'dark'
      // Initial DOM update
      document.documentElement.classList.toggle('dark', this.isDark)
    },
  },
})
