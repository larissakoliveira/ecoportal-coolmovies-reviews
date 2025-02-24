import React, { FC, memo, useState } from 'react';
import { css } from '@emotion/react';
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
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>{'Submit Review'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label='Review'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
          <Box>
            <Typography component='legend'>Rating</Typography>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue || 0)}
            />
          </Box>
        </Box>
        {error && (
          <Typography color='error' sx={{ mt: 2 }}>
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

export default memo(AddReviewDialog);
