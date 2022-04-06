import {renderHook, act, cleanup} from '@testing-library/react-hooks';
import {useSearch, useSearchQueryParams} from './planets.hooks';
import * as api from './api/planets.api';
import {switchRoutes} from "core/router";

const mockNavigate = jest.fn();
const mockLocation = jest.fn();
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
}));
jest.mock('lodash.debounce', () => jest.fn(fn => fn))

describe('useSearch tests', () => {
    const onLoadPlanetsStub = jest.fn();
    const useSearchDefaultProps = {
        onLoadPlanets: onLoadPlanetsStub
    }

    beforeEach(() => {
        jest.useFakeTimers();
        jest.resetAllMocks();
    });

    afterEach(() => {
        cleanup();
        jest.useRealTimers();
    });

    test('should call immediately the api when calling it without name param', () => {
        const getPlanetsSpy = jest
            .spyOn(api, 'getPlanets')
            .mockResolvedValue({
                count: 0,
                next: "http://localhost:9999/planets/?page=2",
                previous: null,
                results: [],
            });
        const {result} = renderHook(() => useSearch({...useSearchDefaultProps}));

        act(() => {
            result.current.onSearch(null)
        });

        expect(getPlanetsSpy).toHaveBeenCalled();
    });

    test('should call the api after 500ms applying debounce when calling it without name param', () => {
        const getPlanetsSpy = jest
            .spyOn(api, 'getPlanets')
            .mockResolvedValue({
                count: 0,
                next: "http://localhost:9999/planets/?page=2",
                previous: null,
                results: [],
            });
        const {result} = renderHook(() => useSearch({...useSearchDefaultProps}));

        act(() => {
            result.current.onSearch("test");
            expect(getPlanetsSpy).not.toHaveBeenCalled();
            jest.advanceTimersByTime(600);
        });

        expect(getPlanetsSpy).toHaveBeenCalled();
    });

    test('should not call to loadPlanets when the api fails', () => {
        jest.spyOn(api, 'getPlanets')
            .mockRejectedValue('Some error');
        const {result} = renderHook(() => useSearch({...useSearchDefaultProps}));

        act(() => {
            result.current.onSearch(null);
        });

        expect(mockNavigate).not.toHaveBeenCalled();
        expect(onLoadPlanetsStub).not.toHaveBeenCalled();
    });
});

describe('useSearchQueryParams tests', () => {
    test('should return empty string when search is empty', () => {
        const {result} = renderHook(() => useSearchQueryParams());
        let queryParam;

        act(() => {
            queryParam = result.current.getQueryParam("search")
        });

        expect(queryParam).toBe('');
    });
});
