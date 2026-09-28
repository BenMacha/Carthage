<template>
  <div class="pg">
    <section class="bento bento--top">
      <div class="s-12 tile tile--xl tile--ink">
        <span class="chip chip--glass">{{ c.chip }}</span>
        <h1 class="h-display head">{{ c.title }}</h1>
        <p class="lede">{{ c.lede }}</p>
      </div>
    </section>

    <section class="sec">
      <div class="tile tile--xl">
        <h2 class="h-block">{{ c.imagesTitle }}</h2>
        <p class="body intro">{{ c.imagesText }}</p>
        <ul class="credits">
          <li v-for="img in CREDITS.images" :key="img.file">
            <img :src="`/img/${img.file}`" alt="" loading="lazy">
            <div>
              <a :href="img.url" target="_blank" rel="noopener">{{ img.title }}</a>
              <span>{{ img.author }} · {{ img.license }}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="sec">
      <div class="cols cols-2 cols--flush">
        <div class="tile tile--paper">
          <h2 class="h-card">{{ c.dataTitle }}</h2>
          <p class="body">{{ c.dataText }}</p>
        </div>
        <div class="tile tile--paper">
          <h2 class="h-card">{{ c.fontsTitle }}</h2>
          <p class="body">{{ c.fontsText }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import CREDITS from '~/assets/data/credits.json'

const { locale } = useI18n()

const C = {
  fr: {
    chip: 'Sources & licences',
    title: 'Crédits',
    lede: "Les images du site proviennent de Wikimedia Commons. Merci aux photographes, musées et contributeurs qui les ont placées sous licence libre.",
    imagesTitle: 'Images',
    imagesText: "Chaque image est publiée par son auteur sous la licence indiquée (domaine public, CC BY, CC BY-SA ou Licence Art Libre). Les images ont été redimensionnées et recompressées pour le web.",
    dataTitle: 'Fond de carte',
    dataText: "Carte animée : contours Natural Earth (domaine public) via world-atlas, rendus avec D3. Les frontières antiques sont des zones d'influence approximatives.",
    fontsTitle: 'Typographies',
    fontsText: 'Archivo, Instrument Sans, Noto Sans Phoenician et Noto Naskh Arabic, distribuées par Google Fonts sous licence SIL Open Font License.',
    meta: 'Crédits des images, du fond de carte et des typographies du site Carthage.'
  },
  en: {
    chip: 'Sources & licences',
    title: 'Credits',
    lede: 'The images on this site come from Wikimedia Commons. Thanks to the photographers, museums and contributors who released them under free licences.',
    imagesTitle: 'Images',
    imagesText: 'Each image is published by its author under the licence shown (public domain, CC BY, CC BY-SA or Free Art License). Images were resized and recompressed for the web.',
    dataTitle: 'Base map',
    dataText: 'Animated map: Natural Earth outlines (public domain) via world-atlas, rendered with D3. Ancient borders are approximate spheres of influence.',
    fontsTitle: 'Typefaces',
    fontsText: 'Archivo, Instrument Sans, Noto Sans Phoenician and Noto Naskh Arabic, served by Google Fonts under the SIL Open Font License.',
    meta: 'Credits for the images, base map and typefaces of the Carthage website.'
  },
  ar: {
    chip: 'المصادر والتراخيص',
    title: 'الحقوق',
    lede: 'صور هذا الموقع مأخوذة من ويكيميديا كومنز. شكراً للمصورين والمتاحف والمساهمين الذين نشروها برخص حرة.',
    imagesTitle: 'الصور',
    imagesText: 'كل صورة منشورة من قِبل صاحبها بالرخصة المذكورة (ملك عام، CC BY، CC BY-SA أو رخصة الفن الحر). وقد أُعيد تحجيم الصور وضغطها للويب.',
    dataTitle: 'خلفية الخريطة',
    dataText: 'الخريطة المتحركة: حدود Natural Earth (ملك عام) عبر world-atlas، مرسومة بمكتبة D3. الحدود القديمة مناطق نفوذ تقريبية.',
    fontsTitle: 'الخطوط',
    fontsText: 'Archivo وInstrument Sans وNoto Sans Phoenician وNoto Naskh Arabic، من Google Fonts برخصة SIL Open Font License.',
    meta: 'حقوق الصور وخلفية الخريطة والخطوط في موقع قرطاج.'
  }
}

const c = computed(() => C[locale.value] || C.fr)

useHead(() => ({
  title: c.value.title,
  meta: [{ name: 'description', content: c.value.meta }]
}))
</script>

<style scoped>
.head { margin-top: 48px; }
.intro { margin: 12px 0 24px; max-width: 760px; }

.credits {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 380px), 1fr));
  gap: 10px;
}

.credits li {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  background: var(--paper);
  border-radius: 16px;
  padding: 8px;
}

.credits img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 10px;
  background: var(--sand-deep);
}

.credits a {
  display: block;
  font: 600 14px/1.35 var(--font-body);
  overflow-wrap: anywhere;
}

.credits span {
  display: block;
  margin-top: 3px;
  font: 400 13px/1.4 var(--font-body);
  color: var(--muted);
}
</style>
