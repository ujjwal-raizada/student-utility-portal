import React, { Component, Fragment } from "react";
import axios from "axios";
import config from "react-global-configuration";
import Header from "./Header";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 1
    }}
  />
);

class Login extends Component {
  state = {
    username: "",
    password: "",
    placeholder: "",
    error: {},
    logging_in: false
  };

  componentDidMount() {
    localStorage.removeItem("username");
    localStorage.removeItem("type");
    localStorage.removeItem("name");
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleLogin = event => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };

    this.setState({
      logging_in: true
    });

    axios
      .post(config.get("host_url") + config.get("routes.user_login"), user)

      .then(res => {
        console.log(res);
        const { type, username, status } = res.data;

        if (status === "success") {
          localStorage.setItem("username", username);
          var name = this.state.username.split("@");
          name[0] = name[0].toUpperCase();
          var temp = name[0][0];
          name[0] = name[0].toLowerCase();
          temp = temp.concat(name[0].slice(1));
          console.log(temp);
          localStorage.setItem("name", temp);
          localStorage.setItem("type", type);
          this.setState({ logging_in: false });
          this.props.history.push(`/`);
        } else if (status === "failure") {
          this.setState({
            placeholder: `Login failed`,
            logging_in: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handlePassword = () => {
    this.props.history.push(`/forgotpassword`);
  };

  handleSignup = () => {
    this.props.history.push(`/signup`);
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
        <Header page="login" />
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Log In</h5>
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
                    <label for="inputPassword">Password</label>
                    <div className="form-label-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </div>
                    <br />
                    <div className="col text-center">
                      {this.state.placeholder}
                    </div>
                    {/*<div className="custom-control custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          checked="true"
                        />
  
                        <label
                          className="custom-control-label"
                          for="customCheck1"
                        >
                          Remember Me
                        </label>
                      </div>*/}
                    <button
                      className="btn btn-lg btn-primary btn-block"
                      type="submit"
                      onClick={this.handleLogin}
                      disabled={this.state.logging_in}
                    >
                      {this.state.logging_in ? spin : ""} &nbsp;
                      {this.state.logging_in ? "Logging in" : "Log in"}
                    </button>
                    <br />
                    <div className="col text-center">
                      Forgot Password? &nbsp;&nbsp;
                      <a href="/forgotpassword">Reset here </a>
                    </div>
                    <hr className="my-4" />
                    <div className="col text-center">
                      <button
                        className="btn btn-success"
                        type="submit"
                        onClick={this.handleSignup}
                      >
                        Sign Up
                      </button>
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
export default Login;
