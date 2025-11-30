import { render, screen } from '@testing-library/react'
import Title from '@/components/Title'

describe('Title', () => {
  it('renderiza o título principal', () => {
    render(<Title />)
    expect(screen.getByText(/Eh Fake!/i)).toBeInTheDocument()
  })

  it('renderiza o subtítulo', () => {
    render(<Title />)
    expect(screen.getByText(/Seu portal de notícias/i)).toBeInTheDocument()
  })

  it('contém container de wrapper', () => {
    const { container } = render(<Title />)
    expect(container.querySelector('.space-y-10')).toBeTruthy()
  })
})
