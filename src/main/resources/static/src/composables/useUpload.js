import { ref } from 'vue'

export function useUpload() {
  const isUploading = ref(false)
  const progress = ref(0)
  const error = ref(null)

  async function uploadFile(file, uploadFn) {
    isUploading.value = true
    progress.value = 0
    error.value = null

    try {
      const result = await uploadFn(file)
      progress.value = 100
      return result
    } catch (e) {
      error.value = e.message || '上传失败'
      throw e
    } finally {
      isUploading.value = false
    }
  }

  function reset() {
    isUploading.value = false
    progress.value = 0
    error.value = null
  }

  return { isUploading, progress, error, uploadFile, reset }
}
