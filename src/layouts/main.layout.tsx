import * as React from 'react';

import classes from './main.layout.styles.scss';
import {Link} from "react-router-dom";
import {switchRoutes} from "core";

export const MainLayout: React.FC = (props) => {


    return (
        <>
            <div className={classes.appBarHorizontal}>
                <div className={classes.innerAppBarArrangement}>

                </div>
            </div>
            <div>
                <div className={classes.childrenContent}>
                    {props.children}
                </div>
                <div className={classes.navigation}>
                    <div>
                        <div className={classes.mainNavArrangement}>
                            <div><Link to={switchRoutes.planets}>
                                Planets
                            </Link>
                            </div>
                            <div>
                                <Link to={switchRoutes.starships}>
                                    Starships
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.menuBottom}>
                    <a onClick={() => {
                    }}>
                        <span>Footer</span>
                    </a>
                </div>
            </div>
        </>
    )
        ;
};
