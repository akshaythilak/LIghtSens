import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartGraph({ size, data, Innerlabel, title }: any) {
  return (
    <Box className="flex justify-center flex-col items-center">
      {title}
      <PieChart
        series={[{ data, innerRadius: 80 }]}
        {...size}
        slotProps={{
          legend: {
            direction: 'horizontal',
            position: {
              vertical: 'bottom',
              horizontal: 'center',
            },
          },
        }}
      >
        <PieCenterLabel>{Innerlabel}</PieCenterLabel>
      </PieChart>
    </Box>
  );
}
