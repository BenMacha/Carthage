<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--purple tile--stack tile--hero s-6">
        <div class="watermark phoen" aria-hidden="true">𐤒𐤓𐤕𐤇𐤃𐤔𐤕</div>
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div class="hero-text">
          <h1 class="h-display">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-6" style="background:#8a6f2f">
        <img src="/img/turner-dido.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Chiffres -->
    <div class="cols cols-3 stats">
      <div v-for="(n, i) in c.numbers" :key="i" class="tile stat" :class="{ 'tile--gold': i === 0 }">
        <div class="num">{{ n.value }}</div>
        <p class="stat-text">{{ n.label }}</p>
      </div>
    </div>

    <!-- La légende -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl">
          <span class="kicker">{{ c.legend.kicker }}</span>
          <h2 class="h-section legend-title">{{ c.legend.title }}</h2>
          <div class="legend-text">
            <p v-for="(p, i) in c.legend.paragraphs" :key="i" class="body-lg">{{ p }}</p>
          </div>
          <div class="chips legend-cta">
            <NuxtLink :to="localePath('/didon')" class="btn btn-primary">{{ c.legend.didon }} →</NuxtLink>
          </div>
        </div>
        <div class="legend-side">
          <figure class="fig legend-fig">
            <img src="/img/guerin-dido.jpg" :alt="c.legend.alt" loading="lazy">
            <figcaption class="cap-box">{{ c.legend.caption }}</figcaption>
          </figure>
          <div class="tile tile--paper tile--outline">
            <span class="kicker">{{ c.legend.srcKicker }}</span>
            <p class="body">{{ c.legend.sources }}</p>
            <NuxtLink :to="localePath('/histoire-des-vainqueurs')" class="src-link">{{ c.legend.srcLink }} →</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- La peau de bœuf -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.oxhide.title }}</h2>
        <p>{{ c.oxhide.subtitle }}</p>
      </div>
    </section>
    <div class="cols cols-4">
      <div v-for="(s, i) in c.oxhide.steps" :key="i" class="tile tile--stack step" :class="stepTones[i]">
        <span class="step-n" aria-hidden="true">0{{ i + 1 }}</span>
        <div>
          <h3 class="h-card">{{ s.title }}</h3>
          <p class="body">{{ s.desc }}</p>
        </div>
      </div>
    </div>

    <!-- Mythe et archéologie -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.arch.kicker }}</span>
          <h2 class="h-block arch-title">{{ c.arch.title }}</h2>
          <div class="rows" style="--row-key:190px">
            <div v-for="r in c.arch.rows" :key="r.key">
              <span class="key">{{ r.key }}</span>
              <span class="val">{{ r.val }}</span>
            </div>
          </div>
          <NuxtLink :to="localePath('/chronologie')" class="btn btn-outline arch-cta">{{ c.arch.cta }} →</NuxtLink>
        </div>
        <div class="tile tile--xl tile--sand tile--stack">
          <div>
            <span class="kicker">{{ c.name.kicker }}</span>
            <div class="name-phoen phoen" dir="rtl" lang="phn">𐤒𐤓𐤕𐤇𐤃𐤔𐤕</div>
            <h3 class="h-card">{{ c.name.title }}</h3>
            <p class="body">{{ c.name.text }}</p>
          </div>
          <NuxtLink :to="localePath('/tunisie')" class="btn btn-outline">{{ c.name.cta }} →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Avant Carthage : le réseau phénicien -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.network.title }}</h2>
        <p>{{ c.network.subtitle }}</p>
      </div>
    </section>
    <div class="cols cols-4">
      <div v-for="(s, i) in c.network.sites" :key="s.name" class="tile tile--stack site" :class="siteTones[i]">
        <div>
          <span class="kicker">{{ s.where }}</span>
          <div class="site-date" dir="auto">{{ s.date }}</div>
          <h3 class="h-card">{{ s.name }}</h3>
        </div>
        <p class="body">{{ s.text }}</p>
      </div>
    </div>

    <!-- Substrat libyen -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--terra">
          <span class="kicker">{{ c.libyans.kicker }}</span>
          <h2 class="h-section legend-title">{{ c.libyans.title }}</h2>
          <div class="legend-text">
            <p v-for="(p, i) in c.libyans.paragraphs" :key="i" class="body-lg">{{ p }}</p>
          </div>
        </div>
        <div class="tile tile--xl tile--sand">
          <span class="kicker">{{ c.libyans.lpKicker }}</span>
          <h3 class="h-block lp-title">{{ c.libyans.lpTitle }}</h3>
          <p class="body">{{ c.libyans.lpText }}</p>
          <div class="rows lp-rows" style="--row-key:120px">
            <div v-for="r in c.libyans.lpRows" :key="r.key">
              <span class="key">{{ r.key }}</span>
              <span class="val">{{ r.val }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Carthage, ville principale -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.capital.kicker }}</span>
          <h2 class="h-block arch-title">{{ c.capital.title }}</h2>
          <div class="rows" style="--row-key:170px">
            <div v-for="r in c.capital.rows" :key="r.key">
              <span class="key">{{ r.key }}</span>
              <span class="val">{{ r.val }}</span>
            </div>
          </div>
        </div>
        <div class="tile tile--xl tile--purple tile--stack">
          <div>
            <span class="kicker">{{ c.capital.k2 }}</span>
            <h3 class="h-block lp-title">{{ c.capital.t2 }}</h3>
            <p v-for="(p, i) in c.capital.d2" :key="i" class="body-lg cosmo-p">{{ p }}</p>
          </div>
          <NuxtLink :to="localePath('/afrique')" class="btn btn-outline cosmo-btn">{{ c.capital.cta }} →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- La cité -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.city.title }}</h2>
        <p>{{ c.city.subtitle }}</p>
      </div>
    </section>
    <div class="cols cols-3">
      <div v-for="(f, i) in c.city.features" :key="i" class="tile feat" :class="f.cls">
        <span class="kicker">{{ f.kick }}</span>
        <h3 class="h-card">{{ f.title }}</h3>
        <p class="body">{{ f.desc }}</p>
        <NuxtLink v-if="f.link" :to="localePath(f.link.to)" class="feat-link">{{ f.link.label }} →</NuxtLink>
      </div>
    </div>

    <!-- Le port -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig port-fig" style="background:#1D3F66">
          <img src="/img/ports.jpg" :alt="c.port.alt" loading="lazy">
          <figcaption class="cap-box">{{ c.port.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--navy">
          <span class="kicker">{{ c.port.kicker }}</span>
          <h2 class="h-block port-title">{{ c.port.title }}</h2>
          <p class="body-lg port-lede">{{ c.port.lede }}</p>
          <div class="cols cols-2 cols--flush port-parts">
            <div v-for="(p, i) in c.port.parts" :key="i" class="port-part">
              <div class="port-n">{{ p.n }}</div>
              <h3 class="port-h">{{ p.title }}</h3>
              <p class="body">{{ p.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Artisanat -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.craft.title }}</h2>
        <p>{{ c.craft.subtitle }}</p>
      </div>
    </section>
    <div class="bento craft">
      <figure class="fig craft-fig s-4" style="background:#5E574F">
        <img src="/img/tanit-stele.jpg" :alt="c.craft.alt" loading="lazy">
        <figcaption class="cap-box">{{ c.craft.caption }}</figcaption>
      </figure>
      <div class="s-8 craft-grid">
        <div v-for="(o, i) in c.craft.items" :key="i" class="tile craft-item" :class="o.cls">
          <span class="kicker">{{ o.kick }}</span>
          <h3 class="h-card">{{ o.title }}</h3>
          <p class="body">{{ o.desc }}</p>
          <NuxtLink v-if="o.link" :to="localePath(o.link.to)" class="feat-link">{{ o.link.label }} →</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Carte -->
    <section class="sec">
      <div class="sec-head">
        <h2 class="h-section">{{ c.map.title }}</h2>
        <NuxtLink :to="localePath('/carte')" class="btn btn-outline">{{ c.map.cta }} →</NuxtLink>
      </div>
      <MapsAnimatedMap compact initial-mode="voy" :modes="['voy', 'terr']" />
    </section>

    <!-- Vestiges -->
    <section class="sec">
      <h2 class="h-section remains-title">{{ c.remains.title }}</h2>
      <div class="cols cols-4 cols--flush">
        <div v-for="(r, i) in c.remains.items" :key="i" class="card-img">
          <img :src="'/img/' + r.img" :alt="r.alt" loading="lazy">
          <div class="card-body">
            <span class="kicker">{{ r.kick }}</span>
            <h3 class="h-card">{{ r.title }}</h3>
            <p>{{ r.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <PageSources :items="c.sources" />

    <!-- À lire aussi -->
    <section class="sec">
      <h2 class="h-block more-title">{{ c.more.title }}</h2>
      <div class="cols cols-3 cols--flush">
        <NuxtLink v-for="l in c.more.items" :key="l.to" :to="localePath(l.to)" class="tile tile--stack more" :class="l.cls">
          <span class="kicker">{{ l.kick }}</span>
          <div>
            <h3 class="h-card">{{ l.title }}</h3>
            <p class="body">{{ l.text }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const stepTones = ['tile--gold', 'tile--terra', 'tile--purple', 'tile--ink']
const siteTones = ['tile--sand', '', 'tile--navy', 'tile--ink']

const C = {
  fr: {
    meta: {
      title: 'La fondation de Carthage — 814 av. J.-C.',
      desc: "Élyssa fuit Tyr, la ruse de la peau de bœuf, la colline de Byrsa : la fondation de Carthage entre légende et archéologie, son double port, ses murailles et son artisanat."
    },
    hero: {
      chip: '814 av. J.-C.',
      title: 'La fondation de Carthage',
      lede: "Naissance d'une superpuissance méditerranéenne : une princesse en exil, une peau de bœuf, une colline face à la mer.",
      alt: 'Turner — Didon construisant Carthage',
      caption: 'J. M. W. Turner, Didon construisant Carthage (1815)'
    },
    numbers: [
      { value: '814', label: 'Année de fondation selon la tradition (av. J.-C.)' },
      { value: '700 000', label: "Habitants à l'apogée selon Strabon — un chiffre sans doute exagéré" },
      { value: '34 km', label: 'De murailles, selon les auteurs antiques' },
      { value: '220', label: 'Navires de guerre abrités dans le port circulaire' },
      { value: '6', label: "Étages des maisons sur les pentes de Byrsa, selon Appien" },
      { value: '300', label: 'Éléphants logés dans les murailles' }
    ],
    legend: {
      kicker: 'La légende',
      title: 'Élyssa, princesse de Tyr',
      paragraphs: [
        "Didon (Élyssa) était une princesse phénicienne de Tyr, dans l'actuel Liban. Son frère Pygmalion, roi de Tyr, assassina son époux Sychée — riche prêtre du temple de Melqart, l'Hercule phénicien — pour s'emparer de ses trésors. Le fantôme de son mari l'avertit en rêve.",
        "Elle s'enfuit par la mer avec un groupe de fidèles et les richesses de Sychée. Lors d'une escale à Chypre, 80 jeunes femmes se joignirent à l'expédition ; elle atteignit les côtes de l'actuelle Tunisie vers 814 av. J.-C.",
        "Là, elle négocia avec le roi libyque (berbère) Iarbas pour obtenir une terre : une surface aussi grande que pourrait en couvrir une seule peau de bœuf — une requête en apparence modeste. Selon la légende, pressée plus tard d'épouser Iarbas, elle préféra se jeter dans un bûcher."
      ],
      didon: 'La vie de Didon',
      alt: 'Guérin — Énée racontant à Didon les malheurs de Troie',
      caption: 'Pierre-Narcisse Guérin, Énée racontant à Didon les malheurs de Troie (1815), Louvre',
      srcKicker: 'Sources',
      sources: "Le récit nous vient d'auteurs grecs et latins — Timée, Justin (abrégé de Trogue Pompée), Virgile. La rencontre avec Énée est une invention poétique de l'Énéide : les dates ne concordent pas.",
      srcLink: "L'histoire écrite par le vainqueur"
    },
    oxhide: {
      title: 'Le stratagème de la peau de bœuf',
      subtitle: 'Comment Didon fonda Carthage par la ruse.',
      steps: [
        { title: 'La demande', desc: "Didon demande à Iarbas une terre aussi grande qu'une peau de bœuf. Le roi, jugeant la demande dérisoire, accepte." },
        { title: 'La ruse', desc: "Elle fait découper la peau en lanières extrêmement fines, formant un très long cordon de cuir." },
        { title: 'La fondation', desc: "Avec ces lanières, elle entoure toute la colline de Byrsa — du grec « byrsa », la peau. Elle y fonde Qart Hadasht, la « Ville Nouvelle »." },
        { title: 'La croissance', desc: "De cette colline, Carthage devient l'une des plus grandes cités du monde antique, avec un port de guerre de 220 navires." }
      ]
    },
    arch: {
      kicker: 'Mythe et archéologie',
      title: 'Ce que disent les fouilles',
      rows: [
        { key: '814 / 813', val: "Date de fondation donnée par l'historien grec Timée de Tauroménion (IVe–IIIe s. av. J.-C.), reprise par la tradition." },
        { key: 'Appien', val: "Une autre tradition antique, suivie par Appien (Libyca, I, 1), faisait remonter Carthage à l'époque de la guerre de Troie, vers le XIIe siècle av. J.-C. Les fouilles n'ont rien livré d'aussi ancien." },
        { key: 'Hypothèses', val: "Certains ont proposé une fondation vers 670, ou une fondation en deux temps — un comptoir d'abord, la cité ensuite (Pierre Cintas). Les chercheurs récents, s'appuyant sur les annales de Tyr connues par Ménandre d'Éphèse et Flavius Josèphe, retiennent le dernier quart du IXe siècle." },
        { key: 'VIIIe s.', val: "Les plus anciens niveaux fouillés — céramiques, premières offrandes du tophet de Salammbô — remontent à la seconde moitié du VIIIe siècle av. J.-C. : la légende n'est pas loin de la vérité." },
        { key: 'Byrsa', val: "Le nom grec « byrsa » (la peau) est sans doute une réinterprétation d'un mot sémitique désignant la citadelle : la ruse de la peau de bœuf serait née de ce jeu de mots." },
        { key: 'VIe s.', val: "Carthage prend la tête des cités phéniciennes d'Occident, tandis que Tyr passe sous domination babylonienne puis perse." }
      ],
      cta: 'Toute la chronologie'
    },
    name: {
      kicker: 'Un nom',
      title: 'Qart Hadasht, la « Ville Nouvelle »',
      text: "En phénicien, qart signifie « ville » et hadasht « nouvelle » : une nouvelle Tyr en Afrique. Les Grecs en firent Karchēdōn, les Romains Carthago — et le nom vit toujours en Tunisie. Carthagène, en Espagne, porta le même nom de Qart Hadasht.",
      cta: 'Carthage et la Tunisie'
    },
    network: {
      title: "Avant Carthage : le réseau phénicien d'Occident",
      subtitle: "Pour les Phéniciens, l'Afrique du Nord fut d'abord une escale sur la route des métaux d'Espagne. Carthage rejoint un réseau déjà ancien.",
      sites: [
        { where: 'Tunisie', date: '1101', name: 'Utique', text: "Pour Pline l'Ancien (Histoire naturelle, XVI, 216), la première fondation phénicienne d'Afrique, près de trois siècles avant Carthage. C'est une date traditionnelle : les plus anciens vestiges retrouvés sont nettement plus récents." },
        { where: 'Maroc atlantique', date: 'XIIe s.', name: 'Lixus', text: "Au-delà du détroit de Gibraltar, près de l'actuelle Larache. Pline (XIX, 63) la compte parmi les plus anciens établissements phéniciens ; elle passera plus tard dans l'orbite de Carthage." },
        { where: 'Espagne', date: 'v. 1100', name: 'Gadès (Gadir)', text: "L'actuelle Cadix, sur une île. Velleius Paterculus (I, 2, 3) place sa fondation par les Tyriens peu après la guerre de Troie. Elle ouvre l'accès à l'argent et à l'étain de la péninsule Ibérique." },
        { where: 'Tête de réseau', date: 'VIe s.', name: "Une confédération plutôt qu'un empire", text: "Quand Tyr décline, Carthage prend la tête des colonies phéniciennes d'Occident et se charge de la défense commune et de la politique extérieure. Sabatino Moscati voyait dans cette structure lâche l'une des causes de sa défaite finale." }
      ]
    },
    libyans: {
      kicker: 'Le substrat libyen',
      title: 'Une terre déjà peuplée',
      paragraphs: [
        "Les Phéniciens n'abordent pas une terre vide. L'Afrique du Nord est peuplée de Libyens, que les textes égyptiens nomment Lebou dès la fin du IIe millénaire av. J.-C. Pour Gabriel Camps, ce sont les ancêtres des Berbères ; ils ne forment pas un peuple unifié mais une mosaïque de tribus.",
        "L'installation se négocie. Dans la légende, Élyssa obtient son terrain du roi libyque Iarbas ; selon Justin (XVIII, 5), Carthage verse ensuite aux Africains un loyer annuel pour le sol de la ville. Elle n'en est libérée qu'au Ve siècle av. J.-C., lorsque les Magonides soumettent l'arrière-pays par les armes (Justin, XIX, 1-2).",
        "Le rapport s'inverse alors : les Libyens des campagnes deviennent des sujets astreints à un lourd tribut, en grain surtout (Polybe, I, 71-72). Leurs révoltes jalonnent l'histoire de la cité, jusqu'à la guerre des Mercenaires (241–238).",
        "On a longtemps pensé que la défaite d'Himère (480) avait poussé Carthage à se tourner vers l'Afrique (Decret). Des historiens y voient plutôt une extension progressive, nécessaire pour nourrir une population en croissance.",
        "Les alliances matrimoniales entre l'aristocratie punique et des familles princières africaines sont courantes — Hamilcar Barca promet sa fille au prince numide Naravas (Polybe, I, 78) — sans que l'État carthaginois perde son caractère phénicien."
      ],
      lpKicker: 'Les Libyphéniciens',
      lpTitle: "Des Phéniciens d'Afrique",
      lpText: "Du mélange des colons et des Libyens naît une population que les Grecs appellent « Libyphéniciens ». Les auteurs anciens ne s'accordent ni sur leur statut ni sur leur territoire, sans doute au sud de Carthage. Ils servent de passeurs entre culture punique et monde berbère.",
      lpRows: [
        { key: 'Hécatée', val: "Première mention, au VIe siècle av. J.-C., connue par Étienne de Byzance." },
        { key: 'Polybe', val: 'Des sujets de Carthage, soumis aux mêmes lois que les Carthaginois.' },
        { key: 'Diodore', val: "Les habitants des cités côtières qui avaient le droit de mariage (conubium) avec Carthage (XX, 55, 4)." },
        { key: 'Tite-Live', val: "Un mélange de Puniques et d'Africains." },
        { key: 'Strabon, Pline', val: "Entre le littoral carthaginois et la Gétulie (Strabon, XVII, 3, 19) ; dans le Byzacium (Pline, V, 24)." }
      ]
    },
    capital: {
      kicker: 'Ville principale',
      title: 'Un site idéal, une ville planifiée',
      rows: [
        { key: 'Le site', val: "Une presqu'île entre lagunes et golfe, facile à défendre et ouverte sur les routes maritimes. Strabon la comparait à un « navire à l'ancre »." },
        { key: 'Byrsa', val: "Le noyau légendaire : citadelle et centre religieux, couronnée par le temple d'Eshmoun." },
        { key: 'La plaine', val: "Des rues droites se coupant à angle droit, avec des escaliers là où le relief l'impose. Pour M. H. Fantar, Carthage montre que les Grecs n'ont pas eu le monopole du plan orthogonal." },
        { key: 'Mégara', val: "Le faubourg du nord, vers l'actuelle La Marsa, bâti de façon plus lâche : peut-être le quartier le plus récent." },
        { key: 'Quartier Magon', val: "Près du rivage, les fouilles allemandes de Friedrich Rakob suivent sur plusieurs siècles l'évolution de la muraille maritime et de l'habitat." },
        { key: 'Les maisons', val: "Sols en mortier mêlé de tessons, escaliers de bois vers les étages, citernes remplies par l'eau de pluie recueillie dans la cour." }
      ],
      k2: 'Cosmopolite',
      t2: 'Une ville de nombreux peuples',
      d2: [
        "Colons phéniciens, Libyens, Grecs, Ibères et gens venus de tout l'espace punique se côtoient à Carthage, et les mariages mixtes y sont fréquents.",
        "Dès les premiers temps de la colonisation, l'archéologie révèle des communautés mêlées : de ce brassage naît une civilisation originale."
      ],
      cta: "L'identité africaine de Carthage"
    },
    city: {
      title: 'La cité de Carthage',
      subtitle: 'Une métropole à la pointe de son époque.',
      features: [
        { kick: 'Urbanisme', title: 'Des maisons à étages', desc: "Selon Appien, trois rues bordées de maisons de six étages montaient de l'agora vers Byrsa. Les fouilles ont retrouvé des rues planifiées, des citernes, des rigoles et des puisards pour les eaux usées, et des maisons dotées de salles d'eau.", cls: '' },
        { kick: 'Marine', title: 'Le double port', desc: "Un port de commerce rectangulaire et un port militaire circulaire, le Cothon, capable d'abriter 220 navires de guerre dans des cales individuelles.", cls: 'tile--navy' },
        { kick: 'Religion', title: 'Temples et tophet', desc: "Le temple d'Eshmoun couronnait la colline de Byrsa. Près des ports, le tophet de Salammbô, sanctuaire à ciel ouvert dédié à Baal Hammon et Tanit, a livré des milliers de stèles.", cls: '', link: { to: '/religion', label: 'Les dieux de Carthage' } },
        { kick: 'Industrie', title: 'Artisanat et pourpre', desc: "Ateliers de poterie, de verrerie et d'orfèvrerie. Production de la pourpre tyrienne, extraite d'un coquillage marin, le murex.", cls: 'tile--sand', link: { to: '/economie', label: "L'économie" } },
        { kick: 'Eau', title: "Gestion de l'eau", desc: "Faute de source abondante, chaque maison recueillait l'eau de pluie dans des citernes. Autour de la ville, une agriculture irriguée et savante nourrit la cité. Le grand aqueduc de Zaghouan, lui, est romain.", cls: '', link: { to: '/agriculture', label: "L'agriculture" } },
        { kick: 'Défense', title: 'Des murailles colossales', desc: "Environ 34 km de remparts. Côté isthme, une triple ligne de murs de 13 m de haut et 9 m d'épaisseur abritait des écuries pour 300 éléphants et 4 000 chevaux, et des casernes pour 20 000 fantassins et 4 000 cavaliers.", cls: 'tile--terra', link: { to: '/armee', label: "L'armée" } }
      ]
    },
    port: {
      kicker: 'Le Cothon',
      title: 'Le port de Carthage',
      lede: "Le célèbre double port, militaire et commercial, décrit par Appien et retrouvé par les archéologues au sud de la ville.",
      alt: "Les ports puniques de Carthage aujourd'hui",
      caption: "Les lagunes des ports puniques, aujourd'hui",
      parts: [
        { n: '1', title: 'Le port de commerce', desc: "Rectangulaire, ouvert sur la mer par une entrée large de 70 pieds que l'on fermait avec des chaînes de fer. Les navires marchands y déchargeaient leurs cargaisons." },
        { n: '2', title: 'Le port militaire', desc: "Circulaire, accessible seulement par le port de commerce. Une double muraille le cachait aux regards : les marchands ne pouvaient voir l'arsenal." },
        { n: '3', title: "L'îlot de l'amiral", desc: "Au centre, une île portait le quartier général de l'amiral, d'où l'on surveillait la mer et donnait les signaux." },
        { n: '220', title: 'Cales à navires', desc: "Des loges couvertes, séparées par des colonnes ioniques, abritaient chacune une galère de guerre." }
      ]
    },
    craft: {
      title: 'Artisanat punique',
      subtitle: 'Les outils et objets qui témoignent du savoir-faire carthaginois.',
      alt: 'Stèle punique décorée du signe de Tanit',
      caption: 'Stèle au signe de Tanit, taillée au ciseau (Louvre)',
      items: [
        { kick: 'Terre cuite', title: 'Lampes à huile', desc: "Simples coupelles pincées à deux becs, elles éclairaient maisons, sanctuaires et tombes.", cls: '' },
        { kick: 'Commerce', title: 'Amphores', desc: "Vin, huile d'olive, poisson salé : les amphores puniques se retrouvent dans tout le bassin méditerranéen.", cls: 'tile--sand' },
        { kick: 'Monnaie', title: 'Monnaies', desc: "Frappées à partir de la fin du Ve siècle, elles portent le cheval, le palmier ou le profil d'une déesse.", cls: 'tile--gold' },
        { kick: 'Métal', title: 'Armes et outils', desc: "Forgerons et bronziers produisaient épées, pointes de lance, ciseaux de tailleurs de pierre et outils agricoles.", cls: '' },
        { kick: 'Écriture', title: 'Rouleaux et savoir', desc: "L'alphabet phénicien de 22 lettres servait aux archives et aux livres. Le traité d'agronomie de Magon fut traduit en latin sur ordre du Sénat romain.", cls: 'tile--purple', link: { to: '/magon-agronome', label: 'Magon l\'agronome' } },
        { kick: 'Pierre', title: 'Stèles', desc: "Des milliers de stèles gravées du tophet, souvent ornées du signe de Tanit, témoignent de l'art des tailleurs de pierre.", cls: '' }
      ]
    },
    map: { title: 'Carthage et ses premières colonies', cta: 'Carte en grand' },
    remains: {
      title: "Vestiges de Carthage aujourd'hui",
      items: [
        { img: 'byrsa.jpg', alt: 'La colline de Byrsa', kick: 'Colline', title: 'Byrsa', text: "Le cœur de la cité légendaire, qui accueille aujourd'hui le Musée national de Carthage." },
        { img: 'punic-quarter.jpg', alt: 'Le quartier punique de Byrsa', kick: 'IIe s. av. J.-C.', title: 'Le quartier punique', text: "Maisons, rues et citernes puniques conservées sous les remblais romains." },
        { img: 'ports.jpg', alt: 'Les ports puniques', kick: 'Cothon', title: 'Le port circulaire', text: "L'îlot de l'amiral se devine encore au milieu de la lagune." },
        { img: 'ruins.jpg', alt: "Ruines des thermes d'Antonin", kick: 'UNESCO · 1979', title: "Thermes d'Antonin", text: "La Carthage romaine, refondée sur le même site, au bord du golfe." }
      ]
    },
    more: {
      title: 'À lire aussi',
      items: [
        { to: '/chronologie', kick: '814 – 146 av. J.-C.', title: 'Chronologie', text: "Sept siècles d'histoire, époque par époque.", cls: 'tile--purple' },
        { to: '/didon', kick: 'Biographie', title: 'Didon (Élyssa)', text: 'La reine fondatrice, entre histoire et légende.', cls: '' },
        { to: '/prise-de-carthage', kick: '146 av. J.-C.', title: 'La prise de Carthage', text: 'Six siècles plus tard, le siège et la chute de Byrsa.', cls: 'tile--ink' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Polybe', work: 'Histoires', ref: 'I, 71–72 ; I, 78', note: 'tribut des Libyens, Naravas ; Libyphéniciens' },
      { type: 'ancient', author: 'Diodore de Sicile', work: 'Bibliothèque historique', ref: 'XX, 55, 4', note: 'Libyphéniciens' },
      { type: 'ancient', author: 'Strabon', work: 'Géographie', ref: 'XVII, 3, 19', note: 'population et site de Carthage, Libyphéniciens' },
      { type: 'ancient', author: 'Pline l\'Ancien', work: 'Histoire naturelle', ref: 'V, 24 ; XVI, 216 ; XIX, 63', note: 'Utique, Lixus, Byzacium' },
      { type: 'ancient', author: 'Appien', work: 'Libyca', ref: 'I, 1', note: 'fondation ; murailles, ports et maisons de Byrsa' },
      { type: 'ancient', author: 'Justin', work: 'Abrégé des Histoires philippiques de Trogue Pompée', ref: 'XVIII, 5 ; XIX, 1–2', note: 'légende d\'Élyssa, loyer versé aux Africains' },
      { type: 'ancient', author: 'Virgile', work: 'Énéide', note: 'rencontre de Didon et d\'Énée, invention poétique' },
      { type: 'modern', author: 'Pierre Cintas', work: 'Manuel d\'archéologie punique', ref: '1970–1976', note: 'hypothèse d\'une fondation en deux temps' },
      { type: 'modern', author: 'Sabatino Moscati', work: 'L\'épopée des Phéniciens', ref: '1971' },
      { type: 'modern', author: 'Gabriel Camps', note: 'cité dans la page (Libyens, ancêtres des Berbères)' },
      { type: 'modern', author: 'François Decret', work: 'Carthage ou l\'empire de la mer', ref: '1977' },
      { type: 'modern', author: 'M\'hamed Hassine Fantar', work: 'Carthage, approche d\'une civilisation', ref: '1993' },
      { type: 'modern', author: 'Friedrich Rakob', note: 'cité dans la page (fouilles allemandes du quartier Magon)' },
      { type: 'modern', author: 'Wikipédia', work: 'Carthage ; Civilisation carthaginoise', note: 'CC BY-SA 4.0, contenus reformulés' }
    ]
  },

  en: {
    meta: {
      title: 'The foundation of Carthage — 814 BC',
      desc: 'Elissa flees Tyre, the oxhide trick, the hill of Byrsa: the foundation of Carthage between legend and archaeology, its twin harbour, its walls and its crafts.'
    },
    hero: {
      chip: '814 BC',
      title: 'The foundation of Carthage',
      lede: 'Birth of a Mediterranean superpower: a princess in exile, an oxhide, a hill facing the sea.',
      alt: 'Turner — Dido building Carthage',
      caption: 'J. M. W. Turner, Dido building Carthage (1815)'
    },
    numbers: [
      { value: '814', label: 'Traditional year of foundation (BC)' },
      { value: '700,000', label: 'Inhabitants at its peak according to Strabo — probably an exaggeration' },
      { value: '34 km', label: 'Of city walls, according to ancient writers' },
      { value: '220', label: 'Warships housed in the circular harbour' },
      { value: '6', label: 'Storeys of the houses on the slopes of Byrsa, according to Appian' },
      { value: '300', label: 'Elephants stabled inside the walls' }
    ],
    legend: {
      kicker: 'The legend',
      title: 'Elissa, princess of Tyre',
      paragraphs: [
        'Dido (Elissa) was a Phoenician princess from Tyre, in present-day Lebanon. Her brother Pygmalion, king of Tyre, murdered her husband Sychaeus — a wealthy priest of the temple of Melqart, the Phoenician Hercules — to seize his treasure. Her husband\'s ghost warned her in a dream.',
        'She fled by sea with a group of loyal followers and Sychaeus\'s riches. During a stop in Cyprus, 80 young women joined the expedition; she reached the coast of present-day Tunisia around 814 BC.',
        'There she negotiated with the Libyan (Berber) king Iarbas for land: as much as a single oxhide could cover — a seemingly modest request. According to the legend, when later pressed to marry Iarbas, she chose to throw herself onto a pyre.'
      ],
      didon: 'The life of Dido',
      alt: 'Guérin — Aeneas telling Dido of the misfortunes of Troy',
      caption: 'Pierre-Narcisse Guérin, Aeneas telling Dido of the misfortunes of Troy (1815), Louvre',
      srcKicker: 'Sources',
      sources: 'The story comes to us from Greek and Latin writers — Timaeus, Justin (epitome of Pompeius Trogus), Virgil. The meeting with Aeneas is a poetic invention of the Aeneid: the dates do not match.',
      srcLink: 'History written by the victor'
    },
    oxhide: {
      title: 'The oxhide stratagem',
      subtitle: 'How Dido founded Carthage by cunning.',
      steps: [
        { title: 'The request', desc: 'Dido asks Iarbas for as much land as an oxhide can cover. The king, thinking it trivial, agrees.' },
        { title: 'The trick', desc: 'She has the hide cut into extremely thin strips, forming a very long leather cord.' },
        { title: 'The foundation', desc: 'With these strips she encircles the whole hill of Byrsa — from the Greek "byrsa", hide. There she founds Qart Hadasht, the "New City".' },
        { title: 'The growth', desc: 'From this hill, Carthage grows into one of the greatest cities of the ancient world, with a naval harbour for 220 ships.' }
      ]
    },
    arch: {
      kicker: 'Myth and archaeology',
      title: 'What the excavations say',
      rows: [
        { key: '814 / 813', val: 'Foundation date given by the Greek historian Timaeus of Tauromenium (4th–3rd c. BC) and taken up by tradition.' },
        { key: 'Appian', val: "Another ancient tradition, followed by Appian (Libyca, I, 1), dated Carthage to the time of the Trojan War, around the 12th century BC. Excavation has found nothing that old." },
        { key: 'Hypotheses', val: "Some scholars proposed a foundation around 670, or a two-stage one — first a trading post, then the city proper (Pierre Cintas). Recent historians, relying on the annals of Tyre known through Menander of Ephesus and Flavius Josephus, favour the last quarter of the 9th century." },
        { key: '8th c.', val: 'The oldest excavated layers — pottery, the first offerings in the tophet of Salammbô — date to the second half of the 8th century BC: the legend is not far from the truth.' },
        { key: 'Byrsa', val: 'The Greek name "byrsa" (hide) is probably a reinterpretation of a Semitic word for the citadel: the oxhide trick may have grown out of this pun.' },
        { key: '6th c.', val: 'Carthage takes the lead of the western Phoenician cities, while Tyre falls under Babylonian, then Persian rule.' }
      ],
      cta: 'Full timeline'
    },
    name: {
      kicker: 'A name',
      title: 'Qart Hadasht, the "New City"',
      text: 'In Phoenician, qart means "city" and hadasht "new": a new Tyre in Africa. The Greeks made it Karchēdōn, the Romans Carthago — and the name still lives on in Tunisia. Cartagena, in Spain, bore the same name, Qart Hadasht.',
      cta: 'Carthage and Tunisia'
    },
    network: {
      title: 'Before Carthage: the western Phoenician network',
      subtitle: "For the Phoenicians, North Africa was at first a stopover on the route to the metals of Spain. Carthage joined a network that was already old.",
      sites: [
        { where: 'Tunisia', date: '1101', name: 'Utica', text: "According to Pliny the Elder (Natural History, XVI, 216), the first Phoenician foundation in Africa, almost three centuries before Carthage. This is a traditional date: the oldest remains found are considerably later." },
        { where: 'Atlantic Morocco', date: '12th c.', name: 'Lixus', text: 'Beyond the Strait of Gibraltar, near modern Larache. Pliny (XIX, 63) counts it among the oldest Phoenician settlements; it later came into the orbit of Carthage.' },
        { where: 'Spain', date: 'c. 1100', name: 'Gades (Gadir)', text: 'Modern Cádiz, on an island. Velleius Paterculus (I, 2, 3) dates its foundation by the Tyrians shortly after the Trojan War. It opened access to the silver and tin of the Iberian Peninsula.' },
        { where: 'Head of the network', date: '6th c.', name: 'A confederation rather than an empire', text: "As Tyre declined, Carthage took the lead of the western Phoenician colonies and handled their common defence and foreign policy. Sabatino Moscati saw this loose structure as one of the causes of its final defeat." }
      ]
    },
    libyans: {
      kicker: 'The Libyan substratum',
      title: 'A land already inhabited',
      paragraphs: [
        'The Phoenicians did not land on empty ground. North Africa was home to the Libyans, whom Egyptian texts already call Libu at the end of the 2nd millennium BC. For Gabriel Camps they are the ancestors of the Berbers; they were not a single people but a patchwork of tribes.',
        "Settlement was negotiated. In the legend, Elissa obtains her land from the Libyan king Iarbas; according to Justin (XVIII, 5), Carthage then paid the Africans a yearly rent for the ground of the city. It was freed from it only in the 5th century BC, when the Magonids subdued the hinterland by force (Justin, XIX, 1-2).",
        'The relationship was then reversed: the rural Libyans became subjects owing a heavy tribute, mostly in grain (Polybius, I, 71-72). Their revolts punctuate the history of the city, up to the Mercenary War (241–238).',
        'It was long thought that the defeat at Himera (480) pushed Carthage to turn towards Africa (Decret). Some historians rather see a gradual expansion, needed to feed a growing population.',
        "Marriage alliances between the Punic aristocracy and African princely families were common — Hamilcar Barca promised his daughter to the Numidian prince Naravas (Polybius, I, 78) — without the Carthaginian state losing its Phoenician character."
      ],
      lpKicker: 'The Libyphoenicians',
      lpTitle: 'Phoenicians of Africa',
      lpText: 'From the mixing of settlers and Libyans came a population the Greeks called “Libyphoenicians”. Ancient authors disagree about their status and territory, probably south of Carthage. They acted as go-betweens between Punic culture and the Berber world.',
      lpRows: [
        { key: 'Hecataeus', val: 'First mention, in the 6th century BC, known through Stephanus of Byzantium.' },
        { key: 'Polybius', val: 'Subjects of Carthage, living under the same laws as the Carthaginians.' },
        { key: 'Diodorus', val: 'The inhabitants of the coastal towns who had the right of marriage (conubium) with Carthage (XX, 55, 4).' },
        { key: 'Livy', val: 'A mixture of Punic people and Africans.' },
        { key: 'Strabo, Pliny', val: 'Between the Carthaginian coast and Gaetulia (Strabo, XVII, 3, 19); in Byzacium (Pliny, V, 24).' }
      ]
    },
    capital: {
      kicker: 'The main city',
      title: 'An ideal site, a planned city',
      rows: [
        { key: 'The site', val: 'A peninsula between lagoons and gulf, easy to defend and open to the sea lanes. Strabo compared it to “a ship at anchor”.' },
        { key: 'Byrsa', val: 'The legendary core: citadel and religious centre, crowned by the temple of Eshmun.' },
        { key: 'The plain', val: 'Straight streets crossing at right angles, with stairs where the slope required. For M. H. Fantar, Carthage shows that the Greeks had no monopoly on the grid plan.' },
        { key: 'Megara', val: 'The northern suburb, towards modern La Marsa, more loosely built: perhaps the most recent district.' },
        { key: 'Mago quarter', val: "Near the shore, Friedrich Rakob's German excavations trace the evolution of the sea wall and of housing over several centuries." },
        { key: 'Houses', val: 'Floors of mortar mixed with potsherds, wooden stairs to the upper storeys, cisterns filled with rainwater collected in the courtyard.' }
      ],
      k2: 'Cosmopolitan',
      t2: 'A city of many peoples',
      d2: [
        'Phoenician settlers, Libyans, Greeks, Iberians and people from all over the Punic world lived side by side in Carthage, and mixed marriages were frequent.',
        'From the earliest days of colonisation, archaeology reveals mixed communities: out of this blend grew an original civilisation.'
      ],
      cta: "Carthage's African identity"
    },
    city: {
      title: 'The city of Carthage',
      subtitle: 'A metropolis at the forefront of its age.',
      features: [
        { kick: 'Town planning', title: 'Multi-storey houses', desc: 'According to Appian, three streets lined with six-storey houses climbed from the agora to Byrsa. Excavations have found planned streets, cisterns, gutters and soakaway pits for waste water, and houses with bathrooms.', cls: '' },
        { kick: 'Navy', title: 'The twin harbour', desc: 'A rectangular commercial harbour and a circular naval harbour, the Cothon, able to shelter 220 warships in individual sheds.', cls: 'tile--navy' },
        { kick: 'Religion', title: 'Temples and tophet', desc: 'The temple of Eshmun crowned the hill of Byrsa. Near the harbours, the tophet of Salammbô, an open-air sanctuary to Baal Hammon and Tanit, has yielded thousands of stelae.', cls: '', link: { to: '/religion', label: 'The gods of Carthage' } },
        { kick: 'Industry', title: 'Crafts and purple', desc: 'Pottery, glass and goldsmith workshops. Production of Tyrian purple, extracted from a sea snail, the murex.', cls: 'tile--sand', link: { to: '/economie', label: 'The economy' } },
        { kick: 'Water', title: 'Water management', desc: 'Lacking abundant springs, every house collected rainwater in cisterns. Around the city, skilled irrigated farming fed the population. The great Zaghouan aqueduct, by contrast, is Roman.', cls: '', link: { to: '/agriculture', label: 'Agriculture' } },
        { kick: 'Defence', title: 'Colossal walls', desc: 'Some 34 km of ramparts. On the isthmus side, a triple line of walls 13 m high and 9 m thick housed stables for 300 elephants and 4,000 horses, and barracks for 20,000 infantry and 4,000 cavalry.', cls: 'tile--terra', link: { to: '/armee', label: 'The army' } }
      ]
    },
    port: {
      kicker: 'The Cothon',
      title: 'The harbour of Carthage',
      lede: 'The famous twin harbour, naval and commercial, described by Appian and found by archaeologists south of the city.',
      alt: 'The Punic harbours of Carthage today',
      caption: 'The lagoons of the Punic harbours today',
      parts: [
        { n: '1', title: 'The commercial harbour', desc: 'Rectangular, opening onto the sea through an entrance 70 feet wide that could be closed with iron chains. Merchant ships unloaded their cargoes here.' },
        { n: '2', title: 'The naval harbour', desc: 'Circular, reachable only through the commercial harbour. A double wall hid it from view: merchants could not see the arsenal.' },
        { n: '3', title: "The admiral's island", desc: "In the centre, an island held the admiral's headquarters, from which the sea was watched and signals given." },
        { n: '220', title: 'Ship sheds', desc: 'Covered bays, separated by Ionic columns, each housed a war galley.' }
      ]
    },
    craft: {
      title: 'Punic craftsmanship',
      subtitle: 'Tools and objects that bear witness to Carthaginian skill.',
      alt: 'Punic stele decorated with the sign of Tanit',
      caption: 'Stele bearing the sign of Tanit, chisel-carved (Louvre)',
      items: [
        { kick: 'Terracotta', title: 'Oil lamps', desc: 'Simple pinched saucers with two spouts, they lit houses, sanctuaries and tombs.', cls: '' },
        { kick: 'Trade', title: 'Amphorae', desc: 'Wine, olive oil, salted fish: Punic amphorae are found all around the Mediterranean.', cls: 'tile--sand' },
        { kick: 'Coinage', title: 'Coins', desc: 'Struck from the late 5th century, they show the horse, the palm tree or the profile of a goddess.', cls: 'tile--gold' },
        { kick: 'Metal', title: 'Weapons and tools', desc: 'Smiths and bronze-workers produced swords, spearheads, stonemasons\' chisels and farm tools.', cls: '' },
        { kick: 'Writing', title: 'Scrolls and learning', desc: 'The 22-letter Phoenician alphabet served for archives and books. Mago\'s treatise on agronomy was translated into Latin by order of the Roman Senate.', cls: 'tile--purple', link: { to: '/magon-agronome', label: 'Mago the agronomist' } },
        { kick: 'Stone', title: 'Stelae', desc: 'Thousands of carved stelae from the tophet, often decorated with the sign of Tanit, show the art of the stonemasons.', cls: '' }
      ]
    },
    map: { title: 'Carthage and its first colonies', cta: 'Full-size map' },
    remains: {
      title: 'Remains of Carthage today',
      items: [
        { img: 'byrsa.jpg', alt: 'The hill of Byrsa', kick: 'Hill', title: 'Byrsa', text: 'The heart of the legendary city, now home to the Carthage National Museum.' },
        { img: 'punic-quarter.jpg', alt: 'The Punic quarter on Byrsa', kick: '2nd c. BC', title: 'The Punic quarter', text: 'Punic houses, streets and cisterns preserved beneath Roman fill.' },
        { img: 'ports.jpg', alt: 'The Punic harbours', kick: 'Cothon', title: 'The circular harbour', text: "The admiral's island can still be made out in the middle of the lagoon." },
        { img: 'ruins.jpg', alt: 'Ruins of the Antonine Baths', kick: 'UNESCO · 1979', title: 'Antonine Baths', text: 'Roman Carthage, refounded on the same site, by the gulf.' }
      ]
    },
    more: {
      title: 'Read also',
      items: [
        { to: '/chronologie', kick: '814 – 146 BC', title: 'Timeline', text: 'Seven centuries of history, era by era.', cls: 'tile--purple' },
        { to: '/didon', kick: 'Biography', title: 'Dido (Elissa)', text: 'The founding queen, between history and legend.', cls: '' },
        { to: '/prise-de-carthage', kick: '146 BC', title: 'The capture of Carthage', text: 'Six centuries later, the siege and the fall of Byrsa.', cls: 'tile--ink' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Polybius', work: 'Histories', ref: 'I, 71–72 ; I, 78', note: 'Libyan tribute, Naravas; Libyphoenicians' },
      { type: 'ancient', author: 'Diodorus Siculus', work: 'Library of History', ref: 'XX, 55, 4', note: 'Libyphoenicians' },
      { type: 'ancient', author: 'Strabo', work: 'Geography', ref: 'XVII, 3, 19', note: 'population and site of Carthage, Libyphoenicians' },
      { type: 'ancient', author: 'Pliny the Elder', work: 'Natural History', ref: 'V, 24 ; XVI, 216 ; XIX, 63', note: 'Utica, Lixus, Byzacium' },
      { type: 'ancient', author: 'Appian', work: 'Libyca', ref: 'I, 1', note: 'foundation; walls, harbours and houses of Byrsa' },
      { type: 'ancient', author: 'Justin', work: 'Epitome of Pompeius Trogus\' Philippic Histories', ref: 'XVIII, 5 ; XIX, 1–2', note: 'legend of Elissa, rent paid to the Africans' },
      { type: 'ancient', author: 'Virgil', work: 'Aeneid', note: 'Dido meeting Aeneas, a poetic invention' },
      { type: 'modern', author: 'Pierre Cintas', work: 'Manuel d\'archéologie punique', ref: '1970–1976', note: 'two-stage foundation hypothesis' },
      { type: 'modern', author: 'Sabatino Moscati', work: 'L\'épopée des Phéniciens', ref: '1971' },
      { type: 'modern', author: 'Gabriel Camps', note: 'cited on this page (Libyans as ancestors of the Berbers)' },
      { type: 'modern', author: 'François Decret', work: 'Carthage ou l\'empire de la mer', ref: '1977' },
      { type: 'modern', author: 'M\'hamed Hassine Fantar', work: 'Carthage, approche d\'une civilisation', ref: '1993' },
      { type: 'modern', author: 'Friedrich Rakob', note: 'cited on this page (German excavations of the Magon quarter)' },
      { type: 'modern', author: 'Wikipedia (French)', work: 'Carthage ; Civilisation carthaginoise', note: 'CC BY-SA 4.0, content rephrased' }
    ]
  },

  ar: {
    meta: {
      title: 'تأسيس قرطاج — 814 ق.م',
      desc: 'عليسة تفرّ من صور، وحيلة جلد الثور، وتلة بيرصا: تأسيس قرطاج بين الأسطورة وعلم الآثار، وميناؤها المزدوج وأسوارها وحِرفها.'
    },
    hero: {
      chip: '814 ق.م',
      title: 'تأسيس قرطاج',
      lede: 'ولادة قوة عظمى متوسطية: أميرة في المنفى، وجلد ثور، وتلة تطل على البحر.',
      alt: 'تيرنر — ديدون تبني قرطاج',
      caption: 'ج. م. و. تيرنر، ديدون تبني قرطاج (1815)'
    },
    numbers: [
      { value: '814', label: 'سنة التأسيس حسب الرواية التقليدية (ق.م)' },
      { value: '700,000', label: 'ساكن في أوجها حسب سترابون — رقم مبالغ فيه على الأرجح' },
      { value: '34 كم', label: 'من الأسوار حسب المؤلفين القدامى' },
      { value: '220', label: 'سفينة حربية في الميناء الدائري' },
      { value: '6', label: 'طوابق للبيوت على منحدرات بيرصا حسب أبيانوس' },
      { value: '300', label: 'فيل في إسطبلات الأسوار' }
    ],
    legend: {
      kicker: 'الأسطورة',
      title: 'عليسة، أميرة صور',
      paragraphs: [
        'كانت ديدون (عليسة) أميرة فينيقية من مدينة صور في لبنان الحالي. اغتال شقيقها بيغماليون، ملك صور، زوجها سيخايوس — الكاهن الثري في معبد ملقرت، هرقل الفينيقيين — ليستولي على كنوزه، فحذّرها شبح زوجها في المنام.',
        'فرّت بحرًا مع جماعة من الأتباع المخلصين وثروات سيخايوس. وفي توقف بقبرص انضمت إليها 80 فتاة، ثم بلغت سواحل تونس الحالية نحو سنة 814 ق.م.',
        'هناك فاوضت الملك الليبي (الأمازيغي) إيارباس للحصول على أرض: بقدر ما يغطيه جلد ثور واحد — وهو طلب بدا متواضعًا. وتقول الأسطورة إنها حين أُلحّ عليها لاحقًا بالزواج من إيارباس، فضّلت أن تلقي بنفسها في محرقة.'
      ],
      didon: 'سيرة ديدون',
      alt: 'غيران — إينياس يروي لديدون مآسي طروادة',
      caption: 'بيير-نارسيس غيران، إينياس يروي لديدون مآسي طروادة (1815)، متحف اللوفر',
      srcKicker: 'المصادر',
      sources: 'وصلتنا هذه القصة من مؤلفين إغريق ولاتين — تيمايوس، ويوستينوس (مختصر تروغوس بومبيوس)، وفرجيل. أما لقاؤها بإينياس فاختراع شعري في «الإنيادة»: التواريخ لا تتطابق.',
      srcLink: 'التاريخ الذي كتبه المنتصر'
    },
    oxhide: {
      title: 'حيلة جلد الثور',
      subtitle: 'كيف أسست ديدون قرطاج بالحيلة.',
      steps: [
        { title: 'الطلب', desc: 'تطلب ديدون من إيارباس أرضًا بقدر جلد ثور. يظنه الملك طلبًا تافهًا فيوافق.' },
        { title: 'الحيلة', desc: 'تقطع الجلد إلى شرائط رفيعة جدًا، تصنع منها حبلًا جلديًا طويلًا للغاية.' },
        { title: 'التأسيس', desc: 'تحيط بهذه الشرائط تلة بيرصا كلها — من الإغريقية «بيرصا» أي الجلد — وتؤسس هناك «قرت حدشت»، المدينة الجديدة.' },
        { title: 'النمو', desc: 'من هذه التلة، تصبح قرطاج من أعظم مدن العالم القديم، بميناء حربي يتسع لـ220 سفينة.' }
      ]
    },
    arch: {
      kicker: 'الأسطورة وعلم الآثار',
      title: 'ما تقوله الحفريات',
      rows: [
        { key: '814 / 813', val: 'تاريخ التأسيس الذي أورده المؤرخ الإغريقي تيمايوس التاورميني (القرنان 4–3 ق.م)، وأخذت به الرواية التقليدية.' },
        { key: 'أبيانوس', val: 'رواية قديمة أخرى، أخذ بها أبيانوس (الليبيكا، 1، 1)، كانت ترجع قرطاج إلى زمن حرب طروادة، نحو القرن الثاني عشر ق.م. ولم تكشف الحفريات عن شيء بهذا القِدم.' },
        { key: 'فرضيات', val: 'اقترح بعضهم تأسيسًا نحو 670 ق.م، أو تأسيسًا على مرحلتين — مركز تجاري أولًا ثم المدينة بمعناها الحقيقي (بيار سانتاس). أما المؤرخون المحدثون، فاستنادًا إلى حوليات صور التي نقلها ميناندر الأفسسي وفلافيوس يوسيفوس، يرجّحون الربع الأخير من القرن التاسع ق.م.' },
        { key: 'ق 8', val: 'تعود أقدم الطبقات المكتشفة — خزف، وأولى القرابين في توفيت صلامبو — إلى النصف الثاني من القرن الثامن ق.م: الأسطورة ليست بعيدة عن الحقيقة.' },
        { key: 'بيرصا', val: 'الاسم الإغريقي «بيرصا» (الجلد) هو على الأرجح إعادة تأويل لكلمة سامية تعني القلعة: وربما وُلدت حيلة جلد الثور من هذا التلاعب اللفظي.' },
        { key: 'ق 6', val: 'تتصدر قرطاج المدن الفينيقية في الغرب، بينما تقع صور تحت الحكم البابلي ثم الفارسي.' }
      ],
      cta: 'التسلسل الزمني كاملًا'
    },
    name: {
      kicker: 'اسم',
      title: 'قرت حدشت، «المدينة الجديدة»',
      text: 'في الفينيقية تعني «قرت» المدينة و«حدشت» الجديدة: صور جديدة في إفريقيا. جعلها الإغريق «كارخيدون» والرومان «كارتاغو» — وما يزال الاسم حيًّا في تونس. وقد حملت قرطاجنة في إسبانيا الاسم نفسه: قرت حدشت.',
      cta: 'قرطاج وتونس'
    },
    network: {
      title: 'قبل قرطاج: الشبكة الفينيقية في الغرب',
      subtitle: 'كانت إفريقيا الشمالية بالنسبة للفينيقيين في البداية محطة على طريق معادن إسبانيا. وانضمت قرطاج إلى شبكة قديمة قائمة.',
      sites: [
        { where: 'تونس', date: '1101', name: 'أوتيكا', text: 'حسب بلينيوس الأكبر (التاريخ الطبيعي، 16، 216)، هي أول تأسيس فينيقي في إفريقيا، قبل قرطاج بنحو ثلاثة قرون. غير أنه تاريخ تقليدي: فأقدم البقايا المكتشفة أحدث منه بكثير.' },
        { where: 'المغرب الأطلسي', date: 'ق 12', name: 'ليكسوس', text: 'وراء مضيق جبل طارق، قرب العرائش الحالية. يعدّها بلينيوس (19، 63) من أقدم المستوطنات الفينيقية، ثم دخلت لاحقًا في فلك قرطاج.' },
        { where: 'إسبانيا', date: 'نحو 1100', name: 'قادس (جادير)', text: 'قادش الحالية، على جزيرة. يضع فيليوس باتركولوس (1، 2، 3) تأسيسها على يد الصوريين بعد حرب طروادة بقليل. وقد فتحت الطريق إلى فضة شبه الجزيرة الإيبيرية وقصديرها.' },
        { where: 'رأس الشبكة', date: 'ق 6', name: 'اتحاد أكثر منه إمبراطورية', text: 'مع تراجع صور، تصدّرت قرطاج المستعمرات الفينيقية في الغرب وتولّت الدفاع المشترك والسياسة الخارجية. ورأى سباتينو موسكاتي في هذا البناء الرخو أحد أسباب هزيمتها النهائية.' }
      ]
    },
    libyans: {
      kicker: 'الأساس الليبي',
      title: 'أرض مأهولة من قبل',
      paragraphs: [
        'لم ينزل الفينيقيون أرضًا خالية. فقد كانت إفريقيا الشمالية موطن الليبيين، الذين تسميهم النصوص المصرية «ليبو» منذ أواخر الألف الثاني ق.م. ويرى غابرييل كامب أنهم أسلاف الأمازيغ؛ ولم يكونوا شعبًا موحدًا بل فسيفساء من القبائل.',
        'جرى الاستقرار بالتفاوض. ففي الأسطورة تحصل عليسة على أرضها من الملك الليبي يارباس؛ وحسب يوستينوس (18، 5) دفعت قرطاج بعد ذلك للأفارقة إتاوة سنوية مقابل أرض المدينة. ولم تتحرر منها إلا في القرن الخامس ق.م، حين أخضع الماغونيون الداخل بقوة السلاح (يوستينوس، 19، 1-2).',
        'عندها انقلبت العلاقة: صار ليبيو الأرياف رعايا تُفرض عليهم ضريبة ثقيلة، من الحبوب أساسًا (بوليبيوس، 1، 71-72). وتتخلل ثوراتهم تاريخ المدينة، حتى حرب المرتزقة (241–238).',
        'ساد طويلًا الاعتقاد بأن هزيمة هيميرا (480) دفعت قرطاج إلى التوجه نحو إفريقيا (ديكريه). ويرى مؤرخون بالأحرى توسعًا تدريجيًا اقتضته تغذية سكان يتزايدون.',
        'كانت المصاهرات بين الأرستقراطية البونيقية والأسر الأميرية الإفريقية شائعة — فقد وعد حملقار برقة الأمير النوميدي نارافاس بابنته (بوليبيوس، 1، 78) — من غير أن تفقد الدولة القرطاجية طابعها الفينيقي.'
      ],
      lpKicker: 'الليبيون الفينيقيون',
      lpTitle: 'فينيقيو إفريقيا',
      lpText: 'من امتزاج المستوطنين بالليبيين نشأ سكان سمّاهم الإغريق «الليبيين الفينيقيين». ولا يتفق المؤلفون القدامى على وضعهم ولا على إقليمهم، الواقع على الأرجح جنوب قرطاج. وقد أدّوا دور الوسيط بين الثقافة البونيقية والعالم الأمازيغي.',
      lpRows: [
        { key: 'هيكاتيوس', val: 'أول ذكر لهم، في القرن السادس ق.م، وصلنا عن طريق إسطفانوس البيزنطي.' },
        { key: 'بوليبيوس', val: 'رعايا لقرطاج يخضعون للقوانين نفسها التي يخضع لها القرطاجيون.' },
        { key: 'ديودوروس', val: 'سكان المدن الساحلية الذين كان لهم حق التزاوج مع قرطاج (20، 55، 4).' },
        { key: 'تيتوس ليفيوس', val: 'خليط من البونيقيين والأفارقة.' },
        { key: 'سترابون، بلينيوس', val: 'بين الساحل القرطاجي وجيتوليا (سترابون، 17، 3، 19)؛ وفي بيزاكيوم (بلينيوس، 5، 24).' }
      ]
    },
    capital: {
      kicker: 'المدينة الأم',
      title: 'موقع مثالي ومدينة مخططة',
      rows: [
        { key: 'الموقع', val: 'شبه جزيرة بين البحيرات والخليج، سهلة الدفاع ومفتوحة على الطرق البحرية. وقد شبّهها سترابون بـ«سفينة راسية».' },
        { key: 'بيرصا', val: 'النواة الأسطورية: قلعة ومركز ديني، يتوّجها معبد أشمون.' },
        { key: 'السهل', val: 'شوارع مستقيمة تتقاطع بزوايا قائمة، مع درجات حيث يفرض ذلك الانحدار. ويرى محمد حسين فنطر أن قرطاج تُثبت أن الإغريق لم يحتكروا التخطيط الشبكي.' },
        { key: 'ميغارا', val: 'الضاحية الشمالية، نحو المرسى الحالية، وبناؤها أقل انتظامًا: ولعلها أحدث الأحياء.' },
        { key: 'حي ماغون', val: 'قرب الشاطئ، تتتبع الحفريات الألمانية بقيادة فريدريش راكوب تطور السور البحري والمساكن على مدى قرون.' },
        { key: 'البيوت', val: 'أرضيات من ملاط ممزوج بكسر الفخار، وسلالم خشبية إلى الطوابق، وصهاريج تملؤها مياه الأمطار المجموعة في الفناء.' }
      ],
      k2: 'مدينة كوسموبوليتية',
      t2: 'مدينة شعوب كثيرة',
      d2: [
        'تجاور في قرطاج المستوطنون الفينيقيون والليبيون والإغريق والإيبيريون وأناس من كل أنحاء العالم البونيقي، وكان الزواج المختلط شائعًا.',
        'منذ الأيام الأولى للاستيطان يكشف علم الآثار عن مجتمعات مختلطة: ومن هذا الامتزاج وُلدت حضارة أصيلة.'
      ],
      cta: 'الهوية الإفريقية لقرطاج'
    },
    city: {
      title: 'مدينة قرطاج',
      subtitle: 'حاضرة في طليعة عصرها.',
      features: [
        { kick: 'العمران', title: 'بيوت متعددة الطوابق', desc: 'حسب أبيانوس، كانت ثلاثة شوارع تصطف على جانبيها بيوت من ستة طوابق تصعد من الساحة العامة نحو بيرصا. وكشفت الحفريات شوارع مخططة وصهاريج وسواقي وآبار لتصريف المياه المستعملة، وبيوتًا مزودة بحمّامات.', cls: '' },
        { kick: 'البحرية', title: 'الميناء المزدوج', desc: 'ميناء تجاري مستطيل وميناء عسكري دائري، الكوثون، يتسع لـ220 سفينة حربية في أحواض فردية.', cls: 'tile--navy' },
        { kick: 'الدين', title: 'المعابد والتوفيت', desc: 'كان معبد أشمون يتوّج تلة بيرصا. وقرب الموانئ، كشفت توفيت صلامبو، وهي حرم مكشوف مكرّس لبعل حمون وتانيت، عن آلاف النصب.', cls: '', link: { to: '/religion', label: 'آلهة قرطاج' } },
        { kick: 'الصناعة', title: 'الحِرف والأرجوان', desc: 'ورشات للخزف والزجاج والصياغة، وإنتاج الأرجوان الصوري المستخرج من صدفة بحرية هي الموريكس.', cls: 'tile--sand', link: { to: '/economie', label: 'الاقتصاد' } },
        { kick: 'الماء', title: 'تدبير الماء', desc: 'لغياب ينابيع وفيرة، كان كل بيت يجمع ماء المطر في صهاريج. وحول المدينة غذّتها زراعة مروية متقنة. أما حنايا زغوان الكبرى فرومانية.', cls: '', link: { to: '/agriculture', label: 'الفلاحة' } },
        { kick: 'الدفاع', title: 'أسوار هائلة', desc: 'نحو 34 كم من الأسوار. وعلى جهة البرزخ، ضم خط ثلاثي من الجدران بارتفاع 13 م وسمك 9 م إسطبلات لـ300 فيل و4,000 حصان، وثكنات لـ20,000 من المشاة و4,000 فارس.', cls: 'tile--terra', link: { to: '/armee', label: 'الجيش' } }
      ]
    },
    port: {
      kicker: 'الكوثون',
      title: 'ميناء قرطاج',
      lede: 'الميناء المزدوج الشهير، العسكري والتجاري، كما وصفه أبيانوس وكما كشفه علماء الآثار جنوب المدينة.',
      alt: 'الموانئ البونيقية في قرطاج اليوم',
      caption: 'بحيرتا الموانئ البونيقية اليوم',
      parts: [
        { n: '1', title: 'الميناء التجاري', desc: 'مستطيل، ينفتح على البحر بمدخل عرضه 70 قدمًا يُغلق بسلاسل من حديد. هنا كانت السفن التجارية تفرغ حمولاتها.' },
        { n: '2', title: 'الميناء العسكري', desc: 'دائري، لا يُبلغ إلا عبر الميناء التجاري. كان سور مزدوج يحجبه عن الأنظار، فلا يرى التجار الترسانة.' },
        { n: '3', title: 'جزيرة الأميرال', desc: 'في الوسط، جزيرة عليها مقر قيادة الأميرال، ومنها تُراقَب البحر وتُعطى الإشارات.' },
        { n: '220', title: 'أحواض السفن', desc: 'أحواض مسقوفة تفصل بينها أعمدة أيونية، يأوي كلٌّ منها سفينة حربية.' }
      ]
    },
    craft: {
      title: 'الحِرف البونيقية',
      subtitle: 'الأدوات والأشياء التي تشهد على المهارة القرطاجية.',
      alt: 'نصب بونيقي مزيّن بعلامة تانيت',
      caption: 'نصب يحمل علامة تانيت، منحوت بالإزميل (اللوفر)',
      items: [
        { kick: 'الفخار', title: 'قناديل الزيت', desc: 'صحون بسيطة مقروصة بمصبّين، كانت تضيء البيوت والمعابد والقبور.', cls: '' },
        { kick: 'التجارة', title: 'الجِرار', desc: 'الخمر وزيت الزيتون والسمك المملّح: توجد الجرار البونيقية في كل أرجاء المتوسط.', cls: 'tile--sand' },
        { kick: 'النقود', title: 'العملات', desc: 'سُكّت منذ أواخر القرن الخامس ق.م، وتحمل صورة الحصان أو النخلة أو وجه إلهة.', cls: 'tile--gold' },
        { kick: 'المعادن', title: 'الأسلحة والأدوات', desc: 'كان الحدادون وصنّاع البرونز ينتجون السيوف ورؤوس الرماح وأزاميل النحّاتين وأدوات الفلاحة.', cls: '' },
        { kick: 'الكتابة', title: 'اللفائف والمعرفة', desc: 'استُعملت الأبجدية الفينيقية ذات الحروف الاثنين والعشرين للأرشيف والكتب. وتُرجم كتاب ماغون في الفلاحة إلى اللاتينية بأمر من مجلس الشيوخ الروماني.', cls: 'tile--purple', link: { to: '/magon-agronome', label: 'ماغون الفلاحي' } },
        { kick: 'الحجر', title: 'النصب', desc: 'آلاف النصب المنقوشة من التوفيت، كثيرًا ما تزيّنها علامة تانيت، تشهد على فن النحّاتين.', cls: '' }
      ]
    },
    map: { title: 'قرطاج ومستعمراتها الأولى', cta: 'الخريطة كاملة' },
    remains: {
      title: 'بقايا قرطاج اليوم',
      items: [
        { img: 'byrsa.jpg', alt: 'تلة بيرصا', kick: 'تلة', title: 'بيرصا', text: 'قلب المدينة الأسطورية، وفيها اليوم المتحف الوطني بقرطاج.' },
        { img: 'punic-quarter.jpg', alt: 'الحي البونيقي في بيرصا', kick: 'ق 2 ق.م', title: 'الحي البونيقي', text: 'بيوت وشوارع وصهاريج بونيقية محفوظة تحت الردم الروماني.' },
        { img: 'ports.jpg', alt: 'الموانئ البونيقية', kick: 'الكوثون', title: 'الميناء الدائري', text: 'ما تزال جزيرة الأميرال تُرى وسط البحيرة.' },
        { img: 'ruins.jpg', alt: 'أطلال حمامات أنطونيوس', kick: 'يونسكو · 1979', title: 'حمامات أنطونيوس', text: 'قرطاج الرومانية، المعاد تأسيسها في الموقع نفسه، على ضفة الخليج.' }
      ]
    },
    more: {
      title: 'اقرأ أيضًا',
      items: [
        { to: '/chronologie', kick: '814 – 146 ق.م', title: 'التسلسل الزمني', text: 'سبعة قرون من التاريخ، حقبة بعد حقبة.', cls: 'tile--purple' },
        { to: '/didon', kick: 'سيرة', title: 'ديدون (عليسة)', text: 'الملكة المؤسِّسة، بين التاريخ والأسطورة.', cls: '' },
        { to: '/prise-de-carthage', kick: '146 ق.م', title: 'الاستيلاء على قرطاج', text: 'بعد ستة قرون: الحصار وسقوط بيرصا.', cls: 'tile--ink' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'بوليبيوس', work: 'التواريخ', ref: 'I, 71–72 ; I, 78', note: 'خراج الليبيين، ناراواس؛ الليبيون الفينيقيون' },
      { type: 'ancient', author: 'ديودوروس الصقلي', work: 'المكتبة التاريخية', ref: 'XX, 55, 4', note: 'الليبيون الفينيقيون' },
      { type: 'ancient', author: 'سترابون', work: 'الجغرافيا', ref: 'XVII, 3, 19', note: 'سكان قرطاج وموقعها، الليبيون الفينيقيون' },
      { type: 'ancient', author: 'بلينيوس الأكبر', work: 'التاريخ الطبيعي', ref: 'V, 24 ; XVI, 216 ; XIX, 63', note: 'أوتيكا، ليكسوس، بيزاسيوم' },
      { type: 'ancient', author: 'أبيانوس', work: 'الكتاب الليبي (ليبيكا)', ref: 'I, 1', note: 'التأسيس؛ الأسوار والموانئ ومنازل بيرصا' },
      { type: 'ancient', author: 'يوستينوس', work: 'مختصر التواريخ الفيليبية لتروغوس بومبيوس', ref: 'XVIII, 5 ; XIX, 1–2', note: 'أسطورة عليسة، الإتاوة المدفوعة للأفارقة' },
      { type: 'ancient', author: 'فرجيل', work: 'الإنيادة', note: 'لقاء ديدون وإينياس، اختلاق شعري' },
      { type: 'modern', author: 'بيير سنتاس', work: 'Manuel d\'archéologie punique', ref: '1970–1976', note: 'فرضية التأسيس على مرحلتين' },
      { type: 'modern', author: 'سباتينو موسكاتي', work: 'L\'épopée des Phéniciens', ref: '1971' },
      { type: 'modern', author: 'غابرييل كامب', note: 'مذكور في الصفحة (الليبيون أسلاف الأمازيغ)' },
      { type: 'modern', author: 'فرانسوا ديكريه', work: 'Carthage ou l\'empire de la mer', ref: '1977' },
      { type: 'modern', author: 'محمد حسين فنطر', work: 'Carthage, approche d\'une civilisation', ref: '1993' },
      { type: 'modern', author: 'فريدريش راكوب', note: 'مذكور في الصفحة (الحفريات الألمانية في حي ماغون)' },
      { type: 'modern', author: 'ويكيبيديا (بالفرنسية)', work: 'Carthage ; Civilisation carthaginoise', note: 'رخصة CC BY-SA 4.0، مع إعادة صياغة المحتوى' }
    ]
  }
}

const c = await useLocalized('fondation', C)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-text { position: relative; }
.watermark {
  position: absolute;
  inset-inline-end: -10px;
  top: 36px;
  font-size: clamp(64px, 8vw, 120px);
  color: rgba(255, 255, 255, 0.08);
  pointer-events: none;
  white-space: nowrap;
  direction: rtl;
}

.stat-text { font: 500 15px/1.45 var(--font-body); margin-top: 10px; }

.legend-title { margin-bottom: 24px; }
.legend-text { display: flex; flex-direction: column; gap: 14px; max-width: 700px; }
.legend-cta { margin-top: 26px; }
.legend-side { display: flex; flex-direction: column; gap: var(--gap); }
.legend-fig { flex: 1; min-height: 360px; }
.src-link { display: inline-flex; align-items: center; min-height: 44px; margin-top: 6px; font-weight: 600; }

.step { min-height: 250px; }
.step-n { font: 900 clamp(38px, 4vw, 56px)/1 var(--font-display); opacity: 0.55; }

.arch-title { margin-bottom: 28px; }
.arch-cta { margin-top: 26px; }
.name-phoen { font-size: clamp(34px, 3.4vw, 48px); margin: 6px 0 18px; color: var(--purple); }

.site { min-height: 280px; }
.site-date { font: 900 clamp(34px, 3.4vw, 48px)/1 var(--font-display); letter-spacing: -0.02em; margin: 10px 0 8px; }
.lp-title { margin: 6px 0 12px; }
.lp-rows { margin-top: 20px; }
.lp-rows .key { font-size: 17px; }
.lp-rows .val { font-size: 15px; }
.cosmo-p + .cosmo-p { margin-top: 12px; }
.cosmo-btn { align-self: flex-start; }

.feat-link { display: inline-flex; align-items: center; min-height: 44px; margin-top: 6px; font-weight: 600; }
.tile--navy .feat-link, .tile--terra .feat-link, .tile--purple .feat-link { color: var(--white); }

.port-fig { min-height: 520px; }
.port-title { margin-bottom: 14px; }
.port-lede { color: var(--navy-soft); margin-bottom: 28px; }
.port-parts { gap: 24px 28px; }
.port-part { border-top: 1px solid rgba(255, 255, 255, 0.25); padding-top: 14px; }
.port-n { font: 900 28px/1 var(--font-display); color: var(--navy-tint); margin-bottom: 8px; }
.port-h { font: 800 19px/1.15 var(--font-display); margin: 0 0 6px; }

.craft { padding-top: 0; }
.craft-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--gap); }
.craft-item .h-card { font-size: clamp(18px, 1.5vw, 22px); }

.remains-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.more-title { margin-bottom: 20px; }
.more { min-height: 200px; }

@media (max-width: 1100px) {
  .craft-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 960px) {
  .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .craft-fig { min-height: 360px; }
  .port-fig { min-height: 360px; }
  .step { min-height: 200px; }
  .site { min-height: 0; }
}

@media (max-width: 640px) {
  .fig--hero { min-height: 260px; }
  .stat { padding: 18px; }
  .stat .num { font-size: 32px; }
  .stat-text { font-size: 13px; }
  .legend-fig { min-height: 280px; }
  .port-parts { grid-template-columns: minmax(0, 1fr); }
  .craft-grid { grid-template-columns: minmax(0, 1fr); }
  .port-fig, .craft-fig { min-height: 280px; }
  .step, .more { min-height: 0; }
}
</style>
