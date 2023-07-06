// This is the corrected file:
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { updateAxiosInstance, searchByQuery, searchByRegion, searchByDomaine, searchByComplementDomaine, searchByDepartement, searchByMoisHabituelDeDebut, search } from '../axios';

jest.mock('axios', () => ({
    create: jest.fn(() => ({
        interceptors: {
            response: {
                use: jest.fn()
            }
        },
        get: jest.fn()
    })),
    get: jest.fn()
}));

describe('Axios instance tests', () => {
    it('should create an instance', () => {
        updateAxiosInstance();
        expect(axios.create).toBeCalled();
    });
});

describe('Search functions tests', () => {
    let mock: any;

    beforeEach(() => {
        mock = new MockAdapter((axios as any));
        updateAxiosInstance();
    });

    afterEach(() => {
        mock.restore();
    });

    it('should call the correct endpoint for searchByQuery', async () => {
        mock.onGet('/search/').reply(200);
        await searchByQuery('test');
        expect(mock.history.get[0].params).toEqual({ dataset: 'panorama-des-festivals', q: 'test' });
    });

    it('should call the correct endpoint for searchByRegion', async () => {
        mock.onGet('/search/').reply(200);
        await searchByRegion('Grand Est');
        expect(mock.history.get[0].params).toEqual({ dataset: 'panorama-des-festivals', 'refine.region': 'Grand Est' });
    });

    // Similar tests can be written for searchByDomaine, searchByComplementDomaine, searchByDepartement, and searchByMoisHabituelDeDebut

    it('should call the correct endpoint for search with all parameters', async () => {
        mock.onGet('/search/').reply(200);
        const params = {
            query: 'test',
            lang: 'en',
            rows: 10,
            region: 'Grand Est',
            domaine: 'Musique',
            complement_domaine: 'Festival de musique',
            departement: 'Bas-Rhin',
            mois_habituel_de_debut: 'Juillet'
        };
        await search(params);
        expect(mock.history.get[0].params).toEqual({
            dataset: 'panorama-des-festivals',
            q: 'test',
            lang: 'en',
            rows: 10,
            facet: ['region', 'domaine', 'complement_domaine', 'departement', 'mois_habituel_de_debut'],
            'refine.region': 'Grand Est',
            'refine.domaine': 'Musique',
            'refine.complement_domaine': 'Festival de musique',
            'refine.departement': 'Bas-Rhin',
            'refine.mois_habituel_de_debut': 'Juillet'
        });
    });
});
