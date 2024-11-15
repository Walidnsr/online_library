// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import MainLayout from '../components/MainLayout';
import AdminLayout from '../components/AdminLayout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Determine if the current page is part of the admin section
  const isAdminRoute = router.pathname.startsWith('/admin');

  return (
    <>
      {isAdminRoute ? (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}
    </>
  );
}

export default MyApp;
