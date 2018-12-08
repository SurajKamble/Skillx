import React, {Component} from "react";
import {Panel} from "react-bootstrap";
import "./add_post.css";
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
    this.setState({show: true});
  }

  handleClose() {
    this.setState({show: false});
  }

  getUserSkills() {
    APIUtil.getCurrentUserSkills().then(response => {
      this.setState({
        userSkills: response.data.map(skill => ({value: skill.id, label: skill.name}))
      })
    }).catch(error => {
      console.log(error.response)
    });
  }

  render() {
    return (<div className="add-post-btn-div">
      <a role="button" className="add-post-link" href="#" onClick={this.handleShow}>
        <Panel>
          <Panel.Body className="add-post-panel">
            <p>How did you up your skills today?</p>
          </Panel.Body>
        </Panel>
      </a>
      <AddPostModal show={this.state.show} handleClose={this.handleClose}/>
    </div>);
  }
}
