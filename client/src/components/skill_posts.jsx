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
import MySkillsLeftNav from './my_skills_left_nav';
import AddPost from './add_post';
import Select from 'react-select';

export default class SkillPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSkillId: '',
      skillName: ''
    };
    this.getSkillData = this.getSkillData.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedSkill === prevState.selectedSkill) {
      return null;
    }
    return {
      userSkillId: nextProps.selectedSkill
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSkill !== prevProps.selectedSkill) {
      this.getSkillData();
    }
  }

  getSkillData() {
    APIUtil.getUserSkillData(this.state.userSkillId).then(response => {
      this.setState({
        skillName: response.data.skill_name
      });
      console.log(response);
    }).catch(error => {
      console.log(error.response);
    });
  }

  render() {
    return (
      <div>
        <div>
          <h3>{this.state.skillName}</h3>
        </div>
        <AddPost/>
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>
            </Panel.Heading>
            <Panel.Body>Panel content</Panel.Body>
          </Panel>
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>
            </Panel.Heading>
            <Panel.Body>Panel content</Panel.Body>
          </Panel>
      </div>
    )
  }
}
