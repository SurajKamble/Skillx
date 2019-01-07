import React, {Component} from "react";
import {Row, Col} from "react-bootstrap";
import "./registration.css";
import * as APIUtil from "../../util/api_util";
import {Redirect,} from 'react-router-dom';
import SignUp from '../sign_up/sign_up';
import Login from '../login/login';
import GoogleLogin from 'react-google-login';

export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: true,
      isAuthenticated: false
    }
    this.togglePage = this.togglePage.bind(this);
    this.setAuthenticated = this.setAuthenticated.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  setAuthenticated() {
    this.setState({isAuthenticated: true});
  }

  togglePage() {
    if (this.state.loginPage) {
      this.setState({loginPage: false});
    } else {
      this.setState({loginPage: true});
    }
  }

  responseGoogle(e) {
    APIUtil.googleOauth2(e).then(response => {
      APIUtil.setInitialState(response.headers, response.data);
      this.setAuthenticated();
    }).catch(error => {
      console.log(error.response);
    });
  }

  render() {
    if (localStorage.getItem("isAuthenticated") === "true" || this.state.isAuthenticated) {
      return <Redirect to="/"/>;
    }
    let pageToRender;
    let pageHeader;
    if (this.state.loginPage) {
      pageToRender = <Login togglePage={this.togglePage} setAuthenticated={this.setAuthenticated}/>;
      pageHeader = "Login";
    } else {
      pageToRender = <SignUp togglePage={this.togglePage} setAuthenticated={this.setAuthenticated}/>
      pageHeader = "Sign Up";
    }
    return (<div className="container-fluid register-container">
      <Row className="registration-row">
        <h2 className="title-header">Skillspire</h2>
        <Col xsHidden={true} smHidden={true} md={7} lg={7} className="description-text">
          <ul>
            <li>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </li>
            <li>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </li>
            <li>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </li>
            <li>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </li>
          </ul>
        </Col>
        <Col xs={12} sm={12} md={5} lg={5} className="registration-form">
          <h2 className="sign-up-header">{pageHeader}</h2>
          <div className="text-center social-btn">
            <GoogleLogin className="btn btn-block"
              clientId="126300833912-j5ka215q1of9ulptphkm2rb64ojannuk.apps.googleusercontent.com"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}>
              Continue with
              <b> Google</b>
            </GoogleLogin>
            <a href="#" className="btn btn-primary btn-block">
              <i className="fa fa-facebook"></i>
              Continue with
              <b> Facebook</b>
            </a>
          </div>
          <p className="register_header">or with Email</p>
          {pageToRender}
        </Col>
      </Row>
    </div>);
  }
}
