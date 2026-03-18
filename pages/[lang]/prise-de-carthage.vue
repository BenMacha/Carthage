<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="hero-icon">🏚️</div>
        <h1 class="page-hero-title">{{ title }}</h1>
        <p class="page-hero-subtitle">{{ subtitle }}</p>
      </div>
    </section>

    <!-- The Roman Narrative vs Reality -->
    <section class="section">
      <div class="container intro-center">
        <h2 class="section-title">{{ mythTitle }}</h2>
        <p class="lead-text">{{ mythText }}</p>
      </div>
    </section>

    <!-- What Really Happened -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ realityTitle }}</h2>
        <div class="timeline">
          <div v-for="(e, i) in events" :key="i" class="timeline-item">
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

    <!-- Evidence -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ evidenceTitle }}</h2>
        <p class="section-subtitle">{{ evidenceSubtitle }}</p>
        <div class="evidence-grid">
          <div v-for="e in evidence" :key="e.title" class="evidence-card">
            <div class="evidence-icon">{{ e.icon }}</div>
            <h3>{{ e.title }}</h3>
            <p>{{ e.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Roman Propaganda -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">{{ propagandaTitle }}</h2>
        <div class="propaganda-grid">
          <div v-for="m in myths" :key="m.myth" class="myth-card">
            <div class="myth-header">
              <span class="myth-label-false">{{ mythLabel }}</span>
              <h3>{{ m.myth }}</h3>
            </div>
            <div class="myth-body">
              <span class="myth-label-true">{{ realityLabel }}</span>
              <p>{{ m.reality }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Continuity -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ continuityTitle }}</h2>
        <p class="section-subtitle">{{ continuitySubtitle }}</p>
        <div class="continuity-grid">
          <div v-for="c in continuityCards" :key="c.title" class="continuity-card">
            <div class="continuity-icon">{{ c.icon }}</div>
            <h3>{{ c.title }}</h3>
            <p>{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Images -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ imgTitle }}</h2>
        <div class="gallery-grid">
          <div class="gallery-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Carthage_ruins_of_city_near_sea.jpg/800px-Carthage_ruins_of_city_near_sea.jpg" alt="Ruines" loading="lazy" />
            <p>{{ imgCaptions[0] }}</p>
          </div>
          <div class="gallery-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ruins_of_Antonine_Baths_Carthage.jpg/800px-Ruins_of_Antonine_Baths_Carthage.jpg" alt="Thermes" loading="lazy" />
            <p>{{ imgCaptions[1] }}</p>
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

const title = computed(() => isFr.value ? 'La Prise de Carthage' : isAr.value ? 'الاستيلاء على قرطاج' : 'The Seizure of Carthage')
const subtitle = computed(() => isFr.value ? '146 av. J.-C. — Ce que Rome a fait, et ce qu\'elle a prétendu avoir fait' : isAr.value ? '146 ق.م — ما فعلته روما وما ادّعت أنها فعلته' : '146 BC — What Rome did, and what it claimed to have done')

const mythTitle = computed(() => isFr.value ? 'Le mythe de la « destruction totale »' : isAr.value ? 'أسطورة «التدمير الكامل»' : 'The myth of "total destruction"')
const mythText = computed(() => isFr.value ? 'L\'historiographie romaine a longtemps propagé le récit d\'une Carthage « rasée jusqu\'au sol » avec du sel répandu sur ses ruines pour que plus rien n\'y pousse. Ce récit, spectaculaire et dramatique, servait la gloire de Rome. Mais les preuves archéologiques racontent une tout autre histoire. Carthage n\'a jamais été entièrement détruite — elle a été prise, occupée, et transformée. Le mythe de la destruction relève davantage de la propagande que de la réalité historique.' : isAr.value ? 'روّج التأريخ الروماني لفترة طويلة لرواية قرطاج «المُسوّاة بالأرض» مع نثر الملح على أنقاضها. هذه الرواية المثيرة خدمت مجد روما. لكن الأدلة الأثرية تروي قصة مختلفة تماماً. قرطاج لم تُدمّر بالكامل أبداً — بل استُولي عليها واحتُلت وحُوّلت.' : 'Roman historiography long propagated the narrative of a Carthage "razed to the ground" with salt spread on its ruins. This dramatic narrative served Rome\'s glory. But archaeological evidence tells a different story. Carthage was never fully destroyed — it was seized, occupied, and transformed.')

