

import React, { useState } from 'react';
import Modal from './Modal';
import { PLATFORM_CONFIGS } from '../constants';
import LoadingSpinner from './LoadingSpinner';
import { Platform } from '../types';

interface ConnectAccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

type ConnectionStep = 'idle' | 'connecting' | 'permissions' | 'connected' | 'error';

const ConnectAccountsModal: React.FC<ConnectAccountsModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [step, setStep] = useState<ConnectionStep>('idle');
  const [platformConnecting, setPlatformConnecting] = useState<Platform | null>(null);

  const platformDetails = platformConnecting ? PLATFORM_CONFIGS[platformConnecting] : null;

  const handleConnectClick = (platform: Platform) => {
    setPlatformConnecting(platform);
    setStep('connecting');
    setTimeout(() => setStep('permissions'), 1500); // Simulate API call
  };

  const handleGrantPermissions = () => {
    setStep('connecting'); // Show spinner again briefly
    setTimeout(() => {
      // Simulate success/failure
      if (Math.random() > 0.1) { // 90% success rate for mock
        setStep('connected');
      } else {
        setStep('error');
      }
    }, 1500);
  };

  const resetAndClose = () => {
    setStep('idle');
    setPlatformConnecting(null);
    onClose();
  };
  
  const modalBg = isDarkMode ? 'bg-neutral-800 text-neutral-100' : 'bg-white text-gray-800';
  const buttonPrimaryColor = isDarkMode ? 'bg-sky-600 hover:bg-sky-700' : 'bg-indigo-600 hover:bg-indigo-700';
  const buttonSecondaryColor = isDarkMode ? 'bg-neutral-600 hover:bg-neutral-500' : 'bg-gray-200 hover:bg-gray-300 text-gray-700';


  const renderStepContent = () => {
    if (!platformConnecting || !platformDetails) { // Initial state or after closing a flow
      return (
        <>
          <p className={`mb-6 ${isDarkMode? 'text-neutral-300' : 'text-gray-600'}`}>
            Connect your social media accounts to enable direct posting and more features in the future.
          </p>
          <div className="space-y-3">
            {(Object.keys(PLATFORM_CONFIGS) as Platform[]).map(pKey => {
              const config = PLATFORM_CONFIGS[pKey];
              return (
                <button
                  key={pKey}
                  className="w-full flex items-center justify-center px-4 py-3 mb-3 rounded-lg font-medium text-white transition-opacity duration-150 hover:opacity-90"
                  style={{ backgroundColor: config.logoColor }}
                  onClick={() => handleConnectClick(pKey)}
                >
                  {/* FIX: Remove unnecessary cast as config.icon type is now more specific */}
                  {React.cloneElement(config.icon, { className: "w-5 h-5"})}
                  <span className="ml-2">Connect with {config.name}</span>
                </button>
              );
            })}
          </div>
           <p className={`text-xs mt-6 ${isDarkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
             This is a demonstration of the connection flow.
           </p>
        </>
      );
    }

    switch (step) {
      case 'connecting':
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <LoadingSpinner size={10} />
            <p className={`mt-4 text-lg ${isDarkMode ? 'text-neutral-200': 'text-gray-700'}`}>Connecting to {platformDetails.name}...</p>
          </div>
        );
      case 'permissions':
        return (
          <>
            <div className="flex items-center mb-4">
              {/* FIX: Remove unnecessary cast as platformDetails.icon type is now more specific */}
              {/* FIX: Apply color style to a wrapper span as 'style' is not a direct prop of the icon component type.
                   The icon itself uses 'currentColor' for fill, so it will inherit the color from this span. */}
              <span style={{ color: platformDetails.logoColor }}>
                {React.cloneElement(platformDetails.icon, { className: "w-8 h-8 mr-3"})}
              </span>
              <h3 className="text-lg font-semibold">Authorize Agentic Social AI</h3>
            </div>
            <p className={`mb-4 ${isDarkMode ? 'text-neutral-300' : 'text-gray-600'}`}>
              Agentic Social AI is requesting permission to:
            </p>
            <ul className={`list-disc list-inside space-y-1 mb-6 pl-4 ${isDarkMode ? 'text-neutral-300' : 'text-gray-600'}`}>
              <li>View your profile information</li>
              <li>Post content on your behalf</li>
              <li>View your posts and engagement (future)</li>
            </ul>
            <p className={`text-xs mb-6 ${isDarkMode ? 'text-neutral-400' : 'text-gray-500'}`}>
              You can revoke these permissions at any time in your {platformDetails.name} account settings.
            </p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => { setStep('idle'); setPlatformConnecting(null);}} className={`px-4 py-2 rounded-md ${buttonSecondaryColor}`}>
                Cancel
              </button>
              <button onClick={handleGrantPermissions} className={`px-4 py-2 rounded-md text-white ${buttonPrimaryColor}`}>
                Allow Access
              </button>
            </div>
          </>
        );
      case 'connected':
        return (
          <div className="text-center py-8">
             <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-700 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-green-500 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
             </div>
            <h3 className="text-xl font-semibold mb-2">Successfully Connected!</h3>
            <p className={`${isDarkMode ? 'text-neutral-300' : 'text-gray-600'}`}>Your {platformDetails.name} account has been linked.</p>
            <button onClick={resetAndClose} className={`mt-6 px-6 py-2 rounded-md text-white ${buttonPrimaryColor}`}>
              Done
            </button>
          </div>
        );
      case 'error':
        return (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-700 flex items-center justify-center mb-4">
             <svg className="w-10 h-10 text-red-500 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connection Failed</h3>
            <p className={`${isDarkMode ? 'text-neutral-300' : 'text-gray-600'}`}>
              Something went wrong while connecting to {platformDetails.name}. Please try again.
            </p>
            <div className="flex justify-center space-x-3 mt-6">
              <button onClick={() => {setStep('idle'); setPlatformConnecting(null);}} className={`px-4 py-2 rounded-md ${buttonSecondaryColor}`}>
                Back to Connections
              </button>
              <button onClick={() => handleConnectClick(platformConnecting!)} className={`px-4 py-2 rounded-md text-white ${buttonPrimaryColor}`}>
                Try Again
              </button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title={step === 'idle' || !platformDetails ? "Connect Your Accounts" : `Connect to ${platformDetails.name}`} customBodyClass={modalBg}>
      {renderStepContent()}
    </Modal>
  );
};

export default ConnectAccountsModal;