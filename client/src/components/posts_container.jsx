import React, {Component} from "react";
import * as APIUtil from "../util/api_util";
import {Redirect} from 'react-router-dom';
import GlobalNav from './global_nav';
import AddPost from './add_post';
import Select from 'react-select';
import AddPostModal from './add_post_modal';
import Post from './post';

export default class PostsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUserSkillPosts: this.props.allUserSkillPosts,
      allUserSkillPostsHtml: ''
    };
    this.createAllPosts = this.createAllPosts.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.allUserSkillPosts === prevState.allUserSkillPosts) {
      return null;
    }
    return {
      allUserSkillPosts: nextProps.allUserSkillPosts
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.allUserSkillPosts !== prevProps.allUserSkillPosts) {
      this.createAllPosts();
    }
  }

  createAllPosts() {
    this.setState({
      allUserSkillPostsHtml: this.state.allUserSkillPosts.map(post => {
      return (
        <div key={post.id}>
          <Post post={post} id={post.id}/>
        </div>
      )
    })});
  }

  render() {
    return (
      <div>
        {this.state.allUserSkillPostsHtml}
      </div>
    );
  }
}
