<template>
  <div class="amap" :class="{ 'amap--compact': compact }">
    <div class="amap-head">
      <div v-if="!compact">
        <h1 class="h-display">{{ T.title }}</h1>
        <p class="lede">{{ T.lede }}</p>
      </div>
      <div v-if="shownModes.length > 1" class="seg" role="tablist" :aria-label="T.title">
        <button
          v-for="m in shownModes"
          :key="m"
          role="tab"
          :aria-selected="mode === m"
          @click="setMode(m)"
        >{{ T.modes[m] }}</button>
      </div>
    </div>

    <div class="amap-grid">
      <div ref="boxEl" class="mapbox" :style="{ '--k': k }">
        <svg ref="svgEl" viewBox="0 0 1000 620" role="img" :aria-label="T.modes[mode]" />
        <div v-if="yearLabel" class="yr">{{ yearLabel }}</div>
        <div v-if="status !== 'ready'" class="state">{{ status === 'error' ? T.error : T.loading }}</div>
      </div>

      <aside class="panel" aria-live="polite">
        <!-- Territoires -->
        <template v-if="mode === 'terr'">
          <div class="kicker">{{ T.terr.kick }}</div>
          <component :is="compact ? 'h3' : 'h2'" class="ptitle">{{ T.eras[idx].t }}</component>
          <p class="ptext">{{ T.eras[idx].d }}</p>
          <div class="legend">
            <span><i :style="{ background: COL.car }" />{{ T.legend.car }}</span>
            <span><i :style="{ background: COL.rom }" />{{ T.legend.rom }}</span>
            <span><i :style="{ background: COL.num }" />{{ T.legend.num }}</span>
          </div>
        </template>

        <!-- Hannibal -->
        <template v-else-if="mode === 'hann'">
          <div class="kicker">{{ T.hannKick }}</div>
          <component :is="compact ? 'h3' : 'h2'" class="ptitle">{{ T.hann[idx][1] }}</component>
          <p class="ptext">{{ T.hann[idx][2] }}</p>
        </template>

        <!-- Voyages -->
        <template v-else-if="mode === 'voy'">
          <div class="kicker">{{ T.voyKick }}</div>
          <component :is="compact ? 'h3' : 'h2'" class="ptitle">{{ T.voyTitle }}</component>
          <p class="ptext">{{ T.voyText }}</p>
        </template>

        <!-- Alliés -->
        <template v-else>
          <div class="kicker">{{ T.allKick }}</div>
          <component :is="compact ? 'h3' : 'h2'" class="ptitle">{{ T.allTitle }}</component>
          <p class="ptext">{{ T.allText }}</p>
          <div class="legend">
            <span><i :style="{ background: COL.car }" />{{ T.legend.allyCar }}</span>
            <span><i :style="{ background: COL.rom }" />{{ T.legend.allyRom }}</span>
          </div>
        </template>

        <!-- Lecture -->
        <div v-if="mode === 'terr' || mode === 'hann'" class="ctrl">
          <button class="play" :aria-label="playing ? T.pause : T.play" @click="togglePlay">{{ playing ? '❚❚' : '▶' }}</button>
          <input
            type="range"
            min="0"
            :max="steps.length - 1"
            :value="idx"
            :aria-label="T.timeline"
            @input="onRange"
          >
        </div>
        <div v-else-if="mode === 'voy'" class="ctrl">
          <button class="play" :aria-label="T.replay" @click="playV(null)">↻</button>
          <span class="ptext">{{ T.replay }}</span>
        </div>

        <!-- Étapes -->
        <div class="steps">
          <template v-if="mode === 'terr'">
            <button v-for="(e, i) in T.eras" :key="i" class="step" :class="{ on: idx === i }" @click="jump(i)">
              <b>{{ ERAS[i].y }}</b><span>{{ e.t }}</span>
            </button>
          </template>
          <template v-else-if="mode === 'hann'">
            <button v-for="(h, i) in T.hann" :key="i" class="step" :class="{ on: idx === i }" @click="jump(i)">
              <b>{{ h[0] }}</b><span>{{ h[1] }}</span>
            </button>
          </template>
          <template v-else-if="mode === 'voy'">
            <button v-for="(v, i) in T.voy" :key="i" class="step step--dot" :class="{ on: focus === i }" @click="playV(i)">
              <i :style="{ background: VOY[i].c }" />
              <span><b class="step-name">{{ v.n }} · {{ v.d }}</b>{{ v.t }}</span>
            </button>
          </template>
          <template v-else>
            <button v-for="(a, i) in T.allies" :key="i" class="step" :class="{ on: focus === i }" @click="focusA(i)">
              <b>{{ ALLIES[i][3] }}</b>
              <span><b class="step-name" :style="{ color: ALLIES[i][2] === 'car' ? COL.car : COL.rom }">{{ a[0] }}</b>{{ a[1] }}</span>
            </button>
          </template>
        </div>
      </aside>
    </div>
    <p class="src">{{ T.src }}</p>
  </div>
</template>

<script setup>
// Carte animée D3. Utilisable en page entière (/carte) ou intégrée dans une page :
// <MapsAnimatedMap compact initial-mode="hann" :modes="['hann']" />
const props = defineProps({
  initialMode: { type: String, default: 'terr' },
  modes: { type: Array, default: null },
  compact: { type: Boolean, default: false }
})

const { locale } = useI18n()

const COL = { car: '#6E1E47', rom: '#5E574F', num: '#B8492A', ally: '#D6A23E', land: '#EAE2D3', stroke: '#C9BCA5', navy: '#1D3F66' }
const MODES = ['terr', 'hann', 'voy', 'all']
const EXT = { terr: [[-10, 30], [26, 47]], hann: [[-3, 34], [19, 47]], voy: [[-20, 2], [37, 50]], all: [[-3, 33], [29, 47]] }
const W = 1000
const H = 620

