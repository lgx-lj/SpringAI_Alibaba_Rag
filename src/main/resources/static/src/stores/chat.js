import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const isStreaming = ref(false)
  const selectedModel = ref('qwen-turbo')

  function addUserMessage(content) {
    messages.value.push({
      role: 'user',
      content,
      timestamp: new Date()
    })
  }

  function addAssistantMessage(content) {
    messages.value.push({
      role: 'assistant',
      content,
      timestamp: new Date()
    })
  }

  function updateLastMessage(content) {
    const last = messages.value[messages.value.length - 1]
    if (last && last.role === 'assistant') {
      last.content = content
    }
  }

  function clearMessages() {
    messages.value = []
  }

  return {
    messages, isStreaming, selectedModel,
    addUserMessage, addAssistantMessage, updateLastMessage, clearMessages
  }
})
