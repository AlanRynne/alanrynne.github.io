/**
 * Retro 2D Game Engine
 * Game Boy aesthetic platformer for Alan Rynne's personal website
 */

class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }
  
  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  
  copy() {
    return new Vector2(this.x, this.y);
  }
}

class Player {
  constructor(x, y) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(0, 0);
    this.size = new Vector2(8, 8);
    this.grounded = false;
    this.facing = 1; // 1 for right, -1 for left
    
    // Physics constants
    this.gravity = 0.3;
    this.jumpPower = -5;
    this.moveSpeed = 1.5;
    this.friction = 0.8;
    this.maxVelocity = new Vector2(3, 8);
    
    // Animation
    this.animFrame = 0;
    this.animTimer = 0;
    this.animSpeed = 8; // frames between animation updates
  }
  
  update(keys, platforms) {
    this.handleInput(keys);
    this.applyPhysics();
    this.checkCollisions(platforms);
    this.updateAnimation();
    this.constrainToScreen();
  }
  
  handleInput(keys) {
    // Horizontal movement
    if (keys['KeyA'] || keys['ArrowLeft']) {
      this.velocity.x = Math.max(this.velocity.x - this.moveSpeed, -this.maxVelocity.x);
      this.facing = -1;
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
      this.velocity.x = Math.min(this.velocity.x + this.moveSpeed, this.maxVelocity.x);
      this.facing = 1;
    }
    
    // Jumping
    if ((keys['KeyW'] || keys['ArrowUp'] || keys['Space']) && this.grounded) {
      this.velocity.y = this.jumpPower;
      this.grounded = false;
    }
  }
  
  applyPhysics() {
    // Apply gravity
    this.velocity.y = Math.min(this.velocity.y + this.gravity, this.maxVelocity.y);
    
    // Apply friction to horizontal movement
    this.velocity.x *= this.friction;
    
    // Apply velocity to position
    this.position.add(this.velocity);
  }
  
  checkCollisions(platforms) {
    this.grounded = false;
    
    for (let platform of platforms) {
      if (this.intersects(platform)) {
        this.resolveCollision(platform);
      }
    }
  }
  
  intersects(platform) {
    return this.position.x < platform.x + platform.width &&
           this.position.x + this.size.x > platform.x &&
           this.position.y < platform.y + platform.height &&
           this.position.y + this.size.y > platform.y;
  }
  
  resolveCollision(platform) {
    // Calculate overlap amounts
    const overlapX = Math.min(
      (this.position.x + this.size.x) - platform.x,
      (platform.x + platform.width) - this.position.x
    );
    const overlapY = Math.min(
      (this.position.y + this.size.y) - platform.y,
      (platform.y + platform.height) - this.position.y
    );
    
    // Resolve the smallest overlap (separating axis theorem)
    if (overlapX < overlapY) {
      // Horizontal collision
      if (this.position.x < platform.x) {
        this.position.x = platform.x - this.size.x;
      } else {
        this.position.x = platform.x + platform.width;
      }
      this.velocity.x = 0;
    } else {
      // Vertical collision
      if (this.position.y < platform.y) {
        this.position.y = platform.y - this.size.y;
        this.velocity.y = 0;
        this.grounded = true;
      } else {
        this.position.y = platform.y + platform.height;
        this.velocity.y = 0;
      }
    }
  }
  
  updateAnimation() {
    this.animTimer++;
    if (this.animTimer >= this.animSpeed) {
      this.animFrame = (this.animFrame + 1) % 4;
      this.animTimer = 0;
    }
  }
  
  constrainToScreen() {
    const gameWidth = 160;
    const gameHeight = 144;
    
    // Keep player within screen bounds
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x = 0;
    }
    if (this.position.x + this.size.x > gameWidth) {
      this.position.x = gameWidth - this.size.x;
      this.velocity.x = 0;
    }
    
    // Reset if player falls below screen
    if (this.position.y > gameHeight + 20) {
      this.position.x = gameWidth / 2 - this.size.x / 2;
      this.position.y = 20;
      this.velocity.x = 0;
      this.velocity.y = 0;
    }
  }
  
  render(ctx, palette) {
    ctx.fillStyle = palette.darkest;
    
    // Simple character representation with animation
    if (this.grounded && Math.abs(this.velocity.x) > 0.1) {
      // Walking animation
      const offset = this.animFrame % 2 === 0 ? 0 : 1;
      ctx.fillRect(this.position.x, this.position.y + offset, this.size.x, this.size.y - offset);
    } else {
      // Standing or jumping
      ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
    
    // Eyes (simple dots)
    ctx.fillStyle = palette.lightest;
    const eyeOffset = this.facing === 1 ? 1 : -1;
    ctx.fillRect(this.position.x + 2 + eyeOffset, this.position.y + 2, 1, 1);
    ctx.fillRect(this.position.x + 5 + eyeOffset, this.position.y + 2, 1, 1);
  }
}

