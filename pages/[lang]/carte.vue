<template>
  <div class="pg">
    <section class="map-sec">
      <MapsAnimatedMap />
    </section>

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
    ]
  },
  en: {
    title: 'Animated map — Carthage and the Mediterranean',
    desc: "Carthaginian territories from 814 to 146 BC, Hannibal's campaign, the voyages of Hanno and Himilco, allies and rivals: an animated, interactive map.",
    links: [
      { to: '/hannibal', kick: 'Biography', title: 'Hannibal Barca', text: 'From Carthago Nova to Zama, the life of the strategist who made Rome tremble.', cls: 'tile--purple' },
      { to: '/guerres-puniques', kick: '264 – 146 BC', title: 'The Punic Wars', text: 'Three wars, a century of conflict over the Mediterranean.', cls: '' },
      { to: '/hannon', kick: 'Navigator · 5th c.', title: 'Hanno', text: 'The Periplus along the coasts of West Africa.', cls: 'tile--navy' }
    ]
  },
  ar: {
    title: 'الخريطة المتحركة — قرطاج والمتوسط',
    desc: 'أراضي قرطاج من 814 إلى 146 ق.م، وحملة حنبعل، ورحلات حنون وحِملكون، والحلفاء والخصوم: خريطة متحركة وتفاعلية.',
    links: [
      { to: '/hannibal', kick: 'سيرة', title: 'حنبعل برقا', text: 'من قرطاجنة إلى زاما، حياة القائد الذي أرعب روما.', cls: 'tile--purple' },
      { to: '/guerres-puniques', kick: '264 – 146 ق.م', title: 'الحروب البونيقية', text: 'ثلاث حروب وقرن من الصراع على المتوسط.', cls: '' },
      { to: '/hannon', kick: 'ملاح · القرن 5 ق.م', title: 'حنون', text: 'الرحلة على طول سواحل غرب إفريقيا.', cls: 'tile--navy' }
    ]
  }
}

const c = computed(() => C[locale.value] || C.fr)

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
