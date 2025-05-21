import React from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Head from 'next/head';

// Error boundary for the app
class AppErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
            <p className="text-gray-700 mb-6">
              Something went wrong in the application. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading component
const AppLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading application...</p>
    </div>
  </div>
);

// Dynamically import the App component with SSR disabled
const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => <AppLoading />
});

export default function AppPage() {
  return (
    <>
      <Head>
        <title>Agentic Social AI</title>
        <meta name="description" content="Agentic Social AI - Create and manage your social media content" />
      </Head>
      <AppErrorBoundary>
        <Suspense fallback={<AppLoading />}>
          <App />
        </Suspense>
      </AppErrorBoundary>
    </>
  );
}
