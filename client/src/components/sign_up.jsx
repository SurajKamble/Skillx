import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
import "./sign_up.css";
import * as APIUtil from "../util/api_util";
import { Redirect } from 'react-router-dom';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: "",
      firstnameErr: "",
      lastnameErr: "",
      emailErr: "",
      passwordErr: "",
      password_confirmationErr: "",
      isAuthenticated: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = Object.assign({}, this.state);

    APIUtil.signUpUser(user).then(response => {
      APIUtil.setInitialState(response)
      console.log(response)
      this.setState({ isAuthenticated: true });
    }).catch(error => {
      console.log(error.response)
      const errors = error.response.data.errors;
        this.setState({
          firstnameErr: errors.firstname,
          lastnameErr: errors.lastname,
          emailErr: errors.email,
          passwordErr: errors.password,
          password_confirmationErr: errors.password_confirmation
        })
      });
  }

  handleInput(e) {
    const name = e.currentTarget.name;

    this.setState({
      [name]: e.currentTarget.value
    });
  }

  render() {
    if (localStorage.getItem("isAuthenticated") === "true" || this.state.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const errorWarning = <i className="material-icons">warning</i>;
    const fErr = this.state.firstnameErr ? errorWarning : "";
    const lErr = this.state.lastnameErr ? errorWarning : "";
    const eErr = this.state.emailErr ? errorWarning : "";
    const pErr = this.state.passwordErr ? errorWarning : "";
    const pcErr = this.state.password_confirmationErr ? errorWarning : "";

    return (
      <div className="container">
        <div className="signup-form v-center">
          <form onSubmit={this.handleSubmit}>
            <h2 className="text-center">Skillx</h2>
            <h2 className="register_header">Register</h2>
            <div className="form-group">
              <div className="row">
                <div className="col-xs-6">
                  <input
                    type="firstname"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.handleInput}
                    className="form-control"
                    id="firstname"
                    placeholder="First Name"
                  />
                  <div className="error-popup first-name-errors">{fErr}
                    <div className="error-text">{this.state.firstnameErr}</div>
                  </div>
                </div>
                <div className="col-xs-6">
                  <input
                    type="lastname"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.handleInput}
                    className="form-control"
                    id="lastname"
                    placeholder="Last Name"
                  />
                <div className="error-popup first-name-errors">{lErr}
                    <div className="error-text">{this.state.lastnameErr}</div>
                  </div>
                </div>
              </div>
            </div>
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
              <input
                type="password"
                name="password_confirmation"
                value={this.state.password_confirmation}
                onChange={this.handleInput}
                className="form-control"
                id="password_confirmation"
                placeholder="Confirm Password"
              />
              <div className="error-popup first-name-errors">{pcErr}
                <div className="error-text">{this.state.password_confirmationErr}</div>
              </div>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-success btn-lg btn-block"
              >
                Register Now
              </button>
            </div>
            <div className="text-center">Already have an account?</div>
          </form>
        </div>
      </div>
    );
  }
}
