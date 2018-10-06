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
    return {show: nextProps.show};
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show && this.props.show === true) {
      this.getUserSkills();
    }
  }

  handleModalClose() {
    this.setState({show: false});
    this.props.handleClose();
  }

  getUserSkills() {
    APIUtil.getCurrentUserSkills().then(response => {
      this.setState({
        allUserSkills: response.data.map(user_skill => ({value: user_skill.id, label: user_skill.skill_name}))
      })
    }).catch(error => {
      console.log(error)
    });
  }

  selectSkill(selectedSkill) {
    this.setState({selectedUserSkill: selectedSkill})
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
    this.setState({postContent: event.target.value})
  }

  render() {
    return (<Modal className="add-post-modal-container" show={this.state.show} onHide={this.handleModalClose} container={this} aria-labelledby="contained-modal-title">
      <Modal.Header className="add-post-modal-header" closeButton={true}>
        <Nav bsStyle="tabs" activeKey={1}>
          <NavItem eventKey={1}>
            Add Post
          </NavItem>
          <NavItem eventKey={2}>
            Start a Project
          </NavItem>
        </Nav>
      </Modal.Header>
      <Modal.Body>
        <textarea autoFocus={true} className="add-post-textarea" type="text" rows="1" title=""
          placeholder="Add resources you found helpful improving your skills"
          onChange={this.updateContent}></textarea>
          <input
            type="addLink"
            name="addLink"
            value={this.state.link}
            onChange={this.handleInput}
            className="form-control add-link-input"
            placeholder="Add Link"
          />
      </Modal.Body>
      <Modal.Footer className="add-post-modal-footer">
        <Select isSearchable={true} className="select-skill" classNamePrefix="select-skill" placeholder="Project" value={this.state.selectedUserSkill} onChange={this.selectSkill} options={this.state.allUserSkills}/>
        <Select isSearchable={false} className="select-skill" classNamePrefix="select-skill" placeholder="Skill" value={this.state.selectedUserSkill} onChange={this.selectSkill} options={this.state.allUserSkills}/>
        <button className="btn blue-button" onClick={this.addPost}>Post</button>
      </Modal.Footer>
    </Modal>);
  }

}
