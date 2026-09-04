import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PLAYLIST_TRACKS, YOUTUBE_PLAYLIST_ID } from '../data/krishnaData';
import { MusicTrack } from '../types';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ListMusic,
  Maximize2,
  Minimize2,
  Music,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const GlassMusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(324); // default ~5:24
  const [volume, setVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [ytReady, setYtReady] = useState<boolean>(false);

  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentTrack: MusicTrack = PLAYLIST_TRACKS[currentTrackIndex];

  // Initialize YouTube IFrame Player
  useEffect(() => {
    let checkYTInterval: NodeJS.Timeout | null = null;

    const initYT = () => {
      if (window.YT && window.YT.Player) {
        try {
          playerRef.current = new window.YT.Player('yt-hidden-player', {
            height: '180',
            width: '320',
            playerVars: {
              listType: 'playlist',
              list: YOUTUBE_PLAYLIST_ID,
              autoplay: 0,
              controls: 1,
              showinfo: 0,
              modestbranding: 1,
              rel: 0,
              enablejsapi: 1,
              origin: window.location.origin,
            },
            events: {
              onReady: () => {
                setYtReady(true);
                try {
                  playerRef.current.setVolume(80);
                } catch {}
              },
              onStateChange: (event: any) => {
                // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
                if (event.data === 1) {
                  setIsPlaying(true);
                } else if (event.data === 2 || event.data === 0) {
                  setIsPlaying(false);
                }
              },
            },
          });
        } catch (e) {
          console.warn('YouTube Player initialization fallback:', e);
        }
      }
    };

    if (window.YT && window.YT.Player) {
      initYT();
    } else {
      checkYTInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkYTInterval!);
          initYT();
        }
      }, 500);
    }

    return () => {
      if (checkYTInterval) clearInterval(checkYTInterval);
      try {
        if (playerRef.current && playerRef.current.destroy) {
          playerRef.current.destroy();
        }
      } catch {}
    };
  }, []);

  // Time tracking & simulated progress loop
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          try {
            const cur = playerRef.current.getCurrentTime();
            const dur = playerRef.current.getDuration();
            if (cur !== undefined && !isNaN(cur)) setCurrentTime(cur);
            if (dur !== undefined && !isNaN(dur) && dur > 0) setDuration(dur);
          } catch {
            setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
          }
        } else {
          setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
        }
      }, 1000);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, duration]);

  // Spacebar hotkey to toggle play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, ytReady]);

  const togglePlayPause = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        if (nextState) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      } catch (err) {
        console.warn('YT player play error:', err);
      }
    }
  };

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % PLAYLIST_TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    setCurrentTime(0);

    if (playerRef.current && typeof playerRef.current.nextVideo === 'function') {
      try {
        playerRef.current.nextVideo();
      } catch {
        // Fallback
      }
    }
  };

  const handlePrevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + PLAYLIST_TRACKS.length) % PLAYLIST_TRACKS.length;
    setCurrentTrackIndex(prevIdx);
    setCurrentTime(0);

    if (playerRef.current && typeof playerRef.current.previousVideo === 'function') {
      try {
        playerRef.current.previousVideo();
      } catch {
        // Fallback
      }
    }
  };

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
    setShowPlaylistDrawer(false);

    if (playerRef.current && typeof playerRef.current.playVideoAt === 'function') {
      try {
        playerRef.current.playVideoAt(index);
      } catch {}
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = parseFloat(e.target.value);
    setCurrentTime(target);
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      try {
        playerRef.current.seekTo(target, true);
      } catch {}
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseInt(e.target.value, 10);
    setVolume(newVol);
    setIsMuted(newVol === 0);

    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      try {
        playerRef.current.setVolume(newVol);
      } catch {}
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (playerRef.current && typeof playerRef.current.unMute === 'function') {
        try {
          playerRef.current.unMute();
          playerRef.current.setVolume(volume || 80);
        } catch {}
      }
    } else {
      setIsMuted(true);
      if (playerRef.current && typeof playerRef.current.mute === 'function') {
        try {
          playerRef.current.mute();
        } catch {}
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Hidden YouTube IFrame container for audio playback */}
      <div className="fixed -bottom-96 -right-96 opacity-0 pointer-events-none">
        <div id="yt-hidden-player" />
      </div>

      {/* Playlist Drawer Popover */}
      <AnimatePresence>
        {showPlaylistDrawer && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-28 left-4 right-4 md:left-auto md:right-8 md:w-96 z-50 bg-[#1a0f0a]/95 backdrop-blur-2xl rounded-2xl p-4 max-h-[380px] overflow-y-auto shadow-2xl border border-white/15 font-serif"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2 text-[#f2e2cf] font-medium tracking-wide">
                <ListMusic className="w-4 h-4 text-[#f27d26]" />
                <span>यूट्यूब भक्ति प्लेलिस्ट ({PLAYLIST_TRACKS.length} भजन)</span>
              </div>
              <a
                href={`https://youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#f27d26] hover:text-[#f2e2cf] flex items-center gap-1 transition-colors tracking-wide"
              >
                <span>Open YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex flex-col gap-1.5">
              {PLAYLIST_TRACKS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTrack(idx)}
                  className={`cursor-pointer w-full text-left p-2 rounded-xl transition-all flex items-center justify-between text-xs ${
                    idx === currentTrackIndex
                      ? 'bg-[#f27d26]/20 border border-[#f27d26]/60 text-[#f2e2cf] shadow-md'
                      : 'hover:bg-white/5 text-[#f2e2cf]/75 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <span className="font-mono text-[11px] text-[#f27d26] w-4">
                      {idx + 1}
                    </span>
                    <div className="truncate">
                      <p className="font-medium truncate text-[#f2e2cf]">{t.title}</p>
                      <p className="text-[11px] text-[#f2e2cf]/60 truncate font-devanagari">
                        {t.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#f2e2cf]/50 shrink-0 ml-2">
                    {t.duration}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YouTube Video Modal (if user wants to watch the visuals) */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowVideoModal(false)}
          >
            <div
              className="relative w-full max-w-2xl bg-[#1a0f0a] border border-white/20 rounded-2xl p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-[#f2e2cf] text-sm">
                <span className="font-devanagari font-medium tracking-wide">
                  {currentTrack.title} • {currentTrack.subtitle}
                </span>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-[#f2e2cf]/60 hover:text-[#f2e2cf]"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}&autoplay=1`}
                  title="Jai Shree Krishna YouTube Playlist"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIXED GLASSMORPHISM MUSIC PLAYER NEAR BOTTOM - Editorial Aesthetic */}
      <div
        id="fixed-glass-music-player"
        className="fixed bottom-3 left-3 right-3 md:bottom-5 md:left-1/2 md:-translate-x-1/2 md:w-[94%] max-w-5xl z-40 font-serif"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-3.5 md:py-3.5 md:px-6 shadow-[0_20px_50px_rgba(10,5,3,0.9)] relative overflow-hidden">
          {/* Subtle warm backlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f27d26]/5 via-transparent to-[#f27d26]/5 pointer-events-none" />

          {/* Top Row: Track details, Playback Controls, Actions */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Left: Track Info & Animated Visualizer */}
            <div className="flex items-center gap-3 w-full md:w-1/3 min-w-0">
              {/* Disc/Album art icon with spinning effect when playing */}
              <div
                className={`relative w-11 h-11 rounded-xl shrink-0 flex items-center justify-center bg-white/5 border border-white/15 shadow-md ${
                  isPlaying ? 'ring-2 ring-[#f27d26]/50' : ''
                }`}
              >
                <Music
                  className={`w-5 h-5 text-[#f27d26] ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '8s' }}
                />
              </div>

              {/* Title & Artist */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xs sm:text-sm font-semibold text-[#f2e2cf] truncate">
                    {currentTrack.title}
                  </h2>
                  {currentTrack.raga && (
                    <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-[9px] text-[#f27d26] font-mono">
                      {currentTrack.raga}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#f2e2cf]/65 truncate font-devanagari">
                  {currentTrack.subtitle} • {currentTrack.artist}
                </p>
              </div>

              {/* Dancing Waveform Audio Visualizer Bars */}
              <div className="flex items-end gap-0.5 h-6 px-1 shrink-0">
                {[12, 20, 16, 24, 18, 22].map((baseHeight, i) => (
                  <motion.span
                    key={i}
                    className="w-1 rounded-full bg-[#f27d26]"
                    animate={
                      isPlaying
                        ? {
                            height: [
                              `${baseHeight * 0.4}px`,
                              `${baseHeight}px`,
                              `${baseHeight * 0.6}px`,
                            ],
                          }
                        : { height: '4px' }
                    }
                    transition={
                      isPlaying
                        ? {
                            repeat: Infinity,
                            duration: 0.5 + i * 0.12,
                            ease: 'easeInOut',
                          }
                        : { duration: 0.2 }
                    }
                  />
                ))}
              </div>
            </div>

            {/* Center: Main Playback Controls */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 shrink-0">
              {/* Previous */}
              <button
                id="player-prev-track-button"
                onClick={handlePrevTrack}
                title="Previous Track"
                className="cursor-pointer p-2 rounded-full text-[#f2e2cf]/70 hover:text-[#f2e2cf] hover:bg-white/5 transition-all"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Play / Pause Primary Button - High-Contrast Editorial Style (#f2e2cf button with #1a0f0a icon) */}
              <button
                id="player-play-pause-button"
                onClick={togglePlayPause}
                title="Play / Pause (Spacebar)"
                className="cursor-pointer w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#f2e2cf] text-[#1a0f0a] hover:bg-white flex items-center justify-center shadow-[0_0_20px_rgba(242,226,207,0.3)] transform hover:scale-105 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-[#1a0f0a] text-[#1a0f0a]" />
                ) : (
                  <Play className="w-5 h-5 fill-[#1a0f0a] text-[#1a0f0a] ml-0.5" />
                )}
              </button>

              {/* Next */}
              <button
                id="player-next-track-button"
                onClick={handleNextTrack}
                title="Next Track"
                className="cursor-pointer p-2 rounded-full text-[#f2e2cf]/70 hover:text-[#f2e2cf] hover:bg-white/5 transition-all"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Right: Volume & Playlist Trigger */}
            <div className="flex items-center justify-end gap-2.5 w-full md:w-1/3">
              {/* Volume */}
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  onClick={toggleMute}
                  title={isMuted ? 'Unmute' : 'Mute'}
                  className="text-[#f2e2cf]/70 hover:text-[#f2e2cf] p-1"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-[#f2e2cf]/40" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 sm:w-20 accent-[#f27d26] h-1.5 bg-black/40 rounded-lg cursor-pointer"
                  title="Volume"
                />
              </div>

              {/* Watch Video Preview Modal */}
              <button
                onClick={() => setShowVideoModal(true)}
                title="View YouTube Video Screen"
                className="cursor-pointer p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#f2e2cf] text-xs flex items-center gap-1 transition-all"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden lg:inline text-[11px] font-serif">Video</span>
              </button>

              {/* Playlist drawer button */}
              <button
                id="playlist-toggle-button"
                onClick={() => setShowPlaylistDrawer(!showPlaylistDrawer)}
                title="View YouTube Devotional Playlist"
                className={`cursor-pointer px-3 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 font-medium transition-all ${
                  showPlaylistDrawer
                    ? 'bg-[#f27d26]/20 border-[#f27d26]/60 text-[#f2e2cf]'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#f2e2cf]'
                }`}
              >
                <ListMusic className="w-3.5 h-3.5 text-[#f27d26]" />
                <span className="font-devanagari">भजन सूची</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Scrubber Timeline & Timestamps */}
          <div className="mt-2.5 pt-1 flex items-center gap-2.5 text-[10px] font-mono text-[#f2e2cf]/60">
            <span>{formatTime(currentTime)}</span>
            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full accent-[#f27d26] h-1.5 bg-white/10 rounded-lg cursor-pointer hover:h-2 transition-all"
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </>
  );
};
