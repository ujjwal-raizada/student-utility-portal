import React, { Component } from "react";
import axios from "axios";
import config from "react-global-configuration";
class SourcesList extends Component {
  state = {
    sources: []
  };

  componentDidMount() {
    axios
      .get(config.get("host_url") + config.get("routes.sources"))
      .then(res => {
        this.setState({
          sources: res.data.source_list
        });
      });
  }

  render() {
    const sources_list = this.state.sources.map((item, index) => (
      <h6 key={index}>
        {index + 1}
        {" . "}
        {item.username}
      </h6>
    ));

    return (
      <div>
        <h2>Sources Registered</h2>
        <br />
        {sources_list}
      </div>
    );
  }
}

export default SourcesList;
