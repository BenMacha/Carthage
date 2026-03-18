<template>
  <div>
    <!-- Page Header -->
    <section class="page-hero africa-hero">
      <div class="container">
        <div class="hero-icon">🌍</div>
        <h1 class="page-hero-title">L'Afrique et Carthage</h1>
        <p class="page-hero-subtitle">Comment le continent africain a tiré son nom de la terre de Carthage</p>
      </div>
    </section>

    <!-- Origin of the Name -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">L'origine du nom « Afrique »</h2>
        <p class="section-subtitle">Un nom aux racines carthaginoises et berbères</p>

        <div class="origin-content">
          <div class="origin-main">
            <p class="lead-text">
              Le nom « Afrique » trouve ses origines dans la région de Carthage. Pour les Romains,
              <strong>Africa</strong> désignait initialement la province romaine créée après la destruction
              de Carthage en 146 av. J.-C., correspondant à l'actuelle Tunisie et à la Libye occidentale.
              Ce n'est que progressivement que ce nom s'est étendu à l'ensemble du continent.
            </p>
          </div>

          <div class="theories-grid">
            <div v-for="theory in nameTheories" :key="theory.title" class="theory-card">
              <div class="theory-origin">{{ theory.origin }}</div>
              <h3>{{ theory.title }}</h3>
              <p>{{ theory.description }}</p>
              <div class="theory-detail">{{ theory.detail }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline of the Name -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">L'évolution du nom à travers les siècles</h2>

        <div class="timeline">
          <div v-for="(event, index) in nameTimeline" :key="index" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-date">{{ event.date }}</div>
              <h3 class="timeline-title">{{ event.title }}</h3>
              <p class="timeline-text">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Africa Before Carthage -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">L'Afrique du Nord avant Carthage</h2>
        <p class="section-subtitle">Les peuples et civilisations qui ont précédé les Phéniciens</p>

        <div class="peoples-grid">
          <div v-for="people in ancientPeoples" :key="people.name" class="people-card">
            <div class="people-icon">{{ people.icon }}</div>
            <h3>{{ people.name }}</h3>
            <div class="people-period">{{ people.period }}</div>
            <p>{{ people.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Carthage's African Identity -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">L'identité africaine de Carthage</h2>
        <p class="section-subtitle light">Carthage, creuset de cultures méditerranéennes et africaines</p>

        <div class="identity-grid">
          <div v-for="aspect in identityAspects" :key="aspect.title" class="identity-card">
            <div class="identity-icon">{{ aspect.icon }}</div>
            <h3>{{ aspect.title }}</h3>
            <p>{{ aspect.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- African Legacy -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">L'héritage carthaginois en Afrique</h2>
        <p class="section-subtitle">Ce que Carthage a légué au continent</p>

        <div class="legacy-grid">
          <div v-for="legacy in legacyItems" :key="legacy.title" class="legacy-card">
            <h3>{{ legacy.icon }} {{ legacy.title }}</h3>
            <p>{{ legacy.description }}</p>
            <ul>
              <li v-for="item in legacy.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Facts -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">Le saviez-vous ?</h2>

        <div class="facts-grid">
          <div v-for="fact in funFacts" :key="fact.title" class="fact-card">
            <div class="fact-icon">{{ fact.icon }}</div>
            <h3>{{ fact.title }}</h3>
            <p>{{ fact.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'L\'Afrique et Carthage - Origine du nom'
})

const nameTheories = [
  {
    origin: 'Théorie berbère',
    title: 'Les Afri / Ifri',
    description: 'Le nom proviendrait des Afri (ou Aourigha), un peuple berbère vivant près de Carthage. Le mot berbère « ifri » signifie « grotte » ou « caverne », faisant référence aux habitations troglodytes de ces populations.',
    detail: 'Cette théorie est la plus largement acceptée par les historiens. Les Afri étaient les voisins immédiats de Carthage, et les Romains auraient étendu leur nom à toute la région.'
  },
  {
    origin: 'Théorie phénicienne',
    title: 'Afar — « poussière »',
    description: 'En phénicien, la langue de Carthage, le mot « afar » (𐤏𐤐𐤓) signifie « poussière » ou « terre ». L\'Africa serait donc simplement « la terre », « le pays ».',
    detail: 'Cette étymologie fait écho au paysage semi-aride de la Tunisie intérieure, que les Phéniciens auraient découvert en s\'installant sur les côtes.'
  },
  {
    origin: 'Théorie latine',
    title: 'Aprica — « ensoleillée »',
    description: 'Le mot latin « aprica » signifie « exposée au soleil ». Certains érudits romains, dont Isidore de Séville, ont proposé cette étymologie pour expliquer le climat chaud de la région.',
    detail: 'Bien que séduisante, cette théorie est aujourd\'hui considérée comme une étymologie populaire plutôt que scientifique.'
  },
  {
    origin: 'Théorie grecque',
    title: 'Aphrike — « sans froid »',
    description: 'Du grec « a-phrike » (ἀ-φρίκη), signifiant « sans froid » ou « sans frisson ». Les Grecs auraient nommé ainsi cette terre chaude par opposition à leur climat.',
    detail: 'Cette théorie est mentionnée par Léon l\'Africain au XVIe siècle, mais elle reste minoritaire parmi les spécialistes.'
  }
]

const nameTimeline = [
  {
    date: 'Avant 814 av. J.-C.',
    title: 'La terre des Afri',
    description: 'Les Berbères Afri habitent la région de l\'actuelle Tunisie. Leur nom désigne un peuple local, pas un continent. Les Égyptiens appellent ces terres « Tehenou » ou « Temehou ».'
  },
  {
    date: '814 av. J.-C.',
    title: 'Fondation de Carthage',
    description: 'Les Phéniciens fondent Carthage en territoire Afri. La coexistence entre Carthaginois et Berbères crée une culture hybride unique. Les Grecs appellent la région « Libye ».'
  },
  {
    date: '264–146 av. J.-C.',
    title: 'Les Guerres Puniques',
    description: 'Rome entre en contact direct avec la terre des Afri à travers ses guerres contre Carthage. Les Romains adoptent le terme « Afer » (singulier) pour désigner les habitants de la région.'
  },
  {
    date: '146 av. J.-C.',
    title: 'Création de la province d\'Africa',
    description: 'Après la destruction de Carthage, Rome crée la province d\'Africa Proconsularis sur le territoire carthaginois. C\'est la première utilisation officielle du nom « Africa » comme entité administrative.'
  },
  {
    date: 'Ier siècle ap. J.-C.',
    title: 'Extension du nom',
    description: 'Les géographes romains comme Pline l\'Ancien et Pomponius Mela commencent à utiliser « Africa » pour désigner l\'ensemble du continent, distinguant l\'Africa propria (Tunisie) de l\'Africa au sens large.'
  },
  {
    date: 'VIIe siècle',
    title: 'Ifriqiya arabe',
    description: 'Les conquérants arabes adoptent le nom sous la forme « Ifriqiya » (إفريقية) pour désigner la Tunisie et l\'est de l\'Algérie, perpétuant directement le nom latin Africa.'
  },
  {
    date: 'XVe–XVIe siècle',
    title: 'Le continent entier',
    description: 'Avec les grandes explorations, les cartographes européens étendent définitivement le nom « Africa » à l\'ensemble du continent, de la Méditerranée au Cap de Bonne-Espérance.'
  }
]

const ancientPeoples = [
  {
    icon: '🏔️',
    name: 'Les Berbères (Imazighen)',
    period: 'Depuis la préhistoire',
    description: 'Peuple autochtone d\'Afrique du Nord, les Berbères occupent le Maghreb depuis des millénaires. Leur civilisation est attestée par des gravures rupestres datant de 12 000 ans. Ils sont les ancêtres des Amazighs actuels.'
  },
  {
    icon: '👑',
    name: 'Les Royaumes numides',
    period: 'IVe–Ier siècle av. J.-C.',
    description: 'Les Numides (actuelle Algérie) étaient des cavaliers d\'élite. Les rois Massinissa et Jugurtha ont joué un rôle crucial dans les guerres puniques. La cavalerie numide était l\'arme secrète de Carthage puis de Rome.'
  },
  {
    icon: '🐎',
    name: 'Les Garamantes',
    period: 'Ier millénaire av. J.-C.',
    description: 'Peuple du Fezzan (Libye actuelle), les Garamantes ont bâti une civilisation prospère au cœur du Sahara grâce à des systèmes d\'irrigation souterrains (foggaras). Ils contrôlaient le commerce transsaharien.'
  },
  {
    icon: '⚱️',
    name: 'Les Capsiens',
    period: '10 000–6 000 av. J.-C.',
    description: 'Culture préhistorique d\'Afrique du Nord (nommée d\'après Gafsa en Tunisie), les Capsiens sont considérés comme les ancêtres probables des Berbères. Ils ont laissé d\'importants sites archéologiques.'
  }
]

const identityAspects = [
  {
    icon: '🤝',
    title: 'Fusion des cultures',
    description: 'Carthage était un creuset unique mêlant traditions phéniciennes orientales et cultures berbères locales. Les mariages mixtes étaient courants, et la culture punique qui en résulta était distinctement africaine.'
  },
  {
    icon: '🙏',
    title: 'Religions syncrétiques',
    description: 'Les divinités carthaginoises (Tanit, Baal Hammon) sont un mélange de dieux phéniciens et de divinités locales libyques. Le culte de Tanit, en particulier, semble avoir des racines africaines profondes.'
  },
  {
    icon: '🗣️',
    title: 'Langue punique',
    description: 'Le punique, dérivé du phénicien, est resté parlé en Afrique du Nord jusqu\'au Ve siècle ap. J.-C. Saint Augustin, lui-même Berbère romanisé, témoigne de sa persistance dans les campagnes.'
  },
  {
    icon: '🏗️',
    title: 'Architecture',
    description: 'L\'urbanisme carthaginois intégrait des éléments architecturaux locaux. Les immeubles de Carthage, hauts de 6 étages, étaient uniques dans le monde antique et reflétaient les contraintes du site africain.'
  },
  {
    icon: '⚔️',
    title: 'Armée multi-ethnique',
    description: 'L\'armée carthaginoise était composée de soldats de toute l\'Afrique : Numides, Libyens, Maures, et même des guerriers subsahariens. Cette diversité reflétait l\'ancrage africain de l\'empire.'
  },
  {
    icon: '🌾',
    title: 'Savoir-faire agricole',
    description: 'Les techniques agricoles carthaginoises combinaient le savoir phénicien avec les connaissances locales des sols et du climat africain, créant une agriculture parmi les plus productives de l\'Antiquité.'
  }
]

const legacyItems = [
  {
    icon: '📛',
    title: 'Le nom du continent',
    description: 'L\'héritage le plus durable de Carthage est sans doute le nom même du continent africain, qui provient de la terre où s\'élevait la cité punique.',
    items: [
      'Africa (latin) → Ifriqiya (arabe) → Afrique (français)',
      'Le nom a voyagé de la Tunisie au continent entier en 2 000 ans',
      'Toutes les langues du monde utilisent une forme dérivée de ce nom'
    ]
  },
  {
    icon: '🚢',
    title: 'L\'exploration africaine',
    description: 'Les Carthaginois ont été parmi les premiers à explorer les côtes africaines.',
    items: [
      'Hannon le Navigateur a exploré la côte ouest de l\'Afrique (Ve siècle av. J.-C.)',
      'Il aurait atteint le golfe de Guinée, voire le Cameroun',
      'Son périple est le plus ancien récit d\'exploration de l\'Afrique occidentale'
    ]
  },
  {
    icon: '🏙️',
    title: 'L\'urbanisme nord-africain',
    description: 'Carthage a posé les fondations de l\'urbanisation en Afrique du Nord.',
    items: [
      'Réseau de villes puniques de la Tunisie au Maroc',
      'Modèle urbain repris par les Romains puis les Arabes',
      'Techniques de construction adaptées au climat africain'
    ]
  },
  {
    icon: '🌿',
    title: 'L\'agriculture africaine',
    description: 'Les techniques agricoles carthaginoises ont transformé l\'Afrique du Nord.',
    items: [
      'Introduction de l\'oléiculture intensive',
      'Développement de l\'irrigation en zone semi-aride',
      'Le traité de Magon a influencé l\'agriculture romaine en Afrique'
    ]
  }
]

const funFacts = [
  {
    icon: '📖',
    title: 'Saint Augustin et le punique',
    description: 'Saint Augustin d\'Hippone (354–430), l\'un des pères de l\'Église, était un Berbère romanisé d\'Afrique du Nord. Il rapporte que le punique était encore parlé dans les campagnes de son époque, soit 500 ans après la chute de Carthage.'
  },
  {
    icon: '🗺️',
    title: 'Ifriqiya',
    description: 'Le mot arabe « Ifriqiya » (إفريقية), utilisé pour désigner la Tunisie médiévale, est la transcription directe du latin « Africa ». C\'est la preuve vivante que le nom n\'a jamais été oublié dans la région.'
  },
  {
    icon: '🏛️',
    title: 'Carthage romaine',
    description: 'Après sa destruction, Carthage a été refondée par les Romains sous Jules César en 46 av. J.-C. Elle est redevenue l\'une des plus grandes villes de l\'Empire, capitale de la province d\'Africa.'
  },
  {
    icon: '🌊',
    title: 'Le Périple d\'Hannon',
    description: 'Vers 500 av. J.-C., Hannon le Navigateur carthaginois a mené une expédition de 60 navires et 30 000 colons le long de la côte atlantique africaine. Il décrit des « gorilles » (probablement des chimpanzés) et des volcans en éruption.'
  },
  {
    icon: '🏺',
    title: 'Carthage = Tunisie',
    description: 'Le site archéologique de Carthage se trouve aujourd\'hui dans la banlieue nord de Tunis, capitale de la Tunisie. Il est classé au patrimoine mondial de l\'UNESCO depuis 1979.'
  },
  {
    icon: '✊',
    title: 'Fierté africaine',
    description: 'Hannibal Barca est considéré comme un héros africain. Né à Carthage (Tunisie), il a mené une armée multi-ethnique africaine contre la plus grande puissance européenne de son temps.'
  }
]
</script>

<style scoped>
.africa-hero {
  background: linear-gradient(135deg, var(--color-navy) 0%, #1a3a2e 50%, var(--color-burgundy-dark) 100%);
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

.origin-content {
  max-width: 900px;
  margin: 0 auto;
}

.origin-main {
  text-align: center;
  margin-bottom: 3rem;
}

.lead-text {
  font-size: 1.15rem;
  color: #444;
  line-height: 1.9;
}

.lead-text strong {
  color: var(--color-burgundy);
}

.section-alt {
  background: var(--color-sand);
}

.section-dark {
  background: var(--color-navy);
}

/* Theories */
.theories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.theory-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  border-top: 4px solid var(--color-gold);
}

.theory-origin {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: var(--color-burgundy);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 0.5rem;
}

.theory-card h3 {
  font-size: 1.2rem;
  color: var(--color-navy);
  margin-bottom: 0.8rem;
}

.theory-card > p {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.theory-detail {
  padding: 0.8rem 1rem;
  background: var(--color-sand-light);
  border-radius: 8px;
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
  border-left: 3px solid var(--color-gold);
}

/* Peoples */
.peoples-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.people-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.people-icon {
  font-size: 2.5rem;
  margin-bottom: 0.8rem;
}

.people-card h3 {
  font-size: 1.1rem;
  color: var(--color-navy);
  margin-bottom: 0.3rem;
}

.people-period {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--color-burgundy);
  margin-bottom: 0.8rem;
}

.people-card p {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.7;
}

/* Identity */
.identity-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.identity-card {
  padding: 2rem;
  background: var(--color-navy-light);
  border-radius: 12px;
  border: 1px solid rgba(201, 168, 76, 0.15);
  transition: border-color 0.3s;
}

.identity-card:hover {
  border-color: var(--color-gold);
}

.identity-icon {
  font-size: 2rem;
  margin-bottom: 0.8rem;
}

.identity-card h3 {
  color: var(--color-gold);
  font-size: 1rem;
  margin-bottom: 0.6rem;
}

.identity-card p {
  color: #999;
  font-size: 0.85rem;
  line-height: 1.7;
}

/* Legacy */
.legacy-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.legacy-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  border-left: 4px solid var(--color-gold);
}

.legacy-card h3 {
  font-size: 1.1rem;
  color: var(--color-navy);
  margin-bottom: 0.6rem;
}

.legacy-card > p {
  color: #555;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.legacy-card ul {
  list-style: none;
  padding: 0;
}

.legacy-card li {
  padding: 0.3rem 0 0.3rem 1.5rem;
  position: relative;
  color: #555;
  font-size: 0.85rem;
}

.legacy-card li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--color-gold);
  font-weight: bold;
}

/* Fun Facts */
.facts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.fact-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  text-align: center;
}

.fact-icon {
  font-size: 2.5rem;
  margin-bottom: 0.8rem;
}

.fact-card h3 {
  font-size: 1rem;
  color: var(--color-navy);
  margin-bottom: 0.6rem;
}

.fact-card p {
  color: #555;
  font-size: 0.85rem;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .page-hero-title {
    font-size: 2rem;
  }

  .theories-grid,
  .peoples-grid,
  .legacy-grid {
    grid-template-columns: 1fr;
  }

  .identity-grid,
  .facts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
