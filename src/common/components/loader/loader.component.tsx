import React from 'react';
import classes from './loader.style.scss';

interface Props {
    isShown: boolean;
}

export const Loader = (props: Props) => {
    const {isShown} = props;

    return isShown ? (
        <div className={classes.container}>
            <span className={classes.light}>Loading...</span>
        </div>
    ) : null;
};
