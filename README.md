# Carthage — Qart-Ḥadasht

> Site éducatif trilingue sur la civilisation punique de Carthage (Tunisie actuelle), de la fondation d'Élissa (814 av. J.-C. selon Timée) à la chute de 146 av. J.-C., et sur l'héritage carthaginois dans la Tunisie d'aujourd'hui.

**Langues :** Français · English · العربية (RTL) — **Production :** https://carthage.benmacha.tn

---

## Aperçu

Application Nuxt 3 (rendu serveur) au design « bento punique contemporain » : tuiles arrondies, couleurs franches (bordeaux, terre cuite, or, bleu nuit, olive), typographies Archivo / Instrument Sans, alphabet phénicien et arabe. Chaque page est entièrement responsive (390 px → 1440 px) et existe en `/fr`, `/en` et `/ar`.

### Approche historique

Les sources sur Carthage sont presque toutes grecques ou romaines (Polybe, Tite-Live, Appien, Plutarque, Diodore, Justin). Le site le dit explicitement, signale les chiffres incertains et les récits discutés, et confronte le récit romain à l'archéologie (page `/histoire-des-vainqueurs`). Exemples : la destruction de 146 fut réelle (incendie, démantèlement, réduction en esclavage), mais le sel répandu sur les ruines est un mythe moderne, et la ville fut refondée sous César et Auguste.

---

## Stack

| Technologie | Usage |
|---|---|
| **Nuxt 3 / Vue 3** | SSR, routage par langue `pages/[lang]/` |
| **D3 7.9 + TopoJSON 3.1** | Carte animée (chargés côté client depuis jsDelivr), fond Natural Earth |
| **Google Fonts** | Archivo, Instrument Sans, Noto Sans Phoenician, Noto Naskh Arabic |
| **CSS** | Design system maison (`assets/css/main.css`) : grille 12 colonnes, tuiles, typographie fluide, RTL par propriétés logiques |

---

## Structure

```
Carthage/
├── CHANGELOG.md              # Journal de toutes les modifications
├── nuxt.config.ts            # <head> global, redirection / → /fr
├── layouts/default.vue       # Navbar + footer, <html lang/dir>, canonical, hreflang,
│                             # Open Graph par page, JSON-LD schema.org, lien « Aller au contenu »
├── assets/
│   ├── css/main.css          # Design system (bento)
│   └── data/
│       ├── site-map.json     # SOURCE UNIQUE des pages : rubrique, titres, descriptions, image de partage
│       ├── glossaire.json    # 68 termes (FR/EN/AR, graphie phénicienne, liens)
│       ├── quiz.json         # 6 thèmes × 10 questions
│       ├── bibliographie.json# Sources antiques + ouvrages modernes
│       └── credits.json      # Crédits images (généré depuis public/img/CREDITS.md)
├── components/
│   ├── AppNavbar.vue         # Barre en pilule, menus Hannibal / Carthage / Civilisation / Ressources, tiroir mobile
│   ├── AppFooter.vue         # Pied de page (4 colonnes, crédits, plan du site)
│   ├── SiteSearch.vue        # Recherche (🔍, Ctrl/⌘ K) dans public/search/<lang>.json
│   ├── PageSources.vue       # Bloc « Sources de cette page »
│   ├── AltReading.vue        # Encadré « Une autre lecture » (point de vue de l'auteur)
│   └── maps/AnimatedMap.vue  # Carte animée D3 (territoires, Hannibal, voyages, alliés)
├── composables/useI18n.ts    # Langue lue dans l'URL, localePath, setLocale
├── i18n/{fr,en,ar}.ts        # Chaînes globales uniquement (nom du site, pied de page)
├── pages/[lang]/*.vue        # 41 pages ; le contenu trilingue vit dans chaque page (objet C)
├── public/
│   ├── img/                  # 78 images Wikimedia Commons + CREDITS.md
│   ├── search/{fr,en,ar}.json# Index de recherche (généré)
│   ├── sitemap.xml, sitemap.xsl # Générés
│   ├── robots.txt, llms.txt
│   └── favicon.svg           # Signe de Tanit
└── scripts/
    ├── generate-sitemap.mjs         # sitemap.xml + sitemap.xsl ; vérifie que chaque page est dans site-map.json
    ├── generate-credits.mjs         # assets/data/credits.json
    ├── generate-search-keywords.mjs # public/search/<lang>.json (sans serveur, compatible Cloudflare)
    └── harmonize-arabic.py          # Unifie les termes arabes (aperçu par défaut, --write pour appliquer)
```

