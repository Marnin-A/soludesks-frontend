import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/store/ReduxProvider';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Soludesks - Learning Management System',
  description: 'A modern learning management system for courses, materials, and assessments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ReduxProvider>
          <div className="flex min-h-screen bg-[var(--bg-gray)]">
            <Sidebar />
            <div className="flex-1 pl-64">
              <Header />
              <main className="pt-16">{children}</main>
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
