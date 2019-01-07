import React, {Component} from "react";
import {NavItem, Nav} from "react-bootstrap";
import "./profile.css";

export default class ProfileLeftNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile-left-nav-div">
        <h5 className="profile-left-nav-header">Profile</h5>
      <Nav className="profile-left-nav" bsStyle="pills"
        stacked={true}>
      <NavItem eventKey={1} key={1} className="profile-left-nav-item" href="/home">
        Top Posts
      </NavItem>
      <NavItem eventKey={2} key={2} href="/home">
        Followers
        <p className="profile-left-nav-count-num">723</p>
      </NavItem>
      <NavItem eventKey={3} key={3} href="/home">
        Following
        <p className="profile-left-nav-count-num">723</p>
      </NavItem>
    </Nav>
    </div>
  );
  }
}
