import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {PlanetsScene, StarshipsScene} from "../scenes";
import {switchRoutes} from "./routes";

export const RouterComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path={switchRoutes.root} element={<Navigate to={switchRoutes.planets}/>}/>
                <Route path={switchRoutes.planets} element={<PlanetsScene/>}/>
                <Route path={switchRoutes.starships} element={<StarshipsScene/>}/>
            </Routes>
        </Router>
    );
};
