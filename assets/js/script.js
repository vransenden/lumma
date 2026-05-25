document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCustomCursor();
  initScrollHeader();
  initMobileMenu();
  initScrollReveal();
  initLineMaskReveal();
  initHorizontalScroll();
  initInteractiveCanvas();
  initPricingEstimator();
  initLiveClock();
  initMagneticTarget();
  initBentoTilt();
  initTestimonialsSlider();
  initProjectModal();
});

/* --- PRELOADER LOGIC --- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1500); // 1.5s allows progress bar animation to complete smoothly
  });
}

/* --- CUSTOM CURSOR LOGIC --- */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-follower');
  if (!cursor || !follower) return;

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth lagging follower effect using animation loop
  function updateFollower() {
    const ease = 0.15;
    followerX += (mouseX - followerX) * ease;
    followerY += (mouseY - followerY) * ease;
    
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    
    requestAnimationFrame(updateFollower);
  }
  updateFollower();

  // Hover states for interactive elements
  const hoverElements = document.querySelectorAll('a, button, .filter-btn, .portfolio-bento-link, input, textarea, .testimonial-bento-btn');
  hoverElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      follower.classList.add('hovered');
    });
    elem.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      follower.classList.remove('hovered');
    });
  });
}

/* --- SCROLLING HEADER BACKGROUND --- */
function initScrollHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --- MOBILE RESPONSIVE NAVIGATION MENU --- */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  // Close nav on click of link
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      toggle.classList.remove('active');
    });
  });
}

/* --- INTERSECTION OBSERVER FOR SCROLL REVEALS --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target); // Reveal once only
      }
    });
  }, observerOptions);

  reveals.forEach(el => observer.observe(el));
}

/* --- LINE MASK REVEAL ANIMATIONS --- */
function initLineMaskReveal() {
  const masks = document.querySelectorAll('.line-mask');
  if (masks.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  masks.forEach(m => observer.observe(m));
}

/* --- PREMIUM STICKY HORIZONTAL SCROLL ENGINE --- */
function initHorizontalScroll() {
  const container = document.getElementById('work-horizontal-container');
  const track = document.getElementById('horizontal-track');
  if (!container || !track) return;

  function handleScroll() {
    // Disable horizontal scrolling on mobile/tablet widths
    if (window.innerWidth <= 1100) {
      track.style.transform = 'none';
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top;
    const containerHeight = containerRect.height;
    const windowHeight = window.innerHeight;

    // Calculate scroll progress within the horizontal container range
    const scrollRange = containerHeight - windowHeight;
    if (scrollRange <= 0) return;

    // Clamp progress between 0 and 1
    let progress = -containerTop / scrollRange;
    progress = Math.max(0, Math.min(1, progress));

    // Calculate total track width and horizontal translation offset
    const trackWidth = track.scrollWidth;
    const maxTranslation = trackWidth - window.innerWidth + (window.innerWidth * 0.2); // includes track margins

    const translation = progress * maxTranslation;
    track.style.transform = `translateX(-${translation}px)`;
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  handleScroll(); // Trigger initial position check
}

/* --- DYNAMIC PORTFOLIO INTERACTIVE FILTER --- */
function initPortfolioFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-bento-card');
  if (buttons.length === 0 || items.length === 0) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active filter button style
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          // Fade-in animation sequence
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Fade-out animation sequence
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 350);
        }
      });
    });
  });
}

/* --- TESTIMONIALS SLIDER NAVIGATION --- */
function initTestimonialsSlider() {
  const container = document.getElementById('testimonials-container');
  const slides = document.querySelectorAll('.testimonial-bento-slide');
  const btnPrev = document.getElementById('testimonial-prev');
  const btnNext = document.getElementById('testimonial-next');
  if (!container || slides.length === 0 || !btnPrev || !btnNext) return;

  let currentIndex = 0;

  function updateSlider() {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1; // Loop back to end
    }
    updateSlider();
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back to start
    }
    updateSlider();
  });
}

