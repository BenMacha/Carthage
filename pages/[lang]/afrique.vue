<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--terra tile--stack tile--hero s-7 hero">
        <div class="watermark ar" aria-hidden="true">إفريقية</div>
        <span class="chip chip--glass">{{ c.hero.chip }}</span>
        <div class="hero-text">
          <h1 class="h-display africa-title">Africa</h1>
          <p class="lede" v-html="c.hero.lede" />
        </div>
      </div>
      <figure class="fig fig--hero s-5" style="background:#8E3720">
        <img src="/img/bardo.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
    </div>

    <!-- Hypothèses étymologiques -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.theories.title }}</h2>
        <p>{{ c.theories.aside }}</p>
      </div>
    </section>
    <div class="cols cols-4 theories">
      <article v-for="(t, i) in c.theories.items" :key="t.word" class="tile tile--stack theory" :class="{ 'tile--ink': i === 0 }">
        <div>
          <span class="kicker">{{ t.origin }}</span>
          <div class="word">{{ t.word }}</div>
          <div class="gloss">
            <span v-if="t.script" class="script" :class="t.scriptCls" :dir="t.scriptDir" aria-hidden="true">{{ t.script }}</span>
            {{ t.gloss }}
          </div>
        </div>
        <div>
          <p class="body">{{ t.text }}</p>
          <p class="detail">{{ t.detail }}</p>
        </div>
      </article>
    </div>

    <!-- Le voyage d'un nom -->
    <section class="sec">
      <div class="tile tile--xl tile--sand">
        <div class="sec-head journey-head">
          <h2 class="h-section">{{ c.journey.title }}</h2>
          <p>{{ c.journey.aside }}</p>
        </div>
        <ol class="journey">
          <li v-for="(s, i) in c.journey.steps" :key="s.date" class="step" :class="{ 'step--key': s.key }">
            <span class="step-date">{{ s.date }}</span>
            <span class="step-name" :class="{ ar: s.ar }">{{ s.name }}</span>
            <span class="step-title">{{ s.title }}</span>
            <span class="step-text">{{ s.text }}</span>
            <span v-if="i < c.journey.steps.length - 1" class="step-arrow" aria-hidden="true">→</span>
          </li>
        </ol>
      </div>
    </section>

    <!-- Ifriqiya + renvoi Tunisie -->
    <section class="sec">
      <div class="cols cols-5-7 cols--flush">
        <figure class="fig ifr-fig" style="background:#8E3720">
          <img src="/img/kairouan.jpg" :alt="c.ifr.alt" loading="lazy">
          <figcaption class="cap-box">{{ c.ifr.caption }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--purple tile--stack">
          <div>
            <span class="kicker">{{ c.ifr.kicker }}</span>
            <h2 class="h-block ifr-title">{{ c.ifr.title }}</h2>
            <p class="body-lg">{{ c.ifr.text }}</p>
          </div>
          <NuxtLink :to="localePath('/tunisie')" class="btn btn-outline see-also">{{ c.ifr.more }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- L'Afrique du Nord avant Carthage -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.peoples.title }}</h2>
        <p>{{ c.peoples.aside }}</p>
      </div>
    </section>
    <div class="cols cols-4 peoples">
      <article v-for="p in c.peoples.items" :key="p.name" class="card-img people" :class="{ 'tile--ink': p.img }">
        <img v-if="p.img" :src="p.img" :alt="p.alt" loading="lazy">
        <div class="card-body">
          <span class="kicker">{{ p.period }}</span>
          <h3 class="h-card">{{ p.name }}</h3>
          <p>{{ p.text }}</p>
        </div>
      </article>
    </div>

    <!-- Identité africaine -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.identity.kicker }}</span>
          <h2 class="h-block id-title">{{ c.identity.title }}</h2>
          <div class="id-grid">
            <div v-for="a in c.identity.items" :key="a.title" class="id-item">
              <h3 class="id-name">{{ a.title }}</h3>
              <p class="body">{{ a.text }}</p>
              <NuxtLink v-if="a.link" :to="localePath(a.link)" class="id-link">{{ a.linkLabel }}</NuxtLink>
            </div>
          </div>
        </div>
        <figure class="fig dame-fig" style="background:#5E574F">
          <img src="/img/dame.jpg" :alt="c.identity.alt" loading="lazy">
          <figcaption class="cap-box">{{ c.identity.caption }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- Civilisation métissée -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.mixed.title }}</h2>
        <p>{{ c.mixed.aside }}</p>
      </div>
    </section>
    <div class="cols cols-2">
      <article v-for="(m, i) in c.mixed.items" :key="m.title" class="tile mixed-tile" :class="mixedTones[i]">
        <span class="kicker">{{ m.kicker }}</span>
        <h3 class="h-card">{{ m.title }}</h3>
        <p v-for="p in m.paras" :key="p" class="body mixed-p">{{ p }}</p>
      </article>
    </div>

    <!-- Génétique et anthropologie -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.dna.kicker }}</span>
          <h2 class="h-block id-title">{{ c.dna.title }}</h2>
          <p class="body-lg dna-lede">{{ c.dna.lede }}</p>
          <div class="rows dna-rows" style="--row-key:140px">
            <div v-for="r in c.dna.rows" :key="r.title">
              <span class="key">{{ r.key }}</span>
              <span class="val"><strong class="dna-name">{{ r.title }}</strong> {{ r.text }}</span>
            </div>
          </div>
        </div>
        <div class="dna-side">
          <div class="tile tile--xl tile--gold">
            <span class="kicker">{{ c.dna.sumK }}</span>
            <h3 class="h-card">{{ c.dna.sumT }}</h3>
            <ul class="bullets">
              <li v-for="it in c.dna.sum" :key="it">{{ it }}</li>
            </ul>
          </div>
          <div class="tile tile--xl tile--paper tile--outline">
            <span class="kicker">{{ c.dna.anthK }}</span>
            <h3 class="h-card">{{ c.dna.anthT }}</h3>
            <div class="rows anth-rows" style="--row-key:90px">
              <div v-for="r in c.dna.anth" :key="r.key">
                <span class="key">{{ r.key }}</span>
                <span class="val">{{ r.val }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Héritage -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.legacy.title }}</h2>
        <p>{{ c.legacy.aside }}</p>
      </div>
    </section>
    <div class="cols cols-2 legacy">
      <article v-for="(l, i) in c.legacy.items" :key="l.title" class="tile legacy-tile" :class="{ 'tile--gold': i === 0, 'with-img': l.img }">
        <img v-if="l.img" :src="l.img" :alt="l.alt" loading="lazy">
        <div>
          <h3 class="h-card">{{ l.title }}</h3>
          <p class="body">{{ l.text }}</p>
          <ul class="bullets">
            <li v-for="it in l.items" :key="it">{{ it }}</li>
          </ul>
        </div>
      </article>
    </div>

    <!-- Le saviez-vous ? -->
    <section class="sec sec--wide">
      <h2 class="h-section facts-title">{{ c.facts.title }}</h2>
    </section>
    <div class="cols cols-3">
      <div v-for="(f, i) in c.facts.items" :key="f.title" class="tile fact" :class="factTones[i]">
        <h3 class="h-card">{{ f.title }}</h3>
        <p class="body">{{ f.text }}</p>
      </div>
    </div>

    <PageSources :items="c.sources" />

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <h2 class="h-section facts-title">{{ c.more.title }}</h2>
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

const factTones = ['', 'tile--navy', '', '', '', 'tile--purple']
const mixedTones = ['tile--sand', '', 'tile--purple', 'tile--terra']

