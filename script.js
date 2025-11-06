
const burger=document.querySelector('.burger'); const nav=document.querySelector('.nav');
burger&&burger.addEventListener('click',()=>nav.classList.toggle('show'));
const lightbox=document.querySelector('.lightbox'); const lbImg=document.querySelector('.lightbox img');
const prevBtn=document.querySelector('.lb-prev'); const nextBtn=document.querySelector('.lb-next'); const closeBtn=document.querySelector('.lb-close');
let galleryNodes=[...document.querySelectorAll('.figure img')]; let idx=0;
function openLB(i){ idx=i; lbImg.src=galleryNodes[idx]?.dataset.full||galleryNodes[idx]?.src||''; lightbox&&lightbox.classList.add('show'); }
function closeLB(){ lightbox&&lightbox.classList.remove('show'); }
function navLB(d){ idx=(idx+d+galleryNodes.length)%galleryNodes.length; lbImg.src=galleryNodes[idx]?.dataset.full||galleryNodes[idx]?.src||''; }
galleryNodes.forEach((img,i)=>{ img.addEventListener('click',()=>openLB(i)); img.setAttribute('tabindex','0'); img.addEventListener('keydown',e=>{if(e.key==='Enter')openLB(i);}); });
prevBtn&&prevBtn.addEventListener('click',()=>navLB(-1)); nextBtn&&nextBtn.addEventListener('click',()=>navLB(1)); closeBtn&&closeBtn.addEventListener('click',closeLB);
lightbox&&lightbox.addEventListener('click',e=>{ if(e.target===lightbox) closeLB(); });
let sx=0; lightbox&&lightbox.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
lightbox&&lightbox.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx; if(Math.abs(dx)>40) navLB(dx<0?1:-1);},{passive:true});
// Simple lightbox functionality
document.querySelectorAll('.hero-thumb').forEach(img => {
  img.addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  });
});

document.querySelector('.close-btn').addEventListener('click', () => {
  document.getElementById('lightbox').style.display = 'none';
});

document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    e.currentTarget.style.display = 'none';
  }
});/* === Lightbox (ProfileCraft) === */
(() => {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  const img = lb.querySelector('.pc-lightbox__img');
  const btnClose = lb.querySelector('.pc-lightbox__close');
  const btnPrev  = lb.querySelector('.pc-lightbox__prev');
  const btnNext  = lb.querySelector('.pc-lightbox__next');

  let currentIndex = -1;
  let groupName = null;
  let groupEls = [];

  function setGroup(name) {
    groupName = name;
    groupEls = Array.from(document.querySelectorAll(`[data-lightbox="${name}"]`));
  }

  function show(index) {
    if (!groupEls.length) return;
    currentIndex = (index + groupEls.length) % groupEls.length; // wrap
    const a = groupEls[currentIndex];
    const full = a.getAttribute('href');
    const alt = (a.querySelector('img')?.getAttribute('alt')) || '';
    img.src = full;
    img.alt = alt;
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    btnClose.focus();
  }

  function close() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    img.removeAttribute('src');
    img.alt = '';
  }

  // Delegate clicks on anchors with data-lightbox
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-lightbox]');
    if (!link) return;
    e.preventDefault();
    const name = link.getAttribute('data-lightbox') || 'gallery';
    setGroup(name);
    const idx = groupEls.indexOf(link);
    show(idx);
  });

  // Buttons
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => show(currentIndex - 1));
  btnNext.addEventListener('click', () => show(currentIndex + 1));

  // Backdrop click (not on image/buttons)
  lb.addEventListener('click', (e) => {
    const insideImage = e.target === img;
    const onButton = e.target.closest('.pc-lightbox__btn');
    if (!insideImage && !onButton) close();
  });

  // Keyboard: Esc to close, arrows to navigate
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
  });
})();/* === Lightbox controls (close/backdrop/Esc) === */
(() => {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  const img = lb.querySelector('.pc-lightbox__img');
  const btnClose = lb.querySelector('.pc-lightbox__close');
  const btnPrev  = lb.querySelector('.pc-lightbox__prev');
  const btnNext  = lb.querySelector('.pc-lightbox__next');

  // Close function
  function closeLB() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    img.removeAttribute('src');
    img.alt = '';
  }

  // Hook up buttons (close/prev/next are safe even if unused)
  btnClose?.addEventListener('click', closeLB);
  btnPrev?.addEventListener('click', (e) => e.stopPropagation());
  btnNext?.addEventListener('click', (e) => e.stopPropagation());

  // Backdrop click closes (clicks on image/buttons do not)
  lb.addEventListener('click', (e) => {
    const onBtn = e.target.closest('.pc-lightbox__btn');
    if (e.target === img || onBtn) return;
    closeLB();
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLB();
  });
})();


