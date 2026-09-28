<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--ink tile--stack tile--hero s-7">
        <span class="chip chip--terra">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-5">
        <img src="/img/scipio.jpg" :alt="c.hero.alt" style="object-position:50% 30%">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Chiffres -->
    <div class="cols cols-3">
      <div v-for="(s, i) in c.stats" :key="i" class="tile">
        <div class="num" :style="i === 0 ? { color: '#B8492A' } : null">{{ s.n }}</div>
        <p class="stat-text">{{ s.t }}</p>
      </div>
    </div>

    <!-- Comparaison -->
    <section class="sec sec--wide">
      <h2 class="h-section cmp-title">{{ c.cmp.title }}</h2>

      <div class="seg cmp-seg" role="tablist" :aria-label="c.cmp.title">
        <button role="tab" :aria-selected="view === 'rome'" class="seg-rome" @click="view = 'rome'">{{ c.cmp.tabRome }}</button>
        <button role="tab" :aria-selected="view === 'known'" class="seg-known" @click="view = 'known'">{{ c.cmp.tabKnown }}</button>
      </div>

      <div class="cols cols-2 cols--flush cmp-labels">
        <span class="lbl-rome">{{ c.cmp.labelRome }}</span>
        <span class="lbl-known">{{ c.cmp.labelKnown }}</span>
      </div>

      <div class="cmp" :data-view="view">
        <div v-for="(p, i) in c.cmp.pairs" :key="i" class="cols cols-2 cols--flush pair">
          <div class="tile tile--sand rome">
            <div class="h-card">{{ p.rome.t }}</div>
            <p class="body">{{ p.rome.d }}</p>
          </div>
          <div class="tile tile--outline known">
            <div class="h-card">{{ p.known.t }}</div>
            <p class="body">
              {{ p.known.d }}
              <NuxtLink v-if="p.known.link" :to="localePath(p.known.link.to)">{{ p.known.link.label }} →</NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Relectures -->
    <section class="sec">
      <div class="cols cols-3 cols--flush">
        <div v-for="(r, i) in c.reads" :key="i" class="tile" :class="{ 'tile--navy': i === 2 }">
          <span class="kicker">{{ r.k }}</span>
          <div class="h-card read-title">{{ r.t }}</div>
          <p class="body" v-html="r.d" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const view = ref('known')

