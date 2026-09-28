<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--terra tile--stack tile--hero s-5">
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display hero-title">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-7" style="background:#8E3720">
        <img src="/img/wall-cartagena.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Filtres -->
    <section class="sec sec--wide filters-sec">
      <h2 class="h-section sr-title">{{ c.gridTitle }}</h2>
      <div class="pill-row" role="group" :aria-label="c.filterLabel">
        <button
          v-for="f in filters"
          :key="f.key"
          type="button"
          class="pill-btn"
          :class="{ on: filter === f.key }"
          :aria-pressed="filter === f.key"
          @click="filter = f.key"
        >{{ f.label }}</button>
      </div>
      <p class="sr-only" aria-live="polite">{{ liveText }}</p>
    </section>

    <!-- Grille des lieux -->
    <div v-if="filter !== 'names'" class="bento places">
      <article
        v-for="p in visible"
        :key="p.id"
        class="card-img place"
        :class="p.wide ? 'place--wide s-6' : 's-3'"
      >
        <img :src="p.img" :alt="p.alt" loading="lazy">
        <div class="card-body">
          <div class="chips place-chips">
            <span v-for="ch in p.chips" :key="ch" class="chip">{{ ch }}</span>
          </div>
          <h3 class="h-card place-name">{{ p.name }}</h3>
          <div v-if="p.phoen" class="phoen place-phoen" dir="rtl" lang="phn">{{ p.phoen }}</div>
          <p>{{ p.text }}</p>
          <p v-if="p.note" class="place-note">{{ p.note }}</p>
          <NuxtLink v-if="p.to" :to="localePath(p.to)" class="place-more">{{ p.toLabel }} →</NuxtLink>
        </div>
      </article>
    </div>

    <!-- Villes qui portent le nom -->
    <section v-if="filter === 'all' || filter === 'names'" id="homonymes" class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig names-fig" style="background:#1D3F66">
          <img src="/img/hannibal-mo.jpg" :alt="c.names.alt" loading="lazy">
          <figcaption>{{ c.names.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--ink names">
          <div>
            <span class="kicker">{{ c.names.kicker }}</span>
            <h2 class="h-block names-title">{{ c.names.title }}</h2>
          </div>
          <div class="rows" style="--row-key:220px">
            <div v-for="r in c.names.rows" :key="r.key">
              <span class="key names-key" :class="{ gold: r.gold }">{{ r.key }}</span>
              <span class="val names-val">{{ r.val }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Carte -->
    <section class="sec">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.map.kicker }}</span>
          <h2 class="h-section">{{ c.map.title }}</h2>
        </div>
        <NuxtLink :to="localePath('/carte')" class="btn btn-outline">{{ c.map.cta }} →</NuxtLink>
      </div>
      <MapsAnimatedMap compact initial-mode="terr" :modes="['terr', 'hann']" />
    </section>

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <h2 class="h-section related-title">{{ c.relatedTitle }}</h2>
    </section>
    <div class="cols cols-3">
      <NuxtLink v-for="l in c.related" :key="l.to" :to="localePath(l.to)" class="tile tile--stack related" :class="l.cls">
        <span class="kicker">{{ l.kick }}</span>
        <div>
          <h3 class="h-card">{{ l.title }}</h3>
          <p class="body">{{ l.text }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()
const filter = ref('all')

// Ordre pensé pour la grille 12 colonnes à 1440 px (lignes complètes en vue « Tous »)
const PLACES = [
  { id: 'cartagena', cat: 'es', img: '/img/theatre-cartagena.jpg', wide: true, phoen: '𐤒𐤓𐤕𐤇𐤃𐤔𐤕', to: '/hannibal' },
  { id: 'sagunto', cat: 'es', img: '/img/sagunto.jpg', to: '/guerres-puniques' },
  { id: 'ibiza', cat: 'es', img: '/img/puig-molins.jpg' },
  { id: 'gadir', cat: 'es', img: '/img/gadir.jpg', phoen: '𐤂𐤃𐤓' },
  { id: 'akra', cat: 'es', img: '/img/hamilcar.jpg', to: '/hamilcar' },
  { id: 'byrsa', cat: 'tn', img: '/img/punic-quarter.jpg', to: '/fondation' },
  { id: 'kerkouane', cat: 'tn', img: '/img/kerkouane.jpg' },
  { id: 'tophet', cat: 'tn', img: '/img/tophet.jpg', to: '/religion' },
  { id: 'ports', cat: 'tn', img: '/img/ports.jpg', to: '/economie' },
  { id: 'bardo', cat: 'tn', img: '/img/bardo.jpg' },
  { id: 'zama', cat: 'tn', img: '/img/zama.jpg', to: '/guerres-puniques' },
  { id: 'trasimene', cat: 'it', img: '/img/trasimeno.jpg' },
  { id: 'cannae', cat: 'it', img: '/img/cannae.jpg', to: '/tactiques' },
  { id: 'marsala', cat: 'it', img: '/img/punic-ship.jpg', wide: true, to: '/armee' }
]

const C = {
  fr: {
    meta: {
      title: 'Lieux historiques et villes qui portent son nom — Carthage',
      desc: "De Carthagène à Ibiza, de Kerkouane à Trasimène, jusqu'à Hannibal (Missouri) et Cartagena de Indias : les lieux où l'on marche encore sur les traces de Carthage."
    },
    hero: {
      chip: 'Carthage · Lieux',
      title: 'Sur les traces de Carthage',
      lede: "De Carthagène à Ibiza, de Kerkouane à Trasimène — et jusqu'au Missouri.",
      alt: 'Muraille punique de Carthagène',
      caption: 'Muraille punique de Carthagène (Qart Hadasht), Espagne'
    },
    gridTitle: 'Les lieux',
    filterLabel: 'Filtrer les lieux par pays',
    filterAll: 'Tous',
    cats: { es: 'Espagne', tn: 'Tunisie', it: 'Italie' },
    filterNames: 'Villes « Hannibal » & « Carthage »',
    live: (n) => `${n} lieu${n > 1 ? 'x' : ''} affiché${n > 1 ? 's' : ''}`,
    liveNames: 'Villes qui portent le nom affichées',
    places: {
      cartagena: {
        chips: ['Espagne', '~227 av. J.-C.'],
        name: 'Carthagène',
        alt: 'Théâtre romain de Carthagène',
        text: "Fondée par Hasdrubal le Beau sous le même nom que Carthage : Qart Hadasht, « Ville nouvelle ». Capitale des Barcides en Hispanie, près de riches mines d'argent, elle fut la base d'Hannibal avant l'Italie. Scipion la prend en 209 av. J.-C. ; sa muraille punique se visite aujourd'hui.",
        note: 'Chaque septembre : fête des « Carthaginois et Romains »',
        toLabel: 'Hannibal'
      },
      sagunto: {
        chips: ['Espagne', '219 av. J.-C.'],
        name: 'Sagonte',
        alt: 'Château de Sagonte',
        text: "Alliée de Rome, assiégée huit mois par Hannibal (Tite-Live) : sa chute déclenche la deuxième guerre punique.",
        toLabel: 'Les guerres puniques'
      },
      ibiza: {
        chips: ['Espagne', 'UNESCO'],
        name: 'Ibiza (Ebusus)',
        alt: 'Nécropole du Puig des Molins, Ibiza',
        text: "Colonie punique d'Ybšm (Ibossim) ; la nécropole du Puig des Molins en garde des milliers de tombes."
      },
      gadir: {
        chips: ['Espagne', 'Atlantique'],
        name: 'Cadix (Gadir)',
        alt: 'Cadix, l’antique Gadir',
        text: "Comptoir phénicien, allié de Carthage, porte vers l'Atlantique. Avant de partir pour l'Italie, Hannibal y alla s'acquitter de ses vœux au temple de Melqart (Tite-Live)."
      },
      akra: {
        chips: ['Espagne', '~231 av. J.-C.'],
        name: 'Akra Leuké',
        alt: 'Hamilcar Barca, fondateur d’Akra Leuké',
        text: "Le « Cap Blanc », fondé par Hamilcar Barca au début de la conquête barcide de l'Hispanie ; on la situe le plus souvent à Alicante, sans certitude.",
        toLabel: 'Hamilcar'
      },
      byrsa: {
        chips: ['Tunisie', 'UNESCO'],
        name: 'Byrsa, Carthage',
        alt: 'Quartier punique de Byrsa',
        text: "L'acropole de la légende d'Élissa et de la peau de bœuf. Sur son flanc, le « quartier Hannibal » : maisons puniques du IIe s. av. J.-C.",
        toLabel: 'La fondation'
      },
      kerkouane: {
        chips: ['Tunisie', 'UNESCO'],
        name: 'Kerkouane',
        alt: 'Ruines de Kerkouane, cap Bon',
        text: "La seule cité punique retrouvée intacte, abandonnée au IIIe s. av. J.-C. et jamais reconstruite par Rome : rues, maisons et baignoires sabot."
      },
      tophet: {
        chips: ['Tunisie', 'Salammbô'],
        name: 'Le tophet',
        alt: 'Stèles du tophet de Salammbô',
        text: "Sanctuaire de Baal Hammon et de Tanit, utilisé du VIIIe s. à 146 av. J.-C. : des milliers d'urnes et de stèles, dont l'interprétation fait débat.",
        toLabel: 'La religion'
      },
      ports: {
        chips: ['Tunisie', 'Carthage'],
        name: 'Les ports puniques',
        alt: 'Les ports puniques de Carthage',
        text: "Le port circulaire abritait la flotte de guerre — 220 loges selon Appien — et le port rectangulaire, le commerce.",
        toLabel: "L'économie"
      },
      bardo: {
        chips: ['Tunisie', 'Tunis'],
        name: 'Musée du Bardo',
        alt: 'Musée national du Bardo, Tunis',
        text: "Stèles du tophet, masques, bijoux et amulettes : l'une des grandes collections puniques au monde."
      },
      zama: {
        chips: ['Tunisie', '202 av. J.-C.'],
        name: 'Zama',
        alt: 'La bataille de Zama, gravure de Cornelis Cort',
        text: "Scipion y bat Hannibal. Le site exact reste discuté, dans le nord-ouest de la Tunisie actuelle.",
        toLabel: 'Les guerres puniques'
      },
      trasimene: {
        chips: ['Italie', '217 av. J.-C.'],
        name: 'Lac Trasimène',
        alt: 'Lac Trasimène',
        text: "Le théâtre de la plus grande embuscade de l'Antiquité : le consul Flaminius y périt avec environ 15 000 Romains."
      },
      cannae: {
        chips: ['Italie', '216 av. J.-C.'],
        name: 'Cannes',
        alt: 'Site de la bataille de Cannes, Pouilles',
        text: "Le double enveloppement d'Hannibal : selon Polybe, environ 70 000 Romains y trouvent la mort.",
        toLabel: 'Les tactiques'
      },
      marsala: {
        chips: ['Italie · Sicile', '397–241 av. J.-C.'],
        name: 'Marsala (Lilybée)',
        alt: 'Épave du navire punique de Marsala',
        text: "Fondée après la destruction de Motyé, la forteresse punique de Sicile résista au siège romain jusqu'en 241. Son musée expose l'épave d'un navire de guerre punique découverte en 1971.",
        toLabel: "L'armée"
      }
    },
    names: {
      alt: 'Main Street, Hannibal (Missouri)',
      caption: 'Main Street — Hannibal, Missouri (États-Unis)',
      kicker: "Un nom qui a traversé l'Atlantique",
      title: 'Des villes appelées Hannibal… et Carthage',
      rows: [
        { key: 'Hannibal, Missouri', val: "Doit son nom au ruisseau « Hannibal », baptisé en 1800 par le géomètre Antonio Soulard en hommage au général. C'est aussi la ville d'enfance de Mark Twain." },
        { key: 'Hannibal, New York', val: "L'une des communes à noms antiques du « Military Tract », aux côtés de Troy, Ithaca ou Syracuse." },
        { key: 'Les « Carthage »', val: "Missouri, Texas, New York, Illinois, Tennessee… plus d'une dizaine de villes américaines portent le nom de la cité punique." },
        { key: 'Cartagena de Indias', gold: true, val: "La ville colombienne, fondée en 1533, tient son nom de Carthagène d'Espagne — donc, en remontant, de Qart Hadasht." }
      ]
    },
    map: {
      kicker: '814 – 146 av. J.-C.',
      title: "L'espace carthaginois",
      cta: 'Ouvrir la carte animée'
    },
    relatedTitle: 'À lire aussi',
    related: [
      { to: '/carte', kick: 'Carte animée', title: 'Carthage et la Méditerranée', text: "Territoires, campagne d'Hannibal, voyages d'Hannon et d'Himilcon.", cls: 'tile--navy' },
      { to: '/tunisie', kick: 'Aujourd’hui', title: 'Carthage vit en Tunisie', text: "Du nom de l'Afrique au palais de Carthage : une continuité tunisienne.", cls: '' },
      { to: '/richesse-rome', kick: 'Économie & politique', title: 'Trop riche pour Rome', text: "Pourquoi la prospérité de Carthage exaspérait Rome.", cls: 'tile--gold' }
    ]
  },
  en: {
    meta: {
      title: 'Historic sites and the towns that bear its name — Carthage',
      desc: 'From Cartagena to Ibiza, from Kerkouane to Trasimene, all the way to Hannibal (Missouri) and Cartagena de Indias: the places where you can still walk in the footsteps of Carthage.'
    },
    hero: {
      chip: 'Carthage · Places',
      title: 'In the footsteps of Carthage',
      lede: 'From Cartagena to Ibiza, from Kerkouane to Trasimene — and all the way to Missouri.',
      alt: 'Punic wall of Cartagena',
      caption: 'Punic wall of Cartagena (Qart Hadasht), Spain'
    },
    gridTitle: 'The places',
    filterLabel: 'Filter places by country',
    filterAll: 'All',
    cats: { es: 'Spain', tn: 'Tunisia', it: 'Italy' },
    filterNames: '"Hannibal" & "Carthage" towns',
    live: (n) => `${n} place${n > 1 ? 's' : ''} shown`,
    liveNames: 'Towns bearing the name shown',
    places: {
      cartagena: {
        chips: ['Spain', 'c. 227 BC'],
        name: 'Cartagena',
        alt: 'Roman theatre of Cartagena',
        text: 'Founded by Hasdrubal the Fair under the same name as Carthage: Qart Hadasht, "New City". Capital of the Barcids in Iberia, close to rich silver mines, it was Hannibal\'s base before Italy. Scipio took it in 209 BC; its Punic wall can be visited today.',
        note: 'Every September: the "Carthaginians and Romans" festival',
        toLabel: 'Hannibal'
      },
      sagunto: {
        chips: ['Spain', '219 BC'],
        name: 'Saguntum',
        alt: 'Castle of Sagunto',
        text: "An ally of Rome, besieged for eight months by Hannibal (Livy): its fall sparked the Second Punic War.",
        toLabel: 'The Punic Wars'
      },
      ibiza: {
        chips: ['Spain', 'UNESCO'],
        name: 'Ibiza (Ebusus)',
        alt: 'Puig des Molins necropolis, Ibiza',
        text: 'The Punic colony of Ybšm (Ibossim); the Puig des Molins necropolis holds thousands of its tombs.'
      },
      gadir: {
        chips: ['Spain', 'Atlantic'],
        name: 'Cádiz (Gadir)',
        alt: 'Cádiz, ancient Gadir',
        text: "A Phoenician trading post, Carthage's ally and its gateway to the Atlantic. Before leaving for Italy, Hannibal went there to fulfil his vows at the temple of Melqart (Livy)."
      },
      akra: {
        chips: ['Spain', 'c. 231 BC'],
        name: 'Akra Leuke',
        alt: 'Hamilcar Barca, founder of Akra Leuke',
        text: 'The "White Cape", founded by Hamilcar Barca early in the Barcid conquest of Iberia; it is most often placed at Alicante, though not with certainty.',
        toLabel: 'Hamilcar'
      },
      byrsa: {
        chips: ['Tunisia', 'UNESCO'],
        name: 'Byrsa, Carthage',
        alt: 'Punic quarter on Byrsa Hill',
        text: 'The acropolis of the legend of Elissa and the oxhide. On its slope, the "Hannibal quarter": Punic houses of the 2nd century BC.',
        toLabel: 'The founding'
      },
      kerkouane: {
        chips: ['Tunisia', 'UNESCO'],
        name: 'Kerkouane',
        alt: 'Ruins of Kerkouane, Cap Bon',
        text: 'The only Punic city found intact, abandoned in the 3rd century BC and never rebuilt by Rome: streets, houses and hip baths.'
      },
      tophet: {
        chips: ['Tunisia', 'Salammbô'],
        name: 'The tophet',
        alt: 'Stelae of the Salammbô tophet',
        text: 'Sanctuary of Baal Hammon and Tanit, used from the 8th century to 146 BC: thousands of urns and stelae whose interpretation is still debated.',
        toLabel: 'Religion'
      },
      ports: {
        chips: ['Tunisia', 'Carthage'],
        name: 'The Punic ports',
        alt: 'The Punic ports of Carthage',
        text: 'The circular harbour sheltered the war fleet — 220 ship sheds according to Appian — and the rectangular harbour, trade.',
        toLabel: 'The economy'
      },
      bardo: {
        chips: ['Tunisia', 'Tunis'],
        name: 'Bardo Museum',
        alt: 'Bardo National Museum, Tunis',
        text: 'Tophet stelae, masks, jewellery and amulets: one of the great Punic collections in the world.'
      },
      zama: {
        chips: ['Tunisia', '202 BC'],
        name: 'Zama',
        alt: 'The Battle of Zama, engraving by Cornelis Cort',
        text: 'Where Scipio defeated Hannibal. The exact site is still debated, in the north-west of present-day Tunisia.',
        toLabel: 'The Punic Wars'
      },
      trasimene: {
        chips: ['Italy', '217 BC'],
        name: 'Lake Trasimene',
        alt: 'Lake Trasimene',
        text: 'The scene of the greatest ambush of Antiquity: the consul Flaminius died there with some 15,000 Romans.'
      },
      cannae: {
        chips: ['Italy', '216 BC'],
        name: 'Cannae',
        alt: 'Site of the Battle of Cannae, Apulia',
        text: "Hannibal's double envelopment: according to Polybius, some 70,000 Romans died there.",
        toLabel: 'Tactics'
      },
      marsala: {
        chips: ['Italy · Sicily', '397–241 BC'],
        name: 'Marsala (Lilybaeum)',
        alt: 'Wreck of the Punic ship of Marsala',
        text: 'Founded after the destruction of Motya, the Punic fortress of Sicily held out against the Roman siege until 241. Its museum displays the wreck of a Punic warship found in 1971.',
        toLabel: 'The army'
      }
    },
    names: {
      alt: 'Main Street, Hannibal (Missouri)',
      caption: 'Main Street — Hannibal, Missouri (United States)',
      kicker: 'A name that crossed the Atlantic',
      title: 'Towns called Hannibal… and Carthage',
      rows: [
        { key: 'Hannibal, Missouri', val: 'Named after Hannibal Creek, christened in 1800 by the surveyor Antonio Soulard in honour of the general. It is also Mark Twain\'s boyhood town.' },
        { key: 'Hannibal, New York', val: 'One of the classically named towns of the "Military Tract", alongside Troy, Ithaca and Syracuse.' },
        { key: 'The "Carthages"', val: 'Missouri, Texas, New York, Illinois, Tennessee… more than a dozen American towns bear the name of the Punic city.' },
        { key: 'Cartagena de Indias', gold: true, val: 'The Colombian city, founded in 1533, takes its name from Cartagena in Spain — and so, ultimately, from Qart Hadasht.' }
      ]
    },
    map: {
      kicker: '814 – 146 BC',
      title: 'The Carthaginian world',
      cta: 'Open the animated map'
    },
    relatedTitle: 'Read also',
    related: [
      { to: '/carte', kick: 'Animated map', title: 'Carthage and the Mediterranean', text: "Territories, Hannibal's campaign, the voyages of Hanno and Himilco.", cls: 'tile--navy' },
      { to: '/tunisie', kick: 'Today', title: 'Carthage lives in Tunisia', text: 'From the name of Africa to Carthage Palace: a Tunisian continuity.', cls: '' },
      { to: '/richesse-rome', kick: 'Economy & politics', title: 'Too rich for Rome', text: "Why Carthage's prosperity exasperated Rome.", cls: 'tile--gold' }
    ]
  },
  ar: {
    meta: {
      title: 'مواقع تاريخية ومدن تحمل اسمها — قرطاج',
      desc: 'من قرطاجنة إلى إيبيزا، ومن كركوان إلى ترازيمينو، وصولًا إلى هانيبال (ميزوري) وقرطاجنة الهند: أماكن ما زلنا نسير فيها على خطى قرطاج.'
    },
    hero: {
      chip: 'قرطاج · المواقع',
      title: 'على خطى قرطاج',
      lede: 'من قرطاجنة إلى إيبيزا، ومن كركوان إلى ترازيمينو — وصولًا إلى ميزوري.',
      alt: 'السور البوني في قرطاجنة',
      caption: 'السور البوني في قرطاجنة (قرت حدشت)، إسبانيا'
    },
    gridTitle: 'المواقع',
    filterLabel: 'تصفية المواقع حسب البلد',
    filterAll: 'الكل',
    cats: { es: 'إسبانيا', tn: 'تونس', it: 'إيطاليا' },
    filterNames: 'مدن «هانيبال» و«قرطاج»',
    live: (n) => `عدد المواقع المعروضة: ${n}`,
    liveNames: 'عرض المدن التي تحمل الاسم',
    places: {
      cartagena: {
        chips: ['إسبانيا', 'نحو 227 ق.م'],
        name: 'قرطاجنة',
        alt: 'المسرح الروماني في قرطاجنة',
        text: 'أسسها صدربعل الجميل وأعطاها اسم قرطاج نفسه: قرت حدشت، «المدينة الجديدة». كانت عاصمة البرقيين في إيبيريا قرب مناجم فضة غنية، وقاعدة حنبعل قبل إيطاليا. استولى عليها سكيبيو سنة 209 ق.م، وسورها البوني مفتوح للزوار اليوم.',
        note: 'كل سبتمبر: مهرجان «القرطاجيين والرومان»',
        toLabel: 'حنبعل'
      },
      sagunto: {
        chips: ['إسبانيا', '219 ق.م'],
        name: 'ساغونتوم',
        alt: 'قلعة ساغونتو',
        text: 'حليفة روما، حاصرها حنبعل ثمانية أشهر (تيتوس ليفيوس): أشعل سقوطها الحرب البونية الثانية.',
        toLabel: 'الحروب البونية'
      },
      ibiza: {
        chips: ['إسبانيا', 'اليونسكو'],
        name: 'إيبيزا (إيبوسوس)',
        alt: 'مقبرة بويغ دي مولينس، إيبيزا',
        text: 'مستعمرة «يبشم» البونية؛ وتضم مقبرة بويغ دي مولينس آلاف القبور منها.'
      },
      gadir: {
        chips: ['إسبانيا', 'الأطلسي'],
        name: 'قادش (جادير)',
        alt: 'قادش، جادير القديمة',
        text: 'مرفأ فينيقي حليف لقرطاج وبوابتها نحو الأطلسي. قبل رحيله إلى إيطاليا، قصدها حنبعل ليفي بنذوره في معبد ملقرت (تيتوس ليفيوس).'
      },
      akra: {
        chips: ['إسبانيا', 'نحو 231 ق.م'],
        name: 'أكرا لويكي',
        alt: 'حملقار برقة، مؤسس أكرا لويكي',
        text: '«الرأس الأبيض»، أسسها حملقار برقة في بداية الفتح البرقي لإيبيريا؛ ويُرجَّح أنها في موقع أليكانتي، دون يقين.',
        toLabel: 'حملقار'
      },
      byrsa: {
        chips: ['تونس', 'اليونسكو'],
        name: 'بيرصا، قرطاج',
        alt: 'الحي البوني في بيرصا',
        text: 'أكروبول أسطورة عليسة وجلد الثور. وعلى سفحها «حي حنبعل»: بيوت بونية من القرن الثاني ق.م.',
        toLabel: 'التأسيس'
      },
      kerkouane: {
        chips: ['تونس', 'اليونسكو'],
        name: 'كركوان',
        alt: 'آثار كركوان، الوطن القبلي',
        text: 'المدينة البونية الوحيدة التي عُثر عليها سليمة، هُجرت في القرن الثالث ق.م ولم يُعِد الرومان بناءها: شوارع وبيوت وأحواض استحمام.'
      },
      tophet: {
        chips: ['تونس', 'صلامبو'],
        name: 'التوفِت',
        alt: 'أنصاب توفِت صلامبو',
        text: 'حرم بعل حمون وتانيت، استُعمل من القرن الثامن حتى 146 ق.م: آلاف الجرار والأنصاب، وتفسيرها ما زال محلّ نقاش.',
        toLabel: 'الديانة'
      },
      ports: {
        chips: ['تونس', 'قرطاج'],
        name: 'الموانئ البونية',
        alt: 'الموانئ البونية في قرطاج',
        text: 'كان الميناء الدائري يؤوي الأسطول الحربي — 220 حوضًا حسب أبيانوس — والميناء المستطيل للتجارة.',
        toLabel: 'الاقتصاد'
      },
      bardo: {
        chips: ['تونس', 'تونس العاصمة'],
        name: 'متحف باردو',
        alt: 'المتحف الوطني بباردو، تونس',
        text: 'أنصاب التوفِت، أقنعة، حليّ وتمائم: إحدى أكبر المجموعات البونية في العالم.'
      },
      zama: {
        chips: ['تونس', '202 ق.م'],
        name: 'زاما',
        alt: 'معركة زاما، نقش لكورنيليس كورت',
        text: 'هنا هزم سكيبيو حنبعل. ويبقى الموقع الدقيق محلّ نقاش، في شمال غرب تونس الحالية.',
        toLabel: 'الحروب البونية'
      },
      trasimene: {
        chips: ['إيطاليا', '217 ق.م'],
        name: 'بحيرة ترازيمينو',
        alt: 'بحيرة ترازيمينو',
        text: 'مسرح أكبر كمين في العصور القديمة: قُتل فيه القنصل فلامينيوس مع نحو 15 ألف روماني.'
      },
      cannae: {
        chips: ['إيطاليا', '216 ق.م'],
        name: 'كاناي',
        alt: 'موقع معركة كاناي، بوليا',
        text: 'التطويق المزدوج لحنبعل: حسب بوليبيوس، لقي نحو 70 ألف روماني حتفهم فيها.',
        toLabel: 'التكتيكات'
      },
      marsala: {
        chips: ['إيطاليا · صقلية', '397–241 ق.م'],
        name: 'مرسالا (ليليبايوم)',
        alt: 'حطام السفينة البونية في مرسالا',
        text: 'تأسست بعد تدمير موتيا، وصمدت القلعة البونية في صقلية أمام الحصار الروماني حتى 241. ويعرض متحفها حطام سفينة حربية بونية اكتُشفت سنة 1971.',
        toLabel: 'الجيش'
      }
    },
    names: {
      alt: 'الشارع الرئيسي، هانيبال (ميزوري)',
      caption: 'الشارع الرئيسي — هانيبال، ميزوري (الولايات المتحدة)',
      kicker: 'اسم عبر الأطلسي',
      title: 'مدن تُدعى هانيبال… وقرطاج',
      rows: [
        { key: 'هانيبال، ميزوري', val: 'تحمل اسم جدول «هانيبال» الذي سمّاه المسّاح أنطونيو سولار سنة 1800 تكريمًا للقائد. وهي أيضًا مدينة طفولة مارك توين.' },
        { key: 'هانيبال، نيويورك', val: 'إحدى البلدات ذات الأسماء القديمة في «المقاطعة العسكرية»، إلى جانب تروي وإيثاكا وسيراكيوز.' },
        { key: 'مدن «قرطاج»', val: 'ميزوري، تكساس، نيويورك، إلينوي، تينيسي… أكثر من عشر مدن أمريكية تحمل اسم المدينة البونية.' },
        { key: 'قرطاجنة الهند', gold: true, val: 'المدينة الكولومبية، التي تأسست سنة 1533، أخذت اسمها من قرطاجنة الإسبانية — أي في الأصل من قرت حدشت.' }
      ]
    },
    map: {
      kicker: '814 – 146 ق.م',
      title: 'المجال القرطاجي',
      cta: 'افتح الخريطة المتحركة'
    },
    relatedTitle: 'اقرأ أيضًا',
    related: [
      { to: '/carte', kick: 'خريطة متحركة', title: 'قرطاج والبحر المتوسط', text: 'الأراضي، حملة حنبعل، رحلات حنّون وحِملكون.', cls: 'tile--navy' },
      { to: '/tunisie', kick: 'اليوم', title: 'قرطاج تحيا في تونس', text: 'من اسم إفريقيا إلى قصر قرطاج: استمرارية تونسية.', cls: '' },
      { to: '/richesse-rome', kick: 'اقتصاد وسياسة', title: 'أغنى مما تحتمله روما', text: 'لماذا أثار ثراء قرطاج حنق روما.', cls: 'tile--gold' }
    ]
  }
}

const c = computed(() => C[locale.value] || C.fr)

const places = computed(() => PLACES.map(p => ({ ...p, ...c.value.places[p.id] })))

const filters = computed(() => {
  const count = (k) => PLACES.filter(p => p.cat === k).length
  return [
    { key: 'all', label: c.value.filterAll },
    ...['es', 'tn', 'it'].map(k => ({ key: k, label: `${c.value.cats[k]} · ${count(k)}` })),
    { key: 'names', label: c.value.filterNames }
  ]
})

const visible = computed(() => filter.value === 'all' ? places.value : places.value.filter(p => p.cat === filter.value))

const liveText = computed(() => filter.value === 'names' ? c.value.liveNames : c.value.live(visible.value.length))

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-title { font-size: clamp(44px, 5.8vw, 84px); }

.sr-only,
.sr-title {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.filters-sec { position: relative; padding-top: clamp(20px, 2vw, 28px); padding-bottom: 8px; }

/* Cartes lieux */
.place > img { height: 200px; }
.place .card-body { padding: 18px 10px 10px; display: flex; flex-direction: column; flex: 1; }
.place-chips { gap: 6px; margin-bottom: 14px; }
.place-chips .chip { font-size: 12px; padding: 8px 11px; }
.place-name { margin: 0 0 8px; font-stretch: 106%; }
.place-phoen { font-size: 18px; color: var(--purple); margin: -2px 0 12px; text-align: start; }
.place-note { margin-top: 12px; font: 500 13px/1.4 var(--font-body); color: var(--purple) !important; }
.place-more {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-top: auto;
  padding-top: 6px;
  font: 600 14px/1 var(--font-body);
  color: var(--purple);
}

/* Carte large : image + texte côte à côte */
.place--wide {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;
  padding: 12px;
}

.place--wide > img { height: 100%; min-height: 320px; }
.place--wide .card-body { padding: 16px 0 12px; padding-inline-end: 12px; }
.place--wide .place-name { font-size: clamp(26px, 2.3vw, 32px); }
.place--wide p { font-size: 15px; }

/* Homonymes */
.names-fig { min-height: 520px; }
.names { display: flex; flex-direction: column; gap: 28px; }
.names-title { font-size: clamp(32px, 3.9vw, 56px); }
.names-key { font-size: 22px; line-height: 1.1; }
.names-key.gold { color: var(--gold-light); }
.names-val { font-size: 15px; line-height: 1.5; color: var(--on-dark); }

.related-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.related { min-height: 200px; }

@media (max-width: 1100px) {
  .places .s-3 { grid-column: span 6; }
  .places .place--wide { grid-column: span 12; }
}

@media (max-width: 960px) {
  .names-fig { min-height: 380px; }
}

@media (max-width: 640px) {
  .places .s-3 { grid-column: span 12; }
  .place--wide { grid-template-columns: minmax(0, 1fr); gap: 0; padding: 10px; }
  .place--wide > img { height: 220px; min-height: 0; }
  .place--wide .card-body { padding: 18px 12px 14px; }
  .names-fig { min-height: 280px; }
  .names { gap: 16px; }
  .names-key { font-size: 19px; }
  .related { min-height: 0; }
}
</style>
