<template>
  <div :class="{ 'rtl': locale === 'ar' }">
    <!-- Hero -->
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">{{ heroTitle }}</h1>
        <p class="hero-subtitle">{{ heroSubtitle }}</p>
        <div class="hero-buttons">
          <a :href="'#units'" class="btn btn-gold">{{ btnExplore }}</a>
          <a :href="'#heritage'" class="btn btn-outline">{{ btnChronicles }}</a>
        </div>
      </div>
      <div class="hero-overlay"></div>
    </section>

    <!-- Le Pacte de Carthage -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ pactTitle }}</h2>
        <div class="pact-grid">
          <div class="pact-image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Charter_of_Liberties.jpg/800px-Charter_of_Liberties.jpg" :alt="pactTitle" loading="lazy" />
          </div>
          <div class="pact-text">
            <p class="pact-intro">{{ pactIntro }}</p>
            <blockquote class="pact-quote">
              <span class="quote-mark">"</span>{{ pactQuote }}
            </blockquote>
            <ul class="pact-points">
              <li v-for="(point, i) in pactPoints" :key="i">
                <span class="point-icon">&#9830;</span>
                {{ point }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- L'Elite des Nations -->
    <section id="units" class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ eliteTitle }}</h2>
        <div class="bento-grid">
          <div v-for="(unit, i) in units" :key="i" class="unit-card" :class="'unit-card-' + (i + 1)">
            <div class="unit-badge">{{ unit.icon }}</div>
            <h3 class="unit-name">{{ unit.name }}</h3>
            <span class="unit-subtitle">{{ unit.subtitle }}</span>
            <p class="unit-desc">{{ unit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Heritage Militaire -->
    <section id="heritage" class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ heritageTitle }}</h2>
        <p class="heritage-tagline">{{ heritageTagline }}</p>
        <div class="heritage-grid">
          <div v-for="(card, i) in heritageCards" :key="i" class="heritage-card">
            <div class="heritage-numeral">{{ card.numeral }}</div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section-cta">
      <div class="container cta-container">
        <h2 class="cta-title">{{ ctaTitle }}</h2>
        <p class="cta-text">{{ ctaText }}</p>
        <NuxtLink :to="localePath('/chronologie')" class="btn btn-gold btn-lg">{{ ctaButton }}</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()
const isFr = computed(() => locale.value === 'fr')
const isAr = computed(() => locale.value === 'ar')

useHead({
  title: computed(() => isFr.value ? 'L\'Armee Multinationale — La Force du Libre Arbitre' : isAr.value ? 'الجيش متعدد الجنسيات — قوة الإرادة الحرة' : 'The Multinational Army — The Force of Free Will')
})

const heroTitle = computed(() => isFr.value ? 'L\'Armee Multinationale : La Force du Libre Arbitre' : isAr.value ? 'الجيش متعدد الجنسيات: قوة الإرادة الحرة' : 'The Multinational Army: The Force of Free Will')
const heroSubtitle = computed(() => isFr.value ? 'Au-dela du mythe du mercenariat, decouvrez comment Carthage a forge l\'unite a partir de la diversite, creant la force la plus specialisee de l\'Antiquite.' : isAr.value ? 'بعيدًا عن أسطورة المرتزقة، اكتشفوا كيف صاغت قرطاج الوحدة من التنوع، مُنشئةً أكثر القوى تخصصًا في العصور القديمة.' : 'Beyond the myth of mercenaries, discover how Carthage forged unity from diversity, creating the most specialized force of antiquity.')
const btnExplore = computed(() => isFr.value ? 'Explorer les Unites' : isAr.value ? 'استكشاف الوحدات' : 'Explore the Units')
const btnChronicles = computed(() => isFr.value ? 'Les Chroniques' : isAr.value ? 'السجلات' : 'The Chronicles')

