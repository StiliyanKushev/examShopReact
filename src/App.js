import React, { Suspense, Component } from 'react';
import "./App.css";

import AppHeader from "./components/Header/Header";
import AppFooter from './components/Footer/Footer';
import AppContent from "./components/Content/Content";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      userId: null,
      userToken: null
    }
  }

  render() {
    return (
      <div className="App">
        <Suspense fallback={<span>Loading...</span>}>
          <AppHeader />
          <AppContent />
          <AppFooter />
        </Suspense>
      </div>
    );
  }
}

export default App;
