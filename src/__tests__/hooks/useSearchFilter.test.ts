import { useSearchFilter } from '@/hooks/useSearchFilter';
import { renderHook } from '@testing-library/react';
import type { NewsCardData } from '@/components/ui/Cards';

describe('Hook useSearchFilter', () => {
  const mockNews: NewsCardData[] = [
    {
      id: '1',
      title: 'COVID-19 Vaccine Safe for Children',
      description: 'Medical research confirms vaccine safety',
      status: 'Real',
      confidence: 95,
    },
    {
      id: '2',
      title: 'False Claim About 5G Networks',
      description: 'Debunking conspiracy theories',
      status: 'Fake',
      confidence: 100,
    },
    {
      id: '3',
      title: 'Breaking News About Climate Change',
      description: 'Scientific findings on global warming',
      status: 'Real',
      confidence: 88,
    },
    {
      id: '4',
      title: 'Unverified Report',
      description: 'News pending verification',
      status: 'Error',
      confidence: 50,
    },
  ];

  describe('Filtrar por título', () => {
    it('deve filtrar notícias pelo título (case-insensitive)', () => {
      const { result } = renderHook(() => useSearchFilter(mockNews, 'vaccine'));

      expect(result.current).toHaveLength(1);
      expect(result.current[0].title).toContain('Vaccine');
    });

    it('deve retornar todas as notícias quando o termo de busca estiver vazio', () => {
      const { result } = renderHook(() => useSearchFilter(mockNews, ''));

      expect(result.current).toHaveLength(4);
    });

    it('deve retornar todas as notícias quando o termo for apenas espaços em branco', () => {
      const { result } = renderHook(() => useSearchFilter(mockNews, '   '));

      expect(result.current).toHaveLength(4);
    });

    it('deve filtrar múltiplos itens de notícias correspondentes', () => {
      const { result } = renderHook(() => useSearchFilter(mockNews, 'about'));

      expect(result.current.length).toBeGreaterThan(1);
      result.current.forEach(item => {
        expect(item.title.toLowerCase()).toContain('about');
      });
    });

    it('deve retornar array vazio quando não houver correspondências', () => {
      const { result } = renderHook(() => useSearchFilter(mockNews, 'nonexistent'));

      expect(result.current).toHaveLength(0);
    });
  });

  describe('Filtrar por status', () => {
    it('deve filtrar notícias por status (Real)', () => {
      const { result } = renderHook(() => useSearchFilter(mockNews, 'real'));

      const filtered = result.current;
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach(item => {
        expect(item.status?.toLowerCase() || '').toContain('real');
      });
    });

    it('deve filtrar notícias por status (Fake)', () => {
      const { result } = renderHook(() => useSearchFilter(mockNews, 'fake'));

      const filtered = result.current;
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach(item => {
        expect(item.status?.toLowerCase() || '').toContain('fake');
      });
    });

    it('deve filtrar notícias por status (Error)', () => {
      const { result } = renderHook(() => useSearchFilter(mockNews, 'error'));

      const filtered = result.current;
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach(item => {
        expect(item.status?.toLowerCase() || '').toContain('error');
      });
    });
  });

  describe('Insensibilidade a caixa', () => {
    it('deve corresponder termos de busca em maiúsculas', () => {
      const { result } = renderHook(() => useSearchFilter(mockNews, 'VACCINE'));

      expect(result.current).toHaveLength(1);
      expect(result.current[0].title).toContain('Vaccine');
    });

    it('deve corresponder termos de busca em caixa mista', () => {
      const { result } = renderHook(() => useSearchFilter(mockNews, 'VaC'));

      expect(result.current).toHaveLength(1);
    });

    it('deve normalizar corretamente o termo de busca', () => {
      const { result } = renderHook(() => useSearchFilter(mockNews, '  climate  '));

      expect(result.current).toHaveLength(1);
    });
  });

  describe('Casos de borda', () => {
    it('deve lidar com array de notícias vazio', () => {
      const { result } = renderHook(() => useSearchFilter([], 'search'));

      expect(result.current).toHaveLength(0);
    });

    it('deve lidar com itens de notícia com status indefinido', () => {
      const newsWithUndefinedStatus = [
        { id: '1', title: 'Test', description: 'Test', status: undefined as any },
      ];

      const { result } = renderHook(() => useSearchFilter(newsWithUndefinedStatus, 'test'));

      expect(result.current).toHaveLength(1);
    });

    it('deve filtrar por palavras parciais', () => {
      const { result } = renderHook(() => useSearchFilter(mockNews, 'chang'));

      expect(result.current).toHaveLength(1);
      expect(result.current[0].title).toContain('Change');
    });
  });

  describe('Memoização', () => {
    it('deve retornar mesma referência quando inputs não mudam', () => {
      const { result, rerender } = renderHook(
        ({ items, term }) => useSearchFilter(items, term),
        {
          initialProps: { items: mockNews, term: 'vaccine' },
        }
      );

      const firstResult = result.current;

      rerender({ items: mockNews, term: 'vaccine' });

      expect(result.current).toBe(firstResult);
    });

    it('deve retornar referência diferente quando o termo muda', () => {
      const { result, rerender } = renderHook(
        ({ items, term }) => useSearchFilter(items, term),
        {
          initialProps: { items: mockNews, term: 'vaccine' },
        }
      );

      const firstResult = result.current;

      rerender({ items: mockNews, term: 'news' });

      expect(result.current).not.toBe(firstResult);
    });
  });
});
