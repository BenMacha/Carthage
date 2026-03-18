<template>
  <div>
    <!-- Page Header -->
    <section class="page-hero">
      <div class="container">
        <h1 class="page-hero-title">{{ t.timeline.heroTitle }}</h1>
        <p class="page-hero-subtitle">{{ t.timeline.heroSubtitle }}</p>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ t.timeline.mainTitle }}</h2>
        <p class="section-subtitle">{{ t.timeline.mainSubtitle }}</p>

        <div class="timeline">
          <div v-for="(event, index) in t.timeline.events" :key="index" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-date">{{ event.date }}</div>
              <h3 class="timeline-title">{{ event.title }}</h3>
              <p class="timeline-text">{{ event.description }}</p>
              <span v-if="event.tag" class="timeline-tag" :class="event.tagClass">{{ event.tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Periods Overview -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ t.timeline.periodsTitle }}</h2>
        <div class="periods-grid">
          <div v-for="period in t.timeline.periods" :key="period.name" class="period-card">
            <div class="period-era">{{ period.era }}</div>
            <h3>{{ period.name }}</h3>
            <p>{{ period.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n()
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-burgundy-dark) 100%);
  padding: 10rem 0 4rem;
  text-align: center;
}

.page-hero-title {
  font-size: 3rem;
  color: var(--color-gold);
  margin-bottom: 1rem;
  letter-spacing: 3px;
}

.page-hero-subtitle {
  color: #bbb;
  font-size: 1.15rem;
  font-style: italic;
  max-width: 600px;
  margin: 0 auto;
}

.timeline-tag {
  display: inline-block;
  margin-top: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-family: var(--font-heading);
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.tag-green { background: #e8f5e9; color: #2e7d32; }
.tag-blue { background: #e3f2fd; color: #1565c0; }
.tag-red { background: #fce4ec; color: #c62828; }
.tag-purple { background: #f3e5f5; color: #6a1b9a; }
.tag-orange { background: #fff3e0; color: #e65100; }
.tag-gold { background: #fff8e1; color: #8a6f2f; }
.tag-dark { background: #263238; color: #cfd8dc; }

.section-alt {
  background: var(--color-sand);
}

.periods-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.period-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border-left: 4px solid var(--color-gold);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

:global([dir="rtl"]) .period-card {
  border-left: none;
  border-right: 4px solid var(--color-gold);
}

.period-era {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--color-burgundy);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.period-card h3 {
  font-size: 1.2rem;
  color: var(--color-navy);
  margin-bottom: 0.8rem;
}

.period-card p {
  color: #555;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .page-hero-title {
    font-size: 2rem;
  }

  .periods-grid {
    grid-template-columns: 1fr;
  }
}
</style>
