# Carthage — brief de traduction (agents)

Projet : racine du dépôt `BenMacha/Carthage` — site historique sur Carthage (FR/EN/AR d'origine).

## Ce que tu traduis
Des fichiers sources `i18n/source/<clé>.json` de la forme :
```json
{ "key": "hannibal", "fr": { "chemin.du.texte": "Texte français", … }, "en": { … même chemins, version anglaise … }, "ar": { … version arabe … } }
```
Le **français est la source**. L'anglais (et l'arabe) sont des références pour lever les ambiguïtés.

Pour chaque clé attribuée, écris `i18n/locales/<LANGUE>/<clé>.json` : un objet JSON **plat** avec **exactement les mêmes chemins que `fr`**, et pour valeur la traduction :
```json
{ "chemin.du.texte": "Traduction", … }
```
- Toutes les clés de `fr`, aucune en plus, aucune valeur vide. Ne renomme jamais un chemin.
- Conserve à l'identique : balises HTML (`<b>`, `<i>`, `<br>`, `<span …>`), chiffres, dates (adapter seulement le format « av. J.-C. » à la langue : BC / a.C. / v. Chr. / до н. э. / 公元前 / 紀元前…), références de sources (« Polybe I, 72 » → nom de l'auteur dans la langue cible + « I, 72 »), citations latines ou grecques (ne pas traduire le latin entre guillemets, mais traduire sa traduction française si elle est donnée à côté).
- Les noms propres : forme usuelle dans la langue cible (voir guide ci-dessous). Les titres d'œuvres modernes (livres, films) restent dans leur titre original.
- Ton : celui d'un bon site éducatif, précis, clair, sans emphase ; pas de note du traducteur, pas de parenthèse ajoutée. Garde la longueur approximative (les textes sont dans des tuiles de mise en page).
- Les textes très courts sont souvent des libellés d'interface (boutons, menus, kickers) : traduction courte et naturelle.
- Les chemins contenant `meta`, `title`, `desc` servent au référencement : titre et description naturels.
- Écris des fichiers JSON valides (UTF-8, guillemets échappés `\"`). Pour les gros fichiers, écris par morceaux si besoin mais un seul fichier final par clé. Le plus simple : un script Python qui construit le dictionnaire et le sauvegarde avec `json.dump(d, f, ensure_ascii=False, indent=1)`.

## Vérification (obligatoire)
Après chaque fichier : `node scripts/i18n/check.mjs <LANGUE> <clé>` → doit afficher 100 % et OK. Corrige tout problème signalé. À la fin : `node scripts/i18n/check.mjs <LANGUE>` pour tes clés.

## Ne touche à rien d'autre
Uniquement les fichiers `i18n/locales/<LANGUE>/<clé>.json` attribués. Pas de build, pas de modification de code.

## Guide par langue
- **it** (italien) : Cartagine, Annibale, Amilcare Barca, Asdrubale, Magone, Annone, Didone/Elissa, Sofonisba, Massinissa, Scipione, Canne, Trasimeno, Zama ; « a.C. ».
- **es** (espagnol) : Cartago, Aníbal, Amílcar Barca, Asdrúbal, Magón, Hannón, Dido/Elisa, Sofonisba, Masinisa, Escipión, Cannas ; « a. C. ».
- **de** (allemand) : Karthago, Hannibal, Hamilkar Barkas, Hasdrubal, Mago, Hanno, Dido/Elissa, Sophonisbe, Massinissa, Scipio, Cannae ; « v. Chr. ». Vouvoiement (Sie) pour l'interface.
- **pt** (portugais européen, compréhensible au Brésil) : Cartago, Aníbal, Amílcar Barca, Asdrúbal, Magão, Hanão, Dido/Elissa, Sofonisba, Massinissa, Cipião, Canas ; « a.C. ».
- **nl** (néerlandais) : Carthago, Hannibal, Hamilcar Barkas, Hasdrubal, Mago, Hanno, Dido/Elissa, Sophonisbe, Massinissa, Scipio, Cannae ; « v.Chr. ».
- **mt** (maltais, orthographe standard ħ ż ġ ċ) : Kartaġni, Annibale, Ħamilkar, Ħasdrubal, Magun, Annun, Didun, Sofonisba ; « QK » (Qabel Kristu). Le maltais a des racines sémitiques proches du punique : ne pas en rajouter, rester exact.
- **tr** (turc) : Kartaca, Hannibal, Hamilkar Barka, Hasdrubal, Magon, Hanno, Dido/Elissa, Sofonisba, Massinissa, Scipio, Cannae ; « MÖ ».
- **ru** (russe) : Карфаген, Ганнибал, Гамилькар Барка, Гасдрубал, Магон, Ганнон, Дидона/Элисса, Софонисба, Масинисса, Сципион, Канны, Тразименское озеро, Зама ; « до н. э. ».
- **zh** (chinois simplifié) : 迦太基, 汉尼拔, 哈米尔卡·巴卡, 哈斯德鲁巴, 马戈, 汉诺, 狄多/埃莉莎, 索芙妮斯芭, 马西尼萨, 西庇阿, 坎尼, 特拉西梅诺湖, 扎马 ; « 公元前 » ; ponctuation chinoise pleine largeur (，。：「」).
- **ja** (japonais, style encyclopédique である調 pour les textes, です/ます pour les boutons) : カルタゴ, ハンニバル, ハミルカル・バルカ, ハスドルバル, マゴ, ハンノ, ディド/エリッサ, ソフォニスバ, マシニッサ, スキピオ, カンナエ, トラシメヌス湖, ザマ ; « 紀元前 ».
- **aeb** (arabe tunisien, derja) : écriture **arabe**, sens RTL. Langue tunisienne naturelle et lisible (« تونسي »), comme un bon média tunisien grand public : syntaxe et mots tunisiens (برشا، باش، متاع، ياسر، كيفاش، هاذي، توّا…) ; pour les termes historiques techniques, reprendre le vocabulaire de la version arabe (référence `ar`, déjà harmonisée : البونيقي، شفط، التوفيت، حنبعل، حملقار، صدربعل…). Pas de translittération latine (pas d'« arabizi »).
- **ber** (tamazight) : écriture **latine** amazighe standard (alphabet avec ɣ, ɛ, ḥ, ṣ, ṭ, ḍ, ẓ, č, ǧ ; tel qu'en kabyle/usage nord-africain). Vocabulaire amazigh courant ; néologismes établis quand ils existent (tamurt « pays », amezruy « histoire », tasdawit « université »…) ; sinon garder le nom propre. Carthage = Qarṭaǧ. Rester simple et clair.
