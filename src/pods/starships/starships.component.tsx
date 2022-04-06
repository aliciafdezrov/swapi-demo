import React, {useState, useCallback} from 'react';
import classes from './starships.style.scss';
import {Starship, Starships} from "./starships.vm";
import {CardArray, CircularSpinner, SearchBar} from "common/components";
import {sortDTOListByProp} from "common/utils";
import {mapStarshipVmListToCardVmList} from "./starships.mapper";
import {Pagination} from "../../common/components/pagination/pagination.component";
import {empty_option, SelectItem} from "../../common/components/search-bar/select-field/select-field.component";
import {NoItems} from "../../common/components/no-items/no-items.component";

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

    const handleOnPaginationSearch = (name: string, page: number) => {
        onSearch(name, page);
        if (sortBy !== undefined || sortBy !== empty_option.name) {
            setSortBy(empty_option.name);
            setIsSortAscending(true);
        }
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
                    <h2 id={"category-header-starships"}>{"Starships"}</h2>
                </div>
            </header>

            <main className={classes.main}>
                <SearchBar onSearch={handleOnSearch} search={search} onSelect={setSortBy} selectValue={sortBy}
                           selectOptions={buildStarshipSortOptions()} isAscending={isSortAscending}
                           onChangeSortDirection={setIsSortAscending}/>
                {loading ? <div className={classes.mainSpinner}><CircularSpinner/></div> : sortedStarships.length > 0 ?
                    <CardArray cards={mapStarshipVmListToCardVmList(sortedStarships)}/> : <NoItems/>}
            </main>

            {loading || sortedStarships.length === 0 ? null :
                <div className={classes.pagination}>
                    <Pagination
                        search={search}
                        currentPage={starshipsInfo.currentPage}
                        hasNextPage={starshipsInfo.hasNextPage}
                        hasPreviousPage={starshipsInfo.hasPreviousPage}
                        onSearch={handleOnPaginationSearch}
                        textContent={getFooterTextContent()}
                    />
                </div>
            }
        </>
    );
};
