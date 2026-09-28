<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--purple tile--stack tile--hero s-8">
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <h1 class="h-display">{{ c.hero.title }}</h1>
      </div>
      <div class="tile tile--xl tile--gold tile--stack s-4">
        <div class="span-num num" dir="ltr">814 → 146</div>
        <div>
          <p class="body-lg">{{ c.hero.lede }}</p>
          <div class="chips hero-chips">
            <span class="chip chip--white">{{ events.length }} {{ c.hero.events }}</span>
            <span class="chip chip--white">4 {{ c.hero.periods }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Frise proportionnelle -->
    <section class="sec">
      <div class="tile tile--xl">
        <h2 class="h-block frieze-title">{{ c.frieze.title }}</h2>
        <div class="frieze">
          <div v-for="p in c.frieze.periods" :key="p.era" class="band" :class="p.tone" :style="{ flexGrow: p.span }">
            <span class="band-name">{{ p.name }}</span>
            <span class="band-era" dir="ltr">{{ p.short }}</span>
          </div>
        </div>
        <div class="frieze-legend">
          <span>{{ c.frieze.start }}</span>
          <span class="frieze-note">{{ c.frieze.note }}</span>
          <span>{{ c.frieze.end }}</span>
        </div>
        <div class="cols cols-4 cols--flush periods">
          <div v-for="p in c.frieze.periods" :key="p.era" class="period" :class="'period--' + p.tone">
            <span class="kicker">{{ p.era }}</span>
            <h3 class="h-card">{{ p.name }}</h3>
            <p class="body">{{ p.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Filtres -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.list.title }}</h2>
        <NuxtLink :to="localePath('/biographies')" class="btn btn-outline">{{ c.list.bios }} →</NuxtLink>
      </div>
      <div class="pill-row" role="group" :aria-label="c.list.filter">
        <button
          v-for="f in filters"
          :key="f.id"
          type="button"
          class="pill-btn"
          :class="{ on: sel === f.id }"
          :aria-pressed="sel === f.id"
          aria-controls="tl-eras"
          @click="sel = f.id"
        >
          {{ f.label }} · {{ f.n }}
        </button>
      </div>
    </section>

    <!-- Époques -->
    <div id="tl-eras" class="eras">
      <section v-for="e in shownEras" :key="e.id" class="era" :class="'era--' + e.id">
        <div class="tile era-band" :class="e.tone">
          <div>
            <span class="kicker" dir="auto">{{ e.dates }}</span>
            <h2 class="h-block">{{ e.name }}</h2>
          </div>
          <p class="body era-desc">{{ e.desc }}</p>
        </div>

        <ol class="tile tl">
          <li v-for="(ev, i) in byEra[e.id]" :key="e.id + i" class="ev" :class="{ 'ev--hl': ev.hl }">
            <div class="ev-year">
              <span class="ev-y">{{ ev.y }}</span>
              <span class="ev-u">{{ c.bc }}</span>
            </div>
            <div class="ev-main" :class="{ 'ev-main--img': ev.img }">
              <div>
                <h3 class="ev-title">{{ ev.title }}</h3>
                <p class="ev-text">{{ ev.text }}</p>
                <p v-if="ev.note" class="ev-note">{{ ev.note }}</p>
                <div v-if="ev.links" class="ev-links">
                  <NuxtLink v-for="l in ev.links" :key="l" :to="localePath(l)" class="ev-link">{{ c.links[l] }} →</NuxtLink>
                </div>
              </div>
              <img v-if="ev.img" :src="'/img/' + ev.img" :alt="ev.alt" loading="lazy" class="ev-img">
            </div>
            <div class="ev-tag">{{ ev.tag }}</div>
          </li>
        </ol>
      </section>
    </div>

    <!-- Après 146 -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.after.kicker }}</span>
          <h2 class="h-block after-title">{{ c.after.title }}</h2>
          <div class="rows" style="--row-key:170px">
            <div v-for="r in c.after.rows" :key="r.key">
              <span class="key">{{ r.key }}</span>
              <span class="val">{{ r.val }}</span>
            </div>
          </div>
        </div>
        <div class="tile tile--xl tile--sand tile--stack">
          <div>
            <span class="kicker">{{ c.after.k2 }}</span>
            <h3 class="h-card">{{ c.after.t2 }}</h3>
            <p class="body">{{ c.after.d2 }}</p>
          </div>
          <div class="chips">
            <NuxtLink :to="localePath('/histoire-des-vainqueurs')" class="btn btn-primary">{{ c.links['/histoire-des-vainqueurs'] }} →</NuxtLink>
            <NuxtLink :to="localePath('/tunisie')" class="btn btn-outline">{{ c.links['/tunisie'] }} →</NuxtLink>
          </div>
        </div>
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

const sel = ref('all')

const ERA_TONES = { found: 'tile--purple', punic: 'tile--terra', fall: 'tile--ink' }

