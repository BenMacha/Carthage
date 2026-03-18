<template>
  <div>
    <!-- Page Header -->
    <section class="page-hero bio-hero">
      <div class="container">
        <div class="hero-icon">👤</div>
        <h1 class="page-hero-title">{{ t.bio.title }}</h1>
        <p class="page-hero-subtitle">{{ t.bio.subtitle }}</p>
      </div>
    </section>

    <!-- Biographies -->
    <section class="section">
      <div class="container">
        <div v-for="(person, index) in people" :key="person.name" class="bio-block" :class="{ reverse: index % 2 !== 0 }">
          <div class="bio-image">
            <img :src="person.image" :alt="person.name" loading="lazy" />
            <div class="bio-image-caption">{{ person.imageCaption }}</div>
          </div>
          <div class="bio-info">
            <div class="bio-era">{{ person.era }}</div>
            <h2>{{ person.name }}</h2>
            <div class="bio-role">{{ person.role }}</div>
            <div class="bio-text" v-for="para in person.paragraphs" :key="para">
              <p>{{ para }}</p>
            </div>
            <div v-if="person.achievements" class="bio-achievements">
              <h4>{{ achievementsLabel }}</h4>
              <ul>
                <li v-for="a in person.achievements" :key="a">{{ a }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Other Figures -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">{{ otherFiguresTitle }}</h2>
        <div class="others-grid">
          <div v-for="fig in otherFigures" :key="fig.name" class="other-card">
            <img :src="fig.image" :alt="fig.name" loading="lazy" />
            <div class="other-body">
              <div class="other-era">{{ fig.era }}</div>
              <h3>{{ fig.name }}</h3>
              <p>{{ fig.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t, locale } = useI18n()

const achievementsLabel = computed(() => {
  const labels = { fr: 'Réalisations majeures', en: 'Major achievements', ar: 'الإنجازات الكبرى' }
  return labels[locale.value] || labels.fr
})

const otherFiguresTitle = computed(() => {
  const labels = { fr: 'Autres figures importantes', en: 'Other important figures', ar: 'شخصيات مهمة أخرى' }
  return labels[locale.value] || labels.fr
})

const people = computed(() => {
  const data = {
    fr: [
      {
        name: 'Didon (Élyssa)',
        era: '~814 av. J.-C.',
        role: 'Fondatrice et première reine de Carthage',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Didon_et_son_peuple_accueillant_%C3%89n%C3%A9e_-_Pierre-Narcisse_Gu%C3%A9rin.jpg/800px-Didon_et_son_peuple_accueillant_%C3%89n%C3%A9e_-_Pierre-Narcisse_Gu%C3%A9rin.jpg',
        imageCaption: 'Didon accueillant Énée — Pierre-Narcisse Guérin',
        paragraphs: [
          'Didon, aussi connue sous le nom d\'Élyssa, est la fondatrice légendaire de Carthage. Princesse de Tyr en Phénicie (actuel Liban), elle était l\'épouse de Sychée (ou Acherbas), un prêtre d\'Hercule extrêmement riche.',
          'Son frère Pygmalion, roi de Tyr, assassina Sychée pour s\'emparer de ses richesses. Prévenue en rêve par le fantôme de son époux, Didon s\'enfuit avec les trésors et un groupe de fidèles. Après une escale à Chypre, elle débarqua sur les côtes de l\'actuelle Tunisie.',
          'Face au roi berbère Iarbas, elle usa d\'un stratagème célèbre : elle demanda autant de terre qu\'une peau de bœuf pouvait couvrir, puis découpa celle-ci en lanières extrêmement fines pour entourer toute la colline de Byrsa (du grec « byrsa », peau). C\'est sur cette colline que naquit Carthage — « Qart Hadasht », la Ville Nouvelle.',
        ],
        achievements: [
          'Fondation de Carthage, future superpuissance méditerranéenne',
          'Le stratagème de la peau de bœuf, symbole d\'intelligence et de ruse',
          'Création d\'un havre pour les réfugiés phéniciens',
          'Figure d\'indépendance et de détermination féminine dans l\'Antiquité',
        ]
      },
      {
        name: 'Hamilcar Barca',
        era: '275–228 av. J.-C.',
        role: 'Général carthaginois, père d\'Hannibal',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hamilcar_Barca.jpg/440px-Hamilcar_Barca.jpg',
        imageCaption: 'Hamilcar Barca — Gravure historique',
        paragraphs: [
          'Hamilcar Barca (en phénicien : « grâce de Baal, la foudre ») est l\'un des plus grands généraux de Carthage et le fondateur de la dynastie des Barcides. Pendant la première guerre punique (264–241 av. J.-C.), il mena une guérilla brillante en Sicile contre les Romains.',
          'Après la défaite de Carthage et la perte de la Sicile, il dut faire face à la terrible Guerre des Mercenaires (241–238 av. J.-C.), une révolte des soldats impayés. Avec une habileté tactique remarquable, il écrasa la rébellion en trois ans.',
          'En 237 av. J.-C., il entreprit la conquête de l\'Espagne, transformant la péninsule ibérique en base de puissance carthaginoise. C\'est là qu\'il fit prêter à son fils Hannibal, alors âgé de 9 ans, le célèbre serment de haine éternelle envers Rome. Hamilcar périt au combat en 228 av. J.-C., noyé en traversant une rivière lors d\'une bataille contre les Ibères.',
        ],
        achievements: [
          'Résistance brillante en Sicile pendant la première guerre punique',
          'Victoire sur la révolte des mercenaires',
          'Conquête de la péninsule ibérique (sud de l\'Espagne)',
          'Fondation de la dynastie Barcide',
          'Formation militaire de son fils Hannibal',
        ]
      },
      {
        name: 'Hannibal Barca',
        era: '247–183 av. J.-C.',
        role: 'Le plus grand stratège de l\'Antiquité',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Mommsen_p265.jpg/440px-Mommsen_p265.jpg',
        imageCaption: 'Buste présumé d\'Hannibal — Musée de Naples',
        paragraphs: [
          'Hannibal Barca est considéré comme l\'un des plus grands génies militaires de l\'histoire de l\'humanité. Fils d\'Hamilcar Barca, il grandit dans les camps militaires d\'Espagne et reçut une éducation à la fois guerrière et intellectuelle, parlant plusieurs langues dont le punique, le grec et le latin.',
          'En 221 av. J.-C., à seulement 26 ans, il prit le commandement des forces carthaginoises en Espagne. En 218 av. J.-C., il accomplit l\'un des exploits les plus audacieux de l\'histoire militaire : la traversée des Alpes avec 50 000 fantassins, 9 000 cavaliers et 37 éléphants de guerre pour attaquer Rome sur son propre territoire.',
          'En Italie, il enchaîna les victoires : au Tessin, à la Trébie, au Lac Trasimène, et surtout à Cannes (216 av. J.-C.), où sa manœuvre de double enveloppement anéantit une armée romaine de 86 000 hommes. Cette bataille est encore étudiée dans toutes les académies militaires du monde.',
          'Malgré ses victoires, privé de renforts par le Sénat de Carthage, Hannibal ne put prendre Rome. Rappelé en Afrique en 202 av. J.-C., il fut vaincu à Zama par Scipion l\'Africain. Il s\'exila ensuite au Proche-Orient, servant comme conseiller militaire auprès de plusieurs rois. Traqué par Rome, il se donna la mort en 183 av. J.-C. plutôt que de se rendre.',
        ],
        achievements: [
          'Traversée des Alpes avec des éléphants de guerre (218 av. J.-C.)',
          'Victoire de Cannes : le double enveloppement parfait',
          '15 ans de campagne victorieuse en territoire ennemi',
          'Stratège étudié encore aujourd\'hui dans les académies militaires',
          'Considéré comme le plus grand adversaire de Rome',
        ]
      },
      {
        name: 'Hasdrubal Barca',
        era: '245–207 av. J.-C.',
        role: 'Général carthaginois, frère d\'Hannibal',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Hasdrubal_Barca_%28Hannibal%27s_brother%29.jpg/440px-Hasdrubal_Barca_%28Hannibal%27s_brother%29.jpg',
        imageCaption: 'Hasdrubal Barca — Illustration historique',
        paragraphs: [
          'Hasdrubal Barca, frère cadet d\'Hannibal, reçut la mission cruciale de maintenir le contrôle carthaginois en Espagne pendant que son frère menait ses campagnes en Italie. Pendant six ans, il combattit avec succès les armées romaines de Scipion.',
          'En 208 av. J.-C., il prit la décision audacieuse de suivre le chemin de son frère en traversant les Pyrénées et les Alpes pour le rejoindre en Italie avec des renforts considérables. Cette seconde traversée des Alpes fut tout aussi remarquable que la première.',
          'Malheureusement, ses messagers furent interceptés par les Romains. Le consul Néron, par une marche forcée secrète, réunit deux armées romaines et surprit Hasdrubal à la bataille du Métaure (207 av. J.-C.). Hasdrubal combattit avec bravoure mais fut tué. Dans un acte de cruauté, les Romains catapultèrent sa tête dans le camp d\'Hannibal — c\'est ainsi que le grand général apprit la mort de son frère.',
        ],
        achievements: [
          'Défense efficace de l\'Espagne carthaginoise pendant 6 ans',
          'Seconde traversée des Alpes (208–207 av. J.-C.)',
          'Maintien de la pression militaire sur Rome sur deux fronts',
          'Bravoure exemplaire à la bataille du Métaure',
        ]
      },
      {
        name: 'Magon Barca',
        era: '243–203 av. J.-C.',
        role: 'Général carthaginois, frère d\'Hannibal',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Carthage_National_Museum_general_view.jpg/800px-Carthage_National_Museum_general_view.jpg',
        imageCaption: 'Musée national de Carthage — Vestiges de la civilisation punique',
        paragraphs: [
          'Magon Barca, le plus jeune des trois frères Barcides, joua un rôle déterminant dans les campagnes d\'Hannibal en Italie. Il participa à la bataille de Cannes où il commanda l\'embuscade décisive qui permit le double enveloppement.',
          'Après Cannes, Magon fut envoyé à Carthage pour annoncer la victoire. Selon la tradition, il versa sur le sol du Sénat carthaginois les anneaux d\'or des chevaliers romains tués, un spectacle impressionnant qui témoignait de l\'ampleur de la victoire.',
          'En 205 av. J.-C., il débarqua en Ligurie (nord de l\'Italie) avec une armée pour ouvrir un second front. Blessé dans une bataille en 203 av. J.-C., il mourut en mer sur le chemin du retour vers Carthage.',
        ],
        achievements: [
          'Rôle clé dans la victoire de Cannes',
          'Ouverture d\'un second front en Italie du Nord',
          'Ambassadeur de la victoire à Carthage après Cannes',
        ]
      },
      {
        name: 'Hannon le Navigateur',
        era: '~500 av. J.-C.',
        role: 'Explorateur et amiral carthaginois',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Hanno_bas_relief_MnM.jpg/440px-Hanno_bas_relief_MnM.jpg',
        imageCaption: 'Bas-relief représentant Hannon — Musée de la Marine',
        paragraphs: [
          'Hannon le Navigateur est l\'un des plus grands explorateurs de l\'Antiquité. Vers 500 av. J.-C., le Sénat de Carthage lui confia une expédition monumentale : explorer et coloniser les côtes atlantiques de l\'Afrique.',
          'Avec une flotte de 60 navires et environ 30 000 hommes et femmes (colons), Hannon longea toute la côte atlantique du Maroc, franchit le détroit de Gibraltar, et poursuivit vers le sud. Il fonda plusieurs colonies le long du chemin.',
          'Son récit, le « Périple d\'Hannon », est l\'un des plus anciens documents d\'exploration africaine. Il y décrit des « gorilles » (probablement des chimpanzés ou gorilles), un volcan en éruption qu\'il appelle le « Char des Dieux » (probablement le Mont Cameroun), et des peuples inconnus. Il aurait atteint le golfe de Guinée, voire le Cameroun — un exploit extraordinaire pour l\'époque.',
        ],
        achievements: [
          'Exploration de la côte atlantique africaine sur des milliers de kilomètres',
          'Fondation de colonies le long du littoral marocain et au-delà',
          'Rédaction du Périple, premier récit d\'exploration de l\'Afrique occidentale',
          'Observation des premiers « gorilles » connus des Occidentaux',
        ]
      },
      {
        name: 'Massinissa',
        era: '238–148 av. J.-C.',
        role: 'Roi des Numides, allié puis rival de Carthage',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Massinissa.jpg/440px-Massinissa.jpg',
        imageCaption: 'Pièce de monnaie représentant Massinissa',
        paragraphs: [
          'Massinissa, roi de Numidie (actuelle Algérie), est une figure majeure de l\'histoire nord-africaine. D\'abord allié de Carthage pendant la deuxième guerre punique, il changea de camp après une querelle politique et rejoignit Scipion l\'Africain.',
          'Sa cavalerie numide, réputée comme la meilleure du monde antique, joua un rôle décisif dans la victoire romaine à Zama (202 av. J.-C.). En récompense, Rome l\'aida à unifier la Numidie sous son règne.',
          'Massinissa transforma la Numidie en un royaume prospère et moderne. Il développa l\'agriculture, urbanisa son territoire et régna pendant près de 60 ans. Ses empiètements constants sur le territoire carthaginois furent l\'un des prétextes utilisés par Rome pour déclencher la troisième guerre punique.',
        ],
        achievements: [
          'Unification de la Numidie en un royaume puissant',
          'Cavalerie numide décisive à Zama',
          'Modernisation de l\'agriculture nord-africaine',
          'Règne de près de 60 ans (le plus long de l\'Antiquité)',
        ]
      },
    ],
    en: [
      {
        name: 'Dido (Elissa)',
        era: '~814 BC',
        role: 'Founder and first queen of Carthage',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Didon_et_son_peuple_accueillant_%C3%89n%C3%A9e_-_Pierre-Narcisse_Gu%C3%A9rin.jpg/800px-Didon_et_son_peuple_accueillant_%C3%89n%C3%A9e_-_Pierre-Narcisse_Gu%C3%A9rin.jpg',
        imageCaption: 'Dido welcoming Aeneas — Pierre-Narcisse Guérin',
        paragraphs: [
          'Dido, also known as Elissa, is the legendary founder of Carthage. A princess of Tyre in Phoenicia (modern Lebanon), she was married to Sychaeus, an extremely wealthy priest of Hercules.',
          'Her brother Pygmalion, king of Tyre, murdered Sychaeus to seize his riches. Warned in a dream by her husband\'s ghost, Dido fled with the treasures and a group of loyal followers. After a stop in Cyprus, she landed on the coast of present-day Tunisia.',
          'Facing the Berber king Iarbas, she employed a famous stratagem: she asked for as much land as an oxhide could cover, then cut it into extremely thin strips to surround the entire hill of Byrsa. It was on this hill that Carthage was born — "Qart Hadasht," the New City.',
        ],
        achievements: [
          'Foundation of Carthage, future Mediterranean superpower',
          'The oxhide stratagem, a symbol of intelligence and cunning',
          'Creation of a haven for Phoenician refugees',
          'Icon of feminine independence and determination in antiquity',
        ]
      },
      {
        name: 'Hamilcar Barca',
        era: '275–228 BC',
        role: 'Carthaginian general, father of Hannibal',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hamilcar_Barca.jpg/440px-Hamilcar_Barca.jpg',
        imageCaption: 'Hamilcar Barca — Historical engraving',
        paragraphs: [
          'Hamilcar Barca (Phoenician: "Grace of Baal, the lightning") was one of Carthage\'s greatest generals and founder of the Barcid dynasty. During the First Punic War (264–241 BC), he waged a brilliant guerrilla campaign in Sicily against Rome.',
          'After Carthage\'s defeat and loss of Sicily, he faced the terrible Mercenary War (241–238 BC). With remarkable tactical skill, he crushed the rebellion in three years.',
          'In 237 BC, he embarked on the conquest of Spain, transforming the Iberian Peninsula into a Carthaginian power base. It was there that he made his son Hannibal, aged 9, swear the famous oath of eternal hatred toward Rome. Hamilcar died in combat in 228 BC.',
        ],
        achievements: [
          'Brilliant resistance in Sicily during the First Punic War',
          'Victory over the Mercenary revolt',
          'Conquest of the Iberian Peninsula',
          'Foundation of the Barcid dynasty',
          'Military training of his son Hannibal',
        ]
      },
      {
        name: 'Hannibal Barca',
        era: '247–183 BC',
        role: 'The greatest strategist of antiquity',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Mommsen_p265.jpg/440px-Mommsen_p265.jpg',
        imageCaption: 'Presumed bust of Hannibal — Museum of Naples',
        paragraphs: [
          'Hannibal Barca is considered one of the greatest military geniuses in human history. Son of Hamilcar Barca, he grew up in the military camps of Spain and received both a warrior\'s and an intellectual\'s education, speaking multiple languages including Punic, Greek, and Latin.',
          'In 221 BC, at only 26, he took command of Carthaginian forces in Spain. In 218 BC, he accomplished one of history\'s most daring military feats: crossing the Alps with 50,000 infantry, 9,000 cavalry, and 37 war elephants to attack Rome on its own soil.',
          'In Italy, he won victory after victory: at Ticinus, Trebia, Lake Trasimene, and above all at Cannae (216 BC), where his double envelopment maneuver annihilated a Roman army of 86,000 men. This battle is still studied in every military academy in the world.',
          'Despite his victories, denied reinforcements by the Carthaginian Senate, Hannibal could not take Rome. Recalled to Africa in 202 BC, he was defeated at Zama by Scipio Africanus. He then went into exile in the Near East, serving as military advisor to several kings. Hunted by Rome, he took his own life in 183 BC rather than surrender.',
        ],
        achievements: [
          'Crossing the Alps with war elephants (218 BC)',
          'Battle of Cannae: the perfect double envelopment',
          '15 years of victorious campaigning in enemy territory',
          'Strategist still studied in military academies today',
          'Considered Rome\'s greatest adversary',
        ]
      },
      {
        name: 'Hasdrubal Barca',
        era: '245–207 BC',
        role: 'Carthaginian general, brother of Hannibal',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Hasdrubal_Barca_%28Hannibal%27s_brother%29.jpg/440px-Hasdrubal_Barca_%28Hannibal%27s_brother%29.jpg',
        imageCaption: 'Hasdrubal Barca — Historical illustration',
        paragraphs: [
          'Hasdrubal Barca, Hannibal\'s younger brother, was tasked with maintaining Carthaginian control of Spain while his brother campaigned in Italy. For six years, he successfully fought the Roman armies of Scipio.',
          'In 208 BC, he made the bold decision to follow his brother\'s path across the Pyrenees and Alps to join him in Italy with substantial reinforcements.',
          'Unfortunately, his messengers were intercepted by the Romans. Consul Nero, through a secret forced march, combined two Roman armies and surprised Hasdrubal at the Battle of the Metaurus (207 BC). Hasdrubal fought bravely but was killed. In an act of cruelty, the Romans catapulted his head into Hannibal\'s camp.',
        ],
        achievements: [
          'Effective defense of Carthaginian Spain for 6 years',
          'Second crossing of the Alps (208–207 BC)',
          'Maintaining military pressure on Rome on two fronts',
          'Exemplary bravery at the Battle of the Metaurus',
        ]
      },
      {
        name: 'Hanno the Navigator',
        era: '~500 BC',
        role: 'Carthaginian explorer and admiral',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Hanno_bas_relief_MnM.jpg/440px-Hanno_bas_relief_MnM.jpg',
        imageCaption: 'Bas-relief of Hanno — Maritime Museum',
        paragraphs: [
          'Hanno the Navigator is one of the greatest explorers of antiquity. Around 500 BC, the Carthaginian Senate entrusted him with a monumental expedition: to explore and colonize the Atlantic coasts of Africa.',
          'With a fleet of 60 ships and about 30,000 men and women (colonists), Hanno sailed along the entire Atlantic coast of Morocco, passed through the Strait of Gibraltar, and continued south, founding several colonies along the way.',
          'His account, the "Periplus of Hanno," is one of the oldest documents of African exploration. He describes "gorillas" (likely chimpanzees or gorillas), an erupting volcano he calls the "Chariot of the Gods" (probably Mount Cameroon), and unknown peoples.',
        ],
        achievements: [
          'Exploration of the African Atlantic coast for thousands of kilometers',
          'Foundation of colonies along the Moroccan coastline and beyond',
          'Writing the Periplus, the first account of West African exploration',
          'Observation of the first "gorillas" known to Westerners',
        ]
      },
      {
        name: 'Masinissa',
        era: '238–148 BC',
        role: 'King of Numidia, ally then rival of Carthage',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Massinissa.jpg/440px-Massinissa.jpg',
        imageCaption: 'Coin depicting Masinissa',
        paragraphs: [
          'Masinissa, king of Numidia (modern Algeria), is a major figure in North African history. Initially allied with Carthage during the Second Punic War, he switched sides after a political quarrel and joined Scipio Africanus.',
          'His Numidian cavalry, reputed as the finest in the ancient world, played a decisive role in the Roman victory at Zama (202 BC). In return, Rome helped him unify Numidia under his rule.',
          'Masinissa transformed Numidia into a prosperous and modern kingdom, developing agriculture, urbanizing his territory, and reigning for nearly 60 years.',
        ],
        achievements: [
          'Unification of Numidia into a powerful kingdom',
          'Decisive Numidian cavalry at Zama',
          'Modernization of North African agriculture',
          'Reign of nearly 60 years (the longest in antiquity)',
        ]
      },
    ],
    ar: [
      {
        name: 'ديدون (أليسا)',
        era: '~814 ق.م',
        role: 'مؤسسة وأول ملكة لقرطاج',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Didon_et_son_peuple_accueillant_%C3%89n%C3%A9e_-_Pierre-Narcisse_Gu%C3%A9rin.jpg/800px-Didon_et_son_peuple_accueillant_%C3%89n%C3%A9e_-_Pierre-Narcisse_Gu%C3%A9rin.jpg',
        imageCaption: 'ديدون تستقبل إينياس — بيير-نارسيس غيران',
        paragraphs: [
          'ديدون، المعروفة أيضاً باسم أليسا، هي المؤسسة الأسطورية لقرطاج. أميرة من صور في فينيقيا (لبنان الحالي)، كانت زوجة سيشايوس، كاهن هرقل الثري جداً.',
          'قام شقيقها بيغماليون، ملك صور، بقتل سيشايوس للاستيلاء على ثرواته. حُذّرت في حلم من شبح زوجها، ففرّت ديدون بالكنوز ومجموعة من الأتباع المخلصين. بعد توقف في قبرص، نزلت على سواحل تونس الحالية.',
          'أمام الملك الأمازيغي إيرباس، استخدمت حيلة شهيرة: طلبت مساحة من الأرض بقدر ما يمكن أن يغطيه جلد ثور، ثم قطعته إلى شرائح رفيعة للغاية لتحيط تلة بيرصا بأكملها. على هذه التلة وُلدت قرطاج — «قرت حدشت»، المدينة الجديدة.',
        ],
        achievements: [
          'تأسيس قرطاج، القوة العظمى المتوسطية المستقبلية',
          'حيلة جلد الثور، رمز الذكاء والحنكة',
          'إنشاء ملاذ للاجئين الفينيقيين',
          'رمز للاستقلال والإرادة النسائية في العصور القديمة',
        ]
      },
      {
        name: 'حملقار برقا',
        era: '275–228 ق.م',
        role: 'قائد قرطاجي، والد حنبعل',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hamilcar_Barca.jpg/440px-Hamilcar_Barca.jpg',
        imageCaption: 'حملقار برقا — نقش تاريخي',
        paragraphs: [
          'حملقار برقا (بالفينيقية: «نعمة بعل، البرق») هو أحد أعظم قادة قرطاج ومؤسس سلالة البرقيين. خلال الحرب البونية الأولى، شنّ حرب عصابات بارعة في صقلية ضد الرومان.',
          'بعد هزيمة قرطاج وخسارة صقلية، واجه حرب المرتزقة المروعة. بمهارة تكتيكية مذهلة، سحق التمرد في ثلاث سنوات.',
          'عام 237 ق.م، انطلق لفتح إسبانيا، محولاً شبه الجزيرة الإيبيرية إلى قاعدة قوة قرطاجية. هناك جعل ابنه حنبعل البالغ 9 سنوات يقسم اليمين الشهير بالكراهية الأبدية لروما.',
        ],
        achievements: [
          'مقاومة بارعة في صقلية خلال الحرب البونية الأولى',
          'الانتصار على تمرد المرتزقة',
          'فتح شبه الجزيرة الإيبيرية',
          'تأسيس سلالة البرقيين',
          'التدريب العسكري لابنه حنبعل',
        ]
      },
      {
        name: 'حنبعل برقا',
        era: '247–183 ق.م',
        role: 'أعظم استراتيجي في العصور القديمة',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Mommsen_p265.jpg/440px-Mommsen_p265.jpg',
        imageCaption: 'تمثال نصفي مفترض لحنبعل — متحف نابولي',
        paragraphs: [
          'يُعتبر حنبعل برقا أحد أعظم العباقرة العسكريين في تاريخ البشرية. ابن حملقار برقا، نشأ في المعسكرات العسكرية في إسبانيا وتلقى تعليماً حربياً وفكرياً، متحدثاً عدة لغات منها البونية واليونانية واللاتينية.',
          'عام 221 ق.م، في سن 26 فقط، تولى قيادة القوات القرطاجية في إسبانيا. عام 218 ق.م، أنجز أحد أجرأ الأعمال العسكرية في التاريخ: عبور جبال الألب مع 50,000 مشاة و9,000 فارس و37 فيلاً حربياً لمهاجمة روما في أرضها.',
          'في إيطاليا، حقق انتصاراً تلو الآخر: في تيسينوس، وتريبيا، وبحيرة تراسيمين، والأهم في كاناي (216 ق.م)، حيث أباد مناورة التطويق المزدوج جيشاً رومانياً من 86,000 رجل.',
          'رغم انتصاراته، وحرمانه من التعزيزات من مجلس شيوخ قرطاج، لم يتمكن حنبعل من أخذ روما. استُدعي إلى أفريقيا عام 202 ق.م حيث هُزم في زاما. نُفي ثم انتحر عام 183 ق.م رافضاً الاستسلام.',
        ],
        achievements: [
          'عبور جبال الألب بفيلة الحرب (218 ق.م)',
          'معركة كاناي: التطويق المزدوج المثالي',
          '15 عاماً من الحملات المنتصرة في أرض العدو',
          'استراتيجي لا يزال يُدرس في الأكاديميات العسكرية',
          'يُعتبر أعظم خصم لروما',
        ]
      },
      {
        name: 'صدربعل برقا',
        era: '245–207 ق.م',
        role: 'قائد قرطاجي، شقيق حنبعل',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Hasdrubal_Barca_%28Hannibal%27s_brother%29.jpg/440px-Hasdrubal_Barca_%28Hannibal%27s_brother%29.jpg',
        imageCaption: 'صدربعل برقا — رسم تاريخي',
        paragraphs: [
          'صدربعل برقا، الشقيق الأصغر لحنبعل، كُلّف بالحفاظ على السيطرة القرطاجية في إسبانيا أثناء حملات أخيه في إيطاليا. طوال ست سنوات، قاتل بنجاح الجيوش الرومانية.',
          'عام 208 ق.م، اتخذ القرار الجريء بعبور البيرينيه والألب للالتحاق بأخيه في إيطاليا بتعزيزات كبيرة.',
          'لسوء الحظ، اعترض الرومان رسله. القنصل نيرون، بمسيرة إجبارية سرية، جمع جيشين رومانيين وفاجأ صدربعل في معركة ميتاوروس (207 ق.م). قاتل صدربعل بشجاعة لكنه قُتل. في عمل وحشي، قذف الرومان رأسه في معسكر حنبعل.',
        ],
        achievements: [
          'دفاع فعّال عن إسبانيا القرطاجية لمدة 6 سنوات',
          'العبور الثاني لجبال الألب (208–207 ق.م)',
          'الحفاظ على الضغط العسكري على روما في جبهتين',
          'شجاعة مثالية في معركة ميتاوروس',
        ]
      },
      {
        name: 'حنّون الملاّح',
        era: '~500 ق.م',
        role: 'مستكشف وأميرال قرطاجي',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Hanno_bas_relief_MnM.jpg/440px-Hanno_bas_relief_MnM.jpg',
        imageCaption: 'نقش بارز لحنّون — المتحف البحري',
        paragraphs: [
          'حنّون الملاّح هو أحد أعظم المستكشفين في العصور القديمة. حوالي 500 ق.م، كلّفه مجلس شيوخ قرطاج ببعثة ضخمة: استكشاف واستعمار السواحل الأطلسية لأفريقيا.',
          'مع أسطول من 60 سفينة ونحو 30,000 رجل وامرأة (مستوطنين)، أبحر حنّون على طول الساحل الأطلسي للمغرب، وعبر مضيق جبل طارق، وواصل جنوباً مؤسساً عدة مستعمرات.',
          'روايته، «محيط حنّون»، هي أحد أقدم وثائق الاستكشاف الأفريقي. يصف فيها «غوريلات» (على الأرجح شمبانزي أو غوريلا)، وبركاناً ثائراً أسماه «عربة الآلهة» (ربما جبل الكاميرون).',
        ],
        achievements: [
          'استكشاف الساحل الأطلسي الأفريقي لآلاف الكيلومترات',
          'تأسيس مستعمرات على الساحل المغربي وما وراءه',
          'كتابة المحيط، أول رواية لاستكشاف غرب أفريقيا',
          'مراقبة أول «غوريلات» عرفها الغربيون',
        ]
      },
      {
        name: 'ماسينيسا',
        era: '238–148 ق.م',
        role: 'ملك نوميديا، حليف ثم منافس لقرطاج',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Massinissa.jpg/440px-Massinissa.jpg',
        imageCaption: 'عملة تصور ماسينيسا',
        paragraphs: [
          'ماسينيسا، ملك نوميديا (الجزائر الحالية)، شخصية محورية في تاريخ شمال أفريقيا. حليف قرطاج في البداية، غيّر جانبه بعد خلاف سياسي وانضم إلى سكيبيو الأفريقي.',
          'سلاح الفرسان النوميدي الذي قاده، المعروف بأنه الأفضل في العالم القديم، لعب دوراً حاسماً في النصر الروماني في زاما (202 ق.م).',
          'حوّل ماسينيسا نوميديا إلى مملكة مزدهرة وحديثة. طوّر الزراعة وعمّر أراضيه وحكم لنحو 60 عاماً.',
        ],
        achievements: [
          'توحيد نوميديا في مملكة قوية',
          'سلاح الفرسان النوميدي الحاسم في زاما',
          'تحديث الزراعة في شمال أفريقيا',
          'حكم لنحو 60 عاماً (الأطول في العصور القديمة)',
        ]
      },
    ]
  }
  return data[locale.value] || data.fr
})

const otherFigures = computed(() => {
  const data = {
    fr: [
      { name: 'Sophonisbe', era: '~235–203 av. J.-C.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Giambattista_Pittoni_-_The_Sacrifice_of_Polyxena_-_WGA17975.jpg/440px-Giambattista_Pittoni_-_The_Sacrifice_of_Polyxena_-_WGA17975.jpg', description: 'Princesse carthaginoise, fille d\'Hasdrubal Gisco. Mariée au roi numide Syphax pour sceller une alliance, elle préféra le poison à la captivité romaine. Son courage inspire artistes et écrivains depuis des siècles.' },
      { name: 'Hasdrubal le Beau', era: '~270–221 av. J.-C.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Carthage_National_Museum_general_view.jpg/800px-Carthage_National_Museum_general_view.jpg', description: 'Gendre d\'Hamilcar Barca, il prit la relève en Espagne après sa mort. Diplomate habile, il fonda Carthagène (Qart Hadasht) et négocia le traité de l\'Èbre avec Rome.' },
      { name: 'Xanthippe', era: '~255 av. J.-C.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Carthage_National_Museum_general_view.jpg/800px-Carthage_National_Museum_general_view.jpg', description: 'Général mercenaire spartiate engagé par Carthage. Il réorganisa l\'armée et écrasa les légions romaines de Regulus à la bataille de Tunis (255 av. J.-C.), sauvant Carthage d\'une invasion.' },
      { name: 'Magon l\'Agronome', era: '~IIe siècle av. J.-C.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Carthage_National_Museum_general_view.jpg/800px-Carthage_National_Museum_general_view.jpg', description: 'Auteur du célèbre traité d\'agriculture en 28 volumes. Après la chute de Carthage, le Sénat romain ordonna sa traduction en latin — le seul ouvrage punique à recevoir cet honneur.' },
    ],
    en: [
      { name: 'Sophonisba', era: '~235–203 BC', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Giambattista_Pittoni_-_The_Sacrifice_of_Polyxena_-_WGA17975.jpg/440px-Giambattista_Pittoni_-_The_Sacrifice_of_Polyxena_-_WGA17975.jpg', description: 'Carthaginian princess who chose poison over Roman captivity. Her courage has inspired artists and writers for centuries.' },
      { name: 'Hasdrubal the Fair', era: '~270–221 BC', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Carthage_National_Museum_general_view.jpg/800px-Carthage_National_Museum_general_view.jpg', description: 'Hamilcar Barca\'s son-in-law, he took over in Spain after his death. A skilled diplomat, he founded Cartagena and negotiated the Ebro Treaty with Rome.' },
      { name: 'Xanthippus', era: '~255 BC', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Carthage_National_Museum_general_view.jpg/800px-Carthage_National_Museum_general_view.jpg', description: 'Spartan mercenary general hired by Carthage. He reorganized the army and crushed the Roman legions of Regulus at the Battle of Tunis (255 BC), saving Carthage from invasion.' },
      { name: 'Mago the Agronomist', era: '~2nd century BC', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Carthage_National_Museum_general_view.jpg/800px-Carthage_National_Museum_general_view.jpg', description: 'Author of the famous 28-volume agricultural treatise. After Carthage\'s fall, the Roman Senate ordered its translation into Latin — the only Punic work to receive this honor.' },
    ],
    ar: [
      { name: 'صوفونسبا', era: '~235–203 ق.م', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Giambattista_Pittoni_-_The_Sacrifice_of_Polyxena_-_WGA17975.jpg/440px-Giambattista_Pittoni_-_The_Sacrifice_of_Polyxena_-_WGA17975.jpg', description: 'أميرة قرطاجية اختارت السم على الأسر الروماني. شجاعتها ألهمت الفنانين والكتّاب لقرون.' },
      { name: 'صدربعل الجميل', era: '~270–221 ق.م', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Carthage_National_Museum_general_view.jpg/800px-Carthage_National_Museum_general_view.jpg', description: 'صهر حملقار برقا، تولى القيادة في إسبانيا بعد وفاته. دبلوماسي ماهر، أسس قرطاجنة وتفاوض على معاهدة إيبرو مع روما.' },
      { name: 'كسانثيبوس', era: '~255 ق.م', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Carthage_National_Museum_general_view.jpg/800px-Carthage_National_Museum_general_view.jpg', description: 'قائد مرتزق سبارطي استأجرته قرطاج. أعاد تنظيم الجيش وسحق الفيالق الرومانية في معركة تونس (255 ق.م)، منقذاً قرطاج من الغزو.' },
      { name: 'ماغون المهندس الزراعي', era: '~القرن الثاني ق.م', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Carthage_National_Museum_general_view.jpg/800px-Carthage_National_Museum_general_view.jpg', description: 'مؤلف أطروحة الزراعة الشهيرة في 28 مجلداً. بعد سقوط قرطاج، أمر مجلس الشيوخ الروماني بترجمتها إلى اللاتينية — العمل البوني الوحيد الذي حظي بهذا الشرف.' },
    ]
  }
  return data[locale.value] || data.fr
})
</script>

<style scoped>
.bio-hero {
  background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-burgundy-dark) 60%, #2d1b0e 100%);
  padding: 10rem 0 4rem;
  text-align: center;
}

.hero-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.page-hero-title {
  font-size: 3rem;
  color: var(--color-gold);
  margin-bottom: 1rem;
  letter-spacing: 3px;
}

.page-hero-subtitle {
  color: #ccc;
  font-size: 1.15rem;
  font-style: italic;
  max-width: 600px;
  margin: 0 auto;
}

/* Bio Blocks */
.bio-block {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 3rem;
  margin-bottom: 5rem;
  padding-bottom: 5rem;
  border-bottom: 1px solid #e0d8c8;
}

.bio-block.reverse {
  grid-template-columns: 1fr 350px;
}

.bio-block.reverse .bio-image {
  order: 2;
}

.bio-block.reverse .bio-info {
  order: 1;
}

.bio-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.bio-image-caption {
  text-align: center;
  margin-top: 0.8rem;
  font-size: 0.8rem;
  color: #888;
  font-style: italic;
}

.bio-era {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--color-burgundy);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 0.3rem;
}

.bio-info h2 {
  font-size: 2rem;
  color: var(--color-navy);
  margin-bottom: 0.3rem;
}

.bio-role {
  font-style: italic;
  color: var(--color-gold-dark);
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.bio-text p {
  color: #444;
  font-size: 0.95rem;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.bio-achievements {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: var(--color-sand);
  border-radius: 8px;
  border-left: 4px solid var(--color-gold);
}

:global([dir="rtl"]) .bio-achievements {
  border-left: none;
  border-right: 4px solid var(--color-gold);
}

.bio-achievements h4 {
  font-size: 0.9rem;
  color: var(--color-burgundy);
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.bio-achievements ul {
  list-style: none;
  padding: 0;
}

.bio-achievements li {
  padding: 0.3rem 0 0.3rem 1.5rem;
  position: relative;
  color: #555;
  font-size: 0.9rem;
}

:global([dir="rtl"]) .bio-achievements li {
  padding: 0.3rem 1.5rem 0.3rem 0;
}

.bio-achievements li::before {
  content: '✦';
  position: absolute;
  left: 0;
  color: var(--color-gold);
}

:global([dir="rtl"]) .bio-achievements li::before {
  left: auto;
  right: 0;
}

/* Other Figures */
.section-alt {
  background: var(--color-sand);
}

.others-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.other-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s;
}

.other-card:hover {
  transform: translateY(-3px);
}

.other-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.other-body {
  padding: 1.5rem;
}

.other-era {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: var(--color-burgundy);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.3rem;
}

.other-card h3 {
  font-size: 1.15rem;
  color: var(--color-navy);
  margin-bottom: 0.6rem;
}

.other-card p {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .page-hero-title {
    font-size: 2rem;
  }

  .bio-block,
  .bio-block.reverse {
    grid-template-columns: 1fr;
  }

  .bio-block.reverse .bio-image,
  .bio-block.reverse .bio-info {
    order: unset;
  }

  .bio-image img {
    height: 250px;
  }

  .others-grid {
    grid-template-columns: 1fr;
  }
}
</style>