const realityTitle = computed(() => isFr.value ? 'Ce qui s\'est réellement passé' : isAr.value ? 'ما حدث فعلاً' : 'What actually happened')

const events = computed(() => isFr.value ? [
  { date: '151 av. J.-C.', title: 'Le prétexte', desc: 'Carthage, ayant fini de payer ses indemnités de guerre, se défend contre les agressions de Massinissa. Rome y voit une violation du traité de paix.' },
  { date: '149 av. J.-C.', title: 'Désarmement et trahison', desc: 'Carthage livre ses armes et 200 000 armures à Rome en gage de paix. Rome exige ensuite que la ville soit abandonnée et reconstruite à 15 km de la mer. Les Carthaginois refusent.' },
  { date: '149–147 av. J.-C.', title: 'Le siège', desc: 'Malgré le désarmement, les Carthaginois fabriquent de nouvelles armes à partir de tout le métal disponible. Les femmes coupent leurs cheveux pour en faire des cordages d\'arcs. La résistance est acharnée pendant deux ans.' },
  { date: '146 av. J.-C.', title: 'L\'assaut final', desc: 'Scipion Émilien pénètre dans la ville grâce à des actes de sabotage internes et des trahisons. S\'ensuivent six jours de combat de rue, maison par maison. Les derniers défenseurs se réfugient dans le temple d\'Eshmoun.' },
  { date: '146 av. J.-C.', title: 'La prise — pas la destruction', desc: 'Rome s\'empare de la ville. Des incendies éclatent, des quartiers sont endommagés, mais la ville n\'est PAS rasée. La preuve : Rome elle-même refonde une cité romaine sur le même site, réutilisant les infrastructures carthaginoises.' },
] : isAr.value ? [
  { date: '151 ق.م', title: 'الذريعة', desc: 'قرطاج، بعد سداد تعويضات الحرب، تدافع عن نفسها ضد اعتداءات ماسينيسا. روما ترى في ذلك انتهاكاً للمعاهدة.' },
  { date: '149 ق.م', title: 'نزع السلاح والخيانة', desc: 'قرطاج تسلم أسلحتها و200,000 درع لروما. ثم تطالب روما بهجر المدينة. القرطاجيون يرفضون.' },
  { date: '149–147 ق.م', title: 'الحصار', desc: 'رغم نزع السلاح، يصنع القرطاجيون أسلحة جديدة من كل معدن متاح. النساء يقطعن شعورهن لصنع أوتار الأقواس.' },
  { date: '146 ق.م', title: 'الهجوم النهائي', desc: 'سكيبيو يدخل المدينة بفضل خيانات داخلية. ستة أيام من القتال شارعاً بشارع.' },
  { date: '146 ق.م', title: 'الاستيلاء — وليس التدمير', desc: 'روما تستولي على المدينة. تشتعل حرائق وتتضرر أحياء، لكن المدينة لا تُسوّى بالأرض. الدليل: روما نفسها أعادت بناء مدينة رومانية في نفس الموقع.' },
] : [
  { date: '151 BC', title: 'The pretext', desc: 'Carthage, having paid its war indemnities, defends against Masinissa\'s aggression. Rome sees a treaty violation.' },
  { date: '149 BC', title: 'Disarmament and betrayal', desc: 'Carthage surrenders its weapons and 200,000 suits of armor. Rome then demands the city be abandoned. Carthaginians refuse.' },
  { date: '149–147 BC', title: 'The siege', desc: 'Despite disarmament, Carthaginians forge new weapons from all available metal. Women cut their hair for bowstrings. Fierce resistance for two years.' },
  { date: '146 BC', title: 'The final assault', desc: 'Scipio Aemilianus enters through internal sabotage. Six days of street fighting follow.' },
  { date: '146 BC', title: 'Seizure — not destruction', desc: 'Rome seizes the city. Fires break out and quarters are damaged, but the city is NOT razed. Proof: Rome itself refounds a Roman city on the same site.' },
])

const evidenceTitle = computed(() => isFr.value ? 'Les preuves archéologiques' : isAr.value ? 'الأدلة الأثرية' : 'Archaeological evidence')
const evidenceSubtitle = computed(() => isFr.value ? 'Ce que disent réellement les fouilles' : isAr.value ? 'ما تقوله الحفريات فعلاً' : 'What excavations actually show')

