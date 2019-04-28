import React, { Fragment, Component } from "react";
import axios from "axios";
import config from "react-global-configuration";
import "./Stylesheets/UserProfileOfficial.css";
import "./Stylesheets/OfficialProf.css";
import { Tabs, Tab } from "react-bootstrap";
import Source from "./Source";
import NoticeShrinked from "./NoticeShrinked";

class OfficialPofile extends Component {
  /* state variable for the class */
  state = {
    url: "",
    placeholder: "",
    name: "",
    key: "Home",
    username: "",
    type: "",
    starList: [],
    sourceSubscription: [],
    noticeList: [],
    sources: []
  };

  /* lifecycle methods of the class */
  componentDidMount() {
    var url =
      `https://api.adorable.io/avatars/285/` +
      localStorage.getItem(`username`) +
      `.png`;
    this.setState({ name: localStorage.getItem(`username`), url: url });
    this.setState({
      name: localStorage.getItem(`name`),
      type: localStorage.getItem(`type`),
      username: localStorage.getItem(`username`)
    });

    axios
      .post(config.get("host_url") + config.get("routes.user_profile"), {
        username: localStorage.getItem(`username`),
        type: localStorage.getItem(`type`)
      })
      .then(res => {
        var data = res.data;
        console.log(data);
        this.setState({
          starList: data.starList,
          sourceSubscription: data.sourceSubscription,
          noticeList: data.noticeList
        });
        console.log("state");
        console.log(this.state);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: error,
          placeholder: error.message,
          submitting: false
        });
      });

    axios
      .get(config.get("host_url") + config.get("routes.sources"))
      .then(res => {
        this.setState({
          sources: res.data.source_list
        });
      });
  }

  /* render method enclosing jsx expression */
  render() {
    const pastNotices = this.state.noticeList.map((item, index) => {
      return <NoticeShrinked key={index} id={index} notice_id={item} />;
    });
    const starred = this.state.starList.map((item, index) => {
      return <NoticeShrinked key={index} id={index} notice_id={item} />;
    });
    const source_list = this.state.sources.map((item, index) => {
      return (
        <Fragment>
          <Source
            index={index}
            source={item.username}
            subscribed={
              this.state.sourceSubscription.indexOf(item.username) != -1
            }
          />
          <br />
        </Fragment>
      );
    });
    return (
      <Fragment>
        <div className="container-fluid my-4">
          <div className="row" />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-lg-2" />
            <div className="col col-lg-2">
              <img src={this.state.url} className="avatar" alt="avatar" />
              <hr className="my-4" />
              <div className="text-center">
                <h4>{this.state.name}</h4>
              </div>
            </div>
            <div className="col col-lg-6">
              <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
                mountOnEnter="true"
                unmountOnExit="true"
                variant="pills"
              >
                <Tab eventKey="Home" title="Home">
                  <h3>Name: {this.state.name} </h3>
                  <br />
                  <h3>User Type: {localStorage.getItem(`type`)}</h3>
                </Tab>
                <Tab eventKey="sources" title="Sources">
                  <br />
                  <div
                    style={{
                      overflowX: "hidden",
                      overflowY: "auto",
                      height: "450px"
                    }}
                    className="source_list"
                  >
                    {source_list}
                  </div>
                </Tab>
                <Tab eventKey="starred" title="Starred Notices">
                  {starred}
                </Tab>
                <Tab eventKey="pastNotices" title="Past Notices">
                  {pastNotices}
                </Tab>
              </Tabs>
            </div>
            <div className="col col-lg-2" />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default OfficialPofile;
