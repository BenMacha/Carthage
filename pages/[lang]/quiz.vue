<template>
  <div class="pg">
    <!-- Héros -->
    <section class="bento bento--top">
      <div class="s-8 tile tile--xl tile--purple tile--stack hero">
        <span class="phoen watermark" dir="rtl" aria-hidden="true">𐤒𐤓𐤕𐤇𐤃𐤔𐤕</span>
        <span class="chip chip--glass">{{ c.chip }}</span>
        <div>
          <h1 class="h-display">{{ c.title }}</h1>
          <p class="lede">{{ c.lede }}</p>
        </div>
        <div class="hero-stats">
          <p class="hero-stat"><span class="num">{{ THEMES.length }}</span> <span>{{ c.themesLabel }}</span></p>
          <p class="hero-stat"><span class="num">{{ totalQuestions }}</span> <span>{{ c.questionsLabel }}</span></p>
          <p class="hero-stat"><span class="num">3</span> <span>{{ c.langsLabel }}</span></p>
        </div>
      </div>
      <figure class="s-4 fig fig--hero" style="background:#4F1633">
        <img src="/img/oath.jpg" :alt="c.heroAlt">
        <figcaption>{{ c.heroCaption }}</figcaption>
      </figure>
    </section>

    <!-- Annonces pour lecteurs d'écran -->
    <p class="sr-only" aria-live="polite" aria-atomic="true">{{ announce }}</p>

    <!-- 1. Choix du thème -->
    <section v-if="stage === 'pick'" class="sec" aria-labelledby="quiz-pick-title">
      <div class="sec-head">
        <div>
          <span class="kicker">{{ c.pickKicker }}</span>
          <h2 id="quiz-pick-title" class="h-section">{{ c.pickTitle }}</h2>
        </div>
        <p>{{ c.pickAside }}</p>
      </div>
      <ul class="cols cols-3 cols--flush themes" role="list">
        <li v-for="(t, i) in THEMES" :key="t.id" class="theme-li">
          <button
            type="button"
            class="tile tile--stack theme-card"
            :class="TONES[i % TONES.length]"
            :aria-describedby="`quiz-theme-${t.id}-meta`"
            @click="start(t.id)"
          >
            <span class="theme-top">
              <span class="kicker">{{ c.nQuestions(t.questions.length) }}</span>
              <span class="theme-glyph phoen" aria-hidden="true">{{ GLYPHS[i % GLYPHS.length] }}</span>
            </span>
            <span class="theme-main">
              <span class="h-card theme-title">{{ t.title[lang] }}</span>
              <span class="theme-desc">{{ t.desc[lang] }}</span>
            </span>
            <span :id="`quiz-theme-${t.id}-meta`" class="theme-foot">
              <span class="best">{{ best[t.id] != null ? c.bestLabel(best[t.id], t.questions.length) : c.notPlayed }}</span>
              <span class="go">{{ c.startCta }} <span aria-hidden="true">{{ arrow }}</span></span>
            </span>
          </button>
        </li>
      </ul>
      <p class="storage-note">{{ c.storageNote }}</p>
    </section>

    <!-- 2. Déroulé -->
    <section v-else-if="stage === 'play' && current" class="sec" :aria-label="theme.title[lang]">
      <div class="tile tile--xl play">
        <div class="play-head">
          <div>
            <span class="kicker">{{ theme.title[lang] }}</span>
            <p class="play-count">{{ c.questionOf(index + 1, deck.length) }}</p>
          </div>
          <div class="play-side">
            <span class="chip score-chip">{{ c.scoreNow(score) }}</span>
            <button type="button" class="btn btn-outline quit" @click="quit">{{ c.quit }}</button>
          </div>
        </div>

        <div
          class="progress"
          role="progressbar"
          :aria-label="c.progressLabel"
          aria-valuemin="0"
          :aria-valuemax="deck.length"
          :aria-valuenow="answeredCount"
          :aria-valuetext="c.progressText(answeredCount, deck.length)"
        >
          <span class="progress-fill" :style="{ width: `${(answeredCount / deck.length) * 100}%` }" />
        </div>

        <h2 ref="questionEl" class="h-block question" tabindex="-1">{{ current.q[lang] }}</h2>

        <div
          ref="choicesEl"
          class="choices"
          role="group"
          :aria-label="c.choicesLabel"
          @keydown="onChoicesKey"
        >
          <button
            v-for="(orig, i) in current.order"
            :key="`${current.id}-${orig}`"
            type="button"
            class="choice"
            :class="choiceClass(orig)"
            :aria-disabled="picked !== null ? 'true' : null"
            :aria-describedby="picked !== null && (orig === current.answer || orig === picked) ? `quiz-choice-state-${i}` : null"
            @click="pick(orig)"
          >
            <span class="choice-letter" aria-hidden="true">{{ c.letters[i] }}</span>
            <span class="choice-text">{{ current.choices[lang][orig] }}</span>
            <span
              v-if="picked !== null && (orig === current.answer || orig === picked)"
              :id="`quiz-choice-state-${i}`"
              class="choice-state"
            >{{ orig === current.answer ? c.tagRight : c.tagYours }}</span>
          </button>
        </div>
        <p v-if="picked === null" class="keys-hint">{{ c.keysHint }}</p>

        <div v-if="picked !== null" class="feedback" :class="lastCorrect ? 'feedback--ok' : 'feedback--ko'">
          <p class="feedback-title">
            <span class="feedback-ico" aria-hidden="true">{{ lastCorrect ? '✓' : '✗' }}</span>
            {{ lastCorrect ? c.correct : c.incorrect }}
          </p>
          <p class="feedback-text">{{ current.explain[lang] }}</p>
          <div class="feedback-actions">
            <NuxtLink :to="localePath(current.page)" class="read-link">
              {{ c.readPage(pageLabel(current.page)) }} <span aria-hidden="true">{{ arrow }}</span>
            </NuxtLink>
            <button ref="nextEl" type="button" class="btn btn-primary" @click="next">
              {{ index + 1 < deck.length ? c.next : c.seeResult }} <span aria-hidden="true">{{ arrow }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Résultat -->
    <section v-else-if="stage === 'end'" class="sec" aria-labelledby="quiz-end-title">
      <div class="cols cols-5-7 cols--flush">
        <div class="tile tile--xl tile--stack end-score" :class="scoreTone">
          <div>
            <span class="kicker">{{ theme.title[lang] }}</span>
            <h2 id="quiz-end-title" ref="endEl" class="h-section end-title" tabindex="-1">{{ c.endTitle }}</h2>
          </div>
          <p class="end-num"><span class="num">{{ score }}</span><span class="end-den">/ {{ deck.length }}</span></p>
          <div>
            <p class="end-msg">{{ scoreMessage }}</p>
            <p v-if="newRecord" class="chip chip--white record">{{ c.newRecord }}</p>
            <p v-else-if="best[theme.id] != null" class="end-best">{{ c.bestLabel(best[theme.id], deck.length) }}</p>
          </div>
          <div class="end-actions">
            <button type="button" class="btn btn-outline" @click="start(theme.id)">{{ c.replay }}</button>
            <button type="button" class="btn btn-outline" @click="quit">{{ c.otherTheme }}</button>
          </div>
        </div>

        <div class="tile tile--xl recap">
          <span class="kicker">{{ c.recapKicker }}</span>
          <h3 class="h-block recap-title">{{ mistakes.length ? c.recapTitle(mistakes.length) : c.recapPerfect }}</h3>
          <ol v-if="mistakes.length" class="recap-list">
            <li v-for="m in mistakes" :key="m.q.id" class="recap-item">
              <p class="recap-q">{{ m.q.q[lang] }}</p>
              <p class="recap-a recap-a--ko"><span class="recap-lbl">{{ c.yourAnswer }}</span> {{ m.q.choices[lang][m.picked] }}</p>
              <p class="recap-a recap-a--ok"><span class="recap-lbl">{{ c.rightAnswer }}</span> {{ m.q.choices[lang][m.q.answer] }}</p>
              <NuxtLink :to="localePath(m.q.page)" class="read-link">
                {{ c.readPage(pageLabel(m.q.page)) }} <span aria-hidden="true">{{ arrow }}</span>
              </NuxtLink>
            </li>
          </ol>
          <p v-else class="body">{{ c.recapPerfectText }}</p>
        </div>
      </div>
    </section>

    <!-- À lire aussi -->
    <section class="sec" aria-labelledby="quiz-more-title">
      <div class="sec-head">
        <h2 id="quiz-more-title" class="h-section">{{ c.moreTitle }}</h2>
      </div>
      <div class="cols cols-3 cols--flush">
        <NuxtLink v-for="l in c.more" :key="l.to" :to="localePath(l.to)" class="tile tile--stack more-card" :class="l.tone">
          <span class="kicker">{{ l.k }}</span>
          <div>
            <h3 class="h-card">{{ l.t }}</h3>
            <p class="body">{{ l.d }}</p>
          </div>
          <span class="go">{{ c.go }} <span aria-hidden="true">{{ arrow }}</span></span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import QUIZ_RAW from '~/assets/data/quiz.json'
import SITE_MAP_RAW from '~/assets/data/site-map.json'

// Données complétées pour la langue affichée (langues ajoutées : i18n/locales/<langue>/)
const { locale: dataLocale } = useI18n()
const QUIZ = (await useLocalizedData('quiz-data', QUIZ_RAW)).value
const SITE_MAP = localizeSiteMap(SITE_MAP_RAW, dataLocale.value)


const { locale, localePath } = useI18n()

const C = {
  fr: {
    chip: 'Carthage · Quiz',
    title: 'Testez vos connaissances',
    lede: "Six thèmes, dix questions chacun : de la peau de bœuf d'Élissa aux Aigles de Carthage. Chaque réponse renvoie à la page du site où la lire.",
    themesLabel: 'thèmes',
    questionsLabel: 'questions',
    langsLabel: 'langues',
    heroAlt: "Le jeune Hannibal jurant, la main sur l'autel, de ne jamais être l'ami de Rome",
    heroCaption: "Le serment d'Hannibal",
    pickKicker: 'Étape 1',
    pickTitle: 'Choisissez un thème',
    pickAside: "Questions et réponses sont mélangées à chaque partie. Votre meilleur score reste dans ce navigateur.",
    nQuestions: n => `${n} questions`,
    bestLabel: (s, n) => `Meilleur score : ${s}/${n}`,
    notPlayed: 'Pas encore joué',
    startCta: 'Commencer',
    storageNote: "Les meilleurs scores sont enregistrés uniquement sur cet appareil ; rien n'est envoyé.",
    questionOf: (i, n) => `Question ${i} sur ${n}`,
    scoreNow: s => `Score : ${s}`,
    quit: 'Changer de thème',
    progressLabel: 'Progression du quiz',
    progressText: (a, n) => `${a} question${a > 1 ? 's' : ''} répondue${a > 1 ? 's' : ''} sur ${n}`,
    choicesLabel: 'Réponses possibles',
    letters: ['A', 'B', 'C', 'D'],
    keysHint: 'Astuce clavier : flèches pour se déplacer, touches 1 à 4 pour répondre.',
    tagRight: 'Bonne réponse',
    tagYours: 'Votre réponse',
    correct: 'Bonne réponse !',
    incorrect: 'Mauvaise réponse',
    announceOk: 'Bonne réponse !',
    announceKo: r => `Mauvaise réponse. La bonne réponse était : ${r}.`,
    readPage: p => `Lire la page « ${p} »`,
    next: 'Question suivante',
    seeResult: 'Voir le résultat',
    endTitle: 'Votre score',
    announceEnd: (s, n) => `Quiz terminé. Score : ${s} sur ${n}.`,
    messages: [
      "Carthage ne s'est pas faite en un jour : relisez les pages ci-contre et retentez votre chance.",
      'Un bon début ! Quelques pages à relire, et le prochain essai sera meilleur.',
      'Bien joué : vous connaissez déjà bien le monde punique.',
      "Excellent ! Polybe lui-même vous prendrait pour source.",
      "Sans faute ! Hannibal n'aurait pas fait mieux."
    ],
    newRecord: 'Nouveau record pour ce thème !',
    replay: 'Rejouer',
    otherTheme: 'Autre thème',
    recapKicker: 'Récapitulatif',
    recapTitle: n => n > 1 ? `${n} erreurs à revoir` : '1 erreur à revoir',
    recapPerfect: 'Aucune erreur',
    recapPerfectText: 'Toutes vos réponses sont justes. Essayez un autre thème pour compléter votre tour de Carthage.',
    yourAnswer: 'Votre réponse :',
    rightAnswer: 'Bonne réponse :',
    moreTitle: 'Pour réviser',
    go: 'Lire',
    more: [
      { to: '/chronologie', tone: 'tile--purple', k: '814 – 146 av. J.-C.', t: 'Chronologie', d: "Sept siècles d'histoire punique, époque par époque." },
      { to: '/biographies', tone: '', k: 'Personnages', t: 'Les grandes figures', d: 'Élissa, les Barcides, les navigateurs et les rois numides.' },
      { to: '/glossaire', tone: 'tile--ink', k: 'Vocabulaire', t: 'Le glossaire', d: 'Suffète, tophet, Cothon, shekel : les mots du monde punique.' }
    ],
    metaTitle: 'Quiz sur Carthage — testez vos connaissances',
    metaDesc: "Soixante questions en six thèmes sur Carthage : fondation, Hannibal et les guerres puniques, religion, économie, personnages et Tunisie d'aujourd'hui."
  },
  en: {
    chip: 'Carthage · Quiz',
    title: 'Test your knowledge',
    lede: "Six themes, ten questions each: from Elissa's ox-hide to the Eagles of Carthage. Every answer links to the page of the site where you can read it.",
    themesLabel: 'themes',
    questionsLabel: 'questions',
    langsLabel: 'languages',
    heroAlt: 'The young Hannibal swearing, his hand on the altar, never to be a friend of Rome',
    heroCaption: "Hannibal's oath",
    pickKicker: 'Step 1',
    pickTitle: 'Choose a theme',
    pickAside: 'Questions and answers are shuffled in every game. Your best score stays in this browser.',
    nQuestions: n => `${n} questions`,
    bestLabel: (s, n) => `Best score: ${s}/${n}`,
    notPlayed: 'Not played yet',
    startCta: 'Start',
    storageNote: 'Best scores are stored only on this device; nothing is sent anywhere.',
    questionOf: (i, n) => `Question ${i} of ${n}`,
    scoreNow: s => `Score: ${s}`,
    quit: 'Change theme',
    progressLabel: 'Quiz progress',
    progressText: (a, n) => `${a} of ${n} question${n > 1 ? 's' : ''} answered`,
    choicesLabel: 'Possible answers',
    letters: ['A', 'B', 'C', 'D'],
    keysHint: 'Keyboard tip: arrow keys to move, keys 1 to 4 to answer.',
    tagRight: 'Correct answer',
    tagYours: 'Your answer',
    correct: 'Correct!',
    incorrect: 'Wrong answer',
    announceOk: 'Correct!',
    announceKo: r => `Wrong answer. The correct answer was: ${r}.`,
    readPage: p => `Read the page “${p}”`,
    next: 'Next question',
    seeResult: 'See the result',
    endTitle: 'Your score',
    announceEnd: (s, n) => `Quiz complete. Score: ${s} out of ${n}.`,
    messages: [
      "Carthage wasn't built in a day: read the pages listed here and try again.",
      'A good start! A few pages to reread, and your next try will be better.',
      'Well done: you already know the Punic world well.',
      'Excellent! Polybius himself would cite you as a source.',
      "A perfect score! Hannibal couldn't have done better."
    ],
    newRecord: 'New record for this theme!',
    replay: 'Play again',
    otherTheme: 'Another theme',
    recapKicker: 'Review',
    recapTitle: n => n > 1 ? `${n} mistakes to review` : '1 mistake to review',
    recapPerfect: 'No mistakes',
    recapPerfectText: 'All your answers are correct. Try another theme to complete your tour of Carthage.',
    yourAnswer: 'Your answer:',
    rightAnswer: 'Correct answer:',
    moreTitle: 'Revise',
    go: 'Read',
    more: [
      { to: '/chronologie', tone: 'tile--purple', k: '814 – 146 BC', t: 'Timeline', d: 'Seven centuries of Punic history, era by era.' },
      { to: '/biographies', tone: '', k: 'People', t: 'The great figures', d: 'Elissa, the Barcids, the navigators and the Numidian kings.' },
      { to: '/glossaire', tone: 'tile--ink', k: 'Vocabulary', t: 'The glossary', d: 'Sufete, tophet, Cothon, shekel: the words of the Punic world.' }
    ],
    metaTitle: 'Carthage quiz — test your knowledge',
    metaDesc: "Sixty questions in six themes about Carthage: foundation, Hannibal and the Punic Wars, religion, economy, people and today's Tunisia."
  },
  ar: {
    chip: 'قرطاج · اختبار',
    title: 'اختبر معلوماتك',
    lede: 'ستة محاور وعشرة أسئلة في كل محور: من جلد ثور عليسة إلى نسور قرطاج. وكل إجابة تحيلك إلى صفحة الموقع التي تجدها فيها.',
    themesLabel: 'محاور',
    questionsLabel: 'سؤالًا',
    langsLabel: 'لغات',
    heroAlt: 'حنبعل الصغير يُقسم ويده على المذبح ألّا يكون صديقًا لروما أبدًا',
    heroCaption: 'قسم حنبعل',
    pickKicker: 'الخطوة الأولى',
    pickTitle: 'اختر محورًا',
    pickAside: 'تُخلط الأسئلة والإجابات في كل جولة. ويبقى أفضل رصيد لك محفوظًا في هذا المتصفح.',
    nQuestions: n => `${n} أسئلة`,
    bestLabel: (s, n) => `أفضل نتيجة: ${s}/${n}`,
    notPlayed: 'لم تلعب بعد',
    startCta: 'ابدأ',
    storageNote: 'تُحفظ أفضل النتائج على هذا الجهاز فقط، ولا يُرسل أي شيء.',
    questionOf: (i, n) => `السؤال ${i} من ${n}`,
    scoreNow: s => `النتيجة: ${s}`,
    quit: 'تغيير المحور',
    progressLabel: 'تقدّم الاختبار',
    progressText: (a, n) => `أُجيب عن ${a} من ${n}`,
    choicesLabel: 'الإجابات الممكنة',
    letters: ['أ', 'ب', 'ج', 'د'],
    keysHint: 'تلميح: استعمل الأسهم للتنقّل والأرقام من 1 إلى 4 للإجابة.',
    tagRight: 'الإجابة الصحيحة',
    tagYours: 'إجابتك',
    correct: 'إجابة صحيحة!',
    incorrect: 'إجابة خاطئة',
    announceOk: 'إجابة صحيحة!',
    announceKo: r => `إجابة خاطئة. الإجابة الصحيحة: ${r}.`,
    readPage: p => `اقرأ صفحة «${p}»`,
    next: 'السؤال التالي',
    seeResult: 'عرض النتيجة',
    endTitle: 'نتيجتك',
    announceEnd: (s, n) => `انتهى الاختبار. النتيجة: ${s} من ${n}.`,
    messages: [
      'لم تُبنَ قرطاج في يوم واحد: أعد قراءة الصفحات المذكورة وحاول من جديد.',
      'بداية جيدة! بضع صفحات للمراجعة وستكون المحاولة القادمة أفضل.',
      'أحسنت: أنت تعرف العالم البونيقي معرفة جيدة.',
      'ممتاز! لاتّخذك بوليبيوس نفسه مصدرًا.',
      'علامة كاملة! ما كان حنبعل ليفعل أفضل من ذلك.'
    ],
    newRecord: 'رقم قياسي جديد في هذا المحور!',
    replay: 'العب مجددًا',
    otherTheme: 'محور آخر',
    recapKicker: 'مراجعة',
    recapTitle: n => n === 1 ? 'خطأ واحد للمراجعة' : n === 2 ? 'خطآن للمراجعة' : n <= 10 ? `${n} أخطاء للمراجعة` : `${n} خطأً للمراجعة`,
    recapPerfect: 'لا أخطاء',
    recapPerfectText: 'كل إجاباتك صحيحة. جرّب محورًا آخر لتكمل جولتك في قرطاج.',
    yourAnswer: 'إجابتك:',
    rightAnswer: 'الإجابة الصحيحة:',
    moreTitle: 'للمراجعة',
    go: 'اقرأ',
    more: [
      { to: '/chronologie', tone: 'tile--purple', k: '814 – 146 ق.م', t: 'التسلسل الزمني', d: 'سبعة قرون من التاريخ البونيقي، حقبةً بعد حقبة.' },
      { to: '/biographies', tone: '', k: 'الشخصيات', t: 'الأعلام الكبار', d: 'عليسة والبرقيون والملّاحون والملوك النوميديون.' },
      { to: '/glossaire', tone: 'tile--ink', k: 'المصطلحات', t: 'المعجم', d: 'الشفط والتوفيت والكوثون والشيقل: كلمات العالم البونيقي.' }
    ],
    metaTitle: 'اختبار حول قرطاج — اختبر معلوماتك',
    metaDesc: 'ستون سؤالًا في ستة محاور حول قرطاج: التأسيس، حنبعل والحروب البونيقية، الديانة، الاقتصاد، الشخصيات، وتونس اليوم.'
  }
}

const c = await useLocalized('quiz', C)
const lang = computed(() => locale.value)
const arrow = computed(() => (lang.value === 'ar' ? '←' : '→'))

const THEMES = QUIZ.themes
const totalQuestions = THEMES.reduce((n, t) => n + t.questions.length, 0)
const TONES = ['tile--sand', 'tile--ink', 'tile--purple', 'tile--olive', 'tile--terra', 'tile--navy']
const GLYPHS = ['𐤒𐤓𐤕', '𐤇𐤍𐤁𐤏𐤋', '𐤕𐤍𐤕', '𐤌𐤂𐤍', '𐤁𐤓𐤒', '𐤏𐤐𐤓']

const PAGE_LABELS = Object.fromEntries(
  SITE_MAP.groups.flatMap(g => g.pages).map(p => [`/${p.slug}`, p.label])
)
const pageLabel = route => PAGE_LABELS[route]?.[lang.value] || PAGE_LABELS[route]?.fr || route

// ---------- Meilleurs scores (localStorage, facultatif) ----------
const STORE_KEY = 'carthage-quiz-best'
const best = ref({})

function loadBest () {
  try {
    const raw = window.localStorage.getItem(STORE_KEY)
    const data = raw ? JSON.parse(raw) : {}
    best.value = data && typeof data === 'object' ? data : {}
  } catch (e) {
    best.value = {}
  }
}

function saveBest () {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(best.value))
  } catch (e) {
    // stockage indisponible (navigation privée, cookies bloqués) : la page fonctionne sans
  }
}