const evidence = computed(() => isFr.value ? [
  { icon: '🏗️', title: 'Refondation romaine sur place', desc: 'Jules César refonde Carthage (Colonia Iulia Concordia Carthago) en 46 av. J.-C. sur le même site. Si la ville avait été rasée, pourquoi construire exactement au même endroit ? Les Romains ont réutilisé les fondations et les infrastructures puniques.' },
  { icon: '🧱', title: 'Structures puniques intactes', desc: 'Les fouilles archéologiques ont retrouvé des murs, des sols et des citernes puniques sous les couches romaines. Le quartier de Byrsa montre des structures incendiées mais pas détruites.' },
  { icon: '🧂', title: 'Le mythe du sel', desc: 'L\'histoire du sel répandu sur les ruines n\'apparaît dans aucune source antique. Elle a été inventée au XIXe siècle par des historiens modernes. Ni Polybe, ni Appien, ni Tite-Live ne la mentionnent.' },
  { icon: '🏺', title: 'Continuité culturelle', desc: 'La langue punique a continué à être parlée pendant plus de 500 ans après 146 av. J.-C. Saint Augustin (IVe–Ve siècle) atteste de sa persistance. Une civilisation « détruite » ne survit pas ainsi.' },
  { icon: '📐', title: 'Le port circulaire', desc: 'Le Cothon (port militaire circulaire) a été retrouvé intact sous les couches romaines. Sa structure sophistiquée n\'a pas été détruite mais comblée et réutilisée.' },
  { icon: '🗺️', title: 'Urbanisme continu', desc: 'Le tracé des rues romaines suit largement le plan punique. Les Romains n\'ont pas reconstruit ex nihilo mais sur un tissu urbain existant.' },
] : isAr.value ? [
  { icon: '🏗️', title: 'إعادة التأسيس الرومانية في نفس الموقع', desc: 'يوليوس قيصر أعاد تأسيس قرطاج عام 46 ق.م في نفس الموقع. إذا كانت المدينة قد سُويت بالأرض، لماذا البناء في نفس المكان؟' },
  { icon: '🧱', title: 'هياكل بونية سليمة', desc: 'الحفريات وجدت جدراناً وأرضيات وصهاريج بونية تحت الطبقات الرومانية.' },
  { icon: '🧂', title: 'أسطورة الملح', desc: 'قصة نثر الملح لا تظهر في أي مصدر قديم. اختُرعت في القرن التاسع عشر.' },
  { icon: '🏺', title: 'استمرارية ثقافية', desc: 'اللغة البونية استمرت لأكثر من 500 عام بعد 146 ق.م. القديس أوغسطين يشهد على بقائها.' },
  { icon: '📐', title: 'الميناء الدائري', desc: 'الكوثون (الميناء العسكري) وُجد سليماً تحت الطبقات الرومانية.' },
  { icon: '🗺️', title: 'تخطيط حضري مستمر', desc: 'شوارع المدينة الرومانية تتبع المخطط البوني. الرومان لم يبنوا من الصفر.' },
] : [
  { icon: '🏗️', title: 'Roman refoundation on site', desc: 'Julius Caesar refounded Carthage in 46 BC on the same site. If the city had been razed, why build in the exact same spot?' },
  { icon: '🧱', title: 'Intact Punic structures', desc: 'Excavations found walls, floors and cisterns under Roman layers.' },
  { icon: '🧂', title: 'The salt myth', desc: 'The salt story appears in no ancient source. It was invented in the 19th century.' },
  { icon: '🏺', title: 'Cultural continuity', desc: 'Punic language continued for 500+ years after 146 BC. St. Augustine attests to its persistence.' },
  { icon: '📐', title: 'The circular port', desc: 'The Cothon was found intact under Roman layers.' },
  { icon: '🗺️', title: 'Continuous urbanism', desc: 'Roman street layout largely follows the Punic plan.' },
])

const propagandaTitle = computed(() => isFr.value ? 'Mythe romain vs Réalité' : isAr.value ? 'الأسطورة الرومانية مقابل الحقيقة' : 'Roman myth vs Reality')
const mythLabel = computed(() => isFr.value ? 'MYTHE ROMAIN' : isAr.value ? 'الأسطورة الرومانية' : 'ROMAN MYTH')
const realityLabel = computed(() => isFr.value ? 'RÉALITÉ' : isAr.value ? 'الحقيقة' : 'REALITY')

