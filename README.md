# Carthage & Hannibal Barca

> Site web éducatif multilingue dédié à l'histoire de la civilisation carthaginoise, de ses héros, de son économie et de son héritage africain.

**Langues :** Français | English | العربية (avec support RTL)

---

## Apercu

Ce projet est une application web Nuxt 3 qui retrace l'histoire de Carthage depuis sa fondation par la reine Didon en 814 av. J.-C. jusqu'à la prise de la ville par Rome en 146 av. J.-C. Il propose des pages richement illustrées, des cartes interactives OpenStreetMap, des diagrammes tactiques SVG et un système de traduction complet (FR/EN/AR).

### Note historique

Ce site adopte une lecture critique de l'historiographie romaine. Carthage n'a jamais été « détruite » au sens où la propagande romaine le prétend. Les preuves archéologiques montrent que la ville n'a pas été rasée : Rome elle-même a refondé une cité sur le même site, preuve que les infrastructures ont largement survécu. Le récit du sel répandu sur les ruines est un mythe tardif. Carthage a été prise par la force et le sabotage, pas anéantie.

---

## Stack technique

| Technologie | Version | Usage |
|---|---|---|
| **Nuxt 3** | ^3.14 | Framework Vue.js fullstack (SSR/SSG) |
| **Vue 3** | ^3.5 | Framework front-end réactif |
| **Vue Router** | ^4.4 | Routing avec préfixes de langue (`/fr`, `/en`, `/ar`) |
| **Leaflet** | 1.9.4 | Cartes interactives (via CDN) |
| **OpenStreetMap** | — | Tuiles cartographiques |
| **TypeScript** | — | Typage (composables, config) |
| **Google Fonts** | — | Cinzel (headings) + Lora (body) |
| **CSS3** | — | Variables CSS, Grid, Flexbox, RTL |

---

## Structure du projet

```
Carthage/
├── app.vue                          # Point d'entrée Nuxt
├── nuxt.config.ts                   # Configuration Nuxt (head, Leaflet CDN, CSS)
├── package.json                     # Dépendances (nuxt, vue, vue-router)
├── tsconfig.json                    # Configuration TypeScript
│
├── assets/
│   └── css/
│       └── main.css                 # Styles globaux, timeline, RTL, responsive
│
├── components/
│   ├── AppNavbar.vue                # Navigation fixe avec sélecteur de langue
│   ├── AppFooter.vue                # Pied de page avec liens traduits
│   ├── LangSwitcher.vue             # Boutons de changement de langue
│   ├── maps/
│   │   └── CarthageMap.vue          # Carte interactive Leaflet/OpenStreetMap
│   └── tactics/
│       └── BattleTactics.vue        # Diagrammes tactiques SVG (Cannes, Trasimène, Zama)
│
├── composables/
│   └── useI18n.ts                   # Système i18n basé sur l'URL (/fr, /en, /ar)
│
├── i18n/
│   ├── fr.ts                        # Traductions françaises (complètes)
│   ├── en.ts                        # Traductions anglaises (complètes)
│   └── ar.ts                        # Traductions arabes (complètes)
│
├── layouts/
│   └── default.vue                  # Layout principal (navbar + footer)
│
├── middleware/
│   └── locale.global.ts             # Validation des locales dans l'URL
│
└── pages/
    ├── index.vue                    # Redirection / → /fr
    └── [lang]/
        ├── index.vue                # Accueil — hero, figures, carte, galerie
        ├── chronologie.vue          # Timeline interactive (19 événements, 4 périodes)
        ├── elephants.vue            # Traversée des Alpes, batailles, tactiques
        ├── economie.vue             # Commerce, agriculture, monnaie, comparaison
        ├── afrique.vue              # Origine du nom "Afrique", peuples anciens
        └── biographies.vue          # Biographies détaillées avec photos
```

---

## Pages

### Accueil (`/fr`)
- Hero section avec titre animé
- 3 cartes d'introduction (mer, guerre, commerce)
- Figures marquantes : Didon, Hamilcar, Hannibal
- Carte interactive de l'empire carthaginois
- Galerie d'images historiques (Wikimedia Commons)
- Liens d'exploration vers toutes les pages

