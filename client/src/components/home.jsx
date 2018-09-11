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

    this.state = {
      allSkills: [],
      selectedSkills: [],
      show: true
    };
  }

  componentDidMount() {
    this.getAllSkills()
  }

  handleHide() {
    this.setState({show: false});
  }

  getAllSkills() {
    APIUtil.getSkills().then(response => {
      this.setState({
        allSkills: response.data.map(skill => ({value: skill.name, label: skill.name}))
      })
    }).catch(error => {
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
            <Select isMulti="isMulti" name="colors" className="basic-multi-select" classNamePrefix="select" options={this.state.allSkills}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Next</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>);
  }
}
