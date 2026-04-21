import React from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

type PageKey = "home" | "portfolio" | "associativeCareer";

interface MetaHeaderProps {
  page?: PageKey;
}

export const MetaHeader = ({ page = "home" }: MetaHeaderProps) => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  const title = t(`meta.${page}.title`);
  const description = t(`meta.${page}.description`);
  const keywords = t("meta.keywords");
  const siteUrl = "https://benjamin.balayre.com";
  const ogImage = `${siteUrl}/assets/images/pp.jpg`;
  const canonical = page === "home" ? siteUrl : `${siteUrl}/${page}`;

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Benjamin Balayre" />
      <link rel="canonical" href={canonical} />
      {locale === "fr" && <link rel="alternate" hrefLang="fr" href={canonical} />}
      {locale === "en" && <link rel="alternate" hrefLang="en" href={`${siteUrl}/en/${page === "home" ? "" : page}`} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Benjamin Balayre" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={locale === "fr" ? "fr_FR" : "en_US"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
  );
};
