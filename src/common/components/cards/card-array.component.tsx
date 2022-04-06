import React from 'react';
import classes from "./card-array.style.scss";
import {Card} from "./card.component";
import {CardVm} from "./card.vm";

interface Props {
    cards: CardVm[];
}

export const CardArray = (props: Props) => {
    const {cards} = props;
    return (
        <div id={"card-array"} className={classes.gridContainer}>
            {
                cards.map(item => <Card key={item.mainLabel} cardVm={item}/>)
            }
        </div>
    );
};
