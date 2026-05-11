<template>
  <div class="d-flex flex-column align-center justify-center pa-8">
    <v-icon :icon="icon" size="64" color="grey-lighten-1" class="mb-4" />
    <div class="text-h6 text-grey-lighten-1 mb-2">{{ title }}</div>
    <div class="text-body-2 text-grey-lighten-1">{{ description }}</div>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, default: 'mdi-inbox' },
  title: { type: String, default: '暂无数据' },
  description: { type: String, default: '' }
})
</script>
