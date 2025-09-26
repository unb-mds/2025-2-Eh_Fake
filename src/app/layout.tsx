import type { Metadata } from 'next';
import './globals.css';

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
      <body className="bg-white text-gray-800 antialiased">
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}