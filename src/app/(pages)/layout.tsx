import '../globals.css';
import type { Metadata } from 'next';
import { AuthSessionProvider, ReduxStoreProvider, cn } from '@/shared';
import localFont from 'next/font/local';
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
        className={cn(
          'flex h-full flex-col bg-background-default font-sans text-foreground-default',
          inter.variable,
          ntSomic.variable
        )}
      >
        <AuthSessionProvider>
          <ReduxStoreProvider>{children}</ReduxStoreProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
