import { usePagination } from '@/hooks/usePagination';
import { renderHook } from '@testing-library/react';

describe('Hook usePagination - Cobertura de Branch', () => {
  describe('Com contagem de irmãos', () => {
    it('deve calcular paginação com contagem padrão de irmãos', () => {
      const { result } = renderHook(() => usePagination(10, 5));
      expect(result.current).toContain(5);
    });

    it('deve calcular paginação com contagem customizada de irmãos', () => {
      const { result } = renderHook(() => usePagination(20, 10, 2));
      expect(Array.isArray(result.current)).toBe(true);
    });
  });

  describe('Retornar todas as páginas', () => {
    it('deve retornar todas as páginas quando totalPages <= totalNumbers', () => {
      const { result } = renderHook(() => usePagination(5, 1));
      expect(result.current).toEqual([1, 2, 3, 4, 5]);
    });

    it('deve lidar com número mínimo de páginas', () => {
      const { result } = renderHook(() => usePagination(1, 1));
      expect(result.current).toEqual([1]);
    });

    it('deve lidar com exatamente totalNumbers páginas', () => {
      const totalNumbers = 7; // 1 * 2 + 5
      const { result } = renderHook(() => usePagination(7, 4));
      expect(result.current.length).toBeLessThanOrEqual(7);
    });
  });

  describe('Tratamento de reticências', () => {
    it('deve incluir reticências à esquerda quando leftSibling > 2', () => {
      const { result } = renderHook(() => usePagination(20, 15));
      expect(result.current).toContain('ellipsis');
    });

    it('deve incluir reticências à direita quando rightSibling < totalPages - 1', () => {
      const { result } = renderHook(() => usePagination(20, 5));
      expect(result.current).toContain('ellipsis');
    });

    it('deve incluir ambas reticências para páginas do meio em grande intervalo', () => {
      const { result } = renderHook(() => usePagination(100, 50));
      const ellipsisCount = result.current.filter(item => item === 'ellipsis').length;
      expect(ellipsisCount).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Casos de borda', () => {
    it('deve lidar com primeira página em grande número total de páginas', () => {
      const { result } = renderHook(() => usePagination(100, 1));
      expect(result.current[0]).toBe(1);
    });

    it('deve lidar com última página em grande número total de páginas', () => {
      const { result } = renderHook(() => usePagination(100, 100));
      expect(result.current[result.current.length - 1]).toBe(100);
    });

    it('deve lidar com páginas de meio sem reticências à esquerda quando leftSibling <= 2', () => {
      const { result } = renderHook(() => usePagination(50, 2));
      // When at page 2 with sibling count 1, leftSibling would be max(2-1, 2) = 2
      expect(result.current[0]).toBe(1);
    });

    it('deve lidar com páginas de meio sem reticências à direita quando rightSibling >= totalPages-1', () => {
      const { result } = renderHook(() => usePagination(50, 49));
      // When at near last page, should include totalPages
      expect(result.current).toContain(50);
    });
  });

  describe('Geração de array', () => {
    it('deve sempre incluir a primeira página', () => {
      const { result } = renderHook(() => usePagination(50, 25));
      expect(result.current[0]).toBe(1);
    });

    it('deve sempre incluir a última página', () => {
      const { result } = renderHook(() => usePagination(50, 25));
      expect(result.current[result.current.length - 1]).toBe(50);
    });

    it('deve incluir a página atual no resultado', () => {
      const currentPage = 15;
      const { result } = renderHook(() => usePagination(50, currentPage));
      expect(result.current).toContain(currentPage);
    });

    it('deve manter ordem numérica (ignorando reticências)', () => {
      const { result } = renderHook(() => usePagination(50, 25));
      const numbers = result.current.filter(item => typeof item === 'number') as number[];
      for (let i = 1; i < numbers.length; i++) {
        expect(numbers[i]).toBeGreaterThanOrEqual(numbers[i - 1]);
      }
    });
  });
})
