'use client';
import type { Metadata } from 'next';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Sticker Master',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
