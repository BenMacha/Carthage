<template>
  <div class="pg">
    <!-- Héros -->
    <section class="bento bento--top">
      <div class="s-7 tile tile--xl tile--ink tile--stack tile--hero">
        <span class="chip chip--glass">{{ c.chip }}</span>
        <div>
          <h1 class="h-display hero-title">{{ c.title }}</h1>
          <p class="lede">{{ c.lede }}</p>
        </div>
        <div class="hero-total">
          <span class="num">{{ total }}</span>
          <span class="hero-total-label">{{ c.totalLabel }}</span>
        </div>
      </div>
      <figure class="s-5 fig fig--hero" style="background:#5E574F">
        <img src="/img/bardo.jpg" :alt="c.heroAlt">
        <figcaption>{{ c.heroCaption }}</figcaption>
      </figure>
    </section>

    <!-- Compteurs par catégorie -->
    <section class="sec counts-sec" :aria-label="c.countsLabel">
      <ul class="counts">
        <li v-for="(cat, i) in categories" :key="cat.key" class="tile count" :class="COUNT_TONES[i]">
          <span class="num">{{ cat.count }}</span>
          <span class="count-label">{{ cat.label }}</span>
        </li>
      </ul>
    </section>

    <!-- Filtres + recherche -->
    <section class="sec sec--wide filters-sec">
      <h2 class="sr-title">{{ c.filtersTitle }}</h2>
      <div class="filters">
        <div class="pill-row" role="group" :aria-label="c.filterLabel">
          <button
            v-for="f in filters"
            :key="f.key"
            type="button"
            class="pill-btn"
            :class="{ on: filter === f.key }"
            :aria-pressed="filter === f.key"
            @click="filter = f.key"
          >{{ f.label }}</button>
        </div>
        <div class="search">
          <label for="bib-search" class="sr-only">{{ c.searchLabel }}</label>
          <svg class="search-ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          <input
            id="bib-search"
            v-model="query"
            type="search"
            class="search-input"
            :placeholder="c.searchPh"
            autocomplete="off"
          >
        </div>
      </div>
      <p class="result-count" aria-live="polite">{{ c.results(visibleCount) }}</p>
    </section>

    <!-- Liste -->
    <section v-for="g in groups" :id="`cat-${g.key}`" :key="g.key" class="sec group">
      <div class="sec-head">
        <h2 class="h-block">{{ g.label }}</h2>
        <p>{{ g.intro }}</p>
      </div>

      <!-- Sources antiques (rédigées, trilingues) -->
      <ul v-if="g.key === 'ancient'" class="refs">
        <li v-for="a in g.items" :key="a.id" class="ref ref--ancient">
          <p class="ref-auth">{{ a.author[lang] }}</p>
          <p class="ref-title"><cite>{{ a.title[lang] }}</cite></p>
          <p class="ref-meta">{{ a.date[lang] }}</p>
          <p class="ref-desc">{{ a.desc[lang] }}</p>
        </li>
      </ul>

      <!-- Références modernes (langue d'origine) -->
      <ul v-else class="refs">
        <li v-for="r in g.items" :key="r.id" class="ref" lang="fr" dir="ltr">
          <span class="ref-type">{{ c.types[r.type] }}</span>
          <p v-if="r.authors.length" class="ref-auth">{{ r.authors.join(', ') }}</p>
          <p class="ref-title">
            <cite>{{ r.title }}</cite><template v-if="r.subtitle"> : {{ r.subtitle }}</template>
          </p>
          <p v-if="r.in" class="ref-meta">
            dans <cite>{{ r.in }}</cite><template v-if="r.inAuthors"> ({{ r.inAuthors }})</template>
          </p>
          <p v-if="r.journal" class="ref-meta">
            <cite>{{ r.journal }}</cite>{{ journalLine(r) }}
          </p>
          <p v-if="pubLine(r)" class="ref-meta">{{ pubLine(r) }}</p>
          <p v-if="r.nature || r.reprint" class="ref-meta">
            {{ [r.nature, r.reprint && `réimpr. ${r.reprint}`].filter(Boolean).join(' · ') }}
          </p>
          <p v-if="r.isbn || r.issn || r.doi" class="ref-ids">
            <span v-if="r.isbn">ISBN {{ r.isbn }}</span>
            <span v-if="r.issn">ISSN {{ r.issn }}</span>
            <a v-if="r.doi" :href="`https://doi.org/${r.doi}`" target="_blank" rel="noopener">DOI {{ r.doi }}</a>
          </p>
          <a v-if="r.url" :href="r.url" class="ref-link" target="_blank" rel="noopener" :lang="lang" :dir="lang === 'ar' ? 'rtl' : 'ltr'">
            {{ c.readOnline }} <span aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
    </section>

    <section v-if="!groups.length" class="sec">
      <div class="tile tile--paper empty">
        <p class="body">{{ c.empty }}</p>
        <button type="button" class="btn btn-outline" @click="reset">{{ c.reset }}</button>
      </div>
    </section>

    <!-- Wikipédia + liens croisés -->
    <section class="sec">
      <div class="cols cols-3 cols--flush">
        <div class="tile tile--navy tile--stack wiki">
          <div>
            <span class="kicker">{{ c.wikiKicker }}</span>
            <h2 class="h-card">{{ c.wikiTitle }}</h2>
            <p class="body">{{ c.wikiText }}</p>
          </div>
          <ul class="wiki-links">
            <li v-for="s in BIB.meta.sources" :key="s.url">
              <a :href="s.url" target="_blank" rel="noopener" lang="fr">{{ s.title }} <span aria-hidden="true">↗</span></a>
            </li>
          </ul>
          <span class="chip chip--glass">{{ c.license }}</span>
        </div>
        <NuxtLink v-for="l in c.links" :key="l.to" :to="localePath(l.to)" class="tile tile--paper tile--stack cross">
          <div>
            <span class="kicker">{{ c.alsoKicker }}</span>
            <h2 class="h-card">{{ l.title }}</h2>
            <p class="body">{{ l.text }}</p>
          </div>
          <span class="cross-arrow" aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import BIB from '~/assets/data/bibliographie.json'

const { locale, localePath } = useI18n()
const filter = ref('all')
const query = ref('')

const COUNT_TONES = ['tile--purple', 'tile--sand', 'tile--terra', 'tile--gold', 'tile--olive', 'tile--paper']

const C = {
  fr: {
    chip: 'Sources',
    title: 'Sources et bibliographie',
    lede: "Les auteurs antiques qui nous racontent Carthage — presque tous grecs ou romains — puis les ouvrages modernes d'historiens et d'archéologues sur lesquels s'appuie ce site.",
    totalLabel: 'références, antiques et modernes',
    heroAlt: 'La salle de Carthage au musée national du Bardo, à Tunis',
    heroCaption: 'Musée national du Bardo, Tunis',
    countsLabel: 'Nombre de références par catégorie',
    filtersTitle: 'Filtrer la bibliographie',
    filterLabel: 'Filtrer par catégorie',
    all: 'Tout',
    searchLabel: 'Rechercher un auteur ou un titre',
    searchPh: 'Auteur ou titre…',
    results: n => n === 0 ? 'Aucune référence' : n === 1 ? '1 référence affichée' : `${n} références affichées`,
    empty: 'Aucune référence ne correspond à cette recherche.',
    reset: 'Réinitialiser',
    intros: {
      ancient: "Carthage n'a presque rien laissé d'écrit : on la connaît surtout par ses ennemis. Chaque source est présentée avec ce qu'elle apporte et son parti pris.",
      general: 'Phéniciens, Méditerranée antique et guerres de Rome : le cadre général.',
      carthage: 'Synthèses et études consacrées à la cité punique.',
      art: "Catalogues d'expositions et ouvrages sur l'art phénicien et punique.",
      archaeology: 'Fouilles, sites et conservation : Carthage, Kerkouane et la Tunisie antique.',
      further: 'Essais, roman historique, cartes postales et atlas pour prolonger la lecture.'
    },
    types: { book: 'Ouvrage', article: 'Article', chapter: 'Chapitre' },
    readOnline: 'Lire en ligne',
    wikiKicker: 'Wikipédia',
    wikiTitle: 'Articles Wikipédia',
    wikiText: "Ce site s'appuie aussi sur les articles « Carthage » et « Civilisation carthaginoise » de Wikipédia en français, dont les contenus, publiés sous licence CC BY-SA 4.0, ont été reformulés. Les listes bibliographiques ci-dessus en sont issues.",
    license: 'Licence CC BY-SA 4.0',
    alsoKicker: 'À lire aussi',
    links: [
      { to: '/histoire-des-vainqueurs', title: "L'histoire des vainqueurs", text: "Pourquoi les sources antiques sur Carthage sont presque toutes romaines ou grecques." },
      { to: '/chronologie', title: 'Chronologie', text: 'De la fondation à la chute, les dates clés de Carthage.' }
    ],
    metaDesc: 'Sources antiques (Polybe, Tite-Live, Appien, Diodore…) et bibliographie moderne sur Carthage et la civilisation punique, avec filtre et recherche.'
  },
  en: {
    chip: 'Sources',
    title: 'Sources and bibliography',
    lede: 'The ancient writers who tell us about Carthage — nearly all of them Greek or Roman — followed by the modern works by historians and archaeologists that this site relies on.',
    totalLabel: 'references, ancient and modern',
    heroAlt: 'The Carthage hall of the Bardo National Museum, Tunis',
    heroCaption: 'Bardo National Museum, Tunis',
    countsLabel: 'Number of references per category',
    filtersTitle: 'Filter the bibliography',
    filterLabel: 'Filter by category',
    all: 'All',
    searchLabel: 'Search for an author or a title',
    searchPh: 'Author or title…',
    results: n => n === 0 ? 'No references' : n === 1 ? '1 reference shown' : `${n} references shown`,
    empty: 'No reference matches this search.',
    reset: 'Reset',
    intros: {
      ancient: 'Carthage left almost no writings of its own: we know it mostly through its enemies. Each source is shown with what it contributes and its bias.',
      general: 'Phoenicians, the ancient Mediterranean and Rome\'s wars: the wider setting.',
      carthage: 'Syntheses and studies devoted to the Punic city.',
      art: 'Exhibition catalogues and books on Phoenician and Punic art.',
      archaeology: 'Excavations, sites and conservation: Carthage, Kerkouane and ancient Tunisia.',
      further: 'Essays, a historical novel, postcards and an atlas for further reading.'
    },
    types: { book: 'Book', article: 'Article', chapter: 'Chapter' },
    readOnline: 'Read online',
    wikiKicker: 'Wikipedia',
    wikiTitle: 'Wikipedia articles',
    wikiText: 'This site also draws on the French Wikipedia articles "Carthage" and "Civilisation carthaginoise" (Carthaginian civilisation), whose content, published under the CC BY-SA 4.0 licence, has been rewritten. The bibliographies above come from them.',
    license: 'CC BY-SA 4.0 licence',
    alsoKicker: 'Read also',
    links: [
      { to: '/histoire-des-vainqueurs', title: 'History of the victors', text: 'Why the ancient sources on Carthage are almost all Roman or Greek.' },
      { to: '/chronologie', title: 'Timeline', text: 'From foundation to fall, the key dates of Carthage.' }
    ],
    metaDesc: 'Ancient sources (Polybius, Livy, Appian, Diodorus…) and modern bibliography on Carthage and Punic civilisation, with filter and search.'
  },
  ar: {
    chip: 'المصادر',
    title: 'المصادر والمراجع',
    lede: 'الكتّاب القدامى الذين رووا لنا تاريخ قرطاج — وجلّهم إغريق أو رومان — ثم المؤلفات الحديثة للمؤرخين وعلماء الآثار التي يعتمد عليها هذا الموقع.',
    totalLabel: 'مرجعًا قديمًا وحديثًا',
    heroAlt: 'قاعة قرطاج في المتحف الوطني بباردو، تونس',
    heroCaption: 'المتحف الوطني بباردو، تونس',
    countsLabel: 'عدد المراجع في كل فئة',
    filtersTitle: 'تصفية قائمة المراجع',
    filterLabel: 'التصفية حسب الفئة',
    all: 'الكل',
    searchLabel: 'ابحث عن مؤلف أو عنوان',
    searchPh: 'مؤلف أو عنوان…',
    results: n => n === 0 ? 'لا توجد مراجع' : n === 1 ? 'مرجع واحد معروض' : `${n} مرجعًا معروضًا`,
    empty: 'لا يوجد مرجع يطابق هذا البحث.',
    reset: 'إعادة الضبط',
    intros: {
      ancient: 'لم تترك قرطاج تقريبًا أي كتابات: نعرفها أساسًا من خلال أعدائها. يُعرض كل مصدر مع ما يضيفه وانحيازه.',
      general: 'الفينيقيون والمتوسط القديم وحروب روما: الإطار العام.',
      carthage: 'دراسات وتآليف مخصصة للمدينة البونيقية.',
      art: 'فهارس معارض وكتب عن الفن الفينيقي والبونيقي.',
      archaeology: 'الحفريات والمواقع والصيانة: قرطاج وكركوان وتونس القديمة.',
      further: 'مقالات أدبية ورواية تاريخية وبطاقات بريدية وأطلس لمواصلة القراءة.'
    },
    types: { book: 'كتاب', article: 'مقال', chapter: 'فصل' },
    readOnline: 'اقرأ على الإنترنت',
    wikiKicker: 'ويكيبيديا',
    wikiTitle: 'مقالات ويكيبيديا',
    wikiText: 'يعتمد هذا الموقع أيضًا على مقالَي «قرطاج» و«الحضارة القرطاجية» في ويكيبيديا الفرنسية، المنشورين برخصة CC BY-SA 4.0، وقد أُعيدت صياغة محتواهما. ومنهما أُخذت قوائم المراجع أعلاه.',
    license: 'رخصة CC BY-SA 4.0',
    alsoKicker: 'اقرأ أيضًا',
    links: [
      { to: '/histoire-des-vainqueurs', title: 'تاريخ المنتصرين', text: 'لماذا تكاد كل المصادر القديمة عن قرطاج تكون رومانية أو إغريقية.' },
      { to: '/chronologie', title: 'التسلسل الزمني', text: 'من التأسيس إلى السقوط، أهم تواريخ قرطاج.' }
    ],
    metaDesc: 'المصادر القديمة (بوليبيوس، ليفيوس، أبيانوس، ديودوروس…) والمراجع الحديثة عن قرطاج والحضارة البونيقية، مع تصفية وبحث.'
  }
}

const c = computed(() => C[locale.value] || C.fr)
const lang = computed(() => (C[locale.value] ? locale.value : 'fr'))

// Recherche insensible à la casse, aux accents, aux apostrophes (M'hamed = Mhamed) et aux voyelles brèves arabes
const fold = s => (s || '')
  .normalize('NFD')
  .replace(/[̀-ًͯ-ٰٟ]/g, '')
  .replace(/['’‘]/g, '')
  .toLowerCase()

const ITEMS = [
  ...BIB.ancient.map(a => ({
    ...a,
    cat: 'ancient',
    hay: fold([...Object.values(a.author), ...Object.values(a.title)].join(' '))
  })),
  ...BIB.references.map(r => ({
    ...r,
    cat: r.cats[0],
    hay: fold([...r.authors, r.title, r.subtitle, r.in, r.inAuthors, r.journal].filter(Boolean).join(' '))
  }))
]

const total = ITEMS.length

const categories = computed(() => BIB.categories.map(cat => ({
  key: cat.key,
  label: cat[lang.value] || cat.fr,
  count: ITEMS.filter(i => i.cat === cat.key).length
})))

const filters = computed(() => [
  { key: 'all', label: `${c.value.all} · ${total}` },
  ...categories.value.map(cat => ({ key: cat.key, label: `${cat.label} · ${cat.count}` }))
])

const matches = computed(() => {
  const words = fold(query.value).split(/\s+/).filter(Boolean)
  return ITEMS.filter(i =>
    (filter.value === 'all' || i.cat === filter.value) &&
    words.every(w => i.hay.includes(w))
  )
})

const groups = computed(() => categories.value
  .map(cat => ({
    ...cat,
    intro: c.value.intros[cat.key],
    items: matches.value.filter(i => i.cat === cat.key)
  }))
  .filter(g => g.items.length))

const visibleCount = computed(() => matches.value.length)

function reset () {
  filter.value = 'all'
  query.value = ''
}

function journalLine (r) {
  const parts = [
    r.volume && `vol. ${r.volume}`,
    r.issue && `n° ${r.issue}`,
    r.date,
    r.passage && `p. ${r.passage}`
  ].filter(Boolean)
  return parts.length ? `, ${parts.join(', ')}` : ''
}

function pubLine (r) {
  if (r.type === 'article') return ''
  const where = [r.place, r.publisher].filter(Boolean).join(' : ')
  const parts = [
    [where, r.year].filter(Boolean).join(', '),
    r.collection && `coll. ${r.collection}`,
    r.volume && `t. ${r.volume}${r.volumeTitle ? ` : ${r.volumeTitle}` : ''}`,
    r.pages && `${r.pages} p.`,
    r.passage && `p. ${r.passage}`
  ].filter(Boolean)
  return parts.join(' · ')
}

useHead(() => ({
  title: c.value.title,
  meta: [{ name: 'description', content: c.value.metaDesc }]
}))
</script>

<style scoped>
.sr-only,
.sr-title {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.hero-title { margin-top: 24px; }
.hero-total { display: flex; align-items: baseline; flex-wrap: wrap; gap: 8px 14px; }
.hero-total .num { color: var(--gold-light); }
.hero-total-label { font: 600 15px/1.3 var(--font-body); color: var(--on-dark); }

/* Compteurs */
.counts-sec { padding-top: 0; }
.counts {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: var(--gap);
}
.count { display: flex; flex-direction: column; justify-content: space-between; gap: 18px; min-height: 150px; }
.count-label { font: 600 15px/1.25 var(--font-body); }

/* Filtres */
.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 20px;
}
.filters .pill-row { flex: 1 1 520px; min-width: 0; }
.search { position: relative; flex: 0 1 320px; min-width: 0; width: 100%; }
.search-ico {
  position: absolute;
  inset-inline-start: 16px;
  top: 50%;
  width: 18px;
  height: 18px;
  transform: translateY(-50%);
  fill: none;
  stroke: var(--muted);
  stroke-width: 2;
  stroke-linecap: round;
  pointer-events: none;
}
.search-input {
  width: 100%;
  min-height: 48px;
  border: 1.5px solid var(--sand-deep);
  border-radius: 999px;
  background: var(--white);
  padding-block: 12px;
  padding-inline: 44px 18px;
  font: 500 15px/1.2 var(--font-body);
  color: var(--ink);
}
.search-input:focus { outline: 2px solid var(--purple); outline-offset: 1px; border-color: transparent; }
.result-count { margin-top: 14px; font: 500 14px/1.4 var(--font-body); color: var(--muted); }

/* Liste */
.group { padding-top: clamp(36px, 4.5vw, 64px); }
.refs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: var(--gap);
}
.ref {
  position: relative;
  background: var(--white);
  border-radius: 18px;
  padding: 18px 20px;
  text-align: start;
  min-width: 0;
}
.ref p { margin: 0; overflow-wrap: anywhere; }
.ref-type {
  float: inline-end;
  margin-inline-start: 10px;
  font: 600 11px/1 var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  background: var(--paper);
  padding: 6px 9px;
  border-radius: 999px;
}
.ref-auth { font: 700 15px/1.35 var(--font-body); color: var(--ink); }
.ref-title { margin-top: 4px !important; font: 400 16px/1.4 var(--font-body); color: var(--ink); }
.ref-title cite, .ref-meta cite { font-style: italic; }
.ref-meta { margin-top: 6px !important; font: 400 14px/1.45 var(--font-body); color: var(--muted); }
.ref-ids {
  margin-top: 8px !important;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
  font: 500 12.5px/1.4 var(--font-body);
  color: var(--stone);
}
.ref-ids a { color: var(--purple); }
.ref-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  margin-top: 4px;
  font: 600 14px/1 var(--font-body);
  color: var(--purple);
}
.ref--ancient { background: var(--paper); }
.ref--ancient .ref-auth { font-size: 17px; }
.ref-desc { margin-top: 10px !important; font: 400 14.5px/1.55 var(--font-body); color: var(--stone); }

.empty { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; }

/* Wikipédia + liens */
.wiki .h-card, .cross .h-card { margin-top: 4px; }
.wiki .body { margin-top: 8px; }
.wiki-links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.wiki-links a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  font: 700 16px/1.2 var(--font-body);
  color: var(--white);
}
.cross { text-decoration: none; transition: transform 0.2s; }
.cross:hover { transform: translateY(-2px); }
.cross .body { margin-top: 8px; }
.cross-arrow { font: 800 26px/1 var(--font-display); color: var(--purple); }
[dir="rtl"] .cross-arrow { transform: scaleX(-1); display: inline-block; align-self: flex-start; }

@media (max-width: 1100px) {
  .counts { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .counts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .count { min-height: 120px; }
  .search { flex-basis: 100%; }
  .ref { padding: 16px; }
}
</style>
