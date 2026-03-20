<template>
  <div class="tools-scene">
    <svg :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg" class="tools-svg">
      <defs>
        <linearGradient id="tableGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8B7355" />
          <stop offset="100%" stop-color="#5c4a32" />
        </linearGradient>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a1a2e" />
          <stop offset="100%" stop-color="#2a1a0e" />
        </linearGradient>
        <radialGradient id="candleGlow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffa040" stop-opacity="0.4" />
          <stop offset="100%" stop-color="transparent" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="candleGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffa040" stop-opacity="0.3" />
          <stop offset="100%" stop-color="transparent" stop-opacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect x="0" y="0" :width="width" :height="height" fill="url(#bgGrad)" />

      <!-- Wall texture -->
      <rect x="0" y="0" :width="width" :height="h(0.4)" fill="#2a1a0e" opacity="0.3" />
      <line v-for="i in 8" :key="'wl'+i" :x1="0" :y1="i * h(0.05)" :x2="width" :y2="i * h(0.05)" stroke="#3a2a1e" stroke-width="0.5" opacity="0.3" />

      <!-- Table surface -->
      <rect x="0" :y="h(0.4)" :width="width" :height="h(0.6)" fill="url(#tableGrad)" />
      <!-- Wood grain -->
      <line v-for="i in 20" :key="'grain'+i" :x1="0" :y1="h(0.4) + i * h(0.03)" :x2="width" :y2="h(0.4) + i * h(0.03)" stroke="#6a5a42" stroke-width="0.5" opacity="0.3" />

      <!-- Oil lamp (left) -->
      <g :transform="`translate(${w(0.12)}, ${h(0.35)})`">
        <!-- Lamp body -->
        <ellipse cx="0" cy="0" rx="18" ry="8" fill="#b8860b" />
        <ellipse cx="0" cy="-2" rx="14" ry="5" fill="#d4a854" />
        <!-- Spout -->
        <path d="M15,-2 L28,-4 L28,0 L15,2" fill="#b8860b" />
        <!-- Flame -->
        <g class="flame1">
          <ellipse cx="28" cy="-12" rx="4" ry="10" fill="#ffa040" opacity="0.9" />
          <ellipse cx="28" cy="-14" rx="2.5" ry="7" fill="#ffcc00" opacity="0.8" />
          <ellipse cx="28" cy="-16" rx="1.5" ry="4" fill="white" opacity="0.6" />
        </g>
        <!-- Glow -->
        <circle cx="28" cy="-10" r="50" fill="url(#candleGlow1)" class="lamp-glow" />
      </g>

      <!-- Oil lamp (right) -->
      <g :transform="`translate(${w(0.88)}, ${h(0.35)})`">
        <ellipse cx="0" cy="0" rx="18" ry="8" fill="#b8860b" />
        <ellipse cx="0" cy="-2" rx="14" ry="5" fill="#d4a854" />
        <path d="M-15,-2 L-28,-4 L-28,0 L-15,2" fill="#b8860b" />
        <g class="flame2">
          <ellipse cx="-28" cy="-12" rx="4" ry="10" fill="#ffa040" opacity="0.9" />
          <ellipse cx="-28" cy="-14" rx="2.5" ry="7" fill="#ffcc00" opacity="0.8" />
          <ellipse cx="-28" cy="-16" rx="1.5" ry="4" fill="white" opacity="0.6" />
        </g>
        <circle cx="-28" cy="-10" r="50" fill="url(#candleGlow2)" class="lamp-glow" />
      </g>

      <!-- AMPHORA (center) -->
      <g :transform="`translate(${w(0.5)}, ${h(0.38)})`" class="tool-float" style="animation-delay: 0s">
        <!-- Body -->
        <path d="M-18,0 Q-22,-20 -20,-45 Q-18,-55 -12,-60 L-8,-62 Q0,-65 8,-62 L12,-60 Q18,-55 20,-45 Q22,-20 18,0 Q10,8 0,10 Q-10,8 -18,0 Z" fill="#c4703a" stroke="#8a4a20" stroke-width="1" />
        <!-- Neck -->
        <rect x="-7" y="-70" width="14" height="10" fill="#c4703a" stroke="#8a4a20" stroke-width="0.5" rx="1" />
        <!-- Rim -->
        <ellipse cx="0" cy="-70" rx="9" ry="3" fill="#d48050" stroke="#8a4a20" stroke-width="0.5" />
        <!-- Handles -->
        <path d="M-8,-60 Q-22,-55 -20,-40 Q-18,-35 -15,-38" fill="none" stroke="#a85830" stroke-width="3" stroke-linecap="round" />
        <path d="M8,-60 Q22,-55 20,-40 Q18,-35 15,-38" fill="none" stroke="#a85830" stroke-width="3" stroke-linecap="round" />
        <!-- Decorations -->
        <path d="M-15,-30 Q0,-35 15,-30" fill="none" stroke="#d4a854" stroke-width="1" />
        <path d="M-16,-25 Q0,-30 16,-25" fill="none" stroke="#d4a854" stroke-width="1" />
        <!-- Tanit symbol on amphora -->
        <g transform="translate(0, -15)" opacity="0.5">
          <polygon points="-5,5 0,-3 5,5" fill="none" stroke="#d4a854" stroke-width="0.8" />
          <circle cx="0" cy="-5" r="2.5" fill="none" stroke="#d4a854" stroke-width="0.8" />
          <line x1="-7" y1="1" x2="7" y2="1" stroke="#d4a854" stroke-width="0.8" />
        </g>
        <!-- Shadow -->
        <ellipse cx="3" cy="12" rx="20" ry="4" fill="#3a2a1e" opacity="0.3" />
      </g>

      <!-- SWORD (left area) -->
      <g :transform="`translate(${w(0.25)}, ${h(0.55)}) rotate(-25)`" class="tool-float" style="animation-delay: 0.5s">
        <!-- Blade -->
        <path d="M0,0 L3,-80 Q5,-90 4,-100 L0,-110 L-4,-100 Q-5,-90 -3,-80 Z" fill="#b0b8c0" stroke="#808890" stroke-width="0.5" />
        <!-- Blood groove (fuller) -->
        <line x1="0" y1="-10" x2="0" y2="-95" stroke="#9098a0" stroke-width="1.5" opacity="0.5" />
        <!-- Guard -->
        <rect x="-12" y="-2" width="24" height="5" fill="#c9a84c" rx="2" />
        <!-- Grip -->
        <rect x="-4" y="3" width="8" height="22" fill="#5c3a1e" rx="2" />
        <!-- Grip wrapping -->
        <line v-for="i in 5" :key="'gw'+i" :x1="-4" :y1="5 + i * 4" :x2="4" :y2="7 + i * 4" stroke="#8a6a3a" stroke-width="1" />
        <!-- Pommel -->
        <circle cx="0" cy="28" r="5" fill="#c9a84c" />
        <circle cx="0" cy="28" r="2" fill="#8a6914" />
      </g>

      <!-- SCROLL (right area) -->
      <g :transform="`translate(${w(0.73)}, ${h(0.58)}) rotate(10)`" class="tool-float" style="animation-delay: 1s">
        <!-- Paper body -->
        <rect x="-40" y="-12" width="80" height="24" fill="#f5e6c8" rx="1" />
        <!-- Left roll -->
        <ellipse cx="-40" cy="0" rx="5" ry="14" fill="#e8d4a0" stroke="#c9b080" stroke-width="0.5" />
        <!-- Right roll -->
        <ellipse cx="40" cy="0" rx="5" ry="14" fill="#e8d4a0" stroke="#c9b080" stroke-width="0.5" />
        <!-- Writing (decorative lines) -->
        <line v-for="i in 5" :key="'txt'+i" :x1="-30" :y1="-8 + i * 4" :x2="15 + Math.random() * 15" :y2="-8 + i * 4" stroke="#5c4a32" stroke-width="0.6" opacity="0.4" />
        <!-- Rod ends -->
        <circle cx="-40" cy="-15" r="3" fill="#c9a84c" />
        <circle cx="-40" cy="15" r="3" fill="#c9a84c" />
        <circle cx="40" cy="-15" r="3" fill="#c9a84c" />
        <circle cx="40" cy="15" r="3" fill="#c9a84c" />
      </g>

      <!-- COINS (scattered) -->
      <g v-for="coin in coins" :key="coin.id" :transform="`translate(${coin.x}, ${coin.y}) rotate(${coin.rot})`" class="tool-float" :style="{animationDelay: coin.delay+'s'}">
        <ellipse cx="0" cy="0" :rx="coin.r" :ry="coin.r * 0.75" fill="#c9a84c" stroke="#8a6914" stroke-width="0.5" />
        <ellipse cx="0" cy="-1" :rx="coin.r - 2" :ry="(coin.r - 2) * 0.75" fill="none" stroke="#e8c84c" stroke-width="0.5" />
        <!-- Horse or profile -->
        <circle cx="0" cy="0" :r="coin.r * 0.3" fill="#b89040" />
      </g>

      <!-- POTTERY CUP -->
      <g :transform="`translate(${w(0.38)}, ${h(0.70)})`" class="tool-float" style="animation-delay: 1.5s">
        <path d="M-10,0 L-13,-25 Q-13,-30 0,-30 Q13,-30 13,-25 L10,0 Z" fill="#c4703a" stroke="#8a4a20" stroke-width="0.5" />
        <ellipse cx="0" cy="-30" rx="13" ry="4" fill="#d48050" stroke="#8a4a20" stroke-width="0.5" />
        <!-- Handle -->
        <path d="M10,-22 Q18,-18 16,-8 Q14,-2 10,-5" fill="none" stroke="#a85830" stroke-width="2.5" stroke-linecap="round" />
        <ellipse cx="0" cy="2" rx="12" ry="3" fill="#3a2a1e" opacity="0.2" />
      </g>

      <!-- CHISEL -->
      <g :transform="`translate(${w(0.62)}, ${h(0.72)}) rotate(-5)`" class="tool-float" style="animation-delay: 2s">
        <!-- Handle -->
        <rect x="-4" y="-30" width="8" height="25" fill="#8B7355" rx="2" />
        <rect x="-5" y="-32" width="10" height="4" fill="#a08060" rx="1" />
        <!-- Metal part -->
        <path d="M-3,-5 L-5,20 Q0,22 5,20 L3,-5 Z" fill="#b0b8c0" stroke="#808890" stroke-width="0.5" />
        <!-- Chisel tip -->
        <path d="M-6,20 L0,28 L6,20" fill="#c0c8d0" />
      </g>

      <!-- Decorative spark particles near lamps -->
      <g class="sparks">
        <circle v-for="sp in sparks" :key="sp.id" :cx="sp.x" :cy="sp.y" :r="sp.r" fill="#ffa040" class="spark" :style="{animationDelay: sp.d+'s', animationDuration: sp.dur+'s'}" />
      </g>

      <!-- Warm ambient overlay -->
      <rect x="0" y="0" :width="width" :height="height" fill="#ffa040" opacity="0.03" />
    </svg>

    <div class="tools-label">
      <span class="tools-title">{{ title }}</span>
      <span class="tools-subtitle">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: 'Artisanat Punique' },
  subtitle: { type: String, default: 'Outils et objets de la civilisation carthaginoise' }
})

