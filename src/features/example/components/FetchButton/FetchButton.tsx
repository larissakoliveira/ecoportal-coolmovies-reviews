import React, { FC, memo } from 'react';
import { css } from '@emotion/react';
import { CustomizedButton } from '../../../reviews/components/CustomizedButton';

type FetchButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  label: string;
};

/**
 * Button that fetches data
 */
const FetchButton: FC<FetchButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <CustomizedButton variant='outlined' onClick={onClick} disabled={disabled}>
      {label}
    </CustomizedButton>
  );
};

const styles = {
  root: css({}),
};

export default memo(FetchButton);
