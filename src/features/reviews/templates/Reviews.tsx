import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { memo, useState } from 'react';
import { useGetMovieReviewsQuery } from '../../../generated/graphql';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { AddReviewDialog } from '../components/AddReviewDialog';

const Reviews = () => {
  const { loading, error, data } = useGetMovieReviewsQuery();
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:500px)');

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          variant='h4'
          sx={{ textAlign: 'center', color: '#61892F', fontWeight: 'bold' }}
        >
          {'Movie Reviews'}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsAddReviewOpen(true)}
          sx={{ 
            bgcolor: '#61892F', 
            '&:hover': { bgcolor: '#4e6f26' },
            '& .MuiButton-startIcon': {
              margin: 0
            }
          }}
        >
          {!isMobile && 'Add Review'}
        </Button>
      </Box>
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
          <Typography variant='subtitle2'>{`by ${review?.movieByMovieId?.userByUserCreatorId?.name}`}</Typography>
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
      <AddReviewDialog
        open={isAddReviewOpen}
        onClose={() => setIsAddReviewOpen(false)}
        movieId="70351289-8756-4101-bf9a-37fc8c7a82cd"
        userReviewerId="5f1e6707-7c3a-4acd-b11f-fd96096abd5a"
      />
    </Box>
  );
};

export default memo(Reviews);
