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
  { id: 'giscon', img: '/img/sophonisba.jpg', cats: ['gen', 'queen'], to: '/sophonisbe' },
  { id: 'elissa', img: '/img/guerin-dido.jpg', cats: ['queen'], to: '/didon' },
  { id: 'hannon', img: '/img/hanno-galley.png', cats: ['nav'], to: '/hannon' },
  { id: 'himilcon', img: '/img/punic-ship.jpg', cats: ['nav'] },
  { id: 'massinissa', img: '/img/massinissa.jpg', cats: ['ally'] },
  { id: 'hasdrubal-beau', img: '/img/wall-cartagena.jpg', cats: ['gen'] },
  { id: 'xanthippe', img: '/img/byrsa.jpg', cats: ['gen'] },
  { id: 'boetharque', img: '/img/ruins.jpg', cats: ['gen'], dark: true },
  { id: 'hannibal', img: '/img/hannibal-bust.jpg', cats: ['gen'], to: '/hannibal' },
  { id: 'magon-agro', img: '/img/dominus.jpg', cats: [], to: '/magon-agronome' }
]

const C = {
  fr: {
    metaTitle: 'Personnages — les Barca, les généraux, les navigateurs',
    metaDesc: "La famille Barca, les généraux, les navigateurs et les reines de Carthage : Hamilcar, Hannibal, Hasdrubal, Magon, Hannon, Himilcon, Élissa, Sophonisbe, Massinissa.",
    heroAlt: 'Hamilcar Barca',
    heroCap: 'Hamilcar Barca, le père',
    chip: 'Personnages · 15 figures, 8 biographies',
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
      giscon: { alt: 'Sophonisbe', role: 'Général & reine', name: 'Hasdrubal Giscon & Sophonisbe', text: "Il combat Scipion en Hispanie et en Afrique ; sa fille Sophonisbe (~235 – 203) épouse le roi numide Syphax et choisit le poison plutôt que la captivité romaine.", short: 'Le père et la reine numide' },
      elissa: { alt: 'Didon', role: 'Fondatrice · ~814', name: 'Élissa / Didon', text: 'Princesse de Tyr, elle fonde Carthage sur la colline de Byrsa.', short: 'Fondatrice · ~814' },
      hannon: { alt: 'Galère punique', role: 'Navigateur · Ve s.', name: 'Hannon', text: "Longe l'Afrique de l'Ouest avec 60 navires, selon le Périple qui lui est attribué.", short: "Le Périple vers l'Afrique de l'Ouest" },
      himilcon: { alt: 'Proue du navire punique de Marsala', role: 'Navigateur · Ve s.', name: 'Himilcon', text: "Remonte l'Atlantique vers le nord, sur la route de l'étain.", short: "La route de l'étain" },
      massinissa: { alt: 'Massinissa', role: 'Allié puis rival · 238 – 148', name: 'Massinissa', text: "Prince numide formé à Carthage, il passe dans le camp de Rome et décide de la bataille de Zama. Roi de Numidie pendant plus de cinquante ans, il grignote le territoire carthaginois.", short: 'Allié puis rival' },
      'hasdrubal-beau': { alt: 'Muraille punique de Carthagène', role: 'Général · ~270 – 221', name: 'Hasdrubal le Beau', text: "Gendre d'Hamilcar, il lui succède en Hispanie, fonde Carthagène et conclut avec Rome le traité de l'Èbre (226). Assassiné en 221.", short: "Fondateur de Carthagène" },
      xanthippe: { alt: 'Colline de Byrsa, Carthage', role: 'Mercenaire spartiate · 255', name: 'Xanthippe', text: "Engagé par Carthage, il réorganise l'armée et écrase Regulus près de Tunis en 255, sauvant la cité d'une invasion.", short: 'Vainqueur de Regulus, 255' },
      boetharque: { alt: 'Ruines de Carthage', role: 'Dernier chef · 146', name: 'Hasdrubal le Boétharque', text: 'Mène la défense de la ville pendant les trois ans du siège final.', short: 'Défend Carthage, 149–146' },
      hannibal: { alt: "Buste d'Hannibal", role: 'Général · 247 – 183', name: 'Hannibal Barca', text: 'Franchit les Alpes avec ses éléphants et écrase Rome à Cannes en 216 av. J.-C.', short: '247 – 183' },
      'magon-agro': { alt: "Mosaïque agricole, Carthage", role: 'Agronome', name: "Magon l'Agronome", text: "Auteur d'un traité d'agriculture en 28 livres, traduit en latin sur ordre du Sénat.", short: "Le père de l'agronomie" }
    },
    datesKicker: 'Repères',
    datesTitle: 'Six siècles de figures carthaginoises',
    dates: [
      { k: '~814', v: "Élissa, princesse de Tyr, fonde Carthage sur la colline de Byrsa : c'est la légende de la peau de bœuf découpée en lanières." },
      { k: '~500 ?', v: "Hannon longe la côte atlantique de l'Afrique avec 60 navires et 30 000 colons." },
      { k: '255', v: 'Le Spartiate Xanthippe, au service de Carthage, écrase le consul Regulus devant Tunis.' },
      { k: '247 – 241', v: "Hamilcar Barca mène la guérilla en Sicile, depuis l'Eryx, jusqu'à la fin de la première guerre punique." },
      { k: '241 – 238', v: 'Hamilcar écrase la révolte des mercenaires impayés.' },
      { k: '237', v: "Départ pour l'Hispanie ; Hannibal, 9 ans, jure de ne jamais être l'ami de Rome." },
      { k: '228 – 221', v: "Hamilcar meurt noyé en combattant les Ibères ; Hasdrubal le Beau fonde Carthagène puis est assassiné. Hannibal, 26 ans, prend le commandement." },
      { k: '218 – 216', v: "Les Alpes, la Trébie, Trasimène, Cannes. Magon Barca verse devant le Sénat de Carthage les anneaux d'or des chevaliers romains tués." },
      { k: '207', v: "Hasdrubal Barca est tué au Métaure ; les Romains jettent sa tête dans le camp d'Hannibal." },
      { k: '203', v: "Magon Barca, blessé en Ligurie, meurt en mer. Sophonisbe s'empoisonne." },
      { k: '202', v: "Zama : la cavalerie de Massinissa décide de la victoire de Scipion." },
      { k: '183', v: "Traqué par Rome, Hannibal s'empoisonne en Bithynie." },
      { k: '148 – 146', v: "Mort de Massinissa ; Hasdrubal le Boétharque défend Carthage jusqu'à la chute." }
    ]
  },
  en: {
    metaTitle: 'People — the Barcids, the generals, the navigators',
    metaDesc: "The Barca family, Carthage's generals, navigators and queens: Hamilcar, Hannibal, Hasdrubal, Mago, Hanno, Himilco, Elissa, Sophonisba, Masinissa.",
    heroAlt: 'Hamilcar Barca',
    heroCap: 'Hamilcar Barca, the father',
    chip: 'People · 15 figures, 8 biographies',
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
      giscon: { alt: 'Sophonisba', role: 'General & queen', name: 'Hasdrubal Gisco & Sophonisba', text: 'He fights Scipio in Hispania and Africa; his daughter Sophonisba (c. 235 – 203) marries the Numidian king Syphax and chooses poison over Roman captivity.', short: 'The father and the Numidian queen' },
      elissa: { alt: 'Dido', role: 'Founder · c. 814', name: 'Elissa / Dido', text: 'A princess of Tyre, she founds Carthage on the hill of Byrsa.', short: 'Founder · c. 814' },
      hannon: { alt: 'Punic galley', role: 'Navigator · 5th c.', name: 'Hanno', text: 'Sails along West Africa with 60 ships, according to the Periplus attributed to him.', short: 'The Periplus to West Africa' },
      himilcon: { alt: 'Bow of the Marsala Punic ship', role: 'Navigator · 5th c.', name: 'Himilco', text: 'Sails north up the Atlantic, along the tin route.', short: 'The tin route' },
      massinissa: { alt: 'Masinissa', role: 'Ally, then rival · 238 – 148', name: 'Masinissa', text: "A Numidian prince educated in Carthage, he goes over to Rome's side and decides the battle of Zama. King of Numidia for over fifty years, he nibbles away at Carthaginian territory.", short: 'Ally, then rival' },
      'hasdrubal-beau': { alt: 'Punic wall of Cartagena', role: 'General · c. 270 – 221', name: 'Hasdrubal the Fair', text: "Hamilcar's son-in-law, he succeeds him in Iberia, founds Cartagena and concludes the Ebro Treaty with Rome (226). Assassinated in 221.", short: 'Founder of Cartagena' },
      xanthippe: { alt: 'Byrsa hill, Carthage', role: 'Spartan mercenary · 255', name: 'Xanthippus', text: 'Hired by Carthage, he reorganises the army and crushes Regulus near Tunis in 255, saving the city from invasion.', short: 'Victor over Regulus, 255' },
      boetharque: { alt: 'Ruins of Carthage', role: 'Last leader · 146', name: 'Hasdrubal the Boetharch', text: 'Leads the defence of the city through the three years of the final siege.', short: 'Defends Carthage, 149–146' },
      hannibal: { alt: 'Bust of Hannibal', role: 'General · 247 – 183', name: 'Hannibal Barca', text: 'Crosses the Alps with his elephants and crushes Rome at Cannae in 216 BC.', short: '247 – 183' },
      'magon-agro': { alt: 'Farming mosaic, Carthage', role: 'Agronomist', name: 'Mago the Agronomist', text: 'Author of a 28-book treatise on agriculture, translated into Latin by order of the Senate.', short: 'The father of agronomy' }
    },
    datesKicker: 'Milestones',
    datesTitle: 'Six centuries of Carthaginian figures',
    dates: [
      { k: 'c. 814', v: 'Elissa, princess of Tyre, founds Carthage on the hill of Byrsa: the legend of the oxhide cut into strips.' },
      { k: 'c. 500?', v: 'Hanno sails along the Atlantic coast of Africa with 60 ships and 30,000 colonists.' },
      { k: '255', v: 'The Spartan Xanthippus, in Carthage’s service, crushes the consul Regulus before Tunis.' },
      { k: '247 – 241', v: 'Hamilcar Barca wages guerrilla war in Sicily, from Eryx, until the end of the First Punic War.' },
      { k: '241 – 238', v: 'Hamilcar crushes the revolt of the unpaid mercenaries.' },
      { k: '237', v: 'Departure for Iberia; Hannibal, aged 9, swears never to be a friend of Rome.' },
      { k: '228 – 221', v: 'Hamilcar drowns fighting the Iberians; Hasdrubal the Fair founds Cartagena and is then assassinated. Hannibal, 26, takes command.' },
      { k: '218 – 216', v: 'The Alps, the Trebia, Trasimene, Cannae. Mago Barca pours out before the Carthaginian Senate the gold rings of slain Roman knights.' },
      { k: '207', v: 'Hasdrubal Barca is killed at the Metaurus; the Romans throw his head into Hannibal’s camp.' },
      { k: '203', v: 'Mago Barca, wounded in Liguria, dies at sea. Sophonisba takes poison.' },
      { k: '202', v: 'Zama: Masinissa’s cavalry decides Scipio’s victory.' },
      { k: '183', v: 'Hunted by Rome, Hannibal takes poison in Bithynia.' },
      { k: '148 – 146', v: 'Death of Masinissa; Hasdrubal the Boetharch defends Carthage to the end.' }
    ]
  },
  ar: {
    metaTitle: 'الشخصيات — آل برقا والقادة والملاحون',
    metaDesc: 'أسرة برقا وقادة قرطاج وملاحوها وملكاتها: حملقار وحنبعل وصدربعل وماغون وحنون وحملكون وعليسة وصفنبعل وماسينيسا.',
    heroAlt: 'حملقار برقا',
    heroCap: 'حملقار برقا، الأب',
    chip: 'الشخصيات · 15 شخصية و8 سِيَر',
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
      maharbal: { alt: 'شيكل برقي', role: 'قائد الفرسان', name: 'مهربعل', text: '«أنت تعرف كيف تنتصر يا حنبعل، لكنك لا تعرف كيف تستثمر نصرك»، قالها له بعد كاناي بحسب تيتوس ليفيوس.', short: 'قائد الفرسان في كاناي' },
      'hasdrubal-cav': { alt: 'ربع شيكل برقي', role: 'قائد · كاناي', name: 'صدربعل (الفرسان)', text: 'يقود الفرسان الثقيلة التي تلتف حول الفيالق وتُحكم فخ كاناي.', short: 'يُحكم فخ كاناي' },
      giscon: { alt: 'صفنبعل', role: 'قائد وملكة', name: 'صدربعل جسكون وصفنبعل', text: 'يحارب سكيبيو في هسبانيا وإفريقيا؛ وتتزوج ابنته صفنبعل (نحو 235 – 203) الملك النوميدي سيفاكس، وتختار السم على الأسر الروماني.', short: 'الأب والملكة النوميدية' },
      elissa: { alt: 'ديدون', role: 'المؤسِّسة · نحو 814', name: 'عليسة / ديدون', text: 'أميرة من صور، أسست قرطاج على تل بيرصا.', short: 'المؤسِّسة · نحو 814' },
      hannon: { alt: 'سفينة بونيقية', role: 'ملاح · القرن الخامس', name: 'حنون', text: 'يبحر بمحاذاة غرب إفريقيا على رأس 60 سفينة، بحسب «الرحلة» المنسوبة إليه.', short: 'الرحلة إلى غرب إفريقيا' },
      himilcon: { alt: 'مقدمة سفينة مرسالة البونيقية', role: 'ملاح · القرن الخامس', name: 'حملكون', text: 'يصعد الأطلسي شمالًا على طريق القصدير.', short: 'طريق القصدير' },
      massinissa: { alt: 'ماسينيسا', role: 'حليف ثم خصم · 238 – 148', name: 'ماسينيسا', text: 'أمير نوميدي تربّى في قرطاج، ينحاز إلى روما ويحسم معركة زامة. ملك نوميديا أكثر من خمسين عامًا، قضم خلالها أراضي قرطاج.', short: 'حليف ثم خصم' },
      'hasdrubal-beau': { alt: 'السور البونيقي في قرطاجنة', role: 'قائد · نحو 270 – 221', name: 'صدربعل الجميل', text: 'صهر حملقار، يخلفه في إيبيريا، ويؤسس قرطاجنة، ويبرم مع روما معاهدة الإيبرو (226). اغتيل سنة 221.', short: 'مؤسس قرطاجنة' },
      xanthippe: { alt: 'تل بيرصا، قرطاج', role: 'مرتزق إسبرطي · 255', name: 'كسانثيبوس', text: 'استأجرته قرطاج فأعاد تنظيم الجيش وسحق ريغولوس قرب تونس سنة 255، منقذًا المدينة من الغزو.', short: 'قاهر ريغولوس، 255' },
      boetharque: { alt: 'أطلال قرطاج', role: 'آخر قائد · 146', name: 'صدربعل البويثارخ', text: 'يقود الدفاع عن المدينة طوال السنوات الثلاث للحصار الأخير.', short: 'يدافع عن قرطاج، 149–146' },
      hannibal: { alt: 'تمثال نصفي لحنبعل', role: 'قائد · 247 – 183', name: 'حنبعل برقا', text: 'يعبر الألب بفيلته ويسحق روما في كاناي سنة 216 ق.م.', short: '247 – 183' },
      'magon-agro': { alt: 'فسيفساء فلاحية، قرطاج', role: 'عالم فلاحة', name: 'ماغون الفلاحي', text: 'صاحب موسوعة في الفلاحة من 28 كتابًا، تُرجمت إلى اللاتينية بأمر من مجلس الشيوخ.', short: 'أبو علم الفلاحة' }
    },
    datesKicker: 'معالم',
    datesTitle: 'ستة قرون من الشخصيات القرطاجية',
    dates: [
      { k: 'نحو 814', v: 'عليسة، أميرة صور، تؤسس قرطاج على تل بيرصا: أسطورة جلد الثور المقطّع شرائط.' },
      { k: 'نحو 500؟', v: 'حنّون يبحر بمحاذاة الساحل الأطلسي لإفريقيا بستين سفينة وثلاثين ألف مستوطن.' },
      { k: '255', v: 'الإسبرطي كسانثيبوس، في خدمة قرطاج، يسحق القنصل ريغولوس أمام تونس.' },
      { k: '247 – 241', v: 'حملقار برقا يخوض حرب عصابات في صقلية انطلاقًا من إريكس حتى نهاية الحرب البونيقية الأولى.' },
      { k: '241 – 238', v: 'حملقار يسحق ثورة المرتزقة الذين لم يتقاضوا أجورهم.' },
      { k: '237', v: 'الرحيل إلى إيبيريا؛ حنبعل، ابن التاسعة، يقسم ألا يكون صديقًا لروما أبدًا.' },
      { k: '228 – 221', v: 'حملقار يغرق وهو يقاتل الإيبيريين؛ صدربعل الجميل يؤسس قرطاجنة ثم يُغتال. وحنبعل، ابن السادسة والعشرين، يتولى القيادة.' },
      { k: '218 – 216', v: 'الألب، تريبيا، ترازيمينو، كاناي. ماغون برقا ينثر أمام مجلس شيوخ قرطاج الخواتم الذهبية للفرسان الرومان القتلى.' },
      { k: '207', v: 'مقتل صدربعل برقا عند الميتاورو؛ الرومان يلقون رأسه في معسكر حنبعل.' },
      { k: '203', v: 'ماغون برقا، الجريح في ليغوريا، يموت في البحر. وصفنبعل تتجرع السم.' },
      { k: '202', v: 'زاما: فرسان ماسينيسا يحسمون انتصار سكيبيو.' },
      { k: '183', v: 'حنبعل، الذي طاردته روما، يتجرع السم في بيثينيا.' },
      { k: '148 – 146', v: 'وفاة ماسينيسا؛ صدربعل البويثارخ يدافع عن قرطاج حتى السقوط.' }
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
