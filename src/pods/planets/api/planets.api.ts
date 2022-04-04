import {Planets} from "./planet.api-model";

const baseUrl = "https://swapi.dev/api/planets/"

export const getPlanets = async (name: string): Promise<Planets> => {
    try {
        let url = baseUrl;
        if (name) {
            url += `?name=${name}`
        }
        const response = await fetch(url, {
            method: 'GET',
        });

        if (response.ok) {
            return await response.json();
        }
        throw response;

    } catch (exception) {
        throw exception;
    }
};
