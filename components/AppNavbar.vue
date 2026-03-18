<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container navbar-inner">
      <NuxtLink to="/" class="navbar-brand">
        <span class="brand-icon">🏛️</span>
        <span class="brand-text">{{ t.siteName }}</span>
      </NuxtLink>

      <div class="navbar-right">
        <LangSwitcher />

        <button class="menu-toggle" @click="menuOpen = !menuOpen" :aria-label="menuOpen ? 'Close' : 'Open'">
          <span :class="{ open: menuOpen }"></span>
        </button>
      </div>

      <ul class="nav-links" :class="{ open: menuOpen }">
        <li><NuxtLink to="/" @click="menuOpen = false">{{ t.nav.home }}</NuxtLink></li>
        <li><NuxtLink to="/chronologie" @click="menuOpen = false">{{ t.nav.timeline }}</NuxtLink></li>
        <li><NuxtLink to="/elephants" @click="menuOpen = false">{{ t.nav.elephants }}</NuxtLink></li>
        <li><NuxtLink to="/economie" @click="menuOpen = false">{{ t.nav.economy }}</NuxtLink></li>
        <li><NuxtLink to="/afrique" @click="menuOpen = false">{{ t.nav.africa }}</NuxtLink></li>
        <li><NuxtLink to="/biographies" @click="menuOpen = false">{{ t.nav.biographies }}</NuxtLink></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
const { t } = useI18n()
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
  background: transparent;
}

.navbar.scrolled {
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(10px);
  padding: 0.6rem 0;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--color-gold);
  text-decoration: none;
}

.brand-icon {
  font-size: 1.8rem;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}

.nav-links a {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-gold-light);
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s;
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

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 24px;
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

.menu-toggle span {
  top: 50%;
  transform: translateY(-50%);
}

.menu-toggle span::before {
  content: '';
  top: -8px;
}

.menu-toggle span::after {
  content: '';
  top: 8px;
}

.menu-toggle span.open {
  background: transparent;
}

.menu-toggle span.open::before {
  top: 0;
  transform: rotate(45deg);
}

.menu-toggle span.open::after {
  top: 0;
  transform: rotate(-45deg);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    flex-direction: column;
    background: var(--color-navy);
    padding: 5rem 2rem 2rem;
    gap: 1.5rem;
    transition: right 0.3s;
  }

  .nav-links.open {
    right: 0;
  }
}
</style>
