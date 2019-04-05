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
    text: "",
    url: "",
    is_event: false,
    date: new Date(),
    tag1: false,
    tag2: false,
    tag3: false,
    tag4: false,
    tag5: false,
    status: "failure",
    error: ""
  };

  componentDidMount() {
    const username = localStorage.getItem("username");
    const type = localStorage.getItem("type");
    const user_input = this.props.match.params.username;
    if (username === user_input && type === "official") {
      this.setState({
        username: username,
        type: type
      });
    } else {
      this.redirect();
    }
  }

  redirect = () => {
    const username = localStorage.getItem("username");
    const type = localStorage.getItem("type");
    if (username === "") {
      this.props.history.push(`/login`);
    } else {
      this.props.history.push(`/Profile/${type}/${username}`);
    }
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleChangeDate = date => {
    this.setState({
      date: date
    });
  };

  postNotice = () => {
    this.setState({
      placeholder: "Submitting..."
    });
    const data = this.state;
    console.log(data);
    axios
      .post(config.get("host_url") + config.get("routes.create_notice"), data)
      .then(res => {
        console.log(res.data);
        const status = res.data.status;
        const message = res.data.message;
        if (status === "success") {
          alert("Notice Submitted Successfully!");
          const url = `/profile/official/${this.state.username}`;
          this.props.history.push(url);
        } else if (status === "failure") {
          this.setState({
            placeholder: message
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: error,
          placeholder: error.message
        });
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.postNotice();
  };

  render() {
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
                          name="text"
                          placeholder="Text"
                          value={this.state.text}
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
                          value={this.state.date}
                          onChange={this.handleChangeDate}
                          disabled={!this.state.is_event}
                        />
                      </div>

                      <div>
                        <label style={{ width: 100 }}>
                          <input
                            type="checkbox"
                            name="tag1"
                            checked={this.state.tag1}
                            onChange={this.handleChange}
                          />
                          tag1
                        </label>

                        <label style={{ width: 100 }}>
                          <input
                            type="checkbox"
                            name="tag2"
                            checked={this.state.tag2}
                            onChange={this.handleChange}
                          />
                          tag2
                        </label>

                        <label style={{ width: 100 }}>
                          <input
                            type="checkbox"
                            name="tag3"
                            checked={this.state.tag3}
                            onChange={this.handleChange}
                          />
                          tag3
                        </label>

                        <label style={{ width: 100 }}>
                          <input
                            type="checkbox"
                            name="tag4"
                            checked={this.state.tag4}
                            onChange={this.handleChange}
                          />
                          tag4
                        </label>

                        <label style={{ width: 100 }}>
                          <input
                            type="checkbox"
                            name="tag5"
                            checked={this.state.tag5}
                            onChange={this.handleChange}
                          />
                          tag5
                        </label>

                        <br />
                        <br />
                      </div>

                      <div>
                        <input
                          type="submit"
                          className="btn btn-primary"
                          name="Submit"
                          onClick={this.handleSubmit}
                        />

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
