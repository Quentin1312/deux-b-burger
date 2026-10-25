// ─────────────────────────────────────────────────────────────
//  PLANNING DE LÉON — à modifier chaque semaine
//  Il suffit de changer les lignes de TOURNEE. Le nom du village doit
//  exister dans VILLAGES (ajoute-le avec ses coordonnées GPS sinon).
// ─────────────────────────────────────────────────────────────
export const SEMAINE = 'Semaine du 27 octobre';

export const TOURNEE = [
  { jour: 'Lundi',    date: '27 oct.', village: 'Jussac',           lieu: 'Parking Molina',   adresse: "Av. du Pont d'Authre", heure: '18h – 22h' },
  { jour: 'Mardi',    date: '28 oct.', village: 'Reilhac',          lieu: "Place de l'église", adresse: 'Le bourg',           heure: '18h – 22h' },
  { jour: 'Mercredi', date: '29 oct.', village: 'Saint-Simon',      lieu: 'La Supérette',     adresse: '16 Promenade Gerbert', heure: '18h – 22h' },
  { jour: 'Jeudi',    date: '30 oct.', village: 'Arpajon-sur-Cère', lieu: 'Salle des fêtes',  adresse: '33 Route du Midi',     heure: '18h – 22h' },
  { jour: 'Vendredi', date: '31 oct.', village: 'Naucelles',        lieu: 'Place du bourg',   adresse: 'Le bourg',             heure: '18h – 22h' },
];

// [latitude, longitude]
export const VILLAGES = {
  'Jussac': [44.988, 2.424], 'Naucelles': [44.958, 2.418], 'Reilhac': [44.972, 2.466],
  'Marmanhac': [45.010, 2.470], 'Saint-Simon': [44.965, 2.490], 'Arpajon-sur-Cère': [44.904, 2.457],
  'Aurillac': [44.926, 2.444], 'Ytrac': [44.911, 2.363], 'Crandelles': [44.958, 2.340],
  'Laroquevieille': [45.030, 2.430], 'Saint-Cernin': [45.060, 2.420], 'Vic-sur-Cère': [44.980, 2.625],
  'Yolet': [44.930, 2.530], 'Giou-de-Mamou': [44.932, 2.497], 'Sansac-de-Marmiesse': [44.882, 2.348],
  'Teissières-de-Cornet': [45.000, 2.380], 'Saint-Paul-des-Landes': [44.944, 2.312],
};

// Projects the week's stops into a W×H box, plus nearby reference villages and a smooth path.
export function layout(W = 1000, H = 600, pad = 0.22) {
  const k = Math.cos(44.95 * Math.PI / 180);
  const P = n => { const v = VILLAGES[n] || VILLAGES['Jussac']; return [v[1] * k, -v[0]]; };
  const pts = TOURNEE.map(s => P(s.village));
  let x0 = Math.min(...pts.map(p => p[0])), x1 = Math.max(...pts.map(p => p[0]));
  let y0 = Math.min(...pts.map(p => p[1])), y1 = Math.max(...pts.map(p => p[1]));
  let w = Math.max(x1 - x0, 0.01), h = Math.max(y1 - y0, 0.01);
  x0 -= w * pad; x1 += w * pad; y0 -= h * pad; y1 += h * pad; w = x1 - x0; h = y1 - y0;
  const s = Math.min(W / w, H / h), ox = (W - w * s) / 2, oy = (H - h * s) / 2;
  const proj = p => [ox + (p[0] - x0) * s, oy + (p[1] - y0) * s];
  const stops = TOURNEE.map((t, i) => { const [x, y] = proj(pts[i]); return { ...t, i, x, y, num: String(i + 1).padStart(2, '0') }; });
  const used = new Set(TOURNEE.map(t => t.village));
  const refs = Object.keys(VILLAGES).filter(n => !used.has(n)).map(n => { const [x, y] = proj(P(n)); return { name: n, x, y }; })
    .filter(r => r.x > 30 && r.x < W - 30 && r.y > 20 && r.y < H - 20);
  return { stops, refs, d: smooth(stops), W, H };
}

function smooth(p) {
  if (p.length < 2) return '';
  let d = `M${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] || p[i], b = p[i], c = p[i + 1], e = p[i + 2] || c;
    const t = 0.18;
    d += ` C${(b.x + (c.x - a.x) * t).toFixed(1)} ${(b.y + (c.y - a.y) * t).toFixed(1)} ${(c.x - (e.x - b.x) * t).toFixed(1)} ${(c.y - (e.y - b.y) * t).toFixed(1)} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`;
  }
  return d;
}

// Lengths along the path closest to each stop
export function stopLengths(path, stops) {
  const L = path.getTotalLength(), N = 600, samples = [];
  for (let i = 0; i <= N; i++) { const l = L * i / N, q = path.getPointAtLength(l); samples.push([l, q.x, q.y]); }
  return stops.map((s, i) => i === 0 ? 0 : i === stops.length - 1 ? L :
    samples.reduce((b, c) => ((c[1] - s.x) ** 2 + (c[2] - s.y) ** 2 < (b[1] - s.x) ** 2 + (b[2] - s.y) ** 2 ? c : b))[0]);
}

// Drives the truck element along the path (positions in % of the map box)
export function drive({ path, progress, truck, from, to, W, H, ms = 1400, onDone }) {
  const L = path.getTotalLength(), t0 = performance.now();
  if (progress) progress.style.strokeDasharray = `${from} ${L + 10}`;
  const step = now => {
    const k = Math.min(1, (now - t0) / ms), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    const l = from + (to - from) * e, p = path.getPointAtLength(l), q = path.getPointAtLength(Math.min(L, Math.max(0, l + (to >= from ? 2 : -2))));
    truck._pos = [(p.x / W * 100) + '%', (p.y / H * 100) + '%']; truck.style.left = truck._pos[0]; truck.style.top = truck._pos[1];
    if (Math.abs(q.x - p.x) > 0.2) truck.dataset.flip = q.x < p.x ? '1' : '0';
    truck.firstElementChild && (truck.firstElementChild.style.transform = truck.dataset.flip === '1' ? 'scaleX(-1)' : 'none');
    if (progress) progress.style.strokeDasharray = `${l} ${L + 10}`;
    if (k < 1) requestAnimationFrame(step); else onDone && onDone();
  };
  requestAnimationFrame(step);
}