const Z = {
  tun: [[8.3, 37.3], [11.3, 37.3], [11.2, 35.2], [10.3, 34.1], [8.3, 34.6]],
  trip: [[10.3, 34.1], [12, 33.2], [15.6, 32.6], [15.6, 31.4], [10, 32.4]],
  wsic: [[12.2, 38.4], [13.9, 38.3], [13.5, 37.0], [12.2, 37.5]],
  sic: [[12.2, 38.4], [15.8, 38.4], [15.4, 36.5], [12.2, 37.4]],
  sar: [[7.9, 41.4], [10.1, 41.4], [10.1, 38.7], [7.9, 38.7]],
  cor: [[8.3, 43.1], [9.8, 43.1], [9.8, 41.3], [8.3, 41.3]],
  nafr: [[-6.2, 36.2], [8.3, 37.3], [8.3, 35.6], [-6.2, 34.6]],
  sspa: [[-7, 37.4], [-5.4, 35.8], [-2, 36.6], [-0.4, 37.7], [-2.2, 37.6], [-7, 37.6]],
  barc: [[-9, 37], [-5.4, 35.8], [-2, 36.6], [0.2, 38.6], [0.9, 40.6], [1, 41.1], [-2.5, 41], [-6, 39.8], [-9.5, 39.3]],
  ita: [[7, 44.5], [12.4, 44.2], [14, 42.6], [18.7, 40.4], [18.6, 39.7], [16.7, 37.8], [15.6, 38.3], [12, 41.2], [10, 43.1]],
  nita: [[6.5, 46.6], [13.9, 46.6], [12.4, 44.2], [7, 44.5], [6.5, 45]],
  numw: [[-2, 35.8], [3.5, 37.1], [3.5, 34], [-2, 33.6]],
  nume: [[3.5, 37.1], [8.3, 37.3], [8.3, 34.6], [3.5, 34]]
}

const ERAS = [
  { y: '814', car: ['tun0'], rom: [] },
  { y: '~550', car: ['tun', 'trip', 'wsic', 'sar', 'sspa'], rom: [] },
  { y: '264', car: ['tun', 'trip', 'wsic', 'sar', 'cor', 'nafr', 'sspa'], rom: ['ita'] },
  { y: '237', car: ['tun', 'trip', 'nafr', 'sspa'], rom: ['ita', 'sic', 'sar', 'cor'] },
  { y: '218', car: ['tun', 'trip', 'nafr', 'barc'], rom: ['ita', 'nita', 'sic', 'sar', 'cor'] },
  { y: '201', car: ['tun', 'trip'], rom: ['ita', 'nita', 'sic', 'sar', 'cor', 'barc'], num: ['numw', 'nume'] },
  { y: '146', car: [], rom: ['ita', 'nita', 'sic', 'sar', 'cor', 'barc', 'tun'], num: ['numw', 'nume'] }
]

const HANN = [[-0.27, 39.68], [-0.98, 37.6], [0.6, 40.8], [2.9, 42.45], [4.65, 43.95], [7.05, 44.7], [9.6, 45.0], [12.1, 43.2], [16.13, 41.3], [14.25, 41.08], [12.6, 41.95], [17.12, 39.08], [10.64, 35.83], [9.2, 36.3]]

const VOY = [
  { c: COL.car, pts: [[35.2, 33.27], [33.3, 34.9], [28, 34.8], [22, 35.2], [15, 36.4], [10.32, 36.85]] },
  { c: COL.num, pts: [[10.32, 36.85], [3, 37.2], [-5.6, 35.95], [-6.1, 35.2], [-9.77, 31.5], [-12.9, 27.9], [-16.5, 19.5], [-16.5, 16.0], [-17.2, 12.5], [-13.5, 9.5], [-9, 5], [-2, 4.8], [5, 4.3], [9.2, 3.9]] },
  { c: COL.navy, pts: [[10.32, 36.85], [3, 37.2], [-5.6, 35.95], [-9.2, 37], [-9.6, 40], [-9.2, 43.2], [-6, 44.2], [-4.8, 48.3]] }
]

// [lon, lat, camp, année]
const ALLIES = [
  [14.25, 41.08, 'car', '216'], [17.24, 40.47, 'car', '212'], [15.29, 37.07, 'car', '214'], [22.4, 40.6, 'car', '215'],
  [10.5, 45.3, 'car', '218'], [0.8, 35.2, 'car', '206'], [6.6, 36.4, 'rom', '206'], [27.2, 39.1, 'rom', '211'], [5.37, 43.3, 'rom', '218']
]

