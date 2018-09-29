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
  Nav
} from "react-bootstrap";
import "./sign_up.css";
import * as APIUtil from "../util/api_util";
import {Redirect} from 'react-router-dom';
import GlobalNav from './global_nav';
import LeftNav from './left_nav';
import AddPost from './add_post';
import Select from 'react-select';

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
      allSkillsEnabled: []
    };
  }

  componentDidMount() {
    this.getAllSkills()
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
      console.log(error)
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
      <Col xs={12} sm={8} md={8} lg={8}>
        <div>
          <AddPost/>
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>
            </Panel.Heading>
            <Panel.Body>Panel content</Panel.Body>
          </Panel>
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>
            </Panel.Heading>
            <Panel.Body>Panel content</Panel.Body>
          </Panel>
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
