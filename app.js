/* ==========================================================================
   Allergen & Diet Guard — Interactive Landing Page JS (Vanilla ES6)
   Audited against AGENTS-landing-page.md 2026-07-19
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Hamburger Menu ----
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu on link click (mobile UX)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Theme Toggle ----
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  const heroImg = document.getElementById('heroImage');

  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = '☀️';
    if (heroImg) heroImg.src = 'assets/screen1_light.webp';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = '🌙';
      if (heroImg) heroImg.src = 'assets/screen1.webp';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = '☀️';
      if (heroImg) heroImg.src = 'assets/screen1_light.webp';
    }
  });

  // ---- Simulator Data ----
  const products = {
    chocolate: {
      title: 'Czekolada z Orzechami',
      ean: '590000000101',
      allergens: ['nuts', 'milk'],
      dietVegan: false,
      dietVegetarian: true,
      carbs: 45,
      protein: 8,
      fat: 35,
      kcal: 530,
      hasFullData: true
    },
    oatmilk: {
      title: 'Napój Owsiany Bio',
      ean: '590000000202',
      allergens: ['gluten'],
      dietVegan: true,
      dietVegetarian: true,
      carbs: 8,
      protein: 2,
      fat: 2,
      kcal: 55,
      hasFullData: true
    },
    cookies: {
      title: 'Ciastka "Tajemnicza Receptura"',
      ean: '590000000303',
      allergens: [],
      dietVegan: null,
      dietVegetarian: null,
      carbs: 60,
      protein: 5,
      fat: 20,
      kcal: 440,
      hasFullData: false
    }
  };

  // ---- State ----
  let activeAllergens = new Set(['nuts', 'milk']);
  let activeDiet = 'vegan';
  let targetCal = 2200;
  let selectedProductKey = 'chocolate';

  // ---- DOM Elements ----
  const allergenChips = document.querySelectorAll('#allergenChips .chip');
  const simRadioCards = document.querySelectorAll('.radio-card');
  const simCalRange = document.getElementById('simCalRange');
  const calValDisplay = document.getElementById('calVal');
  const prodCards = document.querySelectorAll('.prod-card');
  const btnRunSim = document.getElementById('btnRunSim');
  const scanLaser = document.getElementById('scanLaser');

  // Result Elements
  const resBadge = document.getElementById('resBadge');
  const resEan = document.getElementById('resEan');
  const resTitle = document.getElementById('resTitle');
  const resReason = document.getElementById('resReason');
  const carbVal = document.getElementById('carbVal');
  const protVal = document.getElementById('protVal');
  const fatVal = document.getElementById('fatVal');
  const carbCircle = document.getElementById('carbCircle');
  const protCircle = document.getElementById('protCircle');
  const fatCircle = document.getElementById('fatCircle');
  const calShare = document.getElementById('calShare');
  const calBar = document.getElementById('calBar');

  // ---- Allergen Chips Toggle ----
  allergenChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const allergen = chip.dataset.allergen;
      if (activeAllergens.has(allergen)) {
        activeAllergens.delete(allergen);
        chip.classList.remove('active');
        chip.setAttribute('aria-pressed', 'false');
      } else {
        activeAllergens.add(allergen);
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
      }
      runSimulation();
    });
  });

  // ---- Diet Radios ----
  simRadioCards.forEach(card => {
    card.addEventListener('click', () => {
      simRadioCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      radio.checked = true;
      activeDiet = radio.value;
      runSimulation();
    });
  });

  // ---- Calorie Range ----
  simCalRange.addEventListener('input', (e) => {
    targetCal = parseInt(e.target.value, 10);
    calValDisplay.textContent = `${targetCal} kcal`;
    runSimulation();
  });

  // ---- Product Cards ----
  prodCards.forEach(card => {
    card.addEventListener('click', () => {
      prodCards.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      card.classList.add('active');
      card.setAttribute('aria-selected', 'true');
      selectedProductKey = card.dataset.prod;
      triggerScanAnimation();
    });
  });

  btnRunSim.addEventListener('click', () => {
    triggerScanAnimation();
  });

  function triggerScanAnimation() {
    scanLaser.classList.add('scanning');
    setTimeout(() => {
      scanLaser.classList.remove('scanning');
      runSimulation();
    }, 800);
  }

  function runSimulation() {
    const prod = products[selectedProductKey];
    resEan.textContent = prod.ean;
    resTitle.textContent = prod.title;

    // Allergen conflict check
    const foundAllergens = prod.allergens.filter(a => activeAllergens.has(a));
    let status = 'SAFE';
    let reasonText = 'Produkt bezpieczny — brak konfliktu z wybranymi alergenami i dietą.';

    if (foundAllergens.length > 0) {
      status = 'DANGER';
      const allergenNames = {
        nuts: 'Orzechy',
        milk: 'Laktozę / Mleko',
        gluten: 'Gluten',
        soy: 'Soję'
      };
      const names = foundAllergens.map(a => allergenNames[a] || a).join(', ');
      reasonText = `🚨 Wykryto konflikt: produkt zawiera ${names}!`;
    } else if (activeDiet === 'vegan' && prod.dietVegan === false) {
      status = 'DANGER';
      reasonText = '🚨 Niezgodny z dietą: produkt nie jest wegański.';
    } else if (activeDiet === 'vegetarian' && prod.dietVegetarian === false) {
      status = 'DANGER';
      reasonText = '🚨 Niezgodny z dietą: produkt zawiera składniki pochodzenia zwierzęcego.';
    } else if (!prod.hasFullData && (activeDiet === 'vegan' || activeDiet === 'vegetarian')) {
      status = 'UNKNOWN';
      reasonText = '⚠️ Baza Open Food Facts nie posiada zweryfikowanych tagów diety dla tego produktu. Allergen Guard nie zgaduje bezpieczeństwa!';
    }

    // Status pill
    if (status === 'SAFE') {
      resBadge.className = 'status-pill pill-safe';
      resBadge.textContent = '✅ SAFE';
    } else if (status === 'DANGER') {
      resBadge.className = 'status-pill pill-danger';
      resBadge.textContent = '🚨 DANGER';
    } else {
      resBadge.className = 'status-pill pill-unknown';
      resBadge.textContent = '⚠️ UNKNOWN';
    }

    resReason.textContent = reasonText;

    // Macros
    carbVal.textContent = `${prod.carbs}g`;
    protVal.textContent = `${prod.protein}g`;
    fatVal.textContent = `${prod.fat}g`;

    const carbPercent = Math.min(100, Math.round((prod.carbs / 80) * 100));
    const protPercent = Math.min(100, Math.round((prod.protein / 50) * 100));
    const fatPercent = Math.min(100, Math.round((prod.fat / 70) * 100));

    carbCircle.setAttribute('stroke-dasharray', `${carbPercent}, 100`);
    protCircle.setAttribute('stroke-dasharray', `${protPercent}, 100`);
    fatCircle.setAttribute('stroke-dasharray', `${fatPercent}, 100`);

    // Energy goal
    const energyPercent = ((prod.kcal / targetCal) * 100).toFixed(1);
    calShare.textContent = `${energyPercent}% celu (${prod.kcal} kcal)`;
    calBar.style.width = `${Math.min(100, energyPercent)}%`;

    // Update aria on progress bar
    const progressTrack = calBar.closest('.progress-track');
    if (progressTrack) {
      progressTrack.setAttribute('aria-valuenow', energyPercent);
    }
  }

  // ---- Intersection Observer: Animate on Scroll ----
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .gallery-item, .step-card, .privacy-card').forEach(el => {
    el.classList.add('fade-in-up');
    fadeObserver.observe(el);
  });

  // Initial simulation run
  runSimulation();
});
