<template>
  <svg class="flag" viewBox="0 0 30 20" role="img" :aria-label="label" preserveAspectRatio="xMidYMid slice">
    <!-- Drapeaux tricolores verticaux -->
    <template v-if="V[code]">
      <rect width="10" height="20" :fill="V[code][0]" />
      <rect x="10" width="10" height="20" :fill="V[code][1]" />
      <rect x="20" width="10" height="20" :fill="V[code][2]" />
    </template>
    <!-- Drapeaux tricolores horizontaux -->
    <template v-else-if="H[code]">
      <rect width="30" height="6.67" :fill="H[code][0]" />
      <rect y="6.67" width="30" height="6.67" :fill="H[code][1]" />
      <rect y="13.33" width="30" height="6.67" :fill="H[code][2]" />
    </template>
    <template v-else-if="code === 'gb'">
      <rect width="30" height="20" fill="#012169" />
      <path d="M0 0 30 20M30 0 0 20" stroke="#FFF" stroke-width="4" />
      <path d="M0 0 30 20M30 0 0 20" stroke="#C8102E" stroke-width="1.6" />
      <path d="M15 0v20M0 10h30" stroke="#FFF" stroke-width="6" />
      <path d="M15 0v20M0 10h30" stroke="#C8102E" stroke-width="3.4" />
    </template>
    <template v-else-if="code === 'tn'">
      <rect width="30" height="20" fill="#E70013" />
      <circle cx="15" cy="10" r="5" fill="#FFF" />
      <circle cx="15.6" cy="10" r="3.6" fill="#E70013" />
      <circle cx="16.6" cy="10" r="2.9" fill="#FFF" />
      <path d="M14.6 10l2.9-0.95-1.8 2.45v-3l1.8 2.45z" fill="#E70013" />
    </template>
    <template v-else-if="code === 'tr'">
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="11.5" cy="10" r="5" fill="#FFF" />
      <circle cx="12.75" cy="10" r="4" fill="#E30A17" />
      <path d="M15.6 10l3.1-1.01-1.92 2.64v-3.26l1.92 2.64z" fill="#FFF" />
    </template>
    <template v-else-if="code === 'es'">
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </template>
    <template v-else-if="code === 'pt'">
      <rect width="30" height="20" fill="#FF0000" />
      <rect width="12" height="20" fill="#006600" />
      <circle cx="12" cy="10" r="3.6" fill="#FFCC00" />
      <circle cx="12" cy="10" r="2.2" fill="#FF0000" stroke="#FFF" stroke-width="0.6" />
    </template>
    <template v-else-if="code === 'mt'">
      <rect width="15" height="20" fill="#FFF" />
      <rect x="15" width="15" height="20" fill="#CF142B" />
      <rect x="2.5" y="2.5" width="4" height="4" fill="#C0C0C0" stroke="#CF142B" stroke-width="0.5" />
    </template>
    <template v-else-if="code === 'cn'">
      <rect width="30" height="20" fill="#DE2910" />
      <path d="M5 2.5l1.18 3.63H10L6.91 8.37l1.18 3.63L5 9.76 1.91 12l1.18-3.63L0 6.13h3.82z" fill="#FFDE00" />
      <circle cx="10" cy="2" r="0.8" fill="#FFDE00" />
      <circle cx="12" cy="4" r="0.8" fill="#FFDE00" />
      <circle cx="12" cy="7" r="0.8" fill="#FFDE00" />
      <circle cx="10" cy="9" r="0.8" fill="#FFDE00" />
    </template>
    <template v-else-if="code === 'jp'">
      <rect width="30" height="20" fill="#FFF" />
      <circle cx="15" cy="10" r="6" fill="#BC002D" />
    </template>
    <template v-else-if="code === 'amazigh'">
      <rect width="30" height="6.67" fill="#0072C6" />
      <rect y="6.67" width="30" height="6.67" fill="#3A9D23" />
      <rect y="13.33" width="30" height="6.67" fill="#FCD116" />
      <!-- ⵣ (yaz) stylisé -->
      <path d="M15 3.5v13M11.2 5.2c1.4 1.6 1.4 3.2 0 4.8M18.8 5.2c-1.4 1.6-1.4 3.2 0 4.8M11.2 15c1.4-1.6 1.4-3.2 0-4.8M18.8 15c-1.4-1.6-1.4-3.2 0-4.8" fill="none" stroke="#E2231A" stroke-width="1.6" stroke-linecap="round" />
    </template>
    <rect v-else width="30" height="20" fill="#CCC" />
  </svg>
</template>

<script setup>
// Petits drapeaux SVG (lisibles partout, y compris sous Windows où les émojis drapeaux
// ne s'affichent pas). Dessins simplifiés pour une taille d'icône.
defineProps({
  code: { type: String, required: true },
  label: { type: String, default: '' }
})

const V = {
  fr: ['#0055A4', '#FFFFFF', '#EF4135'],
  it: ['#009246', '#FFFFFF', '#CE2B37']
}

const H = {
  de: ['#000000', '#DD0000', '#FFCE00'],
  nl: ['#AE1C28', '#FFFFFF', '#21468B'],
  ru: ['#FFFFFF', '#0039A6', '#D52B1E']
}
</script>

<style scoped>
.flag {
  display: inline-block;
  width: 22px;
  height: 15px;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(22, 19, 15, 0.12);
  flex: none;
  vertical-align: middle;
  overflow: hidden;
}
</style>
