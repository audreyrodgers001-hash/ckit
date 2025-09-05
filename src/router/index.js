import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
  { path: '/blog', name: 'blog', component: () => import('@/views/BlogIndexView.vue') },
  { path: '/contact', name: 'contact', component: () => import('@/views/ContactView.vue') },
  { path: '/privacy-policy', name: 'privacy-policy', component: () => import('@/views/PrivacyPolicyView.vue') },
  { path: '/terms-of-service', name: 'terms-of-service', component: () => import('@/views/TermsOfServiceView.vue') },
  {
    // INI BAGIAN KUNCI YANG DIPERBAIKI:
    // Sekarang rute ini akan selalu memuat komponen ArticleView yang baru dan benar.
    path: '/blog/:slug',
    name: 'post',
    component: () => import('@/views/ArticleView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router