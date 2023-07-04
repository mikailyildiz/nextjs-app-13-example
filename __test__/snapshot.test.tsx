import { render, screen } from '@testing-library/react'
import AddBookmark from '../app/[lang]/components/addBookmark'

it('renders addbookmark unchanged', () => {
  const {container} = render(
    <AddBookmark selected={false} onBookmark={() => {}} />
  )
  expect(container).toMatchSnapshot()
})