/* ── SECTION ENTER / EXIT ANIMATION ── */
// Each section slides in when entering the viewport and fades out when leaving.
// Reveal items inside stagger in after the section itself appears.

document.querySelectorAll('section:not(#about)').forEach(section => {
  const inner   = section.querySelector('.section-inner');
  const heading = section.querySelector('.section-heading');
  const items   = Array.from(section.querySelectorAll('.reveal'));

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      if (inner) inner.classList.add('section-active');

      items.forEach((item, i) => {
        item.style.transitionDelay = (0.06 + i * 0.06) + 's';
        item.classList.add('visible');
      });

      if (heading) heading.classList.add('heading-active');

    } else {
      if (inner) inner.classList.remove('section-active');
      if (heading) heading.classList.remove('heading-active');

      items.forEach(item => {
        item.style.transitionDelay = '0s';
        item.classList.remove('visible');
      });
    }
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  observer.observe(section);
});

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => navObserver.observe(s));
