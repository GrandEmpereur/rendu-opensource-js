/**
 * Type for the parameters used in the search function.
 */
export interface SearchParams {
  query?: string
  lang?: string
  rows?: number
  region?: string
  domaine?: string
  complement_domaine?: string
  departement?: string
  mois_habituel_de_debut?: string
}