const TXT = {
  fr: {
    title: 'Carte animée',
    lede: "Territoires au fil du temps, campagne d'Hannibal, grands voyages et alliances : Carthage et la Méditerranée en mouvement.",
    modes: { terr: 'Territoires', hann: "Campagne d'Hannibal", voy: 'Voyages', all: 'Alliés' },
    bc: ' av. J.-C.',
    loading: 'Chargement du fond de carte…',
    error: 'Impossible de charger le fond de carte.',
    play: 'Lecture', pause: 'Pause', replay: "Rejouer l'animation", timeline: 'Chronologie',
    legend: { car: 'Carthage', rom: 'Rome', num: 'Numidie', allyCar: 'Allié de Carthage', allyRom: 'Allié de Rome' },
    terr: { kick: 'Territoires au fil du temps' },
    places: { carthage: 'Carthage', rome: 'Rome', nova: 'Carthagène', tyr: 'Tyr', lixus: 'Lixus', mogador: 'Mogador', oes: 'Oestrymnides ?', pillars: "Colonnes d'Hercule" },
    eras: [
      { t: 'Fondation', d: "Des colons de Tyr, menés par Élissa, fondent Qart-Ḥadasht au fond du golfe de Tunis." },
      { t: 'Carthage prend la tête du monde punique', d: "Les Magonides étendent l'influence carthaginoise : Sardaigne, ouest de la Sicile, Ibiza, comptoirs d'Afrique et d'Hispanie." },
      { t: "L'apogée", d: "Avant la première guerre punique, Carthage domine la Méditerranée occidentale. Rome vient d'unifier la péninsule italienne." },
      { t: 'La Sicile et la Sardaigne perdues', d: "Vaincue en 241, Carthage cède la Sicile ; Rome s'empare de la Sardaigne et de la Corse en 238. Hamilcar part conquérir l'Hispanie." },
      { t: "L'empire des Barcides", d: "L'Hispanie jusqu'à l'Èbre, ses mines d'argent et Carthagène financent l'expédition d'Hannibal." },
      { t: 'Après Zama', d: "Carthage ne garde que son territoire africain ; l'Hispanie passe à Rome. Massinissa s'agrandit aux dépens de Carthage." },
      { t: 'La chute', d: "Carthage est détruite. Son territoire devient la province romaine d'Africa — le nom qui désignera tout le continent." }
    ],
    hannKick: 'Deuxième guerre punique · 219–202',
    hann: [
      ['219', 'Sagonte', 'Siège de la ville alliée de Rome : la guerre est déclarée.'],
      ['218', 'Carthagène', 'Départ au printemps avec environ 90 000 fantassins, 12 000 cavaliers et 37 éléphants.'],
      ['218', 'Èbre', 'Hannibal franchit la limite fixée par le traité de 226.'],
      ['218', 'Pyrénées', 'Combats contre les tribus ; une partie des troupes reste en Hispanie.'],
      ['218', 'Rhône', 'Les éléphants traversent sur des radeaux couverts de terre.'],
      ['218', 'Les Alpes', 'Quinze jours dans la neige ; 26 000 hommes arrivent en Italie.'],
      ['déc. 218', 'Trébie', "Première grande victoire : l'embuscade de Magon."],
      ['juin 217', 'Trasimène', "L'armée de Flaminius piégée entre le lac et les collines."],
      ['août 216', 'Cannes', "Le double enveloppement : la pire défaite de l'histoire romaine."],
      ['216–211', 'Capoue', "La deuxième ville d'Italie passe dans le camp d'Hannibal."],
      ['211', 'Aux portes de Rome', 'Marche sur Rome pour dégager Capoue : « Hannibal ad portas ».'],
      ['203', 'Crotone', 'Rappelé en Afrique après quinze ans en Italie.'],
      ['203', 'Hadrumète', "Débarquement près de l'actuelle Sousse."],
      ['202', 'Zama', 'Défaite face à Scipion et Massinissa. Fin de la guerre.']
    ],
    voyKick: 'Grands voyages',
    voyTitle: 'Les routes de la mer',
    voyText: "Navigateurs et marchands carthaginois ont franchi le détroit de Gibraltar vers l'Atlantique, au nord comme au sud.",
    voy: [
      { n: 'Élissa · Tyr → Carthage', d: '~814', t: 'Le voyage fondateur depuis la Phénicie, par Chypre.' },
      { n: "Hannon · vers l'Afrique de l'Ouest", d: 'Ve s.', t: "D'après le Périple attribué à Hannon : 60 navires, fondation de comptoirs sur la côte atlantique du Maroc, puis une exploration jusqu'au golfe de Guinée (itinéraire discuté)." },
      { n: "Himilcon · vers l'Atlantique nord", d: 'Ve s.', t: "Le long de l'Hispanie jusqu'aux « îles Oestrymnides » (Bretagne ?), sur la route de l'étain." }
    ],
    allKick: 'Deuxième guerre punique',
    allTitle: 'Alliés et rivaux',
    allText: "Après Cannes, une partie de l'Italie du Sud et de la Méditerranée se range du côté de Carthage. Rome, elle, retourne les Numides.",
    allies: [
      ['Capoue', "La deuxième ville d'Italie rejoint Hannibal après Cannes."],
      ['Tarente', 'Livrée à Hannibal par ses habitants.'],
      ['Syracuse', "Rompt avec Rome ; Archimède défend la ville jusqu'en 212."],
      ['Macédoine', 'Traité entre Hannibal et Philippe V, conservé par Polybe.'],
      ['Gaulois cisalpins', "Boïens et Insubres se soulèvent contre Rome et grossissent l'armée d'Hannibal."],
      ['Syphax', "Roi numide de l'ouest, allié de Carthage, époux de Sophonisbe."],
      ['Massinissa', "Prince numide de l'est : passe du côté de Rome et décide de Zama."],
      ['Pergame', 'Allié de Rome contre la Macédoine.'],
      ['Marseille', "Cité grecque, fidèle alliée de Rome, qui l'avertit du passage d'Hannibal."]
    ],
    src: "Frontières approximatives d'après les synthèses historiques (zones d'influence, non des frontières modernes). Fond de carte : Natural Earth. Positions antiques : localisations usuelles."
  },
  en: {
    title: 'Animated map',
    lede: "Territories over time, Hannibal's campaign, great voyages and alliances: Carthage and the Mediterranean in motion.",
    modes: { terr: 'Territories', hann: "Hannibal's campaign", voy: 'Voyages', all: 'Allies' },
    bc: ' BC',
    loading: 'Loading base map…',
    error: 'The base map could not be loaded.',
    play: 'Play', pause: 'Pause', replay: 'Replay the animation', timeline: 'Timeline',
    legend: { car: 'Carthage', rom: 'Rome', num: 'Numidia', allyCar: 'Ally of Carthage', allyRom: 'Ally of Rome' },
    terr: { kick: 'Territories over time' },
    places: { carthage: 'Carthage', rome: 'Rome', nova: 'Carthago Nova', tyr: 'Tyre', lixus: 'Lixus', mogador: 'Mogador', oes: 'Oestrymnides?', pillars: 'Pillars of Hercules' },
    eras: [
      { t: 'Founding', d: 'Settlers from Tyre, led by Elissa, found Qart-Ḥadasht at the head of the Gulf of Tunis.' },
      { t: 'Carthage leads the Punic world', d: 'The Magonids extend Carthaginian influence: Sardinia, western Sicily, Ibiza, trading posts in Africa and Hispania.' },
      { t: 'The height of power', d: 'Before the First Punic War, Carthage dominates the western Mediterranean. Rome has just unified the Italian peninsula.' },
      { t: 'Sicily and Sardinia lost', d: 'Defeated in 241, Carthage cedes Sicily; Rome seizes Sardinia and Corsica in 238. Hamilcar sets out to conquer Hispania.' },
      { t: 'The Barcid empire', d: "Hispania up to the Ebro, its silver mines and Carthago Nova fund Hannibal's expedition." },
      { t: 'After Zama', d: 'Carthage keeps only its African territory; Hispania passes to Rome. Masinissa expands at Carthage’s expense.' },
      { t: 'The fall', d: 'Carthage is destroyed. Its territory becomes the Roman province of Africa — the name that will one day cover the whole continent.' }
    ],
    hannKick: 'Second Punic War · 219–202',
    hann: [
      ['219', 'Saguntum', 'Siege of a city allied to Rome: war is declared.'],
      ['218', 'Carthago Nova', 'Departure in spring with about 90,000 infantry, 12,000 cavalry and 37 elephants.'],
      ['218', 'Ebro', 'Hannibal crosses the limit set by the treaty of 226.'],
      ['218', 'Pyrenees', 'Fighting against the tribes; part of the army stays in Hispania.'],
      ['218', 'Rhône', 'The elephants cross on rafts covered with earth.'],
      ['218', 'The Alps', 'Fifteen days in the snow; 26,000 men reach Italy.'],
      ['Dec. 218', 'Trebia', "First great victory: Mago's ambush."],
      ['June 217', 'Trasimene', "Flaminius's army trapped between the lake and the hills."],
      ['Aug. 216', 'Cannae', 'The double envelopment: the worst defeat in Roman history.'],
      ['216–211', 'Capua', "Italy's second city goes over to Hannibal."],
      ['211', 'At the gates of Rome', 'A march on Rome to relieve Capua: “Hannibal ad portas”.'],
      ['203', 'Croton', 'Recalled to Africa after fifteen years in Italy.'],
      ['203', 'Hadrumetum', 'Landing near present-day Sousse.'],
      ['202', 'Zama', 'Defeat by Scipio and Masinissa. End of the war.']
    ],
    voyKick: 'Great voyages',
    voyTitle: 'The sea routes',
    voyText: 'Carthaginian navigators and merchants passed the Strait of Gibraltar into the Atlantic, heading both north and south.',
    voy: [
      { n: 'Elissa · Tyre → Carthage', d: '~814', t: 'The founding voyage from Phoenicia, by way of Cyprus.' },
      { n: 'Hanno · to West Africa', d: '5th c.', t: 'According to the Periplus attributed to Hanno: 60 ships, trading posts founded on the Atlantic coast of Morocco, then an exploration as far as the Gulf of Guinea (route debated).' },
      { n: 'Himilco · to the North Atlantic', d: '5th c.', t: 'Along Hispania to the “Oestrymnides islands” (Brittany?), on the tin route.' }
    ],
    allKick: 'Second Punic War',
    allTitle: 'Allies and rivals',
    allText: 'After Cannae, part of southern Italy and the Mediterranean sides with Carthage. Rome, for its part, turns the Numidians.',
    allies: [
      ['Capua', "Italy's second city joins Hannibal after Cannae."],
      ['Tarentum', 'Handed over to Hannibal by its inhabitants.'],
      ['Syracuse', 'Breaks with Rome; Archimedes defends the city until 212.'],
      ['Macedon', 'Treaty between Hannibal and Philip V, preserved by Polybius.'],
      ['Cisalpine Gauls', "The Boii and Insubres rise against Rome and swell Hannibal's army."],
      ['Syphax', 'Western Numidian king, ally of Carthage, husband of Sophonisba.'],
      ['Masinissa', 'Eastern Numidian prince: goes over to Rome and decides Zama.'],
      ['Pergamon', 'Ally of Rome against Macedon.'],
      ['Massalia', "Greek city, Rome's loyal ally, which warns it of Hannibal's passage."]
    ],
    src: 'Approximate borders based on historical syntheses (spheres of influence, not modern borders). Base map: Natural Earth. Ancient sites: customary locations.'
  },
  ar: {
    title: 'الخريطة المتحركة',
    lede: 'الأراضي عبر الزمن، وحملة حنبعل، والرحلات الكبرى والتحالفات: قرطاج والمتوسط في حركة.',
    modes: { terr: 'الأراضي', hann: 'حملة حنبعل', voy: 'الرحلات', all: 'الحلفاء' },
    bc: ' ق.م',
    loading: 'جارٍ تحميل الخريطة…',
    error: 'تعذّر تحميل الخريطة.',
    play: 'تشغيل', pause: 'إيقاف', replay: 'إعادة التحريك', timeline: 'التسلسل الزمني',
    legend: { car: 'قرطاج', rom: 'روما', num: 'نوميديا', allyCar: 'حليف قرطاج', allyRom: 'حليف روما' },
    terr: { kick: 'الأراضي عبر الزمن' },
    places: { carthage: 'قرطاج', rome: 'روما', nova: 'قرطاجنة', tyr: 'صور', lixus: 'ليكسوس', mogador: 'موغادور', oes: 'أويستريمنيدس؟', pillars: 'أعمدة هرقل' },
    eras: [
      { t: 'التأسيس', d: 'مستوطنون من صور بقيادة عليسة يؤسسون قرت حدشت في عمق خليج تونس.' },
      { t: 'قرطاج تتزعّم العالم البونيقي', d: 'يوسّع الماغونيون نفوذ قرطاج: سردينيا وغرب صقلية وإيبيزا ومراكز تجارية في إفريقيا وهسبانيا.' },
      { t: 'الذروة', d: 'قبل الحرب البونيقية الأولى، تهيمن قرطاج على غرب المتوسط، وروما قد وحّدت لتوّها شبه الجزيرة الإيطالية.' },
      { t: 'خسارة صقلية وسردينيا', d: 'بعد هزيمتها سنة 241 تتنازل قرطاج عن صقلية، وتستولي روما على سردينيا وكورسيكا سنة 238. ويمضي حملقار لفتح هسبانيا.' },
      { t: 'إمبراطورية البرقيين', d: 'هسبانيا حتى نهر إيبرو ومناجم فضتها وقرطاجنة تموّل حملة حنبعل.' },
      { t: 'بعد زاما', d: 'لم يبقَ لقرطاج إلا إقليمها الإفريقي، وتنتقل هسبانيا إلى روما. ويتوسّع ماسينيسا على حساب قرطاج.' },
      { t: 'السقوط', d: 'تُدمَّر قرطاج ويصبح إقليمها ولاية «أفريكا» الرومانية — الاسم الذي سيُطلق على القارة كلها.' }
    ],
    hannKick: 'الحرب البونيقية الثانية · 219–202',
    hann: [
      ['219', 'ساغونتوم', 'حصار مدينة حليفة لروما: إعلان الحرب.'],
      ['218', 'قرطاجنة', 'الانطلاق في الربيع بنحو 90 000 راجل و12 000 فارس و37 فيلاً.'],
      ['218', 'إيبرو', 'حنبعل يتجاوز الحدّ الذي رسمته معاهدة 226.'],
      ['218', 'البرانس', 'معارك مع القبائل، وبقاء جزء من الجيش في هسبانيا.'],
      ['218', 'الرون', 'الفيلة تعبر على أطواف مغطاة بالتراب.'],
      ['218', 'جبال الألب', 'خمسة عشر يوماً في الثلوج، ويبلغ 26 000 رجل إيطاليا.'],
      ['ديسمبر 218', 'تريبيا', 'أول انتصار كبير: كمين ماغون.'],
      ['يونيو 217', 'تراسيمينو', 'جيش فلامينيوس محاصر بين البحيرة والتلال.'],
      ['أغسطس 216', 'كاناي', 'التطويق المزدوج: أسوأ هزيمة في تاريخ روما.'],
      ['216–211', 'كابوا', 'ثاني مدن إيطاليا تنضمّ إلى معسكر حنبعل.'],
      ['211', 'على أبواب روما', 'الزحف نحو روما لفكّ الحصار عن كابوا: «حنبعل على الأبواب».'],
      ['203', 'كروتون', 'استُدعي إلى إفريقيا بعد خمسة عشر عاماً في إيطاليا.'],
      ['203', 'حضرموت', 'النزول قرب سوسة الحالية.'],
      ['202', 'زاما', 'الهزيمة أمام سكيبيو وماسينيسا ونهاية الحرب.']
    ],
    voyKick: 'الرحلات الكبرى',
    voyTitle: 'طرق البحر',
    voyText: 'عبر الملاحون والتجار القرطاجيون مضيق جبل طارق نحو الأطلسي شمالاً وجنوباً.',
    voy: [
      { n: 'عليسة · صور ← قرطاج', d: '~814', t: 'رحلة التأسيس من فينيقيا مروراً بقبرص.' },
      { n: 'حنون · نحو غرب إفريقيا', d: 'ق 5 ق.م', t: 'وفق «الرحلة» المنسوبة إلى حنون: 60 سفينة، وتأسيس مراكز على الساحل الأطلسي للمغرب، ثم استكشاف حتى خليج غينيا (المسار موضع نقاش).' },
      { n: 'حملكون · نحو شمال الأطلسي', d: 'ق 5 ق.م', t: 'على طول هسبانيا حتى «جزر أويستريمنيدس» (بريتانيا؟) على طريق القصدير.' }
    ],
    allKick: 'الحرب البونيقية الثانية',
    allTitle: 'حلفاء وخصوم',
    allText: 'بعد كاناي، انحاز جزء من جنوب إيطاليا والمتوسط إلى قرطاج، فيما استمالت روما النوميديين.',
    allies: [
      ['كابوا', 'ثاني مدن إيطاليا تنضمّ إلى حنبعل بعد كاناي.'],
      ['تارنتوم', 'سلّمها أهلها إلى حنبعل.'],
      ['سرقوسة', 'تقطع مع روما، ويدافع أرخميدس عن المدينة حتى 212.'],
      ['مقدونيا', 'معاهدة بين حنبعل وفيليب الخامس حفظها بوليبيوس.'],
      ['غاليو ما وراء الألب', 'البويون والإنسوبريون يثورون على روما وينضمّون إلى جيش حنبعل.'],
      ['سيفاقس', 'ملك نوميديا الغربية، حليف قرطاج وزوج صفنبعل.'],
      ['ماسينيسا', 'أمير نوميديا الشرقية: ينحاز إلى روما ويحسم معركة زاما.'],
      ['برغامة', 'حليفة روما ضد مقدونيا.'],
      ['ماسيليا', 'مدينة إغريقية حليفة وفية لروما، نبّهتها إلى عبور حنبعل.']
    ],
    src: 'حدود تقريبية وفق الدراسات التاريخية (مناطق نفوذ لا حدود حديثة). الخلفية: Natural Earth. المواقع القديمة: المواضع المتعارف عليها.'
  }
}

