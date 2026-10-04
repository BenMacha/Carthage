<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <figure class="fig fig--hero s-7" style="background:#6B7A3A">
        <img src="/img/dominus.jpg" :alt="c.heroAlt">
        <figcaption>{{ c.heroCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--olive tile--stack tile--hero s-5">
        <span class="chip chip--glass">{{ c.chip }}</span>
        <div>
          <h1 class="h-display ag-title">{{ c.title }}</h1>
          <p class="lede">{{ c.lede }}</p>
        </div>
      </div>
    </div>

    <!-- Magon -->
    <section class="sec">
      <div class="tile tile--xl tile--ink magon">
        <div>
          <span class="kicker">{{ c.magonKicker }}</span>
          <h2 class="h-section magon-title">{{ c.magonTitle }}</h2>
          <NuxtLink :to="localePath('/magon-agronome')" class="chip magon-link">{{ c.magonLink }}</NuxtLink>
        </div>
        <div class="rows" style="--row-key:120px">
          <div v-for="r in c.magonRows" :key="r.k">
            <span class="key magon-key">{{ r.k }}</span>
            <span class="val">{{ r.v }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Cultures -->
    <div class="cols cols-4 crops">
      <article v-for="card in c.crops" :key="card.title" class="card-img">
        <img :src="card.img" :alt="card.alt" loading="lazy" :style="card.pos ? { objectPosition: card.pos } : null">
        <div class="card-body">
          <h3 class="h-card">{{ card.title }}</h3>
          <p>{{ card.text }}</p>
          <NuxtLink v-if="card.link" :to="localePath(card.link.to)" class="more">{{ card.link.label }}</NuxtLink>
        </div>
      </article>
      <article class="tile tile--gold tile--stack also">
        <h3 class="h-card also-title">{{ c.alsoTitle }}</h3>
        <div class="chips">
          <span v-for="a in c.also" :key="a" class="chip chip--white">{{ a }}</span>
        </div>
      </article>
    </div>

    <!-- Chiffres du territoire -->
    <div class="bento gap-top">
      <div class="tile tile--ink s-12 band">
        <div v-for="s in c.stats" :key="s.n" class="band-item">
          <div class="num">{{ s.n }}</div>
          <p>{{ s.t }}</p>
        </div>
      </div>
    </div>

    <!-- Territoire agricole -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--olive">
          <span class="kicker">{{ c.landKicker }}</span>
          <h2 class="h-block block-title">{{ c.landTitle }}</h2>
          <p v-for="(p, i) in c.landParas" :key="i" class="body-lg para">{{ p }}</p>
        </div>
        <div class="tile tile--xl tile--sand">
          <span class="kicker">{{ c.zonesKicker }}</span>
          <h2 class="h-block block-title">{{ c.zonesTitle }}</h2>
          <div class="rows zone-rows" style="--row-key:112px">
            <div v-for="r in c.zones" :key="r.k">
              <span class="key">{{ r.k }}</span>
              <span class="val">{{ r.v }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cultures et élevage -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.farmTitle }}</h2>
        <p>{{ c.farmAside }}</p>
      </div>
    </section>
    <div class="cols cols-3">
      <div class="tile tile--paper tile--stack">
        <div>
          <span class="kicker">{{ c.plantsKicker }}</span>
          <h3 class="h-card">{{ c.plantsTitle }}</h3>
          <ul class="plist">
            <li v-for="p in c.plants" :key="p.t"><strong>{{ p.t }}</strong> — {{ p.d }}</li>
          </ul>
        </div>
      </div>
      <div class="tile tile--stack">
        <div>
          <span class="kicker">{{ c.seedsKicker }}</span>
          <h3 class="h-card">{{ c.seedsTitle }}</h3>
          <p class="body">{{ c.seedsText }}</p>
        </div>
      </div>
      <div class="tile tile--terra tile--stack">
        <div>
          <span class="kicker">{{ c.herdKicker }}</span>
          <h3 class="h-card">{{ c.herdTitle }}</h3>
          <p class="body">{{ c.herdText }}</p>
        </div>
        <div class="chips">
          <span v-for="h in c.herd" :key="h" class="chip chip--glass">{{ h }}</span>
        </div>
      </div>
    </div>

    <!-- Techniques agricoles -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <span class="kicker">{{ c.techKicker }}</span>
        <h2 class="h-block block-title">{{ c.techTitle }}</h2>
        <div class="rows tech-rows" style="--row-key:150px">
          <div v-for="r in c.tech" :key="r.k">
            <span class="key">{{ r.k }}</span>
            <span class="val">{{ r.v }}</span>
          </div>
        </div>
      </div>
    </section>

    <PageSources :items="c.sources" />

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <h2 class="h-section block-title">{{ c.moreTitle }}</h2>
    </section>
    <div class="cols cols-3">
      <NuxtLink v-for="m in c.moreItems" :key="m.to" :to="localePath(m.to)" class="tile tile--stack link-tile" :class="m.tone">
        <div>
          <span class="kicker">{{ m.k }}</span>
          <h3 class="h-card">{{ m.t }}</h3>
          <p class="body">{{ m.d }}</p>
        </div>
        <span class="more">{{ c.go }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const C = {
  fr: {
    metaTitle: "Agriculture — Carthage, Magon et le Cap Bon",
    metaDesc: "Magon, l'olivier, la vigne et le blé du Cap Bon : l'agriculture de Carthage, l'autre richesse de la cité punique.",
    heroAlt: 'Mosaïque du seigneur Julius, Bardo',
    heroCap: 'Mosaïque du « seigneur Julius », Carthage, IVe s. — Musée du Bardo',
    chip: 'Carthage · Agriculture',
    title: "La terre, l'autre richesse",
    lede: "Carthage n'était pas qu'un port : ses domaines du Cap Bon et de la Medjerda comptaient parmi les plus productifs de la Méditerranée.",
    magonKicker: 'Le seul livre punique traduit par Rome',
    magonTitle: "Magon, père de l'agronomie",
    magonLink: 'Biographie de Magon →',
    magonRows: [
      { k: '28', v: 'livres de traité agricole, écrits en punique.' },
      { k: '146', v: 'Carthage détruite, le Sénat romain fait pourtant traduire Magon en latin.' },
      { k: 'Ier s.', v: "L'agronome Columelle le nomme « père de l'agriculture »." }
    ],
    crops: [
      { img: '/img/olive.jpg', alt: 'Olivier', title: "L'olivier", text: "Huile pour la table, les lampes et les parfums. La Tunisie reste l'un des premiers producteurs mondiaux d'huile d'olive.", link: { to: '/economie', label: "L'économie de Carthage →" } },
      { img: '/img/kerkouane.jpg', alt: 'Kerkouane, Cap Bon', title: 'La vigne', text: 'Au Cap Bon, autour de Kerkouane ; Magon décrit la culture de la vigne et la fabrication du vin de raisins secs.' },
      { img: '/img/dominus.jpg', alt: 'Scènes agricoles, mosaïque', pos: '50% 90%', title: 'Le blé', text: 'Les plaines de la Medjerda deviendront plus tard le « grenier » de Rome.' }
    ],
    stats: [
      { n: '≈ 73 000 km²', t: 'de territoire africain sous contrôle carthaginois à la veille de la première guerre punique (Decret)' },
      { n: '< 25 000 km²', t: 'en 146 av. J.-C., après un demi-siècle d’empiètements de Massinissa (Decret)' },
      { n: '½', t: 'des récoltes réclamée aux paysans libyens pendant la première guerre punique (Polybe, I, 72)' },
      { n: '310', t: 'Agathocle débarque en Afrique et traverse une campagne couverte de domaines (Diodore, XX, 8)' }
    ],
    landKicker: 'Le territoire agricole',
    landTitle: 'La chôra de Carthage',
    landParas: [
      "Les historiens désignent par le mot grec chôra — « la campagne » — le territoire rural qui nourrissait Carthage. Il couvrait une large part de la Tunisie actuelle, une région assez arrosée pour une agriculture abondante, que Rome exploitera à son tour dans sa province d'Afrique (Decret).",
      "Carthage y a vite réparti les rôles : près de la capitale, des domaines voués aux cultures de rapport ; plus loin, les céréales, laissées aux paysans libyens soumis à un tribut en nature. En temps de guerre, la lourdeur de ce tribut les poussa à la révolte, comme en 241 (Polybe, I, 71-72).",
      "Quand Agathocle de Syracuse débarque en 310, ses soldats découvrent un pays de jardins et de vergers irrigués, de villas, de vignes et d'oliviers, de troupeaux et de haras : la description qu'en donne Diodore (XX, 8) est le meilleur témoignage antique sur ces campagnes."
    ],
    zonesKicker: 'Terroirs',
    zonesTitle: 'De la péninsule aux plaines',
    zones: [
      { k: 'Cap Bon', v: "Péninsule de domaines et de bourgs comme Kerkouane ; le sanctuaire rural de Thinissut et les tombes peintes du Djebel Mlezza racontent la vie de ces campagnes." },
      { k: 'Medjerda', v: "La vallée du Bagradas, aux sols profonds propices au blé : le cœur du futur grenier de Rome." },
      { k: 'Emporia', v: "Les riches terres des bords de la petite Syrte, que Massinissa disputa à Carthage dès 193 (Tite-Live, XXXIV, 62)." },
      { k: '146', v: "Le territoire restant devient la province romaine d'Afrique, bornée par la fossa regia, le fossé qui la sépare du royaume numide." }
    ],
    farmTitle: 'Cultures et élevage',
    farmAside: "Vergers de rapport, champs de blé, troupeaux : l'arrière-pays de Carthage nourrissait la ville et alimentait l'exportation.",
    plantsKicker: 'Six cultures',
    plantsTitle: 'Ce que l’on plantait',
    plants: [
      { t: 'Blé', d: 'pour toutes les couches de la société' },
      { t: 'Olivier', d: 'amélioré par la greffe' },
      { t: 'Vigne', d: 'vin et raisins secs' },
      { t: 'Figuier', d: 'fruit consommé frais ou séché' },
      { t: 'Amandier', d: 'culture de verger' },
      { t: 'Grenadier', d: 'le « fruit punique » (malum punicum) des Romains' }
    ],
    seedsKicker: 'Des plants venus d’Orient',
    seedsTitle: 'Sélectionner, exporter',
    seedsText: "Ces espèces poussaient déjà à l'état sauvage en Afrique du Nord, mais les Phéniciens apportèrent des plants sélectionnés. Fruits, viande et vin allaient surtout à la population aisée, le grain à tous. Des produits agricoles puniques ont été retrouvés jusqu'en Grèce.",
    herdKicker: 'Élevage',
    herdTitle: 'Un savoir-faire libyen',
    herdText: "Les populations autochtones pratiquaient l'élevage de longue date, notamment celui des chevaux, des bœufs et des mulets (Polybe, XII, 3) — de quoi fournir montures, attelages et viande.",
    herd: ['Chevaux', 'Bœufs', 'Mulets', 'Moutons'],
    techKicker: 'Techniques agricoles',
    techTitle: "L'agronomie punique",
    tech: [
      { k: 'Le traité', v: "Les méthodes carthaginoises comptaient parmi les plus efficaces de l'Antiquité : Rome les adopta en traduisant Magon. Columelle en a conservé des fragments, dont un procédé de vinification (De re rustica, XII, 39, 1-2)." },
      { k: 'Oliveraies', v: "Plantées selon des règles précises, notamment d'espacement entre les arbres — des normes parfois encore respectées de nos jours." },
      { k: 'Greffe', v: "La greffe de l'olivier permettait d'accroître la productivité des vergers." },
      { k: 'Outillage', v: "Des représentations de charrues montrent un matériel qui tranche avec l'agriculture libyenne traditionnelle (Decret)." }
    ],
    sources: [
      { type: "ancient", author: "Polybe", work: "Histoires", ref: "I, 71–72 ; XII, 3" },
      { type: "ancient", author: "Diodore de Sicile", work: "Bibliothèque historique", ref: "XX, 8" },
      { type: "ancient", author: "Tite-Live", work: "Histoire romaine", ref: "XXXIV, 62" },
      { type: "ancient", author: "Columelle", work: "De l'agriculture (De re rustica)", ref: "XII, 39, 1–2", note: "conserve des fragments de Magon" },
      { type: "ancient", author: "Magon", work: "Traité d'agriculture", note: "perdu ; connu par des fragments" },
      { type: "modern", author: "François Decret", work: "Carthage ou l'empire de la mer", ref: "Seuil, 1977" },
      { type: "modern", author: "Wikipédia", work: "Carthage ; Civilisation carthaginoise", note: "CC BY-SA 4.0, contenus reformulés" }
    ],
    moreTitle: 'À lire aussi',
    go: 'Lire →',
    moreItems: [
      { to: '/magon-agronome', tone: 'tile--olive', k: 'Biographie', t: "Magon l'agronome", d: 'Le traité en 28 livres que Rome fit traduire.' },
      { to: '/economie', tone: '', k: 'Commerce', t: "L'économie de Carthage", d: 'Métaux, pourpre, garum et routes maritimes.' },
      { to: '/lieux', tone: 'tile--navy', k: 'Sites', t: 'Les lieux puniques', d: 'Kerkouane et les autres sites à visiter.' }
    ],
    alsoTitle: 'Et aussi',
    also: ['Grenade (« pomme punique »)', 'Figue', 'Apiculture', 'Élevage', 'Pourpre']
  },
  en: {
    metaTitle: 'Agriculture — Carthage, Mago and Cap Bon',
    metaDesc: "Mago, the olive tree, the vine and the wheat of Cap Bon: Carthage's agriculture, the Punic city's other source of wealth.",
    heroAlt: 'Mosaic of Lord Julius, Bardo',
    heroCap: 'Mosaic of "Lord Julius", Carthage, 4th c. — Bardo Museum',
    chip: 'Carthage · Agriculture',
    title: 'The land, the other wealth',
    lede: 'Carthage was more than a port: its estates on Cap Bon and along the Medjerda were among the most productive in the Mediterranean.',
    magonKicker: 'The only Punic book Rome translated',
    magonTitle: 'Mago, father of agronomy',
    magonLink: "Mago's biography →",
    magonRows: [
      { k: '28', v: 'books on farming, written in Punic.' },
      { k: '146', v: 'With Carthage destroyed, the Roman Senate still had Mago translated into Latin.' },
      { k: '1st c.', v: 'The agronomist Columella calls him "the father of agriculture".' }
    ],
    crops: [
      { img: '/img/olive.jpg', alt: 'Olive tree', title: 'The olive tree', text: 'Oil for the table, for lamps and for perfumes. Tunisia is still one of the world’s leading olive oil producers.', link: { to: '/economie', label: "Carthage's economy →" } },
      { img: '/img/kerkouane.jpg', alt: 'Kerkouane, Cap Bon', title: 'The vine', text: 'On Cap Bon, around Kerkouane; Mago describes growing vines and making raisin wine.' },
      { img: '/img/dominus.jpg', alt: 'Farming scenes, mosaic', pos: '50% 90%', title: 'Wheat', text: 'The Medjerda plains would later become the "granary" of Rome.' }
    ],
    stats: [
      { n: '≈ 73,000 km²', t: 'of African territory under Carthaginian control on the eve of the First Punic War (Decret)' },
      { n: '< 25,000 km²', t: 'in 146 BC, after half a century of encroachment by Masinissa (Decret)' },
      { n: '½', t: 'of the harvest demanded from Libyan farmers during the First Punic War (Polybius, I, 72)' },
      { n: '310', t: 'Agathocles lands in Africa and marches through a countryside covered with estates (Diodorus, XX, 8)' }
    ],
    landKicker: 'The farming territory',
    landTitle: 'The chora of Carthage',
    landParas: [
      'Historians use the Greek word chora — "the countryside" — for the rural territory that fed Carthage. It covered much of present-day Tunisia, a region well enough watered for abundant farming, which Rome would in turn exploit in its province of Africa (Decret).',
      'Carthage soon divided the roles: near the capital, estates devoted to cash crops; further out, cereals, left to Libyan farmers who paid a tribute in kind. In wartime the weight of this tribute drove them to revolt, as in 241 (Polybius, I, 71-72).',
      'When Agathocles of Syracuse landed in 310, his soldiers found a land of irrigated gardens and orchards, country houses, vines and olive trees, herds and horse pastures: Diodorus’ description (XX, 8) is the best ancient witness to these farmlands.'
    ],
    zonesKicker: 'Regions',
    zonesTitle: 'From the peninsula to the plains',
    zones: [
      { k: 'Cap Bon', v: 'A peninsula of estates and small towns such as Kerkouane; the rural sanctuary of Thinissut and the painted tombs of Djebel Mlezza tell of life in this countryside.' },
      { k: 'Medjerda', v: 'The Bagradas valley, with deep soils suited to wheat: the heart of Rome’s future granary.' },
      { k: 'Emporia', v: 'The rich lands along the Lesser Syrtis, which Masinissa contested with Carthage from 193 (Livy, XXXIV, 62).' },
      { k: '146', v: 'The remaining territory became the Roman province of Africa, bounded by the fossa regia, the ditch separating it from the Numidian kingdom.' }
    ],
    farmTitle: 'Crops and livestock',
    farmAside: 'Cash orchards, wheat fields, herds: Carthage’s hinterland fed the city and supplied its exports.',
    plantsKicker: 'Six crops',
    plantsTitle: 'What was grown',
    plants: [
      { t: 'Wheat', d: 'for every level of society' },
      { t: 'Olive', d: 'improved by grafting' },
      { t: 'Vine', d: 'wine and raisins' },
      { t: 'Fig', d: 'eaten fresh or dried' },
      { t: 'Almond', d: 'an orchard crop' },
      { t: 'Pomegranate', d: 'the Romans’ "Punic fruit" (malum punicum)' }
    ],
    seedsKicker: 'Plants from the East',
    seedsTitle: 'Selecting, exporting',
    seedsText: 'These species already grew wild in North Africa, but the Phoenicians brought selected stock. Fruit, meat and wine went mostly to the well-off, grain to everyone. Punic farm produce has been found as far away as Greece.',
    herdKicker: 'Livestock',
    herdTitle: 'A Libyan skill',
    herdText: 'The native peoples had long raised livestock, especially horses, oxen and mules (Polybius, XII, 3) — providing mounts, draught animals and meat.',
    herd: ['Horses', 'Oxen', 'Mules', 'Sheep'],
    techKicker: 'Farming techniques',
    techTitle: 'Punic agronomy',
    tech: [
      { k: 'The treatise', v: 'Carthaginian methods were among the most effective of antiquity: Rome adopted them by translating Mago. Columella preserved fragments, including a winemaking process (On Agriculture, XII, 39, 1-2).' },
      { k: 'Olive groves', v: 'Planted according to precise rules, notably the spacing between trees — standards sometimes still followed today.' },
      { k: 'Grafting', v: 'Grafting olive trees raised the productivity of the orchards.' },
      { k: 'Tools', v: 'Depictions of ploughs show equipment that contrasted with traditional Libyan farming (Decret).' }
    ],
    sources: [
      { type: "ancient", author: "Polybius", work: "Histories", ref: "I, 71–72; XII, 3" },
      { type: "ancient", author: "Diodorus Siculus", work: "Library of History", ref: "XX, 8" },
      { type: "ancient", author: "Livy", work: "History of Rome", ref: "XXXIV, 62" },
      { type: "ancient", author: "Columella", work: "On Agriculture (De re rustica)", ref: "XII, 39, 1–2", note: "preserves fragments of Mago" },
      { type: "ancient", author: "Mago", work: "Treatise on agriculture", note: "lost; known from fragments" },
      { type: "modern", author: "François Decret", work: "Carthage ou l'empire de la mer", ref: "Seuil, 1977" },
      { type: "modern", author: "Wikipedia (French)", work: "Carthage; Civilisation carthaginoise", note: "CC BY-SA 4.0, content rephrased" }
    ],
    moreTitle: 'Read also',
    go: 'Read →',
    moreItems: [
      { to: '/magon-agronome', tone: 'tile--olive', k: 'Biography', t: 'Mago the agronomist', d: 'The 28-book treatise Rome had translated.' },
      { to: '/economie', tone: '', k: 'Trade', t: "Carthage's economy", d: 'Metals, purple dye, garum and sea routes.' },
      { to: '/lieux', tone: 'tile--navy', k: 'Sites', t: 'Punic places', d: 'Kerkouane and the other sites to visit.' }
    ],
    alsoTitle: 'And also',
    also: ['Pomegranate ("Punic apple")', 'Fig', 'Beekeeping', 'Livestock', 'Purple dye']
  },
  ar: {
    metaTitle: 'الفلاحة — قرطاج وماغون والوطن القبلي',
    metaDesc: 'ماغون والزيتون والكروم وقمح الوطن القبلي: الفلاحة القرطاجية، الثروة الأخرى للمدينة البونيقية.',
    heroAlt: 'فسيفساء السيد يوليوس، متحف باردو',
    heroCap: 'فسيفساء «السيد يوليوس»، قرطاج، القرن الرابع — متحف باردو',
    chip: 'قرطاج · الفلاحة',
    title: 'الأرض، الثروة الأخرى',
    lede: 'لم تكن قرطاج ميناءً فحسب: فقد كانت ضياعها في الوطن القبلي ووادي مجردة من أخصب أراضي البحر الأبيض المتوسط.',
    magonKicker: 'الكتاب البونيقي الوحيد الذي ترجمته روما',
    magonTitle: 'ماغون، أبو علم الفلاحة',
    magonLink: 'سيرة ماغون ←',
    magonRows: [
      { k: '28', v: 'كتابًا في الفلاحة، كُتبت باللغة البونيقية.' },
      { k: '146', v: 'بعد تدمير قرطاج، أمر مجلس الشيوخ الروماني مع ذلك بترجمة ماغون إلى اللاتينية.' },
      { k: 'ق. 1', v: 'يسمّيه المهندس الزراعي كولوميلا «أبا الفلاحة».' }
    ],
    crops: [
      { img: '/img/olive.jpg', alt: 'شجرة زيتون', title: 'الزيتون', text: 'زيت للمائدة وللقناديل وللعطور. وما تزال تونس من أكبر منتجي زيت الزيتون في العالم.', link: { to: '/economie', label: 'اقتصاد قرطاج ←' } },
      { img: '/img/kerkouane.jpg', alt: 'كركوان، الوطن القبلي', title: 'الكروم', text: 'في الوطن القبلي حول كركوان؛ يصف ماغون زراعة الكروم وصناعة النبيذ من الزبيب.' },
      { img: '/img/dominus.jpg', alt: 'مشاهد فلاحية، فسيفساء', pos: '50% 90%', title: 'القمح', text: 'ستصبح سهول مجردة لاحقًا «مطمور» روما.' }
    ],
    stats: [
      { n: '≈ 73 000 كم²', t: 'من الأراضي الإفريقية تحت سيطرة قرطاج عشية الحرب البونيقية الأولى (ديكري)' },
      { n: '< 25 000 كم²', t: 'سنة 146 ق.م، بعد نصف قرن من توسّع ماسينيسا على حسابها (ديكري)' },
      { n: '½', t: 'المحاصيل المفروضة على الفلاحين الليبيين أثناء الحرب البونيقية الأولى (بوليبيوس، 1، 72)' },
      { n: '310', t: 'ينزل أغاثوكليس في إفريقيا ويجتاز ريفًا تغطيه الضياع (ديودوروس، 20، 8)' }
    ],
    landKicker: 'الأراضي الفلاحية',
    landTitle: '«خورا» قرطاج',
    landParas: [
      'يستعمل المؤرخون الكلمة الإغريقية «خورا» — أي «الريف» — للدلالة على الإقليم الريفي الذي كان يغذّي قرطاج. وكان يشمل جزءًا كبيرًا من تونس الحالية، وهي منطقة تكفي أمطارها لفلاحة وفيرة، ستستغلها روما بدورها في ولايتها الإفريقية (ديكري).',
      'وزّعت قرطاج الأدوار مبكرًا: قرب العاصمة ضياع مخصصة للزراعات التجارية؛ وأبعد منها الحبوب، متروكة للفلاحين الليبيين الخاضعين لجزية عينية. وفي زمن الحرب دفعهم ثقل هذه الجزية إلى الثورة، كما حدث سنة 241 (بوليبيوس، 1، 71-72).',
      'حين نزل أغاثوكليس السرقوسي سنة 310، وجد جنوده بلادًا من البساتين والحدائق المسقية والدور الريفية والكروم والزياتين وقطعان الماشية ومراعي الخيل: ووصف ديودوروس لها (20، 8) هو أفضل شهادة قديمة على هذه الأرياف.'
    ],
    zonesKicker: 'الأقاليم',
    zonesTitle: 'من شبه الجزيرة إلى السهول',
    zones: [
      { k: 'الوطن القبلي', v: 'شبه جزيرة من الضياع والبلدات مثل كركوان؛ ويحكي المعبد الريفي في تينيسوت والمقابر المرسومة في جبل مليزة حياة هذه الأرياف.' },
      { k: 'مجردة', v: 'وادي باغراداس بتربته العميقة الملائمة للقمح: قلب «مطمور» روما في المستقبل.' },
      { k: 'إمبوريا', v: 'الأراضي الغنية على ضفاف خليج قابس (السرت الصغرى)، التي نازع عليها ماسينيسا قرطاج منذ 193 (تيتوس ليفيوس، 34، 62).' },
      { k: '146', v: 'يصبح ما تبقى من الإقليم ولاية إفريقيا الرومانية، يحدّها «الخندق الملكي» الذي يفصلها عن المملكة النوميدية.' }
    ],
    farmTitle: 'الزراعة وتربية الماشية',
    farmAside: 'بساتين تجارية وحقول قمح وقطعان: كان ظهير قرطاج يغذّي المدينة ويمدّ صادراتها.',
    plantsKicker: 'ست زراعات',
    plantsTitle: 'ما كان يُزرع',
    plants: [
      { t: 'القمح', d: 'لجميع فئات المجتمع' },
      { t: 'الزيتون', d: 'مُحسَّن بالتطعيم' },
      { t: 'الكروم', d: 'النبيذ والزبيب' },
      { t: 'التين', d: 'يؤكل طازجًا أو مجففًا' },
      { t: 'اللوز', d: 'من أشجار البساتين' },
      { t: 'الرمان', d: '«الفاكهة البونيقية» عند الرومان' }
    ],
    seedsKicker: 'شتلات قادمة من المشرق',
    seedsTitle: 'الانتقاء والتصدير',
    seedsText: 'كانت هذه الأنواع تنمو برّية في شمال إفريقيا، لكن الفينيقيين جلبوا شتلات منتقاة. وكانت الفواكه واللحوم والنبيذ تذهب أساسًا إلى الميسورين، والحبوب إلى الجميع. وقد عُثر على منتجات فلاحية بونيقية حتى في بلاد الإغريق.',
    herdKicker: 'تربية الماشية',
    herdTitle: 'مهارة ليبية',
    herdText: 'مارس السكان الأصليون تربية الماشية منذ زمن بعيد، ولا سيما الخيل والأبقار والبغال (بوليبيوس، 12، 3) — فوفّروا الركائب وحيوانات الجرّ واللحم.',
    herd: ['الخيل', 'الأبقار', 'البغال', 'الأغنام'],
    techKicker: 'التقنيات الفلاحية',
    techTitle: 'علم الفلاحة البونيقي',
    tech: [
      { k: 'المصنَّف', v: 'كانت الأساليب القرطاجية من أنجع أساليب العصور القديمة: تبنّتها روما بترجمة ماغون. وحفظ كولوميلا مقتطفات منها، بينها طريقة لصنع النبيذ (في الفلاحة، 12، 39، 1-2).' },
      { k: 'غابات الزيتون', v: 'كانت تُغرس وفق قواعد دقيقة، لا سيما المسافة بين الأشجار — وهي معايير ما يزال بعضها متّبعًا إلى اليوم.' },
      { k: 'التطعيم', v: 'كان تطعيم الزيتون يرفع إنتاجية البساتين.' },
      { k: 'الأدوات', v: 'تُظهر صور المحاريث عتادًا يختلف عن الفلاحة الليبية التقليدية (ديكري).' }
    ],
    sources: [
      { type: "ancient", author: "بوليبيوس", work: "التواريخ", ref: "1، 71–72؛ 12، 3" },
      { type: "ancient", author: "ديودوروس الصقلي", work: "المكتبة التاريخية", ref: "20، 8" },
      { type: "ancient", author: "تيتوس ليفيوس", work: "تاريخ روما", ref: "34، 62" },
      { type: "ancient", author: "كولوميلا", work: "في الفلاحة", ref: "12، 39، 1–2", note: "يحفظ مقتطفات من ماغون" },
      { type: "ancient", author: "ماغون", work: "موسوعة الزراعة", note: "مفقودة؛ لا تُعرف إلا من مقتطفات" },
      { type: "modern", author: "فرانسوا ديكري", work: "Carthage ou l'empire de la mer", ref: "Seuil, 1977" },
      { type: "modern", author: "ويكيبيديا (بالفرنسية)", work: "Carthage ; Civilisation carthaginoise", note: "CC BY-SA 4.0، محتوى أعيدت صياغته" }
    ],
    moreTitle: 'اقرأ أيضًا',
    go: 'اقرأ ←',
    moreItems: [
      { to: '/magon-agronome', tone: 'tile--olive', k: 'سيرة', t: 'ماغون الفلاحي', d: 'المصنَّف ذو الثمانية والعشرين كتابًا الذي أمرت روما بترجمته.' },
      { to: '/economie', tone: '', k: 'التجارة', t: 'اقتصاد قرطاج', d: 'المعادن والأرجوان والغاروم والطرق البحرية.' },
      { to: '/lieux', tone: 'tile--navy', k: 'المواقع', t: 'الأماكن البونيقية', d: 'كركوان وسائر المواقع التي تستحق الزيارة.' }
    ],
    alsoTitle: 'وأيضًا',
    also: ['الرمان («التفاحة البونيقية»)', 'التين', 'تربية النحل', 'تربية الماشية', 'الأرجوان']
  }
}

const c = await useLocalized('agriculture', C)

useHead(() => ({
  title: c.value.metaTitle,
  meta: [{ name: 'description', content: c.value.metaDesc }]
}))
</script>

<style scoped>
.ag-title { font-size: clamp(44px, 5.6vw, 80px); }

.magon {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(28px, 3.4vw, 48px);
}

.magon-title { font-size: clamp(34px, 4.2vw, 60px); line-height: 0.92; }
.magon-link { margin-top: 24px; background: rgba(255, 255, 255, 0.12); color: var(--white); }
.magon-link:hover { background: var(--gold-light); color: var(--ink); }
.magon-key { color: var(--gold-light); font-size: clamp(28px, 2.6vw, 36px); }
.magon .val { color: var(--on-dark-2); }

.crops { padding-top: var(--gap); }

.more {
  display: inline-block;
  margin-top: 12px;
  font: 600 13px/1 var(--font-body);
}

.also { min-height: 260px; }
.also-title { font-size: 28px; }

.gap-top { margin-top: var(--gap); }
.block-title { margin-bottom: 20px; }
.para + .para { margin-top: 12px; }

.band {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  padding: 0;
}
.band-item { padding: clamp(22px, 2.6vw, 36px); }
.band-item + .band-item { border-inline-start: 1px solid rgba(255, 255, 255, 0.16); }
.band-item .num { font-size: clamp(28px, 2.8vw, 42px); overflow-wrap: anywhere; }
.band-item p { font: 500 13px/1.45 var(--font-body); margin-top: 10px; }

.zone-rows .key { font-size: 17px; }
.zone-rows .val { font-size: 15px; color: var(--stone); }

.plist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 14px;
  font: 400 15px/1.4 var(--font-body);
}
.plist li { padding-top: 8px; border-top: 1px solid rgba(22, 19, 15, 0.14); }

.tech-rows .key { color: var(--gold-light); font-size: 18px; }
.tech-rows .val { color: var(--on-dark-2); }

.link-tile { min-height: 210px; }
.link-tile.tile--olive .more, .link-tile.tile--navy .more { color: var(--white); }

@media (max-width: 960px) {
  .magon { grid-template-columns: minmax(0, 1fr); }
  .band { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .band-item:nth-child(3) { border-inline-start: 0; }
  .band-item:nth-child(n + 3) { border-top: 1px solid rgba(255, 255, 255, 0.16); }
}

@media (max-width: 640px) {
  .band-item { padding: 18px; }
  .band-item p { font-size: 12px; }
  .link-tile { min-height: 0; }
}
</style>
