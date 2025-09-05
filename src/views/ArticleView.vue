<template>
  <div class="article-layout" v-if="articleData">
    <main class="main-content">
      <div class="article-wrapper">
        <p class="article-category">{{ articleData.category }}</p>
        <h1>{{ articleData.term }}</h1>
        <p class="publish-date">Published on: {{ formattedDate }}</p>
        
        <p class="summary"><em>{{ articleData.summary }}</em></p>
        
        <div class="article-content" v-html="deepDiveHtml"></div>

        <!-- Placeholder Iklan In-Article Pertama -->
        <AdPlaceholderInArticle />

        <h2>Why is {{ articleData.term }} Important?</h2>
        <div class="article-content" v-html="importanceHtml"></div>

        <div v-if="articleData.prosCons && articleData.prosCons.length">
          <h2>Pros & Cons</h2>
          <div v-for="item in articleData.prosCons" :key="item.point" class="pros-cons-item">
            <h3>{{ item.point }}</h3>
            <p>{{ item.explanation }}</p>
          </div>
        </div>

        <!-- Placeholder Iklan In-Article Kedua -->
        <AdPlaceholderInArticle />

        <div v-if="articleData.faq && articleData.faq.length" class="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div v-for="item in articleData.faq" :key="item.question" class="faq-item">
            <h3>{{ item.question }}</h3>
            <p>{{ item.answer }}</p>
          </div>
        </div>
        
        <SocialShare :title="articleData.term" />
      </div>
      
      <ArticlePagination :prev="pagination.prev" :next="pagination.next" />

    </main>

    <div class="sidebar-wrapper">
      <BlogSidebar />
    </div>

  </div>
  <div v-else class="article-wrapper">
    <h1>Article Not Found</h1>
    <p>Sorry, we couldn't find the article you were looking for.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import MarkdownIt from 'markdown-it';
import allArticles from '@/data/marketing-glossary.json';
import BlogSidebar from '@/components/blog/BlogSidebar.vue';
import SocialShare from '@/components/ui/SocialShare.vue';
import ArticlePagination from '@/components/blog/ArticlePagination.vue';
import AdPlaceholderInArticle from '@/components/ads/AdPlaceholderInArticle.vue';

const route = useRoute();
const slug = route.params.slug;
const md = new MarkdownIt({ html: true });

const articleData = computed(() => {
  return allArticles.find(article => article.slug === slug);
});

const deepDiveHtml = computed(() => {
  return articleData.value ? md.render(articleData.value.deepDive || '') : '';
});

const importanceHtml = computed(() => {
  return articleData.value ? md.render(articleData.value.importance || '') : '';
});

const formattedDate = computed(() => {
  if (!articleData.value?.date) return '';
  return new Date(articleData.value.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
});

const sortedPublishedPosts = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return allArticles
    .filter(post => new Date(post.date) <= today)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
});

const pagination = computed(() => {
  const currentIndex = sortedPublishedPosts.value.findIndex(p => p.slug === slug);
  if (currentIndex === -1) return { prev: null, next: null };
  
  const prev = currentIndex < sortedPublishedPosts.value.length - 1 ? sortedPublishedPosts.value[currentIndex + 1] : null;
  const next = currentIndex > 0 ? sortedPublishedPosts.value[currentIndex - 1] : null;
  
  return { prev, next };
});

const siteUrl = 'https://www.kontenkit.com'; // Ganti dengan domain asli Anda

useHead(() => {
  if (!articleData.value) {
    return { title: 'Article Not Found' };
  }
  
  const articleUrl = `${siteUrl}/blog/${articleData.value.slug}`;
  const pageTitle = `${articleData.value.term} | KontenKit`;
  const pageDescription = articleData.value.summary;

  const faqSchema = (articleData.value.faq && articleData.value.faq.length > 0) ? {
    "@type": "FAQPage",
    "mainEntity": articleData.value.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.value.term,
    "datePublished": articleData.value.date,
    "author": { "@type": "Organization", "name": "KontenKit" },
    "description": pageDescription,
    "mainEntityOfPage": { "@type": "WebPage", "@id": articleUrl },
    ...(faqSchema && { mainEntity: faqSchema })
  };
  
  return {
    title: pageTitle,
    link: [
      { rel: 'canonical', href: articleUrl }
    ],
    meta: [
      { name: 'description', content: pageDescription },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      { property: 'og:url', content: articleUrl },
      { property: 'og:type', content: 'article' },
      { property: 'og:image', content: `${siteUrl}/logo.png` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: pageDescription },
      { name: 'twitter:image', content: `${siteUrl}/logo.png` },
    ],
    script: [
      { type: 'application/ld+json', children: JSON.stringify(articleSchema) }
    ]
  }
});
</script>

<style scoped>
.article-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.main-content {
  flex: 1;
  min-width: 0;
}
@media (min-width: 992px) {
  .article-layout {
    flex-direction: row;
    gap: 3rem;
  }
  .main-content {
    flex: 2;
  }
  .sidebar-wrapper {
    flex: 1;
  }
}
.article-wrapper { 
  background-color: var(--card-background); 
  padding: 1.5rem;
  border-radius: var(--border-radius); 
  border: 1px solid var(--border-color);
}
@media (min-width: 768px) {
  .article-wrapper {
    padding: 2.5rem;
  }
}
.article-category {
  color: var(--primary-color);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
}
.article-wrapper h1 {
  margin-top: 0.5rem;
  font-size: 2rem;
}
@media (min-width: 768px) {
  .article-wrapper h1 {
    font-size: 2.5rem;
  }
}
.publish-date { 
  color: var(--text-secondary); 
  font-style: italic; 
  margin-bottom: var(--spacing-lg);
}
.summary { 
  font-size: var(--font-size-lg);
  color: var(--text-secondary); 
  border-left: 3px solid var(--primary-color); 
  padding-left: var(--spacing-md); 
  margin: var(--spacing-lg) 0;
}
.faq-section { 
  margin-top: var(--spacing-lg); 
}
.pros-cons-item, .faq-item { 
  margin-bottom: var(--spacing-md); 
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--spacing-md);
}
.faq-item:last-child, .pros-cons-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.article-wrapper h2 {
  margin-top: var(--spacing-lg);
}
.article-content :deep(p) {
  margin-bottom: 1rem;
}
.article-content :deep(ul), .article-content :deep(ol) {
  padding-left: 20px;
}
.article-content :deep(li) {
  margin-bottom: 0.5rem;
}
</style>