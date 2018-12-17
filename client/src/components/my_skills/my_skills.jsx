import React, {Component} from "react";
import {
  Row,
  Col,
  Nav,
  NavItem,
  FormGroup,
  FormControl
} from "react-bootstrap";
import "../base/base.css";
import "./my_skills.css";
import * as APIUtil from "../../util/api_util";
import AddPostModal from '../add_post/add_post_modal';
import PostsContainer from '../posts/posts_container';
import Post from '../posts/post';
import Media from "react-media";

/**
    Has a left nav bar with User's skill names.
    User's skill posts are updated upon selection from the left nav bar.
*/
export default class MySkills extends Component {
  constructor(props) {
    super(props);
    /* Takes no Props */
    this.state = {
      selectedSkillId: '',
      showAddPostModal: false,
      selectedSkillName: '',
      allUserSkillPosts: [],
      allUserSkills: [],
      hasMoreItems: true
    }
    this.handleLeftNavSelect = this.handleLeftNavSelect.bind(this);
    this.handleAddPostModalShow = this.handleAddPostModalShow.bind(this);
    this.handleAddPostModalClose = this.handleAddPostModalClose.bind(this);
    this.getAllUserSkillPosts = this.getAllUserSkillPosts.bind(this);
    this.getCurrentUserSkills = this.getCurrentUserSkills.bind(this);
  }

  componentDidMount() {
    this.getCurrentUserSkills();
  }

  handleLeftNavSelect(selectedSkillId) {
    this.setState({selectedSkillId: selectedSkillId});
  }

  handleAddPostModalShow() {
    this.setState({showAddPostModal: true});
  }

  handleAddPostModalClose() {
    this.setState({showAddPostModal: false});
  }

  getAllUserSkillPosts(page) {
    if (this.state.selectedSkillId === '') return;
    APIUtil.getAllUserSkillPosts(this.state.selectedSkillId, page).then(response => {
      var hasMoreItems = !(response.data.length === 0);
      var allUserSkillPosts = this.state.allUserSkillPosts;
      Array.prototype.push.apply(allUserSkillPosts, response.data);
      this.setState({
        allUserSkillPosts: allUserSkillPosts,
        hasMoreItems: hasMoreItems
      });
    }).catch(error => {
      console.log(error.response);
    });
  }

  getCurrentUserSkills() {
    APIUtil.getCurrentUserSkills().then(response => {
    this.setState({
      allUserSkills: response.data,
      selectedSkillId: response.data[0].id
    });
    }).catch(error => {
      console.log(error.response);
    });
  }

  render() {
    var leftNavSkills = this.state.allUserSkills.map(user_skill => {
      return (
      <NavItem eventKey={user_skill.id} key={user_skill.id}>
        {user_skill.skill_name}
      </NavItem>)});
    var posts = [];
    this.state.allUserSkillPosts.map(
      post => {
        posts.push(
        <div key={post.id}>
          <Post post={post} id={post.id}/>
        </div>)
    });

    return (<Row>
      <Col xsHidden={true} sm={2} md={2} lg={2}>
        <div className="my-skills-left-nav-div">
          <div className="my-skills-left-nav-header">
            <h5>My Skills</h5>
          </div>
          <Nav className="my-skills-left-nav" bsStyle="pills" stacked
             activeKey={this.state.selectedSkillId} onSelect={this.handleLeftNavSelect}>
            {leftNavSkills}
          </Nav>
        </div>
      </Col>
      <Col xs={12} sm={8} md={8} lg={8} className="center-col">
        <Media query="(max-width: 768px)">
          {
            matches => matches
              ? (<Nav className="my-skills-left-nav" bsStyle="tabs" activeKey={this.state.selectedSkillId}
              onSelect={this.handleLeftNavSelect}>
                {leftNavSkills}
              </Nav>)
              : (<h3 className="skill-header">{this.state.selectedSkillName}</h3>)
          }
        </Media>
        <div className="container-fluid myskills-btn-grp">
          <Row>
            <Col xs={5} sm={5} md={5} lg={5}>
              <button className="btn add-post-btn" onClick={this.handleAddPostModalShow}>New Post or Project</button>
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
        <AddPostModal show={this.state.showAddPostModal}
          handleClose={this.handleAddPostModalClose}
          updateUserSkillPosts={this.updateUserSkillPosts}/>
        <PostsContainer loadHomePosts={this.getAllUserSkillPosts}
          hasMoreItems={this.state.hasMoreItems} posts={posts}/>
      </Col>
      <Col xsHidden={true} sm={2} md={2} lg={2}></Col>
    </Row>);
  }
}
