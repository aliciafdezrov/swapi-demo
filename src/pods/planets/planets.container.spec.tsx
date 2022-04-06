import React from 'react';
import {render} from '@testing-library/react';
import {PlanetsContainer} from "./planets.container";
import * as hooks from './planets.hooks';
import {switchRoutes} from "core/router";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as {},
    useLocation: () => ({
        pathname: switchRoutes.planets,
        search: '',
        key: "1"
    })
}));

describe('Planet container specs', () => {
    it('should get query params when pathname is planets and search is empty', () => {
        const onSearchStub = jest.fn();
        const getQueryParamStub = jest.fn().mockReturnValue("").mockReturnValueOnce("").mockReturnValueOnce("earth");
        jest.spyOn(hooks, 'useSearchQueryParams').mockImplementation(() => ({getQueryParam: getQueryParamStub}));
        jest.spyOn(hooks, 'useSearch').mockImplementation(() => ({onSearch: onSearchStub}));
        render(
            <PlanetsContainer/>
        );
        expect(getQueryParamStub).toHaveBeenCalled();
        expect(onSearchStub).toHaveBeenCalled();
        expect(onSearchStub).toHaveBeenCalledWith("earth", undefined);
    });

    it('should call onSearch with page when it is different from empty string', () => {
        const onSearchStub = jest.fn();
        const getQueryParamStub = jest.fn().mockReturnValue("1").mockReturnValueOnce("1").mockReturnValueOnce("earth");
        jest.spyOn(hooks, 'useSearchQueryParams').mockImplementation(() => ({getQueryParam: getQueryParamStub}));
        jest.spyOn(hooks, 'useSearch').mockImplementation(() => ({onSearch: onSearchStub}));
        render(
            <PlanetsContainer/>
        );
        expect(getQueryParamStub).toHaveBeenCalled();
        expect(onSearchStub).toHaveBeenCalled();
        expect(onSearchStub).toHaveBeenCalledWith("earth", 1);
    });
});
