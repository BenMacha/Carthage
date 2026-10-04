<template>
  <div class="pg">
    <!-- Héros -->
    <section class="bento bento--top">
      <div class="s-8 tile tile--xl tile--ink tile--stack hero">
        <span class="phoen watermark" aria-hidden="true">𐤔𐤐𐤈 𐤕𐤍𐤕</span>
        <span class="chip chip--glass">{{ c.chip }}</span>
        <div>
          <h1 class="h-display">{{ c.title }}</h1>
          <p class="lede">{{ c.lede }}</p>
        </div>
        <div class="hero-stats">
          <p class="hero-stat"><span class="num">{{ ENTRIES.length }}</span> <span>{{ c.termsLabel }}</span></p>
          <p class="hero-stat"><span class="num">{{ CATS.length }}</span> <span>{{ c.catsLabel }}</span></p>
          <p class="hero-stat"><span class="num">3</span> <span>{{ c.langsLabel }}</span></p>
        </div>
      </div>
      <figure class="s-4 fig fig--hero" style="background:#5E574F">
        <img src="/img/tanit-stele.jpg" :alt="c.heroAlt">
        <figcaption>{{ c.heroCaption }}</figcaption>
      </figure>
    </section>

    <!-- Recherche, catégories, index -->
    <section class="sec sec--wide tools" :aria-label="c.toolsLabel">
      <div class="tools-row">
        <div class="search">
          <label for="glo-search" class="sr-only">{{ c.searchLabel }}</label>
          <svg class="search-ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          <input
            id="glo-search"
            v-model="query"
            type="search"
            class="search-input"
            :placeholder="c.searchPh"
            autocomplete="off"
            spellcheck="false"
          >
        </div>
        <div class="pill-row cats" role="group" :aria-label="c.filterLabel">
          <button
            v-for="f in filters"
            :key="f.key"
            type="button"
            class="pill-btn"
            :class="{ on: cat === f.key }"
            :aria-pressed="cat === f.key"
            @click="cat = f.key"
          >{{ f.label }} <span class="pill-count">{{ f.count }}</span></button>
        </div>
      </div>

      <nav class="az" :aria-label="c.azLabel">
        <template v-for="l in alphabet" :key="l">
          <a v-if="lettersOn.has(l)" :href="`#lettre-${l}`" class="az-l">{{ l }}</a>
          <span v-else class="az-l az-l--off" aria-hidden="true">{{ l }}</span>
        </template>
      </nav>

      <p class="result-count" aria-live="polite">{{ c.results(visible.length) }}</p>
    </section>

    <!-- Entrées, par lettre -->
    <section
      v-for="g in groups"
      :id="`lettre-${g.letter}`"
      :key="g.letter"
      class="sec letter-sec"
      :aria-labelledby="`h-lettre-${g.letter}`"
    >
      <div class="letter-grid">
        <h2 :id="`h-lettre-${g.letter}`" class="letter">{{ g.letter }}</h2>
        <div class="entries">
          <article
            v-for="e in g.items"
            :id="e.id"
            :key="e.id"
            class="entry"
            :aria-labelledby="`t-${e.id}`"
          >
            <div class="entry-top">
              <span class="entry-cat" :class="`tone-${e.cat}`">{{ catLabel(e.cat) }}</span>
              <a :href="`#${e.id}`" class="entry-anchor" :aria-label="c.anchorLabel(e.term[lang])" :title="c.anchorTitle">#</a>
            </div>
            <h3 :id="`t-${e.id}`" class="entry-term">{{ e.term[lang] }}</h3>
            <p class="entry-others">
              <span
                v-for="o in otherLangs"
                :key="o"
                class="entry-other"
                :lang="o"
                :dir="o === 'ar' ? 'rtl' : 'ltr'"
              ><abbr class="entry-lang" :title="c.langNames[o]">{{ o.toUpperCase() }}</abbr> {{ e.term[o] }}</span>
            </p>
            <p v-if="e.phoen" class="entry-phoen">
              <span class="phoen" dir="rtl" lang="phn">{{ e.phoen }}</span>
              <span class="entry-phoen-label">{{ c.phoenLabel }}</span>
            </p>
            <p class="entry-def">{{ e.def[lang] }}</p>
            <div v-if="e.see.length" class="entry-see">
              <span class="entry-see-label">{{ c.seeAlso }}</span>
              <ul class="entry-links">
                <li v-for="r in e.see" :key="r">
                  <NuxtLink :to="localePath(r)" class="entry-link">{{ pageLabel(r) }} <span class="entry-arrow" aria-hidden="true">{{ arrow }}</span></NuxtLink>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section v-if="!groups.length" class="sec">
      <div class="tile tile--paper empty">
        <p class="body">{{ c.empty }}</p>
        <button type="button" class="btn btn-outline" @click="reset">{{ c.reset }}</button>
      </div>
    </section>

    <!-- Note + liens croisés -->
    <section class="sec">
      <div class="cols cols-3 cols--flush">
        <div class="tile tile--navy tile--stack note">
          <div>
            <span class="kicker">{{ c.noteKicker }}</span>
            <h2 class="h-card">{{ c.noteTitle }}</h2>
            <p class="body">{{ c.noteText }}</p>
          </div>
        </div>
        <NuxtLink v-for="l in c.links" :key="l.to" :to="localePath(l.to)" class="tile tile--paper tile--stack cross">
          <div>
            <span class="kicker">{{ c.alsoKicker }}</span>
            <h2 class="h-card">{{ l.title }}</h2>
            <p class="body">{{ l.text }}</p>
          </div>
          <span class="cross-arrow" aria-hidden="true">{{ arrow }}</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import GLO_RAW from '~/assets/data/glossaire.json'
