import "~~/styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "~~/components/Header";
import { MetaHeader } from "~~/components/MetaHeader";
import { Footer } from "~~/components/Footer";
import ErrorBoundary from "~~/components/ErrorBoundary";
import { Inter } from 'next/font/google';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { appWithTranslation } from 'next-i18next';

const inter = Inter({ subsets: ['latin'] });

const PortfolioWebApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <div className={`flex flex-col min-h-screen ${inter.className}`}>
      <MetaHeader />
      <Header />
      <ErrorBoundary>
        {" "}
        {/* Wrap the main content with ErrorBoundary */}
        <main className="relative flex flex-col flex-1">
          <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
            <motion.div
              key={router.route}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default appWithTranslation(PortfolioWebApp);
