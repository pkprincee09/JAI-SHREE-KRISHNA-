import React, { useState, useEffect } from 'react';
import { Radio, Volume2, VolumeX, Sparkles, Wind, BookOpen, Clock } from 'lucide-react';
import { playShankh, toggleTanpuraDrone } from '../utils/audio';

interface HeaderProps {
  onOpenMemories: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMemories }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isTanpuraActive, setIsTanpuraActive] = useState<boolean>(false);
  const [shankhActive, setShankhActive] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatted in 12hr IST-styled display
      const timeStr = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShankh = () => {
    setShankhActive(true);
    playShankh();
    setTimeout(() => setShankhActive(false), 3400);
  };

  const handleToggleTanpura = () => {
    const newState = !isTanpuraActive;
    const res = toggleTanpuraDrone(newState);
    setIsTanpuraActive(res);
  };

  return (
    <header id="app-header" className="relative z-30 w-full pt-5 pb-2 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
      {/* Left: Nostalgic Radio Tuning & Brahma Muhurta Badge */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm">
          <Radio className="w-3.5 h-3.5 text-[#f27d26] animate-pulse" />
          <span className="text-[#f2e2cf]/90 font-serif tracking-widest text-[11px]">
            आकाशवाणी वृन्दावन • 92.7 MHz
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f27d26] animate-ping" />
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[#f2e2cf]/80 backdrop-blur-sm">
          <Clock className="w-3.5 h-3.5 text-[#f27d26]/80" />
          <span className="font-mono text-[11px] tracking-wider">{currentTime || '05:45 AM'}</span>
          <span className="text-[10px] text-[#f2e2cf]/50 ml-1 font-serif">ब्रज धाम समय</span>
        </div>
      </div>

      {/* Right: Sacred Atmospheric Quick Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Shankh Trigger */}
        <button
          id="shankh-sound-button"
          onClick={handleShankh}
          disabled={shankhActive}
          title="Play Sacred Conch (Shankh Naad) • Key 'S'"
          className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-serif tracking-wide transition-all duration-300 ${
            shankhActive
              ? 'bg-[#f27d26]/30 border-[#f27d26] text-[#f2e2cf] shadow-[0_0_15px_rgba(242,125,38,0.5)] scale-105'
              : 'bg-white/5 border-white/10 text-[#f2e2cf]/90 hover:border-[#f27d26]/50 hover:bg-[#f27d26]/15 hover:text-[#f2e2cf]'
          }`}
        >
          <Wind className={`w-3.5 h-3.5 text-[#f27d26] ${shankhActive ? 'animate-spin' : ''}`} />
          <span>{shankhActive ? 'शंखनाद...' : 'शंखनाद (S)'}</span>
        </button>

        {/* Tanpura Drone Toggle */}
        <button
          id="tanpura-drone-toggle-button"
          onClick={handleToggleTanpura}
          title="Toggle Meditative Tanpura Acoustic Drone"
          className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-serif tracking-wide transition-all duration-300 ${
            isTanpuraActive
              ? 'bg-[#f27d26]/20 border-[#f27d26]/80 text-[#f2e2cf] shadow-[0_0_15px_rgba(242,125,38,0.35)]'
              : 'bg-white/5 border-white/10 text-[#f2e2cf]/90 hover:border-[#f27d26]/50 hover:bg-[#f27d26]/15 hover:text-[#f2e2cf]'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${isTanpuraActive ? 'text-[#f27d26]' : 'text-[#f2e2cf]/70'}`} />
          <span>{isTanpuraActive ? 'तानपूरा: On' : 'तानपूरा Drone'}</span>
        </button>

        {/* Nostalgic Memories Drawer Button */}
        <button
          id="open-memories-drawer-button"
          onClick={onOpenMemories}
          className="cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#f2e2cf] font-serif tracking-wide hover:border-[#f27d26]/60 hover:bg-[#f27d26]/20 hover:shadow-[0_0_18px_rgba(242,125,38,0.25)] transition-all duration-300"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#f27d26]" />
          <span>यादें व संस्कृति</span>
        </button>
      </div>
    </header>
  );
};
