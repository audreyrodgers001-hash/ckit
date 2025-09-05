<template>
  <div class="ad-placeholder-container sidebar-ad">
    <!-- 
      KODE IKLAN ADSENSE UNTUK SIDEBAR AKAN DITEMPEL DI SINI.
      Misalnya, kode untuk unit iklan ukuran 300x250 atau 300x600.
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
  min-height: 250px; /* Ukuran umum untuk medium rectangle ad */
  background-color: #f0f0f0;
  border: 1px dashed #ccc;
  border-radius: var(--border-radius);
}

.ad-placeholder-visual {
  font-family: sans-serif;
  font-size: 0.9rem;
  color: #aaa;
}
</style>