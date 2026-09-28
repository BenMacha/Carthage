<template>
  <div class="pg">
    <!-- Héros -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--navy tile--stack tile--hero s-7">
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display hero-title">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
        <div class="chips">
          <span v-for="t in c.hero.tags" :key="t" class="chip chip--glass">{{ t }}</span>
        </div>
      </div>
      <div class="tile tile--xl tile--ink tile--stack s-5 hero-word">
        <span class="kicker">{{ c.hero.wordKicker }}</span>
        <p class="phoen hero-glyphs" dir="rtl" lang="phn" aria-hidden="true">{{ qart }}</p>
        <div>
          <p class="hero-tr">Qrtḥdšt</p>
          <p class="body">{{ c.hero.wordText }}</p>
        </div>
      </div>
    </div>

    <!-- Chiffres-clés -->
    <div class="cols cols-4 keep-2 stats">
      <div v-for="(s, i) in c.stats" :key="i" class="tile tile--stack stat" :class="statTones[i]">
        <span class="num">{{ s.n }}</span>
        <p class="body">{{ s.t }}</p>
      </div>
    </div>

    <!-- Alphabet -->
    <section id="alphabet" class="sec sec--wide">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.abc.kicker }}</span>
          <h2 class="h-section">{{ c.abc.title }}</h2>
        </div>
        <p>{{ c.abc.intro }}</p>
      </div>
    </section>
    <ol class="abc" :aria-label="c.abc.listLabel">
      <li v-for="l in letters" :key="l.i" class="ltr">
        <span class="ltr-n">{{ l.i + 1 }}</span>
        <span class="phoen ltr-g" aria-hidden="true">{{ l.g }}</span>
        <span class="ltr-name">{{ l.name }}</span>
        <span class="ltr-tr"><b>{{ l.tr }}</b> · {{ l.meaning }}</span>
        <span class="ltr-desc">
          <span :title="c.abc.greek">{{ l.greek }}</span>
          <span v-if="l.latin" :title="c.abc.latin"> · {{ l.latin }}</span>
          <span class="ar ltr-ar" lang="ar" :title="c.abc.arabic"> · {{ l.arabic }}</span>
        </span>
      </li>
    </ol>
    <p class="abc-note">{{ c.abc.note }}</p>

    <!-- Écris ton nom -->
    <section class="sec">
      <div class="tile tile--xl tile--purple writer">
        <div class="writer-intro">
          <span class="kicker">{{ c.w.kicker }}</span>
          <h2 class="h-block">{{ c.w.title }}</h2>
          <p class="body-lg w-lede">{{ c.w.lede }}</p>
        </div>
        <div class="writer-box">
          <label for="phn-name" class="w-label">{{ c.w.label }}</label>
          <input
            id="phn-name"
            v-model="name"
            type="text"
            class="w-input"
            maxlength="40"
            autocomplete="off"
            spellcheck="false"
            :placeholder="c.w.placeholder"
          >
          <div class="seg w-seg" role="group" :aria-label="c.w.modeLabel">
            <button type="button" :class="{ on: vowels }" :aria-pressed="vowels" @click="vowels = true">{{ c.w.withV }}</button>
            <button type="button" :class="{ on: !vowels }" :aria-pressed="!vowels" @click="vowels = false">{{ c.w.noV }}</button>
          </div>
          <div class="w-out-wrap">
            <p class="phoen w-out" dir="rtl" lang="phn" aria-hidden="true">{{ result.text || '—' }}</p>
            <p class="sr-only" aria-live="polite">{{ result.spoken ? c.w.spoken + result.spoken : c.w.empty }}</p>
          </div>
          <ul v-if="result.tokens.length" class="chips w-chips">
            <li v-for="(t, k) in result.tokens" :key="k" class="chip w-chip">
              <span class="w-src">{{ t.src }}</span> → <span class="phoen" aria-hidden="true">{{ t.glyphs }}</span> {{ t.names }}
            </li>
          </ul>
          <p class="w-note">{{ c.w.note }} <span class="phoen" dir="rtl" lang="phn" aria-hidden="true">{{ hannibal }}</span> {{ c.w.note2 }}</p>
        </div>
      </div>
    </section>

    <!-- De la langue phénicienne au punique -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--outline lang">
          <div>
            <span class="kicker">{{ c.lang.kicker }}</span>
            <h2 class="h-block lang-title">{{ c.lang.title }}</h2>
          </div>
          <div class="rows" style="--row-key:190px">
            <div v-for="r in c.lang.rows" :key="r.key">
              <span class="key lang-key">{{ r.key }}</span>
              <span class="val lang-val">{{ r.val }}</span>
            </div>
          </div>
        </div>
        <div class="lang-side">
          <div class="tile tile--xl tile--ink tile--stack aug">
            <span class="kicker">{{ c.aug.kicker }}</span>
            <blockquote class="aug-quote">
              <p>{{ c.aug.quote }}</p>
              <cite>{{ c.aug.cite }}</cite>
            </blockquote>
            <p class="body">{{ c.aug.nuance }}</p>
          </div>
          <div class="tile tile--gold tile--stack">
            <span class="kicker">{{ c.subst.kicker }}</span>
            <p class="body">{{ c.subst.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Inscriptions -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.ins.kicker }}</span>
          <h2 class="h-section">{{ c.ins.title }}</h2>
        </div>
        <p>{{ c.ins.intro }}</p>
      </div>
    </section>
    <div class="bento">
      <figure class="fig s-5 tophet-fig" style="background:#5E574F">
        <img src="/img/tanit-stele.jpg" :alt="c.ins.tophet.alt" loading="lazy">
        <figcaption>{{ c.ins.tophet.caption }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--stack s-7">
        <div>
          <span class="kicker">{{ c.ins.tophet.kicker }}</span>
          <h3 class="h-block ins-title">{{ c.ins.tophet.title }}</h3>
          <p class="body-lg">{{ c.ins.tophet.p1 }}</p>
        </div>
        <div class="formula">
          <p class="phoen formula-g" dir="rtl" lang="phn" aria-hidden="true">{{ formula }}</p>
          <p class="formula-tr">lrbt ltnt pn bʿl wlʾdn lbʿl ḥmn</p>
          <p class="body">{{ c.ins.tophet.formula }}</p>
        </div>
        <p class="body">
          {{ c.ins.tophet.p2a }}<NuxtLink :to="localePath('/religion')" class="inline-link">{{ c.ins.tophet.link }}</NuxtLink>{{ c.ins.tophet.p2b }}
        </p>
      </div>
    </div>
    <div class="cols cols-4 ins-grid">
      <div v-for="t in c.ins.cards" :key="t.title" class="tile tile--stack ins-card" :class="t.tone">
        <div>
          <span class="kicker">{{ t.kicker }}</span>
          <h3 class="h-card">{{ t.title }}</h3>
          <p class="body">{{ t.text }}</p>
        </div>
        <span class="chip">{{ t.where }}</span>
      </div>
    </div>

    <!-- Littérature perdue -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <div class="tile tile--xl tile--terra tile--stack libs">
          <div>
            <span class="kicker">{{ c.lit.kicker }}</span>
            <h2 class="h-block">{{ c.lit.title }}</h2>
            <p class="body-lg p2">{{ c.lit.p1 }}</p>
            <p class="body-lg p2">{{ c.lit.p2 }}</p>
          </div>
          <span class="chip chip--glass">{{ c.lit.src }}</span>
        </div>
        <div class="tile tile--xl tile--paper">
          <span class="kicker">{{ c.lit.worksKicker }}</span>
          <h3 class="h-block lit-h">{{ c.lit.worksTitle }}</h3>
          <div class="rows" style="--row-key:180px">
            <div v-for="r in c.lit.works" :key="r.key">
              <span class="key lit-key">{{ r.key }}</span>
              <span class="val">
                {{ r.val }}
                <NuxtLink v-if="r.to" :to="localePath(r.to)" class="inline-link">{{ r.toLabel }} →</NuxtLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Héritage -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.her.kicker }}</span>
          <h2 class="h-section">{{ c.her.title }}</h2>
        </div>
        <p>{{ c.her.intro }}</p>
      </div>
    </section>
    <div class="cols cols-2 her">
      <div class="tile tile--xl tile--stack">
        <div>
          <span class="kicker">{{ c.her.tree.kicker }}</span>
          <h3 class="h-card">{{ c.her.tree.title }}</h3>
        </div>
        <ol class="lineage">
          <li v-for="b in c.her.tree.branches" :key="b.label" class="branch">
            <span class="branch-label">{{ b.label }}</span>
            <span class="branch-steps">
              <template v-for="(s, k) in b.steps" :key="s">
                <span v-if="k" class="arrow" aria-hidden="true">→</span>
                <span class="chip step">{{ s }}</span>
              </template>
            </span>
          </li>
        </ol>
      </div>
      <div class="tile tile--xl tile--navy tile--stack">
        <div>
          <span class="kicker">{{ c.her.evo.kicker }}</span>
          <h3 class="h-card">{{ c.her.evo.title }}</h3>
        </div>
        <div class="evo-wrap">
          <table class="evo">
            <caption class="sr-only">{{ c.her.evo.caption }}</caption>
            <thead>
              <tr>
                <th scope="col">{{ c.her.evo.cols[0] }}</th>
                <th scope="col">{{ c.her.evo.cols[1] }}</th>
                <th scope="col">{{ c.her.evo.cols[2] }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="e in evo" :key="e.lat">
                <td><span class="phoen evo-g" aria-hidden="true">{{ e.g }}</span> <span class="evo-name">{{ e.name }}</span></td>
                <td class="evo-big">{{ e.gr }}</td>
                <td class="evo-big">{{ e.lat }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="body">{{ c.her.evo.note }}</p>
      </div>
    </div>

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <h2 class="h-section related-title">{{ c.relatedTitle }}</h2>
    </section>
    <div class="cols cols-3">
      <NuxtLink v-for="l in c.related" :key="l.to" :to="localePath(l.to)" class="tile tile--stack related" :class="l.cls">
        <span class="kicker">{{ l.kick }}</span>
        <div>
          <h3 class="h-card">{{ l.title }}</h3>
          <p class="body">{{ l.text }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

// Alphabet phénicien : U+10900 (ʾālep) → U+10915 (tāw)
const G = (i) => String.fromCodePoint(0x10900 + i)
const BASE = [
  { name: 'ʾālep', tr: 'ʾ', greek: 'Α', latin: 'A', arabic: 'ا' },
  { name: 'bēt', tr: 'b', greek: 'Β', latin: 'B', arabic: 'ب' },
  { name: 'gīml', tr: 'g', greek: 'Γ', latin: 'C, G', arabic: 'ج' },
  { name: 'dālet', tr: 'd', greek: 'Δ', latin: 'D', arabic: 'د' },
  { name: 'hē', tr: 'h', greek: 'Ε', latin: 'E', arabic: 'ه' },
  { name: 'wāw', tr: 'w', greek: 'Ϝ, Υ', latin: 'F, V, U, W, Y', arabic: 'و' },
  { name: 'zayin', tr: 'z', greek: 'Ζ', latin: 'Z', arabic: 'ز' },
  { name: 'ḥēt', tr: 'ḥ', greek: 'Η', latin: 'H', arabic: 'ح' },
  { name: 'ṭēt', tr: 'ṭ', greek: 'Θ', latin: '', arabic: 'ط' },
  { name: 'yōd', tr: 'y', greek: 'Ι', latin: 'I, J', arabic: 'ي' },
  { name: 'kap', tr: 'k', greek: 'Κ', latin: 'K', arabic: 'ك' },
  { name: 'lāmed', tr: 'l', greek: 'Λ', latin: 'L', arabic: 'ل' },
  { name: 'mēm', tr: 'm', greek: 'Μ', latin: 'M', arabic: 'م' },
  { name: 'nūn', tr: 'n', greek: 'Ν', latin: 'N', arabic: 'ن' },
  { name: 'sāmek', tr: 's', greek: 'Ξ', latin: '', arabic: 'س' },
  { name: 'ʿayin', tr: 'ʿ', greek: 'Ο', latin: 'O', arabic: 'ع' },
  { name: 'pē', tr: 'p', greek: 'Π', latin: 'P', arabic: 'ف' },
  { name: 'ṣādē', tr: 'ṣ', greek: 'Ϻ', latin: '', arabic: 'ص' },
  { name: 'qōp', tr: 'q', greek: 'Ϙ', latin: 'Q', arabic: 'ق' },
  { name: 'rēš', tr: 'r', greek: 'Ρ', latin: 'R', arabic: 'ر' },
  { name: 'šīn', tr: 'š', greek: 'Σ', latin: 'S', arabic: 'ش' },
  { name: 'tāw', tr: 't', greek: 'Τ', latin: 'T', arabic: 'ت' }
]

// Translittération savante → glyphes (pour les mots cités)
const TR = Object.fromEntries(BASE.map((b, i) => [b.tr, i]))
const phn = (s) => Array.from(s).map(ch => (ch in TR ? G(TR[ch]) : ch)).join('')
const qart = phn('qrtḥdšt')
const hannibal = phn('ḥnbʿl')
const formula = phn('lrbt ltnt pn bʿl wlʾdn lbʿl ḥmn')

const evo = [0, 1, 3, 12, 15, 19].map(i => ({
  g: G(i),
  name: BASE[i].name,
  gr: BASE[i].greek,
  lat: BASE[i].latin
}))

const statTones = ['tile--gold', '', 'tile--terra', 'tile--ink']

/* ---------- « Écris ton nom en phénicien » ---------- */
const name = ref('Hannibal')
const vowels = ref(true)

const LAT_DI = { sh: [20], ch: [20], th: [21], ph: [16], kh: [7], ou: [5], qu: [18], ts: [17], tz: [17] }
const LAT = {
  a: [0], b: [1], c: [10], d: [3], e: [4], f: [16], g: [2], h: [7], i: [9], j: [9],
  k: [10], l: [11], m: [12], n: [13], o: [15], p: [16], q: [18], r: [19], s: [14],
  t: [21], u: [5], v: [5], w: [5], x: [10, 14], y: [9], z: [6]
}
const ARA = {
  'ا': [0], 'ء': [0], 'ب': [1], 'ت': [21], 'ث': [20], 'ج': [2], 'ح': [7], 'خ': [7],
  'د': [3], 'ذ': [6], 'ر': [19], 'ز': [6], 'س': [14], 'ش': [20], 'ص': [17], 'ض': [17],
  'ط': [8], 'ظ': [8], 'ع': [15], 'غ': [15], 'ف': [16], 'ق': [18], 'ك': [10], 'ل': [11],
  'م': [12], 'ن': [13], 'ه': [4], 'ة': [4], 'و': [5], 'ي': [9], 'ى': [9]
}
const VOWELS = 'aeiou'

const result = computed(() => {
  const src = (name.value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
  const chars = Array.from(src)
  const words = []
  let word = []
  const push = (label, idx) => {
    // sans voyelles : pas de consonne doublée (la gémination ne s'écrit pas)
    if (!vowels.value && word.length) {
      const prev = word[word.length - 1].idx
      if (prev.length === 1 && idx.length === 1 && prev[0] === idx[0]) return
    }
    word.push({ src: label, idx })
  }
  for (let k = 0; k < chars.length; k++) {
    const ch = chars[k]
    if (/\s|-/.test(ch)) {
      if (word.length) { words.push(word); word = [] }
      continue
    }
    const di = ch + (chars[k + 1] || '')
    if (di === 'ou') {
      k++
      if (vowels.value) push(di, [5])
      else if (!word.length) push(di, [0]) // voyelle initiale portée par ʾālep
      continue
    }
    if (LAT_DI[di]) { push(di, LAT_DI[di]); k++; continue }
    if (ch === 'c' && /[eiy]/.test(chars[k + 1] || '')) { push(ch, [14]); continue }
    if (LAT[ch]) {
      if (!vowels.value && VOWELS.includes(ch)) {
        if (!word.length) push(ch, [0]) // voyelle initiale portée par ʾālep
        continue
      }
      push(ch, LAT[ch]); continue
    }
    if (ARA[ch]) push(ch, ARA[ch])
  }
  if (word.length) words.push(word)
  const tokens = words.flat().map(t => ({
    src: t.src.toUpperCase(),
    glyphs: t.idx.map(G).join(''),
    names: t.idx.map(i => BASE[i].name).join(' + ')
  }))
  return {
    text: words.map(w => w.map(t => t.idx.map(G).join('')).join('')).join(' '),
    spoken: tokens.map(t => t.names).join(', '),
    tokens
  }
})

const C = {
  fr: {
    meta: {
      title: "Langue et écriture puniques — l'alphabet phénicien, les inscriptions, les livres perdus",
      desc: "L'alphabet phénicien de 22 lettres, du punique au néopunique, les inscriptions (tophet, tarif de Marseille, Pyrgi, Dougga), la littérature perdue de Carthage et son héritage. Écrivez votre nom en phénicien."
    },
    hero: {
      chip: 'Carthage · Langue et écriture',
      title: 'Langue et écriture puniques',
      lede: "Vingt-deux consonnes, écrites de droite à gauche : l'alphabet venu de Phénicie a porté la langue de Carthage pendant des siècles — et il est à l'origine du nôtre.",
      tags: ['Langue sémitique', 'Écriture de droite à gauche', '22 lettres'],
      wordKicker: 'Carthage, en punique',
      wordText: "Qart-ḥadasht, « la Ville nouvelle » : le nom de Carthage tel que l'écrivaient ses habitants, sans voyelles."
    },
    stats: [
      { n: '22', t: "lettres, toutes des consonnes : l'alphabet phénicien" },
      { n: '0', t: 'voyelle notée dans l’écriture phénicienne classique' },
      { n: '~800', t: "av. J.-C. : la stèle de Nora, IXe–VIIIe s. (Sardaigne), l'une des plus anciennes inscriptions phéniciennes d'Occident" },
      { n: '~400', t: 'apr. J.-C. : saint Augustin entend encore parler punique dans les campagnes' }
    ],
    abc: {
      kicker: 'Les 22 lettres',
      title: "L'alphabet phénicien",
      intro: "Chaque lettre porte le nom d'un mot qui commence par elle. Le sens de ces noms est traditionnel ; pour certains, il reste incertain.",
      listLabel: "Les 22 lettres de l'alphabet phénicien",
      greek: 'Lettre grecque issue',
      latin: 'Lettre latine issue',
      arabic: 'Lettre arabe correspondante',
      note: "Sous chaque lettre : translittération savante, sens traditionnel du nom, puis la lettre grecque qui en dérive, la lettre latine qui en descend (quand il y en a une) et la lettre arabe correspondante. L'ordre ancien de l'alphabet arabe — abjad, hawwaz, ḥuṭṭī… — suit encore celui des Phéniciens.",
      meanings: ['bœuf', 'maison', 'chameau', 'porte', 'incertain', 'crochet', 'arme', 'clôture', 'incertain', 'main', 'paume', 'aiguillon', 'eau', 'poisson', 'appui', 'œil', 'bouche', 'incertain', 'incertain', 'tête', 'dent', 'marque']
    },
    w: {
      kicker: 'À vous de jouer',
      title: 'Écrivez votre nom en phénicien',
      lede: 'Tapez un prénom (en lettres latines ou arabes) : chaque son est remplacé par la lettre phénicienne la plus proche.',
      label: 'Votre prénom',
      placeholder: 'Ex. : Élissa, Yasmine, Hannon',
      modeLabel: 'Mode de transcription',
      withV: 'Avec voyelles (à la néopunique)',
      noV: 'Sans voyelles (à la phénicienne)',
      spoken: 'Lettres : ',
      empty: 'Aucune lettre à transcrire',
      note: "Approximation ludique : l'alphabet phénicien n'avait pas de voyelles et certains sons n'existaient pas (v, j, é…). Le vrai Hannibal s'écrivait",
      note2: "(Ḥnbʿl, « grâce de Baal »), de droite à gauche."
    },
    lang: {
      kicker: 'Une langue sémitique',
      title: 'Du phénicien au punique, puis au néopunique',
      rows: [
        { key: 'IXe – VIIIe s. av.', val: "La stèle de Nora, en Sardaigne, montre l'écriture phénicienne déjà installée en Méditerranée occidentale." },
        { key: 'VIIIe – IIe s. av.', val: "Le punique, phénicien d'Occident, devient la langue commune du monde carthaginois, avec une prononciation propre marquée par le libyque (Lancel)." },
        { key: 'IIIe – Ier s. av.', val: "Les royaumes numides l'adoptent comme langue de pouvoir : leurs monnaies portent des légendes puniques (Lancel)." },
        { key: 'Après 146', val: "La chute de Carthage n'éteint pas la langue. L'écriture « néopunique », plus cursive, note désormais certaines voyelles ; on grave encore des inscriptions aux Ier et IIe s. apr. J.-C." },
        { key: 'IVe s. apr.', val: "On écrit le punique en lettres latines (Lancel) : l'alphabet change, la langue demeure." }
      ]
    },
    aug: {
      kicker: 'Saint Augustin, vers 400',
      quote: "« Interrogez nos paysans sur ce qu'ils sont : ils répondent en punique “Chanani”. »",
      cite: 'Augustin, Epistolae ad Romanos inchoata expositio, 13',
      nuance: "Le passage est souvent cité comme preuve que le punique était encore parlé, et que ses locuteurs se disaient « Cananéens ». Mais le texte est rhétorique et ses manuscrits divergent ; Gabriel Camps y voit plutôt un parler libyque, punicus signifiant souvent « africain » à cette époque."
    },
    subst: {
      kicker: 'Hypothèse',
      text: "Pour Stéphane Gsell, puis M'hamed Hassine Fantar, la survie d'une langue sémitique en Afrique du Nord aurait pu faciliter, des siècles plus tard, l'arabisation du Maghreb."
    },
    ins: {
      kicker: 'Épigraphie',
      title: 'Ce que disent les pierres',
      intro: "Faute de livres, les inscriptions sont notre principale source écrite. Elles sont nombreuses, mais souvent brèves et répétitives.",
      tophet: {
        kicker: 'Des milliers de stèles',
        title: 'Les stèles du tophet',
        alt: 'Stèle punique au signe de Tanit',
        caption: 'Stèle au signe de Tanit, musée du Louvre',
        p1: "Les tophets de Carthage et d'autres cités en ont livré des milliers, réunies dans le Corpus Inscriptionum Semiticarum. Leurs textes sont très stéréotypés : ils livrent peu sur l'histoire de la cité et un nombre limité de noms propres.",
        formula: "« À la Dame Tanit, face de Baal, et au Seigneur Baal Hammon » : la formule de dédicace qui ouvre une grande partie des stèles de Carthage.",
        p2a: 'Sur ces dieux et le débat autour du tophet, voir la page ',
        link: 'religion',
        p2b: '.'
      },
      cards: [
        { kicker: 'Marseille, 1845', title: 'Le tarif de Marseille', text: "Trouvé dans le port de Marseille, ce règlement fixe, animal par animal, la part due aux prêtres pour chaque sacrifice. Les spécialistes lui attribuent une origine carthaginoise.", where: 'Musée de la Vieille Charité, Marseille', tone: 'tile--terra' },
        { kicker: 'Vers 500 av. J.-C.', title: 'Les lamelles de Pyrgi', text: "Trois feuilles d'or découvertes en 1964 dans le port de Caere : deux en étrusque, une en phénicien. Le roi Thefarie Velianas y dédie un lieu saint à Uni-Astarté.", where: 'Villa Giulia, Rome', tone: 'tile--gold' },
        { kicker: 'IIe s. av. J.-C.', title: 'La bilingue de Dougga', text: "Sur le mausolée libyco-punique de Dougga, un même texte en punique et en libyque — une clé pour déchiffrer l'écriture libyque. Le bloc fut arraché en 1842 par le consul britannique Thomas Reade.", where: 'British Museum, Londres', tone: 'tile--olive' },
        { kicker: 'Monnaies', title: 'Des lettres en métal', text: "Les légendes des monnaies, puniques puis numides, sont aussi des inscriptions : elles montrent comment la forme des lettres varie selon les lieux et les époques.", where: 'Carthage, Bardo, British Museum', tone: '' }
      ]
    },
    lit: {
      kicker: 'Une littérature perdue',
      title: 'Des bibliothèques sans livres',
      p1: "Carthage possédait des bibliothèques, où circulait aussi la littérature grecque. On y écrivait sur le droit, l'histoire, la géographie ; des philosophes carthaginois sont connus par Diogène Laërce et Jamblique.",
      p2: "En 146, selon Pline l'Ancien, le Sénat romain donna ces bibliothèques aux rois numides et ne fit traduire que Magon. Salluste dit avoir consulté des « livres puniques » attribués au roi Hiempsal ; ensuite, on en perd la trace.",
      src: "Pline, Histoire naturelle, XVIII, 22 · Salluste, Guerre de Jugurtha, 17",
      worksKicker: 'Ce qui a survécu',
      worksTitle: 'Des fragments, par d’autres',
      works: [
        { key: 'Magon', val: "Traité d'agronomie en 28 livres, seul ouvrage punique traduit en latin sur ordre du Sénat ; connu par Varron, Columelle et Pline.", to: '/magon-agronome', toLabel: "Magon l'Agronome" },
        { key: 'Hannon', val: "Le récit de son périple nous est parvenu en grec, comme traduction d'un texte punique affiché dans un temple ; son interprétation reste discutée.", to: '/hannon', toLabel: 'Hannon le Navigateur' },
        { key: 'Clitomaque', val: "Né à Carthage sous le nom d'Hasdrubal, il dirigea l'Académie platonicienne d'Athènes au IIe s. av. J.-C. — mais il écrivait en grec." },
        { key: 'Annales', val: "Histoire, droit, géographie : ces écrits ne subsistent qu'à travers de rares allusions des auteurs grecs et latins." }
      ]
    },
    her: {
      kicker: 'Héritage',
      title: "L'alphabet qui a conquis le monde",
      intro: "Les Grecs ont emprunté l'alphabet aux Phéniciens et y ont ajouté des voyelles. Par eux, puis par les Étrusques et les Romains, il est devenu le nôtre.",
      tree: {
        kicker: 'Filiations',
        title: 'Deux grandes branches',
        branches: [
          { label: 'Vers l’ouest', steps: ['Phénicien', 'Grec', 'Étrusque', 'Latin', 'Alphabets européens'] },
          { label: 'Vers l’est', steps: ['Phénicien', 'Araméen', 'Nabatéen', 'Arabe'] },
          { label: 'Aussi', steps: ['Araméen', 'Hébreu carré'] }
        ]
      },
      evo: {
        kicker: 'Même lettre, trois alphabets',
        title: 'De ʾālep à A',
        caption: 'Correspondances entre lettres phéniciennes, grecques et latines',
        cols: ['Phénicien', 'Grec', 'Latin'],
        note: "Les Grecs ont recyclé en voyelles des consonnes qui n'existaient pas dans leur langue : ʾālep devient alpha (A), ʿayin devient omicron (O)."
      }
    },
    relatedTitle: 'À lire aussi',
    related: [
      { to: '/magon-agronome', kick: 'Littérature', title: "Magon l'Agronome", text: 'Le seul livre punique que Rome fit traduire.', cls: 'tile--olive' },
      { to: '/hannon', kick: 'Exploration', title: 'Hannon le Navigateur', text: "Un périple le long de l'Afrique, affiché dans un temple de Carthage.", cls: '' },
      { to: '/religion', kick: 'Religion', title: 'Les dieux de Carthage', text: 'Baal Hammon, Tanit et le tophet, où furent trouvées des milliers de stèles.', cls: 'tile--purple' }
    ]
  },

  en: {
    meta: {
      title: 'Punic language and writing — the Phoenician alphabet, inscriptions, lost books',
      desc: 'The 22-letter Phoenician alphabet, from Punic to Neo-Punic, the inscriptions (tophet, Marseille Tariff, Pyrgi, Dougga), Carthage’s lost literature and its legacy. Write your name in Phoenician.'
    },
    hero: {
      chip: 'Carthage · Language and writing',
      title: 'Punic language and writing',
      lede: 'Twenty-two consonants, written right to left: the alphabet brought from Phoenicia carried the language of Carthage for centuries — and it is the ancestor of ours.',
      tags: ['Semitic language', 'Written right to left', '22 letters'],
      wordKicker: 'Carthage, in Punic',
      wordText: 'Qart-hadasht, “the New City”: Carthage’s name as its people wrote it, without vowels.'
    },
    stats: [
      { n: '22', t: 'letters, all consonants: the Phoenician alphabet' },
      { n: '0', t: 'vowels written in classical Phoenician script' },
      { n: '~800', t: 'BC: the Nora Stone, 9th–8th c. (Sardinia), one of the oldest Phoenician inscriptions in the West' },
      { n: '~400', t: 'AD: Saint Augustine still hears Punic spoken in the countryside' }
    ],
    abc: {
      kicker: 'The 22 letters',
      title: 'The Phoenician alphabet',
      intro: 'Each letter is named after a word that begins with it. The meanings of these names are traditional; some remain uncertain.',
      listLabel: 'The 22 letters of the Phoenician alphabet',
      greek: 'Greek letter derived from it',
      latin: 'Latin letter descended from it',
      arabic: 'Corresponding Arabic letter',
      note: 'Under each letter: scholarly transliteration, traditional meaning of the name, then the Greek letter derived from it, the Latin letter descended from it (where there is one) and the corresponding Arabic letter. The old order of the Arabic alphabet — abjad, hawwaz, ḥuṭṭī… — still follows the Phoenician one.',
      meanings: ['ox', 'house', 'camel', 'door', 'uncertain', 'hook', 'weapon', 'fence', 'uncertain', 'hand', 'palm', 'goad', 'water', 'fish', 'support', 'eye', 'mouth', 'uncertain', 'uncertain', 'head', 'tooth', 'mark']
    },
    w: {
      kicker: 'Your turn',
      title: 'Write your name in Phoenician',
      lede: 'Type a first name (in Latin or Arabic letters): each sound is replaced by the closest Phoenician letter.',
      label: 'Your first name',
      placeholder: 'e.g. Elissa, Yasmine, Hanno',
      modeLabel: 'Transcription mode',
      withV: 'With vowels (Neo-Punic style)',
      noV: 'Without vowels (Phoenician style)',
      spoken: 'Letters: ',
      empty: 'No letters to transcribe',
      note: 'A playful approximation: the Phoenician alphabet had no vowels and some sounds did not exist (v, j…). The real Hannibal was written',
      note2: '(Ḥnbʿl, “grace of Baal”), right to left.'
    },
    lang: {
      kicker: 'A Semitic language',
      title: 'From Phoenician to Punic, then Neo-Punic',
      rows: [
        { key: '9th – 8th c. BC', val: 'The Nora Stone, in Sardinia, shows Phoenician writing already established in the western Mediterranean.' },
        { key: '8th – 2nd c. BC', val: 'Punic, the Phoenician of the West, becomes the common language of the Carthaginian world, with its own pronunciation shaped by Libyan (Lancel).' },
        { key: '3rd – 1st c. BC', val: 'The Numidian kingdoms adopt it as a language of power: their coins carry Punic legends (Lancel).' },
        { key: 'After 146', val: 'The fall of Carthage did not kill the language. “Neo-Punic” script, more cursive, now marks some vowels; inscriptions were still carved in the 1st and 2nd c. AD.' },
        { key: '4th c. AD', val: 'Punic is written in Latin letters (Lancel): the alphabet changes, the language remains.' }
      ]
    },
    aug: {
      kicker: 'Saint Augustine, c. 400',
      quote: '“Ask our peasants what they are: they answer in Punic, ‘Chanani’.”',
      cite: 'Augustine, Epistolae ad Romanos inchoata expositio, 13',
      nuance: 'The passage is often quoted as proof that Punic was still spoken and that its speakers called themselves “Canaanites”. But the text is rhetorical and the manuscripts differ; Gabriel Camps sees it rather as a Libyan dialect, since punicus often simply meant “African” at the time.'
    },
    subst: {
      kicker: 'Hypothesis',
      text: 'For Stéphane Gsell, and later M’hamed Hassine Fantar, the survival of a Semitic language in North Africa may have eased the Arabisation of the Maghreb centuries later.'
    },
    ins: {
      kicker: 'Epigraphy',
      title: 'What the stones say',
      intro: 'With no books surviving, inscriptions are our main written source. They are numerous, but often short and repetitive.',
      tophet: {
        kicker: 'Thousands of stelae',
        title: 'The tophet stelae',
        alt: 'Punic stele with the sign of Tanit',
        caption: 'Stele with the sign of Tanit, Louvre Museum',
        p1: 'The tophets of Carthage and other cities have yielded thousands of them, gathered in the Corpus Inscriptionum Semiticarum. Their texts are highly formulaic: they tell little about the city’s history and give a limited number of personal names.',
        formula: '“To the Lady Tanit, face of Baal, and to the Lord Baal Hammon”: the dedication formula that opens many of Carthage’s stelae.',
        p2a: 'On these gods and the debate over the tophet, see the ',
        link: 'religion',
        p2b: ' page.'
      },
      cards: [
        { kicker: 'Marseille, 1845', title: 'The Marseille Tariff', text: 'Found in the port of Marseille, this regulation sets, animal by animal, the share owed to the priests for each sacrifice. Specialists attribute it to Carthage.', where: 'Vieille Charité Museum, Marseille', tone: 'tile--terra' },
        { kicker: 'c. 500 BC', title: 'The Pyrgi Tablets', text: 'Three gold sheets found in 1964 at the port of Caere: two in Etruscan, one in Phoenician. King Thefarie Velianas dedicates a holy place to Uni-Astarte.', where: 'Villa Giulia, Rome', tone: 'tile--gold' },
        { kicker: '2nd c. BC', title: 'The Dougga bilingual', text: 'On the Libyco-Punic mausoleum at Dougga, the same text in Punic and Libyan — a key to deciphering Libyan script. The block was torn out in 1842 by the British consul Thomas Reade.', where: 'British Museum, London', tone: 'tile--olive' },
        { kicker: 'Coins', title: 'Letters in metal', text: 'Coin legends, Punic then Numidian, are inscriptions too: they show how letter shapes varied from place to place and over time.', where: 'Carthage, Bardo, British Museum', tone: '' }
      ]
    },
    lit: {
      kicker: 'A lost literature',
      title: 'Libraries without books',
      p1: 'Carthage had libraries, where Greek literature also circulated. People wrote on law, history and geography; Carthaginian philosophers are known from Diogenes Laertius and Iamblichus.',
      p2: 'In 146, according to Pliny the Elder, the Roman Senate gave these libraries to the Numidian kings and had only Mago translated. Sallust says he consulted “Punic books” attributed to King Hiempsal; after that, their trail goes cold.',
      src: 'Pliny, Natural History, XVIII, 22 · Sallust, Jugurthine War, 17',
      worksKicker: 'What survived',
      worksTitle: 'Fragments, through others',
      works: [
        { key: 'Mago', val: 'A treatise on agronomy in 28 books, the only Punic work translated into Latin by order of the Senate; known through Varro, Columella and Pliny.', to: '/magon-agronome', toLabel: 'Mago the Agronomist' },
        { key: 'Hanno', val: 'The account of his voyage survives in Greek, as a translation of a Punic text displayed in a temple; its interpretation is still debated.', to: '/hannon', toLabel: 'Hanno the Navigator' },
        { key: 'Clitomachus', val: 'Born in Carthage as Hasdrubal, he headed Plato’s Academy in Athens in the 2nd c. BC — but he wrote in Greek.' },
        { key: 'Annals', val: 'History, law, geography: these writings survive only through rare allusions in Greek and Latin authors.' }
      ]
    },
    her: {
      kicker: 'Legacy',
      title: 'The alphabet that conquered the world',
      intro: 'The Greeks borrowed the alphabet from the Phoenicians and added vowels. Through them, then the Etruscans and the Romans, it became ours.',
      tree: {
        kicker: 'Lineages',
        title: 'Two great branches',
        branches: [
          { label: 'Westwards', steps: ['Phoenician', 'Greek', 'Etruscan', 'Latin', 'European alphabets'] },
          { label: 'Eastwards', steps: ['Phoenician', 'Aramaic', 'Nabataean', 'Arabic'] },
          { label: 'Also', steps: ['Aramaic', 'Square Hebrew'] }
        ]
      },
      evo: {
        kicker: 'One letter, three alphabets',
        title: 'From ʾālep to A',
        caption: 'Correspondences between Phoenician, Greek and Latin letters',
        cols: ['Phoenician', 'Greek', 'Latin'],
        note: 'The Greeks recycled as vowels some consonants that did not exist in their language: ʾālep became alpha (A), ʿayin became omicron (O).'
      }
    },
    relatedTitle: 'Read also',
    related: [
      { to: '/magon-agronome', kick: 'Literature', title: 'Mago the Agronomist', text: 'The only Punic book Rome had translated.', cls: 'tile--olive' },
      { to: '/hannon', kick: 'Exploration', title: 'Hanno the Navigator', text: 'A voyage along Africa, displayed in a temple at Carthage.', cls: '' },
      { to: '/religion', kick: 'Religion', title: 'The gods of Carthage', text: 'Baal Hammon, Tanit and the tophet, where thousands of stelae were found.', cls: 'tile--purple' }
    ]
  },

  ar: {
    meta: {
      title: 'اللغة والكتابة البونية — الأبجدية الفينيقية والنقوش والكتب الضائعة',
      desc: 'الأبجدية الفينيقية ذات الاثنين والعشرين حرفًا، من البونية إلى البونية الجديدة، والنقوش (التوفيت، تعرفة مرسيليا، بيرجي، دقة)، وأدب قرطاج الضائع وإرثه. اكتب اسمك بالفينيقية.'
    },
    hero: {
      chip: 'قرطاج · اللغة والكتابة',
      title: 'اللغة والكتابة البونية',
      lede: 'اثنان وعشرون حرفًا صامتًا تُكتب من اليمين إلى اليسار: حملت الأبجدية القادمة من فينيقيا لغة قرطاج قرونًا طويلة — وهي أصل أبجديات كثيرة.',
      tags: ['لغة سامية', 'تُكتب من اليمين إلى اليسار', '22 حرفًا'],
      wordKicker: 'قرطاج بالبونية',
      wordText: '«قرت حدشت»، أي «المدينة الجديدة»: اسم قرطاج كما كتبه أهلها، بلا حروف علّة.'
    },
    stats: [
      { n: '22', t: 'حرفًا، كلها صوامت: الأبجدية الفينيقية' },
      { n: '0', t: 'حركة مكتوبة في الخط الفينيقي الكلاسيكي' },
      { n: '~800', t: 'ق.م: نُصُب نورا، القرن 9–8 (سردينيا)، من أقدم النقوش الفينيقية في الغرب' },
      { n: '~400', t: 'م: القديس أوغسطين يسمع البونية في الأرياف' }
    ],
    abc: {
      kicker: 'الحروف الاثنان والعشرون',
      title: 'الأبجدية الفينيقية',
      intro: 'يحمل كل حرف اسم كلمة تبدأ به. معاني هذه الأسماء متوارثة، وبعضها لا يزال غير مؤكد.',
      listLabel: 'حروف الأبجدية الفينيقية الاثنان والعشرون',
      greek: 'الحرف الإغريقي المشتق منه',
      latin: 'الحرف اللاتيني المنحدر منه',
      arabic: 'الحرف العربي المقابل',
      note: 'تحت كل حرف: النقحرة العلمية، والمعنى المتوارث للاسم، ثم الحرف الإغريقي المشتق منه، والحرف اللاتيني المنحدر منه (إن وُجد)، والحرف العربي المقابل. ولا يزال الترتيب الأبجدي العربي القديم — أبجد هوّز حطّي كلمن سعفص قرشت — يتبع الترتيب الفينيقي.',
      meanings: ['ثور', 'بيت', 'جمل', 'باب', 'غير مؤكد', 'وتد', 'سلاح', 'سياج', 'غير مؤكد', 'يد', 'كفّ', 'مِنخَس', 'ماء', 'سمكة', 'سند', 'عين', 'فم', 'غير مؤكد', 'غير مؤكد', 'رأس', 'سنّ', 'علامة']
    },
    w: {
      kicker: 'جرّب بنفسك',
      title: 'اكتب اسمك بالفينيقية',
      lede: 'اكتب اسمًا (بحروف لاتينية أو عربية): يُستبدل كل صوت بأقرب حرف فينيقي إليه.',
      label: 'اسمك',
      placeholder: 'مثال: عليسة، ياسمين، حنّون',
      modeLabel: 'طريقة النقل',
      withV: 'مع حروف العلّة (على الطريقة البونية الجديدة)',
      noV: 'بلا حروف علّة (على الطريقة الفينيقية)',
      spoken: 'الحروف: ',
      empty: 'لا توجد حروف للنقل',
      note: 'تقريب للتسلية فقط: لم تكن في الأبجدية الفينيقية حروف علّة، وبعض الأصوات لم يكن لها وجود (v وj…). وكان اسم حنبعل الحقيقي يُكتب',
      note2: '(حنبعل، «نعمة بعل»)، من اليمين إلى اليسار.'
    },
    lang: {
      kicker: 'لغة سامية',
      title: 'من الفينيقية إلى البونية ثم البونية الجديدة',
      rows: [
        { key: 'ق 9 – 8 ق.م', val: 'يُظهر نُصُب نورا في سردينيا أن الكتابة الفينيقية كانت قد استقرّت في غرب المتوسط.' },
        { key: 'ق 8 – 2 ق.م', val: 'تصبح البونية، أي فينيقية الغرب، اللغة المشتركة للعالم القرطاجي، بنطق خاص تأثّر بالليبية (لانسيل).' },
        { key: 'ق 3 – 1 ق.م', val: 'تتبنّاها الممالك النوميدية لغةً للسلطة: تحمل نقودها كتابات بونية (لانسيل).' },
        { key: 'بعد 146', val: 'لم يُمِت سقوط قرطاج اللغة. صار الخط «البوني الجديد»، الأكثر انسيابًا، يدوّن بعض الحركات؛ وظلّت النقوش تُحفر في القرنين الأول والثاني للميلاد.' },
        { key: 'ق 4 م', val: 'تُكتب البونية بحروف لاتينية (لانسيل): تتغيّر الأبجدية وتبقى اللغة.' }
      ]
    },
    aug: {
      kicker: 'القديس أوغسطين، نحو 400',
      quote: '«اسألوا فلاحينا عمّا هم: يجيبون بالبونية ‹كنعاني›.»',
      cite: 'أوغسطين، شرح غير مكتمل للرسالة إلى أهل رومية، 13',
      nuance: 'كثيرًا ما يُستشهد بهذا المقطع دليلًا على أن البونية كانت لا تزال محكية، وأن متكلّميها سمّوا أنفسهم «كنعانيين». لكن النص بلاغي ومخطوطاته متباينة؛ ويرى غابرييل كامبس فيه لهجة ليبية، إذ كانت كلمة punicus تعني غالبًا «إفريقي» في ذلك العصر.'
    },
    subst: {
      kicker: 'فرضية',
      text: 'يرى ستيفان غزيل، ثم محمد حسين فنطر، أن بقاء لغة سامية في شمال إفريقيا ربما سهّل بعد قرون تعريب المغرب.'
    },
    ins: {
      kicker: 'علم النقوش',
      title: 'ما تقوله الحجارة',
      intro: 'في غياب الكتب، تبقى النقوش مصدرنا المكتوب الأساسي. وهي كثيرة، لكنها غالبًا قصيرة ومتكرّرة.',
      tophet: {
        kicker: 'آلاف النُّصُب',
        title: 'نُصُب التوفيت',
        alt: 'نُصُب بوني بعلامة تانيت',
        caption: 'نُصُب بعلامة تانيت، متحف اللوفر',
        p1: 'أمدّت توفيتات قرطاج ومدن أخرى بآلاف منها، جُمعت في «مدوّنة النقوش السامية». نصوصها نمطية جدًا: لا تقول الكثير عن تاريخ المدينة، وتقدّم عددًا محدودًا من أسماء الأعلام.',
        formula: '«إلى السيدة تانيت، وجه بعل، وإلى السيد بعل حمون»: صيغة الإهداء التي تفتتح عددًا كبيرًا من نُصُب قرطاج.',
        p2a: 'عن هذه الآلهة والجدل حول التوفيت، انظر صفحة ',
        link: 'الديانة',
        p2b: '.'
      },
      cards: [
        { kicker: 'مرسيليا، 1845', title: 'تعرفة مرسيليا', text: 'عُثر عليها في ميناء مرسيليا، وتحدّد، حيوانًا حيوانًا، نصيب الكهنة من كل قربان. ويرجعها المختصون إلى أصل قرطاجي.', where: 'متحف لا فياي شاريتيه، مرسيليا', tone: 'tile--terra' },
        { kicker: 'نحو 500 ق.م', title: 'صفائح بيرجي', text: 'ثلاث صفائح ذهبية اكتُشفت سنة 1964 في ميناء كايري: اثنتان بالإتروسكية وواحدة بالفينيقية. يهدي فيها الملك ثيفاري فيليانا موضعًا مقدّسًا إلى أوني-عشتارت.', where: 'فيلا جوليا، روما', tone: 'tile--gold' },
        { kicker: 'ق 2 ق.م', title: 'ثنائية دقة', text: 'على الضريح الليبي-البوني في دقة، النص نفسه بالبونية والليبية — مفتاح لفكّ الخط الليبي. انتزع القنصل البريطاني توماس ريد الحجر سنة 1842.', where: 'المتحف البريطاني، لندن', tone: 'tile--olive' },
        { kicker: 'النقود', title: 'حروف من معدن', text: 'كتابات النقود، البونية ثم النوميدية، نقوش أيضًا: تُظهر كيف تغيّرت أشكال الحروف بحسب الأمكنة والعصور.', where: 'قرطاج، باردو، المتحف البريطاني', tone: '' }
      ]
    },
    lit: {
      kicker: 'أدب ضائع',
      title: 'مكتبات بلا كتب',
      p1: 'كانت لقرطاج مكتبات يتداول فيها الأدب الإغريقي أيضًا. وكُتب فيها عن القانون والتاريخ والجغرافيا؛ ويُعرف فلاسفة قرطاجيون من خلال ديوجين اللايرتي ويامبليخوس.',
      p2: 'سنة 146، حسب بلينيوس الأكبر، وهب مجلس الشيوخ الروماني هذه المكتبات لملوك نوميديا ولم يأمر إلا بترجمة ماغون. ويذكر سالوستيوس أنه اطّلع على «كتب بونية» منسوبة إلى الملك هيمبصال؛ ثم ينقطع أثرها.',
      src: 'بلينيوس، التاريخ الطبيعي، 18، 22 · سالوستيوس، حرب يوغرطة، 17',
      worksKicker: 'ما بقي منها',
      worksTitle: 'شذرات على ألسنة الآخرين',
      works: [
        { key: 'ماغون', val: 'مؤلَّف في الفلاحة من 28 كتابًا، العمل البوني الوحيد الذي تُرجم إلى اللاتينية بأمر مجلس الشيوخ؛ نعرفه عبر فارو وكولوميلا وبلينيوس.', to: '/magon-agronome', toLabel: 'ماغون الفلاحي' },
        { key: 'حنّون', val: 'وصلتنا رواية رحلته بالإغريقية، ترجمةً لنص بوني عُلّق في معبد؛ ولا يزال تفسيرها موضع نقاش.', to: '/hannon', toLabel: 'حنّون الملّاح' },
        { key: 'كليتوماخوس', val: 'وُلد في قرطاج باسم عزربعل، وترأس أكاديمية أفلاطون في أثينا في القرن الثاني ق.م — لكنه كتب بالإغريقية.' },
        { key: 'الحوليات', val: 'التاريخ والقانون والجغرافيا: لم يبق من هذه الكتابات إلا إشارات نادرة لدى المؤلفين الإغريق واللاتين.' }
      ]
    },
    her: {
      kicker: 'الإرث',
      title: 'الأبجدية التي غزت العالم',
      intro: 'أخذ الإغريق الأبجدية عن الفينيقيين وأضافوا إليها حروف العلّة. ومنهم، ثم من الإتروسك والرومان، صارت أبجدية أوروبا.',
      tree: {
        kicker: 'الأنساب',
        title: 'فرعان كبيران',
        branches: [
          { label: 'نحو الغرب', steps: ['الفينيقية', 'الإغريقية', 'الإتروسكية', 'اللاتينية', 'الأبجديات الأوروبية'] },
          { label: 'نحو الشرق', steps: ['الفينيقية', 'الآرامية', 'النبطية', 'العربية'] },
          { label: 'وأيضًا', steps: ['الآرامية', 'العبرية المربّعة'] }
        ]
      },
      evo: {
        kicker: 'حرف واحد في ثلاث أبجديات',
        title: 'من ألف إلى A',
        caption: 'التقابل بين الحروف الفينيقية والإغريقية واللاتينية',
        cols: ['الفينيقية', 'الإغريقية', 'اللاتينية'],
        note: 'حوّل الإغريق إلى حروف علّة صوامتَ لم تكن في لغتهم: صار «ألف» ألفا (A)، و«عين» أوميكرون (O).'
      }
    },
    relatedTitle: 'اقرأ أيضًا',
    related: [
      { to: '/magon-agronome', kick: 'أدب', title: 'ماغون الفلاحي', text: 'الكتاب البوني الوحيد الذي أمرت روما بترجمته.', cls: 'tile--olive' },
      { to: '/hannon', kick: 'استكشاف', title: 'حنّون الملّاح', text: 'رحلة على طول سواحل إفريقيا، عُلّقت روايتها في معبد بقرطاج.', cls: '' },
      { to: '/religion', kick: 'الديانة', title: 'آلهة قرطاج', text: 'بعل حمون وتانيت والتوفيت، حيث عُثر على آلاف النُّصُب.', cls: 'tile--purple' }
    ]
  }
}

const c = computed(() => C[locale.value] || C.fr)

const letters = computed(() => BASE.map((b, i) => ({ ...b, i, g: G(i), meaning: c.value.abc.meanings[i] })))

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-title { font-size: clamp(44px, 5.8vw, 84px); }
.hero-word { justify-content: space-between; }
.hero-glyphs {
  font-size: clamp(56px, 7vw, 104px);
  color: var(--gold-light);
  text-align: center;
  overflow-wrap: anywhere;
}
.hero-tr { font: 800 22px/1.2 var(--font-display); color: var(--white) !important; margin-bottom: 8px; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.stats { padding-top: var(--gap); }
.stat { min-height: 180px; }

/* Alphabet */
.abc {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 150px), 1fr));
  gap: var(--gap);
  padding: 0 var(--gutter);
  margin: 0;
}
.ltr {
  position: relative;
  background: var(--white);
  border-radius: var(--r-md);
  padding: 16px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ltr-n { position: absolute; top: 12px; inset-inline-end: 14px; font: 700 12px/1 var(--font-body); color: var(--muted); }
.ltr-g { font-size: 52px; color: var(--purple); margin: 6px 0 10px; }
.ltr-name { font: 800 19px/1.1 var(--font-display); }
.ltr-tr { font: 400 13px/1.4 var(--font-body); color: var(--muted); }
.ltr-tr b { color: var(--ink); font-weight: 700; }
.ltr-desc { font: 600 13px/1.4 var(--font-body); color: var(--stone); margin-top: 4px; }
.ltr-ar { font-size: 15px; }
.abc-note {
  font: 400 14px/1.55 var(--font-body);
  color: var(--muted);
  max-width: 820px;
  padding: 16px var(--gutter) 0;
  margin: 0;
}

/* Écris ton nom */
.writer { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 32px 48px; align-items: start; }
.w-lede { margin-top: 16px; }
.writer-box { display: flex; flex-direction: column; gap: 14px; }
.w-label { font: 700 14px/1 var(--font-body); color: var(--purple-tint); }
.w-input {
  width: 100%;
  min-height: 56px;
  border: 0;
  border-radius: 16px;
  padding: 12px 18px;
  font: 600 20px/1.2 var(--font-body);
  color: var(--ink);
  background: var(--white);
}
.w-input:focus-visible { outline: 3px solid var(--gold); outline-offset: 2px; }
.w-seg { align-self: flex-start; }
.w-out-wrap {
  background: var(--purple-dark);
  border-radius: 18px;
  padding: 20px;
  min-height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.w-out { font-size: clamp(40px, 5vw, 64px); color: var(--gold-light) !important; text-align: center; overflow-wrap: anywhere; }
.w-chips { list-style: none; padding: 0; margin: 0; }
.w-chip { background: rgba(255, 255, 255, 0.14); color: var(--white); white-space: normal; font-weight: 500; }
.w-chip .phoen { font-size: 16px; color: var(--gold-light); }
.w-src { font-weight: 700; }
.w-note { font: 400 14px/1.55 var(--font-body); color: var(--purple-soft) !important; }
.w-note .phoen { font-size: 18px; color: var(--gold-light); }

/* Langue */
.lang { display: flex; flex-direction: column; gap: 28px; }
.lang-title { font-size: clamp(30px, 3.2vw, 46px); }
.lang-key { font-size: 19px; line-height: 1.15; color: var(--purple); }
.lang-val { font-size: 15px; color: var(--stone); }
.lang-side { display: flex; flex-direction: column; gap: var(--gap); }
.aug-quote p { font: 600 clamp(19px, 1.8vw, 24px)/1.35 var(--font-body); color: var(--white) !important; }
.aug-quote cite { display: block; margin-top: 10px; font: 500 13px/1.4 var(--font-body); font-style: normal; color: var(--on-dark); }

/* Inscriptions */
.tophet-fig { min-height: clamp(360px, 40vw, 560px); }
.tophet-fig > img { object-position: 50% 30%; }
.ins-title { margin-bottom: 18px; }
.formula { border-inline-start: 3px solid var(--purple); padding-inline-start: 18px; }
.formula-g { font-size: clamp(22px, 2.2vw, 30px); color: var(--purple); margin-bottom: 8px; text-align: start; overflow-wrap: anywhere; }
.formula-tr { font: 600 14px/1.4 var(--font-body); color: var(--ink) !important; margin-bottom: 6px; }
.inline-link { text-decoration: underline; text-underline-offset: 3px; }
.ins-grid { padding-top: var(--gap); }
.ins-card { min-height: 300px; }
.ins-card .chip { white-space: normal; line-height: 1.3; }
.ins-card.tile--terra .chip, .ins-card.tile--olive .chip { background: rgba(255, 255, 255, 0.16); }
.ins-card.tile--gold .chip { background: rgba(255, 255, 255, 0.4); }

/* Littérature */
.p2 { margin-top: 14px; }
.libs .chip { white-space: normal; line-height: 1.35; }
.lit-h { margin-bottom: 20px; }
.lit-key { font-size: 20px; line-height: 1.1; color: var(--terra); }
.rows .inline-link { display: inline-flex; align-items: center; min-height: 44px; font-weight: 600; }

/* Héritage */
.her .tile { gap: 24px; }
.lineage { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 18px; }
.branch { display: flex; flex-direction: column; gap: 8px; }
.branch-label { font: 700 13px/1 var(--font-body); color: var(--purple); }
.branch-steps { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.step { background: var(--paper); }
.arrow { color: var(--muted); font-weight: 700; }
[dir="rtl"] .arrow { display: inline-block; transform: scaleX(-1); }
.evo-wrap { overflow-x: auto; }
.evo { width: 100%; border-collapse: collapse; color: var(--white); }
.evo th { font: 700 12px/1 var(--font-body); color: var(--navy-tint); text-align: start; padding: 0 0 10px; }
.evo td { padding: 10px 0; border-top: 1px solid rgba(255, 255, 255, 0.18); vertical-align: middle; }
.evo-g { font-size: 34px; color: var(--gold-light); vertical-align: middle; }
.evo-name { font: 500 14px/1 var(--font-body); color: var(--navy-soft); margin-inline-start: 8px; }
.evo-big { font: 800 28px/1 var(--font-display); }

.related-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.related { min-height: 200px; }

@media (max-width: 960px) {
  .writer { grid-template-columns: minmax(0, 1fr); }
  .tophet-fig { min-height: 380px; }
}

@media (max-width: 640px) {
  .stat { min-height: 0; }
  .ltr { padding: 14px 12px 12px; }
  .ltr-g { font-size: 44px; }
  .w-seg { align-self: stretch; }
  .w-seg button { white-space: normal; text-align: center; line-height: 1.2; flex: 1 1 0; }
  .tophet-fig { min-height: 300px; }
  .ins-card, .related { min-height: 0; }
}
</style>
