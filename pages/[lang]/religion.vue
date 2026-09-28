<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <div class="tile tile--xl tile--stack tile--hero tile--navy s-6">
        <div class="tanit-deco" aria-hidden="true"><i /><i /><i /></div>
        <span class="chip chip--glass">{{ c.chip }}</span>
        <div class="hero-text">
          <h1 class="h-display">{{ c.title }}</h1>
          <p class="lede">{{ c.lede }}</p>
        </div>
      </div>
      <figure class="fig s-3 keep-half god-fig">
        <img src="/img/baal.jpg" :alt="c.baalAlt" />
        <figcaption class="cap-box">{{ c.baalCap }}</figcaption>
      </figure>
      <figure class="fig s-3 keep-half god-fig">
        <img src="/img/lion-goddess.jpg" :alt="c.lionAlt" />
        <figcaption class="cap-box">{{ c.lionCap }}</figcaption>
      </figure>
    </div>

    <!-- Divinités -->
    <div class="cols cols-4 gods">
      <div
        v-for="g in c.gods"
        :key="g.name"
        class="tile tile--stack god"
        :class="{ 'tile--purple': g.accent }"
      >
        <span class="phoen god-glyph" :class="{ on: g.accent }" aria-hidden="true">{{ g.glyph }}</span>
        <div>
          <h2 class="god-name">{{ g.name }}</h2>
          <p class="body">{{ g.text }}</p>
        </div>
      </div>
    </div>

    <!-- Tophet -->
    <section class="tophet">
      <div class="cols cols-5-7">
        <figure class="fig tophet-fig">
          <img src="/img/tophet.jpg" :alt="c.tophetAlt" loading="lazy" />
          <figcaption>{{ c.tophetCap }}</figcaption>
        </figure>
        <div class="tile tile--xl tile--stack">
          <div>
            <span class="kicker">{{ c.tophetKicker }}</span>
            <h2 class="h-block tophet-title">{{ c.tophetTitle }}</h2>
            <p class="body-lg">{{ c.tophetP1 }}</p>
            <p class="body-lg p2">
              {{ c.tophetP2a }}<NuxtLink :to="localePath('/histoire-des-vainqueurs')">{{ c.tophetLink }}</NuxtLink>{{ c.tophetP2b }}
            </p>
          </div>
          <div class="chips">
            <span v-for="t in c.tags" :key="t" class="chip">{{ t }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Panthéon élargi -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.pantheonTitle }}</h2>
        <p>{{ c.pantheonAside }}</p>
      </div>
    </section>
    <div class="cols cols-4">
      <div v-for="g in c.more" :key="g.name" class="tile tile--stack god2" :class="g.tone">
        <span v-if="g.glyph" class="phoen god-glyph" :class="{ on: g.tone }" aria-hidden="true">{{ g.glyph }}</span>
        <div>
          <span class="kicker">{{ g.k }}</span>
          <h3 class="h-card">{{ g.name }}</h3>
          <p class="body">{{ g.text }}</p>
        </div>
      </div>
    </div>

    <!-- Serment de 215 -->
    <section class="sec">
      <div class="tile tile--xl tile--paper tile--outline oath">
        <div>
          <span class="kicker">{{ c.oathKicker }}</span>
          <h2 class="h-block block-title">{{ c.oathTitle }}</h2>
        </div>
        <div>
          <p class="body-lg">{{ c.oathText }}</p>
          <p class="src">{{ c.oathSrc }}</p>
        </div>
      </div>
    </section>

    <!-- Sanctuaires et clergé -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl tile--ink">
          <span class="kicker">{{ c.sanctKicker }}</span>
          <h2 class="h-block block-title">{{ c.sanctTitle }}</h2>
          <div class="rows sanct-rows" style="--row-key:120px">
            <div v-for="r in c.sanct" :key="r.k">
              <span class="key">{{ r.k }}</span>
              <span class="val">{{ r.v }}</span>
            </div>
          </div>
        </div>
        <div class="tile tile--xl tile--purple tile--stack">
          <div>
            <span class="kicker">{{ c.clergyKicker }}</span>
            <h2 class="h-block block-title">{{ c.clergyTitle }}</h2>
            <p v-for="(p, i) in c.clergy" :key="i" class="body-lg para">{{ p }}</p>
          </div>
          <div class="chips">
            <span v-for="t in c.clergyTags" :key="t" class="chip chip--glass">{{ t }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Rites funéraires -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.funTitle }}</h2>
        <p>{{ c.funAside }}</p>
      </div>
    </section>
    <div class="cols cols-5-7">
      <figure class="fig fun-fig">
        <img src="/img/puig-molins.jpg" :alt="c.puigAlt" loading="lazy" />
        <figcaption>{{ c.puigCap }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--sand">
        <div class="rows fun-rows" style="--row-key:120px">
          <div v-for="r in c.fun" :key="r.k">
            <span class="key">{{ r.k }}</span>
            <span class="val">{{ r.v }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cols cols-5-7 gap-top">
      <div class="card-img">
        <img src="/img/mask.jpg" :alt="c.maskAlt" loading="lazy" style="object-position: 50% 25%; background: #000" />
        <div class="card-body">
          <span class="kicker">{{ c.maskK }}</span>
          <p>{{ c.maskD }}</p>
        </div>
      </div>
      <div class="tile tile--xl tile--navy tile--stack">
        <span class="kicker">{{ c.quoteK }}</span>
        <p class="fun-quote">{{ c.quote }}</p>
        <p class="src">{{ c.quoteSrc }}</p>
      </div>
    </div>

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <h2 class="h-section block-title">{{ c.readTitle }}</h2>
    </section>
    <div class="cols cols-3">
      <NuxtLink v-for="m in c.read" :key="m.to" :to="localePath(m.to)" class="tile tile--stack link-tile" :class="m.tone">
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

const C = {
  fr: {
    metaTitle: 'Les dieux de Carthage — Baal Hammon, Tanit, Melqart, Eshmoun',
    metaDesc: "La religion carthaginoise : Baal Hammon, Tanit, Melqart, Eshmoun, Astarté, Déméter et Korè, temples, clergé, rites funéraires et le débat sur le tophet de Salammbô.",
    chip: 'Carthage · Religion',
    title: 'Les dieux de Carthage',
    lede: 'Venus de Tyr, les dieux phéniciens prennent en Afrique un visage nouveau, mêlé aux croyances libyques.',
    baalAlt: 'Baal Hammon trônant, terre cuite',
    baalCap: 'Baal Hammon trônant, terre cuite',
    lionAlt: 'Déesse à tête de lion',
    lionCap: 'Déesse à tête de lion, liée à Tanit',
    gods: [
      { glyph: '𐤁𐤏𐤋 𐤇𐤌𐤍', name: 'Baal Hammon', text: 'Le dieu suprême, maître du ciel et de la fertilité, représenté âgé et barbu sur un trône flanqué de sphinx.' },
      { glyph: '𐤕𐤍𐤕', name: 'Tanit', accent: true, text: '« Face de Baal », protectrice de la cité. Son signe — un triangle, une barre, un disque — est partout, jusque dans les sols de Kerkouane.' },
      { glyph: '𐤌𐤋𐤒𐤓𐤕', name: 'Melqart', text: '« Roi de la ville », dieu de Tyr ; Carthage lui envoyait chaque année une offrande. Les Barcides le font figurer sur leurs monnaies.' },
      { glyph: '𐤀𐤔𐤌𐤍', name: 'Eshmoun', text: "Dieu guérisseur. Son temple dominait Byrsa : c'est là que se réfugièrent les derniers défenseurs en 146." }
    ],
    tophetAlt: 'Tophet de Salammbô',
    tophetCap: 'Le tophet de Salammbô, Carthage',
    tophetKicker: 'Un lieu débattu',
    tophetTitle: 'Le tophet',
    tophetP1: "Un sanctuaire à ciel ouvert où l'on a retrouvé des milliers d'urnes contenant des restes d'enfants, surmontées de stèles dédiées à Baal Hammon et Tanit.",
    tophetP2a: 'Les auteurs grecs et romains y voyaient des sacrifices. Les archéologues restent partagés entre rite sacrificiel et nécropole de nourrissons : le débat est présenté sur la page ',
    tophetLink: 'sources',
    tophetP2b: '.',
    pantheonTitle: 'Un panthéon plus vaste',
    pantheonAside: "Profondément ouest-sémitique malgré les noms grecs ou latins des sources (Sznycer), le panthéon carthaginois s'enrichit au contact des Libyens, des Égyptiens et des Grecs.",
    more: [
      { tone: 'tile--purple', glyph: '𐤏𐤔𐤕𐤓𐤕', k: 'Déesse phénicienne', name: 'Astarté', text: "Déesse de la fécondité et de la guerre, toujours honorée à Carthage. Ses sanctuaires étaient célèbres, comme celui de Tas Silg à Malte ou celui d'Éryx en Sicile." },
      { glyph: '𐤓𐤔𐤐', k: 'Dieu ouest-sémitique', name: 'Reshef', text: "Dieu de la guerre et des épidémies, que les Grecs rapprochaient d'Apollon. Son culte est attesté dans tout le monde phénicien et punique." },
      { glyph: '𐤎𐤊𐤍', k: 'Dieu mal connu', name: 'Sakon', text: "Connu surtout par des dédicaces et des noms de personnes qui l'invoquent ; sa fonction exacte reste obscure." },
      { glyph: '𐤁𐤏𐤋 𐤔𐤌𐤌', k: '« Seigneur des cieux »', name: 'Baal Shamim', text: "Grand dieu céleste des Phéniciens. Une dédicace de l'île San Pietro, en Sardaigne, atteste son culte en Occident punique." },
      { glyph: '𐤑𐤃', k: 'Dieu poliade de Sardaigne', name: 'Sid', text: "Vénéré en Sardaigne, où les Romains l'appelleront Sardus Pater (temple d'Antas). À Carthage, des dédicaces l'associent à Tanit : Sid-Tanit." },
      { k: 'Apports égyptiens', name: 'Isis, Horus, Bès', text: "Amulettes, scarabées et rasoirs gravés diffusent les divinités égyptiennes, importées dès le VIIe s. ou copiées sur place, surtout dans les tombes de femmes et d'enfants." },
      { tone: 'tile--terra', k: 'Introduites en 396', name: 'Déméter et Korè', text: "L'armée d'Himilcon pille leur sanctuaire près de Syracuse, puis la peste la décime. Pour apaiser les déesses, Carthage adopte leur culte et le confie à des prêtres grecs (Diodore, XIV, 63 et 77)." },
      { tone: 'tile--ink', k: 'Métamorphoses', name: 'Des dieux qui changent', text: "Melqart prend les traits d'Héraclès ; Baal Hammon se rapproche de l'Ammon libyen au bélier, puis de Jupiter. Sous Rome, il survit en Saturne africain, et Tanit en Caelestis." }
    ],
    oathKicker: 'Polybe, VII, 9 · 215 av. J.-C.',
    oathTitle: 'Les dieux du serment',
    oathText: "Quand Hannibal conclut une alliance avec Philippe V de Macédoine, le traité est juré devant les dieux de Carthage. Polybe les transcrit sous des noms grecs : Zeus, Héra et Apollon, le « démon » protecteur des Carthaginois, Héraclès et Iolaos, Arès, Triton, Poséidon, puis le Soleil, la Lune et la Terre. Les historiens y reconnaissent Baal Hammon, Tanit, Melqart ou Reshef, sans que les équivalences fassent l'unanimité.",
    oathSrc: 'Source : Polybe, Histoires, VII, 9',
    sanctKicker: 'Lieux de culte',
    sanctTitle: 'Temples et sanctuaires',
    sanct: [
      { k: 'Byrsa', v: "Selon Appien, le temple d'Eshmoun, le plus grand de Carthage, couronnait l'acropole. Le sommet, arasé à l'époque romaine, n'en a rien conservé (Beschaouch)." },
      { k: 'Gadès', v: 'Le temple de Melqart resta réputé jusqu’à l’époque romaine.' },
      { k: 'Salammbô', v: "Des sanctuaires plus modestes près de l'actuelle gare TGM de Salammbô et au pied de Sidi Bou Saïd. Au bord de la mer, les temples recevaient offrandes et ex-voto des étrangers." },
      { k: 'Thinissut', v: "Au Cap Bon, un sanctuaire rural du début de l'Empire, aux cours juxtaposées de tradition orientale, a livré des terres cuites de Baal Hammon entre deux sphinges, de Tanit à tête de lion et de Déméter." },
      { k: 'Grottes', v: "Certains lieux de culte étaient de simples espaces aménagés, parfois dans des grottes : leur emplacement n'obéissait à aucune règle fixe." }
    ],
    clergyKicker: 'Clergé et rites',
    clergyTitle: 'Prêtres et tarifs',
    clergy: [
      "La religion était une affaire d'État. Sans diriger la politique, les prêtres, organisés en hiérarchie, pesaient sur une société très pieuse ; les plus hautes charges revenaient aux grandes familles (Dridi).",
      "Les sacrifices suivaient des tarifs affichés dans les temples : pour chaque animal et chaque demande, ils fixaient la part du dieu, celle du prêtre et celle du fidèle. Une stèle commémorait ensuite l'offrande."
    ],
    clergyTags: ['Tarif de Marseille', "Retrouvé à Marseille, d'origine carthaginoise"],
    funTitle: 'Rites funéraires',
    funAside: "Les tombes sont les premiers vestiges puniques fouillés, dès la fin du XIXe siècle — et les plus riches d'enseignements sur la croyance en l'au-delà.",
    puigAlt: 'Tombes creusées dans la roche, nécropole de Puig des Molins, Ibiza',
    puigCap: 'Nécropole punique de Puig des Molins, Ibiza',
    fun: [
      { k: 'Nécropoles', v: "Disposées en arc de cercle autour de Carthage, elles ont permis de retracer les limites successives de la ville (Picard)." },
      { k: 'Tombes', v: "Creusées dans le roc plutôt que bâties : puits simple avec le cercueil au fond, puits à plusieurs niveaux ou escalier menant au caveau. Un sarcophage de bois intact, unique, provient de Kerkouane." },
      { k: 'Inhumation', v: "Le mode dominant, même si l'incinération l'emporte à certaines périodes, comme à Puig des Molins." },
      { k: 'Mobilier', v: "Poteries, bijoux, amulettes, ocre rouge — le sang, donc la vie —, œufs d'autruche peints — la renaissance —, meubles miniatures en argile." },
      { k: 'Rasoirs', v: "Des rasoirs de bronze, gravés à partir du Ve s., liés à la purification du défunt (Lancel)." },
      { k: 'Au-delà', v: "Les peintures des tombes du Djebel Mlezza, au Cap Bon, semblent figurer le voyage de l'âme du défunt." }
    ],
    maskAlt: 'Masque punique grimaçant, musée du Bardo',
    maskK: 'Musée du Bardo',
    maskD: 'Masque punique grimaçant. Déposés dans les tombes, ces masques avaient sans doute une fonction protectrice.',
    quoteK: 'François Decret',
    quote: '« Pour ce peuple de marins, la Cité céleste était le dernier port où aborder. »',
    quoteSrc: 'F. Decret, Carthage ou l’empire de la mer (1977)',
    readTitle: 'À lire aussi',
    go: 'Lire →',
    read: [
      { to: '/histoire-des-vainqueurs', tone: 'tile--purple', k: 'Sources', t: 'Le débat du tophet', d: 'Ce que disent les textes antiques et ce que montre l’archéologie.' },
      { to: '/fondation', tone: '', k: 'Origines', t: 'La fondation de Carthage', d: 'Élissa, Tyr et les dieux venus d’Orient.' },
      { to: '/lieux', tone: 'tile--navy', k: 'Sites', t: 'Les lieux puniques', d: 'Byrsa, le tophet, Kerkouane et les nécropoles.' }
    ],
    tags: ['VIIIe – IIe s. av. J.-C.', 'Stèles gravées en punique']
  },
  en: {
    metaTitle: 'The gods of Carthage — Baal Hammon, Tanit, Melqart, Eshmun',
    metaDesc: 'Carthaginian religion: Baal Hammon, Tanit, Melqart, Eshmun, Astarte, Demeter and Kore, temples, priests, funerary rites and the debate over the tophet of Salammbô.',
    chip: 'Carthage · Religion',
    title: 'The gods of Carthage',
    lede: 'Brought from Tyre, the Phoenician gods took on a new face in Africa, blended with Libyan beliefs.',
    baalAlt: 'Enthroned Baal Hammon, terracotta',
    baalCap: 'Enthroned Baal Hammon, terracotta',
    lionAlt: 'Lion-headed goddess',
    lionCap: 'Lion-headed goddess, linked to Tanit',
    gods: [
      { glyph: '𐤁𐤏𐤋 𐤇𐤌𐤍', name: 'Baal Hammon', text: 'The supreme god, lord of the sky and of fertility, shown old and bearded on a throne flanked by sphinxes.' },
      { glyph: '𐤕𐤍𐤕', name: 'Tanit', accent: true, text: '“Face of Baal”, protector of the city. Her sign — a triangle, a bar, a disc — is everywhere, even in the floors of Kerkouane.' },
      { glyph: '𐤌𐤋𐤒𐤓𐤕', name: 'Melqart', text: '“King of the city”, god of Tyre; Carthage sent him an offering every year. The Barcids put him on their coins.' },
      { glyph: '𐤀𐤔𐤌𐤍', name: 'Eshmun', text: 'The healing god. His temple crowned Byrsa: it was there that the last defenders took refuge in 146.' }
    ],
    tophetAlt: 'Tophet of Salammbô',
    tophetCap: 'The tophet of Salammbô, Carthage',
    tophetKicker: 'A contested place',
    tophetTitle: 'The tophet',
    tophetP1: 'An open-air sanctuary where thousands of urns holding the remains of children were found, topped by stelae dedicated to Baal Hammon and Tanit.',
    tophetP2a: 'Greek and Roman authors saw it as a place of sacrifice. Archaeologists remain divided between sacrificial rite and infant cemetery: the debate is presented on the ',
    tophetLink: 'sources',
    tophetP2b: ' page.',
    pantheonTitle: 'A wider pantheon',
    pantheonAside: 'Deeply West Semitic despite the Greek or Latin names in the sources (Sznycer), the Carthaginian pantheon grew through contact with Libyans, Egyptians and Greeks.',
    more: [
      { tone: 'tile--purple', glyph: '𐤏𐤔𐤕𐤓𐤕', k: 'Phoenician goddess', name: 'Astarte', text: 'Goddess of fertility and war, still honoured at Carthage. Her sanctuaries were famous, such as Tas Silg on Malta or Eryx in Sicily.' },
      { glyph: '𐤓𐤔𐤐', k: 'West Semitic god', name: 'Reshef', text: 'God of war and plague, whom the Greeks likened to Apollo. His cult is attested throughout the Phoenician and Punic world.' },
      { glyph: '𐤎𐤊𐤍', k: 'A little-known god', name: 'Sakon', text: 'Known mainly from dedications and from personal names invoking him; his exact role remains obscure.' },
      { glyph: '𐤁𐤏𐤋 𐤔𐤌𐤌', k: '"Lord of the heavens"', name: 'Baal Shamim', text: 'The great sky god of the Phoenicians. A dedication from the island of San Pietro, in Sardinia, attests his cult in the Punic West.' },
      { glyph: '𐤑𐤃', k: 'City god of Sardinia', name: 'Sid', text: 'Worshipped in Sardinia, where the Romans would call him Sardus Pater (temple of Antas). At Carthage, dedications pair him with Tanit: Sid-Tanit.' },
      { k: 'Egyptian influences', name: 'Isis, Horus, Bes', text: 'Amulets, scarabs and engraved razors spread the Egyptian gods, imported from the 7th century or copied locally, above all in the graves of women and children.' },
      { tone: 'tile--terra', k: 'Introduced in 396', name: 'Demeter and Kore', text: 'Himilco’s army plundered their sanctuary near Syracuse, then plague ravaged it. To appease the goddesses, Carthage adopted their cult and entrusted it to Greek priests (Diodorus, XIV, 63 and 77).' },
      { tone: 'tile--ink', k: 'Transformations', name: 'Gods that change', text: 'Melqart took on the features of Heracles; Baal Hammon drew close to the ram-headed Libyan Ammon, then to Jupiter. Under Rome he lived on as the African Saturn, and Tanit as Caelestis.' }
    ],
    oathKicker: 'Polybius, VII, 9 · 215 BC',
    oathTitle: 'The gods of the oath',
    oathText: 'When Hannibal concluded an alliance with Philip V of Macedon, the treaty was sworn before the gods of Carthage. Polybius renders them with Greek names: Zeus, Hera and Apollo, the guardian "daemon" of the Carthaginians, Heracles and Iolaus, Ares, Triton, Poseidon, then Sun, Moon and Earth. Historians recognise Baal Hammon, Tanit, Melqart or Reshef among them, though the equivalences are not agreed by all.',
    oathSrc: 'Source: Polybius, Histories, VII, 9',
    sanctKicker: 'Places of worship',
    sanctTitle: 'Temples and sanctuaries',
    sanct: [
      { k: 'Byrsa', v: 'According to Appian, the temple of Eshmun, the largest in Carthage, crowned the acropolis. The summit, levelled in Roman times, has kept nothing of it (Beschaouch).' },
      { k: 'Gades', v: 'The temple of Melqart remained famous into the Roman period.' },
      { k: 'Salammbô', v: 'More modest sanctuaries near today’s Salammbô TGM station and below Sidi Bou Saïd. By the sea, temples received offerings and votive gifts from foreigners.' },
      { k: 'Thinissut', v: 'On Cap Bon, a rural sanctuary of the early Empire, with adjoining courtyards in the eastern tradition, yielded terracottas of Baal Hammon between two sphinxes, of lion-headed Tanit and of Demeter.' },
      { k: 'Caves', v: 'Some places of worship were simply laid-out spaces, sometimes in caves: their location followed no fixed rule.' }
    ],
    clergyKicker: 'Clergy and rites',
    clergyTitle: 'Priests and tariffs',
    clergy: [
      'Religion was a matter of state. Without running politics, the priests, organised in a hierarchy, carried weight in a very devout society; the highest offices went to the great families (Dridi).',
      'Sacrifices followed tariffs posted in the temples: for each animal and each request they set the share of the god, of the priest and of the worshipper. A stele then commemorated the offering.'
    ],
    clergyTags: ['Marseille Tariff', 'Found in Marseille, Carthaginian in origin'],
    funTitle: 'Funerary rites',
    funAside: 'Tombs were the first Punic remains to be excavated, from the late 19th century — and the richest source on belief in the afterlife.',
    puigAlt: 'Rock-cut tombs, Puig des Molins necropolis, Ibiza',
    puigCap: 'The Punic necropolis of Puig des Molins, Ibiza',
    fun: [
      { k: 'Necropolises', v: 'Laid out in an arc around Carthage, they have made it possible to trace the city’s successive limits (Picard).' },
      { k: 'Tombs', v: 'Cut into the rock rather than built: a simple shaft with the coffin at the bottom, multi-level shafts or a staircase down to the chamber. A unique, intact wooden sarcophagus comes from Kerkouane.' },
      { k: 'Burial', v: 'The dominant practice, though cremation prevailed at certain times, as at Puig des Molins.' },
      { k: 'Grave goods', v: 'Pottery, jewellery, amulets, red ochre — blood, and so life — painted ostrich eggs — rebirth — and miniature clay furniture.' },
      { k: 'Razors', v: 'Bronze razors, engraved from the 5th century, linked to the purification of the dead (Lancel).' },
      { k: 'The beyond', v: 'The paintings in the tombs of Djebel Mlezza, on Cap Bon, seem to show the journey of the soul of the dead.' }
    ],
    maskAlt: 'Grimacing Punic mask, Bardo Museum',
    maskK: 'Bardo Museum',
    maskD: 'Grimacing Punic mask. Placed in tombs, such masks probably served a protective purpose.',
    quoteK: 'François Decret',
    quote: '“For this seafaring people, the heavenly City was the last harbour to put in at.”',
    quoteSrc: 'F. Decret, Carthage ou l’empire de la mer (1977)',
    readTitle: 'Read also',
    go: 'Read →',
    read: [
      { to: '/histoire-des-vainqueurs', tone: 'tile--purple', k: 'Sources', t: 'The tophet debate', d: 'What the ancient texts say and what archaeology shows.' },
      { to: '/fondation', tone: '', k: 'Origins', t: 'The founding of Carthage', d: 'Elissa, Tyre and the gods from the East.' },
      { to: '/lieux', tone: 'tile--navy', k: 'Sites', t: 'Punic places', d: 'Byrsa, the tophet, Kerkouane and the necropolises.' }
    ],
    tags: ['8th – 2nd c. BC', 'Stelae inscribed in Punic']
  },
  ar: {
    metaTitle: 'آلهة قرطاج — بعل حمون، تانيت، ملقرت، أشمون',
    metaDesc: 'ديانة قرطاج: بعل حمون وتانيت وملقرت وأشمون وعشتارت وديميتر وكوري، والمعابد والكهنة والطقوس الجنائزية، والجدل حول توفيت صلامبو.',
    chip: 'قرطاج · الديانة',
    title: 'آلهة قرطاج',
    lede: 'قدمت الآلهة الفينيقية من صور، فاتخذت في إفريقيا وجهًا جديدًا امتزج بالمعتقدات الليبية.',
    baalAlt: 'بعل حمون على عرشه، طين مشوي',
    baalCap: 'بعل حمون على عرشه، طين مشوي',
    lionAlt: 'إلهة برأس أسد',
    lionCap: 'إلهة برأس أسد، مرتبطة بتانيت',
    gods: [
      { glyph: '𐤁𐤏𐤋 𐤇𐤌𐤍', name: 'بعل حمون', text: 'الإله الأعلى، سيد السماء والخصب، يُصوَّر شيخًا ملتحيًا على عرش تحفّ به أبو الهول.' },
      { glyph: '𐤕𐤍𐤕', name: 'تانيت', accent: true, text: '«وجه بعل»، حامية المدينة. علامتها — مثلث وقضيب وقرص — حاضرة في كل مكان، حتى في أرضيات كركوان.' },
      { glyph: '𐤌𐤋𐤒𐤓𐤕', name: 'ملقرت', text: '«ملك المدينة»، إله صور؛ كانت قرطاج ترسل إليه قربانًا كل عام. وقد نقشه البرقيون على نقودهم.' },
      { glyph: '𐤀𐤔𐤌𐤍', name: 'أشمون', text: 'إله الشفاء. كان معبده يعلو بيرصا، وإليه لجأ آخر المدافعين سنة 146.' }
    ],
    tophetAlt: 'توفيت صلامبو',
    tophetCap: 'توفيت صلامبو، قرطاج',
    tophetKicker: 'موقع مثير للجدل',
    tophetTitle: 'التوفيت',
    tophetP1: 'معبد مكشوف عُثر فيه على آلاف الجرار التي تحوي رفات أطفال، تعلوها نُصُب مهداة إلى بعل حمون وتانيت.',
    tophetP2a: 'رأى فيه الكتّاب الإغريق والرومان موضعًا للقرابين. ولا يزال علماء الآثار منقسمين بين طقس قرباني ومقبرة للرضّع: يُعرض هذا الجدل في صفحة ',
    tophetLink: 'المصادر',
    tophetP2b: '.',
    pantheonTitle: 'مجمع آلهة أوسع',
    pantheonAside: 'ظل مجمع الآلهة القرطاجي ساميًّا غربيًّا في عمقه رغم الأسماء الإغريقية أو اللاتينية في المصادر (شنيسر)، واغتنى بالاحتكاك بالليبيين والمصريين والإغريق.',
    more: [
      { tone: 'tile--purple', glyph: '𐤏𐤔𐤕𐤓𐤕', k: 'إلهة فينيقية', name: 'عشتارت', text: 'إلهة الخصب والحرب، ظلت تُعبد في قرطاج. وكانت معابدها شهيرة، مثل معبد تاس سيلغ في مالطا ومعبد إريكس في صقلية.' },
      { glyph: '𐤓𐤔𐤐', k: 'إله سامي غربي', name: 'رشف', text: 'إله الحرب والأوبئة، قرّبه الإغريق من أبولون. وعبادته مشهودة في كامل العالم الفينيقي والبونيقي.' },
      { glyph: '𐤎𐤊𐤍', k: 'إله قليل المعرفة', name: 'سكون', text: 'يُعرف أساسًا من الإهداءات ومن أسماء أشخاص تستدعيه؛ ويبقى دوره الدقيق غامضًا.' },
      { glyph: '𐤁𐤏𐤋 𐤔𐤌𐤌', k: '«سيد السماوات»', name: 'بعل شميم', text: 'إله السماء الأكبر عند الفينيقيين. ويشهد إهداء من جزيرة سان بييترو في سردينيا على عبادته في الغرب البونيقي.' },
      { glyph: '𐤑𐤃', k: 'إله مدينة في سردينيا', name: 'صيد', text: 'عُبد في سردينيا، حيث سيسمّيه الرومان «سردوس باتر» (معبد أنتاس). وفي قرطاج تقرنه الإهداءات بتانيت: صيد-تانيت.' },
      { k: 'تأثيرات مصرية', name: 'إيزيس وحورس وبس', text: 'نشرت التمائم والجعلان والأمواس المنقوشة الآلهة المصرية، مستوردة منذ القرن السابع أو منسوخة محليًا، ولا سيما في قبور النساء والأطفال.' },
      { tone: 'tile--terra', k: 'أُدخلتا سنة 396', name: 'ديميتر وكوري', text: 'نهب جيش هيملكون معبدهما قرب سرقوسة، ثم فتك به الطاعون. ولاسترضاء الإلهتين، تبنّت قرطاج عبادتهما وعهدت بها إلى كهنة إغريق (ديودور، 14، 63 و77).' },
      { tone: 'tile--ink', k: 'تحوّلات', name: 'آلهة تتبدّل', text: 'اتخذ ملقرت ملامح هرقل؛ واقترب بعل حمون من آمون الليبي ذي الكبش ثم من جوبيتر. وفي العهد الروماني بقي باسم «ساتورن الإفريقي»، وتانيت باسم «كايليستيس».' }
    ],
    oathKicker: 'بوليبيوس، 7، 9 · 215 ق.م',
    oathTitle: 'آلهة القَسَم',
    oathText: 'حين عقد حنبعل حلفًا مع فيليب الخامس المقدوني، أُقسم على المعاهدة أمام آلهة قرطاج. ويذكرها بوليبيوس بأسماء إغريقية: زيوس وهيرا وأبولون، و«الروح» الحامية للقرطاجيين، وهرقل وإيولاوس، وآريس وتريتون وبوسيدون، ثم الشمس والقمر والأرض. ويتعرّف فيها المؤرخون على بعل حمون وتانيت وملقرت أو رشف، دون إجماع على هذه المطابقات.',
    oathSrc: 'المصدر: بوليبيوس، التواريخ، 7، 9',
    sanctKicker: 'أماكن العبادة',
    sanctTitle: 'المعابد والمقامات',
    sanct: [
      { k: 'بيرصا', v: 'حسب أبيان، كان معبد أشمون، أكبر معابد قرطاج، يتوّج الأكروبول. ولم تحفظ القمة، التي سُوّيت في العهد الروماني، شيئًا منه (بشاوش).' },
      { k: 'قادس', v: 'ظل معبد ملقرت ذائع الصيت حتى العصر الروماني.' },
      { k: 'صلامبو', v: 'معابد أكثر تواضعًا قرب محطة قطار صلامبو الحالية وعند سفح سيدي بو سعيد. وعلى شاطئ البحر، كانت المعابد تتلقى قرابين الغرباء ونذورهم.' },
      { k: 'تينيسوت', v: 'في الوطن القبلي، معبد ريفي من بداية العهد الإمبراطوري، بساحات متجاورة على الطراز الشرقي، كشف عن تماثيل من الطين المشوي لبعل حمون بين أبي هول، ولتانيت برأس أسد، ولديميتر.' },
      { k: 'المغارات', v: 'كانت بعض أماكن العبادة مجرد فضاءات مهيّأة، أحيانًا في مغارات: ولم يخضع موقعها لقاعدة ثابتة.' }
    ],
    clergyKicker: 'الكهنة والطقوس',
    clergyTitle: 'الكهنة والتعريفات',
    clergy: [
      'كان الدين شأنًا من شؤون الدولة. ودون أن يديروا السياسة، كان للكهنة، المنظَّمين في تراتبية، وزن كبير في مجتمع شديد التدين؛ وكانت أعلى المناصب من نصيب العائلات الكبرى (دريدي).',
      'كانت القرابين تخضع لتعريفات معلّقة في المعابد: تحدد لكل حيوان ولكل طلب نصيب الإله ونصيب الكاهن ونصيب المتعبّد. ثم تُقام نُصُب تخليدًا للقربان.'
    ],
    clergyTags: ['تعريفة مرسيليا', 'عُثر عليها في مرسيليا وأصلها قرطاجي'],
    funTitle: 'الطقوس الجنائزية',
    funAside: 'كانت القبور أول الآثار البونيقية التي نُقّب عنها منذ أواخر القرن التاسع عشر — وأغناها بالمعلومات عن الإيمان بالحياة الأخرى.',
    puigAlt: 'قبور منحوتة في الصخر، مقبرة بويغ دي مولينس، إيبيزا',
    puigCap: 'المقبرة البونيقية في بويغ دي مولينس، إيبيزا',
    fun: [
      { k: 'المقابر', v: 'كانت موزعة على شكل قوس حول قرطاج، فسمحت بتتبّع حدود المدينة المتعاقبة (بيكار).' },
      { k: 'القبور', v: 'منحوتة في الصخر لا مبنية: بئر بسيطة في قعرها التابوت، أو آبار متعددة الطوابق، أو درج يؤدي إلى الغرفة. ومن كركوان تابوت خشبي سليم فريد من نوعه.' },
      { k: 'الدفن', v: 'هو النمط الغالب، وإن ساد الحرق في بعض الفترات، كما في بويغ دي مولينس.' },
      { k: 'الأثاث الجنائزي', v: 'فخار وحلي وتمائم ومغرة حمراء — رمز الدم ومن ثم الحياة — وبيض نعام ملوّن — رمز الانبعاث — وأثاث مصغّر من الطين.' },
      { k: 'الأمواس', v: 'أمواس برونزية، منقوشة منذ القرن الخامس، مرتبطة بتطهير الميت (لانسيل).' },
      { k: 'العالم الآخر', v: 'يبدو أن رسوم قبور جبل مليزة في الوطن القبلي تصوّر رحلة روح الميت.' }
    ],
    maskAlt: 'قناع بونيقي مكشّر، متحف باردو',
    maskK: 'متحف باردو',
    maskD: 'قناع بونيقي مكشّر. كانت هذه الأقنعة توضع في القبور، وكان لها على الأرجح دور وقائي.',
    quoteK: 'فرانسوا ديكري',
    quote: '«بالنسبة إلى هذا الشعب من البحارة، كانت المدينة السماوية آخر ميناء يُرسى فيه.»',
    quoteSrc: 'ف. ديكري، قرطاج أو إمبراطورية البحر (1977)',
    readTitle: 'اقرأ أيضًا',
    go: 'اقرأ ←',
    read: [
      { to: '/histoire-des-vainqueurs', tone: 'tile--purple', k: 'المصادر', t: 'الجدل حول التوفيت', d: 'ما تقوله النصوص القديمة وما يكشفه علم الآثار.' },
      { to: '/fondation', tone: '', k: 'الأصول', t: 'تأسيس قرطاج', d: 'عليسة وصور والآلهة القادمة من المشرق.' },
      { to: '/lieux', tone: 'tile--navy', k: 'المواقع', t: 'الأماكن البونيقية', d: 'بيرصا والتوفيت وكركوان والمقابر.' }
    ],
    tags: ['القرن الثامن – الثاني ق.م', 'نُصُب منقوشة بالبونيقية']
  }
}

const c = computed(() => C[locale.value] || C.fr)

useHead(() => ({
  title: c.value.metaTitle,
  meta: [{ name: 'description', content: c.value.metaDesc }]
}))
</script>

<style scoped>
.tanit-deco {
  position: absolute;
  inset-inline-end: 40px;
  top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.14;
  pointer-events: none;
}
.tanit-deco i { display: block; background: var(--white); }
.tanit-deco i:nth-child(1) { width: 90px; height: 90px; border-radius: 50%; }
.tanit-deco i:nth-child(2) { width: 180px; height: 20px; border-radius: 10px; }
.tanit-deco i:nth-child(3) { width: 150px; height: 130px; clip-path: polygon(50% 0, 100% 100%, 0 100%); }
.hero-text, .tile--hero .chip { position: relative; }

.god-fig { background: #8E3720; }
.god-fig figcaption { left: 12px; right: 12px; bottom: 12px; }

.gods { padding-top: clamp(40px, 5vw, 68px); }
.god { min-height: clamp(240px, 22vw, 300px); }
.god-glyph { font-size: clamp(30px, 2.6vw, 36px); color: var(--purple); }
.god-glyph.on { color: var(--purple-tint); }
.god-name { font: 800 28px/1 var(--font-display); margin-bottom: 10px; }

.tophet { padding-top: var(--gap); }
.tophet-fig { min-height: clamp(300px, 34vw, 440px); }
.tophet-title { margin-bottom: 20px; }
.p2 { margin-top: 16px; }
.p2 a { text-decoration: underline; text-underline-offset: 3px; }

.gap-top { margin-top: var(--gap); }
.block-title { margin-bottom: 20px; }
.para + .para { margin-top: 12px; }
.src { font: 600 12px/1.4 var(--font-body); opacity: 0.75; margin-top: 14px; }

.god2 { min-height: clamp(220px, 20vw, 280px); }

.oath {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: clamp(20px, 3vw, 44px);
}

.sanct-rows .key { color: var(--gold-light); font-size: 17px; }
.sanct-rows .val { color: var(--on-dark-2); font-size: 15px; }

.fun-fig { min-height: clamp(300px, 34vw, 460px); }
.fun-rows .key { font-size: 16px; }
.fun-rows .val { font-size: 15px; color: var(--stone); }
.fun-quote { font: 800 clamp(24px, 2.6vw, 36px)/1.15 var(--font-display); margin-top: 14px; }

.link-tile { min-height: 200px; }
.go { display: inline-block; margin-top: 12px; font: 600 14px/1 var(--font-body); color: var(--purple); }
.link-tile.tile--purple .go, .link-tile.tile--navy .go { color: var(--white); }

@media (max-width: 960px) {
  .oath { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .god-fig { min-height: clamp(300px, 55vw, 460px); }
  .tanit-deco { transform: scale(0.7); transform-origin: top right; }
}

@media (max-width: 640px) {
  .bento .god-fig { grid-column: span 6; min-height: 260px; }
  .god-fig figcaption { font-size: 11px; padding: 8px 10px; left: 8px; right: 8px; bottom: 8px; }
  .gods { padding-top: 40px; }
  .god, .god2, .link-tile { min-height: 0; }
  .tanit-deco { transform: scale(0.5); }
}
</style>
