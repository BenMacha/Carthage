<template>
  <div>
    <!-- Page Header -->
    <section class="page-hero economy-hero">
      <div class="container">
        <div class="hero-icon">🏺</div>
        <h1 class="page-hero-title">L'Économie Carthaginoise</h1>
        <p class="page-hero-subtitle">Commerce, agriculture et puissance financière d'un empire marchand</p>
      </div>
    </section>

    <!-- Overview -->
    <section class="section">
      <div class="container">
        <div class="intro-text">
          <h2 class="section-title">Une superpuissance économique</h2>
          <p class="lead-text">
            Carthage n'était pas seulement une puissance militaire : c'était avant tout un empire
            commercial. Sa richesse provenait d'un réseau d'échanges qui s'étendait de la Bretagne
            à l'Afrique subsaharienne, des côtes atlantiques à la Mésopotamie. Cette prospérité
            économique a fait de Carthage l'une des villes les plus riches du monde antique.
          </p>
        </div>
      </div>
    </section>

    <!-- Pillars of Economy -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">Les piliers de l'économie</h2>
        <p class="section-subtitle">Les fondements de la prospérité carthaginoise</p>

        <div class="pillars-grid">
          <div v-for="pillar in pillars" :key="pillar.title" class="pillar-card">
            <div class="pillar-icon">{{ pillar.icon }}</div>
            <h3>{{ pillar.title }}</h3>
            <p>{{ pillar.description }}</p>
            <ul>
              <li v-for="item in pillar.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Trade Routes -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Les routes commerciales</h2>
        <p class="section-subtitle">Un réseau d'échanges couvrant trois continents</p>

        <div class="routes-grid">
          <div v-for="route in tradeRoutes" :key="route.destination" class="route-card">
            <div class="route-direction">{{ route.direction }}</div>
            <h3>{{ route.destination }}</h3>
            <div class="route-goods">
              <div class="goods-section">
                <h4>Exportations</h4>
                <div class="goods-tags">
                  <span v-for="g in route.exports" :key="g" class="goods-tag export">{{ g }}</span>
                </div>
              </div>
              <div class="goods-section">
                <h4>Importations</h4>
                <div class="goods-tags">
                  <span v-for="g in route.imports" :key="g" class="goods-tag import">{{ g }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Agriculture -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">L'agriculture scientifique</h2>
        <p class="section-subtitle light">Magon et la révolution agraire carthaginoise</p>

        <div class="agri-content">
          <div class="agri-text">
            <p>
              L'agronome carthaginois <strong>Magon</strong> rédigea un traité d'agriculture en 28 volumes,
              considéré comme le plus important de l'Antiquité. Après la destruction de Carthage en 146 av. J.-C.,
              le Sénat romain ordonna sa traduction en latin — le seul ouvrage carthaginois à bénéficier
              de cet honneur.
            </p>
            <div class="agri-facts">
              <div v-for="fact in agriFacts" :key="fact.title" class="agri-fact">
                <div class="fact-icon">{{ fact.icon }}</div>
                <div>
                  <h4>{{ fact.title }}</h4>
                  <p>{{ fact.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Currency & Finance -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Monnaie et finance</h2>
        <p class="section-subtitle">Le système monétaire carthaginois</p>

        <div class="finance-grid">
          <div class="finance-card">
            <h3>💰 La monnaie carthaginoise</h3>
            <p>
              Carthage a commencé à frapper sa propre monnaie au Ve siècle av. J.-C., relativement tard
              par rapport aux cités grecques. Les premières pièces étaient en électrum (alliage d'or et d'argent),
              puis en or, argent et bronze. Elles représentaient souvent la déesse Tanit, un cheval,
              ou un palmier-dattier.
            </p>
          </div>

          <div class="finance-card">
            <h3>🏦 Le système fiscal</h3>
            <p>
              Carthage tirait ses revenus des droits de douane sur le commerce maritime, des tributs
              des territoires soumis, des mines d'argent et d'or d'Espagne, et des taxes sur l'agriculture.
              Ce système permettait de financer une armée de mercenaires professionnels sans imposer
              de service militaire à ses citoyens.
            </p>
          </div>

          <div class="finance-card">
            <h3>⚖️ Le commerce international</h3>
            <p>
              Les Carthaginois pratiquaient le « commerce silencieux » avec les peuples d'Afrique de l'Ouest :
              ils déposaient leurs marchandises sur une plage, se retiraient, et les locaux venaient déposer
              de l'or en échange. Ce système reposait sur une confiance mutuelle remarquable.
            </p>
          </div>

          <div class="finance-card">
            <h3>🏭 L'industrie</h3>
            <p>
              Carthage était célèbre pour sa production de pourpre tyrienne (extraite du murex),
              sa poterie, sa verrerie et ses textiles. Les ateliers carthaginois produisaient aussi
              des bijoux, des armes et des navires, exportés dans tout le monde méditerranéen.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Numbers -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">Carthage en chiffres</h2>
        <div class="econ-numbers">
          <div v-for="num in econNumbers" :key="num.label" class="econ-number">
            <div class="econ-value">{{ num.value }}</div>
            <div class="econ-label">{{ num.label }}</div>
            <p class="econ-desc">{{ num.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison with Rome -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Carthage vs Rome : deux modèles économiques</h2>
        <div class="comparison-table">
          <div class="comparison-header">
            <div class="comp-label"></div>
            <div class="comp-carthage">🏛️ Carthage</div>
            <div class="comp-rome">🗡️ Rome</div>
          </div>
          <div v-for="comp in comparisons" :key="comp.aspect" class="comparison-row">
            <div class="comp-label">{{ comp.aspect }}</div>
            <div class="comp-carthage">{{ comp.carthage }}</div>
            <div class="comp-rome">{{ comp.rome }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Économie - Carthage & Hannibal'
})

const pillars = [
  {
    icon: '⚓',
    title: 'Commerce maritime',
    description: 'Le cœur de la puissance carthaginoise. Carthage contrôlait les routes commerciales de la Méditerranée occidentale.',
    items: [
      'Monopole sur le commerce de l\'étain (Bretagne, Cornouailles)',
      'Contrôle des détroits et des points de passage stratégiques',
      'Réseau de comptoirs du Maroc à la Libye',
      'Commerce avec les Grecs, les Étrusques et les Phéniciens'
    ]
  },
  {
    icon: '🌾',
    title: 'Agriculture',
    description: 'Les terres fertiles d\'Afrique du Nord faisaient de Carthage le grenier de la Méditerranée.',
    items: [
      'Culture intensive des céréales, olives et vignes',
      'Techniques agricoles avancées décrites par Magon',
      'Grands domaines exploités par une main-d\'œuvre servile',
      'Exportation massive de produits agricoles'
    ]
  },
  {
    icon: '⛏️',
    title: 'Ressources minières',
    description: 'L\'exploitation des mines d\'Espagne fournissait les métaux précieux indispensables.',
    items: [
      'Mines d\'argent de Carthagène (300 kg/jour selon Polybe)',
      'Mines d\'or et de cuivre de la péninsule ibérique',
      'Étain importé des îles Cassitérides (Bretagne)',
      'Financement des guerres puniques grâce aux mines'
    ]
  },
  {
    icon: '🏗️',
    title: 'Artisanat et industrie',
    description: 'Des ateliers réputés dans tout le monde méditerranéen.',
    items: [
      'Production de pourpre tyrienne (teinture de luxe)',
      'Construction navale de pointe (quinquérèmes)',
      'Verrerie, céramique et orfèvrerie',
      'Textiles et tapis exportés vers l\'Orient'
    ]
  }
]

const tradeRoutes = [
  {
    direction: '→ Nord',
    destination: 'Bretagne & Gaule',
    exports: ['Poterie', 'Vin', 'Textiles', 'Bijoux'],
    imports: ['Étain', 'Ambre', 'Fourrures', 'Esclaves']
  },
  {
    direction: '→ Est',
    destination: 'Phénicie & Orient',
    exports: ['Argent', 'Blé', 'Huile d\'olive'],
    imports: ['Encens', 'Épices', 'Soie', 'Ivoire']
  },
  {
    direction: '→ Sud',
    destination: 'Afrique subsaharienne',
    exports: ['Sel', 'Tissus', 'Céramique', 'Perles de verre'],
    imports: ['Or', 'Ivoire', 'Esclaves', 'Animaux exotiques']
  },
  {
    direction: '→ Ouest',
    destination: 'Espagne & Atlantique',
    exports: ['Produits manufacturés', 'Vin'],
    imports: ['Argent', 'Cuivre', 'Mercenaires', 'Chevaux']
  }
]

const agriFacts = [
  {
    icon: '📚',
    title: 'Le traité de Magon',
    description: '28 volumes sur l\'agriculture, traduit en latin sur ordre du Sénat romain après la chute de Carthage.'
  },
  {
    icon: '🫒',
    title: 'Huile d\'olive',
    description: 'Carthage exportait massivement son huile d\'olive, rivalisant avec les productions grecques.'
  },
  {
    icon: '🍷',
    title: 'Viticulture',
    description: 'Les vins carthaginois étaient réputés dans toute la Méditerranée, notamment le passum (vin de raisins secs).'
  },
  {
    icon: '🌿',
    title: 'Irrigation avancée',
    description: 'Systèmes sophistiqués d\'irrigation et de gestion de l\'eau pour maximiser les rendements en zone semi-aride.'
  }
]

const econNumbers = [
  {
    value: '700 000',
    label: 'Population estimée',
    description: 'Habitants de Carthage à son apogée, faisant d\'elle l\'une des plus grandes villes du monde antique'
  },
  {
    value: '300 kg/jour',
    label: 'Production d\'argent',
    description: 'Rendement des mines de Carthagène en Espagne, selon l\'historien Polybe'
  },
  {
    value: '220',
    label: 'Navires de guerre',
    description: 'Taille de la flotte carthaginoise lors de la première guerre punique'
  },
  {
    value: '2 000',
    label: 'Talents d\'argent',
    description: 'Indemnité annuelle imposée par Rome après la deuxième guerre punique (équivalent à des milliards actuels)'
  }
]

const comparisons = [
  {
    aspect: 'Base économique',
    carthage: 'Commerce maritime et agriculture',
    rome: 'Conquête militaire et tributs'
  },
  {
    aspect: 'Armée',
    carthage: 'Mercenaires professionnels',
    rome: 'Citoyens-soldats (légionnaires)'
  },
  {
    aspect: 'Marine',
    carthage: 'Supériorité navale historique',
    rome: 'Marine construite pour rivaliser'
  },
  {
    aspect: 'Gouvernement',
    carthage: 'Oligarchie marchande (Suffètes)',
    rome: 'République aristocratique (Consuls)'
  },
  {
    aspect: 'Monnaie',
    carthage: 'Électrum, or, argent',
    rome: 'Denarius (argent)'
  },
  {
    aspect: 'Richesse',
    carthage: 'Issue du commerce',
    rome: 'Issue de la conquête'
  }
]
</script>

<style scoped>
.economy-hero {
  background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-gold-dark) 60%, var(--color-burgundy-dark) 100%);
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
  color: #ccc;
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

.section-dark {
  background: var(--color-navy);
}

/* Pillars */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.pillar-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.pillar-icon {
  font-size: 2.5rem;
  margin-bottom: 0.8rem;
}

.pillar-card h3 {
  font-size: 1.2rem;
  color: var(--color-navy);
  margin-bottom: 0.6rem;
}

.pillar-card > p {
  color: #555;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.pillar-card ul {
  list-style: none;
  padding: 0;
}

.pillar-card li {
  padding: 0.4rem 0 0.4rem 1.5rem;
  position: relative;
  color: #555;
  font-size: 0.9rem;
}

.pillar-card li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--color-gold);
  font-weight: bold;
}

/* Trade Routes */
.routes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.route-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  border-left: 4px solid var(--color-gold);
}

