<template>
  <NuxtLayout>
    <!-- Une page par chemin : changer de langue (/fr/quiz → /it/quiz) recrée la page,
         donc ses données sont rechargées dans la nouvelle langue. -->
    <NuxtPage :page-key="route => route.path" />
  </NuxtLayout>
</template>
