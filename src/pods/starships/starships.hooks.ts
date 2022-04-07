import React from 'react';
import * as api from './api';
import {debounce} from "lodash";
import {useLocation, useNavigate} from "react-router-dom";
import {createDefaultStarshipsVm, StarshipsVm} from "./starships.vm";
import {mapStarshipsFromApiToVm} from "./starships.mapper";
import {switchRoutes} from "core/router";
import {useAbort} from "common/hooks";

interface Props {
    onLoadStarships: (starshipsVm: StarshipsVm) => void;
}

export const useSearch = (props: Props) => {
    const navigate = useNavigate();
    const {signal, abort} = useAbort();

    const debouncedSearch = debounce(async (name: string, page?: number) => {
        abort();
        await onSearch(name, page);
    }, 500);

    const onSearch = React.useCallback(async (name: string, page?: number) => {
        try {
            let starshipsVm: StarshipsVm = createDefaultStarshipsVm();
            let locationDescriptor: any = {
                pathname: switchRoutes.starships,
            };

            const encodedQuery: string = encodeURIComponent(name);
            const apiStarships = await api.getStarships(encodedQuery, page, signal());
            starshipsVm = mapStarshipsFromApiToVm(apiStarships);
            if (name || page) {
                locationDescriptor.search = `?search=${encodedQuery}&page=${page}`;
                navigate(locationDescriptor);
            }
            props.onLoadStarships(starshipsVm);
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
