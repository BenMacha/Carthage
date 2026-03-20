<template>
  <div class="warship-scene">
    <svg :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg" class="warship-svg">
      <defs>
        <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0a3d62" />
          <stop offset="50%" stop-color="#0c2d48" />
          <stop offset="100%" stop-color="#061a2e" />
        </linearGradient>
        <linearGradient id="shipSkyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a0a2e" />
          <stop offset="60%" stop-color="#2a1a4e" />
          <stop offset="100%" stop-color="#0a3d62" />
        </linearGradient>
        <linearGradient id="hullGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8B4513" />
          <stop offset="100%" stop-color="#5c3a1e" />
        </linearGradient>
        <filter id="seaGlow">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <!-- Sky -->
      <rect x="0" y="0" :width="width" :height="h(0.45)" fill="url(#shipSkyGrad)" />

      <!-- Stars -->
      <circle v-for="s in starList" :key="'s'+s.id" :cx="s.x" :cy="s.y" :r="s.r" fill="white" :opacity="s.o" class="star-twinkle" :style="{animationDelay: s.d+'s'}" />

      <!-- Moon -->
      <circle :cx="w(0.78)" :cy="h(0.15)" r="22" fill="#f0e8d0" opacity="0.9" />
      <circle :cx="w(0.79)" :cy="h(0.14)" r="18" fill="url(#shipSkyGrad)" />

      <!-- Moon glow -->
      <circle :cx="w(0.78)" :cy="h(0.15)" r="60" fill="#f0e8d0" opacity="0.05" />

      <!-- Sea -->
      <rect x="0" :y="h(0.45)" :width="width" :height="h(0.55)" fill="url(#seaGrad)" />

      <!-- Moon reflection -->
      <ellipse :cx="w(0.78)" :cy="h(0.55)" :rx="3" :ry="h(0.25)" fill="#f0e8d0" opacity="0.06" class="moon-reflect" />

      <!-- THE WARSHIP -->
      <g class="main-ship" :transform="`translate(${w(0.5)}, ${h(0.52)})`">
        <!-- Ship bob animation is done via CSS -->
        <g class="ship-bob">
          <!-- Hull -->
          <path d="M-180,20 Q-200,0 -170,-10 L-160,-15 L160,-15 Q190,0 180,20 Q170,35 -170,35 Z" fill="url(#hullGrad)" stroke="#4a2e16" stroke-width="1.5" />

          <!-- Hull stripes -->
          <path d="M-165,-5 L155,-5" stroke="#c9a84c" stroke-width="2" opacity="0.6" />
          <path d="M-170,5 L160,5" stroke="#c9a84c" stroke-width="1" opacity="0.4" />

          <!-- Ram (rostrum) -->
          <path d="M-170,-10 L-210,-5 L-170,5" fill="#8a6914" stroke="#6a5010" stroke-width="1" />
          <path d="M-200,-3 L-210,-5 L-200,-7" fill="#c9a84c" />

          <!-- Oar ports -->
          <g v-for="i in 16" :key="'op'+i">
            <circle :cx="-150 + i * 18" cy="12" r="2.5" fill="#3a2010" />
          </g>

          <!-- Oars (animated) -->
          <g v-for="i in 16" :key="'oar'+i" class="oar" :style="{animationDelay: (i % 2 === 0 ? 0 : 0.5) + 's'}">
            <line :x1="-150 + i * 18" y1="12" :x2="-150 + i * 18 + 8" y2="45" stroke="#5c4a32" stroke-width="2" stroke-linecap="round" />
          </g>

          <!-- Deck -->
          <rect x="-155" y="-18" width="310" height="6" fill="#a0845c" rx="2" />

          <!-- Deck planks -->
          <line v-for="i in 12" :key="'plank'+i" :x1="-140 + i * 24" y1="-18" :x2="-140 + i * 24" y2="-12" stroke="#8a6e44" stroke-width="0.5" />

          <!-- Mast -->
          <line x1="0" y1="-18" x2="0" y2="-140" stroke="#5c4a32" stroke-width="4" />

          <!-- Yard arm -->
          <line x1="-80" y1="-120" x2="80" y2="-120" stroke="#5c4a32" stroke-width="3" />

          <!-- Main sail -->
          <path d="M-75,-118 Q-40,-85 0,-80 Q40,-85 75,-118 L75,-40 Q40,-50 0,-55 Q-40,-50 -75,-40 Z" fill="#f5e6c8" opacity="0.9" class="main-sail" />

          <!-- Sail pattern - Tanit symbol -->
          <g transform="translate(0, -80)" opacity="0.4">
            <!-- Tanit: triangle body -->
            <polygon points="-15,15 0,-10 15,15" fill="#c4543a" stroke="#8b1a1a" stroke-width="1" />
            <!-- Tanit: circle head -->
            <circle cx="0" cy="-15" r="7" fill="none" stroke="#c4543a" stroke-width="2" />
            <!-- Tanit: arms -->
            <line x1="-20" y1="0" x2="20" y2="0" stroke="#c4543a" stroke-width="2" />
          </g>

          <!-- Rigging -->
          <line x1="-170" y1="-10" x2="0" y2="-138" stroke="#8a7a5a" stroke-width="0.8" opacity="0.5" />
          <line x1="160" y1="-10" x2="0" y2="-138" stroke="#8a7a5a" stroke-width="0.8" opacity="0.5" />
          <line x1="-80" y1="-120" x2="-170" y2="-5" stroke="#8a7a5a" stroke-width="0.5" opacity="0.3" />
          <line x1="80" y1="-120" x2="160" y2="-5" stroke="#8a7a5a" stroke-width="0.5" opacity="0.3" />

          <!-- Flag at mast top -->
          <path d="M0,-140 L25,-135 L0,-128" fill="#c4543a" class="flag-wave" />

          <!-- Stern decoration -->
          <path d="M160,-15 Q175,-25 165,-40 Q160,-35 155,-20" fill="#8B4513" stroke="#c9a84c" stroke-width="1" />

          <!-- Bow eye (apotropaic) -->
          <g transform="translate(-160, -8)">
            <ellipse cx="0" cy="0" rx="6" ry="4" fill="white" />
            <circle cx="1" cy="0" r="2.5" fill="#1a0a2e" />
          </g>

          <!-- Crew silhouettes on deck -->
          <g v-for="i in 6" :key="'crew'+i">
            <circle :cx="-100 + i * 40" cy="-25" r="3" fill="#2a1a0e" />
            <rect :x="-100 + i * 40 - 2" y="-22" width="4" height="8" fill="#2a1a0e" rx="1" />
          </g>

          <!-- Helmsman at stern -->
          <g transform="translate(140, -22)">
            <circle cx="0" cy="-5" r="4" fill="#2a1a0e" />
            <rect x="-3" y="-1" width="6" height="10" fill="#2a1a0e" rx="1" />
            <!-- Steering oar -->
            <line x1="5" y1="0" x2="25" y2="30" stroke="#5c4a32" stroke-width="2.5" />
          </g>
        </g>
      </g>

      <!-- Ocean waves (foreground) -->
      <g class="ocean-waves">
        <path v-for="wv in waveList" :key="wv.id" :d="wv.d" fill="none" :stroke="wv.color" :stroke-width="wv.sw" :opacity="wv.o" class="sea-wave" :style="{animationDelay: wv.delay+'s', animationDuration: wv.dur+'s'}" />
      </g>

      <!-- Foam near ship -->
      <g class="foam">
        <circle v-for="f in foamBubbles" :key="f.id" :cx="f.x" :cy="f.y" :r="f.r" fill="white" :opacity="f.o" class="foam-bubble" :style="{animationDelay: f.d+'s'}" />
      </g>
    </svg>

    <div class="warship-label">
      <span class="warship-title">{{ title }}</span>
      <span class="warship-subtitle">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: 'Quinquérème Punique' },
  subtitle: { type: String, default: 'La puissance navale de Carthage' }
})

