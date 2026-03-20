<template>
  <div class="harbor-scene" ref="sceneRef">
    <svg :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg" class="harbor-svg">
      <defs>
        <!-- Sky gradient -->
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a0a2e" />
          <stop offset="40%" stop-color="#3d1e6d" />
          <stop offset="70%" stop-color="#c4543a" />
          <stop offset="100%" stop-color="#e8a647" />
        </linearGradient>
        <!-- Water gradient -->
        <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a5276" />
          <stop offset="100%" stop-color="#0a2e4a" />
        </linearGradient>
        <!-- Gold glow -->
        <radialGradient id="sunGlow" cx="50%" cy="65%" r="25%">
          <stop offset="0%" stop-color="#ffd700" stop-opacity="0.8" />
          <stop offset="50%" stop-color="#e8a647" stop-opacity="0.3" />
          <stop offset="100%" stop-color="transparent" stop-opacity="0" />
        </radialGradient>
        <!-- Wall texture -->
        <pattern id="wallPattern" x="0" y="0" width="8" height="6" patternUnits="userSpaceOnUse">
          <rect width="8" height="6" fill="#8B7355" />
          <rect x="0" y="0" width="3.5" height="2.5" fill="#9B8365" rx="0.3" />
          <rect x="4" y="0" width="3.5" height="2.5" fill="#7B6345" rx="0.3" />
          <rect x="2" y="3" width="3.5" height="2.5" fill="#9B8365" rx="0.3" />
          <rect x="6" y="3" width="2" height="2.5" fill="#7B6345" rx="0.3" />
        </pattern>
        <!-- Water reflection -->
        <filter id="waterReflect">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.06" numOctaves="3" seed="2">
            <animate attributeName="baseFrequency" values="0.01 0.06;0.015 0.08;0.01 0.06" dur="8s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="6" />
        </filter>
        <!-- Star filter -->
        <filter id="starGlow">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      <!-- Sky -->
      <rect x="0" y="0" :width="width" :height="height * 0.55" fill="url(#skyGrad)" />

      <!-- Stars -->
      <g class="stars">
        <circle v-for="star in stars" :key="star.id" :cx="star.x" :cy="star.y" :r="star.r" fill="white" :opacity="star.opacity" class="star" :style="{ animationDelay: star.delay + 's', animationDuration: star.duration + 's' }" />
      </g>

      <!-- Sun/Moon glow -->
      <circle :cx="width * 0.5" :cy="height * 0.38" :r="width * 0.18" fill="url(#sunGlow)" class="sun-glow" />
      <circle :cx="width * 0.5" :cy="height * 0.38" r="25" fill="#ffd700" opacity="0.9" class="sun" />

      <!-- Distant mountains -->
      <path :d="`M0,${h(0.45)} Q${w(0.1)},${h(0.35)} ${w(0.2)},${h(0.42)} T${w(0.35)},${h(0.38)} T${w(0.5)},${h(0.43)} T${w(0.7)},${h(0.36)} T${w(0.85)},${h(0.42)} T${w(1)},${h(0.44)} V${h(0.55)} H0Z`" fill="#2d1854" opacity="0.6" />

      <!-- City silhouette - buildings -->
      <g class="city-buildings">
        <!-- Byrsa Hill (center temple) -->
        <rect :x="w(0.44)" :y="h(0.32)" :width="w(0.12)" :height="h(0.16)" fill="url(#wallPattern)" />
        <!-- Temple columns -->
        <rect :x="w(0.445)" :y="h(0.30)" :width="w(0.005)" :height="h(0.04)" fill="#d4a854" />
        <rect :x="w(0.455)" :y="h(0.30)" :width="w(0.005)" :height="h(0.04)" fill="#d4a854" />
        <rect :x="w(0.465)" :y="h(0.30)" :width="w(0.005)" :height="h(0.04)" fill="#d4a854" />
        <rect :x="w(0.48)" :y="h(0.30)" :width="w(0.005)" :height="h(0.04)" fill="#d4a854" />
        <rect :x="w(0.49)" :y="h(0.30)" :width="w(0.005)" :height="h(0.04)" fill="#d4a854" />
        <rect :x="w(0.50)" :y="h(0.30)" :width="w(0.005)" :height="h(0.04)" fill="#d4a854" />
        <rect :x="w(0.515)" :y="h(0.30)" :width="w(0.005)" :height="h(0.04)" fill="#d4a854" />
        <rect :x="w(0.525)" :y="h(0.30)" :width="w(0.005)" :height="h(0.04)" fill="#d4a854" />
        <rect :x="w(0.535)" :y="h(0.30)" :width="w(0.005)" :height="h(0.04)" fill="#d4a854" />
        <rect :x="w(0.545)" :y="h(0.30)" :width="w(0.005)" :height="h(0.04)" fill="#d4a854" />
        <!-- Temple pediment -->
        <polygon :points="`${w(0.44)},${h(0.30)} ${w(0.50)},${h(0.25)} ${w(0.56)},${h(0.30)}`" fill="#c4943a" />

        <!-- Left buildings -->
        <rect :x="w(0.20)" :y="h(0.40)" :width="w(0.05)" :height="h(0.08)" fill="#7a6245" />
        <rect :x="w(0.26)" :y="h(0.38)" :width="w(0.04)" :height="h(0.10)" fill="#8a7255" />
        <rect :x="w(0.31)" :y="h(0.36)" :width="w(0.06)" :height="h(0.12)" fill="#7a6245" />
        <rect :x="w(0.38)" :y="h(0.37)" :width="w(0.05)" :height="h(0.11)" fill="#8a7255" />

        <!-- Right buildings -->
        <rect :x="w(0.57)" :y="h(0.37)" :width="w(0.05)" :height="h(0.11)" fill="#8a7255" />
        <rect :x="w(0.63)" :y="h(0.35)" :width="w(0.06)" :height="h(0.13)" fill="#7a6245" />
        <rect :x="w(0.70)" :y="h(0.38)" :width="w(0.04)" :height="h(0.10)" fill="#8a7255" />
        <rect :x="w(0.75)" :y="h(0.40)" :width="w(0.05)" :height="h(0.08)" fill="#7a6245" />

        <!-- City walls -->
        <path :d="`M${w(0.15)},${h(0.48)} L${w(0.15)},${h(0.42)} L${w(0.18)},${h(0.42)} L${w(0.18)},${h(0.40)} L${w(0.20)},${h(0.40)} `" fill="none" stroke="#9B8365" stroke-width="3" />
        <path :d="`M${w(0.80)},${h(0.40)} L${w(0.82)},${h(0.40)} L${w(0.82)},${h(0.42)} L${w(0.85)},${h(0.42)} L${w(0.85)},${h(0.48)}`" fill="none" stroke="#9B8365" stroke-width="3" />

        <!-- Tower left -->
        <rect :x="w(0.15)" :y="h(0.38)" :width="w(0.03)" :height="h(0.10)" fill="#9B8365" />
        <polygon :points="`${w(0.15)},${h(0.38)} ${w(0.165)},${h(0.35)} ${w(0.18)},${h(0.38)}`" fill="#B8A070" />

        <!-- Tower right -->
        <rect :x="w(0.82)" :y="h(0.38)" :width="w(0.03)" :height="h(0.10)" fill="#9B8365" />
        <polygon :points="`${w(0.82)},${h(0.38)} ${w(0.835)},${h(0.35)} ${w(0.85)},${h(0.38)}`" fill="#B8A070" />
      </g>

      <!-- Warm light on buildings -->
      <rect :x="w(0.15)" :y="h(0.25)" :width="w(0.70)" :height="h(0.23)" fill="#ffa040" opacity="0.08" />

      <!-- Water -->
      <rect x="0" :y="h(0.48)" :width="width" :height="h(0.52)" fill="url(#waterGrad)" />

      <!-- Circular military harbor -->
      <g class="harbor-circular" :transform="`translate(${w(0.50)}, ${h(0.58)})`">
        <ellipse cx="0" cy="0" :rx="w(0.12)" :ry="h(0.06)" fill="#0d3d5c" stroke="#1a5276" stroke-width="2" />
        <ellipse cx="0" cy="0" :rx="w(0.08)" :ry="h(0.04)" fill="#1a5276" stroke="#245d82" stroke-width="1" />
        <!-- Dock segments -->
        <line v-for="i in 12" :key="'dock-'+i" x1="0" y1="0" :x2="Math.cos(i * Math.PI / 6) * w(0.12)" :y2="Math.sin(i * Math.PI / 6) * h(0.06)" stroke="#5c4a32" stroke-width="1.5" opacity="0.5" />
        <!-- Central island -->
        <ellipse cx="0" cy="0" :rx="w(0.025)" :ry="h(0.012)" fill="#8B7355" />
        <rect :x="-w(0.008)" :y="-h(0.02)" :width="w(0.016)" :height="h(0.015)" fill="#9B8365" />
      </g>

      <!-- Rectangular commercial harbor -->
      <g class="harbor-rect">
        <rect :x="w(0.30)" :y="h(0.62)" :width="w(0.14)" :height="h(0.08)" fill="#0d3d5c" stroke="#1a5276" stroke-width="2" rx="2" />
        <!-- Docks -->
        <line :x1="w(0.30)" :y1="h(0.64)" :x2="w(0.34)" :y2="h(0.64)" stroke="#5c4a32" stroke-width="2" />
        <line :x1="w(0.30)" :y1="h(0.67)" :x2="w(0.34)" :y2="h(0.67)" stroke="#5c4a32" stroke-width="2" />
      </g>

      <!-- Animated ships -->
      <g v-for="ship in ships" :key="ship.id" class="ship" :style="{ animationDelay: ship.delay + 's' }">
        <g :transform="`translate(${ship.x}, ${ship.y}) scale(${ship.scale})`">
          <!-- Hull -->
          <path d="M-20,0 Q-25,-8 -15,-8 L15,-8 Q25,-8 20,0 Z" :fill="ship.color" />
          <!-- Mast -->
          <line x1="0" y1="-8" x2="0" y2="-28" stroke="#5c4a32" stroke-width="1.5" />
          <!-- Sail -->
          <path d="M-10,-26 Q0,-30 10,-26 L8,-12 Q0,-14 -8,-12 Z" fill="#f5e6c8" opacity="0.85" class="sail" :style="{ animationDelay: ship.delay + 's' }" />
          <!-- Flag -->
          <path d="M0,-28 L8,-25 L0,-22" :fill="ship.flag" opacity="0.8" />
        </g>
      </g>

      <!-- Water waves overlay -->
      <g class="waves">
        <path v-for="wave in waves" :key="wave.id" :d="wave.d" :stroke="wave.stroke" stroke-width="1" fill="none" :opacity="wave.opacity" class="wave" :style="{ animationDelay: wave.delay + 's', animationDuration: wave.duration + 's' }" />
      </g>

      <!-- Light reflection on water -->
      <ellipse :cx="w(0.50)" :cy="h(0.52)" :rx="w(0.06)" :ry="h(0.15)" fill="#ffd700" opacity="0.08" class="water-reflection" />

      <!-- Foreground -->
      <path :d="`M0,${h(0.92)} Q${w(0.15)},${h(0.88)} ${w(0.3)},${h(0.90)} T${w(0.6)},${h(0.88)} T${w(0.85)},${h(0.91)} T${w(1)},${h(0.89)} V${height} H0Z`" fill="#1a0a2e" opacity="0.3" />
    </svg>

    <div class="harbor-label">
      <span class="harbor-title">{{ title }}</span>
      <span class="harbor-subtitle">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: 'Port de Carthage' },
  subtitle: { type: String, default: 'Cothon — Le double port légendaire' }
})