const width = 900
const height = 500

const w = (pct) => Math.round(width * pct)
const h = (pct) => Math.round(height * pct)

const coins = [
  { id: 1, x: w(0.18), y: h(0.65), r: 10, rot: 15, delay: 0.3 },
  { id: 2, x: w(0.22), y: h(0.68), r: 8, rot: -20, delay: 0.8 },
  { id: 3, x: w(0.82), y: h(0.70), r: 9, rot: 30, delay: 1.2 },
  { id: 4, x: w(0.78), y: h(0.65), r: 11, rot: -10, delay: 0.6 },
  { id: 5, x: w(0.50), y: h(0.78), r: 7, rot: 45, delay: 1.8 },
]

const sparks = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: i < 6 ? w(0.12) + 28 + (Math.random() - 0.5) * 30 : w(0.88) - 28 + (Math.random() - 0.5) * 30,
  y: h(0.25) + Math.random() * 15,
  r: Math.random() * 1.5 + 0.5,
  d: Math.random() * 3,
  dur: Math.random() * 2 + 1.5
}))
</script>

<style scoped>
.tools-scene {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
}

.tools-svg {
  display: block;
  width: 100%;
  height: auto;
}

.tool-float {
  animation: toolFloat 4s ease-in-out infinite alternate;
}

