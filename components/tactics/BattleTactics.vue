<template>
  <div class="tactics-section">
    <div v-for="battle in battles" :key="battle.name" class="tactic-block">
      <div class="tactic-header">
        <h3>{{ battle.name }}</h3>
        <span class="tactic-date">{{ battle.date }}</span>
      </div>

      <div class="tactic-grid">
        <!-- SVG Diagram -->
        <div class="tactic-diagram">
          <svg :viewBox="battle.viewBox" xmlns="http://www.w3.org/2000/svg">
            <!-- Terrain -->
            <rect v-if="battle.terrain" v-for="t in battle.terrain" :key="t.id"
              :x="t.x" :y="t.y" :width="t.w" :height="t.h"
              :fill="t.fill" :rx="t.rx || 0" :opacity="t.opacity || 1" />
            <!-- Terrain paths (rivers, hills) -->
            <path v-if="battle.terrainPaths" v-for="tp in battle.terrainPaths" :key="tp.id"
              :d="tp.d" :fill="tp.fill || 'none'" :stroke="tp.stroke"
              :stroke-width="tp.strokeWidth || 2" :opacity="tp.opacity || 1" />
            <!-- Carthaginian forces (red) -->
            <g v-for="unit in battle.carthageUnits" :key="unit.id">
              <rect :x="unit.x" :y="unit.y" :width="unit.w" :height="unit.h"
                :fill="unit.fill || '#c62828'" :rx="3" :opacity="0.85"
                :transform="unit.transform || ''" />
              <text :x="unit.x + unit.w/2" :y="unit.y + unit.h/2 + 4"
                text-anchor="middle" fill="white" font-size="10" font-weight="bold">
                {{ unit.label }}
              </text>
            </g>
            <!-- Roman forces (blue) -->
            <g v-for="unit in battle.romeUnits" :key="unit.id">
              <rect :x="unit.x" :y="unit.y" :width="unit.w" :height="unit.h"
                :fill="unit.fill || '#1565c0'" :rx="3" :opacity="0.85"
                :transform="unit.transform || ''" />
              <text :x="unit.x + unit.w/2" :y="unit.y + unit.h/2 + 4"
                text-anchor="middle" fill="white" font-size="10" font-weight="bold">
                {{ unit.label }}
              </text>
            </g>
            <!-- Movement arrows -->
            <defs>
              <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6 Z" fill="#c62828" />
              </marker>
              <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6 Z" fill="#1565c0" />
              </marker>
              <marker id="arrowGold" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6 Z" fill="#c9a84c" />
              </marker>
            </defs>
            <line v-for="arrow in battle.arrows" :key="arrow.id"
              :x1="arrow.x1" :y1="arrow.y1" :x2="arrow.x2" :y2="arrow.y2"
              :stroke="arrow.color" stroke-width="2.5"
              :marker-end="`url(#arrow${arrow.markerColor || 'Red'})`"
              stroke-dasharray="6,3" />
            <!-- Labels -->
            <text v-for="label in battle.labels" :key="label.text"
              :x="label.x" :y="label.y" :fill="label.color || '#333'"
              :font-size="label.size || 11" font-weight="600" :text-anchor="label.anchor || 'middle'">
              {{ label.text }}
            </text>
          </svg>
        </div>

        <!-- Description -->
        <div class="tactic-info">
          <div class="tactic-forces">
            <div class="force carthage-force">
              <h4>Carthage</h4>
              <p>{{ battle.carthageForce }}</p>
            </div>
            <div class="force rome-force">
              <h4>Rome</h4>
              <p>{{ battle.romeForce }}</p>
            </div>
          </div>

          <div class="tactic-phases">
            <div v-for="(phase, i) in battle.phases" :key="i" class="phase">
              <div class="phase-number">{{ i + 1 }}</div>
              <div>
                <h5>{{ phase.title }}</h5>
                <p>{{ phase.desc }}</p>
              </div>
            </div>
          </div>

          <div class="tactic-result">
            <strong>{{ resultLabel }}:</strong> {{ battle.result }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  lang: { type: String, default: 'fr' }
})

