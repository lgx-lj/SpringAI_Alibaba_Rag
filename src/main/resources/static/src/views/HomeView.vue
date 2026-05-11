<template>
  <div>
    <h1 class="text-h4 mb-6">Spring AI Alibaba - RAG 知识库系统</h1>

    <v-row>
      <v-col
        v-for="card in featureCards"
        :key="card.path"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          :to="card.path"
          hover
          class="h-100"
        >
          <v-card-item>
            <template v-slot:prepend>
              <v-icon :icon="card.icon" size="48" color="primary" />
            </template>
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-subtitle>{{ card.description }}</v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const featureCards = [
  {
    path: '/chat',
    icon: 'mdi-chat',
    title: 'AI 对话',
    description: '与通义千问进行智能对话，支持流式输出和多模型切换'
  },
  {
    path: '/knowledge',
    icon: 'mdi-database',
    title: '知识库管理',
    description: '上传 PDF 文档或文本内容，构建专属知识库'
  },
  {
    path: '/knowledge/search',
    icon: 'mdi-magnify',
    title: '知识搜索',
    description: '基于向量相似度的智能语义搜索'
  },
  {
    path: '/rag',
    icon: 'mdi-brain',
    title: 'RAG 问答',
    description: '结合知识库的检索增强生成智能问答'
  },
  {
    path: '/image',
    icon: 'mdi-image',
    title: '图片生成',
    description: 'AI 生成图片，支持自定义参数和商品图生成'
  },
  {
    path: '/vision',
    icon: 'mdi-eye',
    title: '视觉分析',
    description: '图片内容分析、多图对比，支持 URL 和上传'
  },
  {
    path: '/invoice',
    icon: 'mdi-receipt',
    title: '发票 OCR',
    description: '上传发票图片，自动提取结构化信息'
  }
]
</script>
