import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Loading } from './components/loading/loading.tsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './route.tsx';
import 'leaflet/dist/leaflet.css';
import ErrorBoundary from './ErrorBoundary.tsx';
import theme from './Theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ErrorBoundary>
          <Suspense fallback={<Loading text="Loading page..." />}>
            <RouterProvider
              router={router}
              fallbackElement={<Loading text="Loading chunk" />}
              future={{ v7_startTransition: true }}
            />
            <CssBaseline />
          </Suspense>
        </ErrorBoundary>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>,
);
