<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--terra tile--stack tile--hero s-5">
        <span class="chip chip--glass">{{ c.chip }}</span>
        <div>
          <h1 class="h-display army-title">{{ c.title }}</h1>
          <p class="lede">{{ c.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-7">
        <img src="/img/zama.jpg" :alt="c.heroAlt">
        <figcaption>{{ c.heroCap }}</figcaption>
      </figure>
    </div>

    <!-- Unités -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.unitsTitle }}</h2>
        <NuxtLink :to="localePath('/guerres-puniques')" class="btn btn-outline">{{ c.warsCta }}</NuxtLink>
      </div>
    </section>
    <div class="cols cols-3">
      <template v-for="u in c.units" :key="u.name">
        <component
          :is="u.link ? NuxtLinkC : 'div'"
          v-bind="u.link ? { to: localePath(u.link) } : {}"
          class="tile"
          :class="[u.tone, { 'unit-img': u.img }]"
        >
          <img v-if="u.img" :src="u.img" :alt="u.alt" loading="lazy">
          <div :class="{ 'unit-txt': u.img }">
            <span class="kicker">{{ u.origin }}</span>
            <h3 class="h-card">{{ u.name }}</h3>
            <p class="body">{{ u.text }}</p>
            <span v-if="u.link" class="more">{{ c.more }}</span>
          </div>
        </component>
      </template>
    </div>

    <!-- Recrutement -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--paper tile--stack">
          <div>
            <span class="kicker">{{ c.recruitKicker }}</span>
            <h2 class="h-block block-title">{{ c.recruitTitle }}</h2>
            <p v-for="(p, i) in c.recruitParas" :key="i" class="body-lg para">{{ p }}</p>
          </div>
          <div class="chips">
            <span v-for="t in c.recruitTags" :key="t" class="chip chip--white">{{ t }}</span>
          </div>
        </div>
        <div class="tile tile--xl tile--terra tile--stack">
          <div>
            <span class="kicker">{{ c.xanKicker }}</span>
            <h2 class="h-block block-title">{{ c.xanTitle }}</h2>
            <p class="body-lg">{{ c.xanText }}</p>
          </div>
          <span class="chip chip--glass">{{ c.xanChip }}</span>
        </div>
      </div>
    </section>

    <!-- Effectifs de l'armée d'Hannibal -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <span class="kicker">{{ c.numbersKicker }}</span>
        <h2 class="h-block block-title">{{ c.numbersTitle }}</h2>
        <div class="rows" style="--row-key: 200px">
          <div v-for="r in c.numbers" :key="r.k">
            <div class="key">{{ r.k }}</div>
            <div class="val">{{ r.v }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Marine -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig navy-fig">
          <img src="/img/punic-ship.jpg" :alt="c.shipAlt" loading="lazy">
          <figcaption>{{ c.shipCap }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--navy tile--stack">
          <div>
            <span class="kicker">{{ c.navyKicker }}</span>
            <h2 class="h-block navy-title">{{ c.navyTitle }}</h2>
            <p class="body-lg">{{ c.navyText }}</p>
          </div>
          <div class="stats">
            <div v-for="s in c.stats" :key="s.n" class="stat">
              <div class="stat-n">{{ s.n }}</div>
              <p>{{ s.t }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Types de navires -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.shipsTitle }}</h2>
        <p>{{ c.shipsAside }}</p>
      </div>
    </section>
    <div class="cols cols-3">
      <figure class="card-img ship-fig">
        <img src="/img/hanno-galley.png" :alt="c.galleyAlt" loading="lazy">
        <figcaption class="card-body">
          <span class="kicker">{{ c.galleyKicker }}</span>
          <p>{{ c.galleyCap }}</p>
        </figcaption>
      </figure>
      <div v-for="s in c.ships" :key="s.name" class="tile tile--stack" :class="s.tone">
        <div>
          <span class="kicker">{{ s.k }}</span>
          <h3 class="h-card">{{ s.name }}</h3>
          <p class="body">{{ s.text }}</p>
        </div>
        <p class="src">{{ s.src }}</p>
      </div>
    </div>

    <!-- Périples -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--navy">
          <span class="kicker">{{ c.periplKicker }}</span>
          <h2 class="h-block block-title">{{ c.periplTitle }}</h2>
          <div class="rows peri-rows" style="--row-key: 150px">
            <div v-for="r in c.peripl" :key="r.k">
              <div class="key">{{ r.k }}</div>
              <div class="val">{{ r.v }}</div>
            </div>
          </div>
          <NuxtLink :to="localePath('/hannon')" class="chip chip--glass peri-link">{{ c.periplLink }}</NuxtLink>
        </div>
        <div class="tile tile--xl tile--paper tile--outline tile--stack">
          <div>
            <span class="kicker">{{ c.islandKicker }}</span>
            <h2 class="h-block block-title">{{ c.islandTitle }}</h2>
            <p class="body-lg">{{ c.islandText }}</p>
          </div>
          <p class="src">{{ c.islandSrc }}</p>
        </div>
      </div>
    </section>

    <!-- Commandement et armement -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.cmdKicker }}</span>
          <h2 class="h-block block-title">{{ c.cmdTitle }}</h2>
          <div class="rows" style="--row-key: 170px">
            <div v-for="r in c.cmd" :key="r.k">
              <div class="key">{{ r.k }}</div>
              <div class="val">{{ r.v }}</div>
            </div>
          </div>
        </div>
        <div class="tile tile--xl tile--sand">
          <span class="kicker">{{ c.armsKicker }}</span>
          <h2 class="h-block block-title">{{ c.armsTitle }}</h2>
          <div class="rows arms-rows" style="--row-key: 110px">
            <div v-for="r in c.arms" :key="r.k">
              <div class="key">{{ r.k }}</div>
              <div class="val">{{ r.v }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Techniques et manœuvres -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.tacticsTitle }}</h2>
        <NuxtLink :to="localePath('/tactiques')" class="btn btn-outline">{{ c.tacticsCta }}</NuxtLink>
      </div>
    </section>
    <div class="cols cols-3">
      <div v-for="t in c.landTactics" :key="t.title" class="tile tile--stack" :class="t.tone">
        <div>
          <span class="kicker">{{ t.kicker }}</span>
          <h3 class="h-card">{{ t.title }}</h3>
          <p class="body">{{ t.text }}</p>
        </div>
      </div>
    </div>
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <div class="tile tile--xl tile--navy">
          <span class="kicker">{{ c.seaKicker }}</span>
          <h2 class="h-block block-title">{{ c.seaTitle }}</h2>
          <svg class="man-svg" viewBox="0 0 600 250" role="img" :aria-label="c.svgLabel">
            <defs>
              <marker id="arm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="#E9C46A" />
              </marker>
            </defs>
            <g font-size="15" font-weight="700" fill="currentColor">
              <text x="150" y="24" text-anchor="middle">{{ c.svgDiek }}</text>
              <text x="450" y="24" text-anchor="middle">{{ c.svgPeri }}</text>
            </g>
            <line x1="300" y1="40" x2="300" y2="236" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="4 6" />
            <!-- Diekplous : ligne ennemie en haut, un navire traverse puis revient -->
            <g fill="#F2EDE4" fill-opacity="0.85">
              <rect v-for="x in [40, 100, 160, 220]" :key="'d' + x" :x="x" y="70" width="40" height="12" rx="6" />
            </g>
            <rect x="126" y="200" width="12" height="36" rx="6" fill="#E9C46A" />
            <path d="M132 196 L132 130 L150 60 Q160 34 180 46 L196 64" fill="none" stroke="#E9C46A" stroke-width="2.5" marker-end="url(#arm-arrow)" />
            <!-- Périplous : on déborde l'aile -->
            <g fill="#F2EDE4" fill-opacity="0.85">
              <rect v-for="x in [340, 400, 460]" :key="'p' + x" :x="x" y="70" width="40" height="12" rx="6" />
            </g>
            <rect x="530" y="200" width="12" height="36" rx="6" fill="#E9C46A" />
            <path d="M536 196 L536 120 Q540 60 520 50 L512 58" fill="none" stroke="#E9C46A" stroke-width="2.5" marker-end="url(#arm-arrow)" />
            <g font-size="12" fill="currentColor" fill-opacity="0.75">
              <text x="150" y="112" text-anchor="middle">{{ c.svgEnemy }}</text>
              <text x="420" y="112" text-anchor="middle">{{ c.svgEnemy }}</text>
            </g>
          </svg>
        </div>
        <div class="tile tile--xl">
          <div class="rows sea-rows" style="--row-key: 130px">
            <div v-for="r in c.sea" :key="r.k">
              <div class="key">{{ r.k }}</div>
              <div class="val">{{ r.v }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Héritage militaire -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.heritageTitle }}</h2>
      </div>
    </section>
    <div class="cols cols-3">
      <div v-for="h in c.heritage" :key="h.title" class="tile tile--stack" :class="h.tone">
        <div>
          <span class="kicker">{{ h.kicker }}</span>
          <h3 class="h-card">{{ h.title }}</h3>
          <p class="body">{{ h.text }}</p>
        </div>
      </div>
    </div>

    <!-- CTA carte -->
    <section class="sec">
      <NuxtLink :to="localePath('/carte')" class="tile tile--xl tile--ink cta">
        <div>
          <span class="kicker">{{ c.mapKicker }}</span>
          <h2 class="h-block">{{ c.mapCta }}</h2>
        </div>
        <span class="cta-arrow" aria-hidden="true">→</span>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
