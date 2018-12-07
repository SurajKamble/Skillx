import React, {Component} from "react";
import {FormGroup, FormControl, Navbar, NavItem, Nav, NavDropdown, MenuItem}
       from "react-bootstrap";
import {Grid, Row, Col} from "react-bootstrap";
import "./global_nav.css";
import * as APIUtil from "../util/api_util";
import {Redirect, Link} from 'react-router-dom';

export default class GlobalNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedOut: false,
      homeActive: '',
      mySkillsActive: '',
      exploreActive: ''
    }
    this.signOut = this.signOut.bind(this);
    this.setHomeActive = this.setHomeActive.bind(this);
    this.setMySkillsActive = this.setMySkillsActive.bind(this);
    this.setExploreActive = this.setExploreActive.bind(this);
  }

  componentDidMount() {
    if (this.props.location.pathname === "/") {
      this.setHomeActive();
    }
    if (this.props.location.pathname === "/my_skills") {
      this.setMySkillsActive();
    }
    if (this.props.location.pathname === "/explore") {
      this.setExploreActive();
    }
  }

  signOut() {
    APIUtil.signOut().then(response => {
      APIUtil.resetInitialState()
      this.setState({signedOut: true})
    }).catch(error => {
      APIUtil.resetInitialState()
    });
  }

  home() {
    this.setState(prevState => prevState)
  }

  setHomeActive() {
    this.setState({
      homeActive: 'active nav-item-active',
      mySkillsActive: '',
      exploreActive: ''
    })
  }

  setMySkillsActive() {
    this.setState({
      homeActive: '',
      mySkillsActive: 'active nav-item-active',
      exploreActive: ''
    })
  }

  setExploreActive() {
    this.setState({
      homeActive: '',
      mySkillsActive: '',
      exploreActive: 'active nav-item-active'
    })
  }

  render() {
    if (this.state.signedOut) {
      return <Redirect to="/register"/>
    }
    return (<Navbar fixedTop={true} collapseOnSelect={true}>
      <Navbar.Header>
        <Navbar.Brand className="navbar-margin">
          <a href="/">Skillspire</a>
        </Navbar.Brand>
        <Navbar.Form pullLeft={true} className="searchForm">
          <FormGroup className="searchBar">
            <FormControl className="searchInput" type="text" placeholder="Search"/>
          </FormGroup>
        </Navbar.Form>
        <Navbar.Toggle/>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav className="navbar-margin" pullRight={true}>
          <NavDropdown eventKey={3} className = "nav-dropdown"
            title = {<img className="dropdown-display-picture" src={localStorage.getItem("display_picture")}/>}
            id="basic-nav-dropdown" pullRight={true}>
            <MenuItem eventKey={3.1} href="/edit_profile">Edit Profile</MenuItem>
            <MenuItem divider={true}/>
            <MenuItem eventKey={3.3} onClick={this.signOut}>Sign out</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav className="navbar-margin" pullRight={true}>
          <NavItem eventKey={1} href="/" className={this.state.homeActive}>
            Home
          </NavItem>
          <NavItem eventKey={1} href="/my_skills" className={this.state.mySkillsActive}>
            Skills
          </NavItem>
          <NavItem eventKey={1} href="/explore" className={this.state.exploreActive}>
            Explore
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>);
  }
}
