import React, { Component } from "react";
import axios from "axios";
import config from "react-global-configuration";

class DeleteTags extends Component {
  state = {
    submitting: false,
    placeholder: "",
    all_tags: [],
    selected_tag: ""
  };

  componentDidMount() {
    axios
      .get(config.get("host_url") + config.get("routes.get_tags"))
      .then(res => {
        this.setState({ all_tags: res.data, selected_tag: res.data[0] });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    const username = localStorage.getItem("username");
    const tag = this.state.selected_tag;
    this.setState({ submitting: true });
    axios
      .post(config.get("host_url") + config.get("routes.delete_tag"), {
        username: username,
        tag: tag
      })
      .then(res => {
        this.setState({ submitting: false });
        console.log(res);
        const { status, message } = res.data;
        if (status == "success") {
          alert(tag + " " + message);
        } else {
          alert(message);
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          placeholder: error.message,
          submitting: false
        });
      });
  };
  handleChange = event => {
    this.setState({ selected_tag: event.target.value });
  };
  render() {
    const spin = (
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      />
    );
    const tag_list = this.state.all_tags.map((item, index) => (
      <option key={index} value={item}>
        {item}
      </option>
    ));
    return (
      <div>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col text-center">{this.state.placeholder}</div>
            <label className="control-label col-sm-4">
              <h2>Delete Tags</h2>
            </label>
          </div>
          <select value={this.state.selected_tag} onChange={this.handleChange}>
            {tag_list}
          </select>
          <div className="form-group">
            <div className="col-sm-offset-5 col-sm-4">
              <button
                type="submit"
                className="btn btn-default btn-primary"
                disabled={this.state.submitting}
                onClick={this.handleSubmit}
              >
                {this.state.submitting ? spin : ""} &nbsp;
                {this.state.submitting ? "Submitting..." : "Delete"}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default DeleteTags;
