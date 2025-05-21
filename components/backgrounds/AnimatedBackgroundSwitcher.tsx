import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Platform } from '../../types';

const BG_TRANSITION_DURATION = 0.7;

const BaseBackground: React.FC<{ className?: string, children?: React.ReactNode, key?: string }> = ({ className, children, key }) => (
  <motion.div
    key={key}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: BG_TRANSITION_DURATION, ease: "easeInOut" } }}
    exit={{ opacity: 0, transition: { duration: BG_TRANSITION_DURATION, ease: "easeInOut" } }}
    className={`absolute inset-0 w-full h-full -z-10 overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

const LinkedInAnimatedBg: React.FC = () => (
  <BaseBackground key="linkedin" className="bg-gradient-to-br from-blue-700 via-blue-800 to-sky-700">
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
            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
            y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
            scale: [null, Math.random() * 1.0 + 0.8, null],
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

const XAnimatedBg: React.FC = () => (
  <BaseBackground key="x" className="bg-black">
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

const InstagramAnimatedBg: React.FC = () => {
  const emojis = ['😀', '💖', '🚀', '✨', '🎉', '🔥', '🌟', '💡', '👍', '💯'];
  return (
    <BaseBackground key="instagram" className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {[...Array(15)].map((_, i) => (
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
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </motion.span>
      ))}
    </BaseBackground>
  );
};


interface AnimatedBackgroundSwitcherProps {
  activePlatform: Platform;
}

const AnimatedBackgroundSwitcher: React.FC<AnimatedBackgroundSwitcherProps> = ({ activePlatform }) => {
  return (
    <AnimatePresence mode="wait">
      {activePlatform === Platform.LinkedIn && <LinkedInAnimatedBg />}
      {activePlatform === Platform.X && <XAnimatedBg />}
      {activePlatform === Platform.Instagram && <InstagramAnimatedBg />}
    </AnimatePresence>
  );
};

export default AnimatedBackgroundSwitcher;