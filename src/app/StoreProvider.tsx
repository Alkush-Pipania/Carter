'use client';

import React, { useEffect, useState } from 'react';
import { store } from '../store/store';
import { Provider } from 'react-redux';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <Provider store={store}>{children}</Provider>;
}
