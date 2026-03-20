<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="hero-icon">⚔️</div>
        <h1 class="page-hero-title">{{ title }}</h1>
        <p class="page-hero-subtitle">{{ subtitle }}</p>
      </div>
    </section>

    <!-- Overview -->
    <section class="section">
      <div class="container intro-center">
        <h2 class="section-title">{{ overviewTitle }}</h2>
        <p class="lead-text">{{ overviewText }}</p>
      </div>
    </section>

    <!-- Three Wars -->
    <section v-for="war in wars" :key="war.title" class="section" :class="war.sectionClass">
      <div class="container">
        <div class="war-header">
          <span class="war-era">{{ war.era }}</span>
          <h2 class="section-title" :class="{ light: war.dark }">{{ war.title }}</h2>
          <p class="section-subtitle" :class="{ light: war.dark }">{{ war.subtitle }}</p>
        </div>

        <div class="war-content">
          <div class="war-text">
            <p v-for="p in war.paragraphs" :key="p">{{ p }}</p>
          </div>
          <div class="war-sidebar">
            <div class="war-stat" v-for="s in war.stats" :key="s.label">
              <div class="war-stat-value">{{ s.value }}</div>
              <div class="war-stat-label">{{ s.label }}</div>
            </div>
          </div>
        </div>

        <div v-if="war.battles" class="battles-grid">
          <div v-for="b in war.battles" :key="b.name" class="battle-card" :class="{ 'battle-card-dark': war.dark }">
            <div class="battle-date-tag">{{ b.date }}</div>
            <h3>{{ b.name }}</h3>
            <p>{{ b.desc }}</p>
            <span class="battle-result" :class="b.resultClass">{{ b.result }}</span>
          </div>
        </div>

        <div v-if="war.image" class="war-image">
          <img :src="war.image" :alt="war.title" loading="lazy" />
          <span class="img-caption">{{ war.imageCaption }}</span>
        </div>
      </div>
    </section>

    <!-- Animated Warship -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ warshipSectionTitle }}</h2>
        <p class="section-subtitle">{{ warshipSectionSubtitle }}</p>
        <ClientOnly>
          <AnimationsPunicWarship :title="warshipLabel" :subtitle="warshipLabelSub" />
        </ClientOnly>
      </div>
    </section>

    <!-- Tactics -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ tacticsTitle }}</h2>
        <p class="section-subtitle light">{{ tacticsSubtitle }}</p>
        <TacticsBattleTactics :lang="locale" />
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
  </div>
</template>

<script setup>
const { locale } = useI18n()
const isFr = computed(() => locale.value === 'fr')
const isAr = computed(() => locale.value === 'ar')

const warshipSectionTitle = computed(() => isFr.value ? 'La Flotte Punique' : isAr.value ? 'الأسطول البونيقي' : 'The Punic Fleet')
const warshipSectionSubtitle = computed(() => isFr.value ? 'Les quinquérèmes carthaginoises, terreur de la Méditerranée' : isAr.value ? 'السفن القرطاجية الخماسية، رعب البحر المتوسط' : 'Carthaginian quinqueremes, terror of the Mediterranean')
const warshipLabel = computed(() => isFr.value ? 'Quinquérème Punique' : isAr.value ? 'سفينة خماسية بونيقية' : 'Punic Quinquereme')
const warshipLabelSub = computed(() => isFr.value ? 'La puissance navale de Carthage' : isAr.value ? 'القوة البحرية لقرطاج' : 'The naval power of Carthage')

const title = computed(() => isFr.value ? 'Les Guerres Puniques' : isAr.value ? 'الحروب البونية' : 'The Punic Wars')
const subtitle = computed(() => isFr.value ? '264–146 av. J.-C. — Le duel titanesque entre Carthage et Rome' : isAr.value ? '264–146 ق.م — الصراع العملاق بين قرطاج وروما' : '264–146 BC — The titanic duel between Carthage and Rome')
const overviewTitle = computed(() => isFr.value ? 'Trois guerres pour la Méditerranée' : isAr.value ? 'ثلاث حروب من أجل المتوسط' : 'Three wars for the Mediterranean')
const overviewText = computed(() => isFr.value ? 'Les guerres puniques (du latin punicus, « phénicien ») sont les trois conflits majeurs qui opposèrent Rome et Carthage entre 264 et 146 av. J.-C. Ces guerres décidèrent du destin de la Méditerranée et comptent parmi les plus grandes confrontations de l\'Antiquité. Elles virent l\'émergence de génies militaires comme Hannibal Barca et Scipion l\'Africain.' : isAr.value ? 'الحروب البونية (من اللاتينية بونيكوس، «فينيقي») هي الصراعات الثلاثة الكبرى بين روما وقرطاج من 264 إلى 146 ق.م. هذه الحروب قررت مصير المتوسط وتُعد من أعظم المواجهات في العصور القديمة.' : 'The Punic Wars (from Latin punicus, "Phoenician") were the three major conflicts between Rome and Carthage from 264 to 146 BC. These wars decided the fate of the Mediterranean and rank among the greatest confrontations of antiquity.')
const tacticsTitle = computed(() => isFr.value ? 'Tactiques de bataille' : isAr.value ? 'تكتيكات المعارك' : 'Battle Tactics')
const tacticsSubtitle = computed(() => isFr.value ? 'Analyse détaillée des manœuvres qui ont marqué l\'histoire' : isAr.value ? 'تحليل مفصل للمناورات التي غيرت التاريخ' : 'Detailed analysis of the maneuvers that changed history')
const mapTitle = computed(() => isFr.value ? 'Carte des guerres puniques' : isAr.value ? 'خريطة الحروب البونية' : 'Map of the Punic Wars')

