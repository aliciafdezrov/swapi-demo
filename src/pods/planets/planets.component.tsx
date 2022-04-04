import React from 'react';
import {Grid} from "./components/grid/grid.component";
import {SearchBar} from "./components/search-bar/search-bar.component";
import classes from './planets.style.scss';
import {Planets} from "./planets.vm";

interface Props {
    planetsInfo: Planets;
    name: string;
    onSearch: (name: string, page?: number) => void;
}

export const PlanetsComponent = (props: Props) => {
    const {planetsInfo, onSearch, name} = props;

    const handleOnSearch = (name: string) => {
        onSearch(name, 1);
    }

    const getFooterTextContent = () => {
        const planetsLength = planetsInfo.planets.length;
        let startIndex = planetsLength * planetsInfo.currentPage - planetsLength
        if (planetsInfo.currentPage === 0) startIndex = 0;
        let endIndex = planetsInfo.planets.length * planetsInfo.currentPage;

        return `${startIndex} to ${endIndex} of ${planetsInfo.count} planets`;
    }

    return (
        <>
            <header className={classes.searchBar}>
                <SearchBar defaultSearch={""} onSearch={handleOnSearch}/>
            </header>

            <main className={classes.main}>
                <Grid planets={planetsInfo.planets}/>
            </main>

            <footer>
                <button disabled={!planetsInfo.hasPreviousPage}
                        onClick={() => onSearch(name, planetsInfo.currentPage - 1)}>prev
                </button>
                <span>{getFooterTextContent()}</span>
                <button disabled={!planetsInfo.hasNextPage}
                        onClick={() => onSearch(name, planetsInfo.currentPage + 1)}>next
                </button>
            </footer>
        </>
    );
};
