<template>
  <v-card>
    <v-card-text class="d-flex align-center">
      <v-textarea
        v-model="message"
        label="输入消息..."
        rows="1"
        auto-grow
        hide-details
        density="compact"
        variant="outlined"
        class="mr-2"
        @keydown.enter.exact.prevent="handleSend"
      />

      <v-btn
        v-if="!isStreaming"
        color="primary"
        icon="mdi-send"
        :disabled="!message.trim()"
        @click="handleSend"
      />

      <v-btn
        v-else
        color="error"
        icon="mdi-stop"
        @click="$emit('stop')"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  isStreaming: { type: Boolean, default: false }
})

const emit = defineEmits(['send', 'stop'])

const message = ref('')

function handleSend() {
  if (message.value.trim()) {
    emit('send', message.value.trim())
    message.value = ''
  }
}
</script>
