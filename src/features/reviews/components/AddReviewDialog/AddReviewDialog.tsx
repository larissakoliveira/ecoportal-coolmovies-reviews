import React, { FC, memo, useState } from 'react';
import {
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
  const [bodyError, setBodyError] = useState('');
  const { isSubmitting, error } = useSelector((state: RootState) => state.reviews);

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBody(value);

    if (value.length < 5) {
      setBodyError('Review must be at least 5 characters.');
    } else {
      setBodyError('');
    }
  };

  const handleClose = () => {
    setTitle('');
    setBody('');
    setRating(0);
    setBodyError('');
    onClose();
  };

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
    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth='sm' 
      fullWidth 
      css={styles.dialog}
      aria-labelledby='review-dialog-title'
      disableEnforceFocus
      keepMounted
    >
      <DialogTitle id='review-dialog-title'>{'Submit Review'}</DialogTitle>
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
            onChange={handleBodyChange}
            multiline
            rows={4}
            fullWidth
            css={styles.textField}
            error={!!bodyError}
            helperText={bodyError}
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
        <CustomizedButton onClick={handleClose}>Cancel</CustomizedButton>
        <CustomizedButton
          onClick={handleSubmit}
          variant='outlined'
          disabled={!title || !body || !rating || isSubmitting || body.length < 5}
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
