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
├── nuxt.config.ts            # <head> global, redirection / → /fr
├── layouts/default.vue       # Navbar + footer, <html lang/dir>, canonical, hreflang, Open Graph
├── assets/
│   ├── css/main.css          # Design system (bento)
│   └── data/credits.json     # Crédits images (généré depuis public/img/CREDITS.md)
├── components/
│   ├── AppNavbar.vue         # Barre en pilule, menus Hannibal / Carthage, tiroir mobile
│   ├── AppFooter.vue         # Pied de page (liens, crédits)
│   └── maps/AnimatedMap.vue  # Carte animée D3 (territoires, Hannibal, voyages, alliés)
├── composables/useI18n.ts    # Langue lue dans l'URL, localePath, setLocale
├── i18n/{fr,en,ar}.ts        # Chaînes globales uniquement (nom du site, pied de page)
├── middleware/locale.global.ts
├── pages/[lang]/*.vue        # 27 pages ; le contenu trilingue vit dans chaque page (objet C)
├── public/
│   ├── img/                  # 44 images Wikimedia Commons + CREDITS.md
│   ├── sitemap.xml           # Généré (voir scripts/)
│   ├── robots.txt
│   ├── llms.txt              # Plan du site pour les assistants IA
│   └── favicon.svg           # Signe de Tanit
└── scripts/generate-sitemap.mjs   # Lancé avant chaque build
```

### Pages

| Thème | Routes |
|---|---|
| Repères | `/` (accueil), `/chronologie`, `/carte`, `/tunisie`, `/histoire-des-vainqueurs` |
| Histoire | `/fondation`, `/guerres-puniques`, `/prise-de-carthage`, `/richesse-rome`, `/afrique`, `/lieux` |
| Hannibal & guerre | `/hannibal`, `/tactiques`, `/elephants`, `/armee` |
| Civilisation | `/economie`, `/agriculture`, `/religion` |
| Personnages | `/biographies`, `/didon`, `/hamilcar`, `/hasdrubal`, `/magon-barca`, `/hannon`, `/magon-agronome`, `/sophonisbe` |
| Divers | `/credits` |

### Ajouter une page

1. Créer `pages/[lang]/ma-page.vue` avec `<div class="pg">` à la racine et un objet `C = { fr, en, ar }` (voir `tunisie.vue`).
2. Utiliser les classes du design system (`.bento`, `.tile--*`, `.h-section`, `.rows`, `.fig`…).
3. Ajouter le lien dans `AppNavbar.vue` / `AppFooter.vue` et une ligne dans `public/llms.txt`.
4. Le sitemap se régénère tout seul au build (`npm run sitemap` pour le faire à la main).

La carte s'intègre dans n'importe quelle page :

```vue
<MapsAnimatedMap compact initial-mode="hann" :modes="['hann', 'all']" />
```

---

## Développement

```bash
npm install
npm run dev        # http://localhost:3000 → /fr
npm run build      # génère le sitemap puis build SSR (.output/)
npm run preview
```

Prérequis : Node.js ≥ 18.

---

## Sources

- Polybe, *Histoires* · Tite-Live, *Ab Urbe Condita* · Appien, *Libyca* · Diodore de Sicile · Plutarque · Justin · Pline l'Ancien · Cornelius Nepos · *Périple d'Hannon*
- Serge Lancel, *Carthage* (Fayard, 1992) · Gilbert & Colette Charles-Picard, *La vie quotidienne à Carthage au temps d'Hannibal* · Dexter Hoyos, *The Carthaginians* (Routledge, 2010)

## Images et licences

Les 44 images proviennent de Wikimedia Commons (domaine public, CC BY, CC BY-SA, Licence Art Libre). Auteur, lien et licence de chacune : `public/img/CREDITS.md` et la page `/credits` du site. Après avoir ajouté une image, ajoutez sa ligne dans `CREDITS.md` : `assets/data/credits.json` est régénéré au build (`npm run credits` à la main).