const T = await useLocalized('map', TXT)
const shownModes = computed(() => (props.modes?.length ? MODES.filter(m => props.modes.includes(m)) : MODES))

const svgEl = ref(null)
const boxEl = ref(null)
const mode = ref(props.initialMode)
const idx = ref(0)
const focus = ref(null)
const playing = ref(false)
const status = ref('loading')
const k = ref(1)

const steps = computed(() => (mode.value === 'terr' ? ERAS : mode.value === 'hann' ? HANN : []))

const yearLabel = computed(() => {
  if (mode.value === 'terr') return ERAS[idx.value].y + T.value.bc
  if (mode.value === 'hann') return T.value.hann[idx.value][0] + T.value.bc
  return ''
})

let d3 = null
let land = null
let proj = null
let path = null
let svg, gLand, gZone, gTop, defs
let timer = null
let ro = null
let reduced = false

const dur = (ms) => (reduced ? 0 : ms)

const loadScript = (src) => new Promise((resolve, reject) => {
  const existing = document.querySelector(`script[src="${src}"]`)
  if (existing) {
    if (existing.dataset.loaded) return resolve()
    existing.addEventListener('load', () => resolve())
    existing.addEventListener('error', reject)
    return
  }
  const s = document.createElement('script')
  s.src = src
  s.async = true
  s.onload = () => { s.dataset.loaded = '1'; resolve() }
  s.onerror = reject
  document.head.appendChild(s)
})

