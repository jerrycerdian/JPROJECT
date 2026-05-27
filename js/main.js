/* ── Theme Toggle ── */
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

function applyTheme(theme) {
  if (theme === 'light') {
    html.classList.remove('dark');
    html.classList.add('light');
    themeBtn.textContent = '☀️';
  } else {
    html.classList.remove('light');
    html.classList.add('dark');
    themeBtn.textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  applyTheme(html.classList.contains('dark') ? 'light' : 'dark');
});

/* ── Navbar Sticky / Scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile Menu ── */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');

menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden');
  menuIcon.textContent = open ? '☰' : '✕';
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      mobileMenu.classList.add('hidden');
      menuIcon.textContent = '☰';
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── Scroll Reveal ── */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));

/* ── Portfolio Modal ── */
const modal = document.getElementById('portfolioModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalThumb = document.getElementById('modalThumb');
const closeModal = document.getElementById('closeModal');

document.querySelectorAll('.portfolio-card').forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalThumb.className = `h-48 rounded-2xl mb-5 bg-gradient-to-br ${card.dataset.color}`;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
});

function closePortfolioModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}
closeModal.addEventListener('click', closePortfolioModal);
modal.addEventListener('click', e => { if (e.target === modal) closePortfolioModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePortfolioModal(); });

/* ── WhatsApp Contact Form ── */
const WA_NUMBER = '855882592825'; // Ganti nomor WA Anda

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nama     = document.getElementById('inputNama').value.trim();
  const wa       = document.getElementById('inputWA').value.trim();
  const layanan  = document.getElementById('inputLayanan').value || 'Belum dipilih';
  const pesan    = document.getElementById('inputPesan').value.trim();

  if (!nama || !wa || !pesan) {
    alert('Harap isi nama, nomor WA, dan pesan terlebih dahulu.');
    return;
  }

  const text = encodeURIComponent(
    `Halo Jproject! 👋\n\n` +
    `*Nama:* ${nama}\n` +
    `*No. WA:* ${wa}\n` +
    `*Layanan:* ${layanan}\n\n` +
    `*Pesan:*\n${pesan}`
  );

  window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
  this.reset();
});
