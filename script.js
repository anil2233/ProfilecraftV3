/* ============================
   ProfileCraft — minimal JS
   - burger menu
   - image lightbox (pc-lightbox)
   ============================ */

// Burger (mobile nav)
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
if (burger && nav) {
  burger.addEventListener('click', () => nav.classList.toggle('show'));
}

// -------- Lightbox ----------
const lb = document.getElementById('lightbox');
const lbImg = lb ? lb.querySelector('.pc-lightbox__img') : null;
const btnClose = lb ? lb.querySelector('.pc-lightbox__close') : null;
const btnPrev = lb ? lb.querySelector('.pc-lightbox__prev') : null;
const btnNext = lb ? lb.querySelector('.pc-lightbox__next') : null;

// Collect all clickable images on the page (hero + thumbs + gallery)
const clickables = Array.from(document.querySelectorAll(
  '.hero-main img, .hero-thumbs img, .gallery-grid img, .figure img'
));

let currentIndex = -1;

function openLightbox(index) {
  if (!lb || !lbImg) return;
  currentIndex = index;
  const src = clickables[currentIndex].getAttribute('src');
  const alt = clickables[currentIndex].getAttribute('alt') || '';
  lbImg.src = src;
  lbImg.alt = alt;
  lb.classList.add('is-open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // prevent page scroll
}

function closeLightbox() {
  if (!lb) return;
  lb.classList.remove('is-open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showPrev() {
  if (currentIndex <= 0) currentIndex = clickables.length - 1;
  else currentIndex -= 1;
  openLightbox(currentIndex);
}

function showNext() {
  if (currentIndex >= clickables.length - 1) currentIndex = 0;
  else currentIndex += 1;
  openLightbox(currentIndex);
}

// Wire up thumbnails
clickables.forEach((img, i) => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', (e) => {
    e.preventDefault();
    openLightbox(i);
  });
});

// Buttons
if (btnClose) btnClose.addEventListener('click', closeLightbox);
if (btnPrev) btnPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
if (btnNext) btnNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

// Backdrop click closes (but not clicks on the image/buttons)
if (lb) {
  lb.addEventListener('click', (e) => {
    const clickedInsideImage = e.target === lbImg || e.target.closest('.pc-lightbox__btn');
    if (!clickedInsideImage) closeLightbox();
  });
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
  if (!lb || !lb.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});



