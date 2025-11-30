import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

// mock the hook used by SearchBar to control values easily
jest.mock('@/hooks/useSuggestions', () => ({
  useSuggestions: () => ({
    query: '',
    setQuery: jest.fn(),
    suggestions: [],
    loading: false,
    clearSuggestions: jest.fn(),
  }),
}))

import SearchBar from '@/components/SearchBar'

describe('SearchBar', () => {
  it('renderiza input com placeholder', () => {
    render(<SearchBar />)
    expect(screen.getByPlaceholderText(/Busque por título ou veracidade/i)).toBeInTheDocument()
  })

  it('chama onSearch com valor sem espaços nas extremidades ao submeter', () => {
    const setQuery = jest.fn()
    const clearSuggestions = jest.fn()

    // override mock for this test
    jest.mocked(require('@/hooks/useSuggestions'), true).useSuggestions = () => ({
      query: '  hello  ',
      setQuery,
      suggestions: [],
      loading: false,
      clearSuggestions,
    })

    const onSearch = jest.fn()
    render(<SearchBar onSearch={onSearch} />)
    const form = screen.queryByRole('form') || screen.getByPlaceholderText(/Busque por título/i).closest('form')
    if (form) fireEvent.submit(form)
    expect(onSearch).toHaveBeenCalledWith('hello')
  })

  it('botão de limpar aciona onSearch com string vazia e chama clearSuggestions', () => {
    const setQuery = jest.fn()
    const clearSuggestions = jest.fn()

    jest.mocked(require('@/hooks/useSuggestions'), true).useSuggestions = () => ({
      query: 'x',
      setQuery,
      suggestions: [],
      loading: false,
      clearSuggestions,
    })

    const onSearch = jest.fn()
    render(<SearchBar onSearch={onSearch} />)
    const btn = screen.getByRole('button', { name: /Limpar busca/i })
    fireEvent.click(btn)
    expect(onSearch).toHaveBeenCalledWith('')
    expect(clearSuggestions).toHaveBeenCalled()
  })
})