const wars = computed(() => {
  if (isAr.value) return [
    {
      era: '264–241 ق.م', title: 'الحرب البونية الأولى', subtitle: 'الصراع على صقلية', sectionClass: 'section-alt', dark: false,
      paragraphs: ['بدأ الصراع الأول بسبب السيطرة على صقلية. قرطاج كانت تهيمن على غرب الجزيرة بينما توسعت روما جنوباً. بعد 23 عاماً من الحرب البحرية والبرية، هُزمت قرطاج في معركة جزر إيغادي (241 ق.م).', 'خسرت قرطاج صقلية وسردينيا وكورسيكا وتعويضات حرب ضخمة. هذه الهزيمة حولت روما إلى قوة بحرية وأشعلت الرغبة في الانتقام عند القرطاجيين.'],
      stats: [{ value: '23', label: 'سنة من الحرب' }, { value: '700+', label: 'سفينة غُرقت' }, { value: '400,000+', label: 'قتيل تقديري' }],
      battles: [
        { date: '260 ق.م', name: 'ميلاي', desc: 'أول نصر بحري روماني بفضل الكورفوس (جسر الصعود).', result: 'نصر روماني', resultClass: 'result-defeat' },
        { date: '255 ق.م', name: 'تونس', desc: 'القائد السبارطي كسانثيبوس يسحق الرومان بالفيلة والفرسان.', result: 'نصر قرطاجي', resultClass: 'result-victory' },
        { date: '241 ق.م', name: 'جزر إيغادي', desc: 'المعركة البحرية الحاسمة التي أنهت الحرب.', result: 'نصر روماني حاسم', resultClass: 'result-defeat' },
      ],
    },
    {
      era: '218–201 ق.م', title: 'الحرب البونية الثانية', subtitle: 'حرب حنبعل', sectionClass: '', dark: false,
      paragraphs: ['أعظم الحروب الثلاث. بقيادة حنبعل برقا الذي عبر جبال الألب بفيلته وأذل روما في سلسلة من الانتصارات المذهلة. لمدة 15 عاماً، حارب حنبعل في أرض العدو دون هزيمة كبرى.', 'فقط عندما غزا سكيبيو الأفريقي شمال أفريقيا أُجبر حنبعل على العودة. في زاما (202 ق.م)، تكتيكاته استُخدمت ضده. قرطاج قبلت شروط سلام مهينة لكنها نجت.'],
      stats: [{ value: '17', label: 'سنة من الحرب' }, { value: '37', label: 'فيلاً عبر الألب' }, { value: '70,000', label: 'روماني قُتل في كاناي' }],
      battles: [
        { date: '218 ق.م', name: 'عبور الألب', desc: 'حنبعل يعبر الألب بـ 50,000 مشاة و37 فيلاً.', result: 'إنجاز عسكري', resultClass: 'result-gold' },
        { date: '216 ق.م', name: 'كاناي', desc: 'التحفة التكتيكية: تطويق مزدوج لـ 86,000 روماني.', result: 'تحفة تكتيكية', resultClass: 'result-victory' },
        { date: '202 ق.م', name: 'زاما', desc: 'سكيبيو يهزم حنبعل بفرسان ماسينيسا النوميديين.', result: 'هزيمة قرطاجية', resultClass: 'result-defeat' },
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Heinrich_Leutemann_-_Hannibal%27s_Campaign_in_Italy_-_Crossing_the_Alps.jpg/800px-Heinrich_Leutemann_-_Hannibal%27s_Campaign_in_Italy_-_Crossing_the_Alps.jpg',
      imageCaption: 'حنبعل يعبر الألب — هاينريش لويتمان',
    },
    {
      era: '149–146 ق.م', title: 'الحرب البونية الثالثة', subtitle: 'حصار قرطاج واستيلاء روما', sectionClass: 'section-alt', dark: false,
      paragraphs: ['رغم احترام قرطاج لشروط السلام، شنت روما حرباً أخيرة بتحريض كاتو الأكبر ومقولته الشهيرة «يجب تدمير قرطاج». بعد ثلاث سنوات من الحصار، اقتحم سكيبيو إيميليانوس المدينة.', 'خلافاً للرواية الرومانية عن «تدمير كامل»، تُظهر الأدلة الأثرية أن المدينة لم تُدمر بالكامل. روما نفسها أعادت بناء قرطاج في نفس الموقع. الحضارة القرطاجية استمرت من خلال لغتها وثقافتها وشعبها.'],
      stats: [{ value: '3', label: 'سنوات حصار' }, { value: '50,000', label: 'مدافع' }, { value: '146 ق.م', label: 'سنة الاستيلاء' }],
      battles: [
        { date: '149 ق.م', name: 'بداية الحصار', desc: 'روما تحاصر قرطاج رغم نزع سلاح المدينة سابقاً.', result: 'بداية الحصار', resultClass: 'result-defeat' },
        { date: '146 ق.م', name: 'الاستيلاء', desc: 'سكيبيو يقتحم المدينة بعد خيانات داخلية. مقاومة شرسة شارع بشارع.', result: 'استيلاء بالقوة والتخريب', resultClass: 'result-defeat' },
      ],
    },
  ]
  if (isFr.value) return [
    {
      era: '264–241 av. J.-C.', title: 'Première Guerre Punique', subtitle: 'La lutte pour la Sicile', sectionClass: 'section-alt', dark: false,
      paragraphs: ['Le premier conflit éclata pour le contrôle de la Sicile. Carthage dominait l\'ouest de l\'île tandis que Rome s\'étendait vers le sud. Après 23 ans de guerre navale et terrestre, Carthage fut vaincue à la bataille des îles Égades (241 av. J.-C.).', 'Carthage perdit la Sicile, la Sardaigne, la Corse et dut payer de lourdes indemnités de guerre. Cette défaite transforma Rome en puissance maritime et alluma chez les Carthaginois une soif de revanche.'],
      stats: [{ value: '23', label: 'Années de guerre' }, { value: '700+', label: 'Navires coulés' }, { value: '400 000+', label: 'Morts estimés' }],
      battles: [
        { date: '260 av. J.-C.', name: 'Mylae', desc: 'Première victoire navale romaine grâce au corvus (pont d\'abordage).', result: 'Victoire romaine', resultClass: 'result-defeat' },
        { date: '255 av. J.-C.', name: 'Tunis', desc: 'Le mercenaire spartiate Xanthippe écrase les Romains avec éléphants et cavalerie.', result: 'Victoire carthaginoise', resultClass: 'result-victory' },
        { date: '241 av. J.-C.', name: 'Îles Égades', desc: 'Bataille navale décisive qui met fin à la guerre.', result: 'Victoire romaine décisive', resultClass: 'result-defeat' },
      ],
    },
    {
      era: '218–201 av. J.-C.', title: 'Deuxième Guerre Punique', subtitle: 'La guerre d\'Hannibal', sectionClass: '', dark: false,
      paragraphs: ['La plus grande des trois guerres. Menée par Hannibal Barca qui traversa les Alpes avec ses éléphants et humilia Rome dans une série de victoires stupéfiantes. Pendant 15 ans, Hannibal combattit en terre ennemie sans subir de défaite majeure.', 'Ce n\'est que lorsque Scipion l\'Africain envahit l\'Afrique du Nord qu\'Hannibal fut rappelé. À Zama (202 av. J.-C.), ses propres tactiques furent retournées contre lui. Carthage accepta des conditions de paix humiliantes mais survécut.'],
      stats: [{ value: '17', label: 'Années de guerre' }, { value: '37', label: 'Éléphants dans les Alpes' }, { value: '70 000', label: 'Romains tués à Cannes' }],
      battles: [
        { date: '218 av. J.-C.', name: 'Traversée des Alpes', desc: 'Hannibal franchit les Alpes avec 50 000 fantassins et 37 éléphants.', result: 'Exploit militaire', resultClass: 'result-gold' },
        { date: '216 av. J.-C.', name: 'Cannes', desc: 'Chef-d\'œuvre tactique : double enveloppement de 86 000 Romains.', result: 'Chef-d\'œuvre tactique', resultClass: 'result-victory' },
        { date: '202 av. J.-C.', name: 'Zama', desc: 'Scipion bat Hannibal grâce à la cavalerie numide de Massinissa.', result: 'Défaite carthaginoise', resultClass: 'result-defeat' },
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Heinrich_Leutemann_-_Hannibal%27s_Campaign_in_Italy_-_Crossing_the_Alps.jpg/800px-Heinrich_Leutemann_-_Hannibal%27s_Campaign_in_Italy_-_Crossing_the_Alps.jpg',
      imageCaption: 'Hannibal traversant les Alpes — Heinrich Leutemann',
    },
    {
      era: '149–146 av. J.-C.', title: 'Troisième Guerre Punique', subtitle: 'Le siège de Carthage et la prise par Rome', sectionClass: 'section-alt', dark: false,
      paragraphs: ['Malgré le respect par Carthage des conditions de paix, Rome lança une dernière guerre, poussée par Caton l\'Ancien et son célèbre « Carthago delenda est ». Après trois ans de siège, Scipion Émilien pénétra dans la ville.', 'Contrairement au récit romain d\'une « destruction totale », les preuves archéologiques montrent que la ville n\'a jamais été entièrement détruite. Rome elle-même rebâtit Carthage sur le même site. La civilisation carthaginoise perdura à travers sa langue, sa culture et son peuple.'],
      stats: [{ value: '3', label: 'Ans de siège' }, { value: '50 000', label: 'Défenseurs' }, { value: '146 av. J.-C.', label: 'Année de la prise' }],
      battles: [
        { date: '149 av. J.-C.', name: 'Début du siège', desc: 'Rome assiège Carthage malgré le désarmement préalable de la ville.', result: 'Début du siège', resultClass: 'result-defeat' },
        { date: '146 av. J.-C.', name: 'La prise', desc: 'Scipion pénètre dans la ville grâce à des sabotages internes. Résistance acharnée rue par rue.', result: 'Prise par la force et le sabotage', resultClass: 'result-defeat' },
      ],
    },
  ]
  return [
    {
      era: '264–241 BC', title: 'First Punic War', subtitle: 'The struggle for Sicily', sectionClass: 'section-alt', dark: false,
      paragraphs: ['The first conflict erupted over control of Sicily. After 23 years of naval and land warfare, Carthage was defeated at the Battle of the Aegates Islands (241 BC).', 'Carthage lost Sicily, Sardinia, Corsica and paid heavy war indemnities. This defeat turned Rome into a naval power and fueled Carthaginian desire for revenge.'],
      stats: [{ value: '23', label: 'Years of war' }, { value: '700+', label: 'Ships sunk' }, { value: '400,000+', label: 'Estimated dead' }],
      battles: [
        { date: '260 BC', name: 'Mylae', desc: 'First Roman naval victory thanks to the corvus (boarding bridge).', result: 'Roman victory', resultClass: 'result-defeat' },
        { date: '255 BC', name: 'Tunis', desc: 'Spartan mercenary Xanthippus crushes Romans with elephants and cavalry.', result: 'Carthaginian victory', resultClass: 'result-victory' },
        { date: '241 BC', name: 'Aegates Islands', desc: 'Decisive naval battle ending the war.', result: 'Decisive Roman victory', resultClass: 'result-defeat' },
      ],
    },
    {
      era: '218–201 BC', title: 'Second Punic War', subtitle: 'Hannibal\'s war', sectionClass: '', dark: false,
      paragraphs: ['The greatest of the three wars. Led by Hannibal Barca who crossed the Alps with his elephants and humiliated Rome. For 15 years, Hannibal fought in enemy territory without a major defeat.', 'Only when Scipio Africanus invaded North Africa was Hannibal recalled. At Zama (202 BC), his own tactics were turned against him.'],
      stats: [{ value: '17', label: 'Years of war' }, { value: '37', label: 'Elephants across Alps' }, { value: '70,000', label: 'Romans killed at Cannae' }],
      battles: [
        { date: '218 BC', name: 'Alpine Crossing', desc: 'Hannibal crosses the Alps with 50,000 infantry and 37 elephants.', result: 'Military feat', resultClass: 'result-gold' },
        { date: '216 BC', name: 'Cannae', desc: 'Tactical masterpiece: double envelopment of 86,000 Romans.', result: 'Tactical masterpiece', resultClass: 'result-victory' },
        { date: '202 BC', name: 'Zama', desc: 'Scipio defeats Hannibal with Masinissa\'s Numidian cavalry.', result: 'Carthaginian defeat', resultClass: 'result-defeat' },
      ],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Heinrich_Leutemann_-_Hannibal%27s_Campaign_in_Italy_-_Crossing_the_Alps.jpg/800px-Heinrich_Leutemann_-_Hannibal%27s_Campaign_in_Italy_-_Crossing_the_Alps.jpg',
      imageCaption: 'Hannibal crossing the Alps — Heinrich Leutemann',
    },
    {
      era: '149–146 BC', title: 'Third Punic War', subtitle: 'The siege of Carthage and the Roman seizure', sectionClass: 'section-alt', dark: false,
      paragraphs: ['Despite Carthage respecting peace terms, Rome launched a final war urged by Cato the Elder. After three years of siege, Scipio Aemilianus entered the city.', 'Contrary to the Roman narrative of "total destruction," archaeological evidence shows the city was never fully destroyed. Rome itself rebuilt Carthage on the same site.'],
      stats: [{ value: '3', label: 'Years of siege' }, { value: '50,000', label: 'Defenders' }, { value: '146 BC', label: 'Year of seizure' }],
      battles: [
        { date: '149 BC', name: 'Siege begins', desc: 'Rome besieges Carthage despite the city\'s prior disarmament.', result: 'Siege begins', resultClass: 'result-defeat' },
        { date: '146 BC', name: 'The seizure', desc: 'Scipio enters through internal sabotage. Fierce street-by-street resistance.', result: 'Seized by force and sabotage', resultClass: 'result-defeat' },
      ],
    },
  ]
})
</script>

<style scoped>
.page-hero { background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-burgundy) 60%, var(--color-burgundy-dark) 100%); padding: 10rem 0 4rem; text-align: center; }
.hero-icon { font-size: 4rem; margin-bottom: 1rem; }
.page-hero-title { font-size: 3rem; color: var(--color-gold); margin-bottom: 1rem; letter-spacing: 3px; }
.page-hero-subtitle { color: #ccc; font-size: 1.15rem; font-style: italic; max-width: 650px; margin: 0 auto; }
.section-alt { background: var(--color-sand); }
.section-dark { background: var(--color-navy); }
.intro-center { max-width: 800px; margin: 0 auto; text-align: center; }
.lead-text { font-size: 1.1rem; color: #444; line-height: 1.9; }
.war-header { text-align: center; margin-bottom: 2rem; }
.war-era { font-family: var(--font-heading); font-size: 0.85rem; color: var(--color-burgundy); text-transform: uppercase; letter-spacing: 2px; }
.war-content { display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; margin-bottom: 2rem; }
.war-text p { color: #444; font-size: 0.95rem; line-height: 1.8; margin-bottom: 1rem; }
.war-sidebar { display: flex; flex-direction: column; gap: 1rem; }
.war-stat { text-align: center; padding: 1.2rem; background: white; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border-left: 3px solid var(--color-gold); }
:global([dir="rtl"]) .war-stat { border-left: none; border-right: 3px solid var(--color-gold); }
.war-stat-value { font-family: var(--font-heading); font-size: 1.8rem; font-weight: 900; color: var(--color-burgundy); }
.war-stat-label { color: #777; font-size: 0.8rem; }
.battles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
.battle-card { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }
.battle-card-dark { background: var(--color-navy-light); }
.battle-card-dark h3 { color: var(--color-gold) !important; }
.battle-card-dark p { color: #aaa !important; }
.battle-date-tag { font-family: var(--font-heading); font-size: 0.75rem; color: var(--color-burgundy); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.4rem; }
.battle-card h3 { font-size: 1.05rem; color: var(--color-navy); margin-bottom: 0.5rem; }
.battle-card p { color: #555; font-size: 0.85rem; line-height: 1.6; margin-bottom: 0.8rem; }
.battle-result { display: inline-block; padding: 0.2rem 0.7rem; border-radius: 20px; font-size: 0.7rem; font-family: var(--font-heading); font-weight: 600; text-transform: uppercase; }
.result-victory { background: #e8f5e9; color: #2e7d32; }
.result-defeat { background: #fce4ec; color: #c62828; }
.result-gold { background: #fff8e1; color: #8a6f2f; }
.war-image { text-align: center; margin-top: 1rem; }
.war-image img { max-width: 700px; width: 100%; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.15); }
.img-caption { display: block; font-size: 0.8rem; color: #888; font-style: italic; margin-top: 0.8rem; }
@media (max-width: 768px) {
  .page-hero-title { font-size: 2rem; }
  .war-content { grid-template-columns: 1fr; }
  .battles-grid { grid-template-columns: 1fr; }
}
</style>