const sceneRef = ref(null)
const width = 900
const height = 450

const w = (pct) => Math.round(width * pct)
const h = (pct) => Math.round(height * pct)

const stars = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * width,
  y: Math.random() * height * 0.35,
  r: Math.random() * 1.5 + 0.5,
  opacity: Math.random() * 0.7 + 0.3,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2
}))

const ships = [
  { id: 1, x: w(0.22), y: h(0.56), scale: 0.8, color: '#5c3a1e', flag: '#c4543a', delay: 0 },
  { id: 2, x: w(0.72), y: h(0.54), scale: 0.7, color: '#4a2e16', flag: '#c9a84c', delay: 1.5 },
  { id: 3, x: w(0.85), y: h(0.60), scale: 0.6, color: '#5c3a1e', flag: '#c4543a', delay: 3 },
  { id: 4, x: w(0.38), y: h(0.72), scale: 0.9, color: '#6a4528', flag: '#c9a84c', delay: 0.8 },
  { id: 5, x: w(0.60), y: h(0.68), scale: 0.5, color: '#4a2e16', flag: '#c4543a', delay: 2.2 },
]

const waves = Array.from({ length: 15 }, (_, i) => {
  const y = h(0.50) + i * h(0.03)
  const offset = (i % 2) * w(0.05)
  return {
    id: i,
    d: `M${-w(0.05) + offset},${y} Q${w(0.1) + offset},${y - 4} ${w(0.2) + offset},${y} T${w(0.4) + offset},${y} T${w(0.6) + offset},${y} T${w(0.8) + offset},${y} T${w(1.05)},${y}`,
    stroke: i < 3 ? '#3a7ca5' : '#1a5276',
    opacity: 0.15 + (1 - i / 15) * 0.2,
    delay: i * 0.3,
    duration: 4 + Math.random() * 3
  }
})
</script>

