import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { memo } from 'react';
import { useGetMovieReviewsQuery } from '../../../generated/graphql';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Reviews = () => {
  const { loading, error, data } = useGetMovieReviewsQuery();

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant='h4'
        sx={{ textAlign: 'center', color: '#61892F', fontWeight: 'bold' }}
      >
        {'Movie Reviews'}
      </Typography>
      {data?.allMovieReviews?.nodes?.map((review) => (
        <Box
          key={review?.title}
          sx={{
            mb: 4,
            p: 2,
            border: '2px solid #4B8152',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant='h6'>{review?.title}</Typography>
          <Typography variant='subtitle1'>
            {'Movie:'}
            <Box component='span' sx={{ fontWeight: 'bold' }}>
              {review?.movieByMovieId?.title}
            </Box>
          </Typography>
          <Typography variant='body1'>
            {'Rating:'}
            <Box component='span' sx={{ fontWeight: 'bold' }}>
              {review?.rating}/5
            </Box>
          </Typography>
          <Typography variant='body1' sx={{ mt: 1 }}>
            {review?.body}
          </Typography>
          {(review?.commentsByMovieReviewId?.nodes ?? []).length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='subtitle2' sx={{ fontSize: '1rem' }}>
                    {`Comments (${
                      (review?.commentsByMovieReviewId?.nodes ?? []).length
                    })`}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {review?.commentsByMovieReviewId?.nodes?.map((comment) => (
                    <Box
                      key={comment?.id}
                      sx={{ mb: 1, border: '1px solid #eee', p: 1 }}
                    >
                      <Typography variant='subtitle2'>
                        {comment?.title}
                      </Typography>
                      <Typography variant='body2'>{comment?.body}</Typography>
                      <Typography
                        variant='caption'
                        sx={{ display: 'block', mt: 0.5, fontWeight: 'bold' }}
                      >
                        {`By: ${comment?.userByUserId?.name}`}
                      </Typography>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default memo(Reviews);
