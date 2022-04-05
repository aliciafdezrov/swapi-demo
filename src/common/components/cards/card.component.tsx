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
              <div style={{paddingTop: '10px'}}>
                <label className={classes.mainLabel}>{cardVm.mainLabel}</label>
              </div>

              <div style={{paddingTop: '10px'}}>
                <label className={classes.secondaryLabel}>{cardVm.secondaryLabel}</label>
              </div>

              <div style={{paddingTop: '10px'}}>
                <label className={classes.detailLabel}>Population of {cardVm.detailLabel}</label>
              </div>

            </div>
        </div>
    );
};
