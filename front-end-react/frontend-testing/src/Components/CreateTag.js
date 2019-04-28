import React, { Component } from "react";
import axios from "axios";
import config from "react-global-configuration";

class CreateTag extends Component {
  state = {
    tag: "",
    submitting: false,
    placeholder: ""
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const username = localStorage.getItem("username");
    const tag = this.state.tag;
    this.setState({ submitting: true });
    axios
      .post(config.get("host_url") + config.get("routes.create_tag"), {
        tag: tag,
        username: username
      })
      .then(res => {
        this.setState({ submitting: false });
        console.log(res);
        const { status, message } = res.data;
        if (status == "success") {
          alert("Tag Created Successfully!");
          this.setState({ tag: "" });
        } else {
          this.setState({ placeholder: status });
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
    const spin = (
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      />
    );
    return (
      <div className="bg-light">
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-create-tag my-5">

                <div className="card-header">
                  <h5 className="card-title text-center">Create Tag</h5>
                </div>

                <div className="card-body">
                  <form className="form-create-tag">
                    <div className="form-label-group">
                      <h6 className="text-danger text-center">
                        {this.state.placeholder}
                      </h6>
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          id="tag"
                          value={this.state.tag}
                          name="tag"
                          placeholder="Enter New Tag"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <br/>
                    <div className="form-group">
                      <div className="col-sm-offset-5 col-sm-6">
                        <button
                          type="submit"
                          className="btn btn-md btn-primary btn-block"
                          disabled={this.state.submitting}
                          onClick={this.handleSubmit}
                        >
                          {this.state.submitting ? spin : ""} &nbsp;
                          {this.state.submitting ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateTag;