class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  render(ctx, palette) {
    ctx.fillStyle = palette.dark;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Add some texture/detail
    ctx.fillStyle = palette.darkest;
    for (let i = 0; i < this.width; i += 4) {
      ctx.fillRect(this.x + i, this.y, 1, 1);
    }
  }
}

class Collectible {
  constructor(x, y, type = 'info') {
    this.x = x;
    this.y = y;
    this.type = type;
    this.collected = false;
    this.animTimer = 0;
    this.size = 6;
  }
  
  update() {
    this.animTimer++;
  }
  
  checkCollision(player) {
    if (!this.collected) {
      const distance = Math.sqrt(
        Math.pow(this.x - (player.position.x + player.size.x/2), 2) +
        Math.pow(this.y - (player.position.y + player.size.y/2), 2)
      );
      
      if (distance < this.size) {
        this.collected = true;
        return true;
      }
    }
    return false;
  }
  
  render(ctx, palette) {
    if (!this.collected) {
      const bounce = Math.sin(this.animTimer * 0.1) * 2;
      
      ctx.fillStyle = palette.light;
      ctx.fillRect(this.x - this.size/2, this.y - this.size/2 + bounce, this.size, this.size);
      
      // Add sparkle effect
      if (this.animTimer % 20 < 10) {
        ctx.fillStyle = palette.lightest;
        ctx.fillRect(this.x - 1, this.y - 1 + bounce, 2, 2);
      }
    }
  }
}

class Particle {
  constructor(x, y, color, velocity) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity || new Vector2(Math.random() * 2 - 1, Math.random() * -2 - 1);
    this.life = 30;
    this.maxLife = 30;
    this.size = Math.random() * 2 + 1;
  }
  
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.y += 0.1; // gravity
    this.life--;
  }
  
  render(ctx, palette) {
    if (this.life > 0) {
      const alpha = this.life / this.maxLife;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }
  
  isDead() {
    return this.life <= 0;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }
  
  addParticles(x, y, count, color) {
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, color));
    }
  }
  
  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
  
  render(ctx, palette) {
    for (let particle of this.particles) {
      particle.render(ctx, palette);
    }
  }
}

class RetroGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    
    // Initialize audio system
    this.audio = new RetroAudio();
    
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
    
    // Particle system
    this.particles = new ParticleSystem();
    
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
      
      // Handle sound toggle
      if (e.code === 'KeyM') {
        const soundEnabled = this.audio.toggleSound();
        console.log('Sound ' + (soundEnabled ? 'enabled' : 'disabled'));
      }
      
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
      this.audio.playMenuSound();
      this.gameState = 'playing';
      this.initializeGame();
      // Start background music
      setTimeout(() => this.audio.playBackgroundMusic(), 500);
    }
  }
  
  updateGame(deltaTime) {
    // Game logic
    if (this.keys['Escape']) {
      this.audio.playPauseSound();
      this.gameState = 'paused';
      return;
    }
    
    // Update player
    if (this.player) {
      const wasGrounded = this.player.grounded;
      this.player.update(this.keys, this.platforms);
      
      // Play jump sound when player jumps
      if (wasGrounded && !this.player.grounded && this.player.velocity.y < 0) {
        this.audio.playJumpSound();
        // Add jump particles
        this.particles.addParticles(
          this.player.position.x + this.player.size.x / 2,
          this.player.position.y + this.player.size.y,
          3,
          this.palette.light
        );
      }
    }
    
    // Update particles
    this.particles.update();
    
    // Update collectibles
    for (let collectible of this.collectibles) {
      collectible.update();
      
      // Check if player collected something
      if (collectible.checkCollision(this.player)) {
        this.audio.playCollectSound();
        this.score += 100;
        
        // Add collection particles
        this.particles.addParticles(
          collectible.x,
          collectible.y,
          8,
          this.palette.lightest
        );
        
        const info = this.infoDatabase[collectible.type];
        if (info && !this.discoveredInfo.includes(info)) {
          this.discoveredInfo.push(info);
        }
      }
    }
    
    // Check win condition
    if (this.discoveredInfo.length >= 4) {
      this.audio.playVictorySound();
      // Victory particles
      this.particles.addParticles(
        this.gameWidth / 2,
        this.gameHeight / 2,
        20,
        this.palette.lightest
      );
      this.gameState = 'gameOver';
    }
  }
  
  updatePause() {
    if (this.keys['Escape']) {
      this.audio.playMenuSound();
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
    // Render platforms
    for (let platform of this.platforms) {
      platform.render(this.ctx, this.palette);
    }
    
    // Render collectibles
    for (let collectible of this.collectibles) {
      collectible.render(this.ctx, this.palette);
    }
    
    // Render player
    if (this.player) {
      this.player.render(this.ctx, this.palette);
    }
    
    // Render particles
    this.particles.render(this.ctx, this.palette);
    
    // Render UI
    this.renderUI();
    
    // Render discovered information
    this.renderInfoPanel();
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
  
  renderInfoPanel() {
    if (this.discoveredInfo.length > 0) {
      // Info panel background
      this.ctx.fillStyle = this.palette.darkest;
      this.ctx.fillRect(5, 40, this.gameWidth - 10, this.discoveredInfo.length * 8 + 10);
      
      this.ctx.fillStyle = this.palette.lightest;
      this.ctx.fillRect(6, 41, this.gameWidth - 12, this.discoveredInfo.length * 8 + 8);
      
      // Info text
      this.ctx.fillStyle = this.palette.darkest;
      this.ctx.font = '6px monospace';
      this.ctx.textAlign = 'left';
      
      for (let i = 0; i < this.discoveredInfo.length; i++) {
        this.ctx.fillText(this.discoveredInfo[i], 8, 48 + i * 8);
      }
    }
  }
  
  renderGameOver() {
    this.ctx.fillStyle = this.palette.darkest;
    this.ctx.font = '8px monospace';
    this.ctx.textAlign = 'center';
    
    this.ctx.fillText('CONGRATULATIONS!', this.gameWidth / 2, 50);
    this.ctx.fillText('You discovered everything!', this.gameWidth / 2, 65);
    this.ctx.fillText(`Final Score: ${this.score}`, this.gameWidth / 2, 80);
    this.ctx.fillText('Press SPACE to restart', this.gameWidth / 2, 100);
    
    // Show all discovered info
    this.ctx.textAlign = 'left';
    this.ctx.font = '6px monospace';
    for (let i = 0; i < this.discoveredInfo.length; i++) {
      this.ctx.fillText(this.discoveredInfo[i], 10, 115 + i * 8);
    }
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
    
    // Create player
    this.player = new Player(this.gameWidth / 2 - 4, 20);
    
    // Create platforms for level 1
    this.platforms = [
      new Platform(0, this.gameHeight - 10, this.gameWidth, 10), // Ground
      new Platform(20, this.gameHeight - 30, 30, 8), // Platform 1
      new Platform(60, this.gameHeight - 50, 40, 8), // Platform 2
      new Platform(110, this.gameHeight - 70, 30, 8), // Platform 3
      new Platform(30, this.gameHeight - 90, 25, 8), // Platform 4
    ];
    
    // Create collectibles with info
    this.collectibles = [
      new Collectible(35, this.gameHeight - 40, 'name'),
      new Collectible(80, this.gameHeight - 60, 'skill'),
      new Collectible(125, this.gameHeight - 80, 'project'),
      new Collectible(42, this.gameHeight - 100, 'contact'),
    ];
    
    // Information that can be discovered
    this.infoDatabase = {
      'name': 'Hi! I\'m Alan Rynne',
      'skill': 'I code in C#, JS, Python',
      'project': 'I build CAD tools',
      'contact': 'Find me on GitHub!'
    };
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