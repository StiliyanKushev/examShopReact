//import all React things and external components
import React, { lazy } from "react";

// eslint-disable-next-line
import { BrowserRouter as Router, Route,Redirect, Switch } from "react-router-dom";
import CustomRoute from "../CustomRoute/CustomRoute";
import { withGlobalState } from 'react-globally';

//import the basic css for the the main tag
import "./Content.css";

// import the Views using lazy loading
const HomeView = lazy(() => import("../../views/Home/Home"));
const LoginView = lazy(() => import("../../views/Forms/Login/Login"));
const RegisterView = lazy(() => import("../../views/Forms/Register/Register"));
const SellView = lazy(() => import("../../views/Forms/Sell/Sell"));
const EditView = lazy(() => import("../../views/Forms/Edit/Edit"));
const ShopView = lazy(() => import("../../views/Shop/Shop"));
const InventoryView = lazy(() => import("../../views/Inventory/Inventory"));

const AppContent = function (props) {
    return (
        <main>
            <Switch>
                <Route path="/" render={() => <HomeView />} exact />
                <CustomRoute
                    path="/login"
                    redirectPath="/"
                    redirect={props.redirect}
                    verification={!props.globalState.userToken}
                    component={LoginView}
                    exact />
                <CustomRoute
                    path="/register"
                    redirectPath="/"
                    redirect={props.redirect}
                    verification={!props.globalState.userToken}
                    component={RegisterView}
                    exact />
                <CustomRoute
                    path="/sell"
                    redirectPath="/login"
                    redirect={props.redirect}
                    verification={props.globalState.userToken}
                    component={SellView}
                    exact />
                <CustomRoute
                    path="/inventory"
                    redirectPath="/login"
                    redirect={props.redirect}
                    verification={props.globalState.userToken}
                    component={InventoryView}
                    exact />
                <CustomRoute
                    path="/edit/:id"
                    redirectPath="/login"
                    redirect={props.redirect}
                    verification={props.globalState.userToken}
                    component={EditView}
                    />
                <Route
                    path="/shop"
                    render={() => <ShopView redirect={props.redirect} />}
                    exact />
                <Route
                    path="/shop"
                    render={() => <ShopView redirect={props.redirect} />}
                    exact />
                <Redirect to="/"/>
            </Switch>
        </main>
    );
}

export default withGlobalState(AppContent);