import React, { Component, Fragment } from "react";
import NoticeData from "./NoticeData";
import Sidebar from "./Sidebar";
import axios from "axios";
import config from "react-global-configuration";
import "./Stylesheets/Notices.css";

class Notices extends Component {
  state = {
    notice_data: [],
    loading: true,
    error: "",
    placeholder: "",
    filter_tags: new Set()
  };

  handleFilter = tag => {
    var current_tags = this.state.filter_tags;
    if (current_tags.has(tag)) current_tags.delete(tag);
    else current_tags.add(tag);
    this.setState({ filter_tags: current_tags });
  };

  filter = item => {
    console.log(item[1].tags);
    var tags_searched = item[1].tags;
    if (this.state.filter_tags.size === 0) return true;
    else {
      for (let i = 0; i < tags_searched.length; i++) {
        if (this.state.filter_tags.has(tags_searched[i].slice(1))) return true;
      }
      return false;
    }
  };

  componentDidMount() {
    axios
      .get(config.get("host_url") + config.get("routes.get_all_notices"))
      .then(res => {
        console.log(res);
        this.setState({
          loading: false,
          notice_data: res.data
        });
      })
      .then(res => console.log("success"))
      .catch(error => {
        console.log(error);
        this.setState({
          error: error,
          placeholder: error.message
        });
      });
  }
  render() {
    var total_notice = this.state.notice_data.filter(this.filter);

    var total_notice = total_notice.map((item, index) => (
      <NoticeData key={index} data={item} />
    ));

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-8">
            <h1 className="text-center">Notices</h1>
            <div className="text-danger text-center">
              {this.state.loading ? (
                <div className="text-center">
                  <div className="loader" />
                </div>
              ) : (
                <div>{total_notice}</div>
              )}
            </div>
          </div>
          <div className="col col-md-4">
            <Sidebar callback={this.handleFilter} />
          </div>
        </div>
      </div>
    );
  }
}

export default Notices;
