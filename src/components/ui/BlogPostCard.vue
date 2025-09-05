<template>
  <router-link v-if="slug" :to="`/blog/${slug}`" class="post-card">
    <div class="card-content">
      <span class="post-date">{{ formattedDate }}</span>
      <h2 class="post-title">{{ title || 'Title Not Found' }}</h2>
      <p class="post-description">{{ description || 'Description not found.' }}</p>
      <span class="read-more">Read Article &rarr;</span>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  description: String,
  date: String,
  slug: String
});

const formattedDate = computed(() => {
  // Pemeriksaan keamanan yang paling ketat
  if (!props.date || isNaN(new Date(props.date).getTime())) {
    return 'Invalid Date';
  }
  return new Date(props.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});
</script>

<style scoped>
.post-card {
  display: block;
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-primary);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}
.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px var(--shadow-color);
}
.card-content {
  padding: 1.5rem;
}
.post-date {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  display: block;
}
.post-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: var(--text-primary);
}
.post-description {
  color: var(--text-secondary);
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
}
.read-more {
  font-weight: 600;
  color: var(--primary-color);
}
</style>