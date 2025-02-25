import reducer, { actions } from '../slice';

describe('reviews slice', () => {
  const initialState = {
    isSubmitting: false,
    error: null,
  };

  it('should handle submitReview', () => {
    const action = actions.submitReview({
      title: 'Great Movie',
      body: 'Everyone should watch this movie!',
      rating: 5,
      movieId: '1',
      userReviewerId: 'joedoe1',
    });

    const state = reducer(initialState, action);
    expect(state.isSubmitting).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle submitReviewSuccess', () => {
    const state = reducer({ ...initialState, isSubmitting: true }, actions.submitReviewSuccess());
    expect(state.isSubmitting).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle submitReviewError', () => {
    const state = reducer(initialState, actions.submitReviewError('Error occurred'));
    expect(state.isSubmitting).toBe(false);
    expect(state.error).toBe('Error occurred');
  });
});
