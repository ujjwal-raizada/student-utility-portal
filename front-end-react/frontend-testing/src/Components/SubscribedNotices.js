import React, { Component } from "react";
import NoticeData from "./NoticeData";
import axios from "axios";
import config from "react-global-configuration";
import "./Stylesheets/Notices.css";
import Spinner from "./Spinner";

var flag = 0;

class SubscribedNotices extends Component {
  state = {
    notice_data: [],
    loading: true,
    error: "",
    placeholder: "",
    starred_notices: [],
    keyword: ""
  };

  componentDidMount() {
    const username = localStorage.getItem("username");
    
    axios
      .post(config.get("host_url") + config.get("routes.subscribed_notices"), {
        username: username
      })
      .then(res => {
        this.setState({
          loading: false,
          notice_data: res.data.notice
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          placeholder: error.message
        });
      });

    this.props.fetchProfile();
    flag = 1;
  }  

  render() {
    var total_notice, is_starred, is_subscribed;
    total_notice = this.state.notice_data.filter(this.props.filter);

    if (flag == 1) {
      total_notice = total_notice.map((item, index) => {

        if (this.props.starred_notices.indexOf(item[1]._id) == -1)
          is_starred = false;
        else is_starred = true;

        if (this.props.subscribed_sources.indexOf(item[1].source) == -1)
          is_subscribed = false;
        else is_subscribed = true;

        return (
          <NoticeData
            key={index}
            data={item}
            is_user={true}
            is_starred={is_starred}
            is_subscribed={is_subscribed}
            addSource={this.props.addSource}
            removeSource={this.props.removeSource}
            index={index}
          />
        );

      });

      return (
        this.state.loading ? <Spinner /> : 
        <div>
          <h1 className="text-center">Subscribed Notices</h1>
          {total_notice}
        </div>
      )
  
    } else return <Spinner />;
  }
}

export default SubscribedNotices;
