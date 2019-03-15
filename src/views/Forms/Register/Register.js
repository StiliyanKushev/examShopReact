//import all React things and styles
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../forms.css";

//import external handlers
import { submit, change } from "../../../handlers/formHandler";
import { register } from "../../../handlers/userHandler";

class RegisterView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            email: null,
        }
    }

    render() {
        return (
            <div className="form register">
                <form onSubmit={(e) => submit(e, this.state, "/auth/register", register,this.props.redirect)}>
                    <div className="container">
                        <label htmlFor="username">
                            Username
                    </label>
                        <input onChange={change.bind(this)} type="text" name="username" placeholder="Enter Username" />
                        <label htmlFor="email">
                            Email
                    </label>
                        <input onChange={change.bind(this)} type="text" name="email" placeholder="Enter Email" />
                        <label htmlFor="password">
                            Password
                    </label>
                        <input onChange={change.bind(this)} type="password" name="password" placeholder="Enter Password" />
                        <button type="submit" className="SubmitButton">Register</button>
                    </div>
                    <div className="otherOption">
                        <p>Have an account? <Link to="/login">Login.</Link></p>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterView;