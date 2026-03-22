<template>
  <div class="magon-page" :dir="isAr ? 'rtl' : 'ltr'">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-text">
          <h1 class="hero-title">{{ heroTitle }}</h1>
          <p class="hero-subtitle">{{ heroSubtitle }}</p>
          <div class="hero-buttons">
            <NuxtLink :to="localePath('/archives')" class="btn btn-primary">{{ heroBtn1 }}</NuxtLink>
            <a href="#volumes" class="btn btn-outline">{{ heroBtn2 }}</a>
          </div>
        </div>
        <div class="hero-image">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Oliveraie_Djerba.jpg/800px-Oliveraie_Djerba.jpg"
            :alt="heroImageAlt"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- L'Architecte de la Prospérité Punique -->
    <section class="section">
      <div class="container">
        <div class="architect-grid">
          <div class="architect-portrait">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Aratrum_-_Plowing.jpg/800px-Aratrum_-_Plowing.jpg"
              :alt="architectImageAlt"
              loading="lazy"
            />
          </div>
          <div class="architect-content">
            <h2 class="architect-title">{{ architectTitle }}</h2>
            <p class="architect-text">{{ architectText }}</p>
            <blockquote class="architect-quote">{{ architectQuote }}</blockquote>
            <div class="architect-stats">
              <div class="arch-stat">
                <span class="arch-stat-value">~300 {{ isFr ? 'av. J.-C.' : isAr ? 'ق.م' : 'BC' }}</span>
                <span class="arch-stat-label">{{ architectStatLabel1 }}</span>
              </div>
              <div class="arch-stat">
                <span class="arch-stat-value">28 Vol.</span>
                <span class="arch-stat-label">{{ architectStatLabel2 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pourquoi Rome a épargné ses livres -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ romeTitle }}</h2>
        <div class="rome-grid">
          <div class="rome-text">
            <p>{{ romeText1 }}</p>
            <p>{{ romeText2 }}</p>
          </div>
          <div class="rome-card">
            <div class="rome-card-icon">📜</div>
            <h3>{{ romeCardTitle }}</h3>
            <p>{{ romeCardDesc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Piliers de l'Agriculture Moderne -->
    <section id="volumes" class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ pillarsTitle }}</h2>
        <div class="pillars-grid">
          <div v-for="(pillar, i) in pillars" :key="i" class="pillar-card">
            <div class="pillar-icon">{{ pillar.icon }}</div>
            <h3>{{ pillar.title }}</h3>
            <p>{{ pillar.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Le Fil de la Transmission -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ transmissionTitle }}</h2>
        <div class="timeline">
          <div v-for="(step, i) in transmissionSteps" :key="i" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-date">{{ step.date }}</div>
              <h3 class="timeline-step-title">{{ step.title }}</h3>
              <p class="timeline-step-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section section-cta">
      <div class="container cta-container">
        <blockquote class="cta-quote">{{ ctaQuote }}</blockquote>
        <NuxtLink :to="localePath('/archives')" class="cta-button">{{ ctaButton }}</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t, locale, localePath } = useI18n()
const isFr = computed(() => locale.value === 'fr')
const isAr = computed(() => locale.value === 'ar')

const heroTitle = computed(() =>
  isFr.value ? 'Magon — Le Père de l\'Agriculture Scientifique'
  : isAr.value ? 'ماغون — أبو الزراعة العلمية'
  : 'Magon — The Father of Scientific Agriculture'
)

const heroSubtitle = computed(() =>
  isFr.value ? 'Savant dont l\'œuvre a survécu à la fureur de Rome, Magon a transformé la terre de Carthage en un empire de fertilité.'
  : isAr.value ? 'عالم نجا عمله من غضب روما، حوّل ماغون أرض قرطاج إلى إمبراطورية من الخصوبة.'
  : 'A scholar whose work survived Rome\'s fury, Magon transformed the land of Carthage into an empire of fertility.'
)

const heroBtn1 = computed(() =>
  isFr.value ? 'Explorer l\'Encyclopédie'
  : isAr.value ? 'استكشاف الموسوعة'
  : 'Explore the Encyclopedia'
)

const heroBtn2 = computed(() =>
  isFr.value ? 'Les 28 Volumes'
  : isAr.value ? 'المجلدات الـ28'
  : 'The 28 Volumes'
)

