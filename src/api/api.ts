import axios from 'axios';
import { GetAccessTokenResponse } from './DTOs';
import { QuoteTagType } from '../enums/QuoteTagType';

const API_URL = 'https://localhost:7173';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if(!refreshToken){
        throw new Error('No refresh token found');
    }

    const response = await api.post('/Auth/GetAccessToken', {}, {
        headers: {
            'Authorization': 'Bearer ' + refreshToken,
        }
    });

    const data: GetAccessTokenResponse = response.data;
    localStorage.setItem('accessToken', data.accessToken);
    api.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;

    return data.accessToken;
}

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) =>{
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try{
                const newAccessToken = await refreshAccessToken();

                // api.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
                originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;

                return api(originalRequest);
            } catch (refreshError){
                console.error('Token refresh feailed', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        }
        return Promise.reject(error);
    }
)


export const registerUser = (data: {email: string; password: string; confirmPassword: string}) => 
    api.post('/Auth/Register', data);

export const loginUser = (data: {email: string; password: string}) =>
    api.post('/Auth/Login', data);

export const getAccessToken = () => api.post('/Auth/GetAccessToken');

export const getQuotes = () => api.get('/Quotes');

export const getUserQuotes = (userId: string) => api.get(`/Quotes/${userId}`);

export const createQuote = (data: { text: string; author: string; tags: QuoteTagType[] }) =>
  api.post('/Quotes', data);

export const updateQuote = (quoteId: string, data: { text: string; author: string; tags: QuoteTagType[] }) =>
  api.put(`/Quotes/${quoteId}`, data);

export const deleteQuote = (quoteId: string) =>
  api.delete(`/Quotes/${quoteId}`);

export default api;