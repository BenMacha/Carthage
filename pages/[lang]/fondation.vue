<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="hero-icon">🏛️</div>
        <h1 class="page-hero-title">{{ title }}</h1>
        <p class="page-hero-subtitle">{{ subtitle }}</p>
      </div>
    </section>

    <!-- The Legend -->
    <section class="section">
      <div class="container content-block">
        <div class="content-with-image">
          <div class="content-text">
            <h2 class="section-title">{{ legendTitle }}</h2>
            <p v-for="p in legendParagraphs" :key="p">{{ p }}</p>
          </div>
          <div class="content-image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Didon_et_son_peuple_accueillant_%C3%89n%C3%A9e_-_Pierre-Narcisse_Gu%C3%A9rin.jpg/800px-Didon_et_son_peuple_accueillant_%C3%89n%C3%A9e_-_Pierre-Narcisse_Gu%C3%A9rin.jpg" alt="Didon" loading="lazy" />
            <span class="img-caption">{{ didonCaption }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Byrsa & the oxhide -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ byrsaTitle }}</h2>
        <p class="section-subtitle">{{ byrsaSubtitle }}</p>
        <div class="story-grid">
          <div v-for="step in byrsaSteps" :key="step.title" class="story-card">
            <div class="story-icon">{{ step.icon }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- The City -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ cityTitle }}</h2>
        <p class="section-subtitle">{{ citySubtitle }}</p>
        <div class="features-grid">
          <div v-for="f in cityFeatures" :key="f.title" class="feature-card">
            <div class="feature-icon">{{ f.icon }}</div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Images -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ vestagesTitle }}</h2>
        <div class="gallery-grid">
          <div class="gallery-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Carthage_ruins_of_city_near_sea.jpg/800px-Carthage_ruins_of_city_near_sea.jpg" alt="Ruines de Carthage" loading="lazy" />
            <p>{{ imgCaptions[0] }}</p>
          </div>
          <div class="gallery-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ruins_of_Antonine_Baths_Carthage.jpg/800px-Ruins_of_Antonine_Baths_Carthage.jpg" alt="Thermes" loading="lazy" />
            <p>{{ imgCaptions[1] }}</p>
          </div>
          <div class="gallery-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Carthage_Punic_port_circular.jpg/800px-Carthage_Punic_port_circular.jpg" alt="Port" loading="lazy" />
            <p>{{ imgCaptions[2] }}</p>
          </div>
          <div class="gallery-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Carthage_National_Museum_general_view.jpg/800px-Carthage_National_Museum_general_view.jpg" alt="Musée" loading="lazy" />
            <p>{{ imgCaptions[3] }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Animated Harbor -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ harborAnimTitle }}</h2>
        <p class="section-subtitle light">{{ harborAnimSubtitle }}</p>
        <ClientOnly>
          <AnimationsCarthageHarbor :title="harborLabel" :subtitle="harborLabelSub" />
        </ClientOnly>
      </div>
    </section>

    <!-- Ancient Tools Animation -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ toolsAnimTitle }}</h2>
        <p class="section-subtitle">{{ toolsAnimSubtitle }}</p>
        <ClientOnly>
          <AnimationsAncientTools :title="toolsLabel" :subtitle="toolsLabelSub" />
        </ClientOnly>
      </div>
    </section>

    <!-- Map -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ mapTitle }}</h2>
        <ClientOnly>
          <MapsCarthageMap :lang="locale" />
        </ClientOnly>
      </div>
    </section>

    <!-- Key Numbers -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ numbersTitle }}</h2>
        <div class="numbers-grid">
          <div v-for="n in numbers" :key="n.label" class="number-card">
            <div class="number-value">{{ n.value }}</div>
            <div class="number-label">{{ n.label }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t, locale } = useI18n()

const isFr = computed(() => locale.value === 'fr')
const isAr = computed(() => locale.value === 'ar')

const title = computed(() => isFr.value ? 'La Fondation de Carthage' : isAr.value ? 'تأسيس قرطاج' : 'The Foundation of Carthage')
const subtitle = computed(() => isFr.value ? '814 av. J.-C. — Naissance d\'une superpuissance méditerranéenne' : isAr.value ? '814 ق.م — ولادة قوة عظمى متوسطية' : '814 BC — Birth of a Mediterranean superpower')

