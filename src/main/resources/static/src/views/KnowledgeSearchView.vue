<template>
  <div>
    <h1 class="text-h4 mb-6">知识搜索</h1>

    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="query"
              label="搜索内容"
              placeholder="输入搜索关键词或问题..."
              prepend-icon="mdi-magnify"
              clearable
              @keyup.enter="handleSearch"
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-slider
              v-model="topK"
              label="返回数量"
              :min="1"
              :max="10"
              :step="1"
              thumb-label
            />
          </v-col>
          <v-col cols="12" md="2" class="d-flex align-center">
            <v-btn
              color="primary"
              block
              :loading="isSearching"
              :disabled="!query"
              @click="handleSearch"
            >
              搜索
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- 搜索结果 -->
    <div v-if="results.length > 0">
      <h2 class="text-h5 mb-4">搜索结果</h2>
      <v-row>
        <v-col
          v-for="(result, index) in results"
          :key="index"
          cols="12"
        >
          <v-card>
            <v-card-text>
              <div class="d-flex align-center mb-2">
                <v-chip color="primary" size="small" class="mr-2">
                  {{ result.category || '未分类' }}
                </v-chip>
                <span class="text-caption text-grey">来源：{{ result.source || '未知' }}</span>
              </div>
              <div class="text-body-1">{{ result.content }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <EmptyState
      v-else-if="searched"
      icon="mdi-magnify-close"
      title="未找到相关结果"
      description="尝试使用不同的关键词搜索"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { searchKnowledge } from '@/api/knowledge'
import EmptyState from '@/components/common/EmptyState.vue'

const query = ref('')
const topK = ref(3)
const results = ref([])
const isSearching = ref(false)
const searched = ref(false)

async function handleSearch() {
  if (!query.value) return

  isSearching.value = true
  searched.value = true

  try {
    results.value = await searchKnowledge(query.value, topK.value)
  } catch (error) {
    console.error('Search error:', error)
    results.value = []
  } finally {
    isSearching.value = false
  }
}
</script>
