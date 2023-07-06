import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { SearchAllParams, type SearchParams } from './types/search.types';

/**
 * Instance of Axios for making API requests.
 */
let instance: AxiosInstance | null = null;

/**
 * Function to initialize or update the Axios instance.
 * @throws {Error} If the Axios instance cannot be created.
 */
export function updateAxiosInstance () {
    instance = axios.create({
        baseURL: 'https://data.culture.gouv.fr/api/records/1.0/',
        headers: {},
    });

    instance.interceptors.response.use(
        response => response,
        error => { errorHandler(error); }
    );
}

/**
 * Function to handle any errors that occur during the Axios request.
 * @param {AxiosError} error - The error thrown during the Axios request.
 * @throws {Error} The caught error.
 */
function errorHandler (error: AxiosError): void {
    console.error(error);
    throw error;
}

/**
 * Helper function to make a search request to the API.
 * @param {object} params - The search parameters for the request.
 * @returns {Promise} A Promise that resolves to the response data.
 * @throws {Error} If the Axios instance is not initialized.
 */
export async function makeSearch (params: unknown) {
    if (!instance) {
        throw new Error('Axios instance not initialized');
    }

    const response = await instance.get('/search/', { params });
    return response.data;
}

/**
 * Function to search by query.
 * @param {string} query - The search query.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export async function searchByQuery (query: string) {
    return await makeSearch({ dataset: 'panorama-des-festivals', q: query });
}

/**
 * Function to search by region.
 * @param {string} region - The region to search for.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export async function searchByRegion (region: string) {
    return await makeSearch({ dataset: 'panorama-des-festivals', 'refine.region': region });
}

/**
 * Function to search by domaine.
 * @param {string} domaine - The domaine to search for.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export async function searchByDomaine (domaine: string) {
    return await makeSearch({ dataset: 'panorama-des-festivals', 'refine.domaine': domaine });
}

/**
 * Function to search by complement_domaine.
 * @param {string} complement_domaine - The complement_domaine to search for.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export async function searchByComplementDomaine (complement_domaine: string) {
    return await makeSearch({ dataset: 'panorama-des-festivals', 'refine.complement_domaine': complement_domaine });
}

/**
 * Function to search by departement.
 * @param {string} departement - The departement to search for.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export async function searchByDepartement (departement: string) {
    return await makeSearch({ dataset: 'panorama-des-festivals', 'refine.departement': departement });
}

/**
 * Function to search by mois_habituel_de_debut.
 * @param {string} mois_habituel_de_debut - The mois_habituel_de_debut to search for.
 * @returns {Promise} A Promise that resolves to the response data.
 */
export async function searchByMoisHabituelDeDebut (mois_habituel_de_debut: string) {
    return await makeSearch({ dataset: 'panorama-des-festivals', 'refine.mois_habituel_de_debut': mois_habituel_de_debut });
}

/**
 * Function to search with all possible parameters.
 * @param {SearchParams} params - The search parameters.
 * @returns {Promise} A Promise that resolves to the response data.
 */



export async function search (params: SearchParams = {}) {
    const searchParams: SearchAllParams = {
        dataset: 'panorama-des-festivals',
        q: params.query || '',
        lang: params.lang || '',
        rows: params.rows || 10,
        facet: ['region', 'domaine', 'complement_domaine', 'departement', 'mois_habituel_de_debut']
    };

    if (params.region) {
        searchParams['refine.region'] = params.region;
    }

    if (params.domaine) {
        searchParams['refine.domaine'] = params.domaine;
    }

    if (params.complement_domaine) {
        searchParams['refine.complement_domaine'] = params.complement_domaine;
    }

    if (params.departement) {
        searchParams['refine.departement'] = params.departement;
    }

    if (params.mois_habituel_de_debut) {
        searchParams['refine.mois_habituel_de_debut'] = params.mois_habituel_de_debut;
    }

    return await makeSearch(searchParams);
}
