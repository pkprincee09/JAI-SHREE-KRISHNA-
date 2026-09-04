import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playTempleBell } from '../utils/audio';
import { Sparkles, BellRing } from 'lucide-react';

interface TempleBellProps {
  onRing?: () => void;
}

export const TempleBell: React.FC<TempleBellProps> = ({ onRing }) => {
  const [isSwinging, setIsSwinging] = useState(false);
  const [ringCount, setRingCount] = useState(0);
  const [showRipples, setShowRipples] = useState<number[]>([]);

  const handleRing = useCallback(() => {
    // Alternate frequencies slightly for natural variety
    const freqs = [840, 852, 828, 860];
    const chosenFreq = freqs[Math.floor(Math.random() * freqs.length)];
    playTempleBell(chosenFreq);

    setIsSwinging(true);
    setRingCount((prev) => prev + 1);
    const rippleId = Date.now();
    setShowRipples((prev) => [...prev.slice(-3), rippleId]);

    setTimeout(() => {
      setIsSwinging(false);
    }, 1800);

    onRing?.();
  }, [onRing]);

  // Keyboard shortcut: Press 'B' to ring bell
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key.toLowerCase() === 'b') {
        e.preventDefault();
        handleRing();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRing]);

  return (
    <div id="temple-bell-container" className="relative flex flex-col items-center">
      {/* Hanging Chain from Ceiling */}
      <div className="w-[3px] h-10 md:h-14 bg-gradient-to-b from-amber-700/60 via-amber-500/80 to-amber-300 relative shadow-sm">
        {/* Chain links detail */}
        <div className="absolute inset-0 flex flex-col justify-between py-1 items-center opacity-80">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
        </div>
      </div>

      {/* Swinging Bell Assembly */}
      <motion.button
        id="temple-bell-interactive-button"
        onClick={handleRing}
        aria-label="Ring Temple Bell (Press B)"
        title="Ring the Sacred Temple Bell (Press 'B')"
        className="relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f27d26]/50 rounded-full p-2 transition-transform duration-300 hover:scale-105"
        animate={
          isSwinging
            ? {
                rotate: [0, -18, 14, -10, 6, -3, 0],
                transition: { duration: 1.8, ease: 'easeInOut' },
              }
            : { rotate: 0 }
        }
        style={{ transformOrigin: 'top center' }}
      >
        {/* Shockwave Ripples */}
        <AnimatePresence>
          {showRipples.map((id) => (
            <motion.div
              key={id}
              initial={{ scale: 0.6, opacity: 0.9 }}
              animate={{ scale: 2.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full border-2 border-[#f27d26] pointer-events-none shadow-[0_0_20px_rgba(242,125,38,0.6)]"
            />
          ))}
        </AnimatePresence>

        {/* Brass Bell SVG with Intricate Temple Filigree */}
        <div className="relative w-14 h-16 md:w-16 md:h-20 drop-shadow-[0_8px_16px_rgba(242,125,38,0.4)]">
          <svg viewBox="0 0 100 120" className="w-full h-full">
            <defs>
              <linearGradient id="bellBrassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff1c2" />
                <stop offset="25%" stopColor="#f27d26" />
                <stop offset="50%" stopColor="#d96c1e" />
                <stop offset="75%" stopColor="#a34a10" />
                <stop offset="100%" stopColor="#fef3c7" />
              </linearGradient>
              <linearGradient id="clapperGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4a2c1a" />
                <stop offset="50%" stopColor="#f27d26" />
                <stop offset="100%" stopColor="#1a0f0a" />
              </linearGradient>
              <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f27d26" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Top Hanging Ring & Finial */}
            <circle cx="50" cy="12" r="7" fill="none" stroke="url(#bellBrassGrad)" strokeWidth="3" />
            <path d="M46 19 L54 19 L52 26 L48 26 Z" fill="url(#bellBrassGrad)" />

            {/* Main Bell Body Dome */}
            <path
              d="M 50 26 
                 C 38 28, 30 38, 28 55
                 C 26 72, 22 84, 16 92
                 C 14 95, 16 98, 22 98
                 L 78 98
                 C 84 98, 86 95, 84 92
                 C 78 84, 74 72, 72 55
                 C 70 38, 62 28, 50 26 Z"
              fill="url(#bellBrassGrad)"
              stroke="#4a2c1a"
              strokeWidth="1.2"
            />

            {/* Traditional Etched Bands on Bell Body */}
            <path d="M 28 58 Q 50 63 72 58" fill="none" stroke="#4a2c1a" strokeWidth="1.5" opacity="0.85" />
            <path d="M 25 72 Q 50 78 75 72" fill="none" stroke="#4a2c1a" strokeWidth="1.5" opacity="0.85" />
            <path d="M 21 86 Q 50 93 79 86" fill="none" stroke="#fff1c2" strokeWidth="1.5" opacity="0.9" />

            {/* Lotus Petal Petiole engravings */}
            <circle cx="50" cy="46" r="4" fill="#4a2c1a" opacity="0.6" />
            <circle cx="40" cy="48" r="2.5" fill="#4a2c1a" opacity="0.6" />
            <circle cx="60" cy="48" r="2.5" fill="#4a2c1a" opacity="0.6" />

            {/* Bell Rim Thick Lip */}
            <ellipse cx="50" cy="98" rx="34" ry="7" fill="url(#bellBrassGrad)" stroke="#261408" strokeWidth="1.5" />

            {/* Clapper (लोलक) swinging underneath */}
            <g>
              <line x1="50" y1="88" x2="50" y2="108" stroke="#261408" strokeWidth="2.5" />
              <circle cx="50" cy="111" r="6.5" fill="url(#clapperGrad)" stroke="#1a0f0a" strokeWidth="1" />
            </g>
          </svg>
        </div>
      </motion.button>

      {/* Keyboard Shortcut & Status Pill */}
      <div className="mt-1 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[11px] text-[#f2e2cf]/90 shadow-md font-serif">
        <BellRing className="w-3 h-3 text-[#f27d26] animate-pulse" />
        <span className="font-medium tracking-wide">घंटी नाद</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[#f2e2cf] font-mono text-[10px] border border-white/10">
          Key B
        </kbd>
      </div>

      {ringCount > 0 && (
        <span className="text-[10px] text-[#f2e2cf]/70 mt-0.5 font-cormorant italic tracking-wider">
          {ringCount} {ringCount === 1 ? 'प्रणाम' : 'प्रणाम'}
        </span>
      )}
    </div>
  );
};
