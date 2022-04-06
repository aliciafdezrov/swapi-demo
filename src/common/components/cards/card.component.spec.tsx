import React from 'react';
import {render, screen} from '@testing-library/react';
import {Card} from "./card.component";
import {createDefaultCardVm} from "./card.vm";

describe('Card component specs', () => {
    it('should display the main label as alt text when there is no image available', () => {
        const cardVmMocked = createDefaultCardVm();
        cardVmMocked.mainLabel = 'card-item'
        render(<Card cardVm={cardVmMocked}/>);
        const imgElement = screen.getByRole('img') as HTMLImageElement;
        expect(imgElement.alt).toBe('card-item');
    });

    it('should display the card info', () => {
        const cardVmMocked = createDefaultCardVm();
        cardVmMocked.mainLabel = 'card-item';
        cardVmMocked.detailLabel = "detail label";
        cardVmMocked.secondaryLabel = "secondary label";
        render(<Card cardVm={cardVmMocked}/>);
        expect(screen.getByText('card-item')).toBeInTheDocument();
        expect(screen.getByText("detail label")).toBeInTheDocument();
        expect(screen.getByText("secondary label")).toBeInTheDocument();
    });
});
