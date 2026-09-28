<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <figure class="fig fig--hero s-5">
        <img src="/img/hamilcar.jpg" :alt="c.heroAlt" style="object-position:50% 25%">
        <figcaption>{{ c.heroCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--purple tile--stack tile--hero s-7">
        <div class="hero-top">
          <span class="chip chip--glass">{{ c.chip }}</span>
          <span class="phoen hero-phoen" aria-hidden="true">𐤁𐤓𐤒</span>
        </div>
        <div>
          <span class="kicker">{{ c.dates }}</span>
          <h1 class="h-display">{{ c.title }}</h1>
          <p class="epithet">{{ c.epithet }}</p>
          <p class="lede">{{ c.lede }}</p>
        </div>
      </div>
    </div>

    <!-- Chiffres clés -->
    <div class="cols cols-4">
      <div v-for="(s, i) in c.stats" :key="i" class="tile">
        <div class="num" :class="{ 'n-accent': i === 0 }">{{ s.n }}</div>
        <p class="stat-t">{{ s.t }}</p>
      </div>
    </div>

    <!-- Chronologie -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <span class="kicker">{{ c.chrono.kicker }}</span>
        <h2 class="h-section chrono-title">{{ c.chrono.title }}</h2>
        <div class="rows" style="--row-key:170px">
          <div v-for="r in c.chrono.rows" :key="r.k">
            <span class="key">{{ r.k }}</span>
            <span class="val"><strong>{{ r.t }}</strong> — {{ r.d }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Sicile -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.sicily.title }}</h2>
        <p>{{ c.sicily.aside }}</p>
      </div>
    </section>
    <div class="cols cols-7-5">
      <div class="tile tile--xl">
        <span class="kicker">{{ c.sicily.kicker }}</span>
        <p v-for="(p, i) in c.sicily.paras" :key="i" class="body-lg para">{{ p }}</p>
      </div>
      <div class="tile tile--xl tile--outline tile--paper tile--stack">
        <div>
          <span class="kicker">{{ c.sicily.corr.label }}</span>
          <h3 class="h-card">{{ c.sicily.corr.title }}</h3>
          <p class="body">{{ c.sicily.corr.text }}</p>
        </div>
        <div class="chips">
          <span v-for="t in c.sicily.corr.chips" :key="t" class="chip chip--white">{{ t }}</span>
        </div>
      </div>
    </div>

    <!-- Guerre des Mercenaires -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <div class="tile tile--xl tile--terra tile--stack">
          <div>
            <span class="kicker">{{ c.merc.kicker }}</span>
            <h2 class="h-block merc-title">{{ c.merc.title }}</h2>
            <p class="body-lg">{{ c.merc.intro }}</p>
          </div>
          <p class="merc-note">{{ c.merc.note }}</p>
        </div>
        <div class="tile tile--xl tile--sand">
          <div class="steps">
            <div v-for="(s, i) in c.merc.steps" :key="i" class="step">
              <span class="step-n" aria-hidden="true">{{ i + 1 }}</span>
              <div>
                <h3 class="h-card">{{ s.t }}</h3>
                <p class="body">{{ s.d }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hispanie -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.iberia.title }}</h2>
        <p>{{ c.iberia.aside }}</p>
      </div>
    </section>
    <div class="bento iberia">
      <figure class="fig s-5 iberia-fig">
        <img src="/img/wall-cartagena.jpg" :alt="c.iberia.wallAlt" loading="lazy">
        <figcaption class="cap-box">{{ c.iberia.wallCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--olive s-7">
        <span class="kicker">{{ c.iberia.kicker }}</span>
        <p v-for="(p, i) in c.iberia.paras" :key="i" class="body-lg para">{{ p }}</p>
      </div>
      <figure class="fig s-6 keep-half coin-fig coin-photo">
        <img src="/img/coin-elephant.jpg" :alt="c.iberia.coin1Alt" loading="lazy">
        <figcaption class="cap-box">{{ c.iberia.coin1Cap }}</figcaption>
      </figure>
      <figure class="fig s-6 keep-half coin-fig">
        <img src="/img/quarter-shekel.jpg" :alt="c.iberia.coin2Alt" loading="lazy">
        <figcaption class="cap-box">{{ c.iberia.coin2Cap }}</figcaption>
      </figure>
    </div>

    <!-- Le serment -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <figure class="fig oath-fig">
          <img src="/img/oath.jpg" :alt="c.oath.alt" loading="lazy">
          <figcaption>{{ c.oath.cap }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--paper tile--outline tile--stack">
          <div>
            <span class="kicker">{{ c.oath.kicker }}</span>
            <h2 class="h-block oath-title">{{ c.oath.title }}</h2>
            <blockquote class="quote">
              <p>{{ c.oath.quote }}</p>
              <cite>{{ c.oath.cite }}</cite>
            </blockquote>
          </div>
          <p class="body">{{ c.oath.text }}</p>
        </div>
      </div>
    </section>

    <!-- Voix antiques -->
    <section class="sec sec--wide">
      <h2 class="h-section sec-title">{{ c.voices.title }}</h2>
    </section>
    <div class="cols cols-3">
      <figure v-for="(q, i) in c.voices.items" :key="i" class="tile tile--xl quote-tile" :class="i === 1 ? 'tile--outline' : 'tile--paper'">
        <blockquote class="quote">
          <p>{{ q.q }}</p>
        </blockquote>
        <figcaption><cite>{{ q.cite }}</cite></figcaption>
      </figure>
    </div>

    <!-- Héritage -->
    <section class="sec">
      <div class="tile tile--xl tile--navy">
        <span class="kicker">{{ c.legacy.kicker }}</span>
        <h2 class="h-block legacy-title">{{ c.legacy.title }}</h2>
        <div class="cols cols-3 cols--flush legacy-grid">
          <div v-for="(l, i) in c.legacy.items" :key="i" class="legacy-item">
            <h3 class="h-card">{{ l.t }}</h3>
            <p class="body">{{ l.d }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- La famille / liens -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.family.title }}</h2>
        <NuxtLink :to="localePath('/biographies')" class="btn btn-outline">{{ c.family.all }} →</NuxtLink>
      </div>
    </section>
    <div class="cols cols-3">
      <NuxtLink v-for="f in c.family.items" :key="f.to" :to="localePath(f.to)" class="tile tile--stack fam" :class="f.tone">
        <div>
          <span class="kicker">{{ f.k }}</span>
          <h3 class="h-card">{{ f.t }}</h3>
          <p class="body">{{ f.d }}</p>
        </div>
        <span class="more">{{ c.family.more }} →</span>
      </NuxtLink>
    </div>
    <div class="cols links">
      <NuxtLink v-for="l in c.family.links" :key="l.to" :to="localePath(l.to)" class="btn btn-outline">{{ l.l }} →</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const C = {
  fr: {
    metaTitle: 'Hamilcar Barca (~275 – 229/228 av. J.-C.) — la Foudre de Carthage',
    metaDesc: "Hamilcar Barca : invaincu en Sicile (Heircté, Éryx), vainqueur de la guerre des Mercenaires à la Scie, conquérant de l'Hispanie, père d'Hannibal et auteur du serment contre Rome.",
    heroAlt: 'Portrait imaginaire d\'Hamilcar Barca',
    heroCap: 'Hamilcar Barca, portrait imaginaire',
    chip: 'Biographie · Les Barcides',
    dates: '~275 – 229/228 av. J.-C.',
    title: 'Hamilcar Barca',
    epithet: 'Barca, « la Foudre » — général invaincu, père d\'une dynastie',
    lede: "Invaincu en Sicile, sauveur de Carthage pendant la guerre des Mercenaires, bâtisseur d'un nouvel empire en Hispanie : l'homme qui fit de sa défaite le point de départ de la revanche — et qui fit jurer à son fils Hannibal de ne jamais être l'ami de Rome.",
    stats: [
      { n: '6 ans', t: 'de guerre en Sicile (247–241) sans jamais être battu' },
      { n: '3 ans', t: 'et quatre mois de guerre « inexpiable » contre les mercenaires (Polybe)' },
      { n: '40 000', t: 'mercenaires anéantis au défilé de la Scie, selon Polybe' },
      { n: '9 ans', t: "de conquête en Hispanie (237–229/228) ; c'est aussi l'âge d'Hannibal au serment" }
    ],
    chrono: {
      kicker: 'Chronologie',
      title: 'Une vie en dix dates',
      rows: [
        { k: '~275', t: 'Naissance', d: "Dans l'aristocratie carthaginoise. Son surnom, Barca, viendrait du punique baraq, « l'éclair », « la foudre »." },
        { k: '247', t: 'Commandement en Sicile', d: "Nommé à la tête des forces puniques en Sicile, il débarque près de Panormos (Palerme) et s'installe sur le mont Heircté. La même année naît son fils Hannibal." },
        { k: '247–244', t: 'La guerre depuis l\'Heircté', d: "Depuis cette forteresse naturelle, il harcèle les Romains en Sicile et lance sa flotte contre les côtes du sud de l'Italie." },
        { k: '244–241', t: 'Éryx', d: "Il s'empare par surprise de la ville d'Éryx, prise en étau entre une garnison romaine au sommet et le camp romain en contrebas, et s'y maintient jusqu'à la fin de la guerre." },
        { k: '241', t: 'Les îles Égates', d: "Le 10 mars, la flotte de secours carthaginoise est détruite par Lutatius Catulus. Chargé de négocier, Hamilcar refuse de livrer ses armes : la paix coûte la Sicile et 3 200 talents en dix ans." },
        { k: '241–237', t: 'La guerre des Mercenaires', d: "Les soldats impayés se révoltent, rejoints par les villes libyennes. Rappelé au commandement, Hamilcar les écrase au défilé de la Scie, puis devant Tunis." },
        { k: '238/237', t: 'Le coup de la Sardaigne', d: "Profitant de la crise, Rome s'empare de la Sardaigne et exige 1 200 talents de plus. L'humiliation nourrit la rancœur des Barcides." },
        { k: '237', t: 'Départ pour Gadès', d: "Il gagne l'Hispanie avec son fils Hannibal, âgé de neuf ans, et son gendre Hasdrubal. Avant le départ, Hannibal prête serment." },
        { k: '237–229', t: 'La conquête de l\'Hispanie', d: "Soumission des Turdétans et des peuples du Sud, contrôle des mines d'argent, fondation d'Akra Leukè. En 231, il répond à une ambassade romaine qu'il combat pour payer l'indemnité due à Rome (Dion Cassius)." },
        { k: '229/228', t: 'Mort devant Héliké', d: "Trahi par le roi des Orissi pendant le siège d'Héliké, il se noie dans une rivière en couvrant la fuite de ses fils. Son gendre Hasdrubal lui succède." }
      ]
    },
    sicily: {
      title: "L'éclair de Sicile",
      aside: 'Heircté (247–244), puis Éryx (244–241) : sept ans de guérilla dans une île presque entièrement romaine.',
      kicker: "L'invaincu",
      paras: [
        "Tout au long de sa campagne en Sicile, Hamilcar Barca ne fut jamais vaincu au combat. Il maîtrisa l'art de la guérilla, infligeant des pertes sévères aux légions romaines tout en préservant ses propres forces.",
        "Opérant depuis des bastions de montagne — le mont Heircté au-dessus de Palerme, puis Éryx à l'ouest de l'île —, il lançait des raids audacieux sur les positions romaines et les lignes d'approvisionnement, tandis que sa flotte ravageait les côtes du Bruttium. Ses tactiques rendirent l'occupation romaine de la Sicile coûteuse et sanglante, forçant Rome à immobiliser des armées entières pour simplement tenir ses positions.",
        "Polybe, qui écrit pourtant du point de vue romain, le tient pour le meilleur général de toute la guerre, par l'intelligence comme par l'audace."
      ],
      corr: {
        label: 'Correction historique',
        title: 'Le mythe de la défaite sicilienne',
        text: "On présente souvent Hamilcar comme chassé de Sicile. En réalité, il était invaincu lorsque la guerre prit fin : il ne rendit la Sicile que parce que Carthage avait perdu sa flotte aux îles Égates et ne pouvait plus le ravitailler. Chargé de négocier, il refusa de livrer ses armes et ses hommes quittèrent l'île en soldats, non en prisonniers.",
        chips: ['Heircté', 'Éryx', 'Égates, 241', 'Lutatius Catulus']
      }
    },
    merc: {
      kicker: 'La guerre « inexpiable » · 241–237',
      title: 'Sauver Carthage de sa propre armée',
      intro: "Rentrés de Sicile, quelque 20 000 mercenaires réclament leur solde. Carthage, ruinée par l'indemnité, tergiverse : c'est la révolte, bientôt rejointe par les villes libyennes lassées du tribut. La cité est assiégée chez elle, et son premier général, Hannon, échoue. On rappelle Hamilcar.",
      note: "Polybe appelle ce conflit la guerre « inexpiable » tant les atrocités y furent extrêmes. Flaubert en a fait le décor de Salammbô (1862).",
      steps: [
        { t: 'Les chefs rebelles', d: "Spendios, un esclave campanien évadé, et Mathos, un Libyen, prennent la tête de la révolte ; Utique et Hippou Akra sont assiégées." },
        { t: 'Le passage du Bagradas', d: "Avec 10 000 hommes et 70 éléphants, Hamilcar franchit le fleuve à son embouchure par un gué que le vent découvre et bat les rebelles. Le prince numide Naravas passe dans son camp avec 2 000 cavaliers." },
        { t: 'Le supplice de Giscon', d: "Les rebelles mutilent et mettent à mort Giscon et quelque 700 prisonniers carthaginois : désormais, aucune grâce ne sera accordée de part et d'autre." },
        { t: 'Le défilé de la Scie', d: "Hamilcar enferme l'armée de Spendios dans un défilé montagneux, la Scie (Prion). Affamés au point de se dévorer entre eux, les rebelles envoient leurs chefs négocier ; Hamilcar les retient et anéantit l'armée : plus de 40 000 morts selon Polybe." },
        { t: 'Tunis et la fin de Mathos', d: "Spendios est crucifié devant Tunis. Mathos, vaincu dans une dernière bataille, est capturé et exécuté à Carthage. La cité est sauvée — mais Rome a profité de la crise pour prendre la Sardaigne." }
      ]
    },
    iberia: {
      title: "L'empire d'Hispanie",
      aside: "Privée de la Sicile et de la Sardaigne, Carthage trouve en Hispanie de l'argent, des hommes et une base.",
      kicker: 'La conquête · 237–229/228',
      paras: [
        "En 237, Hamilcar débarque à Gadès (Cadix), vieille cité phénicienne. En neuf ans, par la guerre et la diplomatie, il soumet les Turdétans et les peuples du Sud — Diodore évoque les chefs Istolatios et Indortès — et prend le contrôle des riches mines d'argent de la Sierra Morena.",
        "Il y bâtit la machine militaire barcide : une armée professionnelle, aguerrie, loyale à la famille Barca autant qu'au Sénat de Carthage. Cette force deviendra l'instrument avec lequel Hannibal envahira l'Italie.",
        "Il fonde Akra Leukè, « le Cap blanc » (peut-être près d'Alicante), et fait frapper des monnaies d'argent de grande qualité. Aux envoyés romains venus s'inquiéter en 231, il répond qu'il combat les Ibères pour payer ce que Carthage doit à Rome."
      ],
      wallAlt: 'Vestiges de la muraille punique de Carthagène',
      wallCap: "Muraille punique de Carthagène (Qart Hadasht), la ville fondée par son gendre Hasdrubal sur les bases de sa conquête.",
      coin1Alt: 'Shekel barcide à l\'éléphant',
      coin1Cap: "Shekel barcide frappé en Hispanie : l'éléphant, emblème de la puissance militaire des Barca.",
      coin2Alt: 'Quart de shekel barcide',
      coin2Cap: "Quart de shekel barcide : l'argent des mines ibériques paie les armées et l'indemnité due à Rome."
    },
    oath: {
      alt: 'Le jeune Hannibal prêtant serment devant son père',
      cap: 'Le serment d\'Hannibal, vu par un artiste moderne',
      kicker: '237 av. J.-C. · Carthage',
      title: 'Le serment',
      quote: "« Mon père, au moment de partir pour l'Ibérie avec son armée, offrait un sacrifice. Il me fit approcher de l'autel, me fit poser la main sur la victime et jurer de ne jamais être l'ami des Romains. »",
      cite: "Hannibal au roi Antiochos, d'après Polybe, Histoires, III, 11",
      text: "Tite-Live reprend la scène (XXI, 1) : l'enfant, âgé de neuf ans, supplie son père de l'emmener et jure « d'être l'ennemi du peuple romain dès qu'il le pourrait ». Ce serment, prêté devant les dieux de Carthage, allait façonner le destin de la Méditerranée pour une génération."
    },
    voices: {
      title: 'Ce que disent les Anciens',
      items: [
        { q: "« Le meilleur général de cette guerre, par l'intelligence comme par l'audace, fut Hamilcar, surnommé Barca. »", cite: 'Polybe, Histoires, I, 64' },
        { q: "« Aucun roi ne méritait d'être comparé à Épaminondas, Périclès, Thémistocle, Manius Curius ou Hamilcar Barca. »", cite: "Caton l'Ancien, selon Plutarque, Vie de Caton, 8" },
        { q: "Regardant ses fils encore enfants, Hamilcar disait qu'il élevait des lionceaux pour la perte de l'empire romain.", cite: 'Valère Maxime, Faits et dits mémorables, IX, 3' }
      ]
    },
    legacy: {
      kicker: 'Héritage',
      title: 'Le père de la revanche',
      items: [
        { t: "L'armée barcide", d: "Une armée de métier, forgée en Sicile, en Afrique et en Hispanie, liée à la famille Barca : l'outil de Cannes." },
        { t: "L'Hispanie punique", d: "Mines d'argent, alliances ibères, villes nouvelles : la base qui permet à Carthage de se relever et à Hannibal de marcher sur Rome." },
        { t: 'Une dynastie', d: "Hannibal, Hasdrubal, Magon et son gendre Hasdrubal le Beau poursuivent son œuvre. Polybe voit dans sa colère l'une des causes de la deuxième guerre punique." }
      ]
    },
    family: {
      title: 'La famille Barca',
      all: 'Tous les personnages',
      more: 'Lire la biographie',
      items: [
        { to: '/hannibal', tone: 'tile--ink', k: 'Fils aîné · 247 – 183', t: 'Hannibal Barca', d: 'Le serment tenu : les Alpes, Trasimène, Cannes, puis Zama.' },
        { to: '/hasdrubal', tone: 'tile--purple', k: 'Le gendre et le fils', t: 'Les deux Hasdrubal', d: "Hasdrubal le Beau, fondateur de Carthagène, et Hasdrubal Barca, tué au Métaure." },
        { to: '/magon-barca', tone: 'tile--terra', k: 'Le cadet · ~243 – 203', t: 'Magon Barca', d: "L'embuscade de la Trébie, les anneaux de Cannes, la Ligurie." }
      ],
      links: [
        { to: '/tactiques', l: 'Les tactiques puniques' },
        { to: '/carte', l: 'La carte animée' }
      ]
    }
  },
  en: {
    metaTitle: 'Hamilcar Barca (c. 275 – 229/228 BC) — the Thunderbolt of Carthage',
    metaDesc: 'Hamilcar Barca: undefeated in Sicily (Heircte, Eryx), victor of the Mercenary War at the Saw, conqueror of Hispania, father of Hannibal and author of the oath against Rome.',
    heroAlt: 'Imaginary portrait of Hamilcar Barca',
    heroCap: 'Hamilcar Barca, imaginary portrait',
    chip: 'Biography · The Barcids',
    dates: 'c. 275 – 229/228 BC',
    title: 'Hamilcar Barca',
    epithet: 'Barca, “the Thunderbolt” — undefeated general, father of a dynasty',
    lede: 'Undefeated in Sicily, saviour of Carthage in the Mercenary War, builder of a new empire in Hispania: the man who turned defeat into the starting point of revenge — and who made his son Hannibal swear never to be a friend of Rome.',
    stats: [
      { n: '6 yrs', t: 'of war in Sicily (247–241) without ever being beaten' },
      { n: '3 yrs', t: 'and four months of “truceless” war against the mercenaries (Polybius)' },
      { n: '40,000', t: 'mercenaries wiped out at the pass of the Saw, according to Polybius' },
      { n: '9 yrs', t: 'of conquest in Hispania (237–229/228) — also Hannibal’s age at the oath' }
    ],
    chrono: {
      kicker: 'Timeline',
      title: 'A life in ten dates',
      rows: [
        { k: 'c. 275', t: 'Birth', d: 'Into the Carthaginian aristocracy. His surname, Barca, probably comes from the Punic baraq, “lightning”, “thunderbolt”.' },
        { k: '247', t: 'Command in Sicily', d: 'Appointed to lead the Punic forces in Sicily, he lands near Panormus (Palermo) and seizes Mount Heircte. His son Hannibal is born the same year.' },
        { k: '247–244', t: 'War from Heircte', d: 'From this natural fortress he harasses the Romans in Sicily and sends his fleet against the coasts of southern Italy.' },
        { k: '244–241', t: 'Eryx', d: 'He takes the town of Eryx by surprise, caught between a Roman garrison on the summit and a Roman camp below, and holds it until the end of the war.' },
        { k: '241', t: 'The Aegates Islands', d: 'On 10 March the Carthaginian relief fleet is destroyed by Lutatius Catulus. Charged with negotiating, Hamilcar refuses to hand over his arms: peace costs Sicily and 3,200 talents over ten years.' },
        { k: '241–237', t: 'The Mercenary War', d: 'Unpaid soldiers revolt, joined by the Libyan towns. Recalled to command, Hamilcar crushes them at the pass of the Saw, then before Tunis.' },
        { k: '238/237', t: 'The Sardinian grab', d: 'Exploiting the crisis, Rome seizes Sardinia and demands 1,200 more talents. The humiliation feeds the Barcids’ resentment.' },
        { k: '237', t: 'Departure for Gades', d: 'He sails for Hispania with his nine-year-old son Hannibal and his son-in-law Hasdrubal. Before leaving, Hannibal swears his oath.' },
        { k: '237–229', t: 'The conquest of Hispania', d: 'He subdues the Turdetani and the southern peoples, takes the silver mines and founds Akra Leuke. In 231 he tells a Roman embassy he is fighting to pay the indemnity owed to Rome (Cassius Dio).' },
        { k: '229/228', t: 'Death before Helice', d: 'Betrayed by the king of the Orissi during the siege of Helice, he drowns in a river while covering his sons’ escape. His son-in-law Hasdrubal succeeds him.' }
      ]
    },
    sicily: {
      title: 'The lightning of Sicily',
      aside: 'Heircte (247–244), then Eryx (244–241): seven years of guerrilla war on an island almost entirely in Roman hands.',
      kicker: 'The undefeated',
      paras: [
        'Throughout his campaign in Sicily, Hamilcar Barca was never defeated in battle. He mastered the art of guerrilla warfare, inflicting heavy losses on the Roman legions while keeping his own forces intact.',
        'Operating from mountain strongholds — Mount Heircte above Palermo, then Eryx in the west of the island — he launched daring raids on Roman positions and supply lines, while his fleet ravaged the coast of Bruttium. His tactics made the Roman occupation of Sicily costly and bloody, forcing Rome to tie down whole armies just to hold its ground.',
        'Polybius, though writing from the Roman side, rates him the best general of the whole war, for judgement as well as daring.'
      ],
      corr: {
        label: 'Historical correction',
        title: 'The myth of the Sicilian defeat',
        text: 'Hamilcar is often said to have been driven out of Sicily. In fact he was still unbeaten when the war ended: he gave up Sicily only because Carthage had lost its fleet at the Aegates Islands and could no longer supply him. Charged with negotiating, he refused to surrender his arms, and his men left the island as soldiers, not prisoners.',
        chips: ['Heircte', 'Eryx', 'Aegates, 241', 'Lutatius Catulus']
      }
    },
    merc: {
      kicker: 'The “truceless” war · 241–237',
      title: 'Saving Carthage from its own army',
      intro: 'Back from Sicily, some 20,000 mercenaries demand their pay. Carthage, drained by the indemnity, stalls: revolt breaks out, soon joined by Libyan towns weary of tribute. The city is besieged at home, and its first general, Hanno, fails. Hamilcar is recalled.',
      note: 'Polybius calls it the “truceless” war, so extreme were its atrocities. Flaubert used it as the setting of Salammbô (1862).',
      steps: [
        { t: 'The rebel leaders', d: 'Spendius, a runaway Campanian slave, and Mathos, a Libyan, lead the revolt; Utica and Hippou Acra are besieged.' },
        { t: 'Crossing the Bagradas', d: 'With 10,000 men and 70 elephants, Hamilcar crosses the river at its mouth by a ford the wind lays bare and defeats the rebels. The Numidian prince Naravas comes over to him with 2,000 horsemen.' },
        { t: 'The torture of Gisco', d: 'The rebels mutilate and kill Gisco and some 700 Carthaginian prisoners: from then on, no quarter is given on either side.' },
        { t: 'The pass of the Saw', d: 'Hamilcar traps Spendius’ army in a mountain defile, the Saw (Prion). Starving to the point of cannibalism, the rebels send their leaders to negotiate; Hamilcar detains them and destroys the army: over 40,000 dead according to Polybius.' },
        { t: 'Tunis and the end of Mathos', d: 'Spendius is crucified before Tunis. Mathos, beaten in a final battle, is captured and executed in Carthage. The city is saved — but Rome has used the crisis to take Sardinia.' }
      ]
    },
    iberia: {
      title: 'The empire in Hispania',
      aside: 'Stripped of Sicily and Sardinia, Carthage finds silver, men and a base in Hispania.',
      kicker: 'The conquest · 237–229/228',
      paras: [
        'In 237 Hamilcar lands at Gades (Cádiz), an old Phoenician city. In nine years, by war and diplomacy, he subdues the Turdetani and the southern peoples — Diodorus names the chiefs Istolatios and Indortes — and takes control of the rich silver mines of the Sierra Morena.',
        'There he builds the Barcid war machine: a seasoned professional army, loyal to the Barca family as much as to the Carthaginian Senate. This force would become the instrument with which Hannibal invaded Italy.',
        'He founds Akra Leuke, “the White Cape” (perhaps near Alicante), and strikes high-quality silver coinage. To Roman envoys who came asking questions in 231, he replies that he is fighting the Iberians to pay what Carthage owes Rome.'
      ],
      wallAlt: 'Remains of the Punic wall of Cartagena',
      wallCap: 'Punic wall of Cartagena (Qart Hadasht), the city founded by his son-in-law Hasdrubal on the basis of his conquest.',
      coin1Alt: 'Barcid shekel with an elephant',
      coin1Cap: 'Barcid shekel struck in Hispania: the elephant, emblem of the Barcas’ military power.',
      coin2Alt: 'Barcid quarter shekel',
      coin2Cap: 'Barcid quarter shekel: Iberian silver paid the armies and the indemnity owed to Rome.'
    },
    oath: {
      alt: 'Young Hannibal swearing an oath before his father',
      cap: 'Hannibal’s oath, as seen by a modern artist',
      kicker: '237 BC · Carthage',
      title: 'The oath',
      quote: '“When my father was about to set out for Iberia with his army, he was offering a sacrifice. He brought me to the altar, made me lay my hand on the victim and swear never to be a friend of the Romans.”',
      cite: 'Hannibal to King Antiochus, after Polybius, Histories, III, 11',
      text: 'Livy repeats the scene (XXI, 1): the nine-year-old begs his father to take him along and swears “to be an enemy of the Roman people as soon as he could”. That oath, sworn before the gods of Carthage, would shape the destiny of the Mediterranean for a generation.'
    },
    voices: {
      title: 'What the ancients said',
      items: [
        { q: '“The best general of that war, for judgement as for daring, was Hamilcar, surnamed Barca.”', cite: 'Polybius, Histories, I, 64' },
        { q: '“No king deserved to be compared with Epaminondas, Pericles, Themistocles, Manius Curius or Hamilcar Barca.”', cite: 'Cato the Elder, in Plutarch, Life of Cato, 8' },
        { q: 'Looking at his sons, still children, Hamilcar used to say he was raising lion cubs for the ruin of the Roman empire.', cite: 'Valerius Maximus, Memorable Deeds and Sayings, IX, 3' }
      ]
    },
    legacy: {
      kicker: 'Legacy',
      title: 'The father of revenge',
      items: [
        { t: 'The Barcid army', d: 'A professional army, forged in Sicily, Africa and Hispania, bound to the Barca family: the tool of Cannae.' },
        { t: 'Punic Hispania', d: 'Silver mines, Iberian alliances, new cities: the base that let Carthage recover and Hannibal march on Rome.' },
        { t: 'A dynasty', d: 'Hannibal, Hasdrubal, Mago and his son-in-law Hasdrubal the Fair carry on his work. Polybius sees his anger as one of the causes of the Second Punic War.' }
      ]
    },
    family: {
      title: 'The Barca family',
      all: 'All people',
      more: 'Read the biography',
      items: [
        { to: '/hannibal', tone: 'tile--ink', k: 'Eldest son · 247 – 183', t: 'Hannibal Barca', d: 'The oath kept: the Alps, Trasimene, Cannae, then Zama.' },
        { to: '/hasdrubal', tone: 'tile--purple', k: 'The son-in-law and the son', t: 'The two Hasdrubals', d: 'Hasdrubal the Fair, founder of Cartagena, and Hasdrubal Barca, killed at the Metaurus.' },
        { to: '/magon-barca', tone: 'tile--terra', k: 'The youngest · c. 243 – 203', t: 'Mago Barca', d: 'The ambush at the Trebia, the rings of Cannae, Liguria.' }
      ],
      links: [
        { to: '/tactiques', l: 'Punic tactics' },
        { to: '/carte', l: 'The animated map' }
      ]
    }
  },
  ar: {
    metaTitle: 'حملقار برقا (نحو 275 – 229/228 ق.م) — صاعقة قرطاج',
    metaDesc: 'حملقار برقا: لم يُهزم في صقلية (هيركتي وإيريكس)، وانتصر في حرب المرتزقة عند «المنشار»، وفتح هسبانيا، وهو والد حنبعل وصاحب القسم ضد روما.',
    heroAlt: 'صورة متخيَّلة لحملقار برقا',
    heroCap: 'حملقار برقا، صورة متخيَّلة',
    chip: 'سيرة · آل برقا',
    dates: 'نحو 275 – 229/228 ق.م',
    title: 'حملقار برقا',
    epithet: 'برقا، «الصاعقة» — القائد الذي لم يُهزم، أبو سلالة',
    lede: 'لم يُهزم في صقلية، وأنقذ قرطاج في حرب المرتزقة، وبنى إمبراطورية جديدة في هسبانيا: الرجل الذي جعل من الهزيمة نقطة انطلاق للثأر — والذي جعل ابنه حنبعل يقسم ألّا يكون صديقًا لروما أبدًا.',
    stats: [
      { n: '6 سنوات', t: 'من الحرب في صقلية (247–241) دون أن يُهزم قط' },
      { n: '3 سنوات', t: 'وأربعة أشهر من الحرب «التي لا هدنة فيها» ضد المرتزقة (بوليبيوس)' },
      { n: '40٬000', t: 'مرتزق أُبيدوا في ممر «المنشار» حسب بوليبيوس' },
      { n: '9 سنوات', t: 'من الفتح في هسبانيا (237–229/228)، وهي أيضًا سنّ حنبعل يوم القسم' }
    ],
    chrono: {
      kicker: 'التسلسل الزمني',
      title: 'حياة في عشرة تواريخ',
      rows: [
        { k: 'نحو 275', t: 'المولد', d: 'في الأرستقراطية القرطاجية. ولقبه برقا مشتق على الأرجح من الكلمة البونيقية «برق»، أي الصاعقة.' },
        { k: '247', t: 'القيادة في صقلية', d: 'عُيّن على رأس القوات البونيقية في صقلية، فنزل قرب بانورموس (باليرمو) واستولى على جبل هيركتي. وفي السنة نفسها وُلد ابنه حنبعل.' },
        { k: '247–244', t: 'الحرب من هيركتي', d: 'من هذه القلعة الطبيعية أنهك الرومان في صقلية وأرسل أسطوله على سواحل جنوب إيطاليا.' },
        { k: '244–241', t: 'إيريكس', d: 'استولى مباغتةً على مدينة إيريكس، المحصورة بين حامية رومانية على القمة ومعسكر روماني في الأسفل، وصمد فيها حتى نهاية الحرب.' },
        { k: '241', t: 'جزر إيغاتس', d: 'في 10 مارس دمّر لوتاتيوس كاتولوس أسطول الإغاثة القرطاجي. كُلّف حملقار بالتفاوض فرفض تسليم سلاحه: كلّف السلامُ صقليةَ و3200 وزنة فضة على عشر سنوات.' },
        { k: '241–237', t: 'حرب المرتزقة', d: 'ثار الجنود الذين لم يتقاضوا أجورهم وانضمت إليهم المدن الليبية. استُدعي حملقار إلى القيادة فسحقهم في ممر «المنشار» ثم أمام تونس.' },
        { k: '238/237', t: 'ضربة سردينيا', d: 'استغلت روما الأزمة فاستولت على سردينيا وطالبت بـ1200 وزنة إضافية. غذّت هذه الإهانة نقمة آل برقا.' },
        { k: '237', t: 'الرحيل إلى قادش', d: 'أبحر إلى هسبانيا مع ابنه حنبعل ذي التسع سنوات وصهره صدربعل. وقبل الرحيل أدّى حنبعل القسم.' },
        { k: '237–229', t: 'فتح هسبانيا', d: 'أخضع التورديتانيين وشعوب الجنوب، وسيطر على مناجم الفضة، وأسس «أكرا لوكي». وفي 231 أجاب سفارة رومانية بأنه يحارب ليدفع الغرامة المستحقة لروما (ديو كاسيوس).' },
        { k: '229/228', t: 'الموت أمام هيليكي', d: 'خانه ملك الأوريسيين أثناء حصار هيليكي، فغرق في نهر وهو يغطي فرار ابنيه. وخلفه صهره صدربعل.' }
      ]
    },
    sicily: {
      title: 'صاعقة صقلية',
      aside: 'هيركتي (247–244) ثم إيريكس (244–241): سبع سنوات من حرب العصابات في جزيرة شبه خاضعة كلها لروما.',
      kicker: 'الذي لم يُهزم',
      paras: [
        'طوال حملته في صقلية، لم يُهزم حملقار برقا في أي معركة. أتقن فن حرب العصابات، فألحق خسائر فادحة بالفيالق الرومانية مع الحفاظ على قواته سليمة.',
        'انطلاقًا من معاقل جبلية — جبل هيركتي المطلّ على باليرمو ثم إيريكس غرب الجزيرة — شنّ غارات جريئة على المواقع الرومانية وخطوط الإمداد، بينما كان أسطوله يغير على سواحل بروتيوم. جعلت تكتيكاته الاحتلال الروماني لصقلية مكلفًا ودمويًا، وأجبرت روما على تجميد جيوش كاملة لمجرد الحفاظ على مواقعها.',
        'ويعدّه بوليبيوس، مع أنه يكتب من وجهة النظر الرومانية، أفضل قادة تلك الحرب كلها حكمةً وجرأة.'
      ],
      corr: {
        label: 'تصحيح تاريخي',
        title: 'أسطورة الهزيمة الصقلية',
        text: 'كثيرًا ما يُقال إن حملقار طُرد من صقلية. والحقيقة أنه كان لا يزال غير مهزوم عندما انتهت الحرب: لم يتخلَّ عن صقلية إلا لأن قرطاج فقدت أسطولها عند جزر إيغاتس ولم تعد قادرة على إمداده. وحين كُلّف بالتفاوض رفض تسليم سلاحه، فغادر رجاله الجزيرة جنودًا لا أسرى.',
        chips: ['هيركتي', 'إيريكس', 'إيغاتس، 241', 'لوتاتيوس كاتولوس']
      }
    },
    merc: {
      kicker: 'الحرب «التي لا هدنة فيها» · 241–237',
      title: 'إنقاذ قرطاج من جيشها',
      intro: 'عاد نحو 20٬000 مرتزق من صقلية يطالبون بأجورهم. ترددت قرطاج المنهكة بالغرامة، فاندلعت الثورة وانضمت إليها المدن الليبية الساخطة على الجزية. حوصرت المدينة في عقر دارها وفشل قائدها الأول حنون، فاستُدعي حملقار.',
      note: 'سمّاها بوليبيوس الحرب «التي لا هدنة فيها» لشدة فظائعها. وجعلها فلوبير إطارًا لروايته «سالامبو» (1862).',
      steps: [
        { t: 'قادة الثورة', d: 'تزعّم الثورة سبنديوس، العبد الكمباني الهارب، وماتوس الليبي؛ وحوصرت أوتيكا وهيبو أكرا.' },
        { t: 'عبور مجردة', d: 'عبر حملقار النهر (باغراداس) عند مصبه بعشرة آلاف رجل وسبعين فيلًا، عبر مخاضة كشفتها الرياح، وهزم الثوار. وانضم إليه الأمير النوميدي نارافاس بألفي فارس.' },
        { t: 'تعذيب جيسكون', d: 'شوّه الثوار جيسكون ونحو 700 أسير قرطاجي ثم قتلوهم: ومنذ ذلك الحين لم يعد أي طرف يمنح الأمان.' },
        { t: 'ممر المنشار', d: 'حاصر حملقار جيش سبنديوس في ممر جبلي يُعرف بـ«المنشار». ولما بلغ الجوع بالثوار حدّ أكل بعضهم بعضًا أرسلوا قادتهم للتفاوض، فاحتجزهم حملقار وأباد الجيش: أكثر من 40٬000 قتيل حسب بوليبيوس.' },
        { t: 'تونس ونهاية ماتوس', d: 'صُلب سبنديوس أمام تونس، وهُزم ماتوس في معركة أخيرة فأُسر وأُعدم في قرطاج. نجت المدينة — لكن روما استغلت الأزمة لأخذ سردينيا.' }
      ]
    },
    iberia: {
      title: 'إمبراطورية هسبانيا',
      aside: 'بعد أن خسرت صقلية وسردينيا، وجدت قرطاج في هسبانيا الفضة والرجال وقاعدة جديدة.',
      kicker: 'الفتح · 237–229/228',
      paras: [
        'في 237 نزل حملقار في قادش، المدينة الفينيقية العريقة. وفي تسع سنوات، بالحرب والدبلوماسية، أخضع التورديتانيين وشعوب الجنوب — ويذكر ديودور الزعيمين إستولاتيوس وإندورتيس — وسيطر على مناجم الفضة الغنية في سييرا مورينا.',
        'وهناك بنى الآلة العسكرية البرقية: جيش محترف متمرّس، يدين بالولاء لأسرة برقا بقدر ولائه لمجلس قرطاج. وستصبح هذه القوة الأداة التي غزا بها حنبعل إيطاليا.',
        'وأسس «أكرا لوكي» أي «الرأس الأبيض» (ربما قرب أليكانتي)، وسكّ نقودًا فضية عالية الجودة. وأجاب مبعوثي روما الذين جاؤوا يستفسرون سنة 231 بأنه يقاتل الإيبيريين ليدفع ما على قرطاج لروما.'
      ],
      wallAlt: 'بقايا السور البونيقي في قرطاجنة',
      wallCap: 'السور البونيقي في قرطاجنة (قرت حدشت)، المدينة التي أسسها صهره صدربعل على أساس فتوحاته.',
      coin1Alt: 'شيقل برقي عليه فيل',
      coin1Cap: 'شيقل برقي سُكّ في هسبانيا: الفيل رمز القوة العسكرية لآل برقا.',
      coin2Alt: 'ربع شيقل برقي',
      coin2Cap: 'ربع شيقل برقي: فضة المناجم الإيبيرية دفعت أجور الجيوش والغرامة المستحقة لروما.'
    },
    oath: {
      alt: 'حنبعل الصغير يؤدي القسم أمام أبيه',
      cap: 'قسم حنبعل كما تخيّله فنان حديث',
      kicker: '237 ق.م · قرطاج',
      title: 'القسم',
      quote: '«كان أبي، وهو على وشك الرحيل إلى إيبيريا بجيشه، يقدّم قربانًا. فأدناني من المذبح وجعلني أضع يدي على الذبيحة وأقسم ألّا أكون صديقًا للرومان أبدًا.»',
      cite: 'حنبعل للملك أنطيوخوس، عن بوليبيوس، التواريخ، الكتاب الثالث، 11',
      text: 'ويعيد تيتوس ليفيوس المشهد (21، 1): الطفل ذو التسع سنوات يتوسّل إلى أبيه أن يأخذه معه ويقسم «أن يكون عدوًّا للشعب الروماني حالما يستطيع». هذا القسم، المؤدّى أمام آلهة قرطاج، سيرسم مصير البحر المتوسط لجيل كامل.'
    },
    voices: {
      title: 'ما قاله القدماء',
      items: [
        { q: '«كان أفضل قادة تلك الحرب، حكمةً وجرأةً، حملقار الملقّب برقا.»', cite: 'بوليبيوس، التواريخ، الكتاب الأول، 64' },
        { q: '«لا ملك يستحق أن يُقارن بإبامينونداس أو بريكليس أو ثيميستوكليس أو مانيوس كوريوس أو حملقار برقا.»', cite: 'كاتون الأكبر، عند بلوتارخ، حياة كاتون، 8' },
        { q: 'كان حملقار ينظر إلى أبنائه الصغار ويقول إنه يربّي أشبال أسود لهلاك الإمبراطورية الرومانية.', cite: 'فاليريوس ماكسيموس، أعمال وأقوال مأثورة، 9، 3' }
      ]
    },
    legacy: {
      kicker: 'الإرث',
      title: 'أبو الثأر',
      items: [
        { t: 'الجيش البرقي', d: 'جيش محترف صُقل في صقلية وإفريقيا وهسبانيا، مرتبط بأسرة برقا: أداة النصر في كاناي.' },
        { t: 'هسبانيا البونيقية', d: 'مناجم الفضة والتحالفات الإيبيرية والمدن الجديدة: القاعدة التي سمحت لقرطاج بالنهوض ولحنبعل بالزحف على روما.' },
        { t: 'سلالة', d: 'واصل حنبعل وصدربعل وماغون وصهره صدربعل الجميل عمله. ويرى بوليبيوس في غضبه أحد أسباب الحرب البونيقية الثانية.' }
      ]
    },
    family: {
      title: 'أسرة برقا',
      all: 'كل الشخصيات',
      more: 'اقرأ السيرة',
      items: [
        { to: '/hannibal', tone: 'tile--ink', k: 'الابن الأكبر · 247 – 183', t: 'حنبعل برقا', d: 'القسم الذي وُفي به: الألب، ترازيمينو، كاناي، ثم زاما.' },
        { to: '/hasdrubal', tone: 'tile--purple', k: 'الصهر والابن', t: 'الصدربعلان', d: 'صدربعل الجميل مؤسس قرطاجنة، وصدربعل برقا الذي قُتل عند الميتاورو.' },
        { to: '/magon-barca', tone: 'tile--terra', k: 'الأصغر · نحو 243 – 203', t: 'ماغون برقا', d: 'كمين تريبيا، خواتم كاناي، ليغوريا.' }
      ],
      links: [
        { to: '/tactiques', l: 'التكتيكات البونيقية' },
        { to: '/carte', l: 'الخريطة المتحركة' }
      ]
    }
  }
}

const c = computed(() => C[locale.value] || C.fr)

useHead(() => ({
  title: c.value.metaTitle,
  meta: [{ name: 'description', content: c.value.metaDesc }]
}))
</script>

<style scoped>
.hero-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
.hero-phoen { font-size: clamp(34px, 4vw, 56px); opacity: 0.35; }
.epithet { font: 600 clamp(16px, 1.4vw, 20px)/1.35 var(--font-body); margin-top: 14px; color: var(--purple-tint) !important; }

.num.n-accent { color: var(--terra); }
.stat-t { font: 500 15px/1.45 var(--font-body); margin-top: 10px; }

.chrono-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.rows .val strong { color: var(--white); font-weight: 700; }
.tile--ink .rows .val { color: var(--on-dark-2); }
.tile--ink .rows .key { color: var(--gold-light); }

.para + .para { margin-top: 14px; }

.merc-title { margin-bottom: 18px; }
.merc-note { font: 500 14px/1.5 var(--font-body); border-top: 1px solid rgba(255, 255, 255, 0.3); padding-top: 16px; }
.steps { display: flex; flex-direction: column; gap: 20px; }
.step { display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 16px; align-items: start; }
.step-n {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--terra); color: var(--white);
  display: grid; place-items: center;
  font: 800 18px/1 var(--font-display);
}

.iberia { padding-top: 0; }
.iberia-fig { background: var(--olive); }
.coin-fig { background: var(--white); min-height: clamp(240px, 26vw, 340px); }
.coin-fig > img { object-fit: contain; padding: 24px 24px 84px; }
.coin-fig.coin-photo { background: #3E6DB0; }
.coin-fig.coin-photo > img { object-fit: cover; padding: 0; }

.oath-fig { min-height: clamp(320px, 38vw, 520px); }
.oath-title { margin-bottom: 18px; }

.quote { margin: 0; }
.quote p { font: 500 clamp(17px, 1.5vw, 21px)/1.5 var(--font-display); color: var(--ink) !important; font-style: italic; }
.quote cite, .quote-tile cite { display: block; margin-top: 14px; font: 600 13px/1.4 var(--font-body); font-style: normal; color: var(--purple); }
.quote-tile { margin: 0; display: flex; flex-direction: column; justify-content: space-between; gap: 18px; }

.sec-title { margin-bottom: clamp(20px, 2.4vw, 32px); }

.legacy-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.legacy-item { border-top: 1.5px solid rgba(255, 255, 255, 0.3); padding-top: 18px; }

.fam { min-height: 220px; }
.more { font: 600 14px/1 var(--font-body); opacity: 0.85; }
.tile--purple .more, .tile--ink .more, .tile--terra .more { color: var(--gold-light); }
.links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: var(--gap); }

@media (max-width: 960px) {
  .iberia-fig { min-height: 280px; }
}

@media (max-width: 640px) {
  .coin-fig > img { padding: 16px 16px 96px; }
  .step { grid-template-columns: 36px minmax(0, 1fr); gap: 12px; }
  .step-n { width: 36px; height: 36px; font-size: 15px; }
  .links .btn { flex: 1 1 100%; justify-content: center; }
}
</style>
