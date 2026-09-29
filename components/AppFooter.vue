<template>
  <footer class="footer">
    <div class="foot">
      <div class="f-top">
        <div class="f-brand">
          <div class="phoen" aria-hidden="true">𐤒𐤓𐤕𐤇𐤃𐤔𐤕</div>
          <NuxtLink :to="localePath('/')" class="f-word">{{ t.siteName }}</NuxtLink>
          <p>{{ t.footer.description }}</p>
        </div>
        <div class="f-cols">
          <nav v-for="col in cols" :key="col.title" class="f-col" :aria-label="col.title">
            <h4>{{ col.title }}</h4>
            <ul>
              <li v-for="it in col.items" :key="it.to">
                <NuxtLink :to="localePath(it.to)">{{ it.label }}</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="f-bottom">
        <span>{{ t.footer.copyright }}</span>
        <nav class="f-legal" :aria-label="F.legal">
          <NuxtLink :to="localePath('/plan-du-site')">{{ F.plan }}</NuxtLink>
          <a href="/sitemap.xml">sitemap.xml</a>
          <NuxtLink :to="localePath('/credits')">{{ F.credits }}</NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { t, locale, localePath } = useI18n()

const FOOT = {
  fr: {
    note: 'Qart-Ḥadasht · 814 – 146 av. J.-C.',
    credits: 'Crédits des images', plan: 'Plan du site', legal: 'Informations sur le site',
    explore: 'Explorer', periods: 'Époques', civ: 'Civilisation', people: 'Personnages', biblio: 'Sources et bibliographie', glossaire: 'Glossaire', quiz: 'Quiz', mercenaires: 'La guerre des Mercenaires', monde: 'Le monde punique', vie: 'La vie quotidienne', heritage: "L'héritage culturel", massinissa: 'Massinissa', apres: 'Carthage après 146', institutions: 'Institutions et société', art: 'Art et artisanat', langue: 'Langue et écriture',
    tunisie: 'Carthage vit en Tunisie', carte: 'Carte animée', sources: 'Histoire des vainqueurs', tactiques: "Les tactiques d'Hannibal", richesse: 'La richesse et Rome', lieux: 'Lieux historiques', religion: 'Religion', agriculture: 'Agriculture', armee: "L'armée", bios: 'Toutes les biographies', didon: 'Élissa / Didon', hamilcar: 'Hamilcar Barca', hannon: 'Hannon le Navigateur', sophonisbe: 'Sophonisbe'
  },
  en: {
    note: 'Qart-Ḥadasht · 814 – 146 BC',
    credits: 'Image credits', plan: 'Site map', legal: 'Site information',
    explore: 'Explore', periods: 'Eras', civ: 'Civilisation', people: 'People', biblio: 'Sources and bibliography', glossaire: 'Glossary', quiz: 'Quiz', mercenaires: 'The Mercenary War', monde: 'The Punic world', vie: 'Daily life', heritage: 'Cultural legacy', massinissa: 'Masinissa', apres: 'Carthage after 146', institutions: 'Institutions and society', art: 'Art and crafts', langue: 'Language and writing',
    tunisie: 'Carthage lives in Tunisia', carte: 'Animated map', sources: "The victors' history", tactiques: "Hannibal's tactics", richesse: 'Wealth and Rome', lieux: 'Historic places', religion: 'Religion', agriculture: 'Agriculture', armee: 'The army', bios: 'All biographies', didon: 'Elissa / Dido', hamilcar: 'Hamilcar Barca', hannon: 'Hanno the Navigator', sophonisbe: 'Sophonisba'
  },
  ar: {
    note: 'قرت حدشت · 814 – 146 ق.م',
    credits: 'حقوق الصور', plan: 'خريطة الموقع', legal: 'معلومات الموقع',
    explore: 'استكشف', periods: 'الحقب', civ: 'الحضارة', people: 'الشخصيات', biblio: 'المصادر والمراجع', glossaire: 'المعجم', quiz: 'اختبار', mercenaires: 'حرب المرتزقة', monde: 'العالم البونيقي', vie: 'الحياة اليومية', heritage: 'الإرث الثقافي', massinissa: 'ماسينيسا', apres: 'قرطاج بعد 146', institutions: 'المؤسسات والمجتمع', art: 'الفن والحِرف', langue: 'اللغة والكتابة',
    tunisie: 'قرطاج تحيا في تونس', carte: 'الخريطة المتحركة', sources: 'تاريخ المنتصرين', tactiques: 'تكتيكات حنبعل', richesse: 'الثروة وروما', lieux: 'أماكن تاريخية', religion: 'الديانة', agriculture: 'الفلاحة', armee: 'الجيش', bios: 'كل السير', didon: 'عليسة / ديدون', hamilcar: 'حملقار برقا', hannon: 'حنون الملاح', sophonisbe: 'صفنبعل'
  }
}

