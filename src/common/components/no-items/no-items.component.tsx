import React from 'react';
import classes from './no-items.style.scss';
import {switchRoutes} from "core/router";
import {Link} from "react-router-dom";

export const NoItems: React.FC = () => {
    return (
        <div className={classes.notItemsContainer}>
            <h1 id={"no-items-found"} className={classes.notItemsText}>
                No items found
            </h1>
        </div>
    );
};
