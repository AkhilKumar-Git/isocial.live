import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to your main app or authentication page
    router.push('/app');
  }, [router]);

  return null; // Or a loading spinner
}
