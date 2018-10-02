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
  ButtonGroup
} from "react-bootstrap";
import "./sign_up.css";
import * as APIUtil from "../util/api_util";
import {Redirect} from 'react-router-dom';
import GlobalNav from './global_nav';
import MySkillsLeftNav from './my_skills_left_nav';
import AddPost from './add_post';
import Select from 'react-select';
import AddPostModal from './add_post_modal';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post
    };
  }

  render() {
    
  }
}
