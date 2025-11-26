// pages/_app.tsx
import "~~/styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "~~/components/Header";
import { MetaHeader } from "~~/components/MetaHeader";
import { Footer } from "~~/components/Footer";
import ErrorBoundary from "~~/components/ErrorBoundary"; // Import ErrorBoundary

import { appWithTranslation } from 'next-i18next';

const PortfolioWebApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MetaHeader />
      <Header />
      <ErrorBoundary>
        {" "}
        {/* Wrap the main content with ErrorBoundary */}
        <main className="relative flex flex-col flex-1">
          <Component {...pageProps} />
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default appWithTranslation(PortfolioWebApp);
