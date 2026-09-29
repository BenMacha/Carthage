<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--navy tile--stack tile--hero s-5">
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display hero-title">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-7" style="background:#1D3F66">
        <img src="/img/tharros.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Chiffres-clés -->
    <div class="cols cols-4 keep-2 keys">
      <div v-for="k in c.keys" :key="k.n" class="tile tile--stack key-tile" :class="k.cls">
        <div class="num key-num">{{ k.n }}</div>
        <p class="body key-text">{{ k.t }}</p>
      </div>
    </div>

    <!-- Alliance, hégémonie, confédération -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--ink rel">
          <div>
            <span class="kicker">{{ c.rel.kicker }}</span>
            <h2 class="h-block rel-title">{{ c.rel.title }}</h2>
            <p class="body rel-intro">{{ c.rel.intro }}</p>
          </div>
          <div class="rows" style="--row-key:130px">
            <div v-for="r in c.rel.rows" :key="r.key">
              <span class="key rel-key">{{ r.key }}</span>
              <span class="val rel-val">{{ r.val }}</span>
            </div>
          </div>
        </div>
        <div class="tile tile--xl tile--gold tile--stack">
          <div>
            <span class="kicker">{{ c.status.kicker }}</span>
            <h3 class="h-block status-title">{{ c.status.title }}</h3>
          </div>
          <ul class="status-list">
            <li v-for="s in c.status.items" :key="s.t">
              <strong>{{ s.t }}</strong>
              <span>{{ s.d }}</span>
            </li>
          </ul>
          <p class="status-note">{{ c.status.note }}</p>
          <NuxtLink :to="localePath('/fondation')" class="btn btn-outline status-btn">{{ c.status.cta }} →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Filtres -->
    <section class="sec sec--wide filters-sec">
      <div class="sec-head filters-head">
        <div>
          <span class="kicker">{{ c.grid.kicker }}</span>
          <h2 class="h-section">{{ c.grid.title }}</h2>
        </div>
        <p class="filters-aside">{{ c.grid.aside }}</p>
      </div>
      <div class="pill-row" role="group" :aria-label="c.grid.filterLabel">
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

    <!-- Régions et cités -->
    <section v-for="r in shownRegions" :key="r.key" class="sec region-sec" :aria-labelledby="'reg-' + r.key">
      <div class="region-head">
        <span class="region-dot" :style="{ background: REGION_COLORS[r.key] }" aria-hidden="true" />
        <div>
          <h3 :id="'reg-' + r.key" class="h-block region-title">{{ r.title }}</h3>
          <p class="body region-intro">{{ r.intro }}</p>
        </div>
      </div>
      <div class="city-grid">
        <article v-for="p in r.places" :key="p.id" class="card-img city">
          <img v-if="p.img" :src="p.img" :alt="p.alt" loading="lazy">
          <div v-else class="city-ph" :style="{ background: REGION_COLORS[r.key] }" aria-hidden="true">
            <span v-if="p.phoen" class="phoen city-ph-phoen" dir="rtl">{{ p.phoen }}</span>
            <span v-else class="city-ph-name">{{ p.name }}</span>
          </div>
          <div class="card-body">
            <div class="chips city-chips">
              <span class="chip">{{ r.short }}</span>
              <span class="chip">{{ p.date }}</span>
            </div>
            <h4 class="h-card city-name">{{ p.name }}</h4>
            <div v-if="p.phoen && p.img" class="phoen city-phoen" dir="rtl" lang="phn">{{ p.phoen }}</div>
            <p>{{ p.text }}</p>
            <p class="city-today"><strong>{{ c.todayLabel }}</strong> {{ p.today }}</p>
            <a v-if="p.anchor" :href="'#' + p.anchor" class="city-more">{{ p.toLabel }} ↓</a>
            <NuxtLink v-else-if="p.to" :to="localePath(p.to)" class="city-more">{{ p.toLabel }} →</NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <!-- Motyé, 397 -->
    <section id="motye" class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--terra motya">
          <div>
            <span class="kicker">{{ c.motya.kicker }}</span>
            <h2 class="h-block motya-title">{{ c.motya.title }}</h2>
          </div>
          <div class="rows rows--light" style="--row-key:120px">
            <div v-for="r in c.motya.rows" :key="r.key">
              <span class="key motya-key">{{ r.key }}</span>
              <span class="val motya-val">{{ r.val }}</span>
            </div>
          </div>
          <p class="motya-src">{{ c.motya.src }}</p>
        </div>
        <figure class="fig motya-fig" style="background:#8E3720">
          <img src="/img/motya-kothon.jpg" :alt="c.motya.alt" loading="lazy">
          <figcaption class="cap-box">{{ c.motya.caption }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- Lire les Phéniciens : Malte et Nora -->
    <section id="cippes" class="sec">
      <div class="read-grid">
        <figure class="fig read-fig" style="background:#E6D9C4">
          <img src="/img/melqart-cippus.jpg" :alt="c.read.altCippus" loading="lazy">
          <figcaption class="cap-box">{{ c.read.capCippus }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--paper tile--outline read">
          <div>
            <span class="kicker">{{ c.read.kicker }}</span>
            <h2 class="h-block read-title">{{ c.read.title }}</h2>
          </div>
          <div class="read-text">
            <p v-for="(p, i) in c.read.paragraphs" :key="i" class="body">{{ p }}</p>
          </div>
          <div class="read-phoen" aria-hidden="true">
            <span class="phoen" dir="rtl">𐤋𐤀𐤃𐤍𐤍 𐤋𐤌𐤋𐤒𐤓𐤕 𐤁𐤏𐤋 𐤑𐤓</span>
          </div>
          <p class="read-gloss">{{ c.read.gloss }}</p>
          <NuxtLink :to="localePath('/langue-ecriture')" class="btn btn-primary read-btn">{{ c.read.cta }} →</NuxtLink>
        </div>
        <figure class="fig read-fig" style="background:#E6D9C4">
          <img src="/img/nora-stone.jpg" :alt="c.read.altNora" loading="lazy">
          <figcaption class="cap-box">{{ c.read.capNora }}</figcaption>
        </figure>
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
      <MapsAnimatedMap compact initial-mode="terr" :modes="['terr', 'voy']" />
    </section>

    <PageSources :items="c.pageSources" />

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <h2 class="h-section related-title">{{ c.relatedTitle }}</h2>
    </section>
    <div class="cols cols-4 related-grid">
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

const REGIONS = ['si', 'sa', 'ib', 'mt', 'ly', 'mg']
const REGION_COLORS = {
  si: '#B8492A',
  sa: '#1D3F66',
  ib: '#4E5A2A',
  mt: '#6E1E47',
  ly: '#A8781F',
  mg: '#16130F'
}

const PLACES = [
  // Sicile
  { id: 'motya', cat: 'si', anchor: 'motye' },
  { id: 'lilybee', cat: 'si', img: '/img/punic-ship.jpg', to: '/lieux' },
  { id: 'panorme', cat: 'si', phoen: '𐤑𐤉𐤑' },
  { id: 'solonte', cat: 'si', img: '/img/solunto.jpg' },
  { id: 'eryx', cat: 'si', img: '/img/erice-walls.jpg', to: '/hamilcar' },
  // Sardaigne
  { id: 'nora', cat: 'sa', img: '/img/nora.jpg', anchor: 'cippes' },
  { id: 'tharros', cat: 'sa', img: '/img/tharros.jpg' },
  { id: 'sulcis', cat: 'sa', img: '/img/sulcis-tophet.jpg', to: '/religion' },
  { id: 'sirai', cat: 'sa', to: '/afrique' },
  { id: 'bithia', cat: 'sa' },
  // Ibérie & Baléares
  { id: 'ebusus', cat: 'ib', img: '/img/puig-molins.jpg', phoen: '𐤀𐤉𐤁𐤔𐤌', to: '/lieux' },
  { id: 'baleares', cat: 'ib', img: '/img/slinger.jpg', to: '/armee' },
  { id: 'gadir', cat: 'ib', img: '/img/gadir.jpg', phoen: '𐤂𐤃𐤓', to: '/lieux' },
  // Malte & Gozo
  { id: 'malte', cat: 'mt', anchor: 'cippes' },
  { id: 'tassilg', cat: 'mt', img: '/img/tas-silg.jpg' },
  // Tripolitaine
  { id: 'leptis', cat: 'ly', img: '/img/leptis-magna.jpg', phoen: '𐤋𐤐𐤒𐤉' },
  { id: 'sabratha', cat: 'ly', img: '/img/sabratha.jpg', phoen: '𐤑𐤁𐤓𐤕𐤍' },
  { id: 'oea', cat: 'ly', phoen: '𐤅𐤉𐤏𐤕' },
  // Algérie & Maroc
  { id: 'hippo', cat: 'mg' },
  { id: 'icosium', cat: 'mg', phoen: '𐤀𐤉𐤊𐤎𐤌' },
  { id: 'iol', cat: 'mg' },
  { id: 'lixus', cat: 'mg', img: '/img/lixus.jpg', phoen: '𐤋𐤊𐤔', to: '/fondation' },
  { id: 'mogador', cat: 'mg', to: '/hannon' }
]

const C = {
  fr: {
    meta: {
      title: 'Le monde punique, au-delà de Carthage',
      desc: "Motyé, Tharros, Nora, Ibiza, Malte, Leptis Magna, Lixus : le réseau des cités phéniciennes et puniques d'Occident, leur lien avec Carthage et ce qu'on en voit aujourd'hui."
    },
    hero: {
      chip: 'Carthage · Monde punique',
      title: 'Au-delà de Carthage',
      lede: "De la Sicile à l'Atlantique, des dizaines de cités parlaient punique et honoraient Melqart. Carthage n'était pas seule : elle était la tête d'un réseau.",
      alt: 'Voie antique pavée dans les ruines de Tharros, Sardaigne',
      caption: 'Tharros, sur la presqu’île du Sinis (Sardaigne)'
    },
    keys: [
      { n: '23', t: 'cités et sites présentés, de la Sicile au Maroc atlantique', cls: 'tile--sand' },
      { n: '~540', t: "av. J.-C. : Carthaginois et Étrusques affrontent les Phocéens à Alalia (Hérodote, I, 166)", cls: '' },
      { n: '397', t: 'av. J.-C. : Denys de Syracuse prend et détruit Motyé (Diodore, XIV)', cls: '' },
      { n: '1758', t: "l'abbé Barthélemy déchiffre l'alphabet phénicien grâce aux cippes de Malte", cls: 'tile--purple' }
    ],
    rel: {
      kicker: 'Alliance, hégémonie, confédération ?',
      title: "Carthage et les autres cités puniques",
      intro: "Les colonies phéniciennes d'Occident sont souvent plus anciennes que Carthage. À partir du VIe siècle, quand Tyr s'affaiblit, Carthage en devient le chef de file : elle mène la guerre, négocie les traités et place certaines cités sous sa tutelle.",
      rows: [
        { key: 'VIe s.', val: "Malchus combat en Sicile puis échoue en Sardaigne ; les Magonides reprennent la conquête de l'île (Justin, XVIII, 7 ; XIX, 1)." },
        { key: '~540', val: "À Alalia, au large de la Corse, la flotte carthaginoise et étrusque tient tête aux Phocéens (Hérodote, I, 166) : Carthage se pose en protectrice des Phéniciens d'Occident." },
        { key: '509 · 348', val: "Les traités avec Rome ferment la Sardaigne et la Libye aux marchands romains. Celui de 348 est conclu au nom des Carthaginois, des Tyriens et des gens d'Utique (Polybe, III, 22-24)." },
        { key: '215', val: "Le traité d'Hannibal avec Philippe V distingue Carthage, Utique, et « les cités et peuples soumis aux Carthaginois » (Polybe, VII, 9) : des alliés et des sujets." },
        { key: 'Débat', val: "Sabatino Moscati voyait une « confédération » lâche, qui aurait fragilisé Carthage face à Rome. D'autres historiens parlent d'hégémonie, voire d'empire pour les IVe-IIIe siècles. Le vocabulaire reste discuté." }
      ]
    },
    status: {
      kicker: 'Des statuts très divers',
      title: 'Qui dépendait de qui ?',
      items: [
        { t: 'Des alliées autonomes', d: "Utique et Gadir, fondations tyriennes plus anciennes que Carthage, gardent leurs magistrats et leurs cultes." },
        { t: 'Des fondations carthaginoises', d: "Ebusus (Ibiza), Lilybée ou Carthagène sont créées par Carthage elle-même." },
        { t: 'Les Libyphéniciens', d: "Diodore (XX, 55) nomme ainsi les habitants des villes côtières liés aux Carthaginois par des mariages, entre Carthaginois, Libyens et Numides." },
        { t: 'Tributs et contingents', d: "Selon Tite-Live (XXXIV, 62), Leptis versait à Carthage un talent par jour. Les cités fournissaient aussi des navires et des soldats." }
      ],
      note: "Les termes grecs et latins (« alliés », « sujets ») sont ceux des vainqueurs ; aucune source punique ne décrit ce système de l'intérieur.",
      cta: 'Le réseau phénicien avant Carthage'
    },
    grid: {
      kicker: 'Six régions',
      title: 'Les cités du monde punique',
      aside: "Pour chaque cité : sa fondation, son rôle, et ce qu'on peut y voir aujourd'hui. L'Espagne barcide (Carthagène, Sagonte) et les sites tunisiens sont sur la page « Lieux ».",
      filterLabel: 'Filtrer les cités par région',
      all: 'Toutes'
    },
    live: (n) => `${n} cité${n > 1 ? 's' : ''} affichée${n > 1 ? 's' : ''}`,
    todayLabel: "Aujourd'hui :",
    regions: {
      si: {
        title: 'Sicile',
        short: 'Sicile',
        intro: "À l'arrivée des Grecs, les Phéniciens se regroupent à l'ouest de l'île, près de leurs alliés élymes (Thucydide, VI, 2). Carthage dispute ensuite la Sicile à Syracuse pendant près de deux siècles, avant de la perdre au profit de Rome en 241 (Polybe, I, 62-63)."
      },
      sa: {
        title: 'Sardaigne',
        short: 'Sardaigne',
        intro: "Comptoirs phéniciens dès le VIIIe siècle, puis conquête carthaginoise au VIe. L'île fournit du blé et des métaux ; Carthage la cède à Rome en 238/237, au sortir de la guerre des Mercenaires (Polybe, I, 88)."
      },
      ib: {
        title: 'Ibiza, Baléares et Gadir',
        short: 'Ibérie',
        intro: "Gadir, la plus ancienne, reste une alliée autonome ; Ebusus, fondée par Carthage, lui reste fidèle jusqu'au bout ; Majorque et Minorque, jamais colonisées, fournissent des frondeurs."
      },
      mt: {
        title: 'Malte et Gozo',
        short: 'Malte',
        intro: "Une escale au milieu du détroit de Sicile, fréquentée par les Phéniciens dès le VIIIe siècle, puis dans l'orbite de Carthage. Les Romains s'en emparent dès le début de la deuxième guerre punique, en 218 (Tite-Live, XXI, 51)."
      },
      ly: {
        title: 'Libye : la Tripolitaine',
        short: 'Tripolitaine',
        intro: "Les « Emporia » de la petite Syrte : trois ports — d'où le nom de Tripolitaine — au débouché des pistes sahariennes. Carthage y tient une frontière face aux Grecs de Cyrène."
      },
      mg: {
        title: "Côtes d'Algérie et du Maroc",
        short: 'Maghreb',
        intro: "Un chapelet d'escales jusqu'à l'Atlantique. Beaucoup deviennent ensuite des résidences des rois numides et maurétaniens, qui gardent la langue et les cultes puniques."
      }
    },
    places: {
      motya: {
        date: 'VIIIe s. – 397',
        name: 'Motyé (Mozia)',
        text: "Îlot fortifié de la lagune du Stagnone, relié à la côte par une chaussée. Principal port phénicien de Sicile occidentale jusqu'à sa destruction par Denys de Syracuse en 397.",
        today: "Île-musée (fondation Whitaker) : remparts, tophet, « kothon », et l'éphèbe de Motyé découvert en 1979.",
        toLabel: 'Le siège de 397'
      },
      lilybee: {
        date: '396 – 241',
        name: 'Lilybée (Marsala)',
        alt: 'Épave du navire punique de Marsala',
        text: "Fondée pour accueillir les survivants de Motyé (Diodore, XXII, 10). Elle résiste à Pyrrhus en 276 puis au long siège romain de 250 à 241 (Polybe, I, 42-48).",
        today: "Au musée Baglio Anselmi, l'épave d'un navire de guerre punique.",
        toLabel: 'Voir la page Lieux'
      },
      panorme: {
        date: 'VIIIe s. – 254',
        name: 'Panorme (Palerme)',
        text: "« Tout-port » pour les Grecs, Ṣyṣ sur les monnaies puniques. Base de l'armée carthaginoise en Sicile : c'est là que débarque Hamilcar avant Himère en 480 (Hérodote, VII, 165-167). Les Romains la prennent en 254 (Polybe, I, 38).",
        today: 'Une vaste nécropole punique sous la ville moderne ; objets au musée Antonino Salinas.'
      },
      solonte: {
        date: 'VIIIe s. · IVe s.',
        name: 'Solonte (Solunto)',
        alt: 'Colonnes et vue sur la mer depuis les ruines de Solonte',
        text: "L'une des trois cités phéniciennes citées par Thucydide. En 397, elle fait partie des rares villes restées fidèles à Carthage (Diodore, XIV, 48). Rebâtie au IVe siècle sur le mont Catalfano.",
        today: 'Une ville hellénistique et romaine en terrasses au-dessus de la mer, avec un petit antiquarium.'
      },
      eryx: {
        date: 'Élyme · punique',
        name: 'Éryx (Erice)',
        alt: 'Remparts élymo-puniques d’Erice',
        text: "Cité élyme au sanctuaire célèbre d'Astarté, l'Aphrodite des Grecs. Hamilcar Barca s'y retranche de 244 à 241 face aux Romains (Polybe, I, 58).",
        today: 'Les remparts élymo-puniques, dont certains blocs portent des lettres phéniciennes gravées par les maçons.',
        toLabel: 'Hamilcar'
      },
      nora: {
        date: 'IXe – VIIIe s.',
        name: 'Nora',
        alt: 'Colonne et ruines du site de Nora, Pula',
        text: "Sur un promontoire près de Pula. Pausanias (X, 17, 5) la tenait pour la plus ancienne ville de l'île. La stèle de Nora, découverte en 1773, porte la première mention connue du nom de la Sardaigne.",
        today: 'Un parc archéologique au bord de la mer : quartiers puniques sous le théâtre, les thermes et les mosaïques romaines.',
        toLabel: 'La stèle de Nora'
      },
      tharros: {
        date: 'VIIIe s.',
        name: 'Tharros',
        alt: 'Voie antique pavée de Tharros',
        text: "Au bout de la presqu'île du Sinis, face au golfe d'Oristano. Grande cité punique : son tophet et ses nécropoles ont livré bijoux d'or et scarabées en quantité.",
        today: "Un parc archéologique ouvert, dominé par ses colonnes ; les trouvailles sont à Cagliari et à Cabras."
      },
      sulcis: {
        date: '~VIIIe s.',
        name: 'Sulcis (Sant’Antioco)',
        alt: 'Le tophet de Sant’Antioco, Sardaigne',
        text: "L'une des plus anciennes fondations phéniciennes de Sardaigne, sur une île reliée à la côte. En 258, la flotte carthaginoise est battue dans les eaux sardes (Polybe, I, 24).",
        today: 'Le tophet, des tombes à chambre creusées dans le tuf et le musée Ferruccio Barreca.',
        toLabel: 'Le tophet, un débat'
      },
      sirai: {
        date: '~750 · ~520',
        name: 'Monte Sirai',
        text: "Poste phénicien sur une colline dominant l'arrière-pays de Sulcis, transformé en forteresse à l'époque carthaginoise. L'ADN de ses tombes a été comparé à celui d'autres sites puniques.",
        today: "Acropole, habitations, nécropole et tophet, près de Carbonia.",
        toLabel: "Carthage et l'Afrique"
      },
      bithia: {
        date: 'VIIe s.',
        name: 'Bithia',
        text: "Petit port de la côte sud, près de Chia. Célèbre pour son sanctuaire du dieu Bes, où l'on a trouvé des centaines de statuettes votives en terre cuite.",
        today: 'Des vestiges discrets autour de la tour de Chia ; statuettes au musée de Cagliari.'
      },
      ebusus: {
        date: '~654',
        name: 'Ebusus (Ibiza)',
        alt: 'Nécropole du Puig des Molins, Ibiza',
        text: "Diodore (V, 16) date sa fondation par Carthage de 160 ans après celle de la métropole ; un premier établissement phénicien existait à Sa Caleta. Fidèle jusqu'en 206, quand Magon y fait escale (Tite-Live, XXVIII, 37).",
        today: "Le Puig des Molins et Sa Caleta, inscrits à l'UNESCO avec Dalt Vila.",
        toLabel: 'Voir la page Lieux'
      },
      baleares: {
        date: 'Mercenaires',
        name: 'Majorque et Minorque',
        alt: 'Frondeur des Baléares',
        text: "Jamais colonisées, ces îles de la culture talayotique vendaient à Carthage leurs frondeurs, réputés dans toute l'Antiquité (Diodore, V, 17-18). Magon hiverne à Minorque en 206 ; la tradition lui attribue le nom de Mahón.",
        today: "Talayots et villages préhistoriques ; l'étymologie « port de Magon » reste une tradition.",
        toLabel: "L'armée"
      },
      gadir: {
        date: '~1100 (trad.)',
        name: 'Gadir (Cadix)',
        alt: 'Cadix, l’antique Gadir',
        text: "Fondation tyrienne sur une île, avec un temple de Melqart célèbre dans tout le monde antique. Alliée de Carthage, elle se rallie à Rome en 206 (Tite-Live, XXVIII, 37).",
        today: "Au musée de Cadix, deux sarcophages anthropoïdes phéniciens, découverts en 1887 et 1980.",
        toLabel: 'Voir la page Lieux'
      },
      malte: {
        date: 'VIIIe s. – 218',
        name: 'Malte et Gozo (Melitē, Gaulos)',
        text: "Tombes et céramiques montrent une présence phénicienne dès le VIIIe siècle. En 218, la garnison carthaginoise d'environ 2 000 hommes se rend aux Romains (Tite-Live, XXI, 51).",
        today: "Tombes puniques un peu partout sur l'île ; cippes et stèles au Musée national d'archéologie de La Valette.",
        toLabel: 'Les cippes de Melqart'
      },
      tassilg: {
        date: 'Sanctuaire',
        name: 'Tas-Silġ',
        alt: 'Vestiges du sanctuaire de Tas-Silġ, Malte',
        text: "Sur une colline au-dessus de Marsaxlokk, un temple mégalithique réemployé par les Phéniciens pour Astarté, puis honoré comme sanctuaire de Junon à l'époque romaine — Cicéron accuse Verrès de l'avoir pillé (Verrines, II, 4, 103).",
        today: 'Un site fouillé par des missions italiennes à partir de 1963 ; accès limité.'
      },
      leptis: {
        date: 'Punique · Sidon',
        name: 'Leptis Magna',
        alt: 'Le théâtre romain de Leptis Magna',
        text: "Selon Salluste (Jugurtha, 78), fondée par des exilés de Sidon. Port le plus riche des Emporia, disputé par Massinissa à Carthage. Le punique y reste langue officielle sous Rome : le théâtre porte une dédicace bilingue d'Annobal Tapapius Rufus (1-2 apr. J.-C.).",
        today: "L'une des villes romaines les mieux conservées de la Méditerranée, patrie de Septime Sévère (UNESCO)."
      },
      sabratha: {
        date: 'Ve – IVe s.',
        name: 'Sabratha',
        alt: 'Le mur de scène du théâtre de Sabratha',
        text: "D'abord escale saisonnière, puis ville punique. Son mausolée « B », à étages et d'influence hellénistique (IIe s. av. J.-C.), est un chef-d'œuvre de l'architecture punique.",
        today: 'Le théâtre romain à trois étages de colonnes et le mausolée punique restauré (UNESCO).'
      },
      oea: {
        date: 'Punique',
        name: 'Oea (Tripoli)',
        text: "La troisième cité des Emporia, Wyʿt sur ses monnaies puniques. Elle hérite plus tard du nom de la région, Tripolis, « les trois villes » — d'où Tripoli.",
        today: "Peu de vestiges visibles sous la médina, sinon l'arc de Marc Aurèle (IIe s. apr. J.-C.)."
      },
      hippo: {
        date: 'Punique · numide',
        name: 'Hippo Regius (Annaba)',
        text: "Comptoir punique, devenu « royal » comme résidence des rois numides. Augustin en fut l'évêque et y mourut en 430 ; il rapporte que le punique se parlait encore dans les campagnes.",
        today: "Le site d'Hippone : forum, thermes, quartier chrétien et musée."
      },
      icosium: {
        date: 'IVe – IIIe s.',
        name: 'Icosium (Alger)',
        text: "Le nom punique commence par ʾy, « île », sans doute à cause des îlots du port. Les Grecs y entendirent le nombre vingt (eikosi) et inventèrent vingt compagnons d'Hercule (Solin) : étymologie de fantaisie.",
        today: "Des niveaux antiques mis au jour lors des fouilles de la place des Martyrs, dans la basse Casbah."
      },
      iol: {
        date: 'Punique · 25 av.',
        name: 'Iol / Césarée (Cherchell)',
        text: "Port punique, puis capitale de Juba II et de Cléopâtre Séléné, rebaptisée Caesarea vers 25 av. J.-C. Le couple royal y entretient une cour lettrée.",
        today: 'Le musée de Cherchell et ses statues ; thermes, amphithéâtre et port antiques.'
      },
      lixus: {
        date: 'Pline : très ancienne',
        name: 'Lixus (Larache)',
        alt: 'Ruines de Lixus, Maroc',
        text: "Sur une colline dominant l'estuaire du Loukkos. Pline (XIX, 63) y place un sanctuaire d'Hercule-Melqart plus ancien que celui de Gadès ; la légende y situait le jardin des Hespérides.",
        today: "Acropole, temples et grandes usines de salaisons de l'époque romaine.",
        toLabel: 'La fondation'
      },
      mogador: {
        date: 'VIIe s.',
        name: 'Mogador (Essaouira)',
        text: "L'escale phénicienne la plus méridionale connue sur l'Atlantique : amphores et graffitis du VIIe siècle. Plus tard, Juba II y produit la pourpre (Pline, VI, 201). Certains y voient la Cerné d'Hannon — hypothèse discutée.",
        today: "L'île, face à la ville, est une réserve naturelle fermée au public.",
        toLabel: "Le périple d'Hannon"
      }
    },
    motya: {
      kicker: 'Sicile · 398-396 av. J.-C.',
      title: 'Motyé, la ville effacée par Denys',
      rows: [
        { key: 'VIIIe s.', val: "Des Phéniciens s'installent sur l'îlot de San Pantaleo, dans une lagune peu profonde, reliée à la terre par une chaussée." },
        { key: '398', val: "Denys l'Ancien de Syracuse marche sur la ville. Les habitants coupent la chaussée (Diodore, XIV, 47-48)." },
        { key: '397', val: "Les Syracusains remblaient la lagune et approchent tours de siège à six étages et catapultes, arme nouvelle mise au point à Syracuse (XIV, 42 ; 50-51). Himilcon ne parvient pas à dégager la place. La ville est prise rue par rue et sa population massacrée ou vendue (XIV, 53)." },
        { key: '396', val: "Himilcon reprend l'île, mais les Carthaginois regroupent les survivants sur la côte voisine, à Lilybée (XIV, 55 ; XXII, 10)." },
        { key: 'XXe s.', val: "Joseph Whitaker, négociant en vin de Marsala, achète l'île et y mène les premières fouilles ; les recherches de l'université La Sapienza (L. Nigro) voient dans le « kothon » un bassin sacré plutôt qu'un port." }
      ],
      src: 'Source principale : Diodore de Sicile, Bibliothèque historique, livre XIV.',
      alt: 'Le bassin du « kothon » de Motyé, Sicile',
      caption: 'Le « kothon » de Motyé et le temple voisin'
    },
    read: {
      kicker: 'Malte · Sardaigne',
      title: 'Les pierres qui ont fait parler les Phéniciens',
      paragraphs: [
        "Deux cippes de marbre, découverts près de Marsaxlokk à la fin du XVIIe siècle, portent la même dédicace en phénicien et en grec : deux frères, Abdosir et Osirshamar, y remercient « Melqart, seigneur de Tyr » (IIe s. av. J.-C.).",
        "En 1758, l'abbé Jean-Jacques Barthélemy s'appuie sur les noms propres du texte grec pour identifier les lettres phéniciennes : l'alphabet est déchiffré. L'un des cippes, offert à Louis XVI par le grand maître de l'ordre de Malte, est au Louvre ; l'autre, à La Valette.",
        "La stèle de Nora, trouvée en Sardaigne en 1773, est l'une des plus anciennes inscriptions phéniciennes d'Occident (IXe-VIIIe s.) ; on y lit le nom ŠRDN, la Sardaigne."
      ],
      gloss: "« À notre seigneur, à Melqart, maître de Tyr » — début de la dédicace des cippes.",
      cta: 'Langue et écriture',
      altCippus: 'Cippe de Melqart, marbre à inscription bilingue, musée du Louvre',
      capCippus: 'Cippe de Melqart (Malte), Louvre',
      altNora: 'La stèle de Nora au musée archéologique de Cagliari',
      capNora: 'Stèle de Nora, musée de Cagliari'
    },
    map: {
      kicker: '814 – 146 av. J.-C.',
      title: "L'espace punique et ses routes",
      cta: 'Ouvrir la carte animée'
    },
    sources: {
      kicker: 'Sources',
      text: "Thucydide (VI, 2), Hérodote (I, 166 ; VII, 165-167), Polybe (I ; III, 22-24 ; VII, 9), Diodore (V, 16-18 ; XIV ; XX, 55 ; XXII, 10), Tite-Live (XXI, 51 ; XXVIII, 37 ; XXXIV, 62), Salluste (Jugurtha, 78), Pline l'Ancien (VI, 201 ; XIX, 63), Pausanias (X, 17), Cicéron (Verrines). Travaux modernes : S. Moscati, S. Lancel, M. H. Fantar, L. Nigro."
    },
    relatedTitle: 'À lire aussi',
    related: [
      { to: '/lieux', kick: 'Voyage', title: 'Sur les traces de Carthage', text: 'Carthagène, Kerkouane, Byrsa, Cannes : les sites à visiter.', cls: 'tile--navy' },
      { to: '/fondation', kick: 'Origines', title: 'La fondation', text: "Tyr, Élissa et le réseau phénicien d'Occident avant Carthage.", cls: '' },
      { to: '/economie', kick: 'Commerce', title: "L'économie", text: 'Routes des métaux, ports et traités avec Rome.', cls: 'tile--gold' },
      { to: '/langue-ecriture', kick: 'Écriture', title: 'Langue et écriture', text: "Le punique, de la stèle de Nora à saint Augustin.", cls: 'tile--purple' }
    ],
    pageSources: [
      { type: 'ancient', author: 'Hérodote', work: 'Histoires', ref: 'I, 166 ; VII, 165–167' },
      { type: 'ancient', author: 'Thucydide', work: 'La Guerre du Péloponnèse', ref: 'VI, 2' },
      { type: 'ancient', author: 'Polybe', work: 'Histoires', ref: 'I, 24 ; 38 ; 42–48 ; 58 ; 62–63 ; 88 ; III, 22–24 ; VII, 9' },
      { type: 'ancient', author: 'Diodore de Sicile', work: 'Bibliothèque historique', ref: 'V, 16–18 ; XIV, 42 ; 47–48 ; 50–55 ; XX, 55 ; XXII, 10' },
      { type: 'ancient', author: 'Tite-Live', work: 'Histoire romaine', ref: 'XXI, 51 ; XXVIII, 37 ; XXXIV, 62' },
      { type: 'ancient', author: 'Justin', work: 'Abrégé des Histoires philippiques de Trogue Pompée', ref: 'XVIII, 7 ; XIX, 1' },
      { type: 'ancient', author: 'Salluste', work: 'Guerre de Jugurtha', ref: '78' },
      { type: 'ancient', author: 'Pline l\'Ancien', work: 'Histoire naturelle', ref: 'VI, 201 ; XIX, 63' },
      { type: 'ancient', author: 'Pausanias', work: 'Description de la Grèce', ref: 'X, 17, 5' },
      { type: 'ancient', author: 'Cicéron', work: 'Verrines', ref: 'II, 4, 103' },
      { type: 'modern', author: 'Sabatino Moscati', work: 'L\'épopée des Phéniciens', ref: 'Fayard, 1971', note: 'thèse de la « confédération » punique' },
      { type: 'modern', author: 'Serge Lancel', work: 'Carthage', ref: 'Fayard, 1992' },
      { type: 'modern', author: 'M\'hamed Hassine Fantar', work: 'Carthage, approche d\'une civilisation', ref: 'Alif, 1993' },
      { type: 'modern', author: 'Lorenzo Nigro', note: 'fouilles de Motyé (université La Sapienza), cité dans la page' }
    ]
  },
  en: {
    meta: {
      title: 'The Punic world, beyond Carthage',
      desc: 'Motya, Tharros, Nora, Ibiza, Malta, Leptis Magna, Lixus: the network of western Phoenician and Punic cities, their ties to Carthage and what can be seen of them today.'
    },
    hero: {
      chip: 'Carthage · Punic world',
      title: 'Beyond Carthage',
      lede: 'From Sicily to the Atlantic, dozens of cities spoke Punic and honoured Melqart. Carthage was not alone: it was the head of a network.',
      alt: 'Ancient paved road in the ruins of Tharros, Sardinia',
      caption: 'Tharros, on the Sinis peninsula (Sardinia)'
    },
    keys: [
      { n: '23', t: 'cities and sites featured, from Sicily to Atlantic Morocco', cls: 'tile--sand' },
      { n: 'c. 540', t: 'BC: Carthaginians and Etruscans fight the Phocaeans at Alalia (Herodotus, I, 166)', cls: '' },
      { n: '397', t: 'BC: Dionysius of Syracuse takes and destroys Motya (Diodorus, XIV)', cls: '' },
      { n: '1758', t: 'Abbé Barthélemy deciphers the Phoenician alphabet thanks to the cippi of Malta', cls: 'tile--purple' }
    ],
    rel: {
      kicker: 'Alliance, hegemony, confederation?',
      title: 'Carthage and the other Punic cities',
      intro: "The western Phoenician colonies are often older than Carthage. From the 6th century, as Tyre weakened, Carthage became their leader: it waged war, negotiated treaties and placed some cities under its authority.",
      rows: [
        { key: '6th c.', val: 'Malchus fights in Sicily, then fails in Sardinia; the Magonids take up the conquest of the island again (Justin, XVIII, 7; XIX, 1).' },
        { key: 'c. 540', val: 'At Alalia, off Corsica, the Carthaginian and Etruscan fleet holds off the Phocaeans (Herodotus, I, 166): Carthage stands as protector of the western Phoenicians.' },
        { key: '509 · 348', val: "The treaties with Rome close Sardinia and Libya to Roman merchants. The one of 348 is made in the name of the Carthaginians, the Tyrians and the people of Utica (Polybius, III, 22-24)." },
        { key: '215', val: "Hannibal's treaty with Philip V distinguishes Carthage, Utica, and \"the cities and peoples subject to the Carthaginians\" (Polybius, VII, 9): allies and subjects." },
        { key: 'Debate', val: 'Sabatino Moscati saw a loose "confederation" that weakened Carthage against Rome. Other historians speak of hegemony, or even an empire, for the 4th-3rd centuries. The vocabulary is still debated.' }
      ]
    },
    status: {
      kicker: 'Very different statuses',
      title: 'Who depended on whom?',
      items: [
        { t: 'Autonomous allies', d: 'Utica and Gadir, Tyrian foundations older than Carthage, kept their own magistrates and cults.' },
        { t: 'Carthaginian foundations', d: 'Ebusus (Ibiza), Lilybaeum and Cartagena were created by Carthage itself.' },
        { t: 'The Libyphoenicians', d: 'Diodorus (XX, 55) gives this name to the people of the coastal towns linked to the Carthaginians by intermarriage, between Carthaginians, Libyans and Numidians.' },
        { t: 'Tribute and contingents', d: 'According to Livy (XXXIV, 62), Leptis paid Carthage a talent a day. The cities also supplied ships and soldiers.' }
      ],
      note: 'The Greek and Latin terms ("allies", "subjects") are those of the victors; no Punic source describes this system from the inside.',
      cta: 'The Phoenician network before Carthage'
    },
    grid: {
      kicker: 'Six regions',
      title: 'The cities of the Punic world',
      aside: "For each city: its founding, its role, and what can be seen there today. Barcid Spain (Cartagena, Saguntum) and the Tunisian sites are on the \"Places\" page.",
      filterLabel: 'Filter cities by region',
      all: 'All'
    },
    live: (n) => `${n} cit${n > 1 ? 'ies' : 'y'} shown`,
    todayLabel: 'Today:',
    regions: {
      si: {
        title: 'Sicily',
        short: 'Sicily',
        intro: 'When the Greeks arrived, the Phoenicians gathered in the west of the island, near their Elymian allies (Thucydides, VI, 2). Carthage then fought Syracuse for Sicily for nearly two centuries, before losing it to Rome in 241 (Polybius, I, 62-63).'
      },
      sa: {
        title: 'Sardinia',
        short: 'Sardinia',
        intro: 'Phoenician trading posts from the 8th century, then Carthaginian conquest in the 6th. The island supplied grain and metals; Carthage ceded it to Rome in 238/237, after the Mercenary War (Polybius, I, 88).'
      },
      ib: {
        title: 'Ibiza, the Balearics and Gadir',
        short: 'Iberia',
        intro: 'Gadir, the oldest, remained an autonomous ally; Ebusus, founded by Carthage, stayed loyal to the end; Mallorca and Menorca, never colonised, supplied slingers.'
      },
      mt: {
        title: 'Malta and Gozo',
        short: 'Malta',
        intro: 'A port of call in the middle of the Sicilian Channel, used by the Phoenicians from the 8th century, then in the orbit of Carthage. The Romans seized it at the very start of the Second Punic War, in 218 (Livy, XXI, 51).'
      },
      ly: {
        title: 'Libya: Tripolitania',
        short: 'Tripolitania',
        intro: 'The "Emporia" of the Lesser Syrtis: three ports — hence the name Tripolitania — at the end of the Saharan tracks. Here Carthage held a frontier against the Greeks of Cyrene.'
      },
      mg: {
        title: 'The coasts of Algeria and Morocco',
        short: 'Maghreb',
        intro: 'A string of ports of call as far as the Atlantic. Many later became residences of the Numidian and Mauretanian kings, who kept the Punic language and cults.'
      }
    },
    places: {
      motya: {
        date: '8th c. – 397',
        name: 'Motya (Mozia)',
        text: 'A fortified islet in the Stagnone lagoon, linked to the shore by a causeway. The main Phoenician port of western Sicily until its destruction by Dionysius of Syracuse in 397.',
        today: 'A museum island (Whitaker Foundation): walls, tophet, "kothon", and the Motya youth found in 1979.',
        toLabel: 'The siege of 397'
      },
      lilybee: {
        date: '396 – 241',
        name: 'Lilybaeum (Marsala)',
        alt: 'Wreck of the Punic ship of Marsala',
        text: 'Founded to house the survivors of Motya (Diodorus, XXII, 10). It withstood Pyrrhus in 276, then the long Roman siege from 250 to 241 (Polybius, I, 42-48).',
        today: 'In the Baglio Anselmi museum, the wreck of a Punic warship.',
        toLabel: 'See the Places page'
      },
      panorme: {
        date: '8th c. – 254',
        name: 'Panormus (Palermo)',
        text: '"All-harbour" to the Greeks, Ṣyṣ on Punic coins. The base of the Carthaginian army in Sicily: Hamilcar landed here before Himera in 480 (Herodotus, VII, 165-167). The Romans took it in 254 (Polybius, I, 38).',
        today: 'A vast Punic necropolis beneath the modern city; finds in the Antonino Salinas museum.'
      },
      solonte: {
        date: '8th c. · 4th c.',
        name: 'Soluntum (Solunto)',
        alt: 'Columns and sea view from the ruins of Soluntum',
        text: 'One of the three Phoenician cities named by Thucydides. In 397 it was among the few towns that stayed loyal to Carthage (Diodorus, XIV, 48). Rebuilt in the 4th century on Monte Catalfano.',
        today: 'A terraced Hellenistic and Roman town above the sea, with a small antiquarium.'
      },
      eryx: {
        date: 'Elymian · Punic',
        name: 'Eryx (Erice)',
        alt: 'Elymian-Punic walls of Erice',
        text: 'An Elymian city with a famous sanctuary of Astarte, the Greeks\' Aphrodite. Hamilcar Barca held out there against the Romans from 244 to 241 (Polybius, I, 58).',
        today: 'The Elymian-Punic walls, some of whose blocks bear Phoenician letters carved by the masons.',
        toLabel: 'Hamilcar'
      },
      nora: {
        date: '9th – 8th c.',
        name: 'Nora',
        alt: 'Column and ruins at the site of Nora, Pula',
        text: "On a headland near Pula. Pausanias (X, 17, 5) considered it the oldest town on the island. The Nora Stone, found in 1773, bears the earliest known mention of Sardinia's name.",
        today: 'A seaside archaeological park: Punic quarters beneath the Roman theatre, baths and mosaics.',
        toLabel: 'The Nora Stone'
      },
      tharros: {
        date: '8th c.',
        name: 'Tharros',
        alt: 'Ancient paved road at Tharros',
        text: 'At the tip of the Sinis peninsula, facing the Gulf of Oristano. A major Punic city: its tophet and cemeteries have yielded gold jewellery and scarabs in large numbers.',
        today: 'An open archaeological park, dominated by its columns; the finds are in Cagliari and Cabras.'
      },
      sulcis: {
        date: 'c. 8th c.',
        name: 'Sulcis (Sant’Antioco)',
        alt: 'The tophet of Sant’Antioco, Sardinia',
        text: 'One of the oldest Phoenician foundations in Sardinia, on an island linked to the shore. In 258 the Carthaginian fleet was defeated in Sardinian waters (Polybius, I, 24).',
        today: 'The tophet, chamber tombs cut into the tuff, and the Ferruccio Barreca museum.',
        toLabel: 'The tophet, a debate'
      },
      sirai: {
        date: 'c. 750 · c. 520',
        name: 'Monte Sirai',
        text: 'A Phoenician post on a hill overlooking the hinterland of Sulcis, turned into a fortress in the Carthaginian period. DNA from its tombs has been compared with that of other Punic sites.',
        today: 'Acropolis, houses, necropolis and tophet, near Carbonia.',
        toLabel: 'Carthage and Africa'
      },
      bithia: {
        date: '7th c.',
        name: 'Bithia',
        text: 'A small port on the south coast, near Chia. Known for its sanctuary of the god Bes, where hundreds of terracotta votive figurines were found.',
        today: 'Discreet remains around the Chia tower; figurines in the Cagliari museum.'
      },
      ebusus: {
        date: 'c. 654',
        name: 'Ebusus (Ibiza)',
        alt: 'Puig des Molins necropolis, Ibiza',
        text: 'Diodorus (V, 16) dates its founding by Carthage to 160 years after the mother city; an earlier Phoenician settlement existed at Sa Caleta. Loyal until 206, when Mago called there (Livy, XXVIII, 37).',
        today: 'Puig des Molins and Sa Caleta, UNESCO-listed with Dalt Vila.',
        toLabel: 'See the Places page'
      },
      baleares: {
        date: 'Mercenaries',
        name: 'Mallorca and Menorca',
        alt: 'Balearic slinger',
        text: 'Never colonised, these islands of the Talaiotic culture sold Carthage their slingers, famous throughout Antiquity (Diodorus, V, 17-18). Mago wintered on Menorca in 206; tradition credits him with the name of Mahón.',
        today: 'Talaiots and prehistoric villages; the "port of Mago" etymology remains a tradition.',
        toLabel: 'The army'
      },
      gadir: {
        date: 'c. 1100 (trad.)',
        name: 'Gadir (Cádiz)',
        alt: 'Cádiz, ancient Gadir',
        text: 'A Tyrian foundation on an island, with a temple of Melqart famous throughout the ancient world. An ally of Carthage, it went over to Rome in 206 (Livy, XXVIII, 37).',
        today: 'In the Cádiz museum, two Phoenician anthropoid sarcophagi, found in 1887 and 1980.',
        toLabel: 'See the Places page'
      },
      malte: {
        date: '8th c. – 218',
        name: 'Malta and Gozo (Melite, Gaulos)',
        text: 'Tombs and pottery show a Phoenician presence from the 8th century. In 218 the Carthaginian garrison of about 2,000 men surrendered to the Romans (Livy, XXI, 51).',
        today: 'Punic tombs across the island; cippi and stelae in the National Museum of Archaeology in Valletta.',
        toLabel: 'The cippi of Melqart'
      },
      tassilg: {
        date: 'Sanctuary',
        name: 'Tas-Silġ',
        alt: 'Remains of the Tas-Silġ sanctuary, Malta',
        text: 'On a hill above Marsaxlokk, a megalithic temple reused by the Phoenicians for Astarte, then honoured as a sanctuary of Juno in Roman times — Cicero accuses Verres of looting it (Against Verres, II, 4, 103).',
        today: 'A site excavated by Italian missions from 1963 onwards; limited access.'
      },
      leptis: {
        date: 'Punic · Sidon',
        name: 'Leptis Magna',
        alt: 'The Roman theatre of Leptis Magna',
        text: 'According to Sallust (Jugurtha, 78), founded by exiles from Sidon. The richest port of the Emporia, contested by Masinissa with Carthage. Punic remained an official language under Rome: the theatre bears a bilingual dedication by Annobal Tapapius Rufus (AD 1-2).',
        today: 'One of the best-preserved Roman cities in the Mediterranean, birthplace of Septimius Severus (UNESCO).'
      },
      sabratha: {
        date: '5th – 4th c.',
        name: 'Sabratha',
        alt: 'The stage wall of the theatre of Sabratha',
        text: 'First a seasonal port of call, then a Punic town. Its multi-storey "Mausoleum B", Hellenistic in style (2nd c. BC), is a masterpiece of Punic architecture.',
        today: 'The Roman theatre with three tiers of columns and the restored Punic mausoleum (UNESCO).'
      },
      oea: {
        date: 'Punic',
        name: 'Oea (Tripoli)',
        text: 'The third city of the Emporia, Wyʿt on its Punic coins. It later inherited the name of the region, Tripolis, "the three cities" — hence Tripoli.',
        today: 'Few visible remains beneath the medina, apart from the Arch of Marcus Aurelius (2nd c. AD).'
      },
      hippo: {
        date: 'Punic · Numidian',
        name: 'Hippo Regius (Annaba)',
        text: 'A Punic trading post, called "royal" as a residence of the Numidian kings. Augustine was its bishop and died there in 430; he reports that Punic was still spoken in the countryside.',
        today: 'The site of Hippo: forum, baths, Christian quarter and museum.'
      },
      icosium: {
        date: '4th – 3rd c.',
        name: 'Icosium (Algiers)',
        text: 'The Punic name begins with ʾy ("island"), probably after the islets of the harbour. The Greeks heard the number twenty (eikosi) in it and invented twenty companions of Hercules (Solinus): a fanciful etymology.',
        today: 'Ancient levels uncovered in the excavations of Place des Martyrs, in the lower Casbah.'
      },
      iol: {
        date: 'Punic · 25 BC',
        name: 'Iol / Caesarea (Cherchell)',
        text: 'A Punic port, then the capital of Juba II and Cleopatra Selene, renamed Caesarea around 25 BC. The royal couple kept a learned court there.',
        today: 'The Cherchell museum and its statues; ancient baths, amphitheatre and harbour.'
      },
      lixus: {
        date: 'Pliny: very ancient',
        name: 'Lixus (Larache)',
        alt: 'Ruins of Lixus, Morocco',
        text: 'On a hill above the Loukkos estuary. Pliny (XIX, 63) places here a sanctuary of Hercules-Melqart older than that of Gades; legend set the Garden of the Hesperides here.',
        today: 'Acropolis, temples and large fish-salting works of the Roman period.',
        toLabel: 'The founding'
      },
      mogador: {
        date: '7th c.',
        name: 'Mogador (Essaouira)',
        text: "The southernmost known Phoenician port of call on the Atlantic: amphorae and graffiti of the 7th century. Later, Juba II produced purple dye there (Pliny, VI, 201). Some see it as Hanno's Cerne — a debated hypothesis.",
        today: 'The island, facing the town, is a nature reserve closed to the public.',
        toLabel: "Hanno's voyage"
      }
    },
    motya: {
      kicker: 'Sicily · 398-396 BC',
      title: 'Motya, the city wiped out by Dionysius',
      rows: [
        { key: '8th c.', val: 'Phoenicians settle on the islet of San Pantaleo, in a shallow lagoon, linked to the land by a causeway.' },
        { key: '398', val: 'Dionysius the Elder of Syracuse marches on the city. The inhabitants cut the causeway (Diodorus, XIV, 47-48).' },
        { key: '397', val: 'The Syracusans fill in the lagoon and bring up six-storey siege towers and catapults, a new weapon developed at Syracuse (XIV, 42; 50-51). Himilco fails to relieve the town. It is taken street by street and its people massacred or sold (XIV, 53).' },
        { key: '396', val: 'Himilco retakes the island, but the Carthaginians resettle the survivors on the nearby coast, at Lilybaeum (XIV, 55; XXII, 10).' },
        { key: '20th c.', val: 'Joseph Whitaker, a Marsala wine merchant, buys the island and carries out the first excavations; research by La Sapienza University (L. Nigro) sees the "kothon" as a sacred pool rather than a harbour.' }
      ],
      src: 'Main source: Diodorus of Sicily, Library of History, book XIV.',
      alt: 'The "kothon" basin of Motya, Sicily',
      caption: 'The "kothon" of Motya and the neighbouring temple'
    },
    read: {
      kicker: 'Malta · Sardinia',
      title: 'The stones that made the Phoenicians speak',
      paragraphs: [
        'Two marble cippi, found near Marsaxlokk in the late 17th century, bear the same dedication in Phoenician and Greek: two brothers, Abdosir and Osirshamar, thank "Melqart, lord of Tyre" (2nd c. BC).',
        'In 1758, Abbé Jean-Jacques Barthélemy used the proper names in the Greek text to identify the Phoenician letters: the alphabet was deciphered. One cippus, given to Louis XVI by the Grand Master of the Order of Malta, is in the Louvre; the other is in Valletta.',
        'The Nora Stone, found in Sardinia in 1773, is one of the oldest Phoenician inscriptions in the West (9th-8th c.); it bears the name ŠRDN, Sardinia.'
      ],
      gloss: '"To our lord, to Melqart, lord of Tyre" — opening of the cippi dedication.',
      cta: 'Language and writing',
      altCippus: 'Cippus of Melqart, marble with bilingual inscription, Louvre Museum',
      capCippus: 'Cippus of Melqart (Malta), Louvre',
      altNora: 'The Nora Stone in the archaeological museum of Cagliari',
      capNora: 'Nora Stone, Cagliari museum'
    },
    map: {
      kicker: '814 – 146 BC',
      title: 'The Punic world and its routes',
      cta: 'Open the animated map'
    },
    sources: {
      kicker: 'Sources',
      text: 'Thucydides (VI, 2), Herodotus (I, 166; VII, 165-167), Polybius (I; III, 22-24; VII, 9), Diodorus (V, 16-18; XIV; XX, 55; XXII, 10), Livy (XXI, 51; XXVIII, 37; XXXIV, 62), Sallust (Jugurtha, 78), Pliny the Elder (VI, 201; XIX, 63), Pausanias (X, 17), Cicero (Against Verres). Modern works: S. Moscati, S. Lancel, M. H. Fantar, L. Nigro.'
    },
    relatedTitle: 'Read also',
    related: [
      { to: '/lieux', kick: 'Travel', title: 'In the footsteps of Carthage', text: 'Cartagena, Kerkouane, Byrsa, Cannae: the sites to visit.', cls: 'tile--navy' },
      { to: '/fondation', kick: 'Origins', title: 'The founding', text: 'Tyre, Elissa and the western Phoenician network before Carthage.', cls: '' },
      { to: '/economie', kick: 'Trade', title: 'The economy', text: 'Metal routes, harbours and treaties with Rome.', cls: 'tile--gold' },
      { to: '/langue-ecriture', kick: 'Writing', title: 'Language and writing', text: 'Punic, from the Nora Stone to Saint Augustine.', cls: 'tile--purple' }
    ],
    pageSources: [
      { type: 'ancient', author: 'Herodotus', work: 'Histories', ref: 'I, 166; VII, 165–167' },
      { type: 'ancient', author: 'Thucydides', work: 'History of the Peloponnesian War', ref: 'VI, 2' },
      { type: 'ancient', author: 'Polybius', work: 'Histories', ref: 'I, 24; 38; 42–48; 58; 62–63; 88; III, 22–24; VII, 9' },
      { type: 'ancient', author: 'Diodorus Siculus', work: 'Library of History', ref: 'V, 16–18; XIV, 42; 47–48; 50–55; XX, 55; XXII, 10' },
      { type: 'ancient', author: 'Livy', work: 'History of Rome', ref: 'XXI, 51; XXVIII, 37; XXXIV, 62' },
      { type: 'ancient', author: 'Justin', work: 'Epitome of the Philippic History of Pompeius Trogus', ref: 'XVIII, 7; XIX, 1' },
      { type: 'ancient', author: 'Sallust', work: 'The Jugurthine War', ref: '78' },
      { type: 'ancient', author: 'Pliny the Elder', work: 'Natural History', ref: 'VI, 201; XIX, 63' },
      { type: 'ancient', author: 'Pausanias', work: 'Description of Greece', ref: 'X, 17, 5' },
      { type: 'ancient', author: 'Cicero', work: 'Against Verres', ref: 'II, 4, 103' },
      { type: 'modern', author: 'Sabatino Moscati', work: 'L\'épopée des Phéniciens', ref: 'Fayard, 1971', note: 'the Punic "confederation" thesis' },
      { type: 'modern', author: 'Serge Lancel', work: 'Carthage', ref: 'Fayard, 1992' },
      { type: 'modern', author: 'M\'hamed Hassine Fantar', work: 'Carthage, approche d\'une civilisation', ref: 'Alif, 1993' },
      { type: 'modern', author: 'Lorenzo Nigro', note: 'excavations at Motya (La Sapienza University), cited on this page' }
    ]
  },
  ar: {
    meta: {
      title: 'العالم البونيقي، ما وراء قرطاج',
      desc: 'موتيا، ثاروس، نورا، إيبيزا، مالطا، لبدة الكبرى، ليكسوس: شبكة المدن الفينيقية والبونيقية في الغرب، وصلتها بقرطاج، وما يمكن رؤيته منها اليوم.'
    },
    hero: {
      chip: 'قرطاج · العالم البونيقي',
      title: 'ما وراء قرطاج',
      lede: 'من صقلية إلى الأطلسي، كانت عشرات المدن تتكلم البونيقية وتعبد ملقرت. لم تكن قرطاج وحدها: كانت رأس شبكة.',
      alt: 'طريق قديم مرصوف في آثار ثاروس، سردينيا',
      caption: 'ثاروس، في شبه جزيرة سينيس (سردينيا)'
    },
    keys: [
      { n: '23', t: 'مدينة وموقعًا في هذه الصفحة، من صقلية إلى المغرب الأطلسي', cls: 'tile--sand' },
      { n: '~540', t: 'ق.م: القرطاجيون والإتروسكيون يواجهون الفوكيين في ألاليا (هيرودوت، 1، 166)', cls: '' },
      { n: '397', t: 'ق.م: ديونيسيوس السرقوسي يستولي على موتيا ويدمّرها (ديودوروس، 14)', cls: '' },
      { n: '1758', t: 'الأب بارتيليمي يفكّ رموز الأبجدية الفينيقية بفضل نُصب مالطا', cls: 'tile--purple' }
    ],
    rel: {
      kicker: 'تحالف أم هيمنة أم اتحاد؟',
      title: 'قرطاج والمدن البونيقية الأخرى',
      intro: 'كثير من المستعمرات الفينيقية في الغرب أقدم من قرطاج. ومنذ القرن السادس، حين ضعفت صور، تصدّرت قرطاج هذه الشبكة: تخوض الحروب، وتعقد المعاهدات، وتُخضع بعض المدن لسلطتها.',
      rows: [
        { key: 'ق 6', val: 'مالخوس يقاتل في صقلية ثم يُخفق في سردينيا؛ ويستأنف الماغونيون فتح الجزيرة (يوستينوس، 18، 7؛ 19، 1).' },
        { key: '~540', val: 'في ألاليا، قبالة كورسيكا، يصمد الأسطول القرطاجي والإتروسكي أمام الفوكيين (هيرودوت، 1، 166): قرطاج حامية فينيقيي الغرب.' },
        { key: '509 · 348', val: 'تغلق المعاهدات مع روما سردينيا وليبيا أمام التجار الرومان. وقد عُقدت معاهدة 348 باسم القرطاجيين والصوريين وأهل أوتيكا (بوليبيوس، 3، 22-24).' },
        { key: '215', val: 'تميّز معاهدة حنبعل مع فيليب الخامس بين قرطاج وأوتيكا و«المدن والشعوب الخاضعة للقرطاجيين» (بوليبيوس، 7، 9): حلفاء ورعايا.' },
        { key: 'نقاش', val: 'رأى سباتينو موسكاتي فيها «اتحادًا» رخوًا أضعف قرطاج أمام روما. ويتحدث مؤرخون آخرون عن هيمنة، بل عن إمبراطورية في القرنين الرابع والثالث. وما زالت المصطلحات محلّ نقاش.' }
      ]
    },
    status: {
      kicker: 'أوضاع متباينة',
      title: 'من كان تابعًا لمن؟',
      items: [
        { t: 'حلفاء مستقلون', d: 'أوتيكا وجادير، مؤسستان صوريتان أقدم من قرطاج، احتفظتا بقضاتهما وعباداتهما.' },
        { t: 'مؤسسات قرطاجية', d: 'إيبوسوس (إيبيزا) وليليبايوم وقرطاجنة أسستها قرطاج نفسها.' },
        { t: 'الليبيون الفينيقيون', d: 'هكذا يسمّي ديودوروس (20، 55) سكان المدن الساحلية المرتبطين بالقرطاجيين بالمصاهرة، بين القرطاجيين والليبيين والنوميديين.' },
        { t: 'جزية وجنود', d: 'حسب تيتوس ليفيوس (34، 62)، كانت لبدة تدفع لقرطاج تالنتًا كل يوم. وكانت المدن تقدّم أيضًا سفنًا وجنودًا.' }
      ],
      note: 'المصطلحات الإغريقية واللاتينية («حلفاء»، «رعايا») هي مصطلحات المنتصرين؛ ولا يصف أي مصدر بونيقي هذا النظام من الداخل.',
      cta: 'الشبكة الفينيقية قبل قرطاج'
    },
    grid: {
      kicker: 'ست مناطق',
      title: 'مدن العالم البونيقي',
      aside: 'لكل مدينة: تأسيسها ودورها وما يمكن رؤيته فيها اليوم. أما إسبانيا البرقية (قرطاجنة، ساغونتوم) والمواقع التونسية فتجدها في صفحة «المواقع».',
      filterLabel: 'تصفية المدن حسب المنطقة',
      all: 'الكل'
    },
    live: (n) => `عدد المدن المعروضة: ${n}`,
    todayLabel: 'اليوم:',
    regions: {
      si: {
        title: 'صقلية',
        short: 'صقلية',
        intro: 'حين وصل الإغريق، تجمّع الفينيقيون في غرب الجزيرة قرب حلفائهم الإليميين (ثوقيديدس، 6، 2). ثم نازعت قرطاج سرقوسة على صقلية قرابة قرنين، قبل أن تخسرها لروما سنة 241 (بوليبيوس، 1، 62-63).'
      },
      sa: {
        title: 'سردينيا',
        short: 'سردينيا',
        intro: 'مراكز تجارية فينيقية منذ القرن الثامن، ثم فتح قرطاجي في القرن السادس. كانت الجزيرة تمدّ بالقمح والمعادن؛ وتنازلت عنها قرطاج لروما سنة 238/237 إثر حرب المرتزقة (بوليبيوس، 1، 88).'
      },
      ib: {
        title: 'إيبيزا والبليار وجادير',
        short: 'إيبيريا',
        intro: 'جادير، أقدمها، بقيت حليفة مستقلة؛ وإيبوسوس، التي أسستها قرطاج، ظلّت وفية لها حتى النهاية؛ أما مايوركا ومينوركا، اللتان لم تُستعمَرا قط، فكانتا تقدّمان الرماة بالمقلاع.'
      },
      mt: {
        title: 'مالطا وغودش',
        short: 'مالطا',
        intro: 'محطة في وسط مضيق صقلية، ارتادها الفينيقيون منذ القرن الثامن، ثم دخلت في فلك قرطاج. استولى عليها الرومان في مطلع الحرب البونيقية الثانية، سنة 218 (تيتوس ليفيوس، 21، 51).'
      },
      ly: {
        title: 'ليبيا: إقليم طرابلس',
        short: 'طرابلس',
        intro: '«الأمبوريا» على خليج سرت الصغير: ثلاثة موانئ — ومنها اسم «طرابلس» أي المدن الثلاث — عند منتهى المسالك الصحراوية. وهنا كانت لقرطاج حدود مع إغريق قورينا.'
      },
      mg: {
        title: 'سواحل الجزائر والمغرب',
        short: 'المغرب الكبير',
        intro: 'سلسلة من المحطات حتى الأطلسي. وصار كثير منها لاحقًا مقرًّا لملوك نوميديا وموريطانيا، الذين حافظوا على اللغة والعبادات البونيقية.'
      }
    },
    places: {
      motya: {
        date: 'ق 8 – 397',
        name: 'موتيا (موتسيا)',
        text: 'جزيرة صغيرة محصّنة في بحيرة ستانيوني، يصلها بالساحل ممرّ. أهم ميناء فينيقي في غرب صقلية حتى دمّرها ديونيسيوس السرقوسي سنة 397.',
        today: 'جزيرة ـ متحف (مؤسسة ويتاكر): أسوار، توفيت، «كوثون»، وفتى موتيا المكتشف سنة 1979.',
        toLabel: 'حصار 397'
      },
      lilybee: {
        date: '396 – 241',
        name: 'ليليبايوم (مرسالا)',
        alt: 'حطام السفينة البونيقية في مرسالا',
        text: 'أُسست لإيواء الناجين من موتيا (ديودوروس، 22، 10). صمدت أمام بيروس سنة 276، ثم أمام الحصار الروماني الطويل من 250 إلى 241 (بوليبيوس، 1، 42-48).',
        today: 'في متحف باليو أنسلمي، حطام سفينة حربية بونيقية.',
        toLabel: 'صفحة المواقع'
      },
      panorme: {
        date: 'ق 8 – 254',
        name: 'بانورموس (باليرمو)',
        text: '«الميناء الكامل» عند الإغريق، و«صيص» على النقود البونيقية. قاعدة الجيش القرطاجي في صقلية: فيها نزل حملقار قبل هيميرا سنة 480 (هيرودوت، 7، 165-167). استولى عليها الرومان سنة 254 (بوليبيوس، 1، 38).',
        today: 'مقبرة بونيقية واسعة تحت المدينة الحديثة؛ ولقاها في متحف أنطونينو ساليناس.'
      },
      solonte: {
        date: 'ق 8 · ق 4',
        name: 'سولونتوم (سولونتو)',
        alt: 'أعمدة وإطلالة على البحر من آثار سولونتوم',
        text: 'إحدى المدن الفينيقية الثلاث التي ذكرها ثوقيديدس. سنة 397 كانت من المدن القليلة التي بقيت وفية لقرطاج (ديودوروس، 14، 48). أُعيد بناؤها في القرن الرابع على جبل كاتالفانو.',
        today: 'مدينة هلنستية ورومانية مدرّجة فوق البحر، مع متحف صغير.'
      },
      eryx: {
        date: 'إليمية · بونيقية',
        name: 'إريكس (إيريتشي)',
        alt: 'الأسوار الإليمية البونيقية في إيريتشي',
        text: 'مدينة إليمية ذات معبد شهير لعشتارت، أفروديت الإغريق. تحصّن فيها حملقار برقة أمام الرومان من 244 إلى 241 (بوليبيوس، 1، 58).',
        today: 'الأسوار الإليمية البونيقية، وعلى بعض حجارتها حروف فينيقية نقشها البنّاؤون.',
        toLabel: 'حملقار'
      },
      nora: {
        date: 'ق 9 – ق 8',
        name: 'نورا',
        alt: 'عمود وآثار موقع نورا، بولا',
        text: 'على رأس بحري قرب بولا. عدّها باوسانياس (10، 17، 5) أقدم مدن الجزيرة. ونُصب نورا، المكتشف سنة 1773، يحمل أقدم ذكر معروف لاسم سردينيا.',
        today: 'حديقة أثرية على البحر: أحياء بونيقية تحت المسرح والحمّامات والفسيفساء الرومانية.',
        toLabel: 'نُصب نورا'
      },
      tharros: {
        date: 'ق 8',
        name: 'ثاروس',
        alt: 'طريق قديم مرصوف في ثاروس',
        text: 'في طرف شبه جزيرة سينيس، قبالة خليج أوريستانو. مدينة بونيقية كبرى: أعطى توفِتها ومقابرها حليًّا ذهبية وجعارين بأعداد كبيرة.',
        today: 'حديقة أثرية مفتوحة تعلوها أعمدتها؛ واللقى في كالياري وكابراس.'
      },
      sulcis: {
        date: 'نحو ق 8',
        name: 'سولكيس (سانت أنتيوكو)',
        alt: 'توفيت سانت أنتيوكو، سردينيا',
        text: 'من أقدم المؤسسات الفينيقية في سردينيا، على جزيرة موصولة بالساحل. سنة 258 هُزم الأسطول القرطاجي في المياه السردينية (بوليبيوس، 1، 24).',
        today: 'التوفيت، ومقابر ذات غرف منحوتة في الصخر، ومتحف فيروتشو باريكا.',
        toLabel: 'التوفيت، نقاش مفتوح'
      },
      sirai: {
        date: 'نحو 750 · نحو 520',
        name: 'مونتي سيراي',
        text: 'موقع فينيقي على تلة تشرف على الظهير الداخلي لسولكيس، تحوّل إلى حصن في العهد القرطاجي. وقد قورن الحمض النووي من قبوره بمواقع بونيقية أخرى.',
        today: 'أكروبول ومساكن ومقبرة وتوفيت، قرب كاربونيا.',
        toLabel: 'قرطاج وإفريقيا'
      },
      bithia: {
        date: 'ق 7',
        name: 'بيثيا',
        text: 'ميناء صغير على الساحل الجنوبي قرب كيا. اشتهر بمعبد الإله بِس، حيث عُثر على مئات التماثيل النذرية من الفخار.',
        today: 'آثار متواضعة حول برج كيا؛ والتماثيل في متحف كالياري.'
      },
      ebusus: {
        date: 'نحو 654',
        name: 'إيبوسوس (إيبيزا)',
        alt: 'مقبرة بويغ دي مولينس، إيبيزا',
        text: 'يؤرّخ ديودوروس (5، 16) تأسيسها على يد قرطاج بعد 160 سنة من تأسيس المدينة الأم؛ وكان قبلها موقع فينيقي في سا كاليتا. بقيت وفية حتى 206، حين توقف فيها ماغون (تيتوس ليفيوس، 28، 37).',
        today: 'بويغ دي مولينس وسا كاليتا، مسجّلتان في اليونسكو مع دالت فيلا.',
        toLabel: 'صفحة المواقع'
      },
      baleares: {
        date: 'مرتزقة',
        name: 'مايوركا ومينوركا',
        alt: 'رامٍ بالمقلاع من جزر البليار',
        text: 'لم تُستعمَر هاتان الجزيرتان ذواتا الثقافة التالايوتية، لكنهما زوّدتا قرطاج برماة المقلاع الذين اشتهروا في العالم القديم (ديودوروس، 5، 17-18). قضى ماغون شتاء 206 في مينوركا؛ وينسب إليه التقليد اسم ماهون.',
        today: 'أبراج التالايوت وقرى ما قبل التاريخ؛ أما اشتقاق «ميناء ماغون» فيبقى تقليدًا.',
        toLabel: 'الجيش'
      },
      gadir: {
        date: 'نحو 1100 (تقليد)',
        name: 'جادير (قادس)',
        alt: 'قادس، جادير القديمة',
        text: 'مؤسسة صورية على جزيرة، فيها معبد لملقرت ذائع الصيت في العالم القديم. حليفة لقرطاج، ثم انحازت إلى روما سنة 206 (تيتوس ليفيوس، 28، 37).',
        today: 'في متحف قادس، تابوتان فينيقيان على هيئة البشر، اكتُشفا سنة 1887 وسنة 1980.',
        toLabel: 'صفحة المواقع'
      },
      malte: {
        date: 'ق 8 – 218',
        name: 'مالطا وغودش (ميليتي، غاولوس)',
        text: 'تدل القبور والفخار على وجود فينيقي منذ القرن الثامن. سنة 218 استسلمت الحامية القرطاجية، نحو ألفي رجل، للرومان (تيتوس ليفيوس، 21، 51).',
        today: 'قبور بونيقية في أنحاء الجزيرة؛ ونُصب وأنصاب في المتحف الوطني للآثار في فاليتا.',
        toLabel: 'نُصب ملقرت'
      },
      tassilg: {
        date: 'معبد',
        name: 'تاس سلغ',
        alt: 'بقايا معبد تاس سلغ، مالطا',
        text: 'على تلة فوق مرسى شلوك، معبد ميغاليثي أعاد الفينيقيون استعماله لعشتارت، ثم صار معبدًا ليونو في العهد الروماني — ويتهم شيشرون فيرّيس بنهبه (خطب ضد فيرّيس، 2، 4، 103).',
        today: 'موقع نقّبت فيه بعثات إيطالية ابتداءً من 1963؛ الدخول محدود.'
      },
      leptis: {
        date: 'بونيقية · صيدا',
        name: 'لبدة الكبرى',
        alt: 'المسرح الروماني في لبدة الكبرى',
        text: 'حسب سالوستيوس (يوغرطة، 78)، أسسها منفيّون من صيدا. أغنى موانئ الأمبوريا، نازع ماسينيسا قرطاجَ عليها. وبقيت البونيقية لغة رسمية في العهد الروماني: يحمل المسرح إهداءً ثنائي اللغة لحنّبعل تابابيوس روفوس (1-2 م).',
        today: 'من أفضل المدن الرومانية حفظًا في المتوسط، ومسقط رأس سبتيموس سفيروس (اليونسكو).'
      },
      sabratha: {
        date: 'ق 5 – ق 4',
        name: 'صبراتة',
        alt: 'جدار خشبة المسرح في صبراتة',
        text: 'كانت أولًا محطة موسمية ثم مدينة بونيقية. ويُعدّ ضريحها «ب» متعدد الطوابق، ذو الطابع الهلنستي (ق 2 ق.م)، تحفة من العمارة البونيقية.',
        today: 'المسرح الروماني بطوابق أعمدته الثلاثة والضريح البونيقي المرمَّم (اليونسكو).'
      },
      oea: {
        date: 'بونيقية',
        name: 'أويا (طرابلس)',
        text: 'ثالثة مدن الأمبوريا، واسمها على نقودها البونيقية «ويعت». ثم ورثت اسم الإقليم، «تريبوليس» أي المدن الثلاث — ومنه اسم طرابلس.',
        today: 'آثار قليلة ظاهرة تحت المدينة القديمة، باستثناء قوس ماركوس أوريليوس (ق 2 م).'
      },
      hippo: {
        date: 'بونيقية · نوميدية',
        name: 'هيبو ريجيوس (عنابة)',
        text: 'مركز تجاري بونيقي، سُمّي «الملكي» لأنه كان مقرًّا لملوك نوميديا. كان أوغسطين أسقفها وتوفي فيها سنة 430؛ ويروي أن البونيقية كانت ما تزال تُتكلَّم في الأرياف.',
        today: 'موقع هيبون: الساحة العامة والحمّامات والحي المسيحي والمتحف.'
      },
      icosium: {
        date: 'ق 4 – ق 3',
        name: 'إيكوزيوم (الجزائر)',
        text: 'يبدأ الاسم البونيقي بـ«إي» (جزيرة)، إشارة على الأرجح إلى جزر الميناء الصغيرة. وسمع فيه الإغريق العدد عشرين (إيكوسي) فاخترعوا عشرين رفيقًا لهرقل (سولينوس): اشتقاق خيالي.',
        today: 'طبقات قديمة كُشف عنها في حفريات ساحة الشهداء، في القصبة السفلى.'
      },
      iol: {
        date: 'بونيقية · 25 ق.م',
        name: 'إيول / قيصرية (شرشال)',
        text: 'ميناء بونيقي، ثم عاصمة يوبا الثاني وكليوباترا سيليني، وسُمّيت قيصرية نحو 25 ق.م. وأقام فيها الزوجان الملكيان بلاطًا للأدب والعلم.',
        today: 'متحف شرشال وتماثيله؛ وحمّامات ومدرّج وميناء قديم.'
      },
      lixus: {
        date: 'بلينيوس: قديمة جدًّا',
        name: 'ليكسوس (العرائش)',
        alt: 'آثار ليكسوس، المغرب',
        text: 'على تلة تشرف على مصب نهر اللوكوس. يضع فيها بلينيوس (19، 63) معبدًا لهرقل ـ ملقرت أقدم من معبد قادس؛ وكانت الأسطورة تجعل فيها حديقة الهسبيريدات.',
        today: 'أكروبول ومعابد ومصانع تمليح كبيرة من العهد الروماني.',
        toLabel: 'التأسيس'
      },
      mogador: {
        date: 'ق 7',
        name: 'موغادور (الصويرة)',
        text: 'أبعد محطة فينيقية معروفة جنوبًا على الأطلسي: جرار ونقوش من القرن السابع. ولاحقًا أنتج فيها يوبا الثاني الأرجوان (بلينيوس، 6، 201). ويرى بعضهم فيها «كيرني» حنون — فرضية محلّ نقاش.',
        today: 'الجزيرة المقابلة للمدينة محمية طبيعية مغلقة أمام الزوار.',
        toLabel: 'رحلة حنون'
      }
    },
    motya: {
      kicker: 'صقلية · 398-396 ق.م',
      title: 'موتيا، المدينة التي محاها ديونيسيوس',
      rows: [
        { key: 'ق 8', val: 'يستقر الفينيقيون في جزيرة سان بانتاليو، وسط بحيرة ضحلة، ويصلها باليابسة ممرّ.' },
        { key: '398', val: 'ديونيسيوس الأكبر، طاغية سرقوسة، يزحف على المدينة. فيقطع السكان الممرّ (ديودوروس، 14، 47-48).' },
        { key: '397', val: 'يردم السرقوسيون البحيرة ويقرّبون أبراج حصار من ستة طوابق ومنجنيقات، وهي سلاح جديد طُوّر في سرقوسة (14، 42؛ 50-51). يعجز حملكون عن فكّ الحصار. تُؤخذ المدينة شارعًا شارعًا ويُذبح سكانها أو يُباعون (14، 53).' },
        { key: '396', val: 'يستعيد حملكون الجزيرة، لكن القرطاجيين ينقلون الناجين إلى الساحل المجاور، إلى ليليبايوم (14، 55؛ 22، 10).' },
        { key: 'ق 20', val: 'جوزيف ويتاكر، تاجر نبيذ مرسالا، يشتري الجزيرة ويجري أولى الحفريات؛ وترى أبحاث جامعة لا سابيينزا (ل. نيغرو) في «الكوثون» حوضًا مقدسًا لا ميناءً.' }
      ],
      src: 'المصدر الرئيسي: ديودوروس الصقلي، المكتبة التاريخية، الكتاب 14.',
      alt: 'حوض «الكوثون» في موتيا، صقلية',
      caption: '«كوثون» موتيا والمعبد المجاور'
    },
    read: {
      kicker: 'مالطا · سردينيا',
      title: 'الحجارة التي أنطقت الفينيقيين',
      paragraphs: [
        'نُصبان من الرخام، اكتُشفا قرب مرسى شلوك في أواخر القرن السابع عشر، يحملان الإهداء نفسه بالفينيقية والإغريقية: أخَوان، عبد أوسير وأوسير شمر، يشكران «ملقرت، سيد صور» (ق 2 ق.م).',
        'سنة 1758، اعتمد الأب جان جاك بارتيليمي على أسماء الأعلام في النص الإغريقي ليتعرّف على الحروف الفينيقية: فكُّت رموز الأبجدية. أحد النُصبين، الذي أهداه المعلّم الأكبر لفرسان مالطا إلى لويس السادس عشر، في متحف اللوفر؛ والآخر في فاليتا.',
        'نُصب نورا، المكتشف في سردينيا سنة 1773، من أقدم النقوش الفينيقية في الغرب (ق 9-8)؛ ونقرأ فيه اسم «شردن»، أي سردينيا.'
      ],
      gloss: '«لسيّدنا، لملقرت، ربّ صور» — مطلع إهداء النُصبين.',
      cta: 'اللغة والكتابة',
      altCippus: 'نُصب ملقرت، رخام بنقش ثنائي اللغة، متحف اللوفر',
      capCippus: 'نُصب ملقرت (مالطا)، اللوفر',
      altNora: 'نُصب نورا في المتحف الأثري بكالياري',
      capNora: 'نُصب نورا، متحف كالياري'
    },
    map: {
      kicker: '814 – 146 ق.م',
      title: 'المجال البونيقي وطرقه',
      cta: 'افتح الخريطة المتحركة'
    },
    sources: {
      kicker: 'المصادر',
      text: 'ثوقيديدس (6، 2)، هيرودوت (1، 166؛ 7، 165-167)، بوليبيوس (1؛ 3، 22-24؛ 7، 9)، ديودوروس (5، 16-18؛ 14؛ 20، 55؛ 22، 10)، تيتوس ليفيوس (21، 51؛ 28، 37؛ 34، 62)، سالوستيوس (يوغرطة، 78)، بلينيوس الأكبر (6، 201؛ 19، 63)، باوسانياس (10، 17)، شيشرون (ضد فيرّيس). دراسات حديثة: س. موسكاتي، س. لانسيل، م. ح. فنطر، ل. نيغرو.'
    },
    relatedTitle: 'اقرأ أيضًا',
    related: [
      { to: '/lieux', kick: 'سفر', title: 'على خطى قرطاج', text: 'قرطاجنة، كركوان، بيرصا، كاناي: مواقع للزيارة.', cls: 'tile--navy' },
      { to: '/fondation', kick: 'الأصول', title: 'التأسيس', text: 'صور وعليسة والشبكة الفينيقية في الغرب قبل قرطاج.', cls: '' },
      { to: '/economie', kick: 'تجارة', title: 'الاقتصاد', text: 'طرق المعادن والموانئ والمعاهدات مع روما.', cls: 'tile--gold' },
      { to: '/langue-ecriture', kick: 'كتابة', title: 'اللغة والكتابة', text: 'البونيقية، من نُصب نورا إلى القديس أوغسطين.', cls: 'tile--purple' }
    ],
    pageSources: [
      { type: 'ancient', author: 'هيرودوت', work: 'التواريخ', ref: '1، 166؛ 7، 165–167' },
      { type: 'ancient', author: 'ثوقيديدس', work: 'تاريخ الحرب البيلوبونيسية', ref: '6، 2' },
      { type: 'ancient', author: 'بوليبيوس', work: 'التواريخ', ref: '1، 24؛ 38؛ 42–48؛ 58؛ 62–63؛ 88؛ 3، 22–24؛ 7، 9' },
      { type: 'ancient', author: 'ديودوروس الصقلي', work: 'المكتبة التاريخية', ref: '5، 16–18؛ 14، 42؛ 47–48؛ 50–55؛ 20، 55؛ 22، 10' },
      { type: 'ancient', author: 'تيتوس ليفيوس', work: 'تاريخ روما', ref: '21، 51؛ 28، 37؛ 34، 62' },
      { type: 'ancient', author: 'يوستينوس', work: 'مختصر التواريخ الفيليبية لتروغوس بومبيوس', ref: '18، 7؛ 19، 1' },
      { type: 'ancient', author: 'سالوستيوس', work: 'حرب يوغرطة', ref: '78' },
      { type: 'ancient', author: 'بلينيوس الأكبر', work: 'التاريخ الطبيعي', ref: '6، 201؛ 19، 63' },
      { type: 'ancient', author: 'باوسانياس', work: 'وصف بلاد الإغريق', ref: '10، 17، 5' },
      { type: 'ancient', author: 'شيشرون', work: 'ضد فيرّيس', ref: '2، 4، 103' },
      { type: 'modern', author: 'سباتينو موسكاتي', work: 'L\'épopée des Phéniciens', ref: 'Fayard, 1971', note: 'أطروحة «الاتحاد» البونيقي' },
      { type: 'modern', author: 'سيرج لانسيل', work: 'Carthage', ref: 'Fayard, 1992' },
      { type: 'modern', author: 'محمد حسين فنطر', work: 'Carthage, approche d\'une civilisation', ref: 'Alif, 1993' },
      { type: 'modern', author: 'لورينزو نيغرو', note: 'حفريات موتيا (جامعة لا سابيينزا)، مذكور في الصفحة' }
    ]
  }
}

const c = computed(() => C[locale.value] || C.fr)

const places = computed(() => PLACES.map(p => ({ ...p, ...c.value.places[p.id] })))

const filters = computed(() => [
  { key: 'all', label: c.value.grid.all },
  ...REGIONS.map(k => ({ key: k, label: `${c.value.regions[k].short} · ${PLACES.filter(p => p.cat === k).length}` }))
])

const shownRegions = computed(() =>
  REGIONS
    .filter(k => filter.value === 'all' || filter.value === k)
    .map(k => ({ key: k, ...c.value.regions[k], places: places.value.filter(p => p.cat === k) }))
)

const liveText = computed(() => c.value.live(shownRegions.value.reduce((n, r) => n + r.places.length, 0)))

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-title { font-size: clamp(44px, 5.8vw, 84px); }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Chiffres-clés */
.keys { padding-top: var(--gap); }
.key-tile { min-height: 170px; }
.key-num { font-size: clamp(38px, 4vw, 56px); }
.key-tile.tile--purple .key-num { color: var(--gold-light); }
.key-text { font-size: 14px; line-height: 1.45; }

/* Relations */
.rel { display: flex; flex-direction: column; gap: 24px; }
.rel-title { font-size: clamp(30px, 3.4vw, 48px); margin: 6px 0 12px; }
.rel-intro { color: var(--on-dark-2); max-width: 62ch; }
.rel-key { font-size: 20px; line-height: 1.1; color: var(--gold-light); }
.rel-val { font-size: 15px; line-height: 1.5; color: var(--on-dark); }
.status-title { font-size: clamp(26px, 2.6vw, 38px); margin-top: 6px; }
.status-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
.status-list li { display: flex; flex-direction: column; gap: 3px; padding-top: 12px; border-top: 1px solid rgba(22, 19, 15, 0.2); }
.status-list strong { font: 600 16px/1.3 var(--font-body); }
.status-list span { font: 400 14px/1.5 var(--font-body); color: var(--gold-ink); }
.status-note { font: italic 400 13px/1.45 var(--font-body); }
.status-btn { align-self: flex-start; min-height: 44px; }

/* Filtres */
.filters-sec { padding-bottom: 4px; }
.filters-aside { max-width: 460px !important; }

/* Régions */
.region-sec { padding-top: clamp(28px, 3.4vw, 44px); }
.region-head {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 18px;
  padding-inline: 4px;
}
.region-dot { flex: none; width: 14px; height: 14px; border-radius: 50%; margin-top: 12px; }
.region-title { font-size: clamp(26px, 2.6vw, 36px); margin: 0 0 6px; }
.region-intro { max-width: 80ch; color: var(--muted); }

.city-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 290px), 1fr));
  gap: var(--gap);
}

