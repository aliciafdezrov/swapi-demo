import React from 'react';
import {useSearch, useSearchQueryParams} from './starships.hooks';
import {StarshipsComponent} from "./starships.component";
import {createDefaultStarships, Starships} from "./starships.vm";
import {switchRoutes} from "core/router";
import {useLocation} from "react-router-dom";

export const StarshipsContainer: React.FC = () => {
    const [starshipsInfo, setStarshipsInfo] = React.useState<Starships>(createDefaultStarships());
    const [loading, setLoading] = React.useState<boolean>(false);
    const {getQueryParam} = useSearchQueryParams();
    const {onSearch} = useSearch({
        onLoadStarships: (vmStarships) => {
            setStarshipsInfo(vmStarships);
            setLoading(false);
        },
    });

    const location = useLocation();

    //Initial and root route load
    React.useEffect(() => {
        if (location.pathname === switchRoutes.starships && location.search === '') {
            let nameQuery = getQueryParam("name");
            let page;
            if (getQueryParam("page")) {
                page = Number(getQueryParam("page"));
            }
            handleOnSearch(nameQuery, page);
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
