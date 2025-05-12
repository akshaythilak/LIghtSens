import { styled } from '@mui/material/styles';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Menu,
  MenuItem,
} from '@mui/material';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { AppHeaderProps } from '../../types/type';
import { Link } from 'react-router-dom';
import { ReactNode, useState } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import Devices from '../../svg/driver.svg?react';
import Map from '../../svg/global.svg?react';
import Tasks from '../../svg/clipboard-text.svg?react';
import Reports from '../../svg/graph.svg?react';
import ThirdParty from '../../svg/monitor.svg?react';
import Alarms from '../../svg/notification-bing.svg?react';
import System from '../../svg/setting.svg?react';
import DevicesDark from '../../svg/Dark/driver.svg?react';
import MapDark from '../../svg/Dark/global.svg?react';
import TasksDark from '../../svg/Dark/clipboard-text.svg?react';
import ReportsDark from '../../svg/Dark/graph.svg?react';
// import ThirdPartyDark from '../../svg/Dark/monitor.svg?react';
import AlarmsDark from '../../svg/Dark/notification-bing.svg?react';
import SystemDark from '../../svg/Dark/setting.svg?react';
import DrawerTiltTool from '../../svg/pharagraphspacing.svg?react';
import './common.css';

const drawerWidthOpen = 240;
const drawerWidthClosed = 80;

const commonIconStyle = {
  fontSize: '1.5rem',
  width: '2em',
};

type DrawerItem = {
  title: string;
  icon: ReactNode;
  darkIcon: ReactNode;
  path?: string;
  submenu?: { title: string; path: string }[];
};

const drawerItems: DrawerItem[] = [
  {
    title: 'GIS',
    icon: <Map style={commonIconStyle} />,
    darkIcon: <MapDark style={commonIconStyle} />,
    // path: '/dashboard',
    submenu: [
      { title: 'Street Lighting', path: '/maps' },
      { title: 'Device Overview', path: '/dashboard' },
    ],
  },
  {
    title: 'Devices',
    icon: <Devices style={commonIconStyle} />,
    darkIcon: <DevicesDark style={commonIconStyle} />,
    submenu: [
      { title: 'Devices', path: '/devices' },
      { title: 'Device Topology', path: '/device-topology' },
      { title: 'Configuration', path: '/device-config' },
    ],
  },
  {
    title: 'Alarms',
    icon: <Alarms style={commonIconStyle} />,
    darkIcon: <AlarmsDark style={commonIconStyle} />,
    submenu: [
      { title: 'Event Management', path: '/entities/people' },
      { title: 'Real-Time Alarm', path: '/entities/vehicles' },
      { title: 'Historical Alarm', path: '/entities/vehicles' },
    ],
  },
  {
    title: 'Tasks',
    icon: <Tasks style={commonIconStyle} />,
    darkIcon: <TasksDark style={commonIconStyle} />,
    submenu: [
      { title: 'Task Management', path: '/taskmanagment' },
      { title: 'Task Configuration', path: '/topology' },
      { title: 'Task Distribution', path: '/configuration' },
    ],
  },
  {
    title: 'Reports',
    icon: <Reports style={commonIconStyle} />,
    darkIcon: <ReportsDark style={commonIconStyle} />,
    // path: '/manage-user',
    submenu: [
      { title: 'Energy', path: '/devices' },
      { title: 'Energy Bills', path: '/topology' },
      { title: 'Alarms', path: '/configuration' },
    ],
  },
  {
    title: 'System',
    icon: <System style={commonIconStyle} />,
    darkIcon: <SystemDark style={commonIconStyle} />,
    submenu: [{ title: 'System Management', path: '/systemmanagment' }],
  },
  {
    title: 'ThirdParty',
    icon: <ThirdParty style={commonIconStyle} />,
    darkIcon: <ThirdParty style={commonIconStyle} />,
    submenu: [{ title: 'NS Service Configuration', path: '/devices' }],
  },
];

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  width: open ? drawerWidthOpen : drawerWidthClosed,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
  '& .MuiDrawer-paper': {
    width: open ? drawerWidthOpen : drawerWidthClosed,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    backgroundColor: '#28367A',
    color: '#ecf0f1',
    top: 'unset',
    overflowX: 'hidden',
  },
}));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

export default function MiniDrawer({ open, setOpen }: AppHeaderProps) {
  // const theme = useTheme();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState('');

  const handleToggleSubmenu = (title: string) => {
    setOpenSubmenu((prev) => (prev === title ? null : title));
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
  };

  return (
    <Box>
      <StyledDrawer variant="permanent" open={open}>
        <List sx={{ paddingTop: '40px' }}>
          {drawerItems.map((item, index) => {
            const hasChildren = !!item.submenu?.length;
            const isExpanded = openSubmenu === item.title;

            return (
              <Box
                key={index}
                className={`app-drawer ${selectedItem === item.title ? 'selected animate' : ''} ${open ? 'drawerOpen' : 'drawerClosed'}`}
              >
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    onClick={(e) => {
                      if (hasChildren && open) {
                        handleToggleSubmenu(item.title);
                      } else {
                        handleMenuOpen(e, index);
                      }
                      setSelectedItem(item.title);
                    }}
                    component={Link}
                    to={item.path ?? '#'}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {selectedItem === item.title ? item.darkIcon : item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                    {hasChildren && open && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </ListItem>

                {hasChildren && open && (
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.submenu!.map((child, i) => (
                        <ListItemButton
                          key={i}
                          component={Link}
                          to={child.path ?? '#'}
                          sx={{
                            pl: open ? 8 : 4,
                            justifyContent: open ? 'initial' : 'center',
                          }}
                          // onClick={() => navigate(child.path)} // Add navigation logic
                        >
                          <ListItemText primary={child.title} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>
        <Divider />
        <List>
          <ListItemButton
            onClick={() => handleDrawerClose()}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                padding: '8px',
              }}
            >
              <DrawerTiltTool />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </StyledDrawer>
      {menuIndex !== null && drawerItems[menuIndex].submenu && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: '#F9FCFF',
              color: '#28367A',
              width: '250px',
              borderRadius: 2,
              boxShadow: 3,
              ml: 1,
            },
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {menuIndex !== null &&
            drawerItems[menuIndex]?.submenu?.map((sub, subIndex) => (
              <MenuItem
                key={subIndex}
                onClick={() => {
                  handleMenuClose();
                }}
                component={Link}
                to={sub.path ?? '#'}
                sx={{ fontWeight: 'bold' }}
              >
                {sub.title}
              </MenuItem>
            ))}
        </Menu>
      )}
    </Box>
  );
}
