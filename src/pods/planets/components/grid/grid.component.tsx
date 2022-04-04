import React from 'react';
import classes from "./grid.style.scss";
import {GridItem} from "./grid-item.component";
import {Planet} from "../../planets.vm";

interface Props {
    planets: Planet[];
}

export const Grid = (props: Props) => {
    const {planets} = props;
    return (
        <section className={classes.section}>
            <div>
                <div className={classes.gridContainer}>
                    {
                        planets.map(item => <GridItem key={item.name} item={item}/>)
                    }
                </div>
            </div>
        </section>
    );
};
