import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterBar from '@/components/FilterBar';

describe('Componente FilterBar', () => {
  describe('Interações dos botões de filtro', () => {
    it('deve chamar onFilterChange com "All" quando o botão Todas for clicado', () => {
      const mockOnChange = jest.fn();
      render(
        <FilterBar currentStatus="All" onFilterChange={mockOnChange} />
      );
      
      const todasButton = screen.getByRole('button', { name: /Todas/i });
      fireEvent.click(todasButton);
      
      expect(mockOnChange).toHaveBeenCalledWith('All');
    });

    it('deve chamar onFilterChange com "Real" quando o botão Verdadeiras for clicado', () => {
      const mockOnChange = jest.fn();
      render(
        <FilterBar currentStatus="All" onFilterChange={mockOnChange} />
      );
      
      const verdadeirasButton = screen.getByRole('button', { name: /Verdadeiras/i });
      fireEvent.click(verdadeirasButton);
      
      expect(mockOnChange).toHaveBeenCalledWith('Real');
    });

    it('deve chamar onFilterChange com "Fake" quando o botão Falsas for clicado', () => {
      const mockOnChange = jest.fn();
      render(
        <FilterBar currentStatus="All" onFilterChange={mockOnChange} />
      );
      
      const falsasButton = screen.getByRole('button', { name: /Falsas/i });
      fireEvent.click(falsasButton);
      
      expect(mockOnChange).toHaveBeenCalledWith('Fake');
    });
  });

  describe('Alterações do estado visual', () => {
    it('deve aplicar estilo correto quando o status for Real (Verdadeiras)', () => {
      const mockOnChange = jest.fn();
      const { container } = render(
        <FilterBar currentStatus="Real" onFilterChange={mockOnChange} />
      );
      
      const slidingPill = container.querySelector('div[class*="transition-all"]');
      expect(slidingPill).toHaveClass('bg-emerald-500');
    });

    it('deve aplicar estilo correto quando o status for Fake (Falsas)', () => {
      const mockOnChange = jest.fn();
      const { container } = render(
        <FilterBar currentStatus="Fake" onFilterChange={mockOnChange} />
      );
      
      const slidingPill = container.querySelector('div[class*="transition-all"]');
      expect(slidingPill).toHaveClass('bg-red-500');
    });

    it('deve aplicar estilo correto quando o status for All (Todas)', () => {
      const mockOnChange = jest.fn();
      const { container } = render(
        <FilterBar currentStatus="All" onFilterChange={mockOnChange} />
      );
      
      const slidingPill = container.querySelector('div[class*="transition-all"]');
      expect(slidingPill).toHaveClass('bg-white');
    });
  });

  describe('Estados da cor do texto dos botões', () => {
    it('deve mostrar cor de texto ativa para filtro Real selecionado', () => {
      const mockOnChange = jest.fn();
      render(
        <FilterBar currentStatus="Real" onFilterChange={mockOnChange} />
      );
      
      const verdadeirasButton = screen.getByRole('button', { name: /Verdadeiras/i });
      expect(verdadeirasButton).toHaveClass('text-white');
    });

    it('deve mostrar cor de texto inativa para filtro Fake não selecionado quando Real está selecionado', () => {
      const mockOnChange = jest.fn();
      render(
        <FilterBar currentStatus="Real" onFilterChange={mockOnChange} />
      );
      
      const falsasButton = screen.getByRole('button', { name: /Falsas/i });
      expect(falsasButton).toHaveClass('text-slate-500');
    });
  });

  describe('Design responsivo', () => {
    it('deve renderizar os três botões de filtro', () => {
      const mockOnChange = jest.fn();
      render(
        <FilterBar currentStatus="All" onFilterChange={mockOnChange} />
      );
      
      expect(screen.getByRole('button', { name: /Todas/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Verdadeiras/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Falsas/i })).toBeInTheDocument();
    });

    it('deve ter classes responsivas para mobile e desktop', () => {
      const mockOnChange = jest.fn();
      const { container } = render(
        <FilterBar currentStatus="All" onFilterChange={mockOnChange} />
      );
      
      const buttons = container.querySelectorAll('button');
      buttons.forEach((button) => {
        expect(button).toHaveClass('text-xs', 'sm:text-sm');
      });
    });
  });
});
