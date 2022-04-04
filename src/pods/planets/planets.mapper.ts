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
    planetsInfo.next = planets.next;
    planetsInfo.previous = planets.previous;
    return planetsInfo;
}
