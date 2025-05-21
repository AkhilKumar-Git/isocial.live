import React from 'react';
import { PostType, ContentInput, PlatformConfig } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface ContentInputFormProps {
  activePlatformConfig: PlatformConfig;
  contentInput: ContentInput;
  onContentInputChange: (field: keyof ContentInput, value: string | PostType | null) => void;
  onSubmit: () => void;
  isLoading: boolean;
  selectedPostType: PostType | null;
  isDarkMode: boolean;
}

const TextAreaField: React.FC<{
  id: keyof ContentInput;
  label: string;
  value: string;
  placeholder: string;
  rows?: number;
  onChange: (value: string) => void;
  isDarkMode: boolean;
}> = ({ id, label, value, placeholder, rows = 3, onChange, isDarkMode }) => (
  <div>
    <label htmlFor={id} className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-neutral-200' : 'text-gray-700'}`}>
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      rows={rows}
      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-sky-400 dark:focus:border-sky-400 block w-full sm:text-sm rounded-md p-2.5
                  ${isDarkMode ? 'bg-neutral-800/70 border-neutral-600/80 text-white placeholder-neutral-400' 
                                : 'bg-white/70 border-gray-300/80 text-gray-900 placeholder-gray-500'}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const ContentInputForm: React.FC<ContentInputFormProps> = ({
  activePlatformConfig,
  contentInput,
  onContentInputChange,
  onSubmit,
  isLoading,
  selectedPostType,
  isDarkMode,
}) => {
  
  const handlePostTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as PostType;
    onContentInputChange('postType', value);
  };

  const glassEffectClasses = isDarkMode 
    ? 'bg-neutral-900/60 backdrop-blur-lg border border-neutral-700/50 text-neutral-100' 
    : 'bg-white/60 backdrop-blur-lg border border-white/40 text-gray-800';

  return (
    <div className={`p-6 shadow-2xl rounded-xl space-y-6 ${glassEffectClasses}`}>
      <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create for {activePlatformConfig.name}</h2>
      
      <TextAreaField
        id="mainIdea"
        label="What's on your mind? (Your core message or topic)"
        value={contentInput.mainIdea}
        placeholder={`e.g., Excited to share insights on the future of AI in marketing...`}
        rows={4}
        onChange={(val) => onContentInputChange('mainIdea', val)}
        isDarkMode={isDarkMode}
      />

      <TextAreaField
        id="userWritingSample"
        label="Your authentic writing style (Optional - paste a sample)"
        value={contentInput.userWritingSample}
        placeholder="e.g., A short paragraph you've written before that reflects your tone."
        onChange={(val) => onContentInputChange('userWritingSample', val)}
        isDarkMode={isDarkMode}
      />

      <TextAreaField
        id="influencerStyles"
        label="Influencer styles to inspire (Optional - paste samples or describe)"
        value={contentInput.influencerStyles}
        placeholder="e.g., 'Mix Gary Vaynerchuk's energy with Brené Brown's vulnerability.'"
        onChange={(val) => onContentInputChange('influencerStyles', val)}
        isDarkMode={isDarkMode}
      />

      <div>
        <label htmlFor="sourceUrl" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-neutral-200' : 'text-gray-700'}`}>
          Link to Article/Video for context (Optional)
        </label>
        <input
          type="url"
          id="sourceUrl"
          name="sourceUrl"
          className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-sky-400 dark:focus:border-sky-400 block w-full sm:text-sm rounded-md p-2.5
                      ${isDarkMode ? 'bg-neutral-800/70 border-neutral-600/80 text-white placeholder-neutral-400' 
                                    : 'bg-white/70 border-gray-300/80 text-gray-900 placeholder-gray-500'}`}
          placeholder="https://example.com/article or https://youtube.com/watch?v=..."
          value={contentInput.sourceUrl}
          onChange={(e) => onContentInputChange('sourceUrl', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="postType" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-neutral-200' : 'text-gray-700'}`}>
          Select Post Type for {activePlatformConfig.name}
        </label>
        <select
          id="postType"
          name="postType"
          className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-sky-400 dark:focus:border-sky-400 block w-full sm:text-sm rounded-md p-2.5
                      ${isDarkMode ? 'bg-neutral-800/70 border-neutral-600/80 text-white placeholder-neutral-400' 
                                    : 'bg-white/70 border-gray-300/80 text-gray-900 placeholder-gray-500'}`}
          value={selectedPostType || ''}
          onChange={handlePostTypeChange}
        >
          <option value="" disabled>-- Select a post type --</option>
          {activePlatformConfig.postTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading || !contentInput.mainIdea || !selectedPostType}
        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 
                    transition-opacity duration-150
                    ${isDarkMode ? 'bg-sky-500 hover:bg-sky-600 focus:ring-sky-400 disabled:bg-neutral-600/70 disabled:opacity-70' 
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-gray-400/70 disabled:opacity-70'}
                     disabled:cursor-not-allowed`}
      >
        {isLoading ? <LoadingSpinner size={5}/> : `Generate ${activePlatformConfig.name} Post`}
      </button>
    </div>
  );
};

export default ContentInputForm;
