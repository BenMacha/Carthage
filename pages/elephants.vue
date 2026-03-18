<template>
  <div>
    <!-- Page Header -->
    <section class="page-hero elephants-hero">
      <div class="container">
        <div class="hero-icon">🐘</div>
        <h1 class="page-hero-title">La Traversée des Alpes</h1>
        <p class="page-hero-subtitle">L'exploit le plus audacieux de l'histoire militaire antique</p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="section">
      <div class="container">
        <div class="intro-text">
          <h2 class="section-title">218 av. J.-C. — L'impossible devient réalité</h2>
          <p class="lead-text">
            En automne 218 av. J.-C., Hannibal Barca accomplit ce que les Romains croyaient impossible :
            traverser les Alpes avec une armée entière, incluant 37 éléphants de guerre, pour envahir
            l'Italie par le nord. Cette marche de plus de 1 600 kilomètres depuis Carthagène reste
            l'un des exploits logistiques et militaires les plus extraordinaires de l'histoire.
          </p>
        </div>
      </div>
    </section>

    <!-- The Journey -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">Les étapes de la traversée</h2>
        <p class="section-subtitle">Du départ d'Espagne à l'arrivée en Italie</p>

        <div class="journey-timeline">
          <div v-for="(step, index) in journeySteps" :key="index" class="journey-step">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <div class="step-location">{{ step.location }}</div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div v-if="step.stats" class="step-stats">
                <div v-for="stat in step.stats" :key="stat.label" class="stat">
                  <span class="stat-value">{{ stat.value }}</span>
                  <span class="stat-label">{{ stat.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Elephants Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Les éléphants de guerre</h2>
        <p class="section-subtitle">L'arme psychologique ultime de Carthage</p>

        <div class="elephants-grid">
          <div class="elephant-card">
            <div class="elephant-icon">🏷️</div>
            <h3>L'éléphant d'Afrique du Nord</h3>
            <p>
              Les éléphants utilisés par Carthage étaient probablement des éléphants d'Afrique du Nord
              (Loxodonta africana pharaonensis), une sous-espèce aujourd'hui éteinte, plus petite que
              l'éléphant de savane africain. Ils mesuraient environ 2,5 mètres au garrot.
            </p>
          </div>

          <div class="elephant-card">
            <div class="elephant-icon">⚔️</div>
            <h3>Rôle au combat</h3>
            <p>
              Les éléphants servaient principalement d'arme psychologique. Leur charge terrorisait
              la cavalerie ennemie et les chevaux non habitués à leur présence. Chaque éléphant portait
              un cornac (mahout) et parfois une tour avec des archers.
            </p>
          </div>

          <div class="elephant-card">
            <div class="elephant-icon">❄️</div>
            <h3>L'épreuve des Alpes</h3>
            <p>
              Sur les 37 éléphants partis d'Espagne, la plupart survécurent à la traversée des Alpes,
              mais beaucoup périrent durant le premier hiver en Italie. Seul Surus (« le Syrien »),
              l'éléphant personnel d'Hannibal, aurait survécu jusqu'aux dernières campagnes.
            </p>
          </div>

          <div class="elephant-card">
            <div class="elephant-icon">🏛️</div>
            <h3>Héritage culturel</h3>
            <p>
              L'image d'Hannibal et de ses éléphants traversant les Alpes est devenue l'un des symboles
              les plus puissants de l'Antiquité. Les monnaies carthaginoises et les pièces des Barcides
              en Espagne représentent fréquemment des éléphants.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Numbers -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">La traversée en chiffres</h2>
        <div class="numbers-grid">
          <div class="number-card" v-for="num in keyNumbers" :key="num.label">
            <div class="number-value">{{ num.value }}</div>
            <div class="number-label">{{ num.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Battles After -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Les victoires en Italie</h2>
        <p class="section-subtitle">Les batailles qui suivirent la traversée</p>

        <div class="battles-grid">
          <div v-for="battle in battles" :key="battle.name" class="battle-card">
            <div class="battle-date">{{ battle.date }}</div>
            <h3>{{ battle.name }}</h3>
            <p>{{ battle.description }}</p>
            <div class="battle-result" :class="battle.resultClass">{{ battle.result }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'La Traversée des Alpes - Carthage & Hannibal'
})

const journeySteps = [
  {
    location: 'Carthagène, Espagne',
    title: 'Le départ (Printemps 218 av. J.-C.)',
    description: 'Hannibal quitte Carthagène (Qart Hadasht) avec une armée massive : environ 90 000 fantassins, 12 000 cavaliers et 37 éléphants de guerre. Il laisse son frère Hasdrubal pour défendre l\'Espagne.',
    stats: [
      { value: '90 000', label: 'Fantassins' },
      { value: '12 000', label: 'Cavaliers' },
      { value: '37', label: 'Éléphants' }
    ]
  },
  {
    location: 'Pyrénées',
    title: 'Franchissement des Pyrénées',
    description: 'La traversée des Pyrénées nécessite de soumettre ou de négocier avec les tribus locales. Hannibal laisse 11 000 soldats ibériques retourner chez eux plutôt que de forcer des troupes réticentes à poursuivre.',
    stats: [
      { value: '50 000', label: 'Fantassins restants' },
      { value: '9 000', label: 'Cavaliers restants' }
    ]
  },
  {
    location: 'Sud de la Gaule',
    title: 'Traversée du Rhône',
    description: 'La traversée du Rhône est un défi logistique majeur, surtout pour les éléphants. Hannibal fait construire de grands radeaux et ruse pour traverser en envoyant une force en amont pour attaquer les Gaulois par l\'arrière.',
    stats: [
      { value: '4 jours', label: 'Pour traverser' },
      { value: '37', label: 'Éléphants traversent' }
    ]
  },
  {
    location: 'Les Alpes',
    title: 'L\'ascension (Octobre 218 av. J.-C.)',
    description: 'L\'ascension dure 9 jours. Les troupes font face aux embuscades des tribus alpines, aux chutes de pierres, aux chemins étroits et au froid glacial. Les éléphants souffrent particulièrement du terrain escarpé.',
  },
  {
    location: 'Col alpin',
    title: 'Le passage du col',
    description: 'Au sommet, Hannibal montre à ses troupes épuisées la plaine du Pô en contrebas et prononce un discours pour raviver leur moral. La descente s\'avère encore plus dangereuse que la montée, avec des sentiers verglacés.',
  },
  {
    location: 'Plaine du Pô, Italie',
    title: 'L\'arrivée en Italie',
    description: 'Après 15 jours de traversée alpine, l\'armée atteint la plaine du Pô. Les pertes sont considérables mais Hannibal a réussi l\'impossible : envahir l\'Italie par voie terrestre, prenant les Romains totalement par surprise.',
    stats: [
      { value: '26 000', label: 'Survivants' },
      { value: '15', label: 'Jours dans les Alpes' },
      { value: '~50%', label: 'Pertes totales' }
    ]
  }
]

const keyNumbers = [
  { value: '1 600 km', label: 'Distance parcourue depuis Carthagène' },
  { value: '37', label: 'Éléphants de guerre au départ' },
  { value: '5 mois', label: 'Durée totale de la marche' },
  { value: '15 jours', label: 'Traversée des Alpes' },
  { value: '26 000', label: 'Soldats survivants à l\'arrivée' },
  { value: '~2 500 m', label: 'Altitude du col franchi' }
]

const battles = [
  {
    date: 'Novembre 218 av. J.-C.',
    name: 'Bataille du Tessin',
    description: 'Premier affrontement avec les Romains. La cavalerie numide d\'Hannibal met en déroute la cavalerie de Publius Cornelius Scipion, qui est blessé. Son fils de 17 ans, le futur Scipion l\'Africain, lui sauve la vie.',
    result: 'Victoire carthaginoise',
    resultClass: 'result-victory'
  },
  {
    date: 'Décembre 218 av. J.-C.',
    name: 'Bataille de la Trébie',
    description: 'Hannibal attire les légions romaines de Sempronius dans un piège. En plein hiver, il les force à traverser la rivière gelée avant de les attaquer. Son frère Magon, caché avec 2 000 hommes, attaque par l\'arrière.',
    result: 'Victoire écrasante',
    resultClass: 'result-victory'
  },
  {
    date: 'Juin 217 av. J.-C.',
    name: 'Bataille du Lac Trasimène',
    description: 'La plus grande embuscade de l\'histoire militaire. Hannibal attire l\'armée du consul Flaminius dans un défilé entre le lac et les collines. En trois heures, 15 000 Romains sont tués et 6 000 capturés.',
    result: 'Victoire décisive',
    resultClass: 'result-victory'
  },
  {
    date: 'Août 216 av. J.-C.',
    name: 'Bataille de Cannes',
    description: 'Chef-d\'œuvre absolu de tactique militaire. Avec 50 000 hommes contre 86 000 Romains, Hannibal réalise un double enveloppement parfait. Entre 50 000 et 70 000 Romains périssent, dont 80 sénateurs.',
    result: 'Chef-d\'œuvre tactique',
    resultClass: 'result-masterpiece'
  }
]
</script>

<style scoped>
.elephants-hero {
  background: linear-gradient(135deg, var(--color-navy) 0%, #2d1b0e 60%, var(--color-burgundy-dark) 100%);
  padding: 10rem 0 4rem;
  text-align: center;
}

.hero-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
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

.intro-text {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.lead-text {
  font-size: 1.15rem;
  color: #444;
  line-height: 1.9;
}

.section-alt {
  background: var(--color-sand);
}

/* Journey Timeline */
.journey-timeline {
  max-width: 800px;
  margin: 0 auto;
}

.journey-step {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  align-items: flex-start;
}

.step-number {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--color-burgundy), var(--color-burgundy-dark));
  color: var(--color-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 700;
}

.step-content {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  flex: 1;
}

.step-location {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--color-burgundy);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.3rem;
}

.step-content h3 {
  font-size: 1.15rem;
  color: var(--color-navy);
  margin-bottom: 0.6rem;
}

.step-content p {
  color: #555;
  font-size: 0.95rem;
}

.step-stats {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-burgundy);
}

.stat-label {
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Elephants Grid */
.elephants-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.elephant-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  border-top: 3px solid var(--color-gold);
}

.elephant-icon {
  font-size: 2rem;
  margin-bottom: 0.8rem;
}

.elephant-card h3 {
  font-size: 1.1rem;
  color: var(--color-navy);
  margin-bottom: 0.8rem;
}

.elephant-card p {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.7;
}

/* Numbers */
.section-dark {
  background: var(--color-navy);
}

.numbers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.number-card {
  text-align: center;
  padding: 2rem;
  background: var(--color-navy-light);
  border-radius: 12px;
  border: 1px solid rgba(201, 168, 76, 0.2);
}

.number-value {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--color-gold);
  margin-bottom: 0.3rem;
}

.number-label {
  color: #999;
  font-size: 0.9rem;
}

/* Battles */
.battles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.battle-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.battle-date {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--color-burgundy);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.battle-card h3 {
  font-size: 1.2rem;
  color: var(--color-navy);
  margin-bottom: 0.8rem;
}

.battle-card p {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.battle-result {
  display: inline-block;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.result-victory {
  background: #e8f5e9;
  color: #2e7d32;
}

.result-masterpiece {
  background: #fff8e1;
  color: var(--color-gold-dark);
}

@media (max-width: 768px) {
  .page-hero-title {
    font-size: 2rem;
  }

  .journey-step {
    flex-direction: column;
    gap: 1rem;
  }

  .elephants-grid,
  .numbers-grid,
  .battles-grid {
    grid-template-columns: 1fr;
  }

  .step-stats {
    flex-wrap: wrap;
  }
}
</style>
