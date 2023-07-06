import axios, { AxiosError, AxiosResponse } from 'axios';
import {
    updateAxiosInstance,
    makeSearch,
    searchByQuery,
    search
} from '../axios'; // change this to the path where your axios file is
import { SearchParams } from '../types/search.types'; 

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Axios instance', () => {
    it('should create a new instance', () => {
        updateAxiosInstance();
        expect(mockedAxios.create).toBeCalledWith({ baseURL: 'https://data.culture.gouv.fr/api/records/1.0/' });
    });
});

describe('API request', () => {
    beforeEach(() => {
        mockedAxios.create.mockImplementationOnce(() => {
            return {
                get: jest.fn(),
                interceptors: {
                    response: {
                        use: jest.fn(),
                    },
                },
            };
        });
        updateAxiosInstance();
    });

    it('makeSearch should make a request with given params', async () => {
        const mockedResponse: AxiosResponse = {
            data: {},
            status: 200,
            statusText: 'OK',
            config: {},
            headers: {},
        };

        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
        const params = { dataset: 'test-dataset', q: 'test-query' };

        await expect(makeSearch(params)).resolves.toEqual(mockedResponse.data);
        expect(mockedAxios.get).toBeCalledWith('/search/', { params });
    });

    it('searchByQuery should make a request with the correct parameters', async () => {
        const mockedResponse: AxiosResponse = {
            data: {},
            status: 200,
            statusText: 'OK',
            headers: {},
        };

        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
        const query = 'test';

        await expect(searchByQuery(query)).resolves.toEqual(mockedResponse.data);
        expect(mockedAxios.get).toBeCalledWith('/search/', {
            params: { dataset: 'panorama-des-festivals', q: query },
        });
    });

    // You can create similar tests for other functions like `searchByRegion`, `searchByDomaine`, etc.

    it('search should make a request with the correct parameters', async () => {
        const mockedResponse: AxiosResponse = {
            data: {},
            status: 200,
            statusText: 'OK',
            config: {},
            headers: {},
        };

        mockedAxios.get.mockResolvedValueOnce(mockedResponse);

        const searchParams: SearchParams = {
            query: '',
            lang: 'fr',
            rows: 10,
            region: 'Grand Est',
            domaine: '',
            complement_domaine: '',
            departement: '',
            mois_habituel_de_debut: '',
        };

        await expect(search(searchParams)).resolves.toEqual(mockedResponse.data);
        expect(mockedAxios.get).toBeCalledWith('/search/', {
            params: {
                dataset: 'panorama-des-festivals',
                q: searchParams.query,
                lang: searchParams.lang,
                rows: searchParams.rows,
                facet: ['region', 'domaine', 'complement_domaine', 'departement', 'mois_habituel_de_debut'],
                'refine.region': searchParams.region,
                'refine.domaine': searchParams.domaine,
                'refine.complement_domaine': searchParams.complement_domaine,
                'refine.departement': searchParams.departement,
                'refine.mois_habituel_de_debut': searchParams.mois_habituel_de_debut,
            },
        });
    });
});
