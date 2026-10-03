<template>
  <div class="pg">
    <!-- Héros -->
    <div class="hero">
      <figure class="hero-fig">
        <img src="/img/ruins.jpg" :alt="c.hero.alt" fetchpriority="high">
        <div class="hero-shade" aria-hidden="true" />
        <figcaption class="hero-cap">
          <div>
            <div class="hero-cap-kick">{{ c.hero.capKick }}</div>
            <div class="hero-cap-title">{{ c.hero.capTitle }}</div>
          </div>
          <NuxtLink :to="localePath('/carte')" class="hero-pill">{{ c.hero.visit }}</NuxtLink>
        </figcaption>
      </figure>

      <div class="tile tile--xl tile--purple hero-tile">
        <div class="hero-mark phoen" aria-hidden="true">𐤒</div>
        <div class="hero-top">
          <div class="phoen hero-phoen"><span dir="rtl" lang="phn">𐤒𐤓𐤕𐤇𐤃𐤔𐤕</span></div>
          <span class="chip chip--glass">{{ c.hero.chip }}</span>
        </div>
        <div class="hero-bottom">
          <h1 class="h-display hero-h1">{{ c.hero.title }}</h1>
          <p class="hero-lede">{{ c.hero.lede }}</p>
          <div class="hero-ctas">
            <NuxtLink :to="localePath('/chronologie')" class="btn btn-outline">{{ c.hero.cta1 }}</NuxtLink>
            <NuxtLink :to="localePath('/elephants')" class="btn btn-ghost">{{ c.hero.cta2 }}</NuxtLink>
          </div>
        </div>
      </div>

      <NuxtLink
        v-for="d in c.dates"
        :key="d.num"
        :to="localePath(d.to)"
        class="tile dt"
        :class="d.cls"
      >
        <div class="dt-img" :style="{ background: d.bg }">
          <img :src="d.img" :alt="d.alt" :style="{ objectPosition: d.pos || '50% 50%' }">
        </div>
        <div class="dt-body">
          <span class="dt-kick">{{ d.kick }}</span>
          <div>
            <div class="dt-num">{{ d.num }}</div>
            <p class="dt-text">{{ d.text }}</p>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Sept siècles en chiffres -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <div class="tile tile--xl tile--ink tile--stack intro">
          <div>
            <span class="kicker">{{ c.intro.kicker }}</span>
            <h2 class="h-block">{{ c.intro.title }}</h2>
          </div>
          <p class="body-lg">{{ c.intro.text }}</p>
        </div>
        <div class="nums">
          <div v-for="n in c.nums" :key="n.num" class="tile tile--stack num-tile" :class="n.cls">
            <span class="kicker">{{ n.kick }}</span>
            <div>
              <div class="num">{{ n.num }}</div>
              <p class="body num-text">{{ n.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Une civilisation extraordinaire -->
    <section class="sec">
      <div class="sec-head head-pad">
        <h2 class="h-section big-title">{{ c.civ.title }}</h2>
        <p>{{ c.civ.aside }}</p>
      </div>
      <div class="cols cols-3 cols--flush">
        <NuxtLink v-for="k in c.civ.items" :key="k.title" :to="localePath(k.to)" class="civ" :class="k.cls">
          <img :src="k.img" :alt="k.alt" loading="lazy">
          <div class="civ-body">
            <div class="civ-head">
              <h3 class="civ-title">{{ k.title }}</h3>
              <span class="phoen civ-glyph" aria-hidden="true">{{ k.glyph }}</span>
            </div>
            <p>{{ k.text }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Au musée -->
    <section class="sec">
      <div class="tile tile--xl museum">
        <div class="sec-head museum-head">
          <div>
            <span class="kicker">{{ c.museum.kicker }}</span>
            <h2 class="h-section">{{ c.museum.title }}</h2>
          </div>
          <div class="car-nav">
            <button
              type="button"
              class="car-btn"
              :aria-label="c.museum.prev"
              aria-controls="museum-track"
              :disabled="atStart"
              @click="slide(-1)"
            >
              <span aria-hidden="true">{{ isRtl ? '→' : '←' }}</span>
            </button>
            <button
              type="button"
              class="car-btn car-btn--on"
              :aria-label="c.museum.next"
              aria-controls="museum-track"
              :disabled="atEnd"
              @click="slide(1)"
            >
              <span aria-hidden="true">{{ isRtl ? '←' : '→' }}</span>
            </button>
          </div>
        </div>
        <div
          id="museum-track"
          ref="track"
          class="track"
          role="region"
          tabindex="0"
          :aria-label="c.museum.title"
          @scroll.passive="updateEdges"
        >
          <figure v-for="o in c.museum.items" :key="o.img" class="obj">
            <div class="obj-img">
              <img :src="o.img" :alt="o.alt" loading="lazy" :style="{ objectPosition: o.pos || '50% 50%' }">
            </div>
            <figcaption>
              <div class="obj-name">{{ o.name }}</div>
              <div class="obj-meta">{{ o.meta }}</div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- Carte animée -->
    <section class="sec">
      <div class="sec-head head-pad">
        <div>
          <span class="kicker">{{ c.map.kicker }}</span>
          <h2 class="h-section">{{ c.map.title }}</h2>
        </div>
        <NuxtLink :to="localePath('/carte')" class="btn btn-outline">{{ c.map.more }}</NuxtLink>
      </div>
      <MapsAnimatedMap compact initial-mode="terr" />
    </section>

    <!-- Figures marquantes -->
    <section class="sec">
      <div class="sec-head head-pad">
        <h2 class="h-section big-title">{{ c.figures.title }}</h2>
        <NuxtLink :to="localePath('/biographies')" class="btn btn-dark">{{ c.figures.all }}</NuxtLink>
      </div>
      <div class="people">
        <NuxtLink
          v-for="p in c.figures.items"
          :key="p.to"
          :to="localePath(p.to)"
          class="card-img person"
          :class="{ 'person--ink': p.ink }"
        >
          <img :src="p.img" :alt="p.alt" loading="lazy" :style="{ objectPosition: p.pos }">
          <div class="card-body">
            <span class="chip person-chip">{{ p.era }}</span>
            <h3 class="person-name">{{ p.name }}</h3>
            <p>{{ p.text }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Note historique -->
    <section class="sec">
      <div class="note" :class="{ 'note--rtl': isRtl }">
        <img src="/img/goya.jpg" :alt="c.note.alt" loading="lazy">
        <div class="note-shade" aria-hidden="true" />
        <div class="note-body">
          <span class="kicker note-kick">{{ c.note.kicker }}</span>
          <h2 class="h-block note-title">{{ c.note.title }}</h2>
          <p class="note-text">{{ c.note.text }}</p>
          <NuxtLink :to="localePath('/prise-de-carthage')" class="btn btn-outline">{{ c.note.more }}</NuxtLink>
        </div>
        <span class="note-credit">{{ c.note.credit }}</span>
      </div>
    </section>

    <PageSources :items="c.sources" />

    <!-- Explorer -->
    <section class="sec">
      <div class="sec-head head-pad">
        <h2 class="h-section">{{ c.explore.title }}</h2>
        <p>{{ c.explore.aside }}</p>
      </div>
      <div class="cols cols-4 cols--flush">
        <NuxtLink v-for="e in c.explore.main" :key="e.to" :to="localePath(e.to)" class="card-img ex">
          <img :src="e.img" alt="" loading="lazy">
          <div class="card-body ex-body">
            <div>
              <h3 class="ex-title">{{ e.title }}</h3>
              <p>{{ e.text }}</p>
            </div>
            <span class="arrow" :style="{ background: e.color, color: e.ink ? '#16130F' : '#FFFFFF' }" aria-hidden="true">{{ isRtl ? '←' : '→' }}</span>
          </div>
        </NuxtLink>
      </div>
      <div class="cols cols-4 keep-2 cols--flush more-row">
        <NuxtLink v-for="e in c.explore.more" :key="e.to" :to="localePath(e.to)" class="tile tile--stack mini" :class="e.cls">
          <span class="kicker">{{ e.kick }}</span>
          <div class="mini-foot">
            <h3 class="mini-title">{{ e.title }}</h3>
            <span class="mini-arrow" aria-hidden="true">{{ isRtl ? '←' : '→' }}</span>
          </div>
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const isRtl = computed(() => isRtlLocale(locale.value))

const IMG = {
  dates: [
    { to: '/fondation', cls: '', img: '/img/turner-dido.jpg', bg: '#E6D9C4' },
    { to: '/elephants', cls: 'tile--terra', img: '/img/leutemann.jpg', bg: '#8E3720', pos: '50% 60%' },
    { to: '/prise-de-carthage', cls: 'tile--navy', img: '/img/baths.jpg', bg: '#142E4B' }
  ],
  nums: ['tile--gold', '', 'tile--navy', 'tile--terra'],
  civ: [
    { to: '/hannon', cls: 'civ--navy', img: '/img/ports.jpg', glyph: '𐤉' },
    { to: '/armee', cls: 'civ--terra', img: '/img/cannae.jpg', glyph: '𐤇' },
    { to: '/economie', cls: 'civ--gold', img: '/img/olive.jpg', glyph: '𐤌' }
  ],
  museum: [
    { img: '/img/tanit-stele.jpg' },
    { img: '/img/mask.jpg', pos: '50% 25%' },
    { img: '/img/coin-elephant.jpg' },
    { img: '/img/tophet.jpg' },
    { img: '/img/kerkouane.jpg' }
  ],
  figures: [
    { to: '/didon', img: '/img/guerin-dido.jpg', pos: '30% 40%' },
    { to: '/hamilcar', img: '/img/hamilcar.jpg', pos: '50% 20%' },
    { to: '/hannibal', img: '/img/hannibal-bust.jpg', pos: '50% 30%', ink: true }
  ],
  explore: [
    { to: '/chronologie', img: '/img/byrsa.jpg', color: '#6E1E47' },
    { to: '/elephants', img: '/img/zama.jpg', color: '#B8492A' },
    { to: '/economie', img: '/img/hanno-galley.png', color: '#D6A23E', ink: true },
    { to: '/afrique', img: '/img/bardo.jpg', color: '#1D3F66' }
  ],
  more: [
    { to: '/tunisie', cls: 'tile--purple' },
    { to: '/carte', cls: 'tile--navy' },
    { to: '/tactiques', cls: 'tile--terra' },
    { to: '/religion', cls: 'tile--ink' },
    { to: '/quiz', cls: 'tile--gold' },
    { to: '/glossaire', cls: 'tile--sand' },
    { to: '/monde-punique', cls: 'tile--olive' },
    { to: '/vie-quotidienne', cls: '' }
  ]
}

const merge = (base, texts) => base.map((b, i) => ({ ...b, ...texts[i] }))

const build = (t) => ({
  ...t,
  dates: merge(IMG.dates, t.dates),
  nums: t.nums.map((n, i) => ({ ...n, cls: IMG.nums[i] })),
  civ: { ...t.civ, items: merge(IMG.civ, t.civ.items) },
  museum: { ...t.museum, items: merge(IMG.museum, t.museum.items) },
  figures: { ...t.figures, items: merge(IMG.figures, t.figures.items) },
  explore: { ...t.explore, main: merge(IMG.explore, t.explore.main), more: merge(IMG.more, t.explore.more) }
})

const C = {
  fr: build({
    meta: {
      title: 'Carthage — Qart-Ḥadasht, la cité punique qui a défié Rome',
      desc: "De sa fondation légendaire par la reine Didon en 814 av. J.-C. à la marche d'Hannibal à travers les Alpes : l'histoire de Carthage, l'une des plus grandes civilisations de l'Antiquité."
    },
    hero: {
      alt: 'Ruines puniques de la colline de Byrsa, Carthage',
      capKick: 'Colline de Byrsa · Carthage, Tunisie',
      capTitle: 'Le cœur de la cité punique, face au golfe de Tunis',
      visit: 'Visite en images →',
      chip: 'Qart-Ḥadasht · « Ville nouvelle »',
      title: 'Carthage',
      lede: 'La puissance méditerranéenne qui a défié Rome — de la reine Didon à Hannibal.',
      cta1: 'Explorer la chronologie →',
      cta2: 'La traversée des Alpes'
    },
    dates: [
      { kick: 'Fondation', num: '814', text: 'Didon fonde la cité sur la colline de Byrsa', alt: 'Turner — Didon construisant Carthage' },
      { kick: 'Les Alpes', num: '218', text: 'Hannibal franchit les Alpes avec 37 éléphants', alt: 'Leutemann — Hannibal franchissant les Alpes' },
      { kick: 'Prise par Rome', num: '146', text: 'Prise par Rome, puis rebâtie sur le même site', alt: "Thermes d'Antonin, Carthage" }
    ],
    intro: {
      kicker: '814 – 146 av. J.-C.',
      title: 'Sept siècles au cœur de la Méditerranée',
      text: "De sa fondation légendaire par la reine Didon à la marche épique d'Hannibal à travers les Alpes, Carthage fut l'une des plus grandes civilisations de l'Antiquité : une cité de marins, de marchands et d'agronomes, rivale de Rome pendant plus d'un siècle."
    },
    nums: [
      { kick: 'Indépendance', num: '668', text: 'ans de la fondation (814) à la prise par Rome (146 av. J.-C.)' },
      { kick: '264 – 146 av. J.-C.', num: '3', text: 'guerres puniques contre Rome, pour la maîtrise de la Méditerranée' },
      { kick: 'Le Cothon', num: '220', text: 'navires de guerre abrités par le port circulaire, cœur du double port' },
      { kick: 'Patrimoine mondial', num: '1979', text: "Le site archéologique de Carthage est inscrit à l'UNESCO" }
    ],
    civ: {
      title: 'Une civilisation extraordinaire',
      aside: "Plus de sept siècles d'histoire, de commerce et de conquêtes.",
      items: [
        { title: 'Maîtres de la mer', alt: 'Les ports puniques de Carthage', text: "La plus puissante flotte de la Méditerranée occidentale, maîtresse des routes de la Sicile à l'Espagne et au-delà des Colonnes d'Hercule. Le port circulaire — aujourd'hui une lagune — abritait 220 navires de guerre." },
        { title: 'Guerriers légendaires', alt: 'Trumbull — La bataille de Cannes', text: "Hannibal Barca, l'un des plus grands stratèges de l'histoire, franchit les Alpes avec ses éléphants de guerre. Cannes est encore étudiée dans les académies militaires." },
        { title: 'Empire commercial', alt: 'Oliveraies du cap Bon', text: "De la Bretagne à l'Afrique de l'Ouest, ses réseaux d'échanges ont façonné l'économie antique. Les oliveraies du cap Bon nourrissaient déjà la Méditerranée." }
      ]
    },
    museum: {
      kicker: 'Au musée',
      title: 'Ce que Carthage nous a laissé',
      prev: 'Objet précédent',
      next: 'Objet suivant',
      items: [
        { name: 'Stèle au signe de Tanit', meta: 'Calcaire · MBA Lyon', alt: 'Stèle punique gravée du signe de Tanit' },
        { name: 'Masque grimaçant', meta: 'Terre cuite · Musée du Bardo', alt: 'Masque punique grimaçant en terre cuite' },
        { name: "Shekel à l'éléphant", meta: 'Argent · 213–210 av. J.-C. · British Museum', alt: "Monnaie carthaginoise d'argent à l'éléphant" },
        { name: 'Stèles du tophet', meta: 'Calcaire · Musée du Louvre', alt: 'Stèles votives du tophet de Carthage' },
        { name: 'Tanit en mosaïque', meta: 'Sol punique · Kerkouane, UNESCO', alt: 'Signe de Tanit dans un sol punique de Kerkouane' }
      ]
    },
    map: {
      kicker: 'Carte animée',
      title: 'Sept siècles sur la carte',
      more: 'Ouvrir la carte complète →'
    },
    figures: {
      title: 'Figures marquantes',
      all: 'Toutes les biographies →',
      items: [
        { era: '814 av. J.-C.', name: 'Didon (Élyssa)', alt: 'Guérin — Énée racontant à Didon les malheurs de Troie', text: 'Princesse de Tyr, fondatrice légendaire de Carthage : une peau de bœuf découpée en lanières pour entourer la colline de Byrsa.' },
        { era: 'v. 275–228 av. J.-C.', name: 'Hamilcar Barca', alt: 'Hamilcar Barca', text: "Père d'Hannibal. Il tint tête à Rome en Sicile lors de la première guerre punique, puis conquit une grande partie de l'Espagne." },
        { era: '247–183 av. J.-C.', name: 'Hannibal Barca', alt: "Buste présumé d'Hannibal, Capoue", text: 'Trébie, Trasimène, Cannes — le stratège qui fit trembler Rome après avoir franchi les Alpes avec ses éléphants.' }
      ]
    },
    note: {
      alt: "Goya — Hannibal vainqueur contemplant pour la première fois l'Italie depuis les Alpes",
      kicker: 'Note historique',
      title: "Carthage n'a jamais été « rayée de la carte »",
      text: "Le sel répandu sur les ruines est un mythe moderne : aucune source antique ne le mentionne. Prise et incendiée en 146 av. J.-C., la ville fut refondée par Rome sur le même site — la Colonia Julia Carthago d'Auguste devint l'une des plus grandes cités de l'Occident romain.",
      more: 'Lire la prise de Carthage →',
      credit: "Goya — Hannibal contemplant l'Italie (1771)"
    },
    explore: {
      title: "Explorer l'histoire",
      aside: "Chronologie, batailles, économie, héritage : choisissez votre porte d'entrée.",
      main: [
        { title: 'Chronologie', text: 'De 814 à 146 av. J.-C.' },
        { title: 'Éléphants & batailles', text: 'Des Alpes à Zama' },
        { title: "L'économie", text: 'Commerce, agriculture, finance' },
        { title: "L'Afrique et son nom", text: 'Afri, Africa, Ifriqiya' }
      ],
      more: [
        { kick: 'Héritage', title: 'Carthage vit en Tunisie' },
        { kick: 'Interactif', title: 'La carte animée' },
        { kick: 'Art de la guerre', title: 'Les tactiques' },
        { kick: 'Croyances', title: 'La religion punique' },
        { kick: 'Jouer', title: 'Le quiz' },
        { kick: 'Les mots', title: 'Le glossaire' },
        { kick: 'Au-delà de Carthage', title: 'Le monde punique' },
        { kick: 'Au quotidien', title: 'La vie à Carthage' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Timée de Tauroménion', work: 'Histoires (perdues)', ref: 'cité par Denys d\'Halicarnasse, Antiquités romaines I, 74', note: 'date de fondation : 814 av. J.-C.' },
      { type: 'ancient', author: 'Justin', work: 'Abrégé des Histoires philippiques de Trogue Pompée', ref: 'XVIII, 4–6', note: 'Didon (Élissa) et la peau de bœuf de Byrsa' },
      { type: 'ancient', author: 'Polybe', work: 'Histoires', note: 'les guerres puniques, la traversée des Alpes' },
      { type: 'ancient', author: 'Tite-Live', work: 'Histoire romaine', note: 'la deuxième guerre punique, de Sagonte à Zama' },
      { type: 'ancient', author: 'Appien', work: 'Libyca', ref: '96', note: 'le port circulaire et ses 220 loges' },
      { type: 'modern', author: 'UNESCO', work: 'Site archéologique de Carthage', ref: 'Liste du patrimoine mondial, 1979' }
    ]
  }),

  en: build({
    meta: {
      title: 'Carthage — Qart-Ḥadasht, the Punic city that defied Rome',
      desc: "From its legendary founding by Queen Dido in 814 BC to Hannibal's march across the Alps: the history of Carthage, one of the greatest civilizations of antiquity."
    },
    hero: {
      alt: 'Punic ruins on the Byrsa hill, Carthage',
      capKick: 'Byrsa hill · Carthage, Tunisia',
      capTitle: 'The heart of the Punic city, facing the Gulf of Tunis',
      visit: 'Visual tour →',
      chip: 'Qart-Ḥadasht · "New City"',
      title: 'Carthage',
      lede: 'The Mediterranean power that defied Rome — from Queen Dido to Hannibal.',
      cta1: 'Explore the timeline →',
      cta2: 'The Alpine crossing'
    },
    dates: [
      { kick: 'Foundation', num: '814', text: 'Dido founds the city on the Byrsa hill', alt: 'Turner — Dido building Carthage' },
      { kick: 'The Alps', num: '218', text: 'Hannibal crosses the Alps with 37 elephants', alt: 'Leutemann — Hannibal crossing the Alps' },
      { kick: 'Taken by Rome', num: '146', text: 'Taken by Rome, then rebuilt on the same site', alt: 'Antonine Baths, Carthage' }
    ],
    intro: {
      kicker: '814 – 146 BC',
      title: 'Seven centuries at the heart of the Mediterranean',
      text: "From its legendary founding by Queen Dido to Hannibal's epic march across the Alps, Carthage was one of the greatest civilizations of antiquity: a city of sailors, merchants and agronomists, Rome's rival for more than a century."
    },
    nums: [
      { kick: 'Independence', num: '668', text: 'years from the founding (814) to the Roman seizure (146 BC)' },
      { kick: '264 – 146 BC', num: '3', text: 'Punic Wars against Rome for mastery of the Mediterranean' },
      { kick: 'The Cothon', num: '220', text: 'warships housed in the circular harbour, heart of the twin port' },
      { kick: 'World Heritage', num: '1979', text: 'The archaeological site of Carthage is inscribed by UNESCO' }
    ],
    civ: {
      title: 'An extraordinary civilization',
      aside: 'Over seven centuries of history, trade and conquest.',
      items: [
        { title: 'Masters of the sea', alt: 'The Punic harbours of Carthage', text: 'The most powerful fleet in the western Mediterranean, controlling the routes from Sicily to Spain and beyond the Pillars of Hercules. The circular harbour — now a lagoon — housed 220 warships.' },
        { title: 'Legendary warriors', alt: 'Trumbull — The Battle of Cannae', text: 'Hannibal Barca, one of the greatest strategists in history, crossed the Alps with his war elephants. Cannae is still studied in military academies.' },
        { title: 'Trade empire', alt: 'Olive groves of Cape Bon', text: 'From Britain to West Africa, its trade networks shaped the ancient economy. The olive groves of Cape Bon were already feeding the Mediterranean.' }
      ]
    },
    museum: {
      kicker: 'In the museum',
      title: 'What Carthage left us',
      prev: 'Previous object',
      next: 'Next object',
      items: [
        { name: 'Stele with the sign of Tanit', meta: 'Limestone · MBA Lyon', alt: 'Punic stele engraved with the sign of Tanit' },
        { name: 'Grimacing mask', meta: 'Terracotta · Bardo Museum', alt: 'Punic grimacing terracotta mask' },
        { name: 'Elephant shekel', meta: 'Silver · 213–210 BC · British Museum', alt: 'Carthaginian silver coin with an elephant' },
        { name: 'Tophet stelae', meta: 'Limestone · Louvre Museum', alt: 'Votive stelae from the tophet of Carthage' },
        { name: 'Tanit in mosaic', meta: 'Punic floor · Kerkouane, UNESCO', alt: 'Sign of Tanit in a Punic floor at Kerkouane' }
      ]
    },
    map: {
      kicker: 'Animated map',
      title: 'Seven centuries on the map',
      more: 'Open the full map →'
    },
    figures: {
      title: 'Key figures',
      all: 'All biographies →',
      items: [
        { era: '814 BC', name: 'Dido (Elissa)', alt: 'Guérin — Aeneas telling Dido of the misfortunes of Troy', text: 'Princess of Tyre, legendary founder of Carthage: an oxhide cut into strips to encircle the Byrsa hill.' },
        { era: 'c. 275–228 BC', name: 'Hamilcar Barca', alt: 'Hamilcar Barca', text: "Hannibal's father. He held Rome at bay in Sicily during the First Punic War, then conquered much of Spain." },
        { era: '247–183 BC', name: 'Hannibal Barca', alt: 'Presumed bust of Hannibal, Capua', text: 'Trebia, Trasimene, Cannae — the strategist who made Rome tremble after crossing the Alps with his elephants.' }
      ]
    },
    note: {
      alt: 'Goya — Hannibal the Conqueror Viewing Italy from the Alps for the First Time',
      kicker: 'Historical note',
      title: 'Carthage was never "wiped off the map"',
      text: "The salt sown on the ruins is a modern myth: no ancient source mentions it. Taken and burned in 146 BC, the city was refounded by Rome on the same site — Augustus' Colonia Julia Carthago became one of the largest cities of the Roman West.",
      more: 'Read about the fall of Carthage →',
      credit: 'Goya — Hannibal Viewing Italy (1771)'
    },
    explore: {
      title: 'Explore history',
      aside: 'Timeline, battles, economy, legacy: pick your way in.',
      main: [
        { title: 'Timeline', text: 'From 814 to 146 BC' },
        { title: 'Elephants & battles', text: 'From the Alps to Zama' },
        { title: 'The economy', text: 'Trade, agriculture, finance' },
        { title: 'Africa and its name', text: 'Afri, Africa, Ifriqiya' }
      ],
      more: [
        { kick: 'Legacy', title: 'Carthage lives on in Tunisia' },
        { kick: 'Interactive', title: 'The animated map' },
        { kick: 'Art of war', title: 'Tactics' },
        { kick: 'Beliefs', title: 'Punic religion' },
        { kick: 'Play', title: 'The quiz' },
        { kick: 'The words', title: 'The glossary' },
        { kick: 'Beyond Carthage', title: 'The Punic world' },
        { kick: 'Everyday', title: 'Life in Carthage' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Timaeus of Tauromenium', work: 'Histories (lost)', ref: 'quoted by Dionysius of Halicarnassus, Roman Antiquities I, 74', note: 'foundation date: 814 BC' },
      { type: 'ancient', author: 'Justin', work: 'Epitome of the Philippic History of Pompeius Trogus', ref: 'XVIII, 4–6', note: 'Dido (Elissa) and the oxhide of Byrsa' },
      { type: 'ancient', author: 'Polybius', work: 'Histories', note: 'the Punic Wars, the crossing of the Alps' },
      { type: 'ancient', author: 'Livy', work: 'History of Rome', note: 'the Second Punic War, from Saguntum to Zama' },
      { type: 'ancient', author: 'Appian', work: 'Libyca', ref: '96', note: 'the circular harbour and its 220 ship-sheds' },
      { type: 'modern', author: 'UNESCO', work: 'Archaeological Site of Carthage', ref: 'World Heritage List, 1979' }
    ]
  }),

  ar: build({
    meta: {
      title: 'قرطاج — قرت حدشت، المدينة البونيقية التي تحدّت روما',
      desc: 'من تأسيسها الأسطوري على يد الملكة ديدون عام 814 ق.م إلى مسيرة حنبعل عبر جبال الألب: تاريخ قرطاج، واحدة من أعظم حضارات العصور القديمة.'
    },
    hero: {
      alt: 'أطلال بونيقية على تلة بيرصا، قرطاج',
      capKick: 'تلة بيرصا · قرطاج، تونس',
      capTitle: 'قلب المدينة البونيقية، في مواجهة خليج تونس',
      visit: 'جولة بالصور ←',
      chip: 'قرت حدشت · «المدينة الجديدة»',
      title: 'قرطاج',
      lede: 'القوة المتوسطية التي تحدّت روما — من الملكة ديدون إلى حنبعل.',
      cta1: 'استكشف التسلسل الزمني ←',
      cta2: 'عبور جبال الألب'
    },
    dates: [
      { kick: 'التأسيس', num: '814', text: 'ديدون تؤسس المدينة على تلة بيرصا', alt: 'تيرنر — ديدون تبني قرطاج' },
      { kick: 'جبال الألب', num: '218', text: 'حنبعل يعبر جبال الألب ومعه 37 فيلاً', alt: 'لويتمان — حنبعل يعبر جبال الألب' },
      { kick: 'استيلاء روما', num: '146', text: 'استولت عليها روما ثم أعادت بناءها في الموقع نفسه', alt: 'حمامات أنطونيوس، قرطاج' }
    ],
    intro: {
      kicker: '814 – 146 ق.م',
      title: 'سبعة قرون في قلب المتوسط',
      text: 'من تأسيسها الأسطوري على يد الملكة ديدون إلى مسيرة حنبعل الملحمية عبر جبال الألب، كانت قرطاج واحدة من أعظم حضارات العصور القديمة: مدينة بحّارة وتجّار وعلماء زراعة، نافست روما أكثر من قرن.'
    },
    nums: [
      { kick: 'الاستقلال', num: '668', text: 'عامًا من التأسيس (814) إلى استيلاء روما (146 ق.م)' },
      { kick: '264 – 146 ق.م', num: '3', text: 'حروب بونيقية ضد روما للسيطرة على المتوسط' },
      { kick: 'الكوثون', num: '220', text: 'سفينة حربية كان يأويها الميناء الدائري، قلب الميناء المزدوج' },
      { kick: 'التراث العالمي', num: '1979', text: 'إدراج موقع قرطاج الأثري في قائمة اليونسكو' }
    ],
    civ: {
      title: 'حضارة استثنائية',
      aside: 'أكثر من سبعة قرون من التاريخ والتجارة والفتوحات.',
      items: [
        { title: 'سادة البحر', alt: 'الموانئ البونيقية في قرطاج', text: 'أقوى أسطول في غرب البحر المتوسط، سيطر على الطرق من صقلية إلى إسبانيا وما وراء أعمدة هرقل. كان الميناء الدائري — وهو اليوم بحيرة — يأوي 220 سفينة حربية.' },
        { title: 'محاربون أسطوريون', alt: 'ترمبل — معركة كاناي', text: 'حنبعل برقا، أحد أعظم الاستراتيجيين في التاريخ، عبر جبال الألب بفيلته الحربية. وما زالت معركة كاناي تُدرَّس في الأكاديميات العسكرية.' },
        { title: 'إمبراطورية تجارية', alt: 'بساتين الزيتون في الوطن القبلي', text: 'من بريطانيا إلى غرب إفريقيا، شكّلت شبكاتها التجارية اقتصاد العالم القديم. وكانت بساتين زيتون الوطن القبلي تغذّي المتوسط منذ ذلك الحين.' }
      ]
    },
    museum: {
      kicker: 'في المتحف',
      title: 'ما تركته لنا قرطاج',
      prev: 'القطعة السابقة',
      next: 'القطعة التالية',
      items: [
        { name: 'نصب عليه علامة تانيت', meta: 'حجر جيري · متحف الفنون الجميلة بليون', alt: 'نصب بونيقي منقوش بعلامة تانيت' },
        { name: 'قناع متجهّم', meta: 'فخار · متحف باردو', alt: 'قناع بونيقي متجهّم من الفخار' },
        { name: 'شيقل الفيل', meta: 'فضة · 213–210 ق.م · المتحف البريطاني', alt: 'عملة قرطاجية فضية عليها فيل' },
        { name: 'أنصاب التوفيت', meta: 'حجر جيري · متحف اللوفر', alt: 'أنصاب نذرية من توفيت قرطاج' },
        { name: 'تانيت في الفسيفساء', meta: 'أرضية بونيقية · كركوان، يونسكو', alt: 'علامة تانيت في أرضية بونيقية بكركوان' }
      ]
    },
    map: {
      kicker: 'خريطة متحركة',
      title: 'سبعة قرون على الخريطة',
      more: 'افتح الخريطة الكاملة ←'
    },
    figures: {
      title: 'شخصيات بارزة',
      all: 'كل السير ←',
      items: [
        { era: '814 ق.م', name: 'ديدون (أليسا)', alt: 'غيران — إينياس يروي لديدون مآسي طروادة', text: 'أميرة من صور ومؤسِّسة قرطاج الأسطورية: جلد ثور قُطّع شرائح رفيعة لتحيط بتلة بيرصا.' },
        { era: 'نحو 275–228 ق.م', name: 'حملقار برقا', alt: 'حملقار برقا', text: 'والد حنبعل. صمد في وجه روما في صقلية خلال الحرب البونيقية الأولى، ثم فتح جزءًا كبيرًا من إسبانيا.' },
        { era: '247–183 ق.م', name: 'حنبعل برقا', alt: 'تمثال نصفي يُنسب إلى حنبعل، كابوا', text: 'تريبيا، تراسيمينو، كاناي — القائد الذي أرعب روما بعد أن عبر جبال الألب بفيلته.' }
      ]
    },
    note: {
      alt: 'غويا — حنبعل المنتصر يتأمل إيطاليا لأول مرة من جبال الألب',
      kicker: 'ملاحظة تاريخية',
      title: 'قرطاج لم «تُمحَ من الخريطة» قط',
      text: 'نثر الملح على الأنقاض أسطورة حديثة: لا يذكره أي مصدر قديم. استولت روما على المدينة وأحرقتها عام 146 ق.م، ثم أعادت تأسيسها في الموقع نفسه — فصارت «كولونيا يوليا قرطاج» في عهد أغسطس من أكبر مدن الغرب الروماني.',
      more: 'اقرأ عن سقوط قرطاج ←',
      credit: 'غويا — حنبعل يتأمل إيطاليا (1771)'
    },
    explore: {
      title: 'استكشف التاريخ',
      aside: 'التسلسل الزمني، المعارك، الاقتصاد، الإرث: اختر مدخلك.',
      main: [
        { title: 'التسلسل الزمني', text: 'من 814 إلى 146 ق.م' },
        { title: 'الفيلة والمعارك', text: 'من جبال الألب إلى زاما' },
        { title: 'الاقتصاد', text: 'التجارة والزراعة والمال' },
        { title: 'إفريقيا واسمها', text: 'أفري، أفريكا، إفريقية' }
      ],
      more: [
        { kick: 'الإرث', title: 'قرطاج تحيا في تونس' },
        { kick: 'تفاعلي', title: 'الخريطة المتحركة' },
        { kick: 'فن الحرب', title: 'التكتيكات' },
        { kick: 'المعتقدات', title: 'الديانة البونيقية' },
        { kick: 'العب', title: 'الاختبار' },
        { kick: 'المفردات', title: 'المعجم' },
        { kick: 'ما وراء قرطاج', title: 'العالم البونيقي' },
        { kick: 'الحياة اليومية', title: 'الحياة في قرطاج' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'تيمايوس التاورميني', work: 'التواريخ (مفقودة)', ref: 'نقلها ديونيسيوس الهاليكارناسي، الآثار الرومانية I, 74', note: 'تاريخ التأسيس: 814 ق.م' },
      { type: 'ancient', author: 'يوستينوس', work: 'مختصر التواريخ الفيليبية لتروغوس بومبيوس', ref: 'XVIII, 4–6', note: 'ديدون (عليسة) وجلد الثور في بيرصا' },
      { type: 'ancient', author: 'بوليبيوس', work: 'التواريخ', note: 'الحروب البونيقية، عبور جبال الألب' },
      { type: 'ancient', author: 'تيتوس ليفيوس', work: 'تاريخ روما', note: 'الحرب البونيقية الثانية، من ساغونتوم إلى زاما' },
      { type: 'ancient', author: 'أبيانوس', work: 'الكتاب الليبي', ref: '96', note: 'الميناء الدائري ومراسيه الـ220' },
      { type: 'modern', author: 'اليونسكو', work: 'موقع قرطاج الأثري', ref: 'قائمة التراث العالمي، 1979' }
    ]
  })
}

const c = await useLocalized('index', C)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))

// Carrousel « Au musée »
const track = ref(null)
const atStart = ref(true)
const atEnd = ref(false)

function updateEdges () {
  const el = track.value
  if (!el) return
  const x = Math.abs(el.scrollLeft)
  atStart.value = x < 4
  atEnd.value = x + el.clientWidth >= el.scrollWidth - 4
}

function slide (dir) {
  const el = track.value
  if (!el) return
  const item = el.querySelector('.obj')
  const step = item ? item.getBoundingClientRect().width + 12 : el.clientWidth * 0.8
  el.scrollBy({ left: dir * step * (isRtl.value ? -1 : 1), behavior: 'smooth' })
}

onMounted(() => {
  updateEdges()
  window.addEventListener('resize', updateEdges, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateEdges)
})

watch(locale, () => nextTick(updateEdges))
</script>

<style scoped>
/* ---------- Héros ---------- */
.hero {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: minmax(360px, auto) minmax(300px, auto) auto;
  gap: var(--gap);
  padding: var(--gutter) var(--gutter) var(--gap);
}

.hero-fig {
  grid-column: span 7;
  grid-row: span 2;
  position: relative;
  margin: 0;
  border-radius: var(--r-xl);
  overflow: hidden;
  background: var(--navy);
  min-height: 280px;
}

.hero-fig > img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 40% 50%;
}

.hero-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(22, 19, 15, 0) 45%, rgba(22, 19, 15, 0.72));
}

.hero-cap {
  position: absolute;
  inset-inline: clamp(20px, 2.5vw, 36px);
  bottom: clamp(20px, 2.2vw, 32px);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  color: var(--white);
}

.hero-cap-kick { font: 600 13px/1.2 var(--font-body); margin-bottom: 10px; opacity: 0.85; }
.hero-cap-title {
  font: 800 clamp(22px, 2.4vw, 34px)/1.05 var(--font-display);
  font-stretch: 108%;
  max-width: 460px;
}

.hero-pill {
  flex: none;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--ink);
  border-radius: 999px;
  padding: 12px 18px;
  font: 600 14px/1 var(--font-body);
}

.hero-pill:hover { background: var(--white); color: var(--purple); }

.hero-tile {
  grid-column: span 5;
  grid-row: span 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
}

.hero-mark {
  position: absolute;
  inset-inline-end: -20px;
  bottom: -70px;
  font-size: clamp(200px, 24vw, 340px);
  color: rgba(255, 255, 255, 0.07);
  pointer-events: none;
}

.hero-top, .hero-bottom { position: relative; }
.hero-phoen { font-size: clamp(22px, 2vw, 28px); letter-spacing: 0.08em; margin-bottom: 12px; }
.hero-top .chip { white-space: normal; line-height: 1.3; }

.hero-h1 { font-size: clamp(56px, 6.6vw, 94px); line-height: 0.86; letter-spacing: -0.045em; }
.hero-lede {
  margin-top: 24px;
  font: 500 clamp(17px, 1.5vw, 21px)/1.4 var(--font-body);
  color: var(--white);
  text-wrap: pretty;
}

.hero-ctas { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
.hero-ctas .btn-outline:hover { background: var(--ink); color: var(--white); }

.btn-ghost {
  background: transparent;
  color: var(--white);
  border: 1.5px solid rgba(255, 255, 255, 0.55);
}

.btn-ghost:hover { background: rgba(255, 255, 255, 0.12); color: var(--white); }

/* Tuiles de dates */
.dt {
  grid-column: span 4;
  min-height: 230px;
  padding: 12px;
  display: grid;
  grid-template-columns: clamp(110px, 10.5vw, 150px) minmax(0, 1fr);
  gap: 18px;
}

.dt-img {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}

.dt-img img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dt-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 8px 8px 0;
  padding-inline: 0 8px;
}

.dt-kick { font: 600 13px/1 var(--font-body); opacity: 0.8; }
.dt-num {
  font: 800 clamp(44px, 4.2vw, 60px)/1 var(--font-display);
  font-stretch: 108%;
  letter-spacing: -0.03em;
}

.dt-text { margin-top: 6px; font: 500 15px/1.35 var(--font-body); }
.dt:not(.tile--terra):not(.tile--navy) .dt-text { color: var(--ink); }

/* ---------- Chiffres ---------- */
.intro .h-block { margin-top: 4px; }
.intro .body-lg { max-width: 520px; }

.nums {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--gap);
}

.num-tile { min-height: 190px; gap: 16px; }
.num-text { margin-top: 8px; font-size: 14px; }

/* ---------- En-têtes de section ---------- */
.head-pad { padding-inline: clamp(0px, 1.6vw, 24px); }
.big-title { font-size: clamp(36px, 5vw, 72px); max-width: 820px; }

/* ---------- Civilisation ---------- */
.civ {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: var(--r-lg);
  color: var(--white);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.civ:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(22, 19, 15, 0.1); color: var(--white); }
.civ--navy { background: var(--navy); }
.civ--terra { background: var(--terra); }
.civ--gold, .civ--gold:hover { background: var(--gold); color: var(--ink); }

.civ > img {
  width: 100%;
  height: clamp(200px, 18vw, 260px);
  object-fit: cover;
  border-radius: calc(var(--r-lg) - 8px);
  display: block;
  background: rgba(0, 0, 0, 0.2);
}

.civ-body { padding: 24px 20px 20px; }
.civ-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 16px; }
.civ-title { font: 800 clamp(24px, 2.2vw, 30px)/1 var(--font-display); font-stretch: 108%; margin: 0; }
.civ-glyph { font-size: 36px; opacity: 0.8; }
.civ p { font: 400 16px/1.55 var(--font-body); margin: 0; }
.civ--navy p { color: var(--navy-soft); }
.civ--terra p { color: var(--terra-soft); }
.civ--gold p { color: var(--gold-ink); }