const resultLabel = computed(() => {
  return { fr: 'Résultat', en: 'Result', ar: 'النتيجة' }[props.lang] || 'Résultat'
})

const battles = computed(() => {
  const isFr = props.lang === 'fr'
  const isAr = props.lang === 'ar'
  return [
    // CANNAE
    {
      name: isFr ? 'Bataille de Cannes (216 av. J.-C.)' : isAr ? 'معركة كاناي (216 ق.م)' : 'Battle of Cannae (216 BC)',
      date: isFr ? '2 août 216 av. J.-C.' : isAr ? '2 أغسطس 216 ق.م' : 'August 2, 216 BC',
      viewBox: '0 0 400 300',
      terrain: [
        { id: 'field', x: 0, y: 0, w: 400, h: 300, fill: '#e8d8b4', rx: 0 },
      ],
      terrainPaths: [
        { id: 'river', d: 'M0,280 Q100,260 200,275 Q300,290 400,270', stroke: '#4fc3f7', strokeWidth: 8, fill: 'none', opacity: 0.5 },
      ],
      carthageUnits: [
        { id: 'c-center', x: 150, y: 30, w: 100, h: 25, label: isFr ? 'Inf. Gauloise' : 'Gaul Inf.' },
        { id: 'c-left-cav', x: 30, y: 60, w: 50, h: 70, fill: '#8e0000', label: isFr ? 'Cav.' : 'Cav.' },
        { id: 'c-right-cav', x: 320, y: 60, w: 50, h: 70, fill: '#8e0000', label: 'Num.' },
        { id: 'c-left-inf', x: 90, y: 30, w: 55, h: 25, fill: '#d32f2f', label: isFr ? 'Libyens' : 'Libyans' },
        { id: 'c-right-inf', x: 255, y: 30, w: 55, h: 25, fill: '#d32f2f', label: isFr ? 'Libyens' : 'Libyans' },
      ],
      romeUnits: [
        { id: 'r-center', x: 130, y: 140, w: 140, h: 60, label: isFr ? 'Légions romaines' : 'Roman Legions' },
        { id: 'r-left-cav', x: 30, y: 160, w: 50, h: 50, fill: '#0d47a1', label: 'Cav.' },
        { id: 'r-right-cav', x: 320, y: 160, w: 50, h: 50, fill: '#0d47a1', label: 'Cav.' },
      ],
      arrows: [
        // Center retreats (lure)
        { id: 'a1', x1: 200, y1: 55, x2: 200, y2: 130, color: '#c62828', markerColor: 'Red' },
        // Wings close in
        { id: 'a2', x1: 115, y1: 45, x2: 115, y2: 140, color: '#c62828', markerColor: 'Red' },
        { id: 'a3', x1: 285, y1: 45, x2: 285, y2: 140, color: '#c62828', markerColor: 'Red' },
        // Cavalry envelop
        { id: 'a4', x1: 55, y1: 130, x2: 55, y2: 220, color: '#c62828', markerColor: 'Red' },
        { id: 'a5', x1: 345, y1: 130, x2: 345, y2: 220, color: '#c62828', markerColor: 'Red' },
        { id: 'a6', x1: 55, y1: 220, x2: 160, y2: 220, color: '#c9a84c', markerColor: 'Gold' },
        { id: 'a7', x1: 345, y1: 220, x2: 260, y2: 220, color: '#c9a84c', markerColor: 'Gold' },
      ],
      labels: [
        { text: isFr ? 'Rivière Aufidus' : isAr ? 'نهر أوفيدوس' : 'Aufidus River', x: 200, y: 268, color: '#1565c0', size: 10 },
        { text: isFr ? '← Double enveloppement →' : isAr ? '← تطويق مزدوج →' : '← Double envelopment →', x: 200, y: 250, color: '#c62828', size: 11 },
      ],
      carthageForce: isFr ? '~50 000 hommes : infanterie gauloise et espagnole au centre, infanterie lourde libyenne sur les ailes, cavalerie numide et espagnole' : isAr ? '~50,000 رجل: مشاة غالية وإسبانية في الوسط، مشاة ليبية ثقيلة على الأجنحة، فرسان نوميديون وإسبان' : '~50,000 men: Gallic and Spanish infantry center, Libyan heavy infantry on wings, Numidian and Spanish cavalry',
      romeForce: isFr ? '~86 000 hommes : 16 légions romaines massées au centre, cavalerie sur les ailes' : isAr ? '~86,000 رجل: 16 فيلقاً رومانياً في الوسط، فرسان على الأجنحة' : '~86,000 men: 16 Roman legions massed in center, cavalry on wings',
      phases: [
        {
          title: isFr ? 'Le piège du centre' : isAr ? 'فخ الوسط' : 'The center trap',
          desc: isFr ? 'Hannibal dispose son infanterie gauloise et espagnole au centre en formation convexe (bombée vers l\'ennemi). Cette ligne faible est conçue pour reculer sous la pression romaine.' : isAr ? 'يرتب حنبعل مشاته الغالية والإسبانية في الوسط بتشكيل محدب. هذا الخط الضعيف مصمم للتراجع تحت الضغط الروماني.' : 'Hannibal places his Gallic and Spanish infantry in a convex formation. This weak line is designed to fall back under Roman pressure.',
        },
        {
          title: isFr ? 'L\'infanterie libyenne ferme le piège' : isAr ? 'المشاة الليبيون يغلقون المصيدة' : 'Libyan infantry closes the trap',
          desc: isFr ? 'Quand le centre recule, les Romains s\'enfoncent. Les deux blocs d\'infanterie lourde libyenne, restés en place sur les flancs, pivotent et attaquent les Romains de côté.' : isAr ? 'عندما يتراجع الوسط، يتقدم الرومان. كتلتا المشاة الليبيين الثقيلين على الجانبين تدوران وتهاجمان الرومان من الجنب.' : 'As the center falls back, Romans push forward. The two Libyan heavy infantry blocks on the flanks pivot inward and attack the Roman sides.',
        },
        {
          title: isFr ? 'La cavalerie complète l\'encerclement' : isAr ? 'الفرسان يكملون التطويق' : 'Cavalry completes encirclement',
          desc: isFr ? 'La cavalerie carthaginoise disperse la cavalerie romaine puis revient charger l\'arrière de l\'infanterie romaine. L\'encerclement est total : 50 000 à 70 000 Romains périssent.' : isAr ? 'الفرسان القرطاجيون يشتتون الفرسان الرومان ثم يعودون لمهاجمة مؤخرة المشاة الرومان. التطويق كامل: 50,000 إلى 70,000 روماني يُقتلون.' : 'Carthaginian cavalry routs Roman cavalry then charges the Roman infantry rear. Encirclement is total: 50,000–70,000 Romans perish.',
        },
      ],
      result: isFr ? 'Victoire totale carthaginoise. La plus grande défaite de l\'histoire de Rome. 80 sénateurs tués. La manœuvre de double enveloppement est encore le modèle de référence dans les académies militaires.' : isAr ? 'نصر قرطاجي ساحق. أكبر هزيمة في تاريخ روما. 80 عضواً في مجلس الشيوخ قُتلوا. مناورة التطويق المزدوج لا تزال المرجع في الأكاديميات العسكرية.' : 'Total Carthaginian victory. Rome\'s greatest defeat. 80 senators killed. The double envelopment maneuver is still the reference model in military academies.',
    },
    // LAKE TRASIMENE
    {
      name: isFr ? 'Bataille du Lac Trasimène (217 av. J.-C.)' : isAr ? 'معركة بحيرة تراسيمين (217 ق.م)' : 'Battle of Lake Trasimene (217 BC)',
      date: isFr ? '21 juin 217 av. J.-C.' : isAr ? '21 يونيو 217 ق.م' : 'June 21, 217 BC',
      viewBox: '0 0 400 280',
      terrain: [
        { id: 'ground', x: 0, y: 0, w: 400, h: 280, fill: '#c8b88a' },
        { id: 'lake', x: 0, y: 160, w: 400, h: 120, fill: '#64b5f6', rx: 0 },
        { id: 'hills1', x: 0, y: 0, w: 400, h: 50, fill: '#8d6e47', rx: 20 },
      ],
      terrainPaths: [
        { id: 'hill-line', d: 'M0,50 Q50,30 100,50 Q150,70 200,40 Q250,20 300,55 Q350,70 400,45', stroke: '#6d4c2a', strokeWidth: 3, fill: 'none' },
      ],
      carthageUnits: [
        { id: 'c-ambush1', x: 30, y: 55, w: 80, h: 20, label: isFr ? 'Embuscade' : isAr ? 'كمين' : 'Ambush' },
        { id: 'c-ambush2', x: 150, y: 55, w: 80, h: 20, label: isFr ? 'Embuscade' : isAr ? 'كمين' : 'Ambush' },
        { id: 'c-ambush3', x: 270, y: 55, w: 80, h: 20, label: isFr ? 'Embuscade' : isAr ? 'كمين' : 'Ambush' },
        { id: 'c-block', x: 330, y: 90, w: 50, h: 40, fill: '#8e0000', label: isFr ? 'Bloc' : 'Block' },
      ],
      romeUnits: [
        { id: 'r-column', x: 20, y: 100, w: 300, h: 30, label: isFr ? 'Colonne romaine de Flaminius (en marche)' : isAr ? 'عمود فلامينيوس الروماني (في مسيرة)' : 'Roman column of Flaminius (marching)' },
      ],
      arrows: [
        { id: 'a1', x1: 70, y1: 75, x2: 70, y2: 95, color: '#c62828', markerColor: 'Red' },
        { id: 'a2', x1: 190, y1: 75, x2: 190, y2: 95, color: '#c62828', markerColor: 'Red' },
        { id: 'a3', x1: 310, y1: 75, x2: 310, y2: 95, color: '#c62828', markerColor: 'Red' },
        { id: 'a4', x1: 355, y1: 90, x2: 325, y2: 100, color: '#c62828', markerColor: 'Red' },
      ],
      labels: [
        { text: isFr ? 'Lac Trasimène' : isAr ? 'بحيرة تراسيمين' : 'Lake Trasimene', x: 200, y: 220, color: '#1565c0', size: 14 },
        { text: isFr ? 'Collines' : isAr ? 'تلال' : 'Hills', x: 200, y: 25, color: '#4e342e', size: 11 },
        { text: isFr ? '↓ Attaque surprise de 3 côtés ↓' : isAr ? '↓ هجوم مفاجئ من 3 جهات ↓' : '↓ Surprise attack from 3 sides ↓', x: 200, y: 150, color: '#c62828', size: 10 },
      ],
      carthageForce: isFr ? '~55 000 hommes cachés dans les collines et le brouillard matinal' : isAr ? '~55,000 رجل مختبئين في التلال وضباب الصباح' : '~55,000 men hidden in the hills and morning fog',
      romeForce: isFr ? '~30 000 légionnaires sous le consul Flaminius, en colonne de marche (non déployés pour le combat)' : isAr ? '~30,000 جندي روماني تحت القنصل فلامينيوس، في عمود مسيرة (غير منتشرين للقتال)' : '~30,000 legionaries under consul Flaminius, marching in column (not deployed for battle)',
      phases: [
        {
          title: isFr ? 'Le piège du défilé' : isAr ? 'فخ المضيق' : 'The defile trap',
          desc: isFr ? 'Hannibal attire Flaminius dans un défilé étroit entre le lac et les collines. Un brouillard dense couvre le terrain. L\'armée romaine marche en colonne, incapable de se déployer.' : isAr ? 'يستدرج حنبعل فلامينيوس إلى مضيق ضيق بين البحيرة والتلال. ضباب كثيف يغطي الأرض. الجيش الروماني يسير في عمود، غير قادر على الانتشار.' : 'Hannibal lures Flaminius into a narrow defile between the lake and hills. Dense fog covers the terrain. The Roman army marches in column, unable to deploy.',
        },
        {
          title: isFr ? 'L\'embuscade simultanée' : isAr ? 'الكمين المتزامن' : 'Simultaneous ambush',
          desc: isFr ? 'Les forces carthaginoises attaquent simultanément depuis les collines sur toute la longueur de la colonne romaine. Les Romains, surpris et compressés entre le lac et les assaillants, ne peuvent former leurs lignes.' : isAr ? 'القوات القرطاجية تهاجم في وقت واحد من التلال على طول العمود الروماني. الرومان، مفاجؤون ومحشورون بين البحيرة والمهاجمين، لا يستطيعون تشكيل صفوفهم.' : 'Carthaginian forces attack simultaneously from the hills along the entire Roman column. Caught between the lake and attackers, Romans cannot form battle lines.',
        },
        {
          title: isFr ? 'La destruction totale' : isAr ? 'التدمير الكامل' : 'Total destruction',
          desc: isFr ? 'En 3 heures, 15 000 Romains sont tués, dont le consul Flaminius. 6 000 sont capturés. Beaucoup se noient dans le lac en tentant de fuir. C\'est la plus grande embuscade de l\'histoire militaire.' : isAr ? 'في 3 ساعات، يُقتل 15,000 روماني بمن فيهم القنصل فلامينيوس. 6,000 يُأسرون. كثيرون يغرقون في البحيرة محاولين الفرار. إنه أكبر كمين في التاريخ العسكري.' : 'In 3 hours, 15,000 Romans are killed including consul Flaminius. 6,000 captured. Many drown in the lake fleeing. The greatest ambush in military history.',
        },
      ],
      result: isFr ? 'Victoire écrasante. Rome perd un consul et une armée entière. Le Sénat nomme Fabius Maximus dictateur avec sa stratégie d\'évitement (« Fabius Cunctator »).' : isAr ? 'نصر ساحق. تفقد روما قنصلاً وجيشاً بأكمله. يعين مجلس الشيوخ فابيوس ماكسيموس ديكتاتوراً باستراتيجية التجنب.' : 'Crushing victory. Rome loses a consul and an entire army. The Senate appoints Fabius Maximus dictator with his avoidance strategy.',
    },
    // ZAMA
    {
      name: isFr ? 'Bataille de Zama (202 av. J.-C.)' : isAr ? 'معركة زاما (202 ق.م)' : 'Battle of Zama (202 BC)',
      date: isFr ? 'Octobre 202 av. J.-C.' : isAr ? 'أكتوبر 202 ق.م' : 'October 202 BC',
      viewBox: '0 0 400 280',
      terrain: [
        { id: 'field', x: 0, y: 0, w: 400, h: 280, fill: '#d4c098' },
      ],
      terrainPaths: [],
      carthageUnits: [
        { id: 'c-elephants', x: 100, y: 20, w: 200, h: 20, fill: '#795548', label: isFr ? '🐘 80 Éléphants 🐘' : isAr ? '🐘 80 فيلاً 🐘' : '🐘 80 Elephants 🐘' },
        { id: 'c-line1', x: 80, y: 50, w: 240, h: 20, label: isFr ? 'Mercenaires gaulois & ligures' : 'Gallic mercenaries' },
        { id: 'c-line2', x: 100, y: 80, w: 200, h: 20, fill: '#d32f2f', label: isFr ? 'Levées carthaginoises' : 'Carthaginian levies' },
        { id: 'c-line3', x: 120, y: 110, w: 160, h: 25, fill: '#8e0000', label: isFr ? 'Vétérans d\'Hannibal' : isAr ? 'محاربو حنبعل القدامى' : 'Hannibal\'s veterans' },
      ],
      romeUnits: [
        { id: 'r-line1', x: 80, y: 180, w: 240, h: 25, label: isFr ? 'Hastati (ligne 1)' : 'Hastati (line 1)' },
        { id: 'r-line2', x: 100, y: 215, w: 200, h: 25, fill: '#0d47a1', label: isFr ? 'Principes (ligne 2)' : 'Principes (line 2)' },
        { id: 'r-line3', x: 120, y: 250, w: 160, h: 20, fill: '#1a237e', label: isFr ? 'Triarii (réserve)' : 'Triarii (reserve)' },
        { id: 'r-cav-l', x: 20, y: 200, w: 40, h: 50, fill: '#0d47a1', label: 'Cav.' },
        { id: 'r-cav-r', x: 340, y: 200, w: 40, h: 50, fill: '#e65100', label: 'Num.' },
      ],
      arrows: [
        { id: 'a1', x1: 200, y1: 40, x2: 200, y2: 170, color: '#795548', markerColor: 'Red' },
        { id: 'a2', x1: 40, y1: 200, x2: 40, y2: 50, color: '#1565c0', markerColor: 'Blue' },
        { id: 'a3', x1: 360, y1: 200, x2: 360, y2: 50, color: '#e65100', markerColor: 'Gold' },
        { id: 'a4', x1: 40, y1: 50, x2: 120, y2: 120, color: '#c9a84c', markerColor: 'Gold' },
        { id: 'a5', x1: 360, y1: 50, x2: 280, y2: 120, color: '#c9a84c', markerColor: 'Gold' },
      ],
      labels: [
        { text: isFr ? 'Éléphants neutralisés par les couloirs' : isAr ? 'الفيلة تُحيَّد بالممرات' : 'Elephants neutralized by lanes', x: 200, y: 160, color: '#795548', size: 9 },
        { text: 'Scipion', x: 200, y: 270, color: '#1565c0', size: 10 },
        { text: 'Hannibal', x: 200, y: 15, color: '#c62828', size: 10 },
      ],
      carthageForce: isFr ? '~36 000 fantassins, 4 000 cavaliers, 80 éléphants. Armée hétérogène avec des mercenaires, des recrues et les vétérans d\'Italie en réserve.' : isAr ? '~36,000 مشاة، 4,000 فارس، 80 فيلاً. جيش غير متجانس من مرتزقة ومجندين وقدامى المحاربين من إيطاليا في الاحتياط.' : '~36,000 infantry, 4,000 cavalry, 80 elephants. Heterogeneous army with mercenaries, recruits, and Italian veterans in reserve.',
      romeForce: isFr ? '~34 000 fantassins, 8 700 cavaliers (dont cavalerie numide de Massinissa). Légions expérimentées et cavalerie supérieure.' : isAr ? '~34,000 مشاة، 8,700 فارس (بما فيها فرسان ماسينيسا النوميديين). فيالق مجربة وفرسان متفوقون.' : '~34,000 infantry, 8,700 cavalry (including Masinissa\'s Numidian cavalry). Experienced legions and superior cavalry.',
      phases: [
        {
          title: isFr ? 'Neutralisation des éléphants' : isAr ? 'تحييد الفيلة' : 'Neutralizing the elephants',
          desc: isFr ? 'Scipion ouvre des couloirs dans ses lignes. Les éléphants, affolés par les trompettes romaines, passent sans faire de dégâts ou se retournent contre les Carthaginois. La tactique habituelle de Carthage est neutralisée.' : isAr ? 'يفتح سكيبيو ممرات في صفوفه. الفيلة، المذعورة من الأبواق الرومانية، تمر دون أضرار أو تنقلب على القرطاجيين. تكتيك قرطاج المعتاد يُحيَّد.' : 'Scipio opens lanes in his lines. Elephants, panicked by Roman trumpets, pass harmlessly or turn on Carthaginians.',
        },
        {
          title: isFr ? 'Combat d\'infanterie frontal' : isAr ? 'قتال المشاة الأمامي' : 'Frontal infantry combat',
          desc: isFr ? 'Les deux premières lignes carthaginoises (mercenaires puis recrues) sont repoussées. Les vétérans d\'Hannibal tiennent et le combat d\'infanterie est acharné et indécis.' : isAr ? 'الخطان الأولان القرطاجيان (المرتزقة ثم المجندون) يُدفعان للخلف. قدامى محاربي حنبعل يصمدون والقتال يحتدم.' : 'First two Carthaginian lines are pushed back. Hannibal\'s veterans hold firm in fierce, indecisive infantry combat.',
        },
        {
          title: isFr ? 'La cavalerie décide la bataille' : isAr ? 'الفرسان يحسمون المعركة' : 'Cavalry decides the battle',
          desc: isFr ? 'La cavalerie romaine et numide de Massinissa, après avoir dispersé la cavalerie carthaginoise, revient charger l\'arrière d\'Hannibal — la même tactique que Cannes, mais retournée contre lui. Hannibal est vaincu.' : isAr ? 'فرسان روما وماسينيسا النوميديون، بعد تشتيت الفرسان القرطاجيين، يعودون لمهاجمة مؤخرة حنبعل — نفس تكتيك كاناي، لكن مقلوباً ضده. يُهزم حنبعل.' : 'Roman and Numidian cavalry, after routing Carthaginian cavalry, charges Hannibal\'s rear — the same Cannae tactic turned against him.',
        },
      ],
      result: isFr ? 'Victoire romaine décisive. Carthage perd la guerre et doit accepter des conditions de paix sévères. Hannibal reconnaît la défaite et conseille au Sénat d\'accepter. C\'est la seule grande défaite de sa carrière.' : isAr ? 'نصر روماني حاسم. تخسر قرطاج الحرب وتقبل شروط سلام قاسية. يعترف حنبعل بالهزيمة وينصح مجلس الشيوخ بالقبول. إنها الهزيمة الكبرى الوحيدة في مسيرته.' : 'Decisive Roman victory. Carthage loses the war and accepts severe peace terms. Hannibal acknowledges defeat. His only major defeat.',
    },
  ]
})
</script>

