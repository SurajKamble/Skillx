import React, {Component} from "react";
import {
  Row,
  Col,
  Nav,
  NavItem,
  FormGroup,
  FormControl,
  Tab
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
      skillNameBySkillId: new Map(),
      selectedSkillId: '',
      selectedSkillName: '',
      allUserSkillPosts: [],
      allUserSkills: [],
      hasMoreItems: true,
      newPostAdded: false,
      showAddPostModal: false
    }
    this.handleLeftNavSelect = this.handleLeftNavSelect.bind(this);
    this.handleAddPostModalShow = this.handleAddPostModalShow.bind(this);
    this.handleAddPostModalClose = this.handleAddPostModalClose.bind(this);
    this.getAllUserSkillPosts = this.getAllUserSkillPosts.bind(this);
    this.getCurrentUserSkills = this.getCurrentUserSkills.bind(this);
    this.newPostAdded = this.newPostAdded.bind(this);
  }

  componentDidMount() {
    this.getCurrentUserSkills();
  }

  handleLeftNavSelect(selectedSkillId) {
    /*
      When a new UserSkill is selected, we need an empty allUserSkillPosts
      and hasMoreItems needs to be true
    */
    this.setState({
      selectedSkillId: selectedSkillId,
      selectedSkillName: this.state.skillNameBySkillId.get(selectedSkillId),
      allUserSkillPosts: [],
      hasMoreItems: true,
      newPostAdded: false
    });
  }

  handleAddPostModalShow() {
    this.setState({showAddPostModal: true});
  }

  handleAddPostModalClose() {
    this.setState({showAddPostModal: false});
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

  getCurrentUserSkills() {
    var skillNameBySkillId = new Map();
    APIUtil.getCurrentUserSkills().then(response => {
      var currentUserSkills = response.data;
      var selectedSkillId = currentUserSkills[0].id;
      currentUserSkills.map(user_skill=> {
        skillNameBySkillId.set(user_skill.id, user_skill.skill_name)
      });
      this.setState({
        allUserSkills: currentUserSkills,
        selectedSkillId: selectedSkillId,
        skillNameBySkillId: skillNameBySkillId,
        selectedSkillName: skillNameBySkillId.get(selectedSkillId)
      });
    }).catch(error => {
      console.log(error.response);
    });
  }

  newPostAdded() {
    this.setState({
      newPostAdded: true,
      allUserSkillPosts: [],
      hasMoreItems: true
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
     var key = this.state.selectedSkillId;
     /*
        When a new post is added, create a new div(by creating a new unique key)
        so that the posts get updated.
     */
     if (this.state.newPostAdded) {
       key = this.state.selectedSkillId + 100000;
     }
     /*
        Important to have a unique key for this div since we need a unique div
        for posts of each UserSkill
      */
    var postsContainer = <div key={key}>
      <PostsContainer loadHomePosts={this.getAllUserSkillPosts}
        hasMoreItems={this.state.hasMoreItems} posts={posts}/></div>;

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
              ? (<Nav className="my-skills-left-nav skill-header" bsStyle="tabs"
              activeKey={this.state.selectedSkillId}
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
        <AddPostModal show={this.state.showAddPostModal} handleClose={this.handleAddPostModalClose}
          newPostAdded={this.newPostAdded}/>
        {postsContainer}
      </Col>
      <Col xsHidden={true} sm={2} md={2} lg={2}></Col>
    </Row>);
  }
}
