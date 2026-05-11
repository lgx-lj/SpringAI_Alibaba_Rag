import { ref } from 'vue'

export function useSSE() {
  const isStreaming = ref(false)
  const streamedText = ref('')
  let abortController = null

  async function startStream(url, onChunk) {
    isStreaming.value = true
    streamedText.value = ''
    abortController = new AbortController()

    try {
      const response = await fetch(url, { signal: abortController.signal })
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()

        for (const line of lines) {
          const trimmed = line.trim()
          if (trimmed.startsWith('data:')) {
            const content = trimmed.substring(5)
            if (content) {
              streamedText.value += content
              onChunk?.(content, streamedText.value)
            }
          }
        }
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error('SSE Error:', e)
      }
    } finally {
      isStreaming.value = false
    }
  }

  function stopStream() {
    abortController?.abort()
    isStreaming.value = false
  }

  return { isStreaming, streamedText, startStream, stopStream }
}
