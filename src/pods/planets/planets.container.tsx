import React from 'react';
import {useSearch, useSearchQueryParams} from './planets.hooks';
import {Planet} from "./planets.vm";
import {PlanetsComponent} from "./planets.component";

export const PlanetsContainer: React.FC = () => {
    const [planets, setPlanets] = React.useState<Planet[]>([]);
    const {getQueryParam} = useSearchQueryParams();
    const {onSearch} = useSearch({
        onLoadPlanets: (vmPlanets) => setPlanets(vmPlanets),
    });

    React.useEffect(() => {
        let searchQuery = getQueryParam("name");
        onSearch(searchQuery);
    }, []);

    return (
        <PlanetsComponent planets={planets} onSearch={onSearch}/>
    );
};
