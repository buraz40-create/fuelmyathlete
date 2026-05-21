import Script from "next/script";
import type { Guide } from "@/types/domain";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

const ORG_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/#editorial-team`;

export function GuideJsonLd({ guide }: { guide: Guide }) {
  const url = `${SITE_URL}/guides/${guide.slug}`;
  const articleId = `${url}#article`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": articleId,
    headline: guide.title,
    description: guide.metaDescription,
    url,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    keywords: guide.primaryKeyword,
    image: `${SITE_URL}/opengraph-image`,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    citation: guide.citations.map((c) => ({
      "@type": "CreativeWork",
      name: c.title,
      author: c.authors,
      publisher: c.publisher,
      datePublished: c.year ? `${c.year}` : undefined,
      url: c.url,
    })),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".guide-answer"],
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      { "@type": "ListItem", position: 3, name: guide.title, item: url },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const howTo = guide.howTo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: guide.howTo.name,
        description: guide.howTo.description,
        step: guide.howTo.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      }
    : null;

  return (
    <>
      <Script
        id={`ld-article-${guide.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <Script
        id={`ld-breadcrumb-${guide.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Script
        id={`ld-faq-${guide.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      {howTo && (
        <Script
          id={`ld-howto-${guide.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
        />
      )}
    </>
  );
}
