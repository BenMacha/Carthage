<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <figure class="fig fig--hero s-4 hero-fig">
        <img src="/img/hamilcar.jpg" :alt="c.heroAlt" style="object-position: 50% 25%" />
        <figcaption>{{ c.heroCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--stack s-8">
        <div class="hero-top">
          <span class="chip">{{ c.chip }}</span>
          <span class="phoen hero-phoen" aria-hidden="true">𐤁𐤓𐤒</span>
        </div>
        <div>
          <h1 class="h-display">{{ c.title }}</h1>
          <p class="lede">{{ c.lede }}</p>
        </div>
      </div>
    </div>

    <!-- Arbre des Barcides -->
    <section class="sec">
      <div class="tile tile--xl">
        <h2 class="h-block tree-title">{{ c.treeTitle }}</h2>
        <div class="tree">
          <template v-for="(a, i) in c.ancestors" :key="`a${i}`">
            <div class="node node--anc is-uncertain">
              <div class="n-name">{{ a.name }}</div>
              <div class="n-meta">{{ a.meta }}</div>
            </div>
            <div class="stem stem--dashed" aria-hidden="true" />
          </template>
          <div class="root-couple">
            <component
              :is="c.root.to ? NuxtLinkComp : 'div'"
              v-bind="c.root.to ? { to: localePath(c.root.to) } : {}"
              class="node node--root"
            >
              <div class="n-name">{{ c.root.name }}</div>
              <div class="n-meta">{{ c.root.meta }}</div>
            </component>
            <div class="spouse spouse--root is-uncertain">
              <span class="ring" aria-hidden="true">∞</span>
              <span>
                <b>{{ c.rootSpouse.name }}</b>
                <span class="s-meta">{{ c.rootSpouse.meta }}</span>
              </span>
            </div>
          </div>
          <div class="stem" aria-hidden="true" />
          <div class="bar" aria-hidden="true" />
          <div class="kids">
            <div v-for="(k, i) in c.kids" :key="i" class="kid">
              <div class="drop" aria-hidden="true" />
              <div class="kid-body">
                <component
                  :is="k.to ? NuxtLinkComp : 'div'"
                  v-bind="k.to ? { to: localePath(k.to) } : {}"
                  class="node"
                  :class="{ 'node--main': k.main }"
                >
                  <div class="n-name">{{ k.name }}</div>
                  <div v-if="k.meta" class="n-meta" v-html="k.meta" />
                </component>
                <component
                  :is="k.spouse.to ? NuxtLinkComp : 'div'"
                  v-if="k.spouse"
                  v-bind="k.spouse.to ? { to: localePath(k.spouse.to) } : {}"
                  class="spouse"
                  :class="{ 'is-uncertain': k.spouse.uncertain }"
                >
                  <span class="ring" aria-hidden="true">∞</span>
                  <span>
                    <b>{{ k.spouse.name }}</b>
                    <span class="s-meta">{{ k.spouse.meta }}</span>
                  </span>
                </component>
                <p v-if="k.none" class="k-none">{{ k.none }}</p>
                <template v-if="k.issue">
                  <div class="drop drop--sm" :class="{ 'is-uncertain': k.issue.uncertain }" aria-hidden="true" />
                  <div class="node node--gen3" :class="{ 'is-uncertain': k.issue.uncertain }">
                    <div class="n-name">{{ k.issue.name }}</div>
                    <div class="n-meta">{{ k.issue.meta }}</div>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <p class="tree-note"><span class="dash" aria-hidden="true" />{{ c.treeNote }}</p>
        </div>
        <div class="unknown">
          <div class="unknown-head">
            <span class="kicker">{{ c.unknown.kicker }}</span>
            <h3 class="h-card">{{ c.unknown.title }}</h3>
            <p class="body">{{ c.unknown.intro }}</p>
          </div>
          <div class="rows unknown-rows" style="--row-key:190px">
            <div v-for="(u, i) in c.unknown.rows" :key="i">
              <span class="key">{{ u.k }}</span>
              <span class="val">{{ u.v }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Généraux & figures -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.gridTitle }}</h2>
        <div class="pill-row" role="tablist" :aria-label="c.filterLabel">
          <button
            v-for="f in c.filters"
            :key="f.key"
            class="pill-btn"
            :class="{ on: filter === f.key }"
            role="tab"
            :aria-selected="filter === f.key"
            @click="filter = f.key"
          >{{ f.label }}</button>
        </div>
      </div>
    </section>
    <div class="cols cols-4 people">
      <component
        :is="p.to ? NuxtLinkComp : 'article'"
        v-for="p in visible"
        :key="p.id"
        v-bind="p.to ? { to: localePath(p.to) } : {}"
        class="card-img person"
        :class="{ 'tile--ink': p.dark }"
      >
        <img :src="p.img" :alt="p.alt" loading="lazy" :style="p.pos ? { objectPosition: p.pos } : null" />
        <div class="card-body">
          <span class="kicker" :class="{ 'k-gold': p.dark }">{{ p.role }}</span>
          <div class="h-card">{{ p.name }}</div>
          <p class="p-long">{{ p.text }}</p>
          <p class="p-short">{{ p.short }}</p>
        </div>
      </component>
    </div>

    <!-- Repères -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <span class="kicker">{{ c.datesKicker }}</span>
        <h2 class="h-block tree-title">{{ c.datesTitle }}</h2>
        <div class="rows" style="--row-key: 150px">
          <div v-for="d in c.dates" :key="d.k">
            <div class="key">{{ d.k }}</div>
            <div class="val">{{ d.v }}</div>
          </div>
        </div>
      </div>
    </section>

    <PageSources :items="c.sources" />
  </div>
</template>

<script setup>
import { NuxtLink } from '#components'

const NuxtLinkComp = NuxtLink
const { locale, localePath } = useI18n()
const filter = ref('all')

const PEOPLE = [
  { id: 'maharbal', img: '/img/coin-elephant.jpg', cats: ['gen'] },
  { id: 'hasdrubal-cav', img: '/img/quarter-shekel.jpg', cats: ['gen'] },
  { id: 'giscon', img: '/img/gadir.jpg', cats: ['gen'] },
  { id: 'sophonisbe', img: '/img/sophonisba.jpg', cats: ['queen'], to: '/sophonisbe' },
  { id: 'elissa', img: '/img/guerin-dido.jpg', cats: ['queen'], to: '/didon' },
  { id: 'hannon', img: '/img/hanno-galley.png', cats: ['nav'], to: '/hannon' },
  { id: 'himilcon', img: '/img/punic-ship.jpg', cats: ['nav'] },
  { id: 'magon-i', img: '/img/mask.jpg', cats: ['gen'] },
  { id: 'hasdrubal-magon', img: '/img/tharros.jpg', cats: ['gen'] },
  { id: 'hamilcar-himere', img: '/img/himere-temple-de-la-victoire.jpg', cats: ['gen'], dark: true },
  { id: 'hannon-grand', img: '/img/punic-quarter.jpg', cats: ['gen'], to: '/hannon-le-grand' },
  { id: 'massinissa', img: '/img/massinissa.jpg', cats: ['ally'], to: '/massinissa' },
  { id: 'syphax', img: '/img/cirta-gorges-du-rhumel.jpg', cats: ['ally'] },
  { id: 'hasdrubal-beau', img: '/img/wall-cartagena.jpg', cats: ['gen'] },
  { id: 'xanthippe', img: '/img/byrsa.jpg', cats: ['gen'] },
  { id: 'boetharque', img: '/img/ruins.jpg', cats: ['gen'], dark: true },
  { id: 'hannibal', img: '/img/hannibal-bust.jpg', cats: ['gen'], to: '/hannibal' },
  { id: 'magon-agro', img: '/img/dominus.jpg', cats: [], to: '/magon-agronome' }
]

const C = {
  fr: {
    metaTitle: 'Personnages — les Barca, les généraux, les navigateurs',
    metaDesc: "La famille Barca, les généraux, les navigateurs, les rois et les reines de Carthage : Hamilcar, Hannibal, Hasdrubal, Magon, les Magonides, Hannon le Grand, Hannon, Himilcon, Élissa, Sophonisbe, Massinissa, Syphax.",
    heroAlt: 'Hamilcar Barca',
    heroCap: 'Hamilcar Barca, le père',
    chip: 'Personnages · 21 figures, 10 biographies',
    title: 'Les Barca, la « Foudre »',
    lede: "Barca viendrait du punique baraq, « l'éclair ». Un père, trois fils, trois filles et leurs alliances, et bien des noms perdus : une famille qui a tenu tête à Rome pendant un demi-siècle.",
    treeTitle: "L'arbre des Barcides",
    ancestors: [
      { name: 'Barcas, compagnon d\'Élissa ?', meta: "Ancêtre légendaire de la famille selon le poète Silius Italicus (Ier s. apr. J.-C.)" },
      { name: "Père d'Hamilcar", meta: "Nom inconnu : aucune source ne le mentionne" }
    ],
    rootSpouse: { name: "Épouse d'Hamilcar", meta: 'Nom inconnu · mère de trois fils et de trois filles' },
    root: { name: 'Hamilcar Barca', meta: "~275 – 228 av. J.-C. · conquiert l'Hispanie", to: '/hamilcar' },
    kids: [
      { name: 'Une fille', meta: '', spouse: { name: 'Bomilcar', meta: 'suffète · mariage déduit par les historiens modernes', uncertain: true }, issue: { name: 'Hannon', meta: "fils de Bomilcar (Polybe) · mène la cavalerie qui franchit le Rhône en amont (218)", uncertain: true } },
      { name: 'Une fille', meta: '', spouse: { name: 'Hasdrubal le Beau', meta: "†221 · gendre d'Hamilcar (Tite-Live) ; fonde Carthagène ; épouse ensuite une princesse ibère (Diodore)", to: '/hasdrubal' } },
      { name: 'Hannibal', meta: '247 – 183 · les Alpes, Cannes, puis suffète', to: '/hannibal', main: true, spouse: { name: 'Imilce', meta: "originaire de Castulo, en Hispanie (Tite-Live) ; le nom Imilce vient du poète Silius Italicus", uncertain: true }, issue: { name: 'Un fils ?', meta: "né en Hispanie vers 218, selon Silius Italicus seulement ; sort inconnu", uncertain: true } },
      { name: 'Hasdrubal Barca', meta: '~245 – 207 · franchit à son tour les Alpes, tué au Métaure', to: '/hasdrubal', none: 'Aucune épouse ni descendance connue' },
      { name: 'Magon Barca', meta: "~243 – 203 · l'embuscade de la Trébie, la Ligurie", to: '/magon-barca', none: 'Aucune épouse ni descendance connue' },
      { name: 'Une fille', meta: 'promise pendant la guerre des Mercenaires', spouse: { name: 'Naravas', meta: 'prince numide rallié à Hamilcar (Polybe) ; ses parents sont inconnus', uncertain: true } }
    ],
    treeNote: "Pointillés : lien incertain, reconstruit ou connu par une seule source tardive. Les noms des filles d'Hamilcar ne sont pas parvenus jusqu'à nous.",
    unknown: {
      kicker: 'Les trous de l\'arbre',
      title: 'Pourquoi tant de noms manquent',
      intro: "Les archives de Carthage ont disparu en 146 et ses livres ont été dispersés. Ce que l'on sait des Barcides vient d'auteurs grecs et romains, qui s'intéressaient aux généraux et nommaient rarement les femmes ou les enfants.",
      rows: [
        { k: 'Le père d\'Hamilcar', v: "Inconnu. Seule une tradition poétique fait remonter la famille à un compagnon d'Élissa ; le surnom Barca (« l'éclair ») n'est attesté qu'à partir d'Hamilcar." },
        { k: 'La mère des Barcides', v: "Inconnue : ni son nom ni son origine ne sont connus." },
        { k: 'Les trois filles', v: "Leurs noms ne sont pas parvenus jusqu'à nous. « Salammbô », souvent présentée comme fille d'Hamilcar, est un personnage inventé par Flaubert dans son roman de 1862." },
        { k: 'Naravas, Bomilcar', v: "On ne connaît ni leurs parents ni leurs descendants, à l'exception d'Hannon, fils de Bomilcar." },
        { k: "Les enfants d'Hannibal", v: "Aucun historien antique n'en mentionne. Chez Silius Italicus, Imilce lui donne un fils en Hispanie, que le Sénat carthaginois aurait voulu sacrifier : un épisode poétique, sans valeur historique sûre." },
        { k: 'Hasdrubal, Magon', v: "Aucune épouse ni aucun enfant connus. Après la mort d'Hannibal en 183, les sources ne mentionnent plus de descendant des Barca." }
      ]
    },
    gridTitle: 'Généraux & figures',
    filterLabel: 'Filtrer les personnages',
    filters: [
      { key: 'all', label: 'Tous' },
      { key: 'gen', label: 'Généraux' },
      { key: 'nav', label: 'Navigateurs' },
      { key: 'queen', label: 'Reines' },
      { key: 'ally', label: 'Alliés & rivaux' }
    ],
    people: {
      maharbal: { alt: 'Shekel barcide', role: 'Général de cavalerie', name: 'Maharbal', text: '« Tu sais vaincre, Hannibal ; tu ne sais pas profiter de ta victoire », lui dit-il après Cannes, selon Tite-Live.', short: 'Chef de la cavalerie à Cannes' },
      'hasdrubal-cav': { alt: 'Quart de shekel barcide', role: 'Général · Cannes', name: 'Hasdrubal (cavalerie)', text: 'Commande la cavalerie lourde qui contourne les légions et ferme le piège de Cannes.', short: 'Ferme le piège de Cannes' },
      giscon: { alt: 'Gadès (Cadix), dernière base punique en Hispanie', role: 'Général · † 202', name: 'Hasdrubal fils de Giscon', text: "L'un des trois généraux d'Hispanie (214 – 206) : vainqueur des Scipions en 211, battu par Scipion à Ilipa en 206. Il gagne Syphax à Carthage en lui donnant sa fille Sophonisbe. Battu en Afrique en 203, condamné par Carthage, il meurt en 202, suicidé selon Appien.", short: "Adversaire de Scipion, père de Sophonisbe" },
      sophonisbe: { alt: 'La Mort de Sophonisbe', role: 'Reine de Numidie · † 203', name: 'Sophonisbe', text: "Fille d'Hasdrubal fils de Giscon, épouse de Syphax puis de Massinissa, elle boit le poison plutôt que de figurer au triomphe de Scipion (Tite-Live, XXX, 15).", short: 'La reine qui choisit le poison' },
      elissa: { alt: 'Didon', role: 'Fondatrice · ~814', name: 'Élissa / Didon', text: 'Princesse de Tyr, elle fonde Carthage sur la colline de Byrsa.', short: 'Fondatrice · ~814' },
      hannon: { alt: 'Galère punique', role: 'Navigateur · Ve s.', name: 'Hannon', text: "Longe l'Afrique de l'Ouest avec 60 navires, selon le Périple qui lui est attribué.", short: "Le Périple vers l'Afrique de l'Ouest" },
      himilcon: { alt: 'Proue du navire punique de Marsala', role: 'Navigateur · Ve s. ?', name: 'Himilcon', text: "Parti de Gadès vers le nord, il explore les côtes atlantiques de l'Europe jusqu'aux Oestrymnides, les îles de l'étain. Son récit perdu n'est connu que par Pline l'Ancien (II, 169) et le poète Aviénus, qui parle de quatre mois de navigation, d'algues et de bas-fonds.", short: "La route de l'étain" },
      'magon-i': { alt: 'Masque punique en terre cuite', role: 'Chef de guerre · VIe s.', name: 'Magon Ier', text: "Fondateur de la dynastie des Magonides vers le milieu du VIe siècle. Selon Justin (XVIII, 7 ; XIX, 1), il réorganise l'armée et pose les bases de la puissance militaire de Carthage.", short: 'Fondateur des Magonides' },
      'hasdrubal-magon': { alt: 'Ruines de Tharros, en Sardaigne', role: 'Magonide · VIe s.', name: 'Hasdrubal fils de Magon', text: "Onze fois général selon Justin (XIX, 1), il combat en Sardaigne, où il meurt de ses blessures. Son frère Hamilcar lui succède à la tête de la famille.", short: 'Onze fois général, mort en Sardaigne' },
      'hamilcar-himere': { alt: 'Temple de la Victoire à Himère', role: 'Magonide · † 480', name: 'Hamilcar fils de Magon', text: "Commande la grande expédition de Sicile, écrasée à Himère en 480 par Gélon de Syracuse et Théron d'Agrigente. Selon Hérodote (VII, 167), il disparaît pendant la bataille en sacrifiant sur un bûcher. Hérodote le dit toutefois fils d'un Hannon : la généalogie des Magonides reste une reconstruction.", short: 'Vaincu à Himère, 480' },
      'hannon-grand': { alt: 'Quartier punique de Byrsa', role: 'Homme d\'État · IIIe s.', name: 'Hannon le Grand', text: "Chef de la faction des grands propriétaires, conquérant d'Hécatompyle en Afrique, général malheureux de la guerre des Mercenaires, puis adversaire déclaré de la guerre d'Hannibal selon Tite-Live.", short: 'Le rival des Barcides' },
      massinissa: { alt: 'Massinissa', role: 'Allié puis rival · 238 – 148', name: 'Massinissa', text: "Prince numide formé à Carthage, il passe dans le camp de Rome et décide de la bataille de Zama. Roi de Numidie pendant plus de cinquante ans, il grignote le territoire carthaginois.", short: 'Allié puis rival' },
      syphax: { alt: 'Les gorges du Rhumel à Constantine, antique Cirta', role: 'Roi des Masaesyles · † v. 201', name: 'Syphax', text: "Roi de la Numidie occidentale (Siga, puis Cirta), courtisé par Rome et par Carthage. Il choisit Carthage en épousant Sophonisbe, chasse Massinissa, puis est vaincu et capturé en 203. Il meurt captif en Italie.", short: 'Le roi numide allié de Carthage' },
      'hasdrubal-beau': { alt: 'Muraille punique de Carthagène', role: 'Général · ~270 – 221', name: 'Hasdrubal le Beau', text: "Gendre d'Hamilcar, il lui succède en Hispanie, fonde Carthagène et conclut avec Rome le traité de l'Èbre (226). Assassiné en 221.", short: "Fondateur de Carthagène" },
      xanthippe: { alt: 'Colline de Byrsa, Carthage', role: 'Mercenaire spartiate · 255', name: 'Xanthippe', text: "Engagé par Carthage, il critique la tactique punique, entraîne l'armée à combattre en plaine et, avec la cavalerie et près de cent éléphants, écrase et capture Regulus près de Tunis en 255 (Polybe, I, 32–34). Il quitte Carthage peu après ; le récit tardif de sa noyade par les Carthaginois n'est confirmé par rien.", short: 'Vainqueur de Regulus, 255' },
      boetharque: { alt: 'Ruines de Carthage', role: 'Dernier chef · 150 – 146', name: 'Hasdrubal le Boétharque', text: "En 150, il mène contre Massinissa l'armée qui est encerclée et détruite. Condamné à mort pour apaiser Rome, il rallie une armée et redevient le chef de la défense pendant le siège (149 – 146). Il finit par se rendre à Scipion ; sa femme, le traitant de lâche, se jette dans les flammes avec leurs fils (Polybe, XXXVIII, 20).", short: 'Défend Carthage, 149–146' },
      hannibal: { alt: "Buste d'Hannibal", role: 'Général · 247 – 183', name: 'Hannibal Barca', text: 'Franchit les Alpes avec ses éléphants et écrase Rome à Cannes en 216 av. J.-C.', short: '247 – 183' },
      'magon-agro': { alt: "Mosaïque agricole, Carthage", role: 'Agronome', name: "Magon l'Agronome", text: "Auteur d'un traité d'agriculture en 28 livres, traduit en latin sur ordre du Sénat.", short: "Le père de l'agronomie" }
    },
    datesKicker: 'Repères',
    datesTitle: 'Six siècles de figures carthaginoises',
    dates: [
      { k: '~814', v: "Élissa, princesse de Tyr, fonde Carthage sur la colline de Byrsa : c'est la légende de la peau de bœuf découpée en lanières." },
      { k: '~550 – 480', v: "Les Magonides, descendants de Magon, dirigent les guerres de Carthage ; Hamilcar, fils de Magon, est vaincu à Himère en 480." },
      { k: '~500 ?', v: "Hannon longe la côte atlantique de l'Afrique avec 60 navires et 30 000 colons." },
      { k: '255', v: 'Le Spartiate Xanthippe, au service de Carthage, écrase le consul Regulus devant Tunis.' },
      { k: '247 – 241', v: "Hamilcar Barca mène la guérilla en Sicile, depuis l'Eryx, jusqu'à la fin de la première guerre punique." },
      { k: '241 – 238', v: "Hamilcar écrase la révolte des mercenaires impayés, après les échecs d'Hannon le Grand." },
      { k: '237', v: "Départ pour l'Hispanie ; Hannibal, 9 ans, jure de ne jamais être l'ami de Rome." },
      { k: '228 – 221', v: "Hamilcar meurt noyé en combattant les Ibères ; Hasdrubal le Beau fonde Carthagène puis est assassiné. Hannibal, 26 ans, prend le commandement." },
      { k: '218 – 216', v: "Les Alpes, la Trébie, Trasimène, Cannes. Magon Barca verse devant le Sénat de Carthage les anneaux d'or des chevaliers romains tués." },
      { k: '207', v: "Hasdrubal Barca est tué au Métaure ; les Romains jettent sa tête dans le camp d'Hannibal." },
      { k: '203', v: "Syphax est capturé ; Magon Barca, blessé en Ligurie, meurt en mer. Sophonisbe s'empoisonne." },
      { k: '202', v: "Zama : la cavalerie de Massinissa décide de la victoire de Scipion." },
      { k: '183', v: "Traqué par Rome, Hannibal s'empoisonne en Bithynie." },
      { k: '148 – 146', v: "Mort de Massinissa ; Hasdrubal le Boétharque défend Carthage jusqu'à la chute." }
    ],
    sources: [
      { type: 'ancient', author: 'Polybe', work: 'Histoires', ref: 'I, 32–34 ; XXXVIII, 20', note: 'Xanthippe, Hasdrubal le Boétharque, Naravas, Hannon fils de Bomilcar' },
      { type: 'ancient', author: 'Tite-Live', work: 'Histoire romaine', ref: 'XXX, 15', note: 'Sophonisbe, Maharbal, Imilce, Hasdrubal le Beau, Hannon le Grand' },
      { type: 'ancient', author: 'Justin', work: 'Abrégé des Histoires philippiques de Trogue Pompée', ref: 'XVIII, 7 ; XIX, 1', note: 'les Magonides' },
      { type: 'ancient', author: 'Hérodote', work: 'Histoires', ref: 'VII, 167', note: 'Hamilcar à Himère' },
      { type: 'ancient', author: 'Diodore de Sicile', work: 'Bibliothèque historique', note: 'second mariage d’Hasdrubal le Beau' },
      { type: 'ancient', author: 'Appien', work: 'Libyca', note: 'mort d’Hasdrubal fils de Giscon' },
      { type: 'ancient', author: 'Pline l\'Ancien', work: 'Histoire naturelle', ref: 'II, 169', note: 'Himilcon' },
      { type: 'ancient', author: 'Aviénus', work: 'Ora maritima', note: 'Himilcon' },
      { type: 'ancient', author: 'Silius Italicus', work: 'Punica', note: 'Barcas, Imilce et le fils d’Hannibal' },
      { type: 'ancient', author: 'Anonyme', work: 'Périple d\'Hannon' }
    ]
  },
  en: {
    metaTitle: 'People — the Barcids, the generals, the navigators',
    metaDesc: "The Barca family, Carthage's generals, navigators, kings and queens: Hamilcar, Hannibal, Hasdrubal, Mago, the Magonids, Hanno the Great, Hanno, Himilco, Elissa, Sophonisba, Masinissa, Syphax.",
    heroAlt: 'Hamilcar Barca',
    heroCap: 'Hamilcar Barca, the father',
    chip: 'People · 21 figures, 10 biographies',
    title: 'The Barcas, the “Thunderbolt”',
    lede: 'Barca is thought to come from the Punic baraq, “lightning”. One father, three sons, three daughters and their marriages, and many lost names: a family that stood up to Rome for half a century.',
    treeTitle: 'The Barcid family tree',
    ancestors: [
      { name: 'Barcas, companion of Elissa?', meta: 'Legendary ancestor of the family according to the poet Silius Italicus (1st c. AD)' },
      { name: "Hamilcar's father", meta: 'Name unknown: no source mentions him' }
    ],
    rootSpouse: { name: "Hamilcar's wife", meta: 'Name unknown · mother of three sons and three daughters' },
    root: { name: 'Hamilcar Barca', meta: 'c. 275 – 228 BC · conquers Hispania', to: '/hamilcar' },
    kids: [
      { name: 'A daughter', meta: '', spouse: { name: 'Bomilcar', meta: 'suffete · marriage inferred by modern historians', uncertain: true }, issue: { name: 'Hanno', meta: 'son of Bomilcar (Polybius) · leads the cavalry that crosses the Rhône upstream (218)', uncertain: true } },
      { name: 'A daughter', meta: '', spouse: { name: 'Hasdrubal the Fair', meta: "†221 · Hamilcar's son-in-law (Livy); founds Cartagena; later marries an Iberian princess (Diodorus)", to: '/hasdrubal' } },
      { name: 'Hannibal', meta: '247 – 183 · the Alps, Cannae, then suffete', to: '/hannibal', main: true, spouse: { name: 'Imilce', meta: 'from Castulo in Hispania (Livy); the name Imilce comes from the poet Silius Italicus', uncertain: true }, issue: { name: 'A son?', meta: 'born in Hispania around 218, according to Silius Italicus only; fate unknown', uncertain: true } },
      { name: 'Hasdrubal Barca', meta: 'c. 245 – 207 · crosses the Alps in turn, killed at the Metaurus', to: '/hasdrubal', none: 'No known wife or children' },
      { name: 'Mago Barca', meta: 'c. 243 – 203 · the ambush at the Trebia, Liguria', to: '/magon-barca', none: 'No known wife or children' },
      { name: 'A daughter', meta: 'promised during the Mercenary War', spouse: { name: 'Naravas', meta: 'Numidian prince who joined Hamilcar (Polybius); his parents are unknown', uncertain: true } }
    ],
    treeNote: "Dashed: uncertain link, a modern reconstruction or known from a single late source. The names of Hamilcar's daughters have not come down to us.",
    unknown: {
      kicker: 'Gaps in the tree',
      title: 'Why so many names are missing',
      intro: "Carthage's archives disappeared in 146 and its books were scattered. What we know of the Barcids comes from Greek and Roman authors, who cared about generals and rarely named women or children.",
      rows: [
        { k: "Hamilcar's father", v: 'Unknown. Only a poetic tradition traces the family back to a companion of Elissa; the nickname Barca (“lightning”) is attested only from Hamilcar onwards.' },
        { k: 'The Barcids\' mother', v: 'Unknown: neither her name nor her origin is known.' },
        { k: 'The three daughters', v: 'Their names have not come down to us. “Salammbô”, often presented as Hamilcar\'s daughter, is a character invented by Flaubert in his 1862 novel.' },
        { k: 'Naravas, Bomilcar', v: 'Neither their parents nor their descendants are known, apart from Hanno, son of Bomilcar.' },
        { k: "Hannibal's children", v: 'No ancient historian mentions any. In Silius Italicus, Imilce bears him a son in Hispania whom the Carthaginian Senate wants to sacrifice: a poetic episode with no reliable historical value.' },
        { k: 'Hasdrubal, Mago', v: 'No known wives or children. After Hannibal\'s death in 183, the sources no longer mention any descendant of the Barcas.' }
      ]
    },
    gridTitle: 'Generals & figures',
    filterLabel: 'Filter people',
    filters: [
      { key: 'all', label: 'All' },
      { key: 'gen', label: 'Generals' },
      { key: 'nav', label: 'Navigators' },
      { key: 'queen', label: 'Queens' },
      { key: 'ally', label: 'Allies & rivals' }
    ],
    people: {
      maharbal: { alt: 'Barcid shekel', role: 'Cavalry general', name: 'Maharbal', text: '“You know how to win a victory, Hannibal; you do not know how to use it,” he tells him after Cannae, according to Livy.', short: 'Cavalry commander at Cannae' },
      'hasdrubal-cav': { alt: 'Barcid quarter shekel', role: 'General · Cannae', name: 'Hasdrubal (cavalry)', text: 'Commands the heavy cavalry that rides around the legions and closes the trap at Cannae.', short: 'Closes the trap at Cannae' },
      giscon: { alt: "Gades (Cadiz), Carthage's last base in Iberia", role: 'General · † 202', name: 'Hasdrubal son of Gisco', text: 'One of the three generals in Iberia (214 – 206): victor over the Scipios in 211, beaten by Scipio at Ilipa in 206. He won Syphax over to Carthage by giving him his daughter Sophonisba. Defeated in Africa in 203 and condemned by Carthage, he died in 202, by suicide according to Appian.', short: "Scipio's opponent, Sophonisba's father" },
      sophonisbe: { alt: 'The Death of Sophonisba', role: 'Queen of Numidia · † 203', name: 'Sophonisba', text: "Daughter of Hasdrubal son of Gisco, wife of Syphax and then of Masinissa, she drank poison rather than walk in Scipio's triumph (Livy, XXX, 15).", short: 'The queen who chose poison' },
      elissa: { alt: 'Dido', role: 'Founder · c. 814', name: 'Elissa / Dido', text: 'A princess of Tyre, she founds Carthage on the hill of Byrsa.', short: 'Founder · c. 814' },
      hannon: { alt: 'Punic galley', role: 'Navigator · 5th c.', name: 'Hanno', text: 'Sails along West Africa with 60 ships, according to the Periplus attributed to him.', short: 'The Periplus to West Africa' },
      himilcon: { alt: 'Bow of the Marsala Punic ship', role: 'Navigator · 5th c.?', name: 'Himilco', text: "Setting out north from Gades, he explored Europe's Atlantic coasts as far as the Oestrymnides, the tin islands. His lost account is known only through Pliny the Elder (II, 169) and the poet Avienus, who speaks of four months at sea, seaweed and shallows.", short: 'The tin route' },
      'magon-i': { alt: 'Punic terracotta mask', role: 'War leader · 6th c.', name: 'Mago I', text: "Founder of the Magonid dynasty around the mid-6th century. According to Justin (XVIII, 7; XIX, 1), he reorganised the army and laid the foundations of Carthage's military power.", short: 'Founder of the Magonids' },
      'hasdrubal-magon': { alt: 'Ruins of Tharros, Sardinia', role: 'Magonid · 6th c.', name: 'Hasdrubal son of Mago', text: 'Eleven times general according to Justin (XIX, 1), he fought in Sardinia, where he died of his wounds. His brother Hamilcar succeeded him at the head of the family.', short: 'Eleven times general, died in Sardinia' },
      'hamilcar-himere': { alt: 'Temple of Victory at Himera', role: 'Magonid · † 480', name: 'Hamilcar son of Mago', text: 'He led the great Sicilian expedition, crushed at Himera in 480 by Gelon of Syracuse and Theron of Akragas. According to Herodotus (VII, 167), he vanished during the battle while sacrificing on a pyre. Herodotus, however, calls him the son of a Hanno: the Magonid genealogy remains a reconstruction.', short: 'Defeated at Himera, 480' },
      'hannon-grand': { alt: 'Punic quarter on Byrsa', role: 'Statesman · 3rd c.', name: 'Hanno the Great', text: "Leader of the great landowners' faction, conqueror of Hecatompylus in Africa, unlucky general of the Mercenary War, then open opponent of Hannibal's war according to Livy.", short: 'Rival of the Barcids' },
      massinissa: { alt: 'Masinissa', role: 'Ally, then rival · 238 – 148', name: 'Masinissa', text: "A Numidian prince educated in Carthage, he goes over to Rome's side and decides the battle of Zama. King of Numidia for over fifty years, he nibbles away at Carthaginian territory.", short: 'Ally, then rival' },
      syphax: { alt: 'The Rhumel gorge at Constantine, ancient Cirta', role: 'King of the Masaesyli · † c. 201', name: 'Syphax', text: 'King of western Numidia (Siga, then Cirta), courted by both Rome and Carthage. He chose Carthage by marrying Sophonisba and drove out Masinissa, then was defeated and captured in 203. He died a captive in Italy.', short: "Carthage's Numidian ally" },
      'hasdrubal-beau': { alt: 'Punic wall of Cartagena', role: 'General · c. 270 – 221', name: 'Hasdrubal the Fair', text: "Hamilcar's son-in-law, he succeeds him in Iberia, founds Cartagena and concludes the Ebro Treaty with Rome (226). Assassinated in 221.", short: 'Founder of Cartagena' },
      xanthippe: { alt: 'Byrsa hill, Carthage', role: 'Spartan mercenary · 255', name: 'Xanthippus', text: 'Hired by Carthage, he criticised Punic tactics, trained the army to fight on open ground and, with the cavalry and nearly a hundred elephants, crushed and captured Regulus near Tunis in 255 (Polybius, I, 32–34). He left Carthage soon after; the late story that the Carthaginians drowned him is unconfirmed.', short: 'Victor over Regulus, 255' },
      boetharque: { alt: 'Ruins of Carthage', role: 'Last leader · 150 – 146', name: 'Hasdrubal the Boetharch', text: 'In 150 he led the army against Masinissa that was surrounded and destroyed. Condemned to death to appease Rome, he raised an army and again became leader of the defence during the siege (149 – 146). He finally surrendered to Scipio; his wife, calling him a coward, threw herself into the flames with their sons (Polybius, XXXVIII, 20).', short: 'Defends Carthage, 149–146' },
      hannibal: { alt: 'Bust of Hannibal', role: 'General · 247 – 183', name: 'Hannibal Barca', text: 'Crosses the Alps with his elephants and crushes Rome at Cannae in 216 BC.', short: '247 – 183' },
      'magon-agro': { alt: 'Farming mosaic, Carthage', role: 'Agronomist', name: 'Mago the Agronomist', text: 'Author of a 28-book treatise on agriculture, translated into Latin by order of the Senate.', short: 'The father of agronomy' }
    },
    datesKicker: 'Milestones',
    datesTitle: 'Six centuries of Carthaginian figures',
    dates: [
      { k: 'c. 814', v: 'Elissa, princess of Tyre, founds Carthage on the hill of Byrsa: the legend of the oxhide cut into strips.' },
      { k: 'c. 550 – 480', v: "The Magonids, Mago's descendants, lead Carthage's wars; Hamilcar son of Mago is defeated at Himera in 480." },
      { k: 'c. 500?', v: 'Hanno sails along the Atlantic coast of Africa with 60 ships and 30,000 colonists.' },
      { k: '255', v: 'The Spartan Xanthippus, in Carthage’s service, crushes the consul Regulus before Tunis.' },
      { k: '247 – 241', v: 'Hamilcar Barca wages guerrilla war in Sicily, from Eryx, until the end of the First Punic War.' },
      { k: '241 – 238', v: 'Hamilcar crushes the revolt of the unpaid mercenaries, after the failures of Hanno the Great.' },
      { k: '237', v: 'Departure for Iberia; Hannibal, aged 9, swears never to be a friend of Rome.' },
      { k: '228 – 221', v: 'Hamilcar drowns fighting the Iberians; Hasdrubal the Fair founds Cartagena and is then assassinated. Hannibal, 26, takes command.' },
      { k: '218 – 216', v: 'The Alps, the Trebia, Trasimene, Cannae. Mago Barca pours out before the Carthaginian Senate the gold rings of slain Roman knights.' },
      { k: '207', v: 'Hasdrubal Barca is killed at the Metaurus; the Romans throw his head into Hannibal’s camp.' },
      { k: '203', v: 'Syphax is captured; Mago Barca, wounded in Liguria, dies at sea. Sophonisba takes poison.' },
      { k: '202', v: 'Zama: Masinissa’s cavalry decides Scipio’s victory.' },
      { k: '183', v: 'Hunted by Rome, Hannibal takes poison in Bithynia.' },
      { k: '148 – 146', v: 'Death of Masinissa; Hasdrubal the Boetharch defends Carthage to the end.' }
    ],
    sources: [
      { type: 'ancient', author: 'Polybius', work: 'Histories', ref: 'I, 32–34; XXXVIII, 20', note: 'Xanthippus, Hasdrubal the Boetharch, Naravas, Hanno son of Bomilcar' },
      { type: 'ancient', author: 'Livy', work: 'History of Rome', ref: 'XXX, 15', note: 'Sophonisba, Maharbal, Imilce, Hasdrubal the Fair, Hanno the Great' },
      { type: 'ancient', author: 'Justin', work: 'Epitome of Pompeius Trogus\' Philippic Histories', ref: 'XVIII, 7; XIX, 1', note: 'the Magonids' },
      { type: 'ancient', author: 'Herodotus', work: 'Histories', ref: 'VII, 167', note: 'Hamilcar at Himera' },
      { type: 'ancient', author: 'Diodorus Siculus', work: 'Library of History', note: 'Hasdrubal the Fair\'s second marriage' },
      { type: 'ancient', author: 'Appian', work: 'Libyca', note: 'death of Hasdrubal son of Gisco' },
      { type: 'ancient', author: 'Pliny the Elder', work: 'Natural History', ref: 'II, 169', note: 'Himilco' },
      { type: 'ancient', author: 'Avienus', work: 'Ora maritima', note: 'Himilco' },
      { type: 'ancient', author: 'Silius Italicus', work: 'Punica', note: 'Barcas, Imilce and Hannibal\'s son' },
      { type: 'ancient', author: 'Anonymous', work: 'Periplus of Hanno' }
    ]
  },
  ar: {
    metaTitle: 'الشخصيات — آل برقا والقادة والملاحون',
    metaDesc: 'أسرة برقا وقادة قرطاج وملاحوها وملوكها وملكاتها: حملقار وحنبعل وصدربعل وماغون والماغونيون وحنون الكبير وحنون وحملكون وعليسة وصفنبعل وماسينيسا وسيفاكس.',
    heroAlt: 'حملقار برقا',
    heroCap: 'حملقار برقا، الأب',
    chip: 'الشخصيات · 21 شخصية و10 سِيَر',
    title: 'آل برقا، «الصاعقة»',
    lede: 'يُرجَّح أن اسم برقا مشتق من الكلمة البونيقية «برق». أب وثلاثة أبناء وثلاث بنات ومصاهراتهم، وأسماء كثيرة ضائعة: أسرة صمدت في وجه روما نصف قرن.',
    treeTitle: 'شجرة آل برقا',
    ancestors: [
      { name: 'برقاس، رفيق عليسة؟', meta: 'جدّ أسطوري للأسرة حسب الشاعر سيليوس إيتاليكوس (ق 1 م)' },
      { name: 'والد حملقار', meta: 'اسمه مجهول: لا يذكره أي مصدر' }
    ],
    rootSpouse: { name: 'زوجة حملقار', meta: 'اسمها مجهول · أمّ لثلاثة أبناء وثلاث بنات' },
    root: { name: 'حملقار برقا', meta: 'نحو 275 – 228 ق.م · يفتح هسبانيا', to: '/hamilcar' },
    kids: [
      { name: 'ابنة', meta: '', spouse: { name: 'بوملقار', meta: 'شفط · زواج استنتجه المؤرخون المحدثون', uncertain: true }, issue: { name: 'حنون', meta: 'ابن بوملقار (بوليبيوس) · يقود الفرسان الذين عبروا الرون من أعلى النهر (218)', uncertain: true } },
      { name: 'ابنة', meta: '', spouse: { name: 'صدربعل الجميل', meta: '†221 · صهر حملقار (تيتوس ليفيوس)؛ مؤسس قرطاجنة؛ تزوج لاحقاً أميرة إيبيرية (ديودوروس)', to: '/hasdrubal' } },
      { name: 'حنبعل', meta: '247 – 183 · الألب، كاناي، ثم شفط', to: '/hannibal', main: true, spouse: { name: 'إيميلكي', meta: 'من كاستولو في هسبانيا (تيتوس ليفيوس)؛ واسم إيميلكي مأخوذ من الشاعر سيليوس إيتاليكوس', uncertain: true }, issue: { name: 'ابن؟', meta: 'وُلد في هسبانيا نحو 218 حسب سيليوس إيتاليكوس وحده؛ مصيره مجهول', uncertain: true } },
      { name: 'صدربعل برقا', meta: 'نحو 245 – 207 · يعبر الألب بدوره، ويُقتل عند الميتاورو', to: '/hasdrubal', none: 'لا زوجة ولا ذرية معروفة' },
      { name: 'ماغون برقا', meta: 'نحو 243 – 203 · كمين تريبيا، ليغوريا', to: '/magon-barca', none: 'لا زوجة ولا ذرية معروفة' },
      { name: 'ابنة', meta: 'وُعِد بها خلال حرب المرتزقة', spouse: { name: 'نارافاس', meta: 'أمير نوميدي انضم إلى حملقار (بوليبيوس)؛ والداه مجهولان', uncertain: true } }
    ],
    treeNote: 'الخط المتقطع: صلة غير مؤكدة أو مُعاد بناؤها أو معروفة من مصدر متأخر واحد. أسماء بنات حملقار لم تصلنا.',
    unknown: {
      kicker: 'ثغرات الشجرة',
      title: 'لماذا تغيب أسماء كثيرة',
      intro: 'اختفت أرشيفات قرطاج سنة 146 وتشتتت كتبها. وما نعرفه عن البرقيين مصدره مؤلفون إغريق ورومان اهتموا بالقادة ونادراً ما سمّوا النساء أو الأطفال.',
      rows: [
        { k: 'والد حملقار', v: 'مجهول. وحده تقليد شعري يُرجع الأسرة إلى رفيق لعليسة، ولقب «برقا» (البرق) لا يظهر إلا ابتداءً من حملقار.' },
        { k: 'أمّ البرقيين', v: 'مجهولة: لا يُعرف اسمها ولا أصلها.' },
        { k: 'البنات الثلاث', v: 'لم تصلنا أسماؤهن. أما «سالامبو» التي تُقدَّم كثيراً على أنها ابنة حملقار، فشخصية اخترعها فلوبير في روايته سنة 1862.' },
        { k: 'نارافاس، بوملقار', v: 'لا يُعرف والداهما ولا ذريتهما، باستثناء حنون بن بوملقار.' },
        { k: 'أبناء حنبعل', v: 'لا يذكر أي مؤرخ قديم أبناءً له. وعند سيليوس إيتاليكوس تنجب له إيميلكي ابناً في هسبانيا أراد مجلس شيوخ قرطاج التضحية به: حكاية شعرية بلا قيمة تاريخية مؤكدة.' },
        { k: 'صدربعل، ماغون', v: 'لا زوجة ولا ولد معروفان. وبعد موت حنبعل سنة 183 لم تعد المصادر تذكر أي سليل لآل برقا.' }
      ]
    },
    gridTitle: 'قادة وشخصيات',
    filterLabel: 'تصفية الشخصيات',
    filters: [
      { key: 'all', label: 'الكل' },
      { key: 'gen', label: 'القادة' },
      { key: 'nav', label: 'الملاحون' },
      { key: 'queen', label: 'الملكات' },
      { key: 'ally', label: 'حلفاء وخصوم' }
    ],
    people: {
      maharbal: { alt: 'شيقل برقي', role: 'قائد الفرسان', name: 'مهربعل', text: '«أنت تعرف كيف تنتصر يا حنبعل، لكنك لا تعرف كيف تستثمر نصرك»، قالها له بعد كاناي بحسب تيتوس ليفيوس.', short: 'قائد الفرسان في كاناي' },
      'hasdrubal-cav': { alt: 'ربع شيقل برقي', role: 'قائد · كاناي', name: 'صدربعل (الفرسان)', text: 'يقود الفرسان الثقيلة التي تلتف حول الفيالق وتُحكم فخ كاناي.', short: 'يُحكم فخ كاناي' },
      giscon: { alt: 'قادس، آخر قاعدة بونيقية في هسبانيا', role: 'قائد · † 202', name: 'صدربعل بن جسكون', text: 'أحد القادة الثلاثة في هسبانيا (214 – 206): انتصر على الأخوين سكيبيو سنة 211، وهزمه سكيبيو في إيليبا سنة 206. كسب سيفاكس إلى صف قرطاج بتزويجه ابنته صفنبعل. هُزم في إفريقيا سنة 203 وأدانته قرطاج، فمات سنة 202 منتحرًا بحسب أبيانوس.', short: 'خصم سكيبيو ووالد صفنبعل' },
      sophonisbe: { alt: 'موت صفنبعل', role: 'ملكة نوميديا · † 203', name: 'صفنبعل', text: 'ابنة صدربعل بن جسكون، زوجة سيفاكس ثم ماسينيسا، شربت السم بدل أن تُساق في موكب نصر سكيبيو (ليفيوس، 30، 15).', short: 'الملكة التي اختارت السم' },
      elissa: { alt: 'ديدون', role: 'المؤسِّسة · نحو 814', name: 'عليسة / ديدون', text: 'أميرة من صور، أسست قرطاج على تل بيرصا.', short: 'المؤسِّسة · نحو 814' },
      hannon: { alt: 'سفينة بونيقية', role: 'ملاح · القرن الخامس', name: 'حنون', text: 'يبحر بمحاذاة غرب إفريقيا على رأس 60 سفينة، بحسب «الرحلة» المنسوبة إليه.', short: 'الرحلة إلى غرب إفريقيا' },
      himilcon: { alt: 'مقدمة سفينة مرسالة البونيقية', role: 'ملاح · القرن الخامس؟', name: 'حملكون', text: 'انطلق من قادس شمالًا فاستكشف السواحل الأطلسية لأوروبا حتى جزر الأويستريمنيدس، جزر القصدير. ولا تُعرف رحلته المفقودة إلا من بلينيوس الأكبر (2، 169) والشاعر أفينوس الذي يتحدث عن أربعة أشهر من الإبحار وعن الطحالب والمياه الضحلة.', short: 'طريق القصدير' },
      'magon-i': { alt: 'قناع بونيقي من الطين المشوي', role: 'قائد حرب · القرن 6', name: 'ماغون الأول', text: 'مؤسس أسرة الماغونيين نحو منتصف القرن السادس. وبحسب يوستينوس (18، 7؛ 19، 1) أعاد تنظيم الجيش وأرسى أسس القوة العسكرية لقرطاج.', short: 'مؤسس الماغونيين' },
      'hasdrubal-magon': { alt: 'أطلال ثاروس في سردينيا', role: 'ماغوني · القرن 6', name: 'صدربعل بن ماغون', text: 'تولّى القيادة إحدى عشرة مرة بحسب يوستينوس (19، 1)، وقاتل في سردينيا حيث مات متأثرًا بجراحه. وخلفه أخوه حملقار على رأس الأسرة.', short: 'قائد إحدى عشرة مرة، مات في سردينيا' },
      'hamilcar-himere': { alt: 'معبد النصر في هيميرا', role: 'ماغوني · † 480', name: 'حملقار بن ماغون', text: 'قاد الحملة الكبرى على صقلية التي سحقها في هيميرا سنة 480 جيلون السرقوسي وثيرون الأكراغاسي. وبحسب هيرودوت (7، 167) اختفى أثناء المعركة وهو يقدّم القرابين على محرقة. غير أن هيرودوت يجعله ابنًا لحنون: فنسب الماغونيين يبقى إعادة بناء.', short: 'هُزم في هيميرا، 480' },
      'hannon-grand': { alt: 'الحي البونيقي في بيرصا', role: 'رجل دولة · القرن 3', name: 'حنون الكبير', text: 'زعيم فئة كبار الملاك، فاتح هيكاتومبيلوس في إفريقيا، والقائد السيئ الحظ في حرب المرتزقة، ثم الخصم المعلن لحرب حنبعل بحسب ليفيوس.', short: 'منافس آل برقا' },
      massinissa: { alt: 'ماسينيسا', role: 'حليف ثم خصم · 238 – 148', name: 'ماسينيسا', text: 'أمير نوميدي تربّى في قرطاج، ينحاز إلى روما ويحسم معركة زامة. ملك نوميديا أكثر من خمسين عامًا، قضم خلالها أراضي قرطاج.', short: 'حليف ثم خصم' },
      syphax: { alt: 'خوانق وادي الرمال في قسنطينة، سيرتا القديمة', role: 'ملك الماسيسيليين · † نحو 201', name: 'سيفاكس', text: 'ملك نوميديا الغربية (سيغا ثم سيرتا)، خطبت روما وقرطاج ودّه. اختار قرطاج بزواجه من صفنبعل وطرد ماسينيسا، ثم هُزم وأُسر سنة 203. ومات أسيرًا في إيطاليا.', short: 'الملك النوميدي حليف قرطاج' },
      'hasdrubal-beau': { alt: 'السور البونيقي في قرطاجنة', role: 'قائد · نحو 270 – 221', name: 'صدربعل الجميل', text: 'صهر حملقار، يخلفه في إيبيريا، ويؤسس قرطاجنة، ويبرم مع روما معاهدة الإيبرو (226). اغتيل سنة 221.', short: 'مؤسس قرطاجنة' },
      xanthippe: { alt: 'تل بيرصا، قرطاج', role: 'مرتزق إسبرطي · 255', name: 'كسانثيبوس', text: 'استأجرته قرطاج فانتقد التكتيك البونيقي، ودرّب الجيش على القتال في السهل، وبالفرسان ونحو مئة فيل سحق ريغولوس وأسره قرب تونس سنة 255 (بوليبيوس، 1، 32–34). وغادر قرطاج بعد قليل؛ أما الرواية المتأخرة عن إغراق القرطاجيين له فلا يؤكدها شيء.', short: 'قاهر ريغولوس، 255' },
      boetharque: { alt: 'أطلال قرطاج', role: 'آخر قائد · 150 – 146', name: 'صدربعل البويثارخ', text: 'قاد سنة 150 الجيش الذي حوصر وأُبيد في مواجهة ماسينيسا. حُكم عليه بالموت استرضاءً لروما، فجمع جيشًا وعاد قائدًا للدفاع أثناء الحصار (149 – 146). ثم استسلم أخيرًا لسكيبيو؛ فرمته زوجته بالجبن وألقت بنفسها مع ابنيهما في النار (بوليبيوس، 38، 20).', short: 'يدافع عن قرطاج، 149–146' },
      hannibal: { alt: 'تمثال نصفي لحنبعل', role: 'قائد · 247 – 183', name: 'حنبعل برقا', text: 'يعبر الألب بفيلته ويسحق روما في كاناي سنة 216 ق.م.', short: '247 – 183' },
      'magon-agro': { alt: 'فسيفساء فلاحية، قرطاج', role: 'عالم فلاحة', name: 'ماغون الفلاحي', text: 'صاحب موسوعة في الفلاحة من 28 كتابًا، تُرجمت إلى اللاتينية بأمر من مجلس الشيوخ.', short: 'أبو علم الفلاحة' }
    },
    datesKicker: 'معالم',
    datesTitle: 'ستة قرون من الشخصيات القرطاجية',
    dates: [
      { k: 'نحو 814', v: 'عليسة، أميرة صور، تؤسس قرطاج على تل بيرصا: أسطورة جلد الثور المقطّع شرائط.' },
      { k: 'نحو 550 – 480', v: 'الماغونيون، أحفاد ماغون، يقودون حروب قرطاج؛ وحملقار بن ماغون يُهزم في هيميرا سنة 480.' },
      { k: 'نحو 500؟', v: 'حنون يبحر بمحاذاة الساحل الأطلسي لإفريقيا بستين سفينة وثلاثين ألف مستوطن.' },
      { k: '255', v: 'الإسبرطي كسانثيبوس، في خدمة قرطاج، يسحق القنصل ريغولوس أمام تونس.' },
      { k: '247 – 241', v: 'حملقار برقا يخوض حرب عصابات في صقلية انطلاقًا من إريكس حتى نهاية الحرب البونيقية الأولى.' },
      { k: '241 – 238', v: 'حملقار يسحق ثورة المرتزقة الذين لم يتقاضوا أجورهم، بعد إخفاقات حنون الكبير.' },
      { k: '237', v: 'الرحيل إلى إيبيريا؛ حنبعل، ابن التاسعة، يقسم ألا يكون صديقًا لروما أبدًا.' },
      { k: '228 – 221', v: 'حملقار يغرق وهو يقاتل الإيبيريين؛ صدربعل الجميل يؤسس قرطاجنة ثم يُغتال. وحنبعل، ابن السادسة والعشرين، يتولى القيادة.' },
      { k: '218 – 216', v: 'الألب، تريبيا، ترازيمينو، كاناي. ماغون برقا ينثر أمام مجلس شيوخ قرطاج الخواتم الذهبية للفرسان الرومان القتلى.' },
      { k: '207', v: 'مقتل صدربعل برقا عند الميتاورو؛ الرومان يلقون رأسه في معسكر حنبعل.' },
      { k: '203', v: 'أسر سيفاكس؛ وماغون برقا، الجريح في ليغوريا، يموت في البحر. وصفنبعل تتجرع السم.' },
      { k: '202', v: 'زاما: فرسان ماسينيسا يحسمون انتصار سكيبيو.' },
      { k: '183', v: 'حنبعل، الذي طاردته روما، يتجرع السم في بيثينيا.' },
      { k: '148 – 146', v: 'وفاة ماسينيسا؛ صدربعل البويثارخ يدافع عن قرطاج حتى السقوط.' }
    ],
    sources: [
      { type: 'ancient', author: 'بوليبيوس', work: 'التواريخ', ref: '1، 32–34؛ 38، 20', note: 'كسانثيبوس، صدربعل البويثارخ، نارافاس، حنون بن بوملقار' },
      { type: 'ancient', author: 'تيتوس ليفيوس', work: 'تاريخ روما', ref: '30، 15', note: 'صوفونيسبا، مهربعل، إيميلكي، صدربعل الجميل، حنون الكبير' },
      { type: 'ancient', author: 'يوستينوس', work: 'مختصر التواريخ الفيليبية لتروغوس بومبيوس', ref: '18، 7؛ 19، 1', note: 'الماغونيون' },
      { type: 'ancient', author: 'هيرودوت', work: 'التواريخ', ref: '7، 167', note: 'هملقار في هيميرا' },
      { type: 'ancient', author: 'ديودوروس الصقلي', work: 'المكتبة التاريخية', note: 'زواج صدربعل الجميل الثاني' },
      { type: 'ancient', author: 'أبيانوس', work: 'ليبيكا', note: 'موت صدربعل بن جيسكو' },
      { type: 'ancient', author: 'بلينيوس الأكبر', work: 'التاريخ الطبيعي', ref: '2، 169', note: 'حِملقون' },
      { type: 'ancient', author: 'أفيينوس', work: 'السواحل البحرية', note: 'حِملقون' },
      { type: 'ancient', author: 'سيليوس إيتاليكوس', work: 'البونيقيات', note: 'باركاس، إيميلكي وابن حنبعل' },
      { type: 'ancient', author: 'مجهول المؤلف', work: 'رحلة حنون' }
    ]
  }
}

const c = computed(() => C[locale.value] || C.fr)

const visible = computed(() =>
  PEOPLE
    .filter(p => filter.value === 'all' || p.cats.includes(filter.value))
    .map(p => ({ ...p, ...c.value.people[p.id] }))
)

useHead(() => ({
  title: c.value.metaTitle,
  meta: [{ name: 'description', content: c.value.metaDesc }]
}))
</script>

<style scoped>
.hero-fig { background: #8E3720; min-height: clamp(360px, 38vw, 520px); }
.hero-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
.hero-phoen { font-size: 30px; color: var(--purple); }
.tree-title { margin-bottom: 36px; }
.node--anc { width: auto; min-width: 240px; max-width: 360px; background: var(--white); border: 1.5px dashed var(--ink); padding: 12px 20px; }
.node--anc .n-name { font-size: 16px; }
.stem--dashed { background: none; border-inline-start: 2px dashed var(--ink); width: 0; height: 22px; }
.root-couple { position: relative; }
.spouse--root { position: absolute; top: 50%; inset-inline-start: calc(100% + 10px); transform: translateY(-50%); width: 220px; margin-top: 0; }
.k-none { margin-top: 8px; font: 500 12px/1.35 var(--font-body); color: var(--muted); text-align: center; font-style: italic; }
.unknown { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 32px; margin-top: 40px; padding-top: 32px; border-top: 1px solid var(--sand); }
.unknown-head .kicker { margin-bottom: 10px; }
.unknown-rows .key { font-size: 17px; }
.unknown-rows .val { font-size: 15px; color: var(--muted); }


/* Arbre — bureau */
.tree { display: flex; flex-direction: column; align-items: center; }
.node {
  display: block;
  width: 100%;
  background: var(--paper);
  color: var(--ink);
  border-radius: 18px;
  padding: 16px;
  text-align: center;
}
a.node { transition: transform 0.2s, box-shadow 0.2s; }
a.node:hover { color: inherit; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(22, 19, 15, 0.1); }
.node--root { width: auto; background: var(--ink); color: var(--white); border-radius: 20px; padding: 18px 28px; }
.node--root:hover { color: var(--white) !important; }
.node--main { background: var(--purple); color: var(--white); }
.node--main:hover { color: var(--white) !important; }
.n-name { font: 800 18px/1.1 var(--font-display); }
.node--root .n-name { font-size: 24px; line-height: 1; }
.node--main .n-name { font-size: 22px; }
.n-meta { font: 500 12px/1.4 var(--font-body); color: var(--muted); margin-top: 6px; }
.node--root .n-meta { font-size: 13px; color: var(--on-dark); margin-top: 8px; }
.node--main .n-meta { color: var(--purple-soft); }
.stem { width: 2px; height: 28px; background: var(--ink); }
.bar { width: calc(100% * 5 / 6); height: 2px; background: var(--ink); }
.kids { width: 100%; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px; }
.kid-body { width: 100%; display: flex; flex-direction: column; align-items: center; }
.spouse {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  margin-top: 6px;
  padding: 10px 12px;
  border: 1.5px solid var(--sand);
  border-radius: 14px;
  text-align: start;
  color: var(--ink);
  font: 500 12px/1.35 var(--font-body);
}
a.spouse:hover { color: var(--ink); border-color: var(--purple); }
.spouse b { display: block; font: 800 14px/1.15 var(--font-display); }
.s-meta { display: block; color: var(--muted); margin-top: 2px; }
.ring { font: 700 16px/1 var(--font-body); color: var(--purple); margin-top: 1px; }
.drop--sm { height: 18px; }
.drop.is-uncertain { background: none; border-inline-start: 2px dashed var(--ink); width: 0; }
.node--gen3 { background: var(--white); border: 1.5px solid var(--ink); padding: 12px; }
.node--gen3 .n-name { font-size: 15px; }
.is-uncertain.node--gen3, .spouse.is-uncertain { border-style: dashed; }
.tree-note {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
  font: 400 13px/1.45 var(--font-body);
  color: var(--muted);
  max-width: 760px;
  align-self: flex-start;
}
.dash { flex: none; width: 28px; border-top: 2px dashed var(--ink); }
.kid { display: flex; flex-direction: column; align-items: center; }
.drop { width: 2px; height: 24px; background: var(--ink); }

.person.tile--ink, .person.tile--ink:hover { color: var(--white); }
.k-gold { color: var(--gold-light) !important; }
.p-short { display: none; }

@media (max-width: 1100px) {
  .kids { gap: 8px; }
  .n-name { font-size: 16px; }
  .spouse { padding: 8px 10px; }
}

/* Arbre — mobile : liste verticale avec ligne de rattachement */
@media (max-width: 900px) {
  .tree { align-items: stretch; }
  .node--root { text-align: start; }
  .stem, .bar { display: none; }
  .kids {
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
    padding-block-start: 12px;
    padding-inline-start: 22px;
    border-inline-start: 2px solid var(--ink);
    margin-inline-start: 18px;
  }
  .kid { flex-direction: row; align-items: center; }
  .drop { width: 18px; height: 2px; margin-inline-start: -22px; flex: none; }
  .kid > .drop { margin-top: 26px; align-self: flex-start; }
  .kid-body { align-items: stretch; }
  .kid-body .drop--sm { width: 2px; height: 14px; margin-inline-start: 20px; }
  .kid-body .drop--sm.is-uncertain { width: 0; }
  .node { text-align: start; }
  .node--anc { max-width: none; }
  .stem--dashed { margin-inline-start: 24px; }
  .root-couple { display: flex; flex-direction: column; gap: 6px; }
  .spouse--root { position: static; transform: none; width: 100%; }
  .k-none { text-align: start; }
  .unknown { grid-template-columns: minmax(0, 1fr); gap: 16px; }
}

@media (max-width: 640px) {

  /* Cartes compactes */
  .people .person {
    display: grid;
    grid-template-columns: 96px minmax(0, 1fr);
    gap: 14px;
    align-items: center;
    padding: 8px;
    border-radius: 22px;
  }
  .people .person > img { width: 96px; height: 96px; border-radius: 16px; }
  .people .card-body { padding: 0; }
  .people .kicker { display: none; }
  .people .h-card { font-size: 18px; margin-bottom: 4px; }
  .p-long { display: none; }
  .p-short { display: block; font: 500 13px/1.4 var(--font-body); }
}
</style>
