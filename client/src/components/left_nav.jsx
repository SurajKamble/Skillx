import React, {Component} from "react";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Grid,
  Row,
  Col,
  Modal,
  Panel,
  NavItem,
  Nav
} from "react-bootstrap";
import "./sign_up.css";
import * as APIUtil from "../util/api_util";
import {Redirect} from 'react-router-dom';
import GlobalNav from './global_nav';
import Select from 'react-select';

export default class LeftNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Nav bsStyle="pills" stacked={true}>
      <NavItem eventKey={1} href="/home">
        My Skills
      </NavItem>
      <NavItem eventKey={2}>
        Link
      </NavItem>
      <NavItem eventKey={3}>
        Link
      </NavItem>
    </Nav>
  );
  }
}
