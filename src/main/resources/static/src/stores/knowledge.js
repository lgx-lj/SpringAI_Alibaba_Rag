import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useKnowledgeStore = defineStore('knowledge', () => {
  const searchResults = ref([])
  const uploadHistory = ref([])
  const isUploading = ref(false)
  const isSearching = ref(false)

  function addUploadRecord(record) {
    uploadHistory.value.unshift({
      ...record,
      timestamp: new Date()
    })
  }

  return { searchResults, uploadHistory, isUploading, isSearching, addUploadRecord }
})
