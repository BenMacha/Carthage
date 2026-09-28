<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <figure class="fig fig--hero s-7" style="background:#6B7A3A">
        <img src="/img/dominus.jpg" :alt="c.heroAlt">
        <figcaption>{{ c.heroCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--olive tile--stack tile--hero s-5">
        <span class="chip chip--glass">{{ c.chip }}</span>
        <div>
          <h1 class="h-display ag-title">{{ c.title }}</h1>
          <p class="lede">{{ c.lede }}</p>
        </div>
      </div>
    </div>

    <!-- Magon -->
    <section class="sec">
      <div class="tile tile--xl tile--ink magon">
        <div>
          <span class="kicker">{{ c.magonKicker }}</span>
          <h2 class="h-section magon-title">{{ c.magonTitle }}</h2>
          <NuxtLink :to="localePath('/magon-agronome')" class="chip magon-link">{{ c.magonLink }}</NuxtLink>
        </div>
        <div class="rows" style="--row-key:120px">
          <div v-for="r in c.magonRows" :key="r.k">
            <span class="key magon-key">{{ r.k }}</span>
            <span class="val">{{ r.v }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Cultures -->
    <div class="cols cols-4 crops">
      <article v-for="card in c.crops" :key="card.title" class="card-img">
        <img :src="card.img" :alt="card.alt" loading="lazy" :style="card.pos ? { objectPosition: card.pos } : null">
        <div class="card-body">
          <h3 class="h-card">{{ card.title }}</h3>
          <p>{{ card.text }}</p>
          <NuxtLink v-if="card.link" :to="localePath(card.link.to)" class="more">{{ card.link.label }}</NuxtLink>
        </div>
      </article>
      <article class="tile tile--gold tile--stack also">
        <h3 class="h-card also-title">{{ c.alsoTitle }}</h3>
        <div class="chips">
          <span v-for="a in c.also" :key="a" class="chip chip--white">{{ a }}</span>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const C = {
  fr: {
    metaTitle: "Agriculture — Carthage, Magon et le Cap Bon",
    metaDesc: "Magon, l'olivier, la vigne et le blé du Cap Bon : l'agriculture de Carthage, l'autre richesse de la cité punique.",
    heroAlt: 'Mosaïque du seigneur Julius, Bardo',
    heroCap: 'Mosaïque du « seigneur Julius », Carthage, IVe s. — Musée du Bardo',
    chip: 'Carthage · Agriculture',
    title: "La terre, l'autre richesse",
    lede: "Carthage n'était pas qu'un port : ses domaines du Cap Bon et de la Medjerda comptaient parmi les plus productifs de la Méditerranée.",
    magonKicker: 'Le seul livre punique traduit par Rome',
    magonTitle: "Magon, père de l'agronomie",
    magonLink: 'Biographie de Magon →',
    magonRows: [
      { k: '28', v: 'livres de traité agricole, écrits en punique.' },
      { k: '146', v: 'Carthage détruite, le Sénat romain fait pourtant traduire Magon en latin.' },
      { k: 'Ier s.', v: "L'agronome Columelle le nomme « père de l'agriculture »." }
    ],
    crops: [
      { img: '/img/olive.jpg', alt: 'Olivier', title: "L'olivier", text: "Huile pour la table, les lampes et les parfums. La Tunisie reste l'un des premiers producteurs mondiaux d'huile d'olive.", link: { to: '/economie', label: "L'économie de Carthage →" } },
      { img: '/img/kerkouane.jpg', alt: 'Kerkouane, Cap Bon', title: 'La vigne', text: 'Au Cap Bon, autour de Kerkouane ; Magon décrit la culture de la vigne et la fabrication du vin de raisins secs.' },
      { img: '/img/dominus.jpg', alt: 'Scènes agricoles, mosaïque', pos: '50% 90%', title: 'Le blé', text: 'Les plaines de la Medjerda deviendront plus tard le « grenier » de Rome.' }
    ],
    alsoTitle: 'Et aussi',
    also: ['Grenade (« pomme punique »)', 'Figue', 'Apiculture', 'Élevage', 'Pourpre']
  },
  en: {
    metaTitle: 'Agriculture — Carthage, Mago and Cap Bon',
    metaDesc: "Mago, the olive tree, the vine and the wheat of Cap Bon: Carthage's agriculture, the Punic city's other source of wealth.",
    heroAlt: 'Mosaic of Lord Julius, Bardo',
    heroCap: 'Mosaic of "Lord Julius", Carthage, 4th c. — Bardo Museum',
    chip: 'Carthage · Agriculture',
    title: 'The land, the other wealth',
    lede: 'Carthage was more than a port: its estates on Cap Bon and along the Medjerda were among the most productive in the Mediterranean.',
    magonKicker: 'The only Punic book Rome translated',
    magonTitle: 'Mago, father of agronomy',
    magonLink: "Mago's biography →",
    magonRows: [
      { k: '28', v: 'books on farming, written in Punic.' },
      { k: '146', v: 'With Carthage destroyed, the Roman Senate still had Mago translated into Latin.' },
      { k: '1st c.', v: 'The agronomist Columella calls him "the father of agriculture".' }
    ],
    crops: [
      { img: '/img/olive.jpg', alt: 'Olive tree', title: 'The olive tree', text: 'Oil for the table, for lamps and for perfumes. Tunisia is still one of the world’s leading olive oil producers.', link: { to: '/economie', label: "Carthage's economy →" } },
      { img: '/img/kerkouane.jpg', alt: 'Kerkouane, Cap Bon', title: 'The vine', text: 'On Cap Bon, around Kerkouane; Mago describes growing vines and making raisin wine.' },
      { img: '/img/dominus.jpg', alt: 'Farming scenes, mosaic', pos: '50% 90%', title: 'Wheat', text: 'The Medjerda plains would later become the "granary" of Rome.' }
    ],
    alsoTitle: 'And also',
    also: ['Pomegranate ("Punic apple")', 'Fig', 'Beekeeping', 'Livestock', 'Purple dye']
  },
  ar: {
    metaTitle: 'الفلاحة — قرطاج وماغون والوطن القبلي',
    metaDesc: 'ماغون والزيتون والكروم وقمح الوطن القبلي: الفلاحة القرطاجية، الثروة الأخرى للمدينة البونيقية.',
    heroAlt: 'فسيفساء السيد يوليوس، متحف باردو',
    heroCap: 'فسيفساء «السيد يوليوس»، قرطاج، القرن الرابع — متحف باردو',
    chip: 'قرطاج · الفلاحة',
    title: 'الأرض، الثروة الأخرى',
    lede: 'لم تكن قرطاج ميناءً فحسب: فقد كانت ضياعها في الوطن القبلي ووادي مجردة من أخصب أراضي البحر الأبيض المتوسط.',
    magonKicker: 'الكتاب البونيقي الوحيد الذي ترجمته روما',
    magonTitle: 'ماغون، أبو علم الفلاحة',
    magonLink: 'سيرة ماغون ←',
    magonRows: [
      { k: '28', v: 'كتابًا في الفلاحة، كُتبت باللغة البونيقية.' },
      { k: '146', v: 'بعد تدمير قرطاج، أمر مجلس الشيوخ الروماني مع ذلك بترجمة ماغون إلى اللاتينية.' },
      { k: 'ق. 1', v: 'يسمّيه المهندس الزراعي كولوميلا «أبا الفلاحة».' }
    ],
    crops: [
      { img: '/img/olive.jpg', alt: 'شجرة زيتون', title: 'الزيتون', text: 'زيت للمائدة وللقناديل وللعطور. وما تزال تونس من أكبر منتجي زيت الزيتون في العالم.', link: { to: '/economie', label: 'اقتصاد قرطاج ←' } },
      { img: '/img/kerkouane.jpg', alt: 'كركوان، الوطن القبلي', title: 'الكروم', text: 'في الوطن القبلي حول كركوان؛ يصف ماغون زراعة الكروم وصناعة النبيذ من الزبيب.' },
      { img: '/img/dominus.jpg', alt: 'مشاهد فلاحية، فسيفساء', pos: '50% 90%', title: 'القمح', text: 'ستصبح سهول مجردة لاحقًا «مطمور» روما.' }
    ],
    alsoTitle: 'وأيضًا',
    also: ['الرمان («التفاحة البونيقية»)', 'التين', 'تربية النحل', 'تربية الماشية', 'الأرجوان']
  }
}

const c = computed(() => C[locale.value] || C.fr)

useHead(() => ({
  title: c.value.metaTitle,
  meta: [{ name: 'description', content: c.value.metaDesc }]
}))
</script>

<style scoped>
.ag-title { font-size: clamp(44px, 5.6vw, 80px); }

.magon {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(28px, 3.4vw, 48px);
}

.magon-title { font-size: clamp(34px, 4.2vw, 60px); line-height: 0.92; }
.magon-link { margin-top: 24px; background: rgba(255, 255, 255, 0.12); color: var(--white); }
.magon-link:hover { background: var(--gold-light); color: var(--ink); }
.magon-key { color: var(--gold-light); font-size: clamp(28px, 2.6vw, 36px); }
.magon .val { color: var(--on-dark-2); }

.crops { padding-top: var(--gap); }

.more {
  display: inline-block;
  margin-top: 12px;
  font: 600 13px/1 var(--font-body);
}

.also { min-height: 260px; }
.also-title { font-size: 28px; }

@media (max-width: 960px) {
  .magon { grid-template-columns: minmax(0, 1fr); }
}
</style>
