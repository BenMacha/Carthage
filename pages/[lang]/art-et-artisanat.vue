<template>
  <div class="pg">
    <!-- Héros -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--terra tile--stack tile--hero s-7">
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display hero-title">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
        <div class="chips">
          <span v-for="t in c.hero.tags" :key="t" class="chip chip--glass">{{ t }}</span>
        </div>
      </div>
      <figure class="fig fig--hero s-5 hero-fig" style="background:#000">
        <img src="/img/mask.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Cabinet de curiosités -->
    <section class="sec sec--wide cab-sec">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.cab.kicker }}</span>
          <h2 class="h-section">{{ c.cab.title }}</h2>
        </div>
        <p>{{ c.cab.intro }}</p>
      </div>
      <div class="pill-row" role="group" :aria-label="c.cab.filterLabel">
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
      <p class="sr-only" aria-live="polite">{{ c.cab.live(visible.length) }}</p>
    </section>

    <div class="cabinet">
      <article v-for="it in visible" :key="it.id" class="cab">
        <div class="cab-media" :class="it.tone" :style="it.bg ? { background: it.bg } : null">
          <img v-if="it.img" :src="it.img" :alt="it.alt" :style="it.pos ? { objectPosition: it.pos } : null" loading="lazy">
          <span v-else class="phoen cab-glyph" aria-hidden="true">{{ it.glyph }}</span>
          <span v-if="it.img && it.cap" class="cab-cap">{{ it.cap }}</span>
        </div>
        <div class="cab-body">
          <span class="kicker">{{ c.cats[it.cat] }}</span>
          <h3 class="h-card">{{ it.name }}</h3>
          <p class="cab-text">{{ it.text }}</p>
          <dl class="cab-facts">
            <div><dt>{{ c.facts.mat }}</dt><dd>{{ it.mat }}</dd></div>
            <div><dt>{{ c.facts.date }}</dt><dd>{{ it.date }}</dd></div>
            <div><dt>{{ c.facts.use }}</dt><dd>{{ it.use }}</dd></div>
            <div><dt>{{ c.facts.see }}</dt><dd>{{ it.see }}</dd></div>
          </dl>
        </div>
      </article>
    </div>

    <!-- Architecture -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.archi.kicker }}</span>
          <h2 class="h-section">{{ c.archi.title }}</h2>
        </div>
        <p>{{ c.archi.intro }}</p>
      </div>
    </section>
    <div class="bento archi">
      <figure class="fig s-7 kerk-fig" style="background:#8E3720">
        <img src="/img/kerkouane.jpg" :alt="c.archi.kerkAlt" loading="lazy">
        <figcaption>{{ c.archi.kerkCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--navy tile--stack s-5">
        <div>
          <span class="kicker">{{ c.archi.houses.kicker }}</span>
          <h3 class="h-block archi-h">{{ c.archi.houses.title }}</h3>
          <p class="body-lg">{{ c.archi.houses.p1 }}</p>
          <p class="body-lg p2">{{ c.archi.houses.p2 }}</p>
        </div>
        <div class="chips">
          <span v-for="t in c.archi.houses.tags" :key="t" class="chip chip--glass">{{ t }}</span>
        </div>
      </div>

      <div class="tile tile--paper tile--stack s-4">
        <div>
          <span class="kicker">{{ c.archi.byrsa.kicker }}</span>
          <h3 class="h-card">{{ c.archi.byrsa.title }}</h3>
          <p class="body">{{ c.archi.byrsa.p1 }}</p>
          <p class="body p2">{{ c.archi.byrsa.p2 }}</p>
        </div>
      </div>
      <figure class="fig s-4 small-fig" style="background:#5E574F">
        <img src="/img/punic-quarter.jpg" :alt="c.archi.byrsa.alt" loading="lazy">
        <figcaption>{{ c.archi.byrsa.caption }}</figcaption>
      </figure>
      <div class="tile tile--gold tile--stack s-4">
        <div>
          <span class="kicker">{{ c.archi.pav.kicker }}</span>
          <h3 class="h-card">{{ c.archi.pav.title }}</h3>
          <p class="body">{{ c.archi.pav.p1 }}</p>
          <p class="body p2">{{ c.archi.pav.p2 }}</p>
        </div>
        <svg class="pav-svg" viewBox="0 0 240 120" role="img" :aria-label="c.archi.pav.svgLabel">
          <defs>
            <pattern id="pav-dots" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="#8E3720" />
              <rect x="3" y="3" width="3" height="3" fill="#E6DED1" opacity="0.8" />
              <rect x="7" y="7" width="2" height="2" fill="#16130F" opacity="0.35" />
            </pattern>
          </defs>
          <rect width="240" height="120" rx="14" fill="url(#pav-dots)" />
          <g fill="#FFFFFF">
            <circle cx="120" cy="30" r="13" />
            <rect x="92" y="49" width="56" height="7" rx="3" />
            <polygon points="120,58 146,104 94,104" />
          </g>
        </svg>
      </div>

      <div class="tile tile--xl tile--outline s-12 influences">
        <div class="infl-head">
          <span class="kicker">{{ c.archi.infl.kicker }}</span>
          <h3 class="h-block archi-h">{{ c.archi.infl.title }}</h3>
        </div>
        <div class="rows" style="--row-key:200px">
          <div v-for="r in c.archi.infl.rows" :key="r.key">
            <span class="key">{{ r.key }}</span>
            <span class="val">{{ r.val }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Nécropoles -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig necro-fig" style="background:#5E574F">
          <img src="/img/puig-molins.jpg" :alt="c.necro.alt" loading="lazy">
          <figcaption>{{ c.necro.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--ink necro">
          <div>
            <span class="kicker">{{ c.necro.kicker }}</span>
            <h2 class="h-block necro-title">{{ c.necro.title }}</h2>
          </div>
          <div class="rows" style="--row-key:170px">
            <div v-for="r in c.necro.rows" :key="r.key">
              <span class="key necro-key">{{ r.key }}</span>
              <span class="val necro-val">{{ r.val }}</span>
            </div>
          </div>
          <blockquote class="necro-quote">
            <p>{{ c.necro.quote }}</p>
            <cite>{{ c.necro.cite }}</cite>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- Où voir l'art punique -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.mus.kicker }}</span>
          <h2 class="h-section">{{ c.mus.title }}</h2>
        </div>
        <p>{{ c.mus.intro }}</p>
      </div>
    </section>
    <div class="bento museums">
      <article v-for="m in museumCards" :key="m.id" class="card-img mus-card" :class="m.span">
        <img :src="m.img" :alt="m.alt" loading="lazy">
        <div class="card-body">
          <span class="kicker">{{ m.place }}</span>
          <h3 class="h-card">{{ m.name }}</h3>
          <p>{{ m.text }}</p>
        </div>
      </article>
      <div v-for="m in museumTiles" :key="m.id" class="tile tile--stack s-4 mus-tile" :class="m.tone">
        <span class="kicker">{{ m.place }}</span>
        <div>
          <h3 class="h-card">{{ m.name }}</h3>
          <p class="body">{{ m.text }}</p>
        </div>
      </div>
      <div class="tile tile--xl tile--sand s-12">
        <span class="kicker">{{ c.mus.elsewhere.kicker }}</span>
        <h3 class="h-block archi-h">{{ c.mus.elsewhere.title }}</h3>
        <div class="rows" style="--row-key:260px">
          <div v-for="r in c.mus.elsewhere.rows" :key="r.key">
            <span class="key mus-key">{{ r.key }}</span>
            <span class="val">{{ r.val }}</span>
          </div>
        </div>
      </div>
    </div>

    <PageSources :items="c.sources" />

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

const CATS = ['stone', 'clay', 'adorn', 'metal']

// Ordre : 12 tuiles = 3 lignes complètes de 4 à 1440 px
const ITEMS = [
  { id: 'stelae', cat: 'stone', img: '/img/tanit-stele.jpg', bg: '#5E574F' },
  { id: 'masks', cat: 'clay', img: '/img/punic-mask-louvre.jpg', bg: '#000000' },
  { id: 'jewels', cat: 'adorn', img: '/img/punic-gold-earrings.jpg', bg: '#B9AE9F' },
  { id: 'coins', cat: 'metal', img: '/img/quarter-shekel.jpg', bg: '#16130F' },
  { id: 'sarco', cat: 'stone', img: '/img/punic-sarcophagi-louvre.jpg', bg: '#C9B79C' },
  { id: 'figs', cat: 'clay', img: '/img/baal.jpg', bg: '#8E3720' },
  { id: 'glass', cat: 'adorn', img: '/img/punic-glass-pendants.jpg', bg: '#8C8C8E' },
  { id: 'razors', cat: 'metal', img: '/img/punic-razors.jpg', bg: '#D9D6D0' },
  { id: 'ceramics', cat: 'clay', img: '/img/punic-feeding-bottle.jpg', bg: '#6E6A62' },
  { id: 'amulets', cat: 'adorn', img: '/img/punic-amulets.jpg', bg: '#3E4A63' },
  { id: 'seals', cat: 'adorn', img: '/img/phoenician-scarab-ring.jpg', bg: '#6F6E76' },
  { id: 'ivory', cat: 'metal', img: '/img/punic-ivories.jpg', bg: '#2F3548' }
]

const MUSEUM_CARDS = [
  { id: 'carthage', img: '/img/dame.jpg', span: 's-6' },
  { id: 'bardo', img: '/img/lion-goddess.jpg', span: 's-6' }
]
const MUSEUM_TILES = [
  { id: 'kerkouane', tone: 'tile--terra' },
  { id: 'louvre', tone: 'tile--purple' },
  { id: 'bm', tone: 'tile--navy' }
]

const C = {
  fr: {
    meta: {
      title: 'Art et artisanat puniques — stèles, masques, bijoux, verre, monnaies',
      desc: "L'art de Carthage objet par objet : stèles, sarcophages, masques grimaçants, bijoux, pendentifs de verre, rasoirs, monnaies ; maisons de Kerkouane, mosaïques puniques, nécropoles, et les musées où les voir."
    },
    hero: {
      chip: 'Carthage · Art et artisanat',
      title: 'Art et artisanat puniques',
      lede: "Les Grecs raillaient les « bibelots » phéniciens. Les fouilles montrent autre chose : des ateliers spécialisés, qui mêlent modèles orientaux, égyptiens et grecs à des goûts africains.",
      tags: ['VIIIe – IIe s. av. J.-C.', 'Pierre · argile · verre · or'],
      alt: 'Masque punique grimaçant en terre cuite',
      caption: 'Masque grimaçant, terre cuite, musée national du Bardo'
    },
    cab: {
      kicker: 'Cabinet de curiosités',
      title: "L'atelier punique en douze objets",
      intro: "L'essentiel vient des nécropoles, fouillées depuis le XIXe siècle : le mobilier des tombes révèle un artisanat abondant et varié (Amadasi Guzzo).",
      filterLabel: "Filtrer les objets par matière",
      all: 'Tout',
      live: (n) => `${n} objet${n > 1 ? 's' : ''} affiché${n > 1 ? 's' : ''}`
    },
    cats: { stone: 'Pierre', clay: 'Terre cuite', adorn: 'Parure', metal: 'Métal, os, ivoire' },
    facts: { mat: 'Matière', date: 'Époque', use: 'Usage', see: 'Où le voir' },
    items: {
      stelae: {
        cap: "Musée du Louvre",
        name: 'Stèles et cippes',
        alt: 'Stèle punique gravée du signe de Tanit',
        text: "Taillées d'abord dans le grès, puis dans le calcaire, elles se couvrent de motifs d'influence grecque. Le « signe de Tanit » s'y répand à partir des Ve–IVe s. ; on le croyait propre à l'Occident, on le retrouve aujourd'hui au Levant.",
        mat: 'Grès, puis calcaire',
        date: 'VIIIe – IIe s. av. J.-C.',
        use: 'Votif (tophet) et funéraire',
        see: 'Carthage, Bardo, Louvre'
      },
      masks: {
        cap: "Carthage · Musée du Louvre",
        name: 'Masques grimaçants',
        alt: 'Masque punique grimaçant en terre cuite',
        text: "Rides creusées, bouche tordue, parfois motifs géométriques : ces masques d'origine sans doute levantine étaient suspendus pour éloigner les démons.",
        mat: 'Terre cuite',
        date: 'Fin VIIe – VIe s. av. J.-C.',
        use: 'Apotropaïque (protection)',
        see: 'Bardo, Louvre, Motyé'
      },
      jewels: {
        alt: "Boucles d'oreilles puniques en or, nécropole du Puig des Molins à Ibiza",
        cap: "Ibiza · Musée archéologique national, Madrid",
        name: 'Bijoux',
        text: "Colliers lourds et chargés, bagues, anneaux d'oreille et de nez (nezem), étuis porte-amulettes : un luxe hérité de l'Orient, dont se moquaient les auteurs classiques.",
        mat: 'Or, argent, pierres dures',
        date: 'Toute la période punique',
        use: 'Parure et protection',
        see: 'Carthage, Bardo'
      },
      coins: {
        name: 'Monnaies',
        alt: 'Quart de shekel carthaginois, tête de Tanit et cheval',
        text: "Longtemps, on échange par lingots ou troc. Les premières monnaies sont frappées en Sicile (Motyé, Palerme) pour payer les mercenaires ; Carthage n'ouvre ses ateliers qu'au milieu du IVe s. Types : tête féminine inspirée des monnaies syracusaines d'Évainète, cheval, palmier (Dridi).",
        mat: 'Or, électrum, argent, bronze',
        date: 'Vers 480/430 – 146 av. J.-C.',
        use: 'Solde, commerce, identité civique',
        see: 'British Museum, Carthage, Bardo'
      },
      sarco: {
        alt: "Sarcophages en marbre d'un homme et d'une femme, nécropole de Sainte-Monique à Carthage",
        cap: "Carthage, IVe–IIIe s. · Musée du Louvre",
        name: 'Sarcophages',
        text: "Le modèle anthropoïde phénicien évolue en Occident. Au IVe s., le couvercle porte la statue du défunt : le « prêtre » bénit de la main droite, la « prêtresse » tient une colombe ; tous deux portent un vase à encens.",
        mat: 'Marbre et calcaire sculptés',
        date: 'IVe – IIIe s. av. J.-C.',
        use: 'Funéraire (nécropole des Rabs)',
        see: 'Carthage, Louvre, Palerme'
      },
      figs: {
        cap: "Thinissut · Musée du Bardo",
        name: 'Protomés et figurines',
        alt: 'Baal Hammon trônant, terre cuite de Thinissut',
        text: "Bustes moulés de style égyptien, puis grec dès le VIe s., figurines au tambourin : la coroplathie s'étend de l'Afrique aux Baléares. Elle survit à la chute de Carthage, comme au sanctuaire de Thinissut (cap Bon).",
        mat: 'Terre cuite moulée',
        date: 'VIe s. av. – Ier s. apr. J.-C.',
        use: 'Religieux et funéraire',
        see: 'Bardo, Louvre, Ibiza'
      },
      glass: {
        alt: "Trois pendentifs-masques en pâte de verre : têtes barbues aux grands yeux cerclés",
        cap: "Carthage · expo « Carthago », Colisée 2019",
        name: 'Pendentifs-masques en verre',
        text: "Pline rapporte que les Phéniciens auraient inventé le verre ; ils l'ont surtout diffusé à grande échelle. Signature punique : de minuscules têtes humaines en pâte de verre colorée dans la masse, enfilées sur des colliers de perles.",
        mat: 'Pâte de verre',
        date: 'Surtout IVe – IIIe s. av. J.-C.',
        use: 'Amulette, parure ; flacons à parfum',
        see: 'Louvre, Bardo, Carthage'
      },
      razors: {
        alt: "Trois rasoirs votifs puniques en bronze, au manche en forme de cou d'oiseau",
        cap: "Carthage, Kerkouane · expo « Carthago », Rome",
        name: 'Rasoirs',
        text: "Fréquents dans les tombes après le VIIe s., ils sont liés à la purification du défunt et ont une valeur talismanique (Lancel). Dès le Ve s., on les grave de motifs égyptiens ou égéens, parfois sur les deux faces.",
        mat: 'Bronze, parfois fer',
        date: 'VIIe – IIe s. av. J.-C.',
        use: 'Rituel, talismanique',
        see: 'Madrid (Ibiza), Carthage'
      },
      ceramics: {
        alt: "Biberon punique en terre cuite peint de deux grands yeux",
        cap: "Carthage · Musée du Bardo",
        name: 'Céramiques et lampes',
        text: "Vaisselle de cuisine, lampes à huile aux formes standardisées, biberons, « moules à gâteaux » (Lancel), et même la maquette d'un four à pain de type tabouna trouvée dans une tombe.",
        mat: 'Argile',
        date: 'Toute la période ; imitations grecques dès le IIIe s.',
        use: 'Vie quotidienne, mobilier funéraire',
        see: 'Carthage, Bardo, Palerme'
      },
      amulets: {
        alt: "Collier d'amulettes égyptisantes et amulettes puniques, dont un signe de Tanit en bronze",
        cap: "Carthage, Tharros · expo « Carthago », Rome",
        name: 'Amulettes',
        text: "Surtout dans les tombes de femmes et d'enfants. Importées d'Égypte ou faites sur place, elles figurent Bès, Horus ou l'œil oudjat.",
        mat: 'Os, pâte de verre, pierre',
        date: 'Toute la période punique',
        use: 'Protection magique du défunt',
        see: 'Bardo, Carthage'
      },
      seals: {
        alt: "Scarabée en jaspe vert gravé d'un Héraclès, monté sur une bague pivotante en or",
        cap: "Gréco-phénicien, fin VIe s. · Walters Art Museum",
        name: 'Bagues-sceaux et scarabées',
        text: "Chatons en scarabée gravés en intaille, souvent importés d'ateliers égyptiens ou phéniciens. Après le milieu du IVe s., des gravures sur pâte de verre, plus modestes, pourraient signaler une production locale.",
        mat: 'Cornaline, agate, jaspe, onyx',
        date: 'Toute la période ; déclin après 350 av. J.-C.',
        use: 'Sceau, talisman',
        see: 'Musée national de Carthage'
      },
      ivory: {
        alt: "Manche de miroir en ivoire et plaquettes gravées en ivoire et en os",
        cap: "Carthage, Tharros · expo « Carthago », Rome",
        name: 'Ivoires et os gravés',
        text: "Petites plaques sculptées d'inspiration orientale ou égyptienne ; l'os remplace souvent l'ivoire, plus coûteux. De l'ivoire brut retrouvé sur les mêmes sites suggère des ateliers locaux.",
        mat: 'Ivoire, os',
        date: 'VIIIe – IVe s. av. J.-C.',
        use: 'Placage de meubles, coffrets',
        see: 'Musées de Méditerranée occidentale'
      }
    },
    archi: {
      kicker: 'Architecture',
      title: 'Maisons, sols et tombeaux',
      intro: "Peu de monuments puniques tiennent encore debout : l'essentiel se lit au ras du sol, à Kerkouane et sur les pentes de Byrsa.",
      kerkAlt: 'Maisons puniques de Kerkouane, cap Bon',
      kerkCap: 'Kerkouane, cap Bon (UNESCO)',
      houses: {
        kicker: 'Kerkouane',
        title: 'La ville en damier',
        p1: "Rues larges, îlots réguliers : Kerkouane, comme les quartiers « Magon » et « Hannibal » de Carthage, suit un plan orthogonal. Chaque maison s'ordonne autour d'une cour et possède sa citerne — l'eau est affaire privée.",
        p2: "On y a retrouvé de nombreuses baignoires-sabots. Certaines demeures sont plus riches, comme la maison à péristyle de la rue de l'Apotropaion. Pour M'hamed Hassine Fantar, c'est un modèle oriental adapté au substrat libyen.",
        tags: ['Fin IVe – début IIIe s. av. J.-C.', 'Citernes', 'Baignoires-sabots']
      },
      byrsa: {
        kicker: 'Carthage, quartier Hannibal',
        title: 'Des maisons à étages',
        p1: "Sur le flanc de Byrsa, une entrée étroite ouvre sur un long couloir menant à une cour munie d'un puisard. À l'avant, une pièce servait peut-être de boutique ; un escalier montait à l'étage.",
        p2: "Appien parle d'immeubles de six étages. L'archéologie confirme plusieurs niveaux, mais pas leur nombre.",
        alt: 'Vestiges du quartier punique de Byrsa, Carthage',
        caption: 'Quartier punique de Byrsa, IIe s. av. J.-C.'
      },
      pav: {
        kicker: 'Pavimentum punicum',
        title: 'Le signe de Tanit au sol',
        p1: "Des éclats de pierre et de marbre noyés dans un mortier rouge : ces sols, trouvés à Kerkouane et sur le flanc sud de Byrsa, portent parfois le signe de Tanit.",
        p2: "Datés du IIIe s. av. J.-C., ils obligent à nuancer l'idée d'une mosaïque née en Grèce.",
        svgLabel: 'Schéma : signe de Tanit (disque, barre, triangle) sur un sol de mortier rouge semé de tesselles'
      },
      infl: {
        kicker: 'Un art métissé',
        title: 'Égypte, Grèce, Afrique',
        rows: [
          { key: 'Égypte', val: "Pour les périodes anciennes : corniche à gorge, façades de temples miniatures avec disque solaire et uræus sur les stèles (Lancel)." },
          { key: 'Grèce', val: "Plus tard : colonnes de grès d'El Haouaria moulurées et stuquées, ordre ionique (naïskos de Thuburbo Majus, au Bardo) et dorique (Byrsa)." },
          { key: 'Afrique', val: "L'opus africanum — murs à chaînages de pierres dressées — apparaît à Kerkouane et survit à l'époque romaine, jusqu'au Capitole de Dougga." }
        ]
      }
    },
    necro: {
      kicker: 'Architecture funéraire',
      title: 'Les nécropoles',
      alt: 'Nécropole punique du Puig des Molins, Ibiza',
      caption: 'Nécropole du Puig des Molins, Ibiza',
      rows: [
        { key: 'Où', val: "En arc de cercle autour de la ville : leur tracé a permis de retrouver les limites de la Carthage punique (Picard)." },
        { key: 'Tombes', val: "Creusées dans la roche : puits simple, puits à chambres superposées, ou escalier descendant vers le puits." },
        { key: 'Rite', val: "L'inhumation domine ; l'incinération l'emporte à certaines périodes, comme l'a montré le Puig des Molins." },
        { key: 'Mobilier', val: "Poteries, bijoux, amulettes, ocre rouge (le sang, la vie), œufs d'autruche peints (la renaissance), meubles miniatures en argile." },
        { key: 'Décor', val: "Tombes peintes du djebel Mlezza (cap Bon) ; à Kerkouane, un sarcophage de bois exceptionnellement conservé." }
      ],
      quote: "« Pour ce peuple de marins, la Cité céleste était le dernier port où aborder. »",
      cite: 'François Decret, Carthage ou l’empire de la mer (1977)'
    },
    mus: {
      kicker: 'Musées',
      title: "Où voir l'art punique",
      intro: "Les grandes collections sont à Tunis et à Carthage ; d'autres sont dispersées de Londres à Madrid, au gré des fouilles et des achats du XIXe siècle.",
      items: {
        carthage: {
          place: 'Carthage, colline de Byrsa',
          name: 'Musée national de Carthage',
          alt: "« Dame de Carthage », mosaïque de l'Antiquité tardive",
          text: "Sarcophages du prêtre et de la prêtresse, bijoux, lampes, verrerie, maquette de four tabouna — à deux pas du quartier punique. (Image : la « Dame de Carthage », mosaïque bien postérieure, d'époque tardive.)"
        },
        bardo: {
          place: 'Tunis',
          name: 'Musée national du Bardo',
          alt: 'Déesse à tête de lion de Thinissut, terre cuite',
          text: "Département punique : stèles du tophet, masque grimaçant de la fin du VIe s., statuettes de Thinissut (Baal Hammon, déesse léontocéphale), amulettes et bijoux, naïskos de Thuburbo Majus."
        },
        kerkouane: {
          place: 'Cap Bon',
          name: 'Site et musée de Kerkouane',
          text: "La ville punique elle-même, et un petit musée qui en présente le mobilier : céramiques, parures, objets des nécropoles."
        },
        louvre: {
          place: 'Paris',
          name: 'Musée du Louvre',
          text: "Antiquités orientales : masque de Carthage (fin VIIe – début VIe s.), protomés égyptisantes, sarcophages des Rabs, tête barbue en pâte de verre, stèles au signe de Tanit."
        },
        bm: {
          place: 'Londres',
          name: 'British Museum',
          text: "L'inscription bilingue libyque-punique du mausolée de Dougga et une riche série de monnaies carthaginoises, dont les shekels barcides à l'éléphant."
        }
      },
      elsewhere: {
        kicker: 'Ailleurs en Méditerranée',
        title: 'Espagne, Sicile, Sardaigne',
        rows: [
          { key: 'Madrid', val: "Musée archéologique national : Dame de Galera, rasoirs de bronze du Puig des Molins." },
          { key: 'Ibiza', val: "Musée et nécropole du Puig des Molins : figurines, flacons à onguent, tombes à puits." },
          { key: 'Palerme', val: "Musée Antonino-Salinas : sarcophage anthropoïde du Ve s., lampes puniques." },
          { key: 'Motyé', val: "Musée Whitaker : masques grimaçants de l'île punique de Sicile." },
          { key: 'Cagliari', val: "Musée archéologique national : la stèle de Nora, l'une des plus anciennes inscriptions phéniciennes d'Occident." }
        ]
      }
    },
    sources: [
      { type: "ancient", author: "Pline l'Ancien", work: "Histoire naturelle", ref: "XXXVI, 190–191", note: "l'invention du verre" },
      { type: "ancient", author: "Appien", work: "Libyca (Le Livre africain)", note: "immeubles de six étages" },
      { type: "modern", author: "Maria Giulia Amadasi Guzzo", work: "Carthage", ref: "PUF (Que sais-je ?), 2007" },
      { type: "modern", author: "Hédi Dridi", work: "Carthage et le monde punique", ref: "Les Belles Lettres, 2006" },
      { type: "modern", author: "Serge Lancel", work: "Carthage", ref: "Fayard, 1992" },
      { type: "modern", author: "M'hamed Hassine Fantar", work: "Kerkouane", ref: "Alif, 2005" },
      { type: "modern", author: "Picard", note: "cité dans la page (nécropoles)" },
      { type: "modern", author: "François Decret", work: "Carthage ou l'empire de la mer", ref: "Seuil, 1977" },
      { type: "modern", author: "Wikipédia", work: "Carthage ; Civilisation carthaginoise", note: "CC BY-SA 4.0, contenus reformulés" }
    ],
    relatedTitle: 'À lire aussi',
    related: [
      { to: '/religion', kick: 'Religion', title: 'Les dieux de Carthage', text: 'Baal Hammon, Tanit, Melqart, Eshmoun et le débat du tophet.', cls: 'tile--purple' },
      { to: '/langue-ecriture', kick: 'Écriture', title: 'Langue et écriture puniques', text: "L'alphabet de 22 lettres, les inscriptions et la littérature perdue.", cls: '' },
      { to: '/lieux', kick: 'Voyage', title: 'Sur les traces de Carthage', text: 'Kerkouane, Byrsa, Ibiza, Carthagène : les sites à visiter.', cls: 'tile--navy' }
    ]
  },

  en: {
    meta: {
      title: 'Punic art and crafts — stelae, masks, jewellery, glass, coins',
      desc: "Carthaginian art object by object: stelae, sarcophagi, grimacing masks, jewellery, glass pendants, razors, coins; the houses of Kerkouane, Punic mosaics, necropolises, and the museums where to see them."
    },
    hero: {
      chip: 'Carthage · Art and crafts',
      title: 'Punic art and crafts',
      lede: 'The Greeks mocked Phoenician “trinkets”. Excavations tell another story: specialised workshops blending Eastern, Egyptian and Greek models with African tastes.',
      tags: ['8th – 2nd c. BC', 'Stone · clay · glass · gold'],
      alt: 'Punic grimacing terracotta mask',
      caption: 'Grimacing mask, terracotta, Bardo National Museum'
    },
    cab: {
      kicker: 'Cabinet of curiosities',
      title: 'The Punic workshop in twelve objects',
      intro: 'Most finds come from necropolises excavated since the 19th century: grave goods reveal abundant and varied craftsmanship (Amadasi Guzzo).',
      filterLabel: 'Filter objects by material',
      all: 'All',
      live: (n) => `${n} object${n > 1 ? 's' : ''} shown`
    },
    cats: { stone: 'Stone', clay: 'Terracotta', adorn: 'Adornment', metal: 'Metal, bone, ivory' },
    facts: { mat: 'Material', date: 'Period', use: 'Use', see: 'Where to see it' },
    items: {
      stelae: {
        cap: "Louvre Museum",
        name: 'Stelae and cippi',
        alt: 'Punic stele carved with the sign of Tanit',
        text: 'First cut in sandstone, then in limestone, they gain Greek-influenced motifs. The “sign of Tanit” spreads from the 5th–4th c.; once thought unique to the West, it is now also found in the Levant.',
        mat: 'Sandstone, then limestone',
        date: '8th – 2nd c. BC',
        use: 'Votive (tophet) and funerary',
        see: 'Carthage, Bardo, Louvre'
      },
      masks: {
        cap: "Carthage · Louvre Museum",
        name: 'Grimacing masks',
        alt: 'Punic grimacing terracotta mask',
        text: 'Deep wrinkles, twisted mouths, sometimes geometric patterns: these masks, probably of Levantine origin, were hung up to ward off demons.',
        mat: 'Terracotta',
        date: 'Late 7th – 6th c. BC',
        use: 'Apotropaic (protective)',
        see: 'Bardo, Louvre, Motya'
      },
      jewels: {
        alt: "Punic gold earrings from the Puig des Molins necropolis, Ibiza",
        cap: "Ibiza · National Archaeological Museum, Madrid",
        name: 'Jewellery',
        text: 'Heavy, crowded necklaces, rings, ear and nose rings (nezem), amulet cases: an Eastern luxury that classical authors liked to mock.',
        mat: 'Gold, silver, hardstones',
        date: 'Throughout the Punic period',
        use: 'Adornment and protection',
        see: 'Carthage, Bardo'
      },
      coins: {
        name: 'Coins',
        alt: 'Carthaginian quarter shekel, head of Tanit and horse',
        text: 'For a long time, trade used ingots or barter. The first coins were struck in Sicily (Motya, Palermo) to pay mercenaries; Carthage opened its own mints only in the mid-4th c. Types: a female head inspired by Euainetos’ Syracusan coins, a horse, a palm tree (Dridi).',
        mat: 'Gold, electrum, silver, bronze',
        date: 'c. 480/430 – 146 BC',
        use: 'Pay, trade, civic identity',
        see: 'British Museum, Carthage, Bardo'
      },
      sarco: {
        alt: "Marble sarcophagi of a man and a woman, Sainte-Monique necropolis, Carthage",
        cap: "Carthage, 4th–3rd c. · Louvre Museum",
        name: 'Sarcophagi',
        text: 'The Phoenician anthropoid model evolved in the West. In the 4th c., the lid bears a statue of the deceased: the “priest” blesses with his right hand, the “priestess” holds a dove; both carry an incense vessel.',
        mat: 'Carved marble and limestone',
        date: '4th – 3rd c. BC',
        use: 'Funerary (Rabs necropolis)',
        see: 'Carthage, Louvre, Palermo'
      },
      figs: {
        cap: "Thinissut · Bardo Museum",
        name: 'Protomes and figurines',
        alt: 'Enthroned Baal Hammon, terracotta from Thinissut',
        text: 'Moulded busts in Egyptian style, then Greek from the 6th c., figurines with tambourines: coroplastic art spread from Africa to the Balearics. It outlived Carthage’s fall, as at the sanctuary of Thinissut (Cap Bon).',
        mat: 'Moulded terracotta',
        date: '6th c. BC – 1st c. AD',
        use: 'Religious and funerary',
        see: 'Bardo, Louvre, Ibiza'
      },
      glass: {
        alt: "Three glass-paste mask pendants: bearded heads with large ringed eyes",
        cap: "Carthage · “Carthago” exhibition, Colosseum 2019",
        name: 'Glass mask pendants',
        text: 'Pliny reports that the Phoenicians invented glass; above all they traded it on a large scale. A Punic signature: tiny human heads in glass paste, coloured throughout, strung on bead necklaces.',
        mat: 'Glass paste',
        date: 'Mainly 4th – 3rd c. BC',
        use: 'Amulet, adornment; perfume flasks',
        see: 'Louvre, Bardo, Carthage'
      },
      razors: {
        alt: "Three Punic bronze votive razors with bird-neck handles",
        cap: "Carthage, Kerkouane · “Carthago” exhibition, Rome",
        name: 'Razors',
        text: 'Common in tombs after the 7th c., they are linked to the purification of the dead and had a talismanic value (Lancel). From the 5th c. they were engraved with Egyptian or Aegean motifs, sometimes on both sides.',
        mat: 'Bronze, sometimes iron',
        date: '7th – 2nd c. BC',
        use: 'Ritual, talismanic',
        see: 'Madrid (Ibiza), Carthage'
      },
      ceramics: {
        alt: "Punic terracotta feeding bottle painted with two large eyes",
        cap: "Carthage · Bardo Museum",
        name: 'Pottery and lamps',
        text: 'Kitchenware, oil lamps of standardised shapes, feeding bottles, “cake moulds” (Lancel), and even a model of a tabouna bread oven found in a tomb.',
        mat: 'Clay',
        date: 'Whole period; Greek imitations from the 3rd c.',
        use: 'Daily life, grave goods',
        see: 'Carthage, Bardo, Palermo'
      },
      amulets: {
        alt: "Necklace of Egyptianising amulets and Punic amulets, including a bronze sign of Tanit",
        cap: "Carthage, Tharros · “Carthago” exhibition, Rome",
        name: 'Amulets',
        text: 'Mostly in the graves of women and children. Imported from Egypt or made locally, they show Bes, Horus or the wedjat eye.',
        mat: 'Bone, glass paste, stone',
        date: 'Throughout the Punic period',
        use: 'Magical protection of the dead',
        see: 'Bardo, Carthage'
      },
      seals: {
        alt: "Green jasper scarab engraved with Heracles, set on a gold swivel ring",
        cap: "Greco-Phoenician, late 6th c. · Walters Art Museum",
        name: 'Seal rings and scarabs',
        text: 'Scarab bezels engraved in intaglio, often imported from Egyptian or Phoenician workshops. After the mid-4th c., humbler engravings on glass paste may point to local production.',
        mat: 'Carnelian, agate, jasper, onyx',
        date: 'Whole period; decline after 350 BC',
        use: 'Seal, talisman',
        see: 'National Museum of Carthage'
      },
      ivory: {
        alt: "Ivory mirror handle and carved ivory and bone plaques",
        cap: "Carthage, Tharros · “Carthago” exhibition, Rome",
        name: 'Carved ivory and bone',
        text: 'Small carved plaques of Eastern or Egyptian inspiration; bone often replaces costlier ivory. Raw ivory found on the same sites suggests local workshops.',
        mat: 'Ivory, bone',
        date: '8th – 4th c. BC',
        use: 'Furniture inlay, caskets',
        see: 'Western Mediterranean museums'
      }
    },
    archi: {
      kicker: 'Architecture',
      title: 'Houses, floors and tombs',
      intro: 'Few Punic buildings still stand: most of the story is read at ground level, at Kerkouane and on the slopes of Byrsa.',
      kerkAlt: 'Punic houses at Kerkouane, Cap Bon',
      kerkCap: 'Kerkouane, Cap Bon (UNESCO)',
      houses: {
        kicker: 'Kerkouane',
        title: 'A grid-plan town',
        p1: 'Wide streets, regular blocks: Kerkouane, like the “Mago” and “Hannibal” quarters of Carthage, follows an orthogonal plan. Each house is arranged around a courtyard and has its own cistern — water was a private matter.',
        p2: 'Many hip baths have been found there. Some houses are richer, such as the peristyle house on the Rue de l’Apotropaion. For M’hamed Hassine Fantar, this is an Eastern model adapted to a Libyan substrate.',
        tags: ['Late 4th – early 3rd c. BC', 'Cisterns', 'Hip baths']
      },
      byrsa: {
        kicker: 'Carthage, Hannibal quarter',
        title: 'Multi-storey houses',
        p1: 'On the slope of Byrsa, a narrow entrance opens onto a long corridor leading to a courtyard with a soakaway. At the front, a room may have served as a shop; a staircase led upstairs.',
        p2: 'Appian speaks of six-storey buildings. Archaeology confirms several levels, but not how many.',
        alt: 'Remains of the Punic quarter on Byrsa, Carthage',
        caption: 'Punic quarter on Byrsa, 2nd c. BC'
      },
      pav: {
        kicker: 'Pavimentum punicum',
        title: 'The sign of Tanit underfoot',
        p1: 'Chips of stone and marble set in red mortar: these floors, found at Kerkouane and on the south slope of Byrsa, sometimes bear the sign of Tanit.',
        p2: 'Dated to the 3rd c. BC, they call into question the idea that mosaic was born in Greece.',
        svgLabel: 'Diagram: sign of Tanit (disc, bar, triangle) on a red mortar floor studded with tesserae'
      },
      infl: {
        kicker: 'A blended art',
        title: 'Egypt, Greece, Africa',
        rows: [
          { key: 'Egypt', val: 'In the early periods: cavetto cornices, miniature temple façades with sun disc and uraeus on the stelae (Lancel).' },
          { key: 'Greece', val: 'Later: moulded, stuccoed sandstone columns from El Haouaria, the Ionic order (naiskos of Thuburbo Majus, at the Bardo) and the Doric (Byrsa).' },
          { key: 'Africa', val: 'Opus africanum — walls framed by upright stone chains — appears at Kerkouane and survives into Roman times, as at the Capitol of Dougga.' }
        ]
      }
    },
    necro: {
      kicker: 'Funerary architecture',
      title: 'The necropolises',
      alt: 'Punic necropolis of Puig des Molins, Ibiza',
      caption: 'Puig des Molins necropolis, Ibiza',
      rows: [
        { key: 'Where', val: 'In an arc around the city: their layout made it possible to trace the limits of Punic Carthage (Picard).' },
        { key: 'Tombs', val: 'Cut into the rock: a simple shaft, a shaft with stacked chambers, or a staircase leading down to the shaft.' },
        { key: 'Rite', val: 'Inhumation dominates; cremation prevails in some periods, as Puig des Molins has shown.' },
        { key: 'Grave goods', val: 'Pottery, jewellery, amulets, red ochre (blood, life), painted ostrich eggs (rebirth), miniature clay furniture.' },
        { key: 'Decoration', val: 'Painted tombs of Djebel Mlezza (Cap Bon); at Kerkouane, an exceptionally preserved wooden sarcophagus.' }
      ],
      quote: '“For this seafaring people, the heavenly City was the last port of call.”',
      cite: 'François Decret, Carthage ou l’empire de la mer (1977)'
    },
    mus: {
      kicker: 'Museums',
      title: 'Where to see Punic art',
      intro: 'The great collections are in Tunis and Carthage; others are scattered from London to Madrid, following 19th-century excavations and purchases.',
      items: {
        carthage: {
          place: 'Carthage, Byrsa hill',
          name: 'National Museum of Carthage',
          alt: '“Lady of Carthage”, late antique mosaic',
          text: 'Sarcophagi of the priest and priestess, jewellery, lamps, glassware, a model tabouna oven — next to the Punic quarter. (Image: the “Lady of Carthage”, a much later, late antique mosaic.)'
        },
        bardo: {
          place: 'Tunis',
          name: 'Bardo National Museum',
          alt: 'Lion-headed goddess from Thinissut, terracotta',
          text: 'Punic department: tophet stelae, a late 6th-c. grimacing mask, statuettes from Thinissut (Baal Hammon, lion-headed goddess), amulets and jewellery, the naiskos of Thuburbo Majus.'
        },
        kerkouane: {
          place: 'Cap Bon',
          name: 'Kerkouane site and museum',
          text: 'The Punic town itself, and a small museum displaying its finds: pottery, adornments, objects from the necropolises.'
        },
        louvre: {
          place: 'Paris',
          name: 'Louvre Museum',
          text: 'Near Eastern Antiquities: mask from Carthage (late 7th – early 6th c.), Egyptianising protomes, sarcophagi of the Rabs, bearded head in glass paste, stelae with the sign of Tanit.'
        },
        bm: {
          place: 'London',
          name: 'British Museum',
          text: 'The Libyco-Punic bilingual inscription from the mausoleum at Dougga, and a rich series of Carthaginian coins, including the Barcid elephant shekels.'
        }
      },
      elsewhere: {
        kicker: 'Elsewhere in the Mediterranean',
        title: 'Spain, Sicily, Sardinia',
        rows: [
          { key: 'Madrid', val: 'National Archaeological Museum: the Lady of Galera, bronze razors from Puig des Molins.' },
          { key: 'Ibiza', val: 'Puig des Molins museum and necropolis: figurines, unguent flasks, shaft tombs.' },
          { key: 'Palermo', val: 'Antonino Salinas Museum: 5th-c. anthropoid sarcophagus, Punic lamps.' },
          { key: 'Motya', val: 'Whitaker Museum: grimacing masks from the Punic island in Sicily.' },
          { key: 'Cagliari', val: 'National Archaeological Museum: the Nora Stone, one of the oldest Phoenician inscriptions in the West.' }
        ]
      }
    },
    sources: [
      { type: "ancient", author: "Pliny the Elder", work: "Natural History", ref: "XXXVI, 190–191", note: "the invention of glass" },
      { type: "ancient", author: "Appian", work: "Libyca (The African Book)", note: "six-storey buildings" },
      { type: "modern", author: "Maria Giulia Amadasi Guzzo", work: "Carthage", ref: "PUF (Que sais-je ?), 2007" },
      { type: "modern", author: "Hédi Dridi", work: "Carthage et le monde punique", ref: "Les Belles Lettres, 2006" },
      { type: "modern", author: "Serge Lancel", work: "Carthage", ref: "Fayard, 1992" },
      { type: "modern", author: "M'hamed Hassine Fantar", work: "Kerkouane", ref: "Alif, 2005" },
      { type: "modern", author: "Picard", note: "cited on this page (cemeteries)" },
      { type: "modern", author: "François Decret", work: "Carthage ou l'empire de la mer", ref: "Seuil, 1977" },
      { type: "modern", author: "Wikipedia (French)", work: "Carthage; Civilisation carthaginoise", note: "CC BY-SA 4.0, content rephrased" }
    ],
    relatedTitle: 'Read also',
    related: [
      { to: '/religion', kick: 'Religion', title: 'The gods of Carthage', text: 'Baal Hammon, Tanit, Melqart, Eshmun and the tophet debate.', cls: 'tile--purple' },
      { to: '/langue-ecriture', kick: 'Writing', title: 'Punic language and writing', text: 'The 22-letter alphabet, inscriptions and the lost literature.', cls: '' },
      { to: '/lieux', kick: 'Travel', title: 'In the footsteps of Carthage', text: 'Kerkouane, Byrsa, Ibiza, Cartagena: the sites to visit.', cls: 'tile--navy' }
    ]
  },

  ar: {
    meta: {
      title: 'الفن والحرف البونيقية — نُصُب وأقنعة وحُليّ وزجاج ونقود',
      desc: 'فن قرطاج قطعةً قطعة: النُّصُب والتوابيت والأقنعة المتجهّمة والحُليّ ودلايات الزجاج والأمواس والنقود؛ بيوت كركوان والفسيفساء البونيقية والمقابر، والمتاحف التي تعرضها.'
    },
    hero: {
      chip: 'قرطاج · الفن والحرف',
      title: 'الفن والحرف البونيقية',
      lede: 'سخر الإغريق من «خُرَد» الفينيقيين. لكن الحفريات تروي شيئًا آخر: ورشات متخصصة تمزج النماذج الشرقية والمصرية والإغريقية بذوق إفريقي.',
      tags: ['القرن الثامن – الثاني ق.م', 'حجر · طين · زجاج · ذهب'],
      alt: 'قناع بونيقي متجهّم من الطين المشوي',
      caption: 'قناع متجهّم، طين مشوي، المتحف الوطني بباردو'
    },
    cab: {
      kicker: 'خزانة العجائب',
      title: 'الورشة البونيقية في اثنتي عشرة قطعة',
      intro: 'جلّ ما وصلنا مصدره المقابر التي نُقّبت منذ القرن التاسع عشر: يكشف أثاث القبور عن حِرَف غزيرة ومتنوّعة (أماداسي غوتسو).',
      filterLabel: 'تصفية القطع حسب المادة',
      all: 'الكل',
      live: (n) => `عدد القطع المعروضة: ${n}`
    },
    cats: { stone: 'حجر', clay: 'طين مشوي', adorn: 'زينة', metal: 'معدن وعظم وعاج' },
    facts: { mat: 'المادة', date: 'الحقبة', use: 'الاستعمال', see: 'أين تُرى' },
    items: {
      stelae: {
        cap: "متحف اللوفر",
        name: 'النُّصُب والشواهد',
        alt: 'نُصُب بونيقي منقوش بعلامة تانيت',
        text: 'نُحتت أولًا في الحجر الرملي ثم في الكلس، وازدانت بزخارف ذات تأثير إغريقي. انتشرت «علامة تانيت» منذ القرنين الخامس والرابع؛ وكان يُظن أنها خاصة بالغرب، ثم عُثر عليها في المشرق أيضًا.',
        mat: 'حجر رملي ثم كلس',
        date: 'القرن الثامن – الثاني ق.م',
        use: 'نذري (التوفيت) وجنائزي',
        see: 'قرطاج، باردو، اللوفر'
      },
      masks: {
        cap: "قرطاج · متحف اللوفر",
        name: 'الأقنعة المتجهّمة',
        alt: 'قناع بونيقي متجهّم من الطين المشوي',
        text: 'تجاعيد عميقة وأفواه ملتوية وأحيانًا زخارف هندسية: كانت هذه الأقنعة، المشرقية الأصل على الأرجح، تُعلَّق لطرد الشياطين.',
        mat: 'طين مشوي',
        date: 'أواخر القرن السابع – السادس ق.م',
        use: 'وقائي (درء الشر)',
        see: 'باردو، اللوفر، موتيا'
      },
      jewels: {
        alt: "أقراط بونيقية من الذهب من مقبرة بويغ دي مولينس في إيبيزا",
        cap: "إيبيزا · المتحف الأثري الوطني، مدريد",
        name: 'الحُليّ',
        text: 'قلائد ثقيلة مكتظة، وخواتم، وأقراط للأذن والأنف (نِزَم)، وعلب للتمائم: ترف موروث عن المشرق كان الكتّاب الكلاسيكيون يسخرون منه.',
        mat: 'ذهب وفضة وأحجار صلبة',
        date: 'طوال الحقبة البونيقية',
        use: 'زينة وحماية',
        see: 'قرطاج، باردو'
      },
      coins: {
        name: 'النقود',
        alt: 'ربع شيقل قرطاجي، رأس تانيت وحصان',
        text: 'ظلّ التبادل طويلًا بالسبائك أو المقايضة. ضُربت أولى النقود في صقلية (موتيا وباليرمو) لدفع أجور المرتزقة، ولم تفتح قرطاج دور سكّها إلا في منتصف القرن الرابع. من رموزها: رأس أنثوي مستوحى من نقود سرقوسة لإيواينيتوس، والحصان، والنخلة (دريدي).',
        mat: 'ذهب وإلكتروم وفضة وبرونز',
        date: 'نحو 480/430 – 146 ق.م',
        use: 'أجور وتجارة وهوية مدنية',
        see: 'المتحف البريطاني، قرطاج، باردو'
      },
      sarco: {
        alt: "تابوتان من الرخام لرجل وامرأة، مقبرة سانت مونيك في قرطاج",
        cap: "قرطاج، القرنان 4–3 ق.م · متحف اللوفر",
        name: 'التوابيت',
        text: 'تطوّر النموذج الفينيقي ذو الهيئة البشرية في الغرب. في القرن الرابع صار الغطاء يحمل تمثال المتوفى: «الكاهن» يبارك بيده اليمنى، و«الكاهنة» تمسك حمامة، وكلاهما يحمل مبخرة.',
        mat: 'رخام وكلس منحوتان',
        date: 'القرن الرابع – الثالث ق.م',
        use: 'جنائزي (مقبرة الرابّيم)',
        see: 'قرطاج، اللوفر، باليرمو'
      },
      figs: {
        cap: "ثينيسوت · متحف باردو",
        name: 'التماثيل النصفية والدمى',
        alt: 'بعل حمون على عرشه، طين مشوي من تينيسوت',
        text: 'تماثيل نصفية مصبوبة على الطراز المصري ثم الإغريقي منذ القرن السادس، ودمى تحمل الدفوف: امتدّ فن الطين من إفريقيا إلى جزر البليار، وعاش بعد سقوط قرطاج كما في معبد تينيسوت (الوطن القبلي).',
        mat: 'طين مشوي مصبوب',
        date: 'القرن السادس ق.م – الأول م',
        use: 'ديني وجنائزي',
        see: 'باردو، اللوفر، إيبيزا'
      },
      glass: {
        alt: "ثلاث دلايات-أقنعة من عجينة الزجاج: رؤوس ملتحية بعيون واسعة مطوّقة",
        cap: "قرطاج · معرض «قرطاجة»، الكولوسيوم 2019",
        name: 'دلايات الأقنعة الزجاجية',
        text: 'يروي بلينيوس أن الفينيقيين اخترعوا الزجاج؛ والأرجح أنهم نشروه على نطاق واسع. من بصماتهم البونيقية: رؤوس بشرية دقيقة من عجينة الزجاج الملوّنة في كتلتها، تُنظم في قلائد من الخرز.',
        mat: 'عجينة زجاج',
        date: 'غالبًا القرن الرابع – الثالث ق.م',
        use: 'تميمة وزينة؛ قوارير عطر',
        see: 'اللوفر، باردو، قرطاج'
      },
      razors: {
        alt: "ثلاثة أمواس نذرية بونيقية من البرونز، مقابضها على هيئة عنق طائر",
        cap: "قرطاج، كركوان · معرض «قرطاجة»، روما",
        name: 'الأمواس',
        text: 'كثيرة في القبور بعد القرن السابع، ترتبط بتطهير الميت ولها قيمة طِلَّسمية (لانسيل). منذ القرن الخامس نُقشت بزخارف مصرية أو إيجية، أحيانًا على الوجهين.',
        mat: 'برونز، وأحيانًا حديد',
        date: 'القرن السابع – الثاني ق.م',
        use: 'طقسي وطِلَّسمي',
        see: 'مدريد (إيبيزا)، قرطاج'
      },
      ceramics: {
        alt: "رضّاعة بونيقية من الطين المشوي مزيّنة بعينين كبيرتين",
        cap: "قرطاج · متحف باردو",
        name: 'الخزف والمصابيح',
        text: 'أوانٍ للطبخ، ومصابيح زيت بأشكال موحّدة، ورضّاعات، و«قوالب حلوى» (لانسيل)، بل ونموذج مصغّر لفرن خبز من نوع الطابونة عُثر عليه في قبر.',
        mat: 'طين',
        date: 'طوال الحقبة؛ تقليد للإغريقي منذ القرن الثالث',
        use: 'الحياة اليومية وأثاث القبور',
        see: 'قرطاج، باردو، باليرمو'
      },
      amulets: {
        alt: "قلادة من تمائم ذات طابع مصري وتمائم بونيقية، منها علامة تانيت من البرونز",
        cap: "قرطاج، ثاروس · معرض «قرطاجة»، روما",
        name: 'التمائم',
        text: 'أكثرها في قبور النساء والأطفال. مستوردة من مصر أو مصنوعة محليًا، تمثّل بِس أو حورس أو عين الوجات.',
        mat: 'عظم وعجينة زجاج وحجر',
        date: 'طوال الحقبة البونيقية',
        use: 'حماية سحرية للميت',
        see: 'باردو، قرطاج'
      },
      seals: {
        alt: "جُعَل من اليشب الأخضر نُقش عليه هرقل، مركّب على خاتم ذهبي دوّار",
        cap: "فينيقي-إغريقي، أواخر القرن 6 ق.م · متحف والترز للفنون",
        name: 'خواتم الأختام والجعارين',
        text: 'فصوص على هيئة جُعَل محفورة غائرًا، مستوردة غالبًا من ورشات مصرية أو فينيقية. بعد منتصف القرن الرابع قد تدلّ نقوش أبسط على عجينة الزجاج على إنتاج محلي.',
        mat: 'عقيق وجزع ويشب',
        date: 'طوال الحقبة؛ تراجع بعد 350 ق.م',
        use: 'ختم وطِلَّسم',
        see: 'المتحف الوطني بقرطاج'
      },
      ivory: {
        alt: "مقبض مرآة من العاج ولويحات منقوشة من العاج والعظم",
        cap: "قرطاج، ثاروس · معرض «قرطاجة»، روما",
        name: 'العاج والعظم المنقوشان',
        text: 'ألواح صغيرة منحوتة بإلهام شرقي أو مصري؛ وكثيرًا ما حلّ العظم محلّ العاج الأغلى. ويدلّ العاج الخام المعثور عليه في المواقع نفسها على ورشات محلية.',
        mat: 'عاج وعظم',
        date: 'القرن الثامن – الرابع ق.م',
        use: 'تطعيم الأثاث والصناديق',
        see: 'متاحف غرب المتوسط'
      }
    },
    archi: {
      kicker: 'العمارة',
      title: 'بيوت وأرضيات وأضرحة',
      intro: 'قليلة هي المباني البونيقية التي لا تزال قائمة: تُقرأ معظم القصة على مستوى الأرض، في كركوان وعلى سفوح بيرصا.',
      kerkAlt: 'بيوت بونيقية في كركوان، الوطن القبلي',
      kerkCap: 'كركوان، الوطن القبلي (اليونسكو)',
      houses: {
        kicker: 'كركوان',
        title: 'مدينة على شكل رقعة شطرنج',
        p1: 'شوارع عريضة وأحياء منتظمة: تتبع كركوان، مثل حيَّي «ماغون» و«حنبعل» في قرطاج، مخططًا متعامدًا. يتوزّع كل بيت حول فناء وله صهريجه الخاص — فالماء شأن خاص.',
        p2: 'عُثر فيها على أحواض استحمام كثيرة على هيئة المقعد. وبعض البيوت أغنى، مثل البيت ذي الأروقة في شارع الأبوتروبايون. يرى محمد حسين فنطر فيها نموذجًا مشرقيًا تكيّف مع الأساس الليبي.',
        tags: ['أواخر القرن الرابع – مطلع الثالث ق.م', 'صهاريج', 'أحواض استحمام']
      },
      byrsa: {
        kicker: 'قرطاج، حي حنبعل',
        title: 'بيوت بطوابق',
        p1: 'على سفح بيرصا، يفضي مدخل ضيّق إلى ممرّ طويل ينتهي بفناء فيه بئر لتصريف المياه. وفي المقدّمة غرفة ربما كانت دكّانًا، ودرج يصعد إلى الطابق العلوي.',
        p2: 'يتحدث أبيانوس عن مبانٍ من ستة طوابق. يؤكد علم الآثار وجود عدة طوابق، دون أن يحسم عددها.',
        alt: 'بقايا الحي البونيقي في بيرصا، قرطاج',
        caption: 'الحي البونيقي في بيرصا، القرن الثاني ق.م'
      },
      pav: {
        kicker: 'الرصيف البونيقي',
        title: 'علامة تانيت على الأرض',
        p1: 'شظايا من الحجر والرخام مغروسة في ملاط أحمر: هذه الأرضيات، التي عُثر عليها في كركوان وعلى السفح الجنوبي لبيرصا، تحمل أحيانًا علامة تانيت.',
        p2: 'يعود تاريخها إلى القرن الثالث ق.م، وتدعو إلى مراجعة فكرة أن الفسيفساء وُلدت في بلاد الإغريق.',
        svgLabel: 'رسم: علامة تانيت (قرص وقضيب ومثلث) على أرضية من ملاط أحمر مرصّعة بالفصوص'
      },
      infl: {
        kicker: 'فن مُهجَّن',
        title: 'مصر، الإغريق، إفريقيا',
        rows: [
          { key: 'مصر', val: 'في الحقب الأقدم: الأفاريز المقعّرة، وواجهات معابد مصغّرة بقرص الشمس والصلّ على النُّصُب (لانسيل).' },
          { key: 'الإغريق', val: 'لاحقًا: أعمدة من حجر الهوارية الرملي مزخرفة ومجصّصة، والطراز الأيوني (ناووس ثوبوربو ماجوس في باردو) والدوري (بيرصا).' },
          { key: 'إفريقيا', val: 'البناء الإفريقي (أوبوس أفريكانوم) — جدران بسلاسل من حجارة قائمة — يظهر في كركوان ويستمر في العهد الروماني حتى كابيتول دقة.' }
        ]
      }
    },
    necro: {
      kicker: 'العمارة الجنائزية',
      title: 'المقابر',
      alt: 'المقبرة البونيقية في بويغ دي مولينس، إيبيزا',
      caption: 'مقبرة بويغ دي مولينس، إيبيزا',
      rows: [
        { key: 'الموقع', val: 'على شكل قوس حول المدينة: سمح امتدادها بتحديد حدود قرطاج البونيقية (بيكار).' },
        { key: 'القبور', val: 'محفورة في الصخر: بئر بسيطة، أو بئر بغرف متراكبة، أو درج ينزل إلى البئر.' },
        { key: 'الطقس', val: 'يغلب الدفن، ويتقدّم الحرق في بعض الفترات كما بيّنت مقبرة بويغ دي مولينس.' },
        { key: 'الأثاث', val: 'فخار وحُليّ وتمائم، ومغرة حمراء (الدم والحياة)، وبيض نعام ملوّن (الانبعاث)، وأثاث مصغّر من الطين.' },
        { key: 'الزخرفة', val: 'قبور جبل الملزّة المرسومة (الوطن القبلي)؛ وفي كركوان تابوت خشبي محفوظ على نحو استثنائي.' }
      ],
      quote: '«كانت المدينة السماوية، لدى هذا الشعب من البحّارة، آخر ميناء يرسو فيه.»',
      cite: 'فرانسوا ديكري، قرطاج أو إمبراطورية البحر (1977)'
    },
    mus: {
      kicker: 'المتاحف',
      title: 'أين تُرى الفنون البونيقية',
      intro: 'المجموعات الكبرى في تونس وقرطاج؛ وأخرى موزّعة من لندن إلى مدريد، تبعًا لحفريات القرن التاسع عشر ومقتنياته.',
      items: {
        carthage: {
          place: 'قرطاج، هضبة بيرصا',
          name: 'المتحف الوطني بقرطاج',
          alt: '«سيدة قرطاج»، فسيفساء من العصور القديمة المتأخرة',
          text: 'تابوتا الكاهن والكاهنة، وحُليّ ومصابيح وزجاجيات، ونموذج فرن طابونة — على بعد خطوات من الحي البونيقي. (الصورة: «سيدة قرطاج»، فسيفساء متأخرة كثيرًا عن العهد البونيقي.)'
        },
        bardo: {
          place: 'تونس',
          name: 'المتحف الوطني بباردو',
          alt: 'إلهة برأس أسد من تينيسوت، طين مشوي',
          text: 'القسم البونيقي: نُصُب التوفيت، وقناع متجهّم من أواخر القرن السادس، وتماثيل تينيسوت (بعل حمون والإلهة ذات رأس الأسد)، وتمائم وحُليّ، وناووس ثوبوربو ماجوس.'
        },
        kerkouane: {
          place: 'الوطن القبلي',
          name: 'موقع كركوان ومتحفها',
          text: 'المدينة البونيقية نفسها، ومتحف صغير يعرض ما عُثر عليه فيها: خزف وحُليّ وقطع من المقابر.'
        },
        louvre: {
          place: 'باريس',
          name: 'متحف اللوفر',
          text: 'الآثار الشرقية: قناع من قرطاج (أواخر القرن السابع – مطلع السادس)، وتماثيل نصفية بطابع مصري، وتوابيت الرابّيم، ورأس ملتحٍ من عجينة الزجاج، ونُصُب بعلامة تانيت.'
        },
        bm: {
          place: 'لندن',
          name: 'المتحف البريطاني',
          text: 'النقيشة الثنائية الليبية-البونيقية من ضريح دقة، وسلسلة غنية من النقود القرطاجية، منها شواقل البرقيين ذات الفيل.'
        }
      },
      elsewhere: {
        kicker: 'في أنحاء المتوسط',
        title: 'إسبانيا، صقلية، سردينيا',
        rows: [
          { key: 'مدريد', val: 'المتحف الأثري الوطني: سيدة غاليرا، وأمواس برونزية من بويغ دي مولينس.' },
          { key: 'إيبيزا', val: 'متحف بويغ دي مولينس ومقبرتها: دمى وقوارير مراهم وقبور آبار.' },
          { key: 'باليرمو', val: 'متحف أنطونينو سالينَس: تابوت بهيئة بشرية من القرن الخامس، ومصابيح بونيقية.' },
          { key: 'موتيا', val: 'متحف ويتاكر: أقنعة متجهّمة من الجزيرة البونيقية في صقلية.' },
          { key: 'كالياري', val: 'المتحف الأثري الوطني: نُصُب نورا، من أقدم النقوش الفينيقية في الغرب.' }
        ]
      }
    },
    sources: [
      { type: "ancient", author: "بلينيوس الأكبر", work: "التاريخ الطبيعي", ref: "36، 190–191", note: "اختراع الزجاج" },
      { type: "ancient", author: "أبيانوس", work: "ليبيكا (الكتاب الإفريقي)", note: "مبانٍ من ستة طوابق" },
      { type: "modern", author: "ماريا جوليا أماداسي غوتسو", work: "Carthage", ref: "PUF (Que sais-je ?), 2007" },
      { type: "modern", author: "هادي دريدي", work: "Carthage et le monde punique", ref: "Les Belles Lettres, 2006" },
      { type: "modern", author: "سيرج لانسيل", work: "Carthage", ref: "Fayard, 1992" },
      { type: "modern", author: "محمد حسين فنطر", work: "Kerkouane", ref: "Alif, 2005" },
      { type: "modern", author: "بيكار", note: "مذكور في هذه الصفحة (المقابر)" },
      { type: "modern", author: "فرانسوا ديكري", work: "Carthage ou l'empire de la mer", ref: "Seuil, 1977" },
      { type: "modern", author: "ويكيبيديا (بالفرنسية)", work: "Carthage ; Civilisation carthaginoise", note: "CC BY-SA 4.0، محتوى أعيدت صياغته" }
    ],
    relatedTitle: 'اقرأ أيضًا',
    related: [
      { to: '/religion', kick: 'الديانة', title: 'آلهة قرطاج', text: 'بعل حمون وتانيت وملقرت وأشمون، وجدل التوفيت.', cls: 'tile--purple' },
      { to: '/langue-ecriture', kick: 'الكتابة', title: 'اللغة والكتابة البونيقية', text: 'الأبجدية ذات الاثنين والعشرين حرفًا، والنقوش، والأدب الضائع.', cls: '' },
      { to: '/lieux', kick: 'رحلة', title: 'على خطى قرطاج', text: 'كركوان، بيرصا، إيبيزا، قرطاجنة: مواقع تستحق الزيارة.', cls: 'tile--navy' }
    ]
  }
}

const c = computed(() => C[locale.value] || C.fr)

const items = computed(() => ITEMS.map(it => ({ ...it, ...c.value.items[it.id] })))

const filters = computed(() => [
  { key: 'all', label: c.value.cab.all },
  ...CATS.map(k => ({ key: k, label: `${c.value.cats[k]} · ${ITEMS.filter(i => i.cat === k).length}` }))
])

const visible = computed(() => filter.value === 'all' ? items.value : items.value.filter(i => i.cat === filter.value))

const museumCards = computed(() => MUSEUM_CARDS.map(m => ({ ...m, ...c.value.mus.items[m.id] })))
const museumTiles = computed(() => MUSEUM_TILES.map(m => ({ ...m, ...c.value.mus.items[m.id] })))

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-title { font-size: clamp(44px, 5.8vw, 84px); }
.hero-fig > img { object-fit: contain; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.cab-sec { position: relative; padding-bottom: 16px; }

/* Cabinet */
.cabinet {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: var(--gap);
  padding: 0 var(--gutter);
}

.cab {
  background: var(--white);
  border-radius: var(--r-lg);
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.cab-media {
  position: relative;
  height: 210px;
  border-radius: calc(var(--r-lg) - 8px);
  overflow: hidden;
  background: var(--sand-deep);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cab-media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cab-glyph { font-size: 96px; opacity: 0.9; }
.cab-cap {
  position: absolute;
  inset-inline-start: 8px;
  bottom: 8px;
  max-width: calc(100% - 16px);
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(22, 19, 15, 0.68);
  color: #FFFFFF;
  font: 500 11px/1.35 var(--font-body);
}
.tone-gold { background: var(--gold); color: var(--gold-ink); }
.tone-sand { background: var(--sand); color: var(--purple); }
.tone-navy { background: var(--navy); color: var(--navy-tint); }
.tone-olive { background: var(--olive); color: var(--olive-soft); }
.tone-terra { background: var(--terra); color: var(--terra-soft); }
.tone-purple { background: var(--purple); color: var(--purple-tint); }
.tone-ink { background: var(--ink); color: var(--gold-light); }

.cab-body { padding: 18px 10px 8px; display: flex; flex-direction: column; flex: 1; }
.cab-body .kicker { font-size: 12px; margin-bottom: 8px; }
.cab-text { font: 400 14px/1.5 var(--font-body); color: var(--muted); margin-bottom: 16px; }

.cab-facts { margin-top: auto; display: grid; gap: 0; }
.cab-facts > div {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 10px;
  padding: 8px 0;
  border-top: 1px solid rgba(22, 19, 15, 0.14);
}
.cab-facts dt { font: 700 12px/1.4 var(--font-body); color: var(--purple); }
.cab-facts dd { margin: 0; font: 500 13px/1.4 var(--font-body); color: var(--ink); }

/* Architecture */
.archi-h { margin-bottom: 18px; }
.p2 { margin-top: 12px; }
.kerk-fig { min-height: clamp(320px, 38vw, 520px); }
.small-fig { min-height: 300px; }
.pav-svg { width: 100%; height: auto; display: block; }
.influences { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 24px 40px; align-items: start; }
.influences .val { color: var(--stone); }

/* Nécropoles */
.necro-fig { min-height: 560px; }
.necro { display: flex; flex-direction: column; gap: 24px; }
.necro-title { font-size: clamp(32px, 3.9vw, 56px); }
.necro-key { font-size: 20px; line-height: 1.1; color: var(--gold-light); }
.necro-val { font-size: 15px; line-height: 1.5; color: var(--on-dark); }
.necro-quote { border-inline-start: 3px solid var(--gold); padding-inline-start: 18px; }
.necro-quote p { font: 500 italic clamp(17px, 1.5vw, 20px)/1.45 var(--font-body); color: var(--white); }
.necro-quote cite { display: block; margin-top: 8px; font: 500 13px/1.4 var(--font-body); font-style: normal; color: var(--on-dark); }

/* Musées */
.mus-card > img { height: 300px; }
.mus-tile { min-height: 230px; }
.mus-key { font-size: 20px; }

.related-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.related { min-height: 200px; }

@media (max-width: 960px) {
  .influences { grid-template-columns: minmax(0, 1fr); }
  .necro-fig { min-height: 360px; }
  .small-fig { min-height: 260px; }
}

@media (max-width: 640px) {
  .cab-media { height: 190px; }
  .cab-glyph { font-size: 80px; }
  .cab-facts > div { grid-template-columns: 86px minmax(0, 1fr); }
  .necro-fig { min-height: 280px; }
  .necro { gap: 16px; }
  .mus-card > img { height: 220px; }
  .mus-tile, .related { min-height: 0; }
}
</style>
