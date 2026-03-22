<template>
  <div :class="{ 'rtl': locale === 'ar' }">
    <!-- Hero -->
    <section class="hero-section">
      <div class="container">
        <span class="hero-tag">{{ heroTag }}</span>
        <h1 class="hero-title">{{ heroTitle }}</h1>
        <p class="hero-subtitle">{{ heroSubtitle }}</p>
      </div>
    </section>

    <!-- Portrait & Introduction -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ portraitTitle }}</h2>
        <div class="portrait-grid">
          <div class="portrait-image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Didon_et_son_peuple_accueillant_%C3%89n%C3%A9e_-_Pierre-Narcisse_Gu%C3%A9rin.jpg/800px-Didon_et_son_peuple_accueillant_%C3%89n%C3%A9e_-_Pierre-Narcisse_Gu%C3%A9rin.jpg" :alt="heroTitle" loading="lazy" />
            <div class="portrait-tags">
              <span class="tag tag-gold">{{ tagOrigin }}</span>
              <span class="tag tag-burgundy">{{ tagHeritage }}</span>
            </div>
          </div>
          <div class="portrait-text">
            <p v-for="(p, i) in portraitParagraphs" :key="i">{{ p }}</p>
            <blockquote class="portrait-quote">
              <span class="quote-mark">"</span>
              {{ portraitQuote }}
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <!-- Le Génie de la Négociation -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ byrsaTitle }}</h2>
        <div class="byrsa-grid">
          <div class="byrsa-text">
            <blockquote class="byrsa-quote">"{{ byrsaQuote }}"</blockquote>
            <p v-for="(p, i) in byrsaParagraphs" :key="i">{{ p }}</p>
          </div>
          <div class="byrsa-card">
            <div class="byrsa-icon">🏛️</div>
            <h3>{{ byrsaCardTitle }}</h3>
            <p>{{ byrsaCardText }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Truth Section -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ mythTitle }}</h2>
        <div class="myth-grid">
          <div class="myth-card myth-card-burgundy">
            <h3>{{ mythCard1Title }}</h3>
            <p>{{ mythCard1Text }}</p>
          </div>
          <div class="myth-card myth-card-navy">
            <h3>{{ mythCard2Title }}</h3>
            <p>{{ mythCard2Text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ timelineTitle }}</h2>
        <div class="timeline">
          <div v-for="(e, i) in timelineEvents" :key="i" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-date">{{ e.date }}</div>
              <h3 class="timeline-heading">{{ e.title }}</h3>
              <p class="timeline-text">{{ e.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Achievements -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ achievementsTitle }}</h2>
        <div class="achievements-grid">
          <div v-for="a in achievements" :key="a.title" class="achievement-card">
            <div class="achievement-icon">{{ a.icon }}</div>
            <h3>{{ a.title }}</h3>
            <p>{{ a.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sources -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ sourcesTitle }}</h2>
        <div class="citations-grid">
          <div v-for="(c, i) in citations" :key="i" class="citation-card">
            <span class="citation-icon">{{ c.icon }}</span>
            <div>
              <h4>{{ c.title }}</h4>
              <p>{{ c.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale } = useI18n()
const isFr = computed(() => locale.value === 'fr')
const isAr = computed(() => locale.value === 'ar')

useHead({
  title: computed(() => isFr.value ? 'Didon — La Reine qui Défia les Empires' : isAr.value ? 'ديدو — الملكة التي تحدت الإمبراطوريات' : 'Dido — The Queen Who Defied Empires')
})

const heroTag = computed(() => isFr.value ? '~ 814 av. J.-C. \u2022 Carthage' : isAr.value ? '~ 814 ق.م \u2022 قرطاج' : '~ 814 BC \u2022 Carthage')
const heroTitle = computed(() => isFr.value ? 'Didon — La Reine qui Défia les Empires' : isAr.value ? 'ديدو — الملكة التي تحدت الإمبراطوريات' : 'Dido — The Queen Who Defied Empires')
const heroSubtitle = computed(() => isFr.value ? 'Une souveraine phénicienne, une stratège politique et la fondatrice d\'une civilisation qui régna sur la Méditerranée.' : isAr.value ? 'ملكة فينيقية، استراتيجية سياسية ومؤسسة حضارة حكمت البحر المتوسط.' : 'A Phoenician sovereign, a political strategist, and the founder of a civilization that ruled the Mediterranean.')

const portraitTitle = computed(() => isFr.value ? 'Princesse de Tyr, Génie Politique' : isAr.value ? 'أميرة صور، عبقرية سياسية' : 'Princess of Tyre, Political Genius')
const portraitParagraphs = computed(() => isFr.value ? [
  'Fille du roi Mutto de Tyr, Élyssa (Didon) n\'était pas seulement une héritière, mais une visionnaire dans un monde dominé par les ambitions masculines et les trahisons fraternelles.',
  'Après l\'assassinat de son mari Sychée par son frère Pygmalion, elle orchestre une fuite spectaculaire, emportant avec elle le trésor royal et une suite de nobles tyriens, transformant un exil forcé en une quête de souveraineté.',
] : isAr.value ? [
  'ابنة الملك موتو ملك صور، لم تكن إليسا (ديدو) مجرد وريثة، بل كانت صاحبة رؤية في عالم تسيطر عليه الطموحات الذكورية والخيانات الأخوية.',
  'بعد اغتيال زوجها سيكايوس على يد أخيها بيغماليون، دبّرت هروبًا مذهلاً، حاملة معها الخزينة الملكية ومجموعة من نبلاء صور، محولة المنفى القسري إلى سعي نحو السيادة.',
] : [
  'Daughter of King Mutto of Tyre, Elissa (Dido) was not merely an heiress, but a visionary in a world dominated by masculine ambitions and fraternal betrayals.',
  'After the assassination of her husband Acerbas by her brother Pygmalion, she orchestrated a spectacular escape, carrying with her the royal treasury and a retinue of Tyrian nobles, transforming a forced exile into a quest for sovereignty.',
])
const portraitQuote = computed(() => isFr.value ? 'Elle ne fuyait pas — elle conquérait un avenir que Tyr ne pouvait plus lui offrir.' : isAr.value ? 'لم تكن تهرب — كانت تغزو مستقبلاً لم تعد صور قادرة على تقديمه لها.' : 'She was not fleeing — she was conquering a future that Tyre could no longer offer her.')
const tagOrigin = computed(() => isFr.value ? 'Tyr — Lieu de naissance' : isAr.value ? 'صور — مكان الولادة' : 'Tyre — Birthplace')
const tagHeritage = computed(() => isFr.value ? 'Phénicie — Héritage culturel' : isAr.value ? 'فينيقيا — التراث الثقافي' : 'Phoenicia — Cultural Heritage')

const byrsaTitle = computed(() => isFr.value ? 'Le Génie de la Négociation' : isAr.value ? 'عبقرية التفاوض' : 'The Genius of Negotiation')
const byrsaQuote = computed(() => isFr.value ? 'Donnez-moi seulement autant de terre qu\'une peau de bœuf peut en couvrir.' : isAr.value ? 'أعطوني فقط من الأرض ما يمكن أن يغطيه جلد ثور.' : 'Give me only as much land as an oxhide can cover.')
const byrsaParagraphs = computed(() => isFr.value ? [
  'Arrivée sur les côtes de l\'actuelle Tunisie, elle ruse face au roi local Iarbas. Elle découpe la peau de bœuf en lanières si fines qu\'elle parvient à encercler toute la colline de Byrsa.',
  'Ce n\'était pas un simple stratagème, mais la fondation symbolique de Carthage, démontrant que l\'intelligence et la diplomatie prévalent sur la force brute.',
] : isAr.value ? [
  'عند وصولها إلى سواحل تونس الحالية، احتالت على الملك المحلي ياربا. قطعت جلد الثور إلى شرائح رفيعة جدًا حتى تمكنت من إحاطة تل بيرصا بأكمله.',
  'لم تكن مجرد حيلة، بل كانت التأسيس الرمزي لقرطاج، مما يُثبت أن الذكاء والدبلوماسية يتفوقان على القوة الغاشمة.',
] : [
  'Arriving on the coast of modern-day Tunisia, she outwitted the local king Iarbas. She cut the oxhide into strips so thin that she managed to encircle the entire hill of Byrsa.',
  'This was not a mere trick, but the symbolic foundation of Carthage, demonstrating that intelligence and diplomacy prevail over brute force.',
])
const byrsaCardTitle = computed(() => isFr.value ? 'La Colline de Byrsa' : isAr.value ? 'تل بيرصا' : 'The Hill of Byrsa')
const byrsaCardText = computed(() => isFr.value ? 'Cœur stratégique de l\'empire carthaginois, la colline de Byrsa devint le symbole de l\'ingéniosité punique.' : isAr.value ? 'القلب الاستراتيجي للإمبراطورية القرطاجية، أصبح تل بيرصا رمزًا للعبقرية البونية.' : 'Strategic heart of the Carthaginian empire, the hill of Byrsa became the symbol of Punic ingenuity.')

const mythTitle = computed(() => isFr.value ? 'Au-delà de la Propagande Romaine' : isAr.value ? 'ما وراء الدعاية الرومانية' : 'Beyond Roman Propaganda')
const mythCard1Title = computed(() => isFr.value ? 'Le Mythe de Virgile' : isAr.value ? 'أسطورة فرجيل' : 'The Myth of Virgil')
const mythCard1Text = computed(() => isFr.value ? 'Dans l\'Énéide, Virgile réduit Didon à une femme éplorée se sacrifiant pour l\'amour d\'Énée. Cette version fut créée pour justifier la supériorité romaine et effacer le souvenir d\'une reine souveraine.' : isAr.value ? 'في الإنيادة، حوّل فرجيل ديدو إلى امرأة حزينة تضحي بنفسها من أجل حب إينياس. صُنعت هذه النسخة لتبرير التفوق الروماني ومحو ذكرى ملكة ذات سيادة.' : 'In the Aeneid, Virgil reduced Dido to a lovesick woman sacrificing herself for the love of Aeneas. This version was created to justify Roman superiority and erase the memory of a sovereign queen.')
const mythCard2Title = computed(() => isFr.value ? 'La Vérité Historique' : isAr.value ? 'الحقيقة التاريخية' : 'The Historical Truth')
const mythCard2Text = computed(() => isFr.value ? 'Élyssa était une Reine Souveraine, une bâtisseuse d\'État. Elle s\'est sacrifiée non pour un homme, mais pour protéger l\'indépendance de sa cité face aux pressions de mariage forcé avec Iarbas. Elle vécut 300 ans avant tout Énée mythique.' : isAr.value ? 'كانت إليسا ملكة ذات سيادة، بانية دولة. ضحت بنفسها ليس من أجل رجل، بل لحماية استقلال مدينتها من ضغوط الزواج القسري مع ياربا. عاشت قبل 300 عام من أي إينياس أسطوري.' : 'Elissa was a Sovereign Queen, a state builder. She sacrificed herself not for a man, but to protect the independence of her city against the pressures of forced marriage with Iarbas. She lived 300 years before any mythical Aeneas.')

const timelineTitle = computed(() => isFr.value ? 'Le Fil du Temps' : isAr.value ? 'خيط الزمن' : 'The Thread of Time')
const timelineEvents = computed(() => isFr.value ? [
  { date: '~ 820 av. J.-C.', title: 'Fuite de Tyr', desc: 'Mort de Sychée assassiné par Pygmalion. Départ clandestin avec le trésor royal et les fidèles tyriens vers l\'Occident.' },
  { date: '~ 814 av. J.-C.', title: 'Fondation de Carthage', desc: 'Négociation de Byrsa avec le roi Iarbas. Établissement de Qart Hadasht — la Ville Nouvelle — sur la colline stratégique.' },
  { date: '~ 810 av. J.-C.', title: 'L\'Ascension Économique', desc: 'Création du comptoir phénicien dominant les routes commerciales du pourpre, de l\'étain et de l\'or en Méditerranée occidentale.' },
] : isAr.value ? [
  { date: '~ 820 ق.م', title: 'الهروب من صور', desc: 'مقتل سيكايوس على يد بيغماليون. رحيل سري مع الخزينة الملكية والأتباع الصوريين نحو الغرب.' },
  { date: '~ 814 ق.م', title: 'تأسيس قرطاج', desc: 'التفاوض على بيرصا مع الملك ياربا. إنشاء قرط حدشت — المدينة الجديدة — على التل الاستراتيجي.' },
  { date: '~ 810 ق.م', title: 'الصعود الاقتصادي', desc: 'إنشاء المركز التجاري الفينيقي المهيمن على طرق تجارة الأرجوان والقصدير والذهب في غرب المتوسط.' },
] : [
  { date: '~ 820 BC', title: 'Flight from Tyre', desc: 'Death of Acerbas, murdered by Pygmalion. Secret departure with the royal treasury and loyal Tyrian nobles toward the West.' },
  { date: '~ 814 BC', title: 'Foundation of Carthage', desc: 'Negotiation of Byrsa with King Iarbas. Establishment of Qart Hadasht — the New City — on the strategic hill.' },
  { date: '~ 810 BC', title: 'Economic Ascension', desc: 'Creation of the Phoenician trading post dominating the trade routes for purple dye, tin, and gold in the western Mediterranean.' },
])

const achievementsTitle = computed(() => isFr.value ? 'Héritage d\'une Fondatrice' : isAr.value ? 'إرث مؤسِّسة' : 'Legacy of a Founder')
const achievements = computed(() => isFr.value ? [
  { icon: '🏛️', title: '700 Ans d\'Empire', desc: 'Carthage devint la thalassocratie dominante de l\'Occident, rivalisant avec Rome pendant sept siècles.' },
  { icon: '👑', title: 'Première Femme Chef d\'État', desc: 'Élyssa a gouverné avec une autorité absolue et une intelligence diplomatique, bien avant les reines hellénistiques.' },
  { icon: '📅', title: '814 av. J.-C.', desc: 'Année de fondation de Carthage, marquant le début d\'une des plus grandes civilisations méditerranéennes.' },
  { icon: '⚓', title: 'Racines Tyriennes', desc: 'L\'héritage phénicien de Tyr — navigation, commerce, alphabet — forma l\'ADN de la culture carthaginoise.' },
] : isAr.value ? [
  { icon: '🏛️', title: '700 عام من الإمبراطورية', desc: 'أصبحت قرطاج القوة البحرية المهيمنة في الغرب، منافسة لروما لمدة سبعة قرون.' },
  { icon: '👑', title: 'أول امرأة رئيسة دولة', desc: 'حكمت إليسا بسلطة مطلقة وذكاء دبلوماسي، قبل الملكات الهلنستيات بوقت طويل.' },
  { icon: '📅', title: '814 ق.م', desc: 'عام تأسيس قرطاج، إيذانًا ببداية إحدى أعظم الحضارات المتوسطية.' },
  { icon: '⚓', title: 'الجذور الصورية', desc: 'التراث الفينيقي من صور — الملاحة والتجارة والأبجدية — شكّل الحمض النووي للثقافة القرطاجية.' },
] : [
  { icon: '🏛️', title: '700 Years of Empire', desc: 'Carthage became the dominant thalassocracy of the West, rivaling Rome for seven centuries.' },
  { icon: '👑', title: 'First Female Head of State', desc: 'Elissa ruled with absolute authority and diplomatic intelligence, long before the Hellenistic queens.' },
  { icon: '📅', title: '814 BC', desc: 'Year of the foundation of Carthage, marking the beginning of one of the greatest Mediterranean civilizations.' },
  { icon: '⚓', title: 'Tyrian Roots', desc: 'The Phoenician heritage of Tyre — navigation, trade, alphabet — formed the DNA of Carthaginian culture.' },
])

const sourcesTitle = computed(() => isFr.value ? 'Sources et Archives' : isAr.value ? 'المصادر والأرشيفات' : 'Sources and Archives')
const citations = computed(() => isFr.value ? [
  { icon: '📜', title: 'Justin, Abrégé des Histoires Philippiques', desc: 'Source principale sur la légende de Didon et la fondation de Carthage.' },
  { icon: '📖', title: 'Virgile, Énéide, Livre IV', desc: 'Version romaine romancée — à lire comme propagande, non comme histoire.' },
  { icon: '🏛️', title: 'Appien d\'Alexandrie, Libyca', desc: 'Perspective grecque sur les origines de la civilisation carthaginoise.' },
] : isAr.value ? [
  { icon: '📜', title: 'يوستينوس، مختصر تواريخ فيليبوس', desc: 'المصدر الرئيسي عن أسطورة ديدو وتأسيس قرطاج.' },
  { icon: '📖', title: 'فرجيل، الإنيادة، الكتاب الرابع', desc: 'النسخة الرومانية الخيالية — تُقرأ كدعاية لا كتاريخ.' },
  { icon: '🏛️', title: 'أبيان الإسكندري، ليبيكا', desc: 'المنظور اليوناني حول أصول الحضارة القرطاجية.' },
] : [
  { icon: '📜', title: 'Justin, Epitome of Philippic Histories', desc: 'Primary source on the legend of Dido and the foundation of Carthage.' },
  { icon: '📖', title: 'Virgil, Aeneid, Book IV', desc: 'Romanticized Roman version — to be read as propaganda, not history.' },
  { icon: '🏛️', title: 'Appian of Alexandria, Libyca', desc: 'Greek perspective on the origins of Carthaginian civilization.' },
])
</script>

<style scoped>
.rtl {
  direction: rtl;
  text-align: right;
}

.hero-section {
  background: linear-gradient(135deg, var(--color-navy) 0%, #1a0a10 50%, var(--color-burgundy) 100%);
  padding: 10rem 0 4rem;
  text-align: center;
}

.hero-tag {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--color-gold-light);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  opacity: 0.85;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 3.2rem;
  color: var(--color-gold);
  letter-spacing: 3px;
  margin-bottom: 1.2rem;
  line-height: 1.2;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.hero-subtitle {
  color: #ccc;
  font-family: var(--font-body);
  font-size: 1.15rem;
  font-style: italic;
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.8;
}

.section { padding: 5rem 0; }
.section-alt { background: var(--color-sand, #f5f0e8); }
.section-dark { background: var(--color-navy); }
.container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

.section-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--color-navy);
  text-align: center;
  margin-bottom: 2.5rem;
  letter-spacing: 2px;
}
.section-title.light { color: var(--color-gold); }

.portrait-grid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 3rem;
  align-items: start;
}

.portrait-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18);
}

