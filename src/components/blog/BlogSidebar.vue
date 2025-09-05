<template>
  <aside class="blog-sidebar">
    <div class="sidebar-widget">
      <h3 class="widget-title">Popular Posts</h3>
      <ul class="post-list">
        <li v-for="post in popularPosts" :key="post.slug">
          <router-link :to="`/blog/${post.slug}`">
            <span class="post-title">{{ post.term }}</span>
            <span class="post-category">{{ post.category }}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Placeholder Iklan untuk Sidebar -->
    <AdPlaceholderSidebar />

    <div class="sidebar-widget">
      <h3 class="widget-title">Recent Posts</h3>
      <ul class="post-list">
        <li v-for="post in recentPosts" :key="post.slug">
          <router-link :to="`/blog/${post.slug}`">
            <span class="post-title">{{ post.term }}</span>
            <span class="post-date">{{ formatDate(post.date) }}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="sidebar-widget">
      <h3 class="widget-title">Categories</h3>
      <ul class="category-list">
        <li v-for="category in categories" :key="category">
          <a href="#">{{ category }}</a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import allPosts from '@/data/marketing-glossary.json';
import AdPlaceholderSidebar from '@/components/ads/AdPlaceholderSidebar.vue';

const today = new Date();
today.setHours(0, 0, 0, 0);
const publishedPosts = allPosts.filter(post => new Date(post.date) <= today);

const popularPosts = computed(() => {
  return publishedPosts.filter(post => post.isPopular === true).slice(0, 5);
});

const recentPosts = computed(() => {
  return [...publishedPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
});

const categories = computed(() => {
  const categorySet = new Set(publishedPosts.map(post => post.category));
  return Array.from(categorySet).sort();
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};
</script>

<style scoped>
.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.sidebar-widget {
  background-color: var(--card-background);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}
.widget-title {
  margin: 0 0 1rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-color);
  font-size: 1.1rem;
}
.post-list, .category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.post-list li {
  margin-bottom: 1rem;
}
.post-list li:last-child {
  margin-bottom: 0;
}
.post-list a {
  text-decoration: none;
  color: var(--text-primary);
  display: block;
}
.post-list a:hover .post-title {
  color: var(--primary-color);
}
.post-title {
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
  transition: color 0.2s ease;
}
.post-category, .post-date {
  font-size: 0.85rem;
  color: var(--text-secondary);
}
.category-list a {
  text-decoration: none;
  color: var(--text-primary);
  background-color: var(--background-light);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
  margin: 0.25rem;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}
.category-list a:hover {
  background-color: var(--primary-color);
  color: #fff;
}
</style>