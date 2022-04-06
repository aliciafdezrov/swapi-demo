import {act, cleanup, renderHook} from '@testing-library/react-hooks';
import {useSearch, useSearchQueryParams} from './starships.hooks';
import * as api from './api/starships.api';

const mockNavigate = jest.fn();
const mockLocation = jest.fn();
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
}));
jest.mock('lodash.debounce', () => jest.fn(fn => fn));
jest.spyOn(console, 'error').mockImplementation(() => {
});

describe('useSearch tests', () => {
    const onLoadStarshipsStub = jest.fn();
    const useSearchDefaultProps = {
        onLoadStarships: onLoadStarshipsStub
    }

    beforeEach(() => {
        jest.useFakeTimers();
        jest.resetAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {
        });
    });

    afterEach(() => {
        cleanup();
        jest.useRealTimers();
    });

    test('should call immediately the api when calling it without name param', () => {
        const getstarshipsSpy = jest
            .spyOn(api, 'getStarships')
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

        expect(getstarshipsSpy).toHaveBeenCalled();
    });

    test('should call the api after 500ms applying debounce when calling it without name param', () => {
        const getStarshipsSpy = jest
            .spyOn(api, 'getStarships')
            .mockResolvedValue({
                count: 0,
                next: "http://localhost:9999/planets/?page=2",
                previous: null,
                results: [],
            });
        const {result} = renderHook(() => useSearch({...useSearchDefaultProps}));

        act(() => {
            result.current.onSearch("test");
            expect(getStarshipsSpy).not.toHaveBeenCalled();
            jest.advanceTimersByTime(600);
        });

        expect(getStarshipsSpy).toHaveBeenCalled();
    });

    test('should not call to loadStarships when the api fails', () => {
        jest.spyOn(api, 'getStarships')
            .mockRejectedValue('Some error');
        const {result} = renderHook(() => useSearch({...useSearchDefaultProps}));

        act(() => {
            result.current.onSearch(null);
        });

        expect(mockNavigate).not.toHaveBeenCalled();
        expect(onLoadStarshipsStub).not.toHaveBeenCalled();
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
