import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const Footer = styled('footer')(() => ({
  position: 'relative',
  left: 0,
  bottom: 0,
  marginTop: '100px',
  paddingBottom: '35px',
}));

export default function AppFooter() {
  const theme = useTheme();
  const location = useLocation();
  const { t } = useTranslation();
  // const { version, gitCommit } = useContext(ViseronContext);
  const showFooter = !['/configuration', '/events'].includes(location.pathname);

  return showFooter ? (
    <Footer>
      <Typography align="center" variant="subtitle2" color={theme.palette.text.secondary}>
        {t('Lightsense')}
      </Typography>
    </Footer>
  ) : null;
}
