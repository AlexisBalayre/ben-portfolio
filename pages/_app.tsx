import "~~/styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "~~/components/Header";
import { MetaHeader } from "~~/components/MetaHeader";
import { Footer } from "~~/components/Footer";
import ErrorBoundary from "~~/components/ErrorBoundary";
import { Plus_Jakarta_Sans } from 'next/font/google';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { appWithTranslation } from 'next-i18next';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.25, ease: [0.55, 0, 1, 0.45] } },
};

const curtainVariants = {
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 1, originX: 0, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } },
  exit:    { scaleX: 0, originX: 1, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: 0.05 } },
};

const PortfolioWebApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  return (
    <div className={`flex flex-col min-h-screen ${jakarta.variable} font-sans`}>
      <MetaHeader page={(router.pathname.split("/")[1] || "home") as "home" | "portfolio" | "associativeCareer"} />
      <Header />
      <ErrorBoundary>
        <main className="relative flex flex-col flex-1">
          <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
            {/* Rideau de transition */}
            <motion.div
              key={`curtain-${router.route}`}
              className="fixed inset-0 z-[100] bg-primary pointer-events-none"
              variants={curtainVariants}
              initial="initial"
              animate="exit"
            />

            <motion.div
              key={router.route}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
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
