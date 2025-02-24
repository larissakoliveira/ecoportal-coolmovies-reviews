import React, { FC, memo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Box,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { reviewsActions } from '../../state';
import { RootState } from '../../../../state/store';
import { CustomizedButton } from '../CustomizedButton';
import { css } from '@emotion/react';

type AddReviewDialogProps = {
  open: boolean;
  onClose: () => void;
  movieId: string;
  userReviewerId: string;
};

const AddReviewDialog: FC<AddReviewDialogProps> = ({
  open,
  onClose,
  movieId,
  userReviewerId,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = useState<number>(0);

  const { isSubmitting, error } = useSelector((state: RootState) => state.reviews);

  const handleSubmit = () => {
    dispatch(
      reviewsActions.submitReview({
        title,
        body,
        rating,
        movieId,
        userReviewerId,
      })
    );
    onClose();
    setTitle('');
    setBody('');
    setRating(0);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth css={styles.dialog}>
      <DialogTitle>{'Submit Review'}</DialogTitle>
      <DialogContent>
        <Box css={styles.content}>
          <TextField
            label='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            css={styles.textField}
          />
          <TextField
            label='Review'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            multiline
            rows={4}
            fullWidth
            css={styles.textField}
          />
          <Box css={styles.ratingContainer}>
            <Typography component='legend'>Rating</Typography>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue || 0)}
            />
          </Box>
        </Box>
        {error && (
          <Typography color='error' css={styles.error}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <CustomizedButton onClick={onClose}>Cancel</CustomizedButton>
        <CustomizedButton
          onClick={handleSubmit}
          variant='contained'
          disabled={!title || !body || !rating || isSubmitting}
        >
          {'Submit Review'}
        </CustomizedButton>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
  dialog: css({
    '& .MuiDialog-paper': {
      backgroundColor: '#fff',
      color: '#000',
    },
  }),
  content: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '0.5rem',
  }),
  textField: css({
    '& .MuiInputLabel-root': {
      color: '#86C232',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#61892F',
    },
    '& .MuiOutlinedInput-root': {
      color: '#000',
      '& fieldset': {
        borderColor: '#86C232',
      },
      '&:hover fieldset': {
        borderColor: '#61892F',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#61892F',
      },
    },
  }),
  ratingContainer: css({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  }),
  error: css({
    marginTop: '1rem',
  }),
};

export default memo(AddReviewDialog);
