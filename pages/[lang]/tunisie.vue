<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--purple tile--stack tile--hero s-5 hero">
        <div class="watermark ar" aria-hidden="true">قرطاج</div>
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div class="hero-text">
          <h1 class="h-display">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-7" style="background:#1D3F66">
        <img src="/img/byrsa.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Un nom, quatre langues -->
    <section class="sec sec--wide">
      <h2 class="h-section sec-title">{{ c.names.title }}</h2>
    </section>
    <div class="cols cols-4 keep-2 names">
      <div v-for="n in c.names.items" :key="n.name" class="tile tile--stack name" :class="n.cls">
        <span class="glyph" :class="n.glyphCls" :style="n.glyphStyle" :dir="n.glyphDir">{{ n.glyph }}</span>
        <div>
          <div class="h-card">{{ n.name }}</div>
          <p class="body">{{ n.text }}</p>
        </div>
      </div>
    </div>

    <!-- L'Afrique est née en Tunisie -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--gold">
          <span class="kicker">{{ c.africa.kicker }}</span>
          <h2 class="h-section africa-title">{{ c.africa.title }}</h2>
          <div class="rows" style="--row-key:150px">
            <div v-for="r in c.africa.rows" :key="r.key">
              <span class="key">{{ r.key }}</span>
              <span class="val" v-html="r.val" />
            </div>
          </div>
          <p class="note" v-html="c.africa.note" />
          <NuxtLink :to="localePath('/afrique')" class="btn btn-outline more">{{ c.africa.more }} →</NuxtLink>
        </div>
        <figure class="fig africa-fig" style="background:#8E3720">
          <img src="/img/kairouan.jpg" :alt="c.africa.alt" loading="lazy">
          <figcaption class="cap-box" v-html="c.africa.caption" />
        </figure>
      </div>
    </section>

    <!-- Le nom Carthage aujourd'hui -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.today.title }}</h2>
        <p>{{ c.today.aside }}</p>
      </div>
    </section>
    <div class="cols cols-4">
      <div v-for="it in c.today.items" :key="it.name" class="tile tile--stack today" :class="it.cls">
        <span class="kicker">{{ it.kicker }}</span>
        <div>
          <div v-if="it.big" class="num big">{{ it.name }}</div>
          <div v-else class="h-card">{{ it.name }}</div>
          <p class="body small">{{ it.text }}</p>
        </div>
      </div>
    </div>

    <!-- Continuité -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <h2 class="h-section cont-title">{{ c.cont.title }}</h2>
        <div class="cols cols-5 cols--flush">
          <div v-for="(p, i) in c.cont.items" :key="p.name" class="era" :style="{ borderTopColor: eraColors[i] }">
            <div class="era-name">{{ p.name }}</div>
            <div class="era-sub">{{ p.sub }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Carthage, commune d'aujourd'hui -->
    <section class="sec">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.town.kicker }}</span>
          <h2 class="h-section">{{ c.town.title }}</h2>
        </div>
        <p>{{ c.town.aside }}</p>
      </div>
      <div class="cols cols-4 cols--flush">
        <div v-for="(s, i) in c.town.stats" :key="i" class="tile town-stat">
          <div class="num" :style="i === 0 ? { color: '#6E1E47' } : null">{{ s.n }}</div>
          <p class="body small">{{ s.t }}</p>
        </div>
      </div>
    </section>

    <section class="sec town-sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.town.quarters.kicker }}</span>
          <h3 class="h-block town-block">{{ c.town.quarters.title }}</h3>
          <div class="rows" style="--row-key:190px">
            <div v-for="r in c.town.quarters.rows" :key="r.key">
              <span class="key town-key">{{ r.key }}</span>
              <span class="val town-val">{{ r.val }}</span>
            </div>
          </div>
        </div>
        <div class="tile tile--xl tile--gold tile--stack">
          <div>
            <span class="kicker">{{ c.town.palace.kicker }}</span>
            <h3 class="h-block town-block">{{ c.town.palace.title }}</h3>
            <p v-for="(p, i) in c.town.palace.paragraphs" :key="i" class="body town-p">{{ p }}</p>
          </div>
          <p class="note">{{ c.town.palace.mayors }}</p>
        </div>
      </div>
    </section>

    <section class="sec town-sec">
      <div class="cols cols-3 cols--flush">
        <div v-for="t in c.town.life" :key="t.title" class="tile tile--stack town-life" :class="t.cls">
          <span class="kicker">{{ t.kicker }}</span>
          <div>
            <h3 class="h-card">{{ t.title }}</h3>
            <p class="body small">{{ t.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="sec town-sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--navy">
          <span class="kicker">{{ c.town.twins.kicker }}</span>
          <h3 class="h-block town-block">{{ c.town.twins.title }}</h3>
          <div class="rows rows--light" style="--row-key:110px">
            <div v-for="r in c.town.twins.rows" :key="r.key">
              <span class="key town-key">{{ r.key }}</span>
              <span class="val town-val"><b>{{ r.city }}</b> — {{ r.val }}</span>
            </div>
          </div>
        </div>
        <div class="tile tile--xl tile--paper tile--outline tile--stack">
          <div>
            <span class="kicker">{{ c.town.peace.kicker }}</span>
            <h3 class="h-block town-block">{{ c.town.peace.title }}</h3>
            <p class="body">{{ c.town.peace.text }}</p>
          </div>
          <NuxtLink :to="localePath('/apres-146')" class="btn btn-outline">{{ c.town.peace.cta }} →</NuxtLink>
        </div>
      </div>
    </section>

    <PageSources :items="c.sources" />
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const eraColors = ['#E7B75A', '#A89E91', '#A89E91', '#A89E91', '#B8492A']

const names = (t) => [
  { cls: 'tile--ink', glyph: '𐤒𐤓𐤕𐤇𐤃𐤔𐤕', glyphCls: 'phoen', glyphDir: 'rtl', glyphStyle: { color: '#E7B75A', fontSize: 'clamp(26px,3vw,44px)' }, name: 'Qart-Ḥadasht', text: t[0] },
  { cls: '', glyph: 'Καρχηδών', glyphCls: 'serif', glyphStyle: { color: '#6E1E47' }, name: 'Karchēdṓn', text: t[1] },
  { cls: '', glyph: 'CARTHAGO', glyphCls: 'serif', glyphStyle: { color: '#6E1E47', letterSpacing: '.06em' }, name: 'Carthago', text: t[2] },
  { cls: 'tile--terra', glyph: 'قرطاج', glyphCls: 'ar', glyphDir: 'rtl', glyphStyle: { fontWeight: 700, fontSize: 'clamp(30px,3.4vw,48px)' }, name: 'Qarṭāj', text: t[3] }
]

const today = (t) => [
  { cls: '', ...t[0] },
  { cls: '', ...t[1] },
  { cls: '', ...t[2] },
  { cls: '', ...t[3] },
  { cls: 'tile--navy', ...t[4] },
  { cls: '', ...t[5] },
  { cls: '', ...t[6] },
  { cls: 'tile--purple', big: true, ...t[7] }
]

const C = {
  fr: {
    meta: { title: 'Carthage vit en Tunisie', desc: "La cité d'Élissa et d'Hannibal a donné à la Tunisie son premier grand État, et au monde le nom même de l'Afrique." },
    hero: {
      chip: "Tunisie · 3 000 ans d'histoire",
      title: 'Carthage vit en Tunisie',
      lede: "La cité d'Élissa et d'Hannibal a donné à la Tunisie son premier grand État, et au monde le nom même de l'Afrique.",
      alt: 'Colline de Byrsa, Carthage',
      caption: 'Colline de Byrsa et golfe de Tunis — site UNESCO depuis 1979'
    },
    names: {
      title: 'Un nom, quatre langues',
      items: names([
        "Phénicien-punique : « Ville nouvelle ». C'est le nom d'origine, vers 814 av. J.-C.",
        'Le nom grec, utilisé par Polybe et les auteurs hellénistiques.',
        "Le latin, d'où viennent Carthage, Carthagène et Cartagena.",
        "L'arabe : aujourd'hui une commune de la banlieue nord de Tunis."
      ])
    },
    africa: {
      kicker: "D'où vient le mot « Afrique » ?",
      title: "L'Afrique est née en Tunisie",
      rows: [
        { key: 'Les Afri', val: 'Les Romains appelaient <i>Afri</i> les habitants de la région de Carthage.' },
        { key: '146 av. J.-C.', val: "Après la chute de Carthage, Rome crée la province d'<b>Africa</b>, qui correspond au nord-est de l'actuelle Tunisie." },
        { key: 'VIIe s.', val: 'Le nom devient <b class="ar">إفريقية</b> <b>Ifriqiya</b>, avec Kairouan pour capitale : la Tunisie et ses marges.' },
        { key: "Aujourd'hui", val: "Le nom d'une région tunisienne désigne tout un continent de 54 pays." }
      ],
      note: "L'origine du mot <i>Afri</i> reste discutée : on a proposé le berbère <i>ifri</i> (« grotte »), le phénicien <i>ʿafar</i> (« poussière ») ou un nom de tribu.",
      more: "L'Afrique et son nom",
      alt: 'Grande Mosquée de Kairouan',
      caption: "<b>Kairouan</b>, capitale de l'Ifriqiya — la Grande Mosquée (VIIe–IXe s.)"
    },
    today: {
      title: "Le nom Carthage aujourd'hui",
      aside: 'Vingt-deux siècles après 146 av. J.-C., le nom reste le symbole de la Tunisie.',
      items: today([
        { kicker: 'État', name: 'Palais de Carthage', text: 'Siège de la présidence de la République tunisienne.' },
        { kicker: 'Voyage', name: 'Aéroport Tunis-Carthage', text: "La principale porte d'entrée du pays." },
        { kicker: 'Cinéma · depuis 1966', name: 'Journées cinématographiques de Carthage', text: "Le plus ancien festival de cinéma d'Afrique et du monde arabe." },
        { kicker: 'Musique · depuis 1964', name: 'Festival international de Carthage', text: 'Chaque été, dans le théâtre antique de Carthage.' },
        { kicker: 'Sport', name: 'Les Aigles de Carthage', text: "Le surnom de l'équipe nationale de football." },
        { kicker: 'Savoir', name: 'Université de Carthage', text: "L'une des grandes universités publiques du pays." },
        { kicker: 'Scène', name: 'Journées théâtrales de Carthage', text: 'Le grand rendez-vous du théâtre arabe et africain.' },
        { kicker: 'Patrimoine', name: '9', text: "sites tunisiens inscrits à l'UNESCO, dont Carthage, Kerkouane, Dougga et Kairouan." }
      ])
    },
    cont: {
      title: 'Une continuité tunisienne',
      items: [
        { name: 'Carthage punique', sub: '814 – 146 av. J.-C.' },
        { name: 'Africa romaine', sub: "Carthage refondée, deuxième ville d'Occident" },
        { name: 'Ifriqiya', sub: 'Kairouan, Mahdia, Tunis' },
        { name: 'Tunis', sub: 'Hafsides, beylicat' },
        { name: 'Tunisie', sub: 'Indépendance en 1956 — Carthage comme emblème' }
      ]
    },
    town: {
      kicker: 'La commune',
      title: "Carthage, une ville d'aujourd'hui",
      aside: "Une commune résidentielle du Grand Tunis, construite au milieu du site archéologique.",
      stats: [
        { n: '17 010', t: 'habitants au recensement de 2014 (Institut national de la statistique).' },
        { n: '1919', t: 'la municipalité est créée par un décret beylical du 15 juin.' },
        { n: '3', t: 'arrondissements : Carthage, Carthage-Mohamed Ali (créé en 1983) et El Yasmina.' },
        { n: '15 km', t: 'du centre de Tunis, avec environ 3 km de côte sur le golfe, entre Le Kram au sud et Sidi Bou Saïd au nord.' }
      ],
      quarters: {
        kicker: 'Des noms qui racontent le passé',
        title: 'Les quartiers',
        rows: [
          { key: 'Salammbô', val: "Autour des ports puniques et du tophet. Le ministre Mustapha Khaznadar y bâtit le premier palais d'été au XIXe siècle ; l'Institut national des sciences et technologies de la mer (1924) y a son musée océanographique." },
          { key: 'Byrsa', val: "La colline historique : musée national de Carthage, Acropolium (l'ancienne cathédrale) et quartier punique." },
          { key: 'Carthage-Présidence', val: "Autour du palais présidentiel ; Le Corbusier y a construit la villa Baizeau (1928-1929), et le lycée Carthage-Présidence date de 1952." },
          { key: 'Douar Chott · La Malga', val: "Les deux hameaux de paysans qui subsistaient avant le XIXe siècle ; on y trouve le cirque romain et les grandes citernes." },
          { key: 'Dermech, Hannibal, Amilcar', val: "Des stations du TGM et des quartiers résidentiels ; les deux derniers portent les noms de grands Carthaginois." },
          { key: 'Mohamed Ali · El Yasmina', val: "Les quartiers les plus récents, devenus arrondissements quand la population a augmenté." }
        ]
      },
      palace: {
        kicker: 'Palais de Carthage',
        title: "D'une villa coloniale au palais présidentiel",
        paragraphs: [
          "Les premières villas à l'européenne apparaissent vers 1906. La plus importante appartient au secrétaire général du gouvernement tunisien, le haut fonctionnaire français qui dirige de fait l'administration du protectorat.",
          "En 1960, Bourguiba en fait le palais présidentiel, sur le rivage, à deux pas des thermes d'Antonin. Carthage n'est pas la capitale, mais elle est devenue un « lieu de pouvoir emblématique » (Sophie Bessis), Tunis gardant l'administration et l'économie."
        ],
        mayors: "Parmi les maires de la commune : Chedli Klibi (1963-1990) et Fouad Mebazaa (1995-1998)."
      },
      life: [
        { cls: '', kicker: 'Savoir et culture', title: "Une ville d'institutions", text: "Musée national (dans les anciens locaux des Pères blancs), Acropolium et son festival Jazz à Carthage (depuis 2005), Académie tunisienne Beït al-Hikma au palais Zarrouk (depuis 1983), IHEC Carthage, mosquée Mâlik ibn Anas (2003, minaret de 55 m, plus de 1 000 fidèles)." },
        { cls: 'tile--sand', kicker: 'Transport', title: 'Six gares de TGM', text: "Le train TGM traverse la commune et la relie à La Goulette et Tunis d'un côté, à Sidi Bou Saïd et La Marsa de l'autre : stations Salammbô, Byrsa, Dermech, Hannibal, Présidence et Amilcar. Des bus de la Transtu desservent aussi l'Ariana et Tunis." },
        { cls: '', kicker: 'Vie locale', title: 'Résidences, volley et trail', text: "Ville surtout résidentielle, recherchée par diplomates et hauts fonctionnaires, elle vit peu du tourisme malgré ses ruines : peu d'hôtels, pas de grande plage. Côté sport : l'Union sportive de Carthage, réputée en volley-ball, le Club féminin de Carthage et, depuis 2015, le trail urbain Run In Carthage, au départ du théâtre romain." }
      ],
      twins: {
        kicker: 'Jumelages',
        title: 'Quatre villes sœurs',
        rows: [
          { key: '1989', city: 'Carthagène (Espagne)', val: "l'autre Qart Hadasht, fondée par les Barcides." },
          { key: '1993', city: 'Aix-en-Provence (France)', val: 'jumelage signé le 28 janvier.' },
          { key: '1998', city: 'Versailles (France)', val: 'jumelage signé le 28 juin.' },
          { key: '2002', city: 'Tyr (Liban)', val: "la métropole phénicienne d'où serait partie Élissa." }
        ]
      },
      peace: {
        kicker: 'Février 1985',
        title: 'La paix signée avec Rome',
        text: "Les maires de Rome et de Carthage, Ugo Vetere et Chedli Klibi, signent un traité symbolique qui met officiellement fin à la troisième guerre punique, plus de 2 100 ans après 146 av. J.-C.",
        cta: 'Carthage après Carthage'
      }
    },
    sources: [
      { type: 'ancient', author: 'Polybe', work: 'Histoires', note: 'le nom grec de Carthage, Karchēdōn' },
      { type: 'modern', author: 'Sophie Bessis', work: 'Histoire de la Tunisie. De Carthage à nos jours', ref: 'Tallandier, 2019', note: 'Carthage, « lieu de pouvoir emblématique »' },
      { type: 'modern', author: 'Institut national de la statistique (Tunisie)', work: 'Recensement général de la population et de l\'habitat', ref: '2014', note: 'population de la commune' },
      { type: 'modern', author: 'UNESCO', work: 'Site archéologique de Carthage', ref: 'Liste du patrimoine mondial, 1979' },
      { type: 'modern', author: 'Wikipédia', work: 'Carthage', note: 'CC BY-SA 4.0, contenus reformulés' },
      { type: 'modern', author: 'Wikipédia', work: 'Civilisation carthaginoise', note: 'CC BY-SA 4.0, contenus reformulés' }
    ]
  },
  en: {
    meta: { title: 'Carthage lives in Tunisia', desc: "The city of Elissa and Hannibal gave Tunisia its first great state, and gave the world the very name of Africa." },
    hero: {
      chip: 'Tunisia · 3,000 years of history',
      title: 'Carthage lives in Tunisia',
      lede: 'The city of Elissa and Hannibal gave Tunisia its first great state, and gave the world the very name of Africa.',
      alt: 'Byrsa Hill, Carthage',
      caption: 'Byrsa Hill and the Gulf of Tunis — UNESCO site since 1979'
    },
    names: {
      title: 'One name, four languages',
      items: names([
        'Phoenician-Punic: "New City". The original name, around 814 BC.',
        'The Greek name, used by Polybius and the Hellenistic authors.',
        'The Latin, source of Carthage, Carthagena and Cartagena.',
        'Arabic: today a municipality in the northern suburbs of Tunis.'
      ])
    },
    africa: {
      kicker: 'Where does the word "Africa" come from?',
      title: 'Africa was born in Tunisia',
      rows: [
        { key: 'The Afri', val: 'The Romans called the people of the Carthage region <i>Afri</i>.' },
        { key: '146 BC', val: 'After the fall of Carthage, Rome created the province of <b>Africa</b>, covering the north-east of present-day Tunisia.' },
        { key: '7th c.', val: 'The name becomes <b class="ar">إفريقية</b> <b>Ifriqiya</b>, with Kairouan as its capital: Tunisia and its borderlands.' },
        { key: 'Today', val: 'The name of a Tunisian region now designates an entire continent of 54 countries.' }
      ],
      note: 'The origin of the word <i>Afri</i> is still debated: suggestions include the Berber <i>ifri</i> ("cave"), the Phoenician <i>ʿafar</i> ("dust") or the name of a tribe.',
      more: 'Africa and its name',
      alt: 'Great Mosque of Kairouan',
      caption: '<b>Kairouan</b>, capital of Ifriqiya — the Great Mosque (7th–9th c.)'
    },
    today: {
      title: 'The name Carthage today',
      aside: 'Twenty-two centuries after 146 BC, the name remains the symbol of Tunisia.',
      items: today([
        { kicker: 'State', name: 'Carthage Palace', text: 'Seat of the presidency of the Tunisian Republic.' },
        { kicker: 'Travel', name: 'Tunis–Carthage Airport', text: "The country's main gateway." },
        { kicker: 'Cinema · since 1966', name: 'Carthage Film Festival', text: 'The oldest film festival in Africa and the Arab world.' },
        { kicker: 'Music · since 1964', name: 'Carthage International Festival', text: 'Every summer, in the ancient theatre of Carthage.' },
        { kicker: 'Sport', name: 'The Eagles of Carthage', text: "The nickname of the national football team." },
        { kicker: 'Learning', name: 'University of Carthage', text: "One of the country's major public universities." },
        { kicker: 'Stage', name: 'Carthage Theatre Days', text: 'The great meeting place of Arab and African theatre.' },
        { kicker: 'Heritage', name: '9', text: 'Tunisian sites on the UNESCO list, including Carthage, Kerkouane, Dougga and Kairouan.' }
      ])
    },
    cont: {
      title: 'A Tunisian continuity',
      items: [
        { name: 'Punic Carthage', sub: '814 – 146 BC' },
        { name: 'Roman Africa', sub: 'Carthage refounded, second city of the West' },
        { name: 'Ifriqiya', sub: 'Kairouan, Mahdia, Tunis' },
        { name: 'Tunis', sub: 'Hafsids, the beylik' },
        { name: 'Tunisia', sub: 'Independence in 1956 — Carthage as an emblem' }
      ]
    },
    town: {
      kicker: 'The town',
      title: 'Carthage, a town of today',
      aside: 'A residential municipality of Greater Tunis, built in the middle of the archaeological site.',
      stats: [
        { n: '17,010', t: 'inhabitants in the 2014 census (National Institute of Statistics).' },
        { n: '1919', t: 'the municipality is created by a beylical decree of 15 June.' },
        { n: '3', t: 'districts: Carthage, Carthage-Mohamed Ali (created in 1983) and El Yasmina.' },
        { n: '15 km', t: 'from central Tunis, with about 3 km of coast on the gulf, between Le Kram to the south and Sidi Bou Saïd to the north.' }
      ],
      quarters: {
        kicker: 'Names that tell the past',
        title: 'The neighbourhoods',
        rows: [
          { key: 'Salammbô', val: 'Around the Punic ports and the tophet. Minister Mustapha Khaznadar built the first summer palace here in the 19th century; the National Institute of Marine Sciences and Technologies (1924) has its oceanographic museum here.' },
          { key: 'Byrsa', val: 'The historic hill: National Museum of Carthage, the Acropolium (the former cathedral) and the Punic quarter.' },
          { key: 'Carthage-Présidence', val: 'Around the presidential palace; Le Corbusier built the Villa Baizeau here (1928–1929), and the Carthage-Présidence high school dates from 1952.' },
          { key: 'Douar Chott · La Malga', val: 'The two farming hamlets that survived before the 19th century; they hold the Roman circus and the great cisterns.' },
          { key: 'Dermech, Hannibal, Amilcar', val: 'TGM stations and residential areas; the last two bear the names of great Carthaginians.' },
          { key: 'Mohamed Ali · El Yasmina', val: 'The newest areas, which became districts as the population grew.' }
        ]
      },
      palace: {
        kicker: 'Carthage Palace',
        title: 'From colonial villa to presidential palace',
        paragraphs: [
          'The first European-style villas appear around 1906. The largest belongs to the secretary-general of the Tunisian government, the French official who actually ran the administration of the protectorate.',
          'In 1960 Bourguiba turns it into the presidential palace, on the shore, a stone’s throw from the Antonine Baths. Carthage is not the capital, but it has become an “emblematic seat of power” (Sophie Bessis), while Tunis keeps the administration and the economy.'
        ],
        mayors: 'Among the town’s mayors: Chedli Klibi (1963–1990) and Fouad Mebazaa (1995–1998).'
      },
      life: [
        { cls: '', kicker: 'Learning and culture', title: 'A town of institutions', text: 'National Museum (in the former White Fathers’ buildings), the Acropolium and its Jazz à Carthage festival (since 2005), the Tunisian Academy Beit al-Hikma in the Zarrouk palace (since 1983), IHEC Carthage, the Malik ibn Anas Mosque (2003, 55 m minaret, room for over 1,000 worshippers).' },
        { cls: 'tile--sand', kicker: 'Transport', title: 'Six TGM stations', text: 'The TGM train crosses the town, linking it to La Goulette and Tunis on one side and to Sidi Bou Saïd and La Marsa on the other: Salammbô, Byrsa, Dermech, Hannibal, Présidence and Amilcar stations. Transtu buses also run to Ariana and Tunis.' },
        { cls: '', kicker: 'Local life', title: 'Villas, volleyball and trail running', text: 'A mainly residential town, sought after by diplomats and senior officials, it earns little from tourism despite its ruins: few hotels, no large beach. In sport: Union sportive de Carthage, known for volleyball, Club féminin de Carthage and, since 2015, the Run In Carthage urban trail, starting from the Roman theatre.' }
      ],
      twins: {
        kicker: 'Twin towns',
        title: 'Four sister cities',
        rows: [
          { key: '1989', city: 'Cartagena (Spain)', val: 'the other Qart Hadasht, founded by the Barcids.' },
          { key: '1993', city: 'Aix-en-Provence (France)', val: 'twinning signed on 28 January.' },
          { key: '1998', city: 'Versailles (France)', val: 'twinning signed on 28 June.' },
          { key: '2002', city: 'Tyre (Lebanon)', val: 'the Phoenician metropolis Elissa is said to have left.' }
        ]
      },
      peace: {
        kicker: 'February 1985',
        title: 'Peace signed with Rome',
        text: 'The mayors of Rome and Carthage, Ugo Vetere and Chedli Klibi, sign a symbolic treaty officially ending the Third Punic War, more than 2,100 years after 146 BC.',
        cta: 'Carthage after Carthage'
      }
    },
    sources: [
      { type: 'ancient', author: 'Polybius', work: 'Histories', note: 'the Greek name of Carthage, Karchedon' },
      { type: 'modern', author: 'Sophie Bessis', work: 'Histoire de la Tunisie. De Carthage à nos jours', ref: 'Tallandier, 2019', note: 'Carthage as an "emblematic seat of power"' },
      { type: 'modern', author: 'National Institute of Statistics (Tunisia)', work: 'General Population and Housing Census', ref: '2014', note: 'population of the municipality' },
      { type: 'modern', author: 'UNESCO', work: 'Archaeological Site of Carthage', ref: 'World Heritage List, 1979' },
      { type: 'modern', author: 'Wikipedia (French)', work: 'Carthage', note: 'CC BY-SA 4.0, content paraphrased' },
      { type: 'modern', author: 'Wikipedia (French)', work: 'Civilisation carthaginoise', note: 'CC BY-SA 4.0, content paraphrased' }
    ]
  },
  ar: {
    meta: { title: 'قرطاج تحيا في تونس', desc: 'منحت مدينة عليسة وحنبعل تونسَ أولى دولها الكبرى، ومنحت العالم اسم إفريقيا نفسه.' },
    hero: {
      chip: 'تونس · 3000 سنة من التاريخ',
      title: 'قرطاج تحيا في تونس',
      lede: 'منحت مدينة عليسة وحنبعل تونسَ أولى دولها الكبرى، ومنحت العالم اسم إفريقيا نفسه.',
      alt: 'هضبة بيرصا، قرطاج',
      caption: 'هضبة بيرصا وخليج تونس — موقع مسجّل لدى اليونسكو منذ 1979'
    },
    names: {
      title: 'اسم واحد بأربع لغات',
      items: names([
        'الفينيقية البونيقية: «المدينة الجديدة». هو الاسم الأصلي، نحو سنة 814 ق.م.',
        'الاسم الإغريقي، استعمله بوليبيوس والمؤلفون الهلنستيون.',
        'اللاتينية، ومنها جاءت أسماء Carthage وقرطاجنة وCartagena.',
        'العربية: اليوم بلدية في الضاحية الشمالية لتونس العاصمة.'
      ])
    },
    africa: {
      kicker: 'من أين جاءت كلمة «إفريقيا»؟',
      title: 'إفريقيا وُلدت في تونس',
      rows: [
        { key: 'الأفري', val: 'كان الرومان يسمّون سكان منطقة قرطاج <i>Afri</i>.' },
        { key: '146 ق.م', val: 'بعد سقوط قرطاج أنشأت روما ولاية <b>إفريقية</b> (Africa)، وهي تقابل شمال شرق تونس الحالية.' },
        { key: 'القرن 7', val: 'يصبح الاسم <b class="ar">إفريقية</b>، وعاصمتها القيروان: تونس وأطرافها.' },
        { key: 'اليوم', val: 'اسم منطقة تونسية صار يدلّ على قارة كاملة تضم 54 دولة.' }
      ],
      note: 'يبقى أصل كلمة <i>Afri</i> محلّ نقاش: اقتُرح الأمازيغي <i>ifri</i> («المغارة»)، أو الفينيقي <i>ʿafar</i> («الغبار»)، أو اسم قبيلة.',
      more: 'إفريقيا واسمها',
      alt: 'جامع القيروان الكبير',
      caption: '<b>القيروان</b>، عاصمة إفريقية — الجامع الكبير (القرن 7–9)'
    },
    today: {
      title: 'اسم قرطاج اليوم',
      aside: 'بعد اثنين وعشرين قرنًا من سنة 146 ق.م، ما يزال الاسم رمزًا لتونس.',
      items: today([
        { kicker: 'الدولة', name: 'قصر قرطاج', text: 'مقرّ رئاسة الجمهورية التونسية.' },
        { kicker: 'السفر', name: 'مطار تونس قرطاج', text: 'البوابة الرئيسية للبلاد.' },
        { kicker: 'السينما · منذ 1966', name: 'أيام قرطاج السينمائية', text: 'أقدم مهرجان سينمائي في إفريقيا والعالم العربي.' },
        { kicker: 'الموسيقى · منذ 1964', name: 'مهرجان قرطاج الدولي', text: 'كل صيف، في المسرح الأثري بقرطاج.' },
        { kicker: 'الرياضة', name: 'نسور قرطاج', text: 'لقب المنتخب الوطني لكرة القدم.' },
        { kicker: 'المعرفة', name: 'جامعة قرطاج', text: 'إحدى كبرى الجامعات العمومية في البلاد.' },
        { kicker: 'المسرح', name: 'أيام قرطاج المسرحية', text: 'الموعد الكبير للمسرح العربي والإفريقي.' },
        { kicker: 'التراث', name: '9', text: 'مواقع تونسية مسجّلة لدى اليونسكو، منها قرطاج وكركوان ودقّة والقيروان.' }
      ])
    },
    cont: {
      title: 'استمرارية تونسية',
      items: [
        { name: 'قرطاج البونيقية', sub: '814 – 146 ق.م' },
        { name: 'إفريقية الرومانية', sub: 'قرطاج المعاد تأسيسها، ثانية مدن الغرب' },
        { name: 'إفريقية', sub: 'القيروان، المهدية، تونس' },
        { name: 'تونس', sub: 'الحفصيون، البايات' },
        { name: 'الجمهورية التونسية', sub: 'الاستقلال سنة 1956 — قرطاج شعارًا' }
      ]
    },
    town: {
      kicker: 'البلدية',
      title: 'قرطاج، مدينة اليوم',
      aside: 'بلدية سكنية في تونس الكبرى، مبنية وسط الموقع الأثري.',
      stats: [
        { n: '17010', t: 'ساكنًا حسب تعداد 2014 (المعهد الوطني للإحصاء).' },
        { n: '1919', t: 'إحداث البلدية بأمر بايٍّ مؤرّخ في 15 جوان.' },
        { n: '3', t: 'دوائر بلدية: قرطاج، وقرطاج محمد علي (أُحدثت سنة 1983)، والياسمينة.' },
        { n: '15 كم', t: 'عن وسط تونس، مع نحو 3 كم من الساحل على الخليج، بين الكرم جنوبًا وسيدي بوسعيد شمالًا.' }
      ],
      quarters: {
        kicker: 'أسماء تروي الماضي',
        title: 'الأحياء',
        rows: [
          { key: 'صلامبو', val: 'حول الموانئ البونيقية والتوفيت. بنى فيها الوزير مصطفى خزندار أول قصر صيفي في القرن التاسع عشر، وفيها المتحف الأوقيانوغرافي للمعهد الوطني لعلوم وتكنولوجيا البحار (1924).' },
          { key: 'بيرصا', val: 'الهضبة التاريخية: المتحف الوطني بقرطاج، والأكروبوليوم (الكاتدرائية سابقًا)، والحي البونيقي.' },
          { key: 'قرطاج الرئاسة', val: 'حول القصر الرئاسي؛ فيها بنى لوكوربوزييه فيلا بيزو (1928-1929)، ويعود معهد قرطاج الرئاسة إلى سنة 1952.' },
          { key: 'دوار الشط · المعلقة', val: 'القريتان الفلاحيتان اللتان بقيتا قبل القرن التاسع عشر، وفيهما ميدان السباق الروماني والصهاريج الكبرى.' },
          { key: 'الدرمش، حنبعل، أميلكار', val: 'محطات لقطار TGM وأحياء سكنية، ويحمل الأخيران اسمَي قائدين قرطاجيين كبيرين.' },
          { key: 'محمد علي · الياسمينة', val: 'أحدث الأحياء، صارت دوائر بلدية مع تزايد السكان.' }
        ]
      },
      palace: {
        kicker: 'قصر قرطاج',
        title: 'من فيلا استعمارية إلى قصر رئاسي',
        paragraphs: [
          'ظهرت أولى الفيلات على الطراز الأوروبي نحو سنة 1906، وأهمّها فيلا الكاتب العام للحكومة التونسية، الموظف الفرنسي الذي كان يدير فعليًا إدارة الحماية.',
          'سنة 1960 جعلها بورقيبة قصرًا رئاسيًا، على الشاطئ وعلى بعد خطوات من حمّامات أنطونيوس. ليست قرطاج العاصمة، لكنها صارت «مكانًا رمزيًا للسلطة» (صوفي بسيس)، فيما احتفظت تونس بالإدارة والاقتصاد.'
        ],
        mayors: 'من رؤساء البلدية: الشاذلي القليبي (1963-1990) وفؤاد المبزع (1995-1998).'
      },
      life: [
        { cls: '', kicker: 'المعرفة والثقافة', title: 'مدينة المؤسسات', text: 'المتحف الوطني (في مباني الآباء البيض سابقًا)، والأكروبوليوم ومهرجان «جاز قرطاج» (منذ 2005)، والمجمع التونسي للعلوم والآداب والفنون «بيت الحكمة» في قصر زرّوق (منذ 1983)، والمعهد العالي للدراسات التجارية بقرطاج، وجامع مالك بن أنس (2003، مئذنة بارتفاع 55 م، يتّسع لأكثر من 1000 مصلٍّ).' },
        { cls: 'tile--sand', kicker: 'النقل', title: 'ست محطات لقطار TGM', text: 'يعبر قطار TGM البلدية ويربطها بحلق الوادي وتونس من جهة، وبسيدي بوسعيد والمرسى من جهة أخرى: محطات صلامبو، بيرصا، الدرمش، حنبعل، الرئاسة، أميلكار. كما تربطها حافلات شركة نقل تونس بأريانة وتونس.' },
        { cls: '', kicker: 'الحياة المحلية', title: 'فيلات وكرة طائرة وجري', text: 'مدينة سكنية أساسًا، يقصدها الدبلوماسيون وكبار الموظفين، ولا تستفيد كثيرًا من السياحة رغم آثارها: فنادق قليلة ولا شاطئ كبير. رياضيًا: الاتحاد الرياضي بقرطاج المعروف بالكرة الطائرة، والنادي النسائي بقرطاج، ومنذ 2015 سباق «Run In Carthage» الذي ينطلق من المسرح الروماني.' }
      ],
      twins: {
        kicker: 'التوأمة',
        title: 'أربع مدن شقيقة',
        rows: [
          { key: '1989', city: 'قرطاجنة (إسبانيا)', val: 'قرت حدشت الأخرى، التي أسّسها البرقيون.' },
          { key: '1993', city: 'إكس أون بروفانس (فرنسا)', val: 'توأمة وُقّعت في 28 جانفي.' },
          { key: '1998', city: 'فرساي (فرنسا)', val: 'توأمة وُقّعت في 28 جوان.' },
          { key: '2002', city: 'صور (لبنان)', val: 'الحاضرة الفينيقية التي يُروى أن عليسة انطلقت منها.' }
        ]
      },
      peace: {
        kicker: 'فيفري 1985',
        title: 'السلام الموقّع مع روما',
        text: 'يوقّع رئيسا بلديتي روما وقرطاج، أوغو فيتيري والشاذلي القليبي، معاهدة رمزية تُنهي رسميًا الحرب البونيقية الثالثة، بعد أكثر من 2100 سنة من 146 ق.م.',
        cta: 'قرطاج بعد قرطاج'
      }
    },
    sources: [
      { type: 'ancient', author: 'بوليبيوس', work: 'التواريخ', note: 'الاسم اليوناني لقرطاج، كارخيدون' },
      { type: 'modern', author: 'صوفي بسيس', work: 'Histoire de la Tunisie. De Carthage à nos jours', ref: 'Tallandier, 2019', note: 'قرطاج «مكان رمزي للسلطة»' },
      { type: 'modern', author: 'المعهد الوطني للإحصاء (تونس)', work: 'التعداد العام للسكان والسكنى', ref: '2014', note: 'عدد سكان البلدية' },
      { type: 'modern', author: 'اليونسكو', work: 'موقع قرطاج الأثري', ref: 'قائمة التراث العالمي، 1979' },
      { type: 'modern', author: 'ويكيبيديا (بالفرنسية)', work: 'Carthage', note: 'رخصة CC BY-SA 4.0، محتوى أعيدت صياغته' },
      { type: 'modern', author: 'ويكيبيديا (بالفرنسية)', work: 'Civilisation carthaginoise', note: 'رخصة CC BY-SA 4.0، محتوى أعيدت صياغته' }
    ]
  }
}

const c = computed(() => C[locale.value] || C.fr)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-text { position: relative; }

.watermark {
  position: absolute;
  inset-inline-end: -20px;
  top: 40px;
  font: 700 clamp(140px, 18vw, 260px)/1 var(--font-ar);
  color: rgba(255, 255, 255, 0.07);
  pointer-events: none;
  white-space: nowrap;
}

.sec-title { margin-bottom: clamp(20px, 2.4vw, 32px); }

.name { min-height: 240px; }
.glyph { font-size: clamp(28px, 2.8vw, 40px); line-height: 1; }
.glyph.serif { font-family: Georgia, serif; font-weight: 500; }

.africa-title { margin-bottom: 28px; }
.rows .val :deep(b.ar) { font-family: var(--font-ar); }
.note { margin-top: 22px; font: 500 13px/1.5 var(--font-body); }
.more { margin-top: 22px; }
.africa-fig { min-height: 560px; }

.today { min-height: 200px; }
.today .h-card { font-size: clamp(20px, 1.7vw, 24px); }
.small { font-size: 14px; line-height: 1.5; }
.big { font-size: 44px; margin-bottom: 6px; }

.cont-title { margin-bottom: 32px; }
.era { border-top: 3px solid; padding-top: 18px; }
.era-name { font: 900 22px/1 var(--font-display); margin-bottom: 8px; }
.era-sub { font: 500 13px/1.45 var(--font-body); color: var(--on-dark); }

.town-sec { padding-top: var(--gap); }
.town-stat { display: flex; flex-direction: column; gap: 10px; }
.town-stat .num { font-size: clamp(32px, 3.4vw, 48px); }
.town-block { margin: 6px 0 20px; font-size: clamp(26px, 2.6vw, 38px); }
.town-key { font-size: 18px; line-height: 1.15; }
.tile--ink .town-key { color: var(--gold-light); }
.town-val { font-size: 15px; line-height: 1.55; }
.tile--ink .town-val, .tile--navy .town-val { color: var(--on-dark); }
.town-val b { font-weight: 700; }
.tile--navy .town-val b { color: var(--white); }
.town-p + .town-p { margin-top: 12px; }
.town-life { min-height: 260px; }

@media (max-width: 960px) {
  .africa-fig { min-height: 380px; }
}

@media (max-width: 640px) {
  .fig--hero { min-height: 240px; }
  .name { min-height: 0; padding: 18px; gap: 14px; }
  .name .h-card { font-size: 16px; }
  .name .body { font-size: 13px; }
  .today { min-height: 0; }
  .africa-fig { min-height: 300px; }
  .town-life { min-height: 0; }
}
</style>
