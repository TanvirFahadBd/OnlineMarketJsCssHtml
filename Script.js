
/* ── LOADER ── */
var count = 0;
var countEl = document.getElementById('loader-count');
var countInterval = setInterval(function(){
  count = Math.min(count + Math.floor(Math.random()*4)+1, 100);
  countEl.textContent = count;
  if(count >= 100) clearInterval(countInterval);
}, 30);

setTimeout(function(){
  var loader = document.getElementById('loader');
  var main = document.getElementById('main');
  loader.style.opacity = '0';
  loader.style.pointerEvents = 'none';
  setTimeout(function(){
    loader.style.display = 'none';
    main.classList.add('visible');
    initObserver();
  }, 600);
}, 3000);

/* ── CUSTOM CURSOR ── */
var cursor = document.getElementById('cursor');
var ring = document.getElementById('cursor-ring');
var mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',function(e){
  mx=e.clientX; my=e.clientY;
  cursor.style.left=mx+'px'; cursor.style.top=my+'px';
});
(function animRing(){
  rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.cat-card,.product-card,.nav-icon,.social-btn,.filter-btn,.color-dot').forEach(function(el){
  el.addEventListener('mouseenter',function(){document.body.classList.add('hovering');});
  el.addEventListener('mouseleave',function(){document.body.classList.remove('hovering');});
});

/* ── NAV SCROLL ── */
var navbar = document.getElementById('navbar');
window.addEventListener('scroll',function(){
  if(window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  var bt = document.getElementById('back-top');
  if(window.scrollY > 400) bt.classList.add('visible');
  else bt.classList.remove('visible');
});

/* ── MOBILE NAV ── */
document.getElementById('hamburger').addEventListener('click',function(){
  document.getElementById('mobile-nav').classList.add('open');
});
document.getElementById('close-nav').addEventListener('click',function(){
  document.getElementById('mobile-nav').classList.remove('open');
});
document.querySelectorAll('.mobile-link').forEach(function(a){
  a.addEventListener('click',function(){
    document.getElementById('mobile-nav').classList.remove('open');
  });
});

/* ── SCROLL REVEAL ── */
function initObserver(){
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('revealed'); obs.unobserve(e.target); }
    });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });
}

/* ── FILTER BUTTONS ── */
function filterProducts(btn, cat){
  document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  var cards = document.querySelectorAll('.product-card');
  cards.forEach(function(c,i){
    c.style.animation='none';
    c.style.opacity='0';
    c.style.transform='translateY(20px)';
    setTimeout(function(){
      c.style.animation='';
      c.style.opacity='1';
      c.style.transform='translateY(0)';
      c.style.transition='opacity 0.4s ease '+(i*0.05)+'s, transform 0.4s ease '+(i*0.05)+'s';
    },50);
  });
}

/* ── COUNTDOWN TIMER ── */
var endTime = Date.now() + (8*3600+34*60)*1000;
function updateCountdown(){
  var diff = Math.max(0, endTime - Date.now());
  var h = Math.floor(diff/3600000);
  var m = Math.floor((diff%3600000)/60000);
  var s = Math.floor((diff%60000)/1000);
  document.getElementById('cd-h').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-m').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-s').textContent = String(s).padStart(2,'0');
}
setInterval(updateCountdown,1000);
updateCountdown();

/* ── NEWSLETTER SUBMIT ── */
document.querySelector('.newsletter-submit').addEventListener('click',function(){
  var input = document.querySelector('.newsletter-input');
  if(input.value && input.value.includes('@')){
    this.textContent='✓ Subscribed!';
    this.style.background='#2a6a3a';
    this.style.color='#fff';
    input.value='';
    setTimeout(function(){
      document.querySelector('.newsletter-submit').textContent='Subscribe';
      document.querySelector('.newsletter-submit').style.background='';
      document.querySelector('.newsletter-submit').style.color='';
    },3000);
  } else {
    input.style.borderLeft='2px solid #c0392b';
    setTimeout(function(){ input.style.borderLeft=''; },1200);
  }
});

/* ── WISHLIST TOGGLE ── */
document.querySelectorAll('.wishlist-btn').forEach(function(btn){
  btn.addEventListener('click',function(e){
    e.stopPropagation();
    var svg = this.querySelector('svg');
    var active = svg.getAttribute('data-active') === '1';
    svg.style.fill = active ? 'none' : 'var(--gold)';
    svg.style.stroke = active ? 'var(--white)' : 'var(--gold)';
    svg.setAttribute('data-active', active ? '0' : '1');
  });
});
