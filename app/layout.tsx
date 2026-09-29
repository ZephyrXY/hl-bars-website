import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import '@/app/ui/global.css';
import SiteHeader from '@/app/ui/site-header';
import SiteFooter from '@/app/ui/site-footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-montserrat',
});

// Monetag ad tag (zone 11919142), inserted as-is into <head>.
const monetagTag = `(function(s){s.dataset.zone='11919142',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`;

export const metadata: Metadata = {
  title: {
    default: 'HL Bars | Roofing & Solar Supply and Installation',
    template: '%s | HL Bars',
  },
  description:
    'HL Bars (HL Builders and Related Services) supplies and installs quality roofing and hybrid solar power systems in Ormoc City and Naval, Biliran.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: monetagTag }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
