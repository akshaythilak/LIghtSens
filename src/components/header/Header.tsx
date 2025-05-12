import { Logout, Settings } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
// import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Badge, Box, ListItemIcon, Menu, MenuItem } from '@mui/material';
// import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import useDirection from '../../i18n/DirWrapper';
import LightSenseLogo from '../../svg/LightSense-logo.svg?react';
import NotificationIcon from '../../svg/notification.svg?react';

// import { AppHeaderProps } from '../../types/type';

export default function AppHeader() {
  const wrapperRef = useDirection();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  //   const isRTL = i18n.dir() === 'rtl';
  const theme = useTheme();
  const mediaQuerySmall = useMediaQuery(theme.breakpoints.up('sm'));
  // const iconButtonStyle = {
  //   boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
  //   marginLeft: mediaQuerySmall ? '8px' : { marginLeft: '0px !important' },
  // };
  const [language, setLanguage] = useState(i18n.language);
  const [openMenu, setOpenMenu] = useState(null);
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const openAccount = Boolean(anchorElMenu);

  const avatarChange = () => {
    switch (sessionStorage.getItem('role')) {
      case 'Standard User':
        return 'SU';
      case 'Super Admin':
        return 'SA';
      default:
        return 'DM';
    }
  };

  const handleOpenMenu = (event: any) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const handleClickAccount = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseAccount = () => {
    setAnchorElMenu(null);
  };

  const handleChangeLanguage = (event: any) => {
    const selectedLang = event;
    i18n.changeLanguage(selectedLang); // Change the language
    setLanguage(selectedLang);
  };

  const logoutDevice = () => {
    navigate('/');
    sessionStorage.clear();
  };

  return (
    <>
      <Box ref={wrapperRef} className="flex flex-row">
        {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[open && { display: 'none' }]}
        >
          <MenuIcon />
        </IconButton> */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          sx={{
            gap: !mediaQuerySmall ? '8px' : '',
            padding: '10px 20px',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <LightSenseLogo />
          <Box>
            <Tooltip title={t('Notifications')} enterDelay={300}>
              <IconButton>
                <Badge badgeContent={2} color="error">
                  <NotificationIcon width={20} height={20} />
                </Badge>
              </IconButton>
            </Tooltip>
            {/* <PopoverBox
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            notification={notification}
            setNotification={setNotification}
          /> */}
            <Tooltip title={t('change language')} enterDelay={300}>
              <IconButton color="primary" onClick={handleOpenMenu}>
                <LanguageIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={openMenu}
              open={Boolean(openMenu)}
              onClose={handleCloseMenu}
              sx={{ width: '30rem' }}
            >
              <MenuItem selected={language === 'en'} onClick={() => handleChangeLanguage('en')}>
                English
              </MenuItem>
              <MenuItem selected={language === 'ar'} onClick={() => handleChangeLanguage('ar')}>
                العربية
              </MenuItem>
            </Menu>
            <Tooltip title={t('Account settings')}>
              <span>
                <IconButton
                  onClick={handleClickAccount}
                  size="medium"
                  aria-controls={openAccount ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAccount ? 'true' : undefined}
                >
                  <Avatar
                    sx={{ width: 30, height: 30, fontSize: '16px' }}
                    className={`${avatarChange()}`}
                    src="/broken-image.jpg"
                  ></Avatar>
                </IconButton>
                Welcome
              </span>
            </Tooltip>
          </Box>
        </Stack>
      </Box>
      <Menu
        anchorEl={anchorElMenu}
        id="account-menu"
        open={openAccount}
        sx={{ maxWidth: '65%' }}
        onClose={handleCloseAccount}
        onClick={handleCloseAccount}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem onClick={handleCloseAccount}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Reset Account
        </MenuItem> */}

        <MenuItem key="configuration" component={RouterLink} to="/configuration">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t('Configuration Settings')}
        </MenuItem>

        <MenuItem onClick={() => logoutDevice()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('Logout')}
        </MenuItem>
      </Menu>
    </>
  );
}
