/**
 * WELCOME PAGE — CYBER EMERALD MECHANICS & PARTICLE ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. DYNAMIC MOUSE-TRACKING EMERALD GLOW
  const welcomeGlow = document.getElementById('welcomeGlow');
  if (welcomeGlow) {
    window.addEventListener('mousemove', (e) => {
      window.requestAnimationFrame(() => {
        welcomeGlow.style.setProperty('--mouse-x', `${e.clientX}px`);
        welcomeGlow.style.setProperty('--mouse-y', `${e.clientY}px`);
      });
    });
  }

  // 2. PROCEDURAL MINT MICRO-PARTICLE GENERATOR
  const particleCanvas = document.getElementById('particleCanvas');
  
  if (particleCanvas) {
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 2 + 1; // Minimalist cyber dots
      const leftPos = Math.random() * 100; 
      const duration = Math.random() * 5 + 5; 
      const delay = Math.random() * -10; 
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${leftPos}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      // Pull color from theme variables dynamically if needed, or default to primary mint accent
      particleCanvas.appendChild(particle);
    }
  }

  // 3. SEAMLESS INTERFACE ROUTING HANDLER
  const enterBtn = document.getElementById('enterBtn');
  const welcomeContainer = document.getElementById('welcomeContainer');
  const loadingOverlay = document.getElementById('loadingOverlay');

  if (enterBtn && welcomeContainer && loadingOverlay) {
    enterBtn.addEventListener('click', (e) => {
      e.preventDefault(); 

      // Phase 1: Smooth container collapse
      welcomeContainer.classList.add('exit-stage');

      // Phase 2: Show overlay loader
      loadingOverlay.classList.add('active-loading');

      // Phase 3: Route smoothly to index
      setTimeout(() => {
        window.location.href = 'index1.html';
      }, 1200); 
    });
  }
});