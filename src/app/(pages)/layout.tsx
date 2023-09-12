import '../globals.css';
import type { Metadata } from 'next';
import { cn } from '@/shared';
import localFont from 'next/font/local';

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
});

export const metadata: Metadata = {
  title: 'Radium',
  description: 'Radium',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='h-full'>
      <body
        className={cn('bg-bg-page h-full text-text-primary', ntSomic.className)}
      >
        {children}
      </body>
    </html>
  );
}
