import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { LocalStorage } from './StorageService';

const url = process.env.NEXT_PUBLIC_API;

export const ApiService = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

ApiService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (
            error.response.status === 401 &&
            error.response.data.code === 'token_not_valid'
        ) {
            return handleTokenRefresh(error);
        }
        return Promise.reject(error);
    }
);

async function handleTokenRefresh(error: { config: AxiosRequestConfig }) {
    const tokenRefresh = LocalStorage.get<string>('token_refresh', '');
    if (tokenRefresh) {
        LocalStorage.clear('token_refresh');
        LocalStorage.clear('token');
        try {
            const { data } = await ApiService.post('/auth/token/refresh/', {
                refresh: tokenRefresh,
            });

            LocalStorage.set('token', data.access);
            LocalStorage.set('token_refresh', data.refresh);
            ApiService.defaults.headers.common.Authorization =
                'Bearer ' + data.access;

            // error.config.headers.Authorization =
            //     ApiService.defaults.headers.Authorization;
            error.config.headers!['Authorization'] =
                ApiService.defaults.headers.common['Authorization'];

            console.log('handleTokenRefresh');

            return ApiService(error.config);
        } catch (err) {
            return error;
        }
    } else {
        return error;
    }
}

export function linksResolver(
    links: ApiLinksInterface[] = [],
    name: string
): ApiLinksInterface | undefined {
    return links.find((link) => link.rel === name);
}

export function ApiServiceHateoas(
    links: ApiLinksInterface[] = [],
    name: string,
    onCanRequest: (
        request: <T>(data?: AxiosRequestConfig) => Promise<AxiosResponse<T>>
    ) => void,
    onCantRequest?: Function
) {
    const requestLink = linksResolver(links, name);
    console.log(`ApiServiceHateoas `, requestLink);
    if (requestLink) {
        onCanRequest(<T>(data?: AxiosRequestConfig) => {
            return ApiService.request<T>({
                method: requestLink.type,
                url: requestLink.uri,
                ...data,
            });
        });
    } else {
        onCantRequest?.();
    }
}
