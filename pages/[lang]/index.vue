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
          <NuxtLink :to="localePath('/chronologie')" class="btn btn-primary">{{ t.home.btnTimeline }}</NuxtLink>
          <NuxtLink :to="localePath('/elephants')" class="btn btn-outline">{{ t.home.btnElephants }}</NuxtLink>
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

    <!-- Interactive Map -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ mapTitle }}</h2>
        <p class="section-subtitle">{{ mapSubtitle }}</p>
        <ClientOnly>
          <MapsCarthageMap :lang="locale" />
        </ClientOnly>
      </div>
    </section>

    <!-- 3D Animated Harbor Scene -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ harborTitle }}</h2>
        <p class="section-subtitle">{{ harborSubtitle }}</p>
        <ClientOnly>
          <AnimationsCarthageHarbor :title="harborLabel" :subtitle="harborLabelSub" />
        </ClientOnly>
      </div>
    </section>

    <!-- Animated Warship -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ warshipTitle }}</h2>
        <p class="section-subtitle light">{{ warshipSubtitle }}</p>
        <ClientOnly>
          <AnimationsPunicWarship :title="warshipLabel" :subtitle="warshipLabelSub" />
        </ClientOnly>
      </div>
    </section>

    <!-- Historical Images Gallery -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ galleryTitle }}</h2>
        <div class="gallery-grid">
          <div class="gallery-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Carthage_ruins_of_city_near_sea.jpg/800px-Carthage_ruins_of_city_near_sea.jpg" alt="Ruines de Carthage" loading="lazy" />
            <p>{{ galleryCaptions[0] }}</p>
          </div>
          <div class="gallery-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Heinrich_Leutemann_-_Hannibal%27s_Campaign_in_Italy_-_Crossing_the_Alps.jpg/800px-Heinrich_Leutemann_-_Hannibal%27s_Campaign_in_Italy_-_Crossing_the_Alps.jpg" alt="Hannibal traversant les Alpes" loading="lazy" />
            <p>{{ galleryCaptions[1] }}</p>
          </div>
          <div class="gallery-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ruins_of_Antonine_Baths_Carthage.jpg/800px-Ruins_of_Antonine_Baths_Carthage.jpg" alt="Thermes d'Antonin" loading="lazy" />
            <p>{{ galleryCaptions[2] }}</p>
          </div>
          <div class="gallery-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Francisco_de_Goya_y_Lucientes_-_Hannibal_the_Conqueror_Viewing_Italy_from_the_Alps.jpg/800px-Francisco_de_Goya_y_Lucientes_-_Hannibal_the_Conqueror_Viewing_Italy_from_the_Alps.jpg" alt="Hannibal — Goya" loading="lazy" />
            <p>{{ galleryCaptions[3] }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ t.home.exploreTitle }}</h2>
        <div class="explore-grid">
          <NuxtLink :to="localePath('/chronologie')" class="explore-card">
            <div class="explore-icon">📜</div>
            <h3>{{ t.home.exploreTimeline }}</h3>
            <p>{{ t.home.exploreTimelineDesc }}</p>
          </NuxtLink>

          <NuxtLink :to="localePath('/elephants')" class="explore-card">
            <div class="explore-icon">🐘</div>
            <h3>{{ t.home.exploreElephants }}</h3>
            <p>{{ t.home.exploreElephantsDesc }}</p>
          </NuxtLink>

          <NuxtLink :to="localePath('/economie')" class="explore-card">
            <div class="explore-icon">🏺</div>
            <h3>{{ t.home.exploreEconomy }}</h3>
            <p>{{ t.home.exploreEconomyDesc }}</p>
          </NuxtLink>

          <NuxtLink :to="localePath('/afrique')" class="explore-card">
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
const { t, locale, localePath } = useI18n()

const mapTitle = computed(() => ({
  fr: 'Carte interactive de l\'Empire carthaginois',
  en: 'Interactive Map of the Carthaginian Empire',
  ar: 'خريطة تفاعلية للإمبراطورية القرطاجية'
}[locale.value] || 'Carte interactive'))

