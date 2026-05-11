import request from './request'

export function generateImage(description) {
  return request.get('/image-generation/generate', { params: { description } })
}

export function generateCustomImage(description, count = 1, width = 1024, height = 1024) {
  return request.get('/image-generation/generate-custom', {
    params: { description, count, width, height }
  })
}

export function generateProductImage(productName, style, productDescription) {
  return request.post('/productImage/generate', { productName, style, productDescription })
}
