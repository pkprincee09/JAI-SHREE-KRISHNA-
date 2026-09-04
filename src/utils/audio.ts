/**
 * Web Audio API synthesizer for nostalgic Indian devotional instruments:
 * - Temple Brass Bell (मंदिर घंटी)
 * - Sacred Conch Shell (शंखनाद)
 * - Bamboo Flute (बांसुरी की तान)
 * - Meditative Tanpura Drone (तानपूरा)
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays an authentic Brass Temple Bell (पीतल की घंटी) chime
 * Uses multiple inharmonic & harmonic partials with long natural decay and shimmer
 */
export function playTempleBell(frequency: number = 840) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Master gain for the bell
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.6, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);
    masterGain.connect(ctx.destination);

    // Partials characteristic of an Indian bronze/brass ghanti
    // Fundamentals, hum tones, strike tones, and high metallic overtones
    const partials = [
      { ratio: 0.5, gain: 0.35, decay: 4.0 },   // Hum tone
      { ratio: 1.0, gain: 0.6, decay: 3.5 },    // Prime tone
      { ratio: 1.52, gain: 0.45, decay: 3.0 },   // Minor third / tierce
      { ratio: 2.0, gain: 0.3, decay: 2.5 },    // Quint
      { ratio: 2.76, gain: 0.25, decay: 1.8 },   // Nominal
      { ratio: 3.98, gain: 0.15, decay: 1.2 },   // Supernominal
      { ratio: 5.2, gain: 0.08, decay: 0.8 },    // High shimmer
    ];

    partials.forEach(({ ratio, gain, decay }) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = ratio > 2.5 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(frequency * ratio, now);

      // Subtle frequency envelope drop characteristic of struck metal bells
      osc.frequency.exponentialRampToValueAtTime(frequency * ratio * 0.995, now + decay);

      oscGain.gain.setValueAtTime(gain, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + decay);
    });

    // Metallic attack click / clapper strike
    const strikeOsc = ctx.createOscillator();
    const strikeGain = ctx.createGain();
    strikeOsc.type = 'square';
    strikeOsc.frequency.setValueAtTime(2400, now);
    strikeGain.gain.setValueAtTime(0.15, now);
    strikeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
    strikeOsc.connect(strikeGain);
    strikeGain.connect(masterGain);
    strikeOsc.start(now);
    strikeOsc.stop(now + 0.05);
  } catch (err) {
    console.warn('Audio playback not allowed or failed:', err);
  }
}

/**
 * Plays a sacred Conch Shell (शंखनाद) blow
 */
export function playShankh() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 3.2;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.45, now + 0.6);
    masterGain.gain.setValueAtTime(0.45, now + duration - 0.8);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    masterGain.connect(ctx.destination);

    // Natural vibrato and breath modulation
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(4.2, now); // 4.2 Hz natural tremolo
    lfoGain.gain.setValueAtTime(6.0, now);
    lfo.connect(lfoGain);
    lfo.start(now);
    lfo.stop(now + duration);

    // Base pitch around ~210 Hz with gentle rise
    const basePitch = 210;
    const horn = ctx.createOscillator();
    horn.type = 'sawtooth';
    horn.frequency.setValueAtTime(basePitch * 0.94, now);
    horn.frequency.linearRampToValueAtTime(basePitch, now + 0.5);
    horn.frequency.linearRampToValueAtTime(basePitch * 1.02, now + duration - 0.5);
    lfoGain.connect(horn.frequency);

    // Warm lowpass filter to emulate hollow conch acoustic chamber
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(580, now);
    filter.frequency.linearRampToValueAtTime(800, now + 0.8);
    filter.frequency.exponentialRampToValueAtTime(450, now + duration);
    filter.Q.setValueAtTime(3.5, now);

    horn.connect(filter);
    filter.connect(masterGain);

    horn.start(now);
    horn.stop(now + duration);
  } catch (err) {
    console.warn('Audio context error:', err);
  }
}

/**
 * Plays an authentic Bamboo Flute (बांसुरी) note with airy breath and vibrato
 */
export function playFluteNote(freq: number, duration: number = 1.6) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const masterGain = ctx.createGain();
    // Natural flute envelope: soft onset, gentle sustain, soft breath release
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.35, now + 0.12);
    masterGain.gain.setValueAtTime(0.35, now + duration - 0.4);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    masterGain.connect(ctx.destination);

    // Vibrato LFO
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(5.2, now); // ~5Hz classical vibrato
    vibratoGain.gain.setValueAtTime(4.0, now);
    vibrato.connect(vibratoGain);
    vibrato.start(now);
    vibrato.stop(now + duration);

    // Pure flute oscillator (sine + slight triangle warmth)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    vibratoGain.connect(osc1.frequency);

    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now); // 2nd harmonic breath
    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.08, now);
    vibratoGain.connect(osc2.frequency);

    // Filter to give bamboo warmth
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.5, now);
    filter.Q.setValueAtTime(1.8, now);

    osc1.connect(filter);
    osc2.connect(osc2Gain);
    osc2Gain.connect(filter);
    filter.connect(masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } catch (err) {
    console.warn('Flute audio error:', err);
  }
}

/**
 * Tanpura Drone node for background atmospheric devotion
 */
let tanpuraGainNode: GainNode | null = null;
let tanpuraOscillators: OscillatorNode[] = [];

export function toggleTanpuraDrone(enabled: boolean): boolean {
  try {
    const ctx = getAudioContext();
    if (!enabled) {
      if (tanpuraGainNode) {
        tanpuraGainNode.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.0);
        setTimeout(() => {
          tanpuraOscillators.forEach(o => {
            try { o.stop(); } catch {}
          });
          tanpuraOscillators = [];
          tanpuraGainNode = null;
        }, 1100);
      }
      return false;
    }

    if (tanpuraGainNode) return true; // already active

    const now = ctx.currentTime;
    tanpuraGainNode = ctx.createGain();
    tanpuraGainNode.gain.setValueAtTime(0.001, now);
    tanpuraGainNode.gain.linearRampToValueAtTime(0.08, now + 2.0);
    tanpuraGainNode.connect(ctx.destination);

    // Indian Tanpura tuning: Pa (G#3 ~207.65Hz), Sa (C#4 ~277.18Hz), Sa (C#4), Sa octave lower (C#3 ~138.59Hz)
    const pitches = [207.65, 277.18, 277.6, 138.59];
    pitches.forEach((p, idx) => {
      const osc = ctx.createOscillator();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(p, now);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(700, now);

      osc.connect(filter);
      filter.connect(tanpuraGainNode!);
      osc.start(now);
      tanpuraOscillators.push(osc);
    });

    return true;
  } catch (e) {
    console.warn('Tanpura drone error:', e);
    return false;
  }
}