<style scoped>
.harbor-scene {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
}

.harbor-svg {
  display: block;
  width: 100%;
  height: auto;
}

.star {
  animation: twinkle 3s ease-in-out infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.2; }
  100% { opacity: 1; }
}

.sun-glow {
  animation: pulseGlow 6s ease-in-out infinite alternate;
}

@keyframes pulseGlow {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}

.ship {
  animation: bobShip 4s ease-in-out infinite alternate;
}

@keyframes bobShip {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(1px); }
}

.sail {
  animation: billowSail 5s ease-in-out infinite alternate;
  transform-origin: center;
}

@keyframes billowSail {
  0% { transform: scaleX(1); }
  100% { transform: scaleX(1.08); }
}

.wave {
  animation: moveWave 6s ease-in-out infinite alternate;
}

@keyframes moveWave {
  0% { transform: translateX(-10px); }
  100% { transform: translateX(10px); }
}

.water-reflection {
  animation: reflectionPulse 4s ease-in-out infinite alternate;
}

@keyframes reflectionPulse {
  0% { opacity: 0.05; rx: 40; }
  100% { opacity: 0.12; rx: 55; }
}

.harbor-label {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  pointer-events: none;
}

.harbor-title {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: var(--color-gold);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  letter-spacing: 2px;
}

.harbor-subtitle {
  display: block;
  font-size: 0.85rem;
  color: #ccc;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.8);
  margin-top: 0.3rem;
}

@media (max-width: 768px) {
  .harbor-title {
    font-size: 1rem;
  }
  .harbor-subtitle {
    font-size: 0.75rem;
  }
}
</style>