const P = (p) => proj(p)
const poly = (pts) => d3.line()(pts.map(P)) + 'Z'
const curve = (pts) => d3.line().curve(d3.curveCatmullRom.alpha(0.5))(pts)

function fit (m) {
  const [[a, b], [c, d]] = EXT[m]
  proj = d3.geoMercator().fitExtent([[10, 10], [W - 10, H - 10]], { type: 'MultiPoint', coordinates: [[a, b], [c, d]] })
  path = d3.geoPath(proj)
}

function drawBase () {
  gLand.selectAll('*').remove()
  gLand.append('path').datum(land).attr('d', path).attr('fill', COL.land).attr('stroke', COL.stroke).attr('stroke-width', 0.8)
  defs.selectAll('*').remove()
  defs.append('clipPath').attr('id', 'amap-lc').append('path').datum(land).attr('d', path)
  gZone.attr('clip-path', 'url(#amap-lc)')
}

function city (x, y, label, c, r = 5, dx = 8, anchor = 'start') {
  const [px, py] = P([x, y])
  const g = gTop.append('g')
  g.append('circle').attr('cx', px).attr('cy', py).attr('r', r).attr('fill', c).attr('stroke', '#FFF').attr('stroke-width', 2)
  if (label) g.append('text').attr('class', 'lbl').attr('x', px + dx).attr('y', py + 4).attr('text-anchor', anchor).attr('fill', '#16130F').text(label)
  return g
}

