import React from 'react';
import * as api from './api';
import {debounce} from "lodash";
import {useLocation, useNavigate} from "react-router-dom";
import {createDefaultPlanets, Planets} from "./planets.vm";
import {mapPlanetsFromApiToVm} from "./planets.mapper";
import {switchRoutes} from "core/router";

interface Props {
    onLoadPlanets: (vmPlanets: Planets) => void;
}

export const useSearch = (props: Props) => {
    const navigate = useNavigate();

    const debouncedSearch = debounce(async (name: string, page?: number) => {
        await onSearch(name, page);
    }, 200);

    const onSearch = React.useCallback(async (name: string, page?: number) => {
        try {
            let vmPlanets: Planets = createDefaultPlanets();
            let locationDescriptor: any = {
                pathname: switchRoutes.planets,
            };

            const encodedQuery: string = encodeURIComponent(name);
            const apiPlanets = await api.getPlanets(encodedQuery, page);
            vmPlanets = mapPlanetsFromApiToVm(apiPlanets);
            if (name || page) {
                locationDescriptor.search = `?name=${encodedQuery}&page=${page}`;
                navigate(locationDescriptor);
            }
            props.onLoadPlanets(vmPlanets);
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
    }, []);

    return {
        getQueryParam,
    };
}
