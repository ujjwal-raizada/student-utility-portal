import React, { Component } from "react";
import axios from "axios";
import config from "react-global-configuration";

class DeleteTags extends Component {
  state = {
    submitting: false,
    placeholder: "",
    all_tags: [],
    selected_tags: []
  };

  componentDidMount() {
    axios
      .get(config.get("host_url") + config.get("routes.get_tags"))
      .then(res => {
        this.setState({ all_tags: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = event => {
    const target = event.target;
    if (target.type == "checkbox") {
      const tag = target.name;
      const pos = this.state.selected_tags.indexOf(tag);
      this.setState((prevState, props) => {
        selected_tags: pos == -1
          ? prevState.selected_tags.push(tag)
          : prevState.selected_tags.splice(pos, 1);
      });
    } else {
      const value = event.target.value;
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const admin = localStorage.getItem("username");
    const tags = this.state.selected_tags;
    this.setState({ submitting: true });
    axios
      .post(config.get("host_url") + config.get("routes.delete_tag"), {
        admin,
        tags
      })
      .then(res => {
        this.setState({ submitting: false });
        console.log(res);
        const { status, message } = res.data;
        if (status == "success") {
          this.setState({ placeholder: message });
        } else {
          this.setState({ placeholder: message });
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

  render() {
    const tag_list = this.state.all_tags.map((item, index) => (
      <div>
        <label key={index}>
          <input
            name={item}
            type="checkbox"
            checked={
              this.state.selected_tags.indexOf(item) != -1 ? true : false
            }
            onChange={this.handleChange}
          />{" "}
          #{item}
        </label>
      </div>
    ));

    const spin = (
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      />
    );

    return (
      <div>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col text-center">{this.state.placeholder}</div>
            <label className="control-label col-sm-4">
              <h2>Delete Tags</h2>
            </label>
            <div>{tag_list}</div>
          </div>
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
