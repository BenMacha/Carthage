<template>
  <div>
    <!-- Page Header -->
    <section class="page-hero">
      <div class="container">
        <h1 class="page-hero-title">Chronologie de Carthage</h1>
        <p class="page-hero-subtitle">Sept siècles d'histoire, de la fondation phénicienne à la chute face à Rome</p>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Les grandes dates</h2>
        <p class="section-subtitle">L'ascension et la chute d'un empire méditerranéen</p>

        <div class="timeline">
          <div v-for="(event, index) in events" :key="index" class="timeline-item">
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
        <h2 class="section-title">Les grandes périodes</h2>
        <div class="periods-grid">
          <div v-for="period in periods" :key="period.name" class="period-card">
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
useHead({
  title: 'Chronologie - Carthage & Hannibal'
})

const events = [
  {
    date: '814 av. J.-C.',
    title: 'Fondation de Carthage',
    description: 'La princesse phénicienne Didon (Élyssa), fuyant Tyr après l\'assassinat de son époux Sychée par son frère Pygmalion, fonde Carthage (Qart Hadasht — « Ville Nouvelle ») sur la côte de l\'actuelle Tunisie. La colline de Byrsa devient le cœur de la cité.',
    tag: 'Fondation',
    tagClass: 'tag-green'
  },
  {
    date: 'VIIe siècle av. J.-C.',
    title: 'Expansion coloniale',
    description: 'Carthage établit des comptoirs commerciaux en Sardaigne, en Sicile occidentale, aux Baléares et sur les côtes de l\'Afrique du Nord. La cité devient la principale puissance phénicienne en Méditerranée occidentale.',
    tag: 'Expansion',
    tagClass: 'tag-blue'
  },
  {
    date: '535 av. J.-C.',
    title: 'Bataille d\'Alalia',
    description: 'Alliance entre Carthage et les Étrusques contre les Grecs de Phocée en Corse. Cette victoire navale établit la domination carthaginoise sur la Méditerranée occidentale et limite l\'expansion grecque.',
    tag: 'Bataille',
    tagClass: 'tag-red'
  },
  {
    date: '509 av. J.-C.',
    title: 'Premier traité avec Rome',
    description: 'Carthage et la jeune République romaine signent un traité de commerce et de non-agression, délimitant leurs zones d\'influence respectives. Rome reconnaît la suprématie maritime de Carthage.',
    tag: 'Diplomatie',
    tagClass: 'tag-purple'
  },
  {
    date: '480 av. J.-C.',
    title: 'Bataille d\'Himère',
    description: 'Hamilcar Ier est vaincu par les Grecs de Syracuse en Sicile. Cet échec majeur marque une pause dans l\'expansion carthaginoise en Sicile et provoque des réformes politiques à Carthage.',
    tag: 'Bataille',
    tagClass: 'tag-red'
  },
  {
    date: '310 av. J.-C.',
    title: 'Agathocle envahit l\'Afrique',
    description: 'Le tyran de Syracuse, Agathocle, débarque en Afrique et menace directement Carthage. Bien que finalement repoussé, cette invasion révèle la vulnérabilité du territoire carthaginois.',
    tag: 'Guerre',
    tagClass: 'tag-red'
  },
  {
    date: '264–241 av. J.-C.',
    title: 'Première Guerre Punique',
    description: 'Premier grand conflit entre Rome et Carthage pour le contrôle de la Sicile. Après 23 ans de guerre navale et terrestre, Carthage perd la Sicile, la Sardaigne et la Corse. Rome devient une puissance maritime.',
    tag: 'Guerre Punique',
    tagClass: 'tag-red'
  },
  {
    date: '241–238 av. J.-C.',
    title: 'Guerre des Mercenaires',
    description: 'Les mercenaires impayés se révoltent contre Carthage dans une guerre brutale. Hamilcar Barca parvient à les écraser après trois ans de combats acharnés, consolidant la puissance de la famille des Barcides.',
    tag: 'Guerre civile',
    tagClass: 'tag-orange'
  },
  {
    date: '237–228 av. J.-C.',
    title: 'Conquête de l\'Espagne par Hamilcar',
    description: 'Hamilcar Barca part conquérir la péninsule ibérique pour compenser les pertes territoriales. Il fonde Akra Leukê et soumet de nombreuses tribus. Son fils Hannibal, âgé de 9 ans, l\'accompagne et jure haine éternelle à Rome.',
    tag: 'Conquête',
    tagClass: 'tag-blue'
  },
  {
    date: '221 av. J.-C.',
    title: 'Hannibal prend le commandement',
    description: 'Après la mort d\'Hasdrubal le Beau, Hannibal Barca, âgé de 26 ans, est proclamé commandant en chef des forces carthaginoises en Espagne par acclamation de l\'armée.',
    tag: 'Commandement',
    tagClass: 'tag-gold'
  },
  {
    date: '219 av. J.-C.',
    title: 'Siège de Sagonte',
    description: 'Hannibal assiège et prend Sagonte, cité alliée de Rome sur la côte espagnole. Cet acte déclenche la Deuxième Guerre Punique, le plus grand conflit de l\'Antiquité.',
    tag: 'Guerre Punique',
    tagClass: 'tag-red'
  },
  {
    date: '218 av. J.-C.',
    title: 'Traversée des Alpes',
    description: 'Hannibal quitte l\'Espagne avec environ 50 000 fantassins, 9 000 cavaliers et 37 éléphants de guerre. Il franchit les Pyrénées, traverse le sud de la Gaule, puis accomplit l\'exploit de traverser les Alpes en 15 jours pour envahir l\'Italie.',
    tag: 'Exploit militaire',
    tagClass: 'tag-gold'
  },
  {
    date: '218 av. J.-C.',
    title: 'Batailles du Tessin et de la Trébie',
    description: 'Hannibal remporte ses premières victoires en Italie. Au Tessin, il défait la cavalerie romaine de Scipion. À la Trébie, il écrase deux légions romaines grâce à une embuscade magistrale.',
    tag: 'Victoire',
    tagClass: 'tag-green'
  },
  {
    date: '217 av. J.-C.',
    title: 'Bataille du Lac Trasimène',
    description: 'La plus grande embuscade de l\'histoire militaire. Hannibal attire l\'armée romaine de Flaminius dans un piège au bord du lac. 15 000 Romains sont tués, dont le consul lui-même. Rome est en état de choc.',
    tag: 'Victoire',
    tagClass: 'tag-green'
  },
  {
    date: '216 av. J.-C.',
    title: 'Bataille de Cannes',
    description: 'Le chef-d\'œuvre tactique d\'Hannibal. Avec une armée inférieure en nombre, il encercle et anéantit 8 légions romaines (environ 50 000 à 70 000 morts). Cette manœuvre en double enveloppement est encore étudiée dans les académies militaires.',
    tag: 'Chef-d\'œuvre tactique',
    tagClass: 'tag-gold'
  },
  {
    date: '207 av. J.-C.',
    title: 'Défaite d\'Hasdrubal au Métaure',
    description: 'Hasdrubal Barca, frère d\'Hannibal, tente de le rejoindre en Italie avec des renforts depuis l\'Espagne. Il est intercepté et tué à la bataille du Métaure. Les Romains lancent sa tête dans le camp d\'Hannibal.',
    tag: 'Défaite',
    tagClass: 'tag-red'
  },
  {
    date: '202 av. J.-C.',
    title: 'Bataille de Zama',
    description: 'Scipion l\'Africain envahit l\'Afrique et force Hannibal à rentrer défendre Carthage. À Zama, les tactiques d\'Hannibal sont retournées contre lui. Carthage perd la guerre et doit accepter des conditions de paix humiliantes.',
    tag: 'Défaite décisive',
    tagClass: 'tag-red'
  },
  {
    date: '149–146 av. J.-C.',
    title: 'Troisième Guerre Punique',
    description: 'Malgré le respect des conditions de paix, Rome, poussée par Caton l\'Ancien et son célèbre « Carthago delenda est », déclare la guerre. Après trois ans de siège, Scipion Émilien prend Carthage.',
    tag: 'Guerre Punique',
    tagClass: 'tag-red'
  },
  {
    date: '146 av. J.-C.',
    title: 'Destruction de Carthage',
    description: 'La ville est rasée après six jours d\'incendie. Les survivants sont vendus en esclavage. Selon la légende, les Romains répandent du sel sur les ruines. Sept siècles de civilisation carthaginoise s\'achèvent.',
    tag: 'Fin',
    tagClass: 'tag-dark'
  }
]

const periods = [
  {
    era: '814–550 av. J.-C.',
    name: 'Période archaïque',
    description: 'Fondation et croissance de la cité. Carthage passe d\'un simple comptoir phénicien à la métropole dominante de la Méditerranée occidentale, établissant un vaste réseau de colonies et de comptoirs commerciaux.'
  },
  {
    era: '550–264 av. J.-C.',
    name: 'Âge d\'or',
    description: 'Apogée de la puissance carthaginoise. Domination navale incontestée, guerres contre les Grecs de Sicile, développement d\'une agriculture scientifique et d\'un commerce à l\'échelle continentale.'
  },
  {
    era: '264–201 av. J.-C.',
    name: 'Les Guerres Puniques',
    description: 'L\'affrontement titanesque entre Carthage et Rome pour la domination de la Méditerranée. Période marquée par l\'épopée d\'Hannibal Barca et ses campagnes légendaires en Italie.'
  },
  {
    era: '201–146 av. J.-C.',
    name: 'Déclin et destruction',
    description: 'Après la défaite de Zama, Carthage est réduite à une puissance locale. Malgré une renaissance économique, la cité est finalement détruite par Rome en 146 av. J.-C.'
  }
]
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
