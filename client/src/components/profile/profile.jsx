import React, { Component } from "react";
import * as APIUtil from "../../util/api_util";
import ProfileLeftNav from './profile_left_nav';
import {Row, Col, NavItem, Nav, Button} from "react-bootstrap";
import SkillPosts from '../skill_posts/skill_posts';
import "../base/base.css";
import "./profile.css";
import SkillsDropdown from '../skills_dropdown';
import PostsContainer from '../posts/posts_container';
import Post from '../posts/post';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.match.params.id,
      isCurrentUser: APIUtil.isCurrentUser(this.props.match.params.id),
      display_picture: '',
      userFirstName: '',
      userName: '',
      allUserSkills: [],
      selectedSkillId: '',
      allUserSkillPosts: [],
      hasMoreItems: true
    }

    this.getAllUserSkillPosts = this.getAllUserSkillPosts.bind(this);
    this.handleLeftNavSelect = this.handleLeftNavSelect.bind(this);
    this.handleFollowClick = this.handleFollowClick.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    APIUtil.getUserData(this.state.userId).then(response => {
      var userData = response.data;
      var currentUserSkills = response.data.user_skills;
      var selectedSkillId = currentUserSkills[0].id;
      this.setState({
        allUserSkills: currentUserSkills,
        selectedSkillId: selectedSkillId,
        userName: userData.firstname + " " + userData.lastname,
        userFirstName: userData.firstname,
        display_picture: userData.display_picture
      });
    }).catch(error => {
      console.log(error.response);
    });
  }

  handleFollowClick() {
    APIUtil.followUser(this.state.userId).then(response => {
      console.log("Success");
    }).catch(error => {
      console.log(error.response);
    });
  }

  handleLeftNavSelect(selectedSkillId) {
    /*
      When a new UserSkill is selected, we need an empty allUserSkillPosts
      and hasMoreItems needs to be true
    */
    this.setState({
      selectedSkillId: selectedSkillId,
      allUserSkillPosts: [],
      hasMoreItems: true
    });
  }

  getAllUserSkillPosts(page) {
    /* If selectedSkillId is null, do not map an API call */
    if (this.state.selectedSkillId === '')
      return;
    APIUtil.getAllUserSkillPosts(this.state.selectedSkillId, page).then(response => {
      var hasMoreItems = !(response.data.length === 0);
      var allUserSkillPosts = this.state.allUserSkillPosts;
      /* Add the new posts returned by the API to the existing allUserSkillPosts */
      Array.prototype.push.apply(allUserSkillPosts, response.data);
      this.setState({
        allUserSkillPosts: allUserSkillPosts,
        hasMoreItems: hasMoreItems
      });
    }).catch(error => {
      console.log(error.response);
    });
  }

  render() {
    var leftNavSkills = this.state.allUserSkills.map(user_skill => {
      return (<NavItem eventKey={user_skill.id} key={user_skill.id}>
        {user_skill.skill_name}
      </NavItem>)
    });
    var posts = this.state.allUserSkillPosts.map(post => {
      return (<div key={post.id}>
        <Post post={post} id={post.id}/>
      </div>)
    });
    var postsContainer = <div key={this.state.selectedSkillId}>
      <PostsContainer loadHomePosts={this.getAllUserSkillPosts}
        hasMoreItems={this.state.hasMoreItems} posts={posts}/></div>;
    return (
      <Row className="show-grid">
        <Col xsHidden sm={2} md={2} lg={2}>
          <ProfileLeftNav/>
            <div className="top-margin my-skills-left-nav-div">
              <div className="my-skills-left-nav-header">
                <h5>{this.state.userFirstName + "'s"} Skills</h5>
              </div>
              <Nav className="my-skills-left-nav" bsStyle="pills" stacked
                 activeKey={this.state.selectedSkillId} onSelect={this.handleLeftNavSelect}>
                {leftNavSkills}
              </Nav>
            </div>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} className="center-col">
          <div className="profile-details">
            <img className="profile-display-picture" src={this.state.display_picture}></img>
            <h3 className="profile-username">
              {this.state.userName}
            </h3>
            <Button bsStyle="primary" onClick={this.handleFollowClick} className="follow-button">Follow</Button>
          </div>
          {postsContainer}
        </Col>
        <Col xsHidden sm={2} md={2} lg={2}>
        </Col>
      </Row>
    );
  }
}
