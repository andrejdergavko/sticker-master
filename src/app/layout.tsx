'use client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import '../styles/globals.css';
import theme from '../styles/theme';

config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </StyledEngineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
