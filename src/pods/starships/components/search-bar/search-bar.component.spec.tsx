import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {SearchBar} from "./search-bar.component";

describe('Search bar component specs', () => {
    it('should display the default value', () => {
        const defaultValue = 'radiohead';
        render(<SearchBar defaultSearch={defaultValue} onSearch={jest.fn()}/>);
        const element = screen.getByLabelText('search-input') as HTMLInputElement;
        expect(element).not.toBeNull();
        expect(element).toBeInTheDocument();
        expect(element.value).toBe('radiohead')
    });

    it('should call onSearch when input changes', () => {
        const onSearchStub = jest.fn();
        render(<SearchBar defaultSearch={''} onSearch={onSearchStub}/>);
        const inputElement = screen.getByLabelText('search-input');
        fireEvent.change(inputElement, {target: {value: 'radiohead'}})
        expect(onSearchStub).toHaveBeenCalledWith('radiohead');
    });
});