function stop () {
  clearInterval(timer)
  timer = null
  playing.value = false
}

function setMode (m) {
  stop()
  mode.value = m
  idx.value = 0
  focus.value = null
  redraw()
}

function redraw () {
  if (!land || !d3) return
  const m = mode.value
  fit(m)
  drawBase()
  gZone.selectAll('*').remove()
  gTop.selectAll('*').remove()
  ;({ terr: initTerr, hann: initHann, voy: initVoy, all: initAll })[m]()
}

function show (i) {
  if (mode.value === 'terr') showTerr(i)
  else if (mode.value === 'hann') showHann(i)
}

function jump (i) {
  stop()
  show(i)
}

function onRange (e) {
  jump(+e.target.value)
}

function togglePlay () {
  if (timer) { stop(); return }
  const n = steps.value.length
  const ms = mode.value === 'terr' ? 2600 : 1800
  playing.value = true
  if (idx.value >= n - 1) show(0)
  timer = setInterval(() => {
    if (idx.value >= n - 1) { stop(); return }
    show(idx.value + 1)
  }, ms)
}

/* Territoires */
function initTerr () {
  showTerr(idx.value)
}

function showTerr (i) {
  idx.value = i
  const e = ERAS[i]
  const data = []
  ;(e.car || []).forEach(key => data.push({ key, c: COL.car }))
  ;(e.rom || []).forEach(key => data.push({ key, c: COL.rom }))
  ;(e.num || []).forEach(key => data.push({ key, c: COL.num }))
  const zones = gZone.selectAll('path.z').data(data.filter(d => Z[d.key.replace('0', '')]), d => d.key + d.c)
  zones.exit().transition().duration(dur(700)).attr('opacity', 0).remove()
  zones.enter().append('path').attr('class', 'z')
    .attr('d', d => (d.key === 'tun0' ? null : poly(Z[d.key])))
    .attr('fill', d => d.c).attr('opacity', 0)
    .transition().duration(dur(900)).attr('opacity', 0.72)

  const pl = T.value.places
  gTop.selectAll('*').remove()
  if (i === 0 && !reduced) {
    const [x, y] = P([10.32, 36.85])
    gTop.append('circle').attr('cx', x).attr('cy', y).attr('r', 4).attr('fill', 'none').attr('stroke', COL.car).attr('stroke-width', 3)
      .transition().duration(1400).attr('r', 40).attr('opacity', 0)
  }
  city(10.32, 36.85, pl.carthage, COL.car, 6)
  if (i >= 2) city(12.5, 41.9, pl.rome, COL.rom, 6)
  if (i >= 4 && i < 6) city(-0.98, 37.6, pl.nova, COL.car, 4, -8, 'end')
  if (i === 0) city(35.2, 33.27, pl.tyr, COL.car, 4)
}