const width = 900
const height = 480

const w = (pct) => Math.round(width * pct)
const h = (pct) => Math.round(height * pct)

const starList = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * width,
  y: Math.random() * height * 0.4,
  r: Math.random() * 1.2 + 0.3,
  o: Math.random() * 0.6 + 0.3,
  d: Math.random() * 5
}))

const waveList = Array.from({ length: 10 }, (_, i) => {
  const y = h(0.55) + i * h(0.04)
  return {
    id: i,
    d: `M0,${y} Q${w(0.12)},${y-4} ${w(0.25)},${y} T${w(0.5)},${y} T${w(0.75)},${y} T${width},${y}`,
    color: i < 3 ? '#2a6a8a' : '#1a4a6a',
    sw: 1.5 - i * 0.1,
    o: 0.3 - i * 0.02,
    delay: i * 0.4,
    dur: 5 + i * 0.5
  }
})

const foamBubbles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: w(0.5) - 180 + Math.random() * 360,
  y: h(0.56) + Math.random() * 20,
  r: Math.random() * 2 + 1,
  o: Math.random() * 0.3 + 0.1,
  d: Math.random() * 3
}))
</script>

<style scoped>
.warship-scene {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
}

.warship-svg {
  display: block;
  width: 100%;
  height: auto;
}

