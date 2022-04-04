import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {AuthContext, createEmptyAuthorization} from "../../common/auth";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {CatalogContainer} from "./catalog.container";
import * as hooks from './catalog.hooks';

const renderWithRouter = (component) => {
    return {
        ...render(
            <BrowserRouter>
                <Switch>
                    <Route path="/test" component={CatalogContainer}/>
                </Switch>
                {component}
            </BrowserRouter>
        ),
    };
};

describe('Catalog container specs', () => {
    it('should display a logout button', () => {
        const authMocked = createEmptyAuthorization();
        renderWithRouter(
            <AuthContext.Provider value={{auth: authMocked, onChangeAuth: jest.fn()}}>
                <CatalogContainer/>
            </AuthContext.Provider>
        );
        const buttonElement = screen.getByRole('button') as HTMLButtonElement;
        expect(buttonElement).toHaveTextContent('Logout');
    });

    it('should call on change auth when clicking the logout button', () => {
        const authMocked = createEmptyAuthorization();
        const onChangeAuthStub = jest.fn();
        renderWithRouter(
            <AuthContext.Provider value={{auth: authMocked, onChangeAuth: onChangeAuthStub}}>
                <CatalogContainer/>
            </AuthContext.Provider>
        );
        const buttonElement = screen.getByRole('button') as HTMLButtonElement;
        fireEvent.click(buttonElement);
        expect(onChangeAuthStub).toHaveBeenCalled();
        expect(onChangeAuthStub).toHaveBeenCalledWith(createEmptyAuthorization());
    });

    it('should make a request when there is a search query param in the url', () => {
        const authMocked = createEmptyAuthorization();
        const onChangeAuthStub = jest.fn();
        const onSearchStub = jest.fn();
        const mockgetquery = () => 'cold'
        jest.spyOn(hooks, 'useSearchQueryParams').mockImplementation(() => ({getQueryParam: mockgetquery}));
        jest.spyOn(hooks, 'useSearch').mockImplementation(() => ({onSearch: onSearchStub}));
        renderWithRouter(
            <AuthContext.Provider value={{auth: authMocked, onChangeAuth: onChangeAuthStub}}>
                <CatalogContainer/>
            </AuthContext.Provider>
        );
        expect(onSearchStub).toHaveBeenCalled();
        expect(onSearchStub).toHaveBeenCalledWith('cold');
    });

    it('should not make a request when there is no search query param in the url', () => {
        const authMocked = createEmptyAuthorization();
        const onChangeAuthStub = jest.fn();
        const onSearchStub = jest.fn();
        const mockgetquery = () => ''
        jest.spyOn(hooks, 'useSearchQueryParams').mockImplementation(() => ({getQueryParam: mockgetquery}));
        jest.spyOn(hooks, 'useSearch').mockImplementation(() => ({onSearch: onSearchStub}));
        renderWithRouter(
            <AuthContext.Provider value={{auth: authMocked, onChangeAuth: onChangeAuthStub}}>
                <CatalogContainer/>
            </AuthContext.Provider>
        );
        expect(onSearchStub).not.toHaveBeenCalled();
    });
});
