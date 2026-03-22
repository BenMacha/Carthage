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

    <!-- Architect of Alliances -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ architectTitle }}</h2>
        <div class="portrait-grid">
          <div class="portrait-image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Giambattista_Pittoni_-_The_Death_of_Sophonisba.jpg/800px-Giambattista_Pittoni_-_The_Death_of_Sophonisba.jpg" :alt="heroTitle" loading="lazy" />
            <div class="portrait-tags">
              <span class="tag tag-gold">{{ tagLineage }}</span>
              <span class="tag tag-burgundy">{{ tagStatus }}</span>
            </div>
          </div>
          <div class="portrait-text">
            <p v-for="(p, i) in architectParagraphs" :key="i">{{ p }}</p>
            <blockquote class="portrait-quote">
              <span class="quote-mark">"</span>
              {{ architectQuote }}
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <!-- Beyond the Roman Myth -->
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
        <div class="quote-bar">
          <p class="quote-bar-text">"{{ mythQuote }}"</p>
          <span class="quote-bar-attr">{{ mythQuoteAttr }}</span>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ timelineTitle }}</h2>
        <div class="timeline-with-image">
          <div class="timeline-image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Sophonisba_receiving_the_Poison%2C_Rembrandt.jpg/800px-Sophonisba_receiving_the_Poison%2C_Rembrandt.jpg" :alt="timelineTitle" loading="lazy" />
          </div>
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
      </div>
    </section>

    <!-- Achievement Icons -->
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

    <!-- Footer / Citations -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ footerTitle }}</h2>
        <div class="citations-grid">
          <div v-for="(c, i) in citations" :key="i" class="citation-card">
            <span class="citation-icon">{{ c.icon }}</span>
            <div>
              <h4>{{ c.title }}</h4>
              <p>{{ c.desc }}</p>
            </div>
          </div>
        </div>
        <div class="archive-links">
          <a v-for="link in archiveLinks" :key="link.label" :href="link.url" target="_blank" rel="noopener noreferrer" class="archive-link">
            {{ link.label }}
          </a>
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
  title: computed(() => isFr.value ? 'Sophonisbe — La Princesse qui Choisit la Mort' : isAr.value ? 'صوفونيسبا — الأميرة التي اختارت الموت' : 'Sophonisba — The Princess Who Chose Death')
})

const heroTag = computed(() => isFr.value ? '— Carthage \u2022 ~235\u2013203 av. J.-C.' : isAr.value ? '— قرطاج \u2022 ~235\u2013203 ق.م' : '— Carthage \u2022 ~235\u2013203 BC')
const heroTitle = computed(() => isFr.value ? 'Sophonisbe — La Princesse qui Choisit la Mort' : isAr.value ? 'صوفونيسبا — الأميرة التي اختارت الموت' : 'Sophonisba — The Princess Who Chose Death')
const heroSubtitle = computed(() => isFr.value ? 'Fille d\'Hasdrubal Gisco, sa vie fut la monnaie ultime de la diplomatie punique, forgée dans les feux de la Deuxième Guerre Punique.' : isAr.value ? 'ابنة حسدربعل جيسكو، كانت حياتها العملة المطلقة للدبلوماسية البونية، صُقلت في نيران الحرب البونية الثانية.' : 'Daughter of Hasdrubal Gisco, her life was the ultimate currency of Punic diplomacy, forged in the fires of the Second Punic War.')

const architectTitle = computed(() => isFr.value ? 'Architecte des Alliances' : isAr.value ? 'مهندسة التحالفات' : 'Architect of Alliances')
const architectParagraphs = computed(() => isFr.value ? [
  'En tant que fille du général carthaginois Hasdrubal Gisco, Sophonisbe n\'était jamais simplement une princesse ; elle était un atout stratégique. Son mariage avec Syphax, roi des Massaesyles numides, n\'était pas une affaire de cœur, mais un coup de maître de la diplomatie punique.',
] : isAr.value ? [
  'بصفتها ابنة القائد القرطاجي حسدربعل جيسكو، لم تكن صوفونيسبا مجرد أميرة؛ بل كانت ورقة استراتيجية. زواجها من سيفاكس، ملك الماسيسيليين النوميديين، لم يكن شأنًا عاطفيًا، بل ضربة دبلوماسية بونية بارعة.',
] : [
  'As the daughter of the Carthaginian general Hasdrubal Gisco, Sophonisba was never merely a princess; she was a strategic asset. Her marriage to Syphax, King of the Massaesylian Numidians, wasn\'t a matter of the heart, but a masterstroke of Punic diplomacy.',
])
const architectQuote = computed(() => isFr.value ? 'Elle possédait une beauté capable de commander des armées et un esprit politique qui terrifiait Rome.' : isAr.value ? 'امتلكت جمالًا يمكنه قيادة الجيوش وعقلًا سياسيًا أرعب روما.' : 'She possessed a beauty that could command armies and a political mind that terrified Rome.')
const tagLineage = computed(() => isFr.value ? 'Lignée : Maison d\'Hasdrubal Gisco' : isAr.value ? 'النسب: بيت حسدربعل جيسكو' : 'Lineage: House of Hasdrubal Gisco')
const tagStatus = computed(() => isFr.value ? 'Statut : Reine consort de Numidie' : isAr.value ? 'المكانة: ملكة نوميديا' : 'Status: Queen Consort of Numidia')