.portrait-tags { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1rem; }
.tag { display: inline-block; font-family: var(--font-heading); font-size: 0.7rem; padding: 0.4rem 0.8rem; border-radius: 4px; letter-spacing: 1px; text-transform: uppercase; }
.tag-gold { background: rgba(201, 168, 76, 0.15); color: var(--color-gold); border: 1px solid rgba(201, 168, 76, 0.3); }
.tag-burgundy { background: rgba(107, 29, 42, 0.1); color: var(--color-burgundy); border: 1px solid rgba(107, 29, 42, 0.2); }

.portrait-text p { color: #444; font-family: var(--font-body); font-size: 1.05rem; line-height: 1.9; margin-bottom: 1.5rem; }

.portrait-quote {
  position: relative;
  font-family: var(--font-body);
  font-style: italic;
  font-size: 1.1rem;
  color: var(--color-burgundy);
  padding: 1.5rem 2rem;
  background: rgba(107, 29, 42, 0.05);
  border-left: 4px solid var(--color-gold);
  border-radius: 0 8px 8px 0;
  margin: 0;
  line-height: 1.7;
}
.rtl .portrait-quote { border-left: none; border-right: 4px solid var(--color-gold); border-radius: 8px 0 0 8px; }
.quote-mark { font-family: var(--font-heading); font-size: 3rem; color: var(--color-gold); line-height: 0; position: relative; top: 0.3rem; margin-right: 0.3rem; }

/* Byrsa Section */
.byrsa-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 3rem;
  align-items: start;
}

