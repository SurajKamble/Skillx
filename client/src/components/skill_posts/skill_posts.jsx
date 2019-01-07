import React, {Component} from "react";
import {FormGroup, FormControl, Row, Col} from "react-bootstrap";
import "./skill_posts.css";
import * as APIUtil from "../../util/api_util";
import {Redirect} from 'react-router-dom';
import AddPost from '../add_post/add_post';
import Select from 'react-select';
import AddPostModal from '../add_post/add_post_modal';
import PostsContainer from '../posts/posts_container';
import SkillsDropdown from '../skills_dropdown';

export default class SkillPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSkillId: '',
      show: false,
      skillName: '',
      allUserSkillPosts: '',
      isProfile: this.props.isProfile
    };
    this.getSkillData = this.getSkillData.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getAllUserSkillPosts = this.getAllUserSkillPosts.bind(this);
    this.changeUserSkillId = this.changeUserSkillId.bind(this);
  }

  handleShow() {
    this.setState({show: true});
  }

  handleClose() {
    this.setState({show: false});
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedSkill === prevState.selectedSkill) {
      return null;
    }
    return {userSkillId: nextProps.selectedSkill};
  }

  componentDidUpdate(prevProps) {
    if ((this.props.selectedSkill !== prevProps.selectedSkill) || this.state.skillName === '') {
      this.getSkillData();
      this.getAllUserSkillPosts();
    }
  }

  getSkillData() {
    APIUtil.getUserSkillData(this.state.userSkillId).then(response => {
      this.setState({skillName: response.data.skill_name});
    }).catch(error => {
      console.log(error.response);
    });
  }

  getAllUserSkillPosts() {
    APIUtil.getAllUserSkillPosts(this.state.userSkillId).then(response => {
      this.setState({allUserSkillPosts: response.data});
    }).catch(error => {
      console.log(error.response);
    });
  }

  changeUserSkillId(userSkillId) {
    this.setState({userSkillId: userSkillId});
  }

  render() {
    var buttonToRender = <button className="btn add-post-btn" onClick={this.handleShow}>New Post or Project</button>;
    var skillHeader = <div>
      <h3 className="skill-header">{this.state.skillName}</h3>
    </div>;
    var addPostModal = <AddPostModal show={this.state.show} handleClose={this.handleClose}
      updateUserSkillPosts={this.getAllUserSkillPosts}/>;
    if (this.state.isProfile) {
      buttonToRender = <SkillsDropdown allUserSkills={this.props.allUserSkills} changeSelectedSkill={this.props.changeSelectedSkill}/>;
      skillHeader = '';
      addPostModal = '';
    }
    return (<div>
      {skillHeader}
      <div className="container-fluid myskills-btn-grp">
        <Row>
          <Col xs={5} sm={5} md={5} lg={5}>
            {buttonToRender}
          </Col>
          <Col xs={7} xsOffset={0} sm={7} smOffset={0} md={7} lg={7}>
            <form>
              <FormGroup>
                <FormControl type="text" className="find-projects" placeholder="Find Projects, Posts"/>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </div>
      {addPostModal}
      <PostsContainer allUserSkillPosts={this.state.allUserSkillPosts}/>
    </div>)
  }
}
