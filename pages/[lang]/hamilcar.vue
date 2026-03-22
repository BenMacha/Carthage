<template>
  <div class="hamilcar-page" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-bg" :style="{ backgroundImage: `url(${heroImage})` }"></div>
      <div class="hero-content">
        <span class="hero-epithet">{{ content.hero.epithet }}</span>
        <h1 class="hero-title">{{ content.hero.title }}</h1>
        <div class="hero-dates">{{ content.hero.dates }}</div>
        <p class="hero-subtitle">{{ content.hero.subtitle }}</p>
        <blockquote class="hero-quote">
          <p>{{ content.hero.quote }}</p>
        </blockquote>
      </div>
      <div class="hero-scroll-indicator">
        <span>&#8595;</span>
      </div>
    </section>

    <!-- The Undefeated Section -->
    <section class="section undefeated-section">
      <div class="container">
        <h2 class="section-title">{{ content.undefeated.title }}</h2>
        <div class="two-column">
          <div class="column-text">
            <p class="lead-text">{{ content.undefeated.intro }}</p>
            <p>{{ content.undefeated.body }}</p>
            <div class="correction-box">
              <div class="correction-label">{{ content.undefeated.correction.label }}</div>
              <h3 class="correction-title">{{ content.undefeated.correction.title }}</h3>
              <p>{{ content.undefeated.correction.text }}</p>
            </div>
          </div>
          <div class="column-portrait">
            <div class="portrait-frame">
              <img
                :src="heroImage"
                :alt="content.hero.title"
                loading="lazy"
              />
              <div class="portrait-dates">
                <span class="date-start">275</span>
                <span class="date-separator">&mdash;</span>
                <span class="date-end">228</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Monumental Achievements Section -->
    <section class="section achievements-section">
      <div class="container">
        <h2 class="section-title">{{ content.achievements.title }}</h2>
        <div class="bento-grid">
          <div
            v-for="(card, index) in content.achievements.cards"
            :key="index"
            class="bento-card"
            :class="`bento-card-${index + 1}`"
          >
            <div class="bento-icon">{{ card.icon }}</div>
            <h3 class="bento-title">{{ card.title }}</h3>
            <p class="bento-text">{{ card.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="section timeline-section">
      <div class="container">
        <h2 class="section-title">{{ content.timeline.title }}</h2>
        <div class="timeline">
          <div
            v-for="(event, index) in content.timeline.events"
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-marker"></div>
            <div class="timeline-date">{{ event.date }}</div>
            <div class="timeline-content">
              <h3>{{ event.title }}</h3>
              <p>{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote Section -->
    <section class="section quote-section">
      <div class="container">
        <blockquote class="grand-quote">
          <p>{{ content.grandQuote }}</p>
        </blockquote>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <NuxtLink :to="localePath('/archive-maps')" class="cta-button cta-primary">
            {{ content.cta.maps }}
          </NuxtLink>
          <NuxtLink :to="localePath('/barca-legacy')" class="cta-button cta-secondary">
            {{ content.cta.legacy }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t, locale, setLocale, localePath, availableLocales } = useI18n()

const heroImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hamilcar_Barca.jpg/440px-Hamilcar_Barca.jpg'

const content = computed(() => {
  const lang = locale.value

  if (lang === 'ar') {
    return {
      hero: {
        title: 'حملقار برقا — البرق الذي أرعب روما',
        dates: '~275–228 ق.م.',
        epithet: 'الأسد القرطاجي',
        subtitle: 'قائد لم يُهزم، أب لسلالة عظيمة',
        quote: 'الرجل الذي أنشأ إمبراطورية من رماد الهزيمة، والذي أصبحت ضرباته الخاطفة في صقلية كابوس الجمهورية الرومانية.'
      },
      undefeated: {
        title: 'القائد الذي لم يُهزم',
        intro: 'طوال حملته في صقلية، لم يُهزم حملقار برقا في أي معركة. أتقن فن حرب العصابات، مُنزلاً خسائر فادحة بالفيالق الرومانية مع الحفاظ على قواته سليمة.',
        body: 'عمل حملقار انطلاقاً من معاقل محصنة في جبال صقلية، شنّ غارات جريئة على المواقع الرومانية وخطوط الإمداد. جعلت تكتيكاته الاحتلال الروماني لصقلية مكلفاً ودموياً، مما أجبر روما على إنفاق موارد هائلة لمجرد الحفاظ على مواقعها.',
        correction: {
          label: 'تصحيح تاريخي',
          title: 'أسطورة الهزيمة الصقلية',
          text: 'تدّعي الروايات الرومانية أن حملقار طُرد من صقلية. الحقيقة: كانت حملته في حرب العصابات ناجحة جداً لدرجة أنه ظل غير مهزوم عندما انتهت الحرب رسمياً. سلّم قيادته فقط لأن قرطاج فقدت أسطولها في جزر إيغاتس.'
        }
      },
      achievements: {
        title: 'الإنجازات الضخمة',
        cards: [
          {
            icon: '🏛️',
            title: 'إنقاذ قرطاج',
            text: 'خلال حرب المرتزقة، سحق حملقار التمرد الذي كاد يدمر قرطاج. بتكتيكات عبقرية ووحشية لا هوادة فيها، هزم جيوش المرتزقة المتفوقة عدداً وأنقذ المدينة من الدمار.'
          },
          {
            icon: '⚔️',
            title: 'جيش البرقيين',
            text: 'بنى الآلة العسكرية البرقية الأسطورية — جيش محترف مخلص لعائلة برقا وليس لمجلس شيوخ قرطاج. أصبح هذا الجيش الأداة التي سيستخدمها حنبعل لاحقاً لغزو إيطاليا.'
          },
          {
            icon: '🗺️',
            title: 'فتح إيبيريا',
            text: 'وجّه حملقار أنظاره إلى مناجم الفضة في إيبيريا، مؤسساً إمبراطورية برقية جديدة في إسبانيا. موّلت ثروات المناجم الإسبانية إعادة بناء القوة العسكرية القرطاجية.'
          },
          {
            icon: '🩸',
            title: 'قسم الدم',
            text: 'جعل حنبعل الصغير يقسم العداء الأبدي لروما. هذا القسم المقدس، المأخوذ أمام آلهة قرطاج، شكّل مصير البحر المتوسط لأجيال قادمة.'
          }
        ]
      },
      timeline: {
        title: 'خيط الزمن',
        events: [
          {
            date: '247 ق.م.',
            title: 'قيادة صقلية',
            description: 'عُيّن قائداً لصقلية، وبدأ حملته المعروفة بـ"البرق". من قلعته في جبل إركتي، شنّ سلسلة من الغارات المدمرة أرعبت الحاميات الرومانية.'
          },
          {
            date: '240–238 ق.م.',
            title: 'حرب المرتزقة',
            description: 'أنقذ قرطاج من مرتزقتها المتمردين. في حملة وحشية عُرفت بـ"الحرب بلا رحمة"، سحق حملقار جيوش المرتزقة المتمردين وأعاد النظام.'
          },
          {
            date: '237 ق.م.',
            title: 'الرحيل إلى إيبيريا',
            description: 'قاد قواته المخضرمة إلى إسبانيا وأسس أكرا ليوكي. بدأ بناء الإمبراطورية البرقية في إيبيريا التي ستصبح قاعدة انطلاق حنبعل نحو إيطاليا.'
          }
        ]
      },
      grandQuote: 'لم أسلّم سلاحي لأي إنسان؛ أغادر هذه الشواطئ بكرامة الأسد.',
      cta: {
        maps: 'عرض خرائط الأرشيف',
        legacy: 'إرث البرقيين'
      }
    }
  }

  if (lang === 'en') {
    return {
      hero: {
        title: 'Hamilcar Barca — The Lightning that Terrified Rome',
        dates: '~275–228 BC',
        epithet: 'The Lion of Carthage',
        subtitle: 'Undefeated general, father of a dynasty',
        quote: 'The man who birthed an empire from the ashes of defeat, whose lightning strikes in Sicily became the nightmare of the Roman Republic.'
      },
      undefeated: {
        title: 'The Undefeated',
        intro: 'Throughout his campaign in Sicily, Hamilcar Barca was never defeated in battle. He mastered the art of guerrilla warfare, inflicting devastating losses on the Roman legions while keeping his own forces intact.',
        body: 'Operating from fortified strongholds in the mountains of Sicily, Hamilcar launched daring raids on Roman positions and supply lines. His tactics made the Roman occupation of Sicily costly and bloody, forcing Rome to spend enormous resources just to maintain their positions.',
        correction: {
          label: 'Historical Correction',
          title: 'The Myth of the Sicilian Defeat',
          text: 'Roman narratives claim Hamilcar was driven from Sicily. Reality: his guerrilla campaign was so successful that he remained unbeaten when the war officially ended. He only surrendered his command because Carthage lost its fleet at the Aegates Islands.'
        }
      },
      achievements: {
        title: 'Monumental Achievements',
        cards: [
          {
            icon: '🏛️',
            title: 'Salvage of Carthage',
            text: 'During the Mercenary War, Hamilcar crushed the revolt that nearly destroyed Carthage. With brilliant tactics and relentless brutality, he defeated the numerically superior mercenary armies and saved the city from annihilation.'
          },
          {
            icon: '⚔️',
            title: 'The Barca Army',
            text: 'Built the legendary Barcid military machine — a professional army loyal to the Barca family rather than the Carthaginian senate. This force would become the instrument Hannibal later used to invade Italy.'
          },
          {
            icon: '🗺️',
            title: 'Iberian Conquest',
            text: 'Turned his gaze to the silver mines of Iberia, establishing a new Barcid empire in Spain. The wealth from Spanish mines funded the rebuilding of Carthaginian military power.'
          },
          {
            icon: '🩸',
            title: 'The Blood Oath',
            text: 'Made young Hannibal swear eternal enmity toward Rome. This sacred oath, taken before the gods of Carthage, shaped the destiny of the Mediterranean for generations to come.'
          }
        ]
      },
      timeline: {
        title: 'Thread of Time',
        events: [
          {
            date: '247 BC',
            title: 'Sicily Command',
            description: 'Appointed commander in Sicily, began his "Lightning" campaign. From his fortress on Mount Ercte, he launched a series of devastating raids that terrorized Roman garrisons.'
          },
          {
            date: '240–238 BC',
            title: 'Mercenary War',
            description: 'Saved Carthage from its own mutinous mercenaries. In a brutal campaign known as the "Truceless War," Hamilcar crushed the rebel mercenary armies and restored order.'
          },
          {
            date: '237 BC',
            title: 'Iberian Departure',
            description: 'Led veteran troops into Spain, founds Akra Leuke. Began building the Barcid empire in Iberia that would become the launching pad for Hannibal\'s invasion of Italy.'
          }
        ]
      },
      grandQuote: 'I have not surrendered my arms to any man; I leave these shores with the dignity of a lion.',
      cta: {
        maps: 'View Archive Maps',
        legacy: 'The Barca Legacy'
      }
    }
  }

  // Default: French
  return {
    hero: {
      title: "Hamilcar Barca — L'Éclair qui Terrifia Rome",
      dates: '~275–228 av. J.-C.',
      epithet: 'Le Lion de Carthage',
      subtitle: "Général invaincu, père d'une dynastie",
      quote: "The man who birthed an empire from the ashes of defeat, whose lightning strikes in Sicily became the nightmare of the Roman Republic."
    },
    undefeated: {
      title: "L'Invaincu",
      intro: "Tout au long de sa campagne en Sicile, Hamilcar Barca ne fut jamais vaincu au combat. Il maîtrisa l'art de la guérilla, infligeant des pertes dévastatrices aux légions romaines tout en préservant ses propres forces.",
      body: "Opérant depuis des bastions fortifiés dans les montagnes de Sicile, Hamilcar lançait des raids audacieux sur les positions romaines et les lignes d'approvisionnement. Ses tactiques rendirent l'occupation romaine de la Sicile coûteuse et sanglante, forçant Rome à dépenser d'énormes ressources pour simplement maintenir ses positions.",
      correction: {
        label: 'Correction Historique',
        title: 'Le Mythe de la Défaite Sicilienne',
        text: "Les récits romains prétendent qu'Hamilcar fut chassé de Sicile. Réalité : sa campagne de guérilla fut si réussie qu'il resta invaincu lorsque la guerre prit officiellement fin. Il ne rendit son commandement que parce que Carthage perdit sa flotte aux îles Égates."
      }
    },
    achievements: {
      title: 'Réalisations Monumentales',
      cards: [
        {
          icon: '🏛️',
          title: 'Le Sauvetage de Carthage',
          text: "Pendant la Guerre des Mercenaires, Hamilcar écrasa la révolte qui faillit détruire Carthage. Avec des tactiques brillantes et une brutalité implacable, il vainquit les armées mercenaires numériquement supérieures et sauva la cité de l'anéantissement."
        },
        {
          icon: '⚔️',
          title: "L'Armée Barca",
          text: "Bâtit la légendaire machine militaire barcide — une armée professionnelle loyale à la famille Barca plutôt qu'au sénat carthaginois. Cette force devint l'instrument qu'Hannibal utilisa plus tard pour envahir l'Italie."
        },
        {
          icon: '🗺️',
          title: "La Conquête Ibérique",
          text: "Tourna son regard vers les mines d'argent d'Ibérie, établissant un nouvel empire barcide en Espagne. Les richesses des mines espagnoles financèrent la reconstruction de la puissance militaire carthaginoise."
        },
        {
          icon: '🩸',
          title: 'Le Serment de Sang',
          text: "Fit jurer au jeune Hannibal une inimitié éternelle envers Rome. Ce serment sacré, prononcé devant les dieux de Carthage, façonna le destin de la Méditerranée pour les générations à venir."
        }
      ]
    },
    timeline: {
      title: 'Le Fil du Temps',
      events: [
        {
          date: '247 av. J.-C.',
          title: 'Commandement en Sicile',
          description: "Nommé commandant en Sicile, il commença sa campagne \"Éclair\". Depuis sa forteresse du mont Ercté, il lança une série de raids dévastateurs qui terrorisèrent les garnisons romaines."
        },
        {
          date: '240–238 av. J.-C.',
          title: 'Guerre des Mercenaires',
          description: "Sauva Carthage de ses propres mercenaires mutinés. Dans une campagne brutale connue sous le nom de \"Guerre Inexpiable\", Hamilcar écrasa les armées mercenaires rebelles et rétablit l'ordre."
        },
        {
          date: '237 av. J.-C.',
          title: 'Départ pour l\'Ibérie',
          description: "Mena ses troupes vétéranes en Espagne et fonda Akra Leukè. Il commença à bâtir l'empire barcide en Ibérie qui deviendrait la base de lancement de l'invasion de l'Italie par Hannibal."
        }
      ]
    },
    grandQuote: "Je n'ai rendu mes armes à aucun homme ; je quitte ces rivages avec la dignité d'un lion.",
    cta: {
      maps: "Voir les Cartes d'Archives",
      legacy: "L'Héritage Barca"
    }
  }
})
</script>

<style scoped>
/* ===== Base ===== */
.hamilcar-page {
  background-color: var(--color-navy);
  color: #e0ddd5;
  font-family: var(--font-body);
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section {
  padding: 6rem 0;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 2.4rem;
  color: var(--color-gold);
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: 0.05em;
}

/* ===== Hero Section ===== */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  transform: scale(1.05);
  filter: brightness(0.3) saturate(0.7);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(26, 26, 46, 0.6) 0%,
    rgba(26, 26, 46, 0.85) 60%,
    var(--color-navy) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  padding: 2rem;
}

.hero-epithet {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
  padding: 0.4rem 1.5rem;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 3.2rem;
  color: var(--color-gold-light);
  line-height: 1.2;
  margin: 1rem 0;
  letter-spacing: 0.02em;
}

.hero-dates {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  color: var(--color-gold);
  opacity: 0.8;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: #c0bdb5;
  font-style: italic;
  margin-bottom: 2rem;
}

.hero-quote {
  border-left: 3px solid var(--color-gold);
  padding: 1rem 1.5rem;
  margin: 2rem auto 0;
  max-width: 700px;
  text-align: start;
}

[dir="rtl"] .hero-quote {
  border-left: none;
  border-right: 3px solid var(--color-gold);
}

.hero-quote p {
  font-style: italic;
  font-size: 1.05rem;
  color: #b0ada5;
  line-height: 1.7;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  font-size: 1.5rem;
  color: var(--color-gold);
  opacity: 0.6;
  animation: pulse-down 2s ease-in-out infinite;
}

@keyframes pulse-down {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.6; }
  50% { transform: translateX(-50%) translateY(8px); opacity: 1; }
}

/* ===== Undefeated Section ===== */
.undefeated-section {
  background: linear-gradient(180deg, var(--color-navy) 0%, var(--color-navy-light) 100%);
}

.two-column {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: start;
}

.column-text .lead-text {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--color-gold-light);
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.column-text p {
  font-size: 1rem;
  line-height: 1.8;
  color: #c0bdb5;
  margin-bottom: 2rem;
}

.correction-box {
  background: rgba(107, 29, 42, 0.2);
  border: 1px solid var(--color-burgundy);
  border-radius: 8px;
  padding: 1.5rem 2rem;
  margin-top: 1rem;
}

.correction-label {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-burgundy);
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.correction-title {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  color: var(--color-gold);
  margin-bottom: 0.75rem;
}

.correction-box p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #c0bdb5;
  margin-bottom: 0;
}

.portrait-frame {
  position: relative;
  border: 2px solid var(--color-gold);
  padding: 8px;
  background: rgba(201, 168, 76, 0.05);
}

.portrait-frame img {
  width: 100%;
  display: block;
  filter: sepia(0.3) contrast(1.1);
}

.portrait-dates {
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--color-navy);
  padding: 0.5rem 1.5rem;
  border: 1px solid var(--color-gold);
}

