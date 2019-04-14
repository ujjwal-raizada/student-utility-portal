import React, { Component } from "react";
import axios from "axios";
import config from "react-global-configuration";

class Source extends Component {
  state = {
    subscribed: false,
    submitting: false
  };
  componentDidMount() {
    this.setState({ subscribed: this.props.subscribed });
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({ submitting: true });
    const source = this.props.source;
    const username = localStorage.getItem("username");

    if (this.state.subscribed) {
      const path = config.get("host_url") + config.get("routes.unsubscribe");
      axios
        .post(path, { username: username, source: source })
        .then(res => {
          console.log(res);
          if (res.data.status == "success") {
            this.setState({
              submitting: false,
              subscribed: false
            });
          }
        })
        .catch(error => {});
    } else {
      const path = config.get("host_url") + config.get("routes.subscribe");
      axios
        .post(path, { username: username, source: source })
        .then(res => {
          if (res.data.status == "success") {
            this.setState({
              submitting: false,
              subscribed: true
            });
          }
        })
        .catch(error => {});
    }
  };

  render() {
    var temp = this.props.source.split("@");
    temp[0] = temp[0].toUpperCase();
    var name = temp[0][0];
    temp[0] = temp[0].toLowerCase();
    name = name.concat(temp[0].slice(1));
    return (
      <div>
        <label>
          {" "}
          {this.props.index + 1 + ". " + name}{" "}
          <button
            className="btn btn-info aligned-right"
            onClick={this.handleClick}
            disabled={this.state.submitting}
          >
            {this.state.submitting
              ? "requesting"
              : this.state.subscribed
              ? "subscribed"
              : "subscribe"}{" "}
          </button>{" "}
        </label>
      </div>
    );
  }
}

export default Source;
