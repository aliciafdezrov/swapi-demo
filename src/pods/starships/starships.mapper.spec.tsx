import * as viewModel from './starships.vm';
import {
    mapStarshipFromApiToVm,
    mapStarshipListFromApiToVm,
    mapStarshipsFromApiToVm,
    mapStarshipVmToCardVm,
    mapStarshipVmListToCardVmList,
} from "./starships.mapper";

describe('mapStarshipFromApiToVm tests', () => {
    it('should return an empty StarshipVm when sending null data', () => {
        const result = mapStarshipFromApiToVm(null);
        expect(result).toEqual(viewModel.createEmptyStarship());
    });

    it('should return starship passed as param as view model starship', () => {
        const starship = {
            name: "starship",
            model: "model",
            starship_class: "",
            manufacturer: "",
            cost_in_credits: "",
            length: "150",
            crew: "300",
            passengers: "1000",
            max_atmosphering_speed: "",
            hyperdrive_rating: "",
            MGLT: "",
            cargo_capacity: "2000000",
            consumables: "",
            films: "",
            pilots: "",
            url: "",
            created: "",
            edited: ""
        };
        const result: viewModel.Starship = mapStarshipFromApiToVm(starship);
        expect(result).toEqual({
            name: "starship",
            model: "model",
            starship_class: "",
            manufacturer: "",
            costInCredits: "",
            length: "150",
            crew: "300",
            passengers: "1000",
            maxAtmospheringSpeed: "",
            hyperdriveRating: "",
            MGLT: "",
            cargoCapacity: "2000000",
            cargoCapacityAbsoluteValue: 2000000,
            crewAbsoluteValue: 300,
            consumables: "",
            films: "",
            pilots: "",
            url: "",
            created: "",
            edited: ""
        });
    });
});

describe('mapStarshipListFromApiToVm tests', () => {
    const apiStarship = {
        name: "starship",
        model: "model",
        starship_class: "",
        manufacturer: "",
        cost_in_credits: "",
        length: "150",
        crew: "300",
        passengers: "1000",
        max_atmosphering_speed: "",
        hyperdrive_rating: "",
        MGLT: "",
        cargo_capacity: "2000000",
        consumables: "",
        films: "",
        pilots: "",
        url: "",
        created: "",
        edited: ""
    };

    const vmStarship = {
        name: "starship",
        model: "model",
        starship_class: "",
        manufacturer: "",
        costInCredits: "",
        length: "150",
        crew: "300",
        passengers: "1000",
        maxAtmospheringSpeed: "",
        hyperdriveRating: "",
        MGLT: "",
        cargoCapacity: "2000000",
        cargoCapacityAbsoluteValue: 2000000,
        crewAbsoluteValue: 300,
        consumables: "",
        films: "",
        pilots: "",
        url: "",
        created: "",
        edited: ""
    };

    it('should return an empty Starship list when feeding with empty list', () => {
        const result = mapStarshipListFromApiToVm([]);
        expect(result.length).toBe(0);
    });

    it('should return starship list passed as param as view model starship', () => {
        const result = mapStarshipListFromApiToVm([apiStarship, apiStarship, apiStarship]);
        expect(result.length).toBe(3);
        expect(result[0]).toEqual(vmStarship);
        expect(result[1]).toEqual(vmStarship);
        expect(result[2]).toEqual(vmStarship);
    });
});

describe('mapStarshipsFromApiToVm tests', () => {
    it('should return starships info with hasPreviousPage as false and currentPage to 1 when there is no link to previous page', () => {
        const starshipsApiInfo = {
            count: 60,
            next: "http://localhost:9999/planets/?page=2",
            previous: null,
            results: [],
        }
        const result = mapStarshipsFromApiToVm(starshipsApiInfo);
        expect(result.hasPreviousPage).toBe(false);
        expect(result.currentPage).toBe(1);
    });

    it('should return starships info with currentPage to previousPage plus one when there is link to previous page', () => {
        const starshipsApiInfo = {
            count: 60,
            next: "http://localhost:9999/planets/?page=4",
            previous: "http://localhost:9999/planets/?page=2",
            results: [],
        }
        const result = mapStarshipsFromApiToVm(starshipsApiInfo);
        expect(result.currentPage).toBe(3);
    });

    it('should return starships info with hasNextPage as false when there is no link to next page', () => {
        const starshipsApiInfo = {
            count: 60,
            next: null,
            previous: "http://localhost:9999/planets/?page=5",
            results: [],
        }
        const result = mapStarshipsFromApiToVm(starshipsApiInfo);
        expect(result.hasNextPage).toBe(false);
    });
});

describe('mapStarshipVmToCardVm tests', () => {
    const vmStarship = {
        name: "starship",
        model: "model",
        starship_class: "",
        manufacturer: "",
        costInCredits: "",
        length: "150",
        crew: "300",
        passengers: "1000",
        maxAtmospheringSpeed: "",
        hyperdriveRating: "",
        MGLT: "",
        cargoCapacity: "2000000",
        cargoCapacityAbsoluteValue: 2000000,
        crewAbsoluteValue: 300,
        consumables: "",
        films: "",
        pilots: "",
        url: "",
        created: "",
        edited: ""
    };

    it('should map starship info to card info', () => {
        const result = mapStarshipVmToCardVm(vmStarship);
        expect(result.mainLabel).toEqual(vmStarship.name);
        expect(result.secondaryLabel).toEqual("2M");
        expect(result.secondaryLabelHelperText).toEqual("Cargo capacity:");
        expect(result.detailLabelHelperText).toEqual("Max crew of");
        expect(result.detailLabel).toEqual("300");
    });

    it('should return crew of unknown when crew is NaN', () => {
        const result = mapStarshipVmToCardVm({...vmStarship, crewAbsoluteValue: "Unknown"});
        expect(result.mainLabel).toEqual(vmStarship.name);
        expect(result.secondaryLabel).toEqual("2M");
        expect(result.secondaryLabelHelperText).toEqual("Cargo capacity:");
        expect(result.detailLabelHelperText).toEqual("Max crew of");
        expect(result.detailLabel).toEqual("Unknown");
    });

    it('should return cargo capacity of unknown when population is NaN', () => {
        const result = mapStarshipVmToCardVm({
            ...vmStarship,
            cargoCapacityAbsoluteValue: "Unknown"
        });
        expect(result.mainLabel).toEqual(vmStarship.name);
        expect(result.secondaryLabel).toEqual("Unknown");
        expect(result.secondaryLabelHelperText).toEqual("Cargo capacity:");
        expect(result.detailLabelHelperText).toEqual("Max crew of");
        expect(result.detailLabel).toEqual("300");
    });
});

describe('mapStarshipVmListToCardVmList tests', () => {
    it('should return an empty CardVm list when feeding with empty list', () => {
        const result = mapStarshipVmListToCardVmList([]);
        expect(result.length).toBe(0);
    });

    it('should return starship list passed as param as card view model', () => {
        const vmStarship = {
            name: "starship",
            model: "model",
            starship_class: "",
            manufacturer: "",
            costInCredits: "",
            length: "150",
            crew: "300",
            passengers: "1000",
            maxAtmospheringSpeed: "",
            hyperdriveRating: "",
            MGLT: "",
            cargoCapacity: "2000000",
            cargoCapacityAbsoluteValue: 2000000,
            crewAbsoluteValue: 300,
            consumables: "",
            films: "",
            pilots: "",
            url: "",
            created: "",
            edited: ""
        };
        const result = mapStarshipVmListToCardVmList([vmStarship, vmStarship, vmStarship]);
        expect(result.length).toBe(3);
    });
});
