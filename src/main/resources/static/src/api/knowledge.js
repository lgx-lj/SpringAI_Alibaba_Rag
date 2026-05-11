import request from './request'

export function uploadDocument(file, category = '通用') {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('category', category)
  return request.post('/api/knowledge/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function uploadText(title, category, content) {
  return request.post('/api/knowledge/text', { title, category, content })
}

export function searchKnowledge(query, topK = 3) {
  return request.get('/api/knowledge/search', { params: { query, topK } })
}
