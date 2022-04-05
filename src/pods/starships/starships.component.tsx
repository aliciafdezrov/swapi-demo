import React, {useState, useCallback, useMemo} from 'react';
import classes from './starships.style.scss';
import {Starship, Starships} from "./starships.vm";
import {CardArray, Loader, SearchBar, sortDTOListByProp} from "common";
import {mapStarshipVmListToCardVmList} from "./starships.mapper";
import {Pagination} from "../../common/components/pagination/pagination.component";
import {SelectItem} from "../../common/components/search-bar/select-field/select-field.component";

interface Props {
    starshipsInfo: Starships;
    search: string;
    onSearch: (name: string, page?: number) => void;
    loading: boolean;
}

const buildStarshipSortOptions = (): SelectItem[] => ([
    {
        name: "Cargo capacity",
        value: "cargoCapacityAbsoluteValue"
    },
    {
        name: "Crew",
        value: "crewAbsoluteValue"
    },
]);

export const StarshipsComponent = (props: Props) => {
    const {starshipsInfo, onSearch, search, loading} = props;
    const [sortBy, setSortBy] = useState<string>();
    const [isSortAscending, setIsSortAscending] = useState<boolean>(true);

    const handleOnSearch = (name: string) => {
        onSearch(name, 1);
    }

    const getFooterTextContent = () => {
        const planetsLength = starshipsInfo.starships.length;
        let startIndex = planetsLength * starshipsInfo.currentPage - planetsLength
        if (starshipsInfo.currentPage === 0) startIndex = 0;
        let endIndex = starshipsInfo.starships.length * starshipsInfo.currentPage;

        return `${startIndex} to ${endIndex} of ${starshipsInfo.count} starships`;
    }

    const sortFunction = useCallback((starships: Starship[]): Starship[] => {
        if (!sortBy) return starships;
        const definedStarships = starships.filter(s => !isNaN(s[sortBy]));
        const nonDefinedStarchips = starships.filter(s => isNaN(s[sortBy]));
        const sortedStarships = sortDTOListByProp(definedStarships, sortBy, 'number', isSortAscending);
        if (isSortAscending) {
            return [...nonDefinedStarchips, ...sortedStarships]
        }

        return [...sortedStarships, ...nonDefinedStarchips];
    }, [sortBy, isSortAscending]);
    const sortedStarships: Starship[] = sortFunction(starshipsInfo.starships);

    return (
        <>
            <header>
                <div className={classes.sectionHeader}>
                    <h2>{"Starships"}</h2>
                </div>
            </header>

            <main className={classes.main}>
                <SearchBar onSearch={handleOnSearch} search={search} onSelect={setSortBy} selectValue={sortBy}
                           selectOptions={buildStarshipSortOptions()} isAscending={isSortAscending}
                           onChangeSortDirection={setIsSortAscending}/>
                {loading ? null : <CardArray cards={mapStarshipVmListToCardVmList(sortedStarships)}/>}
            </main>
            <Loader isShown={loading}/>

            {loading ? null : (
                <div className={classes.pagination}>
                    <Pagination
                        search={search}
                        currentPage={starshipsInfo.currentPage}
                        hasNextPage={starshipsInfo.hasNextPage}
                        hasPreviousPage={starshipsInfo.hasPreviousPage}
                        onSearch={onSearch}
                        textContent={getFooterTextContent()}
                    />
                </div>
            )}
        </>
    );
};
