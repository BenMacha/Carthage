<template>
  <div class="map-wrapper">
    <div class="map-controls">
      <button
        v-for="period in periods"
        :key="period.id"
        class="map-period-btn"
        :class="{ active: activePeriod === period.id }"
        @click="setPeriod(period.id)"
      >
        {{ period.label }}
      </button>
    </div>
    <div ref="mapContainer" class="map-container"></div>
    <div class="map-legend">
      <div class="legend-item" v-for="item in legendItems" :key="item.label">
        <span class="legend-color" :style="{ background: item.color }"></span>
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  lang: { type: String, default: 'fr' }
})

const mapContainer = ref(null)
const activePeriod = ref('golden')
let map = null
let layerGroup = null

const labels = computed(() => {
  const l = {
    fr: {
      golden: 'Âge d\'or (Ve s.)',
      punic: 'Guerres Puniques',
      hannibal: 'Route d\'Hannibal',
      territory: 'Territoire carthaginois',
      allies: 'Alliés / Vassaux',
      tradeRoute: 'Routes commerciales',
      hannibalRoute: 'Marche d\'Hannibal',
      cities: 'Villes principales',
      battles: 'Batailles',
      farms: 'Zones agricoles',
      industry: 'Ateliers / Industrie',
      mines: 'Mines',
    },
    en: {
      golden: 'Golden Age (5th c.)',
      punic: 'Punic Wars',
      hannibal: 'Hannibal\'s Route',
      territory: 'Carthaginian territory',
      allies: 'Allies / Vassals',
      tradeRoute: 'Trade routes',
      hannibalRoute: 'Hannibal\'s march',
      cities: 'Main cities',
      battles: 'Battles',
      farms: 'Agricultural zones',
      industry: 'Workshops / Industry',
      mines: 'Mines',
    },
    ar: {
      golden: 'العصر الذهبي (القرن الخامس)',
      punic: 'الحروب البونية',
      hannibal: 'مسار حنبعل',
      territory: 'الأراضي القرطاجية',
      allies: 'الحلفاء / الأتباع',
      tradeRoute: 'طرق التجارة',
      hannibalRoute: 'مسيرة حنبعل',
      cities: 'المدن الرئيسية',
      battles: 'المعارك',
      farms: 'المناطق الزراعية',
      industry: 'الورش / الصناعة',
      mines: 'المناجم',
    }
  }
  return l[props.lang] || l.fr
})

const periods = computed(() => [
  { id: 'golden', label: labels.value.golden },
  { id: 'punic', label: labels.value.punic },
  { id: 'hannibal', label: labels.value.hannibal },
])

const legendItems = computed(() => [
  { color: '#c62828', label: labels.value.territory },
  { color: '#e65100', label: labels.value.allies },
  { color: '#1565c0', label: labels.value.tradeRoute },
  { color: '#c9a84c', label: labels.value.cities },
  { color: '#2e7d32', label: labels.value.farms },
  { color: '#6a1b9a', label: labels.value.industry },
])

