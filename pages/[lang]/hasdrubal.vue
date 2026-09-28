<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--ink tile--stack tile--hero s-7">
        <span class="chip chip--terra">{{ c.chip }}</span>
        <div>
          <h1 class="h-display">{{ c.title }}</h1>
          <p class="lede">{{ c.lede }}</p>
        </div>
      </div>
      <figure class="fig fig--hero s-5 coin-hero">
        <img src="/img/quarter-shekel.jpg" :alt="c.heroAlt">
        <figcaption>{{ c.heroCap }}</figcaption>
      </figure>
    </div>

    <!-- Qui est qui -->
    <div class="cols cols-2">
      <div v-for="f in figs" :key="f" class="tile tile--xl tile--stack who" :class="f === 'beau' ? 'tile--purple' : 'tile--navy'">
        <div>
          <span class="kicker">{{ c.who[f].k }}</span>
          <div class="h-block who-name">{{ c.who[f].name }}</div>
          <p class="body-lg">{{ c.who[f].d }}</p>
        </div>
        <button type="button" class="btn who-btn" :aria-controls="'panel-' + f" @click="select(f, true)">{{ c.read }} ↓</button>
      </div>
    </div>
    <p class="note">{{ c.note }}</p>

    <!-- Commutateur -->
    <div ref="switchEl" class="switch">
      <div class="seg" role="tablist" :aria-label="c.segLabel">
        <button
          v-for="f in figs"
          :id="'tab-' + f"
          :key="f"
          type="button"
          role="tab"
          :aria-selected="who === f"
          :aria-controls="'panel-' + f"
          :tabindex="who === f ? 0 : -1"
          @click="select(f, false)"
          @keydown.right.prevent="select(other(f), false, true)"
          @keydown.left.prevent="select(other(f), false, true)"
        >{{ c.who[f].tab }}</button>
      </div>
    </div>

    <!-- Panneaux : un par Hasdrubal -->
    <div v-for="f in figs" v-show="who === f" :id="'panel-' + f" :key="f" role="tabpanel" :aria-labelledby="'tab-' + f" class="panel">
      <div class="cols cols-5-7">
        <figure class="fig intro-fig">
          <img :src="P[f].img" :alt="c[f].alt" loading="lazy">
          <figcaption class="cap-box">{{ c[f].cap }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--stack" :class="f === 'beau' ? 'tile--purple' : 'tile--navy'">
          <span class="chip chip--glass">{{ c[f].chip }}</span>
          <div>
            <span class="kicker">{{ c[f].dates }}</span>
            <h2 class="h-display fig-title">{{ c[f].name }}</h2>
            <p class="epithet">{{ c[f].epithet }}</p>
            <p class="lede">{{ c[f].lede }}</p>
          </div>
        </div>
      </div>

      <div class="cols cols-4 stats">
        <div v-for="(s, i) in c[f].stats" :key="i" class="tile">
          <div class="num" :class="{ 'n-accent': i === 0 }">{{ s.n }}</div>
          <p class="stat-t">{{ s.t }}</p>
        </div>
      </div>

      <section class="sec">
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.chronoKicker }}</span>
          <h3 class="h-section block-title">{{ c[f].chronoTitle }}</h3>
          <div class="rows" style="--row-key:170px">
            <div v-for="r in c[f].rows" :key="r.k + r.t">
              <span class="key">{{ r.k }}</span>
              <span class="val"><strong>{{ r.t }}</strong> — {{ r.d }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="sec sec--wide">
        <h3 class="h-section block-title">{{ c[f].themesTitle }}</h3>
      </section>
      <div class="cols cols-2 themes">
        <div v-for="(t, i) in c[f].themes" :key="i" class="tile tile--xl" :class="t.tone">
          <span class="kicker">{{ t.k }}</span>
          <h4 class="h-card">{{ t.t }}</h4>
          <p v-for="(p, j) in t.p" :key="j" class="body-lg para">{{ p }}</p>
        </div>
      </div>

      <section class="sec">
        <div class="cols cols-7-5 cols--flush">
          <div class="tile tile--xl tile--stack" :class="f === 'beau' ? 'tile--sand' : 'tile--terra'">
            <div>
              <span class="kicker">{{ c[f].feature.k }}</span>
              <h3 class="h-block block-title">{{ c[f].feature.t }}</h3>
              <p v-for="(p, j) in c[f].feature.p" :key="j" class="body-lg para">{{ p }}</p>
            </div>
          </div>
          <figure class="fig feature-fig" :class="{ 'feature-fig--coin': f === 'barca' }">
            <img :src="P[f].img2" :alt="c[f].feature.alt" loading="lazy">
            <figcaption class="cap-box">{{ c[f].feature.cap }}</figcaption>
          </figure>
        </div>
      </section>

      <section class="sec sec--wide">
        <h3 class="h-section block-title">{{ c.voicesTitle }}</h3>
      </section>
      <div class="cols cols-3">
        <figure v-for="(q, i) in c[f].voices" :key="i" class="tile tile--xl quote-tile" :class="i === 1 ? 'tile--outline' : 'tile--paper'">
          <blockquote class="quote"><p>{{ q.q }}</p></blockquote>
          <figcaption><cite>{{ q.cite }}</cite></figcaption>
        </figure>
      </div>

      <section class="sec">
        <div class="tile tile--xl tile--gold legacy">
          <span class="kicker">{{ c.legacyKicker }}</span>
          <h3 class="h-block block-title">{{ c[f].legacy.t }}</h3>
          <p class="body-lg">{{ c[f].legacy.d }}</p>
          <button type="button" class="btn btn-outline legacy-btn" :aria-controls="'panel-' + other(f)" @click="select(other(f), true)">{{ c.who[other(f)].switchTo }} →</button>
        </div>
      </section>
    </div>

    <!-- La famille / liens -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.family.title }}</h2>
        <NuxtLink :to="localePath('/biographies')" class="btn btn-outline">{{ c.family.all }} →</NuxtLink>
      </div>
    </section>
    <div class="cols cols-3">
      <NuxtLink v-for="l in c.family.items" :key="l.to" :to="localePath(l.to)" class="tile tile--stack fam" :class="l.tone">
        <div>
          <span class="kicker">{{ l.k }}</span>
          <h3 class="h-card">{{ l.t }}</h3>
          <p class="body">{{ l.d }}</p>
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

const figs = ['beau', 'barca']
const P = {
  beau: { img: '/img/wall-cartagena.jpg', img2: '/img/theatre-cartagena.jpg' },
  barca: { img: '/img/trasimeno.jpg', img2: '/img/quarter-shekel.jpg' }
}

