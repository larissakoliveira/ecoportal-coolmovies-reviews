import { Epic } from 'redux-observable';
import { filter, switchMap } from 'rxjs/operators';
import { actions, SliceAction } from './slice';
import { RootState } from '../../../state/store';
import { EpicDependencies } from '../../../state/types';
import {
  CreateMovieReviewDocument,
  CreateMovieReviewMutation,
  CreateMovieReviewMutationVariables,
  GetMovieReviewsDocument,
  GetMovieReviewsQuery
} from '../../../generated/graphql';

export const createReviewEpic: Epic<
  SliceAction['submitReview'],
  any,
  RootState,
  EpicDependencies
> = (action$, state$, { client }) =>
  action$.pipe(
    filter(actions.submitReview.match),
    switchMap(async (action) => {
      try {
        const result = await client.mutate<
          CreateMovieReviewMutation,
          CreateMovieReviewMutationVariables
        >({
          mutation: CreateMovieReviewDocument,
          variables: {
            input: {
              movieReview: action.payload
            }
          },
          update: (cache, { data }) => {
            if (!data?.createMovieReview?.movieReview) return;

            const existingReviews = cache.readQuery<GetMovieReviewsQuery>({
              query: GetMovieReviewsDocument
            });

            if (!existingReviews?.allMovieReviews?.nodes) return;

            cache.writeQuery({
              query: GetMovieReviewsDocument,
              data: {
                allMovieReviews: {
                  __typename: 'MovieReviewsConnection',
                  nodes: [
                    data.createMovieReview.movieReview,
                    ...existingReviews.allMovieReviews.nodes
                  ]
                }
              }
            });
          }
        });

        if (result.data?.createMovieReview?.movieReview) {
          return actions.submitReviewSuccess();
        } else {
          return actions.submitReviewError('Failed to create review');
        }
      } catch (err: unknown) {
        return actions.submitReviewError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    })
  );

export const reviewsEpics = [createReviewEpic];
