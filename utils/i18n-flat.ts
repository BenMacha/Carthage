// Application d'une table plate de traductions { "chemin.vers.texte": "traduction" } sur un objet.
// Sans dépendance : utilisé par les composables (useI18n, useLocalized) et les scripts.

export type Flat = Record<string, string>

/**
 * Copie profonde des tableaux et objets simples. Les autres valeurs (fonctions des objets C,
 * comme `results(n)` ou `live(n)`) sont gardées telles quelles : une copie JSON les supprimait,
 * et la page faisait une erreur 500 dans toute langue hors fr/en/ar.
 */
export const clone = <T>(o: T): T => {
  if (Array.isArray(o)) return o.map(clone) as T
  if (o && typeof o === 'object' && Object.getPrototypeOf(o) === Object.prototype) {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(o)) out[k] = clone(v)
    return out as T
  }
  return o
}

/** Applique une table plate de traductions sur une copie de `base`. */
export function applyFlat<T> (base: T, flat: Flat | undefined): T {
  if (!flat || !Object.keys(flat).length) return base
  const out: any = clone(base)
  for (const [path, value] of Object.entries(flat)) {
    if (typeof value !== 'string' || !value) continue
    const keys = path.split('.')
    let node = out
    for (let i = 0; i < keys.length - 1; i++) {
      node = node?.[keys[i]]
      if (node == null || typeof node !== 'object') break
    }
    const last = keys[keys.length - 1]
    if (node && typeof node === 'object' && typeof node[last] === 'string') node[last] = value
  }
  return out
}

