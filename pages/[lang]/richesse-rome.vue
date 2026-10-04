<template>
  <div class="pg">
    <!-- Hero -->
    <div class="bento bento--top">
      <figure class="fig fig--hero s-7 hero-fig" style="background:#B8872E">
        <img src="/img/coin-elephant.jpg" :alt="c.hero.alt">
        <figcaption>{{ c.hero.caption }}</figcaption>
      </figure>
      <div class="tile tile--xl tile--gold tile--stack tile--hero s-5">
        <span class="chip hero-chip">{{ c.hero.chip }}</span>
        <div>
          <h1 class="h-display hero-title">{{ c.hero.title }}</h1>
          <p class="lede">{{ c.hero.lede }}</p>
        </div>
      </div>
    </div>

    <!-- Chiffres -->
    <div class="cols cols-4 keep-2 stats">
      <div v-for="(s, i) in c.stats" :key="s.n" class="tile stat" :class="{ 'tile--purple': i === 3 }">
        <div class="num stat-n">{{ s.n }}</div>
        <p class="stat-t">{{ s.t }}</p>
      </div>
    </div>

    <!-- L'engrenage -->
    <section class="sec sec--wide">
      <h2 class="h-section gear-title">{{ c.gear.title }}</h2>
      <ol class="gear">
        <li v-for="(g, i) in c.gear.items" :key="g.y + g.t" :class="{ last: i === c.gear.items.length - 1 }">
          <span class="g-year">{{ g.y }}</span>
          <h3 class="g-title">{{ g.t }}</h3>
          <p class="g-text">{{ g.d }}</p>
        </li>
      </ol>
    </section>

    <!-- Pourquoi -->
    <section class="sec sec--wide">
      <div class="sec-head">
        <h2 class="h-section">{{ c.why.title }}</h2>
        <p>{{ c.why.aside }}</p>
      </div>
    </section>
    <div class="cols cols-3">
      <div v-for="w in c.why.items" :key="w.kick" class="tile tile--stack why" :class="w.cls">
        <div>
          <span class="kicker">{{ w.kick }}</span>
          <h3 class="h-card">{{ w.title }}</h3>
          <blockquote v-if="w.quote" class="quote">
            <p :lang="w.quoteLang">{{ w.quote }}</p>
            <footer>{{ w.cite }}</footer>
          </blockquote>
          <p class="body">{{ w.text }}</p>
        </div>
        <NuxtLink v-if="w.to" :to="localePath(w.to)" class="why-more">{{ w.toLabel }} →</NuxtLink>
      </div>
    </div>

    <!-- Deux modèles -->
    <section class="sec">
      <div class="cols cols-7-5 cols--flush">
        <div class="tile tile--xl">
          <h2 class="h-block cmp-title">{{ c.cmp.title }}</h2>
          <div class="cmp-wrap">
            <table class="cmp">
              <thead>
                <tr>
                  <td />
                  <th scope="col" class="cmp-carthage">{{ c.cmp.carthage }}</th>
                  <th scope="col">{{ c.cmp.rome }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in c.cmp.rows" :key="r[0]">
                  <th scope="row">{{ r[0] }}</th>
                  <td>{{ r[1] }}</td>
                  <td class="cmp-rome">{{ r[2] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <figure class="fig ports-fig" style="background:#1D3F66">
          <img src="/img/ports.jpg" :alt="c.ports.alt" loading="lazy">
          <figcaption class="cap-box"><b>{{ c.ports.b }}</b> {{ c.ports.text }}</figcaption>
        </figure>
      </div>
    </section>

    <PageSources :items="c.sources" />

    <!-- À lire aussi -->
    <section class="sec sec--wide">
      <h2 class="h-section related-title">{{ c.relatedTitle }}</h2>
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

const C = {
  fr: {
    meta: {
      title: 'Pourquoi la richesse de Carthage exaspérait Rome',
      desc: "Vaincue deux fois, Carthage se relevait toujours : indemnités de 241 et 201, remboursement anticipé, figues de Caton, ultimatum de 149. Comment la prospérité de Carthage a fini par obséder Rome."
    },
    hero: {
      alt: "Shekel d'argent carthaginois : tête de Melqart et éléphant",
      caption: "Shekel d'argent, 213–210 av. J.-C. — Melqart et l'éléphant · British Museum",
      chip: 'Carthage · Richesse & Rome',
      title: 'Trop riche pour Rome',
      lede: "Vaincue deux fois, Carthage se relevait toujours. C'est sa prospérité, bien plus que ses armes, qui a fini par obséder Rome."
    },
    stats: [
      { n: '700 000', t: "habitants à la veille de 149 selon Strabon — un chiffre sans doute exagéré" },
      { n: '300 livres', t: "d'argent par jour (≈ 100 kg) : le rendement du puits Baebelo pour Hannibal, selon Pline l'Ancien" },
      { n: '10 000', t: "talents d'indemnité imposés en 201 av. J.-C., sur 50 ans (≈ 260 tonnes d'argent)" },
      { n: '10 ans', t: "plus tard, Carthage propose de tout rembourser d'un coup" }
    ],
    gear: {
      title: "L'engrenage, des Égades à 146",
      items: [
        { y: '241', t: 'La première facture', d: "Vaincue aux îles Égades, Carthage perd la Sicile. Le traité prévoyait 2 200 talents en vingt ans ; le peuple romain l'alourdit à 3 200 talents en dix ans (Polybe)." },
        { y: '237', t: 'Le rapt de la Sardaigne', d: "Profitant de la guerre des Mercenaires, Rome s'empare de la Sardaigne et exige 1 200 talents de plus sous menace de guerre. Polybe lui-même juge le procédé injuste." },
        { y: '201', t: 'Une paix pour ruiner Carthage', d: "Après Zama : flotte réduite à 10 navires, éléphants livrés, 100 otages, interdiction de faire la guerre sans l'accord de Rome, et 10 000 talents d'argent à verser pendant 50 ans." },
        { y: '196', t: 'Hannibal suffète', d: "Élu premier magistrat, il s'attaque à la corruption de l'oligarchie et montre que les revenus publics suffisent à payer Rome sans nouvel impôt (Tite-Live). Ses ennemis le dénoncent à Rome ; il s'exile en 195." },
        { y: '191', t: '« Nous pouvons tout payer »', d: "Selon Tite-Live, Carthage offre de solder toute l'indemnité restante en une fois. Rome refuse : la dette était aussi une laisse." },
        { y: '~150', t: 'Les figues de Caton', d: "Revenu d'une ambassade en Afrique, Caton laisse tomber au Sénat des figues encore fraîches : la terre qui les porte, dit-il, n'est qu'à trois jours de mer (Plutarque, Pline). La rivale est prospère, et tout près. Il conclut désormais chaque discours en réclamant la destruction de Carthage." },
        { y: '151–150', t: 'Le prétexte numide', d: "La dernière annuité de l'indemnité est versée. Harcelée par Massinissa, Carthage lève une armée pour se défendre sans l'accord de Rome — ce qui viole le traité de 201 et offre le casus belli." },
        { y: '149', t: "L'ultimatum", d: "Selon Appien, Carthage livre 300 enfants en otages, puis 200 000 armures et 2 000 catapultes… avant que Rome n'exige qu'elle abandonne la ville pour s'installer à 80 stades (≈ 15 km) de la mer. Refus : la cité résiste trois ans, jusqu'en 146." }
      ]
    },
    why: {
      title: 'Pourquoi tant d’acharnement ?',
      aside: 'Les sources antiques avancent elles-mêmes plusieurs raisons — toutes romaines.',
      items: [
        {
          cls: 'tile--paper tile--outline',
          kick: 'Caton l’Ancien',
          title: '« Carthage doit être détruite »',
          quote: 'Ceterum censeo Carthaginem esse delendam.',
          quoteLang: 'la',
          cite: '« Au reste, je pense qu’il faut détruire Carthage. »',
          text: "Plutarque rapporte que Caton concluait tous ses avis par cette exigence ; la formule latine célèbre est une reconstitution plus tardive. « Carthago delenda est » en est la version courte."
        },
        {
          cls: '',
          kick: 'Scipion Nasica',
          title: 'La peur utile',
          text: "Au Sénat, Nasica répliquait qu'il fallait conserver Carthage : la crainte de la rivale (le metus Punicus) maintenait la discipline romaine. Salluste datera plus tard de sa disparition le début de la décadence de Rome."
        },
        {
          cls: 'tile--ink',
          kick: 'Polybe',
          title: 'La cité la plus riche du monde',
          text: "Témoin du siège, Polybe la dit réputée la plus riche du monde. Après 146, le Sénat fait même traduire en latin le traité d'agronomie de Magon : Rome détruit la rivale mais garde son savoir.",
          to: '/magon-agronome',
          toLabel: 'Magon l’agronome'
        }
      ]
    },
    cmp: {
      title: 'Deux modèles face à face',
      carthage: 'Carthage',
      rome: 'Rome',
      rows: [
        ['Richesse', 'Issue du commerce maritime et de l’agriculture', 'Issue de la conquête et des tributs'],
        ['Armée', 'Mercenaires professionnels', 'Citoyens-soldats (légionnaires)'],
        ['Marine', 'Supériorité navale historique', 'Flotte construite pendant la première guerre punique'],
        ['Gouvernement', 'Suffètes, oligarchie marchande', 'Consuls, aristocratie'],
        ['Monnaie', 'Électrum, or, argent, bronze', 'Denier d’argent']
      ]
    },
    ports: {
      alt: 'Les ports puniques de Carthage aujourd’hui',
      b: "Les ports puniques aujourd'hui.",
      text: 'Le port circulaire abritait la flotte de guerre ; le port rectangulaire, le commerce.'
    },
    relatedTitle: 'À lire aussi',
    related: [
      { to: '/economie', kick: 'Économie', title: 'Une puissance marchande', text: 'Commerce, agriculture, monnaie : les sources de la richesse carthaginoise.', cls: 'tile--gold' },
      { to: '/prise-de-carthage', kick: '146 av. J.-C.', title: 'La prise de Carthage', text: "Ce que Rome a fait, et ce qu'elle a prétendu avoir fait.", cls: 'tile--ink' },
      { to: '/histoire-des-vainqueurs', kick: 'Historiographie', title: "L'histoire des vainqueurs", text: 'Carthage racontée par ses ennemis : lire les sources avec prudence.', cls: '' }
    ],
    sources: [
      { type: 'ancient', author: 'Polybe', work: 'Histoires', ref: 'I, 62–63 ; I, 88 ; III, 10 ; XV, 18 ; XVIII, 35', note: 'indemnités de 241 et 201, Sardaigne (237), « la cité la plus riche du monde »' },
      { type: 'ancient', author: 'Tite-Live', work: 'Histoire romaine', ref: 'XXXIII, 46–47 ; XXXVI, 4', note: 'Hannibal suffète ; offre de remboursement anticipé' },
      { type: 'ancient', author: 'Plutarque', work: 'Vie de Caton l\'Ancien', ref: '27', note: 'les figues de Caton, la réplique de Scipion Nasica' },
      { type: 'ancient', author: 'Pline l\'Ancien', work: 'Histoire naturelle', ref: 'XV, 74–76 ; XVIII, 22 ; XXXIII, 96–97', note: 'figues de Caton, traduction de Magon, puits de Baebelo' },
      { type: 'ancient', author: 'Strabon', work: 'Géographie', ref: 'XVII, 3, 15', note: '700 000 habitants en 149' },
      { type: 'ancient', author: 'Appien', work: 'Libyca', note: 'otages, désarmement et ultimatum de 149' },
      { type: 'ancient', author: 'Salluste', work: 'Guerre de Jugurtha ; Conjuration de Catilina', ref: 'Jug. 41 ; Cat. 10', note: 'la disparition de Carthage, début de la décadence' }
    ]
  },
  en: {
    meta: {
      title: "Why Carthage's wealth exasperated Rome",
      desc: "Defeated twice, Carthage always recovered: the indemnities of 241 and 201, the early repayment offer, Cato's figs, the ultimatum of 149. How Carthage's prosperity came to obsess Rome."
    },
    hero: {
      alt: 'Carthaginian silver shekel: head of Melqart and elephant',
      caption: 'Silver shekel, 213–210 BC — Melqart and the elephant · British Museum',
      chip: 'Carthage · Wealth & Rome',
      title: 'Too rich for Rome',
      lede: 'Defeated twice, Carthage always rose again. It was its prosperity, far more than its armies, that ended up obsessing Rome.'
    },
    stats: [
      { n: '700,000', t: 'inhabitants on the eve of 149 according to Strabo — probably an exaggeration' },
      { n: '300 lb', t: 'of silver a day (≈ 100 kg): the yield of the Baebelo mine for Hannibal, according to Pliny the Elder' },
      { n: '10,000', t: 'talents of indemnity imposed in 201 BC, over 50 years (≈ 260 tonnes of silver)' },
      { n: '10 years', t: 'later, Carthage offers to pay it all off at once' }
    ],
    gear: {
      title: 'The spiral, from the Aegates to 146',
      items: [
        { y: '241', t: 'The first bill', d: 'Defeated at the Aegates Islands, Carthage loses Sicily. The treaty set 2,200 talents over twenty years; the Roman people raised it to 3,200 talents over ten (Polybius).' },
        { y: '237', t: 'The seizure of Sardinia', d: 'Taking advantage of the Mercenary War, Rome seizes Sardinia and demands 1,200 more talents under threat of war. Polybius himself calls it unjust.' },
        { y: '201', t: 'A peace to ruin Carthage', d: "After Zama: the fleet cut to 10 ships, the elephants surrendered, 100 hostages, no war without Rome's consent, and 10,000 talents of silver to be paid over 50 years." },
        { y: '196', t: 'Hannibal as sufete', d: "Elected chief magistrate, he attacks the corruption of the oligarchy and shows that public revenue is enough to pay Rome without new taxes (Livy). His enemies denounce him to Rome; he goes into exile in 195." },
        { y: '191', t: '"We can pay it all"', d: 'According to Livy, Carthage offers to settle the whole remaining indemnity at once. Rome refuses: the debt was also a leash.' },
        { y: '~150', t: "Cato's figs", d: 'Back from an embassy to Africa, Cato drops still-fresh figs in the Senate: the land that grows them, he says, is only three days\' sail away (Plutarch, Pliny). The rival is prosperous — and close. From then on he ends every speech by demanding the destruction of Carthage.' },
        { y: '151–150', t: 'The Numidian pretext', d: "The last instalment of the indemnity is paid. Harassed by Masinissa, Carthage raises an army to defend itself without Rome's consent — breaching the treaty of 201 and handing Rome its casus belli." },
        { y: '149', t: 'The ultimatum', d: 'According to Appian, Carthage hands over 300 children as hostages, then 200,000 sets of armour and 2,000 catapults… before Rome demands that it abandon the city and resettle 80 stadia (≈ 15 km) from the sea. Refusal: the city holds out for three years, until 146.' }
      ]
    },
    why: {
      title: 'Why such relentlessness?',
      aside: 'The ancient sources themselves give several reasons — all of them Roman.',
      items: [
        {
          cls: 'tile--paper tile--outline',
          kick: 'Cato the Elder',
          title: '"Carthage must be destroyed"',
          quote: 'Ceterum censeo Carthaginem esse delendam.',
          quoteLang: 'la',
          cite: '"Furthermore, I consider that Carthage must be destroyed."',
          text: 'Plutarch reports that Cato ended every opinion he gave with this demand; the famous Latin wording is a later reconstruction. "Carthago delenda est" is the short version.'
        },
        {
          cls: '',
          kick: 'Scipio Nasica',
          title: 'Useful fear',
          text: 'In the Senate, Nasica replied that Carthage should be preserved: fear of the rival (metus Punicus) kept Romans disciplined. Sallust would later date the beginning of Rome\'s decline to its disappearance.'
        },
        {
          cls: 'tile--ink',
          kick: 'Polybius',
          title: 'The richest city in the world',
          text: "An eyewitness of the siege, Polybius says it was reputed the richest city in the world. After 146 the Senate even had Mago's treatise on agriculture translated into Latin: Rome destroyed its rival but kept its knowledge.",
          to: '/magon-agronome',
          toLabel: 'Mago the agronomist'
        }
      ]
    },
    cmp: {
      title: 'Two models face to face',
      carthage: 'Carthage',
      rome: 'Rome',
      rows: [
        ['Wealth', 'From sea trade and agriculture', 'From conquest and tribute'],
        ['Army', 'Professional mercenaries', 'Citizen-soldiers (legionaries)'],
        ['Navy', 'Long-standing naval supremacy', 'Fleet built during the First Punic War'],
        ['Government', 'Sufetes, merchant oligarchy', 'Consuls, aristocracy'],
        ['Currency', 'Electrum, gold, silver, bronze', 'Silver denarius']
      ]
    },
    ports: {
      alt: 'The Punic ports of Carthage today',
      b: 'The Punic ports today.',
      text: 'The circular harbour sheltered the war fleet; the rectangular harbour, trade.'
    },
    relatedTitle: 'Read also',
    related: [
      { to: '/economie', kick: 'Economy', title: 'A merchant power', text: 'Trade, agriculture, coinage: the sources of Carthaginian wealth.', cls: 'tile--gold' },
      { to: '/prise-de-carthage', kick: '146 BC', title: 'The fall of Carthage', text: 'What Rome did, and what it claimed to have done.', cls: 'tile--ink' },
      { to: '/histoire-des-vainqueurs', kick: 'Historiography', title: "The victors' history", text: 'Carthage as told by its enemies: reading the sources with care.', cls: '' }
    ],
    sources: [
      { type: 'ancient', author: 'Polybius', work: 'Histories', ref: 'I, 62–63 ; I, 88 ; III, 10 ; XV, 18 ; XVIII, 35', note: 'indemnities of 241 and 201, Sardinia (237), "the wealthiest city in the world"' },
      { type: 'ancient', author: 'Livy', work: 'History of Rome', ref: 'XXXIII, 46–47 ; XXXVI, 4', note: 'Hannibal as sufete; offer of early repayment' },
      { type: 'ancient', author: 'Plutarch', work: 'Life of Cato the Elder', ref: '27', note: 'Cato\'s figs, Scipio Nasica\'s reply' },
      { type: 'ancient', author: 'Pliny the Elder', work: 'Natural History', ref: 'XV, 74–76 ; XVIII, 22 ; XXXIII, 96–97', note: 'Cato\'s figs, translation of Mago, the Baebelo mine' },
      { type: 'ancient', author: 'Strabo', work: 'Geography', ref: 'XVII, 3, 15', note: '700,000 inhabitants in 149' },
      { type: 'ancient', author: 'Appian', work: 'Libyca', note: 'hostages, disarmament and the ultimatum of 149' },
      { type: 'ancient', author: 'Sallust', work: 'The Jugurthine War ; The Conspiracy of Catiline', ref: 'Jug. 41 ; Cat. 10', note: 'the end of Carthage as the start of Rome\'s decline' }
    ]
  },
  ar: {
    meta: {
      title: 'لماذا أثار ثراء قرطاج حنق روما',
      desc: 'هُزمت قرطاج مرتين لكنها نهضت دائمًا: تعويضات 241 و201، عرض السداد المبكر، تين كاتو، إنذار 149. كيف صار ثراء قرطاج هاجسًا لروما.'
    },
    hero: {
      alt: 'شيقل فضي قرطاجي: رأس ملقرت وفيل',
      caption: 'شيقل فضي، 213–210 ق.م — ملقرت والفيل · المتحف البريطاني',
      chip: 'قرطاج · الثروة وروما',
      title: 'أغنى مما تحتمله روما',
      lede: 'هُزمت قرطاج مرتين، لكنها كانت تنهض في كل مرة. ثراؤها، أكثر بكثير من سلاحها، هو ما صار هاجسًا لروما.'
    },
    stats: [
      { n: '700 000', t: 'نسمة عشية سنة 149 حسب سترابون — رقم مبالغ فيه على الأرجح' },
      { n: '300 رطل', t: 'من الفضة يوميًا (≈ 100 كغ): مردود منجم بيبيلو لحنبعل، حسب بلينيوس الأكبر' },
      { n: '10 000', t: 'تالنت تعويضًا فُرضت سنة 201 ق.م، على مدى 50 سنة (≈ 260 طنًا من الفضة)' },
      { n: '10 سنوات', t: 'بعدها، عرضت قرطاج سداد كل شيء دفعة واحدة' }
    ],
    gear: {
      title: 'الدوّامة، من جزر إيغاديس إلى 146',
      items: [
        { y: '241', t: 'الفاتورة الأولى', d: 'بعد الهزيمة في جزر إيغاديس خسرت قرطاج صقلية. نصّت المعاهدة على 2200 تالنت في عشرين سنة، فرفعها الشعب الروماني إلى 3200 تالنت في عشر سنوات (بوليبيوس).' },
        { y: '237', t: 'انتزاع سردينيا', d: 'استغلت روما حرب المرتزقة فاستولت على سردينيا وطالبت بـ1200 تالنت إضافية تحت التهديد بالحرب. حتى بوليبيوس رأى في ذلك ظلمًا.' },
        { y: '201', t: 'سلام لإفلاس قرطاج', d: 'بعد زاما: أسطول مقلّص إلى 10 سفن، تسليم الفيلة، 100 رهينة، منع الحرب دون موافقة روما، و10 آلاف تالنت من الفضة تُدفع على مدى 50 سنة.' },
        { y: '196', t: 'حنبعل شُفِط', d: 'انتُخب القاضي الأول، فحارب فساد الأوليغارشية وبيّن أن مداخيل الدولة تكفي لدفع الجزية لروما دون ضرائب جديدة (تيتوس ليفيوس). وشى به خصومه إلى روما، فرحل إلى المنفى سنة 195.' },
        { y: '191', t: '«نستطيع دفع كل شيء»', d: 'حسب تيتوس ليفيوس، عرضت قرطاج تسديد ما تبقى من التعويض دفعة واحدة. رفضت روما: فالدَّين كان أيضًا قيدًا.' },
        { y: '~150', t: 'تين كاتو', d: 'عاد كاتو من سفارة إلى إفريقيا فأسقط في مجلس الشيوخ تينًا ما زال طريًا: الأرض التي تنبته، قال، لا تبعد سوى ثلاثة أيام بحرًا (بلوتارخوس، بلينيوس). الغريمة مزدهرة وقريبة. ومنذئذ صار يختم كل خطبه بالمطالبة بتدمير قرطاج.' },
        { y: '151–150', t: 'الذريعة النوميدية', d: 'دُفع آخر قسط من التعويض. وتحت ضغط ماسينيسا، جنّدت قرطاج جيشًا للدفاع عن نفسها دون موافقة روما — ما عُدّ خرقًا لمعاهدة 201 ومنح روما ذريعة الحرب.' },
        { y: '149', t: 'الإنذار', d: 'حسب أبيانوس، سلّمت قرطاج 300 طفل رهائن، ثم 200 ألف درع وألفي منجنيق… قبل أن تطالبها روما بهجر المدينة والاستقرار على بعد 80 غلوة (≈ 15 كم) من البحر. رفضت، وصمدت المدينة ثلاث سنوات حتى 146.' }
      ]
    },
    why: {
      title: 'لماذا كل هذا الإصرار؟',
      aside: 'المصادر القديمة نفسها تقدّم عدة أسباب — وكلها رومانية.',
      items: [
        {
          cls: 'tile--paper tile--outline',
          kick: 'كاتو الأكبر',
          title: '«يجب تدمير قرطاج»',
          quote: 'Ceterum censeo Carthaginem esse delendam.',
          quoteLang: 'la',
          cite: '«وفوق ذلك، أرى أنه يجب تدمير قرطاج.»',
          text: 'يروي بلوتارخوس أن كاتو كان يختم كل رأي يبديه بهذا المطلب؛ أما الصيغة اللاتينية الشهيرة فهي إعادة صياغة متأخرة، و«Carthago delenda est» صيغتها المختصرة.'
        },
        {
          cls: '',
          kick: 'سكيبيو ناسيكا',
          title: 'الخوف النافع',
          text: 'في مجلس الشيوخ كان ناسيكا يردّ بوجوب الإبقاء على قرطاج: فالخوف من الغريمة (metus Punicus) يحفظ انضباط الرومان. وسيؤرّخ سالوستيوس لاحقًا بداية انحطاط روما بزوالها.'
        },
        {
          cls: 'tile--ink',
          kick: 'بوليبيوس',
          title: 'أغنى مدينة في العالم',
          text: 'شهد بوليبيوس الحصار، ويذكر أنها كانت تُعدّ أغنى مدينة في العالم. وبعد 146 أمر مجلس الشيوخ بترجمة كتاب ماغون في الفلاحة إلى اللاتينية: دمّرت روما غريمتها واحتفظت بمعارفها.',
          to: '/magon-agronome',
          toLabel: 'ماغون الفلاحي'
        }
      ]
    },
    cmp: {
      title: 'نموذجان وجهًا لوجه',
      carthage: 'قرطاج',
      rome: 'روما',
      rows: [
        ['الثروة', 'من التجارة البحرية والفلاحة', 'من الغزو والجزية'],
        ['الجيش', 'مرتزقة محترفون', 'مواطنون جنود (فيالق)'],
        ['البحرية', 'تفوّق بحري عريق', 'أسطول بُني خلال الحرب البونيقية الأولى'],
        ['الحكم', 'شُفِطان، أوليغارشية تجارية', 'قناصل، أرستقراطية'],
        ['العملة', 'إلكتروم، ذهب، فضة، برونز', 'الدينار الفضي']
      ]
    },
    ports: {
      alt: 'الموانئ البونيقية في قرطاج اليوم',
      b: 'الموانئ البونيقية اليوم.',
      text: 'كان الميناء الدائري يؤوي الأسطول الحربي، والميناء المستطيل للتجارة.'
    },
    relatedTitle: 'اقرأ أيضًا',
    related: [
      { to: '/economie', kick: 'الاقتصاد', title: 'قوة تجارية', text: 'التجارة والفلاحة والعملة: مصادر الثروة القرطاجية.', cls: 'tile--gold' },
      { to: '/prise-de-carthage', kick: '146 ق.م', title: 'سقوط قرطاج', text: 'ما فعلته روما وما ادّعت أنها فعلته.', cls: 'tile--ink' },
      { to: '/histoire-des-vainqueurs', kick: 'التأريخ', title: 'تاريخ المنتصرين', text: 'قرطاج كما رواها أعداؤها: قراءة المصادر بحذر.', cls: '' }
    ],
    sources: [
      { type: 'ancient', author: 'بوليبيوس', work: 'التواريخ', ref: 'I, 62–63 ; I, 88 ; III, 10 ; XV, 18 ; XVIII, 35', note: 'تعويضات 241 و201، سردينيا (237)، «أغنى مدينة في العالم»' },
      { type: 'ancient', author: 'تيتوس ليفيوس', work: 'تاريخ روما', ref: 'XXXIII, 46–47 ; XXXVI, 4', note: 'حنبعل شوفطًا؛ عرض السداد المسبق' },
      { type: 'ancient', author: 'بلوتارخ', work: 'سيرة كاتو الأكبر', ref: '27', note: 'تين كاتو، وردّ سكيبيو ناسيكا' },
      { type: 'ancient', author: 'بلينيوس الأكبر', work: 'التاريخ الطبيعي', ref: 'XV, 74–76 ; XVIII, 22 ; XXXIII, 96–97', note: 'تين كاتو، ترجمة ماغون، منجم بايبيلو' },
      { type: 'ancient', author: 'سترابون', work: 'الجغرافيا', ref: 'XVII, 3, 15', note: '700 ألف ساكن سنة 149' },
      { type: 'ancient', author: 'أبيانوس', work: 'الكتاب الليبي', note: 'الرهائن ونزع السلاح وإنذار 149' },
      { type: 'ancient', author: 'سالوستيوس', work: 'حرب يوغرطة؛ مؤامرة كاتلينا', ref: 'Jug. 41 ; Cat. 10', note: 'زوال قرطاج بداية انحطاط روما' }
    ]
  }
}

const c = await useLocalized('richesse-rome', C)

useHead(() => ({
  title: c.value.meta.title,
  meta: [{ name: 'description', content: c.value.meta.desc }]
}))
</script>

<style scoped>
.hero-fig { min-height: clamp(380px, 42vw, 560px); }
.hero-chip { background: rgba(22, 19, 15, 0.1); }
.hero-title { font-size: clamp(44px, 5.6vw, 80px); }

/* Chiffres */
.stat-n { font-size: clamp(34px, 3.6vw, 52px); letter-spacing: -0.03em; }
.stat-t { margin-top: 10px; font: 500 14px/1.4 var(--font-body); }

/* L'engrenage */
.gear-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.gear { list-style: none; margin: 0; padding: 0; }

.gear li {
  display: grid;
  grid-template-columns: 160px minmax(0, 4fr) minmax(0, 7fr);
  gap: 32px;
  padding: 26px 0;
  border-top: 1px solid rgba(22, 19, 15, 0.15);
}

.gear li:first-child { border-top: 1.5px solid var(--ink); }

.gear li.last {
  padding-inline: 32px;
  margin-inline: -32px;
  border-radius: var(--r-lg);
  border-top: 0;
  background: var(--ink);
  color: var(--white);
}

.g-year { font: 900 clamp(30px, 2.8vw, 40px)/1 var(--font-display); }
.g-title { font: 800 clamp(20px, 1.7vw, 24px)/1.15 var(--font-display); font-stretch: 106%; margin: 0; }
.g-text { font: 400 16px/1.55 var(--font-body); color: var(--muted); margin: 0; }
.gear li.last .g-year { color: var(--gold-light); }
.gear li.last .g-text { color: var(--on-dark-2); }

/* Pourquoi */
.why { min-height: 320px; }
.quote { margin: 4px 0 16px; padding-inline-start: 14px; border-inline-start: 3px solid var(--purple); }
.quote p { font: italic 600 18px/1.35 Georgia, serif; color: var(--ink); margin: 0 0 6px; }
.quote footer { font: 500 13px/1.4 var(--font-body); color: var(--muted); }
.why-more {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  align-self: flex-start;
  font: 600 14px/1 var(--font-body);
  color: var(--gold-light);
}

/* Comparaison */
.cmp-title { margin-bottom: 28px; }
.cmp-wrap { overflow-x: auto; }
.cmp { width: 100%; border-collapse: collapse; font: 400 15px/1.45 var(--font-body); }
.cmp thead th {
  font: 800 18px/1 var(--font-display);
  text-align: start;
  padding: 0 0 14px;
  border-bottom: 1.5px solid var(--ink);
}
.cmp thead td { border-bottom: 1.5px solid var(--ink); }
.cmp .cmp-carthage { color: var(--purple); }
.cmp tbody th {
  font: 400 15px/1.45 var(--font-body);
  color: var(--muted);
  text-align: start;
  width: 27%;
}
.cmp tbody th, .cmp tbody td {
  padding-block: 14px;
  padding-inline: 0 20px;
  border-bottom: 1px solid rgba(22, 19, 15, 0.12);
  vertical-align: top;
}
.cmp tbody tr:last-child th, .cmp tbody tr:last-child td { border-bottom: 0; }
.cmp .cmp-rome { color: var(--muted); }

.ports-fig { min-height: 420px; }
.ports-fig figcaption { font: 400 14px/1.45 var(--font-body); }

.related-title { margin-bottom: clamp(20px, 2.4vw, 32px); }
.related { min-height: 200px; }

@media (max-width: 960px) {
  .gear li { grid-template-columns: 110px minmax(0, 1fr); gap: 8px 24px; }
  .gear li .g-text { grid-column: 2; }
  .gear li.last { padding-inline: 24px; margin-inline: 0; }
  .why { min-height: 0; }
  .ports-fig { min-height: 340px; }
}

@media (max-width: 640px) {
  .hero-fig { min-height: 260px; }
  .stat { padding: 18px; }
  .stat-n { font-size: 30px; }
  .stat-t { font-size: 13px; }
  .gear li { grid-template-columns: minmax(0, 1fr); gap: 6px; padding: 20px 0; }
  .gear li .g-text { grid-column: auto; }
  .gear li.last { padding-inline: 18px; }
  .g-text { font-size: 15px; }
  .cmp { font-size: 14px; }
  .cmp tbody th, .cmp tbody td { padding-inline-end: 12px; }
  .ports-fig { min-height: 300px; }
  .related { min-height: 0; }
}
</style>
