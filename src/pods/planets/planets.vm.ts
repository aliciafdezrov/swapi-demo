export interface Planet {
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

export const createEmptyPlanet = (): Planet => ({
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
    next: string | null;
    previous: string | null;
    planets: Planet[];
}

export const createDefaultPlanets = (): Planets => ({
    count: 0,
    next: null,
    previous: null,
    planets: []
});