const pactTitle = computed(() => isFr.value ? 'Le Pacte de Carthage' : isAr.value ? 'ميثاق قرطاج' : 'The Pact of Carthage')
const pactIntro = computed(() => isFr.value ? 'Contrairement aux empires fondes sur la conscription forcee, Carthage a bati sa puissance sur un modele revolutionnaire : le volontariat et l\'alliance strategique.' : isAr.value ? 'على عكس الإمبراطوريات القائمة على التجنيد الإجباري، بنت قرطاج قوتها على نموذج ثوري: التطوع والتحالف الاستراتيجي.' : 'Unlike empires built on forced conscription, Carthage built its power on a revolutionary model: volunteerism and strategic alliance.')
const pactQuote = computed(() => isFr.value ? 'Ils ne combattaient pas par contrainte, mais par alliance de gloire.' : isAr.value ? 'لم يقاتلوا بالإكراه، بل بتحالف المجد.' : 'They did not fight by constraint, but by an alliance of glory.')
const pactPoints = computed(() => isFr.value ? [
  'Respect de l\'autonomie culturelle de chaque peuple allie',
  'Accords diplomatiques bases sur la prosperite mutuelle',
] : isAr.value ? [
  'احترام الاستقلالية الثقافية لكل شعب حليف',
  'اتفاقيات دبلوماسية مبنية على الازدهار المتبادل',
] : [
  'Respect for the cultural autonomy of each allied people',
  'Diplomatic agreements based on mutual prosperity',
])

