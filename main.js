// ---------- Hero: colour switching ----------
const hero = document.getElementById('hero');
const heroImages = hero.querySelectorAll('.hero-img img');
const swatches = hero.querySelectorAll('.swatch');
const themes = ['orange', 'grey', 'green'];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let current = 0;
let timer = null;

function showTheme(index) {
  current = index;
  const theme = themes[index];
  hero.dataset.theme = theme;
  heroImages.forEach((img) => img.classList.toggle('show', img.dataset.theme === theme));
  swatches.forEach((s) => s.setAttribute('aria-pressed', String(s.dataset.theme === theme)));
}

function startCycle() {
  if (reduceMotion) return;          // respect "reduce motion" settings
  clearInterval(timer);
  timer = setInterval(() => showTheme((current + 1) % themes.length), 5000);
}

swatches.forEach((s) =>
  s.addEventListener('click', () => {
    showTheme(themes.indexOf(s.dataset.theme));
    startCycle();                    // restart the 5s timer after a manual pick
  })
);
startCycle();

// ---------- Waitlist form ----------
const form = document.getElementById('signup');
const emailInput = document.getElementById('email');
const msg = document.getElementById('signup-msg');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (!emailPattern.test(email)) {
    msg.textContent = 'Enter a valid email address, like name@example.com.';
    msg.className = 'error';
    emailInput.focus();
    return;
  }

  // No backend yet: this just confirms to the visitor.
  msg.textContent = 'You are on the list. We will email ' + email + ' when HeadZone is in stock.';
  msg.className = 'ok';
  form.reset();
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