// Major Carthaginian cities
const cities = [
  { name: 'Carthage', lat: 36.8528, lng: 10.3233, desc: 'Capitale / العاصمة', type: 'capital' },
  { name: 'Utique', lat: 37.0608, lng: 10.0597, desc: 'Port ancien', type: 'city' },
  { name: 'Hadrumète (Sousse)', lat: 35.8256, lng: 10.6369, desc: 'Port commercial', type: 'city' },
  { name: 'Thapsus', lat: 35.6, lng: 11.05, desc: 'Port', type: 'city' },
  { name: 'Leptis Minor', lat: 35.67, lng: 10.88, desc: 'Comptoir', type: 'city' },
  { name: 'Kerkouane', lat: 36.945, lng: 11.1, desc: 'Cité punique préservée (UNESCO)', type: 'city' },
  { name: 'Dougga (Thugga)', lat: 36.4225, lng: 9.2194, desc: 'Ville intérieure / مدينة داخلية', type: 'city' },
  { name: 'Carthagène (Qart Hadasht)', lat: 37.6, lng: -0.98, desc: 'Fondée par Hasdrubal', type: 'colony' },
  { name: 'Gadès (Cadix)', lat: 36.527, lng: -6.293, desc: 'Comptoir phénicien', type: 'colony' },
  { name: 'Ibiza (Ibossim)', lat: 38.908, lng: 1.432, desc: 'Île carthaginoise', type: 'colony' },
  { name: 'Palerme (Panormus)', lat: 38.116, lng: 13.361, desc: 'Sicile occidentale', type: 'colony' },
  { name: 'Lilybée (Marsala)', lat: 37.798, lng: 12.434, desc: 'Forteresse de Sicile', type: 'colony' },
  { name: 'Cagliari (Karalis)', lat: 39.224, lng: 9.122, desc: 'Sardaigne', type: 'colony' },
  { name: 'Lixus', lat: 35.194, lng: -6.114, desc: 'Comptoir au Maroc', type: 'colony' },
  { name: 'Mogador (Essaouira)', lat: 31.513, lng: -9.77, desc: 'Comptoir atlantique', type: 'colony' },
  { name: 'Tipasa', lat: 36.59, lng: 2.45, desc: 'Comptoir en Algérie', type: 'colony' },
  { name: 'Hippo Regius (Annaba)', lat: 36.9, lng: 7.766, desc: 'Port de Numidie', type: 'colony' },
]

// Battles
const battles = [
  { name: 'Cannes (216)', lat: 41.305, lng: 16.132, desc: 'Chef-d\'œuvre tactique d\'Hannibal' },
  { name: 'Lac Trasimène (217)', lat: 43.1, lng: 12.1, desc: 'Plus grande embuscade de l\'Antiquité' },
  { name: 'Trébie (218)', lat: 44.95, lng: 9.6, desc: 'Première grande victoire en Italie' },
  { name: 'Zama (202)', lat: 36.28, lng: 8.38, desc: 'Défaite finale d\'Hannibal' },
  { name: 'Tessin (218)', lat: 45.19, lng: 9.16, desc: 'Victoire de cavalerie' },
  { name: 'Himère (480)', lat: 37.97, lng: 13.82, desc: 'Défaite face aux Grecs' },
  { name: 'Métaure (207)', lat: 43.73, lng: 13.16, desc: 'Mort d\'Hasdrubal' },
]

// Agricultural & industrial zones
const farms = [
  { name: 'Cap Bon', lat: 36.8, lng: 10.8, desc: 'Vignobles et oliviers / كروم وزيتون' },
  { name: 'Vallée de la Medjerda', lat: 36.5, lng: 9.5, desc: 'Grenier à blé / مخزن القمح' },
  { name: 'Byzacène', lat: 35.5, lng: 10.2, desc: 'Grande zone céréalière' },
  { name: 'Sahel tunisien', lat: 35.8, lng: 10.5, desc: 'Oliviers / أشجار الزيتون' },
]

const industries = [
  { name: 'Port de Carthage (Cothon)', lat: 36.85, lng: 10.32, desc: 'Chantier naval / حوض بناء السفن' },
  { name: 'Ateliers de pourpre', lat: 36.84, lng: 10.34, desc: 'Teinture de murex / صبغة الأرجوان' },
  { name: 'Mines de Carthagène', lat: 37.61, lng: -0.99, desc: '300 kg d\'argent/jour (Polybe)' },
  { name: 'Mines de Sierra Morena', lat: 38.2, lng: -3.8, desc: 'Or et cuivre / ذهب ونحاس' },
]

// Hannibal's route
const hannibalRoute = [
  [37.6, -0.98],   // Carthagène
  [39.5, -0.5],    // Côte est Espagne
  [41.4, 2.17],    // Barcelone
  [42.5, 2.9],     // Pyrénées
  [43.3, 3.5],     // Sud Gaule
  [43.8, 4.4],     // Rhône
  [44.5, 5.5],     // Pré-Alpes
  [45.0, 6.7],     // Alpes
  [45.5, 7.3],     // Col alpin
  [45.07, 7.68],   // Turin (Plaine du Pô)
  [44.95, 9.6],    // Trébie
  [43.1, 12.1],    // Lac Trasimène
  [41.305, 16.132], // Cannes
]

