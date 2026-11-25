import { Urbanist } from 'next/font/google';
import './globals.css';

const body = Urbanist({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--f-b', display: 'swap' });

export const metadata = {
  title: 'Coffee Flavour Index',
  description: 'Pick a varietal, process, roast, altitude and origin to predict how a coffee will taste.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0b0b0b',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={body.variable}>
      <body>{children}</body>
    </html>
  );
}
