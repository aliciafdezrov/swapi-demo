import * as React from 'react';
import classes from './main.layout.styles.scss';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {switchRoutes} from "core/router";
import useMediaQuery from "./media-query.hook";
import {Dialog} from "../common/components/dialog/dialog.component";

const planet = require("./planet.png")
const rocket = require("./rocket.png")
const deathStarImage = require("../../assets/ui/deathstar.webp")

export const MainLayout: React.FC = (props) => {
    const navigate = useNavigate();
    const {pathname, search} = useLocation();
    const matchesMinSize = useMediaQuery('(min-width: 601px)');
    const [warningDialogOpen, setWarningDialogOpen] = React.useState(false);

    const currentPathname = (pathToCheck: string): boolean => {
        return pathToCheck === pathname;
    };

    const handleToggleDialog = () => {
        setWarningDialogOpen(!warningDialogOpen)
    }

    const buildToRoute = (toPathname: string) => {
        if (currentPathname(toPathname)) {
            return `${toPathname}${search}`;
        }
        return toPathname;
    }

    return (
        <>
            <div className={classes.appBarHorizontal}>
                <label id={"main-title"} className={classes.title}>imperial destroyer center</label>
            </div>
            <div>
                <div className={classes.childrenContent}>
                    {props.children}
                </div>
                <div className={classes.navigation}>
                    <div className={classes.mainIconPlacement}>
                        {matchesMinSize ?
                            <img id={"death-star-menu-item"} className={classes.deathStarMainMenuIcon}
                                 onClick={() => navigate(switchRoutes.planets)}
                                 src={deathStarImage}
                                 alt={"death start main menu"}/> : null
                        }
                    </div>
                    <Link id={"planets-menu-item"}
                          style={currentPathname(switchRoutes.planets) ? {color: '#ffffff'} : null}
                          className={`${classes.mainNavItem} ${classes.initialBorder}`}
                          to={buildToRoute(switchRoutes.planets)}>
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
                    <Link id={"starships-menu-item"}
                          style={currentPathname(switchRoutes.starships) ? {color: '#ffffff'} : null}
                          className={classes.mainNavItem}
                          to={buildToRoute(switchRoutes.starships)}>
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
                    <a id={"about-footer-anchor"} onClick={handleToggleDialog}>
                        <span>About sorting: &#9432;</span>
                    </a>
                </div>
            </div>

            <Dialog
                isOpen={warningDialogOpen}
                message={"API doesn't support sorting. Therefore, only the items of the current page will be displayed sorted"}
                onHide={handleToggleDialog}
                header={"Warning"}
            />
        </>
    )
        ;
};