const C = {
  fr: {
    meta: {
      title: 'Chronologie de Carthage — sept siècles d\'histoire',
      desc: "De la fondation par Élyssa en 814 av. J.-C. à la prise par Rome en 146 : les grandes dates de Carthage, des comptoirs phéniciens aux guerres puniques."
    },
    hero: {
      chip: 'Chronologie',
      title: "Sept siècles d'histoire",
      lede: 'De la fondation phénicienne à la prise par Rome : les grandes dates de Carthage, époque par époque.',
      events: 'événements',
      periods: 'grandes périodes'
    },
    bc: 'av. J.-C.',
    frieze: {
      title: 'Les grandes périodes',
      start: '814 av. J.-C.',
      end: '146 av. J.-C.',
      note: 'La largeur de chaque période est proportionnelle à sa durée',
      periods: [
        { era: '814–550 av. J.-C.', short: '814–550', span: 264, tone: 'b-purple', name: 'Période archaïque', desc: "Fondation et croissance de la cité. Carthage passe d'un simple comptoir phénicien à la métropole dominante de la Méditerranée occidentale, à la tête d'un vaste réseau de colonies et de comptoirs." },
        { era: '550–264 av. J.-C.', short: '550–264', span: 286, tone: 'b-soft', name: "Âge d'or", desc: "Apogée de la puissance carthaginoise : domination navale, guerres contre les Grecs de Sicile, agriculture savante et commerce à l'échelle du continent." },
        { era: '264–201 av. J.-C.', short: '264–201', span: 63, tone: 'b-terra', name: 'Guerres puniques', desc: "L'affrontement titanesque avec Rome pour la domination de la Méditerranée, marqué par l'épopée d'Hannibal Barca en Italie." },
        { era: '201–146 av. J.-C.', short: '201–146', span: 55, tone: 'b-ink', name: 'Prise & continuité', desc: "Après Zama, Carthage connaît une remarquable renaissance économique. En 146, Rome prend la ville par la force ; mais la culture, la langue et le peuple puniques lui survivent." }
      ]
    },
    list: { title: 'Les grandes dates', filter: 'Filtrer par époque', all: 'Tout', bios: 'Toutes les biographies' },
    eras: [
      { id: 'found', name: 'Fondation & expansion', dates: '814 – 264 av. J.-C.', desc: "D'une colonie de Tyr à la première puissance navale de Méditerranée occidentale." },
      { id: 'punic', name: 'Guerres puniques', dates: '264 – 201 av. J.-C.', desc: "Soixante ans de guerre contre Rome, de la Sicile à Zama, en passant par l'Italie d'Hannibal." },
      { id: 'fall', name: 'Chute', dates: '201 – 146 av. J.-C.', desc: 'Une paix de vaincu, une renaissance économique, puis la troisième guerre et la prise de la ville.' }
    ],
    events: [
      { era: 'found', y: '814', tag: 'Fondation', title: 'Fondation de Carthage', text: "La princesse phénicienne Didon (Élyssa), fuyant Tyr après l'assassinat de son époux Sychée par son frère Pygmalion, fonde Carthage — Qart Hadasht, « Ville Nouvelle » — sur la côte de l'actuelle Tunisie. La colline de Byrsa devient le cœur de la cité. La date est transmise par l'historien grec Timée ; les plus anciens vestiges fouillés remontent à la seconde moitié du VIIIe siècle av. J.-C.", links: ['/fondation', '/didon'], img: 'turner-dido.jpg', alt: 'Turner — Didon construisant Carthage' },
      { era: 'found', y: 'VIIe s.', tag: 'Expansion', title: 'Expansion en Méditerranée', text: "Carthage établit des comptoirs en Sardaigne, en Sicile occidentale, aux Baléares — Ibiza (Ebusus) est fondée vers 654 selon Diodore — et le long des côtes d'Afrique du Nord. Elle devient la principale puissance phénicienne de Méditerranée occidentale.", links: ['/carte'] },
      { era: 'found', y: '535', tag: 'Bataille', title: "Bataille d'Alalia", text: "Alliés aux Étrusques, les Carthaginois affrontent au large de la Corse les Grecs de Phocée. Selon Hérodote, les Phocéens l'emportent mais perdent 40 de leurs 60 navires et abandonnent l'île : une victoire stratégique pour Carthage, qui freine l'expansion grecque en Méditerranée occidentale." },
      { era: 'found', y: '509', tag: 'Diplomatie', title: 'Premier traité avec Rome', text: "Rapporté par Polybe, ce traité de commerce et de non-agression délimite les zones d'influence : les navires romains ne doivent pas naviguer au-delà du « Beau Promontoire », près de Carthage. La jeune République reconnaît la suprématie maritime punique.", links: ['/economie'] },
      { era: 'found', y: '480', tag: 'Bataille', title: "Bataille d'Himère", text: "En Sicile, Hamilcar le Magonide est vaincu par Gélon de Syracuse et Théron d'Agrigente. L'échec suspend pour des décennies l'expansion carthaginoise dans l'île et entraîne des réformes politiques à Carthage." },
      { era: 'found', y: 'Ve s.', tag: 'Exploration', title: "Les périples d'Hannon et d'Himilcon", text: "Hannon longe la côte atlantique de l'Afrique avec une flotte de colons ; Himilcon remonte les côtes atlantiques de l'Europe. Le récit d'Hannon, traduit en grec, nous est parvenu.", links: ['/hannon', '/carte'] },
      { era: 'found', y: 'Ve s.', tag: 'Afrique', title: "Carthage se tourne vers l'Afrique", text: "Selon Justin, Carthage versait depuis sa fondation un loyer annuel aux Africains pour le sol de la ville ; sous les Magonides, elle cesse de le payer et soumet son arrière-pays. On y a vu une conséquence d'Himère ; certains historiens préfèrent parler d'une extension progressive.", links: ['/fondation'] },
      { era: 'found', y: '409–405', tag: 'Guerre', title: 'Retour en Sicile', text: "Hannibal, petit-fils d'Hamilcar, détruit Sélinonte et Himère (409). Il meurt de la peste devant Agrigente, que prend son successeur Himilcon (406). La paix conclue avec Denys de Syracuse (405) n'est qu'une trêve.", links: ['/guerres-puniques'] },
      { era: 'found', y: '398–396', tag: 'Guerre', title: 'Denys de Syracuse contre Carthage', text: "Denys prend Motyé, place forte punique de l'ouest de la Sicile. La riposte carthaginoise mène au siège de Syracuse, levé en 396 à cause d'une épidémie. La guerre reprend par intermittence pendant soixante ans." },
      { era: 'found', y: '348', tag: 'Diplomatie', title: 'Deuxième traité avec Rome', text: "Rapporté par Polybe (III, 24), il élargit la zone interdite aux Romains jusqu'à Mastia, en Espagne, et leur ferme la Sardaigne et la Libye.", links: ['/guerres-puniques'] },
      { era: 'found', y: '310', tag: 'Guerre', title: "Agathocle envahit l'Afrique", text: "Le tyran de Syracuse débarque au cap Bon et menace directement Carthage. Il est finalement repoussé (307), mais l'invasion révèle la vulnérabilité du territoire africain de la cité." },
      { era: 'found', y: '306', tag: 'Diplomatie', title: 'Le « traité de Philinos »', text: "D'après l'historien Philinos d'Agrigente, Rome et Carthage se seraient interdit l'une la Sicile, l'autre l'Italie. Polybe conteste l'existence de ce traité ; Tite-Live signale un renouvellement de l'alliance cette année-là. La question reste débattue.", links: ['/guerres-puniques'] },
      { era: 'found', y: '279', tag: 'Diplomatie', title: 'Alliance contre Pyrrhus', text: "Rome et Carthage s'engagent à s'aider mutuellement contre Pyrrhus, roi d'Épire (Polybe, III, 25). C'est leur dernier traité avant la guerre." },
      { era: 'found', y: '278–276', tag: 'Guerre', title: 'Pyrrhus en Sicile', text: "Appelé par les Grecs de Sicile, Pyrrhus s'empare de presque tout l'ouest punique, mais échoue devant Lilybée et quitte l'île. Selon Plutarque, il y voyait déjà le futur champ de bataille de Rome et de Carthage.", links: ['/guerres-puniques', '/elephants'] },

      { era: 'punic', y: '264–241', tag: 'Guerre punique', title: 'Première guerre punique', text: "Premier grand conflit entre Rome et Carthage, pour la Sicile. Après 23 ans de guerre navale et terrestre, conclue par la défaite des îles Égates (241), Carthage perd la Sicile ; Rome devient une puissance maritime.", links: ['/guerres-puniques'] },
      { era: 'punic', y: '241–238', tag: 'Guerre civile', title: 'Guerre des Mercenaires', text: "Les mercenaires impayés se révoltent et entraînent une partie des Libyens. Hamilcar Barca les écrase au terme d'une guerre atroce, qui assoit la puissance de la famille barcide. Rome profite de la crise pour s'emparer de la Sardaigne et de la Corse.", links: ['/hamilcar'] },
      { era: 'punic', y: '237–228', tag: 'Conquête', title: "Hamilcar conquiert l'Espagne", text: "Pour compenser les pertes, Hamilcar Barca part soumettre la péninsule Ibérique, riche en argent, et fonde Akra Leukê. Son fils Hannibal, 9 ans, l'accompagne après avoir juré devant l'autel de ne jamais être l'ami de Rome.", links: ['/hamilcar', '/hannibal'] },
      { era: 'punic', y: '221', tag: 'Commandement', title: 'Hannibal prend le commandement', text: "Après l'assassinat d'Hasdrubal le Beau — gendre d'Hamilcar et fondateur de Carthagène —, l'armée d'Espagne acclame Hannibal Barca, 26 ans, commandant en chef.", links: ['/hannibal'] },
      { era: 'punic', y: '219', tag: 'Guerre punique', title: 'Siège de Sagonte', text: "Hannibal assiège et prend, après huit mois, Sagonte, cité ibérique alliée de Rome. L'affaire déclenche la deuxième guerre punique, le plus grand conflit de l'Antiquité.", links: ['/hannibal'] },
      { era: 'punic', y: '218', tag: 'Exploit militaire', title: 'Traversée des Alpes', text: "Hannibal quitte l'Espagne avec environ 50 000 fantassins, 9 000 cavaliers et 37 éléphants, franchit les Pyrénées, traverse le sud de la Gaule puis les Alpes en 15 jours. Selon Polybe, il n'arrive en Italie qu'avec 20 000 fantassins et 6 000 cavaliers.", links: ['/hannibal', '/elephants'], img: 'leutemann.jpg', alt: 'Leutemann — Hannibal franchit les Alpes' },
      { era: 'punic', y: '218', tag: 'Victoire', title: 'Le Tessin et la Trébie', text: "Premières victoires en Italie. Au Tessin, la cavalerie d'Hannibal bat celle du consul Scipion. À la Trébie, une embuscade tendue par Magon, frère d'Hannibal, prend à revers l'armée de Sempronius Longus.", links: ['/tactiques', '/magon-barca'] },
      { era: 'punic', y: '217', tag: 'Victoire', title: 'Lac Trasimène', text: "L'une des plus grandes embuscades de l'histoire militaire : Hannibal attire l'armée du consul Flaminius sur la rive du lac, dans le brouillard. 15 000 Romains sont tués, dont le consul lui-même. Rome est en état de choc.", links: ['/tactiques'], img: 'trasimeno.jpg', alt: 'Le lac Trasimène' },
      { era: 'punic', y: '216', tag: "Chef-d'œuvre tactique", title: 'Bataille de Cannes', text: "Avec une armée inférieure en nombre, Hannibal encercle et anéantit 8 légions romaines (environ 50 000 à 70 000 morts). Ce double enveloppement est encore étudié dans les académies militaires.", links: ['/tactiques', '/hannibal'], img: 'cannae.jpg', alt: 'La mort de Paul Émile à Cannes' },
      { era: 'punic', y: '207', tag: 'Défaite', title: 'Hasdrubal au Métaure', text: "Hasdrubal Barca franchit à son tour les Alpes pour rejoindre son frère avec des renforts d'Espagne. Intercepté au Métaure, il est tué ; les Romains jettent sa tête dans le camp d'Hannibal.", links: ['/hasdrubal'] },
      { era: 'punic', y: '203', tag: 'Tournant', title: "Rappel d'Hannibal", text: "Scipion a débarqué en Afrique (204). Syphax, roi numide allié de Carthage, est capturé ; son épouse Sophonisbe choisit le poison plutôt que d'être livrée à Rome. Magon Barca meurt de ses blessures en revenant d'Italie, et Hannibal est rappelé après quinze ans de campagne.", links: ['/sophonisbe', '/magon-barca'] },
      { era: 'punic', y: '202', tag: 'Défaite décisive', title: 'Bataille de Zama', text: "Scipion, allié au Numide Massinissa, affronte Hannibal près de Zama. Les tactiques d'Hannibal sont retournées contre lui : Carthage perd la guerre et doit accepter des conditions de paix humiliantes.", links: ['/hannibal', '/guerres-puniques'], img: 'zama.jpg', alt: 'La bataille de Zama, gravure de Cornelis Cort' },

      { era: 'fall', y: '201', tag: 'Diplomatie', title: 'Une paix de vaincu', text: "Carthage doit verser 10 000 talents en 50 ans, livrer ses éléphants, réduire sa flotte à dix navires et renoncer à toute guerre sans l'accord de Rome.", links: ['/guerres-puniques'] },
      { era: 'fall', y: '196–195', tag: 'Réforme', title: 'Hannibal suffète', text: "Élu suffète, Hannibal assainit les finances et rend annuel le mandat des juges du tribunal des Cent-Quatre. La cité connaît une renaissance économique remarquable. Dénoncé à Rome par ses adversaires, il doit s'exiler en Orient (195).", links: ['/hannibal', '/economie'] },
      { era: 'fall', y: '183', tag: 'Exil', title: "Mort d'Hannibal", text: "Réfugié auprès de rois hellénistiques, traqué par Rome, Hannibal s'empoisonne à Libyssa, en Bithynie, pour ne pas être livré.", links: ['/hannibal'] },
      { era: 'fall', y: '151', tag: 'Prétexte', title: 'Le dernier versement', text: "Carthage achève de payer son indemnité de guerre et prend les armes contre les empiétements de Massinissa. À Rome, où Caton répète « Carthago delenda est », on y voit une violation du traité.", links: ['/prise-de-carthage'] },
      { era: 'fall', y: '149–146', tag: 'Guerre punique', title: 'Troisième guerre punique', text: "Carthage livre ses armes, puis Rome exige que ses habitants abandonnent la ville pour s'installer loin de la mer. Ils refusent : suit un siège de trois ans, jusqu'à l'entrée de Scipion Émilien dans la ville.", links: ['/prise-de-carthage'] },
      { era: 'fall', y: '146', tag: 'Prise par Rome', hl: true, title: 'Prise de Carthage', text: "Au printemps, Scipion Émilien force les défenses ; six jours de combats de rue mènent jusqu'à Byrsa. La ville est incendiée, les survivants vendus comme esclaves, et le territoire devient la province romaine d'Afrique.", note: "Note archéologique — Les fouilles de Byrsa montrent une couche d'incendie de 146, sous laquelle des maisons puniques sont conservées. Le sel répandu sur les ruines est un mythe moderne ; Rome refonde Carthage sur le même site un siècle plus tard.", links: ['/prise-de-carthage', '/histoire-des-vainqueurs'] }
    ],
    links: {
      '/fondation': 'La fondation', '/didon': 'Didon', '/carte': 'Carte animée', '/economie': "L'économie", '/hannon': 'Hannon',
      '/guerres-puniques': 'Les guerres puniques', '/hamilcar': 'Hamilcar Barca', '/hannibal': 'Hannibal', '/elephants': 'Les éléphants',
      '/tactiques': 'Les tactiques', '/magon-barca': 'Magon Barca', '/hasdrubal': 'Hasdrubal Barca', '/sophonisbe': 'Sophonisbe',
      '/prise-de-carthage': 'La prise de Carthage', '/histoire-des-vainqueurs': "L'histoire des vainqueurs", '/tunisie': 'Carthage et la Tunisie'
    },
    after: {
      kicker: 'Après 146',
      title: 'La ville renaît',
      rows: [
        { key: '122 av. J.-C.', val: "Caius Gracchus tente d'installer sur le site la colonie romaine de Junonia : le projet échoue." },
        { key: '44–29 av. J.-C.', val: "Décidée par César, la refondation est réalisée sous Auguste : Colonia Iulia Concordia Carthago devient la capitale de l'Afrique romaine." },
        { key: 'Ve s. apr. J.-C.', val: "Saint Augustin atteste que le punique est encore parlé dans les campagnes d'Afrique." },
        { key: '1979', val: "Le site archéologique de Carthage est inscrit au patrimoine mondial de l'UNESCO." }
      ],
      k2: 'Sources',
      t2: 'Une histoire racontée par Rome',
      d2: "Presque toutes ces dates nous viennent d'auteurs grecs et romains — Polybe, Tite-Live, Appien. L'archéologie permet aujourd'hui de les confronter aux traces laissées par les Carthaginois eux-mêmes."
    },
    more: {
      title: 'À lire aussi',
      items: [
        { to: '/fondation', kick: '814 av. J.-C.', title: 'La fondation', text: "Élyssa, la peau de bœuf et la naissance de Qart Hadasht.", cls: 'tile--purple' },
        { to: '/prise-de-carthage', kick: '149 – 146 av. J.-C.', title: 'La prise de Carthage', text: 'Le siège, la chute de Byrsa et ce que disent les fouilles.', cls: 'tile--ink' },
        { to: '/carte', kick: 'Carte animée', title: 'Carthage et la Méditerranée', text: "Territoires de 814 à 146, campagne d'Hannibal, voyages et alliés.", cls: 'tile--navy' }
      ]
    }
  },

  en: {
    meta: {
      title: 'Timeline of Carthage — seven centuries of history',
      desc: 'From its foundation by Elissa in 814 BC to its capture by Rome in 146: the key dates of Carthage, from Phoenician trading posts to the Punic Wars.'
    },
    hero: {
      chip: 'Timeline',
      title: 'Seven centuries of history',
      lede: 'From the Phoenician foundation to the Roman capture: the key dates of Carthage, era by era.',
      events: 'events',
      periods: 'major periods'
    },
    bc: 'BC',
    frieze: {
      title: 'Major periods',
      start: '814 BC',
      end: '146 BC',
      note: 'The width of each period is proportional to its length',
      periods: [
        { era: '814–550 BC', short: '814–550', span: 264, tone: 'b-purple', name: 'Archaic period', desc: 'Foundation and growth of the city. Carthage evolves from a simple Phoenician trading post into the dominant metropolis of the western Mediterranean, at the head of a vast network of colonies and trading posts.' },
        { era: '550–264 BC', short: '550–264', span: 286, tone: 'b-soft', name: 'Golden age', desc: 'The peak of Carthaginian power: naval dominance, wars against the Greeks of Sicily, scientific agriculture and continental-scale trade.' },
        { era: '264–201 BC', short: '264–201', span: 63, tone: 'b-terra', name: 'Punic Wars', desc: "The titanic clash with Rome for mastery of the Mediterranean, marked by Hannibal Barca's epic campaigns in Italy." },
        { era: '201–146 BC', short: '201–146', span: 55, tone: 'b-ink', name: 'Capture & continuity', desc: 'After Zama, Carthage enjoys a remarkable economic revival. In 146, Rome takes the city by force; but Punic culture, language and people outlive it.' }
      ]
    },
    list: { title: 'Key dates', filter: 'Filter by era', all: 'All', bios: 'All biographies' },
    eras: [
      { id: 'found', name: 'Foundation & expansion', dates: '814 – 264 BC', desc: 'From a colony of Tyre to the leading naval power of the western Mediterranean.' },
      { id: 'punic', name: 'Punic Wars', dates: '264 – 201 BC', desc: "Sixty years of war against Rome, from Sicily to Zama by way of Hannibal's Italy." },
      { id: 'fall', name: 'Fall', dates: '201 – 146 BC', desc: 'A victor\'s peace, an economic revival, then the third war and the capture of the city.' }
    ],
    events: [
      { era: 'found', y: '814', tag: 'Foundation', title: 'Foundation of Carthage', text: 'Phoenician princess Dido (Elissa), fleeing Tyre after her husband Sychaeus was murdered by her brother Pygmalion, founds Carthage — Qart Hadasht, "New City" — on the coast of present-day Tunisia. The hill of Byrsa becomes the heart of the city. The date comes from the Greek historian Timaeus; the oldest excavated remains go back to the second half of the 8th century BC.', links: ['/fondation', '/didon'], img: 'turner-dido.jpg', alt: 'Turner — Dido building Carthage' },
      { era: 'found', y: '7th c.', tag: 'Expansion', title: 'Mediterranean expansion', text: 'Carthage establishes trading posts in Sardinia, western Sicily, the Balearics — Ibiza (Ebusus) is founded around 654 according to Diodorus — and along the North African coast. It becomes the leading Phoenician power in the western Mediterranean.', links: ['/carte'] },
      { era: 'found', y: '535', tag: 'Battle', title: 'Battle of Alalia', text: 'Allied with the Etruscans, the Carthaginians fight the Phocaean Greeks off Corsica. According to Herodotus, the Phocaeans win but lose 40 of their 60 ships and abandon the island: a strategic victory for Carthage, which checks Greek expansion in the western Mediterranean.' },
      { era: 'found', y: '509', tag: 'Diplomacy', title: 'First treaty with Rome', text: 'Recorded by Polybius, this treaty of trade and non-aggression sets out spheres of influence: Roman ships may not sail beyond the "Fair Promontory" near Carthage. The young Republic recognises Punic maritime supremacy.', links: ['/economie'] },
      { era: 'found', y: '480', tag: 'Battle', title: 'Battle of Himera', text: 'In Sicily, Hamilcar the Magonid is defeated by Gelon of Syracuse and Theron of Akragas. The setback halts Carthaginian expansion on the island for decades and triggers political reforms in Carthage.' },
      { era: 'found', y: '5th c.', tag: 'Exploration', title: 'The voyages of Hanno and Himilco', text: "Hanno sails down the Atlantic coast of Africa with a fleet of colonists; Himilco explores the Atlantic coasts of Europe. Hanno's account, translated into Greek, has come down to us.", links: ['/hannon', '/carte'] },
      { era: 'found', y: '5th c.', tag: 'Africa', title: 'Carthage turns towards Africa', text: "According to Justin, Carthage had paid the Africans a yearly rent for the ground of the city since its foundation; under the Magonids it stops paying and subdues its hinterland. This has been seen as a consequence of Himera; some historians prefer to speak of a gradual expansion.", links: ['/fondation'] },
      { era: 'found', y: '409–405', tag: 'War', title: 'Return to Sicily', text: "Hannibal, Hamilcar's grandson, destroys Selinus and Himera (409). He dies of plague before Akragas, which his successor Himilco takes (406). The peace made with Dionysius of Syracuse (405) is no more than a truce.", links: ['/guerres-puniques'] },
      { era: 'found', y: '398–396', tag: 'War', title: 'Dionysius of Syracuse against Carthage', text: 'Dionysius takes Motya, the Punic stronghold of western Sicily. The Carthaginian counter-attack leads to the siege of Syracuse, lifted in 396 because of an epidemic. War resumes on and off for sixty years.' },
      { era: 'found', y: '348', tag: 'Diplomacy', title: 'Second treaty with Rome', text: 'Reported by Polybius (III, 24), it extends the zone closed to the Romans as far as Mastia in Spain, and shuts Sardinia and Libya to them.', links: ['/guerres-puniques'] },
      { era: 'found', y: '310', tag: 'War', title: 'Agathocles invades Africa', text: 'The tyrant of Syracuse lands on Cape Bon and directly threatens Carthage. He is eventually driven out (307), but the invasion exposes the vulnerability of the city\'s African territory.' },
      { era: 'found', y: '306', tag: 'Diplomacy', title: 'The “Philinus treaty”', text: 'According to the historian Philinus of Akragas, Rome and Carthage barred themselves from Sicily and Italy respectively. Polybius disputes that this treaty existed; Livy records a renewal of the alliance that year. The question is still debated.', links: ['/guerres-puniques'] },
      { era: 'found', y: '279', tag: 'Diplomacy', title: 'Alliance against Pyrrhus', text: 'Rome and Carthage agree to help each other against Pyrrhus, king of Epirus (Polybius, III, 25). It is their last treaty before the war.' },
      { era: 'found', y: '278–276', tag: 'War', title: 'Pyrrhus in Sicily', text: 'Called in by the Sicilian Greeks, Pyrrhus seizes almost the whole Punic west but fails before Lilybaeum and leaves the island. According to Plutarch, he already saw it as the future battlefield of Rome and Carthage.', links: ['/guerres-puniques', '/elephants'] },

      { era: 'punic', y: '264–241', tag: 'Punic War', title: 'First Punic War', text: 'The first great conflict between Rome and Carthage, fought over Sicily. After 23 years of naval and land warfare, ending with defeat at the Aegates Islands (241), Carthage loses Sicily; Rome becomes a maritime power.', links: ['/guerres-puniques'] },
      { era: 'punic', y: '241–238', tag: 'Civil war', title: 'Mercenary War', text: "Unpaid mercenaries revolt and draw part of the Libyans with them. Hamilcar Barca crushes them after an atrocious war that establishes the power of the Barcid family. Rome exploits the crisis to seize Sardinia and Corsica.", links: ['/hamilcar'] },
      { era: 'punic', y: '237–228', tag: 'Conquest', title: "Hamilcar's conquest of Spain", text: 'To make up for the losses, Hamilcar Barca sets out to subdue the silver-rich Iberian Peninsula and founds Akra Leuke. His son Hannibal, aged 9, goes with him after swearing at the altar never to be a friend of Rome.', links: ['/hamilcar', '/hannibal'] },
      { era: 'punic', y: '221', tag: 'Command', title: 'Hannibal takes command', text: "After the assassination of Hasdrubal the Fair — Hamilcar's son-in-law and founder of Carthago Nova — the army in Spain acclaims Hannibal Barca, aged 26, as commander-in-chief.", links: ['/hannibal'] },
      { era: 'punic', y: '219', tag: 'Punic War', title: 'Siege of Saguntum', text: 'After eight months, Hannibal takes Saguntum, an Iberian city allied with Rome. The affair triggers the Second Punic War, the greatest conflict of antiquity.', links: ['/hannibal'] },
      { era: 'punic', y: '218', tag: 'Military feat', title: 'Crossing the Alps', text: 'Hannibal leaves Spain with about 50,000 infantry, 9,000 cavalry and 37 elephants, crosses the Pyrenees and southern Gaul, then the Alps in 15 days. According to Polybius, he reaches Italy with only 20,000 infantry and 6,000 cavalry.', links: ['/hannibal', '/elephants'], img: 'leutemann.jpg', alt: 'Leutemann — Hannibal crossing the Alps' },
      { era: 'punic', y: '218', tag: 'Victory', title: 'Ticinus and Trebia', text: "First victories in Italy. At the Ticinus, Hannibal's cavalry defeats that of the consul Scipio. At the Trebia, an ambush laid by Mago, Hannibal's brother, takes the army of Sempronius Longus from behind.", links: ['/tactiques', '/magon-barca'] },
      { era: 'punic', y: '217', tag: 'Victory', title: 'Lake Trasimene', text: 'One of the greatest ambushes in military history: Hannibal lures the army of the consul Flaminius onto the lakeshore, in the fog. 15,000 Romans are killed, including the consul himself. Rome is in shock.', links: ['/tactiques'], img: 'trasimeno.jpg', alt: 'Lake Trasimene' },
      { era: 'punic', y: '216', tag: 'Tactical masterpiece', title: 'Battle of Cannae', text: 'With a smaller army, Hannibal encircles and annihilates 8 Roman legions (about 50,000–70,000 dead). This double envelopment is still studied in military academies.', links: ['/tactiques', '/hannibal'], img: 'cannae.jpg', alt: 'The death of Paullus at Cannae' },
      { era: 'punic', y: '207', tag: 'Defeat', title: 'Hasdrubal at the Metaurus', text: "Hasdrubal Barca crosses the Alps in turn to join his brother with reinforcements from Spain. Intercepted at the Metaurus, he is killed; the Romans throw his head into Hannibal's camp.", links: ['/hasdrubal'] },
      { era: 'punic', y: '203', tag: 'Turning point', title: 'Hannibal recalled', text: 'Scipio has landed in Africa (204). Syphax, the Numidian king allied with Carthage, is captured; his wife Sophonisba chooses poison rather than be handed over to Rome. Mago Barca dies of his wounds on the way back from Italy, and Hannibal is recalled after fifteen years of campaigning.', links: ['/sophonisbe', '/magon-barca'] },
      { era: 'punic', y: '202', tag: 'Decisive defeat', title: 'Battle of Zama', text: "Scipio, allied with the Numidian Masinissa, faces Hannibal near Zama. Hannibal's tactics are turned against him: Carthage loses the war and must accept humiliating peace terms.", links: ['/hannibal', '/guerres-puniques'], img: 'zama.jpg', alt: 'The Battle of Zama, engraving by Cornelis Cort' },

      { era: 'fall', y: '201', tag: 'Diplomacy', title: "A loser's peace", text: 'Carthage must pay 10,000 talents over 50 years, hand over its elephants, reduce its fleet to ten ships and wage no war without Rome\'s consent.', links: ['/guerres-puniques'] },
      { era: 'fall', y: '196–195', tag: 'Reform', title: 'Hannibal as suffete', text: 'Elected suffete, Hannibal restores the finances and makes the judges of the Court of One Hundred and Four serve one-year terms. The city enjoys a remarkable economic revival. Denounced to Rome by his opponents, he goes into exile in the East (195).', links: ['/hannibal', '/economie'] },
      { era: 'fall', y: '183', tag: 'Exile', title: 'Death of Hannibal', text: 'A refugee at the courts of Hellenistic kings, hunted by Rome, Hannibal takes poison at Libyssa, in Bithynia, rather than be handed over.', links: ['/hannibal'] },
      { era: 'fall', y: '151', tag: 'Pretext', title: 'The last instalment', text: 'Carthage finishes paying its war indemnity and takes up arms against the encroachments of Masinissa. In Rome, where Cato keeps repeating "Carthago delenda est", this is deemed a breach of the treaty.', links: ['/prise-de-carthage'] },
      { era: 'fall', y: '149–146', tag: 'Punic War', title: 'Third Punic War', text: 'Carthage hands over its weapons, then Rome demands that its people abandon the city and settle far from the sea. They refuse: a three-year siege follows, until Scipio Aemilianus breaks into the city.', links: ['/prise-de-carthage'] },
      { era: 'fall', y: '146', tag: 'Taken by Rome', hl: true, title: 'Capture of Carthage', text: 'In the spring, Scipio Aemilianus forces the defences; six days of street fighting lead up to Byrsa. The city is burnt, the survivors sold into slavery, and the territory becomes the Roman province of Africa.', note: 'Archaeological note — Excavations on Byrsa show a burn layer from 146, beneath which Punic houses survive. The salt sown on the ruins is a modern myth; Rome refounded Carthage on the same site a century later.', links: ['/prise-de-carthage', '/histoire-des-vainqueurs'] }
    ],
    links: {
      '/fondation': 'The foundation', '/didon': 'Dido', '/carte': 'Animated map', '/economie': 'The economy', '/hannon': 'Hanno',
      '/guerres-puniques': 'The Punic Wars', '/hamilcar': 'Hamilcar Barca', '/hannibal': 'Hannibal', '/elephants': 'The elephants',
      '/tactiques': 'Tactics', '/magon-barca': 'Mago Barca', '/hasdrubal': 'Hasdrubal Barca', '/sophonisbe': 'Sophonisba',
      '/prise-de-carthage': 'The capture of Carthage', '/histoire-des-vainqueurs': "The victors' history", '/tunisie': 'Carthage and Tunisia'
    },
    after: {
      kicker: 'After 146',
      title: 'The city is reborn',
      rows: [
        { key: '122 BC', val: 'Gaius Gracchus tries to settle the Roman colony of Junonia on the site: the project fails.' },
        { key: '44–29 BC', val: 'Decided by Caesar, the refoundation is carried out under Augustus: Colonia Iulia Concordia Carthago becomes the capital of Roman Africa.' },
        { key: '5th c. AD', val: 'Saint Augustine attests that Punic is still spoken in the African countryside.' },
        { key: '1979', val: 'The archaeological site of Carthage is inscribed on the UNESCO World Heritage List.' }
      ],
      k2: 'Sources',
      t2: 'A history told by Rome',
      d2: 'Almost all of these dates come from Greek and Roman authors — Polybius, Livy, Appian. Archaeology now lets us test them against the traces left by the Carthaginians themselves.'
    },
    more: {
      title: 'Read also',
      items: [
        { to: '/fondation', kick: '814 BC', title: 'The foundation', text: 'Elissa, the oxhide and the birth of Qart Hadasht.', cls: 'tile--purple' },
        { to: '/prise-de-carthage', kick: '149 – 146 BC', title: 'The capture of Carthage', text: 'The siege, the fall of Byrsa and what the excavations tell us.', cls: 'tile--ink' },
        { to: '/carte', kick: 'Animated map', title: 'Carthage and the Mediterranean', text: "Territories from 814 to 146, Hannibal's campaign, voyages and allies.", cls: 'tile--navy' }
      ]
    }
  },

  ar: {
    meta: {
      title: 'التسلسل الزمني لقرطاج — سبعة قرون من التاريخ',
      desc: 'من تأسيسها على يد عليسة سنة 814 ق.م إلى استيلاء روما عليها سنة 146: أهم تواريخ قرطاج، من المراكز التجارية الفينيقية إلى الحروب البونيقية.'
    },
    hero: {
      chip: 'التسلسل الزمني',
      title: 'سبعة قرون من التاريخ',
      lede: 'من التأسيس الفينيقي إلى الاستيلاء الروماني: أهم تواريخ قرطاج، حقبةً بعد حقبة.',
      events: 'حدثًا',
      periods: 'فترات كبرى'
    },
    bc: 'ق.م',
    frieze: {
      title: 'الفترات الكبرى',
      start: '814 ق.م',
      end: '146 ق.م',
      note: 'عرض كل فترة يتناسب مع مدتها',
      periods: [
        { era: '814–550 ق.م', short: '814–550', span: 264, tone: 'b-purple', name: 'العصر القديم', desc: 'تأسيس المدينة ونموها. تتحول قرطاج من مجرد مركز تجاري فينيقي إلى الحاضرة المهيمنة على غرب المتوسط، على رأس شبكة واسعة من المستعمرات والمراكز التجارية.' },
        { era: '550–264 ق.م', short: '550–264', span: 286, tone: 'b-soft', name: 'العصر الذهبي', desc: 'ذروة القوة القرطاجية: هيمنة بحرية، وحروب ضد إغريق صقلية، وزراعة علمية، وتجارة على نطاق القارة.' },
        { era: '264–201 ق.م', short: '264–201', span: 63, tone: 'b-terra', name: 'الحروب البونيقية', desc: 'الصراع العملاق مع روما على السيادة في المتوسط، وقد طبعته حملات حنبعل برقا الأسطورية في إيطاليا.' },
        { era: '201–146 ق.م', short: '201–146', span: 55, tone: 'b-ink', name: 'السقوط والاستمرارية', desc: 'بعد زاما، تعرف قرطاج نهضة اقتصادية لافتة. وفي سنة 146 تستولي روما على المدينة بالقوة، لكن الثقافة واللغة والشعب البوني يبقون بعدها.' }
      ]
    },
    list: { title: 'التواريخ الكبرى', filter: 'التصفية حسب الحقبة', all: 'الكل', bios: 'كل السير' },
    eras: [
      { id: 'found', name: 'التأسيس والتوسع', dates: '814 – 264 ق.م', desc: 'من مستعمرة لصور إلى أولى القوى البحرية في غرب المتوسط.' },
      { id: 'punic', name: 'الحروب البونيقية', dates: '264 – 201 ق.م', desc: 'ستون عامًا من الحرب ضد روما، من صقلية إلى زاما مرورًا بإيطاليا حنبعل.' },
      { id: 'fall', name: 'السقوط', dates: '201 – 146 ق.م', desc: 'سلام المهزوم، ثم نهضة اقتصادية، ثم الحرب الثالثة والاستيلاء على المدينة.' }
    ],
    events: [
      { era: 'found', y: '814', tag: 'تأسيس', title: 'تأسيس قرطاج', text: 'الأميرة الفينيقية ديدون (عليسة)، هاربةً من صور بعد اغتيال زوجها سيخايوس على يد أخيها بيغماليون، تؤسس قرطاج — «قرت حدشت»، المدينة الجديدة — على ساحل تونس الحالية. وتصبح تلة بيرصا قلب المدينة. نقل هذا التاريخ المؤرخ الإغريقي تيمايوس، وتعود أقدم البقايا المكتشفة إلى النصف الثاني من القرن الثامن ق.م.', links: ['/fondation', '/didon'], img: 'turner-dido.jpg', alt: 'تيرنر — ديدون تبني قرطاج' },
      { era: 'found', y: 'ق 7', tag: 'توسع', title: 'التوسع في المتوسط', text: 'تنشئ قرطاج مراكز تجارية في سردينيا وغرب صقلية وجزر البليار — وتأسست إيبيزا (إيبوسوس) نحو 654 حسب ديودوروس — وعلى سواحل شمال إفريقيا، فتصبح القوة الفينيقية الأولى في غرب المتوسط.', links: ['/carte'] },
      { era: 'found', y: '535', tag: 'معركة', title: 'معركة ألاليا', text: 'بالتحالف مع الإتروسكيين، يواجه القرطاجيون إغريق فوقية قبالة كورسيكا. حسب هيرودوت انتصر الفوقيون لكنهم خسروا 40 من سفنهم الستين وتخلّوا عن الجزيرة: نصر استراتيجي لقرطاج كبح التوسع الإغريقي في غرب المتوسط.' },
      { era: 'found', y: '509', tag: 'دبلوماسية', title: 'أول معاهدة مع روما', text: 'معاهدة تجارة وعدم اعتداء نقلها بوليبيوس، تحدد مناطق النفوذ: لا يجوز للسفن الرومانية الإبحار إلى ما وراء «الرأس الجميل» قرب قرطاج. وتعترف الجمهورية الفتية بالتفوق البحري البوني.', links: ['/economie'] },
      { era: 'found', y: '480', tag: 'معركة', title: 'معركة هيميرا', text: 'في صقلية، يُهزم حملقار الماغوني أمام جيلون حاكم سرقوسة وثيرون حاكم أكراغاس. أوقفت هذه النكسة التوسع القرطاجي في الجزيرة لعقود، وأدت إلى إصلاحات سياسية في قرطاج.' },
      { era: 'found', y: 'ق 5', tag: 'استكشاف', title: 'رحلتا حنون وحِملكون', text: 'يبحر حنون على طول الساحل الأطلسي لإفريقيا بأسطول من المستوطنين، ويستكشف حِملكون السواحل الأطلسية لأوروبا. وقد وصلنا نص رحلة حنون مترجمًا إلى الإغريقية.', links: ['/hannon', '/carte'] },
      { era: 'found', y: 'ق 5', tag: 'إفريقيا', title: 'قرطاج تتجه نحو إفريقيا', text: 'حسب يوستينوس، كانت قرطاج تدفع للأفارقة منذ تأسيسها إتاوة سنوية مقابل أرض المدينة؛ وفي عهد الماغونيين تكفّ عن دفعها وتُخضع الداخل. ورأى فيه بعضهم نتيجةً لهزيمة هيميرا، بينما يفضّل مؤرخون آخرون الحديث عن توسع تدريجي.', links: ['/fondation'] },
      { era: 'found', y: '409–405', tag: 'حرب', title: 'العودة إلى صقلية', text: 'يدمّر حنبعل، حفيد حملقار، سيلينونتي وهيميرا (409). ثم يموت بالطاعون أمام أكراغاس التي يستولي عليها خلفه حِملكون (406). ولم يكن الصلح المعقود مع ديونيسيوس السرقوسي (405) سوى هدنة.', links: ['/guerres-puniques'] },
      { era: 'found', y: '398–396', tag: 'حرب', title: 'ديونيسيوس السرقوسي ضد قرطاج', text: 'يستولي ديونيسيوس على موتيا، المعقل البوني في غرب صقلية. ويقود الرد القرطاجي إلى حصار سرقوسة الذي رُفع سنة 396 بسبب وباء. وتتجدد الحرب على فترات طوال ستين عامًا.' },
      { era: 'found', y: '348', tag: 'دبلوماسية', title: 'المعاهدة الثانية مع روما', text: 'أوردها بوليبيوس (3، 24)، وهي توسّع المنطقة المحظورة على الرومان حتى ماستيا في إسبانيا، وتغلق في وجوههم سردينيا وليبيا.', links: ['/guerres-puniques'] },
      { era: 'found', y: '310', tag: 'حرب', title: 'أغاثوكليس يغزو إفريقيا', text: 'ينزل طاغية سرقوسة في الوطن القبلي ويهدد قرطاج مباشرة. صُدّ في النهاية (307)، لكن الغزو كشف هشاشة الأراضي الإفريقية للمدينة.' },
      { era: 'found', y: '306', tag: 'دبلوماسية', title: '«معاهدة فيلينوس»', text: 'حسب المؤرخ فيلينوس الأكراغاسي، تكون روما قد امتنعت عن صقلية وقرطاج عن إيطاليا. يشكك بوليبيوس في وجود هذه المعاهدة، ويذكر تيتوس ليفيوس تجديدًا للتحالف في تلك السنة. ولا تزال المسألة موضع جدل.', links: ['/guerres-puniques'] },
      { era: 'found', y: '279', tag: 'دبلوماسية', title: 'تحالف ضد بيروس', text: 'تتعهد روما وقرطاج بالتعاون المتبادل ضد بيروس ملك إبيروس (بوليبيوس، 3، 25). وهي آخر معاهدة بينهما قبل الحرب.' },
      { era: 'found', y: '278–276', tag: 'حرب', title: 'بيروس في صقلية', text: 'يستنجد به إغريق صقلية، فيستولي بيروس على الغرب البوني كله تقريبًا، لكنه يعجز أمام ليليبايوم ويغادر الجزيرة. وحسب بلوتارخوس، كان يرى فيها منذئذ ساحة القتال المقبلة بين روما وقرطاج.', links: ['/guerres-puniques', '/elephants'] },

      { era: 'punic', y: '264–241', tag: 'حرب بونيقية', title: 'الحرب البونيقية الأولى', text: 'أول صراع كبير بين روما وقرطاج، من أجل صقلية. بعد 23 عامًا من الحرب البحرية والبرية، انتهت بهزيمة جزر إيغاتس (241)، تفقد قرطاج صقلية وتصبح روما قوة بحرية.', links: ['/guerres-puniques'] },
      { era: 'punic', y: '241–238', tag: 'حرب أهلية', title: 'حرب المرتزقة', text: 'يتمرد المرتزقة الذين لم يتقاضوا أجورهم ويجرّون معهم جزءًا من الليبيين. يسحقهم حملقار برقا بعد حرب فظيعة رسّخت قوة الأسرة البرقية. وتستغل روما الأزمة للاستيلاء على سردينيا وكورسيكا.', links: ['/hamilcar'] },
      { era: 'punic', y: '237–228', tag: 'فتح', title: 'حملقار يفتح إسبانيا', text: 'لتعويض الخسائر، ينطلق حملقار برقا لإخضاع شبه الجزيرة الإيبيرية الغنية بالفضة، ويؤسس أكرا لويكي. ويرافقه ابنه حنبعل، ذو التسع سنوات، بعد أن أقسم أمام المذبح ألّا يكون أبدًا صديقًا لروما.', links: ['/hamilcar', '/hannibal'] },
      { era: 'punic', y: '221', tag: 'قيادة', title: 'حنبعل يتولى القيادة', text: 'بعد اغتيال صدربعل الجميل — صهر حملقار ومؤسس قرطاجنة — يهتف جيش إسبانيا بحنبعل برقا، ابن السادسة والعشرين، قائدًا أعلى.', links: ['/hannibal'] },
      { era: 'punic', y: '219', tag: 'حرب بونيقية', title: 'حصار ساغونتوم', text: 'بعد ثمانية أشهر، يستولي حنبعل على ساغونتوم، المدينة الإيبيرية الحليفة لروما. فتشتعل الحرب البونيقية الثانية، أكبر صراعات العصور القديمة.', links: ['/hannibal'] },
      { era: 'punic', y: '218', tag: 'إنجاز عسكري', title: 'عبور جبال الألب', text: 'يغادر حنبعل إسبانيا بنحو 50,000 من المشاة و9,000 فارس و37 فيلًا، ويعبر البيرينيه وجنوب بلاد الغال ثم الألب في 15 يومًا. وحسب بوليبيوس، لم يصل إلى إيطاليا إلا بـ20,000 من المشاة و6,000 فارس.', links: ['/hannibal', '/elephants'], img: 'leutemann.jpg', alt: 'لويتمان — حنبعل يعبر الألب' },
      { era: 'punic', y: '218', tag: 'نصر', title: 'تيسينوس وتريبيا', text: 'أولى الانتصارات في إيطاليا. عند تيسينوس يهزم فرسان حنبعل فرسان القنصل سكيبيو. وعند تريبيا، يباغت كمينٌ نصبه ماغون، أخو حنبعل، جيشَ سمبرونيوس لونغوس من الخلف.', links: ['/tactiques', '/magon-barca'] },
      { era: 'punic', y: '217', tag: 'نصر', title: 'بحيرة تراسيمينو', text: 'من أعظم الكمائن في التاريخ العسكري: يستدرج حنبعل جيش القنصل فلامينيوس إلى ضفة البحيرة وسط الضباب. يُقتل 15,000 روماني، بينهم القنصل نفسه، وتصاب روما بالصدمة.', links: ['/tactiques'], img: 'trasimeno.jpg', alt: 'بحيرة تراسيمينو' },
      { era: 'punic', y: '216', tag: 'تحفة تكتيكية', title: 'معركة كاناي', text: 'بجيش أقل عددًا، يطوّق حنبعل ثمانية فيالق رومانية ويبيدها (نحو 50,000 إلى 70,000 قتيل). وما تزال مناورة التطويق المزدوج هذه تُدرَّس في الأكاديميات العسكرية.', links: ['/tactiques', '/hannibal'], img: 'cannae.jpg', alt: 'مقتل باولوس إيميليوس في كاناي' },
      { era: 'punic', y: '207', tag: 'هزيمة', title: 'صدربعل في ميتاوروس', text: 'يعبر صدربعل برقا الألب بدوره ليلحق بأخيه بتعزيزات من إسبانيا. يُعترض عند نهر ميتاوروس ويُقتل، ويقذف الرومان رأسه في معسكر حنبعل.', links: ['/hasdrubal'] },
      { era: 'punic', y: '203', tag: 'منعطف', title: 'استدعاء حنبعل', text: 'نزل سكيبيو في إفريقيا (204). يُؤسر سيفاكس، الملك النوميدي حليف قرطاج، وتختار زوجته صفنبعل السمّ على أن تُسلَّم لروما. ويموت ماغون برقا متأثرًا بجراحه في طريق عودته من إيطاليا، ويُستدعى حنبعل بعد خمسة عشر عامًا من القتال.', links: ['/sophonisbe', '/magon-barca'] },
      { era: 'punic', y: '202', tag: 'هزيمة حاسمة', title: 'معركة زاما', text: 'يواجه سكيبيو، متحالفًا مع النوميدي ماسينيسا، حنبعلَ قرب زاما. تُستعمل تكتيكات حنبعل ضده: تخسر قرطاج الحرب وتضطر إلى قبول شروط سلام مذلة.', links: ['/hannibal', '/guerres-puniques'], img: 'zama.jpg', alt: 'معركة زاما، نقش لكورنيليس كورت' },

      { era: 'fall', y: '201', tag: 'دبلوماسية', title: 'سلام المهزوم', text: 'على قرطاج أن تدفع 10,000 تالنت على 50 عامًا، وأن تسلم فيلتها، وتقلّص أسطولها إلى عشر سفن، وألا تخوض أي حرب دون موافقة روما.', links: ['/guerres-puniques'] },
      { era: 'fall', y: '196–195', tag: 'إصلاح', title: 'حنبعل شوفيطًا', text: 'بعد انتخابه شوفيطًا، يُصلح حنبعل المالية ويجعل ولاية قضاة محكمة المئة والأربعة سنوية. وتعرف المدينة نهضة اقتصادية لافتة. ثم يشي به خصومه لدى روما فيضطر إلى المنفى في الشرق (195).', links: ['/hannibal', '/economie'] },
      { era: 'fall', y: '183', tag: 'منفى', title: 'موت حنبعل', text: 'لاجئًا لدى ملوك هلنستيين وملاحَقًا من روما، يتجرع حنبعل السم في ليبيسا ببيثينيا كي لا يُسلَّم.', links: ['/hannibal'] },
      { era: 'fall', y: '151', tag: 'ذريعة', title: 'القسط الأخير', text: 'تنهي قرطاج دفع غرامة الحرب وتحمل السلاح ضد تعديات ماسينيسا. وفي روما، حيث يردد كاتو «يجب تدمير قرطاج»، يُعدّ ذلك خرقًا للمعاهدة.', links: ['/prise-de-carthage'] },
      { era: 'fall', y: '149–146', tag: 'حرب بونيقية', title: 'الحرب البونيقية الثالثة', text: 'تسلّم قرطاج أسلحتها، ثم تطالب روما سكانها بهجر المدينة والاستقرار بعيدًا عن البحر. يرفضون: فيبدأ حصار دام ثلاث سنوات، حتى اقتحم سكيبيو إيميليانوس المدينة.', links: ['/prise-de-carthage'] },
      { era: 'fall', y: '146', tag: 'استيلاء روماني', hl: true, title: 'الاستيلاء على قرطاج', text: 'في الربيع، يخترق سكيبيو إيميليانوس الدفاعات، وتقود ستة أيام من قتال الشوارع إلى بيرصا. تُحرق المدينة ويُباع الناجون عبيدًا، وتصبح الأرض ولاية إفريقيا الرومانية.', note: 'ملاحظة أثرية — تُظهر حفريات بيرصا طبقة حريق تعود إلى سنة 146، تحتها بيوت بونية محفوظة. أما نثر الملح على الأطلال فأسطورة حديثة؛ وقد أعادت روما تأسيس قرطاج في الموقع نفسه بعد قرن.', links: ['/prise-de-carthage', '/histoire-des-vainqueurs'] }
    ],
    links: {
      '/fondation': 'التأسيس', '/didon': 'ديدون', '/carte': 'الخريطة المتحركة', '/economie': 'الاقتصاد', '/hannon': 'حنون',
      '/guerres-puniques': 'الحروب البونيقية', '/hamilcar': 'حملقار برقا', '/hannibal': 'حنبعل', '/elephants': 'الفيلة',
      '/tactiques': 'التكتيكات', '/magon-barca': 'ماغون برقا', '/hasdrubal': 'صدربعل برقا', '/sophonisbe': 'صفنبعل',
      '/prise-de-carthage': 'الاستيلاء على قرطاج', '/histoire-des-vainqueurs': 'تاريخ المنتصرين', '/tunisie': 'قرطاج وتونس'
    },
    after: {
      kicker: 'بعد 146',
      title: 'المدينة تولد من جديد',
      rows: [
        { key: '122 ق.م', val: 'يحاول غايوس غراكوس إقامة مستعمرة يونونيا الرومانية في الموقع، فيفشل المشروع.' },
        { key: '44–29 ق.م', val: 'قرّر قيصر إعادة التأسيس ونُفّذت في عهد أغسطس: تصبح «كولونيا يوليا كونكورديا قرطاج» عاصمة إفريقيا الرومانية.' },
        { key: 'ق 5 م', val: 'يشهد القديس أوغسطين أن البونية ما تزال تُتكلَّم في أرياف إفريقيا.' },
        { key: '1979', val: 'يُدرج موقع قرطاج الأثري في قائمة التراث العالمي لليونسكو.' }
      ],
      k2: 'المصادر',
      t2: 'تاريخ روته روما',
      d2: 'تصلنا جلّ هذه التواريخ من مؤلفين إغريق ورومان — بوليبيوس وتيتوس ليفيوس وأبيانوس. ويتيح علم الآثار اليوم مقارنتها بالآثار التي تركها القرطاجيون أنفسهم.'
    },
    more: {
      title: 'اقرأ أيضًا',
      items: [
        { to: '/fondation', kick: '814 ق.م', title: 'التأسيس', text: 'عليسة وجلد الثور وولادة قرت حدشت.', cls: 'tile--purple' },
        { to: '/prise-de-carthage', kick: '149 – 146 ق.م', title: 'الاستيلاء على قرطاج', text: 'الحصار وسقوط بيرصا وما تقوله الحفريات.', cls: 'tile--ink' },
        { to: '/carte', kick: 'الخريطة المتحركة', title: 'قرطاج والمتوسط', text: 'الأراضي من 814 إلى 146، وحملة حنبعل، والرحلات والحلفاء.', cls: 'tile--navy' }
      ]
    }
  }
}