const who = ref('beau')
const switchEl = ref(null)
const other = (f) => (f === 'beau' ? 'barca' : 'beau')

function select (f, scroll, focus) {
  who.value = f
  if (import.meta.client) {
    try { history.replaceState(history.state, '', '#' + f) } catch (e) {}
    nextTick(() => {
      if (focus) document.getElementById('tab-' + f)?.focus()
      if (scroll) switchEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
}

onMounted(() => {
  const h = window.location.hash.replace('#', '')
  if (figs.includes(h)) who.value = h
})

const C = {
  fr: {
    metaTitle: 'Hasdrubal le Beau et Hasdrubal Barca — les deux Hasdrubal barcides',
    metaDesc: "Hasdrubal le Beau, gendre d'Hamilcar, fondateur de Carthagène et signataire du traité de l'Èbre (226), et Hasdrubal Barca, frère d'Hannibal, qui franchit les Alpes et tomba au Métaure (207).",
    chip: 'Biographies · Les Barcides',
    title: 'Hasdrubal',
    lede: "Deux Barcides ont porté ce nom, qui signifie en punique « Baal est mon secours ». Le gendre d'Hamilcar a bâti l'Hispanie punique ; son fils a tenté de rejoindre Hannibal en Italie. Deux destins, deux morts violentes.",
    heroAlt: 'Quart de shekel barcide frappé en Hispanie',
    heroCap: "Monnaie barcide d'Hispanie : tête laurée (Melqart ou un Barcide ?) et éléphant",
    who: {
      beau: { k: "Le gendre d'Hamilcar · † 221", name: 'Hasdrubal le Beau', tab: 'Hasdrubal le Beau', d: "Successeur d'Hamilcar en Hispanie (229/228–221), fondateur de Carthagène, signataire du traité de l'Èbre, assassiné en 221.", switchTo: 'Lire la vie d\'Hasdrubal Barca' },
      barca: { k: "Le fils d'Hamilcar · ~245 – 207", name: 'Hasdrubal Barca', tab: 'Hasdrubal Barca', d: "Frère cadet d'Hannibal, il tient l'Hispanie dix ans, franchit à son tour les Alpes et tombe au Métaure en 207.", switchTo: 'Lire la vie d\'Hasdrubal le Beau' }
    },
    read: 'Lire sa vie',
    note: "À ne pas confondre avec Hasdrubal Giscon, adversaire de Scipion en Hispanie et en Afrique, ni avec Hasdrubal le Boétharque, dernier défenseur de Carthage en 146.",
    segLabel: 'Choisir un Hasdrubal',
    chronoKicker: 'Chronologie',
    voicesTitle: 'Ce que disent les Anciens',
    legacyKicker: 'Héritage',
    beau: {
      alt: 'Vestiges de la muraille punique de Carthagène',
      cap: "La muraille punique de Carthagène, la « Ville nouvelle » fondée par Hasdrubal.",
      chip: 'Le bâtisseur',
      dates: '? – 221 av. J.-C.',
      name: 'Hasdrubal le Beau',
      epithet: "Gendre d'Hamilcar, fondateur de Carthagène",
      lede: "Compagnon d'armes et gendre d'Hamilcar, il hérite en 229/228 d'une Hispanie à peine conquise. Là où son beau-père avait imposé la guerre, il gouverne par les alliances, les mariages et la fondation d'une capitale.",
      stats: [
        { n: '~8 ans', t: "à la tête de l'Hispanie punique (229/228 – 221)" },
        { n: '~227', t: 'fondation de Qart Hadasht, la future Carthagène' },
        { n: '226', t: "traité de l'Èbre avec Rome" },
        { n: '26 ans', t: "l'âge d'Hannibal lorsque l'armée l'acclame à sa mort" }
      ],
      chronoTitle: 'Le gouverneur',
      rows: [
        { k: '237', t: "Avec Hamilcar", d: "Il accompagne son beau-père en Hispanie, aux côtés du jeune Hannibal, et devient son principal lieutenant." },
        { k: '229/228', t: 'Succession', d: "À la mort d'Hamilcar devant Héliké, l'armée l'acclame chef ; Carthage confirme. Il venge Hamilcar sur les Orissi et soumet leurs villes." },
        { k: '~227', t: 'Qart Hadasht', d: "Il fonde sur un site portuaire exceptionnel la « Ville nouvelle », Carthagène, capitale de l'Hispanie barcide, proche des mines d'argent." },
        { k: '226', t: "Le traité de l'Èbre", d: "Inquiète, Rome envoie une ambassade : Hasdrubal s'engage à ne pas franchir l'Èbre en armes. Le sud de la péninsule est de fait reconnu comme zone punique." },
        { k: '221', t: 'Assassinat', d: "Il est tué dans sa résidence par un Celte (un esclave selon Tite-Live) qui vengeait un maître mis à mort. L'armée acclame Hannibal." }
      ],
      themesTitle: 'Gouverner l\'Hispanie',
      themes: [
        { tone: 'tile--paper', k: 'Diplomatie', t: 'La politique des alliances', p: [
          "Selon Tite-Live, Hasdrubal étendit la puissance carthaginoise « plus par l'hospitalité des rois et l'amitié des chefs que par la guerre ». Diodore rapporte qu'il épousa la fille d'un roi ibère et que les peuples ibères le proclamèrent stratège suprême.",
          "Cette méthode consolida la conquête d'Hamilcar : réseaux de clientèle, otages, garnisons et tributs firent du sud de la péninsule un véritable État barcide."
        ] },
        { tone: '', k: 'La capitale', t: 'Qart Hadasht, la « Ville nouvelle »', p: [
          "Même nom que Carthage elle-même : Qart Hadasht. La cité occupe une presqu'île fermée par une lagune, avec l'un des meilleurs ports de la Méditerranée occidentale. Polybe la décrit en détail et y mentionne la colline où s'élevait le palais d'Hasdrubal.",
          "Arsenal, trésor, atelier monétaire et port de guerre, elle devient la base d'où Hannibal partira en 218 — et la cible que Scipion prendra en 209."
        ] }
      ],
      feature: {
        k: '226 av. J.-C.',
        t: "Le traité de l'Èbre",
        p: [
          "Préoccupée par la menace gauloise en Italie du Nord, Rome se contente d'un engagement : les Carthaginois ne franchiront pas l'Èbre en armes. Pour Polybe, c'est tout le contenu du traité.",
          "La cité de Sagonte, au sud du fleuve et alliée de Rome, n'y figure pas selon Polybe ; Tite-Live affirme au contraire qu'elle était protégée. Cette ambiguïté servira de prétexte à la deuxième guerre punique lorsqu'Hannibal assiégera Sagonte en 219."
        ],
        alt: 'Théâtre romain de Carthagène',
        cap: "Le théâtre romain de Carthagène : la ville d'Hasdrubal est restée l'un des grands ports d'Espagne."
      },
      voices: [
        { q: "« Il avait accru la puissance carthaginoise plus par l'hospitalité des rois et en gagnant les chefs à son amitié que par la guerre et les armes. »", cite: 'Tite-Live, Histoire romaine, XXI, 2' },
        { q: "« Les Carthaginois ne franchiront pas l'Èbre en armes. »", cite: "Clause du traité de 226, d'après Polybe, Histoires, II, 13" },
        { q: "Saisi et torturé, le meurtrier garda un tel visage qu'il semblait sourire, triomphant de la douleur.", cite: 'Tite-Live, Histoire romaine, XXI, 2' }
      ],
      legacy: {
        t: 'Le bâtisseur de la base',
        d: "Sans Carthagène, son argent et ses alliances ibères, la marche d'Hannibal vers l'Italie n'aurait pas été possible. Hasdrubal le Beau a transformé une conquête militaire en un État — et sa ville, Cartagena, porte encore le nom de Carthage."
      }
    },
    barca: {
      alt: 'Le lac Trasimène',
      cap: "Le lac Trasimène, où Hannibal triompha en 217 : l'Italie que son frère ne rejoindra jamais.",
      chip: 'Le sacrifice oublié',
      dates: '~245 – 207 av. J.-C.',
      name: 'Hasdrubal Barca',
      epithet: "Le frère qui franchit les Alpes pour rejoindre Hannibal",
      lede: "Stratège d'une volonté de fer, il tint le front ibérique pendant une décennie tandis que son frère ébranlait l'Italie. Puis il refit la route des Alpes pour lui apporter la victoire — et n'arriva jamais.",
      stats: [
        { n: '10 ans', t: "de guerre en Hispanie (218 – 208) face aux Scipions" },
        { n: '2e', t: "armée carthaginoise à franchir les Alpes, en 207" },
        { n: '7 000', t: 'soldats d\'élite amenés à marches forcées par le consul Néron' },
        { n: '10 000', t: 'Carthaginois et alliés tués au Métaure selon Polybe (56 000 selon Tite-Live)' }
      ],
      chronoTitle: 'Le frère d\'Hannibal',
      rows: [
        { k: '~245', t: 'Naissance', d: "Deuxième fils d'Hamilcar Barca, élevé comme ses frères dans les camps d'Hispanie." },
        { k: '218', t: "Gardien de l'Hispanie", d: "Hannibal part pour l'Italie et lui confie l'Hispanie : une flotte et environ 12 650 fantassins, 2 550 cavaliers et 21 éléphants (Polybe, III, 33)." },
        { k: '217', t: "L'embouchure de l'Èbre", d: 'Sa flotte est battue par Cnaeus Scipion.' },
        { k: '215', t: 'Dertosa', d: "Alors qu'il s'apprête à rejoindre Hannibal, il est vaincu près de l'Èbre par les frères Scipion." },
        { k: '211', t: 'Le haut Bétis', d: "Avec son frère Magon et Hasdrubal Giscon, il anéantit les armées romaines : Publius et Cnaeus Scipion sont tués." },
        { k: '211', t: 'La ruse', d: "Cerné par Claudius Néron, il feint de négocier son départ, gagne du temps et s'échappe de nuit avec son armée (Tite-Live, XXVI, 17)." },
        { k: '208', t: 'Baecula', d: "Battu par Scipion (le futur Africain), il sauve l'essentiel de son armée, son trésor et ses éléphants, et gagne la Gaule." },
        { k: '207', t: 'Les Alpes', d: "Au printemps, il franchit les Alpes plus vite que son frère, accueilli par les peuples alpins, puis assiège en vain Plaisance." },
        { k: '207', t: 'Le Métaure', d: "Ses messagers sont capturés ; Néron rejoint en secret l'autre consul, Livius Salinator. Pris au piège sur le Métaure, Hasdrubal charge et meurt au combat." }
      ],
      themesTitle: 'Tenir l\'Hispanie, rejoindre l\'Italie',
      themes: [
        { tone: 'tile--paper', k: '218–208', t: "Le maître de l'Ibérie", p: [
          "Tandis que l'histoire s'attache à Hannibal, Hasdrubal fut l'un des architectes de la survie carthaginoise. Gouvernant l'Ibérie pendant dix ans, il tint les mines d'argent et la main-d'œuvre qui alimentaient la machine de guerre punique.",
          "Face à la pression constante des légions des Scipions, il maintint les positions puniques, tint en respect les tribus ibères par la diplomatie et la force, et remporta en 211 la victoire du haut Bétis."
        ] },
        { tone: '', k: '208–207', t: 'La seconde traversée des Alpes', p: [
          "Imitant l'audace de son frère, il quitte l'Hispanie après Baecula, hiverne en Gaule et franchit les Alpes au printemps 207 — avec une aisance qui montre que l'exploit d'Hannibal n'était pas un coup de chance.",
          "Son itinéraire exact est inconnu ; Tite-Live souligne seulement qu'il trouva les passages ouverts et les montagnards pacifiés. Il assiège ensuite Plaisance, en vain, et perd un temps précieux."
        ] }
      ],
      feature: {
        k: 'Été 207 av. J.-C.',
        t: 'Le Métaure',
        p: [
          "Hasdrubal envoie à Hannibal, dans le sud de l'Italie, des cavaliers porteurs d'une lettre fixant leur jonction en Ombrie. Ils sont capturés. Le consul Claudius Néron laisse son camp face à Hannibal et remonte vers le nord à marches forcées avec 7 000 hommes d'élite pour rejoindre Livius Salinator.",
          "Entendant la trompette sonner deux fois dans le camp romain, Hasdrubal comprend que les deux consuls sont réunis. Il tente de se retirer de nuit, ses guides l'abandonnent et il est rattrapé sur les rives du Métaure. Voyant la bataille perdue, il se jette au cœur d'une cohorte romaine et meurt l'épée à la main.",
          "Néron fait jeter sa tête devant les avant-postes d'Hannibal. Ce geste de barbarie calculée visait à briser le moral du plus grand ennemi de Rome."
        ],
        alt: 'Quart de shekel barcide',
        cap: "Monnaie barcide d'Hispanie : l'argent qu'Hasdrubal emporta vers l'Italie après Baecula."
      },
      voices: [
        { q: "« Elle est tombée, tombée, toute l'espérance et la fortune de notre nom, depuis qu'Hasdrubal a péri. »", cite: "Hannibal, selon Horace, Odes, IV, 4" },
        { q: "À la vue de la tête de son frère, Hannibal aurait dit qu'il reconnaissait là le destin de Carthage.", cite: 'Tite-Live, Histoire romaine, XXVII, 51' },
        { q: "Tant qu'il y eut de l'espoir, il se ménagea pour ses soldats ; quand tout fut perdu, il chercha la mort au combat, digne de son père Hamilcar.", cite: "D'après Polybe, Histoires, XI, 2" }
      ],
      legacy: {
        t: 'La fin de l\'espoir',
        d: "Le Métaure est le tournant de la deuxième guerre punique : Hannibal, privé de renforts, se replie dans le Bruttium ; l'Hispanie tombera aux mains de Scipion l'année suivante. Hasdrubal Barca reste le frère sacrifié, celui dont la mort ferma la route de Rome."
      }
    },
    family: {
      title: 'La famille Barca',
      all: 'Tous les personnages',
      more: 'Lire la biographie',
      items: [
        { to: '/hamilcar', tone: 'tile--purple', k: 'Le père · ~275 – 229/228', t: 'Hamilcar Barca', d: "Invaincu en Sicile, vainqueur des Mercenaires, conquérant de l'Hispanie." },
        { to: '/hannibal', tone: 'tile--ink', k: 'Le frère aîné · 247 – 183', t: 'Hannibal Barca', d: 'Les Alpes, Trasimène, Cannes, puis Zama.' },
        { to: '/magon-barca', tone: 'tile--terra', k: 'Le cadet · ~243 – 203', t: 'Magon Barca', d: "L'embuscade de la Trébie, les anneaux de Cannes, la Ligurie." }
      ],
      links: [
        { to: '/tactiques', l: 'Les tactiques puniques' },
        { to: '/carte', l: 'La carte animée' }
      ]
    }
  },
  en: {
    metaTitle: 'Hasdrubal the Fair and Hasdrubal Barca — the two Barcid Hasdrubals',
    metaDesc: "Hasdrubal the Fair, Hamilcar's son-in-law, founder of Cartagena and signatory of the Ebro treaty (226), and Hasdrubal Barca, Hannibal's brother, who crossed the Alps and fell at the Metaurus (207).",
    chip: 'Biographies · The Barcids',
    title: 'Hasdrubal',
    lede: "Two Barcids bore this name, which means “Baal is my help” in Punic. Hamilcar's son-in-law built Punic Hispania; his son tried to join Hannibal in Italy. Two destinies, two violent deaths.",
    heroAlt: 'Barcid quarter shekel struck in Hispania',
    heroCap: 'Barcid coin from Hispania: laureate head (Melqart or a Barcid?) and elephant',
    who: {
      beau: { k: "Hamilcar's son-in-law · † 221", name: 'Hasdrubal the Fair', tab: 'Hasdrubal the Fair', d: "Hamilcar's successor in Hispania (229/228–221), founder of Cartagena, signatory of the Ebro treaty, assassinated in 221.", switchTo: 'Read the life of Hasdrubal Barca' },
      barca: { k: "Hamilcar's son · c. 245 – 207", name: 'Hasdrubal Barca', tab: 'Hasdrubal Barca', d: "Hannibal's younger brother: he held Hispania for ten years, crossed the Alps in turn and fell at the Metaurus in 207.", switchTo: 'Read the life of Hasdrubal the Fair' }
    },
    read: 'Read his life',
    note: 'Not to be confused with Hasdrubal Gisco, Scipio’s opponent in Hispania and Africa, or with Hasdrubal the Boetharch, the last defender of Carthage in 146.',
    segLabel: 'Choose a Hasdrubal',
    chronoKicker: 'Timeline',
    voicesTitle: 'What the ancients said',
    legacyKicker: 'Legacy',
    beau: {
      alt: 'Remains of the Punic wall of Cartagena',
      cap: 'The Punic wall of Cartagena, the “New City” founded by Hasdrubal.',
      chip: 'The builder',
      dates: '? – 221 BC',
      name: 'Hasdrubal the Fair',
      epithet: "Hamilcar's son-in-law, founder of Cartagena",
      lede: "Hamilcar's comrade in arms and son-in-law, in 229/228 he inherited a barely conquered Hispania. Where his father-in-law had imposed war, he ruled through alliances, marriage and the founding of a capital.",
      stats: [
        { n: 'c. 8 yrs', t: 'at the head of Punic Hispania (229/228 – 221)' },
        { n: 'c. 227', t: 'founding of Qart Hadasht, the future Cartagena' },
        { n: '226', t: 'the Ebro treaty with Rome' },
        { n: '26', t: "Hannibal's age when the army acclaimed him at Hasdrubal's death" }
      ],
      chronoTitle: 'The governor',
      rows: [
        { k: '237', t: 'With Hamilcar', d: 'He follows his father-in-law to Hispania, alongside the young Hannibal, and becomes his chief lieutenant.' },
        { k: '229/228', t: 'Succession', d: "When Hamilcar dies before Helice, the army acclaims Hasdrubal as its leader and Carthage confirms him. He avenges Hamilcar on the Orissi and takes their towns." },
        { k: 'c. 227', t: 'Qart Hadasht', d: 'On an exceptional harbour site he founds the “New City”, Cartagena, capital of Barcid Hispania, close to the silver mines.' },
        { k: '226', t: 'The Ebro treaty', d: 'A worried Rome sends an embassy: Hasdrubal undertakes not to cross the Ebro in arms. The south of the peninsula is in effect recognised as a Punic sphere.' },
        { k: '221', t: 'Assassination', d: 'He is killed in his residence by a Celt (a slave, according to Livy) avenging a master he had put to death. The army acclaims Hannibal.' }
      ],
      themesTitle: 'Governing Hispania',
      themes: [
        { tone: 'tile--paper', k: 'Diplomacy', t: 'The policy of alliances', p: [
          'According to Livy, Hasdrubal extended Carthaginian power “more by the hospitality of kings and the friendship of chiefs than by war”. Diodorus reports that he married the daughter of an Iberian king and that the Iberian peoples proclaimed him supreme general.',
          'This approach consolidated Hamilcar’s conquest: networks of clients, hostages, garrisons and tribute turned the south of the peninsula into a true Barcid state.'
        ] },
        { tone: '', k: 'The capital', t: 'Qart Hadasht, the “New City”', p: [
          'The same name as Carthage itself: Qart Hadasht. The city stands on a peninsula closed by a lagoon, with one of the best harbours in the western Mediterranean. Polybius describes it in detail and mentions the hill on which Hasdrubal’s palace stood.',
          'Arsenal, treasury, mint and naval base, it became the base from which Hannibal set out in 218 — and the target Scipio would take in 209.'
        ] }
      ],
      feature: {
        k: '226 BC',
        t: 'The Ebro treaty',
        p: [
          'Worried by the Gallic threat in northern Italy, Rome settled for a single undertaking: the Carthaginians would not cross the Ebro in arms. For Polybius, that was the whole content of the treaty.',
          'Saguntum, south of the river and allied to Rome, is not mentioned according to Polybius; Livy claims instead that it was protected. This ambiguity would serve as a pretext for the Second Punic War when Hannibal besieged Saguntum in 219.'
        ],
        alt: 'Roman theatre of Cartagena',
        cap: 'The Roman theatre of Cartagena: Hasdrubal’s city has remained one of the great ports of Spain.'
      },
      voices: [
        { q: '“He had increased Carthaginian power more by the hospitality of kings and by winning chiefs to his friendship than by war and arms.”', cite: 'Livy, History of Rome, XXI, 2' },
        { q: '“The Carthaginians shall not cross the Ebro in arms.”', cite: 'Clause of the 226 treaty, after Polybius, Histories, II, 13' },
        { q: 'Seized and tortured, the murderer kept such an expression that he seemed to smile, triumphing over the pain.', cite: 'Livy, History of Rome, XXI, 2' }
      ],
      legacy: {
        t: 'The builder of the base',
        d: "Without Cartagena, its silver and its Iberian alliances, Hannibal's march on Italy would not have been possible. Hasdrubal the Fair turned a military conquest into a state — and his city, Cartagena, still bears the name of Carthage."
      }
    },
    barca: {
      alt: 'Lake Trasimene',
      cap: 'Lake Trasimene, where Hannibal triumphed in 217: the Italy his brother would never reach.',
      chip: 'The forgotten sacrifice',
      dates: 'c. 245 – 207 BC',
      name: 'Hasdrubal Barca',
      epithet: 'The brother who crossed the Alps to join Hannibal',
      lede: 'A strategist of iron will, he held the Iberian front for a decade while his brother shook Italy. Then he retraced the Alpine road to bring him victory — and never arrived.',
      stats: [
        { n: '10 yrs', t: 'of war in Hispania (218 – 208) against the Scipios' },
        { n: '2nd', t: 'Carthaginian army to cross the Alps, in 207' },
        { n: '7,000', t: 'picked troops brought by forced marches by the consul Nero' },
        { n: '10,000', t: 'Carthaginians and allies killed at the Metaurus according to Polybius (56,000 according to Livy)' }
      ],
      chronoTitle: "Hannibal's brother",
      rows: [
        { k: 'c. 245', t: 'Birth', d: 'Second son of Hamilcar Barca, raised like his brothers in the camps of Hispania.' },
        { k: '218', t: 'Guardian of Hispania', d: 'Hannibal leaves for Italy and entrusts Hispania to him: a fleet and about 12,650 infantry, 2,550 cavalry and 21 elephants (Polybius, III, 33).' },
        { k: '217', t: 'The mouth of the Ebro', d: 'His fleet is beaten by Gnaeus Scipio.' },
        { k: '215', t: 'Dertosa', d: 'As he prepares to join Hannibal, he is defeated near the Ebro by the Scipio brothers.' },
        { k: '211', t: 'The upper Baetis', d: 'With his brother Mago and Hasdrubal Gisco, he destroys the Roman armies: Publius and Gnaeus Scipio are killed.' },
        { k: '211', t: 'The ruse', d: 'Hemmed in by Claudius Nero, he pretends to negotiate his withdrawal, gains time and slips away by night with his army (Livy, XXVI, 17).' },
        { k: '208', t: 'Baecula', d: 'Beaten by Scipio (the future Africanus), he saves most of his army, his treasury and his elephants, and makes for Gaul.' },
        { k: '207', t: 'The Alps', d: 'In spring he crosses the Alps faster than his brother, welcomed by the Alpine peoples, then besieges Placentia in vain.' },
        { k: '207', t: 'The Metaurus', d: 'His messengers are captured; Nero secretly joins the other consul, Livius Salinator. Trapped on the Metaurus, Hasdrubal charges and dies fighting.' }
      ],
      themesTitle: 'Holding Hispania, reaching Italy',
      themes: [
        { tone: 'tile--paper', k: '218–208', t: 'Master of Iberia', p: [
          'While history focuses on Hannibal, Hasdrubal was one of the architects of Carthaginian survival. Governing Iberia for ten years, he held the silver mines and the manpower that fed the Punic war machine.',
          "Under constant pressure from the Scipios' legions, he held the Punic positions, kept the Iberian tribes in line through diplomacy and force, and won the victory of the upper Baetis in 211."
        ] },
        { tone: '', k: '208–207', t: 'The second crossing of the Alps', p: [
          "Emulating his brother's daring, he left Hispania after Baecula, wintered in Gaul and crossed the Alps in the spring of 207 — with an ease that showed Hannibal's feat had been no stroke of luck.",
          'His exact route is unknown; Livy only stresses that he found the passes open and the mountain peoples pacified. He then besieged Placentia, in vain, and lost precious time.'
        ] }
      ],
      feature: {
        k: 'Summer 207 BC',
        t: 'The Metaurus',
        p: [
          'Hasdrubal sends horsemen to Hannibal in southern Italy with a letter setting their meeting point in Umbria. They are captured. The consul Claudius Nero leaves his camp facing Hannibal and marches north at speed with 7,000 picked men to join Livius Salinator.',
          'Hearing the trumpet sound twice in the Roman camp, Hasdrubal realises that both consuls are together. He tries to withdraw by night, his guides desert him and he is caught on the banks of the Metaurus. Seeing the battle lost, he hurls himself into a Roman cohort and dies sword in hand.',
          "Nero has his head thrown before Hannibal's outposts. This act of calculated barbarity was meant to break the morale of Rome's greatest enemy."
        ],
        alt: 'Barcid quarter shekel',
        cap: 'Barcid coin from Hispania: the silver Hasdrubal carried towards Italy after Baecula.'
      },
      voices: [
        { q: '“Fallen, fallen is all the hope and fortune of our name, now that Hasdrubal is slain.”', cite: 'Hannibal, according to Horace, Odes, IV, 4' },
        { q: "On seeing his brother's head, Hannibal is said to have declared that he recognised in it the fate of Carthage.", cite: 'Livy, History of Rome, XXVII, 51' },
        { q: 'As long as there was hope, he spared himself for his soldiers; when all was lost, he sought death in battle, worthy of his father Hamilcar.', cite: 'After Polybius, Histories, XI, 2' }
      ],
      legacy: {
        t: 'The end of hope',
        d: "The Metaurus is the turning point of the Second Punic War: Hannibal, deprived of reinforcements, falls back on Bruttium; Hispania falls to Scipio the following year. Hasdrubal Barca remains the sacrificed brother, whose death closed the road to Rome."
      }
    },
    family: {
      title: 'The Barca family',
      all: 'All people',
      more: 'Read the biography',
      items: [
        { to: '/hamilcar', tone: 'tile--purple', k: 'The father · c. 275 – 229/228', t: 'Hamilcar Barca', d: 'Undefeated in Sicily, victor over the mercenaries, conqueror of Hispania.' },
        { to: '/hannibal', tone: 'tile--ink', k: 'The elder brother · 247 – 183', t: 'Hannibal Barca', d: 'The Alps, Trasimene, Cannae, then Zama.' },
        { to: '/magon-barca', tone: 'tile--terra', k: 'The youngest · c. 243 – 203', t: 'Mago Barca', d: 'The ambush at the Trebia, the rings of Cannae, Liguria.' }
      ],
      links: [
        { to: '/tactiques', l: 'Punic tactics' },
        { to: '/carte', l: 'The animated map' }
      ]
    }
  },
  ar: {
    metaTitle: 'صدربعل الجميل وصدربعل برقا — الصدربعلان من آل برقا',
    metaDesc: 'صدربعل الجميل، صهر حملقار ومؤسس قرطاجنة وموقّع معاهدة إيبرو (226)، وصدربعل برقا، أخو حنبعل الذي عبر الألب وسقط عند الميتاورو (207).',
    chip: 'سِيَر · آل برقا',
    title: 'صدربعل',
    lede: 'حمل هذا الاسم، ومعناه بالبونيقية «بعل عوني»، اثنان من آل برقا. بنى صهر حملقار هسبانيا البونيقية، وحاول ابنه اللحاق بحنبعل في إيطاليا. مصيران وميتتان عنيفتان.',
    heroAlt: 'ربع شيقل برقي سُكّ في هسبانيا',
    heroCap: 'نقد برقي من هسبانيا: رأس مكلّل (ملقارت أم أحد آل برقا؟) وفيل',
    who: {
      beau: { k: 'صهر حملقار · † 221', name: 'صدربعل الجميل', tab: 'صدربعل الجميل', d: 'خليفة حملقار في هسبانيا (229/228–221)، مؤسس قرطاجنة وموقّع معاهدة إيبرو، اغتيل سنة 221.', switchTo: 'اقرأ سيرة صدربعل برقا' },
      barca: { k: 'ابن حملقار · نحو 245 – 207', name: 'صدربعل برقا', tab: 'صدربعل برقا', d: 'الأخ الأصغر لحنبعل: صمد في هسبانيا عشر سنوات، ثم عبر الألب بدوره وسقط عند الميتاورو سنة 207.', switchTo: 'اقرأ سيرة صدربعل الجميل' }
    },
    read: 'اقرأ سيرته',
    note: 'لا يُخلط بينهما وبين صدربعل بن جيسكون، خصم سكيبيو في هسبانيا وإفريقيا، ولا صدربعل البويثارخ، آخر المدافعين عن قرطاج سنة 146.',
    segLabel: 'اختر صدربعل',
    chronoKicker: 'التسلسل الزمني',
    voicesTitle: 'ما قاله القدماء',
    legacyKicker: 'الإرث',
    beau: {
      alt: 'بقايا السور البونيقي في قرطاجنة',
      cap: 'السور البونيقي في قرطاجنة، «المدينة الجديدة» التي أسسها صدربعل.',
      chip: 'الباني',
      dates: '؟ – 221 ق.م',
      name: 'صدربعل الجميل',
      epithet: 'صهر حملقار ومؤسس قرطاجنة',
      lede: 'رفيق سلاح حملقار وصهره، ورث سنة 229/228 هسبانيا حديثة الفتح. وحيث فرض حموه الحرب، حكم هو بالتحالفات والمصاهرة وتأسيس عاصمة.',
      stats: [
        { n: 'نحو 8', t: 'سنوات على رأس هسبانيا البونيقية (229/228 – 221)' },
        { n: 'نحو 227', t: 'تأسيس قرت حدشت، قرطاجنة لاحقًا' },
        { n: '226', t: 'معاهدة إيبرو مع روما' },
        { n: '26', t: 'سنّ حنبعل حين نادى به الجيش قائدًا بعد مقتله' }
      ],
      chronoTitle: 'الحاكم',
      rows: [
        { k: '237', t: 'مع حملقار', d: 'رافق حماه إلى هسبانيا إلى جانب حنبعل الصغير، وصار نائبه الأول.' },
        { k: '229/228', t: 'الخلافة', d: 'بعد موت حملقار أمام هيليكي نادى به الجيش قائدًا وأقرّته قرطاج. فانتقم لحملقار من الأوريسيين وأخضع مدنهم.' },
        { k: 'نحو 227', t: 'قرت حدشت', d: 'أسس على موقع مرفئي استثنائي «المدينة الجديدة»، قرطاجنة، عاصمة هسبانيا البرقية، قرب مناجم الفضة.' },
        { k: '226', t: 'معاهدة إيبرو', d: 'أرسلت روما القلقة سفارة، فتعهّد صدربعل بألّا يعبر نهر إيبرو مسلحًا. وبذلك اعتُرف عمليًا بجنوب شبه الجزيرة منطقةَ نفوذ بونيقية.' },
        { k: '221', t: 'الاغتيال', d: 'قُتل في مقرّه على يد كلتي (عبد حسب تيتوس ليفيوس) ثأرًا لسيّد أعدمه. ونادى الجيش بحنبعل قائدًا.' }
      ],
      themesTitle: 'حكم هسبانيا',
      themes: [
        { tone: 'tile--paper', k: 'الدبلوماسية', t: 'سياسة التحالفات', p: [
          'يقول تيتوس ليفيوس إن صدربعل وسّع سلطان قرطاج «بضيافة الملوك وصداقة الزعماء أكثر مما وسّعه بالحرب». ويروي ديودور أنه تزوج ابنة ملك إيبيري وأن الشعوب الإيبيرية نادت به قائدًا أعلى.',
          'رسّخت هذه الطريقة فتوحات حملقار: شبكات الموالين والرهائن والحاميات والجزية جعلت جنوب شبه الجزيرة دولة برقية حقيقية.'
        ] },
        { tone: '', k: 'العاصمة', t: 'قرت حدشت، «المدينة الجديدة»', p: [
          'الاسم نفسه الذي تحمله قرطاج: قرت حدشت. تقوم المدينة على شبه جزيرة تغلقها بحيرة، ولها أحد أفضل موانئ غرب المتوسط. ويصفها بوليبيوس بالتفصيل ويذكر التلّ الذي قام عليه قصر صدربعل.',
          'ترسانة وخزينة ودار سكّ وقاعدة بحرية، صارت المنطلق الذي خرج منه حنبعل سنة 218 — والهدف الذي سيستولي عليه سكيبيو سنة 209.'
        ] }
      ],
      feature: {
        k: '226 ق.م',
        t: 'معاهدة إيبرو',
        p: [
          'انشغلت روما بالخطر الغالي في شمال إيطاليا فاكتفت بتعهّد واحد: ألّا يعبر القرطاجيون نهر إيبرو مسلحين. وهذا عند بوليبيوس كل مضمون المعاهدة.',
          'أما ساغونتوم، الواقعة جنوب النهر والمتحالفة مع روما، فلا ذكر لها حسب بوليبيوس، بينما يؤكد تيتوس ليفيوس أنها كانت مشمولة بالحماية. وسيصبح هذا الغموض ذريعة للحرب البونيقية الثانية حين يحاصر حنبعل ساغونتوم سنة 219.'
        ],
        alt: 'المسرح الروماني في قرطاجنة',
        cap: 'المسرح الروماني في قرطاجنة: بقيت مدينة صدربعل من كبرى موانئ إسبانيا.'
      },
      voices: [
        { q: '«وسّع سلطان قرطاج بضيافة الملوك وكسب صداقة الزعماء أكثر مما وسّعه بالحرب والسلاح.»', cite: 'تيتوس ليفيوس، تاريخ روما، 21، 2' },
        { q: '«لا يعبر القرطاجيون نهر إيبرو مسلحين.»', cite: 'بند معاهدة 226، عن بوليبيوس، التواريخ، 2، 13' },
        { q: 'قُبض على القاتل وعُذّب، فظلّ وجهه على هيئة من يبتسم، كأنه ينتصر على الألم.', cite: 'تيتوس ليفيوس، تاريخ روما، 21، 2' }
      ],
      legacy: {
        t: 'باني القاعدة',
        d: 'لولا قرطاجنة وفضتها وتحالفاتها الإيبيرية لما أمكن زحف حنبعل على إيطاليا. حوّل صدربعل الجميل فتحًا عسكريًا إلى دولة — ولا تزال مدينته، قرطاجنة، تحمل اسم قرطاج.'
      }
    },
    barca: {
      alt: 'بحيرة ترازيمينو',
      cap: 'بحيرة ترازيمينو حيث انتصر حنبعل سنة 217: إيطاليا التي لن يبلغها أخوه أبدًا.',
      chip: 'التضحية المنسية',
      dates: 'نحو 245 – 207 ق.م',
      name: 'صدربعل برقا',
      epithet: 'الأخ الذي عبر جبال الألب للانضمام إلى حنبعل',
      lede: 'استراتيجي ذو إرادة حديدية، صمد على الجبهة الإيبيرية عقدًا كاملًا بينما كان أخوه يهزّ إيطاليا. ثم سلك طريق الألب ليحمل إليه النصر — ولم يصل أبدًا.',
      stats: [
        { n: '10 سنوات', t: 'من الحرب في هسبانيا (218 – 208) ضد آل سكيبيو' },
        { n: 'الثاني', t: 'جيش قرطاجي يعبر الألب، سنة 207' },
        { n: '7000', t: 'جندي من النخبة جاء بهم القنصل نيرون بمسيرات سريعة' },
        { n: '10٬000', t: 'قتيل قرطاجي وحليف عند الميتاورو حسب بوليبيوس (56٬000 حسب تيتوس ليفيوس)' }
      ],
      chronoTitle: 'أخو حنبعل',
      rows: [
        { k: 'نحو 245', t: 'المولد', d: 'الابن الثاني لحملقار برقا، نشأ كأخويه في معسكرات هسبانيا.' },
        { k: '218', t: 'حارس هسبانيا', d: 'رحل حنبعل إلى إيطاليا وأوكل إليه هسبانيا: أسطولًا ونحو 12٬650 راجلًا و2550 فارسًا و21 فيلًا (بوليبيوس، 3، 33).' },
        { k: '217', t: 'مصبّ إيبرو', d: 'هزم غنايوس سكيبيو أسطوله.' },
        { k: '215', t: 'ديرتوسا', d: 'وبينما كان يستعدّ للّحاق بحنبعل، هزمه الأخوان سكيبيو قرب نهر إيبرو.' },
        { k: '211', t: 'أعالي البيتيس', d: 'مع أخيه ماغون وصدربعل بن جيسكون أباد الجيوش الرومانية: قُتل بوبليوس وغنايوس سكيبيو.' },
        { k: '211', t: 'الحيلة', d: 'حاصره كلاوديوس نيرون، فتظاهر بالتفاوض على انسحابه وكسب الوقت ثم تسلّل ليلًا بجيشه (تيتوس ليفيوس، 26، 17).' },
        { k: '208', t: 'بايكولا', d: 'هزمه سكيبيو (الإفريقي لاحقًا)، فأنقذ معظم جيشه وخزينته وفيلته واتجه إلى بلاد الغال.' },
        { k: '207', t: 'الألب', d: 'عبر الألب في الربيع أسرع من أخيه، مستقبَلًا من شعوب الجبال، ثم حاصر بلاسينتيا دون جدوى.' },
        { k: '207', t: 'الميتاورو', d: 'أُسر رسله، والتحق نيرون سرًّا بالقنصل الآخر ليفيوس ساليناتور. وحوصر صدربعل عند نهر الميتاورو فاقتحم الصفوف ومات مقاتلًا.' }
      ],
      themesTitle: 'الصمود في هسبانيا، والطريق إلى إيطاليا',
      themes: [
        { tone: 'tile--paper', k: '218–208', t: 'سيد إيبيريا', p: [
          'بينما يتركز التاريخ على حنبعل، كان صدربعل من مهندسي بقاء قرطاج. حكم إيبيريا عشر سنوات، وحافظ على مناجم الفضة والقوى البشرية التي غذّت آلة الحرب البونيقية.',
          'وأمام ضغط فيالق آل سكيبيو المستمر حافظ على المواقع البونيقية، وضبط القبائل الإيبيرية بالدبلوماسية والقوة، وانتصر في أعالي البيتيس سنة 211.'
        ] },
        { tone: '', k: '208–207', t: 'العبور الثاني للألب', p: [
          'محاكيًا جرأة أخيه، غادر هسبانيا بعد بايكولا وقضى الشتاء في بلاد الغال، ثم عبر الألب في ربيع 207 — بسهولة أثبتت أن إنجاز حنبعل لم يكن ضربة حظ.',
          'طريقه بالضبط مجهول؛ ويكتفي تيتوس ليفيوس بالقول إنه وجد الممرات مفتوحة وأهل الجبال مسالمين. ثم حاصر بلاسينتيا دون جدوى وأضاع وقتًا ثمينًا.'
        ] }
      ],
      feature: {
        k: 'صيف 207 ق.م',
        t: 'الميتاورو',
        p: [
          'أرسل صدربعل إلى حنبعل في جنوب إيطاليا فرسانًا يحملون رسالة تحدد مكان التقائهما في أومبريا، فوقعوا في الأسر. وترك القنصل كلاوديوس نيرون معسكره قبالة حنبعل وزحف شمالًا بمسيرات سريعة مع 7000 رجل من النخبة ليلتحق بليفيوس ساليناتور.',
          'سمع صدربعل البوق يُنفخ مرتين في المعسكر الروماني فأدرك أن القنصلين اجتمعا. حاول الانسحاب ليلًا، فتخلّى عنه أدلّاؤه ولُحق به على ضفاف الميتاورو. ولما رأى المعركة خاسرة اندفع إلى قلب فوج روماني ومات والسيف في يده.',
          'أمر نيرون بإلقاء رأسه أمام مخافر حنبعل. عمل وحشي محسوب أُريد به تحطيم معنويات أعظم أعداء روما.'
        ],
        alt: 'ربع شيقل برقي',
        cap: 'نقد برقي من هسبانيا: الفضة التي حملها صدربعل نحو إيطاليا بعد بايكولا.'
      },
      voices: [
        { q: '«سقط، سقط كل الأمل وكل حظّ اسمنا، منذ أن هلك صدربعل.»', cite: 'حنبعل، على لسان هوراس، الأناشيد، 4، 4' },
        { q: 'يُروى أن حنبعل قال حين رأى رأس أخيه إنه يرى فيه مصير قرطاج.', cite: 'تيتوس ليفيوس، تاريخ روما، 27، 51' },
        { q: 'ما دام هناك أمل صان نفسه من أجل جنوده، فلما ضاع كل شيء طلب الموت في المعركة، جديرًا بأبيه حملقار.', cite: 'عن بوليبيوس، التواريخ، 11، 2' }
      ],
      legacy: {
        t: 'نهاية الأمل',
        d: 'كانت الميتاورو منعطف الحرب البونيقية الثانية: تراجع حنبعل، المحروم من الإمدادات، إلى بروتيوم، وسقطت هسبانيا في يد سكيبيو في السنة التالية. ويبقى صدربعل برقا الأخ المضحّى به، الذي أغلق موته طريق روما.'
      }
    },
    family: {
      title: 'أسرة برقا',
      all: 'كل الشخصيات',
      more: 'اقرأ السيرة',
      items: [
        { to: '/hamilcar', tone: 'tile--purple', k: 'الأب · نحو 275 – 229/228', t: 'حملقار برقا', d: 'لم يُهزم في صقلية، وانتصر على المرتزقة، وفتح هسبانيا.' },
        { to: '/hannibal', tone: 'tile--ink', k: 'الأخ الأكبر · 247 – 183', t: 'حنبعل برقا', d: 'الألب، ترازيمينو، كاناي، ثم زاما.' },
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
.coin-hero { background: var(--white); }
.coin-hero > img { object-fit: contain; padding: 32px 32px 80px; }

.who { min-height: 260px; }
.who-name { margin-bottom: 14px; }
.who-btn { align-self: flex-start; background: rgba(255, 255, 255, 0.14); color: var(--white); }
.who-btn:hover { background: var(--white); color: var(--ink); }

.note {
  padding: 14px var(--gutter) 0;
  font: 500 14px/1.5 var(--font-body);
  color: var(--muted);
  max-width: 900px;
}

.switch {
  padding: var(--section) var(--gutter) var(--gap);
  display: flex;
  justify-content: center;
  scroll-margin-top: 80px;
}

.switch .seg { box-shadow: 0 2px 12px rgba(22, 19, 15, 0.06); }

.intro-fig { min-height: clamp(300px, 34vw, 460px); background: var(--stone); }
.fig-title { font-size: clamp(40px, 5vw, 76px); }
.epithet { font: 600 clamp(16px, 1.4vw, 20px)/1.35 var(--font-body); margin-top: 14px; }
.tile--purple .epithet { color: var(--purple-tint); }
.tile--navy .epithet { color: var(--navy-tint); }

.stats { margin-top: var(--gap); }
.num.n-accent { color: var(--terra); }
.stat-t { font: 500 15px/1.45 var(--font-body); margin-top: 10px; }

.block-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.rows .val strong { color: var(--white); font-weight: 700; }
.tile--ink .rows .val { color: var(--on-dark-2); }
.tile--ink .rows .key { color: var(--gold-light); }

.themes .h-card { margin-bottom: 14px; }
.para + .para { margin-top: 14px; }

.feature-fig { min-height: clamp(300px, 34vw, 480px); background: var(--ink); }
.feature-fig--coin { background: var(--white); }
.feature-fig--coin > img { object-fit: contain; padding: 28px 28px 110px; }

.quote { margin: 0; }
.quote p { font: 500 clamp(17px, 1.5vw, 21px)/1.5 var(--font-display); color: var(--ink) !important; font-style: italic; }
.quote-tile { margin: 0; display: flex; flex-direction: column; justify-content: space-between; gap: 18px; }
.quote-tile cite { display: block; font: 600 13px/1.4 var(--font-body); font-style: normal; color: var(--purple); }

.legacy .body-lg { max-width: 820px; }
.legacy-btn { margin-top: 24px; }

.fam { min-height: 220px; }
.more { font: 600 14px/1 var(--font-body); opacity: 0.85; }
.tile--purple .more, .tile--ink .more, .tile--terra .more { color: var(--gold-light); }
.links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: var(--gap); }

@media (max-width: 640px) {
  .coin-hero > img { padding: 20px 20px 72px; }
  .who { min-height: 0; }
  .switch .seg { width: 100%; }
  .switch .seg button { flex: 1 1 0; padding-inline: 10px; white-space: normal; line-height: 1.2; }
  .links .btn { flex: 1 1 100%; justify-content: center; }
  .legacy-btn { width: 100%; justify-content: center; white-space: normal; text-align: center; }
}
</style>