### Chronologie (`/fr/chronologie`)
- **19 événements majeurs** de 814 av. J.-C. à 146 av. J.-C.
- Timeline CSS interactive avec points, flèches et tags colorés
- **4 grandes périodes** : Archaïque, Âge d'or, Guerres Puniques, Prise et continuité
- Entièrement traduit en 3 langues

### Les Éléphants (`/fr/elephants`)
- **6 étapes de la traversée** : Carthagène → Pyrénées → Rhône → Alpes → Col → Plaine du Pô
- Section sur les éléphants de guerre (espèce, rôle, survie, héritage)
- Chiffres clés (1600 km, 37 éléphants, 15 jours, etc.)
- **4 batailles détaillées** : Tessin, Trébie, Trasimène, Cannes
- **Carte interactive** : route d'Hannibal avec batailles
- **Galerie d'images** : peintures de Goya, Leutemann, Poussin, Slodtz
- **Diagrammes tactiques SVG** avec analyse en 3 phases :
  - Cannes — le double enveloppement
  - Lac Trasimène — la plus grande embuscade de l'histoire
  - Zama — neutralisation des éléphants

### Économie (`/fr/economie`)
- **4 piliers** : Commerce maritime, Agriculture, Mines, Artisanat
- **Routes commerciales** (Nord/Est/Sud/Ouest) avec exports/imports
- Agriculture scientifique de Magon (traité en 28 volumes)
- Monnaie et finance (électrum, fiscalité, commerce silencieux)
- Chiffres économiques (700 000 hab., 300 kg argent/jour, etc.)
- **Tableau comparatif** Carthage vs Rome
- **Carte interactive** des routes commerciales et zones agricoles
- Images : port circulaire (Cothon), musée national

