import React, { Component } from "react";
import * as APIUtil from "../../util/api_util";
import ProfileLeftNav from './profile_left_nav';
import {Row, Col} from "react-bootstrap";
import SkillPosts from '../skill_posts/skill_posts';
import "../base/base.css";
import "./profile.css";
import SkillsDropdown from '../skills_dropdown';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.match.params.id,
      isCurrentUser: APIUtil.isCurrentUser(this.props.match.params.id),
      display_picture: '',
      userName: '',
    }
  }

  componentDidMount() {
    if (this.state.isCurrentUser) {
      this.setState({
        display_picture: localStorage.getItem("display_picture"),
        userName: localStorage.getItem("firstname") + " " + localStorage.getItem("lastname")
      });
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
      }).catch(error => {
        console.log(error.response);
      });
    }
  }

  changeSelectedSkill(selectedSkill) {
    this.setState({
      selectedSkill: selectedSkill
    });
  }

  render() {
    var buttonToRender = <SkillsDropdown allUserSkills={this.props.allUserSkills}/>;
    return (
      <Row className="show-grid">
        <Col xsHidden sm={2} md={2} lg={2}>
          <ProfileLeftNav/>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} className="center-col">
          <div className="profile-details">
            <img className="profile-display-picture" src={this.state.display_picture}></img>
            <h3 className="profile-username">
              {this.state.userName}
            </h3>
          </div>
          <SkillPosts selectedSkill={this.state.selectedSkill} buttonToRender={buttonToRender} isProfile={true}/>
        </Col>
        <Col xsHidden sm={2} md={2} lg={2}>
        </Col>
      </Row>
    );
  }
}