/* ---------- Musée (carrousel) ---------- */
.museum-head { margin-bottom: 28px; }
.car-nav { display: none; gap: 8px; }

.car-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1.5px solid rgba(22, 19, 15, 0.2);
  background: transparent;
  color: var(--ink);
  font-size: 18px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s, background 0.2s;
}

.car-btn--on { background: var(--ink); color: var(--white); border-color: var(--ink); }
.car-btn:disabled { opacity: 0.35; cursor: default; }

.track {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}

.track:focus-visible { outline-offset: 4px; border-radius: 12px; }

.obj { margin: 0; display: flex; flex-direction: column; gap: 14px; }
.obj-img { height: clamp(240px, 21vw, 300px); border-radius: 20px; overflow: hidden; background: #EFE7DA; }
.obj-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.obj-name { font: 700 17px/1.2 var(--font-body); }
.obj-meta { font: 400 13px/1.4 var(--font-body); color: var(--muted); margin-top: 4px; }

/* ---------- Figures ---------- */
.people {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.3fr);
  gap: var(--gap);
}

.person > img { height: clamp(300px, 29vw, 420px); }
.person .card-body { padding: 20px 16px 12px; }
.person-chip { margin-bottom: 14px; }
.person-name { font: 800 clamp(26px, 2.2vw, 30px)/1 var(--font-display); font-stretch: 108%; margin: 0 0 8px; }
.person p { font-size: 15px; }
.person--ink, .person--ink:hover { background: var(--ink); color: var(--white); }
.person--ink .person-name { font-size: clamp(28px, 2.6vw, 36px); }
.person--ink p { color: var(--on-dark); }
.person--ink .person-chip { background: var(--purple); color: var(--white); }
.person--ink > img { background: var(--purple); }

