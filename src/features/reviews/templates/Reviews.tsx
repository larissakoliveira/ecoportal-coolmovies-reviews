import { Box, Typography } from '@mui/material';
import { memo } from 'react';

const Reviews = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1">
        Movie Reviews
      </Typography>
    </Box>
  );
};

export default memo(Reviews);