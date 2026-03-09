/* ===========================
   PORTFOLIO — java.js
=========================== */

// ───────────────────────────
// 1. CUSTOM CURSOR
// ───────────────────────────
(function initCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Cursor scale on hover
  const interactables = document.querySelectorAll('a, button, .project-card, .skill-chip, .contact-link-item');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      cursor.style.background = 'var(--accent-pink)';
      follower.style.transform = 'translate(-50%,-50%) scale(0.5)';
      follower.style.borderColor = 'var(--accent-pink)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.background = 'var(--purple-bright)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.borderColor = 'var(--purple-bright)';
    });
  });
})();

// ───────────────────────────
// 2. SCROLL REVEAL
// ───────────────────────────
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();

// ───────────────────────────
// 3. ACTIVE NAV LINK
// ───────────────────────────
(function initActiveNav() {
  const path = window.location.pathname;
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (path.endsWith(href) || (path === '/' && href === 'index.html')) {
      link.classList.add('active');
    } else if (path.includes('about') && href.includes('about')) {
      link.classList.add('active');
    } else if (path.includes('project') && href.includes('project')) {
      link.classList.add('active');
    } else if (path.includes('contact') && href.includes('contact')) {
      link.classList.add('active');
    }
  });
})();

// ───────────────────────────
// 4. NAV SCROLL EFFECT
// ───────────────────────────
(function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(13,0,16,0.9)';
      nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      nav.style.background = 'rgba(13,0,16,0.6)';
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });
})();

// ───────────────────────────
// 5. ANIMATED COUNTER
// ───────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * ease) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

// ───────────────────────────
// 6. PARALLAX ORB
// ───────────────────────────
(function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 8;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  }, { passive: true });
})();

// ───────────────────────────
// 7. TYPING EFFECT
// ───────────────────────────
(function initTyping() {
  const el = document.querySelector('.typing-text');
  if (!el) return;

  const words = el.dataset.words ? el.dataset.words.split(',') : ['Developer', 'Designer', 'Creator'];
  let wordIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    const word = words[wordIdx];
    if (!isDeleting) {
      el.textContent = word.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === word.length) {
        isDeleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = word.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
    }
    setTimeout(type, isDeleting ? 60 : 100);
  }
  setTimeout(type, 800);
})();

// ───────────────────────────
// 8. FORM SUBMIT MOCK
// ───────────────────────────
(function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>Gönderildi! ✓</span>';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.style.boxShadow = '0 0 30px rgba(16,185,129,0.4)';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.style.boxShadow = '';
      form.reset();
    }, 3000);
  });
})();

// ───────────────────────────
// 9. PAGE LOAD ANIMATION
// ───────────────────────────
(function initPageLoad() {
  document.body.style.opacity = '0';
  window.addEventListener('DOMContentLoaded', () => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  });

  if (document.readyState !== 'loading') {
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
  }
})();

// ───────────────────────────
// 10. MAGNETIC BUTTONS
// ───────────────────────────
(function initMagneticButtons() {
  const btns = document.querySelectorAll('.btn-primary, .btn-secondary');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();
