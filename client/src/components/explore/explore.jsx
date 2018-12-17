import React, {Component} from "react";
import {Row, Col} from "react-bootstrap";
import "../base/base.css";
import * as APIUtil from "../../util/api_util";
import {Redirect} from 'react-router-dom';
import GlobalNav from '../global_nav/global_nav';
import AddPost from '../add_post/add_post';
import SkillPosts from '../skill_posts/skill_posts';
import Select from 'react-select';
import PostsContainer from '../posts/posts_container';
import HomeLeftNav from '../home/home_left_nav';

export default class Explore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allExplorePosts: []
    }
  }

  componentDidMount() {
    APIUtil.getAllExplorePosts().then(response => {
      this.setState({
        allExplorePosts: response.data
      });
    }).catch(error => {
      console.log(error.response);
    });
  }

  render() {
    return (
      <Row className="show-grid">
        <Col xsHidden sm={2} md={2} lg={2}>
          <HomeLeftNav/>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} className="center-col">
          <PostsContainer allUserSkillPosts={this.state.allExplorePosts}/>
        </Col>
        <Col xsHidden sm={2} md={2} lg={2}>
        </Col>
      </Row>
    );
  }
}
