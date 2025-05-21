
'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Platform, PostType, ContentInput, GeneratedContentWithMetadata, LinkedInPostType, InstagramPostType } from './types';
import { PLATFORM_CONFIGS } from './constants';

// Import the service directly since it doesn't need SSR
import { generateSocialPost } from './services/geminiService';

// Components
import Header from './components/Header';
import ContentInputForm from './components/ContentInputForm';
import GeneratedPostDisplay from './components/GeneratedPostDisplay';
import PostPreviewCard from './components/PostPreviewCard';
import ConnectAccountsModal from './components/ConnectAccountsModal';
import AnimatedBackgroundSwitcher from './components/backgrounds/AnimatedBackgroundSwitcher';

// Loading component for suspense fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const App: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<Platform>(Platform.LinkedIn);
  const [contentInput, setContentInput] = useState<ContentInput>({
    mainIdea: '',
    userWritingSample: '',
    influencerStyles: '',
    sourceUrl: '',
    postType: null,
  });
  const [generatedPost, setGeneratedPost] = useState<GeneratedContentWithMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);

  const activePlatformConfig = PLATFORM_CONFIGS[activePlatform];
  const isDarkMode = activePlatformConfig.theme === 'dark';

  useEffect(() => {
    if (contentInput.postType && !activePlatformConfig.postTypes.includes(contentInput.postType)) {
      setContentInput(prev => ({ ...prev, postType: activePlatformConfig.postTypes[0] || null }));
    } else if (!contentInput.postType && activePlatformConfig.postTypes.length > 0) {
       setContentInput(prev => ({ ...prev, postType: activePlatformConfig.postTypes[0] }));
    }
  }, [activePlatform, activePlatformConfig.postTypes, contentInput.postType]);
  
  const handlePlatformChange = useCallback((platform: Platform) => {
    setActivePlatform(platform);
    setGeneratedPost(null); 
    setError(null);
  }, []);

  const handleContentInputChange = useCallback((field: keyof ContentInput, value: string | PostType | null) => {
    setContentInput(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async () => {
    if (!contentInput.mainIdea || !contentInput.postType) {
      setError("Please provide a main idea and select a post type.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPost(null);
    try {
      const result = await generateSocialPost(activePlatform, contentInput);
      
      let finalResult = result;
      // Add placeholder image for relevant post types
      if ( (activePlatform === Platform.LinkedIn && contentInput.postType === LinkedInPostType.Image) ||
           (activePlatform === Platform.Instagram && contentInput.postType === InstagramPostType.Post) ) {
            finalResult = { ...result, imagePlaceholderUrl: `https://picsum.photos/seed/${Date.now()}/1080/1080` }; // Square for IG
      } else if (activePlatform === Platform.LinkedIn && contentInput.postType === LinkedInPostType.Image) {
            finalResult = { ...result, imagePlaceholderUrl: `https://picsum.photos/seed/${Date.now()}/1200/628` }; // LI image
      }
      setGeneratedPost(finalResult);

    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
      console.error("Generation failed:", e);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Change body background color based on theme for a more immersive effect
    document.body.style.backgroundColor = isDarkMode ? '#111827' : '#F3F4F6'; // Tailwind gray-900 and gray-100
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <AnimatedBackgroundSwitcher activePlatform={activePlatform} />
      <div className="content-wrapper flex flex-col flex-grow">
        <Header
          activePlatform={activePlatform}
          onPlatformChange={handlePlatformChange}
          onConnectAccountsClick={() => setIsConnectModalOpen(true)}
          isDarkMode={isDarkMode}
        />
        <main className="container mx-auto p-4 sm:p-8 flex-grow">
          {error && (
             <div className={`mb-6 p-4 rounded-xl shadow-lg ${isDarkMode ? 'bg-red-700/80 backdrop-blur-sm border border-red-600/70 text-red-100' : 'bg-red-100/80 backdrop-blur-sm border border-red-300/70 text-red-700'}`} role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <ContentInputForm
              activePlatformConfig={activePlatformConfig}
              contentInput={contentInput}
              onContentInputChange={handleContentInputChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              selectedPostType={contentInput.postType}
              isDarkMode={isDarkMode}
            />
            <div className="flex flex-col gap-8">
              <GeneratedPostDisplay
                generatedPost={generatedPost}
                isLoading={isLoading}
                isDarkMode={isDarkMode}
              />
              {generatedPost && !isLoading && (
                <PostPreviewCard
                  generatedPost={generatedPost}
                  activePlatform={activePlatform}
                  isDarkMode={isDarkMode}
                />
              )}
            </div>
          </div>
        </main>
        <footer 
          className={`py-6 text-center text-sm transition-colors duration-500 
                      ${isDarkMode ? 'bg-neutral-900/70 text-neutral-300 backdrop-blur-sm' : 'bg-white/70 text-gray-700 backdrop-blur-sm'}`}
        >
          <p>&copy; {new Date().getFullYear()} Agentic Social AI. Elevate Your Online Presence.</p>
          {process.env.API_KEY ? null : <p className="text-yellow-400 dark:text-yellow-500 text-xs mt-1">Warning: Gemini API Key not configured.</p>}
        </footer>
      </div>
      <ConnectAccountsModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default App;