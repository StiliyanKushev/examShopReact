import React, { lazy } from "react";
import "./Content.css";

// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const HomeView = lazy(() => import("../../views/Home/Home"));

const AppContent = function (props) {
    return (
        <main>
            <Switch>
                <Route path="/" render={() => <HomeView />} exact />
            </Switch>
        </main>
    );
}

export default AppContent;