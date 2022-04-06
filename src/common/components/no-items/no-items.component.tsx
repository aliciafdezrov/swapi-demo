import React from 'react';
import classes from './no-items.style.scss';

export const NoItems: React.FC = () => {
    return (
        <div className={classes.notItemsContainer}>
            <h1 id={"no-items-found"} className={classes.notItemsText}>
                No items found
            </h1>
        </div>
    );
};
