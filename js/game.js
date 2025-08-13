/**
 * Retro 2D Game Engine
 * Game Boy aesthetic platformer for Alan Rynne's personal website
 */

class RetroGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    
    // Game Boy resolution scaled up
    this.gameWidth = 160;
    this.gameHeight = 144;
    this.scale = 4;
    
    // Set canvas size
    this.canvas.width = this.gameWidth * this.scale;
    this.canvas.height = this.gameHeight * this.scale;
    
    // Pixel perfect rendering
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    
    // Game Boy color palette
    this.palette = {
      darkest: '#0f380f',
      dark: '#306230',
      light: '#8bac0f',
      lightest: '#9bbc0f'
    };
    
    // Game state
    this.gameState = 'menu'; // menu, playing, paused, gameOver
    this.level = 1;
    this.score = 0;
    this.discoveredInfo = [];
    
    // Timing
    this.lastTime = 0;
    this.targetFPS = 60;
    this.frameTime = 1000 / this.targetFPS;
    
    // Input handling
    this.keys = {};
    this.setupInput();
    
    // Start the game loop
    this.gameLoop = this.gameLoop.bind(this);
    requestAnimationFrame(this.gameLoop);
  }
  
  setupInput() {
    document.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      e.preventDefault();
    });
    
    document.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
      e.preventDefault();
    });
  }
  
  gameLoop(currentTime) {
    requestAnimationFrame(this.gameLoop);
    
    if (currentTime - this.lastTime >= this.frameTime) {
      this.update(currentTime - this.lastTime);
      this.render();
      this.lastTime = currentTime;
    }
  }
  
  update(deltaTime) {
    switch (this.gameState) {
      case 'menu':
        this.updateMenu();
        break;
      case 'playing':
        this.updateGame(deltaTime);
        break;
      case 'paused':
        this.updatePause();
        break;
      case 'gameOver':
        this.updateGameOver();
        break;
    }
  }
  
  updateMenu() {
    // Start game when space is pressed
    if (this.keys['Space']) {
      this.gameState = 'playing';
      this.initializeGame();
    }
  }
  
  updateGame(deltaTime) {
    // Game logic will be implemented here
    // For now, just basic input handling
    if (this.keys['Escape']) {
      this.gameState = 'paused';
    }
  }
  
  updatePause() {
    if (this.keys['Escape']) {
      this.gameState = 'playing';
    }
  }
  
  updateGameOver() {
    if (this.keys['Space']) {
      this.resetGame();
    }
  }
  
  render() {
    // Clear screen with Game Boy green
    this.ctx.fillStyle = this.palette.lightest;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Scale context for pixel perfect rendering
    this.ctx.save();
    this.ctx.scale(this.scale, this.scale);
    
    switch (this.gameState) {
      case 'menu':
        this.renderMenu();
        break;
      case 'playing':
        this.renderGame();
        break;
      case 'paused':
        this.renderPause();
        break;
      case 'gameOver':
        this.renderGameOver();
        break;
    }
    
    this.ctx.restore();
  }
  
  renderMenu() {
    this.ctx.fillStyle = this.palette.darkest;
    this.ctx.font = '8px monospace';
    this.ctx.textAlign = 'center';
    
    // Title
    this.ctx.fillText('ALAN RYNNE', this.gameWidth / 2, 40);
    this.ctx.fillText('ADVENTURE', this.gameWidth / 2, 50);
    
    // Subtitle
    this.ctx.fillText('Discover my story', this.gameWidth / 2, 70);
    this.ctx.fillText('through code', this.gameWidth / 2, 80);
    
    // Instructions
    this.ctx.fillText('Press SPACE to start', this.gameWidth / 2, 100);
    this.ctx.fillText('WASD or Arrows to move', this.gameWidth / 2, 110);
    
    // Blinking cursor effect
    if (Math.floor(Date.now() / 500) % 2) {
      this.ctx.fillText('_', this.gameWidth / 2 + 60, 100);
    }
  }
  
  renderGame() {
    // Game rendering will be implemented here
    // For now, just a placeholder
    this.ctx.fillStyle = this.palette.dark;
    this.ctx.fillRect(10, this.gameHeight - 20, this.gameWidth - 20, 10);
    
    // Placeholder player
    this.ctx.fillStyle = this.palette.darkest;
    this.ctx.fillRect(this.gameWidth / 2 - 4, this.gameHeight - 30, 8, 8);
    
    // UI
    this.renderUI();
  }
  
  renderPause() {
    this.renderGame();
    
    // Pause overlay
    this.ctx.fillStyle = this.palette.darkest;
    this.ctx.fillRect(20, 50, this.gameWidth - 40, 40);
    
    this.ctx.fillStyle = this.palette.lightest;
    this.ctx.font = '8px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('PAUSED', this.gameWidth / 2, 65);
    this.ctx.fillText('Press ESC to continue', this.gameWidth / 2, 75);
  }
  
  renderGameOver() {
    this.ctx.fillStyle = this.palette.darkest;
    this.ctx.font = '8px monospace';
    this.ctx.textAlign = 'center';
    
    this.ctx.fillText('GAME OVER', this.gameWidth / 2, 60);
    this.ctx.fillText('Press SPACE to restart', this.gameWidth / 2, 80);
  }
  
  renderUI() {
    this.ctx.fillStyle = this.palette.darkest;
    this.ctx.font = '6px monospace';
    this.ctx.textAlign = 'left';
    
    // Score
    this.ctx.fillText(`SCORE: ${this.score}`, 5, 10);
    
    // Level
    this.ctx.fillText(`LEVEL: ${this.level}`, 5, 20);
    
    // Discovered info count
    this.ctx.fillText(`INFO: ${this.discoveredInfo.length}/10`, 5, 30);
  }
  
  initializeGame() {
    this.score = 0;
    this.level = 1;
    this.discoveredInfo = [];
    // Initialize game objects here
  }
  
  resetGame() {
    this.gameState = 'menu';
    this.initializeGame();
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Show loading screen
  const loadingScreen = document.getElementById('loadingScreen');
  
  // Simulate loading time for authentic retro feel
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    window.game = new RetroGame('gameCanvas');
    
    // Remove loading screen after fade out
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 3000);
});