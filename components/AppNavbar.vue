<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container navbar-inner">
      <NuxtLink :to="localePath('/')" class="navbar-brand">
        <span class="brand-icon">🏛️</span>
        <span class="brand-text">{{ t.siteName }}</span>
      </NuxtLink>

      <ul class="nav-links" :class="{ open: menuOpen }">
        <li><NuxtLink :to="localePath('/')" @click="menuOpen = false">{{ t.nav.home }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/chronologie')" @click="menuOpen = false">{{ t.nav.timeline }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/elephants')" @click="menuOpen = false">{{ t.nav.elephants }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/economie')" @click="menuOpen = false">{{ t.nav.economy }}</NuxtLink></li>
        <li><NuxtLink :to="localePath('/afrique')" @click="menuOpen = false">{{ t.nav.africa }}</NuxtLink></li>
        <li class="nav-dropdown">
          <NuxtLink :to="localePath('/biographies')" @click="menuOpen = false">{{ t.nav.biographies }}</NuxtLink>
          <ul class="dropdown-menu">
            <li><NuxtLink :to="localePath('/didon')" @click="menuOpen = false">{{ bioLabels.didon }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/hannibal')" @click="menuOpen = false">{{ bioLabels.hannibal }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/hamilcar')" @click="menuOpen = false">{{ bioLabels.hamilcar }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/hasdrubal')" @click="menuOpen = false">{{ bioLabels.hasdrubal }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/magon-barca')" @click="menuOpen = false">{{ bioLabels.magonBarca }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/hannon')" @click="menuOpen = false">{{ bioLabels.hannon }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/magon-agronome')" @click="menuOpen = false">{{ bioLabels.magonAgronome }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/sophonisbe')" @click="menuOpen = false">{{ bioLabels.sophonisbe }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/armee')" @click="menuOpen = false">{{ bioLabels.armee }}</NuxtLink></li>
          </ul>
        </li>
      </ul>

      <div class="navbar-right">
        <div class="lang-switcher">
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            class="lang-btn"
            :class="{ active: locale === loc.code }"
            @click="setLocale(loc.code)"
            :title="loc.label"
          >
            <span class="lang-flag">{{ loc.flag }}</span>
            <span class="lang-code">{{ loc.code.toUpperCase() }}</span>
          </button>
        </div>

        <button class="menu-toggle" @click="menuOpen = !menuOpen">
          <span :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { t, locale, setLocale, localePath, availableLocales } = useI18n()
const isScrolled = ref(false)
const menuOpen = ref(false)

const bioLabels = computed(() => {
  const labels = {
    fr: { didon: 'Didon (Élyssa)', hannibal: 'Hannibal Barca', hamilcar: 'Hamilcar Barca', hasdrubal: 'Hasdrubal Barca', magonBarca: 'Magon Barca', hannon: 'Hannon le Navigateur', magonAgronome: 'Magon l\'Agronome', sophonisbe: 'Sophonisbe', armee: 'L\'Armée Multinationale' },
    en: { didon: 'Dido (Elissa)', hannibal: 'Hannibal Barca', hamilcar: 'Hamilcar Barca', hasdrubal: 'Hasdrubal Barca', magonBarca: 'Magon Barca', hannon: 'Hanno the Navigator', magonAgronome: 'Mago the Agronomist', sophonisbe: 'Sophonisba', armee: 'The Multinational Army' },
    ar: { didon: 'ديدو (إليسا)', hannibal: 'حنبعل برقا', hamilcar: 'حملقار برقا', hasdrubal: 'صدربعل برقا', magonBarca: 'ماغون برقا', hannon: 'حنون الملاح', magonAgronome: 'ماغون المهندس الزراعي', sophonisbe: 'صفنبعل', armee: 'الجيش المتعدد الجنسيات' }
  }
  return labels[locale.value] || labels.fr
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s;
  background: rgba(26, 26, 46, 0.85);
  backdrop-filter: blur(5px);
}

.navbar.scrolled {
  background: rgba(26, 26, 46, 0.97);
  backdrop-filter: blur(10px);
  padding: 0.5rem 0;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--color-gold);
  text-decoration: none;
  flex-shrink: 0;
}

.brand-icon {
  font-size: 1.6rem;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.2rem;
  flex-wrap: nowrap;
}

.nav-links a {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-gold-light);
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s;
  white-space: nowrap;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-gold);
  transition: width 0.3s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--color-gold);
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 100%;
}

/* Dropdown */
.nav-dropdown {
  position: relative;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(26, 26, 46, 0.97);
  backdrop-filter: blur(10px);
  list-style: none;
  min-width: 220px;
  padding: 0.75rem 0;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  z-index: 1001;
  border: 1px solid rgba(201, 168, 76, 0.15);
}

.nav-dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu li {
  padding: 0;
}

.dropdown-menu a {
  display: block;
  padding: 0.5rem 1.2rem !important;
  font-size: 0.7rem !important;
  white-space: nowrap;
}

.dropdown-menu a:hover {
  background: rgba(201, 168, 76, 0.1);
}

/* Language Switcher (inline) */
.lang-switcher {
  display: flex;
  gap: 0.25rem;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.25rem 0.45rem;
  border: 1px solid rgba(201, 168, 76, 0.3);
  border-radius: 4px;
  background: transparent;
  color: var(--color-gold-light);
  cursor: pointer;
  font-size: 0.7rem;
  font-family: var(--font-heading);
  transition: all 0.3s;
}

.lang-btn:hover {
  border-color: var(--color-gold);
  background: rgba(201, 168, 76, 0.1);
}

.lang-btn.active {
  background: var(--color-gold);
  color: var(--color-navy);
  border-color: var(--color-gold);
}

.lang-flag {
  font-size: 0.85rem;
}

.lang-code {
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Hamburger */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 28px;
  height: 22px;
  position: relative;
}

.menu-toggle span,
.menu-toggle span::before,
.menu-toggle span::after {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--color-gold);
  position: absolute;
  transition: all 0.3s;
}

.menu-toggle span { top: 50%; transform: translateY(-50%); }
.menu-toggle span::before { content: ''; top: -8px; }
.menu-toggle span::after { content: ''; top: 8px; }
.menu-toggle span.open { background: transparent; }
.menu-toggle span.open::before { top: 0; transform: rotate(45deg); }
.menu-toggle span.open::after { top: 0; transform: rotate(-45deg); }

@media (max-width: 900px) {
  .menu-toggle { display: block; }
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 75%;
    height: 100vh;
    flex-direction: column;
    background: var(--color-navy);
    padding: 5rem 2rem 2rem;
    gap: 1.5rem;
    transition: right 0.3s;
    z-index: 999;
  }
  .nav-links.open { right: 0; }
  .dropdown-menu {
    position: static;
    display: block;
    transform: none;
    background: rgba(26, 26, 46, 0.5);
    box-shadow: none;
    border: none;
    min-width: auto;
    padding-left: 1rem;
  }
}
</style>
