import request from './request'

export function analyzeImageUrl(imageUrl, question = '请描述这张图片的内容') {
  return request.get('/analyze-url', { params: { imageUrl, question } })
}

export function analyzeUploadedImage(file, question = '请描述这张图片的内容') {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('question', question)
  return request.post('/analyze-upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function compareImages(files, question) {
  const formData = new FormData()
  files.forEach(file => formData.append('images', file))
  formData.append('question', question)
  return request.post('/compare-images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
