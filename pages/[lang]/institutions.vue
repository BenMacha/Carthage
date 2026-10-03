<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--purple tile--stack tile--hero s-5">
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display hero-title">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-7 hero-fig" style="background:#8A6A45">
        <img src="/img/punic-quarter.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Chiffres-clés -->
    <div class="cols cols-4 keep-2 stats">
      <div v-for="(s, i) in c.stats" :key="s.n" class="tile stat" :class="{ 'tile--gold': i === 1 }">
        <div class="num stat-n">{{ s.n }}</div>
        <p class="stat-t">{{ s.t }}</p>
      </div>
    </div>

    <!-- Schéma des institutions -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.schema.title }}</h2>
        <p>{{ c.schema.aside }}</p>
      </div>
    </section>
    <div class="cols schema-wrap">
      <div class="tile tile--xl tile--paper schema-tile">
        <svg
          class="schema"
          :class="{ 'is-ar': isAr }"
          viewBox="0 0 1000 440"
          role="img"
          aria-labelledby="inst-schema-t"
        >
          <title id="inst-schema-t">{{ c.schema.aria }}</title>
          <defs>
            <marker id="inst-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path class="arr-head" d="M0,0 L10,5 L0,10 z" />
            </marker>
          </defs>
          <line
            v-for="e in edges"
            :key="e.id + '-l'"
            class="edge"
            :class="{ dashed: e.dashed }"
            :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2"
            marker-end="url(#inst-arr)"
          />
          <g v-for="e in edges" :key="e.id + '-t'" class="edge-lbl">
            <rect :x="e.lx - e.lw / 2" :y="e.ly - 12" :width="e.lw" height="24" rx="12" />
            <text :x="e.lx" :y="e.ly + 4.5" text-anchor="middle" :direction="isAr ? 'rtl' : 'ltr'">{{ e.label }}</text>
          </g>
          <g v-for="n in nodes" :key="n.id" class="node" :class="'node--' + n.tone">
            <rect :x="n.x - 110" :y="n.y - 38" width="220" height="76" rx="18" />
            <text class="node-t" :x="n.x" :y="n.y - 3" text-anchor="middle" :direction="isAr ? 'rtl' : 'ltr'">{{ n.t }}</text>
            <text class="node-s" :x="n.x" :y="n.y + 20" text-anchor="middle" :direction="isAr ? 'rtl' : 'ltr'">{{ n.s }}</text>
          </g>
        </svg>

        <!-- Version mobile : liste verticale des relations -->
        <ol class="flow" :aria-label="c.schema.aria">
          <li v-for="e in edges" :key="e.id + '-f'" :class="{ dashed: e.dashed }">
            <b>{{ e.fromT }}</b>
            <span class="flow-rel">{{ e.label }} <span aria-hidden="true">{{ isAr ? '←' : '→' }}</span></span>
            <b>{{ e.toT }}</b>
          </li>
        </ol>
        <p class="schema-note">{{ c.schema.note }}</p>
      </div>
    </div>

    <!-- Les organes -->
    <div class="cols cols-3 organs">
      <div v-for="o in c.organs" :key="o.t" class="tile tile--stack organ" :class="o.cls">
        <div>
          <span class="kicker">{{ o.kick }}</span>
          <h3 class="h-card">{{ o.t }}</h3>
          <p class="body">{{ o.d }}</p>
        </div>
        <p class="src">{{ o.src }}</p>
      </div>
    </div>

    <!-- Aristote -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--outline tile--stack aristo">
          <div>
            <span class="kicker">{{ c.aristo.kick }}</span>
            <h2 class="h-block block-title">{{ c.aristo.title }}</h2>
            <blockquote class="quote">
              <p>{{ c.aristo.quote }}</p>
              <footer>{{ c.aristo.cite }}</footer>
            </blockquote>
            <p class="body-lg para">{{ c.aristo.text }}</p>
          </div>
          <p class="src">{{ c.aristo.debate }}</p>
        </div>
        <div class="tile tile--xl tile--purple tile--stack">
          <div>
            <span class="kicker">{{ c.critics.kick }}</span>
            <h2 class="h-block block-title">{{ c.critics.title }}</h2>
            <ul class="crit">
              <li v-for="(p, i) in c.critics.items" :key="i">{{ p }}</li>
            </ul>
          </div>
          <p class="polyb">{{ c.critics.polybe }}</p>
        </div>
      </div>
    </section>

    <!-- Évolution -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <span class="kicker">{{ c.evo.kick }}</span>
        <h2 class="h-block block-title">{{ c.evo.title }}</h2>
        <div class="rows" style="--row-key: 170px">
          <div v-for="r in c.evo.rows" :key="r.k">
            <div class="key">{{ r.k }}</div>
            <div class="val">
              <strong class="row-t">{{ r.t }}</strong>
              {{ r.v }}
            </div>
          </div>
        </div>
        <NuxtLink :to="localePath('/hannibal')" class="chip chip--glass evo-link">{{ c.evo.link }}</NuxtLink>
      </div>
    </section>

    <!-- Société -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.society.title }}</h2>
        <p>{{ c.society.aside }}</p>
      </div>
    </section>
    <div class="cols cols-3">
      <div v-for="g in c.society.groups" :key="g.t" class="tile tile--stack group" :class="g.cls">
        <div>
          <span class="kicker">{{ g.kick }}</span>
          <h3 class="h-card">{{ g.t }}</h3>
          <p class="body">{{ g.d }}</p>
        </div>
      </div>
    </div>

    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig stele-fig" style="background:#5E574F">
          <img src="/img/tanit-stele.jpg" :alt="c.women.alt" loading="lazy">
          <figcaption class="cap-box">{{ c.women.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--sand tile--stack">
          <div>
            <span class="kicker">{{ c.women.kick }}</span>
            <h2 class="h-block block-title">{{ c.women.title }}</h2>
            <p v-for="(p, i) in c.women.paras" :key="i" class="body-lg para">{{ p }}</p>
          </div>
          <NuxtLink :to="localePath('/sophonisbe')" class="btn btn-outline tile-btn">{{ c.women.link }}</NuxtLink>
        </div>
      </div>
    </section>

    <section class="sec">
      <div class="tile tile--xl tile--olive tile--stack libyans">
        <div>
          <span class="kicker">{{ c.libyans.kick }}</span>
          <h2 class="h-block block-title">{{ c.libyans.title }}</h2>
          <div class="lib-cols">
            <p v-for="(p, i) in c.libyans.paras" :key="i" class="body-lg">{{ p }}</p>
          </div>
        </div>
        <NuxtLink :to="localePath('/afrique')" class="chip chip--glass evo-link">{{ c.libyans.link }}</NuxtLink>
      </div>
    </section>

    <PageSources :items="c.sources" />

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.relatedTitle }}</h2>
      </div>
    </section>
    <div class="cols cols-3">
      <NuxtLink v-for="l in c.related" :key="l.to" :to="localePath(l.to)" class="tile tile--stack related" :class="l.cls">
        <span class="kicker">{{ l.kick }}</span>
        <div>
          <h3 class="h-card">{{ l.title }}</h3>
          <p class="body">{{ l.text }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

/* Géométrie du schéma (viewBox 1000 × 440) — miroir horizontal en arabe */
const NODES = [
  { id: 'people', x: 500, y: 60, tone: 'purple' },
  { id: 'suf', x: 150, y: 220, tone: 'white' },
  { id: 'senate', x: 500, y: 220, tone: 'ink' },
  { id: 'gen', x: 850, y: 220, tone: 'white' },
  { id: 'pent', x: 150, y: 380, tone: 'white' },
  { id: 'court', x: 500, y: 380, tone: 'gold' }
]
const EDGES = [
  { id: 'e1', from: 'people', to: 'suf', p: [420, 100, 182, 180], l: [300, 140], dashed: true },
  { id: 'e2', from: 'people', to: 'gen', p: [580, 100, 818, 180], l: [700, 140] },
  { id: 'e3', from: 'senate', to: 'people', p: [500, 180, 500, 102], l: [500, 140] },
  { id: 'e4', from: 'suf', to: 'senate', p: [262, 220, 386, 220], l: [324, 199] },
  { id: 'e5', from: 'gen', to: 'senate', p: [738, 220, 614, 220], l: [676, 199] },
  { id: 'e6', from: 'senate', to: 'court', p: [500, 260, 500, 338], l: [500, 299] },
  { id: 'e7', from: 'gen', to: 'court', p: [800, 260, 614, 356], l: [707, 308] },
  { id: 'e8', from: 'pent', to: 'court', p: [262, 380, 386, 380], l: [324, 359] }
]

const C = {
  fr: {
    meta: {
      title: 'Institutions et société de Carthage',
      desc: "Suffètes, Sénat, tribunal des Cent-Quatre, assemblée du peuple : comment Carthage était gouvernée, ce qu'en disait Aristote, et qui composait la société punique."
    },
    hero: {
      chip: 'Carthage · Institutions',
      title: 'Politique et société à Carthage',
      lede: "Ni roi ni tyran : une république de marchands, admirée par Aristote, où deux magistrats élus, un Sénat et une assemblée du peuple se partageaient le pouvoir.",
      alt: 'Vestiges du quartier punique sur la colline de Byrsa, Carthage',
      caption: "Quartier punique de Byrsa, bâti au début du IIe s. av. J.-C."
    },
    stats: [
      { n: '2', t: "suffètes élus pour un an — les « rois » des auteurs grecs et latins" },
      { n: '104', t: "juges du tribunal de contrôle selon Aristote (« les Cent » chez Justin)" },
      { n: '1 an', t: "de mandat pour ces juges après la réforme d'Hannibal en 196 — contre à vie auparavant (Tite-Live)" },
      { n: '0', t: "tyran et aucune sédition notable dans l'histoire de la cité, selon Aristote" }
    ],
    schema: {
      title: 'Qui gouvernait Carthage ?',
      aside: "Un régime que les Anciens disaient « mixte » : un peu de royauté, beaucoup d'aristocratie, une part de démocratie.",
      aria: 'Schéma des institutions de Carthage et de leurs relations',
      note: "Trait pointillé : relation incertaine. Le schéma reconstitue un état tardif (IVe–IIIe s.) à partir de sources rares et surtout grecques.",
      nodes: {
        people: { t: 'Assemblée du peuple', s: 'citoyens libres · agora' },
        suf: { t: '2 suffètes', s: 'magistrats élus pour 1 an' },
        senate: { t: 'Sénat', s: 'Conseil des Anciens' },
        gen: { t: 'Généraux', s: 'élus à part' },
        pent: { t: 'Pentarchies', s: 'commissions de cinq' },
        court: { t: 'Les Cent-Quatre', s: 'cour de contrôle' }
      },
      edges: {
        e1: 'élection ? (débattu)',
        e2: 'élit',
        e3: 'saisit si désaccord',
        e4: 'président',
        e5: 'rendent compte',
        e6: 'fournit les juges',
        e7: 'jugés au retour',
        e8: 'désignent'
      }
    },
    organs: [
      { cls: 'tile--paper', kick: 'Exécutif et justice', t: 'Les suffètes', d: "Du phénicien shofet, « juge ». Deux magistrats élus chaque année, que Grecs et Romains appelaient « rois » faute de mot équivalent. Ils présidaient le Sénat, rendaient la justice et administraient la cité, mais ne commandaient pas les armées. On ignore qui les élisait : les notables ou le peuple.", src: 'Sznycer ; Sénèque, De la tranquillité, IV, 5' },
      { cls: 'tile--ink', kick: 'Cœur oligarchique', t: 'Le Sénat', d: "Les textes parlent des « Anciens de Carthage » (gerontes, seniores). Issu des grandes familles, il comptait sans doute plusieurs centaines de membres. Guerre, paix, diplomatie : il décidait des grandes affaires, et les généraux venaient lui rendre compte.", src: 'Sznycer ; Tite-Live' },
      { cls: 'tile--gold', kick: 'Contrôle', t: 'Les Cent-Quatre', d: "Conseil restreint que seul Aristote nomme ainsi (« les Cent-Quatre » ou « les Cent »). D'après Justin, cent juges tirés du Sénat examinaient la conduite des généraux à leur retour. Nommés à vie jusqu'à la réforme d'Hannibal.", src: 'Aristote, Politique, II, 11 ; Justin, XIX, 2' },
      { cls: 'tile--sand', kick: 'Mal connues', t: 'Les pentarchies', d: "Commissions de cinq membres, mentionnées par le seul Aristote. Elles se recrutaient elles-mêmes, traitaient d'affaires importantes et désignaient les membres des Cent-Quatre. Leur fonctionnement exact reste obscur.", src: 'Aristote, Politique, II, 11' },
      { cls: 'tile--purple', kick: 'Élément démocratique', t: "L'assemblée du peuple", d: "Les hommes libres, réunis sur l'agora selon Diodore. Quand suffètes et Sénat étaient en désaccord, l'affaire lui revenait, et chacun pouvait alors contredire les propositions (Aristote). Polybe estime qu'elle avait pris l'ascendant au temps des guerres puniques.", src: 'Aristote ; Diodore, XX, 9 ; Polybe, VI, 51' },
      { cls: 'tile--sand', kick: 'Hors du suffétat', t: 'Les généraux', d: "Le commandement militaire était séparé des magistratures civiles. Les chefs d'armée, choisis dans les grandes familles, étaient élus à part, sans doute par l'assemblée. Responsables devant le Sénat, ils pouvaient être jugés par les Cent-Quatre après une campagne.", src: 'Sznycer ; Justin, XIX, 2' }
    ],
    aristo: {
      kick: 'Aristote, Politique, II, 11',
      title: 'Une constitution citée en modèle',
      quote: "« Carthage passe pour être bien gouvernée […]. Preuve d'une constitution bien réglée : le peuple reste attaché au régime, et l'on n'y a vu ni sédition digne de ce nom, ni tyran. »",
      cite: 'Aristote, Politique, II, 11 (vers 330 av. J.-C.) — traduction libre',
      text: "Aristote range Carthage, seule cité non grecque, aux côtés de Sparte et de la Crète parmi les constitutions les plus réussies : un régime « mixte » qui combine royauté (les suffètes), aristocratie (le Sénat) et démocratie (l'assemblée). Polybe évoquera lui aussi la réputation d'excellence de ces institutions (VI, 43).",
      debate: "Un instantané, pas un modèle figé : la portée du texte est discutée depuis Stéphane Gsell, et les historiens admettent aujourd'hui que ces institutions ont évolué au fil des siècles (Sznycer)."
    },
    critics: {
      kick: 'Les réserves du philosophe',
      title: 'Trop de place pour la richesse',
      items: [
        "On choisit les magistrats pour leur fortune autant que pour leur mérite : une pente oligarchique.",
        "Les plus hautes charges s'achètent — et qui a payé cherche ensuite à s'enrichir.",
        "Un même homme peut cumuler plusieurs charges.",
        "La paix civile tient à la prospérité : Carthage envoie régulièrement une partie du peuple faire fortune dans les cités qu'elle domine."
      ],
      polybe: "Deux siècles plus tard, Polybe juge la constitution carthaginoise sur le déclin : au temps d'Hannibal, le peuple y a pris le dessus alors qu'à Rome le Sénat gouverne encore (VI, 51). Il note aussi qu'à Carthage on achète ouvertement les charges, quand à Rome la brigue est passible de mort (VI, 56)."
    },
    evo: {
      kick: 'Du VIIIe s. à l\'époque romaine',
      title: 'Des institutions qui évoluent',
      link: 'Hannibal, du champ de bataille au suffétat →',
      rows: [
        { k: 'Origines', t: 'Pas de roi attesté. ', v: "Didon est de sang royal, mais la légende ne la dit jamais reine. Les « rois » des textes grecs et latins sont selon toute vraisemblance les suffètes. La thèse d'une monarchie carthaginoise, défendue par K. J. Beloch puis G. Charles-Picard, est aujourd'hui rejetée par la plupart des historiens ; même à Tyr, les rois n'avaient pas un pouvoir absolu (Sznycer)." },
        { k: 'VIe–Ve s.', t: 'Le temps des Magonides. ', v: "Pendant plusieurs générations, les descendants d'un certain Magon fournissent à la cité ses chefs de guerre (Justin, XVIII–XIX). Une prépondérance familiale plus qu'une royauté ; l'un d'eux, Hamilcar, est vaincu à Himère en 480." },
        { k: 'Ve s.', t: 'Un contre-pouvoir. ', v: "Pour qu'une famille de généraux ne menace plus la liberté, un tribunal de cent juges choisis parmi les sénateurs est créé : les généraux doivent lui rendre compte au retour (Justin, XIX, 2). C'est sans doute l'ancêtre des Cent-Quatre d'Aristote." },
        { k: 'IVe s.', t: 'La constitution « mixte ». ', v: "C'est l'état que décrit Aristote. Les tentatives de pouvoir personnel échouent : en 308, pendant l'invasion d'Agathocle, le général Bomilcar tente un coup de force dans la ville ; il est vaincu et mis à mort (Diodore, XX, 44)." },
        { k: 'IIIe s.', t: 'Hannon le Grand contre les Barcides. ', v: "Deux politiques s'opposent : Hannon, porte-voix des grands propriétaires, mise sur l'arrière-pays africain et combat les guerres des Barcides ; ceux-ci s'appuient sur l'Espagne et sur la faveur du peuple (Polybe). L'idée de Barcides rêvant d'une monarchie à l'hellénistique est écartée par M. Sznycer." },
        { k: '196', t: 'Hannibal suffète. ', v: "Après Zama, Hannibal est élu suffète. Il fait plier un magistrat des finances qui le défiait, fait voter que les juges des Cent-Quatre, jusque-là à vie, soient élus pour un an sans pouvoir être reconduits l'année suivante, puis traque les détournements : l'indemnité due à Rome peut être payée sans impôt nouveau (Tite-Live, XXXIII, 46-47). Dénoncé à Rome par ses adversaires, il s'exile en 195." },
        { k: 'Après 146', t: 'Des suffètes sous Rome. ', v: "Carthage disparaît, pas ses institutions : des cités d'Afrique romaine élisent encore des suffètes jusqu'au IIe s. apr. J.-C., parfois trois au lieu de deux — un apport berbère selon certains spécialistes (Lipinski)." }
      ]
    },
    society: {
      title: 'Une société très hiérarchisée',
      aside: "Au sommet, une aristocratie d'origine tyrienne ; en dessous, une population que les sources laissent presque toujours dans l'ombre.",
      groups: [
        { cls: 'tile--paper', kick: 'Au sommet', t: "L'aristocratie", d: "Descendants des colons de Tyr, ces grandes familles tiennent l'économie, la politique et les cultes. D'abord armateurs, elles deviennent de grands propriétaires terriens, monopolisent les magistratures et vivent dans de riches demeures, au cap Bon ou dans le faubourg de Mégara (Bessis)." },
        { cls: 'tile--sand', kick: 'Les temples', t: 'Les prêtres', d: "Issus de l'aristocratie, ils forment un corps très organisé. Les temples, foyers de vie intellectuelle, ont entretenu pendant des siècles la langue et la culture phéniciennes, jusque sous la domination romaine. Une stèle du tophet (IIIe s., musée du Bardo) montre un prêtre en robe de lin, crâne rasé sous une coiffe." },
        { cls: 'tile--paper', kick: 'La majorité', t: 'Le peuple de la ville', d: "Artisans et commerçants, en nombre inconnu ; hommes libres et esclaves, ceux-ci appartenant à un particulier ou à l'État ; et des étrangers venus de toute la Méditerranée (Dridi). Les textes antiques ne leur donnent presque jamais la parole." }
      ]
    },
    women: {
      alt: 'Stèle punique portant le signe de Tanit',
      caption: 'Stèle au signe de Tanit — musée du Louvre',
      kick: 'Ce que disent les stèles',
      title: 'Les femmes, entre autonomie et alliances',
      paras: [
        "Didon, Sophonisbe, l'épouse d'Hasdrubal qui choisit la mort en 146 : quelques figures marquantes, mais peu de sources. La société est patriarcale, et laisse pourtant aux femmes une réelle autonomie : des stèles du tophet ont été dédiées par des femmes en leur nom propre, plusieurs métiers semblent leur avoir été ouverts, et le sacerdoce ne leur était pas fermé (Dridi).",
        "Le mariage reste un instrument politique. Sophonisbe, fille du général Hasdrubal fils de Giscon, épouse le roi numide Syphax pour sceller une alliance, puis Massinissa. On ignore si la polygamie était pratiquée."
      ],
      link: 'Sophonisbe'
    },
    libyans: {
      kick: "Le territoire africain",
      title: 'Les Libyens : dominés, mais indispensables',
      paras: [
        "Les populations natives sont les plus mal connues. Le commerce des premiers temps se mue en domination : pendant la première guerre punique, Carthage prélève la moitié des récoltes des campagnes (Polybe, I, 72), et les révoltes se succèdent — en 240, les Libyens rejoignent en masse la guerre des Mercenaires.",
        "Les liens sont pourtant étroits : des nobles puniques épousent des princesses libyennes (Bessis), certaines tombes associent rite phénicien et rite africain, et les communautés puniques sont cosmopolites dès l'origine. Au IIe s., les empiètements numides de Massinissa contribuent à la chute de la cité."
      ],
      link: "Carthage l'Africaine →"
    },
    relatedTitle: 'À lire aussi',
    sources: [
      { type: "ancient", author: "Aristote", work: "Politique", ref: "II, 11" },
      { type: "ancient", author: "Polybe", work: "Histoires", ref: "I, 72 ; VI, 43 ; VI, 51 ; VI, 56" },
      { type: "ancient", author: "Diodore de Sicile", work: "Bibliothèque historique", ref: "XX, 9 ; XX, 44" },
      { type: "ancient", author: "Justin", work: "Abrégé des Histoires philippiques de Trogue Pompée", ref: "XVIII–XIX ; XIX, 2" },
      { type: "ancient", author: "Tite-Live", work: "Histoire romaine", ref: "XXXIII, 46–47" },
      { type: "ancient", author: "Sénèque", work: "De la tranquillité de l'âme", ref: "IV, 5" },
      { type: "modern", author: "Maurice Sznycer", work: "Carthage et la civilisation punique", ref: "PUF, 1978" },
      { type: "modern", author: "Sophie Bessis", work: "Histoire de la Tunisie : de Carthage à nos jours", ref: "Tallandier, 2019" },
      { type: "modern", author: "Hédi Dridi", work: "Carthage et le monde punique", ref: "Les Belles Lettres, 2006" },
      { type: "modern", author: "Edward Lipinski (dir.)", work: "Dictionnaire de la civilisation phénicienne et punique", ref: "Brepols, 1992" },
      { type: "modern", author: "Stéphane Gsell", work: "Histoire ancienne de l'Afrique du Nord", ref: "Hachette, 1920" },
      { type: "modern", author: "Karl Julius Beloch", note: "cité dans la page (thèse d'une monarchie carthaginoise)" },
      { type: "modern", author: "Gilbert Charles-Picard", note: "cité dans la page (thèse d'une monarchie carthaginoise)" },
      { type: "modern", author: "Wikipédia", work: "Carthage ; Civilisation carthaginoise", note: "CC BY-SA 4.0, contenus reformulés" }
    ],
    related: [
      { to: '/hannibal', cls: 'tile--ink', kick: 'Biographie', title: 'Hannibal', text: "Le stratège de Cannes fut aussi un suffète réformateur, chassé par l'oligarchie." },
      { to: '/richesse-rome', cls: 'tile--gold', kick: 'Économie', title: 'Trop riche pour Rome', text: "Pourquoi la prospérité de Carthage, bien plus que ses armes, obséda Rome." },
      { to: '/economie', cls: 'tile--paper', kick: 'Commerce', title: "L'économie carthaginoise", text: "Ports, routes des métaux, agriculture : les bases de la fortune de l'aristocratie." }
    ]
  },

  en: {
    meta: {
      title: 'Institutions and society of Carthage',
      desc: 'Suffetes, Senate, the Court of One Hundred and Four, the popular assembly: how Carthage was governed, what Aristotle thought of it, and who made up Punic society.'
    },
    hero: {
      chip: 'Carthage · Institutions',
      title: 'Politics and society in Carthage',
      lede: 'Neither king nor tyrant: a merchant republic, admired by Aristotle, where two elected magistrates, a Senate and a popular assembly shared power.',
      alt: 'Remains of the Punic quarter on Byrsa Hill, Carthage',
      caption: 'Punic quarter on Byrsa, built in the early 2nd century BC'
    },
    stats: [
      { n: '2', t: 'suffetes elected for one year — the “kings” of Greek and Latin authors' },
      { n: '104', t: 'judges on the court of oversight according to Aristotle (“the Hundred” in Justin)' },
      { n: '1 year', t: 'term for those judges after Hannibal’s reform of 196 — previously for life (Livy)' },
      { n: '0', t: 'tyrants and no serious civil strife in the city’s history, according to Aristotle' }
    ],
    schema: {
      title: 'Who governed Carthage?',
      aside: 'A regime the ancients called “mixed”: a little monarchy, a lot of aristocracy, a share of democracy.',
      aria: 'Diagram of the institutions of Carthage and how they related',
      note: 'Dotted line: uncertain relationship. The diagram reconstructs a late state (4th–3rd c.) from scarce, mostly Greek sources.',
      nodes: {
        people: { t: 'Popular Assembly', s: 'free citizens · agora' },
        suf: { t: '2 suffetes', s: 'magistrates, 1-year term' },
        senate: { t: 'Senate', s: 'Council of Elders' },
        gen: { t: 'Generals', s: 'elected separately' },
        pent: { t: 'Pentarchies', s: 'boards of five' },
        court: { t: 'Hundred and Four', s: 'court of oversight' }
      },
      edges: {
        e1: 'election? (debated)',
        e2: 'elects',
        e3: 'refers disputes',
        e4: 'preside',
        e5: 'report to',
        e6: 'supplies judges',
        e7: 'tried on return',
        e8: 'appoint'
      }
    },
    organs: [
      { cls: 'tile--paper', kick: 'Executive and justice', t: 'The suffetes', d: 'From Phoenician shofet, “judge”. Two magistrates elected every year, whom Greeks and Romans called “kings” for lack of a better word. They presided over the Senate, administered justice and ran the city, but did not command armies. Who elected them — the notables or the people — is unknown.', src: 'Sznycer; Seneca, On Tranquillity, IV, 5' },
      { cls: 'tile--ink', kick: 'Oligarchic core', t: 'The Senate', d: 'The texts speak of the “Elders of Carthage” (gerontes, seniores). Drawn from the great families, it probably had several hundred members. War, peace, diplomacy: it decided the major questions, and generals had to report to it.', src: 'Sznycer; Livy' },
      { cls: 'tile--gold', kick: 'Oversight', t: 'The Hundred and Four', d: 'A smaller council that only Aristotle names this way (“the Hundred and Four” or “the Hundred”). According to Justin, a hundred judges chosen from the Senate reviewed the conduct of generals on their return. Appointed for life until Hannibal’s reform.', src: 'Aristotle, Politics, II, 11; Justin, XIX, 2' },
      { cls: 'tile--sand', kick: 'Little known', t: 'The pentarchies', d: 'Boards of five members, mentioned by Aristotle alone. They filled their own ranks, dealt with important business and chose the members of the Hundred and Four. How they worked remains obscure.', src: 'Aristotle, Politics, II, 11' },
      { cls: 'tile--purple', kick: 'Democratic element', t: 'The popular assembly', d: 'Free men meeting in the agora, according to Diodorus. When suffetes and Senate disagreed, the matter went to the assembly, where anyone could speak against the proposals (Aristotle). Polybius thought it had gained the upper hand by the time of the Punic Wars.', src: 'Aristotle; Diodorus, XX, 9; Polybius, VI, 51' },
      { cls: 'tile--sand', kick: 'Outside the suffeteship', t: 'The generals', d: 'Military command was kept apart from civil office. Army commanders, drawn from the great families, were elected separately, probably by the assembly. Answerable to the Senate, they could be tried by the Hundred and Four after a campaign.', src: 'Sznycer; Justin, XIX, 2' }
    ],
    aristo: {
      kick: 'Aristotle, Politics, II, 11',
      title: 'A constitution held up as a model',
      quote: '“Carthage is thought to be well governed […]. A sign of a well-ordered constitution: the people remain loyal to it, and there has been neither civil strife worth the name nor a tyrant.”',
      cite: 'Aristotle, Politics, II, 11 (c. 330 BC) — free translation',
      text: 'Aristotle places Carthage, the only non-Greek city in his survey, alongside Sparta and Crete among the most successful constitutions: a “mixed” regime combining monarchy (the suffetes), aristocracy (the Senate) and democracy (the assembly). Polybius would also mention the excellent reputation of these institutions (VI, 43).',
      debate: 'A snapshot, not a fixed model: the value of the text has been debated since Stéphane Gsell, and historians now accept that these institutions changed over the centuries (Sznycer).'
    },
    critics: {
      kick: 'The philosopher’s reservations',
      title: 'Too much weight on wealth',
      items: [
        'Magistrates are chosen for their fortune as much as their merit: a slide towards oligarchy.',
        'The highest offices can be bought — and whoever has paid then seeks to get rich.',
        'One man can hold several offices at once.',
        'Civil peace depends on prosperity: Carthage regularly sends part of its people to make their fortune in the cities it controls.'
      ],
      polybe: 'Two centuries later, Polybius saw the Carthaginian constitution in decline: by Hannibal’s time the people had the upper hand, while in Rome the Senate still governed (VI, 51). He also notes that in Carthage offices were bought openly, whereas in Rome electoral bribery was a capital crime (VI, 56).'
    },
    evo: {
      kick: 'From the 8th century to Roman times',
      title: 'Institutions that changed',
      link: 'Hannibal, from the battlefield to the suffeteship →',
      rows: [
        { k: 'Origins', t: 'No attested king. ', v: 'Dido was of royal blood, but the legend never calls her queen. The “kings” of Greek and Latin texts were in all likelihood the suffetes. The theory of a Carthaginian monarchy, argued by K. J. Beloch and then G. Charles-Picard, is now rejected by most historians; even in Tyre, kings did not hold absolute power (Sznycer).' },
        { k: '6th–5th c.', t: 'The age of the Magonids. ', v: 'For several generations the descendants of one Mago supplied the city with its war leaders (Justin, XVIII–XIX). A family ascendancy rather than a kingship; one of them, Hamilcar, was defeated at Himera in 480.' },
        { k: '5th c.', t: 'A counterweight. ', v: 'So that a family of generals could no longer threaten liberty, a court of a hundred judges chosen from the senators was set up, to which generals had to account on their return (Justin, XIX, 2). It is probably the ancestor of Aristotle’s Hundred and Four.' },
        { k: '4th c.', t: 'The “mixed” constitution. ', v: 'This is the state Aristotle describes. Attempts at personal rule failed: in 308, during Agathocles’ invasion, the general Bomilcar attempted a coup inside the city; he was defeated and put to death (Diodorus, XX, 44).' },
        { k: '3rd c.', t: 'Hanno the Great versus the Barcids. ', v: 'Two policies clashed: Hanno, spokesman of the great landowners, favoured the African hinterland and fought the Barcids’ wars; the Barcids relied on Spain and on popular support (Polybius). The notion of Barcids aiming at a Hellenistic-style monarchy is rejected by M. Sznycer.' },
        { k: '196', t: 'Hannibal as suffete. ', v: 'After Zama, Hannibal was elected suffete. He brought to heel a finance magistrate who defied him, had a law passed making the judges of the Hundred and Four, until then appointed for life, elected for one year and barred from serving two years running, then hunted down embezzlement: the indemnity owed to Rome could be paid without new taxes (Livy, XXXIII, 46-47). Denounced to Rome by his opponents, he went into exile in 195.' },
        { k: 'After 146', t: 'Suffetes under Rome. ', v: 'Carthage vanished, its institutions did not: cities of Roman Africa still elected suffetes until the 2nd century AD, sometimes three instead of two — a Berber contribution according to some scholars (Lipinski).' }
      ]
    },
    society: {
      title: 'A highly stratified society',
      aside: 'At the top, an aristocracy of Tyrian origin; below it, a population the sources almost always leave in the shadows.',
      groups: [
        { cls: 'tile--paper', kick: 'At the top', t: 'The aristocracy', d: 'Descended from the settlers of Tyre, these great families held the economy, politics and cults. First shipowners, they became great landowners, monopolised the magistracies and lived in rich houses on Cape Bon or in the Megara suburb (Bessis).' },
        { cls: 'tile--sand', kick: 'The temples', t: 'The priests', d: 'Drawn from the aristocracy, they formed a highly organised body. The temples, centres of intellectual life, kept Phoenician language and culture alive for centuries, even under Roman rule. A tophet stele (3rd c., Bardo Museum) shows a priest in a linen robe, his shaven head under a cap.' },
        { cls: 'tile--paper', kick: 'The majority', t: 'The townspeople', d: 'Craftsmen and traders in unknown numbers; free men and slaves, the latter owned by individuals or by the state; and foreigners from all over the Mediterranean (Dridi). Ancient texts almost never let them speak.' }
      ]
    },
    women: {
      alt: 'Punic stele bearing the sign of Tanit',
      caption: 'Stele with the sign of Tanit — Louvre Museum',
      kick: 'What the stelae tell us',
      title: 'Women, between autonomy and alliances',
      paras: [
        'Dido, Sophonisba, the wife of Hasdrubal who chose death in 146: a few striking figures, but few sources. Society was patriarchal, yet left women real autonomy: tophet stelae were dedicated by women in their own name, several trades seem to have been open to them, and the priesthood was not closed to them (Dridi).',
        'Marriage remained a political tool. Sophonisba, daughter of the general Hasdrubal son of Gisco, married the Numidian king Syphax to seal an alliance, then Masinissa. Whether polygamy was practised is unknown.'
      ],
      link: 'Sophonisba'
    },
    libyans: {
      kick: 'The African territory',
      title: 'The Libyans: dominated, but indispensable',
      paras: [
        'Native populations are the least known. Early trade turned into domination: during the First Punic War, Carthage took half of the harvest of the countryside (Polybius, I, 72), and revolts followed one another — in 240 the Libyans joined the Mercenary War in large numbers.',
        'Yet the ties were close: Punic nobles married Libyan princesses (Bessis), some tombs combine Phoenician and African rites, and Punic communities were cosmopolitan from the start. In the 2nd century, Masinissa’s Numidian encroachments helped bring about the city’s fall.'
      ],
      link: 'African Carthage →'
    },
    relatedTitle: 'Read also',
    sources: [
      { type: "ancient", author: "Aristotle", work: "Politics", ref: "II, 11" },
      { type: "ancient", author: "Polybius", work: "Histories", ref: "I, 72; VI, 43; VI, 51; VI, 56" },
      { type: "ancient", author: "Diodorus Siculus", work: "Library of History", ref: "XX, 9; XX, 44" },
      { type: "ancient", author: "Justin", work: "Epitome of Pompeius Trogus' Philippic Histories", ref: "XVIII–XIX; XIX, 2" },
      { type: "ancient", author: "Livy", work: "History of Rome", ref: "XXXIII, 46–47" },
      { type: "ancient", author: "Seneca", work: "On Tranquillity of Mind", ref: "IV, 5" },
      { type: "modern", author: "Maurice Sznycer", work: "Carthage et la civilisation punique", ref: "PUF, 1978" },
      { type: "modern", author: "Sophie Bessis", work: "Histoire de la Tunisie : de Carthage à nos jours", ref: "Tallandier, 2019" },
      { type: "modern", author: "Hédi Dridi", work: "Carthage et le monde punique", ref: "Les Belles Lettres, 2006" },
      { type: "modern", author: "Edward Lipinski (ed.)", work: "Dictionnaire de la civilisation phénicienne et punique", ref: "Brepols, 1992" },
      { type: "modern", author: "Stéphane Gsell", work: "Histoire ancienne de l'Afrique du Nord", ref: "Hachette, 1920" },
      { type: "modern", author: "Karl Julius Beloch", note: "cited on this page (theory of a Carthaginian monarchy)" },
      { type: "modern", author: "Gilbert Charles-Picard", note: "cited on this page (theory of a Carthaginian monarchy)" },
      { type: "modern", author: "Wikipedia (French)", work: "Carthage; Civilisation carthaginoise", note: "CC BY-SA 4.0, content rephrased" }
    ],
    related: [
      { to: '/hannibal', cls: 'tile--ink', kick: 'Biography', title: 'Hannibal', text: 'The strategist of Cannae was also a reforming suffete, driven out by the oligarchy.' },
      { to: '/richesse-rome', cls: 'tile--gold', kick: 'Economy', title: 'Too rich for Rome', text: 'Why Carthage’s prosperity, far more than its weapons, obsessed Rome.' },
      { to: '/economie', cls: 'tile--paper', kick: 'Trade', title: 'The Carthaginian economy', text: 'Ports, metal routes, agriculture: the foundations of the aristocracy’s wealth.' }
    ]
  },

  ar: {
    meta: {
      title: 'مؤسسات قرطاج ومجتمعها',
      desc: 'الشفطان ومجلس الشيوخ ومحكمة المئة والأربعة وجمعية الشعب: كيف كانت قرطاج تُحكم، وماذا قال عنها أرسطو، وممّ تكوّن المجتمع البونيقي.'
    },
    hero: {
      chip: 'قرطاج · المؤسسات',
      title: 'السياسة والمجتمع في قرطاج',
      lede: 'لا ملك ولا طاغية: جمهورية تجّار أعجب بها أرسطو، يتقاسم فيها السلطةَ حاكمان منتخبان ومجلس للشيوخ وجمعية للشعب.',
      alt: 'أطلال الحي البونيقي على هضبة بيرصا، قرطاج',
      caption: 'الحي البونيقي في بيرصا، شُيّد مطلع القرن الثاني ق.م'
    },
    stats: [
      { n: '2', t: 'شفطان يُنتخبان لسنة واحدة — وهما «الملكان» في كتابات الإغريق واللاتين' },
      { n: '104', t: 'قاضيًا في محكمة الرقابة بحسب أرسطو («المئة» عند يوستينوس)' },
      { n: 'سنة', t: 'مدة ولاية هؤلاء القضاة بعد إصلاح حنبعل سنة 196 — وكانت قبل ذلك مدى الحياة (تيتوس ليفيوس)' },
      { n: '0', t: 'طاغية ولا فتنة تُذكر في تاريخ المدينة، بحسب أرسطو' }
    ],
    schema: {
      title: 'من كان يحكم قرطاج؟',
      aside: 'نظام وصفه القدماء بأنه «مختلط»: قليل من الملكية، وكثير من الأرستقراطية، ونصيب من الديمقراطية.',
      aria: 'رسم تخطيطي لمؤسسات قرطاج والعلاقات بينها',
      note: 'الخط المنقّط: علاقة غير مؤكدة. يعيد الرسم بناء حالة متأخرة (القرنان الرابع والثالث) انطلاقًا من مصادر نادرة، إغريقية في معظمها.',
      nodes: {
        people: { t: 'جمعية الشعب', s: 'المواطنون الأحرار · الساحة' },
        suf: { t: 'شفطان اثنان', s: 'حاكمان منتخبان لسنة' },
        senate: { t: 'مجلس الشيوخ', s: 'مجلس القدماء' },
        gen: { t: 'القادة العسكريون', s: 'يُنتخبون على حدة' },
        pent: { t: 'اللجان الخماسية', s: 'لجان من خمسة أعضاء' },
        court: { t: 'المئة والأربعة', s: 'هيئة رقابة' }
      },
      edges: {
        e1: 'انتخاب؟ (موضع جدل)',
        e2: 'تنتخب',
        e3: 'يُحيل عند الخلاف',
        e4: 'يترأسان',
        e5: 'يقدّمون الحساب',
        e6: 'يمدّها بالقضاة',
        e7: 'يُحاكَمون عند العودة',
        e8: 'تعيّن'
      }
    },
    organs: [
      { cls: 'tile--paper', kick: 'التنفيذ والقضاء', t: 'الشفطان', d: 'من الكلمة الفينيقية «شفط» أي «القاضي». حاكمان يُنتخبان كل سنة، سمّاهما الإغريق والرومان «ملكين» لافتقارهم إلى لفظ مكافئ. كانا يترأسان مجلس الشيوخ ويقضيان بين الناس ويديران شؤون المدينة، لكنهما لا يقودان الجيوش. ولا نعرف من كان ينتخبهما: الأعيان أم الشعب.', src: 'شنيسر؛ سينيكا، في طمأنينة النفس، IV، 5' },
      { cls: 'tile--ink', kick: 'قلب الأوليغارشية', t: 'مجلس الشيوخ', d: 'تتحدث النصوص عن «شيوخ قرطاج». كان أعضاؤه من كبرى العائلات، ولعلّ عددهم بلغ عدة مئات. الحرب والسلم والدبلوماسية: كان يفصل في كبرى القضايا، وإليه يقدّم القادة العسكريون حسابهم.', src: 'شنيسر؛ تيتوس ليفيوس' },
      { cls: 'tile--gold', kick: 'الرقابة', t: 'المئة والأربعة', d: 'مجلس مصغّر لا يسمّيه بهذا الاسم سوى أرسطو («المئة والأربعة» أو «المئة»). وبحسب يوستينوس، كان مئة قاضٍ يُختارون من مجلس الشيوخ يحاسبون القادة العسكريين عند عودتهم. وكانوا يُعيَّنون مدى الحياة حتى إصلاح حنبعل.', src: 'أرسطو، السياسة، II، 11؛ يوستينوس، XIX، 2' },
      { cls: 'tile--sand', kick: 'غامضة', t: 'اللجان الخماسية', d: 'لجان من خمسة أعضاء لم يذكرها سوى أرسطو. كانت تجدّد أعضاءها بنفسها، وتنظر في شؤون مهمة، وتعيّن أعضاء المئة والأربعة. ولا تزال طريقة عملها غامضة.', src: 'أرسطو، السياسة، II، 11' },
      { cls: 'tile--purple', kick: 'العنصر الديمقراطي', t: 'جمعية الشعب', d: 'الرجال الأحرار مجتمعين في الساحة العامة بحسب ديودوروس. وإذا اختلف الشفطان ومجلس الشيوخ رُفع الأمر إليها، وكان لكل فرد أن يعترض على المقترحات (أرسطو). ويرى بوليبيوس أنها صارت صاحبة الكلمة العليا في زمن الحروب البونيقية.', src: 'أرسطو؛ ديودوروس، XX، 9؛ بوليبيوس، VI، 51' },
      { cls: 'tile--sand', kick: 'خارج سلطة الشفطين', t: 'القادة العسكريون', d: 'كانت القيادة العسكرية منفصلة عن المناصب المدنية. يُختار قادة الجيوش من كبرى العائلات ويُنتخبون على حدة، والأرجح أن جمعية الشعب هي التي تنتخبهم. وكانوا مسؤولين أمام مجلس الشيوخ، وقد يحاكمهم المئة والأربعة بعد الحملة.', src: 'شنيسر؛ يوستينوس، XIX، 2' }
    ],
    aristo: {
      kick: 'أرسطو، السياسة، II، 11',
      title: 'دستور يُضرب به المثل',
      quote: '«يُعَدّ حكم قرطاج حكمًا صالحًا […]. ومن علامات حسن نظامها أن الشعب يظل وفيًّا له، وأنه لم تقع فيها فتنة تستحق الذكر، ولا قام فيها طاغية.»',
      cite: 'أرسطو، السياسة، II، 11 (نحو 330 ق.م) — ترجمة بتصرّف',
      text: 'يضع أرسطو قرطاج، وهي المدينة الوحيدة غير الإغريقية في عرضه، إلى جانب إسبرطة وكريت بين أنجح الدساتير: نظام «مختلط» يجمع الملكية (الشفطان) والأرستقراطية (مجلس الشيوخ) والديمقراطية (جمعية الشعب). وسيشير بوليبيوس بدوره إلى سمعة هذه المؤسسات الممتازة (VI، 43).',
      debate: 'لقطة لا نموذج ثابت: نوقشت قيمة هذا النص منذ ستيفان غزيل، ويسلّم المؤرخون اليوم بأن هذه المؤسسات تطورت عبر القرون (شنيسر).'
    },
    critics: {
      kick: 'تحفّظات الفيلسوف',
      title: 'مكانة مفرطة للثروة',
      items: [
        'يُختار الحكّام لثروتهم بقدر ما يُختارون لكفاءتهم: وهو ميل نحو الأوليغارشية.',
        'تُشترى أعلى المناصب — ومن دفع ثمنها سعى بعد ذلك إلى الإثراء.',
        'قد يجمع رجل واحد عدة مناصب.',
        'السلم الأهلي رهين بالرخاء: ترسل قرطاج بانتظام جزءًا من شعبها ليغتني في المدن الخاضعة لها.'
      ],
      polybe: 'بعد قرنين، رأى بوليبيوس أن الدستور القرطاجي في انحدار: ففي زمن حنبعل صارت الغلبة للشعب، بينما ظل مجلس الشيوخ يحكم في روما (VI، 51). ولاحظ أيضًا أن المناصب في قرطاج تُشترى علنًا، في حين كان شراء الأصوات في روما جريمة عقوبتها الموت (VI، 56).'
    },
    evo: {
      kick: 'من القرن الثامن إلى العهد الروماني',
      title: 'مؤسسات تتطور',
      link: 'حنبعل، من ساحة القتال إلى منصب الشفط ←',
      rows: [
        { k: 'البدايات', t: 'لا ملك مؤكَّدًا. ', v: 'كانت ديدون من سلالة ملكية، لكن الأسطورة لا تصفها أبدًا بالملكة. و«الملوك» في النصوص الإغريقية واللاتينية هم على الأرجح الشفطان. أما نظرية الملكية القرطاجية التي دافع عنها ك. ي. بيلوخ ثم ج. شارل-بيكار، فيرفضها اليوم معظم المؤرخين؛ وحتى في صور لم يكن للملوك سلطان مطلق (شنيسر).' },
        { k: 'ق 6–5', t: 'عصر الماغونيين. ', v: 'طوال عدة أجيال، قدّم أحفاد رجل يُدعى ماغون للمدينة قادة حروبها (يوستينوس، XVIII–XIX). هيمنة عائلية أكثر منها ملكية؛ وقد هُزم أحدهم، حملقار، في هيميرا سنة 480.' },
        { k: 'ق 5', t: 'سلطة مضادة. ', v: 'حتى لا تهدد عائلة من القادة الحرية بعد ذلك، أُنشئت محكمة من مئة قاضٍ يُختارون من أعضاء مجلس الشيوخ، يقدّم إليها القادة حسابهم عند عودتهم (يوستينوس، XIX، 2). وهي على الأرجح أصل «المئة والأربعة» عند أرسطو.' },
        { k: 'ق 4', t: 'الدستور «المختلط». ', v: 'هذه هي الحالة التي يصفها أرسطو. وقد أخفقت محاولات الحكم الفردي: ففي سنة 308، أثناء غزو أغاثوكليس، حاول القائد بوملقار الاستيلاء على السلطة داخل المدينة، فهُزم وأُعدم (ديودوروس، XX، 44).' },
        { k: 'ق 3', t: 'حنون الكبير في مواجهة البرقيين. ', v: 'تصادمت سياستان: حنون، لسان كبار ملّاك الأرض، يفضّل الداخل الإفريقي ويعارض حروب البرقيين؛ أما هؤلاء فيستندون إلى إسبانيا وإلى تأييد الشعب (بوليبيوس). وقد استبعد م. شنيسر فكرة سعي البرقيين إلى ملكية على الطراز الهلنستي.' },
        { k: '196', t: 'حنبعل شفطًا. ', v: 'بعد زاما، انتُخب حنبعل شفطًا. فأخضع أحد المسؤولين عن المال العام كان قد تحدّاه، واستصدر قانونًا يجعل قضاة المئة والأربعة، وكانوا يُعيَّنون مدى الحياة، يُنتخبون لسنة واحدة ولا يُجدَّد لهم في السنة التالية، ثم لاحق الاختلاسات: فصار ممكنًا دفع الغرامة المستحقة لروما دون ضريبة جديدة (تيتوس ليفيوس، XXXIII، 46-47). وبعد أن وشى به خصومه إلى روما، لجأ إلى المنفى سنة 195.' },
        { k: 'بعد 146', t: 'شفطون تحت حكم روما. ', v: 'زالت قرطاج ولم تزل مؤسساتها: فقد ظلت مدن في إفريقيا الرومانية تنتخب الشفطين حتى القرن الثاني الميلادي، وأحيانًا ثلاثة بدل اثنين — وهي إضافة أمازيغية في رأي بعض المختصين (ليبينسكي).' }
      ]
    },
    society: {
      title: 'مجتمع شديد التراتب',
      aside: 'في القمة أرستقراطية ذات أصل صوري؛ وتحتها سكان تتركهم المصادر في الظل في أغلب الأحيان.',
      groups: [
        { cls: 'tile--paper', kick: 'في القمة', t: 'الأرستقراطية', d: 'تنحدر هذه العائلات الكبرى من المستوطنين القادمين من صور، وكانت تمسك بالاقتصاد والسياسة والعبادات. كانوا في البداية ملّاك سفن، ثم صاروا كبار ملّاك الأرض، واحتكروا المناصب، وسكنوا دورًا فاخرة في الوطن القبلي أو في ضاحية ميغارا (بسيس).' },
        { cls: 'tile--sand', kick: 'المعابد', t: 'الكهنة', d: 'ينحدرون من الأرستقراطية ويشكّلون هيئة شديدة التنظيم. وقد حافظت المعابد، وهي مراكز حياة فكرية، على اللغة والثقافة الفينيقيتين قرونًا، حتى في ظل الحكم الروماني. وتُظهر نصيبة من التوفيت (القرن الثالث، متحف باردو) كاهنًا في ثوب من الكتان، حليق الرأس تحت غطاء.' },
        { cls: 'tile--paper', kick: 'الأغلبية', t: 'عامة المدينة', d: 'حرفيون وتجار لا نعرف عددهم؛ أحرار وعبيد، يملك هؤلاء أفرادٌ أو الدولة؛ وغرباء قدموا من أرجاء المتوسط كلها (دريدي). ونادرًا ما تمنحهم النصوص القديمة الكلمة.' }
      ]
    },
    women: {
      alt: 'نصيبة بونيقية تحمل علامة تانيت',
      caption: 'نصيبة بعلامة تانيت — متحف اللوفر',
      kick: 'ما تقوله النُّصُب',
      title: 'المرأة بين الاستقلال والتحالفات',
      paras: [
        'ديدون، وصوفونيسبا، وزوجة صدربعل التي اختارت الموت سنة 146: بضع شخصيات بارزة، لكن المصادر قليلة. كان المجتمع أبويًا، ومع ذلك ترك للمرأة استقلالًا حقيقيًا: فبعض نُصُب التوفيت أهدتها نساء بأسمائهن، ويبدو أن عدة مهن كانت مفتوحة لهن، ولم يكن الكهنوت مغلقًا في وجوههن (دريدي).',
        'ظل الزواج أداة سياسية. فصوفونيسبا، ابنة القائد صدربعل بن جسكون، تزوجت الملك النوميدي سيفاكس لتوثيق تحالف، ثم ماسينيسا. ولا نعرف إن كان تعدد الزوجات معمولًا به.'
      ],
      link: 'صوفونيسبا'
    },
    libyans: {
      kick: 'الإقليم الإفريقي',
      title: 'الليبيون: خاضعون لكن لا غنى عنهم',
      paras: [
        'السكان الأصليون هم الأقل معرفة لدينا. تحولت تجارة البدايات إلى هيمنة: ففي أثناء الحرب البونيقية الأولى، كانت قرطاج تأخذ نصف محاصيل الأرياف (بوليبيوس، I، 72)، وتوالت الثورات — وفي سنة 240 انضم الليبيون بأعداد كبيرة إلى حرب المرتزقة.',
        'ومع ذلك كانت الروابط وثيقة: فقد تزوج نبلاء بونيقيون أميرات ليبيات (بسيس)، وتجمع بعض القبور بين الطقس الفينيقي والطقس الإفريقي، وكانت الجماعات البونيقية متعددة الأصول منذ نشأتها. وفي القرن الثاني أسهمت تعدّيات ماسينيسا النوميدية في سقوط المدينة.'
      ],
      link: 'قرطاج الإفريقية ←'
    },
    relatedTitle: 'اقرأ أيضًا',
    sources: [
      { type: "ancient", author: "أرسطو", work: "السياسة", ref: "II، 11" },
      { type: "ancient", author: "بوليبيوس", work: "التواريخ", ref: "I، 72؛ VI، 43؛ VI، 51؛ VI، 56" },
      { type: "ancient", author: "ديودوروس الصقلي", work: "المكتبة التاريخية", ref: "XX، 9؛ XX، 44" },
      { type: "ancient", author: "يوستينوس", work: "مختصر التواريخ الفيليبية لتروغوس بومبيوس", ref: "XVIII–XIX؛ XIX، 2" },
      { type: "ancient", author: "تيتوس ليفيوس", work: "تاريخ روما", ref: "XXXIII، 46–47" },
      { type: "ancient", author: "سينيكا", work: "في طمأنينة النفس", ref: "IV، 5" },
      { type: "modern", author: "موريس شنيسر", work: "Carthage et la civilisation punique", ref: "PUF, 1978" },
      { type: "modern", author: "صوفي بسيس", work: "Histoire de la Tunisie : de Carthage à nos jours", ref: "Tallandier, 2019" },
      { type: "modern", author: "هادي دريدي", work: "Carthage et le monde punique", ref: "Les Belles Lettres, 2006" },
      { type: "modern", author: "إدوارد ليبينسكي (إشراف)", work: "Dictionnaire de la civilisation phénicienne et punique", ref: "Brepols, 1992" },
      { type: "modern", author: "ستيفان غزيل", work: "Histoire ancienne de l'Afrique du Nord", ref: "Hachette, 1920" },
      { type: "modern", author: "كارل يوليوس بيلوخ", note: "مذكور في هذه الصفحة (نظرية الملكية القرطاجية)" },
      { type: "modern", author: "جيلبير شارل-بيكار", note: "مذكور في هذه الصفحة (نظرية الملكية القرطاجية)" },
      { type: "modern", author: "ويكيبيديا (بالفرنسية)", work: "Carthage ; Civilisation carthaginoise", note: "CC BY-SA 4.0، محتوى أعيدت صياغته" }
    ],
    related: [
      { to: '/hannibal', cls: 'tile--ink', kick: 'سيرة', title: 'حنبعل', text: 'لم يكن قائد كاناي استراتيجيًا فحسب، بل كان أيضًا شفطًا مصلحًا طردته الأوليغارشية.' },
      { to: '/richesse-rome', cls: 'tile--gold', kick: 'الاقتصاد', title: 'أغنى مما تحتمله روما', text: 'لماذا أرّق رخاءُ قرطاج روما أكثر بكثير من سلاحها.' },
      { to: '/economie', cls: 'tile--paper', kick: 'التجارة', title: 'الاقتصاد القرطاجي', text: 'موانئ وطرق المعادن وفلاحة: أسس ثروة الأرستقراطية.' }
    ]
  }
}

const c = await useLocalized('institutions', C)
const isAr = computed(() => isRtlLocale(locale.value))

const fx = (x) => (isAr.value ? 1000 - x : x)
const labelW = (s) => Math.round(s.length * 7.4 + 22)

const nodes = computed(() => NODES.map(n => ({
  ...n,
  x: fx(n.x),
  t: c.value.schema.nodes[n.id].t,
  s: c.value.schema.nodes[n.id].s
})))

const edges = computed(() => EDGES.map(e => {
  const label = c.value.schema.edges[e.id]
  return {
    id: e.id,
    dashed: !!e.dashed,
    x1: fx(e.p[0]), y1: e.p[1], x2: fx(e.p[2]), y2: e.p[3],
    lx: fx(e.l[0]), ly: e.l[1], lw: labelW(label),
    label,
    fromT: c.value.schema.nodes[e.from].t,
    toT: c.value.schema.nodes[e.to].t
  }
}))

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-fig { min-height: clamp(380px, 42vw, 560px); }
.hero-title { font-size: clamp(40px, 4.8vw, 68px); }

/* Chiffres */
.stat-n { font-size: clamp(34px, 3.6vw, 52px); letter-spacing: -0.03em; }
.stat-t { margin-top: 10px; font: 500 14px/1.4 var(--font-body); }

/* Schéma */
.schema-wrap { grid-template-columns: minmax(0, 1fr); }
.schema { display: block; width: 100%; height: auto; font-family: var(--font-body); }
.schema.is-ar { font-family: var(--font-ar); }
.edge { stroke: var(--stone); stroke-width: 1.6; fill: none; }
.edge.dashed { stroke-dasharray: 6 5; }
.arr-head { fill: var(--stone); }
.edge-lbl rect { fill: var(--paper); stroke: rgba(22, 19, 15, 0.18); stroke-width: 1; }
.edge-lbl text { font-size: 13px; font-weight: 600; fill: var(--stone); }
.node rect { fill: var(--white); stroke: var(--ink); stroke-width: 1.5; }
.node-t { font-size: 17px; font-weight: 800; fill: var(--ink); font-family: var(--font-display); }
.schema.is-ar .node-t { font-family: var(--font-ar); }
.node-s { font-size: 13px; fill: var(--muted); }
.node--purple rect { fill: var(--purple); stroke: var(--purple); }
.node--purple .node-t { fill: var(--white); }
.node--purple .node-s { fill: var(--purple-soft); }
.node--ink rect { fill: var(--ink); stroke: var(--ink); }
.node--ink .node-t { fill: var(--white); }
.node--ink .node-s { fill: var(--on-dark); }
.node--gold rect { fill: var(--gold); stroke: var(--gold); }
.node--gold .node-s { fill: var(--gold-ink); }
.schema-note { margin-top: 18px; font: 400 14px/1.5 var(--font-body); }

.flow { display: none; list-style: none; margin: 0; padding: 0; flex-direction: column; }
.flow li {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 8px;
  padding: 14px 0;
  border-top: 1px solid rgba(22, 19, 15, 0.18);
  font: 400 15px/1.45 var(--font-body);
}
.flow li:first-child { border-top: 1.5px solid var(--ink); }
.flow b { font: 800 16px/1.3 var(--font-display); }
.flow-rel { color: var(--muted); font-style: italic; }
.flow li.dashed .flow-rel { text-decoration: underline dotted; text-underline-offset: 3px; }

/* Organes */
.organs { padding-top: var(--gap); }
.organ { min-height: 300px; }
.src { margin-top: 16px; font: 500 12.5px/1.4 var(--font-body); opacity: 0.85; }

/* Aristote */
.block-title { margin-bottom: 20px; }
.para + .para { margin-top: 14px; }
.quote { margin: 0 0 20px; padding-inline-start: 18px; border-inline-start: 3px solid var(--purple); }
.quote p { font: italic 600 clamp(19px, 1.7vw, 23px)/1.4 Georgia, serif; color: var(--ink); margin: 0 0 10px; }
.quote footer { font: 500 13px/1.4 var(--font-body); color: var(--muted); }
.crit { margin: 0; padding-inline-start: 20px; display: flex; flex-direction: column; gap: 10px; }
.crit li { font: 400 16px/1.5 var(--font-body); color: var(--purple-soft); }
.polyb { margin-top: 22px; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, 0.22); font: 400 15px/1.55 var(--font-body); }

/* Évolution */
.row-t { font-weight: 700; color: var(--white); }
.tile--ink .val { color: var(--on-dark-2); }
.evo-link {
  margin-top: 24px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  color: var(--white);
}

/* Société */
.group { min-height: 280px; }
.stele-fig { min-height: 480px; }
.stele-fig > img { object-fit: contain; }
.tile-btn { align-self: flex-start; margin-top: 20px; min-height: 44px; }
.lib-cols { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 40px; }

/* À lire aussi */
.related { min-height: 200px; }

@media (max-width: 960px) {
  .organ, .group { min-height: 0; }
  .stele-fig { min-height: 380px; }
  .lib-cols { grid-template-columns: minmax(0, 1fr); }
}

@media (max-width: 720px) {
  .schema { display: none; }
  .flow { display: flex; }
}

@media (max-width: 640px) {
  .hero-fig { min-height: 260px; }
  .hero-title { font-size: clamp(34px, 9vw, 44px); }
  .stat { padding: 18px; }
  .stat-n { font-size: 30px; }
  .stat-t { font-size: 13px; }
  .quote p { font-size: 18px; }
  .stele-fig { min-height: 320px; }
  .related { min-height: 0; }
}
</style>
