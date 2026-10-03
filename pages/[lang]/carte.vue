<template>
  <div class="pg">
    <section class="map-sec">
      <MapsAnimatedMap />
    </section>

    <PageSources :items="c.sources" />

    <section class="sec">
      <div class="cols cols-3 cols--flush">
        <NuxtLink v-for="l in c.links" :key="l.to" :to="localePath(l.to)" class="tile tile--stack" :class="l.cls">
          <span class="kicker">{{ l.kick }}</span>
          <div>
            <h2 class="h-card">{{ l.title }}</h2>
            <p class="body">{{ l.text }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const C = {
  fr: {
    title: 'Carte animée — Carthage et la Méditerranée',
    desc: "Territoires carthaginois de 814 à 146 av. J.-C., campagne d'Hannibal, voyages d'Hannon et d'Himilcon, alliés et rivaux : une carte animée et interactive.",
    links: [
      { to: '/hannibal', kick: 'Biographie', title: 'Hannibal Barca', text: "De Carthagène à Zama, la vie du stratège qui fit trembler Rome.", cls: 'tile--purple' },
      { to: '/guerres-puniques', kick: '264 – 146 av. J.-C.', title: 'Les guerres puniques', text: 'Trois guerres, un siècle de conflit pour la Méditerranée.', cls: '' },
      { to: '/hannon', kick: 'Navigateur · Ve s.', title: 'Hannon', text: "Le Périple le long des côtes de l'Afrique de l'Ouest.", cls: 'tile--navy' }
    ],
    sources: [
      { type: 'ancient', author: 'Polybe', work: 'Histoires', ref: 'VII, 9', note: 'guerres puniques ; traité entre Hannibal et Philippe V' },
      { type: 'ancient', author: 'Tite-Live', work: 'Histoire romaine', ref: 'livres XXI–XXX', note: 'itinéraire d\'Hannibal, deuxième guerre punique' },
      { type: 'ancient', author: 'Appien d\'Alexandrie', work: 'Libyca', note: 'troisième guerre punique et chute de Carthage' },
      { type: 'ancient', author: 'Anonyme', work: 'Périple d\'Hannon', note: 'voyage d\'Hannon le long de la côte africaine (itinéraire discuté)' },
      { type: 'ancient', author: 'Pline l\'Ancien', work: 'Histoire naturelle', ref: 'II, 169', note: 'voyages d\'Hannon et d\'Himilcon' },
      { type: 'modern', author: 'Natural Earth', work: 'Fond de carte', note: 'données cartographiques du domaine public ; frontières antiques approximatives d\'après les synthèses historiques' }
    ]
  },
  en: {
    title: 'Animated map — Carthage and the Mediterranean',
    desc: "Carthaginian territories from 814 to 146 BC, Hannibal's campaign, the voyages of Hanno and Himilco, allies and rivals: an animated, interactive map.",
    links: [
      { to: '/hannibal', kick: 'Biography', title: 'Hannibal Barca', text: 'From Carthago Nova to Zama, the life of the strategist who made Rome tremble.', cls: 'tile--purple' },
      { to: '/guerres-puniques', kick: '264 – 146 BC', title: 'The Punic Wars', text: 'Three wars, a century of conflict over the Mediterranean.', cls: '' },
      { to: '/hannon', kick: 'Navigator · 5th c.', title: 'Hanno', text: 'The Periplus along the coasts of West Africa.', cls: 'tile--navy' }
    ],
    sources: [
      { type: 'ancient', author: 'Polybius', work: 'Histories', ref: 'VII, 9', note: 'Punic Wars; treaty between Hannibal and Philip V' },
      { type: 'ancient', author: 'Livy', work: 'History of Rome', ref: 'books 21–30', note: 'Hannibal\'s route, Second Punic War' },
      { type: 'ancient', author: 'Appian of Alexandria', work: 'Libyca', note: 'Third Punic War and fall of Carthage' },
      { type: 'ancient', author: 'Anonymous', work: 'Periplus of Hanno', note: 'Hanno\'s voyage along the African coast (route debated)' },
      { type: 'ancient', author: 'Pliny the Elder', work: 'Natural History', ref: 'II, 169', note: 'voyages of Hanno and Himilco' },
      { type: 'modern', author: 'Natural Earth', work: 'Base map', note: 'public-domain map data; ancient borders approximate, based on historical syntheses' }
    ]
  },
  ar: {
    title: 'الخريطة المتحركة — قرطاج والمتوسط',
    desc: 'أراضي قرطاج من 814 إلى 146 ق.م، وحملة حنبعل، ورحلات حنون وحملكون، والحلفاء والخصوم: خريطة متحركة وتفاعلية.',
    links: [
      { to: '/hannibal', kick: 'سيرة', title: 'حنبعل برقا', text: 'من قرطاجنة إلى زاما، حياة القائد الذي أرعب روما.', cls: 'tile--purple' },
      { to: '/guerres-puniques', kick: '264 – 146 ق.م', title: 'الحروب البونيقية', text: 'ثلاث حروب وقرن من الصراع على المتوسط.', cls: '' },
      { to: '/hannon', kick: 'ملاح · القرن 5 ق.م', title: 'حنون', text: 'الرحلة على طول سواحل غرب إفريقيا.', cls: 'tile--navy' }
    ],
    sources: [
      { type: 'ancient', author: 'بوليبيوس', work: 'التواريخ', ref: 'VII، 9', note: 'الحروب البونيقية؛ المعاهدة بين حنبعل وفيليب الخامس' },
      { type: 'ancient', author: 'تيتوس ليفيوس', work: 'تاريخ روما', ref: 'الكتب 21–30', note: 'مسار حنبعل في الحرب البونيقية الثانية' },
      { type: 'ancient', author: 'أبيانوس', work: 'الكتاب الليبي', note: 'الحرب البونيقية الثالثة وسقوط قرطاج' },
      { type: 'ancient', author: 'مجهول', work: 'رحلة حنون', note: 'رحلة حنون على طول الساحل الإفريقي (المسار موضع نقاش)' },
      { type: 'ancient', author: 'بلينيوس الأكبر', work: 'التاريخ الطبيعي', ref: 'II، 169', note: 'رحلتا حنون وحملكون' },
      { type: 'modern', author: 'Natural Earth', work: 'خريطة الأساس', note: 'بيانات خرائطية في الملك العام؛ الحدود القديمة تقريبية وفق الدراسات التاريخية' }
    ]
  }
}

const c = await useLocalized('carte', C)

useHead(() => ({
  title: c.value.title,
  meta: [{ name: 'description', content: c.value.desc }]
}))
</script>

<style scoped>
.map-sec {
  padding: var(--gutter) var(--gutter) 0;
}
</style>
