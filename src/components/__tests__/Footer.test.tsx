import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

// Mock do componente Container
jest.mock('../ui/container', () => {
  const React = require('react');
  return ({ children }) => (
    <div data-testid="container-mock">{children}</div>
  );
});

describe('Componente Footer', () => {
  it('renderiza o ano atual corretamente', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();

    const copyright = screen.getByText(
      new RegExp(`©\\s*${currentYear}\\s*Eh Fake`, 'i')
    );

    expect(copyright).toBeInTheDocument();
  });

  it('contém o link correto para o GitHub', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /Projeto Eh Fake/i });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/unb-mds/2025-2-Eh_Fake'
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('envolve o conteúdo dentro do Container mockado', () => {
    render(<Footer />);

    const container = screen.getByTestId('container-mock');

    expect(container).toBeInTheDocument();
  });
});
