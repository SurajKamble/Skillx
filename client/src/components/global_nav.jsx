import React, {Component} from "react";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Navbar,
  NavItem,
  Nav,
  NavDropdown,
  MenuItem,
  Glyphicon,
  InputGroup
} from "react-bootstrap";
import {Grid, Row, Col} from "react-bootstrap";
import "./sign_up.css";
import * as APIUtil from "../util/api_util";
import {Redirect, Link} from 'react-router-dom';

export default class GlobalNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedOut: false
    }
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    APIUtil.signOut().then(response => {
      APIUtil.resetInitialState()
      this.setState({signedOut: true})
    }).catch(error => {
    });
  }

  home() {
    this.setState(prevState => prevState)
  }

  render() {
    if (this.state.signedOut) {
      return <Redirect to="/login"/>
    }
    return (<Navbar collapseOnSelect={true}>
      <Navbar.Header>
        <Navbar.Brand className="navbar-margin">
          <a href="/">Skillx</a>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Form pullLeft={true} className="searchForm">
          <FormGroup className="searchBar">
            <FormControl className="searchInput" type="text" placeholder="Search"/>
          </FormGroup>
        </Navbar.Form>
        <Nav className="navbar-margin" pullRight={true}>
          <NavDropdown eventKey={3} title={localStorage.getItem("firstname")} id="basic-nav-dropdown" pullRight={true}>
            <MenuItem eventKey={3.1} href="/edit_profile">Edit Profile</MenuItem>
            <MenuItem divider={true}/>
            <MenuItem eventKey={3.3} onClick={this.signOut}>Sign out</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav className="navbar-margin" pullRight={true}>
          <NavItem eventKey={1} href="/">
            Home
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>);
  }
}
