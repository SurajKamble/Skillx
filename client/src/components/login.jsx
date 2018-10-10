import React, {Component} from "react";
import "./registration.css";
import * as APIUtil from "../util/api_util";
import { Redirect, Link } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isAuthenticated: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    APIUtil.login(user).then(response => {
      APIUtil.setInitialState(response.headers, response.data.data)
      this.setState({ isAuthenticated: true });
      this.props.setAuthenticated();
    }).catch(error => {
      const errors = error.response.data.errors;
      });
  }

  handleInput(e) {
    const name = e.currentTarget.name;
    this.setState({[name]: e.currentTarget.value});
  }

  render() {
    const errorWarning = <i className="material-icons">warning</i>;
    const fErr = this.state.firstnameErr ? errorWarning : "";
    const lErr = this.state.lastnameErr ? errorWarning : "";
    const eErr = this.state.emailErr ? errorWarning : "";
    const pErr = this.state.passwordErr ? errorWarning : "";
    const pcErr = this.state.password_confirmationErr ? errorWarning : "";
    return (<div className="">
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInput}
            className="form-control"
            id="email"
            placeholder="Email"
          />
        <div className="error-popup first-name-errors">{eErr}
            <div className="error-text">{this.state.emailErr}</div>
          </div>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInput}
            className="form-control"
            id="password"
            placeholder="Password"
          />
        <div className="error-popup first-name-errors">{pErr}
            <div className="error-text">{this.state.passwordErr}</div>
          </div>
          </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success btn-lg btn-block" onClick={this.props.handleSubmit}>
            Login
          </button>
        </div>
        <div className="text-center">Don't have an account? <a href="#" onClick={this.props.togglePage}>Sign Up</a></div>
        </form>
      </div>
    );
  }
}
