import './globals.css';
import localFont from 'next/font/local';
import { AuthSessionProvider, ReduxStoreProvider, cn } from '@/shared';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Wave from 'react-wavify';

const ntSomic = localFont({
  src: [
    {
      path: '../../public/fonts/NT-Somic/NTSomic-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/NT-Somic/NTSomic-Medium.woff2',
      weight: '500',
    },
    {
      path: '../../public/fonts/NT-Somic/NTSomic-Semibold.woff2',
      weight: '600',
    },
    {
      path: '../../public/fonts/NT-Somic/NTSomic-Bold.woff2',
      weight: '700',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru' className='dark relative h-full scroll-smooth'>
      <body
        className={cn(
          'scrollbar flex h-full flex-col bg-background font-sans text-foreground',
          inter.variable,
          ntSomic.variable,
          jetbrainsMono.variable
        )}
      >
        <AuthSessionProvider>
          <ReduxStoreProvider>{children}</ReduxStoreProvider>
        </AuthSessionProvider>
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
