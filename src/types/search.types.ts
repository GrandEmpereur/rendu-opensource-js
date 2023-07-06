/**
 * Type for the parameters used in the search function.
 */
export type SearchParams = {
  query?: string,
  lang?: string,
  rows?: number,
  region?: string,
  domaine?: string,
  complement_domaine?: string,
  departement?: string,
  mois_habituel_de_debut?: string
}

export type SearchAllParams = {
  dataset: string,
  q: string,
  lang: string,
  rows: number,
  facet: string[],
  [key: string]: string | number | string[]
}
