/* ============================================================
   MAIN.JS – Portfolio Interactivity
   Minggu 6: Animasi + interaktivitas JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. LIGHTBOX ───────────────────────────────────────────
  // Klik foto → tampil full layar, tutup dengan ×, klik luar, atau Escape
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn    = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg) {
    const galleryImgs = document.querySelectorAll('.gallery-img');

    galleryImgs.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    closeBtn?.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 200);
  }


  // ── 2. SCROLL-TRIGGERED FADE-IN ANIMASI ──────────────────
  // Card muncul dengan animasi halus saat di-scroll ke layar
  const animTargets = document.querySelectorAll(
    '.organization-card, .committee-card, .section-title'
  );

  if ('IntersectionObserver' in window && animTargets.length) {
    animTargets.forEach(el => {
      el.style.opacity       = '0';
      el.style.transform     = 'translateY(28px)';
      el.style.transition    = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.animationName = 'none';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animTargets.forEach(el => observer.observe(el));
  }


  // ── 3. HOVER TILT EFFECT PADA CARD ───────────────────────
  // Card sedikit miring mengikuti posisi mouse -> efek 3D ringan
  const cards = document.querySelectorAll('.organization-card, .committee-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const dx    = (e.clientX - cx) / (rect.width  / 2);
      const dy    = (e.clientY - cy) / (rect.height / 2);
      const tiltX = (-dy * 3).toFixed(2);
      const tiltY = ( dx * 3).toFixed(2);
      card.style.transform  = `translateY(-4px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = 'translateY(0) rotateX(0) rotateY(0)';
      card.style.transition = 'transform 0.4s ease';
    });
  });


  // ── 4. ACTIVE NAV LINK OTOMATIS ──────────────────────────
  // Highlight nav link sesuai halaman yang sedang dibuka
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

});