import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './components/sign_up';
import Home from './components/home';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/sign_up" component={ SignUp } />
        </Switch>
      </Router>
    );
  }
}

export default App;