/* Hannibal */
function initHann () {
  const pts = HANN.map(P)
  gZone.attr('clip-path', null)
  gTop.append('path').attr('d', curve(pts)).attr('fill', 'none').attr('stroke', COL.car).attr('stroke-width', 2).attr('stroke-dasharray', '3 6').attr('opacity', 0.35)
  gTop.append('path').attr('class', 'route').attr('fill', 'none').attr('stroke', COL.car).attr('stroke-width', 4).attr('stroke-linecap', 'round')
  HANN.forEach((h, i) => {
    const left = i === 0 || i === 9 || i === 12
    const g = city(h[0], h[1], T.value.hann[i][1], '#FFF', 5, left ? -9 : 9, left ? 'end' : 'start')
    g.attr('class', 'hc').select('circle').attr('stroke', COL.car)
  })
  gTop.append('circle').attr('class', 'hm').attr('r', 10).attr('fill', COL.num).attr('stroke', '#FFF').attr('stroke-width', 3)
  ;[[16.13, 41.3], [12.1, 43.2], [9.6, 45.0]].forEach(p => {
    const [x, y] = P(p)
    gTop.append('text').attr('class', 'cross').attr('x', x).attr('y', y - 12).attr('text-anchor', 'middle').attr('fill', COL.car).text('✕')
  })
  city(12.5, 41.9, null, COL.rom, 6)
  showHann(idx.value, true)
}

function showHann (i, instant) {
  const prev = idx.value
  idx.value = i
  const pts = HANN.slice(0, i + 1).map(P)
  const r = gTop.select('.route').attr('d', pts.length > 1 ? curve(pts) : null)
  const node = r.node()
  const hm = gTop.select('.hm')
  if (pts.length > 1 && !instant && !reduced) {
    const L = node.getTotalLength()
    const fromL = i > prev ? (prev > 0 ? Math.min(L, L * (prev / i)) : 0) : L
    r.attr('stroke-dasharray', L + ' ' + L).attr('stroke-dashoffset', L - fromL)
      .transition().duration(1200).ease(d3.easeCubicInOut).attr('stroke-dashoffset', 0)
    hm.transition().duration(1200).ease(d3.easeCubicInOut).attrTween('transform', () => (t) => {
      const p = node.getPointAtLength(fromL + (L - fromL) * t)
      return `translate(${p.x},${p.y})`
    })
  } else {
    r.attr('stroke-dasharray', null)
    hm.interrupt().attr('transform', `translate(${pts[pts.length - 1]})`)
  }
  gTop.selectAll('.hc').attr('opacity', (d, j) => (j <= i ? 1 : 0.35))
}

/* Voyages */
function initVoy () {
  gZone.attr('clip-path', null)
  VOY.forEach((v, i) => {
    gTop.append('path').attr('class', 'vr').attr('data-i', i).attr('d', curve(v.pts.map(P)))
      .attr('fill', 'none').attr('stroke', v.c).attr('stroke-width', 3.5).attr('stroke-linecap', 'round')
  })
  const pl = T.value.places
  city(10.32, 36.85, pl.carthage, COL.car, 6)
  city(35.2, 33.27, pl.tyr, COL.car, 4, -8, 'end')
  city(-6.1, 35.2, pl.lixus, COL.num, 3.5, -8, 'end')
  city(-9.77, 31.5, pl.mogador, COL.num, 3.5, -8, 'end')
  city(-4.8, 48.3, pl.oes, COL.navy, 3.5)
  city(-5.6, 35.95, pl.pillars, COL.ally, 3.5, 8)
  playV(focus.value)
}

function playV (only) {
  focus.value = only
  if (!gTop) return
  gTop.selectAll('.vr').each(function () {
    const i = +this.dataset.i
    const L = this.getTotalLength()
    const sel = d3.select(this).interrupt().attr('opacity', only == null || only === i ? 1 : 0.18)
    if (reduced) { sel.attr('stroke-dasharray', null); return }
    sel.attr('stroke-dasharray', L + ' ' + L).attr('stroke-dashoffset', L)
      .transition().delay(only == null ? i * 900 : 0).duration(2600).ease(d3.easeCubicInOut).attr('stroke-dashoffset', 0)
  })
}

/* Alliés */
function initAll () {
  gZone.selectAll('*').remove()
  gZone.attr('clip-path', 'url(#amap-lc)')
  ;[['numw', COL.car], ['nume', COL.rom], ['nita', COL.car]].forEach(([key, c]) => gZone.append('path').attr('d', poly(Z[key])).attr('fill', c).attr('opacity', 0.35))
  const pl = T.value.places
  city(10.32, 36.85, pl.carthage, COL.car, 7)
  city(12.5, 41.9, pl.rome, COL.rom, 7)
  ALLIES.forEach((a, i) => {
    const [x, y] = P([a[0], a[1]])
    const c = a[2] === 'car' ? COL.car : COL.rom
    const g = gTop.append('g').attr('class', 'al').attr('data-i', i).style('cursor', 'pointer').on('click', () => focusA(i))
    g.append('circle').attr('cx', x).attr('cy', y).attr('r', 0).attr('fill', c).attr('opacity', 0.25).transition().delay(dur(i * 180)).duration(dur(600)).attr('r', 18)
    g.append('circle').attr('cx', x).attr('cy', y).attr('r', 0).attr('fill', c).attr('stroke', '#FFF').attr('stroke-width', 2).transition().delay(dur(i * 180)).duration(dur(400)).attr('r', 6)
    g.append('text').attr('class', 'lbl').attr('x', x + 10).attr('y', y - 10).attr('fill', c).text(T.value.allies[i][0])
    const [cx, cy] = P(a[2] === 'car' ? [10.32, 36.85] : [12.5, 41.9])
    gTop.insert('line', ':first-child').attr('x1', cx).attr('y1', cy).attr('x2', cx).attr('y2', cy)
      .attr('stroke', c).attr('stroke-width', 1.5).attr('stroke-dasharray', '4 4').attr('opacity', 0.6)
      .transition().delay(dur(i * 180)).duration(dur(700)).attr('x2', x).attr('y2', y)
  })
  if (focus.value != null) focusA(focus.value)
}

