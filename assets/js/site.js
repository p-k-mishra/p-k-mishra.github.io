document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  const buttons = [...document.querySelectorAll('.filter-btn[data-filter]')];
  const cards = [...document.querySelectorAll('.full-publication[data-type]')];
  const search = document.getElementById('publication-search');
  const count = document.getElementById('publication-count');

  const applyFilters = () => {
    if (!cards.length) return;
    const active = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const q = (search?.value || '').toLowerCase().trim();
    let shown = 0;
    cards.forEach(card => {
      const matchesType = active === 'all' || card.dataset.type === active;
      const matchesText = !q || card.textContent.toLowerCase().includes(q);
      const visible = matchesType && matchesText;
      card.classList.toggle('is-hidden', !visible);
      if (visible) shown += 1;
    });
    if (count) count.textContent = `${shown} publication${shown === 1 ? '' : 's'}`;
  };

  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
  }));
  search?.addEventListener('input', applyFilters);
  applyFilters();
});
