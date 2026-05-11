import request from './request'

export function askQuestion(question) {
  return request.get('/api/qa', { params: { question } })
}
