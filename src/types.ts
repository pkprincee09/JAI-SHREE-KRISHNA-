export interface DevotionalQuote {
  id: string;
  sanskrit: string;
  transliteration: string;
  english: string;
  source: string;
  context: string;
  mood: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  subtitle: string;
  artist: string;
  duration: string;
  youtubeVideoId: string;
  raga?: string;
  bhava?: string;
}

export interface NostalgicMemory {
  id: string;
  title: string;
  hindiTitle: string;
  era: string;
  description: string;
  sensoryDetail: string;
  tag: string;
}

export interface FluteNote {
  key: string;
  swara: string;
  freq: number;
  western: string;
  meaning: string;
}
