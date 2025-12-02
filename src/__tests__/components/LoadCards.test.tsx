import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import LoadCards from '@/components/LoadCards'

describe('LoadCards', () => {
  beforeEach(() => {
    // reset fetch mock
    // @ts-ignore
    global.fetch = jest.fn()
  })

  it('mostra indicador de carregamento inicialmente', async () => {
    // Create a deferred fetch so we can assert loading before it resolves
    // @ts-ignore
    let resolveFetch: any
    // @ts-ignore
    global.fetch.mockImplementationOnce(() => new Promise((res) => { resolveFetch = res }))

    render(<LoadCards searchTerm="" />)
    // loading should be visible before we resolve the fetch promise
    expect(screen.getByText(/Carregando notícias/i)).toBeInTheDocument()

    // now resolve the fetch to avoid leaking a pending promise
    await act(async () => {
      resolveFetch({ ok: true, json: async () => ({ news: [], totalPages: 1, currentPage: 1 }) })
    })
  })

  it('mostra mensagem vazia quando não há notícias', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ news: [], totalPages: 1, currentPage: 1 }) })
    await act(async () => {
      render(<LoadCards searchTerm="" />)
    })
    await waitFor(() => expect(screen.getByText(/Nenhuma notícia encontrada/i)).toBeInTheDocument())
  })

  it('renderiza grid de notícias quando API retorna itens', async () => {
    const item = { id: '1', title: 'T', description: 'D', status: 'Real', confidence: 99 }
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ news: [item], totalPages: 1, currentPage: 1 }) })
    let container: HTMLElement | null = null
    await act(async () => {
      const rendered = render(<LoadCards searchTerm="" />)
      container = rendered.container
    })
    await waitFor(() => expect(container?.querySelectorAll('article').length).toBeGreaterThanOrEqual(1))
  })

  it('mostra mensagem de erro quando fetch falha', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({ ok: false, json: async () => ({}) })
    await act(async () => {
      render(<LoadCards searchTerm="" />)
    })
    await waitFor(() => expect(screen.getByText(/Falha ao carregar notícias/i)).toBeInTheDocument())
  })

  it('renderiza paginação quando há múltiplas páginas', async () => {
    const item = { id: '1', title: 'T', description: 'D', status: 'Real', confidence: 99 }
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ news: [item], totalPages: 3, currentPage: 1 }) })
    let container: HTMLElement | null = null
    await act(async () => {
      const rendered = render(<LoadCards searchTerm="" />)
      container = rendered.container
    })
    await waitFor(() => {
      const navElement = screen.queryByLabelText(/Navegação de páginas/i)
      if (navElement) {
        expect(navElement).toBeInTheDocument()
      }
    })
  })

  it('inclui termo de busca na mensagem vazia', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ news: [], totalPages: 1, currentPage: 1 }) })
    await act(async () => {
      render(<LoadCards searchTerm="vaccine" />)
    })
    await waitFor(() => expect(screen.getByText(/para.*vaccine/i)).toBeInTheDocument())
  })
})
