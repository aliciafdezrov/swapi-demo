import React from "react";
import {HashRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {PlanetsScene, StarshipsScene} from "scenes";
import {switchRoutes} from "./routes";
import {NotFound} from "common/components";

export const RouterComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path={switchRoutes.root} element={<Navigate to={switchRoutes.planets}/>}/>
                <Route path={switchRoutes.planets} element={<PlanetsScene/>}/>
                <Route path={switchRoutes.starships} element={<StarshipsScene/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
};
