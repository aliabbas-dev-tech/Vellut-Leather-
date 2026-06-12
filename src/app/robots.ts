import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vellutleather.shop';

// Private routes no crawler should index
const DISALLOW = ['/checkout', '/cart', '/api/', '/admin/', '/dashboard/', '/account/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Standard crawlers ──────────────────────────────────────────────
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW,
      },
      // ── Google AI (AI Overviews / Gemini) ──────────────────────────────
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: DISALLOW,
      },
      // ── OpenAI / ChatGPT Search ────────────────────────────────────────
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: DISALLOW,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: DISALLOW,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: DISALLOW,
      },
      // ── Perplexity AI ──────────────────────────────────────────────────
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: DISALLOW,
      },
      // ── Anthropic Claude ──────────────────────────────────────────────
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: DISALLOW,
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: DISALLOW,
      },
      // ── Cohere (Command R) ─────────────────────────────────────────────
      {
        userAgent: 'cohere-ai',
        allow: '/',
        disallow: DISALLOW,
      },
      // ── Meta AI ────────────────────────────────────────────────────────
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: DISALLOW,
      },
      // ── Microsoft Copilot / Bing AI ────────────────────────────────────
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: DISALLOW,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
