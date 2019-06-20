import React, { Component } from "react";
import Header from "./Header";
import axios from "axios";
import config from "react-global-configuration";

class ForgotPassword extends Component {
  state = {
    email: "",
    submitting: false
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handlePassword = event => {
    event.preventDefault();
    this.setState({ submitting: true });
    axios
      .post(config.get("host_url") + config.get("routes.forgot_password"), {
        username: this.state.email
      })
      .then(res => {
        if (res.data.status == `success`) {
          var string = `details sent to ` + this.state.email;
          alert(string);
          this.setState({ submitting: false, username: "" });
          this.props.history.push(`/login`);
        } else {
          alert("invalid id please sign up");
          this.props.history.push(`/signup`);
        }
      })
      .catch(error => {});
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
        <Header page="forgotpassword" />
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Forgot Password</h5>
                  <form className="form-signin">
                    <div className="form-label-group">
                      <label for="inputEmail">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email address"
                        name="email"
                        value={this.state.username}
                        onChange={this.handleChange}
                      />
                    </div>
                    <br />

                    <button
                      className="btn btn-lg btn-primary btn-block"
                      type="submit"
                      onClick={this.handlePassword}
                    >
                      {this.state.submitting ? spin : ""} &nbsp;
                      {this.state.submitting ? "Submitting" : "submit"}
                    </button>
                    <br />
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
export default ForgotPassword;
