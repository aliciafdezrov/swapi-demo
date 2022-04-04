import React from 'react';
import {Grid} from "./components/grid/grid.component";
import {SearchBar} from "./components/search-bar/search-bar.component";
import classes from './planets.style.scss';
import {Planets} from "./planets.vm";

interface Props {
    starshipsInfo: Planets;
    search: string;
    onSearch: (name: string, page?: number) => void;
}

export const PlanetsComponent = (props: Props) => {
    const {starshipsInfo, onSearch, search} = props;

    const handleOnSearch = (name: string) => {
        onSearch(name, 1);
    }

    const getFooterTextContent = () => {
        const planetsLength = starshipsInfo.planets.length;
        let startIndex = planetsLength * starshipsInfo.currentPage - planetsLength
        if (starshipsInfo.currentPage === 0) startIndex = 0;
        let endIndex = starshipsInfo.planets.length * starshipsInfo.currentPage;

        return `${startIndex} to ${endIndex} of ${starshipsInfo.count} planets`;
    }

    return (
        <>
            <header className={classes.searchBar}>
                <SearchBar defaultSearch={""} onSearch={handleOnSearch}/>
            </header>

            <main className={classes.main}>
                <Grid planets={starshipsInfo.planets}/>
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
