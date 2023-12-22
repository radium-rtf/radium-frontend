import '../globals.css';
import type { Metadata } from 'next';
import { AuthSessionProvider, cn, ReduxStoreProvider } from '@/shared';
import localFont from 'next/font/local';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Wave from 'react-wavify';

const ntSomic = localFont({
  src: [
    {
      path: '../../../public/fonts/NT-Somic/NTSomic-Bold.woff2',
      weight: '700',
    },
    {
      path: '../../../public/fonts/NT-Somic/NTSomic-Medium.woff2',
      weight: '500',
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-jetbrains-mono',
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
    <html
      lang='ru'
      className='dark flex h-full flex-col scroll-smooth'
      style={{ scrollBehavior: 'smooth' }}
    >
      <body
        className={cn(
          'bg-background-default text-foreground-default relative flex flex-grow flex-col font-sans',
          inter.variable,
          ntSomic.variable,
          jetbrainsMono.variable
        )}
      >
        <main className='relative mt-[8.25rem] flex flex-grow flex-col'>
          <AuthSessionProvider>
            <ReduxStoreProvider>{children}</ReduxStoreProvider>
          </AuthSessionProvider>
        </main>
        <Wave
          fill={`rgba(0, 0, 0, 0.05)`}
          options={{
            amplitude: 80,
            speed: 0.1,
            points: 5,
            height: 100,
          }}
          style={{
            position: 'fixed',
            zIndex: -1000,
            bottom: '0',
            height: 600,
            overflow: 'visible',
          }}
        />
        <Wave
          fill={`rgba(0, 0, 0, 0.05)`}
          options={{
            amplitude: 120,
            speed: 0.1,
            points: 5,
            height: 100,
          }}
          style={{
            position: 'fixed',
            zIndex: -1000,
            bottom: '0',
            height: 450,
            overflow: 'visible',
          }}
        />
      </body>
    </html>
  );
}
