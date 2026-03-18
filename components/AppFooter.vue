<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-section">
          <h3>🏛️ Carthage</h3>
          <p>Un projet dédié à la mémoire et à l'histoire de la grande civilisation carthaginoise, de ses héros et de son héritage.</p>
        </div>
        <div class="footer-section">
          <h4>Explorer</h4>
          <ul>
            <li><NuxtLink to="/chronologie">Chronologie</NuxtLink></li>
            <li><NuxtLink to="/elephants">Passage des Éléphants</NuxtLink></li>
            <li><NuxtLink to="/economie">Économie</NuxtLink></li>
            <li><NuxtLink to="/afrique">Afrique & son nom</NuxtLink></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Époques</h4>
          <ul>
            <li>Fondation (814 av. J.-C.)</li>
            <li>Guerres Puniques</li>
            <li>Hannibal Barca</li>
            <li>Chute de Carthage</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Projet éducatif — Carthage & Hannibal Barca</p>
      </div>
    </div>
  </footer>
</template>

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
