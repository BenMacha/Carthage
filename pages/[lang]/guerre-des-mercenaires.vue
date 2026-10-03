<template>
  <div class="pg">
    <!-- Héros -->
    <div class="bento bento--top">
      <figure class="fig fig--hero s-5 hero-fig">
        <img src="/img/rochegrosse-bataille-macar.jpg" :alt="c.heroAlt" style="object-position:50% 30%">
        <figcaption class="cap-box">{{ c.heroCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--terra tile--stack tile--hero s-7">
        <div class="hero-top">
          <span class="chip chip--glass">{{ c.chip }}</span>
          <span class="hero-greek" aria-hidden="true">ἄσπονδος πόλεμος</span>
        </div>
        <div>
          <span class="kicker">{{ c.dates }}</span>
          <h1 class="h-display">{{ c.title }}</h1>
          <p class="epithet">{{ c.epithet }}</p>
          <p class="lede">{{ c.lede }}</p>
        </div>
      </div>
    </div>

    <!-- Chiffres clés -->
    <div class="cols cols-4">
      <div v-for="(s, i) in c.stats" :key="i" class="tile stat" :class="{ 'tile--ink': i === 2 }">
        <div class="num" :class="{ 'n-accent': i !== 2 }">{{ s.n }}</div>
        <p class="stat-t">{{ s.t }}</p>
        <p class="stat-src">{{ s.src }}</p>
      </div>
    </div>

    <!-- Introduction + sources -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl">
          <span class="kicker">{{ c.intro.kicker }}</span>
          <h2 class="h-block block-title">{{ c.intro.title }}</h2>
          <p v-for="(p, i) in c.intro.paras" :key="i" class="body-lg para">{{ p }}</p>
        </div>
        <div class="tile tile--xl tile--paper tile--outline tile--stack">
          <div>
            <span class="kicker">{{ c.sources.kicker }}</span>
            <h3 class="h-card">{{ c.sources.title }}</h3>
            <ul class="src-list">
              <li v-for="s in c.sources.items" :key="s.a"><strong>{{ s.a }}</strong> — {{ s.d }}</li>
            </ul>
          </div>
          <p class="body note">{{ c.sources.note }}</p>
        </div>
      </div>
    </section>

    <!-- Les causes -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.causes.title }}</h2>
        <p>{{ c.causes.aside }}</p>
      </div>
    </section>
    <div class="cols cols-3">
      <div v-for="(k, i) in c.causes.items" :key="i" class="tile tile--xl tile--stack" :class="k.tone">
        <div>
          <span class="kicker">{{ k.k }}</span>
          <h3 class="h-card">{{ k.t }}</h3>
          <p class="body">{{ k.d }}</p>
        </div>
      </div>
    </div>

    <!-- Les protagonistes -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.people.title }}</h2>
        <p>{{ c.people.aside }}</p>
      </div>
    </section>
    <div class="cols">
      <h3 class="side-t">{{ c.people.rebels }}</h3>
    </div>
    <div class="cols cols-4">
      <div v-for="p in c.people.rebelItems" :key="p.n" class="tile tile--stack person">
        <div>
          <span class="chip chip--terra">{{ p.k }}</span>
          <h4 class="h-card p-name">{{ p.n }}</h4>
          <p class="body">{{ p.d }}</p>
        </div>
      </div>
    </div>
    <div class="cols side-gap">
      <h3 class="side-t">{{ c.people.carthage }}</h3>
    </div>
    <div class="cols cols-4">
      <div v-for="p in c.people.carthItems" :key="p.n" class="tile tile--sand tile--stack person">
        <div>
          <span class="chip chip--white">{{ p.k }}</span>
          <h4 class="h-card p-name">{{ p.n }}</h4>
          <p class="body">{{ p.d }}</p>
        </div>
      </div>
    </div>

    <!-- Frise -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <span class="kicker">{{ c.chrono.kicker }}</span>
        <h2 class="h-section block-title">{{ c.chrono.title }}</h2>
        <div class="rows" style="--row-key:150px">
          <div v-for="(r, i) in c.chrono.rows" :key="i">
            <span class="key">{{ r.k }}</span>
            <span class="val"><strong>{{ r.t }}</strong> — {{ r.d }}</span>
          </div>
        </div>
        <p class="chrono-note">{{ c.chrono.note }}</p>
      </div>
    </section>

    <!-- Carte des lieux -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.map.title }}</h2>
        <p>{{ c.map.aside }}</p>
      </div>
    </section>
    <div class="cols cols-7-5">
      <div class="tile tile--xl tile--sand map-tile">
        <svg class="map" viewBox="0 0 680 580" role="img" aria-labelledby="merc-map-t">
          <title id="merc-map-t">{{ c.map.aria }}</title>
          <rect width="680" height="580" class="sea" />
          <path class="land" d="M0,150 L84,135 156,90 197,51 276,60 353,39 372,21 408,48 449,69 437,102 451,141 466,162 458,174 451,189 466,201 499,204 521,174 602,114 634,96 648,165 562,285 530,300 504,390 538,471 583,489 595,519 638,570 638,580 0,580 Z" />
          <ellipse class="lake" cx="444" cy="178" rx="13" ry="7" />
          <polyline class="river" points="0,279 91,270 168,255 250,255 300,210 346,171 384,135 403,111" />
          <text class="river-l" x="250" y="245" :direction="isAr ? 'rtl' : 'ltr'">{{ c.map.river }}</text>
          <g class="battle" transform="translate(378 140)" aria-hidden="true">
            <path d="M-8,-8 L8,8 M8,-8 L-8,8" />
          </g>
          <g class="battle" transform="translate(560 506)" aria-hidden="true">
            <path d="M-8,-8 L8,8 M8,-8 L-8,8" />
          </g>
          <g v-for="p in places" :key="p.id" class="place" :class="p.side">
            <circle :cx="p.x" :cy="p.y" r="7" />
            <text :x="p.x + p.dx" :y="p.y + p.dy" :text-anchor="p.anchor" :direction="isAr ? 'rtl' : 'ltr'">{{ c.map.names[p.id] }}</text>
          </g>
          <text class="sea-l" x="560" y="300" text-anchor="middle" :direction="isAr ? 'rtl' : 'ltr'">{{ c.map.sea }}</text>
        </svg>
        <div class="map-legend">
          <span><i class="dot dot--c" aria-hidden="true" />{{ c.map.legC }}</span>
          <span><i class="dot dot--r" aria-hidden="true" />{{ c.map.legR }}</span>
          <span><i class="dot dot--x" aria-hidden="true" />{{ c.map.legX }}</span>
          <span><i class="dot dot--n" aria-hidden="true" />{{ c.map.legN }}</span>
          <span><i class="x" aria-hidden="true">×</i>{{ c.map.legB }}</span>
        </div>
      </div>
      <div class="tile tile--xl tile--stack">
        <div class="rows rows--places" style="--row-key:120px">
          <div v-for="r in c.map.rows" :key="r.k">
            <span class="key">{{ r.k }}</span>
            <span class="val">{{ r.v }}</span>
          </div>
        </div>
        <p class="body note">{{ c.map.note }}</p>
      </div>
    </div>

    <!-- Cruauté -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <div class="tile tile--xl tile--purple tile--stack">
          <div>
            <span class="kicker">{{ c.cruel.kicker }}</span>
            <h2 class="h-block block-title">{{ c.cruel.title }}</h2>
            <p class="body-lg">{{ c.cruel.intro }}</p>
          </div>
          <blockquote class="quote quote--light">
            <p>{{ c.cruel.quote }}</p>
            <cite>{{ c.cruel.cite }}</cite>
          </blockquote>
        </div>
        <div class="tile tile--xl tile--paper">
          <div class="steps">
            <div v-for="(s, i) in c.cruel.steps" :key="i" class="step">
              <span class="step-n" aria-hidden="true">{{ i + 1 }}</span>
              <div>
                <h3 class="h-card">{{ s.t }}</h3>
                <p class="body">{{ s.d }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- La Scie -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl">
          <span class="kicker">{{ c.saw.kicker }}</span>
          <h2 class="h-block block-title">{{ c.saw.title }}</h2>
          <p v-for="(p, i) in c.saw.paras" :key="i" class="body-lg para">{{ p }}</p>
        </div>
        <div class="tile tile--xl tile--gold tile--stack">
          <div>
            <span class="kicker">{{ c.saw.boxK }}</span>
            <h3 class="h-card">{{ c.saw.boxT }}</h3>
            <p class="body">{{ c.saw.boxD }}</p>
          </div>
          <div class="chips">
            <span v-for="t in c.saw.chips" :key="t" class="chip chip--white">{{ t }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Rome et Hiéron -->
    <section class="sec">
      <div class="cols cols-2 cols--flush">
        <div class="tile tile--xl tile--outline">
          <span class="kicker">{{ c.rome.kicker }}</span>
          <h2 class="h-block block-title">{{ c.rome.title }}</h2>
          <p v-for="(p, i) in c.rome.paras" :key="i" class="body para">{{ p }}</p>
        </div>
        <figure class="fig ruins-fig">
          <img src="/img/byrsa.jpg" :alt="c.rome.alt" loading="lazy">
          <figcaption class="cap-box">{{ c.rome.cap }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- Conséquences -->
    <section class="sec">
      <div class="tile tile--xl tile--navy">
        <span class="kicker">{{ c.conseq.kicker }}</span>
        <h2 class="h-block block-title">{{ c.conseq.title }}</h2>
        <div class="cols cols-4 cols--flush conseq-grid">
          <div v-for="(l, i) in c.conseq.items" :key="i" class="conseq-item">
            <div class="num conseq-n">{{ l.n }}</div>
            <h3 class="h-card">{{ l.t }}</h3>
            <p class="body">{{ l.d }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Salammbô -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.sal.title }}</h2>
        <p>{{ c.sal.aside }}</p>
      </div>
    </section>
    <div class="bento sal">
      <figure class="fig s-5 sal-fig">
        <img src="/img/rochegrosse-salammbo.jpg" :alt="c.sal.alt" loading="lazy">
        <figcaption class="cap-box">{{ c.sal.cap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--paper tile--outline s-7">
        <span class="kicker">{{ c.sal.kicker }}</span>
        <h3 class="h-block block-title">{{ c.sal.subtitle }}</h3>
        <p v-for="(p, i) in c.sal.paras" :key="i" class="body-lg para">{{ p }}</p>
      </div>
      <div class="tile tile--xl tile--olive s-6">
        <span class="kicker">{{ c.sal.trueK }}</span>
        <h3 class="h-card list-title">{{ c.sal.trueT }}</h3>
        <ul class="tf-list">
          <li v-for="t in c.sal.trueItems" :key="t">{{ t }}</li>
        </ul>
      </div>
      <div class="tile tile--xl tile--purple s-6">
        <span class="kicker">{{ c.sal.falseK }}</span>
        <h3 class="h-card list-title">{{ c.sal.falseT }}</h3>
        <ul class="tf-list">
          <li v-for="t in c.sal.falseItems" :key="t">{{ t }}</li>
        </ul>
      </div>
      <div class="tile tile--xl s-12">
        <span class="kicker">{{ c.sal.afterK }}</span>
        <div class="rows" style="--row-key:130px">
          <div v-for="r in c.sal.after" :key="r.k">
            <span class="key">{{ r.k }}</span>
            <span class="val">{{ r.v }}</span>
          </div>
        </div>
      </div>
    </div>

    <PageSources :items="c.pageSources" />

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.more.title }}</h2>
        <NuxtLink :to="localePath('/guerres-puniques')" class="btn btn-outline">{{ c.more.all }} →</NuxtLink>
      </div>
    </section>
    <div class="cols cols-3">
      <NuxtLink v-for="f in c.more.items" :key="f.to" :to="localePath(f.to)" class="tile tile--stack fam" :class="f.tone">
        <div>
          <span class="kicker">{{ f.k }}</span>
          <h3 class="h-card">{{ f.t }}</h3>
          <p class="body">{{ f.d }}</p>
        </div>
        <span class="more">{{ c.more.read }} →</span>
      </NuxtLink>
    </div>
    <div class="cols links">
      <NuxtLink v-for="l in c.more.links" :key="l.to" :to="localePath(l.to)" class="btn btn-outline">{{ l.l }} →</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()
const isAr = computed(() => isRtlLocale(locale.value))

// Positions calculées à partir des coordonnées réelles (côte actuelle)
const places = [
  { id: 'carthage', x: 462, y: 164, side: 'pl-c', dx: 12, dy: -8, anchor: 'start' },
  { id: 'tunis', x: 427, y: 182, side: 'pl-r', dx: -12, dy: 22, anchor: 'end' },
  { id: 'utique', x: 398, y: 103, side: 'pl-x', dx: -12, dy: -6, anchor: 'end' },
  { id: 'hippou', x: 353, y: 39, side: 'pl-x', dx: -12, dy: 22, anchor: 'end' },
  { id: 'sicca', x: 74, y: 366, side: 'pl-r', dx: 12, dy: 5, anchor: 'start' },
  { id: 'leptis', x: 593, y: 519, side: 'pl-n', dx: -14, dy: 26, anchor: 'end' }
]

const C = {
  fr: {
    metaTitle: 'La guerre des Mercenaires (241–237 av. J.-C.) — la guerre « inexpiable »',
    metaDesc: "La guerre des Mercenaires, ou guerre « inexpiable » (Polybe I, 65–88) : soldes impayées, Spendios, Mathos et Autarite, le soulèvement libyen, le Bagradas, le supplice de Giscon, le défilé de la Scie, la perte de la Sardaigne et le roman Salammbô de Flaubert.",
    heroAlt: "Mêlée de fantassins et d'éléphants de guerre, aquarelle de Rochegrosse",
    heroCap: "La bataille du Macar (le Bagradas), aquarelle de Georges Rochegrosse pour une édition de Salammbô, vers 1900 (musée des Beaux-Arts de Rouen).",
    chip: 'Guerres puniques · Afrique',
    dates: '241 – 237 av. J.-C.',
    title: 'La guerre des Mercenaires',
    epithet: "La guerre « inexpiable » — Carthage contre sa propre armée",
    lede: "Au lendemain de sa défaite contre Rome, Carthage ne peut payer les soldats qui ont combattu pour elle en Sicile. Leur colère, bientôt relayée par les paysans libyens écrasés d'impôts, embrase l'Afrique punique pendant plus de trois ans. Polybe y voit la guerre la plus atroce qu'il connaisse.",
    stats: [
      { n: '20 000+', t: 'mercenaires rassemblés à Tunis au début de la révolte', src: 'Polybe, I, 67' },
      { n: '~70 000', t: 'Libyens rejoignent les insurgés à l\'appel de Mathos', src: 'Polybe, I, 73' },
      { n: '40 000+', t: 'rebelles tués au défilé de la Scie, sur environ 50 000', src: 'Polybe, I, 84–85' },
      { n: '40 mois', t: 'de guerre : « trois ans et environ quatre mois »', src: 'Polybe, I, 88' }
    ],
    intro: {
      kicker: 'Une guerre civile africaine',
      title: 'Quand l\'armée se retourne contre la cité',
      paras: [
        "Carthage, cité de marchands peu nombreuse, faisait la guerre avec des soldats venus d'ailleurs : Ibères, Celtes, Ligures, Baléares, Grecs « à demi barbares » et surtout Libyens de son propre territoire. En 241, la paix de Lutatius met fin à la première guerre punique ; il faut rapatrier ces hommes de Sicile et leur verser des années de solde.",
        "Or le trésor est vide : la guerre a ruiné la cité, qui doit en plus 3 200 talents à Rome. Le marchandage tourne à la mutinerie, la mutinerie à la guerre, et la guerre prend la forme d'un soulèvement de l'Afrique entière contre sa capitale.",
        "Polybe la nomme la guerre « sans trêve » (ἄσπονδος), traduite en français par « inexpiable » : aucune convention, aucune pitié n'y fut respectée. Elle porte au premier plan Hamilcar Barca et sa famille, et elle coûte à Carthage la Sardaigne."
      ]
    },
    sources: {
      kicker: 'Les sources',
      title: 'Un récit presque unique',
      items: [
        { a: 'Polybe', d: 'Histoires, I, 65–88 : le seul récit continu et détaillé, écrit un siècle plus tard à partir de sources perdues.' },
        { a: 'Diodore de Sicile', d: 'Bibliothèque historique, livre XXV : fragments, insistant sur les atrocités.' },
        { a: 'Appien', d: 'Libyca, 5 : bref rappel, surtout pour l\'affaire de Sardaigne.' },
        { a: 'Cornelius Nepos', d: 'Vie d\'Hamilcar, 2 : la révolte et la victoire d\'Hamilcar, en quelques lignes.' }
      ],
      note: "Tous ces auteurs écrivent du côté des vainqueurs, romains ou grecs. On ne connaît la révolte qu'à travers eux — et à travers les monnaies frappées par les insurgés eux-mêmes."
    },
    causes: {
      title: 'Les causes',
      aside: 'Des soldes impayées, une maladresse politique et une Afrique à bout.',
      items: [
        { tone: '', k: 'Lilybée, 241', t: 'La prudence de Giscon', d: "Commandant de Lilybée, Giscon renvoie les mercenaires de Sicile par petits groupes, pour qu'on puisse payer et licencier chacun séparément. Mais Carthage, à court d'argent, les laisse s'accumuler dans la ville, puis les envoie tous ensemble à Sicca avec leurs bagages." },
        { tone: 'tile--terra', k: 'Sicca, 241', t: 'La maladresse d\'Hannon', d: "Hannon — le plus souvent identifié à Hannon « le Grand », chef du parti des grands propriétaires — vient à Sicca demander aux soldats d'accepter une réduction de leur solde. Aucun d'eux ne parle la même langue ; la rumeur fait le reste. Plus de 20 000 hommes marchent sur Tunis, aux portes de Carthage." },
        { tone: 'tile--ink', k: 'Les campagnes', t: 'La colère des Libyens', d: "Pendant la guerre contre Rome, Carthage a prélevé la moitié des récoltes des paysans libyens et doublé l'impôt des villes. Quand Mathos les appelle à la révolte, ils se lèvent en masse ; les femmes, dit Polybe, donnent leurs bijoux pour financer la guerre." }
      ]
    },
    people: {
      title: 'Les protagonistes',
      aside: 'Des chefs rebelles venus de tout le monde méditerranéen face aux généraux rivaux de Carthage.',
      rebels: 'Chez les insurgés',
      carthage: 'Du côté de Carthage',
      rebelItems: [
        { k: 'Campanien', n: 'Spendios', d: "Esclave évadé de chez les Romains, il redoute d'être livré à ses maîtres si la paix se fait. Orateur habile, il pousse l'armée à la rupture. Crucifié devant Tunis." },
        { k: 'Libyen', n: 'Mathos', d: "Homme libre, compromis dans les premiers troubles. Il fait de la mutinerie une guerre de libération libyenne et devient le chef le plus durable de la révolte. Capturé en 237." },
        { k: 'Gaulois', n: 'Autarite', d: "Chef des Celtes, parlant le punique, ce qui le rendait écouté de tous. C'est lui qui, avec Spendios, fait voter la mise à mort de Giscon. Capturé à la Scie." },
        { k: 'Libyen', n: 'Zarzas', d: "Chef d'un contingent libyen, il rejoint Spendios et Autarite dans la dernière campagne et fait partie des envoyés retenus par Hamilcar au défilé de la Scie." }
      ],
      carthItems: [
        { k: 'Le négociateur', n: 'Giscon', d: "L'officier qui avait organisé le rapatriement. Envoyé à Tunis avec l'argent, il est saisi par les rebelles avec son escorte, puis mutilé et mis à mort." },
        { k: 'Le premier général', n: 'Hannon', d: "Vainqueur devant Utique grâce à plus de cent éléphants, il laisse ensuite surprendre son camp. Sa rivalité avec Hamilcar paralyse longtemps le commandement." },
        { k: 'Le sauveur', n: 'Hamilcar Barca', d: "Invaincu en Sicile, rappelé avec 10 000 hommes et 70 éléphants. Stratège du Bagradas et de la Scie, il sort de la guerre maître de l'armée." },
        { k: 'Le prince numide', n: 'Naravas', d: "Il passe dans le camp d'Hamilcar avec 2 000 cavaliers ; en échange, Hamilcar lui promet la main de sa fille, dont Polybe ne donne pas le nom." }
      ]
    },
    chrono: {
      kicker: 'Frise',
      title: 'Les étapes de la guerre',
      rows: [
        { k: '241', t: 'La paix et la dette', d: "Paix de Lutatius : Carthage évacue la Sicile et doit 3 200 talents à Rome. Giscon renvoie les mercenaires vers l'Afrique." },
        { k: '241', t: 'De Sicca à Tunis', d: "Hannon demande une réduction des soldes ; plus de 20 000 soldats marchent sur Tunis. Carthage cède sur tout, trop tard." },
        { k: '241/240', t: 'Giscon captif', d: "Spendios et Mathos soulèvent l'armée ; Giscon et ses compagnons sont faits prisonniers. Environ 70 000 Libyens rejoignent la révolte." },
        { k: '240', t: 'Sièges d\'Utique et d\'Hippou Acra', d: "Les insurgés assiègent les deux alliées de Carthage et bloquent la ville depuis Tunis. Hannon délivre Utique puis se fait surprendre." },
        { k: '240', t: 'Le Bagradas', d: "Hamilcar franchit le fleuve à son embouchure, par un gué que le vent découvre, et bat Spendios : 6 000 rebelles tués, 2 000 prisonniers (Polybe, I, 76)." },
        { k: '240', t: 'Naravas', d: "Le Numide rallie Hamilcar ; nouvelle victoire : 10 000 tués, 4 000 prisonniers, à qui Hamilcar offre de s'enrôler ou de partir libres." },
        { k: '~239', t: 'Le supplice de Giscon', d: "Pour empêcher les défections, les chefs rebelles font mutiler et tuer Giscon et environ 700 prisonniers. Hamilcar répond en faisant piétiner les captifs par les éléphants." },
        { k: '~239', t: 'Utique et Hippou Acra font défection', d: "Les deux cités massacrent leur garnison et s'offrent à Rome, qui refuse. Carthage elle-même est assiégée par Mathos et Spendios." },
        { k: '238', t: 'Le défilé de la Scie', d: "Hamilcar enferme l'armée de Spendios dans le « Prion ». Affamés, les rebelles envoient leurs chefs, qu'il retient ; plus de 40 000 hommes sont massacrés." },
        { k: '238/237', t: 'Tunis', d: "Spendios et les envoyés sont crucifiés sous les murs. Mathos surprend le camp du second général, Hannibal, et le fait crucifier à son tour." },
        { k: '237', t: 'Leptis et la fin de Mathos', d: "Hannon et Hamilcar, réconciliés par le Sénat, écrasent Mathos près de Leptis. Promené dans Carthage, il est supplicié par la foule. Utique et Hippou Acra se rendent." },
        { k: '238/237', t: 'La Sardaigne', d: "Rome s'empare de l'île et impose 1 200 talents supplémentaires sous menace de guerre. Hamilcar part bientôt pour l'Hispanie." }
      ],
      note: "Polybe ne donne pas d'années : la chronologie est reconstruite. La plupart des historiens placent la guerre de la fin 241 au début de 237 ; certains préfèrent 240–238, dates reprises ailleurs sur ce site."
    },
    map: {
      title: 'Le théâtre des opérations',
      aside: "Toute la guerre se joue dans l'arrière-pays de Carthage, entre la vallée de la Medjerda et le Sahel.",
      aria: "Carte schématique du nord-est de la Tunisie : Carthage, Tunis, Utique, Hippou Acra, Sicca, Leptis et le fleuve Bagradas",
      river: 'Bagradas (Medjerda)',
      sea: 'Mer Méditerranée',
      names: { carthage: 'Carthage', tunis: 'Tunis', utique: 'Utique', hippou: 'Hippou Acra', sicca: 'Sicca', leptis: 'Leptis' },
      legC: 'Carthage',
      legR: 'Base ou bastion rebelle',
      legX: 'Alliée de Carthage, passée aux rebelles',
      legN: 'Autre lieu',
      legB: 'Bataille',
      rows: [
        { k: 'Sicca', v: "Le Kef. Carthage y cantonne les mercenaires ; la révolte y commence." },
        { k: 'Tunis', v: "Quartier général des insurgés pendant toute la guerre, à vue de Carthage." },
        { k: 'Utique', v: "La plus ancienne cité phénicienne d'Afrique, alors au bord de la mer. Assiégée, puis passée aux rebelles." },
        { k: 'Hippou Acra', v: "Bizerte. Même destin qu'Utique." },
        { k: 'Bagradas', v: "La Medjerda, appelée aussi Macar. Hamilcar la franchit près de son embouchure." },
        { k: 'Leptis', v: "Lieu de la bataille finale, sans doute Leptis Minor (Lamta), sur la côte du Sahel." }
      ],
      note: "Côte actuelle : les alluvions de la Medjerda ont depuis comblé le golfe d'Utique. L'emplacement du défilé de la Scie reste inconnu ; il n'est pas figuré."
    },
    cruel: {
      kicker: 'La guerre « inexpiable »',
      title: 'Une escalade de la terreur',
      intro: "Des deux côtés, la cruauté devint une arme politique : les chefs rebelles voulaient rendre toute réconciliation impossible, Carthage voulait faire un exemple.",
      quote: "« Nous ne connaissons aucune guerre qui l'ait emporté sur celle-ci en cruauté et en mépris des lois. »",
      cite: "D'après Polybe, Histoires, I, 88",
      steps: [
        { t: 'Le supplice de Giscon', d: "Inquiets de la clémence d'Hamilcar, Spendios, Autarite et Mathos font couper les mains de Giscon et de quelque 700 prisonniers, les mutilent, leur brisent les jambes et les jettent vivants dans une fosse. Ils décident que tout prisonnier carthaginois subira le même sort." },
        { t: 'La riposte d\'Hamilcar', d: "Hamilcar renonce à la clémence : les captifs sont désormais livrés aux éléphants. Les rebelles refusent même de rendre les corps aux Carthaginois venus les réclamer." },
        { t: 'Les croix de Tunis', d: "Spendios est crucifié face aux remparts de Tunis. Mathos riposte en capturant le général Hannibal — sans lien avec le fils d'Hamilcar —, qu'il cloue sur la croix de Spendios, et fait égorger trente nobles carthaginois autour de lui." },
        { t: 'La fin de Mathos', d: "Capturé près de Leptis, Mathos est promené dans Carthage lors d'une procession triomphale et torturé à mort par la jeunesse de la ville. On lit parfois qu'il fut crucifié : Polybe parle d'un supplice public, pas d'une croix." }
      ]
    },
    saw: {
      kicker: '238 av. J.-C. · Le « Prion »',
      title: 'Le défilé de la Scie',
      paras: [
        "En 238, Spendios, Autarite et Zarzas tiennent la campagne avec près de 50 000 hommes. Hamilcar évite la bataille rangée : il harcèle l'ennemi, le coupe de ses vivres et finit par l'acculer dans un lieu que sa forme dentelée avait fait nommer le Prion, « la Scie ».",
        "Encerclés, sans ravitaillement ni secours de Tunis, les rebelles mangent leurs prisonniers, puis leurs esclaves. Les chefs se résignent à négocier : Hamilcar exige de choisir dix hommes à sa discrétion, les autres pourront partir avec une tunique. L'accord conclu, il déclare choisir… les dix envoyés présents.",
        "Privée de ses chefs et croyant l'accord rompu, l'armée prend les armes. Hamilcar l'encercle avec ses éléphants et ses troupes : plus de 40 000 hommes périssent. C'est la fin militaire de la révolte, même si Mathos tient encore Tunis."
      ],
      boxK: 'Polybe, I, 84–85',
      boxT: 'Une ruse contestée',
      boxD: "Le piège est-il une trahison ? Polybe présente le choix des dix comme conforme à la lettre de l'accord. Les historiens modernes y voient souvent une interprétation cynique, révélatrice d'une guerre où plus aucune règle ne tenait.",
      chips: ['~50 000 rebelles', '40 000+ morts', 'Spendios', 'Autarite', 'Zarzas']
    },
    rome: {
      kicker: 'Rome, Hiéron et la Sardaigne',
      title: 'Des voisins qui comptent les coups',
      paras: [
        "Au début, Rome se montre correcte : elle interdit à ses marchands de ravitailler les rebelles, laisse Carthage recruter en Italie, libère sans rançon ses prisonniers de guerre et refuse l'offre d'Utique de se donner à elle. Hiéron de Syracuse, lui, envoie des vivres : il ne veut pas d'une Rome sans rival (Polybe, I, 83 ; Appien, Sicelica, 2).",
        "Mais les mercenaires de Sardaigne se sont révoltés eux aussi, ont tué leur commandant Bostar et chassé les Carthaginois, avant d'être à leur tour expulsés par les Sardes. Réfugiés en Italie, ils appellent Rome.",
        "En 238/237, quand Carthage veut reprendre l'île, Rome prétend que ces préparatifs la visent et déclare la guerre. Épuisée, Carthage cède la Sardaigne et paie 1 200 talents de plus. Polybe, pourtant ami de Rome, juge le procédé contraire à toute justice (III, 28)."
      ],
      alt: 'La colline de Byrsa à Carthage',
      cap: 'La colline de Byrsa : Carthage, assiégée par sa propre armée, dépendait de sa mer et de ses alliés.'
    },
    conseq: {
      kicker: 'Conséquences',
      title: 'Une victoire qui prépare la guerre suivante',
      items: [
        { n: '1 200', t: 'La Sardaigne perdue', d: "Talents exigés en plus de l'indemnité de 241, avec l'abandon de la Sardaigne, puis de la Corse. Polybe y voit l'une des causes de la deuxième guerre punique (III, 10)." },
        { n: '237', t: 'Le départ pour l\'Hispanie', d: "Hamilcar gagne Gadès avec son fils Hannibal. Privée de ses îles, Carthage cherche en Hispanie l'argent et les soldats qui lui manquent." },
        { n: 'Barca', t: 'La montée des Barcides', d: "Choisi par l'armée contre Hannon, Hamilcar sort de la guerre avec des troupes fidèles et l'appui du peuple. Le conflit entre les deux hommes structure désormais la vie politique." },
        { n: 'Libye', t: 'L\'Afrique reprise en main', d: "Les villes libyennes rentrent dans l'obéissance. Carthage continue de recruter des mercenaires, mais les armées barcides seront liées à leur général." }
      ]
    },
    sal: {
      title: 'Salammbô, le roman de la guerre',
      aside: "En 1862, Flaubert fait de la guerre des Mercenaires le décor d'un roman qui fixe pour un siècle l'image de Carthage.",
      alt: 'Salammbô en robe bleue et or, aquarelle de Rochegrosse',
      cap: 'Salammbô, aquarelle de Georges Rochegrosse pour l\'édition illustrée de 1900.',
      kicker: 'Gustave Flaubert · 1862',
      subtitle: 'Un roman fidèle à Polybe… à une héroïne près',
      paras: [
        "Après Madame Bovary, Flaubert veut faire revivre Carthage. Il lit Polybe et des dizaines d'érudits, puis visite Tunis et le site de Carthage au printemps 1858. Salammbô paraît en 1862 : l'intrigue suit fidèlement la chronologie de Polybe, du festin des mercenaires au supplice de Mâtho.",
        "Au cœur du récit, il place une héroïne de son invention : Salammbô, fille d'Hamilcar et prêtresse de Tanit, dont Mâtho, chef des rebelles, tombe éperdument amoureux. Flaubert s'appuie sur un détail réel : Polybe rapporte qu'Hamilcar promit sa fille au prince numide Naravas — sans jamais la nommer."
      ],
      trueK: 'Historique',
      trueT: 'Ce que Flaubert emprunte à Polybe',
      trueItems: [
        'Les soldes impayées, Sicca, la marche sur Tunis',
        'Hamilcar, Hannon, Giscon, Spendius, Mâtho, Autharite, Narr\'Havas',
        'La bataille du Macar et le gué découvert par le vent',
        'Le supplice de Giscon et des prisonniers',
        'Le défilé de la Scie, rebaptisé « défilé de la Hache », et la famine',
        'La promesse d\'une fille d\'Hamilcar à Naravas',
        'Le supplice de Mâtho, promené dans Carthage'
      ],
      falseK: 'Inventé',
      falseT: 'Ce que Flaubert imagine',
      falseItems: [
        "Salammbô elle-même, son nom et son amour pour Mâtho",
        "Le vol du zaïmph, le voile sacré de Tanit",
        "Le serpent sacré et les rites de la prêtresse",
        "La lèpre d'Hannon et le banquet dans les jardins d'Hamilcar",
        "Le grand sacrifice d'enfants à Moloch pendant le siège, transposé d'un épisode de 310 raconté par Diodore (XX, 14) — un sujet toujours débattu",
        "La substitution du petit Hannibal par un enfant esclave"
      ],
      afterK: 'Postérité',
      after: [
        { k: '1862–1863', v: "Le critique Sainte-Beuve et l'archéologue Guillaume Froehner contestent l'exactitude du roman ; Flaubert leur répond point par point, sources à l'appui." },
        { k: '1863–1866', v: "Moussorgski compose un opéra Salammbô, qu'il laisse inachevé." },
        { k: '1890', v: "Opéra d'Ernest Reyer, créé à Bruxelles ; suivent affiches, ballets et films qui popularisent une Carthage fastueuse et barbare." },
        { k: 'Aujourd\'hui', v: "Le quartier de Salammbô, à Carthage, où se trouvent les ports puniques et le tophet, doit son nom au roman — et avec lui une part de l'image orientaliste de la cité." }
      ]
    },
    more: {
      title: 'À lire aussi',
      all: 'Les guerres puniques',
      read: 'Lire',
      items: [
        { to: '/hamilcar', tone: 'tile--purple', k: 'Biographie · ~275 – 229/228', t: 'Hamilcar Barca', d: "L'invaincu de Sicile, vainqueur de la Scie et conquérant de l'Hispanie." },
        { to: '/armee', tone: 'tile--ink', k: 'Armée', t: "L'armée carthaginoise", d: 'Libyens, alliés numides et mercenaires : un système efficace, et sa faiblesse.' },
        { to: '/institutions', tone: 'tile--terra', k: 'Politique', t: 'Les institutions', d: "Sénat, suffètes et assemblée ; Hannon le Grand face aux Barcides." }
      ],
      links: [
        { to: '/guerres-puniques', l: 'Les trois guerres puniques' },
        { to: '/histoire-des-vainqueurs', l: "L'histoire des vainqueurs" },
        { to: '/chronologie', l: 'La chronologie' }
      ]
    },
    pageSources: [
      { type: 'ancient', author: 'Polybe', work: 'Histoires', ref: 'I, 65–88 (notamment 67, 73, 76, 83, 84–85, 88) ; III, 10 ; III, 28', note: 'le seul récit continu de la guerre' },
      { type: 'ancient', author: 'Diodore de Sicile', work: 'Bibliothèque historique', ref: 'XXV (fragments) ; XX, 14', note: 'atrocités de la guerre ; sacrifice de 310' },
      { type: 'ancient', author: 'Appien', work: 'Libyca', ref: '5', note: 'l\'affaire de Sardaigne' },
      { type: 'ancient', author: 'Appien', work: 'Sicelica', ref: '2', note: 'l\'aide de Hiéron de Syracuse' },
      { type: 'ancient', author: 'Cornelius Nepos', work: 'Vie d\'Hamilcar', ref: '2' },
      { type: 'modern', author: 'Gustave Flaubert', work: 'Salammbô', ref: '1862', note: 'roman, cité dans la page' }
    ]
  },
  en: {
    metaTitle: 'The Mercenary War (241–237 BC) — the “truceless” war',
    metaDesc: 'The Mercenary War, or “truceless” war (Polybius I, 65–88): unpaid wages, Spendius, Mathos and Autaritus, the Libyan uprising, the Bagradas, the torture of Gisco, the pass of the Saw, the loss of Sardinia and Flaubert’s novel Salammbô.',
    heroAlt: 'A mêlée of foot soldiers and war elephants, watercolour by Rochegrosse',
    heroCap: 'The battle of the Macar (the Bagradas), watercolour by Georges Rochegrosse for an edition of Salammbô, c. 1900 (Musée des Beaux-Arts, Rouen).',
    chip: 'Punic Wars · Africa',
    dates: '241 – 237 BC',
    title: 'The Mercenary War',
    epithet: 'The “truceless” war — Carthage against its own army',
    lede: 'Just defeated by Rome, Carthage cannot pay the soldiers who fought for it in Sicily. Their anger, soon taken up by Libyan peasants crushed by taxes, sets Punic Africa ablaze for more than three years. Polybius saw it as the most atrocious war he knew of.',
    stats: [
      { n: '20,000+', t: 'mercenaries gathered at Tunis at the start of the revolt', src: 'Polybius, I, 67' },
      { n: '~70,000', t: 'Libyans join the insurgents at Mathos’ call', src: 'Polybius, I, 73' },
      { n: '40,000+', t: 'rebels killed at the pass of the Saw, out of about 50,000', src: 'Polybius, I, 84–85' },
      { n: '40 months', t: 'of war: “three years and about four months”', src: 'Polybius, I, 88' }
    ],
    intro: {
      kicker: 'An African civil war',
      title: 'When the army turns on the city',
      paras: [
        'Carthage, a trading city with few citizens, fought its wars with soldiers from elsewhere: Iberians, Celts, Ligurians, Balearic islanders, “half-barbarian” Greeks and above all Libyans from its own territory. In 241 the peace of Lutatius ended the First Punic War; these men had to be brought back from Sicily and paid years of arrears.',
        'But the treasury was empty: the war had ruined the city, which also owed Rome 3,200 talents. Haggling turned into mutiny, mutiny into war, and the war into an uprising of the whole of Africa against its capital.',
        'Polybius calls it the war “without truce” (ἄσπονδος), rendered in French as “inexpiable”: no convention, no mercy was respected. It brought Hamilcar Barca and his family to the fore, and it cost Carthage Sardinia.'
      ]
    },
    sources: {
      kicker: 'The sources',
      title: 'An almost unique account',
      items: [
        { a: 'Polybius', d: 'Histories, I, 65–88: the only continuous, detailed account, written a century later from lost sources.' },
        { a: 'Diodorus Siculus', d: 'Library of History, book XXV: fragments, dwelling on the atrocities.' },
        { a: 'Appian', d: 'Libyca, 5: a brief mention, mainly of the Sardinian affair.' },
        { a: 'Cornelius Nepos', d: 'Life of Hamilcar, 2: the revolt and Hamilcar’s victory in a few lines.' }
      ],
      note: 'All these authors wrote on the winners’ side, Roman or Greek. We know the revolt only through them — and through the coins struck by the insurgents themselves.'
    },
    causes: {
      title: 'The causes',
      aside: 'Unpaid wages, a political blunder and an Africa at the end of its tether.',
      items: [
        { tone: '', k: 'Lilybaeum, 241', t: 'Gisco’s caution', d: 'Commander at Lilybaeum, Gisco sent the mercenaries back from Sicily in small groups so that each could be paid and discharged separately. But Carthage, short of money, let them pile up in the city, then sent them all together to Sicca with their baggage.' },
        { tone: 'tile--terra', k: 'Sicca, 241', t: 'Hanno’s blunder', d: 'Hanno — usually identified with Hanno “the Great”, leader of the landowners’ party — came to Sicca to ask the soldiers to accept reduced pay. None of them spoke the same language; rumour did the rest. More than 20,000 men marched on Tunis, at the gates of Carthage.' },
        { tone: 'tile--ink', k: 'The countryside', t: 'The anger of the Libyans', d: 'During the war with Rome, Carthage had taken half of the Libyan peasants’ harvests and doubled the towns’ taxes. When Mathos called them to revolt they rose en masse; the women, says Polybius, gave their jewellery to fund the war.' }
      ]
    },
    people: {
      title: 'The protagonists',
      aside: 'Rebel leaders from all over the Mediterranean world against Carthage’s rival generals.',
      rebels: 'On the rebel side',
      carthage: 'On the Carthaginian side',
      rebelItems: [
        { k: 'Campanian', n: 'Spendius', d: 'A runaway slave of the Romans, he feared being handed back to his masters if peace was made. A skilled speaker, he drove the army to the break. Crucified before Tunis.' },
        { k: 'Libyan', n: 'Mathos', d: 'A free man compromised in the first disturbances. He turned the mutiny into a Libyan war of liberation and became the revolt’s most enduring leader. Captured in 237.' },
        { k: 'Gaul', n: 'Autaritus', d: 'Leader of the Celts; he spoke Punic, which made him heard by all. With Spendius he had the killing of Gisco voted. Captured at the Saw.' },
        { k: 'Libyan', n: 'Zarzas', d: 'Leader of a Libyan contingent, he joined Spendius and Autaritus in the last campaign and was among the envoys detained by Hamilcar at the Saw.' }
      ],
      carthItems: [
        { k: 'The negotiator', n: 'Gisco', d: 'The officer who had organised the repatriation. Sent to Tunis with the money, he was seized by the rebels with his escort, then mutilated and put to death.' },
        { k: 'The first general', n: 'Hanno', d: 'Victorious before Utica thanks to more than a hundred elephants, he then let his camp be surprised. His rivalry with Hamilcar long paralysed the command.' },
        { k: 'The saviour', n: 'Hamilcar Barca', d: 'Undefeated in Sicily, recalled with 10,000 men and 70 elephants. Strategist of the Bagradas and the Saw, he came out of the war master of the army.' },
        { k: 'The Numidian prince', n: 'Naravas', d: 'He went over to Hamilcar with 2,000 horsemen; in return Hamilcar promised him his daughter’s hand — Polybius does not give her name.' }
      ]
    },
    chrono: {
      kicker: 'Timeline',
      title: 'The stages of the war',
      rows: [
        { k: '241', t: 'Peace and debt', d: 'Peace of Lutatius: Carthage evacuates Sicily and owes Rome 3,200 talents. Gisco sends the mercenaries back to Africa.' },
        { k: '241', t: 'From Sicca to Tunis', d: 'Hanno asks for reduced pay; more than 20,000 soldiers march on Tunis. Carthage gives in on everything, too late.' },
        { k: '241/240', t: 'Gisco taken', d: 'Spendius and Mathos raise the army; Gisco and his companions are taken prisoner. About 70,000 Libyans join the revolt.' },
        { k: '240', t: 'Sieges of Utica and Hippou Acra', d: 'The insurgents besiege Carthage’s two allies and blockade the city from Tunis. Hanno relieves Utica, then is taken by surprise.' },
        { k: '240', t: 'The Bagradas', d: 'Hamilcar crosses the river at its mouth by a ford the wind lays bare and defeats Spendius: 6,000 rebels killed, 2,000 captured (Polybius, I, 76).' },
        { k: '240', t: 'Naravas', d: 'The Numidian joins Hamilcar; another victory: 10,000 killed, 4,000 captured, whom Hamilcar offers to enlist or to let go free.' },
        { k: 'c. 239', t: 'The torture of Gisco', d: 'To stop desertions, the rebel leaders have Gisco and some 700 prisoners mutilated and killed. Hamilcar replies by having captives trampled by elephants.' },
        { k: 'c. 239', t: 'Utica and Hippou Acra defect', d: 'The two cities massacre their garrisons and offer themselves to Rome, which refuses. Carthage itself is besieged by Mathos and Spendius.' },
        { k: '238', t: 'The pass of the Saw', d: 'Hamilcar traps Spendius’ army in the “Prion”. Starving, the rebels send their leaders, whom he detains; more than 40,000 men are massacred.' },
        { k: '238/237', t: 'Tunis', d: 'Spendius and the envoys are crucified below the walls. Mathos surprises the camp of the second general, Hannibal, and has him crucified in turn.' },
        { k: '237', t: 'Leptis and the end of Mathos', d: 'Hanno and Hamilcar, reconciled by the Senate, crush Mathos near Leptis. Paraded through Carthage, he is tortured by the crowd. Utica and Hippou Acra surrender.' },
        { k: '238/237', t: 'Sardinia', d: 'Rome seizes the island and imposes 1,200 extra talents under threat of war. Hamilcar soon leaves for Hispania.' }
      ],
      note: 'Polybius gives no years: the chronology is reconstructed. Most historians date the war from late 241 to early 237; some prefer 240–238, the dates used elsewhere on this site.'
    },
    map: {
      title: 'The theatre of operations',
      aside: 'The whole war was fought in Carthage’s hinterland, between the Medjerda valley and the Sahel.',
      aria: 'Schematic map of north-eastern Tunisia: Carthage, Tunis, Utica, Hippou Acra, Sicca, Leptis and the Bagradas river',
      river: 'Bagradas (Medjerda)',
      sea: 'Mediterranean Sea',
      names: { carthage: 'Carthage', tunis: 'Tunis', utique: 'Utica', hippou: 'Hippou Acra', sicca: 'Sicca', leptis: 'Leptis' },
      legC: 'Carthage',
      legR: 'Rebel base or stronghold',
      legX: 'Ally of Carthage that went over to the rebels',
      legN: 'Other place',
      legB: 'Battle',
      rows: [
        { k: 'Sicca', v: 'El Kef. Carthage quartered the mercenaries there; the revolt began there.' },
        { k: 'Tunis', v: 'Rebel headquarters throughout the war, within sight of Carthage.' },
        { k: 'Utica', v: 'The oldest Phoenician city in Africa, then on the sea. Besieged, then went over to the rebels.' },
        { k: 'Hippou Acra', v: 'Bizerte. Same fate as Utica.' },
        { k: 'Bagradas', v: 'The Medjerda, also called the Macar. Hamilcar crossed it near its mouth.' },
        { k: 'Leptis', v: 'Site of the final battle, probably Leptis Minor (Lamta), on the Sahel coast.' }
      ],
      note: 'Modern coastline: the Medjerda’s silt has since filled the gulf of Utica. The location of the pass of the Saw is unknown; it is not shown.'
    },
    cruel: {
      kicker: 'The “truceless” war',
      title: 'An escalation of terror',
      intro: 'On both sides cruelty became a political weapon: the rebel leaders wanted to make any reconciliation impossible, Carthage wanted to make an example.',
      quote: '“We know of no war that surpassed this one in cruelty and lawlessness.”',
      cite: 'After Polybius, Histories, I, 88',
      steps: [
        { t: 'The torture of Gisco', d: 'Worried by Hamilcar’s clemency, Spendius, Autaritus and Mathos had the hands of Gisco and some 700 prisoners cut off, mutilated them, broke their legs and threw them alive into a pit. They decreed that every Carthaginian prisoner would suffer the same fate.' },
        { t: 'Hamilcar’s answer', d: 'Hamilcar gave up clemency: captives were now thrown to the elephants. The rebels even refused to return the bodies to the Carthaginians who came to claim them.' },
        { t: 'The crosses of Tunis', d: 'Spendius was crucified facing the walls of Tunis. Mathos struck back by capturing the general Hannibal — no relation of Hamilcar’s son — nailing him to Spendius’ cross, and having thirty Carthaginian nobles slaughtered around him.' },
        { t: 'The end of Mathos', d: 'Captured near Leptis, Mathos was paraded through Carthage in a triumphal procession and tortured to death by the city’s youth. It is sometimes said he was crucified: Polybius speaks of public torture, not a cross.' }
      ]
    },
    saw: {
      kicker: '238 BC · The “Prion”',
      title: 'The pass of the Saw',
      paras: [
        'In 238, Spendius, Autaritus and Zarzas held the field with nearly 50,000 men. Hamilcar avoided pitched battle: he harassed the enemy, cut off its supplies and finally drove it into a place whose jagged shape had earned it the name Prion, “the Saw”.',
        'Surrounded, with no food and no help from Tunis, the rebels ate their prisoners, then their slaves. The leaders resigned themselves to negotiate: Hamilcar demanded to choose ten men at his discretion, the rest could leave with one tunic each. Once the deal was struck, he declared that he chose… the ten envoys present.',
        'Deprived of its leaders and believing the agreement broken, the army took up arms. Hamilcar surrounded it with his elephants and troops: more than 40,000 men perished. It was the military end of the revolt, even though Mathos still held Tunis.'
      ],
      boxK: 'Polybius, I, 84–85',
      boxT: 'A disputed trick',
      boxD: 'Was the trap a betrayal? Polybius presents the choice of the ten as true to the letter of the agreement. Modern historians often see a cynical reading of it, typical of a war in which no rule held any more.',
      chips: ['~50,000 rebels', '40,000+ dead', 'Spendius', 'Autaritus', 'Zarzas']
    },
    rome: {
      kicker: 'Rome, Hiero and Sardinia',
      title: 'Neighbours keeping score',
      paras: [
        'At first Rome behaved correctly: it forbade its merchants to supply the rebels, let Carthage recruit in Italy, freed its prisoners of war without ransom and refused Utica’s offer to give itself up to Rome. Hiero of Syracuse sent food: he did not want a Rome without a rival (Polybius, I, 83; Appian, Sicelica, 2).',
        'But the mercenaries in Sardinia had also revolted, killed their commander Bostar and driven out the Carthaginians, before being expelled in turn by the Sardinians. Taking refuge in Italy, they called on Rome.',
        'In 238/237, when Carthage prepared to retake the island, Rome claimed the preparations were aimed at itself and declared war. Exhausted, Carthage gave up Sardinia and paid 1,200 more talents. Polybius, though a friend of Rome, judged the move contrary to all justice (III, 28).'
      ],
      alt: 'Byrsa hill in Carthage',
      cap: 'Byrsa hill: besieged by its own army, Carthage depended on the sea and on its allies.'
    },
    conseq: {
      kicker: 'Consequences',
      title: 'A victory that paved the way for the next war',
      items: [
        { n: '1,200', t: 'Sardinia lost', d: 'Talents demanded on top of the 241 indemnity, together with Sardinia, then Corsica. Polybius counts it among the causes of the Second Punic War (III, 10).' },
        { n: '237', t: 'Departure for Hispania', d: 'Hamilcar sails for Gades with his son Hannibal. Stripped of its islands, Carthage looks to Hispania for the silver and soldiers it lacks.' },
        { n: 'Barca', t: 'The rise of the Barcids', d: 'Chosen by the army over Hanno, Hamilcar came out of the war with loyal troops and popular support. The conflict between the two men now shaped political life.' },
        { n: 'Libya', t: 'Africa brought back to heel', d: 'The Libyan towns returned to obedience. Carthage kept hiring mercenaries, but the Barcid armies would be bound to their general.' }
      ]
    },
    sal: {
      title: 'Salammbô, the novel of the war',
      aside: 'In 1862 Flaubert made the Mercenary War the setting of a novel that fixed the image of Carthage for a century.',
      alt: 'Salammbô in a blue and gold gown, watercolour by Rochegrosse',
      cap: 'Salammbô, watercolour by Georges Rochegrosse for the illustrated edition of 1900.',
      kicker: 'Gustave Flaubert · 1862',
      subtitle: 'A novel faithful to Polybius… but for its heroine',
      paras: [
        'After Madame Bovary, Flaubert wanted to bring Carthage back to life. He read Polybius and dozens of scholars, then visited Tunis and the site of Carthage in the spring of 1858. Salammbô appeared in 1862: the plot closely follows Polybius’ chronology, from the mercenaries’ feast to the torture of Mâtho.',
        'At the heart of the story he placed a heroine of his own invention: Salammbô, Hamilcar’s daughter and priestess of Tanit, with whom Mâtho, the rebel leader, falls desperately in love. Flaubert built on a real detail: Polybius reports that Hamilcar promised his daughter to the Numidian prince Naravas — without ever naming her.'
      ],
      trueK: 'Historical',
      trueT: 'What Flaubert took from Polybius',
      trueItems: [
        'The unpaid wages, Sicca, the march on Tunis',
        'Hamilcar, Hanno, Gisco, Spendius, Mâtho, Autharitus, Narr’Havas',
        'The battle of the Macar and the ford uncovered by the wind',
        'The torture of Gisco and the prisoners',
        'The pass of the Saw, renamed the “Defile of the Axe”, and the famine',
        'The promise of a daughter of Hamilcar to Naravas',
        'The torture of Mâtho paraded through Carthage'
      ],
      falseK: 'Invented',
      falseT: 'What Flaubert imagined',
      falseItems: [
        'Salammbô herself, her name and her love for Mâtho',
        'The theft of the zaïmph, the sacred veil of Tanit',
        'The sacred serpent and the priestess’s rites',
        'Hanno’s leprosy and the banquet in Hamilcar’s gardens',
        'The great sacrifice of children to Moloch during the siege, transposed from an episode of 310 told by Diodorus (XX, 14) — a subject still debated',
        'The substitution of a slave child for the young Hannibal'
      ],
      afterK: 'Afterlife',
      after: [
        { k: '1862–1863', v: 'The critic Sainte-Beuve and the archaeologist Wilhelm Froehner questioned the novel’s accuracy; Flaubert answered them point by point, sources in hand.' },
        { k: '1863–1866', v: 'Mussorgsky composed an opera Salammbô, which he left unfinished.' },
        { k: '1890', v: 'Ernest Reyer’s opera, premiered in Brussels; posters, ballets and films followed, popularising a sumptuous, barbaric Carthage.' },
        { k: 'Today', v: 'The Salammbô district of Carthage, home to the Punic ports and the tophet, owes its name to the novel — and with it part of the city’s orientalist image.' }
      ]
    },
    more: {
      title: 'Read also',
      all: 'The Punic Wars',
      read: 'Read',
      items: [
        { to: '/hamilcar', tone: 'tile--purple', k: 'Biography · c. 275 – 229/228', t: 'Hamilcar Barca', d: 'Undefeated in Sicily, victor at the Saw and conqueror of Hispania.' },
        { to: '/armee', tone: 'tile--ink', k: 'Army', t: 'The Carthaginian army', d: 'Libyans, Numidian allies and mercenaries: an effective system, and its weakness.' },
        { to: '/institutions', tone: 'tile--terra', k: 'Politics', t: 'The institutions', d: 'Senate, sufetes and assembly; Hanno the Great against the Barcids.' }
      ],
      links: [
        { to: '/guerres-puniques', l: 'The three Punic Wars' },
        { to: '/histoire-des-vainqueurs', l: 'History of the victors' },
        { to: '/chronologie', l: 'The timeline' }
      ]
    },
    pageSources: [
      { type: 'ancient', author: 'Polybius', work: 'Histories', ref: 'I, 65–88 (esp. 67, 73, 76, 83, 84–85, 88); III, 10; III, 28', note: 'the only continuous account of the war' },
      { type: 'ancient', author: 'Diodorus of Sicily', work: 'Library of History', ref: 'XXV (fragments); XX, 14', note: 'atrocities of the war; the sacrifice of 310' },
      { type: 'ancient', author: 'Appian', work: 'Libyca', ref: '5', note: 'the Sardinian affair' },
      { type: 'ancient', author: 'Appian', work: 'Sicelica', ref: '2', note: 'Hiero of Syracuse\'s aid' },
      { type: 'ancient', author: 'Cornelius Nepos', work: 'Life of Hamilcar', ref: '2' },
      { type: 'modern', author: 'Gustave Flaubert', work: 'Salammbô', ref: '1862', note: 'novel, mentioned on this page' }
    ]
  },
  ar: {
    metaTitle: 'حرب المرتزقة (241–237 ق.م) — الحرب «التي لا هدنة فيها»',
    metaDesc: 'حرب المرتزقة أو الحرب «التي لا هدنة فيها» (بوليبيوس 1، 65–88): الأجور غير المدفوعة، سبنديوس وماتوس وأوتاريتوس، ثورة الليبيين، مجردة، تعذيب جيسكون، ممر المنشار، خسارة سردينيا ورواية «سالامبو» لفلوبير.',
    heroAlt: 'التحام المشاة والفيلة الحربية، لوحة مائية لروشغروس',
    heroCap: 'معركة ماكار (مجردة)، لوحة مائية لجورج روشغروس لطبعة من «سالامبو»، نحو 1900 (متحف الفنون الجميلة في روان).',
    chip: 'الحروب البونيقية · إفريقيا',
    dates: '241 – 237 ق.م',
    title: 'حرب المرتزقة',
    epithet: 'الحرب «التي لا هدنة فيها» — قرطاج في مواجهة جيشها',
    lede: 'غداة هزيمتها أمام روما، عجزت قرطاج عن دفع أجور الجنود الذين قاتلوا من أجلها في صقلية. وسرعان ما انضم إلى غضبهم الفلاحون الليبيون المثقلون بالضرائب، فاشتعلت إفريقيا البونيقية أكثر من ثلاث سنوات. ورأى فيها بوليبيوس أفظع حرب عرفها.',
    stats: [
      { n: '+20٬000', t: 'مرتزق تجمّعوا في تونس في بداية الثورة', src: 'بوليبيوس، 1، 67' },
      { n: 'نحو 70٬000', t: 'ليبي انضموا إلى الثوار تلبيةً لنداء ماتوس', src: 'بوليبيوس، 1، 73' },
      { n: '+40٬000', t: 'ثائر قُتلوا في ممر المنشار من أصل نحو 50٬000', src: 'بوليبيوس، 1، 84–85' },
      { n: '40 شهرًا', t: 'من الحرب: «ثلاث سنوات ونحو أربعة أشهر»', src: 'بوليبيوس، 1، 88' }
    ],
    intro: {
      kicker: 'حرب أهلية إفريقية',
      title: 'حين ينقلب الجيش على المدينة',
      paras: [
        'كانت قرطاج، مدينة التجار القليلة السكان، تخوض حروبها بجنود من خارجها: إيبيريون وكلت وليغوريون وأهل البليار ويونانيون «أنصاف برابرة»، وفوق ذلك كله ليبيون من أراضيها. وفي 241 أنهى صلح لوتاتيوس الحرب البونيقية الأولى، فكان لا بد من إعادة هؤلاء الرجال من صقلية ودفع أجور سنوات متأخرة لهم.',
        'لكن الخزينة كانت فارغة: فقد أنهكت الحرب المدينة، وكانت فوق ذلك مدينة لروما بـ3200 وزنة. تحوّلت المساومة إلى تمرد، والتمرد إلى حرب، والحرب إلى انتفاضة إفريقيا كلها على عاصمتها.',
        'يسمّيها بوليبيوس الحرب «التي لا هدنة فيها» (أسبوندوس)، وتُترجم بالفرنسية «التي لا تُكفَّر»: لم يُحترم فيها عهد ولا رحمة. وقد دفعت حملقار برقا وأسرته إلى الواجهة، وكلّفت قرطاج جزيرة سردينيا.'
      ]
    },
    sources: {
      kicker: 'المصادر',
      title: 'رواية تكاد تكون فريدة',
      items: [
        { a: 'بوليبيوس', d: 'التواريخ، 1، 65–88: الرواية الوحيدة المتصلة والمفصّلة، كُتبت بعد قرن اعتمادًا على مصادر مفقودة.' },
        { a: 'ديودوروس الصقلي', d: 'المكتبة التاريخية، الكتاب 25: شذرات تُلحّ على الفظائع.' },
        { a: 'أبيانوس', d: 'الليبيات، 5: إشارة موجزة، خاصة إلى قضية سردينيا.' },
        { a: 'كورنيليوس نيبوس', d: 'سيرة حملقار، 2: الثورة وانتصار حملقار في بضعة أسطر.' }
      ],
      note: 'كتب هؤلاء جميعًا من جهة المنتصرين، رومانًا كانوا أو يونانيين. ولا نعرف الثورة إلا من خلالهم — ومن خلال النقود التي سكّها الثوار أنفسهم.'
    },
    causes: {
      title: 'الأسباب',
      aside: 'أجور غير مدفوعة، وخطأ سياسي، وإفريقيا بلغت حدّ الاحتمال.',
      items: [
        { tone: '', k: 'ليليبايوم، 241', t: 'حذر جيسكون', d: 'أعاد جيسكون، قائد ليليبايوم، المرتزقة من صقلية على دفعات صغيرة ليُدفع لكل دفعة أجرها وتُسرَّح على حدة. لكن قرطاج، لقلة المال، تركتهم يتكدّسون في المدينة ثم أرسلتهم جميعًا مع أمتعتهم إلى سيكا.' },
        { tone: 'tile--terra', k: 'سيكا، 241', t: 'خطأ حنون', d: 'جاء حنون — ويُطابَق عادةً مع حنون «الكبير» زعيم حزب كبار الملّاك — إلى سيكا يطلب من الجنود قبول تخفيض أجورهم. لم يكن الجنود يتكلمون لغة واحدة، فتكفّلت الشائعات بالباقي. وزحف أكثر من 20٬000 رجل على تونس، على أبواب قرطاج.' },
        { tone: 'tile--ink', k: 'الأرياف', t: 'غضب الليبيين', d: 'أثناء الحرب مع روما، أخذت قرطاج نصف محاصيل الفلاحين الليبيين وضاعفت ضرائب المدن. فلما دعاهم ماتوس إلى الثورة هبّوا جماعات؛ ويروي بوليبيوس أن النساء قدّمن حليّهن لتمويل الحرب.' }
      ]
    },
    people: {
      title: 'الشخصيات الرئيسية',
      aside: 'قادة ثوار قدموا من كل أنحاء المتوسط في مواجهة قادة قرطاج المتنافسين.',
      rebels: 'في صفّ الثوار',
      carthage: 'في صفّ قرطاج',
      rebelItems: [
        { k: 'كمباني', n: 'سبنديوس', d: 'عبد فارّ من الرومان، خشي أن يُسلَّم إلى أسياده إن عُقد الصلح. كان خطيبًا بارعًا فدفع الجيش إلى القطيعة. صُلب أمام تونس.' },
        { k: 'ليبي', n: 'ماتوس', d: 'رجل حرّ تورّط في الاضطرابات الأولى. جعل من التمرد حرب تحرير ليبية وصار أطول قادة الثورة بقاءً. أُسر سنة 237.' },
        { k: 'غالي', n: 'أوتاريتوس', d: 'زعيم الكلت، وكان يتكلم البونيقية فيسمعه الجميع. وهو الذي استصدر مع سبنديوس قرار قتل جيسكون. أُسر عند المنشار.' },
        { k: 'ليبي', n: 'زارزاس', d: 'قائد فرقة ليبية، انضم إلى سبنديوس وأوتاريتوس في الحملة الأخيرة، وكان من المبعوثين الذين احتجزهم حملقار عند ممر المنشار.' }
      ],
      carthItems: [
        { k: 'المفاوض', n: 'جيسكون', d: 'الضابط الذي نظّم إعادة الجنود. أُرسل إلى تونس بالمال فقبض عليه الثوار مع مرافقيه، ثم شوّهوه وقتلوه.' },
        { k: 'القائد الأول', n: 'حنون', d: 'انتصر أمام أوتيكا بفضل أكثر من مئة فيل، ثم ترك معسكره يُباغَت. وقد شلّ تنافسه مع حملقار القيادة زمنًا طويلًا.' },
        { k: 'المنقذ', n: 'حملقار برقا', d: 'لم يُهزم في صقلية، واستُدعي بعشرة آلاف رجل وسبعين فيلًا. صاحب خطة مجردة والمنشار، وخرج من الحرب سيّدًا على الجيش.' },
        { k: 'الأمير النوميدي', n: 'نارافاس', d: 'انضم إلى حملقار بألفي فارس، فوعده حملقار بتزويجه ابنته، التي لا يذكر بوليبيوس اسمها.' }
      ]
    },
    chrono: {
      kicker: 'خط زمني',
      title: 'مراحل الحرب',
      rows: [
        { k: '241', t: 'الصلح والدَّين', d: 'صلح لوتاتيوس: تجلو قرطاج عن صقلية وتدين لروما بـ3200 وزنة. ويعيد جيسكون المرتزقة إلى إفريقيا.' },
        { k: '241', t: 'من سيكا إلى تونس', d: 'يطلب حنون تخفيض الأجور، فيزحف أكثر من 20٬000 جندي على تونس. وتتنازل قرطاج عن كل شيء، بعد فوات الأوان.' },
        { k: '241/240', t: 'أسر جيسكون', d: 'يثير سبنديوس وماتوس الجيش، ويؤسر جيسكون ورفاقه. وينضم نحو 70٬000 ليبي إلى الثورة.' },
        { k: '240', t: 'حصار أوتيكا وهيبو أكرا', d: 'يحاصر الثوار حليفتي قرطاج ويطوّقون المدينة انطلاقًا من تونس. يفك حنون الحصار عن أوتيكا ثم يُباغَت.' },
        { k: '240', t: 'مجردة', d: 'يعبر حملقار النهر عند مصبه عبر مخاضة كشفتها الريح، ويهزم سبنديوس: 6٬000 قتيل و2٬000 أسير من الثوار (بوليبيوس، 1، 76).' },
        { k: '240', t: 'نارافاس', d: 'ينضم النوميدي إلى حملقار؛ ونصر جديد: 10٬000 قتيل و4٬000 أسير، يخيّرهم حملقار بين الانضمام إليه والرحيل أحرارًا.' },
        { k: 'نحو 239', t: 'تعذيب جيسكون', d: 'لمنع الانشقاقات، يأمر قادة الثوار بتشويه جيسكون ونحو 700 أسير وقتلهم. ويردّ حملقار بإلقاء الأسرى تحت أقدام الفيلة.' },
        { k: 'نحو 239', t: 'انشقاق أوتيكا وهيبو أكرا', d: 'تذبح المدينتان حاميتيهما وتعرضان نفسيهما على روما فترفض. وتُحاصَر قرطاج نفسها على يد ماتوس وسبنديوس.' },
        { k: '238', t: 'ممر المنشار', d: 'يحاصر حملقار جيش سبنديوس في «بريون». يرسل الثوار الجائعون قادتهم فيحتجزهم، ويُذبح أكثر من 40٬000 رجل.' },
        { k: '238/237', t: 'تونس', d: 'يُصلب سبنديوس والمبعوثون تحت الأسوار. ويباغت ماتوس معسكر القائد الثاني، حنبعل، ويصلبه بدوره.' },
        { k: '237', t: 'لبدة ونهاية ماتوس', d: 'يسحق حنون وحملقار، بعد أن صالح بينهما مجلس الشيوخ، ماتوسَ قرب لبدة. ويُطاف به في قرطاج وتعذّبه الجموع حتى الموت. وتستسلم أوتيكا وهيبو أكرا.' },
        { k: '238/237', t: 'سردينيا', d: 'تستولي روما على الجزيرة وتفرض 1200 وزنة إضافية تحت التهديد بالحرب. وبعد قليل يرحل حملقار إلى هسبانيا.' }
      ],
      note: 'لا يذكر بوليبيوس السنوات، فالتسلسل الزمني مُعاد بناؤه. يؤرخ معظم المؤرخين الحرب من أواخر 241 إلى مطلع 237، ويفضّل بعضهم 240–238، وهما التاريخان المعتمدان في صفحات أخرى من هذا الموقع.'
    },
    map: {
      title: 'مسرح العمليات',
      aside: 'دارت الحرب كلها في الظهير القرطاجي، بين وادي مجردة والساحل.',
      aria: 'خريطة تخطيطية لشمال شرق تونس: قرطاج وتونس وأوتيكا وهيبو أكرا وسيكا ولبدة ونهر مجردة',
      river: 'باغراداس (مجردة)',
      sea: 'البحر الأبيض المتوسط',
      names: { carthage: 'قرطاج', tunis: 'تونس', utique: 'أوتيكا', hippou: 'هيبو أكرا', sicca: 'سيكا', leptis: 'لبدة' },
      legC: 'قرطاج',
      legR: 'قاعدة أو معقل للثوار',
      legX: 'حليفة لقرطاج انضمت إلى الثوار',
      legN: 'موقع آخر',
      legB: 'معركة',
      rows: [
        { k: 'سيكا', v: 'الكاف. أنزلت فيها قرطاج المرتزقة، ومنها بدأت الثورة.' },
        { k: 'تونس', v: 'مقرّ قيادة الثوار طوال الحرب، على مرأى من قرطاج.' },
        { k: 'أوتيكا', v: 'أقدم مدينة فينيقية في إفريقيا، وكانت آنذاك على البحر. حوصرت ثم انضمت إلى الثوار.' },
        { k: 'هيبو أكرا', v: 'بنزرت. لقيت مصير أوتيكا نفسه.' },
        { k: 'مجردة', v: 'نهر باغراداس، ويُسمّى أيضًا ماكار. عبره حملقار قرب مصبه.' },
        { k: 'لبدة', v: 'موقع المعركة الأخيرة، والأرجح أنها لبدة الصغرى (لمطة) على ساحل الساحل.' }
      ],
      note: 'الساحل الحالي: ردمت طمي مجردة منذ ذلك الحين خليج أوتيكا. أما موقع ممر المنشار فلا يزال مجهولًا، ولذلك لا يظهر على الخريطة.'
    },
    cruel: {
      kicker: 'الحرب «التي لا هدنة فيها»',
      title: 'تصاعد الرعب',
      intro: 'صارت القسوة لدى الطرفين سلاحًا سياسيًا: أراد قادة الثوار أن يجعلوا كل مصالحة مستحيلة، وأرادت قرطاج أن تجعل منهم عبرة.',
      quote: '«لا نعرف حربًا فاقت هذه الحرب قسوةً وانتهاكًا للأعراف.»',
      cite: 'عن بوليبيوس، التواريخ، 1، 88',
      steps: [
        { t: 'تعذيب جيسكون', d: 'قلق سبنديوس وأوتاريتوس وماتوس من رأفة حملقار، فأمروا بقطع أيدي جيسكون ونحو 700 أسير، وشوّهوهم وكسروا سيقانهم وألقوهم أحياء في حفرة. وقرروا أن يلقى كل أسير قرطاجي المصير نفسه.' },
        { t: 'ردّ حملقار', d: 'تخلى حملقار عن الرأفة، فصار الأسرى يُلقَون إلى الفيلة. ورفض الثوار حتى تسليم الجثث للقرطاجيين الذين جاؤوا يطلبونها.' },
        { t: 'صلبان تونس', d: 'صُلب سبنديوس قبالة أسوار تونس. فردّ ماتوس بأسر القائد حنبعل — ولا صلة له بابن حملقار — وسمّره على صليب سبنديوس، وأمر بذبح ثلاثين من أعيان قرطاج حوله.' },
        { t: 'نهاية ماتوس', d: 'أُسر ماتوس قرب لبدة، فطيف به في قرطاج في موكب نصر وعذّبه شبان المدينة حتى الموت. ويُقال أحيانًا إنه صُلب، لكن بوليبيوس يتحدث عن تعذيب علني لا عن صليب.' }
      ]
    },
    saw: {
      kicker: '238 ق.م · «بريون»',
      title: 'ممر المنشار',
      paras: [
        'في 238 كان سبنديوس وأوتاريتوس وزارزاس يجوبون البلاد بنحو 50٬000 رجل. تجنّب حملقار المعركة الفاصلة: أنهك العدو وقطع عنه المؤن، حتى حشره في موضع سُمّي «بريون» أي «المنشار» لشكله المسنّن.',
        'حوصر الثوار بلا مؤونة ولا نجدة من تونس، فأكلوا أسراهم ثم عبيدهم. واضطر القادة إلى التفاوض: اشترط حملقار أن يختار عشرة رجال كما يشاء، ويرحل الباقون بقميص واحد لكل منهم. فلما أُبرم الاتفاق أعلن أنه يختار… المبعوثين العشرة الحاضرين.',
        'حُرم الجيش من قادته، فظنّ أن الاتفاق نُقض وحمل السلاح. فطوّقه حملقار بفيلته وجنوده، وهلك أكثر من 40٬000 رجل. كانت تلك النهاية العسكرية للثورة، وإن ظلّ ماتوس ممسكًا بتونس.'
      ],
      boxK: 'بوليبيوس، 1، 84–85',
      boxT: 'حيلة موضع جدل',
      boxD: 'هل كان الفخ خيانة؟ يقدّم بوليبيوس اختيار العشرة على أنه مطابق لنص الاتفاق. ويرى فيه كثير من المؤرخين المحدثين تأويلًا ماكرًا يكشف حربًا لم تعد فيها أي قاعدة قائمة.',
      chips: ['نحو 50٬000 ثائر', '+40٬000 قتيل', 'سبنديوس', 'أوتاريتوس', 'زارزاس']
    },
    rome: {
      kicker: 'روما وهيرون وسردينيا',
      title: 'جيران يحصون الضربات',
      paras: [
        'في البداية تصرّفت روما بلياقة: منعت تجارها من تموين الثوار، وسمحت لقرطاج بالتجنيد في إيطاليا، وأطلقت أسرى الحرب القرطاجيين بلا فدية، ورفضت عرض أوتيكا بأن تسلّم نفسها لها. أما هيرون، ملك سيراكوزة، فأرسل المؤن: لم يكن يريد روما بلا منافس (بوليبيوس، 1، 83؛ أبيانوس، الصقليات، 2).',
        'لكن مرتزقة سردينيا ثاروا بدورهم، وقتلوا قائدهم بوستار وطردوا القرطاجيين، قبل أن يطردهم السردينيون بدورهم. فلجؤوا إلى إيطاليا واستنجدوا بروما.',
        'وفي 238/237، حين استعدت قرطاج لاستعادة الجزيرة، زعمت روما أن هذه الاستعدادات موجّهة ضدها وأعلنت الحرب. فتنازلت قرطاج المنهكة عن سردينيا ودفعت 1200 وزنة إضافية. ويرى بوليبيوس، وهو صديق لروما، أن ذلك كان منافيًا لكل عدل (3، 28).'
      ],
      alt: 'تلة بيرصا في قرطاج',
      cap: 'تلة بيرصا: كانت قرطاج، المحاصَرة من جيشها، تعتمد على البحر وعلى حلفائها.'
    },
    conseq: {
      kicker: 'النتائج',
      title: 'انتصار يمهّد للحرب التالية',
      items: [
        { n: '1200', t: 'خسارة سردينيا', d: 'وزنة طُلبت فوق غرامة 241، مع التخلي عن سردينيا ثم كورسيكا. ويعدّ بوليبيوس ذلك من أسباب الحرب البونيقية الثانية (3، 10).' },
        { n: '237', t: 'الرحيل إلى هسبانيا', d: 'يبحر حملقار إلى قادش مع ابنه حنبعل. وبعد أن فقدت قرطاج جزرها، راحت تبحث في هسبانيا عن الفضة والجنود.' },
        { n: 'برقا', t: 'صعود آل برقا', d: 'خرج حملقار، الذي اختاره الجيش بدل حنون، من الحرب بجنود أوفياء وتأييد شعبي. وصار الصراع بين الرجلين محور الحياة السياسية.' },
        { n: 'ليبيا', t: 'استعادة السيطرة على إفريقيا', d: 'عادت المدن الليبية إلى الطاعة. وواصلت قرطاج تجنيد المرتزقة، لكن الجيوش البرقية ستكون مرتبطة بقائدها.' }
      ]
    },
    sal: {
      title: 'سالامبو، رواية الحرب',
      aside: 'في 1862 جعل فلوبير حرب المرتزقة إطارًا لرواية رسمت صورة قرطاج قرنًا كاملًا.',
      alt: 'سالامبو في ثوب أزرق وذهبي، لوحة مائية لروشغروس',
      cap: 'سالامبو، لوحة مائية لجورج روشغروس للطبعة المصوّرة سنة 1900.',
      kicker: 'غوستاف فلوبير · 1862',
      subtitle: 'رواية وفية لبوليبيوس… باستثناء بطلتها',
      paras: [
        'بعد «مدام بوفاري»، أراد فلوبير أن يعيد الحياة إلى قرطاج. فقرأ بوليبيوس وعشرات العلماء، ثم زار تونس وموقع قرطاج في ربيع 1858. وصدرت «سالامبو» سنة 1862، وحبكتها تتبع تسلسل بوليبيوس بأمانة، من وليمة المرتزقة إلى تعذيب ماتو.',
        'وفي قلب الحكاية وضع بطلة من ابتكاره: سالامبو، ابنة حملقار وكاهنة تانيت، التي يهيم بها ماتو، قائد الثوار. واستند فلوبير إلى تفصيل حقيقي: يروي بوليبيوس أن حملقار وعد الأمير النوميدي نارافاس بابنته — دون أن يسمّيها قط.'
      ],
      trueK: 'تاريخي',
      trueT: 'ما أخذه فلوبير عن بوليبيوس',
      trueItems: [
        'الأجور غير المدفوعة، وسيكا، والزحف على تونس',
        'حملقار وحنون وجيسكون وسبنديوس وماتو وأوتاريتوس ونارهافاس',
        'معركة ماكار والمخاضة التي كشفتها الريح',
        'تعذيب جيسكون والأسرى',
        'ممر المنشار، الذي سمّاه «ممر الفأس»، والمجاعة',
        'وعد حملقار بتزويج ابنته لنارافاس',
        'تعذيب ماتو والطواف به في قرطاج'
      ],
      falseK: 'مُتخيَّل',
      falseT: 'ما تخيّله فلوبير',
      falseItems: [
        'سالامبو نفسها، واسمها، وحبّها لماتو',
        'سرقة «الزائيمف»، حجاب تانيت المقدس',
        'الثعبان المقدس وطقوس الكاهنة',
        'جذام حنون والوليمة في حدائق حملقار',
        'التضحية الكبرى بالأطفال لمولوخ أثناء الحصار، منقولة عن حادثة سنة 310 يرويها ديودوروس (20، 14) — وهي مسألة لا تزال موضع جدل',
        'استبدال طفل عبد بحنبعل الصغير'
      ],
      afterK: 'الأثر',
      after: [
        { k: '1862–1863', v: 'شكّك الناقد سانت بوف وعالم الآثار غيوم فروهنر في دقة الرواية، فردّ عليهما فلوبير نقطة نقطة مستشهدًا بمصادره.' },
        { k: '1863–1866', v: 'لحّن موسورسكي أوبرا «سالامبو» وتركها غير مكتملة.' },
        { k: '1890', v: 'أوبرا إرنست رير، عُرضت أول مرة في بروكسل؛ وتلتها ملصقات ورقصات باليه وأفلام نشرت صورة قرطاج باذخة وهمجية.' },
        { k: 'اليوم', v: 'يدين حيّ صلامبو في قرطاج، حيث الموانئ البونيقية والتوفيت، باسمه للرواية — ومعه جزء من الصورة الاستشراقية للمدينة.' }
      ]
    },
    more: {
      title: 'اقرأ أيضًا',
      all: 'الحروب البونيقية',
      read: 'اقرأ',
      items: [
        { to: '/hamilcar', tone: 'tile--purple', k: 'سيرة · نحو 275 – 229/228', t: 'حملقار برقا', d: 'الذي لم يُهزم في صقلية، والمنتصر عند المنشار، وفاتح هسبانيا.' },
        { to: '/armee', tone: 'tile--ink', k: 'الجيش', t: 'الجيش القرطاجي', d: 'ليبيون وحلفاء نوميديون ومرتزقة: نظام فعّال، ونقطة ضعفه.' },
        { to: '/institutions', tone: 'tile--terra', k: 'السياسة', t: 'المؤسسات', d: 'مجلس الشيوخ والشفطان والجمعية الشعبية؛ حنون الكبير في مواجهة آل برقا.' }
      ],
      links: [
        { to: '/guerres-puniques', l: 'الحروب البونيقية الثلاث' },
        { to: '/histoire-des-vainqueurs', l: 'تاريخ المنتصرين' },
        { to: '/chronologie', l: 'التسلسل الزمني' }
      ]
    },
    pageSources: [
      { type: 'ancient', author: 'بوليبيوس', work: '«التواريخ»', ref: '1، 65–88 (لا سيما 67، 73، 76، 83، 84–85، 88)؛ 3، 10؛ 3، 28', note: 'الرواية المتصلة الوحيدة للحرب' },
      { type: 'ancient', author: 'ديودوروس الصقلي', work: '«المكتبة التاريخية»', ref: '25 (شذرات)؛ 20، 14', note: 'فظائع الحرب، وقربان سنة 310' },
      { type: 'ancient', author: 'أبيانوس', work: '«الليبيات»', ref: '5', note: 'مسألة سردينيا' },
      { type: 'ancient', author: 'أبيانوس', work: '«الصقليات»', ref: '2', note: 'مساعدة هيرون ملك سيراكوزة' },
      { type: 'ancient', author: 'كورنيليوس نيبوس', work: '«سيرة حملقار»', ref: '2' },
      { type: 'modern', author: 'غوستاف فلوبير', work: 'Salammbô', ref: '1862', note: 'رواية مذكورة في الصفحة' }
    ]
  }
}

const c = await useLocalized('guerre-des-mercenaires', C)

useHead(() => ({
  title: c.value.metaTitle,
  meta: [{ name: 'description', content: c.value.metaDesc }]
}))
</script>

<style scoped>
.hero-fig { background: #7A5A3A; }
.hero-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
.hero-greek { font: 500 clamp(18px, 1.8vw, 26px)/1.2 var(--font-display); font-style: italic; opacity: 0.45; }
.epithet { font: 600 clamp(16px, 1.4vw, 20px)/1.35 var(--font-body); margin-top: 14px; color: var(--white) !important; }

.stat { display: flex; flex-direction: column; }
.num.n-accent { color: var(--terra); }
.tile--ink .num { color: var(--gold-light); }
.stat-t { font: 500 15px/1.45 var(--font-body); margin-top: 10px; }
.stat-src { font: 600 12px/1.3 var(--font-body); margin-top: auto; padding-top: 12px; opacity: 0.8; }

.block-title { margin-bottom: clamp(16px, 2vw, 24px); }
.para + .para { margin-top: 14px; }
.note { font-size: 14px; }

.src-list { list-style: none; padding: 0; margin: 16px 0 0; display: flex; flex-direction: column; gap: 12px; }
.src-list li { font: 400 15px/1.5 var(--font-body); color: var(--muted); padding-inline-start: 14px; border-inline-start: 2px solid var(--terra); }
.src-list strong { color: var(--ink); }

.side-t { font: 700 13px/1.2 var(--font-body); text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin: 0 0 4px; padding-inline: var(--gutter); }
.side-gap { margin-top: var(--gap); padding-top: 12px; }
.person { min-height: 220px; }
.p-name { margin-top: 14px; }

.chrono-note { font: 500 14px/1.5 var(--font-body); margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.18); }
.rows .val strong { font-weight: 700; }
.tile--ink .rows .val { color: var(--on-dark-2); }
.tile--ink .rows .val strong { color: var(--white); }
.tile--ink .rows .key { color: var(--gold-light); }
.rows--places .key { font-size: clamp(16px, 1.5vw, 19px); }
.rows--places .val { font-size: 15px; }

.map-tile { display: flex; flex-direction: column; gap: 16px; }
.map { width: 100%; height: auto; display: block; border-radius: var(--r-md); direction: ltr; }
.map .sea { fill: #CFDCE8; }
.map .land { fill: #EFE7DA; stroke: #A89272; stroke-width: 1.5; }
.map .lake { fill: #CFDCE8; stroke: #A89272; stroke-width: 1; }
.map .river { fill: none; stroke: #4F7FB0; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.map .river-l { font: italic 600 15px var(--font-body); fill: #2F5E8E; }
.map .sea-l { font: italic 600 16px var(--font-body); fill: #4F6F90; letter-spacing: 0.04em; }
.map .battle path { stroke: var(--ink); stroke-width: 3.5; stroke-linecap: round; }
.map .place circle { stroke: var(--white); stroke-width: 2.5; }
.map .place text { font: 700 17px var(--font-body); fill: var(--ink); paint-order: stroke; stroke: #EFE7DA; stroke-width: 4px; }
.map .pl-c circle { fill: var(--purple); }
.map .pl-r circle { fill: var(--terra); }
.map .pl-x circle { fill: var(--terra); stroke: var(--purple); stroke-width: 3; }
.map .pl-n circle { fill: var(--stone); }
.map-legend { display: flex; flex-wrap: wrap; gap: 8px 20px; font: 500 14px/1.3 var(--font-body); color: var(--stone); }
.map-legend span { display: inline-flex; align-items: center; gap: 8px; }
.dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
.dot--c { background: var(--purple); }
.dot--r { background: var(--terra); }
.dot--x { background: var(--terra); box-shadow: 0 0 0 2px var(--purple); }
.dot--n { background: var(--stone); }
.x { font-style: normal; font-weight: 800; font-size: 18px; line-height: 1; }

.quote { margin: 0; }
.quote p { font: 500 clamp(17px, 1.5vw, 21px)/1.5 var(--font-display); font-style: italic; }
.quote cite { display: block; margin-top: 12px; font: 600 13px/1.4 var(--font-body); font-style: normal; }
.quote--light { border-top: 1px solid rgba(255, 255, 255, 0.3); padding-top: 18px; }
.quote--light p { color: var(--white) !important; }
.quote--light cite { color: var(--purple-tint); }

.steps { display: flex; flex-direction: column; gap: 22px; }
.step { display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 16px; align-items: start; }
.step-n {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--purple); color: var(--white);
  display: grid; place-items: center;
  font: 800 18px/1 var(--font-display);
}

.ruins-fig { min-height: clamp(300px, 34vw, 460px); }

.conseq-grid { margin-top: 8px; }
.conseq-item { border-top: 1.5px solid rgba(255, 255, 255, 0.3); padding-top: 18px; }
.conseq-n { color: var(--navy-tint); font-size: clamp(30px, 3vw, 42px); margin-bottom: 10px; }

.sal { padding-top: 0; }
.sal-fig { background: #EDE6D8; min-height: clamp(360px, 40vw, 560px); }
.sal-fig > img { object-fit: contain; padding: 16px 16px 72px; }
.list-title { margin-bottom: 14px; }
.tf-list { margin: 0; padding-inline-start: 20px; display: flex; flex-direction: column; gap: 8px; }
.tf-list li { font: 400 15.5px/1.5 var(--font-body); }
.tile--olive .tf-list li { color: var(--olive-soft); }
.tile--purple .tf-list li { color: var(--purple-soft); }

.fam { min-height: 220px; }
.more { font: 600 14px/1 var(--font-body); opacity: 0.85; color: var(--gold-light); }
.links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: var(--gap); }

@media (max-width: 1100px) {
  .conseq-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
}

@media (max-width: 640px) {
  .conseq-grid { grid-template-columns: minmax(0, 1fr); }
  .person, .fam { min-height: 0; }
  .step { grid-template-columns: 36px minmax(0, 1fr); gap: 12px; }
  .step-n { width: 36px; height: 36px; font-size: 15px; }
  .sal-fig > img { padding: 12px 12px 88px; }
  .links .btn { flex: 1 1 100%; justify-content: center; }
}
</style>
