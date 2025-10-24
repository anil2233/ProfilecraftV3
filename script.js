
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
