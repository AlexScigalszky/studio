import type {Metadata} from 'next';
import {Roboto} from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FrameIt - Hole Position App',
  description: 'Find the perfect spot for your frames!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}


