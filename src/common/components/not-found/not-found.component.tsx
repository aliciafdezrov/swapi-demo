import React from 'react';
import classes from './not-found.style.scss';
import {switchRoutes} from "core/router";
import {Link} from "react-router-dom";

export const NotFound = () => {
    return (
        <div className={classes.notFoundContainer}>
            <h1 id={"404-header"} className={classes.notFoundText}>
                404
            </h1>
            <h2 className={classes.notFoundText}>Page Not Found</h2>

            <div className={classes.backIndex}>
                <Link aria-label="link to main login page due to not found"
                      to={switchRoutes.root}>Back to index</Link></div>
        </div>
    );
};
