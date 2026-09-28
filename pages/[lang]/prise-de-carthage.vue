<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--ink tile--stack tile--hero s-7">
        <span class="chip chip--terra">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-5" style="background:#5E574F">
        <img src="/img/punic-quarter.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Chiffres -->
    <div class="cols cols-4 keep-2">
      <div v-for="(s, i) in c.stats" :key="i" class="tile stat">
        <div class="num" :style="i === 0 ? { color: '#B8492A' } : null">{{ s.n }}</div>
        <p class="stat-text">{{ s.t }}</p>
      </div>
    </div>

    <!-- Carthago delenda est -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--paper tile--outline">
          <span class="kicker">{{ c.cato.kicker }}</span>
          <blockquote class="quote">
            <p lang="la">« Carthago delenda est »</p>
          </blockquote>
          <p class="body-lg cato-text">{{ c.cato.text }}</p>
        </div>
        <div class="tile tile--xl tile--purple tile--stack">
          <div>
            <span class="kicker">{{ c.myth.kicker }}</span>
            <h2 class="h-block myth-title">{{ c.myth.title }}</h2>
            <p class="body-lg">{{ c.myth.text }}</p>
          </div>
          <NuxtLink :to="localePath('/histoire-des-vainqueurs')" class="btn btn-outline">{{ c.myth.cta }} →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Déroulé -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <div class="sec-head">
          <h2 class="h-section">{{ c.war.title }}</h2>
          <NuxtLink :to="localePath('/chronologie')" class="btn btn-outline">{{ c.war.cta }} →</NuxtLink>
        </div>
        <div class="rows war-rows" style="--row-key:200px">
          <div v-for="(e, i) in c.war.events" :key="i">
            <span class="key">{{ e.date }}</span>
            <span class="val">
              <strong class="ev-title">{{ e.title }}</strong>
              {{ e.desc }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Hasdrubal, sa femme, Scipion -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.end.title }}</h2>
        <p>{{ c.end.aside }}</p>
      </div>
    </section>
    <div class="bento end">
      <div class="tile tile--xl tile--terra s-4 tile--stack">
        <span class="kicker">{{ c.end.hasdrubal.kicker }}</span>
        <div>
          <h3 class="h-card end-h">{{ c.end.hasdrubal.title }}</h3>
          <p class="body">{{ c.end.hasdrubal.text }}</p>
        </div>
      </div>
      <figure class="fig s-4 scipio-fig" style="background:#E6D9C4">
        <img src="/img/scipio.jpg" :alt="c.end.scipio.alt" loading="lazy" style="object-position:50% 25%">
        <figcaption class="cap-box">{{ c.end.scipio.caption }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--paper tile--outline s-4 tile--stack">
        <span class="kicker">{{ c.end.scipio.kicker }}</span>
        <blockquote class="quote quote--sm">
          <p>{{ c.end.scipio.quote }}</p>
        </blockquote>
        <p class="body">{{ c.end.scipio.text }}</p>
      </div>
    </div>

    <!-- Byrsa -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig byrsa-fig" style="background:#1D3F66">
          <img src="/img/byrsa.jpg" :alt="c.byrsa.alt" loading="lazy">
          <figcaption class="cap-box">{{ c.byrsa.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--sand">
          <span class="kicker">{{ c.byrsa.kicker }}</span>
          <h2 class="h-block byrsa-title">{{ c.byrsa.title }}</h2>
          <p v-for="(p, i) in c.byrsa.paragraphs" :key="i" class="body-lg byrsa-p">{{ p }}</p>
          <NuxtLink :to="localePath('/fondation')" class="btn btn-outline byrsa-cta">{{ c.byrsa.cta }} →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Mythe romain / réalité -->
    <section class="sec sec--wide">
      <h2 class="h-section cmp-title">{{ c.cmp.title }}</h2>
      <div class="cols cols-2 cols--flush cmp-labels" aria-hidden="true">
        <span class="lbl-myth">{{ c.cmp.labelMyth }}</span>
        <span class="lbl-real">{{ c.cmp.labelReal }}</span>
      </div>
      <div class="cmp">
        <div v-for="(m, i) in c.cmp.pairs" :key="i" class="cols cols-2 cols--flush pair">
          <div class="tile tile--sand">
            <span class="kicker tag-myth">{{ c.cmp.labelMyth }}</span>
            <h3 class="h-card">{{ m.myth }}</h3>
          </div>
          <div class="tile tile--outline">
            <span class="kicker tag-real">{{ c.cmp.labelReal }}</span>
            <p class="body real">{{ m.reality }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Preuves archéologiques -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.evidence.title }}</h2>
        <p>{{ c.evidence.subtitle }}</p>
      </div>
    </section>
    <div class="cols cols-3">
      <div v-for="(e, i) in c.evidence.items" :key="i" class="tile ev" :class="e.cls">
        <span class="kicker">{{ e.kick }}</span>
        <h3 class="h-card">{{ e.title }}</h3>
        <p class="body">{{ e.desc }}</p>
      </div>
    </div>

    <!-- Continuité -->
    <section class="sec">
      <div class="tile tile--xl tile--navy">
        <div class="sec-head">
          <div>
            <span class="kicker">{{ c.cont.kicker }}</span>
            <h2 class="h-section">{{ c.cont.title }}</h2>
          </div>
          <NuxtLink :to="localePath('/tunisie')" class="btn btn-outline">{{ c.cont.cta }} →</NuxtLink>
        </div>
        <div class="cols cols-4 cols--flush">
          <div v-for="(k, i) in c.cont.items" :key="i" class="cont">
            <div class="cont-key">{{ k.key }}</div>
            <h3 class="cont-h">{{ k.title }}</h3>
            <p class="body">{{ k.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Carthage aujourd'hui -->
    <section class="sec">
      <div class="sec-head">
        <h2 class="h-section">{{ c.today.title }}</h2>
        <NuxtLink :to="localePath('/carte')" class="btn btn-outline">{{ c.today.cta }} →</NuxtLink>
      </div>
      <div class="cols cols-2 cols--flush">
        <figure v-for="(g, i) in c.today.items" :key="i" class="fig today-fig" style="background:#E6D9C4">
          <img :src="'/img/' + g.img" :alt="g.alt" loading="lazy">
          <figcaption class="cap-box">{{ g.caption }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- À lire aussi -->
    <section class="sec">
      <h2 class="h-block more-title">{{ c.more.title }}</h2>
      <div class="cols cols-3 cols--flush">
        <NuxtLink v-for="l in c.more.items" :key="l.to" :to="localePath(l.to)" class="tile tile--stack more" :class="l.cls">
          <span class="kicker">{{ l.kick }}</span>
          <div>
            <h3 class="h-card">{{ l.title }}</h3>
            <p class="body">{{ l.text }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const C = {
  fr: {
    meta: {
      title: 'La prise de Carthage — 149-146 av. J.-C.',
      desc: "La troisième guerre punique : désarmement, siège de trois ans, Scipion Émilien, la chute de Byrsa, Hasdrubal et sa femme, le mythe du sel et la refondation romaine."
    },
    hero: {
      chip: '149 – 146 av. J.-C.',
      title: 'La prise de Carthage',
      lede: "Ce que Rome a fait, et ce qu'elle a prétendu avoir fait : la troisième guerre punique, du désarmement de la ville à l'incendie de Byrsa.",
      alt: 'Le quartier punique de la colline de Byrsa',
      caption: "Le quartier punique de Byrsa, incendié en 146"
    },
    stats: [
      { n: '3 ans', t: "de siège, de 149 au printemps 146 av. J.-C." },
      { n: '200 000', t: 'armures et 2 000 catapultes livrées à Rome avant la guerre' },
      { n: '6 jours', t: 'et six nuits de combats de rue jusqu\'à Byrsa' },
      { n: '50 000', t: 'survivants sortis de Byrsa, vendus comme esclaves' }
    ],
    cato: {
      kicker: 'Caton l\'Ancien',
      text: "Revenu d'une ambassade en Afrique, frappé par la prospérité retrouvée de Carthage, Caton termine chacun de ses discours au Sénat par cette formule. Selon Plutarque, il y exhibe des figues fraîches cueillies à Carthage trois jours plus tôt : l'ennemi est à portée de voile. Scipion Nasica plaide au contraire pour épargner la ville."
    },
    myth: {
      kicker: 'Le récit et les faits',
      title: 'Une destruction réelle, pas un effacement',
      text: "Rome a incendié et démantelé Carthage, massacré ou réduit en esclavage ses habitants. Mais le récit d'une ville « rasée » et stérilisée par le sel relève de la légende : les fouilles retrouvent la cité punique sous la ville romaine, et la culture punique a survécu des siècles.",
      cta: "L'histoire écrite par le vainqueur"
    },
    war: {
      title: 'Ce qui s\'est passé',
      cta: 'Toute la chronologie',
      events: [
        { date: '151 av. J.-C.', title: 'Le prétexte.', desc: "Carthage achève de payer son indemnité de guerre et se défend, armes à la main, contre les empiétements du roi numide Massinissa. Rome y voit une violation du traité de 201, qui lui interdit toute guerre sans son accord." },
        { date: '149 av. J.-C.', title: 'Désarmement et ultimatum.', desc: "Les consuls Manilius et Censorinus débarquent à Utique, passée du côté romain. Carthage livre 300 otages, 200 000 armures et 2 000 catapultes. Rome exige alors que la ville soit abandonnée et reconstruite à 80 stades (environ 15 km) de la mer. Les Carthaginois refusent." },
        { date: '149–148 av. J.-C.', title: 'Une ville qui se réarme.', desc: "Tout le métal disponible est fondu pour forger de nouvelles armes ; selon Appien, les femmes coupent leurs cheveux pour tresser les cordes des catapultes. Les premiers assauts romains échouent, tandis qu'Hasdrubal tient la campagne." },
        { date: '147 av. J.-C.', title: 'Scipion Émilien.', desc: "Élu consul malgré son jeune âge, le petit-fils adoptif de Scipion l'Africain resserre le blocus et fait barrer l'entrée du port par une digue. Les assiégés creusent un nouveau chenal vers la mer et lancent une flotte construite en secret." },
        { date: 'Printemps 146', title: "L'assaut final.", desc: "Les Romains s'emparent du secteur des ports puis de l'agora. Pendant six jours et six nuits, ils progressent maison par maison le long des trois rues qui montent à Byrsa, incendiant les immeubles à mesure." },
        { date: '146 av. J.-C.', title: 'La chute de Byrsa.', desc: "50 000 hommes et femmes sortent de la citadelle et se rendent. Environ 900 déserteurs romains se retranchent dans le temple d'Eshmoun et y mettent le feu. Hasdrubal se rend à Scipion." },
        { date: '146 av. J.-C.', title: 'Après la victoire.', desc: "La ville brûle plusieurs jours ; une commission de dix sénateurs fait démanteler ce qui reste et maudit le site. Le territoire devient la province romaine d'Afrique, avec Utique pour capitale ; les bibliothèques sont données aux rois numides. La même année, Rome détruit Corinthe." }
      ]
    },
    end: {
      title: 'Les derniers jours',
      aside: 'Polybe, ami et conseiller de Scipion, assiste à la chute de la ville. Appien a repris son récit.',
      hasdrubal: {
        kicker: 'Hasdrubal le Boétarque et sa femme',
        title: 'Le choix des flammes',
        text: "Chef de la défense, Hasdrubal finit par se rendre, suppliant, aux pieds de Scipion. Du haut du temple en feu, sa femme, parée de ses plus beaux vêtements, le maudit pour sa lâcheté, tue leurs deux fils et se jette avec eux dans les flammes."
      },
      scipio: {
        kicker: 'Les larmes de Scipion',
        quote: "« Un jour viendra où périra Ilion la sainte, et Priam, et le peuple de Priam à la bonne lance. »",
        text: "Devant la ville en flammes, Scipion Émilien pleure et cite ces vers de l'Iliade. À Polybe qui l'interroge, il confie craindre que le même sort frappe un jour Rome.",
        alt: "Buste dit de Scipion l'Africain",
        caption: "Buste dit de Scipion l'Africain, grand-père adoptif de Scipion Émilien"
      }
    },
    byrsa: {
      kicker: 'Byrsa',
      title: 'La citadelle, du dernier combat aux fouilles',
      paragraphs: [
        "Au sommet de la colline légendaire de Didon se dressait le temple d'Eshmoun, auquel on accédait par soixante marches. C'est là que se jouent les dernières heures de la Carthage punique.",
        "Sous Auguste, les Romains arasent le sommet pour y construire le forum de la nouvelle ville. Les déblais recouvrent les pentes — et protègent, sans le vouloir, un quartier d'habitations puniques du IIe siècle, rues et citernes comprises, retrouvé par les archéologues français à partir des années 1970."
      ],
      alt: 'La colline de Byrsa',
      caption: "La colline de Byrsa, aujourd'hui",
      cta: 'La fondation de Carthage'
    },
    cmp: {
      title: 'Mythe romain / réalité',
      labelMyth: 'MYTHE',
      labelReal: 'RÉALITÉ',
      pairs: [
        { myth: '« Carthage a été rasée jusqu\'au sol »', reality: "La ville a été incendiée et démantelée, mais pas effacée : des maisons, des rues et des citernes puniques ont été retrouvées sous les couches romaines, conservées sur plusieurs mètres de hauteur." },
        { myth: '« Du sel a été répandu pour stériliser la terre »', reality: "Aucune source antique — ni Polybe, ni Appien, ni Tite-Live — ne mentionne cet épisode. Il apparaît chez des auteurs modernes, aux XIXe et XXe siècles. Le sel était d'ailleurs une denrée précieuse." },
        { myth: '« La civilisation carthaginoise a disparu »', reality: "Le punique était encore parlé au Ve siècle apr. J.-C. Des villes d'Afrique romaine gardèrent des suffètes, et les cultes puniques survécurent sous des noms romains." },
        { myth: '« Carthage n\'a jamais été reconstruite »', reality: "Après l'échec de Caius Gracchus (122 av. J.-C.), César décide la refondation, réalisée sous Auguste : Carthage devient la capitale de l'Afrique romaine et l'une des plus grandes villes de l'Empire." }
      ]
    },
    evidence: {
      title: 'Les preuves archéologiques',
      subtitle: 'Ce que disent réellement les fouilles, notamment celles de la campagne UNESCO « Sauvons Carthage » (1972–1995).',
      items: [
        { kick: '44 – 29 av. J.-C.', title: 'Une refondation sur place', desc: "Colonia Iulia Concordia Carthago est bâtie exactement sur le site punique, pour ses ports et sa position. La malédiction de 146 n'a pas résisté un siècle.", cls: 'tile--purple' },
        { kick: 'Stratigraphie', title: 'Des structures puniques conservées', desc: "Murs, sols et citernes puniques apparaissent sous les couches romaines. À Byrsa, une épaisse couche d'incendie date précisément la prise de 146.", cls: '' },
        { kick: 'Textes', title: 'Le mythe du sel', desc: "Aucun auteur antique ne parle de sel répandu sur Carthage : l'épisode est une invention moderne, peut-être inspirée de récits bibliques ou médiévaux.", cls: 'tile--sand' },
        { kick: 'Langue', title: 'Une continuité culturelle', desc: "Inscriptions néopuniques, noms de personnes, cultes : la culture punique perdure. Saint Augustin atteste encore l'usage de la langue vers 400 apr. J.-C.", cls: '' },
        { kick: 'Ports', title: 'Le port circulaire', desc: "Le plan du Cothon a traversé les siècles : les Romains ont réaménagé le port militaire punique, dont les fouilles ont retrouvé les cales à navires.", cls: 'tile--navy' },
        { kick: 'Urbanisme', title: 'Un nouveau quadrillage', desc: "Les Romains tracent un nouveau plan orthogonal et arasent le sommet de Byrsa — ce qui a paradoxalement préservé le quartier punique enfoui sous les remblais.", cls: '' }
      ]
    },
    cont: {
      kicker: 'Après 146',
      title: 'La continuité de Carthage',
      cta: 'Carthage et la Tunisie',
      items: [
        { key: 'Ve s.', title: 'La langue punique', desc: "Parlée jusqu'au Ve siècle apr. J.-C., près de six siècles après la prise de Carthage. Saint Augustin en témoigne." },
        { key: '29 av. J.-C.', title: 'Carthage romaine', desc: "Refondée sur le même site, elle devient capitale de l'Afrique proconsulaire, avec amphithéâtre, cirque et thermes monumentaux." },
        { key: 'Ifriqiya', title: 'Un nom qui demeure', desc: "Le nom arabe du pays, Ifriqiya, vient du latin Africa, qui désignait d'abord le territoire de Carthage." },
        { key: '1979', title: 'UNESCO', desc: "Le site archéologique de Carthage est inscrit au patrimoine mondial de l'UNESCO." }
      ]
    },
    today: {
      title: "Carthage aujourd'hui",
      cta: 'Carte animée',
      items: [
        { img: 'ruins.jpg', alt: "Ruines des thermes d'Antonin au bord de la mer", caption: "Ruines des thermes d'Antonin, au bord de la Méditerranée" },
        { img: 'baths.jpg', alt: "Les thermes d'Antonin", caption: "Les thermes d'Antonin (IIe s. apr. J.-C.), parmi les plus vastes de l'Empire romain" }
      ]
    },
    more: {
      title: 'À lire aussi',
      items: [
        { to: '/guerres-puniques', kick: '264 – 146 av. J.-C.', title: 'Les guerres puniques', text: 'Trois guerres, un siècle de conflit pour la Méditerranée.', cls: 'tile--terra' },
        { to: '/fondation', kick: '814 av. J.-C.', title: 'La fondation', text: 'Élyssa, la peau de bœuf et la colline de Byrsa.', cls: 'tile--purple' },
        { to: '/chronologie', kick: 'Chronologie', title: "Sept siècles d'histoire", text: 'Toutes les grandes dates de Carthage, époque par époque.', cls: '' }
      ]
    }
  },

  en: {
    meta: {
      title: 'The capture of Carthage — 149-146 BC',
      desc: 'The Third Punic War: disarmament, a three-year siege, Scipio Aemilianus, the fall of Byrsa, Hasdrubal and his wife, the salt myth and the Roman refoundation.'
    },
    hero: {
      chip: '149 – 146 BC',
      title: 'The capture of Carthage',
      lede: 'What Rome did, and what it claimed to have done: the Third Punic War, from the disarming of the city to the burning of Byrsa.',
      alt: 'The Punic quarter on the hill of Byrsa',
      caption: 'The Punic quarter of Byrsa, burnt in 146'
    },
    stats: [
      { n: '3 years', t: 'of siege, from 149 to the spring of 146 BC' },
      { n: '200,000', t: 'suits of armour and 2,000 catapults handed to Rome before the war' },
      { n: '6 days', t: 'and six nights of street fighting up to Byrsa' },
      { n: '50,000', t: 'survivors who came out of Byrsa, sold into slavery' }
    ],
    cato: {
      kicker: 'Cato the Elder',
      text: "Back from an embassy to Africa, struck by Carthage's renewed prosperity, Cato ends every speech in the Senate with this phrase. According to Plutarch, he showed fresh figs picked in Carthage three days earlier: the enemy was within sailing distance. Scipio Nasica, by contrast, argued for sparing the city."
    },
    myth: {
      kicker: 'The story and the facts',
      title: 'A real destruction, not an erasure',
      text: 'Rome burnt and dismantled Carthage, and killed or enslaved its people. But the tale of a city "razed" and sterilised with salt is legend: excavations find the Punic city beneath the Roman one, and Punic culture survived for centuries.',
      cta: 'History written by the victor'
    },
    war: {
      title: 'What happened',
      cta: 'Full timeline',
      events: [
        { date: '151 BC', title: 'The pretext.', desc: "Carthage finishes paying its war indemnity and defends itself, arms in hand, against the encroachments of the Numidian king Masinissa. Rome calls this a breach of the treaty of 201, which forbade it any war without Rome's consent." },
        { date: '149 BC', title: 'Disarmament and ultimatum.', desc: 'The consuls Manilius and Censorinus land at Utica, which has gone over to Rome. Carthage hands over 300 hostages, 200,000 suits of armour and 2,000 catapults. Rome then demands that the city be abandoned and rebuilt 80 stades (about 15 km) from the sea. The Carthaginians refuse.' },
        { date: '149–148 BC', title: 'A city rearms.', desc: 'Every scrap of metal is melted down to forge new weapons; according to Appian, the women cut off their hair to braid catapult ropes. The first Roman assaults fail, while Hasdrubal holds the countryside.' },
        { date: '147 BC', title: 'Scipio Aemilianus.', desc: 'Elected consul despite his youth, the adoptive grandson of Scipio Africanus tightens the blockade and blocks the harbour entrance with a mole. The besieged dig a new channel to the sea and launch a fleet built in secret.' },
        { date: 'Spring 146', title: 'The final assault.', desc: 'The Romans seize the harbour area, then the agora. For six days and six nights they advance house by house along the three streets leading up to Byrsa, setting the buildings alight as they go.' },
        { date: '146 BC', title: 'The fall of Byrsa.', desc: '50,000 men and women leave the citadel and surrender. About 900 Roman deserters barricade themselves in the temple of Eshmun and set it on fire. Hasdrubal surrenders to Scipio.' },
        { date: '146 BC', title: 'After the victory.', desc: "The city burns for days; a commission of ten senators has what remains dismantled and places a curse on the site. The territory becomes the Roman province of Africa, with Utica as its capital; the libraries are given to the Numidian kings. The same year, Rome destroys Corinth." }
      ]
    },
    end: {
      title: 'The last days',
      aside: "Polybius, Scipio's friend and adviser, witnessed the fall of the city. Appian drew on his account.",
      hasdrubal: {
        kicker: 'Hasdrubal the Boetharch and his wife',
        title: 'The choice of the flames',
        text: 'Commander of the defence, Hasdrubal finally surrenders, as a suppliant, at the feet of Scipio. From the top of the burning temple, his wife, dressed in her finest clothes, curses him for his cowardice, kills their two sons and throws herself with them into the flames.'
      },
      scipio: {
        kicker: 'The tears of Scipio',
        quote: '"A day will come when sacred Ilion shall perish, and Priam, and the people of Priam of the good ash spear."',
        text: 'Before the burning city, Scipio Aemilianus weeps and quotes these lines from the Iliad. When Polybius asks him why, he confides his fear that the same fate may one day strike Rome.',
        alt: 'Bust said to be of Scipio Africanus',
        caption: 'Bust said to be of Scipio Africanus, adoptive grandfather of Scipio Aemilianus'
      }
    },
    byrsa: {
      kicker: 'Byrsa',
      title: 'The citadel, from the last stand to the excavations',
      paragraphs: [
        "On the summit of Dido's legendary hill stood the temple of Eshmun, reached by sixty steps. There the last hours of Punic Carthage were played out.",
        'Under Augustus, the Romans levelled the summit to build the forum of the new city. The spoil covered the slopes — and unwittingly protected a 2nd-century Punic residential quarter, streets and cisterns included, uncovered by French archaeologists from the 1970s onwards.'
      ],
      alt: 'The hill of Byrsa',
      caption: 'The hill of Byrsa today',
      cta: 'The foundation of Carthage'
    },
    cmp: {
      title: 'Roman myth / reality',
      labelMyth: 'MYTH',
      labelReal: 'REALITY',
      pairs: [
        { myth: '"Carthage was razed to the ground"', reality: 'The city was burnt and dismantled, but not erased: Punic houses, streets and cisterns have been found beneath the Roman layers, preserved several metres high.' },
        { myth: '"Salt was sown to sterilise the soil"', reality: 'No ancient source — not Polybius, Appian or Livy — mentions it. The story appears in modern writers of the 19th and 20th centuries. Salt was, besides, a precious commodity.' },
        { myth: '"Carthaginian civilisation vanished"', reality: 'Punic was still spoken in the 5th century AD. Towns in Roman Africa kept their suffetes, and Punic cults survived under Roman names.' },
        { myth: '"Carthage was never rebuilt"', reality: 'After the failure of Gaius Gracchus (122 BC), Caesar decided on the refoundation, carried out under Augustus: Carthage became the capital of Roman Africa and one of the largest cities of the Empire.' }
      ]
    },
    evidence: {
      title: 'Archaeological evidence',
      subtitle: 'What the excavations actually show, notably those of the UNESCO "Save Carthage" campaign (1972–1995).',
      items: [
        { kick: '44 – 29 BC', title: 'A refoundation on site', desc: 'Colonia Iulia Concordia Carthago was built exactly on the Punic site, for its harbours and its position. The curse of 146 did not last a century.', cls: 'tile--purple' },
        { kick: 'Stratigraphy', title: 'Punic structures preserved', desc: 'Punic walls, floors and cisterns appear beneath the Roman layers. On Byrsa, a thick burn layer precisely dates the capture of 146.', cls: '' },
        { kick: 'Texts', title: 'The salt myth', desc: 'No ancient author speaks of salt spread over Carthage: the episode is a modern invention, perhaps inspired by biblical or medieval stories.', cls: 'tile--sand' },
        { kick: 'Language', title: 'Cultural continuity', desc: 'Neo-Punic inscriptions, personal names, cults: Punic culture lived on. Saint Augustine still attests the use of the language around AD 400.', cls: '' },
        { kick: 'Harbours', title: 'The circular harbour', desc: 'The plan of the Cothon survived the centuries: the Romans refitted the Punic naval harbour, whose ship sheds have been found by excavation.', cls: 'tile--navy' },
        { kick: 'Town planning', title: 'A new grid', desc: 'The Romans laid out a new orthogonal plan and levelled the top of Byrsa — which paradoxically preserved the Punic quarter buried beneath the fill.', cls: '' }
      ]
    },
    cont: {
      kicker: 'After 146',
      title: 'The continuity of Carthage',
      cta: 'Carthage and Tunisia',
      items: [
        { key: '5th c.', title: 'The Punic language', desc: 'Spoken until the 5th century AD, nearly six centuries after the capture of Carthage. Saint Augustine bears witness to it.' },
        { key: '29 BC', title: 'Roman Carthage', desc: 'Refounded on the same site, it became the capital of Africa Proconsularis, with an amphitheatre, a circus and monumental baths.' },
        { key: 'Ifriqiya', title: 'A name that endures', desc: 'The Arabic name of the country, Ifriqiya, comes from the Latin Africa, which first referred to the territory of Carthage.' },
        { key: '1979', title: 'UNESCO', desc: 'The archaeological site of Carthage is inscribed on the UNESCO World Heritage List.' }
      ]
    },
    today: {
      title: 'Carthage today',
      cta: 'Animated map',
      items: [
        { img: 'ruins.jpg', alt: 'Ruins of the Antonine Baths by the sea', caption: 'Ruins of the Antonine Baths, on the Mediterranean shore' },
        { img: 'baths.jpg', alt: 'The Antonine Baths', caption: 'The Antonine Baths (2nd c. AD), among the largest in the Roman Empire' }
      ]
    },
    more: {
      title: 'Read also',
      items: [
        { to: '/guerres-puniques', kick: '264 – 146 BC', title: 'The Punic Wars', text: 'Three wars, a century of conflict over the Mediterranean.', cls: 'tile--terra' },
        { to: '/fondation', kick: '814 BC', title: 'The foundation', text: 'Elissa, the oxhide and the hill of Byrsa.', cls: 'tile--purple' },
        { to: '/chronologie', kick: 'Timeline', title: 'Seven centuries of history', text: 'All the key dates of Carthage, era by era.', cls: '' }
      ]
    }
  },

  ar: {
    meta: {
      title: 'الاستيلاء على قرطاج — 149-146 ق.م',
      desc: 'الحرب البونيقية الثالثة: نزع السلاح، وحصار دام ثلاث سنوات، وسكيبيو إيميليانوس، وسقوط بيرصا، وصدربعل وزوجته، وأسطورة الملح، وإعادة التأسيس الرومانية.'
    },
    hero: {
      chip: '149 – 146 ق.م',
      title: 'الاستيلاء على قرطاج',
      lede: 'ما فعلته روما، وما ادّعت أنها فعلته: الحرب البونيقية الثالثة، من نزع سلاح المدينة إلى إحراق بيرصا.',
      alt: 'الحي البوني على تلة بيرصا',
      caption: 'الحي البوني في بيرصا، أُحرق سنة 146'
    },
    stats: [
      { n: '3 سنوات', t: 'من الحصار، من 149 إلى ربيع 146 ق.م' },
      { n: '200,000', t: 'درع و2,000 منجنيق سُلّمت لروما قبل الحرب' },
      { n: '6 أيام', t: 'وست ليالٍ من قتال الشوارع حتى بيرصا' },
      { n: '50,000', t: 'ناجٍ خرجوا من بيرصا وبيعوا عبيدًا' }
    ],
    cato: {
      kicker: 'كاتو الأكبر',
      text: 'عاد كاتو من سفارة إلى إفريقيا مذهولًا من ازدهار قرطاج المتجدد، فصار يختم كل خطبه في مجلس الشيوخ بهذه العبارة: «يجب تدمير قرطاج». وحسب بلوتارخوس، عرض تينًا طازجًا قُطف في قرطاج قبل ثلاثة أيام: العدو على مرمى شراع. أما سكيبيو ناسيكا فدافع عن الإبقاء على المدينة.'
    },
    myth: {
      kicker: 'الرواية والوقائع',
      title: 'تدمير حقيقي، لا محو',
      text: 'أحرقت روما قرطاج وفكّكتها، وقتلت سكانها أو استعبدتهم. لكن حكاية مدينة «سُوّيت بالأرض» وعُقّمت بالملح أسطورة: فالحفريات تجد المدينة البونية تحت المدينة الرومانية، وقد عاشت الثقافة البونية قرونًا بعدها.',
      cta: 'التاريخ الذي كتبه المنتصر'
    },
    war: {
      title: 'ما حدث فعلًا',
      cta: 'التسلسل الزمني كاملًا',
      events: [
        { date: '151 ق.م', title: 'الذريعة.', desc: 'تنهي قرطاج دفع غرامة الحرب وتدافع عن نفسها بالسلاح ضد تعديات الملك النوميدي ماسينيسا. وتعدّ روما ذلك خرقًا لمعاهدة 201 التي تمنعها من أي حرب دون موافقتها.' },
        { date: '149 ق.م', title: 'نزع السلاح والإنذار.', desc: 'ينزل القنصلان مانيليوس وسنسورينوس في أوتيكا التي انحازت إلى روما. تسلّم قرطاج 300 رهينة و200,000 درع و2,000 منجنيق. ثم تطالب روما بهجر المدينة وإعادة بنائها على بعد 80 ستاديون (نحو 15 كم) من البحر. يرفض القرطاجيون.' },
        { date: '149–148 ق.م', title: 'مدينة تتسلّح من جديد.', desc: 'يُصهر كل معدن متاح لصنع أسلحة جديدة، وحسب أبيانوس قصّت النساء شعورهن لتُجدل منها حبال المجانيق. تفشل الهجمات الرومانية الأولى، بينما يسيطر صدربعل على الأرياف.' },
        { date: '147 ق.م', title: 'سكيبيو إيميليانوس.', desc: 'يُنتخب قنصلًا رغم صغر سنه، وهو الحفيد بالتبني لسكيبيو الإفريقي، فيُحكم الحصار ويسدّ مدخل الميناء بسدّ. فيحفر المحاصَرون قناة جديدة نحو البحر ويطلقون أسطولًا بُني سرًّا.' },
        { date: 'ربيع 146', title: 'الهجوم الأخير.', desc: 'يستولي الرومان على منطقة الموانئ ثم على الساحة العامة. وطوال ستة أيام وست ليالٍ يتقدمون بيتًا بيتًا على طول الشوارع الثلاثة الصاعدة إلى بيرصا، ويحرقون المباني تباعًا.' },
        { date: '146 ق.م', title: 'سقوط بيرصا.', desc: 'يخرج 50,000 رجل وامرأة من القلعة ويستسلمون. ويتحصّن نحو 900 فارّ روماني في معبد إشمون ويضرمون فيه النار. ويستسلم صدربعل لسكيبيو.' },
        { date: '146 ق.م', title: 'بعد النصر.', desc: 'تحترق المدينة أيامًا، وتأمر لجنة من عشرة شيوخ بتفكيك ما تبقى وتلعن الموقع. تصبح الأرض ولاية إفريقيا الرومانية وعاصمتها أوتيكا، وتُهدى المكتبات إلى الملوك النوميديين. وفي السنة نفسها تدمّر روما كورنثة.' }
      ]
    },
    end: {
      title: 'الأيام الأخيرة',
      aside: 'شهد بوليبيوس، صديق سكيبيو ومستشاره، سقوط المدينة، ونقل أبيانوس روايته.',
      hasdrubal: {
        kicker: 'صدربعل البويتارخ وزوجته',
        title: 'اختيار اللهب',
        text: 'يستسلم صدربعل، قائد الدفاع، في النهاية متوسلًا عند قدمي سكيبيو. ومن أعلى المعبد المشتعل، تلعنه زوجته، وقد لبست أجمل ثيابها، على جبنه، ثم تقتل ولديهما وتلقي بنفسها معهما في اللهب.'
      },
      scipio: {
        kicker: 'دموع سكيبيو',
        quote: '«سيأتي يوم تهلك فيه طروادة المقدسة، ويهلك بريام وشعب بريام ذو الرماح الجيدة.»',
        text: 'أمام المدينة المشتعلة، يبكي سكيبيو إيميليانوس ويستشهد بهذه الأبيات من الإلياذة. وحين سأله بوليبيوس، أسرّ إليه بخوفه من أن يصيب المصير نفسه روما يومًا ما.',
        alt: 'تمثال نصفي يُنسب إلى سكيبيو الإفريقي',
        caption: 'تمثال نصفي يُنسب إلى سكيبيو الإفريقي، الجد بالتبني لسكيبيو إيميليانوس'
      }
    },
    byrsa: {
      kicker: 'بيرصا',
      title: 'القلعة، من المعركة الأخيرة إلى الحفريات',
      paragraphs: [
        'على قمة تلة ديدون الأسطورية كان يقوم معبد إشمون، يُصعد إليه بستين درجة. هناك دارت الساعات الأخيرة لقرطاج البونية.',
        'في عهد أغسطس، سوّى الرومان القمة لبناء ساحة المدينة الجديدة. فغطّت الأتربة المنحدرات — وحمت دون قصد حيًّا سكنيًا بونيًا من القرن الثاني ق.م، بشوارعه وصهاريجه، كشفه علماء آثار فرنسيون منذ سبعينيات القرن العشرين.'
      ],
      alt: 'تلة بيرصا',
      caption: 'تلة بيرصا اليوم',
      cta: 'تأسيس قرطاج'
    },
    cmp: {
      title: 'الأسطورة الرومانية / الحقيقة',
      labelMyth: 'الأسطورة',
      labelReal: 'الحقيقة',
      pairs: [
        { myth: '«قرطاج سُوّيت بالأرض»', reality: 'أُحرقت المدينة وفُكّكت، لكنها لم تُمحَ: فقد وُجدت بيوت وشوارع وصهاريج بونية تحت الطبقات الرومانية، محفوظة على ارتفاع عدة أمتار.' },
        { myth: '«نُثر الملح لتعقيم الأرض»', reality: 'لا يذكر ذلك أي مصدر قديم — لا بوليبيوس ولا أبيانوس ولا تيتوس ليفيوس. ظهرت القصة عند مؤلفين محدثين في القرنين 19 و20. ثم إن الملح كان سلعة ثمينة.' },
        { myth: '«الحضارة القرطاجية اختفت»', reality: 'كانت البونية ما تزال تُتكلَّم في القرن الخامس الميلادي. وحافظت مدن في إفريقيا الرومانية على الشوفيطين، واستمرت العبادات البونية تحت أسماء رومانية.' },
        { myth: '«قرطاج لم يُعَد بناؤها أبدًا»', reality: 'بعد فشل غايوس غراكوس (122 ق.م)، قرّر قيصر إعادة التأسيس ونُفّذت في عهد أغسطس: صارت قرطاج عاصمة إفريقيا الرومانية ومن أكبر مدن الإمبراطورية.' }
      ]
    },
    evidence: {
      title: 'الأدلة الأثرية',
      subtitle: 'ما تقوله الحفريات فعلًا، ولا سيما حفريات حملة اليونسكو «لننقذ قرطاج» (1972–1995).',
      items: [
        { kick: '44 – 29 ق.م', title: 'إعادة تأسيس في الموقع نفسه', desc: 'بُنيت «كولونيا يوليا كونكورديا قرطاج» على الموقع البوني تمامًا، لموانئه وموقعه. ولم تصمد لعنة 146 قرنًا واحدًا.', cls: 'tile--purple' },
        { kick: 'علم الطبقات', title: 'هياكل بونية محفوظة', desc: 'تظهر جدران وأرضيات وصهاريج بونية تحت الطبقات الرومانية. وفي بيرصا تؤرّخ طبقة حريق سميكة الاستيلاءَ سنة 146 بدقة.', cls: '' },
        { kick: 'النصوص', title: 'أسطورة الملح', desc: 'لا يتحدث أي مؤلف قديم عن ملح نُثر على قرطاج: الحكاية اختراع حديث، ربما استُلهم من قصص توراتية أو وسيطة.', cls: 'tile--sand' },
        { kick: 'اللغة', title: 'استمرارية ثقافية', desc: 'نقائش بونية حديثة، وأسماء أشخاص، وعبادات: استمرت الثقافة البونية. ويشهد القديس أوغسطين على استعمال اللغة نحو سنة 400 م.', cls: '' },
        { kick: 'الموانئ', title: 'الميناء الدائري', desc: 'عبر مخطط الكوثون القرون: أعاد الرومان تهيئة الميناء العسكري البوني، وكشفت الحفريات أحواض سفنه.', cls: 'tile--navy' },
        { kick: 'العمران', title: 'شبكة جديدة', desc: 'رسم الرومان مخططًا متعامدًا جديدًا وسوّوا قمة بيرصا — ما حفظ، على نحو مفارق، الحي البوني المدفون تحت الردم.', cls: '' }
      ]
    },
    cont: {
      kicker: 'بعد 146',
      title: 'استمرارية قرطاج',
      cta: 'قرطاج وتونس',
      items: [
        { key: 'ق 5 م', title: 'اللغة البونية', desc: 'بقيت متداولة حتى القرن الخامس الميلادي، بعد نحو ستة قرون من الاستيلاء على قرطاج، ويشهد على ذلك القديس أوغسطين.' },
        { key: '29 ق.م', title: 'قرطاج الرومانية', desc: 'أُعيد تأسيسها في الموقع نفسه، فصارت عاصمة إفريقيا البروقنصلية، بمدرّج وميدان سباق وحمامات ضخمة.' },
        { key: 'إفريقية', title: 'اسم باقٍ', desc: 'الاسم العربي «إفريقية» مأخوذ من اللاتينية «أفريكا» التي كانت تدل أولًا على أرض قرطاج.' },
        { key: '1979', title: 'اليونسكو', desc: 'أُدرج موقع قرطاج الأثري في قائمة التراث العالمي لليونسكو.' }
      ]
    },
    today: {
      title: 'قرطاج اليوم',
      cta: 'الخريطة المتحركة',
      items: [
        { img: 'ruins.jpg', alt: 'أطلال حمامات أنطونيوس على شاطئ البحر', caption: 'أطلال حمامات أنطونيوس على ضفة المتوسط' },
        { img: 'baths.jpg', alt: 'حمامات أنطونيوس', caption: 'حمامات أنطونيوس (القرن 2 م)، من أكبر حمامات الإمبراطورية الرومانية' }
      ]
    },
    more: {
      title: 'اقرأ أيضًا',
      items: [
        { to: '/guerres-puniques', kick: '264 – 146 ق.م', title: 'الحروب البونيقية', text: 'ثلاث حروب وقرن من الصراع على المتوسط.', cls: 'tile--terra' },
        { to: '/fondation', kick: '814 ق.م', title: 'التأسيس', text: 'عليسة وجلد الثور وتلة بيرصا.', cls: 'tile--purple' },
        { to: '/chronologie', kick: 'التسلسل الزمني', title: 'سبعة قرون من التاريخ', text: 'كل التواريخ الكبرى لقرطاج، حقبة بعد حقبة.', cls: '' }
      ]
    }
  }
}

const c = computed(() => C[locale.value] || C.fr)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.stat-text { font: 500 15px/1.45 var(--font-body); margin-top: 10px; }

.quote { margin: 0 0 20px; }
.quote p {
  font: 900 clamp(34px, 4.4vw, 64px)/0.95 var(--font-display);
  letter-spacing: -0.03em;
  color: var(--purple);
}
.quote--sm p { font: 700 clamp(19px, 1.6vw, 23px)/1.3 var(--font-display); letter-spacing: 0; color: var(--ink); }
.cato-text { max-width: 640px; color: var(--stone); }
.myth-title { margin-bottom: 16px; }

.war-rows .ev-title { display: block; font: 800 19px/1.2 var(--font-display); color: var(--white); margin-bottom: 4px; }
.war-rows .val { color: var(--on-dark-2); }

.end { padding-top: 0; }
.end-h { margin-bottom: 12px; }
.scipio-fig { min-height: 420px; }

.byrsa-fig { min-height: 520px; }
.byrsa-title { margin-bottom: 20px; }
.byrsa-p + .byrsa-p { margin-top: 14px; }
.byrsa-cta { margin-top: 24px; }

.cmp-title { margin-bottom: 28px; }
.cmp-labels { margin-bottom: 12px; font: 800 14px/1 var(--font-body); letter-spacing: 0.08em; }
[dir="rtl"] .cmp-labels { letter-spacing: 0; }
.cmp-labels span { padding-inline: 28px; }
.lbl-myth { color: var(--stone); }
.lbl-real { color: var(--purple); }
.cmp { display: flex; flex-direction: column; gap: var(--gap); }
.pair .tile { border-radius: var(--r-md); }
.pair .h-card { margin: 0; }
.tag-myth, .tag-real { display: none; }
.real { color: var(--ink); }

.ev { min-height: 220px; }
.tile--navy .kicker, .tile--purple .kicker { opacity: 1; }

.cont { border-top: 3px solid var(--gold); padding-top: 16px; }
.cont-key { font: 900 22px/1 var(--font-display); color: var(--gold-light); margin-bottom: 10px; }
.cont-h { font: 800 19px/1.15 var(--font-display); margin: 0 0 6px; }
.tile--navy .sec-head .h-section { margin: 0; }

.today-fig { min-height: 380px; }
.more-title { margin-bottom: 20px; }
.more { min-height: 200px; }

@media (max-width: 1100px) {
  .tile--navy .cols-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px var(--gap); }
}

@media (max-width: 960px) {
  .byrsa-fig { min-height: 360px; }
  .scipio-fig { min-height: 360px; }
}

@media (max-width: 640px) {
  .fig--hero { min-height: 240px; }
  .stat { padding: 18px; }
  .stat .num { font-size: 30px; }
  .stat-text { font-size: 13px; }
  .war-rows .ev-title { font-size: 17px; }
  .cmp-labels { display: none; }
  .tag-myth, .tag-real { display: block; }
  .tag-myth { color: var(--stone); }
  .pair .tile { padding: 22px; }
  .ev, .more { min-height: 0; }
  .tile--navy .cols-4 { grid-template-columns: minmax(0, 1fr); }
  .today-fig, .byrsa-fig, .scipio-fig { min-height: 280px; }
}
</style>
