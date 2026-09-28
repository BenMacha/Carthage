<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <figure class="fig fig--hero s-5 galley-fig">
        <img src="/img/hanno-galley.png" :alt="c.heroAlt">
        <figcaption>{{ c.heroCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--navy tile--stack tile--hero s-7">
        <div class="hero-top">
          <span class="chip chip--glass">{{ c.chip }}</span>
          <span class="phoen hero-phoen" aria-hidden="true">𐤇𐤍𐤀</span>
        </div>
        <div>
          <p class="kicker">{{ c.dates }}</p>
          <h1 class="h-display hero-title">{{ c.title }}</h1>
          <p class="epithet">{{ c.epithet }}</p>
          <p class="lede">{{ c.lede }}</p>
        </div>
      </div>
    </div>

    <!-- Chiffres clés -->
    <div class="cols cols-4 keep-2">
      <div v-for="s in c.stats" :key="s.n" class="tile stat" :class="s.tone">
        <div class="num">{{ s.n }}</div>
        <p class="body">{{ s.t }}</p>
      </div>
    </div>

    <!-- Citation d'ouverture + le texte -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <blockquote class="tile tile--xl tile--paper tile--outline quote">
          <span class="kicker">{{ c.openKicker }}</span>
          <p class="quote-text">« {{ c.openQuote }} »</p>
          <cite>{{ c.openCite }}</cite>
        </blockquote>
        <div class="tile tile--xl tile--stack">
          <div>
            <span class="kicker">{{ c.textKicker }}</span>
            <h2 class="h-block block-title">{{ c.textTitle }}</h2>
            <p v-for="(p, i) in c.textParas" :key="i" class="body-lg para">{{ p }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Le voyage, étape par étape -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <span class="kicker">{{ c.voyKicker }}</span>
        <h2 class="h-block block-title">{{ c.voyTitle }}</h2>
        <div class="rows" style="--row-key: 210px">
          <div v-for="s in c.steps" :key="s.k">
            <div class="key">{{ s.k }}</div>
            <div class="val">{{ s.v }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Carte animée -->
    <section class="sec">
      <div class="sec-head">
        <h2 class="h-section">{{ c.mapTitle }}</h2>
        <p>{{ c.mapText }}</p>
      </div>
      <MapsAnimatedMap compact initial-mode="voy" :modes="['voy']" />
    </section>

    <!-- Merveilles du Périple -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.wondersTitle }}</h2>
      </div>
    </section>
    <div class="cols cols-3">
      <div v-for="w in c.wonders" :key="w.title" class="tile tile--stack" :class="w.tone">
        <div>
          <span class="kicker">{{ w.kicker }}</span>
          <h3 class="h-card">{{ w.title }}</h3>
          <p class="body">{{ w.text }}</p>
        </div>
      </div>
    </div>

    <!-- Gorilles : citation -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig ship-fig">
          <img src="/img/punic-ship.jpg" :alt="c.shipAlt" loading="lazy">
          <figcaption>{{ c.shipCap }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--purple tile--stack">
          <div>
            <span class="kicker">{{ c.gorKicker }}</span>
            <h2 class="h-block block-title">{{ c.gorTitle }}</h2>
            <blockquote class="gor-quote">
              <p class="quote-text">« {{ c.gorQuote }} »</p>
              <cite>{{ c.gorCite }}</cite>
            </blockquote>
            <p class="body-lg para">{{ c.gorText }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Débats sur l'itinéraire -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.debateTitle }}</h2>
        <p>{{ c.debateLede }}</p>
      </div>
    </section>
    <div class="cols cols-3">
      <div v-for="d in c.debates" :key="d.title" class="tile tile--stack" :class="d.tone">
        <div>
          <span class="kicker">{{ d.kicker }}</span>
          <h3 class="h-card">{{ d.title }}</h3>
          <p class="body">{{ d.text }}</p>
        </div>
        <div class="chips">
          <span v-for="t in d.tags" :key="t" class="chip" :class="{ 'chip--white': !d.tone }">{{ t }}</span>
        </div>
      </div>
    </div>

    <!-- Gadir & Atlantique punique + Héritage -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--stack">
          <div>
            <span class="kicker">{{ c.legacyKicker }}</span>
            <h2 class="h-block block-title">{{ c.legacyTitle }}</h2>
            <div class="rows" style="--row-key: 150px">
              <div v-for="l in c.legacy" :key="l.k">
                <div class="key">{{ l.k }}</div>
                <div class="val">{{ l.v }}</div>
              </div>
            </div>
          </div>
        </div>
        <figure class="fig gadir-fig">
          <img src="/img/gadir.jpg" :alt="c.gadirAlt" loading="lazy">
          <figcaption class="cap-box">{{ c.gadirCap }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- À lire aussi -->
    <section class="sec">
      <h2 class="h-block block-title">{{ c.moreTitle }}</h2>
      <div class="cols cols-3 cols--flush">
        <NuxtLink v-for="l in c.links" :key="l.to" :to="localePath(l.to)" class="tile tile--stack link-tile" :class="l.tone">
          <span class="kicker">{{ l.kicker }}</span>
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
    metaTitle: "Hannon le Navigateur — le Périple vers l'Afrique de l'Ouest | Carthage",
    metaDesc: "Hannon le Navigateur, amiral carthaginois : 60 navires, 30 000 colons, Thymiaterion, Kerné, le « Char des Dieux » et les « gorilles ». Le Périple et les débats sur son itinéraire.",
    heroAlt: 'Galère antique à rames, dessin',
    heroCap: 'Galère antique à rames et à voile',
    chip: 'Navigateur · Carthage',
    dates: 'VIe – Ve s. av. J.-C. (vers 500 ?)',
    title: 'Hannon le Navigateur',
    epithet: "« Roi des Carthaginois » selon le Périple — sans doute un suffète ou un magistrat de la cité.",
    lede: "Envoyé par Carthage au-delà des Colonnes d'Hercule, il longe la côte atlantique de l'Afrique pour y fonder des villes. Son récit, le Périple, est le plus ancien témoignage d'exploration de l'Afrique occidentale.",
    stats: [
      { n: '60', t: 'pentécontères (navires à 50 rames)', tone: 'tile--navy' },
      { n: '30 000', t: 'hommes et femmes, selon le Périple' },
      { n: '6', t: 'villes fondées sur la côte atlantique' },
      { n: '3', t: '« gorilles » capturées, peaux rapportées à Carthage', tone: 'tile--terra' }
    ],
    openKicker: 'Les premiers mots du Périple',
    openQuote: "Il plut aux Carthaginois qu'Hannon naviguât au-delà des Colonnes d'Hercule et fondât des villes de Libyphéniciens. Il partit donc avec soixante pentécontères et une multitude d'hommes et de femmes, environ trente mille, avec des vivres et tout le nécessaire.",
    openCite: "Périple d'Hannon, § 1",
    textKicker: 'Le document',
    textTitle: 'Un texte unique',
    textParas: [
      "Le Périple nous est parvenu en grec, dans un seul manuscrit byzantin du IXe siècle conservé à Heidelberg. Il se présente comme la traduction d'une inscription punique qu'Hannon aurait consacrée, à son retour, dans le temple de Kronos — c'est-à-dire Baal Hammon — à Carthage.",
      "Court (18 paragraphes), sec comme un journal de bord, il compte les jours de navigation et nomme les lieux. C'est l'un des très rares textes carthaginois conservés, même indirectement.",
      "La date de l'expédition est incertaine : on la place en général entre le VIe et le Ve siècle av. J.-C., à l'époque où Carthage organise son réseau de comptoirs atlantiques."
    ],
    voyKicker: 'Le Périple, étape par étape',
    voyTitle: "Au-delà des Colonnes d'Hercule",
    steps: [
      { k: 'Départ', v: "La flotte quitte Carthage, longe l'Afrique du Nord et franchit le détroit de Gibraltar — les Colonnes d'Hercule." },
      { k: 'Thymiaterion', v: "Deux jours après le détroit, première ville fondée, au bord d'une grande plaine." },
      { k: 'Soloeis', v: 'Un cap couvert de forêts ; on y élève un sanctuaire à Poséidon.' },
      { k: 'Cinq cités', v: "Au-delà d'une lagune peuplée d'éléphants, fondation de Karikon Teichos, Gytté, Akra, Melitta et Arambys." },
      { k: 'Le Lixos', v: "Sur ce grand fleuve, amitié avec les Lixites, pasteurs nomades, qui fournissent des interprètes." },
      { k: 'Kerné', v: "Une petite île au fond d'un golfe, où l'on installe des colons : elle devient la base de l'expédition. Hannon estime qu'elle est aussi loin des Colonnes que les Colonnes le sont de Carthage." },
      { k: 'Le Chrétès', v: 'Un fleuve plein de crocodiles et d’hippopotames ; des hommes vêtus de peaux repoussent les marins à coups de pierres.' },
      { k: 'Feux nocturnes', v: "La nuit, la côte s'illumine de feux ; on entend flûtes, cymbales et tambours. Les devins ordonnent de fuir." },
      { k: 'Char des Dieux', v: "Une très haute montagne en feu, dont les flammes semblent toucher les astres : le Theon Ochema, « Char des Dieux »." },
      { k: 'Corne du Sud', v: "Dans une île de ce golfe vivent les « gorilles ». Faute de vivres, la flotte fait demi-tour." },
      { k: 'Retour', v: 'À Carthage, le récit est consacré dans le temple de Baal Hammon.' }
    ],
    mapTitle: 'Sur la carte',
    mapText: "Les voyages d'Élissa, d'Hannon et d'Himilcon. Au-delà du Maroc, l'itinéraire d'Hannon reste une hypothèse.",
    wondersTitle: 'Ce que vit Hannon',
    wonders: [
      { kicker: 'Colonisation', title: 'Des villes de Libyphéniciens', text: "Trente mille hommes et femmes : ce n'est pas un raid, mais une entreprise de peuplement. Les nouvelles cités, peuplées de Carthaginois et d'Africains, jalonnent la route atlantique.", tone: 'tile--navy' },
      { kicker: 'Faune africaine', title: 'Éléphants, crocodiles, hippopotames', text: "Le Périple décrit une lagune où paissent des éléphants, puis un fleuve infesté de crocodiles et d'hippopotames — souvent identifié au Sénégal." },
      { kicker: 'Theon Ochema', title: 'Le « Char des Dieux »', text: "Une montagne de feu visible de la mer. On y a vu le mont Cameroun, volcan actif de plus de 4 000 m ; d'autres pensent à des feux de brousse sur les reliefs côtiers.", tone: 'tile--terra' }
    ],
    shipAlt: 'Proue du navire punique de Marsala',
    shipCap: 'Navire punique de Marsala, IIIe s. av. J.-C.',
    gorKicker: 'Corne du Sud',
    gorTitle: 'Les « gorilles »',
    gorQuote: "Il y avait des sauvages en grand nombre ; les plus nombreux étaient des femmes au corps velu, que nos interprètes appelaient gorilles. Nous ne pûmes prendre les hommes ; nous prîmes trois femmes, qui mordaient et griffaient… Nous les tuâmes et rapportâmes leurs peaux à Carthage.",
    gorCite: "Périple d'Hannon, § 18",
    gorText: "S'agissait-il de chimpanzés, de gorilles ou de babouins ? Nul ne le sait. Pline l'Ancien affirme que ces peaux restèrent exposées dans le temple de Junon (Tanit) jusqu'à la prise de Carthage en 146. En 1847, les naturalistes Savage et Wyman reprirent le mot du Périple pour nommer le grand singe d'Afrique centrale : le gorille.",
    debateTitle: "Jusqu'où est-il allé ?",
    debateLede: "Les historiens débattent depuis des siècles : les distances et les noms du Périple se prêtent à plusieurs lectures.",
    debates: [
      { kicker: 'Lecture longue', title: "Jusqu'au Cameroun", text: "Le Char des Dieux serait le mont Cameroun et la Corne du Sud le fond du golfe de Guinée, voire le Gabon. Hannon aurait parcouru plus de 5 000 km au-delà du détroit.", tags: ['Mont Cameroun', 'Golfe de Guinée'], tone: 'tile--navy' },
      { kicker: 'Lecture médiane', title: 'Sénégal, Sierra Leone', text: "Le Chrétès serait le Sénégal, le Char des Dieux le mont Kakoulima (Guinée) et la Corne du Sud la côte de Sierra Leone. Une hypothèse souvent retenue.", tags: ['Fleuve Sénégal', 'Guinée'] },
      { kicker: 'Lecture courte', title: 'Le Maroc atlantique', text: "Certains savants limitent l'expédition au sud marocain (Kerné = île de Mogador, où l'on a retrouvé un comptoir phénicien) et jugent le reste amplifié, voire romancé, par le traducteur grec.", tags: ['Mogador', 'Texte remanié ?'], tone: 'tile--sand' }
    ],
    legacyKicker: 'Héritage',
    legacyTitle: 'Un récit qui a traversé les siècles',
    legacy: [
      { k: 'Antiquité', v: "Pline l'Ancien et Arrien citent Hannon ; Arrien écrit qu'il fit demi-tour après 35 jours de navigation, faute d'eau et sous une chaleur accablante. Pline le rapproche d'Himilcon, envoyé vers le nord à la même époque." },
      { k: 'XVe siècle', v: "Les Portugais ne franchissent le cap Bojador qu'en 1434 : près de deux mille ans plus tard, les navigateurs de la Renaissance suivaient, sans le savoir, le sillage des pentécontères carthaginoises." },
      { k: '1847', v: 'Le nom « gorille », tiré du Périple, entre dans le vocabulaire scientifique.' },
      { k: "Aujourd'hui", v: "Le Périple reste le seul récit de voyage carthaginois conservé et le plus ancien texte sur les côtes d'Afrique de l'Ouest." }
    ],
    gadirAlt: 'Cadix, l’antique Gadir',
    gadirCap: "Gadir (Cadix), cité phénicienne au-delà du détroit, porte de l'Atlantique punique",
    moreTitle: 'À lire aussi',
    links: [
      { to: '/afrique', kicker: 'Carthage africaine', title: "L'Afrique de Carthage", text: 'Berbères, Numides et routes africaines de la cité punique.', tone: 'tile--terra' },
      { to: '/economie', kicker: 'Commerce', title: "L'économie punique", text: "Comptoirs, métaux et routes maritimes : la richesse de Carthage." },
      { to: '/biographies', kicker: 'Personnages', title: 'Les grandes figures', text: 'Généraux, navigateurs et reines de Carthage.', tone: 'tile--purple' }
    ]
  },
  en: {
    metaTitle: 'Hanno the Navigator — the Periplus to West Africa | Carthage',
    metaDesc: 'Hanno the Navigator, Carthaginian admiral: 60 ships, 30,000 colonists, Thymiaterion, Kerne, the “Chariot of the Gods” and the “gorillas”. The Periplus and the debates over its route.',
    heroAlt: 'Ancient oared galley, drawing',
    heroCap: 'An ancient galley under oar and sail',
    chip: 'Navigator · Carthage',
    dates: '6th – 5th c. BC (c. 500?)',
    title: 'Hanno the Navigator',
    epithet: '“King of the Carthaginians” according to the Periplus — probably a suffete or a magistrate of the city.',
    lede: 'Sent by Carthage beyond the Pillars of Hercules, he sailed along the Atlantic coast of Africa to found cities there. His account, the Periplus, is the oldest record of the exploration of West Africa.',
    stats: [
      { n: '60', t: 'penteconters (50-oared ships)', tone: 'tile--navy' },
      { n: '30,000', t: 'men and women, according to the Periplus' },
      { n: '6', t: 'cities founded on the Atlantic coast' },
      { n: '3', t: '“gorillas” captured, their skins brought to Carthage', tone: 'tile--terra' }
    ],
    openKicker: 'The opening words of the Periplus',
    openQuote: 'It pleased the Carthaginians that Hanno should sail beyond the Pillars of Hercules and found cities of Libyphoenicians. So he set sail with sixty penteconters and a multitude of men and women, about thirty thousand in number, with provisions and all other equipment.',
    openCite: 'Periplus of Hanno, § 1',
    textKicker: 'The document',
    textTitle: 'A unique text',
    textParas: [
      'The Periplus survives in Greek, in a single 9th-century Byzantine manuscript kept in Heidelberg. It presents itself as the translation of a Punic inscription that Hanno dedicated on his return in the temple of Kronos — that is, Baal Hammon — in Carthage.',
      'Short (18 paragraphs) and dry as a ship’s log, it counts the days of sailing and names the places. It is one of the very few Carthaginian texts to survive, even indirectly.',
      'The date of the expedition is uncertain: it is usually placed between the 6th and 5th centuries BC, when Carthage was organising its network of Atlantic trading posts.'
    ],
    voyKicker: 'The Periplus, step by step',
    voyTitle: 'Beyond the Pillars of Hercules',
    steps: [
      { k: 'Departure', v: 'The fleet leaves Carthage, follows the North African coast and passes the Strait of Gibraltar — the Pillars of Hercules.' },
      { k: 'Thymiaterion', v: 'Two days beyond the strait, the first city is founded, beside a great plain.' },
      { k: 'Soloeis', v: 'A wooded cape; a sanctuary to Poseidon is set up there.' },
      { k: 'Five cities', v: 'Beyond a lagoon full of elephants, Karikon Teichos, Gytte, Akra, Melitta and Arambys are founded.' },
      { k: 'The Lixos', v: 'On this great river, friendship with the Lixitae, nomadic herders, who provide interpreters.' },
      { k: 'Kerne', v: 'A small island at the head of a gulf, where settlers are left: it becomes the expedition’s base. Hanno reckons it is as far from the Pillars as the Pillars are from Carthage.' },
      { k: 'The Chretes', v: 'A river full of crocodiles and hippopotamuses; men dressed in animal skins drive the sailors off with stones.' },
      { k: 'Night fires', v: 'At night the coast is ablaze with fires; flutes, cymbals and drums are heard. The soothsayers order them to flee.' },
      { k: 'Chariot of the Gods', v: 'A very high mountain on fire, whose flames seem to touch the stars: the Theon Ochema, “Chariot of the Gods”.' },
      { k: 'Southern Horn', v: 'On an island in this gulf live the “gorillas”. Running short of supplies, the fleet turns back.' },
      { k: 'Return', v: 'In Carthage, the account is dedicated in the temple of Baal Hammon.' }
    ],
    mapTitle: 'On the map',
    mapText: 'The voyages of Elissa, Hanno and Himilco. Beyond Morocco, Hanno’s route remains a hypothesis.',
    wondersTitle: 'What Hanno saw',
    wonders: [
      { kicker: 'Colonisation', title: 'Cities of Libyphoenicians', text: 'Thirty thousand men and women: not a raid but a settlement venture. The new cities, peopled by Carthaginians and Africans, marked out the Atlantic route.', tone: 'tile--navy' },
      { kicker: 'African wildlife', title: 'Elephants, crocodiles, hippos', text: 'The Periplus describes a lagoon where elephants graze, then a river teeming with crocodiles and hippopotamuses — often identified with the Senegal.' },
      { kicker: 'Theon Ochema', title: 'The “Chariot of the Gods”', text: 'A mountain of fire visible from the sea. Some see Mount Cameroon, an active volcano over 4,000 m high; others think of bush fires on the coastal hills.', tone: 'tile--terra' }
    ],
    shipAlt: 'Bow of the Marsala Punic ship',
    shipCap: 'The Marsala Punic ship, 3rd c. BC',
    gorKicker: 'Southern Horn',
    gorTitle: 'The “gorillas”',
    gorQuote: 'There were many savages; most were women with hairy bodies, whom our interpreters called gorillas. We could not catch the men; we took three women, who bit and scratched… We killed them and brought their skins back to Carthage.',
    gorCite: 'Periplus of Hanno, § 18',
    gorText: 'Were they chimpanzees, gorillas or baboons? No one knows. Pliny the Elder says the skins were displayed in the temple of Juno (Tanit) until Carthage fell in 146. In 1847 the naturalists Savage and Wyman borrowed the word from the Periplus to name the great ape of Central Africa: the gorilla.',
    debateTitle: 'How far did he go?',
    debateLede: 'Historians have argued for centuries: the distances and names in the Periplus allow several readings.',
    debates: [
      { kicker: 'Long reading', title: 'As far as Cameroon', text: 'The Chariot of the Gods would be Mount Cameroon and the Southern Horn the far end of the Gulf of Guinea, or even Gabon. Hanno would have sailed more than 5,000 km beyond the strait.', tags: ['Mount Cameroon', 'Gulf of Guinea'], tone: 'tile--navy' },
      { kicker: 'Middle reading', title: 'Senegal, Sierra Leone', text: 'The Chretes would be the Senegal, the Chariot of the Gods Mount Kakoulima (Guinea) and the Southern Horn the coast of Sierra Leone. A frequently held view.', tags: ['Senegal River', 'Guinea'] },
      { kicker: 'Short reading', title: 'Atlantic Morocco', text: 'Some scholars limit the expedition to southern Morocco (Kerne = Mogador island, where a Phoenician trading post has been found) and consider the rest amplified, even embellished, by the Greek translator.', tags: ['Mogador', 'A reworked text?'], tone: 'tile--sand' }
    ],
    legacyKicker: 'Legacy',
    legacyTitle: 'An account that crossed the centuries',
    legacy: [
      { k: 'Antiquity', v: 'Pliny the Elder and Arrian cite Hanno; Arrian writes that he turned back after 35 days at sea, short of water and in scorching heat. Pliny pairs him with Himilco, sent north at the same time.' },
      { k: '15th century', v: 'The Portuguese only rounded Cape Bojador in 1434: nearly two thousand years later, Renaissance navigators were unknowingly following the wake of Carthaginian penteconters.' },
      { k: '1847', v: 'The name “gorilla”, taken from the Periplus, enters the scientific vocabulary.' },
      { k: 'Today', v: 'The Periplus remains the only surviving Carthaginian travel account and the oldest text on the coasts of West Africa.' }
    ],
    gadirAlt: 'Cádiz, ancient Gadir',
    gadirCap: 'Gadir (Cádiz), a Phoenician city beyond the strait, gateway to the Punic Atlantic',
    moreTitle: 'Read also',
    links: [
      { to: '/afrique', kicker: 'African Carthage', title: 'Carthage in Africa', text: 'Berbers, Numidians and the African routes of the Punic city.', tone: 'tile--terra' },
      { to: '/economie', kicker: 'Trade', title: 'The Punic economy', text: 'Trading posts, metals and sea routes: the wealth of Carthage.' },
      { to: '/biographies', kicker: 'People', title: 'The great figures', text: 'Generals, navigators and queens of Carthage.', tone: 'tile--purple' }
    ]
  },
  ar: {
    metaTitle: 'حنّون الملاح — الرحلة إلى غرب إفريقيا | قرطاج',
    metaDesc: 'حنّون الملاح، أميرال قرطاجي: 60 سفينة و30 ألف مستوطن، ثيمياتيريون وكيرني و«عربة الآلهة» و«الغوريلا». نص الرحلة والجدل حول مسارها.',
    heroAlt: 'سفينة قديمة بالمجاذيف، رسم',
    heroCap: 'سفينة قديمة بالمجاذيف والشراع',
    chip: 'ملاح · قرطاج',
    dates: 'القرن السادس – الخامس ق.م (نحو 500؟)',
    title: 'حنّون الملاح',
    epithet: '«ملك القرطاجيين» بحسب نص الرحلة — والأرجح أنه كان شفطًا أو أحد قضاة المدينة.',
    lede: 'أرسلته قرطاج إلى ما وراء أعمدة هرقل، فأبحر بمحاذاة الساحل الأطلسي لإفريقيا ليؤسس فيه مدنًا. وروايته، «الرحلة» (البيريبلوس)، أقدم شهادة على استكشاف غرب إفريقيا.',
    stats: [
      { n: '60', t: 'سفينة خمسينية (بخمسين مجذافًا)', tone: 'tile--navy' },
      { n: '30 000', t: 'رجل وامرأة، بحسب نص الرحلة' },
      { n: '6', t: 'مدن أُسست على الساحل الأطلسي' },
      { n: '3', t: '«غوريلات» أُسرن وحُملت جلودهن إلى قرطاج', tone: 'tile--terra' }
    ],
    openKicker: 'الكلمات الأولى من نص الرحلة',
    openQuote: 'رأى القرطاجيون أن يبحر حنّون إلى ما وراء أعمدة هرقل وأن يؤسس مدنًا لليبيين الفينيقيين. فأبحر بستين سفينة خمسينية، ومعه جمع من الرجال والنساء يبلغ نحو ثلاثين ألفًا، ومعهم المؤن وكل ما يلزم.',
    openCite: 'رحلة حنّون، الفقرة 1',
    textKicker: 'الوثيقة',
    textTitle: 'نص فريد',
    textParas: [
      'وصلنا نص الرحلة باليونانية في مخطوط بيزنطي وحيد من القرن التاسع محفوظ في هايدلبرغ. ويقدّم نفسه على أنه ترجمة لنقش بونيقي كرّسه حنّون بعد عودته في معبد كرونوس — أي بعل حمون — بقرطاج.',
      'نص قصير (18 فقرة) جاف كسجل سفينة، يعدّ أيام الإبحار ويسمّي الأماكن. وهو من النصوص القرطاجية النادرة جدًا التي بقيت، ولو بطريق غير مباشر.',
      'تاريخ الرحلة غير مؤكد: يُرجَّح عادةً أنها جرت بين القرنين السادس والخامس ق.م، حين كانت قرطاج تنظّم شبكة مراكزها التجارية على الأطلسي.'
    ],
    voyKicker: 'الرحلة مرحلةً مرحلة',
    voyTitle: 'ما وراء أعمدة هرقل',
    steps: [
      { k: 'الانطلاق', v: 'يغادر الأسطول قرطاج، ويساير ساحل شمال إفريقيا، ثم يعبر مضيق جبل طارق — أعمدة هرقل.' },
      { k: 'ثيمياتيريون', v: 'بعد يومين من المضيق، تُؤسَّس المدينة الأولى على حافة سهل واسع.' },
      { k: 'سولويس', v: 'رأس تكسوه الغابات، يُقام فيه معبد لبوسيدون.' },
      { k: 'خمس مدن', v: 'وراء بحيرة ساحلية ترعى فيها الفيلة، تُؤسَّس كاريكون تيخوس وغيتي وأكرا وميليتا وأرامبيس.' },
      { k: 'نهر لكسوس', v: 'على هذا النهر الكبير، صداقة مع اللكسيين، الرعاة الرحّل، الذين يقدّمون المترجمين.' },
      { k: 'كيرني', v: 'جزيرة صغيرة في عمق خليج، يُترك فيها مستوطنون فتصبح قاعدة الرحلة. ويقدّر حنّون أن بُعدها عن الأعمدة يساوي بُعد الأعمدة عن قرطاج.' },
      { k: 'نهر خريتيس', v: 'نهر يعجّ بالتماسيح وأفراس النهر؛ ورجال يلبسون الجلود يطردون البحّارة بالحجارة.' },
      { k: 'نيران الليل', v: 'في الليل يشتعل الساحل بالنيران، وتُسمع المزامير والصنوج والطبول. فيأمر العرّافون بالفرار.' },
      { k: 'عربة الآلهة', v: 'جبل شاهق مشتعل تبدو ألسنة لهبه كأنها تلامس النجوم: «ثيون أوخيما»، أي عربة الآلهة.' },
      { k: 'القرن الجنوبي', v: 'في جزيرة من هذا الخليج تعيش «الغوريلا». ولنفاد المؤن، يعود الأسطول أدراجه.' },
      { k: 'العودة', v: 'في قرطاج، تُكرَّس الرواية في معبد بعل حمون.' }
    ],
    mapTitle: 'على الخريطة',
    mapText: 'رحلات عليسة وحنّون وحملكون. وما بعد المغرب، يبقى مسار حنّون فرضية.',
    wondersTitle: 'ما رآه حنّون',
    wonders: [
      { kicker: 'الاستيطان', title: 'مدن لليبيين الفينيقيين', text: 'ثلاثون ألف رجل وامرأة: ليست غارة بل مشروع استيطان. والمدن الجديدة، التي سكنها قرطاجيون وأفارقة، تُعلِّم الطريق الأطلسية.', tone: 'tile--navy' },
      { kicker: 'حيوانات إفريقيا', title: 'فيلة وتماسيح وأفراس نهر', text: 'يصف نص الرحلة بحيرة ترعى فيها الفيلة، ثم نهرًا يعجّ بالتماسيح وأفراس النهر — كثيرًا ما يُطابَق مع نهر السنغال.' },
      { kicker: 'ثيون أوخيما', title: '«عربة الآلهة»', text: 'جبل من نار يُرى من البحر. رأى فيه البعض جبل الكاميرون، البركان النشط الذي يتجاوز علوه 4000 متر؛ ويرى آخرون أنها حرائق أدغال على المرتفعات الساحلية.', tone: 'tile--terra' }
    ],
    shipAlt: 'مقدمة السفينة البونيقية في مرسالا',
    shipCap: 'السفينة البونيقية في مرسالا، القرن الثالث ق.م',
    gorKicker: 'القرن الجنوبي',
    gorTitle: '«الغوريلا»',
    gorQuote: 'كان هناك متوحشون كثيرون، أكثرهم نساء كثيفات الشعر، كان مترجمونا يسمّونهن غوريلا. لم نستطع الإمساك بالرجال، وأمسكنا بثلاث نساء كنّ يعضضن ويخمشن… فقتلناهن وحملنا جلودهن إلى قرطاج.',
    gorCite: 'رحلة حنّون، الفقرة 18',
    gorText: 'أكانت شمبانزي أم غوريلا أم قردة بابون؟ لا أحد يعلم. ويذكر بليني الأكبر أن هذه الجلود ظلت معروضة في معبد جونو (تانيت) حتى سقوط قرطاج سنة 146. وفي 1847 استعار عالما الطبيعة سافاج ووايمان الكلمة من نص الرحلة لتسمية القرد الكبير في وسط إفريقيا: الغوريلا.',
    debateTitle: 'إلى أين وصل؟',
    debateLede: 'يتجادل المؤرخون منذ قرون: فالمسافات والأسماء في نص الرحلة تحتمل قراءات عدة.',
    debates: [
      { kicker: 'القراءة الطويلة', title: 'حتى الكاميرون', text: 'تكون عربة الآلهة جبل الكاميرون، والقرن الجنوبي أقصى خليج غينيا بل الغابون. ويكون حنّون قد قطع أكثر من 5000 كلم وراء المضيق.', tags: ['جبل الكاميرون', 'خليج غينيا'], tone: 'tile--navy' },
      { kicker: 'القراءة الوسطى', title: 'السنغال وسيراليون', text: 'يكون خريتيس نهر السنغال، وعربة الآلهة جبل كاكوليما (غينيا)، والقرن الجنوبي ساحل سيراليون. وهي فرضية كثيرًا ما يُؤخذ بها.', tags: ['نهر السنغال', 'غينيا'] },
      { kicker: 'القراءة القصيرة', title: 'المغرب الأطلسي', text: 'يحصر بعض الباحثين الرحلة في جنوب المغرب (كيرني = جزيرة موغادور، حيث عُثر على مركز تجاري فينيقي)، ويرون أن الباقي ضخّمه المترجم اليوناني أو أضفى عليه طابعًا روائيًا.', tags: ['موغادور', 'نص معدَّل؟'], tone: 'tile--sand' }
    ],
    legacyKicker: 'الإرث',
    legacyTitle: 'رواية عبرت القرون',
    legacy: [
      { k: 'العصور القديمة', v: 'يذكر بليني الأكبر وأريانوس حنّونَ؛ ويكتب أريانوس أنه عاد بعد 35 يومًا من الإبحار لنقص الماء وشدة الحر. ويقرنه بليني بحملكون الذي أُرسل شمالًا في الفترة نفسها.' },
      { k: 'القرن 15', v: 'لم يتجاوز البرتغاليون رأس بوجدور إلا سنة 1434: بعد نحو ألفي عام، كان ملاحو النهضة يتبعون، دون أن يدروا، أثر السفن الخمسينية القرطاجية.' },
      { k: '1847', v: 'اسم «الغوريلا»، المأخوذ من نص الرحلة، يدخل المعجم العلمي.' },
      { k: 'اليوم', v: 'تبقى الرحلة رواية السفر القرطاجية الوحيدة الباقية، وأقدم نص عن سواحل غرب إفريقيا.' }
    ],
    gadirAlt: 'قادش، غادير القديمة',
    gadirCap: 'غادير (قادش)، مدينة فينيقية وراء المضيق، بوابة الأطلسي البونيقي',
    moreTitle: 'اقرأ أيضًا',
    links: [
      { to: '/afrique', kicker: 'قرطاج الإفريقية', title: 'إفريقيا قرطاج', text: 'الأمازيغ والنوميديون والطرق الإفريقية للمدينة البونيقية.', tone: 'tile--terra' },
      { to: '/economie', kicker: 'التجارة', title: 'الاقتصاد البونيقي', text: 'المراكز التجارية والمعادن والطرق البحرية: ثروة قرطاج.' },
      { to: '/biographies', kicker: 'الشخصيات', title: 'الشخصيات الكبرى', text: 'قادة قرطاج وملاحوها وملكاتها.', tone: 'tile--purple' }
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
.galley-fig { background: var(--white); }
.galley-fig > img { object-fit: contain; padding: clamp(16px, 3vw, 40px); padding-bottom: 64px; }

.hero-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
.hero-phoen { font-size: 30px; color: var(--navy-tint); }
.hero-title { font-size: clamp(40px, 5.6vw, 84px); overflow-wrap: break-word; }
.epithet { font: 600 clamp(15px, 1.25vw, 18px)/1.45 var(--font-body); color: var(--navy-tint) !important; margin-top: 14px; max-width: 620px; }

.stat .num { margin-bottom: 8px; overflow-wrap: anywhere; }

.block-title { margin-bottom: 20px; }
.para + .para { margin-top: 12px; }

.quote { margin: 0; display: flex; flex-direction: column; justify-content: center; gap: 18px; }
.quote-text { font: 600 clamp(18px, 1.7vw, 24px)/1.45 var(--font-display); color: var(--ink) !important; margin: 0; }
.quote cite, .gor-quote cite { font: 600 13px/1.3 var(--font-body); font-style: normal; color: var(--purple); }

.gor-quote {
  margin: 0 0 20px;
  padding-inline-start: 18px;
  border-inline-start: 3px solid var(--purple-tint);
}
.gor-quote .quote-text { color: var(--white) !important; font-size: clamp(16px, 1.4vw, 20px); }
.gor-quote cite { display: block; margin-top: 10px; color: var(--purple-tint); }

.ship-fig, .gadir-fig { min-height: clamp(300px, 36vw, 520px); }

.link-tile { min-height: 200px; }

@media (max-width: 640px) {
  .galley-fig > img { padding: 16px 16px 56px; }
  .rows .key { font-size: 20px; }
}
</style>
