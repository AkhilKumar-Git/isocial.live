import { useEffect } from 'react';
import { useRouter } from 'next/router';
import App from '../App';

export default function AppPage() {
  const router = useRouter();
  
  // You can add authentication checks here if needed
  
  return <App />;
}
