import React, {useState} from 'react';
import classes from './planets.style.scss';
import {Planets} from "./planets.vm";
import {mapPlanetVmListToCardVmList} from "./planets.mapper";
import {SearchBar, CardArray} from "common";

interface Props {
    starshipsInfo: Planets;
    search: string;
    onSearch: (name: string, page?: number) => void;
}

export const PlanetsComponent = (props: Props) => {
    const {starshipsInfo, onSearch, search} = props;
    const [sortBy, setSortBy] = useState<string>();

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

    const handleOnSort = (sortBy: string) => {
        console.log(sortBy);
    }

    return (
        <>
            <header>
                <div className={classes.sectionHeader}>
                    <h2>{"Planets"}</h2>
                </div>
            </header>

            <main className={classes.main}>
                <SearchBar onSearch={handleOnSearch} search={""} onSelect={handleOnSort} selectValue={sortBy}
                           selectOptions={[{name: 'None', value: 'none'}]}/>
                <CardArray cards={mapPlanetVmListToCardVmList(starshipsInfo.planets)}/>
            </main>

            <button disabled={!starshipsInfo.hasPreviousPage}
                    onClick={() => onSearch(search, starshipsInfo.currentPage - 1)}>prev
            </button>
            <span>{getFooterTextContent()}</span>
            <button disabled={!starshipsInfo.hasNextPage}
                    onClick={() => onSearch(search, starshipsInfo.currentPage + 1)}>next
            </button>
        </>
    );
};
