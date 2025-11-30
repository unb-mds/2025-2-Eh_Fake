import { renderHook, act, waitFor } from '@testing-library/react'
import { useSuggestions } from '../hooks/useSuggestions'

// Mock fetch
global.fetch = jest.fn()

describe('useSuggestions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve inicializar com a barra e sugestoes vazias', () => {
    const { result } = renderHook(() => useSuggestions())

    expect(result.current.query).toBe('')
    expect(result.current.suggestions).toEqual([])
    expect(result.current.loading).toBe(false)
  })

  it('deve atualizar a barra quando setQuery e chamada', () => {
    const { result } = renderHook(() => useSuggestions())

    act(() => {
      result.current.setQuery('test query')
    })

    expect(result.current.query).toBe('test query')
  })

  it('deve buscar sugestoes depois do debounce delay', async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ['suggestion1', 'suggestion2'],
    } as Response)

    const { result } = renderHook(() => useSuggestions())

    act(() => {
      result.current.setQuery('test')
    })

    // Wait for debounce and fetch
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/noticias/suggestions?q=test')
    })

    await waitFor(() => {
      expect(result.current.suggestions).toEqual(['suggestion1', 'suggestion2'])
      expect(result.current.loading).toBe(false)
    })
  })

  it('deve limpar sugestoes quando clearSuggestions e chamado', async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ['suggestion1'],
    } as Response)

    const { result } = renderHook(() => useSuggestions())

    act(() => {
      result.current.setQuery('test')
    })

    await waitFor(() => {
      expect(result.current.suggestions).toEqual(['suggestion1'])
    })

    act(() => {
      result.current.clearSuggestions()
    })

    expect(result.current.suggestions).toEqual([])
  })

  it('deve lidar com erro de busca ', async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    // Checar os erros que aparecem no console os logs de erro basicamente
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const { result } = renderHook(() => useSuggestions())

    act(() => {
      result.current.setQuery('test')
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    await waitFor(() => expect(consoleSpy).toHaveBeenCalled())

    expect(result.current.suggestions).toEqual([])

    consoleSpy.mockRestore()
  })
})
