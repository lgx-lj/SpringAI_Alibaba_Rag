<template>
  <div class="d-flex flex-column" style="height: calc(100vh - 120px);">
    <!-- 顶部工具栏 -->
    <div class="d-flex align-center mb-4">
      <ModelSelector v-model="chatStore.selectedModel" />
      <v-spacer />
      <v-btn
        color="error"
        variant="outlined"
        prepend-icon="mdi-delete"
        @click="chatStore.clearMessages()"
      >
        清空对话
      </v-btn>
    </div>

    <!-- 消息列表 -->
    <v-card class="flex-grow-1 overflow-auto mb-4" ref="messageContainer">
      <v-card-text>
        <div v-if="chatStore.messages.length === 0" class="d-flex flex-column align-center justify-center h-100">
          <v-icon icon="mdi-chat-outline" size="64" color="grey-lighten-1" class="mb-4" />
          <div class="text-h6 text-grey-lighten-1">开始对话吧</div>
          <div class="text-body-2 text-grey-lighten-1">输入消息与 AI 助手交流</div>
        </div>

        <ChatMessage
          v-for="(msg, index) in chatStore.messages"
          :key="index"
          :role="msg.role"
          :content="msg.content"
          :is-streaming="chatStore.isStreaming && index === chatStore.messages.length - 1 && msg.role === 'assistant'"
        />
      </v-card-text>
    </v-card>

    <!-- 输入区域 -->
    <ChatInput
      :is-streaming="chatStore.isStreaming"
      @send="handleSend"
      @stop="handleStop"
    />
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { useChatStore } from '@/stores/chat'
import { chatStream } from '@/api/chat'
import ChatMessage from '@/components/chat/ChatMessage.vue'
import ChatInput from '@/components/chat/ChatInput.vue'
import ModelSelector from '@/components/chat/ModelSelector.vue'

const chatStore = useChatStore()
const messageContainer = ref(null)

// 自动滚动到底部
function scrollToBottom() {
  nextTick(() => {
    if (messageContainer.value) {
      const container = messageContainer.value.$el || messageContainer.value
      container.scrollTop = container.scrollHeight
    }
  })
}

watch(() => chatStore.messages.length, scrollToBottom)
watch(() => chatStore.messages[chatStore.messages.length - 1]?.content, scrollToBottom)

async function handleSend(message) {
  chatStore.addUserMessage(message)
  chatStore.addAssistantMessage('')
  chatStore.isStreaming = true

  await chatStream(
    message,
    (chunk) => {
      chatStore.updateLastMessage(
        chatStore.messages[chatStore.messages.length - 1].content + chunk
      )
    },
    () => {
      chatStore.isStreaming = false
    },
    (error) => {
      console.error('Stream error:', error)
      chatStore.updateLastMessage('抱歉，发生了错误：' + error.message)
      chatStore.isStreaming = false
    }
  )
}

function handleStop() {
  chatStore.isStreaming = false
}
</script>
