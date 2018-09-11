import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './components/sign_up';
import Home from './components/home';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          localStorage.getItem("isAuthenticated") === "true" ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/sign_up"
              }}
            />
          )
        }
      />
    );

    return (
        <Router>
          <div>
            <PrivateRoute path="/" component={ Home } />
            <Route path="/sign_up" component={ SignUp } />
          </div>
        </Router>
    );
  }
}

export default App;
