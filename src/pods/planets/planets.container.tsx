import React from 'react';
import {useSearch, useSearchQueryParams} from './planets.hooks';
import {createDefaultPlanets, Planets} from "./planets.vm";
import {PlanetsComponent} from "./planets.component";
import {useLocation} from "react-router-dom";
import {switchRoutes} from "core/router";

export const PlanetsContainer: React.FC = () => {
    const [planetsInfo, setPlanetsInfo] = React.useState<Planets>(createDefaultPlanets());
    const [loading, setLoading] = React.useState<boolean>(false);
    const {getQueryParam} = useSearchQueryParams();
    const location = useLocation();
    const {onSearch} = useSearch({
        onLoadPlanets: (vmPlanets) => {
            setPlanetsInfo(vmPlanets);
            setLoading(false);
        },
    });

    //Initial and root route load
    React.useEffect(() => {
        if (location.pathname === switchRoutes.planets && location.search === '') {
            let nameQuery = getQueryParam("name");
            let pageFromQuery = getQueryParam("page");
            let page;
            if (pageFromQuery) {
                page = Number(pageFromQuery);
            }
            handleOnSearch(nameQuery, page);
        }
    }, [location.key]);

    const handleOnSearch = (name: string, page?: number) => {
        setLoading(true);
        onSearch(name, page);
    }

    return (
        <PlanetsComponent planetsInfo={planetsInfo} onSearch={handleOnSearch} search={getQueryParam("name")}
                          loading={loading}/>
    );
};
