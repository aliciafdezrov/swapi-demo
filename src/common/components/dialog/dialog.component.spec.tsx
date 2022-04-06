import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Dialog} from './dialog.component';

describe('Dialog component tests', () => {
    const defaultProps = {
        isOpen: false,
        header: "header",
        message: "message",
        onHide: jest.fn()
    };

    it('should display empty when isOpen is false', () => {
        const {container} = render(
            <Dialog {...defaultProps}/>
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('should display correctly when isOpen is true', () => {
        render(
            <Dialog {...defaultProps} isOpen={true}/>
        );
        const dialogElement = screen.getByRole('dialog', {hidden: true});
        expect(dialogElement).toBeInTheDocument();

        const headingElement = screen.getByRole('heading', {hidden: true});
        expect(headingElement).toBeInTheDocument();
        expect(headingElement).toHaveTextContent(defaultProps.header);

        const buttonElement = screen.getByRole('button', {hidden: true});
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('OK');
    });

    it('should display the message based on the props', () => {
        render(
            <Dialog {...defaultProps} isOpen={true}/>
        );

        const labelElement = screen.getByLabelText('detail-message');
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveTextContent(defaultProps.message);
    });

    it('should call onHide when clicking on dialog button', () => {
        const onHideStub = jest.fn();
        render(
            <Dialog {...defaultProps} isOpen={true} onHide={onHideStub}/>
        );

        const buttonElement = screen.getByRole('button', {hidden: true});
        fireEvent.click(buttonElement);
        expect(onHideStub).toHaveBeenCalled();
    });
});
