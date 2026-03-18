<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="hero-icon">⚔️</div>
        <h1 class="page-hero-title">{{ title }}</h1>
        <p class="page-hero-subtitle">{{ subtitle }}</p>
      </div>
    </section>

    <!-- Portrait & Intro -->
    <section class="section">
      <div class="container">
        <div class="portrait-grid">
          <div class="portrait-image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Mommsen_p265.jpg/440px-Mommsen_p265.jpg" alt="Hannibal Barca" loading="lazy" />
            <span class="img-caption">{{ bustCaption }}</span>
          </div>
          <div class="portrait-text">
            <h2>{{ introTitle }}</h2>
            <p v-for="p in introParagraphs" :key="p">{{ p }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Life Timeline -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ lifeTitle }}</h2>
        <div class="timeline">
          <div v-for="(e, i) in lifeEvents" :key="i" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-date">{{ e.date }}</div>
              <h3 class="timeline-title">{{ e.title }}</h3>
              <p class="timeline-text">{{ e.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Military Genius -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ geniusTitle }}</h2>
        <p class="section-subtitle">{{ geniusSubtitle }}</p>
        <div class="genius-grid">
          <div v-for="g in geniusCards" :key="g.title" class="genius-card">
            <div class="genius-icon">{{ g.icon }}</div>
            <h3>{{ g.title }}</h3>
            <p>{{ g.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Battle Tactics -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ tacticsTitle }}</h2>
        <TacticsBattleTactics :lang="locale" />
      </div>
    </section>

    <!-- Route Map -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ mapTitle }}</h2>
        <ClientOnly>
          <MapsCarthageMap :lang="locale" />
        </ClientOnly>
      </div>
    </section>

    <!-- Paintings -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ paintingsTitle }}</h2>
        <div class="gallery-grid">
          <div class="gallery-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Heinrich_Leutemann_-_Hannibal%27s_Campaign_in_Italy_-_Crossing_the_Alps.jpg/800px-Heinrich_Leutemann_-_Hannibal%27s_Campaign_in_Italy_-_Crossing_the_Alps.jpg" alt="Leutemann" loading="lazy" />
            <p>{{ imgCaptions[0] }}</p>
          </div>
          <div class="gallery-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Francisco_de_Goya_y_Lucientes_-_Hannibal_the_Conqueror_Viewing_Italy_from_the_Alps.jpg/800px-Francisco_de_Goya_y_Lucientes_-_Hannibal_the_Conqueror_Viewing_Italy_from_the_Alps.jpg" alt="Goya" loading="lazy" />
            <p>{{ imgCaptions[1] }}</p>
          </div>
          <div class="gallery-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Hannibal_Slodtz_Louvre_MR2093.jpg/440px-Hannibal_Slodtz_Louvre_MR2093.jpg" alt="Slodtz" loading="lazy" />
            <p>{{ imgCaptions[2] }}</p>
          </div>
          <div class="gallery-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Hannibal_traverse_les_Alpes_Nicolas_Poussin.jpg/800px-Hannibal_traverse_les_Alpes_Nicolas_Poussin.jpg" alt="Poussin" loading="lazy" />
            <p>{{ imgCaptions[3] }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Legacy -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ legacyTitle }}</h2>
        <div class="legacy-grid">
          <div v-for="l in legacyItems" :key="l.title" class="legacy-card">
            <h3>{{ l.icon }} {{ l.title }}</h3>
            <p>{{ l.desc }}</p>
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

