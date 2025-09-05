import fs from 'fs/promises';
import path from 'path';

const DIST_PATH = path.resolve(process.cwd(), 'dist');
const DATA_PATH = path.resolve(process.cwd(), 'src/data/marketing-glossary.json');
const SITE_URL = 'https://www.kontenkit.com'; // Ganti dengan domain asli Anda

async function main() {
  console.log('Generating sitemap...');

  try {
    const fileContent = await fs.readFile(DATA_PATH, 'utf-8');
    const articles = JSON.parse(fileContent);

    const today = new Date().toISOString().split('T')[0];

    const staticPages = [
      { url: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
      { url: '/blog', lastmod: today, changefreq: 'daily', priority: '0.9' },
      { url: '/about', lastmod: today, changefreq: 'monthly', priority: '0.7' },
      { url: '/contact', lastmod: today, changefreq: 'monthly', priority: '0.7' },
    ];

    const articlePages = articles.map(article => ({
      url: `/blog/${article.slug}`,
      lastmod: article.date,
      changefreq: 'yearly',
      priority: '0.8',
    }));

    const allPages = [...staticPages, ...articlePages];

    const sitemapContent = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPages.map(page => `
          <url>
            <loc>${SITE_URL}${page.url}</loc>
            <lastmod>${page.lastmod}</lastmod>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
          </url>
        `).join('')}
      </urlset>
    `.trim();

    await fs.writeFile(path.join(DIST_PATH, 'sitemap.xml'), sitemapContent);
    console.log('Sitemap generated successfully!');

  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

main();