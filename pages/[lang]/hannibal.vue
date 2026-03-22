<template>
  <div class="hannibal-page">
    <!-- 1. HERO — Full dark cinematic -->
    <section class="hero">
      <div class="hero-inner">
        <span class="hero-tag">{{ t.heroTag }}</span>
        <h1 class="hero-title">
          Hannibal Barca — <em>{{ t.heroTitleItalic }}</em>
        </h1>
        <p class="hero-subtitle">{{ t.heroSubtitle }}</p>
        <button class="hero-cta" @click="scrollToContent">{{ t.heroCta }}</button>
        <div class="hero-warning">
          <span class="hero-warning-icon">&#9888;&#65039;</span>
          <span>{{ t.heroWarning }}</span>
        </div>
      </div>
    </section>

    <!-- 2. CE QUE ROME NE VEUT PAS QUE VOUS SACHIEZ -->
    <section class="section section--dark">
      <div class="container">
        <h2 class="section-heading">{{ t.romeSecretTitle }}</h2>
        <div class="rome-grid">
          <div class="rome-text">
            <p>{{ t.romeSecretText }}</p>
            <div class="info-box">
              <strong>{{ t.mythLabel }}</strong>
              <p>{{ t.mythText }}</p>
            </div>
          </div>
          <div class="rome-badge">
            <div class="invictus-badge">
              <span class="invictus-label">INVICTUS</span>
              <p class="invictus-stat">{{ t.invictusStat }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. LE TRACE DU DESTIN — Interactive map -->
    <section id="content-anchor" class="section section--navy">
      <div class="container">
        <h2 class="section-heading">{{ t.destinyTitle }}</h2>
        <div class="map-tabs">
          <button
            v-for="tab in mapTabs"
            :key="tab.key"
            class="map-tab"
            :class="{ 'map-tab--active': activeMapTab === tab.key }"
            @click="activeMapTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="map-wrapper">
          <ClientOnly>
            <MapsCarthageMap :lang="locale" />
          </ClientOnly>
        </div>
        <div class="march-wrapper">
          <ClientOnly>
            <AnimationsHannibalMarch :title="t.marchLabel" :subtitle="t.marchLabelSub" />
          </ClientOnly>
        </div>
        <div class="tactic-card-info">
          <div class="tactic-card-info-icon">&#128506;</div>
          <h3>{{ t.interactiveMapCard }}</h3>
          <p>{{ t.interactiveMapCardSub }}</p>
        </div>
      </div>
    </section>

    <!-- 4. L'ART DE L'ANNIHILATION — Battle cards -->
    <section class="section section--dark">
      <div class="container">
        <h2 class="section-heading">{{ t.annihilationTitle }}</h2>
        <div class="battles-grid">
          <div v-for="(battle, i) in battleCards" :key="battle.name" class="battle-card">
            <span class="battle-number">{{ battle.number }}</span>
            <h3 class="battle-name">{{ battle.name }}</h3>
            <p class="battle-desc">{{ battle.desc }}</p>
          </div>
        </div>
        <div class="tactics-component">
          <TacticsBattleTactics :lang="locale" />
        </div>
      </div>
    </section>

    <!-- 5. STATS ROW -->
    <section class="section section--stats">
      <div class="container">
        <div class="stats-row">
          <div v-for="stat in stats" :key="stat.value" class="stat-item">
            <span class="stat-number">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. ZAMA: LA TRAHISON, PAS LA DEFAITE -->
    <section class="section section--dark">
      <div class="container">
        <h2 class="section-heading">{{ t.zamaTitle }}</h2>
        <p class="zama-intro">{{ t.zamaIntro }}</p>
        <div class="zama-grid">
          <div class="zama-card">
            <h3>{{ t.zamaCard1Title }}</h3>
            <p>{{ t.zamaCard1Text }}</p>
          </div>
          <div class="zama-card">
            <h3>{{ t.zamaCard2Title }}</h3>
            <p>{{ t.zamaCard2Text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. L'HERITAGE ETERNEL -->
    <section class="section section--navy">
      <div class="container">
        <h2 class="section-heading">{{ t.legacyTitle }}</h2>
        <div class="legacy-grid">
          <div class="legacy-card">
            <h3>{{ t.legacyCard1Title }}</h3>
            <p>{{ t.legacyCard1Text }}</p>
          </div>
          <div class="legacy-card">
            <h3>{{ t.legacyCard2Title }}</h3>
            <p>{{ t.legacyCard2Text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. NAVIGATION ARROWS -->
    <section class="section section--nav">
      <div class="container">
        <div class="bio-nav">
          <NuxtLink :to="localePath('/hamilcar')" class="bio-nav-link bio-nav-link--prev">
            <span class="bio-nav-arrow">&larr;</span>
            <span class="bio-nav-text">{{ t.prevBio }}</span>
          </NuxtLink>
          <NuxtLink :to="localePath('/hasdrubal')" class="bio-nav-link bio-nav-link--next">
            <span class="bio-nav-text">{{ t.nextBio }}</span>
            <span class="bio-nav-arrow">&rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t: $t, locale, setLocale, localePath, availableLocales } = useI18n()

const activeMapTab = ref('iberie')

const isFr = computed(() => locale.value === 'fr')
const isAr = computed(() => locale.value === 'ar')

function scrollToContent() {
  document.getElementById('content-anchor')?.scrollIntoView({ behavior: 'smooth' })
}

const t = computed(() => {
  if (isFr.value) return {
    heroTag: 'Le Stratege de Carthage',
    heroTitleItalic: 'Le Genie Incompris',
    heroSubtitle: 'Les campagnes militaires les plus brillantes de l\'histoire humaine, orchestrees par l\'homme qui fit trembler Rome jusque dans ses fondations sacrees.',
    heroCta: 'Explorer la Verite',
    heroWarning: 'Avertissement — Les sources classiques sont saturees de propagande romaine. Nous restaurons ici le recit carthaginois.',
    romeSecretTitle: 'Ce que Rome ne veut pas que vous sachiez',
    romeSecretText: 'Zama ne fut pas une defaite loyale mais une trahison politique et une manipulation numide. Hannibal fut trahi par ceux qu\'il croyait allies, abandonne par un senat carthaginois corrompu et prive de renforts pendant 16 ans.',
    mythLabel: 'Mythe de la Defaite :',
    mythText: 'Hannibal n\'a jamais perdu de bataille rangee en Italie pendant 16 ans.',
    invictusStat: '16 temoignages de fer contre le pouvoir romain.',
    destinyTitle: 'Le Trace du Destin',
    marchLabel: 'La Traversee des Alpes',
    marchLabelSub: '218 av. J.-C. — Hannibal et ses elephants',
    interactiveMapCard: 'Cartographie Tactique Interactive',
    interactiveMapCardSub: 'Explorez le trajet d\'Hannibal de Carthage a Cannes, a travers les Alpes et la peninsule italienne.',
    annihilationTitle: 'L\'Art de l\'Annihilation',
    zamaTitle: 'Zama : La trahison, pas la defaite',
    zamaIntro: 'A Zama, Scipion n\'a pas vaincu Hannibal par le genie mais par la trahison de la cavalerie numide de Massinissa, achetee par Rome.',
    zamaCard1Title: 'Corruption Numide',
    zamaCard1Text: 'Massinissa, ancien allie de Carthage, fut corrompu par les promesses romaines. Sa cavalerie, autrefois le fer de lance d\'Hannibal, se retourna contre lui au moment decisif.',
    zamaCard2Title: 'Sabotage Politique',
    zamaCard2Text: 'Le senat de Carthage refusa systematiquement les renforts. Les oligarques commercants prefererent sacrifier Hannibal plutot que risquer leurs profits.',
    legacyTitle: 'L\'Heritage Eternel',
    legacyCard1Title: 'West Point & Sandhurst',
    legacyCard1Text: 'Les academies militaires les plus prestigieuses du monde etudient encore aujourd\'hui les tactiques d\'Hannibal. Cannes reste le modele absolu du double enveloppement.',
    legacyCard2Title: 'L\'Admiration de Napoleon',
    legacyCard2Text: 'Napoleon considerait Hannibal comme le plus grand capitaine de tous les temps. Il etudia ses campagnes avant de traverser les Alpes lui-meme.',
    prevBio: 'Hamilcar Barca',
    nextBio: 'Hasdrubal Barca',
  }
  if (isAr.value) return {
    heroTag: 'استراتيجي قرطاج',
    heroTitleItalic: 'العبقري المظلوم',
    heroSubtitle: 'اروع الحملات العسكرية في تاريخ البشرية، قادها الرجل الذي اهتزت روما من اساساتها المقدسة.',
    heroCta: 'استكشف الحقيقة',
    heroWarning: 'تحذير — المصادر الكلاسيكية مشبعة بالدعاية الرومانية. نحن هنا نستعيد الرواية القرطاجية.',
    romeSecretTitle: 'ما لا تريد روما ان تعرفه',
    romeSecretText: 'زاما لم تكن هزيمة عادلة بل خيانة سياسية وتلاعب نوميدي. خانه من ظنهم حلفاء وتخلى عنه مجلس شيوخ قرطاج الفاسد.',
    mythLabel: 'اسطورة الهزيمة:',
    mythText: 'حنبعل لم يخسر اي معركة منظمة في ايطاليا طوال 16 عاما.',
    invictusStat: '16 شهادة حديدية ضد السلطة الرومانية.',
    destinyTitle: 'مسار القدر',
    marchLabel: 'عبور جبال الالب',
    marchLabelSub: '218 ق.م — حنبعل وفيلته',
    interactiveMapCard: 'خرائط تكتيكية تفاعلية',
    interactiveMapCardSub: 'استكشف مسار حنبعل من قرطاج الى كاناي عبر الالب وشبه الجزيرة الايطالية.',
    annihilationTitle: 'فن الابادة',
    zamaTitle: 'زاما: الخيانة وليس الهزيمة',
    zamaIntro: 'في زاما، لم يهزم سكيبيو حنبعل بالعبقرية بل بخيانة فرسان ماسينيسا النوميديين الذين اشترتهم روما.',
    zamaCard1Title: 'الفساد النوميدي',
    zamaCard1Text: 'ماسينيسا، الحليف السابق لقرطاج، افسدته الوعود الرومانية. فرسانه التي كانت رأس حربة حنبعل انقلبت عليه في اللحظة الحاسمة.',
    zamaCard2Title: 'التخريب السياسي',
    zamaCard2Text: 'رفض مجلس شيوخ قرطاج بشكل منهجي ارسال التعزيزات. فضل التجار الاوليغارشيون التضحية بحنبعل على المخاطرة بارباحهم.',
    legacyTitle: 'الارث الخالد',
    legacyCard1Title: 'ويست بوينت وساندهيرست',
    legacyCard1Text: 'ارقى الاكاديميات العسكرية في العالم لا تزال تدرس تكتيكات حنبعل. كاناي تبقى النموذج المطلق للتطويق المزدوج.',
    legacyCard2Title: 'اعجاب نابليون',
    legacyCard2Text: 'اعتبر نابليون حنبعل اعظم قائد في كل العصور. درس حملاته قبل ان يعبر الالب بنفسه.',
    prevBio: 'حملقار برقا',
    nextBio: 'حصدروبعل برقا',
  }
  return {
    heroTag: 'The Strategist of Carthage',
    heroTitleItalic: 'The Misunderstood Genius',
    heroSubtitle: 'The most brilliant military campaigns in human history, orchestrated by the man who made Rome tremble to its sacred foundations.',
    heroCta: 'Explore the Truth',
    heroWarning: 'Warning — Classical sources are saturated with Roman propaganda. Here we restore the Carthaginian narrative.',
    romeSecretTitle: 'What Rome doesn\'t want you to know',
    romeSecretText: 'Zama was not a fair defeat but a political betrayal and Numidian manipulation. Hannibal was betrayed by those he believed allies, abandoned by a corrupt Carthaginian senate and deprived of reinforcements for 16 years.',
    mythLabel: 'Myth of the Defeat:',
    mythText: 'Hannibal never lost a pitched battle in Italy for 16 years.',
    invictusStat: '16 testimonies of iron against Roman power.',
    destinyTitle: 'The Path of Destiny',
    marchLabel: 'Crossing the Alps',
    marchLabelSub: '218 BC — Hannibal and his elephants',
    interactiveMapCard: 'Interactive Tactical Cartography',
    interactiveMapCardSub: 'Explore Hannibal\'s journey from Carthage to Cannae, across the Alps and the Italian peninsula.',
    annihilationTitle: 'The Art of Annihilation',
    zamaTitle: 'Zama: Betrayal, not defeat',
    zamaIntro: 'At Zama, Scipio did not defeat Hannibal by genius but by the betrayal of Masinissa\'s Numidian cavalry, bought by Rome.',
    zamaCard1Title: 'Numidian Corruption',
    zamaCard1Text: 'Masinissa, a former ally of Carthage, was corrupted by Roman promises. His cavalry, once Hannibal\'s spearhead, turned against him at the decisive moment.',
    zamaCard2Title: 'Political Sabotage',
    zamaCard2Text: 'The Carthaginian senate systematically refused reinforcements. The oligarch merchants preferred to sacrifice Hannibal rather than risk their profits.',
    legacyTitle: 'The Eternal Legacy',
    legacyCard1Title: 'West Point & Sandhurst',
    legacyCard1Text: 'The most prestigious military academies in the world still study Hannibal\'s tactics today. Cannae remains the absolute model of double envelopment.',
    legacyCard2Title: 'Napoleon\'s Admiration',
    legacyCard2Text: 'Napoleon considered Hannibal the greatest captain of all time. He studied his campaigns before crossing the Alps himself.',
    prevBio: 'Hamilcar Barca',
    nextBio: 'Hasdrubal Barca',
  }
})

const mapTabs = computed(() => {
  if (isFr.value) return [
    { key: 'iberie', label: 'Iberie' },
    { key: 'alpes', label: 'Alpes' },
    { key: 'italie', label: 'Italie' },
  ]
  if (isAr.value) return [
    { key: 'iberie', label: 'ايبيريا' },
    { key: 'alpes', label: 'الالب' },
    { key: 'italie', label: 'ايطاليا' },
  ]
  return [
    { key: 'iberie', label: 'Iberia' },
    { key: 'alpes', label: 'Alps' },
    { key: 'italie', label: 'Italy' },
  ]
})

const battleCards = computed(() => {
  if (isFr.value) return [
    { number: '01', name: 'La Trebie', desc: 'Premier triomphe utilisant le terrain et l\'embuscade. Les legions romaines tombent dans le piege glacial de la riviere Trebie.' },
    { number: '02', name: 'Trasimene', desc: 'Embuscade au bord du lac detruisant une armee romaine entiere. Le consul Flaminius est tue avec 15 000 de ses hommes.' },
    { number: '03', name: 'Cannes', desc: 'Le plus grand chef-d\'oeuvre tactique de l\'histoire. Double enveloppement parfait. 70 000 Romains aneantis en un seul jour.' },
  ]
  if (isAr.value) return [
    { number: '01', name: 'تريبيا', desc: 'اول انتصار باستخدام التضاريس والكمين. الفيالق الرومانية تقع في فخ نهر تريبيا الجليدي.' },
    { number: '02', name: 'تراسيمين', desc: 'كمين على ضفاف البحيرة دمر جيشا رومانيا بالكامل. القنصل فلامينيوس قُتل مع 15,000 من رجاله.' },
    { number: '03', name: 'كاناي', desc: 'اعظم تحفة تكتيكية في التاريخ. تطويق مزدوج مثالي. 70,000 روماني ابيدوا في يوم واحد.' },
  ]
  return [
    { number: '01', name: 'The Trebia', desc: 'First triumph using terrain and ambush. Roman legions fall into the icy trap of the Trebia river.' },
    { number: '02', name: 'Trasimene', desc: 'Lakeside ambush destroying an entire Roman army. Consul Flaminius killed with 15,000 of his men.' },
    { number: '03', name: 'Cannae', desc: 'The greatest tactical masterpiece in history. Perfect double envelopment. 70,000 Romans annihilated in a single day.' },
  ]
})

const stats = computed(() => {
  if (isFr.value) return [
    { value: '16', label: 'Annees en Italie' },
    { value: '0', label: 'Defaites en Bataille Rangee' },
    { value: '70K', label: 'Romains Tues a Cannes' },
  ]
  if (isAr.value) return [
    { value: '16', label: 'عاما في ايطاليا' },
    { value: '0', label: 'هزائم في معركة منظمة' },
    { value: '70K', label: 'روماني قُتلوا في كاناي' },
  ]
  return [
    { value: '16', label: 'Years in Italy' },
    { value: '0', label: 'Pitched Battle Defeats' },
    { value: '70K', label: 'Romans Killed at Cannae' },
  ]
})
</script>

<style scoped>
/* ===== BASE ===== */
.hannibal-page {
  font-family: var(--font-body);
  color: #e0d6c8;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section {
  padding: 6rem 0;
}

.section--dark {
  background: var(--color-navy);
}

.section--navy {
  background: linear-gradient(180deg, var(--color-navy) 0%, var(--color-navy-light) 100%);
}

.section--stats {
  background: var(--color-burgundy);
  padding: 4rem 0;
}

.section--nav {
  background: var(--color-navy);
  padding: 3rem 0;
  border-top: 1px solid rgba(201, 168, 76, 0.15);
}

.section-heading {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  color: var(--color-gold);
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* ===== 1. HERO ===== */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: radial-gradient(ellipse at center bottom, var(--color-navy-light) 0%, var(--color-navy) 60%, #0d0d1a 100%);
  padding: 8rem 2rem 4rem;
}

.hero-inner {
  max-width: 800px;
}

.hero-tag {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--color-gold-light);
  border: 1px solid var(--color-gold);
  padding: 0.4rem 1.6rem;
  margin-bottom: 2rem;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 3.6rem;
  color: #f0ece4;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
}

.hero-title em {
  color: var(--color-gold);
  font-style: italic;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 1.15rem;
  color: #a8a094;
  line-height: 1.9;
  max-width: 650px;
  margin: 0 auto 2.5rem;
}

.hero-cta {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.95rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  background: var(--color-gold);
  color: var(--color-navy);
  border: none;
  padding: 1rem 3rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  margin-bottom: 3rem;
}

.hero-cta:hover {
  background: var(--color-gold-light);
  transform: translateY(-2px);
}

.hero-warning {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.6rem;
  background: rgba(107, 29, 42, 0.35);
  border: 1px solid rgba(107, 29, 42, 0.6);
  padding: 1rem 1.6rem;
  font-size: 0.85rem;
  color: #d4a0a8;
  line-height: 1.6;
  text-align: left;
  max-width: 600px;
}

.hero-warning-icon {
  flex-shrink: 0;
  font-size: 1rem;
}

/* ===== 2. ROME SECRET ===== */
.rome-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 3rem;
  align-items: start;
}

.rome-text p {
  font-size: 1.05rem;
  line-height: 1.9;
  color: #c4bab0;
  margin-bottom: 2rem;
}

.info-box {
  background: rgba(201, 168, 76, 0.08);
  border-left: 3px solid var(--color-gold);
  padding: 1.2rem 1.5rem;
}

:global([dir="rtl"]) .info-box {
  border-left: none;
  border-right: 3px solid var(--color-gold);
}

.info-box strong {
  color: var(--color-gold);
  font-family: var(--font-heading);
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.info-box p {
  color: #b8ae9e;
  font-size: 0.95rem;
  line-height: 1.7;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.invictus-badge {
  background: linear-gradient(145deg, rgba(201, 168, 76, 0.12) 0%, rgba(201, 168, 76, 0.04) 100%);
  border: 1px solid rgba(201, 168, 76, 0.3);
  padding: 3rem 2rem;
  text-align: center;
}

.invictus-label {
  display: block;
  font-family: var(--font-heading);
  font-size: 2.4rem;
  color: var(--color-gold);
  letter-spacing: 8px;
  margin-bottom: 1.2rem;
}

.invictus-stat {
  color: #a89e8e;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* ===== 3. MAP / DESTINY ===== */
.map-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.map-tab {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: transparent;
  border: 1px solid rgba(201, 168, 76, 0.25);
  color: #a89e8e;
  padding: 0.6rem 1.8rem;
  cursor: pointer;
  transition: all 0.3s;
}

.map-tab--active,
.map-tab:hover {
  background: var(--color-gold);
  color: var(--color-navy);
  border-color: var(--color-gold);
}

.map-wrapper {
  margin-bottom: 3rem;
  border: 1px solid rgba(201, 168, 76, 0.15);
  padding: 1rem;
}

.march-wrapper {
  margin-bottom: 3rem;
}

.tactic-card-info {
  background: rgba(201, 168, 76, 0.06);
  border: 1px solid rgba(201, 168, 76, 0.2);
  padding: 2rem;
  text-align: center;
}

.tactic-card-info-icon {
  font-size: 2rem;
  margin-bottom: 0.8rem;
}

.tactic-card-info h3 {
  font-family: var(--font-heading);
  color: var(--color-gold);
  font-size: 1.1rem;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.tactic-card-info p {
  color: #a89e8e;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* ===== 4. BATTLES ===== */
.battles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.battle-card {
  background: var(--color-navy-light);
  border: 1px solid rgba(201, 168, 76, 0.15);
  padding: 2.5rem 2rem;
  position: relative;
  transition: border-color 0.3s, transform 0.2s;
}

.battle-card:hover {
  border-color: var(--color-gold);
  transform: translateY(-4px);
}

.battle-number {
  display: block;
  font-family: var(--font-heading);
  font-size: 3rem;
  color: rgba(201, 168, 76, 0.2);
  line-height: 1;
  margin-bottom: 1rem;
}

.battle-name {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  color: var(--color-gold);
  margin-bottom: 0.8rem;
  letter-spacing: 1px;
}

.battle-desc {
  color: #a89e8e;
  font-size: 0.9rem;
  line-height: 1.7;
}

.tactics-component {
  border-top: 1px solid rgba(201, 168, 76, 0.1);
  padding-top: 3rem;
}

/* ===== 5. STATS ===== */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
}

.stat-number {
  display: block;
  font-family: var(--font-heading);
  font-size: 4rem;
  color: var(--color-gold);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* ===== 6. ZAMA ===== */
.zama-intro {
  text-align: center;
  max-width: 700px;
  margin: -1rem auto 3rem;
  color: #b8ae9e;
  font-size: 1.05rem;
  line-height: 1.8;
}

.zama-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.zama-card {
  background: var(--color-navy-light);
  border: 1px solid rgba(107, 29, 42, 0.4);
  padding: 2.5rem 2rem;
  transition: border-color 0.3s;
}

.zama-card:hover {
  border-color: var(--color-burgundy);
}

.zama-card h3 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--color-gold);
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.zama-card p {
  color: #a89e8e;
  font-size: 0.92rem;
  line-height: 1.8;
}

/* ===== 7. LEGACY ===== */
.legacy-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.legacy-card {
  background: rgba(201, 168, 76, 0.06);
  border: 1px solid rgba(201, 168, 76, 0.2);
  padding: 2.5rem 2rem;
  transition: border-color 0.3s, transform 0.2s;
}

.legacy-card:hover {
  border-color: var(--color-gold);
  transform: translateY(-3px);
}

.legacy-card h3 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--color-gold);
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.legacy-card p {
  color: #b8ae9e;
  font-size: 0.92rem;
  line-height: 1.8;
}

/* ===== 8. NAV ARROWS ===== */
.bio-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bio-nav-link {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  color: #a89e8e;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0.8rem 1.2rem;
  border: 1px solid rgba(201, 168, 76, 0.15);
  transition: all 0.3s;
}

.bio-nav-link:hover {
  color: var(--color-gold);
  border-color: var(--color-gold);
}

.bio-nav-arrow {
  font-size: 1.3rem;
  color: var(--color-gold);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .section-heading {
    font-size: 1.6rem;
  }

  .rome-grid {
    grid-template-columns: 1fr;
  }

  .battles-grid {
    grid-template-columns: 1fr;
  }

  .stats-row {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .stat-number {
    font-size: 3rem;
  }

  .zama-grid,
  .legacy-grid {
    grid-template-columns: 1fr;
  }

  .bio-nav {
    flex-direction: column;
    gap: 1rem;
  }

  .bio-nav-link {
    width: 100%;
    justify-content: center;
  }
}
</style>
