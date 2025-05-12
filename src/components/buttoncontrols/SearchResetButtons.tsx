import React from 'react';
import { Box, Button } from '@mui/material';
import { SearchResetButtonsProps } from '../../types/type';

const SearchResetButtons: React.FC<SearchResetButtonsProps> = ({ buttons }) => (
  <Box sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
    {buttons.map((btn, index) => (
      <Button
        key={index}
        variant={btn.variant || 'outlined'}
        size="large"
        onClick={btn.onClick}
        sx={{ border: '1px solid #536de6', borderRadius: '4px', color: '#536de6', fontSize: 12 }}
      >
        {btn.label}
      </Button>
    ))}
  </Box>
);

export default SearchResetButtons;
