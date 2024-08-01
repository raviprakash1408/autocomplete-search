import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchComponent from '../components/SearchComponent'

const mockOnAddCard = jest.fn()

describe('SearchComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, title: 'Book 1', author: 'Author 1', summary: 'Summary 1', occurrences: 5 },
          { id: 2, title: 'Book 2', author: 'Author 2', summary: 'Summary 2', occurrences: 3 },
        ]),
      })
    ) as jest.Mock
  })

  it('renders the search input', () => {
    render(<SearchComponent onAddCard={mockOnAddCard} />)
    expect(screen.getByPlaceholderText('Search books...')).toBeInTheDocument()
  })

  it('displays suggestions when typing', async () => {
    render(<SearchComponent onAddCard={mockOnAddCard} />)
    const input = screen.getByPlaceholderText('Search books...')
    fireEvent.change(input, { target: { value: 'Book' } })

    await waitFor(() => {
      expect(screen.getByText('Book 1 (Occurrences: 5)')).toBeInTheDocument()
      expect(screen.getByText('Book 2 (Occurrences: 3)')).toBeInTheDocument()
    })
  })

  it('selects a book when clicking on a suggestion', async () => {
    render(<SearchComponent onAddCard={mockOnAddCard} />)
    const input = screen.getByPlaceholderText('Search books...')
    fireEvent.change(input, { target: { value: 'Book' } })

    await waitFor(() => {
      fireEvent.click(screen.getByText('Book 1 (Occurrences: 5)'))
    })

    expect(input).toHaveValue('Book 1')
  })

  it('calls onAddCard when submitting a selected book', async () => {
    render(<SearchComponent onAddCard={mockOnAddCard} />)
    const input = screen.getByPlaceholderText('Search books...')
    fireEvent.change(input, { target: { value: 'Book' } })

    await waitFor(() => {
      fireEvent.click(screen.getByText('Book 1 (Occurrences: 5)'))
    })

    fireEvent.click(screen.getByText('Add Book'))

    expect(mockOnAddCard).toHaveBeenCalledWith(expect.objectContaining({
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      summary: 'Summary 1',
      occurrences: 5
    }))
  })

  it('disables the Add Book button when no book is selected', () => {
    render(<SearchComponent onAddCard={mockOnAddCard} />)
    expect(screen.getByText('Add Book')).toBeDisabled()
  })
})
