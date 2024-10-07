import { Footer, Navbar } from '@/app/components';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-surface-surface-bg">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
