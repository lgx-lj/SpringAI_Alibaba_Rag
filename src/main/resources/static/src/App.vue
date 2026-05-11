<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { watch } from 'vue'
import { useTheme } from 'vuetify'
import { useAppStore } from '@/stores/app'

const theme = useTheme()
const appStore = useAppStore()

// 监听主题变化，同步更新 Vuetify 主题
watch(
  () => appStore.theme,
  (newTheme) => {
    theme.global.name.value = newTheme === 'dark' ? 'darkTheme' : 'lightTheme'
  },
  { immediate: true }
)
</script>