const harborAnimTitle = computed(() => isFr.value ? 'Le Port de Carthage' : isAr.value ? 'ميناء قرطاج' : 'The Harbor of Carthage')
const harborAnimSubtitle = computed(() => isFr.value ? 'Le célèbre Cothon, double port militaire et commercial' : isAr.value ? 'الكوثون الشهير، الميناء العسكري والتجاري المزدوج' : 'The famous Cothon, twin military and commercial harbor')
const harborLabel = computed(() => isFr.value ? 'Port de Carthage' : isAr.value ? 'ميناء قرطاج' : 'Harbor of Carthage')
const harborLabelSub = computed(() => isFr.value ? 'Cothon — Le double port légendaire' : isAr.value ? 'الكوثون — الميناء المزدوج الأسطوري' : 'Cothon — The legendary twin harbor')
const toolsAnimTitle = computed(() => isFr.value ? 'Artisanat Punique' : isAr.value ? 'الحرف البونيقية' : 'Punic Craftsmanship')
const toolsAnimSubtitle = computed(() => isFr.value ? 'Les outils et objets qui témoignent du savoir-faire carthaginois' : isAr.value ? 'الأدوات والأشياء التي تشهد على المهارة القرطاجية' : 'Tools and artifacts that testify to Carthaginian craftsmanship')
const toolsLabel = computed(() => isFr.value ? 'Artisanat Punique' : isAr.value ? 'الحرف البونيقية' : 'Punic Craftsmanship')
const toolsLabelSub = computed(() => isFr.value ? 'Outils et objets de la civilisation carthaginoise' : isAr.value ? 'أدوات وأشياء الحضارة القرطاجية' : 'Tools and artifacts of Carthaginian civilization')

const legendTitle = computed(() => isFr.value ? 'La légende de Didon' : isAr.value ? 'أسطورة ديدون' : 'The Legend of Dido')
const didonCaption = computed(() => isFr.value ? 'Didon accueillant Énée — Pierre-Narcisse Guérin' : isAr.value ? 'ديدون تستقبل إينياس — بيير-نارسيس غيران' : 'Dido welcoming Aeneas — Pierre-Narcisse Guérin')

const legendParagraphs = computed(() => {
  if (isAr.value) return [
    'ديدون (أليسا) كانت أميرة فينيقية من مدينة صور في لبنان الحالي. بعد أن اغتال شقيقها بيغماليون، ملك صور، زوجها سيشايوس الكاهن الثري لسرقة ثرواته، حُذّرت ديدون في حلم من شبح زوجها.',
    'فرّت مع مجموعة من الأتباع المخلصين والكنوز عبر البحر الأبيض المتوسط. بعد التوقف في قبرص حيث انضمت إليها 80 امرأة شابة، وصلت إلى سواحل تونس الحالية حوالي 814 ق.م.',
    'هناك فاوضت الملك الأمازيغي المحلي إيرباس للحصول على أرض. طلبت مساحة بقدر ما يمكن أن يغطيه جلد ثور واحد — وهو ما بدا طلباً متواضعاً.',
  ]
  if (isFr.value) return [
    'Didon (Élyssa) était une princesse phénicienne de la cité de Tyr, dans l\'actuel Liban. Lorsque son frère Pygmalion, roi de Tyr, assassina son époux Sychée — un riche prêtre du temple d\'Hercule-Melqart — pour s\'emparer de ses trésors, Didon fut avertie en rêve par le fantôme de son mari.',
    'Elle s\'enfuit avec un groupe de fidèles et les richesses de Sychée à travers la Méditerranée. Après une escale à Chypre où 80 jeunes femmes se joignirent à l\'expédition, elle atteignit les côtes de l\'actuelle Tunisie vers 814 av. J.-C.',
    'Là, elle négocia avec le roi berbère local Iarbas pour obtenir une terre. Elle demanda une surface aussi grande qu\'une seule peau de bœuf pouvait couvrir — ce qui semblait être une requête modeste.',
  ]
  return [
    'Dido (Elissa) was a Phoenician princess from the city of Tyre, in present-day Lebanon. When her brother Pygmalion, king of Tyre, murdered her husband Sychaeus — a wealthy priest of the temple of Hercules-Melqart — to seize his treasures, Dido was warned in a dream by her husband\'s ghost.',
    'She fled with a group of loyal followers and Sychaeus\'s riches across the Mediterranean. After a stop in Cyprus where 80 young women joined the expedition, she reached the coast of present-day Tunisia around 814 BC.',
    'There she negotiated with the local Berber king Iarbas for land. She asked for an area as large as a single oxhide could cover — which seemed a modest request.',
  ]
})

