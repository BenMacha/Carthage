<template>
  <div class="pg">
    <!-- Héros -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--ink tile--stack tile--hero s-6">
        <span class="hero-mark phoen" aria-hidden="true">𐤇𐤍</span>
        <div class="chips hero-chips">
          <span class="chip chip-purple">{{ c.chip }}</span>
          <span class="chip chip--glass phoen hero-phoen" lang="phn" aria-hidden="true">𐤇𐤍𐤁𐤏𐤋</span>
        </div>
        <div class="hero-txt">
          <h1 class="h-display hero-title">{{ c.title }}</h1>
          <p class="lede">{{ c.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-6 hero-fig">
        <img src="/img/cannae.jpg" :alt="c.heroAlt">
        <figcaption>{{ c.heroCap }}</figcaption>
      </figure>
    </div>

    <!-- Deux pièges avant Cannes -->
    <section class="sec">
      <div class="sec-head sec-head--in">
        <h2 class="h-section">{{ c.trapsTitle }}</h2>
        <p>{{ c.trapsSub }}</p>
      </div>
      <div class="cols cols-2 cols--flush">
        <!-- Trébie -->
        <article class="tile battle">
          <svg class="diagram" viewBox="0 0 660 280" role="img" :aria-label="c.trebia.aria">
            <rect width="660" height="280" fill="#EFE7DA" />
            <path d="M372,0 C392,70 352,140 380,210 C396,250 376,270 384,280 L428,280 C420,250 440,200 424,150 C406,90 438,40 416,0 Z" :fill="W" />
            <rect x="326" y="222" width="52" height="46" rx="12" fill="none" :stroke="P" stroke-width="2" stroke-dasharray="4 4" />
            <rect v-for="(r, i) in TREBIA.rects" :key="'tr' + i" :x="r.x" :y="r.y" :width="r.w" :height="r.h" rx="1.5" :fill="r.f" :opacity="r.o" />
            <circle v-for="cy in [66, 116, 166, 216]" :key="'te' + cy" cx="152" :cy="cy" r="6" :fill="I" />
            <path d="M560,140 L296,140" fill="none" :stroke="R" stroke-width="3" stroke-dasharray="6 5" opacity=".5" />
            <g v-for="(a, i) in TREBIA.arrows" :key="'ta' + i">
              <path :d="a.d" fill="none" :stroke="a.c" stroke-width="3" stroke-linecap="round" :stroke-dasharray="a.dash ? '6 5' : null" />
              <polygon :points="a.head" :fill="a.c" />
            </g>
            <text v-for="l in TREBIA.labels" :key="l.k" :x="l.x" :y="l.y" :fill="l.c" :text-anchor="l.a || 'middle'" class="lbl" :font-size="l.s || 14">{{ c.lbl[l.k] }}</text>
          </svg>
          <div class="battle-body">
            <div>
              <span class="kicker">{{ c.trebia.kicker }}</span>
              <h3 class="battle-title">{{ c.trebia.title }}</h3>
            </div>
            <p class="body">{{ c.trebia.text }}</p>
          </div>
          <dl class="facts">
            <div v-for="f in c.trebia.facts" :key="f.k"><dt>{{ f.k }}</dt><dd>{{ f.v }}</dd></div>
          </dl>
        </article>

        <!-- Trasimène -->
        <article class="tile tile--ink battle">
          <svg class="diagram" viewBox="0 0 660 280" role="img" :aria-label="c.trasimene.aria">
            <rect width="660" height="280" fill="#EFE7DA" />
            <path d="M0,0 L660,0 L660,70 C600,110 540,80 480,108 C420,130 360,96 300,116 C240,134 180,100 120,118 C70,132 30,104 0,120 Z" fill="#E1D5C1" />
            <path d="M0,196 C80,184 160,204 250,192 C340,180 420,202 520,190 C580,184 630,196 660,192 L660,280 L0,280 Z" :fill="W" />
            <rect v-for="(r, i) in TRASIMENE.rects" :key="'tm' + i" :x="r.x" :y="r.y" :width="r.w" :height="r.h" :rx="r.rx || 1.5" :fill="r.f" :opacity="r.o" />
            <g v-for="(a, i) in TRASIMENE.arrows" :key="'tma' + i">
              <path :d="a.d" fill="none" :stroke="a.c" stroke-width="3" stroke-linecap="round" :stroke-dasharray="a.dash ? '6 5' : null" />
              <polygon :points="a.head" :fill="a.c" />
            </g>
            <text v-for="l in TRASIMENE.labels" :key="l.k" :x="l.x" :y="l.y" :fill="l.c" :text-anchor="l.a || 'middle'" class="lbl" :font-size="l.s || 14">{{ c.lbl[l.k] }}</text>
          </svg>
          <div class="battle-body">
            <div>
              <span class="kicker">{{ c.trasimene.kicker }}</span>
              <h3 class="battle-title">{{ c.trasimene.title }}</h3>
            </div>
            <p class="body">{{ c.trasimene.text }}</p>
          </div>
          <dl class="facts">
            <div v-for="f in c.trasimene.facts" :key="f.k"><dt>{{ f.k }}</dt><dd>{{ f.v }}</dd></div>
          </dl>
        </article>
      </div>
    </section>

    <!-- Cannes : stepper -->
    <section class="sec">
      <div class="sec-head sec-head--in">
        <h2 class="h-section">{{ c.cannae.title }}</h2>
        <p>{{ c.cannae.sub }}</p>
      </div>
      <div class="cols cols-7-5 cols--flush">
        <div class="tile diagram-tile">
          <svg id="cannae-diagram" class="diagram diagram--cannae" viewBox="0 0 432 300" role="img" aria-labelledby="cannae-svg-title">
            <title id="cannae-svg-title">{{ c.cannae.aria }} — {{ c.cannae.phaseWord }} {{ step + 1 }} : {{ c.cannae.phases[step].title }}</title>
            <rect width="432" height="300" fill="#EFE7DA" />
            <path d="M0,0 L34,0 C54,60 22,130 44,190 C58,235 36,270 44,300 L0,300 Z" :fill="W" />
            <text x="0" y="0" fill="#FFF" text-anchor="middle" transform="translate(22,250) rotate(-90)" class="lbl lbl--wide" font-size="11">{{ c.lbl.aufidus }}</text>
            <rect
              v-for="u in cannaeRects"
              :key="u.key"
              class="unit"
              x="0"
              y="0"
              :width="u.w"
              :height="u.h"
              rx="1.5"
              :fill="u.f"
              :style="{ transform: `translate(${u.x}px, ${u.y}px)`, opacity: u.o }"
            />
            <g v-for="(ov, i) in CANNAE_OVERLAYS" :key="'ov' + i" class="overlay" :class="{ on: step === i }">
              <g v-for="(a, j) in ov.arrows" :key="'ca' + j">
                <path :d="a.d" fill="none" :stroke="a.c" stroke-width="3" stroke-linecap="round" :stroke-dasharray="a.dash ? '6 5' : null" />
                <polygon :points="a.head" :fill="a.c" />
              </g>
              <text v-for="(l, j) in ov.labels" :key="'cl' + j" :x="l.x" :y="l.y" :fill="l.c" :text-anchor="l.a || 'middle'" class="lbl" :font-size="l.s || 12">{{ c.lbl[l.k] }}</text>
            </g>
          </svg>
          <div class="legend">
            <span v-for="k in c.cannae.legend" :key="k.t"><i :class="{ dot: k.dot }" :style="{ background: k.c }" aria-hidden="true" />{{ k.t }}</span>
          </div>
        </div>

        <div class="tile tile--xl tile--purple tile--stack step-panel">
          <div>
            <div class="seg step-seg" role="group" :aria-label="c.cannae.stepsLabel">
              <button
                v-for="(p, i) in c.cannae.phases"
                :key="p.title"
                type="button"
                :class="{ on: step === i }"
                :aria-pressed="step === i ? 'true' : 'false'"
                aria-controls="cannae-diagram cannae-phase"
                @click="step = i"
              >
                {{ c.cannae.stepWord }} {{ i + 1 }}
              </button>
            </div>
            <div id="cannae-phase" class="phase" aria-live="polite">
              <span class="kicker">{{ c.cannae.phaseWord }} {{ step + 1 }} / 3</span>
              <h3 class="h-block phase-title">{{ c.cannae.phases[step].title }}</h3>
              <p class="body-lg">{{ c.cannae.phases[step].text }}</p>
              <p class="body phase-more">{{ c.cannae.phases[step].more }}</p>
            </div>
          </div>
          <div class="step-nav">
            <button type="button" class="btn nav-btn" :disabled="step === 0" @click="step = Math.max(0, step - 1)">
              <span aria-hidden="true" class="flip">←</span> {{ c.prev }}
            </button>
            <button type="button" class="btn nav-btn nav-btn--next" :disabled="step === 2" @click="step = Math.min(2, step + 1)">
              {{ c.next }} <span aria-hidden="true" class="flip">→</span>
            </button>
          </div>
        </div>
      </div>

      <div class="cols cols-4 keep-2 cols--flush cannae-stats">
        <div v-for="s in c.cannae.stats" :key="s.n" class="tile stat-tile" :class="s.tone">
          <div class="stat-n">{{ s.n }}</div>
          <p>{{ s.t }}</p>
        </div>
      </div>
      <div class="tile tile--paper tile--outline result">
        <span class="kicker">{{ c.resultLabel }}</span>
        <p class="body-lg">{{ c.cannae.result }}</p>
      </div>
    </section>

    <!-- Zama -->
    <section class="sec">
      <div class="sec-head sec-head--in">
        <h2 class="h-section">{{ c.zama.title }}</h2>
        <p>{{ c.zama.sub }}</p>
      </div>
      <div class="cols cols-7-5 cols--flush">
        <div class="tile diagram-tile">
          <svg class="diagram" viewBox="0 0 660 300" role="img" :aria-label="c.zama.aria">
            <rect width="660" height="300" fill="#EFE7DA" />
            <line v-for="x in ZAMA.lanes" :key="'zl' + x" :x1="x" y1="150" :x2="x" y2="266" :stroke="I" stroke-width="1" stroke-dasharray="2 4" opacity=".35" />
            <rect v-for="(r, i) in ZAMA.rects" :key="'zr' + i" :x="r.x" :y="r.y" :width="r.w" :height="r.h" rx="1.5" :fill="r.f" :opacity="r.o" />
            <circle v-for="x in ZAMA.elephants" :key="'ze' + x" :cx="x" cy="136" r="6" :fill="I" />
            <g v-for="(a, i) in ZAMA.arrows" :key="'za' + i">
              <path :d="a.d" fill="none" :stroke="a.c" stroke-width="3" stroke-linecap="round" :stroke-dasharray="a.dash ? '6 5' : null" />
              <polygon :points="a.head" :fill="a.c" />
            </g>
            <text v-for="l in ZAMA.labels" :key="l.k" :x="l.x" :y="l.y" :fill="l.c" :text-anchor="l.a || 'middle'" class="lbl" :font-size="l.s || 14">{{ c.lbl[l.k] }}</text>
          </svg>
          <div class="legend">
            <span v-for="k in c.zama.legend" :key="k.t"><i :class="{ dot: k.dot }" :style="{ background: k.c }" aria-hidden="true" />{{ k.t }}</span>
          </div>
        </div>
        <div class="tile tile--xl tile--ink tile--stack">
          <div>
            <span class="kicker">{{ c.zama.kicker }}</span>
            <dl class="forces">
              <div><dt>Carthage</dt><dd>{{ c.zama.carthage }}</dd></div>
              <div><dt>Rome</dt><dd>{{ c.zama.rome }}</dd></div>
            </dl>
            <ol class="zphases">
              <li v-for="(p, i) in c.zama.phases" :key="p.title">
                <span class="zn" aria-hidden="true">{{ i + 1 }}</span>
                <div>
                  <h3 class="zt">{{ p.title }}</h3>
                  <p class="body">{{ p.text }}</p>
                </div>
              </li>
            </ol>
          </div>
          <p class="zresult"><strong>{{ c.resultLabel }} :</strong> {{ c.zama.result }}</p>
        </div>
      </div>
    </section>

    <!-- Les cinq armes -->
    <section class="sec">
      <div class="sec-head sec-head--in">
        <h2 class="h-section">{{ c.weaponsTitle }}</h2>
        <NuxtLink :to="localePath('/armee')" class="btn btn-outline">{{ c.armyCta }}</NuxtLink>
      </div>
      <div class="cols cols-5 cols--flush">
        <div v-for="(w, i) in c.weapons" :key="w.title" class="card-img">
          <div class="w-img">
            <img :src="w.img" :alt="w.alt" loading="lazy" :style="w.pos ? { objectPosition: w.pos } : null">
            <span class="w-num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>
          <div class="card-body">
            <h3 class="h-card">{{ w.title }}</h3>
            <p>{{ w.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Écoles de guerre -->
    <section class="sec">
      <div class="tile tile--xl tile--navy">
        <div class="sec-head schools-head">
          <div>
            <span class="kicker">{{ c.schools.kicker }}</span>
            <h2 class="h-section">{{ c.schools.title }}</h2>
          </div>
          <p class="schools-lede">{{ c.schools.text }}</p>
        </div>
        <div class="schools">
          <div class="school school--img">
            <img src="/img/schlieffen.jpg" :alt="c.schools.schlieffenAlt" loading="lazy">
            <div>
              <span class="kicker">{{ c.schools.items[0].k }}</span>
              <h3 class="h-card">{{ c.schools.items[0].t }}</h3>
              <p>{{ c.schools.items[0].p }}</p>
            </div>
          </div>
          <div v-for="s in c.schools.items.slice(1)" :key="s.t" class="school">
            <span class="kicker">{{ s.k }}</span>
            <h3 class="h-card">{{ s.t }}</h3>
            <p>{{ s.p }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- À lire aussi -->
    <section class="sec">
      <h2 class="h-block related-title">{{ c.relatedTitle }}</h2>
      <div class="cols cols-3 cols--flush">
        <NuxtLink v-for="l in c.links" :key="l.to" :to="localePath(l.to)" class="tile tile--stack link-tile" :class="l.cls">
          <span class="kicker">{{ l.kick }}</span>
          <div>
            <h3 class="h-card">{{ l.title }}</h3>
            <p class="body">{{ l.text }}</p>
          </div>
          <span class="more" aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

/* ---------- Palette des schémas ---------- */
const R = '#5E574F' // infanterie romaine
const RC = '#A89E91' // cavalerie romaine
const T = '#B8492A' // Gaulois & Ibères / mercenaires
const P = '#6E1E47' // Libyens / vétérans
const G = '#D6A23E' // cavalerie carthaginoise
const GD = '#8C6A1C' // texte or foncé
const I = '#16130F' // éléphants
const W = '#9FB6CF' // eau
const N = '#1D3F66' // Numides de Massinissa
const L = '#D98B6B' // levées carthaginoises

/* ---------- Aides géométriques ---------- */
function grid (n, cols, x, y, dx = 14, dy = 12) {
  return Array.from({ length: n }, (_, i) => ({ x: x + (i % cols) * dx, y: y + Math.floor(i / cols) * dy }))
}
function blocks (pts, f, o = 1, w = 10, h = 8) {
  return pts.map(p => ({ x: p.x, y: p.y, w, h, f, o }))
}
function head (fx, fy, x, y, s = 9) {
  const a = Math.atan2(y - fy, x - fx)
  const w = 0.45
  const p = ang => `${(x - s * Math.cos(ang)).toFixed(1)},${(y - s * Math.sin(ang)).toFixed(1)}`
  return `${x},${y} ${p(a + w)} ${p(a - w)}`
}
// flèche droite
function line (x1, y1, x2, y2, c, dash = false) {
  return { d: `M${x1},${y1} L${x2},${y2}`, head: head(x1, y1, x2, y2), c, dash }
}
// flèche courbe (quadratique)
function curve (x1, y1, cx, cy, x2, y2, c, dash = false) {
  return { d: `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`, head: head(cx, cy, x2, y2), c, dash }
}

/* ---------- La Trébie ---------- */
const TREBIA = {
  rects: [
    ...blocks(grid(4, 2, 338, 234, 14, 14), P),
    ...blocks(grid(33, 3, 70, 56, 14, 14), T),
    ...blocks(grid(22, 2, 114, 56, 14, 14), P),
    ...blocks(grid(8, 4, 70, 14, 14, 10), G),
    ...blocks(grid(8, 4, 70, 232, 14, 12), G),
    ...blocks(grid(60, 6, 190, 60, 14, 16), R),
    ...blocks(grid(16, 4, 560, 112, 14, 14), R, 0.25)
  ],
  arrows: [
    curve(326, 246, 290, 246, 262, 218, P),
    line(186, 140, 166, 140, R)
  ],
  labels: [
    { k: 'trebia', x: 402, y: 26, c: '#FFF', s: 13 },
    { k: 'frozen', x: 404, y: 198, c: '#FFF', s: 12 },
    { k: 'camp', x: 588, y: 100, c: R },
    { k: 'mago', x: 352, y: 212, c: P },
    { k: 'hann', x: 100, y: 50, c: T },
    { k: 'wet', x: 240, y: 48, c: R },
    { k: 'eleph', x: 152, y: 272, c: I }
  ]
}

/* ---------- Lac Trasimène ---------- */
const TRASIMENE = {
  rects: [
    ...blocks(grid(68, 34, 70, 160, 14, 12), R),
    { x: 40, y: 146, w: 560, h: 44, f: '#FFF', o: 0.5, rx: 20 },
    ...blocks(grid(6, 2, 20, 150, 14, 12), G),
    ...blocks(grid(8, 4, 150, 86, 14, 12), T),
    ...blocks(grid(8, 4, 290, 96, 14, 12), T),
    ...blocks(grid(8, 4, 430, 80, 14, 12), P),
    ...blocks(grid(9, 3, 606, 150, 14, 12), P)
  ],
  arrows: [
    line(52, 166, 64, 166, G),
    line(172, 112, 172, 146, T),
    line(312, 122, 312, 148, T),
    line(452, 106, 452, 146, P),
    line(602, 166, 590, 166, P)
  ],
  labels: [
    { k: 'hills', x: 330, y: 40, c: '#6B5A3E' },
    { k: 'lake', x: 330, y: 250, c: '#FFF', s: 16 },
    { k: 'fog', x: 330, y: 212, c: R, s: 12 },
    { k: 'entry', x: 16, y: 138, c: GD, a: 'start', s: 12 },
    { k: 'block', x: 626, y: 138, c: P, s: 12 }
  ]
}

/* ---------- Cannes : 3 étapes ---------- */
const ARC = [
  [188, 178.8, 171, 165.8, 164, 165.8, 171, 178.8, 188],
  [168, 174, 180, 184, 186, 184, 180, 174, 168],
  [176, 177, 178, 179, 179, 179, 178, 177, 176]
].map(ys => ys.map((y, i) => ({ x: 152 + i * 16, y })))

const CANNAE_UNITS = [
  { id: 'ri', f: R, pos: [grid(42, 14, 120, 70), grid(42, 11, 142, 94, 14, 11), grid(42, 9, 156, 102, 14, 11)] },
  { id: 'rcl', f: RC, pos: [grid(6, 3, 62, 76), grid(6, 3, 58, 6, 14, 10), grid(6, 3, 58, 6, 14, 10)], o: [1, 0.35, 0] },
  { id: 'rcr', f: RC, pos: [grid(6, 3, 330, 76), grid(6, 3, 352, 110, 14, 10), grid(6, 3, 396, 6, 12, 10)], o: [1, 1, 0.35] },
  { id: 'gi', f: T, w: 12, h: 10, pos: ARC },
  { id: 'll', f: P, pos: [grid(6, 2, 112, 196), grid(6, 2, 98, 98), grid(6, 2, 126, 104, 14, 16)] },
  { id: 'lr', f: P, pos: [grid(6, 2, 296, 196), grid(6, 2, 314, 98), grid(6, 2, 286, 104, 14, 16)] },
  { id: 'hc', f: G, pos: [grid(6, 3, 58, 200), grid(6, 3, 104, 42), grid(6, 6, 180, 62)] },
  { id: 'nc', f: G, pos: [grid(6, 3, 334, 200), grid(6, 3, 348, 82), grid(6, 3, 366, 30)] }
]

const CANNAE_OVERLAYS = [
  {
    arrows: [line(222, 160, 222, 118, T)],
    labels: [
      { k: 'legions', x: 218, y: 56, c: R },
      { k: 'gauls', x: 222, y: 238, c: T },
      { k: 'libyans', x: 126, y: 252, c: P },
      { k: 'libyans', x: 310, y: 252, c: P }
    ]
  },
  {
    arrows: [
      line(74, 62, 74, 26, RC, true),
      line(126, 126, 139, 126, P),
      line(310, 126, 297, 126, P),
      curve(76, 214, 20, 90, 98, 52, G, true)
    ],
    labels: [
      { k: 'sucked', x: 222, y: 86, c: R },
      { k: 'bends', x: 222, y: 214, c: T },
      { k: 'hasdrubal', x: 92, y: 240, c: GD, a: 'start' }
    ]
  },
  {
    arrows: [
      line(222, 32, 222, 56, G),
      line(100, 126, 120, 126, P),
      line(332, 126, 312, 126, P),
      line(222, 210, 222, 194, T),
      line(356, 76, 376, 50, G, true)
    ],
    labels: [
      { k: 'rear', x: 222, y: 22, c: GD },
      { k: 'total', x: 222, y: 252, c: P, s: 13 }
    ]
  }
]

const step = ref(0)

const cannaeRects = computed(() => {
  const out = []
  for (const u of CANNAE_UNITS) {
    const pts = u.pos[step.value]
    const o = u.o ? u.o[step.value] : 1
    pts.forEach((p, i) => {
      out.push({ key: u.id + i, x: p.x, y: p.y, w: u.w || 10, h: u.h || 8, f: u.f, o })
    })
  }
  return out
})

/* ---------- Zama ---------- */
const ZAMA_MANIPLES = Array.from({ length: 10 }, (_, m) => 164 + m * 34)
const ZAMA = {
  lanes: ZAMA_MANIPLES.slice(0, 9).map(x => x + 28),
  elephants: Array.from({ length: 16 }, (_, i) => 180 + i * 20),
  rects: [
    ...blocks(grid(36, 18, 194, 30, 14, 11), P),
    ...blocks(grid(40, 20, 180, 72, 14, 11), L),
    ...blocks(grid(44, 22, 172, 100, 14, 11), T),
    ...blocks(grid(6, 3, 40, 80), G),
    ...blocks(grid(6, 3, 580, 80), G),
    ...ZAMA_MANIPLES.flatMap(x => [
      ...blocks([{ x, y: 200 }, { x: x + 12, y: 200 }], R),
      ...blocks([{ x, y: 222 }, { x: x + 12, y: 222 }], R),
      ...blocks([{ x: x + 6, y: 244 }], R, 0.85)
    ]),
    ...blocks(grid(6, 3, 40, 200), RC),
    ...blocks(grid(9, 3, 578, 200), N)
  ],
  arrows: [
    line(192, 146, 192, 196, I, true),
    line(226, 146, 226, 196, I, true),
    line(430, 146, 430, 196, I, true),
    line(464, 146, 464, 196, I, true),
    line(60, 194, 60, 160, RC),
    line(606, 194, 606, 160, N),
    curve(44, 74, 20, 14, 178, 30, RC, true),
    curve(622, 74, 646, 14, 484, 30, N, true)
  ],
  labels: [
    { k: 'veterans', x: 330, y: 20, c: P },
    { k: 'elephants', x: 18, y: 142, c: I, a: 'start', s: 13 },
    { k: 'lanes', x: 330, y: 176, c: I, s: 12 },
    { k: 'romanLines', x: 330, y: 284, c: R, s: 12 },
    { k: 'laelius', x: 64, y: 244, c: R, s: 12 },
    { k: 'masinissa', x: 598, y: 246, c: N, s: 12 }
  ]
}

/* ---------- Textes ---------- */
const LEG_CANNAE = {
  fr: ['Infanterie romaine', 'Cavalerie romaine', 'Gaulois & Ibères', 'Libyens (élite)', 'Cavalerie carthaginoise', 'Eau'],
  en: ['Roman infantry', 'Roman cavalry', 'Gauls & Iberians', 'Libyans (elite)', 'Carthaginian cavalry', 'Water'],
  ar: ['المشاة الرومان', 'الفرسان الرومان', 'الغاليون والإيبيريون', 'الليبيون (النخبة)', 'الفرسان القرطاجيون', 'الماء']
}
const LEG_ZAMA = {
  fr: ['Éléphants', 'Mercenaires', 'Levées africaines', "Vétérans d'Italie", 'Cavalerie carthaginoise', 'Légions (manipules)', 'Cavalerie romaine', 'Numides de Massinissa'],
  en: ['Elephants', 'Mercenaries', 'African levies', 'Veterans of Italy', 'Carthaginian cavalry', 'Legions (maniples)', 'Roman cavalry', "Masinissa's Numidians"],
  ar: ['الفيلة', 'المرتزقة', 'المجنّدون الأفارقة', 'قدامى إيطاليا', 'الفرسان القرطاجيون', 'الفيالق (المانيبولات)', 'الفرسان الرومان', 'نوميديو ماسينيسا']
}
function legCannae (lang) {
  const t = LEG_CANNAE[lang]
  return [R, RC, T, P, G, W].map((col, i) => ({ c: col, t: t[i] }))
}
function legZama (lang) {
  const t = LEG_ZAMA[lang]
  return [I, T, L, P, G, R, RC, N].map((col, i) => ({ c: col, t: t[i], dot: i === 0 }))
}

const C = {
  fr: {
    metaTitle: "Les tactiques d'Hannibal — Trébie, Trasimène, Cannes, Zama",
    metaDesc: "Embuscades, terrain, renseignement et double enveloppement : les batailles d'Hannibal expliquées en schémas, de la Trébie à Zama, et leur héritage dans les écoles de guerre.",
    chip: 'Hannibal · Tactiques',
    title: "L'art de la guerre selon Hannibal",
    lede: 'Embuscades, terrain, renseignement et encerclement : 22 siècles plus tard, les écoles militaires étudient encore ses batailles.',
    heroAlt: 'John Trumbull — La mort de Paul Émile à la bataille de Cannes',
    heroCap: 'J. Trumbull — La mort de Paul Émile à Cannes (1773)',
    resultLabel: 'Bilan',
    prev: 'Précédent',
    next: 'Suivant',
    trapsTitle: 'Deux pièges avant Cannes',
    trapsSub: "Hiver 218 et printemps 217 av. J.-C. — d'après Polybe et Tite-Live",
    trebia: {
      aria: "Schéma de la bataille de la Trébie : les Romains traversent la rivière glacée et attaquent l'armée d'Hannibal, tandis que Magon, caché dans un ravin, les prend à revers.",
      kicker: 'La Trébie · décembre 218',
      title: "L'eau glacée et l'embuscade",
      text: "À l'aube, les cavaliers numides provoquent les Romains, qui franchissent la rivière glacée le ventre vide. Trempés, ils affrontent une armée reposée ; les 2 000 hommes de Magon, cachés dans un ravin, surgissent alors dans leur dos.",
      facts: [
        { k: 'Carthage', v: "Hannibal ; son frère Magon embusqué avec 1 000 fantassins et 1 000 cavaliers d'élite." },
        { k: 'Rome', v: "Le consul Tiberius Sempronius Longus, impatient de livrer bataille ; son collègue Scipion, blessé au Tessin quelques semaines plus tôt." },
        { k: 'Bilan', v: 'Environ 10 000 Romains percent le centre et se réfugient à Plaisance ; le reste de l’armée est détruit ou dispersé (Polybe).' }
      ]
    },
    trasimene: {
      aria: "Schéma de la bataille du lac Trasimène : la colonne romaine avance entre le lac et les collines où l'armée d'Hannibal est cachée ; l'entrée et la sortie du défilé sont fermées.",
      kicker: 'Lac Trasimène · 21 juin 217',
      title: 'Une armée entière dans le brouillard',
      text: "La colonne du consul Flaminius s'engage sur l'étroite rive, entre le lac et les collines. Dans la brume, Hannibal ferme l'entrée et la sortie puis attaque de tous côtés. Coincés contre l'eau, les Romains ne peuvent pas se déployer.",
      facts: [
        { k: 'Carthage', v: "Environ 55 000 hommes cachés sur les hauteurs, dans le brouillard du matin, qui attaquent en même temps sur toute la longueur de la colonne." },
        { k: 'Rome', v: 'Environ 30 000 légionnaires du consul Caius Flaminius, en colonne de marche, non déployés pour le combat.' },
        { k: 'Bilan', v: "En trois heures, environ 15 000 Romains sont tués, dont Flaminius ; beaucoup se noient en fuyant. 6 000 hommes qui avaient percé se rendent le lendemain. Rome nomme Fabius Maximus dictateur : il évitera désormais la bataille, d'où son surnom de « Cunctator », le Temporisateur." }
      ]
    },
    cannae: {
      title: 'Cannes, en trois temps',
      sub: '2 août 216 av. J.-C. — environ 50 000 Carthaginois contre 86 000 Romains',
      aria: 'Schéma animé de la bataille de Cannes',
      stepsLabel: 'Étapes de la bataille de Cannes',
      stepWord: 'Étape',
      phaseWord: 'Phase',
      phases: [
        {
          title: 'Le croissant',
          text: "Au centre, Gaulois et Ibères avancent en arc bombé vers les légions. Les Libyens, l'élite, attendent en retrait sur les deux ailes.",
          more: "Cette ligne, volontairement la plus faible, est conçue pour reculer sous la pression romaine. Hannibal et son frère Magon combattent eux-mêmes au centre, selon Polybe."
        },
        {
          title: 'Le recul calculé',
          text: "Le centre recule sans rompre et aspire les légions, qui s'entassent. Pendant ce temps, la cavalerie d'Hasdrubal met en fuite les cavaliers romains au bord de l'Aufide.",
          more: "Plus les Romains s'enfoncent, plus leur masse se comprime : au milieu, les légionnaires ne peuvent plus manier leurs armes. Les deux blocs d'infanterie lourde libyenne, intacts, se retrouvent sur leurs flancs."
        },
        {
          title: 'Le piège se referme',
          text: "Les Libyens pivotent et frappent les flancs, la cavalerie revient frapper les Romains dans le dos. C'est le « double enveloppement », encore étudié aujourd'hui.",
          more: "La cavalerie carthaginoise, après avoir dispersé celle de Rome, charge l'arrière de l'infanterie romaine. L'encerclement est total ; le consul Paul Émile est tué."
        }
      ],
      legend: legCannae('fr'),
      stats: [
        { n: '~50 000', t: 'Carthaginois : Gaulois et Ibères au centre, infanterie lourde libyenne sur les ailes, cavalerie ibère, gauloise et numide', tone: 'tile--purple' },
        { n: '~86 000', t: "Romains et alliés : 8 légions et autant d'alliés, massés en profondeur au centre, cavalerie sur les ailes" },
        { n: '50–70 000', t: 'Romains tués selon les sources', tone: 'tile--ink' },
        { n: '80', t: 'sénateurs ou anciens magistrats tués, selon Tite-Live' }
      ],
      result: "Victoire totale de Carthage et l'une des pires défaites de l'histoire de Rome. Selon Tite-Live, Magon fit verser devant le Sénat de Carthage les anneaux d'or pris aux chevaliers romains tombés. La manœuvre de double enveloppement reste le modèle de référence dans les académies militaires."
    },
    zama: {
      title: 'Zama, la leçon retournée',
      sub: 'Octobre 202 av. J.-C. — Scipion contre Hannibal, en Afrique',
      aria: "Schéma de la bataille de Zama : les éléphants d'Hannibal passent dans les couloirs laissés entre les manipules romains, puis la cavalerie de Lélius et de Massinissa revient frapper l'arrière carthaginois.",
      kicker: "La seule grande défaite d'Hannibal",
      carthage: "Environ 36 000 fantassins, 4 000 cavaliers et 80 éléphants. Une armée hétérogène : mercenaires, levées africaines et, en réserve, les vétérans d'Italie.",
      rome: 'Environ 30 000 à 35 000 fantassins et 6 000 à 9 000 cavaliers, dont les Numides de Massinissa : des légions aguerries et une cavalerie supérieure.',
      phases: [
        { title: 'Neutraliser les éléphants', text: 'Scipion aligne ses manipules en laissant des couloirs. Affolés par les trompettes, les éléphants y passent sans dégâts ou se retournent contre les Carthaginois.' },
        { title: "Le choc de l'infanterie", text: "Les deux premières lignes carthaginoises, mercenaires puis recrues, sont repoussées. Les vétérans d'Hannibal tiennent : le combat est acharné et indécis." },
        { title: 'La cavalerie décide', text: 'Après avoir dispersé la cavalerie carthaginoise, Lélius et Massinissa reviennent charger l’arrière d’Hannibal : la tactique de Cannes, retournée contre lui.' }
      ],
      result: "Victoire romaine décisive. Carthage perd la guerre et doit accepter une paix sévère ; Hannibal reconnaît la défaite et conseille lui-même au Sénat de l'accepter.",
      legend: legZama('fr')
    },
    weaponsTitle: "Les cinq armes d'Hannibal",
    armyCta: "L'armée de Carthage →",
    weapons: [
      { img: '/img/goya.jpg', alt: 'Goya — Hannibal contemplant l’Italie depuis les Alpes', title: 'Le terrain', text: "Rivière glacée à la Trébie, lac et collines à Trasimène : c'est toujours lui qui choisit le champ de bataille." },
      { img: '/img/trasimeno.jpg', alt: 'Le lac Trasimène', title: "L'embuscade", text: 'Magon caché dans un ravin à la Trébie, une armée entière dans le brouillard à Trasimène.' },
      { img: '/img/hannibal-bust.jpg', alt: "Buste d'Hannibal", pos: '50% 25%', title: 'Le renseignement', text: 'Espions et éclaireurs ; il étudie le caractère des consuls et exploite leur impatience.' },
      { img: '/img/zama.jpg', alt: 'Bataille de Zama', title: 'La cavalerie', text: 'Numides et Ibères, rapides et mobiles : décisifs sur les ailes et pour frapper les arrières.' },
      { img: '/img/leutemann.jpg', alt: "L'armée d'Hannibal dans les Alpes", pos: '50% 60%', title: 'La coalition', text: 'Libyens, Numides, Ibères, Gaulois : une armée de plusieurs peuples tenue unie seize ans en terre ennemie.' }
    ],
    schools: {
      kicker: "Hier → aujourd'hui",
      title: 'Enseigné dans les écoles de guerre',
      text: "En stratégie, « faire un Cannes » est devenu un nom commun pour désigner l'encerclement total d'une armée.",
      schlieffenAlt: 'Alfred von Schlieffen',
      items: [
        { k: 'Allemagne · 1909–1913', t: 'Schlieffen', p: "Le chef d'état-major publie une série d'études intitulée « Cannae » ; son plan d'invasion de 1914 en est directement inspiré." },
        { k: 'États-Unis · West Point', t: 'Schwarzkopf', p: "Cannes était la bataille préférée du futur commandant de la guerre du Golfe (1991) lorsqu'il était cadet." },
        { k: 'France · 1800', t: 'Napoléon', p: 'Il tenait Hannibal pour l’un des plus grands capitaines et étudia ses campagnes avant de franchir à son tour les Alpes, au Grand-Saint-Bernard.' },
        { k: 'Rome → Londres', t: 'La leçon inverse', p: 'Pour contrer Hannibal, Fabius évita la bataille. Sa « stratégie fabienne » a même donné son nom à la Fabian Society britannique.' }
      ]
    },
    relatedTitle: 'À lire aussi',
    links: [
      { to: '/hannibal', kick: 'Biographie', title: 'Hannibal Barca', text: 'De Carthagène à Zama, la vie du stratège qui fit trembler Rome.', cls: 'tile--purple' },
      { to: '/elephants', kick: '218 av. J.-C.', title: 'Le passage des éléphants', text: 'Du Rhône aux Alpes : 37 éléphants et une armée entière contre la montagne.', cls: '' },
      { to: '/guerres-puniques', kick: '264 – 146 av. J.-C.', title: 'Les guerres puniques', text: 'Trois guerres, un siècle de conflit pour la Méditerranée.', cls: 'tile--navy' }
    ],
    lbl: {
      trebia: 'TRÉBIE', frozen: 'GLACÉE', camp: 'CAMP ROMAIN', mago: 'MAGON · 2 000', hann: 'HANNIBAL', wet: 'ROMAINS TREMPÉS', eleph: 'ÉLÉPHANTS ●',
      hills: "COLLINES — L'ARMÉE D'HANNIBAL CACHÉE", lake: 'LAC TRASIMÈNE', fog: 'BROUILLARD DU MATIN', entry: 'ENTRÉE FERMÉE', block: 'BARRAGE',
      aufidus: 'AUFIDE', legions: 'LÉGIONS ROMAINES', gauls: 'GAULOIS & IBÈRES', libyans: 'LIBYENS', sucked: 'ASPIRÉES AU CENTRE', bends: 'LE CENTRE PLIE', hasdrubal: 'HASDRUBAL CONTOURNE', rear: 'CAVALERIE DANS LE DOS', total: 'ENCERCLEMENT TOTAL',
      veterans: "VÉTÉRANS D'ITALIE", elephants: '80 ÉLÉPHANTS', lanes: 'COULOIRS', romanLines: 'HASTATI · PRINCIPES · TRIARII', laelius: 'LÉLIUS', masinissa: 'MASSINISSA'
    }
  },
  en: {
    metaTitle: "Hannibal's tactics — Trebia, Trasimene, Cannae, Zama",
    metaDesc: "Ambushes, terrain, intelligence and double envelopment: Hannibal's battles explained in diagrams, from the Trebia to Zama, and their legacy in war colleges.",
    chip: 'Hannibal · Tactics',
    title: 'The art of war according to Hannibal',
    lede: 'Ambushes, terrain, intelligence and encirclement: 22 centuries later, military academies still study his battles.',
    heroAlt: 'John Trumbull — The Death of Paullus at the Battle of Cannae',
    heroCap: 'J. Trumbull — The Death of Paullus at Cannae (1773)',
    resultLabel: 'Outcome',
    prev: 'Previous',
    next: 'Next',
    trapsTitle: 'Two traps before Cannae',
    trapsSub: 'Winter 218 and spring 217 BC — after Polybius and Livy',
    trebia: {
      aria: "Diagram of the Battle of the Trebia: the Romans cross the icy river and attack Hannibal's army, while Mago, hidden in a ravine, takes them from behind.",
      kicker: 'The Trebia · December 218',
      title: 'Icy water and an ambush',
      text: 'At dawn, Numidian horsemen provoke the Romans, who cross the freezing river on empty stomachs. Soaked, they face a rested army; then Mago’s 2,000 men, hidden in a ravine, burst out behind them.',
      facts: [
        { k: 'Carthage', v: 'Hannibal; his brother Mago in ambush with 1,000 picked infantry and 1,000 cavalry.' },
        { k: 'Rome', v: 'The consul Tiberius Sempronius Longus, eager for battle; his colleague Scipio, wounded at the Ticinus a few weeks earlier.' },
        { k: 'Outcome', v: 'About 10,000 Romans break through the centre and escape to Placentia; the rest of the army is destroyed or scattered (Polybius).' }
      ]
    },
    trasimene: {
      aria: "Diagram of the Battle of Lake Trasimene: the Roman column advances between the lake and the hills where Hannibal's army is hidden; the entrance and exit of the defile are closed.",
      kicker: 'Lake Trasimene · 21 June 217',
      title: 'A whole army lost in the fog',
      text: "Consul Flaminius' column files onto the narrow shore between the lake and the hills. In the mist, Hannibal seals the entrance and the exit, then attacks from every side. Pinned against the water, the Romans cannot deploy.",
      facts: [
        { k: 'Carthage', v: 'About 55,000 men hidden on the heights in the morning fog, attacking all along the column at once.' },
        { k: 'Rome', v: 'About 30,000 legionaries under the consul Gaius Flaminius, in marching column, not deployed for battle.' },
        { k: 'Outcome', v: 'In three hours about 15,000 Romans are killed, Flaminius among them; many drown as they flee. 6,000 men who had broken through surrender the next day. Rome appoints Fabius Maximus dictator: from now on he avoids battle — hence his nickname "Cunctator", the Delayer.' }
      ]
    },
    cannae: {
      title: 'Cannae, in three moves',
      sub: '2 August 216 BC — some 50,000 Carthaginians against 86,000 Romans',
      aria: 'Animated diagram of the Battle of Cannae',
      stepsLabel: 'Steps of the Battle of Cannae',
      stepWord: 'Step',
      phaseWord: 'Phase',
      phases: [
        {
          title: 'The crescent',
          text: 'In the centre, Gauls and Iberians advance in a forward-bulging arc towards the legions. The Libyans, the elite, wait held back on both wings.',
          more: 'This deliberately weak line is designed to give way under Roman pressure. Hannibal and his brother Mago fight in the centre themselves, according to Polybius.'
        },
        {
          title: 'The calculated retreat',
          text: "The centre falls back without breaking and draws in the legions, which pile up. Meanwhile Hasdrubal's cavalry routs the Roman horse along the Aufidus.",
          more: 'The deeper the Romans push, the more their mass is compressed: in the middle, legionaries can no longer wield their weapons. The two intact blocks of Libyan heavy infantry now stand on their flanks.'
        },
        {
          title: 'The trap snaps shut',
          text: 'The Libyans wheel inward and strike the flanks; the cavalry returns to hit the Romans from behind. This is the "double envelopment", still studied today.',
          more: 'Having scattered the Roman horse, the Carthaginian cavalry charges the rear of the Roman infantry. The encirclement is complete; the consul Aemilius Paullus is killed.'
        }
      ],
      legend: legCannae('en'),
      stats: [
        { n: '~50,000', t: 'Carthaginians: Gauls and Iberians in the centre, Libyan heavy infantry on the wings, Iberian, Gallic and Numidian cavalry', tone: 'tile--purple' },
        { n: '~86,000', t: 'Romans and allies: 8 legions and as many allied troops, massed deep in the centre, cavalry on the wings' },
        { n: '50–70,000', t: 'Romans killed, depending on the source', tone: 'tile--ink' },
        { n: '80', t: 'senators or former magistrates killed, according to Livy' }
      ],
      result: "Total Carthaginian victory and one of the worst defeats in Roman history. According to Livy, Mago poured out before the Senate of Carthage the gold rings taken from fallen Roman knights. The double envelopment remains the textbook model in military academies."
    },
    zama: {
      title: 'Zama, the lesson reversed',
      sub: 'October 202 BC — Scipio against Hannibal, in Africa',
      aria: "Diagram of the Battle of Zama: Hannibal's elephants pass through lanes left between the Roman maniples, then the cavalry of Laelius and Masinissa returns to strike the Carthaginian rear.",
      kicker: "Hannibal's only major defeat",
      carthage: 'About 36,000 infantry, 4,000 cavalry and 80 elephants. A mixed army: mercenaries, African levies and, in reserve, the veterans of Italy.',
      rome: "About 30,000–35,000 infantry and 6,000–9,000 cavalry, including Masinissa's Numidians: seasoned legions and superior cavalry.",
      phases: [
        { title: 'Neutralising the elephants', text: 'Scipio lines up his maniples leaving open lanes. Panicked by the trumpets, the elephants run through harmlessly or turn back on the Carthaginians.' },
        { title: 'The infantry clash', text: "The first two Carthaginian lines, mercenaries then recruits, are driven back. Hannibal's veterans hold firm: the fighting is fierce and undecided." },
        { title: 'The cavalry decides', text: "Having scattered the Carthaginian horse, Laelius and Masinissa return to charge Hannibal's rear — the Cannae tactic turned against him." }
      ],
      result: 'Decisive Roman victory. Carthage loses the war and must accept harsh peace terms; Hannibal acknowledges defeat and himself advises the Senate to accept.',
      legend: legZama('en')
    },
    weaponsTitle: "Hannibal's five weapons",
    armyCta: 'The army of Carthage →',
    weapons: [
      { img: '/img/goya.jpg', alt: 'Goya — Hannibal viewing Italy from the Alps', title: 'Terrain', text: 'A freezing river at the Trebia, a lake and hills at Trasimene: he always chooses the battlefield.' },
      { img: '/img/trasimeno.jpg', alt: 'Lake Trasimene', title: 'Ambush', text: 'Mago hidden in a ravine at the Trebia, a whole army in the fog at Trasimene.' },
      { img: '/img/hannibal-bust.jpg', alt: 'Bust of Hannibal', pos: '50% 25%', title: 'Intelligence', text: 'Spies and scouts; he studies the character of the consuls and exploits their impatience.' },
      { img: '/img/zama.jpg', alt: 'Battle of Zama', title: 'Cavalry', text: 'Numidians and Iberians, fast and mobile: decisive on the wings and for striking the rear.' },
      { img: '/img/leutemann.jpg', alt: "Hannibal's army in the Alps", pos: '50% 60%', title: 'Coalition', text: 'Libyans, Numidians, Iberians, Gauls: an army of many peoples held together for sixteen years in enemy land.' }
    ],
    schools: {
      kicker: 'Then → now',
      title: 'Taught in war colleges',
      text: 'In strategy, "a Cannae" has become a common noun for the total encirclement of an army.',
      schlieffenAlt: 'Alfred von Schlieffen',
      items: [
        { k: 'Germany · 1909–1913', t: 'Schlieffen', p: 'The chief of the general staff published a series of studies entitled "Cannae"; his 1914 invasion plan was directly inspired by it.' },
        { k: 'United States · West Point', t: 'Schwarzkopf', p: 'Cannae was the favourite battle of the future commander of the Gulf War (1991) when he was a cadet.' },
        { k: 'France · 1800', t: 'Napoleon', p: 'He ranked Hannibal among the greatest captains and studied his campaigns before crossing the Alps in turn, by the Great St Bernard.' },
        { k: 'Rome → London', t: 'The opposite lesson', p: 'To counter Hannibal, Fabius avoided battle. His "Fabian strategy" even gave its name to Britain’s Fabian Society.' }
      ]
    },
    relatedTitle: 'Read also',
    links: [
      { to: '/hannibal', kick: 'Biography', title: 'Hannibal Barca', text: 'From Carthago Nova to Zama, the life of the strategist who made Rome tremble.', cls: 'tile--purple' },
      { to: '/elephants', kick: '218 BC', title: 'The elephants crossing', text: 'From the Rhône to the Alps: 37 elephants and a whole army against the mountains.', cls: '' },
      { to: '/guerres-puniques', kick: '264 – 146 BC', title: 'The Punic Wars', text: 'Three wars, a century of conflict over the Mediterranean.', cls: 'tile--navy' }
    ],
    lbl: {
      trebia: 'TREBIA', frozen: 'FROZEN', camp: 'ROMAN CAMP', mago: 'MAGO · 2,000', hann: 'HANNIBAL', wet: 'SOAKED ROMANS', eleph: 'ELEPHANTS ●',
      hills: "HILLS — HANNIBAL'S ARMY HIDDEN", lake: 'LAKE TRASIMENE', fog: 'MORNING FOG', entry: 'ENTRANCE SEALED', block: 'BLOCK',
      aufidus: 'AUFIDUS', legions: 'ROMAN LEGIONS', gauls: 'GAULS & IBERIANS', libyans: 'LIBYANS', sucked: 'DRAWN INTO THE CENTRE', bends: 'THE CENTRE BENDS', hasdrubal: 'HASDRUBAL SWINGS ROUND', rear: 'CAVALRY IN THE REAR', total: 'TOTAL ENCIRCLEMENT',
      veterans: 'VETERANS OF ITALY', elephants: '80 ELEPHANTS', lanes: 'LANES', romanLines: 'HASTATI · PRINCIPES · TRIARII', laelius: 'LAELIUS', masinissa: 'MASINISSA'
    }
  },
  ar: {
    metaTitle: 'تكتيكات حنبعل — تريبيا وتراسيمين وكاناي وزاما',
    metaDesc: 'الكمائن والأرض والاستخبارات والتطويق المزدوج: معارك حنبعل مشروحة بالرسوم، من تريبيا إلى زاما، وإرثها في المدارس الحربية.',
    chip: 'حنبعل · التكتيكات',
    title: 'فنّ الحرب عند حنبعل',
    lede: 'كمائن وأرض واستخبارات وتطويق: بعد اثنين وعشرين قرنًا، ما زالت المدارس العسكرية تدرس معاركه.',
    heroAlt: 'جون ترمبل — موت باولوس في معركة كاناي',
    heroCap: 'ج. ترمبل — موت باولوس في كاناي (1773)',
    resultLabel: 'الحصيلة',
    prev: 'السابق',
    next: 'التالي',
    trapsTitle: 'فخّان قبل كاناي',
    trapsSub: 'شتاء 218 وربيع 217 ق.م — حسب بوليبيوس وتيتوس ليفيوس',
    trebia: {
      aria: 'رسم لمعركة تريبيا: يعبر الرومان النهر المتجمّد ويهاجمون جيش حنبعل، بينما يباغتهم ماغون من الخلف بعد أن كمن في وادٍ.',
      kicker: 'تريبيا · ديسمبر 218',
      title: 'الماء المتجمّد والكمين',
      text: 'عند الفجر، يستفزّ الفرسان النوميديون الرومان فيعبرون النهر المتجمّد على بطون خاوية. مبلّلين، يواجهون جيشًا مرتاحًا؛ ثم ينقضّ رجال ماغون الألفان، المختبئون في وادٍ، على مؤخرتهم.',
      facts: [
        { k: 'قرطاج', v: 'حنبعل؛ وأخوه ماغون في كمين مع ألف من نخبة المشاة وألف فارس.' },
        { k: 'روما', v: 'القنصل تيبيريوس سمبرونيوس لونغوس المتعجّل للقتال؛ وزميله سكيبيو الجريح في معركة تيتشينو قبل أسابيع.' },
        { k: 'الحصيلة', v: 'نحو 10,000 روماني يخترقون الوسط ويلجؤون إلى بلاكنتيا؛ أما بقية الجيش فتُباد أو تتشتّت (بوليبيوس).' }
      ]
    },
    trasimene: {
      aria: 'رسم لمعركة بحيرة تراسيمين: يتقدّم الطابور الروماني بين البحيرة والتلال حيث يختبئ جيش حنبعل؛ وقد أُغلق مدخل المضيق ومخرجه.',
      kicker: 'بحيرة تراسيمين · 21 يونيو 217',
      title: 'جيش كامل في الضباب',
      text: 'يدخل طابور القنصل فلامينيوس الضفة الضيقة بين البحيرة والتلال. في الضباب، يغلق حنبعل المدخل والمخرج ثم يهاجم من كل الجهات. محشورين على الماء، لا يستطيع الرومان الانتشار.',
      facts: [
        { k: 'قرطاج', v: 'نحو 55,000 رجل مختبئين في المرتفعات وضباب الصباح، يهاجمون في وقت واحد على طول الطابور.' },
        { k: 'روما', v: 'نحو 30,000 جندي تحت القنصل غايوس فلامينيوس، في طابور مسيرة غير منتشرين للقتال.' },
        { k: 'الحصيلة', v: 'في ثلاث ساعات يُقتل نحو 15,000 روماني بينهم فلامينيوس، ويغرق كثيرون وهم يفرّون. ويستسلم في اليوم التالي 6,000 رجل كانوا قد اخترقوا الصفوف. تعيّن روما فابيوس ماكسيموس دكتاتورًا، فيتجنّب القتال منذ ذلك الحين، ومن هنا لقبه «كونكتاتور» أي المماطل.' }
      ]
    },
    cannae: {
      title: 'كاناي في ثلاث مراحل',
      sub: '2 أغسطس 216 ق.م — نحو 50,000 قرطاجي مقابل 86,000 روماني',
      aria: 'رسم متحرك لمعركة كاناي',
      stepsLabel: 'مراحل معركة كاناي',
      stepWord: 'المرحلة',
      phaseWord: 'المرحلة',
      phases: [
        {
          title: 'الهلال',
          text: 'في الوسط، يتقدّم الغاليون والإيبيريون في قوس محدّب نحو الفيالق. أما الليبيون، النخبة، فينتظرون في الخلف على الجناحين.',
          more: 'هذا الخط، الأضعف عمدًا، مصمَّم ليتراجع تحت الضغط الروماني. وحسب بوليبيوس، كان حنبعل وأخوه ماغون يقاتلان بنفسيهما في الوسط.'
        },
        {
          title: 'التراجع المحسوب',
          text: 'يتراجع الوسط دون أن ينكسر ويستدرج الفيالق فتتكدّس. وفي الأثناء، يشتّت فرسان صدربعل الفرسان الرومان على ضفة أوفيدوس.',
          more: 'كلما توغّل الرومان انضغطت كتلتهم: في الوسط لم يعد الجنود قادرين على استعمال أسلحتهم. وصارت كتلتا المشاة الليبيين الثقيلة، سليمتين، على جنبيهم.'
        },
        {
          title: 'الفخ يُطبق',
          text: 'يستدير الليبيون ويضربون الجنبين، ويعود الفرسان لضرب الرومان من الخلف. إنه «التطويق المزدوج» الذي ما زال يُدرَّس حتى اليوم.',
          more: 'بعد تشتيت الفرسان الرومان، يهاجم الفرسان القرطاجيون مؤخرة المشاة الرومان. التطويق كامل، ويُقتل القنصل إيميليوس باولوس.'
        }
      ],
      legend: legCannae('ar'),
      stats: [
        { n: '~50,000', t: 'قرطاجي: غاليون وإيبيريون في الوسط، مشاة ليبيون ثقيلون على الجناحين، فرسان إيبيريون وغاليون ونوميديون', tone: 'tile--purple' },
        { n: '~86,000', t: 'روماني وحليف: 8 فيالق ومثلها من الحلفاء، محتشدة في عمق الوسط، والفرسان على الجناحين' },
        { n: '50–70 ألف', t: 'روماني قُتلوا حسب المصادر', tone: 'tile--ink' },
        { n: '80', t: 'عضوًا في مجلس الشيوخ أو قاضيًا سابقًا قُتلوا، حسب تيتوس ليفيوس' }
      ],
      result: 'نصر قرطاجي ساحق وإحدى أسوأ الهزائم في تاريخ روما. ويروي تيتوس ليفيوس أن ماغون أفرغ أمام مجلس شيوخ قرطاج الخواتم الذهبية المأخوذة من الفرسان الرومان القتلى. وما زالت مناورة التطويق المزدوج النموذج المرجعي في الأكاديميات العسكرية.'
    },
    zama: {
      title: 'زاما، الدرس المقلوب',
      sub: 'أكتوبر 202 ق.م — سكيبيو في مواجهة حنبعل، في إفريقيا',
      aria: 'رسم لمعركة زاما: تمرّ فيلة حنبعل في الممرات المتروكة بين المانيبولات الرومانية، ثم يعود فرسان ليليوس وماسينيسا لضرب المؤخرة القرطاجية.',
      kicker: 'الهزيمة الكبرى الوحيدة لحنبعل',
      carthage: 'نحو 36,000 من المشاة و4,000 فارس و80 فيلًا. جيش غير متجانس: مرتزقة ومجنّدون أفارقة، وفي الاحتياط قدامى المحاربين العائدون من إيطاليا.',
      rome: 'نحو 30,000 إلى 35,000 من المشاة و6,000 إلى 9,000 فارس، منهم نوميديو ماسينيسا: فيالق مجرَّبة وفرسان متفوّقون.',
      phases: [
        { title: 'تحييد الفيلة', text: 'يصفّ سكيبيو مانيبولاته تاركًا ممرات بينها. فتمرّ الفيلة المذعورة من الأبواق دون ضرر، أو تنقلب على القرطاجيين.' },
        { title: 'صدام المشاة', text: 'يُدفع الخطّان القرطاجيان الأوّلان، المرتزقة ثم المجنّدون، إلى الخلف. ويصمد قدامى حنبعل: القتال عنيف وغير محسوم.' },
        { title: 'الفرسان يحسمون', text: 'بعد تشتيت الفرسان القرطاجيين، يعود ليليوس وماسينيسا لمهاجمة مؤخرة حنبعل: تكتيك كاناي، مقلوبًا ضده.' }
      ],
      result: 'نصر روماني حاسم. تخسر قرطاج الحرب وتقبل شروط سلام قاسية؛ ويعترف حنبعل بالهزيمة وينصح مجلس الشيوخ بنفسه بقبولها.',
      legend: legZama('ar')
    },
    weaponsTitle: 'أسلحة حنبعل الخمسة',
    armyCta: 'جيش قرطاج ←',
    weapons: [
      { img: '/img/goya.jpg', alt: 'غويا — حنبعل يتأمل إيطاليا من جبال الألب', title: 'الأرض', text: 'نهر متجمّد في تريبيا، وبحيرة وتلال في تراسيمين: هو دائمًا من يختار ساحة المعركة.' },
      { img: '/img/trasimeno.jpg', alt: 'بحيرة تراسيمين', title: 'الكمين', text: 'ماغون مختبئ في وادٍ في تريبيا، وجيش كامل في الضباب في تراسيمين.' },
      { img: '/img/hannibal-bust.jpg', alt: 'تمثال نصفي لحنبعل', pos: '50% 25%', title: 'الاستخبارات', text: 'جواسيس وكشّافة؛ يدرس طباع القناصل ويستغلّ تسرّعهم.' },
      { img: '/img/zama.jpg', alt: 'معركة زاما', title: 'الفرسان', text: 'نوميديون وإيبيريون، سريعون ومتحرّكون: حاسمون على الجناحين وفي ضرب المؤخرة.' },
      { img: '/img/leutemann.jpg', alt: 'جيش حنبعل في جبال الألب', pos: '50% 60%', title: 'التحالف', text: 'ليبيون ونوميديون وإيبيريون وغاليون: جيش من شعوب عدّة ظلّ متماسكًا ستة عشر عامًا في أرض العدو.' }
    ],
    schools: {
      kicker: 'الأمس ← اليوم',
      title: 'يُدرَّس في المدارس الحربية',
      text: 'في علم الاستراتيجيا، صارت «كاناي» اسمًا عامًا يدلّ على التطويق الكامل لجيش.',
      schlieffenAlt: 'ألفريد فون شليفن',
      items: [
        { k: 'ألمانيا · 1909–1913', t: 'شليفن', p: 'نشر رئيس الأركان سلسلة دراسات بعنوان «كاناي»، واستُلهمت منها مباشرة خطة الغزو الألمانية سنة 1914.' },
        { k: 'الولايات المتحدة · وست بوينت', t: 'شوارتزكوف', p: 'كانت كاناي معركته المفضّلة حين كان طالبًا عسكريًا، هو الذي قاد لاحقًا حرب الخليج (1991).' },
        { k: 'فرنسا · 1800', t: 'نابليون', p: 'عدّ حنبعل من أعظم القادة ودرس حملاته، ثم عبر بدوره جبال الألب من ممر سان برنار الكبير.' },
        { k: 'روما ← لندن', t: 'الدرس المعاكس', p: 'لمواجهة حنبعل تجنّب فابيوس القتال. وقد أعطت «الاستراتيجية الفابية» اسمها لجمعية فابيان البريطانية.' }
      ]
    },
    relatedTitle: 'اقرأ أيضًا',
    links: [
      { to: '/hannibal', kick: 'سيرة', title: 'حنبعل برقا', text: 'من قرطاجنة إلى زاما، حياة القائد الذي أرعب روما.', cls: 'tile--purple' },
      { to: '/elephants', kick: '218 ق.م', title: 'عبور الفيلة', text: 'من الرون إلى الألب: 37 فيلًا وجيش كامل في مواجهة الجبال.', cls: '' },
      { to: '/guerres-puniques', kick: '264 – 146 ق.م', title: 'الحروب البونيقية', text: 'ثلاث حروب وقرن من الصراع على المتوسط.', cls: 'tile--navy' }
    ],
    lbl: {
      trebia: 'تريبيا', frozen: 'متجمّد', camp: 'المعسكر الروماني', mago: 'ماغون · 2000', hann: 'حنبعل', wet: 'رومان مبلّلون', eleph: 'الفيلة ●',
      hills: 'تلال — جيش حنبعل مختبئ', lake: 'بحيرة تراسيمين', fog: 'ضباب الصباح', entry: 'المدخل مغلق', block: 'سدّ',
      aufidus: 'أوفيدوس', legions: 'الفيالق الرومانية', gauls: 'الغاليون والإيبيريون', libyans: 'الليبيون', sucked: 'مُستدرَجة إلى الوسط', bends: 'الوسط يتراجع', hasdrubal: 'صدربعل يلتفّ', rear: 'الفرسان من الخلف', total: 'تطويق كامل',
      veterans: 'قدامى إيطاليا', elephants: '80 فيلًا', lanes: 'ممرات', romanLines: 'هاستاتي · برينكيبس · ترياري', laelius: 'ليليوس', masinissa: 'ماسينيسا'
    }
  }
}

const c = computed(() => C[locale.value] || C.fr)

useHead(() => ({
  title: c.value.metaTitle,
  meta: [{ name: 'description', content: c.value.metaDesc }]
}))
</script>

<style scoped>
/* Héros */
.hero-mark {
  position: absolute;
  inset-inline-end: -10px;
  bottom: -60px;
  font-size: clamp(180px, 22vw, 320px);
  color: rgba(255, 255, 255, 0.06);
  pointer-events: none;
}
.hero-chips, .hero-txt { position: relative; }
.chip-purple { background: var(--purple); color: var(--white); }
.hero-phoen { font-size: 20px; padding: 6px 13px; }
.hero-title { font-size: clamp(44px, 6.1vw, 88px); overflow-wrap: break-word; }
.hero-fig { background: #8E3720; }

.sec-head--in { padding-inline: var(--gutter); }

/* Schémas */
.diagram {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 20px;
  background: #EFE7DA;
  direction: ltr;
}
.lbl {
  font-family: var(--font-body);
  font-weight: 700;
  letter-spacing: 0.02em;
}
.lbl--wide { letter-spacing: 0.12em; }

/* Cartes bataille */
.battle { padding: 12px; display: flex; flex-direction: column; }
.battle-body {
  padding: 22px 14px 6px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: 24px;
}
.battle-title { font: 800 clamp(22px, 2vw, 28px)/1.05 var(--font-display); margin: 0; }
.facts {
  margin: 12px 14px 8px;
  display: flex;
  flex-direction: column;
}
.facts > div {
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr);
  gap: 16px;
  padding: 12px 0;
  border-top: 1px solid rgba(22, 19, 15, 0.15);
}
.tile--ink .facts > div { border-top-color: rgba(255, 255, 255, 0.16); }
.facts dt { font: 700 13px/1.4 var(--font-body); color: var(--purple); }
.tile--ink .facts dt { color: var(--gold-light); }
.facts dd { margin: 0; font: 400 14px/1.5 var(--font-body); color: var(--muted); }
.tile--ink .facts dd { color: var(--on-dark); }

/* Cannes */
.diagram-tile { padding: 12px; display: flex; flex-direction: column; gap: 12px; }
.unit {
  transition: transform 0.9s cubic-bezier(0.6, 0, 0.3, 1), opacity 0.6s ease;
}
.overlay { opacity: 0; transition: opacity 0.5s ease; }
.overlay.on { opacity: 1; transition-delay: 0.45s; }

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  padding: 6px 10px 6px;
  font: 500 13px/1.2 var(--font-body);
}
.legend span { display: inline-flex; align-items: center; gap: 8px; }
.legend i { width: 14px; height: 10px; border-radius: 2px; flex: none; }
.legend i.dot { width: 10px; border-radius: 50%; }

.step-seg { margin-bottom: 28px; align-self: flex-start; width: max-content; }
.phase-title { margin: 0 0 16px; }
.phase-more { margin-top: 14px; }
.step-panel .body-lg { color: var(--white); }

.step-nav { display: flex; gap: 8px; flex-wrap: wrap; }
.nav-btn { background: rgba(255, 255, 255, 0.14); color: var(--white); }
.nav-btn:hover:not(:disabled) { background: var(--white); color: var(--ink); }
.nav-btn:disabled { opacity: 0.4; cursor: default; }
[dir="rtl"] .flip { display: inline-block; transform: scaleX(-1); }

.cannae-stats { margin-top: var(--gap); }
.stat-tile { padding: 22px; }
.stat-n { font: 900 clamp(28px, 2.6vw, 36px)/1 var(--font-display); }
.stat-tile p { font: 500 13px/1.4 var(--font-body); margin-top: 8px; }
.result { margin-top: var(--gap); }
.result .body-lg { color: var(--ink); }

/* Zama */
.forces { display: grid; gap: 14px; margin-bottom: 24px; }
.forces dt { font: 700 13px/1 var(--font-body); color: var(--gold-light); margin-bottom: 6px; }
.forces dd { margin: 0; font: 400 15px/1.5 var(--font-body); color: var(--on-dark); }
.zphases { list-style: none; padding: 0; margin: 0; display: grid; gap: 16px; }
.zphases li { display: flex; gap: 14px; align-items: flex-start; }
.zn {
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--gold);
  color: var(--ink);
  display: grid;
  place-items: center;
  font: 800 14px/1 var(--font-display);
}
.zt { font: 800 18px/1.15 var(--font-display); margin: 4px 0 6px; }
.zresult {
  font: 400 15px/1.55 var(--font-body);
  color: var(--on-dark-2) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  padding-top: 18px;
}
.zresult strong { color: var(--gold-light); }

/* Cinq armes */
.w-img { position: relative; }
.w-img img {
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: calc(var(--r-lg) - 8px);
  background: var(--sand-deep);
  display: block;
}
.w-num {
  position: absolute;
  inset-inline-start: 10px;
  top: 10px;
  background: var(--white);
  color: var(--purple);
  border-radius: 999px;
  padding: 7px 11px;
  font: 800 14px/1 var(--font-display);
}

/* Écoles de guerre */
.schools-head { margin-bottom: 36px; }
.schools-lede { color: var(--navy-soft) !important; font: 400 16px/1.55 var(--font-body) !important; max-width: 380px !important; }
.schools {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) repeat(3, minmax(0, 1fr));
  gap: var(--gap);
}
.school { background: var(--navy-deep); border-radius: 24px; padding: 24px; }
.school p { font: 400 14px/1.5 var(--font-body); color: var(--navy-soft); }
.school--img {
  padding: 12px;
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 18px;
}
.school--img img {
  width: 120px;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  border-radius: 16px;
  background: #0F2338;
}
.school--img > div { padding-block: 12px 8px; padding-inline-end: 8px; }

/* Liens */
.related-title { margin-bottom: 24px; padding-inline: var(--gutter); }
.link-tile { min-height: 220px; }
.more { font: 700 20px/1 var(--font-body); }
[dir="rtl"] .more { transform: scaleX(-1); align-self: flex-end; }

/* Responsive */
@media (max-width: 1100px) {
  .schools { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 960px) {
  .hero-fig { min-height: clamp(260px, 60vw, 460px); }
}

@media (max-width: 640px) {
  .sec-head--in, .related-title { padding-inline: 4px; }
  .battle-body { grid-template-columns: minmax(0, 1fr); gap: 10px; padding: 18px 8px 4px; }
  .facts { margin-inline: 8px; }
  .facts > div { grid-template-columns: minmax(0, 1fr); gap: 4px; }
  .step-seg { width: 100%; }
  .step-seg button { flex: 1 1 0; padding-inline: 10px; }
  .schools { grid-template-columns: minmax(0, 1fr); }
  .school--img { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .school--img img { width: 100%; height: 220px; min-height: 0; }
  .school--img > div { padding: 16px 12px 12px; }
  .legend { gap: 8px 14px; font-size: 12px; }
  .link-tile { min-height: 0; }
}
</style>