/* --- DYNAMIC CASE STUDY DETAIL MODAL --- */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('.portfolio-bento-link');

  if (!modal || !backdrop || !closeBtn || openButtons.length === 0) return;

  // Case Study data library
  const projectData = {
    lumina: {
      title: 'Lumina Analytics Dashboard',
      category: 'UI/UX Design',
      client: 'Lumina Tech Inc.',
      services: 'Interactive Wireframing & Design Token Systems',
      year: '2026',
      frameworks: 'Figma / Glassmorphic Custom Elements',
      desc: 'Lumina Analytics is a premium SaaS telemetry portal that tracks complex cloud resources. This project focused on organizing extremely dense data sets into readable layouts, using subtle glows, harmonic color contrast, and custom charts designed to increase engagement and reduce data fatigue.'
    },
    aether: {
      title: 'Aether Intelligent AI Portal',
      category: 'Development',
      client: 'Aether Systems LLC',
      services: 'Frontend Architecture & Animated Interface Development',
      year: '2026',
      frameworks: 'HTML5 / CSS Custom Variables / Vanilla ES6',
      desc: 'Aether AI presents complex artificial neural node patterns visually in the browser. Using purely CSS animations and high-performance DOM manipulation, we developed an incredibly smooth responsive workspace showcasing live data feeds and fluid AI generated assets.'
    },
    vesper: {
      title: 'Vesper Web3 Protocol Identity',
      category: 'Branding',
      client: 'Vesper Labs',
      services: 'Brand Guidelines & Interactive Styleguides',
      year: '2025',
      frameworks: 'Brand Board / Web Typography / Custom SVGs',
      desc: 'A complete crypto protocol branding system featuring sharp custom SVGs, futuristic typography, and glowing dark violet design sheets. This case study details the brand architecture, solar icon grids, and social assets shipped for active ThemeForest templates.'
    },
    solas: {
      title: 'Solas Premium Agency Site',
      category: 'UI/UX Design',
      client: 'Solas Creative Lab',
      services: 'Web Design & Interactive Layouts',
      year: '2026',
      frameworks: 'Figma / UI Design Systems',
      desc: 'Solas is a premium portfolio experience built specifically for high-end boutique creative agencies. The UX layout highlights gorgeous glassmorphic grid systems, bespoke layout structures, and fluid custom cursor interactions to showcase high-fidelity media assets.'
    },
    nox: {
      title: 'Nox High-Fashion Store',
      category: 'Development',
      client: 'Nox E-Commerce Group',
      services: 'Responsive Coding & Transition Optimization',
      year: '2026',
      frameworks: 'HTML5 / CSS Grid / JS Easing Libraries',
      desc: 'Nox is a minimalist high-fashion commerce portal. We coded micro-animations, slide reveals, fast loading states, and custom cart actions to give mobile customers a premium luxury boutique shopping experience.'
    },
    helios: {
      title: 'Helios Corporate Guidelines',
      category: 'Branding',
      client: 'Helios Solar Tech',
      services: 'Visual Identity & Marketing Materials',
      year: '2025',
      frameworks: 'Adobe Suite / Digital Typography Rules',
      desc: 'Helios solar tech brand identity explores clean geometric forms. The visual system aligns sustainability with ultra-modern premium tech motifs, including detailed guidelines on dark/light contrast rules, responsive grids, and font hierarchy.'
    }
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-id');
      const data = projectData[projId];

      if (!data) return;

      // Populate modal fields
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-category').textContent = data.category;
      document.getElementById('modal-client').textContent = data.client;
      document.getElementById('modal-services').textContent = data.services;
      document.getElementById('modal-year').textContent = data.year;
      document.getElementById('modal-frameworks').textContent = data.frameworks;
      document.getElementById('modal-desc').textContent = data.desc;

      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Resume background scrolling
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --- INTERACTIVE CANVAS BLUEPRINT TRACKING --- */
function initInteractiveCanvas() {
  const card = document.getElementById('hero-doodle-card');
  const coordTag = document.getElementById('doodle-coords');
  if (!card || !coordTag) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = Math.max(0, (e.clientX - rect.left)).toFixed(1);
    const y = Math.max(0, (e.clientY - rect.top)).toFixed(1);
    coordTag.textContent = `X: ${x} Y: ${y}`;
  });

  card.addEventListener('mouseleave', () => {
    coordTag.textContent = 'X: 0.0 Y: 0.0';
  });

  // Toggle active toolbar button for elite interactive fidelity
  const toolBtns = card.querySelectorAll('.tool-btn');
  toolBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent triggering coordinate update jumps
      toolBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* --- DYNAMIC PRICING ESTIMATOR --- */
