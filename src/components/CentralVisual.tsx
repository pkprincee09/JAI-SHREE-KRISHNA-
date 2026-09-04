import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playFluteNote, playTempleBell } from '../utils/audio';
import { Sparkles, Heart, Flame, Music, Sun } from 'lucide-react';
import KrishnaArtImage from '../assets/images/krishna_nostalgia_art_1788542592553.jpg';

interface CentralVisualProps {
  onRingBell?: () => void;
}

export const CentralVisual: React.FC<CentralVisualProps> = () => {
  const [isDiyaLit, setIsDiyaLit] = useState<boolean>(true);
  const [blessingMessage, setBlessingMessage] = useState<string | null>(null);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [activeSwaraIndex, setActiveSwaraIndex] = useState<number | null>(null);

  // Quick flute riff when flute is clicked
  const handleFluteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const swaras = [329.63, 392.0, 440.0, 493.88, 587.33]; // Raga Bhupali notes (Ga, Pa, Dha, Sa', Re')
    swaras.forEach((freq, idx) => {
      setTimeout(() => {
        playFluteNote(freq, 0.7);
        setActiveSwaraIndex(idx);
      }, idx * 170);
    });
    setTimeout(() => setActiveSwaraIndex(null), swaras.length * 170 + 600);

    triggerBlessing('मुरली की मधुर तान • राधे कृष्ण राधे कृष्ण');
  };

  // Makhan Matki click offering
  const handleMatkiClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTempleBell(920);
    triggerBlessing('माखन मिश्री भोग अर्पित! "गोपाल कृपा सर्वदा रहे।"');

    // Launch floating hearts / petals
    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: -Math.random() * 120 - 40,
    }));
    setFloatingHearts(newHearts);
    setTimeout(() => setFloatingHearts([]), 1800);
  };

  const handleDiyaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDiyaLit(!isDiyaLit);
    playTempleBell(1020);
    triggerBlessing(isDiyaLit ? 'दीप ज्योति शांत' : 'शुभम् करोति कल्याणम् • दीप प्रज्वलित');
  };

  const triggerBlessing = (msg: string) => {
    setBlessingMessage(msg);
    setTimeout(() => setBlessingMessage(null), 3600);
  };

  return (
    <div id="central-visual-section" className="relative z-10 w-full max-w-5xl mx-auto px-4 py-2 flex flex-col items-center text-center">
      {/* Sacred Mantra Subhead */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-1 flex items-center gap-2 text-[#f2e2cf]/80 font-cormorant text-sm md:text-base tracking-[0.25em] italic"
      >
        <span className="text-[#f27d26]">॥</span>
        <span>श्री कृष्णाय नमः • नमो भगवते वासुदेवाय</span>
        <span className="text-[#f27d26]">॥</span>
      </motion.div>

      {/* Large Memorable Title matching the theme */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="relative mb-3"
      >
        <h1 className="font-rozha text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight editorial-shimmer drop-shadow-[0_4px_30px_rgba(242,125,38,0.25)] leading-tight">
          जय श्री कृष्ण
        </h1>
        <p className="font-cormorant text-xs sm:text-sm md:text-base tracking-[0.4em] uppercase text-[#f2e2cf]/80 font-semibold mt-1">
          JAI SHREE KRISHNA • THE ETERNAL EMBRACE OF BRAJ
        </p>
      </motion.div>

      {/* Authentic Cultural Badges Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-xs font-serif">
        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#f2e2cf]/90 backdrop-blur-sm shadow-sm flex items-center gap-1.5">
          <Sun className="w-3 h-3 text-[#f27d26]" />
          <span>प्रातः कालीन स्मरण</span>
        </span>
        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#f2e2cf]/90 backdrop-blur-sm shadow-sm flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#f27d26]" />
          <span>यमुना तट • निधिवन</span>
        </span>
        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#f2e2cf]/90 backdrop-blur-sm shadow-sm flex items-center gap-1.5">
          <Heart className="w-3 h-3 text-[#f27d26]" />
          <span>माखन मिश्री भोग</span>
        </span>
        <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#f2e2cf]/90 backdrop-blur-sm shadow-sm">
          <span>राधे राधे • नटवर नागर</span>
        </span>
      </div>

      {/* Central Shrine / Illustrated Artwork Card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative w-full max-w-2xl group"
      >
        {/* Divine Aura Glow Behind Frame */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#f27d26]/20 via-[#4a2c1a]/30 to-[#f27d26]/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Vintage Carved Temple Frame */}
        <div className="relative rounded-2xl md:rounded-3xl p-2.5 md:p-3 bg-[#1a0f0a]/90 border border-white/15 shadow-[0_20px_50px_rgba(10,5,3,0.9),0_0_30px_rgba(242,125,38,0.12)] overflow-hidden">
          {/* Top Traditional Temple Arch Filigree Bar */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 mb-2 text-[11px] text-[#f2e2cf]/80">
            <span className="font-devanagari tracking-wider">॥ श्री बांके बिहारी शरणम् ॥</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f27d26] animate-ping" />
              <span className="text-[10px] text-[#f27d26] tracking-widest uppercase font-mono">
                Sanctum
              </span>
            </div>
          </div>

          {/* Masterwork Devotional Painting */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-black">
            <img
              src={KrishnaArtImage}
              alt="Jai Shree Krishna - Divine Bansuri and Mor Pankh by the Yamuna River"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />

            {/* Subtle Vignette & Sunbeam Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-[#1a0f0a]/30 pointer-events-none" />

            {/* Interactive Flute Note Animation Waves */}
            {activeSwaraIndex !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="px-4 py-2 rounded-full bg-[#1a0f0a]/90 border border-[#f27d26] text-[#f2e2cf] text-sm font-rozha shadow-2xl backdrop-blur-md flex items-center gap-2">
                  <Music className="w-4 h-4 text-[#f27d26] animate-bounce" />
                  <span>बांसुरी स्वर तरङ्ग • Raga Bhupali</span>
                </div>
              </motion.div>
            )}

            {/* Clickable Interactive Hotspots on the Painting */}

            {/* 1. Interactive Flute Banner Overlay */}
            <button
              id="interactive-flute-hotspot"
              onClick={handleFluteClick}
              title="Click to hear Krishna's Bansuri Taan"
              className="cursor-pointer absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-[#1a0f0a]/80 hover:bg-[#1a0f0a]/95 border border-white/15 hover:border-[#f27d26]/70 text-[#f2e2cf] text-xs backdrop-blur-md flex items-center gap-2 shadow-lg transition-all transform hover:scale-105"
            >
              <Music className="w-3.5 h-3.5 text-[#f27d26]" />
              <span className="font-devanagari font-medium">बांसुरी की तान सुनें</span>
            </button>

            {/* 2. Interactive Makhan Matki Offering */}
            <button
              id="interactive-matki-hotspot"
              onClick={handleMatkiClick}
              title="Offer Makhan & Mishri Prasad"
              className="cursor-pointer absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#1a0f0a]/80 hover:bg-[#1a0f0a]/95 border border-white/15 hover:border-[#f27d26]/70 text-[#f2e2cf] text-xs backdrop-blur-md flex items-center gap-2 shadow-lg transition-all transform hover:scale-105"
            >
              <Heart className="w-3.5 h-3.5 text-[#f27d26]" />
              <span className="font-devanagari font-medium">माखन मिश्री अर्पण</span>
            </button>

            {/* 3. Interactive Brass Diya (Top right) */}
            <button
              id="interactive-diya-hotspot"
              onClick={handleDiyaClick}
              title={isDiyaLit ? 'Click to toggle Diya flame' : 'Click to light sacred Diya'}
              className="cursor-pointer absolute top-3 right-3 p-2 rounded-xl bg-[#1a0f0a]/80 hover:bg-[#1a0f0a]/95 border border-white/15 hover:border-[#f27d26]/70 text-[#f2e2cf] backdrop-blur-md flex items-center gap-1.5 shadow-lg transition-all"
            >
              <Flame
                className={`w-4 h-4 transition-colors duration-300 ${
                  isDiyaLit ? 'text-[#f27d26] flame-animation' : 'text-stone-500'
                }`}
              />
              <span className="text-[11px] font-devanagari">{isDiyaLit ? 'दीपक प्रज्वलित' : 'दीप जलाएं'}</span>
            </button>
          </div>

          {/* Bottom Card Footer with Sacred Wisdom Snippet */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#f2e2cf]/70 px-2">
            <span className="italic font-cormorant text-xs text-[#f2e2cf]/90 tracking-wider">
              "यतो कृष्णस्ततो धर्मो यतो धर्मस्ततो जयः"
            </span>
            <span className="text-[10px] text-[#f27d26]/80 font-mono tracking-wider">
              वृन्दावन लीला धाम
            </span>
          </div>
        </div>

        {/* Floating Heart / Petal Emitters */}
        <AnimatePresence>
          {floatingHearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 1, scale: 0.6, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.4, x: h.x, y: h.y }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
              className="absolute left-1/2 bottom-12 pointer-events-none text-[#f27d26]"
            >
              <Heart className="w-5 h-5 fill-[#f27d26]" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Dynamic Blessing Toast / Interactive feedback notification */}
      <AnimatePresence>
        {blessingMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mt-3 px-4 py-2 rounded-xl bg-[#1a0f0a]/95 text-[#f2e2cf] text-xs sm:text-sm font-devanagari shadow-2xl border border-[#f27d26]/50 flex items-center gap-2 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-[#f27d26] animate-spin" />
            <span>{blessingMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
