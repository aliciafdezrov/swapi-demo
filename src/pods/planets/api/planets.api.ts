import {Planets} from "./planet.api-model";

const baseUrl = "https://swapi.dev/api/planets/"

export const getPlanets = async (search: string, page: number = 1, signal: AbortSignal | null): Promise<Planets> => {
    try {
        let url = `${baseUrl}?page=${page}`;
        if (search) {
            url += `&search=${search}`;
        }
        const response = await fetch(url, {
            method: 'GET',
            signal: signal,
        });

        if (response.ok) {
            return await response.json();
        }
        throw response;

    } catch (exception) {
        throw exception;
    }
};
