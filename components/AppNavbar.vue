<template>
  <div class="nav-wrap" :class="{ scrolled: isScrolled }">
    <header class="nav">
      <NuxtLink :to="localePath('/')" class="brand" @click="close">
        <span class="tanit" aria-hidden="true"><i /><i /><i /></span>
        <span class="brand-name">{{ t.siteName }}</span>
      </NuxtLink>

      <nav class="links" :aria-label="L.menu">
        <NuxtLink :to="localePath('/')" class="lk" :class="{ on: isHome }">{{ L.home }}</NuxtLink>
        <div v-for="g in groups" :key="g.key" class="dd" :class="{ open: openDd === g.key }" @mouseenter="openDd = g.key" @mouseleave="openDd = null">
          <button class="lk" :class="{ on: groupActive(g) }" :aria-expanded="openDd === g.key" @click="openDd = openDd === g.key ? null : g.key">
            {{ g.label }} <span class="caret" aria-hidden="true">▾</span>
          </button>
          <div class="menu" :class="{ 'menu--2': g.items.length > 6 }">
            <NuxtLink v-for="it in g.items" :key="it.to" :to="localePath(it.to)" @click="openDd = null">{{ it.label }}</NuxtLink>
          </div>
        </div>
        <NuxtLink v-for="it in flat" :key="it.to" :to="localePath(it.to)" class="lk">{{ it.label }}</NuxtLink>
      </nav>

      <div class="right">
        <SiteSearch />
        <LangPicker :label="L.lang" />
        <button class="burger" :class="{ open: menuOpen }" :aria-expanded="menuOpen" :aria-label="L.menu" @click="menuOpen = !menuOpen">
          <i /><i />
        </button>
      </div>
    </header>

    <!-- Tiroir mobile -->
      <div v-if="menuOpen" class="drawer" @click.self="close">
        <div class="drawer-panel">
          <NuxtLink :to="localePath('/')" class="d-main" @click="close">{{ L.home }}</NuxtLink>
          <section v-for="g in groups" :key="g.key">
            <div class="d-title">{{ g.label }}</div>
            <div class="d-grid">
              <NuxtLink v-for="it in g.items" :key="it.to" :to="localePath(it.to)" @click="close">{{ it.label }}</NuxtLink>
            </div>
          </section>
          <div class="d-flat">
            <NuxtLink v-for="it in flat" :key="it.to" :to="localePath(it.to)" class="d-main" @click="close">{{ it.label }}</NuxtLink>
          </div>
          <div class="d-title">{{ L.lang }}</div>
          <div class="d-langs">
            <button v-for="loc in LOCALES" :key="loc.code" :class="{ on: locale === loc.code }" :lang="loc.code" :dir="loc.dir" @click="setLocale(loc.code); close()">
              <FlagIcon :code="loc.flag" />
              <span>{{ loc.name }}</span>
            </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import LOCALES from '~/i18n/locales.json'

const { t, locale, setLocale, localePath } = useI18n()
const route = useRoute()
const isScrolled = ref(false)
const menuOpen = ref(false)
const openDd = ref(null)

const LABELS = {
  fr: {
    home: 'Accueil', menu: 'Menu', lang: 'Langue', hannibal: 'Hannibal', carthage: 'Carthage', civ: 'Civilisation', res: 'Ressources',
    tunisie: 'Tunisie', carte: 'Carte', persos: 'Personnages',
    items: {
      hannibal: 'Hannibal Barca', tactiques: 'Les tactiques', elephants: 'Les éléphants et les Alpes', guerres: 'Les guerres puniques', armee: "L'armée de Carthage",
      fondation: 'La fondation', chronologie: 'Chronologie', richesse: 'La richesse et Rome', lieux: 'Lieux historiques', economie: 'Économie', agriculture: 'Agriculture', religion: 'Religion',
      sources: 'Histoire des vainqueurs', prise: 'La prise de Carthage', apres: 'Carthage après 146', mercenaires: 'La guerre des Mercenaires', monde: 'Le monde punique', vie: 'La vie quotidienne', heritage: "L'héritage culturel", quiz: 'Quiz', glossaire: 'Glossaire', biblio: 'Sources et bibliographie', plan: 'Plan du site', afrique: "L'Afrique et son nom", institutions: 'Institutions et société', art: 'Art et artisanat', langue: 'Langue et écriture'
    }
  },
  en: {
    home: 'Home', menu: 'Menu', lang: 'Language', hannibal: 'Hannibal', carthage: 'Carthage', civ: 'Civilisation', res: 'Resources',
    tunisie: 'Tunisia', carte: 'Map', persos: 'People',
    items: {
      hannibal: 'Hannibal Barca', tactiques: 'Tactics', elephants: 'Elephants and the Alps', guerres: 'The Punic Wars', armee: "Carthage's army",
      fondation: 'The founding', chronologie: 'Timeline', richesse: 'Wealth and Rome', lieux: 'Historic places', economie: 'Economy', agriculture: 'Agriculture', religion: 'Religion',
      sources: "The victors' history", prise: 'The fall of Carthage', apres: 'Carthage after 146', mercenaires: 'The Mercenary War', monde: 'The Punic world', vie: 'Daily life', heritage: 'Cultural legacy', quiz: 'Quiz', glossaire: 'Glossary', biblio: 'Sources and bibliography', plan: 'Site map', afrique: 'Africa and its name', institutions: 'Institutions and society', art: 'Art and crafts', langue: 'Language and writing'
    }
  },
  ar: {
    home: 'الرئيسية', menu: 'القائمة', lang: 'اللغة', hannibal: 'حنبعل', carthage: 'قرطاج', civ: 'الحضارة', res: 'مصادر وأدوات',
    tunisie: 'تونس', carte: 'الخريطة', persos: 'الشخصيات',
    items: {
      hannibal: 'حنبعل برقا', tactiques: 'التكتيكات', elephants: 'الفيلة وجبال الألب', guerres: 'الحروب البونيقية', armee: 'جيش قرطاج',
      fondation: 'التأسيس', chronologie: 'التسلسل الزمني', richesse: 'الثروة وروما', lieux: 'أماكن تاريخية', economie: 'الاقتصاد', agriculture: 'الفلاحة', religion: 'الديانة',
      sources: 'تاريخ المنتصرين', prise: 'سقوط قرطاج', apres: 'قرطاج بعد 146', mercenaires: 'حرب المرتزقة', monde: 'العالم البونيقي', vie: 'الحياة اليومية', heritage: 'الإرث الثقافي', quiz: 'اختبار', glossaire: 'المعجم', biblio: 'المصادر والمراجع', plan: 'خريطة الموقع', afrique: 'إفريقيا واسمها', institutions: 'المؤسسات والمجتمع', art: 'الفن والحِرف', langue: 'اللغة والكتابة'
    }
  }
}

