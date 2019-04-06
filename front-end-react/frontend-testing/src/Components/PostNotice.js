import React, { Component, Fragment } from "react";
import axios from "axios";
import config from "react-global-configuration";
import DateTimePicker from "react-datetime-picker";
import { Form, Jumbotron, Button, Container, Row, Col } from "react-bootstrap";
import Header from "./Header";

class PostNotice extends Component {
  state = {
    username: "",
    type: "normal",
    placeholder: "",
    title: "",
    body: "",
    url: "",
    is_event: false,
    eventDateTime: new Date(),
    tags: [],
    submitting: false,
    status: "failure",
    error: ""
  };

  componentDidMount() {
    const username = localStorage.getItem("username");
    const type = localStorage.getItem("type");
    const user_input = this.props.match.params.username;
    if (username == user_input && type == "Official Source") {
      this.setState({
        username: username,
        type: type,
        submitting: false
      });
      axios
        .get(config.get("host_url") + config.get("routes.get_tags"))
        .then(res => {
          this.setState({ tags: res.data });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.redirect();
    }
  }

  redirect = () => {
    const username = localStorage.getItem("username");
    const type = localStorage.getItem("type");
    if (username == "") {
      this.props.history.push(`/login`);
    } else {
      this.props.history.push(`/Profile/${type}/${username}`);
    }
  };

  postNotice = () => {
    this.setState({
      submitting: true
    });
    const data = this.state;
    /*const username = localStorage.getItem("username");
    if (data.tags.indexOf(username) == -1) {
      data.tags.push(username);
    }*/
    console.log(data);
    axios
      .post(config.get("host_url") + config.get("routes.create_notice"), data)
      .then(res => {
        console.log(res.data);
        const { status, message } = res.data;
        if (status == "success") {
          this.setState({ submitting: false });
          alert("Notice Submitted Successfully!");
          const url = `/profile/official/${this.state.username}`;
          this.props.history.push(url);
        } else if (status == "failure") {
          this.setState({
            submitting: false,
            placeholder: message
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: error,
          placeholder: error.message,
          submitting: false
        });
      });
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type == "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleChangeDate = date => {
    this.setState({
      eventDateTime: date
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.postNotice();
  };

  handleTag = tag => {
    this.setState((prevState, props) => {
      const pos = prevState.tags.indexOf(tag);
      tags: pos == -1
        ? prevState.tags.push(tag)
        : prevState.tags.splice(pos, 1);
    });
  };

  setClass = tag => {
    return this.state.tags.indexOf(tag) != -1
      ? "badge badge-pill badge-secondary"
      : "badge badge-pill badge-light";
  };

  render() {
    const tag_list = this.state.tags.map((item, index) => (
      <a
        className={this.setClass(item)}
        key={item}
        onClick={e => {
          e.preventDefault();
          this.handleTag(item);
        }}
      >
        {item}
      </a>
    ));
    return (
      <div>
        <Header page="PostNotice" />
        <Jumbotron>
          <div className="container">
            <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-postNotice">
                  <div className="card-body">
                    <h5 className="card-title text-center">Post Notice</h5>
                    <h6 className="text-danger text-center">
                      {this.state.placeholder}
                    </h6>
                    <form className="form-postNotice">
                      <div className="form-label-group">
                        <label for="inputEmail">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          placeholder="Title"
                          value={this.state.title}
                          onChange={this.handleChange}
                        />
                        <br />
                      </div>

                      <div className="form-label-group">
                        <label for="inputDescription">
                          Description
                          <br />
                        </label>
                        <textarea
                          class="form-control"
                          rows="5"
                          name="body"
                          placeholder="Text"
                          value={this.state.body}
                          onChange={this.handleChange}
                        />
                        <br />
                      </div>
                      <div className="form-label-group">
                        <label for="inputEmail">URL</label>
                        <input
                          type="text"
                          className="form-control"
                          name="url"
                          placeholder="URL"
                          value={this.state.url}
                          onChange={this.handleChange}
                        />
                        <br />
                      </div>

                      <div>
                        <label style={{ width: 100 }}>
                          Is an Event :
                          <input
                            type="checkbox"
                            name="is_event"
                            checked={this.state.is_event}
                            onChange={this.handleChange}
                          />
                        </label>
                        <br />
                        <label>Starts At:</label>
                        <DateTimePicker
                          value={this.state.eventDateTime}
                          onChange={this.handleChangeDate}
                          disabled={!this.state.is_event}
                        />
                      </div>
                      <label> Tags </label>
                      <br />
                      {tag_list}
                      <br />
                      <div>
                        <button
                          className="btn btn-lg btn-success btn-block"
                          type="submit"
                          disabled={this.state.submitting}
                          onClick={this.handleSubmit}
                        >
                          {this.state.submitting ? "Submitting.." : "Submit"}
                        </button>

                        <br />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Jumbotron>
      </div>
    );
  }
}
export default PostNotice;