import { resolveComponent } from 'vue'

const NuxtLinkC = resolveComponent('NuxtLink')
const { locale, localePath } = useI18n()

const C = {
  fr: {
    metaTitle: "L'armée de Carthage — une armée de peuples, une flotte de géants",
    metaDesc: "Bataillon sacré, infanterie libyenne, cavalerie numide, frondeurs baléares, éléphants et la plus grande flotte de son temps : l'armée de Carthage.",
    chip: 'Carthage · Armée',
    title: "L'armée de Carthage",
    lede: "Des officiers carthaginois à la tête de soldats venus de tout l'Occident méditerranéen — et la plus grande flotte de son temps.",
    heroAlt: 'Bataille de Zama',
    heroCap: 'La bataille de Zama (202 av. J.-C.)',
    unitsTitle: 'Qui combattait pour Carthage ?',
    warsCta: 'Cannes et les guerres puniques →',
    more: 'En savoir plus →',
    units: [
      { tone: 'tile--purple', origin: 'Carthage', name: 'Le Bataillon sacré', text: "Environ 2 500 citoyens de l'élite, lourdement armés, selon Diodore. Les officiers sont carthaginois." },
      { origin: 'Tunisie actuelle', name: 'Infanterie libyenne', text: "Le cœur de l'armée : fantassins disciplinés, armés de la lance et du bouclier, rééquipés à Cannes avec les armes prises aux Romains." },
      { origin: 'Numidie', name: 'Cavalerie numide', text: 'Sans selle ni mors, légère et insaisissable : harcèlement, fausses fuites et retours brusques. La meilleure cavalerie de la Méditerranée.' },
      { img: '/img/slinger.jpg', alt: 'Frondeur baléare', origin: 'Îles Baléares', name: 'Frondeurs', text: "Entraînés dès l'enfance, ils portaient trois frondes pour tirer à différentes distances (Strabon) et lançaient pierres et balles de plomb." },
      { origin: 'Hispanie & Gaule', name: 'Ibères, Celtibères, Gaulois', text: "L'épée ibérique — Rome en tira son gladius hispaniensis — et la furie des Gaulois de Cisalpine, ralliés en Italie : le centre du croissant de Cannes." },
      { tone: 'tile--ink', img: '/img/coin-elephant.jpg', alt: 'Éléphant sur shekel', origin: 'Afrique du Nord', name: 'Éléphants', text: 'Arme de choc et de terreur ; 80 à Zama selon Polybe.', link: '/elephants' }
    ],
    shipAlt: 'Proue du navire punique de Marsala',
    shipCap: 'Navire punique de Marsala, IIIe s. av. J.-C.',
    navyKicker: 'La marine',
    navyTitle: 'Maîtres de la mer',
    navyText: "Les navires puniques étaient construits en série : les pièces portaient des lettres de montage, comme l'a montré l'épave de Marsala. Rome copia un navire carthaginois échoué pour bâtir sa première flotte.",
    stats: [
      { n: '220', t: 'loges du port circulaire (Appien)' },
      { n: '~300', t: 'rameurs par quinquérème' },
      { n: '10', t: 'navires autorisés après 201' }
    ],
    recruitKicker: 'Recrutement',
    recruitTitle: 'Une armée de contrats et d’alliances',
    recruitParas: [
      "Carthage, cité de marchands peu nombreuse, ne levait pas de grandes armées de citoyens. Elle combinait trois ressources : les Libyens de son territoire africain, astreints au service ; les contingents de rois et chefs alliés, numides surtout ; et des mercenaires engagés contre solde en Hispanie, en Gaule, aux Baléares, en Grèce ou en Campanie.",
      "Les généraux et les officiers étaient carthaginois. Les citoyens servaient surtout dans la flotte et ne prenaient les armes en masse qu’en cas de danger extrême — contre Agathocle en 310, contre Regulus en 256-255, pendant le siège final de 149-146.",
      "Ce système avait sa faiblesse : en 241, les mercenaires revenus de Sicile et mal payés se révoltèrent. La guerre des Mercenaires (241-238) faillit emporter Carthage, avant qu’Hamilcar Barca ne l’écrase."
    ],
    recruitTags: ['Libyens', 'Alliés numides', 'Mercenaires', 'Officiers carthaginois'],
    xanKicker: 'Première guerre punique · 255',
    xanTitle: 'Xanthippe le Spartiate',
    xanText: "Mercenaire spartiate engagé par Carthage alors que le consul Regulus campe devant Tunis. Il réorganise l’armée, fait combattre cavalerie et éléphants en plaine et écrase les légions : Regulus est fait prisonnier, Carthage est sauvée.",
    xanChip: 'Bataille de Tunis (Bagradas), 255 av. J.-C.',
    numbersKicker: 'Selon Polybe',
    numbersTitle: 'L’armée d’Hannibal en chiffres',
    numbers: [
      { k: 'Printemps 218', v: 'Départ de Carthagène avec 90 000 fantassins et 12 000 cavaliers.' },
      { k: "Après l'Èbre", v: 'Garnisons laissées en Hispanie : il franchit les Pyrénées avec 50 000 fantassins et 9 000 cavaliers ; 37 éléphants passent le Rhône.' },
      { k: 'Automne 218', v: 'Arrivée en Italie après les Alpes : 12 000 Africains, 8 000 Ibères et 6 000 cavaliers, chiffres gravés par Hannibal lui-même au cap Lacinium.' },
      { k: 'Cannes, 216', v: 'Environ 40 000 fantassins et 10 000 cavaliers face à quelque 80 000 Romains et alliés.' },
      { k: 'Zama, 202', v: '80 éléphants en première ligne, puis mercenaires, Libyens et Carthaginois, et les vétérans d’Italie en réserve.' }
    ],
    shipsTitle: 'Les navires de Carthage',
    shipsAside: "Flotte de guerre et flotte marchande servaient un même but : tenir les routes du commerce (Lancel).",
    galleyAlt: 'Galères phéniciennes, dessin d’après un relief de Ninive',
    galleyKicker: 'L’héritage phénicien',
    galleyCap: "Galères et navires phéniciens, dessinés d'après un relief assyrien de Ninive : Carthage hérite de ce savoir-faire naval.",
    ships: [
      { k: 'Dès le VIe s. av. J.-C.', name: 'La trirème', text: "Trois niveaux de rameurs superposés et un éperon à la proue : le navire de ligne classique, avec environ 200 hommes à bord, dont quelque 170 rameurs.", src: 'Lancel, Carthage, 1992' },
      { k: 'IVe s. av. J.-C.', name: 'La quadrirème', text: "Quatre rameurs par section de nage, pour un navire plus lourd et plus stable. Pline, citant Aristote, en attribue l'invention aux Carthaginois.", src: 'Pline, Histoire naturelle, VII, 207' },
      { tone: 'tile--navy', k: 'Le navire des guerres puniques', name: 'La quinquérème', text: "Née à Syracuse vers 399 sous Denys l'Ancien, elle devient le vaisseau de ligne des guerres contre Rome : environ 300 rameurs et 120 soldats de marine, selon Polybe.", src: 'Diodore, XIV, 41-42 · Polybe, I, 26' },
      { k: 'Marine marchande', name: 'Les gauloi', text: "Les Grecs appelaient gaulos le navire rond des Phéniciens : coque large, voile carrée, peu de rames. Ces cargos transportaient aussi vivres et matériel pour les flottes de guerre.", src: 'Hérodote, III, 136' },
      { tone: 'tile--terra', k: 'Petites embarcations', name: 'Les hippoi', text: "Des bateaux à proue sculptée en tête de cheval — d'où leur nom grec, « chevaux ». Selon Strabon, les pêcheurs modestes de Gadès s'en servaient pour pêcher le long de la Maurétanie, jusqu'au fleuve Lixus.", src: 'Strabon, Géographie, II, 3, 4' }
    ],
    periplKicker: 'Explorations',
    periplTitle: 'Les périples',
    peripl: [
      { k: 'Gibraltar', v: "Dès l'origine, la flotte punique protège les routes commerciales et en garde le secret : tenir le détroit, c'est fermer l'Atlantique aux concurrents grecs, phocéens en particulier." },
      { k: 'Hannon', v: "Une flotte part longer la côte atlantique de l'Afrique. Certains la conduisent jusqu'au golfe de Guinée, d'autres beaucoup moins loin : la portée du voyage reste débattue. Le récit grec traduit probablement une inscription punique exposée dans un temple (Hours-Miédan)." },
      { k: 'Himilcon', v: "Cap au nord, au-delà de Gadès, sur la route de l'étain des îles Cassitérides, en direction des îles Britanniques (Pline, Aviénus)." },
      { k: 'Vers 600 av. J.-C.', v: "Hérodote rapporte que des marins phéniciens au service du pharaon Néchao II auraient fait le tour de l'Afrique en trois ans : la tradition d'audace dont Carthage est l'héritière (Hérodote, IV, 42)." }
    ],
    periplLink: 'Hannon le Navigateur →',
    islandKicker: 'Une légende antique',
    islandTitle: "L'île interdite",
    islandText: "Loin au-delà des Colonnes d'Hercule, des Carthaginois auraient trouvé une île déserte, boisée, fertile et traversée de rivières navigables. Beaucoup la fréquentèrent, certains s'y fixèrent. Redoutant qu'elle n'attire les étrangers et n'échappe à la cité, les dirigeants auraient interdit d'y naviguer sous peine de mort et supprimé ceux qui y vivaient, pour que nul n'en parle. Récit invérifiable, il dit surtout la réputation de secret des marins puniques.",
    islandSrc: 'Source : De mirabilibus auscultationibus, 84 — recueil attribué à tort à Aristote',
    cmdKicker: 'Recrutement et commandement',
    cmdTitle: 'Qui commandait ?',
    cmd: [
      { k: 'Les généraux', v: "Issus des grandes familles, ils étaient désignés par l'assemblée du peuple selon Diodore (XXV, 8). La hiérarchie reste mal connue ; le titre de général correspondrait au punique rab." },
      { k: 'La sanction', v: "La cité pardonnait mal l'échec : les textes citent de nombreux généraux vaincus crucifiés ou exécutés (Dridi)." },
      { k: 'Un cliché à nuancer', v: "Dès l'Antiquité, on a imputé la défaite de Carthage à ses mercenaires et au peu d'ardeur de ses citoyens. C'est oublier que la marine de guerre reposait sur les citoyens, et que toute la population se battit lors des derniers combats." },
      { k: 'La colonne vertébrale', v: "Pour l'historien Khaled Melliti, le noyau stable de l'infanterie fut toujours formé des Libyens de l'intérieur, puis des Ibères de l'Espagne barcide, complétés par les cités phéniciennes d'Afrique comme Utique ou Hadrumète : ils encadraient mercenaires volatils et jeunes recrues." }
    ],
    armsKicker: 'Armement',
    armsTitle: 'Équipements et unités',
    arms: [
      { k: 'Citoyens', v: "Fantassins armés de la lance et de l'épée (Dridi)." },
      { k: 'Libyens', v: 'Unités légères : javelots, poignards et boucliers de cuir.' },
      { k: 'Ibères', v: 'Bouclier et falcata, une épée courte à lame recourbée.' },
      { k: 'Phalange', v: "Infanterie lourde rangée à la macédonienne ; on ignore si la longue pique, la sarisse, y était employée." },
      { k: 'Chars', v: 'Sans doute hérités d’une ancienne tradition libyenne.' },
      { k: 'Éléphants', v: "Peu nombreux et adoptés tard, sans doute après la guerre de Pyrrhus en Italie. Probablement une petite race d'éléphant de forêt d'Afrique (hypothèse de Philippe Leveau) ; certains cornacs auraient été indiens." }
    ],
    tacticsTitle: 'Techniques et manœuvres',
    tacticsCta: 'Les tactiques en détail →',
    landTactics: [
      { kicker: 'Héritage macédonien', title: 'Phalange et camps', text: "Carthage emprunte au monde grec et macédonien l'ordre en phalange, la disposition de l'armée en campagne et l'organisation des camps (Dridi)." },
      { tone: 'tile--purple', kicker: 'Les innovations d’Hannibal', title: 'Cavalerie et enveloppement', text: "La cavalerie devient une arme décisive ; l'adversaire est enveloppé à Cannes (216) ; l'embuscade du lac Trasimène (217) compense l'infériorité numérique." },
      { tone: 'tile--terra', kicker: 'Poliorcétique', title: "L'art du siège", text: "Tours de siège, béliers, balistes et catapultes : en 409, l'armée d'Hannibal le Magonide prend Sélinonte à l'aide de hautes tours mobiles et de béliers (Diodore, XIII, 54)." }
    ],
    seaKicker: 'La guerre navale antique',
    seaTitle: 'Éperonner, percer, déborder',
    svgLabel: "Schéma : au diekplous, un navire traverse la ligne ennemie puis revient la frapper ; au périplous, il contourne son aile.",
    svgDiek: 'Diekplous',
    svgPeri: 'Périplous',
    svgEnemy: 'ligne ennemie',
    sea: [
      { k: 'L’éperon', v: "On coule l'adversaire en le frappant de flanc ou par l'arrière avec l'éperon : tout dépend de la vitesse et de l'entraînement des rameurs." },
      { k: 'Diekplous', v: "Se glisser par un intervalle de la ligne ennemie, puis virer pour éperonner les navires par la poupe." },
      { k: 'Périplous', v: "Déborder une aile adverse pour la prendre de flanc — d'où l'intérêt d'aligner une ligne plus longue que celle de l'ennemi." },
      { k: '260 · Mylae', v: "Pour neutraliser l'habileté punique, Rome invente le « corbeau », passerelle d'abordage qui change la bataille navale en combat d'infanterie : première victoire navale romaine." },
      { k: '249 · Drépane', v: "L'amiral Adherbal, avec des navires plus rapides et des équipages aguerris, accule la flotte romaine contre la côte et capture 93 navires : la grande victoire navale carthaginoise de la guerre (Polybe, I, 49-51)." }
    ],
    heritageTitle: 'Héritage militaire',
    heritage: [
      { kicker: 'Armes combinées', title: 'Chaque peuple à sa place', text: 'Cavaliers numides pour la poursuite, frondeurs baléares pour le tir, Libyens et Ibères pour la ligne : Hannibal fit de cette diversité un instrument tactique.', tone: 'tile--purple' },
      { kicker: 'Cannes', title: 'Le modèle de l’enveloppement', text: "Le double enveloppement de 216 est étudié dans les écoles militaires jusqu'à l'époque moderne ; Schlieffen en fit le cœur de sa doctrine." },
      { kicker: 'Fidélité', title: 'Seize ans sans mutinerie', text: "Selon Polybe, l'armée multinationale d'Hannibal ne se mutina jamais pendant seize ans de guerre en Italie, malgré les privations.", tone: 'tile--navy' }
    ],
    mapKicker: "Campagne d'Hannibal · 219–202",
    mapCta: 'Voir la campagne sur la carte animée'
  },
  en: {
    metaTitle: "Carthage's army — an army of peoples, a fleet of giants",
    metaDesc: "Sacred Band, Libyan infantry, Numidian cavalry, Balearic slingers, elephants and the largest fleet of its day: the army of Carthage.",
    chip: 'Carthage · Army',
    title: 'The army of Carthage',
    lede: 'Carthaginian officers leading soldiers from across the western Mediterranean — and the largest fleet of its day.',
    heroAlt: 'Battle of Zama',
    heroCap: 'The Battle of Zama (202 BC)',
    unitsTitle: 'Who fought for Carthage?',
    warsCta: 'Cannae and the Punic Wars →',
    more: 'Learn more →',
    units: [
      { tone: 'tile--purple', origin: 'Carthage', name: 'The Sacred Band', text: 'Some 2,500 elite citizens, heavily armed, according to Diodorus. The officers were Carthaginian.' },
      { origin: 'Present-day Tunisia', name: 'Libyan infantry', text: 'The core of the army: disciplined foot soldiers with spear and shield, re-equipped at Cannae with weapons taken from the Romans.' },
      { origin: 'Numidia', name: 'Numidian cavalry', text: 'No saddle, no bit, light and elusive: harassment, feigned flight and sudden return. The finest cavalry in the Mediterranean.' },
      { img: '/img/slinger.jpg', alt: 'Balearic slinger', origin: 'Balearic Islands', name: 'Slingers', text: 'Trained from childhood, they carried three slings for different ranges (Strabo) and hurled stones and lead shot.' },
      { origin: 'Iberia & Gaul', name: 'Iberians, Celtiberians, Gauls', text: 'The Iberian sword — Rome adopted it as the gladius hispaniensis — and the fury of the Cisalpine Gauls who joined in Italy: the centre of the crescent at Cannae.' },
      { tone: 'tile--ink', img: '/img/coin-elephant.jpg', alt: 'Elephant on a shekel', origin: 'North Africa', name: 'Elephants', text: 'A weapon of shock and terror; 80 at Zama according to Polybius.', link: '/elephants' }
    ],
    shipAlt: 'Bow of the Marsala Punic ship',
    shipCap: 'The Marsala Punic ship, 3rd c. BC',
    navyKicker: 'The navy',
    navyTitle: 'Masters of the sea',
    navyText: 'Punic ships were built in series: the parts bore assembly letters, as the Marsala wreck revealed. Rome copied a stranded Carthaginian ship to build its first fleet.',
    stats: [
      { n: '220', t: 'ship sheds in the circular harbour (Appian)' },
      { n: '~300', t: 'rowers per quinquereme' },
      { n: '10', t: 'ships allowed after 201' }
    ],
    recruitKicker: 'Recruitment',
    recruitTitle: 'An army of contracts and alliances',
    recruitParas: [
      'Carthage, a trading city with few citizens, did not raise large citizen armies. It combined three resources: the Libyans of its African territory, liable to service; contingents from allied kings and chiefs, above all Numidians; and mercenaries hired for pay in Iberia, Gaul, the Balearics, Greece and Campania.',
      'Generals and officers were Carthaginian. Citizens served mainly in the fleet and only took up arms en masse in extreme danger — against Agathocles in 310, against Regulus in 256–255, during the final siege of 149–146.',
      'The system had its weakness: in 241 the mercenaries back from Sicily, poorly paid, rose in revolt. The Mercenary War (241–238) almost destroyed Carthage before Hamilcar Barca crushed it.'
    ],
    recruitTags: ['Libyans', 'Numidian allies', 'Mercenaries', 'Carthaginian officers'],
    xanKicker: 'First Punic War · 255',
    xanTitle: 'Xanthippus the Spartan',
    xanText: 'A Spartan mercenary hired by Carthage while the consul Regulus was encamped before Tunis. He reorganised the army, fought with cavalry and elephants on open ground and crushed the legions: Regulus was captured and Carthage saved.',
    xanChip: 'Battle of Tunis (Bagradas), 255 BC',
    numbersKicker: 'According to Polybius',
    numbersTitle: "Hannibal's army in numbers",
    numbers: [
      { k: 'Spring 218', v: 'Leaves Carthago Nova with 90,000 infantry and 12,000 cavalry.' },
      { k: 'After the Ebro', v: 'Leaving garrisons in Iberia, he crosses the Pyrenees with 50,000 infantry and 9,000 cavalry; 37 elephants cross the Rhône.' },
      { k: 'Autumn 218', v: 'Arrives in Italy after the Alps: 12,000 Africans, 8,000 Iberians and 6,000 cavalry — figures Hannibal himself had inscribed at Cape Lacinium.' },
      { k: 'Cannae, 216', v: 'About 40,000 infantry and 10,000 cavalry against some 80,000 Romans and allies.' },
      { k: 'Zama, 202', v: "80 elephants in the front line, then mercenaries, Libyans and Carthaginians, with the veterans of Italy in reserve." }
    ],
    shipsTitle: 'The ships of Carthage',
    shipsAside: 'War fleet and merchant fleet served one aim: holding the trade routes (Lancel).',
    galleyAlt: 'Phoenician galleys, drawing after a relief from Nineveh',
    galleyKicker: 'The Phoenician legacy',
    galleyCap: 'Phoenician galleys and ships, drawn after an Assyrian relief from Nineveh: Carthage inherited this naval know-how.',
    ships: [
      { k: 'From the 6th c. BC', name: 'The trireme', text: 'Three banks of oars stacked one above the other and a ram at the bow: the classic ship of the line, with some 200 men aboard, about 170 of them rowers.', src: 'Lancel, Carthage, 1992' },
      { k: '4th c. BC', name: 'The quadrireme', text: 'Four rowers per rowing unit, for a heavier, steadier ship. Pliny, citing Aristotle, credits the Carthaginians with its invention.', src: 'Pliny, Natural History, VII, 207' },
      { tone: 'tile--navy', k: 'The ship of the Punic Wars', name: 'The quinquereme', text: 'Born in Syracuse around 399 under Dionysius I, it became the ship of the line in the wars against Rome: about 300 rowers and 120 marines, according to Polybius.', src: 'Diodorus, XIV, 41-42 · Polybius, I, 26' },
      { k: 'Merchant fleet', name: 'The gauloi', text: 'The Greeks called the round Phoenician ship a gaulos: broad hull, square sail, few oars. These freighters also carried supplies and equipment for the war fleets.', src: 'Herodotus, III, 136' },
      { tone: 'tile--terra', k: 'Small craft', name: 'The hippoi', text: 'Boats with a bow carved as a horse’s head — hence their Greek name, "horses". According to Strabo, the humbler fishermen of Gades used them to fish along Mauretania as far as the river Lixus.', src: 'Strabo, Geography, II, 3, 4' }
    ],
    periplKicker: 'Explorations',
    periplTitle: 'The voyages',
    peripl: [
      { k: 'Gibraltar', v: 'From the start, the Punic fleet protected the trade routes and kept them secret: holding the strait meant closing the Atlantic to Greek rivals, the Phocaeans above all.' },
      { k: 'Hanno', v: 'A fleet sailed along the Atlantic coast of Africa. Some take it as far as the Gulf of Guinea, others much less far: the reach of the voyage is still debated. The Greek account probably translates a Punic inscription displayed in a temple (Hours-Miédan).' },
      { k: 'Himilco', v: 'Heading north beyond Gades, on the tin route to the Cassiterides, towards the British Isles (Pliny, Avienus).' },
      { k: 'c. 600 BC', v: 'Herodotus reports that Phoenician sailors in the service of Pharaoh Necho II sailed around Africa in three years: the tradition of daring that Carthage inherited (Herodotus, IV, 42).' }
    ],
    periplLink: 'Hanno the Navigator →',
    islandKicker: 'An ancient legend',
    islandTitle: 'The forbidden island',
    islandText: 'Far beyond the Pillars of Hercules, Carthaginians are said to have found an uninhabited island, wooded, fertile and crossed by navigable rivers. Many went there, some settled. Fearing it would draw foreigners and slip from the city’s grasp, the leaders reportedly banned sailing there on pain of death and did away with those living there, so that no one would tell. Unverifiable, the story mostly reflects the Punic sailors’ reputation for secrecy.',
    islandSrc: 'Source: On Marvellous Things Heard, 84 — a collection wrongly attributed to Aristotle',
    cmdKicker: 'Recruitment and command',
    cmdTitle: 'Who was in command?',
    cmd: [
      { k: 'The generals', v: 'Drawn from the great families, they were appointed by the popular assembly according to Diodorus (XXV, 8). The hierarchy is poorly known; the title of general seems to match the Punic rab.' },
      { k: 'The penalty', v: 'The city was unforgiving of failure: the texts cite many defeated generals crucified or put to death (Dridi).' },
      { k: 'A cliché to qualify', v: 'Since antiquity, Carthage’s defeat has been blamed on its mercenaries and on the lack of zeal of its citizens. This forgets that the war fleet relied on citizens, and that the whole population fought in the last battles.' },
      { k: 'The backbone', v: 'For the historian Khaled Melliti, the stable core of the infantry was always the Libyans of the interior, later the Iberians of Barcid Spain, supplemented by the Phoenician cities of Africa such as Utica or Hadrumetum: they framed volatile mercenaries and raw recruits.' }
    ],
    armsKicker: 'Weapons',
    armsTitle: 'Equipment and units',
    arms: [
      { k: 'Citizens', v: 'Foot soldiers armed with spear and sword (Dridi).' },
      { k: 'Libyans', v: 'Light units: javelins, daggers and leather shields.' },
      { k: 'Iberians', v: 'Shield and falcata, a short sword with a curved blade.' },
      { k: 'Phalanx', v: 'Heavy infantry drawn up Macedonian-style; whether the long pike, the sarissa, was used is unknown.' },
      { k: 'Chariots', v: 'Probably inherited from an old Libyan tradition.' },
      { k: 'Elephants', v: 'Few in number and adopted late, probably after Pyrrhus’ war in Italy. Most likely a small breed of African forest elephant (Philippe Leveau’s hypothesis); some mahouts may have been Indian.' }
    ],
    tacticsTitle: 'Techniques and manoeuvres',
    tacticsCta: 'Tactics in detail →',
    landTactics: [
      { kicker: 'Macedonian legacy', title: 'Phalanx and camps', text: 'From the Greek and Macedonian world Carthage borrowed the phalanx, the order of march and the layout of camps (Dridi).' },
      { tone: 'tile--purple', kicker: 'Hannibal’s innovations', title: 'Cavalry and envelopment', text: 'Cavalry became a decisive arm; the enemy was enveloped at Cannae (216); the ambush at Lake Trasimene (217) made up for inferior numbers.' },
      { tone: 'tile--terra', kicker: 'Poliorcetics', title: 'The art of the siege', text: 'Siege towers, rams, ballistae and catapults: in 409 the army of Hannibal the Magonid took Selinus with tall mobile towers and rams (Diodorus, XIII, 54).' }
    ],
    seaKicker: 'Ancient naval warfare',
    seaTitle: 'Ram, break through, outflank',
    svgLabel: 'Diagram: in the diekplous a ship passes through the enemy line and turns to strike it; in the periplous it goes round its wing.',
    svgDiek: 'Diekplous',
    svgPeri: 'Periplous',
    svgEnemy: 'enemy line',
    sea: [
      { k: 'The ram', v: 'You sank an enemy by ramming it in the side or stern: everything depended on speed and well-trained rowers.' },
      { k: 'Diekplous', v: 'Slip through a gap in the enemy line, then turn to ram the ships from the stern.' },
      { k: 'Periplous', v: 'Outflank an enemy wing to take it from the side — hence the value of a line longer than the enemy’s.' },
      { k: '260 · Mylae', v: 'To cancel out Punic seamanship, Rome invented the "raven" (corvus), a boarding bridge that turned sea battle into infantry combat: Rome’s first naval victory.' },
      { k: '249 · Drepana', v: 'Admiral Adherbal, with faster ships and seasoned crews, pinned the Roman fleet against the shore and captured 93 ships: Carthage’s great naval victory of the war (Polybius, I, 49-51).' }
    ],
    heritageTitle: 'Military legacy',
    heritage: [
      { kicker: 'Combined arms', title: 'Each people in its place', text: 'Numidian horsemen for pursuit, Balearic slingers for missile fire, Libyans and Iberians for the line: Hannibal turned this diversity into a tactical instrument.', tone: 'tile--purple' },
      { kicker: 'Cannae', title: 'The model of envelopment', text: 'The double envelopment of 216 has been studied in military schools into modern times; Schlieffen made it the heart of his doctrine.' },
      { kicker: 'Loyalty', title: 'Sixteen years without mutiny', text: "According to Polybius, Hannibal's multinational army never mutinied during sixteen years of war in Italy, despite hardship.", tone: 'tile--navy' }
    ],
    mapKicker: "Hannibal's campaign · 219–202",
    mapCta: 'See the campaign on the animated map'
  },
  ar: {
    metaTitle: 'جيش قرطاج — جيش من الشعوب وأسطول من العمالقة',
    metaDesc: 'الكتيبة المقدسة والمشاة الليبيون والفرسان النوميديون والمقلاعيون البلياريون والفيلة وأكبر أسطول في عصره: جيش قرطاج.',
    chip: 'قرطاج · الجيش',
    title: 'جيش قرطاج',
    lede: 'ضباط قرطاجيون على رأس جنود قدموا من كامل غرب البحر الأبيض المتوسط — وأكبر أسطول في عصره.',
    heroAlt: 'معركة زاما',
    heroCap: 'معركة زاما (202 ق.م)',
    unitsTitle: 'من كان يقاتل من أجل قرطاج؟',
    warsCta: 'كاناي والحروب البونيقية ←',
    more: 'اعرف المزيد ←',
    units: [
      { tone: 'tile--purple', origin: 'قرطاج', name: 'الكتيبة المقدسة', text: 'نحو 2500 مواطن من النخبة، مدججين بالسلاح، حسب ديودور. وكان الضباط قرطاجيين.' },
      { origin: 'تونس الحالية', name: 'المشاة الليبيون', text: 'قلب الجيش: مشاة منضبطون بالرمح والترس، تسلّحوا في كاناي بالأسلحة التي غنموها من الرومان.' },
      { origin: 'نوميديا', name: 'الفرسان النوميديون', text: 'بلا سرج ولا لجام، خفاف يصعب الإمساك بهم: مناوشة وتظاهر بالفرار ثم كرّ مباغت. أفضل فرسان البحر الأبيض المتوسط.' },
      { img: '/img/slinger.jpg', alt: 'مقلاعي بلياري', origin: 'جزر البليار', name: 'رماة المقلاع', text: 'تدرّبوا منذ الطفولة، وحملوا ثلاثة مقاليع للرمي على مسافات مختلفة (سترابون)، فرموا الحجارة وكرات الرصاص.' },
      { origin: 'إيبيريا وبلاد الغال', name: 'الإيبيريون والسلتيبيريون والغاليون', text: 'السيف الإيبيري — الذي اقتبست منه روما «السيف الهسباني» — وبأس غاليي إيطاليا الشمالية الذين التحقوا بحنبعل: وسط الهلال في كاناي.' },
      { tone: 'tile--ink', img: '/img/coin-elephant.jpg', alt: 'فيل على شيقل', origin: 'شمال إفريقيا', name: 'الفيلة', text: 'سلاح صدمة ورعب؛ 80 فيلًا في زاما حسب بوليبيوس.', link: '/elephants' }
    ],
    shipAlt: 'مقدمة السفينة البونيقية في مرسالا',
    shipCap: 'السفينة البونيقية في مرسالا، القرن الثالث ق.م',
    navyKicker: 'البحرية',
    navyTitle: 'سادة البحر',
    navyText: 'كانت السفن البونيقية تُبنى بالجملة: حملت قطعها حروف تركيب، كما كشف حطام مرسالا. ونسخت روما سفينة قرطاجية جانحة لتبني أول أسطول لها.',
    stats: [
      { n: '220', t: 'حوضًا في الميناء الدائري (أبيان)' },
      { n: '~300', t: 'مجدّف في كل سفينة خماسية' },
      { n: '10', t: 'سفن مسموح بها بعد 201' }
    ],
    recruitKicker: 'التجنيد',
    recruitTitle: 'جيش من العقود والتحالفات',
    recruitParas: [
      'لم تكن قرطاج، مدينة التجار القليلة المواطنين، تحشد جيوشًا كبيرة من مواطنيها. بل جمعت بين ثلاثة موارد: الليبيين في إقليمها الإفريقي الملزمين بالخدمة، وفرق الملوك والزعماء الحلفاء ولا سيما النوميديين، والمرتزقة المستأجرين بالأجر من إيبيريا وبلاد الغال وجزر البليار واليونان وكمبانيا.',
      'كان القادة والضباط قرطاجيين. وخدم المواطنون أساسًا في الأسطول، ولم يحملوا السلاح بأعداد كبيرة إلا عند الخطر الداهم — ضد أغاثوكليس سنة 310، وضد ريغولوس في 256–255، وأثناء الحصار الأخير في 149–146.',
      'وكان لهذا النظام ضعفه: ففي 241 ثار المرتزقة العائدون من صقلية لأنهم لم يتقاضوا أجورهم. وكادت حرب المرتزقة (241–238) تقضي على قرطاج قبل أن يسحقها حملقار برقا.'
    ],
    recruitTags: ['الليبيون', 'الحلفاء النوميديون', 'المرتزقة', 'ضباط قرطاجيون'],
    xanKicker: 'الحرب البونيقية الأولى · 255',
    xanTitle: 'كسانثيبوس الإسبرطي',
    xanText: 'مرتزق إسبرطي استأجرته قرطاج حين كان القنصل ريغولوس معسكرًا أمام تونس. أعاد تنظيم الجيش، وقاتل بالفرسان والفيلة في السهل، فسحق الفيالق: أُسر ريغولوس ونجت قرطاج.',
    xanChip: 'معركة تونس (مجردة)، 255 ق.م',
    numbersKicker: 'بحسب بوليبيوس',
    numbersTitle: 'جيش حنبعل بالأرقام',
    numbers: [
      { k: 'ربيع 218', v: 'ينطلق من قرطاجنة بتسعين ألف راجل واثني عشر ألف فارس.' },
      { k: 'بعد الإيبرو', v: 'يترك حاميات في إيبيريا ويعبر البرانس بخمسين ألف راجل وتسعة آلاف فارس، ثم يعبر 37 فيلًا نهر الرون.' },
      { k: 'خريف 218', v: 'يصل إلى إيطاليا بعد الألب: 12 ألف إفريقي و8 آلاف إيبيري و6 آلاف فارس، وهي أرقام نقشها حنبعل بنفسه في رأس لاكينيوم.' },
      { k: 'كاناي، 216', v: 'نحو 40 ألف راجل و10 آلاف فارس في مواجهة قرابة 80 ألف روماني وحليف.' },
      { k: 'زاما، 202', v: '80 فيلًا في الصف الأول، ثم المرتزقة والليبيون والقرطاجيون، وقدامى محاربي إيطاليا في الاحتياط.' }
    ],
    shipsTitle: 'سفن قرطاج',
    shipsAside: 'كان للأسطول الحربي والأسطول التجاري هدف واحد: السيطرة على طرق التجارة (لانسيل).',
    galleyAlt: 'سفن فينيقية، رسم منقول عن نقش من نينوى',
    galleyKicker: 'الإرث الفينيقي',
    galleyCap: 'سفن حربية وتجارية فينيقية، رُسمت نقلًا عن نقش آشوري من نينوى: ورثت قرطاج هذه الخبرة البحرية.',
    ships: [
      { k: 'منذ القرن السادس ق.م', name: 'السفينة ثلاثية المجاديف', text: 'ثلاث طبقات من المجدّفين بعضها فوق بعض ومِهماز في المقدمة: سفينة الخط الكلاسيكية، على متنها نحو 200 رجل، منهم قرابة 170 مجدّفًا.', src: 'لانسيل، قرطاج، 1992' },
      { k: 'القرن الرابع ق.م', name: 'السفينة الرباعية', text: 'أربعة مجدّفين في كل وحدة تجديف، لسفينة أثقل وأكثر ثباتًا. وينسب بلينيوس، نقلًا عن أرسطو، اختراعها إلى القرطاجيين.', src: 'بلينيوس، التاريخ الطبيعي، 7، 207' },
      { tone: 'tile--navy', k: 'سفينة الحروب البونيقية', name: 'السفينة الخماسية', text: 'ظهرت في سرقوسة نحو 399 في عهد ديونيسيوس الأول، ثم صارت سفينة الخط في الحروب ضد روما: نحو 300 مجدّف و120 جنديًا بحريًا حسب بوليبيوس.', src: 'ديودور، 14، 41-42 · بوليبيوس، 1، 26' },
      { k: 'الأسطول التجاري', name: 'الغاولوي', text: 'سمّى الإغريق السفينة الفينيقية المستديرة «غاولوس»: بدن عريض وشراع مربع ومجاديف قليلة. وكانت هذه السفن تنقل أيضًا المؤن والعتاد للأساطيل الحربية.', src: 'هيرودوت، 3، 136' },
      { tone: 'tile--terra', k: 'قوارب صغيرة', name: 'الهيبوي', text: 'قوارب نُحتت مقدمتها على هيئة رأس حصان — ومن هنا اسمها الإغريقي «الخيول». وحسب سترابون، كان صيادو قادس البسطاء يستعملونها للصيد على طول سواحل موريطانيا حتى نهر لكسوس.', src: 'سترابون، الجغرافيا، 2، 3، 4' }
    ],
    periplKicker: 'الاستكشاف',
    periplTitle: 'الرحلات البحرية',
    peripl: [
      { k: 'جبل طارق', v: 'منذ البداية، حمى الأسطول البونيقي طرق التجارة وحفظ أسرارها: فالسيطرة على المضيق تعني إغلاق الأطلسي أمام المنافسين الإغريق، ولا سيما الفوكيين.' },
      { k: 'حنون', v: 'أبحر أسطول على طول الساحل الأطلسي لإفريقيا. يمدّ بعضهم رحلته إلى خليج غينيا، ويقصّرها آخرون كثيرًا: فمدى الرحلة ما يزال موضع نقاش. ويُرجَّح أن النص الإغريقي ترجمة لنقش بونيقي كان معروضًا في معبد (أور-ميدان).' },
      { k: 'هيملكون', v: 'نحو الشمال وراء قادس، على طريق قصدير جزر الكاسيتريد، باتجاه الجزر البريطانية (بلينيوس، أفيينوس).' },
      { k: 'نحو 600 ق.م', v: 'يروي هيرودوت أن بحارة فينيقيين في خدمة الفرعون نخاو الثاني داروا حول إفريقيا في ثلاث سنوات: تقليد الجرأة الذي ورثته قرطاج (هيرودوت، 4، 42).' }
    ],
    periplLink: 'حنون الملاح ←',
    islandKicker: 'أسطورة قديمة',
    islandTitle: 'الجزيرة المحظورة',
    islandText: 'يُروى أن قرطاجيين وجدوا، بعيدًا وراء أعمدة هرقل، جزيرة خالية من السكان، كثيفة الأشجار، خصبة، تجري فيها أنهار صالحة للملاحة. فتردّد عليها كثيرون واستقر بها بعضهم. وخشية أن تجذب الغرباء وتفلت من يد المدينة، منع الحكّام الإبحار إليها تحت طائلة الموت وتخلّصوا من ساكنيها حتى لا يتحدث عنها أحد. رواية لا يمكن التحقق منها، لكنها تعكس شهرة البحارة البونيقيين بالكتمان.',
    islandSrc: 'المصدر: «في العجائب المسموعة»، 84 — مجموعة نُسبت خطأً إلى أرسطو',
    cmdKicker: 'التجنيد والقيادة',
    cmdTitle: 'من كان يقود؟',
    cmd: [
      { k: 'القادة', v: 'كانوا من كبرى العائلات، وتعيّنهم جمعية الشعب حسب ديودور (25، 8). والتسلسل العسكري غير معروف جيدًا؛ ويبدو أن لقب القائد يقابل الكلمة البونيقية «رب».' },
      { k: 'العقاب', v: 'لم تكن المدينة تتسامح مع الهزيمة: تذكر النصوص قادة مهزومين كثيرين صُلبوا أو أُعدموا (دريدي).' },
      { k: 'فكرة شائعة تحتاج إلى تدقيق', v: 'منذ العصور القديمة نُسبت هزيمة قرطاج إلى مرتزقتها وإلى فتور مواطنيها. وهذا يُغفل أن الأسطول الحربي كان يقوم على المواطنين، وأن الشعب كله قاتل في المعارك الأخيرة.' },
      { k: 'العمود الفقري', v: 'يرى المؤرخ خالد المليتي أن النواة الثابتة للمشاة كانت دائمًا من الليبيين سكان الداخل، ثم من إيبيريي إسبانيا البرقية، تكمّلهم المدن الفينيقية في إفريقيا مثل أوتيكا وحضرموت: كانوا يؤطّرون المرتزقة المتقلّبين والمجنّدين الجدد.' }
    ],
    armsKicker: 'السلاح',
    armsTitle: 'العتاد والوحدات',
    arms: [
      { k: 'المواطنون', v: 'مشاة مسلحون بالرمح والسيف (دريدي).' },
      { k: 'الليبيون', v: 'وحدات خفيفة: حراب وخناجر وتروس من الجلد.' },
      { k: 'الإيبيريون', v: 'ترس و«فالكاتا»، سيف قصير بنصل مقوّس.' },
      { k: 'الكتيبة', v: 'مشاة ثقيلة مصفوفة على الطريقة المقدونية؛ ولا يُعرف إن كان الرمح الطويل «الساريسا» مستعملًا فيها.' },
      { k: 'العربات', v: 'موروثة على الأرجح من تقليد ليبي قديم.' },
      { k: 'الفيلة', v: 'قليلة العدد واعتُمدت متأخرة، على الأرجح بعد حرب بيروس في إيطاليا. ويُرجَّح أنها سلالة صغيرة من فيل الغابات الإفريقي (فرضية فيليب لوفو)؛ وربما كان بعض السائسين هنودًا.' }
    ],
    tacticsTitle: 'التقنيات والمناورات',
    tacticsCta: 'التكتيكات بالتفصيل ←',
    landTactics: [
      { kicker: 'إرث مقدوني', title: 'الكتيبة والمعسكرات', text: 'اقتبست قرطاج من العالم الإغريقي والمقدوني نظام الكتيبة، وترتيب الجيش في الحملة، وتنظيم المعسكرات (دريدي).' },
      { tone: 'tile--purple', kicker: 'ابتكارات حنبعل', title: 'الفرسان والتطويق', text: 'صار الفرسان سلاحًا حاسمًا؛ وطُوّق العدو في كاناي (216)؛ وعوّض كمين بحيرة ترازيمين (217) النقص في العدد.' },
      { tone: 'tile--terra', kicker: 'فن الحصار', title: 'حصار المدن', text: 'أبراج حصار وكِباش ومنجنيقات: سنة 409 استولى جيش حنبعل الماغوني على سيلينونتي بأبراج متحركة عالية وكِباش (ديودور، 13، 54).' }
    ],
    seaKicker: 'الحرب البحرية القديمة',
    seaTitle: 'النطح والاختراق والالتفاف',
    svgLabel: 'رسم تخطيطي: في «الديكبلوس» تخترق السفينة صف العدو ثم تعود لتضربه، وفي «البيريبلوس» تلتف حول جناحه.',
    svgDiek: 'ديكبلوس',
    svgPeri: 'بيريبلوس',
    svgEnemy: 'صف العدو',
    sea: [
      { k: 'المِهماز', v: 'تُغرَق سفينة العدو بنطحها من الجانب أو من الخلف بالمِهماز: وكل شيء يتوقف على السرعة وتدريب المجدّفين.' },
      { k: 'ديكبلوس', v: 'التسلل عبر فجوة في صف العدو، ثم الاستدارة لنطح السفن من مؤخرتها.' },
      { k: 'بيريبلوس', v: 'الالتفاف حول جناح العدو لمهاجمته من الجانب — ومن هنا فائدة صفّ أطول من صف الخصم.' },
      { k: '260 · ميلاي', v: 'لإبطال مهارة البونيقيين، اخترعت روما «الغراب»، جسر اقتحام حوّل المعركة البحرية إلى قتال مشاة: أول انتصار بحري روماني.' },
      { k: '249 · دريبانا', v: 'حاصر الأمير البحري أدهربعل، بسفن أسرع وأطقم متمرسة، الأسطول الروماني على الساحل واستولى على 93 سفينة: الانتصار البحري القرطاجي الكبير في تلك الحرب (بوليبيوس، 1، 49-51).' }
    ],
    heritageTitle: 'الإرث العسكري',
    heritage: [
      { kicker: 'تكامل الأسلحة', title: 'لكل شعب موقعه', text: 'الفرسان النوميديون للمطاردة، ورماة المقلاع البليار للرمي، والليبيون والإيبيريون للصف: جعل حنبعل من هذا التنوع أداة تكتيكية.', tone: 'tile--purple' },
      { kicker: 'كاناي', title: 'نموذج التطويق', text: 'دُرس التطويق المزدوج سنة 216 في المدارس العسكرية حتى العصر الحديث، وجعله شليفن قلب عقيدته.' },
      { kicker: 'الوفاء', title: 'ست عشرة سنة بلا تمرد', text: 'بحسب بوليبيوس، لم يتمرد جيش حنبعل المتعدد الشعوب قط طوال ست عشرة سنة من الحرب في إيطاليا، رغم الحرمان.', tone: 'tile--navy' }
    ],
    mapKicker: 'حملة حنبعل · 219–202',
    mapCta: 'شاهد الحملة على الخريطة المتحركة'
  }
}

