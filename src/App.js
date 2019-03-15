//import all React things and external components
import React, { Suspense, Component } from 'react';
import { withGlobalState } from 'react-globally'
import Redirect from 'react-router-dom/Redirect';
import { ToastContainer } from 'react-toastify';
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
    }

    //bind the redirect function
    this.redirect = this.redirect.bind(this);
  }

  //function that handles the redirect and at the same time sets the state 
  //to make the final component rendering faster
  redirect(path, newState, callback) {
    if (newState) {
      this.setState({
        redirectPath: path,
      }, callback);
      this.props.setGlobalState({...newState});
    }

    else {
      this.setState({
        redirectPath: path,
      }, callback);
    }
    return null;
  }

  render() {
    if (this.state.redirectPath) {
      return <Redirect to={this.state.redirectPath} />
    }
    return (
      <div className="App">
        <Suspense fallback={<LoadingView />}>
          <ToastContainer autoClose={2300} />
          <AppHeader redirect={this.redirect} />
          <AppContent redirect={this.redirect} />
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

export default withGlobalState(App);
