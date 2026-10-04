<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <figure class="fig fig--hero s-5 hero-fig" style="background:#3A2E27">
        <img src="/img/sophonisba.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--ink tile--stack tile--hero s-7">
        <div class="hero-top">
          <span class="chip chip--glass">{{ c.hero.chip }}</span>
          <span class="phoen hero-phoen" dir="rtl" aria-hidden="true">𐤑𐤐𐤍𐤁𐤏𐤋</span>
        </div>
        <div>
          <p class="dates">{{ c.hero.dates }}</p>
          <h1 class="h-display bio-title">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
    </div>

    <!-- Chiffres-clés -->
    <div class="cols cols-4 keep-2 keyfigs">
      <div v-for="(k, i) in c.keys" :key="k.n + i" class="tile keyfig" :class="keyTones[i]">
        <div class="num">{{ k.n }}</div>
        <p class="body">{{ k.t }}</p>
      </div>
    </div>

    <!-- Architecte des alliances -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--stack">
          <div>
            <span class="kicker">{{ c.intro.kicker }}</span>
            <h2 class="h-block block-h">{{ c.intro.title }}</h2>
            <p v-for="p in c.intro.paras" :key="p" class="body-lg para">{{ p }}</p>
          </div>
          <div class="chips">
            <span v-for="t in c.intro.tags" :key="t" class="chip">{{ t }}</span>
          </div>
        </div>
        <div class="tile tile--xl tile--purple tile--stack">
          <span class="kicker">{{ c.intro.nameKicker }}</span>
          <div>
            <div class="name-big">{{ c.intro.name }}</div>
            <p class="body-lg">{{ c.intro.nameText }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Chronologie -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <span class="kicker">{{ c.life.kicker }}</span>
        <h2 class="h-section block-h">{{ c.life.title }}</h2>
        <div class="rows" style="--row-key:170px">
          <div v-for="(r, i) in c.life.rows" :key="i">
            <span class="key">{{ r.key }}</span>
            <span class="val"><b>{{ r.title }}</b> — {{ r.text }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Deux rois numides -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.kings.title }}</h2>
        <p>{{ c.kings.aside }}</p>
      </div>
    </section>
    <div class="cols cols-2">
      <article v-for="k in c.kings.items" :key="k.name" class="tile king" :class="[k.tone, { 'with-img': k.img }]">
        <img v-if="k.img" :src="k.img" :alt="k.alt" loading="lazy">
        <div :class="{ 'king-txt': k.img }">
          <span class="kicker">{{ k.kicker }}</span>
          <h3 class="h-card">{{ k.name }}</h3>
          <p class="body">{{ k.text }}</p>
        </div>
      </article>
    </div>

    <!-- La coupe -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig side-fig" style="background:#5E574F">
          <img src="/img/zama.jpg" :alt="c.cup.alt" loading="lazy">
          <figcaption class="cap-box">{{ c.cup.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--terra tile--stack">
          <div>
            <span class="kicker">{{ c.cup.kicker }}</span>
            <h2 class="h-block block-h">{{ c.cup.title }}</h2>
            <p v-for="p in c.cup.paras" :key="p" class="body-lg para">{{ p }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Citation antique -->
    <section class="sec">
      <figure class="tile tile--xl tile--paper tile--outline quote">
        <span class="kicker">{{ c.quote.kicker }}</span>
        <blockquote>
          <p class="q-orig" lang="la">{{ c.quote.orig }}</p>
          <p class="q-tr">« {{ c.quote.tr }} »</p>
        </blockquote>
        <figcaption class="q-cite">{{ c.quote.cite }}</figcaption>
      </figure>
    </section>

    <!-- Au-delà du récit romain -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.myth.title }}</h2>
        <p>{{ c.myth.aside }}</p>
      </div>
    </section>
    <div class="cols cols-2">
      <div v-for="m in c.myth.items" :key="m.title" class="tile tile--xl" :class="m.tone">
        <span class="kicker">{{ m.kicker }}</span>
        <h3 class="h-card myth-h">{{ m.title }}</h3>
        <p class="body-lg">{{ m.text }}</p>
      </div>
    </div>

    <!-- Sources -->
    <section class="sec">
      <div class="tile tile--xl">
        <span class="kicker">{{ c.sourcesNote.kicker }}</span>
        <h2 class="h-block block-h">{{ c.sourcesNote.title }}</h2>
        <div class="rows" style="--row-key:240px">
          <div v-for="s in c.sourcesNote.items" :key="s.key">
            <span class="key src-key">{{ s.key }}</span>
            <span class="val">{{ s.text }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Héritage -->
    <section class="sec">
      <div class="tile tile--xl tile--navy">
        <span class="kicker">{{ c.legacy.kicker }}</span>
        <h2 class="h-block block-h">{{ c.legacy.title }}</h2>
        <p class="body-lg leg-intro">{{ c.legacy.intro }}</p>
        <div class="leg-grid">
          <div v-for="l in c.legacy.items" :key="l.key" class="leg">
            <div class="leg-key">{{ l.key }}</div>
            <p class="body">{{ l.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <PageSources :items="c.sources" />

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <h2 class="h-section block-title">{{ c.more.title }}</h2>
    </section>
    <div class="cols cols-3">
      <NuxtLink v-for="m in c.more.items" :key="m.to" :to="localePath(m.to)" class="card-img">
        <img :src="m.img" :alt="m.alt" loading="lazy">
        <div class="card-body">
          <span class="kicker">{{ m.kicker }}</span>
          <h3 class="h-card">{{ m.title }}</h3>
          <p>{{ m.text }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const keyTones = ['', '', 'tile--gold', 'tile--purple']

const C = {
  fr: {
    meta: {
      title: 'Sophonisbe, la princesse qui choisit la mort',
      desc: "Fille d'Hasdrubal fils de Giscon, épouse de Syphax puis de Masinissa, Sophonisbe boit le poison en 203 av. J.-C. plutôt que d'orner le triomphe de Scipion."
    },
    hero: {
      chip: 'Carthage · Numidie',
      dates: '? – 203 av. J.-C.',
      title: 'Sophonisbe',
      lede: "Fille d'Hasdrubal fils de Giscon, reine de Numidie deux fois en quelques années : sa vie fut l'enjeu de la diplomatie punique dans la deuxième guerre punique — et sa mort, un refus.",
      alt: 'La Mort de Sophonisbe, par Mattia Preti',
      caption: 'Mattia Preti, La Mort de Sophonisbe'
    },
    keys: [
      { n: '206', t: 'Scipion et Hasdrubal reçus le même jour par Syphax' },
      { n: '2', t: 'rois numides épousés : Syphax, puis Masinissa' },
      { n: '1', t: 'jour entre la prise de Cirta et ses noces avec Masinissa' },
      { n: '203', t: 'av. J.-C. : la coupe de poison' }
    ],
    intro: {
      kicker: 'Architecte des alliances',
      title: 'Un atout stratégique',
      paras: [
        "Fille du général Hasdrubal fils de Giscon, qui commanda les armées puniques en Hispanie, Sophonisbe appartient à l'une des premières familles de Carthage. Instruite, réputée pour sa beauté, elle n'est jamais simplement une princesse : elle est un atout stratégique.",
        "Son mariage avec Syphax, roi des Masaesyles, n'est pas une affaire de cœur mais un coup de maître : il fait passer dans le camp carthaginois le plus puissant roi de Numidie et sa cavalerie, au moment où Rome prépare l'invasion de l'Afrique."
      ],
      tags: ["Lignée : maison d'Hasdrubal fils de Giscon", 'Statut : reine de Numidie'],
      nameKicker: 'Son nom punique',
      name: 'Ṣapanbaʿal',
      nameText: "« Sophonisbe » est la forme grecque et latine d'un nom punique, probablement Ṣapanbaʿal, « Baal a protégé »."
    },
    life: {
      kicker: 'Chronologie',
      title: 'Une vie dans la guerre',
      rows: [
        { key: 'Fin IIIe s.', title: 'Naissance à Carthage', text: "Fille d'Hasdrubal fils de Giscon. Selon Appien, elle aurait d'abord été promise à Masinissa, prince numide élevé à Carthage." },
        { key: '206 av. J.-C.', title: 'Le pivot numide', text: "Battu à Ilipa, Hasdrubal quitte l'Hispanie. Lui et Scipion sont reçus le même jour par Syphax à Siga : chacun veut l'alliance numide." },
        { key: 'v. 205', title: 'Reine des Masaesyles', text: "Hasdrubal donne sa fille à Syphax, qui rompt avec Rome. Masinissa, évincé et chassé de son royaume, se rallie à Scipion." },
        { key: '204', title: 'Rome en Afrique', text: "Scipion débarque près d'Utique." },
        { key: '203', title: 'Les camps en feu', text: "Scipion incendie de nuit les camps d'Hasdrubal et de Syphax, puis les bat aux Grandes Plaines." },
        { key: '203', title: 'La chute de Cirta', text: "Syphax est capturé par Laelius et Masinissa ; Cirta ouvre ses portes. Sophonisbe supplie Masinissa de ne pas la livrer aux Romains : il l'épouse le jour même." },
        { key: '203', title: 'Le dernier choix', text: "Scipion la réclame comme prise du peuple romain, destinée au triomphe. Masinissa, déchiré, lui envoie une coupe de poison. Elle la boit." },
        { key: '202', title: 'Après elle', text: "Hannibal est vaincu à Zama ; Masinissa devient roi de toute la Numidie, allié de Rome. Syphax meurt captif en Italie." }
      ]
    },
    kings: {
      title: 'Entre deux rois',
      aside: 'Les deux royaumes numides se disputaient la région ; Rome et Carthage se disputaient les Numides.',
      items: [
        { tone: 'tile--sand', kicker: 'Masaesyles · Numidie occidentale', name: 'Syphax', text: "Roi le plus puissant de Numidie, capitales Siga puis Cirta. Courtisé par Rome comme par Carthage, il choisit Carthage en épousant Sophonisbe. Vaincu en 203, il est emmené captif en Italie." },
        { tone: 'tile--ink', img: '/img/massinissa.jpg', alt: 'Masinissa, roi des Numides', kicker: 'Massyles · Numidie orientale', name: 'Masinissa', text: "Ancien allié de Carthage en Hispanie, dépossédé par Syphax, il passe à Rome. Vainqueur avec Laelius, il épouse Sophonisbe, puis doit céder à Scipion. Il régnera jusqu'en 148 av. J.-C." }
      ]
    },
    cup: {
      kicker: 'Le dernier choix',
      title: 'La coupe de poison',
      paras: [
        "Pour Scipion, la fille d'Hasdrubal, qui avait détourné Syphax de Rome, appartient au peuple romain : elle doit marcher dans son triomphe. Masinissa ne peut ni la sauver ni désobéir.",
        "Il lui fait porter du poison par un serviteur. Sophonisbe le reçoit comme un « présent de noces » et le boit sans trembler, choisissant la mort plutôt que les chaînes d'un cortège romain."
      ],
      alt: 'La bataille de Zama',
      caption: 'La bataille de Zama (202 av. J.-C.), un an après sa mort'
    },
    quote: {
      kicker: 'Ses dernières paroles, selon Tite-Live',
      orig: 'Accipio nuptiale munus, neque ingratum, si nihil maius vir uxori praestare potuit. Hoc tamen nuntia, melius me morituram fuisse si non in funere meo nupsissem.',
      tr: "J'accepte ce présent de noces, et non sans reconnaissance, si mon mari ne pouvait rien offrir de mieux à son épouse. Dis-lui pourtant que je serais morte plus dignement si je ne m'étais pas mariée le jour de mes funérailles.",
      cite: 'Tite-Live, Histoire romaine, XXX, 15'
    },
    myth: {
      title: 'Au-delà du récit romain',
      aside: "On ne connaît Sophonisbe que par ses ennemis.",
      items: [
        { tone: 'tile--purple', kicker: "L'atout politique", title: 'Une « séductrice » ?', text: "Tite-Live fait dire à Syphax captif qu'elle fut sa « furie », celle qui l'arracha à l'amitié de Rome. Présenter Sophonisbe en séductrice permettait d'expliquer les revirements numides. On y lit plutôt une diplomate lucide, pour qui une victoire romaine signifiait la ruine de Carthage." },
        { tone: 'tile--gold', kicker: 'Dignité punique', title: 'Un refus', text: "Elle choisit la coupe de poison plutôt que les chaînes d'un triomphe romain, préservant l'honneur de Carthage jusqu'à son dernier souffle — un geste que la littérature européenne n'a cessé de rejouer." }
      ]
    },
    sourcesNote: {
      kicker: 'Sources et archives',
      title: "D'où vient ce que l'on sait",
      items: [
        { key: 'Tite-Live, livres XXVIII–XXX', text: "Histoire romaine : récit principal de sa vie et de sa mort, avec ses dernières paroles (XXX, 12–15)." },
        { key: 'Appien, Libyca', text: "Perspective différente : Sophonisbe d'abord promise à Masinissa, les événements autour de la chute de Cirta." },
        { key: 'Polybe, Histoires', text: "Le contexte géopolitique des alliances numides pendant la deuxième guerre punique." },
        { key: 'Diodore de Sicile', text: 'Un bref récit parallèle, conservé en fragments.' }
      ]
    },
    legacy: {
      kicker: 'Héritage',
      title: 'Une héroïne tragique',
      intro: "Symbole de la résistance punique, son choix final incarne la dignité face à la domination. Depuis la Renaissance, sa mort est l'un des grands sujets de la tragédie, de l'opéra et de la peinture.",
      items: [
        { key: 'Trissino, 1515', text: "Sofonisba, l'une des premières tragédies « régulières » en langue italienne." },
        { key: 'Mairet, 1634', text: 'La Sophonisbe, jalon de la tragédie classique française.' },
        { key: 'Corneille, 1663', text: 'Sophonisbe, la reine qui préfère sa gloire à son amour.' },
        { key: 'Thomson, 1730', text: 'The Tragedy of Sophonisba, en Angleterre.' },
        { key: 'Gluck, 1744', text: 'Sofonisba, opéra créé à Milan ; suivront notamment Traetta (1762).' },
        { key: 'Voltaire, 1770', text: 'Réécriture de la pièce de Mairet.' },
        { key: 'Peinture', text: 'Mattia Preti, Giambattista Pittoni et bien d’autres peignent « la mort de Sophonisbe ».' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Tite-Live', work: 'Histoire romaine', ref: 'XXVIII–XXX ; XXX, 12–15', note: 'récit principal, dernières paroles de Sophonisbe' },
      { type: 'ancient', author: "Appien d'Alexandrie", work: 'Libyca', note: 'Sophonisbe promise à Masinissa ; chute de Cirta' },
      { type: 'ancient', author: 'Polybe', work: 'Histoires', note: 'contexte des alliances numides' },
      { type: 'ancient', author: 'Diodore de Sicile', work: 'Bibliothèque historique', note: 'bref récit parallèle, en fragments' },
      { type: 'modern', author: 'Serge Lancel', work: 'Carthage', ref: 'Fayard, 1992', note: 'ouvrage de référence de la bibliographie du site' },
      { type: 'modern', author: 'Yann Le Bohec', work: 'Histoire militaire des guerres puniques', ref: 'Éditions du Rocher, 2003', note: 'ouvrage de référence de la bibliographie du site' }
    ],
    more: {
      title: 'À lire aussi',
      items: [
        { to: '/hannibal', img: '/img/hannibal-bust.jpg', alt: "Buste d'Hannibal", kicker: '247–183 av. J.-C.', title: 'Hannibal', text: "Rappelé d'Italie, il affronte Scipion et Masinissa à Zama." },
        { to: '/guerres-puniques', img: '/img/scipio.jpg', alt: 'Scipion l’Africain', kicker: '264–146 av. J.-C.', title: 'Les guerres puniques', text: "Trois guerres, cent dix-huit ans : Rome contre Carthage." },
        { to: '/biographies', img: '/img/hamilcar.jpg', alt: 'Hamilcar Barca', kicker: 'Personnages', title: 'Toutes les biographies', text: 'Les Barca, les généraux, les navigateurs et les reines.' }
      ]
    }
  },
  en: {
    meta: {
      title: 'Sophonisba, the princess who chose death',
      desc: "Daughter of Hasdrubal son of Gisco, wife of Syphax then of Masinissa, Sophonisba drank poison in 203 BC rather than grace Scipio's triumph."
    },
    hero: {
      chip: 'Carthage · Numidia',
      dates: '? – 203 BC',
      title: 'Sophonisba',
      lede: 'Daughter of Hasdrubal son of Gisco, twice queen of Numidia within a few years: her life was the stake of Punic diplomacy in the Second Punic War — and her death, a refusal.',
      alt: 'The Death of Sophonisba, by Mattia Preti',
      caption: 'Mattia Preti, The Death of Sophonisba'
    },
    keys: [
      { n: '206', t: 'Scipio and Hasdrubal received by Syphax on the same day' },
      { n: '2', t: 'Numidian kings married: Syphax, then Masinissa' },
      { n: '1', t: 'day between the fall of Cirta and her wedding to Masinissa' },
      { n: '203', t: 'BC: the cup of poison' }
    ],
    intro: {
      kicker: 'Architect of alliances',
      title: 'A strategic asset',
      paras: [
        'Daughter of General Hasdrubal son of Gisco, who commanded the Punic armies in Iberia, Sophonisba belonged to one of the first families of Carthage. Educated and renowned for her beauty, she was never merely a princess: she was a strategic asset.',
        "Her marriage to Syphax, king of the Masaesyli, was not a matter of the heart but a masterstroke: it brought the most powerful king in Numidia and his cavalry over to Carthage, just as Rome was preparing to invade Africa."
      ],
      tags: ['Lineage: house of Hasdrubal son of Gisco', 'Status: queen of Numidia'],
      nameKicker: 'Her Punic name',
      name: 'Ṣapanbaʿal',
      nameText: '"Sophonisba" is the Greek and Latin form of a Punic name, probably Ṣapanbaʿal, "Baal has protected".'
    },
    life: {
      kicker: 'Timeline',
      title: 'A life at war',
      rows: [
        { key: 'Late 3rd c.', title: 'Born in Carthage', text: 'Daughter of Hasdrubal son of Gisco. According to Appian, she was first promised to Masinissa, a Numidian prince raised in Carthage.' },
        { key: '206 BC', title: 'The Numidian pivot', text: 'Defeated at Ilipa, Hasdrubal leaves Iberia. He and Scipio are received by Syphax at Siga on the same day: each wants the Numidian alliance.' },
        { key: 'c. 205', title: 'Queen of the Masaesyli', text: 'Hasdrubal gives his daughter to Syphax, who breaks with Rome. Masinissa, sidelined and driven from his kingdom, joins Scipio.' },
        { key: '204', title: 'Rome in Africa', text: 'Scipio lands near Utica.' },
        { key: '203', title: 'The camps on fire', text: 'Scipio burns the camps of Hasdrubal and Syphax by night, then defeats them at the Great Plains.' },
        { key: '203', title: 'The fall of Cirta', text: 'Syphax is captured by Laelius and Masinissa; Cirta opens its gates. Sophonisba begs Masinissa not to hand her over to the Romans: he marries her the same day.' },
        { key: '203', title: 'The final choice', text: 'Scipio claims her as a prize of the Roman people, destined for the triumph. Masinissa, torn, sends her a cup of poison. She drinks it.' },
        { key: '202', title: 'After her', text: 'Hannibal is defeated at Zama; Masinissa becomes king of all Numidia, an ally of Rome. Syphax dies a captive in Italy.' }
      ]
    },
    kings: {
      title: 'Between two kings',
      aside: 'The two Numidian kingdoms fought over the region; Rome and Carthage fought over the Numidians.',
      items: [
        { tone: 'tile--sand', kicker: 'Masaesyli · western Numidia', name: 'Syphax', text: 'The most powerful king in Numidia, with Siga and then Cirta as capitals. Courted by both Rome and Carthage, he chose Carthage by marrying Sophonisba. Defeated in 203, he was taken captive to Italy.' },
        { tone: 'tile--ink', img: '/img/massinissa.jpg', alt: 'Masinissa, king of the Numidians', kicker: 'Massyli · eastern Numidia', name: 'Masinissa', text: "A former ally of Carthage in Iberia, dispossessed by Syphax, he went over to Rome. Victorious with Laelius, he married Sophonisba, then had to yield to Scipio. He reigned until 148 BC." }
      ]
    },
    cup: {
      kicker: 'The final choice',
      title: 'The cup of poison',
      paras: [
        "For Scipio, Hasdrubal's daughter, who had turned Syphax away from Rome, belonged to the Roman people: she must walk in his triumph. Masinissa could neither save her nor disobey.",
        'He had a servant bring her poison. Sophonisba received it as a "wedding gift" and drank it without flinching, choosing death over the chains of a Roman procession.'
      ],
      alt: 'The Battle of Zama',
      caption: 'The Battle of Zama (202 BC), a year after her death'
    },
    quote: {
      kicker: 'Her last words, according to Livy',
      orig: 'Accipio nuptiale munus, neque ingratum, si nihil maius vir uxori praestare potuit. Hoc tamen nuntia, melius me morituram fuisse si non in funere meo nupsissem.',
      tr: 'I accept this wedding gift, and not ungratefully, if my husband could give his wife nothing better. But tell him this: I would have died more honourably had I not married on the day of my funeral.',
      cite: 'Livy, History of Rome, XXX, 15'
    },
    myth: {
      title: 'Beyond the Roman story',
      aside: 'We know Sophonisba only through her enemies.',
      items: [
        { tone: 'tile--purple', kicker: 'The political asset', title: 'A "seductress"?', text: 'Livy has the captive Syphax call her his "fury", the woman who tore him from Rome’s friendship. Casting Sophonisba as a seductress helped explain the Numidian changes of side. One can read instead a clear-sighted diplomat, for whom a Roman victory meant the ruin of Carthage.' },
        { tone: 'tile--gold', kicker: 'Punic dignity', title: 'A refusal', text: 'She chose the cup of poison over the chains of a Roman triumph, preserving the honour of Carthage to her last breath — a gesture European literature has never stopped re-enacting.' }
      ]
    },
    sourcesNote: {
      kicker: 'Sources and archives',
      title: 'Where our knowledge comes from',
      items: [
        { key: 'Livy, books XXVIII–XXX', text: 'History of Rome: the main account of her life and death, with her last words (XXX, 12–15).' },
        { key: 'Appian, Libyca', text: 'A different perspective: Sophonisba first promised to Masinissa, the events around the fall of Cirta.' },
        { key: 'Polybius, Histories', text: 'The geopolitical context of the Numidian alliances during the Second Punic War.' },
        { key: 'Diodorus Siculus', text: 'A short parallel account, preserved in fragments.' }
      ]
    },
    legacy: {
      kicker: 'Legacy',
      title: 'A tragic heroine',
      intro: 'A symbol of Punic resistance, her final choice embodies dignity in the face of domination. Since the Renaissance, her death has been one of the great subjects of tragedy, opera and painting.',
      items: [
        { key: 'Trissino, 1515', text: 'Sofonisba, one of the first "regular" tragedies in Italian.' },
        { key: 'Mairet, 1634', text: 'La Sophonisbe, a milestone of French classical tragedy.' },
        { key: 'Corneille, 1663', text: 'Sophonisbe, the queen who puts her glory before her love.' },
        { key: 'Thomson, 1730', text: 'The Tragedy of Sophonisba, in England.' },
        { key: 'Gluck, 1744', text: 'Sofonisba, an opera premiered in Milan; Traetta (1762) and others followed.' },
        { key: 'Voltaire, 1770', text: "A rewriting of Mairet's play." },
        { key: 'Painting', text: 'Mattia Preti, Giambattista Pittoni and many others painted "the death of Sophonisba".' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Livy', work: 'History of Rome', ref: 'XXVIII–XXX; XXX, 12–15', note: 'main account, with Sophonisba’s last words' },
      { type: 'ancient', author: 'Appian of Alexandria', work: 'Libyca', note: 'Sophonisba first promised to Masinissa; the fall of Cirta' },
      { type: 'ancient', author: 'Polybius', work: 'Histories', note: 'context of the Numidian alliances' },
      { type: 'ancient', author: 'Diodorus Siculus', work: 'Library of History', note: 'brief parallel account, in fragments' },
      { type: 'modern', author: 'Serge Lancel', work: 'Carthage', ref: 'Fayard, 1992', note: 'standard work from the site bibliography' },
      { type: 'modern', author: 'Yann Le Bohec', work: 'Histoire militaire des guerres puniques', ref: 'Éditions du Rocher, 2003', note: 'standard work from the site bibliography' }
    ],
    more: {
      title: 'Read also',
      items: [
        { to: '/hannibal', img: '/img/hannibal-bust.jpg', alt: 'Bust of Hannibal', kicker: '247–183 BC', title: 'Hannibal', text: 'Recalled from Italy, he faced Scipio and Masinissa at Zama.' },
        { to: '/guerres-puniques', img: '/img/scipio.jpg', alt: 'Scipio Africanus', kicker: '264–146 BC', title: 'The Punic Wars', text: 'Three wars, 118 years: Rome against Carthage.' },
        { to: '/biographies', img: '/img/hamilcar.jpg', alt: 'Hamilcar Barca', kicker: 'People', title: 'All biographies', text: 'The Barcids, the generals, the navigators and the queens.' }
      ]
    }
  },
  ar: {
    meta: {
      title: 'صوفونيسبا، الأميرة التي اختارت الموت',
      desc: 'ابنة حسدربعل بن جسكون، زوجة سيفاكس ثم ماسينيسا، شربت صوفونيسبا السم سنة 203 ق.م بدل أن تُساق في موكب نصر سكيبيو.'
    },
    hero: {
      chip: 'قرطاج · نوميديا',
      dates: '؟ – 203 ق.م',
      title: 'صوفونيسبا',
      lede: 'ابنة حسدربعل بن جسكون، ملكة نوميديا مرتين في سنوات قليلة: كانت حياتها رهان الدبلوماسية البونيقية في الحرب البونيقية الثانية — وكان موتها رفضًا.',
      alt: 'موت صوفونيسبا، لوحة ماتيا بريتي',
      caption: 'ماتيا بريتي، موت صوفونيسبا'
    },
    keys: [
      { n: '206', t: 'استقبل سيفاكس سكيبيو وحسدربعل في اليوم نفسه' },
      { n: '2', t: 'ملكان نوميديان تزوجتهما: سيفاكس ثم ماسينيسا' },
      { n: '1', t: 'يوم واحد بين سقوط سيرتا وزواجها من ماسينيسا' },
      { n: '203', t: 'ق.م: كأس السم' }
    ],
    intro: {
      kicker: 'مهندسة التحالفات',
      title: 'ورقة استراتيجية',
      paras: [
        'ابنة القائد حسدربعل بن جسكون الذي قاد الجيوش البونيقية في إيبيريا، تنتمي صوفونيسبا إلى إحدى كبرى عائلات قرطاج. كانت متعلمة ومشهورة بجمالها، ولم تكن مجرد أميرة: كانت ورقة استراتيجية.',
        'لم يكن زواجها من سيفاكس، ملك الماسيسيليين، شأنًا عاطفيًا بل ضربة بارعة: فقد جلب إلى صف قرطاج أقوى ملوك نوميديا وفرسانه، في الوقت الذي كانت فيه روما تستعد لغزو إفريقيا.'
      ],
      tags: ['النسب: بيت حسدربعل بن جسكون', 'المكانة: ملكة نوميديا'],
      nameKicker: 'اسمها البونيقي',
      name: 'Ṣapanbaʿal',
      nameText: '«صوفونيسبا» هي الصيغة الإغريقية واللاتينية لاسم بونيقي، لعله «صفنبعل» أي «بعل حمى».'
    },
    life: {
      kicker: 'التسلسل الزمني',
      title: 'حياة في قلب الحرب',
      rows: [
        { key: 'أواخر القرن 3', title: 'المولد في قرطاج', text: 'ابنة حسدربعل بن جسكون. وحسب أبيانوس، كانت مخطوبة أولًا لماسينيسا، الأمير النوميدي الذي نشأ في قرطاج.' },
        { key: '206 ق.م', title: 'المحور النوميدي', text: 'بعد هزيمته في إيليبا، يغادر حسدربعل إيبيريا. ويستقبله سيفاكس في سيغا مع سكيبيو في اليوم نفسه: كلاهما يريد التحالف النوميدي.' },
        { key: 'نحو 205', title: 'ملكة الماسيسيليين', text: 'يزوّج حسدربعل ابنته لسيفاكس، فيقطع هذا علاقته بروما. أما ماسينيسا، المُقصى والمطرود من مملكته، فينضم إلى سكيبيو.' },
        { key: '204', title: 'روما في إفريقيا', text: 'ينزل سكيبيو قرب أوتيكا.' },
        { key: '203', title: 'المعسكرات تحترق', text: 'يحرق سكيبيو ليلًا معسكري حسدربعل وسيفاكس، ثم يهزمهما في السهول الكبرى.' },
        { key: '203', title: 'سقوط سيرتا', text: 'يؤسر سيفاكس على يد ليليوس وماسينيسا، وتفتح سيرتا أبوابها. تتوسل صوفونيسبا إلى ماسينيسا ألا يسلّمها للرومان: فيتزوجها في اليوم نفسه.' },
        { key: '203', title: 'الاختيار الأخير', text: 'يطالب بها سكيبيو غنيمةً للشعب الروماني، مصيرها موكب النصر. فيرسل إليها ماسينيسا الممزَّق كأس سم. فتشربها.' },
        { key: '202', title: 'من بعدها', text: 'يُهزم حنبعل في زاما؛ ويصبح ماسينيسا ملكًا على نوميديا كلها حليفًا لروما. ويموت سيفاكس أسيرًا في إيطاليا.' }
      ]
    },
    kings: {
      title: 'بين ملكين',
      aside: 'تنازعت المملكتان النوميديتان المنطقة؛ وتنازعت روما وقرطاج النوميديين.',
      items: [
        { tone: 'tile--sand', kicker: 'الماسيسيليون · نوميديا الغربية', name: 'سيفاكس', text: 'أقوى ملوك نوميديا، وعاصمتاه سيغا ثم سيرتا. خطبت روما وقرطاج ودّه، فاختار قرطاج بزواجه من صوفونيسبا. هُزم سنة 203 واقتيد أسيرًا إلى إيطاليا.' },
        { tone: 'tile--ink', img: '/img/massinissa.jpg', alt: 'ماسينيسا، ملك النوميديين', kicker: 'الماسيليون · نوميديا الشرقية', name: 'ماسينيسا', text: 'حليف سابق لقرطاج في إيبيريا، جرّده سيفاكس من ملكه فانحاز إلى روما. انتصر مع ليليوس وتزوج صوفونيسبا، ثم اضطر إلى الإذعان لسكيبيو. حكم حتى سنة 148 ق.م.' }
      ]
    },
    cup: {
      kicker: 'الاختيار الأخير',
      title: 'كأس السم',
      paras: [
        'في نظر سكيبيو، ابنة حسدربعل التي أبعدت سيفاكس عن روما ملكٌ للشعب الروماني: يجب أن تسير في موكب نصره. ولم يكن ماسينيسا قادرًا على إنقاذها ولا على العصيان.',
        'فأرسل إليها السم مع خادم. تلقّته صوفونيسبا «هديةَ عرس» وشربته دون أن ترتجف، مختارةً الموت على قيود الموكب الروماني.'
      ],
      alt: 'معركة زاما',
      caption: 'معركة زاما (202 ق.م)، بعد عام من موتها'
    },
    quote: {
      kicker: 'كلماتها الأخيرة كما رواها ليفيوس',
      orig: 'Accipio nuptiale munus, neque ingratum, si nihil maius vir uxori praestare potuit. Hoc tamen nuntia, melius me morituram fuisse si non in funere meo nupsissem.',
      tr: 'أقبل هدية العرس هذه، ولست جاحدة لها، إن لم يكن في وسع الزوج أن يقدّم لزوجته ما هو أعظم. لكن أبلغه هذا: لكان موتي أكرم لو لم أتزوج يوم جنازتي.',
      cite: 'ليفيوس، تاريخ روما، 30، 15'
    },
    myth: {
      title: 'ما وراء الرواية الرومانية',
      aside: 'لا نعرف صوفونيسبا إلا من خلال أعدائها.',
      items: [
        { tone: 'tile--purple', kicker: 'الورقة السياسية', title: '«مُغوية»؟', text: 'يُنطق ليفيوس سيفاكس الأسير بأنها كانت «لعنته» التي انتزعته من صداقة روما. وتصويرها مغويةً كان يفسّر تقلّب ولاءات النوميديين. أما نحن فنقرأ فيها دبلوماسية واعية أدركت أن انتصار روما يعني خراب قرطاج.' },
        { tone: 'tile--gold', kicker: 'الكرامة البونيقية', title: 'رفض', text: 'اختارت كأس السم على قيود موكب النصر الروماني، محافظةً على شرف قرطاج حتى نفَسها الأخير — وهي لفتة لم يكفّ الأدب الأوروبي عن استعادتها.' }
      ]
    },
    sourcesNote: {
      kicker: 'المصادر والأرشيف',
      title: 'من أين نعرف ما نعرف',
      items: [
        { key: 'ليفيوس، الكتب 28–30', text: 'تاريخ روما: الرواية الرئيسية لحياتها وموتها، مع كلماتها الأخيرة (30، 12–15).' },
        { key: 'أبيانوس، ليبيكا', text: 'منظور مختلف: صوفونيسبا مخطوبة أولًا لماسينيسا، والأحداث المحيطة بسقوط سيرتا.' },
        { key: 'بوليبيوس، التواريخ', text: 'السياق الجيوسياسي للتحالفات النوميدية خلال الحرب البونيقية الثانية.' },
        { key: 'ديودوروس الصقلي', text: 'رواية موازية موجزة، وصلت في شذرات.' }
      ]
    },
    legacy: {
      kicker: 'الإرث',
      title: 'بطلة تراجيدية',
      intro: 'رمز المقاومة البونيقية، يجسّد اختيارها الأخير الكرامة في وجه الهيمنة. ومنذ عصر النهضة صار موتها من كبرى موضوعات التراجيديا والأوبرا والرسم.',
      items: [
        { key: 'تريسينو، 1515', text: '«صوفونيسبا»، من أولى التراجيديات «النظامية» باللغة الإيطالية.' },
        { key: 'ميريه، 1634', text: '«صوفونيسبا»، علامة في التراجيديا الكلاسيكية الفرنسية.' },
        { key: 'كورني، 1663', text: '«صوفونيسبا»، الملكة التي تقدّم مجدها على حبها.' },
        { key: 'طومسون، 1730', text: '«مأساة صوفونيسبا» في إنجلترا.' },
        { key: 'غلوك، 1744', text: '«صوفونيسبا»، أوبرا عُرضت أول مرة في ميلانو؛ وتلاها خصوصًا ترايتا (1762).' },
        { key: 'فولتير، 1770', text: 'إعادة كتابة لمسرحية ميريه.' },
        { key: 'الرسم', text: 'رسم ماتيا بريتي وجامباتيستا بيتوني وكثيرون غيرهما «موت صوفونيسبا».' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'تيتوس ليفيوس', work: '«تاريخ روما»', ref: '28–30؛ 30، 12–15', note: 'الرواية الرئيسية، مع كلمات صوفونيسبا الأخيرة' },
      { type: 'ancient', author: 'أبيانوس السكندري', work: '«ليبيكا»', note: 'صوفونيسبا مخطوبة أولًا لماسينيسا؛ سقوط سيرتا' },
      { type: 'ancient', author: 'بوليبيوس', work: '«التواريخ»', note: 'سياق التحالفات النوميدية' },
      { type: 'ancient', author: 'ديودوروس الصقلي', work: '«المكتبة التاريخية»', note: 'رواية موازية موجزة، في شذرات' },
      { type: 'modern', author: 'سيرج لانسل', work: 'Carthage', ref: 'Fayard, 1992', note: 'مرجع أساسي من قائمة مراجع الموقع' },
      { type: 'modern', author: 'يان لو بوهيك', work: 'Histoire militaire des guerres puniques', ref: 'Éditions du Rocher, 2003', note: 'مرجع أساسي من قائمة مراجع الموقع' }
    ],
    more: {
      title: 'اقرأ أيضًا',
      items: [
        { to: '/hannibal', img: '/img/hannibal-bust.jpg', alt: 'تمثال نصفي لحنبعل', kicker: '247–183 ق.م', title: 'حنبعل', text: 'استُدعي من إيطاليا فواجه سكيبيو وماسينيسا في زاما.' },
        { to: '/guerres-puniques', img: '/img/scipio.jpg', alt: 'سكيبيو الإفريقي', kicker: '264–146 ق.م', title: 'الحروب البونيقية', text: 'ثلاث حروب و118 عامًا: روما ضد قرطاج.' },
        { to: '/biographies', img: '/img/hamilcar.jpg', alt: 'حملقار برقة', kicker: 'الشخصيات', title: 'كل السير', text: 'آل برقا والقادة والملاحون والملكات.' }
      ]
    }
  }
}

const c = await useLocalized('sophonisbe', C)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-top { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 12px 16px; }
.hero-phoen { font-size: clamp(22px, 2.4vw, 34px); color: var(--gold-light); opacity: 0.85; }
.dates { font: 700 14px/1.3 var(--font-body); margin-bottom: 14px; color: var(--gold-light) !important; }
.bio-title { font-size: clamp(44px, 6vw, 92px); overflow-wrap: anywhere; }
.hero-fig { min-height: clamp(380px, 42vw, 580px); }

.keyfigs { margin-top: var(--gap); }
.keyfig .body { margin-top: 6px; font-size: 14px; }

.block-h { margin-bottom: clamp(18px, 2vw, 28px); }
.block-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.para + .para { margin-top: 12px; }
.name-big { font: 900 clamp(34px, 3.6vw, 52px)/1 var(--font-display); letter-spacing: -0.02em; margin-bottom: 14px; overflow-wrap: anywhere; }

.rows .val b { font-weight: 700; }
.src-key { font-size: clamp(17px, 1.5vw, 20px) !important; line-height: 1.2 !important; }

.king.with-img {
  padding: 10px;
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 18px;
}

.king.with-img > img {
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  object-position: 50% 20%;
  border-radius: 20px;
  background: #3A332C;
}

.king-txt { padding-block: 22px 14px; padding-inline-end: 14px; }

.side-fig { min-height: 440px; }

.quote blockquote { margin-block: 6px 14px; }
.q-orig { font: italic 500 16px/1.55 Georgia, serif; color: var(--purple) !important; margin-bottom: 14px; max-width: 900px; }
.q-tr { font: 800 clamp(20px, 2.1vw, 30px)/1.3 var(--font-display); color: var(--ink) !important; max-width: 1000px; }
.q-cite { font: 600 13px/1.4 var(--font-body); color: var(--muted); }

.myth-h { font-size: clamp(24px, 2.2vw, 32px); margin-bottom: 14px; }

.leg-intro { max-width: 760px; margin-bottom: 28px; }
.leg-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 22px 24px; }
.leg { border-top: 1px solid rgba(255, 255, 255, 0.22); padding-top: 14px; }
.leg-key { font: 800 18px/1.2 var(--font-display); margin-bottom: 6px; }

@media (max-width: 1100px) {
  .leg-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 960px) {
  .hero-fig { min-height: clamp(260px, 60vw, 460px); }
  .side-fig { min-height: 320px; }
}

@media (max-width: 640px) {
  .leg-grid { grid-template-columns: minmax(0, 1fr); }
  .king.with-img { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .king.with-img > img { height: 220px; min-height: 0; }
  .king-txt { padding: 18px 12px 12px; }
  .side-fig { min-height: 260px; }
  .keyfig { padding: 18px; }
}
</style>
