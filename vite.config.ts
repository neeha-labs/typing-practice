import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        sitemap({
          hostname: 'https://typing-practice.online',
          exclude: ['/google66d332494c486c98', '/google66d332494c486c98.html', '/index.html'],
          dynamicRoutes: [
            '/typing-test',
            '/typing-speed-test',
            '/lessons',
            '/exam-mode',
            '/tools',
            '/typing-test/30-second-typing-test',
            '/typing-test/45-second-typing-test',
            '/typing-test/60-second-typing-test',
            '/typing-test/90-second-typing-test',
            '/typing-test/120-second-typing-test',
            '/typing-test/300-second-typing-test',
            '/easy-typing-test',
            '/hard-typing-test',
            '/typing-test-for-beginners',
            '/typing-test-with-numbers',
            '/paragraph-typing-test',
            '/rrb-typing-test-practice',
            '/ibps-typing-test-practice',
            '/sbi-typing-test-practice',
            '/typing-practice',
            '/practice',
            '/wpm-calculator',
            '/typing-accuracy-calculator',
            '/blog',
            '/blog/how-to-improve-typing-speed',
            '/blog/common-typing-mistakes',
            '/blog/how-wpm-is-calculated',
            '/blog/government-exam-typing-tips',
            '/about',
            '/contact',
            '/privacy',
            '/terms',
            '/sitemap'
          ],
          robots: [
            {
              userAgent: '*',
              allow: '/'
            },
            {
              userAgent: 'Googlebot',
              allow: '/'
            },
            {
              userAgent: 'Googlebot-Image',
              allow: '/'
            },
            {
              userAgent: 'ChatGPT-User',
              allow: '/'
            },
            {
              userAgent: 'OAI-SearchBot',
              allow: '/'
            },
            {
              userAgent: 'PerplexityBot',
              allow: '/'
            },
            {
              userAgent: 'anthropic-ai',
              allow: '/'
            },
            {
              userAgent: 'ClaudeBot',
              allow: '/'
            },
            {
              userAgent: 'Google-Extended',
              allow: '/'
            },
            {
              userAgent: 'Bingbot',
              allow: '/'
            },
            {
              userAgent: 'AhrefsBot',
              disallow: '/'
            },
            {
              userAgent: 'MJ12bot',
              disallow: '/'
            },
            {
              userAgent: 'DotBot',
              disallow: '/'
            }
          ]
        })
      ],
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            },
          },
        },
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
