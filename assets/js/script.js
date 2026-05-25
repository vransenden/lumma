document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCustomCursor();
  initScrollHeader();
  initMobileMenu();
  initScrollReveal();
  initPortfolioFilter();
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
  const hoverElements = document.querySelectorAll('a, button, .filter-btn, .portfolio-link, input, textarea, .testimonial-control-btn');
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

/* --- DYNAMIC PORTFOLIO INTERACTIVE FILTER --- */
function initPortfolioFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
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
  const slides = document.querySelectorAll('.testimonial-slide');
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
  const openButtons = document.querySelectorAll('.portfolio-link');

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
