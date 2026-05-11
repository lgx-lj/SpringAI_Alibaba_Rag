<template>
  <div class="markdown-body" v-html="renderedContent" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: { type: String, default: '' }
})

const renderedContent = computed(() => {
  if (!props.content) return ''

  let html = props.content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // 代码块
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')

  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // 粗体
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')

  // 斜体
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')

  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')

  // 换行
  html = html.replace(/\n/g, '<br>')

  return html
})
</script>

<style scoped>
.markdown-body {
  line-height: 1.6;
  word-wrap: break-word;
}

.markdown-body :deep(pre) {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 12px;
  overflow-x: auto;
  margin: 8px 0;
}

.markdown-body :deep(code) {
  background-color: #f5f5f5;
  border-radius: 3px;
  padding: 2px 6px;
  font-family: monospace;
}

.markdown-body :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

.markdown-body :deep(a) {
  color: #1867C0;
  text-decoration: none;
}

.markdown-body :deep(a:hover) {
  text-decoration: underline;
}
</style>
