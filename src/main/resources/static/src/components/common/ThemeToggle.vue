<template>
  <v-btn
    icon
    variant="text"
    @click="appStore.toggleTheme()"
  >
    <v-icon :icon="appStore.theme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
    <v-tooltip activator="parent" location="bottom">
      {{ appStore.theme === 'dark' ? '切换到浅色模式' : '切换到深色模式' }}
    </v-tooltip>
  </v-btn>
</template>

<script setup>
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
</script>
