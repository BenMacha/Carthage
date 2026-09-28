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
