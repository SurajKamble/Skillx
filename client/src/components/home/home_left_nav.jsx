import React, {Component} from "react";
import {NavItem, Nav} from "react-bootstrap";
import "./home.css";
import { GoZap } from 'react-icons/go';

export default class HomeLeftNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-left-nav-div">
        <h5 className="home-left-nav-header">Feed</h5>
      <Nav className="home-left-nav" bsStyle="pills"
        stacked={true}
        activeKey={1}>
      <NavItem eventKey={1} key={1} href="/home">
        <GoZap className="zap-icon"/> Top Posts
      </NavItem>
    </Nav>
    </div>
  );
  }
}