<style scoped>
.tactic-block {
  margin-bottom: 4rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.tactic-header {
  background: linear-gradient(135deg, var(--color-burgundy-dark), var(--color-navy));
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tactic-header h3 {
  color: var(--color-gold);
  font-size: 1.3rem;
}

.tactic-date {
  color: var(--color-gold-light);
  font-family: var(--font-heading);
  font-size: 0.85rem;
}

.tactic-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.tactic-diagram {
  padding: 1.5rem;
  background: #f5f0e0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tactic-diagram svg {
  width: 100%;
  max-width: 420px;
}

.tactic-info {
  padding: 1.5rem 2rem;
}

.tactic-forces {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.force {
  padding: 0.8rem;
  border-radius: 8px;
}

.carthage-force {
  background: #fce4ec;
  border-left: 3px solid #c62828;
}

.rome-force {
  background: #e3f2fd;
  border-left: 3px solid #1565c0;
}

:global([dir="rtl"]) .carthage-force,
:global([dir="rtl"]) .rome-force {
  border-left: none;
  border-right: 3px solid;
}

:global([dir="rtl"]) .carthage-force { border-right-color: #c62828; }
:global([dir="rtl"]) .rome-force { border-right-color: #1565c0; }

.force h4 {
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
}

.carthage-force h4 { color: #c62828; }
.rome-force h4 { color: #1565c0; }

.force p {
  font-size: 0.8rem;
  color: #555;
  line-height: 1.5;
}

.tactic-phases {
  margin-bottom: 1.5rem;
}

.phase {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
  align-items: flex-start;
}

.phase-number {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  background: var(--color-gold);
  color: var(--color-navy);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.85rem;
}

.phase h5 {
  font-size: 0.9rem;
  color: var(--color-navy);
  margin-bottom: 0.2rem;
}

.phase p {
  font-size: 0.82rem;
  color: #555;
  line-height: 1.6;
}

.tactic-result {
  padding: 1rem;
  background: var(--color-sand);
  border-radius: 8px;
  font-size: 0.85rem;
  color: #444;
  line-height: 1.6;
  border-left: 3px solid var(--color-gold);
}

:global([dir="rtl"]) .tactic-result {
  border-left: none;
  border-right: 3px solid var(--color-gold);
}

@media (max-width: 768px) {
  .tactic-grid {
    grid-template-columns: 1fr;
  }

  .tactic-forces {
    grid-template-columns: 1fr;
  }
}
</style>
