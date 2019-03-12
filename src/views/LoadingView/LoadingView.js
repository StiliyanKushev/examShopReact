import React from 'react';
import "./LoadingView.css";

const LoadingView = function () {
    return (
        <React.Fragment>
            <div className="fakeHeader"></div>
            <div className="loadingView"></div>
        </React.Fragment>
    );
}

export default LoadingView;