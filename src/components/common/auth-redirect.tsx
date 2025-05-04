'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './loading';

interface AuthRedirectProps {
  redirectTo: string;
  delay?: number;
}

export const AuthRedirect = ({ redirectTo, delay = 1500 }: AuthRedirectProps) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(redirectTo);
    }, delay);

    return () => clearTimeout(timer);
  }, [router, redirectTo, delay]);

  return <Loading />;
};

export default AuthRedirect; 