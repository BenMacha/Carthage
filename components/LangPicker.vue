<template>
  <div ref="rootEl" class="lp" :class="{ open }">
    <button
      class="lp-btn"
      :aria-expanded="open"
      aria-haspopup="true"
      :aria-label="`${label} : ${current.name}`"
      @click="open = !open"
    >
      <FlagIcon :code="current.flag" />
      <span class="lp-code">{{ current.code.toUpperCase() }}</span>
      <span class="lp-caret" aria-hidden="true">▾</span>
    </button>
    <div v-if="open" class="lp-panel" role="menu" :aria-label="label">
      <button
        v-for="l in LOCALES"
        :key="l.code"
        role="menuitemradio"
        :aria-checked="l.code === locale"
        class="lp-item"
        :class="{ on: l.code === locale }"
        :lang="l.code"
        :dir="l.dir"
        @click="choose(l.code)"
      >
        <FlagIcon :code="l.flag" />
        <span class="lp-name">{{ l.name }}</span>
        <span v-if="l.beta" class="lp-beta">β</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import LOCALES from '~/i18n/locales.json'

defineProps({
  label: { type: String, default: 'Langue' }
})

const { locale, setLocale } = useI18n()
const open = ref(false)
const rootEl = ref(null)

const current = computed(() => LOCALES.find(l => l.code === locale.value) || LOCALES[0])

function choose (code) {
  open.value = false
  setLocale(code)
}

const onDoc = (e) => { if (open.value && rootEl.value && !rootEl.value.contains(e.target)) open.value = false }
const onKey = (e) => { if (e.key === 'Escape') open.value = false }
onMounted(() => { document.addEventListener('click', onDoc); document.addEventListener('keydown', onKey) })
onBeforeUnmount(() => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey) })
</script>

<style scoped>
.lp { position: relative; }

.lp-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  background: var(--paper);
  color: var(--ink);
  font: 700 13px/1 var(--font-body);
  cursor: pointer;
}

.lp-btn:hover, .lp.open .lp-btn { background: var(--sand); }
.lp-caret { font-size: 11px; opacity: 0.7; }

.lp-panel {
  position: absolute;
  top: calc(100% + 8px);
  inset-inline-end: 0;
  z-index: 50;
  width: min(440px, calc(100vw - 24px));
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4px;
  padding: 8px;
  background: var(--white);
  border-radius: 22px;
  box-shadow: 0 16px 40px rgba(22, 19, 15, 0.16);
  animation: lp-in 0.15s ease-out;
}

@keyframes lp-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }

.lp-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 10px;
  border: 0;
  border-radius: 14px;
  background: transparent;
  color: var(--ink);
  font: 500 14px/1.2 var(--font-body);
  text-align: start;
  cursor: pointer;
}

.lp-item:hover { background: var(--paper); }
.lp-item.on { background: var(--ink); color: var(--white); }
.lp-item[dir="rtl"] .lp-name { font-family: var(--font-ar); font-size: 15px; }
.lp-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.lp-beta {
  font: 700 11px/1 var(--font-body);
  color: var(--purple);
  background: var(--purple-soft);
  border-radius: 999px;
  padding: 3px 6px;
}

.lp-item.on .lp-beta { background: rgba(255, 255, 255, 0.2); color: var(--white); }

@media (max-width: 640px) {
  .lp-code, .lp-caret { display: none; }
  .lp-btn { width: 44px; padding: 0; justify-content: center; }
  .lp-panel { grid-template-columns: repeat(2, minmax(0, 1fr)); position: fixed; top: calc(env(safe-area-inset-top, 0px) + 76px); inset-inline: 12px; width: auto; }
}
</style>
