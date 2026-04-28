/* ============================================
   Rushikesh Thakare — PORTFOLIO JS v2
   ============================================ */

// ---- SCROLL PROGRESS ----
const bar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  bar.style.width = pct + '%';
});

// ---- CUSTOM CURSOR ----
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animCursor() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
  if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => ring && (ring.style.transform = 'translate(-50%,-50%) scale(1.6)'));
  el.addEventListener('mouseleave', () => ring && (ring.style.transform = 'translate(-50%,-50%) scale(1)'));
});

// ---- NAVBAR ----
const nav = document.getElementById('navbar');
const navAs = document.querySelectorAll('.nav-links a');
const sects = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  let cur = '';
  sects.forEach(s => { if (window.scrollY >= s.offsetTop - 90) cur = s.id; });
  navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});

// ---- HAMBURGER ----
const ham = document.getElementById('ham');
const mob = document.getElementById('mobMenu');
ham && ham.addEventListener('click', () => mob.classList.toggle('open'));
document.querySelectorAll('.mlink').forEach(l => l.addEventListener('click', () => mob.classList.remove('open')));

// ---- THEME TOGGLE ----
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
html.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
themeBtn && themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ---- TYPING EFFECT ----
const phrases = [
  'Building scalable backend systems.',
  'Crafting high-performance REST APIs.',
  'Optimizing systems by 30–40%.',
  'Handling 10+ Crore records daily.',
  'AIR 94 — ACM-ICPC Kanpur.'
];
let pi = 0, ci = 0, del = false;
const typed = document.getElementById('typedText');
function typeLoop() {
  const cur = phrases[pi];
  if (!del) {
    typed.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { del = true; setTimeout(typeLoop, 2000); return; }
  } else {
    typed.textContent = cur.slice(0, --ci);
    if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(typeLoop, del ? 38 : 65);
}
typeLoop();

// ---- ANIMATED COUNTERS ----
function animCount(el, target, dur = 1600) {
  const step = target / (dur / 16);
  let val = 0;
  const go = () => {
    val = Math.min(val + step, target);
    el.textContent = Math.floor(val);
    if (val < target) requestAnimationFrame(go);
  };
  go();
}
let countersRan = false;
function tryCounters() {
  if (countersRan) return;
  const hero = document.getElementById('hero');
  if (!hero) return;
  if (hero.getBoundingClientRect().top < window.innerHeight) {
    countersRan = true;
    document.querySelectorAll('.counter').forEach(el => {
      animCount(el, parseInt(el.dataset.t, 10));
    });
  }
}
window.addEventListener('scroll', tryCounters);
tryCounters();

// ---- HERO CANVAS (particle dots) ----
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    pts = [];
    const count = Math.floor((W * H) / 14000);
    for (let i = 0; i < count; i++) {
      pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
        r: Math.random() * 1.5 + .5, o: Math.random() * .5 + .1
      });
    }
  }
  resize();
  window.addEventListener('resize', resize);
  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59,130,246,${p.o})`;
      ctx.fill();
    });
    // draw subtle lines between close dots
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(59,130,246,${0.04 * (1 - dist/100)})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ---- INTERSECTION OBSERVER ----
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach((el, i) => {
  el.style.transitionDelay = (i % 5) * 60 + 'ms';
  obs.observe(el);
});

// ---- LEETCODE BARS ANIMATION ----
const lcObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.lcb-f').forEach(b => {
        b.style.width = b.dataset.w + '%';
      });
      lcObs.disconnect();
    }
  });
}, { threshold: 0.5 });
const lcCard = document.querySelector('.lc-card');
if (lcCard) lcObs.observe(lcCard);

// ---- SCROLL SMOOTH ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ---- COPY TO CLIPBOARD ----
function copyText(text, btn) {
  const original = btn.innerHTML;
  navigator.clipboard.writeText(text).then(() => {
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
    btn.style.borderColor = '#10b981';
    setTimeout(() => { btn.innerHTML = original; btn.style.borderColor = ''; }, 1500);
  }).catch(() => {
    const el = document.createElement('textarea');
    el.value = text; document.body.appendChild(el); el.select();
    document.execCommand('copy'); document.body.removeChild(el);
  });
}

// ---- CONTACT FORM ----
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('fn').value.trim();
  const email = document.getElementById('fe').value.trim();
  const msg = document.getElementById('fm').value.trim();
  let ok = true;
  document.getElementById('fnErr').textContent = '';
  document.getElementById('feErr').textContent = '';
  document.getElementById('fmErr').textContent = '';

  if (!name || name.length < 2) { document.getElementById('fnErr').textContent = 'Enter a valid name.'; ok = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('feErr').textContent = 'Enter a valid email.'; ok = false; }
  if (!msg || msg.length < 10) { document.getElementById('fmErr').textContent = 'Message must be at least 10 characters.'; ok = false; }
  if (!ok) return;

  const btn = e.target.querySelector('.form-submit');
  btn.disabled = true; btn.textContent = 'Sending...';
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = 'Send Message <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    document.getElementById('fn').value = '';
    document.getElementById('fe').value = '';
    document.getElementById('fm').value = '';
    const ok = document.getElementById('formOk');
    ok.style.display = 'flex'; setTimeout(() => ok.style.display = 'none', 4500);
  }, 1200);
}

// ---- HERO ENTRY ANIMATION ----
window.addEventListener('load', () => {
  const left = document.querySelector('.hero-left');
  const right = document.querySelector('.hero-right');
  [left, right].forEach((el, i) => {
    if (!el) return;
    el.style.cssText = `opacity:0;transform:translateY(22px);transition:opacity .8s ease ${i*.18}s,transform .8s ease ${i*.18}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1'; el.style.transform = 'translateY(0)';
    }));
  });
});
