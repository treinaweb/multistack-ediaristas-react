import { AxiosRequestConfig } from 'axios';
import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { ApiService, ApiServiceHateoas } from 'data/services/ApiService';
import { useEffect, useCallback } from 'react';
import useSWR, { mutate } from 'swr';

export default function useApi<OutputType>(
    endPoint: string | null,
    config?: AxiosRequestConfig
): { data: OutputType | undefined; error: Error } {
    const { data, error } = useSWR<OutputType>(endPoint, async (url) => {
        const response = await ApiService(url, config);

        return response.data;
    });

    return { data, error };
}

export function useApiHateoas<OutputType>(
    links: ApiLinksInterface[] = [],
    name: string | null,
    config?: AxiosRequestConfig
): { data: OutputType | undefined; error: Error } {
    const makeRequest = useCallback(() => {
        return new Promise<OutputType>((resolve) => {
            ApiServiceHateoas(links, name || '', async (request) => {
                const response = await request<OutputType>(config);
                resolve(response.data);
            });
        });
    }, [links, name, config]);

    const { data, error } = useSWR<OutputType>(name, makeRequest);

    useEffect(() => {
        mutate(name, makeRequest);
    }, [links, name, makeRequest]);

    return { data, error };
}
