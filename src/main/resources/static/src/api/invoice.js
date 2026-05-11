import request from './request'

export function extractInvoice(file) {
  const formData = new FormData()
  formData.append('file', file)
  return request.post('/api/invoice/extract', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
