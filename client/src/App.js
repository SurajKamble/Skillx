import React, { Component } from 'react';
import './App.css';
import Home from './components/home/home';
import GlobalNav from './components/global_nav/global_nav';
import Profile from './components/profile/profile';
import MySkills from './components/my_skills/my_skills';
import Explore from './components/explore/explore';
import RegistrationPage from './components/registration/registration_page';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

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
            <PrivateRoute path="/my_skills" component={ MySkills } />
            <PrivateRoute path="/explore" component={ Explore } />
            <Route path="/register" component={ RegistrationPage } />
            <PrivateRoute path="/profile/:id/:name" component={ Profile } />
          </div>
        </Router>
    );
  }
}

export default App;
