<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--ink tile--stack tile--hero s-7">
        <span class="chip chip--terra">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-5" style="background:#5E574F">
        <img src="/img/punic-quarter.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Chiffres -->
    <div class="cols cols-4 keep-2">
      <div v-for="(s, i) in c.stats" :key="i" class="tile stat">
        <div class="num" :style="i === 0 ? { color: '#B8492A' } : null">{{ s.n }}</div>
        <p class="stat-text">{{ s.t }}</p>
      </div>
    </div>

    <!-- Carthago delenda est -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--paper tile--outline">
          <span class="kicker">{{ c.cato.kicker }}</span>
          <blockquote class="quote">
            <p lang="la">« Carthago delenda est »</p>
          </blockquote>
          <p class="body-lg cato-text">{{ c.cato.text }}</p>
        </div>
        <div class="tile tile--xl tile--purple tile--stack">
          <div>
            <span class="kicker">{{ c.myth.kicker }}</span>
            <h2 class="h-block myth-title">{{ c.myth.title }}</h2>
            <p class="body-lg">{{ c.myth.text }}</p>
          </div>
          <NuxtLink :to="localePath('/histoire-des-vainqueurs')" class="btn btn-outline">{{ c.myth.cta }} →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Massinissa -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.massi.title }}</h2>
        <p>{{ c.massi.intro }}</p>
      </div>
      <div class="cols cols-5-7 cols--flush">
        <div class="massi-side">
          <figure class="fig massi-fig">
            <img src="/img/massinissa.jpg" :alt="c.massi.alt" loading="lazy">
            <figcaption>{{ c.massi.caption }}</figcaption>
          </figure>
          <div class="tile tile--terra">
            <span class="kicker">{{ c.massi.whyKicker }}</span>
            <h3 class="h-card">{{ c.massi.whyTitle }}</h3>
            <p class="body">{{ c.massi.why }}</p>
          </div>
        </div>
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.massi.rowsKicker }}</span>
          <div class="rows" style="--row-key:132px">
            <div v-for="(r, i) in c.massi.rows" :key="i">
              <span class="key">{{ r.k }}</span>
              <span class="val">{{ r.v }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="cols cols-2 cols--flush massi-foot">
        <div class="tile tile--paper">
          <span class="kicker">{{ c.massi.hannibalKicker }}</span>
          <p class="body">{{ c.massi.hannibal }}</p>
        </div>
        <div class="tile tile--paper">
          <span class="kicker">{{ c.massi.romeKicker }}</span>
          <p class="body">{{ c.massi.rome }}</p>
        </div>
      </div>
    </section>

    <!-- Les défenses de Carthage -->
    <section id="defenses" class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.def.title }}</h2>
        <p>{{ c.def.intro }}</p>
      </div>
      <div class="cols cols-7-5 cols--flush">
        <figure class="tile tile--xl tile--paper def-map">
          <svg class="def-svg" viewBox="0 0 640 420" role="img" :aria-label="c.def.map.aria" dir="ltr">
            <rect width="640" height="420" fill="#D6E0EC" />
            <path d="M0,0 H120 C135,60 130,110 150,160 L150,330 L240,330 L240,420 H0 Z" fill="#EFE6D6" />
            <path d="M120,168 C190,160 230,120 290,85 C360,45 450,40 520,70 C580,95 610,160 600,220 C592,270 560,305 520,330 C490,345 470,350 450,352 C380,348 300,335 240,325 C200,320 170,318 120,318 Z" fill="#EFE6D6" />
            <path d="M104,420 C112,368 150,326 240,324 C320,330 400,346 452,354 C468,378 470,400 462,420 Z" fill="#BFD1E4" />
            <path d="M446,350 C470,364 480,394 472,420 L490,420 C497,390 488,360 468,344 Z" fill="#EFE6D6" />
            <!-- Mur de mer -->
            <path d="M290,85 C360,45 450,40 520,70 C580,95 610,160 600,220 C592,270 560,305 520,330 C490,345 470,350 450,352" fill="none" stroke="#6E1E47" stroke-width="3" stroke-dasharray="7 5" />
            <!-- Triple ligne de l'isthme -->
            <line x1="200" y1="150" x2="200" y2="321" stroke="#B8492A" stroke-width="3" stroke-dasharray="3 4" />
            <line x1="216" y1="142" x2="216" y2="322" stroke="#B8492A" stroke-width="3" />
            <line x1="234" y1="130" x2="234" y2="324" stroke="#16130F" stroke-width="6" />
            <rect v-for="y in [150, 178, 206, 234, 262, 290]" :key="'tw' + y" x="229" :y="y" width="10" height="10" fill="#16130F" />
            <!-- Byrsa, ports, angle faible -->
            <circle cx="420" cy="262" r="17" fill="#B8492A" />
            <rect x="466" y="318" width="22" height="12" rx="2" fill="#1D3F66" />
            <circle cx="503" cy="316" r="9" fill="#1D3F66" />
            <path d="M452,340 L462,358 L442,358 Z" fill="#D6A23E" stroke="#16130F" stroke-width="1.2" />
            <!-- Libellés -->
            <text x="60" y="235" class="def-lbl" text-anchor="middle">{{ c.def.map.lbl.mainland }}</text>
            <text x="200" y="40" class="def-lbl def-lbl--water" text-anchor="middle">{{ c.def.map.lbl.gulf }}</text>
            <text x="625" y="30" class="def-lbl def-lbl--water" text-anchor="end">{{ c.def.map.lbl.sea }}</text>
            <text x="290" y="398" class="def-lbl def-lbl--water" text-anchor="middle">{{ c.def.map.lbl.lake }}</text>
            <text x="217" y="112" class="def-lbl def-lbl--strong" text-anchor="middle">{{ c.def.map.lbl.isthmus }}</text>
            <text x="420" y="130" class="def-lbl def-lbl--muted" text-anchor="middle">{{ c.def.map.lbl.megara }}</text>
            <text x="420" y="230" class="def-lbl def-lbl--strong" text-anchor="middle">{{ c.def.map.lbl.byrsa }}</text>
            <text x="520" y="302" class="def-lbl" text-anchor="middle">{{ c.def.map.lbl.ports }}</text>
            <text x="505" y="392" class="def-lbl def-lbl--small" text-anchor="start">{{ c.def.map.lbl.angle }}</text>
          </svg>
          <ul class="def-legend">
            <li v-for="(l, i) in c.def.map.legend" :key="i"><span class="def-key" :class="'def-key--' + i" aria-hidden="true" />{{ l }}</li>
          </ul>
          <figcaption class="def-cap">{{ c.def.map.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.def.appian.kicker }}</span>
          <h3 class="h-block def-h">{{ c.def.appian.title }}</h3>
          <div class="rows def-rows" style="--row-key:118px">
            <div v-for="(r, i) in c.def.appian.rows" :key="i">
              <span class="key">{{ r.k }}</span>
              <span class="val">{{ r.v }}</span>
            </div>
          </div>
          <p class="def-note">{{ c.def.appian.note }}</p>
        </div>
      </div>
      <div class="cols cols-3 cols--flush def-grid">
        <div v-for="(t, i) in c.def.tiles" :key="i" class="tile tile--stack def-tile" :class="t.cls">
          <div>
            <span class="kicker">{{ t.kick }}</span>
            <h3 class="h-card def-card-h">{{ t.title }}</h3>
            <p class="body">{{ t.text }}</p>
          </div>
          <NuxtLink v-if="t.to" :to="localePath(t.to)" class="btn btn-outline def-cta">{{ t.cta }} →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Déroulé -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <div class="sec-head">
          <h2 class="h-section">{{ c.war.title }}</h2>
          <NuxtLink :to="localePath('/chronologie')" class="btn btn-outline">{{ c.war.cta }} →</NuxtLink>
        </div>
        <div class="rows war-rows" style="--row-key:200px">
          <div v-for="(e, i) in c.war.events" :key="i">
            <span class="key">{{ e.date }}</span>
            <span class="val">
              <strong class="ev-title">{{ e.title }}</strong>
              {{ e.desc }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Hasdrubal, sa femme, Scipion -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.end.title }}</h2>
        <p>{{ c.end.aside }}</p>
      </div>
    </section>
    <div class="bento end">
      <div class="tile tile--xl tile--terra s-4 tile--stack">
        <span class="kicker">{{ c.end.hasdrubal.kicker }}</span>
        <div>
          <h3 class="h-card end-h">{{ c.end.hasdrubal.title }}</h3>
          <p class="body">{{ c.end.hasdrubal.text }}</p>
        </div>
      </div>
      <figure class="fig s-4 scipio-fig" style="background:#E6D9C4">
        <img src="/img/scipio.jpg" :alt="c.end.scipio.alt" loading="lazy" style="object-position:50% 25%">
        <figcaption class="cap-box">{{ c.end.scipio.caption }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--paper tile--outline s-4 tile--stack">
        <span class="kicker">{{ c.end.scipio.kicker }}</span>
        <blockquote class="quote quote--sm">
          <p>{{ c.end.scipio.quote }}</p>
        </blockquote>
        <p class="body">{{ c.end.scipio.text }}</p>
      </div>
    </div>

    <!-- Byrsa -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig byrsa-fig" style="background:#1D3F66">
          <img src="/img/byrsa.jpg" :alt="c.byrsa.alt" loading="lazy">
          <figcaption class="cap-box">{{ c.byrsa.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--sand">
          <span class="kicker">{{ c.byrsa.kicker }}</span>
          <h2 class="h-block byrsa-title">{{ c.byrsa.title }}</h2>
          <p v-for="(p, i) in c.byrsa.paragraphs" :key="i" class="body-lg byrsa-p">{{ p }}</p>
          <NuxtLink :to="localePath('/fondation')" class="btn btn-outline byrsa-cta">{{ c.byrsa.cta }} →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Mythe romain / réalité -->
    <section class="sec sec--wide">
      <h2 class="h-section cmp-title">{{ c.cmp.title }}</h2>
      <div class="cols cols-2 cols--flush cmp-labels" aria-hidden="true">
        <span class="lbl-myth">{{ c.cmp.labelMyth }}</span>
        <span class="lbl-real">{{ c.cmp.labelReal }}</span>
      </div>
      <div class="cmp">
        <div v-for="(m, i) in c.cmp.pairs" :key="i" class="cols cols-2 cols--flush pair">
          <div class="tile tile--sand">
            <span class="kicker tag-myth">{{ c.cmp.labelMyth }}</span>
            <h3 class="h-card">{{ m.myth }}</h3>
          </div>
          <div class="tile tile--outline">
            <span class="kicker tag-real">{{ c.cmp.labelReal }}</span>
            <p class="body real">{{ m.reality }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Preuves archéologiques -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.evidence.title }}</h2>
        <p>{{ c.evidence.subtitle }}</p>
      </div>
    </section>
    <div class="cols cols-3">
      <div v-for="(e, i) in c.evidence.items" :key="i" class="tile ev" :class="e.cls">
        <span class="kicker">{{ e.kick }}</span>
        <h3 class="h-card">{{ e.title }}</h3>
        <p class="body">{{ e.desc }}</p>
      </div>
    </div>

    <!-- Continuité -->
    <section class="sec">
      <div class="tile tile--xl tile--navy">
        <div class="sec-head">
          <div>
            <span class="kicker">{{ c.cont.kicker }}</span>
            <h2 class="h-section">{{ c.cont.title }}</h2>
          </div>
          <NuxtLink :to="localePath('/tunisie')" class="btn btn-outline">{{ c.cont.cta }} →</NuxtLink>
        </div>
        <p class="body-lg cont-intro">{{ c.cont.intro }}</p>
        <div class="cols cols-4 cols--flush cont-grid">
          <div v-for="(k, i) in c.cont.items" :key="i" class="cont">
            <div class="cont-key">{{ k.key }}</div>
            <h3 class="cont-h">{{ k.title }}</h3>
            <p class="body">{{ k.desc }}</p>
          </div>
        </div>
      </div>
      <AltReading v-bind="c.cont.alt" />
    </section>

    <!-- Carthage aujourd'hui -->
    <section class="sec">
      <div class="sec-head">
        <h2 class="h-section">{{ c.today.title }}</h2>
        <NuxtLink :to="localePath('/carte')" class="btn btn-outline">{{ c.today.cta }} →</NuxtLink>
      </div>
      <div class="cols cols-2 cols--flush">
        <figure v-for="(g, i) in c.today.items" :key="i" class="fig today-fig" style="background:#E6D9C4">
          <img :src="'/img/' + g.img" :alt="g.alt" loading="lazy">
          <figcaption class="cap-box">{{ g.caption }}</figcaption>
        </figure>
      </div>
    </section>

    <PageSources :items="c.sources" />

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

const C = {
  fr: {
    meta: {
      title: 'La prise de Carthage — 149-146 av. J.-C.',
      desc: "La troisième guerre punique : désarmement, siège de trois ans, Scipion Émilien, la chute de Byrsa, Hasdrubal et sa femme, le mythe du sel et la refondation romaine."
    },
    hero: {
      chip: '149 – 146 av. J.-C.',
      title: 'La prise de Carthage',
      lede: "Ce que Rome a fait, et ce qu'elle a prétendu avoir fait : la troisième guerre punique, du désarmement de la ville à l'incendie de Byrsa.",
      alt: 'Le quartier punique de la colline de Byrsa',
      caption: "Le quartier punique de Byrsa, incendié en 146"
    },
    stats: [
      { n: '3 ans', t: "de siège, de 149 au printemps 146 av. J.-C." },
      { n: '200 000', t: 'armures et 2 000 catapultes livrées à Rome avant la guerre' },
      { n: '6 jours', t: 'et six nuits de combats de rue jusqu\'à Byrsa' },
      { n: '50 000', t: 'survivants sortis de Byrsa, vendus comme esclaves' }
    ],
    cato: {
      kicker: 'Caton l\'Ancien',
      text: "Revenu d'une ambassade en Afrique, frappé par la prospérité retrouvée de Carthage, Caton termine chacun de ses discours au Sénat par cette formule. Selon Plutarque, il y exhibe des figues fraîches cueillies à Carthage trois jours plus tôt : l'ennemi est à portée de voile. Scipion Nasica plaide au contraire pour épargner la ville."
    },
    myth: {
      kicker: 'Le récit et les faits',
      title: 'Une destruction réelle, pas un effacement',
      text: "Rome a incendié et démantelé Carthage, massacré ou réduit en esclavage ses habitants. Mais le récit d'une ville « rasée » et stérilisée par le sel relève de la légende : les fouilles retrouvent la cité punique sous la ville romaine, et la culture punique a survécu des siècles.",
      cta: "L'histoire écrite par le vainqueur"
    },
    massi: {
      title: "Massinissa, l'autre artisan de la chute",
      intro: "Rome a donné le coup final, mais c'est le roi numide Massinissa qui, pendant cinquante ans, a grignoté le territoire de Carthage et fourni à Rome son prétexte.",
      alt: 'Monnaie de Massinissa, roi de Numidie',
      caption: 'Monnaie de Massinissa — British Museum',
      whyKicker: 'Pourquoi ?',
      whyTitle: 'Des terres riches, une ville convoitée',
      why: "Massinissa voulait bâtir un grand royaume numide sédentaire, avec des villes et des terres à blé. Or les plaines fertiles et les comptoirs les plus riches d'Afrique appartenaient à Carthage, dont la prospérité avait survécu à la défaite. Il savait qu'avec l'appui de Rome, chaque annexion resterait impunie.",
      rowsKicker: 'Cinquante ans de pression, 206 – 148',
      rows: [
        { k: '212 – 206', v: "Formé à Carthage selon Appien, il combat pour elle en Hispanie contre les Scipions." },
        { k: '206', v: "Carthage soutient son rival Syphax ; Massinissa passe dans le camp de Rome." },
        { k: '202', v: "Sa cavalerie numide est décisive à Zama : elle revient frapper l'armée d'Hannibal dans le dos." },
        { k: '201', v: "Le traité de paix l'autorise à réclamer « les terres de ses ancêtres », sans en fixer les limites, et interdit à Carthage toute guerre sans l'accord de Rome : Carthage ne peut plus se défendre seule." },
        { k: '193', v: "Il s'empare d'une partie des Emporia, les riches comptoirs de la petite Syrte (Tite-Live). Rome envoie des arbitres qui ne tranchent pas." },
        { k: '174 – 172', v: "Carthage se plaint à Rome : en deux ans, Massinissa lui aurait pris plus de 70 villes et forteresses (Tite-Live)." },
        { k: '162 – 161', v: "Nouvelle annexion des Emporia ; Rome donne raison à Massinissa, et Carthage doit en plus lui verser 500 talents (Polybe)." },
        { k: '153 – 152', v: "Il prend les Grandes Plaines et la région de Thugga, une cinquantaine de villes (Appien). L'ambassade romaine venue arbitrer, avec Caton, revient convaincue qu'il faut détruire Carthage." },
        { k: '150', v: "À bout, Carthage lève environ 25 000 hommes sous Hasdrubal. Encerclée et affamée, l'armée capitule ; les cavaliers de Gulussa, fils de Massinissa, massacrent les prisonniers. Pour Rome, c'est la violation du traité de 201 qu'elle attendait." },
        { k: '148', v: "Massinissa meurt à près de 90 ans, en plein siège de Carthage. Scipion Émilien partage son royaume entre ses fils." }
      ],
      hannibalKicker: "Sans Hannibal",
      hannibal: "Carthage n'avait plus son meilleur défenseur : devenu suffète, Hannibal avait réformé l'État et rétabli les finances, mais ses ennemis l'avaient dénoncé à Rome. Il s'exile en 195 et meurt en 183, bien avant la dernière guerre.",
      romeKicker: 'Un allié encombrant',
      rome: "Rome s'est servie de Massinissa sans vouloir lui laisser Carthage. Plusieurs historiens modernes pensent que la destruction de la ville visait aussi à empêcher un royaume numide trop puissant de s'en emparer : à sa mort, son royaume est aussitôt divisé.",
    },
    def: {
      title: 'Les défenses de Carthage',
      intro: "Avant le siège, voici ce que Rome devait prendre : une ville bâtie sur une presqu'île, fermée côté terre par l'une des plus puissantes fortifications du monde antique. Elles expliquent qu'une cité désarmée ait tenu près de trois ans.",
      map: {
        aria: "Schéma de la presqu'île de Carthage : triple ligne de défense en travers de l'isthme, mur de mer, citadelle de Byrsa, ports et angle faible de l'enceinte",
        caption: "Reconstitution schématique — tracés et proportions approximatifs, d'après Polybe et Appien.",
        lbl: { mainland: 'Continent', gulf: "Golfe (auj. sebkha de l'Ariana)", sea: 'Mer Méditerranée', lake: 'Lac de Tunis', isthmus: 'Isthme', megara: 'Mégara', byrsa: 'Byrsa', ports: 'Ports', angle: 'Angle faible' },
        legend: ["Triple ligne de l'isthme", 'Mur de mer (simple)', 'Byrsa, citadelle', 'Ports', 'Angle faible (Appien)']
      },
      appian: {
        kicker: 'Appien, Libyca, 95',
        title: "Le triple rempart de l'isthme",
        rows: [
          { k: 'Isthme', v: "Large d'environ 25 stades (≈ 4,5 km) selon Polybe (I, 73) et Appien : c'est le seul accès par la terre." },
          { k: 'Hauteur', v: '30 coudées (≈ 13 à 14 m) pour chaque mur, sans compter les parapets et les tours.' },
          { k: 'Épaisseur', v: '30 pieds (≈ 9 m).' },
          { k: 'Tours', v: 'Une tous les deux plèthres (≈ 60 m), haute de quatre étages.' },
          { k: 'Niveau bas', v: 'Des stalles pour 300 éléphants et leurs réserves de nourriture.' },
          { k: 'Niveau haut', v: "Des écuries pour 4 000 chevaux et des magasins d'orge et de fourrage." },
          { k: 'Casernes', v: 'De quoi loger 20 000 fantassins et 4 000 cavaliers.' }
        ],
        note: "Trois murs identiques ? Appien écrit au IIe siècle apr. J.-C. d'après Polybe, témoin du siège. De nombreux historiens modernes lisent plutôt une défense en profondeur : un fossé, une palissade ou un avant-mur, puis le grand mur à tours qui abritait casernes et écuries."
      },
      tiles: [
        { cls: 'tile--terra', kick: 'Longueur', title: '34 km, un chiffre à nuancer', text: "Le chiffre souvent cité vient de Tite-Live (Periochae, 51) : une enceinte de 23 milles romains, soit environ 34 km. Orose en compte 22 (≈ 32,5 km) ; Strabon, lui, donne 360 stades (≈ 65 km) pour le pourtour de toute la presqu'île. Le tracé complet n'a jamais été retrouvé : on parlera d'une enceinte d'une trentaine de kilomètres, englobant le faubourg-jardin de Mégara." },
        { cls: 'tile--navy', kick: 'Côté mer', title: 'Un seul mur', text: "Là où la mer et les escarpements protégeaient la ville, un simple rempart suffisait (Appien). Point faible : l'angle bas et négligé où ce mur rejoignait la langue de terre menant aux ports. C'est là que le consul Censorinus lance ses béliers en 149 ; la brèche est en partie refermée dans la nuit et l'assaut repoussé." },
        { cls: 'tile--sand', kick: 'Citadelle', title: 'Byrsa, le dernier réduit', text: "Au cœur de la ville, la colline de Byrsa avait sa propre enceinte, autour du temple d'Eshmoun ; Orose lui prête un peu plus de deux milles de tour (≈ 3 km). En 146, c'est le dernier bastion des assiégés." },
        { cls: 'tile--paper', kick: 'Ports', title: 'Le Cothon, défense navale', text: "Le double port et ses cales pour 220 navires sont décrits sur la page de la fondation. Pendant le siège, ils deviennent un enjeu : Scipion en barre l'entrée par une digue, les assiégés percent un nouveau chenal.", to: '/fondation', cta: 'Les ports de Carthage' },
        { cls: 'tile--outline', kick: 'Archéologie', title: 'Ce que les fouilles ont retrouvé', text: "Côté mer, les fouilles allemandes de Friedrich Rakob (quartier Magon, campagne UNESCO) ont dégagé le rempart maritime du Ve siècle av. J.-C. et une porte ouvrant sur le rivage. Sur l'isthme, le général Duval a suivi en 1949 un tracé fortifié sur environ 2,9 km, qu'il identifie à l'enceinte extérieure punique." },
        { cls: 'tile--purple', kick: 'À ne pas confondre', title: 'Le « mur de Théodose »', text: "Toutes les murailles fouillées à Carthage ne sont pas puniques. Vers 425 apr. J.-C., sous Théodose II, la Carthage romaine se dote d'une nouvelle enceinte face à la menace vandale ; des équipes canadiennes l'ont fouillée à partir de 1976. Elle n'a rien à voir avec les remparts de 146." }
      ]
    },
    war: {
      title: 'Ce qui s\'est passé',
      cta: 'Toute la chronologie',
      events: [
        { date: '151 av. J.-C.', title: 'Le prétexte.', desc: "Carthage achève de payer son indemnité de guerre et se défend, armes à la main, contre les empiétements du roi numide Massinissa. Rome y voit une violation du traité de 201, qui lui interdit toute guerre sans son accord." },
        { date: '149 av. J.-C.', title: 'Désarmement et ultimatum.', desc: "Les consuls Manilius et Censorinus débarquent à Utique, passée du côté romain. Carthage livre 300 otages, 200 000 armures et 2 000 catapultes. Rome exige alors que la ville soit abandonnée et reconstruite à 80 stades (environ 15 km) de la mer. Les Carthaginois refusent." },
        { date: '149–148 av. J.-C.', title: 'Une ville qui se réarme.', desc: "Tout le métal disponible est fondu pour forger de nouvelles armes ; selon Appien, les femmes coupent leurs cheveux pour tresser les cordes des catapultes. Les premiers assauts romains échouent, tandis qu'Hasdrubal tient la campagne." },
        { date: '147 av. J.-C.', title: 'Scipion Émilien.', desc: "Élu consul malgré son jeune âge, le petit-fils adoptif de Scipion l'Africain resserre le blocus et fait barrer l'entrée du port par une digue. Les assiégés creusent un nouveau chenal vers la mer et lancent une flotte construite en secret." },
        { date: 'Printemps 146', title: "L'assaut final.", desc: "Les Romains s'emparent du secteur des ports puis de l'agora. Pendant six jours et six nuits, ils progressent maison par maison le long des trois rues qui montent à Byrsa, incendiant les immeubles à mesure." },
        { date: '146 av. J.-C.', title: 'La chute de Byrsa.', desc: "50 000 hommes et femmes sortent de la citadelle et se rendent. Environ 900 déserteurs romains se retranchent dans le temple d'Eshmoun et y mettent le feu. Hasdrubal se rend à Scipion." },
        { date: '146 av. J.-C.', title: 'Après la victoire.', desc: "La ville brûle plusieurs jours ; une commission de dix sénateurs fait démanteler ce qui reste et maudit le site. Le territoire devient la province romaine d'Afrique, avec Utique pour capitale ; les bibliothèques sont données aux rois numides. La même année, Rome détruit Corinthe." }
      ]
    },
    end: {
      title: 'Les derniers jours',
      aside: 'Polybe, ami et conseiller de Scipion, assiste à la chute de la ville. Appien a repris son récit.',
      hasdrubal: {
        kicker: 'Hasdrubal le Boétarque et sa femme',
        title: 'Le choix des flammes',
        text: "Chef de la défense, Hasdrubal finit par se rendre, suppliant, aux pieds de Scipion. Du haut du temple en feu, sa femme, parée de ses plus beaux vêtements, le maudit pour sa lâcheté, tue leurs deux fils et se jette avec eux dans les flammes."
      },
      scipio: {
        kicker: 'Les larmes de Scipion',
        quote: "« Un jour viendra où périra Ilion la sainte, et Priam, et le peuple de Priam à la bonne lance. »",
        text: "Devant la ville en flammes, Scipion Émilien pleure et cite ces vers de l'Iliade. À Polybe qui l'interroge, il confie craindre que le même sort frappe un jour Rome.",
        alt: "Buste dit de Scipion l'Africain",
        caption: "Buste dit de Scipion l'Africain, grand-père adoptif de Scipion Émilien"
      }
    },
    byrsa: {
      kicker: 'Byrsa',
      title: 'La citadelle, du dernier combat aux fouilles',
      paragraphs: [
        "Au sommet de la colline légendaire de Didon se dressait le temple d'Eshmoun, auquel on accédait par soixante marches. C'est là que se jouent les dernières heures de la Carthage punique.",
        "Sous Auguste, les Romains arasent le sommet pour y construire le forum de la nouvelle ville. Les déblais recouvrent les pentes — et protègent, sans le vouloir, un quartier d'habitations puniques du IIe siècle, rues et citernes comprises, retrouvé par les archéologues français à partir des années 1970."
      ],
      alt: 'La colline de Byrsa',
      caption: "La colline de Byrsa, aujourd'hui",
      cta: 'La fondation de Carthage'
    },
    cmp: {
      title: 'Mythe romain / réalité',
      labelMyth: 'MYTHE',
      labelReal: 'RÉALITÉ',
      pairs: [
        { myth: '« Carthage a été rasée jusqu\'au sol »', reality: "La ville a été incendiée et démantelée, mais pas effacée : des maisons, des rues et des citernes puniques ont été retrouvées sous les couches romaines, conservées sur plusieurs mètres de hauteur." },
        { myth: '« Du sel a été répandu pour stériliser la terre »', reality: "Aucune source antique — ni Polybe, ni Appien, ni Tite-Live — ne mentionne cet épisode. Il apparaît chez des auteurs modernes, aux XIXe et XXe siècles. Le sel était d'ailleurs une denrée précieuse." },
        { myth: '« La civilisation carthaginoise a disparu »', reality: "Le punique était encore parlé au Ve siècle apr. J.-C. Des villes d'Afrique romaine gardèrent des suffètes, et les cultes puniques survécurent sous des noms romains." },
        { myth: '« Carthage n\'a jamais été reconstruite »', reality: "Après l'échec de Caius Gracchus (122 av. J.-C.), César décide la refondation, réalisée sous Auguste : Carthage devient la capitale de l'Afrique romaine et l'une des plus grandes villes de l'Empire." }
      ]
    },
    evidence: {
      title: 'Les preuves archéologiques',
      subtitle: 'Ce que disent réellement les fouilles, notamment celles de la campagne UNESCO « Sauvons Carthage » (1972–1995).',
      items: [
        { kick: '44 – 29 av. J.-C.', title: 'Une refondation sur place', desc: "Colonia Iulia Concordia Carthago est bâtie exactement sur le site punique, pour ses ports et sa position. La malédiction de 146 n'a pas résisté un siècle.", cls: 'tile--purple' },
        { kick: 'Stratigraphie', title: 'Des structures puniques conservées', desc: "Murs, sols et citernes puniques apparaissent sous les couches romaines. À Byrsa, une épaisse couche d'incendie date précisément la prise de 146.", cls: '' },
        { kick: 'Textes', title: 'Le mythe du sel', desc: "Aucun auteur antique ne parle de sel répandu sur Carthage : l'épisode est une invention moderne, peut-être inspirée de récits bibliques ou médiévaux.", cls: 'tile--sand' },
        { kick: 'Langue', title: 'Une continuité culturelle', desc: "Inscriptions néopuniques, noms de personnes, cultes : la culture punique perdure. Saint Augustin atteste encore l'usage de la langue vers 400 apr. J.-C.", cls: '' },
        { kick: 'Ports', title: 'Le port circulaire', desc: "Le plan du Cothon a traversé les siècles : les Romains ont réaménagé le port militaire punique, dont les fouilles ont retrouvé les cales à navires.", cls: 'tile--navy' },
        { kick: 'Urbanisme', title: 'Un nouveau quadrillage', desc: "Les Romains tracent un nouveau plan orthogonal et arasent le sommet de Byrsa — ce qui a paradoxalement préservé le quartier punique enfoui sous les remblais.", cls: '' }
      ]
    },
    cont: {
      kicker: 'Après 146',
      title: "Carthage n'a pas disparu",
      cta: 'Carthage et la Tunisie',
      intro: "La ville de 146 a bien brûlé : les fouilles de Byrsa et du quartier punique retrouvent la couche d'incendie, les maisons effondrées, les balles de fronde et les boulets de catapulte. Mais une civilisation ne tient pas dans une ville. La langue, les cultes, les institutions et les villes puniques ont continué à vivre pendant des siècles, et Carthage elle-même a été rebâtie sur le même site.",
      alt: {
        badge: "Une autre lecture — le point de vue de l'auteur du site",
        title: 'Carthage prise par sabotage, pas détruite',
        thesis: [
          "Pour l'auteur de ce site, Carthage n'a pas été détruite : elle a été prise, par sabotage, au moment où Hannibal n'était plus là pour la défendre. Rome et Massinissa, jaloux de sa richesse, de son commerce et de ses réseaux, en ont profité pour en prendre le contrôle.",
          "Selon cette lecture, le récit d'une ville rasée vient des livres romains, écrits par les vainqueurs pour grandir leur victoire."
        ],
        answerTitle: "Ce qu'en disent l'archéologie et les historiens",
        answer: [
          "Les fouilles de Byrsa et du quartier punique retrouvent la ville de 146 : couche de cendres, maisons effondrées, poutres brûlées, projectiles dans les rues. On peut encore voir ces vestiges à Carthage.",
          "Le sel répandu sur les ruines et l'effacement total sont bien des inventions : la culture punique a survécu et Rome a rebâti sur le site.",
          "Hannibal n'était pas absent en 149 : il était mort depuis 183. Carthage avait perdu son meilleur défenseur avec son exil en 195.",
          "La jalousie et la peur de la richesse carthaginoise sont en revanche bien attestées : voir la page sur la richesse et Rome."
        ]
      },
      items: [
        { key: 'Ve s.', title: 'La langue punique', desc: "Parlée jusqu'au Ve siècle apr. J.-C., près de six siècles après la prise de Carthage. Saint Augustin, né à Thagaste, en témoigne et cite des mots puniques." },
        { key: 'Ier – IIe s.', title: 'Des inscriptions néopuniques', desc: "On grave encore en punique, dans une écriture dite néopunique, jusqu'aux Ier et IIe siècles, puis du punique en lettres latines jusqu'au IVe siècle." },
        { key: 'Numidie', title: 'La langue des rois', desc: "Les rois numides, Massinissa compris, gouvernent et frappent monnaie en punique. À Dougga, les inscriptions officielles sont bilingues, libyque et punique." },
        { key: 'Suffètes', title: 'Des institutions qui durent', desc: "Sous Rome, des villes d'Afrique comme Leptis Magna ou Mactar élisent encore des suffètes, les magistrats de la tradition carthaginoise, jusqu'aux Ier et IIe siècles." },
        { key: 'Saturne', title: 'Les dieux changent de nom', desc: "Baal Hammon est vénéré comme Saturne africain et Tanit comme Caelestis, sur les mêmes sanctuaires et avec des stèles héritées du modèle punique." },
        { key: 'Utique, Hadrumète', title: 'Les villes puniques restent', desc: "Utique, Hadrumète (Sousse), Leptis ou Kerkouane… plusieurs cités puniques traversent la guerre ; certaines, alliées de Rome en 149, gardent leur statut de villes libres." },
        { key: '29 av. J.-C.', title: 'Carthage renaît', desc: "Décidée par César, la colonie est fondée sous Auguste sur le même site. Elle devient la capitale de l'Afrique proconsulaire et l'une des plus grandes villes de l'Empire." },
        { key: '1979', title: 'Un nom et un patrimoine', desc: "Le nom Africa, puis Ifriqiya, vient du territoire de Carthage. Le site archéologique est inscrit au patrimoine mondial de l'UNESCO." }
      ]
    },
    today: {
      title: "Carthage aujourd'hui",
      cta: 'Carte animée',
      items: [
        { img: 'ruins.jpg', alt: "Ruines des thermes d'Antonin au bord de la mer", caption: "Ruines des thermes d'Antonin, au bord de la Méditerranée" },
        { img: 'baths.jpg', alt: "Les thermes d'Antonin", caption: "Les thermes d'Antonin (IIe s. apr. J.-C.), parmi les plus vastes de l'Empire romain" }
      ]
    },
    more: {
      title: 'À lire aussi',
      items: [
        { to: '/guerres-puniques', kick: '264 – 146 av. J.-C.', title: 'Les guerres puniques', text: 'Trois guerres, un siècle de conflit pour la Méditerranée.', cls: 'tile--terra' },
        { to: '/fondation', kick: '814 av. J.-C.', title: 'La fondation', text: 'Élyssa, la peau de bœuf et la colline de Byrsa.', cls: 'tile--purple' },
        { to: '/chronologie', kick: 'Chronologie', title: "Sept siècles d'histoire", text: 'Toutes les grandes dates de Carthage, époque par époque.', cls: '' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Polybe', work: 'Histoires', ref: 'I, 73', note: 'témoin du siège aux côtés de Scipion Émilien ; source d\'Appien' },
      { type: 'ancient', author: 'Appien d\'Alexandrie', work: 'Libyca (Le Livre africain)', ref: '95', note: 'remparts de l\'isthme, siège et chute de Byrsa' },
      { type: 'ancient', author: 'Tite-Live', work: 'Histoire romaine', note: 'empiétements de Massinissa (193, 174–172 av. J.-C.)' },
      { type: 'ancient', author: 'Tite-Live', work: 'Periochae', ref: '51', note: 'longueur de l\'enceinte (23 milles)' },
      { type: 'ancient', author: 'Plutarque', work: 'Vie de Caton l\'Ancien', note: 'les figues de Carthage' },
      { type: 'ancient', author: 'Orose', work: 'Histoires contre les païens', note: 'enceinte de la ville et de Byrsa' },
      { type: 'ancient', author: 'Strabon', work: 'Géographie (livre XVII)', note: 'pourtour de la presqu\'île' },
      { type: 'ancient', author: 'Homère', work: 'Iliade', ref: 'VI, 448–449', note: 'vers cités par Scipion Émilien devant la ville en flammes' },
      { type: 'ancient', author: 'Saint Augustin', note: 'témoin de l\'usage du punique vers 400 apr. J.-C.' },
      { type: 'modern', author: 'Abdelmajid Ennabli', work: 'Pour sauver Carthage : exploration et conservation de la cité punique, romaine et byzantine', ref: 'Unesco/INAA, 1992', note: 'sur la campagne UNESCO « Sauvons Carthage »' },
      { type: 'modern', author: 'Friedrich Rakob', note: 'fouilles allemandes du quartier Magon, cité dans la page' },
      { type: 'modern', author: 'Général Duval', note: 'tracé fortifié de l\'isthme (1949), cité dans la page' }
    ]
  },

  en: {
    meta: {
      title: 'The capture of Carthage — 149-146 BC',
      desc: 'The Third Punic War: disarmament, a three-year siege, Scipio Aemilianus, the fall of Byrsa, Hasdrubal and his wife, the salt myth and the Roman refoundation.'
    },
    hero: {
      chip: '149 – 146 BC',
      title: 'The capture of Carthage',
      lede: 'What Rome did, and what it claimed to have done: the Third Punic War, from the disarming of the city to the burning of Byrsa.',
      alt: 'The Punic quarter on the hill of Byrsa',
      caption: 'The Punic quarter of Byrsa, burnt in 146'
    },
    stats: [
      { n: '3 years', t: 'of siege, from 149 to the spring of 146 BC' },
      { n: '200,000', t: 'suits of armour and 2,000 catapults handed to Rome before the war' },
      { n: '6 days', t: 'and six nights of street fighting up to Byrsa' },
      { n: '50,000', t: 'survivors who came out of Byrsa, sold into slavery' }
    ],
    cato: {
      kicker: 'Cato the Elder',
      text: "Back from an embassy to Africa, struck by Carthage's renewed prosperity, Cato ends every speech in the Senate with this phrase. According to Plutarch, he showed fresh figs picked in Carthage three days earlier: the enemy was within sailing distance. Scipio Nasica, by contrast, argued for sparing the city."
    },
    myth: {
      kicker: 'The story and the facts',
      title: 'A real destruction, not an erasure',
      text: 'Rome burnt and dismantled Carthage, and killed or enslaved its people. But the tale of a city "razed" and sterilised with salt is legend: excavations find the Punic city beneath the Roman one, and Punic culture survived for centuries.',
      cta: 'History written by the victor'
    },
    massi: {
      title: 'Masinissa, the other architect of the fall',
      intro: "Rome struck the final blow, but it was the Numidian king Masinissa who, for fifty years, ate away at Carthage's territory and handed Rome its pretext.",
      alt: 'Coin of Masinissa, king of Numidia',
      caption: 'Coin of Masinissa — British Museum',
      whyKicker: 'Why?',
      whyTitle: 'Rich lands, a coveted city',
      why: "Masinissa wanted to build a great settled Numidian kingdom, with towns and wheat-growing land. Yet the most fertile plains and the richest trading posts in Africa belonged to Carthage, whose prosperity had survived defeat. He knew that with Rome behind him, every annexation would go unpunished.",
      rowsKicker: 'Fifty years of pressure, 206 – 148',
      rows: [
        { k: '212 – 206', v: 'Raised at Carthage according to Appian, he fights for the city in Hispania against the Scipios.' },
        { k: '206', v: 'Carthage backs his rival Syphax; Masinissa goes over to Rome.' },
        { k: '202', v: "His Numidian cavalry is decisive at Zama: it returns to strike Hannibal's army from behind." },
        { k: '201', v: "The peace treaty lets him claim “the lands of his ancestors” without fixing any boundary, and forbids Carthage to wage any war without Rome's consent: Carthage can no longer defend itself alone." },
        { k: '193', v: 'He seizes part of the Emporia, the rich trading posts of the Lesser Syrtis (Livy). Rome sends arbitrators who settle nothing.' },
        { k: '174 – 172', v: 'Carthage complains to Rome that in two years Masinissa has taken more than 70 of its towns and forts (Livy).' },
        { k: '162 – 161', v: 'The Emporia are annexed again; Rome rules for Masinissa, and Carthage must also pay him 500 talents (Polybius).' },
        { k: '153 – 152', v: 'He takes the Great Plains and the Thugga region, some fifty towns (Appian). The Roman embassy sent to arbitrate, Cato among them, returns convinced that Carthage must be destroyed.' },
        { k: '150', v: 'Pushed to the limit, Carthage raises some 25,000 men under Hasdrubal. Surrounded and starving, the army surrenders; the horsemen of Gulussa, Masinissa\'s son, massacre the prisoners. For Rome, this is the breach of the 201 treaty it had been waiting for.' },
        { k: '148', v: 'Masinissa dies at nearly 90, in the middle of the siege of Carthage. Scipio Aemilianus divides his kingdom among his sons.' }
      ],
      hannibalKicker: 'Without Hannibal',
      hannibal: 'Carthage had lost its best defender. As suffete, Hannibal had reformed the state and restored its finances, but his enemies denounced him to Rome. He went into exile in 195 and died in 183, long before the last war.',
      romeKicker: 'An awkward ally',
      rome: 'Rome used Masinissa without wanting to hand him Carthage. Several modern historians think the destruction of the city was also meant to stop an overly powerful Numidian kingdom from taking it: on his death, his kingdom was immediately divided.',
    },
    def: {
      title: 'The defences of Carthage',
      intro: 'Before the siege, here is what Rome had to take: a city built on a peninsula, closed on the landward side by one of the most powerful fortifications of the ancient world. They explain how a disarmed city held out for almost three years.',
      map: {
        aria: 'Diagram of the Carthage peninsula: triple line of defence across the isthmus, sea wall, Byrsa citadel, harbours and the weak angle of the walls',
        caption: 'Schematic reconstruction — lines and proportions approximate, after Polybius and Appian.',
        lbl: { mainland: 'Mainland', gulf: 'Gulf (now Sebkha of Ariana)', sea: 'Mediterranean Sea', lake: 'Lake of Tunis', isthmus: 'Isthmus', megara: 'Megara', byrsa: 'Byrsa', ports: 'Harbours', angle: 'Weak angle' },
        legend: ['Triple line across the isthmus', 'Sea wall (single)', 'Byrsa, citadel', 'Harbours', 'Weak angle (Appian)']
      },
      appian: {
        kicker: 'Appian, Libyca, 95',
        title: 'The triple wall of the isthmus',
        rows: [
          { k: 'Isthmus', v: 'About 25 stades wide (≈ 4.5 km) according to Polybius (I, 73) and Appian: the only way in by land.' },
          { k: 'Height', v: '30 cubits (≈ 13 to 14 m) for each wall, not counting parapets and towers.' },
          { k: 'Thickness', v: '30 feet (≈ 9 m).' },
          { k: 'Towers', v: 'One every two plethra (≈ 60 m), four storeys high.' },
          { k: 'Lower level', v: 'Stalls for 300 elephants and their food stores.' },
          { k: 'Upper level', v: 'Stables for 4,000 horses and stores of barley and fodder.' },
          { k: 'Barracks', v: 'Room for 20,000 infantry and 4,000 cavalry.' }
        ],
        note: 'Three identical walls? Appian wrote in the 2nd century AD, drawing on Polybius, who witnessed the siege. Many modern historians read it instead as a defence in depth: a ditch, a palisade or outer wall, then the great towered wall housing barracks and stables.'
      },
      tiles: [
        { cls: 'tile--terra', kick: 'Length', title: '34 km, a figure to qualify', text: 'The often-quoted figure comes from Livy (Periochae, 51): a circuit of 23 Roman miles, about 34 km. Orosius counts 22 (≈ 32.5 km); Strabo gives 360 stades (≈ 65 km) for the perimeter of the whole peninsula. The full line has never been found: think of a circuit of some thirty kilometres, taking in the garden suburb of Megara.' },
        { cls: 'tile--navy', kick: 'Seaward', title: 'A single wall', text: 'Where the sea and the cliffs protected the city, a single wall was enough (Appian). The weak point: the low, neglected angle where this wall met the tongue of land leading to the harbours. There the consul Censorinus brought up his rams in 149; the breach was partly closed overnight and the assault driven back.' },
        { cls: 'tile--sand', kick: 'Citadel', title: 'Byrsa, the last stronghold', text: 'At the heart of the city, the hill of Byrsa had its own wall, around the temple of Eshmun; Orosius gives it a circuit of a little over two miles (≈ 3 km). In 146 it was the besieged’s last bastion.' },
        { cls: 'tile--paper', kick: 'Harbours', title: 'The Cothon, naval defence', text: 'The double harbour and its sheds for 220 ships are described on the foundation page. During the siege they became a key objective: Scipio blocked the entrance with a mole, and the besieged cut a new channel.', to: '/fondation', cta: 'The harbours of Carthage' },
        { cls: 'tile--outline', kick: 'Archaeology', title: 'What excavation has found', text: 'On the seaward side, the German excavations of Friedrich Rakob (Magon quarter, UNESCO campaign) uncovered the 5th-century BC sea wall and a gate opening onto the shore. On the isthmus, General Duval traced a fortified line for about 2.9 km in 1949, which he identified as the outer Punic wall.' },
        { cls: 'tile--purple', kick: 'Not to be confused', title: 'The “Theodosian wall”', text: 'Not every wall excavated at Carthage is Punic. Around AD 425, under Theodosius II, Roman Carthage built a new circuit against the Vandal threat; Canadian teams excavated it from 1976. It has nothing to do with the walls of 146.' }
      ]
    },
    war: {
      title: 'What happened',
      cta: 'Full timeline',
      events: [
        { date: '151 BC', title: 'The pretext.', desc: "Carthage finishes paying its war indemnity and defends itself, arms in hand, against the encroachments of the Numidian king Masinissa. Rome calls this a breach of the treaty of 201, which forbade it any war without Rome's consent." },
        { date: '149 BC', title: 'Disarmament and ultimatum.', desc: 'The consuls Manilius and Censorinus land at Utica, which has gone over to Rome. Carthage hands over 300 hostages, 200,000 suits of armour and 2,000 catapults. Rome then demands that the city be abandoned and rebuilt 80 stades (about 15 km) from the sea. The Carthaginians refuse.' },
        { date: '149–148 BC', title: 'A city rearms.', desc: 'Every scrap of metal is melted down to forge new weapons; according to Appian, the women cut off their hair to braid catapult ropes. The first Roman assaults fail, while Hasdrubal holds the countryside.' },
        { date: '147 BC', title: 'Scipio Aemilianus.', desc: 'Elected consul despite his youth, the adoptive grandson of Scipio Africanus tightens the blockade and blocks the harbour entrance with a mole. The besieged dig a new channel to the sea and launch a fleet built in secret.' },
        { date: 'Spring 146', title: 'The final assault.', desc: 'The Romans seize the harbour area, then the agora. For six days and six nights they advance house by house along the three streets leading up to Byrsa, setting the buildings alight as they go.' },
        { date: '146 BC', title: 'The fall of Byrsa.', desc: '50,000 men and women leave the citadel and surrender. About 900 Roman deserters barricade themselves in the temple of Eshmun and set it on fire. Hasdrubal surrenders to Scipio.' },
        { date: '146 BC', title: 'After the victory.', desc: "The city burns for days; a commission of ten senators has what remains dismantled and places a curse on the site. The territory becomes the Roman province of Africa, with Utica as its capital; the libraries are given to the Numidian kings. The same year, Rome destroys Corinth." }
      ]
    },
    end: {
      title: 'The last days',
      aside: "Polybius, Scipio's friend and adviser, witnessed the fall of the city. Appian drew on his account.",
      hasdrubal: {
        kicker: 'Hasdrubal the Boetharch and his wife',
        title: 'The choice of the flames',
        text: 'Commander of the defence, Hasdrubal finally surrenders, as a suppliant, at the feet of Scipio. From the top of the burning temple, his wife, dressed in her finest clothes, curses him for his cowardice, kills their two sons and throws herself with them into the flames.'
      },
      scipio: {
        kicker: 'The tears of Scipio',
        quote: '"A day will come when sacred Ilion shall perish, and Priam, and the people of Priam of the good ash spear."',
        text: 'Before the burning city, Scipio Aemilianus weeps and quotes these lines from the Iliad. When Polybius asks him why, he confides his fear that the same fate may one day strike Rome.',
        alt: 'Bust said to be of Scipio Africanus',
        caption: 'Bust said to be of Scipio Africanus, adoptive grandfather of Scipio Aemilianus'
      }
    },
    byrsa: {
      kicker: 'Byrsa',
      title: 'The citadel, from the last stand to the excavations',
      paragraphs: [
        "On the summit of Dido's legendary hill stood the temple of Eshmun, reached by sixty steps. There the last hours of Punic Carthage were played out.",
        'Under Augustus, the Romans levelled the summit to build the forum of the new city. The spoil covered the slopes — and unwittingly protected a 2nd-century Punic residential quarter, streets and cisterns included, uncovered by French archaeologists from the 1970s onwards.'
      ],
      alt: 'The hill of Byrsa',
      caption: 'The hill of Byrsa today',
      cta: 'The foundation of Carthage'
    },
    cmp: {
      title: 'Roman myth / reality',
      labelMyth: 'MYTH',
      labelReal: 'REALITY',
      pairs: [
        { myth: '"Carthage was razed to the ground"', reality: 'The city was burnt and dismantled, but not erased: Punic houses, streets and cisterns have been found beneath the Roman layers, preserved several metres high.' },
        { myth: '"Salt was sown to sterilise the soil"', reality: 'No ancient source — not Polybius, Appian or Livy — mentions it. The story appears in modern writers of the 19th and 20th centuries. Salt was, besides, a precious commodity.' },
        { myth: '"Carthaginian civilisation vanished"', reality: 'Punic was still spoken in the 5th century AD. Towns in Roman Africa kept their suffetes, and Punic cults survived under Roman names.' },
        { myth: '"Carthage was never rebuilt"', reality: 'After the failure of Gaius Gracchus (122 BC), Caesar decided on the refoundation, carried out under Augustus: Carthage became the capital of Roman Africa and one of the largest cities of the Empire.' }
      ]
    },
    evidence: {
      title: 'Archaeological evidence',
      subtitle: 'What the excavations actually show, notably those of the UNESCO "Save Carthage" campaign (1972–1995).',
      items: [
        { kick: '44 – 29 BC', title: 'A refoundation on site', desc: 'Colonia Iulia Concordia Carthago was built exactly on the Punic site, for its harbours and its position. The curse of 146 did not last a century.', cls: 'tile--purple' },
        { kick: 'Stratigraphy', title: 'Punic structures preserved', desc: 'Punic walls, floors and cisterns appear beneath the Roman layers. On Byrsa, a thick burn layer precisely dates the capture of 146.', cls: '' },
        { kick: 'Texts', title: 'The salt myth', desc: 'No ancient author speaks of salt spread over Carthage: the episode is a modern invention, perhaps inspired by biblical or medieval stories.', cls: 'tile--sand' },
        { kick: 'Language', title: 'Cultural continuity', desc: 'Neo-Punic inscriptions, personal names, cults: Punic culture lived on. Saint Augustine still attests the use of the language around AD 400.', cls: '' },
        { kick: 'Harbours', title: 'The circular harbour', desc: 'The plan of the Cothon survived the centuries: the Romans refitted the Punic naval harbour, whose ship sheds have been found by excavation.', cls: 'tile--navy' },
        { kick: 'Town planning', title: 'A new grid', desc: 'The Romans laid out a new orthogonal plan and levelled the top of Byrsa — which paradoxically preserved the Punic quarter buried beneath the fill.', cls: '' }
      ]
    },
    cont: {
      kicker: 'After 146',
      title: 'Carthage did not disappear',
      cta: 'Carthage and Tunisia',
      intro: 'The city of 146 did burn: excavations on Byrsa and in the Punic quarter find the fire layer, collapsed houses, sling bullets and catapult balls. But a civilisation is more than a city. Punic language, cults, institutions and towns lived on for centuries, and Carthage itself was rebuilt on the same site.',
      alt: {
        badge: "Another reading — the site author's view",
        title: 'Carthage taken by sabotage, not destroyed',
        thesis: [
          "For the author of this site, Carthage was not destroyed: it was taken, through sabotage, at a time when Hannibal was no longer there to defend it. Rome and Masinissa, jealous of its wealth, trade and networks, seized the chance to take control of it.",
          'On this reading, the story of a razed city comes from Roman books, written by the victors to magnify their victory.'
        ],
        answerTitle: 'What archaeology and historians say',
        answer: [
          'Excavations on Byrsa and in the Punic quarter uncover the city of 146: an ash layer, collapsed houses, burned beams, projectiles in the streets. These remains can still be seen at Carthage.',
          'The salt sown on the ruins and total erasure are indeed inventions: Punic culture survived and Rome rebuilt on the site.',
          'Hannibal was not merely absent in 149: he had been dead since 183. Carthage lost its best defender when he went into exile in 195.',
          "Jealousy and fear of Carthaginian wealth, however, are well attested: see the page on wealth and Rome."
        ]
      },
      items: [
        { key: '5th c.', title: 'The Punic language', desc: 'Spoken until the 5th century AD, nearly six centuries after the fall of Carthage. Saint Augustine, born in Thagaste, bears witness to it and quotes Punic words.' },
        { key: '1st – 2nd c.', title: 'Neo-Punic inscriptions', desc: 'Punic was still carved, in a script called Neo-Punic, until the 1st and 2nd centuries, then written in Latin letters until the 4th century.' },
        { key: 'Numidia', title: 'The language of kings', desc: 'The Numidian kings, Masinissa included, governed and minted coins in Punic. At Dougga, official inscriptions are bilingual, Libyan and Punic.' },
        { key: 'Suffetes', title: 'Lasting institutions', desc: 'Under Rome, African towns such as Leptis Magna or Mactar still elected suffetes, the magistrates of the Carthaginian tradition, into the 1st and 2nd centuries.' },
        { key: 'Saturn', title: 'The gods change their names', desc: 'Baal Hammon is worshipped as African Saturn and Tanit as Caelestis, at the same sanctuaries and with stelae inherited from the Punic model.' },
        { key: 'Utica, Hadrumetum', title: 'Punic towns remain', desc: 'Utica, Hadrumetum (Sousse), Leptis, Kerkouane… several Punic cities came through the war; some, Rome\'s allies in 149, kept their status as free cities.' },
        { key: '29 BC', title: 'Carthage reborn', desc: 'Decided by Caesar, the colony was founded under Augustus on the same site. It became the capital of Africa Proconsularis and one of the largest cities of the Empire.' },
        { key: '1979', title: 'A name and a heritage', desc: 'The name Africa, then Ifriqiya, comes from the territory of Carthage. The archaeological site is a UNESCO World Heritage Site.' }
      ]
    },
    today: {
      title: 'Carthage today',
      cta: 'Animated map',
      items: [
        { img: 'ruins.jpg', alt: 'Ruins of the Antonine Baths by the sea', caption: 'Ruins of the Antonine Baths, on the Mediterranean shore' },
        { img: 'baths.jpg', alt: 'The Antonine Baths', caption: 'The Antonine Baths (2nd c. AD), among the largest in the Roman Empire' }
      ]
    },
    more: {
      title: 'Read also',
      items: [
        { to: '/guerres-puniques', kick: '264 – 146 BC', title: 'The Punic Wars', text: 'Three wars, a century of conflict over the Mediterranean.', cls: 'tile--terra' },
        { to: '/fondation', kick: '814 BC', title: 'The foundation', text: 'Elissa, the oxhide and the hill of Byrsa.', cls: 'tile--purple' },
        { to: '/chronologie', kick: 'Timeline', title: 'Seven centuries of history', text: 'All the key dates of Carthage, era by era.', cls: '' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Polybius', work: 'Histories', ref: 'I, 73', note: 'eyewitness of the siege alongside Scipio Aemilianus; Appian\'s source' },
      { type: 'ancient', author: 'Appian of Alexandria', work: 'Libyca (The African Book)', ref: '95', note: 'the isthmus walls, the siege and the fall of Byrsa' },
      { type: 'ancient', author: 'Livy', work: 'History of Rome', note: 'Masinissa\'s encroachments (193, 174–172 BC)' },
      { type: 'ancient', author: 'Livy', work: 'Periochae', ref: '51', note: 'length of the city wall (23 miles)' },
      { type: 'ancient', author: 'Plutarch', work: 'Life of Cato the Elder', note: 'the figs of Carthage' },
      { type: 'ancient', author: 'Orosius', work: 'Histories against the Pagans', note: 'circuit of the city and of Byrsa' },
      { type: 'ancient', author: 'Strabo', work: 'Geography (book 17)', note: 'circuit of the peninsula' },
      { type: 'ancient', author: 'Homer', work: 'Iliad', ref: 'VI, 448–449', note: 'lines quoted by Scipio Aemilianus before the burning city' },
      { type: 'ancient', author: 'Saint Augustine', note: 'witness to Punic still being spoken around AD 400' },
      { type: 'modern', author: 'Abdelmajid Ennabli', work: 'Pour sauver Carthage : exploration et conservation de la cité punique, romaine et byzantine', ref: 'Unesco/INAA, 1992', note: 'on the UNESCO “Save Carthage” campaign' },
      { type: 'modern', author: 'Friedrich Rakob', note: 'German excavations of the Magon quarter, cited on this page' },
      { type: 'modern', author: 'General Duval', note: 'fortified line across the isthmus (1949), cited on this page' }
    ]
  },

  ar: {
    meta: {
      title: 'الاستيلاء على قرطاج — 149-146 ق.م',
      desc: 'الحرب البونيقية الثالثة: نزع السلاح، وحصار دام ثلاث سنوات، وسكيبيو إيميليانوس، وسقوط بيرصا، وصدربعل وزوجته، وأسطورة الملح، وإعادة التأسيس الرومانية.'
    },
    hero: {
      chip: '149 – 146 ق.م',
      title: 'الاستيلاء على قرطاج',
      lede: 'ما فعلته روما، وما ادّعت أنها فعلته: الحرب البونيقية الثالثة، من نزع سلاح المدينة إلى إحراق بيرصا.',
      alt: 'الحي البونيقي على تلة بيرصا',
      caption: 'الحي البونيقي في بيرصا، أُحرق سنة 146'
    },
    stats: [
      { n: '3 سنوات', t: 'من الحصار، من 149 إلى ربيع 146 ق.م' },
      { n: '200,000', t: 'درع و2,000 منجنيق سُلّمت لروما قبل الحرب' },
      { n: '6 أيام', t: 'وست ليالٍ من قتال الشوارع حتى بيرصا' },
      { n: '50,000', t: 'ناجٍ خرجوا من بيرصا وبيعوا عبيدًا' }
    ],
    cato: {
      kicker: 'كاتو الأكبر',
      text: 'عاد كاتو من سفارة إلى إفريقيا مذهولًا من ازدهار قرطاج المتجدد، فصار يختم كل خطبه في مجلس الشيوخ بهذه العبارة: «يجب تدمير قرطاج». وحسب بلوتارخوس، عرض تينًا طازجًا قُطف في قرطاج قبل ثلاثة أيام: العدو على مرمى شراع. أما سكيبيو ناسيكا فدافع عن الإبقاء على المدينة.'
    },
    myth: {
      kicker: 'الرواية والوقائع',
      title: 'تدمير حقيقي، لا محو',
      text: 'أحرقت روما قرطاج وفكّكتها، وقتلت سكانها أو استعبدتهم. لكن حكاية مدينة «سُوّيت بالأرض» وعُقّمت بالملح أسطورة: فالحفريات تجد المدينة البونيقية تحت المدينة الرومانية، وقد عاشت الثقافة البونيقية قرونًا بعدها.',
      cta: 'التاريخ الذي كتبه المنتصر'
    },
    massi: {
      title: 'ماسينيسا، الصانع الآخر للسقوط',
      intro: 'وجّهت روما الضربة الأخيرة، لكن الملك النوميدي ماسينيسا هو من قضم أراضي قرطاج طوال خمسين عاماً وقدّم لروما ذريعتها.',
      alt: 'قطعة نقدية لماسينيسا ملك نوميديا',
      caption: 'قطعة نقدية لماسينيسا — المتحف البريطاني',
      whyKicker: 'لماذا؟',
      whyTitle: 'أراضٍ غنية ومدينة مشتهاة',
      why: 'أراد ماسينيسا بناء مملكة نوميدية كبرى مستقرة، ذات مدن وأراضٍ للقمح. لكن أخصب السهول وأغنى المراكز التجارية في إفريقيا كانت لقرطاج التي نجا رخاؤها من الهزيمة. وكان يعلم أن كل ضمّ سيمرّ دون عقاب ما دامت روما تسانده.',
      rowsKicker: 'خمسون عاماً من الضغط، 206 – 148',
      rows: [
        { k: '212 – 206', v: 'نشأ في قرطاج حسب أبيانوس، وقاتل من أجلها في هسبانيا ضد آل سكيبيو.' },
        { k: '206', v: 'تساند قرطاج خصمه سيفاقس، فينتقل ماسينيسا إلى معسكر روما.' },
        { k: '202', v: 'فرسانه النوميديون حاسمون في زاما: يعودون لضرب جيش حنبعل من الخلف.' },
        { k: '201', v: 'تسمح له معاهدة السلام بالمطالبة بـ«أراضي أجداده» دون تحديد حدودها، وتمنع قرطاج من أي حرب دون موافقة روما: لم تعد قرطاج قادرة على الدفاع عن نفسها وحدها.' },
        { k: '193', v: 'يستولي على جزء من الإمبوريا، المراكز التجارية الغنية في خليج السرت الصغير (تيتوس ليفيوس). وترسل روما محكّمين لا يحسمون شيئاً.' },
        { k: '174 – 172', v: 'تشكو قرطاج إلى روما أن ماسينيسا انتزع منها في عامين أكثر من 70 مدينة وحصناً (تيتوس ليفيوس).' },
        { k: '162 – 161', v: 'ضمّ جديد للإمبوريا؛ تحكم روما لصالح ماسينيسا، وتُلزَم قرطاج فوق ذلك بدفع 500 تالنت له (بوليبيوس).' },
        { k: '153 – 152', v: 'يستولي على السهول الكبرى ومنطقة دقة، نحو خمسين مدينة (أبيانوس). وتعود البعثة الرومانية التي جاءت للتحكيم، وفيها كاتو، مقتنعة بوجوب تدمير قرطاج.' },
        { k: '150', v: 'بعد أن ضاقت بها السبل، تجنّد قرطاج نحو 25 000 رجل بقيادة صدربعل. يُحاصَر الجيش ويُجوَّع فيستسلم، ويذبح فرسان غولوسا بن ماسينيسا الأسرى. وهذا هو خرق معاهدة 201 الذي كانت روما تنتظره.' },
        { k: '148', v: 'يموت ماسينيسا في نحو التسعين من عمره في أثناء حصار قرطاج، ويقسّم سكيبيو إيميليانوس مملكته بين أبنائه.' }
      ],
      hannibalKicker: 'من دون حنبعل',
      hannibal: 'فقدت قرطاج أفضل المدافعين عنها: فبعد أن أصبح حنبعل شفطاً أصلح الدولة وأعاد التوازن إلى ماليتها، لكن خصومه وشوا به إلى روما، فنُفي سنة 195 ومات سنة 183، قبل الحرب الأخيرة بزمن طويل.',
      romeKicker: 'حليف مُربك',
      rome: 'استعملت روما ماسينيسا دون أن تريد ترك قرطاج له. ويرى عدد من المؤرخين المحدثين أن تدمير المدينة كان يهدف أيضاً إلى منع مملكة نوميدية شديدة القوة من الاستيلاء عليها: فعند موته قُسّمت مملكته فوراً.',
    },
    def: {
      title: 'تحصينات قرطاج',
      intro: 'قبل الحصار، هذا ما كان على روما أن تأخذه: مدينة مبنية على شبه جزيرة، يغلقها من جهة البر أحد أقوى التحصينات في العالم القديم. وهي التي تفسّر صمود مدينة منزوعة السلاح قرابة ثلاث سنوات.',
      map: {
        aria: 'رسم تخطيطي لشبه جزيرة قرطاج: خط دفاع ثلاثي عبر البرزخ، وسور البحر، وقلعة بيرصا، والموانئ، والزاوية الضعيفة من السور',
        caption: 'إعادة تصوّر تخطيطية — المسارات والأبعاد تقريبية، استنادًا إلى بوليبيوس وأبيانوس.',
        lbl: { mainland: 'البر', gulf: 'خليج — سبخة أريانة اليوم', sea: 'البحر المتوسط', lake: 'بحيرة تونس', isthmus: 'البرزخ', megara: 'ميغارا', byrsa: 'بيرصا', ports: 'الموانئ', angle: 'الزاوية الضعيفة' },
        legend: ['الخط الثلاثي عبر البرزخ', 'سور البحر (مفرد)', 'بيرصا، القلعة', 'الموانئ', 'الزاوية الضعيفة (أبيانوس)']
      },
      appian: {
        kicker: 'أبيانوس، الحروب الليبية، 95',
        title: 'السور الثلاثي على البرزخ',
        rows: [
          { k: 'البرزخ', v: 'عرضه نحو 25 ستاديون (≈ 4,5 كم) حسب بوليبيوس (1، 73) وأبيانوس: وهو المنفذ البري الوحيد.' },
          { k: 'الارتفاع', v: '30 ذراعًا (≈ 13 إلى 14 م) لكل سور، دون احتساب المتاريس والأبراج.' },
          { k: 'السُّمك', v: '30 قدمًا (≈ 9 م).' },
          { k: 'الأبراج', v: 'برج كل بليثرونين (≈ 60 م)، من أربعة طوابق.' },
          { k: 'الطابق السفلي', v: 'مرابط لـ300 فيل ومخازن لعلفها.' },
          { k: 'الطابق العلوي', v: 'إسطبلات لـ4 000 حصان ومخازن للشعير والعلف.' },
          { k: 'الثكنات', v: 'تتسع لـ20 000 راجل و4 000 فارس.' }
        ],
        note: 'ثلاثة أسوار متطابقة؟ كتب أبيانوس في القرن الثاني الميلادي نقلًا عن بوليبيوس الذي شهد الحصار. ويرى كثير من المؤرخين المحدثين فيه بالأحرى دفاعًا متدرّجًا: خندق، ثم سياج أو سور أمامي، ثم السور الكبير ذو الأبراج الذي يضم الثكنات والإسطبلات.'
      },
      tiles: [
        { cls: 'tile--terra', kick: 'الطول', title: '34 كم، رقم يحتاج إلى تدقيق', text: 'الرقم المتداول مصدره تيتوس ليفيوس (الملخّصات، 51): سور محيطه 23 ميلًا رومانيًا، أي نحو 34 كم. ويعدّ أوروسيوس 22 ميلًا (≈ 32,5 كم)، أما سترابون فيعطي 360 ستاديون (≈ 65 كم) لمحيط شبه الجزيرة كلها. ولم يُعثر قط على المسار كاملًا: فلنقل إنه سور بطول ثلاثين كيلومترًا تقريبًا، يضم ضاحية ميغارا وبساتينها.' },
        { cls: 'tile--navy', kick: 'جهة البحر', title: 'سور واحد', text: 'حيث كان البحر والمنحدرات يحميان المدينة، كفى سور واحد (أبيانوس). ونقطة الضعف: الزاوية المنخفضة المهملة حيث يلتقي هذا السور بلسان الأرض المؤدي إلى الموانئ. هناك دفع القنصل سنسورينوس بكباشه سنة 149، فسُدّت الثغرة جزئيًا في الليل ورُدّ الهجوم.' },
        { cls: 'tile--sand', kick: 'القلعة', title: 'بيرصا، المعقل الأخير', text: 'في قلب المدينة، كان لتلة بيرصا سورها الخاص حول معبد أشمون، ويقدّر أوروسيوس محيطه بأكثر من ميلين بقليل (≈ 3 كم). وفي سنة 146 كانت آخر حصون المحاصَرين.' },
        { cls: 'tile--paper', kick: 'الموانئ', title: 'الكوثون، الدفاع البحري', text: 'الميناء المزدوج وأحواضه لـ220 سفينة موصوفة في صفحة التأسيس. وفي أثناء الحصار صارت هدفًا حاسمًا: سدّ سكيبيو مدخلها بسدّ، وشقّ المحاصَرون قناة جديدة.', to: '/fondation', cta: 'موانئ قرطاج' },
        { cls: 'tile--outline', kick: 'علم الآثار', title: 'ما كشفته الحفريات', text: 'من جهة البحر، كشفت الحفريات الألمانية بإشراف فريدريش راكوب (حي ماغون، حملة اليونسكو) السور البحري من القرن الخامس ق.م وبابًا يفتح على الشاطئ. وعلى البرزخ، تتبّع الجنرال دوفال سنة 1949 خطًا محصّنًا على نحو 2,9 كم، وعدّه السور الخارجي البونيقي.' },
        { cls: 'tile--purple', kick: 'للتمييز', title: '«سور ثيودوسيوس»', text: 'ليست كل الأسوار المكتشفة في قرطاج بونيقية. فنحو سنة 425 م، في عهد ثيودوسيوس الثاني، شيّدت قرطاج الرومانية سورًا جديدًا في وجه الخطر الوندالي، وقد نقّبت فيه فرق كندية منذ 1976. ولا علاقة له بأسوار 146.' }
      ]
    },
    war: {
      title: 'ما حدث فعلًا',
      cta: 'التسلسل الزمني كاملًا',
      events: [
        { date: '151 ق.م', title: 'الذريعة.', desc: 'تنهي قرطاج دفع غرامة الحرب وتدافع عن نفسها بالسلاح ضد تعديات الملك النوميدي ماسينيسا. وتعدّ روما ذلك خرقًا لمعاهدة 201 التي تمنعها من أي حرب دون موافقتها.' },
        { date: '149 ق.م', title: 'نزع السلاح والإنذار.', desc: 'ينزل القنصلان مانيليوس وسنسورينوس في أوتيكا التي انحازت إلى روما. تسلّم قرطاج 300 رهينة و200,000 درع و2,000 منجنيق. ثم تطالب روما بهجر المدينة وإعادة بنائها على بعد 80 ستاديون (نحو 15 كم) من البحر. يرفض القرطاجيون.' },
        { date: '149–148 ق.م', title: 'مدينة تتسلّح من جديد.', desc: 'يُصهر كل معدن متاح لصنع أسلحة جديدة، وحسب أبيانوس قصّت النساء شعورهن لتُجدل منها حبال المجانيق. تفشل الهجمات الرومانية الأولى، بينما يسيطر صدربعل على الأرياف.' },
        { date: '147 ق.م', title: 'سكيبيو إيميليانوس.', desc: 'يُنتخب قنصلًا رغم صغر سنه، وهو الحفيد بالتبني لسكيبيو الإفريقي، فيُحكم الحصار ويسدّ مدخل الميناء بسدّ. فيحفر المحاصَرون قناة جديدة نحو البحر ويطلقون أسطولًا بُني سرًّا.' },
        { date: 'ربيع 146', title: 'الهجوم الأخير.', desc: 'يستولي الرومان على منطقة الموانئ ثم على الساحة العامة. وطوال ستة أيام وست ليالٍ يتقدمون بيتًا بيتًا على طول الشوارع الثلاثة الصاعدة إلى بيرصا، ويحرقون المباني تباعًا.' },
        { date: '146 ق.م', title: 'سقوط بيرصا.', desc: 'يخرج 50,000 رجل وامرأة من القلعة ويستسلمون. ويتحصّن نحو 900 فارّ روماني في معبد أشمون ويضرمون فيه النار. ويستسلم صدربعل لسكيبيو.' },
        { date: '146 ق.م', title: 'بعد النصر.', desc: 'تحترق المدينة أيامًا، وتأمر لجنة من عشرة شيوخ بتفكيك ما تبقى وتلعن الموقع. تصبح الأرض ولاية إفريقيا الرومانية وعاصمتها أوتيكا، وتُهدى المكتبات إلى الملوك النوميديين. وفي السنة نفسها تدمّر روما كورنثة.' }
      ]
    },
    end: {
      title: 'الأيام الأخيرة',
      aside: 'شهد بوليبيوس، صديق سكيبيو ومستشاره، سقوط المدينة، ونقل أبيانوس روايته.',
      hasdrubal: {
        kicker: 'صدربعل البويتارخ وزوجته',
        title: 'اختيار اللهب',
        text: 'يستسلم صدربعل، قائد الدفاع، في النهاية متوسلًا عند قدمي سكيبيو. ومن أعلى المعبد المشتعل، تلعنه زوجته، وقد لبست أجمل ثيابها، على جبنه، ثم تقتل ولديهما وتلقي بنفسها معهما في اللهب.'
      },
      scipio: {
        kicker: 'دموع سكيبيو',
        quote: '«سيأتي يوم تهلك فيه طروادة المقدسة، ويهلك بريام وشعب بريام ذو الرماح الجيدة.»',
        text: 'أمام المدينة المشتعلة، يبكي سكيبيو إيميليانوس ويستشهد بهذه الأبيات من الإلياذة. وحين سأله بوليبيوس، أسرّ إليه بخوفه من أن يصيب المصير نفسه روما يومًا ما.',
        alt: 'تمثال نصفي يُنسب إلى سكيبيو الإفريقي',
        caption: 'تمثال نصفي يُنسب إلى سكيبيو الإفريقي، الجد بالتبني لسكيبيو إيميليانوس'
      }
    },
    byrsa: {
      kicker: 'بيرصا',
      title: 'القلعة، من المعركة الأخيرة إلى الحفريات',
      paragraphs: [
        'على قمة تلة ديدون الأسطورية كان يقوم معبد أشمون، يُصعد إليه بستين درجة. هناك دارت الساعات الأخيرة لقرطاج البونيقية.',
        'في عهد أغسطس، سوّى الرومان القمة لبناء ساحة المدينة الجديدة. فغطّت الأتربة المنحدرات — وحمت دون قصد حيًّا سكنيًا بونيقيًا من القرن الثاني ق.م، بشوارعه وصهاريجه، كشفه علماء آثار فرنسيون منذ سبعينيات القرن العشرين.'
      ],
      alt: 'تلة بيرصا',
      caption: 'تلة بيرصا اليوم',
      cta: 'تأسيس قرطاج'
    },
    cmp: {
      title: 'الأسطورة الرومانية / الحقيقة',
      labelMyth: 'الأسطورة',
      labelReal: 'الحقيقة',
      pairs: [
        { myth: '«قرطاج سُوّيت بالأرض»', reality: 'أُحرقت المدينة وفُكّكت، لكنها لم تُمحَ: فقد وُجدت بيوت وشوارع وصهاريج بونيقية تحت الطبقات الرومانية، محفوظة على ارتفاع عدة أمتار.' },
        { myth: '«نُثر الملح لتعقيم الأرض»', reality: 'لا يذكر ذلك أي مصدر قديم — لا بوليبيوس ولا أبيانوس ولا تيتوس ليفيوس. ظهرت القصة عند مؤلفين محدثين في القرنين 19 و20. ثم إن الملح كان سلعة ثمينة.' },
        { myth: '«الحضارة القرطاجية اختفت»', reality: 'كانت البونيقية ما تزال تُتكلَّم في القرن الخامس الميلادي. وحافظت مدن في إفريقيا الرومانية على الشفطين، واستمرت العبادات البونيقية تحت أسماء رومانية.' },
        { myth: '«قرطاج لم يُعَد بناؤها أبدًا»', reality: 'بعد فشل غايوس غراكوس (122 ق.م)، قرّر قيصر إعادة التأسيس ونُفّذت في عهد أغسطس: صارت قرطاج عاصمة إفريقيا الرومانية ومن أكبر مدن الإمبراطورية.' }
      ]
    },
    evidence: {
      title: 'الأدلة الأثرية',
      subtitle: 'ما تقوله الحفريات فعلًا، ولا سيما حفريات حملة اليونسكو «لننقذ قرطاج» (1972–1995).',
      items: [
        { kick: '44 – 29 ق.م', title: 'إعادة تأسيس في الموقع نفسه', desc: 'بُنيت «كولونيا يوليا كونكورديا قرطاج» على الموقع البونيقي تمامًا، لموانئه وموقعه. ولم تصمد لعنة 146 قرنًا واحدًا.', cls: 'tile--purple' },
        { kick: 'علم الطبقات', title: 'هياكل بونيقية محفوظة', desc: 'تظهر جدران وأرضيات وصهاريج بونيقية تحت الطبقات الرومانية. وفي بيرصا تؤرّخ طبقة حريق سميكة الاستيلاءَ سنة 146 بدقة.', cls: '' },
        { kick: 'النصوص', title: 'أسطورة الملح', desc: 'لا يتحدث أي مؤلف قديم عن ملح نُثر على قرطاج: الحكاية اختراع حديث، ربما استُلهم من قصص توراتية أو وسيطة.', cls: 'tile--sand' },
        { kick: 'اللغة', title: 'استمرارية ثقافية', desc: 'نقائش بونيقية حديثة، وأسماء أشخاص، وعبادات: استمرت الثقافة البونيقية. ويشهد القديس أوغسطين على استعمال اللغة نحو سنة 400 م.', cls: '' },
        { kick: 'الموانئ', title: 'الميناء الدائري', desc: 'عبر مخطط الكوثون القرون: أعاد الرومان تهيئة الميناء العسكري البونيقي، وكشفت الحفريات أحواض سفنه.', cls: 'tile--navy' },
        { kick: 'العمران', title: 'شبكة جديدة', desc: 'رسم الرومان مخططًا متعامدًا جديدًا وسوّوا قمة بيرصا — ما حفظ، على نحو مفارق، الحي البونيقي المدفون تحت الردم.', cls: '' }
      ]
    },
    cont: {
      kicker: 'بعد 146',
      title: 'قرطاج لم تختفِ',
      cta: 'قرطاج وتونس',
      intro: 'احترقت مدينة 146 فعلاً: فالحفريات في بيرصا والحي البونيقي تكشف طبقة الحريق والبيوت المنهارة وكرات المقلاع وقذائف المنجنيق. لكن الحضارة أكبر من مدينة. فقد عاشت اللغة البونيقية وعباداتها ومؤسساتها ومدنها قروناً، وأُعيد بناء قرطاج نفسها في الموقع ذاته.',
      alt: {
        badge: 'قراءة أخرى — رأي صاحب الموقع',
        title: 'قرطاج أُخذت بالتخريب ولم تُدمَّر',
        thesis: [
          'يرى صاحب هذا الموقع أن قرطاج لم تُدمَّر، بل أُخذت بالتخريب في وقت لم يعد فيه حنبعل موجوداً للدفاع عنها. وقد استغلت روما وماسينيسا، غيرةً من ثرائها وتجارتها وشبكاتها، الفرصة للسيطرة عليها.',
          'وحسب هذه القراءة، فإن رواية المدينة المسوّاة بالأرض مصدرها الكتب الرومانية التي كتبها المنتصرون لتضخيم نصرهم.'
        ],
        answerTitle: 'ما يقوله علم الآثار والمؤرخون',
        answer: [
          'تكشف الحفريات في بيرصا والحي البونيقي مدينة 146: طبقة رماد وبيوت منهارة وعوارض محترقة وقذائف في الشوارع، ولا تزال هذه البقايا ظاهرة في قرطاج.',
          'أما الملح المنثور على الأنقاض والمحو التام فهما اختلاق فعلاً: فقد بقيت الثقافة البونيقية وأعادت روما البناء في الموقع.',
          'لم يكن حنبعل غائباً فحسب سنة 149، بل كان قد مات منذ 183، وخسرت قرطاج أفضل المدافعين عنها بنفيه سنة 195.',
          'في المقابل، فإن الغيرة والخوف من ثراء قرطاج ثابتان في المصادر: انظر صفحة الثروة وروما.'
        ]
      },
      items: [
        { key: 'ق 5 م', title: 'اللغة البونيقية', desc: 'ظلت متداولة حتى القرن الخامس الميلادي، بعد نحو ستة قرون من سقوط قرطاج. ويشهد بذلك القديس أوغسطين، ابن طاغست، ويورد كلمات بونيقية.' },
        { key: 'ق 1 – 2 م', title: 'نقوش بونيقية حديثة', desc: 'ظلّ الناس ينقشون بالبونيقية، بخط يُسمّى البونيقي الحديث، حتى القرنين الأول والثاني، ثم كتبوها بحروف لاتينية حتى القرن الرابع.' },
        { key: 'نوميديا', title: 'لغة الملوك', desc: 'حكم ملوك نوميديا، ومنهم ماسينيسا، وسكّوا نقودهم بالبونيقية. وفي دقة جاءت النقوش الرسمية مزدوجة اللغة، ليبية وبونيقية.' },
        { key: 'الشفطون', title: 'مؤسسات باقية', desc: 'في ظل روما، ظلت مدن إفريقية مثل لبدة الكبرى ومكثر تنتخب شفطين، وهم قضاة التقليد القرطاجي، حتى القرنين الأول والثاني.' },
        { key: 'ساتورن', title: 'الآلهة تغيّر أسماءها', desc: 'يُعبد بعل حمون باسم ساتورن الإفريقي وتانيت باسم كايليستيس، في المعابد نفسها وبنصب موروثة عن النموذج البونيقي.' },
        { key: 'أوتيكا، حضرموت', title: 'المدن البونيقية باقية', desc: 'أوتيكا وحضرموت (سوسة) ولبدة وكركوان… عبرت عدة مدن بونيقية الحرب، واحتفظ بعضها، وقد حالف روما سنة 149، بمكانة المدن الحرة.' },
        { key: '29 ق.م', title: 'قرطاج تولد من جديد', desc: 'قررها قيصر وأُسست المستعمرة في عهد أغسطس في الموقع ذاته، فصارت عاصمة إفريقيا البروقنصلية وإحدى كبرى مدن الإمبراطورية.' },
        { key: '1979', title: 'اسم وتراث', desc: 'اسم «أفريكا» ثم «إفريقية» مأخوذ من أرض قرطاج. والموقع الأثري مسجّل في قائمة التراث العالمي لليونسكو.' }
      ]
    },
    today: {
      title: 'قرطاج اليوم',
      cta: 'الخريطة المتحركة',
      items: [
        { img: 'ruins.jpg', alt: 'أطلال حمامات أنطونيوس على شاطئ البحر', caption: 'أطلال حمامات أنطونيوس على ضفة المتوسط' },
        { img: 'baths.jpg', alt: 'حمامات أنطونيوس', caption: 'حمامات أنطونيوس (القرن 2 م)، من أكبر حمامات الإمبراطورية الرومانية' }
      ]
    },
    more: {
      title: 'اقرأ أيضًا',
      items: [
        { to: '/guerres-puniques', kick: '264 – 146 ق.م', title: 'الحروب البونيقية', text: 'ثلاث حروب وقرن من الصراع على المتوسط.', cls: 'tile--terra' },
        { to: '/fondation', kick: '814 ق.م', title: 'التأسيس', text: 'عليسة وجلد الثور وتلة بيرصا.', cls: 'tile--purple' },
        { to: '/chronologie', kick: 'التسلسل الزمني', title: 'سبعة قرون من التاريخ', text: 'كل التواريخ الكبرى لقرطاج، حقبة بعد حقبة.', cls: '' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'بوليبيوس', work: 'التواريخ', ref: '1، 73', note: 'شاهد عيان على الحصار إلى جانب سكيبيو إيميليانوس، ومصدر أبيانوس' },
      { type: 'ancient', author: 'أبيانوس السكندري', work: 'الحروب الليبية (الكتاب الإفريقي)', ref: '95', note: 'أسوار البرزخ والحصار وسقوط بيرصا' },
      { type: 'ancient', author: 'تيتوس ليفيوس', work: 'تاريخ روما', note: 'توسّع ماسينيسا على حساب قرطاج (193، 174–172 ق.م)' },
      { type: 'ancient', author: 'تيتوس ليفيوس', work: 'الملخّصات', ref: '51', note: 'طول سور المدينة (23 ميلًا)' },
      { type: 'ancient', author: 'بلوتارخ', work: 'حياة كاتو الأكبر', note: 'تين قرطاج' },
      { type: 'ancient', author: 'أوروسيوس', work: 'التواريخ ضد الوثنيين', note: 'محيط المدينة وبيرصا' },
      { type: 'ancient', author: 'سترابون', work: 'الجغرافيا (الكتاب 17)', note: 'محيط شبه الجزيرة' },
      { type: 'ancient', author: 'هوميروس', work: 'الإلياذة', ref: '6، 448–449', note: 'أبيات استشهد بها سكيبيو إيميليانوس أمام المدينة المحترقة' },
      { type: 'ancient', author: 'القديس أوغسطين', note: 'شاهد على استعمال البونيقية نحو سنة 400 م' },
      { type: 'modern', author: 'عبد المجيد النابلي', work: 'Pour sauver Carthage : exploration et conservation de la cité punique, romaine et byzantine', ref: 'Unesco/INAA، 1992', note: 'عن حملة اليونسكو «لننقذ قرطاج»' },
      { type: 'modern', author: 'فريدريش راكوب', note: 'الحفريات الألمانية في حي ماغون، مذكور في الصفحة' },
      { type: 'modern', author: 'الجنرال دوفال', note: 'الخط المحصّن على البرزخ (1949)، مذكور في الصفحة' }
    ]
  }
}

const c = await useLocalized('prise-de-carthage', C)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.massi-side { display: flex; flex-direction: column; gap: var(--gap); }
.massi-fig { min-height: 320px; background: var(--white); }
.massi-fig > img { object-fit: contain; padding: 20px; }
.massi-foot { margin-top: var(--gap); }
.cont-intro { max-width: 860px; margin-bottom: 32px; color: var(--navy-soft); }
.cont-grid { row-gap: 28px; }
.stat-text { font: 500 15px/1.45 var(--font-body); margin-top: 10px; }

.def-map { display: flex; flex-direction: column; gap: 16px; margin: 0; }
.def-svg { display: block; width: 100%; height: auto; border-radius: var(--r-md); direction: ltr; }
.def-lbl { font: 600 16px var(--font-body); fill: var(--stone); }
.def-lbl--water { fill: var(--navy); font-style: italic; }
.def-lbl--strong { fill: var(--ink); font-weight: 800; }
.def-lbl--muted { fill: var(--muted); font-style: italic; }
.def-lbl--small { font-size: 14px; fill: var(--ink); }
.def-legend { list-style: none; display: flex; flex-wrap: wrap; gap: 8px 18px; font: 500 13px/1.3 var(--font-body); color: var(--stone); }
.def-legend li { display: flex; align-items: center; gap: 8px; }
.def-key { display: inline-block; width: 22px; height: 0; border-top: 4px solid var(--ink); flex: none; }
.def-key--0 { border-top: 5px double var(--terra); height: 5px; }
.def-key--1 { border-top: 3px dashed var(--purple); }
.def-key--2 { width: 12px; height: 12px; border: 0; border-radius: 50%; background: var(--terra); }
.def-key--3 { width: 14px; height: 10px; border: 0; border-radius: 2px; background: var(--navy); }
.def-key--4 { width: 0; height: 0; border: 0; border-inline: 7px solid transparent; border-bottom: 12px solid var(--gold); }
.def-cap { font: 500 13px/1.45 var(--font-body); color: var(--muted); font-style: italic; }
.def-h { margin: 6px 0 20px; }
.def-rows .val { color: var(--on-dark); }
.def-note { margin-top: 22px; font: 500 14px/1.55 var(--font-body); border-inline-start: 3px solid var(--gold); padding-inline-start: 14px; }
.def-grid { margin-top: var(--gap); }
.def-tile { min-height: 280px; gap: 18px; }
.def-card-h { margin: 6px 0 10px; }
.def-cta { align-self: flex-start; }

.quote { margin: 0 0 20px; }
.quote p {
  font: 900 clamp(34px, 4.4vw, 64px)/0.95 var(--font-display);
  letter-spacing: -0.03em;
  color: var(--purple);
}
.quote--sm p { font: 700 clamp(19px, 1.6vw, 23px)/1.3 var(--font-display); letter-spacing: 0; color: var(--ink); }
.cato-text { max-width: 640px; color: var(--stone); }
.myth-title { margin-bottom: 16px; }

.war-rows .ev-title { display: block; font: 800 19px/1.2 var(--font-display); color: var(--white); margin-bottom: 4px; }
.war-rows .val { color: var(--on-dark-2); }

.end { padding-top: 0; }
.end-h { margin-bottom: 12px; }
.scipio-fig { min-height: 420px; }

.byrsa-fig { min-height: 520px; }
.byrsa-title { margin-bottom: 20px; }
.byrsa-p + .byrsa-p { margin-top: 14px; }
.byrsa-cta { margin-top: 24px; }

.cmp-title { margin-bottom: 28px; }
.cmp-labels { margin-bottom: 12px; font: 800 14px/1 var(--font-body); letter-spacing: 0.08em; }
[dir="rtl"] .cmp-labels { letter-spacing: 0; }
.cmp-labels span { padding-inline: 28px; }
.lbl-myth { color: var(--stone); }
.lbl-real { color: var(--purple); }
.cmp { display: flex; flex-direction: column; gap: var(--gap); }
.pair .tile { border-radius: var(--r-md); }
.pair .h-card { margin: 0; }
.tag-myth, .tag-real { display: none; }
.real { color: var(--ink); }

.ev { min-height: 220px; }
.tile--navy .kicker, .tile--purple .kicker { opacity: 1; }

.cont { border-top: 3px solid var(--gold); padding-top: 16px; }
.cont-key { font: 900 22px/1 var(--font-display); color: var(--gold-light); margin-bottom: 10px; }
.cont-h { font: 800 19px/1.15 var(--font-display); margin: 0 0 6px; }
.tile--navy .sec-head .h-section { margin: 0; }

.today-fig { min-height: 380px; }
.more-title { margin-bottom: 20px; }
.more { min-height: 200px; }

@media (max-width: 1100px) {
  .tile--navy .cols-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px var(--gap); }
}

@media (max-width: 960px) {
  .byrsa-fig { min-height: 360px; }
  .scipio-fig { min-height: 360px; }
}

@media (max-width: 640px) {
  .fig--hero { min-height: 240px; }
  .stat { padding: 18px; }
  .stat .num { font-size: 30px; }
  .stat-text { font-size: 13px; }
  .war-rows .ev-title { font-size: 17px; }
  .cmp-labels { display: none; }
  .tag-myth, .tag-real { display: block; }
  .tag-myth { color: var(--stone); }
  .pair .tile { padding: 22px; }
  .ev, .more, .def-tile { min-height: 0; }
  .tile--navy .cols-4 { grid-template-columns: minmax(0, 1fr); }
  .today-fig, .byrsa-fig, .scipio-fig { min-height: 280px; }
}
</style>
