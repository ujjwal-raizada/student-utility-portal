import React, { Component, Fragment } from "react";
import { Tabs, Tab } from "react-bootstrap";
import AllNotices from "./AllNotices";
import SubscribedNotices from "./SubscribedNotices";

class Notices extends Component {
  state = {
    key: ""
  };

  componentDidMount() {
    const key =
      localStorage.getItem("type") == ("Student" || "Official Source")
        ? "Subscribed Notices"
        : "All Notices";
    this.setState({ key: key });
  }

  render() {
    return (
      <div>
        <Tabs
          activeKey={this.state.key}
          onSelect={key => {
            this.setState({ key: key });
          }}
        >
          {localStorage.getItem("type") == ("Student" || "Official Source") && (
            <Tab title="Subscribed Notices" eventKey="Subscribed Notices">
              <SubscribedNotices />
            </Tab>
          )}

          <Tab title="All Notices" eventKey="All Notices">
            <AllNotices />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Notices;