.city > img { height: 200px; }
.city .card-body { padding: 18px 10px 10px; display: flex; flex-direction: column; flex: 1; }
.city-ph {
  height: 200px;
  border-radius: calc(var(--r-lg) - 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  color: rgba(255, 255, 255, 0.92);
  overflow: hidden;
}
.city-ph-phoen { font-size: 56px; line-height: 1; }
.city-ph-name { font: 700 clamp(26px, 2.4vw, 34px)/1.05 var(--font-display); text-align: center; opacity: 0.9; }
.city-chips { gap: 6px; margin-bottom: 14px; }
.city-chips .chip { font-size: 12px; padding: 8px 11px; }
.city-name { margin: 0 0 8px; font-stretch: 106%; }
.city-phoen { font-size: 18px; color: var(--purple); margin: -2px 0 10px; text-align: start; }
.city-today { margin-top: 10px; font-size: 13.5px !important; color: var(--stone) !important; }
.city-today strong { color: var(--purple); font-weight: 600; }
.city-more {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-top: auto;
  padding-top: 6px;
  font: 600 14px/1 var(--font-body);
  color: var(--purple);
}

/* Motyé */
.motya { display: flex; flex-direction: column; gap: 22px; }
.motya-title { font-size: clamp(30px, 3.4vw, 48px); margin-top: 6px; }
.motya-key { font-size: 20px; line-height: 1.1; color: var(--white); }
.motya-val { font-size: 15px; line-height: 1.5; color: var(--terra-soft); }
.motya-src { font: italic 400 13px/1.4 var(--font-body); color: rgba(255, 255, 255, 0.78) !important; }
.motya-fig { min-height: 520px; }

/* Lire les Phéniciens */
.read-grid {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 6fr) minmax(0, 3fr);
  gap: var(--gap);
}
.read-fig { min-height: 520px; }
.read-fig img { object-position: center 30%; }
.read { display: flex; flex-direction: column; gap: 20px; }
.read-title { font-size: clamp(28px, 3vw, 44px); margin-top: 6px; }
.read-text { display: flex; flex-direction: column; gap: 12px; }
.read-phoen { font-size: clamp(22px, 2.4vw, 32px); color: var(--purple); text-align: start; overflow-wrap: anywhere; }
.read-gloss { font: italic 400 14px/1.45 var(--font-body); color: var(--stone); }
.read-btn { align-self: flex-start; min-height: 44px; }

.sources .body { margin-top: 8px; font-size: 14px; }

.related-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.related { min-height: 200px; }

@media (max-width: 1100px) {
  .read-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .read { grid-column: 1 / -1; grid-row: 1; }
  .read-fig { min-height: 380px; }
}

@media (max-width: 960px) {
  .motya-fig { min-height: 360px; }
}

@media (max-width: 640px) {
  .key-tile { min-height: 0; }
  .region-head { gap: 12px; }
  .read-grid { grid-template-columns: minmax(0, 1fr); }
  .read-fig { min-height: 320px; }
  .motya-fig { min-height: 260px; }
  .related { min-height: 0; }
  .rel-key, .motya-key { font-size: 17px; }
}
</style>
