import React, {Component} from "react";
import {Row, Col, Modal} from "react-bootstrap";
import "../sign_up/sign_up.css";
import * as APIUtil from "../../util/api_util";
import {Redirect} from 'react-router-dom';
import GlobalNav from '../global_nav/global_nav';
import HomeLeftNav from './home_left_nav';
import AddPost from '../add_post/add_post';
import Select from 'react-select';
import PostsContainer from '../posts/posts_container';
import InfiniteScroll from 'react-infinite-scroller';
import Post from '../posts/post';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSkills: [],
      selectedSkills: [],
      show: true,
      allSkillsDisabled: [],
      allSkillsEnabled: [],
      allHomePosts: [],
      hasMoreItems: true
    };
    
    this.handleHide = this.handleHide.bind(this);
    this.getAllSkills = this.getAllSkills.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSkills = this.addSkills.bind(this);
    this.loadHomePosts = this.loadHomePosts.bind(this);
  }

  componentDidMount() {
    this.getAllSkills();
  }

  loadHomePosts(page) {
    console.log(page);
    APIUtil.getAllHomePosts(page).then(response => {
      var hasMoreItems = !(response.data.length === 0);
      var allHomePosts = this.state.allHomePosts;
      Array.prototype.push.apply(allHomePosts, response.data);
      this.setState({
        allHomePosts: allHomePosts,
        hasMoreItems: hasMoreItems
      });
    }).catch(error => {
      console.log(error.response);
    });
  }

  addSkills() {
    this.state.selectedSkills = this.state.selectedSkills.map(skill_data => skill_data.value);
    APIUtil.addSkills(this.state.selectedSkills).then(response => {
      this.setState({show: false});
    }).catch(error => {
      console.log(error.response);
    });
  }

  getAllSkills() {
    APIUtil.getSkills().then(response => {
      var allSkills = response.data.map(skill => ({value: skill.id, label: skill.name}));
      this.setState({
        allSkills: allSkills,
        allSkillsEnabled: allSkills,
        allSkillsDisabled: allSkills.map(skill => ({value: skill.value, label: skill.label, isDisabled: true}))
      })
    }).catch(error => {
      console.log(error.response)
    });
  }

  handleHide() {
    this.setState({show: false});
  }

  handleChange(event) {
    if (event.length < 3) {
      this.setState({
        selectedSkills: event,
        allSkills: this.state.allSkillsEnabled
      })
    } else {
      this.setState({
        selectedSkills: event,
        allSkills: this.state.allSkillsDisabled
      })
    }
  }

  render() {
    var posts = [];
    this.state.allHomePosts.map(
      post => {
        posts.push(
        <div key={post.id}>
          <Post post={post} id={post.id}/>
        </div>)
    });

    return (<Row className="show-grid">
      <Col xsHidden={true} sm={2} md={2} lg={2}>
        <HomeLeftNav/>
      </Col>
      <Col xs={12} sm={8} md={8} lg={8} className="center-col">
        <div>
          <AddPost/>
          <PostsContainer loadHomePosts={this.loadHomePosts}
            hasMoreItems={this.state.hasMoreItems}
            posts={posts}/>
        </div>
        <div className="modal-container">
          <Modal show={this.state.show} onHide={this.handleHide} container={this} aria-labelledby="contained-modal-title">
            <Modal.Header closeButton={true}>
              <Modal.Title className="modal-title">
                Add Skills
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Select upto 3 of your most significant skills
              <Select isMulti="isMulti" onChange={this.handleChange} name="colors" className="basic-multi-select" classNamePrefix="select" options={this.state.allSkills}/>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn black-button" onClick={this.addSkills}>Next</button>
            </Modal.Footer>
          </Modal>
        </div>
      </Col>
      <Col xsHidden={true} sm={2} md={2} lg={2}></Col>
    </Row>);
  }
}