### Pages

| Thème | Routes |
|---|---|
| Repères | `/` (accueil), `/chronologie`, `/carte`, `/tunisie`, `/histoire-des-vainqueurs`, `/quiz` |
| Histoire | `/fondation`, `/guerres-puniques`, `/guerre-des-mercenaires`, `/prise-de-carthage`, `/apres-146`, `/richesse-rome`, `/afrique`, `/lieux`, `/monde-punique` |
| Hannibal & guerre | `/hannibal`, `/tactiques`, `/elephants`, `/armee` |
| Civilisation | `/institutions`, `/economie`, `/agriculture`, `/religion`, `/art-et-artisanat`, `/langue-ecriture`, `/vie-quotidienne`, `/heritage` |
| Personnages | `/biographies`, `/didon`, `/hamilcar`, `/hasdrubal`, `/magon-barca`, `/hannon`, `/magon-agronome`, `/sophonisbe`, `/massinissa`, `/hannon-le-grand` |
| Site | `/plan-du-site`, `/bibliographie`, `/glossaire`, `/credits` |

### Ajouter une page

1. Créer `pages/[lang]/ma-page.vue` avec `<div class="pg">` à la racine et un objet `const C = { fr, en, ar }` (voir `tunisie.vue`). **Tout le texte doit être dans `C`** : c'est là que la recherche le lit.
2. Utiliser les classes du design system (`.bento`, `.tile--*`, `.h-section`, `.rows`, `.fig`…) et terminer par `<PageSources :items="c.sources" />`.
3. Ajouter la page dans `assets/data/site-map.json` (rubrique, titre, description, `image`) — **sinon le build échoue**.
4. Ajouter le lien dans `AppNavbar.vue` / `AppFooter.vue` et une ligne dans `public/llms.txt`.
5. Consigner la modification dans `CHANGELOG.md`.

Le sitemap, les crédits et l'index de recherche se régénèrent tout seuls au build.

La carte s'intègre dans n'importe quelle page :

```vue
<MapsAnimatedMap compact initial-mode="hann" :modes="['hann', 'all']" />
```

### Recherche

L'index est **statique** : `scripts/generate-search-keywords.mjs` lit le texte des pages dans leur code source (objet `C`), les descriptions de `site-map.json` et les termes du glossaire, puis écrit `public/search/<lang>.json`. Il tourne avant chaque build (`prebuild`), y compris sur Cloudflare : aucun serveur n'est nécessaire et l'index suit toujours le contenu. La recherche ignore les accents et les voyelles arabes.

### Arabe

`npm run harmonize-ar` affiche les termes arabes à harmoniser ; `python3 scripts/harmonize-arabic.py --write` les corrige (formes retenues dans le glossaire : بونيقي، التوفيت، شفط…). À lancer après l'ajout de contenu arabe.

---

## Développement

```bash
npm install
npm run dev        # http://localhost:3000 → /fr
npm run build      # prebuild (sitemap, crédits, index de recherche) puis build
npm run preview
npm run search     # régénérer seulement l'index de recherche
```

Prérequis : Node.js ≥ 18 (et Python 3 pour l'harmonisation de l'arabe).
Déploiement : chaque push sur `main` est construit et publié par **Cloudflare Workers Builds** (`npm run build`, preset `cloudflare-module`).

---

## Sources

- Polybe, *Histoires* · Tite-Live, *Ab Urbe Condita* · Appien, *Libyca* · Diodore de Sicile · Plutarque · Justin · Pline l'Ancien · Cornelius Nepos · *Périple d'Hannon*
- Serge Lancel, *Carthage* (Fayard, 1992) · Gilbert & Colette Charles-Picard, *La vie quotidienne à Carthage au temps d'Hannibal* · Dexter Hoyos, *The Carthaginians* (Routledge, 2010)

## Images et licences

Les 78 images proviennent de Wikimedia Commons (domaine public, CC BY, CC BY-SA, Licence Art Libre). Auteur, lien et licence de chacune : `public/img/CREDITS.md` et la page `/credits` du site. Après avoir ajouté une image, ajoutez sa ligne dans `CREDITS.md` : `assets/data/credits.json` est régénéré au build (`npm run credits` à la main).