const c = computed(() => C[locale.value] || C.fr)

const events = computed(() => c.value.events)

const byEra = computed(() => {
  const out = { found: [], punic: [], fall: [] }
  for (const ev of events.value) out[ev.era].push(ev)
  return out
})

const filters = computed(() => [
  { id: 'all', label: c.value.list.all, n: events.value.length },
  ...c.value.eras.map(e => ({ id: e.id, label: e.name, n: byEra.value[e.id].length }))
])

const shownEras = computed(() =>
  c.value.eras
    .filter(e => sel.value === 'all' || e.id === sel.value)
    .map(e => ({ ...e, tone: ERA_TONES[e.id] }))
)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.span-num { font-size: clamp(40px, 4.6vw, 64px); }
.hero-chips { margin-top: 18px; }

/* Frise */
.frieze-title { margin-bottom: 24px; }
.frieze {
  display: flex;
  min-height: 76px;
  border-radius: 16px;
  overflow: hidden;
}
.band {
  flex-basis: 0;
  min-width: 150px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
}
.band + .band { border-inline-start: 2px solid var(--white); }
.band-name { font: 800 17px/1.1 var(--font-display); }
.band-era { font: 600 12px/1 var(--font-body); opacity: 0.85; }
.b-purple { background: var(--purple); color: var(--white); }
.b-soft { background: var(--purple-soft); color: var(--purple-dark); }
.b-terra { background: var(--terra); color: var(--white); }
.b-ink { background: var(--ink); color: var(--white); }
.frieze-legend {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
  font: 500 13px/1.3 var(--font-body);
  color: var(--muted);
}
.frieze-note { text-align: center; }
.periods { margin-top: 32px; }
.period { border-top: 3px solid var(--purple); padding-top: 16px; }
.period--b-soft { border-top-color: var(--purple-tint); }
.period--b-terra { border-top-color: var(--terra); }
.period--b-ink { border-top-color: var(--ink); }

