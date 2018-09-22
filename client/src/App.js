import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './components/sign_up';
import Home from './components/home';
import Login from './components/login';
import GlobalNav from './components/global_nav';
import EditProfile from './components/edit_profile';
import MySkills from './components/my_skills';
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
                pathname: "/login"
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
            <GlobalNav/>
            <div className="container home-container">
              <Component {...matchProps} />
            </div>
          </div>
        )} />
      )
    };

    return (
        <Router>
          <div>
            <PrivateRoute exact path="/" component={ Home } />
            <PrivateRoute path="/edit_profile" component={ EditProfile } />
            <PrivateRoute path="/my_skills" component={ MySkills } />
            <Route path="/login" component={ Login } />
            <Route path="/sign_up" component={ SignUp } />
          </div>
        </Router>
    );
  }
}

export default App;
