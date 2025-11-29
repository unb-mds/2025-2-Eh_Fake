import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'

const setTheme = jest.fn()
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme }),
}))

import ThemeSwitcher from '@/components/theme/Switcher'

describe('ThemeSwitcher', () => {
  it('renderiza após montagem e alterna tema', async () => {
    render(<ThemeSwitcher />)
    // component uses useEffect to set mounted; wait for button
    await waitFor(() => expect(screen.getByRole('button')).toBeInTheDocument())
    fireEvent.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalled()
  })

  it('possui aria-label acessível', async () => {
    render(<ThemeSwitcher />)
    await waitFor(() => expect(screen.getByRole('button')).toBeInTheDocument())
    expect(screen.getByRole('button')).toHaveAttribute('aria-label')
  })

  it('mostra ícone de sol ou lua (renderiza conteúdo do botão)', async () => {
    render(<ThemeSwitcher />)
    await waitFor(() => expect(screen.getByRole('button')).toBeInTheDocument())
    // SVG is rendered inside the button; ensure an svg element exists
    const btn = screen.getByRole('button')
    expect(btn.querySelector('svg')).toBeTruthy()
  })
})