function initPricingEstimator() {
  const scopeBtns = document.querySelectorAll('.scope-btn');
  const pagesRange = document.getElementById('pages-range');
  const pagesValue = document.getElementById('pages-value');
  const addonChips = document.querySelectorAll('.addon-chip');
  const priceCounter = document.getElementById('price-counter');

  if (!priceCounter) return;

  let basePrice = 1500;
  let pageCount = 3;
  let addonsTotal = 0;
  let currentEstimatedPrice = 2250;

  function updateEstimate() {
    const costPerPage = 250;
    const targetPrice = basePrice + (pageCount * costPerPage) + addonsTotal;
    
    // Smooth price animation counter effect
    animatePriceCounter(currentEstimatedPrice, targetPrice, 400);
    currentEstimatedPrice = targetPrice;
  }

  function animatePriceCounter(start, end, duration) {
    const startTime = performance.now();
    
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing curve (easeOutCubic)
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * ease);
      
      priceCounter.textContent = `$${current.toLocaleString()}`;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        priceCounter.textContent = `$${end.toLocaleString()}`;
      }
    }
    requestAnimationFrame(update);
  }

  // Scope selectors click
  scopeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scopeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      basePrice = parseInt(btn.getAttribute('data-base'), 10);
      updateEstimate();
    });
  });

  // Pages slider input
  if (pagesRange && pagesValue) {
    pagesRange.addEventListener('input', (e) => {
      pageCount = parseInt(e.target.value, 10);
      pagesValue.textContent = `${pageCount} ${pageCount === 1 ? 'Page' : 'Pages'}`;
      updateEstimate();
    });
  }

  // Addon chips toggle
  addonChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      const premiumValue = parseInt(chip.getAttribute('data-premium'), 10);
      
      if (chip.classList.contains('active')) {
        addonsTotal += premiumValue;
      } else {
        addonsTotal -= premiumValue;
      }
      updateEstimate();
    });
  });

  // Run initial estimate calculation
  updateEstimate();
}

/* --- LIVE WORLD CLOCK (EST/NEW YORK) --- */
function initLiveClock() {
  const clockDisplay = document.getElementById('live-clock');
  if (!clockDisplay) return;

  function updateClock() {
    const now = new Date();
    // Format to Eastern Time (New York timezone)
    const options = {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    clockDisplay.textContent = formatter.format(now);
  }

  setInterval(updateClock, 1000);
  updateClock(); // first run immediately
}

/* --- MAGNETIC TARGET HOVER ENGINE --- */
function initMagneticTarget() {
  const container = document.querySelector('.magnetic-track-box');
  const target = document.getElementById('magnetic-target');
  if (!container || !target) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Pull toward cursor by 35% of the offset distance
    target.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  });

  container.addEventListener('mouseleave', () => {
    // Return target cleanly back to center
    target.style.transform = 'translate(0px, 0px)';
  });
}

/* --- 3D BENTO TILT ROTATE --- */
function initBentoTilt() {
  const bentoCards = document.querySelectorAll('.bento-card');
  
  // Disable 3D tilt on smaller/mobile widths to prevent visual glitching
  if (window.innerWidth <= 1100) return;

  bentoCards.forEach(card => {
    // Avoid tilting the horizontal ribbon or modal containers to prevent breaking horizontal scroll pins
    if (card.closest('.horizontal-scroll-sticky') || card.classList.contains('project-modal-content')) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Translate coordinates to percentage offset (-0.5 to 0.5)
      const px = (x / rect.width) - 0.5;
      const py = (y / rect.height) - 0.5;

      // Define maximum rotation angles in degrees (e.g. max 8 degrees)
      const rotateX = (-py * 8).toFixed(2);
      const rotateY = (px * 8).toFixed(2);

      // Rotate layout in 3D perspective space
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      // Restore bento card back to original default flat layout
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}
