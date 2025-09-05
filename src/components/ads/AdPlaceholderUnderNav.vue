<template>
  <div class="ad-placeholder-container under-nav-leaderboard">
    <!-- 
      KODE IKLAN ADSENSE UNTUK DI BAWAH NAVIGASI AKAN DITEMPEL DI SINI.
      Misalnya, kode untuk unit iklan ukuran 728x90 (Leaderboard).
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
  /* Memberi sedikit ruang di atas, dan lebih banyak di bawah sebelum konten utama */
  margin: var(--spacing-md) auto;
  width: 100%;
  max-width: 728px;
  height: 90px;
  background-color: #f0f0f0;
  border: 1px dashed #ccc;
  border-radius: var(--border-radius);
}

.ad-placeholder-visual {
  font-family: sans-serif;
  font-size: 0.9rem;
  color: #aaa;
}

/* Di layar yang sangat kecil, kita kecilkan placeholder agar tidak terlalu besar */
@media (max-width: 767px) {
  .ad-placeholder-container {
    max-width: 320px;
    height: 100px;
  }
}
</style>