const heroImageAlt = computed(() =>
  isFr.value ? 'Oliveraie tunisienne — héritage agricole de Carthage'
  : isAr.value ? 'بستان زيتون تونسي — الإرث الزراعي لقرطاج'
  : 'Tunisian olive grove — agricultural heritage of Carthage'
)

const architectTitle = computed(() =>
  isFr.value ? 'L\'Architecte de la Prospérité Punique'
  : isAr.value ? 'مهندس الازدهار البوني'
  : 'The Architect of Punic Prosperity'
)

const architectText = computed(() =>
  isFr.value ? 'Son encyclopédie de 28 volumes était l\'œuvre la plus complète jamais rédigée sur l\'agriculture. Elle couvrait la viticulture, l\'oléiculture, l\'irrigation, l\'élevage et la médecine vétérinaire — un système intégré de savoir agronomique sans précédent dans le monde antique.'
  : isAr.value ? 'كانت موسوعته المكونة من 28 مجلداً أشمل عمل كُتب عن الزراعة على الإطلاق. غطت زراعة الكروم وزراعة الزيتون والري وتربية الماشية والطب البيطري — نظام متكامل من المعرفة الزراعية لم يسبق له مثيل في العالم القديم.'
  : 'His 28-volume encyclopedia was the most comprehensive work ever written on farming. It covered viticulture, olive cultivation, irrigation, livestock, and veterinary medicine — an integrated system of agronomic knowledge unprecedented in the ancient world.'
)

const architectQuote = computed(() =>
  isFr.value ? 'Il est d\'un bon citoyen de cultiver ses champs lui-même, plutôt que de le faire cultiver par d\'autres.'
  : isAr.value ? 'من واجب المواطن الصالح أن يزرع حقوله بنفسه، بدلاً من أن يجعل الآخرين يزرعونها.'
  : 'It is the duty of a good citizen to cultivate his fields himself, rather than have others cultivate them.'
)

const architectStatLabel1 = computed(() =>
  isFr.value ? 'Période d\'Activité'
  : isAr.value ? 'فترة النشاط'
  : 'Period of Activity'
)

const architectStatLabel2 = computed(() =>
  isFr.value ? 'Magnum Opus'
  : isAr.value ? 'العمل الأعظم'
  : 'Magnum Opus'
)

const architectImageAlt = computed(() =>
  isFr.value ? 'Agriculture antique — labour'
  : isAr.value ? 'الزراعة القديمة — الحرث'
  : 'Ancient agriculture — plowing'
)

const romeTitle = computed(() =>
  isFr.value ? 'Pourquoi Rome a épargné ses livres'
  : isAr.value ? 'لماذا أنقذت روما كتبه'
  : 'Why Rome Spared His Books'
)

const romeText1 = computed(() =>
  isFr.value ? 'Le seul texte carthaginois que Rome a préservé. Lorsque Carthage tomba en 146 av. J.-C., le Sénat romain ordonna qu\'une seule chose soit sauvée : le traité agricole de Magon. Ils le firent traduire en latin par une commission spéciale.'
  : isAr.value ? 'النص القرطاجي الوحيد الذي حفظته روما. عندما سقطت قرطاج عام 146 ق.م، أمر مجلس الشيوخ الروماني بإنقاذ شيء واحد فقط: كتاب ماغون في الزراعة. أمروا بترجمته إلى اللاتينية من قبل لجنة خاصة.'
  : 'The only Carthaginian text Rome preserved. When Carthage fell in 146 BC, the Roman Senate ordered ONE thing saved: Magon\'s agricultural treatise. They had it translated into Latin by a special commission.'
)

const romeText2 = computed(() =>
  isFr.value ? 'Cet acte extraordinaire témoigne de la valeur inestimable de l\'œuvre de Magon. Les Romains, qui détruisirent systématiquement toute trace de la civilisation punique, reconnurent que ce savoir était trop précieux pour être perdu.'
  : isAr.value ? 'هذا العمل الاستثنائي يشهد على القيمة التي لا تُقدّر لعمل ماغون. الرومان، الذين دمروا بشكل منهجي كل أثر للحضارة البونية، أدركوا أن هذه المعرفة كانت أثمن من أن تُفقد.'
  : 'This extraordinary act testifies to the inestimable value of Magon\'s work. The Romans, who systematically destroyed every trace of Punic civilization, recognized that this knowledge was too precious to be lost.'
)

