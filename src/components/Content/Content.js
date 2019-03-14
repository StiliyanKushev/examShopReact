//import all React things and external components
import React, { lazy } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CustomRoute from "../CustomRoute/CustomRoute";

//import the basic css for the the main tag
import "./Content.css";

// import the Views using lazy loading
const HomeView = lazy(() => import("../../views/Home/Home"));
const LoginView = lazy(() => import("../../views/Forms/Login/Login"));
const RegisterView = lazy(() => import("../../views/Forms/Register/Register"));
const SellView = lazy(() => import("../../views/Forms/Sell/Sell"));

const AppContent = function (props) {
    return (
        <main>
            <Switch>
                <Route path="/" render={() => <HomeView />} exact />
                <CustomRoute
                    path="/login"
                    redirectPath="/"
                    verification={!props.global.isAuth()}
                    component={LoginView}
                    handleSubmit={props.global.handleSubmit}
                    handleLoginRegister={props.global.handleLoginRegister}
                    handleChange={props.global.handleChange}
                    handleRedirect={props.global.handleRedirect}
                    exact />
                <CustomRoute
                    path="/register"
                    redirectPath="/"
                    verification={!props.global.isAuth()}
                    component={RegisterView}
                    handleSubmit={props.global.handleSubmit}
                    handleLoginRegister={props.global.handleLoginRegister}
                    handleChange={props.global.handleChange}
                    handleRedirect={props.global.handleRedirect}
                    exact />
                <CustomRoute
                    path="/sell"
                    component={SellView}
                    redirectPath="/login"
                    verification={props.global.isAuth()}
                    handleSell={props.global.handleSell}
                    handleChange={props.global.handleChange}
                    handleRedirect={props.global.handleRedirect}
                    exact />
            </Switch>
        </main>
    );
}

export default AppContent;