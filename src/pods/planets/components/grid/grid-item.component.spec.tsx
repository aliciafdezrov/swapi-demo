import React from 'react';
import {render, screen} from '@testing-library/react';
import {createInitialCatalogItem} from "../../catalog.vm";
import {GridItem} from "./grid-item.component";

describe('Grid item component specs', () => {
    it('should display the item name as alt text when there is no image available', () => {
        const catalogItemMocked = createInitialCatalogItem();
        catalogItemMocked.name = 'grid-item'
        render(<GridItem item={catalogItemMocked}/>);
        const imgElement = screen.getByRole('img') as HTMLImageElement;
        expect(imgElement.alt).toBe('grid-item');
    });

    it('should display the item name in the label', () => {
        const catalogItemMocked = createInitialCatalogItem();
        catalogItemMocked.name = 'grid-item'
        render(<GridItem item={catalogItemMocked}/>);
        expect(screen.getByText('grid-item')).toBeInTheDocument();
    });
});
