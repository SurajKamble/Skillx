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
  Popover,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import "./sign_up.css";
import * as APIUtil from "../util/api_util";
import {Redirect} from 'react-router-dom';
import GlobalNav from './global_nav';
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
      show: true
    };
  }

  componentDidMount() {
    this.getAllSkills()
  }

  addSkills() {
    console.log(this.state.selectedSkills);
    this.state.selectedSkills = this.state.selectedSkills.map(skill_data => skill_data.value);
    console.log(this.state.selectedSkills);
    APIUtil.addSkills(this.state.selectedSkills).then(response => {
      console.log(response)
      this.setState({show: false});
    }).catch(error => {
      console.log(error.response);
    });
  }

  getAllSkills() {
    APIUtil.getSkills().then(response => {
      console.log(response)
      this.setState({
        allSkills: response.data.map(skill => ({value: skill.id, label: skill.name}))
      })
    }).catch(error => {
      console.log(error)
    });
  }

  handleHide() {
    this.setState({show: false});
  }

  handleChange(event) {
    this.setState({
      selectedSkills: event
    });
  }

  render() {
    return (<div>
      <GlobalNav/>
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
            <Button onClick={this.addSkills}>Next</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>);
  }
}
