import React, {useCallback, useState} from 'react';
import classes from './planets.style.scss';
import {Planets, PlanetVm} from "./planets.vm";
import {mapPlanetVmListToCardVmList} from "./planets.mapper";
import {Pagination} from "../../common/components/pagination/pagination.component";
import {CardArray, CircularSpinner, SearchBar} from "common/components";
import {sortDTOListByProp} from "common/utils";
import {empty_option, SelectItem} from "../../common/components/search-bar/select-field/select-field.component";
import {NoItems} from "../../common/components/no-items/no-items.component";

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

    const handleOnPaginationSearch = (name: string, page?: number) => {
        onSearch(name, page);
        if (sortBy !== undefined || sortBy !== empty_option.name) {
            setSortBy(empty_option.name);
            setIsSortAscending(true);
        }
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
                    <h2 id={"category-header-planets"}>{"Planets"}</h2>
                </div>
            </header>

            <main className={classes.main}>
                <SearchBar onSearch={handleOnSearch} search={search} onSelect={setSortBy} selectValue={sortBy}
                           selectOptions={buildPlanetsSortOptions()} isAscending={isSortAscending}
                           onChangeSortDirection={setIsSortAscending}/>
                {loading ? <div className={classes.mainSpinner}><CircularSpinner/></div> : sortedPlanets.length > 0 ?
                    <CardArray cards={mapPlanetVmListToCardVmList(sortedPlanets)}/> : <NoItems/>}
            </main>

            {loading || sortedPlanets.length === 0 ? null :
                <div className={classes.pagination}>
                    <Pagination
                        search={search}
                        currentPage={planetsInfo.currentPage}
                        hasNextPage={planetsInfo.hasNextPage}
                        hasPreviousPage={planetsInfo.hasPreviousPage}
                        onSearch={handleOnPaginationSearch}
                        textContent={getFooterTextContent()}
                    />
                </div>
            }
        </>
    );
};
