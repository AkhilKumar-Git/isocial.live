import React from 'react';
import { Platform, LinkedInPostType, XPostType, InstagramPostType, PlatformConfig } from '../types';

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.772 13.019H3.565V9h3.544v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
  </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.172.053 1.803.248 2.228.434.446.193.793.434 1.188.83A4.902 4.902 0 0121.434 5.25c.4.39.64.74.83 1.188.187.426.38.056.434 2.228.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.053 1.172-.248 1.803-.434 2.228a4.902 4.902 0 01-.83 1.188c-.39.4-.74.64-1.188.83-.426.187-.056.38-2.228.434-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.172-.053-1.803-.248-2.228-.434a4.902 4.902 0 01-1.188-.83 4.902 4.902 0 01-.83-1.188c-.187-.426-.38-.056-.434-2.228C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.053-1.172.248-1.803.434-2.228.193-.446.434-.793.83-1.188A4.902 4.902 0 015.25 2.566c.39-.4.74-.64 1.188-.83.426-.187.056.38 2.228.434.058-1.266.07-1.646.07-4.85M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98C23.986 15.667 24 15.259 24 12s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
  </svg>
);

export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
  [Platform.LinkedIn]: {
    name: Platform.LinkedIn,
    icon: <LinkedInIcon />,
    logoColor: '#0077B5', // LinkedIn Blue - used for inactive switch text/icon
    switchAccentColor: 'bg-blue-600', // Tailwind class for the switch active state background
    textColor: 'text-white', // Tailwind class for text on switchAccentColor
    accentColor: 'border-blue-500',
    postTypes: Object.values(LinkedInPostType),
    theme: 'light',
  },
  [Platform.X]: {
    name: Platform.X,
    icon: <XIcon />,
    logoColor: '#FFFFFF', // White for inactive switch text/icon, as X background is dark
    switchAccentColor: 'bg-black', // Tailwind class for the switch active state background
    textColor: 'text-white', // Tailwind class for text on switchAccentColor (black background)
    accentColor: 'border-gray-500',
    postTypes: Object.values(XPostType),
    theme: 'dark',
  },
  [Platform.Instagram]: {
    name: Platform.Instagram,
    icon: <InstagramIcon />,
    logoColor: '#E1306C', // Instagram Pink
    switchAccentColor: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500', // Tailwind classes
    textColor: 'text-white',
    accentColor: 'border-pink-500',
    postTypes: Object.values(InstagramPostType),
    theme: 'light',
  },
};

export const GEMINI_TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';
export const GEMINI_IMAGE_CAPTION_MODEL = 'gemini-2.5-flash-preview-04-17';

export const APP_TITLE = "Agentic Social AI";
export const USER_PROFILE = {
  name: "Your Name",
  handle: "@yourhandle",
  avatarUrl: "https://via.placeholder.com/150/0077B5/FFFFFF?Text=U", // Placeholder
};