@keyframes toolFloat {
  0% { transform: translateY(0); }
  100% { transform: translateY(-3px); }
}

.flame1, .flame2 {
  animation: flameFlicker 0.3s ease-in-out infinite alternate;
  transform-origin: center bottom;
}

.flame1 { animation-delay: 0s; }
.flame2 { animation-delay: 0.15s; }

@keyframes flameFlicker {
  0% { transform: scaleY(1) scaleX(1); }
  25% { transform: scaleY(1.1) scaleX(0.9); }
  50% { transform: scaleY(0.95) scaleX(1.05); }
  75% { transform: scaleY(1.05) scaleX(0.95); }
  100% { transform: scaleY(1) scaleX(1); }
}

.lamp-glow {
  animation: glowPulse 3s ease-in-out infinite alternate;
}

@keyframes glowPulse {
  0% { opacity: 0.7; }
  100% { opacity: 1; }
}

.spark {
  animation: sparkFloat 2s ease-out infinite;
}

@keyframes sparkFloat {
  0% { opacity: 0.8; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-20px); }
}

.tools-label {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  pointer-events: none;
}

.tools-title {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: var(--color-gold);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9);
  letter-spacing: 2px;
}

.tools-subtitle {
  display: block;
  font-size: 0.85rem;
  color: #ccc;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.9);
  margin-top: 0.3rem;
}

@media (max-width: 768px) {
  .tools-title { font-size: 1rem; }
  .tools-subtitle { font-size: 0.75rem; }
}
</style>
