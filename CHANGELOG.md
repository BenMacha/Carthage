# Journal des modifications

Toutes les modifications notables du site **Carthage — Qart-Ḥadasht** (https://carthage.benmacha.tn).
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/). Les dates sont celles du déploiement.
Chaque entrée indique **ce qui a changé** et, quand c'est utile, **les fichiers concernés**.

---

## [Non publié] — Site en 15 langues (branche `i18n-15-langues`)

> En cours : traductions à terminer (voir `I18N-HANDOFF.md`). À dater au déploiement final.
> **Publication progressive** : chaque langue est fusionnée sur `main` et déployée dès qu'elle atteint 100 % et passe les vérifications — sans attendre les 12 langues. Un texte non traduit reste en français : rien ne casse pour les visiteurs.
> - ✅ **russe, chinois simplifié, japonais** : 100 %, déployés.
> - ⏳ italien (89 %), espagnol/allemand/portugais (~10 %), néerlandais/turc/maltais/tunisien/tamazight (0 %) : en cours.

### Langues
- **12 langues ajoutées** au français, à l'anglais et à l'arabe : italien, espagnol, allemand, portugais, néerlandais, turc, russe, chinois simplifié, japonais, et en **bêta** maltais, tunisien (derja, écriture arabe, de droite à gauche) et tamazight (écriture latine amazighe).
- Registre unique `i18n/locales.json` : code, nom local, sens d'écriture, `hreflang`, locale Open Graph, drapeau, nom local de Carthage (Cartagine, Karthago, Карфаген, 迦太基, カルタゴ, Qarṭaǧ…), statut bêta.
- Les langues bêta affichent un bandeau qui renvoie vers la version française de la page.

