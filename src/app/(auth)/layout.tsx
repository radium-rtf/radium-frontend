import '../globals.css';
import localFont from 'next/font/local';
import { cn } from '@/shared';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ru' className='h-full'>
      <body
        className={cn('bg-bg-page h-full text-text-primary', ntSomic.className)}
      >
        {children}
      </body>
    </html>
  );
}
