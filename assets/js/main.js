const nav = document.querySelector('nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const hero = document.querySelector('.hero');

const toggleNav = () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
};

if (menuToggle) {
  menuToggle.addEventListener('click', toggleNav);
}

navLinks.forEach((link) =>
  link.addEventListener('click', () => {
    if (nav.classList.contains('open')) toggleNav();
  })
);

window.addEventListener('DOMContentLoaded', () => {
  if (hero) {
    requestAnimationFrame(() => hero.classList.add('loaded'));
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
});

// Gallery filtering
const tabs = document.querySelectorAll('.tab');
const galleryItems = document.querySelectorAll('.gallery-item');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.category;
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    galleryItems.forEach((item) => {
      const matches = category === 'all' || item.dataset.category === category;
      item.style.display = matches ? 'block' : 'none';
    });
  });
});

// Lightbox
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox img');
const lightboxClose = document.querySelector('.lightbox button');

const openLightbox = (src, alt) => {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  lightboxClose?.focus();
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
};

galleryItems.forEach((item) => {
  const img = item.querySelector('img');
  item.addEventListener('click', () => openLightbox(img.src, img.alt));
  item.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') openLightbox(img.src, img.alt);
  });
  item.setAttribute('tabindex', '0');
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox?.classList.contains('open')) {
    closeLightbox();
  }
});
