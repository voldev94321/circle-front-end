"use client"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState, ReactNode } from 'react'

interface ReactQueryProviderProps {
    children: ReactNode;
}

function ReactQueryProvider({children}: ReactQueryProviderProps) {
  const [queryClient] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider