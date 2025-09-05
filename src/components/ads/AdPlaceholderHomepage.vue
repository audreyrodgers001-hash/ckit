<template>
  <div class="ad-placeholder-container homepage-leaderboard">
    <!-- 
      KODE IKLAN ADSENSE UNTUK HOMEPAGE AKAN DITEMPEL DI SINI.
      Misalnya, kode untuk unit iklan ukuran 728x90.
      Untuk sekarang, kita tampilkan placeholder visual.
    -->
    <div class="ad-placeholder-visual">
      <span>Advertisement</span>
    </div>
  </div>
</template>

<script setup>
// Komponen ini sengaja dibiarkan kosong untuk kemudahan penyisipan kode iklan nanti.
</script>

<style scoped>
.ad-placeholder-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: var(--spacing-lg) auto;
  width: 100%;
  max-width: 728px; /* Ukuran umum untuk leaderboard ad */
  height: 90px;
  background-color: #f0f0f0;
  border: 1px dashed #ccc;
}

.ad-placeholder-visual {
  font-family: sans-serif;
  font-size: 0.9rem;
  color: #aaa;
}
</style>