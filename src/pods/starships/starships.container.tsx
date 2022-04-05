import React from 'react';
import {useSearch, useSearchQueryParams} from './starships.hooks';
import {StarshipsComponent} from "./starships.component";
import {createDefaultStarships, Starships} from "./starships.vm";

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

    React.useEffect(() => {
        let nameQuery = getQueryParam("search");
        let page;
        if (getQueryParam("page")) {
            page = Number(getQueryParam("page"));
        }
        handleOnSearch(nameQuery, page);
    }, []);

    const handleOnSearch = (name: string, page?: number) => {
        setLoading(true);
        onSearch(name, page);
    }

    return (
        <StarshipsComponent starshipsInfo={starshipsInfo} onSearch={handleOnSearch} search={getQueryParam("search")}
                            loading={loading}/>
    );
};