const title = computed(() => isFr.value ? 'Hannibal Barca' : isAr.value ? 'حنبعل برقا' : 'Hannibal Barca')
const subtitle = computed(() => isFr.value ? '247–183 av. J.-C. — Le plus grand stratège de l\'Antiquité' : isAr.value ? '247–183 ق.م — أعظم استراتيجي في العصور القديمة' : '247–183 BC — The greatest strategist of antiquity')
const bustCaption = computed(() => isFr.value ? 'Buste présumé d\'Hannibal — Musée de Naples' : isAr.value ? 'تمثال نصفي مفترض لحنبعل — متحف نابولي' : 'Presumed bust of Hannibal — Museum of Naples')
const introTitle = computed(() => isFr.value ? 'L\'ennemi juré de Rome' : isAr.value ? 'العدو اللدود لروما' : 'Rome\'s sworn enemy')
const introParagraphs = computed(() => isFr.value ? [
  'Hannibal Barca (en phénicien : « Grâce de Baal ») est né à Carthage en 247 av. J.-C. Fils du grand général Hamilcar Barca, il grandit dans les camps militaires d\'Espagne où il reçut une éducation à la fois guerrière et intellectuelle. Il parlait le punique, le grec, le latin, l\'ibère et le gaulois.',
  'À 9 ans, son père lui fit jurer sur l\'autel de Baal une haine éternelle envers Rome. Ce serment guida toute sa vie. À 26 ans, il prit le commandement des forces carthaginoises en Espagne et entreprit l\'une des campagnes militaires les plus audacieuses de l\'histoire.',
  'Considéré comme l\'un des plus grands génies militaires de tous les temps — aux côtés d\'Alexandre le Grand et Jules César — Hannibal est étudié dans toutes les académies militaires du monde. Son double enveloppement à Cannes reste le modèle de référence en tactique.',
] : isAr.value ? [
  'حنبعل برقا (بالفينيقية: «نعمة بعل») وُلد في قرطاج عام 247 ق.م. ابن القائد العظيم حملقار برقا، نشأ في المعسكرات العسكرية في إسبانيا حيث تلقى تعليماً حربياً وفكرياً. تحدث البونية واليونانية واللاتينية والإيبيرية والغالية.',
  'في سن التاسعة، جعله والده يقسم على مذبح بعل بالكراهية الأبدية لروما. هذا القسم وجّه حياته كلها. في سن 26، تولى قيادة القوات القرطاجية في إسبانيا.',
  'يُعتبر أحد أعظم العباقرة العسكريين في كل العصور. تطويقه المزدوج في كاناي لا يزال المرجع في التكتيك.',
] : [
  'Hannibal Barca (Phoenician: "Grace of Baal") was born in Carthage in 247 BC. Son of the great general Hamilcar Barca, he grew up in the military camps of Spain where he received both warrior\'s and scholar\'s education. He spoke Punic, Greek, Latin, Iberian and Gallic.',
  'At 9, his father made him swear on the altar of Baal eternal hatred of Rome. This oath guided his entire life. At 26, he took command of Carthaginian forces in Spain.',
  'Considered one of the greatest military geniuses of all time, Hannibal is studied in every military academy in the world. His double envelopment at Cannae remains the reference model in tactics.',
])
const lifeTitle = computed(() => isFr.value ? 'Les grandes dates de sa vie' : isAr.value ? 'التواريخ الكبرى في حياته' : 'Key dates of his life')
const lifeEvents = computed(() => isFr.value ? [
  { date: '247 av. J.-C.', title: 'Naissance à Carthage', desc: 'Fils d\'Hamilcar Barca et d\'une mère inconnue.' },
  { date: '237 av. J.-C.', title: 'Départ pour l\'Espagne', desc: 'À 9 ans, il accompagne son père et jure haine à Rome.' },
  { date: '221 av. J.-C.', title: 'Commandement en chef', desc: 'Acclamé par l\'armée à 26 ans après la mort d\'Hasdrubal le Beau.' },
  { date: '219 av. J.-C.', title: 'Siège de Sagonte', desc: 'Déclenchement de la Deuxième Guerre Punique.' },
  { date: '218 av. J.-C.', title: 'Traversée des Alpes', desc: '37 éléphants, 50 000 fantassins, 9 000 cavaliers. 15 jours dans les Alpes.' },
  { date: '216 av. J.-C.', title: 'Bataille de Cannes', desc: 'Double enveloppement parfait. 50 000–70 000 Romains tués.' },
  { date: '203 av. J.-C.', title: 'Rappel en Afrique', desc: 'Rappelé pour défendre Carthage contre Scipion.' },
  { date: '202 av. J.-C.', title: 'Défaite à Zama', desc: 'Seule grande défaite de sa carrière.' },
  { date: '195 av. J.-C.', title: 'Exil', desc: 'Fuit Carthage sous pression romaine. Conseiller militaire en Orient.' },
  { date: '183 av. J.-C.', title: 'Mort en Bithynie', desc: 'Préfère le poison à la capture romaine. « Il est temps de mettre fin à l\'angoisse des Romains. »' },
] : isAr.value ? [
  { date: '247 ق.م', title: 'الولادة في قرطاج', desc: 'ابن حملقار برقا.' },
  { date: '237 ق.م', title: 'المغادرة إلى إسبانيا', desc: 'في سن 9، يرافق والده ويقسم بكراهية روما.' },
  { date: '221 ق.م', title: 'القيادة العليا', desc: 'يُعلن قائداً في سن 26.' },
  { date: '218 ق.م', title: 'عبور الألب', desc: '37 فيلاً، 50,000 مشاة. 15 يوماً في الألب.' },
  { date: '216 ق.م', title: 'معركة كاناي', desc: 'التطويق المزدوج المثالي. 50,000–70,000 روماني قُتلوا.' },
  { date: '202 ق.م', title: 'هزيمة زاما', desc: 'الهزيمة الكبرى الوحيدة.' },
  { date: '183 ق.م', title: 'الوفاة في بيثينيا', desc: 'يفضل السم على الأسر الروماني.' },
] : [
  { date: '247 BC', title: 'Born in Carthage', desc: 'Son of Hamilcar Barca.' },
  { date: '237 BC', title: 'Departs for Spain', desc: 'At 9, accompanies his father and swears hatred of Rome.' },
  { date: '221 BC', title: 'Commander-in-chief', desc: 'Acclaimed by the army at 26.' },
  { date: '218 BC', title: 'Crossing the Alps', desc: '37 elephants, 50,000 infantry. 15 days in the Alps.' },
  { date: '216 BC', title: 'Battle of Cannae', desc: 'Perfect double envelopment. 50,000–70,000 Romans killed.' },
  { date: '202 BC', title: 'Defeat at Zama', desc: 'His only major defeat.' },
  { date: '183 BC', title: 'Death in Bithynia', desc: 'Chooses poison over Roman capture.' },
])
const geniusTitle = computed(() => isFr.value ? 'Le génie militaire' : isAr.value ? 'العبقرية العسكرية' : 'Military genius')
const geniusSubtitle = computed(() => isFr.value ? 'Ce qui faisait d\'Hannibal un commandant unique' : isAr.value ? 'ما جعل حنبعل قائداً فريداً' : 'What made Hannibal a unique commander')
const geniusCards = computed(() => isFr.value ? [
  { icon: '🧠', title: 'Ruse et déception', desc: 'Maître de la guerre psychologique. Il utilisait des bœufs enflammés, de fausses retraites et des embuscades pour tromper l\'ennemi.' },
  { icon: '🗺️', title: 'Connaissance du terrain', desc: 'Il choisissait toujours le champ de bataille. Trasimène, Cannes — chaque victoire reposait sur l\'exploitation du terrain.' },
  { icon: '🤝', title: 'Leadership multiculturel', desc: 'Il commandait une armée de Libyens, Numides, Gaulois, Espagnols et Grecs. Chacun combattait avec ses forces propres.' },
  { icon: '⚡', title: 'Vitesse et surprise', desc: 'La traversée des Alpes, les marches forcées, l\'apparition là où on ne l\'attendait pas. La surprise était sa meilleure arme.' },
] : isAr.value ? [
  { icon: '🧠', title: 'الحيلة والخداع', desc: 'سيد الحرب النفسية. استخدم ثيراناً ملتهبة وتراجعات مزيفة وكمائن لخداع العدو.' },
  { icon: '🗺️', title: 'معرفة التضاريس', desc: 'كان يختار دائماً ميدان المعركة. كل نصر اعتمد على استغلال الأرض.' },
  { icon: '🤝', title: 'قيادة متعددة الثقافات', desc: 'قاد جيشاً من الليبيين والنوميديين والغاليين والإسبان واليونانيين.' },
  { icon: '⚡', title: 'السرعة والمفاجأة', desc: 'عبور الألب والمسيرات الإجبارية. المفاجأة كانت أفضل أسلحته.' },
] : [
  { icon: '🧠', title: 'Cunning and deception', desc: 'Master of psychological warfare. He used flaming oxen, false retreats and ambushes.' },
  { icon: '🗺️', title: 'Terrain knowledge', desc: 'He always chose the battlefield. Every victory relied on exploiting terrain.' },
  { icon: '🤝', title: 'Multicultural leadership', desc: 'He commanded Libyans, Numidians, Gauls, Spaniards and Greeks.' },
  { icon: '⚡', title: 'Speed and surprise', desc: 'The Alpine crossing, forced marches, appearing where least expected.' },
])
const tacticsTitle = computed(() => isFr.value ? 'Ses batailles analysées' : isAr.value ? 'معاركه محللة' : 'His battles analyzed')
const mapTitle = computed(() => isFr.value ? 'La route d\'Hannibal' : isAr.value ? 'مسار حنبعل' : 'Hannibal\'s route')
const paintingsTitle = computed(() => isFr.value ? 'Hannibal dans l\'art' : isAr.value ? 'حنبعل في الفن' : 'Hannibal in art')
const imgCaptions = computed(() => isFr.value ? ['Traversée des Alpes — Leutemann', 'Hannibal contemple l\'Italie — Goya', 'Statue au Louvre — Slodtz', 'Hannibal dans les Alpes — Poussin'] : isAr.value ? ['عبور الألب — لويتمان', 'حنبعل يتأمل إيطاليا — غويا', 'تمثال في اللوفر — سلودتز', 'حنبعل في الألب — بوسان'] : ['Alpine crossing — Leutemann', 'Hannibal views Italy — Goya', 'Louvre statue — Slodtz', 'Hannibal in the Alps — Poussin'])
const legacyTitle = computed(() => isFr.value ? 'L\'héritage d\'Hannibal' : isAr.value ? 'إرث حنبعل' : 'Hannibal\'s legacy')
const legacyItems = computed(() => isFr.value ? [
  { icon: '🎖️', title: 'Référence militaire', desc: 'Napoléon, Rommel, Patton et Schwarzkopf ont tous étudié ses tactiques. Cannes est le modèle absolu du double enveloppement.' },
  { icon: '🌍', title: 'Héros africain', desc: 'Né à Carthage (Tunisie), à la tête d\'une armée multi-ethnique africaine, Hannibal est un symbole de fierté pour le continent.' },
  { icon: '🏛️', title: 'Symbole de résistance', desc: 'Son combat de 15 ans contre la puissance dominante de son époque inspire les mouvements de résistance à travers l\'histoire.' },
  { icon: '📜', title: 'Éternel adversaire', desc: 'Les Romains le considéraient comme leur plus grand ennemi. Des siècles après sa mort, « Hannibal ante portas » faisait encore frémir Rome.' },
] : isAr.value ? [
  { icon: '🎖️', title: 'مرجع عسكري', desc: 'نابليون ورومل وباتون درسوا تكتيكاته. كاناي هي النموذج المطلق للتطويق المزدوج.' },
  { icon: '🌍', title: 'بطل أفريقي', desc: 'وُلد في قرطاج (تونس)، قاد جيشاً أفريقياً متعدد الأعراق. رمز فخر للقارة.' },
  { icon: '🏛️', title: 'رمز المقاومة', desc: 'كفاحه 15 عاماً ضد القوة المهيمنة في عصره يلهم حركات المقاومة عبر التاريخ.' },
  { icon: '📜', title: 'الخصم الأبدي', desc: 'اعتبره الرومان أعظم عدو لهم. بعد قرون من وفاته، «حنبعل على الأبواب» كانت لا تزال تُرعب روما.' },
] : [
  { icon: '🎖️', title: 'Military reference', desc: 'Napoleon, Rommel, Patton studied his tactics. Cannae is the absolute model of double envelopment.' },
  { icon: '🌍', title: 'African hero', desc: 'Born in Carthage (Tunisia), leading a multi-ethnic African army. A symbol of pride for the continent.' },
  { icon: '🏛️', title: 'Symbol of resistance', desc: 'His 15-year fight against the dominant power of his era inspires resistance movements throughout history.' },
  { icon: '📜', title: 'Eternal adversary', desc: 'Romans considered him their greatest enemy. Centuries later, "Hannibal ante portas" still made Rome shudder.' },
])
</script>

