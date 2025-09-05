<template>
  <div id="app-container">
    <Navbar />
    <main class="main-content">
      <AdPlaceholderUnderNav />
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import AdPlaceholderUnderNav from '@/components/ads/AdPlaceholderUnderNav.vue'
</script>

<style scoped>
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content { 
  padding-top: 70px;  
  flex-grow: 1; 
}
</style>