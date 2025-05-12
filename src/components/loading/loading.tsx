import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LoadingImage from '../../assets/lightsenselogo.svg';

interface LoadingProps {
  text: string;
  fullScreen?: boolean;
}

export const Loading = ({ text, fullScreen = true }: LoadingProps) => (
  <Grid
    container
    spacing={2}
    alignItems="center"
    justifyContent="center"
    direction="column"
    height="100%"
  >
    {fullScreen && (
      <Grid>
        <Box display="flex" justifyContent="center" alignItems="center">
          {localStorage.getItem('chosenMode') !== 'dark' ? (
            <img src={LoadingImage} alt="lightsenselogo" width={150} height={150} />
          ) : (
            <img src={LoadingImage} alt="lightsenselogo" width={150} height={150} />
          )}
        </Box>
      </Grid>
    )}
    <Grid>
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    </Grid>
    <Grid>
      <Box>
        <Typography align="center">{text}</Typography>
      </Box>
    </Grid>
  </Grid>
);
