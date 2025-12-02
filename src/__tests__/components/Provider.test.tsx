import { render, screen } from '@testing-library/react'
import ThemeProviderComponent from '@/components/theme/Provider'

describe('Provedor de Tema', () => {
  it('renderiza filhos', () => {
    render(
      <ThemeProviderComponent>
        <div>inside</div>
      </ThemeProviderComponent>,
    )
    expect(screen.getByText('inside')).toBeInTheDocument()
  })

  it('não quebra quando renderizado sem filhos', () => {
    const { container } = render(<ThemeProviderComponent>{null}</ThemeProviderComponent>)
    expect(container).toBeTruthy()
  })

  it('envolve filhos no provider (fragment)', () => {
    const { container } = render(
      <ThemeProviderComponent>
        <span>ok</span>
      </ThemeProviderComponent>,
    )
    expect(container.textContent).toContain('ok')
  })
})
