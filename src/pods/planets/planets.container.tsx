import React from 'react';
import {useSearch, useSearchQueryParams} from './planets.hooks';
import {createDefaultPlanets, Planets} from "./planets.vm";
import {PlanetsComponent} from "./planets.component";

export const PlanetsContainer: React.FC = () => {
    const [planetsInfo, setPlanetsInfo] = React.useState<Planets>(createDefaultPlanets());
    const {getQueryParam} = useSearchQueryParams();
    const {onSearch} = useSearch({
        onLoadPlanets: (vmPlanets) => setPlanetsInfo(vmPlanets),
    });

    React.useEffect(() => {
        let nameQuery = getQueryParam("name");
        let page;
        if (getQueryParam("page")) {
            page = Number(getQueryParam("page"));
        }
        onSearch(nameQuery, page);
    }, []);

    return (
        <PlanetsComponent planetsInfo={planetsInfo} onSearch={onSearch} name={getQueryParam("name")}/>
    );
};
