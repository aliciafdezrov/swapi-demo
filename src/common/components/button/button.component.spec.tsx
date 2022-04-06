import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Button} from './button.component';

describe('Button component tests', () => {
	const defaultProps = {
		id: "button",
		onClick: jest.fn()
	};

	it('should display a button', () => {
		render(
			<Button {...defaultProps}/>
		);
		const buttonElement = screen.getByRole('button') as HTMLButtonElement;
		expect(buttonElement).toBeInTheDocument();
	});

	it('should call onClick when clicking the button', () => {
		const onClickStub = jest.fn();
		render(
			<Button id={defaultProps.id} onClick={onClickStub}/>
		);
		const buttonElement = screen.getByRole('button') as HTMLButtonElement;
		fireEvent.click(buttonElement);
		expect(onClickStub).toHaveBeenCalled();
	});

	it('should display children from props', () => {
		const onClickStub = jest.fn();
		render(
			<Button id={defaultProps.id} onClick={onClickStub}>
				<h1>HELLO WORLD!</h1>
			</Button>
		);
		const headingElement = screen.getByRole('heading') as HTMLButtonElement;
		expect(headingElement).toBeInTheDocument();
		expect(headingElement).toHaveTextContent('HELLO WORLD!');
	});
});
