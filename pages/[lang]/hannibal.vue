<template>
  <div class="pg">
    <!-- Héros -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--ink tile--stack tile--hero s-7">
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display hero-title">{{ c.hero.title1 }}<br>{{ c.hero.title2 }}</h1>
          <p class="epithet">{{ c.hero.epithet }}</p>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
        <p class="hero-note">{{ c.hero.note }}</p>
      </div>
      <figure class="fig fig--hero s-5 hero-fig">
        <img src="/img/hannibal-bust.jpg" :alt="c.hero.alt" style="object-position:50% 25%">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Chiffres -->
    <div class="cols cols-4 keep-2">
      <div v-for="(s, i) in c.stats" :key="i" class="tile stat" :class="{ 'tile--purple': i === 2 }">
        <div class="num">{{ s.n }}</div>
        <p class="stat-t">{{ s.t }}</p>
      </div>
    </div>

    <!-- Le serment -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig oath-fig">
          <img src="/img/oath.jpg" :alt="c.oath.alt" loading="lazy">
          <figcaption>{{ c.oath.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--sand tile--stack">
          <div>
            <span class="kicker">{{ c.oath.kicker }}</span>
            <h2 class="h-block">{{ c.oath.title }}</h2>
            <p class="body-lg mt">{{ c.oath.text }}</p>
          </div>
          <blockquote class="quote">
            <p>« {{ c.oath.quote }} »</p>
            <cite>{{ c.oath.cite }}</cite>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- Une vie -->
    <section class="sec">
      <div class="tile tile--xl tile--ink">
        <span class="kicker">{{ c.life.kicker }}</span>
        <h2 class="h-section life-title">{{ c.life.title }}</h2>
        <div class="rows" style="--row-key:190px">
          <div v-for="r in c.life.rows" :key="r.k">
            <span class="key">{{ r.k }}</span>
            <span class="val">{{ r.v }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Ce que Rome tait -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--purple tile--stack">
          <div>
            <span class="kicker">{{ c.rome.kicker }}</span>
            <h2 class="h-block">{{ c.rome.title }}</h2>
            <p v-for="p in c.rome.paras" :key="p" class="body-lg mt">{{ p }}</p>
          </div>
          <div class="myth">
            <strong>{{ c.rome.mythLabel }}</strong>
            <p class="body">{{ c.rome.mythText }}</p>
          </div>
        </div>
        <div class="tile tile--xl tile--gold tile--stack">
          <div>
            <span class="kicker">{{ c.rome.histKicker }}</span>
            <h3 class="h-card">{{ c.rome.histTitle }}</h3>
            <p class="body">{{ c.rome.histText }}</p>
          </div>
          <NuxtLink :to="localePath('/histoire-des-vainqueurs')" class="btn btn-outline">{{ c.rome.histCta }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Le tracé du destin : carte -->
    <section class="sec">
      <div class="sec-head">
        <h2 class="h-section">{{ c.map.title }}</h2>
        <p>{{ c.map.aside }}</p>
      </div>
      <MapsAnimatedMap compact initial-mode="hann" :modes="['hann', 'all']" />
    </section>
    <div class="cols cols-3 stages">
      <div class="tile tile--stack">
        <div>
          <span class="kicker">{{ c.map.stages[0].k }}</span>
          <h3 class="h-card">{{ c.map.stages[0].t }}</h3>
          <p class="body">{{ c.map.stages[0].d }}</p>
        </div>
      </div>
      <div class="card-img tile--ink">
        <img src="/img/turner-snow.jpg" :alt="c.map.turnerAlt" loading="lazy">
        <div class="card-body">
          <span class="kicker">{{ c.map.stages[1].k }}</span>
          <h3 class="h-card">{{ c.map.stages[1].t }}</h3>
          <p>{{ c.map.stages[1].d }}</p>
        </div>
      </div>
      <div class="tile tile--stack">
        <div>
          <span class="kicker">{{ c.map.stages[2].k }}</span>
          <h3 class="h-card">{{ c.map.stages[2].t }}</h3>
          <p class="body">{{ c.map.stages[2].d }}</p>
        </div>
      </div>
    </div>

    <!-- L'art de l'annihilation -->
    <section class="sec">
      <div class="sec-head">
        <h2 class="h-section">{{ c.battles.title }}</h2>
        <NuxtLink :to="localePath('/tactiques')" class="btn btn-outline">{{ c.battles.cta }}</NuxtLink>
      </div>
    </section>
    <div class="bento">
      <figure class="fig s-7 cannae-fig">
        <img src="/img/cannae.jpg" :alt="c.battles.cannaeAlt" loading="lazy">
        <figcaption>{{ c.battles.cannaeCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--terra s-5">
        <span class="kicker">{{ c.battles.cannae.k }}</span>
        <h3 class="h-block">{{ c.battles.cannae.t }}</h3>
        <p class="body-lg mt">{{ c.battles.cannae.d }}</p>
        <div class="rows rows--light cannae-rows" style="--row-key:120px">
          <div v-for="r in c.battles.cannae.rows" :key="r.k">
            <span class="key">{{ r.k }}</span>
            <span class="val">{{ r.v }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cols cols-3">
      <div v-for="b in c.battles.items" :key="b.t" :class="b.img ? 'card-img' : 'tile'">
        <img v-if="b.img" :src="b.img" :alt="b.alt" loading="lazy">
        <div :class="{ 'card-body': b.img }">
          <span class="kicker">{{ b.k }}</span>
          <h3 class="h-card">{{ b.t }}</h3>
          <p :class="{ body: !b.img }">{{ b.d }}</p>
        </div>
      </div>
    </div>
    <div class="cols cols-2 links-2">
      <NuxtLink :to="localePath('/tactiques')" class="tile tile--xl tile--ink cta">
        <div>
          <span class="kicker">{{ c.battles.tactK }}</span>
          <h3 class="h-block cta-t">{{ c.battles.tactT }}</h3>
        </div>
        <span class="cta-arrow" aria-hidden="true">→</span>
      </NuxtLink>
      <NuxtLink :to="localePath('/elephants')" class="tile tile--xl tile--gold cta">
        <div>
          <span class="kicker">{{ c.battles.eleK }}</span>
          <h3 class="h-block cta-t">{{ c.battles.eleT }}</h3>
        </div>
        <span class="cta-arrow" aria-hidden="true">→</span>
      </NuxtLink>
    </div>

    <!-- Devant Rome, 211 -->
    <section id="devant-rome" class="sec sec--wide">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.gates.kicker }}</span>
          <h2 class="h-section">{{ c.gates.title }}</h2>
        </div>
        <p>{{ c.gates.intro }}</p>
      </div>
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.gates.rowsKicker }}</span>
          <div class="rows" style="--row-key:150px">
            <div v-for="(r, i) in c.gates.rows" :key="i">
              <span class="key">{{ r.k }}</span>
              <span class="val">{{ r.v }}</span>
            </div>
          </div>
        </div>
        <div class="gates-side">
          <div class="tile tile--xl tile--paper tile--outline">
            <span class="kicker">{{ c.gates.quoteKicker }}</span>
            <blockquote class="gates-quote">
              <p lang="la">« Vincere scis, Hannibal ; victoria uti nescis. »</p>
            </blockquote>
            <p class="body">{{ c.gates.quote }}</p>
          </div>
          <div class="tile tile--terra">
            <span class="kicker">{{ c.gates.whyKicker }}</span>
            <ul class="gates-list">
              <li v-for="(w, i) in c.gates.why" :key="i">{{ w }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="cols cols-2 cols--flush gates-foot">
        <div class="tile tile--sand">
          <span class="kicker">{{ c.gates.fulviusKicker }}</span>
          <h3 class="h-card">{{ c.gates.fulviusTitle }}</h3>
          <p class="body">{{ c.gates.fulvius }}</p>
        </div>
        <div class="tile tile--navy">
          <span class="kicker">{{ c.gates.sourcesKicker }}</span>
          <h3 class="h-card">{{ c.gates.sourcesTitle }}</h3>
          <p class="body">{{ c.gates.sources }}</p>
          <NuxtLink :to="localePath('/histoire-des-vainqueurs')" class="btn btn-outline gates-btn">{{ c.gates.sourcesCta }} {{ locale === 'ar' ? '←' : '→' }}</NuxtLink>
        </div>
      </div>
      <AltReading v-bind="c.gates.alt" />
    </section>

    <!-- Zama -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig zama-fig">
          <img src="/img/zama.jpg" :alt="c.zama.alt" loading="lazy">
          <figcaption>{{ c.zama.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl">
          <span class="kicker">{{ c.zama.kicker }}</span>
          <h2 class="h-block">{{ c.zama.title }}</h2>
          <p class="body-lg mt">{{ c.zama.intro }}</p>
          <div class="rows zama-rows" style="--row-key:170px">
            <div v-for="r in c.zama.rows" :key="r.k">
              <span class="key">{{ r.k }}</span>
              <span class="val">{{ r.v }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Après Zama -->
    <section class="sec sec--wide">
      <h2 class="h-section sec-title">{{ c.after.title }}</h2>
    </section>
    <div class="cols cols-3">
      <div v-for="(a, i) in c.after.items" :key="a.t" class="tile tile--stack" :class="['', 'tile--navy', 'tile--ink'][i]">
        <div>
          <span class="kicker">{{ a.k }}</span>
          <h3 class="h-card">{{ a.t }}</h3>
          <p v-for="p in a.d" :key="p" class="body para">{{ p }}</p>
        </div>
      </div>
    </div>

    <!-- Citations -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig rings-fig">
          <img src="/img/hannibal-tunisia.jpg" :alt="c.quotes.alt" loading="lazy" style="object-position:50% 15%">
          <figcaption class="cap-box">{{ c.quotes.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--paper tile--outline">
          <span class="kicker">{{ c.quotes.kicker }}</span>
          <h2 class="h-block">{{ c.quotes.title }}</h2>
          <div class="qlist">
            <blockquote v-for="q in c.quotes.items" :key="q.q" class="quote">
              <p>« {{ q.q }} »</p>
              <cite>{{ q.a }}</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <!-- Héritage -->
    <section class="sec sec--wide">
      <h2 class="h-section sec-title">{{ c.legacy.title }}</h2>
    </section>
    <div class="cols cols-3">
      <div class="card-img">
        <img src="/img/goya.jpg" :alt="c.legacy.goyaAlt" loading="lazy">
        <div class="card-body">
          <span class="kicker">{{ c.legacy.items[0].k }}</span>
          <h3 class="h-card">{{ c.legacy.items[0].t }}</h3>
          <p>{{ c.legacy.items[0].d }}</p>
        </div>
      </div>
      <div class="tile tile--stack">
        <div>
          <span class="kicker">{{ c.legacy.items[1].k }}</span>
          <h3 class="h-card">{{ c.legacy.items[1].t }}</h3>
          <p class="body">{{ c.legacy.items[1].d }}</p>
        </div>
      </div>
      <div class="tile tile--purple tile--stack">
        <div>
          <span class="kicker">{{ c.legacy.items[2].k }}</span>
          <h3 class="h-card">{{ c.legacy.items[2].t }}</h3>
          <p class="body">{{ c.legacy.items[2].d }}</p>
        </div>
      </div>
    </div>

    <!-- Précédent / suivant -->
    <section class="sec">
      <div class="cols cols-2 cols--flush">
        <NuxtLink :to="localePath('/hamilcar')" class="tile nav-tile">
          <span class="kicker">{{ c.nav.prev }}</span>
          <span class="h-card">Hamilcar Barca</span>
        </NuxtLink>
        <NuxtLink :to="localePath('/hasdrubal')" class="tile nav-tile nav-next">
          <span class="kicker">{{ c.nav.next }}</span>
          <span class="h-card">{{ c.nav.nextName }}</span>
        </NuxtLink>
      </div>
    </section>

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <h2 class="h-section sec-title">{{ c.more.title }}</h2>
    </section>
    <div class="cols cols-3">
      <NuxtLink v-for="m in c.more.items" :key="m.to" :to="localePath(m.to)" class="tile tile--stack more-tile" :class="m.tone">
        <div>
          <span class="kicker">{{ m.k }}</span>
          <h3 class="h-card">{{ m.t }}</h3>
          <p class="body">{{ m.d }}</p>
        </div>
        <span class="more-link">{{ c.more.go }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale, localePath } = useI18n()

const C = {
  fr: {
    meta: {
      title: 'Hannibal Barca (247–183 av. J.-C.)',
      desc: "Hannibal Barca : le serment, les Alpes, la Trébie, Trasimène, Cannes, Zama, l'exil et la mort à Libyssa. La vie du stratège de Carthage."
    },
    hero: {
      chip: 'Biographie · 247–183 av. J.-C.',
      title1: 'Hannibal',
      title2: 'Barca',
      epithet: 'Le stratège de Carthage',
      lede: "Fils d'Hamilcar, il franchit les Alpes avec ses éléphants et resta seize ans en Italie sans perdre une bataille rangée. Rome ne l'oublia jamais.",
      note: "Note — Tout ce que l'on sait d'Hannibal vient d'auteurs grecs et romains, écrits du côté du vainqueur. Nous les citons en les lisant de près.",
      alt: "Buste présumé d'Hannibal",
      caption: "Buste présumé d'Hannibal — Musée archéologique de Naples"
    },
    stats: [
      { n: '16', t: "ans de campagne en Italie (218–203), selon le compte des Anciens" },
      { n: '0', t: "défaite en bataille rangée en Italie" },
      { n: '~70 000', t: 'Romains tués à Cannes selon Polybe (48 200 selon Tite-Live)' },
      { n: '37', t: "éléphants au départ d'Espagne, en 218" }
    ],
    oath: {
      alt: "Benjamin West — Le serment d'Hannibal",
      caption: "Benjamin West — Hannibal enfant jurant haine à Rome (1770)",
      kicker: '237 av. J.-C. · Carthage',
      title: 'Le serment',
      text: "Avant de partir pour l'Espagne, Hamilcar offre un sacrifice. Son fils de neuf ans le supplie de l'emmener ; le père accepte, à une condition : la main sur l'autel, l'enfant jure de ne jamais être l'ami des Romains. Hannibal lui-même raconta la scène, des décennies plus tard, au roi Antiochos III.",
      quote: "Dès qu'il le pourrait, il serait l'ennemi du peuple romain.",
      cite: 'Tite-Live, XXI, 1 — voir aussi Polybe, III, 11'
    },
    life: {
      kicker: 'Chronologie',
      title: 'Une vie en dates',
      rows: [
        { k: '247', v: "Naissance à Carthage. Son père Hamilcar Barca commande alors en Sicile, pendant la première guerre punique." },
        { k: '237', v: "Le serment, puis le départ pour l'Espagne avec son père, qui y bâtit une puissance barcide." },
        { k: '229/228', v: "Mort d'Hamilcar, noyé en combattant les Ibères. Son gendre Hasdrubal le Beau prend le commandement et fonde Carthagène." },
        { k: '221', v: "Hasdrubal est assassiné. Acclamé par l'armée, Hannibal prend le commandement à 26 ans." },
        { k: '219', v: "Siège et prise de Sagonte, alliée de Rome, après huit mois : c'est le déclenchement de la deuxième guerre punique." },
        { k: '218', v: "Départ de Carthagène au printemps ; Pyrénées, Rhône, puis traversée des Alpes à l'automne. Victoires du Tessin et de la Trébie." },
        { k: '217', v: "Embuscade du lac Trasimène : le consul Flaminius est tué." },
        { k: '216', v: "Cannes, le 2 août. Capoue et une partie de l'Italie du Sud passent du côté de Carthage." },
        { k: '211', v: "Marche sur Rome pour dégager Capoue assiégée : « Hannibal ad portas ». Rome ne tombe pas, et Capoue est reprise par les Romains." },
        { k: '207', v: "Son frère Hasdrubal, venu d'Espagne avec des renforts, est tué au Métaure ; sa tête est jetée devant le camp d'Hannibal." },
        { k: '203', v: "Rappelé en Afrique pour défendre Carthage face à Scipion." },
        { k: '202', v: "Défaite de Zama. Hannibal conseille lui-même d'accepter la paix." },
        { k: '196', v: "Élu suffète, il réforme les finances et les institutions de Carthage." },
        { k: '195', v: "Menacé par ses adversaires et par Rome, il s'exile auprès d'Antiochos III." },
        { k: '190–184', v: "Défaite navale de l'Eurymédon ; refuges en Crète, en Arménie, puis en Bithynie chez le roi Prusias." },
        { k: '183', v: "Encerclé à Libyssa, sur la côte de Bithynie, il s'empoisonne plutôt que d'être livré aux Romains." }
      ]
    },
    rome: {
      kicker: 'Lire les sources',
      title: 'Ce que Rome ne raconte pas',
      paras: [
        "Nos récits viennent de Polybe, ami des Scipions, et de Tite-Live, qui écrit sous Auguste. Tous deux admirent Hannibal, mais Rome y reste le héros : Hannibal est « cruel », « perfide » — des accusations que ses ennemis portaient contre tous les Carthaginois.",
        "Seize ans en Italie avec peu de renforts : la faction d'Hannon le Grand, à Carthage, s'opposait à la guerre, et l'essentiel des troupes envoyées partit en Espagne. Hannibal dut nourrir et payer son armée sur place."
      ],
      mythLabel: 'Le mythe de la défaite',
      mythText: "Hannibal n'a jamais perdu de bataille rangée en Italie. Rome ne le vainquit qu'en évitant de le combattre, puis en portant la guerre en Espagne et en Afrique.",
      histKicker: 'Sources perdues',
      histTitle: 'Les historiens d’Hannibal',
      histText: "Deux Grecs accompagnaient Hannibal et écrivirent son histoire : Silénos de Calé Acté et Sosylos de Sparte, qui lui avait appris le grec. Leurs livres sont perdus ; il ne nous reste que la version des vainqueurs.",
      histCta: "L'histoire écrite par le vainqueur →"
    },
    map: {
      title: 'Le tracé du destin',
      aside: "De Carthagène à Cannes : suivez la campagne d'Hannibal sur la carte animée, puis la carte des alliés.",
      turnerAlt: "Turner — Tempête de neige : Hannibal et son armée traversant les Alpes",
      stages: [
        { k: 'Printemps 218 · Ibérie', t: "De Carthagène à l'Èbre", d: "Selon Polybe, Hannibal part avec environ 90 000 fantassins et 12 000 cavaliers. Après les Pyrénées, il lui reste environ 50 000 fantassins, 9 000 cavaliers et 37 éléphants." },
        { k: 'Automne 218 · Alpes', t: 'La traversée', d: "Une quinzaine de jours dans la neige, sous les attaques des montagnards. Il arrive en Italie avec environ 20 000 fantassins et 6 000 cavaliers." },
        { k: '218–203 · Italie', t: 'Seize ans en terre ennemie', d: "Rallié par les Gaulois de la plaine du Pô, il descend la péninsule, écrase trois armées romaines et tient le sud de l'Italie jusqu'en 203." }
      ]
    },
    battles: {
      title: "L'art de l'annihilation",
      cta: 'Les tactiques en schémas →',
      cannaeAlt: 'John Trumbull — La mort de Paul Émile à Cannes',
      cannaeCap: 'J. Trumbull — La mort de Paul Émile à Cannes (1773)',
      cannae: {
        k: '2 août 216 av. J.-C. · Apulie',
        t: 'Cannes',
        d: "Le centre gaulois et ibère recule volontairement en arc de cercle ; l'infanterie libyenne se referme sur les flancs, la cavalerie d'Hasdrubal ferme le piège par l'arrière. Le double enveloppement le plus célèbre de l'histoire.",
        rows: [
          { k: '~86 000', v: 'Romains et alliés engagés (8 légions)' },
          { k: '~50 000', v: "hommes dans l'armée d'Hannibal" },
          { k: '48 000–70 000', v: "Romains tués ; le consul Paul Émile parmi eux" }
        ]
      },
      items: [
        { k: 'Novembre 218', t: 'Le Tessin', d: "Premier choc de cavalerie en Italie : la cavalerie numide déborde les Romains. Le consul Publius Scipion est blessé, sauvé par son fils — le futur Africain." },
        { k: 'Décembre 218', t: 'La Trébie', d: "Hannibal attire les légions dans la rivière glacée ; Magon, caché avec 2 000 hommes, surgit dans leur dos. Environ 10 000 Romains seulement parviennent à percer." },
        { img: '/img/trasimeno.jpg', alt: 'Le lac Trasimène', k: 'Juin 217', t: 'Trasimène', d: "Dans le brouillard, entre collines et lac, l'armée de Flaminius est prise en colonne de marche : 15 000 tués, autant de prisonniers, le consul tué." }
      ],
      tactK: 'Schémas animés',
      tactT: 'Voir Cannes, la Trébie et Zama manœuvre par manœuvre',
      eleK: '37 éléphants · 218',
      eleT: 'Les éléphants et la traversée des Alpes'
    },
    gates: {
      kicker: '211 av. J.-C.',
      title: "Pourquoi Hannibal n'est-il pas entré dans Rome ?",
      intro: "Après Cannes, Rome semblait à sa merci. Cinq ans plus tard, il campe à ses portes. Pourtant, aucune source antique, même grecque, ne le fait entrer dans la ville. Voici ce que l'on sait.",
      rowsKicker: 'Aux portes de Rome',
      rows: [
        { k: 'Août 216', v: "Après Cannes, Maharbal presse Hannibal de marcher sur Rome, à environ 400 km. Hannibal refuse : il veut d'abord détacher les alliés italiens de Rome." },
        { k: '216 – 211', v: "Capoue, Tarente et une partie du Sud passent de son côté. Rome lève de nouvelles légions et reprend l'offensive : en 211, elle assiège Capoue." },
        { k: 'Printemps 211', v: "Pour dégager Capoue, Hannibal marche sur Rome. Il campe sur l'Anio, à environ trois milles (4,5 km) des murailles." },
        { k: 'Devant la porte Colline', v: "Avec 2 000 cavaliers, il s'approche jusqu'aux murs pour les observer (Tite-Live). Deux légions fraîchement levées sont dans la ville." },
        { k: 'Deux jours', v: "Selon Tite-Live, les armées se rangent en bataille deux jours de suite, et deux fois un violent orage les sépare." },
        { k: 'La retraite', v: "Rome n'a pas levé le siège de Capoue : la manœuvre a échoué. Hannibal repart vers le sud, et Capoue tombe peu après." }
      ],
      quoteKicker: 'Maharbal à Hannibal, après Cannes',
      quote: "« Tu sais vaincre, Hannibal ; tu ne sais pas profiter de ta victoire » (Tite-Live, XXII, 51). Tite-Live ajoute que ce jour de retard sauva Rome. Beaucoup d'historiens modernes pensent au contraire qu'Hannibal avait raison de ne pas tenter le siège.",
      whyKicker: 'Pourquoi il ne pouvait pas la prendre',
      why: [
        "Pas de machines de siège : son armée était faite pour la bataille rangée, pas pour assiéger une grande ville.",
        "Des murailles de plus de 10 km et une population capable d'armer de nouvelles légions.",
        "Une armée d'environ 40 000 hommes, loin de ses bases, sans renforts réguliers par mer.",
        "Sa stratégie visait les alliances de Rome, pas la ville : il voulait une paix imposée, pas une conquête."
      ],
      fulviusKicker: 'Un général condamné',
      fulviusTitle: "Le procès de Cnaeus Fulvius",
      fulvius: "On évoque parfois un général romain puni « après l'arrivée d'Hannibal ». Il s'agit sans doute du préteur Cnaeus Fulvius Flaccus, battu par Hannibal à Herdonea, en Apulie, et poursuivi en 211 : il s'exile avant le verdict (Tite-Live, XXVI, 2-3). Il était jugé pour la perte de son armée, pas pour la chute de Rome. À l'inverse, le consul Varron, vaincu à Cannes, fut remercié par le Sénat pour « ne pas avoir désespéré de la République ».",
      sourcesKicker: 'Les limites des sources',
      sourcesTitle: 'Un récit écrit par Rome',
      sources: "Notre récit vient de Polybe, ami des Scipions, et de Tite-Live, historien de la gloire romaine ; les historiens d'Hannibal, Silènos et Sosylos, sont perdus. Il faut donc lire ces textes avec prudence. Mais une prise de Rome aurait laissé des traces impossibles à effacer : les consuls, le Sénat et les comices fonctionnent sans interruption pendant toute la guerre.",
      sourcesCta: "L'histoire écrite par le vainqueur",
      alt: {
        badge: "Une autre lecture — le point de vue de l'auteur du site",
        title: 'Et si Hannibal était entré dans Rome ?',
        thesis: [
          "Pour l'auteur de ce site, Hannibal est bien entré dans Rome, sans combat et sans destruction, avec ses éléphants. Ce sont des habitants de la ville, qui l'estimaient, qui lui en auraient ouvert l'accès.",
          "L'argument principal : un général romain a été condamné après l'arrivée d'Hannibal. Si Rome avait vraiment résisté, pourquoi punir l'un de ses chefs ? Selon cette lecture, les historiens romains auraient inversé le récit pour effacer une humiliation."
        ],
        answerTitle: "Ce qu'en disent les sources et les historiens",
        answer: [
          "Aucun texte antique, pas même les historiens grecs favorables à Hannibal, ne le fait entrer dans Rome.",
          "En 211, Hannibal n'a presque plus d'éléphants en Italie : selon Polybe, un seul avait survécu à l'hiver 218.",
          "Le général condamné, Cnaeus Fulvius, était jugé pour sa défaite à Herdonea, en Apulie. Rome poursuivait souvent ses généraux vaincus, sans que la ville soit tombée.",
          "Consuls, Sénat et élections fonctionnent sans interruption de 218 à 201 : une prise de Rome aurait brisé cette continuité."
        ]
      }
    },
    zama: {
      alt: 'La bataille de Zama',
      caption: 'Cornelis Cort, d’après Giulio Romano — La bataille de Zama',
      kicker: '202 av. J.-C. · Afrique',
      title: 'Zama : le renversement',
      intro: "Rome ne vainquit Hannibal qu'en Afrique, après avoir retourné contre Carthage son meilleur atout : la cavalerie numide.",
      rows: [
        { k: '204–203', v: "Scipion débarque près d'Utique ; Carthage rappelle Hannibal d'Italie." },
        { k: 'Massinissa', v: "Prince numide, il avait combattu pour Carthage en Espagne. Écarté au profit de son rival Syphax, allié de Carthage, il passe à Rome en 206 et amène à Zama environ 4 000 cavaliers." },
        { k: 'La bataille', v: "Les 80 éléphants d'Hannibal sont canalisés par des couloirs ménagés entre les manipules. La cavalerie romaine et numide, revenue de la poursuite, prend à revers les vétérans d'Hannibal." },
        { k: 'Le bilan', v: "Environ 20 000 morts et autant de prisonniers côté carthaginois selon Polybe. Hannibal pousse lui-même le Conseil à accepter la paix." }
      ]
    },
    after: {
      title: 'Après Zama : suffète, exil, mort',
      items: [
        { k: '196 av. J.-C. · Carthage', t: 'Le suffète réformateur', d: [
          "Élu suffète, Hannibal limite à un an le mandat des juges du tribunal des Cent-Quatre, jusque-là à vie, et traque les détournements des deniers publics.",
          "Résultat : Carthage peut payer l'indemnité due à Rome sans impôt nouveau. Ses ennemis politiques le dénoncent à Rome."
        ] },
        { k: '195–184 · Orient', t: "L'exil", d: [
          "Il fuit par Tyr jusqu'à la cour d'Antiochos III, qu'il conseille contre Rome. En 190, il commande une flotte séleucide battue par les Rhodiens à l'Eurymédon.",
          "La paix d'Apamée exige qu'on le livre : il passe en Crète, en Arménie auprès du roi Artaxias, puis en Bithynie, où il bat la flotte de Pergame en lançant sur ses navires des jarres pleines de serpents (Cornélius Népos)."
        ] },
        { k: '183 av. J.-C. · Libyssa', t: 'La mort', d: [
          "Rome envoie Flamininus réclamer le vieux général ; les soldats du roi Prusias cernent sa maison de Libyssa, près de l'actuelle Gebze, en Turquie.",
          "Hannibal prend le poison qu'il gardait, dit-on, dans le chaton de sa bague. Il avait environ 64 ans."
        ] }
      ]
    },
    quotes: {
      alt: 'Sébastien Slodtz — Hannibal comptant les anneaux',
      caption: "Sébastien Slodtz — Hannibal comptant les anneaux des chevaliers romains tombés à Cannes (1704), Louvre. Magon en répandit plus d'un boisseau dans le Conseil de Carthage.",
      kicker: 'Sources antiques',
      title: 'Ce que disaient les Anciens',
      items: [
        { q: "Il était le premier à entrer au combat, le dernier à en sortir.", a: 'Tite-Live, XXI, 4' },
        { q: "Tu sais vaincre, Hannibal ; tu ne sais pas profiter de la victoire.", a: 'Maharbal au soir de Cannes — Tite-Live, XXII, 51' },
        { q: "Pendant seize ans, il garda une armée de tant de peuples sans une seule révolte contre lui.", a: 'Polybe, XI, 19' },
        { q: "Délivrons les Romains de leur longue inquiétude, puisqu'ils trouvent trop long d'attendre la mort d'un vieillard.", a: "Dernières paroles — Tite-Live, XXXIX, 51" },
        { q: "Je trouverai un chemin, ou j'en ferai un.", a: 'Attribué à Hannibal devant les Alpes (tradition tardive)' }
      ]
    },
    legacy: {
      title: "L'héritage",
      goyaAlt: "Goya — Hannibal vainqueur contemple l'Italie depuis les Alpes",
      items: [
        { k: 'Dans l’art', t: 'Goya, Turner, David', d: "Goya (1771) le peint découvrant l'Italie du haut des Alpes, Turner (1812) dans la tempête de neige ; dans Bonaparte franchissant le Grand-Saint-Bernard (1801), David grave son nom sur un rocher, sous celui de Bonaparte." },
        { k: 'Dans les écoles de guerre', t: 'Cannes, modèle absolu', d: "West Point, Sandhurst et les académies du monde entier étudient encore Cannes. Au début du XXe siècle, le chef d'état-major allemand Schlieffen en fit le modèle de la bataille d'anéantissement." },
        { k: 'Admiration', t: 'Napoléon', d: "Napoléon plaçait Hannibal parmi les plus grands capitaines de l'histoire, aux côtés d'Alexandre et de César, et admirait sa traversée des Alpes, qu'il refit en 1800." }
      ]
    },
    nav: { prev: '← Précédent', next: 'Suivant →', nextName: 'Hasdrubal Barca' },
    more: {
      title: 'À lire aussi',
      go: 'Lire →',
      items: [
        { to: '/guerres-puniques', tone: 'tile--terra', k: '264–146 av. J.-C.', t: 'Les guerres puniques', d: 'Trois guerres, cent vingt ans de duel entre Carthage et Rome.' },
        { to: '/armee', tone: '', k: 'Armée', t: "L'armée de Carthage", d: 'Libyens, Numides, Ibères, Gaulois, frondeurs baléares : qui combattait pour Hannibal.' },
        { to: '/carte', tone: 'tile--navy', k: 'Carte animée', t: 'Carthage sur la carte', d: 'Territoires, campagne d’Hannibal, voyages et alliés en animation.' }
      ]
    }
  },
  en: {
    meta: {
      title: 'Hannibal Barca (247–183 BC)',
      desc: 'Hannibal Barca: the oath, the Alps, the Trebia, Trasimene, Cannae, Zama, exile and death at Libyssa. The life of Carthage’s strategist.'
    },
    hero: {
      chip: 'Biography · 247–183 BC',
      title1: 'Hannibal',
      title2: 'Barca',
      epithet: 'The strategist of Carthage',
      lede: 'Son of Hamilcar, he crossed the Alps with his elephants and spent sixteen years in Italy without losing a pitched battle. Rome never forgot him.',
      note: 'Note — Everything we know about Hannibal comes from Greek and Roman authors writing on the winning side. We quote them, and read them closely.',
      alt: 'Presumed bust of Hannibal',
      caption: 'Presumed bust of Hannibal — Naples Archaeological Museum'
    },
    stats: [
      { n: '16', t: 'years of campaigning in Italy (218–203), as the ancients counted' },
      { n: '0', t: 'pitched battles lost in Italy' },
      { n: '~70,000', t: 'Romans killed at Cannae according to Polybius (48,200 according to Livy)' },
      { n: '37', t: 'elephants when he left Spain in 218' }
    ],
    oath: {
      alt: "Benjamin West — Hannibal's oath",
      caption: 'Benjamin West — The young Hannibal swearing enmity to Rome (1770)',
      kicker: '237 BC · Carthage',
      title: 'The oath',
      text: 'Before leaving for Spain, Hamilcar offered a sacrifice. His nine-year-old son begged to go with him; the father agreed on one condition: with his hand on the altar, the boy swore never to be a friend of the Romans. Hannibal himself told the story, decades later, to King Antiochus III.',
      quote: 'As soon as he could, he would be the enemy of the Roman people.',
      cite: 'Livy, XXI, 1 — see also Polybius, III, 11'
    },
    life: {
      kicker: 'Timeline',
      title: 'A life in dates',
      rows: [
        { k: '247', v: 'Born in Carthage. His father Hamilcar Barca was then commanding in Sicily, during the First Punic War.' },
        { k: '237', v: 'The oath, then departure for Spain with his father, who built a Barcid power base there.' },
        { k: '229/228', v: 'Hamilcar dies, drowned while fighting the Iberians. His son-in-law Hasdrubal the Fair takes command and founds Cartagena.' },
        { k: '221', v: 'Hasdrubal is assassinated. Acclaimed by the army, Hannibal takes command at 26.' },
        { k: '219', v: 'Siege and capture of Saguntum, an ally of Rome, after eight months: the trigger of the Second Punic War.' },
        { k: '218', v: 'Leaves Cartagena in spring; the Pyrenees, the Rhône, then the Alps in autumn. Victories at the Ticinus and the Trebia.' },
        { k: '217', v: 'The ambush at Lake Trasimene: the consul Flaminius is killed.' },
        { k: '216', v: 'Cannae, 2 August. Capua and part of southern Italy go over to Carthage.' },
        { k: '211', v: 'March on Rome to relieve besieged Capua: "Hannibal ad portas". The city does not fall — nor does Capua hold.' },
        { k: '207', v: 'His brother Hasdrubal, coming from Spain with reinforcements, is killed at the Metaurus; his head is thrown before Hannibal’s camp.' },
        { k: '203', v: 'Recalled to Africa to defend Carthage against Scipio.' },
        { k: '202', v: 'Defeat at Zama. Hannibal himself urges acceptance of peace.' },
        { k: '196', v: 'Elected suffete, he reforms Carthage’s finances and institutions.' },
        { k: '195', v: 'Threatened by his opponents and by Rome, he goes into exile at the court of Antiochus III.' },
        { k: '190–184', v: 'Naval defeat at the Eurymedon; refuge in Crete, Armenia, then Bithynia with King Prusias.' },
        { k: '183', v: 'Surrounded at Libyssa, on the Bithynian coast, he takes poison rather than be handed to the Romans.' }
      ]
    },
    rome: {
      kicker: 'Reading the sources',
      title: 'What Rome leaves out',
      paras: [
        'Our accounts come from Polybius, a friend of the Scipios, and from Livy, writing under Augustus. Both admire Hannibal, but Rome remains the hero: Hannibal is "cruel" and "treacherous" — charges his enemies laid against all Carthaginians.',
        'Sixteen years in Italy with few reinforcements: the faction of Hanno the Great in Carthage opposed the war, and most of the troops sent went to Spain. Hannibal had to feed and pay his army on the spot.'
      ],
      mythLabel: 'The myth of defeat',
      mythText: 'Hannibal never lost a pitched battle in Italy. Rome beat him only by refusing to fight him, then by carrying the war to Spain and Africa.',
      histKicker: 'Lost sources',
      histTitle: 'Hannibal’s historians',
      histText: 'Two Greeks travelled with Hannibal and wrote his history: Silenus of Kale Akte and Sosylus of Sparta, who had taught him Greek. Their books are lost; only the winners’ version survives.',
      histCta: 'History written by the victors →'
    },
    map: {
      title: 'The path of destiny',
      aside: 'From Cartagena to Cannae: follow Hannibal’s campaign on the animated map, then the map of alliances.',
      turnerAlt: 'Turner — Snow Storm: Hannibal and his Army Crossing the Alps',
      stages: [
        { k: 'Spring 218 · Iberia', t: 'From Cartagena to the Ebro', d: 'According to Polybius, Hannibal set out with some 90,000 infantry and 12,000 cavalry. After the Pyrenees he had about 50,000 infantry, 9,000 cavalry and 37 elephants.' },
        { k: 'Autumn 218 · Alps', t: 'The crossing', d: 'About fifteen days in the snow, under attack from mountain tribes. He reached Italy with some 20,000 infantry and 6,000 cavalry.' },
        { k: '218–203 · Italy', t: 'Sixteen years in enemy land', d: 'Joined by the Gauls of the Po valley, he marched down the peninsula, crushed three Roman armies and held southern Italy until 203.' }
      ]
    },
    battles: {
      title: 'The art of annihilation',
      cta: 'The tactics in diagrams →',
      cannaeAlt: 'John Trumbull — The Death of Paulus Aemilius at Cannae',
      cannaeCap: 'J. Trumbull — The Death of Paulus Aemilius at Cannae (1773)',
      cannae: {
        k: '2 August 216 BC · Apulia',
        t: 'Cannae',
        d: 'The Gallic and Iberian centre deliberately gives ground in an arc; the Libyan infantry closes in on the flanks, and Hasdrubal’s cavalry seals the trap from behind. The most famous double envelopment in history.',
        rows: [
          { k: '~86,000', v: 'Romans and allies engaged (8 legions)' },
          { k: '~50,000', v: 'men in Hannibal’s army' },
          { k: '48,000–70,000', v: 'Romans killed, the consul Paullus among them' }
        ]
      },
      items: [
        { k: 'November 218', t: 'The Ticinus', d: 'The first cavalry clash in Italy: the Numidian horse outflanks the Romans. The consul Publius Scipio is wounded and saved by his son — the future Africanus.' },
        { k: 'December 218', t: 'The Trebia', d: 'Hannibal lures the legions across the icy river; Mago, hidden with 2,000 men, strikes their rear. Only about 10,000 Romans manage to break through.' },
        { img: '/img/trasimeno.jpg', alt: 'Lake Trasimene', k: 'June 217', t: 'Trasimene', d: 'In the fog, between hills and lake, Flaminius’ army is caught in marching column: 15,000 killed, as many captured, the consul slain.' }
      ],
      tactK: 'Animated diagrams',
      tactT: 'See Cannae, the Trebia and Zama move by move',
      eleK: '37 elephants · 218',
      eleT: 'The elephants and the Alpine crossing'
    },
    gates: {
      kicker: '211 BC',
      title: "Why didn't Hannibal enter Rome?",
      intro: 'After Cannae, Rome seemed at his mercy. Five years later he camped at its gates. Yet no ancient source, not even a Greek one, has him enter the city. Here is what we know.',
      rowsKicker: 'At the gates of Rome',
      rows: [
        { k: 'Aug. 216', v: "After Cannae, Maharbal urges Hannibal to march on Rome, some 400 km away. Hannibal refuses: he first wants to detach Rome's Italian allies." },
        { k: '216 – 211', v: 'Capua, Tarentum and part of the South go over to him. Rome raises new legions and goes back on the offensive: in 211 it besieges Capua.' },
        { k: 'Spring 211', v: 'To relieve Capua, Hannibal marches on Rome. He camps on the Anio, about three miles (4.5 km) from the walls.' },
        { k: 'At the Colline Gate', v: 'With 2,000 horsemen he rides up to the walls to observe them (Livy). Two newly raised legions are inside the city.' },
        { k: 'Two days', v: 'According to Livy, the armies draw up for battle on two consecutive days, and twice a violent storm separates them.' },
        { k: 'The retreat', v: 'Rome has not lifted the siege of Capua: the manoeuvre has failed. Hannibal heads back south, and Capua falls soon after.' }
      ],
      quoteKicker: 'Maharbal to Hannibal, after Cannae',
      quote: '“You know how to win, Hannibal; you do not know how to use your victory” (Livy XXII.51). Livy adds that this day of delay saved Rome. Many modern historians think, on the contrary, that Hannibal was right not to attempt a siege.',
      whyKicker: 'Why he could not take it',
      why: [
        'No siege engines: his army was built for pitched battle, not for besieging a great city.',
        'Walls over 10 km long, and a population able to arm new legions.',
        'An army of about 40,000 men, far from its bases, with no regular reinforcements by sea.',
        "His strategy targeted Rome's alliances, not the city: he wanted an imposed peace, not a conquest."
      ],
      fulviusKicker: 'A condemned general',
      fulviusTitle: 'The trial of Gnaeus Fulvius',
      fulvius: 'People sometimes mention a Roman general punished “after Hannibal arrived”. This is probably the praetor Gnaeus Fulvius Flaccus, beaten by Hannibal at Herdonea in Apulia and prosecuted in 211: he went into exile before the verdict (Livy XXVI.2–3). He was tried for losing his army, not for the fall of Rome. By contrast, the consul Varro, defeated at Cannae, was thanked by the Senate for “not despairing of the Republic”.',
      sourcesKicker: 'The limits of the sources',
      sourcesTitle: 'A story written by Rome',
      sources: "Our account comes from Polybius, a friend of the Scipios, and from Livy, the historian of Roman glory; Hannibal's own historians, Silenus and Sosylus, are lost. These texts must be read with care. But a capture of Rome would have left traces impossible to erase: the consuls, the Senate and the assemblies function without interruption throughout the war.",
      sourcesCta: "The victors' history",
      alt: {
        badge: "Another reading — the site author's view",
        title: 'What if Hannibal did enter Rome?',
        thesis: [
          "For the author of this site, Hannibal did enter Rome, without fighting and without destruction, with his elephants. People in the city, who held him in high esteem, are said to have let him in.",
          "The main argument: a Roman general was condemned after Hannibal's arrival. If Rome had really held out, why punish one of its commanders? On this reading, Roman historians reversed the story to erase a humiliation."
        ],
        answerTitle: 'What the sources and historians say',
        answer: [
          'No ancient text, not even the Greek historians sympathetic to Hannibal, has him enter Rome.',
          'By 211, Hannibal had almost no elephants left in Italy: according to Polybius, only one survived the winter of 218.',
          'The condemned general, Gnaeus Fulvius, was tried for his defeat at Herdonea in Apulia. Rome often prosecuted defeated generals without the city having fallen.',
          'Consuls, Senate and elections function without interruption from 218 to 201: a capture of Rome would have broken that continuity.'
        ]
      }
    },
    zama: {
      alt: 'The Battle of Zama',
      caption: 'Cornelis Cort, after Giulio Romano — The Battle of Zama',
      kicker: '202 BC · Africa',
      title: 'Zama: the reversal',
      intro: 'Rome defeated Hannibal only in Africa, after turning Carthage’s best asset against it: the Numidian cavalry.',
      rows: [
        { k: '204–203', v: 'Scipio lands near Utica; Carthage recalls Hannibal from Italy.' },
        { k: 'Masinissa', v: 'A Numidian prince, he had fought for Carthage in Spain. Passed over in favour of his rival Syphax, Carthage’s ally, he went over to Rome in 206 and brought some 4,000 horsemen to Zama.' },
        { k: 'The battle', v: 'Hannibal’s 80 elephants are funnelled through lanes left between the maniples. The Roman and Numidian cavalry, back from the pursuit, falls on the rear of Hannibal’s veterans.' },
        { k: 'The toll', v: 'About 20,000 dead and as many captured on the Carthaginian side, according to Polybius. Hannibal himself persuades the Council to accept peace.' }
      ]
    },
    after: {
      title: 'After Zama: suffete, exile, death',
      items: [
        { k: '196 BC · Carthage', t: 'The reforming suffete', d: [
          'Elected suffete, Hannibal limited the judges of the Court of One Hundred and Four, hitherto appointed for life, to a one-year term, and pursued the embezzlement of public funds.',
          'The result: Carthage could pay its indemnity to Rome without new taxes. His political enemies denounced him to Rome.'
        ] },
        { k: '195–184 · The East', t: 'Exile', d: [
          'He fled via Tyre to the court of Antiochus III, whom he advised against Rome. In 190 he commanded a Seleucid fleet defeated by the Rhodians at the Eurymedon.',
          'The Peace of Apamea demanded his surrender: he went to Crete, to Armenia and King Artaxias, then to Bithynia, where he beat the fleet of Pergamon by hurling jars full of snakes onto its ships (Cornelius Nepos).'
        ] },
        { k: '183 BC · Libyssa', t: 'Death', d: [
          'Rome sent Flamininus to demand the old general; King Prusias’ soldiers surrounded his house at Libyssa, near present-day Gebze in Turkey.',
          'Hannibal took the poison he kept, it is said, in the bezel of his ring. He was about 64.'
        ] }
      ]
    },
    quotes: {
      alt: 'Sébastien Slodtz — Hannibal counting the rings',
      caption: 'Sébastien Slodtz — Hannibal counting the rings of the Roman knights fallen at Cannae (1704), Louvre. Mago poured more than a bushel of them onto the floor of Carthage’s Council.',
      kicker: 'Ancient sources',
      title: 'What the ancients said',
      items: [
        { q: 'He was the first to enter battle and the last to leave it.', a: 'Livy, XXI, 4' },
        { q: 'You know how to win a victory, Hannibal; you do not know how to use it.', a: 'Maharbal on the evening of Cannae — Livy, XXII, 51' },
        { q: 'For sixteen years he kept an army of so many peoples without a single mutiny against him.', a: 'Polybius, XI, 19' },
        { q: 'Let us relieve the Romans of their long anxiety, since they find it too long to wait for an old man’s death.', a: 'Last words — Livy, XXXIX, 51' },
        { q: 'I shall either find a way or make one.', a: 'Attributed to Hannibal before the Alps (late tradition)' }
      ]
    },
    legacy: {
      title: 'Legacy',
      goyaAlt: 'Goya — Hannibal the Conqueror viewing Italy from the Alps',
      items: [
        { k: 'In art', t: 'Goya, Turner, David', d: 'Goya (1771) painted him first sighting Italy from the Alps, Turner (1812) in the snow storm; in Napoleon Crossing the Alps (1801), David carved his name on a rock beneath Bonaparte’s.' },
        { k: 'In war colleges', t: 'Cannae, the absolute model', d: 'West Point, Sandhurst and academies worldwide still study Cannae. In the early 20th century the German chief of staff Schlieffen made it the model of the battle of annihilation.' },
        { k: 'Admiration', t: 'Napoleon', d: 'Napoleon ranked Hannibal among the greatest captains in history, alongside Alexander and Caesar, and admired his Alpine crossing, which he repeated in 1800.' }
      ]
    },
    nav: { prev: '← Previous', next: 'Next →', nextName: 'Hasdrubal Barca' },
    more: {
      title: 'Read also',
      go: 'Read →',
      items: [
        { to: '/guerres-puniques', tone: 'tile--terra', k: '264–146 BC', t: 'The Punic Wars', d: 'Three wars, a hundred and twenty years of duel between Carthage and Rome.' },
        { to: '/armee', tone: '', k: 'Army', t: 'The army of Carthage', d: 'Libyans, Numidians, Iberians, Gauls, Balearic slingers: who fought for Hannibal.' },
        { to: '/carte', tone: 'tile--navy', k: 'Animated map', t: 'Carthage on the map', d: 'Territories, Hannibal’s campaign, voyages and alliances, animated.' }
      ]
    }
  },
  ar: {
    meta: {
      title: 'حنبعل برقا (247–183 ق.م)',
      desc: 'حنبعل برقا: القسم، جبال الألب، تريبيا، ترازيمين، كاناي، زاما، المنفى والموت في ليبيسا. سيرة استراتيجي قرطاج.'
    },
    hero: {
      chip: 'سيرة · 247–183 ق.م',
      title1: 'حنبعل',
      title2: 'برقا',
      epithet: 'استراتيجي قرطاج',
      lede: 'ابن حملقار، عبر جبال الألب بفيلته وبقي ستة عشر عامًا في إيطاليا دون أن يخسر معركة نظامية. ولم تنسه روما أبدًا.',
      note: 'ملاحظة — كل ما نعرفه عن حنبعل جاءنا من مؤلفين إغريق ورومان كتبوا من جهة المنتصر. نستشهد بهم ونقرؤهم بتمعّن.',
      alt: 'تمثال نصفي يُنسب إلى حنبعل',
      caption: 'تمثال نصفي يُنسب إلى حنبعل — المتحف الأثري في نابولي'
    },
    stats: [
      { n: '16', t: 'عامًا من الحملات في إيطاليا (218–203) بحساب القدماء' },
      { n: '0', t: 'هزيمة في معركة نظامية في إيطاليا' },
      { n: '~70000', t: 'روماني قُتلوا في كاناي حسب بوليبيوس (48200 حسب تيتوس ليفيوس)' },
      { n: '37', t: 'فيلًا عند الانطلاق من إسبانيا سنة 218' }
    ],
    oath: {
      alt: 'بنجامين وست — قسم حنبعل',
      caption: 'بنجامين وست — حنبعل الطفل يقسم على عداوة روما (1770)',
      kicker: '237 ق.م · قرطاج',
      title: 'القسم',
      text: 'قبل الرحيل إلى إسبانيا، قدّم حملقار قربانًا. توسّل إليه ابنه ذو التسع سنوات أن يأخذه معه، فقبل الأب بشرط: أن يقسم الطفل، ويده على المذبح، ألّا يكون أبدًا صديقًا للرومان. وقد روى حنبعل نفسه هذه الحادثة بعد عقود للملك أنطيوخوس الثالث.',
      quote: 'متى استطاع، سيكون عدوًّا للشعب الروماني.',
      cite: 'تيتوس ليفيوس، 21، 1 — وانظر بوليبيوس، 3، 11'
    },
    life: {
      kicker: 'التسلسل الزمني',
      title: 'حياة في تواريخ',
      rows: [
        { k: '247', v: 'الولادة في قرطاج، وأبوه حملقار برقا يقود القتال في صقلية خلال الحرب البونيقية الأولى.' },
        { k: '237', v: 'القسم، ثم الرحيل مع أبيه إلى إسبانيا حيث بنى قوة برقية.' },
        { k: '229/228', v: 'موت حملقار غرقًا وهو يقاتل الإيبيريين. يتولّى صهره صدربعل الجميل القيادة ويؤسّس قرطاجنة.' },
        { k: '221', v: 'اغتيال صدربعل. يهتف الجيش باسم حنبعل فيتولّى القيادة في السادسة والعشرين.' },
        { k: '219', v: 'حصار ساغونتوم حليفة روما وأخذها بعد ثمانية أشهر: شرارة الحرب البونيقية الثانية.' },
        { k: '218', v: 'الانطلاق من قرطاجنة في الربيع، ثم البرانس والرون، وعبور الألب في الخريف. انتصارا تيتشينو وتريبيا.' },
        { k: '217', v: 'كمين بحيرة ترازيمين: مقتل القنصل فلامينيوس.' },
        { k: '216', v: 'كاناي، في 2 أغسطس. كابوا وجزء من جنوب إيطاليا ينضمّان إلى قرطاج.' },
        { k: '211', v: 'الزحف على روما لفكّ الحصار عن كابوا: «حنبعل على الأبواب». لم تسقط روما، ولم تصمد كابوا.' },
        { k: '207', v: 'أخوه صدربعل، القادم من إسبانيا بالتعزيزات، يُقتل عند نهر ميتاوروس، ويُلقى رأسه أمام معسكر حنبعل.' },
        { k: '203', v: 'استدعاؤه إلى إفريقيا للدفاع عن قرطاج أمام سكيبيو.' },
        { k: '202', v: 'هزيمة زاما. حنبعل نفسه ينصح بقبول الصلح.' },
        { k: '196', v: 'انتخابه شُفْطًا (سوفيت)، فيصلح مالية قرطاج ومؤسساتها.' },
        { k: '195', v: 'مهدَّدًا من خصومه ومن روما، يلجأ إلى بلاط أنطيوخوس الثالث.' },
        { k: '190–184', v: 'هزيمة بحرية عند نهر يوريميدون؛ ثم اللجوء إلى كريت وأرمينيا، فبيثينيا عند الملك بروسياس.' },
        { k: '183', v: 'محاصرًا في ليبيسا على ساحل بيثينيا، يتجرّع السمّ بدل أن يُسلَّم إلى الرومان.' }
      ]
    },
    rome: {
      kicker: 'قراءة المصادر',
      title: 'ما لا ترويه روما',
      paras: [
        'تأتينا الروايات من بوليبيوس، صديق آل سكيبيو، ومن تيتوس ليفيوس الذي كتب في عهد أغسطس. كلاهما يُعجب بحنبعل، لكن روما تبقى البطلة: حنبعل «قاسٍ» و«غادر» — وهي تهم كان أعداؤه يلصقونها بكل القرطاجيين.',
        'ستة عشر عامًا في إيطاليا بتعزيزات قليلة: كان حزب حنّون الكبير في قرطاج معارضًا للحرب، وذهب معظم الجنود المرسلين إلى إسبانيا. فكان على حنبعل أن يُطعم جيشه ويدفع أجوره من الميدان.'
      ],
      mythLabel: 'أسطورة الهزيمة',
      mythText: 'لم يخسر حنبعل أي معركة نظامية في إيطاليا. لم تهزمه روما إلا بتجنّب قتاله، ثم بنقل الحرب إلى إسبانيا وإفريقيا.',
      histKicker: 'مصادر ضائعة',
      histTitle: 'مؤرخو حنبعل',
      histText: 'رافق حنبعلَ إغريقيان كتبا تاريخه: سيلينوس من كالي أكتي، وسوسيلوس الإسبرطي الذي علّمه اليونانية. ضاعت كتبهما، ولم تبقَ إلا رواية المنتصرين.',
      histCta: 'التاريخ الذي كتبه المنتصر ←'
    },
    map: {
      title: 'مسار القدر',
      aside: 'من قرطاجنة إلى كاناي: تابع حملة حنبعل على الخريطة المتحركة، ثم خريطة التحالفات.',
      turnerAlt: 'ترنر — عاصفة ثلجية: حنبعل وجيشه يعبرون الألب',
      stages: [
        { k: 'ربيع 218 · إيبيريا', t: 'من قرطاجنة إلى نهر الإبرو', d: 'حسب بوليبيوس، انطلق حنبعل بنحو 90 ألف راجل و12 ألف فارس. وبعد البرانس بقي معه نحو 50 ألف راجل و9 آلاف فارس و37 فيلًا.' },
        { k: 'خريف 218 · الألب', t: 'العبور', d: 'نحو خمسة عشر يومًا في الثلج، تحت هجمات سكان الجبال. وصل إلى إيطاليا بنحو 20 ألف راجل و6 آلاف فارس.' },
        { k: '218–203 · إيطاليا', t: 'ستة عشر عامًا في أرض العدو', d: 'انضمّ إليه غاليو سهل البو، فنزل عبر شبه الجزيرة وسحق ثلاثة جيوش رومانية واحتفظ بجنوب إيطاليا حتى 203.' }
      ]
    },
    battles: {
      title: 'فنّ الإبادة',
      cta: 'التكتيكات بالرسوم ←',
      cannaeAlt: 'جون ترمبل — موت باولوس إيميليوس في كاناي',
      cannaeCap: 'ج. ترمبل — موت باولوس إيميليوس في كاناي (1773)',
      cannae: {
        k: '2 أغسطس 216 ق.م · أبوليا',
        t: 'كاناي',
        d: 'يتراجع القلب الغالي والإيبيري عمدًا على شكل قوس، وينطبق المشاة الليبيون على الجانبين، ويُغلق فرسان صدربعل الفخّ من الخلف. أشهر تطويق مزدوج في التاريخ.',
        rows: [
          { k: '~86000', v: 'روماني وحليف في المعركة (8 فيالق)' },
          { k: '~50000', v: 'رجل في جيش حنبعل' },
          { k: '48000–70000', v: 'قتيل روماني، بينهم القنصل باولوس' }
        ]
      },
      items: [
        { k: 'نوفمبر 218', t: 'تيتشينو', d: 'أول صدام للفرسان في إيطاليا: الفرسان النوميديون يلتفّون على الرومان. يُجرح القنصل بوبليوس سكيبيو وينقذه ابنه — الإفريقي لاحقًا.' },
        { k: 'ديسمبر 218', t: 'تريبيا', d: 'يستدرج حنبعل الفيالق إلى النهر المتجمّد، ويخرج ماغون من كمينه بألفي رجل في ظهورهم. لم ينجُ من الرومان إلا نحو عشرة آلاف.' },
        { img: '/img/trasimeno.jpg', alt: 'بحيرة ترازيمين', k: 'يونيو 217', t: 'ترازيمين', d: 'في الضباب، بين التلال والبحيرة، يُباغَت جيش فلامينيوس وهو في رتل المسير: 15 ألف قتيل ومثلهم أسرى، والقنصل قتيل.' }
      ],
      tactK: 'رسوم متحركة',
      tactT: 'شاهد كاناي وتريبيا وزاما مناورةً بمناورة',
      eleK: '37 فيلًا · 218',
      eleT: 'الفيلة وعبور الألب'
    },
    gates: {
      kicker: '211 ق.م',
      title: 'لماذا لم يدخل حنبعل روما؟',
      intro: 'بعد كاناي بدت روما تحت رحمته، وبعد خمس سنوات عسكر عند أبوابها. ومع ذلك لا يذكر أي مصدر قديم، ولا حتى المصادر الإغريقية، أنه دخل المدينة. وهذا ما نعرفه.',
      rowsKicker: 'على أبواب روما',
      rows: [
        { k: 'أغسطس 216', v: 'بعد كاناي، يلحّ مهربعل على حنبعل أن يزحف إلى روما التي تبعد نحو 400 كم. فيرفض حنبعل: يريد أولاً فصل الحلفاء الإيطاليين عن روما.' },
        { k: '216 – 211', v: 'تنضم إليه كابوا وتارنتوم وجزء من الجنوب. وتجنّد روما فيالق جديدة وتستعيد المبادرة، فتحاصر كابوا سنة 211.' },
        { k: 'ربيع 211', v: 'لفكّ الحصار عن كابوا يزحف حنبعل إلى روما، ويعسكر على نهر الأنيو على بعد نحو ثلاثة أميال (4,5 كم) من الأسوار.' },
        { k: 'أمام باب كولينا', v: 'يقترب مع 2 000 فارس حتى الأسوار ليستطلعها (تيتوس ليفيوس). وفي المدينة فيلقان جُنّدا حديثاً.' },
        { k: 'يومان', v: 'حسب تيتوس ليفيوس، يصطفّ الجيشان للقتال يومين متتاليين، وفي كل مرة تفرّق بينهما عاصفة عنيفة.' },
        { k: 'الانسحاب', v: 'لم ترفع روما الحصار عن كابوا ففشلت المناورة. يعود حنبعل جنوباً، وتسقط كابوا بعد قليل.' }
      ],
      quoteKicker: 'مهربعل لحنبعل بعد كاناي',
      quote: '«أنت تعرف كيف تنتصر يا حنبعل، لكنك لا تعرف كيف تستثمر نصرك» (تيتوس ليفيوس، 22، 51). ويضيف ليفيوس أن ذلك اليوم من التأخير أنقذ روما. أما كثير من المؤرخين المحدثين فيرون أن حنبعل كان محقاً في عدم محاولة الحصار.',
      whyKicker: 'لماذا لم يكن بوسعه أخذها',
      why: [
        'لا آلات حصار: كان جيشه مُعدّاً للمعارك المفتوحة لا لحصار مدينة كبرى.',
        'أسوار يتجاوز طولها 10 كم، وسكان قادرون على تسليح فيالق جديدة.',
        'جيش من نحو 40 000 رجل، بعيد عن قواعده، بلا إمدادات منتظمة عبر البحر.',
        'كانت استراتيجيته تستهدف تحالفات روما لا المدينة: أراد سلماً مفروضاً لا فتحاً.'
      ],
      fulviusKicker: 'قائد مُدان',
      fulviusTitle: 'محاكمة غنايوس فولفيوس',
      fulvius: 'يُذكر أحياناً قائد روماني عوقب «بعد وصول حنبعل». والمقصود على الأرجح البريتور غنايوس فولفيوس فلاكوس الذي هزمه حنبعل في هيردونيا في أبوليا، وحوكم سنة 211 فنفى نفسه قبل صدور الحكم (تيتوس ليفيوس، 26، 2-3). كان يُحاكَم على خسارة جيشه لا على سقوط روما. وعلى العكس، شكر مجلس الشيوخ القنصل فارّو المهزوم في كاناي لأنه «لم ييأس من الجمهورية».',
      sourcesKicker: 'حدود المصادر',
      sourcesTitle: 'رواية كتبتها روما',
      sources: 'تأتي روايتنا من بوليبيوس، صديق آل سكيبيو، ومن تيتوس ليفيوس مؤرخ المجد الروماني؛ أما مؤرخا حنبعل، سيلينوس وسوسيلوس، فقد ضاعت كتاباتهما. لذا يجب قراءة هذه النصوص بحذر. لكن سقوط روما كان سيترك آثاراً يستحيل محوها: فالقناصل ومجلس الشيوخ والمجالس الشعبية ظلت تعمل دون انقطاع طوال الحرب.',
      sourcesCta: 'تاريخ المنتصرين',
      alt: {
        badge: 'قراءة أخرى — رأي صاحب الموقع',
        title: 'ماذا لو دخل حنبعل روما؟',
        thesis: [
          'يرى صاحب هذا الموقع أن حنبعل دخل روما فعلاً، دون قتال ودون تدمير، ومعه فيلته، وأن سكاناً من المدينة كانوا يقدّرونه هم من فتحوا له الطريق.',
          'والحجة الأساسية: أُدين قائد روماني بعد وصول حنبعل. فلو صمدت روما حقاً، فلماذا تعاقب أحد قادتها؟ وحسب هذه القراءة، قلب المؤرخون الرومان الرواية لمحو إهانة.'
        ],
        answerTitle: 'ما تقوله المصادر والمؤرخون',
        answer: [
          'لا يذكر أي نص قديم، ولا حتى المؤرخون الإغريق المتعاطفون مع حنبعل، أنه دخل روما.',
          'في سنة 211 لم يعد لحنبعل تقريباً أي فيلة في إيطاليا: فحسب بوليبيوس لم ينجُ إلا فيل واحد من شتاء 218.',
          'القائد المُدان، غنايوس فولفيوس، حوكم على هزيمته في هيردونيا في أبوليا. وكثيراً ما حاكمت روما قادتها المهزومين دون أن تسقط المدينة.',
          'ظل القناصل ومجلس الشيوخ والانتخابات تعمل دون انقطاع من 218 إلى 201، وسقوط روما كان سيقطع هذه الاستمرارية.'
        ]
      }
    },
    zama: {
      alt: 'معركة زاما',
      caption: 'كورنيليس كورت، عن جوليو رومانو — معركة زاما',
      kicker: '202 ق.م · إفريقيا',
      title: 'زاما: انقلاب الموازين',
      intro: 'لم تهزم روما حنبعل إلا في إفريقيا، بعد أن قلبت على قرطاج أفضل أوراقها: الفرسان النوميديين.',
      rows: [
        { k: '204–203', v: 'سكيبيو ينزل قرب أوتيكا، وقرطاج تستدعي حنبعل من إيطاليا.' },
        { k: 'ماسينيسا', v: 'أمير نوميدي قاتل من أجل قرطاج في إسبانيا. ولمّا فُضّل عليه منافسه سيفاكس حليف قرطاج، انحاز إلى روما سنة 206، وجاء إلى زاما بنحو أربعة آلاف فارس.' },
        { k: 'المعركة', v: 'فيلة حنبعل الثمانون تُوجَّه عبر ممرّات تُركت بين صفوف الرومان. ويعود الفرسان الرومان والنوميديون من المطاردة فيهاجمون قدامى محاربي حنبعل من الخلف.' },
        { k: 'الحصيلة', v: 'نحو عشرين ألف قتيل ومثلهم أسرى من الجانب القرطاجي حسب بوليبيوس. وحنبعل نفسه يقنع المجلس بقبول الصلح.' }
      ]
    },
    after: {
      title: 'بعد زاما: شُفْط، ومنفى، وموت',
      items: [
        { k: '196 ق.م · قرطاج', t: 'الشُّفْط المصلح', d: [
          'بعد انتخابه شُفْطًا، جعل حنبعل مدّة قضاة محكمة المئة والأربعة سنة واحدة بعد أن كانت مدى الحياة، وطارد اختلاس المال العام.',
          'والنتيجة: صارت قرطاج قادرة على دفع التعويض لروما دون ضرائب جديدة. فوشى به خصومه السياسيون إلى روما.'
        ] },
        { k: '195–184 · المشرق', t: 'المنفى', d: [
          'فرّ عبر صور إلى بلاط أنطيوخوس الثالث، فكان مستشاره ضد روما. وفي سنة 190 قاد أسطولًا سلوقيًا هزمه الروديون عند يوريميدون.',
          'اشترط صلح أفاميا تسليمه، فانتقل إلى كريت، ثم إلى أرمينيا عند الملك أرتاكسياس، فبيثينيا حيث هزم أسطول برغامون بقذف جرار مملوءة بالأفاعي على سفنه (كورنيليوس نيبوس).'
        ] },
        { k: '183 ق.م · ليبيسا', t: 'الموت', d: [
          'أرسلت روما فلامينينوس للمطالبة بالقائد العجوز، فطوّق جنود الملك بروسياس بيته في ليبيسا، قرب مدينة غبزة التركية اليوم.',
          'تجرّع حنبعل السمّ الذي كان يخبّئه، كما يُروى، في فصّ خاتمه. كان في نحو الرابعة والستين.'
        ] }
      ]
    },
    quotes: {
      alt: 'سيباستيان سلودتز — حنبعل يعدّ الخواتم',
      caption: 'سيباستيان سلودتز — حنبعل يعدّ خواتم الفرسان الرومان الذين سقطوا في كاناي (1704)، اللوفر. وقد نثر ماغون منها أكثر من مكيال في مجلس قرطاج.',
      kicker: 'مصادر قديمة',
      title: 'ما قاله القدماء',
      items: [
        { q: 'كان أوّل من يدخل المعركة وآخر من يخرج منها.', a: 'تيتوس ليفيوس، 21، 4' },
        { q: 'أنت تعرف كيف تنتصر يا حنبعل، لكنك لا تعرف كيف تستثمر النصر.', a: 'مهربعل مساء كاناي — تيتوس ليفيوس، 22، 51' },
        { q: 'طوال ستة عشر عامًا حافظ على جيش من شعوب شتّى دون تمرّد واحد عليه.', a: 'بوليبيوس، 11، 19' },
        { q: 'لنُرِح الرومان من قلقهم الطويل، ما داموا يستطيلون انتظار موت شيخ.', a: 'كلماته الأخيرة — تيتوس ليفيوس، 39، 51' },
        { q: 'سأجد طريقًا أو أشقّ طريقًا.', a: 'تُنسب إلى حنبعل أمام الألب (رواية متأخرة)' }
      ]
    },
    legacy: {
      title: 'الإرث',
      goyaAlt: 'غويا — حنبعل المنتصر يطلّ على إيطاليا من الألب',
      items: [
        { k: 'في الفن', t: 'غويا وترنر ودافيد', d: 'رسمه غويا (1771) وهو يكتشف إيطاليا من أعالي الألب، ورسمه ترنر (1812) في العاصفة الثلجية، وفي لوحة «بونابرت يعبر الألب» (1801) نقش دافيد اسمه على صخرة تحت اسم بونابرت.' },
        { k: 'في الكليات العسكرية', t: 'كاناي، النموذج المطلق', d: 'ما تزال ويست بوينت وساندهيرست وأكاديميات العالم تدرس كاناي. وفي مطلع القرن العشرين جعل منها رئيس الأركان الألماني شليفن نموذج معركة الإبادة.' },
        { k: 'إعجاب', t: 'نابليون', d: 'وضع نابليون حنبعل بين أعظم القادة في التاريخ إلى جانب الإسكندر وقيصر، وأُعجب بعبوره الألب الذي كرّره هو سنة 1800.' }
      ]
    },
    nav: { prev: '→ السابق', next: 'التالي ←', nextName: 'صدربعل برقا' },
    more: {
      title: 'اقرأ أيضًا',
      go: 'اقرأ ←',
      items: [
        { to: '/guerres-puniques', tone: 'tile--terra', k: '264–146 ق.م', t: 'الحروب البونيقية', d: 'ثلاث حروب، ومئة وعشرون عامًا من الصراع بين قرطاج وروما.' },
        { to: '/armee', tone: '', k: 'الجيش', t: 'جيش قرطاج', d: 'ليبيون ونوميديون وإيبيريون وغاليون ومقلاعيون بلياريون: من قاتل مع حنبعل.' },
        { to: '/carte', tone: 'tile--navy', k: 'خريطة متحركة', t: 'قرطاج على الخريطة', d: 'الأراضي، وحملة حنبعل، والرحلات، والتحالفات، بالحركة.' }
      ]
    }
  }
}

const c = computed(() => C[locale.value] || C.fr)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.gates-side { display: flex; flex-direction: column; gap: var(--gap); }
.gates-quote p { font: 800 clamp(22px, 2.2vw, 30px)/1.15 var(--font-display); margin: 4px 0 14px; }
.gates-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.gates-list li { position: relative; padding-inline-start: 22px; font: 500 15px/1.45 var(--font-body); color: var(--terra-soft); }
.gates-list li::before { content: ''; position: absolute; inset-inline-start: 0; top: 0.55em; width: 10px; height: 10px; border-radius: 50%; background: var(--gold-light); }
.gates-foot { margin-top: var(--gap); }
.gates-btn { margin-top: 18px; }
.hero-title { font-size: clamp(52px, 8.4vw, 124px); line-height: 0.86; }
.epithet {
  margin-top: 14px;
  font: 800 clamp(22px, 2.6vw, 36px)/1.05 var(--font-display);
  color: var(--gold-light) !important;
}
.hero-note {
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font: 500 13px/1.5 var(--font-body);
  max-width: 560px;
}
.hero-fig { background: var(--purple-dark); }

.stat { min-height: 150px; }
.stat-t { font: 500 14px/1.45 var(--font-body); margin-top: 10px; }

.mt { margin-top: 16px; }
.para + .para { margin-top: 12px; }

.oath-fig, .zama-fig { min-height: clamp(300px, 36vw, 520px); }
.rings-fig { min-height: clamp(360px, 44vw, 640px); background: #2A241E; }
.cannae-fig { min-height: clamp(300px, 34vw, 480px); background: #8E3720; }

.quote { margin: 0; }
.quote p {
  font: 700 clamp(19px, 1.7vw, 24px)/1.3 var(--font-display);
  color: var(--ink) !important;
}
.quote cite {
  display: block;
  margin-top: 8px;
  font: 500 13px/1.4 var(--font-body);
  font-style: normal;
  color: var(--muted);
}
.tile--sand .quote {
  border-inline-start: 3px solid var(--purple);
  padding-inline-start: 18px;
}

.life-title { margin-bottom: 28px; }

.myth {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 18px 20px;
}
.myth strong { font: 800 16px/1.2 var(--font-display); }
.myth .body { margin-top: 6px; }

.stages { margin-top: var(--gap); }

.cannae-rows { margin-top: 22px; }
.cannae-rows .key { font-size: clamp(18px, 1.7vw, 22px); }
.cannae-rows .val { font-size: 15px; color: var(--terra-soft); }

.links-2 { margin-top: var(--gap); }
.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.cta-t { font-size: clamp(24px, 2.4vw, 34px); }
.cta-arrow {
  flex: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--purple);
  color: var(--white);
  display: grid;
  place-items: center;
  font: 700 22px/1 var(--font-body);
}
[dir="rtl"] .cta-arrow { transform: scaleX(-1); }

.zama-rows { margin-top: 24px; }
.zama-rows .key { font-size: clamp(17px, 1.6vw, 22px); }
.zama-rows .val { font-size: 15px; color: var(--stone); }

.sec-title { margin-bottom: clamp(20px, 2.4vw, 32px); }

.qlist {
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-top: 26px;
}
.qlist .quote {
  padding-top: 18px;
  border-top: 1px solid rgba(22, 19, 15, 0.2);
}

.nav-tile {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 44px;
}
.nav-tile .h-card { font-size: clamp(24px, 2.6vw, 36px); margin: 0; }
.nav-next { text-align: end; align-items: flex-end; }

.more-tile { min-height: 220px; }
.more-link { font: 600 14px/1 var(--font-body); color: var(--purple); }
.more-tile.tile--terra .more-link,
.more-tile.tile--navy .more-link { color: var(--white); }

@media (max-width: 640px) {
  .fig--hero { min-height: 300px; }
  .stat { min-height: 0; padding: 18px; }
  .stat .num { font-size: 32px; }
  .stat-t { font-size: 13px; }
  .cta-arrow { width: 44px; height: 44px; }
  .more-tile { min-height: 0; }
}
</style>
