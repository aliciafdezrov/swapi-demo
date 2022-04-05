import React, {useState} from 'react';
import classes from './starships.style.scss';
import {Starships} from "./starships.vm";
import {CardArray, SearchBar} from "common";
import {mapStarshipVmListToCardVmList} from "./starships.mapper";

interface Props {
    starshipsInfo: Starships;
    search: string;
    onSearch: (name: string, page?: number) => void;
}

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

    const handleOnSort = (sortBy: string) => {
        console.log(sortBy);
    }

    return (
        <>
            <header>
                <div className={classes.sectionHeader}>
                    <h2>{"Starships"}</h2>
                </div>
            </header>

            <main className={classes.main}>
                <SearchBar onSearch={handleOnSearch} search={""} onSelect={handleOnSort} selectValue={sortBy}
                           selectOptions={[{name: 'None', value: 'none'}]}/>
                <CardArray cards={mapStarshipVmListToCardVmList(starshipsInfo.starships)}/>
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
