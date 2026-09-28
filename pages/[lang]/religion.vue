<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--stack tile--hero tile--navy s-6">
        <div class="tanit-deco" aria-hidden="true"><i /><i /><i /></div>
        <span class="chip chip--glass">{{ c.chip }}</span>
        <div class="hero-text">
          <h1 class="h-display">{{ c.title }}</h1>
          <p class="lede">{{ c.lede }}</p>
        </div>
      </div>
      <figure class="fig s-3 keep-half god-fig">
        <img src="/img/baal.jpg" :alt="c.baalAlt" />
        <figcaption class="cap-box">{{ c.baalCap }}</figcaption>
      </figure>
      <figure class="fig s-3 keep-half god-fig">
        <img src="/img/lion-goddess.jpg" :alt="c.lionAlt" />
        <figcaption class="cap-box">{{ c.lionCap }}</figcaption>
      </figure>
    </div>

    <!-- Divinités -->
    <div class="cols cols-4 gods">
      <div
        v-for="g in c.gods"
        :key="g.name"
        class="tile tile--stack god"
        :class="{ 'tile--purple': g.accent }"
      >
        <span class="phoen god-glyph" :class="{ on: g.accent }" aria-hidden="true">{{ g.glyph }}</span>
        <div>
          <h2 class="god-name">{{ g.name }}</h2>
          <p class="body">{{ g.text }}</p>
        </div>
      </div>
    </div>

    <!-- Tophet -->
    <section class="tophet">
      <div class="cols cols-5-7">
        <figure class="fig tophet-fig">
          <img src="/img/tophet.jpg" :alt="c.tophetAlt" loading="lazy" />
          <figcaption>{{ c.tophetCap }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--stack">
          <div>
            <span class="kicker">{{ c.tophetKicker }}</span>
            <h2 class="h-block tophet-title">{{ c.tophetTitle }}</h2>
            <p class="body-lg">{{ c.tophetP1 }}</p>
            <p class="body-lg p2">
              {{ c.tophetP2a }}<NuxtLink :to="localePath('/histoire-des-vainqueurs')">{{ c.tophetLink }}</NuxtLink>{{ c.tophetP2b }}
            </p>
          </div>
          <div class="chips">
            <span v-for="t in c.tags" :key="t" class="chip">{{ t }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const C = {
  fr: {
    metaTitle: 'Les dieux de Carthage — Baal Hammon, Tanit, Melqart, Eshmoun',
    metaDesc: "La religion carthaginoise : Baal Hammon, Tanit, Melqart et Eshmoun, dieux venus de Tyr, et le débat sur le tophet de Salammbô.",
    chip: 'Carthage · Religion',
    title: 'Les dieux de Carthage',
    lede: 'Venus de Tyr, les dieux phéniciens prennent en Afrique un visage nouveau, mêlé aux croyances libyques.',
    baalAlt: 'Baal Hammon trônant, terre cuite',
    baalCap: 'Baal Hammon trônant, terre cuite',
    lionAlt: 'Déesse à tête de lion',
    lionCap: 'Déesse à tête de lion, liée à Tanit',
    gods: [
      { glyph: '𐤁𐤏𐤋 𐤇𐤌𐤍', name: 'Baal Hammon', text: 'Le dieu suprême, maître du ciel et de la fertilité, représenté âgé et barbu sur un trône flanqué de sphinx.' },
      { glyph: '𐤕𐤍𐤕', name: 'Tanit', accent: true, text: '« Face de Baal », protectrice de la cité. Son signe — un triangle, une barre, un disque — est partout, jusque dans les sols de Kerkouane.' },
      { glyph: '𐤌𐤋𐤒𐤓𐤕', name: 'Melqart', text: '« Roi de la ville », dieu de Tyr ; Carthage lui envoyait chaque année une offrande. Les Barcides le font figurer sur leurs monnaies.' },
      { glyph: '𐤀𐤔𐤌𐤍', name: 'Eshmoun', text: "Dieu guérisseur. Son temple dominait Byrsa : c'est là que se réfugièrent les derniers défenseurs en 146." }
    ],
    tophetAlt: 'Tophet de Salammbô',
    tophetCap: 'Le tophet de Salammbô, Carthage',
    tophetKicker: 'Un lieu débattu',
    tophetTitle: 'Le tophet',
    tophetP1: "Un sanctuaire à ciel ouvert où l'on a retrouvé des milliers d'urnes contenant des restes d'enfants, surmontées de stèles dédiées à Baal Hammon et Tanit.",
    tophetP2a: 'Les auteurs grecs et romains y voyaient des sacrifices. Les archéologues restent partagés entre rite sacrificiel et nécropole de nourrissons : le débat est présenté sur la page ',
    tophetLink: 'sources',
    tophetP2b: '.',
    tags: ['VIIIe – IIe s. av. J.-C.', 'Stèles gravées en punique']
  },
  en: {
    metaTitle: 'The gods of Carthage — Baal Hammon, Tanit, Melqart, Eshmun',
    metaDesc: 'Carthaginian religion: Baal Hammon, Tanit, Melqart and Eshmun, gods from Tyre, and the debate over the tophet of Salammbô.',
    chip: 'Carthage · Religion',
    title: 'The gods of Carthage',
    lede: 'Brought from Tyre, the Phoenician gods took on a new face in Africa, blended with Libyan beliefs.',
    baalAlt: 'Enthroned Baal Hammon, terracotta',
    baalCap: 'Enthroned Baal Hammon, terracotta',
    lionAlt: 'Lion-headed goddess',
    lionCap: 'Lion-headed goddess, linked to Tanit',
    gods: [
      { glyph: '𐤁𐤏𐤋 𐤇𐤌𐤍', name: 'Baal Hammon', text: 'The supreme god, lord of the sky and of fertility, shown old and bearded on a throne flanked by sphinxes.' },
      { glyph: '𐤕𐤍𐤕', name: 'Tanit', accent: true, text: '“Face of Baal”, protector of the city. Her sign — a triangle, a bar, a disc — is everywhere, even in the floors of Kerkouane.' },
      { glyph: '𐤌𐤋𐤒𐤓𐤕', name: 'Melqart', text: '“King of the city”, god of Tyre; Carthage sent him an offering every year. The Barcids put him on their coins.' },
      { glyph: '𐤀𐤔𐤌𐤍', name: 'Eshmun', text: 'The healing god. His temple crowned Byrsa: it was there that the last defenders took refuge in 146.' }
    ],
    tophetAlt: 'Tophet of Salammbô',
    tophetCap: 'The tophet of Salammbô, Carthage',
    tophetKicker: 'A contested place',
    tophetTitle: 'The tophet',
    tophetP1: 'An open-air sanctuary where thousands of urns holding the remains of children were found, topped by stelae dedicated to Baal Hammon and Tanit.',
    tophetP2a: 'Greek and Roman authors saw it as a place of sacrifice. Archaeologists remain divided between sacrificial rite and infant cemetery: the debate is presented on the ',
    tophetLink: 'sources',
    tophetP2b: ' page.',
    tags: ['8th – 2nd c. BC', 'Stelae inscribed in Punic']
  },
  ar: {
    metaTitle: 'آلهة قرطاج — بعل حمون، تانيت، ملقرت، أشمون',
    metaDesc: 'ديانة قرطاج: بعل حمون وتانيت وملقرت وأشمون، آلهة قدمت من صور، والجدل حول توفيت صلامبو.',
    chip: 'قرطاج · الديانة',
    title: 'آلهة قرطاج',
    lede: 'قدمت الآلهة الفينيقية من صور، فاتخذت في إفريقيا وجهًا جديدًا امتزج بالمعتقدات الليبية.',
    baalAlt: 'بعل حمون على عرشه، طين مشوي',
    baalCap: 'بعل حمون على عرشه، طين مشوي',
    lionAlt: 'إلهة برأس أسد',
    lionCap: 'إلهة برأس أسد، مرتبطة بتانيت',
    gods: [
      { glyph: '𐤁𐤏𐤋 𐤇𐤌𐤍', name: 'بعل حمون', text: 'الإله الأعلى، سيد السماء والخصب، يُصوَّر شيخًا ملتحيًا على عرش تحفّ به أبو الهول.' },
      { glyph: '𐤕𐤍𐤕', name: 'تانيت', accent: true, text: '«وجه بعل»، حامية المدينة. علامتها — مثلث وقضيب وقرص — حاضرة في كل مكان، حتى في أرضيات كركوان.' },
      { glyph: '𐤌𐤋𐤒𐤓𐤕', name: 'ملقرت', text: '«ملك المدينة»، إله صور؛ كانت قرطاج ترسل إليه قربانًا كل عام. وقد نقشه البرقيون على نقودهم.' },
      { glyph: '𐤀𐤔𐤌𐤍', name: 'أشمون', text: 'إله الشفاء. كان معبده يعلو بيرصا، وإليه لجأ آخر المدافعين سنة 146.' }
    ],
    tophetAlt: 'توفيت صلامبو',
    tophetCap: 'توفيت صلامبو، قرطاج',
    tophetKicker: 'موقع مثير للجدل',
    tophetTitle: 'التوفيت',
    tophetP1: 'معبد مكشوف عُثر فيه على آلاف الجرار التي تحوي رفات أطفال، تعلوها نُصُب مهداة إلى بعل حمون وتانيت.',
    tophetP2a: 'رأى فيه الكتّاب الإغريق والرومان موضعًا للقرابين. ولا يزال علماء الآثار منقسمين بين طقس قرباني ومقبرة للرضّع: يُعرض هذا الجدل في صفحة ',
    tophetLink: 'المصادر',
    tophetP2b: '.',
    tags: ['القرن الثامن – الثاني ق.م', 'نُصُب منقوشة بالبونيقية']
  }
}

const c = computed(() => C[locale.value] || C.fr)

useHead(() => ({
  title: c.value.metaTitle,
  meta: [{ name: 'description', content: c.value.metaDesc }]
}))
</script>

<style scoped>
.tanit-deco {
  position: absolute;
  inset-inline-end: 40px;
  top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.14;
  pointer-events: none;
}
.tanit-deco i { display: block; background: var(--white); }
.tanit-deco i:nth-child(1) { width: 90px; height: 90px; border-radius: 50%; }
.tanit-deco i:nth-child(2) { width: 180px; height: 20px; border-radius: 10px; }
.tanit-deco i:nth-child(3) { width: 150px; height: 130px; clip-path: polygon(50% 0, 100% 100%, 0 100%); }
.hero-text, .tile--hero .chip { position: relative; }

.god-fig { background: #8E3720; }
.god-fig figcaption { left: 12px; right: 12px; bottom: 12px; }

.gods { padding-top: clamp(40px, 5vw, 68px); }
.god { min-height: clamp(240px, 22vw, 300px); }
.god-glyph { font-size: clamp(30px, 2.6vw, 36px); color: var(--purple); }
.god-glyph.on { color: var(--purple-tint); }
.god-name { font: 800 28px/1 var(--font-display); margin-bottom: 10px; }

.tophet { padding-top: var(--gap); }
.tophet-fig { min-height: clamp(300px, 34vw, 440px); }
.tophet-title { margin-bottom: 20px; }
.p2 { margin-top: 16px; }
.p2 a { text-decoration: underline; text-underline-offset: 3px; }

@media (max-width: 960px) {
  .god-fig { min-height: clamp(300px, 55vw, 460px); }
  .tanit-deco { transform: scale(0.7); transform-origin: top right; }
}

@media (max-width: 640px) {
  .bento .god-fig { grid-column: span 6; min-height: 260px; }
  .god-fig figcaption { font-size: 11px; padding: 8px 10px; left: 8px; right: 8px; bottom: 8px; }
  .gods { padding-top: 40px; }
  .god { min-height: 0; }
  .tanit-deco { transform: scale(0.5); }
}
</style>
