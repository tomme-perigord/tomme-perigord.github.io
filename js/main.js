/* ============================================
   TOMME LE PÉRIGORD — Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Header scroll effect --- */
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  /* --- Mobile menu --- */
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.main-nav');
  
  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
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
    const scrollPos = window.scrollY + 120;

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

  window.addEventListener('scroll', updateActiveNav);

  /* --- Reveal on scroll --- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
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

  /* --- Form handling (basic) --- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = form.querySelector('.btn-submit');
      const originalText = btn.textContent;
      btn.textContent = 'Message envoyé ✓';
      btn.style.background = '#5A7247';
      btn.style.color = '#F5ECD7';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    });
  }

  /* --- Parallax subtle on hero --- */
  const heroEtiquette = document.querySelector('.hero-etiquette');
  if (heroEtiquette) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroEtiquette.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    });
  }

  /* --- Counter animation for specs --- */
  const specValues = document.querySelectorAll('.fromage-spec-value');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const match = text.match(/(\d+)/);
        
        if (match) {
          const target = parseInt(match[0]);
          const suffix = text.replace(match[0], '');
          let current = 0;
          const increment = target / 40;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = Math.round(current) + suffix;
          }, 30);
        }
        
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  specValues.forEach(el => counterObserver.observe(el));
});
