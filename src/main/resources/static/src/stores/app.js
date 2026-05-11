import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const theme = ref(localStorage.getItem('theme') || 'light')
  const drawer = ref(true)
  const rail = ref(false)

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
  }

  function toggleDrawer() {
    drawer.value = !drawer.value
  }

  return { theme, drawer, rail, toggleTheme, toggleDrawer }
})
