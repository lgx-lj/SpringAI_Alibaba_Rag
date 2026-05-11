import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: '首页', icon: 'mdi-home' }
      },
      {
        path: 'chat',
        name: 'Chat',
        component: () => import('@/views/ChatView.vue'),
        meta: { title: 'AI 对话', icon: 'mdi-chat' }
      },
      {
        path: 'knowledge',
        name: 'Knowledge',
        component: () => import('@/views/KnowledgeView.vue'),
        meta: { title: '知识库管理', icon: 'mdi-database' }
      },
      {
        path: 'knowledge/search',
        name: 'KnowledgeSearch',
        component: () => import('@/views/KnowledgeSearchView.vue'),
        meta: { title: '知识搜索', icon: 'mdi-magnify' }
      },
      {
        path: 'rag',
        name: 'RAG',
        component: () => import('@/views/RAGView.vue'),
        meta: { title: 'RAG 问答', icon: 'mdi-brain' }
      },
      {
        path: 'image',
        name: 'ImageGeneration',
        component: () => import('@/views/ImageGenerationView.vue'),
        meta: { title: '图片生成', icon: 'mdi-image' }
      },
      {
        path: 'vision',
        name: 'Vision',
        component: () => import('@/views/VisionView.vue'),
        meta: { title: '视觉分析', icon: 'mdi-eye' }
      },
      {
        path: 'invoice',
        name: 'Invoice',
        component: () => import('@/views/InvoiceView.vue'),
        meta: { title: '发票 OCR', icon: 'mdi-receipt' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
