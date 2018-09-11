import React, {Component} from "react";
import "./login.css";
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
      APIUtil.setInitialState(response)
      this.setState({ isAuthenticated: true });
    }).catch(error => {
      const errors = error.response.data.errors;
      });
  }

  handleInput(e) {
    const name = e.currentTarget.name;
    this.setState({[name]: e.currentTarget.value});
  }

  render() {
    if (localStorage.getItem("isAuthenticated") === "true" || this.state.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (<div className="login-form v-center">
      <form onSubmit={this.handleSubmit}>
        <h2 className="text-center">Skillx</h2>
        <div className="form-group">
            <input type="email" name="email" value={this.state.email} onChange={this.handleInput} className="form-control" id="email" placeholder="Email"/>
        </div>
        <div className="form-group">
            <input type="password" name="password" value={this.state.password} onChange={this.handleInput} className="form-control" id="password" placeholder="Password"/>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success btn-lg btn-block">
            Login
          </button>
        </div>
        <div className="text-center social-btn">
          <a href="#" className="btn btn-danger btn-block">
            <i className="fa fa-google"></i>
            Continue with
            <b> Google</b>
          </a>
          <a href="#" className="btn btn-primary btn-block">
            <i className="fa fa-facebook"></i>
            Continue with
            <b> Facebook</b>
          </a>
        </div>
        <div className="hint-text small">Or <Link to="/sign_up">continue with email</Link></div>
        </form>
      </div>
    );
  }
}
