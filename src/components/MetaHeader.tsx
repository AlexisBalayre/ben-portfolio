import React from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export type PageKey = "home" | "associativeCareer" | "prestation";

interface MetaHeaderProps {
  page?: PageKey;
}

const SITE_URL = "https://benjamin.balayre.com";

/** Les locales du site, dans l'ordre où elles sont annoncées aux moteurs. */
const LOCALES = ["fr", "en"] as const;
type Locale = (typeof LOCALES)[number];

/**
 * URL absolue d'une page dans une locale donnée. Le français vit à la racine,
 * l'anglais sous `/en`. Une seule fonction sert le canonical, les alternates
 * et `og:url` : impossible qu'ils se contredisent, ce qui était le cas quand
 * chacun calculait son URL de son côté.
 */
const urlOf = (page: PageKey, locale: Locale) => {
  const prefix = locale === "fr" ? SITE_URL : `${SITE_URL}/en`;
  return page === "home" ? prefix : `${prefix}/${page}`;
};

/** Libellé court de chaque page dans le fil d'Ariane : le titre meta y serait
 *  trop long, il porte déjà le nom du site. */
const CRUMB_LABEL: Record<Exclude<PageKey, "home">, string> = {
  prestation: "header.photo_video",
  associativeCareer: "header.associative_career",
};

/** Toutes mes présences en ligne, ce qui relie ce site à une seule identité. */
const SAME_AS = [
  "https://www.linkedin.com/in/Benjamin-balayre",
  "https://github.com/benbalayre",
  "https://www.instagram.com/ben_balayre/",
  "https://www.youtube.com/@ben_balayre",
  "https://prestation.benevolence.fr",
  "https://portfolio.benevolence.fr",
  "https://benevolence.fr",
];

export const MetaHeader = ({ page = "home" }: MetaHeaderProps) => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  const current: Locale = locale === "en" ? "en" : "fr";
  const title = t(`meta.${page}.title`);
  const description = t(`meta.${page}.description`);
  const canonical = urlOf(page, current);
  const ogImage = `${SITE_URL}/assets/images/og.jpg`;

  // Une seule fiche Person pour tout le site, complétée par la page courante.
  // `sameAs` est ce qui permet aux moteurs, classiques comme génératifs, de
  // rattacher le CV, le portfolio, la boutique et les réseaux à une personne.
  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Benjamin Balayre",
    url: SITE_URL,
    image: `${SITE_URL}/assets/images/pp.jpg`,
    jobTitle: t("header.role"),
    description: t("footer.tagline"),
    address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
    worksFor: { "@type": "Organization", name: "Capgemini Invent" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "ISEP, Institut supérieur d'électronique de Paris" },
    knowsLanguage: ["fr", "en"],
    sameAs: SAME_AS,
  };

  const graph: Record<string, unknown>[] = [
    person,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Benjamin Balayre",
      inLanguage: current,
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      // L'accueil est une page de profil, les autres des pages du site.
      "@type": page === "home" ? "ProfilePage" : "WebPage",
      "@id": `${canonical}#page`,
      url: canonical,
      name: title,
      description,
      inLanguage: current,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      primaryImageOfPage: ogImage,
    },
  ];

  if (page !== "home") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Benjamin Balayre", item: urlOf("home", current) },
        { "@type": "ListItem", position: 2, name: t(CRUMB_LABEL[page]), item: canonical },
      ],
    });
  }

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="author" content="Benjamin Balayre" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

      {/* Le canonical suit la locale : sans ça, chaque page anglaise se
          déclarait duplicata de sa version française et ne pouvait pas se
          positionner. Les alternates se citent toutes, la page courante
          comprise, sinon l'annotation n'est pas réciproque et Google l'ignore. */}
      <link rel="canonical" href={canonical} />
      {LOCALES.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={urlOf(page, l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={urlOf(page, "fr")} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Benjamin Balayre" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`Benjamin Balayre, ${t("header.role")}`} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={current === "fr" ? "fr_FR" : "en_US"} />
      <meta property="og:locale:alternate" content={current === "fr" ? "en_US" : "fr_FR"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
        }}
      />
    </Head>
  );
};
