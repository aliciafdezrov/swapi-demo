import * as React from 'react';

import classes from './main.layout.styles.scss';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {switchRoutes} from "core";
import useMediaQuery from "./media-query.hook";

const planet = require("./planet.png")
const rocket = require("./rocket.png")
const deathStarImage = require("../../assets/ui/deathstar.webp")

export const MainLayout: React.FC = (props) => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const matchesMinSize = useMediaQuery('(min-width: 601px)');

    const currentPathname = (pathToCheck: string): boolean => {
        return pathToCheck === pathname;
    };

    return (
        <>
            <div className={classes.appBarHorizontal}>
                <label className={classes.title}>imperial destroyer center</label>
            </div>
            <div>
                <div className={classes.childrenContent}>
                    {props.children}
                </div>
                <div className={classes.navigation}>
                    <div className={classes.mainIconPlacement}>
                        {matchesMinSize ?
                            <img className={classes.deathStarMainMenuIcon}
                                 onClick={() => navigate(switchRoutes.planets)}
                                 src={deathStarImage}
                                 alt={"death start main menu"}/> : null
                        }
                    </div>
                    <Link style={currentPathname(switchRoutes.planets) ? {color: '#ffffff'} : null}
                          className={`${classes.mainNavItem} ${classes.initialBorder}`} to={switchRoutes.planets}>
                        {matchesMinSize ?
                            <div className={classes.iconAndTitle}>
                                <img className={classes.iconWithMargin}
                                     src={planet}
                                     alt={"planet icon"}/>
                                <span>PLANETS</span>
                            </div> : <img
                                className={currentPathname(switchRoutes.planets) ? `${classes.iconShadow} ${classes.icon}` : classes.icon}
                                src={planet}
                                alt={"planet icon"}/>
                        }

                    </Link>
                    <Link style={currentPathname(switchRoutes.starships) ? {color: '#ffffff'} : null}
                          className={classes.mainNavItem}
                          to={switchRoutes.starships}>
                        {matchesMinSize ?
                            <div className={classes.iconAndTitle}>
                                <img className={classes.iconWithMargin}
                                     src={rocket}
                                     alt={"rocket icon"}/>
                                <span>STARSHIPS</span>
                            </div> : <img
                                className={currentPathname(switchRoutes.starships) ? `${classes.iconShadow} ${classes.icon}` : classes.icon}
                                src={rocket}
                                alt={"planet icon"}/>
                        }
                    </Link>

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
