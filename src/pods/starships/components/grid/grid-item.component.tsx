import React from 'react';
import classes from "./grid-item.style.scss";
import {Starship} from "../../starships.vm";

const defaultItemImage = require("../../../../../assets/default.jpg");

interface Props {
    item: Starship;
}

export const GridItem = (props: Props) => {
    const {item} = props;

    return (
        <div className={`${classes.card} ${classes.fadeInCard}`}>
            <img src={`../../../../../assets/planets/${item.name.toLowerCase()}.jpg`}
                 alt={item.name}
                 onError={(e: any) => {
                     e.target.onerror = null;
                     e.target.src = defaultItemImage
                 }}
                 width="300"
                 height="300"/>
            <div className={classes.container}>
                <label>{item.name}</label>
            </div>
        </div>
    );
};
