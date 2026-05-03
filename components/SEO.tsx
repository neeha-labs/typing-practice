
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
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords,
  canonicalPath, 
  noIndex = false,
  ogType = 'website',
  schema
}) => {
  const location = useLocation();
  const url = `${SITE_URL}${canonicalPath || location.pathname}`;
  const fullTitle = title.includes('Typing-Practice.online') ? title : `${title} | Typing-Practice.online`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Typing Practice Online",
    "url": "https://typing-practice.online",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "description": "Free online typing test to improve WPM typing speed and accuracy",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://typing-practice.online/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Typing Test",
        "item": "https://typing-practice.online/typing-test"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Typing Lessons",
        "item": "https://typing-practice.online/lessons"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Exam Mode",
        "item": "https://typing-practice.online/exam-mode"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a good typing speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average typing speed is 40 WPM. Above 60 WPM is fast, and 80+ WPM is excellent for professionals."
        }
      },
      {
        "@type": "Question",
        "name": "How do I improve my typing speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Practice daily for 10-15 minutes focusing on accuracy first. Speed will naturally improve over time."
        }
      },
      {
        "@type": "Question",
        "name": "Is this typing test free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, completely free with no sign-up required."
        }
      },
      {
        "@type": "Question",
        "name": "What is WPM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WPM means Words Per Minute. Every 5 characters is counted as one word in the standard calculation."
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />

      {/* International SEO */}
      <link rel="alternate" hrefLang="en-in" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Typing-Practice.online" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(webAppSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      {location.pathname === '/' && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
