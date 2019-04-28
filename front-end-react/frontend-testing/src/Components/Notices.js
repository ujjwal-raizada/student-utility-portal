import React, { Component, Fragment } from "react";
import { Tabs, Tab } from "react-bootstrap";
import AllNotices from "./AllNotices";
import SubscribedNotices from "./SubscribedNotices";

class Notices extends Component {
  state = {
    key: ""
  };

  componentDidMount() {
    const type = localStorage.getItem("type");
    const key =
      type == "Student" || type == "Official Source"
        ? "Subscribed Notices"
        : "All Notices";
    this.setState({ key: key });
  }

  render() {
    const type = localStorage.getItem("type");
    const is_user =
      type == "Student" || type == "Official Source" ? true : false;
    return (
      <div>
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
            <Tab title="Subscribed Notices" eventKey="Subscribed Notices">
              <SubscribedNotices />
            </Tab>
          )}

          <Tab title="All Notices" eventKey="All Notices">
            <AllNotices is_user={is_user} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Notices;
