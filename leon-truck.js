// <leon-truck> — Léon le camion (side view, facing right).
// Attributes: body, roof, ink, glass, line (outline width, 0 = flat), hatch ("open"|"closed")
(function () {
  if (customElements.get('leon-truck')) return;
  class LeonTruck extends HTMLElement {
    static get observedAttributes() { return ['body', 'roof', 'ink', 'glass', 'line', 'hatch', 'wheel']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { this.render(); }
    render() {
      const a = (k, d) => this.getAttribute(k) || d;
      const body = a('body', '#1f9aa8'), roof = a('roof', '#f4ead6'), ink = a('ink', '#14262a');
      const glass = a('glass', '#cfe7ea'), wheel = a('wheel', ink), lw = +a('line', '2.5');
      const open = a('hatch', 'open') !== 'closed';
      const st = lw > 0 ? `stroke="${ink}" stroke-width="${lw}" stroke-linejoin="round" stroke-linecap="round"` : '';
      const ribs = [70, 77, 84, 91].map(y => `<path d="M20 ${y} H198" stroke="${ink}" stroke-opacity=".28" stroke-width="2.2"/>`).join('');
            (this.shadowRoot || this.attachShadow({ mode: 'open' })).innerHTML = `<style>:host{display:block}</style><svg viewBox="0 0 224 132" width="100%" style="display:block;overflow:visible" aria-label="Léon le camion">
        <ellipse cx="112" cy="122" rx="100" ry="6" fill="${ink}" opacity=".14"/>
        ${open ? `<path d="M36 30 L132 30 L142 5 L28 5 Z" fill="${roof}" ${st}/><path d="M40 5 L52 -3 L118 -3 L130 5" fill="none" ${st}/>` : ''}
        <path d="M14 26 Q14 16 24 16 L158 16 Q170 16 176 28 L190 56 Q206 60 208 74 L208 98 Q208 106 200 106 L22 106 Q14 106 14 98 Z" fill="${body}" ${st}/>
        <path d="M14 31 L14 26 Q14 16 24 16 L158 16 Q169 16 174 27 L176 31 Z" fill="${roof}" ${st}/>
        ${ribs}
        ${open ? `<rect x="38" y="36" width="94" height="26" rx="2" fill="${ink}"/><rect x="38" y="58" width="94" height="5" fill="${roof}" ${st}/><circle cx="60" cy="47" r="5" fill="${roof}" opacity=".9"/><rect x="74" y="42" width="16" height="12" rx="2" fill="${roof}" opacity=".55"/><circle cx="108" cy="48" r="6" fill="#e9a13b"/>` : `<rect x="38" y="36" width="94" height="26" rx="3" fill="none" ${st}/>`}
        <path d="M152 33 L168 33 L182 58 L152 58 Z" fill="${glass}" ${st}/>
        <path d="M148 30 V104" stroke="${ink}" stroke-opacity=".5" stroke-width="2"/>
        <rect x="140" y="64" width="8" height="3" rx="1.5" fill="${ink}"/>
        <path d="M30 106 A20 20 0 0 1 72 106" fill="${ink}" opacity=".85"/>
        <path d="M148 106 A20 20 0 0 1 190 106" fill="${ink}" opacity=".85"/>
        <circle cx="51" cy="108" r="15" fill="${wheel}"/><circle cx="51" cy="108" r="6" fill="${roof}"/>
        <circle cx="169" cy="108" r="15" fill="${wheel}"/><circle cx="169" cy="108" r="6" fill="${roof}"/>
        <circle cx="200" cy="74" r="5" fill="${roof}" ${st}/>
        <rect x="196" y="98" width="16" height="7" rx="3" fill="${roof}" ${st}/>
        <text x="86" y="27" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="10" fill="${ink}">Deux B</text>
      </svg>`;
    }
  }
  customElements.define('leon-truck', LeonTruck);
})();
