import request from './request'

export function chat(message) {
  return request.get('/api/qwen/chat', { params: { message } })
}

export function chatWithModel(message, model = 'qwen-turbo') {
  return request.get('/api/qwen/chat-with-model', { params: { message, model } })
}

export async function chatStream(message, onChunk, onDone, onError) {
  try {
    const response = await fetch(`/api/qwen/stream?message=${encodeURIComponent(message)}`)
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        onDone?.()
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop()

      for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed.startsWith('data:')) {
          const content = trimmed.substring(5)
          if (content) {
            onChunk?.(content)
          }
        }
      }
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      onError?.(error)
    }
  }
}
