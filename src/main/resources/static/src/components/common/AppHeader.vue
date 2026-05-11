<template>
  <v-app-bar color="primary" density="comfortable">
    <v-app-bar-nav-icon @click="appStore.toggleDrawer()" />
    <v-app-bar-title>
      <v-icon icon="mdi-robot" class="mr-2" />
      Spring AI Alibaba
    </v-app-bar-title>
    <v-spacer />
    <ThemeToggle />
  </v-app-bar>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import ThemeToggle from './ThemeToggle.vue'

const appStore = useAppStore()
</script>
