<template>
  <div :dir="isAr ? 'rtl' : 'ltr'">
    <!-- Hero -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <h1 class="hero-title">{{ heroTitle }}</h1>
        <p class="hero-subtitle">{{ heroSubtitle }}</p>
        <p class="hero-date">{{ heroDate }}</p>
      </div>
    </section>

    <!-- Two-Column Intro -->
    <section class="section">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-left">
            <h2 class="section-heading">{{ introLeftTitle }}</h2>
            <p class="intro-text">{{ introLeftText }}</p>
            <div class="intro-meta">
              <div class="meta-item">
                <span class="meta-label">{{ originLabel }}</span>
                <span class="meta-value">{{ originValue }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">{{ roleLabel }}</span>
                <span class="meta-value">{{ roleValue }}</span>
              </div>
            </div>
          </div>
          <div class="intro-right">
            <h2 class="section-heading">{{ introRightTitle }}</h2>
            <div class="feat-cards">
              <div class="feat-card">
                <span class="feat-number">01</span>
                <h3 class="feat-title">{{ feat1Title }}</h3>
                <p class="feat-desc">{{ feat1Desc }}</p>
              </div>
              <div class="feat-card">
                <span class="feat-number">02</span>
                <h3 class="feat-title">{{ feat2Title }}</h3>
                <p class="feat-desc">{{ feat2Desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote -->
    <section class="section section-quote">
      <div class="container">
        <blockquote class="grand-quote">
          <p>{{ quoteText }}</p>
          <cite>{{ quoteCite }}</cite>
        </blockquote>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ timelineTitle }}</h2>
        <div class="timeline">
          <div v-for="(evt, i) in timelineEvents" :key="i" class="timeline-item">
            <div class="timeline-marker">
              <div class="timeline-dot"></div>
              <div v-if="i < timelineEvents.length - 1" class="timeline-line"></div>
            </div>
            <div class="timeline-content">
              <div class="timeline-date">{{ evt.date }}</div>
              <h3 class="timeline-heading">{{ evt.title }}</h3>
              <p class="timeline-desc">{{ evt.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- The Absolute Sacrifice -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ sacrificeTitle }}</h2>
        <div class="sacrifice-block">
          <p class="sacrifice-text">{{ sacrificeText }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section-cta">
      <div class="container cta-container">
        <NuxtLink :to="localePath('/archives')" class="btn btn-gold btn-lg">{{ ctaArchives }}</NuxtLink>
        <NuxtLink :to="localePath('/chronologie')" class="btn btn-outline btn-lg">{{ ctaCitations }}</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()
const isFr = computed(() => locale.value === 'fr')
const isAr = computed(() => locale.value === 'ar')

// Hero
const heroTitle = computed(() => 'Magon Barca')
const heroSubtitle = computed(() =>
  isFr.value ? 'Le Stratège de l\'ombre'
  : isAr.value ? 'استراتيجي الظل'
  : 'The Shadow Strategist'
)
const heroDate = computed(() =>
  isFr.value ? 'Le Dernier des Barcides (~243–203 av. J.-C.)'
  : isAr.value ? 'آخر البرقيين (~243–203 ق.م)'
  : 'The Last of the Barcids (~243–203 BC)'
)

// Two-column intro
const introLeftTitle = computed(() =>
  isFr.value ? 'Le Plus Jeune Lion'
  : isAr.value ? 'الأسد الأصغر'
  : 'The Youngest Lion'
)
const introLeftText = computed(() =>
  isFr.value ? 'Le plus jeune des frères Barca, Magon n\'était pas la lame visible mais la lame subtile. Là où Hannibal fracassait les légions et Hasdrubal gouvernait l\'Ibérie, Magon opérait dans les interstices de l\'empire — le commandant que Rome ne voyait venir qu\'une fois qu\'il était trop tard. Formé dès l\'enfance dans les camps militaires d\'Espagne aux côtés de ses frères, il hérita de la même haine sacrée envers Rome et du même génie stratégique qui faisait trembler le Sénat.'
  : isAr.value ? 'الأصغر بين إخوة برقا، لم يكن ماغون النصل الظاهر بل النصل الخفي. حيث حطّم حنبعل الفيالق وحكم حسدربعل إيبيريا، عمل ماغون في ثغرات الإمبراطورية — القائد الذي لم تره روما إلا بعد فوات الأوان. تدرّب منذ طفولته في معسكرات إسبانيا العسكرية إلى جانب إخوته، وورث نفس الكراهية المقدسة تجاه روما ونفس العبقرية الاستراتيجية التي أرعبت مجلس الشيوخ.'
  : 'The youngest of the Barca brothers, Magon was not the visible blade but the subtle one. Where Hannibal smashed legions and Hasdrubal governed Iberia, Magon operated in the interstices of the empire — the commander Rome never saw coming until it was too late. Trained from childhood in the military camps of Spain alongside his brothers, he inherited the same sacred hatred of Rome and the same strategic genius that made the Senate tremble.'
)
const originLabel = computed(() => isFr.value ? 'Origine' : isAr.value ? 'الأصل' : 'Origin')
const originValue = computed(() =>
  isFr.value ? 'Carthage, Empire Punique'
  : isAr.value ? 'قرطاج، الإمبراطورية البونية'
  : 'Carthage, Punic Empire'
)
const roleLabel = computed(() => isFr.value ? 'Rôle' : isAr.value ? 'الدور' : 'Role')
const roleValue = computed(() =>
  isFr.value ? 'Haut Commandant & Stratège'
  : isAr.value ? 'القائد الأعلى والاستراتيجي'
  : 'High Commander & Strategist'
)

const introRightTitle = computed(() =>
  isFr.value ? 'Exploits Légendaires'
  : isAr.value ? 'إنجازات أسطورية'
  : 'Legendary Feats'
)
const feat1Title = computed(() =>
  isFr.value ? 'Héros de Cannes'
  : isAr.value ? 'بطل كاناي'
  : 'Hero of Cannae'
)
const feat1Desc = computed(() =>
  isFr.value ? 'Il commanda le centre de la ligne lors du plus grand encerclement de l\'histoire militaire. À Cannes, Magon tint la position clé qui permit à l\'étau carthaginois de se refermer sur huit légions romaines, scellant la plus grande défaite jamais subie par la République.'
  : isAr.value ? 'قاد مركز الخط في أعظم تطويق في التاريخ العسكري. في كاناي، حافظ ماغون على الموقع الرئيسي الذي سمح للكماشة القرطاجية بالانطباق على ثمانية فيالق رومانية، مُختتماً أكبر هزيمة عرفتها الجمهورية.'
  : 'He commanded the center of the line at the greatest encirclement in military history. At Cannae, Magon held the key position that allowed the Carthaginian vise to close around eight Roman legions, sealing the greatest defeat ever suffered by the Republic.'
)
const feat2Title = computed(() =>
  isFr.value ? 'Second Front'
  : isAr.value ? 'الجبهة الثانية'
  : 'Second Front'
)
const feat2Desc = computed(() =>
  isFr.value ? 'Il envahit la Ligurie pour forcer Rome à diviser ses légions, ouvrant un second front dans le nord de l\'Italie avec 12 000 fantassins et 2 000 cavaliers, menaçant la plaine du Pô et les arrières de Rome.'
  : isAr.value ? 'غزا ليغوريا لإجبار روما على تقسيم فيالقها، فاتحاً جبهة ثانية في شمال إيطاليا بـ 12,000 مشاة و2,000 فارس، مهدداً سهل البو ومؤخرة روما.'
  : 'He invaded Liguria to force Rome to split its legions, opening a second front in northern Italy with 12,000 infantry and 2,000 cavalry, threatening the Po Valley and Rome\'s rear.'
)

// Quote
const quoteText = computed(() =>
  isFr.value ? 'Il ne commandait pas seulement des soldats ; il commandait la peur même de Rome.'
  : isAr.value ? 'لم يكن يقود الجنود فحسب؛ بل كان يقود خوف روما ذاته.'
  : 'He did not just command soldiers; he commanded the very fear of Rome itself.'
)
const quoteCite = computed(() =>
  isFr.value ? '— Fragment d\'Archives, 203 av. J.-C.'
  : isAr.value ? '— جزء أرشيفي، 203 ق.م'
  : '— Archival Fragment, 203 BC'
)

// Timeline
const timelineTitle = computed(() =>
  isFr.value ? 'Le Fil du Temps'
  : isAr.value ? 'خيط الزمن'
  : 'The Thread of Time'
)
const timelineEvents = computed(() =>
  isFr.value ? [
    { date: '216 av. J.-C.', title: 'L\'Embuscade de Cannes', desc: 'Magon porta personnellement les anneaux des chevaliers romains tombés au Sénat de Carthage — des boisseaux entiers d\'anneaux d\'or, preuve tangible de la destruction de l\'élite de Rome. Ce geste frappa l\'imaginaire du monde antique et confirma l\'ampleur de la victoire de Cannes.' },
    { date: '210–206 av. J.-C.', title: 'Campagnes Ibériques', desc: 'Maître de la logistique, Magon défendit le cœur barcide en Ibérie. Il coordonna les approvisionnements, maintint les alliances tribales et lutta contre l\'avancée de Scipion l\'Africain, protégeant les mines d\'argent qui alimentaient l\'effort de guerre carthaginois.' },
    { date: '205 av. J.-C.', title: 'L\'Invasion de la Ligurie', desc: 'Magon débarqua sur les côtes ligures avec 12 000 fantassins et 2 000 cavaliers, établissant une tête de pont dans le nord de l\'Italie. Cette manœuvre audacieuse força Rome à détourner des légions du front africain, soulageant momentanément la pression sur Carthage.' },
  ] : isAr.value ? [
    { date: '216 ق.م', title: 'كمين كاناي', desc: 'حمل ماغون شخصياً خواتم الفرسان الرومان الساقطين إلى مجلس شيوخ قرطاج — أكياس كاملة من الخواتم الذهبية، دليل مادي على تدمير نخبة روما. هذا الفعل صدم مخيلة العالم القديم وأكد حجم نصر كاناي.' },
    { date: '210–206 ق.م', title: 'الحملات الإيبيرية', desc: 'سيد اللوجستيات، دافع ماغون عن قلب البرقيين في إيبيريا. نسّق الإمدادات وحافظ على التحالفات القبلية وقاتل ضد تقدم سكيبيو الأفريقي، حامياً مناجم الفضة التي غذّت المجهود الحربي القرطاجي.' },
    { date: '205 ق.م', title: 'غزو ليغوريا', desc: 'أنزل ماغون قواته على سواحل ليغوريا بـ 12,000 مشاة و2,000 فارس، مؤسساً رأس جسر في شمال إيطاليا. هذه المناورة الجريئة أجبرت روما على تحويل فيالق من الجبهة الأفريقية.' },
  ] : [
    { date: '216 BC', title: 'The Cannae Ambush', desc: 'Magon personally carried the rings of fallen Roman knights to the Senate of Carthage — entire bushels of gold rings, tangible proof of the destruction of Rome\'s elite. This act struck the imagination of the ancient world and confirmed the magnitude of the victory at Cannae.' },
    { date: '210–206 BC', title: 'Iberian Campaigns', desc: 'A master of logistics, Magon defended the Barcid heartland in Iberia. He coordinated supplies, maintained tribal alliances, and fought against the advance of Scipio Africanus, protecting the silver mines that fuelled the Carthaginian war effort.' },
    { date: '205 BC', title: 'Liguria Invasion', desc: 'Magon landed on the Ligurian coast with 12,000 infantry and 2,000 cavalry, establishing a bridgehead in northern Italy. This audacious manoeuvre forced Rome to divert legions from the African front, momentarily relieving the pressure on Carthage.' },
  ]
)

// The Absolute Sacrifice
const sacrificeTitle = computed(() =>
  isFr.value ? 'Le Sacrifice Absolu'
  : isAr.value ? 'التضحية المطلقة'
  : 'The Absolute Sacrifice'
)
const sacrificeText = computed(() =>
  isFr.value ? 'Pour la famille Barca, Carthage n\'était pas une ville ; c\'était un devoir sacré. D\'Hamilcar à Magon, chaque souffle fut dédié à la survie de leur patrie. Magon mourut en mer, revenant défendre une Carthage qui allait bientôt le suivre dans les ombres de l\'histoire. Blessé lors des combats en Ligurie et rappelé par un Sénat désespéré, il s\'embarqua pour l\'Afrique mais ne vit jamais les rivages de sa terre natale. La mer qui avait porté les navires de guerre puniques pendant des siècles devint son tombeau, et avec lui s\'éteignit la dernière flamme de la lignée Barcide sur le champ de bataille.'
  : isAr.value ? 'بالنسبة لعائلة برقا، لم تكن قرطاج مدينة؛ بل كانت واجباً مقدساً. من حملقار إلى ماغون، كُرّس كل نَفَس لبقاء وطنهم. مات ماغون في البحر، عائداً للدفاع عن قرطاج التي ستتبعه قريباً إلى ظلال التاريخ. جُرح في معارك ليغوريا واستُدعي من مجلس شيوخ يائس، أبحر نحو أفريقيا لكنه لم يرَ شواطئ أرضه الأم قط. البحر الذي حمل سفن الحرب البونية لقرون أصبح ضريحه، ومعه انطفأت آخر شعلة من سلالة البرقيين في ميدان المعركة.'
  : 'For the Barca family, Carthage was not a city; it was a sacred duty. From Hamilcar to Magon, every breath was dedicated to the survival of their homeland. Magon died at sea, returning to defend a Carthage that would soon follow him into the shadows of history. Wounded in the fighting in Liguria and recalled by a desperate Senate, he embarked for Africa but never saw the shores of his native land. The sea that had carried Punic warships for centuries became his tomb, and with him the last flame of the Barcid lineage on the battlefield was extinguished.'
)

// CTA
const ctaArchives = computed(() =>
  isFr.value ? 'Explorer les Archives'
  : isAr.value ? 'استكشف الأرشيف'
  : 'Explore the Archives'
)
const ctaCitations = computed(() =>
  isFr.value ? 'Citations Savantes'
  : isAr.value ? 'الاستشهادات العلمية'
  : 'Scholarly Citations'
)
</script>

<style scoped>
/* Hero */
.hero-section {
  position: relative;
  background: linear-gradient(180deg, #0a0a14 0%, var(--color-navy, #1a1a2e) 40%, #0d0d1a 100%);
  padding: 12rem 0 6rem;
  text-align: center;
  overflow: hidden;
  min-height: 80vh;
  display: flex;
  align-items: center;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(107, 29, 42, 0.15) 0%, transparent 60%);
  pointer-events: none;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
}
.hero-content {
  z-index: 1;
}
.hero-title {
  font-family: var(--font-heading, 'Cinzel', serif);
  font-size: 5rem;
  color: var(--color-gold, #c9a84c);
  margin-bottom: 1rem;
  letter-spacing: 6px;
  line-height: 1.1;
  text-transform: uppercase;
}
.hero-subtitle {
  font-family: var(--font-body, 'Lora', serif);
  font-style: italic;
  color: var(--color-gold-light, #e8d590);
  font-size: 1.4rem;
  margin-bottom: 1rem;
  letter-spacing: 3px;
  opacity: 0.9;
}
.hero-date {
  font-family: var(--font-heading, 'Cinzel', serif);
  color: #888;
  font-size: 1rem;
  letter-spacing: 2px;
}

/* Sections */
.section {
  padding: 5rem 0;
}
.section-alt {
  background: var(--color-navy-light, #2d2d4a);
}
.section-dark {
  background: var(--color-navy, #1a1a2e);
}
.section-title {
  font-family: var(--font-heading, 'Cinzel', serif);
  font-size: 2.2rem;
  color: var(--color-burgundy, #6b1d2a);
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: 2px;
}
.section-title.light {
  color: var(--color-gold);
}
.section-alt .section-title {
  color: var(--color-gold);
}
.section-heading {
  font-family: var(--font-heading, 'Cinzel', serif);
  font-size: 1.8rem;
  color: var(--color-burgundy, #6b1d2a);
  margin-bottom: 1.5rem;
}

/* Intro Grid */
.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: start;
}
.intro-text {
  font-family: var(--font-body, 'Lora', serif);
  color: #444;
  font-size: 1rem;
  line-height: 1.9;
  margin-bottom: 2rem;
}
.intro-meta {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.meta-item {
  display: flex;
  gap: 0.8rem;
  align-items: baseline;
}
.meta-label {
  font-family: var(--font-heading, 'Cinzel', serif);
  font-size: 0.8rem;
  color: var(--color-gold, #c9a84c);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 600;
  min-width: 60px;
}
.meta-value {
  font-family: var(--font-body, 'Lora', serif);
  color: #555;
  font-size: 0.92rem;
}

/* Feat Cards */
.feat-cards {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}
.feat-card {
  background: white;
  padding: 1.8rem;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
  border-left: 4px solid var(--color-gold);
  position: relative;
}
:global([dir="rtl"]) .feat-card {
  border-left: none;
  border-right: 4px solid var(--color-gold);
}
.feat-number {
  font-family: var(--font-heading, 'Cinzel', serif);
  font-size: 2.5rem;
  color: rgba(201, 168, 76, 0.2);
  font-weight: 700;
  position: absolute;
  top: 0.8rem;
  right: 1.2rem;
  line-height: 1;
}
:global([dir="rtl"]) .feat-number {
  right: auto;
  left: 1.2rem;
}
.feat-title {
  font-family: var(--font-heading, 'Cinzel', serif);
  font-size: 1.1rem;
  color: var(--color-navy, #1a1a2e);
  margin-bottom: 0.6rem;
}
.feat-desc {
  font-family: var(--font-body, 'Lora', serif);
  color: #555;
  font-size: 0.9rem;
  line-height: 1.7;
}

/* Quote */
.section-quote {
  background: linear-gradient(135deg, var(--color-navy, #1a1a2e) 0%, var(--color-navy-light, #2d2d4a) 100%);
  padding: 4rem 0;
}
.grand-quote {
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
  border: none;
  padding: 2rem;
}
.grand-quote p {
  font-family: var(--font-body, 'Lora', serif);
  font-style: italic;
  font-size: 1.5rem;
  color: var(--color-gold-light, #e8d590);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}
.grand-quote cite {
  font-family: var(--font-heading, 'Cinzel', serif);
  font-size: 0.85rem;
  color: var(--color-gold, #c9a84c);
  letter-spacing: 2px;
  font-style: normal;
  opacity: 0.8;
}

/* Timeline */
.timeline {
  max-width: 750px;
  margin: 0 auto;
}
.timeline-item {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}
.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 20px;
}
.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-gold);
  border: 3px solid var(--color-navy);
  box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.3);
  flex-shrink: 0;
}
.timeline-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(180deg, var(--color-gold) 0%, rgba(201, 168, 76, 0.2) 100%);
  margin-top: 0.5rem;
}
.timeline-content {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 3px solid var(--color-gold);
  flex: 1;
}
:global([dir="rtl"]) .timeline-content {
  border-left: none;
  border-right: 3px solid var(--color-gold);
}
.timeline-date {
  font-family: var(--font-heading, 'Cinzel', serif);
  font-size: 0.85rem;
  color: var(--color-gold-light, #e8d590);
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
.timeline-heading {
  font-family: var(--font-heading, 'Cinzel', serif);
  font-size: 1.15rem;
  color: var(--color-gold);
  margin-bottom: 0.6rem;
}
.timeline-desc {
  font-family: var(--font-body, 'Lora', serif);
  color: #c0c0c0;
  font-size: 0.92rem;
  line-height: 1.75;
}

/* Sacrifice */
.sacrifice-block {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
  border: 1px solid rgba(201, 168, 76, 0.15);
  border-radius: 12px;
  background: rgba(201, 168, 76, 0.03);
}
.sacrifice-text {
  font-family: var(--font-body, 'Lora', serif);
  color: #b0b0b0;
  font-size: 1.1rem;
  line-height: 2;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.85rem 2rem;
  border-radius: 6px;
  font-family: var(--font-heading, 'Cinzel', serif);
  font-size: 0.95rem;
  letter-spacing: 1px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}
.btn-gold {
  background: linear-gradient(135deg, var(--color-gold, #c9a84c), var(--color-gold-light, #e8d590));
  color: var(--color-navy, #1a1a2e);
  font-weight: 700;
}
.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(201, 168, 76, 0.4);
}
.btn-outline {
  border: 1.5px solid var(--color-gold, #c9a84c);
  color: var(--color-gold, #c9a84c);
  background: transparent;
}
.btn-outline:hover {
  background: rgba(201, 168, 76, 0.1);
  transform: translateY(-2px);
}
.btn-lg {
  padding: 1rem 2.5rem;
  font-size: 1.05rem;
}

/* CTA */
.section-cta {
  background: linear-gradient(135deg, var(--color-navy, #1a1a2e) 0%, var(--color-burgundy, #6b1d2a) 100%);
  padding: 4rem 0;
}
.cta-container {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.8rem;
    letter-spacing: 3px;
  }
  .hero-subtitle {
    font-size: 1.1rem;
  }
  .hero-section {
    padding: 8rem 0 4rem;
    min-height: auto;
  }
  .intro-grid {
    grid-template-columns: 1fr;
  }
  .grand-quote p {
    font-size: 1.15rem;
  }
  .cta-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
