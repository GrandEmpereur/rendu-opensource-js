import axios from 'axios';
import {
    updateAxiosInstance,
} from '../axios'; // change this to the path where your axios file is

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Axios instance', () => {
    it('should create a new instance', () => {
        updateAxiosInstance();
        expect(mockedAxios.create).toBeCalledWith({ baseURL: 'https://data.culture.gouv.fr/api/records/1.0/' });
    });
});

