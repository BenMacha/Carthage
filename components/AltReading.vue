<template>
  <aside class="alt" :aria-label="title">
    <div class="alt-thesis">
      <span class="alt-badge">{{ badge }}</span>
      <h3 class="alt-title">{{ title }}</h3>
      <p v-for="(p, i) in thesis" :key="i" class="alt-p">{{ p }}</p>
    </div>
    <div class="alt-answer">
      <span class="kicker">{{ answerTitle }}</span>
      <ul>
        <li v-for="(a, i) in answer" :key="i">{{ a }}</li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
// Encadré « Une autre lecture » : une interprétation de l'auteur du site, présentée
// comme telle, suivie de ce qu'en disent les sources antiques et l'archéologie.
defineProps({
  badge: { type: String, required: true },
  title: { type: String, required: true },
  thesis: { type: Array, required: true },
  answerTitle: { type: String, required: true },
  answer: { type: Array, required: true }
})
</script>

<style scoped>
.alt {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: var(--gap);
  margin-top: var(--gap);
}

.alt-thesis {
  border: 2px dashed var(--gold);
  border-radius: var(--r-xl);
  padding: var(--pad-xl);
  background: #FBF4E6;
}

.alt-badge {
  display: inline-block;
  font: 700 12px/1 var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: var(--gold);
  color: var(--ink);
  border-radius: 999px;
  padding: 8px 12px;
}

[dir="rtl"] .alt-badge { letter-spacing: 0; }

.alt-title {
  font: 800 clamp(24px, 2.6vw, 36px)/1.02 var(--font-display);
  letter-spacing: -0.02em;
  margin: 18px 0 14px;
}

.alt-p {
  font: 400 clamp(15px, 1.2vw, 17px)/1.6 var(--font-body);
  color: var(--gold-ink);
  margin: 0 0 10px;
}

.alt-answer {
  background: var(--white);
  border-radius: var(--r-xl);
  padding: var(--pad-lg);
}

.alt-answer ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alt-answer li {
  position: relative;
  padding-inline-start: 20px;
  font: 400 14px/1.5 var(--font-body);
  color: var(--muted);
}

.alt-answer li::before {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  top: 0.5em;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--purple);
}

@media (max-width: 960px) {
  .alt { grid-template-columns: minmax(0, 1fr); }
}
</style>
