export interface Starship {
    name: string;
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
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
    cost_in_credits: "",
    length: "",
    crew: "",
    passengers: "",
    max_atmosphering_speed: "",
    hyperdrive_rating: "",
    MGLT: "",
    cargo_capacity: "",
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
