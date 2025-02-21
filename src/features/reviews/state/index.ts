export { actions as reviewsActions } from './slice';
export { default as reviewsReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { reviewsEpics } from './epics';

export const combinedReviewsEpics = combineEpics(...reviewsEpics);
