import React, { useState, useEffect } from 'react';
import { AtmosphericBackground } from './components/AtmosphericBackground';
import { Header } from './components/Header';
import { TempleBell } from './components/TempleBell';
import { CentralVisual } from './components/CentralVisual';
import { QuotesCarousel } from './components/QuotesCarousel';
import { GlassMusicPlayer } from './components/GlassMusicPlayer';
import { NostalgiaDrawer } from './components/NostalgiaDrawer';
import { Sparkles, HelpCircle, Bell, Music, Wind } from 'lucide-react';

export default function App() {
  const [isMemoriesOpen, setIsMemoriesOpen] = useState<boolean>(false);
  const [showKeyboardGuide, setShowKeyboardGuide] = useState<boolean>(false);

  // Global keydown listeners for convenient access
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key.toLowerCase() === 'm') {
        setIsMemoriesOpen((prev) => !prev);
      } else if (e.key === '?') {
        setShowKeyboardGuide((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div id="jai-shree-krishna-app" className="relative min-h-screen flex flex-col justify-between selection:bg-[#f27d26]/30 selection:text-[#f2e2cf] overflow-x-hidden font-serif">
      {/* Dynamic Atmospheric Canvas & Lighting */}
      <AtmosphericBackground />

      {/* Top Header Bar */}
      <Header onOpenMemories={() => setIsMemoriesOpen(true)} />

      {/* Main Devotional Sanctuary Canvas */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-start pt-1 pb-32 md:pb-36 px-2 sm:px-4">
        {/* Hanging Brass Temple Bell (Rings on Click or Key 'B') */}
        <div className="mb-2">
          <TempleBell />
        </div>

        {/* Central Visual Showcase: Title, Masterwork Painting, Interactive Hotspots */}
        <CentralVisual />

        {/* Rotating Devotional Quotes Carousel */}
        <QuotesCarousel />

        {/* Subtle Keyboard Shortcuts Pill */}
        <div className="mt-2 flex items-center justify-center gap-3 text-[11px] text-[#f2e2cf]/60">
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-[#f27d26]">
              B
            </kbd>
            <span>घंटी (Bell)</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-[#f27d26]">
              S
            </kbd>
            <span>शंख (Conch)</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-[#f27d26]">
              1-7
            </kbd>
            <span>बांसुरी (Flute)</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-[#f27d26]">
              Space
            </kbd>
            <span>भजन Play/Pause</span>
          </div>
        </div>
      </main>

      {/* Fixed Glassmorphism Music Player (Attached to Bottom) */}
      <GlassMusicPlayer />

      {/* Nostalgia & Cultural Memory Drawer */}
      <NostalgiaDrawer
        isOpen={isMemoriesOpen}
        onClose={() => setIsMemoriesOpen(false)}
      />
    </div>
  );
}
