<template>
  <v-select
    :model-value="modelValue"
    :items="models"
    item-title="label"
    item-value="value"
    label="选择模型"
    density="compact"
    variant="outlined"
    hide-details
    style="max-width: 200px;"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: 'qwen-turbo' }
})

defineEmits(['update:modelValue'])

const models = [
  { label: 'Qwen Turbo', value: 'qwen-turbo' },
  { label: 'Qwen Max', value: 'qwen-max' },
  { label: 'Qwen Plus', value: 'qwen-plus' }
]
</script>
