import React from 'react';
import {Grid} from "./components/grid/grid.component";
import {SearchBar} from "./components/search-bar/search-bar.component";
import classes from './planets.style.scss';
import {Planet} from "./planets.vm";

interface Props {
    planets: Planet[];
    onSearch: (name: string) => void;
}

export const PlanetsComponent = (props: Props) => {
    const {planets, onSearch} = props;
    return (
        <>
            <header className={classes.searchBar}>
                <SearchBar defaultSearch={""} onSearch={onSearch}/>
            </header>

            <main className={classes.main}>
                <Grid planets={planets}/>)
            </main>
        </>
    );
};
