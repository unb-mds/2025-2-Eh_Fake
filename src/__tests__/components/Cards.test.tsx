import { render, screen } from '@testing-library/react'
import NewsCardGrid, { NewsCard } from '@/components/ui/Cards'

const sample = {
  id: '1',
  title: 'Test title',
  description: 'Test description',
  imageSrc: null,
  imageAlt: 'alt',
  status: 'Fake' as const,
  confidence: 42,
  source: 'Fonte X',
  link: 'https://example.com',
}

describe('NewsCard', () => {
  it('renderiza o selo de status e o rótulo', () => {
    render(<NewsCard data={sample} />)
    expect(screen.getByText(/É FAKE/i)).toBeInTheDocument()
  })

  it('exibe confiança quando fornecida', () => {
    render(<NewsCard data={sample} />)
    expect(screen.getByText(/42% confiança/i)).toBeInTheDocument()
  })

  it('renderiza link externo quando fornecido', () => {
    render(<NewsCard data={sample} />)
    const link = screen.getByRole('link', { name: /Acessar/i })
    expect(link).toHaveAttribute('href', sample.link)
  })

  it('exibe fonte da notícia no rodapé do card', () => {
    render(<NewsCard data={sample} />)
    expect(screen.getByText(sample.source)).toBeInTheDocument()
  })
})

describe('NewsCardGrid', () => {
  it('renderiza todos os itens fornecidos', () => {
    const items = [sample, { ...sample, id: '2', title: 'T2' }]
    const { container } = render(<NewsCardGrid items={items} />)
    expect(container.querySelectorAll('article').length).toBe(2)
  })

  it('envolve em um elemento section', () => {
    const { container } = render(<NewsCardGrid items={[sample]} />)
    expect(container.querySelector('section')).toBeTruthy()
  })

  it('renderiza alt da imagem fallback quando imageSrc é null', () => {
    render(<NewsCardGrid items={[sample]} />)
    // sample.imageAlt is 'alt' in the test data
    expect(screen.getByAltText('alt')).toBeInTheDocument()
  })
})
