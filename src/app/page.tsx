'use client';

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { Platform, PostType, ContentInput, GeneratedContentWithMetadata, LinkedInPostType, InstagramPostType } from '@/types';
import { PLATFORM_CONFIGS } from '@/constants';
import { generateSocialPost } from '@/services/geminiService';

// Components
import dynamic from 'next/dynamic';

// Dynamically import components with no SSR
const Header = dynamic(() => import('../components/Header'), { ssr: false });
const ContentInputForm = dynamic(() => import('../components/ContentInputForm'), { ssr: false });
const GeneratedPostDisplay = dynamic(() => import('../components/GeneratedPostDisplay'), { ssr: false });
const PostPreviewCard = dynamic(() => import('../components/PostPreviewCardV2'), { ssr: false });
const ConnectAccountsModal = dynamic(() => import('../components/ConnectAccountsModal'), { ssr: false });
const AnimatedBackgroundSwitcher = dynamic(
  () => import('../components/backgrounds/AnimatedBackgroundSwitcher'),
  { ssr: false }
);

export default function App() {
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
    if (contentInput.postType && !activePlatformConfig.postTypes.includes(contentInput.postType as any)) {
      setContentInput((prev: ContentInput) => ({ ...prev, postType: activePlatformConfig.postTypes[0] || null }));
    } else if (!contentInput.postType && activePlatformConfig.postTypes.length > 0) {
      setContentInput((prev: ContentInput) => ({ ...prev, postType: activePlatformConfig.postTypes[0] }));
    }
  }, [activePlatform, activePlatformConfig.postTypes, contentInput.postType]);
  
  const handlePlatformChange = useCallback((platform: Platform) => {
    setActivePlatform(platform);
    setGeneratedPost(null); 
    setError(null);
  }, []);

  const handleContentInputChange = useCallback((field: keyof ContentInput, value: string | PostType | null) => {
    setContentInput((prev: ContentInput) => ({ ...prev, [field]: value }));
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
      if ((activePlatform === Platform.LinkedIn && contentInput.postType === LinkedInPostType.Image) ||
          (activePlatform === Platform.Instagram && contentInput.postType === InstagramPostType.Post)) {
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
    document.body.style.backgroundColor = isDarkMode ? '#111827' : '#F3F4F6';
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <Head>
        <title>Agentic Social AI</title>
        <meta name="description" content="AI-powered social media content creation" />
      </Head>
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
                  platform={activePlatform}
                  content={generatedPost.content}
                  authorName="John Doe"
                  authorHandle="johndoe"
                  authorImage="/default-avatar.png"
                  postImage={generatedPost.imagePlaceholderUrl}
                  likes={42}
                  comments={7}
                  reposts={3}
                  timestamp="2h"
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
          {process.env.NEXT_PUBLIC_GEMINI_API_KEY ? null : <p className="text-yellow-400 dark:text-yellow-500 text-xs mt-1">Warning: Gemini API Key not configured.</p>}
        </footer>
      </div>
      <ConnectAccountsModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
