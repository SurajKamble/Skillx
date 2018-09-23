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
  Nav,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import "./sign_up.css";
import * as APIUtil from "../util/api_util";
import {Redirect, Link} from 'react-router-dom';
import GlobalNav from './global_nav';
import AddPostModal from './add_post_modal';
import Select from 'react-select';

export default class AddPost extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getUserSkills = this.getUserSkills.bind(this);

    this.state = {
      show: false,
      userSkills: []
    };
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  getUserSkills() {
    APIUtil.getCurrentUserSkills().then(response => {
      this.setState({
        userSkills: response.data.map(skill => ({value: skill.id, label: skill.name}))
      })
    }).catch(error => {
      console.log(error)
    });
  }

  render() {
    return (
      <div>
      <Panel >
        <Panel.Body className="add-post-panel">
          <a role="button" className="add-post-link" href="#" onClick={this.handleShow}>How did you up your skills today?</a>
        </Panel.Body>
      </Panel>
      <AddPostModal show={this.state.show} handleClose={this.handleClose}/>
    </div>
    );
  }
}
