<template>
  <div class="pg">
    <!-- Héros -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--navy tile--stack tile--hero s-5">
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display hero-title">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-7" style="background:#1D3F66">
        <img src="/img/ruins.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Chiffres-clés -->
    <div class="cols cols-4">
      <div v-for="(s, i) in c.stats" :key="i" class="tile stat">
        <div class="num" :style="i === 0 ? { color: '#B8492A' } : null">{{ s.n }}</div>
        <p class="stat-text">{{ s.t }}</p>
      </div>
    </div>

    <!-- Frise des époques -->
    <section class="sec">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.eras.kicker }}</span>
          <h2 class="h-section">{{ c.eras.title }}</h2>
        </div>
        <p>{{ c.eras.aside }}</p>
      </div>
      <ol class="eras">
        <li v-for="e in c.eras.items" :key="e.dates" class="tile tile--xl era" :class="e.cls">
          <div class="era-head">
            <span class="kicker">{{ e.kicker }}</span>
            <div class="era-dates">{{ e.dates }}</div>
            <h3 class="h-card era-title">{{ e.title }}</h3>
          </div>
          <div class="rows era-rows" :class="{ 'rows--light': e.dark }" style="--row-key:130px">
            <div v-for="r in e.rows" :key="r.k">
              <span class="key era-key">{{ r.k }}</span>
              <span class="val era-val">{{ r.v }}</span>
            </div>
          </div>
        </li>
      </ol>
    </section>

    <!-- Carthage chrétienne -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <div class="tile tile--xl tile--purple tile--stack chr-intro">
          <div>
            <span class="kicker">{{ c.chr.kicker }}</span>
            <h2 class="h-section chr-title">{{ c.chr.title }}</h2>
            <p class="body-lg">{{ c.chr.intro }}</p>
          </div>
          <div class="rows rows--light" style="--row-key:80px">
            <div v-for="r in c.chr.councils" :key="r.k">
              <span class="key chr-key">{{ r.k }}</span>
              <span class="val chr-val">{{ r.v }}</span>
            </div>
          </div>
        </div>
        <div class="cols cols-2 cols--flush chr-people">
          <div v-for="(p, i) in c.chr.people" :key="p.name" class="tile tile--stack person" :class="i === 3 ? 'tile--paper tile--outline' : ''">
            <span class="kicker">{{ p.dates }}</span>
            <div>
              <h3 class="h-card">{{ p.name }}</h3>
              <p class="body">{{ p.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Survivances -->
    <section class="sec">
      <div class="sec-head">
        <h2 class="h-section">{{ c.surv.title }}</h2>
        <p>
          {{ c.surv.aside }}
          <NuxtLink :to="localePath('/prise-de-carthage')">{{ c.surv.link }} →</NuxtLink>
        </p>
      </div>
      <div class="cols cols-3 cols--flush">
        <div v-for="(s, i) in c.surv.items" :key="s.title" class="tile tile--stack surv" :class="survCls[i]">
          <span class="kicker">{{ s.kicker }}</span>
          <div>
            <h3 class="h-card">{{ s.title }}</h3>
            <p class="body">{{ s.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Qui a fouillé Carthage ? -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.dig.kicker }}</span>
          <h2 class="h-section dig-title">{{ c.dig.title }}</h2>
          <div class="rows" style="--row-key:140px">
            <div v-for="r in c.dig.rows" :key="r.k + r.who">
              <span class="key dig-key">{{ r.k }}</span>
              <span class="val dig-val"><b>{{ r.who }}</b> — {{ r.v }}</span>
            </div>
          </div>
        </div>
        <div class="redisc">
          <figure class="fig redisc-fig" style="background:#8E3720">
            <img src="/img/turner-dido.jpg" :alt="c.redisc.alt" loading="lazy">
            <figcaption>{{ c.redisc.caption }}</figcaption>
          </figure>
          <div class="tile tile--xl tile--paper tile--outline">
            <span class="kicker">{{ c.redisc.kicker }}</span>
            <h3 class="h-block redisc-title">{{ c.redisc.title }}</h3>
            <ul class="redisc-list">
              <li v-for="(p, i) in c.redisc.points" :key="i" class="body">{{ p }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Le site aujourd'hui -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.site.kicker }}</span>
          <h2 class="h-section">{{ c.site.title }}</h2>
        </div>
        <p>{{ c.site.aside }}</p>
      </div>
    </section>
    <div class="bento sites">
      <article v-for="(m, i) in siteCards" :key="m.img" class="card-img site" :class="i < 2 ? 's-6' : 's-4'">
        <img :src="m.img" :alt="m.alt" loading="lazy">
        <div class="card-body">
          <div class="chips site-chips">
            <span v-for="ch in m.chips" :key="ch" class="chip">{{ ch }}</span>
          </div>
          <h3 class="h-card site-name">{{ m.name }}</h3>
          <p>{{ m.text }}</p>
          <NuxtLink v-if="m.to" :to="localePath(m.to)" class="site-more">{{ m.toLabel }} →</NuxtLink>
        </div>
      </article>
    </div>
    <div class="cols cols-4">
      <div v-for="m in c.site.minor" :key="m.name" class="tile tile--stack minor">
        <span class="kicker">{{ m.kicker }}</span>
        <div>
          <h3 class="h-card">{{ m.name }}</h3>
          <p class="body small">{{ m.text }}</p>
        </div>
      </div>
    </div>
    <section class="sec visit-sec">
      <div class="tile tile--xl tile--sand visit">
        <span class="kicker">{{ c.site.visitKicker }}</span>
        <p class="body-lg">{{ c.site.visit }}</p>
      </div>
    </section>

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <h2 class="h-section related-title">{{ c.relatedTitle }}</h2>
    </section>
    <div class="cols cols-4">
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

const survCls = ['', 'tile--gold', '', 'tile--sand', '', 'tile--navy']

const SITE_IMG = [
  { img: '/img/baths.jpg' },
  { img: '/img/punic-quarter.jpg', to: '/fondation' },
  { img: '/img/ports.jpg', to: '/economie' },
  { img: '/img/tophet.jpg', to: '/religion' },
  { img: '/img/dominus.jpg' }
]

const C = {
  fr: {
    meta: {
      title: 'Carthage après Carthage — de la colonie romaine à aujourd\'hui',
      desc: "Après 146 av. J.-C. : Carthage romaine, vandale et byzantine, la conquête arabe, les siècles de pillage des marbres, la redécouverte, les fouilles et le site archéologique d'aujourd'hui."
    },
    hero: {
      chip: '146 av. J.-C. → aujourd\'hui',
      title: 'Carthage après Carthage',
      lede: "La ville punique a brûlé en 146. Sur ses ruines, une autre Carthage a vécu sept siècles, puis s'est éteinte, a servi de carrière, avant de renaître en commune et en patrimoine mondial.",
      alt: "Ruines des thermes d'Antonin au bord du golfe de Tunis",
      caption: "Thermes d'Antonin, IIe siècle — Carthage romaine au bord du golfe"
    },
    stats: [
      { n: '7 siècles', t: 'de ville romaine, vandale puis byzantine, de 29 av. J.-C. à 698' },
      { n: '30 000', t: "places dans l'amphithéâtre romain, dont seule l'arène subsiste" },
      { n: '1979', t: "inscription du site archéologique au patrimoine mondial de l'UNESCO" },
      { n: '17 010', t: "habitants dans la commune de Carthage au recensement de 2014" }
    ],
    eras: {
      kicker: 'Frise des époques',
      title: 'Vingt-deux siècles sur la même colline',
      aside: "Chaque époque a bâti sur la précédente, ou avec ses pierres.",
      items: [
        {
          cls: 'tile--purple', dark: true, kicker: 'Époque romaine', dates: '29 av. J.-C. – 439', title: 'Carthage refondée',
          rows: [
            { k: '122 av. J.-C.', v: "Caius Gracchus tente d'installer une colonie, Junonia, près du site maudit ; le projet meurt avec lui." },
            { k: '44 – 29 av. J.-C.', v: "Décidée par César, la refondation se fait sous Auguste : la Colonia Iulia Concordia Carthago s'élève sur le site même de la ville punique." },
            { k: 'Ier s.', v: "Capitale de l'Afrique proconsulaire. Le sommet de Byrsa est arasé pour recevoir le forum." },
            { k: '145 – 162', v: "Après un grand incendie, les thermes d'Antonin sont construits en bord de mer (Colette Picard)." },
            { k: 'IIIe – IVe s.', v: "Gagnée au christianisme, la ville traverse les persécutions et devient l'un des grands centres spirituels de l'Occident latin." }
          ]
        },
        {
          cls: 'tile--terra', dark: true, kicker: 'Royaume vandale', dates: '439 – 533', title: 'La capitale de Genséric',
          rows: [
            { k: '439', v: "Les Vandales de Genséric s'emparent de Carthage et y installent le siège de leur royaume." },
            { k: '455', v: "C'est de Carthage que part la flotte vandale qui pille Rome." },
            { k: 'Ve s.', v: "Ariens, les rois vandales s'en prennent à l'Église catholique d'Afrique : évêques exilés, églises confisquées." }
          ]
        },
        {
          cls: 'tile--gold', dark: false, kicker: 'Époque byzantine', dates: '533 – 698', title: "Le retour de l'Empire",
          rows: [
            { k: '533', v: "Bélisaire, général de Justinien, reprend la ville, qui redevient une capitale prospère et le siège du gouvernement de l'Afrique." },
            { k: 'Fin VIe s.', v: "L'Afrique byzantine est confiée à un exarque, gouverneur à la fois civil et militaire, installé à Carthage." },
            { k: '610', v: "Héraclius, fils de l'exarque de Carthage, fait voile vers Constantinople, prend le trône et y fonde une dynastie." }
          ]
        },
        {
          cls: 'tile--olive', dark: true, kicker: 'Conquête arabe', dates: '698', title: 'Tunis prend le relais',
          rows: [
            { k: '698', v: "Hassan Ibn Numan prend la ville (Grimal). Pillée et incendiée, elle est vidée de ses habitants, transférés à Tunis." },
            { k: 'VIIIe s.', v: "Tunis devient la ville principale et donnera son nom au pays ; le nom d'Africa, devenu Ifriqiya, finira par désigner tout le continent." },
            { k: 'Xe s.', v: "Après près de deux siècles d'abandon, le site recommence à être habité à l'époque fatimide, selon Gibbon." }
          ]
        },
        {
          cls: 'tile--sand', dark: false, kicker: 'Moyen Âge – XVIIIe siècle', dates: 'IXe – XIXe s.', title: 'Une carrière de marbre',
          rows: [
            { k: 'Remplois', v: "Colonnes, chapiteaux et plaques de marbre sont démontés pour bâtir mosquées, palais et églises : à Kairouan, à Tunis, et jusqu'en Europe." },
            { k: '1270', v: "Saint Louis débarque à Carthage pendant la huitième croisade et meurt de dysenterie devant Tunis. L'échec de l'expédition clôt l'ère des croisades." },
            { k: 'XVIe s.', v: "Le village de l'époque — une mosquée, un collège, une vingtaine de boutiques et quelque 500 paysans — est ruiné par la garnison espagnole de La Goulette, installée par Charles Quint." },
            { k: 'XVIIIe s.', v: "Deux hameaux agricoles seulement occupent l'ancienne capitale : Douar Chott et La Malga." }
          ]
        },
        {
          cls: 'tile--navy', dark: true, kicker: 'Beylicat et protectorat', dates: '1830 – 1956', title: 'Villégiature, cathédrale et fouilles',
          rows: [
            { k: '1830', v: "Le bey cède à la France un terrain sur Byrsa. Louis-Philippe y envoie un architecte chercher le lieu de la mort de Saint Louis : faute de le trouver, celui-ci retient le plus beau point de vue, où une chapelle est élevée." },
            { k: 'XIXe s.', v: "Les dignitaires du beylicat en font leur lieu d'été : palais de Mustapha Khaznadar à Salammbô, palais Zarrouk, palais de Mustapha Ben Ismaïl (Revault)." },
            { k: '1884 – 1890', v: "Sous le protectorat français, la cathédrale Saint-Louis couronne Byrsa ; elle devient primatiale d'Afrique pour le cardinal Lavigerie." },
            { k: '1919', v: "Un décret beylical du 15 juin crée la municipalité de Carthage." },
            { k: '1928 – 1929', v: "Le Corbusier bâtit la villa Baizeau, sa seule œuvre en Tunisie." }
          ]
        },
        {
          cls: 'tile--ink', dark: true, kicker: 'Tunisie indépendante', dates: "1956 – aujourd'hui", title: 'Commune et patrimoine mondial',
          rows: [
            { k: '1960', v: "Bourguiba choisit une villa de l'époque coloniale, au bord de la mer, pour en faire le palais présidentiel." },
            { k: '1972', v: "Face à l'urbanisation, l'UNESCO lance une grande campagne internationale pour sauver Carthage." },
            { k: '1979', v: "Le site archéologique est inscrit au patrimoine mondial." },
            { k: '1985', v: "Les maires de Rome et de Carthage, Ugo Vetere et Chedli Klibi, signent un traité de paix symbolique qui met fin à la troisième guerre punique." },
            { k: '2003', v: "Inauguration de la mosquée Mâlik ibn Anas sur la colline de l'Odéon." }
          ]
        }
      ]
    },
    chr: {
      kicker: 'IIe – Ve siècle',
      title: 'Carthage chrétienne',
      intro: "Métropole de l'Afrique romaine, Carthage devient l'un des foyers du christianisme latin : ses auteurs façonnent la langue théologique de l'Occident et ses évêques réunissent de nombreux conciles.",
      councils: [
        { k: '397', v: "Un concile de Carthage arrête la liste des livres de la Bible reconnus par l'Église d'Afrique." },
        { k: '411', v: "La conférence de Carthage réunit plus de 500 évêques catholiques et donatistes ; le commissaire impérial Marcellinus condamne le donatisme." },
        { k: '484', v: "Le roi vandale Hunéric convoque évêques catholiques et ariens : la rencontre ouvre une nouvelle persécution." }
      ],
      people: [
        { name: 'Tertullien', dates: 'v. 155 – v. 220', text: "Né à Carthage, premier grand écrivain chrétien de langue latine. Son Apologétique plaide la cause des chrétiens face aux accusations païennes." },
        { name: 'Perpétue et Félicité', dates: '203', text: "Une jeune femme noble et son esclave, martyrisées dans l'amphithéâtre de Carthage. Le récit de leur passion reprend le journal de Perpétue." },
        { name: 'Cyprien', dates: '† 258', text: "Évêque de Carthage vers 249, il dirige son Église pendant la persécution de Dèce, puis est décapité sous Valérien." },
        { name: 'Augustin', dates: '354 – 430', text: "Né à Thagaste, il étudie puis enseigne la rhétorique à Carthage. Évêque d'Hippone, il y revient souvent pour prêcher et siéger aux conciles." }
      ]
    },
    surv: {
      title: 'Ce qui a survécu à Rome',
      aside: "Langue punique, suffètes et dieux rebaptisés : voir aussi",
      link: 'la prise de Carthage',
      items: [
        { kicker: 'Architecture', title: "L'opus africanum", text: "Cette maçonnerie à harpes de pierre, déjà présente à Kerkouane, se retrouve à l'époque romaine jusque dans le Capitole de Dougga." },
        { kicker: 'Art', title: 'Les mosaïstes africains', text: "Servis par de beaux marbres, les ateliers d'Afrique diffusent dans tout l'Empire leurs bestiaires et leurs scènes mythologiques." },
        { kicker: 'Cultes', title: 'Des sanctuaires néopuniques', text: "Thinissut, Bou Kornine, El Hofra près de Cirta, stèles « de la Ghorfa » : le Saturne africain, héritier de Baal, reste vénéré jusqu'au début du IVe siècle (Lancel)." },
        { kicker: 'Institutions', title: 'Des suffètes, parfois trois', text: "Des cités romaines d'Afrique élisent encore des suffètes au IIe siècle ; certaines en comptent trois, ce que des sémitisants lisent comme un apport berbère (Lipinski)." },
        { kicker: 'Livres', title: 'Les bibliothèques puniques', text: "Remises aux rois numides en 146, elles auraient servi à Salluste pour sa Guerre de Jugurtha ; le point reste discuté, et à l'époque d'Augustin elles ne sont plus qu'un souvenir." },
        { kicker: 'Langue', title: "Un pont vers l'arabe ?", text: "Pour Stéphane Gsell, puis M'hamed Hassine Fantar, la longue survie d'une langue sémitique a pu faciliter l'arabisation du Maghreb." }
      ]
    },
    dig: {
      kicker: 'Archéologie',
      title: 'Qui a fouillé Carthage ?',
      rows: [
        { k: '1833', who: 'Christian Tuxen Falbe', v: "le consul du Danemark dresse le premier plan précis des ruines." },
        { k: '1859', who: 'Charles-Ernest Beulé', v: "il sonde la colline de Byrsa et les ports, à la recherche de la ville punique." },
        { k: 'Dès 1875', who: 'Le père Delattre', v: "ce Père blanc fouille pendant des décennies nécropoles puniques et basiliques ; ses collections sont à l'origine du musée national de Carthage." },
        { k: '1892 – 1905', who: 'Paul Gauckler', v: "directeur des antiquités de la Régence, il explore notamment les nécropoles puniques." },
        { k: '1921', who: 'Le tophet', v: "découverte du sanctuaire de Salammbô, fouillé dans les années suivantes." },
        { k: 'Après 1956', who: "L'école tunisienne", v: "M'hamed Hassine Fantar, Abdelmajid Ennabli, Azedine Beschaouch… qui alerte l'opinion sur la menace que l'urbanisation fait peser sur le site." },
        { k: '1972 – 1995', who: 'Pour sauver Carthage', v: "campagne internationale de l'UNESCO : Allemands (F. Rakob, rempart du Ve s. av. J.-C. et quartier du bord de mer), Américains (L. Stager, tophet et port marchand), Britanniques (H. Hurst, îlot de l'Amirauté), Français (S. Lancel, quartier punique de Byrsa)…" }
      ]
    },
    redisc: {
      kicker: 'Redécouverte',
      title: 'Carthage réinventée',
      alt: 'Didon construisant Carthage, tableau de Turner',
      caption: 'Turner, Didon construisant Carthage, 1815 — National Gallery, Londres',
      points: [
        "XVIIe siècle : la Geographia sacra de Samuel Bochart s'intéresse au rôle des Phéniciens ; au XVIIIe, la stèle de Nora, en Sardaigne, passionne les savants.",
        "1817 : Turner expose Le Déclin de l'empire carthaginois, pendant de sa Didon ; il consacrera une dizaine de grandes toiles au sujet.",
        "1920 : Stéphane Gsell juge sévèrement l'art carthaginois ; l'archéologie du second XXe siècle a largement nuancé ce verdict (Lancel).",
        "Bourguiba fait de la reine fondatrice une figure du sentiment national ; de grandes expositions (palais Grassi 1988, Institut du monde arabe 2007-2008) popularisent Carthage."
      ]
    },
    site: {
      kicker: 'Patrimoine mondial',
      title: "Le site archéologique aujourd'hui",
      aside: "Des vestiges surtout romains, avec des îlots puniques, semés dans une ville résidentielle.",
      cards: [
        { chips: ['IIe s.', 'Bord de mer'], name: "Thermes d'Antonin", alt: "Les thermes d'Antonin", text: "Élevés entre 145 et 162, après un grand incendie, parmi les plus vastes de l'Empire romain. Seul le niveau inférieur, celui des salles de service, est conservé (Ennabli et Slim)." },
        { chips: ['Punique · romain', 'Musée national'], name: 'Colline de Byrsa', alt: 'Quartier punique de la colline de Byrsa', text: "Sous le forum romain, un quartier d'habitations du début du IIe s. av. J.-C. : boutique sur rue, citerne en sous-sol, couloir vers une cour (Lipinski). Au sommet, le musée national et l'Acropolium, l'ancienne cathédrale.", toLabel: 'La fondation' },
        { chips: ['Salammbô'], name: 'Les ports puniques', alt: 'Les lagunes des ports puniques', text: "Deux lagunes gardent la forme des bassins : le port marchand et le port militaire circulaire avec son îlot de l'Amirauté (Stager, Hurst).", toLabel: "L'économie" },
        { chips: ['Salammbô', 'Débat ouvert'], name: 'Le tophet', alt: 'Stèles du tophet de Salammbô', text: "Enclos sacré de Tanit et de Baal Hammon. La thèse des sacrifices d'enfants, longtemps admise, est contestée par des spécialistes comme Sabatino Moscati.", toLabel: 'La religion' },
        { chips: ["Colline de l'Odéon", 'Bardo'], name: 'Le parc des villas romaines', alt: 'Mosaïque du Dominus Julius, trouvée à Carthage (musée du Bardo)', text: "Près du théâtre, la « villa de la volière » doit son nom à sa mosaïque. Les grandes mosaïques de Carthage, comme celle du Dominus Julius, sont au musée du Bardo." }
      ],
      minor: [
        { kicker: 'IIe s.', name: 'Le théâtre', text: "Conçu pour environ 5 000 spectateurs, il n'était plus qu'une ruine au début du XXe siècle ; largement restauré, il accueille le Festival international de Carthage." },
        { kicker: '30 000 places', name: "L'amphithéâtre", text: "Seule l'arène a résisté à plus de mille ans de pillage. Perpétue et Félicité y furent martyrisées en 203." },
        { kicker: 'Douar Chott', name: 'Le cirque', text: "Il n'en reste qu'une longue dépression dans le paysage." },
        { kicker: 'La Malga', name: 'Les citernes', text: "Immenses réservoirs romains au bout de l'aqueduc de Zaghouan. Tout près, le cimetière des officiales, employés du proconsul (Le Bohec)." }
      ],
      visitKicker: 'Visiter',
      visit: "La principale difficulté est la dispersion : les vestiges forment des îlots au milieu des villas et des jardins. Le TGM, qui traverse la commune (stations Salammbô, Byrsa, Dermech, Hannibal…), permet de passer d'un pôle à l'autre."
    },
    relatedTitle: 'À lire aussi',
    related: [
      { to: '/prise-de-carthage', kick: '149 – 146 av. J.-C.', title: 'La prise de Carthage', text: 'Le siège, la chute de Byrsa, et le mythe du sel.', cls: 'tile--terra' },
      { to: '/lieux', kick: 'Lieux', title: 'Sur les traces de Carthage', text: 'De Kerkouane à Carthagène, les sites à visiter.', cls: '' },
      { to: '/tunisie', kick: "Aujourd'hui", title: 'Carthage vit en Tunisie', text: 'Le nom de l\'Afrique, la commune, les festivals.', cls: 'tile--purple' },
      { to: '/histoire-des-vainqueurs', kick: 'Sources', title: "L'histoire écrite par le vainqueur", text: 'Ce que Rome a raconté, ce que l\'on sait.', cls: '' }
    ]
  },

  en: {
    meta: {
      title: 'Carthage after Carthage — from Roman colony to today',
      desc: 'After 146 BC: Roman, Vandal and Byzantine Carthage, the Arab conquest, centuries of marble looting, rediscovery, excavations and the archaeological site today.'
    },
    hero: {
      chip: '146 BC → today',
      title: 'Carthage after Carthage',
      lede: 'The Punic city burned in 146. On its ruins another Carthage lived for seven centuries, faded away, served as a quarry, and was reborn as a town and a World Heritage site.',
      alt: 'Ruins of the Antonine Baths on the Gulf of Tunis',
      caption: 'Antonine Baths, 2nd century — Roman Carthage by the gulf'
    },
    stats: [
      { n: '7 centuries', t: 'as a Roman, Vandal and Byzantine city, from 29 BC to 698' },
      { n: '30,000', t: 'seats in the Roman amphitheatre, of which only the arena survives' },
      { n: '1979', t: 'the archaeological site joins the UNESCO World Heritage List' },
      { n: '17,010', t: 'inhabitants in the municipality of Carthage (2014 census)' }
    ],
    eras: {
      kicker: 'Timeline of the ages',
      title: 'Twenty-two centuries on the same hill',
      aside: 'Each age built on top of the last one, or with its stones.',
      items: [
        {
          cls: 'tile--purple', dark: true, kicker: 'Roman era', dates: '29 BC – 439', title: 'Carthage refounded',
          rows: [
            { k: '122 BC', v: 'Gaius Gracchus tries to settle a colony, Junonia, near the cursed site; the project dies with him.' },
            { k: '44 – 29 BC', v: 'Decided by Caesar, the refoundation is carried out under Augustus: Colonia Iulia Concordia Carthago rises on the very site of the Punic city.' },
            { k: '1st c.', v: 'Capital of Africa Proconsularis. The top of Byrsa is levelled to carry the forum.' },
            { k: '145 – 162', v: 'After a great fire, the Antonine Baths are built by the sea (Colette Picard).' },
            { k: '3rd – 4th c.', v: 'Won over to Christianity, the city lives through the persecutions and becomes one of the great spiritual centres of the Latin West.' }
          ]
        },
        {
          cls: 'tile--terra', dark: true, kicker: 'Vandal kingdom', dates: '439 – 533', title: "Genseric's capital",
          rows: [
            { k: '439', v: "Genseric's Vandals seize Carthage and make it the seat of their kingdom." },
            { k: '455', v: 'The Vandal fleet that sacks Rome sails from Carthage.' },
            { k: '5th c.', v: 'The Arian Vandal kings turn on the Catholic Church of Africa: bishops exiled, churches confiscated.' }
          ]
        },
        {
          cls: 'tile--gold', dark: false, kicker: 'Byzantine era', dates: '533 – 698', title: 'The Empire returns',
          rows: [
            { k: '533', v: "Belisarius, Justinian's general, retakes the city, which becomes again a prosperous capital and the seat of the government of Africa." },
            { k: 'Late 6th c.', v: 'Byzantine Africa is entrusted to an exarch, both civil and military governor, based in Carthage.' },
            { k: '610', v: 'Heraclius, son of the exarch of Carthage, sails to Constantinople, takes the throne and founds a dynasty there.' }
          ]
        },
        {
          cls: 'tile--olive', dark: true, kicker: 'Arab conquest', dates: '698', title: 'Tunis takes over',
          rows: [
            { k: '698', v: 'Hassan ibn al-Nu‘man takes the city (Grimal). Looted and burned, it is emptied of its people, who are moved to Tunis.' },
            { k: '8th c.', v: 'Tunis becomes the main city and will give the country its name; the name Africa, turned Ifriqiya, will end up designating the whole continent.' },
            { k: '10th c.', v: 'After nearly two centuries of abandonment, the site is settled again in the Fatimid period, according to Gibbon.' }
          ]
        },
        {
          cls: 'tile--sand', dark: false, kicker: 'Middle Ages – 18th century', dates: '9th – 19th c.', title: 'A marble quarry',
          rows: [
            { k: 'Spolia', v: 'Columns, capitals and marble slabs are stripped to build mosques, palaces and churches: in Kairouan, in Tunis, and as far as Europe.' },
            { k: '1270', v: 'Saint Louis lands at Carthage during the Eighth Crusade and dies of dysentery before Tunis. The failure of the expedition closes the age of the Crusades.' },
            { k: '16th c.', v: 'The village of the time — a mosque, a college, some twenty shops and about 500 peasants — is ruined by the Spanish garrison of La Goulette, installed by Charles V.' },
            { k: '18th c.', v: 'Only two farming hamlets occupy the former capital: Douar Chott and La Malga.' }
          ]
        },
        {
          cls: 'tile--navy', dark: true, kicker: 'Beylik and protectorate', dates: '1830 – 1956', title: 'Summer palaces, a cathedral and excavations',
          rows: [
            { k: '1830', v: 'The bey grants France a plot on Byrsa. Louis-Philippe sends an architect to find where Saint Louis died: unable to, he picks the finest viewpoint, where a chapel is built.' },
            { k: '19th c.', v: "Dignitaries of the beylik make it their summer retreat: Mustapha Khaznadar's palace in Salammbô, the Zarrouk palace, Mustapha Ben Ismaïl's palace (Revault)." },
            { k: '1884 – 1890', v: 'Under the French protectorate, the Cathedral of Saint Louis crowns Byrsa; it becomes the primatial church of Africa for Cardinal Lavigerie.' },
            { k: '1919', v: 'A beylical decree of 15 June creates the municipality of Carthage.' },
            { k: '1928 – 1929', v: 'Le Corbusier builds the Villa Baizeau, his only work in Tunisia.' }
          ]
        },
        {
          cls: 'tile--ink', dark: true, kicker: 'Independent Tunisia', dates: '1956 – today', title: 'A town and a World Heritage site',
          rows: [
            { k: '1960', v: 'Bourguiba chooses a colonial-era villa by the sea to become the presidential palace.' },
            { k: '1972', v: 'As the city spreads, UNESCO launches a major international campaign to save Carthage.' },
            { k: '1979', v: 'The archaeological site is inscribed on the World Heritage List.' },
            { k: '1985', v: 'The mayors of Rome and Carthage, Ugo Vetere and Chedli Klibi, sign a symbolic peace treaty ending the Third Punic War.' },
            { k: '2003', v: 'The Malik ibn Anas Mosque opens on the Odeon Hill.' }
          ]
        }
      ]
    },
    chr: {
      kicker: '2nd – 5th century',
      title: 'Christian Carthage',
      intro: 'As the metropolis of Roman Africa, Carthage becomes one of the hearths of Latin Christianity: its writers shape the theological language of the West and its bishops hold many councils.',
      councils: [
        { k: '397', v: 'A council of Carthage settles the list of biblical books recognised by the Church of Africa.' },
        { k: '411', v: 'The Conference of Carthage gathers over 500 Catholic and Donatist bishops; the imperial commissioner Marcellinus condemns Donatism.' },
        { k: '484', v: 'The Vandal king Huneric summons Catholic and Arian bishops: the meeting opens a new persecution.' }
      ],
      people: [
        { name: 'Tertullian', dates: 'c. 155 – c. 220', text: 'Born in Carthage, the first great Christian writer in Latin. His Apology pleads the Christian cause against pagan accusations.' },
        { name: 'Perpetua and Felicity', dates: '203', text: 'A young noblewoman and her slave, martyred in the amphitheatre of Carthage. The account of their passion draws on Perpetua’s own diary.' },
        { name: 'Cyprian', dates: '† 258', text: 'Bishop of Carthage from about 249, he leads his Church through the persecution of Decius and is beheaded under Valerian.' },
        { name: 'Augustine', dates: '354 – 430', text: 'Born in Thagaste, he studies and then teaches rhetoric in Carthage. As bishop of Hippo, he often returns to preach and sit in councils.' }
      ]
    },
    surv: {
      title: 'What outlived Rome',
      aside: 'The Punic language, the sufetes and renamed gods: see also',
      link: 'the fall of Carthage',
      items: [
        { kicker: 'Architecture', title: 'Opus africanum', text: 'This masonry with stone piers, already found at Kerkouane, reappears in the Roman period, even in the Capitol of Dougga.' },
        { kicker: 'Art', title: 'The African mosaicists', text: 'With fine local marbles, the workshops of Africa spread their bestiaries and mythological scenes throughout the Empire.' },
        { kicker: 'Cults', title: 'Neo-Punic sanctuaries', text: 'Thinissut, Bou Kornine, El Hofra near Cirta, the “Ghorfa” stelae: African Saturn, heir to Baal, is worshipped until the early 4th century (Lancel).' },
        { kicker: 'Institutions', title: 'Sufetes, sometimes three', text: 'Roman towns in Africa still elect sufetes in the 2nd century; some have three, which some Semitists read as a Berber contribution (Lipinski).' },
        { kicker: 'Books', title: 'The Punic libraries', text: 'Handed to the Numidian kings in 146, they may have been used by Sallust for his Jugurthine War; the point is debated, and by Augustine’s time they are only a memory.' },
        { kicker: 'Language', title: 'A bridge to Arabic?', text: 'For Stéphane Gsell, and later M’hamed Hassine Fantar, the long survival of a Semitic language may have eased the Arabisation of the Maghreb.' }
      ]
    },
    dig: {
      kicker: 'Archaeology',
      title: 'Who excavated Carthage?',
      rows: [
        { k: '1833', who: 'Christian Tuxen Falbe', v: 'the Danish consul draws the first accurate plan of the ruins.' },
        { k: '1859', who: 'Charles-Ernest Beulé', v: 'he digs soundings on Byrsa Hill and at the ports, looking for the Punic city.' },
        { k: 'From 1875', who: 'Father Delattre', v: 'this White Father excavates Punic cemeteries and basilicas for decades; his collections are the origin of the National Museum of Carthage.' },
        { k: '1892 – 1905', who: 'Paul Gauckler', v: 'director of antiquities of the Regency, he explores in particular the Punic cemeteries.' },
        { k: '1921', who: 'The tophet', v: 'discovery of the Salammbô sanctuary, excavated in the following years.' },
        { k: 'After 1956', who: 'The Tunisian school', v: 'M’hamed Hassine Fantar, Abdelmajid Ennabli, Azedine Beschaouch… who alerts the public to the threat that building poses to the site.' },
        { k: '1972 – 1995', who: 'Save Carthage', v: 'UNESCO’s international campaign: Germans (F. Rakob, 5th-century BC rampart and seaside quarter), Americans (L. Stager, tophet and merchant harbour), British (H. Hurst, Admiralty island), French (S. Lancel, Punic quarter of Byrsa)…' }
      ]
    },
    redisc: {
      kicker: 'Rediscovery',
      title: 'Carthage reimagined',
      alt: 'Dido Building Carthage, painting by Turner',
      caption: 'Turner, Dido Building Carthage, 1815 — National Gallery, London',
      points: [
        '17th century: Samuel Bochart’s Geographia sacra takes an interest in the role of the Phoenicians; in the 18th, the Nora Stone in Sardinia fascinates scholars.',
        '1817: Turner exhibits The Decline of the Carthaginian Empire, companion to his Dido; he devotes about ten major canvases to the subject.',
        '1920: Stéphane Gsell judges Carthaginian art harshly; archaeology in the later 20th century has largely nuanced that verdict (Lancel).',
        'Bourguiba makes the founding queen a figure of national feeling; major exhibitions (Palazzo Grassi 1988, Institut du monde arabe 2007–2008) bring Carthage to a wide public.'
      ]
    },
    site: {
      kicker: 'World Heritage',
      title: 'The archaeological site today',
      aside: 'Mostly Roman remains, with Punic islands, scattered across a residential town.',
      cards: [
        { chips: ['2nd c.', 'Seafront'], name: 'Antonine Baths', alt: 'The Antonine Baths', text: 'Built between 145 and 162 after a great fire, among the largest in the Roman Empire. Only the lower level, the service rooms, survives (Ennabli and Slim).' },
        { chips: ['Punic · Roman', 'National Museum'], name: 'Byrsa Hill', alt: 'The Punic quarter on Byrsa Hill', text: 'Beneath the Roman forum, a residential quarter from the early 2nd century BC: shop on the street, cistern below, corridor to a courtyard (Lipinski). On top, the National Museum and the Acropolium, the former cathedral.', toLabel: 'The foundation' },
        { chips: ['Salammbô'], name: 'The Punic ports', alt: 'The lagoons of the Punic ports', text: 'Two lagoons keep the shape of the basins: the merchant harbour and the circular naval harbour with its Admiralty island (Stager, Hurst).', toLabel: 'The economy' },
        { chips: ['Salammbô', 'Open debate'], name: 'The tophet', alt: 'Stelae of the Salammbô tophet', text: 'Sacred enclosure of Tanit and Baal Hammon. The long-held theory of child sacrifice is challenged by specialists such as Sabatino Moscati.', toLabel: 'Religion' },
        { chips: ['Odeon Hill', 'Bardo'], name: 'Park of the Roman villas', alt: 'Dominus Julius mosaic, found in Carthage (Bardo Museum)', text: 'Near the theatre, the “Villa of the Aviary” is named after its mosaic. The great mosaics of Carthage, such as the Dominus Julius, are in the Bardo Museum.' }
      ],
      minor: [
        { kicker: '2nd c.', name: 'The theatre', text: 'Built for about 5,000 spectators, it was little more than a ruin in the early 20th century; heavily restored, it hosts the Carthage International Festival.' },
        { kicker: '30,000 seats', name: 'The amphitheatre', text: 'Only the arena has survived more than a thousand years of looting. Perpetua and Felicity were martyred there in 203.' },
        { kicker: 'Douar Chott', name: 'The circus', text: 'All that remains is a long hollow in the landscape.' },
        { kicker: 'La Malga', name: 'The cisterns', text: 'Huge Roman reservoirs at the end of the Zaghouan aqueduct. Nearby lies the cemetery of the officiales, the proconsul’s staff (Le Bohec).' }
      ],
      visitKicker: 'Visiting',
      visit: 'The main difficulty is dispersion: the remains form islands among villas and gardens. The TGM train, which crosses the town (Salammbô, Byrsa, Dermech, Hannibal stations…), takes you from one area to the next.'
    },
    relatedTitle: 'Read also',
    related: [
      { to: '/prise-de-carthage', kick: '149 – 146 BC', title: 'The fall of Carthage', text: 'The siege, the fall of Byrsa, and the salt myth.', cls: 'tile--terra' },
      { to: '/lieux', kick: 'Places', title: 'In the footsteps of Carthage', text: 'From Kerkouane to Cartagena, the sites to visit.', cls: '' },
      { to: '/tunisie', kick: 'Today', title: 'Carthage lives in Tunisia', text: 'The name of Africa, the town, the festivals.', cls: 'tile--purple' },
      { to: '/histoire-des-vainqueurs', kick: 'Sources', title: 'History written by the victor', text: 'What Rome told, what we know.', cls: '' }
    ]
  },

  ar: {
    meta: {
      title: 'قرطاج بعد قرطاج — من المستعمرة الرومانية إلى اليوم',
      desc: 'ما بعد 146 ق.م: قرطاج الرومانية والوندالية والبيزنطية، والفتح العربي، وقرون نهب الرخام، وإعادة الاكتشاف، والحفريات، والموقع الأثري اليوم.'
    },
    hero: {
      chip: '146 ق.م ← اليوم',
      title: 'قرطاج بعد قرطاج',
      lede: 'احترقت المدينة البونية سنة 146. وعلى أنقاضها عاشت قرطاج أخرى سبعة قرون، ثم خبت وصارت مقلعًا للحجارة، قبل أن تولد من جديد بلديةً وموقعًا من التراث العالمي.',
      alt: 'أطلال حمّامات أنطونيوس على خليج تونس',
      caption: 'حمّامات أنطونيوس، القرن الثاني — قرطاج الرومانية على الخليج'
    },
    stats: [
      { n: '7 قرون', t: 'مدينةً رومانية ثم وندالية ثم بيزنطية، من 29 ق.م إلى 698' },
      { n: '30000', t: 'مقعد في المدرّج الروماني، لم يبقَ منه إلا الحلبة' },
      { n: '1979', t: 'تسجيل الموقع الأثري في قائمة التراث العالمي لليونسكو' },
      { n: '17010', t: 'ساكنًا في بلدية قرطاج حسب تعداد 2014' }
    ],
    eras: {
      kicker: 'شريط العصور',
      title: 'اثنان وعشرون قرنًا على الهضبة نفسها',
      aside: 'كل عصر بنى فوق سابقه، أو بحجارته.',
      items: [
        {
          cls: 'tile--purple', dark: true, kicker: 'العصر الروماني', dates: '29 ق.م – 439', title: 'قرطاج تُبعث من جديد',
          rows: [
            { k: '122 ق.م', v: 'يحاول غايوس غراكوس إقامة مستعمرة باسم يونونيا قرب الموقع الملعون، فيموت المشروع بموته.' },
            { k: '44 – 29 ق.م', v: 'قرّر قيصر إعادة التأسيس ونُفّذت في عهد أغسطس: تقوم «كولونيا يوليا كونكورديا قرطاجو» على موقع المدينة البونية ذاته.' },
            { k: 'القرن 1', v: 'عاصمة ولاية إفريقية البروقنصلية. تُسوّى قمة بيرصا لتحمل الساحة العامة (الفوروم).' },
            { k: '145 – 162', v: 'بعد حريق كبير تُشيَّد حمّامات أنطونيوس على شاطئ البحر (كوليت بيكار).' },
            { k: 'القرنان 3 – 4', v: 'تعتنق المدينة المسيحية وتمرّ بالاضطهادات، ثم تصبح من كبرى المراكز الروحية في الغرب اللاتيني.' }
          ]
        },
        {
          cls: 'tile--terra', dark: true, kicker: 'المملكة الوندالية', dates: '439 – 533', title: 'عاصمة جنسريق',
          rows: [
            { k: '439', v: 'يستولي الوندال بقيادة جنسريق على قرطاج ويجعلونها مقرّ مملكتهم.' },
            { k: '455', v: 'من قرطاج ينطلق الأسطول الوندالي الذي ينهب روما.' },
            { k: 'القرن 5', v: 'ملوك الوندال الآريوسيون يضطهدون الكنيسة الكاثوليكية في إفريقية: نفي الأساقفة ومصادرة الكنائس.' }
          ]
        },
        {
          cls: 'tile--gold', dark: false, kicker: 'العصر البيزنطي', dates: '533 – 698', title: 'عودة الإمبراطورية',
          rows: [
            { k: '533', v: 'يستعيد بليزاريوس، قائد جستنيان، المدينة، فتعود عاصمةً مزدهرة ومقرًّا لحكم إفريقية.' },
            { k: 'أواخر القرن 6', v: 'تُسند إفريقية البيزنطية إلى إكسرخوس، حاكم مدني وعسكري معًا، مقيم بقرطاج.' },
            { k: '610', v: 'هرقل، ابن إكسرخوس قرطاج، يبحر إلى القسطنطينية ويعتلي العرش ويؤسّس فيها سلالة.' }
          ]
        },
        {
          cls: 'tile--olive', dark: true, kicker: 'الفتح العربي', dates: '698', title: 'تونس تتسلّم المشعل',
          rows: [
            { k: '698', v: 'يفتح حسان بن النعمان المدينة (غريمال). تُنهب وتُحرق ويُنقل سكانها إلى تونس.' },
            { k: 'القرن 8', v: 'تصبح تونس المدينة الرئيسية وستمنح البلاد اسمها، أما اسم «أفريكا» الذي صار «إفريقية» فسينتهي إلى تسمية القارة كلها.' },
            { k: 'القرن 10', v: 'بعد نحو قرنين من الهجران، يعود العمران إلى الموقع في العهد الفاطمي، حسب غيبون.' }
          ]
        },
        {
          cls: 'tile--sand', dark: false, kicker: 'العصر الوسيط – القرن 18', dates: 'القرن 9 – 19', title: 'مقلع للرخام',
          rows: [
            { k: 'إعادة الاستعمال', v: 'تُنتزع الأعمدة والتيجان وألواح الرخام لبناء المساجد والقصور والكنائس: في القيروان وفي تونس، وحتى في أوروبا.' },
            { k: '1270', v: 'ينزل لويس التاسع بقرطاج خلال الحملة الصليبية الثامنة ويموت بالزُّحار أمام تونس. وفشل الحملة يطوي عصر الحروب الصليبية.' },
            { k: 'القرن 16', v: 'قرية ذلك العهد — مسجد ومدرسة ونحو عشرين دكانًا وقرابة 500 فلاح — تخرّبها الحامية الإسبانية في حلق الوادي، التي أقامها شارلكان.' },
            { k: 'القرن 18', v: 'لم يبقَ في العاصمة القديمة سوى قريتين فلاحيتين: دوار الشط والمعلقة.' }
          ]
        },
        {
          cls: 'tile--navy', dark: true, kicker: 'البايات والحماية', dates: '1830 – 1956', title: 'مصايف وكاتدرائية وحفريات',
          rows: [
            { k: '1830', v: 'يمنح الباي فرنسا قطعة أرض على بيرصا. يرسل لويس فيليب مهندسًا يبحث عن موضع وفاة لويس التاسع، فلمّا تعذّر عليه ذلك اختار أجمل مطلّ، وفيه شُيّدت كنيسة صغيرة.' },
            { k: 'القرن 19', v: 'يتّخذها أعيان الدولة الحسينية مصيفًا: قصر مصطفى خزندار بصلامبو، وقصر زرّوق، وقصر مصطفى بن إسماعيل (ريفو).' },
            { k: '1884 – 1890', v: 'في عهد الحماية الفرنسية تعلو كاتدرائية القديس لويس قمة بيرصا، وتصبح كنيسة أوّلية لإفريقيا مع الكردينال لافيجري.' },
            { k: '1919', v: 'أمر بايٍّ مؤرّخ في 15 جوان يُحدث بلدية قرطاج.' },
            { k: '1928 – 1929', v: 'يبني لوكوربوزييه فيلا بيزو، عمله الوحيد في تونس.' }
          ]
        },
        {
          cls: 'tile--ink', dark: true, kicker: 'تونس المستقلة', dates: '1956 – اليوم', title: 'بلدية وتراث عالمي',
          rows: [
            { k: '1960', v: 'يختار بورقيبة فيلا من العهد الاستعماري على شاطئ البحر لتصبح القصر الرئاسي.' },
            { k: '1972', v: 'أمام الزحف العمراني تطلق اليونسكو حملة دولية كبرى لإنقاذ قرطاج.' },
            { k: '1979', v: 'تسجيل الموقع الأثري في قائمة التراث العالمي.' },
            { k: '1985', v: 'يوقّع رئيسا بلديتي روما وقرطاج، أوغو فيتيري والشاذلي القليبي، معاهدة سلام رمزية تُنهي الحرب البونية الثالثة.' },
            { k: '2003', v: 'افتتاح جامع مالك بن أنس على هضبة الأوديون.' }
          ]
        }
      ]
    },
    chr: {
      kicker: 'القرن 2 – 5',
      title: 'قرطاج المسيحية',
      intro: 'بصفتها حاضرة إفريقية الرومانية، غدت قرطاج من بؤر المسيحية اللاتينية: صاغ كتّابها لغة اللاهوت في الغرب، وعقد أساقفتها مجامع كثيرة.',
      councils: [
        { k: '397', v: 'مجمع في قرطاج يضبط قائمة أسفار الكتاب المقدّس المعترف بها لدى كنيسة إفريقية.' },
        { k: '411', v: 'مؤتمر قرطاج يجمع أكثر من 500 أسقف كاثوليكي ودوناتي، ويُدين المفوّض الإمبراطوري مارسيلينوس الدوناتية.' },
        { k: '484', v: 'الملك الوندالي هونريك يستدعي الأساقفة الكاثوليك والآريوسيين، فيفتح اللقاء بابًا لاضطهاد جديد.' }
      ],
      people: [
        { name: 'ترتليانوس', dates: 'نحو 155 – نحو 220', text: 'وُلد في قرطاج، وهو أول كاتب مسيحي كبير باللاتينية. يدافع في «الدفاع» عن المسيحيين أمام اتهامات الوثنيين.' },
        { name: 'بربتوا وفيليسيتي', dates: '203', text: 'شابة نبيلة وأَمَتُها، استُشهدتا في مدرّج قرطاج. ويعتمد نصّ استشهادهما على يوميات بربتوا نفسها.' },
        { name: 'قبريانوس', dates: '† 258', text: 'أسقف قرطاج منذ نحو 249، قاد كنيسته خلال اضطهاد ديكيوس، ثم قُطع رأسه في عهد فاليريانوس.' },
        { name: 'أوغسطين', dates: '354 – 430', text: 'وُلد في طاغاست، ودرس البلاغة في قرطاج ثم درّسها فيها. ولمّا صار أسقف هيبون، كثيرًا ما عاد إليها ليعظ ويشارك في المجامع.' }
      ]
    },
    surv: {
      title: 'ما بقي بعد روما',
      aside: 'اللغة البونية والشُّفطيون والآلهة بأسماء جديدة: انظر أيضًا',
      link: 'سقوط قرطاج',
      items: [
        { kicker: 'العمارة', title: 'البناء الإفريقي (opus africanum)', text: 'هذا البناء بدعامات حجرية، الموجود في كركوان، يتواصل في العصر الروماني حتى في كابيتول دقّة.' },
        { kicker: 'الفن', title: 'فسيفسائيو إفريقية', text: 'بفضل رخام محلي جيّد، نشرت ورشات إفريقية حيواناتها ومشاهدها الأسطورية في أرجاء الإمبراطورية.' },
        { kicker: 'العبادات', title: 'معابد بونية جديدة', text: 'تينيسوت، بوقرنين، الحفرة قرب سيرتا، ونصب «الغرفة»: ظلّ ساتورن الإفريقي، وريث بعل، معبودًا حتى مطلع القرن الرابع (لانسيل).' },
        { kicker: 'المؤسسات', title: 'شُفطيون، وأحيانًا ثلاثة', text: 'ظلّت مدن رومانية في إفريقية تنتخب شُفطيين في القرن الثاني، وبعضها ثلاثة، وهو ما يراه بعض الساميين إسهامًا أمازيغيًا (ليبينسكي).' },
        { kicker: 'الكتب', title: 'المكتبات البونية', text: 'سُلّمت لملوك نوميديا سنة 146، وربما استعان بها سالوست في «حرب يوغرطة»؛ والمسألة خلافية، وفي زمن أوغسطين لم تعد سوى ذكرى.' },
        { kicker: 'اللغة', title: 'جسر نحو العربية؟', text: 'يرى ستيفان غزيل، ثم محمد حسين فنطر، أن بقاء لغة سامية زمنًا طويلًا ربما يسّر تعريب المغرب.' }
      ]
    },
    dig: {
      kicker: 'علم الآثار',
      title: 'من نقّب في قرطاج؟',
      rows: [
        { k: '1833', who: 'كريستيان توكسن فالبي', v: 'قنصل الدنمارك يضع أول مخطط دقيق للأطلال.' },
        { k: '1859', who: 'شارل إرنست بوليه', v: 'يُجري أسبارًا في هضبة بيرصا والموانئ بحثًا عن المدينة البونية.' },
        { k: 'منذ 1875', who: 'الأب دولاتر', v: 'هذا الراهب من الآباء البيض نقّب عقودًا في المقابر البونية والبازيليكات، ومجموعاته أصل المتحف الوطني بقرطاج.' },
        { k: '1892 – 1905', who: 'بول غوكلر', v: 'مدير الآثار في الإيالة، استكشف خصوصًا المقابر البونية.' },
        { k: '1921', who: 'التوفِت', v: 'اكتشاف معبد صلامبو، الذي نُقّب فيه خلال السنوات التالية.' },
        { k: 'بعد 1956', who: 'المدرسة التونسية', v: 'محمد حسين فنطر، عبد المجيد النابلي، عز الدين بشاوش… الذي نبّه الرأي العام إلى خطر العمران على الموقع.' },
        { k: '1972 – 1995', who: 'لننقذ قرطاج', v: 'حملة اليونسكو الدولية: ألمان (ف. راكوب، سور القرن 5 ق.م وحيّ الساحل)، أمريكيون (ل. ستاغر، التوفِت والميناء التجاري)، بريطانيون (ه. هيرست، جزيرة الأميرالية)، فرنسيون (س. لانسيل، الحي البوني ببيرصا)…' }
      ]
    },
    redisc: {
      kicker: 'إعادة الاكتشاف',
      title: 'قرطاج في المخيال',
      alt: 'لوحة «ديدون تبني قرطاج» لتيرنر',
      caption: 'تيرنر، ديدون تبني قرطاج، 1815 — المتحف الوطني، لندن',
      points: [
        'القرن 17: يهتمّ صموئيل بوشار في «الجغرافيا المقدّسة» بدور الفينيقيين؛ وفي القرن 18 تشغل نقيشة نورا في سردينيا العلماء.',
        '1817: يعرض تيرنر «أفول الإمبراطورية القرطاجية» مقابل لوحته عن ديدون، وسيخصّص للموضوع نحو عشر لوحات كبرى.',
        '1920: يحكم ستيفان غزيل بقسوة على الفن القرطاجي، وقد خفّف علم الآثار في النصف الثاني من القرن العشرين هذا الحكم كثيرًا (لانسيل).',
        'جعل بورقيبة من الملكة المؤسِّسة رمزًا للشعور الوطني، وعرّفت معارض كبرى (قصر غراسي 1988، معهد العالم العربي 2007-2008) الجمهور بقرطاج.'
      ]
    },
    site: {
      kicker: 'تراث عالمي',
      title: 'الموقع الأثري اليوم',
      aside: 'آثار رومانية في معظمها، مع جزر بونية، متناثرة في مدينة سكنية.',
      cards: [
        { chips: ['القرن 2', 'على البحر'], name: 'حمّامات أنطونيوس', alt: 'حمّامات أنطونيوس', text: 'شُيّدت بين 145 و162 بعد حريق كبير، وهي من أكبر حمّامات الإمبراطورية الرومانية. لم يبقَ منها إلا الطابق السفلي، طابق قاعات الخدمة (النابلي وسليم).' },
        { chips: ['بوني · روماني', 'المتحف الوطني'], name: 'هضبة بيرصا', alt: 'الحي البوني على هضبة بيرصا', text: 'تحت الفوروم الروماني، حيّ سكني من مطلع القرن 2 ق.م: دكان على الشارع، وصهريج تحت الأرض، ورواق يؤدي إلى فناء (ليبينسكي). وفي القمة المتحف الوطني والأكروبوليوم، الكاتدرائية سابقًا.', toLabel: 'التأسيس' },
        { chips: ['صلامبو'], name: 'الموانئ البونية', alt: 'بحيرتا الموانئ البونية', text: 'تحفظ بحيرتان شكل الحوضين: الميناء التجاري والميناء الحربي الدائري بجزيرة الأميرالية (ستاغر، هيرست).', toLabel: 'الاقتصاد' },
        { chips: ['صلامبو', 'نقاش مفتوح'], name: 'التوفِت', alt: 'نصب توفِت صلامبو', text: 'حرم مقدّس لتانيت وبعل حمون. فرضية التضحية بالأطفال، السائدة طويلًا، يعترض عليها مختصون مثل سباتينو موسكاتي.', toLabel: 'الديانة' },
        { chips: ['هضبة الأوديون', 'باردو'], name: 'منتزه الفيلات الرومانية', alt: 'فسيفساء السيد يوليوس، عُثر عليها في قرطاج (متحف باردو)', text: 'قرب المسرح، تستمدّ «فيلا القفص» اسمها من فسيفسائها. أما كبرى فسيفساءات قرطاج، مثل فسيفساء السيد يوليوس، ففي متحف باردو.' }
      ],
      minor: [
        { kicker: 'القرن 2', name: 'المسرح', text: 'صُمّم لنحو 5000 متفرّج، ولم يبقَ منه مطلع القرن العشرين إلا القليل؛ رُمّم على نطاق واسع ويحتضن مهرجان قرطاج الدولي.' },
        { kicker: '30000 مقعد', name: 'المدرّج', text: 'لم تصمد أمام أكثر من ألف عام من النهب إلا الحلبة. وفيه استُشهدت بربتوا وفيليسيتي سنة 203.' },
        { kicker: 'دوار الشط', name: 'ميدان السباق', text: 'لم يبقَ منه إلا منخفض طويل في الأرض.' },
        { kicker: 'المعلقة', name: 'الصهاريج', text: 'خزّانات رومانية ضخمة في نهاية حنايا زغوان. وقربها مقبرة الموظّفين (officiales) التابعين للبروقنصل (لوبوهيك).' }
      ],
      visitKicker: 'الزيارة',
      visit: 'الصعوبة الكبرى هي التشتّت: الآثار جزر وسط الفيلات والحدائق. ويسمح قطار TGM الذي يعبر البلدية (محطات صلامبو، بيرصا، الدرمش، حنبعل…) بالتنقّل من موقع إلى آخر.'
    },
    relatedTitle: 'اقرأ أيضًا',
    related: [
      { to: '/prise-de-carthage', kick: '149 – 146 ق.م', title: 'سقوط قرطاج', text: 'الحصار، وسقوط بيرصا، وأسطورة الملح.', cls: 'tile--terra' },
      { to: '/lieux', kick: 'أماكن', title: 'على خطى قرطاج', text: 'من كركوان إلى قرطاجنة، مواقع تستحق الزيارة.', cls: '' },
      { to: '/tunisie', kick: 'اليوم', title: 'قرطاج تحيا في تونس', text: 'اسم إفريقيا، والبلدية، والمهرجانات.', cls: 'tile--purple' },
      { to: '/histoire-des-vainqueurs', kick: 'المصادر', title: 'التاريخ يكتبه المنتصر', text: 'ما روته روما، وما نعرفه.', cls: '' }
    ]
  }
}

const c = computed(() => C[locale.value] || C.fr)

const siteCards = computed(() => c.value.site.cards.map((card, i) => ({ ...SITE_IMG[i], ...card })))

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-title { font-size: clamp(44px, 5.6vw, 80px); }

.stat { display: flex; flex-direction: column; gap: 10px; }
.stat .num { font-size: clamp(32px, 3.4vw, 48px); }
.stat-text { font: 500 14px/1.45 var(--font-body); color: var(--muted); }

/* Frise */
.eras { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--gap); }
.era {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: clamp(20px, 3vw, 48px);
  align-items: start;
}
.era-dates { font: 900 clamp(26px, 2.6vw, 38px)/1.05 var(--font-display); margin: 6px 0 10px; }
.era-title { font-size: clamp(20px, 1.8vw, 26px); }
.era-key { font-size: 17px; line-height: 1.2; }
.era-val { font-size: 15px; line-height: 1.55; }
.era.tile--gold .rows > div,
.era.tile--sand .rows > div { border-top-color: rgba(22, 19, 15, 0.2); }
.era.tile--purple .era-val, .era.tile--terra .era-val, .era.tile--navy .era-val,
.era.tile--olive .era-val, .era.tile--ink .era-val { opacity: 0.9; }

/* Carthage chrétienne */
.chr-title { margin: 6px 0 18px; }
.chr-key { font-size: 20px; }
.chr-val { font-size: 14px; line-height: 1.5; }
.chr-people .person { min-height: 240px; }

/* Survivances */
.sec-head p a { color: var(--purple); font-weight: 600; }
.surv { min-height: 230px; }

/* Fouilles */
.dig-title { margin: 6px 0 24px; }
.dig-key { font-size: 18px; line-height: 1.15; color: var(--gold-light); }
.dig-val { font-size: 15px; line-height: 1.55; color: var(--on-dark); }
.dig-val b { color: var(--white); font-weight: 700; }
.redisc { display: flex; flex-direction: column; gap: var(--gap); }
.redisc-fig { min-height: 320px; }
.redisc-title { margin: 6px 0 14px; }
.redisc-list { margin: 0; padding-inline-start: 18px; display: flex; flex-direction: column; gap: 10px; }
.redisc-list li { font-size: 15px; line-height: 1.5; }

/* Site */
.sites { padding-top: 0; }
.site .card-body { display: flex; flex-direction: column; flex: 1; }
.site-chips { gap: 6px; margin-bottom: 12px; }
.site-chips .chip { font-size: 12px; padding: 8px 11px; }
.site-name { margin: 0 0 8px; }
.site-more {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-top: auto;
  padding-top: 6px;
  font: 600 14px/1 var(--font-body);
  color: var(--purple);
}
.s-6.site > img { height: 280px; }
.minor { min-height: 210px; }
.small { font-size: 14px; line-height: 1.5; }
.visit-sec { padding-top: var(--gap); }
.visit { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 8fr); gap: 20px; align-items: baseline; }

.related-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.related { min-height: 200px; }

@media (max-width: 960px) {
  .era { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  .s-6.site > img { height: 240px; }
  .visit { grid-template-columns: minmax(0, 1fr); gap: 8px; }
}

@media (max-width: 640px) {
  .hero-title { font-size: clamp(36px, 11vw, 48px); }
  .chr-people { grid-template-columns: minmax(0, 1fr); }
  .chr-people .person, .surv, .minor, .related { min-height: 0; }
  .s-6.site > img { height: 200px; }
  .redisc-fig { min-height: 260px; }
}
</style>
