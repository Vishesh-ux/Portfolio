/* ============================================================
   SCRIPT.JS — Vishesh Portfolio
   Features:
   1. Navbar: shadow + border on scroll
   2. Mobile hamburger menu toggle
   3. Scroll-triggered reveal animations (Intersection Observer)
   4. Contact form mock submit handler
   5. Close mobile menu on nav link click
============================================================ */

/* ============================================================
   UTILITY: Wait for DOM to be ready
============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. NAVBAR — add .scrolled class when user scrolls
  ---------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });


  /* ----------------------------------------------------------
     2. HAMBURGER MENU TOGGLE (mobile)
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    // Animate hamburger lines to X when menu is open
    hamburger.setAttribute('aria-expanded', isOpen);
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity  = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity  = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu when any link is clicked
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity  = '';
      spans[2].style.transform = '';
    });
  });


  /* ----------------------------------------------------------
     3. SCROLL REVEAL ANIMATIONS (Intersection Observer)
     - All elements with class .reveal start hidden (CSS)
     - When they enter the viewport, .visible is added
     - Elements within the same section get staggered delays
  ---------------------------------------------------------- */

  // Stagger sibling .reveal elements within the same parent
  const staggerReveal = () => {
    // Find all sections and stagger their child .reveal elements
    const sections = document.querySelectorAll('section, footer');
    sections.forEach(section => {
      const revealItems = section.querySelectorAll('.reveal');
      revealItems.forEach((el, index) => {
        // Assign data-delay from 1–5 based on position in group
        const delayIndex = (index % 5) + 1;
        el.setAttribute('data-delay', delayIndex);
      });
    });
  };

  staggerReveal();

  // Intersection Observer options
  const observerOptions = {
    root: null,         // viewport
    threshold: 0.12,   // trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px'  // slight bottom offset for earlier trigger
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after animation so it doesn't re-trigger
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe every element with .reveal
  const allReveal = document.querySelectorAll('.reveal');
  allReveal.forEach(el => revealObserver.observe(el));


  /* ----------------------------------------------------------
     4. CONTACT FORM — mock submit handler
     (In production, replace with a real backend or service
      like Formspree, EmailJS, or your own API)
  ---------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {

      // Basic validation: ensure no field is empty
      const name    = contactForm.querySelector('#name').value.trim();
      const email   = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        return; // HTML5 'required' handles the browser validation UI
      }

      // Simulate sending (replace with fetch/API call in production)
      const submitBtn = contactForm.querySelector('.btn-primary');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Show success message
        formSuccess.classList.add('show');
        // Reset form
        contactForm.reset();
        // Restore button
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;

        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.classList.remove('show');
        }, 5000);
      }, 1000); // 1s simulated delay
    });
  }


  /* ----------------------------------------------------------
     5. SMOOTH ACTIVE NAV LINK HIGHLIGHT (optional enhancement)
     Highlights the nav link corresponding to the current section
  ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active from all
        navLinks.forEach(link => link.style.color = '');
        // Set active on matching link
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink && !activeLink.classList.contains('nav-cta')) {
          activeLink.style.color = 'var(--clr-text)';
        }
      }
    });
  }, {
    threshold: 0.4
  });

  sections.forEach(section => sectionObserver.observe(section));

}); // end DOMContentLoaded
