
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

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Typing Practice Online",
    "url": "https://typing-practice.online",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "description": "Free typing test to improve WPM speed",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
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
          "text": "Average is 40 WPM. Above 60 WPM is fast. 80+ WPM is excellent for professionals."
        }
      },
      {
        "@type": "Question",
        "name": "How do I improve my typing speed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Practice 10-15 minutes daily. Focus on accuracy first, speed follows naturally."
        }
      },
      {
        "@type": "Question",
        "name": "Is this typing test free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, completely free with no sign-up needed."
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
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="en-IN" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Typing Practice Online" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(webAppSchema)}
      </script>
      {location.pathname === '/' && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
