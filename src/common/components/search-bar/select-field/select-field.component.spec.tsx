import React from 'react';
import {render, screen} from '@testing-library/react';
import {SelectField} from "./select-field.component";

describe('Select field component specs', () => {
    const defaultProps = {
        options: [],
        isAscending: true,
        value: null,
        onChangeSortDirection: jest.fn(),
        onSelect: jest.fn()
    };

    it('should display the none value by default', () => {
        render(<SelectField {...defaultProps} />);
        expect(screen.getByRole('option', {name: 'None'})).toBeInTheDocument()
    });
});
