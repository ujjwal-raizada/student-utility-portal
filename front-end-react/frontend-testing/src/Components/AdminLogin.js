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

class AdminLogin extends Component {
  state = {
    username: "",
    password: "",
    placeholder: "",
    error: {},
    logging_in: false
  };

  componentDidMount() {
    localStorage.setItem("username", "");
    localStorage.setItem("type", "");
    localStorage.setItem("name", "");
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
      .post(config.get("host_url") + config.get("routes.admin_login"), user)

      .then(res => {
        console.log(res);
        const { username, status, message } = res.data;

        if (status == "success") {
          this.setState({ logging_in: false, placeholder: "" });
          var name = username.split("@");
          name[0] = name[0].toUpperCase();
          var temp = name[0][0];
          name[0] = name[0].toLowerCase();
          temp = temp.concat(name[0].slice(1));
          localStorage.setItem("name", temp);
          localStorage.setItem("username", username);
          localStorage.setItem("type", "Admin");
          this.props.history.push("/");
        } else if (status == "failure") {
          this.setState({
            placeholder: message,
            logging_in: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
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
        <Header page="AdminLogin" />
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Admin Log In</h5>
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
                    <div className="col text-center">
                      {this.state.placeholder}
                    </div>
                    <div className="custom-control custom-checkbox mb-3">
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
                    </div>
                    <button
                      className="btn btn-lg btn-primary btn-block"
                      type="submit"
                      disabled={this.state.logging_in}
                      onClick={this.handleLogin}
                    >
                      {this.state.logging_in ? spin : ""} &nbsp;
                      {this.state.logging_in ? "Logging in..." : "Log in"}
                    </button>
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
export default AdminLogin;
