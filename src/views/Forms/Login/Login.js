import React, { Component } from "react";
import {Link} from "react-router-dom";
import "../forms.css";

class LoginView extends Component {
    constructor(props){
        super(props);

        this.state = {
            username:null,
            password:null,
        }
    }

    render(){
        return (
            <div className="form">
                <form onSubmit={(e) => this.props.handleSubmit(e,this.state,"/login",this.props.handleLoginRegister)}>
                    <div className="container">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input onChange={this.props.handleChange.bind(this)} type="text" name="email" placeholder="Enter Email"/>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input onChange={this.props.handleChange.bind(this)} type="password" name="password" placeholder="Enter Password"/>
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