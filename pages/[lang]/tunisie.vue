<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--purple tile--stack tile--hero s-5 hero">
        <div class="watermark ar" aria-hidden="true">قرطاج</div>
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div class="hero-text">
          <h1 class="h-display">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-7" style="background:#1D3F66">
        <img src="/img/byrsa.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Un nom, quatre langues -->
    <section class="sec sec--wide">
      <h2 class="h-section sec-title">{{ c.names.title }}</h2>
    </section>
    <div class="cols cols-4 keep-2 names">
      <div v-for="n in c.names.items" :key="n.name" class="tile tile--stack name" :class="n.cls">
        <span class="glyph" :class="n.glyphCls" :style="n.glyphStyle" :dir="n.glyphDir">{{ n.glyph }}</span>
        <div>
          <div class="h-card">{{ n.name }}</div>
          <p class="body">{{ n.text }}</p>
        </div>
      </div>
    </div>

    <!-- L'Afrique est née en Tunisie -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--gold">
          <span class="kicker">{{ c.africa.kicker }}</span>
          <h2 class="h-section africa-title">{{ c.africa.title }}</h2>
          <div class="rows" style="--row-key:150px">
            <div v-for="r in c.africa.rows" :key="r.key">
              <span class="key">{{ r.key }}</span>
              <span class="val" v-html="r.val" />
            </div>
          </div>
          <p class="note" v-html="c.africa.note" />
          <NuxtLink :to="localePath('/afrique')" class="btn btn-outline more">{{ c.africa.more }} →</NuxtLink>
        </div>
        <figure class="fig africa-fig" style="background:#8E3720">
          <img src="/img/kairouan.jpg" :alt="c.africa.alt" loading="lazy">
          <figcaption class="cap-box" v-html="c.africa.caption" />
        </figure>
      </div>
    </section>

    <!-- Le nom Carthage aujourd'hui -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.today.title }}</h2>
        <p>{{ c.today.aside }}</p>
      </div>
    </section>
    <div class="cols cols-4">
      <div v-for="it in c.today.items" :key="it.name" class="tile tile--stack today" :class="it.cls">
        <span class="kicker">{{ it.kicker }}</span>
        <div>
          <div v-if="it.big" class="num big">{{ it.name }}</div>
          <div v-else class="h-card">{{ it.name }}</div>
          <p class="body small">{{ it.text }}</p>
        </div>
      </div>
    </div>

    <!-- Continuité -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <h2 class="h-section cont-title">{{ c.cont.title }}</h2>
        <div class="cols cols-5 cols--flush">
          <div v-for="(p, i) in c.cont.items" :key="p.name" class="era" :style="{ borderTopColor: eraColors[i] }">
            <div class="era-name">{{ p.name }}</div>
            <div class="era-sub">{{ p.sub }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const eraColors = ['#E7B75A', '#A89E91', '#A89E91', '#A89E91', '#B8492A']

const names = (t) => [
  { cls: 'tile--ink', glyph: '𐤒𐤓𐤕𐤇𐤃𐤔𐤕', glyphCls: 'phoen', glyphDir: 'rtl', glyphStyle: { color: '#E7B75A', fontSize: 'clamp(26px,3vw,44px)' }, name: 'Qart-Ḥadasht', text: t[0] },
  { cls: '', glyph: 'Καρχηδών', glyphCls: 'serif', glyphStyle: { color: '#6E1E47' }, name: 'Karchēdṓn', text: t[1] },
  { cls: '', glyph: 'CARTHAGO', glyphCls: 'serif', glyphStyle: { color: '#6E1E47', letterSpacing: '.06em' }, name: 'Carthago', text: t[2] },
  { cls: 'tile--terra', glyph: 'قرطاج', glyphCls: 'ar', glyphDir: 'rtl', glyphStyle: { fontWeight: 700, fontSize: 'clamp(30px,3.4vw,48px)' }, name: 'Qarṭāj', text: t[3] }
]

const today = (t) => [
  { cls: '', ...t[0] },
  { cls: '', ...t[1] },
  { cls: '', ...t[2] },
  { cls: '', ...t[3] },
  { cls: 'tile--navy', ...t[4] },
  { cls: '', ...t[5] },
  { cls: '', ...t[6] },
  { cls: 'tile--purple', big: true, ...t[7] }
]

const C = {
  fr: {
    meta: { title: 'Carthage vit en Tunisie', desc: "La cité d'Élissa et d'Hannibal a donné à la Tunisie son premier grand État, et au monde le nom même de l'Afrique." },
    hero: {
      chip: "Tunisie · 3 000 ans d'histoire",
      title: 'Carthage vit en Tunisie',
      lede: "La cité d'Élissa et d'Hannibal a donné à la Tunisie son premier grand État, et au monde le nom même de l'Afrique.",
      alt: 'Colline de Byrsa, Carthage',
      caption: 'Colline de Byrsa et golfe de Tunis — site UNESCO depuis 1979'
    },
    names: {
      title: 'Un nom, quatre langues',
      items: names([
        "Phénicien-punique : « Ville nouvelle ». C'est le nom d'origine, vers 814 av. J.-C.",
        'Le nom grec, utilisé par Polybe et les auteurs hellénistiques.',
        "Le latin, d'où viennent Carthage, Carthagène et Cartagena.",
        "L'arabe : aujourd'hui une commune de la banlieue nord de Tunis."
      ])
    },
    africa: {
      kicker: "D'où vient le mot « Afrique » ?",
      title: "L'Afrique est née en Tunisie",
      rows: [
        { key: 'Les Afri', val: 'Les Romains appelaient <i>Afri</i> les habitants de la région de Carthage.' },
        { key: '146 av. J.-C.', val: "Après la chute de Carthage, Rome crée la province d'<b>Africa</b>, qui correspond au nord-est de l'actuelle Tunisie." },
        { key: 'VIIe s.', val: 'Le nom devient <b class="ar">إفريقية</b> <b>Ifriqiya</b>, avec Kairouan pour capitale : la Tunisie et ses marges.' },
        { key: "Aujourd'hui", val: "Le nom d'une région tunisienne désigne tout un continent de 54 pays." }
      ],
      note: "L'origine du mot <i>Afri</i> reste discutée : on a proposé le berbère <i>ifri</i> (« grotte »), le phénicien <i>ʿafar</i> (« poussière ») ou un nom de tribu.",
      more: "L'Afrique et son nom",
      alt: 'Grande Mosquée de Kairouan',
      caption: "<b>Kairouan</b>, capitale de l'Ifriqiya — la Grande Mosquée (VIIe–IXe s.)"
    },
    today: {
      title: "Le nom Carthage aujourd'hui",
      aside: 'Vingt-deux siècles après 146 av. J.-C., le nom reste le symbole de la Tunisie.',
      items: today([
        { kicker: 'État', name: 'Palais de Carthage', text: 'Siège de la présidence de la République tunisienne.' },
        { kicker: 'Voyage', name: 'Aéroport Tunis-Carthage', text: "La principale porte d'entrée du pays." },
        { kicker: 'Cinéma · depuis 1966', name: 'Journées cinématographiques de Carthage', text: "Le plus ancien festival de cinéma d'Afrique et du monde arabe." },
        { kicker: 'Musique · depuis 1964', name: 'Festival international de Carthage', text: 'Chaque été, dans le théâtre antique de Carthage.' },
        { kicker: 'Sport', name: 'Les Aigles de Carthage', text: "Le surnom de l'équipe nationale de football." },
        { kicker: 'Savoir', name: 'Université de Carthage', text: "L'une des grandes universités publiques du pays." },
        { kicker: 'Scène', name: 'Journées théâtrales de Carthage', text: 'Le grand rendez-vous du théâtre arabe et africain.' },
        { kicker: 'Patrimoine', name: '9', text: "sites tunisiens inscrits à l'UNESCO, dont Carthage, Kerkouane, Dougga et Kairouan." }
      ])
    },
    cont: {
      title: 'Une continuité tunisienne',
      items: [
        { name: 'Carthage punique', sub: '814 – 146 av. J.-C.' },
        { name: 'Africa romaine', sub: "Carthage refondée, deuxième ville d'Occident" },
        { name: 'Ifriqiya', sub: 'Kairouan, Mahdia, Tunis' },
        { name: 'Tunis', sub: 'Hafsides, beylicat' },
        { name: 'Tunisie', sub: 'Indépendance en 1956 — Carthage comme emblème' }
      ]
    }
  },
  en: {
    meta: { title: 'Carthage lives in Tunisia', desc: "The city of Elissa and Hannibal gave Tunisia its first great state, and gave the world the very name of Africa." },
    hero: {
      chip: 'Tunisia · 3,000 years of history',
      title: 'Carthage lives in Tunisia',
      lede: 'The city of Elissa and Hannibal gave Tunisia its first great state, and gave the world the very name of Africa.',
      alt: 'Byrsa Hill, Carthage',
      caption: 'Byrsa Hill and the Gulf of Tunis — UNESCO site since 1979'
    },
    names: {
      title: 'One name, four languages',
      items: names([
        'Phoenician-Punic: "New City". The original name, around 814 BC.',
        'The Greek name, used by Polybius and the Hellenistic authors.',
        'The Latin, source of Carthage, Carthagena and Cartagena.',
        'Arabic: today a municipality in the northern suburbs of Tunis.'
      ])
    },
    africa: {
      kicker: 'Where does the word "Africa" come from?',
      title: 'Africa was born in Tunisia',
      rows: [
        { key: 'The Afri', val: 'The Romans called the people of the Carthage region <i>Afri</i>.' },
        { key: '146 BC', val: 'After the fall of Carthage, Rome created the province of <b>Africa</b>, covering the north-east of present-day Tunisia.' },
        { key: '7th c.', val: 'The name becomes <b class="ar">إفريقية</b> <b>Ifriqiya</b>, with Kairouan as its capital: Tunisia and its borderlands.' },
        { key: 'Today', val: 'The name of a Tunisian region now designates an entire continent of 54 countries.' }
      ],
      note: 'The origin of the word <i>Afri</i> is still debated: suggestions include the Berber <i>ifri</i> ("cave"), the Phoenician <i>ʿafar</i> ("dust") or the name of a tribe.',
      more: 'Africa and its name',
      alt: 'Great Mosque of Kairouan',
      caption: '<b>Kairouan</b>, capital of Ifriqiya — the Great Mosque (7th–9th c.)'
    },
    today: {
      title: 'The name Carthage today',
      aside: 'Twenty-two centuries after 146 BC, the name remains the symbol of Tunisia.',
      items: today([
        { kicker: 'State', name: 'Carthage Palace', text: 'Seat of the presidency of the Tunisian Republic.' },
        { kicker: 'Travel', name: 'Tunis–Carthage Airport', text: "The country's main gateway." },
        { kicker: 'Cinema · since 1966', name: 'Carthage Film Festival', text: 'The oldest film festival in Africa and the Arab world.' },
        { kicker: 'Music · since 1964', name: 'Carthage International Festival', text: 'Every summer, in the ancient theatre of Carthage.' },
        { kicker: 'Sport', name: 'The Eagles of Carthage', text: "The nickname of the national football team." },
        { kicker: 'Learning', name: 'University of Carthage', text: "One of the country's major public universities." },
        { kicker: 'Stage', name: 'Carthage Theatre Days', text: 'The great meeting place of Arab and African theatre.' },
        { kicker: 'Heritage', name: '9', text: 'Tunisian sites on the UNESCO list, including Carthage, Kerkouane, Dougga and Kairouan.' }
      ])
    },
    cont: {
      title: 'A Tunisian continuity',
      items: [
        { name: 'Punic Carthage', sub: '814 – 146 BC' },
        { name: 'Roman Africa', sub: 'Carthage refounded, second city of the West' },
        { name: 'Ifriqiya', sub: 'Kairouan, Mahdia, Tunis' },
        { name: 'Tunis', sub: 'Hafsids, the beylik' },
        { name: 'Tunisia', sub: 'Independence in 1956 — Carthage as an emblem' }
      ]
    }
  },
  ar: {
    meta: { title: 'قرطاج تحيا في تونس', desc: 'منحت مدينة عليسة وحنبعل تونسَ أولى دولها الكبرى، ومنحت العالم اسم إفريقيا نفسه.' },
    hero: {
      chip: 'تونس · 3000 سنة من التاريخ',
      title: 'قرطاج تحيا في تونس',
      lede: 'منحت مدينة عليسة وحنبعل تونسَ أولى دولها الكبرى، ومنحت العالم اسم إفريقيا نفسه.',
      alt: 'هضبة بيرصا، قرطاج',
      caption: 'هضبة بيرصا وخليج تونس — موقع مسجّل لدى اليونسكو منذ 1979'
    },
    names: {
      title: 'اسم واحد بأربع لغات',
      items: names([
        'الفينيقية البونية: «المدينة الجديدة». هو الاسم الأصلي، نحو سنة 814 ق.م.',
        'الاسم الإغريقي، استعمله بوليبيوس والمؤلفون الهلنستيون.',
        'اللاتينية، ومنها جاءت أسماء Carthage وقرطاجنة وCartagena.',
        'العربية: اليوم بلدية في الضاحية الشمالية لتونس العاصمة.'
      ])
    },
    africa: {
      kicker: 'من أين جاءت كلمة «إفريقيا»؟',
      title: 'إفريقيا وُلدت في تونس',
      rows: [
        { key: 'الأفري', val: 'كان الرومان يسمّون سكان منطقة قرطاج <i>Afri</i>.' },
        { key: '146 ق.م', val: 'بعد سقوط قرطاج أنشأت روما ولاية <b>إفريقية</b> (Africa)، وهي تقابل شمال شرق تونس الحالية.' },
        { key: 'القرن 7', val: 'يصبح الاسم <b class="ar">إفريقية</b>، وعاصمتها القيروان: تونس وأطرافها.' },
        { key: 'اليوم', val: 'اسم منطقة تونسية صار يدلّ على قارة كاملة تضم 54 دولة.' }
      ],
      note: 'يبقى أصل كلمة <i>Afri</i> محلّ نقاش: اقتُرح الأمازيغي <i>ifri</i> («المغارة»)، أو الفينيقي <i>ʿafar</i> («الغبار»)، أو اسم قبيلة.',
      more: 'إفريقيا واسمها',
      alt: 'جامع القيروان الكبير',
      caption: '<b>القيروان</b>، عاصمة إفريقية — الجامع الكبير (القرن 7–9)'
    },
    today: {
      title: 'اسم قرطاج اليوم',
      aside: 'بعد اثنين وعشرين قرنًا من سنة 146 ق.م، ما يزال الاسم رمزًا لتونس.',
      items: today([
        { kicker: 'الدولة', name: 'قصر قرطاج', text: 'مقرّ رئاسة الجمهورية التونسية.' },
        { kicker: 'السفر', name: 'مطار تونس قرطاج', text: 'البوابة الرئيسية للبلاد.' },
        { kicker: 'السينما · منذ 1966', name: 'أيام قرطاج السينمائية', text: 'أقدم مهرجان سينمائي في إفريقيا والعالم العربي.' },
        { kicker: 'الموسيقى · منذ 1964', name: 'مهرجان قرطاج الدولي', text: 'كل صيف، في المسرح الأثري بقرطاج.' },
        { kicker: 'الرياضة', name: 'نسور قرطاج', text: 'لقب المنتخب الوطني لكرة القدم.' },
        { kicker: 'المعرفة', name: 'جامعة قرطاج', text: 'إحدى كبرى الجامعات العمومية في البلاد.' },
        { kicker: 'المسرح', name: 'أيام قرطاج المسرحية', text: 'الموعد الكبير للمسرح العربي والإفريقي.' },
        { kicker: 'التراث', name: '9', text: 'مواقع تونسية مسجّلة لدى اليونسكو، منها قرطاج وكركوان ودقّة والقيروان.' }
      ])
    },
    cont: {
      title: 'استمرارية تونسية',
      items: [
        { name: 'قرطاج البونية', sub: '814 – 146 ق.م' },
        { name: 'إفريقية الرومانية', sub: 'قرطاج المعاد تأسيسها، ثانية مدن الغرب' },
        { name: 'إفريقية', sub: 'القيروان، المهدية، تونس' },
        { name: 'تونس', sub: 'الحفصيون، البايات' },
        { name: 'الجمهورية التونسية', sub: 'الاستقلال سنة 1956 — قرطاج شعارًا' }
      ]
    }
  }
}

const c = computed(() => C[locale.value] || C.fr)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-text { position: relative; }

.watermark {
  position: absolute;
  inset-inline-end: -20px;
  top: 40px;
  font: 700 clamp(140px, 18vw, 260px)/1 var(--font-ar);
  color: rgba(255, 255, 255, 0.07);
  pointer-events: none;
  white-space: nowrap;
}

.sec-title { margin-bottom: clamp(20px, 2.4vw, 32px); }

.name { min-height: 240px; }
.glyph { font-size: clamp(28px, 2.8vw, 40px); line-height: 1; }
.glyph.serif { font-family: Georgia, serif; font-weight: 500; }

.africa-title { margin-bottom: 28px; }
.rows .val :deep(b.ar) { font-family: var(--font-ar); }
.note { margin-top: 22px; font: 500 13px/1.5 var(--font-body); }
.more { margin-top: 22px; }
.africa-fig { min-height: 560px; }

.today { min-height: 200px; }
.today .h-card { font-size: clamp(20px, 1.7vw, 24px); }
.small { font-size: 14px; line-height: 1.5; }
.big { font-size: 44px; margin-bottom: 6px; }

.cont-title { margin-bottom: 32px; }
.era { border-top: 3px solid; padding-top: 18px; }
.era-name { font: 900 22px/1 var(--font-display); margin-bottom: 8px; }
.era-sub { font: 500 13px/1.45 var(--font-body); color: var(--on-dark); }

@media (max-width: 960px) {
  .africa-fig { min-height: 380px; }
}

@media (max-width: 640px) {
  .fig--hero { min-height: 240px; }
  .name { min-height: 0; padding: 18px; gap: 14px; }
  .name .h-card { font-size: 16px; }
  .name .body { font-size: 13px; }
  .today { min-height: 0; }
  .africa-fig { min-height: 300px; }
}
</style>
