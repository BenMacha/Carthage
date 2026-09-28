<template>
  <div class="pg">
    <!-- Héros -->
    <div class="bento bento--top">
      <section class="el-hero s-12">
        <img src="/img/turner-snow.jpg" :alt="c.heroAlt" class="el-hero-img">
        <div class="el-shade" aria-hidden="true" />
        <div class="el-hero-txt">
          <span class="chip chip--terra">{{ c.chip }}</span>
          <h1 class="h-display el-title">{{ c.title }}</h1>
          <p class="lede el-lede">{{ c.lede }}</p>
        </div>
        <span class="el-credit">{{ c.heroCap }}</span>
      </section>
    </div>

    <!-- Chiffres clés -->
    <div class="nums">
      <div v-for="n in c.nums" :key="n.t" class="tile num-tile" :class="n.tone">
        <div class="num-n">{{ n.n }}</div>
        <p>{{ n.t }}</p>
      </div>
    </div>

    <!-- Introduction -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <div class="tile tile--xl tile--sand">
          <span class="kicker">{{ c.introKicker }}</span>
          <h2 class="h-block">{{ c.introTitle }}</h2>
        </div>
        <div class="tile tile--xl">
          <p class="body-lg intro-p">{{ c.intro }}</p>
        </div>
      </div>
    </section>

    <!-- Le Rhône -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <figure class="fig rhone-fig">
          <img src="/img/motte-rhone.jpg" :alt="c.rhone.alt" loading="lazy">
          <figcaption>{{ c.rhone.cap }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--navy tile--stack">
          <div>
            <span class="kicker">{{ c.rhone.kicker }}</span>
            <h2 class="h-block rhone-title">{{ c.rhone.title }}</h2>
            <p class="body-lg">{{ c.rhone.text }}</p>
            <p class="body-lg rhone-more">{{ c.rhone.more }}</p>
          </div>
          <div class="chips">
            <span v-for="ch in c.rhone.chips" :key="ch" class="chip rhone-chip">{{ ch }}</span>
          </div>
        </div>
      </div>
      <div class="cols cols-3 cols--flush trio">
        <div v-for="t in c.trio" :key="t.title" class="tile tile--xl trio-tile">
          <span class="kicker">{{ t.kicker }}</span>
          <h3 class="h-card">{{ t.title }}</h3>
          <p class="body">{{ t.text }}</p>
        </div>
      </div>
    </section>

    <!-- Itinéraire -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.routeTitle }}</h2>
        <p>{{ c.routeSub }}</p>
      </div>
      <ol class="route">
        <li v-for="(s, i) in c.route" :key="s.place" class="route-step">
          <span class="route-dot" :class="dotClass[i]" aria-hidden="true">{{ i + 1 }}</span>
          <div class="route-body">
            <span class="route-when">{{ s.when }}</span>
            <h3 class="route-place">{{ s.place }}</h3>
            <p class="route-text">{{ s.text }}</p>
            <div v-if="s.stats" class="route-stats">
              <span v-for="st in s.stats" :key="st.l"><b>{{ st.v }}</b> {{ st.l }}</span>
            </div>
          </div>
        </li>
      </ol>
    </section>

    <!-- Carte -->
    <section class="sec">
      <div class="sec-head sec-head--in">
        <h2 class="h-section">{{ c.mapTitle }}</h2>
        <p>{{ c.mapSub }}</p>
      </div>
      <MapsAnimatedMap compact initial-mode="hann" :modes="['hann']" />
    </section>

    <!-- Les éléphants de guerre -->
    <section class="sec">
      <div class="sec-head sec-head--in">
        <h2 class="h-section">{{ c.warTitle }}</h2>
        <p>{{ c.warSub }}</p>
      </div>
      <div class="bento bento--flush">
        <div class="card-img s-4">
          <img src="/img/coin-elephant.jpg" :alt="c.coinAlt" loading="lazy">
          <div class="card-body">
            <span class="kicker">{{ c.war[0].kicker }}</span>
            <h3 class="h-card">{{ c.war[0].title }}</h3>
            <p>{{ c.war[0].text }}</p>
          </div>
        </div>
        <div class="tile tile--xl s-4">
          <span class="kicker">{{ c.war[1].kicker }}</span>
          <h3 class="h-card">{{ c.war[1].title }}</h3>
          <p class="body">{{ c.war[1].text }}</p>
        </div>
        <div class="tile tile--xl tile--terra tile--stack s-4">
          <div>
            <span class="kicker">{{ c.war[2].kicker }}</span>
            <h3 class="h-block surus-title">{{ c.war[2].title }}</h3>
            <p class="body">{{ c.war[2].text }}</p>
          </div>
          <span class="chip chip--glass">{{ c.war[2].chip }}</span>
        </div>
        <div class="tile tile--xl tile--ink s-6">
          <span class="kicker">{{ c.war[3].kicker }}</span>
          <h3 class="h-card">{{ c.war[3].title }}</h3>
          <p class="body">{{ c.war[3].text }}</p>
        </div>
        <div class="tile tile--xl tile--sand s-6">
          <span class="kicker">{{ c.war[4].kicker }}</span>
          <h3 class="h-card">{{ c.war[4].title }}</h3>
          <p class="body">{{ c.war[4].text }}</p>
        </div>
      </div>
    </section>

    <!-- Victoires en Italie + lien tactiques -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.battlesKicker }}</span>
          <h2 class="h-block battles-title">{{ c.battlesTitle }}</h2>
          <div class="rows battles">
            <div v-for="b in c.battles" :key="b.name">
              <div class="key">{{ b.date }}</div>
              <div class="val">
                <strong class="b-name">{{ b.name }}</strong>
                {{ b.text }}
                <span class="b-res">{{ b.result }}</span>
              </div>
            </div>
          </div>
        </div>
        <NuxtLink :to="localePath('/tactiques')" class="tile tile--xl tile--purple tile--stack tact-card">
          <div>
            <span class="kicker">{{ c.tactKicker }}</span>
            <h2 class="h-block">{{ c.tactTitle }}</h2>
            <p class="body-lg tact-text">{{ c.tactText }}</p>
          </div>
          <span class="tact-cta">{{ c.tactCta }} <span class="flip" aria-hidden="true">→</span></span>
        </NuxtLink>
      </div>
    </section>

    <!-- Représentations -->
    <section class="sec">
      <div class="sec-head sec-head--in">
        <h2 class="h-section">{{ c.galleryTitle }}</h2>
      </div>
      <div class="cols cols-3 cols--flush">
        <figure v-for="g in c.gallery" :key="g.img" class="card-img gal">
          <img :src="g.img" :alt="g.alt" loading="lazy" :style="g.pos ? { objectPosition: g.pos } : null">
          <figcaption>{{ g.cap }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- À lire aussi -->
    <section class="sec">
      <h2 class="h-block related-title">{{ c.relatedTitle }}</h2>
      <div class="cols cols-4 cols--flush">
        <NuxtLink v-for="l in c.links" :key="l.to" :to="localePath(l.to)" class="tile tile--stack link-tile" :class="l.cls">
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

const dotClass = ['dot--ink', '', 'dot--navy', '', '', 'dot--terra']

const C = {
  fr: {
    metaTitle: "Le passage des éléphants — Hannibal, du Rhône aux Alpes (218 av. J.-C.)",
    metaDesc: "37 éléphants, 1 600 km, 15 jours dans les Alpes : la traversée d'Hannibal étape par étape, la ruse du Rhône, le débat sur le col, l'espèce des éléphants de Carthage et Surus.",
    chip: 'Hannibal · Éléphants · 218 av. J.-C.',
    title: '37 éléphants contre les Alpes',
    lede: "Un fleuve, des cols enneigés, des tribus hostiles : l'exploit logistique le plus fou de l'Antiquité.",
    heroAlt: 'J. M. W. Turner — Tempête de neige : Hannibal et son armée traversant les Alpes',
    heroCap: 'J. M. W. Turner — Tempête de neige (1812)',
    nums: [
      { n: '1 600', t: 'km depuis Carthagène' },
      { n: '37', t: 'éléphants au départ' },
      { n: '5 mois', t: 'de marche' },
      { n: '15 j', t: 'dans les Alpes' },
      { n: '2–3 000 m', t: "d'altitude au col, selon le col retenu" },
      { n: '1', t: 'survivant célèbre : Surus', tone: 'tile--terra' }
    ],
    introKicker: "218 av. J.-C.",
    introTitle: "L'impossible devient réalité",
    intro: "À l'automne 218 av. J.-C., Hannibal Barca accomplit ce que les Romains croyaient impossible : franchir les Alpes avec une armée entière et ses éléphants de guerre pour envahir l'Italie par le nord. Cette marche de plus de 1 600 kilomètres depuis Carthagène reste l'un des exploits logistiques et militaires les plus extraordinaires de l'histoire.",
    rhone: {
      alt: 'Henri Motte — Hannibal traverse le Rhône',
      cap: 'Henri Motte — Hannibal traverse le Rhône (1878)',
      kicker: 'Étape 3 · Le Rhône',
      title: 'Faire croire au sol',
      text: "Selon Polybe, les ingénieurs construisent de grands radeaux recouverts de terre, pour que les éléphants croient marcher sur la rive. Remorqués, certains paniquent et se jettent à l'eau — mais tous finissent par traverser.",
      more: "Sur l'autre rive, des Gaulois barrent le passage. Hannibal envoie de nuit Hannon, fils de Bomilcar, franchir le fleuve en amont ; à son signal de fumée, l'armée traverse en barques pendant qu'Hannon prend les Gaulois à revers.",
      chips: ['Radeaux de ~15 m (50 pieds)', 'À 4 jours de marche de la mer']
    },
    trio: [
      { kicker: "L'animal", title: "L'éléphant d'Afrique du Nord", text: "Une population aujourd'hui éteinte, plus petite que l'éléphant de savane : environ 2,5 m au garrot. On le voit sur les shekels des Barcides." },
      { kicker: 'La roche', title: 'Le feu et le vinaigre', text: "D'après Tite-Live, un éboulement bloque la descente ; les soldats chauffent le rocher au feu puis le fendent en y versant du vinaigre." },
      { kicker: "L'énigme", title: 'Quel col ?', text: 'Traversette, Mont-Cenis, Clapier, Petit-Saint-Bernard… Le débat reste ouvert ; des analyses de sol ont récemment relancé la piste de la Traversette.' }
    ],
    routeTitle: "L'itinéraire, étape par étape",
    routeSub: "De Carthagène à la plaine du Pô — d'après Polybe et Tite-Live",
    route: [
      { place: 'Carthagène', when: 'Printemps 218', text: "Hannibal quitte Qart Hadasht avec une armée massive. Il laisse son frère Hasdrubal défendre l'Espagne.", stats: [{ v: '90 000', l: 'fantassins' }, { v: '12 000', l: 'cavaliers' }, { v: '37', l: 'éléphants' }] },
      { place: 'Pyrénées', when: 'Été 218', text: "Il soumet ou négocie avec les tribus, laisse Hannon garder la région avec 11 000 hommes et renvoie chez eux 11 000 Ibères plutôt que de forcer des troupes réticentes.", stats: [{ v: '50 000', l: 'fantassins' }, { v: '9 000', l: 'cavaliers' }] },
      { place: 'Le Rhône', when: 'Fin de l’été 218', text: 'Grands radeaux couverts de terre pour les éléphants ; un détachement traverse en amont et attaque les Gaulois par l’arrière.', stats: [{ v: '37', l: 'éléphants traversent' }] },
      { place: "L'ascension", when: 'Octobre 218', text: "9 jours jusqu'au sommet : embuscades des tribus alpines, chutes de pierres, chemins étroits et froid glacial. Les éléphants souffrent du terrain escarpé." },
      { place: 'Le col', when: 'Octobre 218', text: 'Au sommet, il montre à ses troupes épuisées la plaine du Pô et ranime leur moral. La descente, sur des sentiers verglacés, est plus dangereuse encore que la montée.' },
      { place: "L'Italie", when: 'Automne 218', text: "Après 15 jours dans les Alpes, l'armée atteint la plaine du Pô. Les pertes sont terribles, mais Rome est prise de court : l'Italie est envahie par la terre.", stats: [{ v: '26 000', l: 'survivants' }, { v: '> 50 %', l: 'de pertes depuis les Pyrénées' }] }
    ],
    mapTitle: 'La route sur la carte',
    mapSub: "Suivez la campagne d'Hannibal de Carthagène à la plaine du Pô, puis jusqu'à Cannes et Zama.",
    warTitle: 'Les éléphants de guerre',
    warSub: "L'arme psychologique de Carthage",
    coinAlt: 'Éléphant sur une monnaie des Barcides',
    war: [
      {
        kicker: 'Quelle espèce ?',
        title: 'Un éléphant disparu',
        text: "Sans doute l'éléphant d'Afrique du Nord, une population éteinte (parfois nommée Loxodonta africana pharaonensis), plus petite que l'éléphant de savane : environ 2,5 m au garrot. Son statut exact reste débattu. Carthage a pu disposer aussi de quelques éléphants d'Asie, venus d'Égypte ou de Syrie."
      },
      {
        kicker: 'Rôle au combat',
        title: 'Terrifier avant de frapper',
        text: "Les éléphants servaient surtout d'arme psychologique : leur charge terrorisait les fantassins et affolait les chevaux qui n'y étaient pas habitués. Chacun était mené par un cornac. Les tours d'archers, courantes chez les éléphants indiens des rois hellénistiques, restent douteuses pour ceux de Carthage, plus petits."
      },
      {
        kicker: 'Le plus brave',
        title: 'Surus',
        text: "Caton l'Ancien, cité par Pline, a retenu le nom de l'éléphant le plus courageux de l'armée punique : Surus, « le Syrien », qui n'avait qu'une défense. Selon Tite-Live, Hannibal traversa les marais de l'Arno au printemps 217 monté sur le dernier éléphant survivant — souvent identifié à Surus.",
        chip: 'Le Syrien · une seule défense'
      },
      {
        kicker: "L'épreuve de l'hiver",
        title: 'Survivre aux Alpes, pas à l’hiver',
        text: "La plupart des 37 éléphants survivent à la traversée et combattent à la Trébie, en décembre 218. Mais la neige, la pluie et le froid de cet hiver les déciment : selon Polybe, un seul survit. En 215, Bomilcar débarque 40 éléphants de renfort à Locres ; à Zama, en 202, Hannibal en aligne 80."
      },
      {
        kicker: 'Héritage',
        title: 'Un symbole de l’Antiquité',
        text: "Les monnaies carthaginoises et celles que les Barcides frappent en Espagne montrent souvent des éléphants. L'image d'Hannibal et de ses éléphants franchissant les Alpes est devenue l'un des symboles les plus puissants de l'Antiquité, peinte par Goya, Turner et bien d'autres."
      }
    ],
    battlesKicker: 'Après la traversée',
    battlesTitle: 'Les victoires en Italie',
    battles: [
      { date: 'Nov. 218', name: 'Le Tessin', text: "Premier choc : la cavalerie numide met en déroute celle de Publius Cornelius Scipion, blessé. Son fils de 17 ans, le futur Scipion l'Africain, lui sauve la vie.", result: 'Victoire carthaginoise' },
      { date: 'Déc. 218', name: 'La Trébie', text: "En plein hiver, Hannibal pousse les légions de Sempronius à traverser la rivière glacée ; son frère Magon, caché avec 2 000 hommes, les attaque par l'arrière.", result: 'Victoire écrasante' },
      { date: 'Juin 217', name: 'Le lac Trasimène', text: "L'armée du consul Flaminius est prise au piège entre le lac et les collines : en trois heures, 15 000 Romains sont tués et 6 000 capturés.", result: 'Victoire décisive' },
      { date: 'Août 216', name: 'Cannes', text: 'Avec 50 000 hommes contre 86 000 Romains, Hannibal réalise un double enveloppement parfait. Entre 50 000 et 70 000 Romains périssent, dont 80 sénateurs.', result: "Chef-d'œuvre tactique" }
    ],
    tactKicker: 'Tactiques de guerre détaillées',
    tactTitle: "Les batailles d'Hannibal en schémas",
    tactText: 'Trébie, Trasimène, Cannes pas à pas et Zama : analyse des manœuvres qui ont changé l’histoire.',
    tactCta: 'Voir les tactiques',
    galleryTitle: 'Représentations',
    gallery: [
      { img: '/img/leutemann.jpg', alt: "Heinrich Leutemann — L'armée d'Hannibal traversant les Alpes", pos: '50% 60%', cap: 'H. Leutemann — Le passage des Alpes, XIXe s.' },
      { img: '/img/goya.jpg', alt: "Goya — Hannibal contemplant l'Italie depuis les Alpes", cap: "F. de Goya — Hannibal contemplant l'Italie, 1771" },
      { img: '/img/oath.jpg', alt: "Benjamin West — Le serment d'Hannibal", cap: "B. West — Le serment d'Hannibal enfant, 1770" }
    ],
    relatedTitle: 'À lire aussi',
    links: [
      { to: '/hannibal', kick: 'Biographie', title: 'Hannibal Barca', text: 'De Carthagène à Zama, la vie du stratège qui fit trembler Rome.', cls: 'tile--purple' },
      { to: '/guerres-puniques', kick: '264 – 146 av. J.-C.', title: 'Les guerres puniques', text: 'Trois guerres, un siècle de conflit pour la Méditerranée.', cls: '' },
      { to: '/armee', kick: 'Armée', title: "L'armée de Carthage", text: 'Bataillon sacré, Libyens, Numides, frondeurs et éléphants.', cls: 'tile--terra' },
      { to: '/carte', kick: 'Carte animée', title: 'Carthage et la Méditerranée', text: 'Territoires, campagne d’Hannibal, voyages et alliés.', cls: 'tile--navy' }
    ]
  },
  en: {
    metaTitle: "The elephants' crossing — Hannibal, from the Rhône to the Alps (218 BC)",
    metaDesc: "37 elephants, 1,600 km, 15 days in the Alps: Hannibal's crossing step by step, the Rhône ruse, the debate over the pass, the species of Carthage's elephants, and Surus.",
    chip: 'Hannibal · Elephants · 218 BC',
    title: '37 elephants against the Alps',
    lede: 'A great river, snowbound passes, hostile tribes: the most audacious logistical feat of Antiquity.',
    heroAlt: 'J. M. W. Turner — Snow Storm: Hannibal and his Army Crossing the Alps',
    heroCap: 'J. M. W. Turner — Snow Storm (1812)',
    nums: [
      { n: '1,600', t: 'km from Carthago Nova' },
      { n: '37', t: 'elephants at the start' },
      { n: '5 months', t: 'of marching' },
      { n: '15 days', t: 'in the Alps' },
      { n: '2–3,000 m', t: 'altitude of the pass, depending on which one' },
      { n: '1', t: 'famous survivor: Surus', tone: 'tile--terra' }
    ],
    introKicker: '218 BC',
    introTitle: 'The impossible made real',
    intro: 'In the autumn of 218 BC, Hannibal Barca achieved what the Romans thought impossible: crossing the Alps with an entire army and its war elephants to invade Italy from the north. This march of more than 1,600 kilometres from Carthago Nova remains one of the most extraordinary logistical and military feats in history.',
    rhone: {
      alt: 'Henri Motte — Hannibal crossing the Rhône',
      cap: 'Henri Motte — Hannibal crossing the Rhône (1878)',
      kicker: 'Stage 3 · The Rhône',
      title: 'Make them believe it is land',
      text: 'According to Polybius, the engineers built great rafts covered with earth, so that the elephants would think they were still walking on the bank. Once towed, some panicked and plunged into the water — but all of them made it across.',
      more: 'On the far bank, Gauls blocked the way. Hannibal sent Hanno, son of Bomilcar, by night to cross upstream; at his smoke signal the army crossed in boats while Hanno fell on the Gauls from behind.',
      chips: ['Rafts ~15 m (50 ft) wide', '4 days’ march from the sea']
    },
    trio: [
      { kicker: 'The animal', title: 'The North African elephant', text: 'A now-extinct population, smaller than the savanna elephant: about 2.5 m at the shoulder. It appears on Barcid shekels.' },
      { kicker: 'The rock', title: 'Fire and vinegar', text: 'According to Livy, a rockfall blocked the descent; the soldiers heated the rock with fire, then split it by pouring vinegar over it.' },
      { kicker: 'The riddle', title: 'Which pass?', text: 'Traversette, Mont Cenis, Clapier, Little St Bernard… The debate remains open; recent soil analyses have revived the case for the Traversette.' }
    ],
    routeTitle: 'The route, stage by stage',
    routeSub: 'From Carthago Nova to the Po plain — after Polybius and Livy',
    route: [
      { place: 'Carthago Nova', when: 'Spring 218', text: 'Hannibal leaves Qart Hadasht with a huge army. He leaves his brother Hasdrubal to defend Spain.', stats: [{ v: '90,000', l: 'infantry' }, { v: '12,000', l: 'cavalry' }, { v: '37', l: 'elephants' }] },
      { place: 'Pyrenees', when: 'Summer 218', text: 'He subdues or negotiates with the tribes, leaves Hanno to hold the region with 11,000 men and sends 11,000 Iberians home rather than force reluctant troops onward.', stats: [{ v: '50,000', l: 'infantry' }, { v: '9,000', l: 'cavalry' }] },
      { place: 'The Rhône', when: 'Late summer 218', text: 'Great earth-covered rafts for the elephants; a detachment crosses upstream and attacks the Gauls from the rear.', stats: [{ v: '37', l: 'elephants cross' }] },
      { place: 'The ascent', when: 'October 218', text: '9 days to the summit: ambushes by Alpine tribes, rockfalls, narrow paths and bitter cold. The elephants suffer on the steep ground.' },
      { place: 'The pass', when: 'October 218', text: 'At the top, he shows his exhausted troops the Po plain below and restores their morale. The descent, on icy paths, is even more dangerous than the climb.' },
      { place: 'Italy', when: 'Autumn 218', text: 'After 15 days in the Alps, the army reaches the Po plain. Losses are terrible, but Rome is caught off guard: Italy has been invaded overland.', stats: [{ v: '26,000', l: 'survivors' }, { v: '> 50%', l: 'losses since the Pyrenees' }] }
    ],
    mapTitle: 'The route on the map',
    mapSub: "Follow Hannibal's campaign from Carthago Nova to the Po plain, then on to Cannae and Zama.",
    warTitle: 'War elephants',
    warSub: "Carthage's psychological weapon",
    coinAlt: 'Elephant on a Barcid coin',
    war: [
      { kicker: 'Which species?', title: 'A vanished elephant', text: 'Most likely the North African elephant, an extinct population (sometimes called Loxodonta africana pharaonensis), smaller than the savanna elephant: about 2.5 m at the shoulder. Its exact status is still debated. Carthage may also have had a few Asian elephants, obtained from Egypt or Syria.' },
      { kicker: 'Role in battle', title: 'Terrify, then strike', text: 'Elephants were above all a psychological weapon: their charge terrified infantry and panicked horses unused to them. Each was driven by a mahout. Archer towers, common on the Indian elephants of the Hellenistic kings, are doubtful for Carthage’s smaller animals.' },
      { kicker: 'The bravest', title: 'Surus', text: 'Cato the Elder, quoted by Pliny, recorded the name of the bravest elephant in the Punic army: Surus, "the Syrian", who had only one tusk. According to Livy, Hannibal crossed the Arno marshes in spring 217 riding the last surviving elephant — often identified with Surus.', chip: 'The Syrian · one tusk' },
      { kicker: 'The winter ordeal', title: 'Surviving the Alps, not the winter', text: 'Most of the 37 elephants survived the crossing and fought at the Trebia in December 218. But the snow, rain and cold of that winter wiped them out: according to Polybius, only one survived. In 215 Bomilcar landed 40 elephants as reinforcements at Locri; at Zama in 202, Hannibal fielded 80.' },
      { kicker: 'Legacy', title: 'A symbol of Antiquity', text: 'Carthaginian coins, and those the Barcids struck in Spain, often show elephants. The image of Hannibal and his elephants crossing the Alps became one of the most powerful symbols of Antiquity, painted by Goya, Turner and many others.' }
    ],
    battlesKicker: 'After the crossing',
    battlesTitle: 'The victories in Italy',
    battles: [
      { date: 'Nov. 218', name: 'The Ticinus', text: 'First clash: the Numidian cavalry routs that of Publius Cornelius Scipio, who is wounded. His 17-year-old son, the future Scipio Africanus, saves his life.', result: 'Carthaginian victory' },
      { date: 'Dec. 218', name: 'The Trebia', text: "In the depths of winter, Hannibal lures Sempronius' legions across the freezing river; his brother Mago, hidden with 2,000 men, attacks them from behind.", result: 'Crushing victory' },
      { date: 'June 217', name: 'Lake Trasimene', text: "Consul Flaminius' army is trapped between the lake and the hills: in three hours 15,000 Romans are killed and 6,000 captured.", result: 'Decisive victory' },
      { date: 'Aug. 216', name: 'Cannae', text: 'With 50,000 men against 86,000 Romans, Hannibal achieves a perfect double envelopment. Between 50,000 and 70,000 Romans die, including 80 senators.', result: 'Tactical masterpiece' }
    ],
    tactKicker: 'Detailed battle tactics',
    tactTitle: "Hannibal's battles in diagrams",
    tactText: 'The Trebia, Trasimene, Cannae step by step, and Zama: the manoeuvres that changed history.',
    tactCta: 'See the tactics',
    galleryTitle: 'Depictions',
    gallery: [
      { img: '/img/leutemann.jpg', alt: "Heinrich Leutemann — Hannibal's army crossing the Alps", pos: '50% 60%', cap: 'H. Leutemann — Crossing the Alps, 19th c.' },
      { img: '/img/goya.jpg', alt: 'Goya — Hannibal viewing Italy from the Alps', cap: 'F. de Goya — Hannibal viewing Italy, 1771' },
      { img: '/img/oath.jpg', alt: 'Benjamin West — Hannibal taking the oath', cap: "B. West — Young Hannibal's oath, 1770" }
    ],
    relatedTitle: 'Read also',
    links: [
      { to: '/hannibal', kick: 'Biography', title: 'Hannibal Barca', text: 'From Carthago Nova to Zama, the life of the strategist who made Rome tremble.', cls: 'tile--purple' },
      { to: '/guerres-puniques', kick: '264 – 146 BC', title: 'The Punic Wars', text: 'Three wars, a century of conflict over the Mediterranean.', cls: '' },
      { to: '/armee', kick: 'Army', title: 'The army of Carthage', text: 'Sacred Band, Libyans, Numidians, slingers and elephants.', cls: 'tile--terra' },
      { to: '/carte', kick: 'Animated map', title: 'Carthage and the Mediterranean', text: "Territories, Hannibal's campaign, voyages and allies.", cls: 'tile--navy' }
    ]
  },
  ar: {
    metaTitle: 'عبور الفيلة — حنبعل من الرون إلى الألب (218 ق.م)',
    metaDesc: '37 فيلًا و1600 كم و15 يومًا في جبال الألب: عبور حنبعل مرحلة بمرحلة، وحيلة الرون، والجدل حول الممر، ونوع فيلة قرطاج، وسوروس.',
    chip: 'حنبعل · الفيلة · 218 ق.م',
    title: '37 فيلًا في مواجهة الألب',
    lede: 'نهر عظيم وممرات مكسوّة بالثلج وقبائل معادية: أجرأ إنجاز لوجستي في العصور القديمة.',
    heroAlt: 'ج. م. و. تيرنر — عاصفة ثلجية: حنبعل وجيشه يعبرون جبال الألب',
    heroCap: 'ج. م. و. تيرنر — عاصفة ثلجية (1812)',
    nums: [
      { n: '1600', t: 'كم من قرطاجنة' },
      { n: '37', t: 'فيلًا عند الانطلاق' },
      { n: '5 أشهر', t: 'من المسير' },
      { n: '15 يومًا', t: 'في جبال الألب' },
      { n: '2000–3000 م', t: 'ارتفاع الممر، حسب الممر المرجَّح' },
      { n: '1', t: 'ناجٍ شهير: سوروس', tone: 'tile--terra' }
    ],
    introKicker: '218 ق.م',
    introTitle: 'المستحيل يصبح حقيقة',
    intro: 'في خريف سنة 218 ق.م، حقّق حنبعل برقا ما ظنّه الرومان مستحيلًا: عبور جبال الألب بجيش كامل وفيلته الحربية لغزو إيطاليا من الشمال. وتبقى هذه المسيرة التي تجاوزت 1600 كيلومتر انطلاقًا من قرطاجنة من أعجب الإنجازات اللوجستية والعسكرية في التاريخ.',
    rhone: {
      alt: 'هنري موت — حنبعل يعبر نهر الرون',
      cap: 'هنري موت — حنبعل يعبر الرون (1878)',
      kicker: 'المرحلة 3 · الرون',
      title: 'إيهامها بأنها على اليابسة',
      text: 'حسب بوليبيوس، بنى المهندسون أطوافًا كبيرة مغطّاة بالتراب حتى تظنّ الفيلة أنها ما زالت تمشي على الضفة. وحين سُحبت، ذُعر بعضها فألقى بنفسه في الماء — لكنها عبرت كلها في النهاية.',
      more: 'على الضفة الأخرى كان الغاليون يسدّون الطريق. فأرسل حنبعل ليلًا حنون بن بوملقار ليعبر النهر في أعلى مجراه؛ وعند إشارته بالدخان عبر الجيش في القوارب بينما هاجم حنون الغاليين من الخلف.',
      chips: ['أطواف بعرض ~15 م (50 قدمًا)', 'على مسيرة 4 أيام من البحر']
    },
    trio: [
      { kicker: 'الحيوان', title: 'فيل شمال إفريقيا', text: 'مجموعة منقرضة اليوم، أصغر من فيل السافانا: نحو 2.5 م عند الكتف. ويظهر على شياقل البرقيين.' },
      { kicker: 'الصخرة', title: 'النار والخلّ', text: 'حسب تيتوس ليفيوس، سدّ انهيار صخري طريق النزول؛ فسخّن الجنود الصخرة بالنار ثم فلقوها بصبّ الخلّ عليها.' },
      { kicker: 'اللغز', title: 'أيّ ممر؟', text: 'تراڤرسيت، مون سني، كلابيي، سان برنار الصغير… ما زال الجدل مفتوحًا، وقد أعادت تحاليل حديثة للتربة ترجيح ممر تراڤرسيت.' }
    ],
    routeTitle: 'المسار مرحلة بمرحلة',
    routeSub: 'من قرطاجنة إلى سهل البو — حسب بوليبيوس وتيتوس ليفيوس',
    route: [
      { place: 'قرطاجنة', when: 'ربيع 218', text: 'يغادر حنبعل قرت حدشت بجيش ضخم، ويترك أخاه صدربعل للدفاع عن إسبانيا.', stats: [{ v: '90,000', l: 'من المشاة' }, { v: '12,000', l: 'فارس' }, { v: '37', l: 'فيلًا' }] },
      { place: 'البرانس', when: 'صيف 218', text: 'يُخضع القبائل أو يفاوضها، ويترك حنون لحراسة المنطقة مع 11,000 رجل، ويعيد 11,000 إيبيري إلى ديارهم بدل إجبار جنود مترددين على المتابعة.', stats: [{ v: '50,000', l: 'من المشاة' }, { v: '9,000', l: 'فارس' }] },
      { place: 'الرون', when: 'أواخر صيف 218', text: 'أطواف كبيرة مغطّاة بالتراب للفيلة؛ ومفرزة تعبر في أعلى النهر وتهاجم الغاليين من الخلف.', stats: [{ v: '37', l: 'فيلًا تعبر' }] },
      { place: 'الصعود', when: 'أكتوبر 218', text: '9 أيام حتى القمة: كمائن القبائل الألبية وتساقط الصخور والدروب الضيقة والبرد القارس. وتعاني الفيلة من الأرض الوعرة.' },
      { place: 'الممر', when: 'أكتوبر 218', text: 'في القمة، يُري جنوده المنهكين سهل البو في الأسفل ويرفع معنوياتهم. أما النزول على دروب متجمّدة فأخطر من الصعود.' },
      { place: 'إيطاليا', when: 'خريف 218', text: 'بعد 15 يومًا في الألب، يبلغ الجيش سهل البو. الخسائر فادحة، لكن روما فوجئت: لقد غُزيت إيطاليا برًّا.', stats: [{ v: '26,000', l: 'ناجٍ' }, { v: '> 50%', l: 'خسائر منذ البرانس' }] }
    ],
    mapTitle: 'المسار على الخريطة',
    mapSub: 'تابع حملة حنبعل من قرطاجنة إلى سهل البو، ثم إلى كاناي وزاما.',
    warTitle: 'الفيلة الحربية',
    warSub: 'سلاح قرطاج النفسي',
    coinAlt: 'فيل على عملة برقية',
    war: [
      { kicker: 'أيّ نوع؟', title: 'فيل منقرض', text: 'على الأرجح فيل شمال إفريقيا، وهو مجموعة منقرضة (تُسمّى أحيانًا Loxodonta africana pharaonensis)، أصغر من فيل السافانا: نحو 2.5 م عند الكتف. وما زال وضعه الدقيق محلّ جدل. وربما امتلكت قرطاج أيضًا بعض الفيلة الآسيوية القادمة من مصر أو سوريا.' },
      { kicker: 'دورها في القتال', title: 'الترهيب قبل الضرب', text: 'كانت الفيلة قبل كل شيء سلاحًا نفسيًا: كان هجومها يرعب المشاة ويُفزع الخيول غير المعتادة عليها. وكان يقود كلًّا منها فيّال. أما أبراج الرماة، الشائعة على الفيلة الهندية لدى الملوك الهلنستيين، فمشكوك فيها بالنسبة لفيلة قرطاج الأصغر حجمًا.' },
      { kicker: 'الأشجع', title: 'سوروس', text: 'حفظ كاتو الأكبر، كما ينقل بلينيوس، اسم أشجع فيل في الجيش البونيقي: سوروس، أي «السوري»، وكان له ناب واحد. وحسب تيتوس ليفيوس، عبر حنبعل مستنقعات الأرنو في ربيع 217 راكبًا آخر فيل ناجٍ — ويُطابَق غالبًا مع سوروس.', chip: 'السوري · ناب واحد' },
      { kicker: 'محنة الشتاء', title: 'نجت من الألب لا من الشتاء', text: 'نجت معظم الفيلة الـ37 من العبور وقاتلت في تريبيا في ديسمبر 218. لكن ثلج ذلك الشتاء ومطره وبرده أهلكتها: حسب بوليبيوس لم ينجُ إلا فيل واحد. وفي سنة 215 أنزل بوملقار 40 فيلًا مددًا في لوكري، وفي زاما سنة 202 صفّ حنبعل 80 فيلًا.' },
      { kicker: 'الإرث', title: 'رمز من رموز العصور القديمة', text: 'كثيرًا ما تُظهر العملات القرطاجية، وتلك التي ضربها البرقيون في إسبانيا، فيلة. وأصبحت صورة حنبعل وفيلته تعبر الألب من أقوى رموز العصور القديمة، رسمها غويا وتيرنر وكثيرون غيرهما.' }
    ],
    battlesKicker: 'بعد العبور',
    battlesTitle: 'الانتصارات في إيطاليا',
    battles: [
      { date: 'نوفمبر 218', name: 'تيتشينو', text: 'أول صدام: يهزم الفرسان النوميديون فرسان بوبليوس كورنيليوس سكيبيو الذي يُجرح، فينقذ حياته ابنه ذو السبعة عشر عامًا، سكيبيو الإفريقي لاحقًا.', result: 'نصر قرطاجي' },
      { date: 'ديسمبر 218', name: 'تريبيا', text: 'في عزّ الشتاء، يدفع حنبعل فيالق سمبرونيوس إلى عبور النهر المتجمّد؛ ويهاجمها أخوه ماغون من الخلف بعد أن كمن مع ألفي رجل.', result: 'نصر ساحق' },
      { date: 'يونيو 217', name: 'بحيرة تراسيمين', text: 'يقع جيش القنصل فلامينيوس في الفخ بين البحيرة والتلال: في ثلاث ساعات يُقتل 15,000 روماني ويُؤسر 6,000.', result: 'نصر حاسم' },
      { date: 'أغسطس 216', name: 'كاناي', text: 'بخمسين ألف رجل مقابل 86,000 روماني، ينفّذ حنبعل تطويقًا مزدوجًا مثاليًا. ويهلك ما بين 50,000 و70,000 روماني، منهم 80 عضوًا في مجلس الشيوخ.', result: 'تحفة تكتيكية' }
    ],
    tactKicker: 'التكتيكات الحربية بالتفصيل',
    tactTitle: 'معارك حنبعل بالرسوم',
    tactText: 'تريبيا وتراسيمين وكاناي خطوة بخطوة ثم زاما: المناورات التي غيّرت التاريخ.',
    tactCta: 'شاهد التكتيكات',
    galleryTitle: 'تمثيلات فنية',
    gallery: [
      { img: '/img/leutemann.jpg', alt: 'هاينريش لويتمان — جيش حنبعل يعبر الألب', pos: '50% 60%', cap: 'ه. لويتمان — عبور الألب، القرن 19' },
      { img: '/img/goya.jpg', alt: 'غويا — حنبعل يتأمل إيطاليا من جبال الألب', cap: 'ف. دي غويا — حنبعل يتأمل إيطاليا، 1771' },
      { img: '/img/oath.jpg', alt: 'بنجامين وست — قسم حنبعل', cap: 'ب. وست — قسم حنبعل الطفل، 1770' }
    ],
    relatedTitle: 'اقرأ أيضًا',
    links: [
      { to: '/hannibal', kick: 'سيرة', title: 'حنبعل برقا', text: 'من قرطاجنة إلى زاما، حياة القائد الذي أرعب روما.', cls: 'tile--purple' },
      { to: '/guerres-puniques', kick: '264 – 146 ق.م', title: 'الحروب البونيقية', text: 'ثلاث حروب وقرن من الصراع على المتوسط.', cls: '' },
      { to: '/armee', kick: 'الجيش', title: 'جيش قرطاج', text: 'الكتيبة المقدسة والليبيون والنوميديون والمقلاعيون والفيلة.', cls: 'tile--terra' },
      { to: '/carte', kick: 'خريطة متحركة', title: 'قرطاج والمتوسط', text: 'الأراضي وحملة حنبعل والرحلات والحلفاء.', cls: 'tile--navy' }
    ]
  }
}

const c = computed(() => C[locale.value] || C.fr)

useHead(() => ({
  title: c.value.metaTitle,
  meta: [{ name: 'description', content: c.value.metaDesc }]
}))
</script>

<style scoped>
/* Héros plein cadre */
.el-hero {
  position: relative;
  border-radius: var(--r-xl);
  overflow: hidden;
  min-height: clamp(520px, 44vw, 640px);
  background: #2A2320;
  color: var(--white);
  display: flex;
  align-items: flex-end;
}
.el-hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.el-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(22, 19, 15, 0.85), rgba(22, 19, 15, 0.2) 60%, rgba(22, 19, 15, 0));
}
[dir="rtl"] .el-shade {
  background: linear-gradient(270deg, rgba(22, 19, 15, 0.85), rgba(22, 19, 15, 0.2) 60%, rgba(22, 19, 15, 0));
}
.el-hero-txt {
  position: relative;
  max-width: 660px;
  padding: clamp(28px, 4vw, 56px);
  padding-bottom: clamp(64px, 5vw, 56px);
}
.el-title { font-size: clamp(44px, 6.6vw, 96px); line-height: 0.88; margin-top: 24px; overflow-wrap: break-word; }
.el-lede { color: #E6DED2; }
.el-credit {
  position: absolute;
  inset-inline-end: 20px;
  bottom: 18px;
  font: 500 12px/1.2 var(--font-body);
  background: rgba(22, 19, 15, 0.6);
  padding: 8px 12px;
  border-radius: 999px;
  max-width: calc(100% - 40px);
}

/* Chiffres */
.nums {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: var(--gap);
  padding: 0 var(--gutter);
}
.num-tile { padding: 22px; border-radius: var(--r-md); }
.num-n { font: 900 clamp(28px, 2.5vw, 36px)/1 var(--font-display); }
.num-tile p { font: 500 13px/1.3 var(--font-body); margin-top: 8px; }

.intro-p { color: var(--ink) !important; }

/* Rhône */
.rhone-fig { background: var(--navy); min-height: clamp(300px, 34vw, 480px); }
.rhone-title { margin-bottom: 20px; }
.rhone-more { margin-top: 14px; }
.rhone-chip { background: var(--navy-deep); color: var(--white); white-space: normal; line-height: 1.2; }

.trio { margin-top: var(--gap); }
.trio-tile { padding: 32px; }

/* Itinéraire */
.route {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 20px;
}
.route::before {
  content: '';
  position: absolute;
  inset-inline: 0;
  top: 15px;
  border-top: 2px dashed var(--ink);
}
.route-step { position: relative; display: flex; flex-direction: column; gap: 12px; }
.route-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--paper);
  border: 2px solid var(--ink);
  display: grid;
  place-items: center;
  font: 700 13px/1 var(--font-body);
  position: relative;
}
.dot--ink { background: var(--ink); border-color: var(--ink); color: var(--white); }
.dot--navy { background: var(--navy); border-color: var(--navy); color: var(--white); }
.dot--terra { background: var(--terra); border-color: var(--terra); color: var(--white); }
.route-when { display: block; font: 700 12px/1 var(--font-body); color: var(--purple); margin-bottom: 8px; }
.route-place { font: 800 22px/1.1 var(--font-display); margin: 0 0 8px; }
.route-text { font: 400 14px/1.5 var(--font-body); color: var(--muted); margin: 0; }
.route-stats { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
.route-stats span {
  font: 500 12px/1.2 var(--font-body);
  background: var(--white);
  border-radius: 999px;
  padding: 7px 10px;
}
.route-stats b { font-weight: 800; }

.sec-head--in { padding-inline: var(--gutter); }

/* Éléphants de guerre */
.bento--flush { padding: 0; }
.surus-title { margin-bottom: 14px; }

/* Batailles */
.battles-title { margin-bottom: 24px; }
.battles { --row-key: 110px; }
.battles .key { color: var(--gold-light); font-size: clamp(18px, 1.6vw, 22px); }
.battles .val { color: var(--on-dark); font-size: 15px; }
.b-name { display: block; color: var(--white); font: 800 18px/1.2 var(--font-display); margin-bottom: 4px; }
.b-res {
  display: inline-block;
  margin-top: 10px;
  font: 600 12px/1 var(--font-body);
  background: rgba(255, 255, 255, 0.12);
  color: var(--white);
  border-radius: 999px;
  padding: 7px 11px;
}
.tact-card { min-height: 320px; }
.tact-text { margin-top: 16px; }
.tact-cta {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 12px 18px;
  border-radius: 999px;
  background: var(--white);
  color: var(--ink);
  font: 600 15px/1 var(--font-body);
}
[dir="rtl"] .flip { display: inline-block; transform: scaleX(-1); }

/* Galerie */
.gal { margin: 0; }
.gal > img { height: 280px; }
.gal figcaption { padding: 14px 8px 4px; font: 500 14px/1.4 var(--font-body); }

/* Liens */
.related-title { margin-bottom: 24px; padding-inline: var(--gutter); }
.link-tile { min-height: 200px; }

/* Responsive */
@media (max-width: 1100px) {
  .nums { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .route { grid-template-columns: repeat(3, minmax(0, 1fr)); row-gap: 36px; }
  .route::before { display: none; }
}

@media (max-width: 960px) {
  .el-shade,
  [dir="rtl"] .el-shade {
    background: linear-gradient(0deg, rgba(22, 19, 15, 0.9), rgba(22, 19, 15, 0.35) 65%, rgba(22, 19, 15, 0.1));
  }
}

@media (max-width: 640px) {
  .el-hero { min-height: 560px; }
  .el-hero-txt { padding: 24px 20px 64px; }
  .el-credit { inset-inline-end: 12px; bottom: 12px; max-width: calc(100% - 24px); }
  .nums { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .num-tile { padding: 18px; }
  .trio-tile { padding: 24px; }
  .sec-head--in, .related-title { padding-inline: 4px; }
  .route { grid-template-columns: minmax(0, 1fr); row-gap: 0; gap: 0; }
  .route::before {
    display: block;
    top: 16px;
    bottom: 16px;
    inset-inline-start: 15px;
    inset-inline-end: auto;
    border-top: 0;
    border-inline-start: 2px dashed var(--ink);
  }
  .route-step { flex-direction: row; gap: 16px; padding-bottom: 24px; }
  .route-dot { flex: none; }
  .battles { --row-key: 1fr; }
  .tact-card { min-height: 0; }
  .gal > img { height: 220px; }
  .link-tile { min-height: 0; }
}
</style>
