// components/common/ActionButtons.tsx
import React from 'react';
import { Box, Button } from '@mui/material';
import { ActionButtonsProps } from '../../types/type';

const ActionButtons: React.FC<ActionButtonsProps> = ({
  buttons,
  spacing = 1.5,
  backgroundColor = '#546EE7',
  borderRadius = 26,
  fontSize = 12,
}) => (
  <Box sx={{ display: 'flex', gap: spacing, mb: 2 }}>
    {buttons.map((btn, index) => (
      <Button
        key={index}
        variant={btn.variant || 'outlined'}
        size="large"
        onClick={btn.onClick}
        sx={{ borderRadius, backgroundColor, fontSize }}
      >
        {btn.label}
      </Button>
    ))}
  </Box>
);

export default ActionButtons;
