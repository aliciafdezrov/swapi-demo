import React from 'react';
import * as api from './api';
import {debounce} from "lodash";
import {useLocation, useNavigate} from "react-router-dom";
import {createDefaultPlanetsVm, PlanetsVm} from "./planets.vm";
import {mapPlanetsFromApiToVm} from "./planets.mapper";
import {switchRoutes} from "core/router";

interface Props {
    onLoadPlanets: (planetsVm: PlanetsVm) => void;
}

export const useSearch = (props: Props) => {
    const navigate = useNavigate();

    const debouncedSearch = debounce(async (name: string, page?: number) => {
        await onSearch(name, page);
    }, 500);

    const onSearch = React.useCallback(async (name: string, page?: number) => {
        try {
            let planetsVm: PlanetsVm = createDefaultPlanetsVm();
            let locationDescriptor: any = {
                pathname: switchRoutes.planets,
            };

            const encodedQuery: string = encodeURIComponent(name);
            const apiPlanets = await api.getPlanets(encodedQuery, page);
            planetsVm = mapPlanetsFromApiToVm(apiPlanets);
            if (name || page) {
                locationDescriptor.search = `?search=${encodedQuery}&page=${page}`;
                navigate(locationDescriptor);
            }
            props.onLoadPlanets(planetsVm);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleOnSearch = (name: string, page?: number) => {
        if (name) {
            return debouncedSearch(name, page);
        }
        return onSearch(name, page);
    }

    return {
        onSearch: handleOnSearch,
    };
};

export const useSearchQueryParams = () => {
    const location = useLocation();

    const getQueryParam = React.useCallback((query: string) => {
        const searchParams = new URLSearchParams(location.search);
        const queryResult = searchParams.get(query);
        if (queryResult) {
            return queryResult;
        }
        return '';
    }, [location]);

    return {
        getQueryParam,
    };
}
