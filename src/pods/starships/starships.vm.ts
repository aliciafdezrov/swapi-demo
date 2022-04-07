export interface StarshipVm {
    name: string;
    model: string;
    starshipClass: string;
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
    films: string[];
    pilots: string[];
    url: string;
    created: string;
    edited: string;
}

export const createEmptyStarshipVm = (): StarshipVm => ({
    name: "",
    model: "",
    starshipClass: "",
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
    films: [],
    pilots: [],
    url: "",
    created: "",
    edited: ""
});

export interface StarshipsVm {
    count: number;
    starships: StarshipVm[];
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export const createDefaultStarshipsVm = (): StarshipsVm => ({
    count: 0,
    currentPage: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    starships: []
});