const byrsaTitle = computed(() => isFr.value ? 'Le stratagème de la peau de bœuf' : isAr.value ? 'حيلة جلد الثور' : 'The Oxhide Stratagem')
const byrsaSubtitle = computed(() => isFr.value ? 'Comment Didon fonda Carthage par la ruse' : isAr.value ? 'كيف أسست ديدون قرطاج بالحيلة' : 'How Dido founded Carthage by cunning')

const byrsaSteps = computed(() => {
  if (isAr.value) return [
    { icon: '🐂', title: 'الطلب', desc: 'طلبت ديدون من إيرباس أرضاً بقدر ما يغطيه جلد ثور واحد. ظن أنه طلب تافه ووافق.' },
    { icon: '✂️', title: 'الحيلة', desc: 'قطعت ديدون الجلد إلى شرائح رفيعة للغاية، تكاد لا تُرى، مشكلة حبلاً طويلاً جداً من الشرائط الجلدية.' },
    { icon: '⭕', title: 'التأسيس', desc: 'أحاطت بالشرائط تلة بيرصا بأكملها (من اليونانية «بيرصا» = جلد). هنا أسست قرطاج — «قرت حدشت»، المدينة الجديدة.' },
    { icon: '🏙️', title: 'النمو', desc: 'من هذه التلة، نمت قرطاج لتصبح واحدة من أعظم مدن العالم القديم، بميناء يتسع لأكثر من 200 سفينة حربية وسكان يقارب 700,000.' },
  ]
  if (isFr.value) return [
    { icon: '🐂', title: 'La demande', desc: 'Didon demanda à Iarbas une terre aussi grande qu\'une peau de bœuf. Le roi, pensant que c\'était une demande dérisoire, accepta.' },
    { icon: '✂️', title: 'La ruse', desc: 'Didon fit découper la peau de bœuf en lanières extrêmement fines, presque invisibles, formant un très long cordage de bandes de cuir.' },
    { icon: '⭕', title: 'La fondation', desc: 'Avec ces lanières, elle entoura l\'ensemble de la colline de Byrsa (du grec « byrsa » = peau). C\'est ici qu\'elle fonda Carthage — « Qart Hadasht », la Ville Nouvelle.' },
    { icon: '🏙️', title: 'La croissance', desc: 'Depuis cette colline, Carthage grandit pour devenir l\'une des plus grandes cités du monde antique, avec un port pouvant accueillir plus de 200 navires de guerre et près de 700 000 habitants.' },
  ]
  return [
    { icon: '🐂', title: 'The request', desc: 'Dido asked Iarbas for land as large as an oxhide could cover. The king, thinking it a trivial request, agreed.' },
    { icon: '✂️', title: 'The cunning', desc: 'Dido had the oxhide cut into extremely thin strips, almost invisible, forming a very long rope of leather bands.' },
    { icon: '⭕', title: 'The foundation', desc: 'With these strips, she surrounded the entire hill of Byrsa (from Greek "byrsa" = hide). Here she founded Carthage — "Qart Hadasht," the New City.' },
    { icon: '🏙️', title: 'The growth', desc: 'From this hill, Carthage grew to become one of the greatest cities of the ancient world, with a port able to hold 200+ warships and nearly 700,000 inhabitants.' },
  ]
})

const cityTitle = computed(() => isFr.value ? 'La cité de Carthage' : isAr.value ? 'مدينة قرطاج' : 'The City of Carthage')
const citySubtitle = computed(() => isFr.value ? 'Une métropole à la pointe de son époque' : isAr.value ? 'مدينة في طليعة عصرها' : 'A metropolis at the forefront of its era')