const C = {
  fr: {
    meta: {
      title: "L'Afrique et son nom",
      desc: "Afri, Africa, Ifriqiya : comment le nom de la terre de Carthage, l'actuelle Tunisie, est devenu celui de tout un continent."
    },
    hero: {
      chip: "L'Afrique et son nom",
      lede: "Pour les Romains, <i>Africa</i> désignait d'abord la province créée en 146 av. J.-C. sur le territoire de Carthage — le nord-est de l'actuelle Tunisie. Le nom s'est ensuite étendu, en deux mille ans, à tout le continent.",
      alt: 'Musée national du Bardo, Tunis',
      caption: 'Musée national du Bardo, Tunis'
    },
    theories: {
      title: "D'où vient « Afri » ?",
      aside: "Quatre hypothèses ont été proposées. Aucune n'est prouvée ; la première est la plus souvent retenue.",
      items: [
        { origin: 'Berbère · la plus admise', word: 'Ifri', gloss: '« grotte, caverne »', text: "Les Afri (ou Aourigha), peuple berbère voisin de Carthage. Le mot berbère ifri évoquerait des habitants de grottes.", detail: "Les Romains auraient étendu le nom de ces voisins immédiats de Carthage à toute la région." },
        { origin: 'Phénicienne', word: 'Afar', script: '𐤏𐤐𐤓', scriptCls: 'phoen', scriptDir: 'rtl', gloss: '« poussière, terre »', text: "Dans la langue de Carthage, ʿafar signifie « poussière » ou « terre » : Africa serait simplement « le pays ».", detail: "Une étymologie qui ferait écho aux paysages semi-arides de l'intérieur tunisien." },
        { origin: 'Latine', word: 'Aprica', gloss: '« ensoleillée »', text: "Le latin aprica, « exposée au soleil », proposé notamment par Isidore de Séville pour expliquer le climat chaud de la région.", detail: "Séduisante, mais considérée aujourd'hui comme une étymologie populaire." },
        { origin: 'Grecque', word: 'Aphrikē', script: 'ἀ-φρίκη', scriptCls: 'serif', gloss: '« sans froid »', text: "Du grec a-phrikē, « sans frisson » : une terre chaude, par opposition au climat de la Grèce.", detail: "Rapportée par Léon l'Africain au XVIe siècle ; minoritaire chez les spécialistes." }
      ]
    },
    journey: {
      title: "Le voyage d'un nom",
      aside: "D'un peuple local à un continent de 54 pays.",
      steps: [
        { date: 'Avant 814 av. J.-C.', name: 'Afri', title: 'La terre des Afri', text: "Un peuple local, pas un continent. Les Égyptiens nomment les Libyens de l'ouest Tehenou et Temehou." },
        { date: '814 av. J.-C.', name: 'Libyē', title: 'Fondation de Carthage', text: "Les Tyriens s'installent en territoire libyque. Les Grecs appellent l'ensemble de la région « Libye »." },
        { date: '264–146 av. J.-C.', name: 'Afer', title: 'Les guerres puniques', text: "Au contact de Carthage, les Romains nomment les habitants Afer (pluriel Afri)." },
        { date: '146 av. J.-C.', name: 'Africa', title: "Province d'Africa", text: "Après la destruction de Carthage, Rome crée la province d'Africa : premier usage officiel du nom.", key: true },
        { date: 'Ier s. ap. J.-C.', name: 'Africa', title: 'Extension du nom', text: "Pline l'Ancien et Pomponius Mela emploient Africa pour tout le continent connu, distinct de l'Africa proprement dite." },
        { date: 'VIIe siècle', name: 'إفريقية', ar: true, title: 'Ifriqiya', text: "Les conquérants arabes reprennent le nom latin pour la Tunisie et ses marges, avec Kairouan pour capitale." },
        { date: 'XVe–XVIe siècle', name: 'Afrique', title: 'Le continent entier', text: "Avec les grandes navigations, les cartographes étendent le nom jusqu'au cap de Bonne-Espérance." }
      ]
    },
    ifr: {
      kicker: 'Ifriqiya',
      title: 'Un nom jamais oublié',
      text: "« Ifriqiya » (إفريقية) est la transcription directe du latin Africa. Utilisé pendant tout le Moyen Âge pour la Tunisie, avec l'est de l'actuelle Algérie et la Tripolitaine, il prouve que le nom n'a jamais quitté la région. Entre-temps, Carthage elle-même, refondée par Rome, était redevenue la capitale de l'Africa romaine.",
      more: 'Voir aussi : Carthage vit en Tunisie →',
      alt: 'Grande Mosquée de Kairouan',
      caption: "Kairouan, fondée en 670, capitale de l'Ifriqiya"
    },
    peoples: {
      title: "L'Afrique du Nord avant Carthage",
      aside: 'Les peuples qui ont précédé, accueilli et côtoyé les Phéniciens.',
      items: [
        { period: 'Xe–VIe millénaire av. J.-C.', name: 'Les Capsiens', text: "Culture préhistorique nommée d'après Gafsa (Capsa), en Tunisie. Ancêtres probables des Berbères, ils ont laissé de nombreux sites archéologiques." },
        { period: 'Depuis la préhistoire', name: 'Les Berbères (Imazighen)', text: "Peuple autochtone du Maghreb depuis des millénaires, ancêtres des Amazighs actuels. Leur présence est attestée par un riche art rupestre." },
        { period: 'IVe–Ier s. av. J.-C.', name: 'Les royaumes numides', img: '/img/massinissa.jpg', alt: 'Massinissa, roi des Numides', text: "Cavaliers d'élite de l'actuelle Algérie et de l'ouest tunisien. Massinissa pèse sur la fin de la deuxième guerre punique ; la cavalerie numide sert Carthage, puis Rome." },
        { period: 'Ier millénaire av. J.-C.', name: 'Les Garamantes', text: "Au Fezzan (Libye), une civilisation prospère en plein Sahara grâce à des galeries d'irrigation souterraines (foggaras), au cœur du commerce transsaharien." }
      ]
    },
    identity: {
      kicker: 'Une cité africaine',
      title: "L'identité africaine de Carthage",
      alt: 'Mosaïque dite « la Dame de Carthage »',
      caption: '« La Dame de Carthage », mosaïque, musée de Carthage',
      items: [
        { title: 'Fusion des cultures', text: "Traditions phéniciennes et cultures libyco-berbères se mêlent ; les mariages mixtes sont courants. La culture punique qui en naît est proprement africaine." },
        { title: 'Religions', text: "Baal Hammon et Tanit, venus de Phénicie, prennent à Carthage une place et des formes nouvelles ; l'influence de cultes libyques est discutée.", link: '/religion', linkLabel: 'La religion →' },
        { title: 'Langue punique', text: "Issu du phénicien, le punique reste parlé en Afrique du Nord jusqu'au Ve siècle ap. J.-C., comme en témoigne saint Augustin." },
        { title: 'Architecture', text: "Appien décrit, près de Byrsa, des maisons de six étages ; l'urbanisme punique s'adapte au site et au climat africains." },
        { title: 'Une armée de peuples', text: "Libyens, Numides, Maures combattent aux côtés des Ibères, Baléares et Gaulois : l'armée reflète l'ancrage africain de Carthage.", link: '/armee', linkLabel: "L'armée →" },
        { title: 'Savoir agricole', text: "Le savoir phénicien et la connaissance locale des sols donnent l'une des agricultures les plus productives de l'Antiquité.", link: '/agriculture', linkLabel: "L'agriculture →" }
      ]
    },
    mixed: {
      title: 'Une civilisation métissée',
      aside: "Culture venue d'Orient, enracinée en Afrique, ouverte à la Grèce et à l'Égypte : Carthage est un carrefour.",
      items: [
        { kicker: 'Persistances orientales', title: 'Des racines cananéennes', paras: [
          "La culture phénicienne se dégage du monde cananéen après les bouleversements des « Peuples de la mer », vers 1200 av. J.-C. Elle a absorbé très tôt des influences égyptiennes, puis grecques. Carthage hérite de ce mélange et le porte en Occident.",
          "Selon Augustin, des paysans d'Afrique se disaient encore « Chanani », Cananéens, plus de cinq siècles après 146. Le témoignage est discuté : Josephine Quinn y voit une tournure rhétorique, et Gabriel Camps un parler libyque, punicus signifiant souvent alors « africain »."
        ] },
        { kicker: 'Égypte et Grèce', title: 'Des œuvres à double culture', paras: [
          "Petits masques de verre placés dans les tombes pour écarter les démons, motif du lotus : l'Égypte est partout. À partir du IVe siècle av. J.-C., les influences grecques s'y superposent.",
          "L'éphèbe de Motyé, marbre du Ve siècle découvert en 1979, résume le problème : Melqart hellénisé, prise de guerre grecque ou commande punique à un sculpteur de Sicile ? Pour Serge Lancel, Carthage fut avant tout une plaque tournante, très perméable aux apports extérieurs."
        ] },
        { kicker: 'Apports africains', title: 'Libyque et punique mêlés', paras: [
          "Le mausolée libyco-punique de Dougga (IIe siècle av. J.-C.) marie traditions égyptiennes et apports grecs sur une terre numide. À El Hofra, près de Cirta (Constantine), le plus important sanctuaire néo-punique fouillé mêle éléments libyques et puniques.",
          "Dans les cités de l'Afrique romaine, les suffètes sont parfois trois au lieu de deux : certains spécialistes y voient un apport berbère."
        ] },
        { kicker: 'Après 146', title: 'Une identité qui survit', paras: [
          "Des suffètes administrent encore des villes d'Afrique romaine au IIe siècle ap. J.-C. L'opus africanum de Kerkouane se retrouve au Capitole de Dougga. Baal Hammon devient le Saturne africain, honoré jusqu'au IVe siècle, et Tanit la Caelestis des Romains (Marcel Le Glay).",
          "Selon Pline (XVIII, 22), les livres des bibliothèques de Carthage furent remis aux rois numides. Pour Stéphane Gsell puis M. H. Fantar, la survie d'une langue sémitique a pu faciliter, bien plus tard, l'arabisation du Maghreb."
        ] }
      ]
    },
    dna: {
      kicker: 'Génétique et anthropologie',
      title: "Ce que dit l'ADN ancien",
      lede: "Depuis une dizaine d'années, l'ADN ancien interroge les origines des habitants du monde punique. Les résultats, fondés sur des échantillons encore limités, remettent en cause l'image d'une population venue en masse du Levant.",
      rows: [
        { key: '2016', title: 'Le jeune homme de Byrsa.', text: "Inhumé à la fin du VIe siècle av. J.-C. et découvert sur la colline de Byrsa, il porte un ADN mitochondrial (lignée maternelle) du rare haplogroupe U5b2c1, d'origine européenne (Matisoo-Smith et al.). Un seul individu : un indice de brassage précoce, pas le portrait d'une population." },
        { key: '2019–2021', title: 'Ibérie, Ibiza, Sardaigne.', text: "Plusieurs études (Olalde, Marcus, Sarno, De Angelis) relèvent une ascendance nord-africaine chez des individus puniques : de 20 à 35 % à Villamar, en Sardaigne, contre très peu à Monte Sirai, fondé plus tôt par les Phéniciens ; un défunt d'un hypogée punique d'Ibiza (361–178 av. J.-C.) se distingue nettement de ses contemporains baléares." },
        { key: '2022', title: 'Kerkouane.', text: "Les douze individus étudiés (Moots et al.) sont très divers : sept proches des Siciliens de l'âge du bronze, quatre dans la continuité des agriculteurs néolithiques du Maghreb, un proche des Marocains et Mozabites actuels. Aucune ascendance levantine notable : les auteurs évoquent l'incinération des premiers colons ou leur petit nombre." },
        { key: '2025', title: 'Deux cents génomes.', text: "Une étude de l'institut Max-Planck et de Harvard (Ringbauer et al., Nature) porte sur environ 200 individus de 14 sites. Presque aucune ascendance levantine : les Puniques descendent surtout de populations proches de la Sicile et de l'Égée, le reste venant en grande partie d'Afrique du Nord. À Carthage, 14 des 17 individus ont moins de 15 % d'ascendance nord-africaine, les trois autres entre 20 et 50 %." }
      ],
      sumK: 'À retenir',
      sumT: "Une culture qui voyage plus que les gènes",
      sum: [
        "La culture phénicienne s'est diffusée surtout par le commerce, les contacts et l'assimilation, non par une migration massive.",
        "Les populations nord-africaines ont contribué de façon substantielle aux villes puniques, dans une proportion variable selon les lieux.",
        "Prudence : peu d'individus par site, et l'incinération pratiquée aux premiers siècles prive les généticiens des premiers colons.",
        "L'ADN ne dit ni la langue, ni la religion, ni l'identité : les Carthaginois parlaient phénicien et honoraient les dieux de Tyr."
      ],
      anthK: 'Anthropologie biologique',
      anthT: 'Crânes et dents',
      anth: [
        { key: 'Dents', val: "La morphologie dentaire des Carthaginois les rapproche de populations nord-africaines, notamment des Guanches des Canaries (Guatelli-Steinberg, Irish, Lukacs)." },
        { key: 'Crânes', val: "L'étude de M.-C. Chamla et D. Ferembach, reprise par S. O. Y. Keita, rapproche la série carthaginoise d'Algériens protohistoriques, puis de Romains de Tarragone." },
        { key: '2018', val: "Pour Keita, douze crânes carthaginois antérieurs à Hannibal se placent entre séries phéniciennes et maghrébines, plus près de ces dernières : le signe d'un mélange." }
      ]
    },
    legacy: {
      title: "L'héritage carthaginois en Afrique",
      aside: 'Ce que Carthage a légué au continent.',
      items: [
        { title: 'Le nom du continent', text: "L'héritage le plus durable : le nom même de l'Afrique vient de la terre où s'élevait la cité punique.", items: ['Africa (latin) → Ifriqiya (arabe) → Afrique', 'De la Tunisie au continent entier en 2 000 ans', 'La plupart des langues du monde en utilisent une forme dérivée'] },
        { title: "L'exploration africaine", text: "Les Carthaginois comptent parmi les premiers explorateurs des côtes atlantiques de l'Afrique.", items: ["Hannon longe la côte ouest de l'Afrique (vers 500 av. J.-C.)", "Il atteint peut-être le golfe de Guinée — la limite reste discutée", "Son Périple est le plus ancien récit d'exploration de l'Afrique occidentale"] },
        { title: "L'urbanisme nord-africain", img: '/img/kerkouane.jpg', alt: 'Kerkouane, cité punique du cap Bon', text: "Carthage pose les bases de la ville en Afrique du Nord ; Kerkouane, au cap Bon, en est le meilleur témoin.", items: ['Réseau de villes puniques de la Tunisie au Maroc', 'Modèle urbain repris par les Romains puis les Arabes', 'Techniques de construction adaptées au climat'] },
        { title: "L'agriculture", text: "Les techniques carthaginoises ont transformé les campagnes d'Afrique du Nord.", items: ["Oléiculture intensive", "Irrigation en zone semi-aride", "Le traité de Magon, traduit en latin sur ordre du Sénat, influence l'agriculture romaine"] }
      ]
    },
    facts: {
      title: 'Le saviez-vous ?',
      items: [
        { title: 'Saint Augustin et le punique', text: "Augustin d'Hippone (354–430), Berbère romanisé, rapporte que le punique se parlait encore dans les campagnes — plus de 500 ans après la chute de Carthage." },
        { title: "Le Périple d'Hannon", text: "Vers 500 av. J.-C., 60 navires et 30 000 colons le long de la côte atlantique. Le récit décrit des « gorilles » — sans doute des chimpanzés ou des gorilles — et une montagne en feu." },
        { title: 'Carthage romaine', text: "Décidée par César, la refondation de Carthage est réalisée sous Auguste (29 av. J.-C.). La ville redevient l'une des plus grandes de l'Empire, capitale de l'Africa." },
        { title: 'Ifriqiya', text: "Le mot arabe إفريقية, qui désigna la Tunisie médiévale, transcrit directement le latin Africa." },
        { title: 'Patrimoine mondial', text: "Le site de Carthage, dans la banlieue nord de Tunis, est inscrit au patrimoine mondial de l'UNESCO depuis 1979." },
        { title: 'Un héros africain', text: "Hannibal, né à Carthage, mena une armée largement africaine contre la plus grande puissance européenne de son temps." }
      ]
    },
    more: {
      title: 'À lire aussi',
      items: [
        { to: '/tunisie', img: '/img/byrsa.jpg', alt: 'Colline de Byrsa', kicker: 'Aujourd’hui', title: 'Carthage vit en Tunisie', text: "Un nom en quatre langues, et partout dans la Tunisie d'aujourd'hui." },
        { to: '/fondation', img: '/img/guerin-dido.jpg', alt: 'Didon, par P.-N. Guérin', kicker: '814 av. J.-C.', title: 'La fondation', text: "Élissa, la peau de bœuf et la naissance de Qart-Hadasht." },
        { to: '/hannon', img: '/img/hanno-galley.png', alt: "Galère d'Hannon", kicker: 'Explorateur', title: 'Hannon le Navigateur', text: "Le périple le long des côtes atlantiques de l'Afrique." }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Pline l\'Ancien', work: 'Histoire naturelle', ref: 'XVIII, 22', note: 'extension du nom Africa ; bibliothèques de Carthage remises aux rois numides' },
      { type: 'ancient', author: 'Pomponius Mela', work: 'Chorographie', note: 'Africa pour tout le continent connu' },
      { type: 'ancient', author: 'Appien d\'Alexandrie', work: 'Libyca (Le Livre africain)', note: 'maisons de six étages près de Byrsa' },
      { type: 'ancient', author: 'Saint Augustin', note: 'punique parlé dans les campagnes ; paysans se disant « Chanani »' },
      { type: 'ancient', author: 'Anonyme', work: 'Périple d\'Hannon', note: 'exploration de la côte atlantique de l\'Afrique' },
      { type: 'modern', author: 'Serge Lancel', work: 'Carthage', ref: 'Fayard, 1992' },
      { type: 'modern', author: 'Stéphane Gsell', work: 'Histoire ancienne de l\'Afrique du Nord', ref: 'Hachette, 1920 (t. IV)' },
      { type: 'modern', author: 'M\'hamed Hassine Fantar', work: 'Carthage, approche d\'une civilisation', ref: 'Alif, 1993' },
      { type: 'modern', author: 'Josephine Quinn', work: 'In Search of the Phoenicians', ref: 'Princeton University Press, 2018' },
      { type: 'modern', author: 'Gabriel Camps', work: 'Les Berbères : mémoire et identité', ref: '1987' },
      { type: 'modern', author: 'Marcel Le Glay', work: 'Saturne africain : histoire', ref: '1966' },
      { type: 'modern', author: 'Matisoo-Smith et al. ; Olalde, Marcus, Sarno, De Angelis ; Moots et al. ; Ringbauer et al.', work: 'Études d\'ADN ancien', ref: '2016–2025 (Ringbauer et al., Nature, 2025)', note: 'cités dans la page' },
      { type: 'modern', author: 'M.-C. Chamla et D. Ferembach ; S. O. Y. Keita ; Guatelli-Steinberg, Irish, Lukacs', work: 'Anthropologie biologique', note: 'crânes et dents, cités dans la page' },
      { type: 'modern', author: 'Wikipédia', work: 'Carthage ; Civilisation carthaginoise', note: 'CC BY-SA 4.0, contenus reformulés' }
    ]
  },
  en: {
    meta: {
      title: 'Africa and its name',
      desc: 'Afri, Africa, Ifriqiya: how the name of the land of Carthage, present-day Tunisia, became the name of an entire continent.'
    },
    hero: {
      chip: 'Africa and its name',
      lede: 'For the Romans, <i>Africa</i> first meant the province created in 146 BC on the territory of Carthage — the north-east of present-day Tunisia. Over two thousand years, the name spread to the whole continent.',
      alt: 'Bardo National Museum, Tunis',
      caption: 'Bardo National Museum, Tunis'
    },
    theories: {
      title: 'Where does "Afri" come from?',
      aside: 'Four hypotheses have been proposed. None is proven; the first is the most widely accepted.',
      items: [
        { origin: 'Berber · most accepted', word: 'Ifri', gloss: '"cave"', text: 'The Afri (or Aourigha), a Berber people living near Carthage. The Berber word ifri would refer to cave dwellers.', detail: "The Romans are thought to have extended the name of Carthage's immediate neighbours to the whole region." },
        { origin: 'Phoenician', word: 'Afar', script: '𐤏𐤐𐤓', scriptCls: 'phoen', scriptDir: 'rtl', gloss: '"dust, earth"', text: 'In the language of Carthage, ʿafar means "dust" or "earth": Africa would simply be "the land".', detail: 'An etymology that would echo the semi-arid landscapes of inland Tunisia.' },
        { origin: 'Latin', word: 'Aprica', gloss: '"sunny"', text: 'The Latin aprica, "exposed to the sun", suggested by Isidore of Seville among others to explain the hot climate.', detail: 'Appealing, but now regarded as a folk etymology.' },
        { origin: 'Greek', word: 'Aphrikē', script: 'ἀ-φρίκη', scriptCls: 'serif', gloss: '"without cold"', text: 'From the Greek a-phrikē, "without shivering": a warm land, as opposed to the Greek climate.', detail: 'Reported by Leo Africanus in the 16th century; a minority view among specialists.' }
      ]
    },
    journey: {
      title: 'The journey of a name',
      aside: 'From a local people to a continent of 54 countries.',
      steps: [
        { date: 'Before 814 BC', name: 'Afri', title: 'The land of the Afri', text: 'A local people, not a continent. The Egyptians call the western Libyans Tehenu and Temehu.' },
        { date: '814 BC', name: 'Libyē', title: 'Carthage is founded', text: 'Tyrians settle on Libyan land. The Greeks call the whole region "Libya".' },
        { date: '264–146 BC', name: 'Afer', title: 'The Punic Wars', text: 'In contact with Carthage, the Romans call the inhabitants Afer (plural Afri).' },
        { date: '146 BC', name: 'Africa', title: 'Province of Africa', text: 'After destroying Carthage, Rome creates the province of Africa: the first official use of the name.', key: true },
        { date: '1st c. AD', name: 'Africa', title: 'The name spreads', text: 'Pliny the Elder and Pomponius Mela use Africa for the whole known continent, distinct from Africa proper.' },
        { date: '7th century', name: 'إفريقية', ar: true, title: 'Ifriqiya', text: 'The Arab conquerors adopt the Latin name for Tunisia and its borderlands, with Kairouan as capital.' },
        { date: '15th–16th c.', name: 'Africa', title: 'The whole continent', text: 'With the great voyages, cartographers extend the name down to the Cape of Good Hope.' }
      ]
    },
    ifr: {
      kicker: 'Ifriqiya',
      title: 'A name never forgotten',
      text: 'Ifriqiya (إفريقية) is a direct transcription of the Latin Africa. Used throughout the Middle Ages for Tunisia, together with eastern Algeria and Tripolitania, it shows that the name never left the region. Meanwhile Carthage itself, refounded by Rome, had again become the capital of Roman Africa.',
      more: 'See also: Carthage lives in Tunisia →',
      alt: 'Great Mosque of Kairouan',
      caption: 'Kairouan, founded in 670, capital of Ifriqiya'
    },
    peoples: {
      title: 'North Africa before Carthage',
      aside: 'The peoples who preceded, welcomed and lived alongside the Phoenicians.',
      items: [
        { period: '10th–6th millennium BC', name: 'The Capsians', text: 'A prehistoric culture named after Gafsa (Capsa) in Tunisia. Probable ancestors of the Berbers, they left many archaeological sites.' },
        { period: 'Since prehistory', name: 'The Berbers (Imazighen)', text: 'The indigenous people of the Maghreb for millennia, ancestors of today’s Amazigh. A rich rock art attests to their presence.' },
        { period: '4th–1st c. BC', name: 'The Numidian kingdoms', img: '/img/massinissa.jpg', alt: 'Masinissa, king of the Numidians', text: 'Elite horsemen from present-day Algeria and western Tunisia. Masinissa weighed heavily at the end of the Second Punic War; Numidian cavalry served Carthage, then Rome.' },
        { period: '1st millennium BC', name: 'The Garamantes', text: 'In the Fezzan (Libya), a prosperous civilisation in the heart of the Sahara thanks to underground irrigation channels (foggaras), at the centre of trans-Saharan trade.' }
      ]
    },
    identity: {
      kicker: 'An African city',
      title: "Carthage's African identity",
      alt: 'Mosaic known as "the Lady of Carthage"',
      caption: '"The Lady of Carthage", mosaic, Carthage Museum',
      items: [
        { title: 'A blend of cultures', text: 'Phoenician traditions and Libyco-Berber cultures mixed; intermarriage was common. The resulting Punic culture was distinctly African.' },
        { title: 'Religion', text: 'Baal Hammon and Tanit, brought from Phoenicia, took on a new place and new forms in Carthage; the influence of Libyan cults is debated.', link: '/religion', linkLabel: 'Religion →' },
        { title: 'The Punic language', text: 'Derived from Phoenician, Punic was still spoken in North Africa until the 5th century AD, as Saint Augustine attests.' },
        { title: 'Architecture', text: 'Appian describes six-storey houses near Byrsa; Punic town planning adapted to the African site and climate.' },
        { title: 'An army of peoples', text: 'Libyans, Numidians and Moors fought alongside Iberians, Balearic slingers and Gauls: the army reflected Carthage’s African roots.', link: '/armee', linkLabel: 'The army →' },
        { title: 'Farming know-how', text: 'Phoenician skills combined with local knowledge of soils produced one of the most productive agricultures of antiquity.', link: '/agriculture', linkLabel: 'Agriculture →' }
      ]
    },
    mixed: {
      title: 'A mixed civilisation',
      aside: 'A culture from the East, rooted in Africa, open to Greece and Egypt: Carthage was a crossroads.',
      items: [
        { kicker: 'Eastern survivals', title: 'Canaanite roots', paras: [
          'Phoenician culture emerged from the Canaanite world after the upheavals of the “Sea Peoples”, around 1200 BC. It absorbed Egyptian and later Greek influences early on. Carthage inherited this blend and carried it west.',
          "According to Augustine, African peasants still called themselves “Chanani”, Canaanites, more than five centuries after 146. The testimony is debated: Josephine Quinn sees a rhetorical turn of phrase, and Gabriel Camps a Libyan dialect, since punicus then often meant “African”."
        ] },
        { kicker: 'Egypt and Greece', title: 'Works of two cultures', paras: [
          'Small glass masks placed in tombs to ward off demons, the lotus motif: Egypt is everywhere. From the 4th century BC, Greek influences were layered on top.',
          'The Motya youth, a 5th-century marble found in 1979, sums up the problem: a Hellenised Melqart, Greek war booty, or a Punic commission from a Sicilian sculptor? For Serge Lancel, Carthage was above all a hub, highly open to outside influences.'
        ] },
        { kicker: 'African contributions', title: 'Libyan and Punic combined', paras: [
          'The Libyco-Punic mausoleum of Dougga (2nd century BC) blends Egyptian traditions and Greek contributions on Numidian soil. At El Hofra, near Cirta (Constantine), the most important Neo-Punic sanctuary excavated combines Libyan and Punic elements.',
          'In the towns of Roman Africa, there were sometimes three suffetes instead of two: some specialists see this as a Berber contribution.'
        ] },
        { kicker: 'After 146', title: 'An identity that survived', paras: [
          'Suffetes still governed towns of Roman Africa in the 2nd century AD. The opus africanum of Kerkouane reappears in the Capitol of Dougga. Baal Hammon became the African Saturn, worshipped until the 4th century, and Tanit the Roman Caelestis (Marcel Le Glay).',
          "According to Pliny (XVIII, 22), the books of Carthage's libraries were handed to the Numidian kings. For Stéphane Gsell and later M. H. Fantar, the survival of a Semitic language may have eased, much later, the Arabisation of the Maghreb."
        ] }
      ]
    },
    dna: {
      kicker: 'Genetics and anthropology',
      title: 'What ancient DNA says',
      lede: 'For about a decade, ancient DNA has been used to question the origins of the people of the Punic world. The results, based on still limited samples, challenge the picture of a population that came en masse from the Levant.',
      rows: [
        { key: '2016', title: 'The Young Man of Byrsa.', text: "Buried at the end of the 6th century BC and found on Byrsa hill, he carries mitochondrial DNA (maternal line) of the rare haplogroup U5b2c1, of European origin (Matisoo-Smith et al.). A single individual: a hint of early mixing, not the portrait of a population." },
        { key: '2019–2021', title: 'Iberia, Ibiza, Sardinia.', text: 'Several studies (Olalde, Marcus, Sarno, De Angelis) find North African ancestry in Punic individuals: 20 to 35% at Villamar in Sardinia, against very little at Monte Sirai, founded earlier by the Phoenicians; a man from a Punic hypogeum on Ibiza (361–178 BC) clearly stands apart from his Balearic contemporaries.' },
        { key: '2022', title: 'Kerkouane.', text: 'The twelve individuals studied (Moots et al.) are highly diverse: seven close to Bronze Age Sicilians, four continuous with the Neolithic farmers of the Maghreb, one close to present-day Moroccans and Mozabites. No notable Levantine ancestry: the authors suggest the cremation of the first settlers or their small numbers.' },
        { key: '2025', title: 'Two hundred genomes.', text: 'A study by the Max Planck Institute and Harvard (Ringbauer et al., Nature) covers about 200 individuals from 14 sites. Almost no Levantine ancestry: Punic people descend mainly from populations close to Sicily and the Aegean, the rest largely from North Africa. At Carthage, 14 of 17 individuals have less than 15% North African ancestry, the other three between 20 and 50%.' }
      ],
      sumK: 'Key points',
      sumT: 'A culture that travelled more than genes',
      sum: [
        'Phoenician culture spread mainly through trade, contact and assimilation, not through mass migration.',
        'North African populations contributed substantially to Punic towns, in proportions that vary from place to place.',
        'Caution: few individuals per site, and the cremation practised in the early centuries deprives geneticists of the first settlers.',
        'DNA tells us nothing of language, religion or identity: the Carthaginians spoke Phoenician and worshipped the gods of Tyre.'
      ],
      anthK: 'Biological anthropology',
      anthT: 'Skulls and teeth',
      anth: [
        { key: 'Teeth', val: 'The dental morphology of the Carthaginians places them close to North African populations, notably the Guanches of the Canary Islands (Guatelli-Steinberg, Irish, Lukacs).' },
        { key: 'Skulls', val: 'The study by M.-C. Chamla and D. Ferembach, taken up by S. O. Y. Keita, links the Carthaginian series to protohistoric Algerians, then to Romans from Tarragona.' },
        { key: '2018', val: 'For Keita, twelve Carthaginian skulls from before Hannibal fall between Phoenician and Maghrebi series, nearer the latter: a sign of mixing.' }
      ]
    },
    legacy: {
      title: "Carthage's legacy in Africa",
      aside: 'What Carthage bequeathed to the continent.',
      items: [
        { title: 'The name of the continent', text: 'The most lasting legacy: the very name of Africa comes from the land where the Punic city stood.', items: ['Africa (Latin) → Ifriqiya (Arabic) → Afrique / Africa', 'From Tunisia to the whole continent in 2,000 years', 'Most of the world’s languages use a form of it'] },
        { title: 'Exploring Africa', text: 'The Carthaginians were among the first explorers of Africa’s Atlantic coasts.', items: ['Hanno sails down the west coast of Africa (c. 500 BC)', 'He may have reached the Gulf of Guinea — how far is debated', 'His Periplus is the oldest account of the exploration of West Africa'] },
        { title: 'North African town planning', img: '/img/kerkouane.jpg', alt: 'Kerkouane, Punic town on Cape Bon', text: 'Carthage laid the foundations of the city in North Africa; Kerkouane, on Cape Bon, is its best witness.', items: ['A network of Punic towns from Tunisia to Morocco', 'An urban model taken up by the Romans, then the Arabs', 'Building techniques adapted to the climate'] },
        { title: 'Agriculture', text: 'Carthaginian techniques transformed the North African countryside.', items: ['Intensive olive growing', 'Irrigation in semi-arid areas', 'Mago’s treatise, translated into Latin by order of the Senate, shaped Roman farming'] }
      ]
    },
    facts: {
      title: 'Did you know?',
      items: [
        { title: 'Saint Augustine and Punic', text: 'Augustine of Hippo (354–430), a Romanised Berber, reports that Punic was still spoken in the countryside — more than 500 years after the fall of Carthage.' },
        { title: 'The Periplus of Hanno', text: 'Around 500 BC, 60 ships and 30,000 settlers along the Atlantic coast. The account describes "gorillas" — probably chimpanzees or gorillas — and a mountain on fire.' },
        { title: 'Roman Carthage', text: 'Planned by Caesar, the refoundation of Carthage was carried out under Augustus (29 BC). It became one of the largest cities of the Empire, capital of Africa.' },
        { title: 'Ifriqiya', text: 'The Arabic word إفريقية, the name of medieval Tunisia, is a direct transcription of the Latin Africa.' },
        { title: 'World Heritage', text: 'The site of Carthage, in the northern suburbs of Tunis, has been a UNESCO World Heritage Site since 1979.' },
        { title: 'An African hero', text: 'Hannibal, born in Carthage, led a largely African army against the greatest European power of his day.' }
      ]
    },
    more: {
      title: 'Read also',
      items: [
        { to: '/tunisie', img: '/img/byrsa.jpg', alt: 'Byrsa Hill', kicker: 'Today', title: 'Carthage lives in Tunisia', text: 'One name in four languages, and everywhere in today’s Tunisia.' },
        { to: '/fondation', img: '/img/guerin-dido.jpg', alt: 'Dido, by P.-N. Guérin', kicker: '814 BC', title: 'The foundation', text: 'Elissa, the oxhide and the birth of Qart-Hadasht.' },
        { to: '/hannon', img: '/img/hanno-galley.png', alt: "Hanno's galley", kicker: 'Explorer', title: 'Hanno the Navigator', text: 'The voyage along the Atlantic coasts of Africa.' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'Pliny the Elder', work: 'Natural History', ref: 'XVIII, 22', note: 'the spread of the name Africa; Carthage\'s libraries given to the Numidian kings' },
      { type: 'ancient', author: 'Pomponius Mela', work: 'Description of the World (De chorographia)', note: 'Africa for the whole known continent' },
      { type: 'ancient', author: 'Appian of Alexandria', work: 'Libyca (The African Book)', note: 'six-storey houses near Byrsa' },
      { type: 'ancient', author: 'Saint Augustine', note: 'Punic spoken in the countryside; peasants calling themselves “Chanani”' },
      { type: 'ancient', author: 'Anonymous', work: 'Periplus of Hanno', note: 'exploration of Africa\'s Atlantic coast' },
      { type: 'modern', author: 'Serge Lancel', work: 'Carthage', ref: 'Fayard, 1992' },
      { type: 'modern', author: 'Stéphane Gsell', work: 'Histoire ancienne de l\'Afrique du Nord', ref: 'Hachette, 1920 (vol. IV)' },
      { type: 'modern', author: 'M\'hamed Hassine Fantar', work: 'Carthage, approche d\'une civilisation', ref: 'Alif, 1993' },
      { type: 'modern', author: 'Josephine Quinn', work: 'In Search of the Phoenicians', ref: 'Princeton University Press, 2018' },
      { type: 'modern', author: 'Gabriel Camps', work: 'Les Berbères : mémoire et identité', ref: '1987' },
      { type: 'modern', author: 'Marcel Le Glay', work: 'Saturne africain : histoire', ref: '1966' },
      { type: 'modern', author: 'Matisoo-Smith et al.; Olalde, Marcus, Sarno, De Angelis; Moots et al.; Ringbauer et al.', work: 'Ancient DNA studies', ref: '2016–2025 (Ringbauer et al., Nature, 2025)', note: 'cited on this page' },
      { type: 'modern', author: 'M.-C. Chamla and D. Ferembach; S. O. Y. Keita; Guatelli-Steinberg, Irish, Lukacs', work: 'Biological anthropology', note: 'skulls and teeth, cited on this page' },
      { type: 'modern', author: 'Wikipedia (French)', work: 'Carthage; Civilisation carthaginoise', note: 'CC BY-SA 4.0, content rephrased' }
    ]
  },
  ar: {
    meta: {
      title: 'إفريقيا واسمها',
      desc: 'أفري، أفريكا، إفريقية: كيف صار اسم أرض قرطاج، تونس الحالية، اسمًا لقارة بأكملها.'
    },
    hero: {
      chip: 'إفريقيا واسمها',
      lede: 'عند الرومان، كانت <i>Africa</i> تعني أولًا الولاية التي أُنشئت سنة 146 ق.م على أرض قرطاج — شمال شرق تونس الحالية. ثم امتد الاسم، على مدى ألفي عام، إلى القارة كلها.',
      alt: 'المتحف الوطني بباردو، تونس',
      caption: 'المتحف الوطني بباردو، تونس'
    },
    theories: {
      title: 'من أين جاءت كلمة «أفري»؟',
      aside: 'اقتُرحت أربع فرضيات، لم تثبت أيّ منها؛ والأولى هي الأكثر قبولًا.',
      items: [
        { origin: 'أمازيغية · الأكثر قبولًا', word: 'Ifri', gloss: '«المغارة، الكهف»', text: 'الأفري (أو أوريغة) شعب أمازيغي جار لقرطاج. وكلمة «إفري» الأمازيغية تشير إلى سكان المغارات.', detail: 'يُرجَّح أن الرومان عمّموا اسم هؤلاء الجيران المباشرين لقرطاج على المنطقة كلها.' },
        { origin: 'فينيقية', word: 'Afar', script: '𐤏𐤐𐤓', scriptCls: 'phoen', scriptDir: 'rtl', gloss: '«الغبار، التراب»', text: 'في لغة قرطاج تعني «عَفَر» الغبار أو التراب: فتكون أفريكا ببساطة «البلاد».', detail: 'اشتقاق يذكّر بالمشاهد شبه الجافة في الداخل التونسي.' },
        { origin: 'لاتينية', word: 'Aprica', gloss: '«المشمسة»', text: 'اللاتينية aprica أي «المعرّضة للشمس»، اقترحها خصوصًا إيسيدور الإشبيلي لتفسير حرارة المناخ.', detail: 'فرضية جذابة، لكنها تُعدّ اليوم اشتقاقًا شعبيًا.' },
        { origin: 'إغريقية', word: 'Aphrikē', script: 'ἀ-φρίκη', scriptCls: 'serif', gloss: '«بلا برد»', text: 'من الإغريقية a-phrikē أي «بلا قشعريرة»: أرض دافئة مقارنة بمناخ بلاد الإغريق.', detail: 'نقلها الحسن الوزان (ليون الإفريقي) في القرن السادس عشر؛ وهي رأي أقلية بين المختصين.' }
      ]
    },
    journey: {
      title: 'رحلة اسم',
      aside: 'من شعب محلي إلى قارة تضم 54 دولة.',
      steps: [
        { date: 'قبل 814 ق.م', name: 'Afri', title: 'أرض الأفري', text: 'شعب محلي لا قارة. وكان المصريون يسمّون الليبيين الغربيين «تحنو» و«تمحو».' },
        { date: '814 ق.م', name: 'Libyē', title: 'تأسيس قرطاج', text: 'يستقر الصوريون في أرض ليبية، ويسمّي الإغريق المنطقة كلها «ليبيا».' },
        { date: '264–146 ق.م', name: 'Afer', title: 'الحروب البونيقية', text: 'باحتكاكهم بقرطاج، سمّى الرومان السكان Afer (والجمع Afri).' },
        { date: '146 ق.م', name: 'Africa', title: 'ولاية إفريقية', text: 'بعد تدمير قرطاج أنشأت روما ولاية Africa: أول استعمال رسمي للاسم.', key: true },
        { date: 'القرن 1 م', name: 'Africa', title: 'اتساع الاسم', text: 'استعمل بلينيوس الأكبر وبومبونيوس ميلا اسم Africa للقارة المعروفة كلها، تمييزًا لها عن إفريقية بالمعنى الضيق.' },
        { date: 'القرن 7', name: 'إفريقية', ar: true, title: 'إفريقية', text: 'اعتمد الفاتحون العرب الاسم اللاتيني لتونس وأطرافها، وعاصمتها القيروان.' },
        { date: 'القرنان 15–16', name: 'Afrique', title: 'القارة كلها', text: 'مع الرحلات البحرية الكبرى، مدّ رسّامو الخرائط الاسم حتى رأس الرجاء الصالح.' }
      ]
    },
    ifr: {
      kicker: 'إفريقية',
      title: 'اسم لم يُنسَ قط',
      text: '«إفريقية» نقلٌ مباشر للّاتينية Africa. استُعمل طوال العصر الوسيط لتونس مع شرق الجزائر الحالية وطرابلس، وهو دليل على أن الاسم لم يغادر المنطقة قط. وفي الأثناء كانت قرطاج نفسها، بعد أن أعاد الرومان تأسيسها، قد عادت عاصمةً لإفريقية الرومانية.',
      more: 'انظر أيضًا: قرطاج تحيا في تونس ←',
      alt: 'جامع القيروان الكبير',
      caption: 'القيروان، تأسست سنة 670، عاصمة إفريقية'
    },
    peoples: {
      title: 'شمال إفريقيا قبل قرطاج',
      aside: 'الشعوب التي سبقت الفينيقيين واستقبلتهم وجاورتهم.',
      items: [
        { period: 'الألفية 10–6 ق.م', name: 'القفصيون', text: 'ثقافة ما قبل التاريخ سُمّيت نسبةً إلى قفصة (Capsa) في تونس. يُرجَّح أنهم أسلاف الأمازيغ، وتركوا مواقع أثرية عديدة.' },
        { period: 'منذ ما قبل التاريخ', name: 'الأمازيغ', text: 'السكان الأصليون للمغرب الكبير منذ آلاف السنين، أسلاف الأمازيغ الحاليين. ويشهد على حضورهم فنّ صخري غني.' },
        { period: 'القرن 4–1 ق.م', name: 'الممالك النوميدية', img: '/img/massinissa.jpg', alt: 'ماسينيسا، ملك النوميديين', text: 'فرسان النخبة من الجزائر الحالية وغرب تونس. كان لماسينيسا وزن حاسم في نهاية الحرب البونيقية الثانية؛ وخدم الفرسان النوميديون قرطاج ثم روما.' },
        { period: 'الألفية 1 ق.م', name: 'الجرمنت', text: 'في فزّان (ليبيا)، حضارة مزدهرة في قلب الصحراء بفضل قنوات ري جوفية (الفقارات)، في قلب التجارة العابرة للصحراء.' }
      ]
    },
    identity: {
      kicker: 'مدينة إفريقية',
      title: 'الهوية الإفريقية لقرطاج',
      alt: 'فسيفساء «سيدة قرطاج»',
      caption: '«سيدة قرطاج»، فسيفساء، متحف قرطاج',
      items: [
        { title: 'امتزاج الثقافات', text: 'امتزجت التقاليد الفينيقية بالثقافات الليبية الأمازيغية، وكان الزواج المختلط شائعًا. فجاءت الثقافة البونيقية إفريقية الطابع.' },
        { title: 'الديانة', text: 'بعل حمون وتانيت، القادمان من فينيقيا، اتخذا في قرطاج مكانة وأشكالًا جديدة؛ أما تأثير العبادات الليبية فمحلّ نقاش.', link: '/religion', linkLabel: 'الديانة ←' },
        { title: 'اللغة البونيقية', text: 'بقيت البونيقية، المتفرعة عن الفينيقية، متداولة في شمال إفريقيا حتى القرن الخامس للميلاد، كما يشهد القديس أوغسطين.' },
        { title: 'العمارة', text: 'يصف أبيانوس بيوتًا من ستة طوابق قرب بيرصا؛ وتكيّف العمران البونيقي مع الموقع والمناخ الإفريقيين.' },
        { title: 'جيش من الشعوب', text: 'قاتل الليبيون والنوميديون والموريون إلى جانب الإيبيريين والبليار والغاليين: جيش يعكس تجذّر قرطاج في إفريقيا.', link: '/armee', linkLabel: 'الجيش ←' },
        { title: 'خبرة زراعية', text: 'أنتج امتزاج الخبرة الفينيقية بالمعرفة المحلية للتربة واحدة من أكثر الزراعات إنتاجًا في العصور القديمة.', link: '/agriculture', linkLabel: 'الزراعة ←' }
      ]
    },
    mixed: {
      title: 'حضارة ممتزجة',
      aside: 'ثقافة قادمة من المشرق، متجذرة في إفريقيا، ومنفتحة على بلاد الإغريق ومصر: كانت قرطاج ملتقى طرق.',
      items: [
        { kicker: 'بقايا مشرقية', title: 'جذور كنعانية', paras: [
          'تبلورت الثقافة الفينيقية من العالم الكنعاني بعد اضطرابات «شعوب البحر» نحو 1200 ق.م. واستوعبت مبكرًا تأثيرات مصرية ثم إغريقية. ورثت قرطاج هذا المزيج وحملته إلى الغرب.',
          'حسب أوغسطين، كان فلاحون أفارقة لا يزالون يسمّون أنفسهم «خناني»، أي كنعانيين، بعد أكثر من خمسة قرون من 146. والشهادة موضع نقاش: ترى فيها جوزفين كوين صيغة بلاغية، ويرى غابرييل كامب لهجة ليبية، إذ كانت كلمة punicus تعني حينها غالبًا «إفريقي».'
        ] },
        { kicker: 'مصر وبلاد الإغريق', title: 'أعمال بثقافتين', paras: [
          'أقنعة زجاجية صغيرة توضع في القبور لطرد الشياطين، وزخرفة زهرة اللوتس: مصر حاضرة في كل مكان. ومنذ القرن الرابع ق.م تتراكب فوقها التأثيرات الإغريقية.',
          'يلخّص فتى موتيا، وهو تمثال رخامي من القرن الخامس اكتُشف سنة 1979، المسألة كلها: ملقرت مُهلَّن، أم غنيمة حرب إغريقية، أم طلبية بونيقية من نحّات صقلي؟ ويرى سيرج لانسيل أن قرطاج كانت قبل كل شيء محورًا شديد الانفتاح على التأثيرات الخارجية.'
        ] },
        { kicker: 'إسهامات إفريقية', title: 'الليبي والبونيقي ممتزجان', paras: [
          'يجمع الضريح الليبي البونيقي في دقة (القرن الثاني ق.م) بين التقاليد المصرية والإسهامات الإغريقية على أرض نوميدية. وفي الحفرة قرب سيرتا (قسنطينة)، يمزج أهم معبد بونيقي جديد جرى التنقيب فيه بين عناصر ليبية وبونيقية.',
          'في مدن إفريقيا الرومانية، كان عدد الشفطين أحيانًا ثلاثة بدل اثنين: ويرى بعض المختصين في ذلك إسهامًا أمازيغيًا.'
        ] },
        { kicker: 'بعد 146', title: 'هوية تبقى', paras: [
          'ظل شفطون يديرون مدنًا في إفريقيا الرومانية حتى القرن الثاني م. ونجد البناء الإفريقي (opus africanum) في كركوان كما في الكابيتول بدقة. وصار بعل حمون زحلَ الإفريقي المعبود حتى القرن الرابع، وتانيت «كايليستيس» الرومانية (مارسيل لوغلاي).',
          'حسب بلينيوس (18، 22)، سُلّمت كتب مكتبات قرطاج إلى الملوك النوميديين. ويرى ستيفان غزال ثم محمد حسين فنطر أن بقاء لغة سامية ربما سهّل، بعد ذلك بزمن طويل، تعريب المغرب.'
        ] }
      ]
    },
    dna: {
      kicker: 'علم الوراثة والأنثروبولوجيا',
      title: 'ماذا يقول الحمض النووي القديم',
      lede: 'منذ نحو عشر سنوات يُستخدم الحمض النووي القديم لمساءلة أصول سكان العالم البونيقي. والنتائج، المبنية على عينات لا تزال محدودة، تشكّك في صورة سكان قدموا بأعداد كبيرة من المشرق.',
      rows: [
        { key: '2016', title: 'فتى بيرصا.', text: 'دُفن في أواخر القرن السادس ق.م واكتُشف على تلة بيرصا، ويحمل حمضًا نوويًا ميتوكوندريًا (سلالة الأم) من المجموعة النادرة U5b2c1 ذات الأصل الأوروبي (ماتيسو-سميث وزملاؤها). فرد واحد فقط: مؤشر على اختلاط مبكر، لا صورة لشعب بأكمله.' },
        { key: '2019–2021', title: 'إيبيريا وإيبيزا وسردينيا.', text: 'تكشف عدة دراسات (أولالدي، ماركوس، سارنو، دي أنجليس) عن أصول شمال إفريقية لدى أفراد بونيقيين: من 20 إلى 35% في فيلامار بسردينيا، مقابل نسبة ضئيلة جدًا في مونتي سيراي التي أسسها الفينيقيون قبل ذلك؛ ويتميز متوفى من مدفن بونيقي في إيبيزا (361–178 ق.م) بوضوح عن معاصريه في جزر البليار.' },
        { key: '2022', title: 'كركوان.', text: 'الأفراد الاثنا عشر المدروسون (موتس وزملاؤها) شديدو التنوع: سبعة قريبون من صقليي العصر البرونزي، وأربعة في استمرارية مع مزارعي العصر الحجري الحديث في المغرب، وواحد قريب من المغاربة والمزابيين الحاليين. ولا أثر يُذكر لأصول مشرقية: ويشير الباحثون إلى حرق جثث المستوطنين الأوائل أو إلى قلة عددهم.' },
        { key: '2025', title: 'مئتا جينوم.', text: 'دراسة لمعهد ماكس بلانك وجامعة هارفارد (رينغباور وزملاؤه، مجلة Nature) شملت نحو 200 فرد من 14 موقعًا. تكاد الأصول المشرقية تنعدم: ينحدر البونيقيون أساسًا من سكان قريبين من صقلية وبحر إيجه، والباقي في معظمه من شمال إفريقيا. وفي قرطاج، لدى 14 من أصل 17 فردًا أقل من 15% من الأصول الشمال إفريقية، ولدى الثلاثة الآخرين بين 20 و50%.' }
      ],
      sumK: 'الخلاصة',
      sumT: 'ثقافة سافرت أكثر من الجينات',
      sum: [
        'انتشرت الثقافة الفينيقية أساسًا عبر التجارة والاحتكاك والاندماج، لا عبر هجرة جماعية.',
        'أسهم سكان شمال إفريقيا إسهامًا كبيرًا في سكان المدن البونيقية، بنسب تتفاوت من موقع إلى آخر.',
        'الحذر واجب: عدد قليل من الأفراد في كل موقع، وحرق الجثث في القرون الأولى يحرم الباحثين من المستوطنين الأوائل.',
        'لا يخبرنا الحمض النووي بشيء عن اللغة أو الدين أو الهوية: فقد تكلم القرطاجيون الفينيقية وعبدوا آلهة صور.'
      ],
      anthK: 'الأنثروبولوجيا البيولوجية',
      anthT: 'جماجم وأسنان',
      anth: [
        { key: 'الأسنان', val: 'تقرّب مورفولوجيا أسنان القرطاجيين بينهم وبين سكان شمال إفريقيا، ولا سيما الغوانش في جزر الكناري (غواتيلي-ستاينبرغ، آيرش، لوكاكس).' },
        { key: 'الجماجم', val: 'تقرّب دراسة م.-ك. شاملا ود. فيرمباخ، التي تبنّاها س. أ. ي. كيتا، السلسلة القرطاجية من جزائريي فجر التاريخ، ثم من رومان طراغونة.' },
        { key: '2018', val: 'يرى كيتا أن اثنتي عشرة جمجمة قرطاجية سابقة لعهد حنبعل تقع بين السلاسل الفينيقية والمغاربية، وأقرب إلى الأخيرة: علامة على الاختلاط.' }
      ]
    },
    legacy: {
      title: 'الإرث القرطاجي في إفريقيا',
      aside: 'ما خلّفته قرطاج للقارة.',
      items: [
        { title: 'اسم القارة', text: 'الإرث الأبقى: اسم إفريقيا نفسه جاء من الأرض التي قامت عليها المدينة البونيقية.', items: ['Africa (اللاتينية) ← إفريقية (العربية) ← Afrique', 'من تونس إلى القارة كلها في ألفي عام', 'تستعمل معظم لغات العالم صيغة مشتقة منه'] },
        { title: 'استكشاف إفريقيا', text: 'كان القرطاجيون من أوائل مستكشفي السواحل الأطلسية لإفريقيا.', items: ['حنون يبحر على طول الساحل الغربي لإفريقيا (نحو 500 ق.م)', 'ربما بلغ خليج غينيا — ومدى رحلته محلّ نقاش', 'رحلته أقدم رواية عن استكشاف غرب إفريقيا'] },
        { title: 'العمران في شمال إفريقيا', img: '/img/kerkouane.jpg', alt: 'كركوان، مدينة بونيقية في الوطن القبلي', text: 'وضعت قرطاج أسس المدينة في شمال إفريقيا؛ وكركوان في الوطن القبلي أفضل شاهد على ذلك.', items: ['شبكة مدن بونيقية من تونس إلى المغرب', 'نموذج عمراني تبنّاه الرومان ثم العرب', 'تقنيات بناء متكيّفة مع المناخ'] },
        { title: 'الزراعة', text: 'غيّرت التقنيات القرطاجية أرياف شمال إفريقيا.', items: ['زراعة الزيتون المكثفة', 'الري في المناطق شبه الجافة', 'كتاب ماغون، المترجم إلى اللاتينية بأمر من مجلس الشيوخ، أثّر في الزراعة الرومانية'] }
      ]
    },
    facts: {
      title: 'هل تعلم؟',
      items: [
        { title: 'القديس أوغسطين والبونيقية', text: 'يذكر أوغسطين الهيبوني (354–430)، الأمازيغي المتروّم، أن البونيقية كانت ما تزال تُتكلّم في الأرياف — بعد أكثر من 500 سنة من سقوط قرطاج.' },
        { title: 'رحلة حنون', text: 'نحو 500 ق.م، 60 سفينة و30 ألف مستوطن على طول الساحل الأطلسي. تصف الرواية «غوريلات» — لعلها شمبانزي أو غوريلا — وجبلًا مشتعلًا.' },
        { title: 'قرطاج الرومانية', text: 'قرّر قيصر إعادة تأسيس قرطاج، ونُفّذ ذلك في عهد أغسطس (29 ق.م). فعادت من كبريات مدن الإمبراطورية وعاصمةً لإفريقية.' },
        { title: 'إفريقية', text: 'الكلمة العربية «إفريقية»، اسم تونس في العصر الوسيط، نقلٌ مباشر للّاتينية Africa.' },
        { title: 'التراث العالمي', text: 'موقع قرطاج، في الضاحية الشمالية لتونس العاصمة، مسجّل في قائمة التراث العالمي لليونسكو منذ 1979.' },
        { title: 'بطل إفريقي', text: 'قاد حنبعل، المولود في قرطاج، جيشًا إفريقيًا في معظمه ضد أعظم قوة أوروبية في عصره.' }
      ]
    },
    more: {
      title: 'اقرأ أيضًا',
      items: [
        { to: '/tunisie', img: '/img/byrsa.jpg', alt: 'هضبة بيرصا', kicker: 'اليوم', title: 'قرطاج تحيا في تونس', text: 'اسم بأربع لغات، حاضر في كل مكان في تونس اليوم.' },
        { to: '/fondation', img: '/img/guerin-dido.jpg', alt: 'ديدون، بريشة غيران', kicker: '814 ق.م', title: 'التأسيس', text: 'عليسة وجلد الثور وميلاد قرت حدشت.' },
        { to: '/hannon', img: '/img/hanno-galley.png', alt: 'سفينة حنون', kicker: 'مستكشف', title: 'حنون الملاح', text: 'الرحلة على طول السواحل الأطلسية لإفريقيا.' }
      ]
    },
    sources: [
      { type: 'ancient', author: 'بلينيوس الأكبر', work: 'التاريخ الطبيعي', ref: '18، 22', note: 'اتساع اسم Africa، وتسليم مكتبات قرطاج إلى الملوك النوميديين' },
      { type: 'ancient', author: 'بومبونيوس ميلا', work: 'وصف العالم', note: 'اسم Africa للقارة المعروفة كلها' },
      { type: 'ancient', author: 'أبيانوس السكندري', work: 'الحروب الليبية (الكتاب الإفريقي)', note: 'بيوت من ستة طوابق قرب بيرصا' },
      { type: 'ancient', author: 'القديس أوغسطين', note: 'البونيقية في الأرياف، وفلاحون يسمّون أنفسهم «كنعانيين»' },
      { type: 'ancient', author: 'مجهول المؤلف', work: 'رحلة حنون', note: 'استكشاف الساحل الأطلسي لإفريقيا' },
      { type: 'modern', author: 'سيرج لانسيل', work: 'Carthage', ref: 'Fayard، 1992' },
      { type: 'modern', author: 'ستيفان غزال', work: 'Histoire ancienne de l\'Afrique du Nord', ref: 'Hachette، 1920 (الجزء 4)' },
      { type: 'modern', author: 'محمد حسين فنطر', work: 'Carthage, approche d\'une civilisation', ref: 'Alif، 1993' },
      { type: 'modern', author: 'جوزفين كوين', work: 'In Search of the Phoenicians', ref: 'Princeton University Press، 2018' },
      { type: 'modern', author: 'غابرييل كامب', work: 'Les Berbères : mémoire et identité', ref: '1987' },
      { type: 'modern', author: 'مارسيل لوغلاي', work: 'Saturne africain : histoire', ref: '1966' },
      { type: 'modern', author: 'ماتيسو-سميث وزملاؤها؛ أولالدي، ماركوس، سارنو، دي أنجليس؛ موتس وزملاؤها؛ رينغباور وزملاؤه', work: 'دراسات الحمض النووي القديم', ref: '2016–2025 (رينغباور وزملاؤه، Nature، 2025)', note: 'مذكورة في الصفحة' },
      { type: 'modern', author: 'م.-ك. شاملا ود. فيرمباخ؛ س. أ. ي. كيتا؛ غواتيلي-شتاينبرغ، آيرش، لوكاكس', work: 'الأنثروبولوجيا البيولوجية', note: 'الجماجم والأسنان، مذكورة في الصفحة' },
      { type: 'modern', author: 'ويكيبيديا', work: 'Carthage ؛ Civilisation carthaginoise', note: 'CC BY-SA 4.0، محتوى أعيدت صياغته' }
    ]
  }
}

const c = await useLocalized('afrique', C)

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
  top: 30px;
  font: 700 clamp(90px, 13vw, 200px)/1 var(--font-ar);
  color: rgba(255, 255, 255, 0.08);
  pointer-events: none;
  white-space: nowrap;
}

