import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from '../app/page'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, title: 'Test Book', author: 'Test Author', summary: 'Test Summary' },
      { id: 2, title: 'Book 1', author: 'Author 1', summary: 'Summary 1' },
      { id: 3, title: 'Book 2', author: 'Author 2', summary: 'Summary 2' },
    ]),
  })
) as jest.Mock;

describe('Home', () => {
  it('renders the search component', () => {
    render(<Home />)
    expect(screen.getByPlaceholderText('Search books...')).toBeInTheDocument()
  })

  it('adds a card when a book is selected and added', async () => {
    render(<Home />)
    const searchInput = screen.getByPlaceholderText('Search books...')
    const addButton = screen.getByText('Add Book')

    fireEvent.change(searchInput, { target: { value: 'Test Book' } })
    
    await waitFor(() => {
      expect(screen.getByText(/Test Book/)).toBeInTheDocument();
    });

    const testBookItem = screen.getByText(/Test Book/)
    fireEvent.click(testBookItem)
    fireEvent.click(addButton)

    expect(screen.getByText(/Test Book/)).toBeInTheDocument()
  })

  it('displays multiple cards when multiple books are added', async () => {
    render(<Home />)
    const searchInput = screen.getByPlaceholderText('Search books...')
    const addButton = screen.getByText('Add Book')

    // Add first book
    fireEvent.change(searchInput, { target: { value: 'Book 1' } })
    await waitFor(() => {
      expect(screen.getByText(/Book 1/)).toBeInTheDocument();
    });
    const book1Item = screen.getByText(/Book 1/)
    fireEvent.click(book1Item)
    fireEvent.click(addButton)

    // Add second book
    fireEvent.change(searchInput, { target: { value: 'Book 2' } })
    await waitFor(() => {
      expect(screen.getByText(/Book 2/)).toBeInTheDocument();
    });
    const book2Item = screen.getByText(/Book 2/)
    fireEvent.click(book2Item)
    fireEvent.click(addButton)

    // Check if both cards are displayed
    expect(screen.getAllByText(/Book 1/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Book 2/).length).toBeGreaterThan(0)
  })
})
