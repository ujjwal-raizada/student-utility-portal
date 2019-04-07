import React, { Component, Fragment } from "react";
import axios from "axios";
import config from "react-global-configuration";
import "./Stylesheets/Sidebar.css";

export default class Sidebar extends Component {
  state = {
    tags: [],
    tags_on_left: [],
    tags_on_right: []
  };

  handleClick = event => {
    event.preventDefault();
    console.log(event.target.className);
    var color = event.target.className;
    if (color === `btn btn-block btn-info`)
      event.target.className = `btn btn-block btn-dark`;
    else event.target.className = `btn btn-block btn-info`;
    const tag = event.target.textContent;
    this.props.callback(tag);
  };

  tagDisplay = () => {
    var left_array = [];
    var right_array = [];
    for (let i = 0; i < this.state.tags.length; i++) {
      console.log("in sidebar");
      console.log(left_array);
      console.log("outside left array");
      if (i % 2) right_array.push(this.state.tags[i]);
      else left_array.push(this.state.tags[i]);
      this.setState({
        tags_on_left: left_array,
        tags_on_right: right_array
      });
    }
  };

  componentDidMount() {
    console.log("sidebar mounted");
    axios
      .get(config.get("host_url") + config.get("routes.get_tags"))
      .then(res => {
        this.setState({ tags: res.data });
        this.tagDisplay();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const left_display = this.state.tags_on_left.map(tag => (
      <button className="btn btn-block btn-info" onClick={this.handleClick}>
        {tag}
      </button>
    ));
    const right_display = this.state.tags_on_right.map(tag => (
      <button className="btn btn-block btn-info" onClick={this.handleClick}>
        {tag}
      </button>
    ));
    return (
      <Fragment>
        <div className="position-fixed">
          <div class="card my-4">
            <h5 class="card-header">Search</h5>
            <div class="card-body">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search for..."
                />
                &nbsp;
                <span class="input-group-btn">
                  <button class="btn btn-secondary" type="button">
                    Go!
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div class="card my-4">
            <h5 class="card-header">Tags</h5>
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6">
                  <ul class="list-unstyled mb-0">{left_display}</ul>
                </div>
                <div class="col-lg-6">
                  <ul class="list-unstyled mb-0">{right_display}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