### Afrique (`/fr/afrique`)
- **4 théories** sur l'origine du nom (Afri/Ifri, Afar, Aprica, Aphrike)
- Timeline de l'évolution du nom (814 av. J.-C. → XVIe siècle)
- Peuples pré-carthaginois : Berbères, Numides, Garamantes, Capsiens
- Identité africaine de Carthage (6 aspects)
- Héritage (nom du continent, exploration, urbanisme, agriculture)
- Le saviez-vous ? (6 faits : Saint Augustin, Ifriqiya, Périple d'Hannon...)

### Biographies (`/fr/biographies`)
- **7 biographies détaillées** avec photos Wikimedia Commons :
  - Didon (Élyssa) — fondatrice
  - Hamilcar Barca — père d'Hannibal
  - Hannibal Barca — le stratège
  - Hasdrubal Barca — frère d'Hannibal
  - Magon Barca — héros de Cannes
  - Hannon le Navigateur — explorateur
  - Massinissa — roi de Numidie
- **4 figures secondaires** : Sophonisbe, Hasdrubal le Beau, Xanthippe, Magon l'Agronome
- Texte alterné gauche/droite avec images
- Réalisations majeures listées pour chaque figure

---

## Carte interactive

Le composant `CarthageMap.vue` utilise Leaflet + OpenStreetMap et propose 3 vues :

| Vue | Contenu affiché |
|---|---|
| **Âge d'or** | Territoires (Afrique, Sicile, Sardaigne), routes commerciales, zones agricoles (Cap Bon, Medjerda, Byzacène), industries (Cothon, ateliers de pourpre, mines) |
| **Guerres Puniques** | + Territoire d'Espagne (Barcides), routes commerciales |
| **Route d'Hannibal** | Tracé complet Carthagène → Italie, 7 batailles marquées |

### Données cartographiques
- **17+ villes** : Carthage, Utique, Hadrumète, Kerkouane, Dougga, Carthagène, Gadès, Ibiza, Palerme, Lilybée, Cagliari, Lixus, Mogador, Tipasa, Hippo Regius...
- **7 batailles** : Cannes, Trasimène, Trébie, Zama, Tessin, Himère, Métaure
- **4 zones agricoles** : Cap Bon, Vallée de la Medjerda, Byzacène, Sahel tunisien
- **4 sites industriels** : Port de Carthage (Cothon), ateliers de pourpre, mines de Carthagène, mines de Sierra Morena
- **6 routes commerciales** : Sicile, Sardaigne, Espagne, Maroc, Égypte, Bretagne (étain)

---

## Diagrammes tactiques

Le composant `BattleTactics.vue` génère des diagrammes SVG interactifs pour 3 batailles :

### Cannes (216 av. J.-C.)
- Forces : 50 000 Carthaginois vs 86 000 Romains
- Tactique : centre convexe gaulois qui recule → infanterie libyenne pivote → cavalerie complète l'encerclement
- Résultat : 50 000–70 000 morts romains, 80 sénateurs tués

### Lac Trasimène (217 av. J.-C.)
- Forces : 55 000 cachés vs 30 000 en colonne de marche
- Tactique : embuscade dans un défilé entre lac et collines, brouillard
- Résultat : 15 000 morts, consul Flaminius tué, 3 heures

### Zama (202 av. J.-C.)
- Forces : 36 000 + 80 éléphants vs 34 000 + 8 700 cavaliers
- Tactique : couloirs pour éléphants, combat d'infanterie, cavalerie numide au dos
- Résultat : défaite d'Hannibal, fin de la deuxième guerre punique

---

## Internationalisation (i18n)

| Fonctionnalité | Détail |
|---|---|
| **Routing** | Préfixes URL : `/fr`, `/en`, `/ar` |
| **Composable** | `useI18n()` → `t`, `locale`, `setLocale`, `localePath` |
| **Fichiers** | `i18n/fr.ts`, `i18n/en.ts`, `i18n/ar.ts` |
| **RTL** | Support complet pour l'arabe (direction, alignement, bordures) |
| **Sélecteur** | Drapeaux dans la navbar : 🇫🇷 FR / 🇬🇧 EN / 🇹🇳 AR |
| **Middleware** | Validation automatique des locales, redirection vers `/fr` |

---

## Design

- **Palette** : Or (#c9a84c), Bordeaux (#6b1d2a), Marine (#1a1a2e), Sable (#f5e6c8)
- **Typographie** : Cinzel (titres, navigation) + Lora (corps de texte)
- **Responsive** : Mobile-first avec breakpoint à 768px / 900px
- **Animations** : Hover sur cartes, transitions de navigation, scroll navbar

---

## Sources historiques et images

### Sources historiques
- Polybe — *Histoires* (IIe siècle av. J.-C.)
- Tite-Live — *Ab Urbe Condita* (Ier siècle av. J.-C.)
- Appien — *Les Guerres puniques* (IIe siècle ap. J.-C.)
- Diodore de Sicile — *Bibliothèque historique*
- Plutarque — *Vies parallèles*
- Serge Lancel — *Carthage* (Fayard, 1992)
- Gilbert & Colette Charles-Picard — *La vie quotidienne à Carthage au temps d'Hannibal*
- Dexter Hoyos — *The Carthaginians* (Routledge, 2010)

### Images (Wikimedia Commons)
Toutes les images utilisées proviennent de Wikimedia Commons et sont dans le domaine public ou sous licence libre :
- Peintures : Pierre-Narcisse Guérin, Francisco de Goya, Heinrich Leutemann, Nicolas Poussin
- Sculptures : Sébastien Slodtz (Louvre)
- Photographies : Ruines de Carthage, Thermes d'Antonin, Port circulaire, Musée national de Carthage
- Numismatique : Pièces de Massinissa, monnaies Barcides

---

## Installation et développement

```bash
# Cloner le dépôt
git clone <repo-url>
cd Carthage

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview

# Générer un site statique
npm run generate
```

### Prérequis
- Node.js >= 18
- npm ou bun

---

## Licence

Projet éducatif. Les images proviennent de Wikimedia Commons (domaine public / CC).
Les textes sont rédigés à des fins éducatives et culturelles.

---

*Dédié à la mémoire de Carthage et de ses héros — de Didon à Hannibal, de Hamilcar à Hannon.*
