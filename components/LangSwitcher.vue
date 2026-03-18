<template>
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
</template>

<script setup>
const { locale, setLocale, availableLocales } = useI18n()
</script>

<style scoped>
.lang-switcher {
  display: flex;
  gap: 0.3rem;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.5rem;
  border: 1px solid rgba(201, 168, 76, 0.3);
  border-radius: 6px;
  background: transparent;
  color: var(--color-gold-light);
  cursor: pointer;
  font-size: 0.75rem;
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
  font-size: 0.9rem;
}

.lang-code {
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>
