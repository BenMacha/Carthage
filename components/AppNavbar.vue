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
        <li><NuxtLink :to="localePath('/biographies')" @click="menuOpen = false">{{ t.nav.biographies }}</NuxtLink></li>
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
}
</style>