const C = {
  fr: {
    meta: { title: "L'histoire écrite par le vainqueur — Carthage", desc: "Presque tout ce que l'on lit sur Carthage a été écrit par ses ennemis. Ce que Rome a raconté, ce que l'on sait." },
    hero: {
      chip: 'Sources & relectures',
      title: "L'histoire écrite par le vainqueur",
      lede: "Presque tout ce que l'on lit sur Carthage a été écrit par ses ennemis. Rome n'a jamais digéré Cannes ; elle a raconté Carthage à sa manière.",
      alt: "Buste de Scipion l'Africain",
      caption: "Scipion « l'Africain » — le vainqueur a pris le nom du vaincu"
    },
    stats: [
      { n: '0', t: "livre d'histoire carthaginois parvenu jusqu'à nous" },
      { n: '1', t: "auteur punique traduit par Rome : Magon, parce que son traité d'agriculture lui était utile" },
      { n: '6 000+', t: "inscriptions puniques retrouvées par l'archéologie, surtout religieuses" }
    ],
    cmp: {
      title: "Ce que Rome a dit / ce que l'on sait",
      tabRome: 'Récit romain',
      tabKnown: "Ce que l'on sait",
      labelRome: 'LE RÉCIT ROMAIN',
      labelKnown: "L'ÉTAT DES CONNAISSANCES",
      pairs: [
        {
          rome: { t: '« Punica fides »', d: "La « foi punique » devient en latin synonyme de trahison. Tite-Live prête à Hannibal une « perfidie plus que punique »." },
          known: { t: 'Une insulte de propagande', d: "Carthage a signé et respecté des traités avec Rome pendant des siècles. En 149, c'est Rome qui change ses exigences après le désarmement de la ville." }
        },
        {
          rome: { t: 'Le sel sur les ruines', d: 'Rome aurait semé du sel pour que rien ne repousse.' },
          known: { t: 'Un mythe moderne', d: "Aucun texte antique ne le mentionne : l'histoire apparaît chez des auteurs européens des XIXe–XXe siècles. Rome refonde d'ailleurs Carthage un siècle plus tard." }
        },
        {
          rome: { t: 'Des marchands sans culture', d: "Carthage n'aurait su que commercer, sans art, sans littérature." },
          known: { t: 'Des bibliothèques dispersées', d: "Selon Pline, en 146, Rome donna les bibliothèques de Carthage aux rois numides. Leur contenu est perdu — l'absence de livres n'est pas une absence de culture." }
        },
        {
          rome: { t: 'Un peuple de sacrifices', d: "Diodore et Plutarque décrivent des sacrifices d'enfants systématiques." },
          known: { t: 'Un débat ouvert', d: 'Les archéologues restent divisés sur le tophet : certains y voient des sacrifices, d\'autres surtout une nécropole de nourrissons morts de causes naturelles.', link: { to: '/religion', label: 'Le tophet et les dieux de Carthage' } }
        }
      ]
    },
    reads: [
      { k: 'Antiquité', t: 'Des auteurs engagés', d: "Polybe était l'ami de Scipion Émilien, qui détruisit Carthage. Tite-Live écrit sous Auguste une histoire à la gloire de Rome, où les défaites s'expliquent par la ruse de l'ennemi." },
      { k: 'XIXe siècle', t: 'Le regard colonial', d: "L'Europe s'identifie à Rome, « civilisatrice », et fait de Carthage un Orient barbare — l'image du <i>Salammbô</i> de Flaubert (1862), peu avant le protectorat français de 1881." },
      { k: "Aujourd'hui", t: 'Rendre la parole à Carthage', d: 'La campagne UNESCO « Sauvons Carthage » (1972–1995), les chercheurs tunisiens et les fouilles internationales reconstruisent la cité à partir de ses propres traces.' }
    ]
  },
  en: {
    meta: { title: 'History written by the victor — Carthage', desc: 'Almost everything we read about Carthage was written by its enemies. What Rome said, and what we know.' },
    hero: {
      chip: 'Sources & re-readings',
      title: 'History written by the victor',
      lede: 'Almost everything we read about Carthage was written by its enemies. Rome never got over Cannae; it told the story of Carthage its own way.',
      alt: 'Bust of Scipio Africanus',
      caption: 'Scipio "Africanus" — the victor took the name of the vanquished'
    },
    stats: [
      { n: '0', t: 'Carthaginian history books have come down to us' },
      { n: '1', t: 'Punic author translated by Rome: Mago, because his treatise on agriculture was useful to it' },
      { n: '6,000+', t: 'Punic inscriptions recovered by archaeology, mostly religious' }
    ],
    cmp: {
      title: 'What Rome said / what we know',
      tabRome: 'Roman account',
      tabKnown: 'What we know',
      labelRome: 'THE ROMAN ACCOUNT',
      labelKnown: 'THE STATE OF KNOWLEDGE',
      pairs: [
        {
          rome: { t: '"Punica fides"', d: '"Punic faith" became a Latin byword for treachery. Livy credits Hannibal with "more than Punic perfidy".' },
          known: { t: 'A propaganda insult', d: 'Carthage signed and honoured treaties with Rome for centuries. In 149, it was Rome that changed its demands once the city had disarmed.' }
        },
        {
          rome: { t: 'Salt on the ruins', d: 'Rome supposedly sowed salt so that nothing would ever grow again.' },
          known: { t: 'A modern myth', d: 'No ancient text mentions it: the story appears in European writers of the 19th–20th centuries. Rome in fact refounded Carthage a century later.' }
        },
        {
          rome: { t: 'Merchants without culture', d: 'Carthage supposedly knew only trade — no art, no literature.' },
          known: { t: 'Scattered libraries', d: 'According to Pliny, in 146 Rome gave the libraries of Carthage to the Numidian kings. Their contents are lost — an absence of books is not an absence of culture.' }
        },
        {
          rome: { t: 'A people of sacrifice', d: 'Diodorus and Plutarch describe systematic child sacrifice.' },
          known: { t: 'An open debate', d: 'Archaeologists remain divided over the tophet: some see sacrifice there, others mainly a cemetery for infants who died of natural causes.', link: { to: '/religion', label: 'The tophet and the gods of Carthage' } }
        }
      ]
    },
    reads: [
      { k: 'Antiquity', t: 'Partisan authors', d: 'Polybius was the friend of Scipio Aemilianus, who destroyed Carthage. Livy, writing under Augustus, produced a history to the glory of Rome, in which defeats are explained by the enemy\'s cunning.' },
      { k: '19th century', t: 'The colonial gaze', d: 'Europe identified with "civilising" Rome and turned Carthage into a barbarous Orient — the image of Flaubert\'s <i>Salammbô</i> (1862), shortly before the French protectorate of 1881.' },
      { k: 'Today', t: 'Giving Carthage back its voice', d: 'The UNESCO "Save Carthage" campaign (1972–1995), Tunisian scholars and international excavations are rebuilding the city from its own traces.' }
    ]
  },
  ar: {
    meta: { title: 'التاريخ الذي كتبه المنتصر — قرطاج', desc: 'كل ما نقرؤه تقريبًا عن قرطاج كتبه أعداؤها. ما رواه الرومان، وما نعرفه.' },
    hero: {
      chip: 'المصادر وإعادة القراءة',
      title: 'التاريخ الذي كتبه المنتصر',
      lede: 'كل ما نقرؤه تقريبًا عن قرطاج كتبه أعداؤها. لم تهضم روما هزيمة كاناي قط، فروت تاريخ قرطاج على طريقتها.',
      alt: 'تمثال نصفي لسكيبيو الإفريقي',
      caption: 'سكيبيو «الإفريقي» — أخذ المنتصر اسم المهزوم'
    },
    stats: [
      { n: '0', t: 'كتاب تاريخ قرطاجي وصل إلينا' },
      { n: '1', t: 'مؤلف بوني ترجمته روما: ماغون، لأن كتابه في الفلاحة كان نافعًا لها' },
      { n: '+6000', t: 'نقيشة بونية كشفها علم الآثار، أغلبها دينية' }
    ],
    cmp: {
      title: 'ما قالته روما / ما نعرفه',
      tabRome: 'الرواية الرومانية',
      tabKnown: 'ما نعرفه',
      labelRome: 'الرواية الرومانية',
      labelKnown: 'حالة المعارف',
      pairs: [
        {
          rome: { t: '«Punica fides»', d: 'صار «الوفاء البوني» في اللاتينية مرادفًا للخيانة. ونسب تيتوس ليفيوس إلى حنبعل «غدرًا يفوق الغدر البوني».' },
          known: { t: 'شتيمة دعائية', d: 'وقّعت قرطاج معاهدات مع روما واحترمتها طوال قرون. وفي سنة 149 كانت روما هي من غيّر مطالبه بعد نزع سلاح المدينة.' }
        },
        {
          rome: { t: 'الملح على الأطلال', d: 'يُقال إن روما نثرت الملح حتى لا ينبت شيء.' },
          known: { t: 'أسطورة حديثة', d: 'لا يذكرها أي نص قديم: ظهرت القصة عند مؤلفين أوروبيين في القرنين 19 و20. بل إن روما أعادت تأسيس قرطاج بعد قرن.' }
        },
        {
          rome: { t: 'تجّار بلا ثقافة', d: 'يُزعم أن قرطاج لم تعرف سوى التجارة، بلا فن ولا أدب.' },
          known: { t: 'مكتبات مشتّتة', d: 'حسب بلينيوس، أهدت روما سنة 146 مكتبات قرطاج إلى الملوك النوميديين. ضاع محتواها — وغياب الكتب ليس غيابًا للثقافة.' }
        },
        {
          rome: { t: 'شعب القرابين', d: 'يصف ديودوروس وبلوتارخوس تقديم الأطفال قرابين بشكل منهجي.' },
          known: { t: 'نقاش مفتوح', d: 'ما يزال علماء الآثار منقسمين حول التوفة: يرى فيها بعضهم قرابين، ويرى آخرون أنها أساسًا مقبرة لرُضّع ماتوا لأسباب طبيعية.', link: { to: '/religion', label: 'التوفة وآلهة قرطاج' } }
        }
      ]
    },
    reads: [
      { k: 'العصور القديمة', t: 'مؤلفون منحازون', d: 'كان بوليبيوس صديق سكيبيو إيميليانوس الذي دمّر قرطاج. وكتب تيتوس ليفيوس في عهد أغسطس تاريخًا لمجد روما، تُفسَّر فيه الهزائم بمكر العدو.' },
      { k: 'القرن 19', t: 'النظرة الاستعمارية', d: 'تماهت أوروبا مع روما «المُحضِّرة» وجعلت من قرطاج شرقًا همجيًا — صورة رواية <i>سالامبو</i> لفلوبير (1862)، قبيل الحماية الفرنسية سنة 1881.' },
      { k: 'اليوم', t: 'إعادة الكلمة إلى قرطاج', d: 'حملة اليونسكو «لننقذ قرطاج» (1972–1995)، والباحثون التونسيون والحفريات الدولية يعيدون بناء المدينة انطلاقًا من آثارها هي.' }
    ]
  }
}