import SITE_MAP_RAW from '~/assets/data/site-map.json'

// Données complétées pour la langue affichée (langues ajoutées : i18n/locales/<langue>/)
const { locale: dataLocale } = useI18n()
const GLO = (await useLocalizedData('glossaire-data', GLO_RAW)).value
const SITE_MAP = localizeSiteMap(SITE_MAP_RAW, dataLocale.value)


const { locale, localePath } = useI18n()
const query = ref('')
const cat = ref('all')

const C = {
  fr: {
    chip: 'Carthage · Glossaire',
    title: 'Glossaire punique',
    lede: "Suffètes, tophet, Cothon, shekel ou diekplous : les mots du monde carthaginois employés sur ce site, définis en quelques lignes, avec leur graphie phénicienne et les pages où les retrouver.",
    termsLabel: 'termes',
    catsLabel: 'catégories',
    langsLabel: 'langues',
    heroAlt: 'Stèle punique gravée du signe de Tanit',
    heroCaption: 'Stèle au signe de Tanit',
    toolsLabel: 'Rechercher et filtrer le glossaire',
    searchLabel: 'Rechercher un terme, en français, en anglais ou en arabe',
    searchPh: 'Rechercher un terme (fr, en, ar)…',
    filterLabel: 'Filtrer par catégorie',
    all: 'Tout',
    azLabel: 'Index alphabétique',
    results: n => n === 0 ? 'Aucun terme' : n === 1 ? '1 terme affiché' : `${n} termes affichés`,
    anchorLabel: t => `Lien direct vers « ${t} »`,
    anchorTitle: 'Lien direct vers ce terme',
    langNames: { fr: 'Français', en: 'Anglais', ar: 'Arabe' },
    phoenLabel: 'graphie phénicienne',
    seeAlso: 'Voir aussi',
    empty: 'Aucun terme ne correspond à cette recherche.',
    reset: 'Réinitialiser',
    noteKicker: 'Transcriptions',
    noteTitle: 'Écrire le punique',
    noteText: "Le phénicien ne notait que les consonnes : les graphies ci-dessus se lisent de droite à gauche, et les formes françaises, anglaises ou arabes des noms sont des conventions héritées du grec et du latin. Les sources antiques citées sont détaillées dans la bibliographie.",
    alsoKicker: 'À lire aussi',
    links: [
      { to: '/langue-ecriture', title: 'Langue et écriture', text: "L'alphabet phénicien, les inscriptions puniques et votre nom en phénicien." },
      { to: '/bibliographie', title: 'Sources et bibliographie', text: 'Polybe, Tite-Live, Appien et les ouvrages modernes cités dans les définitions.' }
    ],
    metaDesc: "Glossaire trilingue du monde punique : suffète, tophet, Cothon, Byrsa, Barcides, shekel, garum, quinquérème, Tanit, Baal Hammon… Définitions, graphies phéniciennes et renvois."
  },
  en: {
    chip: 'Carthage · Glossary',
    title: 'Punic glossary',
    lede: 'Sufetes, tophet, Cothon, shekel or diekplous: the words of the Carthaginian world used on this site, defined in a few lines, with their Phoenician spelling and the pages where they appear.',
    termsLabel: 'terms',
    catsLabel: 'categories',
    langsLabel: 'languages',
    heroAlt: 'Punic stele carved with the sign of Tanit',
    heroCaption: 'Stele with the sign of Tanit',
    toolsLabel: 'Search and filter the glossary',
    searchLabel: 'Search for a term, in French, English or Arabic',
    searchPh: 'Search a term (fr, en, ar)…',
    filterLabel: 'Filter by category',
    all: 'All',
    azLabel: 'Alphabetical index',
    results: n => n === 0 ? 'No terms' : n === 1 ? '1 term shown' : `${n} terms shown`,
    anchorLabel: t => `Direct link to “${t}”`,
    anchorTitle: 'Direct link to this term',
    langNames: { fr: 'French', en: 'English', ar: 'Arabic' },
    phoenLabel: 'Phoenician spelling',
    seeAlso: 'See also',
    empty: 'No term matches this search.',
    reset: 'Reset',
    noteKicker: 'Transcriptions',
    noteTitle: 'Writing Punic',
    noteText: 'Phoenician wrote only consonants: the spellings above read from right to left, and the French, English or Arabic forms of the names are conventions inherited from Greek and Latin. The ancient sources cited are detailed in the bibliography.',
    alsoKicker: 'Read also',
    links: [
      { to: '/langue-ecriture', title: 'Language and writing', text: 'The Phoenician alphabet, Punic inscriptions and your name in Phoenician.' },
      { to: '/bibliographie', title: 'Sources and bibliography', text: 'Polybius, Livy, Appian and the modern works cited in the definitions.' }
    ],
    metaDesc: 'A trilingual glossary of the Punic world: sufete, tophet, Cothon, Byrsa, Barcids, shekel, garum, quinquereme, Tanit, Baal Hammon… Definitions, Phoenician spellings and cross-references.'
  },
  ar: {
    chip: 'قرطاج · المعجم',
    title: 'المعجم البونيقي',
    lede: 'الشفطون والتوفيت والكوثون والشيقل والديكبلوس: كلمات العالم القرطاجي المستعملة في هذا الموقع، معرَّفة في سطور قليلة، مع رسمها الفينيقي والصفحات التي ترد فيها.',
    termsLabel: 'مصطلحًا',
    catsLabel: 'فئات',
    langsLabel: 'لغات',
    heroAlt: 'نصب بونيقي منقوش بعلامة تانيت',
    heroCaption: 'نصب يحمل علامة تانيت',
    toolsLabel: 'البحث في المعجم وتصفيته',
    searchLabel: 'ابحث عن مصطلح بالفرنسية أو الإنجليزية أو العربية',
    searchPh: 'ابحث عن مصطلح (عربي، فرنسي، إنجليزي)…',
    filterLabel: 'التصفية حسب الفئة',
    all: 'الكل',
    azLabel: 'الفهرس الأبجدي',
    results: n => n === 0 ? 'لا توجد مصطلحات' : n === 1 ? 'مصطلح واحد معروض' : n === 2 ? 'مصطلحان معروضان' : `${n} مصطلحًا معروضًا`,
    anchorLabel: t => `رابط مباشر إلى «${t}»`,
    anchorTitle: 'رابط مباشر إلى هذا المصطلح',
    langNames: { fr: 'الفرنسية', en: 'الإنجليزية', ar: 'العربية' },
    phoenLabel: 'الرسم الفينيقي',
    seeAlso: 'انظر أيضًا',
    empty: 'لا يوجد مصطلح يطابق هذا البحث.',
    reset: 'إعادة الضبط',
    noteKicker: 'النقل الحرفي',
    noteTitle: 'كتابة البونيقية',
    noteText: 'لم تكن الفينيقية تدوّن سوى الصوامت: تُقرأ الرسوم أعلاه من اليمين إلى اليسار، أما صيغ الأسماء بالفرنسية والإنجليزية والعربية فأعراف موروثة عن الإغريقية واللاتينية. والمصادر القديمة المذكورة مفصّلة في قائمة المراجع.',
    alsoKicker: 'اقرأ أيضًا',
    links: [
      { to: '/langue-ecriture', title: 'اللغة والكتابة', text: 'الأبجدية الفينيقية والنقوش البونيقية واسمك بالفينيقية.' },
      { to: '/bibliographie', title: 'المصادر والمراجع', text: 'بوليبيوس وتيتوس ليفيوس وأبيانوس والمؤلفات الحديثة المذكورة في التعريفات.' }
    ],
    metaDesc: 'معجم ثلاثي اللغة للعالم البونيقي: الشفط، التوفيت، الكوثون، بيرصا، البرقيون، الشيقل، الغاروم، السفينة الخماسية، تانيت، بعل حمون… تعريفات ورسوم فينيقية وإحالات.'
  }
}