const L = useUiText('navbar', LABELS)

const groups = computed(() => [
  {
    key: 'hannibal',
    label: L.value.hannibal,
    items: [
      { to: '/hannibal', label: L.value.items.hannibal },
      { to: '/tactiques', label: L.value.items.tactiques },
      { to: '/elephants', label: L.value.items.elephants },
      { to: '/guerres-puniques', label: L.value.items.guerres },
      { to: '/guerre-des-mercenaires', label: L.value.items.mercenaires },
      { to: '/armee', label: L.value.items.armee }
    ]
  },
  {
    key: 'carthage',
    label: L.value.carthage,
    items: [
      { to: '/fondation', label: L.value.items.fondation },
      { to: '/chronologie', label: L.value.items.chronologie },
      { to: '/richesse-rome', label: L.value.items.richesse },
      { to: '/prise-de-carthage', label: L.value.items.prise },
      { to: '/apres-146', label: L.value.items.apres },
      { to: '/histoire-des-vainqueurs', label: L.value.items.sources },
      { to: '/monde-punique', label: L.value.items.monde },
      { to: '/lieux', label: L.value.items.lieux },
      { to: '/afrique', label: L.value.items.afrique }
    ]
  },
  {
    key: 'civ',
    label: L.value.civ,
    items: [
      { to: '/institutions', label: L.value.items.institutions },
      { to: '/economie', label: L.value.items.economie },
      { to: '/agriculture', label: L.value.items.agriculture },
      { to: '/religion', label: L.value.items.religion },
      { to: '/art-et-artisanat', label: L.value.items.art },
      { to: '/langue-ecriture', label: L.value.items.langue },
      { to: '/vie-quotidienne', label: L.value.items.vie },
      { to: '/heritage', label: L.value.items.heritage }
    ]
  },
  {
    key: 'res',
    label: L.value.res,
    items: [
      { to: '/quiz', label: L.value.items.quiz },
      { to: '/glossaire', label: L.value.items.glossaire },
      { to: '/bibliographie', label: L.value.items.biblio },
      { to: '/plan-du-site', label: L.value.items.plan }
    ]
  }
])

const flat = computed(() => [
  { to: '/tunisie', label: L.value.tunisie },
  { to: '/carte', label: L.value.carte },
  { to: '/biographies', label: L.value.persos }
])

const isHome = computed(() => route.path === `/${locale.value}` || route.path === `/${locale.value}/`)
const groupActive = (g) => g.items.some(it => route.path === localePath(it.to))


const close = () => { menuOpen.value = false }

watch(() => route.fullPath, () => { menuOpen.value = false; openDd.value = null })
watch(menuOpen, (v) => {
  if (typeof document !== 'undefined') document.body.style.overflow = v ? 'hidden' : ''
})

const onScroll = () => { isScrolled.value = window.scrollY > 8 }
const onKey = (e) => { if (e.key === 'Escape') { menuOpen.value = false; openDd.value = null } }

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<style scoped>
.nav-wrap {
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: calc(env(safe-area-inset-top, 0px) + var(--gutter)) var(--gutter) 0;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  transition: padding 0.25s;
}

