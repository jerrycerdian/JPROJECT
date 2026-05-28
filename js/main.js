/* ──────────────────────────────────────────────────────────────────────
   JPROJECT – Main JavaScript
────────────────────────────────────────────────────────────────────── */

// ── 1. Theme Toggle ─────────────────────────────────────────────────
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

function applyTheme(theme) {
  if (theme === 'light') {
    html.classList.remove('dark');
    html.classList.add('light');
    themeBtn.textContent = '☀️';
    document.body.classList.add('bg-white', 'text-slate-900');
    document.body.classList.remove('bg-slate-950', 'text-slate-100');
  } else {
    html.classList.remove('light');
    html.classList.add('dark');
    themeBtn.textContent = '🌙';
    document.body.classList.add('bg-slate-950', 'text-slate-100');
    document.body.classList.remove('bg-white', 'text-slate-900');
  }
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeBtn?.addEventListener('click', () => {
  const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(newTheme);
});

// ── 2. Navbar Scroll Effect ─────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
});

// ── 3. Mobile Menu ──────────────────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');

menuBtn?.addEventListener('click', () => {
  const isHidden = mobileMenu.classList.toggle('hidden');
  menuIcon.textContent = isHidden ? '✕' : '☰';
});

// Smooth scroll untuk semua link anchor
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('close parentheses', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      
      // Tutup mobile menu
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuIcon.textContent = '☰';
      }
      
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── 4. Scroll Reveal Animation ──────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

reveals.forEach(el => revealObserver.observe(el));

// ── 5. Portfolio Modal dengan Gambar ────────────────────────────────
const modal = document.getElementById('portfolioModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalThumb = document.getElementById('modalThumb');
const closeModal = document.getElementById('closeModal');

document.querySelectorAll('.portfolio-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.dataset.title || '';
    const desc = card.dataset.desc || '';
    const color = card.dataset.color || 'from-primary to-accent';
    const imgSrc = card.dataset.img || '';

    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    // Tampilkan gambar atau fallback ke gradient
    if (imgSrc) {
      modalThumb.className = 'h-48 rounded-2xl mb-5 overflow-hidden';
      modalThumb.innerHTML = `
        <img src="${imgSrc}" alt="${title}" class="w-full h-full object-cover" 
          onerror="this.remove(); this.parentElement.className='h-48 rounded-2xl mb-5 bg-gradient-to-br ${color}'">
      `;
    } else {
      modalThumb.className = `h-48 rounded-2xl mb-5 bg-gradient-to-br ${color}`;
      modalThumb.innerHTML = '';
    }

    modal?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
});

function closePortfolioModal() {
  modal?.classList.add('hidden');
  document.body.style.overflow = '';
}

closeModal?.addEventListener('click', closePortfolioModal);

modal?.addEventListener('click', e => {
  if (e.target === modal) closePortfolioModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePortfolioModal();
});

// ── 6. WhatsApp Contact Form ────────────────────────────────────────
const WA_NUMBER = '855882592825'; // Ganti dengan nomor WA Anda

document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const nama = document.getElementById('inputNama').value.trim();
  const wa = document.getElementById('inputWA').value.trim();
  const layanan = document.getElementById('inputLayanan').value || 'Belum dipilih';
  const pesan = document.getElementById('inputPesan').value.trim();

  if (!nama || !wa || !pesan) {
    alert('Harap isi nama, nomor WA, dan pesan terlebih dahulu.');
    return;
  }

  // Format nomor WA (hapus 0 di depan, tambahkan kode negara)
  let formattedWA = wa.replace(/\D/g, '');
  if (formattedWA.startsWith('0')) {
    formattedWA = '62' + formattedWA.slice(1);
  } else if (!formattedWA.startsWith('855') && !formattedWA.startsWith('62')) {
    formattedWA = '62' + formattedWA;
  }

  const text = encodeURIComponent(
    `Halo JPROJECT 👋\n\n` +
    `*Nama:* ${nama}\n` +
    `*No. WA:* ${wa}\n` +
    `*Layanan:* ${layanan}\n\n` +
    `*Pesan:*\n${pesan}`
  );

  window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
  this.reset();
});

// ── 7. Navbar Link Smooth Scroll (fix untuk mobile) ─────────────────
document.querySelectorAll('#mobileMenu .nav-link, #navbar .nav-link').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
