/**
 * Retro Audio System
 * Game Boy style audio effects and music
 */

class RetroAudio {
  constructor() {
    this.audioContext = null;
    this.masterVolume = 0.3;
    this.soundEnabled = true;
    
    // Initialize audio context on first user interaction
    this.initAudio();
  }
  
  initAudio() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported');
      this.soundEnabled = false;
    }
  }
  
  // Resume audio context (required for Chrome's autoplay policy)
  resumeAudio() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
  
  // Create a simple square wave oscillator (Game Boy style)
  createSquareWave(frequency, duration, volume = 0.1) {
    if (!this.audioContext || !this.soundEnabled) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * this.masterVolume, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }
  
  // Jump sound effect
  playJumpSound() {
    this.resumeAudio();
    this.createSquareWave(400, 0.2, 0.15);
    // Add second harmonic for richer sound
    setTimeout(() => {
      this.createSquareWave(800, 0.1, 0.08);
    }, 50);
  }
  
  // Collect sound effect
  playCollectSound() {
    this.resumeAudio();
    // Ascending notes for collection
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.createSquareWave(note, 0.1, 0.12);
      }, index * 80);
    });
  }
  
  // Menu selection sound
  playMenuSound() {
    this.resumeAudio();
    this.createSquareWave(800, 0.1, 0.1);
  }
  
  // Game over sound
  playGameOverSound() {
    this.resumeAudio();
    // Descending notes
    const notes = [523, 494, 466, 440, 415, 392]; // C5 down to G4
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.createSquareWave(note, 0.3, 0.1);
      }, index * 200);
    });
  }
  
  // Victory sound
  playVictorySound() {
    this.resumeAudio();
    // Ascending victory melody
    const melody = [
      {note: 523, duration: 0.2}, // C5
      {note: 659, duration: 0.2}, // E5
      {note: 784, duration: 0.2}, // G5
      {note: 1047, duration: 0.4}, // C6
      {note: 784, duration: 0.2}, // G5
      {note: 1047, duration: 0.6}, // C6
    ];
    
    let time = 0;
    melody.forEach((item) => {
      setTimeout(() => {
        this.createSquareWave(item.note, item.duration, 0.15);
      }, time);
      time += item.duration * 1000;
    });
  }
  
  // Pause sound
  playPauseSound() {
    this.resumeAudio();
    this.createSquareWave(330, 0.2, 0.1);
  }
  
  // Background music (simple loop)
  playBackgroundMusic() {
    if (!this.audioContext || !this.soundEnabled) return;
    
    // Simple background loop - very quiet
    const playLoop = () => {
      if (this.audioContext && this.soundEnabled) {
        this.createSquareWave(262, 2, 0.02); // C4
        setTimeout(() => this.createSquareWave(330, 2, 0.02), 2000); // E4
        setTimeout(() => this.createSquareWave(392, 2, 0.02), 4000); // G4
        setTimeout(() => this.createSquareWave(523, 2, 0.02), 6000); // C5
        setTimeout(playLoop, 8000);
      }
    };
    playLoop();
  }
  
  // Toggle sound on/off
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }
}