.nav-wrap.scrolled {
  padding-top: calc(env(safe-area-inset-top, 0px) + 10px);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: var(--white);
  border-radius: 999px;
  padding: 10px 10px 10px 24px;
  transition: box-shadow 0.25s;
}

[dir="rtl"] .nav { padding: 10px 24px 10px 10px; }

.scrolled .nav {
  box-shadow: 0 6px 24px rgba(22, 19, 15, 0.08);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ink);
  flex: none;
}

.brand:hover { color: var(--ink); }

.tanit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.tanit i { display: block; background: var(--purple); }
.tanit i:nth-child(1) { width: 12px; height: 12px; border-radius: 50%; }
.tanit i:nth-child(2) { width: 22px; height: 3px; border-radius: 2px; }
.tanit i:nth-child(3) { width: 18px; height: 14px; clip-path: polygon(50% 0, 100% 100%, 0 100%); }

.brand-name {
  font: 800 20px/1 var(--font-display);
  font-stretch: 112%;
  letter-spacing: -0.01em;
}

.links {
  display: flex;
  align-items: center;
  gap: 2px;
}

.lk {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 999px;
  border: 0;
  background: transparent;
  font: 500 15px/1 var(--font-body);
  color: var(--ink);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
}

.lk:hover { background: var(--paper); color: var(--ink); }
.lk.on, .lk.router-link-exact-active { background: var(--paper); }

.caret { font-size: 11px; opacity: 0.7; }

.dd { position: relative; }

.menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 240px;
  background: var(--white);
  border-radius: 22px;
  padding: 8px;
  box-shadow: 0 16px 40px rgba(22, 19, 15, 0.14);
  display: flex;
  flex-direction: column;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 0.18s, transform 0.18s, visibility 0.18s;
}

[dir="rtl"] .menu { left: auto; right: 0; }

.menu--2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  min-width: 460px;
}

.menu::before {
  content: '';
  position: absolute;
  inset: -10px 0 auto;
  height: 10px;
}

.dd.open .menu {
  opacity: 1;
  visibility: visible;
  transform: none;
}

.menu a {
  padding: 11px 14px;
  border-radius: 14px;
  font: 500 14px/1.2 var(--font-body);
  color: var(--ink);
}

.menu a:hover, .menu a.router-link-exact-active { background: var(--paper); }

.right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: none;
}

.burger {
  display: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.burger {
  background: var(--ink);
  flex-direction: column;
  gap: 4px;
}

.burger i {
  display: block;
  width: 16px;
  height: 2px;
  background: var(--white);
  transition: transform 0.25s;
}

.burger.open i:first-child { transform: translateY(3px) rotate(45deg); }
.burger.open i:last-child { transform: translateY(-3px) rotate(-45deg); }

/* Tiroir */
.drawer {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: rgba(22, 19, 15, 0.35);
  padding: calc(env(safe-area-inset-top, 0px) + 76px) var(--gutter) var(--gutter);
  overflow-y: auto;
}

.drawer-panel {
  background: var(--white);
  border-radius: 28px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.d-main {
  display: block;
  padding: 14px 16px;
  border-radius: 18px;
  background: var(--paper);
  font: 800 20px/1 var(--font-display);
  color: var(--ink);
}

.d-title {
  font: 700 12px/1 var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--purple);
  margin: 4px 4px 8px;
}

.d-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}

.d-grid a {
  padding: 12px 14px;
  min-height: 44px;
  border-radius: 14px;
  background: var(--paper);
  font: 500 14px/1.25 var(--font-body);
  color: var(--ink);
  display: flex;
  align-items: center;
}

.d-grid a.router-link-exact-active,
.d-main.router-link-exact-active { background: var(--ink); color: var(--white); }

.d-flat { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
.d-flat .d-main { font-size: 16px; text-align: center; padding: 14px 8px; }

.d-langs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }

.d-langs button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  border: 0;
  background: var(--paper);
  border-radius: 999px;
  padding: 12px 8px;
  min-height: 44px;
  font: 600 14px/1 var(--font-body);
  color: var(--ink);
  cursor: pointer;
}

.d-langs button.on { background: var(--ink); color: var(--white); }

/* Ouverture animée en CSS pur ; fermeture immédiate (ne peut pas rester bloquée) */
.drawer { animation: drawer-fade 0.2s ease-out; }
.drawer-panel { animation: drawer-slide 0.25s ease-out; }
@keyframes drawer-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes drawer-slide { from { transform: translateY(-12px); } to { transform: none; } }

@media (max-width: 1320px) {
  .lk { padding: 12px 10px; font-size: 14px; }
}

@media (max-width: 1180px) {
  .links { display: none; }
  .burger { display: inline-flex; }
  .nav { padding: 6px 6px 6px 18px; }
  [dir="rtl"] .nav { padding: 6px 18px 6px 6px; }
}

@media (max-width: 400px) {
  .d-grid { grid-template-columns: minmax(0, 1fr); }
  .d-flat { grid-template-columns: minmax(0, 1fr); }
  .d-langs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .brand-name { font-size: 18px; }
}
</style>
