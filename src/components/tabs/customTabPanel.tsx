import { Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  padding?: any;
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, padding = '20px 0', ...other } = props;
  // console.log(value, index);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding }}>{children}</Box>}
    </div>
  );
}
