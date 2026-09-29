<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <figure class="fig fig--hero s-5 hero-fig" style="background:#F2F0EC">
        <img src="/img/massinissa.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--olive tile--stack tile--hero s-7">
        <div class="hero-top">
          <span class="chip chip--glass">{{ c.hero.chip }}</span>
          <span class="phoen hero-phoen" dir="rtl" aria-hidden="true">𐤌𐤎𐤍𐤎𐤍</span>
        </div>
        <div>
          <p class="dates">{{ c.hero.dates }}</p>
          <h1 class="h-display bio-title">{{ c.hero.title }}</h1>
          <p class="epithet">{{ c.hero.epithet }}</p>
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

    <!-- Un prince massyle à Carthage -->
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
        <div class="tile tile--xl tile--ink tile--stack">
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

    <!-- Entre Carthage et Rome -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.war.title }}</h2>
        <p>{{ c.war.aside }}</p>
      </div>
    </section>
    <div class="cols cols-3">
      <article v-for="w in c.war.items" :key="w.title" class="tile tile--xl tile--stack" :class="w.tone">
        <div>
          <span class="kicker">{{ w.kicker }}</span>
          <h3 class="h-card war-h">{{ w.title }}</h3>
          <p class="body">{{ w.text }}</p>
        </div>
        <NuxtLink v-if="w.to" :to="localePath(w.to)" class="btn btn-outline war-btn">{{ w.cta }} →</NuxtLink>
      </article>
    </div>

    <!-- Le royaume -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.realm.title }}</h2>
        <p>{{ c.realm.aside }}</p>
      </div>
    </section>
    <div class="bento realm">
      <figure class="fig s-5 cirta-fig" style="background:#6B6259">
        <img src="/img/cirta-gorges-du-rhumel.jpg" :alt="c.realm.alt" loading="lazy">
        <figcaption class="cap-box">{{ c.realm.caption }}</figcaption>
      </figure>
      <div class="s-7 realm-grid">
        <div v-for="r in c.realm.items" :key="r.title" class="tile" :class="r.tone">
          <span class="kicker">{{ r.kicker }}</span>
          <h3 class="h-card realm-h">{{ r.title }}</h3>
          <p class="body">{{ r.text }}</p>
        </div>
      </div>
    </div>

    <!-- Citation antique -->
    <section class="sec">
      <figure class="tile tile--xl tile--paper tile--outline quote">
        <span class="kicker">{{ c.quote.kicker }}</span>
        <blockquote>
          <p class="q-tr">« {{ c.quote.tr }} »</p>
        </blockquote>
        <figcaption class="q-cite">{{ c.quote.cite }}</figcaption>
      </figure>
    </section>

    <!-- Face à Carthage (renvoi) -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--terra tile--stack">
          <div>
            <span class="kicker">{{ c.carthage.kicker }}</span>
            <h2 class="h-block block-h">{{ c.carthage.title }}</h2>
            <p v-for="p in c.carthage.paras" :key="p" class="body-lg para">{{ p }}</p>
          </div>
          <NuxtLink :to="localePath('/prise-de-carthage')" class="btn btn-outline cta-light">{{ c.carthage.cta }} →</NuxtLink>
        </div>
        <div class="tile tile--xl tile--sand">
          <span class="kicker">{{ c.carthage.rowsKicker }}</span>
          <div class="rows" style="--row-key:110px">
            <div v-for="r in c.carthage.rows" :key="r.k">
              <span class="key">{{ r.k }}</span>
              <span class="val">{{ r.v }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mort et tombeaux -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.tomb.title }}</h2>
        <p>{{ c.tomb.aside }}</p>
      </div>
    </section>
    <div class="bento tombs">
      <figure class="fig s-4 dougga-fig" style="background:#2D4A7A">
        <img src="/img/dougga-mausolee-libyco-punique.jpg" :alt="c.tomb.douggaAlt" loading="lazy">
        <figcaption class="cap-box">{{ c.tomb.douggaCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--navy s-8 tile--stack">
        <div>
          <span class="kicker">{{ c.tomb.kicker }}</span>
          <h3 class="h-card tomb-h">{{ c.tomb.subtitle }}</h3>
          <p v-for="p in c.tomb.paras" :key="p" class="body para">{{ p }}</p>
        </div>
      </div>
      <figure class="fig s-7 medracen-fig" style="background:#5A6B3C">
        <img src="/img/medracen-mausolee-numide.jpg" :alt="c.tomb.medAlt" loading="lazy">
        <figcaption class="cap-box">{{ c.tomb.medCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--paper tile--outline s-5 tile--stack">
        <div>
          <span class="kicker">{{ c.tomb.debateKicker }}</span>
          <h3 class="h-card tomb-h">{{ c.tomb.debateTitle }}</h3>
          <p class="body">{{ c.tomb.debate }}</p>
        </div>
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
      <div class="tile tile--xl tile--ink">
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

const keyTones = ['', 'tile--gold', '', 'tile--terra']

const C = {
  fr: {
    meta: {
      title: 'Massinissa (v. 238 – 148 av. J.-C.), roi de Numidie',
      desc: "Massinissa, prince massyle élevé à Carthage, combattant de Carthage en Hispanie puis allié de Rome à Zama, unificateur de la Numidie qu'il gouverne plus de cinquante ans depuis Cirta, et adversaire obstiné de Carthage."
    },
    hero: {
      chip: 'Biographie · Numidie',
      dates: 'v. 238 – 148 av. J.-C.',
      title: 'Massinissa',
      epithet: 'Roi des Numides — allié de Carthage, puis de Rome',
      lede: "Formé à Carthage, il combat d'abord pour elle en Hispanie, passe à Rome en 206, décide de Zama, puis règne plus d'un demi-siècle sur une Numidie unifiée, sédentarisée et tournée vers la Méditerranée. Carthage n'eut pas de voisin plus redoutable.",
      alt: 'Monnaie numide à tête barbue laurée, attribuée à Massinissa',
      caption: 'Monnaie numide attribuée à Massinissa — British Museum'
    },
    keys: [
      { n: '~90', t: "ans à sa mort, en 148 : il monte encore à cheval sans aide (Polybe)" },
      { n: '54', t: 'ans de règne sur la Numidie, de 202 à 148' },
      { n: '4 000', t: 'cavaliers numides à ses côtés à Zama, en 202 (Tite-Live, XXX, 29)' },
      { n: '44', t: "fils, selon une tradition antique : le chiffre varie d'un auteur à l'autre" }
    ],
    intro: {
      kicker: 'Un prince massyle',
      title: 'Élevé à Carthage',
      paras: [
        "Massinissa est le fils de Gaïa, roi des Massyles, le peuple numide de l'est, dont le territoire touchait celui de Carthage. À l'ouest régnait Syphax, roi des Masaesyles. Selon Appien, le jeune prince fut instruit à Carthage, comme d'autres fils de l'aristocratie numide : il en connaissait la langue, les usages et les grandes familles.",
        "Cette éducation punique n'a rien d'un détail. Toute sa vie, Massinissa gouverne à la manière d'un souverain méditerranéen, avec le punique comme langue de l'administration et des inscriptions royales — tout en retournant contre Carthage ce qu'il avait appris chez elle."
      ],
      tags: ['Peuple : Massyles', 'Père : Gaïa', 'Capitale : Cirta'],
      nameKicker: 'Son nom',
      name: 'MSNSN',
      nameText: "C'est ainsi que les inscriptions puniques de Dougga écrivent son nom. Grecs et Latins en ont fait Massanassès, Masinissa ou Massinissa. Le sens du nom, parfois rapproché du berbère, reste une hypothèse."
    },
    life: {
      kicker: 'Chronologie',
      title: 'Une vie de quatre-vingt-dix ans',
      rows: [
        { key: 'v. 238', title: 'Naissance', text: "Fils du roi massyle Gaïa. Tite-Live (Periochae, 50) le dit âgé de plus de quatre-vingt-dix ans à sa mort." },
        { key: '212 – 206', title: 'Au service de Carthage', text: "À la tête de la cavalerie numide, il combat en Hispanie aux côtés des généraux carthaginois. En 211, ses cavaliers contribuent à la défaite et à la mort des deux Scipions, Publius et Cnaeus (Tite-Live, XXV, 34)." },
        { key: '206', title: 'Ilipa, puis le revirement', text: "Après la défaite carthaginoise d'Ilipa, il rencontre secrètement le Romain Silanus puis Scipion, qui lui avait renvoyé sans rançon son neveu Massiva, capturé en 209 (Tite-Live, XXVII, 19 ; XXVIII, 35)." },
        { key: 'v. 206 – 205', title: 'Un royaume perdu', text: "Gaïa meurt ; la succession se déchire entre son frère Oezalcès et ses neveux. Massinissa reprend le pouvoir, mais Syphax, allié à Carthage par son mariage avec Sophonisbe, le chasse. Traqué, il survit dans les montagnes avec quelques cavaliers (Tite-Live, XXIX, 29–33)." },
        { key: '204', title: 'Avec Scipion en Afrique', text: "Il rejoint l'armée romaine débarquée près d'Utique." },
        { key: '203', title: 'Cirta et Sophonisbe', text: "Victoire des Grandes Plaines ; Syphax est capturé, Cirta se rend. Massinissa épouse Sophonisbe, puis, sommé par Scipion de la livrer, lui fait porter le poison. Scipion le salue du titre de roi." },
        { key: '202', title: 'Zama', text: "Il commande l'aile droite romaine avec environ 6 000 fantassins et 4 000 cavaliers. Sa cavalerie, revenue sur les arrières d'Hannibal, achève la bataille." },
        { key: '201', title: 'Roi reconnu', text: "Le traité de paix lui reconnaît le royaume et les terres « de ses ancêtres », sans en tracer les limites." },
        { key: '201 – 148', title: 'Le règne', text: "Maître des Massyles et de l'essentiel du royaume de Syphax, il unifie la Numidie depuis Cirta, développe l'agriculture et les villes, et grignote le territoire de Carthage." },
        { key: '150', title: 'La guerre contre Carthage', text: "Carthage, à bout, prend les armes contre lui ; son armée est encerclée et détruite. Rome y trouve le prétexte de la troisième guerre punique." },
        { key: '148', title: 'Mort', text: "Il meurt au début du siège de Carthage. À sa demande, Scipion Émilien règle la succession entre ses trois fils légitimes." }
      ]
    },
    war: {
      title: 'Entre Carthage et Rome',
      aside: 'Trois moments, trois alliances : le choix de camp de Massinissa suit toujours les intérêts de son royaume.',
      items: [
        { tone: 'tile--sand', kicker: 'Hispanie · 212 – 206', title: 'Le cavalier de Carthage', text: "Pendant six ans, il sert Carthage en Hispanie. Sa cavalerie légère harcèle les Romains, et Tite-Live lui prête un rôle dans le désastre des Scipions en 211. Il est encore dans le camp punique à Ilipa." },
        { tone: 'tile--purple', kicker: 'Numidie · 206 – 203', title: 'La rivalité avec Syphax', text: "Carthage mise sur Syphax, plus puissant, et scelle l'alliance par le mariage de Sophonisbe, fille d'Hasdrubal fils de Giscon. Évincé, Massinissa n'a plus d'autre carte que Rome. L'épisode de Sophonisbe, en 203, montre jusqu'où allait sa dépendance envers Scipion.", to: '/sophonisbe', cta: 'Sophonisbe' },
        { tone: 'tile--ink', kicker: 'Afrique · 202', title: 'Zama', text: "Face à Hannibal, la cavalerie numide, d'ordinaire l'arme de Carthage, combat cette fois pour Rome. Massinissa et Laelius dispersent les cavaliers adverses puis reviennent frapper l'infanterie punique dans le dos.", to: '/hannibal', cta: 'Hannibal' }
      ]
    },
    realm: {
      title: 'Bâtir un royaume',
      aside: "Plus de cinquante ans de règne : ce que les sources retiennent de la Numidie de Massinissa.",
      alt: 'Les gorges du Rhumel et la vieille ville de Constantine, antique Cirta',
      caption: "Cirta (Constantine), la capitale : un rocher cerné par les gorges du Rhumel.",
      items: [
        { tone: 'tile--olive', kicker: 'Cirta', title: 'Une capitale royale', text: "Ancienne place forte de Syphax, Cirta devient le centre du royaume unifié. Des commerçants grecs et italiens s'y installent ; la ville conservera longtemps une culture punique." },
        { tone: '', kicker: 'Agriculture', title: 'Des nomades aux paysans', text: "Polybe lui attribue d'avoir montré que la Numidie, jugée stérile, pouvait porter toutes les cultures ; il aurait donné à chacun de ses fils de vastes domaines. Les historiens nuancent : l'agriculture numide lui est antérieure, mais il l'a encouragée." },
        { tone: 'tile--gold', kicker: 'Monnaie', title: 'Un monnayage royal', text: "Des bronzes à tête barbue et laurée au droit, cheval au revers, avec des lettres puniques, sont attribués à Massinissa ou à ses successeurs. L'attribution précise des émissions reste discutée." },
        { tone: 'tile--sand', kicker: 'Hellénisation', title: 'Un roi méditerranéen', text: "Il envoie du blé en Grèce ; des statues lui sont dédiées à Délos. L'un de ses fils, Mastanabal, remporte une course de chars aux Panathénées d'Athènes. La cour parle punique et regarde vers le monde hellénistique." }
      ]
    },
    quote: {
      kicker: 'Polybe, qui l\'a rencontré',
      tr: "Son plus grand et plus admirable exploit fut celui-ci : alors que toute la Numidie passait jusque-là pour stérile et incapable de produire des fruits cultivés, il fut le premier et le seul à montrer qu'elle pouvait les produire tous, aussi bien que n'importe quelle autre contrée.",
      cite: 'Polybe, Histoires, XXXVI, 16 (traduction adaptée)'
    },
    carthage: {
      kicker: 'Face à Carthage · 201 – 150',
      title: 'Le voisin qui grignotait Carthage',
      paras: [
        "Le traité de 201 interdit à Carthage toute guerre sans l'accord de Rome et laisse Massinissa réclamer les terres « de ses ancêtres ». Pendant un demi-siècle, il en profite : les Emporia de la petite Syrte, puis la région de Thugga et les Grandes Plaines passent sous son contrôle, et Rome, appelée à arbitrer, lui donne presque toujours raison.",
        "Cette longue pression, jusqu'à la guerre de 150 qui fournit à Rome son prétexte, est racontée en détail sur la page consacrée à la prise de Carthage."
      ],
      cta: 'Massinissa et la chute de Carthage',
      rowsKicker: "L'essentiel",
      rows: [
        { k: '193', v: 'Premiers empiètements sur les Emporia (Tite-Live).' },
        { k: '162 – 161', v: 'Rome lui donne raison sur les Emporia (Polybe).' },
        { k: '153 – 152', v: 'Grandes Plaines, région de Thugga (Appien).' },
        { k: '150', v: 'Carthage prend les armes ; son armée est anéantie.' }
      ]
    },
    tomb: {
      title: 'Mort et tombeaux',
      aside: 'Où repose Massinissa ? Aucun tombeau ne lui est attribué avec certitude.',
      kicker: 'Succession · 148',
      subtitle: 'Un royaume partagé en trois',
      paras: [
        "Massinissa meurt en 148, alors que les légions assiègent Carthage. Il avait eu de nombreux enfants — Tite-Live rapporte qu'il en engendra encore un après quatre-vingt-six ans (Periochae, 50). Scipion Émilien, chargé du règlement, partage le pouvoir entre ses trois fils légitimes : Micipsa reçoit Cirta et le gouvernement, Gulussa la guerre, Mastanabal la justice (Appien, Libyca, 106).",
        "Le culte du roi défunt est attesté : à Dougga, une inscription bilingue, libyque et punique, commémore en 139 la construction d'un sanctuaire dédié à Massinissa, dans la dixième année du règne de Micipsa."
      ],
      douggaAlt: 'Le mausolée libyco-punique de Dougga, tour à étages coiffée d\'une pyramide',
      douggaCap: "Mausolée libyco-punique de Dougga (IIe s. av. J.-C.) : un monument princier numide.",
      medAlt: 'Le Medracen, grand tombeau circulaire à gradins près de Batna',
      medCap: "Le Medracen (Algérie), tombeau royal numide bien antérieur à Massinissa.",
      debateKicker: 'Attribution discutée',
      debateTitle: 'Le tombeau de qui ?',
      debate: "Le mausolée de Dougga portait une inscription bilingue, aujourd'hui au British Museum, qui nomme un certain Ateban, fils d'Iepmatath : on y voit le plus souvent le tombeau d'un prince numide, et l'hypothèse d'un cénotaphe de Massinissa n'est pas établie. Près de Cirta, la Soumâa du Khroub a été proposée comme tombeau de Massinissa ou de Micipsa, là encore sans preuve décisive. Le Medracen, plus ancien, montre que la royauté numide bâtissait déjà de grands tombeaux avant lui."
    },
    sourcesNote: {
      kicker: 'Sources',
      title: "D'où vient ce que l'on sait",
      items: [
        { key: 'Tite-Live, livres XXV–XXX', text: "Les années d'Hispanie, la guerre de succession, l'exil, Sophonisbe et Zama ; le résumé du livre L (Periochae) rapporte sa mort." },
        { key: 'Polybe, Histoires', text: "Témoin direct : il a rencontré le roi. Portrait de sa vigueur et de son œuvre agricole (XXXVI, 16) ; conflits avec Carthage (XXXI, 21)." },
        { key: 'Appien, Libyca', text: "L'éducation à Carthage, les empiètements des années 150, la succession réglée par Scipion Émilien (106)." },
        { key: 'Inscriptions de Dougga', text: "Textes libyques et puniques du IIe siècle : le nom MSNSN, la généalogie royale, le sanctuaire de 139." },
        { key: 'Salluste, Guerre de Jugurtha', text: "Le souvenir de Massinissa dans sa descendance, vu par un Romain du Ier siècle." }
      ]
    },
    legacy: {
      kicker: 'Héritage',
      title: 'Le premier grand roi d\'Afrique du Nord',
      intro: "Massinissa laisse un État numide unifié, puissant et allié de Rome — trop puissant, peut-être, au goût de Rome. Sa descendance et sa mémoire ont traversé les siècles.",
      items: [
        { key: 'Micipsa', text: "Seul roi après la mort de ses frères, il règne jusqu'en 118 depuis Cirta et continue l'œuvre de son père." },
        { key: 'Jugurtha', text: "Petit-fils de Massinissa par Mastanabal, il tient tête à Rome de 112 à 105 : Salluste en fait le récit." },
        { key: 'Algérie', text: "Figure fondatrice revendiquée par la mémoire nationale algérienne : statues, noms de rues, de villes et d'institutions." },
        { key: 'Mémoire amazighe', text: "Pour le mouvement amazigh, il incarne un pouvoir nord-africain autonome, antérieur à Rome." },
        { key: 'Tunisie', text: "Dougga, Makthar et le Nord-Ouest tunisien faisaient partie de son royaume ; sa figure appartient aussi à l'histoire tunisienne." }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Tite-Live', work: 'Histoire romaine', ref: 'XXV, 34 ; XXVII, 19 ; XXVIII, 35 ; XXIX, 29–33 ; XXX, 29', note: "Hispanie, guerre de succession, exil, Sophonisbe, Zama ; empiètements de 193" },
      { type: 'ancient', author: 'Tite-Live', work: 'Periochae', ref: 'L', note: "résumé du livre L : l'âge du roi et sa mort" },
      { type: 'ancient', author: 'Polybe', work: 'Histoires', ref: 'XXXI, 21 ; XXXVI, 16', note: 'témoin direct : vigueur du roi, œuvre agricole, conflits avec Carthage' },
      { type: 'ancient', author: 'Appien', work: 'Libyca', ref: '106', note: 'éducation à Carthage, empiètements des années 150, succession réglée par Scipion Émilien' },
      { type: 'ancient', author: 'Salluste', work: 'Guerre de Jugurtha', note: 'la descendance de Massinissa, jusqu’à Jugurtha' },
      { type: 'ancient', author: 'Inscriptions libyques et puniques de Dougga', ref: 'IIe s. av. J.-C.', note: 'le nom MSNSN, la généalogie royale, le sanctuaire de 139' },
      { type: 'modern', author: 'Stéphane Gsell', work: "Histoire ancienne de l'Afrique du Nord", ref: 'Hachette, 1913–1928', note: 'ouvrage de référence sur les royaumes numides (non cité nommément dans la page)' }
    ],
    more: {
      title: 'À lire aussi',
      items: [
        { to: '/prise-de-carthage', img: '/img/ruins.jpg', alt: 'Ruines de Carthage', kicker: '149 – 146 av. J.-C.', title: 'La prise de Carthage', text: 'Cinquante ans de pression numide, puis le siège final.' },
        { to: '/sophonisbe', img: '/img/sophonisba.jpg', alt: 'La Mort de Sophonisbe', kicker: '? – 203 av. J.-C.', title: 'Sophonisbe', text: 'Épouse de Syphax, puis de Massinissa, elle choisit le poison.' },
        { to: '/biographies', img: '/img/hamilcar.jpg', alt: 'Hamilcar Barca', kicker: 'Personnages', title: 'Toutes les biographies', text: 'Généraux, rois, navigateurs et reines.' }
      ]
    }
  },
  en: {
    meta: {
      title: 'Masinissa (c. 238 – 148 BC), king of Numidia',
      desc: "Masinissa, a Massylian prince raised in Carthage, fought for Carthage in Iberia, then for Rome at Zama; he united Numidia, ruled it for over fifty years from Cirta, and pressed relentlessly on Carthage."
    },
    hero: {
      chip: 'Biography · Numidia',
      dates: 'c. 238 – 148 BC',
      title: 'Masinissa',
      epithet: 'King of the Numidians — ally of Carthage, then of Rome',
      lede: "Educated in Carthage, he first fought for her in Iberia, went over to Rome in 206, decided the day at Zama, then ruled for over half a century a united, settled Numidia facing the Mediterranean. Carthage never had a more formidable neighbour.",
      alt: 'Numidian coin with a bearded, laureate head, attributed to Masinissa',
      caption: 'Numidian coin attributed to Masinissa — British Museum'
    },
    keys: [
      { n: '~90', t: 'years old at his death in 148: he still mounted his horse unaided (Polybius)' },
      { n: '54', t: 'years on the throne of Numidia, from 202 to 148' },
      { n: '4,000', t: 'Numidian horsemen at his side at Zama in 202 (Livy, XXX, 29)' },
      { n: '44', t: 'sons, according to an ancient tradition: the figure varies between authors' }
    ],
    intro: {
      kicker: 'A Massylian prince',
      title: 'Raised in Carthage',
      paras: [
        "Masinissa was the son of Gaia, king of the Massyli, the eastern Numidian people whose land bordered Carthage's. To the west ruled Syphax, king of the Masaesyli. According to Appian, the young prince was educated in Carthage, like other sons of the Numidian nobility: he knew its language, its customs and its great families.",
        "This Punic education was no mere detail. Throughout his life Masinissa ruled like a Mediterranean monarch, with Punic as the language of administration and royal inscriptions — while turning against Carthage what he had learned there."
      ],
      tags: ['People: Massyli', 'Father: Gaia', 'Capital: Cirta'],
      nameKicker: 'His name',
      name: 'MSNSN',
      nameText: 'This is how the Punic inscriptions of Dougga spell his name. Greeks and Romans made it Massanasses, Masinissa or Massinissa. Its meaning, sometimes linked to Berber, remains a hypothesis.'
    },
    life: {
      kicker: 'Timeline',
      title: 'A life of ninety years',
      rows: [
        { key: 'c. 238', title: 'Birth', text: 'Son of the Massylian king Gaia. Livy (Periochae, 50) says he was over ninety when he died.' },
        { key: '212 – 206', title: "In Carthage's service", text: 'At the head of the Numidian cavalry, he fought in Iberia alongside the Carthaginian generals. In 211 his horsemen helped defeat and kill the two Scipios, Publius and Gnaeus (Livy, XXV, 34).' },
        { key: '206', title: 'Ilipa, then the switch', text: 'After the Carthaginian defeat at Ilipa, he met the Roman Silanus in secret, then Scipio, who had sent back his nephew Massiva, captured in 209, without ransom (Livy, XXVII, 19; XXVIII, 35).' },
        { key: 'c. 206 – 205', title: 'A kingdom lost', text: 'Gaia died; the succession was torn between his brother Oezalces and his nephews. Masinissa regained power, but Syphax, bound to Carthage by his marriage to Sophonisba, drove him out. Hunted, he survived in the mountains with a handful of horsemen (Livy, XXIX, 29–33).' },
        { key: '204', title: 'With Scipio in Africa', text: 'He joined the Roman army that had landed near Utica.' },
        { key: '203', title: 'Cirta and Sophonisba', text: 'Victory at the Great Plains; Syphax was captured and Cirta surrendered. Masinissa married Sophonisba, then, ordered by Scipio to hand her over, sent her poison. Scipio hailed him as king.' },
        { key: '202', title: 'Zama', text: "He commanded the Roman right wing with some 6,000 infantry and 4,000 cavalry. His horsemen, returning on Hannibal's rear, finished the battle." },
        { key: '201', title: 'Recognised king', text: 'The peace treaty granted him his kingdom and the lands "of his ancestors", without fixing their limits.' },
        { key: '201 – 148', title: 'The reign', text: "Master of the Massyli and most of Syphax's kingdom, he united Numidia from Cirta, developed farming and towns, and nibbled away at Carthage's territory." },
        { key: '150', title: 'War with Carthage', text: 'Pushed to the limit, Carthage took up arms against him; its army was surrounded and destroyed. Rome found in this the pretext for the Third Punic War.' },
        { key: '148', title: 'Death', text: 'He died early in the siege of Carthage. At his request, Scipio Aemilianus settled the succession among his three legitimate sons.' }
      ]
    },
    war: {
      title: 'Between Carthage and Rome',
      aside: "Three moments, three alliances: Masinissa's choice of side always followed the interests of his kingdom.",
      items: [
        { tone: 'tile--sand', kicker: 'Iberia · 212 – 206', title: "Carthage's horseman", text: 'For six years he served Carthage in Iberia. His light cavalry harried the Romans, and Livy gives him a part in the disaster of the Scipios in 211. He was still in the Punic camp at Ilipa.' },
        { tone: 'tile--purple', kicker: 'Numidia · 206 – 203', title: 'The rivalry with Syphax', text: "Carthage backed the more powerful Syphax and sealed the alliance with the marriage of Sophonisba, daughter of Hasdrubal son of Gisco. Sidelined, Masinissa had no card left but Rome. The Sophonisba episode of 203 shows how far he depended on Scipio.", to: '/sophonisbe', cta: 'Sophonisba' },
        { tone: 'tile--ink', kicker: 'Africa · 202', title: 'Zama', text: "Against Hannibal, the Numidian cavalry, usually Carthage's weapon, fought this time for Rome. Masinissa and Laelius scattered the enemy horse, then came back to strike the Punic infantry from behind.", to: '/hannibal', cta: 'Hannibal' }
      ]
    },
    realm: {
      title: 'Building a kingdom',
      aside: "Over fifty years of rule: what the sources remember of Masinissa's Numidia.",
      alt: 'The Rhumel gorge and the old town of Constantine, ancient Cirta',
      caption: 'Cirta (Constantine), the capital: a rock ringed by the Rhumel gorge.',
      items: [
        { tone: 'tile--olive', kicker: 'Cirta', title: 'A royal capital', text: "Once Syphax's stronghold, Cirta became the centre of the united kingdom. Greek and Italian traders settled there; the city long kept a Punic culture." },
        { tone: '', kicker: 'Farming', title: 'From herders to farmers', text: 'Polybius credits him with showing that Numidia, thought barren, could grow every crop; he is said to have given each of his sons large estates. Historians qualify this: Numidian farming predates him, but he encouraged it.' },
        { tone: 'tile--gold', kicker: 'Coinage', title: 'A royal coinage', text: 'Bronzes with a bearded, laureate head on the obverse and a horse on the reverse, bearing Punic letters, are attributed to Masinissa or his successors. The precise attribution of the issues is still debated.' },
        { tone: 'tile--sand', kicker: 'Hellenisation', title: 'A Mediterranean king', text: 'He sent grain to Greece; statues were dedicated to him on Delos. One of his sons, Mastanabal, won a chariot race at the Panathenaic Games in Athens. The court spoke Punic and looked towards the Hellenistic world.' }
      ]
    },
    quote: {
      kicker: 'Polybius, who met him',
      tr: 'His greatest and most admirable achievement was this: whereas all Numidia had until then been thought barren and unable to produce cultivated crops, he was the first and only one to show that it could produce them all, as well as any other land.',
      cite: 'Polybius, Histories, XXXVI, 16 (adapted translation)'
    },
    carthage: {
      kicker: 'Facing Carthage · 201 – 150',
      title: 'The neighbour who ate into Carthage',
      paras: [
        'The treaty of 201 forbade Carthage any war without Rome\'s consent and let Masinissa claim the lands "of his ancestors". For half a century he made the most of it: the Emporia of the Lesser Syrtis, then the Thugga region and the Great Plains came under his control, and Rome, called to arbitrate, almost always found in his favour.',
        'This long pressure, down to the war of 150 that gave Rome its pretext, is told in detail on the page devoted to the fall of Carthage.'
      ],
      cta: 'Masinissa and the fall of Carthage',
      rowsKicker: 'In brief',
      rows: [
        { k: '193', v: 'First encroachments on the Emporia (Livy).' },
        { k: '162 – 161', v: 'Rome rules for him over the Emporia (Polybius).' },
        { k: '153 – 152', v: 'The Great Plains, the Thugga region (Appian).' },
        { k: '150', v: 'Carthage takes up arms; its army is wiped out.' }
      ]
    },
    tomb: {
      title: 'Death and tombs',
      aside: 'Where does Masinissa lie? No tomb can be attributed to him with certainty.',
      kicker: 'Succession · 148',
      subtitle: 'A kingdom shared three ways',
      paras: [
        'Masinissa died in 148, while the legions were besieging Carthage. He had many children — Livy reports that he fathered one more after the age of eighty-six (Periochae, 50). Scipio Aemilianus, entrusted with the settlement, divided power among his three legitimate sons: Micipsa received Cirta and the government, Gulussa war, Mastanabal justice (Appian, Libyca, 106).',
        'The cult of the dead king is attested: at Dougga, a bilingual Libyan and Punic inscription records the building, in 139, of a sanctuary dedicated to Masinissa, in the tenth year of Micipsa\'s reign.'
      ],
      douggaAlt: 'The Libyco-Punic mausoleum of Dougga, a storeyed tower topped by a pyramid',
      douggaCap: 'Libyco-Punic mausoleum of Dougga (2nd c. BC): a Numidian princely monument.',
      medAlt: 'The Medracen, a large circular stepped tomb near Batna',
      medCap: 'The Medracen (Algeria), a Numidian royal tomb well before Masinissa.',
      debateKicker: 'Disputed attribution',
      debateTitle: 'Whose tomb?',
      debate: "The Dougga mausoleum bore a bilingual inscription, now in the British Museum, naming one Ateban, son of Iepmatath: it is most often seen as the tomb of a Numidian prince, and the idea of a cenotaph of Masinissa is unproven. Near Cirta, the Soumâa of El Khroub has been proposed as the tomb of Masinissa or Micipsa, again without decisive proof. The older Medracen shows that Numidian kings were already building great tombs before him."
    },
    sourcesNote: {
      kicker: 'Sources',
      title: 'Where our knowledge comes from',
      items: [
        { key: 'Livy, books XXV–XXX', text: 'The Iberian years, the succession war, exile, Sophonisba and Zama; the summary of book L (Periochae) records his death.' },
        { key: 'Polybius, Histories', text: 'An eyewitness: he met the king. A portrait of his vigour and his farming work (XXXVI, 16); disputes with Carthage (XXXI, 21).' },
        { key: 'Appian, Libyca', text: 'His education in Carthage, the encroachments of the 150s, the succession settled by Scipio Aemilianus (106).' },
        { key: 'Inscriptions of Dougga', text: 'Libyan and Punic texts of the 2nd century: the name MSNSN, the royal genealogy, the sanctuary of 139.' },
        { key: 'Sallust, The Jugurthine War', text: "Masinissa's memory among his descendants, seen by a Roman of the 1st century." }
      ]
    },
    legacy: {
      kicker: 'Legacy',
      title: 'The first great king of North Africa',
      intro: 'Masinissa left a united, powerful Numidian state allied to Rome — too powerful, perhaps, for Rome\'s liking. His descendants and his memory have come down the centuries.',
      items: [
        { key: 'Micipsa', text: 'Sole king after his brothers died, he ruled from Cirta until 118 and carried on his father\'s work.' },
        { key: 'Jugurtha', text: "Masinissa's grandson through Mastanabal, he defied Rome from 112 to 105: Sallust tells the story." },
        { key: 'Algeria', text: 'A founding figure claimed by Algerian national memory: statues, and names of streets, towns and institutions.' },
        { key: 'Amazigh memory', text: 'For the Amazigh movement, he embodies an autonomous North African power older than Rome.' },
        { key: 'Tunisia', text: 'Dougga, Mactaris and north-western Tunisia were part of his kingdom; his figure also belongs to Tunisian history.' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Livy', work: 'History of Rome', ref: 'XXV, 34; XXVII, 19; XXVIII, 35; XXIX, 29–33; XXX, 29', note: 'Iberia, the succession war, exile, Sophonisba, Zama; the encroachments of 193' },
      { type: 'ancient', author: 'Livy', work: 'Periochae', ref: 'L', note: "summary of book 50: the king's age and death" },
      { type: 'ancient', author: 'Polybius', work: 'Histories', ref: 'XXXI, 21; XXXVI, 16', note: "eyewitness: the king's vigour, his farming work, disputes with Carthage" },
      { type: 'ancient', author: 'Appian', work: 'Libyca', ref: '106', note: 'education in Carthage, the encroachments of the 150s, the succession settled by Scipio Aemilianus' },
      { type: 'ancient', author: 'Sallust', work: 'The Jugurthine War', note: "Masinissa's descendants, down to Jugurtha" },
      { type: 'ancient', author: 'Libyan and Punic inscriptions of Dougga', ref: '2nd c. BC', note: 'the name MSNSN, the royal genealogy, the sanctuary of 139' },
      { type: 'modern', author: 'Stéphane Gsell', work: "Histoire ancienne de l'Afrique du Nord", ref: 'Hachette, 1913–1928', note: 'standard work on the Numidian kingdoms (not named in the page)' }
    ],
    more: {
      title: 'Read also',
      items: [
        { to: '/prise-de-carthage', img: '/img/ruins.jpg', alt: 'Ruins of Carthage', kicker: '149 – 146 BC', title: 'The fall of Carthage', text: 'Fifty years of Numidian pressure, then the final siege.' },
        { to: '/sophonisbe', img: '/img/sophonisba.jpg', alt: 'The Death of Sophonisba', kicker: '? – 203 BC', title: 'Sophonisba', text: 'Wife of Syphax, then of Masinissa, she chose poison.' },
        { to: '/biographies', img: '/img/hamilcar.jpg', alt: 'Hamilcar Barca', kicker: 'People', title: 'All biographies', text: 'Generals, kings, navigators and queens.' }
      ]
    }
  },
  ar: {
    meta: {
      title: 'ماسينيسا (نحو 238 – 148 ق.م)، ملك نوميديا',
      desc: 'ماسينيسا، أمير ماسيلي نشأ في قرطاج، قاتل لأجلها في إيبيريا ثم لأجل روما في زاما، ووحّد نوميديا وحكمها أكثر من خمسين عامًا من سيرتا، وضغط على قرطاج بلا هوادة.'
    },
    hero: {
      chip: 'سيرة · نوميديا',
      dates: 'نحو 238 – 148 ق.م',
      title: 'ماسينيسا',
      epithet: 'ملك النوميديين — حليف قرطاج ثم حليف روما',
      lede: 'تلقّى تعليمه في قرطاج وقاتل لأجلها أولًا في إيبيريا، ثم انحاز إلى روما سنة 206 وحسم معركة زاما، وحكم بعد ذلك أكثر من نصف قرن نوميديا موحّدة مستقرة منفتحة على المتوسط. لم يكن لقرطاج جار أخطر منه.',
      alt: 'قطعة نقدية نوميدية برأس ملتحٍ مكلل بالغار، تُنسب إلى ماسينيسا',
      caption: 'قطعة نقدية نوميدية تُنسب إلى ماسينيسا — المتحف البريطاني'
    },
    keys: [
      { n: '~90', t: 'عامًا عند وفاته سنة 148: وكان لا يزال يمتطي فرسه دون عون (بوليبيوس)' },
      { n: '54', t: 'عامًا على عرش نوميديا، من 202 إلى 148' },
      { n: '4000', t: 'فارس نوميدي إلى جانبه في زاما سنة 202 (ليفيوس، 30، 29)' },
      { n: '44', t: 'ابنًا بحسب رواية قديمة: والعدد يختلف من مؤلف إلى آخر' }
    ],
    intro: {
      kicker: 'أمير ماسيلي',
      title: 'نشأ في قرطاج',
      paras: [
        'ماسينيسا ابن غايا، ملك الماسيليين، الشعب النوميدي الشرقي المتاخمة أرضه لأرض قرطاج. وفي الغرب كان يحكم سيفاكس ملك الماسيسيليين. وحسب أبيانوس، تلقّى الأمير الشاب تعليمه في قرطاج كغيره من أبناء الأرستقراطية النوميدية: فعرف لغتها وعاداتها وكبرى عائلاتها.',
        'ولم يكن هذا التعليم البونيقي تفصيلًا عابرًا. فقد حكم ماسينيسا طوال حياته على طريقة ملوك المتوسط، واتخذ البونيقية لغةً للإدارة والنقوش الملكية — مع أنه وجّه ضد قرطاج ما تعلّمه فيها.'
      ],
      tags: ['الشعب: الماسيليون', 'الأب: غايا', 'العاصمة: سيرتا'],
      nameKicker: 'اسمه',
      name: 'MSNSN',
      nameText: 'هكذا يُكتب اسمه في النقوش البونيقية بدقة. وجعله الإغريق واللاتين ماسانَسِّس أو ماسينيسا. أما معناه، الذي يُقرَّب أحيانًا من الأمازيغية، فيبقى فرضية.'
    },
    life: {
      kicker: 'التسلسل الزمني',
      title: 'حياة امتدت تسعين عامًا',
      rows: [
        { key: 'نحو 238', title: 'المولد', text: 'ابن الملك الماسيلي غايا. ويذكر ليفيوس (الملخصات، 50) أنه تجاوز التسعين عند وفاته.' },
        { key: '212 – 206', title: 'في خدمة قرطاج', text: 'على رأس الفرسان النوميديين، قاتل في إيبيريا إلى جانب القادة القرطاجيين. وفي سنة 211 أسهم فرسانه في هزيمة الأخوين سكيبيو، بوبليوس وغنايوس، ومقتلهما (ليفيوس، 25، 34).' },
        { key: '206', title: 'إيليبا ثم التحوّل', text: 'بعد هزيمة القرطاجيين في إيليبا، التقى سرًّا بالروماني سيلانوس ثم بسكيبيو، الذي كان قد أعاد إليه دون فدية ابنَ أخيه ماسيفا الذي أُسر سنة 209 (ليفيوس، 27، 19؛ 28، 35).' },
        { key: 'نحو 206 – 205', title: 'مملكة ضائعة', text: 'مات غايا، فتمزّقت الخلافة بين أخيه أوزالكيس وأبناء إخوته. استعاد ماسينيسا السلطة، لكن سيفاكس، المرتبط بقرطاج بزواجه من صوفونيسبا، طرده. فنجا مطارَدًا في الجبال مع قلة من الفرسان (ليفيوس، 29، 29–33).' },
        { key: '204', title: 'مع سكيبيو في إفريقيا', text: 'انضم إلى الجيش الروماني الذي نزل قرب أوتيكا.' },
        { key: '203', title: 'سيرتا وصوفونيسبا', text: 'نصر السهول الكبرى؛ أُسر سيفاكس واستسلمت سيرتا. تزوّج ماسينيسا صوفونيسبا، ثم لما أمره سكيبيو بتسليمها أرسل إليها السم. وحيّاه سكيبيو بلقب الملك.' },
        { key: '202', title: 'زاما', text: 'قاد الجناح الأيمن الروماني بنحو 6000 راجل و4000 فارس. وعاد فرسانه إلى مؤخرة جيش حنبعل فحسموا المعركة.' },
        { key: '201', title: 'ملك معترف به', text: 'اعترفت له معاهدة الصلح بمملكته وبأراضي «أجداده» دون أن ترسم حدودها.' },
        { key: '201 – 148', title: 'العهد', text: 'سيّدًا على الماسيليين ومعظم مملكة سيفاكس، وحّد نوميديا انطلاقًا من سيرتا، وطوّر الزراعة والمدن، وقضم أراضي قرطاج.' },
        { key: '150', title: 'الحرب مع قرطاج', text: 'ضاقت قرطاج ذرعًا فحملت السلاح ضده؛ فحوصر جيشها وأُبيد. ووجدت روما في ذلك ذريعة الحرب البونيقية الثالثة.' },
        { key: '148', title: 'الوفاة', text: 'توفي في بداية حصار قرطاج. وبطلب منه، نظّم سكيبيو إيميليانوس الخلافة بين أبنائه الشرعيين الثلاثة.' }
      ]
    },
    war: {
      title: 'بين قرطاج وروما',
      aside: 'ثلاث لحظات وثلاثة تحالفات: كان اختيار ماسينيسا لمعسكره يتبع دائمًا مصالح مملكته.',
      items: [
        { tone: 'tile--sand', kicker: 'إيبيريا · 212 – 206', title: 'فارس قرطاج', text: 'خدم قرطاج ست سنوات في إيبيريا. وكان فرسانه الخفاف يُنهكون الرومان، وينسب إليه ليفيوس دورًا في كارثة آل سكيبيو سنة 211. وكان لا يزال في المعسكر البونيقي في إيليبا.' },
        { tone: 'tile--purple', kicker: 'نوميديا · 206 – 203', title: 'التنافس مع سيفاكس', text: 'راهنت قرطاج على سيفاكس الأقوى، وختمت التحالف بزواجه من صوفونيسبا ابنة حسدربعل بن جسكون. فلم يبق لماسينيسا المُقصى إلا ورقة روما. وتكشف قصة صوفونيسبا سنة 203 مدى تبعيته لسكيبيو.', to: '/sophonisbe', cta: 'صوفونيسبا' },
        { tone: 'tile--ink', kicker: 'إفريقيا · 202', title: 'زاما', text: 'في مواجهة حنبعل، قاتل الفرسان النوميديون، سلاح قرطاج المعتاد، هذه المرة لصالح روما. فشتّت ماسينيسا وليليوس فرسان الخصم ثم عادا يضربان المشاة البونيقيين من الخلف.', to: '/hannibal', cta: 'حنبعل' }
      ]
    },
    realm: {
      title: 'بناء مملكة',
      aside: 'أكثر من خمسين عامًا من الحكم: ما تحفظه المصادر عن نوميديا ماسينيسا.',
      alt: 'خوانق وادي الرمال والمدينة القديمة في قسنطينة، سيرتا القديمة',
      caption: 'سيرتا (قسنطينة)، العاصمة: صخرة تطوّقها خوانق وادي الرمال.',
      items: [
        { tone: 'tile--olive', kicker: 'سيرتا', title: 'عاصمة ملكية', text: 'كانت سيرتا معقل سيفاكس، فصارت مركز المملكة الموحّدة. واستقر فيها تجار إغريق وإيطاليون، واحتفظت المدينة طويلًا بثقافة بونيقية.' },
        { tone: '', kicker: 'الزراعة', title: 'من الرعاة إلى الفلاحين', text: 'ينسب إليه بوليبيوس أنه أثبت أن نوميديا، التي كانت تُعدّ عقيمة، قادرة على إنبات كل المحاصيل، وأنه منح كل واحد من أبنائه ضيعات واسعة. ويُنسّب المؤرخون ذلك: فالزراعة النوميدية أقدم منه، لكنه شجّعها.' },
        { tone: 'tile--gold', kicker: 'النقود', title: 'سكّة ملكية', text: 'تُنسب إلى ماسينيسا أو إلى خلفائه قطع برونزية تحمل على الوجه رأسًا ملتحيًا مكللًا بالغار، وعلى الظهر فرسًا، مع حروف بونيقية. ولا يزال التحديد الدقيق للإصدارات موضع نقاش.' },
        { tone: 'tile--sand', kicker: 'التأثر الهلنستي', title: 'ملك متوسطي', text: 'أرسل القمح إلى بلاد الإغريق، وأُقيمت له تماثيل في ديلوس. وفاز أحد أبنائه، مستنبعل، بسباق عربات في الألعاب الباناثينية بأثينا. وكان البلاط يتكلم البونيقية ويتطلع إلى العالم الهلنستي.' }
      ]
    },
    quote: {
      kicker: 'بوليبيوس، الذي التقاه',
      tr: 'كان أعظم إنجازاته وأجدرها بالإعجاب هذا: بينما كانت نوميديا كلها تُعدّ حتى ذلك الحين عقيمة عاجزة عن إنتاج الثمار المزروعة، كان أول من أثبت، ووحده، أنها قادرة على إنتاجها جميعًا كأي بلد آخر.',
      cite: 'بوليبيوس، التواريخ، 36، 16 (ترجمة بتصرف)'
    },
    carthage: {
      kicker: 'في مواجهة قرطاج · 201 – 150',
      title: 'الجار الذي قضم قرطاج',
      paras: [
        'منعت معاهدة 201 قرطاجَ من أي حرب دون موافقة روما، وأتاحت لماسينيسا المطالبة بأراضي «أجداده». فاستغل ذلك نصف قرن: انتقلت إلى سيطرته الإمبوريا على خليج سرت الصغير، ثم منطقة دقة والسهول الكبرى، وكانت روما، حين يُحتكم إليها، تقضي له في الغالب.',
        'هذا الضغط الطويل، حتى حرب 150 التي منحت روما ذريعتها، مروي بالتفصيل في الصفحة المخصصة لسقوط قرطاج.'
      ],
      cta: 'ماسينيسا وسقوط قرطاج',
      rowsKicker: 'الأساسي',
      rows: [
        { k: '193', v: 'أولى التعديات على الإمبوريا (ليفيوس).' },
        { k: '162 – 161', v: 'روما تحكم له في شأن الإمبوريا (بوليبيوس).' },
        { k: '153 – 152', v: 'السهول الكبرى ومنطقة دقة (أبيانوس).' },
        { k: '150', v: 'قرطاج تحمل السلاح؛ وجيشها يُباد.' }
      ]
    },
    tomb: {
      title: 'الوفاة والأضرحة',
      aside: 'أين يرقد ماسينيسا؟ لا يُنسب إليه أي ضريح على وجه اليقين.',
      kicker: 'الخلافة · 148',
      subtitle: 'مملكة مقسومة على ثلاثة',
      paras: [
        'توفي ماسينيسا سنة 148 بينما كانت الفيالق تحاصر قرطاج. وكان له أبناء كثيرون — ويروي ليفيوس أنه أنجب ولدًا بعد السادسة والثمانين (الملخصات، 50). فقسّم سكيبيو إيميليانوس، المكلّف بالتسوية، السلطة بين أبنائه الشرعيين الثلاثة: نال ميكيبسا سيرتا والحكم، وغولوسا الحرب، ومستنبعل القضاء (أبيانوس، ليبيكا، 106).',
        'وعبادة الملك الراحل ثابتة: ففي دقة يخلّد نقش مزدوج اللغة، ليبي وبونيقي، بناءَ معبد مخصص لماسينيسا سنة 139، في السنة العاشرة من حكم ميكيبسا.'
      ],
      douggaAlt: 'الضريح الليبي البونيقي في دقة، برج متعدد الطوابق تعلوه هرم',
      douggaCap: 'الضريح الليبي البونيقي في دقة (القرن 2 ق.م): معلم أميري نوميدي.',
      medAlt: 'إمدغاسن، ضريح دائري كبير مدرّج قرب باتنة',
      medCap: 'إمدغاسن (الجزائر)، ضريح ملكي نوميدي أقدم من ماسينيسا بكثير.',
      debateKicker: 'نسبة موضع نقاش',
      debateTitle: 'ضريح مَن؟',
      debate: 'كان ضريح دقة يحمل نقشًا مزدوج اللغة، محفوظًا اليوم في المتحف البريطاني، يذكر شخصًا يُدعى أتبان بن يفمتات: ويُرى فيه غالبًا ضريح أمير نوميدي، أما فرضية النُّصب التذكاري لماسينيسا فغير مثبتة. وقرب سيرتا اقتُرح «صومعة الخروب» ضريحًا لماسينيسا أو لميكيبسا، دون دليل حاسم هنا أيضًا. ويُظهر إمدغاسن الأقدم أن الملكية النوميدية كانت تشيّد أضرحة كبرى قبله.'
    },
    sourcesNote: {
      kicker: 'المصادر',
      title: 'من أين نعرف ما نعرف',
      items: [
        { key: 'ليفيوس، الكتب 25–30', text: 'سنوات إيبيريا، وحرب الخلافة، والمنفى، وصوفونيسبا وزاما؛ ويروي ملخص الكتاب 50 وفاته.' },
        { key: 'بوليبيوس، التواريخ', text: 'شاهد مباشر التقى الملك. صورة لحيويته ولعمله الزراعي (36، 16)؛ والنزاعات مع قرطاج (31، 21).' },
        { key: 'أبيانوس، ليبيكا', text: 'تعليمه في قرطاج، وتعديات الخمسينيات من القرن 2 ق.م، والخلافة التي نظّمها سكيبيو إيميليانوس (106).' },
        { key: 'نقوش دقة', text: 'نصوص ليبية وبونيقية من القرن 2 ق.م: الاسم MSNSN، والنسب الملكي، ومعبد سنة 139.' },
        { key: 'سالوستيوس، حرب يوغرطة', text: 'ذكرى ماسينيسا في ذريته، بعين روماني من القرن الأول ق.م.' }
      ]
    },
    legacy: {
      kicker: 'الإرث',
      title: 'أول ملك كبير في شمال إفريقيا',
      intro: 'ترك ماسينيسا دولة نوميدية موحّدة قوية حليفة لروما — وربما أقوى مما تريده روما. وعبرت ذريته وذكراه القرون.',
      items: [
        { key: 'ميكيبسا', text: 'انفرد بالملك بعد وفاة أخويه، فحكم من سيرتا حتى سنة 118 وواصل عمل أبيه.' },
        { key: 'يوغرطة', text: 'حفيد ماسينيسا من مستنبعل، تحدّى روما من 112 إلى 105: وقد روى سالوستيوس قصته.' },
        { key: 'الجزائر', text: 'شخصية مؤسِّسة تستحضرها الذاكرة الوطنية الجزائرية: تماثيل وأسماء شوارع ومدن ومؤسسات.' },
        { key: 'الذاكرة الأمازيغية', text: 'يجسّد في نظر الحركة الأمازيغية سلطة شمال إفريقية مستقلة أقدم من روما.' },
        { key: 'تونس', text: 'كانت دقة ومكثر والشمال الغربي التونسي جزءًا من مملكته؛ فشخصيته تنتمي أيضًا إلى التاريخ التونسي.' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'تيتوس ليفيوس', work: 'تاريخ روما', ref: '25، 34؛ 27، 19؛ 28، 35؛ 29، 29–33؛ 30، 29', note: 'إيبيريا وحرب الخلافة والمنفى وصوفونيسبا وزاما؛ وتعديات سنة 193' },
      { type: 'ancient', author: 'تيتوس ليفيوس', work: 'الملخصات', ref: '50', note: 'ملخص الكتاب 50: عمر الملك ووفاته' },
      { type: 'ancient', author: 'بوليبيوس', work: 'التواريخ', ref: '31، 21؛ 36، 16', note: 'شاهد مباشر: حيوية الملك وعمله الزراعي ونزاعاته مع قرطاج' },
      { type: 'ancient', author: 'أبيانوس', work: 'ليبيكا', ref: '106', note: 'تعليمه في قرطاج، وتعديات الخمسينيات من القرن 2 ق.م، والخلافة التي نظّمها سكيبيو إيميليانوس' },
      { type: 'ancient', author: 'سالوستيوس', work: 'حرب يوغرطة', note: 'ذرية ماسينيسا حتى يوغرطة' },
      { type: 'ancient', author: 'النقوش الليبية والبونيقية في دقة', ref: 'القرن 2 ق.م', note: 'الاسم MSNSN، والنسب الملكي، ومعبد سنة 139' },
      { type: 'modern', author: 'Stéphane Gsell', work: "Histoire ancienne de l'Afrique du Nord", ref: 'Hachette, 1913–1928', note: 'مرجع أساسي عن الممالك النوميدية (غير مذكور بالاسم في الصفحة)' }
    ],
    more: {
      title: 'اقرأ أيضًا',
      items: [
        { to: '/prise-de-carthage', img: '/img/ruins.jpg', alt: 'أطلال قرطاج', kicker: '149 – 146 ق.م', title: 'سقوط قرطاج', text: 'خمسون عامًا من الضغط النوميدي، ثم الحصار الأخير.' },
        { to: '/sophonisbe', img: '/img/sophonisba.jpg', alt: 'موت صوفونيسبا', kicker: '؟ – 203 ق.م', title: 'صوفونيسبا', text: 'زوجة سيفاكس ثم ماسينيسا، اختارت السم.' },
        { to: '/biographies', img: '/img/hamilcar.jpg', alt: 'حملقار برقا', kicker: 'الشخصيات', title: 'كل السير', text: 'قادة وملوك وملاحون وملكات.' }
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
.hero-top { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 12px 16px; }
.hero-phoen { font-size: clamp(22px, 2.4vw, 34px); color: var(--gold-light); opacity: 0.85; }
.dates { font: 700 14px/1.3 var(--font-body); margin-bottom: 14px; color: var(--gold-light) !important; }
.bio-title { font-size: clamp(44px, 6vw, 92px); overflow-wrap: anywhere; }
.epithet { font: 700 clamp(16px, 1.4vw, 20px)/1.35 var(--font-display); margin-block: 8px 14px; color: var(--white) !important; }
.hero-fig { min-height: clamp(380px, 42vw, 580px); }

.keyfigs { margin-top: var(--gap); }
.keyfig .body { margin-top: 6px; font-size: 14px; }

.block-h { margin-bottom: clamp(18px, 2vw, 28px); }
.block-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.para + .para { margin-top: 12px; }
.name-big { font: 900 clamp(34px, 3.6vw, 52px)/1 var(--font-display); letter-spacing: 0.04em; margin-bottom: 14px; overflow-wrap: anywhere; }
.rows .val b { font-weight: 700; }
.src-key { font-size: clamp(17px, 1.5vw, 20px) !important; line-height: 1.2 !important; }

.war-h { margin-block: 8px 12px; }
.war-btn { align-self: flex-start; margin-top: 18px; min-height: 44px; }
.cta-light { align-self: flex-start; margin-top: 18px; min-height: 44px; }

.cirta-fig { min-height: 480px; }
.realm-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--gap); }
.realm-h { margin-block: 8px 10px; }

.quote blockquote { margin-block: 6px 14px; }
.q-tr { font: 800 clamp(20px, 2.1vw, 30px)/1.3 var(--font-display); color: var(--ink) !important; max-width: 1000px; }
.q-cite { font: 600 13px/1.4 var(--font-body); color: var(--muted); }

.tomb-h { margin-block: 8px 12px; }
.dougga-fig { min-height: 460px; }
.medracen-fig { min-height: 340px; }

.leg-intro { max-width: 760px; margin-bottom: 28px; }
.leg-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 22px 24px; }
.leg { border-top: 1px solid rgba(255, 255, 255, 0.22); padding-top: 14px; }
.leg-key { font: 800 18px/1.2 var(--font-display); margin-bottom: 6px; color: var(--gold-light); }

@media (max-width: 1100px) {
  .leg-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 960px) {
  .hero-fig { min-height: clamp(260px, 60vw, 460px); }
  .cirta-fig, .dougga-fig { min-height: 360px; }
  .medracen-fig { min-height: 260px; }
}

@media (max-width: 640px) {
  .leg-grid, .realm-grid { grid-template-columns: minmax(0, 1fr); }
  .cirta-fig, .dougga-fig { min-height: 300px; }
  .keyfig { padding: 18px; }
}
</style>
