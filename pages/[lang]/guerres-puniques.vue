<template>
  <div class="pg">
    <!-- Héros -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--purple tile--stack tile--hero s-7">
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-5 hero-fig">
        <img src="/img/cannae.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Chiffres -->
    <div class="cols cols-4 keep-2">
      <div v-for="(s, i) in c.stats" :key="i" class="tile stat">
        <div class="num" :style="i === 3 ? { color: '#B8492A' } : null">{{ s.n }}</div>
        <p class="stat-t">{{ s.t }}</p>
      </div>
    </div>

    <!-- Avant Rome : la Sicile et les traités -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.before.kicker }}</span>
          <h2 class="h-section">{{ c.before.title }}</h2>
        </div>
        <p>{{ c.before.aside }}</p>
      </div>
    </section>
    <div class="cols cols-7-5">
      <div class="tile tile--xl tile--ink">
        <span class="kicker">{{ c.before.sicK }}</span>
        <h3 class="h-block">{{ c.before.sicT }}</h3>
        <div class="rows third-rows" style="--row-key:150px">
          <div v-for="r in c.before.sicily" :key="r.k">
            <span class="key">{{ r.k }}</span>
            <span class="val"><strong class="pre-name">{{ r.n }}</strong> {{ r.v }}</span>
          </div>
        </div>
      </div>
      <div class="tile tile--xl tile--gold">
        <span class="kicker">{{ c.before.trK }}</span>
        <h3 class="h-block">{{ c.before.trT }}</h3>
        <div class="rows treaty-rows" style="--row-key:110px">
          <div v-for="r in c.before.treaties" :key="r.k">
            <span class="key">{{ r.k }}</span>
            <span class="val"><strong class="pre-name">{{ r.n }}</strong> {{ r.v }}</span>
          </div>
        </div>
        <p class="note">{{ c.before.trNote }}</p>
      </div>
    </div>
    <div class="cols cols-2 gap-top">
      <div v-for="(x, i) in c.before.invaders" :key="x.t" class="tile tile--xl tile--stack" :class="i === 0 ? 'tile--terra' : 'tile--navy'">
        <div>
          <span class="chip chip--glass">{{ x.era }}</span>
          <h3 class="h-block war-title">{{ x.t }}</h3>
          <p v-for="p in x.paras" :key="p" class="body mt">{{ p }}</p>
        </div>
      </div>
    </div>

    <!-- Les trois guerres -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.three.title }}</h2>
        <p>{{ c.three.aside }}</p>
      </div>
    </section>
    <div class="cols cols-3">
      <div v-for="(w, i) in c.wars" :key="w.id" class="tile tile--xl tile--stack war" :class="tones[i]">
        <div>
          <span class="chip chip--glass">{{ w.era }}</span>
          <h3 class="h-block war-title">{{ w.title }}</h3>
          <p class="war-sub">{{ w.sub }}</p>
          <div class="rows rows--light war-rows" style="--row-key:110px">
            <div v-for="r in w.rows" :key="r.k">
              <span class="key">{{ r.k }}</span>
              <span class="val">{{ r.v }}</span>
            </div>
          </div>
        </div>
        <a :href="'#' + w.id" class="btn war-btn">{{ c.three.more }} ↓</a>
      </div>
    </div>

    <!-- Tableau comparatif -->
    <section class="sec">
      <div class="tile tile--xl cmp-tile">
        <span class="kicker">{{ c.cmp.kicker }}</span>
        <h2 class="h-block cmp-title">{{ c.cmp.title }}</h2>
        <table class="cmp">
          <thead>
            <tr>
              <th scope="col"><span class="sr">{{ c.cmp.aspect }}</span></th>
              <th v-for="(w, i) in c.wars" :key="w.id" scope="col">
                <span class="dot" :style="{ background: dots[i] }" aria-hidden="true" />{{ w.short }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in c.cmp.rows" :key="row.a">
              <th scope="row">{{ row.a }}</th>
              <td v-for="(v, i) in row.v" :key="i" :data-label="c.wars[i].short">
                <span class="dot dot--m" :style="{ background: dots[i] }" aria-hidden="true" />{{ v }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Première guerre -->
    <section :id="c.wars[0].id" class="sec anchor">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig ship-fig">
          <img src="/img/punic-ship.jpg" :alt="c.first.alt" loading="lazy">
          <figcaption>{{ c.first.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--navy tile--stack">
          <div>
            <span class="kicker">{{ c.wars[0].era }}</span>
            <h2 class="h-block">{{ c.wars[0].title }}</h2>
            <p v-for="p in c.first.paras" :key="p" class="body-lg mt">{{ p }}</p>
          </div>
          <div class="mini-stats">
            <div v-for="s in c.first.stats" :key="s.n" class="mini">
              <div class="mini-n">{{ s.n }}</div>
              <p>{{ s.t }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="cols cols-7-5 gap-top">
      <div class="tile tile--xl">
        <span class="kicker">{{ c.first.battlesK }}</span>
        <h3 class="h-card">{{ c.first.battlesT }}</h3>
        <div class="rows battle-rows" style="--row-key:130px">
          <div v-for="b in c.first.battles" :key="b.n">
            <span class="key">{{ b.d }}</span>
            <span class="val">
              <strong class="b-name">{{ b.n }}</strong>
              <span class="tag" :class="'tag--' + b.r">{{ c.result[b.r] }}</span>
              <span class="b-desc">{{ b.t }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="tile tile--xl tile--olive tile--stack">
        <div>
          <span class="kicker">{{ c.merc.kicker }}</span>
          <h2 class="h-block">{{ c.merc.title }}</h2>
          <p v-for="p in c.merc.paras" :key="p" class="body mt">{{ p }}</p>
        </div>
        <div class="myth">
          <strong>{{ c.merc.boxT }}</strong>
          <p class="body">{{ c.merc.boxD }}</p>
        </div>
      </div>
    </div>

    <!-- Deuxième guerre -->
    <section :id="c.wars[1].id" class="sec anchor">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.wars[1].era }}</span>
          <h2 class="h-section">{{ c.wars[1].title }}</h2>
        </div>
        <p>{{ c.second.aside }}</p>
      </div>
    </section>
    <div class="bento">
      <div class="tile tile--xl tile--terra s-7">
        <p v-for="p in c.second.paras" :key="p" class="body-lg para">{{ p }}</p>
        <div class="rows rows--light battle-rows battle-rows--light" style="--row-key:110px">
          <div v-for="b in c.second.battles" :key="b.n">
            <span class="key">{{ b.d }}</span>
            <span class="val">
              <strong class="b-name">{{ b.n }}</strong>
              <span class="tag tag--glass">{{ c.result[b.r] }}</span>
              <span class="b-desc">{{ b.t }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="s-5 side-stack">
        <div v-for="im in c.second.imgs" :key="im.src" class="card-img">
          <img :src="im.src" :alt="im.alt" loading="lazy">
          <div class="card-body">
            <span class="kicker">{{ im.k }}</span>
            <h3 class="h-card">{{ im.t }}</h3>
            <p>{{ im.d }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Carte -->
    <section class="sec">
      <div class="sec-head">
        <h2 class="h-section">{{ c.map.title }}</h2>
        <p>{{ c.map.aside }}</p>
      </div>
      <MapsAnimatedMap compact initial-mode="terr" :modes="['terr', 'hann']" />
    </section>
    <div class="cols cols-3 gap-top">
      <NuxtLink v-for="l in c.links" :key="l.to" :to="localePath(l.to)" class="tile tile--stack link-tile" :class="l.tone">
        <div>
          <span class="kicker">{{ l.k }}</span>
          <h3 class="h-card">{{ l.t }}</h3>
          <p class="body">{{ l.d }}</p>
        </div>
        <span class="go">{{ c.go }}</span>
      </NuxtLink>
    </div>

    <!-- Traité de 201 -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig zama-fig">
          <img src="/img/zama.jpg" :alt="c.treaty.alt" loading="lazy">
          <figcaption>{{ c.treaty.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--gold">
          <span class="kicker">{{ c.treaty.kicker }}</span>
          <h2 class="h-block">{{ c.treaty.title }}</h2>
          <div class="rows treaty-rows" style="--row-key:150px">
            <div v-for="r in c.treaty.rows" :key="r.k">
              <span class="key">{{ r.k }}</span>
              <span class="val">{{ r.v }}</span>
            </div>
          </div>
          <p class="note">{{ c.treaty.note }}</p>
        </div>
      </div>
    </section>

    <!-- Troisième guerre -->
    <section :id="c.wars[2].id" class="sec anchor">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.wars[2].era }}</span>
          <h2 class="h-block">{{ c.wars[2].title }}</h2>
          <p class="body-lg mt">{{ c.third.intro }}</p>
          <div class="rows third-rows" style="--row-key:130px">
            <div v-for="r in c.third.rows" :key="r.k">
              <span class="key">{{ r.k }}</span>
              <span class="val">{{ r.v }}</span>
            </div>
          </div>
        </div>
        <div class="third-side">
          <figure class="fig ruins-fig">
            <img src="/img/ruins.jpg" :alt="c.third.alt" loading="lazy">
            <figcaption>{{ c.third.caption }}</figcaption>
          </figure>
          <div class="tile tile--xl tile--sand">
            <span class="kicker">{{ c.third.mythK }}</span>
            <h3 class="h-card">{{ c.third.mythT }}</h3>
            <p class="body">{{ c.third.mythD }}</p>
            <NuxtLink :to="localePath('/prise-de-carthage')" class="btn btn-outline mt-btn">{{ c.third.cta }}</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <PageSources :items="c.sources" />

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <h2 class="h-section sec-title">{{ c.more.title }}</h2>
    </section>
    <div class="cols cols-3">
      <NuxtLink v-for="m in c.more.items" :key="m.to" :to="localePath(m.to)" class="tile tile--stack link-tile" :class="m.tone">
        <div>
          <span class="kicker">{{ m.k }}</span>
          <h3 class="h-card">{{ m.t }}</h3>
          <p class="body">{{ m.d }}</p>
        </div>
        <span class="go">{{ c.go }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const tones = ['tile--navy', 'tile--terra', 'tile--ink']
const dots = ['#1D3F66', '#B8492A', '#16130F']

const C = {
  fr: {
    meta: {
      title: 'Les guerres puniques (264–146 av. J.-C.)',
      desc: "Les trois guerres entre Carthage et Rome : Mylae, Ecnomus, les Égades, la guerre des Mercenaires, Hannibal, Cannes, Zama, le siège de 149–146, les traités et les indemnités."
    },
    hero: {
      chip: '264–146 av. J.-C.',
      title: 'Les guerres puniques',
      lede: "Trois guerres en cent dix-huit ans : le duel entre Carthage et Rome pour la Méditerranée. Le mot vient du latin punicus, « phénicien » — c'est le nom que Rome donnait aux Carthaginois.",
      alt: 'John Trumbull — La mort de Paul Émile à Cannes',
      caption: 'J. Trumbull — La mort de Paul Émile à Cannes (1773)'
    },
    stats: [
      { n: '3', t: 'guerres entre Carthage et Rome' },
      { n: '118', t: 'ans entre le début de la première (264) et la chute de Carthage (146)' },
      { n: '43', t: 'ans de guerre ouverte au total (23 + 17 + 3)' },
      { n: '10 000', t: "talents d'argent imposés à Carthage en 201, payables en 50 ans" }
    ],
    before: {
      kicker: 'Avant les guerres puniques',
      title: 'Avant Rome : les Grecs de Sicile',
      aside: "Pendant plus de deux siècles, l'adversaire de Carthage n'est pas Rome mais les cités grecques, en Sicile surtout. Avec Rome, les relations restent longtemps réglées par des traités.",
      sicK: 'Les guerres de Sicile',
      sicT: 'Deux siècles de lutte pour la Sicile',
      sicily: [
        { k: 'v. 540–535', n: 'Alalia.', v: "Alliés aux Étrusques, les Carthaginois affrontent au large de la Corse les Grecs de Phocée. Vainqueurs sur le papier, les Phocéens perdent l'essentiel de leur flotte et quittent l'île (Hérodote, I, 166)." },
        { k: '480', n: 'Himère.', v: "Gélon de Syracuse, allié à Théron d'Agrigente, veut unifier la Sicile grecque. L'armée d'Hamilcar le Magonide est écrasée ; Carthage avait peut-être l'appui de la Perse, qui attaquait la Grèce la même année." },
        { k: '409–405', n: 'Le retour.', v: "Hannibal, petit-fils d'Hamilcar, détruit Sélinonte et Himère (409). Il meurt de la peste devant Agrigente ; son successeur Himilcon prend la ville, puis conclut avec Denys de Syracuse une paix qui n'est qu'une trêve." },
        { k: '398–396', n: 'Denys.', v: "Denys s'empare de Motyé, grande place punique de l'ouest de l'île, que Carthage reprend ensuite. Le siège carthaginois de Syracuse doit être levé en 396 à cause d'une épidémie." },
        { k: 'v. 340', n: "L'ouest punique.", v: "Après soixante ans de guerres intermittentes et la défaite du Crimisos face à Timoléon, Carthage n'occupe plus que l'ouest et le sud-ouest de l'île." },
        { k: '315–307', n: 'Agathocle.', v: "Le tyran de Syracuse prend Messine puis attaque les comptoirs puniques. Assiégé dans Syracuse, il porte la guerre en Afrique (voir ci-dessous)." },
        { k: '278–276', n: 'Pyrrhus.', v: "Appelé par les Grecs de Sicile, le roi d'Épire prend presque toutes les places puniques mais échoue devant Lilybée, puis quitte l'île." }
      ],
      trK: 'Diplomatie',
      trT: 'Les traités avec Rome',
      treaties: [
        { k: '509/508', n: 'Le premier traité.', v: "Conservé par Polybe (III, 22), qui le date des premiers consuls. Les Romains ne doivent pas naviguer au-delà du « Beau Promontoire » ; Carthage s'engage à ne pas nuire aux cités latines." },
        { k: '348', n: 'Le deuxième traité.', v: "Rapporté par Polybe (III, 24) et daté par Diodore et Tite-Live. La zone interdite aux Romains s'étend jusqu'à l'Espagne (Mastia) ; la Sardaigne et la Libye leur sont fermées." },
        { k: '306 ?', n: 'Le « traité de Philinos ».', v: "Selon l'historien Philinos d'Agrigente, Rome renonçait à la Sicile et Carthage à l'Italie. Polybe (III, 26) nie qu'il ait existé ; Tite-Live mentionne un renouvellement en 306. Le débat reste ouvert." },
        { k: '279/278', n: 'Contre Pyrrhus.', v: "Les deux cités s'engagent à s'entraider face au roi d'Épire (Polybe, III, 25). C'est leur dernier accord avant la guerre." }
      ],
      trNote: "Ces traités garantissent à Carthage le monopole du commerce en Afrique du Nord et à Rome la sécurité du Latium. Leur rythme de plus en plus serré est souvent lu comme le signe d'une tension croissante.",
      invaders: [
        { era: '310–307 av. J.-C.', t: 'Agathocle en Afrique', paras: [
          "En 310, Hamilcar, fils de Giscon, tient presque toute la Sicile et assiège Syracuse. Agathocle force le blocus, débarque au cap Bon et brûle ses navires pour ôter à ses soldats tout espoir de retraite (Diodore, XX).",
          "Pour la première fois, une armée ennemie ravage le territoire africain de Carthage, dont plusieurs sujets libyens font défection. Carthage doit rappeler ses troupes de Sicile. La guerre dure trois ans et s'achève par la fuite d'Agathocle, qui abandonne son armée (307)."
        ] },
        { era: '278–276 av. J.-C.', t: 'Pyrrhus en Sicile', paras: [
          "Après ses victoires coûteuses sur Rome en Italie, le roi d'Épire passe en Sicile à l'appel des Grecs. Il enlève Éryx et presque tout l'ouest punique, mais bute sur Lilybée, que sa flotte ne peut bloquer.",
          "Il repart en 276, en prédisant, selon Plutarque, qu'il laisse la Sicile comme champ de bataille aux Romains et aux Carthaginois. Douze ans plus tard éclate la première guerre punique."
        ] }
      ]
    },
    three: {
      title: 'Trois guerres',
      aside: 'Une guerre pour la Sicile, une guerre pour la Méditerranée, une guerre pour détruire Carthage.',
      more: 'Détails'
    },
    wars: [
      {
        id: 'premiere-guerre', era: '264–241 av. J.-C.', short: '1re guerre', title: 'Première guerre punique', sub: 'La lutte pour la Sicile',
        rows: [
          { k: 'Cause', v: "Messine appelle Rome à l'aide ; Rome traverse le détroit et entre en Sicile, domaine de Carthage." },
          { k: 'Batailles', v: 'Mylae, Ecnomus, Tunis, Drépane, les îles Égades' },
          { k: 'Issue', v: 'Victoire romaine : Carthage évacue la Sicile.' }
        ]
      },
      {
        id: 'deuxieme-guerre', era: '218–201 av. J.-C.', short: '2e guerre', title: 'Deuxième guerre punique', sub: "La guerre d'Hannibal",
        rows: [
          { k: 'Cause', v: 'Hannibal prend Sagonte, alliée de Rome, en Espagne (219).' },
          { k: 'Batailles', v: 'Trébie, Trasimène, Cannes, Métaure, Zama' },
          { k: 'Issue', v: "Victoire romaine : Carthage perd l'Espagne et sa flotte." }
        ]
      },
      {
        id: 'troisieme-guerre', era: '149–146 av. J.-C.', short: '3e guerre', title: 'Troisième guerre punique', sub: 'Le siège de Carthage',
        rows: [
          { k: 'Cause', v: "Carthage se défend contre Massinissa sans l'accord de Rome (150)." },
          { k: 'Batailles', v: 'Trois ans de siège, assaut du printemps 146' },
          { k: 'Issue', v: "Carthage est prise et incendiée ; son territoire devient la province d'Africa." }
        ]
      }
    ],
    cmp: {
      kicker: 'En un coup d’œil',
      title: 'Les trois guerres comparées',
      aspect: 'Aspect',
      rows: [
        { a: 'Durée', v: ['23 ans', '17 ans', '3 ans'] },
        { a: 'Enjeu', v: ['La Sicile', "L'Espagne, l'Italie, l'hégémonie en Méditerranée", 'La survie de Carthage'] },
        { a: 'Théâtres', v: ['Sicile, mers, Afrique (expédition de Régulus)', 'Espagne, Italie, Sicile, Afrique', 'Carthage et ses environs'] },
        { a: 'Chefs carthaginois', v: ['Hannon, Adherbal, Xanthippe, Hamilcar Barca', 'Hannibal, Hasdrubal et Magon Barca', 'Hasdrubal le Boétarque'] },
        { a: 'Chefs romains', v: ['Duilius, Régulus, Lutatius Catulus', 'Fabius Maximus, Marcellus, Scipion l’Africain', 'Scipion Émilien'] },
        { a: 'Alliés', v: ['Rome : les Mamertins, puis Hiéron de Syracuse (dès 263)', 'Carthage : Gaulois, Capoue, Syracuse, Philippe V ; Rome : alliés italiens, Massinissa (dès 206)', 'Rome : Utique et les Numides ; Carthage presque seule'] },
        { a: 'Issue', v: ['Carthage évacue la Sicile', "Carthage perd l'Espagne, sa flotte et ses éléphants", "Carthage prise ; province romaine d'Africa"] },
        { a: 'Traité', v: ['Paix de Lutatius : 3 200 talents en 10 ans (+1 200 et la Sardaigne en 237)', '10 000 talents en 50 ans, 10 trirèmes', 'Aucun : la ville est détruite'] }
      ]
    },
    result: { rw: 'Victoire romaine', cw: 'Victoire carthaginoise', feat: 'Exploit', ev: 'Tournant' },
    first: {
      alt: 'Proue du navire punique de Marsala',
      caption: 'Navire punique de Marsala, IIIe s. av. J.-C.',
      paras: [
        "En 264, les Mamertins, mercenaires maîtres de Messine, appellent Rome contre Syracuse et Carthage. Rome traverse le détroit : c'est la première fois que ses légions quittent l'Italie. Carthage dominait alors l'ouest de la Sicile et la mer.",
        "Puissance terrestre, Rome se dote d'une flotte en copiant un navire carthaginois échoué, et invente le corvus, une passerelle d'abordage qui transforme la bataille navale en combat d'infanterie. Après 23 ans de guerre sur terre et sur mer, Carthage est vaincue aux îles Égades et doit évacuer la Sicile."
      ],
      stats: [
        { n: '23', t: 'ans de guerre' },
        { n: '~700', t: 'navires de guerre perdus par Rome (Polybe) ; environ 500 par Carthage' },
        { n: '3 200', t: 'talents dus par Carthage à la paix' }
      ],
      battlesK: 'Batailles clés',
      battlesT: 'De Messine aux Égades',
      battles: [
        { d: '264', n: 'Messine', r: 'ev', t: 'Rome passe en Sicile pour soutenir les Mamertins : le début de la guerre.' },
        { d: '262', n: 'Agrigente', r: 'rw', t: "Après un long siège, Rome prend la grande base carthaginoise du sud de l'île." },
        { d: '260', n: 'Mylae', r: 'rw', t: 'Première victoire navale romaine, due au corvus ; le consul Duilius obtient un triomphe.' },
        { d: '256', n: 'Ecnomus', r: 'rw', t: "L'une des plus grandes batailles navales de l'Antiquité : environ 330 navires romains contre 350 carthaginois. Rome débarque en Afrique." },
        { d: '255', n: 'Tunis', r: 'cw', t: "Le Spartiate Xanthippe, au service de Carthage, écrase l'armée de Régulus avec éléphants et cavalerie ; Régulus est fait prisonnier." },
        { d: '249', n: 'Drépane', r: 'cw', t: "Adherbal détruit la flotte du consul Claudius Pulcher — qui, dit-on, avait jeté à la mer les poulets sacrés refusant de manger." },
        { d: '247–241', n: 'Mont Éryx', r: 'ev', t: 'Hamilcar Barca mène en Sicile une guérilla que Rome ne parvient pas à réduire.' },
        { d: '241', n: 'Îles Égades', r: 'rw', t: 'Le 10 mars, la flotte de Lutatius Catulus surprend les navires carthaginois chargés de ravitaillement : environ 50 coulés, 70 capturés. Fin de la guerre.' }
      ]
    },
    merc: {
      kicker: '241–237 av. J.-C. · Afrique',
      title: 'La guerre des Mercenaires',
      paras: [
        "Ruinée par la guerre, Carthage ne peut payer les quelque 20 000 mercenaires rapatriés de Sicile. Ils se soulèvent sous Spendios, Mathos et Autarite ; les villes libyennes, écrasées d'impôts, les rejoignent, puis Utique et Hippo. Carthage elle-même est assiégée.",
        "Hamilcar Barca les enferme au défilé de « la Scie » (238), puis écrase Mathos. Polybe la qualifie de guerre « inexpiable ». Flaubert en fit le décor de Salammbô (1862)."
      ],
      boxT: 'Rome en profite',
      boxD: "En 238–237, Rome s'empare de la Sardaigne, puis de la Corse, et menace de guerre une Carthage épuisée : elle exige 1 200 talents de plus. Pour Polybe, cette injustice fut l'une des causes de la deuxième guerre."
    },
    second: {
      aside: "La plus grande des trois guerres. Seize ans, Hannibal combat en Italie sans y perdre une bataille rangée.",
      paras: [
        "Après la perte de la Sicile, les Barcides bâtissent en Espagne une nouvelle puissance, riche de ses mines d'argent. En 219, Hannibal prend Sagonte ; Rome déclare la guerre. Il franchit les Pyrénées et les Alpes, et porte la guerre en Italie.",
        "Rome finit par éviter la bataille (la stratégie de Fabius « le Temporisateur ») et frappe ailleurs : en Espagne, puis en Afrique. Scipion débarque en 204 ; Hannibal, rappelé, est vaincu à Zama en 202. Carthage survit, mais désarmée."
      ],
      battles: [
        { d: '219', n: 'Sagonte', r: 'ev', t: 'Huit mois de siège ; la chute de la ville déclenche la guerre.' },
        { d: '218', n: 'Les Alpes', r: 'feat', t: "Hannibal franchit les Alpes avec ses éléphants et entre en Italie." },
        { d: '218', n: 'Tessin, Trébie', r: 'cw', t: "Premières victoires en Italie du Nord ; les Gaulois se rallient." },
        { d: '217', n: 'Trasimène', r: 'cw', t: 'Embuscade dans le brouillard : 15 000 Romains tués, le consul Flaminius aussi.' },
        { d: '216', n: 'Cannes', r: 'cw', t: 'Double enveloppement : la plus lourde défaite de l’histoire de Rome.' },
        { d: '212', n: 'Syracuse', r: 'rw', t: 'Rome prend la ville après deux ans de siège ; Archimède y est tué.' },
        { d: '209', n: 'Carthagène', r: 'rw', t: 'Scipion prend par surprise la capitale barcide en Espagne.' },
        { d: '207', n: 'Métaure', r: 'rw', t: "Hasdrubal Barca, venu renforcer son frère, est tué." },
        { d: '206', n: 'Ilipa', r: 'rw', t: "Défaite carthaginoise décisive : l'Espagne est perdue, Gadir se rend." },
        { d: '202', n: 'Zama', r: 'rw', t: 'Hannibal est vaincu en Afrique par Scipion et Massinissa.' }
      ],
      imgs: [
        { src: '/img/sagunto.jpg', alt: 'Le château de Sagonte', k: '219 av. J.-C.', t: 'Sagonte', d: "Cité ibère alliée de Rome au sud de l'Èbre : son siège par Hannibal fut le casus belli." },
        { src: '/img/trasimeno.jpg', alt: 'Le lac Trasimène', k: '217 av. J.-C.', t: 'Trasimène', d: "Sur la rive nord du lac, l'armée romaine est prise en colonne de marche : la plus grande embuscade de l'Antiquité." }
      ]
    },
    map: {
      title: 'Sur la carte',
      aside: "Territoires de Carthage et de Rome de 814 à 146, puis la campagne d'Hannibal, en animation."
    },
    links: [
      { to: '/hannibal', tone: 'tile--purple', k: 'Biographie', t: 'Hannibal Barca', d: 'Le serment, les Alpes, Cannes, Zama, l’exil et la mort à Libyssa.' },
      { to: '/tactiques', tone: 'tile--ink', k: 'Schémas animés', t: 'Les tactiques', d: 'Cannes, la Trébie, Zama : les manœuvres pas à pas.' },
      { to: '/elephants', tone: '', k: 'Traversée des Alpes', t: 'Les éléphants', d: "Des éléphants d'Afrique du Nord aux 80 éléphants de Zama." }
    ],
    go: 'Voir →',
    treaty: {
      alt: 'La bataille de Zama',
      caption: 'La bataille de Zama (202 av. J.-C.)',
      kicker: '201 av. J.-C.',
      title: 'Le traité de paix',
      rows: [
        { k: '10 000', v: "talents d'argent, payables en 50 annuités de 200 talents" },
        { k: '10', v: 'trirèmes seulement : le reste de la flotte de guerre est livré et brûlé' },
        { k: 'Éléphants', v: "tous livrés, et interdiction d'en dresser de nouveaux" },
        { k: 'Guerre', v: "interdite hors d'Afrique, et en Afrique sans l'accord de Rome" },
        { k: 'Massinissa', v: 'Carthage doit lui rendre les terres de ses ancêtres' },
        { k: '100', v: 'otages choisis par Scipion' }
      ],
      note: "Carthage se relève vite : en 191, elle propose de payer d'un coup tout le reste de l'indemnité. Rome refuse — l'annuité était aussi un lien de dépendance."
    },
    third: {
      intro: "Cinquante ans après Zama, Carthage a fini de payer et prospère. À Rome, Caton l'Ancien conclut chacun de ses discours par « Carthago delenda est » : il faut détruire Carthage.",
      rows: [
        { k: '151–150', v: "Harcelée par Massinissa, Carthage lève une armée pour se défendre, contre l'avis de Rome : c'est le prétexte." },
        { k: '149', v: "Une armée consulaire débarque à Utique. Carthage livre 300 enfants de familles nobles en otages, puis, selon Appien, 200 000 armures et 2 000 catapultes." },
        { k: 'Ultimatum', v: 'Rome exige alors que les habitants abandonnent la ville et se réinstallent à 80 stades (environ 15 km) de la mer. Carthage refuse.' },
        { k: '149–147', v: "La ville se réarme : on forge jour et nuit, et les femmes, dit Appien, coupent leurs cheveux pour les cordes des catapultes. Les assauts romains échouent." },
        { k: '147', v: 'Scipion Émilien prend le commandement et ferme le port par une digue.' },
        { k: 'Printemps 146', v: "Six jours de combats de rue jusqu'à Byrsa. Environ 50 000 survivants se rendent et sont vendus comme esclaves. L'épouse du général Hasdrubal se jette dans les flammes avec ses enfants." }
      ],
      alt: 'Ruines des thermes d’Antonin à Carthage',
      caption: "Thermes d'Antonin — la Carthage romaine, refondée sur le site",
      mythK: 'Mythe et réalité',
      mythT: 'Le sel sur les ruines ?',
      mythD: "La ville fut incendiée et son sol maudit, mais aucune source antique ne parle de sel : c'est une invention moderne. La langue et la culture puniques survécurent, et Rome refonda Carthage un siècle plus tard, sous César et Auguste ; elle devint la capitale de l'Afrique romaine.",
      cta: 'La prise de Carthage →'
    },
    more: {
      title: 'À lire aussi',
      items: [
        { to: '/armee', tone: 'tile--terra', k: 'Armée & marine', t: "L'armée de Carthage", d: 'Bataillon sacré, cavalerie numide, frondeurs et quinquérèmes.' },
        { to: '/richesse-rome', tone: '', k: 'Économie', t: "La richesse qui fit peur à Rome", d: "Pourquoi une Carthage désarmée mais prospère inquiétait encore le Sénat." },
        { to: '/carte', tone: 'tile--navy', k: 'Carte animée', t: 'Carthage sur la carte', d: 'Territoires, campagne d’Hannibal, voyages et alliés.' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Hérodote', work: 'Histoires', ref: 'I, 166', note: 'bataille d\'Alalia' },
      { type: 'ancient', author: 'Polybe', work: 'Histoires', ref: 'III, 22 ; III, 24–26', note: 'texte des traités entre Rome et Carthage ; aussi pour la première guerre et la guerre des Mercenaires' },
      { type: 'ancient', author: 'Philinos d\'Agrigente', note: 'œuvre perdue, connue par Polybe (III, 26)' },
      { type: 'ancient', author: 'Diodore de Sicile', work: 'Bibliothèque historique', ref: 'XX', note: 'Agathocle en Afrique ; datation du traité de 348' },
      { type: 'ancient', author: 'Tite-Live', work: 'Histoire romaine', note: 'datation du traité de 348 et renouvellement de 306' },
      { type: 'ancient', author: 'Plutarque', work: 'Vie de Pyrrhus', note: 'départ de Pyrrhus de Sicile (276)' },
      { type: 'ancient', author: 'Appien', work: 'Libyca', note: 'désarmement et siège de Carthage (149–146)' },
      { type: 'ancient', author: 'Caton l\'Ancien', note: 'formule « Carthago delenda est », transmise par la tradition' },
      { type: 'modern', author: 'Gustave Flaubert', work: 'Salammbô', ref: '1862', note: 'roman, cité dans la page' },
      { type: 'modern', author: 'Wikipédia', work: 'Carthage ; Civilisation carthaginoise', note: 'CC BY-SA 4.0, contenus reformulés' }
    ]
  },
  en: {
    meta: {
      title: 'The Punic Wars (264–146 BC)',
      desc: 'The three wars between Carthage and Rome: Mylae, Ecnomus, the Aegates, the Mercenary War, Hannibal, Cannae, Zama, the siege of 149–146, the treaties and indemnities.'
    },
    hero: {
      chip: '264–146 BC',
      title: 'The Punic Wars',
      lede: 'Three wars in a hundred and eighteen years: the duel between Carthage and Rome for the Mediterranean. The word comes from the Latin punicus, "Phoenician" — Rome’s name for the Carthaginians.',
      alt: 'John Trumbull — The Death of Paulus Aemilius at Cannae',
      caption: 'J. Trumbull — The Death of Paulus Aemilius at Cannae (1773)'
    },
    stats: [
      { n: '3', t: 'wars between Carthage and Rome' },
      { n: '118', t: 'years from the start of the first (264) to the fall of Carthage (146)' },
      { n: '43', t: 'years of open war in total (23 + 17 + 3)' },
      { n: '10,000', t: 'talents of silver imposed on Carthage in 201, payable over 50 years' }
    ],
    before: {
      kicker: 'Before the Punic Wars',
      title: 'Before Rome: the Greeks of Sicily',
      aside: "For more than two centuries Carthage's enemy was not Rome but the Greek cities, above all in Sicily. With Rome, relations were long governed by treaties.",
      sicK: 'The Sicilian wars',
      sicT: 'Two centuries of struggle for Sicily',
      sicily: [
        { k: 'c. 540–535', n: 'Alalia.', v: 'Allied with the Etruscans, the Carthaginians fight the Phocaean Greeks off Corsica. Victorious on paper, the Phocaeans lose most of their fleet and leave the island (Herodotus, I, 166).' },
        { k: '480', n: 'Himera.', v: "Gelon of Syracuse, allied with Theron of Akragas, seeks to unite Greek Sicily. The army of Hamilcar the Magonid is crushed; Carthage may have had the backing of Persia, which attacked Greece the same year." },
        { k: '409–405', n: 'The return.', v: "Hannibal, Hamilcar's grandson, destroys Selinus and Himera (409). He dies of plague before Akragas; his successor Himilco takes the city, then makes a peace with Dionysius of Syracuse that is no more than a truce." },
        { k: '398–396', n: 'Dionysius.', v: 'Dionysius captures Motya, the great Punic stronghold in the west of the island, which Carthage later retakes. The Carthaginian siege of Syracuse has to be lifted in 396 because of an epidemic.' },
        { k: 'c. 340', n: 'The Punic west.', v: "After sixty years of intermittent war and the defeat at the Crimisus against Timoleon, Carthage holds only the west and south-west of the island." },
        { k: '315–307', n: 'Agathocles.', v: 'The tyrant of Syracuse takes Messana, then attacks the Punic posts. Besieged in Syracuse, he carries the war to Africa (see below).' },
        { k: '278–276', n: 'Pyrrhus.', v: 'Called in by the Sicilian Greeks, the king of Epirus takes almost all the Punic strongholds but fails before Lilybaeum, then leaves the island.' }
      ],
      trK: 'Diplomacy',
      trT: 'The treaties with Rome',
      treaties: [
        { k: '509/508', n: 'The first treaty.', v: 'Preserved by Polybius (III, 22), who dates it to the first consuls. The Romans must not sail beyond the “Fair Promontory”; Carthage undertakes not to harm the Latin cities.' },
        { k: '348', n: 'The second treaty.', v: 'Reported by Polybius (III, 24) and dated by Diodorus and Livy. The zone closed to the Romans extends to Spain (Mastia); Sardinia and Libya are shut to them.' },
        { k: '306 ?', n: 'The “Philinus treaty”.', v: 'According to the historian Philinus of Akragas, Rome renounced Sicily and Carthage Italy. Polybius (III, 26) denies it ever existed; Livy mentions a renewal in 306. The debate remains open.' },
        { k: '279/278', n: 'Against Pyrrhus.', v: 'The two cities agree to help each other against the king of Epirus (Polybius, III, 25). It is their last agreement before the war.' }
      ],
      trNote: 'These treaties guaranteed Carthage a monopoly of trade in North Africa and Rome the security of Latium. Their ever closer rhythm is often read as a sign of rising tension.',
      invaders: [
        { era: '310–307 BC', t: 'Agathocles in Africa', paras: [
          'In 310 Hamilcar, son of Gisco, holds almost all of Sicily and besieges Syracuse. Agathocles breaks the blockade, lands on Cape Bon and burns his ships to deprive his soldiers of any hope of retreat (Diodorus, XX).',
          "For the first time an enemy army ravages Carthage's African territory, and several of its Libyan subjects defect. Carthage has to recall its troops from Sicily. The war lasts three years and ends with the flight of Agathocles, who abandons his army (307)."
        ] },
        { era: '278–276 BC', t: 'Pyrrhus in Sicily', paras: [
          'After his costly victories over Rome in Italy, the king of Epirus crosses to Sicily at the call of the Greeks. He takes Eryx and nearly all the Punic west, but is stopped at Lilybaeum, which his fleet cannot blockade.',
          'He leaves in 276, predicting, according to Plutarch, that he was leaving Sicily as a battlefield for the Romans and Carthaginians. Twelve years later the First Punic War broke out.'
        ] }
      ]
    },
    three: {
      title: 'Three wars',
      aside: 'A war for Sicily, a war for the Mediterranean, a war to destroy Carthage.',
      more: 'Details'
    },
    wars: [
      {
        id: 'premiere-guerre', era: '264–241 BC', short: '1st war', title: 'First Punic War', sub: 'The struggle for Sicily',
        rows: [
          { k: 'Cause', v: 'Messana calls on Rome for help; Rome crosses the strait into Sicily, Carthage’s sphere.' },
          { k: 'Battles', v: 'Mylae, Ecnomus, Tunis, Drepana, the Aegates Islands' },
          { k: 'Outcome', v: 'Roman victory: Carthage evacuates Sicily.' }
        ]
      },
      {
        id: 'deuxieme-guerre', era: '218–201 BC', short: '2nd war', title: 'Second Punic War', sub: 'Hannibal’s war',
        rows: [
          { k: 'Cause', v: 'Hannibal takes Saguntum, Rome’s ally in Spain (219).' },
          { k: 'Battles', v: 'Trebia, Trasimene, Cannae, Metaurus, Zama' },
          { k: 'Outcome', v: 'Roman victory: Carthage loses Spain and its fleet.' }
        ]
      },
      {
        id: 'troisieme-guerre', era: '149–146 BC', short: '3rd war', title: 'Third Punic War', sub: 'The siege of Carthage',
        rows: [
          { k: 'Cause', v: 'Carthage defends itself against Masinissa without Rome’s consent (150).' },
          { k: 'Battles', v: 'Three years of siege, the assault of spring 146' },
          { k: 'Outcome', v: 'Carthage is taken and burned; its territory becomes the province of Africa.' }
        ]
      }
    ],
    cmp: {
      kicker: 'At a glance',
      title: 'The three wars compared',
      aspect: 'Aspect',
      rows: [
        { a: 'Duration', v: ['23 years', '17 years', '3 years'] },
        { a: 'Stake', v: ['Sicily', 'Spain, Italy, mastery of the Mediterranean', 'The survival of Carthage'] },
        { a: 'Theatres', v: ['Sicily, the seas, Africa (Regulus’ expedition)', 'Spain, Italy, Sicily, Africa', 'Carthage and its surroundings'] },
        { a: 'Carthaginian leaders', v: ['Hanno, Adherbal, Xanthippus, Hamilcar Barca', 'Hannibal, Hasdrubal and Mago Barca', 'Hasdrubal the Boetharch'] },
        { a: 'Roman leaders', v: ['Duilius, Regulus, Lutatius Catulus', 'Fabius Maximus, Marcellus, Scipio Africanus', 'Scipio Aemilianus'] },
        { a: 'Allies', v: ['Rome: the Mamertines, then Hiero of Syracuse (from 263)', 'Carthage: Gauls, Capua, Syracuse, Philip V; Rome: Italian allies, Masinissa (from 206)', 'Rome: Utica and the Numidians; Carthage almost alone'] },
        { a: 'Outcome', v: ['Carthage evacuates Sicily', 'Carthage loses Spain, its fleet and its elephants', 'Carthage taken; Roman province of Africa'] },
        { a: 'Treaty', v: ['Peace of Lutatius: 3,200 talents over 10 years (+1,200 and Sardinia in 237)', '10,000 talents over 50 years, 10 triremes', 'None: the city is destroyed'] }
      ]
    },
    result: { rw: 'Roman victory', cw: 'Carthaginian victory', feat: 'Feat', ev: 'Turning point' },
    first: {
      alt: 'Bow of the Marsala Punic ship',
      caption: 'The Marsala Punic ship, 3rd c. BC',
      paras: [
        'In 264 the Mamertines, mercenaries who held Messana, called on Rome against Syracuse and Carthage. Rome crossed the strait: the first time its legions left Italy. Carthage then dominated western Sicily and the sea.',
        'A land power, Rome built a fleet by copying a stranded Carthaginian ship, and invented the corvus, a boarding bridge that turned sea battle into infantry combat. After 23 years of war on land and sea, Carthage was defeated at the Aegates Islands and had to evacuate Sicily.'
      ],
      stats: [
        { n: '23', t: 'years of war' },
        { n: '~700', t: 'warships lost by Rome (Polybius); about 500 by Carthage' },
        { n: '3,200', t: 'talents owed by Carthage at the peace' }
      ],
      battlesK: 'Key battles',
      battlesT: 'From Messana to the Aegates',
      battles: [
        { d: '264', n: 'Messana', r: 'ev', t: 'Rome crosses into Sicily to support the Mamertines: the war begins.' },
        { d: '262', n: 'Agrigentum', r: 'rw', t: 'After a long siege Rome takes the great Carthaginian base in the south of the island.' },
        { d: '260', n: 'Mylae', r: 'rw', t: 'First Roman naval victory, thanks to the corvus; the consul Duilius is granted a triumph.' },
        { d: '256', n: 'Ecnomus', r: 'rw', t: 'One of the largest naval battles of antiquity: some 330 Roman ships against 350 Carthaginian. Rome lands in Africa.' },
        { d: '255', n: 'Tunis', r: 'cw', t: 'The Spartan Xanthippus, serving Carthage, crushes Regulus’ army with elephants and cavalry; Regulus is captured.' },
        { d: '249', n: 'Drepana', r: 'cw', t: 'Adherbal destroys the fleet of the consul Claudius Pulcher — who, it is said, had thrown overboard the sacred chickens that refused to eat.' },
        { d: '247–241', n: 'Mount Eryx', r: 'ev', t: 'Hamilcar Barca wages a guerrilla war in Sicily that Rome cannot put down.' },
        { d: '241', n: 'Aegates Islands', r: 'rw', t: 'On 10 March Lutatius Catulus’ fleet surprises the Carthaginian ships laden with supplies: about 50 sunk, 70 captured. The war ends.' }
      ]
    },
    merc: {
      kicker: '241–237 BC · Africa',
      title: 'The Mercenary War',
      paras: [
        'Ruined by the war, Carthage could not pay the 20,000 or so mercenaries brought back from Sicily. They rose under Spendius, Mathos and Autaritus; the Libyan towns, crushed by taxes, joined them, then Utica and Hippo. Carthage itself was besieged.',
        'Hamilcar Barca trapped them in the pass known as "the Saw" (238), then crushed Mathos. Polybius called it the "truceless" war. Flaubert made it the setting of Salammbô (1862).'
      ],
      boxT: 'Rome takes advantage',
      boxD: 'In 238–237 Rome seized Sardinia, then Corsica, and threatened an exhausted Carthage with war, demanding 1,200 more talents. For Polybius this injustice was one of the causes of the second war.'
    },
    second: {
      aside: 'The greatest of the three wars. For sixteen years Hannibal fought in Italy without losing a pitched battle there.',
      paras: [
        'After losing Sicily, the Barcids built a new power in Spain, rich in silver mines. In 219 Hannibal took Saguntum; Rome declared war. He crossed the Pyrenees and the Alps and carried the war into Italy.',
        'Rome eventually avoided battle (the strategy of Fabius "the Delayer") and struck elsewhere: in Spain, then in Africa. Scipio landed in 204; Hannibal, recalled, was beaten at Zama in 202. Carthage survived, but disarmed.'
      ],
      battles: [
        { d: '219', n: 'Saguntum', r: 'ev', t: 'An eight-month siege; the city’s fall starts the war.' },
        { d: '218', n: 'The Alps', r: 'feat', t: 'Hannibal crosses the Alps with his elephants and enters Italy.' },
        { d: '218', n: 'Ticinus, Trebia', r: 'cw', t: 'First victories in northern Italy; the Gauls rally to him.' },
        { d: '217', n: 'Trasimene', r: 'cw', t: 'Ambush in the fog: 15,000 Romans killed, the consul Flaminius among them.' },
        { d: '216', n: 'Cannae', r: 'cw', t: 'Double envelopment: the heaviest defeat in Rome’s history.' },
        { d: '212', n: 'Syracuse', r: 'rw', t: 'Rome takes the city after a two-year siege; Archimedes is killed.' },
        { d: '209', n: 'Cartagena', r: 'rw', t: 'Scipio takes the Barcid capital in Spain by surprise.' },
        { d: '207', n: 'Metaurus', r: 'rw', t: 'Hasdrubal Barca, coming to reinforce his brother, is killed.' },
        { d: '206', n: 'Ilipa', r: 'rw', t: 'Decisive Carthaginian defeat: Spain is lost, Gadir surrenders.' },
        { d: '202', n: 'Zama', r: 'rw', t: 'Hannibal is defeated in Africa by Scipio and Masinissa.' }
      ],
      imgs: [
        { src: '/img/sagunto.jpg', alt: 'The castle of Sagunto', k: '219 BC', t: 'Saguntum', d: 'An Iberian city allied to Rome south of the Ebro: its siege by Hannibal was the casus belli.' },
        { src: '/img/trasimeno.jpg', alt: 'Lake Trasimene', k: '217 BC', t: 'Trasimene', d: 'On the north shore of the lake the Roman army was caught in marching column: the greatest ambush of antiquity.' }
      ]
    },
    map: {
      title: 'On the map',
      aside: 'The territories of Carthage and Rome from 814 to 146, then Hannibal’s campaign, animated.'
    },
    links: [
      { to: '/hannibal', tone: 'tile--purple', k: 'Biography', t: 'Hannibal Barca', d: 'The oath, the Alps, Cannae, Zama, exile and death at Libyssa.' },
      { to: '/tactiques', tone: 'tile--ink', k: 'Animated diagrams', t: 'The tactics', d: 'Cannae, the Trebia, Zama: the manoeuvres step by step.' },
      { to: '/elephants', tone: '', k: 'Crossing the Alps', t: 'The elephants', d: 'From North African elephants to the 80 elephants of Zama.' }
    ],
    go: 'See →',
    treaty: {
      alt: 'The Battle of Zama',
      caption: 'The Battle of Zama (202 BC)',
      kicker: '201 BC',
      title: 'The peace treaty',
      rows: [
        { k: '10,000', v: 'talents of silver, payable in 50 yearly instalments of 200 talents' },
        { k: '10', v: 'triremes only: the rest of the war fleet is handed over and burned' },
        { k: 'Elephants', v: 'all surrendered, and no new ones to be trained' },
        { k: 'War', v: 'forbidden outside Africa, and inside Africa without Rome’s consent' },
        { k: 'Masinissa', v: 'Carthage must return to him the lands of his ancestors' },
        { k: '100', v: 'hostages chosen by Scipio' }
      ],
      note: 'Carthage recovered fast: in 191 it offered to pay off the whole remaining indemnity at once. Rome refused — the annual payment was also a bond of dependence.'
    },
    third: {
      intro: 'Fifty years after Zama, Carthage had finished paying and was prospering. In Rome, Cato the Elder ended every speech with "Carthago delenda est": Carthage must be destroyed.',
      rows: [
        { k: '151–150', v: 'Harassed by Masinissa, Carthage raises an army to defend itself, against Rome’s wishes: this is the pretext.' },
        { k: '149', v: 'A consular army lands at Utica. Carthage hands over 300 children of noble families as hostages, then, according to Appian, 200,000 sets of armour and 2,000 catapults.' },
        { k: 'Ultimatum', v: 'Rome then demands that the inhabitants abandon the city and resettle 80 stadia (about 15 km) from the sea. Carthage refuses.' },
        { k: '149–147', v: 'The city rearms: forges work day and night, and the women, Appian says, cut their hair for catapult ropes. The Roman assaults fail.' },
        { k: '147', v: 'Scipio Aemilianus takes command and closes the harbour with a mole.' },
        { k: 'Spring 146', v: 'Six days of street fighting up to the Byrsa. About 50,000 survivors surrender and are sold as slaves. The wife of the general Hasdrubal throws herself into the flames with her children.' }
      ],
      alt: 'Ruins of the Antonine Baths at Carthage',
      caption: 'The Antonine Baths — Roman Carthage, refounded on the site',
      mythK: 'Myth and reality',
      mythT: 'Salt on the ruins?',
      mythD: 'The city was burned and its ground cursed, but no ancient source mentions salt: that is a modern invention. Punic language and culture survived, and Rome refounded Carthage a century later, under Caesar and Augustus; it became the capital of Roman Africa.',
      cta: 'The fall of Carthage →'
    },
    more: {
      title: 'Read also',
      items: [
        { to: '/armee', tone: 'tile--terra', k: 'Army & navy', t: 'The army of Carthage', d: 'Sacred Band, Numidian cavalry, slingers and quinqueremes.' },
        { to: '/richesse-rome', tone: '', k: 'Economy', t: 'The wealth that frightened Rome', d: 'Why a disarmed but prosperous Carthage still worried the Senate.' },
        { to: '/carte', tone: 'tile--navy', k: 'Animated map', t: 'Carthage on the map', d: 'Territories, Hannibal’s campaign, voyages and alliances.' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Herodotus', work: 'Histories', ref: 'I, 166', note: 'battle of Alalia' },
      { type: 'ancient', author: 'Polybius', work: 'Histories', ref: 'III, 22; III, 24–26', note: 'text of the treaties between Rome and Carthage; also for the First Punic War and the Mercenary War' },
      { type: 'ancient', author: 'Philinus of Akragas', note: 'lost work, known through Polybius (III, 26)' },
      { type: 'ancient', author: 'Diodorus of Sicily', work: 'Library of History', ref: 'XX', note: 'Agathocles in Africa; dating of the treaty of 348' },
      { type: 'ancient', author: 'Livy', work: 'History of Rome', note: 'dating of the treaty of 348 and its renewal in 306' },
      { type: 'ancient', author: 'Plutarch', work: 'Life of Pyrrhus', note: 'Pyrrhus leaves Sicily (276)' },
      { type: 'ancient', author: 'Appian', work: 'Libyca', note: 'disarmament and siege of Carthage (149–146)' },
      { type: 'ancient', author: 'Cato the Elder', note: 'the phrase “Carthago delenda est”, handed down by tradition' },
      { type: 'modern', author: 'Gustave Flaubert', work: 'Salammbô', ref: '1862', note: 'novel, mentioned on this page' },
      { type: 'modern', author: 'Wikipedia (French)', work: 'Carthage ; Civilisation carthaginoise', note: 'CC BY-SA 4.0, content rephrased' }
    ]
  },
  ar: {
    meta: {
      title: 'الحروب البونيقية (264–146 ق.م)',
      desc: 'الحروب الثلاث بين قرطاج وروما: ميلاي وإكنوموس وجزر إيغادي، حرب المرتزقة، حنبعل وكاناي وزاما، حصار 149–146، المعاهدات والتعويضات.'
    },
    hero: {
      chip: '264–146 ق.م',
      title: 'الحروب البونيقية',
      lede: 'ثلاث حروب في مئة وثمانية عشر عامًا: الصراع بين قرطاج وروما على البحر الأبيض المتوسط. الكلمة من اللاتينية punicus أي «فينيقي» — وهو الاسم الذي أطلقته روما على القرطاجيين.',
      alt: 'جون ترمبل — موت باولوس إيميليوس في كاناي',
      caption: 'ج. ترمبل — موت باولوس إيميليوس في كاناي (1773)'
    },
    stats: [
      { n: '3', t: 'حروب بين قرطاج وروما' },
      { n: '118', t: 'عامًا بين بداية الأولى (264) وسقوط قرطاج (146)' },
      { n: '43', t: 'عامًا من الحرب المفتوحة إجمالًا (23 + 17 + 3)' },
      { n: '10000', t: 'تالنت من الفضة فُرضت على قرطاج سنة 201، تُدفع على 50 عامًا' }
    ],
    before: {
      kicker: 'قبل الحروب البونيقية',
      title: 'قبل روما: إغريق صقلية',
      aside: 'طوال أكثر من قرنين لم يكن خصم قرطاج روما، بل المدن الإغريقية، في صقلية خاصة. أما مع روما فظلت العلاقات طويلًا تنظمها المعاهدات.',
      sicK: 'حروب صقلية',
      sicT: 'قرنان من الصراع على صقلية',
      sicily: [
        { k: 'نحو 540–535', n: 'ألاليا.', v: 'بالتحالف مع الإتروسكيين، يواجه القرطاجيون إغريق فوقية قبالة كورسيكا. ينتصر الفوقيون شكلًا لكنهم يخسرون معظم أسطولهم ويغادرون الجزيرة (هيرودوت، 1، 166).' },
        { k: '480', n: 'هيميرا.', v: 'يسعى جيلون حاكم سرقوسة، متحالفًا مع ثيرون حاكم أكراغاس، إلى توحيد صقلية الإغريقية. فيُسحق جيش حملقار الماغوني؛ وربما حظيت قرطاج بدعم فارس التي هاجمت بلاد الإغريق في العام نفسه.' },
        { k: '409–405', n: 'العودة.', v: 'يدمّر حنبعل، حفيد حملقار، سيلينونتي وهيميرا (409). ثم يموت بالطاعون أمام أكراغاس؛ فيستولي خلفه حملكون على المدينة، ثم يعقد مع ديونيسيوس السرقوسي صلحًا لم يكن سوى هدنة.' },
        { k: '398–396', n: 'ديونيسيوس.', v: 'يستولي ديونيسيوس على موتيا، المعقل البونيقي الكبير في غرب الجزيرة، ثم تستعيدها قرطاج. ويُرفع الحصار القرطاجي عن سرقوسة سنة 396 بسبب وباء.' },
        { k: 'نحو 340', n: 'الغرب البونيقي.', v: 'بعد ستين عامًا من حروب متقطعة وهزيمة نهر كريميسوس أمام تيموليون، لم تعد قرطاج تسيطر إلا على غرب الجزيرة وجنوبها الغربي.' },
        { k: '315–307', n: 'أغاثوكليس.', v: 'يستولي طاغية سرقوسة على مسينا ثم يهاجم المراكز البونيقية. وحين يُحاصَر في سرقوسة ينقل الحرب إلى إفريقيا (انظر أدناه).' },
        { k: '278–276', n: 'بيروس.', v: 'يستنجد به إغريق صقلية، فيستولي ملك إبيروس على جلّ المعاقل البونيقية لكنه يعجز أمام ليليبايوم، ثم يغادر الجزيرة.' }
      ],
      trK: 'دبلوماسية',
      trT: 'المعاهدات مع روما',
      treaties: [
        { k: '509/508', n: 'المعاهدة الأولى.', v: 'حفظها بوليبيوس (3، 22) وأرّخها بعهد القنصلين الأولين. لا يجوز للرومان الإبحار وراء «الرأس الجميل»؛ وتتعهد قرطاج بعدم الإضرار بالمدن اللاتينية.' },
        { k: '348', n: 'المعاهدة الثانية.', v: 'أوردها بوليبيوس (3، 24) وأرّخها ديودوروس وتيتوس ليفيوس. تمتد المنطقة المحظورة على الرومان حتى إسبانيا (ماستيا)؛ وتُغلق في وجوههم سردينيا وليبيا.' },
        { k: '306 ؟', n: '«معاهدة فيلينوس».', v: 'حسب المؤرخ فيلينوس الأكراغاسي، تخلّت روما عن صقلية وقرطاج عن إيطاليا. ينكر بوليبيوس (3، 26) وجودها، ويذكر تيتوس ليفيوس تجديدًا للمعاهدة سنة 306. ولا يزال الجدل قائمًا.' },
        { k: '279/278', n: 'ضد بيروس.', v: 'تتعهد المدينتان بالتعاون ضد ملك إبيروس (بوليبيوس، 3، 25). وهو آخر اتفاق بينهما قبل الحرب.' }
      ],
      trNote: 'ضمنت هذه المعاهدات لقرطاج احتكار التجارة في إفريقيا الشمالية ولروما أمن لاتيوم. وكثيرًا ما يُقرأ تقارب مواعيدها المتزايد علامةً على توتر متصاعد.',
      invaders: [
        { era: '310–307 ق.م', t: 'أغاثوكليس في إفريقيا', paras: [
          'في سنة 310 كان حملقار بن جيسكون يسيطر على صقلية كلها تقريبًا ويحاصر سرقوسة. فيخترق أغاثوكليس الحصار وينزل في الوطن القبلي ويحرق سفنه ليقطع على جنوده كل أمل في التراجع (ديودوروس، 20).',
          'لأول مرة يعيث جيش معادٍ فسادًا في الإقليم الإفريقي لقرطاج، وينشقّ عنها عدد من رعاياها الليبيين. فتضطر إلى استدعاء قواتها من صقلية. وتدوم الحرب ثلاث سنوات وتنتهي بفرار أغاثوكليس تاركًا جيشه (307).'
        ] },
        { era: '278–276 ق.م', t: 'بيروس في صقلية', paras: [
          'بعد انتصاراته الباهظة الثمن على روما في إيطاليا، يعبر ملك إبيروس إلى صقلية تلبيةً لنداء الإغريق. فيستولي على إريكس وعلى الغرب البونيقي كله تقريبًا، لكنه يصطدم بليليبايوم التي عجز أسطوله عن محاصرتها.',
          'يغادر سنة 276 متنبئًا، حسب بلوتارخوس، بأنه يترك صقلية ساحة قتال للرومان والقرطاجيين. وبعد اثنتي عشرة سنة اندلعت الحرب البونيقية الأولى.'
        ] }
      ]
    },
    three: {
      title: 'ثلاث حروب',
      aside: 'حرب من أجل صقلية، وحرب من أجل المتوسط، وحرب لتدمير قرطاج.',
      more: 'التفاصيل'
    },
    wars: [
      {
        id: 'premiere-guerre', era: '264–241 ق.م', short: 'الحرب الأولى', title: 'الحرب البونيقية الأولى', sub: 'الصراع على صقلية',
        rows: [
          { k: 'السبب', v: 'مسينا تستنجد بروما، فتعبر روما المضيق إلى صقلية، مجال نفوذ قرطاج.' },
          { k: 'المعارك', v: 'ميلاي، إكنوموس، تونس، دريبانا، جزر إيغادي' },
          { k: 'النتيجة', v: 'نصر روماني: قرطاج تُخلي صقلية.' }
        ]
      },
      {
        id: 'deuxieme-guerre', era: '218–201 ق.م', short: 'الحرب الثانية', title: 'الحرب البونيقية الثانية', sub: 'حرب حنبعل',
        rows: [
          { k: 'السبب', v: 'حنبعل يأخذ ساغونتوم، حليفة روما في إسبانيا (219).' },
          { k: 'المعارك', v: 'تريبيا، ترازيمين، كاناي، ميتاوروس، زاما' },
          { k: 'النتيجة', v: 'نصر روماني: قرطاج تفقد إسبانيا وأسطولها.' }
        ]
      },
      {
        id: 'troisieme-guerre', era: '149–146 ق.م', short: 'الحرب الثالثة', title: 'الحرب البونيقية الثالثة', sub: 'حصار قرطاج',
        rows: [
          { k: 'السبب', v: 'قرطاج تدافع عن نفسها ضد ماسينيسا دون إذن روما (150).' },
          { k: 'المعارك', v: 'ثلاث سنوات من الحصار، واقتحام ربيع 146' },
          { k: 'النتيجة', v: 'أُخذت قرطاج وأُحرقت، وصارت أرضها ولاية إفريقية.' }
        ]
      }
    ],
    cmp: {
      kicker: 'نظرة سريعة',
      title: 'مقارنة الحروب الثلاث',
      aspect: 'الجانب',
      rows: [
        { a: 'المدة', v: ['23 عامًا', '17 عامًا', '3 أعوام'] },
        { a: 'الرهان', v: ['صقلية', 'إسبانيا وإيطاليا والهيمنة على المتوسط', 'بقاء قرطاج'] },
        { a: 'ميادين القتال', v: ['صقلية والبحار وإفريقيا (حملة ريغولوس)', 'إسبانيا وإيطاليا وصقلية وإفريقيا', 'قرطاج وضواحيها'] },
        { a: 'القادة القرطاجيون', v: ['حنون، أذربعل، كسانثيبوس، حملقار برقا', 'حنبعل وصدربعل وماغون برقا', 'صدربعل البويثارخ'] },
        { a: 'القادة الرومان', v: ['دويليوس، ريغولوس، لوتاتيوس كاتولوس', 'فابيوس ماكسيموس، مارسيلوس، سكيبيو الإفريقي', 'سكيبيو إيميليانوس'] },
        { a: 'الحلفاء', v: ['روما: الماميرتينيون ثم هييرون السرقوسي (منذ 263)', 'قرطاج: الغاليون وكابوا وسرقوسة وفيليب الخامس؛ روما: الحلفاء الإيطاليون وماسينيسا (منذ 206)', 'روما: أوتيكا والنوميديون؛ قرطاج شبه وحيدة'] },
        { a: 'النتيجة', v: ['قرطاج تُخلي صقلية', 'قرطاج تفقد إسبانيا وأسطولها وفيلتها', 'أخذ قرطاج؛ ولاية إفريقية الرومانية'] },
        { a: 'المعاهدة', v: ['صلح لوتاتيوس: 3200 تالنت في 10 أعوام (+1200 وسردينيا سنة 237)', '10000 تالنت في 50 عامًا، و10 سفن ثلاثية', 'لا شيء: تدمير المدينة'] }
      ]
    },
    result: { rw: 'نصر روماني', cw: 'نصر قرطاجي', feat: 'إنجاز', ev: 'منعطف' },
    first: {
      alt: 'مقدمة السفينة البونيقية في مرسالا',
      caption: 'السفينة البونيقية في مرسالا، القرن الثالث ق.م',
      paras: [
        'سنة 264 استنجد الماميرتينيون، وهم مرتزقة استولوا على مسينا، بروما ضد سرقوسة وقرطاج. فعبرت روما المضيق: أوّل مرة تغادر فيها فيالقها إيطاليا. وكانت قرطاج تهيمن حينها على غرب صقلية وعلى البحر.',
        'روما قوة برية، فبنت أسطولًا بنسخ سفينة قرطاجية جانحة، وابتكرت «الكورفوس»، جسر الاقتحام الذي حوّل المعركة البحرية إلى قتال مشاة. وبعد 23 عامًا من الحرب برًّا وبحرًا هُزمت قرطاج عند جزر إيغادي واضطرّت إلى إخلاء صقلية.'
      ],
      stats: [
        { n: '23', t: 'عامًا من الحرب' },
        { n: '~700', t: 'سفينة حربية خسرتها روما (بوليبيوس)؛ ونحو 500 خسرتها قرطاج' },
        { n: '3200', t: 'تالنت على قرطاج عند الصلح' }
      ],
      battlesK: 'معارك حاسمة',
      battlesT: 'من مسينا إلى إيغادي',
      battles: [
        { d: '264', n: 'مسينا', r: 'ev', t: 'روما تعبر إلى صقلية لنصرة الماميرتينيين: بداية الحرب.' },
        { d: '262', n: 'أكراغاس', r: 'rw', t: 'بعد حصار طويل تأخذ روما القاعدة القرطاجية الكبرى في جنوب الجزيرة.' },
        { d: '260', n: 'ميلاي', r: 'rw', t: 'أوّل نصر بحري روماني بفضل الكورفوس؛ ويُمنح القنصل دويليوس موكب نصر.' },
        { d: '256', n: 'إكنوموس', r: 'rw', t: 'من أكبر المعارك البحرية في العصور القديمة: نحو 330 سفينة رومانية مقابل 350 قرطاجية. روما تنزل في إفريقيا.' },
        { d: '255', n: 'تونس', r: 'cw', t: 'الإسبرطي كسانثيبوس، في خدمة قرطاج، يسحق جيش ريغولوس بالفيلة والفرسان، ويقع ريغولوس في الأسر.' },
        { d: '249', n: 'دريبانا', r: 'cw', t: 'أذربعل يدمّر أسطول القنصل كلاوديوس بولشر — الذي يُروى أنه رمى في البحر الدجاج المقدّس لأنه رفض الأكل.' },
        { d: '247–241', n: 'جبل إريكس', r: 'ev', t: 'حملقار برقا يخوض في صقلية حرب عصابات عجزت روما عن إخمادها.' },
        { d: '241', n: 'جزر إيغادي', r: 'rw', t: 'في 10 مارس يباغت أسطول لوتاتيوس كاتولوس السفن القرطاجية المثقلة بالمؤن: نحو 50 غارقة و70 مأسورة. نهاية الحرب.' }
      ]
    },
    merc: {
      kicker: '241–237 ق.م · إفريقيا',
      title: 'حرب المرتزقة',
      paras: [
        'أنهكت الحربُ قرطاجَ فعجزت عن دفع أجور نحو عشرين ألف مرتزق أُعيدوا من صقلية. فثاروا بقيادة سبنديوس وماتوس وأوتاريتوس، وانضمّت إليهم المدن الليبية المثقلة بالضرائب، ثم أوتيكا وهيبو. وحوصرت قرطاج نفسها.',
        'حاصرهم حملقار برقا في مضيق «المنشار» (238) ثم سحق ماتوس. وسمّاها بوليبيوس الحرب «التي لا هدنة فيها». وجعلها فلوبير إطار روايته «سالامبو» (1862).'
      ],
      boxT: 'روما تستغلّ الفرصة',
      boxD: 'سنتي 238–237 استولت روما على سردينيا ثم كورسيكا، وهدّدت قرطاج المنهكة بالحرب، وطالبت بـ1200 تالنت إضافية. ورأى بوليبيوس في هذا الظلم أحد أسباب الحرب الثانية.'
    },
    second: {
      aside: 'أعظم الحروب الثلاث. ستة عشر عامًا قاتل فيها حنبعل في إيطاليا دون أن يخسر معركة نظامية.',
      paras: [
        'بعد خسارة صقلية بنى البرقيون في إسبانيا قوة جديدة غنية بمناجم الفضة. وفي سنة 219 أخذ حنبعل ساغونتوم، فأعلنت روما الحرب. فعبر البرانس والألب ونقل الحرب إلى إيطاليا.',
        'انتهت روما إلى تجنّب المواجهة (استراتيجية فابيوس «المماطل») وضربت في أماكن أخرى: في إسبانيا ثم في إفريقيا. نزل سكيبيو سنة 204، واستُدعي حنبعل فهُزم في زاما سنة 202. نجت قرطاج، لكن منزوعة السلاح.'
      ],
      battles: [
        { d: '219', n: 'ساغونتوم', r: 'ev', t: 'ثمانية أشهر من الحصار، وسقوط المدينة يُشعل الحرب.' },
        { d: '218', n: 'الألب', r: 'feat', t: 'حنبعل يعبر الألب بفيلته ويدخل إيطاليا.' },
        { d: '218', n: 'تيتشينو وتريبيا', r: 'cw', t: 'أولى الانتصارات في شمال إيطاليا، والغاليون ينضمّون إليه.' },
        { d: '217', n: 'ترازيمين', r: 'cw', t: 'كمين في الضباب: 15 ألف قتيل روماني، بينهم القنصل فلامينيوس.' },
        { d: '216', n: 'كاناي', r: 'cw', t: 'تطويق مزدوج: أثقل هزيمة في تاريخ روما.' },
        { d: '212', n: 'سرقوسة', r: 'rw', t: 'روما تأخذ المدينة بعد عامين من الحصار، ويُقتل أرخميدس.' },
        { d: '209', n: 'قرطاجنة', r: 'rw', t: 'سكيبيو يأخذ عاصمة البرقيين في إسبانيا على حين غرّة.' },
        { d: '207', n: 'ميتاوروس', r: 'rw', t: 'صدربعل برقا، القادم لنجدة أخيه، يُقتل.' },
        { d: '206', n: 'إليبا', r: 'rw', t: 'هزيمة قرطاجية حاسمة: ضياع إسبانيا واستسلام قادس.' },
        { d: '202', n: 'زاما', r: 'rw', t: 'هزيمة حنبعل في إفريقيا على يد سكيبيو وماسينيسا.' }
      ],
      imgs: [
        { src: '/img/sagunto.jpg', alt: 'قلعة ساغونتو', k: '219 ق.م', t: 'ساغونتوم', d: 'مدينة إيبيرية حليفة لروما جنوب نهر الإبرو: كان حصار حنبعل لها سبب الحرب.' },
        { src: '/img/trasimeno.jpg', alt: 'بحيرة ترازيمين', k: '217 ق.م', t: 'ترازيمين', d: 'على الضفة الشمالية للبحيرة بوغت الجيش الروماني وهو في رتل المسير: أكبر كمين في العصور القديمة.' }
      ]
    },
    map: {
      title: 'على الخريطة',
      aside: 'أراضي قرطاج وروما من 814 إلى 146، ثم حملة حنبعل، بالحركة.'
    },
    links: [
      { to: '/hannibal', tone: 'tile--purple', k: 'سيرة', t: 'حنبعل برقا', d: 'القسم والألب وكاناي وزاما والمنفى والموت في ليبيسا.' },
      { to: '/tactiques', tone: 'tile--ink', k: 'رسوم متحركة', t: 'التكتيكات', d: 'كاناي وتريبيا وزاما: المناورات خطوة بخطوة.' },
      { to: '/elephants', tone: '', k: 'عبور الألب', t: 'الفيلة', d: 'من فيلة شمال إفريقيا إلى فيلة زاما الثمانين.' }
    ],
    go: 'شاهد ←',
    treaty: {
      alt: 'معركة زاما',
      caption: 'معركة زاما (202 ق.م)',
      kicker: '201 ق.م',
      title: 'معاهدة الصلح',
      rows: [
        { k: '10000', v: 'تالنت من الفضة، تُدفع على 50 قسطًا سنويًا قيمة كل منها 200 تالنت' },
        { k: '10', v: 'سفن ثلاثية فقط: يُسلَّم باقي الأسطول الحربي ويُحرق' },
        { k: 'الفيلة', v: 'تُسلَّم كلها، ويُمنع ترويض فيلة جديدة' },
        { k: 'الحرب', v: 'ممنوعة خارج إفريقيا، وداخلها دون إذن روما' },
        { k: 'ماسينيسا', v: 'على قرطاج أن تعيد إليه أراضي أجداده' },
        { k: '100', v: 'رهينة يختارهم سكيبيو' }
      ],
      note: 'نهضت قرطاج بسرعة: سنة 191 عرضت دفع ما تبقّى من التعويض دفعة واحدة. رفضت روما — فالقسط السنوي كان أيضًا رباط تبعية.'
    },
    third: {
      intro: 'بعد خمسين عامًا من زاما، أنهت قرطاج الدفع وازدهرت. وفي روما كان كاتو الأكبر يختم كل خطبة بقوله «Carthago delenda est»: يجب تدمير قرطاج.',
      rows: [
        { k: '151–150', v: 'تحت ضغط ماسينيسا، تجنّد قرطاج جيشًا للدفاع عن نفسها رغم معارضة روما: وكان ذلك هو الذريعة.' },
        { k: '149', v: 'جيش قنصلي ينزل في أوتيكا. تسلّم قرطاج 300 طفل من الأسر النبيلة رهائن، ثم، حسب أبيانوس، 200 ألف درع و2000 منجنيق.' },
        { k: 'الإنذار', v: 'عندها طالبت روما السكان بهجر المدينة والاستقرار على بعد 80 ستاديون (نحو 15 كم) من البحر. فرفضت قرطاج.' },
        { k: '149–147', v: 'تعيد المدينة تسليح نفسها: تعمل الورش ليلًا ونهارًا، وتقصّ النساء، كما يروي أبيانوس، شعورهنّ حبالًا للمجانيق. وتفشل الهجمات الرومانية.' },
        { k: '147', v: 'سكيبيو إيميليانوس يتولّى القيادة ويغلق الميناء بسدّ.' },
        { k: 'ربيع 146', v: 'ستة أيام من قتال الشوارع حتى بيرصا. نحو 50 ألف ناجٍ يستسلمون ويُباعون عبيدًا. وزوجة القائد صدربعل ترمي بنفسها وأطفالها في النار.' }
      ],
      alt: 'أطلال حمامات أنطونيوس في قرطاج',
      caption: 'حمامات أنطونيوس — قرطاج الرومانية التي أُعيد تأسيسها في الموقع نفسه',
      mythK: 'أسطورة وحقيقة',
      mythT: 'الملح على الأطلال؟',
      mythD: 'أُحرقت المدينة ولُعنت أرضها، لكن لا مصدر قديمًا يذكر الملح: إنه اختراع حديث. وبقيت اللغة والثقافة البونيقيتان، وأعادت روما تأسيس قرطاج بعد قرن في عهد قيصر وأغسطس، فصارت عاصمة إفريقيا الرومانية.',
      cta: 'سقوط قرطاج ←'
    },
    more: {
      title: 'اقرأ أيضًا',
      items: [
        { to: '/armee', tone: 'tile--terra', k: 'الجيش والبحرية', t: 'جيش قرطاج', d: 'الكتيبة المقدسة والفرسان النوميديون والمقلاعيون والسفن الخماسية.' },
        { to: '/richesse-rome', tone: '', k: 'الاقتصاد', t: 'الثروة التي أخافت روما', d: 'لماذا ظلّت قرطاج المنزوعة السلاح والمزدهرة تُقلق مجلس الشيوخ.' },
        { to: '/carte', tone: 'tile--navy', k: 'خريطة متحركة', t: 'قرطاج على الخريطة', d: 'الأراضي وحملة حنبعل والرحلات والتحالفات.' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'هيرودوت', work: '«التواريخ»', ref: '1، 166', note: 'معركة ألاليا' },
      { type: 'ancient', author: 'بوليبيوس', work: '«التواريخ»', ref: '3، 22؛ 3، 24–26', note: 'نصوص المعاهدات بين روما وقرطاج، وكذلك الحرب الأولى وحرب المرتزقة' },
      { type: 'ancient', author: 'فيلينوس الأكراغاسي', note: 'مؤلَّف مفقود، معروف عن طريق بوليبيوس (3، 26)' },
      { type: 'ancient', author: 'ديودوروس الصقلي', work: '«المكتبة التاريخية»', ref: '20', note: 'أغاثوكليس في إفريقيا، وتأريخ معاهدة 348' },
      { type: 'ancient', author: 'تيتوس ليفيوس', work: '«تاريخ روما»', note: 'تأريخ معاهدة 348 وتجديدها سنة 306' },
      { type: 'ancient', author: 'بلوتارخ', work: '«حياة بيروس»', note: 'مغادرة بيروس صقلية (276)' },
      { type: 'ancient', author: 'أبيانوس', work: '«الليبيات»', note: 'نزع سلاح قرطاج وحصارها (149–146)' },
      { type: 'ancient', author: 'كاتو الأكبر', note: 'عبارة «Carthago delenda est» كما نقلها التراث' },
      { type: 'modern', author: 'غوستاف فلوبير', work: 'Salammbô', ref: '1862', note: 'رواية مذكورة في الصفحة' },
      { type: 'modern', author: 'ويكيبيديا (بالفرنسية)', work: 'Carthage ; Civilisation carthaginoise', note: 'CC BY-SA 4.0، محتوى أعيدت صياغته' }
    ]
  }
}

const c = await useLocalized('guerres-puniques', C)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-fig { background: #8E3720; }

.stat { min-height: 150px; }
.stat-t { font: 500 14px/1.45 var(--font-body); margin-top: 10px; }

.mt { margin-top: 16px; }
.para + .para { margin-top: 14px; }
.gap-top { margin-top: var(--gap); }
.anchor { scroll-margin-top: 90px; }

/* Trois tuiles */
.pre-name { font: 800 17px/1.2 var(--font-display); color: inherit; }
.tile--ink .pre-name { color: var(--white); }

.war-title { font-size: clamp(28px, 2.8vw, 40px); margin-top: 18px; }
.war-sub { font: 600 16px/1.3 var(--font-body); margin-top: 8px; }
.war-rows { margin-top: 22px; }
.war-rows .key { font-size: 14px; font-family: var(--font-body); font-weight: 700; letter-spacing: 0.02em; }
.war-rows .val { font-size: 15px; }
.war-rows > div { padding: 14px 0; gap: 14px; }
.war-btn { background: rgba(255, 255, 255, 0.14); color: inherit; align-self: flex-start; }
.war-btn:hover { background: var(--white); color: var(--ink); }

/* Tableau comparatif */
.cmp-title { margin-bottom: 24px; }
.cmp {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.cmp th, .cmp td {
  text-align: start;
  vertical-align: top;
  padding: 16px 14px;
  border-top: 1px solid rgba(22, 19, 15, 0.18);
  font: 400 15px/1.45 var(--font-body);
}
.cmp thead th {
  border-top: 0;
  border-bottom: 1.5px solid var(--ink);
  font: 800 clamp(17px, 1.6vw, 22px)/1.1 var(--font-display);
}
.cmp thead th:first-child { width: 20%; }
.cmp tbody th { font: 700 14px/1.4 var(--font-body); color: var(--purple); }
.cmp thead + tbody tr:first-child > * { border-top: 0; }
.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-inline-end: 8px;
  vertical-align: 0.05em;
}
.dot--m { display: none; }
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Première guerre */
.ship-fig { min-height: clamp(320px, 38vw, 560px); background: var(--navy); }
.mini-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--gap); }
.mini { background: var(--navy-deep); border-radius: 20px; padding: 18px; }
.mini-n { font: 900 30px/1 var(--font-display); }
.mini p { font: 500 13px/1.4 var(--font-body); margin-top: 6px; }

.battle-rows { margin-top: 18px; }
.battle-rows .key { font-size: clamp(18px, 1.7vw, 22px); }
.battle-rows .val { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 10px; }
.b-name { font: 800 18px/1.2 var(--font-display); }
.b-desc { flex-basis: 100%; font-size: 15px; color: var(--muted); }
.battle-rows--light .b-desc { color: var(--terra-soft); }
.tag {
  font: 600 12px/1 var(--font-body);
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--paper);
  white-space: nowrap;
}
.tag--rw { background: var(--sand); color: var(--stone); }
.tag--cw { background: var(--purple); color: var(--white); }
.tag--ev { background: var(--navy-soft); color: var(--navy-deep); }
.tag--feat { background: var(--gold); color: var(--ink); }
.tag--glass { background: rgba(255, 255, 255, 0.16); color: var(--white); }

.myth { background: rgba(255, 255, 255, 0.1); border-radius: 18px; padding: 18px 20px; }
.myth strong { font: 800 16px/1.2 var(--font-display); }
.myth .body { margin-top: 6px; }

/* Deuxième guerre */
.side-stack { display: flex; flex-direction: column; gap: var(--gap); }
.side-stack .card-img { flex: 1; }

/* Traité */
.zama-fig { min-height: clamp(320px, 38vw, 560px); }
.treaty-rows { margin-top: 24px; }
.treaty-rows .key { font-size: clamp(18px, 1.7vw, 24px); }
.treaty-rows .val { font-size: 15px; }
.note { margin-top: 20px; font: 500 14px/1.5 var(--font-body); }

/* Troisième guerre */
.third-rows { margin-top: 24px; }
.third-rows .key { font-size: clamp(17px, 1.6vw, 22px); }
.third-rows .val { font-size: 15px; color: var(--on-dark); }
.third-side { display: flex; flex-direction: column; gap: var(--gap); }
.ruins-fig { min-height: clamp(260px, 26vw, 380px); }
.mt-btn { margin-top: 18px; }

.sec-title { margin-bottom: clamp(20px, 2.4vw, 32px); }

.link-tile { min-height: 210px; }
.go { font: 600 14px/1 var(--font-body); color: var(--purple); }
.link-tile.tile--purple .go,
.link-tile.tile--ink .go,
.link-tile.tile--terra .go,
.link-tile.tile--navy .go { color: var(--white); }

@media (max-width: 960px) {
  .cmp thead th:first-child { width: 24%; }
}

@media (max-width: 760px) {
  .cmp thead { display: none; }
  .cmp, .cmp tbody, .cmp tr, .cmp th, .cmp td { display: block; width: 100%; }
  .cmp tr { padding: 14px 0; border-top: 1.5px solid var(--ink); }
  .cmp tbody tr:first-child { border-top: 0; padding-top: 0; }
  .cmp th, .cmp td { border-top: 0; padding: 4px 0; }
  .cmp tbody th { font-size: 15px; margin-bottom: 4px; }
  .cmp td::before {
    content: attr(data-label) " · ";
    font-weight: 700;
  }
  .dot--m { display: inline-block; }
}

@media (max-width: 640px) {
  .fig--hero { min-height: 280px; }
  .stat { min-height: 0; padding: 18px; }
  .stat .num { font-size: 32px; }
  .stat-t { font-size: 13px; }
  .mini-stats { grid-template-columns: minmax(0, 1fr); }
  .link-tile { min-height: 0; }
}
</style>
