<template>
  <div
    class="d-flex mb-4"
    :class="role === 'user' ? 'justify-end' : 'justify-start'"
  >
    <v-card
      :color="role === 'user' ? 'primary' : 'surface'"
      :class="role === 'user' ? 'text-white' : ''"
      max-width="80%"
      class="pa-3"
    >
      <div class="d-flex align-center mb-1">
        <v-icon
          :icon="role === 'user' ? 'mdi-account' : 'mdi-robot'"
          size="small"
          class="mr-2"
        />
        <span class="text-caption">{{ role === 'user' ? '我' : 'AI 助手' }}</span>
      </div>

      <MarkdownRenderer :content="content" />

      <div v-if="isStreaming" class="typing-cursor" />
    </v-card>
  </div>
</template>

<script setup>
import MarkdownRenderer from '@/components/common/MarkdownRenderer.vue'

defineProps({
  role: { type: String, required: true },
  content: { type: String, default: '' },
  isStreaming: { type: Boolean, default: false }
})
</script>

<style scoped>
.typing-cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: currentColor;
  animation: blink 1s infinite;
  margin-left: 4px;
  vertical-align: middle;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
