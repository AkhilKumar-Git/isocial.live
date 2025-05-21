import React from 'react';
import { GeneratedContentWithMetadata, Platform, GroundingChunk } from '../types';
import { PLATFORM_CONFIGS } from '../constants';

interface GeneratedPostDisplayProps {
  generatedPost: GeneratedContentWithMetadata | null;
  isLoading: boolean;
  isDarkMode: boolean;
}

const GeneratedPostDisplay: React.FC<GeneratedPostDisplayProps> = ({ generatedPost, isLoading, isDarkMode }) => {
  const glassEffectClasses = isDarkMode 
    ? 'bg-neutral-900/60 backdrop-blur-lg border border-neutral-700/50 text-neutral-100' 
    : 'bg-white/60 backdrop-blur-lg border border-white/40 text-gray-800';
  
  const proseBg = isDarkMode ? 'bg-neutral-800/60 text-neutral-200' : 'bg-gray-50/60 text-gray-700';
  const proseBorder = isDarkMode ? 'border-neutral-700/70' : 'border-gray-300/70';
  const subtleTextColor = isDarkMode ? 'text-neutral-400' : 'text-gray-500';
  const linkColor = isDarkMode ? 'text-sky-400 hover:underline' : 'text-indigo-600 hover:underline';

  if (isLoading) {
    return (
      <div className={`p-6 shadow-2xl rounded-xl flex flex-col items-center justify-center min-h-[300px] ${glassEffectClasses}`}>
        <svg className={`animate-spin h-12 w-12 mb-4 ${isDarkMode ? 'text-sky-400' : 'text-indigo-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className={`text-lg ${isDarkMode ? 'text-neutral-200' : 'text-gray-600'}`}>Crafting your masterpiece...</p>
        <p className={`text-sm ${subtleTextColor}`}>Please wait while the AI generates your content.</p>
      </div>
    );
  }

  if (!generatedPost) {
    return (
      <div className={`p-6 shadow-2xl rounded-xl flex flex-col items-center justify-center min-h-[300px] ${glassEffectClasses}`}>
        <div className={`${isDarkMode ? 'text-neutral-600' : 'text-gray-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className={`${subtleTextColor} text-center`}>Your generated post will appear here.</p>
        <p className={`text-sm ${isDarkMode ? 'text-neutral-500' : 'text-gray-500'} text-center`}>Fill in the details and click "Generate Post".</p>
      </div>
    );
  }

  const platformConfig = PLATFORM_CONFIGS[generatedPost.platform];

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost.content)
      .then(() => alert('Post content copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  };

  const handlePostNow = () => {
    alert(`"Post to ${generatedPost.platform}" functionality is coming soon! For now, please copy the content and post manually.`);
  };

  const renderContent = () => {
    if (generatedPost.platform === Platform.X && generatedPost.postType === 'Thread') {
      const tweets = generatedPost.content.split(/(\d+\/\d+\s*-?|\d\.\s|\-\-\-\s*TWEET BREAK\s*\-\-\-)/i).filter(s => s && s.trim() !== '-').map(s => s.trim());
      let tweetParts: string[] = [];
      let currentTweet = "";

      for (let i = 0; i < tweets.length; i++) {
        const part = tweets[i];
        if (/(\d+\/\d+\s*-?|\d\.\s|\-\-\-\s*TWEET BREAK\s*\-\-\-)/i.test(part)) {
          if (currentTweet.trim()) {
            tweetParts.push(currentTweet.trim());
          }
          currentTweet = part + " "; 
        } else {
          currentTweet += part + " ";
        }
      }
      if (currentTweet.trim()) tweetParts.push(currentTweet.trim());
      
      if (tweetParts.length <= 1 && generatedPost.content.includes('\n\n')) {
        tweetParts = generatedPost.content.split(/\n\n+/).map(t => t.trim()).filter(Boolean);
      } else if (tweetParts.length === 0 && generatedPost.content) {
        tweetParts.push(generatedPost.content);
      }

      if (tweetParts.length > 1) {
        return tweetParts.map((tweet, index) => (
          <div key={index} className={`p-3 mb-3 border ${proseBorder} rounded-md ${isDarkMode ? 'bg-neutral-800/50' : 'bg-white/50'}`}>
            <p className={`text-sm font-semibold mb-1 ${subtleTextColor}`}>Tweet {index + 1}</p>
            <p className={`whitespace-pre-wrap ${isDarkMode ? 'text-neutral-100': 'text-gray-800'}`}>{tweet}</p>
          </div>
        ));
      }
    }
    return <p className={`whitespace-pre-wrap ${isDarkMode ? 'text-neutral-100': 'text-gray-800'}`}>{generatedPost.content}</p>;
  };

  return (
    <div className={`p-6 shadow-2xl rounded-xl ${glassEffectClasses}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Generated {platformConfig.name} {generatedPost.postType}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={handleCopyToClipboard}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                        ${isDarkMode ? 'text-sky-300 hover:text-sky-200 border border-sky-500/70 hover:bg-sky-500/30' 
                                    : 'text-indigo-600 hover:text-indigo-800 border border-indigo-600/70 hover:bg-indigo-500/20'}`}
            title="Copy to Clipboard"
          >
            Copy
          </button>
          <button
            onClick={handlePostNow}
            className={`px-3 py-1.5 text-sm font-medium text-white rounded-md transition-colors
                        ${isDarkMode ? 'bg-sky-600 hover:bg-sky-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            Post to {platformConfig.name} (Mock)
          </button>
        </div>
      </div>

      {generatedPost.imagePlaceholderUrl && (
        <div className="mb-4">
          <img src={generatedPost.imagePlaceholderUrl} alt="Generated visual placeholder" className="rounded-md w-full h-auto max-h-64 object-cover" />
          <p className={`text-xs mt-1 ${subtleTextColor}`}>Placeholder for image-based post.</p>
        </div>
      )}

      <div className={`prose prose-sm max-w-none p-4 border ${proseBorder} rounded-md ${proseBg} min-h-[150px]`}>
        {renderContent()}
      </div>

      {generatedPost.groundingMetadata && generatedPost.groundingMetadata.groundingChunks && generatedPost.groundingMetadata.groundingChunks.length > 0 && (
        <div className={`mt-6 pt-4 border-t ${proseBorder}`}>
          <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-neutral-300' : 'text-gray-700'}`}>Information Sources (Google Search):</h4>
          <ul className="list-disc list-inside space-y-1">
            {generatedPost.groundingMetadata.groundingChunks.map((chunk: GroundingChunk, index: number) => (
              chunk.web && (
                <li key={index} className="text-xs">
                  <a href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className={linkColor}>
                    {chunk.web.title || chunk.web.uri}
                  </a>
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GeneratedPostDisplay;
