<template>
  <div class="pg">
    <!-- Héros -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--purple tile--stack tile--hero s-5">
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display hero-title">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
        <div class="chips">
          <span v-for="t in c.hero.tags" :key="t" class="chip chip--glass">{{ t }}</span>
        </div>
      </div>
      <figure class="fig fig--hero s-7" style="background:#6B5A3E">
        <img src="/img/turner-dido.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Chiffres-clés -->
    <div class="cols cols-4 keep-2">
      <div v-for="(k, i) in c.keys" :key="k.n" class="tile keyfig" :class="keyTones[i]">
        <span class="kicker">{{ k.k }}</span>
        <div class="num">{{ k.n }}</div>
        <p class="body small">{{ k.t }}</p>
      </div>
    </div>

    <!-- Filtre par domaine -->
    <section class="sec sec--wide filter-sec">
      <span class="kicker">{{ c.filter.kicker }}</span>
      <div class="pill-row" role="group" :aria-label="c.filter.label">
        <button
          v-for="d in domains"
          :key="d.key"
          type="button"
          class="pill-btn"
          :class="{ on: filter === d.key }"
          :aria-pressed="filter === d.key"
          @click="filter = d.key"
        >{{ d.label }}</button>
      </div>
      <p class="sr-only" aria-live="polite">{{ c.filter.live(visibleCount) }}</p>
    </section>

    <!-- 01 · Littérature -->
    <template v-if="show('lit')">
      <section id="litterature" class="sec sec--wide">
        <div class="sec-head">
          <div>
            <span class="kicker">{{ c.lit.kicker }}</span>
            <h2 class="h-section">{{ c.lit.title }}</h2>
          </div>
          <p>{{ c.lit.aside }}</p>
        </div>
      </section>
      <div class="cols cols-7-5">
        <div class="tile tile--xl tile--ink">
          <h3 class="h-block blk-h">{{ c.lit.frise.title }}</h3>
          <div class="rows" style="--row-key:130px">
            <div v-for="(r, i) in c.lit.frise.rows" :key="i">
              <span class="key">{{ r.key }}</span>
              <span class="val">
                <b>{{ r.title }}</b> — {{ r.text }}
                <NuxtLink v-if="r.to" :to="localePath(r.to)" class="row-link">{{ r.link }} →</NuxtLink>
              </span>
            </div>
          </div>
        </div>
        <figure class="fig tall-fig" style="background:#5E4A3A">
          <img src="/img/guerin-dido.jpg" :alt="c.lit.figAlt" loading="lazy">
          <figcaption class="cap-box">{{ c.lit.figCap }}</figcaption>
        </figure>
      </div>

      <div class="cols cols-3 gap-top">
        <div v-for="t in c.lit.tiles" :key="t.title" class="tile tile--xl tile--stack feat" :class="t.tone">
          <div>
            <span class="kicker">{{ t.kicker }}</span>
            <h3 class="h-card">{{ t.title }}</h3>
            <p class="body">{{ t.text }}</p>
          </div>
          <NuxtLink :to="localePath(t.to)" class="btn btn-outline">{{ t.cta }} →</NuxtLink>
        </div>
      </div>

      <div class="cols cols-5-7 gap-top">
        <figure class="fig tall-fig" style="background:#2F3E5C">
          <img src="/img/rochegrosse-salammbo.jpg" :alt="c.lit.flaubert.alt" loading="lazy" style="object-position:50% 20%">
          <figcaption class="cap-box">{{ c.lit.flaubert.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--terra tile--stack">
          <div>
            <span class="kicker">{{ c.lit.flaubert.kicker }}</span>
            <h3 class="h-block blk-h">{{ c.lit.flaubert.title }}</h3>
            <p v-for="p in c.lit.flaubert.paras" :key="p" class="body-lg para">{{ p }}</p>
            <blockquote class="incipit">
              <p lang="fr" dir="ltr">« {{ c.lit.flaubert.quote }} »</p>
              <p v-if="c.lit.flaubert.quoteTr" class="incipit-tr">{{ c.lit.flaubert.quoteTr }}</p>
              <footer>{{ c.lit.flaubert.quoteCite }}</footer>
            </blockquote>
          </div>
          <NuxtLink :to="localePath('/guerre-des-mercenaires')" class="btn btn-outline">{{ c.lit.flaubert.cta }} →</NuxtLink>
        </div>
      </div>
    </template>

    <!-- 02 · Opéra & théâtre -->
    <template v-if="show('scene')">
      <section id="opera" class="sec sec--wide">
        <div class="sec-head">
          <div>
            <span class="kicker">{{ c.scene.kicker }}</span>
            <h2 class="h-section">{{ c.scene.title }}</h2>
          </div>
          <p>{{ c.scene.aside }}</p>
        </div>
      </section>
      <div class="cols cols-7-5">
        <div class="tile tile--xl tile--navy">
          <h3 class="h-block blk-h">{{ c.scene.frise.title }}</h3>
          <div class="rows rows--light" style="--row-key:130px">
            <div v-for="(r, i) in c.scene.frise.rows" :key="i">
              <span class="key">{{ r.key }}</span>
              <span class="val light-val">
                <b>{{ r.title }}</b> — {{ r.text }}
                <NuxtLink v-if="r.to" :to="localePath(r.to)" class="row-link">{{ r.link }} →</NuxtLink>
              </span>
            </div>
          </div>
        </div>
        <div class="stack">
          <figure class="tile tile--xl tile--paper tile--outline quote">
            <span class="kicker">{{ c.scene.quote.kicker }}</span>
            <blockquote>
              <p class="q-orig" lang="en" dir="ltr">{{ c.scene.quote.orig }}</p>
              <p class="q-tr">{{ c.scene.quote.tr }}</p>
            </blockquote>
            <figcaption class="q-cite">{{ c.scene.quote.cite }}</figcaption>
          </figure>
          <div class="tile tile--xl tile--terra tile--stack grow">
            <div>
              <span class="kicker">{{ c.scene.berlioz.kicker }}</span>
              <h3 class="h-card">{{ c.scene.berlioz.title }}</h3>
              <p class="body">{{ c.scene.berlioz.text }}</p>
            </div>
            <p class="lat" lang="la" dir="ltr">{{ c.scene.berlioz.lat }}</p>
          </div>
        </div>
      </div>
    </template>

    <!-- 03 · Peinture -->
    <template v-if="show('art')">
      <section id="peinture" class="sec sec--wide">
        <div class="sec-head">
          <div>
            <span class="kicker">{{ c.art.kicker }}</span>
            <h2 class="h-section">{{ c.art.title }}</h2>
          </div>
          <p>{{ c.art.aside }}</p>
        </div>
      </section>
      <div class="cols cols-5-7">
        <figure class="fig tiepolo-fig" style="background:#4A3A2C">
          <img src="/img/tiepolo-hannibal-hasdrubal.jpg" :alt="c.art.feat.alt" loading="lazy" style="object-position:50% 35%">
          <figcaption class="cap-box">{{ c.art.feat.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--ink tile--stack">
          <div>
            <span class="kicker">{{ c.art.feat.kicker }}</span>
            <h3 class="h-block blk-h">{{ c.art.feat.title }}</h3>
            <p v-for="p in c.art.feat.paras" :key="p" class="body-lg para">{{ p }}</p>
          </div>
          <blockquote class="livy">
            <p class="lat" lang="la" dir="ltr">{{ c.art.feat.lat }}</p>
            <p class="body">{{ c.art.feat.latTr }}</p>
          </blockquote>
        </div>
      </div>
      <div class="cols cols-3 gap-top">
        <article v-for="p in c.art.items" :key="p.title" class="card-img">
          <img :src="p.img" :alt="p.alt" loading="lazy" :style="p.pos ? { objectPosition: p.pos } : null">
          <div class="card-body">
            <span class="kicker">{{ p.kicker }}</span>
            <h3 class="h-card">{{ p.title }}</h3>
            <p>{{ p.text }}</p>
          </div>
        </article>
        <div class="tile tile--xl tile--gold tile--stack">
          <div>
            <span class="kicker">{{ c.art.also.kicker }}</span>
            <h3 class="h-card">{{ c.art.also.title }}</h3>
            <ul class="also">
              <li v-for="a in c.art.also.items" :key="a" class="body">{{ a }}</li>
            </ul>
          </div>
        </div>
      </div>
    </template>

    <!-- 04 · Cinéma -->
    <template v-if="show('cine')">
      <section id="cinema" class="sec sec--wide">
        <div class="sec-head">
          <div>
            <span class="kicker">{{ c.cine.kicker }}</span>
            <h2 class="h-section">{{ c.cine.title }}</h2>
          </div>
          <p>{{ c.cine.aside }}</p>
        </div>
      </section>
      <div class="cols cols-5-7">
        <figure class="fig poster-fig" style="background:#16130F">
          <img src="/img/affiche-cabiria-1914.jpg" :alt="c.cine.cabiria.alt" loading="lazy" style="object-position:50% 30%">
          <figcaption class="cap-box">{{ c.cine.cabiria.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--terra tile--stack">
          <div>
            <span class="kicker">{{ c.cine.cabiria.kicker }}</span>
            <h3 class="h-block blk-h">{{ c.cine.cabiria.title }}</h3>
            <p v-for="p in c.cine.cabiria.paras" :key="p" class="body-lg para">{{ p }}</p>
            <div class="rows rows--light facts" style="--row-key:140px">
              <div v-for="r in c.cine.cabiria.facts" :key="r.k">
                <span class="key fact-key">{{ r.k }}</span>
                <span class="val light-val">{{ r.v }}</span>
              </div>
            </div>
          </div>
          <NuxtLink :to="localePath('/religion')" class="btn btn-outline">{{ c.cine.cabiria.cta }} →</NuxtLink>
        </div>
      </div>
      <div class="cols cols-7-5 gap-top">
        <div class="tile tile--xl tile--ink">
          <h3 class="h-block blk-h">{{ c.cine.frise.title }}</h3>
          <div class="rows" style="--row-key:110px">
            <div v-for="(r, i) in c.cine.frise.rows" :key="i">
              <span class="key">{{ r.key }}</span>
              <span class="val">
                <b>{{ r.title }}</b> — {{ r.text }}
                <NuxtLink v-if="r.to" :to="localePath(r.to)" class="row-link">{{ r.link }} →</NuxtLink>
              </span>
            </div>
          </div>
        </div>
        <div class="tile tile--xl tile--sand tile--stack">
          <div>
            <span class="kicker">{{ c.cine.doc.kicker }}</span>
            <h3 class="h-block blk-h">{{ c.cine.doc.title }}</h3>
            <p v-for="p in c.cine.doc.paras" :key="p" class="body-lg para">{{ p }}</p>
          </div>
          <NuxtLink :to="localePath('/histoire-des-vainqueurs')" class="btn btn-outline">{{ c.cine.doc.cta }} →</NuxtLink>
        </div>
      </div>
    </template>

    <!-- 05 · BD & jeux -->
    <template v-if="show('play')">
      <section id="jeux" class="sec sec--wide">
        <div class="sec-head">
          <div>
            <span class="kicker">{{ c.play.kicker }}</span>
            <h2 class="h-section">{{ c.play.title }}</h2>
          </div>
          <p>{{ c.play.aside }}</p>
        </div>
      </section>
      <div class="cols cols-3">
        <div v-for="t in c.play.items" :key="t.title" class="tile tile--xl tile--stack" :class="t.tone">
          <div>
            <span class="kicker">{{ t.kicker }}</span>
            <h3 class="h-card play-h">{{ t.title }}</h3>
            <div class="rows" :class="{ 'rows--light': t.dark }" style="--row-key:120px">
              <div v-for="r in t.rows" :key="r.k">
                <span class="key fact-key">{{ r.k }}</span>
                <span class="val small-val" :class="{ 'light-val': t.dark }">{{ r.v }}</span>
              </div>
            </div>
          </div>
          <NuxtLink v-if="t.to" :to="localePath(t.to)" class="btn btn-outline">{{ t.cta }} →</NuxtLink>
        </div>
      </div>
    </template>

    <!-- 06 · Mémoire tunisienne -->
    <template v-if="show('tn')">
      <section id="tunisie" class="sec sec--wide">
        <div class="sec-head">
          <div>
            <span class="kicker">{{ c.tn.kicker }}</span>
            <h2 class="h-section">{{ c.tn.title }}</h2>
          </div>
          <p>{{ c.tn.aside }}</p>
        </div>
      </section>
      <div class="cols cols-7-5">
        <div class="tile tile--xl tile--navy">
          <div class="watermark ar" aria-hidden="true">قرطاج</div>
          <h3 class="h-block blk-h">{{ c.tn.rowsTitle }}</h3>
          <div class="rows rows--light" style="--row-key:170px">
            <div v-for="r in c.tn.rows" :key="r.key">
              <span class="key fact-key">{{ r.key }}</span>
              <span class="val light-val">{{ r.val }}</span>
            </div>
          </div>
        </div>
        <div class="tile tile--xl tile--gold tile--stack">
          <div>
            <span class="kicker">{{ c.tn.emblem.kicker }}</span>
            <h3 class="h-block blk-h">{{ c.tn.emblem.title }}</h3>
            <p class="body-lg">{{ c.tn.emblem.text }}</p>
          </div>
          <div class="chips">
            <span v-for="t in c.tn.emblem.tags" :key="t" class="chip chip--white">{{ t }}</span>
          </div>
          <NuxtLink :to="localePath('/tunisie')" class="btn btn-outline">{{ c.tn.emblem.cta }} →</NuxtLink>
        </div>
      </div>
    </template>

    <!-- 07 · Mots & lieux -->
    <template v-if="show('words')">
      <section id="expressions" class="sec sec--wide">
        <div class="sec-head">
          <div>
            <span class="kicker">{{ c.words.kicker }}</span>
            <h2 class="h-section">{{ c.words.title }}</h2>
          </div>
          <p>{{ c.words.aside }}</p>
        </div>
      </section>
      <div class="cols cols-3">
        <div v-for="w in c.words.items" :key="w.lat" class="tile tile--xl tile--stack expr" :class="w.tone">
          <div>
            <p class="expr-lat" :lang="w.lang || 'la'" dir="ltr">{{ w.lat }}</p>
            <p class="expr-mean">{{ w.mean }}</p>
            <p class="body">{{ w.text }}</p>
          </div>
          <NuxtLink v-if="w.to" :to="localePath(w.to)" class="expr-link">{{ w.link }} →</NuxtLink>
        </div>
      </div>
      <section class="sec sec-tight">
        <div class="tile tile--xl tile--olive topo">
          <div>
            <span class="kicker">{{ c.words.topo.kicker }}</span>
            <h3 class="h-block blk-h">{{ c.words.topo.title }}</h3>
            <p class="body-lg">{{ c.words.topo.text }}</p>
          </div>
          <div class="topo-side">
            <div class="chips">
              <span v-for="t in c.words.topo.tags" :key="t" class="chip chip--glass">{{ t }}</span>
            </div>
            <NuxtLink :to="localePath('/lieux')" class="btn btn-outline">{{ c.words.topo.cta }} →</NuxtLink>
          </div>
        </div>
      </section>
    </template>

    <PageSources :items="c.sources" />

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <h2 class="h-section more-title">{{ c.more.title }}</h2>
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

const keyTones = ['', 'tile--navy', '', 'tile--terra']
const DOMAINS = ['lit', 'scene', 'art', 'cine', 'play', 'tn', 'words']

const filter = ref('all')
const show = (k) => filter.value === 'all' || filter.value === k

const C = {
  fr: {
    meta: {
      title: "L'héritage de Carthage dans la culture",
      desc: "De Virgile à Flaubert, de Purcell à Cabiria, de Turner aux jeux vidéo : comment Didon, Hannibal, Sophonisbe et Salammbô vivent dans la littérature, l'opéra, la peinture, le cinéma et la mémoire tunisienne."
    },
    hero: {
      chip: 'Culture · 2 200 ans de réception',
      title: "L'héritage de Carthage",
      lede: "Rome a détruit la ville, mais n'a jamais cessé d'en parler. Didon, Hannibal, Sophonisbe et Salammbô ont traversé l'épopée latine, l'opéra baroque, la peinture romantique, le péplum et les jeux vidéo — et, en Tunisie, Carthage reste un nom de tous les jours.",
      tags: ['Littérature', 'Opéra', 'Peinture', 'Cinéma', 'Jeux'],
      alt: 'Didon construisant Carthage, par J. M. W. Turner',
      caption: 'J. M. W. Turner, Didon construisant Carthage (1815) — National Gallery, Londres'
    },
    keys: [
      { k: 'Épopée', n: '17', t: 'chants dans les Punica de Silius Italicus, le plus long poème latin conservé' },
      { k: 'Opéra', n: '1689', t: 'Purcell fait chanter Didon dans Dido and Aeneas' },
      { k: 'Roman', n: '1862', t: 'Flaubert publie Salammbô' },
      { k: 'Cinéma', n: '1914', t: "Cabiria, premier grand péplum de l'histoire du cinéma" }
    ],
    filter: {
      kicker: 'Parcourir par domaine',
      label: 'Filtrer les sections par domaine',
      all: 'Tout',
      live: (n) => (n === 1 ? '1 domaine affiché' : `${n} domaines affichés`)
    },
    domains: { lit: 'Littérature', scene: 'Opéra & théâtre', art: 'Peinture', cine: 'Cinéma', play: 'BD & jeux', tn: 'Mémoire tunisienne', words: 'Mots & lieux' },
    lit: {
      kicker: '01 · Littérature',
      title: "De l'épopée au roman",
      aside: 'Les poètes latins ont inventé une Carthage de légende ; les modernes l’ont réinventée à leur tour.',
      frise: {
        title: 'Carthage sous la plume',
        rows: [
          { key: 'IIIe s. av.', title: 'Naevius, Bellum Punicum', text: "Ancien soldat de la première guerre punique, le poète en tire la première épopée latine sur un sujet historique ; il n'en reste que des fragments." },
          { key: 'v. 190 av.', title: 'Plaute, Poenulus', text: "« Le Petit Carthaginois » : le marchand Hannon y parle punique — les plus longs passages de cette langue conservés dans la littérature latine.", to: '/langue-ecriture', link: 'La langue punique' },
          { key: '29–19 av.', title: 'Virgile, Énéide', text: 'Didon, abandonnée par Énée, maudit sa descendance et appelle un vengeur : le mythe fondateur de la haine entre Rome et Carthage.' },
          { key: 'Fin Ier s. av.', title: 'Ovide, Héroïdes, VII', text: 'La lettre de Didon à Énée, écrite avant sa mort.' },
          { key: 'Fin Ier s.', title: 'Silius Italicus, Punica', text: 'La deuxième guerre punique en 17 chants, de Sagonte à Zama.' },
          { key: 'v. 400', title: 'Augustin, Confessions', text: "L'évêque d'Hippone, qui a étudié à Carthage, avoue avoir pleuré, écolier, sur la mort de Didon (I, 13)." },
          { key: '1338–1341', title: 'Pétrarque, Africa', text: "Une épopée latine à la gloire de Scipion, restée inachevée ; elle contribue à faire couronner le poète au Capitole en 1341." },
          { key: '1594', title: 'Marlowe, Dido, Queen of Carthage', text: 'La reine entre dans le théâtre élisabéthain.' },
          { key: '1862', title: 'Flaubert, Salammbô', text: "Le roman qui fixe pour un siècle l'image d'une Carthage fastueuse et cruelle.", to: '/guerre-des-mercenaires', link: 'Le contexte historique' }
        ]
      },
      figAlt: 'Énée racontant à Didon les malheurs de Troie, par Pierre-Narcisse Guérin',
      figCap: 'Pierre-Narcisse Guérin, Énée racontant à Didon les malheurs de Troie (1815) — musée du Louvre',
      tiles: [
        { tone: 'tile--purple', kicker: 'Virgile · Énéide, I et IV', title: "Didon, de fondatrice à amante", text: "Chez Timée et Justin, Élissa se donne la mort pour échapper à un mariage imposé ; Virgile en fait l'amante d'Énée. Cette version romaine, reprise par Ovide puis par l'opéra, a longtemps éclipsé la fondatrice.", to: '/didon', cta: 'Didon, reine de Carthage' },
        { tone: 'tile--gold', kicker: 'Silius Italicus · Punica', title: "Hannibal, héros d'épopée", text: "Consul en 68, Silius Italicus consacre sa retraite à une épopée de plus de 12 000 vers, dont Hannibal est le moteur tragique. Oubliée au Moyen Âge, elle est retrouvée vers 1417 par l'humaniste Poggio Bracciolini.", to: '/hannibal', cta: 'Hannibal' },
        { tone: 'tile--paper tile--outline', kicker: 'Au théâtre · 1515–1770', title: 'Sophonisbe, reine de tragédie', text: "Trissino (1515), Mairet (1634), Corneille (1663), Voltaire (1770) : la princesse carthaginoise qui préfère le poison au triomphe de Scipion est l'un des grands sujets de la tragédie européenne.", to: '/sophonisbe', cta: 'Sophonisbe' }
      ],
      flaubert: {
        kicker: 'Gustave Flaubert · 1862',
        title: 'Salammbô, Carthage rêvée',
        paras: [
          "Après un séjour à Tunis et à Carthage au printemps 1858, Flaubert situe son roman pendant la guerre des Mercenaires (241–237 av. J.-C.), en suivant Polybe de près. L'héroïne, fille d'Hamilcar et prêtresse de Tanit, est en revanche de son invention.",
          "Le livre fait sensation : il inspire l'opéra, la peinture orientaliste, l'Art nouveau, le cinéma muet — et jusqu'au nom d'un quartier de la Carthage actuelle."
        ],
        quote: "C'était à Mégara, faubourg de Carthage, dans les jardins d'Hamilcar.",
        quoteTr: '',
        quoteCite: 'Salammbô, première phrase',
        cta: 'La guerre des Mercenaires',
        alt: 'Salammbô en robe bleue et or, aquarelle de Rochegrosse',
        caption: "Georges Rochegrosse, Salammbô, aquarelle pour l'édition illustrée de 1900"
      }
    },
    scene: {
      kicker: '02 · Opéra & théâtre',
      title: 'Didon chante',
      aside: "Depuis l'opéra baroque, la reine de Carthage est l'un des grands rôles tragiques ; Salammbô la rejoint au XIXe siècle.",
      frise: {
        title: 'Sur les scènes lyriques',
        rows: [
          { key: '1641', title: 'Cavalli, La Didone', text: "Créé à Venise sur un livret de Busenello : l'un des premiers opéras consacrés à la reine." },
          { key: '1689', title: 'Purcell, Dido and Aeneas', text: "Livret de Nahum Tate, créé dans une pension de jeunes filles de Chelsea. Le lamento « When I am laid in earth » est l'un des airs les plus célèbres du baroque." },
          { key: '1724', title: 'Métastase, Didone abbandonata', text: "Créé à Naples sur une musique de Domenico Sarro, ce livret est remis en musique par des dizaines de compositeurs au XVIIIe siècle." },
          { key: '1744', title: 'Gluck, Sofonisba', text: "Créé à Milan : Sophonisbe passe de la tragédie à l'opéra.", to: '/sophonisbe', link: 'Sophonisbe' },
          { key: '1863', title: 'Berlioz, Les Troyens', text: "Composée d'après Virgile ; seule la seconde partie, « Les Troyens à Carthage », est jouée du vivant de Berlioz. L'œuvre entière n'est créée qu'en 1890, à Karlsruhe." },
          { key: '1863–1866', title: 'Moussorgski, Salammbô', text: "Opéra inachevé d'après Flaubert ; le compositeur en reprend des pages dans Boris Godounov." },
          { key: '1890', title: 'Reyer, Salammbô', text: "Créé au théâtre de la Monnaie, à Bruxelles, puis donné à l'Opéra de Paris en 1892." }
        ]
      },
      quote: {
        kicker: 'Le lamento de Didon · Purcell, 1689',
        orig: 'Remember me, but ah! forget my fate.',
        tr: '« Souviens-toi de moi, mais ah ! oublie mon destin. »',
        cite: 'Nahum Tate, livret de Dido and Aeneas'
      },
      berlioz: {
        kicker: 'Berlioz · Les Troyens, acte V',
        title: 'Didon voit venir Hannibal',
        text: "Sur son bûcher, la Didon de Berlioz a la vision d'un vengeur, Hannibal, avant d'entrevoir le triomphe de Rome : l'opéra met en scène la malédiction de l'Énéide (IV, 625).",
        lat: 'Exoriare aliquis nostris ex ossibus ultor.'
      }
    },
    art: {
      kicker: '03 · Peinture',
      title: 'Carthage en peinture',
      aside: "Du baroque vénitien à l'Art nouveau, les peintres ont surtout retenu les drames : serments, deuils, suicides et tempêtes.",
      feat: {
        kicker: 'Giambattista Tiepolo · v. 1725–1730',
        title: "Hannibal reconnaît la tête d'Hasdrubal",
        paras: [
          "En 207 av. J.-C., après la défaite du Métaure, le consul Claudius Néron fait jeter la tête d'Hasdrubal devant les avant-postes de son frère (Tite-Live, XXVII, 51).",
          "Tiepolo peint le recul horrifié d'Hannibal pour un cycle d'histoire romaine destiné au palais Dolfin, à Venise. Carthage y devient un sujet de grande peinture d'histoire, au même titre que Rome."
        ],
        lat: 'Agnoscere se fortunam Carthaginis.',
        latTr: "« Je reconnais là le destin de Carthage » — les mots que Tite-Live prête à Hannibal devant la tête de son frère.",
        alt: "Hannibal reculant devant la tête coupée de son frère Hasdrubal, par Tiepolo",
        caption: 'G. B. Tiepolo — Kunsthistorisches Museum, Vienne'
      },
      items: [
        { img: '/img/sophonisba.jpg', alt: 'La Mort de Sophonisbe, par Mattia Preti', kicker: 'Mattia Preti · XVIIe s.', title: 'La Mort de Sophonisbe', text: 'La coupe de poison envoyée par Massinissa : un sujet favori des peintres baroques.' },
        { img: '/img/oath.jpg', alt: "Le Serment d'Hannibal, par Benjamin West", kicker: 'Benjamin West · 1770', title: "Le Serment d'Hannibal", text: "Enfant, Hannibal jure devant son père Hamilcar de ne jamais être l'ami de Rome (Polybe, III, 11 ; Tite-Live, XXI, 1)." },
        { img: '/img/goya.jpg', alt: "Hannibal contemplant l'Italie depuis les Alpes, par Goya", kicker: 'Francisco de Goya · 1771', title: "Hannibal vainqueur contemple l'Italie", text: "Peint en Italie par le jeune Goya pour un concours de l'Académie de Parme : Hannibal découvre la péninsule du haut des Alpes." },
        { img: '/img/turner-snow.jpg', alt: 'Tempête de neige : Hannibal et son armée traversant les Alpes, par Turner', kicker: 'J. M. W. Turner · 1812', title: 'Tempête de neige : Hannibal traversant les Alpes', text: "Un tourbillon de neige engloutit presque l'armée : Turner fait d'Hannibal un sujet romantique, dans une Europe dominée par Napoléon. (Tate, Londres)" },
        { img: '/img/mucha-salammbo.jpg', alt: 'Salammbô, lithographie d’Alfons Mucha', kicker: 'Alfons Mucha · 1896', title: 'Salammbô', text: "Lithographie Art nouveau : la prêtresse de Tanit imaginée par Flaubert, entre harpe et brûle-parfums, devient une icône décorative.", pos: '50% 15%' }
      ],
      also: {
        kicker: 'Et aussi',
        title: 'Un sujet qui traverse les siècles',
        items: [
          "Turner peint l'essor et la chute : Didon construisant Carthage (1815) puis Le Déclin de l'empire carthaginois (1817), souvent lus comme un avertissement à l'Empire britannique. Il lègue le premier à la National Gallery à condition qu'il soit accroché près d'un Claude Lorrain.",
          "David grave le nom d'Hannibal sur un rocher, sous celui de Bonaparte, dans Bonaparte franchissant le Grand-Saint-Bernard (1801).",
          'Guérin (1815) et Rochegrosse (1900), plus haut sur cette page, illustrent Virgile et Flaubert.'
        ]
      }
    },
    cine: {
      kicker: '04 · Cinéma',
      title: "Carthage à l'écran",
      aside: "Le péplum italien a fait de Carthage un décor de légende — et un miroir des ambitions de l'Italie moderne.",
      cabiria: {
        kicker: '1914 · Itala Film, Turin',
        title: 'Cabiria',
        paras: [
          "Réalisé par Giovanni Pastrone, Cabiria suit une fillette sicilienne enlevée, vendue à Carthage et promise au sacrifice dans le temple de « Moloch », sur fond de deuxième guerre punique : passage des Alpes par Hannibal, siège de Syracuse et miroirs d'Archimède, drame de Sophonisbe.",
          "Près de trois heures, des décors monumentaux, de longs travellings : Cabiria est le premier grand péplum et inspire D. W. Griffith pour Intolerance (1916). Ses scènes de sacrifice doivent davantage à Salammbô qu'aux sources antiques."
        ],
        facts: [
          { k: 'Réalisation', v: 'Giovanni Pastrone' },
          { k: 'Intertitres', v: "Gabriele D'Annunzio, qui donne aussi leurs noms à Cabiria et à Maciste" },
          { k: 'Maciste', v: "Le colosse joué par Bartolomeo Pagano, ancien docker de Gênes, devient le héros de dizaines de films" }
        ],
        cta: 'Ce que disent vraiment les sources sur le tophet',
        alt: 'Affiche de Cabiria par Leopoldo Metlicovitz : une enfant brandie au-dessus des flammes',
        caption: 'Leopoldo Metlicovitz, affiche de Cabiria (1914)'
      },
      frise: {
        title: 'Du muet au péplum',
        rows: [
          { key: '1925', title: 'Salammbô', text: 'Pierre Marodon adapte Flaubert ; la partition est de Florent Schmitt.' },
          { key: '1937', title: "Scipione l'Africano", text: "Film de propagande du régime fasciste, réalisé par Carmine Gallone : la victoire de Rome à Zama y préfigure la conquête de l'Éthiopie.", to: '/histoire-des-vainqueurs', link: "L'histoire écrite par le vainqueur" },
          { key: '1959', title: 'Annibale', text: "Victor Mature incarne Hannibal dans ce péplum d'Edgar G. Ulmer et Carlo Ludovico Bragaglia, avec passage des Alpes à dos d'éléphant." },
          { key: '1960', title: 'Cartagine in fiamme', text: "Carmine Gallone adapte le roman d'Emilio Salgari, sur fond de troisième guerre punique." },
          { key: '1960', title: 'Salambò', text: 'Nouvelle adaptation de Flaubert par Sergio Grieco, avec Jeanne Valérie.' },
          { key: '2006', title: 'Hannibal (BBC)', text: 'Docufiction où Alexander Siddig incarne Hannibal, au plus près des récits de Polybe et de Tite-Live.' }
        ]
      },
      doc: {
        kicker: 'Documentaires',
        title: "Des ruines à l'écran",
        paras: [
          "Les documentaires récents s'appuient sur l'archéologie — ports circulaires, tophet, quartier punique de Byrsa — pour sortir de l'imagerie du péplum.",
          "Reste un défi : raconter Carthage à partir de ses propres traces, et non plus seulement des récits de ses vainqueurs."
        ],
        cta: "L'histoire écrite par le vainqueur"
      }
    },
    play: {
      kicker: '05 · BD & jeux',
      title: 'En cases et en pixels',
      aside: "Bande dessinée, jeux vidéo, jeux de plateau : Hannibal reste le stratège qu'on veut incarner.",
      items: [
        { tone: 'tile--paper', kicker: 'Bande dessinée', title: 'Alix, Druillet', rows: [
          { k: '1977', v: 'Jacques Martin envoie son héros gallo-romain dans Le Spectre de Carthage, un album de la série Alix.' },
          { k: '1980–1986', v: "Philippe Druillet transpose Salammbô dans l'espace, avec son héros Lone Sloane, en trois albums." }
        ] },
        { tone: 'tile--navy', dark: true, kicker: 'Jeux vidéo', title: 'La stratégie antique', rows: [
          { k: 'Civilization', v: "Carthage est jouable dans plusieurs volets, longtemps sous les traits d'Hannibal ; Didon la dirige dans Civilization V, puis conduit la Phénicie dans Civilization VI." },
          { k: 'Age of Empires', v: "Les Carthaginois arrivent avec l'extension The Rise of Rome (1998)." },
          { k: 'Total War', v: 'Carthage est une faction jouable de Rome: Total War (2004) et de Total War: Rome II (2013), dont la campagne Hannibal at the Gates (2014) retrace la deuxième guerre punique.' }
        ] },
        { tone: 'tile--olive', dark: true, kicker: 'Jeu de plateau', title: 'Hannibal: Rome vs. Carthage', rows: [
          { k: '1996', v: 'Un jeu de simulation de Mark Simonitch qui refait la deuxième guerre punique, des Alpes à Zama. Partout, la même question : Hannibal pouvait-il gagner ?' }
        ], to: '/tactiques', cta: 'Les tactiques' }
      ]
    },
    tn: {
      kicker: '06 · Mémoire tunisienne',
      title: 'Un nom de tous les jours',
      aside: "En Tunisie, Carthage n'est pas un souvenir savant : c'est un nom de quartier, de rue, de chaîne de télévision.",
      rowsTitle: 'Carthage au quotidien',
      rows: [
        { key: 'Billets et timbres', val: 'Hannibal et Élissa ont figuré sur des billets de la Banque centrale de Tunisie ; la Poste tunisienne consacre régulièrement des timbres aux sites et aux grandes figures de Carthage.' },
        { key: 'Quartiers', val: "À Carthage, les quartiers et gares du TGM s'appellent Hannibal, Amilcar et Salammbô — ce dernier nom, inventé par Flaubert, désigne aujourd'hui un quartier bien réel, près des ports puniques." },
        { key: 'Rues', val: "L'avenue de Carthage traverse le centre de Tunis ; dans tout le pays, des rues, des écoles et des commerces portent les noms d'Hannibal, d'Hamilcar ou d'Élissa." },
        { key: 'Médias', val: 'Hannibal TV, lancée en 2005, a été la première chaîne de télévision privée du pays.' },
        { key: '1985', val: 'Les maires de Rome et de Carthage signent un traité symbolique qui clôt la troisième guerre punique.' }
      ],
      emblem: {
        kicker: 'Un emblème national',
        title: 'Des Aigles aux festivals',
        text: "Palais présidentiel, aéroport, Journées cinématographiques et Festival international de Carthage, « Aigles de Carthage » de l'équipe nationale de football : le nom de la cité punique est devenu celui de la Tunisie qui se montre au monde.",
        tags: ['Aigles de Carthage', 'JCC · 1966', 'Festival · 1964'],
        cta: 'Carthage vit en Tunisie'
      }
    },
    words: {
      kicker: '07 · Mots & lieux',
      title: 'Carthage dans la langue',
      aside: "Des formules passées dans l'usage — souvent forgées par Rome, l'ennemie.",
      items: [
        { tone: 'tile--ink', lat: 'Hannibal ad portas', mean: "« Hannibal est aux portes » : l'alarme absolue.", text: "La formule, attestée chez Cicéron (Philippiques, I, 11), garde le souvenir de la terreur de 211 av. J.-C., quand Hannibal marche sur Rome. Tite-Live écrit plutôt « ante portas ».", to: '/hannibal', link: 'Hannibal' },
        { tone: 'tile--purple', lat: 'Carthago delenda est', mean: '« Il faut détruire Carthage. »', text: "Selon Plutarque, Caton l'Ancien terminait chacun de ses avis au Sénat par cette exigence ; la formule latine célèbre est une reconstitution plus tardive.", to: '/richesse-rome', link: 'Pourquoi Rome voulait Carthage' },
        { tone: '', lat: 'Punica fides', mean: 'La « foi punique », autrement dit la trahison.', text: "Un cliché de la propagande romaine, repris par Salluste et Tite-Live, qui prête à Hannibal une « perfidie plus que punique ». Rome, pourtant, n'a pas toujours tenu parole.", to: '/histoire-des-vainqueurs', link: 'Relire les sources' },
        { tone: 'tile--sand', lat: 'Les délices de Capoue', lang: 'fr', mean: 'Un confort qui amollit et fait perdre l’avantage.', text: "L'expression vient de Tite-Live (XXIII, 18) : l'hiver 216–215 av. J.-C. passé à Capoue aurait amolli l'armée d'Hannibal. Les historiens modernes nuancent fortement ce jugement." },
        { tone: 'tile--gold', lat: 'Une paix carthaginoise', lang: 'fr', mean: 'Une paix qui écrase le vaincu.', text: "Keynes popularise l'expression en 1919, dans Les Conséquences économiques de la paix, pour dénoncer le traité de Versailles." },
        { tone: 'tile--terra', lat: 'Un « Cannes »', lang: 'fr', mean: "L'encerclement parfait.", text: "La victoire d'Hannibal en 216 av. J.-C. est devenue le nom commun de la bataille d'anéantissement ; le chef d'état-major allemand Schlieffen en fit un modèle.", to: '/tactiques', link: 'Les tactiques' }
      ],
      topo: {
        kicker: 'Toponymes',
        title: 'Des Carthage sur toute la carte',
        text: "Carthagène, fondée par les Barcides sous le nom de Qart Hadasht ; Cartagena de Indias, en Colombie, qui tient son nom de la ville espagnole ; Hannibal, dans le Missouri, et plus d'une dizaine de villes américaines appelées Carthage.",
        tags: ['Carthagène', 'Cartagena de Indias', 'Hannibal, Missouri', 'Carthage, Texas'],
        cta: 'Les lieux de Carthage'
      }
    },
    sources: [
      { type: 'ancient', author: 'Virgile', work: 'Énéide', ref: 'livres I et IV' },
      { type: 'ancient', author: 'Ovide', work: 'Héroïdes', ref: 'VII (lettre de Didon)' },
      { type: 'ancient', author: 'Plaute', work: 'Le Petit Carthaginois (Poenulus)' },
      { type: 'ancient', author: 'Silius Italicus', work: 'Punica', note: 'épopée en 17 livres sur la deuxième guerre punique' },
      { type: 'ancient', author: 'Tite-Live', work: 'Histoire romaine', ref: 'XXIII, 18 ; XXVII, 51' },
      { type: 'ancient', author: 'Cicéron', work: 'Philippiques', ref: 'I, 11 (« Hannibal ad portas »)' },
      { type: 'modern', author: 'Gustave Flaubert', work: 'Salammbô', ref: 'Paris, Michel Lévy, 1862', note: 'roman' },
      { type: 'modern', author: 'John Maynard Keynes', work: 'The Economic Consequences of the Peace', ref: 'Londres, 1919', note: 'la « paix carthaginoise »' }
    ],
    more: {
      title: 'À lire aussi',
      items: [
        { to: '/didon', img: '/img/byrsa.jpg', alt: 'Colline de Byrsa, à Carthage', kicker: 'v. 814 av. J.-C.', title: 'Didon', text: 'La fondatrice de Carthage, avant sa réinvention par Virgile.' },
        { to: '/sophonisbe', img: '/img/massinissa.jpg', alt: 'Massinissa, roi des Numides', kicker: '? – 203 av. J.-C.', title: 'Sophonisbe', text: 'La princesse qui choisit le poison plutôt que le triomphe de Scipion.' },
        { to: '/guerre-des-mercenaires', img: '/img/rochegrosse-bataille-macar.jpg', alt: 'La bataille du Macar, aquarelle de Rochegrosse', kicker: '241–237 av. J.-C.', title: 'La guerre des Mercenaires', text: 'Le conflit réel derrière Salammbô.' },
        { to: '/tunisie', img: '/img/ruins.jpg', alt: 'Ruines de Carthage', kicker: "Aujourd'hui", title: 'Carthage vit en Tunisie', text: "Un nom, un emblème, une commune du Grand Tunis." },
        { to: '/lieux', img: '/img/hannibal-mo.jpg', alt: 'Main Street, Hannibal (Missouri)', kicker: 'Voyage', title: 'Les lieux de Carthage', text: "De Carthagène à Trasimène, jusqu'au Missouri." },
        { to: '/histoire-des-vainqueurs', img: '/img/scipio.jpg', alt: "Buste de Scipion l'Africain", kicker: 'Sources', title: "L'histoire écrite par le vainqueur", text: 'Pourquoi notre image de Carthage vient de Rome.' }
      ]
    }
  },

  en: {
    meta: {
      title: 'The legacy of Carthage in culture',
      desc: 'From Virgil to Flaubert, from Purcell to Cabiria, from Turner to video games: how Dido, Hannibal, Sophonisba and Salammbô live on in literature, opera, painting, film and Tunisian memory.'
    },
    hero: {
      chip: 'Culture · 2,200 years of reception',
      title: 'The legacy of Carthage',
      lede: 'Rome destroyed the city but never stopped talking about it. Dido, Hannibal, Sophonisba and Salammbô have passed through Latin epic, baroque opera, Romantic painting, sword-and-sandal films and video games — and in Tunisia, Carthage is still an everyday name.',
      tags: ['Literature', 'Opera', 'Painting', 'Film', 'Games'],
      alt: 'Dido Building Carthage, by J. M. W. Turner',
      caption: 'J. M. W. Turner, Dido Building Carthage (1815) — National Gallery, London'
    },
    keys: [
      { k: 'Epic', n: '17', t: 'books in Silius Italicus’ Punica, the longest surviving Latin poem' },
      { k: 'Opera', n: '1689', t: 'Purcell gives Dido a voice in Dido and Aeneas' },
      { k: 'Novel', n: '1862', t: 'Flaubert publishes Salammbô' },
      { k: 'Film', n: '1914', t: 'Cabiria, the first great epic in film history' }
    ],
    filter: {
      kicker: 'Browse by field',
      label: 'Filter sections by field',
      all: 'All',
      live: (n) => (n === 1 ? '1 field shown' : `${n} fields shown`)
    },
    domains: { lit: 'Literature', scene: 'Opera & theatre', art: 'Painting', cine: 'Film', play: 'Comics & games', tn: 'Tunisian memory', words: 'Words & places' },
    lit: {
      kicker: '01 · Literature',
      title: 'From epic to novel',
      aside: 'Latin poets invented a legendary Carthage; modern writers reinvented it in turn.',
      frise: {
        title: 'Carthage in writing',
        rows: [
          { key: '3rd c. BC', title: 'Naevius, Bellum Punicum', text: 'A veteran of the First Punic War, the poet turned it into the first Latin epic on a historical subject; only fragments survive.' },
          { key: 'c. 190 BC', title: 'Plautus, Poenulus', text: '“The Little Carthaginian”: the merchant Hanno speaks Punic in it — the longest passages in that language preserved in Latin literature.', to: '/langue-ecriture', link: 'The Punic language' },
          { key: '29–19 BC', title: 'Virgil, Aeneid', text: 'Dido, abandoned by Aeneas, curses his descendants and calls for an avenger: the founding myth of the hatred between Rome and Carthage.' },
          { key: 'Late 1st c. BC', title: 'Ovid, Heroides, VII', text: 'Dido’s letter to Aeneas, written before her death.' },
          { key: 'Late 1st c. AD', title: 'Silius Italicus, Punica', text: 'The Second Punic War in 17 books, from Saguntum to Zama.' },
          { key: 'c. 400', title: 'Augustine, Confessions', text: 'The bishop of Hippo, who studied at Carthage, admits that as a schoolboy he wept over the death of Dido (I, 13).' },
          { key: '1338–1341', title: 'Petrarch, Africa', text: 'A Latin epic in praise of Scipio, left unfinished; it helped win the poet his laurel crown on the Capitol in 1341.' },
          { key: '1594', title: 'Marlowe, Dido, Queen of Carthage', text: 'The queen enters Elizabethan theatre.' },
          { key: '1862', title: 'Flaubert, Salammbô', text: 'The novel that fixed, for a century, the image of a lavish and cruel Carthage.', to: '/guerre-des-mercenaires', link: 'The historical background' }
        ]
      },
      figAlt: 'Aeneas telling Dido of the misfortunes of Troy, by Pierre-Narcisse Guérin',
      figCap: 'Pierre-Narcisse Guérin, Aeneas Telling Dido of the Misfortunes of Troy (1815) — Louvre',
      tiles: [
        { tone: 'tile--purple', kicker: 'Virgil · Aeneid, I and IV', title: 'Dido, from founder to lover', text: 'In Timaeus and Justin, Elissa takes her own life to escape a forced marriage; Virgil makes her Aeneas’ lover. This Roman version, taken up by Ovid and then by opera, long overshadowed the founder.', to: '/didon', cta: 'Dido, queen of Carthage' },
        { tone: 'tile--gold', kicker: 'Silius Italicus · Punica', title: 'Hannibal, epic hero', text: 'Consul in 68, Silius Italicus devoted his retirement to an epic of over 12,000 lines driven by the tragic figure of Hannibal. Forgotten in the Middle Ages, it was rediscovered around 1417 by the humanist Poggio Bracciolini.', to: '/hannibal', cta: 'Hannibal' },
        { tone: 'tile--paper tile--outline', kicker: 'On stage · 1515–1770', title: 'Sophonisba, tragic queen', text: 'Trissino (1515), Mairet (1634), Corneille (1663), Voltaire (1770): the Carthaginian princess who preferred poison to Scipio’s triumph is one of the great subjects of European tragedy.', to: '/sophonisbe', cta: 'Sophonisba' }
      ],
      flaubert: {
        kicker: 'Gustave Flaubert · 1862',
        title: 'Salammbô, Carthage imagined',
        paras: [
          'After a stay in Tunis and Carthage in the spring of 1858, Flaubert set his novel during the Mercenary War (241–237 BC), following Polybius closely. The heroine, Hamilcar’s daughter and a priestess of Tanit, is his own invention.',
          'The book caused a sensation: it inspired opera, Orientalist painting, Art Nouveau, silent film — and even the name of a district in present-day Carthage.'
        ],
        quote: "C'était à Mégara, faubourg de Carthage, dans les jardins d'Hamilcar.",
        quoteTr: '“It was at Megara, a suburb of Carthage, in the gardens of Hamilcar.”',
        quoteCite: 'Salammbô, opening sentence',
        cta: 'The Mercenary War',
        alt: 'Salammbô in a blue and gold robe, watercolour by Rochegrosse',
        caption: 'Georges Rochegrosse, Salammbô, watercolour for the 1900 illustrated edition'
      }
    },
    scene: {
      kicker: '02 · Opera & theatre',
      title: 'Dido sings',
      aside: 'Since baroque opera, the queen of Carthage has been one of the great tragic roles; Salammbô joined her in the 19th century.',
      frise: {
        title: 'On the operatic stage',
        rows: [
          { key: '1641', title: 'Cavalli, La Didone', text: 'Premiered in Venice to a libretto by Busenello: one of the first operas devoted to the queen.' },
          { key: '1689', title: 'Purcell, Dido and Aeneas', text: 'Libretto by Nahum Tate, first performed at a girls’ boarding school in Chelsea. The lament “When I am laid in earth” is one of the most famous arias of the baroque.' },
          { key: '1724', title: 'Metastasio, Didone abbandonata', text: 'Premiered in Naples with music by Domenico Sarro, the libretto was set again by dozens of composers in the 18th century.' },
          { key: '1744', title: 'Gluck, Sofonisba', text: 'Premiered in Milan: Sophonisba moves from tragedy to opera.', to: '/sophonisbe', link: 'Sophonisba' },
          { key: '1863', title: 'Berlioz, Les Troyens', text: 'Composed after Virgil; only the second part, “The Trojans at Carthage”, was staged in Berlioz’s lifetime. The whole work was not premiered until 1890, in Karlsruhe.' },
          { key: '1863–1866', title: 'Mussorgsky, Salammbô', text: 'An unfinished opera after Flaubert; the composer reused some of its pages in Boris Godunov.' },
          { key: '1890', title: 'Reyer, Salammbô', text: 'Premiered at the Théâtre de la Monnaie in Brussels, then given at the Paris Opéra in 1892.' }
        ]
      },
      quote: {
        kicker: 'Dido’s Lament · Purcell, 1689',
        orig: 'Remember me, but ah! forget my fate.',
        tr: '',
        cite: 'Nahum Tate, libretto of Dido and Aeneas'
      },
      berlioz: {
        kicker: 'Berlioz · Les Troyens, Act V',
        title: 'Dido foresees Hannibal',
        text: 'On her pyre, Berlioz’s Dido has a vision of an avenger, Hannibal, before glimpsing the triumph of Rome: the opera stages the curse of the Aeneid (IV, 625).',
        lat: 'Exoriare aliquis nostris ex ossibus ultor.'
      }
    },
    art: {
      kicker: '03 · Painting',
      title: 'Carthage on canvas',
      aside: 'From Venetian baroque to Art Nouveau, painters were drawn above all to the dramas: oaths, grief, suicides and storms.',
      feat: {
        kicker: 'Giambattista Tiepolo · c. 1725–1730',
        title: 'Hannibal recognises the head of Hasdrubal',
        paras: [
          'In 207 BC, after the defeat at the Metaurus, the consul Claudius Nero had Hasdrubal’s head thrown in front of his brother’s outposts (Livy, XXVII, 51).',
          'Tiepolo painted Hannibal recoiling in horror for a cycle of Roman history intended for the Palazzo Dolfin in Venice. Carthage became a subject of grand history painting, just like Rome.'
        ],
        lat: 'Agnoscere se fortunam Carthaginis.',
        latTr: '“I recognise the fate of Carthage” — the words Livy gives Hannibal before his brother’s head.',
        alt: 'Hannibal recoiling from the severed head of his brother Hasdrubal, by Tiepolo',
        caption: 'G. B. Tiepolo — Kunsthistorisches Museum, Vienna'
      },
      items: [
        { img: '/img/sophonisba.jpg', alt: 'The Death of Sophonisba, by Mattia Preti', kicker: 'Mattia Preti · 17th c.', title: 'The Death of Sophonisba', text: 'The cup of poison sent by Masinissa: a favourite subject of baroque painters.' },
        { img: '/img/oath.jpg', alt: 'The Oath of Hannibal, by Benjamin West', kicker: 'Benjamin West · 1770', title: 'The Oath of Hannibal', text: 'As a boy, Hannibal swears before his father Hamilcar never to be a friend of Rome (Polybius, III, 11; Livy, XXI, 1).' },
        { img: '/img/goya.jpg', alt: 'Hannibal viewing Italy from the Alps, by Goya', kicker: 'Francisco de Goya · 1771', title: 'Hannibal the Conqueror Viewing Italy', text: 'Painted in Italy by the young Goya for a competition of the Parma Academy: Hannibal sees the peninsula from the heights of the Alps.' },
        { img: '/img/turner-snow.jpg', alt: 'Snow Storm: Hannibal and his Army Crossing the Alps, by Turner', kicker: 'J. M. W. Turner · 1812', title: 'Snow Storm: Hannibal Crossing the Alps', text: 'A vortex of snow all but swallows the army: Turner makes Hannibal a Romantic subject, in a Europe dominated by Napoleon. (Tate, London)' },
        { img: '/img/mucha-salammbo.jpg', alt: 'Salammbô, lithograph by Alphonse Mucha', kicker: 'Alphonse Mucha · 1896', title: 'Salammbô', text: 'An Art Nouveau lithograph: Flaubert’s priestess of Tanit, between harp and incense burners, becomes a decorative icon.', pos: '50% 15%' }
      ],
      also: {
        kicker: 'See also',
        title: 'A subject across the centuries',
        items: [
          'Turner painted the rise and the fall: Dido Building Carthage (1815), then The Decline of the Carthaginian Empire (1817), often read as a warning to the British Empire. He bequeathed the first to the National Gallery on condition that it hang beside a Claude Lorrain.',
          'David carved Hannibal’s name on a rock, beneath Bonaparte’s, in Napoleon Crossing the Alps (1801).',
          'Guérin (1815) and Rochegrosse (1900), higher up this page, illustrate Virgil and Flaubert.'
        ]
      }
    },
    cine: {
      kicker: '04 · Film',
      title: 'Carthage on screen',
      aside: 'Italian epic cinema turned Carthage into a legendary backdrop — and a mirror of modern Italy’s ambitions.',
      cabiria: {
        kicker: '1914 · Itala Film, Turin',
        title: 'Cabiria',
        paras: [
          'Directed by Giovanni Pastrone, Cabiria follows a Sicilian girl who is kidnapped, sold in Carthage and doomed to be sacrificed in the temple of “Moloch”, against the backdrop of the Second Punic War: Hannibal crossing the Alps, the siege of Syracuse and Archimedes’ mirrors, the tragedy of Sophonisba.',
          'Nearly three hours long, with monumental sets and long tracking shots, Cabiria is the first great film epic and inspired D. W. Griffith’s Intolerance (1916). Its sacrifice scenes owe more to Salammbô than to the ancient sources.'
        ],
        facts: [
          { k: 'Director', v: 'Giovanni Pastrone' },
          { k: 'Intertitles', v: 'Gabriele D’Annunzio, who also named Cabiria and Maciste' },
          { k: 'Maciste', v: 'The strongman played by Bartolomeo Pagano, a former Genoa docker, went on to star in dozens of films' }
        ],
        cta: 'What the sources really say about the tophet',
        alt: 'Poster for Cabiria by Leopoldo Metlicovitz: a child held up above the flames',
        caption: 'Leopoldo Metlicovitz, poster for Cabiria (1914)'
      },
      frise: {
        title: 'From silents to epics',
        rows: [
          { key: '1925', title: 'Salammbô', text: 'Pierre Marodon adapts Flaubert, with a score by Florent Schmitt.' },
          { key: '1937', title: 'Scipione l’Africano', text: 'A propaganda film of the Fascist regime directed by Carmine Gallone: Rome’s victory at Zama prefigures the conquest of Ethiopia.', to: '/histoire-des-vainqueurs', link: 'History written by the victor' },
          { key: '1959', title: 'Annibale', text: 'Victor Mature plays Hannibal in this epic by Edgar G. Ulmer and Carlo Ludovico Bragaglia, elephants crossing the Alps included.' },
          { key: '1960', title: 'Cartagine in fiamme', text: 'Carmine Gallone adapts Emilio Salgari’s novel, set during the Third Punic War.' },
          { key: '1960', title: 'Salambò', text: 'A new adaptation of Flaubert by Sergio Grieco, starring Jeanne Valérie.' },
          { key: '2006', title: 'Hannibal (BBC)', text: 'A docudrama with Alexander Siddig as Hannibal, keeping close to Polybius and Livy.' }
        ]
      },
      doc: {
        kicker: 'Documentaries',
        title: 'From ruins to screen',
        paras: [
          'Recent documentaries draw on archaeology — the circular harbours, the tophet, the Punic quarter on Byrsa — to move beyond epic-film imagery.',
          'The challenge remains: to tell Carthage’s story from its own traces, not only from its conquerors’ accounts.'
        ],
        cta: 'History written by the victor'
      }
    },
    play: {
      kicker: '05 · Comics & games',
      title: 'In panels and pixels',
      aside: 'Comics, video games, board games: Hannibal is still the strategist everyone wants to play.',
      items: [
        { tone: 'tile--paper', kicker: 'Comics', title: 'Alix, Druillet', rows: [
          { k: '1977', v: 'Jacques Martin sends his Gallo-Roman hero into Le Spectre de Carthage, an album in the Alix series.' },
          { k: '1980–1986', v: 'Philippe Druillet transposes Salammbô into space, with his hero Lone Sloane, in three albums.' }
        ] },
        { tone: 'tile--navy', dark: true, kicker: 'Video games', title: 'Ancient strategy', rows: [
          { k: 'Civilization', v: 'Carthage is playable in several instalments, long led by Hannibal; Dido rules it in Civilization V, then leads Phoenicia in Civilization VI.' },
          { k: 'Age of Empires', v: 'The Carthaginians arrive with the Rise of Rome expansion (1998).' },
          { k: 'Total War', v: 'Carthage is a playable faction in Rome: Total War (2004) and Total War: Rome II (2013), whose Hannibal at the Gates campaign (2014) replays the Second Punic War.' }
        ] },
        { tone: 'tile--olive', dark: true, kicker: 'Board game', title: 'Hannibal: Rome vs. Carthage', rows: [
          { k: '1996', v: 'A simulation game by Mark Simonitch that replays the Second Punic War, from the Alps to Zama. Everywhere, the same question: could Hannibal have won?' }
        ], to: '/tactiques', cta: 'Tactics' }
      ]
    },
    tn: {
      kicker: '06 · Tunisian memory',
      title: 'An everyday name',
      aside: 'In Tunisia, Carthage is not a scholarly memory: it is the name of a neighbourhood, a street, a TV channel.',
      rowsTitle: 'Carthage in daily life',
      rows: [
        { key: 'Banknotes and stamps', val: 'Hannibal and Elissa have appeared on banknotes of the Central Bank of Tunisia; the Tunisian Post regularly devotes stamps to the sites and great figures of Carthage.' },
        { key: 'Neighbourhoods', val: 'In Carthage, the districts and TGM stations are called Hannibal, Amilcar and Salammbô — the last a name invented by Flaubert, now a very real district near the Punic ports.' },
        { key: 'Streets', val: 'Avenue de Carthage runs through central Tunis; across the country, streets, schools and shops bear the names of Hannibal, Hamilcar or Elissa.' },
        { key: 'Media', val: 'Hannibal TV, launched in 2005, was the country’s first private television channel.' },
        { key: '1985', val: 'The mayors of Rome and Carthage sign a symbolic treaty ending the Third Punic War.' }
      ],
      emblem: {
        kicker: 'A national emblem',
        title: 'From the Eagles to the festivals',
        text: 'The presidential palace, the airport, the Carthage Film Festival and International Festival, the “Eagles of Carthage” of the national football team: the name of the Punic city has become the name of Tunisia as it presents itself to the world.',
        tags: ['Eagles of Carthage', 'JCC · 1966', 'Festival · 1964'],
        cta: 'Carthage lives in Tunisia'
      }
    },
    words: {
      kicker: '07 · Words & places',
      title: 'Carthage in the language',
      aside: 'Phrases that passed into common use — often coined by Rome, the enemy.',
      items: [
        { tone: 'tile--ink', lat: 'Hannibal ad portas', mean: '“Hannibal is at the gates”: the ultimate alarm.', text: 'The phrase, attested in Cicero (Philippics, I, 11), preserves the memory of the terror of 211 BC, when Hannibal marched on Rome. Livy writes “ante portas” instead.', to: '/hannibal', link: 'Hannibal' },
        { tone: 'tile--purple', lat: 'Carthago delenda est', mean: '“Carthage must be destroyed.”', text: 'According to Plutarch, Cato the Elder ended every opinion he gave in the Senate with this demand; the famous Latin wording is a later reconstruction.', to: '/richesse-rome', link: 'Why Rome wanted Carthage' },
        { tone: '', lat: 'Punica fides', mean: '“Punic faith” — in other words, treachery.', text: 'A cliché of Roman propaganda, repeated by Sallust and Livy, who credits Hannibal with “more than Punic perfidy”. Rome, for its part, did not always keep its word.', to: '/histoire-des-vainqueurs', link: 'Rereading the sources' },
        { tone: 'tile--sand', lat: 'The delights of Capua', lang: 'en', mean: 'Comfort that softens you and costs you the advantage.', text: 'The phrase comes from Livy (XXIII, 18): the winter of 216–215 BC spent in Capua supposedly softened Hannibal’s army. Modern historians strongly qualify this verdict.' },
        { tone: 'tile--gold', lat: 'A Carthaginian peace', lang: 'en', mean: 'A peace that crushes the defeated.', text: 'Keynes popularised the phrase in 1919, in The Economic Consequences of the Peace, to denounce the Treaty of Versailles.' },
        { tone: 'tile--terra', lat: 'A “Cannae”', lang: 'en', mean: 'The perfect encirclement.', text: 'Hannibal’s victory in 216 BC became the byword for the battle of annihilation; the German chief of staff Schlieffen made it a model.', to: '/tactiques', link: 'Tactics' }
      ],
      topo: {
        kicker: 'Place names',
        title: 'Carthages all over the map',
        text: 'Cartagena, founded by the Barcids as Qart Hadasht; Cartagena de Indias in Colombia, named after the Spanish city; Hannibal in Missouri, and more than a dozen American towns called Carthage.',
        tags: ['Cartagena', 'Cartagena de Indias', 'Hannibal, Missouri', 'Carthage, Texas'],
        cta: 'The places of Carthage'
      }
    },
    sources: [
      { type: 'ancient', author: 'Virgil', work: 'Aeneid', ref: 'books I and IV' },
      { type: 'ancient', author: 'Ovid', work: 'Heroides', ref: 'VII (Dido\'s letter)' },
      { type: 'ancient', author: 'Plautus', work: 'The Little Carthaginian (Poenulus)' },
      { type: 'ancient', author: 'Silius Italicus', work: 'Punica', note: 'epic in 17 books on the Second Punic War' },
      { type: 'ancient', author: 'Livy', work: 'History of Rome', ref: 'XXIII, 18; XXVII, 51' },
      { type: 'ancient', author: 'Cicero', work: 'Philippics', ref: 'I, 11 (“Hannibal ad portas”)' },
      { type: 'modern', author: 'Gustave Flaubert', work: 'Salammbô', ref: 'Paris, Michel Lévy, 1862', note: 'novel' },
      { type: 'modern', author: 'John Maynard Keynes', work: 'The Economic Consequences of the Peace', ref: 'London, 1919', note: 'the “Carthaginian peace”' }
    ],
    more: {
      title: 'Read also',
      items: [
        { to: '/didon', img: '/img/byrsa.jpg', alt: 'Byrsa Hill, Carthage', kicker: 'c. 814 BC', title: 'Dido', text: 'The founder of Carthage, before Virgil reinvented her.' },
        { to: '/sophonisbe', img: '/img/massinissa.jpg', alt: 'Masinissa, king of the Numidians', kicker: '? – 203 BC', title: 'Sophonisba', text: 'The princess who chose poison over Scipio’s triumph.' },
        { to: '/guerre-des-mercenaires', img: '/img/rochegrosse-bataille-macar.jpg', alt: 'The battle of the Macar, watercolour by Rochegrosse', kicker: '241–237 BC', title: 'The Mercenary War', text: 'The real conflict behind Salammbô.' },
        { to: '/tunisie', img: '/img/ruins.jpg', alt: 'Ruins of Carthage', kicker: 'Today', title: 'Carthage lives in Tunisia', text: 'A name, an emblem, a town in Greater Tunis.' },
        { to: '/lieux', img: '/img/hannibal-mo.jpg', alt: 'Main Street, Hannibal (Missouri)', kicker: 'Travel', title: 'The places of Carthage', text: 'From Cartagena to Trasimene, all the way to Missouri.' },
        { to: '/histoire-des-vainqueurs', img: '/img/scipio.jpg', alt: 'Bust of Scipio Africanus', kicker: 'Sources', title: 'History written by the victor', text: 'Why our picture of Carthage comes from Rome.' }
      ]
    }
  },

  ar: {
    meta: {
      title: 'إرث قرطاج في الثقافة',
      desc: 'من فرجيل إلى فلوبير، ومن بورسيل إلى «كابيريا»، ومن تيرنر إلى ألعاب الفيديو: كيف تحيا عليسة وحنبعل وصوفونيسبا وسالامبو في الأدب والأوبرا والرسم والسينما والذاكرة التونسية.'
    },
    hero: {
      chip: 'الثقافة · 2200 سنة من التلقّي',
      title: 'إرث قرطاج',
      lede: 'دمّرت روما المدينة، لكنها لم تكفّ عن الحديث عنها. عبرت عليسة وحنبعل وصوفونيسبا وسالامبو الملحمةَ اللاتينية وأوبرا الباروك والرسم الرومانسي وأفلام التاريخ الملحمية وألعاب الفيديو — وفي تونس ما يزال اسم قرطاج اسمًا من أسماء الحياة اليومية.',
      tags: ['الأدب', 'الأوبرا', 'الرسم', 'السينما', 'الألعاب'],
      alt: 'ديدون تبني قرطاج، لوحة ج. م. و. تيرنر',
      caption: 'ج. م. و. تيرنر، ديدون تبني قرطاج (1815) — المتحف الوطني، لندن'
    },
    keys: [
      { k: 'الملحمة', n: '17', t: 'نشيدًا في «البونيقيات» لسيليوس إيتاليكوس، أطول قصيدة لاتينية وصلتنا' },
      { k: 'الأوبرا', n: '1689', t: 'بورسيل يُغنّي ديدون في «ديدو وإينياس»' },
      { k: 'الرواية', n: '1862', t: 'فلوبير ينشر «سالامبو»' },
      { k: 'السينما', n: '1914', t: '«كابيريا»، أول فيلم تاريخي ملحمي كبير في تاريخ السينما' }
    ],
    filter: {
      kicker: 'تصفّح حسب المجال',
      label: 'تصفية الأقسام حسب المجال',
      all: 'الكل',
      live: (n) => (n === 1 ? 'مجال واحد معروض' : `${n} مجالات معروضة`)
    },
    domains: { lit: 'الأدب', scene: 'الأوبرا والمسرح', art: 'الرسم', cine: 'السينما', play: 'القصص المصوّرة والألعاب', tn: 'الذاكرة التونسية', words: 'كلمات وأماكن' },
    lit: {
      kicker: '01 · الأدب',
      title: 'من الملحمة إلى الرواية',
      aside: 'ابتكر الشعراء اللاتين قرطاجَ أسطورية، ثم أعاد المحدثون ابتكارها بدورهم.',
      frise: {
        title: 'قرطاج بأقلام الكتّاب',
        rows: [
          { key: 'القرن 3 ق.م', title: 'نايفيوس، «الحرب البونيقية»', text: 'جنديّ سابق في الحرب البونيقية الأولى، صاغ منها أول ملحمة لاتينية في موضوع تاريخي؛ ولم تبقَ منها إلا شذرات.' },
          { key: 'نحو 190 ق.م', title: 'بلاوتوس، «البونيقيّ الصغير»', text: 'في هذه الكوميديا يتكلّم التاجر حانون بالبونيقية — وهي أطول مقاطع من هذه اللغة حفظها الأدب اللاتيني.', to: '/langue-ecriture', link: 'اللغة البونيقية' },
          { key: '29–19 ق.م', title: 'فرجيل، «الإنيادة»', text: 'ديدون، التي هجرها إينياس، تلعن نسله وتستدعي منتقمًا: الأسطورة المؤسِّسة للعداء بين روما وقرطاج.' },
          { key: 'أواخر القرن 1 ق.م', title: 'أوفيد، «رسائل البطلات»، السابعة', text: 'رسالة ديدون إلى إينياس قبيل موتها.' },
          { key: 'أواخر القرن 1 م', title: 'سيليوس إيتاليكوس، «البونيقيات»', text: 'الحرب البونيقية الثانية في 17 نشيدًا، من ساغونتوم إلى زاما.' },
          { key: 'نحو 400 م', title: 'أوغسطين، «الاعترافات»', text: 'أسقف هيبون، الذي درس في قرطاج، يعترف بأنه بكى تلميذًا على موت ديدون (1، 13).' },
          { key: '1338–1341', title: 'بترارك، «أفريكا»', text: 'ملحمة لاتينية في تمجيد سكيبيو ظلّت ناقصة؛ وقد أسهمت في تتويج الشاعر في الكابيتول سنة 1341.' },
          { key: '1594', title: 'مارلو، «ديدو ملكة قرطاج»', text: 'الملكة تدخل المسرح الإليزابيثي.' },
          { key: '1862', title: 'فلوبير، «سالامبو»', text: 'الرواية التي رسّخت لقرن كامل صورة قرطاج باذخة وقاسية.', to: '/guerre-des-mercenaires', link: 'السياق التاريخي' }
        ]
      },
      figAlt: 'إينياس يروي لديدون مآسي طروادة، لوحة بيير-نارسيس غيران',
      figCap: 'بيير-نارسيس غيران، إينياس يروي لديدون مآسي طروادة (1815) — متحف اللوفر',
      tiles: [
        { tone: 'tile--purple', kicker: 'فرجيل · «الإنيادة»، 1 و4', title: 'ديدون، من مؤسِّسة إلى عاشقة', text: 'عند تيمايوس وجستين تقتل عليسة نفسها هربًا من زواج مفروض؛ أما فرجيل فيجعلها عشيقة إينياس. هذه الرواية الرومانية، التي تبنّاها أوفيد ثم الأوبرا، حجبت المؤسِّسة طويلًا.', to: '/didon', cta: 'عليسة، ملكة قرطاج' },
        { tone: 'tile--gold', kicker: 'سيليوس إيتاليكوس · «البونيقيات»', title: 'حنبعل بطلًا ملحميًا', text: 'قنصل سنة 68 م، كرّس سيليوس إيتاليكوس تقاعده لملحمة تتجاوز 12000 بيت يحرّكها حنبعل بطلًا مأساويًا. نُسيت في العصر الوسيط، ثم عثر عليها الإنساني بودجو براتشوليني نحو سنة 1417.', to: '/hannibal', cta: 'حنبعل' },
        { tone: 'tile--paper tile--outline', kicker: 'على المسرح · 1515–1770', title: 'صوفونيسبا، ملكة التراجيديا', text: 'تريسينو (1515)، ميريه (1634)، كورناي (1663)، فولتير (1770): الأميرة القرطاجية التي فضّلت السمّ على موكب نصر سكيبيو من كبرى موضوعات التراجيديا الأوروبية.', to: '/sophonisbe', cta: 'صوفونيسبا' }
      ],
      flaubert: {
        kicker: 'غوستاف فلوبير · 1862',
        title: 'سالامبو، قرطاج المتخيَّلة',
        paras: [
          'بعد إقامة في تونس وقرطاج في ربيع 1858، جعل فلوبير أحداث روايته في زمن حرب المرتزقة (241–237 ق.م)، متّبعًا بوليبيوس عن قرب. أما البطلة، ابنة حملقار وكاهنة تانيت، فمن ابتكاره.',
          'أحدث الكتاب ضجّة: ألهم الأوبرا والرسم الاستشراقي وفن الآر نوفو والسينما الصامتة — بل وحتى اسم حيّ في قرطاج اليوم.'
        ],
        quote: "C'était à Mégara, faubourg de Carthage, dans les jardins d'Hamilcar.",
        quoteTr: '«كان ذلك في ميغارا، ضاحية قرطاج، في حدائق حملقار.»',
        quoteCite: '«سالامبو»، الجملة الأولى',
        cta: 'حرب المرتزقة',
        alt: 'سالامبو في ثوب أزرق وذهبي، لوحة مائية لروشغروس',
        caption: 'جورج روشغروس، سالامبو، لوحة مائية للطبعة المصوّرة سنة 1900'
      }
    },
    scene: {
      kicker: '02 · الأوبرا والمسرح',
      title: 'ديدون تُغنّي',
      aside: 'منذ أوبرا الباروك، صارت ملكة قرطاج أحد كبار الأدوار المأساوية؛ ولحقت بها سالامبو في القرن التاسع عشر.',
      frise: {
        title: 'على خشبات الأوبرا',
        rows: [
          { key: '1641', title: 'كافالي، «ديدونه»', text: 'قُدّمت في البندقية على نصّ لبوزينيلو: من أوائل الأوبرات المكرّسة للملكة.' },
          { key: '1689', title: 'بورسيل، «ديدو وإينياس»', text: 'نصّ ناحوم تيت، وقُدّمت أول مرة في مدرسة داخلية للفتيات في تشيلسي. ومرثية «When I am laid in earth» من أشهر ألحان الباروك.' },
          { key: '1724', title: 'ميتاستازيو، «ديدونه المهجورة»', text: 'قُدّمت في نابولي بموسيقى دومينيكو سارّو، ثم لحّن هذا النصَّ عشراتُ المؤلفين في القرن الثامن عشر.' },
          { key: '1744', title: 'غلوك، «صوفونيسبا»', text: 'قُدّمت في ميلانو: صوفونيسبا تنتقل من التراجيديا إلى الأوبرا.', to: '/sophonisbe', link: 'صوفونيسبا' },
          { key: '1863', title: 'برليوز، «الطرواديون»', text: 'مستوحاة من فرجيل؛ ولم يُعرض في حياة برليوز إلا الجزء الثاني، «الطرواديون في قرطاج». ولم يُقدَّم العمل كاملًا إلا سنة 1890 في كارلسروه.' },
          { key: '1863–1866', title: 'موسورغسكي، «سالامبو»', text: 'أوبرا ناقصة عن فلوبير، أعاد المؤلف استعمال بعض صفحاتها في «بوريس غودونوف».' },
          { key: '1890', title: 'رايير، «سالامبو»', text: 'قُدّمت في مسرح «لا موناي» ببروكسل، ثم في أوبرا باريس سنة 1892.' }
        ]
      },
      quote: {
        kicker: 'مرثية ديدون · بورسيل، 1689',
        orig: 'Remember me, but ah! forget my fate.',
        tr: '«تذكّرني، ولكن آهٍ! انسَ مصيري.»',
        cite: 'ناحوم تيت، نصّ «ديدو وإينياس»'
      },
      berlioz: {
        kicker: 'برليوز · «الطرواديون»، الفصل الخامس',
        title: 'ديدون ترى حنبعل آتيًا',
        text: 'على محرقتها، ترى ديدون برليوز في رؤيا منتقمًا هو حنبعل، قبل أن تلمح انتصار روما: هكذا تُجسّد الأوبرا لعنة «الإنيادة» (4، 625).',
        lat: 'Exoriare aliquis nostris ex ossibus ultor.'
      }
    },
    art: {
      kicker: '03 · الرسم',
      title: 'قرطاج في اللوحات',
      aside: 'من باروك البندقية إلى الآر نوفو، استهوت الرسامين المآسي قبل كل شيء: أقسام، وأحزان، وانتحار، وعواصف.',
      feat: {
        kicker: 'جامباتيستا تييبولو · نحو 1725–1730',
        title: 'حنبعل يتعرّف على رأس صدربعل',
        paras: [
          'سنة 207 ق.م، بعد هزيمة نهر ميتاوروس، أمر القنصل كلوديوس نيرون بإلقاء رأس صدربعل أمام مخافر أخيه المتقدّمة (تيتوس ليفيوس، 27، 51).',
          'رسم تييبولو حنبعل وهو يتراجع مذعورًا، ضمن سلسلة عن التاريخ الروماني أُعدّت لقصر دولفين في البندقية. هكذا صارت قرطاج موضوعًا للرسم التاريخي الكبير، شأنها شأن روما.'
        ],
        lat: 'Agnoscere se fortunam Carthaginis.',
        latTr: '«أعرف في هذا مصيرَ قرطاج» — الكلمات التي ينسبها تيتوس ليفيوس إلى حنبعل أمام رأس أخيه.',
        alt: 'حنبعل يتراجع أمام رأس أخيه صدربعل المقطوع، لوحة تييبولو',
        caption: 'ج. ب. تييبولو — متحف تاريخ الفن، فيينا'
      },
      items: [
        { img: '/img/sophonisba.jpg', alt: 'موت صوفونيسبا، لوحة ماتيا بريتي', kicker: 'ماتيا بريتي · القرن 17', title: 'موت صوفونيسبا', text: 'كأس السمّ التي أرسلها ماسينيسا: موضوع أثير لدى رسّامي الباروك.' },
        { img: '/img/oath.jpg', alt: 'قسم حنبعل، لوحة بنجامين وست', kicker: 'بنجامين وست · 1770', title: 'قسم حنبعل', text: 'يُقسم حنبعل الطفل أمام أبيه حملقار ألّا يكون صديقًا لروما أبدًا (بوليبيوس، 3، 11؛ تيتوس ليفيوس، 21، 1).' },
        { img: '/img/goya.jpg', alt: 'حنبعل يتأمل إيطاليا من جبال الألب، لوحة غويا', kicker: 'فرانسيسكو دي غويا · 1771', title: 'حنبعل المنتصر يتأمل إيطاليا', text: 'رسمها غويا الشاب في إيطاليا لمسابقة أكاديمية بارما: حنبعل يكتشف شبه الجزيرة من أعالي الألب.' },
        { img: '/img/turner-snow.jpg', alt: 'عاصفة ثلجية: حنبعل وجيشه يعبرون الألب، لوحة تيرنر', kicker: 'ج. م. و. تيرنر · 1812', title: 'عاصفة ثلجية: حنبعل يعبر الألب', text: 'دوّامة من الثلج تكاد تبتلع الجيش: يجعل تيرنر من حنبعل موضوعًا رومانسيًا، في أوروبا يهيمن عليها نابليون. (متحف تيت، لندن)' },
        { img: '/img/mucha-salammbo.jpg', alt: 'سالامبو، طبعة حجرية لألفونس موشا', kicker: 'ألفونس موشا · 1896', title: 'سالامبو', text: 'طبعة حجرية على طراز الآر نوفو: كاهنة تانيت التي تخيّلها فلوبير، بين القيثارة ومباخر العطر، تصير أيقونة زخرفية.', pos: '50% 15%' }
      ],
      also: {
        kicker: 'وأيضًا',
        title: 'موضوع يعبر القرون',
        items: [
          'رسم تيرنر الصعود والسقوط: «ديدون تبني قرطاج» (1815) ثم «أفول الإمبراطورية القرطاجية» (1817)، وكثيرًا ما قُرئتا تحذيرًا للإمبراطورية البريطانية. وقد أوصى بالأولى للمتحف الوطني بشرط أن تُعلَّق قرب لوحة لكلود لوران.',
          'نقش دافيد اسم حنبعل على صخرة، تحت اسم بونابرت، في لوحة «بونابرت يعبر ممرّ سان برنار الكبير» (1801).',
          'غيران (1815) وروشغروس (1900)، أعلى هذه الصفحة، يصوّران فرجيل وفلوبير.'
        ]
      }
    },
    cine: {
      kicker: '04 · السينما',
      title: 'قرطاج على الشاشة',
      aside: 'جعلت السينما التاريخية الإيطالية من قرطاج ديكورًا أسطوريًا — ومرآةً لطموحات إيطاليا الحديثة.',
      cabiria: {
        kicker: '1914 · إيتالا فيلم، تورينو',
        title: 'كابيريا',
        paras: [
          'من إخراج جوفاني باستروني، يتتبّع «كابيريا» طفلة صقلية تُختطف وتُباع في قرطاج وتُعدّ للتضحية في معبد «مولوخ»، على خلفية الحرب البونيقية الثانية: عبور حنبعل للألب، وحصار سيراكوزا ومرايا أرخميدس، ومأساة صوفونيسبا.',
          'قرابة ثلاث ساعات، وديكورات ضخمة، ولقطات تتبّع طويلة: «كابيريا» أول فيلم ملحمي كبير، وقد ألهم د. و. غريفيث في «التعصّب» (1916). أما مشاهد التضحية فيه فمدينة لـ«سالامبو» أكثر مما هي مدينة للمصادر القديمة.'
        ],
        facts: [
          { k: 'الإخراج', v: 'جوفاني باستروني' },
          { k: 'اللوحات المكتوبة', v: 'غابرييلي دانونزيو، الذي سمّى أيضًا كابيريا وماتشيستي' },
          { k: 'ماتشيستي', v: 'العملاق الذي أدّاه بارتولوميو باغانو، عامل الميناء السابق في جنوة، وصار بطل عشرات الأفلام' }
        ],
        cta: 'ما تقوله المصادر حقًّا عن التوفيت',
        alt: 'ملصق «كابيريا» لليوبولدو ميتليكوفيتس: طفلة مرفوعة فوق اللهب',
        caption: 'ليوبولدو ميتليكوفيتس، ملصق «كابيريا» (1914)'
      },
      frise: {
        title: 'من السينما الصامتة إلى الملاحم',
        rows: [
          { key: '1925', title: '«سالامبو»', text: 'بيير مارودون يقتبس فلوبير، بموسيقى فلوران شميت.' },
          { key: '1937', title: '«سكيبيو الإفريقي»', text: 'فيلم دعائي للنظام الفاشي أخرجه كارمينه غالوني: انتصار روما في زاما يُمهّد فيه لغزو إثيوبيا.', to: '/histoire-des-vainqueurs', link: 'التاريخ الذي كتبه المنتصر' },
          { key: '1959', title: '«أنيبالي»', text: 'فيكتور ماتشور يؤدي دور حنبعل في هذا الفيلم الملحمي لإدغار ج. أولمر وكارلو لودوفيكو براغاليا، مع عبور الألب على ظهور الفيلة.' },
          { key: '1960', title: '«قرطاج تحترق»', text: 'كارمينه غالوني يقتبس رواية إميليو سالغاري، على خلفية الحرب البونيقية الثالثة.' },
          { key: '1960', title: '«سالامبو»', text: 'اقتباس جديد لفلوبير من إخراج سيرجيو غريكو، بطولة جان فاليري.' },
          { key: '2006', title: '«حنبعل» (بي بي سي)', text: 'دراما وثائقية يؤدي فيها ألكسندر صدّيق دور حنبعل، على مقربة من روايتي بوليبيوس وتيتوس ليفيوس.' }
        ]
      },
      doc: {
        kicker: 'أفلام وثائقية',
        title: 'من الأطلال إلى الشاشة',
        paras: [
          'تعتمد الأفلام الوثائقية الحديثة على علم الآثار — الموانئ الدائرية، والتوفيت، والحي البونيقي في بيرصا — للخروج من صور أفلام السيف والصندل.',
          'ويبقى التحدي: أن تُروى قرطاج انطلاقًا من آثارها هي، لا من روايات المنتصرين عليها فحسب.'
        ],
        cta: 'التاريخ الذي كتبه المنتصر'
      }
    },
    play: {
      kicker: '05 · القصص المصوّرة والألعاب',
      title: 'في المربّعات والبكسلات',
      aside: 'قصص مصوّرة، وألعاب فيديو، وألعاب لوحية: ما يزال حنبعل الاستراتيجيَّ الذي يودّ الجميع تقمّصه.',
      items: [
        { tone: 'tile--paper', kicker: 'القصص المصوّرة', title: 'أليكس، دروييه', rows: [
          { k: '1977', v: 'جاك مارتان يرسل بطله الغالي-الروماني إلى «شبح قرطاج»، أحد ألبومات سلسلة «أليكس».' },
          { k: '1980–1986', v: 'فيليب دروييه ينقل «سالامبو» إلى الفضاء، مع بطله لون سلون، في ثلاثة ألبومات.' }
        ] },
        { tone: 'tile--navy', dark: true, kicker: 'ألعاب الفيديو', title: 'الاستراتيجية القديمة', rows: [
          { k: 'Civilization', v: 'قرطاج قابلة للعب في عدة أجزاء، بقيادة حنبعل طويلًا؛ ثم تحكمها ديدون في Civilization V، وتقود فينيقيا في Civilization VI.' },
          { k: 'Age of Empires', v: 'يظهر القرطاجيون مع التوسعة The Rise of Rome (1998).' },
          { k: 'Total War', v: 'قرطاج فصيل قابل للعب في Rome: Total War (2004) وTotal War: Rome II (2013)، التي تعيد حملتها Hannibal at the Gates (2014) الحربَ البونيقية الثانية.' }
        ] },
        { tone: 'tile--olive', dark: true, kicker: 'لعبة لوحية', title: 'Hannibal: Rome vs. Carthage', rows: [
          { k: '1996', v: 'لعبة محاكاة لمارك سيمونيتش تعيد الحرب البونيقية الثانية، من الألب إلى زاما. والسؤال نفسه في كل مكان: هل كان بوسع حنبعل أن ينتصر؟' }
        ], to: '/tactiques', cta: 'التكتيكات' }
      ]
    },
    tn: {
      kicker: '06 · الذاكرة التونسية',
      title: 'اسم من الحياة اليومية',
      aside: 'في تونس ليست قرطاج ذكرى أكاديمية: إنها اسم حيّ وشارع وقناة تلفزيونية.',
      rowsTitle: 'قرطاج في الحياة اليومية',
      rows: [
        { key: 'أوراق نقدية وطوابع', val: 'ظهر حنبعل وعليسة على أوراق نقدية للبنك المركزي التونسي؛ ويخصّص البريد التونسي بانتظام طوابع لمواقع قرطاج وأعلامها الكبار.' },
        { key: 'الأحياء', val: 'في قرطاج تحمل الأحياء ومحطات قطار TGM أسماء حنبعل وأميلكار وصلامبو — وهذا الاسم الأخير من ابتكار فلوبير، صار اليوم اسم حيّ حقيقي قرب الموانئ البونيقية.' },
        { key: 'الشوارع', val: 'يعبر شارع قرطاج وسط تونس العاصمة؛ وفي أنحاء البلاد تحمل شوارع ومدارس ومحلات أسماء حنبعل وحملقار وعليسة.' },
        { key: 'الإعلام', val: 'قناة «حنبعل»، التي انطلقت سنة 2005، كانت أول قناة تلفزيونية خاصة في البلاد.' },
        { key: '1985', val: 'يوقّع رئيسا بلديتي روما وقرطاج معاهدة رمزية تُنهي الحرب البونيقية الثالثة.' }
      ],
      emblem: {
        kicker: 'شعار وطني',
        title: 'من النسور إلى المهرجانات',
        text: 'القصر الرئاسي، والمطار، وأيام قرطاج السينمائية، ومهرجان قرطاج الدولي، و«نسور قرطاج» لقبُ المنتخب الوطني لكرة القدم: صار اسم المدينة البونيقية اسمَ تونس حين تُطلّ على العالم.',
        tags: ['نسور قرطاج', 'أيام قرطاج السينمائية · 1966', 'المهرجان · 1964'],
        cta: 'قرطاج تحيا في تونس'
      }
    },
    words: {
      kicker: '07 · كلمات وأماكن',
      title: 'قرطاج في اللغة',
      aside: 'عبارات دخلت الاستعمال الشائع — صاغتها روما العدوّة في الغالب.',
      items: [
        { tone: 'tile--ink', lat: 'Hannibal ad portas', mean: '«حنبعل على الأبواب»: الإنذار الأقصى.', text: 'ترد العبارة عند شيشرون (الفيليبيات، 1، 11)، وتحفظ ذكرى الرعب سنة 211 ق.م حين زحف حنبعل على روما. أما تيتوس ليفيوس فيكتب «ante portas».', to: '/hannibal', link: 'حنبعل' },
        { tone: 'tile--purple', lat: 'Carthago delenda est', mean: '«يجب تدمير قرطاج.»', text: 'يروي بلوتارخوس أن كاتو الأكبر كان يختم كل رأي يبديه في مجلس الشيوخ بهذا المطلب؛ أما الصيغة اللاتينية الشهيرة فإعادة صياغة متأخرة.', to: '/richesse-rome', link: 'لماذا أرادت روما قرطاج' },
        { tone: '', lat: 'Punica fides', mean: '«الوفاء البونيقي»، أي الخيانة.', text: 'كليشيه من الدعاية الرومانية، ردّده سالوستيوس وتيتوس ليفيوس الذي نسب إلى حنبعل «غدرًا يفوق الغدر البونيقي». غير أن روما نفسها لم تفِ دائمًا بعهودها.', to: '/histoire-des-vainqueurs', link: 'إعادة قراءة المصادر' },
        { tone: 'tile--sand', lat: 'Les délices de Capoue', lang: 'fr', mean: '«نعيم كابوا»: رخاء يُرخي العزيمة ويُضيّع الأفضلية.', text: 'تعود العبارة إلى تيتوس ليفيوس (23، 18): يُروى أن شتاء 216–215 ق.م في كابوا أرخى جيش حنبعل. ويُنسّب المؤرخون المحدثون هذا الحكم كثيرًا.' },
        { tone: 'tile--gold', lat: 'A Carthaginian peace', lang: 'en', mean: '«سلام قرطاجي»: سلام يسحق المهزوم.', text: 'نشر كينز العبارة سنة 1919 في كتابه «العواقب الاقتصادية للسلام» لإدانة معاهدة فرساي.' },
        { tone: 'tile--terra', lat: 'Cannae', mean: '«كاناي»: التطويق المثالي.', text: 'صار انتصار حنبعل سنة 216 ق.م اسمًا عامًّا لمعركة الإبادة؛ واتخذه رئيس الأركان الألماني شليفن نموذجًا.', to: '/tactiques', link: 'التكتيكات' }
      ],
      topo: {
        kicker: 'أسماء الأماكن',
        title: 'قرطاجات على امتداد الخريطة',
        text: 'قرطاجنة، التي أسّسها البرقيون باسم «قرت حدشت»؛ وقرطاجنة الهند الغربية في كولومبيا، التي أخذت اسمها من المدينة الإسبانية؛ وهانيبال في ولاية ميزوري، وأكثر من عشر مدن أمريكية تُسمّى قرطاج.',
        tags: ['قرطاجنة', 'Cartagena de Indias', 'Hannibal, Missouri', 'Carthage, Texas'],
        cta: 'أماكن قرطاج'
      }
    },
    sources: [
      { type: 'ancient', author: 'فرجيليوس', work: 'الإنيادة', ref: 'الكتابان الأول والرابع' },
      { type: 'ancient', author: 'أوفيديوس', work: 'الرسائل البطولية', ref: 'السابعة (رسالة ديدون)' },
      { type: 'ancient', author: 'بلاوتوس', work: 'القرطاجي الصغير (Poenulus)' },
      { type: 'ancient', author: 'سيليوس إيتاليكوس', work: 'البونيقيات (Punica)', note: 'ملحمة في 17 كتاباً عن الحرب البونيقية الثانية' },
      { type: 'ancient', author: 'تيتوس ليفيوس', work: 'تاريخ روما', ref: 'XXIII, 18 ; XXVII, 51' },
      { type: 'ancient', author: 'شيشرون', work: 'الفيليبيات', ref: 'I, 11 («حنبعل على الأبواب»)' },
      { type: 'modern', author: 'Gustave Flaubert', work: 'Salammbô', ref: 'Paris, Michel Lévy, 1862', note: 'رواية' },
      { type: 'modern', author: 'John Maynard Keynes', work: 'The Economic Consequences of the Peace', ref: 'London, 1919', note: '«السلام القرطاجي»' }
    ],
    more: {
      title: 'اقرأ أيضًا',
      items: [
        { to: '/didon', img: '/img/byrsa.jpg', alt: 'هضبة بيرصا، قرطاج', kicker: 'نحو 814 ق.م', title: 'عليسة', text: 'مؤسِّسة قرطاج، قبل أن يعيد فرجيل ابتكارها.' },
        { to: '/sophonisbe', img: '/img/massinissa.jpg', alt: 'ماسينيسا، ملك النوميديين', kicker: '؟ – 203 ق.م', title: 'صوفونيسبا', text: 'الأميرة التي اختارت السمّ بدل موكب نصر سكيبيو.' },
        { to: '/guerre-des-mercenaires', img: '/img/rochegrosse-bataille-macar.jpg', alt: 'معركة نهر ماكار، لوحة مائية لروشغروس', kicker: '241–237 ق.م', title: 'حرب المرتزقة', text: 'الصراع الحقيقي وراء «سالامبو».' },
        { to: '/tunisie', img: '/img/ruins.jpg', alt: 'أطلال قرطاج', kicker: 'اليوم', title: 'قرطاج تحيا في تونس', text: 'اسم وشعار وبلدية في تونس الكبرى.' },
        { to: '/lieux', img: '/img/hannibal-mo.jpg', alt: 'الشارع الرئيسي، هانيبال (ميزوري)', kicker: 'رحلة', title: 'أماكن قرطاج', text: 'من قرطاجنة إلى ترازيمينو، وحتى ميزوري.' },
        { to: '/histoire-des-vainqueurs', img: '/img/scipio.jpg', alt: 'تمثال نصفي لسكيبيو الإفريقي', kicker: 'المصادر', title: 'التاريخ الذي كتبه المنتصر', text: 'لماذا تأتينا صورة قرطاج من روما.' }
      ]
    }
  }
}

const c = await useLocalized('heritage', C)

const domains = computed(() => [
  { key: 'all', label: c.value.filter.all },
  ...DOMAINS.map(k => ({ key: k, label: c.value.domains[k] }))
])
const visibleCount = computed(() => (filter.value === 'all' ? DOMAINS.length : 1))

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-title { font-size: clamp(40px, 5.2vw, 80px); overflow-wrap: break-word; }

.keyfig { display: flex; flex-direction: column; }
.keyfig .num { margin: 4px 0 10px; }
.small { font-size: 14px; line-height: 1.5; }

.filter-sec { padding-top: clamp(32px, 4vw, 48px); }
.filter-sec .kicker { margin-bottom: 14px; }

.gap-top { margin-top: var(--gap); }
.sec-tight { padding-top: var(--gap); }

.blk-h { margin: 6px 0 22px; font-size: clamp(26px, 2.6vw, 38px); }
.para + .para { margin-top: 12px; }

.tall-fig { min-height: 520px; }
.tiepolo-fig { min-height: 640px; }
.poster-fig { min-height: 680px; }

.row-link { display: inline-block; margin-inline-start: 6px; font-weight: 600; white-space: nowrap; }
.tile--ink .row-link, .tile--navy .row-link { color: var(--gold-light); }
.tile--ink .rows .val { color: var(--on-dark); }
.tile--ink .rows .val b { color: var(--white); }
.light-val { color: rgba(255, 255, 255, 0.86); }
.light-val b { color: var(--white); }
.tile--navy .rows .key { color: var(--navy-tint); }
.fact-key { font-size: 17px; line-height: 1.2; }
.small-val { font-size: 15px; }
.facts { margin-top: 22px; }

.feat { min-height: 340px; }
.feat .btn, .tile--stack > .btn { align-self: flex-start; }

.incipit {
  margin: 22px 0 0;
  padding-inline-start: 18px;
  border-inline-start: 3px solid rgba(255, 255, 255, 0.5);
}
.incipit p { font: italic 500 clamp(17px, 1.5vw, 21px)/1.45 Georgia, serif; color: var(--white); margin: 0; }
.incipit .incipit-tr { font: 400 15px/1.5 var(--font-body); color: var(--terra-soft); margin-top: 6px; }
.incipit footer { font: 600 13px/1.3 var(--font-body); color: rgba(255, 255, 255, 0.8); margin-top: 8px; }

.stack { display: flex; flex-direction: column; gap: var(--gap); }
.grow { flex: 1; }

.quote { margin: 0; }
.quote blockquote { margin: 8px 0 14px; }
.q-orig { font: italic 600 clamp(22px, 2.2vw, 30px)/1.25 Georgia, serif; color: var(--purple); margin: 0; }
.q-tr { font: 400 16px/1.5 var(--font-body); margin: 10px 0 0; }
.q-tr:empty { display: none; }
.q-cite { font: 600 13px/1.3 var(--font-body); color: var(--muted); }

.lat { font: italic 600 clamp(18px, 1.6vw, 22px)/1.35 Georgia, serif; margin: 0; }
.tile--terra .lat { color: var(--white); }
.livy { margin: 0; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, 0.18); }
.livy .lat { color: var(--gold-light); margin-bottom: 8px; }

.also { margin: 8px 0 0; padding-inline-start: 18px; display: flex; flex-direction: column; gap: 12px; }
.also li { color: var(--gold-ink); }

.play-h { margin-bottom: 18px; }

.watermark {
  position: absolute;
  inset-inline-end: -10px;
  bottom: -20px;
  font: 700 clamp(110px, 14vw, 200px)/1 var(--font-ar);
  color: rgba(255, 255, 255, 0.06);
  pointer-events: none;
  white-space: nowrap;
}
.tile--navy > .blk-h, .tile--navy > .rows { position: relative; }

.expr { min-height: 300px; }
.expr-lat { font: italic 700 clamp(24px, 2.3vw, 32px)/1.1 Georgia, serif; margin: 0 0 10px; }
.tile--ink .expr-lat { color: var(--gold-light); }
.tile--paper .expr-lat, .expr:not([class*="tile--"]) .expr-lat { color: var(--purple); }
.expr-mean { font: 700 16px/1.4 var(--font-body); margin: 0 0 12px; }
.tile .expr-mean { color: inherit; }
.expr-link { display: inline-flex; align-items: center; min-height: 44px; font: 600 15px/1 var(--font-body); color: inherit; text-decoration: underline; text-underline-offset: 3px; }
.expr-link:hover { color: inherit; opacity: 0.8; }

.topo { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 24px 40px; align-items: end; }
.topo-side { display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }

.more-title { margin-bottom: clamp(20px, 2.4vw, 32px); }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 960px) {
  .tall-fig { min-height: 420px; }
  .tiepolo-fig, .poster-fig { min-height: 560px; }
  .topo { grid-template-columns: minmax(0, 1fr); }
  .feat, .expr { min-height: 0; }
}

@media (max-width: 640px) {
  .tall-fig { min-height: 320px; }
  .tiepolo-fig, .poster-fig { min-height: 460px; }
  .keyfig .num { font-size: 34px; }
  .row-link { white-space: normal; }
}
</style>
