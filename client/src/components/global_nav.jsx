import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Navbar, NavItem, Nav, NavDropdown, MenuItem, Glyphicon, InputGroup } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
import "./sign_up.css";
import * as APIUtil from "../util/api_util";
import { Redirect, Link } from 'react-router-dom';

export default class GlobalNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand className="navbar-margin">
        <a href="/">Skillx</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form pullLeft className="searchBar">
      <FormGroup className="searchForm">
        <FormControl className="searchForm" type="text" placeholder="Search" />
      </FormGroup>
    </Navbar.Form>
    <Nav className="navbar-margin" pullRight>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown" pullRight>
        <MenuItem eventKey={3.1}>Edit Profile</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Sign out</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav className="navbar-margin" pullRight>
      <NavItem eventKey={1} href="#">
        Suraj
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>

    );
  }
}
