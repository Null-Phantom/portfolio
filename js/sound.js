/**
 * Ambient Rain Sound Engine for Yug Mittal Portfolio
 * Pure Web Audio API synthesized realistic nighttime rain ambience.
 * 
 * Features:
 * - Calming, low-volume nighttime rain behind a quiet window
 * - Subtle raindrop patter and low-frequency atmosphere
 * - Smooth fade-in (1.5s) and fade-out (1.2s)
 * - Session storage persistence during current session
 * - Autoplay compliance (starts only after user interaction)
 * - Synchronized corner and navigation controls
 */

class AmbientRainEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.rainGain = null;
    this.dropsGain = null;
    this.pinkNoiseNode = null;
    this.dropsInterval = null;
    this.volume = 0.22; // Low, gentle calming volume
    this.storageKey = "ym_ambient_rain_preference";

    this.initSessionState();
  }

  initSessionState() {
    try {
      const savedPref = sessionStorage.getItem(this.storageKey);
      if (savedPref === "true") {
        // Prepare to resume on first user interaction to satisfy browser autoplay
        const resumeOnGesture = () => {
          if (!this.isPlaying && sessionStorage.getItem(this.storageKey) === "true") {
            this.toggle(true);
          }
          window.removeEventListener("click", resumeOnGesture);
          window.removeEventListener("keydown", resumeOnGesture);
        };
        window.addEventListener("click", resumeOnGesture, { once: true });
        window.addEventListener("keydown", resumeOnGesture, { once: true });
      }
    } catch (e) {
      // Storage unavailable or disabled
    }
  }

  initAudioContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // Master gain node
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Continuous ambient rain branch
      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.rainGain.connect(this.masterGain);

      // Raindrop patter branch
      this.dropsGain = this.ctx.createGain();
      this.dropsGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.dropsGain.connect(this.masterGain);
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  createRainNoise() {
    if (!this.ctx) return;

    // Generate 6 seconds of smooth pink noise buffer
    const bufferSize = this.ctx.sampleRate * 6;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
      b6 = white * 0.115926;
    }

    this.pinkNoiseNode = this.ctx.createBufferSource();
    this.pinkNoiseNode.buffer = noiseBuffer;
    this.pinkNoiseNode.loop = true;

    // Gentle low-pass filter to simulate nighttime rain outside the window
    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(750, this.ctx.currentTime);
    lowpass.Q.setValueAtTime(1.1, this.ctx.currentTime);

    // Warmth shelf
    const lowShelf = this.ctx.createBiquadFilter();
    lowShelf.type = "lowshelf";
    lowShelf.frequency.setValueAtTime(200, this.ctx.currentTime);
    lowShelf.gain.setValueAtTime(3.0, this.ctx.currentTime);

    // High cut to keep it gentle and soft
    const highShelf = this.ctx.createBiquadFilter();
    highShelf.type = "highshelf";
    highShelf.frequency.setValueAtTime(2800, this.ctx.currentTime);
    highShelf.gain.setValueAtTime(-10.0, this.ctx.currentTime);

    this.pinkNoiseNode.connect(lowpass);
    lowpass.connect(lowShelf);
    lowShelf.connect(highShelf);
    highShelf.connect(this.rainGain);

    this.pinkNoiseNode.start(0);
  }

  startRaindropPatter() {
    if (!this.ctx) return;

    // Subtle random micro-droplets on glass
    this.dropsInterval = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;

      if (Math.random() < 0.35) {
        const dropLength = 0.004 + Math.random() * 0.008;
        const dropBuffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * dropLength), this.ctx.sampleRate);
        const data = dropBuffer.getChannelData(0);

        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.25));
        }

        const dropSource = this.ctx.createBufferSource();
        dropSource.buffer = dropBuffer;

        const bandpass = this.ctx.createBiquadFilter();
        bandpass.type = "bandpass";
        bandpass.frequency.setValueAtTime(900 + Math.random() * 1200, this.ctx.currentTime);
        bandpass.Q.setValueAtTime(3.5, this.ctx.currentTime);

        const dropGain = this.ctx.createGain();
        dropGain.gain.setValueAtTime(0.06 + Math.random() * 0.08, this.ctx.currentTime);

        dropSource.connect(bandpass);
        bandpass.connect(dropGain);
        dropGain.connect(this.dropsGain);

        dropSource.start();
      }
    }, 140);
  }

  playFeedbackCue(type = "on") {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const freq = type === "on" ? 523.25 : 392.00; // C5 vs G4

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.26);
    } catch (e) {
      // Ignore
    }
  }

  toggle(forcePlay = null) {
    this.initAudioContext();

    const targetState = forcePlay !== null ? forcePlay : !this.isPlaying;

    if (this.isPlaying && !targetState) {
      // Smooth fade out over 1.2 seconds
      this.playFeedbackCue("off");
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      setTimeout(() => {
        if (!this.isPlaying) {
          if (this.pinkNoiseNode) {
            try { this.pinkNoiseNode.stop(); } catch (e) {}
            this.pinkNoiseNode = null;
          }
          clearInterval(this.dropsInterval);
        }
      }, 1250);

      this.isPlaying = false;
      this.savePreference(false);
      this.updateUI();
    } else if (!this.isPlaying && targetState) {
      // Smooth fade in over 1.5 seconds
      this.createRainNoise();
      this.startRaindropPatter();
      this.isPlaying = true;
      this.playFeedbackCue("on");

      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 1.5);

      this.savePreference(true);
      this.updateUI();
    }
  }

  savePreference(enabled) {
    try {
      sessionStorage.setItem(this.storageKey, enabled ? "true" : "false");
    } catch (e) {}
  }

  updateUI() {
    // 1. Navigation control
    const navBtn = document.getElementById("ambient-sound-toggle");
    const navText = document.getElementById("ambient-status-text");
    const navWave = document.getElementById("ambient-wave-indicator");

    if (navBtn) {
      navBtn.classList.toggle("playing", this.isPlaying);
      navBtn.setAttribute("aria-pressed", this.isPlaying ? "true" : "false");
      if (navText) navText.textContent = this.isPlaying ? "Rain: ON" : "Ambient: OFF";
      if (navWave) navWave.classList.toggle("active", this.isPlaying);
    }

    // 2. Corner sound control widget
    const cornerBtn = document.getElementById("corner-sound-toggle");
    const cornerText = document.getElementById("corner-sound-status");
    const cornerWidget = document.getElementById("corner-sound-widget");

    if (cornerBtn) {
      cornerBtn.classList.toggle("active", this.isPlaying);
      cornerBtn.setAttribute("aria-pressed", this.isPlaying ? "true" : "false");
      if (cornerText) cornerText.textContent = this.isPlaying ? "Rain: ON" : "Rain: OFF";
    }

    if (cornerWidget) {
      cornerWidget.classList.toggle("active", this.isPlaying);
    }
  }
}

// Global instance
window.ambientSound = new AmbientRainEngine();
