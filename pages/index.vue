<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <h1 class="hero-title">{{ t.home.heroTitle }}</h1>
        <p class="hero-subtitle">{{ t.home.heroSubtitle }}</p>
        <p class="hero-desc">{{ t.home.heroDesc }}</p>
        <div class="hero-buttons">
          <NuxtLink to="/chronologie" class="btn btn-primary">{{ t.home.btnTimeline }}</NuxtLink>
          <NuxtLink to="/elephants" class="btn btn-outline">{{ t.home.btnElephants }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Introduction -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ t.home.introTitle }}</h2>
        <p class="section-subtitle">{{ t.home.introSubtitle }}</p>

        <div class="intro-grid">
          <div class="intro-card">
            <div class="intro-icon">⚓</div>
            <h3>{{ t.home.card1Title }}</h3>
            <p>{{ t.home.card1Text }}</p>
          </div>
          <div class="intro-card">
            <div class="intro-icon">⚔️</div>
            <h3>{{ t.home.card2Title }}</h3>
            <p>{{ t.home.card2Text }}</p>
          </div>
          <div class="intro-card">
            <div class="intro-icon">💰</div>
            <h3>{{ t.home.card3Title }}</h3>
            <p>{{ t.home.card3Text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Figures -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ t.home.figuresTitle }}</h2>
        <p class="section-subtitle light">{{ t.home.figuresSubtitle }}</p>

        <div class="figures-grid">
          <div class="figure-card">
            <div class="figure-header">
              <span class="figure-era">{{ t.home.didonEra }}</span>
            </div>
            <div class="card-body">
              <h3>{{ t.home.didonName }}</h3>
              <p>{{ t.home.didonDesc }}</p>
            </div>
          </div>

          <div class="figure-card">
            <div class="figure-header">
              <span class="figure-era">{{ t.home.hamilcarEra }}</span>
            </div>
            <div class="card-body">
              <h3>{{ t.home.hamilcarName }}</h3>
              <p>{{ t.home.hamilcarDesc }}</p>
            </div>
          </div>

          <div class="figure-card">
            <div class="figure-header">
              <span class="figure-era">{{ t.home.hannibalEra }}</span>
            </div>
            <div class="card-body">
              <h3>{{ t.home.hannibalName }}</h3>
              <p>{{ t.home.hannibalDesc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ t.home.exploreTitle }}</h2>
        <div class="explore-grid">
          <NuxtLink to="/chronologie" class="explore-card">
            <div class="explore-icon">📜</div>
            <h3>{{ t.home.exploreTimeline }}</h3>
            <p>{{ t.home.exploreTimelineDesc }}</p>
          </NuxtLink>

          <NuxtLink to="/elephants" class="explore-card">
            <div class="explore-icon">🐘</div>
            <h3>{{ t.home.exploreElephants }}</h3>
            <p>{{ t.home.exploreElephantsDesc }}</p>
          </NuxtLink>

          <NuxtLink to="/economie" class="explore-card">
            <div class="explore-icon">🏺</div>
            <h3>{{ t.home.exploreEconomy }}</h3>
            <p>{{ t.home.exploreEconomyDesc }}</p>
          </NuxtLink>

          <NuxtLink to="/afrique" class="explore-card">
            <div class="explore-icon">🌍</div>
            <h3>{{ t.home.exploreAfrica }}</h3>
            <p>{{ t.home.exploreAfricaDesc }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n()
</script>

<style scoped>
/* Hero */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-burgundy-dark) 50%, var(--color-navy-light) 100%);
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.hero-content {
  position: relative;
  text-align: center;
  color: white;
  padding: 2rem;
}

.hero-title {
  font-size: 5rem;
  font-weight: 900;
  color: var(--color-gold);
  text-shadow: 0 4px 30px rgba(201, 168, 76, 0.3);
  margin-bottom: 1rem;
  letter-spacing: 8px;
  text-transform: uppercase;
}

.hero-subtitle {
  font-size: 1.4rem;
  color: var(--color-gold-light);
  font-style: italic;
  margin-bottom: 1.5rem;
}

.hero-desc {
  max-width: 700px;
  margin: 0 auto 2.5rem;
  font-size: 1.1rem;
  color: #ccc;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Intro Grid */
.intro-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.intro-card {
  text-align: center;
  padding: 2.5rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s;
}

.intro-card:hover {
  transform: translateY(-5px);
}

.intro-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.intro-card h3 {
  font-size: 1.2rem;
  color: var(--color-burgundy-dark);
  margin-bottom: 0.8rem;
}

.intro-card p {
  color: #555;
  font-size: 0.95rem;
}

/* Dark Section */
.section-dark {
  background: var(--color-navy);
}

.section-title.light {
  color: var(--color-gold);
}

.section-title.light::after {
  background: linear-gradient(to right, var(--color-gold-dark), var(--color-gold));
}

.section-subtitle.light {
  color: #999;
}

/* Figures Grid */
.figures-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.figure-card {
  background: var(--color-navy-light);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(201, 168, 76, 0.2);
  transition: border-color 0.3s, transform 0.3s;
}

.figure-card:hover {
  border-color: var(--color-gold);
  transform: translateY(-3px);
}

.figure-header {
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, var(--color-burgundy-dark), var(--color-burgundy));
}

.figure-era {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--color-gold-light);
  letter-spacing: 1px;
}

.figure-card .card-body {
  padding: 1.5rem;
}

.figure-card h3 {
  color: var(--color-gold);
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
}

.figure-card p {
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.7;
}

/* Explore Grid */
.explore-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.explore-card {
  text-align: center;
  padding: 3rem 1.5rem;
  background: white;
  border-radius: 12px;
  border: 2px solid transparent;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  text-decoration: none;
}

.explore-card:hover {
  border-color: var(--color-gold);
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(201, 168, 76, 0.15);
}

.explore-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.explore-card h3 {
  font-size: 1.1rem;
  color: var(--color-burgundy-dark);
  margin-bottom: 0.5rem;
}

.explore-card p {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
    letter-spacing: 4px;
  }

  .intro-grid,
  .figures-grid,
  .explore-grid {
    grid-template-columns: 1fr;
  }
}
</style>
