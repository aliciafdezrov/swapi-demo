import React, {useState, useCallback, useMemo} from 'react';
import classes from './starships.style.scss';
import {Starship, Starships} from "./starships.vm";
import {CardArray, SearchBar, sortDTOListByProp} from "common";
import {mapStarshipVmListToCardVmList} from "./starships.mapper";
import {SelectItem} from "../../common/components/search-bar/select-field/select-field.component";

interface Props {
    starshipsInfo: Starships;
    search: string;
    onSearch: (name: string, page?: number) => void;
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
    const {starshipsInfo, onSearch, search} = props;
    const [sortBy, setSortBy] = useState<string>();

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

    const sortFunction = useCallback((starships: Starship[], isAsc: boolean): Starship[] => {
        if (!sortBy) return starships;

        const definedStarships = starships.filter(s => !isNaN(s[sortBy]));
        const nonDefinedStarchips = starships.filter(s => isNaN(s[sortBy]));
        const sortedStarships = sortDTOListByProp(definedStarships, sortBy, 'number', isAsc);
        if (isAsc) {
            return [...nonDefinedStarchips, ...sortedStarships]
        }

        return [...sortedStarships, ...nonDefinedStarchips];
    }, [sortBy]);
    const sortedStarships: Starship[] = sortFunction(starshipsInfo.starships, true);

    return (
        <>
            <header>
                <div className={classes.sectionHeader}>
                    <h2>{"Starships"}</h2>
                </div>
            </header>

            <main className={classes.main}>
                <SearchBar onSearch={handleOnSearch} search={""} onSelect={setSortBy} selectValue={sortBy}
                           selectOptions={buildStarshipSortOptions()}/>
                <CardArray cards={mapStarshipVmListToCardVmList(sortedStarships)}/>
            </main>

            <footer>
                <button disabled={!starshipsInfo.hasPreviousPage}
                        onClick={() => onSearch(search, starshipsInfo.currentPage - 1)}>prev
                </button>
                <span>{getFooterTextContent()}</span>
                <button disabled={!starshipsInfo.hasNextPage}
                        onClick={() => onSearch(search, starshipsInfo.currentPage + 1)}>next
                </button>
            </footer>
        </>
    );
};
