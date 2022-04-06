import React from 'react';
import {render, screen} from '@testing-library/react';
import {CardArray} from "./card-array.component";
import {createDefaultCardVm} from "./card.vm";

describe('CardArray component specs', () => {
    it('should display the cards passed as props', () => {
        const cardVmMocked = createDefaultCardVm();
        cardVmMocked.mainLabel = 'card-item'
        render(<CardArray cards={[cardVmMocked]}/>);
        const imgElement = screen.getByRole('img') as HTMLImageElement;
        expect(imgElement.alt).toBe('card-item');
    });
});
