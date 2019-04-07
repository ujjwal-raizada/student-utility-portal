import React, { Fragment, Component } from "react";
import axios from "axios";
import config from "react-global-configuration";
import "./Stylesheets/UserProfileOfficial.css";
import { Tabs, Tab } from "react-bootstrap";

class StudentPofile extends Component {
  /* state variable for the class */
  state = {
    name: "",
    key: "Home"
  };

  /* lifecycle methods of the class */
  componentDidMount() {
    this.setState({ name: localStorage.getItem(`username`) });
  }

  /* render method enclosing jsx expression */
  render() {
    return (
      <Fragment>
        <div className="container-fluid cont">
          <div className="row" />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-lg-2" />
            <div className="col col-lg-2">
              <img
                src="https://picsum.photos/200/300?image=1062"
                className="avatar"
                alt="avatar"
              />
              <hr className="my-4" />
              <div className="text-center">{this.state.name}</div>
            </div>
            <div className="col col-lg-8">
              <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
              >
                <Tab eventKey="Home" title="Home">
                  test1
                </Tab>
                <Tab eventKey="subscribed" title="Subscribed">
                  test2
                </Tab>
                <Tab eventKey="starred" title="Starred Notices">
                  test3
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default StudentPofile;
