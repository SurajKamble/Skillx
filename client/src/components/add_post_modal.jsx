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

export default class AddPostModal extends Component {
  constructor(props) {
    super(props);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.getUserSkills = this.getUserSkills.bind(this);
    this.selectSkill = this.selectSkill.bind(this);
    this.addPost = this.addPost.bind(this);
    this.updateContent = this.updateContent.bind(this);

    this.state = {
      show: false,
      allUserSkills: [],
      selectedUserSkill: '',
      postContent: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.show === prevState.show) {
      return null;
    }
    return {
      show: nextProps.show
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show && this.props.show === true) {
      this.getUserSkills();
    }
  }

  handleModalClose() {
    this.setState({ show: false });
    this.props.handleClose();
  }

  getUserSkills() {
    APIUtil.getCurrentUserSkills().then(response => {
      this.setState({
        allUserSkills: response.data.map(user_skill => ({
          value: user_skill.id,
          label: user_skill.skill_name}))
      })
    }).catch(error => {
      console.log(error)
    });
  }

  selectSkill(selectedSkill) {
    this.setState({
      selectedUserSkill: selectedSkill
    })
  }

  addPost() {
    APIUtil.addUserSkillPost(this.state.selectedUserSkill.value, this.state.postContent).then(response => {
      this.handleModalClose();
      this.props.updateUserSkillPosts();
    }).catch(error => {
      console.log(error.response)
    });
  }

  updateContent(event) {
    this.setState({
      postContent: event.target.value
    })
  }

  render() {
    return (
      <Modal className="add-post-modal-container" show={this.state.show}
        onHide={this.handleModalClose} container={this}
        aria-labelledby="contained-modal-title">
        <Modal.Header className="add-post-modal-header" closeButton={true}>
          <Modal.Title className="modal-title">
            Add resources you found helpful improving your skills
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <textarea autoFocus={true} className="add-post-textarea" type="text" rows="1" title=""
              placeholder="Post links" onChange={this.updateContent}></textarea>
        </Modal.Body>
        <Modal.Footer className="add-post-modal-footer">
          <button className="btn black-border-btn start-project">Starting a new project?</button>
          <DropdownButton title="Project" id="Project" className="common-dropdown">
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3">
              Active Item
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
          </DropdownButton>
          <Select
            isSearchable={false}
            className="select-skill"
            classNamePrefix="select-skill"
            placeholder="Select Skill"
            value={this.state.selectedUserSkill}
            onChange={this.selectSkill}
            options={this.state.allUserSkills}
          />
        <button className="btn blue-button" onClick={this.addPost}>Add Post</button>
        </Modal.Footer>
      </Modal>
    );
  }

}
