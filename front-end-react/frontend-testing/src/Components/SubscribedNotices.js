import React, { Component, Fragment } from "react";
import NoticeData from "./NoticeData";
import Sidebar from "./Sidebar";
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
    filter_tags: new Set(),
    starred_notices: [],
    subscribed_sources: []
  };

  handleFilter = tag => {
    var current_tags = this.state.filter_tags;
    if (current_tags.has(tag)) current_tags.delete(tag);
    else current_tags.add(tag);
    this.setState({ filter_tags: current_tags });
  };

  filter = item => {
    var tags_searched = item[1].tags;
    if (this.state.filter_tags.size === 0) return true;
    else {
      for (let i = 0; i < tags_searched.length; i++) {
        if (this.state.filter_tags.has(tags_searched[i].slice(1))) return true;
      }
      return false;
    }
  };
  addSource = source => {
    var source_list = this.state.subscribed_sources;
    source_list.push(source);
    this.setState({ subscribed_sources: source_list });
  };

  removeSource = source => {
    var source_list = this.state.subscribed_sources;
    source_list.splice(source_list.indexOf(source), 1);
    this.setState({ subscribed_sources: source_list });
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

    axios
      .post(config.get("host_url") + config.get("routes.user_profile"), {
        username: localStorage.getItem(`username`),
        type: localStorage.getItem(`type`)
      })
      .then(res => {
        var data = res.data;
        flag = 1;
        this.setState({
          starred_notices: data.starList,
          subscribed_sources: data.sourceSubscription
        });
      })
      .catch(error => {
        this.setState({
          error: error
        });
      });
  }
  render() {
    var total_notice = this.state.notice_data.filter(this.filter);

    if (flag == 1) {
      var total_notice = total_notice.map((item, index) => {
        if (this.state.starred_notices.indexOf(item[1]._id) == -1)
          var is_starred = false;
        else var is_starred = true;
        if (this.state.subscribed_sources.indexOf(item[1].source) == -1)
          var is_subscribed = false;
        else var is_subscribed = true;
        return (
          <NoticeData
            key={index}
            data={item}
            is_user={true}
            is_starred={is_starred}
            is_subscribed={is_subscribed}
            addSource={this.addSource}
            removeSource={this.removeSource}
            index={index}
          />
        );
      });

      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col col-md-8">
              <h1 className="text-center">Subscribed Notices</h1>
              <div className="text-danger text-center">
                {this.state.loading ? <Spinner /> : <div>{total_notice}</div>}
              </div>
            </div>
            <div className="col col-md-4">
              <Sidebar callback={this.handleFilter} />
            </div>
          </div>
        </div>
      );
    } else return <Spinner />;
  }
}

export default SubscribedNotices;
