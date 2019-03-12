import React, { lazy } from "react";
import "./Content.css";

// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const HomeView = lazy(() => import("../../views/Home/Home"));
const LoginView = lazy(() => import("../../views/Forms/Login/Login"));
const RegisterView = lazy(() => import("../../views/Forms/Register/Register"));
const SellView = lazy(() => import("../../views/Forms/Sell/Sell"));

const AppContent = function (props) {
    return (
        <main>
            <Switch>
                <Route path="/" render={() => <HomeView />} exact />
                <Route path="/login" render={() => <LoginView handleSubmit={props.handleSubmit} handleChange={props.handleChange} />} exact />
                <Route path="/register" render={() => <RegisterView handleSubmit={props.handleSubmit} handleChange={props.handleChange} />} exact />
                <PrivateRoute isAuth={props.isAuth} path="/sell" component={SellView} handleSell={props.handleSell} handleChange={props.handleChange} handleRedirect={props.handleRedirect} exact />
            </Switch>
        </main>
    );
}

export default AppContent;