const F = computed(() => FOOT[locale.value] || FOOT.fr)

const cols = computed(() => [
  {
    title: F.value.explore,
    items: [
      { to: '/tunisie', label: F.value.tunisie },
      { to: '/carte', label: F.value.carte },
      { to: '/chronologie', label: t.value.footer.timeline },
      { to: '/histoire-des-vainqueurs', label: F.value.sources },
      { to: '/lieux', label: F.value.lieux },
      { to: '/afrique', label: t.value.footer.africa },
      { to: '/monde-punique', label: F.value.monde },
      { to: '/bibliographie', label: F.value.biblio },
      { to: '/glossaire', label: F.value.glossaire },
      { to: '/quiz', label: F.value.quiz }
    ]
  },
  {
    title: F.value.periods,
    items: [
      { to: '/fondation', label: t.value.footer.founding },
      { to: '/guerres-puniques', label: t.value.footer.punicWars },
      { to: '/elephants', label: t.value.footer.elephantPassage },
      { to: '/tactiques', label: F.value.tactiques },
      { to: '/guerre-des-mercenaires', label: F.value.mercenaires },
      { to: '/richesse-rome', label: F.value.richesse },
      { to: '/prise-de-carthage', label: t.value.footer.fall },
      { to: '/apres-146', label: F.value.apres }
    ]
  },
  {
    title: F.value.civ,
    items: [
      { to: '/institutions', label: F.value.institutions },
      { to: '/economie', label: t.value.footer.economy },
      { to: '/agriculture', label: F.value.agriculture },
      { to: '/religion', label: F.value.religion },
      { to: '/art-et-artisanat', label: F.value.art },
      { to: '/langue-ecriture', label: F.value.langue },
      { to: '/vie-quotidienne', label: F.value.vie },
      { to: '/heritage', label: F.value.heritage },
      { to: '/armee', label: F.value.armee }
    ]
  },
  {
    title: F.value.people,
    items: [
      { to: '/biographies', label: F.value.bios },
      { to: '/didon', label: F.value.didon },
      { to: '/hamilcar', label: F.value.hamilcar },
      { to: '/hannibal', label: t.value.footer.hannibal },
      { to: '/hannon', label: F.value.hannon },
      { to: '/massinissa', label: F.value.massinissa },
      { to: '/sophonisbe', label: F.value.sophonisbe }
    ]
  }
])
</script>

<style scoped>
.footer {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: var(--section) var(--gutter) calc(env(safe-area-inset-bottom, 0px) + var(--gutter));
}

.foot {
  background: var(--ink);
  color: var(--paper);
  border-radius: var(--r-xl);
  padding: clamp(32px, 4vw, 56px) clamp(22px, 3.4vw, 48px) clamp(22px, 2.4vw, 32px);
}

.f-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
}

.f-brand .phoen {
  font-size: clamp(26px, 3vw, 40px);
  color: var(--gold);
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

.f-word {
  display: block;
  font: 900 clamp(64px, 9vw, 112px)/0.85 var(--font-display);
  font-stretch: 108%;
  letter-spacing: -0.045em;
  color: var(--paper);
}

.f-word:hover { color: var(--white); }

.f-brand p {
  margin-top: 18px;
  font: 400 15px/1.55 var(--font-body);
  color: var(--on-dark);
  max-width: 380px;
}

.f-cols {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 32px 40px;
}

.f-col h4 {
  font: 700 12px/1 var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--gold-light);
  margin-bottom: 12px;
}

[dir="rtl"] .f-col h4 { letter-spacing: 0; }

.f-col ul { list-style: none; display: flex; flex-direction: column; }

.f-col a {
  display: inline-block;
  padding: 5px 0;
  font: 500 15px/1.3 var(--font-body);
  color: var(--on-dark);
}

.f-col a:hover { color: var(--white); }

.f-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  margin-top: 48px;
  padding-top: 20px;
  border-top: 1px solid rgba(244, 238, 227, 0.15);
  font: 400 13px/1.4 var(--font-body);
  color: #A9A094;
}

.f-legal { display: flex; flex-wrap: wrap; gap: 4px 20px; }
.f-bottom a { color: #A9A094; text-decoration: underline; text-underline-offset: 3px; display: inline-block; padding-block: 4px; }
.f-bottom a:hover { color: var(--white); }

@media (max-width: 1100px) {
  .f-top { flex-direction: column; align-items: stretch; }
}

@media (max-width: 640px) {
  .f-cols { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 16px; }
  .f-col a { padding: 9px 0; }
}
</style>