const myths = computed(() => isFr.value ? [
  { myth: '« Carthage a été rasée jusqu\'au sol »', reality: 'Des structures puniques intactes ont été retrouvées sous les couches romaines. La ville a subi des incendies et des destructions partielles, pas un anéantissement total.' },
  { myth: '« Du sel a été répandu pour stériliser la terre »', reality: 'Aucune source antique ne mentionne cet épisode. Il a été inventé au XIXe siècle. Le sel était bien trop précieux pour être gaspillé ainsi.' },
  { myth: '« La civilisation carthaginoise a disparu »', reality: 'Le punique était encore parlé au Ve siècle ap. J.-C. Les traditions, la religion et la culture puniques ont perduré pendant des siècles sous domination romaine.' },
  { myth: '« Carthage n\'a jamais été reconstruite »', reality: 'Jules César a refondé Carthage en 46 av. J.-C. Elle est redevenue l\'une des plus grandes villes de l\'Empire romain, avec plus de 500 000 habitants.' },
] : isAr.value ? [
  { myth: '«قرطاج سُويت بالأرض»', reality: 'هياكل بونية سليمة وُجدت تحت الطبقات الرومانية. المدينة تعرضت لحرائق ودمار جزئي، وليس إبادة كاملة.' },
  { myth: '«نُثر الملح لتعقيم الأرض»', reality: 'لا يوجد مصدر قديم يذكر هذا. اختُرعت القصة في القرن التاسع عشر. الملح كان ثميناً جداً لإهداره هكذا.' },
  { myth: '«الحضارة القرطاجية اختفت»', reality: 'البونية كانت لا تزال تُتحدث في القرن الخامس الميلادي. التقاليد والثقافة البونية استمرت لقرون.' },
  { myth: '«قرطاج لم تُعد بناؤها أبداً»', reality: 'يوليوس قيصر أعاد تأسيسها عام 46 ق.م. عادت لتكون من أكبر مدن الإمبراطورية الرومانية.' },
] : [
  { myth: '"Carthage was razed to the ground"', reality: 'Intact Punic structures were found under Roman layers. The city suffered fires and partial damage, not total annihilation.' },
  { myth: '"Salt was spread to sterilize the soil"', reality: 'No ancient source mentions this. It was invented in the 19th century. Salt was far too precious to waste.' },
  { myth: '"Carthaginian civilization vanished"', reality: 'Punic was still spoken in the 5th century AD. Traditions and culture persisted for centuries.' },
  { myth: '"Carthage was never rebuilt"', reality: 'Caesar refounded it in 46 BC. It became one of the largest cities of the Roman Empire.' },
])

const continuityTitle = computed(() => isFr.value ? 'La continuité de Carthage' : isAr.value ? 'استمرارية قرطاج' : 'The continuity of Carthage')
const continuitySubtitle = computed(() => isFr.value ? 'Une civilisation qui n\'a jamais vraiment disparu' : isAr.value ? 'حضارة لم تختف أبداً حقاً' : 'A civilization that never truly disappeared')

const continuityCards = computed(() => isFr.value ? [
  { icon: '🗣️', title: 'La langue punique', desc: 'Parlée jusqu\'au Ve siècle ap. J.-C. — plus de 600 ans après la prise de Carthage. Saint Augustin en témoigne dans ses écrits.' },
  { icon: '🏙️', title: 'Carthage romaine', desc: 'Refondée par César, Carthage est redevenue la 4e plus grande ville de l\'Empire avec 500 000 habitants, un amphithéâtre, des thermes monumentaux.' },
  { icon: '🕌', title: 'Ifriqiya', desc: 'Le nom arabe de la Tunisie — « Ifriqiya » — est la transcription directe du latin « Africa », lui-même dérivé de la terre de Carthage.' },
  { icon: '🏛️', title: 'UNESCO', desc: 'Le site archéologique de Carthage est classé patrimoine mondial de l\'UNESCO depuis 1979. Les vestiges témoignent d\'une ville qui n\'a jamais été effacée.' },
] : isAr.value ? [
  { icon: '🗣️', title: 'اللغة البونية', desc: 'تُحدثت حتى القرن الخامس الميلادي — أكثر من 600 عام بعد الاستيلاء على قرطاج.' },
  { icon: '🏙️', title: 'قرطاج الرومانية', desc: 'أعاد قيصر تأسيسها. أصبحت رابع أكبر مدينة في الإمبراطورية مع 500,000 ساكن.' },
  { icon: '🕌', title: 'إفريقية', desc: 'الاسم العربي لتونس «إفريقية» هو النقل المباشر للاتينية «أفريكا» المشتق من أرض قرطاج.' },
  { icon: '🏛️', title: 'يونسكو', desc: 'موقع قرطاج الأثري مصنف تراثاً عالمياً منذ 1979. البقايا تشهد على مدينة لم تُمحَ أبداً.' },
] : [
  { icon: '🗣️', title: 'Punic language', desc: 'Spoken until the 5th century AD — over 600 years after the seizure.' },
  { icon: '🏙️', title: 'Roman Carthage', desc: 'Refounded by Caesar, it became the 4th largest city of the Empire with 500,000 inhabitants.' },
  { icon: '🕌', title: 'Ifriqiya', desc: 'The Arabic name for Tunisia — "Ifriqiya" — is a direct transcription of Latin "Africa".' },
  { icon: '🏛️', title: 'UNESCO', desc: 'The Carthage archaeological site has been a UNESCO World Heritage site since 1979.' },
])

