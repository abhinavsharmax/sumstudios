import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider';
import ScrollToTop from '@/components/ui/ScrollToTop';

export const metadata: Metadata = {
  title: {
    default: 'Sum Studio — Architecture & Design',
    template: '%s | Sum Studio',
  },
  description:
    'Sum Studio is an architecture and design practice committed to function, aesthetic, coherence, and joy. Based in Mumbai, working globally.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sumstudio.in',
    siteName: 'Sum Studio',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('sum-theme');
                if (!t) t = 'dark';
                document.documentElement.setAttribute('data-theme', t);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