const romeCardTitle = computed(() =>
  isFr.value ? 'De Carthage à la Bibliothèque du Sénat'
  : isAr.value ? 'من قرطاج إلى مكتبة مجلس الشيوخ'
  : 'From Carthage to the Senate Library'
)

const romeCardDesc = computed(() =>
  isFr.value ? 'Sur ordre du Sénat, le traité de Magon fut transporté des ruines fumantes de Carthage jusqu\'à Rome, où il devint la pierre angulaire de l\'agronomie romaine pendant des siècles.'
  : isAr.value ? 'بأمر من مجلس الشيوخ، نُقل كتاب ماغون من أنقاض قرطاج المشتعلة إلى روما، حيث أصبح حجر الزاوية في الزراعة الرومانية لقرون.'
  : 'By order of the Senate, Magon\'s treatise was transported from the smoldering ruins of Carthage to Rome, where it became the cornerstone of Roman agronomy for centuries.'
)

const pillarsTitle = computed(() =>
  isFr.value ? 'Piliers de l\'Agriculture Moderne'
  : isAr.value ? 'أركان الزراعة الحديثة'
  : 'Pillars of Modern Agriculture'
)

const pillars = computed(() =>
  isFr.value ? [
    { icon: '💧', title: 'Irrigation & Gestion des Sols', desc: 'Magon développa des techniques sophistiquées de canalisation et de rotation des cultures, maximisant les rendements dans le climat semi-aride de l\'Afrique du Nord.' },
    { icon: '🍇', title: 'Viticulture & Oléiculture', desc: 'Ses méthodes de culture de la vigne et de l\'olivier établirent les standards que le bassin méditerranéen suit encore aujourd\'hui.' },
    { icon: '🐄', title: 'Médecine Vétérinaire', desc: 'Le premier traitement systématique des maladies animales, des techniques de reproduction et de l\'alimentation du bétail dans l\'histoire écrite.' },
    { icon: '📚', title: 'Systématisation du Savoir', desc: 'En compilant 28 volumes structurés, Magon inventa le concept même d\'encyclopédie agricole — un modèle repris par Columelle, Varron et Pline.' }
  ] : isAr.value ? [
    { icon: '💧', title: 'الري وإدارة التربة', desc: 'طوّر ماغون تقنيات متطورة للقنوات وتناوب المحاصيل، مما زاد الإنتاجية في المناخ شبه الجاف لشمال أفريقيا.' },
    { icon: '🍇', title: 'زراعة الكروم والزيتون', desc: 'أسست أساليبه في زراعة الكروم والزيتون المعايير التي لا يزال حوض البحر الأبيض المتوسط يتبعها حتى اليوم.' },
    { icon: '🐄', title: 'الطب البيطري', desc: 'أول معالجة منهجية لأمراض الحيوانات وتقنيات التربية وتغذية الماشية في التاريخ المكتوب.' },
    { icon: '📚', title: 'تنظيم المعرفة', desc: 'بتجميع 28 مجلداً منظماً، اخترع ماغون مفهوم الموسوعة الزراعية — نموذج اتبعه كولوميلا وفارو وبليني.' }
  ] : [
    { icon: '💧', title: 'Irrigation & Soil Management', desc: 'Magon developed sophisticated techniques for channeling water and crop rotation, maximizing yields in the semi-arid climate of North Africa.' },
    { icon: '🍇', title: 'Viticulture & Olive Cultivation', desc: 'His methods of cultivating vines and olive trees established the standards that the Mediterranean basin still follows today.' },
    { icon: '🐄', title: 'Veterinary Medicine', desc: 'The first systematic treatment of animal diseases, breeding techniques, and livestock nutrition in written history.' },
    { icon: '📚', title: 'Systematization of Knowledge', desc: 'By compiling 28 structured volumes, Magon invented the very concept of an agricultural encyclopedia — a model followed by Columella, Varro, and Pliny.' }
  ]
)

const transmissionTitle = computed(() =>
  isFr.value ? 'Le Fil de la Transmission'
  : isAr.value ? 'خيط النقل'
  : 'The Thread of Transmission'
)