// Carthaginian territory polygon (approximate)
const carthageTerritory = [
  [37.5, 9.0], [37.5, 11.5], [36.5, 11.5], [35.0, 11.2],
  [34.0, 10.5], [33.5, 9.0], [33.5, 8.0], [34.5, 7.5],
  [35.5, 7.0], [36.5, 8.0], [37.0, 8.5], [37.5, 9.0],
]

const spainTerritory = [
  [36.0, -7.0], [36.0, -1.5], [37.0, -1.0], [39.0, -0.5],
  [40.5, 0.0], [41.5, 2.0], [40.0, 3.0], [38.0, 1.5],
  [37.5, -1.0], [37.0, -5.0], [36.5, -6.5], [36.0, -7.0],
]

const sicilyTerritory = [
  [38.2, 12.3], [38.1, 13.0], [37.8, 12.4], [37.5, 12.5],
  [37.5, 13.0], [37.0, 12.8], [37.5, 12.0], [38.0, 12.0], [38.2, 12.3],
]

const sardiniaTerritory = [
  [41.3, 8.1], [41.3, 9.8], [40.0, 9.8], [38.8, 9.5],
  [38.8, 8.3], [39.5, 8.1], [40.5, 8.0], [41.3, 8.1],
]

// Trade routes
const tradeRoutes = [
  { coords: [[36.85, 10.32], [37.8, 12.4], [38.1, 13.4], [37.5, 15.1]], name: 'Carthage → Sicile → Syracuse' },
  { coords: [[36.85, 10.32], [39.2, 9.1], [41.9, 8.9]], name: 'Carthage → Sardaigne → Corse' },
  { coords: [[36.85, 10.32], [37.6, -0.98], [36.5, -6.3]], name: 'Carthage → Espagne → Gadès' },
  { coords: [[36.85, 10.32], [35.2, -6.1], [31.5, -9.8]], name: 'Carthage → Maroc → Mogador' },
  { coords: [[36.85, 10.32], [32.9, 13.1], [31.2, 29.9]], name: 'Carthage → Libye → Égypte' },
  { coords: [[36.5, -6.3], [48.8, -3.5], [50.3, -5.0]], name: 'Gadès → Bretagne (Étain)' },
]

const setPeriod = (id: string) => {
  activePeriod.value = id
  renderMap()
}