.africa-title { font-size: clamp(64px, 11vw, 168px); line-height: 0.85; }

/* Hypothèses */
.theory { min-height: 380px; }
.word { font: 900 clamp(40px, 4.4vw, 64px)/1 var(--font-display); letter-spacing: -0.03em; color: var(--purple); }
.tile--ink .word { color: var(--gold-light); }
.gloss { margin-top: 10px; font: 600 15px/1.4 var(--font-body); }
.script { display: inline-block; margin-inline-end: 6px; font-size: 20px; }
.script.serif { font-family: Georgia, serif; }
.detail { margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(22, 19, 15, 0.15); font: 500 13px/1.5 var(--font-body); }
.tile--ink .detail { border-top-color: rgba(255, 255, 255, 0.18); }

/* Voyage d'un nom */
.journey-head { margin-bottom: 28px; }
.journey {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: var(--gap);
}

.step {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: var(--white);
  border-radius: var(--r-md);
  padding: 18px 16px;
}

.step--key { background: var(--purple); color: var(--white); }
.step-date { font: 700 12px/1.3 var(--font-body); color: var(--purple); }
.step--key .step-date { color: var(--purple-tint); }
.step-name { font: 900 clamp(24px, 2.2vw, 32px)/1 var(--font-display); letter-spacing: -0.02em; overflow-wrap: anywhere; }
.step-name.ar { font-family: var(--font-ar); font-weight: 700; }
.step-title { font: 700 14px/1.3 var(--font-body); }
.step-text { font: 400 13px/1.5 var(--font-body); color: var(--muted); }
.step--key .step-text { color: var(--purple-soft); }

