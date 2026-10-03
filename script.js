const menuBtn=document.querySelector('.menu-btn');
const mobileMenu=document.querySelector('.mobile-menu');

window.addEventListener('load',()=>{
  document.body.classList.remove('site-loading');
});

if(menuBtn){
  menuBtn.addEventListener('click',()=>{
    const open=mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',String(open));
    menuBtn.textContent=open?'×':'☰';
  });
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    mobileMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.textContent='☰';
  }));
}

/* Scroll reveal */
const revealItems=document.querySelectorAll('.reveal,.reveal-stagger');
const revealObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.14,rootMargin:'0px 0px -40px 0px'});
revealItems.forEach(el=>revealObserver.observe(el));

/* Ambient luxury particles */
const particleField=document.querySelector('.ambient-particles');
if(particleField && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  for(let i=0;i<28;i++){
    const p=document.createElement('i');
    p.style.left=Math.random()*100+'%';
    p.style.top=(70+Math.random()*45)+'%';
    p.style.animationDuration=(8+Math.random()*13)+'s';
    p.style.animationDelay=(-Math.random()*15)+'s';
    p.style.transform=`scale(${.5+Math.random()*.9})`;
    particleField.appendChild(p);
  }
}

/* Desktop cursor aura */
const cursorGlow=document.querySelector('.cursor-glow');
if(cursorGlow && window.matchMedia('(pointer:fine)').matches){
  window.addEventListener('pointermove',e=>{
    cursorGlow.style.left=e.clientX+'px';
    cursorGlow.style.top=e.clientY+'px';
  },{passive:true});
}

/* Gentle 3D tilt for the hero card */
const card=document.querySelector('.magnetic-card');
if(card && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  card.addEventListener('pointermove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.animationPlayState='paused';
    card.style.transform=`perspective(900px) rotateX(${y*-7}deg) rotateY(${x*9}deg) rotateZ(-2deg) translateY(-5px)`;
  });
  card.addEventListener('pointerleave',()=>{
    card.style.animationPlayState='running';
    card.style.transform='';
  });
}

/* FAQ accessibility */
document.querySelectorAll('details').forEach(d=>{
  d.addEventListener('toggle',()=>{
    if(d.open) document.querySelectorAll('details').forEach(other=>{if(other!==d)other.removeAttribute('open')});
  });
});

document.getElementById('year').textContent=new Date().getFullYear();
