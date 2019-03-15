import React from "react";

const CustomRoute = function({component:Component,redirect,verification,redirectPath,...rest}){
    if(verification){
        return <Component {...rest} redirect={redirect}/>;
    }
    else{
        return redirect(redirectPath);
    }
}

export default CustomRoute;