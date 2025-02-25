import "@testing-library/jest-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AddReviewDialog from '../AddReviewDialog';
import reviewsReducer from '../../../state/slice';
import { RatingProps } from '@mui/material';

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Rating: ({ onChange }: { onChange: RatingProps['onChange'] }) => (
    <div
      data-testid="rating"
      onClick={() => {
        const mockEvent = { target: {} } as React.SyntheticEvent<Element, Event>;
        onChange?.(mockEvent, 4);
      }}
    >
      Rating Component
    </div>
  ),
}));

const mockStore = configureStore({
  reducer: {
    reviews: reviewsReducer,
  },
});

describe('AddReviewDialog', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    movieId: 'movie-123',
    userReviewerId: 'user-123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dialog with all form elements', () => {
    render(
      <Provider store={mockStore}>
        <AddReviewDialog {...defaultProps} />
      </Provider>
    );

    expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /review/i })).toBeInTheDocument();
    expect(screen.getByTestId('rating')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit review/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('submit button is disabled when form is empty', () => {
    render(
      <Provider store={mockStore}>
        <AddReviewDialog {...defaultProps} />
      </Provider>
    );

    expect(screen.getByRole('button', { name: /submit review/i })).toBeDisabled();
  });

  it('calls onClose when Cancel is clicked', () => {
    render(
      <Provider store={mockStore}>
        <AddReviewDialog {...defaultProps} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('enables submit button and submits review when all fields are filled', () => {
    render(
      <Provider store={mockStore}>
        <AddReviewDialog {...defaultProps} />
      </Provider>
    );

    const titleInput = screen.getByRole('textbox', { name: /title/i });
    fireEvent.change(titleInput, { target: { value: 'Great Movie!' } });

    const reviewInput = screen.getByRole('textbox', { name: /review/i });
    fireEvent.change(reviewInput, { target: { value: 'This movie was fantastic!' } });

    const ratingComponent = screen.getByTestId('rating');
    fireEvent.click(ratingComponent);

    const submitButton = screen.getByRole('button', { name: /submit review/i });
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    const state = mockStore.getState();
    expect(state.reviews.isSubmitting).toBe(true);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
