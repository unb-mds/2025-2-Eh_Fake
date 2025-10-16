'use client';
import ThemeProviderComponent from './Provider';

export default function ThemeClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviderComponent>
      {children}
    </ThemeProviderComponent>
  );
}