const c = computed(() => C[locale.value] || C.fr)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.stat-text { font: 500 15px/1.45 var(--font-body); margin-top: 10px; }

.cmp-title { margin-bottom: 32px; }

.cmp-labels {
  margin-bottom: 12px;
  font: 800 14px/1 var(--font-body);
  letter-spacing: 0.08em;
}

[dir="rtl"] .cmp-labels { letter-spacing: 0; }
.cmp-labels span { padding-inline: 28px; }
.lbl-rome { color: var(--stone); }
.lbl-known { color: var(--purple); }

.cmp { display: flex; flex-direction: column; gap: var(--gap); }
.pair .tile { border-radius: var(--r-md); }
.known a { font-weight: 600; white-space: nowrap; }

.cmp-seg { display: none; margin-bottom: 12px; }
.cmp-seg button { flex: 1; }
.cmp-seg .seg-rome[aria-selected="true"] { background: var(--sand); color: var(--ink); }
.cmp-seg .seg-known[aria-selected="true"] { background: var(--purple); color: var(--white); }

.read-title { margin-bottom: 10px; }

@media (max-width: 640px) {
  .fig--hero { min-height: 240px; }
  .cmp-seg { display: flex; }
  .cmp-labels { display: none; }
  .cmp[data-view="rome"] .known,
  .cmp[data-view="known"] .rome { display: none; }
  .pair .tile { padding: 22px; }
}
</style>
