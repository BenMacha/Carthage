<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <figure class="fig fig--hero s-5">
        <img src="/img/dominus.jpg" :alt="c.heroAlt">
        <figcaption class="cap-box">{{ c.heroCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--olive tile--stack tile--hero s-7">
        <div class="hero-top">
          <span class="chip chip--glass">{{ c.chip }}</span>
          <span class="phoen hero-phoen" aria-hidden="true">𐤌𐤂𐤍</span>
        </div>
        <div>
          <p class="kicker">{{ c.dates }}</p>
          <h1 class="h-display hero-title">{{ c.title }}</h1>
          <p class="epithet">{{ c.epithet }}</p>
          <p class="lede">{{ c.lede }}</p>
        </div>
      </div>
    </div>

    <!-- Chiffres clés -->
    <div class="cols cols-4 keep-2">
      <div v-for="s in c.stats" :key="s.t" class="tile stat" :class="s.tone">
        <div class="num">{{ s.n }}</div>
        <p class="body">{{ s.t }}</p>
      </div>
    </div>

    <!-- Pourquoi Rome l'a traduit -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--stack">
          <div>
            <span class="kicker">{{ c.romeKicker }}</span>
            <h2 class="h-block block-title">{{ c.romeTitle }}</h2>
            <p v-for="(p, i) in c.romeParas" :key="i" class="body-lg para">{{ p }}</p>
          </div>
        </div>
        <blockquote class="tile tile--xl tile--paper tile--outline quote">
          <span class="kicker">{{ c.plinyKicker }}</span>
          <p class="quote-text">« {{ c.plinyQuote }} »</p>
          <cite>{{ c.plinyCite }}</cite>
        </blockquote>
      </div>
    </section>

    <!-- Transmission -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <span class="kicker">{{ c.chronoKicker }}</span>
        <h2 class="h-block block-title">{{ c.chronoTitle }}</h2>
        <div class="rows" style="--row-key: 220px">
          <div v-for="r in c.chrono" :key="r.k">
            <div class="key">{{ r.k }}</div>
            <div class="val">{{ r.v }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contenu des 28 livres -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.booksTitle }}</h2>
        <p>{{ c.booksLede }}</p>
      </div>
    </section>
    <div class="cols cols-4">
      <div v-for="b in c.books" :key="b.title" class="tile tile--stack" :class="b.tone">
        <div>
          <span class="kicker">{{ b.kicker }}</span>
          <h3 class="h-card">{{ b.title }}</h3>
          <p class="body">{{ b.text }}</p>
        </div>
      </div>
    </div>

    <!-- Préceptes -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig olive-fig">
          <img src="/img/olive.jpg" :alt="c.oliveAlt" loading="lazy">
          <figcaption>{{ c.oliveCap }}</figcaption>
        </figure>
        <div class="tile tile--xl">
          <span class="kicker">{{ c.precKicker }}</span>
          <h2 class="h-block block-title">{{ c.precTitle }}</h2>
          <div class="rows" style="--row-key: 180px">
            <div v-for="p in c.precepts" :key="p.k">
              <div class="key">{{ p.k }}</div>
              <div class="val">
                {{ p.v }}
                <span class="src">{{ p.src }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Citation Columelle + Kerkouane -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <figure class="fig kerk-fig">
          <img src="/img/kerkouane.jpg" :alt="c.kerkAlt" loading="lazy">
          <figcaption class="cap-box">{{ c.kerkCap }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--purple tile--stack">
          <blockquote class="col-quote">
            <span class="kicker">{{ c.colKicker }}</span>
            <p class="quote-text">« {{ c.colQuote }} »</p>
            <cite>{{ c.colCite }}</cite>
          </blockquote>
          <NuxtLink :to="localePath('/agriculture')" class="btn btn-outline">{{ c.agriCta }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Héritage -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.legacyTitle }}</h2>
      </div>
    </section>
    <div class="cols cols-3">
      <div v-for="l in c.legacy" :key="l.title" class="tile tile--stack" :class="l.tone">
        <div>
          <span class="kicker">{{ l.kicker }}</span>
          <h3 class="h-card">{{ l.title }}</h3>
          <p class="body">{{ l.text }}</p>
        </div>
      </div>
    </div>

    <PageSources :items="c.sources" />

    <!-- À lire aussi -->
    <section class="sec">
      <h2 class="h-block block-title">{{ c.moreTitle }}</h2>
      <div class="cols cols-3 cols--flush">
        <NuxtLink v-for="l in c.links" :key="l.to" :to="localePath(l.to)" class="tile tile--stack link-tile" :class="l.tone">
          <span class="kicker">{{ l.kicker }}</span>
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
    metaTitle: "Magon l'Agronome — le traité punique en 28 livres",
    metaDesc: "Magon, agronome carthaginois : un traité d'agriculture en 28 livres, seul ouvrage punique traduit en latin sur ordre du Sénat romain, cité par Varron, Columelle et Pline.",
    heroAlt: 'Mosaïque du Dominus Julius, musée du Bardo',
    heroCap: "Mosaïque du Dominus Julius (Bardo) : la vie d'un grand domaine africain, héritier des méthodes puniques",
    chip: 'Agronome · Carthage',
    dates: 'Date inconnue, avant 146 av. J.-C.',
    title: "Magon l'Agronome",
    epithet: "« Le père de l'agriculture » — ainsi l'appelle l'agronome romain Columelle.",
    lede: "Un Carthaginois, sans doute grand propriétaire, qui consigna en punique tout le savoir agricole de sa cité. Rome détruisit Carthage, mais fit traduire son œuvre.",
    stats: [
      { n: '28', t: 'livres rédigés en punique', tone: 'tile--olive' },
      { n: '1', t: 'seul ouvrage carthaginois traduit en latin sur ordre du Sénat' },
      { n: '20', t: 'livres dans la version grecque de Cassius Dionysius' },
      { n: '6', t: "livres dans l'abrégé de Diophane de Nicée", tone: 'tile--gold' }
    ],
    romeKicker: '146 av. J.-C.',
    romeTitle: 'Pourquoi Rome a traduit Magon',
    romeParas: [
      "Après la prise de Carthage, le Sénat romain fit don des bibliothèques de la ville aux princes africains. Il ne garda qu'une œuvre : les 28 livres de Magon, dont il ordonna la traduction en latin.",
      "La tâche fut confiée à une commission d'hommes connaissant le punique, présidée par Decimus Silanus. Pour les Romains, dont l'économie reposait sur la terre, ce savoir était trop utile pour disparaître avec la cité.",
      "Ni l'original punique ni la traduction latine ne nous sont parvenus : Magon n'existe plus qu'à travers les citations des auteurs grecs et latins."
    ],
    plinyKicker: 'Le témoignage de Pline',
    plinyQuote: "Carthage prise, notre Sénat donna ses bibliothèques aux roitelets d'Afrique ; il décréta seulement que les vingt-huit livres de Magon seraient traduits en latin.",
    plinyCite: "Pline l'Ancien, Histoire naturelle, XVIII, 22",
    chronoKicker: 'Le fil de la transmission',
    chronoTitle: 'De Carthage à Rome',
    chrono: [
      { k: 'Avant 146', v: "Magon compose ses 28 livres en punique. Sa date exacte est inconnue : on le place souvent aux IVe–IIIe siècles av. J.-C., à l'apogée de l'agriculture carthaginoise." },
      { k: '146 av. J.-C.', v: 'Chute de Carthage. Le Sénat ordonne la traduction latine, confiée à une commission présidée par Decimus Silanus.' },
      { k: '88 av. J.-C.', v: "Cassius Dionysius d'Utique en donne une version grecque en 20 livres, enrichie d'auteurs grecs." },
      { k: 'Ier s. av. J.-C.', v: 'Diophane de Nicée en tire un abrégé en 6 livres pour le roi Déiotarus de Galatie.' },
      { k: '37 av. J.-C.', v: "Varron, dans son traité De l'agriculture, place Magon en tête des auteurs de référence." },
      { k: 'Ier s. ap. J.-C.', v: "Columelle et Pline l'Ancien le citent abondamment : Columelle l'appelle « père de l'agriculture »." }
    ],
    booksTitle: 'Ce que contenaient les 28 livres',
    booksLede: "Un traité complet du grand domaine, reconstitué à partir des fragments cités par les Latins.",
    books: [
      { kicker: 'Cultures', title: "Vigne & olivier", text: "Choix des terrains, exposition, plantation, taille : l'essentiel de la richesse agricole punique.", tone: 'tile--olive' },
      { kicker: 'Vergers', title: 'Arbres fruitiers', text: 'Grenadiers, amandiers, figuiers : greffes, soins et conservation des fruits.' },
      { kicker: 'Élevage', title: 'Bœufs, mules, abeilles', text: "Choix des bêtes de labour, reproduction, apiculture et soins vétérinaires." },
      { kicker: 'Gestion', title: 'Le domaine', text: "Organisation de la main-d'œuvre, rôle du régisseur et présence du maître sur ses terres.", tone: 'tile--gold' }
    ],
    oliveAlt: 'Olivier près de Testour',
    oliveCap: 'Olivier, Testour (Tunisie)',
    precKicker: 'Fragments conservés',
    precTitle: 'Quelques préceptes de Magon',
    precepts: [
      { k: 'Le maître', v: "« Qui a acheté une terre doit vendre sa maison de ville, pour ne pas préférer les dieux lares de la ville à ceux de la campagne. »", src: 'Columelle I, 1, 18 ; Pline XVIII, 35' },
      { k: 'La vigne', v: "Planter les vignobles face au nord, pour les protéger de la chaleur africaine.", src: 'Columelle III, 12, 5' },
      { k: "L'olivier", v: 'Espacer largement les oliviers : 75 pieds en bonne terre, 45 en sol maigre ou venté.', src: 'Pline XVII, 93' },
      { k: 'Le passum', v: 'Une recette de vin doux de raisins séchés au soleil, que Columelle reproduit presque mot pour mot.', src: 'Columelle XII, 39' },
      { k: 'Les bœufs', v: 'Choisir des bœufs jeunes, trapus, aux membres solides, aux cornes longues et sombres, au front large.', src: 'Columelle VI, 1, 3' }
    ],
    kerkAlt: 'Maisons puniques de Kerkouane',
    kerkCap: 'Kerkouane, cité punique du cap Bon, au cœur des terres agricoles de Carthage',
    colKicker: 'Columelle, De re rustica',
    colQuote: "Magon le Carthaginois, père de l'agriculture.",
    colCite: 'Columelle, I, 1, 13',
    agriCta: "L'agriculture carthaginoise →",
    legacyTitle: 'Héritage',
    legacy: [
      { kicker: 'Agronomie latine', title: 'Une source majeure', text: "Varron, Columelle et Pline puisent chez Magon ; par eux, les méthodes puniques passent dans l'agronomie romaine, puis médiévale.", tone: 'tile--olive' },
      { kicker: 'Afrique romaine', title: 'Le grenier de Rome', text: "Les grands domaines de l'Afrique romaine — blé, huile, vin — prolongent un savoir-faire que Carthage avait porté à son sommet." },
      { kicker: 'Mémoire', title: 'Un nom sauvé', text: "Presque toute la littérature punique a disparu. Magon est l'un des rares auteurs carthaginois dont nous connaissons le nom et une partie de l'œuvre.", tone: 'tile--ink' }
    ],
    sources: [
      { type: 'ancient', author: 'Columelle', work: "De l'agriculture (De re rustica)", ref: 'I, 1, 13 ; I, 1, 18 ; III, 12, 5 ; VI, 1, 3 ; XII, 39', note: 'principaux fragments conservés de Magon' },
      { type: 'ancient', author: "Pline l'Ancien", work: 'Histoire naturelle', ref: 'XVII, 93 ; XVIII, 22 ; XVIII, 35', note: 'traduction ordonnée par le Sénat' },
      { type: 'ancient', author: 'Varron', work: "De l'agriculture (Res rusticae)", note: 'Magon en tête des auteurs de référence' },
      { type: 'modern', author: 'Stéphane Gsell', work: "Histoire ancienne de l'Afrique du Nord", ref: 'Hachette, 1920', note: 'ouvrage de référence de la bibliographie du site' },
      { type: 'modern', author: 'Serge Lancel', work: 'Carthage', ref: 'Fayard, 1992', note: 'ouvrage de référence de la bibliographie du site' }
    ],
    moreTitle: 'À lire aussi',
    links: [
      { to: '/agriculture', kicker: 'Terres & savoirs', title: "L'agriculture carthaginoise", text: 'Olivier, vigne et blé : les campagnes de Carthage.', tone: 'tile--olive' },
      { to: '/economie', kicker: 'Commerce', title: "L'économie punique", text: "Comptoirs, métaux et routes maritimes : la richesse de Carthage." },
      { to: '/biographies', kicker: 'Personnages', title: 'Les grandes figures', text: 'Généraux, navigateurs et reines de Carthage.', tone: 'tile--purple' }
    ]
  },
  en: {
    metaTitle: 'Mago the Agronomist — the Punic treatise in 28 books',
    metaDesc: 'Mago, Carthaginian agronomist: a 28-book treatise on agriculture, the only Punic work translated into Latin by order of the Roman Senate, cited by Varro, Columella and Pliny.',
    heroAlt: 'Dominus Julius mosaic, Bardo Museum',
    heroCap: 'The Dominus Julius mosaic (Bardo): life on a great African estate, heir to Punic methods',
    chip: 'Agronomist · Carthage',
    dates: 'Date unknown, before 146 BC',
    title: 'Mago the Agronomist',
    epithet: '“The father of agriculture” — so the Roman agronomist Columella calls him.',
    lede: 'A Carthaginian, probably a great landowner, who set down in Punic all the farming knowledge of his city. Rome destroyed Carthage, but had his work translated.',
    stats: [
      { n: '28', t: 'books written in Punic', tone: 'tile--olive' },
      { n: '1', t: 'only Carthaginian work translated into Latin by order of the Senate' },
      { n: '20', t: 'books in the Greek version by Cassius Dionysius' },
      { n: '6', t: 'books in the abridgement by Diophanes of Nicaea', tone: 'tile--gold' }
    ],
    romeKicker: '146 BC',
    romeTitle: 'Why Rome translated Mago',
    romeParas: [
      'After taking Carthage, the Roman Senate gave the city’s libraries to the African princes. It kept only one work: the 28 books of Mago, which it ordered translated into Latin.',
      'The task was entrusted to a committee of men who knew Punic, chaired by Decimus Silanus. For the Romans, whose economy rested on the land, this knowledge was too useful to vanish with the city.',
      'Neither the Punic original nor the Latin translation has survived: Mago now exists only through quotations in Greek and Latin authors.'
    ],
    plinyKicker: 'Pliny’s testimony',
    plinyQuote: 'When Carthage was taken, our Senate gave its libraries to the petty kings of Africa; it decreed only that Mago’s twenty-eight books should be translated into Latin.',
    plinyCite: 'Pliny the Elder, Natural History, XVIII, 22',
    chronoKicker: 'The thread of transmission',
    chronoTitle: 'From Carthage to Rome',
    chrono: [
      { k: 'Before 146', v: 'Mago writes his 28 books in Punic. His exact date is unknown: he is often placed in the 4th–3rd centuries BC, at the height of Carthaginian agriculture.' },
      { k: '146 BC', v: 'Fall of Carthage. The Senate orders the Latin translation, entrusted to a committee chaired by Decimus Silanus.' },
      { k: '88 BC', v: 'Cassius Dionysius of Utica produces a Greek version in 20 books, enriched with Greek authors.' },
      { k: '1st c. BC', v: 'Diophanes of Nicaea abridges it into 6 books for King Deiotarus of Galatia.' },
      { k: '37 BC', v: 'Varro, in his treatise On Agriculture, places Mago at the head of the reference authors.' },
      { k: '1st c. AD', v: 'Columella and Pliny the Elder quote him extensively: Columella calls him “the father of agriculture”.' }
    ],
    booksTitle: 'What the 28 books contained',
    booksLede: 'A complete treatise on the great estate, pieced together from the fragments quoted by Latin writers.',
    books: [
      { kicker: 'Crops', title: 'Vine & olive', text: 'Choice of land, exposure, planting, pruning: the core of Punic farm wealth.', tone: 'tile--olive' },
      { kicker: 'Orchards', title: 'Fruit trees', text: 'Pomegranates, almonds, figs: grafting, care and preserving fruit.' },
      { kicker: 'Livestock', title: 'Oxen, mules, bees', text: 'Choosing plough animals, breeding, beekeeping and veterinary care.' },
      { kicker: 'Management', title: 'The estate', text: 'Organising the workforce, the role of the steward and the master’s presence on his land.', tone: 'tile--gold' }
    ],
    oliveAlt: 'Olive tree near Testour',
    oliveCap: 'Olive tree, Testour (Tunisia)',
    precKicker: 'Surviving fragments',
    precTitle: 'Some of Mago’s precepts',
    precepts: [
      { k: 'The master', v: '“Whoever has bought land should sell his town house, so as not to prefer the household gods of the city to those of the country.”', src: 'Columella I, 1, 18; Pliny XVIII, 35' },
      { k: 'The vine', v: 'Plant vineyards facing north, to shield them from the African heat.', src: 'Columella III, 12, 5' },
      { k: 'The olive', v: 'Space olive trees widely: 75 feet in good soil, 45 in thin or windy ground.', src: 'Pliny XVII, 93' },
      { k: 'Passum', v: 'A recipe for sweet wine from sun-dried grapes, which Columella reproduces almost word for word.', src: 'Columella XII, 39' },
      { k: 'Oxen', v: 'Choose young, compact oxen with sturdy limbs, long dark horns and a broad forehead.', src: 'Columella VI, 1, 3' }
    ],
    kerkAlt: 'Punic houses at Kerkouane',
    kerkCap: 'Kerkouane, a Punic town on Cape Bon, in the heart of Carthage’s farmland',
    colKicker: 'Columella, De re rustica',
    colQuote: 'Mago the Carthaginian, the father of agriculture.',
    colCite: 'Columella, I, 1, 13',
    agriCta: 'Carthaginian agriculture →',
    legacyTitle: 'Legacy',
    legacy: [
      { kicker: 'Latin agronomy', title: 'A major source', text: 'Varro, Columella and Pliny draw on Mago; through them, Punic methods passed into Roman, then medieval, agronomy.', tone: 'tile--olive' },
      { kicker: 'Roman Africa', title: 'The granary of Rome', text: 'The great estates of Roman Africa — grain, oil, wine — carried on a know-how that Carthage had brought to its peak.' },
      { kicker: 'Memory', title: 'A name saved', text: 'Almost all Punic literature is lost. Mago is one of the few Carthaginian authors whose name and part of whose work we know.', tone: 'tile--ink' }
    ],
    sources: [
      { type: 'ancient', author: 'Columella', work: 'On Agriculture (De re rustica)', ref: 'I, 1, 13; I, 1, 18; III, 12, 5; VI, 1, 3; XII, 39', note: 'main surviving fragments of Mago' },
      { type: 'ancient', author: 'Pliny the Elder', work: 'Natural History', ref: 'XVII, 93; XVIII, 22; XVIII, 35', note: 'the translation ordered by the Senate' },
      { type: 'ancient', author: 'Varro', work: 'On Agriculture (Res rusticae)', note: 'Mago at the head of the reference authors' },
      { type: 'modern', author: 'Stéphane Gsell', work: "Histoire ancienne de l'Afrique du Nord", ref: 'Hachette, 1920', note: 'standard work from the site bibliography' },
      { type: 'modern', author: 'Serge Lancel', work: 'Carthage', ref: 'Fayard, 1992', note: 'standard work from the site bibliography' }
    ],
    moreTitle: 'Read also',
    links: [
      { to: '/agriculture', kicker: 'Land & knowledge', title: 'Carthaginian agriculture', text: 'Olive, vine and wheat: the countryside of Carthage.', tone: 'tile--olive' },
      { to: '/economie', kicker: 'Trade', title: 'The Punic economy', text: 'Trading posts, metals and sea routes: the wealth of Carthage.' },
      { to: '/biographies', kicker: 'People', title: 'The great figures', text: 'Generals, navigators and queens of Carthage.', tone: 'tile--purple' }
    ]
  },
  ar: {
    metaTitle: 'ماغون الفلاحي — الموسوعة البونيقية في 28 كتابًا',
    metaDesc: 'ماغون، عالم الفلاحة القرطاجي: موسوعة في الفلاحة من 28 كتابًا، المؤلَّف البونيقي الوحيد الذي تُرجم إلى اللاتينية بأمر من مجلس الشيوخ الروماني، واستشهد به فارون وكولوميلا وبليني.',
    heroAlt: 'فسيفساء دومينوس يوليوس، متحف باردو',
    heroCap: 'فسيفساء دومينوس يوليوس (باردو): الحياة في ضيعة إفريقية كبرى، وريثة الأساليب البونيقية',
    chip: 'عالم فلاحة · قرطاج',
    dates: 'تاريخ مجهول، قبل 146 ق.م',
    title: 'ماغون الفلاحي',
    epithet: '«أبو الفلاحة» — هكذا يسمّيه عالم الفلاحة الروماني كولوميلا.',
    lede: 'قرطاجي، كان على الأرجح من كبار ملّاك الأرض، دوّن بالبونيقية كل المعارف الفلاحية لمدينته. دمّرت روما قرطاج، لكنها أمرت بترجمة مؤلَّفه.',
    stats: [
      { n: '28', t: 'كتابًا مكتوبة بالبونيقية', tone: 'tile--olive' },
      { n: '1', t: 'المؤلَّف القرطاجي الوحيد الذي تُرجم إلى اللاتينية بأمر من مجلس الشيوخ' },
      { n: '20', t: 'كتابًا في النسخة اليونانية لكاسيوس ديونيسيوس' },
      { n: '6', t: 'كتب في مختصر ديوفانس النيقي', tone: 'tile--gold' }
    ],
    romeKicker: '146 ق.م',
    romeTitle: 'لماذا ترجمت روما ماغون',
    romeParas: [
      'بعد الاستيلاء على قرطاج، أهدى مجلس الشيوخ الروماني مكتبات المدينة إلى الأمراء الأفارقة. ولم يحتفظ إلا بمؤلَّف واحد: كتب ماغون الثمانية والعشرين، التي أمر بترجمتها إلى اللاتينية.',
      'أُسندت المهمة إلى لجنة من العارفين بالبونيقية يرأسها دقيموس سيلانوس. فبالنسبة إلى الرومان، الذين قام اقتصادهم على الأرض، كانت هذه المعرفة أنفع من أن تزول مع المدينة.',
      'لم يصلنا لا الأصل البونيقي ولا الترجمة اللاتينية: فماغون لم يعد موجودًا إلا من خلال استشهادات المؤلفين الإغريق واللاتين.'
    ],
    plinyKicker: 'شهادة بليني',
    plinyQuote: 'لما أُخذت قرطاج، أهدى مجلس شيوخنا مكتباتها إلى ملوك إفريقيا الصغار، ولم يقرّر إلا ترجمة كتب ماغون الثمانية والعشرين إلى اللاتينية.',
    plinyCite: 'بليني الأكبر، التاريخ الطبيعي، 18، 22',
    chronoKicker: 'خيط النقل',
    chronoTitle: 'من قرطاج إلى روما',
    chrono: [
      { k: 'قبل 146', v: 'يؤلف ماغون كتبه الثمانية والعشرين بالبونيقية. تاريخه الدقيق مجهول: كثيرًا ما يُنسب إلى القرنين الرابع والثالث ق.م، في أوج الفلاحة القرطاجية.' },
      { k: '146 ق.م', v: 'سقوط قرطاج. يأمر مجلس الشيوخ بالترجمة اللاتينية، ويعهد بها إلى لجنة يرأسها دقيموس سيلانوس.' },
      { k: '88 ق.م', v: 'يضع كاسيوس ديونيسيوس الأوتيكي نسخة يونانية في 20 كتابًا، أثراها بمؤلفين إغريق.' },
      { k: 'القرن 1 ق.م', v: 'يختصرها ديوفانس النيقي في 6 كتب للملك ديوتاروس ملك غلاطية.' },
      { k: '37 ق.م', v: 'يضع فارون ماغون، في كتابه «في الفلاحة»، على رأس المؤلفين المرجعيين.' },
      { k: 'القرن 1 م', v: 'يستشهد به كولوميلا وبليني الأكبر كثيرًا، ويسمّيه كولوميلا «أبا الفلاحة».' }
    ],
    booksTitle: 'ما احتوته الكتب الثمانية والعشرون',
    booksLede: 'موسوعة كاملة عن الضيعة الكبرى، أُعيد تركيبها من الشذرات التي نقلها الكتّاب اللاتين.',
    books: [
      { kicker: 'المزروعات', title: 'الكرمة والزيتون', text: 'اختيار الأرض والاتجاه والغرس والتقليم: عماد الثروة الفلاحية البونيقية.', tone: 'tile--olive' },
      { kicker: 'البساتين', title: 'الأشجار المثمرة', text: 'الرمان واللوز والتين: التطعيم والعناية وحفظ الثمار.' },
      { kicker: 'تربية الماشية', title: 'الثيران والبغال والنحل', text: 'اختيار دواب الحرث والتناسل وتربية النحل والعلاج البيطري.' },
      { kicker: 'التسيير', title: 'الضيعة', text: 'تنظيم اليد العاملة ودور الوكيل وحضور المالك في أرضه.', tone: 'tile--gold' }
    ],
    oliveAlt: 'شجرة زيتون قرب تستور',
    oliveCap: 'شجرة زيتون، تستور (تونس)',
    precKicker: 'شذرات باقية',
    precTitle: 'من وصايا ماغون',
    precepts: [
      { k: 'المالك', v: '«من اشترى أرضًا فليبع داره في المدينة، كي لا يؤثر آلهة بيت المدينة على آلهة الريف.»', src: 'كولوميلا 1، 1، 18؛ بليني 18، 35' },
      { k: 'الكرمة', v: 'اغرس الكروم متجهة نحو الشمال لتقيها حرّ إفريقيا.', src: 'كولوميلا 3، 12، 5' },
      { k: 'الزيتون', v: 'باعد بين أشجار الزيتون: 75 قدمًا في الأرض الجيدة، و45 في التربة الفقيرة أو المعرّضة للريح.', src: 'بليني 17، 93' },
      { k: 'الباسوم', v: 'وصفة لنبيذ حلو من العنب المجفف في الشمس، ينقلها كولوميلا حرفيًا تقريبًا.', src: 'كولوميلا 12، 39' },
      { k: 'الثيران', v: 'اختر ثيرانًا فتية ممتلئة، قوية القوائم، طويلة القرون داكنتها، عريضة الجبهة.', src: 'كولوميلا 6، 1، 3' }
    ],
    kerkAlt: 'منازل بونيقية في كركوان',
    kerkCap: 'كركوان، مدينة بونيقية في الوطن القبلي، في قلب أراضي قرطاج الفلاحية',
    colKicker: 'كولوميلا، في الفلاحة',
    colQuote: 'ماغون القرطاجي، أبو الفلاحة.',
    colCite: 'كولوميلا، 1، 1، 13',
    agriCta: 'الفلاحة القرطاجية ←',
    legacyTitle: 'الإرث',
    legacy: [
      { kicker: 'الفلاحة اللاتينية', title: 'مصدر رئيسي', text: 'ينهل فارون وكولوميلا وبليني من ماغون؛ وعبرهم انتقلت الأساليب البونيقية إلى الفلاحة الرومانية ثم الوسيطية.', tone: 'tile--olive' },
      { kicker: 'إفريقيا الرومانية', title: 'مخزن حبوب روما', text: 'واصلت الضيعات الكبرى في إفريقيا الرومانية — قمحًا وزيتًا ونبيذًا — دراية بلغت بها قرطاج ذروتها.' },
      { kicker: 'الذاكرة', title: 'اسم أُنقذ', text: 'ضاع الأدب البونيقي كله تقريبًا. وماغون من القلائل من المؤلفين القرطاجيين الذين نعرف اسمهم وجزءًا من مؤلَّفهم.', tone: 'tile--ink' }
    ],
    sources: [
      { type: 'ancient', author: 'كولوميلا', work: '«في الفلاحة»', ref: '1، 1، 13؛ 1، 1، 18؛ 3، 12، 5؛ 6، 1، 3؛ 12، 39', note: 'أهم الشذرات الباقية من ماغون' },
      { type: 'ancient', author: 'بلينيوس الأكبر', work: '«التاريخ الطبيعي»', ref: '17، 93؛ 18، 22؛ 18، 35', note: 'الترجمة التي أمر بها مجلس الشيوخ' },
      { type: 'ancient', author: 'فارون', work: '«في الفلاحة»', note: 'ماغون على رأس المؤلفين المرجعيين' },
      { type: 'modern', author: 'ستيفان غزيل', work: "Histoire ancienne de l'Afrique du Nord", ref: 'Hachette, 1920', note: 'مرجع أساسي من قائمة مراجع الموقع' },
      { type: 'modern', author: 'سيرج لانسل', work: 'Carthage', ref: 'Fayard, 1992', note: 'مرجع أساسي من قائمة مراجع الموقع' }
    ],
    moreTitle: 'اقرأ أيضًا',
    links: [
      { to: '/agriculture', kicker: 'الأرض والمعرفة', title: 'الفلاحة القرطاجية', text: 'الزيتون والكرمة والقمح: أرياف قرطاج.', tone: 'tile--olive' },
      { to: '/economie', kicker: 'التجارة', title: 'الاقتصاد البونيقي', text: 'المراكز التجارية والمعادن والطرق البحرية: ثروة قرطاج.' },
      { to: '/biographies', kicker: 'الشخصيات', title: 'الشخصيات الكبرى', text: 'قادة قرطاج وملاحوها وملكاتها.', tone: 'tile--purple' }
    ]
  }
}

