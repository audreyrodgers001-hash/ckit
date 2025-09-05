<template>
  <div class="blog-index-page">
    <header class="page-header">
      <h1>The KontenKit Blog</h1>
      <p>Tips, tricks, and insights for modern content creators.</p>
    </header>

    <div v-if="sortedPosts.length > 0" class="posts-grid">
      <BlogPostCard
        v-for="post in sortedPosts"
        :key="post.slug"
        :title="post.term"
        :description="post.summary"
        :date="post.date"
        :slug="post.slug"
      />
    </div>
    <div v-else class="no-posts">
      <p>No articles published yet. Please check back later!</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import BlogPostCard from '@/components/ui/BlogPostCard.vue';
import allPosts from '@/data/marketing-glossary.json';

const today = new Date();
today.setHours(0, 0, 0, 0);

const publishedPosts = computed(() => {
  return allPosts.filter(post => {
    if (!post.date) return false;
    const postDate = new Date(post.date);
    return postDate <= today;
  });
});

const sortedPosts = computed(() => {
  return publishedPosts.value.sort((a, b) => new Date(b.date) - new Date(a.date));
});
</script>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}
.page-header h1 {
  font-size: 2rem; /* Ukuran lebih kecil untuk mobile */
  margin-bottom: 0.5rem;
}
.page-header p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 500px; /* Mencegah teks terlalu lebar di mobile */
  margin-left: auto;
  margin-right: auto;
}

/* Tata Letak Masonry */
.posts-grid {
  column-count: 1;
  column-gap: var(--spacing-md);
}
.posts-grid > * {
  break-inside: avoid;
  margin-bottom: var(--spacing-md);
}

/* Breakpoint untuk Tablet */
@media (min-width: 768px) {
  .page-header h1 {
    font-size: 2.5rem; /* Kembali ke ukuran asli di layar lebih besar */
  }
  .posts-grid {
    column-count: 2;
  }
}

/* Breakpoint untuk Desktop */
@media (min-width: 992px) {
  .posts-grid {
    column-count: 3;
  }
}

.no-posts {
  text-align: center;
  margin-top: 4rem;
  color: var(--text-secondary);
}
</style>