import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DEVOTIONAL_QUOTES } from '../data/krishnaData';
import { ChevronLeft, ChevronRight, Quote, Pause, Play, Sparkles } from 'lucide-react';

export const QuotesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuote = DEVOTIONAL_QUOTES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DEVOTIONAL_QUOTES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DEVOTIONAL_QUOTES.length) % DEVOTIONAL_QUOTES.length);
  };

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 7500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  return (
    <div
      id="devotional-quotes-carousel"
      className="relative z-20 w-full max-w-4xl mx-auto px-4 py-4 font-serif"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="glass-panel rounded-2xl md:rounded-3xl p-5 md:p-7 relative overflow-hidden border border-white/15 shadow-2xl">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f27d26]/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4a2c1a]/20 blur-3xl pointer-events-none rounded-full" />

        {/* Top bar with Quote Icon, Mood Tag, and Play/Pause */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2 text-[#f27d26]">
            <Quote className="w-4 h-4 text-[#f27d26]" />
            <span className="font-serif tracking-[0.25em] uppercase text-[11px] text-[#f2e2cf]/90">
              कृष्ण वाणी • Eternal Words
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#f2e2cf]/85 text-[10px] tracking-wider uppercase">
              {currentQuote.mood}
            </span>
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Resume auto-rotation' : 'Pause rotation'}
              className="text-[#f2e2cf]/70 hover:text-[#f27d26] transition-colors p-1"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Quote Content with Motion Animated Transition */}
        <div className="min-h-[140px] md:min-h-[120px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col gap-2"
            >
              {/* Sanskrit / Hindi Line */}
              <p className="font-devanagari text-lg sm:text-xl md:text-2xl text-[#f2e2cf] font-semibold leading-relaxed drop-shadow-sm whitespace-pre-line">
                {currentQuote.sanskrit}
              </p>

              {/* Transliteration */}
              <p className="text-xs sm:text-sm text-[#f2e2cf]/75 italic font-cormorant tracking-wide">
                "{currentQuote.transliteration}"
              </p>

              {/* English Poetic Translation */}
              <p className="text-xs sm:text-sm md:text-base text-[#f2e2cf]/90 font-editorial-serif leading-relaxed mt-1">
                {currentQuote.english}
              </p>

              {/* Source attribution */}
              <div className="mt-2 flex flex-wrap items-center justify-between text-[11px] text-[#f2e2cf]/80 border-t border-white/10 pt-2">
                <span className="font-medium text-[#f27d26] flex items-center gap-1.5 tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#f27d26]" />
                  {currentQuote.source}
                </span>
                <span className="text-[#f2e2cf]/60 italic text-[11px] tracking-wide">
                  {currentQuote.context}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls: Left/Right arrows & Pagination dots */}
        <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/10">
          <div className="flex items-center gap-1.5">
            {DEVOTIONAL_QUOTES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to quote ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-6 h-1.5 bg-[#f27d26] shadow-[0_0_8px_#f27d26]'
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-[#f27d26]/50'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              title="Previous Quote"
              className="p-1.5 rounded-full bg-white/5 border border-white/10 text-[#f2e2cf] hover:border-[#f27d26]/50 hover:bg-[#f27d26]/15 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-[#f2e2cf]/70 tracking-wider">
              {currentIndex + 1} / {DEVOTIONAL_QUOTES.length}
            </span>
            <button
              onClick={handleNext}
              title="Next Quote"
              className="p-1.5 rounded-full bg-white/5 border border-white/10 text-[#f2e2cf] hover:border-[#f27d26]/50 hover:bg-[#f27d26]/15 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
