'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface CustomSession {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    username?: string;
  }
}

export function UserIdSetter() {
  const { data: session } = useSession() as { data: CustomSession | null };

  useEffect(() => {
    const storeUserData = async () => {
      if (session?.user?.id && session?.user?.email) {
        // Store userId
        localStorage.setItem('userId', session.user.id);

        try {
          // Generate and store JWT token
          const response = await fetch('/api/auth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: session.user.id,
              email: session.user.email,
              username: session.user.username,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to generate token');
          }

          const { token } = await response.json();
          localStorage.setItem('token', `Bearer ${token}`);
        } catch (error) {
          console.error('Error storing token:', error);
        }
      }
    };

    storeUserData();
  }, [session]);

  return null;
} 