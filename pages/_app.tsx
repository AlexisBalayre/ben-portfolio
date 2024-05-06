// pages/_app.tsx
import "~~/styles/globals.css";
import type { AppProps } from 'next/app';
import { Header } from "~~/components/Header";
import { Footer } from "~~/components/Footer";

const PortfolioWebApp = ({ Component, pageProps }: AppProps) => {
  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="relative flex flex-col flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
  );
}

export default PortfolioWebApp;