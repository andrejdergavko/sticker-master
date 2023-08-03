'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import Layout from '~components/common/Layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status !== 'loading' && status === 'unauthenticated') {
    redirect('/signin');
  }

  return <Layout>{children}</Layout>;
}
