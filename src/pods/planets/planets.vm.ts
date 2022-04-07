export interface PlanetVm {
    name: string;
    diameter: string;
    rotationPeriod: string;
    orbitalPeriod: string;
    gravity: string;
    population: string;
    climate: string;
    terrain: string;
    surfaceWater: string;
    residents: string[];
    films: string[];
    url: string;
    created: string;
    edited: string;
}

export const createEmptyPlanetVm = (): PlanetVm => ({
    name: "",
    diameter: "",
    rotationPeriod: "",
    orbitalPeriod: "",
    gravity: "",
    population: "",
    climate: "",
    terrain: "",
    surfaceWater: "",
    residents: [],
    films: [],
    url: "",
    created: "",
    edited: "",
});

export interface PlanetsVm {
    count: number;
    planets: PlanetVm[];
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export const createDefaultPlanetsVm = (): PlanetsVm => ({
    count: 0,
    currentPage: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    planets: []
});
