<template>
  <div class="hannon-page" :dir="isAr ? 'rtl' : 'ltr'">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-portrait">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Hanno_the_Navigator.jpg/440px-Hanno_the_Navigator.jpg"
            :alt="heroTitle"
            loading="lazy"
          />
        </div>
        <div class="hero-text">
          <h1 class="hero-title">{{ heroTitle }}</h1>
          <p class="hero-date">{{ heroDate }}</p>
          <p class="hero-intro">{{ heroIntro }}</p>
        </div>
      </div>
    </section>

    <!-- Achievements Bento Grid -->
    <section class="section bento-section">
      <div class="container">
        <h2 class="section-title">{{ achievementsTitle }}</h2>
        <div class="bento-grid">
          <div class="bento-card bento-large">
            <h3>{{ bentoExpedition.title }}</h3>
            <p>{{ bentoExpedition.desc }}</p>
          </div>
          <div class="bento-card bento-quote">
            <blockquote>{{ bentoFirstContact.quote }}</blockquote>
            <cite>{{ bentoFirstContact.cite }}</cite>
          </div>
          <div class="bento-card bento-stat">
            <div class="stat-number">2,000</div>
            <div class="stat-label">{{ bentoStatLabel }}</div>
          </div>
          <div class="bento-card bento-image">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Saharan_Atlas_-_panoramio.jpg/800px-Saharan_Atlas_-_panoramio.jpg"
              :alt="bentoImageAlt"
              loading="lazy"
            />
            <span class="bento-image-label">{{ bentoImageAlt }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- The Periplus Timeline -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ periplusTitle }}</h2>
        <div class="timeline">
          <div v-for="(step, i) in periplusSteps" :key="i" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h3 class="timeline-step-title">{{ step.title }}</h3>
              <p class="timeline-step-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Erasure of Punic Legacy -->
    <section class="section section-truth">
      <div class="container">
        <h2 class="section-title light">{{ erasureTitle }}</h2>
        <div class="truth-grid">
          <div class="truth-text">
            <p>{{ erasureText }}</p>
            <blockquote class="truth-quote">{{ erasureQuote }}</blockquote>
          </div>
          <div class="truth-image">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Periplus_of_Hanno.jpg/440px-Periplus_of_Hanno.jpg"
              :alt="erasureImageAlt"
              loading="lazy"
            />
            <span class="truth-caption">{{ erasureImageAlt }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="section section-cta">
      <div class="container cta-container">
        <h2 class="cta-title">{{ ctaTitle }}</h2>
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
  isFr.value ? 'Hannon — L\'Explorateur des Mondes Inconnus'
  : isAr.value ? 'حنون — مستكشف العوالم المجهولة'
  : 'Hanno — The Explorer of Unknown Worlds'
)

const heroDate = computed(() =>
  isFr.value ? 'Amiral de Carthage • ~500 av. J.-C.'
  : isAr.value ? 'أميرال قرطاج • ~500 ق.م'
  : 'Admiral of Carthage • ~500 BC'
)

const heroIntro = computed(() =>
  isFr.value ? 'L\'homme qui repoussa les limites du monde connu, menant trente mille âmes au-delà des Colonnes d\'Hercule dans le Grand Océan.'
  : isAr.value ? 'الرجل الذي دفع حدود العالم المعروف، قائداً ثلاثين ألف روح وراء أعمدة هرقل إلى المحيط الكبير.'
  : 'The man who pushed the boundaries of the known world, leading thirty thousand souls beyond the Pillars of Hercules into the Great Ocean.'
)

const achievementsTitle = computed(() =>
  isFr.value ? 'Exploits de l\'Amiral'
  : isAr.value ? 'إنجازات الأميرال'
  : 'The Admiral\'s Achievements'
)

const bentoExpedition = computed(() =>
  isFr.value ? {
    title: 'La Grande Expédition',
    desc: '60 pentécontères, 30 000 colons — une expansion civilisationnelle massive le long des côtes africaines. La plus grande expédition maritime de l\'Antiquité, surpassant tout ce que la Grèce ou la Perse avaient jamais tenté.'
  } : isAr.value ? {
    title: 'البعثة الكبرى',
    desc: '60 سفينة خمسينية، 30,000 مستوطن — توسع حضاري هائل على طول السواحل الأفريقية. أعظم بعثة بحرية في العصور القديمة، متفوقة على كل ما حاولته اليونان أو بلاد فارس.'
  } : {
    title: 'The Great Expedition',
    desc: '60 penteconters, 30,000 colonists — a massive civilizational expansion along the African coasts. The greatest maritime expedition of antiquity, surpassing anything Greece or Persia had ever attempted.'
  }
)

const bentoFirstContact = computed(() =>
  isFr.value ? {
    quote: 'Le premier navigateur méditerranéen connu à avoir atteint les forêts tropicales d\'Afrique de l\'Ouest.',
    cite: 'Premier Contact'
  } : isAr.value ? {
    quote: 'أول ملاح متوسطي معروف يصل إلى الغابات الاستوائية في غرب أفريقيا.',
    cite: 'الاتصال الأول'
  } : {
    quote: 'The first known Mediterranean navigator to reach the tropical forests of West Africa.',
    cite: 'First Contact'
  }
)

