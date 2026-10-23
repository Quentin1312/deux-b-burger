/* Deux B Street Food — données + éléments communs */
const TEL = '06 61 99 88 33', TEL_HREF = 'tel:+33661998833', MAIL = 'contact@les-deux-b.com';
const ADDR = '14 av. des Raux · 15250 Jussac';

// Planning de la semaine : à mettre à jour chaque semaine (shop: 'open' | 'dist')
const PLANNING = [
  { d: 'Lundi', shop: 'dist', truck: null },
  { d: 'Mardi', shop: 'open', truck: null },
  { d: 'Mercredi', shop: 'dist', truck: { place: 'Vézac', where: 'devant la boulangerie', isNew: true } },
  { d: 'Jeudi', shop: 'dist', truck: { place: 'Senilhes', where: 'sur la place' } },
  { d: 'Vendredi', shop: 'open', truck: null },
  { d: 'Samedi', shop: 'open', truck: null },
  { d: 'Dimanche', shop: 'dist', truck: null }
];

const TICKETS = [
  { title: 'Burgers', stamp: true, rows: [
      ['Le 12 Balles', '12,00', 'burger maison + frites', true], ['Burger', '10,00'], ['B-Croc', '6,00'], ['B-Wrap', '5,00'], ['Frites', '3,00'] ],
    notes: [['Fromage au choix', 'Cantal · Cheddar · Bleu · Chèvre · St-Nectaire · fromage du mois'],
            ['Viande / végé', 'Steak haché · Poulet pané · Croustifade'],
            ['Sauces maison', 'Pays Vert (crème, ail, fines herbes) · Basque (base mayo) · Poivre · Cantalou (fromagère)']] },
  { title: "Nuggets<br>& p'tits", rows: [
      ['Nuggets ×6', '5,00', 'maison'], ['Nuggets ×10', '8,00'], ['Nuggets ×20', '11,00'], null,
      ['Lou Pitiou', '9,80', 'menu enfant : B-Croc ou nuggets, frites, B-Tea, moelleux ou B-Nut', true] ],
    notes: [['B-Tea', "Notre ice tea fait maison. Boissons locales au camion et à la boutique."]] },
  { title: 'Desserts<br>& suppl.', rows: [
      ['Tiramisu', '4,00', 'spéculoos ou Nutella'], ['Moelleux', '4,00'], ['B-Nut', '4,00', 'panini Nutella'],
      ['Panna cotta', '4,00', 'fruits rouges ou exotique'], ['Dessert du mois', '4,00'], 'Suppléments',
      ['Croustifade', '3,00'], ['Steak ou poulet', '3,50'], ['Bacon', '1,50'], ['Fromage', '1,50'], ['Pot de sauce', '0,80'], ['Œuf', '0,50'] ] }
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const todayIdx = () => (new Date().getDay() + 6) % 7;

function header(page) {
  const l = (href, txt, key) => `<a href="${href}"${page === key ? ' aria-current="page"' : ''}>${txt}</a>`;
  return `<header class="top"><div class="wrap top__in">
    <a class="brand" href="index.html"><img src="img/logo.webp" alt=""><span>Deux B<small>Street food · Cantal</small></span></a>
    <nav class="nav" aria-label="Principal">
      ${l('boutique.html', 'La boutique', 'boutique')}${l('camion.html', 'Léon le camion', 'camion')}${l('camion.html#evenements', 'Événements', 'ev')}
      <a class="btn btn--gold" href="${TEL_HREF}" aria-label="Appeler le ${TEL}"><span class="nav-tel">${TEL}</span><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg></a>
      <button class="burger-btn" aria-label="Ouvrir le menu" data-open><i></i><i></i><i></i></button>
    </nav></div></header>
  <div class="drawer" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="drawer__head"><a class="brand" href="index.html"><img src="img/logo.webp" alt=""><span>Deux B</span></a><button class="drawer__close" aria-label="Fermer" data-close>×</button></div>
    <nav><a href="index.html">Accueil <small>01</small></a><a href="boutique.html">La boutique <small>Jussac</small></a><a href="camion.html">Léon <small>le camion</small></a><a href="camion.html#evenements" data-close>Événements <small>devis</small></a></nav>
    <div class="drawer__foot"><span>${ADDR}</span><a href="${TEL_HREF}">${TEL}</a></div>
  </div>`;
}

function footer() {
  return `<footer class="foot"><div class="wrap">
    <div class="foot__grid">
      <div><h4>La boutique</h4>${ADDR.replace(' · ', '<br>')}<br><span style="color:#B9A58F">Distributeur 24h/24 · 7j/7</span></div>
      <div><h4>Commander</h4><a href="${TEL_HREF}">${TEL}</a><span style="color:#B9A58F">Par téléphone, à récupérer sur place.</span></div>
      <div><h4>Écrire</h4><a href="mailto:${MAIL}">${MAIL}</a><a href="camion.html#evenements">Demande pour un événement →</a></div>
      <div><h4>Suivre</h4><a href="https://www.instagram.com/les_deux_b/" target="_blank" rel="noopener">Instagram</a><a href="https://www.facebook.com/profile.php?id=100076093902653" target="_blank" rel="noopener">Facebook</a><a href="https://www.tiktok.com/@les_deux_b" target="_blank" rel="noopener">TikTok</a></div>
    </div>
    <div class="foot__big" aria-hidden="true">Deux B</div>
    <div class="foot__legal"><span>Fait maison dans le Cantal depuis 2021</span><span>© ${new Date().getFullYear()} Deux B Street Food · <a href="#" style="text-decoration:none">Mentions légales</a></span></div>
  </div></footer>`;
}

function ticketHTML(t, i) {
  const rows = t.rows.map(r => {
    if (r === null) return '<div class="t-cut"></div>';
    if (typeof r === 'string') return `<div class="t-cut"></div><b style="font-size:11px;letter-spacing:.14em">${r.toUpperCase()}</b>`;
    const [n, p, sub, hl] = r;
    return `<div class="t-row"><b${hl ? ' class="hl"' : ''}>${n}</b><i></i><span>${p}</span></div>${sub ? `<div class="t-sub">${sub}</div>` : ''}`;
  }).join('');
  const notes = (t.notes || []).map(([h, s]) => `<div class="t-note"><b>${h.toUpperCase()}</b><span>${s}</span></div>`).join('');
  return `<article class="ticket"><div class="ticket__p">
    <div class="t-head"><b>DEUX B · STREET FOOD</b><span>14 AV. DES RAUX · 15250 JUSSAC</span><span>TÉL. ${TEL}</span></div>
    <div class="t-cut"></div>
    <div class="t-meta"><span>Ticket n°0${i + 1}/03</span><span>Sur place · à emporter</span></div>
    <div class="t-trow"><span class="t-title">${t.title}</span>${t.stamp ? '<div class="stamp"><span>PAIN<br>FAIT<br>MAISON</span></div>' : ''}</div>
    <div class="t-list">${rows}</div>
    ${notes ? `<div class="t-cut"></div>${notes}` : ''}
    <div class="t-cut"></div>
    <div class="t-end"><span>*** MERCI · BON APPÉTIT ***</span><div class="t-bars"></div></div>
  </div></article>`;
}

function weekHTML() {
  const t = todayIdx();
  const shop = s => s === 'open' ? 'Burgers & pizzas' : 'Distributeur';
  const truck = tr => tr ? `${tr.place}<small>${tr.where}</small>` : 'Repos';
  let h = '<div class="wk-corner"></div>' + PLANNING.map((p, i) => `<div class="wk-day${i === t ? ' is-today' : ''}">${p.d.slice(0, 3)}.</div>`).join('');
  h += '<div class="wk-lab">Boutique<small>Jussac</small></div>' + PLANNING.map((p, i) => `<div class="wk-cell ${p.shop === 'open' ? 'open' : ''}${i === t ? ' is-now' : ''}">${shop(p.shop)}${p.shop !== 'open' ? '<small>24h/24</small>' : ''}</div>`).join('');
  h += '<div class="wk-lab">Léon<small>le camion</small></div>' + PLANNING.map((p, i) => `<div class="wk-cell ${p.truck ? 'open' : 'off'}${i === t ? ' is-now' : ''}">${truck(p.truck)}</div>`).join('');
  h += PLANNING.map((p, i) => `<div class="wk-mob"><span class="d${i === t ? ' is-today' : ''}">${p.d}${i === t ? '<br>· auj.' : ''}</span>
    <span class="c${p.shop === 'open' ? '' : ' off'}"><em>Boutique</em>${shop(p.shop)}</span>
    <span class="c${p.truck ? '' : ' off'}"><em>Léon</em>${p.truck ? p.truck.place : 'Repos'}</span></div>`).join('');
  return h;
}

function todayHTML() {
  const p = PLANNING[todayIdx()];
  const shop = p.shop === 'open' ? '<span class="dot on"></span><b>Ouverte</b> · burgers & pizzas' : '<span class="dot on"></span>Distributeur ouvert 24h/24';
  const truck = p.truck ? `<span class="dot on"></span><b>${p.truck.place}</b> · ${p.truck.where}` : '<span class="dot"></span>Léon se repose';
  return `<div class="today__row"><span>${p.d}</span><span>Aujourd'hui chez Deux B</span></div>
    <div class="today__row"><span>Boutique</span><span>${shop}</span></div>
    <div class="today__row"><span>Camion</span><span>${truck}</span></div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const hs = $('[data-site-header]'); if (hs) hs.outerHTML = header(hs.dataset.page);
  const fs = $('[data-site-footer]'); if (fs) fs.outerHTML = footer();
  $$('[data-tickets]').forEach(el => { el.innerHTML = TICKETS.map(ticketHTML).join(''); });
  $$('[data-week]').forEach(el => { el.innerHTML = weekHTML(); });
  $$('[data-today]').forEach(el => { el.innerHTML = todayHTML(); });

  const drawer = $('.drawer');
  const setDrawer = open => { drawer.classList.toggle('open', open); document.body.style.overflow = open ? 'hidden' : ''; };
  $$('[data-open]').forEach(b => b.addEventListener('click', () => setDrawer(true)));
  $$('[data-close]').forEach(b => b.addEventListener('click', () => setDrawer(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setDrawer(false); });

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.rv').forEach(el => io.observe(el));
});
