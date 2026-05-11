<template>
  <div>
    <h1 class="text-h4 mb-6">知识库管理</h1>

    <v-tabs v-model="activeTab" class="mb-4">
      <v-tab value="upload">PDF 上传</v-tab>
      <v-tab value="text">文本入库</v-tab>
    </v-tabs>

    <v-tabs-window v-model="activeTab">
      <!-- PDF 上传 -->
      <v-tabs-window-item value="upload">
        <v-card>
          <v-card-text>
            <FileUpload
              v-model:files="uploadFiles"
              label="选择 PDF 文件"
              accept=".pdf"
              prepend-icon="mdi-file-pdf-box"
            />

            <v-text-field
              v-model="uploadCategory"
              label="分类标签"
              placeholder="例如：产品文档、技术规范"
              class="mt-4"
            />

            <v-btn
              color="primary"
              :loading="isUploading"
              :disabled="uploadFiles.length === 0"
              @click="handleUpload"
            >
              上传入库
            </v-btn>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>

      <!-- 文本入库 -->
      <v-tabs-window-item value="text">
        <v-card>
          <v-card-text>
            <v-text-field
              v-model="textTitle"
              label="文档标题"
              placeholder="输入文档标题"
            />

            <v-text-field
              v-model="textCategory"
              label="分类标签"
              placeholder="例如：产品文档、技术规范"
            />

            <v-textarea
              v-model="textContent"
              label="文本内容"
              placeholder="输入要入库的文本内容..."
              rows="10"
              auto-grow
            />

            <v-btn
              color="primary"
              :loading="isSubmitting"
              :disabled="!textTitle || !textContent"
              @click="handleTextSubmit"
            >
              提交入库
            </v-btn>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>

    <!-- 上传历史 -->
    <v-card v-if="knowledgeStore.uploadHistory.length > 0" class="mt-6">
      <v-card-title>上传历史</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="(record, index) in knowledgeStore.uploadHistory"
            :key="index"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-file-check" color="success" />
            </template>
            <v-list-item-title>{{ record.filename || record.title }}</v-list-item-title>
            <v-list-item-subtitle>
              分类：{{ record.category }} | 切片数：{{ record.chunks || '-' }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- 提示消息 -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useKnowledgeStore } from '@/stores/knowledge'
import { uploadDocument, uploadText } from '@/api/knowledge'
import FileUpload from '@/components/common/FileUpload.vue'

const knowledgeStore = useKnowledgeStore()

const activeTab = ref('upload')
const uploadFiles = ref([])
const uploadCategory = ref('通用')
const isUploading = ref(false)

const textTitle = ref('')
const textCategory = ref('通用')
const textContent = ref('')
const isSubmitting = ref(false)

const snackbar = reactive({
  show: false,
  message: '',
  color: 'success'
})

async function handleUpload() {
  if (uploadFiles.value.length === 0) return

  isUploading.value = true
  try {
    const result = await uploadDocument(uploadFiles.value[0], uploadCategory.value)
    knowledgeStore.addUploadRecord(result)
    snackbar.message = `上传成功！文件：${result.filename}，切片数：${result.chunks}`
    snackbar.color = 'success'
    snackbar.show = true
    uploadFiles.value = []
  } catch (error) {
    snackbar.message = '上传失败：' + (error.message || '未知错误')
    snackbar.color = 'error'
    snackbar.show = true
  } finally {
    isUploading.value = false
  }
}

async function handleTextSubmit() {
  if (!textTitle.value || !textContent.value) return

  isSubmitting.value = true
  try {
    await uploadText(textTitle.value, textCategory.value, textContent.value)
    knowledgeStore.addUploadRecord({
      title: textTitle.value,
      category: textCategory.value,
      status: 'success'
    })
    snackbar.message = '文本入库成功！'
    snackbar.color = 'success'
    snackbar.show = true
    textTitle.value = ''
    textContent.value = ''
  } catch (error) {
    snackbar.message = '入库失败：' + (error.message || '未知错误')
    snackbar.color = 'error'
    snackbar.show = true
  } finally {
    isSubmitting.value = false
  }
}
</script>
