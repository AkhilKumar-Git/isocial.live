
import React from 'react';
import { motion } from 'framer-motion';
import { Platform, PlatformConfig } from '../types';
import { PLATFORM_CONFIGS } from '../constants';

interface PlatformSwitchProps {
  activePlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
}

const PlatformSwitch: React.FC<PlatformSwitchProps> = ({ activePlatform, onPlatformChange }) => {
  const platformKeys = Object.keys(PLATFORM_CONFIGS) as Platform[];

  return (
    <div className="flex p-1 bg-gray-200 dark:bg-neutral-700 rounded-full shadow-inner">
      {platformKeys.map((platformKey) => {
        const config = PLATFORM_CONFIGS[platformKey];
        const isActive = activePlatform === platformKey;
        
        let buttonStyle = {};
        let buttonClasses = `relative flex-1 px-3 py-2.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-full focus:outline-none transition-colors duration-300 `;

        if (isActive) {
          buttonClasses += config.textColor; // e.g., text-white
        } else {
          // For inactive buttons, set color directly using logoColor.
          // Provide a fallback general text color for non-X inactive buttons in dark/light mode.
          buttonStyle = { color: config.logoColor };
          if (config.name !== Platform.X) { // X logoColor is already white.
             buttonClasses += `text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200 `;
          } else { // For X inactive (white text), hover might be slightly less opaque or a generic browser focus.
             buttonClasses += `hover:opacity-80 `;
          }
        }

        return (
          <button
            key={config.name}
            onClick={() => onPlatformChange(config.name)}
            className={buttonClasses.trim()}
            style={buttonStyle}
            aria-pressed={isActive}
            aria-label={`Switch to ${config.name} mode`}
          >
            <span className="relative z-10 flex items-center justify-center space-x-1 sm:space-x-2">
              {React.cloneElement(config.icon, { 
                // Icon color will be 'currentColor', inheriting from the button's text color
                className: `w-4 h-4 sm:w-5 sm:h-5` 
              })}
              <span className="hidden sm:inline">{config.name}</span>
            </span>
            {isActive && (
              <motion.div
                layoutId="platform-switch-highlighter"
                className={`absolute inset-0 rounded-full shadow-md ${config.switchAccentColor}`} // Use Tailwind class for background
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default PlatformSwitch;