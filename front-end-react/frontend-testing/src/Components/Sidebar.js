import React, { Component, Fragment } from "react";
import axios from "axios";
import config from "react-global-configuration";
import "./Stylesheets/Sidebar.css";

export default class Sidebar extends Component {
  state = {
    tags: [],
    tags_on_left: [],
    tags_on_right: [],
    keyword: ""
  };

  handleClick = event => {
    event.preventDefault();
    var color = event.target.className;
    if (color === `btn btn-block btn-info`)
      event.target.className = `btn btn-block btn-dark`;
    else event.target.className = `btn btn-block btn-info`;
    const tag = event.target.textContent;
    this.props.handleFilter(tag);
  };

  handleSearch = event => {
    event.preventDefault();
    const keyword = event.target.value;
    this.setState({
      keyword: keyword
    })
    this.props.handleSearch(keyword);
  }

  tagDisplay = () => {
    var left_array = [];
    var right_array = [];
    for (let i = 0; i < this.state.tags.length; i++) {
      if (i % 2) right_array.push(this.state.tags[i]);
      else left_array.push(this.state.tags[i]);
      this.setState({
        tags_on_left: left_array,
        tags_on_right: right_array
      });
    }
  };

  componentDidMount() {
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
    const left_display = this.state.tags_on_left.map((tag, index) => (
      <button
        className="btn btn-block btn-info"
        onClick={this.handleClick}
        key={index}
      >
        {tag}
      </button>
    ));

    const right_display = this.state.tags_on_right.map((tag, index) => (
      <button
        className="btn btn-block btn-info"
        onClick={this.handleClick}
        key={index}
      >
        {tag}
      </button>
    ));

    return (
      <Fragment>
        <div className="position-fixed">
          <div className="card my-4">
            <h5 className="card-header">Search</h5>
            <div className="card-body">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for..."
                  value={this.state.keyword}
                  onChange={this.handleSearch}
                />
                &nbsp;
                <span className="input-group-btn">
                  <button className="btn btn-secondary" type="button">
                    Go!
                  </button>
                </span>
              </div>
            </div>
          </div>
          
          <div className="card my-4">
            <h5 className="card-header">Tags</h5>
            <div
              className="card-body"
              style={{
                overflowX: "hidden",
                overflowY: "auto",
                height: "210px"
              }}
            >
              <div className="row">
                <div className="col-lg-6">
                  <ul className="list-unstyled mb-0">{left_display}</ul>
                </div>
                <div className="col-lg-6">
                  <ul className="list-unstyled mb-0">{right_display}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
