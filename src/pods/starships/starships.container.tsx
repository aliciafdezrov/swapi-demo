import React from 'react';
import {useSearch, useSearchQueryParams} from './starships.hooks';
import {StarshipsComponent} from "./starships.component";
import {createDefaultStarshipsVm, StarshipsVm} from "./starships.vm";
import {switchRoutes} from "core/router";
import {useLocation} from "react-router-dom";

export const StarshipsContainer: React.FC = () => {
    const [starshipsInfo, setStarshipsInfo] = React.useState<StarshipsVm>(createDefaultStarshipsVm());
    const [loading, setLoading] = React.useState<boolean>(false);
    const {getQueryParam} = useSearchQueryParams();
    const {onSearch} = useSearch({
        onLoadStarships: (starshipsVm) => {
            setStarshipsInfo(starshipsVm);
            setLoading(false);
        },
    });

    const location = useLocation();

    //Initial and root route load
    React.useEffect(() => {
        if (location.pathname === switchRoutes.starships && location.search === '') {
            let searchQuery = getQueryParam("search");
            let page;
            if (getQueryParam("page")) {
                page = Number(getQueryParam("page"));
            }
            handleOnSearch(searchQuery, page);
        }
    }, [location.key]);

    const handleOnSearch = (name: string, page?: number) => {
        setLoading(true);
        onSearch(name, page);
    }

    return (
        <StarshipsComponent starshipsInfo={starshipsInfo} onSearch={handleOnSearch} search={getQueryParam("search")}
                            loading={loading}/>
    );
};