.portrait-dates span {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: var(--color-gold);
  letter-spacing: 0.1em;
}

.date-separator {
  opacity: 0.5;
}

/* ===== Achievements Bento Grid ===== */
.achievements-section {
  background: var(--color-navy);
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.bento-card {
  background: var(--color-navy-light);
  border: 1px solid rgba(201, 168, 76, 0.15);
  border-radius: 12px;
  padding: 2.5rem 2rem;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.bento-card:hover {
  border-color: var(--color-gold);
  transform: translateY(-4px);
}

.bento-card-1 {
  border-top: 3px solid var(--color-burgundy);
}

.bento-card-2 {
  border-top: 3px solid var(--color-gold);
}

.bento-card-3 {
  border-top: 3px solid var(--color-burgundy);
}

.bento-card-4 {
  border-top: 3px solid var(--color-gold);
}

.bento-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.bento-title {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  color: var(--color-gold);
  margin-bottom: 0.75rem;
}

.bento-text {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #b0ada5;
}

/* ===== Timeline Section ===== */
.timeline-section {
  background: linear-gradient(180deg, var(--color-navy) 0%, var(--color-navy-light) 100%);
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding-inline-start: 3rem;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  inset-inline-start: 0.6rem;
  width: 2px;
  background: linear-gradient(180deg, var(--color-gold), var(--color-burgundy));
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  inset-inline-start: -2.65rem;
  top: 0.3rem;
  width: 14px;
  height: 14px;
  background: var(--color-gold);
  border-radius: 50%;
  border: 3px solid var(--color-navy);
  box-shadow: 0 0 0 2px var(--color-gold);
}

.timeline-date {
  font-family: var(--font-heading);
  font-size: 1rem;
  color: var(--color-gold);
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.timeline-content h3 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  color: var(--color-gold-light);
  margin-bottom: 0.5rem;
}

.timeline-content p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #b0ada5;
}

/* ===== Quote Section ===== */
.quote-section {
  background: var(--color-navy);
  padding: 8rem 0;
}

.grand-quote {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.grand-quote::before {
  content: '\201C';
  font-family: var(--font-heading);
  font-size: 8rem;
  color: var(--color-gold);
  opacity: 0.2;
  position: absolute;
  top: -4rem;
  left: 50%;
  transform: translateX(-50%);
  line-height: 1;
}

.grand-quote p {
  font-family: var(--font-body);
  font-style: italic;
  font-size: 1.6rem;
  line-height: 1.8;
  color: var(--color-gold);
  letter-spacing: 0.02em;
}

/* ===== CTA Section ===== */
.cta-section {
  background: var(--color-navy-light);
  padding: 5rem 0;
}

.cta-content {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.cta-button {
  font-family: var(--font-heading);
  font-size: 1rem;
  letter-spacing: 0.1em;
  padding: 1rem 2.5rem;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.cta-primary {
  background: var(--color-gold);
  color: var(--color-navy);
  border: 2px solid var(--color-gold);
}

.cta-primary:hover {
  background: transparent;
  color: var(--color-gold);
}

.cta-secondary {
  background: transparent;
  color: var(--color-gold);
  border: 2px solid var(--color-burgundy);
}

.cta-secondary:hover {
  background: var(--color-burgundy);
  color: #e0ddd5;
  border-color: var(--color-burgundy);
}

/* ===== RTL Adjustments ===== */
[dir="rtl"] .correction-box {
  text-align: right;
}

[dir="rtl"] .timeline {
  padding-inline-start: 3rem;
  padding-inline-end: 0;
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 2.4rem;
  }

  .two-column {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .column-portrait {
    max-width: 400px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .section {
    padding: 4rem 0;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-epithet {
    font-size: 0.75rem;
  }

  .hero-dates {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .bento-grid {
    grid-template-columns: 1fr;
  }

  .bento-card {
    padding: 2rem 1.5rem;
  }

  .grand-quote p {
    font-size: 1.2rem;
  }

  .grand-quote::before {
    font-size: 5rem;
    top: -2.5rem;
  }

  .cta-button {
    width: 100%;
    text-align: center;
  }

  .cta-content {
    flex-direction: column;
    align-items: center;
  }

  .quote-section {
    padding: 5rem 0;
  }

  .container {
    padding: 0 1.25rem;
  }

  .portrait-dates span {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.5rem;
  }

  .hero-quote {
    padding: 0.75rem 1rem;
  }

  .hero-quote p {
    font-size: 0.9rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .timeline {
    padding-inline-start: 2.5rem;
  }

  .correction-box {
    padding: 1.25rem 1.5rem;
  }
}
</style>
