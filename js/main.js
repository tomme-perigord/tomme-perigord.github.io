/* ============================================
   TOMME LE PÉRIGORD — Cave Dorée Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Scroll progress bar --- */
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.prepend(progressBar);

  function updateProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  }

  /* --- Header scroll effect --- */
  const header = document.querySelector('.site-header');

  function updateHeader() {
    if (window.pageYOffset > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  /* --- Combined scroll handler (one listener for performance) --- */
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        updateHeader();
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* --- Mobile menu --- */
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.main-nav');

  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Active nav link --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.main-nav a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  /* --- Reveal on scroll (enhanced with varied animations) --- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  /* --- Counter animation with easing --- */
  const specValues = document.querySelectorAll('.fromage-spec-value');

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const match = text.match(/([\d.]+)/);

        if (match) {
          const target = parseFloat(match[0]);
          const isFloat = match[0].includes('.');
          const suffix = text.replace(match[0], '');
          const duration = 1200;
          const startTime = performance.now();

          function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = target * easedProgress;

            if (isFloat) {
              el.textContent = current.toFixed(1) + suffix;
            } else {
              el.textContent = Math.round(current) + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }

          requestAnimationFrame(animate);
        }

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  specValues.forEach(el => counterObserver.observe(el));

  /* --- Also animate chiffre values --- */
  const chiffreValues = document.querySelectorAll('.chiffre-value');

  const chiffreObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const match = text.match(/([\d.]+)/);

        if (match) {
          const target = parseFloat(match[0]);
          const isFloat = match[0].includes('.');
          const suffix = text.replace(match[0], '');
          const duration = 1400;
          const startTime = performance.now();

          function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = target * easedProgress;

            if (isFloat) {
              el.textContent = current.toFixed(1) + suffix;
            } else {
              el.textContent = Math.round(current) + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }

          requestAnimationFrame(animate);
        }

        chiffreObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  chiffreValues.forEach(el => chiffreObserver.observe(el));

  /* --- Parallax on hero etiquette --- */
  const heroEtiquette = document.querySelector('.hero-etiquette');
  if (heroEtiquette) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        const parallaxY = scrolled * 0.2;
        const scale = 1 - scrolled * 0.0003;
        const opacity = 1 - scrolled * 0.001;
        heroEtiquette.style.transform = `translateY(${parallaxY}px) scale(${Math.max(scale, 0.85)})`;
        heroEtiquette.style.opacity = Math.max(opacity, 0);
      }
    }, { passive: true });
  }

  /* --- Form handling --- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('.btn-submit');
      const originalText = btn.textContent;

      btn.textContent = 'Envoy\u00e9 \u2713';
      btn.style.background = '#4A6138';
      btn.style.color = '#F5EDDA';
      btn.style.transform = 'scale(0.98)';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.transform = '';
        form.reset();
      }, 3000);
    });
  }

  /* --- Magnetic effect on CTA buttons --- */
  const magneticBtns = document.querySelectorAll('.btn-rejoindre, .btn-submit, .btn-cta');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { btn.style.transition = ''; }, 400);
    });
  });

  /* --- Init --- */
  updateProgress();
  updateHeader();
});
