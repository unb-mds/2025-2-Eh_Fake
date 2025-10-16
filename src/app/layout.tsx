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
      <body className="antialiased bg-light-primary text-dark-primary dark:bg-dark-primary dark:text-light-primary transition-colors duration-300">
        <ThemeProviderComponent>
          <div className="flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProviderComponent>
      </body>
    </html>
  );
}