# Reprise du chantier « site en 15 langues »

> Document de passation (3 octobre 2026). À supprimer une fois le chantier publié.
> Branche de travail : **`i18n-15-langues`**. La production (`main`, commit `db6f878`) n'a pas encore ces changements.

## 1. Où on en est

L'**infrastructure multilingue est terminée** et testée en local (build OK, 15 langues servies, sélecteur de langue avec drapeaux, RTL pour le tunisien). Il reste à **finir les traductions**, puis vérifier, documenter et publier.

Avancement au moment de la passation (`node scripts/i18n/check.mjs`) :

| Langue | Code | Avancement | Remarque |
|---|---|---|---|
| Russe | `ru` | 88 % | lots 0/1/2 entamés par des agents |
| Italien | `it` | 89 % | `armee`, `art-et-artisanat`, `fondation` traduits par un modèle local (qwen3:14b) : **à relire** |
| Japonais | `ja` | 72 % | |
| Chinois | `zh` | 71 % | |
| Portugais | `pt` | 11 % | |
| Espagnol | `es` | 10 % | |
| Allemand | `de` | 10 % | |
| Néerlandais | `nl` | 0 % | |
| Turc | `tr` | 0 % | |
| Maltais | `mt` | 0 % | bêta |
| Tunisien (derja) | `aeb` | 0 % | bêta, écriture arabe, RTL |
| Tamazight | `ber` | 0 % | bêta, écriture latine amazighe |

Total par langue : **7 215 textes** (≈ 396 000 caractères) répartis en **48 fichiers**. Un texte non traduit s'affiche en français : rien ne casse, mais on ne publie qu'à 100 %.

## 2. Comment fonctionne la traduction

- Le français, l'anglais et l'arabe restent dans le code (objet `C` de chaque page, dictionnaires des composants, `assets/data/*.json`).
- `node scripts/i18n/extract.mjs` produit `i18n/source/<clé>.json` (`{ key, fr, en, ar }`, chemins à plat). **Déjà fait** : à relancer seulement si un texte FR/EN/AR change.
- Chaque langue ajoutée = `i18n/locales/<langue>/<clé>.json`, objet **plat** `{ "chemin.du.texte": "traduction" }` avec exactement les chemins de `fr`.
- Registre des langues : `i18n/locales.json` (nom, sens, hreflang, drapeau, nom local de Carthage, statut bêta).
- Vérification : `node scripts/i18n/check.mjs` (résumé), `node scripts/i18n/check.mjs <langue>` (détail), `node scripts/i18n/check.mjs <langue> <clé>` (un fichier). Contrôle : textes manquants, clés inconnues, valeurs vides, balises HTML, écriture attendue (cyrillique, chinois, japonais, arabe), textes restés en français.
- **Consignes de traduction : `i18n/BRIEF.md`** (règles + noms propres par langue). **Lots : `i18n/chunks.json`** (3 lots de 16 clés, équilibrés en volume).
- `scripts/i18n/translate-ollama.mjs` : variante locale gratuite (Ollama). Qualité correcte en italien, **mauvaise en maltais et tunisien** : ne pas l'utiliser pour `mt`, `aeb`, `ber`.

## 3. Ce qu'il reste à faire, dans l'ordre

### Étape 1 — Finir les traductions
1. `node scripts/i18n/check.mjs` → liste les langues incomplètes.
2. Pour chaque langue incomplète, lancer **3 agents** (un par lot de `i18n/chunks.json`), par vagues de 3 langues pour limiter la consommation :
   - vague A : `ru`, `zh`, `ja` (les plus avancées, à terminer)
   - vague B : `it`, `nl`, `tr`
   - vague C : `es`, `de`, `pt`
   - vague D : `mt`, `aeb`, `ber`
3. Prompt type d'un agent :
   > Lis `i18n/BRIEF.md` et applique-le strictement. LANGUE : `<code>` (`<nom>`). CLÉS (lot `<n>`) : `<les 16 clés du lot dans i18n/chunks.json>`. Certains fichiers `i18n/locales/<code>/<clé>.json` existent déjà, complets ou partiels : lance d'abord `node scripts/i18n/check.mjs <code> <clé>` ; si 100 % OK, passe ; sinon complète (garde les traductions valides, ajoute les manquantes). Ne touche qu'à ces clés pour cette langue. Traduis toi-même, sans outil externe. Termine par un rapport : clé → % et OK/problèmes.
