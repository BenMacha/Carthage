// Traductions des langues ajoutées (italien, espagnol, allemand…).
//
// Le français, l'anglais et l'arabe vivent dans le code (objet C des pages, dictionnaires des
// composants, fichiers de données). Les autres langues sont des tables plates
// { "chemin.vers.texte": "traduction" } dans i18n/locales/<langue>/<clé>.json, appliquées sur la
// version française : un texte non traduit reste en français, rien ne casse.
//
// - Pages, carte animée, glossaire, quiz, bibliographie : chargés à la demande (seulement la
//   langue affichée) via useLocalized() / useLocalizedData().
// - Interface (ui.json) et plan du site (site-map.json) : petits, inclus d'office.

type Flat = Record<string, string>

const lazy = import.meta.glob(['/i18n/locales/*/*.json', '!/i18n/locales/*/ui.json', '!/i18n/locales/*/site-map.json', '!/i18n/locales/*/global.json'], { import: 'default' }) as Record<string, () => Promise<Flat>>
const eagerUi = import.meta.glob('/i18n/locales/*/ui.json', { eager: true, import: 'default' }) as Record<string, Record<string, Flat>>
const eagerSiteMap = import.meta.glob('/i18n/locales/*/site-map.json', { eager: true, import: 'default' }) as Record<string, Flat>

import { applyFlat, clone } from '~/utils/i18n-flat'

/**
 * Données où chaque texte est un nœud { fr, en, ar } (glossaire, quiz, plan du site…) :
 * ajoute la clé `lang` à chaque nœud à partir de la table plate (chemins = chemin du nœud,
 * suivi du chemin interne si la valeur française est un tableau ou un objet).
 */
export function localizeData<T> (data: T, lang: string, flat: Flat | undefined): T {
  if (!flat || !Object.keys(flat).length) return data
  const out: any = clone(data)
  const walk = (node: any, path: string) => {
    if (!node || typeof node !== 'object') return
    if (!Array.isArray(node) && 'fr' in node && 'en' in node && !(lang in node)) {
      const fr = node.fr
      if (typeof fr === 'string') node[lang] = flat[path] || fr
      else {
        const sub: Flat = {}
        const prefix = path + '.'
        for (const [k, v] of Object.entries(flat)) if (k.startsWith(prefix)) sub[k.slice(prefix.length)] = v
        node[lang] = applyFlat(fr, sub)
      }
      return
    }
    for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : String(k))
  }
  walk(out, '')
  return out
}

const isNative = (lang: string) => lang === 'fr' || lang === 'en' || lang === 'ar'

/** Contenu d'une page (objet C) dans la langue courante. À utiliser avec `await` dans <script setup>. */
export async function useLocalized<T extends Record<string, any>> (key: string, base: T) {
  const { locale } = useI18n()
  const store = useState<Record<string, Flat>>('i18n-flat', () => ({}))

  const load = async (lang: string) => {
    if (base[lang] || isNative(lang)) return
    const id = `${lang}:${key}`
    if (store.value[id]) return
    const loader = lazy[`/i18n/locales/${lang}/${key}.json`]
    store.value = { ...store.value, [id]: loader ? await loader() : {} }
  }

  await load(locale.value)
  watch(locale, l => { load(l) })

  return computed(() => {
    const lang = locale.value
    if (base[lang]) return base[lang]
    return applyFlat(base.fr, store.value[`${lang}:${key}`])
  })
}

/** Fichier de données à nœuds { fr, en, ar } complété pour la langue courante. */
export async function useLocalizedData<T> (key: string, data: T) {
  const { locale } = useI18n()
  const store = useState<Record<string, Flat>>('i18n-flat', () => ({}))

  const load = async (lang: string) => {
    if (isNative(lang)) return
    const id = `${lang}:${key}`
    if (store.value[id]) return
    const loader = lazy[`/i18n/locales/${lang}/${key}.json`]
    store.value = { ...store.value, [id]: loader ? await loader() : {} }
  }

  await load(locale.value)
  watch(locale, l => { load(l) })

  return computed(() => {
    const lang = locale.value
    return isNative(lang) ? data : localizeData(data, lang, store.value[`${lang}:${key}`])
  })
}

/** Dictionnaire d'interface d'un composant ({ fr, en, ar }) dans la langue courante, sans attente. */
export function useUiText<T extends Record<string, any>> (name: string, base: T) {
  const { locale } = useI18n()
  return computed(() => {
    const lang = locale.value
    if (base[lang]) return base[lang]
    const flat = eagerUi[`/i18n/locales/${lang}/ui.json`]?.[name]
    return applyFlat(base.fr, flat)
  })
}

/** Plan du site (assets/data/site-map.json) complété pour une langue, sans attente. */
export function localizeSiteMap<T> (siteMap: T, lang: string): T {
  if (isNative(lang)) return siteMap
  return localizeData(siteMap, lang, eagerSiteMap[`/i18n/locales/${lang}/site-map.json`])
}