.step-arrow {
  position: absolute;
  top: 50%;
  inset-inline-end: -11px;
  transform: translateY(-50%);
  z-index: 1;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--white);
  display: grid;
  place-items: center;
  font: 700 12px/1 var(--font-body);
}

[dir="rtl"] .step-arrow { transform: translateY(-50%) scaleX(-1); }

/* Ifriqiya */
.ifr-fig { min-height: 440px; }
.ifr-title { margin-bottom: 18px; }
.see-also { align-self: flex-start; }

/* Peuples */
.people > img { height: 200px; object-position: 50% 20%; }
.people .h-card { margin-top: 2px; }

/* Identité */
.id-title { margin-bottom: 28px; }
.id-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px 28px;
}

.id-item { border-top: 1px solid rgba(255, 255, 255, 0.18); padding-top: 14px; }
.id-name { font: 800 18px/1.2 var(--font-display); margin-bottom: 6px; }
.id-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font: 600 13px/1 var(--font-body);
  color: var(--gold-light);
}

.dame-fig { min-height: 520px; }

/* Métissage */
.mixed-tile .h-card { margin: 4px 0 4px; }
.mixed-p { margin-top: 12px; }

/* Génétique */
.dna-lede { margin-bottom: 24px; }
.dna-rows .key { font-size: clamp(18px, 1.7vw, 22px); }
.dna-rows .val { font-size: 15px; color: var(--on-dark); }
.dna-name { font: 800 17px/1.2 var(--font-display); color: var(--white); }
.dna-side { display: flex; flex-direction: column; gap: var(--gap); }
.anth-rows { margin-top: 14px; }
.anth-rows .key { font-size: 16px; }
.anth-rows .val { font-size: 14px; }

