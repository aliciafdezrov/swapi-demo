import * as apiModel from './api/planet.api-model';
import * as viewModel from './planets.vm';
import {createDefaultPlanets, PlanetVm} from './planets.vm';
import {mapToCollection} from "common";
import {CardVm, createDefaultCardVm} from "../../common/components/cards/card.vm";

export const mapPlanetFromApiToVm = (
    planet: apiModel.Planet
): viewModel.PlanetVm => {
    return planet ?? viewModel.createEmptyPlanet();
};

export const mapPlanetListFromApiToVm = (
    planets: apiModel.Planet[]
): viewModel.PlanetVm[] =>
    mapToCollection(planets, p => mapPlanetFromApiToVm(p));

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

export const mapPlanetVmToCardVm = (planet: PlanetVm): CardVm => {
    const cardVm = createDefaultCardVm();
    cardVm.mainLabel = planet.name;
    cardVm.secondaryLabel = planet.climate;
    cardVm.detailLabel = planet.population;
    try {
        cardVm.imgSrc = require(`../../../assets/img/planets/${planet.name.replace(/\s+/g, '').toLowerCase()}.jpg`,)
    } catch (e) {
        cardVm.imgSrc = ""
    }
    cardVm.defaultImg = require("../../../assets/img/default.jpg");

    return cardVm;
}

export const mapPlanetVmListToCardVmList = (planets: PlanetVm[]): CardVm[] =>
    mapToCollection(planets, p => mapPlanetVmToCardVm(p));
