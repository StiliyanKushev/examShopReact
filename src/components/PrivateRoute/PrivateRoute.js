import React from "react";

const PrivateRoute = function({component:Component,handleRedirect,isAuth,...rest}){
    if(isAuth()){
        return <Component {...rest}/>;
    }
    else{
        return handleRedirect("/login");
    }
}

export default PrivateRoute;