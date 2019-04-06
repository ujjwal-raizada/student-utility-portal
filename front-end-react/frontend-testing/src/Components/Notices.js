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
    placeholder: ""
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
    const total_notice = this.state.notice_data.map((item, index) => (
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
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }
}

export default Notices;
