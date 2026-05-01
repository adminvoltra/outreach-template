// {{ORG_NAME}} — main.js

(function () {
  'use strict';

  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute(
        'aria-expanded',
        links.classList.contains('open') ? 'true' : 'false'
      );
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  // Mark active nav link from current page
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href === path) a.classList.add('active');
  });

  // Donate page interactions
  const toggleBtns = document.querySelectorAll('.donate-toggle button');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const amountBtns = document.querySelectorAll('.amounts button');
  const customInput = document.querySelector('.custom-amount input');
  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (customInput) customInput.value = '';
    });
  });
  if (customInput) {
    customInput.addEventListener('input', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
    });
  }

  const pmBtns = document.querySelectorAll('.payment-methods .pm');
  pmBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pmBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Forms — friendly local handling (real submit hookup happens later)
  document.querySelectorAll('form[data-demo]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const note = form.querySelector('[data-note]');
      if (note) {
        note.hidden = false;
        note.textContent = 'Thanks — this form is part of a demo build. Hook to your provider before launch.';
      } else {
        alert('Demo form. Connect to Stripe / form provider before launch.');
      }
      form.reset();
    });
  });

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .8s ease, transform .8s ease';
      obs.observe(el);
    });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
})();
