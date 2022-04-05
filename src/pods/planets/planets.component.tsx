import React, {useCallback, useState} from 'react';
import classes from './planets.style.scss';
import {Planets, PlanetVm} from "./planets.vm";
import {mapPlanetVmListToCardVmList} from "./planets.mapper";
import {Pagination} from "../../common/components/pagination/pagination.component";
import {SearchBar, CardArray, sortDTOListByProp, Loader} from "common";
import {SelectItem} from "../../common/components/search-bar/select-field/select-field.component";

interface Props {
    planetsInfo: Planets;
    search: string;
    onSearch: (name: string, page?: number) => void;
    loading: boolean;
}

const buildPlanetsSortOptions = (): SelectItem[] => ([
    {
        name: "Name",
        value: "name"
    },
]);

export const PlanetsComponent = (props: Props) => {
    const {planetsInfo, onSearch, search, loading} = props;
    const [sortBy, setSortBy] = useState<string>();

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

    const sortFunction = useCallback((planets: PlanetVm[], isAsc: boolean): PlanetVm[] => {
        if (!sortBy) return planets;
        return sortDTOListByProp(planets, sortBy, 'string', isAsc);
    }, [sortBy]);
    const sortedPlanets: PlanetVm[] = sortFunction(planetsInfo.planets, true);

    return (
        <>
            <header>
                <div className={classes.sectionHeader}>
                    <h2>{"Planets"}</h2>
                </div>
            </header>

            <main className={classes.main}>
                <SearchBar onSearch={handleOnSearch} search={search} onSelect={setSortBy} selectValue={sortBy}
                           selectOptions={buildPlanetsSortOptions()}/>
                {!loading ? <CardArray cards={mapPlanetVmListToCardVmList(sortedPlanets)}/> : null}
            </main>
            <Loader isShown={loading}/>

            {!loading ? (
                <div className={classes.pagination}>
                    <Pagination
                        search={search}
                        currentPage={planetsInfo.currentPage}
                        hasNextPage={planetsInfo.hasNextPage}
                        hasPreviousPage={planetsInfo.hasPreviousPage}
                        onSearch={onSearch}
                        textContent={getFooterTextContent()}
                    />
                </div>
            ) : null}
        </>
    );
};