const transmissionSteps = computed(() =>
  isFr.value ? [
    { date: '~300 av. J.-C.', title: 'L\'Âge d\'Or Punique', desc: 'Magon rédige ses 28 volumes à l\'apogée de la puissance carthaginoise. L\'agriculture punique est la plus avancée de la Méditerranée, alimentant un empire commercial qui rivalise avec Rome.' },
    { date: '146 av. J.-C.', title: 'La Chute & Le Salut', desc: 'Carthage est rasée. Mais le Sénat romain, reconnaissant la valeur incomparable du traité de Magon, ordonne sa traduction en latin — le seul texte punique épargné de la destruction totale.' },
    { date: '1er siècle ap. J.-C.', title: 'L\'Héritage Romain', desc: 'Columelle, Varron et Pline l\'Ancien citent abondamment Magon dans leurs propres œuvres. Le savoir carthaginois irrigue toute l\'agronomie romaine et, par extension, l\'agriculture européenne.' }
  ] : isAr.value ? [
    { date: '~300 ق.م', title: 'العصر الذهبي البوني', desc: 'يكتب ماغون مجلداته الـ28 في ذروة القوة القرطاجية. الزراعة البونية هي الأكثر تقدماً في البحر الأبيض المتوسط.' },
    { date: '146 ق.م', title: 'السقوط والإنقاذ', desc: 'قرطاج تُدمّر. لكن مجلس الشيوخ الروماني يأمر بترجمة كتاب ماغون إلى اللاتينية — النص البوني الوحيد الذي نجا من الدمار الشامل.' },
    { date: 'القرن الأول الميلادي', title: 'الإرث الروماني', desc: 'كولوميلا وفارو وبليني الأكبر يستشهدون بماغون بكثرة في أعمالهم. المعرفة القرطاجية تغذي كل الزراعة الرومانية.' }
  ] : [
    { date: '~300 BC', title: 'The Punic Golden Age', desc: 'Magon writes his 28 volumes at the height of Carthaginian power. Punic agriculture is the most advanced in the Mediterranean, fueling a commercial empire that rivals Rome.' },
    { date: '146 BC', title: 'The Fall & The Salvation', desc: 'Carthage is razed. But the Roman Senate, recognizing the incomparable value of Magon\'s treatise, orders its translation into Latin — the only Punic text spared from total destruction.' },
    { date: '1st century AD', title: 'The Roman Legacy', desc: 'Columella, Varro, and Pliny the Elder cite Magon extensively in their own works. Carthaginian knowledge irrigates all Roman agronomy and, by extension, European agriculture.' }
  ]
)

const ctaQuote = computed(() =>
  isFr.value ? 'Le traité de Magon est la preuve que la Connaissance survit à la destruction.'
  : isAr.value ? 'كتاب ماغون هو الدليل على أن المعرفة تنجو من الدمار.'
  : 'Magon\'s treatise is proof that Knowledge survives destruction.'
)

const ctaButton = computed(() =>
  isFr.value ? 'Accéder aux Archives Digitales'
  : isAr.value ? 'الوصول إلى الأرشيف الرقمي'
  : 'Access the Digital Archives'
)
</script>

<style scoped>
/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--color-navy) 0%, #0d0d1a 100%);
  padding: 6rem 2rem 4rem;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 3rem;
  color: var(--color-gold);
  line-height: 1.2;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
}

.hero-subtitle {
  font-family: var(--font-body);
  color: #c0c0d0;
  font-size: 1.15rem;
  line-height: 1.9;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary {
  background: var(--color-gold);
  color: var(--color-navy);
}

.btn-primary:hover {
  background: var(--color-gold-light);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: var(--color-gold);
  border: 2px solid var(--color-gold);
}

.btn-outline:hover {
  background: var(--color-gold);
  color: var(--color-navy);
  transform: translateY(-2px);
}

.hero-image img {
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(201, 168, 76, 0.3);
}

/* Common */
.section {
  padding: 6rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 2.4rem;
  color: var(--color-navy);
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: 2px;
}

.section-title.light {
  color: var(--color-gold);
}

.section-alt {
  background: #f8f5ef;
}

.section-dark {
  background: var(--color-navy);
}

/* Architect Section */
.architect-grid {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 3rem;
  align-items: start;
}

.architect-portrait img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.architect-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--color-burgundy);
  margin-bottom: 1.5rem;
}

.architect-text {
  font-family: var(--font-body);
  color: #444;
  font-size: 1.05rem;
  line-height: 1.9;
  margin-bottom: 1.5rem;
}

