import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: 실제 도메인으로 교체하세요. canonical/OG/sitemap 이 값을 기준으로 생성됩니다.
export default defineConfig({
  site: 'https://xn--o39a782a41n9td.com',

  // URL 뒤에 슬래시를 붙이지 않는 정책 (예: /service, /faq)
  trailingSlash: 'never',

  // 슬래시 없는 URL이 정적 호스팅에서 그대로 뜨도록 파일 형태로 빌드
  // (service.astro -> /service.html, 요청 /service 로 서빙)
  build: {
    format: 'file',
  },

  integrations: [sitemap()],
});
