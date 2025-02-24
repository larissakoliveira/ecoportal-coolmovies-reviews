import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { memo, useState } from 'react';
import { useGetMovieReviewsQuery } from '../../../generated/graphql';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import AddReviewDialog from '../components/AddReviewDialog/AddReviewDialog';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomizedButton } from '../components/CustomizedButton';
import { css } from '@emotion/react';

const Reviews = () => {
  const { loading, error, data } = useGetMovieReviewsQuery();
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:768px)');

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Box css={styles.container}>
      <Box css={styles.header}>
        <CustomizedButton
          onClick={() => window.history.back()}
          startIcon={<ArrowBackIcon />}
        >
          {!isMobile && 'Go Back'}
        </CustomizedButton>

        <Typography variant='h4' css={styles.title}>
          {'Movie Reviews'}
        </Typography>
        
        <CustomizedButton
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setIsAddReviewOpen(true)}
        >
          {!isMobile && 'Add Review'}
        </CustomizedButton>
      </Box>

      {data?.allMovieReviews?.nodes?.map((review) => (
        <Box key={review?.title} css={styles.reviewContainer}>
          <Typography variant='h6'>{review?.title}</Typography>
          <Typography variant='subtitle1'>
            {'Movie:'}
            <Box component='span' css={styles.bold}>
              {review?.movieByMovieId?.title}
            </Box>
          </Typography>
          <Typography variant='body1'>
            {'Rating:'}
            <Box component='span' css={styles.bold}>
              {review?.rating}/5
            </Box>
          </Typography>
          <Typography variant='subtitle2'>{`by ${review?.movieByMovieId?.userByUserCreatorId?.name}`}</Typography>
          <Typography variant='body1' css={styles.mt1}>
            {review?.body}
          </Typography>
          {(review?.commentsByMovieReviewId?.nodes ?? []).length > 0 && (
            <Box css={styles.commentsContainer}>
              <Accordion css={styles.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='body2' css={styles.commentsTitle}>
                    {`Comments (${
                      (review?.commentsByMovieReviewId?.nodes ?? []).length
                    })`}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {review?.commentsByMovieReviewId?.nodes?.map((comment) => (
                    <Box key={comment?.id} css={styles.comment}>
                      <Typography variant='subtitle2'>
                        {comment?.title}
                      </Typography>
                      <Typography variant='body2'>{comment?.body}</Typography>
                      <Typography variant='caption' css={styles.commentAuthor}>
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
        movieId='70351289-8756-4101-bf9a-37fc8c7a82cd'
        userReviewerId='5f1e6707-7c3a-4acd-b11f-fd96096abd5a'
      />
    </Box>
  );
};

const styles = {
  container: css({
    padding: '1rem',
  }),
  header: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  }),
  title: css({
    textAlign: 'center',
    color: '#61892F',
    fontWeight: 'bold',
  }),
  reviewContainer: css({
    marginBottom: '2rem',
    padding: '1rem',
    border: '2px solid #4B8152',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }),
  bold: css({
    fontWeight: 'bold',
  }),
  mt1: css({
    marginTop: '0.5rem',
  }),
  commentsContainer: css({
    marginTop: '1rem',
  }),
  accordion: css({
    backgroundColor: '#f1f1f1',
    border: '2px solid #4B8152',
    color: '#000',
  }),
  commentsTitle: css({
    fontSize: '0.85rem',
  }),
  comment: css({
    marginBottom: '0.5rem',
    border: '1px solid #4B8152',
    borderRadius: '4px',
    padding: '0.5rem',
  }),
  commentAuthor: css({
    display: 'block',
    marginTop: '0.25rem',
    fontWeight: 'bold',
  }),
};

export default memo(Reviews);
