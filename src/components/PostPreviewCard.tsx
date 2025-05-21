import React from 'react';
import { GeneratedContentWithMetadata, Platform, XPostType, LinkedInPostType, InstagramPostType } from '../types';
import { PLATFORM_CONFIGS, USER_PROFILE } from '../constants';

interface PostPreviewCardProps {
  generatedPost: GeneratedContentWithMetadata;
  activePlatform: Platform;
  isDarkMode: boolean;
}

const ActionIcon: React.FC<{ path: string; label: string; className?: string }> = ({ path, label, className }) => (
  <button className={`flex items-center space-x-1 text-xs hover:opacity-75 transition-opacity ${className}`}>
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d={path} clipRule="evenodd"></path></svg>
    <span>{label}</span>
  </button>
);

const PostPreviewCard: React.FC<PostPreviewCardProps> = ({ generatedPost, activePlatform, isDarkMode }) => {
  const platformConfig = PLATFORM_CONFIGS[activePlatform];
  const glassEffectClasses = isDarkMode 
    ? 'bg-neutral-900/60 backdrop-blur-lg border border-neutral-700/50 text-neutral-100' 
    : 'bg-white/60 backdrop-blur-lg border border-white/40 text-gray-800';

  const renderLinkedInPreview = () => {
    const isImagePost = generatedPost.postType === LinkedInPostType.Image;
    return (
      <div className={`border rounded-lg overflow-hidden ${isDarkMode ? 'border-neutral-700 bg-neutral-800/80' : 'border-gray-300 bg-white'}`}>
        <div className="p-4">
          <div className="flex items-center mb-3">
            <img src={USER_PROFILE.avatarUrl} alt="User Avatar" className="w-12 h-12 rounded-full mr-3 border border-gray-300 dark:border-neutral-600" />
            <div>
              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>{USER_PROFILE.name}</p>
              <p className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-gray-500'}`}>Promoted</p> {/* Mock detail */}
            </div>
          </div>
          <p className={`whitespace-pre-wrap text-sm mb-3 ${isDarkMode ? 'text-neutral-200' : 'text-gray-700'}`}>{generatedPost.content}</p>
          {isImagePost && generatedPost.imagePlaceholderUrl && (
            <img src={generatedPost.imagePlaceholderUrl} alt="Post visual" className="rounded-md w-full object-cover max-h-72 mb-3" />
          )}
        </div>
        <div className={`px-4 py-2 border-t ${isDarkMode ? 'border-neutral-700 text-neutral-400' : 'border-gray-200 text-gray-500'} flex justify-around`}>
          <ActionIcon path="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" label="Like" />
          <ActionIcon path="M8 12h.01M12 12h.01M16 12h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z" label="Comment" />
          <ActionIcon path="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" label="Share" />
        </div>
      </div>
    );
  };

  const renderXPreview = () => {
    const tweets = generatedPost.postType === XPostType.Thread 
      ? generatedPost.content.split(/(\d+\/\d+\s*-?|\d\.\s|\-\-\-\s*TWEET BREAK\s*\-\-\-)/i).filter(s => s && s.trim() !== '-').map(s => s.trim())
      : [generatedPost.content];
    
    let displayTweets = tweets;
    if (tweets.length > 1 && generatedPost.content.includes('\n\n')) {
        displayTweets = generatedPost.content.split(/\n\n+/).map(t => t.trim()).filter(Boolean);
    } else if (tweets.length === 0 && generatedPost.content) {
        displayTweets = [generatedPost.content];
    }
    
    return (
      <div className={`border rounded-xl p-4 ${isDarkMode ? 'border-neutral-700 bg-neutral-800/90' : 'border-gray-700 bg-black'}`}>
        <div className="flex items-start mb-2">
          <img src={USER_PROFILE.avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-sm text-white">{USER_PROFILE.name}</p>
              <p className="text-xs text-gray-500">{USER_PROFILE.handle}</p>
              <p className="text-xs text-gray-500">· 1m</p>
            </div>
            <p className="text-white whitespace-pre-wrap text-sm">{displayTweets[0] || generatedPost.content}</p>
            {displayTweets.length > 1 && <p className="text-sky-400 text-xs mt-1">View thread ({displayTweets.length} tweets)</p>}
          </div>
        </div>
        <div className="flex justify-around text-gray-500 mt-3 pt-2 border-t border-gray-700/50">
          <ActionIcon path="M18 10c0 3.866-3.582 7-8 7a8.74 8.74 0 01-4.29-.987L2.935 18.65a1 1 0 00-.927 1.241l1.072 3.003a1 1 0 001.414.73L8 21.021a7.003 7.003 0 006-11.021V7a1 1 0 00-2 0v2.131A5.002 5.002 0 018 4a5 5 0 011.547 9.61L10 14.148V9a1 1 0 10-2 0v6a1 1 0 001 1h1.852A8.004 8.004 0 0018 10z" label="Reply" className="text-gray-500" />
          <ActionIcon path="M14.752 4.055a.75.75 0 00-1.06 0l-6.5 6.5a.75.75 0 001.06 1.06L12 7.869l2.718 2.718a.75.75 0 001.06-1.06l-3.25-3.25a.75.75 0 00-1.06 0zM6.75 11.5a.75.75 0 00-1.06 0l-3.25 3.25a.75.75 0 001.06 1.06L6 13.131l2.718 2.718a.75.75 0 001.06-1.06l-3.25-3.25a.75.75 0 00-.782-.028z" label="Retweet" className="text-gray-500" />
          <ActionIcon path="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" label="Like" className="text-gray-500" />
          <ActionIcon path="M12.596 4.596a1.5 1.5 0 00-2.122 0L5 9.03V4.5a1.5 1.5 0 10-3 0v7.5a1.5 1.5 0 001.5 1.5H11a1.5 1.5 0 100-3H7.03l4.464-4.464a1.5 1.5 0 001.092-2.56zm-2.122 9a1.5 1.5 0 002.122 0L17.03 9H21.5a1.5 1.5 0 100-3h-7.5a1.5 1.5 0 00-1.5 1.5V11a1.5 1.5 0 103 0V9.03l-1.464 1.464a1.5 1.5 0 00-1.092 2.56z" label="Share" className="text-gray-500" />
        </div>
      </div>
    );
  };

  const renderInstagramPreview = () => {
    const isMediaPost = generatedPost.postType === InstagramPostType.Post || generatedPost.postType === InstagramPostType.Reel;
    return (
      <div className={`border rounded-lg overflow-hidden ${isDarkMode ? 'border-neutral-700 bg-neutral-800/80' : 'border-gray-300 bg-white'}`}>
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center">
            <img src={USER_PROFILE.avatarUrl} alt="User Avatar" className="w-8 h-8 rounded-full mr-2 border border-gray-300 dark:border-neutral-600" />
            <p className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>{USER_PROFILE.name}</p>
          </div>
          <span className={`${isDarkMode ? 'text-neutral-400' : 'text-gray-500'}`}>•••</span>
        </div>
        {isMediaPost && generatedPost.imagePlaceholderUrl && (
          <img src={generatedPost.imagePlaceholderUrl} alt="Post media" className="w-full aspect-square object-cover" />
        )}
        {generatedPost.postType === InstagramPostType.Story && (
          <div className="w-full aspect-[9/16] bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
             <p className="text-white text-center text-lg whitespace-pre-wrap">{generatedPost.content.substring(0,150)}...</p>
          </div>
        )}
        <div className={`p-3 ${isDarkMode ? 'text-neutral-400' : 'text-gray-500'}`}>
          <div className="flex space-x-4 mb-2">
            <ActionIcon path="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" label="" />
            <ActionIcon path="M18 10c0 3.866-3.582 7-8 7a8.74 8.74 0 01-4.29-.987L2.935 18.65a1 1 0 00-.927 1.241l1.072 3.003a1 1 0 001.414.73L8 21.021a7.003 7.003 0 006-11.021V7a1 1 0 00-2 0v2.131A5.002 5.002 0 018 4a5 5 0 011.547 9.61L10 14.148V9a1 1 0 10-2 0v6a1 1 0 001 1h1.852A8.004 8.004 0 0018 10z" label="" />
            <ActionIcon path="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" label="" />
          </div>
          <p className={`text-xs font-semibold mb-1 ${isDarkMode ? 'text-neutral-300' : 'text-gray-600'}`}>1,234 likes</p>
          <p className={`whitespace-pre-wrap text-sm ${isDarkMode ? 'text-neutral-200' : 'text-gray-700'}`}>
            <span className={`font-semibold mr-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>{USER_PROFILE.name}</span>
            {generatedPost.content}
          </p>
          <p className="text-xs mt-1">View all 42 comments</p>
          <p className="text-xs mt-1 uppercase">1 hour ago</p>
        </div>
      </div>
    );
  };


  return (
    <div className={`p-4 shadow-2xl rounded-xl ${glassEffectClasses}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {platformConfig.name} Post Preview
      </h3>
      {activePlatform === Platform.LinkedIn && renderLinkedInPreview()}
      {activePlatform === Platform.X && renderXPreview()}
      {activePlatform === Platform.Instagram && renderInstagramPreview()}
    </div>
  );
};

export default PostPreviewCard;
