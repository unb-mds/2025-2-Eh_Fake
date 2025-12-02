import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renderiza texto de copyright', () => {
    render(<Footer />)
    // There are multiple occurrences (brand and link text); ensure at least one exists
    const matches = screen.getAllByText(/Eh Fake/i)
    expect(matches.length).toBeGreaterThan(0)
  })

  it('contains link to repository', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /Projeto Eh Fake/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('github.com'))
  })

  it('shows current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })
})
