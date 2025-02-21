import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReviewState {
  isSubmitting: boolean;
  error: string | null;
}

interface ReviewPayload {
  title: string;
  body: string;
  rating: number;
  movieId: string;
  userReviewerId: string;
}

const initialState: ReviewState = {
  isSubmitting: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    submitReview: (state, action: PayloadAction<ReviewPayload>) => {
      state.isSubmitting = true;
      state.error = null;
    },
    submitReviewSuccess: (state) => {
      state.isSubmitting = false;
      state.error = null;
    },
    submitReviewError: (state, action: PayloadAction<string>) => {
      state.isSubmitting = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = reviewsSlice;
export type SliceAction = typeof actions;
export default reviewsSlice.reducer;
