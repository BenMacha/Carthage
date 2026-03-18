<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <h1 class="hero-title">Carthage</h1>
        <p class="hero-subtitle">La puissance méditerranéenne qui a défié Rome</p>
        <p class="hero-desc">
          De sa fondation légendaire par la reine Didon en 814 av. J.-C. à la marche
          épique d'Hannibal à travers les Alpes, découvrez l'histoire d'une des plus
          grandes civilisations de l'Antiquité.
        </p>
        <div class="hero-buttons">
          <NuxtLink to="/chronologie" class="btn btn-primary">Explorer la chronologie</NuxtLink>
          <NuxtLink to="/elephants" class="btn btn-outline">La traversée des Alpes</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Introduction -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Une civilisation extraordinaire</h2>
        <p class="section-subtitle">Plus de sept siècles d'histoire, de commerce et de conquêtes</p>

        <div class="intro-grid">
          <div class="intro-card">
            <div class="intro-icon">⚓</div>
            <h3>Maîtres de la mer</h3>
            <p>Les Carthaginois ont bâti la plus puissante flotte de la Méditerranée occidentale, contrôlant les routes commerciales de la Sicile à l'Espagne et au-delà des Colonnes d'Hercule.</p>
          </div>
          <div class="intro-card">
            <div class="intro-icon">⚔️</div>
            <h3>Guerriers légendaires</h3>
            <p>Hannibal Barca reste l'un des plus grands stratèges militaires de l'histoire. Sa traversée des Alpes avec des éléphants de guerre demeure un exploit inégalé.</p>
          </div>
          <div class="intro-card">
            <div class="intro-icon">💰</div>
            <h3>Empire commercial</h3>
            <p>Le commerce carthaginois s'étendait de la Bretagne à l'Afrique de l'Ouest. Leurs réseaux d'échanges ont façonné l'économie du monde antique.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Figures -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">Figures marquantes</h2>
        <p class="section-subtitle light">Les héros qui ont forgé l'histoire de Carthage</p>

        <div class="figures-grid">
          <div class="figure-card">
            <div class="figure-header">
              <span class="figure-era">814 av. J.-C.</span>
            </div>
            <div class="card-body">
              <h3>Didon (Élyssa)</h3>
              <p>Princesse phénicienne de Tyr, fondatrice légendaire de Carthage. Selon la tradition, elle acheta aux Libyens autant de terre qu'une peau de bœuf pouvait couvrir, puis découpa celle-ci en fines lanières pour entourer la colline de Byrsa.</p>
            </div>
          </div>

          <div class="figure-card">
            <div class="figure-header">
              <span class="figure-era">275–228 av. J.-C.</span>
            </div>
            <div class="card-body">
              <h3>Hamilcar Barca</h3>
              <p>Général carthaginois et père d'Hannibal. Il mena la résistance contre Rome lors de la première guerre punique et conquit une grande partie de l'Espagne, posant les bases de la puissance des Barcides.</p>
            </div>
          </div>

          <div class="figure-card">
            <div class="figure-header">
              <span class="figure-era">247–183 av. J.-C.</span>
            </div>
            <div class="card-body">
              <h3>Hannibal Barca</h3>
              <p>Le plus célèbre des généraux carthaginois. Il traversa les Alpes avec ses éléphants et infligea à Rome ses plus grandes défaites : Trébie, Lac Trasimène et Cannes. Considéré comme l'un des plus grands tacticiens de l'histoire.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Explorez l'histoire</h2>
        <div class="explore-grid">
          <NuxtLink to="/chronologie" class="explore-card">
            <div class="explore-icon">📜</div>
            <h3>Chronologie historique</h3>
            <p>De la fondation en 814 av. J.-C. à la destruction en 146 av. J.-C.</p>
          </NuxtLink>

          <NuxtLink to="/elephants" class="explore-card">
            <div class="explore-icon">🐘</div>
            <h3>La traversée des Alpes</h3>
            <p>L'exploit militaire le plus audacieux de l'Antiquité</p>
          </NuxtLink>

          <NuxtLink to="/economie" class="explore-card">
            <div class="explore-icon">🏺</div>
            <h3>L'économie carthaginoise</h3>
            <p>Commerce, agriculture et puissance financière</p>
          </NuxtLink>

          <NuxtLink to="/afrique" class="explore-card">
            <div class="explore-icon">🌍</div>
            <h3>L'Afrique et son nom</h3>
            <p>Comment Carthage a donné son nom au continent africain</p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

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
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.explore-card {
  text-align: center;
  padding: 3rem 2rem;
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
