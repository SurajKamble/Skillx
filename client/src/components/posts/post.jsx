import React, {Component} from "react";
import {Panel} from "react-bootstrap";
import "./post.css";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post
    };
  }

  render() {
    var user_url = "/profile/" + this.state.post.user.id + "/" + this.state.post.user.firstname;

    return (<Panel key={this.props.id} className="post-panel">
      <div className="post-header-div">
        <div className="post-header-image-div">
          <a href={user_url}>
          <img className="post-header-image" src={this.state.post.display_picture}></img>
          </a>
        </div>
        <div className="post-header-username-div">
          <h5 className="post-header-username">
            <a className="user-url-link" href={user_url}>{this.state.post.user.firstname + " " + this.state.post.user.lastname}</a>
            <span className = 'not-bold ligher-black'> posted in </span>
            <span>{this.state.post.skill_name}</span>
          </h5>
        </div>
      </div>
      <div className="post-content">
        <div>
          {this.state.post.post_content.text}
        </div>
        <a href={this.state.post.link_preview.url} target="_blank" className="link-preview-link">
          <div className="post-link-preview">
            <div className="link-preview-content">
              <div className="text-bold link-preview-title">{this.state.post.link_preview.title}</div>
              <div className="link-preview-desc ligher-black">
                {this.state.post.link_preview.description}
              </div>
            </div>
            <div className="post-link-preview-img-div">
              <img className="post-link-preview-img" src={this.state.post.link_preview_image}/>
            </div>
          </div>
        </a>
      </div>
    </Panel>);
  }
}