function focusA (i) {
  focus.value = i
  if (gTop) gTop.selectAll('.al').attr('opacity', function () { return +this.dataset.i === i ? 1 : 0.3 })
}

// Les libellés restent lisibles quand la carte rétrécit (viewBox de 1000 unités)
function measure () {
  const w = boxEl.value?.clientWidth || W
  k.value = Math.max(1, Math.min(3, (W / w) * 0.95))
}

watch(locale, () => redraw())

onMounted(async () => {
  reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  measure()
  if (window.ResizeObserver) {
    ro = new ResizeObserver(measure)
    ro.observe(boxEl.value)
  }
  try {
    await loadScript('https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js')
    await loadScript('https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js')
    d3 = window.d3
    svg = d3.select(svgEl.value)
    gLand = svg.append('g')
    gZone = svg.append('g')
    gTop = svg.append('g')
    defs = svg.append('defs')
    const topo = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json')
    land = window.topojson.merge(topo, topo.objects.countries.geometries)
    status.value = 'ready'
    redraw()
  } catch (err) {
    status.value = 'error'
  }
})

onBeforeUnmount(() => {
  stop()
  ro?.disconnect()
})
</script>

<style scoped>
.amap-head {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 16px;
}

.amap--compact .amap-head { margin-bottom: var(--gap); }
.amap--compact .amap-head:empty { display: none; }

.amap-head .h-display { font-size: clamp(40px, 6vw, 80px); }
.amap-head .lede { color: var(--muted); max-width: 560px; margin-top: 10px; font-size: clamp(15px, 1.4vw, 18px); }

.amap-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: var(--gap);
}

.mapbox {
  position: relative;
  background: #DCE5EA;
  border-radius: var(--r-lg);
  overflow: hidden;
  align-self: start;
}

.mapbox svg {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1000 / 620;
}

.mapbox :deep(.lbl) {
  font: 700 calc(var(--k, 1) * 11px) var(--font-body);
  paint-order: stroke;
  stroke: #F4EEE3;
  stroke-width: calc(var(--k, 1) * 3px);
  stroke-linejoin: round;
}

.mapbox :deep(.cross) {
  font: 800 calc(var(--k, 1) * 16px) var(--font-display);
}

.yr {
  position: absolute;
  inset-inline-start: 16px;
  top: 16px;
  background: var(--ink);
  color: var(--white);
  border-radius: 999px;
  padding: 10px 16px;
  font: 800 clamp(15px, 2vw, 22px)/1 var(--font-display);
}

.state {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font: 500 14px/1.4 var(--font-body);
  color: var(--muted);
}

.panel {
  background: var(--white);
  border-radius: var(--r-lg);
  padding: clamp(20px, 2.4vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.panel .kicker { margin: 0; }

.ptitle {
  margin: 0;
  font: 800 clamp(24px, 2.6vw, 34px)/1.02 var(--font-display);
  letter-spacing: -0.02em;
}

.ptext {
  margin: 0;
  font: 400 15px/1.6 var(--font-body);
  color: var(--muted);
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  font: 500 13px/1 var(--font-body);
}

.legend span { display: flex; align-items: center; gap: 7px; }
.legend i { width: 14px; height: 10px; border-radius: 3px; display: inline-block; }

.ctrl { display: flex; align-items: center; gap: 12px; }

.play {
  flex: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 0;
  background: var(--purple);
  color: var(--white);
  font: 700 16px/1 var(--font-body);
  cursor: pointer;
}

.play:hover { background: var(--purple-dark); }

.ctrl input[type=range] {
  flex: 1;
  min-width: 0;
  accent-color: var(--purple);
  min-height: 44px;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 320px;
  overflow: auto;
  margin: 0 -8px;
  padding: 0 8px;
}

.step {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 12px;
  padding: 10px 12px;
  border-radius: 14px;
  cursor: pointer;
  border: 0;
  background: transparent;
  text-align: start;
  font: inherit;
  color: inherit;
}

.step:hover { background: #FAF6EF; }
.step b { font: 800 15px/1.2 var(--font-display); }
.step span { font: 500 14px/1.35 var(--font-body); color: var(--muted); }
.step.on { background: var(--paper); }
.step.on span { color: var(--ink); }
.step .step-name { display: block; font-size: 15px; margin-bottom: 3px; color: var(--ink); }

.step--dot { grid-template-columns: 18px minmax(0, 1fr); }
.step--dot i { width: 14px; height: 14px; border-radius: 50%; margin-top: 3px; }

.src {
  margin: 12px 4px 0;
  font: 400 12px/1.5 var(--font-body);
  color: var(--muted);
}

@media (max-width: 960px) {
  .amap-grid { grid-template-columns: minmax(0, 1fr); }
  .steps { max-height: none; }
  .amap-head .seg { width: 100%; }
}

@media (max-width: 640px) {
  .yr { top: 10px; inset-inline-start: 10px; padding: 8px 12px; }
  .step { grid-template-columns: 64px minmax(0, 1fr); }
}
</style>