4. Relire l'italien de `armee`, `art-et-artisanat`, `fondation` (sorti d'un modèle local : ex. « scagnozzi » au lieu de « frombolieri » pour les frondeurs baléares).
5. Contrôle de cohérence aléatoire sur `aeb` (vraie derja tunisienne, pas d'arabe standard) et `ber` (tamazight lisible, pas de mots inventés).
6. Objectif : `node scripts/i18n/check.mjs` → **les 12 langues à 100 % et OK**. Committer régulièrement (`git add i18n/locales && git commit`).

### Étape 2 — Build et vérifications
1. `npm ci` puis `npm run build` (le `prebuild` régénère sitemap, crédits et index de recherche `public/search/<langue>.json` pour les 15 langues).
2. `node .output/server/index.mjs` puis vérifier :
   - les **615 URL** du sitemap répondent 200 (`public/sitemap.xml`) ;
   - `lang` et `dir` corrects sur chaque langue (`aeb` et `ar` en `rtl`) ; 16 liens `hreflang` par page ;
   - `/xx` (langue inconnue) → redirection 302 vers `/ar` ; `/` → `/fr` ;
   - pas de débordement horizontal à 375 px (mobile), en particulier `de`, `ru`, `nl`, `tr` (mots longs) ;
   - captures d'écran desktop + mobile de l'accueil et d'une page longue en `zh`, `ja`, `ru`, `aeb`, `ber` ; aucune erreur JS dans la console ;
   - la recherche (🔍) trouve des mots dans chaque langue ;
   - le bandeau « bêta » s'affiche pour `aeb`, `ber`, `mt` et renvoie vers la page française.

### Étape 3 — Documentation (obligatoire : tout est consigné dans le CHANGELOG)
1. **`CHANGELOG.md`** : compléter l'entrée « [Non publié] — Site en 15 langues » (déjà amorcée en tête du fichier) avec la date réelle de mise en ligne et les chiffres finaux.
2. **`README.md`** : ajouter une section « Langues / traduction » : registre `i18n/locales.json`, `extract.mjs`, `check.mjs`, `BRIEF.md`, `translate-ollama.mjs`, et la marche à suivre pour **ajouter une langue** (entrée dans le registre + drapeau dans `components/FlagIcon.vue` + fichiers `i18n/locales/<code>/` + `check.mjs` à 100 %). Mettre à jour l'arborescence (ligne `i18n/`).
3. **`public/llms.txt`** : mentionner les 15 langues et leurs préfixes d'URL.
4. Supprimer ce fichier `I18N-HANDOFF.md`.

### Étape 4 — Publication
1. Fusionner `i18n-15-langues` dans `main` et pousser : **Cloudflare Workers Builds déploie automatiquement `main`** sur https://carthage.benmacha.tn.
2. Suivre le build : `gh api repos/BenMacha/Carthage/commits/<sha>/check-runs --jq '.check_runs[] | {name, status, conclusion}'`.
3. Vérifier en production : `/it`, `/zh`, `/aeb`, `/sitemap.xml`, `/search/ja.json`.

## 4. Règles du projet à respecter
- Répondre à l'utilisateur **en français, de façon détaillée**.
- **Tout changement est consigné dans `CHANGELOG.md`.**
- Commits terminés par :
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  ```
- Ne pas publier sur `main` tant que les 12 langues ne sont pas à 100 % et vérifiées.
- Les encadrés « Une autre lecture » (thèse de l'auteur du site sur Hannibal et Rome) sont attribués et doivent rester traduits fidèlement, sans adoucir ni renforcer.

## 5. Décisions en attente de l'utilisateur (ne pas trancher seul)
- Faire rediriger la racine `/` vers l'arabe au lieu du français ? (aujourd'hui : `/` → `/fr`, langue inconnue → `/ar`.)
- Prototype 3D WebGL du port du Cothon (Three.js / TresJS) : proposé, pas encore validé.
- Activer Cloudflare Polish (images WebP) : proposé.

## 6. Fichiers clés du chantier
- `i18n/locales.json`, `i18n/source/`, `i18n/locales/<langue>/`, `i18n/BRIEF.md`, `i18n/chunks.json`
- `composables/useI18n.ts`, `composables/useLocalized.ts`, `utils/i18n-flat.ts`, `middleware/locale.global.ts`
- `components/LangPicker.vue`, `components/FlagIcon.vue`, `components/AppNavbar.vue`, `layouts/default.vue`, `app.vue`
- `scripts/i18n/extract.mjs`, `scripts/i18n/check.mjs`, `scripts/i18n/translate-ollama.mjs`
- `scripts/generate-sitemap.mjs`, `scripts/generate-search-keywords.mjs`
