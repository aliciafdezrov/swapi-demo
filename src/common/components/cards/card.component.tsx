import React from 'react';
import classes from "./card.style.scss";
import {CardVm} from "./card.vm";

interface Props {
    cardVm: CardVm
}

export const Card = (props: Props) => {
    const {cardVm} = props;

    return (
        <div className={`${classes.card} ${classes.fadeInCard}`}>
            <img src={cardVm.imgSrc}
                 alt={cardVm.mainLabel}
                 onError={(e: any) => {
                     e.target.onerror = null;
                     e.target.src = cardVm.defaultImg
                 }}
            />
            <div className={classes.container}>
                <h6>{cardVm.mainLabel}</h6>
                <h6>{cardVm.secondaryLabel}</h6>
                <h6>{cardVm.detailLabel}</h6>
            </div>
        </div>
    );
};
