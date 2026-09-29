<template>
  <div class="pg">
    <!-- Héros -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--olive tile--stack tile--hero s-7">
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display hero-title">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
        <div class="chips">
          <span v-for="t in c.hero.tags" :key="t" class="chip chip--glass">{{ t }}</span>
        </div>
      </div>
      <figure class="fig s-5 hero-fig">
        <img src="/img/kerkouane.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Sommaire -->
    <nav class="toc" :aria-label="c.tocLabel">
      <a v-for="s in c.toc" :key="s.id" :href="'#' + s.id" class="pill-btn toc-link">{{ s.label }}</a>
    </nav>

    <!-- Comment le sait-on -->
    <section class="sec">
      <div class="tile tile--xl tile--paper tile--outline how">
        <div>
          <span class="kicker">{{ c.how.kicker }}</span>
          <h2 class="h-block how-title">{{ c.how.title }}</h2>
        </div>
        <div class="how-grid">
          <div v-for="h in c.how.items" :key="h.k">
            <h3 class="h-card">{{ h.k }}</h3>
            <p class="body">{{ h.v }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- La maison -->
    <section id="maison" class="sec sec--wide">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.house.kicker }}</span>
          <h2 class="h-section">{{ c.house.title }}</h2>
        </div>
        <p>{{ c.house.intro }}</p>
      </div>
    </section>
    <div class="cols cols-5-7">
      <figure class="fig house-fig" style="background:#8E3720">
        <img src="/img/kerkouane-baignoire-sabot.jpg" :alt="c.house.alt" loading="lazy">
        <figcaption>{{ c.house.caption }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--navy tile--stack">
        <div class="rows rows--light" style="--row-key:110px">
          <div v-for="r in c.house.rows" :key="r.k">
            <span class="key house-key">{{ r.k }}</span>
            <span class="val">{{ r.v }}</span>
          </div>
        </div>
        <NuxtLink :to="localePath('/art-et-artisanat')" class="btn btn-outline self-start">{{ c.house.link }}</NuxtLink>
      </div>
    </div>

    <!-- À table -->
    <section id="table" class="sec sec--wide">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.table.kicker }}</span>
          <h2 class="h-section">{{ c.table.title }}</h2>
        </div>
        <p>{{ c.table.intro }}</p>
      </div>
    </section>
    <div class="bento">
      <div class="tile tile--xl tile--ink s-7 recipe">
        <span class="kicker">{{ c.recipe.kicker }}</span>
        <h3 class="h-block recipe-title">{{ c.recipe.title }}</h3>
        <div class="seg recipe-seg" role="group" :aria-label="c.recipe.modeLabel">
          <button
            v-for="m in ['cato', 'modern']"
            :key="m"
            type="button"
            :class="{ on: mode === m }"
            :aria-pressed="mode === m"
            @click="mode = m"
          >{{ c.recipe.modes[m] }}</button>
        </div>
        <ul class="ing" :aria-label="c.recipe.ingLabel">
          <li v-for="(it, i) in c.recipe.ing[mode]" :key="i">
            <span class="ing-q">{{ it.q }}</span>
            <span class="ing-n">{{ it.n }}</span>
          </li>
        </ul>
        <ol class="steps">
          <li v-for="(s, i) in c.recipe.steps[mode]" :key="i">
            <span class="step-n" aria-hidden="true">{{ i + 1 }}</span>
            <p>{{ s }}</p>
          </li>
        </ol>
        <p class="recipe-note">{{ c.recipe.notes[mode] }}</p>
      </div>
      <div class="tile tile--xl tile--gold tile--stack s-5">
        <div>
          <span class="kicker">{{ c.cato.kicker }}</span>
          <blockquote class="latin" lang="la">
            <p>{{ c.cato.latin }}</p>
          </blockquote>
          <p class="body-lg cato-tr">{{ c.cato.tr }}</p>
          <p class="src">{{ c.cato.src }}</p>
        </div>
        <p class="body cato-warn">{{ c.cato.warn }}</p>
      </div>
    </div>
    <div class="cols cols-4">
      <div v-for="f in c.food" :key="f.t" class="tile tile--stack food" :class="f.tone">
        <div>
          <span class="kicker">{{ f.k }}</span>
          <h3 class="h-card">{{ f.t }}</h3>
          <p class="body">{{ f.d }}</p>
        </div>
        <NuxtLink v-if="f.to" :to="localePath(f.to)" class="more">{{ f.link }} →</NuxtLink>
      </div>
    </div>
    <section class="sec sec-tight">
      <div class="tile tile--xl tile--outline sober">
        <div v-for="s in c.sober" :key="s.k" class="sober-item">
          <span class="kicker">{{ s.k }}</span>
          <h3 class="h-card">{{ s.t }}</h3>
          <p class="body">{{ s.d }}</p>
          <NuxtLink v-if="s.to" :to="localePath(s.to)" class="more">{{ s.link }} →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- S'habiller et se parer -->
    <section id="parure" class="sec sec--wide">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.dress.kicker }}</span>
          <h2 class="h-section">{{ c.dress.title }}</h2>
        </div>
        <p>{{ c.dress.intro }}</p>
      </div>
    </section>
    <div class="bento">
      <figure class="fig s-4 stele-fig" style="background:#2A2521">
        <img src="/img/stele-pretre-enfant.jpg" :alt="c.dress.steleAlt" loading="lazy">
        <figcaption class="cap-box">{{ c.dress.steleCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--purple s-8">
        <div class="rows rows--light dress-rows" style="--row-key:130px">
          <div v-for="r in c.dress.rows" :key="r.k">
            <span class="key dress-key">{{ r.k }}</span>
            <span class="val">{{ r.v }}</span>
          </div>
        </div>
      </div>
      <figure class="fig s-7 pend-fig" style="background:#5E574F">
        <img src="/img/pendentifs-masques-verre.jpg" :alt="c.dress.pendAlt" loading="lazy">
        <figcaption>{{ c.dress.pendCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--paper tile--outline tile--stack s-5">
        <div>
          <span class="kicker">{{ c.dress.soft.kicker }}</span>
          <h3 class="h-block soft-title">{{ c.dress.soft.title }}</h3>
          <p v-for="(p, i) in c.dress.soft.paras" :key="i" class="body-lg para">{{ p }}</p>
        </div>
        <p class="src">{{ c.dress.soft.src }}</p>
      </div>
    </div>

    <!-- Les noms -->
    <section id="noms" class="sec sec--wide">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.names.kicker }}</span>
          <h2 class="h-section">{{ c.names.title }}</h2>
        </div>
        <p>{{ c.names.intro }}</p>
      </div>
    </section>
    <div class="names">
      <article v-for="n in nameCards" :key="n.id" class="name">
        <div class="name-top">
          <span class="phoen name-glyph" dir="rtl" aria-hidden="true">{{ n.g }}</span>
          <span class="name-lvl" :class="'lvl-' + n.lvl">{{ c.names.lvl[n.lvl] }}</span>
        </div>
        <h3 class="h-card name-h">{{ n.name }}</h3>
        <p class="name-tr"><span class="sr-only">{{ c.names.trLabel }} </span>{{ n.t }}</p>
        <p class="name-m">{{ n.m }}</p>
        <p class="name-d">{{ n.d }}</p>
      </article>
    </div>
    <div class="bento">
      <div class="tile tile--xl tile--sand s-12 parts">
        <div>
          <span class="kicker">{{ c.names.parts.kicker }}</span>
          <h3 class="h-block parts-title">{{ c.names.parts.title }}</h3>
          <p class="body-lg">{{ c.names.parts.p }}</p>
          <NuxtLink :to="localePath('/langue-ecriture')" class="btn btn-primary parts-btn">{{ c.names.parts.link }}</NuxtLink>
        </div>
        <ul class="parts-list">
          <li v-for="(p, i) in PARTS" :key="p.t">
            <span class="phoen part-g" dir="rtl" aria-hidden="true">{{ p.g }}</span>
            <span class="part-t">{{ p.t }}</span>
            <span class="part-m">{{ c.names.parts.meanings[i] }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Le temps -->
    <section id="temps" class="sec sec--wide">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.time.kicker }}</span>
          <h2 class="h-section">{{ c.time.title }}</h2>
        </div>
        <p>{{ c.time.intro }}</p>
      </div>
    </section>
    <div class="bento">
      <div class="tile tile--xl tile--ink s-7">
        <span class="kicker">{{ c.time.months.kicker }}</span>
        <h3 class="h-block months-title">{{ c.time.months.title }}</h3>
        <p class="body months-p">{{ c.time.months.p }}</p>
        <div class="rows" style="--row-key:170px">
          <div v-for="(m, i) in MONTHS" :key="m.t">
            <span class="key month-key">
              <span class="phoen month-g" dir="rtl" aria-hidden="true">{{ m.g }}</span>
              <span class="month-t">{{ m.t }}</span>
            </span>
            <span class="val month-v">{{ c.time.months.notes[i] }}</span>
          </div>
        </div>
      </div>
      <div class="tile tile--xl tile--terra tile--stack s-5">
        <div>
          <span class="kicker">{{ c.time.feast.kicker }}</span>
          <h3 class="h-block feast-title">{{ c.time.feast.title }}</h3>
          <p v-for="(p, i) in c.time.feast.paras" :key="i" class="body-lg para">{{ p }}</p>
        </div>
        <div class="chips">
          <span v-for="t in c.time.feast.tags" :key="t" class="chip chip--glass">{{ t }}</span>
        </div>
      </div>
      <div class="tile tile--xl tile--paper s-12 home-rel">
        <div>
          <span class="kicker">{{ c.time.home.kicker }}</span>
          <h3 class="h-block">{{ c.time.home.title }}</h3>
        </div>
        <div class="rows" style="--row-key:170px">
          <div v-for="r in c.time.home.rows" :key="r.k">
            <span class="key home-key">{{ r.k }}</span>
            <span class="val">{{ r.v }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Musique, jeux, enfance -->
    <section id="enfance" class="sec sec--wide">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.kids.kicker }}</span>
          <h2 class="h-section">{{ c.kids.title }}</h2>
        </div>
        <p>{{ c.kids.intro }}</p>
      </div>
    </section>
    <div class="cols cols-5-7">
      <figure class="fig tamb-fig" style="background:#B5875A">
        <img src="/img/statuette-tambourin-bardo.jpg" :alt="c.kids.alt" loading="lazy">
        <figcaption class="cap-box">{{ c.kids.caption }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--sand">
        <div class="rows" style="--row-key:130px">
          <div v-for="r in c.kids.rows" :key="r.k">
            <span class="key kids-key">{{ r.k }}</span>
            <span class="val">{{ r.v }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mort et mémoire -->
    <section id="memoire" class="sec">
      <div class="tile tile--xl tile--navy memo">
        <div>
          <span class="kicker">{{ c.memo.kicker }}</span>
          <h2 class="h-block">{{ c.memo.title }}</h2>
        </div>
        <div>
          <p class="body-lg">{{ c.memo.p }}</p>
          <div class="memo-btns">
            <NuxtLink :to="localePath('/religion')" class="btn btn-outline">{{ c.memo.l1 }}</NuxtLink>
            <NuxtLink :to="localePath('/art-et-artisanat')" class="btn btn-outline">{{ c.memo.l2 }}</NuxtLink>
          </div>
        </div>
      </div>
    </section>

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
const mode = ref('cato')

// Noms puniques : graphie consonantique (de droite à gauche), translittération, degré de certitude
const NAMES = [
  { id: 'hannibal', g: '𐤇𐤍𐤁𐤏𐤋', t: 'Ḥnbʿl', lvl: 'sure' },
  { id: 'hasdrubal', g: '𐤏𐤆𐤓𐤁𐤏𐤋', t: 'ʿzrbʿl', lvl: 'sure' },
  { id: 'hamilcar', g: '𐤇𐤌𐤋𐤒𐤓𐤕', t: 'Ḥmlqrt', lvl: 'prob' },
  { id: 'bomilcar', g: '𐤁𐤃𐤌𐤋𐤒𐤓𐤕', t: 'Bdmlqrt', lvl: 'prob' },
  { id: 'himilcon', g: '𐤇𐤌𐤋𐤊𐤕', t: 'Ḥmlkt', lvl: 'deb' },
  { id: 'magon', g: '𐤌𐤂𐤍', t: 'Mgn', lvl: 'prob' },
  { id: 'hannon', g: '𐤇𐤍𐤀', t: 'Ḥnʾ', lvl: 'prob' },
  { id: 'adherbal', g: '𐤀𐤃𐤓𐤁𐤏𐤋', t: 'ʾdrbʿl', lvl: 'sure' },
  { id: 'abdmelqart', g: '𐤏𐤁𐤃𐤌𐤋𐤒𐤓𐤕', t: 'ʿbdmlqrt', lvl: 'sure' },
  { id: 'amotmelqart', g: '𐤀𐤌𐤕𐤌𐤋𐤒𐤓𐤕', t: 'ʾmtmlqrt', lvl: 'sure' },
  { id: 'sophonisbe', g: '𐤑𐤐𐤍𐤁𐤏𐤋', t: 'Ṣpnbʿl', lvl: 'prob' },
  { id: 'elissa', g: '𐤀𐤋𐤔𐤕', t: 'ʾlšt', lvl: 'deb' }
]

// Éléments qui composent les noms
const PARTS = [
  { g: '𐤁𐤏𐤋', t: 'bʿl' },
  { g: '𐤌𐤋𐤒𐤓𐤕', t: 'mlqrt' },
  { g: '𐤇𐤍', t: 'ḥn' },
  { g: '𐤏𐤆𐤓', t: 'ʿzr' },
  { g: '𐤏𐤁𐤃', t: 'ʿbd' },
  { g: '𐤀𐤌𐤕', t: 'ʾmt' },
  { g: '𐤁𐤃', t: 'bd' },
  { g: '𐤀𐤇', t: 'ʾḥ' }
]

// Mois attestés par les inscriptions phéniciennes et puniques (ordre non assuré)
const MONTHS = [
  { g: '𐤆𐤁𐤇 𐤔𐤌𐤔', t: 'zbḥ šmš' },
  { g: '𐤌𐤓𐤐𐤀', t: 'mrpʾ' },
  { g: '𐤐𐤏𐤋𐤕', t: 'pʿlt' },
  { g: '𐤊𐤓𐤓', t: 'krr' },
  { g: '𐤇𐤉𐤓', t: 'ḥyr' },
  { g: '𐤌𐤐𐤏', t: 'mpʿ' },
  { g: '𐤀𐤕𐤍𐤌', t: 'ʾtnm' },
  { g: '𐤁𐤋', t: 'bl' }
]

const C = {
  fr: {
    meta: {
      title: 'La vie quotidienne à Carthage — maison, table, vêtements, noms, fêtes',
      desc: "Vivre à Carthage : la maison de Kerkouane, la puls punica de Caton, le vin passum, les vêtements et parures, les noms puniques et leur sens (Hannibal, Hasdrubal, Hamilcar…), le calendrier, les fêtes, la musique et l'enfance."
    },
    hero: {
      chip: 'Carthage · Vie quotidienne',
      title: 'La vie quotidienne à Carthage',
      lede: "Que mangeait-on, comment s'habillait-on, comment appelait-on ses enfants ? Les réponses tiennent en fragments : des maisons arasées, le mobilier des tombes, des milliers d'inscriptions brèves, et le regard, souvent moqueur, des Grecs et des Romains.",
      tags: ['VIe – IIe s. av. J.-C.', 'Kerkouane · Byrsa', 'Archéologie et textes'],
      alt: 'Rues et maisons puniques arasées de Kerkouane, au bord de la mer',
      caption: 'Kerkouane, cap Bon : une ville punique figée au IIIe s. av. J.-C.'
    },
    tocLabel: 'Sommaire de la page',
    toc: [
      { id: 'maison', label: 'La maison' },
      { id: 'table', label: 'À table' },
      { id: 'parure', label: "S'habiller" },
      { id: 'noms', label: 'Les noms' },
      { id: 'temps', label: 'Le temps' },
      { id: 'enfance', label: 'Musique et enfance' },
      { id: 'memoire', label: 'Mémoire' }
    ],
    how: {
      kicker: 'Avant de commencer',
      title: 'Comment le sait-on ?',
      items: [
        { k: 'Les fouilles', v: "Kerkouane, abandonnée vers le milieu du IIIe s. av. J.-C. et jamais rebâtie, et les quartiers puniques de Byrsa montrent les maisons ; les nécropoles livrent la vaisselle, les bijoux, les jouets." },
        { k: 'Les inscriptions', v: "Des milliers de stèles votives, surtout du tophet, donnent des noms, des métiers, des généalogies, parfois une date. Elles sont brèves et presque toutes religieuses." },
        { k: 'Les auteurs étrangers', v: "Caton, Plaute, Platon, Tite-Live ou Justin parlent de Carthage de l'extérieur, souvent en adversaires. On les cite, en gardant la distance critique." }
      ]
    },
    house: {
      kicker: 'La maison',
      title: 'Autour de la cour',
      intro: "Les maisons puniques ne subsistent qu'au ras du sol, mais elles racontent la vie de famille : l'eau, l'hygiène, l'intimité.",
      alt: 'Baignoire-sabot punique enduite de mortier rose, avec son siège, à Kerkouane',
      caption: 'Baignoire-sabot avec siège, Kerkouane',
      rows: [
        { k: 'Le plan', v: "Rues droites, îlots réguliers : à Kerkouane comme dans les quartiers dits de Magon et d'Hannibal à Carthage, chaque maison s'ordonne autour d'une cour à ciel ouvert." },
        { k: "L'entrée", v: "Un couloir étroit relie la rue à la cour : de l'extérieur, on ne voit pas la vie de la maison. Une pièce sur rue servait peut-être de boutique." },
        { k: "L'eau", v: "Chaque foyer a sa citerne, remplie par les eaux de pluie ; un puisard recueille les eaux usées. L'eau est une affaire privée." },
        { k: 'Le bain', v: "À Kerkouane, de nombreuses maisons possèdent une petite salle d'eau avec une baignoire-sabot enduite, munie d'un siège : un confort rare dans le monde antique de l'époque." },
        { k: 'Les sols', v: "Le pavimentum punicum, mortier rouge semé d'éclats de pierre, porte parfois le signe de Tanit près de l'entrée." },
        { k: 'Les étages', v: "À Carthage, des escaliers prouvent l'existence d'un ou plusieurs étages ; Appien parle d'immeubles de six niveaux, sans confirmation archéologique." }
      ],
      link: "L'architecture en détail"
    },
    table: {
      kicker: 'À table',
      title: 'Blé, fromage, miel et poisson',
      intro: "Aucun livre de cuisine punique ne nous est parvenu. On reconstitue les repas par les restes des fouilles, les ustensiles, et quelques textes latins."
    },
    recipe: {
      kicker: 'La recette « punique » de Caton',
      title: 'Puls punica',
      modeLabel: 'Version de la recette',
      modes: { cato: 'Selon Caton', modern: 'Adaptation moderne' },
      ingLabel: 'Ingrédients',
      ing: {
        cato: [
          { q: '1 livre', n: "d'alica (gruau de blé amidonnier)" },
          { q: '3 livres', n: 'de fromage frais' },
          { q: '½ livre', n: 'de miel' },
          { q: '1', n: 'œuf' }
        ],
        modern: [
          { q: '325 g', n: "de gruau d'épeautre ou d'amidonnier" },
          { q: '1 kg', n: 'de fromage frais égoutté (type ricotta)' },
          { q: '160 g', n: 'de miel' },
          { q: '1', n: 'œuf battu' }
        ]
      },
      steps: {
        cato: [
          "Mettre l'alica dans l'eau et la laisser bien s'imbiber.",
          'La verser dans un bassin propre.',
          'Ajouter le fromage frais, le miel et l’œuf ; bien mélanger le tout.',
          'Transvaser dans un pot neuf, et cuire.'
        ],
        modern: [
          "Faire tremper le gruau 1 à 2 heures dans l'eau froide, puis l'égoutter.",
          'Le mettre dans un saladier propre.',
          "Incorporer le fromage, le miel et l'œuf ; mélanger jusqu'à obtenir une pâte homogène.",
          "Cuire à feu doux dans une casserole en remuant, 15 à 20 minutes, jusqu'à consistance de bouillie épaisse. Servir tiède."
        ]
      },
      notes: {
        cato: 'Caton ne donne ni durée ni température : une livre romaine pèse environ 327 g.',
        modern: "Proportions de Caton converties en grammes. Temps de trempage, cuisson et substitutions sont des suggestions modernes, non des données antiques."
      }
    },
    cato: {
      kicker: 'Le texte latin',
      latin: '« Pultem punicam sic coquito. Libram alicae in aquam indito, facito uti bene madeat… »',
      tr: '« Fais cuire la bouillie punique ainsi. Mets une livre d’alica dans l’eau, fais qu’elle soit bien trempée… »',
      src: 'Caton l’Ancien, De agricultura, 85 (milieu du IIe s. av. J.-C.)',
      warn: "Attention : c'est une recette romaine « à la punique ». Elle dit ce que les Romains associaient à Carthage, pas forcément ce que les Carthaginois mangeaient chaque jour. La bouillie de céréales était d'ailleurs aussi le plat de base des Romains."
    },
    food: [
      { k: 'Céréales', t: 'Pain et bouillies', d: "Blé et orge forment la base des repas, en galettes, pains et bouillies. Une maquette de four en terre cuite, du type du tabouna encore utilisé en Tunisie, a été trouvée dans une tombe de Carthage.", tone: 'tile--sand' },
      { k: 'La mer', t: 'Poisson et garum', d: "Thon, poissons séchés ou salés, coquillages ; et le garum, sauce de poisson fermenté dont le monde punique a répandu l'usage autour de la Méditerranée.", tone: 'tile--navy', to: '/economie', link: "L'économie" },
      { k: 'Vergers', t: 'Figues, grenades, dattes', d: "Figues, raisins, olives, amandes ; la grenade, que les Romains appelaient « pomme punique » (malum punicum, Pline l'Ancien, livre XIII) ; les dattes du palmier, emblème qui orne les monnaies de Carthage.", tone: '' },
      { k: 'Le vin', t: 'Le passum', d: "Magon donnait la recette de ce vin de raisins séchés au soleil puis macérés dans du moût ; l'agronome romain Columelle l'a recopiée (De re rustica, XII, 39).", tone: 'tile--purple', to: '/agriculture', link: "L'agriculture" }
    ],
    sober: [
      { k: 'Platon, Lois, II, 674a', t: 'Une loi contre le vin', d: "Selon Platon, une loi carthaginoise interdisait le vin aux soldats en campagne, aux magistrats pendant leur année de charge, aux pilotes et aux juges en service." },
      { k: 'Caton au Sénat', t: 'La figue de Carthage', d: "Pour montrer que l'ennemi n'était qu'à trois jours de mer, Caton aurait brandi au Sénat une figue fraîche cueillie à Carthage (Pline l'Ancien, XV, 74-76).", to: '/agriculture', link: 'Lire l’anecdote' },
      { k: 'À prendre avec prudence', t: 'Le chien au menu ?', d: "Justin (XIX, 1) prête au roi perse Darius l'ordre d'interdire aux Carthaginois de manger du chien. L'anecdote, isolée et tardive, reste invérifiable." }
    ],
    dress: {
      kicker: "S'habiller et se parer",
      title: 'Lin, pourpre et bijoux',
      intro: "Aucun vêtement punique n'a survécu. On les connaît par les stèles, les terres cuites, les sarcophages — et par les railleries des étrangers.",
      steleAlt: "Stèle gravée d'un prêtre en longue robe et coiffe haute, portant un enfant",
      steleCap: 'Stèle dite « du prêtre à l’enfant », tophet de Carthage, IVe s. av. J.-C. (musée du Bardo)',
      pendAlt: 'Quatre pendentifs en pâte de verre colorée figurant des têtes barbues aux grands yeux',
      pendCap: 'Pendentifs-masques en pâte de verre, Carthage, IVe – IIIe s. av. J.-C.',
      rows: [
        { k: 'La tunique', v: "Hommes et femmes portent une longue tunique, souvent sans ceinture : c'est ainsi que Plaute habille le Carthaginois Hannon dans sa comédie Poenulus (début du IIe s. av. J.-C.)." },
        { k: 'Les prêtres', v: "Robe de lin, coiffe haute, tête rasée : c'est l'image de la stèle ci-contre. Silius Italicus décrit de même les prêtres de Melqart à Gadès, pieds nus et vêtus de lin (Punica, III)." },
        { k: 'Manteau et pourpre', v: "Un manteau drapé complète la tenue. La pourpre, tirée du murex, était produite sur place : Kerkouane a livré des amas de coquillages broyés." },
        { k: 'Coiffures', v: "Masques et terres cuites montrent des hommes barbus, des femmes voilées ou aux longs cheveux tombant sur les épaules." },
        { k: 'Bijoux', v: "Colliers chargés, boucles d'oreilles, anneaux de nez (nezem), bagues-sceaux : l'or et les pierres dures se portaient en abondance." },
        { k: 'Parfums', v: "Flacons de verre coloré, brûle-parfums, miroirs de bronze accompagnent les défunts : le soin du corps allait jusque dans la tombe." },
        { k: 'Amulettes', v: "Petits masques de verre, figurines de Bès ou œil oudjat, étuis d'or ou d'argent portés au cou : on se protégeait du mauvais œil." }
      ],
      soft: {
        kicker: 'Un cliché à nuancer',
        title: '« Mollesse » punique ?',
        paras: [
          "Pour les Grecs et les Romains, les Phéniciens sont des marchands raffinés, parfumés, couverts de bijoux, donc peu virils. Plaute en tire des effets comiques : robe longue, pas de ceinture, serviteurs aux oreilles percées d'anneaux.",
          "Ces signes étaient ordinaires au Proche-Orient et ne disent rien d'un manque de rigueur. Tite-Live lui-même décrit Hannibal sobre, dormant à même le sol dans son manteau de soldat, vêtu comme ses égaux."
        ],
        src: 'Plaute, Poenulus, v. 975 et suiv. · Tite-Live, XXI, 4'
      }
    },
    names: {
      kicker: 'Les noms puniques',
      title: 'Des noms qui sont des prières',
      intro: "La plupart des noms carthaginois sont de courtes phrases qui invoquent un dieu. Écrits sans voyelles, de droite à gauche, ils nous arrivent souvent déformés par le grec et le latin.",
      trLabel: 'Translittération :',
      lvl: { sure: 'Sens assuré', prob: 'Sens probable', deb: 'Sens discuté' },
      items: {
        hannibal: { name: 'Hannibal', m: '« Grâce de Baal », « Baal a fait grâce »', d: "Nom très courant dans les inscriptions, bien avant le fils d'Hamilcar Barca." },
        hasdrubal: { name: 'Hasdrubal', m: '« Baal est mon aide »', d: "Porté par le gendre et par un fils d'Hamilcar, et par le dernier chef de Carthage en 146." },
        hamilcar: { name: 'Hamilcar', m: '« Frère de Melqart »', d: "Lecture la plus courante (ʾḥ-mlqrt) : le nom rattache son porteur au dieu de Tyr." },
        bomilcar: { name: 'Bomilcar', m: '« Dans la main de Melqart »', d: "C'est-à-dire sous sa protection. Porté par un général qui tenta de s'emparer du pouvoir en 308 av. J.-C. (Diodore, XX, 44)." },
        himilcon: { name: 'Himilcon', m: '« Frère de la Reine » (?)', d: "Milkat, « la Reine », serait un titre divin ; l'interprétation reste discutée. Nom du navigateur de l'Atlantique (Pline, II, 169)." },
        magon: { name: 'Magon', m: '« Don » (des dieux)', d: "Sans doute de la racine mgn, « donner ». Nom de l'agronome et du plus jeune frère d'Hannibal." },
        hannon: { name: 'Hannon', m: '« Grâce, faveur »', d: "Forme abrégée d'un nom en ḥn-, dont le dieu est sous-entendu. Nom du navigateur du Périple et d'Hannon le Grand." },
        adherbal: { name: 'Adherbal', m: '« Baal est puissant »', d: "Porté par l'amiral qui battit la flotte romaine à Drépane en 249 av. J.-C. (Polybe, I, 49-51)." },
        abdmelqart: { name: 'Abdmelqart', m: '« Serviteur de Melqart »', d: "Les noms en ʿbd-, « serviteur de », suivis d'un nom divin, figurent parmi les plus fréquents sur les stèles." },
        amotmelqart: { name: 'Amotmelqart', m: '« Servante de Melqart »', d: "Pendant féminin, attesté sur les stèles votives de Carthage, où des femmes font des offrandes en leur propre nom." },
        sophonisbe: { name: 'Sophonisbe', m: '« Baal a protégé »', d: "Forme grecque et latine d'un nom punique restitué Ṣapanbaʿal : lecture probable, non certaine." },
        elissa: { name: 'Élissa', m: 'Sens inconnu', d: "Transcription grecque d'un nom phénicien restitué ʾlšt ; son sens, comme celui de Didon, reste débattu." }
      },
      parts: {
        kicker: 'Lire un nom punique',
        title: 'Les briques des noms',
        p: "Un nom punique combine un nom divin et un mot ou un verbe. Dans les inscriptions, chacun est suivi de sa filiation, parfois sur plusieurs générations (« X fils de Y fils de Z ») ; les mêmes noms reviennent souvent du grand-père au petit-fils, d'où tant d'Hannibal et d'Hasdrubal.",
        link: "L'alphabet phénicien",
        meanings: ['« seigneur », Baal', '« roi de la ville », Melqart', '« grâce »', '« aide »', '« serviteur »', '« servante »', '« de la main de »', '« frère »']
      }
    },
    time: {
      kicker: 'Le temps',
      title: 'Mois, fêtes et dieux de la maison',
      intro: "Le calendrier punique n'est connu que par bribes : quelques noms de mois, quelques fêtes, surtout à travers des inscriptions et des auteurs grecs.",
      months: {
        kicker: 'Le calendrier',
        title: 'Des mois lunaires',
        p: "Le mot yrḥ désigne à la fois la lune et le mois. À Carthage, on datait les années par les noms des deux suffètes en charge. Voici des mois attestés dans les inscriptions phéniciennes et puniques ; leur ordre dans l'année reste reconstitué.",
        notes: [
          "« Sacrifice du soleil ». Cité sur les lamelles d'or de Pyrgi (vers 500 av. J.-C.).",
          'Sens discuté, peut-être lié à la guérison (racine rpʾ).',
          'Sens inconnu.',
          'Sens inconnu.',
          'Sens inconnu.',
          'Sens inconnu.',
          'Connu aussi par la Bible (Étanim, 1 Rois 8, 2).',
          "Bul, cité sur le sarcophage d'Eshmunazar à Sidon et dans la Bible (1 Rois 6, 38)."
        ]
      },
      feast: {
        kicker: 'Les fêtes',
        title: 'Le réveil de Melqart',
        paras: [
          "À Tyr, le roi Hiram aurait institué le « réveil » (en grec égersis) d'Héraclès-Melqart (Ménandre d'Éphèse, cité par Flavius Josèphe, Antiquités juives, VIII, 146). Des inscriptions puniques mentionnent un titre de prêtre, « ressusciteur du dieu » (mqm ʾlm), qu'on rattache à ce rite ; son déroulement reste inconnu.",
          "Chaque année, Carthage envoyait à Tyr une ambassade chargée d'offrandes pour Melqart : des envoyés carthaginois s'y trouvaient pendant le siège d'Alexandre, en 332 (Arrien, Anabase, II, 24)."
        ],
        tags: ['Égersis', 'Offrandes à Tyr', 'Déméter et Korè (396)']
      },
      home: {
        kicker: 'Religion domestique',
        title: 'Les dieux à la maison',
        rows: [
          { k: 'Au seuil', v: "À Kerkouane, certains sols d'entrée portent le signe de Tanit : une protection placée là où l'on entre." },
          { k: 'Contre le mal', v: "Masques grimaçants suspendus, amulettes de Bès ou d'Horus : on écartait les démons de la maison comme du corps." },
          { k: 'Lumière et encens', v: "Lampes à huile et brûle-parfums, parfois en forme de tête divine, servaient au quotidien comme au culte." },
          { k: 'Dieux nouveaux', v: "En 396 av. J.-C., Carthage adopte le culte grec de Déméter et Korè (Diodore, XIV, 77) : la piété aussi circulait." }
        ]
      }
    },
    kids: {
      kicker: 'Musique, jeux, enfance',
      title: 'Tambourins et biberons',
      intro: "Les tombes d'enfants et les figurines de terre cuite donnent un aperçu, bien partiel, des loisirs et de l'éducation.",
      alt: 'Statuette punique en terre cuite : femme voilée tenant un tambourin contre sa poitrine',
      caption: 'Femme au tambourin, terre cuite, musée national du Bardo',
      rows: [
        { k: 'Musique', v: "Des figurines montrent des femmes tenant un tambourin (tambour sur cadre) contre la poitrine ; le monde phénicien connaît aussi des joueurs de flûte double. Ces images sont souvent liées au culte." },
        { k: 'Tout-petits', v: "Les tombes d'enfants livrent des biberons de céramique et des amulettes protectrices ; on y a aussi signalé des clochettes et des hochets." },
        { k: 'Jeux', v: "Les osselets, jeu commun à toute la Méditerranée antique, apparaissent aussi en contexte punique ; les règles propres à Carthage nous échappent." },
        { k: 'Apprendre', v: "Scribes, prêtres et marchands savaient écrire. Le traité d'agronomie de Magon était écrit en punique ; Rome le fit traduire en latin après 146 (Pline, XVIII, 22)." },
        { k: 'Le grec', v: "Les élites l'apprenaient : Hannibal eut pour maître Sosylos de Sparte (Cornélius Népos, Hannibal, 13). Justin (XX, 5) rapporte pourtant une interdiction temporaire de son étude, au IVe s., après une trahison." }
      ]
    },
    memo: {
      kicker: 'Mort et mémoire',
      title: 'Après la vie',
      p: "Nécropoles hors les murs, tombes à puits, mobilier funéraire, stèles du tophet : les rites de la mort sont traités avec la religion, et l'architecture des tombes avec l'art punique.",
      l1: 'Rites funéraires',
      l2: 'Les nécropoles'
    },
    sources: [
      { type: 'modern', author: 'Gilbert Charles-Picard, Colette Picard', work: "La Vie quotidienne à Carthage au temps d'Hannibal", ref: 'Paris, Hachette, 1958', note: 'synthèse de référence sur le sujet' },
      { type: "ancient", author: "Caton l'Ancien", work: "De l'agriculture (De agri cultura)", ref: "85", note: "puls punica" },
      { type: "ancient", author: "Plaute", work: "Poenulus (Le Petit Carthaginois)", ref: "v. 975 et suiv." },
      { type: "ancient", author: "Platon", work: "Lois", ref: "II, 674a" },
      { type: "ancient", author: "Tite-Live", work: "Histoire romaine", ref: "XXI, 4" },
      { type: "ancient", author: "Polybe", work: "Histoires", ref: "I, 49–51" },
      { type: "ancient", author: "Diodore de Sicile", work: "Bibliothèque historique", ref: "XIV, 77 ; XX, 44" },
      { type: "ancient", author: "Justin", work: "Abrégé des Histoires philippiques de Trogue Pompée", ref: "XIX, 1 ; XX, 5" },
      { type: "ancient", author: "Cornelius Nepos", work: "Hannibal", ref: "13" },
      { type: "ancient", author: "Pline l'Ancien", work: "Histoire naturelle", ref: "II, 169 ; XIII ; XV, 74–76 ; XVIII, 22" },
      { type: "ancient", author: "Columelle", work: "De l'agriculture (De re rustica)", ref: "XII, 39" },
      { type: "ancient", author: "Silius Italicus", work: "Punica", ref: "III" },
      { type: "ancient", author: "Flavius Josèphe", work: "Antiquités juives", ref: "VIII, 146", note: "citant Ménandre d'Éphèse" },
      { type: "ancient", author: "Arrien", work: "Anabase", ref: "II, 24" },
      { type: "ancient", author: "Appien", work: "Libyca (Le Livre africain)", note: "immeubles de six étages" }
    ],
    relatedTitle: 'À lire aussi',
    related: [
      { to: '/art-et-artisanat', kick: 'Artisanat', title: 'Art et artisanat puniques', text: 'Bijoux, masques, verre, céramiques, et les maisons de Kerkouane.', cls: 'tile--terra' },
      { to: '/langue-ecriture', kick: 'Écriture', title: 'Langue et écriture puniques', text: "L'alphabet de 22 lettres, les inscriptions, et votre nom en phénicien.", cls: '' },
      { to: '/agriculture', kick: 'La terre', title: "L'agriculture de Carthage", text: 'Magon, les oliviers, la vigne et la figue de Caton.', cls: 'tile--olive' }
    ]
  },

  en: {
    meta: {
      title: 'Daily life in Carthage — house, food, clothing, names, festivals',
      desc: 'Living in Carthage: the houses of Kerkouane, Cato’s puls punica, passum wine, clothing and jewellery, Punic names and their meaning (Hannibal, Hasdrubal, Hamilcar…), the calendar, festivals, music and childhood.'
    },
    hero: {
      chip: 'Carthage · Daily life',
      title: 'Daily life in Carthage',
      lede: 'What did people eat, what did they wear, what did they call their children? The answers come in fragments: levelled houses, grave goods, thousands of short inscriptions, and the often mocking gaze of Greeks and Romans.',
      tags: ['6th – 2nd c. BC', 'Kerkouane · Byrsa', 'Archaeology and texts'],
      alt: 'Levelled Punic streets and houses of Kerkouane, by the sea',
      caption: 'Kerkouane, Cap Bon: a Punic town frozen in the 3rd c. BC'
    },
    tocLabel: 'Page contents',
    toc: [
      { id: 'maison', label: 'The house' },
      { id: 'table', label: 'Food' },
      { id: 'parure', label: 'Dress' },
      { id: 'noms', label: 'Names' },
      { id: 'temps', label: 'Time' },
      { id: 'enfance', label: 'Music and childhood' },
      { id: 'memoire', label: 'Memory' }
    ],
    how: {
      kicker: 'Before we start',
      title: 'How do we know?',
      items: [
        { k: 'Excavations', v: 'Kerkouane, abandoned around the mid-3rd c. BC and never rebuilt, and the Punic quarters of Byrsa show the houses; the necropolises yield tableware, jewellery and toys.' },
        { k: 'Inscriptions', v: 'Thousands of votive stelae, mostly from the tophet, give names, trades, genealogies, sometimes a date. They are short and almost all religious.' },
        { k: 'Foreign writers', v: 'Cato, Plautus, Plato, Livy and Justin speak of Carthage from the outside, often as enemies. We quote them, keeping a critical distance.' }
      ]
    },
    house: {
      kicker: 'The house',
      title: 'Around the courtyard',
      intro: 'Punic houses survive only at ground level, but they tell of family life: water, hygiene, privacy.',
      alt: 'Punic hip bath coated with pink mortar, with its seat, at Kerkouane',
      caption: 'Hip bath with seat, Kerkouane',
      rows: [
        { k: 'Layout', v: 'Straight streets, regular blocks: at Kerkouane as in the so-called Mago and Hannibal quarters of Carthage, each house is arranged around an open courtyard.' },
        { k: 'Entrance', v: 'A narrow corridor links the street to the courtyard: from outside, household life stays out of sight. A room on the street may have been a shop.' },
        { k: 'Water', v: 'Each household has its own cistern, filled by rainwater; a soakaway takes waste water. Water is a private matter.' },
        { k: 'Bathing', v: 'At Kerkouane, many houses have a small washroom with a plastered hip bath fitted with a seat: a rare comfort in the ancient world of the time.' },
        { k: 'Floors', v: 'The pavimentum punicum, red mortar studded with stone chips, sometimes bears the sign of Tanit near the entrance.' },
        { k: 'Upper floors', v: 'In Carthage, staircases prove there were one or more upper storeys; Appian speaks of six-storey buildings, without archaeological confirmation.' }
      ],
      link: 'Architecture in detail'
    },
    table: {
      kicker: 'Food',
      title: 'Grain, cheese, honey and fish',
      intro: 'No Punic cookbook has survived. Meals are reconstructed from excavated remains, utensils and a few Latin texts.'
    },
    recipe: {
      kicker: 'Cato’s “Punic” recipe',
      title: 'Puls punica',
      modeLabel: 'Recipe version',
      modes: { cato: 'Cato’s version', modern: 'Modern adaptation' },
      ingLabel: 'Ingredients',
      ing: {
        cato: [
          { q: '1 pound', n: 'of alica (emmer wheat groats)' },
          { q: '3 pounds', n: 'of fresh cheese' },
          { q: '½ pound', n: 'of honey' },
          { q: '1', n: 'egg' }
        ],
        modern: [
          { q: '325 g', n: 'spelt or emmer groats' },
          { q: '1 kg', n: 'drained fresh cheese (ricotta-style)' },
          { q: '160 g', n: 'honey' },
          { q: '1', n: 'beaten egg' }
        ]
      },
      steps: {
        cato: [
          'Put the alica in water and let it soak well.',
          'Pour it into a clean bowl.',
          'Add the fresh cheese, the honey and the egg; mix everything well.',
          'Transfer to a new pot, and cook.'
        ],
        modern: [
          'Soak the groats in cold water for 1 to 2 hours, then drain.',
          'Put them in a clean mixing bowl.',
          'Stir in the cheese, honey and egg until smooth.',
          'Cook over a low heat, stirring, for 15 to 20 minutes, until it thickens like porridge. Serve warm.'
        ]
      },
      notes: {
        cato: 'Cato gives no time or temperature: a Roman pound weighs about 327 g.',
        modern: 'Cato’s proportions converted into grams. Soaking and cooking times and substitutions are modern suggestions, not ancient data.'
      }
    },
    cato: {
      kicker: 'The Latin text',
      latin: '“Pultem punicam sic coquito. Libram alicae in aquam indito, facito uti bene madeat…”',
      tr: '“Cook Punic porridge thus. Put a pound of alica in water, make sure it is well soaked…”',
      src: 'Cato the Elder, De agricultura, 85 (mid-2nd c. BC)',
      warn: 'Note: this is a Roman recipe “in the Punic style”. It tells us what Romans associated with Carthage, not necessarily what Carthaginians ate every day. Cereal porridge was, in fact, the Romans’ own staple too.'
    },
    food: [
      { k: 'Cereals', t: 'Bread and porridge', d: 'Wheat and barley were the basis of meals, as flatbreads, loaves and porridge. A terracotta model of an oven, like the tabouna still used in Tunisia, was found in a Carthaginian tomb.', tone: 'tile--sand' },
      { k: 'The sea', t: 'Fish and garum', d: 'Tuna, dried or salted fish, shellfish; and garum, the fermented fish sauce whose use the Punic world spread around the Mediterranean.', tone: 'tile--navy', to: '/economie', link: 'The economy' },
      { k: 'Orchards', t: 'Figs, pomegranates, dates', d: 'Figs, grapes, olives, almonds; the pomegranate, which Romans called the “Punic apple” (malum punicum, Pliny the Elder, book XIII); and dates from the palm, the emblem on Carthage’s coins.', tone: '' },
      { k: 'Wine', t: 'Passum', d: 'Mago gave the recipe for this wine made from sun-dried grapes steeped in must; the Roman agronomist Columella copied it (De re rustica, XII, 39).', tone: 'tile--purple', to: '/agriculture', link: 'Agriculture' }
    ],
    sober: [
      { k: 'Plato, Laws, II, 674a', t: 'A law against wine', d: 'According to Plato, a Carthaginian law forbade wine to soldiers on campaign, to magistrates during their year of office, and to pilots and judges on duty.' },
      { k: 'Cato in the Senate', t: 'The fig of Carthage', d: 'To show that the enemy was only three days away by sea, Cato is said to have brandished a fresh fig picked in Carthage before the Senate (Pliny the Elder, XV, 74-76).', to: '/agriculture', link: 'Read the story' },
      { k: 'Handle with care', t: 'Dog on the menu?', d: 'Justin (XIX, 1) claims that the Persian king Darius ordered the Carthaginians to stop eating dog. The anecdote, isolated and late, cannot be verified.' }
    ],
    dress: {
      kicker: 'Dress and adornment',
      title: 'Linen, purple and jewellery',
      intro: 'No Punic garment has survived. We know them from stelae, terracottas, sarcophagi — and from foreigners’ jibes.',
      steleAlt: 'Stele engraved with a priest in a long robe and tall headdress, carrying a child',
      steleCap: 'The so-called “priest with child” stele, tophet of Carthage, 4th c. BC (Bardo Museum)',
      pendAlt: 'Four coloured glass-paste pendants showing bearded heads with large eyes',
      pendCap: 'Glass-paste mask pendants, Carthage, 4th – 3rd c. BC',
      rows: [
        { k: 'Tunic', v: 'Men and women wore a long tunic, often unbelted: that is how Plautus dresses the Carthaginian Hanno in his comedy Poenulus (early 2nd c. BC).' },
        { k: 'Priests', v: 'Linen robe, tall headdress, shaved head: this is the image on the stele shown here. Silius Italicus likewise describes the priests of Melqart at Gades as barefoot and dressed in linen (Punica, III).' },
        { k: 'Cloak and purple', v: 'A draped cloak completed the outfit. Purple dye, taken from the murex, was produced locally: Kerkouane has yielded heaps of crushed shells.' },
        { k: 'Hair', v: 'Masks and terracottas show bearded men, and women veiled or with long hair falling to the shoulders.' },
        { k: 'Jewellery', v: 'Heavy necklaces, earrings, nose rings (nezem), signet rings: gold and hardstones were worn in abundance.' },
        { k: 'Perfume', v: 'Coloured glass flasks, incense burners and bronze mirrors accompanied the dead: care of the body went all the way to the grave.' },
        { k: 'Amulets', v: 'Small glass masks, figures of Bes or the wedjat eye, gold or silver cases worn around the neck: protection against the evil eye.' }
      ],
      soft: {
        kicker: 'A cliché to question',
        title: 'Punic “softness”?',
        paras: [
          'To Greeks and Romans, Phoenicians were refined merchants, perfumed and covered in jewellery, hence unmanly. Plautus plays it for laughs: long robe, no belt, servants with rings in their ears.',
          'Such signs were ordinary in the Near East and say nothing about a lack of rigour. Livy himself describes Hannibal as frugal, sleeping on the ground in his soldier’s cloak, dressed like his peers.'
        ],
        src: 'Plautus, Poenulus, l. 975 ff. · Livy, XXI, 4'
      }
    },
    names: {
      kicker: 'Punic names',
      title: 'Names that are prayers',
      intro: 'Most Carthaginian names are short sentences invoking a god. Written without vowels, right to left, they often reach us distorted by Greek and Latin.',
      trLabel: 'Transliteration:',
      lvl: { sure: 'Meaning certain', prob: 'Meaning probable', deb: 'Meaning debated' },
      items: {
        hannibal: { name: 'Hannibal', m: '“Grace of Baal”, “Baal has been gracious”', d: 'A very common name in inscriptions, long before the son of Hamilcar Barca.' },
        hasdrubal: { name: 'Hasdrubal', m: '“Baal is my help”', d: 'Borne by Hamilcar’s son-in-law and by one of his sons, and by Carthage’s last leader in 146.' },
        hamilcar: { name: 'Hamilcar', m: '“Brother of Melqart”', d: 'The most common reading (ʾḥ-mlqrt): the name ties its bearer to the god of Tyre.' },
        bomilcar: { name: 'Bomilcar', m: '“In the hand of Melqart”', d: 'That is, under his protection. Borne by a general who tried to seize power in 308 BC (Diodorus, XX, 44).' },
        himilcon: { name: 'Himilco', m: '“Brother of the Queen” (?)', d: 'Milkat, “the Queen”, may be a divine title; the reading is debated. Name of the Atlantic navigator (Pliny, II, 169).' },
        magon: { name: 'Mago', m: '“Gift” (of the gods)', d: 'Probably from the root mgn, “to give”. Name of the agronomist and of Hannibal’s youngest brother.' },
        hannon: { name: 'Hanno', m: '“Grace, favour”', d: 'A shortened form of a ḥn- name, with the god left implicit. Name of the navigator of the Periplus and of Hanno the Great.' },
        adherbal: { name: 'Adherbal', m: '“Baal is mighty”', d: 'Borne by the admiral who defeated the Roman fleet at Drepana in 249 BC (Polybius, I, 49-51).' },
        abdmelqart: { name: 'Abdmelqart', m: '“Servant of Melqart”', d: 'Names in ʿbd-, “servant of”, followed by a divine name, are among the most frequent on the stelae.' },
        amotmelqart: { name: 'Amotmelqart', m: '“Handmaid of Melqart”', d: 'The female counterpart, attested on the votive stelae of Carthage, where women make offerings in their own name.' },
        sophonisbe: { name: 'Sophonisba', m: '“Baal has protected”', d: 'Greek and Latin form of a Punic name reconstructed as Ṣapanbaʿal: a probable reading, not a certain one.' },
        elissa: { name: 'Elissa', m: 'Meaning unknown', d: 'Greek transcription of a Phoenician name reconstructed as ʾlšt; its meaning, like that of Dido, is still debated.' }
      },
      parts: {
        kicker: 'Reading a Punic name',
        title: 'The building blocks',
        p: 'A Punic name combines a divine name with a word or a verb. In inscriptions, each person is followed by their lineage, sometimes over several generations (“X son of Y son of Z”); the same names often pass from grandfather to grandson, hence so many Hannibals and Hasdrubals.',
        link: 'The Phoenician alphabet',
        meanings: ['“lord”, Baal', '“king of the city”, Melqart', '“grace”', '“help”', '“servant”', '“handmaid”', '“from the hand of”', '“brother”']
      }
    },
    time: {
      kicker: 'Time',
      title: 'Months, festivals and household gods',
      intro: 'The Punic calendar is known only in scraps: a few month names, a few festivals, mostly through inscriptions and Greek writers.',
      months: {
        kicker: 'The calendar',
        title: 'Lunar months',
        p: 'The word yrḥ means both moon and month. In Carthage, years were dated by the names of the two suffetes in office. Here are months attested in Phoenician and Punic inscriptions; their order in the year is a reconstruction.',
        notes: [
          '“Sacrifice of the sun”. Named on the gold tablets of Pyrgi (c. 500 BC).',
          'Meaning debated, perhaps linked to healing (root rpʾ).',
          'Meaning unknown.',
          'Meaning unknown.',
          'Meaning unknown.',
          'Meaning unknown.',
          'Also known from the Bible (Ethanim, 1 Kings 8:2).',
          'Bul, named on the sarcophagus of Eshmunazar at Sidon and in the Bible (1 Kings 6:38).'
        ]
      },
      feast: {
        kicker: 'Festivals',
        title: 'The awakening of Melqart',
        paras: [
          'In Tyre, King Hiram is said to have instituted the “awakening” (Greek egersis) of Heracles-Melqart (Menander of Ephesus, quoted by Josephus, Jewish Antiquities, VIII, 146). Punic inscriptions mention a priestly title, “raiser of the god” (mqm ʾlm), linked to this rite; how it unfolded is unknown.',
          'Every year Carthage sent an embassy to Tyre with offerings for Melqart: Carthaginian envoys were there during Alexander’s siege in 332 (Arrian, Anabasis, II, 24).'
        ],
        tags: ['Egersis', 'Offerings to Tyre', 'Demeter and Kore (396)']
      },
      home: {
        kicker: 'Household religion',
        title: 'Gods at home',
        rows: [
          { k: 'At the threshold', v: 'At Kerkouane, some entrance floors bear the sign of Tanit: protection placed where one enters.' },
          { k: 'Against evil', v: 'Hanging grimacing masks, amulets of Bes or Horus: demons were kept away from the house as from the body.' },
          { k: 'Light and incense', v: 'Oil lamps and incense burners, sometimes shaped like a divine head, served in daily life as in worship.' },
          { k: 'New gods', v: 'In 396 BC Carthage adopted the Greek cult of Demeter and Kore (Diodorus, XIV, 77): piety travelled too.' }
        ]
      }
    },
    kids: {
      kicker: 'Music, games, childhood',
      title: 'Tambourines and feeding bottles',
      intro: 'Children’s graves and terracotta figurines give a glimpse, a very partial one, of leisure and education.',
      alt: 'Punic terracotta statuette: veiled woman holding a tambourine against her chest',
      caption: 'Woman with tambourine, terracotta, Bardo National Museum',
      rows: [
        { k: 'Music', v: 'Figurines show women holding a tambourine (frame drum) against the chest; the Phoenician world also knew double-pipe players. These images are often linked to worship.' },
        { k: 'Infants', v: 'Children’s graves yield ceramic feeding bottles and protective amulets; bells and rattles have also been reported.' },
        { k: 'Games', v: 'Knucklebones, a game common to the whole ancient Mediterranean, also appear in Punic contexts; Carthage’s own rules escape us.' },
        { k: 'Learning', v: 'Scribes, priests and merchants could write. Mago’s treatise on agriculture was written in Punic; Rome had it translated into Latin after 146 (Pliny, XVIII, 22).' },
        { k: 'Greek', v: 'The elite learned it: Hannibal was taught by Sosylus of Sparta (Cornelius Nepos, Hannibal, 13). Yet Justin (XX, 5) reports a temporary ban on studying it in the 4th c., after an act of treason.' }
      ]
    },
    memo: {
      kicker: 'Death and memory',
      title: 'After life',
      p: 'Necropolises outside the walls, shaft tombs, grave goods, tophet stelae: funerary rites are covered with religion, and tomb architecture with Punic art.',
      l1: 'Funerary rites',
      l2: 'The necropolises'
    },
    sources: [
      { type: 'modern', author: 'Gilbert Charles-Picard, Colette Picard', work: "La Vie quotidienne à Carthage au temps d'Hannibal", ref: 'Paris, Hachette, 1958', note: 'the standard survey of the subject' },
      { type: "ancient", author: "Cato the Elder", work: "On Agriculture (De agri cultura)", ref: "85", note: "puls punica" },
      { type: "ancient", author: "Plautus", work: "Poenulus (The Little Carthaginian)", ref: "l. 975 ff." },
      { type: "ancient", author: "Plato", work: "Laws", ref: "II, 674a" },
      { type: "ancient", author: "Livy", work: "History of Rome", ref: "XXI, 4" },
      { type: "ancient", author: "Polybius", work: "Histories", ref: "I, 49–51" },
      { type: "ancient", author: "Diodorus Siculus", work: "Library of History", ref: "XIV, 77; XX, 44" },
      { type: "ancient", author: "Justin", work: "Epitome of Pompeius Trogus' Philippic Histories", ref: "XIX, 1; XX, 5" },
      { type: "ancient", author: "Cornelius Nepos", work: "Hannibal", ref: "13" },
      { type: "ancient", author: "Pliny the Elder", work: "Natural History", ref: "II, 169; XIII; XV, 74–76; XVIII, 22" },
      { type: "ancient", author: "Columella", work: "On Agriculture (De re rustica)", ref: "XII, 39" },
      { type: "ancient", author: "Silius Italicus", work: "Punica", ref: "III" },
      { type: "ancient", author: "Flavius Josephus", work: "Jewish Antiquities", ref: "VIII, 146", note: "quoting Menander of Ephesus" },
      { type: "ancient", author: "Arrian", work: "Anabasis", ref: "II, 24" },
      { type: "ancient", author: "Appian", work: "Libyca (The African Book)", note: "six-storey buildings" }
    ],
    relatedTitle: 'Read also',
    related: [
      { to: '/art-et-artisanat', kick: 'Crafts', title: 'Punic art and crafts', text: 'Jewellery, masks, glass, pottery, and the houses of Kerkouane.', cls: 'tile--terra' },
      { to: '/langue-ecriture', kick: 'Writing', title: 'Punic language and script', text: 'The 22-letter alphabet, the inscriptions, and your name in Phoenician.', cls: '' },
      { to: '/agriculture', kick: 'The land', title: 'Carthaginian agriculture', text: 'Mago, olive trees, vines and Cato’s fig.', cls: 'tile--olive' }
    ]
  },

  ar: {
    meta: {
      title: 'الحياة اليومية في قرطاج — البيت والمائدة واللباس والأسماء والأعياد',
      desc: 'العيش في قرطاج: بيوت كركوان، و«العصيدة البونيقية» عند كاتو، ونبيذ الباسوم، واللباس والحليّ، والأسماء البونيقية ومعانيها (حنبعل، صدربعل، حملقار…)، والتقويم والأعياد والموسيقى والطفولة.'
    },
    hero: {
      chip: 'قرطاج · الحياة اليومية',
      title: 'الحياة اليومية في قرطاج',
      lede: 'ماذا كانوا يأكلون، وكيف كانوا يلبسون، وبماذا كانوا يسمّون أبناءهم؟ لا تصلنا الأجوبة إلا شذرات: بيوت لم يبق منها إلا أساساتها، وأثاث المقابر، وآلاف النقائش القصيرة، ونظرة الإغريق والرومان الساخرة في الغالب.',
      tags: ['القرن 6 – 2 ق.م.', 'كركوان · بيرصا', 'الآثار والنصوص'],
      alt: 'شوارع وبيوت بونيقية في كركوان على شاطئ البحر',
      caption: 'كركوان، الوطن القبلي: مدينة بونيقية توقّف بها الزمن في القرن 3 ق.م.'
    },
    tocLabel: 'فهرس الصفحة',
    toc: [
      { id: 'maison', label: 'البيت' },
      { id: 'table', label: 'المائدة' },
      { id: 'parure', label: 'اللباس' },
      { id: 'noms', label: 'الأسماء' },
      { id: 'temps', label: 'الزمن' },
      { id: 'enfance', label: 'الموسيقى والطفولة' },
      { id: 'memoire', label: 'الذاكرة' }
    ],
    how: {
      kicker: 'قبل أن نبدأ',
      title: 'كيف نعرف ذلك؟',
      items: [
        { k: 'الحفريات', v: 'كركوان، التي هُجرت نحو منتصف القرن 3 ق.م. ولم يُعَد بناؤها، والأحياء البونيقية في بيرصا تكشف البيوت؛ أما المقابر فتقدّم الأواني والحليّ واللعب.' },
        { k: 'النقائش', v: 'آلاف الأنصاب النذرية، ومعظمها من التوفيت، تذكر أسماء ومهنًا وأنسابًا، وأحيانًا تاريخًا. لكنها قصيرة ودينية في معظمها.' },
        { k: 'الكتّاب الأجانب', v: 'كاتو وبلاوتوس وأفلاطون وتيتوس ليفيوس ويوستينوس يتحدثون عن قرطاج من الخارج، وغالبًا بوصفهم أعداء. ننقل عنهم مع الحذر النقدي.' }
      ]
    },
    house: {
      kicker: 'البيت',
      title: 'حول الفناء',
      intro: 'لم يبق من البيوت البونيقية إلا مستوى الأرض، لكنها تحكي الحياة العائلية: الماء والنظافة والخصوصية.',
      alt: 'مغطس بونيقي على شكل حذاء مطليّ بملاط وردي مع مقعده، في كركوان',
      caption: 'مغطس على شكل حذاء بمقعد، كركوان',
      rows: [
        { k: 'التخطيط', v: 'شوارع مستقيمة ومربعات منتظمة: في كركوان كما في الحيّين المعروفين بحيّ ماغون وحيّ حنبعل في قرطاج، ينتظم كل بيت حول فناء مكشوف.' },
        { k: 'المدخل', v: 'ممرّ ضيق يصل الشارع بالفناء، فلا تُرى حياة البيت من الخارج. وربما كانت غرفة مطلّة على الشارع دكّانًا.' },
        { k: 'الماء', v: 'لكل أسرة صهريجها الذي تملؤه مياه الأمطار، وبئر تصريف للمياه المستعملة. الماء شأن خاص.' },
        { k: 'الاستحمام', v: 'في كركوان، يضمّ كثير من البيوت حجرة ماء صغيرة فيها مغطس مطليّ على شكل حذاء، مزوّد بمقعد: رفاهية نادرة في العالم القديم آنذاك.' },
        { k: 'الأرضيات', v: 'الأرضية البونيقية (pavimentum punicum)، ملاط أحمر مرصّع بشظايا الحجارة، تحمل أحيانًا علامة تانيت قرب المدخل.' },
        { k: 'الطوابق', v: 'في قرطاج تدلّ السلالم على وجود طابق أو أكثر؛ ويتحدث أبيانوس عن مبانٍ من ستة طوابق، دون تأكيد أثري.' }
      ],
      link: 'العمارة بالتفصيل'
    },
    table: {
      kicker: 'المائدة',
      title: 'قمح وجبن وعسل وسمك',
      intro: 'لم يصلنا أي كتاب طبخ بونيقي. تُستعاد الوجبات من بقايا الحفريات والأواني وبعض النصوص اللاتينية.'
    },
    recipe: {
      kicker: 'وصفة كاتو «البونيقية»',
      title: 'العصيدة البونيقية (Puls punica)',
      modeLabel: 'نسخة الوصفة',
      modes: { cato: 'بحسب كاتو', modern: 'اقتباس حديث' },
      ingLabel: 'المقادير',
      ing: {
        cato: [
          { q: 'رطل واحد', n: 'من الأليكا (جريش قمح النشا)' },
          { q: '3 أرطال', n: 'من الجبن الطري' },
          { q: 'نصف رطل', n: 'من العسل' },
          { q: '1', n: 'بيضة' }
        ],
        modern: [
          { q: '325 غ', n: 'من جريش الحنطة أو قمح النشا' },
          { q: '1 كغ', n: 'من الجبن الطري المصفّى (من نوع الريكوتا)' },
          { q: '160 غ', n: 'من العسل' },
          { q: '1', n: 'بيضة مخفوقة' }
        ]
      },
      steps: {
        cato: [
          'ضع الأليكا في الماء واتركها حتى تتشرّب جيدًا.',
          'اسكبها في وعاء نظيف.',
          'أضف الجبن الطري والعسل والبيضة، واخلط الجميع جيدًا.',
          'انقلها إلى قدر جديدة، واطبخها.'
        ],
        modern: [
          'انقع الجريش في ماء بارد ساعة إلى ساعتين، ثم صفّه.',
          'ضعه في وعاء نظيف.',
          'أضف الجبن والعسل والبيضة، واخلط حتى يتجانس المزيج.',
          'اطبخه على نار هادئة مع التحريك 15 إلى 20 دقيقة حتى يصير كالعصيدة الكثيفة. يقدَّم دافئًا.'
        ]
      },
      notes: {
        cato: 'لا يذكر كاتو مدة ولا حرارة: الرطل الروماني يزن نحو 327 غرامًا.',
        modern: 'نسب كاتو محوّلة إلى الغرامات. أما مدد النقع والطبخ والبدائل فاقتراحات حديثة، لا معطيات قديمة.'
      }
    },
    cato: {
      kicker: 'النص اللاتيني',
      latin: '« Pultem punicam sic coquito. Libram alicae in aquam indito, facito uti bene madeat… »',
      tr: '«اطبخ العصيدة البونيقية هكذا: ضع رطلًا من الأليكا في الماء، واحرص على أن تتشرّب جيدًا…»',
      src: 'كاتو الأكبر، في الزراعة، 85 (منتصف القرن 2 ق.م.)',
      warn: 'تنبيه: إنها وصفة رومانية «على الطريقة البونيقية». تخبرنا بما ربطه الرومان بقرطاج، لا بالضرورة بما كان القرطاجيون يأكلونه كل يوم. بل كانت عصيدة الحبوب أيضًا الطعام الأساسي للرومان أنفسهم.'
    },
    food: [
      { k: 'الحبوب', t: 'الخبز والعصائد', d: 'القمح والشعير أساس الوجبات، خبزًا ورقائق وعصائد. وقد عُثر في مقبرة بقرطاج على مجسّم فخاري لفرن من نوع الطابونة التي ما تزال مستعملة في تونس.', tone: 'tile--sand' },
      { k: 'البحر', t: 'السمك والغاروم', d: 'التن والسمك المجفّف أو المملّح والأصداف؛ والغاروم، صلصة السمك المخمّر التي نشر العالم البونيقي استعمالها في أرجاء المتوسط.', tone: 'tile--navy', to: '/economie', link: 'الاقتصاد' },
      { k: 'البساتين', t: 'التين والرمّان والتمر', d: 'التين والعنب والزيتون واللوز؛ والرمّان الذي سمّاه الرومان «التفاحة البونيقية» (malum punicum، بلينيوس الأكبر، الكتاب 13)؛ وتمر النخيل، الشجرة التي تزيّن نقود قرطاج.', tone: '' },
      { k: 'النبيذ', t: 'الباسوم', d: 'قدّم ماغون وصفة هذا النبيذ المصنوع من عنب مجفّف في الشمس ثم منقوع في العصير؛ ونقلها المهندس الزراعي الروماني كولوميلا (في الزراعة، 12، 39).', tone: 'tile--purple', to: '/agriculture', link: 'الزراعة' }
    ],
    sober: [
      { k: 'أفلاطون، القوانين، 2، 674أ', t: 'قانون ضد الخمر', d: 'بحسب أفلاطون، كان قانون قرطاجي يحرّم الخمر على الجنود في الحملات، وعلى الحكّام طوال سنة ولايتهم، وعلى ربابنة السفن والقضاة أثناء عملهم.' },
      { k: 'كاتو في مجلس الشيوخ', t: 'تينة قرطاج', d: 'ليُثبت أن العدو لا يبعد إلا ثلاثة أيام بحرًا، يُروى أن كاتو رفع أمام مجلس الشيوخ تينة طازجة قُطفت في قرطاج (بلينيوس الأكبر، 15، 74-76).', to: '/agriculture', link: 'اقرأ الحكاية' },
      { k: 'بحذر', t: 'الكلب على المائدة؟', d: 'ينسب يوستينوس (19، 1) إلى الملك الفارسي دارا أمرًا بمنع القرطاجيين من أكل لحم الكلاب. الرواية منفردة ومتأخرة، ولا سبيل إلى التحقق منها.' }
    ],
    dress: {
      kicker: 'اللباس والزينة',
      title: 'الكتّان والأرجوان والحليّ',
      intro: 'لم يصلنا أي ثوب بونيقي. نعرف اللباس من الأنصاب والتماثيل الفخارية والتوابيت، ومن سخرية الأجانب.',
      steleAlt: 'نصب منقوش عليه كاهن بثوب طويل وقلنسوة عالية يحمل طفلًا',
      steleCap: 'نصب «الكاهن والطفل»، توفيت قرطاج، القرن 4 ق.م. (متحف باردو)',
      pendAlt: 'أربع قلائد من عجينة الزجاج الملوّن تمثّل رؤوسًا ملتحية بعيون كبيرة',
      pendCap: 'قلائد على شكل أقنعة من عجينة الزجاج، قرطاج، القرن 4 – 3 ق.م.',
      rows: [
        { k: 'القميص', v: 'يلبس الرجال والنساء قميصًا طويلًا، غالبًا بلا حزام: هكذا يُلبس بلاوتوس القرطاجيَّ حنون في ملهاته «البونيقيّ الصغير» (مطلع القرن 2 ق.م.).' },
        { k: 'الكهنة', v: 'ثوب من الكتّان وقلنسوة عالية ورأس محلوق: هذه صورة النصب المقابل. ويصف سيليوس إيتاليكوس كهنة ملقرت في قادس حفاةً في ثياب الكتّان (البونيقيات، 3).' },
        { k: 'العباءة والأرجوان', v: 'تُكمل عباءةٌ مسدلة الهيئة. وكان الأرجوان المستخرج من الموريكس يُصنع محليًا: وُجدت في كركوان أكوام من الأصداف المسحوقة.' },
        { k: 'تسريحات الشعر', v: 'تُظهر الأقنعة والتماثيل الفخارية رجالًا ملتحين، ونساءً محجّبات أو بشعر طويل منسدل على الكتفين.' },
        { k: 'الحليّ', v: 'قلائد ثقيلة وأقراط وخزائم الأنف (نزم) وخواتم أختام: كان الذهب والأحجار الكريمة يُلبسان بوفرة.' },
        { k: 'العطور', v: 'قوارير من الزجاج الملوّن ومباخر ومرايا برونزية ترافق الموتى: العناية بالجسد تمتد إلى القبر.' },
        { k: 'التمائم', v: 'أقنعة زجاجية صغيرة، وتماثيل بس أو عين الأوجات، وعلب من ذهب أو فضة تُعلّق في العنق: وقايةً من العين.' }
      ],
      soft: {
        kicker: 'صورة نمطية تحتاج إلى مراجعة',
        title: '«ليونة» بونيقية؟',
        paras: [
          'في نظر الإغريق والرومان، الفينيقيون تجّار مترفون متعطّرون مثقلون بالحليّ، أي قليلو الرجولة. ويستغل بلاوتوس ذلك للإضحاك: ثوب طويل بلا حزام، وخدم بأقراط في آذانهم.',
          'كانت هذه العلامات مألوفة في الشرق الأدنى، ولا تدل على قلة صرامة. بل يصف تيتوس ليفيوس نفسه حنبعل زاهدًا، ينام على الأرض ملتفًا بعباءة الجندي، ولباسه كلباس أقرانه.'
        ],
        src: 'بلاوتوس، البونيقيّ الصغير، البيت 975 وما يليه · تيتوس ليفيوس، 21، 4'
      }
    },
    names: {
      kicker: 'الأسماء البونيقية',
      title: 'أسماء هي أدعية',
      intro: 'معظم الأسماء القرطاجية جمل قصيرة تذكر إلهًا. تُكتب بلا حركات من اليمين إلى اليسار، وكثيرًا ما تصلنا محرّفة عبر اليونانية واللاتينية.',
      trLabel: 'النقل الحرفي:',
      lvl: { sure: 'معنى ثابت', prob: 'معنى مرجّح', deb: 'معنى مختلف فيه' },
      items: {
        hannibal: { name: 'حنبعل', m: '«نعمة بعل»، «بعل أنعم»', d: 'اسم شائع جدًا في النقائش، قبل ابن حملقار برقا بزمن طويل.' },
        hasdrubal: { name: 'صدربعل', m: '«بعل عوني»', d: 'حمله صهر حملقار وأحد أبنائه، وآخر قادة قرطاج سنة 146.' },
        hamilcar: { name: 'حملقار', m: '«أخو ملقرت»', d: 'القراءة الأكثر شيوعًا (ʾḥ-mlqrt): الاسم يربط حامله بإله صور.' },
        bomilcar: { name: 'بوملكار', m: '«في يد ملقرت»', d: 'أي في حمايته. حمله قائد حاول الاستيلاء على السلطة سنة 308 ق.م. (ديودوروس، 20، 44).' },
        himilcon: { name: 'حملكون', m: '«أخو الملكة» (؟)', d: 'قد تكون «ملكت»، أي الملكة، لقبًا إلهيًا؛ والقراءة مختلف فيها. اسم ملّاح الأطلسي (بلينيوس، 2، 169).' },
        magon: { name: 'ماغون', m: '«عطية» (الآلهة)', d: 'على الأرجح من الجذر mgn، «أعطى». اسم المهندس الزراعي وأصغر إخوة حنبعل.' },
        hannon: { name: 'حنون', m: '«نعمة، فضل»', d: 'صيغة مختصرة لاسم يبدأ بـ ḥn-، أُضمر فيه اسم الإله. اسم ملّاح «الرحلة» وحنون الكبير.' },
        adherbal: { name: 'أدربعل', m: '«بعل قوي»', d: 'حمله الأمير البحري الذي هزم الأسطول الروماني في دريبانا سنة 249 ق.م. (بوليبيوس، 1، 49-51).' },
        abdmelqart: { name: 'عبد ملقرت', m: '«خادم ملقرت»', d: 'الأسماء التي تبدأ بـ ʿbd، «عبد»، يليها اسم إله، من أكثر الأسماء ورودًا على الأنصاب.' },
        amotmelqart: { name: 'أمة ملقرت', m: '«أمة ملقرت»', d: 'المقابل المؤنث، وارد على أنصاب قرطاج النذرية، حيث تقدّم نساء القرابين بأسمائهن.' },
        sophonisbe: { name: 'صوفونيسبا', m: '«بعل حمى»', d: 'الصيغة اليونانية واللاتينية لاسم بونيقي يُعاد تركيبه «صفنبعل»: قراءة مرجّحة لا مؤكّدة.' },
        elissa: { name: 'عليسة', m: 'معنى مجهول', d: 'نقل يوناني لاسم فينيقي يُعاد تركيبه ʾlšt؛ ومعناه، كمعنى «ديدون»، ما يزال موضع نقاش.' }
      },
      parts: {
        kicker: 'كيف نقرأ اسمًا بونيقيًا',
        title: 'لبنات الأسماء',
        p: 'يجمع الاسم البونيقي بين اسم إله وكلمة أو فعل. وفي النقائش يُتبع كل شخص بنسبه، أحيانًا عبر عدة أجيال («فلان بن فلان بن فلان»)؛ وتنتقل الأسماء نفسها كثيرًا من الجد إلى الحفيد، ومن هنا كثرة من حملوا اسم حنبعل وصدربعل.',
        link: 'الأبجدية الفينيقية',
        meanings: ['«سيّد»، بعل', '«ملك المدينة»، ملقرت', '«نعمة»', '«عون»', '«عبد»', '«أمة»', '«من يد»', '«أخ»']
      }
    },
    time: {
      kicker: 'الزمن',
      title: 'الشهور والأعياد وآلهة البيت',
      intro: 'لا نعرف التقويم البونيقي إلا شذرات: بعض أسماء الشهور وبعض الأعياد، في الغالب عبر النقائش والكتّاب الإغريق.',
      months: {
        kicker: 'التقويم',
        title: 'شهور قمرية',
        p: 'كلمة yrḥ تعني القمر والشهر معًا. وفي قرطاج كانت السنوات تؤرَّخ باسمي الشفطين المتولّيين. هذه شهور وردت في النقائش الفينيقية والبونيقية؛ أما ترتيبها في السنة فإعادة بناء.',
        notes: [
          '«ذبيحة الشمس». ورد في صفائح بيرجي الذهبية (نحو 500 ق.م.).',
          'معناه مختلف فيه، وربما ارتبط بالشفاء (الجذر rpʾ).',
          'معناه مجهول.',
          'معناه مجهول.',
          'معناه مجهول.',
          'معناه مجهول.',
          'معروف أيضًا من التوراة (إيثانيم، الملوك الأول 8: 2).',
          'بول، ورد على تابوت أشمونعزر في صيدا وفي التوراة (الملوك الأول 6: 38).'
        ]
      },
      feast: {
        kicker: 'الأعياد',
        title: 'إيقاظ ملقرت',
        paras: [
          'في صور، يُروى أن الملك حيرام أسّس «إيقاظ» (باليونانية egersis) هرقل-ملقرت (ميناندروس الأفسسي، نقلًا عن يوسيفوس، العاديات اليهودية، 8، 146). وتذكر نقائش بونيقية لقبًا كهنوتيًا هو «مُقيم الإله» (mqm ʾlm) يُربط بهذا الطقس؛ أما تفاصيله فمجهولة.',
          'كانت قرطاج ترسل كل سنة وفدًا إلى صور بقرابين لملقرت: وكان مبعوثون قرطاجيون هناك أثناء حصار الإسكندر سنة 332 (أريانوس، أناباسيس، 2، 24).'
        ],
        tags: ['الإيقاظ', 'قرابين صور', 'ديميتر وكوري (396)']
      },
      home: {
        kicker: 'التديّن المنزلي',
        title: 'الآلهة في البيت',
        rows: [
          { k: 'عند العتبة', v: 'في كركوان تحمل بعض أرضيات المداخل علامة تانيت: حماية توضع حيث يدخل الناس.' },
          { k: 'ضد الشر', v: 'أقنعة عابسة معلّقة، وتمائم بس أو حورس: كانت الشياطين تُبعد عن البيت كما عن الجسد.' },
          { k: 'النور والبخور', v: 'المصابيح الزيتية والمباخر، وبعضها على شكل رأس إلهي، تُستعمل في الحياة اليومية كما في العبادة.' },
          { k: 'آلهة جديدة', v: 'في سنة 396 ق.م. تبنّت قرطاج عبادة ديميتر وكوري الإغريقية (ديودوروس، 14، 77): التديّن أيضًا كان يسافر.' }
        ]
      }
    },
    kids: {
      kicker: 'الموسيقى واللعب والطفولة',
      title: 'دفوف ورضّاعات',
      intro: 'تقدّم قبور الأطفال والتماثيل الفخارية لمحة، جزئية جدًا، عن الترفيه والتعليم.',
      alt: 'تمثال بونيقي صغير من الفخار: امرأة محجّبة تمسك دفًا على صدرها',
      caption: 'امرأة بدفّ، فخار، المتحف الوطني بباردو',
      rows: [
        { k: 'الموسيقى', v: 'تُظهر تماثيل صغيرة نساءً يمسكن دفًا (طبلًا بإطار) على الصدر؛ وعرف العالم الفينيقي أيضًا عازفي المزمار المزدوج. وغالبًا ما ترتبط هذه الصور بالعبادة.' },
        { k: 'الرضّع', v: 'تقدّم قبور الأطفال رضّاعات فخارية وتمائم واقية؛ كما أُشير إلى أجراس صغيرة وخشخيشات.' },
        { k: 'الألعاب', v: 'الكعاب (العظيمات)، لعبة مشتركة في المتوسط القديم كله، تظهر أيضًا في سياقات بونيقية؛ أما قواعدها في قرطاج فتفوتنا.' },
        { k: 'التعلّم', v: 'كان الكتبة والكهنة والتجار يكتبون. وكُتب كتاب ماغون في الزراعة بالبونيقية، وأمرت روما بترجمته إلى اللاتينية بعد 146 (بلينيوس، 18، 22).' },
        { k: 'اليونانية', v: 'كانت النخبة تتعلّمها: كان سوسيلوس الإسبرطي معلّم حنبعل (كورنيليوس نيبوس، حنبعل، 13). غير أن يوستينوس (20، 5) يروي حظرًا مؤقتًا لتعلّمها في القرن 4، إثر خيانة.' }
      ]
    },
    memo: {
      kicker: 'الموت والذاكرة',
      title: 'ما بعد الحياة',
      p: 'مقابر خارج الأسوار، وقبور ببئر، وأثاث جنائزي، وأنصاب التوفيت: الطقوس الجنائزية تُعالج مع الديانة، وعمارة القبور مع الفن البونيقي.',
      l1: 'الطقوس الجنائزية',
      l2: 'المقابر'
    },
    sources: [
      { type: 'modern', author: 'Gilbert Charles-Picard, Colette Picard', work: "La Vie quotidienne à Carthage au temps d'Hannibal", ref: 'Paris, Hachette, 1958', note: 'المرجع الأساسي في الموضوع' },
      { type: "ancient", author: "كاتو", work: "في الزراعة", ref: "85", note: "Puls punica" },
      { type: "ancient", author: "بلاوتوس", work: "البونيقيّ الصغير", ref: "البيت 975 وما يليه" },
      { type: "ancient", author: "أفلاطون", work: "القوانين", ref: "2، 674أ" },
      { type: "ancient", author: "تيتوس ليفيوس", work: "تاريخ روما", ref: "21، 4" },
      { type: "ancient", author: "بوليبيوس", work: "التواريخ", ref: "1، 49–51" },
      { type: "ancient", author: "ديودوروس الصقلي", work: "المكتبة التاريخية", ref: "14، 77؛ 20، 44" },
      { type: "ancient", author: "يوستينوس", work: "مختصر التواريخ الفيليبية لتروغوس بومبيوس", ref: "19، 1؛ 20، 5" },
      { type: "ancient", author: "كورنيليوس نيبوس", work: "حنبعل", ref: "13" },
      { type: "ancient", author: "بلينيوس الأكبر", work: "التاريخ الطبيعي", ref: "2، 169؛ 13؛ 15، 74–76؛ 18، 22" },
      { type: "ancient", author: "كولوميلا", work: "في الزراعة", ref: "12، 39" },
      { type: "ancient", author: "سيليوس إيتاليكوس", work: "البونيقيات", ref: "3" },
      { type: "ancient", author: "يوسيفوس", work: "العاديات اليهودية", ref: "8، 146", note: "نقلًا عن ميناندروس الأفسسي" },
      { type: "ancient", author: "أريانوس", work: "أناباسيس", ref: "2، 24" },
      { type: "ancient", author: "أبيانوس", work: "ليبيكا (الكتاب الإفريقي)", note: "مبانٍ من ستة طوابق" }
    ],
    relatedTitle: 'اقرأ أيضًا',
    related: [
      { to: '/art-et-artisanat', kick: 'الحِرف', title: 'الفن والحِرف البونيقية', text: 'الحليّ والأقنعة والزجاج والفخار، وبيوت كركوان.', cls: 'tile--terra' },
      { to: '/langue-ecriture', kick: 'الكتابة', title: 'اللغة والكتابة البونيقية', text: 'الأبجدية ذات الاثنين والعشرين حرفًا، والنقائش، واسمك بالفينيقية.', cls: '' },
      { to: '/agriculture', kick: 'الأرض', title: 'الزراعة في قرطاج', text: 'ماغون والزيتون والكرمة وتينة كاتو.', cls: 'tile--olive' }
    ]
  }
}

const c = computed(() => C[locale.value] || C.fr)

const nameCards = computed(() =>
  NAMES.map((n) => ({ ...n, ...c.value.names.items[n.id] }))
)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-title { font-size: clamp(44px, 5.6vw, 84px); }
.hero-fig { min-height: clamp(320px, 42vw, 580px); }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Sommaire */
.toc {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: var(--gap) var(--gutter) 0;
}
.toc-link {
  display: inline-flex;
  align-items: center;
  color: var(--ink);
}
.toc-link:hover { background: var(--ink); color: var(--white); }

/* Comment le sait-on */
.how { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 24px 40px; align-items: start; }
.how-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.how-title { font-size: clamp(28px, 3vw, 42px); }

.para + .para { margin-top: 12px; }
.src { margin-top: 14px; font: 500 13px/1.4 var(--font-body); opacity: 0.85; }
.self-start { align-self: flex-start; }
.more { font: 600 14px/1.3 var(--font-body); display: inline-flex; align-items: center; min-height: 44px; }
.tile--navy .more, .tile--purple .more { color: var(--white); }

/* Maison */
.house-fig { min-height: 520px; }
.house-key { font-size: 18px; line-height: 1.15; color: var(--navy-tint); }
.tile--navy .val { color: var(--navy-soft); font-size: 15px; }

/* Recette */
.recipe { display: flex; flex-direction: column; gap: 18px; }
.recipe .kicker { margin-bottom: 0; }
.recipe-title { color: var(--gold-light); }
.recipe-seg { align-self: flex-start; background: rgba(255, 255, 255, 0.1); }
.recipe-seg button { color: var(--white); }
.recipe-seg button.on { background: var(--gold); color: var(--ink); }
.ing {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}
.ing li {
  background: rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ing-q { font: 900 clamp(20px, 1.9vw, 26px)/1 var(--font-display); color: var(--gold-light); }
.ing-n { font: 500 13px/1.35 var(--font-body); color: var(--on-dark-2); }
.steps { list-style: none; display: grid; gap: 10px; }
.steps li { display: grid; grid-template-columns: 36px minmax(0, 1fr); gap: 12px; align-items: start; }
.step-n {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--gold);
  color: var(--ink);
  display: grid;
  place-items: center;
  font: 800 16px/1 var(--font-display);
}
.steps p { font: 400 15px/1.5 var(--font-body); padding-top: 7px; }
.recipe-note { font: 500 13px/1.45 var(--font-body); color: var(--on-dark); border-top: 1px solid rgba(255, 255, 255, 0.18); padding-top: 14px; }

.latin { margin: 0; }
.latin p { font: 600 italic clamp(19px, 1.7vw, 24px)/1.35 var(--font-body); color: var(--ink); }
.cato-tr { margin-top: 14px; }
.cato-warn { border-top: 1px solid rgba(22, 19, 15, 0.25); padding-top: 14px; }

.food { min-height: 260px; }
.sec-tight { padding-top: var(--gap); }
.sober { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px 40px; }
.sober-item .kicker { margin-bottom: 8px; }

/* Parure */
.stele-fig { min-height: 560px; }
.stele-fig > img { object-fit: contain; padding-bottom: 72px; }
.dress-key { font-size: 18px; line-height: 1.15; color: var(--purple-tint); }
.dress-rows .val { color: var(--purple-soft); font-size: 15px; }
.pend-fig { min-height: clamp(260px, 30vw, 420px); }
.soft-title { font-size: clamp(28px, 3vw, 42px); margin-bottom: 16px; }

/* Noms */
.names {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  gap: var(--gap);
  padding: 0 var(--gutter);
}
.name {
  background: var(--white);
  border-radius: var(--r-lg);
  padding: 22px;
  display: flex;
  flex-direction: column;
}
.name-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 18px; }
.name-glyph { font-size: clamp(30px, 2.8vw, 40px); color: var(--purple); unicode-bidi: isolate; }
.name-lvl { font: 600 11px/1 var(--font-body); padding: 7px 10px; border-radius: 999px; white-space: nowrap; }
.lvl-sure { background: var(--olive-soft); color: var(--olive); }
.lvl-prob { background: var(--navy-soft); color: var(--navy); }
.lvl-deb { background: var(--terra-soft); color: var(--terra); }
.name-h { margin-bottom: 4px; }
.name-tr { font: 500 italic 14px/1.3 var(--font-body); color: var(--muted); margin-bottom: 10px; direction: ltr; text-align: start; unicode-bidi: plaintext; }
.name-m { font: 700 16px/1.35 var(--font-body); color: var(--ink); margin-bottom: 8px; }
.name-d { font: 400 14px/1.5 var(--font-body); color: var(--muted); }

.parts { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 24px 40px; align-items: start; }
.parts-title { margin-bottom: 16px; }
.parts-btn { margin-top: 20px; }
.parts-list { list-style: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.parts-list li {
  background: var(--paper);
  border-radius: 16px;
  padding: 12px 14px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: 14px;
  align-items: center;
}
.part-g { grid-row: span 2; font-size: 28px; color: var(--purple); unicode-bidi: isolate; }
.part-t { font: 700 italic 14px/1.2 var(--font-body); direction: ltr; unicode-bidi: plaintext; text-align: start; }
.part-m { font: 400 13px/1.35 var(--font-body); color: var(--stone); }

/* Temps */
.months-title, .feast-title { margin: 0 0 14px; }
.months-p { margin-bottom: 18px; }
.month-key { display: flex; flex-direction: column; gap: 6px; }
.month-g { font-size: 24px; color: var(--gold-light); unicode-bidi: isolate; }
.month-t { font: 600 italic 14px/1.2 var(--font-body); color: var(--on-dark-2); direction: ltr; unicode-bidi: plaintext; text-align: start; }
.month-v { color: var(--on-dark); font-size: 15px; }
.home-rel { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 24px 40px; align-items: start; }
.home-key { font-size: 18px; line-height: 1.15; color: var(--purple); }

/* Enfance */
.tamb-fig { min-height: 600px; }
.tamb-fig > img { object-position: 50% 20%; }
.kids-key { font-size: 18px; line-height: 1.15; color: var(--olive); }
.tile--sand .val { color: var(--ink); font-size: 15px; }

/* Mémoire */
.memo { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 24px 40px; align-items: start; }
.memo-btns { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }

.related-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.related { min-height: 200px; }

@media (max-width: 1100px) {
  .ing { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .how-grid { grid-template-columns: minmax(0, 1fr); }
}

@media (max-width: 960px) {
  .how, .sober, .parts, .home-rel, .memo { grid-template-columns: minmax(0, 1fr); }
  .house-fig { min-height: 340px; }
  .stele-fig { min-height: 480px; }
  .tamb-fig { min-height: 480px; }
}

@media (max-width: 640px) {
  .rows > div { grid-template-columns: minmax(0, 1fr); gap: 6px; }
  .parts-list { grid-template-columns: minmax(0, 1fr); }
  .food, .related { min-height: 0; }
  .stele-fig { min-height: 420px; }
  .tamb-fig { min-height: 420px; }
  .name-lvl { font-size: 10px; }
}
</style>
