<template>
  <v-navigation-drawer
    v-model="appStore.drawer"
    :rail="appStore.rail"
    permanent
    @click="appStore.rail = false"
  >
    <v-list-item
      prepend-icon="mdi-robot"
      title="AI 知识库"
      subtitle="Spring AI Alibaba"
      nav
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="appStore.rail = !appStore.rail"
        />
      </template>
    </v-list-item>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.path"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.path"
        rounded="xl"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const menuItems = [
  { path: '/', icon: 'mdi-home', title: '首页' },
  { path: '/chat', icon: 'mdi-chat', title: 'AI 对话' },
  { path: '/knowledge', icon: 'mdi-database', title: '知识库管理' },
  { path: '/knowledge/search', icon: 'mdi-magnify', title: '知识搜索' },
  { path: '/rag', icon: 'mdi-brain', title: 'RAG 问答' },
  { path: '/image', icon: 'mdi-image', title: '图片生成' },
  { path: '/vision', icon: 'mdi-eye', title: '视觉分析' },
  { path: '/invoice', icon: 'mdi-receipt', title: '发票 OCR' }
]
</script>
