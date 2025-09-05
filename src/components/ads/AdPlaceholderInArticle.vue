<template>
  <div class="ad-placeholder-container in-article-ad">
    <!-- 
      KODE IKLAN ADSENSE UNTUK IN-ARTICLE AKAN DITEMPEL DI SINI.
      Misalnya, kode untuk unit iklan In-article atau 300x250.
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
  width: 100%;
  max-width: 100%;
  min-height: 250px; /* Ukuran umum untuk medium rectangle ad (300x250) */
  background-color: #f0f0f0;
  border: 1px dashed #ccc;
  border-radius: var(--border-radius);
  /* Memberikan ruang vertikal agar tidak menempel dengan teks */
  margin: var(--spacing-lg) 0;
}

.ad-placeholder-visual {
  font-family: sans-serif;
  font-size: 0.9rem;
  color: #aaa;
}
</style>