// Application d'une table plate de traductions { "chemin.vers.texte": "traduction" } sur un objet.
// Sans dépendance : utilisé par les composables (useI18n, useLocalized) et les scripts.

export type Flat = Record<string, string>

export const clone = <T>(o: T): T => JSON.parse(JSON.stringify(o))

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