const mythTitle = computed(() => isFr.value ? 'Au-delà du Mythe Romain' : isAr.value ? 'ما وراء الأسطورة الرومانية' : 'Beyond the Roman Myth')
const mythCard1Title = computed(() => isFr.value ? 'L\'Atout Politique' : isAr.value ? 'الورقة السياسية' : 'The Political Asset')
const mythCard1Text = computed(() => isFr.value ? 'Les chroniqueurs romains comme Tite-Live cherchaient à présenter Sophonisbe comme une « séductrice » pour justifier les changements de loyauté numide. La vérité : elle était une diplomate hautement éduquée qui comprenait qu\'une victoire romaine signifiait l\'anéantissement total de la culture punique.' : isAr.value ? 'سعى المؤرخون الرومان مثل ليفيوس إلى تصوير صوفونيسبا كـ"مغوية" لتبرير تحولات الولاء النوميدي. الحقيقة: كانت دبلوماسية متعلمة للغاية فهمت أن انتصار روما يعني الإبادة الكاملة للثقافة البونية.' : 'Roman chroniclers like Livy sought to frame Sophonisba as a \'seductress\' to justify the shifts in Numidian loyalty. The truth: she was a highly educated diplomat who understood that a Roman victory meant the utter annihilation of Punic culture.')
const mythCard2Title = computed(() => isFr.value ? 'Dignité Punique' : isAr.value ? 'الكرامة البونية' : 'Punic Dignity')
const mythCard2Text = computed(() => isFr.value ? 'Elle choisit la coupe de poison plutôt que les chaînes d\'un triomphe romain, préservant l\'honneur de Carthage dans son dernier souffle.' : isAr.value ? 'اختارت كأس السم على قيود موكب النصر الروماني، محافظةً على شرف قرطاج في نفسها الأخير.' : 'She chose the cup of poison over the chains of a Roman triumph, preserving the honor of Carthage in her final breath.')
const mythQuote = computed(() => isFr.value ? 'Une fille de Carthage ne peut pas défiler dans un cortège romain.' : isAr.value ? 'ابنة قرطاج لا تسير في موكب روماني.' : 'A daughter of Carthage cannot walk in a Roman parade.')
const mythQuoteAttr = computed(() => isFr.value ? '— Témoignage historique de son dernier message à Masinissa' : isAr.value ? '— السجل التاريخي لرسالتها الأخيرة إلى ماسينيسا' : '— Historical record of her final message to Masinissa')

const timelineTitle = computed(() => isFr.value ? 'Le Fil du Temps' : isAr.value ? 'خيط الزمن' : 'The Thread of Time')
const timelineEvents = computed(() => isFr.value ? [
  { date: '206 av. J.-C.', title: 'Le Pivot Numide', desc: 'Fiancée à Syphax, garantissant une immense force de cavalerie pour Carthage contre Rome.' },
  { date: '203 av. J.-C.', title: 'La Chute de Cirta', desc: 'Défaite de Syphax par les forces combinées de Scipion et Masinissa. Capturée, Masinissa l\'épouse le jour même.' },
  { date: '203 av. J.-C.', title: 'Le Dernier Choix', desc: 'Scipion exige sa reddition pour le triomphe romain. Masinissa, déchiré, lui envoie la coupe de poison. Elle la boit sans hésiter.' },
] : isAr.value ? [
  { date: '206 ق.م', title: 'المحور النوميدي', desc: 'خُطبت لسيفاكس، مؤمّنةً قوة فرسان هائلة لقرطاج ضد روما.' },
  { date: '203 ق.م', title: 'سقوط سيرتا', desc: 'هزيمة سيفاكس على يد قوات سكيبيو وماسينيسا المشتركة. أُسرت، وتزوجها ماسينيسا في اليوم نفسه.' },
  { date: '203 ق.م', title: 'الاختيار الأخير', desc: 'طالب سكيبيو بتسليمها للموكب الروماني. ماسينيسا، الممزق، أرسل لها كأس السم. شربتها دون تردد.' },
] : [
  { date: '206 BC', title: 'The Numidian Pivot', desc: 'Betrothed to Syphax, securing a massive cavalry force for Carthage against Rome.' },
  { date: '203 BC', title: 'The Fall of Cirta', desc: 'Defeat of Syphax by the combined forces of Scipio and Masinissa. Captured, Masinissa marries her the same day.' },
  { date: '203 BC', title: 'The Final Choice', desc: 'Scipio demands her surrender for the Roman triumph. Masinissa, torn, sends the cup of poison. She drinks it without hesitation.' },
])

