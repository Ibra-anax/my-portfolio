/**
 * ANAS PORTFOLIO — OPERATIONAL LOGIC & FILTER GRID HOOKS
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. MOBILE NAVBAR CONTROLLER (FIXED & WORKING)
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('mobile-nav-active');
      navLinks.classList.toggle('mobile-open');
    });

    // Close menu when tapping a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('mobile-nav-active');
        navLinks.classList.remove('mobile-open');
      });
    });

    // Close menu when tapping outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('mobile-nav-active');
        navLinks.classList.remove('mobile-open');
      }
    });
  }

  // 2. PERFORMANCE PAGE DELAYS ENGINE
  const entryNodes = document.querySelectorAll('.page-entry-node');
  entryNodes.forEach((node, index) => {
    setTimeout(() => { node.classList.add('trigger-entry'); }, index * 120);
  });

  // 3. LIGHT/DARK ENGINE CONTROLLER
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const switchTarget = activeTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', switchTarget);
      localStorage.setItem('portfolio-theme', switchTarget);
      updateThemeIcon(switchTarget);
    });
  }

  function updateThemeIcon(theme) {
    const iconSpan = themeToggle ? themeToggle.querySelector('.mode-icon') : null;
    if (iconSpan) {
      iconSpan.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // 4. MOUSE TRACKING GLOW FIELD
  const glowField = document.getElementById('neonGlowField');
  if (glowField) {
    window.addEventListener('mousemove', (e) => {
      window.requestAnimationFrame(() => {
        glowField.style.setProperty('--mouse-x', `${e.clientX}px`);
        glowField.style.setProperty('--mouse-y', `${e.clientY}px`);
      });
    });
  }

  // 5. AUTO-TYPING GENERATOR
  const targetProfiles = ["Ibrahim Anas", "Fresher", "UI-UX Designer", "Web Designer"];
  const textTarget = document.getElementById('typingTarget');
  let arrayIdx = 0, charIdx = 0, isDeleting = false, typeSpeed = 100;

  function executeTypingCycle() {
    const completeString = targetProfiles[arrayIdx];
    
    if (isDeleting) {
      textTarget.textContent = completeString.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40; 
    } else {
      textTarget.textContent = completeString.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 100; 
    }

    if (!isDeleting && charIdx === completeString.length) {
      typeSpeed = 2000; 
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      arrayIdx = (arrayIdx + 1) % targetProfiles.length;
      typeSpeed = 500; 
    }

    setTimeout(executeTypingCycle, typeSpeed);
  }
  if (textTarget) setTimeout(executeTypingCycle, 1000);

  // 6. INTERSECTION OBSERVERS REVEAL SYSTEM
  const animatedNodes = document.querySelectorAll('.anim-target');
  const scrollIndicator = document.getElementById('scrollIndicator');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  if ('IntersectionObserver' in window) {
    const layoutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-reveal');
        } else {
          entry.target.classList.remove('active-reveal');
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -5% 0px" });

    animatedNodes.forEach(node => layoutObserver.observe(node));
  } else {
    animatedNodes.forEach(node => node.classList.add('active-reveal'));
  }

  // Active Navigation Target Tracking Links & Button Visibilities
  window.addEventListener('scroll', () => {
    let currentSectionId = "hero";
    const scrollPosition = window.scrollY + 180;
    
    // Toggle traditional hero landing arrow tracking indicators
    if (scrollIndicator) {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    }

    // Toggle Floating Scroll-to-Top Node visibility maps
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('is-visible');
      } else {
        scrollTopBtn.classList.remove('is-visible');
      }
    }

    document.querySelectorAll('section').forEach(section => {
      if (scrollPosition >= section.offsetTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(nav => {
      const currentHref = nav.getAttribute('href');
      if(currentHref && currentHref.startsWith('#')) {
        nav.classList.toggle('active', currentHref === `#${currentSectionId}`);
      }
    });
  });

  // Smooth layout jump links
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const targetHref = item.getAttribute('href');
      if (!targetHref || !targetHref.startsWith('#')) return;
      
      e.preventDefault();
      const destinationBlock = document.getElementById(targetHref.substring(1));
      if (destinationBlock) {
        window.scrollTo({
          top: destinationBlock.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Floating button event link handler
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 7. STANDALONE FILTER SYSTEM LOGIC ENGINE (ALL-WORKS PAGE SEQUENCED FADES)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const mixTargets = document.querySelectorAll('.mix-target');

  if (filterButtons.length > 0 && mixTargets.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Clear old active button configurations
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const activeFilterValue = button.getAttribute('data-filter');
        let sequencedDelayIndex = 0;

        mixTargets.forEach((card) => {
          const itemCategory = card.getAttribute('data-category');
          
          if (activeFilterValue === 'all' || itemCategory === activeFilterValue) {
            card.classList.remove('is-hidden');
            card.style.animation = 'none';
            // Trigger browser reflow to reset CSS transition states dynamically
            card.offsetHeight; 
            card.style.animation = `itemFadeSequence 0.4s cubic-bezier(0.25, 1, 0.5, 1) both`;
            card.style.animationDelay = `${sequencedDelayIndex * 0.06}s`;
            sequencedDelayIndex++;
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // 8. ASYNCHRONOUS FORM SUBMISSIONS via FORMSPREE
  const contactForm = document.getElementById('portfolioContactForm');
  const statusBox = document.getElementById('formStatusMessage');

  if (contactForm && statusBox) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      
      fetch(event.target.action, {
        method: contactForm.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        statusBox.style.display = 'block';
        statusBox.style.padding = '10px';
        statusBox.style.marginTop = '10px';
        statusBox.style.borderRadius = '5px';

        if (response.ok) {
          statusBox.style.background = '#28a745';
          statusBox.style.color = '#ffffff';
          statusBox.innerHTML = 'Thanks! Your message was sent successfully.';
          contactForm.reset();
        } else {
          statusBox.style.background = '#dc3545';
          statusBox.style.color = '#ffffff';
          statusBox.innerHTML = 'Oops! There was a problem submitting your message.';
        }
      }).catch(() => {
        statusBox.style.display = 'block';
        statusBox.style.background = '#dc3545';
        statusBox.style.color = '#ffffff';
        statusBox.innerHTML = 'Oops! There was a network problem submitting your message.';
      });
    });
  }
});