const c = await useLocalized('glossaire', C)
const lang = computed(() => locale.value)
const otherLangs = computed(() => ['fr', 'en', 'ar'].filter(l => l !== lang.value))
const arrow = computed(() => (lang.value === 'ar' ? '←' : '→'))

const CATS = GLO.meta.categories

// Recherche insensible à la casse, aux accents, aux signes diacritiques
// (ḥ, ʿ), aux voyelles brèves arabes et aux variantes de alif / ta marbuta.
const fold = s => (s || '')
  .normalize('NFD')
  .replace(/[̀-ًͯ-ٰٟـ]/g, '')
  .replace(/[ʿʾ'’‘«»“”()\-]/g, ' ')
  .replace(/[أإآٱ]/g, 'ا')
  .replace(/ى/g, 'ي')
  .replace(/ة/g, 'ه')
  .toLowerCase()
  .replace(/\s+/g, ' ')
  .trim()

// Clé de tri et lettre d'index : on ignore guillemets, parenthèses et,
// en arabe, l'article « ال » pour classer à la première lettre du nom.
function sortKey (term, l) {
  let s = (term || '').replace(/^[«"“(\s]+/, '')
  if (l === 'ar') {
    s = s.normalize('NFD').replace(/[ً-ٰٟـ]/g, '').replace(/^ال(?=\S{2})/, '').replace(/[أإآٱ]/g, 'ا')
  }
  return s
}

function initial (term, l) {
  const k = sortKey(term, l)
  if (l === 'ar') return k.charAt(0)
  return k.normalize('NFD').replace(/[̀-ͯ]/g, '').charAt(0).toUpperCase()
}

const AR_LETTERS = 'ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي'.split(' ')
const LATIN_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const alphabet = computed(() => (lang.value === 'ar' ? AR_LETTERS : LATIN_LETTERS))

const ENTRIES = GLO.terms.map(e => ({
  ...e,
  names: fold([...Object.values(e.term), ...(e.alias || [])].join(' '))
}))

const catLabel = key => {
  const k = CATS.find(x => x.key === key)
  return k ? (k[lang.value] || k.fr) : key
}

const filters = computed(() => [
  { key: 'all', label: c.value.all, count: ENTRIES.length },
  ...CATS.map(k => ({ key: k.key, label: k[lang.value] || k.fr, count: ENTRIES.filter(e => e.cat === k.key).length }))
])

const visible = computed(() => {
  const words = fold(query.value).split(' ').filter(Boolean)
  const l = lang.value
  return ENTRIES
    .filter(e => cat.value === 'all' || e.cat === cat.value)
    .filter(e => {
      if (!words.length) return true
      const hay = `${e.names} ${fold(e.def[l])}`
      return words.every(w => hay.includes(w))
    })
    .map(e => ({ ...e, key: sortKey(e.term[l], l), letter: initial(e.term[l], l) }))
    .sort((a, b) => a.key.localeCompare(b.key, l, { sensitivity: 'base' }))
})

const groups = computed(() => {
  const out = []
  for (const e of visible.value) {
    const last = out[out.length - 1]
    if (last && last.letter === e.letter) last.items.push(e)
    else out.push({ letter: e.letter, items: [e] })
  }
  return out
})

const lettersOn = computed(() => new Set(groups.value.map(g => g.letter)))

const PAGES = Object.fromEntries(
  SITE_MAP.groups.flatMap(g => g.pages).map(p => [`/${p.slug}`, p.label])
)
const pageLabel = r => {
  const p = PAGES[r]
  return p ? (p[lang.value] || p.fr) : r
}

function reset () {
  cat.value = 'all'
  query.value = ''
}

useHead(() => ({
  title: c.value.title,
  meta: [{ name: 'description', content: c.value.metaDesc }]
}))
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Héros */
.hero { position: relative; overflow: hidden; min-height: clamp(320px, 32vw, 460px); }
.hero > * { position: relative; }
.watermark {
  position: absolute !important;
  inset-inline-end: -10px;
  bottom: -24px;
  font-size: clamp(80px, 12vw, 180px);
  color: rgba(255, 255, 255, 0.06);
  white-space: nowrap;
  pointer-events: none;
}
.hero-stats { display: flex; flex-wrap: wrap; gap: 8px 28px; }
.hero-stat { margin: 0; display: flex; align-items: baseline; gap: 8px; font: 600 15px/1.3 var(--font-body); color: var(--on-dark); }
.hero-stat .num { color: var(--gold-light); }

/* Outils */
.tools { padding-top: clamp(20px, 3vw, 36px); }
.tools-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 16px;
}
.search { position: relative; flex: 0 1 360px; min-width: 0; width: 100%; }
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
[dir="rtl"] .search-input { font-family: var(--font-ar), var(--font-body); }
.search-input:focus { outline: 2px solid var(--purple); outline-offset: 1px; border-color: transparent; }
.cats { flex: 1 1 480px; min-width: 0; }
.pill-count { margin-inline-start: 4px; font-weight: 500; opacity: 0.6; }

.az {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 16px;
}
.az-l {
  display: inline-grid;
  place-items: center;
  min-width: 44px;
  min-height: 44px;
  border-radius: 12px;
  font: 800 16px/1 var(--font-display);
  color: var(--ink);
  background: var(--white);
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
[dir="rtl"] .az-l { font-family: var(--font-ar); font-weight: 700; font-size: 18px; }
a.az-l:hover, a.az-l:focus-visible { background: var(--ink); color: var(--white); }
.az-l--off { background: transparent; color: var(--sand-deep); cursor: default; }
.result-count { margin: 14px 0 0; font: 500 14px/1.4 var(--font-body); color: var(--muted); }

/* Lettres */
.letter-sec { padding-top: clamp(28px, 3.4vw, 48px); }
.letter-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 11fr);
  gap: var(--gap);
  align-items: start;
}
.letter {
  position: sticky;
  top: 96px;
  margin: 0;
  font: 900 clamp(40px, 4.6vw, 68px)/1 var(--font-display);
  color: var(--purple);
}
[dir="rtl"] .letter { font-family: var(--font-ar); font-weight: 700; }

.entries {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr));
  gap: var(--gap);
}

