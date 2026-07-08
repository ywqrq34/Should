import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: 실제 도메인으로 교체하세요. canonical/OG/sitemap 이 값을 기준으로 생성됩니다.
export default defineConfig({
  site: 'https://xn--o39a782a41n9td.com',
  integrations: [sitemap()],
});