const bentoStatLabel = computed(() =>
  isFr.value ? 'ans avant la découverte européenne'
  : isAr.value ? 'سنة قبل الاكتشاف الأوروبي'
  : 'years before European discovery'
)

const bentoImageAlt = computed(() =>
  isFr.value ? 'Le Passage Saharien'
  : isAr.value ? 'الممر الصحراوي'
  : 'The Saharan Passage'
)

const periplusTitle = computed(() =>
  isFr.value ? 'Le Périple d\'Hannon'
  : isAr.value ? 'رحلة حنون البحرية'
  : 'The Periplus of Hanno'
)

const periplusSteps = computed(() =>
  isFr.value ? [
    { title: 'Départ de Carthage', desc: 'La flotte quitte Carthage et franchit le détroit de Gibraltar, s\'aventurant au-delà des Colonnes d\'Hercule vers l\'inconnu.' },
    { title: 'La Côte du Désert', desc: 'Navigation le long de la côte saharienne, fondation de Thymiaterium et Soloeis — premières colonies puniques sur l\'Atlantique.' },
    { title: 'Le Char des Dieux', desc: 'Observation de l\'éruption du Mont Cameroun (Theon Ochema) — une montagne de feu s\'élevant au-dessus de la jungle, décrite comme « le char des dieux ».' },
    { title: 'L\'Archive de Baal', desc: 'Retour triomphal à Carthage. Hannon fait graver le récit de son périple sur une tablette de bronze, dédiée au temple de Baal Hammon.' }
  ] : isAr.value ? [
    { title: 'المغادرة من قرطاج', desc: 'الأسطول يغادر قرطاج ويعبر مضيق جبل طارق، مغامراً وراء أعمدة هرقل نحو المجهول.' },
    { title: 'ساحل الصحراء', desc: 'الإبحار على طول الساحل الصحراوي، تأسيس ثيمياتيريوم وسولويس — أولى المستعمرات البونية على المحيط الأطلسي.' },
    { title: 'عربة الآلهة', desc: 'مشاهدة ثوران جبل الكاميرون (ثيون أوكيما) — جبل من نار يرتفع فوق الغابة، وُصف بأنه «عربة الآلهة».' },
    { title: 'أرشيف بعل', desc: 'العودة المظفرة إلى قرطاج. حنون ينقش رواية رحلته على لوح برونزي، مكرس لمعبد بعل حمون.' }
  ] : [
    { title: 'Departure from Carthage', desc: 'The fleet sails from Carthage through the Straits of Gibraltar, venturing beyond the Pillars of Hercules into the unknown.' },
    { title: 'The Desert Rim', desc: 'Navigating the Saharan coast, establishing Thymiaterium and Soloeis — the first Punic colonies on the Atlantic.' },
    { title: 'The Chariot of the Gods', desc: 'Witnessing the eruption of Mount Cameroon (Theon Ochema) — a mountain of fire rising above the jungle, described as "the chariot of the gods."' },
    { title: 'The Archive of Baal', desc: 'Triumphant return to Carthage. Hanno inscribes the account of his periplus on a bronze tablet, dedicated to the temple of Baal Hammon.' }
  ]
)

const erasureTitle = computed(() =>
  isFr.value ? 'L\'Effacement de l\'Héritage Punique'
  : isAr.value ? 'محو الإرث البوني'
  : 'The Erasure of Punic Legacy'
)

const erasureText = computed(() =>
  isFr.value ? 'L\'historiographie européenne attribue aux explorateurs portugais la « découverte » de la côte africaine dans les années 1400. Hannon l\'avait fait en 500 av. J.-C. — deux millénaires plus tôt. Cette amnésie sélective a effacé la contribution de Carthage à la connaissance du monde.'
  : isAr.value ? 'يُنسب التأريخ الأوروبي إلى المستكشفين البرتغاليين «اكتشاف» الساحل الأفريقي في القرن الخامس عشر. حنون فعل ذلك في 500 ق.م — قبل ألفي عام. هذا النسيان الانتقائي محا مساهمة قرطاج في معرفة العالم.'
  : 'European historiography credits Portuguese explorers with "discovering" the African coast in the 1400s. Hanno did it in 500 BC — two millennia earlier. This selective amnesia erased Carthage\'s contribution to the knowledge of the world.'
)

const erasureQuote = computed(() =>
  isFr.value ? 'Des explorateurs européens comme Cadamosto ou Vasco de Gama suivaient les sillages de pentécontères carthaginoises disparues vingt siècles plus tôt.'
  : isAr.value ? 'المستكشفون الأوروبيون مثل كادموستو أو فاسكو دا غاما كانوا يتبعون مسارات السفن القرطاجية التي اختفت قبل عشرين قرناً.'
  : 'European explorers like Cadamosto or Vasco da Gama were following the wakes of Carthaginian penteconters that had vanished twenty centuries earlier.'
)

