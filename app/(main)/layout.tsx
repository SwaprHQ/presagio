import { Footer, Navbar } from '@/app/components';
import { Providers } from '@/providers';
import { Suspense } from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <Providers>
        <div className="bg-surface-surface-surface-2 min-h-screen">
          <Navbar />
          {children}
          <Footer />
        </div>
      </Providers>
    </Suspense>
  );
}