const c = computed(() => C[locale.value] || C.fr)

useHead(() => ({
  title: c.value.metaTitle,
  meta: [{ name: 'description', content: c.value.metaDesc }]
}))
</script>

<style scoped>
.hero-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
.hero-phoen { font-size: 30px; color: var(--olive-soft); }
.hero-title { font-size: clamp(40px, 5.6vw, 84px); overflow-wrap: break-word; }
.epithet { font: 600 clamp(15px, 1.25vw, 18px)/1.45 var(--font-body); color: var(--white) !important; margin-top: 14px; max-width: 620px; }

.stat .num { margin-bottom: 8px; }

.block-title { margin-bottom: 20px; }
.para + .para { margin-top: 12px; }

.quote { margin: 0; display: flex; flex-direction: column; justify-content: center; gap: 18px; }
.quote-text { font: 600 clamp(18px, 1.7vw, 24px)/1.45 var(--font-display); color: var(--ink) !important; margin: 0; }
.quote cite { font: 600 13px/1.3 var(--font-body); font-style: normal; color: var(--purple); }

.col-quote { margin: 0; }
.col-quote .quote-text { color: var(--white) !important; font-size: clamp(22px, 2.4vw, 34px); }
.col-quote cite { display: block; margin-top: 14px; font: 600 13px/1.3 var(--font-body); font-style: normal; color: var(--purple-tint); }

.src { display: block; margin-top: 6px; font: 600 12px/1.3 var(--font-body); color: var(--purple); }

.olive-fig, .kerk-fig { min-height: clamp(300px, 36vw, 520px); }

.link-tile { min-height: 200px; }

@media (max-width: 640px) {
  .rows .key { font-size: 20px; }
}
</style>