const eliteTitle = computed(() => isFr.value ? 'L\'Elite des Nations' : isAr.value ? 'نخبة الأمم' : 'The Elite of Nations')
const units = computed(() => isFr.value ? [
  { icon: '🪨', name: 'Frondeurs des Baleares', subtitle: 'Maitres de la distance', desc: 'Recrutes dans les iles Baleares, ces frondeurs etaient mortellement precis a plus de 100 metres. Chaque guerrier portait trois frondes de longueurs differentes. Leur pluie de pierres brisait les formations ennemies avant meme le contact.' },
  { icon: '🐎', name: 'Cavalerie Numide', subtitle: 'Les cavaliers les plus rapides de l\'Antiquite', desc: 'Montant sans selle ni bride, les cavaliers numides harcelaient les legions romaines avec une mobilite inegalee. Leur tactique de feinte et de charge rapide rendait les formations romaines impuissantes.' },
  { icon: '⚔️', name: 'Epeistes Iberes', subtitle: 'La falcata qui fit trembler Rome', desc: 'L\'epee ibere, la falcata, etait si redoutable que Rome fut contrainte de copier leur acier. Ces guerriers iberiques combinaient ferocite individuelle et discipline collective, formant le fer de lance de nombreuses offensives.' },
  { icon: '🛡️', name: 'Infanterie Libyenne', subtitle: 'Le Coeur Phalangiste', desc: 'Colonne vertebrale de chaque armee carthaginoise, l\'infanterie libyenne formait la phalange centrale. Equipes de longues lances et de boucliers, ils constituaient le mur infranchissable autour duquel toute la strategie s\'articulait.' },
  { icon: '🪓', name: 'Guerriers Celtes', subtitle: 'La Furie du Nord', desc: 'Recrutes en Gaule cisalpine et transalpine, les guerriers celtes apportaient une fureur de combat legendaire. Leur charge frontale brisait le moral ennemi, et leur endurance physique faisait d\'eux des combattants redoutables dans les longues batailles.' },
  { icon: '🏛️', name: 'Xanthippe le Spartiate', subtitle: 'Le sauveur de Carthage', desc: 'General spartiate qui sauva Carthage durant la Premiere Guerre Punique. En reorganisant l\'armee carthaginoise selon les principes de la phalange grecque, il infligea a Regulus une defaite ecrasante a la bataille de Tunis en 255 av. J.-C.' },
] : isAr.value ? [
  { icon: '🪨', name: 'رماة جزر البليار', subtitle: 'أسياد المسافة', desc: 'تم تجنيدهم من جزر البليار، كان هؤلاء الرماة دقيقين بشكل قاتل على مسافة تزيد عن 100 متر. حمل كل محارب ثلاثة مقاليع بأطوال مختلفة. أمطارهم الحجرية حطمت تشكيلات العدو قبل أي اتصال مباشر.' },
  { icon: '🐎', name: 'الفرسان النوميديون', subtitle: 'أسرع فرسان العصور القديمة', desc: 'ركبوا بدون سرج أو لجام، أزعج الفرسان النوميديون الفيالق الرومانية بحركية لا مثيل لها. تكتيكهم في التمويه والهجوم السريع جعل التشكيلات الرومانية عاجزة.' },
  { icon: '⚔️', name: 'مقاتلو السيوف الإيبيريون', subtitle: 'الفالكاتا التي أرعبت روما', desc: 'كان السيف الإيبيري، الفالكاتا، مرعبًا لدرجة أن روما اضطرت لنسخ فولاذهم. جمع هؤلاء المحاربون بين الشراسة الفردية والانضباط الجماعي.' },
  { icon: '🛡️', name: 'المشاة الليبيون', subtitle: 'قلب الكتيبة', desc: 'العمود الفقري لكل جيش قرطاجي، شكّل المشاة الليبيون الكتيبة المركزية. مجهزون برماح طويلة ودروع، شكلوا الجدار المنيع الذي تمحورت حوله كل الاستراتيجية.' },
  { icon: '🪓', name: 'المحاربون الكلتيون', subtitle: 'غضب الشمال', desc: 'تم تجنيدهم من بلاد الغال، جلب المحاربون الكلتيون غضبًا أسطوريًا في القتال. هجومهم الأمامي كسر معنويات العدو، وقدرتهم البدنية جعلتهم مقاتلين مرعبين.' },
  { icon: '🏛️', name: 'زانثيبوس الإسبرطي', subtitle: 'منقذ قرطاج', desc: 'جنرال إسبرطي أنقذ قرطاج خلال الحرب البونية الأولى. بإعادة تنظيم الجيش القرطاجي وفق مبادئ الكتيبة اليونانية، ألحق بريغولوس هزيمة ساحقة في معركة تونس عام 255 ق.م.' },
] : [
  { icon: '🪨', name: 'Balearic Slingers', subtitle: 'Masters of distance', desc: 'Recruited from the Balearic Islands, these slingers were deadly accurate at over 100 meters. Each warrior carried three slings of different lengths. Their rain of stones shattered enemy formations before any direct contact.' },
  { icon: '🐎', name: 'Numidian Cavalry', subtitle: 'The fastest horsemen of antiquity', desc: 'Riding without saddle or bridle, Numidian horsemen harassed Roman legions with unmatched mobility. Their feint-and-charge tactics rendered Roman formations powerless.' },
  { icon: '⚔️', name: 'Iberian Swordsmen', subtitle: 'The falcata that made Rome tremble', desc: 'The Iberian sword, the falcata, was so formidable that Rome was forced to copy their steel. These Iberian warriors combined individual ferocity with collective discipline, forming the spearhead of many offensives.' },
  { icon: '🛡️', name: 'Libyan Infantry', subtitle: 'The Phalanx Heart', desc: 'Backbone of every Carthaginian army, the Libyan infantry formed the central phalanx. Equipped with long spears and shields, they constituted the impenetrable wall around which all strategy was built.' },
  { icon: '🪓', name: 'Celtic Warriors', subtitle: 'The Fury of the North', desc: 'Recruited in Cisalpine and Transalpine Gaul, Celtic warriors brought legendary battle fury. Their frontal charge broke enemy morale, and their physical endurance made them fearsome fighters in prolonged battles.' },
  { icon: '🏛️', name: 'Xanthippus the Spartan', subtitle: 'The savior of Carthage', desc: 'Spartan general who saved Carthage during the First Punic War. By reorganizing the Carthaginian army along Greek phalanx principles, he inflicted a crushing defeat on Regulus at the Battle of Tunis in 255 BC.' },
])

