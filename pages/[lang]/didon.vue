<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <figure class="fig fig--hero s-5 hero-fig" style="background:#1F4E79">
        <img src="/img/guerin-dido.jpg" :alt="c.hero.alt" style="object-position: 30% 40%">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--purple tile--stack tile--hero s-7">
        <div class="hero-top">
          <span class="chip chip--glass">{{ c.hero.chip }}</span>
          <span class="phoen hero-phoen" dir="rtl" aria-hidden="true">𐤒𐤓𐤕𐤇𐤃𐤔𐤕</span>
        </div>
        <div>
          <p class="dates">{{ c.hero.dates }}</p>
          <h1 class="h-display bio-title">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
    </div>

    <!-- Chiffres-clés -->
    <div class="cols cols-4 keep-2 keyfigs">
      <div v-for="(k, i) in c.keys" :key="k.n" class="tile keyfig" :class="keyTones[i]">
        <div class="num">{{ k.n }}</div>
        <p class="body">{{ k.t }}</p>
      </div>
    </div>

    <!-- Deux noms -->
    <section class="sec">
      <div class="cols cols-2 cols--flush">
        <div v-for="n in c.names.items" :key="n.name" class="tile tile--xl name-tile" :class="n.tone">
          <span class="kicker">{{ n.kicker }}</span>
          <h2 class="h-block">{{ n.name }}</h2>
          <p class="body-lg name-text">{{ n.text }}</p>
        </div>
      </div>
    </section>

    <!-- Chronologie -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <span class="kicker">{{ c.life.kicker }}</span>
        <h2 class="h-section life-title">{{ c.life.title }}</h2>
        <div class="rows" style="--row-key:190px">
          <div v-for="r in c.life.rows" :key="r.key">
            <span class="key">{{ r.key }}</span>
            <span class="val"><b>{{ r.title }}</b> — {{ r.text }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- La peau de bœuf -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--gold tile--stack">
          <div>
            <span class="kicker">{{ c.byrsa.kicker }}</span>
            <h2 class="h-block byrsa-title">{{ c.byrsa.title }}</h2>
            <p v-for="p in c.byrsa.paras" :key="p" class="body-lg para">{{ p }}</p>
          </div>
          <blockquote class="pull">
            <p>« {{ c.byrsa.quote }} »</p>
            <cite>{{ c.byrsa.cite }}</cite>
          </blockquote>
        </div>
        <figure class="fig side-fig" style="background:#1D3F66">
          <img src="/img/byrsa.jpg" :alt="c.byrsa.alt" loading="lazy">
          <figcaption class="cap-box">{{ c.byrsa.caption }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- Deux récits -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.myth.title }}</h2>
        <p>{{ c.myth.aside }}</p>
      </div>
    </section>
    <div class="cols cols-2">
      <div v-for="m in c.myth.items" :key="m.title" class="tile tile--xl tile--stack myth" :class="m.tone">
        <div>
          <span class="kicker">{{ m.kicker }}</span>
          <h3 class="h-card">{{ m.title }}</h3>
          <p v-for="p in m.paras" :key="p" class="body-lg para">{{ p }}</p>
        </div>
      </div>
    </div>

    <!-- Le bûcher -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig side-fig" style="background:#E6D9C4">
          <img src="/img/tanit-stele.jpg" :alt="c.death.alt" loading="lazy">
          <figcaption>{{ c.death.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--terra tile--stack">
          <div>
            <span class="kicker">{{ c.death.kicker }}</span>
            <h2 class="h-block byrsa-title">{{ c.death.title }}</h2>
            <p v-for="p in c.death.paras" :key="p" class="body-lg para">{{ p }}</p>
          </div>
          <NuxtLink :to="localePath('/religion')" class="btn btn-outline self-start">{{ c.death.more }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Citations antiques -->
    <section class="sec sec--wide">
      <h2 class="h-section block-title">{{ c.quotes.title }}</h2>
    </section>
    <div class="cols cols-3">
      <figure v-for="(q, i) in c.quotes.items" :key="q.cite" class="tile tile--stack quote" :class="i === 1 ? 'tile--outline' : 'tile--paper tile--outline'">
        <blockquote>
          <p class="q-orig" lang="la">{{ q.orig }}</p>
          <p class="q-tr">« {{ q.tr }} »</p>
        </blockquote>
        <figcaption class="q-cite">{{ q.cite }}</figcaption>
      </figure>
    </div>

    <!-- Sources -->
    <section class="sec">
      <div class="tile tile--xl">
        <span class="kicker">{{ c.sourcesNote.kicker }}</span>
        <h2 class="h-block life-title">{{ c.sourcesNote.title }}</h2>
        <div class="rows" style="--row-key:260px">
          <div v-for="s in c.sourcesNote.items" :key="s.key">
            <span class="key src-key">{{ s.key }}</span>
            <span class="val">{{ s.text }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Héritage -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--navy">
          <span class="kicker">{{ c.legacy.kicker }}</span>
          <h2 class="h-block life-title">{{ c.legacy.title }}</h2>
          <div class="leg-grid">
            <div v-for="l in c.legacy.items" :key="l.title" class="leg">
              <h3 class="leg-title">{{ l.title }}</h3>
              <p class="body">{{ l.text }}</p>
            </div>
          </div>
        </div>
        <figure class="fig side-fig" style="background:#B8904A">
          <img src="/img/turner-dido.jpg" :alt="c.legacy.alt" loading="lazy">
          <figcaption class="cap-box">{{ c.legacy.caption }}</figcaption>
        </figure>
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

const keyTones = ['tile--ink', '', '', 'tile--gold']

const C = {
  fr: {
    meta: {
      title: 'Élissa-Didon, reine fondatrice de Carthage',
      desc: "Princesse de Tyr, fugitive, fondatrice de Carthage vers 814 av. J.-C. : la vie d'Élissa-Didon selon Timée et Justin, et sa réinvention par Virgile."
    },
    hero: {
      chip: 'Reine fondatrice · Tyr → Carthage',
      dates: 'IXe siècle av. J.-C. · fondation vers 814',
      title: 'Élissa-Didon',
      lede: "Princesse de Tyr, fugitive et fondatrice : une souveraine phénicienne qui transforma un exil forcé en naissance d'une cité — Qart-Ḥadasht, la « Ville nouvelle ».",
      alt: 'Énée racontant à Didon les malheurs de Troie, par Pierre-Narcisse Guérin',
      caption: 'P.-N. Guérin, Énée racontant à Didon les malheurs de Troie (1815)'
    },
    keys: [
      { n: '814', t: 'av. J.-C. : date de fondation retenue par Timée' },
      { n: '80', t: 'jeunes Chypriotes emmenées vers l’Afrique (Justin)' },
      { n: '1', t: 'peau de bœuf pour délimiter la colline de Byrsa' },
      { n: '668', t: 'ans de Carthage punique, jusqu’en 146 av. J.-C.' }
    ],
    names: {
      items: [
        { tone: 'tile--sand', kicker: 'Son nom phénicien', name: 'Élissa', text: "C'est le nom que lui donnent Timée et Justin, sans doute transcription d'un nom phénicien. Les Tunisiens l'appellent aujourd'hui Élissa (عليسة)." },
        { tone: '', kicker: 'Son surnom', name: 'Didon', text: "Selon Timée, les Libyens l'auraient surnommée Deidô, « l'errante », à cause de ses longs voyages. C'est ce nom que retient Virgile." }
      ]
    },
    life: {
      kicker: 'Chronologie',
      title: 'Une vie, de Tyr à Byrsa',
      rows: [
        { key: 'Tyr', title: 'Une princesse', text: "Fille du roi Mutto (Bélus chez Virgile), sœur de Pygmalion. Le roi laisse le trône à ses deux enfants ; le peuple le donne à Pygmalion, encore enfant." },
        { key: 'Mariage', title: 'Acherbas', text: "Élissa épouse son oncle Acherbas (Sychée chez Virgile), grand prêtre de Melqart — l'Hercule tyrien —, le second personnage du royaume après le roi." },
        { key: 'Le crime', title: 'Pygmalion', text: "Convoitant les trésors d'Acherbas, Pygmalion le fait assassiner." },
        { key: 'La fuite', title: 'La ruse du trésor', text: "Élissa feint de se soumettre, charge l'or sur des navires avec des nobles tyriens, et fait jeter à la mer des sacs de sable présentés comme le trésor : les envoyés du roi, terrifiés, la suivent." },
        { key: 'Chypre', title: 'Escale', text: "Le prêtre de l'île se joint à elle avec sa famille, contre la promesse d'un sacerdoce héréditaire ; 80 jeunes filles sont emmenées pour épouses des colons." },
        { key: 'v. 814 av. J.-C.', title: 'Arrivée en Afrique', text: "Elle achète autant de terre qu'une peau de bœuf peut en couvrir. Utique, colonie tyrienne plus ancienne, envoie des présents ; les habitants voisins viennent commercer." },
        { key: 'Fondation', title: 'Deux présages', text: "En creusant les fondations, on trouve une tête de bœuf — terre fertile mais servitude — puis, plus loin, une tête de cheval : présage d'un peuple guerrier et puissant." },
        { key: 'Iarbas', title: 'Le chantage', text: "Le roi des Maxitani exige d'épouser Élissa, sous menace de guerre ; les notables carthaginois la pressent d'accepter." },
        { key: 'La mort', title: 'Le bûcher', text: "Elle fait dresser un bûcher, feignant un sacrifice aux mânes de son époux, y monte et se frappe d'une épée. Carthage l'honore comme une déesse." }
      ]
    },
    byrsa: {
      kicker: 'Le génie de la négociation',
      title: 'La peau de bœuf',
      paras: [
        "Arrivée sur la côte de l'actuelle Tunisie, Élissa demande aux habitants autant de terre qu'une peau de bœuf peut en couvrir. Elle la découpe en lanières si fines qu'elle encercle toute une colline : Byrsa.",
        "Les Grecs expliquaient ainsi le nom de la citadelle (bursa, « le cuir »), qui vient sans doute plutôt d'un mot sémitique désignant une forteresse. La légende dit l'essentiel : l'intelligence et la diplomatie l'emportent sur la force."
      ],
      quote: "Autant de terre qu'une peau de bœuf en pourrait couvrir.",
      cite: 'D’après Justin, XVIII, 5',
      alt: 'Colline de Byrsa, Carthage',
      caption: 'La colline de Byrsa, cœur de Carthage'
    },
    myth: {
      title: 'Deux récits, deux reines',
      aside: "Le récit phénicien transmis par les Grecs, et sa réécriture romaine.",
      items: [
        { tone: 'tile--purple', kicker: 'Virgile, Énéide I et IV (19 av. J.-C.)', title: "L'amante abandonnée", paras: ["Virgile fait de Didon l'amante d'Énée, qui l'abandonne sur ordre des dieux pour aller fonder Rome ; elle se tue de désespoir en maudissant sa descendance et appelle un vengeur — Hannibal.", "Un mythe fondateur romain, qui explique la haine entre Rome et Carthage, mais réduit une souveraine à une femme éplorée."] },
        { tone: 'tile--navy', kicker: 'Timée, Justin', title: 'La reine souveraine', paras: ["Dans la tradition plus ancienne, Énée n'apparaît pas. Élissa est une bâtisseuse d'État qui meurt pour rester fidèle à Acherbas et préserver l'indépendance de sa cité face à Iarbas.", "Et la chronologie est impossible : la chute de Troie, datée traditionnellement vers 1184 av. J.-C., précède de plus de trois siècles la fondation de Carthage."] }
      ]
    },
    death: {
      kicker: 'Le sacrifice',
      title: 'Morte pour sa cité',
      paras: [
        "Pressée par Iarbas et par ses propres notables, Élissa prétend consentir au mariage. Elle fait élever un bûcher aux portes de la ville, comme pour apaiser l'ombre de son premier époux, puis se tue devant son peuple : elle rejoint son mari, dit-elle, comme on le lui demandait.",
        "Selon Justin, elle fut vénérée comme une déesse aussi longtemps que Carthage resta invaincue."
      ],
      more: 'Les dieux de Carthage →',
      alt: 'Stèle punique portant le signe de Tanit',
      caption: 'Stèle au signe de Tanit'
    },
    quotes: {
      title: 'Ce que disent les Anciens',
      items: [
        { orig: 'Quamdiu Carthago invicta fuit, pro dea culta est.', tr: "Tant que Carthage resta invaincue, elle fut honorée comme une déesse.", cite: 'Justin, Abrégé des Histoires philippiques, XVIII, 6' },
        { orig: 'Exoriare aliquis nostris ex ossibus ultor.', tr: 'Lève-toi de nos ossements, ô vengeur, qui que tu sois.', cite: 'Virgile, Énéide, IV, 625 — Didon appelle Hannibal' },
        { orig: 'Dux femina facti.', tr: "Une femme conduit l'entreprise.", cite: 'Virgile, Énéide, I, 364' }
      ]
    },
    sourcesNote: {
      kicker: 'Sources et archives',
      title: "D'où vient ce que l'on sait",
      items: [
        { key: 'Timée de Tauroménion', text: "Historien grec (IVe–IIIe s. av. J.-C.) : la plus ancienne version connue, qui date la fondation de 814 et explique le nom de Didon." },
        { key: 'Ménandre d’Éphèse', text: "Cité par Flavius Josèphe (Contre Apion, I, 18) : la fuite d'Élissa et la fondation ont lieu la septième année du règne de Pygmalion." },
        { key: 'Justin', text: "Abrégé des Histoires philippiques de Trogue Pompée, livre XVIII : la source principale du récit (fuite, Chypre, peau de bœuf, Iarbas, bûcher)." },
        { key: 'Virgile', text: "Énéide, livres I et IV : la version romaine romancée, à lire comme une œuvre poétique et politique, non comme de l'histoire." },
        { key: 'Appien', text: "Libyca (IIe s. ap. J.-C.) : perspective grecque sur les origines de Carthage et la ruse de la peau de bœuf." }
      ]
    },
    legacy: {
      kicker: 'Héritage',
      title: "Héritage d'une fondatrice",
      alt: 'Didon construisant Carthage, par J. M. W. Turner',
      caption: 'J. M. W. Turner, Didon construisant Carthage (1815)',
      items: [
        { title: 'Une cité de sept siècles', text: "Carthage, de 814 à 146 av. J.-C., devint la grande puissance maritime de la Méditerranée occidentale, rivale de Rome pendant plus d'un siècle." },
        { title: 'Racines tyriennes', text: "Navigation, commerce, alphabet, culte de Melqart : l'héritage de Tyr forma l'ADN de la culture carthaginoise." },
        { title: 'Une reine dans les arts', text: "Ovide (Héroïdes, VII), Purcell (Dido and Aeneas, 1689), Berlioz (Les Troyens), Guérin et Turner (1815) : Didon traverse la littérature, l'opéra et la peinture." },
        { title: 'Un symbole tunisien', text: "Élissa reste aujourd'hui, en Tunisie, la figure fondatrice par excellence, symbole d'intelligence politique et de souveraineté." }
      ]
    },
    more: {
      title: 'À lire aussi',
      items: [
        { to: '/fondation', img: '/img/byrsa.jpg', alt: 'Colline de Byrsa', kicker: '814 av. J.-C.', title: 'La fondation de Carthage', text: "Qart-Ḥadasht, la Ville nouvelle, et ses premiers siècles." },
        { to: '/religion', img: '/img/baal.jpg', alt: 'Statue de Baal Hammon', kicker: 'Croyances', title: 'La religion', text: 'Melqart, Baal Hammon, Tanit : les dieux de Carthage.' },
        { to: '/biographies', img: '/img/hamilcar.jpg', alt: 'Hamilcar Barca', kicker: 'Personnages', title: 'Toutes les biographies', text: 'Les Barca, les généraux, les navigateurs et les reines.' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Justin', work: 'Abrégé des Histoires philippiques de Trogue Pompée', ref: 'XVIII, 5 ; XVIII, 6', note: 'la source principale du récit' },
      { type: 'ancient', author: 'Timée de Tauroménion', note: 'fragments transmis par d’autres auteurs : date de 814, nom de Didon' },
      { type: 'ancient', author: 'Flavius Josèphe', work: 'Contre Apion', ref: 'I, 18', note: 'citant Ménandre d’Éphèse' },
      { type: 'ancient', author: 'Virgile', work: 'Énéide', ref: 'I, 364 ; IV, 625', note: 'la version romaine, poétique' },
      { type: 'ancient', author: 'Appien', work: 'Libyca', note: 'la ruse de la peau de bœuf' },
      { type: 'ancient', author: 'Ovide', work: 'Héroïdes', ref: 'VII' }
    ]
  },
  en: {
    meta: {
      title: 'Elissa-Dido, founding queen of Carthage',
      desc: 'Princess of Tyre, fugitive, founder of Carthage around 814 BC: the life of Elissa-Dido according to Timaeus and Justin, and her reinvention by Virgil.'
    },
    hero: {
      chip: 'Founding queen · Tyre → Carthage',
      dates: '9th century BC · founding c. 814',
      title: 'Elissa-Dido',
      lede: 'Princess of Tyre, fugitive and founder: a Phoenician sovereign who turned a forced exile into the birth of a city — Qart-Hadasht, the "New City".',
      alt: 'Aeneas telling Dido of the misfortunes of Troy, by Pierre-Narcisse Guérin',
      caption: 'P.-N. Guérin, Aeneas Telling Dido of the Misfortunes of Troy (1815)'
    },
    keys: [
      { n: '814', t: 'BC: founding date given by Timaeus' },
      { n: '80', t: 'Cypriot maidens taken to Africa (Justin)' },
      { n: '1', t: 'oxhide to mark out the hill of Byrsa' },
      { n: '668', t: 'years of Punic Carthage, until 146 BC' }
    ],
    names: {
      items: [
        { tone: 'tile--sand', kicker: 'Her Phoenician name', name: 'Elissa', text: 'The name given by Timaeus and Justin, probably the transcription of a Phoenician name. Tunisians today call her Elissa (عليسة).' },
        { tone: '', kicker: 'Her nickname', name: 'Dido', text: 'According to Timaeus, the Libyans nicknamed her Deidō, "the wanderer", because of her long travels. This is the name Virgil kept.' }
      ]
    },
    life: {
      kicker: 'Timeline',
      title: 'A life, from Tyre to Byrsa',
      rows: [
        { key: 'Tyre', title: 'A princess', text: 'Daughter of King Mutto (Belus in Virgil), sister of Pygmalion. The king left the throne to both children; the people gave it to Pygmalion, still a boy.' },
        { key: 'Marriage', title: 'Acherbas', text: 'Elissa married her uncle Acherbas (Sychaeus in Virgil), high priest of Melqart — the Tyrian Heracles — and second only to the king.' },
        { key: 'The crime', title: 'Pygmalion', text: "Coveting Acherbas's treasure, Pygmalion had him murdered." },
        { key: 'The flight', title: 'The treasure trick', text: "Elissa feigned submission, loaded the gold onto ships with Tyrian nobles, and had sacks of sand thrown overboard as if they were the treasure: the king's terrified envoys followed her." },
        { key: 'Cyprus', title: 'A stopover', text: "The island's priest joined her with his family in exchange for a hereditary priesthood; 80 young women were taken as wives for the settlers." },
        { key: 'c. 814 BC', title: 'Arrival in Africa', text: 'She bought as much land as an oxhide could cover. Utica, an older Tyrian colony, sent gifts; the neighbouring peoples came to trade.' },
        { key: 'Foundation', title: 'Two omens', text: "Digging the foundations, they found an ox's head — fertile land, but servitude — then, further on, a horse's head: the omen of a warlike, powerful people." },
        { key: 'Iarbas', title: 'Blackmail', text: 'The king of the Maxitani demanded to marry Elissa, threatening war; the Carthaginian notables urged her to accept.' },
        { key: 'Death', title: 'The pyre', text: "She had a pyre built, pretending to sacrifice to her husband's shade, climbed it and stabbed herself with a sword. Carthage honoured her as a goddess." }
      ]
    },
    byrsa: {
      kicker: 'The genius of negotiation',
      title: 'The oxhide',
      paras: [
        "Arriving on the coast of present-day Tunisia, Elissa asked the inhabitants for as much land as an oxhide could cover. She cut it into strips so thin that they encircled an entire hill: Byrsa.",
        'The Greeks explained the citadel’s name this way (bursa, "hide"), though it probably comes from a Semitic word for a fortress. The legend says what matters: intelligence and diplomacy prevail over force.'
      ],
      quote: 'As much land as an oxhide could cover.',
      cite: 'After Justin, XVIII, 5',
      alt: 'Byrsa Hill, Carthage',
      caption: 'Byrsa Hill, the heart of Carthage'
    },
    myth: {
      title: 'Two stories, two queens',
      aside: 'The Phoenician story handed down by the Greeks, and its Roman rewriting.',
      items: [
        { tone: 'tile--purple', kicker: 'Virgil, Aeneid I and IV (19 BC)', title: 'The abandoned lover', paras: ['Virgil makes Dido the lover of Aeneas, who leaves her at the gods’ command to go and found Rome; she kills herself in despair, cursing his descendants and calling for an avenger — Hannibal.', 'A Roman founding myth that explains the hatred between Rome and Carthage, but reduces a sovereign to a grieving woman.'] },
        { tone: 'tile--navy', kicker: 'Timaeus, Justin', title: 'The sovereign queen', paras: ['In the older tradition, Aeneas does not appear. Elissa is a state builder who dies to stay faithful to Acherbas and to preserve her city’s independence from Iarbas.', 'And the chronology is impossible: the fall of Troy, traditionally dated around 1184 BC, precedes the founding of Carthage by more than three centuries.'] }
      ]
    },
    death: {
      kicker: 'The sacrifice',
      title: 'She died for her city',
      paras: [
        "Pressed by Iarbas and by her own notables, Elissa pretended to consent to the marriage. She had a pyre raised at the city gates, as if to appease the shade of her first husband, then killed herself before her people: she was going to her husband, she said, as they had asked.",
        'According to Justin, she was worshipped as a goddess for as long as Carthage remained unconquered.'
      ],
      more: 'The gods of Carthage →',
      alt: 'Punic stele bearing the sign of Tanit',
      caption: 'Stele with the sign of Tanit'
    },
    quotes: {
      title: 'What the ancients say',
      items: [
        { orig: 'Quamdiu Carthago invicta fuit, pro dea culta est.', tr: 'As long as Carthage remained unconquered, she was worshipped as a goddess.', cite: 'Justin, Epitome of the Philippic Histories, XVIII, 6' },
        { orig: 'Exoriare aliquis nostris ex ossibus ultor.', tr: 'Arise from our bones, some avenger.', cite: 'Virgil, Aeneid, IV, 625 — Dido calls for Hannibal' },
        { orig: 'Dux femina facti.', tr: 'A woman led the enterprise.', cite: 'Virgil, Aeneid, I, 364' }
      ]
    },
    sourcesNote: {
      kicker: 'Sources and archives',
      title: 'Where our knowledge comes from',
      items: [
        { key: 'Timaeus of Tauromenium', text: 'Greek historian (4th–3rd c. BC): the oldest known version, which dates the founding to 814 and explains the name Dido.' },
        { key: 'Menander of Ephesus', text: "Quoted by Flavius Josephus (Against Apion, I, 18): Elissa's flight and the founding took place in the seventh year of Pygmalion's reign." },
        { key: 'Justin', text: 'Epitome of the Philippic Histories of Pompeius Trogus, book XVIII: the main source of the story (flight, Cyprus, oxhide, Iarbas, pyre).' },
        { key: 'Virgil', text: 'Aeneid, books I and IV: the romanticised Roman version, to be read as poetry and politics, not as history.' },
        { key: 'Appian', text: 'Libyca (2nd c. AD): a Greek perspective on the origins of Carthage and the oxhide trick.' }
      ]
    },
    legacy: {
      kicker: 'Legacy',
      title: 'Legacy of a founder',
      alt: 'Dido Building Carthage, by J. M. W. Turner',
      caption: 'J. M. W. Turner, Dido Building Carthage (1815)',
      items: [
        { title: 'A city of seven centuries', text: 'Carthage, from 814 to 146 BC, became the great naval power of the western Mediterranean, Rome’s rival for more than a century.' },
        { title: 'Tyrian roots', text: 'Navigation, trade, the alphabet, the cult of Melqart: the heritage of Tyre formed the DNA of Carthaginian culture.' },
        { title: 'A queen in the arts', text: 'Ovid (Heroides, VII), Purcell (Dido and Aeneas, 1689), Berlioz (Les Troyens), Guérin and Turner (1815): Dido runs through literature, opera and painting.' },
        { title: 'A Tunisian symbol', text: 'In Tunisia today, Elissa remains the founding figure par excellence, a symbol of political intelligence and sovereignty.' }
      ]
    },
    more: {
      title: 'Read also',
      items: [
        { to: '/fondation', img: '/img/byrsa.jpg', alt: 'Byrsa Hill', kicker: '814 BC', title: 'The founding of Carthage', text: 'Qart-Hadasht, the New City, and its first centuries.' },
        { to: '/religion', img: '/img/baal.jpg', alt: 'Statue of Baal Hammon', kicker: 'Beliefs', title: 'Religion', text: 'Melqart, Baal Hammon, Tanit: the gods of Carthage.' },
        { to: '/biographies', img: '/img/hamilcar.jpg', alt: 'Hamilcar Barca', kicker: 'People', title: 'All biographies', text: 'The Barcids, the generals, the navigators and the queens.' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Justin', work: 'Epitome of Pompeius Trogus\' Philippic Histories', ref: 'XVIII, 5; XVIII, 6', note: 'the main source of the story' },
      { type: 'ancient', author: 'Timaeus of Tauromenium', note: 'fragments preserved by later authors: the 814 date, the name Dido' },
      { type: 'ancient', author: 'Flavius Josephus', work: 'Against Apion', ref: 'I, 18', note: 'quoting Menander of Ephesus' },
      { type: 'ancient', author: 'Virgil', work: 'Aeneid', ref: 'I, 364; IV, 625', note: 'the poetic Roman version' },
      { type: 'ancient', author: 'Appian', work: 'Libyca', note: 'the oxhide trick' },
      { type: 'ancient', author: 'Ovid', work: 'Heroides', ref: 'VII' }
    ]
  },
  ar: {
    meta: {
      title: 'عليسة-ديدون، الملكة المؤسِّسة لقرطاج',
      desc: 'أميرة صور، الهاربة، مؤسِّسة قرطاج نحو 814 ق.م: حياة عليسة-ديدون كما رواها تيمايوس ويوستينوس، وإعادة ابتكارها عند فرجيل.'
    },
    hero: {
      chip: 'الملكة المؤسِّسة · من صور إلى قرطاج',
      dates: 'القرن 9 ق.م · التأسيس نحو 814',
      title: 'عليسة-ديدون',
      lede: 'أميرة صور، الهاربة والمؤسِّسة: ملكة فينيقية حوّلت منفى قسريًا إلى ميلاد مدينة — قرت حدشت، «المدينة الجديدة».',
      alt: 'إينياس يروي لديدون مآسي طروادة، لوحة بيير-نرسيس غيران',
      caption: 'غيران، إينياس يروي لديدون مآسي طروادة (1815)'
    },
    keys: [
      { n: '814', t: 'ق.م: تاريخ التأسيس عند تيمايوس' },
      { n: '80', t: 'فتاة قبرصية رافقت الرحلة إلى إفريقيا (يوستينوس)' },
      { n: '1', t: 'جلد ثور لتحديد هضبة بيرصا' },
      { n: '668', t: 'سنة عمر قرطاج البونيقية، حتى 146 ق.م' }
    ],
    names: {
      items: [
        { tone: 'tile--sand', kicker: 'اسمها الفينيقي', name: 'عليسة', text: 'هو الاسم الذي يذكره تيمايوس ويوستينوس، ولعله نقل لاسم فينيقي. ويسمّيها التونسيون اليوم عليسة.' },
        { tone: '', kicker: 'لقبها', name: 'ديدون', text: 'حسب تيمايوس، لقّبها الليبيون «ديدو» أي «الهائمة» بسبب أسفارها الطويلة. وهذا الاسم هو الذي احتفظ به فرجيل.' }
      ]
    },
    life: {
      kicker: 'التسلسل الزمني',
      title: 'حياة من صور إلى بيرصا',
      rows: [
        { key: 'صور', title: 'أميرة', text: 'ابنة الملك موتو (بيلوس عند فرجيل) وأخت بيغماليون. ترك الملك العرش لولديه، فمنحه الشعب لبيغماليون وهو ما يزال صبيًا.' },
        { key: 'الزواج', title: 'أخرباص', text: 'تزوجت عليسة خالها أخرباص (سيخايوس عند فرجيل)، كبير كهنة ملقرت — هرقل الصوري — والرجل الثاني في المملكة بعد الملك.' },
        { key: 'الجريمة', title: 'بيغماليون', text: 'طمعًا في كنوز أخرباص، دبّر بيغماليون اغتياله.' },
        { key: 'الهروب', title: 'حيلة الكنز', text: 'تظاهرت عليسة بالخضوع، وحمّلت الذهب على السفن مع نبلاء من صور، ثم ألقت في البحر أكياسًا من الرمل على أنها الكنز: فخاف رسل الملك وتبعوها.' },
        { key: 'قبرص', title: 'محطة', text: 'انضم إليها كاهن الجزيرة مع أسرته مقابل وعد بكهانة وراثية؛ واصطُحبت 80 فتاة زوجاتٍ للمستوطنين.' },
        { key: 'نحو 814 ق.م', title: 'الوصول إلى إفريقيا', text: 'اشترت من الأرض ما يغطيه جلد ثور. وأرسلت أوتيكا، المستعمرة الصورية الأقدم، الهدايا؛ وجاء السكان المجاورون للتجارة.' },
        { key: 'التأسيس', title: 'فألان', text: 'عند حفر الأسس وُجد رأس ثور — أرض خصبة ولكن عبودية — ثم في موضع آخر رأس حصان: فأل شعب محارب وقوي.' },
        { key: 'يارباس', title: 'الابتزاز', text: 'طلب ملك المكسيتاني الزواج من عليسة مهددًا بالحرب، وألحّ عليها أعيان قرطاج بالقبول.' },
        { key: 'الموت', title: 'المحرقة', text: 'أمرت بإقامة محرقة متظاهرة بتقديم قربان لروح زوجها، ثم صعدتها وطعنت نفسها بسيف. فكرّمتها قرطاج إلهةً.' }
      ]
    },
    byrsa: {
      kicker: 'عبقرية التفاوض',
      title: 'جلد الثور',
      paras: [
        'عند وصولها إلى ساحل تونس الحالية، طلبت عليسة من السكان من الأرض ما يغطيه جلد ثور. فقطعته شرائط رفيعة جدًا أحاطت بهضبة كاملة: بيرصا.',
        'بهذا فسّر الإغريق اسم القلعة (bursa أي «الجلد»)، وإن كان الأرجح أنه من كلمة سامية تعني الحصن. والأسطورة تقول الجوهر: الذكاء والدبلوماسية يغلبان القوة.'
      ],
      quote: 'من الأرض ما يمكن أن يغطيه جلد ثور.',
      cite: 'عن يوستينوس، 18، 5',
      alt: 'هضبة بيرصا، قرطاج',
      caption: 'هضبة بيرصا، قلب قرطاج'
    },
    myth: {
      title: 'روايتان وملكتان',
      aside: 'الرواية الفينيقية التي نقلها الإغريق، وإعادة كتابتها الرومانية.',
      items: [
        { tone: 'tile--purple', kicker: 'فرجيل، الإنيادة 1 و4 (19 ق.م)', title: 'العاشقة المهجورة', paras: ['يجعل فرجيل ديدون عشيقة إينياس الذي يهجرها بأمر الآلهة ليؤسس روما؛ فتنتحر يأسًا لاعنةً نسله وداعيةً منتقمًا — حنبعل.', 'أسطورة تأسيس رومانية تفسّر العداء بين روما وقرطاج، لكنها تختزل ملكة ذات سيادة في امرأة باكية.'] },
        { tone: 'tile--navy', kicker: 'تيمايوس، يوستينوس', title: 'الملكة ذات السيادة', paras: ['في الرواية الأقدم لا وجود لإينياس. عليسة بانية دولة ماتت وفاءً لأخرباص وحفاظًا على استقلال مدينتها أمام يارباس.', 'ثم إن التسلسل الزمني مستحيل: سقوط طروادة، المؤرَّخ تقليديًا نحو 1184 ق.م، يسبق تأسيس قرطاج بأكثر من ثلاثة قرون.'] }
      ]
    },
    death: {
      kicker: 'التضحية',
      title: 'ماتت من أجل مدينتها',
      paras: [
        'تحت ضغط يارباس وأعيان مدينتها، تظاهرت عليسة بالموافقة على الزواج. وأمرت بإقامة محرقة عند أبواب المدينة كأنها تسترضي روح زوجها الأول، ثم قتلت نفسها أمام شعبها: إنها تلحق بزوجها، كما قالت، مثلما طُلب منها.',
        'وحسب يوستينوس، عُبدت إلهةً ما دامت قرطاج لم تُقهر.'
      ],
      more: 'آلهة قرطاج ←',
      alt: 'نصب بونيقي يحمل علامة تانيت',
      caption: 'نصب بعلامة تانيت'
    },
    quotes: {
      title: 'ماذا يقول القدماء',
      items: [
        { orig: 'Quamdiu Carthago invicta fuit, pro dea culta est.', tr: 'ما دامت قرطاج لم تُقهر، عُبدت إلهةً.', cite: 'يوستينوس، مختصر التواريخ الفيليبية، 18، 6' },
        { orig: 'Exoriare aliquis nostris ex ossibus ultor.', tr: 'انهض من عظامنا أيها المنتقم، أيًّا كنت.', cite: 'فرجيل، الإنيادة، 4، 625 — ديدون تنادي حنبعل' },
        { orig: 'Dux femina facti.', tr: 'امرأةٌ قادت المسعى.', cite: 'فرجيل، الإنيادة، 1، 364' }
      ]
    },
    sourcesNote: {
      kicker: 'المصادر والأرشيف',
      title: 'من أين نعرف ما نعرف',
      items: [
        { key: 'تيمايوس التاورميني', text: 'مؤرخ إغريقي (القرن 4–3 ق.م): أقدم رواية معروفة، تؤرّخ التأسيس بسنة 814 وتفسّر اسم ديدون.' },
        { key: 'ميناندر الأفسسي', text: 'نقله فلافيوس يوسيفوس (ضد أبيون، 1، 18): هروب عليسة والتأسيس في السنة السابعة من حكم بيغماليون.' },
        { key: 'يوستينوس', text: 'مختصر التواريخ الفيليبية لتروغوس بومبيوس، الكتاب 18: المصدر الرئيسي للقصة (الهروب، قبرص، جلد الثور، يارباس، المحرقة).' },
        { key: 'فرجيل', text: 'الإنيادة، الكتابان 1 و4: الرواية الرومانية الأدبية، تُقرأ شعرًا وسياسةً لا تاريخًا.' },
        { key: 'أبيانوس', text: 'ليبيكا (القرن 2 م): منظور إغريقي حول أصول قرطاج وحيلة جلد الثور.' }
      ]
    },
    legacy: {
      kicker: 'الإرث',
      title: 'إرث مؤسِّسة',
      alt: 'ديدون تبني قرطاج، لوحة ويليام تيرنر',
      caption: 'تيرنر، ديدون تبني قرطاج (1815)',
      items: [
        { title: 'مدينة سبعة قرون', text: 'أصبحت قرطاج، من 814 إلى 146 ق.م، القوة البحرية الكبرى في غرب المتوسط، ومنافسة روما لأكثر من قرن.' },
        { title: 'جذور صورية', text: 'الملاحة والتجارة والأبجدية وعبادة ملقرت: تراث صور شكّل جوهر الثقافة القرطاجية.' },
        { title: 'ملكة في الفنون', text: 'أوفيد (البطلات، 7)، بورسيل (ديدو وإينياس، 1689)، برليوز (الطرواديون)، غيران وتيرنر (1815): حضرت ديدون في الأدب والأوبرا والرسم.' },
        { title: 'رمز تونسي', text: 'تبقى عليسة اليوم في تونس الشخصية المؤسِّسة بامتياز، رمزًا للذكاء السياسي والسيادة.' }
      ]
    },
    more: {
      title: 'اقرأ أيضًا',
      items: [
        { to: '/fondation', img: '/img/byrsa.jpg', alt: 'هضبة بيرصا', kicker: '814 ق.م', title: 'تأسيس قرطاج', text: 'قرت حدشت، المدينة الجديدة، وقرونها الأولى.' },
        { to: '/religion', img: '/img/baal.jpg', alt: 'تمثال بعل حمون', kicker: 'المعتقدات', title: 'الديانة', text: 'ملقرت وبعل حمون وتانيت: آلهة قرطاج.' },
        { to: '/biographies', img: '/img/hamilcar.jpg', alt: 'حملقار برقة', kicker: 'الشخصيات', title: 'كل السير', text: 'آل برقا والقادة والملاحون والملكات.' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'يوستينوس', work: 'مختصر التواريخ الفيليبية لتروغوس بومبيوس', ref: '18، 5؛ 18، 6', note: 'المصدر الرئيسي للقصة' },
      { type: 'ancient', author: 'تيمايوس التاورميني', note: 'شذرات نقلها مؤلفون لاحقون: تاريخ 814 واسم ديدون' },
      { type: 'ancient', author: 'فلافيوس يوسيفوس', work: 'ضد أبيون', ref: '1، 18', note: 'نقلاً عن ميناندر الأفسسي' },
      { type: 'ancient', author: 'فرجيل', work: 'الإنيادة', ref: '1، 364؛ 4، 625', note: 'الرواية الرومانية الشعرية' },
      { type: 'ancient', author: 'أبيانوس', work: 'ليبيكا', note: 'حيلة جلد الثور' },
      { type: 'ancient', author: 'أوفيد', work: 'البطلات', ref: '7' }
    ]
  }
}

const c = await useLocalized('didon', C)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-top { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 12px 16px; }
.hero-phoen { font-size: clamp(22px, 2.4vw, 34px); color: var(--gold-light); opacity: 0.85; }
.dates { font: 700 14px/1.3 var(--font-body); margin-bottom: 14px; }
.bio-title { font-size: clamp(44px, 6vw, 92px); overflow-wrap: anywhere; }
.hero-fig { min-height: clamp(380px, 42vw, 580px); }

.keyfigs { margin-top: var(--gap); }
.keyfig .body { margin-top: 6px; font-size: 14px; }

.name-text { margin-top: 14px; }

.life-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.rows .val b { font-weight: 700; }
.src-key { font-size: clamp(17px, 1.5vw, 20px) !important; line-height: 1.2 !important; }

.byrsa-title { margin-bottom: 18px; }
.para + .para { margin-top: 12px; }
.side-fig { min-height: 460px; }
.self-start { align-self: flex-start; }

.pull { border-inline-start: 3px solid var(--ink); padding-inline-start: 18px; }
.pull p { font: 800 clamp(20px, 1.9vw, 26px)/1.25 var(--font-display); color: var(--ink); }
.pull cite { display: block; margin-top: 8px; font: 600 13px/1.3 var(--font-body); font-style: normal; }

.myth .h-card { font-size: clamp(24px, 2.2vw, 32px); margin-bottom: 14px; }

.block-title { margin-bottom: clamp(20px, 2.4vw, 32px); }

.quote { min-height: 240px; }
.q-orig { font: italic 500 15px/1.5 Georgia, serif; color: var(--purple) !important; margin-bottom: 12px; }
.q-tr { font: 800 clamp(19px, 1.7vw, 23px)/1.3 var(--font-display); color: var(--ink) !important; }
.q-cite { font: 600 13px/1.4 var(--font-body); color: var(--muted); }

.leg-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px 28px; }
.leg { border-top: 1px solid rgba(255, 255, 255, 0.22); padding-top: 14px; }
.leg-title { font: 800 18px/1.2 var(--font-display); margin-bottom: 6px; }

@media (max-width: 960px) {
  .hero-fig { min-height: clamp(260px, 60vw, 460px); }
  .side-fig { min-height: 340px; }
  .quote { min-height: 0; }
}

@media (max-width: 640px) {
  .leg-grid { grid-template-columns: minmax(0, 1fr); }
  .side-fig { min-height: 280px; }
  .keyfig { padding: 18px; }
}
</style>
