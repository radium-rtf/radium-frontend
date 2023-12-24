import '../globals.css';
import localFont from 'next/font/local';
import { cn } from '@/shared';
import { Inter } from 'next/font/google';

const ntSomic = localFont({
  src: [
    {
      path: '../../../public/fonts/NT-Somic/NTSomic-Bold.woff2',
      weight: '700',
    },
    {
      path: '../../../public/fonts/NT-Somic/NTSomic-Regular.woff2',
      weight: '400',
    },
  ],
  variable: '--font-nt-somic',
});

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ru' className='dark h-full'>
      <body
        className={cn(
          'bg-bg-page text-text-primary h-full font-sans',
          inter.variable,
          ntSomic.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
