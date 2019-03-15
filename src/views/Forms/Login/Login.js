//import all React things and styles
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../forms.css";

//import external handlers
import { submit, change } from "../../../handlers/formHandler";
import { login } from "../../../handlers/userHandler";

class LoginView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
        }
    }

    render() {
        return (
            <div className="form">
                <form onSubmit={(e) => submit(e, this.state, "/auth/login", login, this.props.redirect)}>
                    <div className="container">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input onChange={change.bind(this)} type="text" name="email" placeholder="Enter Email" />
                        <label htmlFor="password">
                            Password
                        </label>
                        <input onChange={change.bind(this)} type="password" name="password" placeholder="Enter Password" />
                        <button type="submit" className="SubmitButton">Login</button>
                    </div>
                    <div className="otherOption">
                        <p>Don't have an account? <Link to="/register">Register.</Link></p>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginView;