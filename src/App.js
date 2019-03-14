//import all React things and external components
import React, { Suspense, Component } from 'react';
import Redirect from 'react-router-dom/Redirect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import the styles
import "./App.css";

//import all components that will render
import AppHeader from "./components/Header/Header";
import AppFooter from './components/Footer/Footer';
import AppContent from "./components/Content/Content";

//import the loading Component in the Suspense
import LoadingView from "./views/LoadingView/LoadingView";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectPath: null,

      username: sessionStorage.getItem("username") || null,
      userToken: sessionStorage.getItem("userToken") || null,
      isAdmin: sessionStorage.getItem("isAdmin") || null,
    }

    //bind all functions
    this.isAuth = this.isAuth.bind(this);
    this.handleSell = this.handleSell.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.saveUserInSession = this.saveUserInSession.bind(this);
    this.handleLoginRegister = this.handleLoginRegister.bind(this);
    this.removeUserFromSession = this.removeUserFromSession.bind(this);
    this.manageDatabaseResponse = this.manageDatabaseResponse.bind(this);
  }

  //function that handles the responses of other functions 
  manageDatabaseResponse(resBody, onSuccess) {
    if (resBody.success === true) {
      onSuccess();
      toast.success(`${resBody.message}`, {
        closeButton: false,
        autoClose: true
      });
    }
    else {
      if (resBody.errors) {
        for (let err in resBody.errors) {
          toast.error(`${resBody.errors[err]}`, {
            closeButton: false,
            autoClose: true
          });
        }
      }
      else if (resBody.message) {
        toast.error(`${resBody.message}`, {
          closeButton: false,
          autoClose: true
        });
      }
    }
  }

  //function that handles the redirect and at the same time sets the state 
  //to make the final component rendering faster
  handleRedirect(path, newState, callback) {
    if (newState) {
      this.setState({
        ...{
          redirectPath: path,
        }, ...newState
      }, callback);
    }

    else {
      this.setState({
        redirectPath: path,
      }, callback);
    }
    return null;
  }

  //functions for managing the user data
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
  handleLoginRegister(url, data) {
    fetch(url, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }).then(rawData => rawData.json())
      .then(resBody => {
        this.manageDatabaseResponse(resBody,
          // if the response is succsessful
          () => {
            this.saveUserInSession(resBody);
            this.handleRedirect("/", {
              username: resBody.user.username,
              userToken: resBody.token,
              isAdmin: resBody.user.roles.indexOf("Admin") !== -1
            });
          });
      });
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
  isAuth() {
    return this.state.userToken === null ? false : true;
  }

  //functions for handling forms 
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e, data, path, func) {
    e.preventDefault();
    const url = "http://localhost:9999/auth" + path;
    func(url, data);
  }

  //function for handling the products (sell and store)
  handleSell(url, data) {
    fetch(url, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }).then(rawData => rawData.json())
      .then(resBody => {
        this.manageDatabaseResponse(resBody,
          // if the response is succsessful
          () => {
            this.handleRedirect("/");
          });
      });
  }

  render() {
    if (this.state.redirectPath) {
      return <Redirect to={this.state.redirectPath} />
    }
    return (
      <div className="App">
        <Suspense fallback={<LoadingView />}>
          <ToastContainer autoClose={2300} />
          <AppHeader global={this} />
          <AppContent global={this} />
          <AppFooter />
        </Suspense>
      </div>
    );
  }

  componentDidUpdate() {
    //just reset the redirect functionality without rerendering the component
    if (this.state.redirectPath) {
      // eslint-disable-next-line
      this.state.redirectPath = null;
    }
  }
}

export default App;
