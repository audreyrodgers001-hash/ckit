 
<template>
  <div class="legal-page">
    <header class="page-header">
      <h1>Privacy Policy</h1>
      <p><strong>Last updated: {{ lastUpdated }}</strong></p>
    </header>
    
    <div class="content-wrapper">
      <p>Your privacy is important to us. It is {{ siteName }}'s policy to respect your privacy regarding any information we may collect from you across our website, <a :href="siteUrl">{{ siteUrl }}</a>, and other sites we own and operate.</p>
      
      <h2>1. Information We Collect</h2>
      <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>

      <h2>2. Use of Information</h2>
      <p>We may use the information we collect for various purposes, including to provide, maintain, and improve our services, and to develop new services.</p>

      <h2>3. Cookies and Web Beacons</h2>
      <p>Like any other website, {{ siteName }} uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
      <p>Our site may use third-party advertising partners like Google AdSense, which use cookies to serve ads. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Ads Settings.</p>

      <h2>4. Changes to This Privacy Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

      <h2>5. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please <router-link to="/contact">contact us</router-link>.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useHead } from '@unhead/vue';

const siteName = import.meta.env.VITE_SITE_NAME;
const siteUrl = import.meta.env.VITE_SITE_URL;

const lastUpdated = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
});

const pageTitle = `Privacy Policy | ${siteName}`;
const pageDescription = `Read the Privacy Policy for ${siteName}. Learn how we handle your data and respect your privacy when you use our free content creator tools.`;
const pageUrl = `${siteUrl}/privacy-policy`;

useHead({
  title: pageTitle,
  link: [
    { rel: 'canonical', href: pageUrl }
  ],
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:url', content: pageUrl },
    { property: 'og:image', content: `${siteUrl}/logo.png` },
  ],
});
</script>

<style scoped>
.legal-page {
  max-width: 800px;
  margin: 0 auto;
}
.page-header {
  text-align: center;
  margin-bottom: 2rem;
}
.page-header h1 {
  font-size: 2.5rem;
}
.content-wrapper {
  background-color: var(--card-background);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  line-height: var(--line-height-base);
}
@media (min-width: 768px) {
  .content-wrapper {
    padding: 3rem;
  }
}
.content-wrapper h2 {
  font-size: 1.75rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}
.content-wrapper p {
  margin-bottom: 1rem;
}
</style>