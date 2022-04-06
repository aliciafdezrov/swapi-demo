import React from 'react';
import * as api from './api';
import {debounce} from "lodash";
import {useLocation, useNavigate} from "react-router-dom";
import {createDefaultStarships, Starships} from "./starships.vm";
import {mapStarshipsFromApiToVm} from "./starships.mapper";
import {switchRoutes} from "core/router";

interface Props {
    onLoadStarships: (vmStarships: Starships) => void;
}

export const useSearch = (props: Props) => {
    const navigate = useNavigate();

    const debouncedSearch = debounce(async (name: string, page?: number) => {
        await onSearch(name, page);
    }, 500);

    const onSearch = React.useCallback(async (name: string, page?: number) => {
        try {
            let vmStarships: Starships = createDefaultStarships();
            let locationDescriptor: any = {
                pathname: switchRoutes.starships,
            };

            const encodedQuery: string = encodeURIComponent(name);
            const apiStarships = await api.getStarships(encodedQuery, page);
            vmStarships = mapStarshipsFromApiToVm(apiStarships);
            if (name || page) {
                locationDescriptor.search = `?search=${encodedQuery}&page=${page}`;
                navigate(locationDescriptor);
            }
            props.onLoadStarships(vmStarships);
        } catch (error) {
            console.log(error);
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