/* Filtres */
.pill-row { margin-top: -4px; }

/* Époques */
.eras { display: flex; flex-direction: column; gap: clamp(28px, 3vw, 44px); padding: clamp(24px, 3vw, 40px) var(--gutter) 0; }
.era { display: flex; flex-direction: column; gap: var(--gap); }
.era-band {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px 40px;
}
.era-desc { max-width: 460px; }
.era--found { --era: var(--purple); }
.era--punic { --era: var(--terra); }
.era--fall { --era: var(--ink); }

.tl {
  list-style: none;
  margin: 0;
  padding-block: 8px;
  border-inline-start: 6px solid var(--era);
}
.ev {
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr) 150px;
  gap: 32px;
  padding: 26px 0;
  border-top: 1px solid rgba(22, 19, 15, 0.16);
}
.ev:first-child { border-top: 0; }
.ev-y { display: block; font: 900 clamp(26px, 2.6vw, 38px)/1 var(--font-display); letter-spacing: -0.02em; }
.ev-u { display: block; margin-top: 6px; font: 600 13px/1 var(--font-body); color: var(--muted); }
.ev-main--img { display: grid; grid-template-columns: minmax(0, 1fr) 260px; gap: 28px; align-items: start; }
.ev-title { font: 800 clamp(20px, 1.8vw, 26px)/1.1 var(--font-display); margin: 0 0 8px; }
.ev-text { font: 400 16px/1.6 var(--font-body); color: var(--muted); margin: 0; max-width: 720px; }
.ev-img { width: 100%; height: 170px; object-fit: cover; border-radius: 16px; background: var(--sand-deep); display: block; }
.ev-links { display: flex; flex-wrap: wrap; gap: 4px 18px; margin-top: 10px; }
.ev-link { display: inline-flex; align-items: center; min-height: 44px; font: 600 14px/1.2 var(--font-body); }
.ev-tag {
  font: 700 12px/1.3 var(--font-body);
  color: var(--era);
  text-align: end;
  padding-top: 6px;
}
.era--fall .ev-tag { color: var(--purple); }

