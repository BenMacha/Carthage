<template>
  <div class="pg">
    <section class="bento bento--top">
      <div class="s-8 tile tile--xl tile--ink tile--stack hero">
        <span class="phoen watermark" aria-hidden="true">𐤒𐤓𐤕𐤇𐤃𐤔𐤕</span>
        <span class="chip chip--glass">{{ c.chip }}</span>
        <div>
          <h1 class="h-display">{{ c.title }}</h1>
          <p class="lede">{{ c.lede }}</p>
        </div>
      </div>
      <div class="s-4 tile tile--xl tile--stack stats">
        <div class="stat">
          <span class="num">{{ pageCount }}</span>
          <span class="body">{{ c.pages }}</span>
        </div>
        <div class="stat">
          <span class="num">3</span>
          <span class="body">{{ c.langs }}</span>
        </div>
        <div class="stat">
          <span class="num">{{ pageCount * 3 }}</span>
          <span class="body">{{ c.urls }}</span>
        </div>
      </div>
    </section>

    <nav class="bento jump" :aria-label="c.jump">
      <div class="s-12 pill-row">
        <a v-for="g in groups" :key="g.key" :href="`#${g.key}`" class="pill-btn">{{ g.label }}</a>
      </div>
    </nav>

    <section v-for="g in groups" :id="g.key" :key="g.key" class="sec group" :aria-labelledby="`h-${g.key}`">
      <div class="group-grid">
        <header class="tile tile--xl tile--stack group-head" :class="`tile--${g.tone}`">
          <span class="kicker">{{ g.pages.length }} {{ g.pages.length > 1 ? c.pagesShort : c.pageShort }}</span>
          <h2 :id="`h-${g.key}`" class="h-block">{{ g.label }}</h2>
        </header>
        <ul class="links">
          <li v-for="p in g.pages" :key="p.slug">
            <NuxtLink :to="localePath(p.slug ? `/${p.slug}` : '/')" class="link">
              <span class="link-text">
                <span class="link-title">{{ p.label }}</span>
                <span class="link-desc">{{ p.desc }}</span>
              </span>
              <span class="arrow" aria-hidden="true">{{ arrow }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="sec">
      <div class="cols cols-2 cols--flush">
        <div class="tile tile--xl tile--stack tile--paper">
          <div>
            <span class="kicker">{{ c.xmlKick }}</span>
            <h2 class="h-card">sitemap.xml</h2>
            <p class="body">{{ c.xmlText }}</p>
          </div>
          <a href="/sitemap.xml" class="btn btn-outline">{{ c.xmlBtn }}</a>
        </div>
        <div class="tile tile--xl tile--stack tile--paper">
          <div>
            <span class="kicker">{{ c.llmsKick }}</span>
            <h2 class="h-card">llms.txt</h2>
            <p class="body">{{ c.llmsText }}</p>
          </div>
          <a href="/llms.txt" class="btn btn-outline">{{ c.llmsBtn }}</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import SITE_MAP from '~/assets/data/site-map.json'

const { locale, localePath } = useI18n()

const C = {
  fr: {
    chip: 'Navigation',
    title: 'Plan du site',
    lede: "Toutes les pages, rangées par thème. Chaque page existe en français, en anglais et en arabe.",
    pages: 'pages', langs: 'langues : français, anglais, arabe', urls: 'adresses dans le sitemap',
    pageShort: 'page', pagesShort: 'pages', jump: 'Aller à une rubrique',
    xmlKick: 'Pour les moteurs de recherche', xmlText: "La liste complète des adresses, avec leurs versions linguistiques (hreflang). Elle est régénérée à chaque mise en ligne.", xmlBtn: 'Ouvrir le sitemap',
    llmsKick: 'Pour les assistants IA', llmsText: "Un résumé du site et de ses pages, au format llms.txt, pour les moteurs de réponse et assistants.", llmsBtn: 'Ouvrir llms.txt',
    meta: 'Plan du site Carthage : toutes les pages par thème, en français, anglais et arabe.'
  },
  en: {
    chip: 'Navigation',
    title: 'Site map',
    lede: 'Every page, grouped by theme. Each page is available in French, English and Arabic.',
    pages: 'pages', langs: 'languages: French, English, Arabic', urls: 'addresses in the sitemap',
    pageShort: 'page', pagesShort: 'pages', jump: 'Jump to a section',
    xmlKick: 'For search engines', xmlText: 'The full list of addresses with their language versions (hreflang). It is regenerated on every release.', xmlBtn: 'Open the sitemap',
    llmsKick: 'For AI assistants', llmsText: 'A summary of the site and its pages in the llms.txt format, for answer engines and assistants.', llmsBtn: 'Open llms.txt',
    meta: 'Carthage site map: every page by theme, in French, English and Arabic.'
  },
  ar: {
    chip: 'التصفح',
    title: 'خريطة الموقع',
    lede: 'كل الصفحات مرتّبة حسب الموضوع. وكل صفحة متاحة بالفرنسية والإنجليزية والعربية.',
    pages: 'صفحة', langs: 'لغات: الفرنسية والإنجليزية والعربية', urls: 'عنواناً في ملف sitemap',
    pageShort: 'صفحة', pagesShort: 'صفحات', jump: 'الانتقال إلى قسم',
    xmlKick: 'لمحركات البحث', xmlText: 'القائمة الكاملة للعناوين مع نسخها اللغوية (hreflang)، وتُحدَّث مع كل نشر.', xmlBtn: 'فتح ملف sitemap',
    llmsKick: 'للمساعدات الذكية', llmsText: 'ملخّص للموقع وصفحاته بصيغة llms.txt لمحركات الإجابة والمساعدات.', llmsBtn: 'فتح llms.txt',
    meta: 'خريطة موقع قرطاج: كل الصفحات حسب الموضوع، بالفرنسية والإنجليزية والعربية.'
  }
}

const c = computed(() => C[locale.value] || C.fr)
const arrow = computed(() => (locale.value === 'ar' ? '←' : '→'))

const groups = computed(() => SITE_MAP.groups.map(g => ({
  key: g.key,
  tone: g.tone,
  label: g.label[locale.value] || g.label.fr,
  pages: g.pages.map(p => ({
    slug: p.slug,
    label: p.label[locale.value] || p.label.fr,
    desc: p.desc[locale.value] || p.desc.fr
  }))
})))

const pageCount = SITE_MAP.groups.reduce((n, g) => n + g.pages.length, 0)

useHead(() => ({
  title: c.value.title,
  meta: [{ name: 'description', content: c.value.meta }]
}))
</script>

<style scoped>
.hero { position: relative; min-height: clamp(300px, 30vw, 420px); }
.hero > * { position: relative; }

.watermark {
  position: absolute !important;
  inset-inline-end: -10px;
  bottom: -30px;
  font-size: clamp(90px, 13vw, 190px);
  color: rgba(255, 255, 255, 0.06);
  white-space: nowrap;
  pointer-events: none;
}

.stats { justify-content: space-around; }

.stat {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  align-items: baseline;
  gap: 16px;
  padding-block: 12px;
  border-top: 1px solid rgba(22, 19, 15, 0.12);
}

.stat:first-child { border-top: 0; }
.stat .num { color: var(--purple); }

.jump { padding-top: 0; }
.jump .pill-btn { display: inline-flex; align-items: center; text-decoration: none; }
.jump .pill-btn:hover { background: var(--ink); color: var(--white); }

.group { scroll-margin-top: 96px; padding-top: clamp(28px, 3.4vw, 44px); }

.group-grid {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: var(--gap);
  align-items: stretch;
}

.group-head { min-height: 180px; }
.group-head .kicker { margin: 0; }

.links {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--gap);
}

