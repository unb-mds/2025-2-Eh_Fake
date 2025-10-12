import type { Metadata } from 'next';
import './globals.css';
import ThemeProviderComponent from '@/components/theme/Provider';

export const metadata: Metadata = {
  title: 'Eh fake',
  description: 'Site de notícias',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-light-primary text-light-secondary dark:bg-dark-primary dark:text-dark-secondary antialiased">
        <ThemeProviderComponent>
          <div className="flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProviderComponent>
      </body>
    </html>
  );
}