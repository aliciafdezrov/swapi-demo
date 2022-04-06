import React, {useCallback, useState} from 'react';
import classes from './planets.style.scss';
import {Planets, PlanetVm} from "./planets.vm";
import {mapPlanetVmListToCardVmList} from "./planets.mapper";
import {Pagination} from "../../common/components/pagination/pagination.component";
import {SearchBar, CardArray, Loader} from "common/components";
import {sortDTOListByProp} from "common/utils";
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
    const [isSortAscending, setIsSortAscending] = useState<boolean>(true);

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

    const sortFunction = useCallback((planets: PlanetVm[]): PlanetVm[] => {
        if (!sortBy) return planets;
        return sortDTOListByProp(planets, sortBy, 'string', isSortAscending);
    }, [sortBy, isSortAscending]);
    const sortedPlanets: PlanetVm[] = sortFunction(planetsInfo.planets);

    return (
        <>
            <header>
                <div className={classes.sectionHeader}>
                    <h2>{"Planets"}</h2>
                </div>
            </header>

            <main className={classes.main}>
                <SearchBar onSearch={handleOnSearch} search={search} onSelect={setSortBy} selectValue={sortBy}
                           selectOptions={buildPlanetsSortOptions()} isAscending={isSortAscending}
                           onChangeSortDirection={setIsSortAscending}/>
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
