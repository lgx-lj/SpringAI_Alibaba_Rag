<template>
  <div>
    <h1 class="text-h4 mb-6">视觉分析</h1>

    <v-tabs v-model="activeTab" class="mb-4">
      <v-tab value="url">URL 分析</v-tab>
      <v-tab value="upload">上传分析</v-tab>
      <v-tab value="compare">多图对比</v-tab>
    </v-tabs>

    <v-tabs-window v-model="activeTab">
      <!-- URL 分析 -->
      <v-tabs-window-item value="url">
        <v-card>
          <v-card-text>
            <v-text-field
              v-model="imageUrl"
              label="图片 URL"
              placeholder="输入图片的网络地址..."
              prepend-icon="mdi-link"
            />
            <v-text-field
              v-model="urlQuestion"
              label="分析问题"
              placeholder="你想了解图片的什么信息？"
              default="请描述这张图片的内容"
            />
            <v-btn
              color="primary"
              :loading="isAnalyzingUrl"
              :disabled="!imageUrl"
              @click="handleUrlAnalyze"
            >
              分析图片
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card v-if="urlResult" class="mt-4">
          <v-card-text>
            <div class="text-body-1" style="white-space: pre-wrap;">{{ urlResult }}</div>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>

      <!-- 上传分析 -->
      <v-tabs-window-item value="upload">
        <v-card>
          <v-card-text>
            <FileUpload
              v-model:files="uploadFiles"
              label="选择图片文件"
              accept="image/*"
              prepend-icon="mdi-image"
            />
            <v-text-field
              v-model="uploadQuestion"
              label="分析问题"
              placeholder="你想了解图片的什么信息？"
              default="请描述这张图片的内容"
              class="mt-4"
            />
            <v-btn
              color="primary"
              :loading="isAnalyzingUpload"
              :disabled="uploadFiles.length === 0"
              @click="handleUploadAnalyze"
            >
              分析图片
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card v-if="uploadResult" class="mt-4">
          <v-card-text>
            <div class="text-body-1" style="white-space: pre-wrap;">{{ uploadResult }}</div>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>

      <!-- 多图对比 -->
      <v-tabs-window-item value="compare">
        <v-card>
          <v-card-text>
            <FileUpload
              v-model:files="compareFiles"
              label="选择多张图片"
              accept="image/*"
              multiple
              prepend-icon="mdi-image-multiple"
            />
            <v-text-field
              v-model="compareQuestion"
              label="对比问题"
              placeholder="你想对比这些图片的什么方面？"
              class="mt-4"
            />
            <v-btn
              color="primary"
              :loading="isComparing"
              :disabled="compareFiles.length < 2"
              @click="handleCompare"
            >
              对比分析
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card v-if="compareResult" class="mt-4">
          <v-card-text>
            <div class="text-body-1" style="white-space: pre-wrap;">{{ compareResult }}</div>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { analyzeImageUrl, analyzeUploadedImage, compareImages } from '@/api/vision'
import FileUpload from '@/components/common/FileUpload.vue'

const activeTab = ref('url')

// URL 分析
const imageUrl = ref('')
const urlQuestion = ref('请描述这张图片的内容')
const urlResult = ref('')
const isAnalyzingUrl = ref(false)

async function handleUrlAnalyze() {
  isAnalyzingUrl.value = true
  try {
    urlResult.value = await analyzeImageUrl(imageUrl.value, urlQuestion.value)
  } catch (error) {
    console.error('Analyze error:', error)
    urlResult.value = '分析失败：' + (error.message || '未知错误')
  } finally {
    isAnalyzingUrl.value = false
  }
}

// 上传分析
const uploadFiles = ref([])
const uploadQuestion = ref('请描述这张图片的内容')
const uploadResult = ref('')
const isAnalyzingUpload = ref(false)

async function handleUploadAnalyze() {
  if (uploadFiles.value.length === 0) return
  isAnalyzingUpload.value = true
  try {
    uploadResult.value = await analyzeUploadedImage(uploadFiles.value[0], uploadQuestion.value)
  } catch (error) {
    console.error('Analyze error:', error)
    uploadResult.value = '分析失败：' + (error.message || '未知错误')
  } finally {
    isAnalyzingUpload.value = false
  }
}

// 多图对比
const compareFiles = ref([])
const compareQuestion = ref('')
const compareResult = ref('')
const isComparing = ref(false)

async function handleCompare() {
  if (compareFiles.value.length < 2) return
  isComparing.value = true
  try {
    compareResult.value = await compareImages(compareFiles.value, compareQuestion.value)
  } catch (error) {
    console.error('Compare error:', error)
    compareResult.value = '对比失败：' + (error.message || '未知错误')
  } finally {
    isComparing.value = false
  }
}
</script>