<style scoped>
.page-hero { background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-burgundy-dark) 100%); padding: 10rem 0 4rem; text-align: center; }
.hero-icon { font-size: 4rem; margin-bottom: 1rem; }
.page-hero-title { font-size: 3.5rem; color: var(--color-gold); margin-bottom: 1rem; letter-spacing: 4px; }
.page-hero-subtitle { color: #ccc; font-size: 1.15rem; font-style: italic; max-width: 600px; margin: 0 auto; }
.section-alt { background: var(--color-sand); }
.section-dark { background: var(--color-navy); }
.portrait-grid { display: grid; grid-template-columns: 300px 1fr; gap: 3rem; align-items: start; }
.portrait-image img { width: 100%; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.15); }
.img-caption { display: block; text-align: center; font-size: 0.8rem; color: #888; font-style: italic; margin-top: 0.8rem; }
.portrait-text h2 { font-size: 1.8rem; color: var(--color-burgundy-dark); margin-bottom: 1.5rem; }
.portrait-text p { color: #444; font-size: 0.95rem; line-height: 1.8; margin-bottom: 1rem; }
.genius-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
.genius-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border-left: 3px solid var(--color-gold); }
:global([dir="rtl"]) .genius-card { border-left: none; border-right: 3px solid var(--color-gold); }
.genius-icon { font-size: 2rem; margin-bottom: 0.8rem; }
.genius-card h3 { font-size: 1.05rem; color: var(--color-navy); margin-bottom: 0.5rem; }
.genius-card p { color: #555; font-size: 0.9rem; line-height: 1.6; }
.gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
.gallery-item { border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); background: white; }
.gallery-item img { width: 100%; height: 280px; object-fit: cover; display: block; }
.gallery-item p { padding: 0.8rem 1rem; font-size: 0.85rem; color: #666; text-align: center; font-style: italic; }
.legacy-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
.legacy-card { background: var(--color-navy-light); padding: 2rem; border-radius: 12px; border: 1px solid rgba(201,168,76,0.2); }
.legacy-card:hover { border-color: var(--color-gold); }
.legacy-card h3 { color: var(--color-gold); font-size: 1.05rem; margin-bottom: 0.6rem; }
.legacy-card p { color: #aaa; font-size: 0.9rem; line-height: 1.7; }
@media (max-width: 768px) {
  .page-hero-title { font-size: 2.2rem; }
  .portrait-grid { grid-template-columns: 1fr; }
  .genius-grid, .gallery-grid, .legacy-grid { grid-template-columns: 1fr; }
}
</style>
