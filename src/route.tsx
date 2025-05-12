import { createBrowserRouter, RouteObject } from 'react-router-dom';
// import App from './App';
import { lazy } from 'react';
// import PrivateLayout from './layouts/PrivateLayout';
// import PublicLayout from './layouts/PublicLayout';
// import Login from './pages/login/Login';
// import { Signup } from './pages/signup/Signup';
// import { Dashboard } from './pages/dashboard/Dashboard';

// import type { ComponentType } from 'react';
const PrivateLayout = lazy(() => import('./layouts/PrivateLayout'));
const PublicLayout = lazy(() => import('./layouts/PublicLayout'));
const Login = lazy(() => import('./pages/login/Login'));
const Signup = lazy(() => import('./pages/signup/Signup'));
const SystemManagment = lazy(() => import('./pages/system/SystemManagement'));
const ForgotPassword = lazy(() => import('./pages/forgotpassword/ForgotPassword'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const NotFound = lazy(() => import('../src/pages/notFound/NotFound'));
const GisMaps = lazy(() => import('../src/pages/maps/GisMaps'));
const Devices = lazy(() => import('../src/pages/devices/Devices'));
const DeviceTopology = lazy(() => import('./pages/device-topology/DeviceTopology'));
const DeviceConfiguration = lazy(() => import('./pages/device-config/DeviceConfiguration'));

// const Dashboard = lazy(
//   () =>
//     new Promise<{ default: ComponentType<unknown> }>((resolve) => {
//       setTimeout(() => {
//         import('./pages/dashboard/Dashboard').then((module) => {
//           resolve({ default: module.default });
//         });
//       }, 10000); // 10 seconds delay
//     }),
// );

const routes: RouteObject[] = [
  {
    element: <PrivateLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/maps',
        element: <GisMaps />,
      },
      {
        path: '/devices',
        element: <Devices />,
      },
      {
        path: '/device-topology',
        element: <DeviceTopology />,
      },
      {
        path: '/device-config',
        element: <DeviceConfiguration />,
      },
      {
        path: '/systemmanagment',
        element: <SystemManagment />,
      },
    ],
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/forgotpassword',
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes, { future: { v7_relativeSplatPath: true } });
