import React from 'react';
import {useSearch, useSearchQueryParams} from './starships.hooks';
import {StarshipsComponent} from "./starships.component";
import {createDefaultStarships, Starships} from "./starships.vm";

export const StarshipsContainer: React.FC = () => {
    const [starshipsInfo, setStarshipsInfo] = React.useState<Starships>(createDefaultStarships());
    const {getQueryParam} = useSearchQueryParams();
    const {onSearch} = useSearch({
        onLoadStarships: (vmStarships) => setStarshipsInfo(vmStarships),
    });

    React.useEffect(() => {
        let nameQuery = getQueryParam("search");
        let page;
        if (getQueryParam("page")) {
            page = Number(getQueryParam("page"));
        }
        onSearch(nameQuery, page);
    }, []);

    return (
        <StarshipsComponent starshipsInfo={starshipsInfo} onSearch={onSearch} search={getQueryParam("search")}/>
    );
};
