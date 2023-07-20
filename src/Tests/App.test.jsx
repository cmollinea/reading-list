/* eslint-disable quotes */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import App from '../App'
import { ReadingListProvider } from '../Context/ReadingListProvider'
import books from '../mocks/books.json'

const titles = books.library.map((book) => book.book.title)
const filteredBooksByTerrorGenre = books.library.filter(
  (book) => book.book.genre === 'Terror'
)
const filteredBooksByPages = books.library.filter(
  (book) => book.book.pages > 1000
)

describe('App Test', () => {
  beforeEach(() =>
    render(
      <ReadingListProvider>
        <App />
      </ReadingListProvider>
    )
  )
  afterEach(() => cleanup())
  it('should show header', () => {
    screen.getByText(/Catálogo de Libros./i)
  })

  it('should render an image for book', () => {
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(titles.length)
  })

  it('should add a book when click', () => {
    const addButtons = screen.getAllByRole('add-button')
    addButtons.forEach((button) => fireEvent.click(button))
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(titles.length * 2)
  })

  it('should remove the book from list when click remove button', () => {
    const removeButtons = screen.getAllByRole('remove-button')
    removeButtons.forEach((button) => fireEvent.click(button))
    expect(removeButtons).toHaveLength(titles.length)
  })

  it('should filter by genre', () => {
    const select = screen.getByRole('select')
    fireEvent.change(select, { target: { value: 'Terror' } })
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(filteredBooksByTerrorGenre.length)
  })

  it('should filter by minimun pages', () => {
    const range = screen.getByRole('range')
    fireEvent.change(range, { target: { value: 1000 } })
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(filteredBooksByPages.length)
  })
})
