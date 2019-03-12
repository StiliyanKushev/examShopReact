import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const AppHeader = function (props) {
    return (
        <header>
            <div>
                <Link to="/">EXAM SHOP</Link>
            </div>
            <nav>
                {
                    !props.username ? 
                    (
                    <ul>
                        <li>
                            <Link to="/shop">
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                Register
                            </Link>
                        </li>
                    </ul>
                    ) :
                    (
                    <ul>
                        <li>
                            <Link to="/shop">
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link to="/sell">
                                Sell
                            </Link>
                        </li>
                        <li id="welcomeLink">
                            <Link to="#">Welcome {props.username}</Link>
                        </li>
                        <li>
                            {// eslint-disable-next-line
                            <a onClick={() => {props.handleLogout()}}>
                                Logout
                            </a>}
                        </li>
                    </ul>
                    )
                }
            </nav>
        </header>
    );
}

export default AppHeader;