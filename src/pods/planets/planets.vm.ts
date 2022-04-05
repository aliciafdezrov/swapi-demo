export interface PlanetVm {
    name: string;
    diameter: string;
    rotation_period: string;
    orbital_period: string;
    gravity: string;
    population: string;
    climate: string;
    terrain: string;
    surface_water: string;
    residents: string[];
    films: string[];
    url: string;
    created: string;
    edited: string;
}

export const createEmptyPlanet = (): PlanetVm => ({
    name: "",
    diameter: "",
    rotation_period: "",
    orbital_period: "",
    gravity: "",
    population: "",
    climate: "",
    terrain: "",
    surface_water: "",
    residents: [],
    films: [],
    url: "",
    created: "",
    edited: "",
});

export interface Planets {
    count: number;
    planets: PlanetVm[];
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export const createDefaultPlanets = (): Planets => ({
    count: 0,
    currentPage: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    planets: []
});
