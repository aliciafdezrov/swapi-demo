import * as apiModel from './api/starships.api-model';
import * as viewModel from './starships.vm';
import {mapToCollection} from "common/mappers";
import {CardVm, createDefaultCardVm} from "../../common/components/cards/card.vm";

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
): viewModel.Starship => {
    if (!starship) return viewModel.createEmptyStarship();
    return {
        ...starship,
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
): viewModel.Starship[] =>
    mapToCollection(starships, p => mapStarshipFromApiToVm(p));

export const mapStarshipsFromApiToVm = (starships: apiModel.Starships): viewModel.Starships => {
    const starshipsInfo = viewModel.createDefaultStarships();
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

export const mapStarshipVmToCardVm = (starship: viewModel.Starship): CardVm => {
    const cardVm = createDefaultCardVm();
    cardVm.mainLabel = starship.name;
    cardVm.secondaryLabel = starship.cargoCapacity;
    cardVm.detailLabel = starship.crew;
    try {
        cardVm.imgSrc = require(`../../../assets/img/starships/${starship.name.replace(/-|\s/g, '').toLowerCase()}.png`,)
    } catch (e) {
        cardVm.imgSrc = ""
    }
    cardVm.defaultImg = require("../../../assets/img/defaultstarship.png");

    return cardVm;
}

export const mapStarshipVmListToCardVmList = (starships: viewModel.Starship[]): CardVm[] =>
    mapToCollection(starships, p => mapStarshipVmToCardVm(p));