const heritageTitle = computed(() => isFr.value ? 'Heritage Militaire' : isAr.value ? 'التراث العسكري' : 'Military Heritage')
const heritageTagline = computed(() => isFr.value ? 'Unite dans la Diversite' : isAr.value ? 'الوحدة في التنوع' : 'Unity in Diversity')
const heritageCards = computed(() => isFr.value ? [
  { numeral: 'I', title: 'Synergie Culturelle', desc: 'Carthage fut le premier Etat a harmoniser des tactiques de combat provenant de trois continents, creant une force militaire dont la polyvalence n\'avait aucun equivalent dans le monde antique.' },
  { numeral: 'II', title: 'Specialisation Ultime', desc: 'Chaque unite etait utilisee selon sa force ancestrale : les Numides pour la cavalerie legere, les Baleares pour le tir a distance, les Libyens pour la phalange. Cette specialisation donna a Carthage un avantage tactique decisif.' },
] : isAr.value ? [
  { numeral: 'I', title: 'التآزر الثقافي', desc: 'كانت قرطاج أول دولة تنسق تكتيكات قتالية من ثلاث قارات، مُنشئةً قوة عسكرية لم يكن لتعدد قدراتها مثيل في العالم القديم.' },
  { numeral: 'II', title: 'التخصص الأقصى', desc: 'استُخدمت كل وحدة وفق قوتها الموروثة: النوميديون للفرسان الخفيفة، البليار للرمي عن بُعد، الليبيون للكتيبة. هذا التخصص منح قرطاج تفوقًا تكتيكيًا حاسمًا.' },
] : [
  { numeral: 'I', title: 'Cultural Synergy', desc: 'Carthage was the first state to harmonize combat tactics from three continents, creating a military force whose versatility had no equivalent in the ancient world.' },
  { numeral: 'II', title: 'Ultimate Specialization', desc: 'Each unit was deployed according to its ancestral strength: Numidians for light cavalry, Balearics for ranged fire, Libyans for the phalanx. This specialization gave Carthage a decisive tactical advantage.' },
])

const ctaTitle = computed(() => isFr.value ? 'Rejoignez les Annales de l\'Histoire' : isAr.value ? 'انضموا إلى سجلات التاريخ' : 'Join the Annals of History')
const ctaText = computed(() => isFr.value ? 'Explorez les archives completes des campagnes d\'Hannibal et des alliances qui ont defie l\'Empire.' : isAr.value ? 'استكشفوا الأرشيفات الكاملة لحملات حنبعل والتحالفات التي تحدت الإمبراطورية.' : 'Explore the complete archives of Hannibal\'s campaigns and the alliances that defied the Empire.')
const ctaButton = computed(() => isFr.value ? 'Acceder aux Archives' : isAr.value ? 'الوصول إلى الأرشيفات' : 'Access the Archives')
</script>

<style scoped>
.rtl {
  direction: rtl;
  text-align: right;
}

/* Hero */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, var(--color-navy) 0%, #2d1b0e 40%, var(--color-burgundy) 100%);
  padding: 10rem 0 5rem;
  text-align: center;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Castra-Praetoria-Mauer.jpg/1280px-Castra-Praetoria-Mauer.jpg') center/cover no-repeat;
  opacity: 0.12;
  z-index: 0;
}

