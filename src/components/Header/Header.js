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
            </nav>
        </header>
    );
}

export default AppHeader;