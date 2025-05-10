"use client"
import Loading from '@/components/common/loading';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

const RedirectPage = () => {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleTokenGeneration = async () => {
      // Check if we already have the token and userId
      const existingToken = localStorage.getItem('token');
      const existingUserId = localStorage.getItem('userId');
      
      if (existingToken && existingUserId) {
        router.push('/dashboard');
        return;
      }

      // If not authenticated, redirect to signin
      if (status === "unauthenticated") {
        router.push('/signin');
        return;
      }

      // If authenticated and we have user data, generate token
      if (status === "authenticated" && data?.user) {
        try {
          const response = await fetch('/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: data.user.email,
              username: data.user.name,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to generate token');
          }

          const { token, id } = await response.json();
          
          if (token && id) {
            localStorage.setItem('token', `Bearer ${token}`);
            localStorage.setItem('userId', id.toString());
            router.push('/dashboard');
          } else {
            throw new Error('Invalid token response');
          }
        } catch (error) {
          console.error('Error generating token:', error);
          router.push('/signin');
        }
      }
    };

    handleTokenGeneration();
  }, [status, data, router]);

  if (status === "loading") {
    return <Loading />;
  }

  return <Loading />;
}

export default RedirectPage;