import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ReportsProvider } from './context/ReportsContext';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <ReportsProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ReportsProvider>
  );
}
