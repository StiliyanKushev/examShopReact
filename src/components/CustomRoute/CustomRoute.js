import React from "react";

const CustomRoute = function({component:Component,handleRedirect,verification,redirectPath,...rest}){
    if(verification){
        return <Component {...rest}/>;
    }
    else{
        return handleRedirect(redirectPath);
    }
}

export default CustomRoute;