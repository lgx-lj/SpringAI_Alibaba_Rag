<template>
  <div class="d-flex flex-column" style="height: calc(100vh - 120px);">
    <h1 class="text-h4 mb-4">RAG 智能问答</h1>

    <!-- 消息列表 -->
    <v-card class="flex-grow-1 overflow-auto mb-4">
      <v-card-text>
        <div v-if="messages.length === 0" class="d-flex flex-column align-center justify-center h-100">
          <v-icon icon="mdi-brain" size="64" color="grey-lighten-1" class="mb-4" />
          <div class="text-h6 text-grey-lighten-1">基于知识库的智能问答</div>
          <div class="text-body-2 text-grey-lighten-1">输入问题，AI 将从知识库中检索相关信息并回答</div>
        </div>

        <div v-for="(msg, index) in messages" :key="index" class="mb-4">
          <div class="d-flex" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
            <v-card
              :color="msg.role === 'user' ? 'primary' : 'surface'"
              :class="msg.role === 'user' ? 'text-white' : ''"
              max-width="80%"
              class="pa-3"
            >
              <div class="d-flex align-center mb-1">
                <v-icon
                  :icon="msg.role === 'user' ? 'mdi-account' : 'mdi-robot'"
                  size="small"
                  class="mr-2"
                />
                <span class="text-caption">{{ msg.role === 'user' ? '我' : 'AI 助手' }}</span>
              </div>
              <div style="white-space: pre-wrap;">{{ msg.content }}</div>
            </v-card>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- 输入区域 -->
    <v-card>
      <v-card-text class="d-flex align-center">
        <v-textarea
          v-model="question"
          label="输入问题..."
          rows="1"
          auto-grow
          hide-details
          density="compact"
          variant="outlined"
          class="mr-2"
          @keyup.enter.exact.prevent="handleAsk"
        />
        <v-btn
          color="primary"
          icon="mdi-send"
          :loading="isLoading"
          :disabled="!question.trim()"
          @click="handleAsk"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { askQuestion } from '@/api/rag'

const question = ref('')
const messages = ref([])
const isLoading = ref(false)

async function handleAsk() {
  if (!question.value.trim()) return

  const userQuestion = question.value.trim()
  messages.value.push({ role: 'user', content: userQuestion })
  question.value = ''
  isLoading.value = true

  try {
    const answer = await askQuestion(userQuestion)
    messages.value.push({ role: 'assistant', content: answer })
  } catch (error) {
    messages.value.push({
      role: 'assistant',
      content: '抱歉，发生了错误：' + (error.message || '未知错误')
    })
  } finally {
    isLoading.value = false
  }
}
</script>