/* Carte */
.entry {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  background: var(--white);
  border-radius: var(--r-md);
  padding: 20px 22px;
  text-align: start;
  transition: box-shadow 0.3s;
}
.entry:target { box-shadow: 0 0 0 3px var(--gold); }
.entry p { margin: 0; overflow-wrap: anywhere; }
.entry-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.entry-cat {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  font: 700 11.5px/1 var(--font-body);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
[dir="rtl"] .entry-cat { text-transform: none; letter-spacing: 0; font-size: 13px; }
.tone-institutions { background: var(--purple-soft); color: var(--purple-dark); }
.tone-religion { background: var(--terra-soft); color: #8A3219; }
.tone-guerre { background: var(--navy-soft); color: var(--navy-deep); }
.tone-economie { background: #F4E4BF; color: var(--gold-ink); }
.tone-lieux { background: var(--olive-soft); color: var(--olive); }
.tone-langue { background: var(--ink); color: var(--white); }
.tone-art { background: var(--sand); color: var(--stone); }
.tone-histoire { background: var(--paper); color: var(--ink); }
.entry-anchor {
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin: -10px;
  margin-inline-end: -12px;
  border-radius: 50%;
  font: 800 18px/1 var(--font-display);
  color: var(--muted);
  text-decoration: none;
}
.entry-anchor:hover, .entry-anchor:focus-visible { color: var(--purple); background: var(--paper); }
.entry-term {
  margin: 0;
  font: 800 clamp(21px, 1.9vw, 26px)/1.1 var(--font-display);
  letter-spacing: -0.01em;
  overflow-wrap: anywhere;
}
[dir="rtl"] .entry-term { font-family: var(--font-ar); font-weight: 700; line-height: 1.35; letter-spacing: 0; }
.entry-others { display: flex; flex-wrap: wrap; gap: 2px 14px; font: 500 14px/1.45 var(--font-body); color: var(--stone); }
.entry-other[lang="ar"] { font-family: var(--font-ar); font-size: 15.5px; }
.entry-lang {
  text-decoration: none;
  font: 700 10.5px/1 var(--font-body);
  letter-spacing: 0.06em;
  color: var(--muted);
  margin-inline-end: 2px;
}
.entry-phoen { display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px 10px; }
.entry-phoen .phoen { font-size: 26px; color: var(--purple); }
.entry-phoen-label { font: 500 12.5px/1.2 var(--font-body); color: var(--muted); }
.entry-def { font: 400 15px/1.6 var(--font-body); color: var(--ink); }
[dir="rtl"] .entry-def { font-family: var(--font-ar); font-size: 16px; line-height: 1.8; }
.entry-see { margin-top: auto; padding-top: 10px; border-top: 1px solid var(--sand); }
.entry-see-label { display: block; font: 700 12px/1 var(--font-body); color: var(--muted); margin-bottom: 2px; }
.entry-links { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0 16px; }
.entry-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  font: 600 14.5px/1.2 var(--font-body);
  color: var(--purple);
}
.entry-arrow { transition: transform 0.2s; }
.entry-link:hover .entry-arrow { transform: translateX(3px); }
[dir="rtl"] .entry-link:hover .entry-arrow { transform: translateX(-3px); }

.empty { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; }

/* Note + liens */
.note .body, .cross .body { margin-top: 8px; }
.cross { text-decoration: none; color: var(--ink); transition: transform 0.2s; }
.cross:hover { transform: translateY(-2px); color: var(--ink); }
.cross-arrow { font: 800 26px/1 var(--font-display); color: var(--purple); }

@media (max-width: 960px) {
  .letter-grid { grid-template-columns: minmax(0, 1fr); }
  .letter { position: static; font-size: 44px; }
}
@media (max-width: 640px) {
  .search { flex-basis: 100%; }
  .cats { flex-basis: 100%; }
  .entry { padding: 16px 18px; }
  .az { gap: 2px; }
}
</style>
