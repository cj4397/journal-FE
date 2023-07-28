'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from './auth';


export default function Home() {
  const route = useRouter();
  const { user } = useAuth()

  if (user !== null) {
    return route.push('/dashboard')
  }

  return route.push('/login')
}
