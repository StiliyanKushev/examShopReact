//import all React things and external Compoenets
import React from "react";
import { Link } from "react-router-dom";

//import the styles
import "./Header.css";

const AppHeader = function (props) {
    return (
        <header>
            <div>
                <Link to="/">EXAM SHOP</Link>
            </div>
            <nav>
                {
                    // if the user is logged in (has a username in the global/app state)
                    !props.global.state.username ? 
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
                            <Link to="#">Welcome {props.global.state.username}</Link>
                        </li>
                        <li>
                            {
                            //this is a silmple List Item that has an OnClick to logout
                            // eslint-disable-next-line
                            <a onClick={() => {props.global.handleLogout()}}>
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