.hero-section .container {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 3rem;
  color: var(--color-gold);
  letter-spacing: 3px;
  margin-bottom: 1.2rem;
  line-height: 1.25;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.hero-subtitle {
  font-family: var(--font-body);
  color: #ccc;
  font-size: 1.1rem;
  font-style: italic;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-gold {
  background: linear-gradient(135deg, var(--color-gold), #b8923e);
  color: var(--color-navy);
  border: none;
}

.btn-gold:hover {
  background: linear-gradient(135deg, var(--color-gold-light), var(--color-gold));
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(201, 168, 76, 0.4);
}

.btn-outline {
  background: transparent;
  color: var(--color-gold);
  border: 1px solid rgba(201, 168, 76, 0.5);
}

.btn-outline:hover {
  background: rgba(201, 168, 76, 0.1);
  border-color: var(--color-gold);
}

.btn-lg {
  padding: 1rem 2.5rem;
  font-size: 0.9rem;
}

/* Sections */
.section {
  padding: 5rem 0;
}

.section-alt {
  background: var(--color-sand, #f5f0e8);
}

.section-dark {
  background: var(--color-navy);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--color-navy);
  text-align: center;
  margin-bottom: 2.5rem;
  letter-spacing: 2px;
}

.section-title.light {
  color: var(--color-gold);
}

/* Pact */
.pact-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 3rem;
  align-items: start;
}

.pact-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.pact-intro {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: #444;
  line-height: 1.9;
  margin-bottom: 1.5rem;
}

.pact-quote {
  position: relative;
  font-family: var(--font-body);
  font-style: italic;
  font-size: 1.1rem;
  color: var(--color-burgundy);
  padding: 1.5rem 2rem;
  background: rgba(107, 29, 42, 0.05);
  border-left: 4px solid var(--color-gold);
  border-radius: 0 8px 8px 0;
  margin: 0 0 2rem 0;
  line-height: 1.7;
}

.rtl .pact-quote {
  border-left: none;
  border-right: 4px solid var(--color-gold);
  border-radius: 8px 0 0 8px;
}

.quote-mark {
  font-family: var(--font-heading);
  font-size: 3rem;
  color: var(--color-gold);
  line-height: 0;
  position: relative;
  top: 0.3rem;
  margin-right: 0.3rem;
}

.pact-points {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pact-points li {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 0.8rem;
}

.point-icon {
  color: var(--color-gold);
  font-size: 0.7rem;
  margin-top: 0.4rem;
  flex-shrink: 0;
}

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 1.5rem;
}

.unit-card {
  background: var(--color-navy-light);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(201, 168, 76, 0.12);
  transition: all 0.3s ease;
}

.unit-card:hover {
  border-color: var(--color-gold);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.unit-card-1 {
  grid-column: span 1;
}

.unit-card-4 {
  grid-column: span 2;
}

.unit-badge {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

.unit-name {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--color-gold);
  margin-bottom: 0.3rem;
  letter-spacing: 1px;
}

.unit-subtitle {
  display: block;
  font-family: var(--font-body);
  font-style: italic;
  font-size: 0.8rem;
  color: var(--color-gold-light);
  opacity: 0.7;
  margin-bottom: 0.8rem;
}

.unit-desc {
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: #aaa;
  line-height: 1.7;
}

/* Heritage */
.heritage-tagline {
  text-align: center;
  font-family: var(--font-body);
  font-style: italic;
  font-size: 1.1rem;
  color: var(--color-burgundy);
  margin-top: -1.5rem;
  margin-bottom: 2.5rem;
}

.heritage-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.heritage-card {
  background: #fff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  border-top: 3px solid var(--color-gold);
  position: relative;
}

.heritage-numeral {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 900;
  color: rgba(201, 168, 76, 0.15);
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  line-height: 1;
}

.rtl .heritage-numeral {
  right: auto;
  left: 1.5rem;
}

.heritage-card h3 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--color-navy);
  margin-bottom: 0.8rem;
  letter-spacing: 0.5px;
}

.heritage-card p {
  font-family: var(--font-body);
  font-size: 0.92rem;
  color: #555;
  line-height: 1.8;
}

/* CTA */
.section-cta {
  background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-burgundy) 100%);
  text-align: center;
}

.cta-container {
  max-width: 650px;
}

.cta-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--color-gold);
  margin-bottom: 1.2rem;
  letter-spacing: 2px;
}

.cta-text {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: #ccc;
  line-height: 1.8;
  margin-bottom: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .pact-grid {
    grid-template-columns: 1fr;
  }

  .bento-grid {
    grid-template-columns: 1fr;
  }

  .unit-card-4 {
    grid-column: span 1;
  }

  .heritage-grid {
    grid-template-columns: 1fr;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 8rem 0 3rem;
  }

  .cta-title {
    font-size: 1.5rem;
  }
}
</style>