.route-direction {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--color-burgundy);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.3rem;
}

.route-card h3 {
  font-size: 1.2rem;
  color: var(--color-navy);
  margin-bottom: 1rem;
}

.goods-section {
  margin-bottom: 0.8rem;
}

.goods-section h4 {
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.4rem;
}

.goods-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.goods-tag {
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.goods-tag.export {
  background: #e8f5e9;
  color: #2e7d32;
}

.goods-tag.import {
  background: #e3f2fd;
  color: #1565c0;
}

/* Agriculture */
.agri-content {
  max-width: 800px;
  margin: 0 auto;
}

.agri-text p {
  color: #ccc;
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.agri-text strong {
  color: var(--color-gold);
}

.agri-facts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.agri-fact {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.2rem;
  background: var(--color-navy-light);
  border-radius: 8px;
  border: 1px solid rgba(201, 168, 76, 0.15);
}

.fact-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.agri-fact h4 {
  color: var(--color-gold-light);
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
}

.agri-fact p {
  color: #999 !important;
  font-size: 0.85rem !important;
  margin-bottom: 0 !important;
}

/* Finance */
.finance-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.finance-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.finance-card h3 {
  font-size: 1.1rem;
  color: var(--color-navy);
  margin-bottom: 0.8rem;
}

.finance-card p {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.7;
}

/* Economic Numbers */
.econ-numbers {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.econ-number {
  text-align: center;
  padding: 2rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.econ-value {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-burgundy);
  margin-bottom: 0.3rem;
}

.econ-label {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--color-gold-dark);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.econ-desc {
  color: #777;
  font-size: 0.8rem;
}

/* Comparison Table */
.comparison-table {
  max-width: 900px;
  margin: 2rem auto 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.comparison-header,
.comparison-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
}

.comparison-header {
  background: var(--color-navy);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
}

.comparison-header > div {
  padding: 1rem 1.5rem;
  color: var(--color-gold);
}

.comparison-row {
  background: white;
  border-bottom: 1px solid #eee;
}

.comparison-row:nth-child(even) {
  background: #fafaf5;
}

.comparison-row > div {
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
}

.comp-label {
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--color-navy);
  font-size: 0.85rem;
}

.comp-carthage {
  color: var(--color-burgundy);
}

.comp-rome {
  color: #555;
}

@media (max-width: 768px) {
  .page-hero-title {
    font-size: 2rem;
  }

  .pillars-grid,
  .routes-grid,
  .finance-grid,
  .agri-facts {
    grid-template-columns: 1fr;
  }

  .econ-numbers {
    grid-template-columns: repeat(2, 1fr);
  }

  .comparison-header,
  .comparison-row {
    grid-template-columns: 1fr;
  }

  .comparison-header > div:first-child,
  .comparison-row .comp-label {
    background: var(--color-sand);
    font-weight: 700;
  }
}
</style>
