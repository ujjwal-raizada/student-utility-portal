import React, { Component, Fragment } from "react";
import NoticeData from "./NoticeData";
import Sidebar from "./Sidebar";
import axios from "axios";
import config from "react-global-configuration";
import "./Stylesheets/Notices.css";
import Spinner from "./Spinner";

var flag = 0;

class AllNotices extends Component {
  state = {
    notice_data: [],
    loading: true,
    error: "",
    placeholder: "",
    filter_tags: new Set(),
    starred_notices: [],
    subscribed_sources: [],    
    keyword: ""
  };

  handleFilter = tag => {
    var current_tags = this.state.filter_tags;
    if (current_tags.has(tag)) current_tags.delete(tag);
    else current_tags.add(tag);
    this.setState({ filter_tags: current_tags });
  };

  handleSearch = keyword => {
    keyword = keyword.toLowerCase().trim();
    this.setState({
      keyword: keyword,
    })
  }

  filter = item => {

    const keyword = this.state.keyword;
    if(keyword !== "") {
      const title = item[1].title.toLowerCase();
      const body = item[1].body.toLowerCase();
      if(title.indexOf(keyword) === -1 && body.indexOf(keyword) === -1) return false;
    }

    var tags_searched = item[1].tags;
    if (this.state.filter_tags.size === 0) return true;
    else {
      for (let i = 0; i < tags_searched.length; i++) {
        if (this.state.filter_tags.has(tags_searched[i])) return true;
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
    axios
      .get(config.get("host_url") + config.get("routes.all_notices"))
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: false,
          notice_data: res.data
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          placeholder: error.message
        });
      });
    if (this.props.is_user) {
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
    } else flag = 1;
  }
  render() {
    var total_notice = this.state.notice_data.filter(this.filter);

    if (flag == 1) {
      var is_starred, is_subscribed;
      var total_notice = total_notice.map((item, index) => {
        if (this.props.is_user) {
          if (this.state.starred_notices.indexOf(item[1]._id) == -1)
            is_starred = false;
          else is_starred = true;
          if (this.state.subscribed_sources.indexOf(item[1].source) == -1)
            is_subscribed = false;
          else is_subscribed = true;
        }
        return (
          <NoticeData
            key={index}
            data={item}
            is_user={this.props.is_user}
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
              <h1 className="text-center">Notices</h1>
              <div className="text-danger text-center">
                {this.state.loading ? <Spinner /> : <div>{total_notice}</div>}
              </div>
            </div>
            <div className="col col-md-4">
              <Sidebar callback={this.handleFilter} handleSearch={this.handleSearch}/>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default AllNotices;