.link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 100%;
  min-height: 88px;
  padding: 18px 20px;
  background: var(--white);
  border-radius: var(--r-md);
  color: var(--ink);
  transition: transform 0.2s, box-shadow 0.2s;
}

.link:hover {
  color: var(--ink);
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(22, 19, 15, 0.08);
}

.link-title {
  display: block;
  font: 800 19px/1.15 var(--font-display);
  letter-spacing: -0.01em;
}

.link-desc {
  display: block;
  margin-top: 5px;
  font: 400 14px/1.45 var(--font-body);
  color: var(--muted);
}

.arrow {
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--paper);
  transition: background 0.2s, color 0.2s;
}

.link:hover .arrow { background: var(--purple); color: var(--white); }

.btn { align-self: flex-start; }

@media (max-width: 960px) {
  .group-grid { grid-template-columns: minmax(0, 1fr); }
  .group-head { min-height: 0; }
  .stats { flex-direction: row; flex-wrap: wrap; justify-content: flex-start; }
  .stat { grid-template-columns: auto minmax(0, 1fr); border-top: 0; flex: 1 1 180px; }
}

@media (max-width: 640px) {
  .links { grid-template-columns: minmax(0, 1fr); }
  .link { min-height: 72px; padding: 14px 16px; }
  .link-title { font-size: 17px; }
}
</style>