.byrsa-quote {
  font-family: var(--font-body);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--color-burgundy);
  padding: 1.5rem 2rem;
  background: rgba(107, 29, 42, 0.05);
  border-left: 4px solid var(--color-gold);
  border-radius: 0 8px 8px 0;
  margin: 0 0 2rem;
  line-height: 1.7;
}
.rtl .byrsa-quote { border-left: none; border-right: 4px solid var(--color-gold); }

.byrsa-text p { color: #444; font-family: var(--font-body); font-size: 1.05rem; line-height: 1.9; margin-bottom: 1rem; }

.byrsa-card {
  background: var(--color-navy);
  padding: 2.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(201, 168, 76, 0.2);
}
.byrsa-icon { font-size: 3rem; margin-bottom: 1rem; }
.byrsa-card h3 { font-family: var(--font-heading); font-size: 1.3rem; color: var(--color-gold); margin-bottom: 0.8rem; letter-spacing: 1px; text-transform: uppercase; }
.byrsa-card p { font-family: var(--font-body); font-size: 0.9rem; color: #aaa; line-height: 1.7; }

/* Myth Cards */
.myth-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 2.5rem; }
.myth-card { padding: 2.5rem; border-radius: 12px; color: #fff; }
.myth-card-burgundy { background: linear-gradient(135deg, var(--color-burgundy), #4a0e1a); }
.myth-card-navy { background: linear-gradient(135deg, var(--color-navy), var(--color-navy-light)); }
.myth-card h3 { font-family: var(--font-heading); font-size: 1.2rem; color: var(--color-gold); margin-bottom: 1rem; letter-spacing: 1px; }
.myth-card p { font-family: var(--font-body); font-size: 0.95rem; line-height: 1.8; color: rgba(255, 255, 255, 0.9); }

/* Timeline */
.timeline { position: relative; padding-left: 2rem; }
.rtl .timeline { padding-left: 0; padding-right: 2rem; }
.timeline::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--color-gold), transparent); }
.rtl .timeline::before { left: auto; right: 0; }
.timeline-item { position: relative; margin-bottom: 2.5rem; }
.timeline-dot { position: absolute; left: -2rem; top: 0.3rem; width: 14px; height: 14px; border-radius: 50%; background: var(--color-gold); border: 3px solid var(--color-navy); transform: translateX(-6px); }
.rtl .timeline-dot { left: auto; right: -2rem; transform: translateX(6px); }
.timeline-date { font-family: var(--font-heading); font-size: 0.8rem; color: var(--color-gold); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.3rem; }
.timeline-heading { font-family: var(--font-heading); font-size: 1.1rem; color: var(--color-gold-light); margin-bottom: 0.5rem; }
.timeline-text { font-family: var(--font-body); font-size: 0.9rem; color: #aaa; line-height: 1.7; }

/* Achievements */
.achievements-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.achievement-card { background: #fff; padding: 2rem 1.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06); border-top: 3px solid var(--color-gold); text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease; }
.achievement-card:hover { transform: translateY(-4px); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); }
.achievement-icon { font-size: 2.2rem; margin-bottom: 1rem; }
.achievement-card h3 { font-family: var(--font-heading); font-size: 0.95rem; color: var(--color-navy); margin-bottom: 0.6rem; letter-spacing: 0.5px; }
.achievement-card p { font-family: var(--font-body); font-size: 0.85rem; color: #666; line-height: 1.6; }

/* Citations */
.citations-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.citation-card { display: flex; gap: 1rem; align-items: flex-start; background: var(--color-navy-light); padding: 1.5rem; border-radius: 10px; border: 1px solid rgba(201, 168, 76, 0.15); }
.citation-icon { font-size: 1.5rem; flex-shrink: 0; }
.citation-card h4 { font-family: var(--font-heading); font-size: 0.85rem; color: var(--color-gold); margin-bottom: 0.4rem; letter-spacing: 0.5px; }
.citation-card p { font-family: var(--font-body); font-size: 0.8rem; color: #999; line-height: 1.6; }

@media (max-width: 768px) {
  .hero-title { font-size: 2rem; }
  .portrait-grid { grid-template-columns: 1fr; }
  .byrsa-grid { grid-template-columns: 1fr; }
  .myth-grid { grid-template-columns: 1fr; }
  .achievements-grid { grid-template-columns: repeat(2, 1fr); }
  .citations-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .achievements-grid { grid-template-columns: 1fr; }
  .hero-section { padding: 8rem 0 3rem; }
}
</style>