const imgTitle = computed(() => isFr.value ? 'Carthage aujourd\'hui' : isAr.value ? 'قرطاج اليوم' : 'Carthage today')
const imgCaptions = computed(() => isFr.value ? ['Ruines de Carthage au bord de la Méditerranée — preuve d\'une ville qui n\'a jamais été effacée', 'Les Thermes d\'Antonin — construits SUR les fondations puniques'] : isAr.value ? ['أطلال قرطاج على المتوسط — دليل على مدينة لم تُمحَ', 'حمامات أنطونيوس — بُنيت فوق الأساسات البونية'] : ['Ruins of Carthage by the sea — proof of a city never erased', 'Antonine Baths — built ON Punic foundations'])
</script>

<style scoped>
.page-hero { background: linear-gradient(135deg, var(--color-navy) 0%, #3d0f18 60%, var(--color-navy-light) 100%); padding: 10rem 0 4rem; text-align: center; }
.hero-icon { font-size: 4rem; margin-bottom: 1rem; }
.page-hero-title { font-size: 3rem; color: var(--color-gold); margin-bottom: 1rem; letter-spacing: 3px; }
.page-hero-subtitle { color: #ccc; font-size: 1.15rem; font-style: italic; max-width: 650px; margin: 0 auto; }
.section-alt { background: var(--color-sand); }
.section-dark { background: var(--color-navy); }
.intro-center { max-width: 800px; margin: 0 auto; text-align: center; }
.lead-text { font-size: 1.1rem; color: #444; line-height: 1.9; }
.evidence-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.evidence-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border-top: 3px solid var(--color-gold); }
.evidence-icon { font-size: 2rem; margin-bottom: 0.8rem; }
.evidence-card h3 { font-size: 1.05rem; color: var(--color-navy); margin-bottom: 0.5rem; }
.evidence-card p { color: #555; font-size: 0.9rem; line-height: 1.6; }
.propaganda-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
.myth-card { background: var(--color-navy-light); border-radius: 12px; overflow: hidden; border: 1px solid rgba(201,168,76,0.15); }
.myth-header { padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
.myth-label-false { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 4px; background: #c62828; color: white; font-size: 0.65rem; font-family: var(--font-heading); font-weight: 700; letter-spacing: 1px; margin-bottom: 0.5rem; }
.myth-header h3 { color: #e57373; font-size: 1rem; font-style: italic; }
.myth-body { padding: 1.5rem; }
.myth-label-true { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 4px; background: #2e7d32; color: white; font-size: 0.65rem; font-family: var(--font-heading); font-weight: 700; letter-spacing: 1px; margin-bottom: 0.5rem; }
.myth-body p { color: #ccc; font-size: 0.9rem; line-height: 1.7; }
.continuity-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
.continuity-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }
.continuity-icon { font-size: 2rem; margin-bottom: 0.8rem; }
.continuity-card h3 { font-size: 1.05rem; color: var(--color-navy); margin-bottom: 0.5rem; }
.continuity-card p { color: #555; font-size: 0.9rem; line-height: 1.6; }
.gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
.gallery-item { border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); background: white; }
.gallery-item img { width: 100%; height: 260px; object-fit: cover; display: block; }
.gallery-item p { padding: 0.8rem 1rem; font-size: 0.85rem; color: #666; text-align: center; font-style: italic; }
@media (max-width: 768px) {
  .page-hero-title { font-size: 2rem; }
  .evidence-grid, .propaganda-grid, .continuity-grid, .gallery-grid { grid-template-columns: 1fr; }
}
</style>