### Interface
- **Sélecteur de langue avec drapeaux** (`components/LangPicker.vue`, `components/FlagIcon.vue`) : bouton drapeau + code, panneau des 15 langues ; fermeture par clic extérieur ou Échap ; panneau 2 colonnes sur mobile. Drapeaux dessinés en SVG (Windows n'affiche pas les drapeaux emoji) ; drapeau amazigh pour le tamazight, tunisien pour le derja.
- Menu mobile (`AppNavbar.vue`) : les 15 langues avec drapeaux (grille 3 colonnes, 2 sous 400 px) au lieu des anciens boutons FR/EN/ع.
- **Langue inconnue dans l'URL → redirection vers l'arabe** (`/ar`, code 302) au lieu du français (`middleware/locale.global.ts`).
- **La racine `/` redirige aussi vers l'arabe** (`/ar`, code 302) au lieu du français (`nuxt.config.ts`, `routeRules`) — décision explicite du commanditaire du site.
- Polices : Noto Sans ajoutée (cyrillique) ; pile de polices système pour le chinois et le japonais ; pas d'espacement de lettres sur les titres CJK ; césure automatique pour l'allemand, le néerlandais, le russe, le turc et le maltais (`assets/css/main.css`).
- Sens de lecture : flèches et mises en page RTL calculées pour toute langue RTL (arabe et tunisien), plus seulement l'arabe.

### Architecture de traduction
- Le français, l'anglais et l'arabe restent dans le code. Les autres langues sont des tables plates `{ "chemin.vers.texte": "traduction" }` dans `i18n/locales/<langue>/<clé>.json`, appliquées sur la version française (un texte manquant reste en français : rien ne casse).
- `composables/useLocalized.ts` : `useLocalized()` (pages, chargement à la demande de la seule langue affichée), `useLocalizedData()` (glossaire, quiz, bibliographie), `useUiText()` (navbar, pied de page, recherche, sources), `localizeSiteMap()`. `utils/i18n-flat.ts` : `applyFlat()`.
- `composables/useI18n.ts` : lit le registre ; `LOCALE_CODES`, `isRtlLocale()`, `availableLocales`.
- Les 41 pages utilisent `await useLocalized('<page>', C)` ; changement de langue = remontage de la page (`app.vue`, clé = chemin).

### Scripts
- `scripts/i18n/extract.mjs` : extrait les textes FR/EN/AR des pages, composants et données vers `i18n/source/` (48 fichiers, 7 215 textes, ≈ 396 000 caractères par langue).
- `scripts/i18n/check.mjs` : vérifie chaque langue (manquants, clés inconnues, balises HTML, écriture attendue, textes non traduits).
- `scripts/i18n/translate-ollama.mjs` : traduction locale avec Ollama (reprise possible, schéma JSON imposé).
- `i18n/BRIEF.md` (consignes et noms propres par langue) et `i18n/chunks.json` (3 lots équilibrés).

### SEO
- `hreflang` pour les 15 langues + `x-default` (`zh-Hans` pour le chinois), `og:locale` et alternatives, JSON-LD dans la langue de la page.
- `sitemap.xml` : 615 URL (41 pages × 15 langues) ; feuille XSL avec compteurs et pastilles de langues.
- Index de recherche statique généré pour les 15 langues (`public/search/<langue>.json`).

---

## [2026-09-30] — Recherche statique, SEO, menu « Ressources »

### Recherche
- **Nouvel index par mots-clés, 100 % statique** (`scripts/generate-search-keywords.mjs`) : le texte de chaque page est lu directement dans son code source (objet `C` des fichiers `pages/[lang]/*.vue`), sans serveur. L'index est donc **régénéré par Cloudflare à chaque déploiement** : la recherche n'est plus jamais périmée.
  - Fichiers produits : `public/search/fr.json`, `en.json`, `ar.json` (109 entrées par langue : 41 pages + 68 termes du glossaire ; ≈ 170 Ko, ≈ 65 Ko compressé, chargé seulement à l'ouverture de la recherche).
  - Chaque terme du glossaire est une entrée qui mène directement à sa définition (`/fr/glossaire#suffete`).
  - Tous les mots distincts sont indexés : « garum », « Pyrgi », « Xanthippe »… sont trouvables.
- `components/SiteSearch.vue` adapté au nouvel index (score : titre > mot-clé exact > début de mot > description).
- **Supprimé** : `scripts/generate-search-index.mjs` (ancien index plein texte qui devait démarrer un serveur Node après le build — incompatible avec Cloudflare Workers).
- `package.json` : l'index est généré dans `prebuild` (avec le sitemap et les crédits) ; script manuel `npm run search`.

### Corrigé
- **Recherche** : la touche Échap ne fermait pas le panneau ; l'animation de fermeture de Vue pouvait laisser une couche invisible qui bloquait les clics. Remplacée par une animation CSS à l'ouverture, fermeture immédiate. Le focus revient sur le bouton 🔍 à la fermeture.
- **Menu mobile** (`AppNavbar.vue`) : même correction pour le tiroir.
- **Quiz** : l'équipe d'Algérie est nommée « محاربو الصحراء » (au lieu de « ثعالب الصحراء »).

### SEO et partage
- **Image de partage propre à chaque page** (Open Graph / Twitter) : titre, description et image tirés de `assets/data/site-map.json` (nouveaux champs `image` et `type`).
- **Données structurées schema.org (JSON-LD)** sur toutes les pages : `WebSite`, fil d'Ariane `BreadcrumbList` (Accueil › rubrique › page), `WebPage` ; les 10 biographies sont déclarées `about: Person` et `og:type = profile`.
- `og:locale:alternate` pour les deux autres langues.
- Fichier concerné : `layouts/default.vue`.

### Navigation et accessibilité
- **Menu « Ressources »** : Quiz, Glossaire, Sources et bibliographie, Plan du site (`AppNavbar.vue`).
- **Accueil** : 4 tuiles supplémentaires — Quiz, Glossaire, Monde punique, Vie quotidienne (`pages/[lang]/index.vue`).
- **Lien d'évitement « Aller au contenu »** visible au clavier (`layouts/default.vue`).

### Documentation
- Ce fichier `CHANGELOG.md`.
- `README.md` : scripts, recherche, glossaire, quiz, harmonisation de l'arabe, procédure d'ajout de page.

---

## [2026-09-30] — Correctif de déploiement

### Corrigé
- Le build Cloudflare échouait : le script d'index lancé après le build tentait d'exécuter `.output/server/index.mjs`, qui est un Worker avec le preset `cloudflare-module`. Le script lit désormais le preset dans `.output/nitro.json` et n'est plus bloquant. *(Remplacé depuis par l'index statique ci-dessus.)*

---

## [2026-09-30] — Nouvelles pages, quiz, sources, harmonisation de l'arabe

### Ajouté — pages (FR/EN/AR)
- `/guerre-des-mercenaires` — la « guerre inexpiable » (241–237, Polybe I, 65–88), Salammbô de Flaubert : ce qui est historique, ce qui est inventé.
- `/monde-punique` — 23 cités en 6 régions (Sicile, Sardaigne, Ibiza-Baléares-Gadir, Malte, Tripolitaine, Maghreb), filtre par région, Motyé 397, déchiffrement de l'alphabet (cippes de Melqart, 1758).
- `/vie-quotidienne` — maison, recette de la *puls punica* (Caton), vêtements, 12 noms puniques et leur sens, calendrier, fêtes, enfance.
- `/glossaire` — 68 termes (données : `assets/data/glossaire.json`), recherche, filtre par catégorie, index alphabétique, ancre par terme.
- `/massinissa` et `/hannon-le-grand` — biographies.
- `/heritage` — Carthage dans la littérature, l'opéra, la peinture, le cinéma, la BD et les jeux, la mémoire tunisienne, les expressions.
- `/quiz` — 6 thèmes × 10 questions (données : `assets/data/quiz.json`), réponses vérifiables sur le site, meilleur score local.

### Ajouté — contenus
- `/art-et-artisanat` : 9 photos d'objets puniques (Louvre, Bardo, Madrid, exposition « Carthago ») à la place des lettres de remplacement.
- `/prise-de-carthage` : section « Les défenses de Carthage » (Appien, *Libyca* 95).
- `/biographies` : 21 figures (Magonides, Syphax, Hannon le Grand, Hasdrubal Giscon…).
- **Bloc « Sources de cette page »** (composant `components/PageSources.vue`) sur 36 pages : sources antiques avec passages précis, travaux modernes.
- **Recherche plein texte** (bouton 🔍, `Ctrl/⌘ K`) — voir plus haut pour la version actuelle.

### Modifié
- **Harmonisation de l'arabe** (`scripts/harmonize-arabic.py`, 441 remplacements) : بونيقي (au lieu de بوني), التوفيت, شفط, شيقل, أشمون, ملقرت, حملكون, حنون, آل برقا, أبيانوس, ديودوروس, كاتو, شنيسر, ديكري.
- Navigation, pied de page (4 colonnes), plan du site, sitemap (123 URL), `llms.txt` et crédits (78 images) mis à jour.

---

## [2026-09-28] — Enrichissement depuis Wikipédia

Sources : articles Wikipédia « Carthage » et « Civilisation carthaginoise » (CC BY-SA 4.0, **reformulés**, faits vérifiés, sources antiques et savantes citées ; affirmations douteuses écartées).

### Ajouté
- `/institutions` — suffètes, Sénat, Cent-Quatre, assemblée du peuple ; schéma des institutions ; Aristote ; société, femmes, Libyens.
- `/art-et-artisanat` — 12 catégories d'objets avec filtre, architecture, nécropoles, musées.
- `/langue-ecriture` — alphabet phénicien (22 lettres), « écrivez votre nom en phénicien », inscriptions, littérature perdue.
- `/apres-146` — Carthage romaine, vandale, byzantine, conquête arabe, ville moderne ; fouilles ; site archéologique.
- `/bibliographie` — 12 sources antiques + 47 ouvrages (données : `assets/data/bibliographie.json`), filtre et recherche.
- Menu « Civilisation » ; pied de page en 4 colonnes ; attribution Wikipédia sur `/credits`.

### Modifié
- Pages enrichies : fondation (réseau phénicien, substrat libyen), guerres-puniques (guerres de Sicile, traités avec Rome), afrique (métissage, ADN ancien), chronologie (+7 événements), armée (marine), économie, agriculture, religion (panthéon complet), tunisie (la commune aujourd'hui).

### Corrigé
- Fondation : « égouts » → citernes, rigoles et puisards.
- Accueil : le masque grimaçant est au musée du Bardo (et non au musée de Carthage).

---

## [2026-09-28] — Compléments historiques

### Ajouté
- `/plan-du-site` (FR/EN/AR) et habillage lisible de `sitemap.xml` (`public/sitemap.xsl`), générés depuis `assets/data/site-map.json` ; le build échoue si une page n'y figure pas.
- Arbre des Barcides complété : trois filles, gendres (Bomilcar, Hasdrubal le Beau, Naravas), Imilce, descendance ; ascendance légendaire ; liens incertains en pointillés ; panneau « Pourquoi tant de noms manquent ».
- `/prise-de-carthage` : « Massinissa, l'autre artisan de la chute » ; « Carthage n'a pas disparu ».
- `/hannibal` : « Pourquoi Hannibal n'est-il pas entré dans Rome ? ».
- Composant `AltReading.vue` : encadrés « Une autre lecture — le point de vue de l'auteur du site », suivis de ce qu'en disent les sources.

### Modifié
- Titres de page harmonisés (« — Carthage » / « — قرطاج »).

---

## [2026-09-28] — Refonte complète (design « Pages III »)

### Ajouté
- Nouveau design system bento (`assets/css/main.css`) : Archivo / Instrument Sans, tuiles, grille 12 colonnes, responsive 375 → 1440 px, RTL par propriétés logiques.
- Barre de navigation en pilule avec menus et tiroir mobile ; nouveau pied de page.
- Pages : tunisie, histoire-des-vainqueurs, religion, agriculture, carte (carte animée D3), tactiques, lieux, richesse-rome, credits.
- Carte animée `components/maps/AnimatedMap.vue` (territoires, campagne d'Hannibal, voyages, alliés), intégrable dans les pages.
- SEO : canonical, hreflang, Open Graph, `lang`/`dir` côté serveur ; `sitemap.xml` généré, `robots.txt`, `llms.txt`.
- 44 images Wikimedia Commons locales avec crédits (`public/img/CREDITS.md`, page `/credits`).

### Modifié
- Toutes les anciennes pages réécrites dans le nouveau style, contenu historique repris, enrichi et corrigé.

### Supprimé
- Carte Leaflet, animations SVG, anciens diagrammes tactiques, `LangSwitcher`, CSS de compatibilité, chaînes i18n inutilisées.

---

## [2026-03] — Première version

- Site Nuxt 3 trilingue (FR/EN/AR) : accueil, chronologie, éléphants, économie, Afrique, biographies, pages de personnages, cartes Leaflet, animations et diagrammes tactiques.
