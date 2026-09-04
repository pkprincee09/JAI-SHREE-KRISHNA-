import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NOSTALGIC_MEMORIES, FLUTE_NOTES, BRAJ_PHRASES } from '../data/krishnaData';
import { playFluteNote, playTempleBell } from '../utils/audio';
import {
  X,
  Sparkles,
  Music,
  Radio,
  Tv,
  Heart,
  BookOpen,
  Volume2,
  Calendar,
} from 'lucide-react';

interface NostalgiaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NostalgiaDrawer: React.FC<NostalgiaDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'memories' | 'flute' | 'phrases'>('memories');
  const [lastPlayedNote, setLastPlayedNote] = useState<string | null>(null);

  // Keyboard shortcut listener for flute notes 1-7
  useEffect(() => {
    if (!isOpen && activeTab !== 'flute') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      const note = FLUTE_NOTES.find((n) => n.key === e.key);
      if (note) {
        e.preventDefault();
        handlePlayNote(note.freq, note.swara);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeTab]);

  const handlePlayNote = (freq: number, swara: string) => {
    playFluteNote(freq, 1.2);
    setLastPlayedNote(swara);
    setTimeout(() => setLastPlayedNote(null), 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Sliding Side Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative z-10 w-full max-w-xl h-full bg-[#1a0f0a] border-l border-white/15 flex flex-col shadow-2xl overflow-hidden font-serif"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#f27d26]">
                <Sparkles className="w-5 h-5 text-[#f27d26]" />
              </div>
              <div>
                <h2 className="text-lg font-rozha text-[#f2e2cf]">
                  यादें, संस्कृति व बांसुरी
                </h2>
                <p className="text-xs text-[#f2e2cf]/70 font-cormorant italic tracking-wide">
                  Cultural Nostalgia, Memories & Interactive Bansuri
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="cursor-pointer p-2 rounded-xl text-[#f2e2cf]/60 hover:text-[#f2e2cf] hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 bg-white/[0.01] p-1.5 gap-1.5 text-xs">
            <button
              onClick={() => setActiveTab('memories')}
              className={`cursor-pointer flex-1 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'memories'
                  ? 'bg-[#f27d26]/20 border border-[#f27d26]/50 text-[#f2e2cf] shadow-sm'
                  : 'text-[#f2e2cf]/60 hover:text-[#f2e2cf]'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>सदाबहार यादें</span>
            </button>

            <button
              onClick={() => setActiveTab('flute')}
              className={`cursor-pointer flex-1 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'flute'
                  ? 'bg-[#f27d26]/20 border border-[#f27d26]/50 text-[#f2e2cf] shadow-sm'
                  : 'text-[#f2e2cf]/60 hover:text-[#f2e2cf]'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>बांसुरी स्वर (1-7)</span>
            </button>

            <button
              onClick={() => setActiveTab('phrases')}
              className={`cursor-pointer flex-1 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'phrases'
                  ? 'bg-[#f27d26]/20 border border-[#f27d26]/50 text-[#f2e2cf] shadow-sm'
                  : 'text-[#f2e2cf]/60 hover:text-[#f2e2cf]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>ब्रज शब्दावली</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-28">
            {activeTab === 'memories' && (
              <div className="space-y-4">
                <p className="text-xs text-[#f2e2cf]/80 leading-relaxed italic font-cormorant text-center pb-1 tracking-wide">
                  "The golden glow of Doordarshan mornings, the sweet clink of grandmother's brass handi, and the quiet reverence of a simple folded greeting."
                </p>

                {NOSTALGIC_MEMORIES.map((mem) => (
                  <div
                    key={mem.id}
                    className="glass-panel rounded-2xl p-4 border border-white/10 hover:border-[#f27d26]/40 transition-all shadow-md group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#f27d26] font-mono">
                        {mem.era}
                      </span>
                      <span className="text-[10px] text-[#f2e2cf]/70 font-medium">
                        {mem.tag}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-[#f2e2cf] group-hover:text-[#f27d26] transition-colors">
                      {mem.title}
                    </h3>
                    <p className="text-xs text-[#f2e2cf]/60 font-devanagari mt-0.5">
                      {mem.hindiTitle}
                    </p>

                    <p className="text-xs text-[#f2e2cf]/85 leading-relaxed mt-2 font-editorial-serif">
                      {mem.description}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-start gap-2 text-[11px] text-[#f2e2cf]/75 italic font-cormorant">
                      <Heart className="w-3.5 h-3.5 text-[#f27d26] shrink-0 mt-0.5" />
                      <span>{mem.sensoryDetail}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'flute' && (
              <div className="space-y-4 text-center">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[#f2e2cf]">
                  <p className="text-xs font-devanagari font-semibold">
                    ॥ दिव्य बांसुरी स्वर संगम • Interactive Bansuri ॥
                  </p>
                  <p className="text-[11px] text-[#f2e2cf]/75 mt-1 font-serif">
                    Press keyboard keys <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/15 font-mono text-[#f27d26]">1</kbd> to <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/15 font-mono text-[#f27d26]">7</kbd> or click the holes to play Krishna's flute notes in Raga Bhupali!
                  </p>
                </div>

                {/* Bamboo Flute Visual Layout */}
                <div className="relative py-8 px-4 rounded-2xl bg-[#1a0f0a] border border-white/15 shadow-inner">
                  {/* Flute bamboo body cylinder */}
                  <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-8 bg-gradient-to-b from-[#8f4e1f] via-[#5c2e0f] to-[#3a1b08] rounded-full border border-[#f27d26]/40 shadow-xl pointer-events-none opacity-85" />

                  {/* 7 Swara Tone Holes */}
                  <div className="relative z-10 flex items-center justify-between gap-1.5 sm:gap-2">
                    {FLUTE_NOTES.map((n) => {
                      const isActive = lastPlayedNote === n.swara;
                      return (
                        <button
                          key={n.key}
                          onClick={() => handlePlayNote(n.freq, n.swara)}
                          title={`${n.swara} (${n.western}) - Press key ${n.key}`}
                          className={`cursor-pointer group flex flex-col items-center gap-2 p-2 rounded-2xl transition-all ${
                            isActive
                              ? 'scale-110 -translate-y-2'
                              : 'hover:-translate-y-1'
                          }`}
                        >
                          <span className="text-[10px] font-mono text-[#f2e2cf]/80 px-1.5 py-0.5 rounded bg-black/60 border border-white/10">
                            Key {n.key}
                          </span>

                          {/* Tone Hole Circle */}
                          <div
                            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 transition-all shadow-lg ${
                              isActive
                                ? 'bg-[#f2e2cf] border-white shadow-[0_0_20px_rgba(242,226,207,0.9)] text-[#1a0f0a]'
                                : 'bg-[#1a0f0a] border-[#f27d26]/60 text-[#f2e2cf] group-hover:border-[#f27d26] group-hover:bg-[#f27d26]/20'
                            }`}
                          >
                            <span className="font-devanagari font-bold text-xs sm:text-sm">
                              {n.swara.split(' ')[0]}
                            </span>
                          </div>

                          <span className="text-[10px] text-[#f2e2cf]/90 font-mono">
                            {n.western}
                          </span>
                          <span className="text-[9px] text-[#f2e2cf]/50 max-w-[55px] truncate">
                            {n.meaning.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {lastPlayedNote && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[#f27d26] text-sm font-devanagari"
                  >
                    ध्वनि: <span className="font-bold text-[#f2e2cf]">{lastPlayedNote}</span>
                  </motion.div>
                )}
              </div>
            )}

            {activeTab === 'phrases' && (
              <div className="space-y-3">
                <p className="text-xs text-[#f2e2cf]/80 italic font-cormorant text-center pb-1 tracking-wide">
                  Sacred Braj Bhasha Salutations & Eternal Phrases
                </p>

                {BRAJ_PHRASES.map((item, idx) => (
                  <div
                    key={idx}
                    className="glass-panel rounded-xl p-3.5 border border-white/10 flex items-start justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-base font-devanagari font-bold text-[#f2e2cf]">
                        {item.phrase}
                      </h4>
                      <p className="text-xs text-[#f27d26] italic font-cormorant tracking-wide">
                        "{item.transliteration}"
                      </p>
                      <p className="text-xs text-[#f2e2cf]/80 mt-1 font-editorial-serif">
                        {item.meaning}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        playTempleBell(980);
                      }}
                      title="Chime"
                      className="cursor-pointer p-2 rounded-lg bg-white/5 hover:bg-[#f27d26]/20 text-[#f27d26] transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
