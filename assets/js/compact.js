document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav-links');
  menu?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  const filterButtons = [...document.querySelectorAll('.filter-btn[data-filter]')];
  const pubs = [...document.querySelectorAll('.full-publication[data-type]')];
  const search = document.getElementById('publication-search');
  const count = document.getElementById('publication-count');
  const applyPubFilters = () => {
    const active = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const q = (search?.value || '').trim().toLowerCase();
    let shown = 0;
    pubs.forEach(pub => {
      const visible = (active === 'all' || pub.dataset.type === active) && (!q || pub.textContent.toLowerCase().includes(q));
      pub.classList.toggle('is-hidden', !visible);
      if (visible) shown++;
    });
    if (count) count.textContent = `${shown} publication${shown === 1 ? '' : 's'}`;
  };
  filterButtons.forEach(btn => btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyPubFilters();
  }));
  search?.addEventListener('input', applyPubFilters);
  applyPubFilters();

  const studentTabs = [...document.querySelectorAll('.student-tab[data-student-tab]')];
  const studentPanels = [...document.querySelectorAll('.student-panel[data-student-panel]')];
  studentTabs.forEach(tab => tab.addEventListener('click', () => {
    const key = tab.dataset.studentTab;
    studentTabs.forEach(t => t.classList.toggle('active', t === tab));
    studentPanels.forEach(panel => panel.classList.toggle('active', panel.dataset.studentPanel === key));
  }));
});