const cityFeatures = computed(() => {
  if (isAr.value) return [
    { icon: '🏗️', title: 'عمارة متقدمة', desc: 'مباني من 6 طوابق — فريدة في العالم القديم. شوارع مخططة وأنظمة صرف صحي متطورة.' },
    { icon: '⚓', title: 'الميناء المزدوج', desc: 'ميناء تجاري مستطيل وميناء عسكري دائري (الكوثون) يتسع لـ 220 سفينة حربية في حوض جاف فردي.' },
    { icon: '🛕', title: 'معابد عظيمة', desc: 'معبد تانيت ومعبد بعل حمون على قمة بيرصا. التوفت — مقدس مفتوح لتقديم القرابين.' },
    { icon: '🏺', title: 'حرف وصناعة', desc: 'ورشات خزف وزجاج وصياغة. إنتاج الأرجوان الصوري من القواقع البحرية (الموريكس).' },
    { icon: '💧', title: 'إدارة المياه', desc: 'صهاريج ضخمة وقنوات مياه. نظام ري متقدم للزراعة المحيطة.' },
    { icon: '🛡️', title: 'تحصينات هائلة', desc: 'أسوار بطول 34 كم وارتفاع 13 متراً وسمك 9 أمتار مع اسطبلات لـ 300 فيل و4,000 حصان.' },
  ]
  if (isFr.value) return [
    { icon: '🏗️', title: 'Architecture avancée', desc: 'Immeubles de 6 étages — uniques dans le monde antique. Rues planifiées, système d\'égouts sophistiqué.' },
    { icon: '⚓', title: 'Le double port', desc: 'Un port commercial rectangulaire et un port militaire circulaire (le Cothon) pouvant accueillir 220 navires de guerre dans des cales sèches individuelles.' },
    { icon: '🛕', title: 'Temples majestueux', desc: 'Temple de Tanit et temple de Baal Hammon au sommet de Byrsa. Le Tophet — sanctuaire à ciel ouvert pour les offrandes.' },
    { icon: '🏺', title: 'Artisanat et industrie', desc: 'Ateliers de poterie, verrerie, orfèvrerie. Production de pourpre tyrienne à partir de coquillages marins (murex).' },
    { icon: '💧', title: 'Gestion de l\'eau', desc: 'Immenses citernes et aqueducs. Système d\'irrigation avancé pour l\'agriculture environnante.' },
    { icon: '🛡️', title: 'Fortifications colossales', desc: 'Murailles de 34 km de long, 13 m de haut, 9 m d\'épaisseur avec des écuries pour 300 éléphants et 4 000 chevaux.' },
  ]
  return [
    { icon: '🏗️', title: 'Advanced architecture', desc: '6-story buildings — unique in the ancient world. Planned streets and sophisticated sewage system.' },
    { icon: '⚓', title: 'The double port', desc: 'A rectangular commercial port and a circular military port (Cothon) able to house 220 warships in individual dry docks.' },
    { icon: '🛕', title: 'Majestic temples', desc: 'Temple of Tanit and temple of Baal Hammon atop Byrsa. The Tophet — open-air sanctuary for offerings.' },
    { icon: '🏺', title: 'Crafts and industry', desc: 'Pottery, glasswork, and goldsmithing workshops. Tyrian purple production from sea snails (murex).' },
    { icon: '💧', title: 'Water management', desc: 'Huge cisterns and aqueducts. Advanced irrigation system for surrounding agriculture.' },
    { icon: '🛡️', title: 'Colossal fortifications', desc: '34 km long walls, 13 m high, 9 m thick with stables for 300 elephants and 4,000 horses.' },
  ]
})

const vestagesTitle = computed(() => isFr.value ? 'Vestiges de Carthage aujourd\'hui' : isAr.value ? 'بقايا قرطاج اليوم' : 'Remains of Carthage today')
const mapTitle = computed(() => isFr.value ? 'Carthage et ses premières colonies' : isAr.value ? 'قرطاج ومستعمراتها الأولى' : 'Carthage and its early colonies')
const numbersTitle = computed(() => isFr.value ? 'Carthage en chiffres' : isAr.value ? 'قرطاج بالأرقام' : 'Carthage in numbers')

