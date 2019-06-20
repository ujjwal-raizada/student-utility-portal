import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import AllNotices from "./AllNotices";
import SubscribedNotices from "./SubscribedNotices";
import axios from "axios";
import config from "react-global-configuration";
import Sidebar from "./Sidebar";

class Notices extends Component {
  state = {
    key: "",
    filter_tags: new Set(),
    subscribed_sources: [],
    starred_notices: [],
    keyword: "",
  };

  componentDidMount() {
    const type = localStorage.getItem("type");
    const key =
      type == "Student" || type == "Official Source"
        ? "Subscribed Notices"
        : "All Notices";
    this.setState({ key: key });
  }

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
  };

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

  addSource = source => { //maybe redundant
    var source_list = this.state.subscribed_sources;
    source_list.push(source);
    this.setState({ subscribed_sources: source_list });
  };

  removeSource = source => { //maybe redundant
    var source_list = this.state.subscribed_sources;
    source_list.splice(source_list.indexOf(source), 1);
    this.setState({ subscribed_sources: source_list });
  };

  fetchProfile = () => {
    axios
      .post(config.get("host_url") + config.get("routes.user_profile"), {
        username: localStorage.getItem(`username`),
        type: localStorage.getItem(`type`)
      })
      .then(res => {
        var data = res.data;
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
    const type = localStorage.getItem("type");
    const is_user =
      type == "Student" || type == "Official Source" ? true : false;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-8">

            <Tabs
              activeKey={this.state.key}
              onSelect={key => {
                this.setState({ key: key });
              }}
              mountOnEnter="true"
              unmountOnExit="true"
              variant="pills"
            >

              {is_user && (
                <Tab title="Subscribed Notices" eventKey="Subscribed Notices" >
                  <div className="text-danger text-center">
                    <SubscribedNotices 
                      handleFilter={this.handleFilter}
                      fetchProfile={this.fetchProfile}
                      filter_tags={this.state.filter_tags}
                      filter={this.filter}
                      addSource={this.addSource}
                      removeSource={this.removeSource}
                      starred_notices={this.state.starred_notices}
                      subscribed_sources={this.state.subscribed_sources}
                    />
                  </div>
                </Tab>
              )}

              <Tab title="All Notices" eventKey="All Notices">
                  <div className="text-danger text-center">
                    <AllNotices
                      is_user={is_user}
                      handleFilter={this.handleFilter}
                      fetchProfile={this.fetchProfile}
                      filter_tags={this.state.filter_tags}
                      filter={this.filter}
                      addSource={this.addSource}
                      removeSource={this.removeSource}
                      starred_notices={this.state.starred_notices}
                      subscribed_sources={this.state.subscribed_sources}
                    />
                  </div>                            
              </Tab>

            </Tabs>

          </div>

          <div className="col col-md-4">
            <Sidebar handleFilter={this.handleFilter} handleSearch={this.handleSearch}/>
          </div>

        </div>
      </div>
    );
  }
}

export default Notices;
