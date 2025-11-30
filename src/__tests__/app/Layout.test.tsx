import { render } from '@testing-library/react'

// Import apenas para verificar exportações, não renderizar layout completo
import * as layoutModule from '@/app/layout'

describe('RootLayout', () => {
  it('exporta metadata com title e description', () => {
    const { metadata } = layoutModule
    expect(metadata).toBeDefined()
    expect(metadata.title).toBe('Eh fake')
    expect(metadata.description).toBe('Site de notícias')
  })

  it('exporta função RootLayout como default', () => {
    const { default: RootLayout } = layoutModule
    expect(RootLayout).toBeDefined()
    expect(typeof RootLayout).toBe('function')
  })

  it('RootLayout aceita children prop e renderiza sem erro', () => {
    const { default: RootLayout } = layoutModule
    const testChild = <div>conteúdo teste</div>
    // Testamos que o componente é uma função válida que aceitaria children
    expect(() => {
      // Apenas verificamos que é um componente válido (não renderizamos html/body completos)
      RootLayout({ children: testChild })
    }).not.toThrow()
  })
})
