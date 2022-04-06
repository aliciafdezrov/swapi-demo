import {renderHook, act, cleanup} from '@testing-library/react-hooks';
import {useSearch} from './planets.hooks';
import * as api from './api/planets.api';
import {switchRoutes} from "core/router";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate
}));
jest.mock('lodash.debounce', () => jest.fn(fn => fn))

describe('useSearch tests', () => {
    const onLoadPlanetsStub = jest.fn();
    const useSearchDefaultProps = {
        onLoadPlanets: onLoadPlanetsStub
    }

    beforeEach(() => {
        jest.useFakeTimers();
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

    xtest('should add search params when the api resolves correctly', () => {
        const getPlanetsSpy = jest
            .spyOn(api, 'getPlanets')
            .mockResolvedValue({
                count: 0,
                next: "http://localhost:9999/planets/?page=6",
                previous: "http://localhost:9999/planets/?page=4",
                results: [],
            });
        const {result} = renderHook(() => useSearch({...useSearchDefaultProps}));

        act(() => {
            result.current.onSearch("test1", 5);
            jest.advanceTimersByTime(20000);
        });

        expect(mockNavigate).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith({
            pathname: switchRoutes.planets,
            search: `?name=test1&page=5`
        })
    });
});
