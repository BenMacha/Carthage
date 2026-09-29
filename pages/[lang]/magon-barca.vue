<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--terra tile--stack tile--hero s-5">
        <div class="hero-top">
          <span class="chip chip--glass">{{ c.chip }}</span>
          <span class="phoen hero-phoen" aria-hidden="true">𐤌𐤂𐤍</span>
        </div>
        <div>
          <span class="kicker">{{ c.dates }}</span>
          <h1 class="h-display">{{ c.title }}</h1>
          <p class="epithet">{{ c.epithet }}</p>
          <p class="lede">{{ c.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-7">
        <img src="/img/cannae.jpg" :alt="c.heroAlt">
        <figcaption>{{ c.heroCap }}</figcaption>
      </figure>
    </div>

    <!-- Chiffres clés -->
    <div class="cols cols-4">
      <div v-for="(s, i) in c.stats" :key="i" class="tile">
        <div class="num" :class="{ 'n-accent': i === 0 }">{{ s.n }}</div>
        <p class="stat-t">{{ s.t }}</p>
      </div>
    </div>

    <!-- Chronologie -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <span class="kicker">{{ c.chrono.kicker }}</span>
        <h2 class="h-section block-title">{{ c.chrono.title }}</h2>
        <div class="rows" style="--row-key:170px">
          <div v-for="r in c.chrono.rows" :key="r.k + r.t">
            <span class="key">{{ r.k }}</span>
            <span class="val"><strong>{{ r.t }}</strong> — {{ r.d }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- En Italie avec Hannibal -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.italy.title }}</h2>
        <p>{{ c.italy.aside }}</p>
      </div>
    </section>
    <div class="cols cols-7-5">
      <div class="tile tile--xl">
        <span class="kicker">{{ c.italy.kicker }}</span>
        <h3 class="h-card">{{ c.italy.trebia.t }}</h3>
        <p v-for="(p, i) in c.italy.trebia.p" :key="i" class="body-lg para">{{ p }}</p>
        <NuxtLink :to="localePath('/tactiques')" class="btn btn-outline in-btn">{{ c.italy.tactics }} →</NuxtLink>
      </div>
      <div class="tile tile--xl tile--gold tile--stack">
        <div>
          <span class="kicker">{{ c.italy.cannae.k }}</span>
          <h3 class="h-card">{{ c.italy.cannae.t }}</h3>
          <p class="body-lg">{{ c.italy.cannae.d }}</p>
        </div>
        <figure class="quote-inline">
          <blockquote class="quote"><p>{{ c.italy.cannae.q }}</p></blockquote>
          <figcaption><cite>{{ c.italy.cannae.cite }}</cite></figcaption>
        </figure>
      </div>
    </div>

    <!-- Les anneaux d'or -->
    <section class="sec">
      <div class="tile tile--xl tile--ink rings">
        <div class="rings-txt">
          <span class="kicker">{{ c.rings.kicker }}</span>
          <h2 class="h-block block-title">{{ c.rings.title }}</h2>
          <p v-for="(p, i) in c.rings.p" :key="i" class="body-lg para">{{ p }}</p>
        </div>
        <div class="rings-side">
          <div class="ring-num">{{ c.rings.big }}</div>
          <p class="body">{{ c.rings.bigT }}</p>
          <div class="ring-reply">
            <span class="kicker">{{ c.rings.replyK }}</span>
            <p class="body">{{ c.rings.reply }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Hispanie et Baléares -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.spain.title }}</h2>
        <p>{{ c.spain.aside }}</p>
      </div>
    </section>
    <div class="bento spain">
      <div class="tile tile--xl tile--olive s-7">
        <span class="kicker">{{ c.spain.kicker }}</span>
        <p v-for="(p, i) in c.spain.p" :key="i" class="body-lg para">{{ p }}</p>
      </div>
      <figure class="fig s-5 spain-fig">
        <img src="/img/puig-molins.jpg" :alt="c.spain.necroAlt" loading="lazy">
        <figcaption class="cap-box">{{ c.spain.necroCap }}</figcaption>
      </figure>
      <figure class="fig s-5 spain-fig">
        <img src="/img/slinger.jpg" :alt="c.spain.slingAlt" loading="lazy">
        <figcaption class="cap-box">{{ c.spain.slingCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--sand s-7">
        <span class="kicker">{{ c.spain.isles.k }}</span>
        <h3 class="h-card">{{ c.spain.isles.t }}</h3>
        <p v-for="(p, i) in c.spain.isles.p" :key="i" class="body-lg para">{{ p }}</p>
      </div>
    </div>

    <!-- Ligurie et mort -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--navy tile--stack">
          <div>
            <span class="kicker">{{ c.liguria.kicker }}</span>
            <h2 class="h-block block-title">{{ c.liguria.title }}</h2>
            <p v-for="(p, i) in c.liguria.p" :key="i" class="body-lg para">{{ p }}</p>
          </div>
          <div class="chips">
            <span v-for="t in c.liguria.chips" :key="t" class="chip chip--glass">{{ t }}</span>
          </div>
        </div>
        <figure class="fig coin-fig">
          <img src="/img/coin-elephant.jpg" :alt="c.liguria.coinAlt" loading="lazy">
          <figcaption class="cap-box">{{ c.liguria.coinCap }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- Correction -->
    <section class="sec">
      <div class="cols cols-2 cols--flush">
        <div class="tile tile--xl tile--paper tile--outline">
          <span class="kicker">{{ c.corr.label }}</span>
          <h2 class="h-card">{{ c.corr.title }}</h2>
          <ul class="corr-list">
            <li v-for="(t, i) in c.corr.items" :key="i" class="body">{{ t }}</li>
          </ul>
        </div>
        <div class="tile tile--xl tile--purple tile--stack">
          <div>
            <span class="kicker">{{ c.legacy.kicker }}</span>
            <h2 class="h-block block-title">{{ c.legacy.title }}</h2>
            <p v-for="(p, i) in c.legacy.p" :key="i" class="body-lg para">{{ p }}</p>
          </div>
          <NuxtLink :to="localePath('/magon-agronome')" class="btn legacy-btn">{{ c.legacy.agro }} →</NuxtLink>
        </div>
      </div>
    </section>

    <PageSources :items="c.sources" />

    <!-- La famille / liens -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.family.title }}</h2>
        <NuxtLink :to="localePath('/biographies')" class="btn btn-outline">{{ c.family.all }} →</NuxtLink>
      </div>
    </section>
    <div class="cols cols-3">
      <NuxtLink v-for="f in c.family.items" :key="f.to" :to="localePath(f.to)" class="tile tile--stack fam" :class="f.tone">
        <div>
          <span class="kicker">{{ f.k }}</span>
          <h3 class="h-card">{{ f.t }}</h3>
          <p class="body">{{ f.d }}</p>
        </div>
        <span class="more">{{ c.family.more }} →</span>
      </NuxtLink>
    </div>
    <div class="cols links">
      <NuxtLink v-for="l in c.family.links" :key="l.to" :to="localePath(l.to)" class="btn btn-outline">{{ l.l }} →</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const C = {
  fr: {
    metaTitle: 'Magon Barca (~243 – 203 av. J.-C.) — le cadet des Barcides',
    metaDesc: "Magon Barca, frère cadet d'Hannibal : l'embuscade de la Trébie, Cannes, les anneaux d'or versés devant le Sénat de Carthage, dix ans en Hispanie, Minorque, la Ligurie et la mort en mer (203).",
    chip: 'Biographie · Les Barcides',
    dates: '~243 – 203 av. J.-C.',
    title: 'Magon Barca',
    epithet: "Le cadet des Barca, le stratège de l'ombre",
    lede: "Plus jeune fils d'Hamilcar, il fut de tous les fronts : l'embuscade de la Trébie, le centre de Cannes, dix ans de guerre en Hispanie, les Baléares, puis un second front en Ligurie. Il mourut en mer en 203, rappelé pour défendre Carthage.",
    heroAlt: 'La bataille de Cannes',
    heroCap: 'Cannes, 216 av. J.-C. : Magon combat au centre avec Hannibal',
    stats: [
      { n: '2 000', t: "hommes cachés dans le lit d'un ruisseau pour l'embuscade de la Trébie (218)" },
      { n: '8', t: 'légions romaines prises au piège à Cannes (216)' },
      { n: '~10 ans', t: 'de guerre en Hispanie (215 – 206)' },
      { n: '14 000', t: 'hommes débarqués en Ligurie en 205 : 12 000 fantassins, 2 000 cavaliers' }
    ],
    chrono: {
      kicker: 'Chronologie',
      title: 'Une vie en campagne',
      rows: [
        { k: '~243', t: 'Naissance', d: "Troisième et plus jeune fils d'Hamilcar Barca, formé dès l'enfance dans les camps militaires d'Hispanie aux côtés de ses frères." },
        { k: '218', t: 'Les Alpes', d: "Il suit Hannibal de l'Hispanie jusqu'en Italie." },
        { k: '218', t: 'La Trébie', d: "En décembre, il tend l'embuscade qui prend les légions de Sempronius à revers." },
        { k: '217', t: "Les marais de l'Arno", d: "Avec la cavalerie numide, il ferme la marche pour empêcher les Gaulois de déserter pendant la traversée des marais." },
        { k: '216', t: 'Cannes', d: "Il commande le centre avec Hannibal (Polybe) : la ligne qui recule sans rompre pendant que l'étau se referme." },
        { k: '216/215', t: 'Carthage', d: "Il vient annoncer la victoire au Sénat et fait verser sur le seuil de la curie les anneaux d'or des chevaliers romains tués." },
        { k: '215–206', t: 'Hispanie', d: "Envoyé en Hispanie plutôt qu'en Italie, il y combat aux côtés de son frère Hasdrubal et d'Hasdrubal Giscon ; en 211, les deux Scipions sont tués au haut Bétis." },
        { k: '206', t: 'Ilipa, Gadès, Baléares', d: "Après la défaite d'Ilipa, il se replie sur Gadès, échoue devant Carthagène, puis gagne les Baléares et hiverne à Minorque." },
        { k: '205', t: 'La Ligurie', d: "Il débarque à Gênes avec 12 000 fantassins et 2 000 cavaliers et ouvre un second front en Italie du Nord." },
        { k: '203', t: 'Blessure et mort', d: "Vaincu en Insubrie et blessé à la cuisse, il est rappelé en Afrique et meurt de sa blessure en mer, au large de la Sardaigne." }
      ]
    },
    italy: {
      title: 'Aux côtés d\'Hannibal',
      aside: "De 218 à 216, Magon est le lieutenant le plus proche de son frère.",
      kicker: 'La Trébie · décembre 218',
      trebia: {
        t: "L'embuscade du ruisseau",
        p: [
          "Hannibal repère entre les deux camps un cours d'eau aux berges hautes, couvertes de broussailles. Il y cache de nuit Magon avec 1 000 fantassins et 1 000 cavaliers choisis parmi les meilleurs de l'armée.",
          "À l'aube, la cavalerie numide provoque les Romains, qui franchissent la Trébie glacée à jeun. Quand la bataille est engagée, Magon surgit sur les arrières des légions : l'armée de Sempronius s'effondre."
        ]
      },
      tactics: 'Les tactiques puniques',
      cannae: {
        k: 'Cannes · 2 août 216',
        t: 'Au centre du croissant',
        d: "À Cannes, Magon commande avec Hannibal le centre de la ligne — Gaulois et Ibères — qui recule volontairement sans se rompre, permettant à l'étau carthaginois de se refermer sur huit légions romaines : la plus lourde défaite de l'histoire de la République.",
        q: "« Magon, son frère, jeune, plein d'ardeur et formé dès l'enfance à l'art de la guerre. »",
        cite: "Polybe, Histoires, III, 71 — Hannibal le choisit pour l'embuscade de la Trébie"
      }
    },
    rings: {
      kicker: 'Carthage · hiver 216/215',
      title: "Les anneaux d'or de Cannes",
      p: [
        "Magon vient annoncer la victoire au Sénat de Carthage. Pour preuve, il fait répandre sur le seuil de la curie les anneaux d'or pris aux cadavres des chevaliers romains, insigne de l'élite de Rome.",
        "Le Sénat vote des renforts pour Hannibal — cavaliers numides, éléphants, argent — et charge Magon de lever de nouvelles troupes. Mais la défaite d'Hasdrubal à Dertosa change les plans : en 215, Magon et ses renforts partent pour l'Hispanie, non pour l'Italie."
      ],
      big: '3 ½',
      bigT: "boisseaux d'anneaux, selon certains auteurs ; Tite-Live juge plus probable « pas plus d'un boisseau » (XXIII, 12).",
      replyK: 'La réplique d\'Hannon',
      reply: "Hannon, chef du parti hostile aux Barcides, ironise : si Hannibal est vainqueur, pourquoi réclame-t-il des hommes et de l'argent ? (Tite-Live, XXIII, 13)"
    },
    spain: {
      title: 'Dix ans en Hispanie',
      aside: 'De 215 à 206, Magon combat pour garder la base barcide face aux Scipions.',
      kicker: '215 – 206',
      p: [
        "Maître de la logistique, Magon défend le cœur barcide en Ibérie. Il coordonne les approvisionnements, maintient les alliances tribales et contribue en 211, avec Hasdrubal Giscon et le jeune prince numide Massinissa, à la destruction de l'armée de Publius Scipion au haut Bétis.",
        "Mais le fils de Publius, le futur Scipion l'Africain, prend Carthagène en 209 et écrase en 206 à Ilipa l'armée de Magon et d'Hasdrubal Giscon — 70 000 fantassins, 4 000 cavaliers et 32 éléphants selon Polybe. L'Hispanie punique est perdue.",
        "Replié sur Gadès, Magon tente un coup de main sur Carthagène et échoue. À son retour, Gadès lui ferme ses portes ; il fait attirer au-dehors ses magistrats, les suffètes, et les fait crucifier."
      ],
      necroAlt: 'Nécropole punique de Puig des Molins à Ibiza',
      necroCap: "Nécropole punique de Puig des Molins, à Ibiza (Ebusus) : la cité punique ravitaille Magon en 206.",
      slingAlt: 'Frondeur baléare',
      slingCap: "Frondeur baléare : les tirs des Majorquins repoussent la flotte de Magon.",
      isles: {
        k: 'Hiver 206/205',
        t: 'Ebusus, Majorque, Minorque',
        p: [
          "Magon fait voile vers les Baléares. Ebusus (Ibiza), cité punique, l'accueille et le ravitaille. À Majorque, les frondeurs, les plus redoutés de Méditerranée, empêchent le débarquement.",
          "À Minorque, il débarque, recrute 2 000 auxiliaires qu'il envoie à Carthage et hiverne dans l'île. La tradition fait dériver de son nom celui du port de Mahón (Portus Magonis)."
        ]
      }
    },
    liguria: {
      kicker: '205 – 203 · le second front',
      title: "La Ligurie, puis la mer",
      p: [
        "Au printemps 205, Magon débarque sur la côte ligure avec 12 000 fantassins et 2 000 cavaliers, prend Gênes et s'allie aux peuples ligures et gaulois. Carthage lui envoie des renforts. Il s'agit de forcer Rome à diviser ses légions au moment où Scipion prépare l'invasion de l'Afrique, et de tendre la main à Hannibal, bloqué dans le Bruttium.",
        "En 203, il affronte en Insubrie le préteur Quinctilius Varus et le proconsul Cornelius Cethegus. Blessé à la cuisse, il se retire. Rappelé par un Sénat désespéré pour défendre Carthage menacée par Scipion, il s'embarque pour l'Afrique mais meurt de sa blessure en mer, au large de la Sardaigne, sans revoir sa terre natale.",
        "Cornélius Népos rapporte d'autres traditions qui le font mourir plus tard, naufragé ou tué par ses propres esclaves."
      ],
      chips: ['Gênes', 'Savone', 'Insubrie', 'Sardaigne'],
      coinAlt: 'Shekel barcide à l\'éléphant',
      coinCap: "Shekel barcide à l'éléphant. En 205, Carthage envoie à Magon 6 000 fantassins, 800 cavaliers et 7 éléphants (Tite-Live, XXIX, 4)."
    },
    corr: {
      label: 'Corrections historiques',
      title: 'Ce que Magon ne fut pas',
      items: [
        "Pas « le dernier des Barcides » : son frère aîné Hannibal lui survécut vingt ans, jusqu'en 183.",
        "L'« embuscade » associée à son nom n'est pas celle de Cannes, mais celle de la Trébie (218) ; à Cannes, il combattait au centre.",
        "Ses campagnes en Hispanie ne commencent pas en 210 : il y arrive dès 215 et y reste jusqu'en 206.",
        "Il ne faut pas le confondre avec Magon l'Agronome, auteur carthaginois d'un traité d'agriculture en 28 livres."
      ]
    },
    legacy: {
      kicker: 'Héritage',
      title: 'Le sacrifice absolu',
      p: [
        "Pour les Barca, Carthage n'était pas seulement une ville : c'était un devoir sacré. D'Hamilcar à Magon, chacun consacra sa vie à la survie de la patrie. Magon mourut en mer en revenant la défendre.",
        "Son nom reste attaché à Minorque, où le port de Mahón passe pour porter son nom, et à l'image des anneaux d'or de Cannes, symbole de l'élite romaine décimée."
      ],
      agro: "Magon l'Agronome, l'autre Magon"
    },
    sources: [
      { type: 'ancient', author: 'Polybe', work: 'Histoires', ref: 'III, 71', note: 'la Trébie, Cannes, Ilipa' },
      { type: 'ancient', author: 'Tite-Live', work: 'Histoire romaine', ref: 'XXIII, 12–13 ; XXIX, 4', note: 'les anneaux de Cannes, la réplique d’Hannon, renforts de 205' },
      { type: 'ancient', author: 'Cornelius Nepos', work: 'Vie d’Hannibal', note: 'autres traditions sur sa mort' },
      { type: 'modern', author: 'Yann Le Bohec', work: 'Histoire militaire des guerres puniques', ref: '2003', note: 'ouvrage de référence (bibliographie du site)' },
      { type: 'modern', author: 'Serge Lancel', work: 'Carthage', ref: '1992', note: 'ouvrage de référence (bibliographie du site)' }
    ],
    family: {
      title: 'La famille Barca',
      all: 'Tous les personnages',
      more: 'Lire la biographie',
      items: [
        { to: '/hamilcar', tone: 'tile--purple', k: 'Le père · ~275 – 229/228', t: 'Hamilcar Barca', d: "Invaincu en Sicile, vainqueur des Mercenaires, conquérant de l'Hispanie." },
        { to: '/hannibal', tone: 'tile--ink', k: 'Le frère aîné · 247 – 183', t: 'Hannibal Barca', d: 'Les Alpes, Trasimène, Cannes, puis Zama.' },
        { to: '/hasdrubal', tone: 'tile--navy', k: 'Le frère et le beau-frère', t: 'Les deux Hasdrubal', d: "Hasdrubal Barca, tué au Métaure, et Hasdrubal le Beau, fondateur de Carthagène." }
      ],
      links: [
        { to: '/tactiques', l: 'Les tactiques puniques' },
        { to: '/carte', l: 'La carte animée' }
      ]
    }
  },
  en: {
    metaTitle: 'Mago Barca (c. 243 – 203 BC) — the youngest of the Barcids',
    metaDesc: "Mago Barca, Hannibal's younger brother: the ambush at the Trebia, Cannae, the gold rings poured out before the Carthaginian Senate, ten years in Hispania, Minorca, Liguria and death at sea (203).",
    chip: 'Biography · The Barcids',
    dates: 'c. 243 – 203 BC',
    title: 'Mago Barca',
    epithet: 'The youngest Barca, the shadow strategist',
    lede: "Hamilcar's youngest son was on every front: the ambush at the Trebia, the centre at Cannae, ten years of war in Hispania, the Balearics, then a second front in Liguria. He died at sea in 203, recalled to defend Carthage.",
    heroAlt: 'The Battle of Cannae',
    heroCap: 'Cannae, 216 BC: Mago fights in the centre with Hannibal',
    stats: [
      { n: '2,000', t: 'men hidden in a stream bed for the ambush at the Trebia (218)' },
      { n: '8', t: 'Roman legions caught in the trap at Cannae (216)' },
      { n: 'c. 10 yrs', t: 'of war in Hispania (215 – 206)' },
      { n: '14,000', t: 'men landed in Liguria in 205: 12,000 infantry, 2,000 cavalry' }
    ],
    chrono: {
      kicker: 'Timeline',
      title: 'A life on campaign',
      rows: [
        { k: 'c. 243', t: 'Birth', d: "Third and youngest son of Hamilcar Barca, trained from childhood in the military camps of Hispania alongside his brothers." },
        { k: '218', t: 'The Alps', d: 'He follows Hannibal from Hispania to Italy.' },
        { k: '218', t: 'The Trebia', d: "In December he springs the ambush that takes Sempronius' legions in the rear." },
        { k: '217', t: 'The Arno marshes', d: 'With the Numidian cavalry he brings up the rear to stop the Gauls deserting during the march through the marshes.' },
        { k: '216', t: 'Cannae', d: 'He commands the centre with Hannibal (Polybius): the line that gives ground without breaking while the trap closes.' },
        { k: '216/215', t: 'Carthage', d: 'He reports the victory to the Senate and has the gold rings of the fallen Roman knights poured out at the door of the council house.' },
        { k: '215–206', t: 'Hispania', d: 'Sent to Hispania instead of Italy, he fights alongside his brother Hasdrubal and Hasdrubal Gisco; in 211 both Scipios are killed on the upper Baetis.' },
        { k: '206', t: 'Ilipa, Gades, Balearics', d: 'After the defeat at Ilipa he falls back on Gades, fails before Cartagena, then sails to the Balearics and winters on Minorca.' },
        { k: '205', t: 'Liguria', d: 'He lands at Genoa with 12,000 infantry and 2,000 cavalry and opens a second front in northern Italy.' },
        { k: '203', t: 'Wound and death', d: 'Defeated in Insubria and wounded in the thigh, he is recalled to Africa and dies of his wound at sea, off Sardinia.' }
      ]
    },
    italy: {
      title: 'At Hannibal’s side',
      aside: 'From 218 to 216, Mago is his brother’s closest lieutenant.',
      kicker: 'The Trebia · December 218',
      trebia: {
        t: 'The ambush in the stream',
        p: [
          'Between the two camps Hannibal spots a watercourse with high, overgrown banks. By night he hides Mago there with 1,000 infantry and 1,000 cavalry picked from the best in the army.',
          "At dawn the Numidian cavalry provokes the Romans, who wade the icy Trebia on empty stomachs. Once battle is joined, Mago bursts out onto the legions' rear: Sempronius' army collapses."
        ]
      },
      tactics: 'Punic tactics',
      cannae: {
        k: 'Cannae · 2 August 216',
        t: 'At the centre of the crescent',
        d: "At Cannae, Mago and Hannibal command the centre of the line — Gauls and Iberians — which deliberately gives ground without breaking, allowing the Carthaginian pincer to close on eight Roman legions: the heaviest defeat in the Republic's history.",
        q: '“Mago, his brother, young, full of ardour and trained in war from boyhood.”',
        cite: 'Polybius, Histories, III, 71 — Hannibal picks him for the Trebia ambush'
      }
    },
    rings: {
      kicker: 'Carthage · winter 216/215',
      title: 'The gold rings of Cannae',
      p: [
        'Mago comes to report the victory to the Carthaginian Senate. As proof he has the gold rings taken from the bodies of Roman knights — the badge of Rome’s elite — poured out at the door of the council house.',
        "The Senate votes reinforcements for Hannibal — Numidian cavalry, elephants, silver — and tasks Mago with raising new troops. But Hasdrubal's defeat at Dertosa changes the plan: in 215 Mago and his reinforcements sail for Hispania, not Italy."
      ],
      big: '3 ½',
      bigT: 'measures (modii) of rings according to some writers; Livy thinks “no more than one modius” more likely (XXIII, 12).',
      replyK: "Hanno's retort",
      reply: 'Hanno, leader of the faction hostile to the Barcids, mocks: if Hannibal is winning, why does he ask for men and money? (Livy, XXIII, 13)'
    },
    spain: {
      title: 'Ten years in Hispania',
      aside: 'From 215 to 206, Mago fights to hold the Barcid base against the Scipios.',
      kicker: '215 – 206',
      p: [
        "A master of logistics, Mago defends the Barcid heartland in Iberia. He coordinates supplies, keeps the tribal alliances together and in 211, with Hasdrubal Gisco and the young Numidian prince Masinissa, helps destroy Publius Scipio's army on the upper Baetis.",
        "But Publius' son, the future Scipio Africanus, takes Cartagena in 209 and in 206 at Ilipa crushes the army of Mago and Hasdrubal Gisco — 70,000 infantry, 4,000 cavalry and 32 elephants according to Polybius. Punic Hispania is lost.",
        'Falling back on Gades, Mago attempts a surprise attack on Cartagena and fails. On his return Gades shuts its gates to him; he lures its magistrates, the suffetes, outside and has them crucified.'
      ],
      necroAlt: 'Punic necropolis of Puig des Molins in Ibiza',
      necroCap: 'Punic necropolis of Puig des Molins, Ibiza (Ebusus): the Punic city resupplies Mago in 206.',
      slingAlt: 'Balearic slinger',
      slingCap: "Balearic slinger: the Majorcans' shot drives off Mago's fleet.",
      isles: {
        k: 'Winter 206/205',
        t: 'Ebusus, Majorca, Minorca',
        p: [
          'Mago sails for the Balearics. Ebusus (Ibiza), a Punic city, welcomes and resupplies him. On Majorca the slingers, the most feared in the Mediterranean, prevent a landing.',
          'On Minorca he lands, recruits 2,000 auxiliaries whom he sends to Carthage, and winters on the island. Tradition derives the name of the port of Mahón (Portus Magonis) from his.'
        ]
      }
    },
    liguria: {
      kicker: '205 – 203 · the second front',
      title: 'Liguria, then the sea',
      p: [
        "In spring 205 Mago lands on the Ligurian coast with 12,000 infantry and 2,000 cavalry, takes Genoa and allies with the Ligurian and Gallic peoples. Carthage sends him reinforcements. The aim is to force Rome to split its legions just as Scipio prepares to invade Africa, and to reach out to Hannibal, pinned down in Bruttium.",
        'In 203 he fights the praetor Quinctilius Varus and the proconsul Cornelius Cethegus in Insubria. Wounded in the thigh, he withdraws. Recalled by a desperate Senate to defend Carthage against Scipio, he sails for Africa but dies of his wound at sea, off Sardinia, without seeing his homeland again.',
        'Cornelius Nepos reports other traditions in which he died later, shipwrecked or killed by his own slaves.'
      ],
      chips: ['Genoa', 'Savona', 'Insubria', 'Sardinia'],
      coinAlt: 'Barcid shekel with an elephant',
      coinCap: 'Barcid shekel with an elephant. In 205 Carthage sends Mago 6,000 infantry, 800 cavalry and 7 elephants (Livy, XXIX, 4).'
    },
    corr: {
      label: 'Historical corrections',
      title: 'What Mago was not',
      items: [
        'Not “the last of the Barcids”: his elder brother Hannibal outlived him by twenty years, until 183.',
        'The “ambush” linked to his name is not at Cannae but at the Trebia (218); at Cannae he fought in the centre.',
        'His Hispanic campaigns do not begin in 210: he arrived there in 215 and stayed until 206.',
        'He should not be confused with Mago the Agronomist, the Carthaginian author of a 28-book treatise on agriculture.'
      ]
    },
    legacy: {
      kicker: 'Legacy',
      title: 'The ultimate sacrifice',
      p: [
        'For the Barcas, Carthage was not just a city: it was a sacred duty. From Hamilcar to Mago, each gave his life to the survival of the homeland. Mago died at sea on his way back to defend it.',
        'His name lives on in Minorca, where the port of Mahón is said to bear it, and in the image of the gold rings of Cannae, symbol of Rome’s decimated elite.'
      ],
      agro: 'Mago the Agronomist, the other Mago'
    },
    sources: [
      { type: 'ancient', author: 'Polybius', work: 'Histories', ref: 'III, 71', note: 'the Trebia, Cannae, Ilipa' },
      { type: 'ancient', author: 'Livy', work: 'History of Rome', ref: 'XXIII, 12–13; XXIX, 4', note: 'the rings of Cannae, Hanno’s retort, reinforcements of 205' },
      { type: 'ancient', author: 'Cornelius Nepos', work: 'Life of Hannibal', note: 'other traditions about his death' },
      { type: 'modern', author: 'Yann Le Bohec', work: 'Histoire militaire des guerres puniques', ref: '2003', note: 'reference work (site bibliography)' },
      { type: 'modern', author: 'Serge Lancel', work: 'Carthage', ref: '1992', note: 'reference work (site bibliography)' }
    ],
    family: {
      title: 'The Barca family',
      all: 'All people',
      more: 'Read the biography',
      items: [
        { to: '/hamilcar', tone: 'tile--purple', k: 'The father · c. 275 – 229/228', t: 'Hamilcar Barca', d: 'Undefeated in Sicily, victor over the mercenaries, conqueror of Hispania.' },
        { to: '/hannibal', tone: 'tile--ink', k: 'The elder brother · 247 – 183', t: 'Hannibal Barca', d: 'The Alps, Trasimene, Cannae, then Zama.' },
        { to: '/hasdrubal', tone: 'tile--navy', k: 'The brother and the brother-in-law', t: 'The two Hasdrubals', d: 'Hasdrubal Barca, killed at the Metaurus, and Hasdrubal the Fair, founder of Cartagena.' }
      ],
      links: [
        { to: '/tactiques', l: 'Punic tactics' },
        { to: '/carte', l: 'The animated map' }
      ]
    }
  },
  ar: {
    metaTitle: 'ماغون برقا (نحو 243 – 203 ق.م) — أصغر آل برقا',
    metaDesc: 'ماغون برقا، الأخ الأصغر لحنبعل: كمين تريبيا، كاناي، الخواتم الذهبية المسكوبة أمام مجلس قرطاج، عشر سنوات في هسبانيا، مينورقة، ليغوريا والموت في البحر (203).',
    chip: 'سيرة · آل برقا',
    dates: 'نحو 243 – 203 ق.م',
    title: 'ماغون برقا',
    epithet: 'أصغر آل برقا، استراتيجي الظل',
    lede: 'كان أصغر أبناء حملقار حاضرًا على كل الجبهات: كمين تريبيا، ووسط الصف في كاناي، وعشر سنوات من الحرب في هسبانيا، وجزر البليار، ثم جبهة ثانية في ليغوريا. ومات في البحر سنة 203 وهو عائد للدفاع عن قرطاج.',
    heroAlt: 'معركة كاناي',
    heroCap: 'كاناي، 216 ق.م: ماغون يقاتل في الوسط مع حنبعل',
    stats: [
      { n: '2000', t: 'رجل اختبؤوا في مجرى جدول لكمين تريبيا (218)' },
      { n: '8', t: 'فيالق رومانية وقعت في الفخ في كاناي (216)' },
      { n: 'نحو 10', t: 'سنوات من الحرب في هسبانيا (215 – 206)' },
      { n: '14٬000', t: 'رجل أُنزلوا في ليغوريا سنة 205: 12٬000 راجل و2000 فارس' }
    ],
    chrono: {
      kicker: 'التسلسل الزمني',
      title: 'حياة في الميدان',
      rows: [
        { k: 'نحو 243', t: 'المولد', d: 'الابن الثالث والأصغر لحملقار برقا، تدرّب منذ طفولته في معسكرات هسبانيا إلى جانب أخويه.' },
        { k: '218', t: 'الألب', d: 'رافق حنبعل من هسبانيا إلى إيطاليا.' },
        { k: '218', t: 'تريبيا', d: 'في ديسمبر نصب الكمين الذي باغت فيالق سمبرونيوس من الخلف.' },
        { k: '217', t: 'مستنقعات الأرنو', d: 'سار مع الفرسان النوميديين في المؤخرة ليمنع الغاليين من الفرار أثناء عبور المستنقعات.' },
        { k: '216', t: 'كاناي', d: 'قاد الوسط مع حنبعل (بوليبيوس): الصف الذي تراجع دون أن ينكسر بينما كانت الكماشة تنطبق.' },
        { k: '216/215', t: 'قرطاج', d: 'حمل بشرى النصر إلى مجلس الشيوخ، وسكب عند باب المجلس الخواتم الذهبية للفرسان الرومان القتلى.' },
        { k: '215–206', t: 'هسبانيا', d: 'أُرسل إلى هسبانيا بدل إيطاليا، فقاتل إلى جانب أخيه صدربعل وصدربعل بن جيسكون؛ وفي 211 قُتل الأخوان سكيبيو في أعالي البيتيس.' },
        { k: '206', t: 'إليبا، قادش، البليار', d: 'بعد هزيمة إليبا تراجع إلى قادش، وفشل أمام قرطاجنة، ثم أبحر إلى جزر البليار وقضى الشتاء في مينورقة.' },
        { k: '205', t: 'ليغوريا', d: 'نزل في جنوة بـ12٬000 راجل و2000 فارس، وفتح جبهة ثانية في شمال إيطاليا.' },
        { k: '203', t: 'الجرح والموت', d: 'هُزم في إنسوبريا وجُرح في فخذه، فاستُدعي إلى إفريقيا ومات متأثرًا بجرحه في البحر قبالة سردينيا.' }
      ]
    },
    italy: {
      title: 'إلى جانب حنبعل',
      aside: 'من 218 إلى 216 كان ماغون أقرب قادة أخيه إليه.',
      kicker: 'تريبيا · ديسمبر 218',
      trebia: {
        t: 'كمين الجدول',
        p: [
          'لاحظ حنبعل بين المعسكرين مجرى ماء عالي الضفاف تكسوه الأدغال، فأخفى فيه ليلًا ماغون مع ألف راجل وألف فارس من خيرة الجيش.',
          'وعند الفجر استفزّ الفرسان النوميديون الرومان فعبروا نهر تريبيا المتجمد على بطون خاوية. ولما احتدمت المعركة انقضّ ماغون على مؤخرة الفيالق: فانهار جيش سمبرونيوس.'
        ]
      },
      tactics: 'التكتيكات البونيقية',
      cannae: {
        k: 'كاناي · 2 أغسطس 216',
        t: 'في قلب الهلال',
        d: 'في كاناي قاد ماغون مع حنبعل وسط الصف — الغاليين والإيبيريين — الذي تراجع عمدًا دون أن ينكسر، فانطبقت الكماشة القرطاجية على ثمانية فيالق رومانية: أفدح هزيمة في تاريخ الجمهورية.',
        q: '«ماغون، أخوه، شاب متّقد الحماسة، تدرّب على فن الحرب منذ صباه.»',
        cite: 'بوليبيوس، التواريخ، 3، 71 — حنبعل يختاره لكمين تريبيا'
      }
    },
    rings: {
      kicker: 'قرطاج · شتاء 216/215',
      title: 'خواتم كاناي الذهبية',
      p: [
        'جاء ماغون يبشّر مجلس شيوخ قرطاج بالنصر. وبرهانًا على ذلك سكب عند باب المجلس الخواتم الذهبية المنتزعة من جثث الفرسان الرومان، شارة نخبة روما.',
        'صوّت المجلس على إمدادات لحنبعل — فرسانًا نوميديين وفيلة وفضة — وكلّف ماغون بتجنيد قوات جديدة. لكن هزيمة صدربعل في ديرتوسا غيّرت الخطط: ففي 215 أبحر ماغون وإمداداته إلى هسبانيا لا إلى إيطاليا.'
      ],
      big: '3 ½',
      bigT: 'مكاييل من الخواتم حسب بعض المؤلفين؛ ويرى تيتوس ليفيوس أن «مكيالًا واحدًا لا أكثر» أرجح (23، 12).',
      replyK: 'ردّ حنون',
      reply: 'سخر حنون، زعيم الحزب المعادي لآل برقا: إن كان حنبعل منتصرًا فلماذا يطلب الرجال والمال؟ (تيتوس ليفيوس، 23، 13)'
    },
    spain: {
      title: 'عشر سنوات في هسبانيا',
      aside: 'من 215 إلى 206 قاتل ماغون للحفاظ على القاعدة البرقية أمام آل سكيبيو.',
      kicker: '215 – 206',
      p: [
        'سيد اللوجستيات، دافع ماغون عن قلب البرقيين في إيبيريا. نسّق الإمدادات وحافظ على التحالفات القبلية، وأسهم سنة 211، مع صدربعل بن جيسكون والأمير النوميدي الشاب ماسينيسا، في إبادة جيش بوبليوس سكيبيو في أعالي البيتيس.',
        'لكن ابن بوبليوس، سكيبيو الإفريقي لاحقًا، استولى على قرطاجنة سنة 209، وسحق سنة 206 في إليبا جيش ماغون وصدربعل بن جيسكون — 70٬000 راجل و4000 فارس و32 فيلًا حسب بوليبيوس. وضاعت هسبانيا البونيقية.',
        'تراجع ماغون إلى قادش وحاول مباغتة قرطاجنة ففشل. ولما عاد أغلقت قادش أبوابها في وجهه، فاستدرج قضاتها، الشفطيم، إلى خارج الأسوار وصلبهم.'
      ],
      necroAlt: 'المقبرة البونيقية بويغ دي مولينس في إيبيزا',
      necroCap: 'المقبرة البونيقية بويغ دي مولينس في إيبيزا (إيبوسوس): المدينة البونيقية تموّن ماغون سنة 206.',
      slingAlt: 'مقلاعي بلياري',
      slingCap: 'مقلاعي بلياري: رماة ميورقة يصدّون أسطول ماغون.',
      isles: {
        k: 'شتاء 206/205',
        t: 'إيبوسوس، ميورقة، مينورقة',
        p: [
          'أبحر ماغون نحو جزر البليار. فاستقبلته إيبوسوس (إيبيزا)، المدينة البونيقية، وموّنته. أما في ميورقة فمنع رماة المقلاع، أرهب رماة البحر المتوسط، إنزاله.',
          'ونزل في مينورقة فجنّد ألفي مساعد أرسلهم إلى قرطاج وقضى الشتاء في الجزيرة. وتنسب الرواية اسم ميناء ماهون (بورتوس ماغونيس) إلى اسمه.'
        ]
      }
    },
    liguria: {
      kicker: '205 – 203 · الجبهة الثانية',
      title: 'ليغوريا، ثم البحر',
      p: [
        'في ربيع 205 نزل ماغون على الساحل الليغوري بـ12٬000 راجل و2000 فارس، فاستولى على جنوة وتحالف مع الشعوب الليغورية والغالية، وأرسلت إليه قرطاج الإمدادات. كان الهدف إجبار روما على تقسيم فيالقها في الوقت الذي يعدّ فيه سكيبيو لغزو إفريقيا، ومدّ اليد إلى حنبعل المحاصر في بروتيوم.',
        'وفي 203 واجه في إنسوبريا البريتور كوينكتيليوس فاروس والبروقنصل كورنيليوس سيثيغوس، فجُرح في فخذه وانسحب. واستدعاه مجلس شيوخ يائس للدفاع عن قرطاج التي يهددها سكيبيو، فأبحر نحو إفريقيا لكنه مات متأثرًا بجرحه في البحر قبالة سردينيا، دون أن يرى وطنه.',
        'ويورد كورنيليوس نيبوس روايات أخرى تجعله يموت لاحقًا، غريقًا أو مقتولًا على يد عبيده.'
      ],
      chips: ['جنوة', 'سافونا', 'إنسوبريا', 'سردينيا'],
      coinAlt: 'شيقل برقي عليه فيل',
      coinCap: 'شيقل برقي عليه فيل. في 205 أرسلت قرطاج إلى ماغون 6000 راجل و800 فارس و7 فيلة (تيتوس ليفيوس، 29، 4).'
    },
    corr: {
      label: 'تصحيحات تاريخية',
      title: 'ما لم يكنه ماغون',
      items: [
        'ليس «آخر آل برقا»: فقد عاش أخوه الأكبر حنبعل بعده عشرين عامًا، حتى 183.',
        '«الكمين» المرتبط باسمه ليس كمين كاناي بل كمين تريبيا (218)؛ أما في كاناي فكان يقاتل في الوسط.',
        'لم تبدأ حملاته في هسبانيا سنة 210: فقد وصلها منذ 215 وبقي فيها حتى 206.',
        'لا ينبغي الخلط بينه وبين ماغون المهندس الزراعي، المؤلف القرطاجي لموسوعة زراعية في 28 كتابًا.'
      ]
    },
    legacy: {
      kicker: 'الإرث',
      title: 'التضحية المطلقة',
      p: [
        'لم تكن قرطاج عند آل برقا مجرد مدينة: كانت واجبًا مقدسًا. ومن حملقار إلى ماغون كرّس كلٌّ منهم حياته لبقاء الوطن. ومات ماغون في البحر وهو عائد للدفاع عنه.',
        'ويبقى اسمه مرتبطًا بمينورقة، حيث يُقال إن ميناء ماهون يحمل اسمه، وبصورة خواتم كاناي الذهبية، رمز نخبة روما التي أُبيدت.'
      ],
      agro: 'ماغون المهندس الزراعي، الماغون الآخر'
    },
    sources: [
      { type: 'ancient', author: 'بوليبيوس', work: '«التواريخ»', ref: '3، 71', note: 'تريبيا وكاناي وإيليبا' },
      { type: 'ancient', author: 'تيتوس ليفيوس', work: '«تاريخ روما»', ref: '23، 12–13 ؛ 29، 4', note: 'خواتم كاناي ورد حنون وإمدادات 205' },
      { type: 'ancient', author: 'كورنيليوس نيبوس', work: '«حياة حنبعل»', note: 'روايات أخرى عن موته' },
      { type: 'modern', author: 'Yann Le Bohec', work: 'Histoire militaire des guerres puniques', ref: '2003', note: 'مرجع عام (قائمة مراجع الموقع)' },
      { type: 'modern', author: 'Serge Lancel', work: 'Carthage', ref: '1992', note: 'مرجع عام (قائمة مراجع الموقع)' }
    ],
    family: {
      title: 'أسرة برقا',
      all: 'كل الشخصيات',
      more: 'اقرأ السيرة',
      items: [
        { to: '/hamilcar', tone: 'tile--purple', k: 'الأب · نحو 275 – 229/228', t: 'حملقار برقا', d: 'لم يُهزم في صقلية، وانتصر على المرتزقة، وفتح هسبانيا.' },
        { to: '/hannibal', tone: 'tile--ink', k: 'الأخ الأكبر · 247 – 183', t: 'حنبعل برقا', d: 'الألب، ترازيمينو، كاناي، ثم زاما.' },
        { to: '/hasdrubal', tone: 'tile--navy', k: 'الأخ والصهر', t: 'الصدربعلان', d: 'صدربعل برقا الذي قُتل عند الميتاورو، وصدربعل الجميل مؤسس قرطاجنة.' }
      ],
      links: [
        { to: '/tactiques', l: 'التكتيكات البونيقية' },
        { to: '/carte', l: 'الخريطة المتحركة' }
      ]
    }
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
.hero-phoen { font-size: clamp(34px, 4vw, 56px); opacity: 0.35; }
.epithet { font: 600 clamp(16px, 1.4vw, 20px)/1.35 var(--font-body); margin-top: 14px; color: var(--white); }

.num.n-accent { color: var(--terra); }
.stat-t { font: 500 15px/1.45 var(--font-body); margin-top: 10px; }

.block-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.rows .val strong { color: var(--white); font-weight: 700; }
.tile--ink .rows .val { color: var(--on-dark-2); }
.tile--ink .rows .key { color: var(--gold-light); }

.para + .para { margin-top: 14px; }
.h-card + .para { margin-top: 4px; }
.in-btn { margin-top: 24px; }

.quote-inline { margin: 0; border-top: 1.5px solid rgba(22, 19, 15, 0.25); padding-top: 18px; }
.quote { margin: 0; }
.quote p { font: 500 clamp(17px, 1.5vw, 21px)/1.5 var(--font-display); font-style: italic; color: var(--ink) !important; }
.quote-inline cite { display: block; margin-top: 12px; font: 600 13px/1.4 var(--font-body); font-style: normal; color: var(--gold-ink); }

.rings {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: clamp(24px, 3vw, 48px);
}
.rings-side { display: flex; flex-direction: column; gap: 12px; }
.ring-num { font: 900 clamp(64px, 8vw, 120px)/0.9 var(--font-display); color: var(--gold-light); letter-spacing: -0.03em; }
.ring-reply { margin-top: auto; background: #2A251F; border-radius: var(--r-md); padding: 20px; }

.spain { padding-top: 0; }
.spain-fig { background: var(--stone); min-height: clamp(260px, 28vw, 380px); }

.coin-fig { background: #3E6DB0; min-height: clamp(300px, 34vw, 460px); }

.corr-list { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-top: 14px; }
.corr-list li { position: relative; padding-inline-start: 22px; }
.corr-list li::before { content: ''; position: absolute; inset-inline-start: 0; top: 0.55em; width: 10px; height: 10px; border-radius: 50%; background: var(--terra); }
.legacy-btn { align-self: flex-start; background: rgba(255, 255, 255, 0.14); color: var(--white); }
.legacy-btn:hover { background: var(--white); color: var(--ink); }

.fam { min-height: 220px; }
.more { font: 600 14px/1 var(--font-body); opacity: 0.85; }
.tile--purple .more, .tile--ink .more, .tile--navy .more { color: var(--gold-light); }
.links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: var(--gap); }

@media (max-width: 960px) {
  .rings { grid-template-columns: minmax(0, 1fr); }
}

@media (max-width: 640px) {
  .links .btn { flex: 1 1 100%; justify-content: center; }
  .legacy-btn { white-space: normal; }
}
</style>
