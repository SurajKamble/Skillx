import React, {Component} from "react";
import Select from 'react-select';
import {
  FormGroup,
  FormControl,
  Row,
  Col,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import "./profile/profile.css";
import * as APIUtil from "../util/api_util";
import {Redirect} from 'react-router-dom';
import AddPost from './add_post/add_post';
import AddPostModal from './add_post/add_post_modal';
import PostsContainer from './posts/posts_container';

export default class SkillsDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUserSkills: this.props.allUserSkills,
      allUserSkillsOptions: [],
      selectedSkillName: ''
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.changeUserSkillId = this.props.changeUserSkillId;
  }

  componentWillMount() {
      {/*
        this.state.allUserSkills: this.props.allUserSkills.map(user_skill => ({value: user_skill.id, label: user_skill.skill_name}));

      this.setState({selectedSkillName: this.state.allUserSkills[0]});
    }).catch(error => {
      console.log(error.response);
    });
    */}
  }

  handleSelect(selectedSkillName) {
    this.setState({selectedSkillName});
    this.changeUserSkillId(selectedSkillName.value);
  }

  render() {
    this.changeUserSkillId(this.selectedSkillName.value);
    return (<div>
      <Select className = "profile-skills-dropdown" value={this.state.selectedSkillName}
        onChange={this.handleSelect} options={this.state.allUserSkills}/>
    </div>);
  }
}
