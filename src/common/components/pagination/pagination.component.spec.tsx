import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Pagination} from "./pagination.component";

describe('Pagination component specs', () => {
    const onSearchStub = jest.fn();
    const defaultProps = {
        hasPreviousPage: false,
        currentPage: 1,
        textContent: "Pagination text content",
        hasNextPage: true,
        search: '',
        onSearch: onSearchStub,
    }

    it('should render textContent as a text content', () => {
        render(<Pagination {...defaultProps} hasNextPage={false}/>);
        const textContent = screen.getByText("Pagination text content") as HTMLSpanElement;
        expect(textContent).toBeInTheDocument();
    });

    it('should display the previous button as disabled when hasPreviousPage is false', () => {
        render(<Pagination {...defaultProps}/>);
        const prevButton = screen.getByLabelText("previous page button") as HTMLButtonElement;
        expect(prevButton).toBeDisabled();
    });

    it('should display the next button as disabled when hasNextPage is false', () => {
        render(<Pagination {...defaultProps} hasNextPage={false}/>);
        const nextButton = screen.getByLabelText("next page button") as HTMLButtonElement;
        expect(nextButton).toBeDisabled();
    });

    it('should call onSearch when clicking previous button', () => {
        let currentPage = 2;
        render(<Pagination {...defaultProps} hasPreviousPage={true} currentPage={currentPage}/>);
        const prevButton = screen.getByLabelText("previous page button") as HTMLButtonElement;
        fireEvent.click(prevButton);
        expect(onSearchStub).toHaveBeenCalled();
        expect(onSearchStub).toHaveBeenCalledWith(defaultProps.search, currentPage - 1);
    });

    it('should call onSearch when clicking next button', () => {
        let currentPage = 2;
        render(<Pagination {...defaultProps} currentPage={currentPage}/>);
        const nextButton = screen.getByLabelText("next page button") as HTMLButtonElement;
        fireEvent.click(nextButton);
        expect(onSearchStub).toHaveBeenCalled();
        expect(onSearchStub).toHaveBeenCalledWith(defaultProps.search, currentPage + 1);
    });
});
