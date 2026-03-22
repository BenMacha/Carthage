<template>
  <div :dir="isAr ? 'rtl' : 'ltr'">
    <!-- Hero -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <span class="hero-epithet">{{ heroEpithet }}</span>
        <h1 class="hero-title">{{ heroTitle }}</h1>
        <p class="hero-subtitle">{{ heroSubtitle }}</p>
        <p class="hero-text">{{ heroText }}</p>
        <div class="hero-buttons">
          <NuxtLink :to="localePath('/archives')" class="btn btn-gold">{{ btnExplore }}</NuxtLink>
          <NuxtLink :to="localePath('/hannibal')" class="btn btn-outline">{{ btnLineage }}</NuxtLink>
        </div>
        <div class="hero-portrait">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Hasdrubal_Barca_%28Nordisk_familjebok%29.jpg/440px-Hasdrubal_Barca_%28Nordisk_familjebok%29.jpg"
            :alt="heroTitle"
            loading="lazy"
          />
          <span class="hero-portrait-caption">{{ bustCaption }}</span>
        </div>
      </div>
    </section>

    <!-- Master of Iberia -->
    <section class="section">
      <div class="container">
        <div class="portrait-grid">
          <div class="portrait-image-col">
            <div class="portrait-frame">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Hasdrubal_Barca_%28Nordisk_familjebok%29.jpg/440px-Hasdrubal_Barca_%28Nordisk_familjebok%29.jpg"
                :alt="iberiaTitle"
                loading="lazy"
              />
              <div class="portrait-badges">
                <span class="badge badge-role">{{ roleLabel }}: {{ roleValue }}</span>
                <span class="badge badge-legacy">{{ legacyLabel }}: {{ legacyValue }}</span>
                <span class="badge badge-date">{{ dateBadge }}</span>
              </div>
            </div>
          </div>
          <div class="portrait-text-col">
            <h2 class="section-heading">{{ iberiaTitle }}</h2>
            <p class="intro-paragraph">{{ iberiaText }}</p>
          </div>
        </div>
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

    <!-- Achievement Cards -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ achievementsTitle }}</h2>
        <div class="achievements-grid">
          <div v-for="card in achievementCards" :key="card.title" class="achievement-card">
            <div class="achievement-icon">{{ card.icon }}</div>
            <h3 class="achievement-name">{{ card.title }}</h3>
            <p class="achievement-desc">{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Rome's Cruelty -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ crueltyTitle }}</h2>
        <div class="cruelty-block">
          <p class="cruelty-text">{{ crueltyText }}</p>
          <blockquote class="cruelty-quote">
            <p>{{ crueltyQuote }}</p>
          </blockquote>
          <div class="cruelty-response">
            <span class="response-label">{{ responseLabel }}</span>
            <p class="response-text">"{{ responseQuote }}"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section-cta">
      <div class="container cta-container">
        <NuxtLink :to="localePath('/hannibal')" class="btn btn-gold btn-lg">{{ ctaNext }}</NuxtLink>
        <NuxtLink :to="localePath('/guerres-puniques')" class="btn btn-outline btn-lg">{{ ctaMaps }}</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()
const isFr = computed(() => locale.value === 'fr')
const isAr = computed(() => locale.value === 'ar')

// Hero
const heroEpithet = computed(() =>
  isFr.value ? 'Le frère qui traversa les Alpes pour rejoindre Hannibal'
  : isAr.value ? 'الأخ الذي عبر جبال الألب للانضمام إلى حنبعل'
  : 'The brother who crossed the Alps to join Hannibal'
)
const heroTitle = computed(() =>
  isFr.value ? 'Hasdrubal Barca — Le Sacrifice Oublié'
  : isAr.value ? 'حسدربعل برقا — التضحية المنسية'
  : 'Hasdrubal Barca — The Forgotten Sacrifice'
)
const heroSubtitle = computed(() =>
  isFr.value ? 'Le Lion Déchu de Carthage'
  : isAr.value ? 'أسد قرطاج الساقط'
  : 'The Fallen Lion of Carthage'
)
const heroText = computed(() =>
  isFr.value ? 'Stratège d\'une volonté de fer, Hasdrubal tint le front ibérique pendant une décennie tandis que son frère Hannibal ébranlait les portes de Rome.'
  : isAr.value ? 'استراتيجي ذو إرادة حديدية، حافظ حسدربعل على الجبهة الإيبيرية لعقد كامل بينما كان شقيقه حنبعل يهزّ أبواب روما.'
  : 'A strategist of iron will, Hasdrubal held the Iberian front for a decade while his brother Hannibal shook the gates of Rome.'
)
const btnExplore = computed(() =>
  isFr.value ? 'Explorer les Archives' : isAr.value ? 'استكشف الأرشيف' : 'Explore Archive'
)
const btnLineage = computed(() =>
  isFr.value ? 'La Lignée' : isAr.value ? 'السلالة' : 'The Lineage'
)
const bustCaption = computed(() =>
  isFr.value ? 'Représentation d\'Hasdrubal Barca — Nordisk Familjebok'
  : isAr.value ? 'تمثيل حسدربعل برقا — نورديسك فاميليبوك'
  : 'Depiction of Hasdrubal Barca — Nordisk Familjebok'
)

// Master of Iberia
const iberiaTitle = computed(() =>
  isFr.value ? 'Le Maître de l\'Ibérie'
  : isAr.value ? 'سيد إيبيريا'
  : 'Master of Iberia'
)
const iberiaText = computed(() =>
  isFr.value ? 'Tandis que l\'Histoire s\'obsède sur Hannibal, Hasdrubal fut l\'architecte de la survie carthaginoise. Gouvernant l\'Ibérie pendant plus de dix ans, il maintint les mines d\'argent et la main-d\'œuvre qui alimentaient la machine de guerre punique.'
  : isAr.value ? 'بينما يتركز التاريخ على حنبعل، كان حسدربعل مهندس البقاء القرطاجي. حكم إيبيريا لأكثر من عشر سنوات، وحافظ على مناجم الفضة والقوى العاملة التي غذّت آلة الحرب البونية.'
  : 'While History obsesses over Hannibal, Hasdrubal was the architect of Carthaginian survival. Governing Iberia for over ten years, he maintained the silver mines and the manpower that fuelled the Punic war machine.'
)
const roleLabel = computed(() => isFr.value ? 'Rôle' : isAr.value ? 'الدور' : 'Role')
const roleValue = computed(() =>
  isFr.value ? 'Commandant & Gouverneur'
  : isAr.value ? 'قائد وحاكم'
  : 'Commander & Governor'
)
const legacyLabel = computed(() => isFr.value ? 'Héritage' : isAr.value ? 'الإرث' : 'Legacy')
const legacyValue = computed(() =>
  isFr.value ? 'Seconde Traversée Alpine'
  : isAr.value ? 'العبور الألبي الثاني'
  : 'Second Alpine Crossing'
)
const dateBadge = computed(() => '~245–207 BC')

// Timeline
const timelineTitle = computed(() =>
  isFr.value ? 'Le Fil du Temps'
  : isAr.value ? 'خيط الزمن'
  : 'The Thread of Time'
)
const timelineEvents = computed(() =>
  isFr.value ? [
    { date: '218–209 av. J.-C.', title: 'La Défense de l\'Espagne', desc: 'Le fardeau de l\'empire reposait sur ses épaules. Hasdrubal maintint les positions carthaginoises en Ibérie face à la pression constante des légions romaines de Scipion, assurant le flux vital d\'argent et de recrues vers Carthage.' },
    { date: '208–207 av. J.-C.', title: 'La Seconde Traversée Alpine', desc: 'Émulant l\'audace de son frère, Hasdrubal rassembla une armée puissante et franchit les Alpes par le col du Brenner, espérant unir ses forces à celles d\'Hannibal pour porter le coup fatal à Rome.' },
    { date: '207 av. J.-C.', title: 'Bataille du Métaure', desc: 'Encerclé par deux armées romaines sous Claudius Nero et Livius Salinator, Hasdrubal comprit que la fin était venue. Il choisit la mort du guerrier, chargeant au cœur des lignes ennemies, préférant la gloire au déshonneur.' },
  ] : isAr.value ? [
    { date: '218–209 ق.م', title: 'الدفاع عن إسبانيا', desc: 'حمل عبء الإمبراطورية على كتفيه. حافظ حسدربعل على المواقع القرطاجية في إيبيريا أمام ضغط الفيالق الرومانية المستمر، مؤمّناً تدفق الفضة والمجندين الحيوي نحو قرطاج.' },
    { date: '208–207 ق.م', title: 'العبور الألبي الثاني', desc: 'محاكياً جرأة شقيقه، جمع حسدربعل جيشاً قوياً وعبر الألب عبر ممر برينر، آملاً في توحيد قواته مع حنبعل لتوجيه الضربة القاضية لروما.' },
    { date: '207 ق.م', title: 'معركة ميتاوروس', desc: 'محاصراً من جيشين رومانيين بقيادة كلاوديوس نيرو وليفيوس ساليناتور، أدرك حسدربعل أن النهاية قد حانت. اختار موت المحارب، مُقتحماً قلب الخطوط المعادية.' },
  ] : [
    { date: '218–209 BC', title: 'Defending Spain', desc: 'The burden of the empire rested on his shoulders. Hasdrubal maintained Carthaginian positions in Iberia against the relentless pressure of Scipio\'s Roman legions, securing the vital flow of silver and recruits to Carthage.' },
    { date: '208–207 BC', title: 'The Second Alpine Crossing', desc: 'Emulating his brother\'s audacity, Hasdrubal gathered a powerful army and crossed the Alps via the Brenner Pass, hoping to unite his forces with Hannibal\'s to deliver the fatal blow to Rome.' },
    { date: '207 BC', title: 'Battle of Metaurus', desc: 'Surrounded by two Roman armies under Claudius Nero and Livius Salinator, Hasdrubal knew the end had come. He chose a warrior\'s death, charging into the heart of enemy lines, preferring glory to dishonour.' },
  ]
)

// Achievement Cards
const achievementsTitle = computed(() =>
  isFr.value ? 'Accomplissements'
  : isAr.value ? 'الإنجازات'
  : 'Achievements'
)
const achievementCards = computed(() =>
  isFr.value ? [
    { icon: '👑', title: 'Une Décennie de Souveraineté', desc: 'Il gouverna l\'Ibérie carthaginoise pendant plus de dix ans, maintenant l\'ordre parmi des tribus hostiles et assurant la production des mines d\'argent qui finançaient l\'effort de guerre.' },
    { icon: '🏔️', title: 'Pionnier Alpin', desc: 'Il réalisa la SECONDE traversée des Alpes avec une armée carthaginoise, prouvant que l\'exploit de son frère n\'était pas un coup de chance mais le génie de la lignée Barcide.' },
    { icon: '⛏️', title: 'Argent Punique', desc: 'Gestionnaire des mines vitales d\'argent d\'Ibérie, Hasdrubal contrôla les ressources financières qui permirent à Carthage de poursuivre la guerre pendant seize longues années.' },
    { icon: '🤝', title: 'Unificateur de Clans', desc: 'Par la diplomatie et la force, il unit les tribus celtibères sous la bannière de Carthage, forgeant des alliances qui résistèrent à la pression romaine pendant une décennie.' },
  ] : isAr.value ? [
    { icon: '👑', title: 'عقد من السيادة', desc: 'حكم إيبيريا القرطاجية لأكثر من عشر سنوات، محافظاً على النظام بين القبائل المعادية ومؤمّناً إنتاج مناجم الفضة التي موّلت المجهود الحربي.' },
    { icon: '🏔️', title: 'رائد ألبي', desc: 'حقق العبور الثاني لجبال الألب بجيش قرطاجي، مثبتاً أن إنجاز شقيقه لم يكن ضربة حظ بل عبقرية سلالة البرقيين.' },
    { icon: '⛏️', title: 'الفضة البونية', desc: 'مدير مناجم الفضة الحيوية في إيبيريا، سيطر حسدربعل على الموارد المالية التي مكّنت قرطاج من مواصلة الحرب ستة عشر عاماً.' },
    { icon: '🤝', title: 'موحّد القبائل', desc: 'بالدبلوماسية والقوة، وحّد القبائل الكلتإيبيرية تحت راية قرطاج، مُقيماً تحالفات صمدت أمام الضغط الروماني لعقد كامل.' },
  ] : [
    { icon: '👑', title: 'A Decade of Sovereignty', desc: 'He governed Carthaginian Iberia for over ten years, maintaining order among hostile tribes and securing the silver mine output that financed the war effort.' },
    { icon: '🏔️', title: 'Alpine Pioneer', desc: 'He achieved the SECOND crossing of the Alps with a Carthaginian army, proving his brother\'s feat was no stroke of luck but the genius of the Barcid lineage.' },
    { icon: '⛏️', title: 'Punic Silver', desc: 'Manager of the vital Iberian silver mines, Hasdrubal controlled the financial resources that allowed Carthage to sustain the war for sixteen long years.' },
    { icon: '🤝', title: 'Unification of Clans', desc: 'Through diplomacy and force, he united the Celtiberian tribes under the banner of Carthage, forging alliances that withstood Roman pressure for a decade.' },
  ]
)

// Rome's Cruelty
const crueltyTitle = computed(() =>
  isFr.value ? 'La Cruauté de Rome : La Tête d\'un Frère'
  : isAr.value ? 'قسوة روما: رأس أخ'
  : 'Rome\'s Cruelty: The Head of a Brother'
)
const crueltyText = computed(() =>
  isFr.value ? 'Après la bataille du Métaure, les Romains décapitèrent Hasdrubal et jetèrent sa tête devant les portes du camp d\'Hannibal. Ce geste de barbarie calculée visait à briser le moral du plus grand ennemi de Rome.'
  : isAr.value ? 'بعد معركة ميتاوروس، قطع الرومان رأس حسدربعل وألقوه أمام بوابات معسكر حنبعل. هذا العمل الوحشي المحسوب كان يهدف إلى تحطيم معنويات أعظم عدو لروما.'
  : 'After the Battle of Metaurus, the Romans decapitated Hasdrubal and threw his head before the gates of Hannibal\'s camp. This act of calculated barbarity was designed to break the morale of Rome\'s greatest enemy.'
)
const crueltyQuote = computed(() =>
  isFr.value ? 'Ils jetèrent la tête de son frère devant les portes mêmes du camp d\'Hannibal, héraut silencieux de la fin de tout espoir.'
  : isAr.value ? 'ألقوا رأس أخيه أمام بوابات معسكر حنبعل ذاتها، نذيراً صامتاً بنهاية كل أمل.'
  : 'They threw the head of his brother before the very gates of Hannibal\'s camp, a silent herald of the end of all hope.'
)
const responseLabel = computed(() =>
  isFr.value ? 'La réponse d\'Hannibal'
  : isAr.value ? 'رد حنبعل'
  : 'Hannibal\'s response'
)
const responseQuote = computed(() =>
  isFr.value ? 'Je vois le destin de Carthage.'
  : isAr.value ? 'أرى مصير قرطاج.'
  : 'I see the destiny of Carthage.'
)

// CTA
const ctaNext = computed(() =>
  isFr.value ? 'Suivant : Hannibal Barca'
  : isAr.value ? 'التالي: حنبعل برقا'
  : 'Next: Hannibal Barca'
)
const ctaMaps = computed(() =>
  isFr.value ? 'Cartes de Campagne'
  : isAr.value ? 'خرائط الحملات'
  : 'Campaign Maps'
)
</script>

<style scoped>
/* Hero */
.hero-section {
  position: relative;
  background: linear-gradient(160deg, var(--color-navy) 0%, #0d0d1a 60%, var(--color-burgundy) 100%);
  padding: 10rem 0 5rem;
  text-align: center;
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  align-items: center;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center bottom, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
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
.hero-epithet {
  display: inline-block;
  font-family: var(--font-body, 'Lora', serif);
  font-style: italic;
  color: var(--color-gold-light);
  font-size: 1rem;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  opacity: 0.85;
}
.hero-title {
  font-family: var(--font-heading, 'Cinzel', serif);
  font-size: 3.6rem;
  color: var(--color-gold);
  margin-bottom: 1rem;
  letter-spacing: 3px;
  line-height: 1.15;
}
.hero-subtitle {
  font-family: var(--font-heading, 'Cinzel', serif);
  color: #e0e0e0;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
}
.hero-text {
  font-family: var(--font-body, 'Lora', serif);
  color: #b0b0b0;
  font-size: 1.05rem;
  max-width: 680px;
  margin: 0 auto 2.5rem;
  line-height: 1.85;
}
.hero-buttons {
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  margin-bottom: 3rem;
}
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
  background: linear-gradient(135deg, var(--color-gold), var(--color-gold-light));
  color: var(--color-navy);
  font-weight: 700;
}
.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(201, 168, 76, 0.4);
}
.btn-outline {
  border: 1.5px solid var(--color-gold);
  color: var(--color-gold);
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
.hero-portrait {
  max-width: 280px;
  margin: 0 auto;
}
.hero-portrait img {
  width: 100%;
  border-radius: 12px;
  border: 2px solid rgba(201, 168, 76, 0.3);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
}
.hero-portrait-caption {
  display: block;
  text-align: center;
  font-size: 0.8rem;
  color: #777;
  font-style: italic;
  margin-top: 0.8rem;
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

/* Portrait Grid */
.portrait-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 3rem;
  align-items: start;
}
.portrait-frame img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}
.portrait-badges {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 1.2rem;
}
.badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-family: var(--font-body, 'Lora', serif);
  font-size: 0.82rem;
  letter-spacing: 0.5px;
}
.badge-role {
  background: rgba(107, 29, 42, 0.12);
  color: var(--color-burgundy, #6b1d2a);
  border: 1px solid rgba(107, 29, 42, 0.25);
}
.badge-legacy {
  background: rgba(201, 168, 76, 0.1);
  color: var(--color-gold, #c9a84c);
  border: 1px solid rgba(201, 168, 76, 0.25);
}
.badge-date {
  background: rgba(26, 26, 46, 0.08);
  color: var(--color-navy, #1a1a2e);
  border: 1px solid rgba(26, 26, 46, 0.2);
  font-weight: 600;
}
.intro-paragraph {
  font-family: var(--font-body, 'Lora', serif);
  color: #444;
  font-size: 1.05rem;
  line-height: 1.9;
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

/* Achievement Cards */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}
.achievement-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
  border-top: 4px solid var(--color-gold);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.achievement-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}
.achievement-icon {
  font-size: 2rem;
  margin-bottom: 0.8rem;
}
.achievement-name {
  font-family: var(--font-heading, 'Cinzel', serif);
  font-size: 1.1rem;
  color: var(--color-navy, #1a1a2e);
  margin-bottom: 0.6rem;
}
.achievement-desc {
  font-family: var(--font-body, 'Lora', serif);
  color: #555;
  font-size: 0.9rem;
  line-height: 1.7;
}

/* Cruelty / Truth Section */
.cruelty-block {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
.cruelty-text {
  font-family: var(--font-body, 'Lora', serif);
  color: #b0b0b0;
  font-size: 1.05rem;
  line-height: 1.85;
  margin-bottom: 2.5rem;
}
.cruelty-quote {
  border-left: 3px solid var(--color-burgundy, #6b1d2a);
  padding: 1.5rem 2rem;
  margin: 0 auto 2.5rem;
  max-width: 650px;
  background: rgba(107, 29, 42, 0.08);
  border-radius: 0 8px 8px 0;
}
:global([dir="rtl"]) .cruelty-quote {
  border-left: none;
  border-right: 3px solid var(--color-burgundy, #6b1d2a);
  border-radius: 8px 0 0 8px;
}
.cruelty-quote p {
  font-family: var(--font-body, 'Lora', serif);
  font-style: italic;
  color: var(--color-gold-light, #e8d590);
  font-size: 1.1rem;
  line-height: 1.8;
}
.cruelty-response {
  margin-top: 2rem;
}
.response-label {
  font-family: var(--font-heading, 'Cinzel', serif);
  font-size: 0.9rem;
  color: var(--color-gold, #c9a84c);
  letter-spacing: 2px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.8rem;
}
.response-text {
  font-family: var(--font-body, 'Lora', serif);
  font-size: 1.6rem;
  color: var(--color-burgundy, #6b1d2a);
  font-style: italic;
  font-weight: 600;
  background: linear-gradient(135deg, var(--color-burgundy) 0%, #a0354a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* CTA */
.section-cta {
  background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-burgundy) 100%);
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
    font-size: 2.2rem;
  }
  .hero-section {
    padding: 8rem 0 3rem;
    min-height: auto;
  }
  .portrait-grid {
    grid-template-columns: 1fr;
  }
  .achievements-grid {
    grid-template-columns: 1fr;
  }
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  .cta-container {
    flex-direction: column;
    align-items: center;
  }
  .cruelty-quote {
    padding: 1rem 1.2rem;
  }
  .response-text {
    font-size: 1.2rem;
  }
}
</style>