const mapSubtitle = computed(() => ({
  fr: 'Territoires, villes, routes commerciales, zones agricoles et industries',
  en: 'Territories, cities, trade routes, agricultural zones and industries',
  ar: 'الأراضي والمدن والطرق التجارية والمناطق الزراعية والصناعات'
}[locale.value] || ''))

const galleryTitle = computed(() => ({
  fr: 'Galerie historique',
  en: 'Historical Gallery',
  ar: 'معرض تاريخي'
}[locale.value] || 'Galerie'))

const harborTitle = computed(() => ({
  fr: 'Le Port Légendaire',
  en: 'The Legendary Harbor',
  ar: 'الميناء الأسطوري'
}[locale.value] || 'Le Port Légendaire'))

const harborSubtitle = computed(() => ({
  fr: 'Le double port de Carthage — merveille d\'ingénierie antique',
  en: 'The twin harbors of Carthage — a marvel of ancient engineering',
  ar: 'الميناء المزدوج لقرطاج — أعجوبة هندسية قديمة'
}[locale.value] || ''))

const harborLabel = computed(() => ({
  fr: 'Port de Carthage',
  en: 'Harbor of Carthage',
  ar: 'ميناء قرطاج'
}[locale.value] || 'Port de Carthage'))

const harborLabelSub = computed(() => ({
  fr: 'Cothon — Le double port légendaire',
  en: 'Cothon — The legendary twin harbor',
  ar: 'الكوثون — الميناء المزدوج الأسطوري'
}[locale.value] || ''))

const warshipTitle = computed(() => ({
  fr: 'La Puissance Navale',
  en: 'Naval Power',
  ar: 'القوة البحرية'
}[locale.value] || 'La Puissance Navale'))

const warshipSubtitle = computed(() => ({
  fr: 'Les quinquérèmes qui dominaient la Méditerranée',
  en: 'The quinqueremes that dominated the Mediterranean',
  ar: 'السفن الخماسية التي سيطرت على البحر المتوسط'
}[locale.value] || ''))

const warshipLabel = computed(() => ({
  fr: 'Quinquérème Punique',
  en: 'Punic Quinquereme',
  ar: 'سفينة خماسية بونيقية'
}[locale.value] || 'Quinquérème Punique'))

const warshipLabelSub = computed(() => ({
  fr: 'La puissance navale de Carthage',
  en: 'The naval power of Carthage',
  ar: 'القوة البحرية لقرطاج'
}[locale.value] || ''))

const galleryCaptions = computed(() => {
  const c = {
    fr: [
      'Ruines de Carthage au bord de la Méditerranée — Tunisie',
      'Hannibal traversant les Alpes — Heinrich Leutemann, XIXe siècle',
      'Thermes d\'Antonin à Carthage — Site UNESCO',
      'Hannibal contemplant l\'Italie depuis les Alpes — Francisco de Goya',
    ],
    en: [
      'Ruins of Carthage by the Mediterranean — Tunisia',
      'Hannibal crossing the Alps — Heinrich Leutemann, 19th century',
      'Antonine Baths at Carthage — UNESCO site',
      'Hannibal viewing Italy from the Alps — Francisco de Goya',
    ],
    ar: [
      'أطلال قرطاج على ضفاف المتوسط — تونس',
      'حنبعل يعبر جبال الألب — هاينريش لويتمان، القرن التاسع عشر',
      'حمامات أنطونيوس في قرطاج — موقع يونسكو',
      'حنبعل يتأمل إيطاليا من جبال الألب — فرانسيسكو دي غويا',
    ]
  }
  return c[locale.value] || c.fr
})
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
  .explore-grid,
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}

.section-alt {
  background: var(--color-sand);
}

/* Gallery */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.gallery-item {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: white;
}

.gallery-item img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
}

.gallery-item p {
  padding: 0.8rem 1rem;
  font-size: 0.85rem;
  color: #666;
  text-align: center;
  font-style: italic;
}
</style>
