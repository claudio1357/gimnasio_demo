 // ── Hero background animation
    window.addEventListener('load', () => {
      document.getElementById('heroBg').classList.add('loaded');
    });

    // ── Navbar scroll behavior
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Navbar scroll class
      navbar.classList.toggle('scrolled', scrollY > 60);

      // Progress bar
      progressBar.style.width = `${(scrollY / docHeight) * 100}%`;

      // Active nav link
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        const link = document.querySelector(`.nav-links a[href="#${section.id}"]`);
        if (link) {
          link.classList.toggle('active', scrollY >= top && scrollY < bottom);
        }
      });
    });

    // ── Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    function closeMenu() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }

    // ── Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ── Ticker duplication (infinite scroll)
    const ticker = document.getElementById('ticker');
    if (ticker) {
      const clone = ticker.innerHTML;
      ticker.innerHTML += clone; // duplicate for seamless loop
    }

    // ── Form submit handler
    function handleFormSubmit(e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value.trim();
      const email  = document.getElementById('email').value.trim();

      if (!nombre || !email) {
        alert('Por favor completa los campos requeridos: Nombre y Correo.');
        return;
      }

      // Simulate form send
      const form    = document.getElementById('contactForm');
      const success = document.getElementById('formSuccess');

      form.style.opacity = '0';
      form.style.transform = 'translateY(-20px)';
      form.style.transition = 'all 0.4s ease';

      setTimeout(() => {
        form.style.display = 'none';
        success.classList.add('show');
      }, 400);
    }

    // ── Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // ── Parallax on hero
    window.addEventListener('scroll', () => {
      const heroBg = document.getElementById('heroBg');
      if (heroBg && window.scrollY < window.innerHeight) {
        heroBg.style.transform = `scale(1) translateY(${window.scrollY * 0.3}px)`;
      }
    });