.ev--hl {
  background: var(--ink);
  color: var(--white);
  border-radius: var(--r-md);
  padding: 32px 28px;
  margin: 8px calc(var(--pad-lg) * -0.5);
  border-top: 0;
}
.ev--hl + .ev { border-top: 0; }
.ev--hl .ev-u, .ev--hl .ev-text { color: var(--on-dark-2); }
.ev--hl .ev-tag { color: var(--purple-tint); }
.ev--hl .ev-link { color: var(--gold-light); }
.ev-note {
  margin: 16px 0 0;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font: 500 14px/1.6 var(--font-body);
  color: var(--on-dark-2);
  max-width: 720px;
}

/* Après */
.after-title { margin-bottom: 28px; }
.more-title { margin-bottom: 20px; }
.more { min-height: 200px; }

@media (max-width: 1100px) {
  .ev { grid-template-columns: 150px minmax(0, 1fr) 120px; gap: 24px; }
  .ev-main--img { grid-template-columns: minmax(0, 1fr); }
  .ev-img { max-width: 420px; }
}

@media (max-width: 960px) {
  .periods { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .band { min-width: 96px; }
  .band-name { font-size: 14px; }
}

/* Mobile : frise verticale avec ligne côté début */
@media (max-width: 640px) {
  .frieze { min-height: 44px; border-radius: 12px; }
  .band { min-width: 38px; padding: 8px; justify-content: center; }
  .band-name { display: none; }
  .band-era { font-size: 11px; }
  .frieze-note { display: none; }
  .periods { grid-template-columns: minmax(0, 1fr); gap: 18px; }

  .tl {
    border-inline-start: 0;
    position: relative;
    padding: 12px 18px 12px 0;
    padding-inline: 38px 18px;
  }
  .tl::before {
    content: '';
    position: absolute;
    inset-inline-start: 20px;
    top: 24px;
    bottom: 24px;
    width: 2px;
    background: var(--era);
  }
  .ev {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px 0;
  }
  .ev::before {
    content: '';
    position: absolute;
    inset-inline-start: -24px;
    top: 26px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--white);
    border: 3px solid var(--era);
  }
  .ev-year { display: flex; align-items: baseline; gap: 8px; order: 0; }
  .ev-u { margin-top: 0; }
  .ev-tag { order: 1; text-align: start; padding-top: 0; }
  .ev-main { order: 2; }
  .ev-title { font-size: 21px; }
  .ev-text { font-size: 15px; }
  .ev-img { height: 180px; max-width: none; }
  .ev--hl { margin: 8px 0; padding: 22px 18px; }
  .ev--hl::before { inset-inline-start: -24px; top: 30px; }
  .era-band { padding: 22px; }
  .more { min-height: 0; }
}
</style>
