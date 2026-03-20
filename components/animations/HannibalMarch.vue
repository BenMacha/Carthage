<template>
  <div class="march-scene">
    <canvas ref="canvasRef" :width="canvasWidth" :height="canvasHeight" class="march-canvas"></canvas>
    <div class="march-label">
      <span class="march-title">{{ title }}</span>
      <span class="march-subtitle">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: 'La Traversée des Alpes' },
  subtitle: { type: String, default: '218 av. J.-C. — Hannibal et ses éléphants' }
})

const canvasRef = ref(null)
const canvasWidth = 900
const canvasHeight = 500
let animationId = null
let time = 0

const snowflakes = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvasWidth,
  y: Math.random() * canvasHeight,
  r: Math.random() * 2.5 + 0.5,
  speed: Math.random() * 1.5 + 0.5,
  drift: Math.random() * 0.8 - 0.4,
  opacity: Math.random() * 0.6 + 0.4
}))

// Elephant positions along the path
const elephants = [
  { progress: 0.25, size: 0.7 },
  { progress: 0.45, size: 0.85 },
  { progress: 0.65, size: 1.0 },
]

// Soldiers following
const soldiers = Array.from({ length: 18 }, (_, i) => ({
  progress: 0.10 + i * 0.035,
  size: 0.3 + Math.random() * 0.15
}))

function getMountainPath(ctx, w, h) {
  // Multiple mountain layers
  return [
    // Far mountains
    { color: '#4a5568', points: [[0, h*0.5], [w*0.15, h*0.25], [w*0.3, h*0.4], [w*0.45, h*0.2], [w*0.6, h*0.35], [w*0.75, h*0.15], [w*0.9, h*0.3], [w, h*0.45], [w, h], [0, h]] },
    // Mid mountains
    { color: '#5a6578', points: [[0, h*0.55], [w*0.1, h*0.38], [w*0.25, h*0.48], [w*0.4, h*0.32], [w*0.55, h*0.45], [w*0.7, h*0.28], [w*0.85, h*0.42], [w, h*0.5], [w, h], [0, h]] },
    // Near mountains with snow caps
    { color: '#6b7a8d', points: [[0, h*0.6], [w*0.12, h*0.42], [w*0.22, h*0.55], [w*0.35, h*0.38], [w*0.48, h*0.5], [w*0.6, h*0.35], [w*0.72, h*0.48], [w*0.82, h*0.32], [w*0.92, h*0.5], [w, h*0.55], [w, h], [0, h]] },
  ]
}

function getTrailY(x, w, h) {
  // The trail winding through mountains
  const norm = x / w
  const base = h * 0.62
  const wave = Math.sin(norm * Math.PI * 3) * h * 0.06
  const slope = -norm * h * 0.12
  return base + wave + slope
}

