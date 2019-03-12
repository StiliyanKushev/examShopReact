import React, { Component } from "react";
import {Link} from "react-router-dom";
import "../forms.css";

class RegisterView extends Component {
    constructor(props){
        super(props);

        this.state = {
            username:null,
            password:null,
            rpassword:null,
        }
    }

    render(){
        return (
        <div className="form register">
            <form onSubmit={(e) => this.props.handleSubmit(e,this.state)}>
                <div className="container">
                    <label htmlFor="username">
                        Username
                    </label>
                    <input onChange={this.props.handleChange.bind(this)} type="text" name="username" placeholder="Enter Username"/>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input onChange={this.props.handleChange.bind(this)} type="text" name="email" placeholder="Enter Email"/>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input onChange={this.props.handleChange.bind(this)} type="password" name="password" placeholder="Enter Password"/>
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