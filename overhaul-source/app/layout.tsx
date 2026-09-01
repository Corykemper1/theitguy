import type { Metadata } from 'next';
import { Geist, Manrope } from 'next/font/google';
import './globals.css';

const body = Geist({ variable: '--font-body', subsets: ['latin'] });
const display = Manrope({ variable: '--font-display', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://sendtheitguy.com'),
  title: 'Commercial On-Site IT Support & Cabling in Kansas | The IT Guy',
  description: 'Commercial on-site IT support, structured cabling, hardware troubleshooting, site surveys, and clear documentation across Kansas.',
  openGraph: { title: 'When the problem is on site, send the IT guy.', description: 'Commercial on-site IT support and structured cabling across Kansas.', url: 'https://sendtheitguy.com', siteName: 'The IT Guy', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'The IT Guy commercial IT support in Kansas' }] },
  twitter: { card: 'summary_large_image', title: 'When the problem is on site, send the IT guy.', description: 'Commercial IT support and structured cabling across Kansas.', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const business = { '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': 'https://sendtheitguy.com/#business', name: 'The IT Guy, LLC', url: 'https://sendtheitguy.com', telephone: '+1-620-591-3188', areaServed: ['Kansas City', 'Topeka', 'Manhattan', 'Junction City', 'Emporia', 'Wichita'], description: 'Commercial on-site IT support, structured cabling, hardware troubleshooting, site surveys, and documentation across Kansas.' };
  return <html lang="en"><head><link rel="stylesheet" href="/photos-a.css" /><link rel="stylesheet" href="/photos-b.css" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} /><script async src="https://www.googletagmanager.com/gtag/js?id=AW-18358813765" /><script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','AW-18358813765');gtag('config','AW-18358813765/Nq10CK-Bj-wcEMWIlbJE',{'phone_conversion_number':'(620) 591-3188'});` }} /></head><body className={`${body.variable} ${display.variable}`}>{children}</body></html>;
}
