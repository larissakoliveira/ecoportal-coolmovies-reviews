import React, { memo, FC } from 'react';
import Button from '@mui/material/Button';

type CustomizedButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  children: React.ReactNode;
  startIcon?: React.ReactNode;
};

const CustomizedButton: FC<CustomizedButtonProps> = ({
  onClick,
  disabled,
  children,
  variant,
  startIcon,
}) => {
  return (
    <Button
      variant={variant || 'contained'}
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      sx={{
        bgcolor: '#61892F',
        '&:hover': { bgcolor: '#4e6f26' },
        '& .MuiButton-startIcon': { margin: 0 },
      }}
    >
      {children}
    </Button>
  );
};

export default memo(CustomizedButton);
