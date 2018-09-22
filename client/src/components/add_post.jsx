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
    this.getUserSkills();
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
      <div>
        <Modal className="add-post-modal-container" show={this.state.show} onHide={this.handleClose} container={this} aria-labelledby="contained-modal-title">
          <Modal.Header className="add-post-modal-header" closeButton={true}>
            <Modal.Title className="modal-title">
              Add resources you found helpful improving your skills
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <textarea autoFocus={true} className="add-post-textarea" type="text" rows="1" title=""
                placeholder="Post links"></textarea>
          </Modal.Body>
          <Modal.Footer className="add-post-modal-footer">
            <Button className="black-button start-project">Starting a new project?</Button>
            <DropdownButton title="Project" id="Project" className="common-dropdown">
              <MenuItem eventKey="1">Action</MenuItem>
              <MenuItem eventKey="2">Another action</MenuItem>
              <MenuItem eventKey="3">
                Active Item
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">Separated link</MenuItem>
            </DropdownButton>
            <DropdownButton title="Skill" id="Skill" className="common-dropdown">
              <MenuItem eventKey="1">Action</MenuItem>
              <MenuItem eventKey="2">Another action</MenuItem>
              <MenuItem eventKey="3">
                Active Item
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">Separated link</MenuItem>
            </DropdownButton>
            <Button bsStyle="primary">Add Post</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
    );
  }
}
