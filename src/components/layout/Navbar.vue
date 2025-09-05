<template>
  <header class="site-header">
    <div class="header-container">
      <router-link to="/" class="site-title" @click="closeMobileMenu">{{ siteName }}</router-link>

      <nav class="desktop-nav">
        <router-link to="/">Tools</router-link>
        <router-link to="/blog">Blog</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>

      <button class="mobile-nav-toggle" @click="toggleMobileMenu" aria-label="Toggle Navigation">
        <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"/></svg>
      </button>

      <nav class="mobile-nav" :class="{ 'is-open': isMobileMenuOpen }" @click="closeMobileMenu">
        <router-link to="/">Tools</router-link>
        <router-link to="/blog">Blog</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
      
      <div v-if="isMobileMenuOpen" class="overlay" @click="closeMobileMenu"></div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const siteName = import.meta.env.VITE_SITE_NAME || 'KontenKit';

const isMobileMenuOpen = ref(false);
const route = useRoute();

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});

watch(() => route.path, () => {
  closeMobileMenu();
});
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--card-background);
  border-bottom: 1px solid var(--border-color);
  transition: box-shadow 0.2s ease;
  padding: 0 var(--spacing-md);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px; /* Tinggi header tetap */
  max-width: var(--container-max-width);
  margin: 0 auto;
}

.site-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  z-index: 1001;
}
.desktop-nav {
  display: none;
}
.mobile-nav-toggle {
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
  color: var(--text-primary);
}

.mobile-nav {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background-color: var(--card-background);
  box-shadow: -5px 0 15px rgba(0,0,0,0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  padding: 6rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.mobile-nav.is-open {
  transform: translateX(0);
}
.mobile-nav a {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.75rem 0;
  transition: color 0.2s ease;
}
.mobile-nav a:hover,
.mobile-nav a.router-link-exact-active {
  color: var(--primary-color);
}

.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

@media (min-width: 768px) {
  .site-header {
    padding: 0 var(--spacing-lg);
  }
  .desktop-nav {
    display: flex;
    gap: 2rem;
  }
  .desktop-nav a {
    text-decoration: none;
    color: var(--text-secondary);
    font-weight: 600;
    font-size: 1rem;
    transition: color 0.2s ease;
  }
  .desktop-nav a:hover {
    color: var(--text-primary);
    text-decoration: none;
  }
  .desktop-nav a.router-link-exact-active {
    color: var(--primary-color);
  }
  .mobile-nav-toggle, .mobile-nav, .overlay {
    display: none;
  }
}
</style>

<style>
body.no-scroll {
  overflow: hidden;
}
</style>