onMounted(loadBest)

// ---------- État du jeu ----------
const stage = ref('pick') // 'pick' | 'play' | 'end'
const themeId = ref(null)
const deck = ref([]) // questions mélangées, chacune avec `order` (ordre des choix mélangé)
const index = ref(0)
const picked = ref(null) // index d'origine du choix sélectionné
const score = ref(0)
const answers = ref([]) // { q, picked }
const announce = ref('')
const newRecord = ref(false)

const questionEl = ref(null)
const choicesEl = ref(null)
const nextEl = ref(null)
const endEl = ref(null)

const theme = computed(() => THEMES.find(t => t.id === themeId.value) || THEMES[0])
const current = computed(() => deck.value[index.value] || null)
const answeredCount = computed(() => index.value + (picked.value !== null ? 1 : 0))
const lastCorrect = computed(() => current.value && picked.value === current.value.answer)
const mistakes = computed(() => answers.value.filter(a => a.picked !== a.q.answer))

function shuffle (arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function focusEl (el) {
  nextTick(() => {
    if (!el.value) return
    el.value.focus({ preventScroll: true })
    const calm = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    el.value.scrollIntoView({ block: 'center', behavior: calm ? 'auto' : 'smooth' })
  })
}

function start (id) {
  const t = THEMES.find(x => x.id === id)
  if (!t) return
  themeId.value = id
  deck.value = shuffle(t.questions).map(q => ({ ...q, order: shuffle([0, 1, 2, 3]) }))
  index.value = 0
  picked.value = null
  score.value = 0
  answers.value = []
  newRecord.value = false
  announce.value = ''
  stage.value = 'play'
  focusEl(questionEl)
}

function pick (orig) {
  if (picked.value !== null || !current.value) return
  picked.value = orig
  const ok = orig === current.value.answer
  if (ok) score.value++
  answers.value.push({ q: current.value, picked: orig })
  announce.value = ok
    ? `${c.value.announceOk} ${current.value.explain[lang.value]}`
    : `${c.value.announceKo(current.value.choices[lang.value][current.value.answer])} ${current.value.explain[lang.value]}`
  nextTick(() => nextEl.value?.focus({ preventScroll: true }))
}

function next () {
  if (index.value + 1 < deck.value.length) {
    index.value++
    picked.value = null
    announce.value = ''
    focusEl(questionEl)
  } else {
    finish()
  }
}

function finish () {
  const prev = best.value[themeId.value]
  if (prev == null || score.value > prev) {
    newRecord.value = prev != null || score.value > 0
    best.value = { ...best.value, [themeId.value]: score.value }
    saveBest()
  }
  stage.value = 'end'
  announce.value = c.value.announceEnd(score.value, deck.value.length)
  focusEl(endEl)
}

function quit () {
  stage.value = 'pick'
  themeId.value = null
  announce.value = ''
  nextTick(() => {
    const el = document.getElementById('quiz-pick-title')
    if (el) el.scrollIntoView({ block: 'start', behavior: 'smooth' })
  })
}

function choiceClass (orig) {
  if (picked.value === null) return null
  if (orig === current.value.answer) return 'is-right'
  if (orig === picked.value) return 'is-wrong'
  return 'is-dim'
}

// Clavier : flèches pour circuler entre les réponses, 1-4 pour répondre
function onChoicesKey (e) {
  const buttons = choicesEl.value ? [...choicesEl.value.querySelectorAll('button')] : []
  if (!buttons.length) return
  const n = Number(e.key)
  if (picked.value === null && n >= 1 && n <= buttons.length) {
    e.preventDefault()
    pick(current.value.order[n - 1])
    return
  }
  const i = buttons.indexOf(document.activeElement)
  const rtl = lang.value === 'ar'
  let d = 0
  if (e.key === 'ArrowDown') d = 1
  else if (e.key === 'ArrowUp') d = -1
  else if (e.key === 'ArrowRight') d = rtl ? -1 : 1
  else if (e.key === 'ArrowLeft') d = rtl ? 1 : -1
  else if (e.key === 'Home') { e.preventDefault(); buttons[0].focus(); return }
  else if (e.key === 'End') { e.preventDefault(); buttons[buttons.length - 1].focus(); return }
  if (!d) return
  e.preventDefault()
  const j = i < 0 ? 0 : (i + d + buttons.length) % buttons.length
  buttons[j].focus()
}

// ---------- Résultat ----------
const scoreMessage = computed(() => {
  const n = deck.value.length || 1
  const r = score.value / n
  const m = c.value.messages
  if (r === 1) return m[4]
  if (r >= 0.8) return m[3]
  if (r >= 0.5) return m[2]
  if (r >= 0.3) return m[1]
  return m[0]
})

const scoreTone = computed(() => {
  const r = score.value / (deck.value.length || 1)
  if (r >= 0.8) return 'tile--purple'
  if (r >= 0.5) return 'tile--navy'
  return 'tile--ink'
})

useHead(() => ({
  title: c.value.metaTitle,
  meta: [{ name: 'description', content: c.value.metaDesc }]
}))
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Héros */
.hero { position: relative; overflow: hidden; }
.hero > * { position: relative; }
.watermark {
  position: absolute !important;
  inset-inline-end: -10px;
  top: 18px;
  font-size: clamp(64px, 11vw, 150px);
  line-height: 1;
  color: rgba(255, 255, 255, 0.08);
  pointer-events: none;
  white-space: nowrap;
}
.hero .h-display { overflow-wrap: anywhere; }
.hero-stats { display: flex; flex-wrap: wrap; gap: 12px 32px; }
.hero-stat { display: flex; align-items: baseline; gap: 8px; margin: 0; color: var(--purple-soft); font: 500 15px/1.3 var(--font-body); }
.hero-stat .num { color: var(--white); font-size: clamp(30px, 3vw, 42px); }

/* Choix du thème */
.themes { list-style: none; margin: 0; }
.theme-li { display: flex; }
.theme-card {
  width: 100%;
  min-height: 260px;
  border: 0;
  font: inherit;
  text-align: start;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.theme-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(22, 19, 15, 0.14); }
.theme-card:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; }
.theme-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.theme-glyph { font-size: 26px; line-height: 1; opacity: 0.55; direction: rtl; }
.theme-main { display: flex; flex-direction: column; gap: 10px; }
.theme-title { display: block; }
.theme-desc { font: 400 15px/1.5 var(--font-body); opacity: 0.85; }
.theme-foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px 16px;
  padding-top: 14px;
  border-top: 1px solid currentColor;
  border-top-color: color-mix(in srgb, currentColor 25%, transparent);
}
.best { font: 600 14px/1.3 var(--font-body); }
.go { font: 600 15px/1 var(--font-body); white-space: nowrap; }
.storage-note { margin: 16px 0 0; font: 400 13px/1.5 var(--font-body); color: var(--muted); }

