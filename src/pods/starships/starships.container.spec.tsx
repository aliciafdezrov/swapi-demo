import React from 'react';
import {render} from '@testing-library/react';
import {StarshipsContainer} from "./starships.container";
import * as hooks from './starships.hooks';
import {switchRoutes} from "core/router";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as {},
    useLocation: () => ({
        pathname: switchRoutes.starships,
        search: '',
        key: "1"
    })
}));

describe('Starship container specs', () => {
    it('should get query params when pathname is planets and search is empty', () => {
        const onSearchStub = jest.fn();
        const getQueryParamStub = jest.fn().mockReturnValue("").mockReturnValueOnce("").mockReturnValueOnce("death");
        jest.spyOn(hooks, 'useSearchQueryParams').mockImplementation(() => ({getQueryParam: getQueryParamStub}));
        jest.spyOn(hooks, 'useSearch').mockImplementation(() => ({onSearch: onSearchStub}));
        render(
            <StarshipsContainer/>
        );
        expect(getQueryParamStub).toHaveBeenCalled();
        expect(onSearchStub).toHaveBeenCalled();
        expect(onSearchStub).toHaveBeenCalledWith("death", undefined);
    });

    it('should call onSearch with page when it is different from empty string', () => {
        const onSearchStub = jest.fn();
        const getQueryParamStub = jest.fn().mockReturnValue("1").mockReturnValueOnce("1").mockReturnValueOnce("death");
        jest.spyOn(hooks, 'useSearchQueryParams').mockImplementation(() => ({getQueryParam: getQueryParamStub}));
        jest.spyOn(hooks, 'useSearch').mockImplementation(() => ({onSearch: onSearchStub}));
        render(
            <StarshipsContainer/>
        );
        expect(getQueryParamStub).toHaveBeenCalled();
        expect(onSearchStub).toHaveBeenCalled();
        expect(onSearchStub).toHaveBeenCalledWith("death", 1);
    });
});
