import * as apiModel from './api/starships.api-model';
import * as viewModel from './starships.vm';
import {mapToCollection} from "common/mappers";
import {CardVm, createDefaultCardVm} from "../../common/components/cards/card.vm";

let formatter = Intl.NumberFormat('en', {notation: 'compact'});

const castStringifyNumber = (str: string): number | string => {
    let parsedStr = str;
    if (str.includes(',')) {
        parsedStr = str.replace(',', '');
    }

    if (str.includes('-')) {
        const hyphenPosition = parsedStr.indexOf('-');
        parsedStr = parsedStr.substring(hyphenPosition + 1, parsedStr.length);
    }

    const castNumber = Number(parsedStr);
    if (isNaN(castNumber)) return str;
    return castNumber;
}

export const mapStarshipFromApiToVm = (
    starship: apiModel.Starship
): viewModel.StarshipVm => {
    if (!starship) return viewModel.createEmptyStarshipVm();
    return {
        starshipClass: starship.starship_class,
        name: starship.name,
        model: starship.model,
        manufacturer: starship.manufacturer,
        length: starship.length,
        crew: starship.crew,
        passengers: starship.passengers,
        MGLT: starship.MGLT,
        consumables: starship.consumables,
        films: starship.films,
        pilots: starship.pilots,
        url: starship.url,
        created: starship.created,
        edited: starship.edited,
        crewAbsoluteValue: castStringifyNumber(starship.crew),
        cargoCapacity: starship.cargo_capacity,
        cargoCapacityAbsoluteValue: castStringifyNumber(starship.cargo_capacity),
        costInCredits: starship.cost_in_credits,
        maxAtmospheringSpeed: starship.max_atmosphering_speed,
        hyperdriveRating: starship.hyperdrive_rating,
    }
};

export const mapStarshipListFromApiToVm = (
    starships: apiModel.Starship[]
): viewModel.StarshipVm[] =>
    mapToCollection(starships, p => mapStarshipFromApiToVm(p));

export const mapStarshipsFromApiToVm = (starships: apiModel.Starships): viewModel.StarshipsVm => {
    const starshipsInfo = viewModel.createDefaultStarshipsVm();
    starshipsInfo.starships = mapStarshipListFromApiToVm(starships.results);
    starshipsInfo.count = starships.count;
    starshipsInfo.hasNextPage = Boolean(starships.next);
    starshipsInfo.hasPreviousPage = Boolean(starships.previous);

    if (!starshipsInfo.hasPreviousPage) {
        starshipsInfo.currentPage = 1;
    } else {
        const url = new URL(starships.previous);
        const previousPage: string = url.searchParams.get("page");
        starshipsInfo.currentPage = Number(previousPage) + 1;
    }
    return starshipsInfo;
}

export const mapStarshipVmToCardVm = (starship: viewModel.StarshipVm): CardVm => {
    let cardVm = createDefaultCardVm();
    cardVm.mainLabel = starship.name;
    cardVm.secondaryLabel = isNaN(Number(starship.cargoCapacityAbsoluteValue)) ? 'Unknown' : formatter.format(Number(starship.cargoCapacityAbsoluteValue));
    cardVm.secondaryLabelHelperText = "Cargo capacity:"
    cardVm.detailLabel = isNaN(Number(starship.crewAbsoluteValue)) ? 'Unknown' : formatter.format(Number(starship.crewAbsoluteValue))
    cardVm.detailLabelHelperText = 'Max crew of'
    try {
        cardVm.imgSrc = require(`../../../assets/img/starships/${starship.name.replace(/-|\s/g, '').toLowerCase()}.png`,)
    } catch (e) {
        cardVm.imgSrc = ""
    }
    cardVm.defaultImg = require("../../../assets/img/defaultstarship.png");

    return cardVm;
}

export const mapStarshipVmListToCardVmList = (starships: viewModel.StarshipVm[]): CardVm[] =>
    mapToCollection(starships, p => mapStarshipVmToCardVm(p));
