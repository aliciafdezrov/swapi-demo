import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {SearchField} from "./search-field.component";

describe('Search field component specs', () => {
    it('should display the default value', () => {
        const defaultValue = 'death star';
        render(<SearchField defaultSearch={defaultValue} onSearch={jest.fn()}/>);
        const element = screen.getByLabelText('search-input') as HTMLInputElement;
        expect(element).not.toBeNull();
        expect(element).toBeInTheDocument();
        expect(element.value).toBe('death star')
    });

    it('should call onSearch when input changes', () => {
        const onSearchStub = jest.fn();
        render(<SearchField defaultSearch={''} onSearch={onSearchStub}/>);
        const inputElement = screen.getByLabelText('search-input');
        fireEvent.change(inputElement, {target: {value: 'death star'}})
        expect(onSearchStub).toHaveBeenCalledWith('death star');
    });
});