const c = computed(() => C[locale.value] || C.fr)

useHead(() => ({
  title: c.value.metaTitle,
  meta: [{ name: 'description', content: c.value.metaDesc }]
}))
</script>

<style scoped>
.army-title { font-size: clamp(44px, 5.8vw, 84px); line-height: 0.88; }

.unit-img {
  padding: 10px;
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 18px;
}

.unit-img > img {
  width: 150px;
  height: 100%;
  min-height: 200px;
  object-fit: cover;
  border-radius: 20px;
  background: var(--sand-deep);
}

.tile--ink.unit-img > img { background: #3A332C; }

.unit-txt { padding-block: 22px 14px; padding-inline-end: 14px; }

.block-title { margin-bottom: 20px; }
.para + .para { margin-top: 12px; }

.more {
  display: inline-block;
  margin-top: 12px;
  font: 600 13px/1 var(--font-body);
  color: var(--gold-light);
}

.navy-fig { background: var(--navy); min-height: clamp(300px, 36vw, 480px); }
.navy-title { font-size: clamp(34px, 3.9vw, 56px); margin-bottom: 20px; }

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--gap);
}

.stat {
  background: var(--navy-deep);
  border-radius: 20px;
  padding: 20px;
}

.stat-n { font: 900 34px/1 var(--font-display); }
.stat p { font: 500 13px/1.4 var(--font-body); color: var(--navy-soft); margin-top: 6px; }

.ship-fig { margin: 0; }
.ship-fig > img { height: 220px; object-fit: contain; background: var(--sand-deep); }
.src { font: 600 12px/1.4 var(--font-body); opacity: 0.75; margin-top: 14px; }

.peri-rows .key { color: var(--gold-light); }
.peri-rows .val { color: var(--on-dark); }
.peri-link { margin-top: 22px; min-height: 44px; display: inline-flex; align-items: center; }
.arms-rows .val { font-size: 15px; }

.man-svg { display: block; width: 100%; height: auto; margin-top: 8px; color: var(--white); }
.man-svg text { font-family: var(--font-body); }
.sea-rows .val { font-size: 15px; }

.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.cta-arrow {
  flex: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--purple);
  display: grid;
  place-items: center;
  font: 700 22px/1 var(--font-body);
}

[dir="rtl"] .cta-arrow { transform: scaleX(-1); }

@media (max-width: 640px) {
  .unit-img { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .unit-img > img { width: 100%; height: 200px; min-height: 0; }
  .unit-txt { padding: 18px 12px 12px; }
  .stats { grid-template-columns: minmax(0, 1fr); }
}

@media (max-width: 420px) {
  .cta-arrow { width: 44px; height: 44px; }
}
</style>
