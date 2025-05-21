import React from 'react';
import { Platform } from '../types';
import { APP_TITLE }  from '../constants';
import PlatformSwitch from './PlatformSwitch'; // New component

interface HeaderProps {
  activePlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
  onConnectAccountsClick: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ activePlatform, onPlatformChange, onConnectAccountsClick, isDarkMode }) => {
  return (
    <header className={`p-4 shadow-md sticky top-0 z-20 ${isDarkMode ? 'bg-neutral-800/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'}`}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {APP_TITLE}
        </h1>
        <div className="flex-grow sm:flex-grow-0 sm:mx-auto">
          <PlatformSwitch
            activePlatform={activePlatform}
            onPlatformChange={onPlatformChange}
          />
        </div>
        <button
          onClick={onConnectAccountsClick}
          className={`font-semibold py-2 px-4 rounded-lg transition-colors duration-150
                      ${isDarkMode ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
        >
          Connect Accounts
        </button>
      </div>
    </header>
  );
};

export default Header;