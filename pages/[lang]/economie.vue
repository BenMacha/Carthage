<template>
  <div class="pg">
    <!-- Héros -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--navy tile--stack tile--hero s-6">
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display hero-title">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-6 hero-fig">
        <img src="/img/ports.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Chiffres -->
    <div class="bento">
      <div class="tile tile--ink s-12 band">
        <div v-for="s in c.stats" :key="s.n" class="band-item">
          <div class="num">{{ s.n }}</div>
          <p>{{ s.t }}</p>
        </div>
      </div>
    </div>

    <!-- Piliers -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.pillars.title }}</h2>
        <p>{{ c.pillars.aside }}</p>
      </div>
    </section>
    <div class="cols cols-4">
      <div v-for="(p, i) in c.pillars.items" :key="p.t" class="tile tile--stack pillar" :class="pillarTones[i]">
        <div>
          <span class="kicker">{{ p.k }}</span>
          <h3 class="h-card">{{ p.t }}</h3>
          <p class="body">{{ p.d }}</p>
        </div>
        <ul class="plist">
          <li v-for="it in p.items" :key="it">{{ it }}</li>
        </ul>
      </div>
    </div>

    <!-- Routes commerciales -->
    <section class="sec">
      <div class="tile tile--xl">
        <span class="kicker">{{ c.routes.kicker }}</span>
        <h2 class="h-section routes-title">{{ c.routes.title }}</h2>
        <table class="tbl routes">
          <thead>
            <tr>
              <th scope="col">{{ c.routes.cols[0] }}</th>
              <th scope="col">{{ c.routes.cols[1] }}</th>
              <th scope="col">{{ c.routes.cols[2] }}</th>
              <th scope="col">{{ c.routes.cols[3] }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in c.routes.rows" :key="r.dest">
              <td class="dir"><span class="dir-arrow" :class="'dir-' + r.dir" aria-hidden="true">→</span>{{ r.cap }}</td>
              <th scope="row" class="dest">{{ r.dest }}</th>
              <td :data-label="c.routes.cols[2]">{{ r.exp }}</td>
              <td :data-label="c.routes.cols[3]" class="imp">{{ r.imp }}</td>
            </tr>
          </tbody>
        </table>
        <p class="note">{{ c.routes.note }}</p>
      </div>
    </section>

    <!-- Carte -->
    <section class="sec">
      <div class="sec-head">
        <h2 class="h-section">{{ c.map.title }}</h2>
        <p>{{ c.map.aside }}</p>
      </div>
      <MapsAnimatedMap compact initial-mode="voy" :modes="['voy', 'terr']" />
    </section>
    <div class="cols cols-3 gap-top">
      <NuxtLink :to="localePath('/hannon')" class="card-img">
        <img src="/img/hanno-galley.png" :alt="c.map.hannoAlt" loading="lazy">
        <div class="card-body">
          <span class="kicker">{{ c.map.cards[0].k }}</span>
          <h3 class="h-card">{{ c.map.cards[0].t }}</h3>
          <p>{{ c.map.cards[0].d }}</p>
          <span class="go">{{ c.go }}</span>
        </div>
      </NuxtLink>
      <div class="card-img">
        <img src="/img/gadir.jpg" :alt="c.map.gadirAlt" loading="lazy">
        <div class="card-body">
          <span class="kicker">{{ c.map.cards[1].k }}</span>
          <h3 class="h-card">{{ c.map.cards[1].t }}</h3>
          <p>{{ c.map.cards[1].d }}</p>
        </div>
      </div>
      <div class="tile tile--gold tile--stack">
        <div>
          <span class="kicker">{{ c.map.cards[2].k }}</span>
          <h3 class="h-card">{{ c.map.cards[2].t }}</h3>
          <p class="body">{{ c.map.cards[2].d }}</p>
        </div>
        <p class="src">{{ c.map.cards[2].src }}</p>
      </div>
    </div>

    <!-- Pourpre & ports -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--purple tile--stack">
          <div>
            <span class="kicker">{{ c.purple.kicker }}</span>
            <h2 class="h-block">{{ c.purple.title }}</h2>
            <p v-for="p in c.purple.paras" :key="p" class="body-lg mt">{{ p }}</p>
          </div>
          <div class="chips">
            <span v-for="g in c.purple.goods" :key="g" class="chip chip--glass">{{ g }}</span>
          </div>
        </div>
        <div class="tile tile--xl tile--sand">
          <span class="kicker">{{ c.ports.kicker }}</span>
          <h2 class="h-block">{{ c.ports.title }}</h2>
          <div class="rows ports-rows" style="--row-key:96px">
            <div v-for="r in c.ports.rows" :key="r.k">
              <span class="key">{{ r.k }}</span>
              <span class="val">{{ r.v }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Métaux -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <div class="sec-head metals-head">
          <div>
            <span class="kicker">{{ c.metals.kicker }}</span>
            <h2 class="h-section">{{ c.metals.title }}</h2>
          </div>
          <p>{{ c.metals.aside }}</p>
        </div>
        <div class="cols cols-3 cols--flush">
          <div v-for="m in c.metals.items" :key="m.t" class="metal">
            <div class="metal-n">{{ m.n }}</div>
            <h3 class="h-card">{{ m.t }}</h3>
            <p class="body">{{ m.d }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Commerce : importations, exportations, exploration -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.trade.title }}</h2>
        <p>{{ c.trade.aside }}</p>
      </div>
    </section>
    <div class="cols cols-5-7">
      <div class="tile tile--xl tile--paper tile--outline tile--stack">
        <div>
          <span class="kicker">{{ c.trade.quoteK }}</span>
          <p class="trade-quote">{{ c.trade.quote }}</p>
          <p class="body-lg mt">{{ c.trade.quoteD }}</p>
        </div>
        <p class="src">{{ c.trade.quoteSrc }}</p>
      </div>
      <div class="tile tile--xl">
        <span class="kicker">{{ c.trade.kicker }}</span>
        <h3 class="h-block">{{ c.trade.t }}</h3>
        <div class="rows trade-rows" style="--row-key:130px">
          <div v-for="r in c.trade.rows" :key="r.k">
            <span class="key">{{ r.k }}</span>
            <span class="val">{{ r.v }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cols cols-3 gap-top">
      <div v-for="(b, i) in c.trade.blocks" :key="b.t" class="tile tile--stack" :class="tradeTones[i]">
        <div>
          <span class="kicker">{{ b.k }}</span>
          <h3 class="h-card">{{ b.t }}</h3>
          <p class="body">{{ b.d }}</p>
        </div>
        <div class="chips">
          <span v-for="g in b.tags" :key="g" class="chip" :class="i === 1 ? 'chip--glass' : 'chip--white'">{{ g }}</span>
        </div>
      </div>
    </div>

    <!-- Pêche et produits de la mer -->
    <section class="sec">
      <div class="tile tile--xl tile--navy sea-tile">
        <div class="sec-head sea-head">
          <div>
            <span class="kicker">{{ c.sea.kicker }}</span>
            <h2 class="h-section">{{ c.sea.title }}</h2>
          </div>
          <p>{{ c.sea.aside }}</p>
        </div>
        <div class="cols cols-4 cols--flush">
          <div v-for="s in c.sea.items" :key="s.t" class="sea-item">
            <span class="sea-k">{{ s.k }}</span>
            <h3 class="h-card">{{ s.t }}</h3>
            <p class="body">{{ s.d }}</p>
          </div>
        </div>
        <p class="note sea-note">{{ c.sea.note }}</p>
      </div>
    </section>

    <!-- Monnaie -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.coins.title }}</h2>
        <p>{{ c.coins.aside }}</p>
      </div>
    </section>
    <div class="bento">
      <div class="s-5 coin-stack">
        <div class="card-img">
          <img src="/img/quarter-shekel.jpg" :alt="c.coins.qAlt" loading="lazy">
          <div class="card-body">
            <span class="kicker">{{ c.coins.qK }}</span>
            <p>{{ c.coins.qD }}</p>
          </div>
        </div>
        <div class="card-img tile--ink">
          <img src="/img/coin-elephant.jpg" :alt="c.coins.eAlt" loading="lazy">
          <div class="card-body">
            <span class="kicker">{{ c.coins.eK }}</span>
            <p>{{ c.coins.eD }}</p>
          </div>
        </div>
      </div>
      <div class="tile tile--xl s-7">
        <span class="kicker">{{ c.coins.kicker }}</span>
        <h3 class="h-block">{{ c.coins.t }}</h3>
        <div class="rows coin-rows" style="--row-key:130px">
          <div v-for="r in c.coins.rows" :key="r.k">
            <span class="key">{{ r.k }}</span>
            <span class="val">{{ r.v }}</span>
          </div>
        </div>
        <div class="fisc">
          <h4 class="h-card">{{ c.coins.fiscT }}</h4>
          <p class="body">{{ c.coins.fiscD }}</p>
        </div>
      </div>
    </div>

    <!-- Agriculture -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig olive-fig">
          <img src="/img/olive.jpg" :alt="c.agri.alt" loading="lazy">
          <figcaption>{{ c.agri.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--olive">
          <span class="kicker">{{ c.agri.kicker }}</span>
          <h2 class="h-block">{{ c.agri.title }}</h2>
          <p class="body-lg mt">{{ c.agri.intro }}</p>
          <div class="cols cols-2 cols--flush agri-grid">
            <div v-for="f in c.agri.facts" :key="f.t" class="agri-fact">
              <h3 class="agri-t">{{ f.t }}</h3>
              <p class="body">{{ f.d }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="cols cols-7-5 gap-top">
      <div class="card-img card-img--wide">
        <img src="/img/dominus.jpg" :alt="c.agri.domAlt" loading="lazy">
        <div class="card-body">
          <span class="kicker">{{ c.agri.domK }}</span>
          <h3 class="h-card">{{ c.agri.domT }}</h3>
          <p>{{ c.agri.domD }}</p>
        </div>
      </div>
      <NuxtLink :to="localePath('/agriculture')" class="tile tile--xl tile--gold cta">
        <div>
          <span class="kicker">{{ c.agri.ctaK }}</span>
          <h3 class="h-block cta-t">{{ c.agri.ctaT }}</h3>
        </div>
        <span class="cta-arrow" aria-hidden="true">→</span>
      </NuxtLink>
    </div>

    <!-- Carthage contre Rome -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <div class="tile tile--xl tile--paper tile--outline tile--stack">
          <div>
            <span class="kicker">{{ c.vs.kicker }}</span>
            <h2 class="h-block">{{ c.vs.title }}</h2>
          </div>
          <div class="rows indem" style="--row-key:84px">
            <div v-for="r in c.vs.indem" :key="r.k">
              <span class="key">{{ r.k }}</span>
              <span class="val">{{ r.v }}</span>
            </div>
          </div>
          <NuxtLink :to="localePath('/richesse-rome')" class="btn btn-primary">{{ c.vs.cta }}</NuxtLink>
        </div>
        <div class="tile tile--xl">
          <table class="tbl vs">
            <thead>
              <tr>
                <th scope="col"><span class="sr">{{ c.vs.aspect }}</span></th>
                <th scope="col" class="vs-c">{{ c.vs.cols[0] }}</th>
                <th scope="col">{{ c.vs.cols[1] }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in c.vs.rows" :key="r.a">
                <th scope="row">{{ r.a }}</th>
                <td :data-label="c.vs.cols[0]" class="vs-c">{{ r.c }}</td>
                <td :data-label="c.vs.cols[1]" class="vs-r">{{ r.r }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <PageSources :items="c.sources" />

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <h2 class="h-section sec-title">{{ c.more.title }}</h2>
    </section>
    <div class="cols cols-3">
      <NuxtLink v-for="m in c.more.items" :key="m.to" :to="localePath(m.to)" class="tile tile--stack link-tile" :class="m.tone">
        <div>
          <span class="kicker">{{ m.k }}</span>
          <h3 class="h-card">{{ m.t }}</h3>
          <p class="body">{{ m.d }}</p>
        </div>
        <span class="go">{{ c.go }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const pillarTones = ['tile--navy', '', '', 'tile--terra']
const tradeTones = ['', 'tile--terra', 'tile--gold']

const C = {
  fr: {
    meta: {
      title: "L'économie de Carthage — un empire marchand",
      desc: "Routes commerciales, pourpre, étain et argent d'Espagne, monnaie, agriculture de Magon, ports : comment Carthage devint l'une des villes les plus riches de l'Antiquité."
    },
    hero: {
      chip: 'Économie · commerce, mines, terres',
      title: 'Un empire marchand',
      lede: "Carthage n'était pas seulement une puissance militaire : sa richesse venait d'un réseau d'échanges qui allait des îles Britanniques à l'Afrique de l'Ouest, et des côtes atlantiques au Levant.",
      alt: 'Les ports puniques de Carthage',
      caption: 'Les ports puniques : le port circulaire militaire (Cothon) et le port marchand'
    },
    stats: [
      { n: '700 000', t: "habitants selon Strabon — les historiens modernes estiment plutôt 200 000 à 400 000" },
      { n: '300', t: "livres d'argent (≈ 100 kg) par jour : le puits de Baebelo, pour Hannibal (Pline)" },
      { n: '220', t: 'loges pour navires de guerre dans le port circulaire (Appien)' },
      { n: '28', t: "livres du traité d'agriculture de Magon" }
    ],
    pillars: {
      title: "Les piliers de l'économie",
      aside: 'Commerce, terres, mines et ateliers : les quatre sources de la prospérité carthaginoise.',
      items: [
        { k: 'La mer', t: 'Commerce maritime', d: 'Le cœur de la puissance carthaginoise : les routes de la Méditerranée occidentale.', items: ["Contrôle de la route atlantique de l'étain", 'Contrôle des détroits et des passages stratégiques', 'Comptoirs du Maroc à la Libye, en Sicile, Sardaigne, Baléares, Espagne', 'Échanges avec les Grecs, les Étrusques et les cités phéniciennes'] },
        { k: 'La terre', t: 'Agriculture', d: "Les terres fertiles de l'actuelle Tunisie faisaient de Carthage un grenier de la Méditerranée.", items: ['Céréales, oliviers, vignes, arbres fruitiers', 'Techniques décrites par Magon', 'Grands domaines travaillés par une main-d’œuvre servile', 'Exportation de vin, d’huile et de grain'] },
        { k: 'Le sous-sol', t: 'Mines', d: "Les mines d'Espagne fournissaient les métaux précieux indispensables.", items: ['Argent de Carthagène et de la Sierra Morena', "Or et cuivre de la péninsule Ibérique", 'Étain des « îles Cassitérides », au nord-ouest', 'Financement de la guerre contre Rome'] },
        { k: 'Les ateliers', t: 'Artisanat', d: 'Des productions réputées dans tout le monde méditerranéen.', items: ['Pourpre extraite du murex', 'Construction navale en série', 'Verre, céramique, orfèvrerie', 'Textiles et tapis'] }
      ]
    },
    routes: {
      kicker: 'Trois continents',
      title: 'Les routes commerciales',
      cols: ['Cap', 'Destination', 'Exportations', 'Importations'],
      rows: [
        { dir: 'n', cap: 'Nord', dest: 'Bretagne, îles Britanniques & Gaule', exp: 'Poterie, vin, textiles, bijoux', imp: 'Étain, ambre, fourrures' },
        { dir: 'e', cap: 'Est', dest: 'Phénicie & Orient', exp: "Argent, blé, huile d'olive", imp: 'Encens, épices, ivoire' },
        { dir: 's', cap: 'Sud', dest: "Afrique de l'Ouest & Sahara", exp: 'Sel, tissus, céramique, perles de verre', imp: 'Or, ivoire, animaux exotiques' },
        { dir: 'w', cap: 'Ouest', dest: 'Espagne & Atlantique', exp: 'Produits manufacturés, vin', imp: 'Argent, cuivre, mercenaires, chevaux' }
      ],
      note: "Les marchandises périssables (tissus, bois, aliments) ont laissé peu de traces : ces listes combinent les textes antiques et l'archéologie."
    },
    map: {
      title: 'Les voyages',
      aside: "Élissa de Tyr à Carthage, Hannon le long de l'Afrique, Himilcon vers l'Atlantique nord : suivez les routes, puis les territoires.",
      hannoAlt: 'Galère punique',
      gadirAlt: 'Cadix, l’antique Gadir',
      cards: [
        { k: 'Ve s. av. J.-C. · Sud', t: 'Le périple d’Hannon', d: "Soixante navires le long de la côte atlantique de l'Afrique, pour fonder des comptoirs, selon le Périple qui lui est attribué." },
        { k: 'Espagne · Ouest', t: 'Gadir, porte de l’Atlantique', d: "Cité phénicienne alliée de Carthage : de là, Himilcon partit vers le nord, sur la route de l'étain." },
        { k: 'Hérodote, IV, 196', t: 'Le commerce silencieux', d: "Au-delà des Colonnes d'Hercule, les Carthaginois déposaient leurs marchandises sur la plage et se retiraient ; les habitants posaient de l'or à côté. On recommençait jusqu'à l'accord, sans jamais se parler — et sans tricher, dit Hérodote.", src: 'Source : Hérodote, Histoires, IV, 196' }
      ]
    },
    purple: {
      kicker: "L'industrie de luxe",
      title: 'La pourpre et les ateliers',
      paras: [
        "Héritée de Tyr, la teinture pourpre s'obtenait à partir du murex, un coquillage dont il fallait des milliers d'exemplaires pour quelques grammes de colorant. À Kerkouane, au cap Bon, des amas de coquilles broyées signalent les ateliers ; l'île de Djerba en restera célèbre à l'époque romaine.",
        "Les ateliers de Carthage produisaient aussi céramique, perles et masques en pâte de verre, bijoux, armes et tissus. Les chantiers navals construisaient en série : chaque pièce portait une lettre de montage."
      ],
      goods: ['Pourpre', 'Céramique', 'Pâte de verre', 'Orfèvrerie', 'Textiles', 'Navires']
    },
    ports: {
      kicker: 'Les ports',
      title: 'Deux ports en un',
      rows: [
        { k: 'Marchand', v: 'Un bassin rectangulaire pour les navires de commerce, ouvert sur la mer.' },
        { k: 'Militaire', v: 'Derrière lui, le Cothon circulaire : 220 loges pour les navires de guerre, invisibles depuis le large.' },
        { k: 'L’îlot', v: "Au centre, le pavillon de l'amiral, d'où l'on surveillait la mer." },
        { k: 'Chaînes', v: "Une seule entrée, d'environ 21 m (70 pieds), fermée par des chaînes de fer (Appien)." }
      ]
    },
    metals: {
      kicker: 'Étain, argent, or',
      title: "Les métaux de l'Occident",
      aside: "Sans étain, pas de bronze. Sans argent, pas de mercenaires. Carthage tenait les routes de l'un et les mines de l'autre.",
      items: [
        { n: 'Sn', t: "L'étain", d: "Indispensable au bronze, il venait du nord-ouest de l'Europe — les « îles Cassitérides », Cornouailles, Bretagne ou Galice. Himilcon explora cette route atlantique ; Carthage en gardait jalousement le secret." },
        { n: 'Ag', t: "L'argent d'Espagne", d: "Après 237, les Barcides exploitent les mines du sud de l'Espagne. Selon Pline, le seul puits de Baebelo rapportait à Hannibal 300 livres d'argent par jour. Un siècle plus tard, Polybe compte 40 000 mineurs autour de Carthagène." },
        { n: 'Au', t: "L'or et le cuivre", d: "Or d'Afrique par le commerce atlantique et saharien, or et cuivre d'Ibérie : de quoi frapper monnaie et payer les armées de mercenaires pendant la guerre contre Rome." }
      ]
    },
    trade: {
      title: 'Acheter, vendre, explorer',
      aside: 'Comme Tyr avant elle, Carthage vivait du négoce des métaux et des objets de prix.',
      quoteK: 'Pline l’Ancien',
      quote: '« Les Puniques ont inventé le commerce. »',
      quoteD: "Héritiers des Phéniciens, les Carthaginois passaient dans l'Antiquité pour des marins et des marchands hors pair.",
      quoteSrc: 'Pline, Histoire naturelle, VII — cité par F. Decret (1977)',
      kicker: 'Repères',
      t: 'Les étapes du négoce',
      rows: [
        { k: 'Tartessos', v: "Au sud de l'Hispanie, argent, cuivre et étain se trouvaient dans des mines faciles d'accès et d'exploitation : la base de la fortune phénicienne, puis carthaginoise." },
        { k: 'VIIe s.', v: 'Carthage importe et redistribue de petits objets manufacturés : céramiques grecques et étrusques, amulettes et objets égyptiens.' },
        { k: "Jusqu'au VIe s.", v: "Les Phénico-Puniques tiennent un quasi-monopole de la navigation en Méditerranée occidentale : libre accès aux métaux, exportés bruts vers l'Orient, et aux ressources de régions entières." },
        { k: 'Vers 540', v: "Au large d'Alalia, en Corse, Carthaginois et Étrusques affrontent les Phocéens, qui quittent ensuite l'île (Hérodote, I, 166)." },
        { k: '509 et 348', v: "Deux traités avec Rome partagent les mers : les Romains ne naviguent pas au-delà du « Beau Promontoire » et, en Afrique comme en Sardaigne, ne commercent qu'en présence d'un magistrat (Polybe, III, 22-24)." }
      ],
      blocks: [
        { k: 'Importations', t: 'Ce qui arrivait à Carthage', d: "D'abord des matières premières — argent, cuivre, étain d'Hispanie et des îles Cassitérides —, ensuite des objets : vases grecs et étrusques, dont le musée du Bardo conserve des vitrines entières, et amulettes égyptiennes.", tags: ['Argent', 'Cuivre', 'Étain', 'Vases grecs', 'Amulettes'] },
        { k: 'Exportations', t: 'Ce que vendait Carthage', d: "Verre, spécialité phénicienne, bijoux, céramiques, étoffes teintes de pourpre, placages d'ivoire, d'or ou d'argent. Les tissus, pourtant réputés, ont presque disparu : seuls les amas de murex et les poids de métiers à tisser en gardent la trace.", tags: ['Verre', 'Bijoux', 'Ivoire', 'Étoffes'] },
        { k: 'Par la terre', t: 'Caravanes et exploration', d: "Le négoce suivait aussi des pistes caravanières, plus incertaines et plus dangereuses, qui expliquent des établissements en Libye et dans le sud de la Tunisie. Les voyages d'exploration visaient les mêmes buts : minerais — étain, or du Maghreb — et nouveaux débouchés.", tags: ['Libye', 'Sud tunisien', 'Or'] }
      ]
    },
    sea: {
      kicker: 'Pêche et produits de la mer',
      title: 'La mer nourricière',
      aside: 'Pêche, salaisons et sauces de poisson : une industrie que Rome reprendra à grande échelle.',
      items: [
        { k: 'Sauce', t: 'Le garum', d: "Sauce de poissons gras, utilisée en cuisine et comme remède. Ce sont les Phénico-Puniques qui en ont répandu l'usage en Méditerranée ; on la fabriquait en grand dans des installations retrouvées sur plusieurs sites (Krings et Lipinski)." },
        { k: 'Conserves', t: 'Les salaisons', d: 'Poissons salés, conditionnés en amphores, voyageaient avec les autres produits de la mer dans tout le bassin méditerranéen.' },
        { k: 'Gadès', t: 'Le thon', d: "Les monnaies de Gadès, l'actuelle Cadix, portent des thons : signe du poids de cette pêche dans l'économie de la cité phénicienne." },
        { k: 'Coquillages', t: 'Le murex', d: 'Pêché pour la pourpre, il s’accumule en amas de coquilles broyées près des ateliers de teinture.' }
      ],
      note: "Production et commerce du garum se poursuivent largement sous Rome : les fabriques de salaison les mieux conservées, comme celle de Baelo Claudia près de Cadix, datent de l'époque romaine."
    },
    coins: {
      title: 'Monnaie et finances',
      aside: 'Carthage a frappé monnaie tard, mais massivement, surtout pour payer ses armées.',
      qAlt: 'Quart de shekel barcide',
      qK: 'Espagne barcide',
      qD: "Quart de shekel frappé en Espagne par les Barcides, IIIe s. av. J.-C.",
      eAlt: 'Shekel à l’éléphant',
      eK: '213–210 av. J.-C.',
      eD: "Shekel d'argent : tête de Melqart et éléphant de guerre (British Museum).",
      kicker: 'Le système monétaire',
      t: 'Des monnaies pour payer la guerre',
      rows: [
        { k: 'Fin Ve s.', v: "Premières monnaies puniques, en argent, frappées en Sicile pour payer les troupes ; certaines portent l'inscription « le camp »." },
        { k: 'Milieu IVe s.', v: 'Carthage frappe elle-même or et bronze. Motifs : tête de Tanit, cheval, palmier — le palmier (phoinix en grec) évoque les Phéniciens.' },
        { k: 'IIIe s.', v: "Pendant les guerres contre Rome, pièces d'électrum (alliage d'or et d'argent) et monnaies à la teneur réduite : les finances souffrent." },
        { k: '237–209', v: "En Espagne, les Barcides frappent des shekels d'argent de grande qualité, avec Melqart, l'éléphant ou la proue de navire." }
      ],
      fiscT: 'Le système fiscal',
      fiscD: "Carthage vivait des droits de douane sur le commerce, des tributs des territoires soumis — les paysans libyens durent livrer jusqu'à la moitié de leurs récoltes pendant la première guerre punique (Polybe) —, des mines d'Espagne et des taxes agricoles. De quoi financer des armées de mercenaires sans mobiliser tous ses citoyens."
    },
    agri: {
      alt: 'Olivier près de Testour, Tunisie',
      caption: 'Olivier près de Testour, dans la vallée de la Medjerda',
      kicker: 'La terre',
      title: "L'agriculture savante",
      intro: "L'agronome carthaginois Magon rédigea un traité d'agriculture en 28 livres. Après la chute de Carthage, le Sénat romain en ordonna la traduction en latin — un honneur rendu à aucun autre livre punique.",
      facts: [
        { t: 'Le traité de Magon', d: "28 livres sur les sols, la vigne, l'olivier, l'élevage et la gestion des domaines, cités par Varron, Columelle et Pline." },
        { t: "L'huile d'olive", d: "Carthage produisait et exportait massivement son huile, rivale des productions grecques." },
        { t: 'Le vin', d: "Les vins carthaginois étaient réputés, notamment le passum, vin de raisins séchés dont Columelle a conservé la recette de Magon." },
        { t: "L'eau", d: "Citernes, puits et gestion de l'eau pour cultiver une terre semi-aride." }
      ],
      domAlt: 'Mosaïque du Seigneur Julius, musée du Bardo',
      domK: 'Musée du Bardo · IVe s. apr. J.-C.',
      domT: 'Le domaine africain',
      domD: "Cette mosaïque de l'époque romaine montre un grand domaine de la région de Carthage au fil des saisons : olives, raisins, gibier. Les grands domaines agricoles hérités de l'époque punique ont fait de l'Afrique le grenier de Rome.",
      ctaK: 'Magon, la figue de Caton et le blé',
      ctaT: "L'agriculture carthaginoise"
    },
    vs: {
      kicker: 'Deux modèles',
      title: 'Carthage contre Rome',
      aspect: 'Aspect',
      cols: ['Carthage', 'Rome'],
      indem: [
        { k: '241', v: '3 200 talents en 10 ans, après la première guerre' },
        { k: '237', v: '1 200 talents de plus, et la Sardaigne' },
        { k: '201', v: '10 000 talents en 50 ans (≈ 260 t d’argent)' },
        { k: '191', v: "Carthage propose de tout payer d'un coup ; Rome refuse" }
      ],
      cta: 'La richesse qui fit peur à Rome →',
      rows: [
        { a: 'Base économique', c: 'Commerce maritime et agriculture', r: 'Conquête militaire et tributs' },
        { a: 'Armée', c: 'Mercenaires et alliés, officiers carthaginois', r: 'Citoyens-soldats (légionnaires)' },
        { a: 'Marine', c: 'Supériorité navale historique', r: 'Flotte bâtie pendant la première guerre pour rivaliser' },
        { a: 'Gouvernement', c: 'Oligarchie marchande, deux suffètes élus', r: 'République aristocratique, deux consuls' },
        { a: 'Monnaie', c: 'Or, argent, bronze, électrum', r: 'Bronze, puis denier d’argent (vers 211)' },
        { a: 'Richesse', c: 'Issue du commerce', r: 'Issue de la conquête' }
      ]
    },
    go: 'Lire →',
    sources: [
      { type: "ancient", author: "Hérodote", work: "Histoires", ref: "I, 166 ; IV, 196" },
      { type: "ancient", author: "Polybe", work: "Histoires", ref: "I, 72 ; III, 22–24" },
      { type: "ancient", author: "Strabon", work: "Géographie", ref: "XVII, 3, 15" },
      { type: "ancient", author: "Pline l'Ancien", work: "Histoire naturelle", ref: "VII ; XXXIII, 97" },
      { type: "ancient", author: "Appien", work: "Libyca (Le Livre africain)", ref: "96" },
      { type: "ancient", author: "Columelle", work: "De l'agriculture (De re rustica)", ref: "XII, 39", note: "recette du passum, d’après Magon" },
      { type: "ancient", author: "Varron", work: "Économie rurale", note: "cite le traité de Magon" },
      { type: "ancient", author: "Anonyme", work: "Périple d'Hannon" },
      { type: "modern", author: "François Decret", work: "Carthage ou l'empire de la mer", ref: "Seuil, 1977" },
      { type: "modern", author: "Véronique Krings (dir.)", work: "La civilisation phénicienne et punique", ref: "Brill, 1995" },
      { type: "modern", author: "Edward Lipinski (dir.)", work: "Dictionnaire de la civilisation phénicienne et punique", ref: "Brepols, 1992" },
      { type: "modern", author: "Wikipédia", work: "Carthage ; Civilisation carthaginoise", note: "CC BY-SA 4.0, contenus reformulés" }
    ],
    more: {
      title: 'À lire aussi',
      items: [
        { to: '/agriculture', tone: 'tile--olive', k: 'La terre', t: "L'agriculture de Carthage", d: 'Magon, les oliviers, le blé et la figue de Caton.' },
        { to: '/richesse-rome', tone: '', k: 'Après 201', t: 'La richesse qui fit peur à Rome', d: "Comment la prospérité de Carthage précipita la troisième guerre." },
        { to: '/carte', tone: 'tile--navy', k: 'Carte animée', t: 'Carthage sur la carte', d: 'Voyages, territoires, campagne d’Hannibal et alliés.' }
      ]
    }
  },
  en: {
    meta: {
      title: "Carthage's economy — a merchant empire",
      desc: 'Trade routes, purple dye, Spanish tin and silver, coinage, Mago’s agriculture, harbours: how Carthage became one of the richest cities of antiquity.'
    },
    hero: {
      chip: 'Economy · trade, mines, land',
      title: 'A merchant empire',
      lede: 'Carthage was not only a military power: its wealth came from a trading network stretching from the British Isles to West Africa, and from the Atlantic coasts to the Levant.',
      alt: 'The Punic harbours of Carthage',
      caption: 'The Punic harbours: the circular naval harbour (Cothon) and the merchant port'
    },
    stats: [
      { n: '700,000', t: 'inhabitants according to Strabo — modern historians rather estimate 200,000 to 400,000' },
      { n: '300', t: 'pounds of silver (≈ 100 kg) a day: the Baebelo shaft, for Hannibal (Pliny)' },
      { n: '220', t: 'ship sheds for warships in the circular harbour (Appian)' },
      { n: '28', t: 'books in Mago’s treatise on agriculture' }
    ],
    pillars: {
      title: 'Pillars of the economy',
      aside: 'Trade, land, mines and workshops: the four sources of Carthaginian prosperity.',
      items: [
        { k: 'The sea', t: 'Maritime trade', d: 'The heart of Carthaginian power: the routes of the western Mediterranean.', items: ['Control of the Atlantic tin route', 'Control of straits and strategic passages', 'Trading posts from Morocco to Libya, in Sicily, Sardinia, the Balearics and Spain', 'Exchanges with Greeks, Etruscans and Phoenician cities'] },
        { k: 'The land', t: 'Agriculture', d: 'The fertile lands of present-day Tunisia made Carthage a granary of the Mediterranean.', items: ['Cereals, olives, vines, fruit trees', 'Techniques described by Mago', 'Large estates worked by enslaved labour', 'Exports of wine, oil and grain'] },
        { k: 'Underground', t: 'Mines', d: 'The mines of Spain supplied the precious metals Carthage needed.', items: ['Silver from Cartagena and the Sierra Morena', 'Gold and copper from the Iberian Peninsula', 'Tin from the "Cassiterides" in the north-west', 'Funding the war against Rome'] },
        { k: 'The workshops', t: 'Crafts', d: 'Products renowned throughout the Mediterranean world.', items: ['Purple dye from the murex', 'Series-built ships', 'Glass, pottery, goldwork', 'Textiles and carpets'] }
      ]
    },
    routes: {
      kicker: 'Three continents',
      title: 'The trade routes',
      cols: ['Heading', 'Destination', 'Exports', 'Imports'],
      rows: [
        { dir: 'n', cap: 'North', dest: 'Brittany, the British Isles & Gaul', exp: 'Pottery, wine, textiles, jewellery', imp: 'Tin, amber, furs' },
        { dir: 'e', cap: 'East', dest: 'Phoenicia & the East', exp: 'Silver, wheat, olive oil', imp: 'Incense, spices, ivory' },
        { dir: 's', cap: 'South', dest: 'West Africa & the Sahara', exp: 'Salt, cloth, pottery, glass beads', imp: 'Gold, ivory, exotic animals' },
        { dir: 'w', cap: 'West', dest: 'Spain & the Atlantic', exp: 'Manufactured goods, wine', imp: 'Silver, copper, mercenaries, horses' }
      ],
      note: 'Perishable goods (cloth, timber, food) left few traces: these lists combine ancient texts and archaeology.'
    },
    map: {
      title: 'The voyages',
      aside: 'Elissa from Tyre to Carthage, Hanno along Africa, Himilco to the North Atlantic: follow the routes, then the territories.',
      hannoAlt: 'Punic galley',
      gadirAlt: 'Cádiz, ancient Gadir',
      cards: [
        { k: '5th c. BC · South', t: 'The voyage of Hanno', d: 'Sixty ships along the Atlantic coast of Africa to found trading posts, according to the Periplus attributed to him.' },
        { k: 'Spain · West', t: 'Gadir, gateway to the Atlantic', d: 'A Phoenician city allied to Carthage: from here Himilco sailed north, on the tin route.' },
        { k: 'Herodotus, IV, 196', t: 'The silent trade', d: 'Beyond the Pillars of Hercules, the Carthaginians laid their goods on the beach and withdrew; the locals set gold beside them. They went back and forth until both sides agreed, without a word — and without cheating, says Herodotus.', src: 'Source: Herodotus, Histories, IV, 196' }
      ]
    },
    purple: {
      kicker: 'The luxury industry',
      title: 'Purple and the workshops',
      paras: [
        'Inherited from Tyre, purple dye was made from the murex, a sea snail of which thousands were needed for a few grams of colour. At Kerkouane, on Cape Bon, heaps of crushed shells mark the workshops; the island of Djerba remained famous for it in Roman times.',
        'Carthage’s workshops also produced pottery, glass-paste beads and masks, jewellery, weapons and cloth. The shipyards built in series: each part bore an assembly letter.'
      ],
      goods: ['Purple', 'Pottery', 'Glass paste', 'Goldwork', 'Textiles', 'Ships']
    },
    ports: {
      kicker: 'The harbours',
      title: 'Two harbours in one',
      rows: [
        { k: 'Merchant', v: 'A rectangular basin for trading ships, open to the sea.' },
        { k: 'Naval', v: 'Behind it, the circular Cothon: 220 sheds for warships, hidden from the open sea.' },
        { k: 'The island', v: 'In the centre, the admiral’s pavilion, from which the sea was watched.' },
        { k: 'Chains', v: 'A single entrance, about 21 m (70 feet) wide, closed with iron chains (Appian).' }
      ]
    },
    metals: {
      kicker: 'Tin, silver, gold',
      title: 'The metals of the West',
      aside: 'No tin, no bronze. No silver, no mercenaries. Carthage held the routes of the one and the mines of the other.',
      items: [
        { n: 'Sn', t: 'Tin', d: 'Essential for bronze, it came from north-western Europe — the "Cassiterides", Cornwall, Brittany or Galicia. Himilco explored this Atlantic route; Carthage jealously guarded the secret.' },
        { n: 'Ag', t: 'Spanish silver', d: 'After 237 the Barcids worked the mines of southern Spain. According to Pliny, the Baebelo shaft alone yielded Hannibal 300 pounds of silver a day. A century later Polybius counted 40,000 miners around Cartagena.' },
        { n: 'Au', t: 'Gold and copper', d: 'African gold through Atlantic and Saharan trade, Iberian gold and copper: enough to strike coins and pay mercenary armies during the war against Rome.' }
      ]
    },
    trade: {
      title: 'Buying, selling, exploring',
      aside: 'Like Tyre before it, Carthage lived by trading metals and valuable goods.',
      quoteK: 'Pliny the Elder',
      quote: '“The Punic people invented trade.”',
      quoteD: 'Heirs of the Phoenicians, the Carthaginians were known in antiquity as outstanding sailors and merchants.',
      quoteSrc: 'Pliny, Natural History, VII — cited by F. Decret (1977)',
      kicker: 'Landmarks',
      t: 'Stages of trade',
      rows: [
        { k: 'Tartessos', v: 'In southern Iberia, silver, copper and tin lay in mines that were easy to reach and to work: the basis of Phoenician, then Carthaginian, wealth.' },
        { k: '7th c.', v: 'Carthage imports and redistributes small manufactured goods: Greek and Etruscan pottery, Egyptian amulets and objects.' },
        { k: 'Until the 6th c.', v: 'The Phoenicio-Punic world held a near-monopoly on shipping in the western Mediterranean: free access to metals, shipped raw to the East, and to the resources of whole regions.' },
        { k: 'c. 540', v: 'Off Alalia, in Corsica, Carthaginians and Etruscans fought the Phocaeans, who then left the island (Herodotus, I, 166).' },
        { k: '509 and 348', v: 'Two treaties with Rome divided the seas: Romans were not to sail beyond the "Fair Promontory" and, in Africa and Sardinia, could trade only in the presence of an official (Polybius, III, 22-24).' }
      ],
      blocks: [
        { k: 'Imports', t: 'What came into Carthage', d: 'Raw materials first — silver, copper, tin from Iberia and the Cassiterides — then objects: Greek and Etruscan vases, which fill whole cases at the Bardo Museum, and Egyptian amulets.', tags: ['Silver', 'Copper', 'Tin', 'Greek vases', 'Amulets'] },
        { k: 'Exports', t: 'What Carthage sold', d: 'Glass, a Phoenician speciality, jewellery, pottery, purple-dyed cloth, ivory, gold or silver inlays. The textiles, though famous, have almost vanished: only heaps of murex shells and loom weights still bear witness to them.', tags: ['Glass', 'Jewellery', 'Ivory', 'Cloth'] },
        { k: 'Overland', t: 'Caravans and exploration', d: 'Trade also followed caravan tracks, more uncertain and more dangerous, which explain settlements in Libya and southern Tunisia. Voyages of exploration pursued the same goals: ores — tin, gold from the Maghreb — and new markets.', tags: ['Libya', 'Southern Tunisia', 'Gold'] }
      ]
    },
    sea: {
      kicker: 'Fishing and sea products',
      title: 'The bountiful sea',
      aside: 'Fishing, salting and fish sauces: an industry Rome would take over on a large scale.',
      items: [
        { k: 'Sauce', t: 'Garum', d: 'A sauce made from oily fish, used in cooking and as a remedy. It was the Phoenicio-Punic world that spread its use around the Mediterranean; it was made on a large scale in installations found at several sites (Krings and Lipinski).' },
        { k: 'Preserves', t: 'Salted fish', d: 'Salted fish, packed in amphorae, travelled with the other sea products throughout the Mediterranean basin.' },
        { k: 'Gades', t: 'Tuna', d: 'The coins of Gades, today’s Cádiz, bear tuna: a sign of how much this fishery weighed in the Phoenician city’s economy.' },
        { k: 'Shellfish', t: 'The murex', d: 'Gathered for purple dye, it piles up in heaps of crushed shells near the dye works.' }
      ],
      note: 'Garum production and trade continued on a large scale under Rome: the best-preserved salting factories, such as the one at Baelo Claudia near Cádiz, date from the Roman period.'
    },
    coins: {
      title: 'Coinage and finance',
      aside: 'Carthage minted coins late, but on a large scale, above all to pay its armies.',
      qAlt: 'Barcid quarter shekel',
      qK: 'Barcid Spain',
      qD: 'Quarter shekel struck in Spain by the Barcids, 3rd c. BC.',
      eAlt: 'Elephant shekel',
      eK: '213–210 BC',
      eD: 'Silver shekel: head of Melqart and war elephant (British Museum).',
      kicker: 'The monetary system',
      t: 'Money to pay for war',
      rows: [
        { k: 'Late 5th c.', v: 'The first Punic coins, in silver, were struck in Sicily to pay the troops; some bear the inscription "the camp".' },
        { k: 'Mid-4th c.', v: 'Carthage itself strikes gold and bronze. Designs: head of Tanit, horse, palm tree — the palm (phoinix in Greek) evokes the Phoenicians.' },
        { k: '3rd c.', v: 'During the wars against Rome, electrum coins (an alloy of gold and silver) and debased issues: finances were under strain.' },
        { k: '237–209', v: 'In Spain the Barcids strike high-quality silver shekels, with Melqart, the elephant or a ship’s prow.' }
      ],
      fiscT: 'The tax system',
      fiscD: 'Carthage lived on customs duties on trade, tribute from subject territories — Libyan farmers had to hand over up to half their harvests during the First Punic War (Polybius) —, the mines of Spain and agricultural taxes. Enough to fund mercenary armies without mobilising all its citizens.'
    },
    agri: {
      alt: 'Olive tree near Testour, Tunisia',
      caption: 'Olive tree near Testour, in the Medjerda valley',
      kicker: 'The land',
      title: 'Scientific agriculture',
      intro: 'The Carthaginian agronomist Mago wrote a treatise on agriculture in 28 books. After the fall of Carthage the Roman Senate ordered it translated into Latin — an honour granted to no other Punic book.',
      facts: [
        { t: 'Mago’s treatise', d: '28 books on soils, vines, olives, livestock and estate management, quoted by Varro, Columella and Pliny.' },
        { t: 'Olive oil', d: 'Carthage produced and exported its oil on a large scale, rivalling Greek production.' },
        { t: 'Wine', d: 'Carthaginian wines were renowned, especially passum, a raisin wine whose recipe by Mago Columella preserved.' },
        { t: 'Water', d: 'Cisterns, wells and water management to farm a semi-arid land.' }
      ],
      domAlt: 'Mosaic of Dominus Julius, Bardo Museum',
      domK: 'Bardo Museum · 4th c. AD',
      domT: 'The African estate',
      domD: 'This Roman-era mosaic shows a great estate near Carthage through the seasons: olives, grapes, game. The large estates inherited from the Punic period made Africa the granary of Rome.',
      ctaK: 'Mago, Cato’s fig and wheat',
      ctaT: 'Carthaginian agriculture'
    },
    vs: {
      kicker: 'Two models',
      title: 'Carthage versus Rome',
      aspect: 'Aspect',
      cols: ['Carthage', 'Rome'],
      indem: [
        { k: '241', v: '3,200 talents over 10 years, after the first war' },
        { k: '237', v: '1,200 more talents, and Sardinia' },
        { k: '201', v: '10,000 talents over 50 years (≈ 260 t of silver)' },
        { k: '191', v: 'Carthage offers to pay everything at once; Rome refuses' }
      ],
      cta: 'The wealth that frightened Rome →',
      rows: [
        { a: 'Economic base', c: 'Maritime trade and agriculture', r: 'Military conquest and tribute' },
        { a: 'Army', c: 'Mercenaries and allies, Carthaginian officers', r: 'Citizen-soldiers (legionaries)' },
        { a: 'Navy', c: 'Long-standing naval supremacy', r: 'Fleet built during the first war to compete' },
        { a: 'Government', c: 'Merchant oligarchy, two elected suffetes', r: 'Aristocratic republic, two consuls' },
        { a: 'Coinage', c: 'Gold, silver, bronze, electrum', r: 'Bronze, then the silver denarius (c. 211)' },
        { a: 'Wealth', c: 'From trade', r: 'From conquest' }
      ]
    },
    go: 'Read →',
    sources: [
      { type: "ancient", author: "Herodotus", work: "Histories", ref: "I, 166; IV, 196" },
      { type: "ancient", author: "Polybius", work: "Histories", ref: "I, 72; III, 22–24" },
      { type: "ancient", author: "Strabo", work: "Geography", ref: "XVII, 3, 15" },
      { type: "ancient", author: "Pliny the Elder", work: "Natural History", ref: "VII; XXXIII, 97" },
      { type: "ancient", author: "Appian", work: "Libyca (The African Book)", ref: "96" },
      { type: "ancient", author: "Columella", work: "On Agriculture (De re rustica)", ref: "XII, 39", note: "recipe for passum, after Mago" },
      { type: "ancient", author: "Varro", work: "On Agriculture", note: "cites Mago's treatise" },
      { type: "ancient", author: "Anonymous", work: "Periplus of Hanno" },
      { type: "modern", author: "François Decret", work: "Carthage ou l'empire de la mer", ref: "Seuil, 1977" },
      { type: "modern", author: "Véronique Krings (ed.)", work: "La civilisation phénicienne et punique", ref: "Brill, 1995" },
      { type: "modern", author: "Edward Lipinski (ed.)", work: "Dictionnaire de la civilisation phénicienne et punique", ref: "Brepols, 1992" },
      { type: "modern", author: "Wikipedia (French)", work: "Carthage; Civilisation carthaginoise", note: "CC BY-SA 4.0, content rephrased" }
    ],
    more: {
      title: 'Read also',
      items: [
        { to: '/agriculture', tone: 'tile--olive', k: 'The land', t: 'Carthaginian agriculture', d: 'Mago, olive trees, wheat and Cato’s fig.' },
        { to: '/richesse-rome', tone: '', k: 'After 201', t: 'The wealth that frightened Rome', d: 'How Carthage’s prosperity hastened the third war.' },
        { to: '/carte', tone: 'tile--navy', k: 'Animated map', t: 'Carthage on the map', d: 'Voyages, territories, Hannibal’s campaign and alliances.' }
      ]
    }
  },
  ar: {
    meta: {
      title: 'اقتصاد قرطاج — إمبراطورية تجارية',
      desc: 'الطرق التجارية، والأرجوان، وقصدير إسبانيا وفضتها، والنقود، وزراعة ماغون، والموانئ: كيف صارت قرطاج من أغنى مدن العالم القديم.'
    },
    hero: {
      chip: 'الاقتصاد · التجارة والمناجم والأرض',
      title: 'إمبراطورية تجارية',
      lede: 'لم تكن قرطاج قوة عسكرية فحسب: كانت ثروتها تأتي من شبكة مبادلات تمتدّ من الجزر البريطانية إلى غرب إفريقيا، ومن السواحل الأطلسية إلى المشرق.',
      alt: 'الموانئ البونيقية في قرطاج',
      caption: 'الموانئ البونيقية: الميناء الدائري الحربي (الكوثون) والميناء التجاري'
    },
    stats: [
      { n: '700000', t: 'نسمة حسب سترابون — ويقدّر المؤرخون المعاصرون العدد بين 200 ألف و400 ألف' },
      { n: '300', t: 'رطل فضة (≈ 100 كغ) يوميًا: بئر بايبيلو لحساب حنبعل (بلينيوس)' },
      { n: '220', t: 'حوضًا للسفن الحربية في الميناء الدائري (أبيانوس)' },
      { n: '28', t: 'كتابًا في موسوعة ماغون الزراعية' }
    ],
    pillars: {
      title: 'أعمدة الاقتصاد',
      aside: 'التجارة والأرض والمناجم والورش: المصادر الأربعة لازدهار قرطاج.',
      items: [
        { k: 'البحر', t: 'التجارة البحرية', d: 'قلب القوة القرطاجية: طرق غرب البحر الأبيض المتوسط.', items: ['السيطرة على طريق القصدير الأطلسي', 'السيطرة على المضائق والممرّات الاستراتيجية', 'مراكز تجارية من المغرب إلى ليبيا وفي صقلية وسردينيا والبليار وإسبانيا', 'مبادلات مع الإغريق والإتروسكيين والمدن الفينيقية'] },
        { k: 'الأرض', t: 'الزراعة', d: 'جعلت الأراضي الخصبة في تونس الحالية من قرطاج أحد مخازن حبوب المتوسط.', items: ['حبوب وزيتون وكروم وأشجار مثمرة', 'تقنيات وصفها ماغون', 'ضيعات كبرى يعمل فيها العبيد', 'تصدير الخمر والزيت والحبوب'] },
        { k: 'باطن الأرض', t: 'المناجم', d: 'وفّرت مناجم إسبانيا المعادن الثمينة الضرورية.', items: ['فضة قرطاجنة وسييرا مورينا', 'ذهب شبه الجزيرة الإيبيرية ونحاسها', 'قصدير «جزر كاسيتيريدس» في الشمال الغربي', 'تمويل الحرب ضد روما'] },
        { k: 'الورش', t: 'الحِرف', d: 'منتجات ذائعة الصيت في كامل العالم المتوسطي.', items: ['الأرجوان المستخرج من الموريكس', 'بناء السفن بالجملة', 'الزجاج والخزف والصياغة', 'المنسوجات والزرابي'] }
      ]
    },
    routes: {
      kicker: 'ثلاث قارات',
      title: 'الطرق التجارية',
      cols: ['الاتجاه', 'الوجهة', 'الصادرات', 'الواردات'],
      rows: [
        { dir: 'n', cap: 'الشمال', dest: 'بريتانيا والجزر البريطانية وبلاد الغال', exp: 'فخار، خمر، منسوجات، حليّ', imp: 'قصدير، كهرمان، فراء' },
        { dir: 'e', cap: 'الشرق', dest: 'فينيقيا والمشرق', exp: 'فضة، قمح، زيت زيتون', imp: 'بخور، توابل، عاج' },
        { dir: 's', cap: 'الجنوب', dest: 'غرب إفريقيا والصحراء', exp: 'ملح، أقمشة، خزف، خرز زجاجي', imp: 'ذهب، عاج، حيوانات غريبة' },
        { dir: 'w', cap: 'الغرب', dest: 'إسبانيا والأطلسي', exp: 'منتجات مصنّعة، خمر', imp: 'فضة، نحاس، مرتزقة، خيول' }
      ],
      note: 'لم تترك البضائع القابلة للتلف (الأقمشة والخشب والأغذية) إلا آثارًا قليلة: تجمع هذه القوائم بين النصوص القديمة وعلم الآثار.'
    },
    map: {
      title: 'الرحلات',
      aside: 'عليسة من صور إلى قرطاج، وحنون على طول إفريقيا، وحملكون نحو شمال الأطلسي: تابع الطرق ثم الأراضي.',
      hannoAlt: 'سفينة بونيقية',
      gadirAlt: 'قادس، جادير القديمة',
      cards: [
        { k: 'القرن 5 ق.م · الجنوب', t: 'رحلة حنون', d: 'ستون سفينة على طول الساحل الأطلسي لإفريقيا لتأسيس مراكز تجارية، حسب «الرحلة» المنسوبة إليه.' },
        { k: 'إسبانيا · الغرب', t: 'جادير، بوابة الأطلسي', d: 'مدينة فينيقية حليفة لقرطاج: منها أبحر حملكون شمالًا على طريق القصدير.' },
        { k: 'هيرودوت، 4، 196', t: 'التجارة الصامتة', d: 'وراء أعمدة هرقل، كان القرطاجيون يضعون بضائعهم على الشاطئ وينسحبون، فيضع السكان الذهب إلى جانبها. وتتكرّر العملية حتى يتّفق الطرفان، دون كلمة واحدة — ودون غشّ، كما يقول هيرودوت.', src: 'المصدر: هيرودوت، التواريخ، 4، 196' }
      ]
    },
    purple: {
      kicker: 'صناعة الترف',
      title: 'الأرجوان والورش',
      paras: [
        'ورثت قرطاج عن صور صباغة الأرجوان المستخرجة من الموريكس، وهو حلزون بحري يلزم منه الآلاف للحصول على بضعة غرامات من الصبغ. في كركوان بالوطن القبلي، تدلّ أكوام الأصداف المهشّمة على الورش، وبقيت جزيرة جربة مشهورة به في العهد الروماني.',
        'أنتجت ورش قرطاج أيضًا الخزف، والخرز والأقنعة من عجينة الزجاج، والحليّ والأسلحة والأقمشة. وكانت أحواض بناء السفن تعمل بالجملة: تحمل كل قطعة حرف تركيب.'
      ],
      goods: ['الأرجوان', 'الخزف', 'عجينة الزجاج', 'الصياغة', 'المنسوجات', 'السفن']
    },
    ports: {
      kicker: 'الموانئ',
      title: 'ميناءان في ميناء',
      rows: [
        { k: 'التجاري', v: 'حوض مستطيل لسفن التجارة، مفتوح على البحر.' },
        { k: 'الحربي', v: 'وخلفه الكوثون الدائري: 220 حوضًا للسفن الحربية، لا تُرى من عرض البحر.' },
        { k: 'الجزيرة', v: 'في الوسط، مقرّ قائد الأسطول، ومنه تُراقَب البحر.' },
        { k: 'السلاسل', v: 'مدخل واحد عرضه نحو 21 مترًا (70 قدمًا)، يُغلق بسلاسل من حديد (أبيانوس).' }
      ]
    },
    metals: {
      kicker: 'قصدير وفضة وذهب',
      title: 'معادن الغرب',
      aside: 'لا برونز بلا قصدير، ولا مرتزقة بلا فضة. وكانت قرطاج تمسك بطرق الأول ومناجم الثانية.',
      items: [
        { n: 'Sn', t: 'القصدير', d: 'ضروري لصنع البرونز، وكان يأتي من شمال غرب أوروبا — «جزر كاسيتيريدس» أو كورنوال أو بريتانيا أو غاليسيا. استكشف حملكون هذا الطريق الأطلسي، وحرصت قرطاج على كتمان سرّه.' },
        { n: 'Ag', t: 'فضة إسبانيا', d: 'بعد سنة 237 استغلّ البرقيون مناجم جنوب إسبانيا. وحسب بلينيوس كانت بئر بايبيلو وحدها تدرّ على حنبعل 300 رطل من الفضة يوميًا. وبعد قرن أحصى بوليبيوس 40 ألف عامل منجم حول قرطاجنة.' },
        { n: 'Au', t: 'الذهب والنحاس', d: 'ذهب إفريقيا عبر التجارة الأطلسية والصحراوية، وذهب إيبيريا ونحاسها: ما يكفي لسكّ النقود ودفع أجور جيوش المرتزقة خلال الحرب ضد روما.' }
      ]
    },
    trade: {
      title: 'الشراء والبيع والاستكشاف',
      aside: 'على غرار صور من قبلها، عاشت قرطاج من تجارة المعادن والسلع النفيسة.',
      quoteK: 'بلينيوس الأكبر',
      quote: '«البونيقيون هم من اخترع التجارة.»',
      quoteD: 'عُرف القرطاجيون، ورثة الفينيقيين، في العصور القديمة بأنهم بحارة وتجار لا يُضاهَون.',
      quoteSrc: 'بلينيوس، التاريخ الطبيعي، الكتاب 7 — نقلًا عن ف. ديكري (1977)',
      kicker: 'معالم',
      t: 'مراحل التجارة',
      rows: [
        { k: 'طرطيسوس', v: 'في جنوب إيبيريا، كانت الفضة والنحاس والقصدير في مناجم سهلة البلوغ والاستغلال: أساس ثروة الفينيقيين ثم القرطاجيين.' },
        { k: 'ق. 7', v: 'تستورد قرطاج وتعيد توزيع مصنوعات صغيرة: فخار إغريقي وإتروسكي، وتمائم وأدوات مصرية.' },
        { k: 'حتى ق. 6', v: 'احتكر الفينيقيون البونيقيون تقريبًا الملاحة في غرب المتوسط: وصول حرّ إلى المعادن التي تُصدَّر خامًا إلى المشرق، وإلى موارد مناطق بأكملها.' },
        { k: 'نحو 540', v: 'قبالة ألاليا في كورسيكا، واجه القرطاجيون والإتروسكيون الفوكيين الذين غادروا الجزيرة بعد ذلك (هيرودوت، 1، 166).' },
        { k: '509 و348', v: 'قسّمت معاهدتان مع روما البحار: لا يبحر الرومان وراء «الرأس الجميل»، ولا يتاجرون في إفريقيا وسردينيا إلا بحضور موظف رسمي (بوليبيوس، 3، 22-24).' }
      ],
      blocks: [
        { k: 'الواردات', t: 'ما كان يصل إلى قرطاج', d: 'المواد الخام أولًا — الفضة والنحاس والقصدير من إيبيريا وجزر الكاسيتريد — ثم المصنوعات: أوانٍ إغريقية وإتروسكية تملأ خزائن كاملة في متحف باردو، وتمائم مصرية.', tags: ['الفضة', 'النحاس', 'القصدير', 'أوانٍ إغريقية', 'تمائم'] },
        { k: 'الصادرات', t: 'ما كانت تبيعه قرطاج', d: 'الزجاج، وهو اختصاص فينيقي، والحلي والفخار والأقمشة المصبوغة بالأرجوان وتطعيمات العاج والذهب والفضة. أما المنسوجات، على شهرتها، فقد اندثرت تقريبًا: لا يشهد عليها إلا أكوام أصداف الموريكس وأثقال أنوال النسيج.', tags: ['الزجاج', 'الحلي', 'العاج', 'الأقمشة'] },
        { k: 'برًّا', t: 'القوافل والاستكشاف', d: 'سلكت التجارة أيضًا مسالك القوافل، وهي أقل ضمانًا وأكثر خطرًا، وتفسّر بعض المستوطنات في ليبيا وجنوب تونس. وكانت رحلات الاستكشاف تسعى إلى الأهداف نفسها: المعادن — القصدير وذهب المغرب — وأسواق جديدة.', tags: ['ليبيا', 'الجنوب التونسي', 'الذهب'] }
      ]
    },
    sea: {
      kicker: 'الصيد ومنتجات البحر',
      title: 'البحر المُطعِم',
      aside: 'صيد وتمليح وصلصات سمك: صناعة ستتبناها روما على نطاق واسع.',
      items: [
        { k: 'صلصة', t: 'الغاروم', d: 'صلصة من الأسماك الدهنية تُستعمل في الطبخ وللتداوي. والفينيقيون البونيقيون هم من نشر استعمالها في المتوسط؛ وكانت تُصنع بكميات كبيرة في منشآت عُثر عليها في عدة مواقع (كرينغز وليبينسكي).' },
        { k: 'مصبّرات', t: 'السمك المملّح', d: 'كانت الأسماك المملحة، المعبأة في الجرار، تسافر مع سائر منتجات البحر في كامل حوض المتوسط.' },
        { k: 'قادس', t: 'التونة', d: 'تحمل نقود قادس، كاديث الحالية، صور أسماك التونة: دليل على وزن هذا الصيد في اقتصاد المدينة الفينيقية.' },
        { k: 'أصداف', t: 'الموريكس', d: 'يُصطاد من أجل الأرجوان، وتتراكم أصدافه المسحوقة أكوامًا قرب مصابغ الأقمشة.' }
      ],
      note: 'استمر إنتاج الغاروم وتجارته على نطاق واسع في العهد الروماني: فأفضل مصانع التمليح حفظًا، مثل مصنع بايلو كلاوديا قرب قادس، تعود إلى العصر الروماني.'
    },
    coins: {
      title: 'النقود والمالية',
      aside: 'سكّت قرطاج النقود متأخرة، لكن بكميات كبيرة، ولا سيما لدفع أجور جيوشها.',
      qAlt: 'ربع شيقل برقي',
      qK: 'إسبانيا البرقية',
      qD: 'ربع شيقل سكّه البرقيون في إسبانيا، القرن الثالث ق.م.',
      eAlt: 'شيقل الفيل',
      eK: '213–210 ق.م',
      eD: 'شيقل فضي: رأس ملقرت وفيل حرب (المتحف البريطاني).',
      kicker: 'النظام النقدي',
      t: 'نقود لتمويل الحرب',
      rows: [
        { k: 'أواخر القرن 5', v: 'أولى النقود البونيقية، من الفضة، سُكّت في صقلية لدفع أجور الجنود، وبعضها يحمل عبارة «المعسكر».' },
        { k: 'منتصف القرن 4', v: 'قرطاج نفسها تسكّ الذهب والبرونز. الرموز: رأس تانيت، والحصان، والنخلة — والنخلة (فوينيكس بالإغريقية) تحيل إلى الفينيقيين.' },
        { k: 'القرن 3', v: 'خلال الحروب ضد روما، نقود من الإلكتروم (خليط الذهب والفضة) وأخرى منخفضة العيار: المالية تعاني.' },
        { k: '237–209', v: 'في إسبانيا يسكّ البرقيون شيقلات فضية عالية الجودة، عليها ملقرت أو الفيل أو مقدّمة سفينة.' }
      ],
      fiscT: 'النظام الجبائي',
      fiscD: 'عاشت قرطاج من رسوم الجمارك على التجارة، ومن جزية الأراضي الخاضعة — إذ اضطرّ الفلاحون الليبيون إلى تسليم ما يصل إلى نصف محاصيلهم خلال الحرب البونيقية الأولى (بوليبيوس) —، ومن مناجم إسبانيا والضرائب الزراعية. وهو ما مكّنها من تمويل جيوش المرتزقة دون تجنيد كل مواطنيها.'
    },
    agri: {
      alt: 'شجرة زيتون قرب تستور، تونس',
      caption: 'شجرة زيتون قرب تستور، في وادي مجردة',
      kicker: 'الأرض',
      title: 'الزراعة العالِمة',
      intro: 'ألّف المهندس الزراعي القرطاجي ماغون موسوعة زراعية في 28 كتابًا. وبعد سقوط قرطاج أمر مجلس الشيوخ الروماني بترجمتها إلى اللاتينية — وهو شرف لم ينله أي كتاب بونيقي آخر.',
      facts: [
        { t: 'موسوعة ماغون', d: '28 كتابًا عن التربة والكروم والزيتون وتربية الماشية وتسيير الضيعات، استشهد بها فارون وكولوميلا وبلينيوس.' },
        { t: 'زيت الزيتون', d: 'أنتجت قرطاج زيتها وصدّرته بكميات كبيرة، منافسة الإنتاج الإغريقي.' },
        { t: 'الخمر', d: 'اشتهرت الخمور القرطاجية، ولا سيما «الباسوم» المصنوع من الزبيب، وقد حفظ كولوميلا وصفة ماغون له.' },
        { t: 'الماء', d: 'صهاريج وآبار وتدبير للمياه لفلاحة أرض شبه جافة.' }
      ],
      domAlt: 'فسيفساء السيد يوليوس، متحف باردو',
      domK: 'متحف باردو · القرن 4 م',
      domT: 'الضيعة الإفريقية',
      domD: 'تُظهر هذه الفسيفساء من العهد الروماني ضيعة كبرى قرب قرطاج عبر الفصول: زيتون وعنب وصيد. وقد جعلت الضيعات الكبرى الموروثة عن العهد البونيقي من إفريقيا مخزن حبوب روما.',
      ctaK: 'ماغون وتينة كاتو والقمح',
      ctaT: 'الزراعة القرطاجية'
    },
    vs: {
      kicker: 'نموذجان',
      title: 'قرطاج في مواجهة روما',
      aspect: 'الجانب',
      cols: ['قرطاج', 'روما'],
      indem: [
        { k: '241', v: '3200 تالنت في 10 أعوام، بعد الحرب الأولى' },
        { k: '237', v: '1200 تالنت إضافية، وسردينيا' },
        { k: '201', v: '10000 تالنت في 50 عامًا (≈ 260 طنًا من الفضة)' },
        { k: '191', v: 'قرطاج تعرض دفع كل شيء دفعة واحدة؛ وروما ترفض' }
      ],
      cta: 'الثروة التي أخافت روما ←',
      rows: [
        { a: 'القاعدة الاقتصادية', c: 'التجارة البحرية والزراعة', r: 'الغزو العسكري والجزية' },
        { a: 'الجيش', c: 'مرتزقة وحلفاء بقيادة ضباط قرطاجيين', r: 'مواطنون جنود (الفيالق)' },
        { a: 'البحرية', c: 'تفوّق بحري عريق', r: 'أسطول بُني خلال الحرب الأولى للمنافسة' },
        { a: 'الحكم', c: 'أوليغارشية تجارية وشُفْطان منتخبان', r: 'جمهورية أرستقراطية وقنصلان' },
        { a: 'النقود', c: 'ذهب وفضة وبرونز وإلكتروم', r: 'برونز، ثم الدينار الفضي (نحو 211)' },
        { a: 'الثروة', c: 'مصدرها التجارة', r: 'مصدرها الغزو' }
      ]
    },
    go: 'اقرأ ←',
    sources: [
      { type: "ancient", author: "هيرودوت", work: "التواريخ", ref: "1، 166؛ 4، 196" },
      { type: "ancient", author: "بوليبيوس", work: "التواريخ", ref: "1، 72؛ 3، 22–24" },
      { type: "ancient", author: "سترابون", work: "الجغرافيا", ref: "17، 3، 15" },
      { type: "ancient", author: "بلينيوس الأكبر", work: "التاريخ الطبيعي", ref: "7؛ 33، 97" },
      { type: "ancient", author: "أبيانوس", work: "ليبيكا (الكتاب الإفريقي)", ref: "96" },
      { type: "ancient", author: "كولوميلا", work: "في الفلاحة", ref: "12، 39", note: "وصفة «الباسوم» نقلًا عن ماغون" },
      { type: "ancient", author: "فارون", work: "في الزراعة", note: "يستشهد بموسوعة ماغون" },
      { type: "ancient", author: "مجهول المؤلف", work: "رحلة حنون" },
      { type: "modern", author: "فرانسوا ديكري", work: "Carthage ou l'empire de la mer", ref: "Seuil, 1977" },
      { type: "modern", author: "فيرونيك كرينغز (إشراف)", work: "La civilisation phénicienne et punique", ref: "Brill, 1995" },
      { type: "modern", author: "إدوارد ليبينسكي (إشراف)", work: "Dictionnaire de la civilisation phénicienne et punique", ref: "Brepols, 1992" },
      { type: "modern", author: "ويكيبيديا (بالفرنسية)", work: "Carthage ; Civilisation carthaginoise", note: "CC BY-SA 4.0، محتوى أعيدت صياغته" }
    ],
    more: {
      title: 'اقرأ أيضًا',
      items: [
        { to: '/agriculture', tone: 'tile--olive', k: 'الأرض', t: 'الزراعة في قرطاج', d: 'ماغون والزيتون والقمح وتينة كاتو.' },
        { to: '/richesse-rome', tone: '', k: 'بعد 201', t: 'الثروة التي أخافت روما', d: 'كيف عجّل ازدهار قرطاج بالحرب الثالثة.' },
        { to: '/carte', tone: 'tile--navy', k: 'خريطة متحركة', t: 'قرطاج على الخريطة', d: 'الرحلات والأراضي وحملة حنبعل والتحالفات.' }
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
.hero-title { font-size: clamp(48px, 7vw, 104px); line-height: 0.88; }
.hero-fig { background: var(--navy); }

.mt { margin-top: 16px; }
.gap-top { margin-top: var(--gap); }
.sec-title { margin-bottom: clamp(20px, 2.4vw, 32px); }

/* Bande de chiffres */
.band {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  padding: 0;
}
.band-item { padding: clamp(22px, 2.6vw, 36px); }
.band-item + .band-item { border-inline-start: 1px solid rgba(255, 255, 255, 0.16); }
.band-item p { font: 500 13px/1.45 var(--font-body); margin-top: 10px; }

/* Piliers */
.pillar { min-height: 380px; }
.plist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font: 500 14px/1.4 var(--font-body);
}
.plist li {
  padding-top: 8px;
  border-top: 1px solid rgba(22, 19, 15, 0.14);
}
.tile--navy .plist li, .tile--terra .plist li { border-top-color: rgba(255, 255, 255, 0.2); }

/* Tableaux */
.tbl {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.tbl th, .tbl td {
  text-align: start;
  vertical-align: baseline;
  padding: 18px 12px;
  border-top: 1px solid rgba(22, 19, 15, 0.18);
  font: 400 16px/1.5 var(--font-body);
}
.tbl thead th {
  border-top: 0;
  border-bottom: 1.5px solid var(--ink);
  padding-block: 0 12px;
  font: 700 13px/1 var(--font-body);
  color: var(--muted);
}
.tbl thead + tbody tr:first-child > * { border-top: 0; }
.routes-title { margin-bottom: 28px; }
.routes thead th:first-child { width: 120px; }
.routes .dir { font: 700 14px/1.4 var(--font-body); color: var(--purple); white-space: nowrap; }
.dir-arrow { display: inline-block; margin-inline-end: 8px; }
.dir-n { transform: rotate(-90deg); }
.dir-s { transform: rotate(90deg); }
.dir-w { transform: rotate(180deg); }
.routes .dest { font: 800 clamp(18px, 1.7vw, 24px)/1.15 var(--font-display); }
.routes .imp { color: var(--muted); }
.note { margin-top: 18px; font: 500 13px/1.5 var(--font-body); }

.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Voyages */
.go { display: inline-block; margin-top: 12px; font: 600 14px/1 var(--font-body); color: var(--purple); }
.src { font: 600 12px/1.4 var(--font-body); }

/* Ports */
.ports-rows { margin-top: 24px; }
.ports-rows .key { font-size: 17px; }
.ports-rows .val { font-size: 15px; color: var(--stone); }

/* Métaux */
.metals-head { margin-bottom: 28px; }
.metals-head .h-section { color: var(--white); }
.metals-head p { color: var(--on-dark); }
.metal { border-top: 3px solid var(--gold-light); padding-top: 18px; }
.metal-n { font: 900 44px/1 var(--font-display); color: var(--gold-light); margin-bottom: 12px; }

/* Commerce */
.trade-quote { font: 800 clamp(26px, 2.8vw, 40px)/1.1 var(--font-display); margin-top: 14px; }
.trade-rows { margin-top: 22px; }
.trade-rows .key { font-size: clamp(16px, 1.5vw, 20px); color: var(--purple); }
.trade-rows .val { font-size: 15px; }

/* Mer */
.sea-head { margin-bottom: 28px; }
.sea-head .h-section { color: var(--white); }
.sea-head p { color: var(--navy-soft); }
.sea-item { border-top: 3px solid var(--gold-light); padding-top: 16px; }
.sea-k { display: block; font: 700 12px/1 var(--font-body); letter-spacing: 0.08em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 10px; }
.sea-note { color: var(--navy-soft); margin-top: 24px; }

/* Monnaie */
.coin-stack { display: flex; flex-direction: column; gap: var(--gap); }
.coin-stack .card-img > img { height: 200px; object-fit: contain; background: var(--sand-deep); }
.coin-stack .card-img.tile--ink > img { background: #2A241E; }
.coin-rows { margin-top: 22px; }
.coin-rows .key { font-size: clamp(17px, 1.6vw, 22px); }
.coin-rows .val { font-size: 15px; }
.fisc {
  margin-top: 24px;
  background: var(--paper);
  border-radius: 20px;
  padding: 20px 22px;
}

/* Agriculture */
.olive-fig { min-height: clamp(320px, 38vw, 560px); background: var(--olive); }
.agri-grid { margin-top: 24px; }
.agri-fact { border-top: 1px solid rgba(255, 255, 255, 0.22); padding-top: 14px; }
.agri-t { font: 800 18px/1.2 var(--font-display); margin-bottom: 6px; }
.card-img--wide { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 8px; }
.card-img--wide > img { height: 100%; min-height: 260px; }
.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.cta-t { font-size: clamp(26px, 2.6vw, 38px); }
.cta-arrow {
  flex: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--white);
  display: grid;
  place-items: center;
  font: 700 22px/1 var(--font-body);
}
[dir="rtl"] .cta-arrow { transform: scaleX(-1); }

/* Carthage contre Rome */
.indem .key { font-size: 20px; color: var(--purple); }
.indem .val { font-size: 15px; }
.indem > div { padding: 12px 0; gap: 14px; }
.vs thead th { font: 800 clamp(20px, 2vw, 28px)/1 var(--font-display); color: var(--ink); }
.vs thead th.vs-c { color: var(--purple); }
.vs thead th:first-child { width: 28%; }
.vs tbody th { font: 700 13px/1.4 var(--font-body); color: var(--muted); }
.vs .vs-r { color: var(--muted); }

.link-tile { min-height: 210px; }
.link-tile.tile--olive .go, .link-tile.tile--navy .go { color: var(--white); }

@media (max-width: 1100px) {
  .pillar { min-height: 0; }
}

@media (max-width: 960px) {
  .band { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .band-item:nth-child(3) { border-inline-start: 0; }
  .band-item:nth-child(n + 3) { border-top: 1px solid rgba(255, 255, 255, 0.16); }
}

@media (max-width: 760px) {
  .tbl thead { display: none; }
  .tbl, .tbl tbody, .tbl tr, .tbl th, .tbl td { display: block; width: 100%; }
  .tbl tr { padding: 16px 0; border-top: 1px solid rgba(22, 19, 15, 0.18); }
  .tbl tbody tr:first-child { border-top: 0; padding-top: 0; }
  .tbl th, .tbl td { border-top: 0; padding: 3px 0; font-size: 15px; }
  .tbl td[data-label]::before {
    content: attr(data-label) " · ";
    font-weight: 700;
    color: var(--ink);
  }
  .routes .dest { margin-bottom: 4px; }
  .vs tbody th { margin-bottom: 4px; }
  .card-img--wide { grid-template-columns: minmax(0, 1fr); }
  .card-img--wide > img { height: 220px; min-height: 0; }
}

@media (max-width: 640px) {
  .fig--hero { min-height: 280px; }
  .band-item .num { font-size: 30px; }
  .band-item { padding: 18px; }
  .band-item p { font-size: 12px; }
  .link-tile { min-height: 0; }
  .cta-arrow { width: 44px; height: 44px; }
}
</style>