const achievementsTitle = computed(() => isFr.value ? 'Héritage et Accomplissements' : isAr.value ? 'الإرث والإنجازات' : 'Legacy and Achievements')
const achievements = computed(() => isFr.value ? [
  { icon: '🤝', title: 'Alliances Sécurisées', desc: 'Influence punique sans précédent sur les royaumes numides grâce à la diplomatie matrimoniale.' },
  { icon: '🧠', title: 'Renseignement Savant', desc: 'A dirigé le renseignement militaire depuis la cour, fournissant des informations stratégiques cruciales.' },
  { icon: '🏛️', title: 'Souveraineté Diplomatique', desc: 'A résisté avec succès aux avances romaines, maintenant la ligne carthaginoise jusqu\'au bout.' },
  { icon: '🔥', title: 'Héritage Inaltéré', desc: 'Symbole de la résistance punique ultime, son choix final incarne la dignité face à la domination.' },
] : isAr.value ? [
  { icon: '🤝', title: 'تأمين التحالفات', desc: 'نفوذ بوني غير مسبوق على الممالك النوميدية من خلال الدبلوماسية الزوجية.' },
  { icon: '🧠', title: 'الاستخبارات العلمية', desc: 'أدارت الاستخبارات العسكرية من البلاط، وقدمت معلومات استراتيجية حاسمة.' },
  { icon: '🏛️', title: 'السيادة الدبلوماسية', desc: 'قاومت بنجاح المحاولات الرومانية، محافظةً على الخط القرطاجي حتى النهاية.' },
  { icon: '🔥', title: 'إرث لا يُكسر', desc: 'رمز المقاومة البونية المطلقة، اختيارها الأخير يجسد الكرامة في مواجهة الهيمنة.' },
] : [
  { icon: '🤝', title: 'Secured Alliances', desc: 'Unprecedented Punic influence over Numidian kingdoms through matrimonial diplomacy.' },
  { icon: '🧠', title: 'Scholarly Intel', desc: 'Directed military intelligence from the court, providing crucial strategic information.' },
  { icon: '🏛️', title: 'Diplomatic Sovereignty', desc: 'Successfully resisted Roman overtures, maintaining the Carthaginian line to the end.' },
  { icon: '🔥', title: 'Unbroken Legacy', desc: 'Symbol of ultimate Punic resistance, her final choice embodies dignity in the face of domination.' },
])

const footerTitle = computed(() => isFr.value ? 'Sources et Archives' : isAr.value ? 'المصادر والأرشيفات' : 'Sources and Archives')
const citations = computed(() => isFr.value ? [
  { icon: '📜', title: 'Tite-Live, Ab Urbe Condita, Livre XXX', desc: 'Récit principal de la vie et de la mort de Sophonisbe dans l\'historiographie romaine.' },
  { icon: '📖', title: 'Appien d\'Alexandrie, Libyca', desc: 'Perspective alternative sur les événements entourant la chute de Cirta et le destin de Sophonisbe.' },
  { icon: '🏛️', title: 'Polybe, Histoires', desc: 'Contexte géopolitique des alliances numides pendant la Deuxième Guerre Punique.' },
] : isAr.value ? [
  { icon: '📜', title: 'ليفيوس، تاريخ روما، الكتاب الثلاثون', desc: 'الرواية الرئيسية لحياة وموت صوفونيسبا في التأريخ الروماني.' },
  { icon: '📖', title: 'أبيان الإسكندري، ليبيكا', desc: 'منظور بديل حول الأحداث المحيطة بسقوط سيرتا ومصير صوفونيسبا.' },
  { icon: '🏛️', title: 'بوليبيوس، التواريخ', desc: 'السياق الجيوسياسي للتحالفات النوميدية خلال الحرب البونية الثانية.' },
] : [
  { icon: '📜', title: 'Livy, Ab Urbe Condita, Book XXX', desc: 'Primary account of Sophonisba\'s life and death in Roman historiography.' },
  { icon: '📖', title: 'Appian of Alexandria, Libyca', desc: 'Alternative perspective on the events surrounding the fall of Cirta and Sophonisba\'s fate.' },
  { icon: '🏛️', title: 'Polybius, Histories', desc: 'Geopolitical context of Numidian alliances during the Second Punic War.' },
])

