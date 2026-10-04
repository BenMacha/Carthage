<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <figure class="fig fig--hero s-5 hero-fig" style="background:#6B5A48">
        <img src="/img/byrsa.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--navy tile--stack tile--hero s-7">
        <div class="hero-top">
          <span class="chip chip--glass">{{ c.hero.chip }}</span>
          <span class="phoen hero-phoen" dir="rtl" aria-hidden="true">𐤇𐤍𐤀</span>
        </div>
        <div>
          <p class="dates">{{ c.hero.dates }}</p>
          <h1 class="h-display bio-title">{{ c.hero.title }}</h1>
          <p class="epithet">{{ c.hero.epithet }}</p>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
    </div>

    <!-- Chiffres-clés -->
    <div class="cols cols-4 keep-2 keyfigs">
      <div v-for="(k, i) in c.keys" :key="k.n + i" class="tile keyfig" :class="keyTones[i]">
        <div class="num">{{ k.n }}</div>
        <p class="body">{{ k.t }}</p>
      </div>
    </div>

    <!-- Qui était Hannon ? -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--stack">
          <div>
            <span class="kicker">{{ c.intro.kicker }}</span>
            <h2 class="h-block block-h">{{ c.intro.title }}</h2>
            <p v-for="p in c.intro.paras" :key="p" class="body-lg para">{{ p }}</p>
          </div>
          <div class="chips">
            <span v-for="t in c.intro.tags" :key="t" class="chip">{{ t }}</span>
          </div>
        </div>
        <div class="tile tile--xl tile--paper tile--outline">
          <span class="kicker">{{ c.homonyms.kicker }}</span>
          <h3 class="h-card hom-h">{{ c.homonyms.title }}</h3>
          <ul class="hom-list">
            <li v-for="h in c.homonyms.items" :key="h.k">
              <b>{{ h.k }}</b>
              <span>{{ h.v }}</span>
            </li>
          </ul>
          <NuxtLink :to="localePath('/hannon')" class="btn btn-outline hom-btn">{{ c.homonyms.cta }} →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Chronologie -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <span class="kicker">{{ c.life.kicker }}</span>
        <h2 class="h-section block-h">{{ c.life.title }}</h2>
        <div class="rows" style="--row-key:170px">
          <div v-for="(r, i) in c.life.rows" :key="i">
            <span class="key">{{ r.key }}</span>
            <span class="val"><b>{{ r.title }}</b> — {{ r.text }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Deux politiques -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.policy.title }}</h2>
        <p>{{ c.policy.aside }}</p>
      </div>
    </section>
    <div class="cols cols-2">
      <div v-for="p in c.policy.items" :key="p.title" class="tile tile--xl" :class="p.tone">
        <span class="kicker">{{ p.kicker }}</span>
        <h3 class="h-card pol-h">{{ p.title }}</h3>
        <p class="body-lg">{{ p.text }}</p>
      </div>
    </div>

    <!-- Guerre des Mercenaires -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <div class="tile tile--xl tile--terra tile--stack">
          <div>
            <span class="kicker">{{ c.merc.kicker }}</span>
            <h2 class="h-block block-h">{{ c.merc.title }}</h2>
            <p class="body-lg">{{ c.merc.intro }}</p>
          </div>
          <div class="btns">
            <NuxtLink :to="localePath('/guerre-des-mercenaires')" class="btn btn-outline">{{ c.merc.cta1 }} →</NuxtLink>
            <NuxtLink :to="localePath('/hamilcar')" class="btn btn-outline">{{ c.merc.cta2 }} →</NuxtLink>
          </div>
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

    <!-- Citation -->
    <section class="sec">
      <figure class="tile tile--xl tile--paper tile--outline quote">
        <span class="kicker">{{ c.quote.kicker }}</span>
        <blockquote>
          <p class="q-orig" lang="la">{{ c.quote.orig }}</p>
          <p class="q-tr">« {{ c.quote.tr }} »</p>
        </blockquote>
        <figcaption class="q-cite">{{ c.quote.cite }}</figcaption>
      </figure>
    </section>

    <!-- Contre la guerre d'Hannibal -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.speeches.title }}</h2>
        <p>{{ c.speeches.aside }}</p>
      </div>
    </section>
    <div class="cols cols-3">
      <article v-for="s in c.speeches.items" :key="s.ref" class="tile tile--xl tile--stack" :class="s.tone">
        <div>
          <span class="kicker">{{ s.kicker }}</span>
          <h3 class="h-card sp-h">{{ s.title }}</h3>
          <p class="body">{{ s.text }}</p>
        </div>
        <p class="sp-ref">{{ s.ref }}</p>
      </article>
    </div>

    <!-- Un sage ? -->
    <section class="sec">
      <div class="cols cols-2 cols--flush">
        <div class="tile tile--xl tile--purple">
          <span class="kicker">{{ c.critic.kicker }}</span>
          <h2 class="h-block block-h">{{ c.critic.title }}</h2>
          <p v-for="p in c.critic.paras" :key="p" class="body-lg para">{{ p }}</p>
        </div>
        <div class="tile tile--xl tile--olive">
          <span class="kicker">{{ c.after.kicker }}</span>
          <h2 class="h-block block-h">{{ c.after.title }}</h2>
          <p v-for="p in c.after.paras" :key="p" class="body-lg para">{{ p }}</p>
        </div>
      </div>
    </section>

    <!-- Sources -->
    <section class="sec">
      <div class="tile tile--xl">
        <span class="kicker">{{ c.sourcesNote.kicker }}</span>
        <h2 class="h-block block-h">{{ c.sourcesNote.title }}</h2>
        <div class="rows" style="--row-key:240px">
          <div v-for="s in c.sourcesNote.items" :key="s.key">
            <span class="key src-key">{{ s.key }}</span>
            <span class="val">{{ s.text }}</span>
          </div>
        </div>
      </div>
    </section>

    <PageSources :items="c.sources" />

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <h2 class="h-section block-title">{{ c.more.title }}</h2>
    </section>
    <div class="cols cols-3">
      <NuxtLink v-for="m in c.more.items" :key="m.to" :to="localePath(m.to)" class="card-img">
        <img :src="m.img" :alt="m.alt" loading="lazy">
        <div class="card-body">
          <span class="kicker">{{ m.kicker }}</span>
          <h3 class="h-card">{{ m.title }}</h3>
          <p>{{ m.text }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const keyTones = ['', 'tile--gold', '', 'tile--terra']

const C = {
  fr: {
    meta: {
      title: 'Hannon le Grand, l\'adversaire des Barcides (IIIe s. av. J.-C.)',
      desc: "Hannon le Grand, chef de la faction aristocratique de Carthage au IIIe siècle av. J.-C. : conquêtes africaines, échecs pendant la guerre des Mercenaires, rivalité avec Hamilcar Barca et opposition à la guerre d'Hannibal selon Tite-Live."
    },
    hero: {
      chip: 'Biographie · IIIe s. av. J.-C.',
      dates: 'Actif v. 247 – fin du IIIe s. av. J.-C.',
      title: 'Hannon le Grand',
      epithet: "L'homme de l'Afrique contre les Barca",
      lede: "Conquérant de l'arrière-pays libyen, général malheureux de la guerre des Mercenaires, rival d'Hamilcar puis adversaire déclaré d'Hannibal : Hannon incarne, pour les Anciens, la Carthage des grands propriétaires, qui voulait la paix avec Rome.",
      alt: 'La colline de Byrsa à Carthage',
      caption: 'Carthage, la colline de Byrsa'
    },
    keys: [
      { n: '~247', t: "prise d'Hécatompyle, dans l'arrière-pays libyen (Diodore)" },
      { n: '3 000', t: 'otages pris à Hécatompyle, et la ville épargnée (Diodore, XXIV, 10)' },
      { n: '~100', t: "éléphants dans son armée devant Utique, en 240 (Polybe, I, 74)" },
      { n: '30', t: 'sénateurs envoyés pour le réconcilier avec Hamilcar (Polybe, I, 87)' }
    ],
    intro: {
      kicker: 'Un chef de faction',
      title: 'Qui était Hannon ?',
      paras: [
        "On ignore sa famille, sa date de naissance et celle de sa mort. Hannon apparaît dans les sources vers 247, comme général des Carthaginois en Afrique, et disparaît après la deuxième guerre punique. Le surnom « le Grand » sert à le distinguer de ses nombreux homonymes ; les textes le nomment le plus souvent simplement Hannon.",
        "Pour Polybe comme pour Tite-Live, il est la figure de proue d'une faction : celle des grands propriétaires de la chôra africaine, attachés à l'exploitation des terres et hostiles aux aventures lointaines des Barcides. Le site décrit ces rivalités sur la page des institutions."
      ],
      tags: ['Faction : aristocratie foncière', 'Rivaux : Hamilcar, Hannibal', 'Sources : Polybe, Tite-Live']
    },
    homonyms: {
      kicker: 'Attention aux homonymes',
      title: 'Plusieurs Hannon',
      items: [
        { k: 'Hannon le navigateur', v: "Auteur présumé du Périple le long de l'Afrique atlantique (Ve s. ?)." },
        { k: 'Hannon, IVe s.', v: "Citoyen le plus puissant de son temps, que Justin (XXI, 4) montre tentant de prendre le pouvoir ; lui aussi parfois appelé « le Grand »." },
        { k: 'Hannon en Sardaigne', v: "Envoyé contre les mercenaires révoltés de l'île et crucifié par ses propres troupes (Polybe, I, 79)." },
        { k: 'Hannon fils de Bomilcar', v: "Neveu probable d'Hannibal, chef de cavalerie au passage du Rhône en 218." }
      ],
      cta: 'Hannon le navigateur'
    },
    life: {
      kicker: 'Chronologie',
      title: 'Ce que les sources lui attribuent',
      rows: [
        { key: 'v. 247', title: "L'Afrique d'abord", text: "Général en Afrique pendant que la guerre se poursuit en Sicile, il prend Hécatompyle, ville libyenne généralement identifiée à Theveste (Tébessa) — identification probable mais discutée (Diodore, XXIV, 10 ; Polybe, I, 73)." },
        { key: '241 – 240', title: 'Face aux mercenaires', text: "Chargé de parler aux mercenaires rassemblés à Sicca, il plaide la pauvreté de l'État : ces soldats, qu'il n'a pas commandés en Sicile, se défient de lui. La révolte éclate (Polybe, I, 66–67)." },
        { key: '240', title: 'Utique', text: "Avec machines de guerre et une centaine d'éléphants, il chasse les rebelles de leur camp devant Utique, puis se laisse surprendre par leur retour (Polybe, I, 74)." },
        { key: '240 – 238', title: 'Hamilcar et la discorde', text: "Hamilcar reçoit un commandement. La mésentente des deux généraux est telle que l'armée est invitée à choisir : elle garde Hamilcar, Hannon est écarté (Polybe, I, 82)." },
        { key: '238 – 237', title: 'La réconciliation forcée', text: "Après un revers devant Tunis, trente sénateurs imposent la réconciliation ; Hannon et Hamilcar battent ensemble Mathos et mettent fin à la guerre (Polybe, I, 87–88)." },
        { key: '221', title: 'Contre la « royauté » barcide', text: "Lorsque Hasdrubal le Beau réclame le jeune Hannibal en Hispanie, Hannon s'y oppose au Sénat (Tite-Live, XXI, 3)." },
        { key: '219 – 218', title: 'Livrer Hannibal ?', text: "Après la prise de Sagonte, il demande qu'on livre Hannibal à Rome pour éviter la guerre. Il n'est pas suivi (Tite-Live, XXI, 10)." },
        { key: '216', title: 'Après Cannes', text: "Alors que Magon Barca annonce la victoire, il conseille de négocier la paix en position de force (Tite-Live, XXIII, 12–13)." },
        { key: '203', title: "Le reproche d'Hannibal", text: "Rappelé d'Italie, Hannibal accuse la jalousie du Sénat et d'Hannon d'avoir causé sa défaite (Tite-Live, XXX, 20)." }
      ]
    },
    policy: {
      title: 'Deux politiques pour Carthage',
      aside: "Au IIIe siècle, deux visions s'affrontent au Sénat ; les sources les incarnent en deux hommes.",
      items: [
        { tone: 'tile--sand', kicker: 'Hannon', title: "La terre d'Afrique", text: "Étendre et exploiter le territoire libyen, source des revenus de l'aristocratie foncière ; éviter une nouvelle guerre avec Rome. Polybe rappelle la dureté de cette politique : pendant la première guerre punique, on exigea des paysans libyens la moitié de leurs récoltes (I, 72) — ce qui explique leur ralliement aux mercenaires." },
        { tone: 'tile--ink', kicker: 'Les Barcides', title: "La mer et l'Hispanie", text: "Compenser la perte de la Sicile par un empire en Hispanie, riche en argent et en soldats, et préparer la revanche. Polybe (III, 8), rapportant l'avis de Fabius Pictor, décrit les Barcides s'appuyant sur la faveur du peuple ; M. Sznycer écarte l'idée d'une monarchie à l'hellénistique." }
      ]
    },
    merc: {
      kicker: 'Guerre des Mercenaires · 241 – 237',
      title: 'Un général malheureux',
      intro: "Premier général chargé de la guerre, Hannon est un bon organisateur, reconnaît Polybe, mais un piètre chef en campagne : il sait rassembler une armée, pas saisir l'occasion. Son échec ouvre la voie à Hamilcar.",
      cta1: 'La guerre des Mercenaires',
      cta2: 'Hamilcar Barca',
      steps: [
        { t: 'Sicca', d: "Il vient demander aux soldats de renoncer à une partie de leur solde. Le malentendu tourne à la révolte ouverte." },
        { t: 'Le camp devant Utique', d: "Victorieux au premier choc grâce aux éléphants, il rentre en ville sans poursuivre ; les rebelles reviennent et s'emparent de son matériel." },
        { t: 'Deux généraux, une armée', d: "Sa rivalité avec Hamilcar paralyse le commandement : l'armée tranche en faveur d'Hamilcar (Polybe, I, 82)." },
        { t: 'La victoire commune', d: "Réconcilié par une commission du Sénat, il combat aux côtés d'Hamilcar la dernière armée de Mathos, battue et capturée." }
      ]
    },
    quote: {
      kicker: 'Hannon au Sénat, en 221, selon Tite-Live',
      orig: 'Et aequum postulare videtur Hasdrubal, et ego tamen non censeo quod petit tribuendum. […] Vereor ne quandoque parvus hic ignis incendium ingens exsuscitet.',
      tr: "La demande d'Hasdrubal semble juste, et pourtant je ne suis pas d'avis de lui accorder ce qu'il demande. […] Je crains qu'un jour cette petite étincelle n'allume un immense incendie.",
      cite: 'Tite-Live, Histoire romaine, XXI, 3'
    },
    speeches: {
      title: "Contre la guerre d'Hannibal",
      aside: 'Trois discours rapportés par Tite-Live : ils disent moins ce que dit Hannon que ce que Rome voulait entendre.',
      items: [
        { tone: 'tile--sand', kicker: '221', title: "Garder l'enfant à Carthage", text: "Hasdrubal le Beau réclame le jeune Hannibal. Hannon veut qu'il grandisse sous les lois de la cité, et non dans un camp où il apprendrait à commander en maître.", ref: 'Tite-Live, XXI, 3' },
        { tone: 'tile--gold', kicker: '219 – 218', title: 'Livrer Hannibal', text: "Après Sagonte, il rappelle la paix jurée, prédit une guerre ruineuse et propose de livrer Hannibal aux ambassadeurs romains. Le Sénat choisit la guerre.", ref: 'Tite-Live, XXI, 10' },
        { tone: 'tile--terra', kicker: '216', title: 'La paix après Cannes', text: "Devant les anneaux d'or apportés par Magon, il demande quel peuple latin a fait défection : aucun. Rome n'a pas plié ; c'est le moment de traiter.", ref: 'Tite-Live, XXIII, 12–13' }
      ]
    },
    critic: {
      kicker: 'Lire Tite-Live avec prudence',
      title: 'Un sage, vraiment ?',
      paras: [
        "Tite-Live est hostile à Hannibal : il fait d'Hannon la voix de la raison, celle qui avait tout prévu. Ces discours sont des reconstructions littéraires, écrites deux siècles plus tard, et non des procès-verbaux.",
        "Polybe, plus proche des faits, est sévère pour le général Hannon. Et l'opposition tranchée entre un « parti d'Hannon » et un « parti barcide » simplifie sans doute un jeu politique fait d'alliances changeantes."
      ]
    },
    after: {
      kicker: 'Après Zama',
      title: 'La paix et le silence',
      paras: [
        "En quittant l'Italie en 203, Hannibal désigne Hannon parmi ceux qui l'ont privé de renforts. Après Zama (202), la faction favorable à la paix l'emporte, et le traité de 201 est accepté.",
        "Hannon, alors âgé, disparaît des sources. D'autres Hannon apparaissent dans les récits des années 204–201 et 150–149 : rien ne permet d'affirmer qu'il s'agit du même homme."
      ]
    },
    sourcesNote: {
      kicker: 'Sources',
      title: "D'où vient ce que l'on sait",
      items: [
        { key: 'Polybe, Histoires, I', text: 'La guerre des Mercenaires : Sicca, Utique, la rivalité avec Hamilcar, la réconciliation (I, 66–88).' },
        { key: 'Diodore, XXIV, 10', text: "La prise d'Hécatompyle et le traitement clément de la ville, conservés en fragments." },
        { key: 'Tite-Live, XXI, XXIII, XXX', text: "Les discours contre la guerre (XXI, 3 et 10 ; XXIII, 12–13) et le reproche d'Hannibal (XXX, 20)." },
        { key: 'Appien', text: "Ses récits de la fin de la deuxième guerre punique et de la troisième mentionnent plusieurs Hannon : leur identification avec l'adversaire d'Hamilcar reste incertaine." }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Polybe', work: 'Histoires', ref: 'I, 66–67 ; 72–74 ; 79 ; 82 ; 87–88 ; III, 8', note: 'la guerre des Mercenaires : Sicca, Utique, la rivalité avec Hamilcar, la réconciliation' },
      { type: 'ancient', author: 'Diodore de Sicile', work: 'Bibliothèque historique', ref: 'XXIV, 10', note: "la prise d'Hécatompyle (fragments)" },
      { type: 'ancient', author: 'Tite-Live', work: 'Histoire romaine', ref: 'XXI, 3 ; XXI, 10 ; XXIII, 12–13 ; XXX, 20', note: "les discours contre la guerre d'Hannibal et le reproche d'Hannibal en 203" },
      { type: 'ancient', author: 'Justin', work: 'Abrégé des Histoires philippiques de Trogue Pompée', ref: 'XXI, 4', note: "l'Hannon homonyme du IVe siècle" },
      { type: 'ancient', author: 'Appien', work: 'Libyca', note: "plusieurs Hannon, d'identification incertaine" },
      { type: 'ancient', author: 'Fabius Pictor', note: 'œuvre perdue ; son avis sur les Barcides est rapporté par Polybe (III, 8)' },
      { type: 'modern', author: 'Maurice Sznycer', work: 'Carthage et la civilisation punique', ref: '1978', note: "sur la prétendue « monarchie » barcide" }
    ],
    more: {
      title: 'À lire aussi',
      items: [
        { to: '/hamilcar', img: '/img/hamilcar.jpg', alt: 'Hamilcar Barca', kicker: '~275 – 229/228 av. J.-C.', title: 'Hamilcar Barca', text: 'Le rival, vainqueur des mercenaires et conquérant de l\'Hispanie.' },
        { to: '/institutions', img: '/img/punic-quarter.jpg', alt: 'Quartier punique de Byrsa', kicker: 'Le gouvernement', title: 'Les institutions', text: 'Sénat, suffètes, assemblée : où se jouaient ces rivalités.' },
        { to: '/hannibal', img: '/img/hannibal-bust.jpg', alt: "Buste d'Hannibal", kicker: '247 – 183 av. J.-C.', title: 'Hannibal', text: 'La guerre qu\'Hannon voulait éviter.' }
      ]
    }
  },
  en: {
    meta: {
      title: 'Hanno the Great, opponent of the Barcids (3rd c. BC)',
      desc: "Hanno the Great, leader of Carthage's aristocratic faction in the 3rd century BC: African conquests, failures in the Mercenary War, rivalry with Hamilcar Barca and opposition to Hannibal's war according to Livy."
    },
    hero: {
      chip: 'Biography · 3rd c. BC',
      dates: 'Active c. 247 – late 3rd c. BC',
      title: 'Hanno the Great',
      epithet: 'The man of Africa against the Barcas',
      lede: "Conqueror of the Libyan hinterland, unlucky general of the Mercenary War, rival of Hamilcar and open opponent of Hannibal: for the ancients, Hanno embodied the Carthage of the great landowners, which wanted peace with Rome.",
      alt: 'The hill of Byrsa in Carthage',
      caption: 'Carthage, the hill of Byrsa'
    },
    keys: [
      { n: '~247', t: 'capture of Hecatompylus, in the Libyan hinterland (Diodorus)' },
      { n: '3,000', t: 'hostages taken at Hecatompylus, and the city spared (Diodorus, XXIV, 10)' },
      { n: '~100', t: 'elephants in his army before Utica, in 240 (Polybius, I, 74)' },
      { n: '30', t: 'senators sent to reconcile him with Hamilcar (Polybius, I, 87)' }
    ],
    intro: {
      kicker: 'A faction leader',
      title: 'Who was Hanno?',
      paras: [
        'His family and the dates of his birth and death are unknown. Hanno appears in the sources around 247, as Carthage\'s general in Africa, and vanishes after the Second Punic War. The nickname "the Great" distinguishes him from his many namesakes; the texts usually call him simply Hanno.',
        "For Polybius as for Livy, he is the figurehead of a faction: the great landowners of the African chora, devoted to working the land and hostile to the Barcids' distant ventures. The institutions page of this site describes these rivalries."
      ],
      tags: ['Faction: landed aristocracy', 'Rivals: Hamilcar, Hannibal', 'Sources: Polybius, Livy']
    },
    homonyms: {
      kicker: 'Beware of namesakes',
      title: 'Several Hannos',
      items: [
        { k: 'Hanno the Navigator', v: 'Presumed author of the Periplus along Atlantic Africa (5th c.?).' },
        { k: 'Hanno, 4th c.', v: 'The most powerful citizen of his day, shown by Justin (XXI, 4) trying to seize power; also sometimes called "the Great".' },
        { k: 'Hanno in Sardinia', v: 'Sent against the rebel mercenaries on the island and crucified by his own troops (Polybius, I, 79).' },
        { k: 'Hanno son of Bomilcar', v: "Probably Hannibal's nephew, cavalry commander at the Rhône crossing in 218." }
      ],
      cta: 'Hanno the Navigator'
    },
    life: {
      kicker: 'Timeline',
      title: 'What the sources attribute to him',
      rows: [
        { key: 'c. 247', title: 'Africa first', text: 'General in Africa while the war went on in Sicily, he took Hecatompylus, a Libyan town generally identified with Theveste (Tébessa) — a likely but debated identification (Diodorus, XXIV, 10; Polybius, I, 73).' },
        { key: '241 – 240', title: 'Facing the mercenaries', text: 'Sent to address the mercenaries gathered at Sicca, he pleaded the state\'s poverty: these soldiers, whom he had not led in Sicily, distrusted him. Revolt broke out (Polybius, I, 66–67).' },
        { key: '240', title: 'Utica', text: 'With siege engines and about a hundred elephants, he drove the rebels from their camp before Utica, then let himself be surprised by their return (Polybius, I, 74).' },
        { key: '240 – 238', title: 'Hamilcar and discord', text: 'Hamilcar received a command. The two generals quarrelled so badly that the army was asked to choose: it kept Hamilcar, and Hanno was set aside (Polybius, I, 82).' },
        { key: '238 – 237', title: 'Forced reconciliation', text: 'After a setback before Tunis, thirty senators imposed a reconciliation; Hanno and Hamilcar together defeated Mathos and ended the war (Polybius, I, 87–88).' },
        { key: '221', title: 'Against Barcid "kingship"', text: 'When Hasdrubal the Fair asked for young Hannibal in Iberia, Hanno opposed it in the Senate (Livy, XXI, 3).' },
        { key: '219 – 218', title: 'Surrender Hannibal?', text: 'After the fall of Saguntum, he called for Hannibal to be handed over to Rome to avoid war. He was not followed (Livy, XXI, 10).' },
        { key: '216', title: 'After Cannae', text: 'As Mago Barca announced the victory, he advised negotiating peace from a position of strength (Livy, XXIII, 12–13).' },
        { key: '203', title: "Hannibal's reproach", text: 'Recalled from Italy, Hannibal blamed the envy of the Senate and of Hanno for his defeat (Livy, XXX, 20).' }
      ]
    },
    policy: {
      title: 'Two policies for Carthage',
      aside: 'In the 3rd century two visions clashed in the Senate; the sources embody them in two men.',
      items: [
        { tone: 'tile--sand', kicker: 'Hanno', title: 'The land of Africa', text: 'Extend and exploit Libyan territory, the source of the landed aristocracy\'s income; avoid another war with Rome. Polybius recalls how harsh this policy was: during the First Punic War, Libyan farmers were made to hand over half their harvest (I, 72) — which explains why they joined the mercenaries.' },
        { tone: 'tile--ink', kicker: 'The Barcids', title: 'The sea and Iberia', text: "Make up for the loss of Sicily with an empire in Iberia, rich in silver and soldiers, and prepare for revenge. Polybius (III, 8), reporting Fabius Pictor's view, describes the Barcids relying on popular favour; M. Sznycer rejects the notion of a Hellenistic-style monarchy." }
      ]
    },
    merc: {
      kicker: 'Mercenary War · 241 – 237',
      title: 'An unlucky general',
      intro: 'The first general in charge of the war, Hanno was a good organiser, Polybius grants, but a poor field commander: he could raise an army, not seize the moment. His failure opened the way for Hamilcar.',
      cta1: 'The Mercenary War',
      cta2: 'Hamilcar Barca',
      steps: [
        { t: 'Sicca', d: 'He came to ask the soldiers to give up part of their pay. The misunderstanding turned into open revolt.' },
        { t: 'The camp before Utica', d: 'Victorious at the first clash thanks to his elephants, he went back into the city without pursuing; the rebels returned and seized his equipment.' },
        { t: 'Two generals, one army', d: 'His rivalry with Hamilcar paralysed the command: the army decided in favour of Hamilcar (Polybius, I, 82).' },
        { t: 'The joint victory', d: "Reconciled by a Senate commission, he fought alongside Hamilcar against Mathos's last army, which was beaten and captured." }
      ]
    },
    quote: {
      kicker: 'Hanno in the Senate, 221, according to Livy',
      orig: 'Et aequum postulare videtur Hasdrubal, et ego tamen non censeo quod petit tribuendum. […] Vereor ne quandoque parvus hic ignis incendium ingens exsuscitet.',
      tr: "Hasdrubal's request seems fair, and yet I do not think what he asks should be granted. […] I fear that one day this little spark may kindle a vast fire.",
      cite: 'Livy, History of Rome, XXI, 3'
    },
    speeches: {
      title: "Against Hannibal's war",
      aside: 'Three speeches reported by Livy: they tell us less what Hanno said than what Rome wanted to hear.',
      items: [
        { tone: 'tile--sand', kicker: '221', title: 'Keep the boy in Carthage', text: 'Hasdrubal the Fair asks for the young Hannibal. Hanno wants him to grow up under the laws of the city, not in a camp where he would learn to rule as a master.', ref: 'Livy, XXI, 3' },
        { tone: 'tile--gold', kicker: '219 – 218', title: 'Surrender Hannibal', text: 'After Saguntum, he recalls the sworn peace, foretells a ruinous war and proposes handing Hannibal over to the Roman envoys. The Senate chooses war.', ref: 'Livy, XXI, 10' },
        { tone: 'tile--terra', kicker: '216', title: 'Peace after Cannae', text: 'Faced with the gold rings brought by Mago, he asks which Latin people has defected: none. Rome has not bent; now is the time to negotiate.', ref: 'Livy, XXIII, 12–13' }
      ]
    },
    critic: {
      kicker: 'Reading Livy with care',
      title: 'A wise man, really?',
      paras: [
        'Livy is hostile to Hannibal: he makes Hanno the voice of reason, the one who foresaw everything. These speeches are literary reconstructions, written two centuries later, not minutes.',
        'Polybius, closer to the events, is severe on Hanno the general. And the sharp contrast between a "Hanno party" and a "Barcid party" probably simplifies a political game of shifting alliances.'
      ]
    },
    after: {
      kicker: 'After Zama',
      title: 'Peace and silence',
      paras: [
        'Leaving Italy in 203, Hannibal named Hanno among those who had denied him reinforcements. After Zama (202), the peace faction prevailed and the treaty of 201 was accepted.',
        'Hanno, by then elderly, vanishes from the sources. Other Hannos appear in the accounts of 204–201 and 150–149: nothing allows us to say they are the same man.'
      ]
    },
    sourcesNote: {
      kicker: 'Sources',
      title: 'Where our knowledge comes from',
      items: [
        { key: 'Polybius, Histories, I', text: 'The Mercenary War: Sicca, Utica, the rivalry with Hamilcar, the reconciliation (I, 66–88).' },
        { key: 'Diodorus, XXIV, 10', text: 'The capture of Hecatompylus and the lenient treatment of the town, preserved in fragments.' },
        { key: 'Livy, XXI, XXIII, XXX', text: "The speeches against the war (XXI, 3 and 10; XXIII, 12–13) and Hannibal's reproach (XXX, 20)." },
        { key: 'Appian', text: "His accounts of the end of the Second Punic War and of the Third mention several Hannos: identifying them with Hamilcar's opponent remains uncertain." }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Polybius', work: 'Histories', ref: 'I, 66–67; 72–74; 79; 82; 87–88; III, 8', note: 'the Mercenary War: Sicca, Utica, the rivalry with Hamilcar, the reconciliation' },
      { type: 'ancient', author: 'Diodorus Siculus', work: 'Library of History', ref: 'XXIV, 10', note: 'the capture of Hecatompylus (fragments)' },
      { type: 'ancient', author: 'Livy', work: 'History of Rome', ref: 'XXI, 3; XXI, 10; XXIII, 12–13; XXX, 20', note: "the speeches against Hannibal's war and Hannibal's reproach in 203" },
      { type: 'ancient', author: 'Justin', work: "Epitome of Pompeius Trogus' Philippic Histories", ref: 'XXI, 4', note: 'the 4th-century namesake' },
      { type: 'ancient', author: 'Appian', work: 'Libyca', note: 'several Hannos, of uncertain identity' },
      { type: 'ancient', author: 'Fabius Pictor', note: 'lost work; his view of the Barcids is reported by Polybius (III, 8)' },
      { type: 'modern', author: 'Maurice Sznycer', work: 'Carthage et la civilisation punique', ref: '1978', note: 'on the supposed Barcid "monarchy"' }
    ],
    more: {
      title: 'Read also',
      items: [
        { to: '/hamilcar', img: '/img/hamilcar.jpg', alt: 'Hamilcar Barca', kicker: 'c. 275 – 229/228 BC', title: 'Hamilcar Barca', text: 'The rival, victor over the mercenaries and conqueror of Iberia.' },
        { to: '/institutions', img: '/img/punic-quarter.jpg', alt: 'Punic quarter on Byrsa', kicker: 'Government', title: 'Institutions', text: 'Senate, suffetes, assembly: where these rivalries played out.' },
        { to: '/hannibal', img: '/img/hannibal-bust.jpg', alt: 'Bust of Hannibal', kicker: '247 – 183 BC', title: 'Hannibal', text: 'The war Hanno wanted to avoid.' }
      ]
    }
  },
  ar: {
    meta: {
      title: 'حنون الكبير، خصم آل برقا (القرن 3 ق.م)',
      desc: 'حنون الكبير، زعيم الفئة الأرستقراطية في قرطاج في القرن الثالث ق.م: فتوحات إفريقية، وإخفاقات في حرب المرتزقة، وتنافس مع حملقار برقة، ومعارضة لحرب حنبعل بحسب ليفيوس.'
    },
    hero: {
      chip: 'سيرة · القرن 3 ق.م',
      dates: 'نشط من نحو 247 إلى أواخر القرن 3 ق.م',
      title: 'حنون الكبير',
      epithet: 'رجل إفريقيا في مواجهة آل برقا',
      lede: 'فاتح الداخل الليبي، والقائد السيئ الحظ في حرب المرتزقة، ومنافس حملقار ثم الخصم المعلن لحنبعل: يجسّد حنون في نظر القدماء قرطاج كبار الملاك التي أرادت السلام مع روما.',
      alt: 'تل بيرصا في قرطاج',
      caption: 'قرطاج، تل بيرصا'
    },
    keys: [
      { n: '~247', t: 'الاستيلاء على هيكاتومبيلوس في الداخل الليبي (ديودوروس)' },
      { n: '3000', t: 'رهينة أُخذت من هيكاتومبيلوس مع الإبقاء على المدينة (ديودوروس، 24، 10)' },
      { n: '~100', t: 'فيل في جيشه أمام أوتيكا سنة 240 (بوليبيوس، 1، 74)' },
      { n: '30', t: 'عضوًا في مجلس الشيوخ أُرسلوا لمصالحته مع حملقار (بوليبيوس، 1، 87)' }
    ],
    intro: {
      kicker: 'زعيم فئة',
      title: 'من كان حنون؟',
      paras: [
        'لا نعرف أسرته ولا تاريخ مولده أو وفاته. يظهر حنون في المصادر نحو سنة 247 قائدًا للقرطاجيين في إفريقيا، ويختفي بعد الحرب البونيقية الثانية. ولقب «الكبير» يميّزه عن كثير ممن حملوا اسمه؛ وغالبًا ما تسمّيه النصوص حنون فحسب.',
        'عند بوليبيوس كما عند ليفيوس، هو واجهة فئة: كبار ملاك الأرياف الإفريقية، المتعلقين باستغلال الأرض والمعادين لمغامرات آل برقا البعيدة. وتصف صفحة المؤسسات في هذا الموقع هذه الصراعات.'
      ],
      tags: ['الفئة: الأرستقراطية العقارية', 'الخصوم: حملقار، حنبعل', 'المصادر: بوليبيوس، ليفيوس']
    },
    homonyms: {
      kicker: 'احذر تشابه الأسماء',
      title: 'أكثر من حنون',
      items: [
        { k: 'حنون الملاح', v: 'المؤلف المفترض لـ«الرحلة» على طول إفريقيا الأطلسية (القرن 5؟).' },
        { k: 'حنون، القرن 4', v: 'أقوى مواطني عصره، يصوّره يوستينوس (21، 4) ساعيًا إلى الاستيلاء على السلطة؛ ويُلقَّب هو أيضًا أحيانًا «الكبير».' },
        { k: 'حنون في سردينيا', v: 'أُرسل ضد المرتزقة الثائرين في الجزيرة فصلبه جنوده (بوليبيوس، 1، 79).' },
        { k: 'حنون بن بوملقار', v: 'ابن أخت حنبعل على الأرجح، قائد الفرسان عند عبور الرون سنة 218.' }
      ],
      cta: 'حنون الملاح'
    },
    life: {
      kicker: 'التسلسل الزمني',
      title: 'ما تنسبه إليه المصادر',
      rows: [
        { key: 'نحو 247', title: 'إفريقيا أولًا', text: 'بينما كانت الحرب مستمرة في صقلية، استولى وهو قائد في إفريقيا على هيكاتومبيلوس، المدينة الليبية التي يُطابقها الباحثون عادةً مع تيفست (تبسة) — مطابقة مرجّحة لكنها موضع نقاش (ديودوروس، 24، 10؛ بوليبيوس، 1، 73).' },
        { key: '241 – 240', title: 'في مواجهة المرتزقة', text: 'كُلّف بمخاطبة المرتزقة المجتمعين في سيكا، فتذرّع بفقر الدولة: وكان هؤلاء الجنود، الذين لم يقدهم في صقلية، لا يثقون به. فاندلعت الثورة (بوليبيوس، 1، 66–67).' },
        { key: '240', title: 'أوتيكا', text: 'بآلات الحرب ونحو مئة فيل، طرد الثوار من معسكرهم أمام أوتيكا، ثم باغته رجوعهم (بوليبيوس، 1، 74).' },
        { key: '240 – 238', title: 'حملقار والشقاق', text: 'تولّى حملقار قيادة. وبلغ الخلاف بين القائدين حدًّا دُعي معه الجيش إلى الاختيار: فاحتفظ بحملقار وأُبعد حنون (بوليبيوس، 1، 82).' },
        { key: '238 – 237', title: 'مصالحة مفروضة', text: 'بعد انتكاسة أمام تونس، فرض ثلاثون عضوًا من مجلس الشيوخ المصالحة؛ فهزم حنون وحملقار معًا ماثوس وأنهيا الحرب (بوليبيوس، 1، 87–88).' },
        { key: '221', title: 'ضد «مُلك» آل برقا', text: 'حين طلب صدربعل الجميل الفتى حنبعل إلى إيبيريا، عارض حنون ذلك في مجلس الشيوخ (ليفيوس، 21، 3).' },
        { key: '219 – 218', title: 'تسليم حنبعل؟', text: 'بعد سقوط ساغونتوم، طالب بتسليم حنبعل إلى روما تفاديًا للحرب. فلم يُتَّبع رأيه (ليفيوس، 21، 10).' },
        { key: '216', title: 'بعد كاناي', text: 'حين أعلن ماغون برقة النصر، نصح بالتفاوض على السلام من موقع قوة (ليفيوس، 23، 12–13).' },
        { key: '203', title: 'عتاب حنبعل', text: 'لما استُدعي حنبعل من إيطاليا، اتهم حسد مجلس الشيوخ وحنون بالتسبب في هزيمته (ليفيوس، 30، 20).' }
      ]
    },
    policy: {
      title: 'سياستان لقرطاج',
      aside: 'في القرن الثالث، تواجهت رؤيتان في مجلس الشيوخ؛ وتجسّدهما المصادر في رجلين.',
      items: [
        { tone: 'tile--sand', kicker: 'حنون', title: 'أرض إفريقيا', text: 'توسيع الأراضي الليبية واستغلالها، مصدر دخل الأرستقراطية العقارية؛ وتجنّب حرب جديدة مع روما. ويذكّر بوليبيوس بقسوة هذه السياسة: ففي أثناء الحرب البونيقية الأولى طُلب من الفلاحين الليبيين نصف محاصيلهم (1، 72) — وهو ما يفسّر انضمامهم إلى المرتزقة.' },
        { tone: 'tile--ink', kicker: 'آل برقا', title: 'البحر وإيبيريا', text: 'تعويض خسارة صقلية بإمبراطورية في إيبيريا غنية بالفضة والجنود، والإعداد للثأر. ويصف بوليبيوس (3، 8)، ناقلًا رأي فابيوس بيكتور، آل برقا وهم يستندون إلى تأييد الشعب؛ ويستبعد م. سزنيسر فكرة مَلَكية على الطراز الهلنستي.' }
      ]
    },
    merc: {
      kicker: 'حرب المرتزقة · 241 – 237',
      title: 'قائد سيئ الحظ',
      intro: 'كان حنون أول قائد كُلّف بالحرب، ويعترف بوليبيوس بأنه منظّم جيد لكنه قائد ميداني ضعيف: يحسن حشد الجيش ولا يحسن اغتنام الفرصة. ففتح إخفاقه الطريق أمام حملقار.',
      cta1: 'حرب المرتزقة',
      cta2: 'حملقار برقة',
      steps: [
        { t: 'سيكا', d: 'جاء يطلب من الجنود التنازل عن جزء من أجورهم. فتحوّل سوء التفاهم إلى ثورة معلنة.' },
        { t: 'المعسكر أمام أوتيكا', d: 'انتصر في الصدمة الأولى بفضل الفيلة، ثم عاد إلى المدينة دون مطاردة؛ فرجع الثوار واستولوا على عتاده.' },
        { t: 'قائدان وجيش واحد', d: 'شلّ تنافسه مع حملقار القيادة: فحسم الجيش الأمر لصالح حملقار (بوليبيوس، 1، 82).' },
        { t: 'النصر المشترك', d: 'بعد أن صالحته لجنة من مجلس الشيوخ، قاتل إلى جانب حملقار آخر جيوش ماثوس، الذي هُزم وأُسر.' }
      ]
    },
    quote: {
      kicker: 'حنون في مجلس الشيوخ سنة 221، بحسب ليفيوس',
      orig: 'Et aequum postulare videtur Hasdrubal, et ego tamen non censeo quod petit tribuendum. […] Vereor ne quandoque parvus hic ignis incendium ingens exsuscitet.',
      tr: 'يبدو طلب صدربعل عادلًا، ومع ذلك لا أرى أن يُعطى ما يطلب. […] أخشى أن تُشعل هذه الشرارة الصغيرة يومًا حريقًا هائلًا.',
      cite: 'ليفيوس، تاريخ روما، 21، 3'
    },
    speeches: {
      title: 'ضد حرب حنبعل',
      aside: 'ثلاث خطب يرويها ليفيوس: تخبرنا بما أرادت روما سماعه أكثر مما تخبرنا بما قاله حنون.',
      items: [
        { tone: 'tile--sand', kicker: '221', title: 'إبقاء الفتى في قرطاج', text: 'يطلب صدربعل الجميل الفتى حنبعل. ويريد حنون أن ينشأ في ظل قوانين المدينة، لا في معسكر يتعلم فيه أن يحكم حكم السيد.', ref: 'ليفيوس، 21، 3' },
        { tone: 'tile--gold', kicker: '219 – 218', title: 'تسليم حنبعل', text: 'بعد ساغونتوم، يذكّر بالسلام المعقود باليمين، ويتنبأ بحرب مدمّرة، ويقترح تسليم حنبعل إلى السفراء الرومان. فيختار مجلس الشيوخ الحرب.', ref: 'ليفيوس، 21، 10' },
        { tone: 'tile--terra', kicker: '216', title: 'السلام بعد كاناي', text: 'أمام الخواتم الذهبية التي جاء بها ماغون، يسأل: أيّ شعب لاتيني انشقّ؟ لا أحد. لم تنحنِ روما؛ فهذا أوان التفاوض.', ref: 'ليفيوس، 23، 12–13' }
      ]
    },
    critic: {
      kicker: 'قراءة ليفيوس بحذر',
      title: 'حكيم حقًّا؟',
      paras: [
        'ليفيوس معادٍ لحنبعل: فهو يجعل حنون صوت العقل الذي توقّع كل شيء. وهذه الخطب إعادة بناء أدبية كُتبت بعد قرنين، لا محاضر جلسات.',
        'أما بوليبيوس، الأقرب إلى الأحداث، فقاسٍ على حنون القائد. والتعارض الحاد بين «حزب حنون» و«حزب آل برقا» يبسّط على الأرجح لعبة سياسية قوامها تحالفات متقلبة.'
      ]
    },
    after: {
      kicker: 'بعد زاما',
      title: 'السلام والصمت',
      paras: [
        'حين غادر حنبعل إيطاليا سنة 203، عدّ حنون من بين الذين حرموه من الإمدادات. وبعد زاما (202) غلبت الفئة المؤيدة للسلام، وقُبلت معاهدة 201.',
        'ثم يختفي حنون، وقد تقدّم به العمر، من المصادر. وتظهر شخصيات أخرى باسم حنون في روايات السنوات 204–201 و150–149: ولا شيء يسمح بالقول إنها الرجل نفسه.'
      ]
    },
    sourcesNote: {
      kicker: 'المصادر',
      title: 'من أين نعرف ما نعرف',
      items: [
        { key: 'بوليبيوس، التواريخ، 1', text: 'حرب المرتزقة: سيكا، أوتيكا، التنافس مع حملقار، المصالحة (1، 66–88).' },
        { key: 'ديودوروس، 24، 10', text: 'الاستيلاء على هيكاتومبيلوس ومعاملة المدينة بالرفق، في شذرات محفوظة.' },
        { key: 'ليفيوس، 21، 23، 30', text: 'الخطب ضد الحرب (21، 3 و10؛ 23، 12–13) وعتاب حنبعل (30، 20).' },
        { key: 'أبيانوس', text: 'تذكر رواياته عن أواخر الحرب البونيقية الثانية وعن الثالثة أكثر من حنون: ومطابقتهم مع خصم حملقار تبقى غير مؤكدة.' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'بوليبيوس', work: 'التواريخ', ref: '1، 66–67؛ 72–74؛ 79؛ 82؛ 87–88؛ 3، 8', note: 'حرب المرتزقة: سيكا وأوتيكا والتنافس مع حملقار والمصالحة' },
      { type: 'ancient', author: 'ديودوروس الصقلي', work: 'المكتبة التاريخية', ref: '24، 10', note: 'الاستيلاء على هيكاتومبيلوس (شذرات)' },
      { type: 'ancient', author: 'تيتوس ليفيوس', work: 'تاريخ روما', ref: '21، 3؛ 21، 10؛ 23، 12–13؛ 30، 20', note: 'الخطب ضد حرب حنبعل، وعتاب حنبعل سنة 203' },
      { type: 'ancient', author: 'يوستينوس', work: 'مختصر التواريخ الفيليبية لتروغوس بومبيوس', ref: '21، 4', note: 'حنون السَّمِيّ في القرن 4 ق.م' },
      { type: 'ancient', author: 'أبيانوس', work: 'ليبيكا', note: 'أكثر من حنون، وهويتهم غير مؤكدة' },
      { type: 'ancient', author: 'فابيوس بيكتور', note: 'مؤلَّف مفقود؛ ينقل بوليبيوس رأيه في آل برقا (3، 8)' },
      { type: 'modern', author: 'Maurice Sznycer', work: 'Carthage et la civilisation punique', ref: '1978', note: 'عن «الملكية» البرقية المزعومة' }
    ],
    more: {
      title: 'اقرأ أيضًا',
      items: [
        { to: '/hamilcar', img: '/img/hamilcar.jpg', alt: 'حملقار برقة', kicker: 'نحو 275 – 229/228 ق.م', title: 'حملقار برقة', text: 'المنافس، قاهر المرتزقة وفاتح إيبيريا.' },
        { to: '/institutions', img: '/img/punic-quarter.jpg', alt: 'الحي البونيقي في بيرصا', kicker: 'الحكم', title: 'المؤسسات', text: 'مجلس الشيوخ والشفطان والجمعية: حيث دارت هذه الصراعات.' },
        { to: '/hannibal', img: '/img/hannibal-bust.jpg', alt: 'تمثال نصفي لحنبعل', kicker: '247 – 183 ق.م', title: 'حنبعل', text: 'الحرب التي أراد حنون تجنّبها.' }
      ]
    }
  }
}

const c = await useLocalized('hannon-le-grand', C)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-top { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 12px 16px; }
.hero-phoen { font-size: clamp(22px, 2.4vw, 34px); color: var(--gold-light); opacity: 0.85; }
.dates { font: 700 14px/1.3 var(--font-body); margin-bottom: 14px; color: var(--gold-light) !important; }
.bio-title { font-size: clamp(40px, 5.4vw, 84px); overflow-wrap: anywhere; }
.epithet { font: 700 clamp(16px, 1.4vw, 20px)/1.35 var(--font-display); margin-block: 8px 14px; color: var(--white) !important; }
.hero-fig { min-height: clamp(380px, 42vw, 560px); }

.keyfigs { margin-top: var(--gap); }
.keyfig .body { margin-top: 6px; font-size: 14px; }

.block-h { margin-bottom: clamp(18px, 2vw, 28px); }
.block-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.para + .para { margin-top: 12px; }
.rows .val b { font-weight: 700; }
.src-key { font-size: clamp(17px, 1.5vw, 20px) !important; line-height: 1.2 !important; }

.hom-h { margin-block: 8px 14px; }
.hom-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.hom-list li { border-top: 1px solid var(--sand); padding-top: 10px; }
.hom-list b { display: block; font: 800 16px/1.2 var(--font-display); margin-bottom: 3px; }
.hom-list span { font: 400 14px/1.45 var(--font-body); color: var(--muted); }
.hom-btn { margin-top: 18px; min-height: 44px; }

.pol-h { margin-block: 8px 12px; font-size: clamp(22px, 2vw, 30px); }

.btns { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
.btns .btn { min-height: 44px; }
.steps { display: grid; gap: 20px; }
.step { display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 14px; align-items: start; }
.step-n { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--ink); color: var(--white); font: 800 16px/1 var(--font-display); }
.step .h-card { margin-bottom: 4px; font-size: clamp(18px, 1.6vw, 22px); }

.quote blockquote { margin-block: 6px 14px; }
.q-orig { font: italic 500 16px/1.55 Georgia, serif; color: var(--purple) !important; margin-bottom: 14px; max-width: 900px; }
.q-tr { font: 800 clamp(20px, 2.1vw, 30px)/1.3 var(--font-display); color: var(--ink) !important; max-width: 1000px; }
.q-cite { font: 600 13px/1.4 var(--font-body); color: var(--muted); }

.sp-h { margin-block: 8px 12px; }
.sp-ref { margin-top: 16px; font: 700 13px/1.3 var(--font-body); opacity: 0.85; }

@media (max-width: 960px) {
  .hero-fig { min-height: clamp(260px, 60vw, 460px); }
}

@media (max-width: 640px) {
  .keyfig { padding: 18px; }
  .step { grid-template-columns: 34px minmax(0, 1fr); gap: 12px; }
  .step-n { width: 34px; height: 34px; font-size: 14px; }
}
</style>