.btn-dark { background: var(--ink); color: var(--white); }
.btn-dark:hover { background: var(--purple); color: var(--white); }

/* ---------- Note historique ---------- */
.note {
  position: relative;
  border-radius: var(--r-xl);
  overflow: hidden;
  min-height: 520px;
  background: #2A2320;
  color: var(--white);
  display: flex;
  align-items: flex-end;
}

.note > img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.note-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(22, 19, 15, 0.88) 0%, rgba(22, 19, 15, 0.55) 45%, rgba(22, 19, 15, 0) 75%);
}

.note--rtl .note-shade {
  background: linear-gradient(to left, rgba(22, 19, 15, 0.88) 0%, rgba(22, 19, 15, 0.55) 45%, rgba(22, 19, 15, 0) 75%);
}

.note-body { position: relative; padding: clamp(28px, 4vw, 56px); max-width: 680px; }
.note-kick { color: var(--gold-light); margin-bottom: 18px; }
.note-title { margin-bottom: 20px; font-size: clamp(32px, 3.9vw, 56px); }
.note-text { margin: 0 0 28px; font: 400 clamp(16px, 1.3vw, 18px)/1.6 var(--font-body); color: #E6DED2; }

.note-credit {
  position: absolute;
  inset-inline-end: 24px;
  bottom: 20px;
  font: 500 12px/1.3 var(--font-body);
  background: rgba(22, 19, 15, 0.6);
  padding: 8px 12px;
  border-radius: 999px;
}

/* ---------- Explorer ---------- */
.ex > img { height: 200px; }
.ex-body { display: flex; justify-content: space-between; align-items: flex-end; gap: 12px; flex: 1; }
.ex-title { font: 800 clamp(20px, 1.8vw, 24px)/1.05 var(--font-display); font-stretch: 108%; margin: 0 0 6px; }

.arrow {
  width: 44px;
  height: 44px;
  flex: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.more-row { margin-top: var(--gap); }
.mini { min-height: 150px; gap: 20px; }
.mini-foot { display: flex; justify-content: space-between; align-items: flex-end; gap: 12px; }
.mini-title { font: 800 clamp(18px, 1.6vw, 22px)/1.1 var(--font-display); margin: 0; }
.mini-arrow { font-size: 20px; line-height: 1; flex: none; }

/* ---------- Responsive ---------- */
@media (max-width: 1100px) {
  .car-nav { display: flex; }

  .track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 0;
    scrollbar-width: none;
    padding-bottom: 4px;
  }

  .track::-webkit-scrollbar { display: none; }

  .obj { flex: 0 0 clamp(200px, 38vw, 260px); scroll-snap-align: start; }
}

@media (max-width: 960px) {
  .hero { grid-template-columns: minmax(0, 1fr); grid-template-rows: none; }
  .hero-tile { grid-column: auto; grid-row: auto; order: -1; }
  .hero-fig { grid-column: auto; grid-row: auto; min-height: 280px; }
  .dt { grid-column: auto; min-height: 150px; grid-template-columns: 110px minmax(0, 1fr); }
  .people { grid-template-columns: minmax(0, 1fr); }
  .note { min-height: 480px; }
  .note-shade,
  .note--rtl .note-shade {
    background: linear-gradient(to top, rgba(22, 19, 15, 0.92) 0%, rgba(22, 19, 15, 0.6) 55%, rgba(22, 19, 15, 0.15) 100%);
  }
  .note-credit { top: 16px; bottom: auto; inset-inline-end: 16px; }
}

@media (max-width: 640px) {
  .hero-cap { flex-direction: column; align-items: flex-start; }
  .hero-top .chip { font-size: 12px; }
  .hero-ctas .btn { flex: 1 1 auto; justify-content: center; }
  .dt { gap: 14px; }
  .dt-text { font-size: 14px; }
  .num-tile { min-height: 0; padding: 18px; }
  .num-tile .num { font-size: 36px; }
  .num-text { font-size: 13px; }
  .museum { padding: 22px 16px; }
  .obj { flex-basis: 72%; }
  .obj-img { height: 240px; }
  .person > img { height: 300px; }
  .mini { min-height: 120px; padding: 18px; }
}
</style>
