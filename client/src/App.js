import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './components/sign_up';
import Home from './components/home';
import Login from './components/login';
import GlobalNav from './components/global_nav';
import Profile from './components/profile';
import MySkills from './components/my_skills';
import Explore from './components/explore';
import RegistrationPage from './components/registration_page';
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
              <DefaultLayout component={Component} {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/register"
              }}
            />
          )
        }
      />
    );

    const DefaultLayout = ({component: Component, ...rest}) => {
      return (
        <Route {...rest} render={matchProps => (
          <div className="main-container">
            {console.log(matchProps)}
            <GlobalNav {...matchProps} />
            <div className="container home-container">
              <Component {...matchProps} />
            </div>
          </div>
        )} />
      )
    };

    return (
        <Router>
          <div id="main-top-div">
            <PrivateRoute exact path="/" component={ Home } />
            <PrivateRoute path="/profile" component={ Profile } />
            <PrivateRoute path="/my_skills" component={ MySkills } />
            <PrivateRoute path="/explore" component={ Explore } />
            <Route path="/register" component={ RegistrationPage } />
            <Route path="/profile/:id" component={Profile} />
          </div>
        </Router>
    );
  }
}

export default App;
