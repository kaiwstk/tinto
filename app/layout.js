import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '700'], variable: '--f-d', display: 'swap' });
const body = Instrument_Sans({ subsets: ['latin'], weight: ['400', '600'], variable: '--f-b', display: 'swap' });

export const metadata = {
  title: 'Coffee Flavour Index',
  description: 'Pick a varietal, process, roast, altitude and origin to predict how a coffee will taste.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#1a1410',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
