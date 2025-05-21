import React, { memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Platform } from '../../types';

const BG_TRANSITION_DURATION = 0.7;

interface BaseBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  id: string;
}

const BaseBackground = memo(({ className, children, id }: BaseBackgroundProps) => {
  const animationProps = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { 
        duration: BG_TRANSITION_DURATION, 
        ease: "easeInOut" 
      } 
    },
    exit: { 
      opacity: 0, 
      transition: { 
        duration: BG_TRANSITION_DURATION, 
        ease: "easeInOut" 
      } 
    }
  }), []);

  return (
    <motion.div
      key={id}
      {...animationProps}
      className={`absolute inset-0 w-full h-full -z-10 overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
});

BaseBackground.displayName = 'BaseBackground';

const LinkedInAnimatedBg = memo(() => {
  return (
    <BaseBackground id="linkedin-bg" className="bg-gradient-to-br from-blue-700 via-blue-800 to-sky-700">
      {[...Array(25)].map((_, i) => { // Increased bubble count
        const size = Math.random() * 200 + 80;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.2 + 0.1, // Slightly more opaque bubbles
              backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.08})`
            }}
            animate={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: Math.random() * 1.0 + 0.8,
            }}
            transition={{
              duration: Math.random() * 30 + 25,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
          />
        );
      })}
    </BaseBackground>
  );
});

const XAnimatedBg = memo(() => {
  return (
    <BaseBackground id="x-bg" className="bg-black">
      {[...Array(100)].map((_, i) => ( // Significantly Increased dot count for X
        <motion.div
          key={i}
          className="absolute rounded-full bg-neutral-500" // Brighter dots (neutral-500)
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.7, 0], // More visible opacity range
            scale: [0.5, 1.2, 0.5], // More pronounced scale effect
          }}
          transition={{
            duration: Math.random() * 3 + 2, // Slightly faster, more dynamic
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
          style={{
            width: `${Math.random() * 3 + 2}px`, // Min size 2px
            height: `${Math.random() * 3 + 2}px`,
          }}
        />
      ))}
    </BaseBackground>
  );
});

const InstagramAnimatedBg = memo(() => {
  const emojis = useMemo(() => ['😀', '💖', '🚀', '✨', '🎉', '🔥', '🌟', '💡', '👍', '💯'], []);
  
  return (
    <BaseBackground id="instagram-bg" className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {[...Array(15)].map((_, i) => {
        const randomEmoji = useMemo(() => 
          emojis[Math.floor(Math.random() * emojis.length)],
          [emojis]
        );
        
        return (
          <motion.span
            key={i}
            className="absolute text-3xl md:text-5xl"
            initial={{
              x: `${Math.random() * 90}vw`,
              y: `${Math.random() * 90}vh`,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatDelay: Math.random() * 5 + 3,
              ease: 'easeOut',
              delay: Math.random() * 3
            }}
          >
            {randomEmoji}
          </motion.span>
        );
      })}
    </BaseBackground>
  );
});


interface AnimatedBackgroundSwitcherProps {
  activePlatform: Platform;
}

const AnimatedBackgroundSwitcher: React.FC<AnimatedBackgroundSwitcherProps> = ({ activePlatform }) => {
  return (
    <div className="fixed inset-0 -z-10">
      <AnimatePresence mode="wait">
        {activePlatform === Platform.LinkedIn && <LinkedInAnimatedBg key="linkedin" />}
        {activePlatform === Platform.X && <XAnimatedBg key="x" />}
        {activePlatform === Platform.Instagram && <InstagramAnimatedBg key="instagram" />}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedBackgroundSwitcher;