<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-section">
          <h3>🏛️ {{ t.siteName }}</h3>
          <p>{{ t.footer.description }}</p>
        </div>
        <div class="footer-section">
          <h4>{{ t.footer.explore }}</h4>
          <ul>
            <li><NuxtLink :to="localePath('/chronologie')">{{ t.footer.timeline }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/elephants')">{{ t.footer.elephantPassage }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/economie')">{{ t.footer.economy }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/afrique')">{{ t.footer.africa }}</NuxtLink></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>{{ t.footer.periods }}</h4>
          <ul>
            <li><NuxtLink :to="localePath('/fondation')">{{ t.footer.founding }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/guerres-puniques')">{{ t.footer.punicWars }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/hannibal')">{{ t.footer.hannibal }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/prise-de-carthage')">{{ t.footer.fall }}</NuxtLink></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>{{ t.footer.copyright }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { t, localePath } = useI18n()
</script>

<style scoped>
.footer {
  background: var(--color-navy);
  color: var(--color-text-light);
  padding: 4rem 0 1.5rem;
  margin-top: 4rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
}

.footer-section h3 {
  font-family: var(--font-heading);
  color: var(--color-gold);
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.footer-section h4 {
  font-family: var(--font-heading);
  color: var(--color-gold-light);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.footer-section p {
  color: #999;
  font-size: 0.9rem;
  line-height: 1.7;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #888;
}

.footer-section ul a {
  color: #999;
  transition: color 0.3s;
}

.footer-section ul a:hover {
  color: var(--color-gold);
}

.footer-bottom {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: 0.85rem;
  color: #666;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