/* Héritage */
.legacy-tile.with-img {
  padding: 10px;
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 18px;
}

.legacy-tile.with-img > img {
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  border-radius: 20px;
  background: var(--sand-deep);
}

.legacy-tile.with-img > div { padding-block: 22px 14px; padding-inline-end: 14px; }

.bullets { list-style: none; margin-top: 14px; display: flex; flex-direction: column; gap: 6px; }
.bullets li {
  position: relative;
  padding-inline-start: 18px;
  font: 500 14px/1.45 var(--font-body);
}

.bullets li::before {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  top: 0.55em;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--terra);
}

.tile--gold .bullets li::before { background: var(--ink); }

/* Faits */
.facts-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.fact { min-height: 190px; }

@media (max-width: 1280px) {
  .journey { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .step-arrow { display: none; }
}

@media (max-width: 960px) {
  .theory { min-height: 0; }
  .ifr-fig, .dame-fig { min-height: 340px; }
  .journey { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 640px) {
  .journey { grid-template-columns: minmax(0, 1fr); }
  .id-grid { grid-template-columns: minmax(0, 1fr); }
  .legacy-tile.with-img { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .legacy-tile.with-img > img { height: 200px; min-height: 0; }
  .legacy-tile.with-img > div { padding: 18px 12px 12px; }
  .fact { min-height: 0; }
  .ifr-fig, .dame-fig { min-height: 280px; }
}
</style>
