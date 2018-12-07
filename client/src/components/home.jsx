import React, {Component} from "react";
import {Row, Col, Modal} from "react-bootstrap";
import "./sign_up.css";
import * as APIUtil from "../util/api_util";
import {Redirect} from 'react-router-dom';
import GlobalNav from './global_nav';
import LeftNav from './left_nav';
import AddPost from './add_post';
import Select from 'react-select';
import PostsContainer from './posts_container';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);
    this.getAllSkills = this.getAllSkills.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSkills = this.addSkills.bind(this);

    this.state = {
      allSkills: [],
      selectedSkills: [],
      show: true,
      allSkillsDisabled: [],
      allSkillsEnabled: [],
      allHomePosts: []
    };
  }

  componentDidMount() {
    this.getAllSkills();
    APIUtil.getAllHomePosts().then(response => {
      this.setState({
        allHomePosts: response.data
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
      this.setState({
        allSkills: response.data.map(skill => ({value: skill.id, label: skill.name}))
      })
      this.setState({
        allSkillsEnabled: this.state.allSkills
      })
      this.setState({
        allSkillsDisabled: response.data.map(skill => ({value: skill.id, label: skill.name, isDisabled: true}))
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
      this.setState({selectedSkills: event});
      this.setState({
        allSkills: this.state.allSkillsEnabled
      })
    } else {
      this.setState({selectedSkills: event});
      this.setState({
        allSkills: this.state.allSkillsDisabled
      })
    }
  }

  render() {
    return (<Row className="show-grid">
      <Col xsHidden sm={2} md={2} lg={2}>
        <LeftNav/>
      </Col>
      <Col xs={12} sm={8} md={8} lg={8} className="center-col">
        <div>
          <AddPost/>
          <PostsContainer allUserSkillPosts={this.state.allHomePosts}/>
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
                <Select isMulti="isMulti" onChange={this.handleChange} name="colors"
                  className="basic-multi-select" classNamePrefix="select"
                  options={this.state.allSkills}/>
              </Modal.Body>
              <Modal.Footer>
                <button className="btn black-button" onClick={this.addSkills}>Next</button>
              </Modal.Footer>
            </Modal>
          </div>
      </Col>
      <Col xsHidden sm={2} md={2} lg={2}>
      </Col>
    </Row>);
  }
}
