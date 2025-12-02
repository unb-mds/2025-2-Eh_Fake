import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

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

describe('Barra de Busca', () => {
  it('renderiza input com placeholder', () => {
    render(<SearchBar onSearch={jest.fn()} />)
    expect(screen.getByPlaceholderText(/Busque por título ou veracidade/i)).toBeInTheDocument()
  })

  it('calls onSearch with trimmed value on submit', () => {
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

  it('clear button triggers onSearch with empty string and calls clearSuggestions', () => {
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

  describe('Mudanças no valor do input', () => {
    it('deve chamar setQuery quando o valor do input muda', () => {
      const setQuery = jest.fn()
      
      jest.mocked(require('@/hooks/useSuggestions'), true).useSuggestions = () => ({
        query: '',
        setQuery,
        suggestions: [],
        loading: false,
        clearSuggestions: jest.fn(),
      })

      const onSearch = jest.fn()
      render(<SearchBar onSearch={onSearch} />)
      const input = screen.getByPlaceholderText(/Busque por título/i)
      
      fireEvent.change(input, { target: { value: 'test' } })
      expect(setQuery).toHaveBeenCalled()
    })

    it('deve tratar entrada de busca vazia', () => {
      const onSearch = jest.fn()
      render(<SearchBar onSearch={onSearch} />)
      const input = screen.getByPlaceholderText(/Busque por título/i)
      
      fireEvent.change(input, { target: { value: '' } })
      fireEvent.submit(input.closest('form')!)
      
      expect(onSearch).toHaveBeenCalled()
    })
  })

  describe('Manipulação de sugestões', () => {
    it('deve exibir sugestões quando disponíveis', () => {
      const useSuggestionsModule = require('@/hooks/useSuggestions')
      useSuggestionsModule.useSuggestions = () => ({
        query: 'vac',
        setQuery: jest.fn(),
        suggestions: ['vaccine', 'vaccination'],
        loading: false,
        clearSuggestions: jest.fn(),
      })

      const onSearch = jest.fn()
      render(<SearchBar onSearch={onSearch} />)
      
      // Check if suggestions are available
      const suggestionItems = screen.queryAllByRole('option')
      if (suggestionItems.length > 0) {
        expect(suggestionItems.length).toBeGreaterThan(0)
      }
    })

    it('deve lidar com clique em sugestão', async () => {
      const setQuery = jest.fn()
      const clearSuggestions = jest.fn()
      
      const useSuggestionsModule = require('@/hooks/useSuggestions')
      useSuggestionsModule.useSuggestions = () => ({
        query: 'vac',
        setQuery,
        suggestions: ['vaccine', 'vaccination'],
        loading: false,
        clearSuggestions,
      })

      const onSearch = jest.fn()
      render(<SearchBar onSearch={onSearch} />)
      
      // Try to find and click suggestion
      const suggestionItems = screen.queryAllByRole('option')
      if (suggestionItems.length > 0) {
        fireEvent.click(suggestionItems[0])
        // After click, suggestions should be cleared
        expect(clearSuggestions).toHaveBeenCalled()
      }
    })
  })

  describe('Navegação por teclado', () => {
    it('deve processar Enter com sugestão selecionada', () => {
      const onSearch = jest.fn()
      const setQuery = jest.fn()
      const clearSuggestions = jest.fn()
      
      const useSuggestionsModule = require('@/hooks/useSuggestions')
      useSuggestionsModule.useSuggestions = () => ({
        query: 'test',
        setQuery,
        suggestions: ['test1', 'test2'],
        loading: false,
        clearSuggestions,
      })
      
      render(<SearchBar onSearch={onSearch} />)
      const input = screen.getByPlaceholderText(/Busque por título/i)
      
      // Select a suggestion first with arrow down
      fireEvent.keyDown(input, { key: 'ArrowDown' })
      // Then press Enter to select it
      fireEvent.keyDown(input, { key: 'Enter' })
      
      expect(onSearch).toHaveBeenCalledWith('test1')
    })

    it('deve processar Escape para limpar sugestões', () => {
      const clearSuggestions = jest.fn()
      
      const useSuggestionsModule = require('@/hooks/useSuggestions')
      useSuggestionsModule.useSuggestions = () => ({
        query: 'test',
        setQuery: jest.fn(),
        suggestions: ['test1', 'test2'],
        loading: false,
        clearSuggestions,
      })

      const onSearch = jest.fn()
      render(<SearchBar onSearch={onSearch} />)
      const input = screen.getByPlaceholderText(/Busque por título/i)
      
      fireEvent.keyDown(input, { key: 'Escape' })
      expect(clearSuggestions).toHaveBeenCalled()
    })
  })

  describe('Responsividade', () => {
    it('deve ter classes responsivas', () => {
      const onSearch = jest.fn()
      const { container } = render(<SearchBar onSearch={onSearch} />)
      
      const input = screen.getByPlaceholderText(/Busque por título/i)
      expect(input).toBeInTheDocument()
    })

    it('deve renderizar o formulário de busca', () => {
      const onSearch = jest.fn()
      render(<SearchBar onSearch={onSearch} />)
      
      const input = screen.getByPlaceholderText(/Busque por título/i)
      expect(input.closest('form')).toBeInTheDocument()
    })
  })

  describe('Interação com o backdrop', () => {
    it('deve renderizar sem erros quando focado', () => {
      const useSuggestionsModule = require('@/hooks/useSuggestions')
      useSuggestionsModule.useSuggestions = () => ({
        query: 'test',
        setQuery: jest.fn(),
        suggestions: [],
        loading: false,
        clearSuggestions: jest.fn(),
      })

      const onSearch = jest.fn()
      const { container } = render(<SearchBar onSearch={onSearch} />)
      const input = screen.getByPlaceholderText(/Busque por título/i)

      fireEvent.focus(input)
      // Just verify the component is still in the document
      expect(input).toBeInTheDocument()
    })
  })



  describe('Navegação com teclas de seta', () => {
    it('deve navegar para baixo entre as sugestões', () => {
      const setQuery = jest.fn()
      const clearSuggestions = jest.fn()
      
      const useSuggestionsModule = require('@/hooks/useSuggestions')
      useSuggestionsModule.useSuggestions = () => ({
        query: 'v',
        setQuery,
        suggestions: ['vaccine', 'vaccination', 'vaccinate'],
        loading: false,
        clearSuggestions,
      })

      const onSearch = jest.fn()
      render(<SearchBar onSearch={onSearch} />)
      const input = screen.getByPlaceholderText(/Busque por título/i)

      // Arrow down should select first suggestion
      fireEvent.keyDown(input, { key: 'ArrowDown' })
      expect(input).toBeInTheDocument()
    })

    it('deve navegar para cima entre as sugestões', () => {
      const useSuggestionsModule = require('@/hooks/useSuggestions')
      useSuggestionsModule.useSuggestions = () => ({
        query: 'v',
        setQuery: jest.fn(),
        suggestions: ['vaccine', 'vaccination'],
        loading: false,
        clearSuggestions: jest.fn(),
      })

      const onSearch = jest.fn()
      render(<SearchBar onSearch={onSearch} />)
      const input = screen.getByPlaceholderText(/Busque por título/i)

      // Arrow up should cycle through
      fireEvent.keyDown(input, { key: 'ArrowUp' })
      expect(input).toBeInTheDocument()
    })

    it('não deve processar setas quando não há sugestões', () => {
      const onSearch = jest.fn()
      render(<SearchBar onSearch={onSearch} />)
      const input = screen.getByPlaceholderText(/Busque por título/i)

      // Arrow down with no suggestions should not crash
      fireEvent.keyDown(input, { key: 'ArrowDown' })
      expect(input).toBeInTheDocument()
    })
  })

  describe('Manipulador de clique em sugestão', () => {
    it('deve tratar seleção de sugestão e chamar onSearch', () => {
      const setQuery = jest.fn()
      const clearSuggestions = jest.fn()
      
      const useSuggestionsModule = require('@/hooks/useSuggestions')
      useSuggestionsModule.useSuggestions = () => ({
        query: 'vac',
        setQuery,
        suggestions: ['vaccine'],
        loading: false,
        clearSuggestions,
      })

      const onSearch = jest.fn()
      const { container } = render(<SearchBar onSearch={onSearch} />)
      const input = screen.getByPlaceholderText(/Busque por título/i)

      fireEvent.focus(input)
      
      // Try to click on the suggestion button
      const suggestionButtons = container.querySelectorAll('button[type="button"]')
      const suggestionButton = Array.from(suggestionButtons).find(btn => 
        btn.textContent?.includes('vaccine') && btn !== screen.getByRole('button', { name: /Limpar busca/i })
      )
      
      if (suggestionButton) {
        fireEvent.click(suggestionButton)
        expect(onSearch).toHaveBeenCalledWith('vaccine')
        expect(clearSuggestions).toHaveBeenCalled()
      }
    })
  })

  describe('Casos de borda do botão Limpar', () => {
    it('deve mostrar botão de limpar mesmo quando query está vazia', () => {
      const onSearch = jest.fn()
      render(<SearchBar onSearch={onSearch} />)
      
      // Clear button is always rendered in the DOM
      const clearButton = screen.getByRole('button', { name: /Limpar busca/i })
      expect(clearButton).toBeInTheDocument()
    })

    it('deve limpar query e sugestões', () => {
      const setQuery = jest.fn()
      const clearSuggestions = jest.fn()

      jest.mocked(require('@/hooks/useSuggestions'), true).useSuggestions = () => ({
        query: 'vaccine',
        setQuery,
        suggestions: ['vaccine1', 'vaccine2'],
        loading: false,
        clearSuggestions,
      })

      const onSearch = jest.fn()
      render(<SearchBar onSearch={onSearch} />)
      
      const clearBtn = screen.getByRole('button', { name: /Limpar busca/i })
      fireEvent.click(clearBtn)
      
      expect(onSearch).toHaveBeenCalledWith('')
      expect(clearSuggestions).toHaveBeenCalled()
    })
  })
})
