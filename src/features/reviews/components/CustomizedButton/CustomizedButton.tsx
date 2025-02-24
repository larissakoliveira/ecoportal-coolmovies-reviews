import React, { memo, FC } from 'react';
import Button from '@mui/material/Button';
import { css } from '@emotion/react';

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
      variant={variant || 'outlined'}
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      css={styles.root}
    >
      {children}
    </Button>
  );
};

const styles = {
  root: css({
    color: '#61892F',
    borderColor: '#61892F',
    '&:hover': { 
      backgroundColor: '#61892F15',
      borderColor: '#61892F',
    },
    '&.MuiButton-outlined': {
      backgroundColor: '#61892F',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#4e6f26',
      },
    },
    '& .MuiButton-startIcon': { 
      margin: 0 
    },
  }),
};

export default memo(CustomizedButton);
