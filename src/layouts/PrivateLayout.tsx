import { Suspense, useState } from 'react';
import { Box, Toolbar } from '@mui/material';
// import AppDrawer from '../components/header/Drawer';
import Header from '../components/header/Header';
import { Loading } from '../components/loading/loading';
import MiniDrawer from '../components/header/DrawerNew';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
// import AppFooter from '../components/footer/Footer';

const headerHeight = 64;

function PrivateLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  if (sessionStorage.getItem('username') === null) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
        }}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box
        sx={{
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Header />
      </Box>
      <Toolbar sx={{ minHeight: headerHeight }} />

      <Box sx={{ display: 'flex', flexGrow: 1, height: '100%' }}>
        <Box
          sx={{
            flexShrink: 0,
          }}
        >
          {/* <AppDrawer /> */}
          <MiniDrawer open={open} setOpen={setOpen} />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: 'auto',
            height: `calc(100vh - ${headerHeight}px)`,
            backgroundColor: '#F2F6FF',
          }}
        >
          <Suspense fallback={<Loading text="Loading..." />}>
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </Suspense>
        </Box>
      </Box>
      {/* <Box
        sx={{
          height: '30px',
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          // zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#fff',
          borderTop: '1px solid #ddd',
        }}
      >
        <AppFooter />
      </Box> */}
    </Box>
  );
}

export default PrivateLayout;
