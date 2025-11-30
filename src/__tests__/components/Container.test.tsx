import { render, screen } from '@testing-library/react'
import Container from '@/components/ui/container'

describe('Container', () => {
  it('renderiza filhos', () => {
    render(
      <Container>
        <div>child content</div>
      </Container>,
    )
    expect(screen.getByText('child content')).toBeInTheDocument()
  })

  it('tem a classe `max-w-7xl`', () => {
    const { container } = render(<Container>ok</Container>)
    expect(container.firstChild).toHaveClass('max-w-7xl')
  })

  it('é um elemento DIV', () => {
    const { container } = render(<Container>ok</Container>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })
})
