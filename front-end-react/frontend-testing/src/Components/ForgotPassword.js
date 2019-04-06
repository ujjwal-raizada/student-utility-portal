import React, { Component, Fragment } from "react";
import Header from "./Header";

class ForgotPassword extends Component {
  state = {
    email: "",
    submitting: false
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  handlePassword = event => {
    event.preventDefault();
    this.setState({ submitting: true });
    this.props.history.push(`/error/url`);
    this.setState({ submitting: false });
  };

  render() {
    const spin = (
      <span
        class="spinner-border spinner-border-sm"
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
                        name="username"
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