const erasureImageAlt = computed(() =>
  isFr.value ? 'Manuscrit ancien du Périple d\'Hannon'
  : isAr.value ? 'مخطوطة قديمة لرحلة حنون'
  : 'Ancient manuscript of the Periplus of Hanno'
)

const ctaTitle = computed(() =>
  isFr.value ? 'Au-delà de l\'horizon, il n\'y a que Carthage.'
  : isAr.value ? 'وراء الأفق، لا يوجد سوى قرطاج.'
  : 'Beyond the Horizon, There is Only Carthage.'
)

const ctaButton = computed(() =>
  isFr.value ? 'Explorer les Archives Puniques'
  : isAr.value ? 'استكشاف الأرشيف البوني'
  : 'Explore the Punic Archives'
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
  grid-template-columns: 380px 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-portrait img {
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 2px solid var(--color-gold);
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 3.2rem;
  color: var(--color-gold);
  line-height: 1.2;
  margin-bottom: 1rem;
  letter-spacing: 2px;
}

.hero-date {
  font-family: var(--font-body);
  color: var(--color-gold-light);
  font-size: 1.1rem;
  font-style: italic;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
}

.hero-intro {
  font-family: var(--font-body);
  color: #c0c0d0;
  font-size: 1.15rem;
  line-height: 1.9;
}

/* Common Section Styles */
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

/* Bento Grid */
.bento-section {
  background: var(--color-navy);
}

.bento-section .section-title {
  color: var(--color-gold);
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap: 1.5rem;
}

.bento-card {
  border-radius: 16px;
  padding: 2.5rem;
  transition: transform 0.3s ease;
}

.bento-card:hover {
  transform: translateY(-4px);
}

.bento-large {
  grid-column: 1 / 3;
  background: linear-gradient(135deg, var(--color-navy-light) 0%, #3a3a5c 100%);
  border: 1px solid rgba(201, 168, 76, 0.3);
}

.bento-large h3 {
  font-family: var(--font-heading);
  color: var(--color-gold);
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

.bento-large p {
  font-family: var(--font-body);
  color: #b0b0c0;
  font-size: 1.05rem;
  line-height: 1.8;
}

.bento-quote {
  background: var(--color-burgundy);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bento-quote blockquote {
  font-family: var(--font-body);
  color: #fff;
  font-size: 1.1rem;
  line-height: 1.7;
  font-style: italic;
  margin: 0 0 1rem;
  padding: 0;
  border: none;
}

.bento-quote cite {
  font-family: var(--font-heading);
  color: var(--color-gold-light);
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.bento-stat {
  background: linear-gradient(135deg, var(--color-navy-light) 0%, #3a3a5c 100%);
  border: 1px solid rgba(201, 168, 76, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 4rem;
  color: var(--color-gold);
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-family: var(--font-body);
  color: #a0a0b0;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.bento-image {
  grid-column: 1 / 3;
  padding: 0;
  overflow: hidden;
  position: relative;
}

.bento-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
  border-radius: 16px;
}

.bento-image-label {
  position: absolute;
  bottom: 1rem;
  left: 1.5rem;
  font-family: var(--font-heading);
  color: #fff;
  font-size: 1rem;
  background: rgba(26, 26, 46, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  letter-spacing: 1px;
}

[dir="rtl"] .bento-image-label {
  left: auto;
  right: 1.5rem;
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 3rem;
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
  border: 3px solid #f8f5ef;
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

/* Truth / Erasure Section */
.section-truth {
  background: var(--color-burgundy);
  padding: 6rem 2rem;
}

.truth-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 3rem;
  align-items: center;
}

.truth-text p {
  font-family: var(--font-body);
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.9;
  margin-bottom: 2rem;
}

.truth-quote {
  font-family: var(--font-body);
  color: var(--color-gold-light);
  font-size: 1.15rem;
  line-height: 1.8;
  font-style: italic;
  border-left: 3px solid var(--color-gold);
  padding-left: 1.5rem;
  margin: 0;
}

[dir="rtl"] .truth-quote {
  border-left: none;
  border-right: 3px solid var(--color-gold);
  padding-left: 0;
  padding-right: 1.5rem;
}

.truth-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.truth-caption {
  display: block;
  text-align: center;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  margin-top: 0.8rem;
}

/* CTA Section */
.section-cta {
  background: linear-gradient(135deg, var(--color-navy) 0%, #0d0d1a 100%);
  padding: 8rem 2rem;
}

.cta-container {
  text-align: center;
}

.cta-title {
  font-family: var(--font-heading);
  font-size: 2.6rem;
  color: var(--color-gold);
  margin-bottom: 2rem;
  letter-spacing: 3px;
  line-height: 1.3;
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
    text-align: center;
  }

  .hero-portrait {
    max-width: 320px;
    margin: 0 auto;
  }

  .hero-title {
    font-size: 2.4rem;
  }

  .truth-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
    padding: 8rem 1.5rem 3rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .bento-grid {
    grid-template-columns: 1fr;
  }

  .bento-large,
  .bento-image {
    grid-column: 1;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .stat-number {
    font-size: 3rem;
  }

  .cta-title {
    font-size: 1.8rem;
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
}
</style>
