import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import ReportBullying from './pages/ReportBullying';
import CameraRequest from './pages/CameraRequest';
import SOS from './pages/SOS';
import AdminDashboard from './pages/AdminDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/report-bullying',
    Component: ReportBullying,
  },
  {
    path: '/camera-request',
    Component: CameraRequest,
  },
  {
    path: '/sos',
    Component: SOS,
  },
  {
    path: '/admin',
    Component: AdminDashboard,
  },
]);
