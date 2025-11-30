import { render, screen, fireEvent } from '@testing-library/react'
import Home from '@/app/page'

// Mock all child components to isolate Page tests
jest.mock('@/components/Title', () => {
  return function MockTitle() {
    return <div data-testid="title-mock">Título</div>
  }
})

jest.mock('@/components/SearchBar', () => {
  return function MockSearchBar({ onSearch }: { onSearch: (term: string) => void }) {
    return (
      <input
        data-testid="search-input"
        placeholder="busca"
        onChange={(e) => onSearch(e.target.value)}
      />
    )
  }
})

jest.mock('@/components/LoadCards', () => {
  return function MockLoadCards({ searchTerm }: { searchTerm: string }) {
    return <div data-testid="load-cards">Notícias: {searchTerm}</div>
  }
})

jest.mock('@/components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer-mock">Rodapé</div>
  }
})

jest.mock('@/components/theme/Switcher', () => {
  return function MockThemeSwitcher() {
    return <button data-testid="theme-switcher">Tema</button>
  }
})

describe('Home (page.tsx)', () => {
  it('renderiza todos os componentes principais', () => {
    render(<Home />)
    expect(screen.getByTestId('title-mock')).toBeInTheDocument()
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
    expect(screen.getByTestId('load-cards')).toBeInTheDocument()
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument()
  })

  it('passa searchTerm para LoadCards quando busca é atualizada', () => {
    render(<Home />)
    const searchInput = screen.getByTestId('search-input') as HTMLInputElement
    
    fireEvent.change(searchInput, { target: { value: 'fake news' } })
    
    expect(screen.getByTestId('load-cards')).toHaveTextContent('Notícias: fake news')
  })

  it('renderiza ThemeSwitcher no topo da página', () => {
    const { container } = render(<Home />)
    const themeSwitcher = screen.getByTestId('theme-switcher')
    const parentDiv = themeSwitcher.closest('.flex.justify-end.p-4')
    
    expect(parentDiv).toBeTruthy()
    expect(parentDiv?.firstChild).toBe(themeSwitcher)
  })
})
