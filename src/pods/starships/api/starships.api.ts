import {Starships} from "./starships.api-model";

const baseUrl = "https://swapi.dev/api/starships/"

export const getStarships = async (search: string, page: number = 1): Promise<Starships> => {
    try {
        let url = `${baseUrl}?page=${page}`;
        if (search) {
            url += `&search=${search}`;
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
