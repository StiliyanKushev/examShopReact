import React, { Suspense, Component } from 'react';
import "./App.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Redirect from 'react-router-dom/Redirect';

import AppHeader from "./components/Header/Header";
import AppFooter from './components/Footer/Footer';
import AppContent from "./components/Content/Content";

import LoadingView from "./views/LoadingView/LoadingView";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      redirectPath: null,

      username: sessionStorage.getItem("username") || null,
      userToken: sessionStorage.getItem("userToken") || null,
      isAdmin: sessionStorage.getItem("isAdmin") || null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.saveUserInSession = this.saveUserInSession.bind(this);
    this.removeUserFromSession = this.removeUserFromSession.bind(this);
    this.handleSell = this.handleSell.bind(this);
    this.isAuth = this.isAuth.bind(this);
  }

  saveUserInSession(resBody) {
    sessionStorage.setItem("username", resBody.user.username);
    sessionStorage.setItem("userToken", resBody.token);
    sessionStorage.setItem("isAdmin", resBody.user.roles.indexOf("Admin") !== -1);
  }

  removeUserFromSession() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("isAdmin");
  }

  isAuth() {
    return this.state.userToken === null ? false : true;
  }

  //functions for handling forms 
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //NOTE: only for register and login
  handleSubmit(e, data, isLogin) {
     
    e.preventDefault();
    const url = "http://localhost:9999/auth/" + (isLogin ? "login" : "register");
    fetch(url, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }).then(rawData => rawData.json())
      .then(resBody => {
         
        if (resBody.success === true) {
          this.saveUserInSession(resBody);

          this.handleRedirect("/", {
            username: resBody.user.username,
            userToken: resBody.token,
            isAdmin: resBody.user.roles.indexOf("Admin") !== -1
          });

          toast.success(`Wellcome ${resBody.message}`, {
            closeButton: false,
            autoClose: true
          });
        }
        else {
          if (resBody.errors) {
            if (resBody.errors.username)
              toast.error(`${resBody.errors.username}`, {
                closeButton: false,
                autoClose: true
              });
            if (resBody.errors.email)
              toast.error(`${resBody.errors.email}`, {
                closeButton: false,
                autoClose: true
              });
            if (resBody.errors.password)
              toast.error(`${resBody.errors.password}`, {
                closeButton: false,
                autoClose: true
              });
          }
          else if (resBody.message) {
            if (resBody.message)
              toast.error(`${resBody.message}`, {
                closeButton: false,
                autoClose: true
              });
          }
        }
      });
  }

  handleRedirect(path, newState, callback) {
    if (newState) {
      this.setState({
        ...{
          redirect: true,
          redirectPath: path,
        }, ...newState
      }, callback);
    }

    else {
      this.setState({
        redirect: true,
        redirectPath: path,
      }, callback);
    }

    return null;
  }

  handleLogout() {
    this.removeUserFromSession();
    this.handleRedirect("/", {
      username: null,
      userId: null,
      userToken: null,
      isAdmin: null,
    });
  }

  handleSell(e, data) {
    data.creator = sessionStorage.getItem("username");
    e.preventDefault();
    const url = "http://localhost:9999/feed/product/create";
    fetch(url, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }).then(rawData => rawData.json())
      .catch(error => {
        toast.error(`${error}`, {
          closeButton: false,
          autoClose: true
        });
      })
      .then(resBody => {
         
        if (resBody.success === true) {
          this.handleRedirect("/");
          toast.success(`${resBody.message}`, {
            closeButton: false,
            autoClose: true
          });
        }
        else {
          if (resBody.errors) {
            if (resBody.errors.title)
              toast.error(`${resBody.errors.title}`, {
                closeButton: false,
                autoClose: true
              });
            if (resBody.errors.description)
              toast.error(`${resBody.errors.description}`, {
                closeButton: false,
                autoClose: true
              });
            if (resBody.errors.imageUrl)
              toast.error(`${resBody.errors.imageUrl}`, {
                closeButton: false,
                autoClose: true
              });
            if (resBody.errors.price)
              toast.error(`${resBody.errors.price}`, {
                closeButton: false,
                autoClose: true
              });
          }
        }
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirectPath} />
    }
    return (
      <div className="App">
        <Suspense fallback={<LoadingView />}>
          <ToastContainer autoClose={2300} />
          <AppHeader username={this.state.username} handleLogout={this.handleLogout} handleRedirect={this.handleRedirect} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
          <AppContent isAuth={this.isAuth} handleSell={this.handleSell} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleRedirect={this.handleRedirect} />
          <AppFooter />
        </Suspense>
      </div>
    );
  }

  componentDidUpdate() {
    if (this.state.redirect) {
      this.setState({
        redirect: null,
        redirectPath: null,
      })
    }
  }
}

export default App;
