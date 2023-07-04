import { render, screen } from '@testing-library/react'
import AddBookmark from '../app/[lang]/components/addBookmark'

describe('AddBookmark', () => {
  it('renders a AddBookmark', () => {
    const { getByTestId, getByText } = render(
      <AddBookmark selected={false} onBookmark={() => {}} />
    )

    const addBookmarkContainer = getByTestId('add-bookmark')

    expect(addBookmarkContainer).toBeInTheDocument()
  })
})