.star-twinkle {
  animation: twinkle 3s ease-in-out infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.2; }
  100% { opacity: 0.9; }
}

.ship-bob {
  animation: shipBob 5s ease-in-out infinite;
  transform-origin: center;
}

@keyframes shipBob {
  0% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-4px) rotate(-0.8deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(3px) rotate(0.6deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

.oar {
  animation: rowOar 2s ease-in-out infinite;
  transform-origin: top center;
}

@keyframes rowOar {
  0% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  100% { transform: rotate(-10deg); }
}

.main-sail {
  animation: billowSail 6s ease-in-out infinite alternate;
}

@keyframes billowSail {
  0% { d: path("M-75,-118 Q-40,-85 0,-80 Q40,-85 75,-118 L75,-40 Q40,-50 0,-55 Q-40,-50 -75,-40 Z"); }
  100% { d: path("M-75,-118 Q-35,-82 0,-78 Q35,-82 75,-118 L75,-40 Q35,-48 0,-52 Q-35,-48 -75,-40 Z"); }
}

.flag-wave {
  animation: flagWave 2s ease-in-out infinite alternate;
  transform-origin: left center;
}

@keyframes flagWave {
  0% { transform: scaleX(1) skewY(0deg); }
  100% { transform: scaleX(0.9) skewY(3deg); }
}

.sea-wave {
  animation: waveMove 6s ease-in-out infinite alternate;
}

@keyframes waveMove {
  0% { transform: translateX(-15px); }
  100% { transform: translateX(15px); }
}

.foam-bubble {
  animation: foamPulse 3s ease-in-out infinite;
}

@keyframes foamPulse {
  0% { opacity: 0.1; r: 1; }
  50% { opacity: 0.3; r: 2.5; }
  100% { opacity: 0.1; r: 1; }
}

.moon-reflect {
  animation: moonReflect 4s ease-in-out infinite alternate;
}

@keyframes moonReflect {
  0% { opacity: 0.04; }
  100% { opacity: 0.08; }
}

.warship-label {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  pointer-events: none;
}

.warship-title {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: var(--color-gold);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9);
  letter-spacing: 2px;
}

.warship-subtitle {
  display: block;
  font-size: 0.85rem;
  color: #ccc;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.9);
  margin-top: 0.3rem;
}

@media (max-width: 768px) {
  .warship-title { font-size: 1rem; }
  .warship-subtitle { font-size: 0.75rem; }
}
</style>
