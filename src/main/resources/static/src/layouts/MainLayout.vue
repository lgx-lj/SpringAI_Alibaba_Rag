<template>
  <v-layout>
    <AppHeader />
    <AppSidebar />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
import AppSidebar from '@/components/common/AppSidebar.vue'
</script>