const archiveLinks = computed(() => isFr.value ? [
  { label: 'Consulter les textes antiques', url: 'https://www.perseus.tufts.edu' },
  { label: 'Archives numériques de Carthage', url: 'https://www.worldhistory.org/carthage/' },
  { label: 'Musée National de Carthage', url: 'https://inp.rnrt.tn' },
] : isAr.value ? [
  { label: 'الاطلاع على النصوص القديمة', url: 'https://www.perseus.tufts.edu' },
  { label: 'أرشيفات قرطاج الرقمية', url: 'https://www.worldhistory.org/carthage/' },
  { label: 'المتحف الوطني بقرطاج', url: 'https://inp.rnrt.tn' },
] : [
  { label: 'Consult Ancient Texts', url: 'https://www.perseus.tufts.edu' },
  { label: 'Carthage Digital Archives', url: 'https://www.worldhistory.org/carthage/' },
  { label: 'National Museum of Carthage', url: 'https://inp.rnrt.tn' },
])
</script>

<style scoped>
.rtl {
  direction: rtl;
  text-align: right;
}

/* Hero */
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

/* Portrait Grid */
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

.portrait-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
}

.tag {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.tag-gold {
  background: rgba(201, 168, 76, 0.15);
  color: var(--color-gold);
  border: 1px solid rgba(201, 168, 76, 0.3);
}

.tag-burgundy {
  background: rgba(107, 29, 42, 0.1);
  color: var(--color-burgundy);
  border: 1px solid rgba(107, 29, 42, 0.2);
}

.portrait-text p {
  color: #444;
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.9;
  margin-bottom: 1.5rem;
}

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

.rtl .portrait-quote {
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

/* Myth Cards */
.myth-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.myth-card {
  padding: 2.5rem;
  border-radius: 12px;
  color: #fff;
}

.myth-card-burgundy {
  background: linear-gradient(135deg, var(--color-burgundy), #4a0e1a);
}

.myth-card-navy {
  background: linear-gradient(135deg, var(--color-navy), var(--color-navy-light));
}

.myth-card h3 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  color: var(--color-gold);
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.myth-card p {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
}

.quote-bar {
  background: var(--color-navy);
  padding: 2rem 2.5rem;
  border-radius: 12px;
  border-left: 4px solid var(--color-gold);
  text-align: center;
}

.rtl .quote-bar {
  border-left: none;
  border-right: 4px solid var(--color-gold);
}

.quote-bar-text {
  font-family: var(--font-body);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--color-gold-light);
  margin-bottom: 0.8rem;
  line-height: 1.7;
}

.quote-bar-attr {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: rgba(201, 168, 76, 0.6);
  letter-spacing: 1px;
}

/* Timeline */
.timeline-with-image {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 3rem;
  align-items: start;
}

.timeline-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.rtl .timeline {
  padding-left: 0;
  padding-right: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--color-gold), transparent);
}

.rtl .timeline::before {
  left: auto;
  right: 0;
}

.timeline-item {
  position: relative;
  margin-bottom: 2.5rem;
}

.timeline-dot {
  position: absolute;
  left: -2rem;
  top: 0.3rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-gold);
  border: 3px solid var(--color-navy);
  transform: translateX(-6px);
}

.rtl .timeline-dot {
  left: auto;
  right: -2rem;
  transform: translateX(6px);
}

.timeline-date {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--color-gold);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.3rem;
}

.timeline-heading {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--color-gold-light);
  margin-bottom: 0.5rem;
}

.timeline-text {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: #aaa;
  line-height: 1.7;
}

/* Achievements */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.achievement-card {
  background: #fff;
  padding: 2rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  border-top: 3px solid var(--color-gold);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.achievement-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.achievement-icon {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

.achievement-card h3 {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  color: var(--color-navy);
  margin-bottom: 0.6rem;
  letter-spacing: 0.5px;
}

.achievement-card p {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: #666;
  line-height: 1.6;
}

/* Citations */
.citations-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.citation-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: var(--color-navy-light);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(201, 168, 76, 0.15);
}

.citation-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.citation-card h4 {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--color-gold);
  margin-bottom: 0.4rem;
  letter-spacing: 0.5px;
}

.citation-card p {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: #999;
  line-height: 1.6;
}

.archive-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.archive-link {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--color-gold);
  text-decoration: none;
  padding: 0.6rem 1.5rem;
  border: 1px solid rgba(201, 168, 76, 0.3);
  border-radius: 6px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.archive-link:hover {
  background: rgba(201, 168, 76, 0.1);
  border-color: var(--color-gold);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .portrait-grid {
    grid-template-columns: 1fr;
  }

  .myth-grid {
    grid-template-columns: 1fr;
  }

  .timeline-with-image {
    grid-template-columns: 1fr;
  }

  .timeline-image {
    display: none;
  }

  .achievements-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .citations-grid {
    grid-template-columns: 1fr;
  }

  .archive-links {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .achievements-grid {
    grid-template-columns: 1fr;
  }

  .hero-section {
    padding: 8rem 0 3rem;
  }
}
</style>
