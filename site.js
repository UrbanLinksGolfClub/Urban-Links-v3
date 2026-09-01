// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }));
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const trigger = item.querySelector('.faq-trigger');
  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    item.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(!isOpen));
  });
});

// "Book a Visit" nav CTA: on the home page, smooth-scroll to #visit with header offset.
// On other pages, the link's href already points to index.html#visit and the browser
// navigates there directly (offset is handled by scroll-margin-top on #visit).
document.querySelectorAll('a[data-book-visit]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.getElementById('visit');
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 68, behavior: 'smooth' });
    }
  });
});

// Scroll-reveal
const revealEls = document.querySelectorAll('.fi');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));
}

// Forms: submit to Netlify via fetch, swap in the success card on the page (matches design).
document.querySelectorAll('form[data-netlify-ajax]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    }).then(() => {
      form.classList.add('form-hidden');
      const success = document.getElementById(form.dataset.successId);
      if (success) success.classList.remove('form-hidden');
    }).catch(() => {
      form.submit();
    });
  });
});
