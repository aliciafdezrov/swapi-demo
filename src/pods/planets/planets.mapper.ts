import * as apiModel from './api/planet.api-model';
import * as viewModel from './planets.vm';
import {createDefaultPlanetsVm, PlanetVm} from './planets.vm';
import {mapToCollection} from "common/mappers";
import {CardVm, createDefaultCardVm} from "common/components/cards/card.vm";

let formatter = Intl.NumberFormat('en', {notation: 'compact'});

export const mapPlanetFromApiToVm = (
    planet: apiModel.Planet
): viewModel.PlanetVm => {
    if (!planet) return viewModel.createEmptyPlanetVm();
    return {
        name: planet.name,
        diameter: planet.diameter,
        rotationPeriod: planet.rotation_period,
        orbitalPeriod: planet.orbital_period,
        gravity: planet.gravity,
        population: planet.population,
        climate: planet.climate,
        terrain: planet.terrain,
        surfaceWater: planet.surface_water,
        residents: planet.residents,
        films: planet.films,
        url: planet.url,
        created: planet.created,
        edited: planet.edited,
    }
};

export const mapPlanetListFromApiToVm = (
    planets: apiModel.Planet[]
): viewModel.PlanetVm[] =>
    mapToCollection(planets, p => mapPlanetFromApiToVm(p));

export const mapPlanetsFromApiToVm = (planets: apiModel.Planets): viewModel.PlanetsVm => {
    const planetsInfo = createDefaultPlanetsVm();
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
    cardVm.secondaryLabelHelperText = "Climate:"
    cardVm.detailLabel = isNaN(Number(planet.population)) ? 'Unknown' : formatter.format(Number(planet.population))
    cardVm.detailLabelHelperText = 'Population of'
    try {
        cardVm.imgSrc = require(`../../../assets/img/planets/${planet.name.replace(/-|\s/g, '').toLowerCase()}.jpg`,)
    } catch (e) {
        cardVm.imgSrc = ""
    }
    cardVm.defaultImg = require("../../../assets/img/defaultplanet.jpg");

    return cardVm;
}

export const mapPlanetVmListToCardVmList = (planets: PlanetVm[]): CardVm[] =>
    mapToCollection(planets, p => mapPlanetVmToCardVm(p));