const imgCaptions = computed(() => {
  if (isAr.value) return ['أطلال قرطاج — تونس', 'حمامات أنطونيوس — موقع يونسكو', 'الميناء الدائري (الكوثون)', 'المتحف الوطني بقرطاج']
  if (isFr.value) return ['Ruines de Carthage — Tunisie', 'Thermes d\'Antonin — Site UNESCO', 'Le port circulaire (Cothon)', 'Musée National de Carthage']
  return ['Ruins of Carthage — Tunisia', 'Antonine Baths — UNESCO site', 'The circular port (Cothon)', 'Carthage National Museum']
})

const numbers = computed(() => {
  if (isAr.value) return [
    { value: '814 ق.م', label: 'سنة التأسيس' },
    { value: '700,000', label: 'سكان في أوجها' },
    { value: '34 كم', label: 'طول الأسوار' },
    { value: '220', label: 'سفينة في الكوثون' },
    { value: '6', label: 'طوابق للمباني' },
    { value: '300', label: 'فيل في الاسطبلات' },
  ]
  if (isFr.value) return [
    { value: '814 av. J.-C.', label: 'Année de fondation' },
    { value: '700 000', label: 'Habitants à son apogée' },
    { value: '34 km', label: 'De murailles' },
    { value: '220', label: 'Navires dans le Cothon' },
    { value: '6', label: 'Étages d\'immeubles' },
    { value: '300', label: 'Éléphants dans les écuries' },
  ]
  return [
    { value: '814 BC', label: 'Year of foundation' },
    { value: '700,000', label: 'Inhabitants at its peak' },
    { value: '34 km', label: 'Of city walls' },
    { value: '220', label: 'Ships in the Cothon' },
    { value: '6', label: 'Story buildings' },
    { value: '300', label: 'Elephants in stables' },
  ]
})
</script>

<style scoped>
.page-hero { background: linear-gradient(135deg, var(--color-navy) 0%, #2d1b0e 60%, var(--color-burgundy-dark) 100%); padding: 10rem 0 4rem; text-align: center; }
.hero-icon { font-size: 4rem; margin-bottom: 1rem; }
.page-hero-title { font-size: 3rem; color: var(--color-gold); margin-bottom: 1rem; letter-spacing: 3px; }
.page-hero-subtitle { color: #ccc; font-size: 1.15rem; font-style: italic; max-width: 600px; margin: 0 auto; }
.section-alt { background: var(--color-sand); }
.section-dark { background: var(--color-navy); }
.content-with-image { display: grid; grid-template-columns: 1.2fr 1fr; gap: 3rem; align-items: start; }
.content-text p { color: #444; font-size: 1rem; line-height: 1.8; margin-bottom: 1rem; }
.content-image img { width: 100%; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.15); }
.img-caption { display: block; text-align: center; font-size: 0.8rem; color: #888; font-style: italic; margin-top: 0.8rem; }
.story-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
.story-card { background: white; padding: 2rem; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }
.story-icon { font-size: 2.5rem; margin-bottom: 0.8rem; }
.story-card h3 { font-size: 1.1rem; color: var(--color-navy); margin-bottom: 0.6rem; }
.story-card p { color: #555; font-size: 0.9rem; line-height: 1.6; }
.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.feature-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border-top: 3px solid var(--color-gold); }
.feature-icon { font-size: 2rem; margin-bottom: 0.8rem; }
.feature-card h3 { font-size: 1.05rem; color: var(--color-navy); margin-bottom: 0.5rem; }
.feature-card p { color: #555; font-size: 0.9rem; line-height: 1.6; }
.gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
.gallery-item { border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); background: white; }
.gallery-item img { width: 100%; height: 250px; object-fit: cover; display: block; }
.gallery-item p { padding: 0.8rem 1rem; font-size: 0.85rem; color: #666; text-align: center; font-style: italic; }
.numbers-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.number-card { text-align: center; padding: 2rem; background: var(--color-navy-light); border-radius: 12px; border: 1px solid rgba(201,168,76,0.2); }
.number-value { font-family: var(--font-heading); font-size: 2.2rem; font-weight: 900; color: var(--color-gold); margin-bottom: 0.3rem; }
.number-label { color: #999; font-size: 0.9rem; }
@media (max-width: 768px) {
  .page-hero-title { font-size: 2rem; }
  .content-with-image, .story-grid, .features-grid, .gallery-grid, .numbers-grid { grid-template-columns: 1fr; }
}
</style>
