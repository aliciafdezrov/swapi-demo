import * as apiModel from './api/starships.api-model';
import * as viewModel from './starships.vm';
import {mapToCollection} from "common";
import {CardVm, createDefaultCardVm} from "../../common/components/cards/card.vm";

export const mapStarshipFromApiToVm = (
    starship: apiModel.Starship
): viewModel.Starship => {
    return starship ?? viewModel.createEmptyStarship();
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
    cardVm.secondaryLabel = starship.crew;
    cardVm.detailLabel = starship.cargo_capacity;
    try {
        cardVm.imgSrc = require(`../../../assets/img/starships/${starship.name.replace(/\s+/g, '').toLowerCase()}.jpg`,)
    } catch (e) {
        cardVm.imgSrc = ""
    }
    cardVm.defaultImg = require("../../../assets/img/default.jpg");

    return cardVm;
}

export const mapStarshipVmListToCardVmList = (starships: viewModel.Starship[]): CardVm[] =>
    mapToCollection(starships, p => mapStarshipVmToCardVm(p));