function drawElephant(ctx, x, y, size, time) {
  const s = size * 30
  ctx.save()
  ctx.translate(x, y)

  // Body
  ctx.fillStyle = '#6b5b4f'
  ctx.beginPath()
  ctx.ellipse(0, -s * 0.6, s * 0.7, s * 0.45, 0, 0, Math.PI * 2)
  ctx.fill()

  // Head
  ctx.fillStyle = '#7a6a5e'
  ctx.beginPath()
  ctx.ellipse(s * 0.6, -s * 0.75, s * 0.3, s * 0.3, 0, 0, Math.PI * 2)
  ctx.fill()

  // Trunk (animated)
  const trunkSwing = Math.sin(time * 1.5) * 5
  ctx.strokeStyle = '#7a6a5e'
  ctx.lineWidth = s * 0.12
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(s * 0.85, -s * 0.65)
  ctx.quadraticCurveTo(s * 1.0, -s * 0.3 + trunkSwing, s * 0.8, -s * 0.1 + trunkSwing)
  ctx.stroke()

  // Tusks
  ctx.strokeStyle = '#f5f0e0'
  ctx.lineWidth = s * 0.06
  ctx.beginPath()
  ctx.moveTo(s * 0.75, -s * 0.6)
  ctx.quadraticCurveTo(s * 1.0, -s * 0.5, s * 0.95, -s * 0.35)
  ctx.stroke()

  // Ear
  ctx.fillStyle = '#5a4a3e'
  ctx.beginPath()
  ctx.ellipse(s * 0.45, -s * 0.85, s * 0.18, s * 0.25, -0.3, 0, Math.PI * 2)
  ctx.fill()

  // Legs (animated walk)
  const legSwing = Math.sin(time * 2) * 4
  ctx.fillStyle = '#5a4a3e'
  const legPositions = [-s * 0.35, -s * 0.1, s * 0.15, s * 0.4]
  legPositions.forEach((lx, i) => {
    const swing = i % 2 === 0 ? legSwing : -legSwing
    ctx.fillRect(lx - s * 0.07, -s * 0.15, s * 0.14, s * 0.35 + swing * 0.3)
  })

  // Rider (Hannibal on the main elephant)
  if (size > 0.9) {
    ctx.fillStyle = '#c4543a'
    ctx.beginPath()
    ctx.ellipse(0, -s * 1.1, s * 0.15, s * 0.2, 0, 0, Math.PI * 2)
    ctx.fill()
    // Cloak
    ctx.fillStyle = '#8b1a1a'
    ctx.beginPath()
    ctx.moveTo(-s * 0.1, -s * 1.0)
    ctx.lineTo(-s * 0.25, -s * 0.7)
    ctx.lineTo(s * 0.05, -s * 0.85)
    ctx.closePath()
    ctx.fill()
    // Helmet
    ctx.fillStyle = '#c9a84c'
    ctx.beginPath()
    ctx.arc(0, -s * 1.25, s * 0.1, 0, Math.PI * 2)
    ctx.fill()
    // Plume
    ctx.fillStyle = '#c4543a'
    ctx.beginPath()
    ctx.ellipse(s * 0.05, -s * 1.38, s * 0.03, s * 0.1, 0.3, 0, Math.PI * 2)
    ctx.fill()
    // Sword raised
    ctx.strokeStyle = '#c9a84c'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(s * 0.15, -s * 1.05)
    ctx.lineTo(s * 0.35, -s * 1.35 + Math.sin(time) * 3)
    ctx.stroke()
  } else {
    // Regular rider
    ctx.fillStyle = '#8B7355'
    ctx.beginPath()
    ctx.ellipse(0, -s * 1.05, s * 0.1, s * 0.15, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  // Blanket / howdah
  ctx.fillStyle = '#c4543a'
  ctx.fillRect(-s * 0.3, -s * 0.95, s * 0.6, s * 0.1)
  ctx.fillStyle = '#c9a84c'
  ctx.fillRect(-s * 0.3, -s * 0.88, s * 0.6, s * 0.03)

  ctx.restore()
}

function drawSoldier(ctx, x, y, size, time) {
  const s = size * 20
  const walkCycle = Math.sin(time * 3 + x * 0.1)
  ctx.save()
  ctx.translate(x, y)

  // Body
  ctx.fillStyle = '#8B7355'
  ctx.fillRect(-s * 0.15, -s * 1.2, s * 0.3, s * 0.6)

  // Head
  ctx.fillStyle = '#d4a574'
  ctx.beginPath()
  ctx.arc(0, -s * 1.4, s * 0.15, 0, Math.PI * 2)
  ctx.fill()

  // Helmet
  ctx.fillStyle = '#6b5b4f'
  ctx.beginPath()
  ctx.arc(0, -s * 1.48, s * 0.16, Math.PI, 0)
  ctx.fill()

  // Legs walking
  ctx.fillStyle = '#6b5b4f'
  ctx.save()
  ctx.translate(-s * 0.05, -s * 0.6)
  ctx.rotate(walkCycle * 0.2)
  ctx.fillRect(-s * 0.06, 0, s * 0.12, s * 0.5)
  ctx.restore()
  ctx.save()
  ctx.translate(s * 0.05, -s * 0.6)
  ctx.rotate(-walkCycle * 0.2)
  ctx.fillRect(-s * 0.06, 0, s * 0.12, s * 0.5)
  ctx.restore()

  // Spear
  ctx.strokeStyle = '#5c4a32'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(s * 0.2, -s * 0.8)
  ctx.lineTo(s * 0.2, -s * 2.2)
  ctx.stroke()
  // Spear tip
  ctx.fillStyle = '#999'
  ctx.beginPath()
  ctx.moveTo(s * 0.12, -s * 2.2)
  ctx.lineTo(s * 0.2, -s * 2.5)
  ctx.lineTo(s * 0.28, -s * 2.2)
  ctx.closePath()
  ctx.fill()

  // Shield (some soldiers)
  if (Math.floor(x) % 3 === 0) {
    ctx.fillStyle = '#c4543a'
    ctx.beginPath()
    ctx.ellipse(-s * 0.25, -s * 1.0, s * 0.12, s * 0.18, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#c9a84c'
    ctx.lineWidth = 1
    ctx.stroke()
  }

  ctx.restore()
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvasWidth
  const h = canvasHeight
  time += 0.016

  // Sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5)
  skyGrad.addColorStop(0, '#1a1a3e')
  skyGrad.addColorStop(0.5, '#3a4a6a')
  skyGrad.addColorStop(1, '#7a8aa0')
  ctx.fillStyle = skyGrad
  ctx.fillRect(0, 0, w, h)

  // Mountains
  const mountains = getMountainPath(ctx, w, h)
  mountains.forEach(m => {
    ctx.fillStyle = m.color
    ctx.beginPath()
    ctx.moveTo(m.points[0][0], m.points[0][1])
    for (let i = 1; i < m.points.length; i++) {
      ctx.lineTo(m.points[i][0], m.points[i][1])
    }
    ctx.closePath()
    ctx.fill()
  })

  // Snow caps on near mountains
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
  const snowPeaks = [[w*0.12, h*0.42], [w*0.35, h*0.38], [w*0.6, h*0.35], [w*0.82, h*0.32]]
  snowPeaks.forEach(([px, py]) => {
    ctx.beginPath()
    ctx.moveTo(px - 25, py + 15)
    ctx.lineTo(px, py)
    ctx.lineTo(px + 25, py + 15)
    ctx.closePath()
    ctx.fill()
  })

  // Trail path
  ctx.strokeStyle = '#8a7a6a'
  ctx.lineWidth = 12
  ctx.lineCap = 'round'
  ctx.beginPath()
  for (let x = 0; x <= w; x += 5) {
    const y = getTrailY(x, w, h)
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()

  // Trail edge
  ctx.strokeStyle = '#6a5a4a'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let x = 0; x <= w; x += 5) {
    const y = getTrailY(x, w, h) + 6
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()

  // Draw soldiers
  const baseX = w * 0.1 + Math.sin(time * 0.3) * 3
  soldiers.forEach(s => {
    const sx = baseX + s.progress * w * 0.9
    const sy = getTrailY(sx, w, h) - 2
    drawSoldier(ctx, sx, sy, s.size, time)
  })

  // Draw elephants
  elephants.forEach(e => {
    const ex = baseX + e.progress * w * 0.9
    const ey = getTrailY(ex, w, h) - 5
    drawElephant(ctx, ex, ey, e.size, time)
  })

  // Fog/mist at bottom
  const fogGrad = ctx.createLinearGradient(0, h * 0.8, 0, h)
  fogGrad.addColorStop(0, 'rgba(180, 190, 210, 0)')
  fogGrad.addColorStop(1, 'rgba(180, 190, 210, 0.4)')
  ctx.fillStyle = fogGrad
  ctx.fillRect(0, h * 0.8, w, h * 0.2)

  // Snowflakes
  ctx.fillStyle = 'white'
  snowflakes.forEach(s => {
    s.y += s.speed
    s.x += s.drift + Math.sin(time + s.x * 0.01) * 0.3
    if (s.y > h) { s.y = -5; s.x = Math.random() * w }
    if (s.x > w) s.x = 0
    if (s.x < 0) s.x = w
    ctx.globalAlpha = s.opacity
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fill()
  })
  ctx.globalAlpha = 1

  // Vignette
  const vigGrad = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.7)
  vigGrad.addColorStop(0, 'rgba(0,0,0,0)')
  vigGrad.addColorStop(1, 'rgba(0,0,0,0.4)')
  ctx.fillStyle = vigGrad
  ctx.fillRect(0, 0, w, h)

  animationId = requestAnimationFrame(draw)
}

onMounted(() => {
  draw()
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.march-scene {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
}

.march-canvas {
  display: block;
  width: 100%;
  height: auto;
}

.march-label {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  pointer-events: none;
}

.march-title {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: var(--color-gold);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9);
  letter-spacing: 2px;
}

.march-subtitle {
  display: block;
  font-size: 0.85rem;
  color: #ddd;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.9);
  margin-top: 0.3rem;
}

@media (max-width: 768px) {
  .march-title { font-size: 1rem; }
  .march-subtitle { font-size: 0.75rem; }
}
</style>
