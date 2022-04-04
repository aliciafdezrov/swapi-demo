import * as apiModel from './api/planet.api-model';
import * as viewModel from './planets.vm';
import {mapToCollection} from "common";
import {createDefaultPlanets} from "./planets.vm";

export const mapPlanetFromApiToVm = (
    planet: apiModel.Planet
): viewModel.Planet => {
    return planet ?? viewModel.createEmptyPlanet();
};

export const mapPlanetListFromApiToVm = (
    projectSummary: apiModel.Planet[]
): viewModel.Planet[] =>
    mapToCollection(projectSummary, p => mapPlanetFromApiToVm(p));

export const mapPlanetsFromApiToVm = (planets: apiModel.Planets): viewModel.Planets => {
    const planetsInfo = createDefaultPlanets();
    planetsInfo.planets = mapPlanetListFromApiToVm(planets.results);
    planetsInfo.count = planets.count;
    planetsInfo.hasNextPage = Boolean(planets.next);
    planetsInfo.hasPreviousPage = Boolean(planets.previous);

    if (!planetsInfo.hasPreviousPage) {
        planetsInfo.currentPage = 1;
    } else {
        const url = new URL(planets.previous);
        const previousPage: string = url.searchParams.get("page");
        planetsInfo.currentPage = Number(previousPage) + 1;
    }
    return planetsInfo;
}
