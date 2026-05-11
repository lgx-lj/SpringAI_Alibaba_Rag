<template>
  <div>
    <h1 class="text-h4 mb-6">图片生成</h1>

    <!-- 全屏加载遮罩 -->
    <v-overlay
      :model-value="isAnyGenerating"
      class="align-center justify-center"
      persistent
    >
      <v-card class="pa-6 text-center" min-width="300">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          width="6"
          class="mb-4"
        />
        <div class="text-h6 mb-2">正在生成图片</div>
        <div class="text-body-2 text-grey">AI 正在创作中，请稍候...</div>
        <div class="text-caption text-grey mt-2">通常需要 10-30 秒</div>
      </v-card>
    </v-overlay>

    <v-tabs v-model="activeTab" class="mb-4">
      <v-tab value="basic">基础生成</v-tab>
      <v-tab value="custom">自定义生成</v-tab>
      <v-tab value="product">商品图片</v-tab>
    </v-tabs>

    <v-tabs-window v-model="activeTab">
      <!-- 基础生成 -->
      <v-tabs-window-item value="basic">
        <v-card>
          <v-card-text>
            <v-textarea
              v-model="basicDescription"
              label="图片描述"
              placeholder="描述你想要生成的图片..."
              rows="3"
            />
            <v-btn
              color="primary"
              :loading="isGenerating"
              :disabled="!basicDescription"
              @click="handleBasicGenerate"
            >
              生成图片
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card v-if="basicResult" class="mt-4">
          <v-card-text>
            <v-img :src="basicResult" max-height="500" contain />
          </v-card-text>
        </v-card>
      </v-tabs-window-item>

      <!-- 自定义生成 -->
      <v-tabs-window-item value="custom">
        <v-card>
          <v-card-text>
            <v-textarea
              v-model="customDescription"
              label="图片描述"
              placeholder="描述你想要生成的图片..."
              rows="3"
            />
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model.number="customCount"
                  label="生成数量"
                  type="number"
                  min="1"
                  max="4"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model.number="customWidth"
                  label="宽度"
                  type="number"
                  min="256"
                  max="2048"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model.number="customHeight"
                  label="高度"
                  type="number"
                  min="256"
                  max="2048"
                />
              </v-col>
            </v-row>
            <v-btn
              color="primary"
              :loading="isGeneratingCustom"
              :disabled="!customDescription"
              @click="handleCustomGenerate"
            >
              生成图片
            </v-btn>
          </v-card-text>
        </v-card>

        <v-row v-if="customResults.length > 0" class="mt-4">
          <v-col
            v-for="(url, index) in customResults"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card>
              <v-img :src="url" height="300" cover />
            </v-card>
          </v-col>
        </v-row>
      </v-tabs-window-item>

      <!-- 商品图片 -->
      <v-tabs-window-item value="product">
        <v-card>
          <v-card-text>
            <v-text-field
              v-model="productName"
              label="商品名称"
              placeholder="例如：无线蓝牙耳机"
            />
            <v-text-field
              v-model="productStyle"
              label="风格要求"
              placeholder="例如：简约现代、科技感"
            />
            <v-textarea
              v-model="productDesc"
              label="商品描述"
              placeholder="描述商品的特点和卖点..."
              rows="3"
            />
            <v-btn
              color="primary"
              :loading="isGeneratingProduct"
              :disabled="!productName"
              @click="handleProductGenerate"
            >
              生成商品图
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card v-if="productResult" class="mt-4">
          <v-card-text>
            <div class="mb-2 text-caption">生成的 Prompt：{{ productResult.prompt }}</div>
            <v-img :src="productResult.imageUrl" max-height="500" contain />
          </v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { generateImage, generateCustomImage, generateProductImage } from '@/api/image'

const activeTab = ref('basic')

// 计算是否有任何生成任务正在进行
const isAnyGenerating = computed(() => {
  return isGenerating.value || isGeneratingCustom.value || isGeneratingProduct.value
})

// 基础生成
const basicDescription = ref('')
const basicResult = ref('')
const isGenerating = ref(false)

async function handleBasicGenerate() {
  isGenerating.value = true
  try {
    basicResult.value = await generateImage(basicDescription.value)
  } catch (error) {
    console.error('Generate error:', error)
  } finally {
    isGenerating.value = false
  }
}

// 自定义生成
const customDescription = ref('')
const customCount = ref(1)
const customWidth = ref(1024)
const customHeight = ref(1024)
const customResults = ref([])
const isGeneratingCustom = ref(false)

async function handleCustomGenerate() {
  isGeneratingCustom.value = true
  try {
    customResults.value = await generateCustomImage(
      customDescription.value,
      customCount.value,
      customWidth.value,
      customHeight.value
    )
  } catch (error) {
    console.error('Generate error:', error)
  } finally {
    isGeneratingCustom.value = false
  }
}

// 商品图片
const productName = ref('')
const productStyle = ref('')
const productDesc = ref('')
const productResult = ref(null)
const isGeneratingProduct = ref(false)

async function handleProductGenerate() {
  isGeneratingProduct.value = true
  try {
    productResult.value = await generateProductImage(
      productName.value,
      productStyle.value,
      productDesc.value
    )
  } catch (error) {
    console.error('Generate error:', error)
  } finally {
    isGeneratingProduct.value = false
  }
}
</script>
