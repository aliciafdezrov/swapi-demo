export interface Starship {
    name: string;
    model: string;
    starship_class: string;
    manufacturer: string;
    costInCredits: string;
    length: string;
    crew: string;
    crewAbsoluteValue: string | number;
    passengers: string;
    maxAtmospheringSpeed: string;
    hyperdriveRating: string;
    MGLT: string;
    cargoCapacity: string;
    cargoCapacityAbsoluteValue: string | number;
    consumables: string;
    films: string;
    pilots: string;
    url: string;
    created: string;
    edited: string;
}

export const createEmptyStarship = (): Starship => ({
    name: "",
    model: "",
    starship_class: "",
    manufacturer: "",
    costInCredits: "",
    length: "",
    crew: "",
    crewAbsoluteValue: "",
    passengers: "",
    maxAtmospheringSpeed: "",
    hyperdriveRating: "",
    MGLT: "",
    cargoCapacity: "",
    cargoCapacityAbsoluteValue: "",
    consumables: "",
    films: "",
    pilots: "",
    url: "",
    created: "",
    edited: ""
});

export interface Starships {
    count: number;
    starships: Starship[];
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export const createDefaultStarships = (): Starships => ({
    count: 0,
    currentPage: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    starships: []
});
