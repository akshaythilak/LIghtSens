import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Lightsenselogo from '../../assets/lightsenselogo.svg';

interface ErrorMessageProps {
  text: string;
  subtext?: string;
  image?: React.ReactNode;
}

export const ErrorMessage = ({ text, subtext }: ErrorMessageProps) => (
  <Grow in appear>
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ width: 1, height: '70vh' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center">
          {text}
        </Typography>
        {subtext && (
          <Typography variant="h6" align="center">
            {subtext}
          </Typography>
        )}
      </Box>
    </Stack>
  </Grow>
);

export const ErrorNotFound = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <img src={Lightsenselogo} width={150} height={50} aria-label="lightsenselogo" />
    </Box>
    <Typography variant="h5" align="center">
      Oops! The requested page was not found.
    </Typography>
  </Box>
);