.architect-quote {
  font-family: var(--font-body);
  color: var(--color-burgundy);
  font-size: 1.1rem;
  line-height: 1.7;
  font-style: italic;
  border-left: 4px solid var(--color-gold);
  padding-left: 1.5rem;
  margin: 0 0 2rem;
}

[dir="rtl"] .architect-quote {
  border-left: none;
  border-right: 4px solid var(--color-gold);
  padding-left: 0;
  padding-right: 1.5rem;
}

.architect-stats {
  display: flex;
  gap: 3rem;
}

.arch-stat {
  display: flex;
  flex-direction: column;
}

.arch-stat-value {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: var(--color-navy);
  font-weight: 700;
}

.arch-stat-label {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 0.3rem;
}

/* Rome Section */
.rome-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 3rem;
  align-items: center;
}

.rome-text p {
  font-family: var(--font-body);
  color: #b0b0c0;
  font-size: 1.05rem;
  line-height: 1.9;
  margin-bottom: 1.5rem;
}

.rome-card {
  background: var(--color-navy-light);
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid rgba(201, 168, 76, 0.3);
  text-align: center;
}

.rome-card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.rome-card h3 {
  font-family: var(--font-heading);
  color: var(--color-gold);
  font-size: 1.3rem;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.rome-card p {
  font-family: var(--font-body);
  color: #a0a0b0;
  font-size: 0.95rem;
  line-height: 1.7;
}

/* Pillars Grid */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.pillar-card {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border-top: 4px solid var(--color-gold);
  transition: transform 0.3s ease;
}

.pillar-card:hover {
  transform: translateY(-4px);
}

.pillar-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.pillar-card h3 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  color: var(--color-navy);
  margin-bottom: 0.8rem;
  letter-spacing: 1px;
}

.pillar-card p {
  font-family: var(--font-body);
  color: #555;
  font-size: 0.95rem;
  line-height: 1.8;
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 3rem;
  max-width: 800px;
  margin: 0 auto;
}

[dir="rtl"] .timeline {
  padding-left: 0;
  padding-right: 3rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0.75rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-gold);
}

[dir="rtl"] .timeline::before {
  left: auto;
  right: 0.75rem;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -2.55rem;
  top: 0.3rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-gold);
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px var(--color-gold);
}

[dir="rtl"] .timeline-dot {
  left: auto;
  right: -2.55rem;
}

.timeline-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-left: 4px solid var(--color-gold);
}

[dir="rtl"] .timeline-content {
  border-left: none;
  border-right: 4px solid var(--color-gold);
}

.timeline-date {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--color-burgundy);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
}

.timeline-step-title {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  color: var(--color-navy);
  margin-bottom: 0.6rem;
}

.timeline-step-desc {
  font-family: var(--font-body);
  color: #555;
  font-size: 1rem;
  line-height: 1.8;
}

/* CTA Section */
.section-cta {
  background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-burgundy) 100%);
  padding: 8rem 2rem;
}

.cta-container {
  text-align: center;
  max-width: 800px;
}

.cta-quote {
  font-family: var(--font-body);
  font-size: 1.6rem;
  color: var(--color-gold-light);
  line-height: 1.7;
  font-style: italic;
  margin: 0 0 2.5rem;
  padding: 0;
  border: none;
}

.cta-button {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 1rem;
  color: var(--color-navy);
  background: var(--color-gold);
  padding: 1rem 3rem;
  border-radius: 8px;
  text-decoration: none;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: background 0.3s ease, transform 0.3s ease;
}

.cta-button:hover {
  background: var(--color-gold-light);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 968px) {
  .hero-container {
    grid-template-columns: 1fr;
  }

  .hero-text {
    order: 1;
  }

  .hero-image {
    order: 2;
  }

  .architect-grid {
    grid-template-columns: 1fr;
  }

  .rome-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
    padding: 8rem 1.5rem 3rem;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .pillars-grid {
    grid-template-columns: 1fr;
  }

  .architect-stats {
    flex-direction: column;
    gap: 1.5rem;
  }

  .timeline {
    padding-left: 2rem;
  }

  [dir="rtl"] .timeline {
    padding-left: 0;
    padding-right: 2rem;
  }

  .timeline-dot {
    left: -1.55rem;
  }

  [dir="rtl"] .timeline-dot {
    left: auto;
    right: -1.55rem;
  }

  .cta-quote {
    font-size: 1.2rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
