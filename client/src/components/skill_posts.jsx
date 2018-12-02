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
import PostsContainer from './posts_container';

export default class SkillPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSkillId: '',
      show: false,
      skillName: '',
      allUserSkillPosts: ''
    };
    this.getSkillData = this.getSkillData.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getAllUserSkillPosts = this.getAllUserSkillPosts.bind(this);
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
    if (this.props.selectedSkill !== prevProps.selectedSkill) {
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
      console.log("In Posts: ");
      console.log(response);
    }).catch(error => {
      console.log(error.response);
    });
  }

  render() {
    return (<div>
      <div>
        <h3 className="skill-header">{this.state.skillName}</h3>
      </div>
      <div className="container-fluid myskills-btn-grp">
        <Row>
          <Col xs={5} sm={5} md={5} lg={5}>
            <button className="btn add-post-btn" onClick={this.handleShow}>New Post or Project</button>
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
      <AddPostModal show={this.state.show} handleClose={this.handleClose} updateUserSkillPosts={this.getAllUserSkillPosts}/>
      <PostsContainer allUserSkillPosts={this.state.allUserSkillPosts}/>
    </div>)
  }
}