/* Déroulé */
.play { max-width: 920px; margin-inline: auto; }
.play-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 12px 24px; }
.play-count { margin: 4px 0 0; font: 600 16px/1.3 var(--font-body); color: var(--muted); }
.play-side { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.score-chip { background: var(--paper); }
.quit { border: 1.5px solid var(--sand); }

.progress {
  height: 8px;
  margin: 20px 0 28px;
  background: var(--sand);
  border-radius: 999px;
  overflow: hidden;
}
.progress-fill { display: block; height: 100%; background: var(--purple); border-radius: inherit; transition: width 0.35s ease; }

.question { margin: 0 0 24px; outline: none; overflow-wrap: anywhere; }
.question:focus-visible { outline: 2px solid var(--purple); outline-offset: 6px; border-radius: 4px; }

.choices { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.choice {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  min-height: 60px;
  padding: 12px 16px;
  background: var(--white);
  border: 1.5px solid var(--sand);
  border-radius: 16px;
  font: 500 16px/1.35 var(--font-body);
  color: var(--ink);
  text-align: start;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, opacity 0.2s;
}
.choice:hover { border-color: var(--purple); background: var(--paper); }
.choice:focus-visible { outline: 3px solid var(--purple); outline-offset: 2px; }
.choice[aria-disabled="true"] { cursor: default; }
.choice-letter {
  flex: none;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--sand);
  font: 700 15px/1 var(--font-body);
}
.choice-text { flex: 1 1 0; min-width: 0; }
.choice-state { flex-basis: 100%; padding-inline-start: 46px; font: 700 13px/1.2 var(--font-body); }

.choice.is-right { background: var(--olive-soft); border-color: var(--olive); }
.choice.is-right .choice-letter { background: var(--olive); color: var(--white); }
.choice.is-right .choice-state { color: var(--olive); }
.choice.is-wrong { background: var(--terra-soft); border-color: var(--terra); }
.choice.is-wrong .choice-letter { background: var(--terra); color: var(--white); }
.choice.is-wrong .choice-state { color: #8E3720; }
.choice.is-dim { opacity: 0.55; }
.choice.is-right:hover, .choice.is-wrong:hover, .choice.is-dim:hover { border-color: inherit; }

.keys-hint { margin: 14px 0 0; font: 400 13px/1.4 var(--font-body); color: var(--muted); }

.feedback {
  margin-top: 24px;
  padding: clamp(18px, 2.2vw, 26px);
  border-radius: var(--r-md);
  border-inline-start: 5px solid;
}
.feedback--ok { background: var(--olive-soft); border-color: var(--olive); }
.feedback--ko { background: var(--terra-soft); border-color: var(--terra); }
.feedback-title { display: flex; align-items: center; gap: 10px; margin: 0 0 8px; font: 700 19px/1.3 var(--font-display); }
.feedback--ok .feedback-title { color: var(--olive); }
.feedback--ko .feedback-title { color: #8E3720; }
.feedback-ico {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: var(--white);
  font-size: 15px;
}
.feedback--ok .feedback-ico { background: var(--olive); }
.feedback--ko .feedback-ico { background: var(--terra); }
.feedback-text { margin: 0; font: 400 16px/1.55 var(--font-body); color: var(--ink); }
.feedback-actions { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px 20px; margin-top: 18px; }

.read-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  font: 600 15px/1.3 var(--font-body);
  color: var(--purple);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.read-link:hover { color: var(--purple-dark); }

/* Résultat */
.end-score { min-height: 420px; }
.end-title { margin: 6px 0 0; outline: none; }
.end-num { display: flex; align-items: baseline; gap: 10px; margin: 0; }
.end-num .num { font-size: clamp(72px, 9vw, 120px); line-height: 0.9; }
.end-den { font: 600 clamp(24px, 2.6vw, 34px)/1 var(--font-display); opacity: 0.75; }
.end-msg { margin: 0; font: 500 18px/1.45 var(--font-body); }
.end-score .end-msg { color: inherit; }
.end-best { margin: 10px 0 0; font: 500 14px/1.4 var(--font-body); }
.record { display: inline-flex; margin: 12px 0 0; color: var(--ink); }
.end-actions { display: flex; flex-wrap: wrap; gap: 10px; }

.recap-title { margin: 8px 0 18px; }
.recap-list { list-style: none; margin: 0; padding: 0; counter-reset: rc; }
.recap-item { padding: 16px 0; border-top: 1px solid var(--sand); }
.recap-item:first-child { border-top: 1.5px solid var(--ink); }
.recap-q { margin: 0 0 8px; font: 600 16px/1.45 var(--font-body); color: var(--ink); }
.recap-a { margin: 4px 0 0; font: 400 15px/1.45 var(--font-body); }
.recap-lbl { font-weight: 700; }
.recap-a--ko .recap-lbl { color: #8E3720; }
.recap-a--ok .recap-lbl { color: var(--olive); }
.recap .read-link { margin-top: 4px; }

/* À lire aussi */
.more-card { min-height: 220px; }
.more-card .go { margin-top: auto; }

@media (max-width: 960px) {
  .end-score { min-height: 0; }
}

@media (max-width: 640px) {
  .choices { grid-template-columns: minmax(0, 1fr); }
  .theme-card { min-height: 0; }
  .feedback-actions { flex-direction: column; align-items: stretch; }
  .feedback-actions .btn { justify-content: center; }
  .play-side { width: 100%; justify-content: space-between; }
  .watermark { font-size: 64px; }
}

@media (prefers-reduced-motion: reduce) {
  .theme-card:hover { transform: none; }
}
</style>
