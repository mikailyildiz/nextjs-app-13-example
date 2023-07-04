import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddBookmark from '../app/[lang]/components/addBookmark'

describe('AddBookmark', () => {
  it('should render bookmark icon', () => {
    const { getByTestId } = render(<AddBookmark selected={false} onBookmark={() => {}} />);
    const bookmarkIcon = getByTestId('add-bookmark');
    expect(bookmarkIcon).toBeInTheDocument();
  });

  it('should add selected class when selected prop is true', () => {
    const { getByTestId } = render(<AddBookmark selected={true} onBookmark={() => {}} />);
    const bookmarkIcon = getByTestId('add-bookmark');
    expect(bookmarkIcon).toHaveClass('selected');
  });

  it('should not have selected class when selected prop is false', () => {
    const { getByTestId } = render(<AddBookmark selected={false} onBookmark={() => {}} />);
    const bookmarkIcon = getByTestId('add-bookmark');
    expect(bookmarkIcon).not.toHaveClass('selected');
  });

  it('should call onBookmark function when bookmark is clicked', () => {
    const onBookmarkMock = jest.fn();
    const { getByTestId } = render(<AddBookmark selected={false} onBookmark={onBookmarkMock} />);
    const bookmarkIcon = getByTestId('add-bookmark');
    fireEvent.click(bookmarkIcon);
    expect(onBookmarkMock).toHaveBeenCalled();
  });
});
