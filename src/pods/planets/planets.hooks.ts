import React from 'react';
import * as api from './api';
import {debounce} from "lodash";
import {useNavigate, useLocation} from "react-router-dom";
import {Planet} from "./planets.vm";
import {mapPlanetListFromApiToVm} from "./planets.mapper";
import {switchRoutes} from "core";

interface Props {
    onLoadPlanets: (vmPlanets: Planet[]) => void;
}

export const useSearch = (props: Props) => {
    const navigate = useNavigate();

    const debouncedSearch = debounce(async (name: string) => {
        await handleSearch(name);
    }, 500);

    const handleSearch = React.useCallback(async (name: string) => {
        try {
            let vmPlanets: Planet[] = [];
            let locationDescriptor: any = {
                pathname: switchRoutes.planets,
            }

            const encodedQuery: string = encodeURIComponent(name);
            const apiPlanets = await api.getPlanets(encodedQuery);
            vmPlanets = mapPlanetListFromApiToVm(apiPlanets);
            if (name) {
                locationDescriptor.search = `?search=${encodedQuery}`;
                navigate(locationDescriptor);
            }
            props.onLoadPlanets(vmPlanets);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return {
        onSearch: debouncedSearch,
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
