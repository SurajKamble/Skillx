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
import SkillPosts from './skill_posts';
import Select from 'react-select';

export default class MySkills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allUserSkills: [],
      selectedSkill: ''
    }
    this.navSkills = this.navSkills.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    APIUtil.getCurrentUserSkills().then(response => {
      this.setState({
        allUserSkills: response.data.map(user_skill => ({
          user_skill_id: user_skill.id,
          skill_id: user_skill.skill_id,
          skill_name: user_skill.skill_name}))
      });
      this.setState({
        selectedSkill: this.state.allUserSkills[0].user_skill_id
      });
      console.log(this.state.selectedSkill);
    }).catch(error => {
      console.log(error.response);
    });
  }

  handleSelect(selectedKey) {
    this.setState({
      selectedSkill: selectedKey
    });
  }

  navSkills() {
    return this.state.allUserSkills.map(user_skill => {
      return (
      <NavItem eventKey={user_skill.user_skill_id} key={user_skill.user_skill_id}>
        {user_skill.skill_name}
      </NavItem>)
    });
  }

  render() {
    return (
      <Row className="show-grid">
        <Col xsHidden sm={3} md={3} lg={3}>
          <div>
            <div className="my-skills-left-nav-header">
              <h4>My Skills</h4>
            </div>
            <Nav bsStyle="pills" stacked={true}
              activeKey={this.state.selectedSkill}
              onSelect={this.handleSelect}>
              {this.navSkills()}
            </Nav>
          </div>
        </Col>
        <Col xs={12} sm={7} md={7} lg={7}>
          <SkillPosts selectedSkill={this.state.selectedSkill}/>
        </Col>
        <Col xsHidden sm={2} md={2} lg={2}>
        </Col>
      </Row>
    );
  }
}
