<template>
  <div>
    <v-file-input
      v-model="files"
      :label="label"
      :accept="accept"
      :multiple="multiple"
      :show-size="true"
      :counter="multiple"
      :prepend-icon="prependIcon"
      variant="outlined"
      density="comfortable"
      @update:model-value="onFilesChange"
    />

    <v-alert
      v-if="error"
      type="error"
      density="compact"
      class="mt-2"
    >
      {{ error }}
    </v-alert>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, default: '选择文件' },
  accept: { type: String, default: '*' },
  multiple: { type: Boolean, default: false },
  maxSize: { type: Number, default: 50 * 1024 * 1024 },
  prependIcon: { type: String, default: 'mdi-paperclip' }
})

const emit = defineEmits(['update:files'])

const files = ref([])
const error = ref(null)

function onFilesChange(newFiles) {
  error.value = null

  if (!newFiles || newFiles.length === 0) {
    emit('update:files', [])
    return
  }

  const fileArray = multiple ? newFiles : [newFiles]

  for (const file of fileArray) {
    if (file.size > props.maxSize) {
      error.value = `文件 ${file.name} 超过最大限制 (${formatSize(props.maxSize)})`
      files.value = []
      emit('update:files', [])
      return
    }
  }

  emit('update:files', fileArray)
}

function formatSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>
