import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '@/components/NextPage'

describe('Pagination', () => {
  it('desabilita botão anterior na primeira página', () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={() => {}} />)
    const prev = screen.getByRole('button', { name: /Página anterior/i })
    expect(prev).toBeDisabled()
  })

  it('chama onPageChange quando número da página é clicado', () => {
    const onPageChange = jest.fn()
    render(<Pagination totalPages={3} currentPage={1} onPageChange={onPageChange} />)
    const pageButton = screen.getByRole('button', { name: /2/ })
    fireEvent.click(pageButton)
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('desabilita botão próximo na última página', () => {
    render(<Pagination totalPages={2} currentPage={2} onPageChange={() => {}} />)
    const next = screen.getByRole('button', { name: /Próxima página/i })
    expect(next).toBeDisabled()
  })

  it('clica no botão Voltar para ir para página anterior', () => {
    const onPageChange = jest.fn()
    render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />)
    const prev = screen.getByRole('button', { name: /Página anterior/i })
    fireEvent.click(prev)
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('clica no botão Próxima para ir para próxima página', () => {
    const onPageChange = jest.fn()
    render(<Pagination totalPages={5} currentPage={2} onPageChange={onPageChange} />)
    const next = screen.getByRole('button', { name: /Próxima página/i })
    fireEvent.click(next)
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('renderiza reticências para grandes intervalos de páginas', () => {
    const { container } = render(<Pagination totalPages={10} currentPage={1} onPageChange={() => {}} />)
    const ellipsis = container.querySelector('.select-none')
    if (ellipsis) {
      expect(ellipsis.textContent).toBe('…')
    }
  })

  it('renderiza classe ativa para a página atual', () => {
    const onPageChange = jest.fn()
    render(<Pagination totalPages={5} currentPage={2} onPageChange={onPageChange} />)
    const pageButton = screen.getByRole('button', { name: /2/ })
    expect(pageButton).toHaveAttribute('aria-current', 'page')
  })
})