const renderMap = () => {
  if (!map || !layerGroup || typeof window === 'undefined' || !window.L) return
  layerGroup.clearLayers()
  const L = window.L

  // Territory polygons
  if (activePeriod.value === 'golden' || activePeriod.value === 'punic') {
    // Core territory
    L.polygon(carthageTerritory, {
      color: '#c62828', fillColor: '#c62828', fillOpacity: 0.2, weight: 2
    }).addTo(layerGroup).bindPopup('<b>Africa / إفريقيا</b><br>Cœur du territoire carthaginois')

    // Sicily
    L.polygon(sicilyTerritory, {
      color: '#e65100', fillColor: '#e65100', fillOpacity: 0.15, weight: 2, dashArray: '5,5'
    }).addTo(layerGroup).bindPopup('<b>Sicile occidentale</b><br>Zone d\'influence')

    // Sardinia
    L.polygon(sardiniaTerritory, {
      color: '#e65100', fillColor: '#e65100', fillOpacity: 0.15, weight: 2, dashArray: '5,5'
    }).addTo(layerGroup).bindPopup('<b>Sardaigne</b><br>Colonie carthaginoise')
  }

  if (activePeriod.value === 'punic' || activePeriod.value === 'hannibal') {
    // Spain
    L.polygon(spainTerritory, {
      color: '#c62828', fillColor: '#c62828', fillOpacity: 0.15, weight: 2
    }).addTo(layerGroup).bindPopup('<b>Hispanie Barcide</b><br>Territoire conquis par Hamilcar et Hannibal')
  }

  // Trade routes
  if (activePeriod.value !== 'hannibal') {
    tradeRoutes.forEach(route => {
      L.polyline(route.coords, {
        color: '#1565c0', weight: 2, dashArray: '8,6', opacity: 0.7
      }).addTo(layerGroup).bindPopup(`<b>${route.name}</b>`)
    })
  }

  // Hannibal's route
  if (activePeriod.value === 'hannibal') {
    L.polyline(hannibalRoute, {
      color: '#c9a84c', weight: 4, opacity: 0.9
    }).addTo(layerGroup).bindPopup('<b>Route d\'Hannibal (218 av. J.-C.)</b><br>مسيرة حنبعل')

    // Arrow markers along route
    for (let i = 1; i < hannibalRoute.length; i++) {
      L.circleMarker(hannibalRoute[i], {
        radius: 4, color: '#c9a84c', fillColor: '#c9a84c', fillOpacity: 1
      }).addTo(layerGroup)
    }

    // Battles
    battles.forEach(b => {
      L.circleMarker([b.lat, b.lng], {
        radius: 8, color: '#c62828', fillColor: '#c62828', fillOpacity: 0.8, weight: 2
      }).addTo(layerGroup).bindPopup(`<b>⚔️ ${b.name}</b><br>${b.desc}`)
    })
  }

  // Cities
  cities.forEach(c => {
    const color = c.type === 'capital' ? '#c9a84c' : c.type === 'colony' ? '#e65100' : '#6b1d2a'
    const radius = c.type === 'capital' ? 8 : 5
    L.circleMarker([c.lat, c.lng], {
      radius, color, fillColor: color, fillOpacity: 0.8, weight: 2
    }).addTo(layerGroup).bindPopup(`<b>${c.name}</b><br>${c.desc}`)

    if (c.type === 'capital') {
      L.marker([c.lat, c.lng]).addTo(layerGroup).bindPopup(`<b>🏛️ ${c.name}</b><br>${c.desc}`)
    }
  })

  // Agricultural zones
  if (activePeriod.value === 'golden') {
    farms.forEach(f => {
      L.circleMarker([f.lat, f.lng], {
        radius: 12, color: '#2e7d32', fillColor: '#2e7d32', fillOpacity: 0.15, weight: 2
      }).addTo(layerGroup).bindPopup(`<b>🌾 ${f.name}</b><br>${f.desc}`)
    })

    industries.forEach(ind => {
      L.circleMarker([ind.lat, ind.lng], {
        radius: 7, color: '#6a1b9a', fillColor: '#6a1b9a', fillOpacity: 0.7, weight: 2
      }).addTo(layerGroup).bindPopup(`<b>🏭 ${ind.name}</b><br>${ind.desc}`)
    })
  }
}

onMounted(() => {
  const checkLeaflet = setInterval(() => {
    if (typeof window !== 'undefined' && window.L && mapContainer.value) {
      clearInterval(checkLeaflet)
      const L = window.L
      map = L.map(mapContainer.value, {
        center: [38, 5],
        zoom: 4,
        minZoom: 3,
        maxZoom: 10,
      })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      }).addTo(map)
      layerGroup = L.layerGroup().addTo(map)
      renderMap()
    }
  }, 200)

  // Cleanup
  onUnmounted(() => {
    clearInterval(checkLeaflet)
    if (map) map.remove()
  })
})

watch(activePeriod, () => renderMap())
</script>

<style scoped>
.map-wrapper {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border: 2px solid var(--color-gold);
}

.map-controls {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--color-navy);
  flex-wrap: wrap;
}

.map-period-btn {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(201, 168, 76, 0.4);
  border-radius: 6px;
  background: transparent;
  color: var(--color-gold-light);
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.map-period-btn:hover {
  border-color: var(--color-gold);
  background: rgba(201, 168, 76, 0.1);
}

.map-period-btn.active {
  background: var(--color-gold);
  color: var(--color-navy);
  border-color: var(--color-gold);
}

.map-container {
  height: 550px;
  width: 100%;
}

.map-legend {
  display: flex;
  gap: 1.5rem;
  padding: 0.8rem 1rem;
  background: var(--color-navy);
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: #ccc;
}

.legend-color {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  display: inline-block;
}
</style>
