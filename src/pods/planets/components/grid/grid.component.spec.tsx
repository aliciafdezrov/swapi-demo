import React from 'react';
import {render, screen} from '@testing-library/react';
import {Grid} from "./grid.component";
import {CatalogItem, createInitialCatalogItem} from "../../catalog.vm";

describe('Grid component specs', () => {
    it('should display the category type as a heading', () => {
        const itemsMocked = new Array<CatalogItem>();
        itemsMocked.push(createInitialCatalogItem());
        render(<Grid items={itemsMocked} categoryType={"artists"}/>);
        const element = screen.getByRole('heading') as HTMLHeadingElement;
        expect(element).toHaveTextContent('artists');
    });
});
