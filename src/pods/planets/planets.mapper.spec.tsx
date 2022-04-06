import * as viewModel from './planets.vm';
import {
    mapPlanetFromApiToVm,
    mapPlanetListFromApiToVm,
    mapPlanetsFromApiToVm,
    mapPlanetVmListToCardVmList,
    mapPlanetVmToCardVm
} from "./planets.mapper";

describe('mapPlanetFromApiToVm tests', () => {
    it('should return an empty PlanetVm when null data', () => {
        const result = mapPlanetFromApiToVm(null);
        expect(result).toEqual(viewModel.createEmptyPlanet());
    });

    it('should return planet passed as param as view model planet', () => {
        const apiPlanet = {
            name: "planet",
            diameter: "200",
            rotation_period: "",
            orbital_period: "",
            gravity: "",
            population: "200000",
            climate: "",
            terrain: "",
            surface_water: "",
            residents: [],
            films: [],
            url: "",
            created: "",
            edited: ""
        };

        const vmPlanet = {
            name: "planet",
            diameter: "200",
            rotationPeriod: "",
            orbitalPeriod: "",
            gravity: "",
            population: "200000",
            climate: "",
            terrain: "",
            surfaceWater: "",
            residents: [],
            films: [],
            url: "",
            created: "",
            edited: ""
        }
        const result = mapPlanetFromApiToVm(apiPlanet);
        expect(result).toEqual(vmPlanet);
    });
});

describe('mapPlanetListFromApiToVm tests', () => {
    it('should return an empty PlanetVm list when feeding with empty list', () => {
        const result = mapPlanetListFromApiToVm([]);
        expect(result.length).toBe(0);
    });

    it('should return planet passed as param as view model planet', () => {
        const apiPlanet = {
            name: "planet", diameter: "200",
            rotation_period: "",
            orbital_period: "",
            gravity: "",
            population: "200000",
            climate: "",
            terrain: "",
            surface_water: "",
            residents: [],
            films: [],
            url: "",
            created: "",
            edited: ""
        };
        const vmPlanet = {
            name: "planet",
            diameter: "200",
            rotationPeriod: "",
            orbitalPeriod: "",
            gravity: "",
            population: "200000",
            climate: "",
            terrain: "",
            surfaceWater: "",
            residents: [],
            films: [],
            url: "",
            created: "",
            edited: ""
        };
        const result = mapPlanetListFromApiToVm([apiPlanet, apiPlanet, apiPlanet]);
        expect(result.length).toBe(3);
        expect(result[0]).toEqual(vmPlanet);
        expect(result[1]).toEqual(vmPlanet);
        expect(result[2]).toEqual(vmPlanet);
    });
});

describe('mapPlanetsFromApiToVm tests', () => {
    it('should return planets info with hasPreviousPage as false and currentPage to 1 when there is no link to previous page', () => {
        const planetsApiInfo = {
            count: 60,
            next: "http://localhost:9999/planets/?page=2",
            previous: null,
            results: [],
        }
        const result = mapPlanetsFromApiToVm(planetsApiInfo);
        expect(result.hasPreviousPage).toBe(false);
        expect(result.currentPage).toBe(1);
    });

    it('should return planets info with currentPage to previousPage plus one when there is link to previous page', () => {
        const planetsApiInfo = {
            count: 60,
            next: "http://localhost:9999/planets/?page=4",
            previous: "http://localhost:9999/planets/?page=2",
            results: [],
        }
        const result = mapPlanetsFromApiToVm(planetsApiInfo);
        expect(result.currentPage).toBe(3);
    });

    it('should return planets info with hasNextPage as false when there is no link to next page', () => {
        const planetsApiInfo = {
            count: 60,
            next: null,
            previous: "http://localhost:9999/planets/?page=5",
            results: [],
        }
        const result = mapPlanetsFromApiToVm(planetsApiInfo);
        expect(result.hasNextPage).toBe(false);
    });
});

describe('mapPlanetVmToCardVm tests', () => {
    it('should map planet info to card info', () => {
        const planet = {
            name: "planet",
            diameter: "200",
            rotationPeriod: "",
            orbitalPeriod: "",
            gravity: "",
            population: "200000",
            climate: "some climate",
            terrain: "",
            surfaceWater: "",
            residents: [],
            films: [],
            url: "",
            created: "",
            edited: ""
        };
        const result = mapPlanetVmToCardVm(planet);
        expect(result.mainLabel).toEqual(planet.name);
        expect(result.secondaryLabel).toEqual(planet.climate);
        expect(result.secondaryLabelHelperText).toEqual("Climate:");
        expect(result.detailLabelHelperText).toEqual("Population of");
        expect(result.detailLabel).toEqual("200K");
    });

    it('should return population of unknown when population is NaN', () => {
        const planet = {
            name: "planet",
            diameter: "200",
            rotationPeriod: "",
            orbitalPeriod: "",
            gravity: "",
            population: "some text",
            climate: "some climate",
            terrain: "",
            surfaceWater: "",
            residents: [],
            films: [],
            url: "",
            created: "",
            edited: ""
        };
        const result = mapPlanetVmToCardVm(planet);
        expect(result.mainLabel).toEqual(planet.name);
        expect(result.secondaryLabel).toEqual(planet.climate);
        expect(result.secondaryLabelHelperText).toEqual("Climate:");
        expect(result.detailLabelHelperText).toEqual("Population of");
        expect(result.detailLabel).toEqual("Unknown");
    });

    it('should return population of unknown when population is NaN', () => {
        const planet = {
            name: "planet",
            diameter: "200",
            rotationPeriod: "",
            orbitalPeriod: "",
            gravity: "",
            population: "some text",
            climate: "some climate",
            terrain: "",
            surfaceWater: "",
            residents: [],
            films: [],
            url: "",
            created: "",
            edited: ""
        };
        const result = mapPlanetVmToCardVm(planet);
        expect(result.mainLabel).toEqual(planet.name);
        expect(result.secondaryLabel).toEqual(planet.climate);
        expect(result.secondaryLabelHelperText).toEqual("Climate:");
        expect(result.detailLabelHelperText).toEqual("Population of");
        expect(result.detailLabel).toEqual("Unknown");
    });
});

describe('mapPlanetVmListToCardVmList tests', () => {
    it('should return an empty CardVm list when feeding with empty list', () => {
        const result = mapPlanetVmListToCardVmList([]);
        expect(result.length).toBe(0);
    });

    it('should return planet list passed as param as card view model', () => {
        const planet = {
            name: "planet", diameter: "200",
            rotation_period: "",
            orbital_period: "",
            gravity: "",
            population: "200000",
            climate: "",
            terrain: "",
            surface_water: "",
            residents: [],
            films: [],
            url: "",
            created: "",
            edited: ""
        };
        const result = mapPlanetListFromApiToVm([planet, planet, planet]);
        expect(result.length).toBe(3);
    });
});
