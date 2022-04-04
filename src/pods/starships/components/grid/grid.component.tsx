import React from 'react';
import classes from "./grid.style.scss";
import {GridItem} from "./grid-item.component";
import {Starship} from "../../starships.vm";

interface Props {
    starships: Starship[];
}

export const Grid = (props: Props) => {
    const {starships} = props;
    return (
        <section className={classes.section}>
            <div>
                <div className={classes.gridContainer}>
                    {
                        starships.map(item => <GridItem key={item.name} item={item}/>)
                    }
                </div>
            </div>
        </section>
    );
};
