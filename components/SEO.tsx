
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://typing-practice.online';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  ogType?: 'website' | 'article';
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a good typing speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average typing speed is 40 WPM. Above 60 WPM is fast and 80+ WPM is excellent."
      }
    },
    {
      "@type": "Question",
      "name": "How do I improve my typing speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Practice daily for 10-15 minutes focusing on accuracy first. Speed improves naturally."
      }
    },
    {
      "@type": "Question",
      "name": "Is this typing test free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes completely free with no sign-up needed."
      }
    },
    {
      "@type": "Question",
      "name": "What is WPM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WPM stands for Words Per Minute. Every 5 characters counts as one word."
      }
    }
  ]
};

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords,
  canonicalPath, 
  noIndex = false,
  ogType = 'website',
}) => {
  const location = useLocation();
  const url = `${SITE_URL}${canonicalPath || location.pathname}`;
  const fullTitle = title;

  const shouldNoIndex = 
    location.pathname === '/signin' ||
    location.pathname === '/profile' ||
    location.pathname.includes('/admin');

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "Typing Practice Online",
      "url": "https://typing-practice.online"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      
      {/* Robots */}
      <meta name="robots" content={(noIndex || shouldNoIndex) ? "noindex, nofollow" : "index, follow"} />

      {/* International SEO */}
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="en-IN" href={url} />
      <link rel="alternate" hrefLang="x-default" href="https://typing-practice.online/" />

      {/* Open Graph / Facebook */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Typing Practice Online" />
      <meta property="og:image" content="https://typing-practice.online/og-image.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://typing-practice.online/og-image.png" />

      {/* Site Verification */}
      <meta name="google-site-verification" content="66d332494c486c98" />


      {location.pathname === '/' && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {location.pathname.startsWith('/blog/') && location.pathname !== '/blog' && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
